import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { papers } from "../data/pyq";

type IndexEntry = {
  q: string;
  n: number;
  year: number;
  paperSlug: string;
  paperName: string;
  subjectSlug: string;
  subjectName: string;
};

let cached: IndexEntry[] | null = null;
function buildIndex(): IndexEntry[] {
  if (cached) return cached;
  const out: IndexEntry[] = [];
  for (const p of papers) {
    for (const s of p.subjects) {
      for (const y of s.years) {
        for (const q of y.questions) {
          out.push({
            q: q.q,
            n: q.n,
            year: y.year,
            paperSlug: p.slug,
            paperName: p.name,
            subjectSlug: s.slug,
            subjectName: s.name,
          });
        }
      }
    }
  }
  cached = out;
  return out;
}

export function QuestionSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    const scored: { entry: IndexEntry; score: number }[] = [];
    for (const e of index) {
      const text = e.q.toLowerCase();
      let score = 0;
      let ok = true;
      for (const t of terms) {
        const i = text.indexOf(t);
        if (i === -1) {
          ok = false;
          break;
        }
        score += 100 - Math.min(i, 100);
      }
      if (ok) scored.push({ entry: e, score });
      if (scored.length > 500) break;
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map((s) => s.entry);
  }, [query, index]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goTo = (e: IndexEntry) => {
    setOpen(false);
    setQuery("");
    navigate({
      to: "/gs/$paper/$subject/$year",
      params: { paper: e.paperSlug, subject: e.subjectSlug, year: String(e.year) },
      hash: `q-${e.n}`,
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const terms = q.split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return text;
    const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    const parts = text.split(pattern);
    return parts.map((p, i) =>
      pattern.test(p) ? (
        <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
          {p}
        </mark>
      ) : (
        <span key={i}>{p}</span>
      ),
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-3.5-3.5" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search any UPSC Mains question… (e.g. inflation, secularism, ethics)"
          className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-base shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-auto rounded-xl border border-border bg-card shadow-lg">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No questions found.</div>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={`${r.paperSlug}-${r.subjectSlug}-${r.year}-${r.n}`}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => goTo(r)}
                    className={`flex w-full flex-col items-start gap-1 border-b border-border/60 px-4 py-3 text-left transition-colors last:border-b-0 ${
                      i === active ? "bg-primary/10" : "hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-medium uppercase tracking-wider">
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                        {r.paperName}
                      </span>
                      <span className="rounded bg-secondary px-1.5 py-0.5 text-secondary-foreground">
                        {r.subjectName}
                      </span>
                      <span className="rounded bg-secondary px-1.5 py-0.5 text-secondary-foreground">
                        {r.year}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-foreground">{highlight(r.q)}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
