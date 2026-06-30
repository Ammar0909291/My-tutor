# ADR 03 — Retire the Orphaned Teaching Action Engine

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **DECIDED, EXECUTED**
> Scope: Educational Brain infrastructure cleanup only. Zero `route.ts`
> changes. Zero curriculum/concept/KG/teaching-content changes — see §6
> for why the Teaching Assets Platform half is explicitly excluded from
> this ADR's execution.
> Resolves: `ARCHITECTURE_DECISIONS.md` Finding 2 ("An orphaned,
> fully-built 'Teaching Action Engine' predates and overlaps TAG").
> Operating under the standing "Educational Brain Architect — Architecture
> Only" directive: no production runtime changes, audit → compare
> solutions → select simplest → document → execute → validate.

---

## 1. Problem

Two independent "decide HOW to teach this concept right now" engines
exist in the codebase:

1. **`src/lib/school/adaptive/teachingActionGenerator.ts`** (Teaching
   Action Generator / TAG, Phase 3A) — statically imported into
   `src/app/api/learn/chat/route.ts`, runs for **every** chat turn,
   school and Library alike. The live system.
2. **`src/lib/curriculum/teachingActionEngine.ts`** (`decideAction()`) —
   a second, never-imported implementation of the same responsibility,
   first authored 2026-06-29 (commit `d446b45`), pre-dating its own
   discovery as dead code by one day.

Both consume a `TeachingDecision` + `ConceptNode` and emit a structured
"how to present this" plan. They are not alternate code paths for the
same feature — `teachingActionEngine.ts` has never executed against a
single real chat turn. Carrying two implementations of the same
responsibility, one live and one decorative, is a standing maintenance
and onboarding hazard: a future engineer searching for "where teaching
actions are decided" can land on either file with no compiler signal
that one of them is inert.

## 2. Evidence

**Zero callers, exhaustively confirmed.** Ran `grep -rn` for
`decideAction\b`, `getTeachingAsset\b`, `getTeachingAssets\b`, and a
file-import grep for all five module paths
(`teachingActionEngine`, `teachingActionSchema`, `teachingAssetSchema`,
`teachingAssetAdapter`, `teachingAssets`) across the entirety of `src/`,
including `src/tests/`. The only matches are the files' own internal
cross-references (`teachingActionEngine.ts` imports `teachingActionSchema.ts`
and reads the `TeachingAsset` type from `teachingAssetSchema.ts`) and
documentation. No route handler, no UI component, no test file imports
`decideAction()` or its schema.

**Incompatible, duplicated taxonomy.**

| | TAG (live) | `teachingActionEngine.ts` (orphaned) |
|---|---|---|
| `TeachingActionType` | 10 values, lowercase-snake (`visual_explanation`, `worked_example`, `interactive_question`, `guided_derivation`, `simulation`, `analogy`, `misconception_fix`, `experiment`, `recap`, `challenge_problem`) | 16 values, UPPER_SNAKE (`VISUAL_EXPLANATION`, `INTERACTIVE_DIAGRAM`, `ANIMATION`, `SIMULATION`, `WORKED_EXAMPLE`, `GUIDED_PROBLEM_SOLVING`, `SOCRATIC_QUESTIONING`, `CONCEPT_COMPARISON`, `TIMELINE`, `ANALOGY`, `EXPERIMENT_DEMONSTRATION`, `PRACTICE_SESSION`, `RETRIEVAL_PRACTICE`, `MISCONCEPTION_INTERVENTION`, `RAPID_REVIEW`, `ASSESSMENT`) |
| Output shape | `{ action_type, presentation_mode, visual_type, interaction_level, estimated_minutes, objective, bloom_level, prerequisites_to_review }` | `{ action_id, concept_id, action_type, presentation_mode, difficulty_level, estimated_duration, objective, required_prerequisites, visual_requirements, interaction_requirements, assessment_trigger, completion_criteria }` |
| Visual taxonomy | Reuses `detectVisual()` from `school/visuals/detectVisual.ts` (single source of truth, shared with the rest of the live pipeline) | Re-derives its own `visual_requirements: string[]` independently |
| Extra dependency | None | Requires a `TeachingAsset` lookup (see §6) that TAG has no equivalent of |

**Git history confirms no functional evolution since authoring.**
`git log --follow -- src/lib/curriculum/teachingActionEngine.ts` shows
three touches: the original authoring commit (`d446b45`), and two later
commits (`584e7a7`, `0084748`) that only added an archive-status header
comment — zero logic changes in either. The file has been inert,
unmodified, dead code for the entirety of its existence past day one.

**Already documented, never executed.** `ARCHITECTURE_DECISIONS.md`
Finding 2 (written by a concurrent session during the EDUCATIONAL_BRAIN_V1
freeze) and `EDUCATIONAL_BRAIN_CONSOLIDATION.md` §5 (ADR 01) both
independently identified this orphan and both explicitly deferred a
decision: "Recommendation for a future, separately-approved phase: either
(a) formally retire this subsystem, or (b) evaluate whether its richer
`TeachingAsset` data... should feed TAG instead." That future,
separately-approved phase is this ADR.

## 3. Root Cause

Two unrelated work sessions each independently built a "HOW to teach"
decision layer without first searching for prior art — the same
governance failure mode ADR 01 §2 already named for the Eb* pipeline vs.
the canonical Teaching Engine. `teachingActionEngine.ts` was built one
day before (or alongside) `teachingActionGenerator.ts` was wired live,
and nothing ever pointed traffic at the older one. No deletion happened
afterward because no one was assigned to clean up a "this turned out to
be redundant" outcome — it just accumulated an archive-comment band-aid
across two later passes instead of a resolution.

## 4. Proposed Architecture — comparing solutions

**Option A — Leave as-is, strengthen documentation only.**
Lowest effort, zero risk. Rejected: this is the status quo from two prior
passes already; a third pass adding more words to the same comment
doesn't resolve the underlying duplication, and the dead code keeps
costing future-reader attention indefinitely (the file reads as
production-quality, schema-validated, real-looking infrastructure — it
does not announce its own irrelevance without reading the header).

**Option B — Merge the 15-value taxonomy into TAG, revive
`decideAction()`'s richer logic.**
Rejected for now: TAG's 10-value taxonomy is deliberately the live
contract — `mapActionType()`, `INTERACTION_LEVEL`, and `BLOOM_FALLBACK`
in `teachingActionGenerator.ts` are all `Record<TeachingActionType, ...>`
exhaustively keyed on the 10-value union, and TAG's `visual_type` already
delegates to the shared `detectVisual()` taxonomy rather than maintaining
its own. Merging in 6 additional action values plus a parallel
`visual_requirements`/`interaction_requirements` string-array convention
would touch `teachingActionGenerator.ts` (a live, route-wired file) and
is exactly the kind of runtime-feature redesign the current standing
directive instructs against ("Do NOT redesign stable systems... Only
implement code when it belongs exclusively to the Educational Brain
infrastructure and does not overlap with curriculum production"). It
also is not obviously simpler — TAG's smaller taxonomy plus single shared
visual-detection source is the more disciplined design of the two
(no duplicated visual vocabulary), so adopting the orphan's larger
vocabulary would be a regression in design quality, not an improvement.

**Option C — Delete `teachingActionEngine.ts` and its private schema
(`teachingActionSchema.ts`); leave the `TeachingAsset` content layer
untouched and undecided.** Selected. Simplest long-term solution:
removes 229 lines of confirmed-dead decision logic with zero behavioral
risk (nothing imports it), eliminates the duplicate-taxonomy confusion
permanently rather than re-documenting it a third time, and correctly
separates two different kinds of "orphaned" that Finding 2 had
conflated:
- `teachingActionEngine.ts` / `teachingActionSchema.ts` are pure
  **decision logic** — zero subject content, just TypeScript/Zod shapes.
  Deleting them is infrastructure hygiene, not a curriculum decision.
- `teachingAssetSchema.ts` / `teachingAssetAdapter.ts` / `teachingAssets.ts`
  back onto **real curriculum content** (misconceptions, worked-example
  blueprints, concept summaries — substantial real data already on disk
  for all five subjects). Under the current standing directive ("MUST
  NOT generate or modify... Teaching content... Misconceptions") and the
  "Canonical Knowledge Graph as an external dependency... do not build
  it, do not modify it" framing now governing this session, a decision
  to wire this content into a live route is out of scope for an
  architecture-only pass and is more appropriately a question for
  whichever session owns curriculum production going forward (it already
  produced this exact data). This ADR leaves that code and data
  completely untouched and records its status as an open question (§6)
  rather than deciding it unilaterally.

## 5. Benefits

- Removes the only place in the codebase where "the Teaching Action
  Engine" is ambiguous between two incompatible types — the next
  engineer who greps `TeachingActionType` now finds exactly one
  definition.
- Net negative line count (-229 lines) with zero behavior change —
  verified zero-caller, so no chat turn, test, or build target observes
  any difference.
- Closes Finding 2 as **resolved** rather than carrying it as a fourth
  "documented, not fixed" entry into a fourth future freeze.
- Establishes a reusable precedent for how this session resolves a
  "documented, deferred" finding going forward: read the evidence, pick
  the simplest option, execute it as a self-contained ADR, update the
  ledger — rather than re-deferring indefinitely.

## 6. Risks

- **Risk: the `TeachingAsset` content data becomes harder to discover
  once its decision-engine consumer is gone.** Mitigated: the content
  schema, adapter, and registry (`teachingAssetSchema.ts`,
  `teachingAssetAdapter.ts`, `teachingAssets.ts`) are left fully intact
  and still exported (`getTeachingAsset`, `getTeachingAssets`,
  `getTeachingAssetById`) — only their one dead consumer is removed. The
  data and its loader remain a working, documented, zero-new-code-per-subject
  content contract, available for a future session (school or curriculum
  side) to wire into TAG or any other consumer, exactly as before this
  ADR, just without a second redundant decision engine sitting on top of
  it.
- **Risk: deleting code loses historical/reference value.** Mitigated:
  `docs/TEACHING_ACTION_ENGINE_REPORT.md` (the original production report,
  written 2026-06-29) is kept as a historical record with a retirement
  notice added at the top, not rewritten or deleted — the design rationale
  and full schema are preserved in prose even after the code is gone. Git
  history also fully preserves the deleted files at every prior commit.
- **Risk: an undiscovered caller exists that grep missed (e.g. dynamic
  `require()` with a templated path).** Checked: both files only ever
  exported named functions/types consumed via static `import` elsewhere
  in this codebase's conventions (confirmed by reading every other
  engine's import style in `route.ts`); no dynamic-path `require`/`import`
  pattern targeting `curriculum/teachingAction*` exists anywhere in `src/`.

## 7. Backward Compatibility

Fully preserved. No external API, database schema, or route contract
referenced these files. `getTeachingAsset()` / `getTeachingAssets()` /
`getTeachingAssetById()` (the content-layer functions in
`teachingAssets.ts`) are unchanged and continue to work exactly as
before — this ADR does not touch them. The only consumers of the deleted
files were the deleted files' own internal references to each other.

## 8. Scalability Analysis

Not applicable in the traditional sense (no runtime load, no new
subjects, no new data) — but worth noting for completeness: removing a
duplicate decision-engine taxonomy reduces the surface area a future
"add a new teaching action type" change has to consider. Before this
ADR, `EXTENSION_GUIDE.md` §5 already had to carve out an explicit warning
("not in the orphaned `teachingActionEngine.ts`'s separate 15-value
vocabulary") for anyone adding a new action type — that warning is no
longer needed once there is only one `TeachingActionType` in the
codebase, which is a small but real reduction in the cognitive load of a
recipe every future subject/feature addition will re-read.

## 9. Implementation Plan

1. Delete `src/lib/curriculum/teachingActionEngine.ts` (169 lines).
2. Delete `src/lib/curriculum/teachingActionSchema.ts` (60 lines) — its
   sole importer in `src/` was the file deleted in step 1.
2b. Delete `scripts/test-teaching-action-engine-integration.ts` (126
   lines) and `scripts/validate-teaching-action-engine.ts` (172 lines) —
   discovered via a full-repo `tsc --noEmit` diff (the original grep was
   scoped to `src/` only and missed `scripts/`); both standalone scripts
   existed exclusively to exercise `decideAction()`, have no other
   purpose, and are not referenced by `package.json` or any CI step.
3. Leave `teachingAssetSchema.ts`, `teachingAssetAdapter.ts`,
   `teachingAssets.ts`, and `docs/{subject}/teaching-assets/assets.json`
   completely untouched.
4. Add a short retirement notice to the top of
   `docs/TEACHING_ACTION_ENGINE_REPORT.md` (the original 2026-06-29
   production report) pointing here, without altering its historical body.
5. Update every doc that described `teachingActionEngine.ts`/
   `teachingActionSchema.ts` as "orphaned" to instead say "retired,
   deleted — see ADR 03": `ARCHITECTURE_DECISIONS.md` Finding 2,
   `ENGINE_REFERENCE.md` Engine 34, `DEPENDENCY_RULES.md`,
   `EDUCATIONAL_BRAIN_V1.md` §4 engine table, `EXTENSION_GUIDE.md` §5,
   `EDUCATIONAL_BRAIN_CONSOLIDATION.md` §5/§7, `PROJECT_STATE.md`,
   `CHANGELOG.md`. Each update keeps the Teaching Assets Platform
   (schema/adapter/registry) listed as a separate, still-orphaned-but-intact
   content layer, not conflated with the now-deleted decision engine.
6. No `route.ts` change. No `prisma/schema.prisma` change. No
   `docs/{subject}/kg/` or `docs/{subject}/teaching-assets/` change.

## 10. Validation Strategy

- `grep -rn "teachingActionEngine\|teachingActionSchema"` across `src/`
  after deletion must return zero matches (confirms no caller was missed).
- `npx vitest run` — full suite must pass unchanged (these files had no
  tests written against them; suite result before/after must be identical).
- `npx tsc --noEmit`, diffed via `git stash`/`git stash pop` against the
  pre-existing baseline error count (this sandbox cannot run
  `prisma generate`, so a stable ~650-660 pre-existing cascading error
  count is expected and not attributable to this change) — confirms the
  deletion introduces zero new type errors and that nothing else in the
  codebase referenced the deleted files' types.
- Manual `git diff --stat` review before commit to confirm only the
  intended two files are deleted and only the intended doc files are
  touched — no accidental `route.ts` or curriculum-data edits.

## 11. Future Impact

This permanently closes Finding 2 and removes one of the two "Legacy
Teaching Action Engine" rows architecture docs previously had to carry —
going forward, `ENGINE_REFERENCE.md` Engine 34 describes only the
Teaching Assets Platform (content schema/adapter/registry), accurately
scoped as a content layer rather than a second decision engine. The
`TeachingAsset` content question (whether/how a future session wires
real worked-example/misconception/practice blueprints into TAG) remains
explicitly open and is now cleanly separated from this resolved
decision-engine-duplication question — a future session (this one or the
Curriculum Production Pipeline session) can pick it up without first
having to disentangle "which of these five files is actually dead code
versus which is real, usable content infrastructure," because this ADR
already did that separation.
