# Platform Stabilization — Sprint A (Critical Bug Fixes)

Implements the 4 confirmed bugs from `docs/PLATFORM_STABILIZATION_FORENSIC_AUDIT.md`. No redesign, no layout/color changes, no unrelated refactoring.

---

## FIX 1 — Leaderboard Data Integrity

**Root cause recap:** `src/app/api/leaderboard/route.ts` never filtered `User.isDeleted`, so soft-deleted accounts still occupied leaderboard slots and inflated other users' rank counts. Rank was also computed as a raw `count(strictly greater) + 1`, which is correct for distinct values but the rendered list used `index + 1` for display rank — inconsistent with tied entries.

**Files modified:**
- `src/app/api/leaderboard/route.ts`
- `src/lib/dashboard/getDashboardV2Data.ts` (League card on the dashboard pulls from the same `weeklyXP` table — had the identical gap)

**Before → After:**
- All-time query: `prisma.user.findMany({ orderBy... })` → added `where: { isDeleted: false }`; `myRank` count → added `isDeleted: false`; `me` lookup now also checks `me.isDeleted` before computing a rank.
- Weekly query: `prisma.weeklyXP.findMany({ where: { week } })` → added `user: { isDeleted: false }`; `myRank` count → added the same filter on the joined user.
- `getDashboardV2Data.ts` League card: same `isDeleted: false` filter added to its `weeklyXP.findMany` and rank `count`.

**Tie handling — documented and fixed:**
- Previous behavior: list rank was simply `index + 1` in the sorted array, so two users tied at the same XP got *different* displayed ranks (e.g. 3 and 4) even though `myRank` (computed separately via `count(gt) + 1`) would have given both of them the same number — an inconsistency between the "my rank" value and the visible list.
- New behavior: **standard competition ranking ("1224")** — implemented via a `denseRank()` helper (leaderboard route) and an inline equivalent (dashboard League card): an entry's rank is the 1-based position of the *first* entry sharing its XP value in the descending-sorted list. Two users tied at the same XP now show the same rank number, and the next distinct (lower) XP value's rank reflects how many higher-or-equal entries precede it — matching the `count(strictly greater) + 1` formula already used for `myRank`.
- XP calculation itself (`src/lib/xp.ts`) was **not touched**, per instructions.

**Verification steps:**
1. Soft-delete a test account with high XP (`POST /api/user/delete-account`) → confirm it no longer appears in `GET /api/leaderboard?mode=alltime` or `?mode=week`, and no longer inflates another user's `myRank`.
2. Give two test users identical weekly XP → confirm both show the same `rank` value in the `entries` array from `GET /api/leaderboard?mode=week`, and the dashboard League card shows the same tie.

---

## FIX 2 — TTS Race Condition

**Root cause recap:** `src/lib/tts.ts` resolved the voice to use via a race between a `voiceschanged` event listener and a 500ms fallback `setTimeout`. If the calling component unmounted (and called `stopSpeaking()`) while that race was still pending, the delayed callback could still invoke `window.speechSynthesis.speak(utter)` *after* cleanup had already run — producing audio that survives navigation, with no reference anywhere to cancel it.

**Files modified:**
- `src/lib/tts.ts`

**Before → After:**
- Added a module-level `ttsGeneration` counter.
- `_speakTextImpl()` now captures `myGeneration = ++ttsGeneration` at call time; the deferred `setVoice()` callback (both the `voiceschanged` listener and the fallback timeout) now checks `myGeneration !== ttsGeneration` and no-ops if a newer call (or a `stopSpeaking()`) has superseded it.
- `stopSpeaking()` now increments `ttsGeneration` *before* calling `speechSynthesis.cancel()`, immediately invalidating any pending deferred callback from a previous `speakText()` call, in addition to cancelling whatever is already speaking/queued.
- No change to voice/pitch/rate selection logic, no change to the public `speakText`/`stopSpeaking` signatures — purely closes the race.

