import { createFileRoute, Link, Outlet, notFound } from "@tanstack/react-router";
import { getPaper, getSubject } from "../data/pyq";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/gs/$paper/$subject")({
  loader: ({ params }) => {
    const paper = getPaper(params.paper);
    const subject = getSubject(params.paper, params.subject);
    if (!paper || !subject) throw notFound();
    return { paper, subject };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { paper, subject } = loaderData;
    return {
      meta: [
        { title: `${subject.name} PYQ — ${paper.name} — UPSC Mains` },
        {
          name: "description",
          content: `${subject.name} previous year questions from ${paper.full}, arranged by year.`,
        },
      ],
    };
  },
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Subject not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});
