import { createFileRoute, Link } from "@tanstack/react-router";
import { getPaper, type Subject } from "../data/pyq";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/gs/$paper/")({
  component: PaperIndex,
});

function PaperIndex() {
  const { paper } = Route.useRouteContext({
    select: () => ({ paper: null }),
  }) as { paper: null };
  // Use parent loader data via route match
  const parent = Route.useParentMatches ? undefined : undefined;
  void parent;
  void paper;
  return <PaperIndexInner />;
}

function PaperIndexInner() {
  const { paper: paperData } = (Route as unknown as { useRouteContext: () => unknown });
  void paperData;
  // Simpler: read params and reload
  return <PaperPageFromParams />;
}

function PaperPageFromParams() {
  const params = Route.useParams();
  const paper = getPaper(params.paper);
  if (!paper) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: paper.name }]} />
        <header className="mt-4 mb-10">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {paper.name}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{paper.full}</h1>
          <p className="mt-2 text-muted-foreground">{paper.description}</p>
        </header>

        <h2 className="mb-4 text-lg font-semibold">Subjects</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paper.subjects.map((s: Subject) => {
            const totalQ = s.years.reduce((a: number, y) => a + y.questions.length, 0);
            return (
              <Link
                key={s.slug}
                to="/gs/$paper/$subject"
                params={{ paper: paper.slug, subject: s.slug }}
                className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-semibold text-foreground">{s.name}</h3>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{s.years.length} years</span>
                  <span>{totalQ} questions</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
