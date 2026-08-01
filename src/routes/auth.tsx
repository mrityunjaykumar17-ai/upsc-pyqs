import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SiteHeader } from "@/components/SiteHeader";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  ssr: false,
  component: AuthPage,
});

function AuthPage() {
  const { redirect: redirectTo } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Where to land after a successful sign-in: the page the user came from,
  // falling back to the home page (never a hardcoded feature page).
  function destination() {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("post_login_redirect") : null;
    const dest = redirectTo || stored || "/";
    return dest.startsWith("/") && !dest.startsWith("//") && !dest.startsWith("/auth") ? dest : "/";
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const dest = destination();
        sessionStorage.removeItem("post_login_redirect");
        navigate({ to: dest, replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, redirectTo]);

  async function handleGoogle() {
    setBusy(true); setErr(null);
    try {
      if (redirectTo) sessionStorage.setItem("post_login_redirect", redirectTo);
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri:
          window.location.origin +
          "/auth" +
          (redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""),
      });
      if (result.error) { setErr(result.error.message || "Google sign-in failed"); setBusy(false); return; }
      if (result.redirected) return;
      const dest = destination();
      sessionStorage.removeItem("post_login_redirect");
      navigate({ to: dest, replace: true });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign-in failed");
      setBusy(false);
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with Google to save your prelims practice attempts and get AI evaluation of your handwritten Mains answers. You will return to the page you came from.
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={handleGoogle}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6.1C12.2 13.5 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.4z"/><path fill="#FBBC05" d="M10.3 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.8-6.1C.9 16.7 0 20.2 0 24s.9 7.3 2.5 10.7l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2.1 1.4-4.8 2.3-7.6 2.3-6.4 0-11.8-4-13.7-9.9l-7.8 6.1C6.4 42.6 14.6 48 24 48z"/></svg>
              {busy ? "Signing in…" : "Continue with Google"}
            </button>
            <div className="rounded-lg bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
              Phone (OTP) sign-in coming soon.
            </div>
          </div>
          {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
        </div>
      </main>
    </div>
  );
}
