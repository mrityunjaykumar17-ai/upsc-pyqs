import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getSociologyOutline, PAPER_NAMES, type SociologyOutline } from "@/lib/sociology.functions";

export const Route = createFileRoute("/sociology/")({
  loader: () => getSociologyOutline(),
  component: SociologyHome,
  head: () => ({
    meta: [
      { title: "Sociology Optional PYQs (2013–2025) — Chapter & Topic wise" },
      {
        name: "description",
        content:
          "UPSC Sociology optional previous year questions for Paper I and Paper II, arranged chapter-wise and topic-wise, with model answers and topper answer copies.",
      },
      { property: "og:title", content: "UPSC Sociology Optional PYQs — Chapter & Topic wise" },
      {
        property: "og:description",
        content: "Paper I and Paper II Sociology PYQs (2013–2025) with model answers and topper copies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  errorComponent: () => (
    <Shell>
      <p className="text-sm text-destructive">Could not load the Sociology syllabus right now.</p>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <p className="text-sm text-muted-foreground">Nothing here.</p>
    </Shell>
  ),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SociologyHome() {
  const outline = Route.useLoaderData() as SociologyOutline;
  const [paper, setPaper] = useState(1);
  const active = outline.find((p) => p.paper === paper);
  const totalQuestions = outline.reduce((a, p) => a + p.total, 0);
  const totalChapters = outline.reduce((a, p) => a + p.chapters.length, 0);
  const totalTopics = outline.reduce(
    (a, p) => a + p.chapters.reduce((b, c) => b + c.topics.length, 0),
    0,
  );

  return (
    <Shell>
      <section className="mb-10">
        <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          Civil Services Examination · Optional
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Sociology Optional Previous Year Questions
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every Sociology question arranged by <strong>Paper → Chapter → Topic</strong>. Open any
          question for a stored model answer, an AI-tailored answer, and the topper copies that
          attempted the same question.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <Stat label="Papers" value={String(outline.length)} />
          <Stat label="Chapters" value={String(totalChapters)} />
          <Stat label="Topics" value={String(totalTopics)} />
          <Stat label="Questions" value={`${totalQuestions}+`} />
        </div>
      </section>

      <h2 className="mb-4 text-xl font-semibold tracking-tight">Choose a paper</h2>
      <div className="inline-flex rounded-lg border border-border bg-card p-1 text-sm">
        {outline.map((p) => (
          <button
            key={p.paper}
            onClick={() => setPaper(p.paper)}
            className={`rounded px-4 py-1.5 font-medium transition-colors ${
              paper === p.paper
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paper {p.paper === 1 ? "I" : "II"} · {p.total} Qs
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-primary">{PAPER_NAMES[paper]}</p>


      <div className="mt-4 space-y-4">
        {active?.chapters.map((c) => (
          <section key={c.chapter_slug} className="rounded-xl border border-border bg-card p-5">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold tracking-tight">{c.chapter}</h2>
              <span className="text-xs text-muted-foreground">{c.count} questions</span>
            </header>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {c.topics.map((t) => (
                <li key={t.topic_slug}>
                  <Link
                    to="/sociology/$paper/$chapter/$topic"
                    params={{ paper: String(paper), chapter: c.chapter_slug, topic: t.topic_slug }}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    <span>{t.topic}</span>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                      {t.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
