
This is two very large features. I'll outline scope, phasing, and open questions before writing any code.

## Overview

Two new top-level tabs:
1. **AI Evaluation** — auth-gated. Upload handwritten answer sheets → OCR → AI evaluation → history.
2. **Current Affairs** — daily ingested UPSC-oriented news with PYQ mapping, syllabus mapping, answer-writing material.

Both are large. I recommend shipping in phases; details below.

---

## Phase A — AI Evaluation (MVP)

### Navigation
- Add `AI Evaluation` link in `SiteHeader.tsx` (next to Home, Contact Us).
- New route `/evaluate` (landing) and `/evaluate/history`, `/evaluate/$id` (result page).

### Landing page (`/evaluate`)
- Explains the feature and its checks (marks prediction, structure, demand, dimensions, keywords, diagrams, model answer, etc.).
- CTA changes based on auth state (Sign in → Upload).

### Auth
- Enable Supabase email/phone + Google OAuth via managed Cloud auth.
- Sign-in modal with **Continue with Google** and **Continue with Phone (OTP)**.
- Create `profiles` table: `id (auth.users FK)`, `name`, `email`, `phone`.
- Trigger to auto-create profile on signup.

### Storage
- Create Supabase Storage bucket `answer-uploads` (private). Signed URLs for reads.
- Table `evaluations`:
  - `id`, `user_id`, `status` (`uploaded|ocr|evaluating|done|error`),
  - `file_paths jsonb` (list of stored files), `ocr_text text`,
  - `detected_question_id text nullable` (FK-ish to `upsc_questions`), `detected_meta jsonb` (paper/year/topic when no DB match),
  - `evaluation jsonb` (structured report), `marks_awarded numeric`, `marks_out_of int`,
  - `created_at`, `updated_at`.
- Table `evaluation_pages`:
  - `id`, `evaluation_id`, `page_number`, `ocr_text`, `ocr_meta jsonb` (blocks, underlines, diagrams flags).
- RLS: user can CRUD only their own rows; service role full.
- GRANTs per rules.

### Upload interface
- Drag & drop + file picker (PDF, JPG, PNG, multi-page).
- Uploads directly to Storage; then calls `startEvaluation` server fn.

### OCR pipeline
- Server function `runOcr` (createServerFn, auth middleware).
- OCR provider: **Google Gemini via Lovable AI Gateway** (`google/gemini-2.5-pro` or the current default multimodal model per `ai-models-chat`). It handles handwritten text, structure, underlines, headings, tables, and diagrams reasonably well and avoids third-party OCR keys.
- Prompt returns structured JSON: pages[] with paragraphs, headings, bullets, numbering, underlined tokens, diagrams/tables flags, and detected question text.

### Question matching
- Embed detected question text with `google/gemini-embedding-2` (matches existing pgvector setup).
- Cosine search against `upsc_questions.embedding` (top 1, threshold ≈ 0.75).
- If matched: link `detected_question_id`. Else store detected metadata.

### AI evaluation
- Modular prompt built from criteria blocks (marks, demand, structure, content, keywords, value addition, diagrams, underlines, handwriting, language, time, missing points, improved answer).
- Ethics-specific branch reuses existing `answer-prompt.ts` ethics detection.
- Model: `openai/gpt-5.5` (chat default), structured JSON output via schema.
- Store report in `evaluations.evaluation`.

### Results UI (`/evaluate/$id`)
- Prominent score card at top (e.g., `11 / 15` + expected range).
- Expandable sections per criterion with strength/weakness chips.
- Diff view: student answer vs improved topper answer.
- Related coaching/topper copies (reuse `CoachingMatches` when matched to a PYQ).
- Download report as PDF (client-side via `window.print` styled page for MVP).

### History (`/evaluate/history`)
- List user's evaluations with date, question, marks, status, delete, search.

### Premium-ready
- `evaluation_quotas` table (`user_id`, `plan`, `daily_limit`, `used_today`, `reset_at`) — schema only, no limits enforced by default.
- Feature flags via a `plan_features` config table.

---

## Phase B — Current Affairs

### Navigation
- Add `Current Affairs` link. Route `/current-affairs` + `/current-affairs/$date` + `/current-affairs/article/$id`.

