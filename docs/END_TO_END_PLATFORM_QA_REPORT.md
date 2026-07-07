# My Tutor — End-to-End Platform QA / Break-Test Report

**Methodology:** Read-only code-tracing audit (no live browser/device testing performed in
this environment — Phase 7 Mobile findings are CSS/JSX-based only and explicitly caveated).
This report consolidates fresh tracing with three prior audits already in this repo
(`docs/QA_EDGE_REPORT.md`, `docs/SYSTEM_AUDIT.md`, `docs/SCHOOL_MODE_ACCESS_INVESTIGATION.md`,
`docs/LESSON_EXPERIENCE_FORENSIC_AUDIT.md`) so findings aren't duplicated across documents —
each item below cites its source file/line. No fixes were applied. No UI/redesign/refactor work
was performed.

---

## SECTION 1 — Critical Launch Blockers

| # | Issue | Root cause | Files | Risk | Fix complexity |
|---|---|---|---|---|---|
| 1 | **Unlimited XP farming via lesson completion** | `awardXP(userId, 10)` fires outside the `isNewCompletion` guard | `src/app/api/curriculum/progress/route.ts:85` | Leaderboard/certificate integrity destroyed by repeat-call farming | Low — move the call inside the guard |
| 2 | **Certificate fabrication via client-supplied score** | `POST /api/final-assessment` stores client-sent `score`/`total` verbatim, never recomputed server-side | `src/app/api/final-assessment/route.ts` | Any user can self-issue a 100% certificate | Medium — recompute score from submitted answers server-side |
| 3 | **Banned users can re-authenticate via Google OAuth** | `isDeleted` is checked only in the Credentials provider; no `signIn` callback exists for the Google provider | `src/lib/auth/config.ts` | Account bans are completely ineffective for Google-linked accounts | Low — add a `signIn` callback checking `isDeleted` for all providers |
| 4 | **Zero automated tests** | No `test` script, no `*.test.ts`/`*.spec.ts`, no Jest/Vitest config anywhere in the repo | repo-wide (`package.json`) | Any future change (including this sprint's fixes) has no regression safety net across auth, XP, streaks, progress, AI routing | High — establish Vitest baseline for critical-path logic before further feature work |

These four were already documented (1–3 in `QA_EDGE_REPORT.md` CRIT-1/CRIT-2/HIGH-1, restated
here because they remain unfixed and are launch-blocking; 4 from `SYSTEM_AUDIT.md` T-1).

---

## SECTION 2 — High Priority Bugs

| # | Issue | Files | Risk |
|---|---|---|---|
| 5 | Email not lowercased at registration → duplicate accounts per mailbox; password reset silently fails for mis-cased registrations | `src/app/api/auth/register/route.ts:22`, `src/lib/auth/config.ts:31` | Account confusion, support burden |
| 6 | `X-Forwarded-For` fully client-spoofable → all IP-based rate limits (registration, password reset, edge limiter) are bypassable | `src/lib/rateLimitEdge.ts:85`, `src/lib/rateLimit.ts:59` | Registration spam, email bombing, brute force |
| 7 | TOCTOU on `completedAt` guard in school assessment/mock submit → concurrent duplicate requests both pass the null-check and both apply XP/mistake-record side effects | `src/app/api/school/assessment/submit/route.ts`, `src/app/api/school/mock/submit/route.ts` | Double XP, corrupted mastery data — directly relevant to journeys 19/20 (Assessment, Mock Test) |
| 8 | `/api/practice/submit` has no replay/dedup protection — repeated POSTs with the same `sessionId` keep recalculating `masteryPct` upward | `src/app/api/practice/submit/route.ts` | Mastery data meaningless; XP farming (journey 18) |
| 9 | Mock test time limit enforced via **client-supplied** `startedAt` | `src/app/api/school/mock/submit/route.ts` | Time-limited tests are not actually time-limited |
| 10 | Streak engine compares against UTC midnight, not local/IST midnight | `src/lib/school/achievements/streakEngine.ts` | Streaks (journey 22) break systematically for the IST user base studying 00:00–05:29 IST |
| 11 | `/api/coach` and `/api/quiz/generate` accept unbounded message/topic strings, forwarded directly into AI prompts | `src/app/api/coach/route.ts:10`, `src/app/api/quiz/generate/route.ts:7` | AI budget exhaustion, prompt injection, possible OOM |
| 12 | Admin gating is inconsistent across CLAUDE.md vs. actual code: admin is gated by **DB `role` field**, with `ADMIN_EMAILS` only a one-time bootstrap — but `ADMIN_EMAILS` is unset in `.env`, meaning **no admin can currently be created through the app at all** without a manual DB write | `src/lib/auth/admin.ts:28`, `.env` | Phase 6 Admin Audit: admin console is effectively locked out in the current environment |
| 13 | One admin-adjacent route (`/api/analytics/learning-effectiveness/admin`) checks `ADMIN_EMAILS` directly instead of the DB-role `isAdmin()` used everywhere else | `src/app/api/analytics/learning-effectiveness/admin/route.ts` | Inconsistent admin access — a DB-promoted admin can be locked out of this one route, or vice versa |

(5–11 restated from `QA_EDGE_REPORT.md` HIGH-2/3/8/6/9/7/4/5; 12–13 confirmed via
`SYSTEM_AUDIT.md` A-3/D-4 and `docs/SCHOOL_MODE_ACCESS_INVESTIGATION.md`, cross-checked against
`src/lib/auth/admin.ts` directly in this pass — admin is **DB-role-gated, not env-var-gated**,
contradicting CLAUDE.md, which should be corrected.)

### Tutor Max / TTS (Phase 4)
14. The Sprint-A TTS generation-counter fix in `src/lib/tts.ts` is generic and correctly closes
    the race for *any* caller, but it only protects callers that actually invoke `stopSpeaking()`
    on unmount. Confirmed: `LessonScreen.tsx` does this. Not independently re-verified in this
    pass for every other speech call site (e.g. a coach/chat voice button) — **flagged as
    unverified, not confirmed-safe**; recommend a repo-wide grep audit of `speakText(` call
    sites against their owning component's cleanup effect before declaring Phase 4 closed.

### School Mode (Phase 5)
15. The Sprint-A mode-leak guard (`isLibraryModeRequest`) closes the one reported path
    (`/school/*?mode=library`). However, per `docs/SCHOOL_MODE_ACCESS_INVESTIGATION.md`, School
    Mode access itself is gated solely by `Profile.userType/educationBoard/grade`, with **no
    shared layout** — each of the 7 `/school/*` pages repeats the same guard independently. This
    is a maintenance risk: an 8th school route added later will silently lack both the
    board/grade guard and the library-mode guard unless a developer remembers to copy both
    checks. Recommend converting to a shared layout-level check now that Next.js route groups
    can pass through a parallel data-fetch, or at minimum a lint rule / checklist item.

---

## SECTION 3 — Medium Priority Bugs

| # | Issue | Files |
|---|---|---|
| 16 | `GET/PATCH /api/user/profile` leaks `role`, `telegramChatId`, `isDeleted`, `referredBy`, `freeSessionsExtra` to the user's own client via `omit` instead of an allowlist | `src/app/api/user/profile/route.ts:11,73` |
| 17 | `revisionCount` and mastery-downgrade guards use read-modify-write instead of atomic Prisma `increment` — concurrent submissions can under-count | `src/app/api/topic-progress/route.ts`, `src/app/api/practice/submit/route.ts` |
| 18 | `curriculum/progress`: client-supplied `totalLessons` gates `isCompleted` — a client can claim completion after 1 of N lessons | `src/app/api/curriculum/progress/route.ts` |
| 19 | `/api/flashcards` PATCH awards +2 XP per call with no guard or rate limit | `src/app/api/flashcards/route.ts` |
| 20 | Password reset tokens stored plaintext in DB; 1-hour window is fully usable on DB compromise | `src/app/api/auth/forgot-password/route.ts:43` |
| 21 | `isDeleted` not re-checked per-request in the JWT callback — a ban takes up to 30 days to actually apply to an existing session | `src/lib/auth/config.ts:54` |
| 22 | `account/delete-account` is soft-delete only — no GDPR hard-erasure path; combined with #21, a "deleted" account's session and most data persist | `src/app/api/user/delete-account/route.ts` |
| 23 | No `prisma/migrations/` — schema changes go through `db push` only; a column rename/drop in production silently loses data with no rollback path (84 models, active user data) | `prisma/schema.prisma` |
| 24 | `routeJSON()`/`routeAI()` silently return `null`/a static fallback string on AI failure with no `captureError`, so persistent AI outages are invisible to monitoring | `src/lib/ai/router.ts` |
| 25 | `SCHOOL_MODE_ENABLED` is a hardcoded `false` constant, but the admin settings UI presents it as a live-configurable runtime flag — toggling it does nothing | `src/lib/education/index.ts:4`, `src/app/admin/settings/page.tsx:17` |

(16–25 restated from `QA_EDGE_REPORT.md` MED-1/6/7/5/11/8/`SYSTEM_AUDIT.md` DS-1/2/AI-4/F-1.)

---

## SECTION 4 — Minor Issues

- Whitespace-only display names pass registration validation (`min(2)` counts bytes, not
  non-whitespace) — `src/app/api/auth/register/route.ts:9`.
- `user.id` returned in the 201 registration response body (internal ID leak, low severity).
- Edge in-memory rate limiter resets on serverless cold starts (`src/lib/rateLimitEdge.ts:21`) —
  best-effort only; the Redis-backed limiter on sensitive routes is unaffected.
- School re-onboarding silently overwrites `educationBoard`/`grade` with no confirmation step —
  relevant to journeys 12/13 (Board/Grade switching): a user who re-runs onboarding loses their
  old board/grade selection with no warning, though `StudentProgress` rows for the old
  board/grade are not deleted (just become unreachable from the dashboard unless they switch
  back) — `src/app/api/onboarding/route.ts`.
- `bcrypt` silently truncates passwords at 72 bytes; no max-length validation on registration or
  reset, so two different 200-char passwords sharing the first 72 bytes are equivalent.
- 6 stray `console.log`/`console.warn` calls in production handlers (`delete-account`, `tts`,
  `onboarding`, `ai/router.ts`) — noise, no functional impact.
- `_legacy` dashboard directory (`src/app/dashboard/_legacy/`) is dead, unreachable code that
  only exists to generate `tsc` errors.
- Mobile (Phase 7, **code-based audit only — not live-device-tested**): the Sprint-A
  `SubjectsGrid.tsx` "✕" remove button is absolutely positioned `top: 8, right: 8` on a
  fixed-size card — at very narrow viewports where card width shrinks below its content's
  natural width, this could visually overlap the subject icon/name; not confirmed without a
  live narrow-viewport render. No other systematic overflow/clipping pattern was found in a
  source read of `LessonScreen.tsx`'s 3-panel layout (it already collapses to a mobile tab bar
  per `docs/LESSON_EXPERIENCE_FORENSIC_AUDIT.md`), Dashboard, or Settings — but this entire
  section should be re-verified with actual device/responsive-mode testing before beta, since
  static JSX reading cannot catch all real rendering issues.

