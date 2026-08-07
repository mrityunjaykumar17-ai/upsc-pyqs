import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { serverPublicSupabase } from "@/lib/prelims.functions";

export type SociologyQuestion = {
  id: string;
  paper: number;
  chapter: string;
  chapter_slug: string;
  topic: string;
  topic_slug: string;
  question_text: string;
  year: number | null;
  question_number: string | null;
  marks: number | null;
};

export type SociologyTopic = { topic: string; topic_slug: string; count: number };
export type SociologyChapter = {
  chapter: string;
  chapter_slug: string;
  count: number;
  topics: SociologyTopic[];
};
export type SociologyOutline = { paper: number; chapters: SociologyChapter[]; total: number }[];

export const PAPER_NAMES: Record<number, string> = {
  1: "Paper I — Fundamentals of Sociology",
  2: "Paper II — Indian Society: Structure and Change",
};

/** Chapter → topic tree with question counts for both papers. */
export const getSociologyOutline = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicSupabase();
  const rows: {
    paper: number;
    chapter: string;
    chapter_slug: string;
    chapter_order: number;
    topic: string;
    topic_slug: string;
    topic_order: number;
  }[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("sociology_questions")
      .select("paper, chapter, chapter_slug, chapter_order, topic, topic_slug, topic_order")
      .order("paper", { ascending: true })
      .order("chapter_order", { ascending: true })
      .order("topic_order", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as typeof rows));
    if ((data ?? []).length < PAGE) break;
  }

  const papers: SociologyOutline = [];
  for (const r of rows) {
    let p = papers.find((x) => x.paper === r.paper);
    if (!p) {
      p = { paper: r.paper, chapters: [], total: 0 };
      papers.push(p);
    }
    p.total += 1;
    let c = p.chapters.find((x) => x.chapter_slug === r.chapter_slug);
    if (!c) {
      c = { chapter: r.chapter, chapter_slug: r.chapter_slug, count: 0, topics: [] };
      p.chapters.push(c);
    }
    c.count += 1;
    let t = c.topics.find((x) => x.topic_slug === r.topic_slug);
    if (!t) {
      t = { topic: r.topic, topic_slug: r.topic_slug, count: 0 };
      c.topics.push(t);
    }
    t.count += 1;
  }
  papers.sort((a, b) => a.paper - b.paper);
  return papers;
});

/** Every question inside one topic, newest exam year first. */
export const getSociologyQuestions = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) =>
    z
      .object({
        paper: z.number().int().min(1).max(2),
        chapter: z.string().min(1).max(80),
        topic: z.string().min(1).max(80),
      })
      .parse(i),
  )
  .handler(async ({ data }) => {
    const supabase = serverPublicSupabase();
    const { data: rows, error } = await supabase
      .from("sociology_questions")
      .select(
        "id, paper, chapter, chapter_slug, topic, topic_slug, question_text, year, question_number, marks",
      )
      .eq("paper", data.paper)
      .eq("chapter_slug", data.chapter)
      .eq("topic_slug", data.topic)
      .order("year", { ascending: false })
      .order("question_number", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as SociologyQuestion[];
  });

export type SociologyTopperCopy = {
  id: string;
  topper_name: string;
  rank: number | null;
  upsc_year: number | null;
  source_site: string;
  source_url: string | null;
  pdf_url: string;
  paper: string | null;
};

/** Sociology optional answer copies, best ranks first. */
export const getSociologyToppers = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicSupabase();
  const { data, error } = await supabase
    .from("sociology_topper_copies")
    .select("id, topper_name, rank, upsc_year, source_site, source_url, pdf_url, paper")
    .order("upsc_year", { ascending: false })
    .order("rank", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as SociologyTopperCopy[];
});
