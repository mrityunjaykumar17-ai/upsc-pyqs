import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Persists an AI-generated model answer so the same question never needs a
 * second AI call. Requires the service role key; silently no-ops otherwise.
 * Never overwrites a curated (PDF-sourced) answer.
 */
export async function cacheModelAnswerIfMissing(input: {
  id: string;
  question: string;
  paper?: string;
  subject?: string;
  year?: number | null;
  questionNumber?: number | null;
  answer: string;
}): Promise<boolean> {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return false;
    const admin = createClient<Database>(process.env.SUPABASE_URL!, serviceKey, {
      auth: { persistSession: false },
    });
    const { data: existing } = await admin
      .from("model_answers")
      .select("id")
      .eq("id", input.id)
      .maybeSingle();
    if (existing) return false;

    const { error } = await admin.from("model_answers").insert({
      id: input.id,
      paper_slug: input.paper ?? "unknown",
      subject_slug: input.subject ?? null,
      year: input.year ?? null,
      question_number: input.questionNumber ?? null,
      question_text: input.question,
      answer_md: input.answer,
      source: "ai",
    });
    if (error) {
      console.warn("cache model_answer failed:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("cache model_answer failed:", e);
    return false;
  }
}
