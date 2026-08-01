import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { getPrelimsCounts, PRELIMS_SUBJECTS, PRELIMS_YEARS } from "@/lib/prelims.functions";
import { listAttempts, resetProgress } from "@/lib/prelims-attempts.functions";

export const Route = createFileRoute("/prelims/")({
  component: PrelimsDashboard,
  head: () => ({
    meta: [
      { title: "Prelims PYQ Practice (2013–2025) | UPSC CSE" },
      {
        name: "description",
        content:
          "Practice 1,300+ UPSC Prelims previous year MCQs year-wise with a 2-hour timer or subject-wise, with UPSC negative marking and detailed review.",
      },
      { property: "og:title", content: "UPSC Prelims PYQ Practice 2013–2025" },
      {
        property: "og:description",
        content: "Year-wise timed papers and subject-wise practice with UPSC-style scoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Attempt = {
  id: string;
  mode: string;
  year: number | null;
  subject: string | null;
  submitted_at: string | null;
  score: number | null;
  max_score: number | null;
  accuracy: number | null;
};

function PrelimsDashboard() {
  const navigate = useNavigate();
  const fetchCounts = useServerFn(getPrelimsCounts);
  const fetchAttempts = useServerFn(listAttempts);
  const doReset = useServerFn(resetProgress);

  const [counts, setCounts] = useState<{ byYear: Record<string, number>; bySubject: Record<string, number> } | null>(
    null,
  );
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [tab, setTab] = useState<"year" | "subject">("year");
  const [confirm, setConfirm] = useState<{ mode: "year" | "subject"; label: string; year?: number; subject?: string } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);

  const load = () => {
    fetchCounts().then(setCounts).catch(() => setCounts({ byYear: {}, bySubject: {} }));
    fetchAttempts()
      .then((rows) => setAttempts(rows as Attempt[]))
      .catch(() => setAttempts([]));
  };
  useEffect(load, [fetchCounts, fetchAttempts]);

  const bestFor = (mode: "year" | "subject", key: string | number) =>
    attempts
      .filter((a) => a.mode === mode && a.submitted_at && String(mode === "year" ? a.year : a.subject) === String(key))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];

  const hasAny = (mode: "year" | "subject", key: string | number) =>
    attempts.some((a) => a.mode === mode && String(mode === "year" ? a.year : a.subject) === String(key));

  async function handleReset() {
    if (!confirm) return;
    setBusy(true);
    try {
      await doReset({ data: { mode: confirm.mode, year: confirm.year ?? null, subject: confirm.subject ?? null } });
      setConfirm(null);
      load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight">Prelims PYQ Practice</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          1,300+ UPSC Prelims previous year questions (2013–2025). Year-wise papers run on a strict 2-hour
          timer with UPSC negative marking (+2 correct, −2/3 incorrect). Officially dropped questions are shown
          but never scored.
        </p>

        <div className="mt-6 inline-flex rounded-lg border border-border bg-card p-1 text-sm">
          {(["year", "subject"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-4 py-1.5 font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "year" ? "Year-wise" : "Subject-wise"}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tab === "year"
            ? PRELIMS_YEARS.map((y) => {
                const best = bestFor("year", y);
                return (
                  <div key={y} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-lg font-semibold">UPSC {y}</h2>
                      <span className="text-xs text-muted-foreground">{counts?.byYear?.[String(y)] ?? "—"} Qs</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Full paper · 2 hours</p>
                    {best ? (
                      <p className="mt-3 text-sm">
                        Best: <span className="font-semibold">{best.score}</span> / {best.max_score} ·{" "}
                        {best.accuracy}% accuracy
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">Not attempted yet</p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => navigate({ to: "/prelims/year/$year", params: { year: String(y) } })}
                        className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        {hasAny("year", y) ? "Resume / Retake" : "Start test"}
                      </button>
                      {hasAny("year", y) && (
                        <button
                          onClick={() => setConfirm({ mode: "year", label: `UPSC ${y}`, year: y })}
                          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            : PRELIMS_SUBJECTS.map((s) => {
                const best = bestFor("subject", s);
                return (
                  <div key={s} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="text-lg font-semibold">{s}</h2>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {counts?.bySubject?.[s] ?? "—"} Qs
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">All years · untimed</p>
                    {best ? (
                      <p className="mt-3 text-sm">
                        Best: <span className="font-semibold">{best.score}</span> / {best.max_score} ·{" "}
                        {best.accuracy}% accuracy
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">Not attempted yet</p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate({ to: "/prelims/subject/$subject", params: { subject: encodeURIComponent(s) } })
                        }
                        className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        {hasAny("subject", s) ? "Resume / Retake" : "Start practice"}
                      </button>
                      {hasAny("subject", s) && (
                        <button
                          onClick={() => setConfirm({ mode: "subject", label: s, subject: s })}
                          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>

        {attempts.filter((a) => a.submitted_at).length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold tracking-tight">Recent attempts</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 font-medium">Paper</th>
                    <th className="px-4 py-2 font-medium">Score</th>
                    <th className="px-4 py-2 font-medium">Accuracy</th>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {attempts
                    .filter((a) => a.submitted_at)
                    .slice(0, 15)
                    .map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-4 py-2">{a.mode === "year" ? `UPSC ${a.year}` : a.subject}</td>
                        <td className="px-4 py-2 font-medium">
                          {a.score} / {a.max_score}
                        </td>
                        <td className="px-4 py-2">{a.accuracy}%</td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {new Date(a.submitted_at!).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Link
                            to="/prelims/result/$attemptId"
                            params={{ attemptId: a.id }}
                            className="text-primary hover:underline"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>


      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Reset {confirm.label}?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This permanently clears your attempts, answers and scores for {confirm.label}. This cannot be
              undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={busy}
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
              >
                {busy ? "Resetting…" : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
