# My Tutor — Critical Blocker Sprint D Report

**Branch:** `claude/my-tutor-foundation-KDSUO`
**Scope:** The 8 remaining CRITICAL findings carried forward (unfixed) from `docs/BETA_BLOCKER_REPORT.md` Section 1. HIGH/MEDIUM/LOW items were explicitly out of scope and were not touched. No UI/navigation redesign, no Hindi/Sanskrit subject architecture changes, no schema redesign — only the minimal change required to close each CRITICAL gap.

---

## Task 2 — Open redirect via `callbackUrl`

**Root cause:** `src/app/auth/login/page.tsx` read `callbackUrl` straight from the query string and did `window.location.href = callbackUrl` with no validation. An attacker could craft `/auth/login?callbackUrl=https://evil.example` or `//evil.example` (protocol-relative) and, after a victim logs in, get redirected off-site — a classic post-auth phishing vector.

**Reproduction:** Visit `/auth/login?callbackUrl=https://evil.example`, log in with valid credentials → browser navigates to `https://evil.example` after a successful sign-in.

**Files changed:**
- `src/app/auth/login/page.tsx`

**Fix:** Added a `safeCallbackUrl()` helper that rejects anything not starting with a single `/` (blocks absolute URLs and `//host` protocol-relative URLs), then resolves the candidate via `new URL(raw, window.location.origin)` and only accepts it if the resolved `.origin` still matches the app's own origin. Falls back to `/dashboard` for anything else.

```ts
function safeCallbackUrl(raw: string | null): string {
  if (!raw) return '/dashboard'
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  try {
    const resolved = new URL(raw, window.location.origin)
    return resolved.origin === window.location.origin ? `${resolved.pathname}${resolved.search}${resolved.hash}` : '/dashboard'
  } catch {
    return '/dashboard'
  }
}
```

**Verification:** Confirmed `/auth/login?callbackUrl=https://evil.example` and `/auth/login?callbackUrl=//evil.example` both resolve to `/dashboard` post-login. Confirmed legitimate same-origin deep links (e.g. `/auth/login?callbackUrl=/school/mathematics`) still redirect correctly. Signup flow, Google OAuth (`signIn('google', { callbackUrl: '/dashboard' })`, already hardcoded/safe), and plain login with no `callbackUrl` all unaffected — full codebase grep for `callbackUrl` confirmed this was the only unvalidated read+navigate site.

**Remaining risk:** None identified for this vector.

---

## Task 1 — Onboarding redirect-loop trap

**Root cause:** `/dashboard`, `/learn`, `/coach`, and `/quiz` each independently decided what "onboarding complete" means. `/dashboard` checks `Profile` existence only (lenient). `/learn` already had an auto-heal: if `Profile` exists but `User.onboardingCompleted` is stale `false` (e.g. from an interrupted resubmission, or a partially-written multi-step onboarding POST), it self-corrects the flag instead of bouncing the user. `/coach` and `/quiz` had no such healing — they redirected straight to `/onboarding` purely off the flag, with no check of whether a `Profile` already existed. Since `/api/onboarding`'s pre-fix resubmission path used separate, non-transactional writes (Task 4 below), an interrupted request could leave `Profile` valid while `onboardingCompleted` was never flipped — at which point `/learn`/`dashboard` would treat the user as done, but `/coach`/`/quiz` would loop them back into `/onboarding`, which itself redirects straight back to `/dashboard` once it sees `onboardingCompleted` is (now healed) `true` elsewhere — net effect: inconsistent gating, not a literal infinite ping-pong, but a real "stuck on one page, fine on another" trap for the same user.

**Reproduction:** Forced a DB state where `Profile` exists for a user but `User.onboardingCompleted = false` (simulating an interrupted onboarding write under the old non-transactional code). Visiting `/learn` self-healed and proceeded; visiting `/coach` or `/quiz` first redirected to `/onboarding`, which — once `/learn` had already healed the flag in the same session — bounced straight back to `/dashboard`, producing a confusing oscillation between `/onboarding` and `/dashboard` depending on which page was hit first.

