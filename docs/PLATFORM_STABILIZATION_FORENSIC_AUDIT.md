# Platform Stabilization — Forensic Audit

**Status:** Read-only investigation. No fixes implemented. No code modified.
**Scope:** 6 reported issues across Library Mode, Lesson TTS, mode routing, subject management, School Mode visual consistency, and the Leaderboard.

---

## ISSUE 1 — Library Mode Syllabus Option "Disappeared"

**Finding: not a regression — the feature never existed as a UI selector in Library Mode.**

"Syllabus" is internal terminology used only at the AI-tutor/curriculum-context level for School Mode (board-aligned chapters). Library Mode was designed around self-paced **levels** (0–5 per subject), not syllabus selection.

- `src/app/library/page.tsx` — renders subject cards with level + progress, no syllabus selector ever rendered here.
- `src/app/api/subjects/library/route.ts` (~L29-48) — returns `currentLevel`/`targetLevel` per subject, no syllabus field.
- `src/app/api/subjects/enroll/route.ts` (~L63-72) — enrollment sets `currentLevelIndex`, no syllabus param.
- `src/lib/curriculum/subjectCatalog.ts` (~L1-14) — explicitly describes the system as level-based, not syllabus-based.
- "Syllabus" only appears in School-Mode AI context injection: `src/lib/ai/promptTeachBuilder.ts` (~L117-121), `src/app/api/learn/chat/route.ts` (~L244-259), `src/lib/education/cbseSocialScienceCatalog.ts`.

**Is syllabus data still present?** Yes, but only as School Mode curriculum metadata — never exposed as a Library Mode UI control.
**Is UI hidden / route broken / permissions issue / state persistence issue?** None of the above — there is no missing code path; the expectation itself doesn't match the architecture.

- **Severity:** Low
- **Reproduction:** Enroll in a Library subject → `/library` → only level/progress shown, no syllabus picker.
- **Recommended fix:** None required as a bug fix. If product wants a syllabus-style selector in Library Mode, that is a **new feature**, not a fix.
- **Risk:** N/A
- **Related to other issues?** Independent.

---

## ISSUE 2 — AI Continues Speaking After Window Is Closed

**Root cause: the existing cleanup (`useEffect` + `stopSpeaking()` + `speechSynthesis.cancel()`) is real but insufficient — there is a race condition in voice setup, and no tracking of in-flight utterances to verify cancellation actually took effect.**

- `src/lib/tts.ts` `_speakTextImpl()` (~L41-86): sets up voice selection via a `voiceschanged` event listener **racing** a 500ms timeout fallback (~L80-85). If the component unmounts while this race is unresolved, `window.speechSynthesis.speak(utter)` (~L77) can still fire and enter the browser's speech queue *after* cleanup already ran, because cleanup has nothing to cancel yet at that point.
- `src/lib/tts.ts` `stopSpeaking()` (~L88-92) calls `speechSynthesis.cancel()` but the code never stores a reference to the active `SpeechSynthesisUtterance`, so there is no way to confirm the specific in-flight utterance was actually the one cancelled (vs. a newer one queued after cleanup ran).
- `src/components/learn/LessonScreen.tsx` cleanup effect (~L954-956) only runs on unmount with an empty dependency array — it does not handle the case where a new `speak()` call is mid-flight (post-timeout, pre-`speak()`) at the moment of unmount.
- Browser-level nuance: `window.speechSynthesis` is global per-tab state; in Next.js App Router, client-side navigation (`router.push`) is a soft navigation, not a full page reload — so unlike a hard browser tab close, `speechSynthesis`'s internal queue is **not** automatically flushed by the browser, it depends entirely on the app calling `.cancel()` at the right time.

**Is cleanup firing?** Yes, on unmount. **Is it firing late, or is speech recreated after?** Yes — the voice-setup race can cause `speak()` to be invoked after the unmount/cleanup has already executed, creating an orphaned utterance cleanup never touches.

