# Upgrade plan — Topper Copies + Semantic Matching + Ask AI v2

## What I found on the reference site

`https://toppercopies.upsckata.com/` is a static site. Each row in its public table exposes exactly what we need — **no private API**, no login:

- **Topper name** + **coaching institute** (e.g. `A R Rajah / Forumias`)
- **GS Paper** (GS1/GS2/GS3/GS4/Essay)
- **Question text** (verbatim coaching/test-series question)
- **PDF URL** with `#page=N` deep link (hosted on Forumias, Vision IAS, etc.)
- **Page number**

Missing on the source: topper's CSE year, rank, GS-paper score, test-series name/year. These will be stored as `null` / "Not available" per your rule — no fabrication.

## Architecture

```text
upsckata HTML ── scraper (Node script) ──▶ /public/data/topper-copies.json
                                                        │
                                          seed migration + insert
                                                        ▼
                              Lovable Cloud (Postgres + pgvector)
                              ├─ topper_copies
                              ├─ coaching_questions  (+ embedding vector)
                              ├─ upsc_questions      (+ embedding vector)   ← mirrors src/data/pyq.ts
                              └─ pyq_coaching_matches (cached top-K, threshold-filtered)

Question detail page ──▶ server fn `getMatchesForPyq(id)` ──▶ cached matches
Ask AI v2      ──▶ server fn `askAI` (retrieval + structured UPSC prompt)
```

## Steps

1. **Enable Lovable Cloud** (Postgres + pgvector + secrets for `LOVABLE_API_KEY`).
2. **Schema migration** — three tables above with grants + RLS (public SELECT, service-role writes). `coaching_questions.embedding vector(3072)` with halfvec HNSW index; same on `upsc_questions`.
3. **Scraper** (`scripts/scrape-upsckata.ts`, run once in sandbox):
   - Fetch `https://toppercopies.upsckata.com/` + any linked topper pages.
   - Parse the rows: topper, institute, GS paper, question, pdf_url, page_number.
   - Emit `public/data/topper-copies.json`.
   - Report counts; you can re-run whenever the source updates.
4. **Import pipeline** (`scripts/import-topper-copies.ts`):
   - Upsert `topper_copies` + `coaching_questions`.
   - Embed each coaching question via Lovable AI (`google/gemini-embedding-2`, batched ≤100).
   - Embed every `src/data/pyq.ts` question into `upsc_questions`.
5. **Match precomputation** (`scripts/build-matches.ts`):
   - For each UPSC PYQ, cosine-search top-K coaching questions (default K=20, threshold 0.72 — configurable via env).
   - Write to `pyq_coaching_matches` with `similarity_score` and `match_type='semantic'`.
6. **Question Detail page upgrade** (`/question/$id`):
   - Replace seed `resources.ts` reads with a server fn `getMatchesForPyq` querying `pyq_coaching_matches` joined to coaching + topper.
   - Card shows: institute, question, topper, CSE year (or "Not available"), GS score (or "Not available"), test series, PDF page number, similarity %, **View Topper Answer** → `pdf_url#page=N`.
   - Filters: institute multi-select; sort by Most Relevant / Year / Topper / Institute.
   - Expandable card (collapsed vs expanded fields as specified).
   - Empty states preserved.
7. **Ask AI v2** (`src/lib/ask-ai.functions.ts`):
   - Detect **directive word** (Discuss / Examine / Critically examine / Analyze / Evaluate / Comment) from the question.
   - Retrieve top matched topper answers' PDF links + a short curated **Indian examples** knowledge pack (checked-in JSON of PIB/NITI/Economic Survey pointers keyed by GS + topic — no live scraping, no fabricated URLs).
   - Structured system prompt enforcing: intro → subheaded body with dimensions → Indian examples (3–5) → schemes / Articles / SC judgments / committees where relevant → challenges → way forward → conclusion, with **bold keywords** and a "Sources & Further Reading" block that only lists URLs present in the retrieved pack.
   - Model: `openai/gpt-5.5` via Lovable AI Gateway (already wired).
8. **Verification** — run scraper + import + match build; open one real PYQ (e.g. GS4 ethics) and confirm ≥1 real topper copy card renders with a working `#page=N` link. Screenshot with Playwright.

## Data-pipeline honesty

If scraping upsckata fails (site changes, blocks the sandbox), I will not fall back to mock data. I will:
- Tell you exactly what failed.
- Ship the schema + import pipeline that accepts a JSON/CSV in the documented shape so you can supply data.

## Scope guardrails

- **Not changing**: GS→Subject→Year hierarchy, existing routes, current Ask AI button UI placement.
- **Kept**: `AskAI` component contract (`question`, `marks`, `words`); only the server function's prompt + retrieval improve.
- **Removed**: hardcoded `src/data/resources.ts` seed once real data is imported (kept as fallback type definitions only).

## Technical details

- Embeddings: `google/gemini-embedding-2` (3072-dim), halfvec HNSW cosine index, threshold configurable via `MATCH_THRESHOLD` env (default 0.72).
- Scoring displayed as `round(similarity * 100)`% with the existing green/blue/orange/gray badge tiers.
- Semantic search runs offline (build-time) into `pyq_coaching_matches`; the runtime page reads pre-cached rows — fast, cheap, deterministic.
- RLS: public SELECT on all three tables (data is already public on the source); writes restricted to service role.

## Deliverables per this plan

- 1 migration, 3 scripts, 1 new server fn, 1 upgraded server fn (Ask AI), updates to `question.$id.tsx` + `CoachingMatches.tsx` + `TopperCopies.tsx`.
- One end-to-end verified PYQ detail page with real data.

Approve and I'll enable Cloud and start with the scraper + schema.
