# My Tutor — Screenshot Audit

**Generated:** 2026-06-20
**Branch:** `claude/my-tutor-foundation-KDSUO`
**Tool:** Playwright (Chromium, headless, bundled binary at `/opt/pw-browsers`)
**Total screenshots (this audit):** 44 — 44 captured, 0 failed
**Supersedes:** the 2026-06-16 version of this file (38 screenshots, fewer routes,
no school chapter/practice/assessment/mock/focus, no onboarding, no mobile-school/admin).
The `screenshots/` directory still contains those older files (and several other
ad-hoc QA-session screenshots from earlier sprints) — they were left in place per
instructions; this document only inventories the new capture.

## Methodology

**Demo accounts created** (`scripts/seed-screenshot-demo.ts`, idempotent — safe to
re-run), all with password `DemoPass123!` (bcrypt, 12 rounds, same hashing as
`src/app/api/auth/register/route.ts` so NextAuth Credentials login works):

| Account | Email | Role / Profile | Notable seeded data |
|---|---|---|---|
| Student | `shot.student@mytutor-demo.local` | `GENERAL_LEARNER`, onboarded | ProfileSubject (Python 72%, English 35%), StudentProgress (6/15 Python lessons), 7 TopicProgress rows (MASTERED→NOT_STARTED), 1 PracticeSession + 1 MistakeRecord, 3 StudySession rows, EvidenceRecord/RetentionMetric/SubjectAnalytics/LearningAnalytics, 3 Flashcards due now, XpTransactions + UserLevel (Level 6) + StudyStreak (12-day), WeeklyXP row for the **app's own** week-key format (`lib/xp.ts` `currentWeekString()` — see bug note below), a completed RoadmapEnrollment + Certificate (`MYTUTOR-DEMO-GMXPRF`), a FinalAssessmentResult + SubjectCertificate (`MYTUTOR-ENG-GMXPRF`), a CoachProfile + LearningGoal |
| Admin | `shot.admin@mytutor-demo.local` | `role: ADMIN` set directly in DB | Minimal — exists purely to reach `/admin/*`. Not the same address as `ADMIN_EMAILS` in `.env` (`admin.beta@mytutor-test.local`, a separate pre-existing account whose password is unknown); `isAdmin()` only checks `user.role === 'ADMIN'` in the DB, so a directly-set role works identically without needing the env-var bootstrap path. |
| School student | `shot.school@mytutor-demo.local` | `SCHOOL_STUDENT`, CBSE, Grade 8 | StudentProgress keyed `cbse:mathematics:8` (2/N chapters complete). School chapter content itself is static (`BOARD_CATALOGS` in `src/lib/education`), not DB-seeded — only the Profile board/grade and progress row needed creating. |
| Fresh signup | `shot.fresh.<timestamp>@mytutor-demo.local` | created live via the real `/auth/signup` UI during capture | Used only for the onboarding screenshot — guarantees a genuinely fresh, unonboarded account every run. |

A separate one-off command additionally re-keyed the WeeklyXP row after discovering
the bug described below; that fix is now baked into the seed script itself.

**Authentication for screenshots:** real login through the `/auth/login` UI
(`scripts/screenshot-audit/capture.ts` → `loginAs()`), filling the email/password
inputs and clicking submit — no manual cookie/JWT minting. Each role uses its own
`BrowserContext` (own cookie jar) so role switches never collide; reusing one
context across logins was tried first and failed because the second `/auth/login`
visit, while still authenticated as the previous role, gets redirected straight to
`/dashboard` by `middleware.ts` before the form ever renders.

**Viewports:** desktop screenshots are full-page (`fullPage: true`) at
**1440×900**. Mobile recreations are viewport-only (`fullPage: false`) at
**390×844** for six major screens, per the task brief ("not every single route").

**Reproducing this audit:**
```bash
npx prisma db push                              # confirm schema sync
npx tsx scripts/seed.ts                          # subjects + subject library (idempotent)
npx tsx scripts/seed-screenshot-demo.ts          # the 3 demo accounts above (idempotent)
npm run dev &                                    # wait for "Ready" on :3000
DEMO_CERT_CODE=<roadmap-cert-code> DEMO_SUBJECT_CERT_CODE=<subject-cert-code> \
  npx tsx scripts/screenshot-audit/capture.ts    # all sections
# or just one section while iterating:
npx tsx scripts/screenshot-audit/capture.ts mobile,admin
```
The seed script prints both certificate codes on every run if you don't already
have them (`MYTUTOR-DEMO-GMXPRF` and `MYTUTOR-ENG-GMXPRF` in this run).

---

## Bug found during this audit (seed-script bug, not an app bug)

