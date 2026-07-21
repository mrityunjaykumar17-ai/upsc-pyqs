import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const uuid = z.string().uuid();

// Create a new evaluation row for uploaded file paths, then process it.
export const createEvaluation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      filePaths: z.array(z.string().min(1)).min(1).max(20),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("evaluations")
      .insert({ user_id: userId, status: "uploaded", file_paths: data.filePaths })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });

export const processEvaluation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    const { runEvaluationPipeline } = await import("./evaluations.server");
    return runEvaluationPipeline(data.id, context.userId);
  });

export const getEvaluation = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("evaluations")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const listEvaluations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("evaluations")
      .select("id, status, detected_question, marks_awarded, marks_out_of, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const deleteEvaluation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    // Also remove uploaded files
    const { data: row } = await context.supabase
      .from("evaluations").select("file_paths").eq("id", data.id).maybeSingle();
    const paths = Array.isArray(row?.file_paths) ? (row!.file_paths as string[]) : [];
    if (paths.length) {
      await context.supabase.storage.from("answer-uploads").remove(paths);
    }
    const { error } = await context.supabase.from("evaluations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
