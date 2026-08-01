CREATE TABLE public.prelims_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer NOT NULL,
  serial_no integer NOT NULL,
  subject text NOT NULL,
  question_text text NOT NULL,
  option_a text NOT NULL DEFAULT '',
  option_b text NOT NULL DEFAULT '',
  option_c text NOT NULL DEFAULT '',
  option_d text NOT NULL DEFAULT '',
  correct_option text,
  is_dropped boolean NOT NULL DEFAULT false,
  comments text,
  needs_review boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.prelims_questions TO anon, authenticated;
GRANT ALL ON public.prelims_questions TO service_role;
ALTER TABLE public.prelims_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read prelims_questions" ON public.prelims_questions FOR SELECT USING (true);
CREATE INDEX prelims_questions_year_idx ON public.prelims_questions (year, serial_no);
CREATE INDEX prelims_questions_subject_idx ON public.prelims_questions (subject);
CREATE TRIGGER update_prelims_questions_updated_at BEFORE UPDATE ON public.prelims_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.prelims_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mode text NOT NULL,
  year integer,
  subject text,
  started_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  duration_seconds integer,
  score numeric,
  max_score numeric,
  total_scored integer,
  correct_count integer,
  incorrect_count integer,
  unattempted_count integer,
  accuracy numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prelims_attempts TO authenticated;
GRANT ALL ON public.prelims_attempts TO service_role;
ALTER TABLE public.prelims_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own attempts" ON public.prelims_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX prelims_attempts_user_idx ON public.prelims_attempts (user_id, started_at DESC);
CREATE TRIGGER update_prelims_attempts_updated_at BEFORE UPDATE ON public.prelims_attempts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.prelims_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.prelims_attempts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.prelims_questions(id) ON DELETE CASCADE,
  selected_option text,
  flagged boolean NOT NULL DEFAULT false,
  is_correct boolean,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (attempt_id, question_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prelims_responses TO authenticated;
GRANT ALL ON public.prelims_responses TO service_role;
ALTER TABLE public.prelims_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own responses" ON public.prelims_responses FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX prelims_responses_attempt_idx ON public.prelims_responses (attempt_id);

CREATE TABLE public.model_answers (
  id text PRIMARY KEY,
  paper_slug text NOT NULL,
  subject_slug text,
  year integer,
  question_number integer,
  question_text text NOT NULL,
  answer_md text NOT NULL,
  source text NOT NULL DEFAULT 'ai',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.model_answers TO anon, authenticated;
GRANT ALL ON public.model_answers TO service_role;
ALTER TABLE public.model_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read model_answers" ON public.model_answers FOR SELECT USING (true);
CREATE TRIGGER update_model_answers_updated_at BEFORE UPDATE ON public.model_answers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();