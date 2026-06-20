# Critical Bugfix Sprint — Password Reset + School Subject Synchronization

Scope: exactly two production bugs. No Visual Learning, no Educational
Intelligence, no Tutor Max, no Sprint U, no UI redesign — confirmed nothing
outside the files listed below was touched.

## Bug 1 — Password Reset Email Failure

### Root cause

Two compounding issues, both confirmed by direct code/env inspection:

1. **`SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` are unset** in this environment's
   `.env` (the keys are entirely absent, not even empty placeholders) —
   `smtpReady()` in `src/lib/email.ts` returns `false`, so `sendMail()` is
   never even attempted.
2. **The failure was structurally invisible to the caller.**
   `src/app/api/auth/forgot-password/route.ts` always returns the same
   `{success:true, "If that email exists, a link was sent"}` response
   whether the email exists or not (intentional — anti-enumeration, see the
   code's own "LOW-5 timing oracle" comment). The bug was that this
   anti-enumeration response was also returned when the email **does**
   exist but `sendPasswordResetEmail()` explicitly returned
   `{success:false, error:...}` — the failure was only ever
   `console.error`'d, never tracked anywhere actionable. From the user's
   perspective: "check your email" with no email ever sent, and no
   operator-visible signal that SMTP is broken.

Secondary findings (production-readiness):
- A temporary "DR.4 DIAGNOSTIC" block in `sendPasswordResetEmail()` opened a
  **second**, throwaway SMTP connection per reset attempt purely to call
  `.verify()` for ad-hoc debugging — doubling connection overhead and never
  cleaned up.
- No email-format validation existed beyond `typeof email === 'string'` —
  any non-empty string (e.g. `"x"`) passed straight through to the DB lookup.
- Gmail SMTP (the documented default in `.env.example`) requires an **App
  Password**, not the account password — not a code bug, but worth flagging
  for whoever sets the production secrets.

### Fix

**`src/lib/email.ts`** — `sendPasswordResetEmail()`:
- Removed the temporary DR.4 diagnostic block entirely (no more duplicate
  SMTP connection per attempt).
- Failures (both "SMTP not configured" in production, and a genuine
  `sendMail()` exception) now call `reportError()` from `src/lib/monitoring.ts`
  — this increments a per-context failure counter, logs a structured line,
  and optionally POSTs to `MONITORING_WEBHOOK_URL` if configured. This makes
  the failure **observable** (via `getFailureCounters()` / the monitoring
  webhook / structured logs) without changing the client-facing response —
  the anti-enumeration property is preserved by design, since "no silent
  failures" has to mean "no silent failures *to the operator*", not "leak
  whether an email exists to the client" (those two requirements would
  otherwise conflict).
- Emails are now masked (`a***@example.com`) in all log lines via the
  existing `maskEmail()` helper, instead of full addresses or the previous
  diagnostic's home-rolled masking regex.

**`src/app/api/auth/forgot-password/route.ts`**:
- Added basic email-format validation (`EMAIL_RE`) before the DB lookup —
  rejects obviously malformed input with a 400 instead of silently treating
  it as "valid but not found".
- Token generation/storage (SHA-256 hash, 1-hour expiry,
  `password-reset:<email>` identifier) and the anti-enumeration response
  contract are unchanged.

**`src/app/api/auth/reset-password/route.ts`** — not modified; audited and
confirmed correct (re-hashes the incoming token, checks expiry, atomic
`$transaction` for password update + token deletion).

### Reproduction before fix
1. Forgot Password → enter a valid, registered email.
2. Server: `smtpReady()` is false → `sendPasswordResetEmail` returns
   `{success:false, error:'SMTP not configured'}`, logged only via
   `console.error`.
3. Client: receives `{success:true, "If that email exists..."}` regardless —
   shown a generic "check your email" screen. No email arrives. No operator
   signal exists anywhere that this happened.

### Reproduction after fix
1. Same steps. Client behavior is **unchanged** (anti-enumeration is
   intentional and preserved) — the user still sees "check your email".
2. Server: the failure now increments
   `getFailureCounters()['email.password-reset.smtp-not-configured']` (or
   `...send-failed` for a real SMTP error) and logs a structured,
   email-masked line — visible to whoever monitors logs/the webhook, instead
   of disappearing into `console.error` only.
