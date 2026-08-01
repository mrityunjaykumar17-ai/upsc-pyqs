import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { TestRunner } from "@/components/prelims/TestRunner";
import { getQuestionsBySubject } from "@/lib/prelims.functions";

export const Route = createFileRoute("/prelims/subject/$subject")({
  loader: ({ params }) => getQuestionsBySubject({ data: { subject: decodeURIComponent(params.subject) } }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-sm text-destructive">{String(error)}</div>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-2xl p-10 text-sm">Subject not found.</div>,
  component: SubjectPractice,
  head: ({ params }) => {
    const subject = decodeURIComponent(params.subject);
    return {
      meta: [
        { title: `${subject} — UPSC Prelims PYQ Practice` },
        {
          name: "description",
          content: `Practice all UPSC Prelims previous year questions tagged ${subject} across 2013–2025, untimed with optional timer.`,
        },
        { property: "og:title", content: `${subject} Prelims PYQ Practice` },
        { property: "og:description", content: "Subject-wise UPSC Prelims practice with UPSC-style scoring." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
});

function SubjectPractice() {
  const questions = Route.useLoaderData();
  const subject = decodeURIComponent(Route.useParams().subject);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <TestRunner
          questions={questions}
          mode="subject"
          subject={subject}
          title={`${subject} — All years`}
          timed={false}
        />
      </main>
    </div>
  );
}
