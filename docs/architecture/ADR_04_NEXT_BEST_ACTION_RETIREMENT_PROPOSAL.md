# ADR 04 — Retire the Dead Half of `nextBestAction.ts` (PROPOSAL — AWAITING EXPLICIT APPROVAL)

> Author: Chief Systems Architect for the Educational Brain (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED, NOT EXECUTED.** No code has been changed by this ADR.
> Scope: Architecture documentation only. Zero `route.ts` changes. Zero
> code deletions. This document is the required write-up under the
> current STRICT MODE directive's rule: *"BEFORE MAKING ANY CODE CHANGE
> you MUST prove [4 conditions]. If any answer is NO: Do NOT modify code.
> Document the proposal instead."* This ADR documents the proposal; it
> does not execute it. **Implementation requires explicit user approval**
> before any file is touched.
> Resolves (proposes to resolve, pending approval):
> `ARCHITECTURE_DECISIONS.md` Finding 4 ("Two generations of
> 'Recommendation Intelligence' coexist").

---

## 1. Problem

`ARCHITECTURE_DECISIONS.md` Finding 4 names two coexisting "next
recommendation" engines (`nextBestAction.ts` vs `learningOrchestrator.ts`)
but, unlike Finding 2 (resolved by ADR 03), the original freeze never
determined which one — if either — is actually dead. This session's audit
closes that gap: it is not a clean two-engines-overlap case. It is a
**split file** — one function genuinely dead with zero live consumers
anywhere in the codebase, one function genuinely alive and load-bearing,
both exported from `src/lib/school/adaptive/nextBestAction.ts`. There is
also a second, adjacent orphan discovered during this audit:
`src/components/dashboard/SchoolDashboard.tsx`, an entire dashboard
component with zero importers anywhere in `src/`.

## 2. Evidence

**`nextBestAction.ts` (201 lines) exports four symbols.** Exhaustive
per-symbol grep across all of `src/` (not just the file's own directory):

| Export | Live callers found | Verdict |
|---|---|---|
| `getNextBestAction()` (the file's namesake 5-tier engine) | **Zero**, beyond its own definition | Dead |
| `nextActionHref()` | **Zero** | Dead |
| `NEXT_ACTION_LABELS` (this file's own export) | **Zero** — a same-named constant exists, but it is hand-duplicated locally inside `SchoolDashboard.tsx` (line 106), not imported from here | Dead |
| `getChapterNextStep()` | Two: `src/app/api/learn/chat/route.ts:417` (dynamic import, builds the chat system-prompt's compact student-status block) and `src/app/school/[subject]/chapter/[chapterId]/page.tsx:13` (drives the chapter workspace's "what's next" UI label) | **Live** |

**The one plausible consumer of the dead half is itself dead.**
`SchoolDashboard.tsx` contains a `nextAction` prop with an explicit
comment: `/* Fallback: legacy nextAction card when orchestrator returned
null */` (line 169) — this is the only place in the entire codebase that
reads like it was built to consume `getNextBestAction()`'s output shape.
An exhaustive grep for `from '@/components/dashboard/SchoolDashboard'`
and any import of the `SchoolDashboard` component across all of `src/`
returns **zero matches**. (One earlier apparent match, in
`src/tests/roleEnforcement.test.ts`, is a false positive — that file
defines an unrelated function named `canAccessSchoolDashboard`, not a
component import; confirmed by reading the file.)

**Confirmed via the actual live dashboard page.**
`src/app/dashboard/page.tsx` renders `DashboardV2`
(`src/components/dashboard/v2/DashboardV2.tsx`), not `SchoolDashboard`.
`DashboardV2`'s data function, `getDashboardV2Data()`
(`src/lib/dashboard/getDashboardV2Data.ts`), was read in full this
session: its school-mode branch sources the recommendation surface via
`getLearningNavigatorAction()` (from
`src/lib/school/navigation/learningNavigator.ts`, which itself calls
`learningOrchestrator.ts`'s `getTopRecommendation()` at line 193) —
`getDashboardV2Data.ts` contains **zero references** to
`nextBestAction`, `NextBestAction`, `nextActionHref`, or
`NEXT_ACTION_LABELS`. A grep of `DashboardV2.tsx` itself for the same
four symbols also returns zero matches. This rules out a hidden v2-era
consumer of the dead engine.

**The only three live importers of `nextBestAction.ts`, repo-wide**
(`grep -rn "nextBestAction" src/`):
1. `src/app/school/[subject]/chapter/[chapterId]/page.tsx:13` — imports `getChapterNextStep` only.
2. `src/app/api/learn/chat/route.ts:417` — imports `getChapterNextStep` only.
3. `src/lib/school/adaptive/assessmentIntelligence.ts:8` — a **comment**, not an import: `"(nextBestAction.ts). All signals are read from those existing engines;"`. This is itself a small stale-documentation finding — the comment names the wrong file. The actual live cross-engine aggregator is `learningOrchestrator.ts`, not `nextBestAction.ts`; `nextBestAction.ts`'s own aggregation logic (`getNextBestAction()`) has never been live as established above. Noted here for completeness; folded into this ADR's doc-cleanup scope rather than filed as a separate finding.

**`learningOrchestrator.ts`'s `getTopRecommendation()` is the confirmed
sole live recommendation aggregator**, with two real call sites
(`learningNavigator.ts:193`, `progressReport.ts:74`) and functional
superset coverage of `getNextBestAction()`'s 5 tiers plus 4 tiers
`getNextBestAction()` never had (`prerequisite_gap`,
`spaced_revision_due` via a different/newer engine than
`nextBestAction.ts`'s own raw `ReviewSchedule` query,
`exam_readiness_risk`, `mock_test_weakness`).

## 3. Root Cause

Same governance failure mode as ADR 03 and ADR 01 §2: `nextBestAction.ts`
(Sprint BP, "Phase 2G") was an earlier recommendation engine. A later,
broader replacement (`learningOrchestrator.ts`) was built and wired into
the live Navigator and progress-report paths without anyone retiring the
original — except this time it is messier than ADR 03's case, because one
function from the original file (`getChapterNextStep()`) is **not** part
of the superseded recommendation logic at all — it is a small, separate,
still-useful "what chapter comes next" helper that happened to live in
the same file as the dead aggregator. The dashboard layer compounds this:
`SchoolDashboard.tsx` (v1, built to surface `getNextBestAction()`'s
output as a fallback card) was itself superseded by `DashboardV2`, which
sources its recommendation data through the `learningOrchestrator.ts`
path instead — leaving `SchoolDashboard.tsx` orphaned on top of an
already-orphaned engine.

## 4. Proposed Architecture — comparing solutions

**Option A — Leave as-is, strengthen documentation only.**
Lowest effort, zero risk. Rejected as the final answer (though it is the
mandatory *interim* state until approval is given — see §9): the same
"this file reads as production-quality, doesn't announce its own
irrelevance" cost ADR 03 §4 named applies here, and `assessmentIntelligence.ts`'s
stale comment actively misdirects a future reader toward the wrong file
as "the" Recommendation Intelligence engine.

**Option B — Delete the entire `nextBestAction.ts` file.**
Rejected: would break two live call sites (`route.ts`, the chapter
workspace page) that depend on `getChapterNextStep()`. This is exactly
the kind of "one grep, declare the whole file dead" mistake ADR 03 §6
already paid down once (it nearly missed the two orphaned scripts);
treating a multi-export file as a single unit without checking each
export individually would be a regression in rigor versus ADR 03's
precedent.

**Option C — Surgically remove only the confirmed-dead exports
(`getNextBestAction()`, `nextActionHref()`, `NEXT_ACTION_LABELS`) from
`nextBestAction.ts`, keep `getChapterNextStep()` and its type
(`ChapterNextStep`) in place (file rename optional — see §9 open
question), and separately retire `SchoolDashboard.tsx` in full.**
The proposed selection, pending approval. Mirrors ADR 03's surgical
"separate genuinely-dead decision logic from genuinely-live content/
helpers" pattern, applied here to a single file with mixed live/dead
exports rather than two whole files.

## 5. Benefits (if approved and executed)

- Removes 100% of `nextBestAction.ts`'s confirmed-dead surface
  (`getNextBestAction()`'s 5-tier logic, `nextActionHref()`,
  `NEXT_ACTION_LABELS`) — likely on the order of 130–150 of the file's
  201 lines, leaving only `ChapterNextStep`/`getChapterNextStep()` and
  their direct dependencies.
- Removes one entire orphaned UI component (`SchoolDashboard.tsx`) and
  its locally-duplicated `NEXT_ACTION_LABELS` constant.
- Closes Finding 4 as resolved with the same rigor ADR 03 closed
  Finding 2, rather than leaving it as a "documented, not adjudicated"
  entry.
- Corrects the stale `assessmentIntelligence.ts` comment that currently
  misnames `learningOrchestrator.ts`'s role.

## 6. Risks

- **Risk: an undiscovered caller of `SchoolDashboard.tsx` exists via a
  dynamic import or a route this audit didn't check.** Not fully
  eliminated by this pass — only static-import grep was performed
  (consistent with ADR 03's own stated method and its §6 confirmation
  that this codebase's convention is static imports throughout, no
  dynamic `require()`/templated-path imports found anywhere targeting
  dashboard components). Should be re-verified immediately before any
  deletion, not assumed from this document alone.
- **Risk: `getChapterNextStep()`'s continued residence in a file named
  `nextBestAction.ts` is confusing once the "next best action" engine is
  gone from it.** A rename (e.g. to `chapterNextStep.ts`) would resolve
  this but touches two live import sites (`route.ts`,
  the chapter workspace page) — a larger blast radius than a pure
  deletion. Left as an explicit open question in §9, not bundled into
  this proposal's default scope.
- **Risk: deleting `SchoolDashboard.tsx` loses a previously-built UI
  surface that some future product decision might want to revive.**
  Standard git-history mitigation applies (full file content recoverable
  at any prior commit) — same mitigation pattern ADR 03 §6 used for the
  deleted Teaching Action Engine files.

## 7. Backward Compatibility

Fully preserved for the live system if executed as scoped: no route,
API contract, or database schema references any of the four proposed-dead
symbols. `getChapterNextStep()` and `ChapterNextStep` are explicitly
excluded from this proposal's deletion scope and would be carried forward
unchanged (in place, or relocated only if the optional rename in §9 is
separately approved).

## 8. Validation Strategy (if approved and executed)

Same method ADR 03 used, since it is the established precedent for this
class of change:
- `grep -rn "getNextBestAction\b\|nextActionHref\b\|NEXT_ACTION_LABELS\b" src/` after deletion → zero matches outside the edited file itself.
- `grep -rn "SchoolDashboard"` after deletion → zero matches (confirms no missed caller before deletion, repeated immediately before execution per the §6 risk note).
- `npx vitest run` — full suite must pass with an identical pass count to the pre-change baseline.
- `npx tsc --noEmit`, diffed against the pre-change baseline error count via `git stash`/`git stash pop` — must show zero new errors.
- Manual `git diff --stat` review before commit to confirm only the
  intended files are touched.

## 9. Implementation Plan (PROPOSED — DO NOT EXECUTE WITHOUT EXPLICIT APPROVAL)

Per the current STRICT MODE directive's four-condition gate:

1. *Can the architecture be improved using documentation alone?* No —
   the dead code itself, not just its description, is the cost (same
   reasoning ADR 03 §4 Option A already rejected for an identical shape
   of problem).
2. *Is the change required to preserve architectural integrity?* Yes —
   leaving a fully-dead 5-tier engine and an orphaned UI component in
   place is exactly the "ambiguous between two implementations" hazard
   ADR 03 §5 named as the core harm of this class of finding.
3. *Does the change overlap with the Curriculum Production Pipeline?*
   No — zero subject content, zero KG/curriculum files touched; this is
   pure adaptive-engine/UI infrastructure.
4. *Does the change alter production behavior?* No, by the zero-caller
   evidence in §2 — but this is exactly the condition the directive
   singles out for the highest scrutiny ("DO NOT MODIFY... unless I
   explicitly approve" lists "Runtime behavior" and implicitly anything
   under `src/components/` and `src/lib/school/adaptive/` as
   approval-gated categories), and a UI component deletion in particular
   touches a domain (`src/components/dashboard/`) adjacent to the
   standing CLAUDE.md constraint "Do NOT redesign UI, navigation."
   Deleting a confirmed-unrendered component is not a redesign, but it
   is visible/UI-adjacent enough that this ADR treats condition 4 as
   **requiring explicit user sign-off before execution**, not as
   self-clearing from grep evidence alone.

**Proposed steps, awaiting approval:**
1. Delete `getNextBestAction()`, `nextActionHref()`, and
   `NEXT_ACTION_LABELS` from `src/lib/school/adaptive/nextBestAction.ts`,
   plus any now-unused local types/imports those three alone required
   (keep `ChapterNextStep`/`getChapterNextStep()` and their dependencies
   untouched).
2. Delete `src/components/dashboard/SchoolDashboard.tsx` in full.
3. Fix the stale comment in `src/lib/school/adaptive/assessmentIntelligence.ts`
   (line ~8) to name `learningOrchestrator.ts` instead of `nextBestAction.ts`.
4. **Open question, not yet decided, separate approval needed if pursued:**
   rename `nextBestAction.ts` → `chapterNextStep.ts` (or similar) once it
   only contains the chapter-next-step helper, and update its two live
   import sites accordingly. Not bundled into the default proposal because
   it touches two live call sites for a naming-only benefit.
5. Update `ARCHITECTURE_DECISIONS.md` Finding 4, `ENGINE_REFERENCE.md`
   Engine 22, and `DEPENDENCY_RULES.md`'s Recommendation cluster section
   to reflect the resolution, following the ADR 03 precedent structure.
6. Run the full validation strategy in §8 before committing.

**This ADR does not execute steps 1–4.** It is the documentation
artifact STRICT MODE requires in place of execution when condition 4
cannot be unilaterally cleared. Execution is blocked pending the user's
explicit go-ahead, to be requested in this session's end-of-turn report.

## 10. Future Impact

If approved, this closes Finding 4 with the same rigor Finding 2 was
closed by ADR 03, and additionally surfaces and resolves the adjacent
`SchoolDashboard.tsx` orphan that the original freeze never identified.
If not approved, this document stands as the permanent record of the
evidence and proposed resolution, supersedable only by a future explicit
decision — consistent with STRICT MODE's "if uncertain, document first"
philosophy.
