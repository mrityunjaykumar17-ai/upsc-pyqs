import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

function client() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

export type MatchRow = {
  match_id: string;
  coaching_id: string;
  similarity: number;
  question_text: string;
  gs_paper: string | null;
  coaching_institute: string;
  test_series: string | null;
  page_number: number | null;
  pdf_url: string;
  metadata: string | null;
  topper_name: string;
  upsc_year: number | null;
  rank: number | null;
  appearances: { year: number; rank: number }[];
  gs1_score: number | null;
  gs2_score: number | null;
  gs3_score: number | null;
  gs4_score: number | null;
  essay_score: number | null;
  source_url: string | null;
};

export const getMatchesForPyq = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    const d = input as { upscQuestionId?: string; limit?: number; minSimilarity?: number };
    if (!d?.upscQuestionId) throw new Error("upscQuestionId required");
    return {
      upscQuestionId: d.upscQuestionId,
      limit: Math.min(d.limit ?? 40, 100),
      minSimilarity: d.minSimilarity ?? 0,
    };
  })
  .handler(async ({ data }) => {
    const supabase = client();
    const { data: rows, error } = await supabase
      .from("pyq_coaching_matches")
      .select(
        `id, similarity_score, coaching_question_id,
         coaching_questions!inner (
           id, question_text, gs_paper, coaching_institute, test_series,
           page_number, pdf_url, metadata,
           topper_copies!inner (
             topper_name, upsc_year, rank,
             gs1_score, gs2_score, gs3_score, gs4_score, essay_score, source_url
           )
         )`,
      )
      .eq("upsc_question_id", data.upscQuestionId)
      .gte("similarity_score", data.minSimilarity)
      .order("similarity_score", { ascending: false })
      .limit(data.limit);

    if (error) throw new Error(error.message);
    const out: MatchRow[] = (rows ?? []).map((r: any) => {
      const c = r.coaching_questions;
      const t = c.topper_copies;
      return {
        match_id: r.id,
        coaching_id: c.id,
        similarity: r.similarity_score,
        question_text: c.question_text,
        gs_paper: c.gs_paper,
        coaching_institute: c.coaching_institute,
        test_series: c.test_series,
        page_number: c.page_number,
        pdf_url: c.pdf_url,
        metadata: c.metadata,
        topper_name: t.topper_name,
        upsc_year: t.upsc_year,
        rank: t.rank,
        gs1_score: t.gs1_score,
        gs2_score: t.gs2_score,
        gs3_score: t.gs3_score,
        gs4_score: t.gs4_score,
        essay_score: t.essay_score,
        source_url: t.source_url,
      };
    });
    return out;
  });
