# My Tutor — Beta Readiness Audit

**Audit type:** Production-readiness audit (NOT a UI/design audit). Static code review only — no runtime testing was performed against a live database in this pass; all findings are from reading the actual implementation (routes, Prisma schema, components) and tracing logic.

**Branch audited:** `claude/my-tutor-foundation-KDSUO`

**Scope:** Section 1 (user journeys), Section 2 (data integrity), Section 3 (API reliability), as requested. No code was modified, fixed, or committed as part of this audit.

---

## 1. Executive Summary

The platform's individual features (Dashboard V2, Lesson Experience, School Experience, Auth, Admin, multi-board/grade, leaderboard, TTS) are functionally built and the recent Sprint A/B stabilization work fixed real, verified UX issues. However, this audit found **9 issues that meet the CRITICAL bar** (can lose data, corrupt progress, block onboarding/login, or leak information), concentrated in three areas:

1. **Onboarding/auth edge cases** — an open redirect vulnerability, a redirect-loop trap for users who abandon onboarding partway, and a silent account-merging behavior that requires no user consent.
2. **Progress data integrity** — assessment completion writes to `StudentProgress` and `TopicProgress` are not wrapped in a single transaction, so a slow network or transient DB error can leave a chapter marked "complete" while mastery data says otherwise — a state the UI cannot explain to the user and support cannot easily diagnose.
3. **Schema-level orphaning** — `WeeklyXP` and `Referral` rows have no `onDelete: Cascade` to `User`, and `EvidenceRecord` has no uniqueness constraint, meaning account deletion and concurrent submissions can both produce data that silently diverges from what the UI shows.

None of these are large rewrites. Each has a narrow, well-defined fix (add a cascade, wrap two writes in `$transaction`, validate a redirect URL, align one boolean check across three pages). The risk is in volume and blast radius if beta users hit them concurrently, not in remediation complexity.

**Overall assessment:** the app is close to beta-ready but should not go to a real, uncontrolled user base until the CRITICAL items below are closed — particularly the onboarding redirect-loop (it can hard-block a new user with zero recovery path other than a manual DB fix) and the open redirect (a trivial phishing vector once the app has real users to target).

---

## 2. Launch Blockers (CRITICAL)

These can lose user data, corrupt progress, block onboarding, break login, or leak sensitive information. **Recommend fixing all of these before beta.**

