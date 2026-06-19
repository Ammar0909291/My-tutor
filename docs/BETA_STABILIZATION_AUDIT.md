# Beta Stabilization Audit

Branch: `claude/my-tutor-foundation-KDSUO`
Mode: Audit only — no code changed, nothing committed, nothing fixed.

Method: direct source-code review (Read/Grep across the relevant API routes,
page guards, and components) plus live verification in a running dev server
using two throwaway accounts created through the real signup flow
(`audit-school-v3@local.dev` / `AuditPass123!`, onboarded CBSE Class 8; and
`audit-learner-v3@local.dev`, onboarded Python). Screenshots referenced below
live under `screenshots/learning-experience-audit-2026-06-17/` and
`screenshots/beta-audit/` (already on disk from this session, not yet
committed since this report says audit-only).

---

## Issue 1 — Board / Class selector "sometimes invisible"

**VERIFIED?** Yes — reproduced live.

**ROOT CAUSE**
`src/app/settings/page.tsx` renders the "My School" section (board + class
buttons) only when `profile?.userType === 'SCHOOL_STUDENT'`. `profile` starts
as `null` and is populated by an async `fetch('/api/user/profile')` in a
`useEffect` (lines ~127-151). That fetch ends in a **silent catch**:
```ts
.catch(() => {})
```
There is no loading skeleton and no error state for this specific fetch — the
section simply does not exist in the DOM until the fetch resolves. Captured
proof: a screenshot taken ~2s after navigating to `/settings` shows the
entire "My School" block missing, with Full Name/Email/About You fields also
still empty (`screenshots/beta-audit/settings-light.png`); a screenshot taken
~1s later, once the fetch resolved, shows the same page with the section
fully rendered and the board/grade buttons clearly visible and correctly
highlighted (`screenshots/beta-audit/settings-dark.png`). So the "control
exists but cannot be seen" report is real and is a client-side data race, not
a CSS/contrast/z-index bug — the underlying button styling itself (purple
text/border on a tinted dark card) renders with good contrast once the data
arrives.

This same pattern (silent `.catch(() => {})` with no loading/error UI) is
used for any user on a slow connection, flaky network, or who happens to load
`/settings` right after a fresh login when the session cookie is still
propagating — any of which can leave `profile` permanently `null` for that
page load.

**FILES INVOLVED**
- `src/app/settings/page.tsx` (fetch + conditional render, ~lines 96-151, 369-417)
- `src/app/api/user/profile/route.ts` (the endpoint being fetched)

**SEVERITY:** High — core school-only feature is unusable until a retry/refresh, with zero user-facing feedback that anything is wrong.

**RISK OF FIX:** Low. Adding a loading state + visible error + retry button to one `useEffect` does not touch the rest of the page.

**RECOMMENDED FIX:** Track a `profileLoadError` boolean similarly to the existing `loadError` state used for the settings fetch a few lines above (which already does this correctly — `DEF-EJ-06` comment shows this exact pattern was already fixed once for the *other* fetch on this page but not applied to the profile fetch). Show a small inline "Couldn't load your school info — Retry" affordance instead of nothing.

**ESTIMATED IMPLEMENTATION SIZE:** Small (~15-20 lines, one file).

---

## Issue 2 — AI voice still talks after leaving lessons

**VERIFIED?** Partially — the previously-shipped fix only covers one of the reported scenarios.

**ROOT CAUSE**
`src/lib/tts.ts` `_speakTextImpl` calls `window.speechSynthesis.cancel()`
before starting any **new** utterance (line 49). This correctly prevents two
utterances overlapping when the lesson screen asks the tutor to speak again
(tab switches back to the same lesson, rapid re-clicks, etc.) — this is
almost certainly "the previous fix."

However, `src/components/learn/LessonScreen.tsx` has no unmount cleanup that
calls `stopSpeaking()` / `speechSynthesis.cancel()`. The component's only
unmount-time side effect (lines 760-774) ends the *learning session* via
`sendBeacon`; it does not touch speech. `stopSpeaking()` is otherwise only
invoked from explicit UI handlers (pause/stop button clicks, lines 424 and
437) — never from a cleanup function. Consequences:
- **Route change away from `/learn`** (clicking a nav link, browser back) unmounts `LessonScreen` while speech may still be in progress → speech continues over the new page.
- **Subject change that remounts via the component's `key` prop** (noted explicitly in the comment at line 767-769) does trigger the session-end beacon, but still does not stop speech — so switching subjects while the tutor is talking lets the old subject's voice continue alongside the new subject's UI.
- Tab switch alone (not a route change) doesn't unmount the component at all, so speech correctly continues by design there (expected behavior, not a bug) — but the user-reported "tab switches" scenario likely refers to switching to a different in-app tab/route, which is covered by the gap above.