---

## SECTION 5 — False Positives (confirmed working correctly)

- **Syllabus/board selector "disappearing"** (original audit Issue 1) — confirmed working as
  designed; not a defect.
- **School Mode "mixed old/new UI theme"** (original audit Issue 5) — confirmed 100% candy-native
  across all 11 School Mode screens in the original forensic audit; not a defect.
- **SQL injection** — Prisma parameterized queries throughout; no raw queries on user input.
- **JWT tampering/expiry** — NextAuth v5 JWE correctly rejects tampered tokens; 30-day default
  expiry is the intended behavior.
- **Password reset token entropy/expiry/single-use** — 256-bit random token, 1-hour server-side
  expiry, deleted in a transaction after use — all correct.
- **Admin server actions defense-in-depth** — `requireAdmin()` is called both in the admin layout
  and independently in every server action (`promoteUser`/`demoteUser`/`disableUser`/`enableUser`)
  — correctly layered, no bypass found.
- **Subject re-enrollment preserves progress** — confirmed in Sprint A: `upsert(...isActive:true)`
  reactivates the same `ProfileSubject` row; `currentLevelIndex`, `targetLevelIndex`, and all
  `StudentProgress`/`LearningPath` rows are untouched by removal or re-enrollment.
- **Leaderboard soft-delete filtering and tie ranking** — confirmed fixed and consistent between
  the leaderboard route and the dashboard League card (Sprint A).
