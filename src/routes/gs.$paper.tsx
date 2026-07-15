import { createFileRoute, Link, Outlet, notFound } from "@tanstack/react-router";
import { getPaper } from "../data/pyq";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/gs/$paper")({
  loader: ({ params }) => {
    const paper = getPaper(params.paper);
    if (!paper) throw notFound();
    return { paper };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { paper } = loaderData;
    return {
      meta: [
        { title: `${paper.full} — UPSC Mains PYQ` },
        { name: "description", content: `Subjects under ${paper.full}: ${paper.description}` },
        { property: "og:title", content: `${paper.full} — UPSC Mains PYQ` },
        { property: "og:description", content: paper.description },
      ],
    };
  },
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Paper not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});