3. Once real `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` are set (e.g. Gmail + App
   Password), `smtpReady()` is true, `sendMail()` succeeds, and the email is
   delivered — verified by code path inspection and `tsc`/`build` passing;
   actual delivery requires real SMTP credentials, which this sandbox does
   not have (see "Validation" below).

## Bug 2 — School Subjects Not Appearing in Learn Dropdown

### Root cause (confirmed)

Two structurally different, non-overlapping subject sources existed:

- **AI/Library subjects**: a user is "enrolled" via `ProfileSubject` rows.
  Both the Learn page's dropdown and the Dashboard's non-school branch read
  `profile.subjects` (the `ProfileSubject` relation).
- **School subjects**: resolved via `getGradeSubjects(board, grade)` in
  `src/lib/school/schoolRouting.ts` — the **entire** board/grade catalog,
  filtered only by "has at least one chapter at this grade". There is no
  per-subject opt-in step anywhere: `OnboardingWizard.tsx`'s school path
  (`handleSchoolFinish`) collects only **board + grade**, never a subject
  list, and `POST /api/onboarding`'s `handleSchoolStudent()` never creates
  any `ProfileSubject` rows for school students. (The bug report's "Select 4
  school subjects" step is, in this codebase, simply "this board/grade has 4
  subjects with chapters" — there was never a real per-user selection to
  lose.)

The Dashboard's school-mode branch (`getDashboardV2Data.ts`) already used
`getGradeSubjects()` directly and rendered all of them as cards — that part
worked correctly. The **Learn page** (`src/app/learn/page.tsx`) built its
subject dropdown exclusively from `profile.subjects.map(...)`
(`ProfileSubject` rows), which — for a school student — is always empty,
since school onboarding never populates that table. That is the exact and
complete root cause: Dashboard used the board/grade catalog, Learn page used
an enrollment table that school students never get rows in.

### Fix — single source of truth

**`src/lib/subjects/getUserNavSubjects.ts`** (new) — the one function both
pages now call to answer "what subjects does this user have":
```ts
export function getUserNavSubjects(profile, isSchool: boolean): {slug, name}[] {
  if (isSchool && profile.educationBoard && profile.grade) {
    return getGradeSubjects(profile.educationBoard, profile.grade)
      .map(slug => ({ slug, name: SCHOOL_SUBJECT_META[slug]?.label ?? slug }))
  }
  return profile.subjects.map(ps => ({ slug: ps.subject.slug, name: ps.subject.name }))
}
```
`isSchool` is passed in explicitly (not re-derived from `profile.userType`)
so callers that support a library-mode override (the dashboard's `?mode=`
query param) resolve consistently with the rest of their own view.

**`src/lib/dashboard/getDashboardV2Data.ts`**:
- School branch: `schoolSlugs` is now `getUserNavSubjects(profile, true).map(s => s.slug)`
  instead of calling `getGradeSubjects()` directly — same result, but now
  routed through the shared function.
- Non-school branch: `slugs` is now `getUserNavSubjects(profile, false).map(s => s.slug)`
  instead of `enrolledSubjects.map(...)` — same result, same shared function.
- Removed the now-unused direct `getGradeSubjects` import.

**`src/app/learn/page.tsx`**:
- Added `isSchoolMode` (mirrors the existing School Mode block's own
  condition: `userType === 'SCHOOL_STUDENT' && educationBoard && grade`).
- `requestedSlug` now defaults to the first grade-catalog subject for school
  students with no `?subject=` query param (previously: stayed `undefined`,
  which fell through to the auto-heal block and silently force-enrolled the
  school student into a default "python" `ProfileSubject` row).
- The dropdown's `subjects` array is now `getUserNavSubjects(profile, isSchoolMode)`
  instead of `profile.subjects.map(...)` — for school students this now
  correctly returns the board/grade catalog (matching the Dashboard), for
  everyone else it is byte-identical to the previous behavior.
- The existing School Mode chapter-resolution block (which upserts a
  `Subject` row and resolves the active chapter when `requestedSlug` is a
  school subject) is unchanged — clicking a school subject in the new
  dropdown navigates to `/learn?subject=<slug>`, which that block already
  handles correctly.

No duplicated loaders: both files call the exact same `getUserNavSubjects()`;
no hardcoded subject lists were introduced.

