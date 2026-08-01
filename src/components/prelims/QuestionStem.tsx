/**
 * UPSC Prelims stems are stored as a single run-on line, e.g.
 *   "Consider the following statements: 1. ... 2. ... How many of the above are correct?"
 * This component splits the lead-in, the numbered/roman statements and the
 * trailing directive onto their own lines so the question reads like the paper.
 */

const TRAILING_RE =
  /\s(How many of the (?:above|statements)[\s\S]*|Which of the (?:above|statements|pairs)[\s\S]*|Select the correct answer[\s\S]*|The correct answer is[\s\S]*)$/i;

const MARKER_RE = /\s(?=(?:\d{1,2}|[IVX]{1,4})\.\s)/g;

export type ParsedStem = { lead: string; statements: string[]; trailing: string };

export function parseStem(raw: string): ParsedStem {
  const text = (raw ?? "").replace(/\s+/g, " ").trim();

  // A stem already broken into lines is left as-is.
  if (/\n/.test(raw ?? "")) {
    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    return { lead: lines[0] ?? "", statements: lines.slice(1), trailing: "" };
  }

  const parts = text.split(MARKER_RE).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return { lead: text, statements: [], trailing: "" };

  const lead = parts[0];
  const statements = parts.slice(1);
  let trailing = "";

  const last = statements[statements.length - 1];
  const m = last?.match(TRAILING_RE);
  if (m) {
    trailing = m[1].trim();
    statements[statements.length - 1] = last.replace(TRAILING_RE, "").trim();
  }

  return { lead, statements: statements.filter(Boolean), trailing };
}

export function QuestionStem({ text, className = "" }: { text: string; className?: string }) {
  const { lead, statements, trailing } = parseStem(text);

  if (statements.length === 0) {
    return (
      <p className={`whitespace-pre-wrap text-[15px] leading-relaxed text-foreground ${className}`}>
        {lead}
      </p>
    );
  }

  return (
    <div className={`text-[15px] leading-relaxed text-foreground ${className}`}>
      {lead && <p>{lead}</p>}
      <ul className="mt-2 space-y-1.5 pl-1">
        {statements.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {s.match(/^(?:\d{1,2}|[IVX]{1,4})\./)?.[0] ?? "•"}
            </span>
            <span>{s.replace(/^(?:\d{1,2}|[IVX]{1,4})\.\s*/, "")}</span>
          </li>
        ))}
      </ul>
      {trailing && <p className="mt-2 font-medium">{trailing}</p>}
    </div>
  );
}