| # | Issue | Location | Why it's a blocker |
|---|---|---|---|
| C1 | **Open redirect via `callbackUrl`** | `src/app/auth/login/page.tsx` (~line 79) | The login page reads `callbackUrl` from the query string and navigates to it after successful auth with no same-origin check. An attacker can send `/auth/login?callbackUrl=https://evil.example` to a real user, who logs in legitimately and is then bounced to an attacker-controlled page — classic phishing/credential-harvesting setup once the app has a real user base worth targeting. |
| C2 | **Onboarding redirect loop traps users** | `src/app/dashboard/page.tsx`, `src/app/learn/page.tsx`, `src/app/coach/page.tsx`, `src/app/api/onboarding/route.ts` | Different pages disagree on what "onboarding complete" means: `/dashboard` only checks `profile != null`; `/learn` and `/coach` check `profile.onboardingCompleted`. A user who creates a partial `Profile` row (e.g. by abandoning onboarding after board selection but before subject selection) can reach `/dashboard` fine but gets bounced from `/learn`→`/onboarding`, and the onboarding API silently no-ops if it thinks a profile already exists — so they can't re-submit and can't get into `/learn`. No recovery path without a manual DB fix. |
| C3 | **Silent account merging on ID/email mismatch** | `src/app/api/onboarding/route.ts` (~line 84) | If a session's `user.id` isn't found but its email matches an existing user row, the code silently resolves onboarding to the *existing* user's identity with no confirmation step. This is a real risk if any auth provider ever recycles or re-issues an account ID for an email address (e.g. OAuth account relinking) — a new sign-in could silently inherit someone else's profile, progress, and certificates. |
| C4 | **`StudentProgress` / `TopicProgress` can desync on assessment pass** | `src/app/api/school/assessment/submit/route.ts` (~lines 68–119) | When a student passes a chapter assessment, `StudentProgress.completedLessons` and the `TopicProgress` mastery rows are updated via two separate `Promise.all()` calls with no shared transaction. If the request is interrupted between the two (slow network, serverless cold-start timeout, transient DB blip), the chapter can show as "complete" in the roadmap while the underlying mastery nodes are not marked mastered — and the idempotency guard (`updateMany` setting `completedAt`) then blocks any retry, because the assessment already "succeeded." The student is stuck in a state the UI can't explain and there's no automatic repair. |
| C5 | **`PracticeSession` + `MistakeRecord` idempotency race** | `src/app/api/practice/submit/route.ts` (~line 69), Prisma schema lines ~393–431 | `PracticeSession` has a unique `idempotencyKey`, but the associated `MistakeRecord.createMany()` batch is not covered by the same guard/transaction. Two near-simultaneous submissions (double-click, flaky network triggering a client retry) can both pass the early idempotency check and both write mistake records, duplicating weak-topic data that drives the recommendation engine. |
| C6 | **`EvidenceRecord` has no uniqueness constraint** | `prisma/schema.prisma` (~lines 375–391) | Nothing prevents two concurrent requests from creating duplicate `EvidenceRecord` rows for the same `(userId, subjectSlug, topicSlug)`. Two browser tabs submitting practice on the same topic, or a retried request, will create two rows instead of one — and downstream mastery/certification logic that reads this table can get different answers depending on row order. |
| C7 | **`WeeklyXP` has no cascade delete from `User`** | `prisma/schema.prisma` (~line 859) | Deleting a user (via the delete-account flow) leaves `WeeklyXP` rows behind with a dangling `userId`. This is a data-integrity and privacy problem (right-to-be-forgotten is not actually honored for this table) and can pollute leaderboard aggregate queries with rows for accounts that no longer exist. |
| C8 | **`Referral.referrerId` has no cascade delete from `User`** | `prisma/schema.prisma` (~line 846) | Same class of bug as C7 — deleting a referrer leaves orphaned `Referral` rows. Referral analytics and any future reward payout logic built on this table will be working with rows that point at nothing. |
| C9 | **Unhandled DB errors leak raw messages to the client in onboarding** | `src/app/api/onboarding/route.ts` (~lines 190–198) | On an unexpected error (e.g. a Prisma constraint violation), the route returns `err.message` directly in the JSON response instead of a generic message. This can leak schema/field names and internal error text to the browser console/network tab — a minor but real information-disclosure issue, and the kind of thing that gets noticed during a security review of a beta that's about to go wider. |

---

## 3. High-Risk Issues

These don't meet the strict CRITICAL bar (data loss / corruption / full blockage) but will visibly break or frustrate real users and should be fixed early in beta, ideally before fixing MEDIUM/LOW items.

