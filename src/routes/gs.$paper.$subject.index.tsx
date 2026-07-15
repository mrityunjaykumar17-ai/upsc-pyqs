import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPaper, getSubject } from "../data/pyq";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/gs/$paper/$subject/")({
  loader: ({ params }) => {
    const paper = getPaper(params.paper);
    const subject = getSubject(params.paper, params.subject);
    if (!paper || !subject) throw notFound();
    return { paper, subject };
  },
  component: SubjectIndex,
});

function SubjectIndex() {
  const { paper, subject } = Route.useLoaderData();
  const years = [...subject.years].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: paper.name, to: "/gs/$paper", params: { paper: paper.slug } },
            { label: subject.name },
          ]}
        />
        <header className="mt-4 mb-10">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {paper.name}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{subject.name}</h1>
          <p className="mt-2 text-muted-foreground">Select a year to view questions.</p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {years.map((y) => (
            <Link
              key={y.year}
              to="/gs/$paper/$subject/$year"
              params={{ paper: paper.slug, subject: subject.slug, year: String(y.year) }}
              className="group rounded-lg border border-border bg-card p-5 text-center transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
                {y.year}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {y.questions.length} questions
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}