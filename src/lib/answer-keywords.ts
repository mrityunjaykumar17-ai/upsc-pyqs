/**
 * Keyword utilities for UPSC model answers.
 *
 * Newly generated answers end with a "**Keywords:** …" line (enforced by the
 * prompt). Older answers imported from PDFs do not, so we derive keywords from
 * the bolded terms in the answer and render them under it.
 */

const KEYWORD_LINE = /(^|\n)\s*\*{0,2}Keywords\*{0,2}\s*:\s*(.+)$/i;

const STOP = new Set([
  "introduction", "conclusion", "body", "way forward", "challenges",
  "limitations", "significance", "background", "context", "analysis",
  "sources & further reading", "sources and further reading", "pros",
  "cons", "advantages", "disadvantages", "recommendation", "justification",
]);

/** Returns the keywords declared inside the answer, if any. */
export function parseKeywordLine(answer: string): string[] | null {
  const m = answer.match(KEYWORD_LINE);
  if (!m) return null;
  return m[2]
    .split(/·|\u2022|,|;|\|/)
    .map((s) => s.replace(/[*_`]/g, "").trim())
    .filter(Boolean)
    .slice(0, 12);
}

/** Removes the trailing keyword line so it can be rendered as chips instead. */
export function stripKeywordLine(answer: string): string {
  return answer.replace(KEYWORD_LINE, "").trimEnd();
}

/** Derives keywords from bolded terms when the answer has no keyword line. */
export function deriveKeywords(answer: string, limit = 10): string[] {
  const seen = new Map<string, number>();
  for (const m of answer.matchAll(/\*\*(.+?)\*\*/g)) {
    const raw = m[1].replace(/[:–—-]\s*$/, "").replace(/[*_`]/g, "").trim();
    if (!raw || raw.length < 3 || raw.length > 48) continue;
    const key = raw.toLowerCase();
    if (STOP.has(key)) continue;
    if (/^\d+[.)]?$/.test(raw)) continue;
    seen.set(raw, (seen.get(raw) ?? 0) + 1);
  }
  return [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k)
    .slice(0, limit);
}

/** Answer body plus the keyword list to display beneath it. */
export function splitAnswer(answer: string): { body: string; keywords: string[] } {
  const declared = parseKeywordLine(answer);
  if (declared?.length) return { body: stripKeywordLine(answer), keywords: declared };
  return { body: answer, keywords: deriveKeywords(answer) };
}