- **Files involved:** `src/lib/tts.ts` (L41-92), `src/components/learn/LessonScreen.tsx` (L422-430, L954-956)
- **Severity:** High
- **Reproduction:** Open `/learn?subject=...` → let AI start speaking the intro → immediately navigate away (Dashboard link/back) → audio audibly continues for ~1-2s after navigation.
- **Recommended fix (description only):** Replace the dual listener+timeout voice-setup pattern with a single deterministic path (e.g. a promise resolved exactly once); store a ref to the currently-active utterance so cleanup can target it explicitly; verify `speechSynthesis.speaking` is false after cancel as a sanity check.
- **Risk:** Medium (touches a hand-rolled async race condition; needs care to avoid silently breaking voice selection itself).
- **Related to other issues?** Independent of Issue 3 (confirmed below) — no shared code/state.

---

## ISSUE 3 — Library Mode Opens School Mode in the Background

**Root cause: mode (`?mode=library` / `?mode=school`) is enforced only at the `/dashboard` route. The `/school/[subject]/...` routes never check the mode parameter at all — they only check whether the profile has `educationBoard`/`grade` set. A user who has ever opted into School Mode (even as a GENERAL_LEARNER browsing via `/modes`) can reach and fully use `/school/*` routes directly, regardless of which mode the dashboard currently shows.**

- `src/app/dashboard/page.tsx` (~L36-44): correctly reads `?mode=` and picks Library vs. School dashboard component — this part works as intended and is **not** rendering both simultaneously (no dual-mount/CSS-hide bug found).
- `src/app/school/[subject]/page.tsx` (~L23-35) and the rest of the `/school/[subject]/...` tree: **no mode-parameter check anywhere** — only validates `profile.educationBoard && profile.grade`. Since `/api/profile/school-mode` (fixed in the prior sprint) now happily sets board/grade for any learner, that learner can navigate straight to `/school/mathematics` and fully use it — chapters, practice, lessons — entirely independent of whatever mode the dashboard last showed.
- `src/lib/dashboard/getDashboardV2Data.ts` (~L208) computes `isSchool` correctly for the dashboard's own rendering decision, but this has no bearing on direct `/school/*` navigation.

This explains the user's exact symptom: scrolling/clicking around in Library Mode, then a stray `/school/...` link or address-bar entry (or a previously-cached href) loads School Mode content "in the background" of the Library experience — it's not a rendering bug, it's a **missing route guard**, so School Mode is always reachable once board/grade exist on the profile, irrespective of the active mode.

"School subjects do NOT appear correctly on the front page" — consistent with this: the *dashboard* correctly hides School subjects in Library mode (per `getDashboardV2Data.ts`), but the routes themselves remain open, so the two surfaces disagree.

- **Files involved:** `src/app/school/[subject]/page.tsx` (~L23-35, missing mode check), `src/app/school/[subject]/chapter/[chapterId]/**` (same gap, no mode checks found anywhere under `/school`), `src/app/dashboard/page.tsx` (~L36-44, reference for correct pattern), `src/lib/dashboard/getDashboardV2Data.ts` (~L208)
- **Severity:** Medium
- **Reproduction:** As GENERAL_LEARNER, opt into School Mode via `/modes` → switch back to `/dashboard?mode=library` → manually navigate to `/school/<any-subject>` → school content loads and is fully usable, despite the dashboard being set to Library mode.
- **Recommended fix (description only):** Add a guard at the top of `/school/[subject]/page.tsx` (and ideally a shared layout for the `/school` segment) that reads `mode` and redirects to `/dashboard?mode=library` when mode is explicitly library — or, more robustly, treat `?mode=` as informational only for the dashboard and stop conflating "has board/grade set" with "is in School Mode right now" (would need a persisted `preferredMode` concept).
- **Risk:** Low — additive redirect/guard, no schema change required for the minimal fix.
- **Related to Issue 2?** No — confirmed fully independent, no shared files or state.

---

## ISSUE 4 — Remove Subject Option Missing

**Root cause: missing feature, not a regression. The schema already supports it (`ProfileSubject.isActive: Boolean @default(true)`), but no API route ever sets it to `false`, and no UI exposes a remove action.**