**FILES INVOLVED**
- `src/components/learn/LessonScreen.tsx` (missing cleanup, ~line 760-774 is the closest existing unmount effect)
- `src/lib/tts.ts` (`stopSpeaking`, `_speakTextImpl`)

**SEVERITY:** Medium — annoying/unprofessional but not data-destructive; narrow window (only while actively speaking).

**RISK OF FIX:** Low. Add `stopSpeaking()` inside the existing unmount cleanup at line 770-773 (same function that already runs on unmount/`beforeunload`).

**RECOMMENDED FIX:** Call `stopSpeaking()` alongside `endSession()` in that cleanup function.

**ESTIMATED IMPLEMENTATION SIZE:** Small (1-2 lines, one file).

---

## Issue 3 — Library Mode / School Mode bleed-through

**VERIFIED?** Partially — fixed in one direction, not the other.

**ROOT CAUSE**
Every server-rendered School route consistently guards against non-school
users with a hard redirect:
```
profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade → redirect('/dashboard')
```
Confirmed present in all six school page files (`/school/[subject]`,
`/school/[subject]/chapters`, `/school/[subject]/chapter/[chapterId]`,
`.../practice`, `.../assessment`, `/school/[subject]/mock`,
`/school/focus`). This direction (a Library/general-learner user trying to
reach School routes) is **solidly fixed**.

