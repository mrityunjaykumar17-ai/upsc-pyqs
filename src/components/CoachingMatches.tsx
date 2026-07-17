import { useMemo, useState } from "react";
import type { MatchRow } from "../lib/matches.functions";
import { SimilarityBadge } from "./SimilarityBadge";

type SortKey = "similarity" | "year" | "topper" | "institute";

// Normalize institute display names
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
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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
        <div className="space-y-3">
          {filtered.map((m) => {
            const isOpen = expanded.has(m.match_id);
            const gsKey = m.gs_paper?.toLowerCase();
            const gsScore =
              gsKey === "gs1" ? m.gs1_score
              : gsKey === "gs2" ? m.gs2_score
              : gsKey === "gs3" ? m.gs3_score
              : gsKey === "gs4" ? m.gs4_score
              : gsKey === "essay" ? m.essay_score
              : null;
            return (
              <article
                key={m.match_id}
                className="rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/40"
              >
                <button
                  onClick={() =>
                    setExpanded((prev) => {
                      const n = new Set(prev);
                      n.has(m.match_id) ? n.delete(m.match_id) : n.add(m.match_id);
                      return n;
                    })
                  }
                  className="w-full p-4 text-left"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                        {label(m.coaching_institute)}
                      </span>
                      {m.gs_paper && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                          {m.gs_paper}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        Topper: <span className="font-medium text-foreground">{m.topper_name}</span>
                      </span>
                      {m.upsc_year && (
                        <span className="text-muted-foreground">· CSE {m.upsc_year}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <SimilarityBadge score={Math.round(m.similarity * 100)} />
                      <span className="text-muted-foreground text-xs">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {m.question_text}
                  </p>
                </button>

                {isOpen && (
                  <div className="border-t border-border px-4 py-3 text-sm">
                    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      <Field label="Topper" value={m.topper_name} />
                      <Field label="UPSC CSE Year" value={m.upsc_year ?? "Not available"} />
                      <Field label="Rank" value={m.rank ?? "Not available"} />
                      <Field
                        label={`${m.gs_paper ?? "GS"} Score`}
                        value={gsScore ?? "Not available"}
                      />
                      <Field label="Institute" value={label(m.coaching_institute)} />
                      <Field label="Test Series" value={m.test_series ?? "Not available"} />
                      <Field label="PDF Page" value={m.page_number ?? "Not available"} />
                      {m.metadata && <Field label="Note" value={m.metadata} />}
                    </dl>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Relevant answer: Page {m.page_number ?? "—"}
                      </span>
                      <a
                        href={m.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                      >
                        View Topper Answer <span aria-hidden>↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
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
