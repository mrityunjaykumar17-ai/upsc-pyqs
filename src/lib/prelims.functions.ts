import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { z } from "zod";

export const PRELIMS_SUBJECTS = [
  "Art & Culture",
  "History",
  "Geography",
  "Polity",
  "Current Affairs",
  "International Relations",
  "Economy",
  "Environment",
  "Science & Technology",
] as const;

export const PRELIMS_YEARS = [
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

export type PrelimsQuestion = {
  id: string;
  year: number;
  serial_no: number;
  subject: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  is_dropped: boolean;
  comments: string | null;
};

export function serverPublicSupabase() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
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

const SELECT_PUBLIC =
  "id, year, serial_no, subject, question_text, option_a, option_b, option_c, option_d, is_dropped, comments";

/** Counts per year and per subject for the dashboard grid. */
export const getPrelimsCounts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicSupabase();
  const byYear: Record<string, number> = {};
  const bySubject: Record<string, number> = {};
  let total = 0;

  // PostgREST caps a plain select at 1000 rows, which silently truncated the
  // per-year counts. Page through the whole table instead.
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("prelims_questions")
      .select("year, subject")
      .order("year", { ascending: true })
      .order("serial_no", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    for (const r of rows) {
      byYear[String(r.year)] = (byYear[String(r.year)] ?? 0) + 1;
      if (r.subject) bySubject[r.subject] = (bySubject[r.subject] ?? 0) + 1;
    }
    total += rows.length;
    if (rows.length < PAGE) break;
  }
  return { byYear, bySubject, total };
});


export const getQuestionsByYear = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => z.object({ year: z.number().int() }).parse(i))
  .handler(async ({ data }) => {
    const supabase = serverPublicSupabase();
    const { data: rows, error } = await supabase
      .from("prelims_questions")
      .select(SELECT_PUBLIC)
      .eq("year", data.year)
      .order("serial_no", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as PrelimsQuestion[];
  });

export const getQuestionsBySubject = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => z.object({ subject: z.string().min(1).max(80) }).parse(i))
  .handler(async ({ data }) => {
    const supabase = serverPublicSupabase();
    const { data: rows, error } = await supabase
      .from("prelims_questions")
      .select(SELECT_PUBLIC)
      .eq("subject", data.subject)
      .order("year", { ascending: true })
      .order("serial_no", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as PrelimsQuestion[];
  });

/** Public read-only Mains PYQ list (admin-managed). */
export const listMainsPyqs = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicSupabase();
  const { data, error } = await supabase
    .from("mains_pyqs")
    .select("id, year, paper, subject, question_text, model_answer, marks")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});
