import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/config/admin";
import { serverPublicSupabase } from "@/lib/prelims.functions";

const Credentials = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
});

function assertAdmin(c: { username: string; password: string }) {
  if (c.username !== ADMIN_USERNAME || c.password !== ADMIN_PASSWORD) {
    throw new Error("Invalid admin credentials");
  }
}

/**
 * Reads work with the publishable key (both tables have public SELECT policies),
 * so the admin browser keeps working even when SUPABASE_SERVICE_ROLE_KEY has
 * not been provisioned yet. Writes still require the service role.
 */
async function readClient() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    return supabaseAdmin as any;
  }
  return serverPublicSupabase() as any;
}

async function writeClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Editing is disabled: SUPABASE_SERVICE_ROLE_KEY is not configured for this environment.",
    );
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as any;
}


export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    return { ok: true };
  });

const QuestionPatch = z.object({
  id: z.string().uuid(),
  year: z.number().int().min(2000).max(2100),
  subject: z.string().min(1).max(80),
  question_text: z.string().min(1).max(8000),
  option_a: z.string().max(2000),
  option_b: z.string().max(2000),
  option_c: z.string().max(2000),
  option_d: z.string().max(2000),
  correct_option: z.enum(["a", "b", "c", "d"]).nullable(),
  is_dropped: z.boolean(),
  comments: z.string().max(4000).nullable(),
  needs_review: z.boolean().optional(),
});

export const adminListQuestions = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    Credentials.extend({
      year: z.number().int().nullable().optional(),
      subject: z.string().max(80).nullable().optional(),
      search: z.string().max(200).optional(),
      needsReview: z.boolean().optional(),
      limit: z.number().int().min(1).max(200).optional(),
    }).parse(i),
  )
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await readClient();
    let q = supabaseAdmin
      .from("prelims_questions")
      .select(
        "id, year, serial_no, subject, question_text, option_a, option_b, option_c, option_d, correct_option, is_dropped, comments, needs_review",
      );
    if (data.year) q = q.eq("year", data.year);
    if (data.subject) q = q.eq("subject", data.subject);
    if (data.needsReview) q = q.eq("needs_review", true);
    if (data.search) q = q.ilike("question_text", `%${data.search}%`);
    const { data: rows, error } = await q
      .order("year", { ascending: false })
      .order("serial_no", { ascending: true })
      .limit(data.limit ?? 100);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminUpdateQuestion = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ patch: QuestionPatch }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { id, ...fields } = data.patch;
    const { error } = await supabaseAdmin.from("prelims_questions").update(fields).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminCreateQuestion = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    Credentials.extend({ patch: QuestionPatch.omit({ id: true }).extend({ serial_no: z.number().int().min(1).max(500) }) }).parse(i),
  )
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { data: created, error } = await supabaseAdmin
      .from("prelims_questions")
      .insert(data.patch)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: created.id as string };
  });

export const adminDeleteQuestion = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { error } = await supabaseAdmin.from("prelims_questions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const MainsInput = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int().min(1990).max(2100).nullable(),
  paper: z.string().max(60).nullable(),
  subject: z.string().max(80).nullable(),
  question_text: z.string().min(1).max(8000),
  model_answer: z.string().max(60000).nullable(),
  marks: z.number().int().min(0).max(500).nullable(),
});

export const adminListMains = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await readClient();
    const { data: rows, error } = await supabaseAdmin
      .from("mains_pyqs")
      .select("id, year, paper, subject, question_text, model_answer, marks")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminSaveMains = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ item: MainsInput }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { id, ...fields } = data.item;
    if (id) {
      const { error } = await supabaseAdmin.from("mains_pyqs").update(fields).eq("id", id);
      if (error) throw new Error(error.message);
      return { ok: true, id };
    }
    const { data: created, error } = await supabaseAdmin
      .from("mains_pyqs")
      .insert(fields)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: created.id };
  });

export const adminDeleteMains = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { error } = await supabaseAdmin.from("mains_pyqs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ------------------------------------------------------------------ *
 * Mains model answers (keyed by the static PYQ catalogue question id) *
 * ------------------------------------------------------------------ */

/** Lightweight index of every stored answer: id → source/updated_at. */
export const adminListModelAnswers = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const client = await readClient();
    const rows: { id: string; source: string; updated_at: string }[] = [];
    const PAGE = 1000;
    for (let from = 0; ; from += PAGE) {
      const { data: page, error } = await client
        .from("model_answers")
        .select("id, source, updated_at")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(error.message);
      rows.push(...((page ?? []) as typeof rows));
      if ((page ?? []).length < PAGE) break;
    }
    return rows;
  });

export const adminGetModelAnswer = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ id: z.string().min(1).max(200) }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const client = await readClient();
    const { data: row, error } = await client
      .from("model_answers")
      .select("id, paper_slug, subject_slug, year, question_number, question_text, answer_md, source, updated_at")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ?? null;
  });

const ModelAnswerInput = z.object({
  id: z.string().min(1).max(200),
  paper_slug: z.string().min(1).max(60),
  subject_slug: z.string().max(80).nullable(),
  year: z.number().int().min(1990).max(2100).nullable(),
  question_number: z.number().int().min(0).max(1000).nullable(),
  question_text: z.string().min(1).max(8000),
  answer_md: z.string().min(1).max(120000),
  source: z.string().max(20).optional(),
});

export const adminSaveModelAnswer = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ item: ModelAnswerInput }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { error } = await supabaseAdmin
      .from("model_answers")
      .upsert({ ...data.item, source: data.item.source ?? "manual" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteModelAnswer = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Credentials.extend({ id: z.string().min(1).max(200) }).parse(i))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const supabaseAdmin = await writeClient();
    const { error } = await supabaseAdmin.from("model_answers").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Regenerate an answer with AI and store it (overwrites the existing row). */
export const adminGenerateModelAnswer = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    Credentials.extend({
      id: z.string().min(1).max(200),
      paper_slug: z.string().min(1).max(60),
      subject_slug: z.string().max(80).nullable().optional(),
      year: z.number().int().nullable().optional(),
      question_number: z.number().int().nullable().optional(),
      question_text: z.string().min(1).max(8000),
      paper: z.string().max(80).optional(),
      subject: z.string().max(80).optional(),
      marks: z.number().int().nullable().optional(),
      words: z.number().int().nullable().optional(),
    }).parse(i),
  )
  .handler(async ({ data }) => {
    assertAdmin(data);
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");
    const { buildAnswerPrompt, callLovableChat } = await import("./answer-prompt");
    const { system, user } = buildAnswerPrompt({
      question: data.question_text,
      marks: data.marks ?? undefined,
      words: data.words ?? undefined,
      paper: data.paper ?? data.paper_slug,
      subject: data.subject ?? data.subject_slug ?? undefined,
    });
    const answer = await callLovableChat(apiKey, [
      { role: "system", content: system },
      { role: "user", content: user },
    ]);
    const supabaseAdmin = await writeClient();
    const { error } = await supabaseAdmin.from("model_answers").upsert({
      id: data.id,
      paper_slug: data.paper_slug,
      subject_slug: data.subject_slug ?? null,
      year: data.year ?? null,
      question_number: data.question_number ?? null,
      question_text: data.question_text,
      answer_md: answer,
      source: "ai",
    });
    if (error) throw new Error(error.message);
    return { ok: true, answer_md: answer };
  });
