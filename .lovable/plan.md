## Diagnosis

For the current page (`gs1__art-culture__2025__1`), `pyq_coaching_matches` has only 8 rows — all Forumias/Nextias, top similarity 0.58. Vision IAS is fully ingested (5,748 embedded questions) and appears in matches for many other PYQs (2,554 rows), but none of Vision's questions made this PYQ's top-K in the cached table.

The UI reads exclusively from `pyq_coaching_matches`, so anything not pre-cached is invisible — regardless of what's in `coaching_questions`.

## Root cause

`scripts/build-matches.ts` computed a single global top-K per UPSC question. Institutes with more/closer semantic neighbours (Forumias, Nextias) crowd out smaller/differently-worded Vision entries, especially on niche PYQs like art & culture 2025.

## Fix

Rebuild `pyq_coaching_matches` so Vision (and other institutes) are represented per PYQ:

1. Change `scripts/build-matches.ts` to compute top-K **per institute per PYQ** (e.g. top 8 per institute), then union — instead of one global top-K. Keep the minimum-similarity floor low (e.g. 0.35) so weak-but-relevant matches survive; the UI already sorts by similarity and shows the badge.
2. Re-run the build to repopulate `pyq_coaching_matches`.
3. No UI/schema changes needed — `CoachingMatches.tsx` already filters by institute and sorts by similarity.

## Verification

- Query `pyq_coaching_matches` for `gs1__art-culture__2025__1` → expect Vision rows present.
- Load `/question/gs1__art-culture__2025__1` and confirm the Institute filter shows Vision IAS with cards rendering.

## Out of scope

- No changes to ingest, embeddings, Ask AI, routing, or UI components.
- Similarity threshold displayed to the user is unchanged (still `round(similarity * 100)`).
