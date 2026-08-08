-- 1. Extend existing sociology_topper_copies with richer metadata
ALTER TABLE public.sociology_topper_copies
  ADD COLUMN IF NOT EXISTS subject text NOT NULL DEFAULT 'Sociology',
  ADD COLUMN IF NOT EXISTS copy_type text,
  ADD COLUMN IF NOT EXISTS copy_name text,
  ADD COLUMN IF NOT EXISTS file_url text,
  ADD COLUMN IF NOT EXISTS page_count integer,
  ADD COLUMN IF NOT EXISTS is_approved boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 2. Questions extracted from each topper copy
CREATE TABLE IF NOT EXISTS public.sociology_topper_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topper_copy_id uuid NOT NULL REFERENCES public.sociology_topper_copies(id) ON DELETE CASCADE,
  question_number text,
  question_text text NOT NULL,
  page_start integer,
  page_end integer,
  paper text,
  section text,
  year integer,
  source text,
  ocr_text text,
  embedding vector(1536),
  is_approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sociology_topper_questions TO anon, authenticated;
GRANT ALL ON public.sociology_topper_questions TO service_role;
ALTER TABLE public.sociology_topper_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved topper questions"
  ON public.sociology_topper_questions FOR SELECT USING (is_approved = true);

CREATE INDEX IF NOT EXISTS soc_topper_questions_copy_idx
  ON public.sociology_topper_questions (topper_copy_id);

-- 3. PYQ <-> topper question matches
CREATE TABLE IF NOT EXISTS public.sociology_pyq_topper_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pyq_id text NOT NULL REFERENCES public.sociology_questions(id) ON DELETE CASCADE,
  topper_question_id uuid NOT NULL REFERENCES public.sociology_topper_questions(id) ON DELETE CASCADE,
  match_type text NOT NULL DEFAULT 'related',
  similarity_score real NOT NULL DEFAULT 0,
  matching_reason text,
  is_verified boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (pyq_id, topper_question_id)
);

GRANT SELECT ON public.sociology_pyq_topper_matches TO anon, authenticated;
GRANT ALL ON public.sociology_pyq_topper_matches TO service_role;
ALTER TABLE public.sociology_pyq_topper_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read verified sociology matches"
  ON public.sociology_pyq_topper_matches FOR SELECT USING (is_verified = true);

CREATE INDEX IF NOT EXISTS soc_pyq_matches_pyq_idx
  ON public.sociology_pyq_topper_matches (pyq_id, similarity_score DESC);

-- 4. Embeddings on sociology PYQs for semantic matching
ALTER TABLE public.sociology_questions
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- 5. updated_at triggers
DROP TRIGGER IF EXISTS soc_topper_copies_updated_at ON public.sociology_topper_copies;
CREATE TRIGGER soc_topper_copies_updated_at BEFORE UPDATE ON public.sociology_topper_copies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS soc_topper_questions_updated_at ON public.sociology_topper_questions;
CREATE TRIGGER soc_topper_questions_updated_at BEFORE UPDATE ON public.sociology_topper_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();