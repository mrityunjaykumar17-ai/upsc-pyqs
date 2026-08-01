import { useEffect } from "react";
import { createFileRoute, Link, notFound, useLocation } from "@tanstack/react-router";
import { getPaper, getSubject, getYear, type Question } from "../data/pyq";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";
import { AskAI } from "../components/AskAI";
import { makeQuestionId } from "../lib/question-id";


export const Route = createFileRoute("/gs/$paper/$subject/$year")({
  loader: ({ params }) => {
    const yr = Number(params.year);
    const paper = getPaper(params.paper);
    const subject = getSubject(params.paper, params.subject);
    const yearBlock = getYear(params.paper, params.subject, yr);
    if (!paper || !subject || !yearBlock) throw notFound();
    return { paper, subject, yearBlock };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { paper, subject, yearBlock } = loaderData;
    return {
      meta: [
        { title: `${subject.name} ${yearBlock.year} — ${paper.name} — UPSC Mains PYQ` },
        {
          name: "description",
          content: `${yearBlock.questions.length} UPSC Mains ${yearBlock.year} questions on ${subject.name}.`,
        },
      ],
    };
  },
  component: YearPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Year not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function YearPage() {
  const { paper, subject, yearBlock } = Route.useLoaderData();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = location.hash;
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-2", "ring-primary");
        setTimeout(() => el.classList.remove("ring-2", "ring-primary"), 2000);
      }, 50);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: paper.name, to: "/gs/$paper", params: { paper: paper.slug } },
            {
              label: subject.name,
              to: "/gs/$paper/$subject",
              params: { paper: paper.slug, subject: subject.slug },
            },
            { label: String(yearBlock.year) },
          ]}
        />
        <header className="mt-4 mb-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {paper.name} · {subject.name}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            UPSC Mains {yearBlock.year}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {yearBlock.questions.length} questions. Click <strong>Ask AI</strong> under any question to generate a UPSC-format model answer.
          </p>
        </header>

        <ol className="space-y-4">
          {yearBlock.questions.map((question: Question) => (
            <li
              key={question.n}
              id={`q-${question.n}`}
              className="scroll-mt-24 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
                  {question.n}
                </span>
                <div className="flex-1">
                  <Link
                    to="/question/$id"
                    params={{
                      id: makeQuestionId(paper.slug, subject.slug, yearBlock.year, question.n),
                    }}
                    className="group block"
                  >
                    <p className="text-foreground leading-relaxed group-hover:text-primary">
                      {question.q}
                    </p>
                  </Link>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {question.marks && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                        {question.marks} marks
                      </span>
                    )}
                    {question.words && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground">
                        {question.words} words
                      </span>
                    )}
                    <Link
                      to="/question/$id"
                      params={{
                        id: makeQuestionId(paper.slug, subject.slug, yearBlock.year, question.n),
                      }}
                      className="ml-auto text-xs font-medium text-primary hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                  <AskAI
                    id={makeQuestionId(paper.slug, subject.slug, yearBlock.year, question.n)}
                    question={question.q}
                    marks={question.marks}
                    words={question.words}
                    paper={paper.name}
                    subject={subject.name}
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