| Issue | Location | Impact |
|---|---|---|
| Signup → immediate sign-in race condition | `src/app/auth/signup/page.tsx` (~lines 43–59) | Client calls `signIn('credentials', …)` immediately after registration; under DB replication lag or connection pool contention this can fail with a confusing error even though the account was created successfully. New users hit this at the worst possible moment — their very first interaction. |
| No per-user brute-force rate limiting on login | `src/lib/auth/config.ts` (~lines 27–39 / Credentials provider) | Rate limiting exists on `/api/auth/register` and `/api/auth/forgot-password` but not on login itself — an attacker can attempt unlimited password guesses against a known email. |
| Delete-account partial-cascade risk | `src/app/api/user/delete-account/route.ts` (~lines 30–44) | The transaction soft-deletes the user, but if any cascade-delete on a child table fails partway (constraint violation, lock timeout), the transaction rolls back yet the user's email may already be tombstoned in a way that blocks clean re-registration while old data persists. |
| School chapter resolution dead-end | `src/app/learn/page.tsx` (~lines 67–93) | If `getSchoolChapters()` returns an empty array for a valid board+grade+subject combination, the page falls back to an unrelated stub subject instead of showing "no chapters available yet" — a confusing, silent wrong-content bug rather than a clear empty state. |
| AI Tutor errors are opaque to the user | `src/app/api/sessions/[sessionId]/messages/route.ts` (~line 69), `src/app/api/learn/chat/route.ts` (~lines 351, 562, 632) | AI provider failures (timeout, rate-limit) surface as a generic 500 with no distinction between "try again, it's transient" and "this request is broken." Several context-building calls inside `/api/learn/chat` have no timeout, so a slow internal query can stall the whole tutor response. |
| Assessment/mock-test time limits are client-side only | `src/app/api/school/assessment/generate/route.ts`, `.../mock/generate/route.ts` | No server-side deadline is stored or checked at submit time. A student can submit a "30-minute" assessment in 30 seconds; this undermines exam integrity and skews the adaptive difficulty/analytics that assume genuine time-on-task. |
| Practice submit race can partially write progress | `src/app/api/school/practice/submit/route.ts` (~lines 34, 64) | The completion check is a plain read-then-write rather than an atomic `updateMany`, unlike the assessment/mock routes. Two near-simultaneous submits can both pass the check and both write `TopicProgress`, or a network failure mid-`Promise.all` can leave mastery partially written while the session is already flagged complete. |
| Board/grade switch orphans prior progress silently | `src/app/api/user/profile/route.ts` (~lines 53–64), `src/lib/school/schoolProgress.ts` | Switching board or grade doesn't migrate, archive, or warn about progress tied to the old board/grade (`StudentProgress` rows are keyed by a `subjectCode` that encodes board+grade). The data isn't deleted, but it becomes invisible — switching back restores it (which is good), but there is zero UI indication that this is what's happening, so a student who switches grades expecting a fresh start instead silently keeps old progress, or a student who didn't mean to switch loses sight of completed work with no warning dialog. |
| `StudentProgress.completionPercent` race | `prisma/schema.prisma` (~lines 607–626) and call sites | Completion percentage is updated via read-then-write rather than an atomic increment/transaction in at least one path. Two concurrent updates (e.g. background sync + active lesson completion) can both read the same stale value and the later write "wins," silently dropping a completion event. |
| `LearningPath` missing cascade on `subject` relation | `prisma/schema.prisma` (~line 474) | Deleting/deprecating a `Subject` leaves `LearningPath` rows orphaned with no `onDelete` behavior defined. |
| `Certificate` (roadmap) weak concurrency guarantee | `src/lib/roadmaps/service.ts` (~lines 284–286) | The unique constraint on `(userId, roadmapId)` prevents true duplicates, but the read-then-create pattern around it has a narrow race window under concurrent completion-flow requests (e.g. two grading workers). Low probability, but a genuine race exists. |

---

## 4. Medium-Risk Issues

Real but lower-impact bugs — visible UX rough edges, analytics drift, or narrow edge cases. Worth fixing during beta, not necessarily before it starts.

