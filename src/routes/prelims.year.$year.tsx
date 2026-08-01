import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { TestRunner } from "@/components/prelims/TestRunner";
import { getQuestionsByYear } from "@/lib/prelims.functions";

export const Route = createFileRoute("/prelims/year/$year")({
  loader: ({ params }) => getQuestionsByYear({ data: { year: Number(params.year) } }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-sm text-destructive">{String(error)}</div>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-2xl p-10 text-sm">Paper not found.</div>,
  component: YearTest,
  head: ({ params }) => ({
    meta: [
      { title: `UPSC Prelims ${params.year} Paper — Timed Practice` },
      {
        name: "description",
        content: `Attempt the full UPSC Prelims ${params.year} question paper with a 2-hour timer and UPSC negative marking.`,
      },
      { property: "og:title", content: `UPSC Prelims ${params.year} Timed Paper` },
      { property: "og:description", content: "Full paper, 2-hour timer, UPSC-style scoring and review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function YearTest() {
  const questions = Route.useLoaderData();
  const { year } = Route.useParams();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <TestRunner
          questions={questions}
          mode="year"
          year={Number(year)}
          title={`UPSC Prelims ${year} — Full Paper`}
          timed
        />
      </main>
    </div>
  );
}
