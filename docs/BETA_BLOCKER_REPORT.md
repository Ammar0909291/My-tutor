# My Tutor — Beta Blocker Report (Sprint C)

**Branch:** `claude/my-tutor-foundation-KDSUO`
**Scope:** Issues confirmed via live, running-app regression testing during Beta Stabilization Sprint C, plus still-open findings carried forward (without re-derivation) from `docs/BETA_READINESS_AUDIT.md`. Issues already resolved by School Sprints A–G, Platform Cleanup Sprint, Auth Sprint A, Admin Sprint A, Student Experience Completion Sprint, Learning Tools Modernization Sprint, Multi-Board/Multi-Grade Access Fix, Tutor Max Avatar Consistency Fix, and Platform Stabilization Sprint A are **not** repeated here.

---

## 0. Fixed in this sprint

| # | Issue | Root cause | Fix | Live verification |
|---|---|---|---|---|
| F1 | **"Failed to load questions. Please try again." on practice/assessment/mock generation** (Task 1 — highest priority) | `vercel.json`'s `functions` map gave `maxDuration` overrides to most AI-generation routes but not to `school/practice/generate`, `school/assessment/generate`, `school/mock/generate`, `school/revision`, `final-assessment/generate`, `curriculum/progress`, or `learn/run`. The Groq client (`timeout: 20000ms`, `maxRetries: 2`) can take up to ~40–60s worst case; on the platform default timeout the function is killed mid-flight, returning a non-JSON response that breaks the client's `r.json()` parse, surfacing as the generic "Failed to load" message regardless of what actually went wrong. | Added explicit `maxDuration` overrides (30–60s) for every AI-generation route lacking one. Wrapped `school/practice/generate`, `school/assessment/generate`, and `school/mock/generate` in try/catch with `captureError` + a specific user-facing error message, matching the existing pattern in `api/coach/route.ts`, so a real failure now degrades to a clear 500 + JSON body instead of a raw timeout. | Re-verified live for CBSE (grade 9 Mathematics, "Real Numbers") and UP Board (grade 10 Mathematics, "Real Numbers"/"Polynomials"): practice, assessment, mock test (Quick/Standard/Full), and revision-notes (Quick/Exam/Formula Sheet) generation all load with zero "Failed to load" errors and zero 4xx/5xx API responses. |
| F2 | **React hydration warning: `<button>` cannot be a descendant of `<button>`** in onboarding voice picker | `OnboardingWizard.tsx`'s voice-preview "▶ Play" control was a `<button>` nested inside the voice-option `<button>`, which is invalid HTML — the browser's parser restructures the DOM unpredictably, risking inconsistent click targets. | Converted the inner control to `<span role="button" tabIndex={0}>` with a matching `onKeyDown` handler (Enter/Space) to preserve keyboard accessibility. | Re-tested onboarding through the voice-picker step with a fresh account; hydration warning no longer appears in console output. |
| F3 | **Dead API endpoint: `GET /api/topic-progress/summary` → 404** called from `LessonScreen.tsx` on every `/learn` page load | The route `src/app/api/topic-progress/summary/route.ts` never existed; only the base `/api/topic-progress` route did, and it didn't return the `lockReasons` data the curriculum tree needs to explain why a topic is locked. | Extended the existing `/api/topic-progress` GET handler to compute and return `lockReasons` (using `getAllNodes` from the knowledge graph lib) and pointed `LessonScreen.tsx`'s fetch at the correct, now-extended endpoint. | Re-visited `/learn` for the same fresh account; no more 404s in the network log, and the curriculum tree correctly shows missing-prerequisite reasons for locked topics. |

---

## 1. Remaining — CRITICAL

Carried forward from `docs/BETA_READINESS_AUDIT.md` (static-analysis findings, not yet fixed). Not re-investigated this sprint per the "don't re-audit completed ground" instruction, but still open and still meet the CRITICAL bar (data loss, corruption, full blockage, or security exposure):

- **Open redirect via `callbackUrl`** on `/auth/login` — no same-origin validation before navigating post-login.
- **Onboarding redirect-loop trap** — `/dashboard`, `/learn`, `/coach` disagree on what "onboarding complete" means, and a partially-completed `Profile` can lock a user out of `/learn`/`/coach` with the onboarding API silently no-op'ing on resubmission.
- **Silent account merging on ID/email mismatch** in `/api/onboarding` — an email match against an existing user silently inherits that identity with no confirmation step.
- **`StudentProgress`/`TopicProgress` desync on assessment pass** — the two writes in `school/assessment/submit` aren't in a shared transaction; a mid-request failure can leave a chapter "complete" while mastery data disagrees, with no automatic repair.
- **`PracticeSession` + `MistakeRecord` idempotency gap** — the idempotency key covers the session row but not the associated `MistakeRecord.createMany()` batch, so a double-submit can duplicate weak-topic signal data.
- **`EvidenceRecord` has no uniqueness constraint** — concurrent submissions can create duplicate rows for the same `(userId, subjectSlug, topicSlug)`.
- **`WeeklyXP` / `Referral.referrerId` missing `onDelete: Cascade` from `User`** — account deletion leaves orphaned rows, a data-integrity and right-to-be-forgotten gap.
- **Unhandled DB errors leak raw `err.message` to the client** in `/api/onboarding`.

