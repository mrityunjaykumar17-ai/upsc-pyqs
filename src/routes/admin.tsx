import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { MainsAnswersAdmin } from "@/components/admin/MainsAnswersAdmin";
import { SociologyAnswersAdmin } from "@/components/admin/SociologyAnswersAdmin";

import {
  adminCreateQuestion,
  adminDeleteQuestion,
  adminListQuestions,
  adminLogin,
  adminUpdateQuestion,
} from "@/lib/admin.functions";
import { PRELIMS_SUBJECTS, PRELIMS_YEARS } from "@/lib/prelims.functions";

/** Session-scoped key for the admin credentials (never persisted to disk). */
const ADMIN_SESSION_KEY = "upsc_admin_session";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPanel,
  head: () => ({
    meta: [
      { title: "Admin Panel — CrackUPSC content management" },
      {
        name: "description",
        content: "Private admin console to review and edit Prelims PYQ questions and Mains PYQ content.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "CrackUPSC Admin" },
      { property: "og:description", content: "Private content management console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Creds = { username: string; password: string };

type PrelimsRow = {
  id: string;
  year: number;
  serial_no: number;
  subject: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "a" | "b" | "c" | "d" | null;
  is_dropped: boolean;
  comments: string | null;
  needs_review: boolean | null;
};


function loadCreds(): Creds | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? (JSON.parse(raw) as Creds) : null;
  } catch {
    return null;
  }
}

function AdminPanel() {
  const [creds, setCreds] = useState<Creds | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCreds(loadCreds());
    setReady(true);
  }, []);

  function signOut() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setCreds(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        {!ready ? null : !creds ? (
          <LoginCard
            onSuccess={(c) => {
              sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(c));
              setCreds(c);
            }}
          />
        ) : (
          <Dashboard creds={creds} onSignOut={signOut} />
        )}
      </main>
    </div>
  );
}

function LoginCard({ onSuccess }: { onSuccess: (c: Creds) => void }) {
  const login = useServerFn(adminLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await login({ data: { username, password } });
      onSuccess({ username, password });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8">
      <h1 className="text-xl font-bold tracking-tight">Admin sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Content management for Prelims and Mains PYQs.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy || !username || !password}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
    </div>
  );
}

