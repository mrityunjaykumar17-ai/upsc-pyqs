import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { serverPublicSupabase } from "@/lib/prelims.functions";
import { MARK_CORRECT, MARK_WRONG } from "@/lib/prelims-marking";

const ResponseInput = z.object({
  question_id: z.string().uuid(),
  selected_option: z.enum(["a", "b", "c", "d"]).nullable(),
  flagged: z.boolean(),
});

/**
 * Public scoring for guest (signed-out) attempts. Nothing is persisted — the
 * result is returned to the browser and kept in sessionStorage. Correct answers
 * are only ever revealed after a submission.
 */
export const scoreGuestAttempt = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z
      .object({
        mode: z.enum(["year", "subject"]),
        year: z.number().int().nullable().optional(),
        subject: z.string().max(80).nullable().optional(),
        responses: z.array(ResponseInput).max(400),
        durationSeconds: z.number().int().min(0).max(86400).optional(),
      })
      .parse(i),
  )
  .handler(async ({ data }) => {
    const supabase = serverPublicSupabase();
    let qq = supabase
      .from("prelims_questions")
      .select(
        "id, year, serial_no, subject, question_text, option_a, option_b, option_c, option_d, correct_option, is_dropped, comments",
      );
    qq = data.mode === "year" ? qq.eq("year", data.year ?? 0) : qq.eq("subject", data.subject ?? "");
    const { data: questions, error } = await qq
      .order("year", { ascending: true })
      .order("serial_no", { ascending: true });
    if (error) throw new Error(error.message);

    const answers = new Map(data.responses.map((r) => [r.question_id, r.selected_option]));
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let scored = 0;

    const responses = data.responses.map((r) => ({
      question_id: r.question_id,
      selected_option: r.selected_option,
      flagged: r.flagged,
      is_correct: null as boolean | null,
    }));
    const byId = new Map(responses.map((r) => [r.question_id, r]));

    for (const q of questions ?? []) {
      if (q.is_dropped || !q.correct_option) continue;
      scored += 1;
      const sel = answers.get(q.id) ?? null;
      if (!sel) {
        unattempted += 1;
        continue;
      }
      const ok = sel === q.correct_option;
      if (ok) correct += 1;
      else incorrect += 1;
      const row = byId.get(q.id);
      if (row) row.is_correct = ok;
    }

    const score = Math.round((correct * MARK_CORRECT + incorrect * MARK_WRONG) * 100) / 100;
    const attempted = correct + incorrect;
    const accuracy = attempted ? Math.round((correct / attempted) * 1000) / 10 : 0;

    return {
      attempt: {
        id: "guest",
        mode: data.mode,
        year: data.mode === "year" ? (data.year ?? null) : null,
        subject: data.mode === "subject" ? (data.subject ?? null) : null,
        started_at: null,
        submitted_at: new Date().toISOString(),
        duration_seconds: data.durationSeconds ?? null,
        score,
        max_score: scored * MARK_CORRECT,
        total_scored: scored,
        correct_count: correct,
        incorrect_count: incorrect,
        unattempted_count: unattempted,
        accuracy,
      },
      questions: questions ?? [],
      responses,
    };
  });
