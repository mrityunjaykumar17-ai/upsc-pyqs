import { createServerFn } from "@tanstack/react-start";

const DIRECTIVES = [
  "critically examine", "critically analyse", "critically analyze", "critically comment",
  "critically evaluate", "critically discuss",
  "examine", "analyse", "analyze", "discuss", "evaluate", "comment",
  "elucidate", "illustrate", "elaborate", "explain", "justify", "substantiate",
  "enumerate", "describe", "assess",
];

function detectDirective(q: string): string | null {
  const s = q.toLowerCase();
  for (const d of DIRECTIVES) if (s.includes(d)) return d;
  return null;
}

export const askAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const data = input as {
      question?: string; marks?: number; words?: number;
      paper?: string; subject?: string;
    };
    if (!data?.question || typeof data.question !== "string") {
      throw new Error("question is required");
    }
    return {
      question: data.question,
      marks: typeof data.marks === "number" ? data.marks : undefined,
      words: typeof data.words === "number" ? data.words : undefined,
      paper: typeof data.paper === "string" ? data.paper : undefined,
      subject: typeof data.subject === "string" ? data.subject : undefined,
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const wordTarget = data.words ?? (data.marks && data.marks >= 15 ? 250 : 150);
    const directive = detectDirective(data.question);
    const paperLabel = data.paper ? ` (${data.paper}${data.subject ? ` · ${data.subject}` : ""})` : "";

    const system = `You are a UPSC Civil Services Mains topper. Write a model answer in the exact style of AIR 1-50 topper copies${paperLabel}. Enforce every rule below.

FORMAT (markdown):
1. **Introduction** (2-3 lines) — sharp context or definition, or a hook (constitutional value, data point, apex-court quote, committee finding).
2. **Body** — grouped under 3-6 short bold subheadings (e.g. "**Constitutional & Legal Framework**", "**Socio-economic Dimensions**", "**Ethical Dimensions**", "**Challenges**"). Use crisp bullet points, NOT paragraphs. Each bullet ≤ 25 words.
3. **Indian Examples** — weave in 3-5 SPECIFIC Indian examples across the body: named government schemes (with launch year where known), NITI Aayog/Economic Survey/PIB data, specific Supreme Court cases (e.g. *Vishaka v State of Rajasthan (1997)*, *Navtej Singh Johar (2018)*), committee reports (e.g. 2nd ARC, Sachar, Justice Verma, Kelkar), state initiatives (Kerala Kudumbashree, Odisha Mission Shakti, Maharashtra Nanaji Deshmukh Krishi Sanjivani), Constitutional Articles / DPSPs / FRs with numbers, Panchayat/SHG/civil-servant/NGO/startup examples.
4. **Challenges / Limitations** — 3-4 balanced bullets.
5. **Way Forward** — 3-5 actionable, India-specific bullets (schemes, institutional reform, ARC recommendations, SDG targets).
6. **Conclusion** (2 lines) — forward-looking, tied to a constitutional value / Vision India @2047 / SDG.

DIRECTIVE HANDLING${directive ? ` — the question uses "${directive}"` : ""}:
- "Discuss" / "Elaborate" → present multiple dimensions, balanced.
- "Examine" / "Analyse" → cause-effect / structural inquiry, evidence-led.
- "Critically examine" / "Evaluate" → merits AND demerits with a stand.
- "Comment" → your reasoned position + brief support.
- "Illustrate" / "Elucidate" → examples-driven exposition.

STYLE HARD RULES:
- Use **bold** for keywords, scheme names, Article numbers, judgement names, data points.
- No generic ChatGPT openings ("In today's world…", "It is a well-known fact…"). Start with substance.
- No long paragraphs. No repetition. No filler.
- NEVER invent statistics, cases, judgements, reports, articles, or scheme launch dates. If unsure, cite the concept without a number.
- Target length: ~${wordTarget} words (±15%).
- End with a "**Sources & Further Reading**" block listing 3-6 real, well-known Indian government / think-tank sources ONLY as plain labels (PIB, PRS India, NITI Aayog SDG Index, Economic Survey 2024-25, RBI FSR, NCRB Crime in India, NFHS-5, 2nd ARC reports, Justice Verma Committee, Sarkaria Commission, etc.). Do NOT fabricate URLs — only label names.`;

    const userPrompt = `Question${data.marks ? ` (${data.marks} marks${data.words ? `, ${data.words} words` : ""})` : ""}${paperLabel}:\n\n${data.question}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (response.status === 429) throw new Error("AI is busy right now (rate limit). Please try again in a moment.");
      if (response.status === 402) throw new Error("AI credits exhausted for this workspace. Please add credits to continue.");
      throw new Error(`AI request failed (${response.status}): ${text.slice(0, 200)}`);
    }

    const json = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = json.choices?.[0]?.message?.content ?? "";
    if (!answer) throw new Error("AI returned an empty response.");
    return { answer };
  });