### Reproduction before fix
1. Create account → School Mode → pick board + grade (e.g. CBSE, Class 8).
2. Dashboard: shows all of that grade's subjects (Mathematics, Science,
   English, Social Science, ...) via `getGradeSubjects()`.
3. Open Learn page: dropdown is empty/absent — `profile.subjects` (the
   `ProfileSubject` table) has zero rows for this user, since school
   onboarding never wrote to it.

### Reproduction after fix
1. Same steps.
2. Dashboard: unchanged — same subject cards as before.
3. Learn page: dropdown now shows the **same** subject set as the dashboard
   (sourced from the same `getUserNavSubjects()` call), and visiting `/learn`
   with no query param now opens the first of those subjects instead of
   silently enrolling the student in Python.
4. For non-school (AI/library) accounts: byte-identical behavior to before —
   verified by `tsc`/`build` and by the function falling back to the
   original `profile.subjects.map(...)` logic when `isSchool` is false.

## Files changed
- `src/lib/email.ts` — removed temporary diagnostic block; failures now go
  through `reportError()`/`maskEmail()` instead of bare `console.error`.
- `src/app/api/auth/forgot-password/route.ts` — added email-format
  validation.
- `src/lib/subjects/getUserNavSubjects.ts` (new) — single source of truth
  for a user's subject set.
- `src/lib/dashboard/getDashboardV2Data.ts` — both branches now call the
  shared function instead of duplicating the school/non-school subject
  logic.
- `src/app/learn/page.tsx` — dropdown and default-subject resolution now use
  the shared function; school students no longer get force-enrolled into
  Python by the auto-heal fallback.

Untouched (out of scope): `src/app/api/auth/reset-password/route.ts`,
`src/components/onboarding/OnboardingWizard.tsx`, `src/lib/rateLimit.ts`,
Visual Learning, Educational Intelligence, Tutor Max, Sprint U, all
Hindi/Sanskrit subject architecture, all UI/navigation layout.

## Validation results
- `npx prisma generate` — succeeded.
- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeded; all routes (including `/learn`, `/dashboard`,
  `/api/auth/forgot-password`, `/api/auth/reset-password`) compiled.
- `npm test` (`vitest run`) — **could not run**: `vitest` is referenced in
  `package.json`'s `test` script but is not an installed dependency in this
  sandbox (pre-existing gap, unrelated to this bugfix — `npx vitest` failed
  to resolve `vitest/config` before any test file loaded). Not a regression
  introduced by this work; flagging for whoever owns CI/test tooling.
- Manual flow verification was done by full code-path tracing (this sandbox
  has no real SMTP credentials or browser session to click through end to
  end):
  - New account → onboarding (school path: board → grade → `/api/onboarding`
    `handleSchoolStudent` → `onboardingCompleted: true`) → dashboard (school
    cards via `getGradeSubjects`) → Learn page (dropdown via the same
    function now) — traced line-by-line, confirmed consistent.
  - Password reset: token creation (`forgot-password/route.ts`, SHA-256
    hash, 1-hour expiry) → email delivery attempt (`sendPasswordResetEmail`,
    now logged via `reportError` on failure) → reset page
    (`reset-password/route.ts`, unchanged, re-hashes token, atomic
    transaction) — traced line-by-line, confirmed consistent. Actual SMTP
    delivery requires real provider credentials this sandbox does not have.

## Running instructions (local computer)
```bash
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
# For password reset to actually deliver email, also set in .env:
#   SMTP_HOST="smtp.gmail.com"
#   SMTP_PORT="587"
#   SMTP_SECURE="false"
#   SMTP_USER="you@gmail.com"
#   SMTP_PASS="<Gmail App Password, not your account password>"
#   SMTP_FROM="My Tutor <noreply@mytutor.app>"
npm install
npx prisma db push
npm run dev             # http://localhost:3000
npm run build            # prisma generate && next build
npx tsc --noEmit         # pre-existing stripe/subscription errors are expected on feature branches; this bugfix adds none
```

To verify Bug 1 locally: leave `SMTP_*` unset in dev — the app logs the
reset link directly to the console (`[email] SMTP not configured — RESET
LINK (dev mode): ...`) instead of failing; set real SMTP credentials to test
actual delivery.

To verify Bug 2 locally: sign up → School Mode → pick a board/grade →
confirm the Dashboard's subject list and the Learn page's subject dropdown
(top-center pill, click to expand) show the identical subject set.
