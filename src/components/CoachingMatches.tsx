import { useMemo, useState } from "react";
import type { MatchRow } from "../lib/matches.functions";
import { SimilarityBadge } from "./SimilarityBadge";

type SortKey = "similarity" | "year" | "topper" | "institute";

const INSTITUTE_LABEL: Record<string, string> = {
  Forumias: "ForumIAS",
  Vision: "Vision IAS",
  Visionias: "Vision IAS",
  Nextias: "Next IAS",
  Lukmaanias: "Lukmaan IAS",
  Lukmaan: "Lukmaan IAS",
  Raus: "Rau's IAS",
  Gsscore: "GS Score",
  Masterstroke: "Masterstroke",
  Drishti: "Drishti IAS",
  Insightsias: "Insights IAS",
  Vajiram: "Vajiram & Ravi",
};
const label = (i: string) => INSTITUTE_LABEL[i] || i;

export function CoachingMatches({ matches }: { matches: MatchRow[] }) {
  const [institute, setInstitute] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("similarity");
  const [search, setSearch] = useState("");

  const institutes = useMemo(
    () => Array.from(new Set(matches.map((m) => m.coaching_institute))).sort(),
    [matches],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = matches.filter((m) => {
      if (institute !== "all" && m.coaching_institute !== institute) return false;
      if (q && !`${m.question_text} ${m.topper_name} ${m.coaching_institute}`.toLowerCase().includes(q))
        return false;
      return true;
    });
    if (sort === "similarity") list = [...list].sort((a, b) => b.similarity - a.similarity);
    else if (sort === "year")
      list = [...list].sort((a, b) => (b.upsc_year ?? 0) - (a.upsc_year ?? 0));
    else if (sort === "topper")
      list = [...list].sort((a, b) => a.topper_name.localeCompare(b.topper_name));
    else if (sort === "institute")
      list = [...list].sort((a, b) => a.coaching_institute.localeCompare(b.coaching_institute));
    return list;
  }, [matches, institute, sort, search]);

  if (matches.length === 0) {
    return <EmptyState message="No matching coaching questions available yet." />;
  }

  return (
    <div>
      <div className="mb-4 rounded-xl border border-border bg-card/60 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Institute"
            value={institute}
            onChange={setInstitute}
            options={[
              { value: "all", label: "All institutes" },
              ...institutes.map((i) => ({ value: i, label: label(i) })),
            ]}
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              { value: "similarity", label: "Most Relevant" },
              { value: "year", label: "UPSC Year" },
              { value: "topper", label: "Topper" },
              { value: "institute", label: "Institute" },
            ]}
          />
          <div className="flex flex-col">
            <label className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Search within matches
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Topper, institute or text…"
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Showing {filtered.length} of {matches.length} matches
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No matches for the selected filters." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((m) => (
            <article
              key={m.match_id}
              className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {label(m.coaching_institute)}
                </span>
                <SimilarityBadge score={Math.round(m.similarity * 100)} />
              </div>

              <div className="mt-3 space-y-0.5 text-xs">
                <div>
                  <span className="text-muted-foreground">Candidate: </span>
                  <span className="font-medium text-foreground">{m.topper_name}</span>
                </div>
                {m.appearances && m.appearances.length > 0 ? (
                  <div>
                    <span className="text-muted-foreground">UPSC CSE: </span>
                    <span className="font-medium text-foreground">
                      {m.appearances
                        .map((a) => `${a.year} · AIR ${a.rank}`)
                        .join(" | ")}
                    </span>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-muted-foreground">AIR: </span>
                      <span className="font-medium text-foreground">
                        {m.rank ?? "Rank not available"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">UPSC CSE: </span>
                      <span className="font-medium text-foreground">
                        {m.upsc_year ?? "Year not available"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Relevant question
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{m.question_text}</p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-xs text-muted-foreground">
                  Relevant answer:{" "}
                  <span className="font-medium text-foreground">
                    {m.page_number ? `Page ${m.page_number}` : "See PDF"}
                  </span>
                </span>
                <a
                  href={m.page_number ? `${m.pdf_url}#page=${m.page_number}` : m.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                >
                  View Topper Copy <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