- **Referral creation isn't atomic with signup** (`src/app/api/auth/register/route.ts` ~lines 64–69) — if the referrer lookup/`referral.create` fails after the user row commits, the referrer silently never gets credit, with no error surfaced anywhere.
- **Password strength is enforced client-side only** — the server accepts any 8+ character string (Zod `min(8)`); no complexity rules.
- **Login error messages are too generic** (`src/app/auth/login/page.tsx` ~line 22) — "wrong password" and "no such account" both map to the same UI message, which is good for not leaking account existence but bad for legitimate users trying to self-diagnose ("did I mistype my email or my password?").
- **Settings board/grade save errors are shown but not explained** (`src/app/settings/page.tsx` ~lines 217–234) — button just says "Failed — try again" with no reason, so a genuinely invalid board/grade combination looks identical to a transient network error.
- **`user.update` + `profile.upsert` aren't transactional** (`src/app/api/user/profile/route.ts` ~lines 53–77) — a failure between the two leaves the profile partially updated (e.g. name changed, board/grade not).
- **Password-reset token deletion isn't guaranteed atomic with the password update** (`src/app/api/auth/reset-password/route.ts` ~lines 41–44) — if the delete half of the transaction fails for any reason while the update half succeeds (or vice versa depending on transaction semantics), the token could remain valid for reuse.
- **Onboarding silently no-ops on re-submission** (`src/app/api/onboarding/route.ts` ~line 257) — if a profile already exists and is "complete," a board/grade change submitted through onboarding (vs. settings) is silently ignored; the client gets `{ success: true }` and redirects, masking the fact that nothing changed.
- **Dashboard `?mode=` toggle doesn't persist across navigation** (`src/app/dashboard/page.tsx`) — the library/school mode switch is a pure URL query param; navigating to `/learn` or any other page and back to `/dashboard` without the param reverts to the default mode. Other pages (`/learn`, `/school/*`) don't read or respect the same param, so a user could see "library mode" on the dashboard and school content elsewhere — internally inconsistent, though not data-destructive.
- **Subject unenroll/re-enroll race** (`src/app/api/subjects/unenroll/route.ts`, `.../enroll/route.ts`) — rapid unenroll-then-enroll (e.g. double-click, or a buggy client retry) has no transaction guarding the two writes, so the final `isActive` state is timing-dependent.
- **Leaderboard week boundary uses UTC, not IST** (`src/lib/xp.ts` ~lines 3–8) — `currentWeekString()` is computed from server UTC time with no IST conversion, despite the product clearly targeting Indian students/boards (CBSE/UP Board). Around the IST week rollover (Sunday 18:30 UTC / Monday 00:00 IST) there is a ~5.5-hour window where client-perceived "this week" and server-computed week string disagree, which can make a user's weekly XP/rank appear to reset or flap.
- **AI provider timeout detection is a brittle string match** (`src/lib/ai/client.ts` ~lines 31–39) — `error.message?.includes('timeout')`; any provider that returns a structured error instead of that substring bypasses the "friendly retry" messaging and surfaces a raw error.
- **Coaching-insight and achievement updates are silent fire-and-forget** (`src/app/api/practice/submit/route.ts` ~line 102, `src/app/api/school/mock/submit/route.ts` ~lines 89–94, `src/app/api/sessions/end/route.ts` ~lines 70–122) — `.catch(() => {})` patterns mean weak-topic detection and badge/achievement unlocks can silently fail with zero logging, making "why didn't I get my badge" nearly impossible to debug from logs alone.
- **No board/grade ownership check on practice chapter generation** (`src/app/api/school/practice/generate/route.ts` ~lines 43–45) — `chapterId` isn't validated against the requesting user's actual board/grade, allowing enumeration of chapter IDs across boards/grades (information disclosure of curriculum structure, not user data).
- **`/api/profile` silently deletes unlisted subject enrollments** (`src/app/api/profile/route.ts` ~line 46) — `deleteMany` + `createMany` pattern means if the client sends an incomplete subject list, subjects not included are silently unenrolled with no confirmation or audit trail.
- **`MistakeRecord` has no uniqueness constraint** — duplicate mistake rows are possible from retries, inflating "weak topic" signal strength without a corresponding real signal.
- **`CoachInsight` / `StudySession` use `onDelete: SetNull` on optional `subjectId`** — orphaned-but-not-deleted rows accumulate after subject deprecation with no cleanup job.
- **`ProfileSubject` missing `onDelete` on its `subject` relation** — deleting a `Subject` row orphans enrollment records instead of cleanly cascading or blocking.
- **`/api/auth/register` doesn't use `withRetry`** unlike most other write-heavy routes in the codebase — a transient DB hiccup during signup fails outright instead of retrying once, which is inconsistent with the reliability bar set elsewhere.

---

## 5. Low-Risk Issues

Worth a backlog ticket, not urgent.

- Forgot-password timing oracle (theoretically present, practically mitigated by the existing 5-requests/15-minutes rate limit and network jitter).
- Reset-password page renders a "create new password" form with disabled inputs rather than a clear "this link is invalid" state when the token is bad.
- Orphaned `PracticeSession` rows accumulate forever when a user abandons a session mid-way (no TTL/cleanup job) — affects DB size/query hygiene, not correctness.
- `SubjectCertificate` upsert doesn't regenerate `certificateCode` on a second pass of the same subject — correct/intentional, but undocumented, and would matter if assessment content is ever revised retroactively.
- Re-enrolling in a previously-removed subject silently resumes from prior progress with no UI affordance explaining that — by design, but worth a one-line tooltip so users don't think it's a bug.
- Leaderboard route hardcodes `take: 10` with no pagination — fine today, a future maintainer could regress it.
- `chapterId` is stored as a plain string (no FK) on `PracticeSession`/`LearningCheckpoint` — acceptable for now since chapters are rarely deleted, but means stale references are possible if curriculum content is ever pruned.
- `Referral.referredId` likewise has no FK enforcement — minor analytics drift after a referred user is deleted.

