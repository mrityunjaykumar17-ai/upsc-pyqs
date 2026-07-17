
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE public.topper_copies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topper_name text NOT NULL,
  coaching_institute text NOT NULL,
  upsc_year integer,
  rank integer,
  gs1_score integer,
  gs2_score integer,
  gs3_score integer,
  gs4_score integer,
  essay_score integer,
  test_series text,
  pdf_url text NOT NULL,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (topper_name, coaching_institute, pdf_url)
);
GRANT SELECT ON public.topper_copies TO anon, authenticated;
GRANT ALL ON public.topper_copies TO service_role;
ALTER TABLE public.topper_copies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read topper_copies" ON public.topper_copies FOR SELECT USING (true);

CREATE TABLE public.coaching_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topper_copy_id uuid NOT NULL REFERENCES public.topper_copies(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  gs_paper text,
  subject text,
  topic text,
  year integer,
  page_number integer,
  pdf_url text NOT NULL,
  coaching_institute text NOT NULL,
  test_series text,
  metadata text,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.coaching_questions TO anon, authenticated;
GRANT ALL ON public.coaching_questions TO service_role;
ALTER TABLE public.coaching_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coaching_questions" ON public.coaching_questions FOR SELECT USING (true);
CREATE INDEX coaching_questions_gs_paper_idx ON public.coaching_questions(gs_paper);
CREATE INDEX coaching_questions_topper_idx ON public.coaching_questions(topper_copy_id);
CREATE INDEX coaching_questions_embedding_idx ON public.coaching_questions
  USING hnsw (embedding vector_cosine_ops);

CREATE TABLE public.upsc_questions (
  id text PRIMARY KEY, -- makeQuestionId(paper, subject, year, n)
  paper_slug text NOT NULL,
  subject_slug text NOT NULL,
  year integer NOT NULL,
  question_number integer NOT NULL,
  question_text text NOT NULL,
  marks integer,
  words integer,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.upsc_questions TO anon, authenticated;
GRANT ALL ON public.upsc_questions TO service_role;
ALTER TABLE public.upsc_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read upsc_questions" ON public.upsc_questions FOR SELECT USING (true);
CREATE INDEX upsc_questions_embedding_idx ON public.upsc_questions
  USING hnsw (embedding vector_cosine_ops);

CREATE TABLE public.pyq_coaching_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  upsc_question_id text NOT NULL REFERENCES public.upsc_questions(id) ON DELETE CASCADE,
  coaching_question_id uuid NOT NULL REFERENCES public.coaching_questions(id) ON DELETE CASCADE,
  similarity_score real NOT NULL,
  match_type text NOT NULL DEFAULT 'semantic',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (upsc_question_id, coaching_question_id)
);
GRANT SELECT ON public.pyq_coaching_matches TO anon, authenticated;
GRANT ALL ON public.pyq_coaching_matches TO service_role;
ALTER TABLE public.pyq_coaching_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read matches" ON public.pyq_coaching_matches FOR SELECT USING (true);
CREATE INDEX pyq_coaching_matches_pyq_idx ON public.pyq_coaching_matches(upsc_question_id, similarity_score DESC);
