import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, SiteHeader } from "@/components/SiteHeader";
import { AskAI } from "@/components/AskAI";
import { SociologyTopperCopies } from "@/components/SociologyTopperCopies";
import { SociologyMatches } from "@/components/SociologyMatches";
import {
  getSociologyQuestions,
  getSociologyToppers,
  PAPER_NAMES,
  type SociologyQuestion,
  type SociologyTopperCopy,
} from "@/lib/sociology.functions";
import {
  getSociologyMatches,
  type SociologyMatchMap,
} from "@/lib/sociology-matches.functions";

type LoaderData = {
  questions: SociologyQuestion[];
  toppers: SociologyTopperCopy[];
  matches: SociologyMatchMap;
};

export const Route = createFileRoute("/sociology/$paper/$chapter/$topic")({
  loader: async ({ params }): Promise<LoaderData> => {
    const paper = Number(params.paper);
    if (paper !== 1 && paper !== 2) throw notFound();
    const [questions, toppers] = await Promise.all([
      getSociologyQuestions({ data: { paper, chapter: params.chapter, topic: params.topic } }),
      getSociologyToppers(),
    ]);
    if (!questions.length) throw notFound();
    const matches = await getSociologyMatches({
      data: { pyqIds: questions.map((q) => q.id) },
    }).catch(() => ({}) as SociologyMatchMap);
    return { questions, toppers, matches };
  },

  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const q = loaderData.questions[0];
    const title = `${q.topic} — Sociology Paper ${q.paper === 1 ? "I" : "II"} PYQs`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `${loaderData.questions.length} UPSC Sociology optional questions on ${q.topic} (${q.chapter}), with model answers and topper answer copies.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: `UPSC Sociology optional PYQs on ${q.topic} with model answers.`,
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: TopicPage,
  errorComponent: () => (
    <Fallback title="Could not load this topic" />
  ),
  notFoundComponent: () => <Fallback title="Topic not found" />,
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

function TopicPage() {
  const { questions, toppers } = Route.useLoaderData() as LoaderData;
  const [showCopies, setShowCopies] = useState(false);
  const first = questions[0];
  const paperLabel = `Paper ${first.paper === 1 ? "I" : "II"}`;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Sociology", to: "/sociology" },
            { label: first.chapter },
            { label: first.topic },
          ]}
        />
        <header className="mt-4 mb-8">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {PAPER_NAMES[first.paper]}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{first.topic}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {first.chapter} · {questions.length} previous year questions. Use{" "}
            <strong>Answer</strong> for the stored model answer, or <strong>Ask AI</strong> to
            tailor it.
          </p>
        </header>

        <section className="mb-8 rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Sociology topper answer copies
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {toppers.length} evaluated Sociology optional copies from public topper libraries.
              </p>
            </div>
            <button
              onClick={() => setShowCopies((v) => !v)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              {showCopies ? "Hide copies" : "View copies"}
            </button>
          </div>
          {showCopies && (
            <div className="mt-4">
              <SociologyTopperCopies copies={toppers} />
            </div>
          )}
        </section>

        <ol className="space-y-4">
          {questions.map((q, i) => (
            <li
              key={q.id}
              className="rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="leading-relaxed text-foreground">{q.question_text}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {q.year && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground">
                        {q.year}
                      </span>
                    )}
                    {q.question_number && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground">
                        Q{q.question_number}
                      </span>
                    )}
                    {q.marks && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                        {q.marks} marks
                      </span>
                    )}
                  </div>
                  <AskAI
                    id={q.id}
                    question={q.question_text}
                    marks={q.marks ?? undefined}
                    words={q.marks === 20 ? 250 : 150}
                    paper={`Sociology Optional ${paperLabel}`}
                    subject={`${q.chapter} — ${q.topic}`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
