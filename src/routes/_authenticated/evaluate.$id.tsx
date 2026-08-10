import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { getEvaluation } from "@/lib/evaluations.functions";
import type { MultiEvalReport, QuestionEval } from "@/lib/evaluations.server";

export const Route = createFileRoute("/_authenticated/evaluate/$id")({
  component: EvaluationReport,
});

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

function QuestionCard({ q }: { q: QuestionEval }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Question {q.index}</div>
          <p className="mt-1 text-sm font-medium">{q.question}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {q.marks_out_of} marks · {q.marks_source === "stated" ? "printed on sheet" : `inferred from ${q.page_count} page(s)`}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 px-4 py-2 text-right">
          <div className="text-lg font-bold">{q.marks_low}–{q.marks_high} / {q.marks_out_of}</div>
          {q.band && <div className="text-xs text-muted-foreground">{q.band}</div>}
        </div>
      </div>

      {q.justification && <p className="mt-4 text-sm text-muted-foreground">{q.justification}</p>}

      {q.demand?.comment && (
        <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-3 text-sm">
          <span className="font-semibold">Demand of the question: </span>
          {q.demand.directives?.length ? <em>{q.demand.directives.join(", ")} — </em> : null}
          {q.demand.comment}
        </div>
      )}

      {q.detailed_evaluation && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{q.detailed_evaluation}</p>}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <List title="Strengths" items={q.strengths} />
        <List title="Weaknesses & gaps" items={q.weaknesses} />
        <List title="Missing dimensions" items={q.missing_dimensions} />
        <List title="Missing points" items={q.missing_points} />
        <List title="Suggestions for improvement" items={q.suggestions} />
        <List title="Keywords missing" items={q.keywords?.missing} />
      </div>

      {q.criteria?.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-1 pr-3">Criterion</th><th className="py-1 pr-3">Weight</th><th className="py-1 pr-3">Rating</th><th className="py-1">Comment</th></tr>
            </thead>
            <tbody>
              {q.criteria.map((c, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="py-1.5 pr-3 font-medium">{c.name}</td>
                  <td className="py-1.5 pr-3 text-muted-foreground">{c.weight}</td>
                  <td className="py-1.5 pr-3">{c.rating}</td>
                  <td className="py-1.5 text-muted-foreground">{c.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {q.value_addition?.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value addition to include</h4>
          <ul className="mt-2 space-y-1 text-sm">
            {q.value_addition.map((v, i) => (
              <li key={i}><span className="font-medium">{v.type}:</span> {v.item} <span className="text-muted-foreground">— {v.why}</span></li>
            ))}
          </ul>
        </div>
      )}

      {q.ideal_structure?.length > 0 && (
        <div className="mt-5 rounded-xl border border-border bg-secondary/30 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ideal answer structure</h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {q.ideal_structure.map((s, i) => (
              <li key={i}><span className="font-semibold">{s.section}:</span> {s.what_to_write}</li>
            ))}
          </ul>
        </div>
      )}

      {(q.presentation || q.language) && (
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          {q.presentation && <p><span className="font-semibold">Presentation: </span>{q.presentation}</p>}
          {q.language && <p><span className="font-semibold">Language: </span>{q.language}</p>}
        </div>
      )}

      <details className="mt-5">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your answer (as read)</summary>
        <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{q.answer_text}</p>
      </details>
    </section>
  );
}

function EvaluationReport() {
  const { id } = Route.useParams();
  const fetchEval = useServerFn(getEvaluation);
  const { data, isLoading } = useQuery({
    queryKey: ["evaluation", id],
    queryFn: () => fetchEval({ data: { id } }),
    refetchInterval: (q) => {
      const row = q.state.data as { status?: string } | undefined;
      return row && row.status !== "done" && row.status !== "error" ? 4000 : false;
    },
  });

  const row = data as
    | { status: string; error_message?: string | null; evaluation?: unknown; created_at?: string }
    | null
    | undefined;
  const report = row?.evaluation as MultiEvalReport | undefined;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link to="/evaluate/history" className="text-sm text-muted-foreground hover:text-foreground">← All evaluations</Link>

        {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading…</p>}
        {row && row.status === "error" && (
          <p className="mt-8 text-sm text-destructive">Evaluation failed: {row.error_message}</p>
        )}
        {row && row.status !== "done" && row.status !== "error" && (
          <p className="mt-8 text-sm text-muted-foreground">Working on your copy — {row.status}…</p>
        )}

        {report && report.questions?.length > 0 && (
          <>
            <header className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{report.subject_label}</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                {report.total_low}–{report.total_high} / {report.total_out_of}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {report.percentage_low}%–{report.percentage_high}% · {report.questions.length} question(s) evaluated
              </p>
              {report.overall_summary && <p className="mt-4 text-sm leading-relaxed">{report.overall_summary}</p>}
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <List title="Recurring weaknesses" items={report.recurring_weaknesses} />
                <List title="Recommendations" items={report.subject_recommendations} />
                <List title="Priority areas" items={report.priority_areas} />
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                    <tr><th className="py-1 pr-3">#</th><th className="py-1 pr-3">Question</th><th className="py-1 pr-3">Marks</th><th className="py-1">Band</th></tr>
                  </thead>
                  <tbody>
                    {report.questions.map((q) => (
                      <tr key={q.index} className="border-t border-border/60">
                        <td className="py-1.5 pr-3">{q.index}</td>
                        <td className="py-1.5 pr-3">{q.question.slice(0, 90)}{q.question.length > 90 ? "…" : ""}</td>
                        <td className="py-1.5 pr-3 whitespace-nowrap">{q.marks_low}–{q.marks_high} / {q.marks_out_of}</td>
                        <td className="py-1.5">{q.band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </header>

            <div className="mt-6 space-y-6">
              {report.questions.map((q) => <QuestionCard key={q.index} q={q} />)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