None of these were touched in Sprint C — they require either a product decision (account-merge confirmation UX) or schema-level changes (`db push` with new constraints/cascades) that are out of scope for "fix confirmed issues only" against this sprint's five tasks. They remain the correct next sprint's starting point.

---

## 2. Remaining — HIGH

Carried forward, still open:

- Signup → immediate sign-in race (`/auth/signup`) can surface a confusing error on the user's very first interaction under DB replication lag.
- No per-user brute-force rate limiting on login (only register/forgot-password are limited).
- Delete-account partial-cascade risk under lock/constraint contention.
- School chapter resolution silently falls back to an unrelated stub subject instead of an empty state when a board+grade+subject combination has zero chapters.
- AI Tutor errors are opaque (no transient-vs-broken distinction); some internal context-building calls in `/api/learn/chat` have no timeout.
- Assessment/mock-test time limits are client-side only — no server-side deadline enforcement.
- Practice-submit completion check is read-then-write rather than atomic, unlike assessment/mock routes.
- Board/grade switch silently makes prior-board/grade progress invisible with no warning dialog.
- `StudentProgress.completionPercent` race (read-then-write, not atomic).

## 3. Remaining — MEDIUM / LOW

Unchanged from the prior audit — see `docs/BETA_READINESS_AUDIT.md` Sections 4–5 for the full, itemized list (referral-creation atomicity, password complexity rules, generic settings-save errors, non-transactional profile updates, dashboard mode-toggle persistence, leaderboard UTC/IST week-boundary edge, silent fire-and-forget achievement/coaching-insight writes, missing FK/cascade definitions on several secondary tables, etc.). No new Medium/Low findings surfaced during this sprint's live testing beyond F1–F3 above (which are now fixed).

---

## 4. Live regression testing performed this sprint (Task 2)

**General Learner path** — signup-equivalent (seeded), onboarding (incl. voice picker), `/dashboard` (library mode), `/learn` (lesson + curriculum tree + lock reasons), `/quiz`, `/flashcards`, `/leaderboard`, `/certificates`, `/progress`, `/settings`: all reachable, no fatal errors, no dead ends. `/api/learn/chat` returns a graceful JSON 500 in this sandbox because outbound access to `api.groq.com` is blocked here (sandbox network policy, not an app bug — already documented as a known AI-tutor-error-handling risk in the carried-forward HIGH list above).

**School Mode path** — onboarding → board selection (CBSE and UP Board) → grade selection (9 and 10) → school dashboard → subject page → chapter page → Practice ✅ → Assessment ✅ → Mock Test (Quick/Standard/Full) ✅ → Revision Notes modal (Quick/Exam/Formula Sheet) ✅ → Focus Mode (`/school/focus`) ✅. All confirmed working with zero "Failed to load" errors and zero unexpected 4xx/5xx API responses, across both boards and both grades tested.

## 5. Access & Redirect Validation (Task 3)

No redirect loops, dead pages, broken navigation, inaccessible pages, or orphan routes were found in any route exercised above (login, onboarding, dashboard, both modes, school subject/chapter/practice/assessment/mock/revision/focus, library, certificates, leaderboard, settings) — beyond the already-documented, not-yet-fixed onboarding redirect-loop edge case in Section 1 above (which only manifests on a specific *abandoned mid-onboarding* state, not on any of the navigation paths walked this sprint).

## 6. Data Integrity Validation (Task 4)

No new data-corruption or data-loss bugs were found via live testing this sprint. The previously documented non-transactional write patterns (Section 1/2 above) were not re-derived or re-verified live this sprint — they remain open, unfixed findings from the prior static audit and are carried forward rather than duplicated.

---

## 7. Build validation

```
npx prisma generate   → OK, Prisma Client v6.19.3 generated
npx tsc --noEmit       → OK, zero errors
npm run build          → OK, production build succeeded (all routes compiled, no failures)
```

## 8. Stop rule

Per the sprint instructions, no Sprint D work, redesign, modernization, or new features were started. Only the confirmed Task 1 root cause and the two regressions found during live Task 2 testing were fixed.