**Files changed:**
- `src/app/coach/page.tsx`
- `src/app/quiz/page.tsx`
- `src/app/api/onboarding/route.ts` (transactional resubmission — see Task 4; removes the root cause that produces the stale-flag state in the first place)

**Fix:** Extended `/coach` and `/quiz` with the same auto-heal block already used by `/learn`, so all three pages agree on the semantics: a `Profile` existing is authoritative, and the flag is corrected on read if it disagrees.

```tsx
if (!user?.onboardingCompleted) {
  if (user?.profile) {
    await withRetry(() => prisma.user.update({ where: { id: session.user.id }, data: { onboardingCompleted: true } }))
  } else {
    redirect('/onboarding')
  }
}
```

**Verification:** Re-ran with the forced stale-flag DB state — `/coach` and `/quiz` now self-heal and render normally instead of redirecting. Verified end-to-end: fresh signup → full onboarding wizard (General Learner, school student) → `/dashboard`, `/learn`, `/coach`, `/quiz` all reachable with no redirect. Returning user (already onboarded) hits no onboarding page at all. Partially-completed onboarding (mid-wizard abandon, no `Profile` row yet) still correctly redirects to `/onboarding` everywhere — auto-heal only fires when a `Profile` already exists, so it can't paper over a genuinely incomplete signup.

**Remaining risk:** Auto-heal silently corrects the flag rather than surfacing the inconsistency; acceptable since the underlying write path that caused the desync is now transactional (Task 4) and should not produce new instances of this state going forward.

---

## Task 3 — Silent account merging on ID/email mismatch

**Root cause:** `/api/onboarding`'s `user.upsert` (JWT-session userId vs. DB row) caught failures using `upsertErr instanceof Error && upsertErr.message.includes('Unique constraint')` and, on any match, silently resolved to "the existing user with this email" and continued writing onboarding data to that *different* user id — with no confirmation step. The substring check was broad enough to also match unrelated unique-constraint violations (e.g. `referralCode`), which would incorrectly trigger the "merge to existing email owner" branch for a failure that had nothing to do with email collision, silently misattributing onboarding writes to the wrong account.

**Reproduction:** Traced both call sites (general-learner path and `handleSchoolStudent`) — both used the identical broad message-substring check, so any P2002 error on the `user.upsert`, regardless of which column actually conflicted, would route through the same "look up by email and continue as that user" logic.

**Files changed:**
- `src/app/api/onboarding/route.ts`

**Fix:** Replaced the generic message-substring checks (one per code path) with a single `isEmailUniqueConflict()` helper that requires the specific Prisma `P2002` code *and* confirms `meta.target` actually names the `email` column before treating it as an email collision. Any other unique-constraint failure now rethrows instead of silently merging into an unrelated account.

```ts
function isEmailUniqueConflict(err: unknown): boolean {
  const e = err as { code?: string; meta?: { target?: string[] | string } } | null
  if (!e || e.code !== 'P2002') return false
  const target = e.meta?.target
  return Array.isArray(target) ? target.includes('email') : target === 'email'
}
```

This does not change the underlying resolve-to-existing-user-by-email behavior itself (that remains a deliberate JWT-session/DB-row reconciliation, not a new merge feature) — it only prevents *unrelated* constraint failures from being misclassified and silently routed through that resolution path.

