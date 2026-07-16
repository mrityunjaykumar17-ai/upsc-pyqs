import { createFileRoute, Link } from "@tanstack/react-router";
import { papers } from "../data/pyq";
import { SiteHeader } from "../components/SiteHeader";
import { QuestionSearch } from "../components/QuestionSearch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UPSC Mains PYQ Archive — GS 1, 2, 3, 4, Essay" },
      {
        name: "description",
        content:
          "Browse UPSC Civil Services Mains previous year questions organised by paper (GS I–IV, Essay), subject, and year.",
      },
      { property: "og:title", content: "UPSC Mains PYQ Archive — GS 1, 2, 3, 4, Essay" },
      {
        property: "og:description",
        content: "Browse UPSC Civil Services Mains previous year questions organised by paper (GS I–IV, Essay), subject, and year.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const totalQuestions = papers.reduce(
    (a, p) => a + p.subjects.reduce((b, s) => b + s.years.reduce((c, y) => c + y.questions.length, 0), 0),
    0,
  );
  const totalSubjects = papers.reduce((a, p) => a + p.subjects.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12">
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            Civil Services Examination · Mains
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            UPSC Mains Previous Year Questions
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every Mains question, cleanly arranged by <strong>GS Paper → Subject → Year</strong>. Built
            for aspirants who want to spot patterns, revise fast, and practice answer writing.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <Stat label="Papers" value={String(papers.length)} />
            <Stat label="Subjects" value={String(totalSubjects)} />
            <Stat label="Questions" value={`${totalQuestions}+`} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Choose a paper</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {papers.map((p) => (
              <Link
                key={p.slug}
                to="/gs/$paper"
                params={{ paper: p.slug }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {p.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.subjects.length} subjects
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{p.full}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Browse subjects →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="mt-16 border-t py-8 text-center text-xs text-muted-foreground">
        Data sourced from official UPSC question papers. Not affiliated with UPSC.
      </footer>
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
