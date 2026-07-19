
-- Rebuild pyq_coaching_matches with year-diverse top matches.
-- For each UPSC question, pick top 5 matches per (topper_year_bucket, institute).
TRUNCATE TABLE public.pyq_coaching_matches;

INSERT INTO public.pyq_coaching_matches (upsc_question_id, coaching_question_id, similarity_score, match_type)
SELECT DISTINCT ON (uq.id, cq.id) uq.id, cq.id, sim, 'semantic'
FROM public.upsc_questions uq
CROSS JOIN LATERAL (
  -- Top 4 per institute (any year)
  (
    SELECT cq.id, cq.coaching_institute, tc.upsc_year, 1 - (cq.embedding <=> uq.embedding) AS sim
    FROM public.coaching_questions cq
    JOIN public.topper_copies tc ON tc.id = cq.topper_copy_id
    WHERE cq.embedding IS NOT NULL
    ORDER BY cq.embedding <=> uq.embedding
    LIMIT 60
  )
  UNION ALL
  -- Top 5 for 2023 rank<=100
  (
    SELECT cq.id, cq.coaching_institute, tc.upsc_year, 1 - (cq.embedding <=> uq.embedding) AS sim
    FROM public.coaching_questions cq
    JOIN public.topper_copies tc ON tc.id = cq.topper_copy_id
    WHERE cq.embedding IS NOT NULL AND tc.upsc_year = 2023 AND tc.rank <= 100
    ORDER BY cq.embedding <=> uq.embedding
    LIMIT 8
  )
  UNION ALL
  -- Top 5 for 2024 rank<=100
  (
    SELECT cq.id, cq.coaching_institute, tc.upsc_year, 1 - (cq.embedding <=> uq.embedding) AS sim
    FROM public.coaching_questions cq
    JOIN public.topper_copies tc ON tc.id = cq.topper_copy_id
    WHERE cq.embedding IS NOT NULL AND tc.upsc_year = 2024 AND tc.rank <= 100
    ORDER BY cq.embedding <=> uq.embedding
    LIMIT 8
  )
  UNION ALL
  -- Top 5 for 2025 rank<=100
  (
    SELECT cq.id, cq.coaching_institute, tc.upsc_year, 1 - (cq.embedding <=> uq.embedding) AS sim
    FROM public.coaching_questions cq
    JOIN public.topper_copies tc ON tc.id = cq.topper_copy_id
    WHERE cq.embedding IS NOT NULL AND tc.upsc_year = 2025 AND tc.rank <= 100
    ORDER BY cq.embedding <=> uq.embedding
    LIMIT 8
  )
) cq(id, coaching_institute, upsc_year, sim)
WHERE uq.embedding IS NOT NULL AND cq.sim >= 0.35
ORDER BY uq.id, cq.id, cq.sim DESC;
