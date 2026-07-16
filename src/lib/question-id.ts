import { papers, type Paper, type Subject, type YearBlock, type Question } from "../data/pyq";

export function makeQuestionId(paperSlug: string, subjectSlug: string, year: number, n: number) {
  return `${paperSlug}__${subjectSlug}__${year}__${n}`;
}

export type ResolvedQuestion = {
  id: string;
  paper: Paper;
  subject: Subject;
  yearBlock: YearBlock;
  question: Question;
};

export function resolveQuestionId(id: string): ResolvedQuestion | null {
  const parts = id.split("__");
  if (parts.length !== 4) return null;
  const [paperSlug, subjectSlug, yearStr, nStr] = parts;
  const year = Number(yearStr);
  const n = Number(nStr);
  if (!Number.isFinite(year) || !Number.isFinite(n)) return null;
  const paper = papers.find((p) => p.slug === paperSlug);
  if (!paper) return null;
  const subject = paper.subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return null;
  const yearBlock = subject.years.find((y) => y.year === year);
  if (!yearBlock) return null;
  const question = yearBlock.questions.find((q) => q.n === n);
  if (!question) return null;
  return { id, paper, subject, yearBlock, question };
}
