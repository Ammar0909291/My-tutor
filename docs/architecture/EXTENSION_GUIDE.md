# Extension Guide — Educational Brain v1.0

How to extend the Educational Brain without architectural drift. Every
rule below is derived from a pattern the codebase already uses
consistently — extension means following that pattern, not inventing a
new one.

The governing principle: **future phases extend this architecture; they
do not replace it.** If a change requires modifying the Teaching Engine's
frozen types, or merging two engines that currently have separate
ownership, stop and treat it as an architectural decision requiring
explicit approval — not a routine extension.

---

## 1. Adding a new school subject

Follow the pattern already used for mathematics/physics/chemistry/
computer_science/biology:

1. Author `docs/{subject}/kg/graph.json` — canonical 10-field schema only
   (`id, name, requires, unlocks, cross_links, difficulty, bloom,
   mastery_threshold, estimated_hours, description`). Never add `domain`
   or `concept_type` — those are derived at runtime.
2. Run `npx tsx scripts/validate-knowledge-graph.ts docs/{subject}/kg/graph.json`
   until it passes (or passes with only INFO-level warnings).
3. Add one entry to `SUBJECT_ADAPTERS` in
   `src/lib/curriculum/knowledgeGraph.ts`.
4. (Optional) Author `docs/{subject}/teaching-assets/assets.json` and add
   one entry to `TEACHING_ASSET_ADAPTERS` in
   `src/lib/curriculum/teachingAssets.ts` — only if you intend to wire up
   the Teaching Assets Platform (currently orphaned; see
   `ARCHITECTURE_DECISIONS.md`). Most subjects do not need this.
5. **Do not** write new adapter code, new validator code, or new Teaching
   Engine branches. If you find yourself writing subject-specific
   `if (subjectSlug === '...')` logic anywhere outside a registry array,
   that is a sign the new subject doesn't fit the generic adapter pattern
   — stop and reconsider, don't special-case it.
6. Knowledge Graphs for the five existing subjects are frozen — do not
   modify them while adding a new one.

## 2. Adding a new intelligence engine (satellite, advisory)

Follow the pattern used by the 8 teaching-support satellites and the 9
Recommendation-cluster engines:

1. New file under `src/lib/school/adaptive/`.
2. Export an async data function (`getXxx(userId, ...)`) that reads from
   Prisma/the KG only — no LLM call, no new Prisma model unless the
   signal genuinely doesn't fit an existing one.
3. Export a `buildXxxBlock(...)`-style function that renders a fixed,
   template-based advisory string — never invented prose.
4. Wire it into `api/learn/chat/route.ts` as a new dynamically-imported,
   `try`/`catch`-wrapped block that appends to `systemPrompt`. Follow the
   existing non-fatal pattern exactly: a failure in the new engine must
   degrade to "skip this block," never block the turn or throw past the
   route handler.
5. **Never** make the new engine callable from the Teaching Engine, TAG,
   or Lesson Composer (see `DEPENDENCY_RULES.md`) — those three must stay
   dependency-free of everything downstream of them.
6. If the new engine needs a name that already exists for a different
   purpose (e.g. don't call something else `LessonPlan` or
   `buildLessonPlanBlock`) — check `ENGINE_REFERENCE.md`'s naming-overlap
   findings first and pick a distinct name. This freeze documents two
   existing overlaps as historical findings; it does not bless a third.

## 3. Adding a new visual engine / visual type

1. Add the new value to the `VisualType` union in
   `src/lib/school/visuals/visualTypes.ts`, plus its `VISUAL_META` entry.
2. Add detection logic to `detectVisual()` in `detectVisual.ts` — keyword/
   subject-based, deterministic, no LLM.
3. If it's a 3D engine type, prefix it `three_` to match the existing
   convention (50+ existing `three_*` values).
4. Do not create a second visual-type union elsewhere. `VisualType` is the
   single source of truth — TAG, Lesson Composer, and the chat route all
   read it via `detectVisual()`/the `VisualType` import, never redefine it.

## 4. Adding a new assessment type

1. Extend `AssessmentType` in `assessmentIntelligence.ts`
   (currently `guided | standard | challenge | reassessment`).
2. Add the corresponding entry to `MASTERY_CHECK_BLOOM` in
   `lessonComposer.ts` (the `Record<NonNullable<AssessmentDecision
   ['assessment_type']>, string>` table is exhaustive over this union —
   the compiler will catch a missing entry).
