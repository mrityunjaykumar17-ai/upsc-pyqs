# Plan: Prelims module, stored Mains answers, Admin console, Google login

I inspected the uploaded zip (`upscguide-main`) — it is a more advanced version of this same app and already contains working implementations for prelims, admin, model answers and auth. I'll port those patterns, adapted to the current codebase, and load both CSVs into the database.

Verified from the uploads:
- Prelims CSV: 1,300 questions, 2013–2025 (100 per year), 9 subjects (Economy, Environment, Polity, History, Science & Technology, Geography, Current Affairs, Art & Culture, International Relations), with `correct_option`, `is_dropped` (3 dropped), `comments`.
- Mains CSV: 383 model answers keyed by question id (e.g. `gs1__art-culture__2025__1`), mostly `source=pdf`. A few rows have empty `subject_slug`/`year` — those get backfilled from the id.

## 1. Database

New tables (migration, with grants + RLS):
- `prelims_questions` — year, serial_no, subject, question_text, option_a–d, correct_option, is_dropped, comments, needs_review. Public read.
- `prelims_attempts` — mode (year/subject), year, subject, score, correct/incorrect/unattempted counts, accuracy, started_at, submitted_at, duration. Owner-only.
- `prelims_responses` — attempt_id, question_id, selected_option, is_correct, flagged. Owner-only.
- `model_answers` — id (matches PYQ id), paper_slug, subject_slug, year, question_number, question_text, answer_md, source (`pdf` | `ai` | `manual`). Public read; writes via server functions only.
- `admin_sessions` is not needed — admin auth uses a signed, encrypted server session cookie.

Data load: both CSVs imported into `prelims_questions` and `model_answers`.

## 2. Prelims PYQs tab

Routes:
- `/prelims` — two sections: **Year wise** (2013–2025 cards, 100 Qs, 2-hour timer) and **Subject wise** (9 subject cards with question counts).
- `/prelims/year/$year` and `/prelims/subject/$subject` — test runner.
- `/prelims/result/$attemptId` — score breakdown and question-by-question review with correct answers.

Test runner (ported from the zip's `TestRunner.tsx`): palette navigation, mark-for-review, clear response, countdown timer (2h for year-wise; subject tests scale by question count), auto-submit at zero.

Marking: correct +2, wrong −2/3, unattempted 0, dropped (`is_dropped`) 0 and excluded from the max score.

Signed-in users get attempts saved to the database; guests can still take a test with results held in browser storage (as in the reference project).

## 3. Mains tab changes

- `AskAI.tsx`: rename **Ask AI** → **Answer**, **Customize** → **Ask AI**.
- **Answer** button: fetch the stored answer from `model_answers` by question id. If missing, generate with AI and store it (`source=ai`), then display.
- **Ask AI** (the customize/chat flow): generates an answer; if none is stored for the question, the generated result is saved to `model_answers`.

## 4. Admin console at `/admin`

- Login form (username `admin123`, password `qwerty12345`) validated **server-side** against project secrets with a timing-safe compare; success sets an encrypted httpOnly session cookie. Credentials never ship in client code.
- Two sections after login:
  - **Prelims** — searchable/filterable table (year, subject, needs-review, text search); edit question text, options, correct option, dropped flag, comments; saves to the database.
  - **Mains** — searchable/filterable list (paper, subject, year, text search); view and edit `answer_md` in a markdown editor with preview; saves to the database.
- All admin reads/writes go through admin-session-guarded server functions.

## 5. Google login on the homepage

- Header gains a **Login** button that starts Google sign-in and returns the user to the page they started from (current path stored before redirect, restored after the session hydrates).
- When signed in, the button becomes an account menu with the user's name and Sign out.
- Header tabs, in order: Home · Prelims PYQs · AI Evaluation · Contact us · Login/account.

## Technical notes

- Prelims lists and question fetching use public server functions (SSR-safe); attempt saving uses authenticated server functions so RLS scopes rows to the user.
- Correct answers are never sent to the client during a live test — the runner fetches question/option text only, and scoring happens server-side on submit.
- Admin password and session secret are stored as project secrets, defaulting to the credentials given above.
- Route heads (title/description/OG) added for `/prelims` and its subroutes.