The reverse direction is not guarded at all: `src/app/library/page.tsx` only
checks that a session exists and that *some* profile row exists
(`if (!profile) redirect('/onboarding')`) — it never checks `userType`. A
fully-onboarded `SCHOOL_STUDENT` can navigate directly to `/library` and see
the full general-learner Subject Library, including the `EnrollButton` to
add Library subjects (Python, Spanish, etc.) on top of their school
enrollment. `/learn` similarly branches on `userType` for which curriculum to
load rather than blocking the school student outright (this looks
intentional — `/learn` is meant to be dual-mode-aware — but `/library` shows
no such intent, it's the bare general-learner page with no mode check).

This matches the report of "front page doesn't reflect actual mode" — a
school student who ends up on `/library` (e.g. an old bookmark, a stale nav
link, or just guessing the URL) sees a page with no school-mode framing at
all and can genuinely begin enrolling in non-school subjects, blending the
two modes.

**FILES INVOLVED**
- `src/app/library/page.tsx` (missing `userType` guard)
- For comparison/reference: `src/app/school/[subject]/page.tsx` (the guard pattern to reuse)

**SEVERITY:** Medium — doesn't break school-mode data, but does let a school student silently end up in a dual-mode state the product isn't designed for.

**RISK OF FIX:** Low — same one-line guard pattern already used six times elsewhere in the codebase.

**RECOMMENDED FIX:** Add `if (profile.userType === 'SCHOOL_STUDENT') redirect('/dashboard')` (or to `/school/focus`) at the top of `LibraryPage`, mirroring the existing school-route guards.

**ESTIMATED IMPLEMENTATION SIZE:** Small (1 file, ~3 lines).

---

## Issue 4 — Subject management (remove / re-add / persistence)

**VERIFIED?** Yes, and it's worse than "not fully working" — there is currently no UI path to remove a subject at all, and the one backend endpoint that could do it has a data-loss bug.

**ROOT CAUSE**
Searched the whole codebase for a "remove subject" affordance
(`/library`, the dashboard's `SubjectsGrid`, `/settings`) — **none exists**.
`POST /api/subjects/enroll` only adds subjects (additive, by design — see its
own docstring). The only endpoint that could implement removal,
`POST /api/profile` (`src/app/api/profile/route.ts`), is **not called by any
component** in `src/app/` — it is dead/orphaned code from an earlier
iteration of the profile-edit flow.

That endpoint also has a serious bug if it were ever wired up: it syncs
subjects by deleting and recreating every `ProfileSubject` row for the
profile on every save —
```ts
await prisma.profileSubject.deleteMany({ where: { profileId: profile.id } });
await prisma.profileSubject.createMany({
  data: subjects.map((s) => ({ profileId: profile.id, subjectId: s.id })),
});
```
`createMany` re-creates rows with default values, discarding
`progressPercent`, `currentLevelIndex`, `targetLevelIndex`, `notes`, and the
original `createdAt`/`isActive` for **every** subject on the profile, not
just the one being removed. Re-adding a removed subject (or even just saving
an unrelated profile-field edit through this endpoint) would silently reset
progress on *all* of a user's other subjects too.

**FILES INVOLVED**
- `src/app/api/profile/route.ts` (the buggy, currently-unused sync logic)
- `src/app/api/subjects/enroll/route.ts` (the only live, additive-only endpoint)
- No frontend component currently calls subject removal — confirmed via repo-wide search for `subjectSlugs` usage outside `src/app/api/`.

**SEVERITY:** Critical for the claimed feature (it does not exist / is unreachable) and High for the latent data-loss bug in the dead code, which would resurface the moment anyone wires a "remove subject" button to that endpoint without fixing the sync logic first.

**RISK OF FIX:** Medium — building the actual remove-subject UI/flow is new surface area, not a one-line patch; the data-loss fix itself (use targeted `deleteMany({ subjectId: { in: removedIds } })` instead of full delete+recreate) is low risk on its own.

**RECOMMENDED FIX:** Either (a) treat "subject removal" as not-yet-implemented and scope it as new work, or (b) if there's a hidden requirement to ship it, replace the delete-all/recreate-all logic with a diff (delete only the subjects no longer in the list, create only the new ones, leave existing rows untouched) before exposing it in any UI.

**ESTIMATED IMPLEMENTATION SIZE:** Medium (new UI + a safe diff-based backend fix).

---

## Issue 5 — Leaderboard

**VERIFIED?** Yes — deleted users are not excluded.

**ROOT CAUSE**
`src/app/api/leaderboard/route.ts` queries `prisma.weeklyXP.findMany(...)`
(weekly mode) and `prisma.user.findMany(...)` ordered by `xpPoints` (all-time
mode) with no `isDeleted` filter anywhere in either query. Cross-checked
`src/app/api/user/delete-account/route.ts`: it sets `isDeleted: true` on the
user row but does not touch `xpPoints` or delete the user's `WeeklyXP` rows.
So a deleted account keeps its XP value and its weekly-XP history, and
nothing downstream filters it back out — it will keep appearing on both
leaderboards (and contributing to other users' computed rank via the
`count({ xp: { gt: ... } })` calculations) until/unless its XP happens to
fall out of the top 10.

Tie-rank handling itself looks correct: both modes compute
`rank = (number of strictly-greater entries) + 1`, which is standard
competition ranking and correctly gives equal users the same rank.

**FILES INVOLVED**
- `src/app/api/leaderboard/route.ts` (missing `isDeleted` filter on both the weekly and all-time queries)
- `src/app/api/user/delete-account/route.ts` (doesn't clear XP/WeeklyXP on delete)

**SEVERITY:** Medium — visible integrity issue (a deleted student appears to be "still ranked"), no data corruption.

**RISK OF FIX:** Low. Add `where: { user: { isDeleted: false } }` to the weekly query and `where: { isDeleted: false }` to the all-time `user.findMany`, plus the same filter on the two `count()` calls used for `myRank` (so a deleted user never inflates another user's rank either).

**ESTIMATED IMPLEMENTATION SIZE:** Small (one file, a handful of `where` clauses).

---

## Issue 6 — School Mode visual consistency (forensic review)

**VERIFIED?** Partially confirmed — the page shells are consistent; one real legacy leftover and one functional regression were found; no major "mixed generations" sprawl across the core flow.

**Evidence gathered:**
- All six school page files (`/school/[subject]`, `chapters`, `chapter/[chapterId]`, `chapter/[chapterId]/practice`, `chapter/[chapterId]/assessment`, `mock`) plus `/school/focus` and `/settings` import from `@/components/ui/candy` and wrap their root in `<CandyPage>` (3-5 references each, confirmed via grep). No school route renders outside the candy shell at the page level.
- Repo-wide search for the old global classes (`className="btn-primary"`, `className="input-field"`, `className="card"`) inside `src/components/school`, `src/components/learn`, and the school/quiz/flashcards/progress/coach route trees found exactly **one** remaining legacy usage: `src/components/learn/FinalAssessmentModal.tsx`. Everything else in the core school path has already been migrated off the old global form/card classes.
- Visual spot-check via screenshots (`screenshots/learning-experience-audit-2026-06-17/learning/subject-overview-school-desktop.png`) shows the Subject Overview screen rendering as a cohesive, modern dark-candy layout (consistent typography scale, consistent card surfaces, consistent purple accent for primary actions, progress roadmap with proper hierarchy) — this screen reads as one visual generation, not mixed.
- **Functional regression found incidentally while capturing practice-session screenshots**: `screenshots/learning-experience-audit-2026-06-17/practice/practice-session-desktop.png` shows a hard error state — *"Failed to load questions. Please try again."* — when loading practice for `cbse.math.8.ch1` on the freshly-onboarded school test account. This is outside the explicit 6 issues but is a real, reproducible failure worth flagging before beta; it was not investigated further here (audit-only / time-boxed to the assigned issues) but the question-generation pipeline for practice (`src/app/api/school/practice/generate/route.ts` and/or the seeded chapter content for `cbse.math.8.ch1`) is the likely place to start.
- Did not get a clean visual capture of revision notes or the "modes" page referenced in the issue — these should be spot-checked in a follow-up pass; nothing found here contradicts or confirms a problem on those two specifically.

**FILES INVOLVED**
- `src/components/learn/FinalAssessmentModal.tsx` (one remaining legacy-class usage)
- `src/app/api/school/practice/generate/route.ts` (practice question generation — the incidental failure above)

**SEVERITY:** Low for the visual-consistency claim itself (mostly already clean); the incidental practice-generation failure is High if it reproduces broadly (blocks a core daily-use flow) but needs separate, dedicated investigation to confirm scope (one chapter vs. all chapters, one account vs. all).

**RISK OF FIX:** Low for migrating the one remaining legacy modal; unknown for the practice-generation failure until root-caused.

**RECOMMENDED FIX:** Migrate `FinalAssessmentModal.tsx` off `.btn-primary`/`.input-field`/`.card` onto the candy primitives used everywhere else in the school flow. Separately, open a dedicated investigation ticket for the practice-question-load failure — do not fold it into a "visual consistency" fix since it's a backend/data issue, not styling.

**ESTIMATED IMPLEMENTATION SIZE:** Small for the modal migration. Unknown for the practice-generation failure pending root-cause.

---

## Summary table

| # | Issue | Verified | Severity | Fix size |
|---|-------|----------|----------|----------|
| 1 | Board/Class selector invisible | Yes | High | Small |
| 2 | AI voice persists after leaving lesson | Partially (gap on route/subject change) | Medium | Small |
| 3 | Library/School mode bleed-through | Partially (one direction unguarded) | Medium | Small |
| 4 | Subject management | Yes (feature doesn't exist; backend has data-loss bug) | Critical/High | Medium |
| 5 | Leaderboard includes deleted users | Yes | Medium | Small |
| 6 | School Mode visual consistency | Mostly clean; 1 legacy file + 1 incidental functional bug | Low (visual) / High (practice bug) | Small / Unknown |

## What remains before public beta

The highest-leverage pre-beta fixes, in order:
1. **Issue 4** — either scope subject removal as real (not yet built) work, or explicitly decide it's out of scope for this beta; either way, the dead `POST /api/profile` endpoint's data-loss bug should be fixed or removed before anyone wires a button to it by accident.
2. **Issue 1** — add the missing loading/error state to `/settings`; currently a real "feature looks broken" trap for school students on any flaky connection.
3. **Issue 6 (practice-generation failure)** — needs its own root-cause pass; if it reproduces beyond the one test chapter, it blocks the single most-used screen in school mode.
4. **Issue 5, Issue 3, Issue 2** — small, low-risk, well-understood one-file fixes; good candidates for a quick stabilization pass once the above are triaged.

No code was changed and nothing was committed as part of this audit.
