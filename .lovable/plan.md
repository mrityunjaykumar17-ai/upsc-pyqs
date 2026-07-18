## Scope

Sixteen numbered changes to the existing site. Existing GS → Subject → Year → Question hierarchy and all working data stay intact.

## 1. Simplify topper/coaching cards (Detail page)

- In `CoachingMatches.tsx`: remove GS Score and Test Series display. Keep matching question, coaching institute, candidate name, AIR, UPSC year, PDF link with page number.
- No schema changes for this step (fields stay in DB, UI just hides them).

## 2. Enrich topper rank + year (data only, no fabrication)

- Add columns to `topper_copies`: `upsc_rank int`, `upsc_year int` (rename in code from existing `rank`/`upsc_year` — schema already has `rank`, `upsc_year`), plus `rank_source_url text`, `year_source_url text`.
- Since `rank` and `upsc_year` already exist, only add the two `*_source_url` columns via migration.
- Backfill: I will fetch verified rank/year from public UPSC-related sources (official UPSC final result PDFs where accessible, coaching topper profile pages) via a one-off enrichment script (`scripts/enrich-toppers.ts`). Only exact name matches with a corroborating source are written; ambiguous names skipped.
- UI: show "Rank not available" / "Year not available" when null.

Note: I cannot guarantee 100% coverage — will do a best-effort pass and log unresolved candidates. No fabricated values.

## 3 + 4 + 5. Ask AI vs Customize

- Detail page shows two buttons: `[Ask AI]` (existing instant generation) and `[Customize]` (new).
- New component `CustomizeAnswer.tsx`:
  - Word count selector: 150 / 250 / Custom.
  - Toggle chips: More Indian Examples, Add Data, Add Case Studies, Add Current Affairs, Add Government Schemes, Add Quotes, Better Introduction, Better Conclusion, Balanced Analysis.
  - Free-text input.
  - Continuing chat interface (uses AI Elements primitives: Conversation, Message, PromptInput, Shimmer).
- New server function `customizeAnswer` (streaming via `streamText` + `toUIMessageStreamResponse`) at `/api/chat`-style server route. Because this is an existing TanStack project and we already use non-streaming `fetch` for Ask AI, I'll implement Customize as a server route `src/routes/api/customize-chat.ts` using AI SDK `streamText` and `useChat` on the client.
- Context injected server-side into the system message: question text, GS paper, subject, year, marks, words, and the previously generated default answer if the client passes it.

## 6 + 7. Improved default Ask AI

- Rewrite the system prompt in `ask-ai.functions.ts` with the enrichment priorities (data, examples, case studies, schemes, reports, quotes) and the "never fabricate" rules. Keep the same request/response shape so `AskAI.tsx` is unchanged.

## 8 + 9 + 10 + 11 + 12. Ethics handling

- In both `ask-ai.functions.ts` and the customize server route, detect Ethics: `paper` matches `GS4`/`Ethics` (case-insensitive) OR `subject` contains ethics keywords.
- If Ethics: further classify theory vs case study by keyword heuristics ("you are", "options available", "course of action", "case study" → case study).
- Use dedicated system prompts for Ethics-theory (Point → Explanation → Example, personality library, accurate quotes only, no fabrication) and Ethics-case-study (Facts / Stakeholders / Ethical issues / Values in conflict / 3–4 Options with Pros/Cons / Recommended action / Implementation / Ethical justification).

## 13. Header

- In `SiteHeader.tsx`: replace `UPSC.gov.in` external link with a `<Link to="/contact">Contact Us</Link>`.

## 14. Contact page

- New route `src/routes/contact.tsx` with a form: name (required), email (optional, validated), contact_number (optional), message (required, min length).
- New table `public.contact_messages` (id, name, email, contact_number, message, status, created_at) with RLS: anon INSERT allowed (public form), no SELECT for anon. GRANTs per rules.
- Submission flow: client calls a `submitContact` server function which (a) validates with Zod, (b) inserts row via server publishable client, (c) sends email to `mrityunjay.tab@gmail.com` using Lovable Emails (`sendTemplateEmail`). Requires email domain + auth/app email scaffolding. Since email domain setup requires user action, the flow will:
  - Insert to DB always.
  - Attempt email send; if `no_email_domain` / not configured, log a warning and still return success (DB backup preserved).
- I will prompt the user separately to run email domain setup so email delivery to `mrityunjay.tab@gmail.com` starts working.

## 15. Footer

- Add a minimal footer component `SiteFooter.tsx` with only "Made by Mrityunjay" and include it in `__root.tsx`.

## 16. Verification

- Playwright smoke pass: browse to a GS4 ethics question → check both buttons; browse to a non-ethics question → Ask AI; open Contact page → submit test message; verify footer text.

## Technical details

- Migration for step 2: `ALTER TABLE topper_copies ADD COLUMN rank_source_url text, ADD COLUMN year_source_url text;`
- Migration for step 14: create `contact_messages`, RLS `INSERT WITH CHECK (true)` for `anon`+`authenticated`, no SELECT policy for anon; GRANT INSERT to anon/authenticated, GRANT ALL to service_role.
- Streaming chat route uses `@ai-sdk/openai-compatible` + AI Gateway helper (`createLovableAiGatewayProvider`) with `openai/gpt-5.5`.
- AI Elements install: `bun x ai-elements@latest add conversation message prompt-input shimmer` for Customize only. If install fails I'll build a minimal composer inline (documented exception).
- No changes to existing routes, matching pipeline, embeddings, or the search/AskAI components except the two-button row.

## Out of scope

- Rebuilding matches table (already discussed in previous turn).
- Any change to the GS → Subject → Year → Q hierarchy.
- Building marketing/analytics/admin dashboards.

Ready to implement on approval.
