import { useMemo, useState } from "react";
import type { MatchedCoaching } from "../data/resources";
import { SimilarityBadge } from "./SimilarityBadge";

type SortKey = "similarity" | "latest" | "institute";

export function CoachingMatches({ matches }: { matches: MatchedCoaching[] }) {
  const [institute, setInstitute] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [minSim, setMinSim] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("similarity");
  const [search, setSearch] = useState("");

  const institutes = useMemo(
    () => Array.from(new Set(matches.map((m) => m.institute))).sort(),
    [matches],
  );
  const years = useMemo(
    () => Array.from(new Set(matches.map((m) => m.year))).sort((a, b) => b - a),
    [matches],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = matches.filter((m) => {
      if (institute !== "all" && m.institute !== institute) return false;
      if (year !== "all" && String(m.year) !== year) return false;
      if (m.similarity < minSim) return false;
      if (q) {
        const hay = `${m.question} ${m.topic} ${m.test_series} ${m.institute}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "similarity") list = [...list].sort((a, b) => b.similarity - a.similarity);
    else if (sort === "latest") list = [...list].sort((a, b) => b.year - a.year);
    else if (sort === "institute")
      list = [...list].sort((a, b) => a.institute.localeCompare(b.institute));
    return list;
  }, [matches, institute, year, minSim, sort, search]);

  if (matches.length === 0) {
    return (
      <EmptyState message="No matching coaching questions available yet." />
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 rounded-xl border border-border bg-card/60 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            label="Institute"
            value={institute}
            onChange={setInstitute}
            options={[{ value: "all", label: "All institutes" }, ...institutes.map((i) => ({ value: i, label: i }))]}
          />
          <FilterSelect
            label="Year"
            value={year}
            onChange={setYear}
            options={[{ value: "all", label: "All years" }, ...years.map((y) => ({ value: String(y), label: String(y) }))]}
          />
          <FilterSelect
            label="Min similarity"
            value={String(minSim)}
            onChange={(v) => setMinSim(Number(v))}
            options={[
              { value: "0", label: "Any" },
              { value: "80", label: "80%+" },
              { value: "90", label: "90%+" },
              { value: "95", label: "95%+" },
            ]}
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              { value: "similarity", label: "Highest similarity" },
              { value: "latest", label: "Latest" },
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
              placeholder="Search topic or text…"
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No matches for the selected filters." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <article
              key={m.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-lg">
                    {m.institute_logo ?? "🏫"}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{m.institute}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.test_series} · {m.paper_name} · {m.year}
                    </div>
                  </div>
                </div>
                <SimilarityBadge score={m.similarity} />
              </header>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                  Q{m.question_number}
                </span>
                <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                  {m.topic}
                </span>
                <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                  Page {m.page_number}
                </span>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">{m.question}</p>

              <a
                href={`${m.pdf_url}#page=${m.page_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open PDF
                <span aria-hidden>↗</span>
              </a>
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
