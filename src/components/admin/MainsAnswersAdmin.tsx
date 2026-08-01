import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { papers } from "@/data/pyq";
import { makeQuestionId } from "@/lib/question-id";
import {
  adminDeleteModelAnswer,
  adminGenerateModelAnswer,
  adminGetModelAnswer,
  adminListModelAnswers,
  adminSaveModelAnswer,
} from "@/lib/admin.functions";

type Creds = { username: string; password: string };

type CatalogItem = {
  id: string;
  paperName: string;
  paperSlug: string;
  subjectName: string;
  subjectSlug: string;
  year: number;
  n: number;
  question: string;
  marks?: number;
  words?: number;
};

/** Every Mains PYQ in the static catalogue, answer or not. */
const CATALOG: CatalogItem[] = papers.flatMap((p) =>
  p.subjects.flatMap((s) =>
    s.years.flatMap((y) =>
      y.questions.map((q) => ({
        id: makeQuestionId(p.slug, s.slug, y.year, q.n),
        paperName: p.name,
        paperSlug: p.slug,
        subjectName: s.name,
        subjectSlug: s.slug,
        year: y.year,
        n: q.n,
        question: q.q,
        marks: q.marks,
        words: q.words,
      })),
    ),
  ),
);

const PAPERS = [...new Set(CATALOG.map((c) => c.paperName))];
const YEARS = [...new Set(CATALOG.map((c) => c.year))].sort((a, b) => b - a);

