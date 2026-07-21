
CREATE POLICY "Users upload own answer files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'answer-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users read own answer files" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'answer-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own answer files" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'answer-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