**Verification:** Confirmed both call sites (general-learner and school-student paths) now use the shared helper. Verified the genuine email-collision case still resolves correctly (re-onboarding with a session whose JWT `userId` doesn't match the DB row matched by email). Verified a forced non-email unique violation (e.g. duplicate `referralCode`) now propagates as a real error instead of being silently absorbed into the email-merge branch.

**Remaining risk:** A real email collision still auto-resolves to the existing account without an explicit user confirmation step — flagged in the original audit as needing a product decision on UX; the safest available code-level fix (precise error-type matching, no behavior change to the merge itself) was applied per the "no schema redesign" / minimal-fix instruction. A confirmation-step UX change is out of scope for this sprint.

---

## Task 4 — Progress transaction integrity

### 4a. `StudentProgress`/`TopicProgress` desync on assessment pass

**Root cause:** `src/app/api/school/assessment/submit/route.ts` wrote `StudentProgress` (chapter completion) and then looped over `TopicProgress` upserts via `Promise.all`, as two separate non-transactional operation groups after the atomic `completedAt` claim. An interruption between them (timeout, transient DB error) could leave a chapter marked complete in `StudentProgress` while `TopicProgress` mastery data for that chapter's KG nodes never updated, or vice versa — with the claim already blocking any retry of the request.

**Files changed:** `src/app/api/school/assessment/submit/route.ts`

**Fix:** Wrapped both write groups in a single `withRetry(() => prisma.$transaction(async (tx) => {...}))`, converting the `TopicProgress` `Promise.all` loop to a sequential `for` loop against the same `tx` client (interactive transactions require sequential, not concurrent, operations on one connection).

### 4b. `PracticeSession` + `MistakeRecord` idempotency gap

**Root cause:** `src/app/api/practice/submit/route.ts` created the `PracticeSession` row (guarded by the `idempotencyKey` unique constraint) and then ran `mistakeRecord.createMany()` as a separate statement. The idempotency key only protected the session row; an interrupted request between the two writes could leave a "submitted" session with no `MistakeRecord`s, and — because the create had already succeeded — a retry with the same idempotency key would permanently fail with "Already submitted" instead of being able to complete the missing write.

**Files changed:** `src/app/api/practice/submit/route.ts`

**Fix:** Wrapped `practiceSession.create()` and `mistakeRecord.createMany()` together in `withRetry(() => prisma.$transaction(async (tx) => {...}))`, returning the created session from inside the transaction. The transaction rolling back together with the create means a retry with the same `idempotencyKey` after an interruption can still succeed, since nothing was left half-committed. The existing `P2002`-catch-and-409 logic is preserved around the whole transaction call.

**Verification (4a + 4b):** `npx tsc --noEmit` clean, `npm run build` clean (both routes compile and appear in the route manifest as dynamic functions). Re-verified live: school chapter assessment pass updates both `StudentProgress.completedLessons` and `TopicProgress.status/masteryPct` together for CBSE/UP Board grade 9–10 Mathematics; practice submission with a fixed `idempotencyKey` correctly returns 409 on retry with no duplicate `MistakeRecord` rows, and correctly records `MistakeRecord`s for every wrong answer on first submission.

**Remaining risk:** None identified — both write groups are now atomic with their respective claim/dedup guard.

---

## Task 5 — Weekly XP / referral data integrity

### 5a. `WeeklyXP` / `Referral.referrerId` missing `onDelete: Cascade`

**Root cause:** `prisma/schema.prisma`'s `WeeklyXP.user` and `Referral.referrer` relations had no `onDelete` behavior specified (Prisma default is `Restrict`-like at the DB level depending on provider, effectively leaving orphaned-row risk / FK violation risk on user deletion). Verified there is currently no live hard-delete code path (`/api/user/delete-account` only soft-deletes via `isDeleted: true` + email tombstone + session clear; grepped all of `src/` for `user.delete(`/`.user.deleteMany` — zero matches) — so this is a latent integrity gap rather than an actively-triggered bug today, but it's a real CRITICAL exposure for any future hard-delete path (e.g. GDPR/right-to-be-forgotten tooling) or direct DB administration.

**Files changed:** `prisma/schema.prisma`

**Fix:** Added `onDelete: Cascade` to both relations:

```prisma
referrer User @relation("referrer", fields: [referrerId], references: [id], onDelete: Cascade)
...
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
```

Ran `npx prisma db push` to sync the change to the local database — succeeded, Prisma Client regenerated.

### 5b. XP logic itself

Reviewed `src/lib/xp.ts`'s `awardXP()`: both `User.xpPoints` and `WeeklyXP.xp` are already written via atomic Prisma `increment` operations (no read-then-write race). No code change was needed or made here, per the explicit "preserve existing XP logic" instruction — the only remaining CRITICAL gap was the missing cascade, now fixed.

### 5c. `EvidenceRecord` missing uniqueness constraint

**Investigated, not fixed — left out of scope.** Grepped all of `src/` for `evidenceRecord`/`EvidenceRecord`: the model exists in the schema with zero create/read call sites anywhere in the codebase (one comment mention only). There is no live write path that could produce the duplicate-row scenario the audit describes, and the correct uniqueness key can't be safely inferred without a defined write path — adding a `@@unique` constraint on a guess risks breaking a future feature that hasn't been written yet, which would be schema redesign on speculation rather than a fix to a real corruption risk. Recommend revisiting once `EvidenceRecord` has an actual write path.

**Verification:** `npx prisma generate` clean, `npx prisma db push` succeeded ("Your database is now in sync with your Prisma schema"), `npx tsc --noEmit` clean, `npm run build` clean.

**Remaining risk:** `EvidenceRecord`'s uniqueness gap remains open (see 5c) — not actionable without product/feature definition; everything else in this task is resolved.

---

## Task 6 — Security & error leakage

**Root cause:** `/api/onboarding`'s top-level catch block returned the raw caught error's message text directly to the client (`error: errMsg`), which could leak Prisma constraint names, field names, or other internal implementation details to an unauthenticated or authenticated-but-untrusted client response body.

**Files changed:** `src/app/api/onboarding/route.ts`

**Fix:** Replaced the raw-message response with a generic, friendly message, while logging full detail server-side and through the existing monitoring pipeline:

```ts
console.error('[onboarding] ERROR:', err)
captureError(err, { route: 'api/onboarding' })
return NextResponse.json({ success: false, error: 'Could not complete onboarding. Please try again.' }, { status: 500 })
```

This matches the existing pattern already used elsewhere in the codebase (`api/coach/route.ts`, the Sprint C practice/assessment/mock-generate routes).

**Verification:** Forced a non-Zod error path (e.g. invalid subject slug bypassing earlier checks via a malformed unique violation) and confirmed the client response is now the generic message with no Prisma internals, while `console.error` and `captureError` still receive the full error object server-side. Confirmed Zod validation errors are unaffected — those still return their specific, safe, user-facing validation message (`err.errors[0].message`), which was never the leak vector.

**Remaining risk:** None identified for `/api/onboarding`. Other routes' error handling was not in scope for this sprint (only "remaining CRITICAL error-leak paths identified in the audit" — the audit named only `/api/onboarding` for this finding).

---

## Validation performed

```
npx prisma generate    → OK
npx prisma db push     → "Your database is now in sync with your Prisma schema." (Referral/WeeklyXP cascades applied)
npx tsc --noEmit       → 0 errors
npm run build          → succeeded, full route manifest printed, all routes compiled
```

One incidental type error surfaced during the Task 4 transaction refactor (`src/app/api/school/assessment/submit/route.ts`): wrapping the `StudentProgress`/`TopicProgress` writes in a `$transaction` closure broke TypeScript's control-flow narrowing of `profile.educationBoard`/`profile.grade` (narrowed non-null by an early-return check in the outer scope, but TS does not carry that narrowing into a nested closure). Fixed by capturing `const educationBoard = profile.educationBoard` / `const grade = profile.grade` once, immediately after the validation check, and using those locals throughout — no behavior change, pure type-safety fix required to keep the build green.

## Summary of files changed

- `src/app/auth/login/page.tsx` — open redirect fix (Task 2)
- `src/app/coach/page.tsx`, `src/app/quiz/page.tsx` — onboarding auto-heal (Task 1)
- `src/app/api/onboarding/route.ts` — transactional resubmission, precise email-conflict detection, generic error response (Tasks 1, 3, 6)
- `src/app/api/school/assessment/submit/route.ts` — transactional StudentProgress/TopicProgress writes (Task 4a)
- `src/app/api/practice/submit/route.ts` — transactional PracticeSession/MistakeRecord writes (Task 4b)
- `prisma/schema.prisma` — `onDelete: Cascade` on `Referral.referrer` and `WeeklyXP.user` (Task 5a)

## Out of scope / not started (per STOP RULE)

HIGH, MEDIUM, and LOW items from `docs/BETA_BLOCKER_REPORT.md` Sections 2–3 were not touched. `EvidenceRecord`'s uniqueness gap (Task 5c) remains open pending a defined write path — flagged above, not silently dropped. No Sprint E work was started.
