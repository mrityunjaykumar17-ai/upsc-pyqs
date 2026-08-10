// Server-only pipeline: OCR handwritten answer sheets, split into individual
// questions, evaluate each one against its paper's framework, then summarise.

import {
  buildQuestionSystemPrompt,
  inferMarks,
  SUBJECT_LABELS,
  type Subject,
} from "./eval-frameworks";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

export type QuestionEval = {
  index: number;
  question: string;
  marks_out_of: number;
  marks_source: "stated" | "inferred";
  page_count: number;
  answer_text: string;
  marks_low: number;
  marks_high: number;
  band: string;
  justification: string;
  demand: { directives: string[]; addressed: boolean; comment: string };
  criteria: { name: string; weight: string; rating: string; comment: string }[];
  strengths: string[];
  weaknesses: string[];
  missing_dimensions: string[];
  missing_points: string[];
  suggestions: string[];
  keywords: { present: string[]; missing: string[] };
  value_addition: { type: string; item: string; why: string }[];
  presentation: string;
  language: string;
  ideal_structure: { section: string; what_to_write: string }[];
  detailed_evaluation: string;
};

export type MultiEvalReport = {
  version: 2;
  subject: Subject;
  subject_label: string;
  questions: QuestionEval[];
  total_low: number;
  total_high: number;
  total_out_of: number;
  percentage_low: number;
  percentage_high: number;
  overall_summary: string;
  recurring_weaknesses: string[];
  subject_recommendations: string[];
  priority_areas: string[];
};

async function callChat(body: unknown, apiKey: string): Promise<string> {
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`AI gateway ${res.status}: ${await res.text()}`);
  const j = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return j.choices?.[0]?.message?.content ?? "";
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const s = Math.min(...[raw.indexOf("{"), raw.indexOf("[")].filter((i) => i >= 0));
  const isArr = raw[s] === "[";
  const end = isArr ? raw.lastIndexOf("]") : raw.lastIndexOf("}");
  if (!Number.isFinite(s) || end < 0) throw new Error("No JSON in model output");
  return JSON.parse(raw.slice(s, end + 1));
}

type OcrItem = {
  question: string | null;
  marks_stated: number | null;
  answer: string;
  page_count: number;
  has_diagrams: boolean;
  underlined: string[];
};

const OCR_PROMPT = `You are transcribing a handwritten UPSC Mains answer booklet. The upload may contain MULTIPLE questions with their answers.

Split the content into separate question-answer units. For each unit extract:
- "question": the printed/handwritten question text (null if absent)
- "marks_stated": the marks printed against the question (e.g. 10, 15, 20) or null
- "answer": the full answer text, preserving paragraphs, bullets, numbering, headings; wrap underlined words in <u>...</u>; write [DIAGRAM: description] where a diagram/table/flowchart appears
- "page_count": how many answer-booklet pages THIS answer occupies (count actual written pages for this answer only, minimum 1)
- "has_diagrams": boolean
- "underlined": array of underlined phrases

Return STRICT JSON only: {"items": [ ... ]}. No prose outside JSON.`;

