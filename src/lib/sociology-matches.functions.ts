import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { serverPublicSupabase } from "@/lib/prelims.functions";

export type SociologyMatchLevel = "exact" | "similar" | "related";

export type SociologyTopperMatch = {
  id: string;
  match_type: SociologyMatchLevel;
  similarity: number;
  matching_reason: string | null;
  topper_question: string;
  question_number: string | null;
  page_start: number | null;
  page_end: number | null;
  topper_name: string;
  rank: number | null;
  upsc_year: number | null;
  source_site: string;
  copy_name: string | null;
  copy_type: string | null;
  paper: string | null;
  pdf_url: string;
};

export type SociologyMatchMap = Record<string, SociologyTopperMatch[]>;

type Row = {
  id: string;
  pyq_id: string;
  match_type: string;
  similarity_score: number;
  matching_reason: string | null;
  sociology_topper_questions: {
    question_text: string;
    question_number: string | null;
    page_start: number | null;
    page_end: number | null;
    sociology_topper_copies: {
      topper_name: string;
      rank: number | null;
      upsc_year: number | null;
      source_site: string;
      copy_name: string | null;
      copy_type: string | null;
      paper: string | null;
      pdf_url: string;
    } | null;
  } | null;
};

const LEVEL_ORDER: Record<SociologyMatchLevel, number> = { exact: 0, similar: 1, related: 2 };

/** Topper answer-copy matches for a batch of Sociology PYQs, grouped by question id. */
export const getSociologyMatches = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z.object({ pyqIds: z.array(z.string().min(1)).min(1).max(200) }).parse(i),
  )
  .handler(async ({ data }): Promise<SociologyMatchMap> => {
    const supabase = serverPublicSupabase();
    const { data: rows, error } = await supabase
      .from("sociology_pyq_topper_matches")
      .select(
        `id, pyq_id, match_type, similarity_score, matching_reason,
         sociology_topper_questions!inner (
           question_text, question_number, page_start, page_end,
           sociology_topper_copies!inner (
             topper_name, rank, upsc_year, source_site, copy_name, copy_type, paper, pdf_url
           )
         )`,
      )
      .in("pyq_id", data.pyqIds)
      .order("similarity_score", { ascending: false });
    if (error) throw new Error(error.message);

    const map: SociologyMatchMap = {};
    for (const raw of (rows ?? []) as unknown as Row[]) {
      const tq = raw.sociology_topper_questions;
      const copy = tq?.sociology_topper_copies;
      if (!tq || !copy) continue;
      const level = (["exact", "similar", "related"] as const).includes(
        raw.match_type as SociologyMatchLevel,
      )
        ? (raw.match_type as SociologyMatchLevel)
        : "related";
      (map[raw.pyq_id] ??= []).push({
        id: raw.id,
        match_type: level,
        similarity: Math.round(raw.similarity_score * 100),
        matching_reason: raw.matching_reason,
        topper_question: tq.question_text,
        question_number: tq.question_number,
        page_start: tq.page_start,
        page_end: tq.page_end,
        topper_name: copy.topper_name,
        rank: copy.rank,
        upsc_year: copy.upsc_year,
        source_site: copy.source_site,
        copy_name: copy.copy_name,
        copy_type: copy.copy_type,
        paper: copy.paper,
        pdf_url: copy.pdf_url,
      });
    }
    for (const list of Object.values(map)) {
      list.sort(
        (a, b) =>
          LEVEL_ORDER[a.match_type] - LEVEL_ORDER[b.match_type] ||
          b.similarity - a.similarity ||
          (a.rank ?? 9999) - (b.rank ?? 9999),
      );
    }
    return map;
  });
