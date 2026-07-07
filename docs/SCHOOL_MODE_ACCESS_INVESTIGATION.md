# School Mode Access Investigation

**Status: Investigation complete. No code changed. Conclusion: working as designed, not a bug.**

## Root Cause

School Mode visibility/access is gated **entirely by `Profile.userType` + `Profile.educationBoard` +
`Profile.grade`** — it has no dependency on `User.role` whatsoever. These two fields live on
separate Prisma models that the codebase never reconciles:

- `User.role` (`STUDENT` | `ADMIN`) — set via normal signup, or auto-promoted to `ADMIN` by
  `maybeBootstrapAdmin()` when the signing-in email matches `ADMIN_EMAILS`
  (`src/lib/auth/admin.ts:23-48`, invoked from `src/lib/auth/config.ts:65-69`).
- `Profile.userType` (`GENERAL_LEARNER` | `SCHOOL_STUDENT`) + `educationBoard`/`grade` — set
  **only** by the school-onboarding form (`src/app/api/onboarding/route.ts:241-273`,
  `handleSchoolStudent`).

The `ADMIN_EMAILS` bootstrap only ever updates `User.role`. It never creates or touches a
`Profile` row. So an Admin account is, for School Mode purposes, indistinguishable from any
other user who hasn't completed school onboarding — because nothing in the system ever checks
`role` when deciding whether to show School Mode.

## Exact gating logic

`src/app/dashboard/page.tsx:32`:
```ts
if (profileCheck.userType === 'SCHOOL_STUDENT' && profileCheck.educationBoard && profileCheck.grade) {
  // ...renders <SchoolDashboard />
}
// else: renders <DashboardV2 /> (Library mode)
```

Every route under `src/app/school/**` repeats the identical guard independently (no shared
layout):
```ts
const profile = await prisma.profile.findUnique({ where: { userId }, select: { userType, educationBoard, grade } })
if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
  redirect('/dashboard')
}
```
Confirmed identically present in: `src/app/school/[subject]/page.tsx`,
`.../chapters/page.tsx`, `.../mock/page.tsx`, `.../chapter/[chapterId]/page.tsx`,
`.../chapter/[chapterId]/practice/page.tsx`, `.../chapter/[chapterId]/assessment/page.tsx`,
`src/app/school/focus/page.tsx`.

## Answers to the investigation questions

| # | Question | Answer |
|---|---|---|
| 1 | Is School Mode enabled? | Yes — fully functional for any account with `Profile.userType === SCHOOL_STUDENT` + board + grade. |
| 2 | Is School Mode hidden? | Effectively yes for non-school accounts — no nav link to `/school` exists anywhere in the global nav (`NavHeader.tsx` only links to `/`, `/admin` for admins, `/settings`). It's a closed loop: reachable only from within `SchoolDashboard`, which itself only renders for school accounts. |
| 3 | Is School Mode role-gated? | **No.** `User.role` is never read by any `/dashboard` or `/school/**` access-control check. |
| 4 | Is School Mode feature-flagged? | No. Repo-wide search for `SCHOOL_MODE_ENABLED` returns zero code matches (only mentioned in docs). |
| 5 | Is School Mode navigation missing? | Yes, for non-school users — no link exists anywhere to discover it. |
| 6 | Is School Mode broken? | No — the gating logic is consistent and working exactly as written across every route. |
| 7 | Is School Mode inaccessible to Admins by design? | Yes, by design — but more precisely, it's inaccessible to **anyone** who hasn't completed school onboarding, and the `ADMIN_EMAILS` bootstrap was never designed to also set school-profile fields. Admin and "school student" are orthogonal axes that nobody connected. |

## Can a platform Admin currently...

| Action | Result | Blocking condition |
|---|---|---|
| See School Mode | No | No nav link exists to `/school` anywhere; Admin's `Profile.userType` is `GENERAL_LEARNER` (or no Profile row at all if they haven't onboarded). |
| Open School Mode (direct URL) | No | Every `/school/**` route redirects to `/dashboard` because `profile.userType !== 'SCHOOL_STUDENT'`. |
| Test School Mode | No | Same as above — no bypass exists. |
| Impersonate School users | No | Repo-wide search for "impersonate" returns zero matches — no such feature exists. |
| Access SchoolDashboard | No | `/dashboard` only renders `<SchoolDashboard>` when `profileCheck.userType === 'SCHOOL_STUDENT' && educationBoard && grade`; otherwise renders `<DashboardV2>` (or redirects to `/onboarding` if no Profile row exists yet). |

## Route / Role Matrix

| Route | Required role | Required userType/board/grade | Required flags | Current behavior for Admin |
|---|---|---|---|---|
| `/dashboard` | none checked | `SchoolDashboard` only if `userType==='SCHOOL_STUDENT' && board && grade`; else `DashboardV2`; redirect to `/onboarding` if no Profile | none | Library `DashboardV2` (or `/onboarding` if no Profile yet) |
| `/school/[subject]` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/[subject]/chapters` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/[subject]/mock` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/[subject]/chapter/[chapterId]` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/[subject]/chapter/[chapterId]/practice` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/[subject]/chapter/[chapterId]/assessment` | none checked | same gate | none | Redirected to `/dashboard` |
| `/school/focus` | none checked | same gate | none | Redirected to `/dashboard` |
| `/admin/**` | `role === 'ADMIN'` (`requireAdmin()`) | not checked | none | Works correctly — unrelated surface, not School Mode |

## Conclusion: not a bug

There is no broken code, no regression, and no inconsistent check — every `/school/**` route
applies the exact same, correctly-functioning guard. The behavior an Admin experiences
("School Mode is invisible to me") is the **same behavior every non-school account
experiences**, including ordinary `STUDENT`-role accounts that picked "general learner" at
onboarding. `User.role` and `Profile.userType` were simply never wired together — Admin status
was never intended to imply school-student status, and no admin preview/impersonation path
was ever built.

Because nothing is actually broken (no regression to "restore"), **no code was changed** for
this investigation, per the instruction to fix only confirmed access bugs and avoid touching
educational/curriculum/workflow logic.

### If admin testing access to School Mode is desired going forward

This would be a new, explicit feature request (not a bug fix) — e.g., one of:
- An Admin completes school onboarding once, like any student, to get a real `SCHOOL_STUDENT`
  Profile for manual QA.
- A purpose-built admin "preview/impersonate as school student" capability (none exists today).
- An explicit `role === 'ADMIN'` bypass added to the `/dashboard` branch and all seven
  `/school/**` guards, with a synthetic board/grade for read-only preview.

Any of these requires a deliberate decision and separate authorization before implementation —
flagged here for visibility, not actioned.

## Files inspected

```
prisma/schema.prisma
src/lib/auth/admin.ts
src/lib/auth/config.ts
src/app/dashboard/page.tsx
src/app/dashboard/_legacy/page.tsx
src/app/school/[subject]/page.tsx
src/app/school/[subject]/chapters/page.tsx
src/app/school/[subject]/mock/page.tsx
src/app/school/[subject]/chapter/[chapterId]/page.tsx
src/app/school/[subject]/chapter/[chapterId]/practice/page.tsx
src/app/school/[subject]/chapter/[chapterId]/assessment/page.tsx
src/app/school/focus/page.tsx
src/components/dashboard/v2/NavHeader.tsx
src/app/api/onboarding/route.ts
```
