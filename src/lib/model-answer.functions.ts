import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { buildAnswerPrompt, callLovableChat } from "./answer-prompt";
import { cacheModelAnswerIfMissing } from "./model-answer-cache.server";

function serverSupabase() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getModelAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const d = input as {
      id?: string;
      question?: string;
      marks?: number;
      words?: number;
      paper?: string;
      subject?: string;
    };
    if (!d?.id || typeof d.id !== "string") throw new Error("id is required");
    if (!d?.question) throw new Error("question is required");
    return {
      id: d.id,
      question: d.question,
      marks: typeof d.marks === "number" ? d.marks : undefined,
      words: typeof d.words === "number" ? d.words : undefined,
      paper: typeof d.paper === "string" ? d.paper : undefined,
      subject: typeof d.subject === "string" ? d.subject : undefined,
    };
  })
  .handler(async ({ data }) => {
    const supabase = serverSupabase();
    const { data: cached, error } = await supabase
      .from("model_answers")
      .select("answer_md, source")
      .eq("id", data.id)
      .maybeSingle();
    if (error) console.warn("model_answers lookup failed:", error.message);
    if (cached?.answer_md) {
      return { answer: cached.answer_md, source: cached.source, cached: true };
    }

    // Fallback: generate a topper-style answer with AI and cache it.
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const { system, user } = buildAnswerPrompt({
      question: data.question,
      marks: data.marks,
      words: data.words,
      paper: data.paper,
      subject: data.subject,
    });

    const answer = await callLovableChat(apiKey, [
      { role: "system", content: system },
      { role: "user", content: user },
    ]);

    await cacheModelAnswerIfMissing({
      id: data.id,
      question: data.question,
      paper: data.paper,
      answer,
    });


    return { answer, source: "ai" as const, cached: false };
  });
