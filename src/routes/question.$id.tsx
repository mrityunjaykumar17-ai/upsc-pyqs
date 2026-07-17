import { createFileRoute, Link, notFound, useServerFn } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";
import { AskAI } from "../components/AskAI";
import { DetailSection } from "../components/DetailSection";
import { CoachingMatches } from "../components/CoachingMatches";
import { resolveQuestionId } from "../lib/question-id";
import { getMatchesForPyq } from "../lib/matches.functions";

export const Route = createFileRoute("/question/$id")({
  loader: ({ params }) => {
    const resolved = resolveQuestionId(params.id);
    if (!resolved) throw notFound();
    return { resolved };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Question not found" }, { name: "robots", content: "noindex" }] };
    const { resolved } = loaderData;
    const short = resolved.question.q.slice(0, 140);
    return {
      meta: [
        {
          title: `${resolved.paper.name} · ${resolved.subject.name} · ${resolved.yearBlock.year} · Q${resolved.question.n} — UPSC PYQ`,
        },
        { name: "description", content: short },
      ],
    };
  },
  component: QuestionDetail,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Question not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function QuestionDetail() {
  const { resolved } = Route.useLoaderData();
  const { paper, subject, yearBlock, question, id } = resolved;

  const fetchMatches = useServerFn(getMatchesForPyq);
  const { data: matches, isLoading, isError, error } = useQuery({
    queryKey: ["pyq-matches", id],
    queryFn: () => fetchMatches({ data: { upscQuestionId: id, limit: 50 } }),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: paper.name, to: "/gs/$paper", params: { paper: paper.slug } },
            {
              label: subject.name,
              to: "/gs/$paper/$subject",
              params: { paper: paper.slug, subject: subject.slug },
            },
            {
              label: String(yearBlock.year),
              to: "/gs/$paper/$subject/$year",
              params: { paper: paper.slug, subject: subject.slug, year: String(yearBlock.year) },
            },
            { label: `Q${question.n}` },
          ]}
        />

        {/* Section 1: Question */}
        <article className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wider">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">{paper.name}</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
              {subject.name}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
              {yearBlock.year}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
              Q{question.n}
            </span>
            {question.marks && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
                {question.marks} marks
              </span>
            )}
            {question.words && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
                {question.words} words
              </span>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            {question.q}
          </h1>
        </article>

        <DetailSection
          title="AI Model Answer"
          subtitle="Generate a UPSC Mains topper-style answer for this question."
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <AskAI
              question={question.q}
              marks={question.marks}
              words={question.words}
              paper={paper.name}
              subject={subject.name}
            />
          </div>
        </DetailSection>

        <DetailSection
          title="Related Topper Copies & Test Series Questions"
          subtitle="Semantically matched coaching test-series questions, linked to real topper answer copies."
        >
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
              Finding relevant topper copies…
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              Couldn't load matches: {(error as Error)?.message}
            </div>
          ) : (
            <CoachingMatches matches={matches ?? []} />
          )}
        </DetailSection>
      </main>
    </div>
  );
}
