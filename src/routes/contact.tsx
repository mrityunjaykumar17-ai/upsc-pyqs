import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — UPSC Mains PYQ Archive" },
      {
        name: "description",
        content:
          "Send feedback, suggestions, or report bugs about the UPSC Mains PYQ Archive.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact Us" }]} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          For feedback, suggestions, or bug reports — reach out on either channel below.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </div>
            <a
              href="mailto:mrityunjay.tab@gmail.com"
              className="mt-1 block text-lg font-medium text-primary hover:underline"
            >
              mrityunjay.tab@gmail.com
            </a>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Instagram
            </div>
            <a
              href="https://instagram.com/_mrityu_"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg font-medium text-primary hover:underline"
            >
              @_mrityu_
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