The `/leaderboard` "This Week" tab initially rendered **empty** despite a seeded
`WeeklyXP` row for the student. Root cause: my first seed-script draft computed
the week key with a generic ISO-8601 week-numbering formula, but
`src/app/api/leaderboard/route.ts` keys its `WeeklyXP.week` lookup off the app's
own simplified, non-ISO `currentWeekString()` in `src/lib/xp.ts` (a `Math.ceil`
day-count formula, not ISO weeks) — the two produced different strings
(`2026-W25` vs `2026-W26` depending on day-of-week edge cases). Fixed by importing
and using `currentWeekString()` directly in the seed script. This was a bug in the
seed data I wrote, not in the application — flagging it here only because the
mismatch is a sharp edge worth remembering for any *future* seed script that
touches `WeeklyXP`.

---

## auth/ (logged out, desktop 1440×900)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/auth/login` | `auth-login.png` | ✅ | Email/password form + Google OAuth button (disabled, no client ID set) + signup link. |
| `/auth/signup` | `auth-signup.png` | ✅ | Name/email/password form, single password field (no confirm field). |
| `/auth/forgot-password` | `auth-forgot-password.png` | ✅ | Email-entry form for reset link. |
| `/auth/reset-password` | `auth-reset-password.png` | ✅ | Rendered without a `?token=` query param — shows the page's own handling of a missing/invalid token gracefully (no crash). |
| `/dashboard` (logged out) | `error-unauth-redirect.png` | ⚠️ expected error state | Middleware redirects to `/auth/login?callbackUrl=/dashboard` as designed; screenshot is of the resulting login page. |
| `/admin` (logged out) | `error-unauth-admin-redirect.png` | ⚠️ expected error state | Same redirect behavior as above for the admin path. |

## onboarding/ (fresh, never-onboarded user)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/onboarding` | `onboarding-start.png` | ✅ | Step 1 of 3, "Who are you?" — School Student vs General Learner choice, correctly addressing the freshly-signed-up name. Confirms a true `onboardingCompleted: false` account reaches this instead of being redirected to `/dashboard`. |

## student/ (authenticated as `shot.student@mytutor-demo.local`, desktop)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/dashboard` | `student-dashboard.png` | ✅ | Greets "Asha Verma", shows league card, daily quests, "jump back in" Python lesson 7, per-subject progress bars (Python/English), achievements, AI Learning Coach insight panel — all reflecting seeded data correctly. |
| `/learn` | `student-learn.png` | ✅ | Subject/topic picker for the AI tutor chat. |
| `/progress` | `student-progress.png` | ✅ | Per-topic mastery, reflects the 7 seeded TopicProgress rows. |
| `/quiz` | `student-quiz.png` | ✅ | Quiz entry screen for the primary enrolled subject. |
| `/flashcards` | `student-flashcards.png` | ✅ | Shows the 3 seeded due-now flashcards. |
| `/coach` | `student-coach.png` | ✅ | AI coach chat opener for Python, referencing the seeded LearningGoal/CoachProfile. |
| `/certificates` | `student-certificates.png` | ✅ | Lists both seeded certificates (roadmap + subject). |
| `/certificates/MYTUTOR-DEMO-GMXPRF` | `student-certificate-detail.png` | ✅ | Public verification view renders "Certificate of Completion — Backend Developer, Awarded to Asha Verma" with the correct code. |
| `/leaderboard` | `student-leaderboard.png` | ✅ | "This Week" tab shows Asha ranked #1 at 1280 XP — confirms the WeeklyXP week-key fix above actually worked end-to-end. |
| `/settings` | `student-settings.png` | ✅ | Profile/voice/language/account settings. |
| `/modes` | `student-modes.png` | ✅ | "Choose Your Learning Mode" — Library Mode vs School Mode picker. |
| `/admin` (as non-admin student) | `error-nonadmin-admin-redirect.png` | ⚠️ expected error state | `AdminLayout` redirects straight to `/dashboard` (no 403 page) — silent redirect, by design. |
| `/certificates/INVALID-CODE-XYZ` | `error-certificate-invalid-code.png` | ⚠️ expected error state | Renders "Certificate not found." gracefully, no crash, no 404 (this route always 200s and checks both Certificate and SubjectCertificate tables). |