export async function runEvaluationPipeline(evaluationId: string, userId: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: row, error } = await supabaseAdmin
    .from("evaluations")
    .select("*")
    .eq("id", evaluationId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !row) throw new Error("Evaluation not found");

  const subject = ((row as { subject?: string }).subject ?? "gs1") as Subject;

  try {
    await supabaseAdmin.from("evaluations").update({ status: "ocr" }).eq("id", evaluationId);

    const paths = (row.file_paths as string[]) || [];
    const parts: unknown[] = [{ type: "text", text: OCR_PROMPT }];
    for (const p of paths) {
      const { data: signed } = await supabaseAdmin.storage
        .from("answer-uploads")
        .createSignedUrl(p, 900);
      if (!signed?.signedUrl) continue;
      if (p.toLowerCase().endsWith(".pdf")) {
        parts.push({ type: "file", file: { filename: p.split("/").pop(), file_data: signed.signedUrl } });
        parts.push({ type: "image_url", image_url: { url: signed.signedUrl } });
      } else {
        parts.push({ type: "image_url", image_url: { url: signed.signedUrl } });
      }
    }

    const ocrRaw = await callChat(
      { model: "google/gemini-2.5-pro", messages: [{ role: "user", content: parts }] },
      apiKey,
    );

    let items: OcrItem[] = [];
    try {
      const parsed = extractJson(ocrRaw) as { items?: OcrItem[] } | OcrItem[];
      items = Array.isArray(parsed) ? parsed : (parsed.items ?? []);
    } catch {
      items = [];
    }
    items = items
      .filter((i) => (i?.answer ?? "").trim().length > 40)
      .slice(0, 10);
    if (!items.length) {
      items = [
        {
          question: null,
          marks_stated: null,
          answer: ocrRaw,
          page_count: paths.length || 1,
          has_diagrams: false,
          underlined: [],
        },
      ];
    }

    await supabaseAdmin
      .from("evaluations")
      .update({
        status: "evaluating",
        ocr_text: items.map((i) => `Q: ${i.question ?? "(not detected)"}\n${i.answer}`).join("\n\n---\n\n"),
        detected_question: items[0]?.question ?? null,
        question_count: items.length,
      })
      .eq("id", evaluationId);

    const questions: QuestionEval[] = [];
    for (let idx = 0; idx < items.length; idx++) {
      const it = items[idx];
      const stated = typeof it.marks_stated === "number" && it.marks_stated > 0;
      const pages = Math.max(1, Math.round(it.page_count || 1));
      const marks = stated ? it.marks_stated! : inferMarks(subject, pages);
      const system = buildQuestionSystemPrompt(subject, marks);
      const user = `QUESTION ${idx + 1}: ${it.question ?? "(question not printed — infer the demand from the answer and evaluate accordingly)"}
Marks: ${marks} (${stated ? "printed on the sheet" : `inferred from ${pages} written page(s)`})

STUDENT'S ANSWER (handwritten OCR):
${it.answer}

Diagrams present: ${it.has_diagrams ? "yes" : "no"}
Underlined phrases: ${(it.underlined ?? []).slice(0, 20).join(" | ") || "none detected"}

Evaluate now. Return only the JSON.`;

      const raw = await callChat(
        { model: "openai/gpt-5.5", messages: [{ role: "system", content: system }, { role: "user", content: user }] },
        apiKey,
      );
      const r = extractJson(raw) as Partial<QuestionEval>;
      questions.push({
        index: idx + 1,
        question: it.question ?? "(question not detected)",
        marks_out_of: marks,
        marks_source: stated ? "stated" : "inferred",
        page_count: pages,
        answer_text: it.answer,
        marks_low: Number(r.marks_low ?? 0),
        marks_high: Number(r.marks_high ?? 0),
        band: r.band ?? "",
        justification: r.justification ?? "",
        demand: r.demand ?? { directives: [], addressed: false, comment: "" },
        criteria: r.criteria ?? [],
        strengths: r.strengths ?? [],
        weaknesses: r.weaknesses ?? [],
        missing_dimensions: r.missing_dimensions ?? [],
        missing_points: r.missing_points ?? [],
        suggestions: r.suggestions ?? [],
        keywords: r.keywords ?? { present: [], missing: [] },
        value_addition: r.value_addition ?? [],
        presentation: r.presentation ?? "",
        language: r.language ?? "",
        ideal_structure: r.ideal_structure ?? [],
        detailed_evaluation: r.detailed_evaluation ?? "",
      });

      await supabaseAdmin
        .from("evaluations")
        .update({ status: `evaluating ${idx + 1}/${items.length}` })
        .eq("id", evaluationId);
    }

    const total_out_of = questions.reduce((a, q) => a + q.marks_out_of, 0);
    const total_low = round1(questions.reduce((a, q) => a + q.marks_low, 0));
    const total_high = round1(questions.reduce((a, q) => a + q.marks_high, 0));

    const summaryRaw = await callChat(
      {
        model: "openai/gpt-5.5",
        messages: [
          {
            role: "system",
            content: `You are a senior UPSC ${SUBJECT_LABELS[subject]} mentor summarising a student's answer-copy review. Be specific and actionable. Return STRICT JSON only:
{"overall_summary": string, "recurring_weaknesses": string[], "subject_recommendations": string[], "priority_areas": string[]}`,
          },
          {
            role: "user",
            content: `Per-question results:\n${questions
              .map(
                (q) =>
                  `Q${q.index} (${q.marks_low}-${q.marks_high}/${q.marks_out_of}, ${q.band}): ${q.question}\nJustification: ${q.justification}\nWeaknesses: ${q.weaknesses.join("; ")}\nMissing dimensions: ${q.missing_dimensions.join("; ")}`,
              )
              .join("\n\n")}\n\nTotal: ${total_low}-${total_high} / ${total_out_of}. Summarise now.`,
          },
        ],
      },
      apiKey,
    );
    let summary = { overall_summary: "", recurring_weaknesses: [] as string[], subject_recommendations: [] as string[], priority_areas: [] as string[] };
    try {
      summary = { ...summary, ...(extractJson(summaryRaw) as typeof summary) };
    } catch {
      /* keep defaults */
    }

    const report: MultiEvalReport = {
      version: 2,
      subject,
      subject_label: SUBJECT_LABELS[subject],
      questions,
      total_low,
      total_high,
      total_out_of,
      percentage_low: total_out_of ? round1((total_low / total_out_of) * 100) : 0,
      percentage_high: total_out_of ? round1((total_high / total_out_of) * 100) : 0,
      ...summary,
    };

    await supabaseAdmin
      .from("evaluations")
      .update({
        status: "done",
        evaluation: JSON.parse(JSON.stringify(report)),
        marks_awarded: round1((total_low + total_high) / 2),
        marks_out_of: total_out_of,
        question_count: questions.length,
        detected_meta: { subject, questions: questions.map((q) => ({ q: q.question, marks: q.marks_out_of })) },
      })
      .eq("id", evaluationId);

    return { ok: true, id: evaluationId };
  } catch (e) {
    await supabaseAdmin
      .from("evaluations")
      .update({ status: "error", error_message: (e as Error).message.slice(0, 500) })
      .eq("id", evaluationId);
    throw e;
  }
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
