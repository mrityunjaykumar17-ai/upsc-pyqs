ALTER TABLE public.evaluations
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS question_count INTEGER;