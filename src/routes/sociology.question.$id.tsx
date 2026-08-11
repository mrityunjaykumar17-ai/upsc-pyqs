import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, SiteHeader } from "@/components/SiteHeader";
import { AskAI } from "@/components/AskAI";
import { DetailSection } from "@/components/DetailSection";
import { SociologyMatches } from "@/components/SociologyMatches";
import { getSociologyQuestion, PAPER_NAMES, type SociologyQuestion } from "@/lib/sociology.functions";
import {
  getSociologyMatches,
  type SociologyMatchMap,
  type SociologyTopperMatch,
} from "@/lib/sociology-matches.functions";

type LoaderData = { question: SociologyQuestion; matches: SociologyTopperMatch[] };

export const Route = createFileRoute("/sociology/question/$id")({
  loader: async ({ params }): Promise<LoaderData> => {
    const question = await getSociologyQuestion({ data: { id: params.id } });
    if (!question) throw notFound();
    const map = await getSociologyMatches({ data: { pyqIds: [question.id] } }).catch(
      () => ({}) as SociologyMatchMap,
    );
    return { question, matches: map[question.id] ?? [] };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Question not found" }, { name: "robots", content: "noindex" }] };
    const q = loaderData.question;
    const title = `${q.topic} — Sociology Paper ${q.paper === 1 ? "I" : "II"} PYQ`;
    const desc = q.question_text.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: SociologyQuestionDetail,
  errorComponent: () => <Fallback title="Could not load this question" />,
  notFoundComponent: () => <Fallback title="Question not found" />,
});

function Fallback({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Link to="/sociology" className="mt-4 inline-block text-primary hover:underline">
          Back to Sociology
        </Link>
      </div>
    </div>
  );
}

function SociologyQuestionDetail() {
  const { question: q, matches } = Route.useLoaderData() as LoaderData;
  const paperLabel = `Paper ${q.paper === 1 ? "I" : "II"}`;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Sociology", to: "/sociology" },
            {
              label: q.topic,
              to: "/sociology/$paper/$chapter/$topic",
              params: {
                paper: String(q.paper),
                chapter: q.chapter_slug,
                topic: q.topic_slug,
              },
            },
            { label: q.year ? String(q.year) : "Question" },
          ]}
        />

        <article className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wider">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
              Sociology {paperLabel}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
              {q.chapter}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
              {q.topic}
            </span>
            {q.year && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
                {q.year}
              </span>
            )}
            {q.question_number && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
                Q{q.question_number}
              </span>
            )}
            {q.marks && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
                {q.marks} marks
              </span>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {q.question_text}
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">{PAPER_NAMES[q.paper]}</p>
        </article>

        <DetailSection
          title="Model Answer"
          subtitle="Open the stored answer, or ask AI to tailor it to your needs."
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <AskAI
              id={q.id}
              question={q.question_text}
              marks={q.marks ?? undefined}
              words={q.marks === 20 ? 250 : 150}
              paper={`Sociology Optional ${paperLabel}`}
              subject={`${q.chapter} — ${q.topic}`}
            />
          </div>
        </DetailSection>

        <DetailSection
          title="Similar topper-written questions"
          subtitle="The same or related questions attempted inside evaluated Sociology topper copies."
        >
          {matches.length ? (
            <div className="rounded-xl border border-border bg-card p-5">
              <SociologyMatches matches={matches} />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
              No topper copy match found for this question yet.
            </div>
          )}
        </DetailSection>
      </main>
    </div>
  );
}
