import { useState } from "react";
import type {
  SociologyMatchLevel,
  SociologyTopperMatch,
} from "@/lib/sociology-matches.functions";

const LEVELS: {
  key: SociologyMatchLevel;
  label: string;
  blurb: string;
  chip: string;
}[] = [
  {
    key: "exact",
    label: "Exact match",
    blurb: "The same question was attempted in a topper's test copy.",
    chip: "bg-green-500/15 text-green-700 ring-green-500/30 dark:text-green-300",
  },
  {
    key: "similar",
    label: "Similar question",
    blurb: "Same concept and directive, slightly different framing.",
    chip: "bg-blue-500/15 text-blue-700 ring-blue-500/30 dark:text-blue-300",
  },
  {
    key: "related",
    label: "Related theme",
    blurb: "Same syllabus area — useful for structure and thinkers.",
    chip: "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300",
  },
];

function copyHref(m: SociologyTopperMatch) {
  return m.page_start ? `${m.pdf_url}#page=${m.page_start}` : m.pdf_url;
}

function MatchCard({ m, chip }: { m: SociologyTopperMatch; chip: string }) {
  const pages =
    m.page_start && m.page_end && m.page_end !== m.page_start
      ? `pp. ${m.page_start}–${m.page_end}`
      : m.page_start
        ? `p. ${m.page_start}`
        : null;
  return (
    <a
      href={copyHref(m)}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-accent"
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className={`rounded-full px-2 py-0.5 font-semibold ring-1 ${chip}`}>
          {m.similarity}% match
        </span>
        <span className="font-medium text-foreground">{m.topper_name}</span>
        {m.rank && <span className="text-muted-foreground">AIR {m.rank}</span>}
        {m.upsc_year && <span className="text-muted-foreground">· CSE {m.upsc_year}</span>}
        <span className="text-muted-foreground">· {m.source_site}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{m.topper_question}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        {m.copy_name && (
          <span className="rounded bg-secondary px-1.5 py-0.5 text-secondary-foreground">
            {m.copy_name}
          </span>
        )}
        {m.paper && (
          <span className="rounded bg-secondary px-1.5 py-0.5 text-secondary-foreground">
            {m.paper}
          </span>
        )}
        {pages && <span>{pages}</span>}
        <span className="ml-auto font-medium text-primary">Open copy ↗</span>
      </div>
      {m.matching_reason && (
        <p className="mt-1.5 text-[11px] italic text-muted-foreground">{m.matching_reason}</p>
      )}
    </a>
  );
}

/** Topper answer copies matched to one PYQ, grouped Exact → Similar → Related. */
export function SociologyMatches({ matches }: { matches: SociologyTopperMatch[] }) {
  const [open, setOpen] = useState(false);
  if (!matches.length) return null;

  const counts = LEVELS.map((l) => ({
    ...l,
    items: matches.filter((m) => m.match_type === l.key),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
      >
        <span>📝</span>
        Topper answer copies ({matches.length})
        <span className="text-muted-foreground">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-4">
          {counts.map((g) => (
            <section key={g.key}>
              <div className="mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {g.label} ({g.items.length})
                </h4>
                <p className="text-[11px] text-muted-foreground">{g.blurb}</p>
              </div>
              <div className="grid gap-2">
                {g.items.map((m) => (
                  <MatchCard key={m.id} m={m} chip={g.chip} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