- **TTS unmount cleanup in LessonScreen** — confirmed correctly wired to the generation-counter
  fix (Sprint A); see Section 2 #14 for the one open caveat (other call sites unverified).
- **Rate limiting is correctly two-layered** (edge in-memory + Redis-backed per-route) in
  architecture, even though the edge layer's IP detection is spoofable (#6) — the *design* is
  sound, the *IP source* is the actual bug.

---

## SECTION 6 — Recommended Fix Order

1. **Fix XP-farming guard placement** (Section 1 #1) — one-line move, closes the most severe
   exploitable bug. Trivial effort, critical impact.
2. **Recompute final-assessment scores server-side** (#2) — closes certificate fraud. Medium
   effort.
3. **Add `signIn` callback `isDeleted` check for Google OAuth** (#3) — closes the ban-bypass.
   Low effort.
4. **Fix TOCTOU on assessment/mock submit + practice replay dedup** (#7, #8, #9) — these three
   share one root pattern (no idempotency key / no atomic completedAt claim) and should be
   fixed together with a single `UPDATE ... WHERE completedAt IS NULL` atomic claim pattern.
   Medium effort, high integrity payoff.
5. **Fix streak UTC/local-day boundary** (#10) — affects the primary IST user base daily.
   Low-medium effort (needs a timezone-aware day boundary, likely IST-fixed or profile-based).
6. **Set `ADMIN_EMAILS` in the deployed environment** and correct CLAUDE.md's admin-gating
   description (#12) — currently no one can reach `/admin` at all without a manual DB write.
   Trivial effort, unblocks all of Section 1 #4's "establish tests" work needing admin access
   for some flows.
7. **Add Vitest baseline for critical-path logic** (#4) — XP, streaks, leaderboard ranking, TTS
   generation counter, subject enrollment/unenrollment — the four areas already touched by
   Sprint A are the highest-value first targets since they're freshly understood.
8. Remaining High items (#5, #6, #11, #13) and all Medium items (#16–25) — batch into a
   follow-up sprint; none are launch-blocking in isolation, but #6 (spoofable rate limiting)
   should not ship to production untouched given it nullifies every other rate limit.
9. Minor items (Section 4) — opportunistic cleanup, not blocking.
10. **Live Phase 7 (Mobile) re-verification** — this report's mobile findings are static-code-only;
    a real responsive-mode/device pass is required before the "ready for beta" determination can
    be made with confidence on the mobile experience specifically.

---

## Bottom line

**My Tutor is not yet ready for beta in its current state.** Two Critical, unfixed,
trivially-reproducible exploits exist (unlimited XP farming, fabricated certificates), admin
access is currently unreachable in the deployed environment, and there is no automated test
suite to catch regressions as fixes land. None of these require redesign or new features — all
are scoped, file-localized fixes consistent with the same "confirmed bug, minimal fix" pattern
used successfully in Sprint A. Recommended path: execute Section 6 items 1–6 (all Low/Medium
effort) as a focused Sprint B, then re-assess beta readiness.

---

## Running Instructions

```bash
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), GROQ_API_KEY, ADMIN_EMAILS
npm install
npx prisma generate    # required before tsc — generated client is stale otherwise
npx prisma db push
npm run dev             # http://localhost:3000
npm run build            # prisma generate && next build
npx tsc --noEmit         # pre-existing stripe/subscription + _legacy dashboard errors expected
```

**STOP AFTER REPORT — no fixes applied in this pass, per instruction.**
