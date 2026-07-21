import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getEvaluation } from "@/lib/evaluations.functions";
import { SiteHeader } from "@/components/SiteHeader";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/_authenticated/evaluate/$id")({
  component: EvalResult,
});

type EvalReport = {
  marks_awarded: number;
  marks_out_of: number;
  expected_range: string;
  overall: string;
  demand_analysis: { directives: string[]; addressed: boolean; comment: string };
  structure: { introduction: string; body: string; conclusion: string; suggested_intro?: string; suggested_conclusion?: string };
  content_quality: { strengths: string[]; weaknesses: string[]; dimensions_covered: string[]; missing_dimensions: string[] };
  keywords: { present: string[]; missing: string[] };
  value_addition: { present: string[]; suggested: { type: string; item: string; why: string }[] };
  diagrams: { present: boolean; suggestions: string[] };
  underlines: { good: boolean; suggested_to_underline: string[] };
  handwriting: { comment: string };
  language: { comment: string };
  time_management: { word_count_estimate: number; comment: string };
  missing_points: string[];
  improved_answer: string;
};

function EvalResult() {
  const { id } = Route.useParams();
  const getFn = useServerFn(getEvaluation);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["evaluation", id],
    queryFn: () => getFn({ data: { id } }),
    refetchInterval: (q) => {
      const s = (q.state.data as { status?: string } | undefined)?.status;
      return s === "done" || s === "error" ? false : 3000;
    },
  });

  if (isLoading) return <Shell><p className="text-muted-foreground">Loading…</p></Shell>;
  if (!data) return <Shell><p className="text-muted-foreground">Evaluation not found.</p></Shell>;

  if (data.status !== "done") {
    return (
      <Shell>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
            <div>
              <div className="font-semibold">Working on your evaluation…</div>
              <div className="text-sm text-muted-foreground capitalize">Status: {data.status}</div>
            </div>
          </div>
          {data.error_message && (
            <p className="mt-4 text-sm text-destructive">{data.error_message}</p>
          )}
          <button onClick={() => refetch()} className="mt-4 text-sm text-primary underline">
            Refresh
          </button>
        </div>
      </Shell>
    );
  }

  const report = data.evaluation as EvalReport | null;
  if (!report) return <Shell><p>No report available.</p></Shell>;

  return (
    <Shell>
      {/* Score hero */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-baseline gap-4">
          <div className="text-5xl font-bold text-primary">
            {report.marks_awarded} <span className="text-2xl text-muted-foreground">/ {report.marks_out_of}</span>
          </div>
          <div className="text-sm text-muted-foreground">Expected UPSC range: <span className="font-medium text-foreground">{report.expected_range}</span></div>
        </div>
        <p className="mt-4 text-sm">{report.overall}</p>
      </div>

      {data.detected_question && (
        <Card title="Detected question">
          <p className="text-sm">{data.detected_question}</p>
        </Card>
      )}

      <Card title="Demand analysis">
        <div className="flex flex-wrap gap-2">
          {report.demand_analysis.directives.map((d) => (
            <span key={d} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{d}</span>
          ))}
        </div>
        <p className={`mt-2 text-xs font-medium ${report.demand_analysis.addressed ? "text-emerald-600" : "text-amber-600"}`}>
          {report.demand_analysis.addressed ? "✓ Directives addressed" : "⚠ Directives not fully addressed"}
        </p>
        <p className="mt-2 text-sm">{report.demand_analysis.comment}</p>
      </Card>

      <Card title="Structure: intro / body / conclusion">
        <Section label="Introduction">{report.structure.introduction}</Section>
        <Section label="Body">{report.structure.body}</Section>
        <Section label="Conclusion">{report.structure.conclusion}</Section>
        {report.structure.suggested_intro && <Section label="Suggested intro"><em>{report.structure.suggested_intro}</em></Section>}
        {report.structure.suggested_conclusion && <Section label="Suggested conclusion"><em>{report.structure.suggested_conclusion}</em></Section>}
      </Card>

      <Card title="Content quality">
        <TwoCol>
          <List label="Strengths" items={report.content_quality.strengths} tone="good" />
          <List label="Weaknesses" items={report.content_quality.weaknesses} tone="bad" />
        </TwoCol>
        <TwoCol>
          <Chips label="Dimensions covered" items={report.content_quality.dimensions_covered} tone="good" />
          <Chips label="Missing dimensions" items={report.content_quality.missing_dimensions} tone="bad" />
        </TwoCol>
      </Card>

      <Card title="Keywords">
        <TwoCol>
          <Chips label="Present" items={report.keywords.present} tone="good" />
          <Chips label="Missing" items={report.keywords.missing} tone="bad" />
        </TwoCol>
      </Card>

      <Card title="Value addition">
        <Chips label="Present" items={report.value_addition.present} tone="good" />
        <div className="mt-3 space-y-2">
          {report.value_addition.suggested.map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.type}</div>
              <div className="font-medium">{s.item}</div>
              <div className="text-sm text-muted-foreground">{s.why}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Diagrams">
        <p className="text-sm">{report.diagrams.present ? "✓ Diagram(s) present in answer sheet." : "No diagrams detected."}</p>
        {report.diagrams.suggestions.length > 0 && <List label="Suggestions" items={report.diagrams.suggestions} />}
      </Card>

      <Card title="Underlining">
        <p className="text-sm">{report.underlines.good ? "✓ Key terms underlined." : "Underline more keywords for examiner attention."}</p>
        <Chips label="Suggested underlines" items={report.underlines.suggested_to_underline} />
      </Card>

      <Card title="Presentation & language">
        <Section label="Handwriting">{report.handwriting.comment}</Section>
        <Section label="Language">{report.language.comment}</Section>
        <Section label="Time / word count">
          ~{report.time_management.word_count_estimate} words · {report.time_management.comment}
        </Section>
      </Card>

      <Card title="What else could have been written">
        <List items={report.missing_points} />
      </Card>

      <Card title="Topper-level improved answer">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{report.improved_answer}</ReactMarkdown>
        </div>
      </Card>

      <div className="flex gap-3">
        <Link to="/evaluate/upload" className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent">
          Evaluate another answer
        </Link>
        <Link to="/evaluate/history" className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent">
          View history
        </Link>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl space-y-4 px-6 py-8">{children}</main>
    </div>
  );
}
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 mt-2">{children}</div>;
}
function List({ label, items, tone }: { label?: string; items: string[]; tone?: "good" | "bad" }) {
  if (!items?.length) return null;
  return (
    <div>
      {label && <div className="text-xs font-semibold text-muted-foreground">{label}</div>}
      <ul className="mt-1 space-y-1 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className={tone === "good" ? "text-emerald-600" : tone === "bad" ? "text-amber-600" : "text-muted-foreground"}>•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Chips({ label, items, tone }: { label: string; items: string[]; tone?: "good" | "bad" }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span
            key={i}
            className={`rounded-full px-2 py-0.5 text-xs ${
              tone === "good" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
              tone === "bad" ? "bg-amber-500/10 text-amber-700 dark:text-amber-400" :
              "bg-secondary"
            }`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