### Schema
- `ca_articles`: `id`, `headline`, `why_in_news`, `summary`, `published_on date`, `gs_papers text[]`, `syllabus_topics text[]`, `dimensions jsonb`, `keywords text[]`, `static_concepts jsonb`, `answer_writing jsonb` (facts, schemes, reports, committees, articles, judgments, data, examples, quotes, diagrams), `practice_questions jsonb`, `model_answer text`, `embedding vector`.
- `ca_sources`: `id`, `article_id`, `source_name`, `url`, `published_at`.
- `ca_pyq_links`: `id`, `article_id`, `upsc_question_id`, `similarity`.
- `ca_bookmarks` / `ca_notes` / `ca_highlights` per user.
- RLS + GRANTs.

### Ingestion pipeline
- **Important honesty**: I can't run a live daily scraper from inside the app. Two options:
  1. **Scheduled TSS route + pg_cron** (`/api/public/hooks/ca-ingest`) that pulls RSS feeds from The Hindu, Indian Express, PIB, PRS, etc., calls AI to summarize/classify, deduplicates via embeddings, writes rows. Reliable but limited to sources that expose RSS/JSON.
  2. Manual/CSV upload by admin.
- I'll build **option 1** with a small set of RSS sources (PIB, The Hindu top stories, Indian Express, PRS blog). Coaching-source scraping (Vision IAS/ForumIAS) is fragile and often behind paywalls/ToS — I'll leave hooks but not enable by default.

### Per-article AI processing
- Single `processArticle` server fn: takes raw text + URL, returns structured `ca_articles` row.
- Deduplication: embed headline+lead; if cosine ≥ 0.9 vs last 7 days, merge sources into existing article instead of inserting.
- PYQ mapping: cosine search vs `upsc_questions.embedding`, top 5 ≥ 0.55 → `ca_pyq_links`.

### Frontend
- Date-grouped feed (reverse chronological), expandable date groups.
- Article card with sections: Why in news, Summary, Syllabus mapping, Related PYQs, Demand analysis, Static concepts, Multi-dimensional analysis, Answer-writing enrichment, Practice questions, Model answer, "You should also read".
- Filters (date, GS paper, subject, source, ministry, scheme, etc.).
- AI-powered search: server fn that embeds the query and returns top articles.
- Bookmarks + notes + highlights (auth required).
- **Daily Revision** section: top 5 news/keywords/data/PYQs/questions for the day (auto-generated in ingest).
- **Weekly / Monthly compilations**: server fn generates a compiled markdown/HTML doc from the week/month's articles; cached in `ca_compilations` table.

### Future-proofing
- Schema keeps `type` on `ca_articles` (`mains|prelims`) and `quizzes` table stub for prelims mode, flashcards, spaced repetition.

---

## Recommended phasing

Because both features together are far larger than a single build session, I'd like to ship in this order and get your OK at each gate:

1. **A1 – AI Evaluation MVP**: nav tab, landing, auth (Google + phone OTP), upload → OCR → single-question evaluation → results page → history. No premium quotas UI, no PDF export.
2. **A2 – AI Evaluation polish**: PDF export, quotas schema, model-answer diff, topper-copy comparison surface.
3. **B1 – Current Affairs foundation**: schema, ingest pipeline (RSS: PIB + Hindu + Indian Express + PRS), article page, date feed, PYQ mapping, filters.
4. **B2 – Current Affairs power features**: AI search, bookmarks/notes/highlights, Daily Revision, Weekly/Monthly compilations.

## Open questions before I start

1. **Phone auth**: Supabase phone OTP requires an SMS provider (Twilio/MessageBird) with your credentials. Do you already have one, or should I ship **Google-only sign-in first** and add phone later when you provide SMS credentials?
2. **Model choice for OCR**: OK to use Gemini via Lovable AI Gateway (no extra keys), or do you want a dedicated OCR service (Google Vision/AWS Textract — needs your API key)?
3. **CA ingestion sources**: OK to start with public RSS (PIB, The Hindu, Indian Express, PRS) and skip Vision IAS/ForumIAS scraping (ToS/paywall risk)?
4. **Scope of this build**: Should I ship **Phase A1 only** in this turn, or attempt A1 + B1 together (larger, higher chance of rough edges)?

Answering these unblocks me. If you don't want to answer, my defaults are: Google-only sign-in first, Gemini for OCR, RSS-only for CA, and ship **A1 first**.
