// Server-only pipeline: OCR handwritten answers, match to PYQ, run senior-mentor evaluation.

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const EMBED = "https://ai.gateway.lovable.dev/v1/embeddings";

type EvalReport = {
  marks_awarded: number;
  marks_out_of: number;
  expected_range: string;
  overall: string;
  demand_analysis: { directives: string[]; addressed: boolean; comment: string };
  structure: { introduction: string; body: string; conclusion: string; suggested_intro?: string; suggested_conclusion?: string };
  content_quality: { strengths: string[]; weaknesses: string[]; dimensions_covered: string[]; missing_dimensions: string[] };
  keywords: { present: string[]; missing: string[] };
  value_addition: { present: string[]; suggested: { type: string; item: string; why: string }[] };
  diagrams: { present: boolean; suggestions: string[] };
  underlines: { good: boolean; suggested_to_underline: string[] };
  handwriting: { comment: string };
  language: { comment: string };
  time_management: { word_count_estimate: number; comment: string };
  missing_points: string[];
  improved_answer: string;
};

async function callChat(body: unknown, apiKey: string): Promise<string> {
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`AI gateway ${res.status}: ${await res.text()}`);
  const j = await res.json() as { choices?: { message?: { content?: string } }[] };
  return j.choices?.[0]?.message?.content ?? "";
}

async function embed(text: string, apiKey: string): Promise<number[]> {
  const res = await fetch(EMBED, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify({ model: "google/gemini-embedding-2", input: text }),
  });
  if (!res.ok) throw new Error(`Embed ${res.status}: ${await res.text()}`);
  const j = await res.json() as { data?: { embedding: number[] }[] };
  return j.data?.[0]?.embedding ?? [];
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("No JSON in model output");
  return JSON.parse(raw.slice(start, end + 1));
}

