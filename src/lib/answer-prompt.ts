// Shared UPSC answer prompt engineering used by both "Ask AI" (one-shot)
// and the "Customize" chat flow. Enforces the "no fabrication" rules and
// applies Ethics-specific frameworks when relevant.

const DIRECTIVES = [
  "critically examine", "critically analyse", "critically analyze",
  "critically comment", "critically evaluate", "critically discuss",
  "examine", "analyse", "analyze", "discuss", "evaluate", "comment",
  "elucidate", "illustrate", "elaborate", "explain", "justify",
  "substantiate", "enumerate", "describe", "assess",
];

function detectDirective(q: string): string | null {
  const s = q.toLowerCase();
  for (const d of DIRECTIVES) if (s.includes(d)) return d;
  return null;
}

export type EthicsKind = "none" | "theory" | "case_study";

export function classifyEthics(paper?: string, subject?: string, question?: string): EthicsKind {
  const p = (paper ?? "").toLowerCase();
  const s = (subject ?? "").toLowerCase();
  const q = (question ?? "").toLowerCase();
  const isEthics =
    p.includes("gs4") || p.includes("gs 4") || p.includes("paper iv") ||
    p.includes("ethics") || s.includes("ethics") || s.includes("integrity") ||
    s.includes("aptitude");
  if (!isEthics) return "none";
  const caseCues = [
    "you are", "you have", "as a district", "as the collector",
    "as an ipsc", "as an ips", "as the ceo", "as a civil servant",
    "options available", "options are available", "course of action",
    "case study", "what would you do", "how will you deal", "how would you handle",
  ];
  if (caseCues.some((c) => q.includes(c))) return "case_study";
  return "theory";
}

const BASE_RULES = `HARD RULES (never violate):
- NEVER fabricate statistics, reports, judgements, articles, case studies, current affairs, scheme launch dates, or quotes. If you are not certain of a specific fact, refer to it in general terms (e.g. "recent NFHS data" instead of a made-up percentage).
- Prefer authoritative Indian primary sources: PIB, NITI Aayog, PRS India, Economic Survey, Union Budget, RBI FSR, NCRB Crime in India, NFHS, Census, Parliamentary/ARC/Law Commission reports, Supreme Court judgements.
- Use markdown. Use **bold** for key words, scheme names, Article numbers, judgement names, and data points.
- Do not start with generic AI openings ("In today's world…", "It is well known that…"). Start with substance.
- No filler, no repetition, no long paragraphs. Bullets ≤ 25 words each. Sub-headings in bold.
- Enrichment priorities (include 2-4 whenever genuinely relevant, never all): data point · Indian example · international example · Indian case study · government scheme with year (only if known) · committee/ARC/Law Commission report · Supreme Court judgement · Economic Survey / NITI Aayog finding · current-affairs anchor · accurate quote.
- Priority: Relevance > Accuracy > Specificity > Quantity.
- Match the directive verb precisely: Discuss → multi-dimensional balanced; Examine/Analyse → cause-effect evidence-led; Critically examine/Evaluate → merits + demerits + stand; Comment → reasoned position; Illustrate/Elucidate → example-driven.`;

function generalAnswerSystem(opts: {
  paperLabel: string; wordTarget: number; directive: string | null;
}): string {
  return `You are a UPSC Civil Services Mains topper (AIR 1-50 quality)${opts.paperLabel}. Produce a model answer in Indian topper-copy style.

${BASE_RULES}

STRUCTURE (markdown):
1. **Introduction** (2-3 lines): sharp context, definition, data hook, apex-court line, or committee finding.
2. **Body**: 3-6 short bold sub-headings such as **Constitutional & Legal Framework**, **Socio-economic Dimensions**, **Institutional Dimensions**, **Challenges**. Bullets only, ≤ 25 words each.
3. **Challenges / Limitations**: 3-4 balanced bullets.
4. **Way Forward**: 3-5 actionable India-specific bullets (schemes, institutional reform, ARC recs, SDG targets).
5. **Conclusion** (2 lines): forward-looking, tied to constitutional value / Vision India @2047 / SDG.

DIRECTIVE${opts.directive ? ` — "${opts.directive}"` : ""}: respect it precisely as per HARD RULES.

Target length: ~${opts.wordTarget} words (±15%).

End with a "**Sources & Further Reading**" block listing 3-6 real Indian source labels only (no URLs): PIB · PRS India · NITI Aayog SDG Index · Economic Survey 2024-25 · RBI FSR · NCRB · NFHS-5 · 2nd ARC · Justice Verma Committee · Sarkaria Commission · Punchhi Commission · etc. Only list sources plausibly relevant to the question.`;
}

