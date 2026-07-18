
ALTER TABLE public.topper_copies
  ADD COLUMN IF NOT EXISTS rank_source_url text,
  ADD COLUMN IF NOT EXISTS year_source_url text;

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  contact_number text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(message) BETWEEN 1 AND 5000
    AND (email IS NULL OR length(email) <= 320)
    AND (contact_number IS NULL OR length(contact_number) <= 50)
  );