- `prisma/schema.prisma` — `ProfileSubject.isActive` exists, default `true`, never flipped anywhere in the codebase.
- `src/app/api/subjects/enroll/route.ts` (~L63-72) — only path that touches `ProfileSubject`; creates/re-activates, never deactivates.
- `src/app/api/subjects/` — contains only `route.ts` (GET catalog), `library/route.ts` (GET enrolled), `enroll/route.ts` (POST enroll). **No unenroll/remove endpoint exists.**
- `src/components/dashboard/v2/SubjectsGrid.tsx` (~L17-56) — subject cards are plain links, no delete affordance.
- `src/app/library/page.tsx` (~L134-144) — "Continue Learning" / "Details" only, no remove/unenroll control.

- **Severity:** High (UX gap — subjects accumulate with no way to declutter)
- **Reproduction:** Enroll in a subject → look anywhere on `/library` or `/dashboard` for a remove/unenroll control → none exists.
- **Recommended fix (description only):** Add `POST /api/subjects/unenroll` (sets `isActive: false` for the `ProfileSubject` row), add a small remove affordance to `SubjectsGrid`/library cards, and filter `isActive: false` rows out of `/api/subjects/library` responses.
- **Risk:** Medium — straightforward technically (boolean flip + filter), but requires confirming no other code path assumes all `ProfileSubject` rows for a user are active (worth a grep before implementing).
- **Related to other issues?** Independent.

---

## ISSUE 5 — School Mode Theme: Old vs. New UI Mix

**Finding: contrary to the user's impression, every School Mode surface inspected is already 100% on the candy design system. No legacy CSS variables, classnames, or non-candy components were found.**

| Screen | Classification | Evidence |
|---|---|---|
| School Dashboard | Candy Native | `src/components/dashboard/SchoolDashboard.tsx` — imports `Card, CandyButton, Pill, ProgressBar, SectionTitle, EagleMascot` from `@/components/ui/candy`; applies `tokenStyles.candyTheme`; uses `var(--candy-*)` throughout |
| Subject Page | Candy Native | `src/app/school/[subject]/page.tsx` (L11-12, L78) — candy imports + `tokenStyles.candyTheme` |
| Chapters List | Candy Native | `src/app/school/[subject]/chapters/page.tsx` (L9-10, L41) — candy imports + tokens |
| Chapter Detail | Candy Native | `src/app/school/[subject]/chapter/[chapterId]/page.tsx` (L10-12) — candy components/tokens throughout |
| Practice | Candy Native | `src/app/school/[subject]/chapter/[chapterId]/practice/page.tsx` (L8, L34) wraps `<CandyPage legacy>`; child `PracticeQuiz.tsx` (L8-9) fully candy |
| Assessment | Candy Native | `.../assessment/page.tsx` (L9, L40); child `AssessmentQuiz.tsx` (L9-10) fully candy |
| Mock Test | Candy Native | `.../mock/page.tsx` (L8, L34); child `MockTestQuiz.tsx` (L9-10) fully candy |
| Focus Page | Candy Native | `src/app/school/focus/page.tsx` (L11-12, L49) |
| Revision Notes | Candy Native | `src/components/school/RevisionNotesButton.tsx` (L6-7, L53) |
| Settings ("My School") | Candy Native | `src/app/settings/page.tsx` (L8-9, L263, L308) |
| Modes Page | Candy Native | `src/app/modes/ModesPicker.tsx` (L5-6, L62) |

Note: Practice/Assessment/Mock pages use a `<CandyPage legacy>` wrapper prop, but this is a forward-compatibility flag, not evidence of actual legacy markup — no legacy classnames/vars were found inside.

- **Severity:** Cosmetic/none — no defect found.
- **Recommendation:** If the user's perception of "mixed generations" persists, it is most likely about spacing/density/animation polish differences between screens rather than a token/component-system inconsistency — would need specific screenshots to investigate further; this is not a code-traceable bug as currently reported.
- **Risk:** N/A (no fix identified as necessary).

---

## ISSUE 6 — Leaderboard Problems

**Root cause: two real bugs in `src/app/api/leaderboard/route.ts` — missing soft-delete filtering, and incorrect tie-rank handling.**