---

## 6. User Journey Findings (Section 1 walkthrough)

Mapped against the 18 requested journey steps:

1. **Signup** — works, but the immediate post-signup `signIn()` call can race against DB replication (High, see above). Password rules are weaker server-side than the UI implies (Medium).
2. **Onboarding** — the core flow works, but partial completion (abandon after board selection, before subjects) can trap a user in a redirect loop with no escape (**Critical, C2**). Re-submission after "complete" silently no-ops (Medium).
3. **Subject selection** — enroll/unenroll work; no board/grade ownership check on subsequent chapter access is a Medium info-disclosure risk, not a journey blocker.
4. **First lesson** — works for the common case; degrades to a misleading fallback subject if a board+grade+subject combination has zero chapters (High).
5. **AI Tutor interaction** — works under normal conditions; provider failures are opaque to the user and some internal context calls have no timeout, risking a hang rather than a fast, clear failure (High).
6. **Practice** — works; idempotency is real but incomplete (mistake records aren't covered by the same guard as the session record itself) (Critical, C5).
7. **Assessment** — works; time limits are cosmetic/client-only (High), and the completion write isn't transactional with mastery writes (Critical, C4).
8. **Progress tracking** — generally accurate, but can silently desync after the C4 scenario, and `completionPercent` has a narrow race window (High).
9. **Return next day** — no issues found specific to this step; streak logic appeared sound in the routes reviewed.
10. **Switch board** — works, but old progress becomes invisible with no warning (High).
11. **Switch class/grade** — same as above (High).
12. **Switch mode** (library/school toggle) — works only on the dashboard page itself; doesn't persist or propagate to other pages (Medium).
13. **Remove subject** — works; soft-delete via `isActive`, no data loss.
14. **Re-add subject** — works; silently resumes from prior progress rather than restarting, which is reasonable but undocumented to the user (Low).
15. **Generate certificate** — works; idempotent via unique constraints, narrow race window under concurrent completion (High, low probability).
16. **Leaderboard** — works most of the time; UTC vs IST week-boundary mismatch can cause rank/XP to appear to flap right at the weekly rollover, which for an India-focused product is a real (if narrow) reliability gap (Medium).
17. **Settings** — works; several silent-failure and non-transactional update patterns reduce trust if something does go wrong, but the happy path is fine (Medium).
18. **Delete account** — works for the common case; a partial cascade failure under DB contention could leave the account in a confusing half-deleted state (High).

**No dead ends or missing navigation were found in the core happy-path journey** (signup → onboarding → first lesson → practice → assessment → progress → leaderboard → settings). The structural risk is concentrated in *edge cases* — abandoned flows, concurrent requests, and failure-path handling — rather than the primary path itself.

---

## 7. Data Integrity Findings (Section 2 summary)

See Sections 2–4 above for full detail. Condensed by model:

| Model | Worst finding | Severity |
|---|---|---|
| StudentProgress | Non-transactional update alongside TopicProgress on assessment pass; non-atomic `completionPercent` writes | CRITICAL / HIGH |
| TopicProgress | Same transaction gap as above; correct pattern exists elsewhere in the code (`/api/practice/submit`'s `$transaction` use) but isn't applied universally | CRITICAL |
| MistakeRecord | No uniqueness constraint; not covered by `PracticeSession`'s idempotency key | CRITICAL / MEDIUM |
| EvidenceRecord | No `@@unique` at all — duplicate rows possible under concurrency | CRITICAL |
| WeeklyXP | No `onDelete: Cascade` from User — orphaned on account deletion | CRITICAL |
| Certificates (Subject + Roadmap) | Correctly unique-constrained; narrow race window only under concurrent completion-flow requests | HIGH (low probability) |
| Subject enrollment (ProfileSubject) | No `onDelete` on `subject` relation; race on rapid unenroll/enroll | MEDIUM |
| Board/grade switching | No data loss, but progress for the prior board/grade becomes silently unreachable in the UI | HIGH |

**General pattern observed:** the codebase *does* know how to do this correctly — `/api/curriculum/progress` uses raw atomic SQL specifically to prevent XP-farming races, and `/api/practice/submit` wraps mastery updates in `$transaction`. The gaps are inconsistency, not ignorance: the same rigor wasn't applied to every write path, particularly in `/api/school/assessment/submit` and at the schema level for `WeeklyXP`/`Referral`/`EvidenceRecord`.

---

## 8. API Findings (Section 3 summary)

- **Error handling**: mostly present, but two genuinely concerning gaps: raw error messages leaked to the client in `/api/onboarding` (Critical), and no explicit error classification for AI provider failures in the tutor chat path (High).
- **Silent failures**: a recurring pattern across the codebase (`.catch(() => {})` / `.catch(() => null)`) for genuinely auxiliary things (welcome emails, achievement checks, cache invalidation) — acceptable as graceful degradation **only if logged**; right now most of these don't log, making production debugging much harder than it needs to be.
- **Missing validation**: a few routes trust client-provided IDs (`chapterId`, `subjectSlug`) more than they should — not exploitable for data corruption given the ownership checks elsewhere, but allows curriculum-structure enumeration across boards/grades.
- **Auth/ownership checks**: generally solid — every reviewed route correctly scopes queries to `session.user.id`. No instance of one user being able to read/write another user's data was found.
- **Timeout/retry consistency**: `withRetry` is used in many places (notably `/api/school/progress`, `/api/learn/chat`'s AI call, `/api/curriculum/progress`) but not others (`/api/auth/register`, `/api/school/assessment/submit`'s progress writes, `/api/school/practice/submit`). This inconsistency means reliability under transient DB/network blips varies route-by-route rather than being a guaranteed platform property.

---

## 9. Recommended Fix Order

1. **C2 (onboarding redirect loop)** — highest priority. It can hard-block a brand-new user with no self-service recovery, which is the worst possible failure mode for a beta meant to attract first-time users.
2. **C1 (open redirect)** — trivial fix (validate `callbackUrl` is same-origin or drop it), real security exposure once real users exist to phish.
3. **C9 (error message leak in onboarding)** — trivial fix (generic error message to client, full detail to server logs only).
4. **C3 (silent account merging)** — needs a product decision (block vs. explicit re-auth confirmation), not just a code fix; flag for a decision before scaling beta invites.
5. **C4 (StudentProgress/TopicProgress transaction)** — wrap both writes in a single `$transaction`; this is the highest-value data-integrity fix given it's on the core "did the student actually learn this" path.
6. **C7/C8 (missing cascades on WeeklyXP/Referral)** — schema-only fix (`db push` after adding `onDelete: Cascade`), low risk, should ship with the next schema change regardless.
7. **C6/C5 (EvidenceRecord uniqueness, MistakeRecord/idempotency coverage)** — schema + one route change each.
8. **High-risk items**, roughly in this order: AI tutor error classification → assessment server-side time limits → board/grade switch UI warning → delete-account transaction hardening → school chapter empty-state handling.
9. **Medium/low items** — bundle into the next regular sprint; none individually block beta, but the silent-failure logging gap (no logs on swallowed errors) should be addressed early since it will otherwise make every other bug harder to diagnose during the beta itself.

---

## 10. Estimated Beta Readiness

**~60%.**

Reasoning: the happy-path journeys all work end-to-end with no dead ends, and the engineering team has already demonstrated it knows the correct patterns (atomic SQL for XP, `$transaction` for mastery updates, ownership-scoped queries everywhere) — this isn't a foundational architecture problem. But there are 9 CRITICAL-bar issues concentrated in exactly the two places that matter most for a beta's first impression and trust (onboarding completion and progress integrity), plus a real security issue (open redirect) and a real privacy/integrity issue (account-deletion cascades). None of these require a redesign or a new system — each is a scoped, mechanical fix — but shipping a beta to real users before C1–C4 are closed risks the kind of first-session failure (stuck in onboarding, phished via a crafted login link) that does outsized damage to early trust and word-of-mouth, which is the main thing a beta is trying to build. Closing the 9 CRITICAL items would reasonably move this estimate to ~85–90%.
