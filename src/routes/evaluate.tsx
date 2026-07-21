import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/evaluate")({
  head: () => ({
    meta: [
      { title: "AI Evaluation — UPSC Mains Answer Sheet Review" },
      { name: "description", content: "Upload your handwritten UPSC Mains answer and get instant AI-powered evaluation covering marks, structure, demand analysis, missing dimensions, keywords, and a topper-style model answer." },
      { property: "og:title", content: "AI Evaluation — UPSC Mains Answer Sheet Review" },
      { property: "og:description", content: "Get an experienced UPSC mentor's review of your handwritten answers, in seconds." },
    ],
  }),
  component: EvaluateLanding,
});

const features = [
  { title: "Marks Prediction", body: "Expected UPSC marks range with a clear score out of the question's total." },
  { title: "Demand Analysis", body: "Did you address what the question actually asked? Directive-word check." },
  { title: "Structure Review", body: "Introduction, body, and conclusion — logical flow and focus." },
  { title: "Missing Dimensions", body: "Constitutional, economic, historical, environmental, ethical, IR angles you missed." },
  { title: "Keyword Suggestions", body: "UPSC keywords present and missing, with additions to strengthen the answer." },
  { title: "Value Addition", body: "Committees, reports, judgments, articles, schemes, data — what to add." },
  { title: "Diagram Suggestions", body: "Where a flowchart, map, or table would fetch extra marks." },
  { title: "Model Answer", body: "A topper-level rewritten answer for comparison." },
];

function EvaluateLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="mb-12">
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            New · AI Evaluation
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Get your UPSC Mains answers evaluated by AI
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Upload your handwritten answer sheet as a PDF or images. Our AI reads your handwriting,
            identifies the question, and gives you the kind of feedback an experienced UPSC mentor
            would — marks, structure, missing dimensions, keywords, diagrams, and a topper-level model answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/evaluate/upload"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Upload answer sheet
            </Link>
            <Link
              to="/evaluate/history"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              View my evaluations
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
            <li>
              <div className="font-semibold text-primary">1. Upload</div>
              <p className="mt-1 text-muted-foreground">PDF, JPG, or PNG. Multi-page supported.</p>
            </li>
            <li>
              <div className="font-semibold text-primary">2. AI reads & matches</div>
              <p className="mt-1 text-muted-foreground">Handwritten text is transcribed and matched to a UPSC PYQ.</p>
            </li>
            <li>
              <div className="font-semibold text-primary">3. Get your report</div>
              <p className="mt-1 text-muted-foreground">Marks, section-by-section critique, missing points, and a model answer.</p>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
