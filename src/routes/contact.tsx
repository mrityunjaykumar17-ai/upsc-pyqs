import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Breadcrumbs, SiteHeader } from "../components/SiteHeader";
import { submitContact } from "../lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — UPSC Mains PYQ Archive" },
      {
        name: "description",
        content:
          "Send feedback, suggestions, or report issues about the UPSC Mains PYQ Archive.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitContact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || message.trim().length < 5) {
      setError("Please enter your name and a message (at least 5 characters).");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submit({
        data: {
          name: name.trim(),
          email: email.trim() || undefined,
          contact_number: phone.trim() || undefined,
          message: message.trim(),
        },
      });
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your feedback.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact Us" }]} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Have feedback, a correction, or a suggestion? Send us a message.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="text-sm font-semibold text-primary">Thanks — we got it.</div>
            <p className="mt-1 text-sm text-foreground">
              Your feedback has been recorded. We'll get back to you if a response is needed.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setStatus("idle")}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary"
              >
                Send another
              </button>
              <Link
                to="/"
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6">
            <Field label="Name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={200}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </Field>
            <Field label="Email address (optional)">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </Field>
            <Field label="Contact number (optional)">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={50}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </Field>
            <Field label="Feedback / Message" required>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                required
                rows={6}
                className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </Field>

            {status === "error" && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Submit Feedback"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