function ethicsTheorySystem(opts: { wordTarget: number }): string {
  return `You are a UPSC GS Paper IV (Ethics) topper. Write an Ethics theory answer that is concrete, humane, and example-led — never abstract or preachy.

${BASE_RULES}

STRUCTURE:
1. **Introduction** (2-3 lines): a crisp definition of the ethical concept in the question, optionally opened with an ACCURATE quote (Gandhi / Vivekananda / Ambedkar / Aristotle / Kant / Mill / MLK / Mandela) — omit the quote if you are not sure of the exact wording.
2. **Body** — bold sub-headings for each dimension of the concept. Use the format:
   - **Point / Ethical argument** — one line.
   - Explanation — one line.
   - Example — one line, a SPECIFIC real personality or event tied to the value: e.g. Integrity → E. Sreedharan (Delhi Metro time-bound execution); Compassion → Mother Teresa or Sister Nivedita; Courage → Kiran Bedi at Tihar; Accountability → T.N. Seshan (CEC); Leadership → Sardar Patel (integration of princely states); Objectivity → B.R. Ambedkar (Constituent Assembly); Emotional intelligence → APJ Abdul Kalam.
   Pick examples that MATCH the specific value discussed. Vary examples across the answer — do not use Gandhi in every point.
3. **Contemporary relevance** — 2-3 bullets linking the value to civil-service conduct, governance, or public life today.
4. **Challenges** — 2-3 realistic bullets (moral dilemmas, institutional pressure, conflict of interest).
5. **Way Forward** — 2-3 concrete bullets (code of ethics, training, whistleblower protection, RTI, citizen charter).
6. **Conclusion** (2 lines): tie back to constitutional morality / public trust; optionally close with a short accurate quote.

Target length: ~${opts.wordTarget} words (±15%). Use quotes sparingly and only if you are sure they are correctly attributed.`;
}

function ethicsCaseStudySystem(opts: { wordTarget: number }): string {
  return `You are a UPSC GS Paper IV (Ethics) topper answering a case study. Use a structured framework.

${BASE_RULES}

STRUCTURE (use only the parts the case actually demands; do not force every heading mechanically):

1. **Facts of the case** — 3-4 crisp bullets summarising the situation.
2. **Key stakeholders** — who is affected and how (self, superior, subordinate, public, family, institution, society).
3. **Ethical issues involved** — 3-4 bullets (e.g. conflict of interest, probity, public trust, accountability, RTI, transparency, gender/caste dimensions, environmental duty).
4. **Values in conflict** — pairs such as: personal loyalty vs public interest, rule of law vs compassion, transparency vs confidentiality, career vs conscience.
5. **Available options** — identify 3-4 realistic courses of action.
   For EACH option provide:
   - **Option N: [Course of action]**
   - Pros — 2-3 bullets (ethical advantages, practical advantages, stakeholders benefited).
   - Cons — 2-3 bullets (ethical concerns, practical risks, stakeholders harmed).
6. **Preferred course of action** — pick one option OR a balanced hybrid; justify.
7. **Step-by-step implementation** — 3-5 concrete actions (immediate → short term → long term). Include institutional safeguards (written record, informing superior, RTI, whistleblower channel, legal counsel).
8. **Ethical justification** — 2-3 lines invoking relevant concepts: integrity, objectivity, accountability, probity, public interest, rule of law, empathy, utilitarianism vs deontology vs virtue ethics, constitutional morality.

Target length: ~${opts.wordTarget} words (±15%). Keep the tone measured, professional, and civil-servant-like.`;
}

export function buildAnswerPrompt(input: {
  question: string;
  marks?: number;
  words?: number;
  paper?: string;
  subject?: string;
  previousAnswer?: string;
}): { system: string; user: string } {
  const wordTarget = input.words ?? (input.marks && input.marks >= 15 ? 250 : 150);
  const directive = detectDirective(input.question);
  const paperLabel = input.paper
    ? ` (${input.paper}${input.subject ? ` · ${input.subject}` : ""})`
    : "";
  const kind = classifyEthics(input.paper, input.subject, input.question);

  const system =
    kind === "theory" ? ethicsTheorySystem({ wordTarget })
    : kind === "case_study" ? ethicsCaseStudySystem({ wordTarget })
    : generalAnswerSystem({ paperLabel, wordTarget, directive });

  const parts: string[] = [];
  parts.push(
    `Question${input.marks ? ` (${input.marks} marks${input.words ? `, ${input.words} words` : ""})` : ""}${paperLabel}:`,
  );
  parts.push("");
  parts.push(input.question);
  if (input.previousAnswer) {
    parts.push("");
    parts.push("Previously generated answer for reference (you may refine or replace it):");
    parts.push("");
    parts.push(input.previousAnswer);
  }
  return { system, user: parts.join("\n") };
}

export async function callLovableChat(
  apiKey: string,
  messages: { role: "system" | "user" | "assistant"; content: string }[],
): Promise<string> {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify({ model: "openai/gpt-5.5", messages }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    if (response.status === 429)
      throw new Error("AI is busy right now (rate limit). Please try again in a moment.");
    if (response.status === 402)
      throw new Error("AI credits exhausted for this workspace. Please add credits to continue.");
    throw new Error(`AI request failed (${response.status}): ${text.slice(0, 200)}`);
  }
  const json = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const answer = json.choices?.[0]?.message?.content ?? "";
  if (!answer) throw new Error("AI returned an empty response.");
  return answer;
}