export async function runEvaluationPipeline(evaluationId: string, userId: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: row, error } = await supabaseAdmin
    .from("evaluations").select("*").eq("id", evaluationId).eq("user_id", userId).maybeSingle();
  if (error || !row) throw new Error("Evaluation not found");

  await supabaseAdmin.from("evaluations").update({ status: "ocr" }).eq("id", evaluationId);

  const paths = (row.file_paths as string[]) || [];
  // Build multimodal content: signed URLs for each page
  const parts: unknown[] = [
    { type: "text", text: "You are transcribing handwritten UPSC Mains answer sheet pages. Extract EVERYTHING: any question written at the top, the full answer text preserving paragraphs, bullet points, numbering, headings, underlined words (wrap in <u>...</u>), and note presence of diagrams/tables/flowcharts (write [DIAGRAM: description] where they appear). Return STRICT JSON: {\"question\": string|null, \"answer\": string, \"underlined\": string[], \"has_diagrams\": boolean, \"page_count\": number}. No prose outside JSON." },
  ];
  for (const p of paths) {
    const { data: signed } = await supabaseAdmin.storage.from("answer-uploads").createSignedUrl(p, 600);
    if (signed?.signedUrl) {
      parts.push({ type: "image_url", image_url: { url: signed.signedUrl } });
    }
  }

  const ocrRaw = await callChat({
    model: "google/gemini-2.5-pro",
    messages: [{ role: "user", content: parts }],
  }, apiKey);

  let ocr: { question: string | null; answer: string; underlined: string[]; has_diagrams: boolean; page_count: number };
  try {
    ocr = extractJson(ocrRaw) as typeof ocr;
  } catch {
    ocr = { question: null, answer: ocrRaw, underlined: [], has_diagrams: false, page_count: paths.length };
  }

  await supabaseAdmin.from("evaluations").update({
    status: "evaluating",
    ocr_text: ocr.answer,
    detected_question: ocr.question ?? null,
  }).eq("id", evaluationId);

  // Match question to PYQ via embeddings if a question was detected
  let matchedQ: { id: string; question_text: string; paper_slug: string; year: number; marks: number | null } | null = null;
  if (ocr.question && ocr.question.trim().length > 15) {
    try {
      const qVec = await embed(ocr.question, apiKey);
      // pgvector cosine similarity search
      const { data: matches } = await supabaseAdmin.rpc("match_upsc_questions" as never, {
        query_embedding: qVec as unknown as string,
        match_count: 1,
      } as never) as { data: unknown };
      const hit = Array.isArray(matches) && matches.length > 0 ? matches[0] as { similarity: number; id: string; question_text: string; paper_slug: string; year: number; marks: number | null } : null;
      if (hit && hit.similarity >= 0.72) {
        matchedQ = { id: hit.id, question_text: hit.question_text, paper_slug: hit.paper_slug, year: hit.year, marks: hit.marks };
      }
    } catch (e) {
      console.warn("PYQ match failed", e);
    }
  }

  // Fallback: brute-force ILIKE match against upsc_questions for a rough question find
  if (!matchedQ && ocr.question) {
    const words = ocr.question.split(/\s+/).filter((w) => w.length > 5).slice(0, 3);
    if (words.length) {
      const { data: hits } = await supabaseAdmin
        .from("upsc_questions")
        .select("id, question_text, paper_slug, year, marks")
        .ilike("question_text", `%${words[0]}%`)
        .limit(5);
      if (hits && hits.length) matchedQ = hits[0] as never;
    }
  }

  const questionForEval = matchedQ?.question_text ?? ocr.question ?? "(question could not be detected — evaluate the answer as a general UPSC Mains response)";
  const marksTotal = matchedQ?.marks ?? 15;

  const systemPrompt = `You are a senior UPSC Mains evaluator with 15+ years of experience checking answer copies at coaching institutes like Vision IAS and ForumIAS. You give sharp, specific, mentor-style feedback — never generic AI platitudes.

For every criticism, cite the exact missing element (e.g. "You discussed causes well but ignored constitutional mechanisms such as Article 243 and State Finance Commissions"). Never say "needs improvement" without saying WHAT to improve and HOW.

Evaluate the student's answer against the question. The question is worth ${marksTotal} marks.

Return STRICT JSON matching this exact schema (no prose outside JSON, no markdown fences):
{
  "marks_awarded": number (out of ${marksTotal}, one decimal ok),
  "marks_out_of": ${marksTotal},
  "expected_range": string (e.g. "9-11 / 15"),
  "overall": string (2-3 sentences summary),
  "demand_analysis": {"directives": string[], "addressed": boolean, "comment": string},
  "structure": {"introduction": string, "body": string, "conclusion": string, "suggested_intro": string, "suggested_conclusion": string},
  "content_quality": {"strengths": string[], "weaknesses": string[], "dimensions_covered": string[], "missing_dimensions": string[]},
  "keywords": {"present": string[], "missing": string[]},
  "value_addition": {"present": string[], "suggested": [{"type": string, "item": string, "why": string}]},
  "diagrams": {"present": boolean, "suggestions": string[]},
  "underlines": {"good": boolean, "suggested_to_underline": string[]},
  "handwriting": {"comment": string},
  "language": {"comment": string},
  "time_management": {"word_count_estimate": number, "comment": string},
  "missing_points": string[],
  "improved_answer": string (a topper-level rewritten answer in UPSC format with Introduction, Body with subheadings, Conclusion)
}

Never fabricate committee names, article numbers, court judgments, data, or reports. If unsure, omit rather than invent. Ethics (GS4) answers should be evaluated against Point-Explanation-Example structure for theory, and Facts/Stakeholders/Options/Recommendation for case studies.`;

  const userPrompt = `QUESTION: ${questionForEval}
${matchedQ ? `Paper: ${matchedQ.paper_slug}, Year: ${matchedQ.year}` : ""}

STUDENT'S ANSWER (from handwritten OCR):
${ocr.answer}

Diagrams detected in answer sheet: ${ocr.has_diagrams ? "yes" : "no"}
Underlined phrases: ${ocr.underlined.slice(0, 20).join(" | ") || "none detected"}

Evaluate now. Return only the JSON.`;

  const evalRaw = await callChat({
    model: "openai/gpt-5.5",
    messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
  }, apiKey);

  let report: EvalReport;
  try {
    report = extractJson(evalRaw) as EvalReport;
  } catch (e) {
    await supabaseAdmin.from("evaluations").update({
      status: "error",
      error_message: `Evaluation JSON parse failed: ${(e as Error).message}`,
    }).eq("id", evaluationId);
    throw e;
  }

  await supabaseAdmin.from("evaluations").update({
    status: "done",
    evaluation: JSON.parse(JSON.stringify(report)),
    marks_awarded: report.marks_awarded,
    marks_out_of: report.marks_out_of,
    detected_question_id: matchedQ?.id ?? null,
    detected_meta: matchedQ ? { paper: matchedQ.paper_slug, year: matchedQ.year, marks: matchedQ.marks } : { question: ocr.question },
  }).eq("id", evaluationId);

  return { ok: true, id: evaluationId };
}