function Dashboard({ creds, onSignOut }: { creds: Creds; onSignOut: () => void }) {
  const [tab, setTab] = useState<"prelims" | "mains" | "sociology">("prelims");
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {creds.username}</p>
        </div>
        <button
          onClick={onSignOut}
          className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 inline-flex rounded-lg border border-border bg-card p-1 text-sm">
        {(["prelims", "mains", "sociology"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded px-4 py-1.5 font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "prelims" ? "Prelims questions" : t === "mains" ? "Mains PYQs" : "Sociology"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "prelims" ? (
          <PrelimsAdmin creds={creds} />
        ) : tab === "mains" ? (
          <MainsAnswersAdmin creds={creds} />
        ) : (
          <SociologyAnswersAdmin creds={creds} />
        )}
      </div>

    </div>
  );
}

function PrelimsAdmin({ creds }: { creds: Creds }) {
  const list = useServerFn(adminListQuestions);
  const update = useServerFn(adminUpdateQuestion);
  const create = useServerFn(adminCreateQuestion);
  const removeQ = useServerFn(adminDeleteQuestion);

  const [year, setYear] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [search, setSearch] = useState("");
  const [needsReview, setNeedsReview] = useState(false);
  const [rows, setRows] = useState<PrelimsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<PrelimsRow | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setErr(null);
    list({
      data: {
        ...creds,
        year: year ? Number(year) : null,
        subject: subject || null,
        search: search || undefined,
        needsReview: needsReview || undefined,
        limit: 200,
      },
    })
      .then((r) => setRows(r as PrelimsRow[]))
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load questions"))
      .finally(() => setLoading(false));
  }, [list, creds, year, subject, search, needsReview]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, subject, needsReview]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setErr(null);
    try {
      const patch = {
        year: editing.year,
        subject: editing.subject,
        question_text: editing.question_text,
        option_a: editing.option_a ?? "",
        option_b: editing.option_b ?? "",
        option_c: editing.option_c ?? "",
        option_d: editing.option_d ?? "",
        correct_option: editing.correct_option,
        is_dropped: editing.is_dropped,
        comments: editing.comments,
        needs_review: !!editing.needs_review,
      };
      if (editing.id) {
        await update({ data: { ...creds, patch: { ...patch, id: editing.id } } });
      } else {
        await create({
          data: { ...creds, patch: { ...patch, serial_no: editing.serial_no || 1 } },
        });
      }
      setEditing(null);
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function destroy(id: string) {
    if (!confirm("Delete this question permanently?")) return;
    setErr(null);
    try {
      await removeQ({ data: { ...creds, id } });
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  function newQuestion() {
    setEditing({
      id: "",
      year: Number(year) || PRELIMS_YEARS[PRELIMS_YEARS.length - 1],
      serial_no: 1,
      subject: subject || PRELIMS_SUBJECTS[0],
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_option: null,
      is_dropped: false,
      comments: null,
      needs_review: false,
    } as PrelimsRow);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={newQuestion}
          className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + New question
        </button>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">All years</option>
          {PRELIMS_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">All subjects</option>
          {PRELIMS_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
          className="flex flex-1 items-center gap-2"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search question text…"
            className="min-w-[200px] flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
            Search
          </button>
        </form>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={needsReview} onChange={(e) => setNeedsReview(e.target.checked)} />
          Needs review only
        </label>
      </div>

      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Year</th>
              <th className="px-3 py-2 font-medium">#</th>
              <th className="px-3 py-2 font-medium">Subject</th>
              <th className="px-3 py-2 font-medium">Question</th>
              <th className="px-3 py-2 font-medium">Answer</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  No questions match these filters.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="px-3 py-2">{r.year}</td>
                  <td className="px-3 py-2">{r.serial_no}</td>
                  <td className="px-3 py-2">{r.subject}</td>
                  <td className="max-w-[420px] px-3 py-2">
                    <span className="line-clamp-2">{r.question_text}</span>
                    <span className="mt-1 flex gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.is_dropped && <span>dropped</span>}
                      {r.needs_review && <span className="text-amber-600">needs review</span>}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold uppercase">{r.correct_option ?? "—"}</td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => setEditing(r)} className="text-primary hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={() => destroy(r.id)}
                      className="ml-3 text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/70 p-4 backdrop-blur-sm">
          <div className="mx-auto my-8 w-full max-w-2xl rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold">
              {editing.id ? "Edit" : "New"} question — {editing.year} · #{editing.serial_no}
            </h3>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-muted-foreground">
                  Year
                  <input
                    type="number"
                    value={editing.year}
                    onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Serial no.
                  <input
                    type="number"
                    value={editing.serial_no}
                    onChange={(e) => setEditing({ ...editing, serial_no: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Subject
                  <select
                    value={editing.subject}
                    onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {PRELIMS_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="text-xs text-muted-foreground">
                Question
                <textarea
                  rows={4}
                  value={editing.question_text}
                  onChange={(e) => setEditing({ ...editing, question_text: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              </label>
              {(["a", "b", "c", "d"] as const).map((k) => (
                <label key={k} className="text-xs text-muted-foreground">
                  Option {k.toUpperCase()}
                  <input
                    value={(editing[`option_${k}` as const] as string) ?? ""}
                    onChange={(e) => setEditing({ ...editing, [`option_${k}`]: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>
              ))}
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-xs text-muted-foreground">
                  Correct option
                  <select
                    value={editing.correct_option ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        correct_option: (e.target.value || null) as PrelimsRow["correct_option"],
                      })
                    }
                    className="ml-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">—</option>
                    {(["a", "b", "c", "d"] as const).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.is_dropped}
                    onChange={(e) => setEditing({ ...editing, is_dropped: e.target.checked })}
                  />
                  Dropped by UPSC
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!editing.needs_review}
                    onChange={(e) => setEditing({ ...editing, needs_review: e.target.checked })}
                  />
                  Needs review
                </label>
              </div>
              <label className="text-xs text-muted-foreground">
                Comments
                <textarea
                  rows={2}
                  value={editing.comments ?? ""}
                  onChange={(e) => setEditing({ ...editing, comments: e.target.value || null })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
