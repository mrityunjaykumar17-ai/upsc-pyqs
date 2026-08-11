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

function EvaluateLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Get your answers evaluated by AI
        </h1>
        <p className="mt-4 text-muted-foreground">
          Upload a handwritten answer sheet (PDF or images) for GS1–GS4 or Sociology. Every question
          in the file is detected and evaluated separately, with a marks range and mentor-style
          feedback.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/evaluate/upload"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Upload answer sheet
          </Link>
          <Link to="/evaluate/history" className="text-sm font-medium text-primary hover:underline">
            View my evaluations →
          </Link>
        </div>
      </main>
    </div>
  );
}

