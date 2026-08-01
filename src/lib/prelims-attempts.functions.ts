import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const MARK_CORRECT = 2;
export const MARK_WRONG = -2 / 3;
export const YEAR_TEST_SECONDS = 2 * 60 * 60;

const ResponseInput = z.object({
  question_id: z.string().uuid(),
  selected_option: z.enum(["a", "b", "c", "d"]).nullable(),
  flagged: z.boolean(),
});

/** Start a new attempt, or resume the current unsubmitted one. */
export const startAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        mode: z.enum(["year", "subject"]),
        year: z.number().int().nullable().optional(),
        subject: z.string().max(80).nullable().optional(),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let q = supabase
      .from("prelims_attempts")
      .select("id, started_at, mode, year, subject")
      .eq("user_id", userId)
      .eq("mode", data.mode)
      .is("submitted_at", null);
    q = data.mode === "year" ? q.eq("year", data.year ?? 0) : q.eq("subject", data.subject ?? "");
    const { data: existing } = await q.order("started_at", { ascending: false }).limit(1);

    if (existing && existing.length) {
      const attempt = existing[0];
      const { data: responses } = await supabase
        .from("prelims_responses")
        .select("question_id, selected_option, flagged")
        .eq("attempt_id", attempt.id);
      return { attemptId: attempt.id, startedAt: attempt.started_at, responses: responses ?? [], resumed: true };
    }

    const { data: created, error } = await supabase
      .from("prelims_attempts")
      .insert({
        user_id: userId,
        mode: data.mode,
        year: data.mode === "year" ? (data.year ?? null) : null,
        subject: data.mode === "subject" ? (data.subject ?? null) : null,
      })
      .select("id, started_at")
      .single();
    if (error) throw new Error(error.message);
    return { attemptId: created.id, startedAt: created.started_at, responses: [], resumed: false };
  });

/** Autosave answers/flags for an in-progress attempt. */
export const saveResponses = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        attemptId: z.string().uuid(),
        responses: z.array(ResponseInput).max(400),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (!data.responses.length) return { ok: true };
    const { error } = await supabase.from("prelims_responses").upsert(
      data.responses.map((r) => ({
        attempt_id: data.attemptId,
        user_id: userId,
        question_id: r.question_id,
        selected_option: r.selected_option,
        flagged: r.flagged,
      })),
      { onConflict: "attempt_id,question_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Submit and score an attempt. Dropped questions are excluded entirely. */
export const submitAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        attemptId: z.string().uuid(),
        responses: z.array(ResponseInput).max(400),
        durationSeconds: z.number().int().min(0).max(86400).optional(),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: attempt, error: aErr } = await supabase
      .from("prelims_attempts")
      .select("id, mode, year, subject, submitted_at")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .single();
    if (aErr || !attempt) throw new Error("Attempt not found");

    if (data.responses.length) {
      const { error } = await supabase.from("prelims_responses").upsert(
        data.responses.map((r) => ({
          attempt_id: data.attemptId,
          user_id: userId,
          question_id: r.question_id,
          selected_option: r.selected_option,
          flagged: r.flagged,
        })),
        { onConflict: "attempt_id,question_id" },
      );
      if (error) throw new Error(error.message);
    }

    // Question pool for this attempt
    let qq = supabase.from("prelims_questions").select("id, correct_option, is_dropped");
    qq = attempt.mode === "year" ? qq.eq("year", attempt.year ?? 0) : qq.eq("subject", attempt.subject ?? "");
    const { data: questions, error: qErr } = await qq;
    if (qErr) throw new Error(qErr.message);

    const answers = new Map(data.responses.map((r) => [r.question_id, r.selected_option]));
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let scored = 0;
    const correctness: { question_id: string; is_correct: boolean | null }[] = [];

    for (const q of questions ?? []) {
      if (q.is_dropped || !q.correct_option) {
        correctness.push({ question_id: q.id, is_correct: null });
        continue;
      }
      scored += 1;
      const sel = answers.get(q.id) ?? null;
      if (!sel) {
        unattempted += 1;
        correctness.push({ question_id: q.id, is_correct: null });
      } else if (sel === q.correct_option) {
        correct += 1;
        correctness.push({ question_id: q.id, is_correct: true });
      } else {
        incorrect += 1;
        correctness.push({ question_id: q.id, is_correct: false });
      }
    }

    const score = Math.round((correct * MARK_CORRECT + incorrect * MARK_WRONG) * 100) / 100;
    const attemptedCount = correct + incorrect;
    const accuracy = attemptedCount ? Math.round((correct / attemptedCount) * 1000) / 10 : 0;

    // Persist per-question correctness for the review screen.
    const withRows = correctness.filter((c) => answers.has(c.question_id));
    if (withRows.length) {
      await supabase.from("prelims_responses").upsert(
        withRows.map((c) => ({
          attempt_id: data.attemptId,
          user_id: userId,
          question_id: c.question_id,
          selected_option: answers.get(c.question_id) ?? null,
          flagged: data.responses.find((r) => r.question_id === c.question_id)?.flagged ?? false,
          is_correct: c.is_correct,
        })),
        { onConflict: "attempt_id,question_id" },
      );
    }

    const { error: uErr } = await supabase
      .from("prelims_attempts")
      .update({
        submitted_at: new Date().toISOString(),
        duration_seconds: data.durationSeconds ?? null,
        score,
        max_score: scored * MARK_CORRECT,
        total_scored: scored,
        correct_count: correct,
        incorrect_count: incorrect,
        unattempted_count: unattempted,
        accuracy,
      })
      .eq("id", data.attemptId)
      .eq("user_id", userId);
    if (uErr) throw new Error(uErr.message);

    return { attemptId: data.attemptId, score, accuracy, correct, incorrect, unattempted, totalScored: scored };
  });

/** Result + review data for a submitted attempt. */
export const getAttemptResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ attemptId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: attempt, error } = await supabase
      .from("prelims_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .single();
    if (error || !attempt) throw new Error("Attempt not found");

    let qq = supabase
      .from("prelims_questions")
      .select(
        "id, year, serial_no, subject, question_text, option_a, option_b, option_c, option_d, correct_option, is_dropped, comments",
      );
    qq = attempt.mode === "year" ? qq.eq("year", attempt.year ?? 0) : qq.eq("subject", attempt.subject ?? "");
    const { data: questions } = await qq
      .order("year", { ascending: true })
      .order("serial_no", { ascending: true });

    const { data: responses } = await supabase
      .from("prelims_responses")
      .select("question_id, selected_option, flagged, is_correct")
      .eq("attempt_id", data.attemptId);

    return { attempt, questions: questions ?? [], responses: responses ?? [] };
  });

/** All attempts for the dashboard (latest first). */
export const listAttempts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("prelims_attempts")
      .select(
        "id, mode, year, subject, started_at, submitted_at, score, max_score, accuracy, correct_count, incorrect_count, unattempted_count, total_scored",
      )
      .eq("user_id", context.userId)
      .order("started_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

/** Reset a year paper or a subject's progress for the signed-in user. */
export const resetProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        mode: z.enum(["year", "subject"]),
        year: z.number().int().nullable().optional(),
        subject: z.string().max(80).nullable().optional(),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let del = supabase.from("prelims_attempts").delete().eq("user_id", userId).eq("mode", data.mode);
    del = data.mode === "year" ? del.eq("year", data.year ?? 0) : del.eq("subject", data.subject ?? "");
    const { error } = await del;
    if (error) throw new Error(error.message);
    return { ok: true };
  });