## education/ (library + dev showcase, as student)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/library` | `education-library.png` | ✅ | Full subject-library catalog grid (languages/programming/mathematics/etc.), shows Python/English as enrolled. |
| `/library/python` | `education-library-python.png` | ✅ | Module tree for Python with level/progress UI. |
| `/library/does-not-exist` | `error-library-invalid-slug.png` | ⚠️ expected error state | Standard Next.js `notFound()` → plain "404 This page could not be found." (no candy-themed 404 page exists for this route). |
| `/dev/visual-demo` | `education-visual-demo.png` | ✅ | Renders in dev mode (would 404 in production per the page's own guard) — visual-learning renderer showcase (graphs/number lines/etc.). |

## school/ (authenticated as `shot.school@mytutor-demo.local`, CBSE Grade 8, desktop)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/school/mathematics` | `school-subject-mathematics.png` | ✅ | Subject dashboard with chapter-progress ring, "Jump back in", navigator action card. |
| `/school/mathematics/chapters` | `school-subject-chapters.png` | ✅ | Full chapter list grouped by unit. |
| `/school/mathematics/chapter/<id>` | `school-subject-chapter-detail.png` | ✅ | Chapter 3/14 "A Story of Numbers" — shows engagement-risk insight, "Momentum Recovery" strategy, Continue/Practice/Assessment/Revision-Notes/Ask-Tutor actions, learning-journey concept tracker. Chapter id resolved dynamically from the chapters-page DOM, not hardcoded. |
| `/school/mathematics/chapter/<id>/practice` | `school-subject-chapter-practice.png` | ✅ | Practice-session entry for the same chapter. |
| `/school/mathematics/chapter/<id>/assessment` | `school-subject-chapter-assessment.png` | ✅ | "Chapter Assessment" — 15 questions, ~23 min, 70% to pass, Start button. |
| `/school/mathematics/mock` | `school-subject-mock.png` | ✅ | Mock-test length picker (Quick/Standard/Full), Standard pre-selected. |
| `/school/focus` | `school-focus.png` | ✅ | Focus Mode walking through today's study plan (note: this route has no `[subject]` segment — it's `/school/focus`, not `/school/[subject]/focus` as in the original route list). |

## admin/ (authenticated as `shot.admin@mytutor-demo.local`, role=ADMIN, desktop)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/admin` | `admin-overview.png` | ✅ | Mission Control overview dashboard. |
| `/admin/users` | `admin-users.png` | ✅ | User table/list. |
| `/admin/subjects` | `admin-subjects.png` | ✅ | Subject catalog management. |
| `/admin/curriculum` | `admin-curriculum.png` | ✅ | Curriculum browser. |
| `/admin/knowledge-graphs` | `admin-knowledge-graphs.png` | ✅ | KG node/edge viewer. |
| `/admin/analytics` | `admin-analytics.png` | ✅ | Platform analytics. |
| `/admin/ai-ops` | `admin-ai-ops.png` | ✅ | AI provider usage/cost dashboard. |
| `/admin/ops` | `admin-ops.png` | ✅ | Ops Center (health/jobs). |
| `/admin/settings` | `admin-settings.png` | ✅ | System settings (AI usage limits, etc.). |
| `/admin/users/<id>` | `admin-users-detail.png` | ✅ | Detail view for a real user id resolved from the `/admin/users` DOM (happened to be the seeded school student) — shows profile fields, Promote/Disable actions, per-subject progress. |

## mobile/ (390×844, viewport-only, six major screens)

| Route | Screenshot | Status | Observation |
|---|---|---|---|
| `/dashboard` (student) | `mobile-dashboard.png` | ✅ | Confirms responsive stacking of dashboard cards. |
| `/learn` (student) | `mobile-learn.png` | ✅ | |
| `/quiz` (student) | `mobile-quiz.png` | ✅ | |
| `/school/mathematics` (school student) | `mobile-school-subject.png` | ✅ | |
| `/admin` (admin) | `mobile-admin-home.png` | ✅ | Admin sidebar layout on a 390px viewport — worth a future UX look since the desktop admin layout uses a fixed 224px sidebar that may not collapse on mobile (not verified in detail here, screenshot only). |

---

## Routes from the original 35-route audit not captured separately

- `/` (marketing home) — not screenshotted; out of scope per the task's category list (auth/onboarding/student/education/school/admin/mobile), and not behind auth so lowest priority.
- `/admin/users/[id]` — captured (see admin-users-detail.png above).
- `/school/[subject]/focus` as written in the original task brief does not exist as a route; the real route is `/school/focus` (no subject segment) — captured as `school-focus.png`.

## Known limitations of this pass

- AI-chat-driven panes (`/learn`, `/coach`, `/quiz` mid-session) were screenshotted only at their initial/opener state — no `OPENROUTER_API_KEY` was required or used since these are static initial page loads; an actual AI exchange was not exercised.
- The admin "AI Operations" and "Ops Center" pages show whatever baseline state exists from the pre-existing 58-user dataset already in this DB (not exclusively the new demo data) since those are platform-wide views, not per-user.