export function MainsAnswersAdmin({ creds }: { creds: Creds }) {
  const listAnswers = useServerFn(adminListModelAnswers);
  const getAnswer = useServerFn(adminGetModelAnswer);
  const saveAnswer = useServerFn(adminSaveModelAnswer);
  const deleteAnswer = useServerFn(adminDeleteModelAnswer);
  const generate = useServerFn(adminGenerateModelAnswer);

  const [index, setIndex] = useState<Record<string, { source: string; updated_at: string }>>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [paper, setPaper] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState<"" | "with" | "without">("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);

  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [draft, setDraft] = useState("");
  const [draftQuestion, setDraftQuestion] = useState("");
  const [busy, setBusy] = useState<null | "load" | "save" | "gen" | "del">(null);

  const load = useCallback(() => {
    setLoading(true);
    setErr(null);
    listAnswers({ data: creds })
      .then((rows) => {
        const map: Record<string, { source: string; updated_at: string }> = {};
        for (const r of rows) map[r.id] = { source: r.source, updated_at: r.updated_at };
        setIndex(map);
      })
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load answers"))
      .finally(() => setLoading(false));
  }, [listAnswers, creds]);

  useEffect(() => {
    load();
  }, [load]);

  const subjects = useMemo(
    () =>
      [
        ...new Set(
          CATALOG.filter((c) => !paper || c.paperName === paper).map((c) => c.subjectName),
        ),
      ].sort(),
    [paper],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CATALOG.filter((c) => {
      if (paper && c.paperName !== paper) return false;
      if (subject && c.subjectName !== subject) return false;
      if (year && c.year !== Number(year)) return false;
      const has = Boolean(index[c.id]);
      if (status === "with" && !has) return false;
      if (status === "without" && has) return false;
      if (q && !c.question.toLowerCase().includes(q) && !c.id.toLowerCase().includes(q))
        return false;
      return true;
    }).sort((a, b) => b.year - a.year || a.n - b.n);
  }, [paper, subject, year, status, search, index]);

  const withAnswer = useMemo(
    () => filtered.filter((c) => index[c.id]).length,
    [filtered, index],
  );

  async function openEditor(item: CatalogItem) {
    setEditing(item);
    setDraft("");
    setDraftQuestion(item.question);
    setBusy("load");
    setErr(null);
    try {
      const row = await getAnswer({ data: { ...creds, id: item.id } });
      setDraft(row?.answer_md ?? "");
      if (row?.question_text) setDraftQuestion(row.question_text);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not load the answer");
    } finally {
      setBusy(null);
    }
  }

  async function handleSave() {
    if (!editing || !draft.trim()) return;
    setBusy("save");
    setErr(null);
    try {
      await saveAnswer({
        data: {
          ...creds,
          item: {
            id: editing.id,
            paper_slug: editing.paperSlug,
            subject_slug: editing.subjectSlug,
            year: editing.year,
            question_number: editing.n,
            question_text: draftQuestion.trim() || editing.question,
            answer_md: draft,
            source: "manual",
          },
        },
      });
      setEditing(null);
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function handleGenerate() {
    if (!editing) return;
    setBusy("gen");
    setErr(null);
    try {
      const res = await generate({
        data: {
          ...creds,
          id: editing.id,
          paper_slug: editing.paperSlug,
          subject_slug: editing.subjectSlug,
          year: editing.year,
          question_number: editing.n,
          question_text: draftQuestion.trim() || editing.question,
          paper: editing.paperName,
          subject: editing.subjectName,
          marks: editing.marks ?? null,
          words: editing.words ?? null,
        },
      });
      setDraft(res.answer_md);
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    if (!editing) return;
    setBusy("del");
    try {
      await deleteAnswer({ data: { ...creds, id: editing.id } });
      setEditing(null);
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  }

  const selectCls =
    "rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={paper}
          onChange={(e) => {
            setPaper(e.target.value);
            setSubject("");
          }}
          className={selectCls}
        >
          <option value="">All papers</option>
          {PAPERS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className={selectCls}>
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
          <option value="">All years</option>
          {YEARS.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "" | "with" | "without")}
          className={selectCls}
        >
          <option value="">Any status</option>
          <option value="with">Has answer</option>
          <option value="without">Missing answer</option>
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search question text…"
          className={`${selectCls} min-w-[220px] flex-1`}
        />
        <button onClick={load} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
          Refresh
        </button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {loading ? "Loading answers…" : `${filtered.length} questions · ${withAnswer} with answers`}
      </p>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Year</th>
              <th className="px-3 py-2 font-medium">Paper</th>
              <th className="px-3 py-2 font-medium">Subject</th>
              <th className="px-3 py-2 font-medium">Question</th>
              <th className="px-3 py-2 font-medium">Answer</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, limit).map((c) => {
              const meta = index[c.id];
              return (
                <tr key={c.id} className="border-t border-border align-top">
                  <td className="px-3 py-2">{c.year}</td>
                  <td className="whitespace-nowrap px-3 py-2">{c.paperName}</td>
                  <td className="px-3 py-2">{c.subjectName}</td>
                  <td className="max-w-[420px] px-3 py-2">
                    <span className="line-clamp-2">
                      Q{c.n}. {c.question}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {meta ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {meta.source}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">missing</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <button onClick={() => openEditor(c)} className="text-primary hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  No questions match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > limit && (
        <button
          onClick={() => setLimit((l) => l + 200)}
          className="mt-3 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
        >
          Show more ({filtered.length - limit} remaining)
        </button>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/70 p-4 backdrop-blur-sm">
          <div className="mx-auto my-8 w-full max-w-3xl rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold">
              {editing.paperName} · {editing.subjectName} · {editing.year} · Q{editing.n}
            </h3>
            <label className="mt-4 block text-xs text-muted-foreground">
              Question
              <textarea
                rows={3}
                value={draftQuestion}
                onChange={(e) => setDraftQuestion(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              />
            </label>
            <label className="mt-3 block text-xs text-muted-foreground">
              Model answer (markdown)
              <textarea
                rows={16}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={busy === "load" ? "Loading…" : "No answer stored yet — write one or generate with AI."}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground"
              />
            </label>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                onClick={handleDelete}
                disabled={busy !== null || !index[editing.id]}
                className="mr-auto rounded-lg border border-destructive/40 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-40"
              >
                Delete answer
              </button>
              <button
                onClick={handleGenerate}
                disabled={busy !== null}
                className="rounded-lg border border-primary/40 px-4 py-2 text-sm text-primary hover:bg-primary/5 disabled:opacity-50"
              >
                {busy === "gen" ? "Generating…" : "Generate with AI"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                disabled={busy !== null || !draft.trim()}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {busy === "save" ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