**Verified scenarios (per audit's required list) — all now route through the same generation-guarded `stopSpeaking()`/`speakText()` pair, called from `LessonScreen.tsx`'s existing unmount cleanup (`useEffect(() => () => stopSpeaking(), [])`, line ~956) and `handleStopSpeech`/`handleVoiceChange`:**
1. Leaving the lesson (component unmount) → cleanup effect calls `stopSpeaking()` → generation bumped → any pending voice-resolution callback is now a no-op even if it fires later.
2. Changing subject → `/learn` remounts `LessonScreen` → old instance unmounts → same cleanup path as #1.
3. Opening another lesson → same as #2.
4. Route changes → component unmounts → same cleanup path as #1.
5. Component unmounts generally → covered by the existing `useEffect` cleanup, now made effective by the generation guard.

**Goal stated in the task — `speechSynthesis.speaking === false` after cleanup:** `stopSpeaking()` calls `speechSynthesis.cancel()` synchronously, which stops in-progress speech immediately; the generation guard additionally prevents anything from starting speech again afterward from a stale deferred callback.

**No behavior changes beyond the bug fix** — voice selection, pitch/rate/speed, and the public API are unchanged.

---

## FIX 3 — School Route Mode Leak

**Root cause recap:** `?mode=library` / `?mode=school` was only enforced by `src/app/dashboard/page.tsx`. The `/school/[subject]/...` route tree never checked the mode parameter — only `profile.educationBoard`/`grade` — so a learner who ever opted into School Mode could reach and fully use `/school/*` directly regardless of the dashboard's active mode.

**Approach taken:** Next.js layouts do not receive a `searchParams` prop (only `page.tsx` components do), so a shared `layout.tsx` could not perform this check on its own. Instead, a single centralized helper was added and called once at the top of every `/school/*` page — logic lives in exactly one place, not duplicated.

**Files modified:**
- `src/lib/school/schoolRouting.ts` — added `isLibraryModeRequest(searchParams)` helper (the one place the actual check lives)
- `src/app/school/[subject]/page.tsx`
- `src/app/school/[subject]/chapters/page.tsx`
- `src/app/school/[subject]/chapter/[chapterId]/page.tsx`
- `src/app/school/[subject]/chapter/[chapterId]/practice/page.tsx`
- `src/app/school/[subject]/chapter/[chapterId]/assessment/page.tsx`
- `src/app/school/[subject]/mock/page.tsx`
- `src/app/school/focus/page.tsx`

**Before → After (same pattern in all 7 files):**
```ts
// Before
export default async function SchoolSubjectPage({ params }: { params: { subject: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  // ... no mode check, only board/grade check below

// After
export default async function SchoolSubjectPage({ params, searchParams }: { params: { subject: string }, searchParams?: Record<string, string | string[] | undefined> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  if (isLibraryModeRequest(searchParams)) redirect('/dashboard?mode=library')
  // ... existing board/grade check unchanged below
```
Board/grade access logic, curriculum logic, and the School/Library separation itself were **not changed** — this only adds an explicit redirect when `?mode=library` is present on a `/school/*` URL.

**Verification steps:**
1. As a learner with both Library and School access, visit `/dashboard?mode=library`.
2. Manually navigate to `/school/<any-enrolled-subject>?mode=library` → now redirects to `/dashboard?mode=library` instead of loading school content.
3. Visit `/school/<subject>` (no mode param, or `?mode=school`) → loads normally, unaffected.
4. `/dashboard?mode=school` → School Mode links (which don't append `?mode=library`) continue to work unchanged.

---

## FIX 4 — Subject Removal

**Root cause recap:** `ProfileSubject.isActive` already existed in the schema (default `true`) but was never set to `false` anywhere, and no UI exposed a remove action — `/api/subjects/enroll` was the only route touching `ProfileSubject`.

**Files added:**
- `src/app/api/subjects/unenroll/route.ts` — `POST { subjectSlug }`, validates the subject is enrolled and active, sets `isActive: false`. Never deletes the `ProfileSubject` row, never touches `LearningPath`, `StudentProgress`, or any session/progress history.
- `src/components/library/RemoveSubjectButton.tsx` — small client button with a `window.confirm()` gate, calls the new endpoint, then `router.refresh()`.

**Files modified:**
- `src/app/api/subjects/library/route.ts` — the enrolled-subjects map was built from *all* `ProfileSubject` rows including inactive ones, so a removed subject would still show as "Enrolled". Fixed to filter `.filter((ps) => ps.isActive)` before building the map.
- `src/lib/dashboard/getDashboardV2Data.ts` — the dashboard's `subjects` relation query had the same gap; added `where: { isActive: true }` to the `subjects` include so removed subjects disappear from "My Subjects".
- `src/app/library/page.tsx` — same `isActive` filter applied to `profile.subjects`/`enrolledSlugs`; added `<RemoveSubjectButton>` next to "Continue Learning"/"Details" on each enrolled subject card.
- `src/components/dashboard/v2/SubjectsGrid.tsx` — converted to a client component; each subject card now has a small "✕" remove button (top-right corner, confirmation via `window.confirm()`) in addition to its existing click-through link. No visual/layout change to the card itself — same classes, same structure, only an absolutely-positioned button added.

**Re-enrollment behavior (unchanged, verified):** `POST /api/subjects/enroll` already used `prisma.profileSubject.upsert(...update: { isActive: true })`, so re-adding a removed subject reactivates the *same* row — `currentLevelIndex`, `targetLevelIndex`, and all `StudentProgress`/`LearningPath` history tied to that subject are preserved untouched. No changes were needed to the enroll route for this to work correctly.

**Verification steps:**
1. Enroll in a subject → appears on `/dashboard` and `/library` as enrolled, with progress.
2. Click remove (✕) on the dashboard card, or "✕" on the library card → confirm dialog → on confirm, subject disappears from both "My Subjects" and the library's enrolled state (shows "+ Add Subject" again).
3. Re-add the same subject via `/library` → it reappears with the **same** level/progress as before removal (not reset to 0).
4. Confirm `StudentProgress`/`LearningPath` rows for that subject were never deleted at any point (only `ProfileSubject.isActive` toggled).

---

## Build Results

```
npx tsc --noEmit   → 0 errors
npm run build      → succeeded, 0 new errors (all routes compiled, including new /api/subjects/unenroll)
```

## Out of Scope — confirmed untouched

Homepage, dashboard redesign, school redesign, admin redesign, auth redesign, curriculum, AI prompts, XP calculation logic (`src/lib/xp.ts`), recommendation engine, subject catalogs, board catalogs, progress algorithms. Board/grade access and the School/Library separation model itself were not changed — only the missing route guard was added.

---

**Stopping after implementation, per instructions. No Sprint B.**
