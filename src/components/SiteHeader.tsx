import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const meta = user?.user_metadata as
    | { avatar_url?: string; picture?: string; full_name?: string; name?: string }
    | undefined;
  const avatarUrl = meta?.avatar_url ?? meta?.picture;
  const displayName = meta?.full_name ?? meta?.name ?? user?.email ?? "Account";

  return (
    <header className="border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            U
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">UPSC PYQ</span>
            <span className="text-[11px] text-muted-foreground">Mains & Prelims Question Archive</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/prelims" className="hover:text-foreground transition-colors">
            Prelims PYQs
          </Link>
          <Link to="/evaluate" className="hover:text-foreground transition-colors">
            AI Evaluation
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact us
          </Link>
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Account menu"
                className="ml-1 grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-border bg-secondary text-xs font-semibold text-foreground hover:ring-2 hover:ring-primary/30"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                )}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg">
                  <div className="border-b border-border px-3 py-2">
                    <div className="truncate text-sm font-medium">{displayName}</div>
                    {user.email && <div className="truncate text-xs text-muted-foreground">{user.email}</div>}
                  </div>
                  <Link
                    to="/evaluate/history"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 text-sm hover:bg-accent"
                  >
                    My evaluations
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded px-3 py-2 text-left text-sm text-destructive hover:bg-accent"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              search={{ redirect: location.pathname + location.searchStr }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.to ? (
              <Link
                to={item.to as string}
                params={item.params as never}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
