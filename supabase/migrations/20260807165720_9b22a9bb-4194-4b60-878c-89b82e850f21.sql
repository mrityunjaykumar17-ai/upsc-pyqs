CREATE TABLE public.sociology_questions (
  id text PRIMARY KEY,
  paper integer NOT NULL,
  chapter text NOT NULL,
  chapter_slug text NOT NULL,
  chapter_order integer NOT NULL DEFAULT 0,
  topic text NOT NULL,
  topic_slug text NOT NULL,
  topic_order integer NOT NULL DEFAULT 0,
  question_text text NOT NULL,
  year integer,
  question_number text,
  marks integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sociology_questions TO anon, authenticated;
GRANT ALL ON public.sociology_questions TO service_role;
ALTER TABLE public.sociology_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sociology_questions" ON public.sociology_questions FOR SELECT USING (true);
CREATE TRIGGER update_sociology_questions_updated_at BEFORE UPDATE ON public.sociology_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX sociology_questions_paper_chapter_idx ON public.sociology_questions (paper, chapter_order, topic_order, year DESC);

CREATE TABLE public.sociology_topper_copies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topper_name text NOT NULL,
  rank integer,
  upsc_year integer,
  source_site text NOT NULL,
  source_url text,
  pdf_url text NOT NULL,
  paper text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sociology_topper_copies TO anon, authenticated;
GRANT ALL ON public.sociology_topper_copies TO service_role;
ALTER TABLE public.sociology_topper_copies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sociology_topper_copies" ON public.sociology_topper_copies FOR SELECT USING (true);

CREATE TABLE public.sociology_topper_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sociology_question_id text NOT NULL REFERENCES public.sociology_questions(id) ON DELETE CASCADE,
  topper_copy_id uuid NOT NULL REFERENCES public.sociology_topper_copies(id) ON DELETE CASCADE,
  page_number integer,
  similarity real NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (sociology_question_id, topper_copy_id)
);
GRANT SELECT ON public.sociology_topper_matches TO anon, authenticated;
GRANT ALL ON public.sociology_topper_matches TO service_role;
ALTER TABLE public.sociology_topper_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sociology_topper_matches" ON public.sociology_topper_matches FOR SELECT USING (true);
CREATE INDEX sociology_topper_matches_q_idx ON public.sociology_topper_matches (sociology_question_id, similarity DESC);

ALTER TABLE public.model_answers ADD COLUMN IF NOT EXISTS keywords text[];