// Emit a flat JSON list of {id, paper_slug, subject_slug, year, n, q, marks, words}
import { papers } from "../src/data/pyq";
import { makeQuestionId } from "../src/lib/question-id";
import { writeFileSync } from "fs";

const parseMarksWords = (q: string): { marks?: number; words?: number } => {
  const m = q.match(/\((?:Answer in\s*)?(\d+)\s*words?(?:.*?)(\d+)?\s*marks?\)/i)
    || q.match(/\((\d+)\s*words?\)/i);
  const marks = q.match(/(\d+)\s*marks?/i);
  return {
    marks: marks ? Number(marks[1]) : undefined,
    words: m ? Number(m[1]) : undefined,
  };
};

const out: any[] = [];
for (const p of papers) for (const s of p.subjects) for (const y of s.years) for (const q of y.questions) {
  const mw = parseMarksWords(q.q);
  out.push({
    id: makeQuestionId(p.slug, s.slug, y.year, q.n),
    paper_slug: p.slug, subject_slug: s.slug, year: y.year, n: q.n,
    q: q.q, marks: q.marks ?? mw.marks ?? null, words: q.words ?? mw.words ?? null,
  });
}
writeFileSync("/tmp/scrape/pyqs.json", JSON.stringify(out));
console.log("emitted", out.length);
