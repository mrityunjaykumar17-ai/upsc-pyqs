import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { PrelimsQuestion } from "@/lib/prelims.functions";
import {
  saveResponses as saveResponsesFn,
  startAttempt as startAttemptFn,
  submitAttempt as submitAttemptFn,
} from "@/lib/prelims-attempts.functions";
import { scoreGuestAttempt as scoreGuestAttemptFn } from "@/lib/prelims-guest.functions";
import { YEAR_TEST_SECONDS } from "@/lib/prelims-marking";
import { QuestionStem } from "@/components/prelims/QuestionStem";

import {
  GUEST_RESULT_KEY,
  guestDraftKey,
  loadGuestDraft,
  saveGuestDraft,
} from "@/lib/prelims-guest-store";
import { supabase } from "@/integrations/supabase/client";


type Opt = "a" | "b" | "c" | "d";
type State = { selected: Opt | null; flagged: boolean; visited: boolean };

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${ss}`;
}

function statusOf(st: State | undefined) {
  if (!st || (!st.visited && !st.selected && !st.flagged)) return "not-visited";
  if (st.selected && st.flagged) return "answered-flagged";
  if (st.flagged) return "flagged";
  if (st.selected) return "answered";
  return "not-answered";
}

const PALETTE_CLASS: Record<string, string> = {
  "not-visited": "bg-secondary text-muted-foreground border-border",
  answered: "bg-primary/15 text-primary border-primary/40",
  "not-answered": "bg-destructive/10 text-destructive border-destructive/30",
  flagged: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/40",
  "answered-flagged": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/40",
};

const LEGEND = [
  ["not-visited", "Not visited"],
  ["answered", "Answered"],
  ["not-answered", "Not answered"],
  ["flagged", "Flagged"],
  ["answered-flagged", "Answered & flagged"],
] as const;

export function TestRunner({
  questions,
  mode,
  year,
  subject,
  title,
  timed,
}: {
  questions: PrelimsQuestion[];
  mode: "year" | "subject";
  year?: number;
  subject?: string;
  title: string;
  timed: boolean;
}) {
  const navigate = useNavigate();
  const startAttempt = useServerFn(startAttemptFn);
  const saveResponses = useServerFn(saveResponsesFn);
  const submitAttempt = useServerFn(submitAttemptFn);
  const scoreGuestAttempt = useServerFn(scoreGuestAttemptFn);

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [states, setStates] = useState<Record<string, State>>({});
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [optionalTimer, setOptionalTimer] = useState(false);
  const submittedRef = useRef(false);

  const draftKey = guestDraftKey(mode, year, subject);

  useEffect(() => {
    let alive = true;

    function startAsGuest() {
      if (!alive) return;
      const draft = loadGuestDraft(draftKey);
      const started = draft?.startedAt ?? new Date().toISOString();
      setIsGuest(true);
      setAttemptId("guest");
      setStartedAt(started);
      setStates(draft?.states ?? {});
      saveGuestDraft(draftKey, { startedAt: started, states: draft?.states ?? {} });
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!alive) return;
        if (!data.session) {
          startAsGuest();
          return;
        }
        return startAttempt({ data: { mode, year: year ?? null, subject: subject ?? null } })
          .then((res) => {
            if (!alive) return;
            setIsGuest(false);
            setAttemptId(res.attemptId);
            setStartedAt(res.startedAt);
            const next: Record<string, State> = {};
            for (const r of res.responses) {
              next[r.question_id] = {
                selected: (r.selected_option as Opt | null) ?? null,
                flagged: !!r.flagged,
                visited: true,
              };
            }
            setStates(next);
          })
          .catch((e) => setError(e instanceof Error ? e.message : "Could not start the test"));
      })
      .catch(startAsGuest);

    return () => {
      alive = false;
    };
  }, [startAttempt, mode, year, subject, draftKey]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const payload = useMemo(
    () =>
      questions
        .filter((q) => states[q.id]?.selected || states[q.id]?.flagged)
        .map((q) => ({
          question_id: q.id,
          selected_option: states[q.id]?.selected ?? null,
          flagged: !!states[q.id]?.flagged,
        })),
    [questions, states],
  );
  const payloadRef = useRef(payload);
  payloadRef.current = payload;

  // Guests persist locally on every change so a refresh never loses progress.
  useEffect(() => {
    if (!isGuest || !startedAt || submittedRef.current) return;
    saveGuestDraft(draftKey, { startedAt, states });
  }, [isGuest, startedAt, states, draftKey]);

  // Autosave every 20s (signed-in only)
  useEffect(() => {
    if (!attemptId || isGuest) return;
    const t = setInterval(() => {
      if (submittedRef.current || !payloadRef.current.length) return;
      saveResponses({ data: { attemptId, responses: payloadRef.current } }).catch(() => {});
    }, 20000);
    return () => clearInterval(t);
  }, [attemptId, isGuest, saveResponses]);

  const elapsed = startedAt ? (now - new Date(startedAt).getTime()) / 1000 : 0;
  const remaining = YEAR_TEST_SECONDS - elapsed;
  const showTimer = timed || optionalTimer;

  const doSubmit = useCallback(async () => {
    if (!attemptId || submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    try {
      if (isGuest) {
        const result = await scoreGuestAttempt({
          data: {
            mode,
            year: year ?? null,
            subject: subject ?? null,
            responses: payloadRef.current,
            durationSeconds: Math.max(0, Math.floor(elapsed)),
          },
        });
        try {
          sessionStorage.setItem(GUEST_RESULT_KEY, JSON.stringify(result));
        } catch {
          /* ignore */
        }
        navigate({ to: "/prelims/result/$attemptId", params: { attemptId: "guest" } });
        return;
      }
      await submitAttempt({
        data: {
          attemptId,
          responses: payloadRef.current,
          durationSeconds: Math.max(0, Math.floor(elapsed)),
        },
      });
      navigate({ to: "/prelims/result/$attemptId", params: { attemptId } });
    } catch (e) {
      submittedRef.current = false;
      setSubmitting(false);
      setError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    }
  }, [attemptId, isGuest, scoreGuestAttempt, submitAttempt, navigate, elapsed, mode, year, subject]);


  // Strict auto-submit for timed papers
  useEffect(() => {
    if (timed && startedAt && remaining <= 0 && !submittedRef.current) void doSubmit();
  }, [timed, startedAt, remaining, doSubmit]);

  const q = questions[index];
  const st = q ? states[q.id] : undefined;

  const setQuestionState = (id: string, patch: Partial<State>) =>
    setStates((prev) => {
      const base: State = prev[id] ?? { selected: null, flagged: false, visited: false };
      return { ...prev, [id]: { ...base, visited: true, ...patch } };
    });



  useEffect(() => {
    if (q) setQuestionState(q.id, { visited: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, q?.id]);

  const answeredCount = questions.filter((x) => states[x.id]?.selected).length;
  const scoredTotal = questions.filter((x) => !x.is_dropped).length;

  if (error && !attemptId) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }
  if (!q) return <div className="text-sm text-muted-foreground">No questions found.</div>;

  const options: [Opt, string][] = [
    ["a", q.option_a],
    ["b", q.option_b],
    ["c", q.option_c],
    ["d", q.option_d],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="min-w-0">
        <div className="sticky top-[73px] z-30 -mx-2 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight">{title}</h1>
            <p className="text-xs text-muted-foreground">
              {answeredCount} answered · {scoredTotal} scored questions
              {isGuest && " · guest mode, progress saved on this device only"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {showTimer && (
              <span
                className={`rounded-lg px-3 py-1.5 font-mono text-lg font-semibold tabular-nums ${
                  timed && remaining < 300
                    ? "bg-destructive/10 text-destructive"
                    : "bg-secondary text-foreground"
                }`}
              >
                {timed ? fmt(remaining) : fmt(elapsed)}
              </span>
            )}
            {!timed && (
              <button
                onClick={() => setOptionalTimer((v) => !v)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-accent"
              >
                {optionalTimer ? "Hide timer" : "Show timer"}
              </button>
            )}
            <button
              onClick={() => setConfirmSubmit(true)}
              disabled={submitting}
              className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>

        <article className="rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider">
            <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">Q{index + 1}</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{q.subject}</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{q.year}</span>
            <button
              onClick={() => setQuestionState(q.id, { flagged: !st?.flagged })}
              className={`ml-auto rounded-lg border px-3 py-1 text-xs normal-case tracking-normal ${
                st?.flagged
                  ? "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  : "border-border hover:bg-accent"
              }`}
            >
              {st?.flagged ? "★ Flagged for review" : "☆ Flag for review"}
            </button>
          </div>

          {q.is_dropped && (
            <p className="mb-3 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
              This question was dropped by UPSC and is not scored.
            </p>
          )}

          <QuestionStem text={q.question_text} />

          <ul className="mt-5 space-y-2">
            {options.map(([key, text]) => {
              const active = st?.selected === key;
              return (
                <li key={key}>
                  <button
                    onClick={() => setQuestionState(q.id, { selected: active ? null : key })}
                    className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-accent/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-semibold ${
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}
                    >
                      {key}
                    </span>
                    <span className="whitespace-pre-wrap">{text || <em className="text-muted-foreground">—</em>}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {st?.selected && (
            <p className="mt-2 text-xs text-muted-foreground">
              Click the selected option again to clear your answer.
            </p>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setQuestionState(q.id, { selected: null })}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              Clear response
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
              disabled={index === questions.length - 1}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/70 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </article>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>

      <aside className="lg:sticky lg:top-[73px] lg:self-start">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">Question palette</h2>
          <div className="mt-3 grid max-h-[320px] grid-cols-6 gap-1.5 overflow-auto lg:max-h-[420px]">
            {questions.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className={`h-8 rounded border text-xs font-medium ${PALETTE_CLASS[statusOf(states[item.id])]} ${
                  i === index ? "ring-2 ring-primary/50" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
            {LEGEND.map(([k, label]) => (
              <li key={k} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded border ${PALETTE_CLASS[k]}`} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Submit this paper?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {answeredCount} of {scoredTotal} scored questions answered. You cannot change answers after
              submitting.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Keep going
              </button>
              <button
                onClick={() => {
                  setConfirmSubmit(false);
                  void doSubmit();
                }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
