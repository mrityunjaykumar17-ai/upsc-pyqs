import type { TopperCopy } from "../data/resources";
import { EmptyState } from "./CoachingMatches";

export function TopperCopies({ copies }: { copies: TopperCopy[] }) {
  if (copies.length === 0) {
    return <EmptyState message="No topper copies linked yet." />;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {copies.map((t) => (
        <article
          key={t.id}
          className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
        >
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                #{t.rank}
              </span>
              <div>
                <div className="font-semibold text-foreground">{t.candidate_name}</div>
                <div className="text-xs text-muted-foreground">
                  Rank {t.rank} · {t.year} · {t.subject}
                </div>
              </div>
            </div>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
              Page {t.page_number}
            </span>
          </header>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
            {t.matching_question}
          </p>
          <a
            href={`${t.pdf_url}#page=${t.page_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open PDF <span aria-hidden>↗</span>
          </a>
        </article>
      ))}
    </div>
  );
}
