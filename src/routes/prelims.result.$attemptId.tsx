import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { getAttemptResult } from "@/lib/prelims-attempts.functions";
import { GUEST_RESULT_KEY } from "@/lib/prelims-guest-store";

export const Route = createFileRoute("/prelims/result/$attemptId")({
  component: ResultPage,
  head: () => ({
    meta: [
      { title: "Attempt Result — UPSC Prelims Practice" },
      { name: "description", content: "Your score, accuracy and question-by-question review for this Prelims attempt." },
      { property: "og:title", content: "UPSC Prelims Attempt Result" },
      { property: "og:description", content: "Score, accuracy and full answer review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Result = Awaited<ReturnType<typeof getAttemptResult>>;

function ResultPage() {
  const { attemptId } = Route.useParams();
  const fetchResult = useServerFn(getAttemptResult);
  const [data, setData] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (attemptId === "guest") {
      try {
        const raw = sessionStorage.getItem(GUEST_RESULT_KEY);
        if (!raw) {
          setError("This result is no longer available. Please attempt the paper again.");
          return;
        }
        setData(JSON.parse(raw) as Result);
      } catch {
        setError("This result is no longer available. Please attempt the paper again.");
      }
      return;
    }
    fetchResult({ data: { attemptId } })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load this attempt"));
  }, [fetchResult, attemptId]);


  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-16 text-sm text-destructive">{error}</main>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-16 text-sm text-muted-foreground">Loading result…</main>
      </div>
    );
  }

  const a = data.attempt;
  const responses = new Map(data.responses.map((r) => [r.question_id, r]));
  const label = a.mode === "year" ? `UPSC Prelims ${a.year}` : `${a.subject} — All years`;

  const stats = [
    ["Score", `${a.score ?? 0} / ${a.max_score ?? 0}`],
    ["Accuracy", `${a.accuracy ?? 0}%`],
    ["Correct", String(a.correct_count ?? 0)],
    ["Incorrect", String(a.incorrect_count ?? 0)],
    ["Unattempted", String(a.unattempted_count ?? 0)],
    ["Scored questions", String(a.total_scored ?? 0)],
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link to="/prelims" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Prelims
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">{label}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          +2 for correct, −2/3 for incorrect. Dropped questions are excluded from scoring.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-lg font-semibold tracking-tight">Review</h2>
        <ol className="mt-4 space-y-4">
          {data.questions.map((q, i) => {
            const r = responses.get(q.id);
            const sel = r?.selected_option ?? null;
            const options: [string, string][] = [
              ["a", q.option_a],
              ["b", q.option_b],
              ["c", q.option_c],
              ["d", q.option_d],
            ];
            return (
              <li key={q.id} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">Q{i + 1}</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{q.subject}</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{q.year}</span>
                  {q.is_dropped ? (
                    <span className="rounded bg-secondary px-2 py-0.5 text-muted-foreground">Dropped</span>
                  ) : sel == null ? (
                    <span className="rounded bg-secondary px-2 py-0.5 text-muted-foreground">Unattempted</span>
                  ) : sel === q.correct_option ? (
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
                      Correct
                    </span>
                  ) : (
                    <span className="rounded bg-destructive/10 px-2 py-0.5 text-destructive">Incorrect</span>
                  )}
                </div>
                {q.is_dropped && (
                  <p className="mb-2 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
                    This question was dropped by UPSC and is not scored.
                  </p>
                )}
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{q.question_text}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {options.map(([key, text]) => {
                    const isCorrect = q.correct_option === key;
                    const isChosen = sel === key;
                    return (
                      <li
                        key={key}
                        className={`rounded-lg border px-3 py-2 ${
                          isCorrect
                            ? "border-emerald-500/40 bg-emerald-500/10"
                            : isChosen
                              ? "border-destructive/40 bg-destructive/10"
                              : "border-border"
                        }`}
                      >
                        <span className="mr-2 font-semibold">({key})</span>
                        {text || "—"}
                        {isChosen && <span className="ml-2 text-xs text-muted-foreground">your answer</span>}
                        {isCorrect && <span className="ml-2 text-xs text-muted-foreground">correct answer</span>}
                      </li>
                    );
                  })}
                </ul>
                {q.comments && <p className="mt-3 text-xs text-muted-foreground">Note: {q.comments}</p>}
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
