// Coaching questions, topper copies, and match mappings.
// Data-driven so it can be swapped for an API/DB later without touching the UI.

export type CoachingQuestion = {
  id: string;
  institute: string;
  institute_logo?: string; // URL or emoji fallback
  test_series: string;
  paper_name: string;
  year: number;
  question_number: number;
  topic: string;
  question: string;
  pdf_url: string;
  page_number: number;
};

export type TopperCopy = {
  id: string;
  candidate_name: string;
  rank: number;
  year: number;
  subject: string;
  matching_question: string;
  pdf_url: string;
  page_number: number;
};

// question_matches: links a UPSC PYQ (upsc_question_id) → coaching_question_id + similarity
export type QuestionMatch = {
  id: string;
  upsc_question_id: string; // makeQuestionId(...)
  coaching_question_id: string;
  similarity: number; // 0-100
  created_at: string; // ISO date
};

export type TopperMatch = {
  id: string;
  upsc_question_id: string;
  topper_copy_id: string;
  created_at: string;
};

// -------------------- Seed data --------------------

export const coachingQuestions: CoachingQuestion[] = [
  {
    id: "cq-vision-2023-abhyaas6-q7",
    institute: "Vision IAS",
    institute_logo: "🎯",
    test_series: "Abhyaas Test 6",
    paper_name: "GS Paper I",
    year: 2023,
    question_number: 7,
    topic: "Women Empowerment",
    question: "Discuss the contribution of SHGs towards women empowerment.",
    pdf_url: "https://example.com/vision-abhyaas-test6-2023.pdf",
    page_number: 12,
  },
  {
    id: "cq-forumias-2023-mgp3-q4",
    institute: "ForumIAS",
    institute_logo: "📘",
    test_series: "MGP Test 3",
    paper_name: "GS Paper I",
    year: 2023,
    question_number: 4,
    topic: "SHGs & Rural Women",
    question:
      "Examine how Self Help Groups have transformed the socio-economic status of rural women in India.",
    pdf_url: "https://example.com/forumias-mgp-3-2023.pdf",
    page_number: 5,
  },
  {
    id: "cq-insights-2023-mgp5-q9",
    institute: "Insights IAS",
    institute_logo: "💡",
    test_series: "Insights Test 5",
    paper_name: "GS Paper I",
    year: 2023,
    question_number: 9,
    topic: "Women & Self Help Groups",
    question:
      "Evaluate the role of Self Help Groups (SHGs) in the empowerment of women in India. Suggest measures to make them more effective.",
    pdf_url: "https://example.com/insights-test5-2023.pdf",
    page_number: 18,
  },
  {
    id: "cq-vajiram-2022-t4-q3",
    institute: "Vajiram & Ravi",
    institute_logo: "📗",
    test_series: "All India Test 4",
    paper_name: "GS Paper I",
    year: 2022,
    question_number: 3,
    topic: "Women Empowerment",
    question:
      "Microfinance through SHGs has been called a silent revolution in rural India. Comment.",
    pdf_url: "https://example.com/vajiram-ait-4-2022.pdf",
    page_number: 7,
  },
];

export const topperCopies: TopperCopy[] = [
  {
    id: "tc-2022-r5-society",
    candidate_name: "Ishita Kishore",
    rank: 1,
    year: 2022,
    subject: "Society",
    matching_question:
      "Role of SHGs in empowering rural women and reducing income inequality.",
    pdf_url: "https://example.com/topper-ishita-gs1.pdf",
    page_number: 24,
  },
  {
    id: "tc-2021-r2-society",
    candidate_name: "Ankita Agarwal",
    rank: 2,
    year: 2021,
    subject: "Society",
    matching_question:
      "SHGs, women's economic participation, and grassroots democracy.",
    pdf_url: "https://example.com/topper-ankita-gs1.pdf",
    page_number: 11,
  },
];

// Map coaching questions to UPSC PYQs. upsc_question_id format:
// `${paperSlug}__${subjectSlug}__${year}__${n}` — see src/lib/question-id.ts
// Seed a few matches; extend from admin/API later.
export const questionMatches: QuestionMatch[] = [
  // GS1 → Society → 2023 → Q1 (illustrative; adapt as data grows)
  {
    id: "m1",
    upsc_question_id: "gs1__society__2023__1",
    coaching_question_id: "cq-vision-2023-abhyaas6-q7",
    similarity: 94,
    created_at: "2024-02-10",
  },
  {
    id: "m2",
    upsc_question_id: "gs1__society__2023__1",
    coaching_question_id: "cq-forumias-2023-mgp3-q4",
    similarity: 88,
    created_at: "2024-01-22",
  },
  {
    id: "m3",
    upsc_question_id: "gs1__society__2023__1",
    coaching_question_id: "cq-insights-2023-mgp5-q9",
    similarity: 96,
    created_at: "2024-03-01",
  },
  {
    id: "m4",
    upsc_question_id: "gs1__society__2023__1",
    coaching_question_id: "cq-vajiram-2022-t4-q3",
    similarity: 76,
    created_at: "2023-11-05",
  },
];

export const topperMatches: TopperMatch[] = [
  {
    id: "tm1",
    upsc_question_id: "gs1__society__2023__1",
    topper_copy_id: "tc-2022-r5-society",
    created_at: "2024-02-10",
  },
  {
    id: "tm2",
    upsc_question_id: "gs1__society__2023__1",
    topper_copy_id: "tc-2021-r2-society",
    created_at: "2024-02-12",
  },
];

// -------------------- Query helpers --------------------

export type MatchedCoaching = CoachingQuestion & { similarity: number; matched_at: string };

export function getCoachingMatches(upscQuestionId: string): MatchedCoaching[] {
  const rows = questionMatches.filter((m) => m.upsc_question_id === upscQuestionId);
  return rows
    .map((m) => {
      const cq = coachingQuestions.find((c) => c.id === m.coaching_question_id);
      if (!cq) return null;
      return { ...cq, similarity: m.similarity, matched_at: m.created_at };
    })
    .filter((x): x is MatchedCoaching => x !== null)
    .sort((a, b) => b.similarity - a.similarity);
}

export function getTopperMatches(upscQuestionId: string): TopperCopy[] {
  const rows = topperMatches.filter((m) => m.upsc_question_id === upscQuestionId);
  return rows
    .map((m) => topperCopies.find((t) => t.id === m.topper_copy_id))
    .filter((x): x is TopperCopy => !!x);
}