3. Consider whether `mapActionType()` in `teachingActionGenerator.ts`
   needs a new branch (it currently special-cases `assessmentType ===
   'challenge'`) — only add a branch if the new type genuinely changes
   *how* a turn should be taught, not just *whether* an assessment fires.
4. Do not duplicate this enum into `subjectValidator.ts`'s
   `AssessmentRequirement.type` — that field is a separate, intentionally
   independent structural-requirement vocabulary (see `ENGINE_REFERENCE.md`
   §9). Keep them decoupled.

## 5. Adding a new teaching action type

1. Confirm the target: `teachingActionGenerator.ts`'s `TeachingActionType`
   (TAG, 10 values, live/wired) is the **only** `TeachingActionType` in
   the codebase as of 2026-06-30; the duplicate 15-value vocabulary
   formerly in `teachingActionEngine.ts` was retired (see
   `ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`).
2. Add the new value to `TeachingActionType` in
   `teachingActionGenerator.ts`.
3. Add a branch to `mapActionType()` (first-match-wins; insert it at the
   correct priority position, don't just append at the end without
   checking what it would shadow).
4. Add entries to `INTERACTION_LEVEL` and `BLOOM_FALLBACK` — both are
   `Record<TeachingActionType, ...>`, so TypeScript will fail to compile
   until both are updated.
5. Add a `case` to the exhaustive `switch` in `buildCoreStages()` in
   `lessonComposer.ts` — this is also a compiler-enforced exhaustiveness
   check (`const _exhaustive: never = action.action_type`). Decide which
   stage(s) the new action type composes into.
6. Add a label to `ACTION_LABEL` in `teachingActionGenerator.ts` and
   `STAGE_LABEL` in `lessonComposer.ts` if you added a new stage type too.

## 6. Adding a new Student Memory signal

1. Decide whether the signal is **read-derived** (computed from existing
   Prisma models, like `WeakConcept`) or needs a **new persisted field**.
2. If read-derived: add it to `LearnerMemory` in `src/lib/memory/types.ts`,
   compute it in `service.ts`'s `aggregate()`, and project it into
   `TeachingMemorySnapshot` only if the Teaching Engine actually needs it
   (not every `LearnerMemory` field needs to reach the Teaching Engine).
3. If it needs new persisted state: add the column/model to
   `prisma/schema.prisma`, write to it **only** from
   `src/lib/memory/update-pipeline.ts` (idempotent `upsert`, fire-and-
   forget per the existing pattern), and never let any other engine write
   to that model. Student Memory must remain the sole writer of
   longitudinal learner state.
4. Run `npx prisma db push` (no migration files in this project) and
   `npx prisma generate` after any schema change.

## 7. Adding a new recommendation signal

1. New file under `src/lib/school/adaptive/`, same shape as the existing
   Recommendation cluster (read-only Prisma queries, deterministic
   priority/scoring logic, a `buildXxxBlock` or summary renderer).
2. If it should feed the cross-engine aggregator, add a tier to
   `learningOrchestrator.ts`'s 8-tier priority chain at the correct
   priority position — don't just append at the bottom without
   considering precedence against the existing 8 tiers.
3. Never give a Recommendation-cluster engine the ability to evaluate
   mastery itself — it must call into Mastery Intelligence's already-
   computed conclusion, never recompute mastery independently (see the
   permanent rule in `ARCHITECTURE_DECISIONS.md`).
4. Never make the Teaching Engine, TAG, or Lesson Composer depend on a
   Recommendation-cluster output.

## 8. What never changes without an explicit new architecture decision

- The Teaching Engine's `ActionType`/`TeachingMode`/`TrackLevel`/
  `ConceptType` unions and `TeachingDecision`/`StudentState`/`ConceptNode`
  shapes — frozen.
- The canonical 10-field KG schema.
- The rule that Student Memory is the only writer of `RetentionMetric`/
  `ReviewSchedule`.
- The rule that the AI Router is the only probabilistic component.
- The dependency direction in `DEPENDENCY_RULES.md` — no engine may
  acquire a new dependency that would create a cycle.

If a future requirement genuinely cannot be satisfied within these rules,
that is itself the signal to write a new, explicit architecture-decision
document (following the format in `ARCHITECTURE_DECISIONS.md`) rather than
quietly bending a frozen interface.