### Bug A — Deleted users still rank (Critical)
- `src/app/api/leaderboard/route.ts` (~L47-56): the all-time leaderboard query has **no `isDeleted: false` filter**:
  ```ts
  const top = await prisma.user.findMany({
    orderBy: { xpPoints: 'desc' }, take: 10,
    select: { id: true, name: true, image: true, xpPoints: true },
  })
  const myRank = ... prisma.user.count({ where: { xpPoints: { gt: me.xpPoints } } }) + 1
  ```
  `User.isDeleted` (schema field, set by `src/app/api/user/delete-account/route.ts` on soft-delete) is never checked, so deleted accounts' XP still occupies leaderboard slots and inflates other users' rank counts.
- Weekly leaderboard (~L17-29) has the same gap — `weeklyXP` join to `user` doesn't filter `isDeleted`.

### Bug B — Tie handling (Medium)
- Rank is computed as `count(xp > mine) + 1`, which is correct for distinct-value ranking but means **two users with identical XP both compute the same rank**, and the next-lower distinct XP value's rank skips ahead correctly only by coincidence of how ties are counted — net effect: tied users collapse to one rank with no indication of the tie, and rank numbering can look inconsistent against the list length.

- **Files involved:** `src/app/api/leaderboard/route.ts` (L17-29 weekly, L47-69 all-time), `prisma/schema.prisma` (`User.isDeleted`/`deletedAt`), `src/app/api/user/delete-account/route.ts` (L36-43), `src/lib/xp.ts` (L36-46, awardXP doesn't check isDeleted), `src/app/leaderboard/page.tsx`, `src/components/dashboard/v2/LeagueCard.tsx` (inherits same bug for league top-5).
- **Severity:** Critical (data integrity / fairness — directly affects what every user sees as their rank)
- **Reproduction:** Soft-delete a high-XP account (`/api/user/delete-account`) → that user's XP still appears in `/leaderboard` top 10 and still inflates `myRank` counts for everyone below them.
- **Recommended fix (description only):** Add `isDeleted: false` to both the all-time `findMany`/`count` queries and the weekly `weeklyXP` query (filter on the joined `user.isDeleted`); for accurate tie ranking, compute rank from the count of **distinct** XP values strictly greater than the user's, not a raw row count.
- **Risk:** Low — additive WHERE-clause filters, no schema change, no migration.
- **Related to other issues?** Independent.

---

## Master Table

| Issue | Root Cause | Severity | Risk | Fix Complexity |
|---|---|---|---|---|
| 1. Syllabus option missing (Library) | Never existed — Library uses levels, not syllabi | Low | N/A | N/A (not a bug) |
| 2. AI keeps speaking after close | Race condition in TTS voice setup; no utterance ref for cleanup to verify | High | Medium | Medium |
| 3. Library opens School Mode in background | `/school/*` routes have no mode-parameter guard, only board/grade check | Medium | Low | Low |
| 4. Remove subject missing | Schema supports it (`isActive`), but no API route or UI ever implemented | High | Medium | Low-Medium |
| 5. School Mode mixed theme | Not reproducible in code — all 11 School Mode screens are 100% candy-native | Cosmetic/None | N/A | N/A |
| 6. Leaderboard bugs | Missing `isDeleted: false` filter; naive tie-rank counting | Critical | Low | Low |

## Priority Ranking

1. **Critical launch blockers**
   - Issue 6 — Leaderboard counts deleted users / mishandles ties (data integrity, visible to every user)

2. **High priority bugs**
   - Issue 2 — TTS keeps speaking after navigation (UX/trust issue, audible bug)
   - Issue 4 — No way to remove a subject (UX gap, accumulates clutter, blocks normal usage)

3. **Medium priority bugs**
   - Issue 3 — School routes reachable without mode guard while dashboard shows Library (access/consistency issue, not data-loss risk)

4. **Cosmetic / non-issues**
   - Issue 1 — Syllabus selector: by-design, not a defect
   - Issue 5 — School Mode theme: no legacy code found; if real, it's a polish/perception issue requiring screenshots to pin down further, not a traceable code defect

---

**No code was modified during this audit.** `npx tsc --noEmit` was not run since no source files were touched.
