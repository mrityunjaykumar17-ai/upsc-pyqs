import type { SociologyTopperCopy } from "@/lib/sociology.functions";

/**
 * Sociology-optional answer copies scraped from public topper-copy libraries.
 * Ranked best-first so the strongest copies surface at the top of a topic page.
 */
export function SociologyTopperCopies({ copies }: { copies: SociologyTopperCopy[] }) {
  if (copies.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
        No Sociology topper copies linked yet.
      </p>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {copies.map((c) => (
        <a
          key={c.id}
          href={c.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
        >
          <div>
            <div className="font-medium text-foreground">{c.topper_name}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {c.rank ? `AIR ${c.rank}` : "Topper"}
              {c.upsc_year ? ` · CSE ${c.upsc_year}` : ""} · {c.source_site}
              {c.paper ? ` · ${c.paper}` : ""}
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
            Open ↗
          </span>
        </a>
      ))}
    </div>
  );
}
