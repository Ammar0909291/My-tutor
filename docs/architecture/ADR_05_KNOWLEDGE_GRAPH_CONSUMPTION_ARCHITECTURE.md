# ADR 05 — Knowledge Graph Consumption Architecture: Surfacing `cross_links` and `mastery_threshold`

> Author: Chief Systems Architect for the Educational Brain (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED, NOT EXECUTED.** No code has been changed by this ADR.
> Scope: Architecture specification only. Per the current STRICT MODE
> directive, this document proposes a phased implementation; it does not
> execute any of it. Phase 1 is additive/zero-risk by construction; Phases
> 2 and 3 require explicit user approval before any file is touched —
> see §9.
> Priority context: this is the first ADR under the revised standing
> directive prioritizing "Knowledge Graph consumption architecture" —
> i.e. designing the systems that consume the Canonical Subject Knowledge
> Graph the Curriculum Pipeline is producing, rather than repository
> cleanup. This finding is new — it is not a re-statement of any prior
> `ARCHITECTURE_DECISIONS.md` finding.

---

## 1. Problem

The canonical KG schema (`docs/{subject}/kg/graph.json`, the 10-field
format `id, name, requires, unlocks, cross_links, difficulty, bloom,
mastery_threshold, estimated_hours, description`) is the Curriculum
Pipeline's authored product — 908 mathematics concepts, 194 physics, 187
chemistry, 119 computer-science, 89 biology, each with all 10 fields
populated. Of those 10 fields, **two are read by the Generic Subject
Adapter into its internal `RawKGConcept` parse step and then silently
dropped before reaching any consuming engine**: `cross_links` and the
per-concept `mastery_threshold`. Authored curriculum signal — real,
non-trivial, in some subjects extensively hand-tuned — currently has
**zero runtime effect anywhere in the Educational Brain**.

This is the architecturally significant version of "Knowledge Graph
consumption architecture is incomplete": the consumption layer (the
Generic Subject Adapter) was built to satisfy the two existing frozen
downstream type contracts (`KnowledgeNode`, `ConceptNode`), and those
two contracts simply don't have slots for two of the ten fields the
schema promises. No one engine is "broken" — every engine that exists
today works correctly with the data it receives — but the **adapter
layer is consumption-incomplete relative to what the Curriculum Pipeline
is producing**, and that gap will only widen as more subjects ship with
richer per-concept tuning.

## 2. Evidence

**`subjectKgAdapter.ts`'s two output mappings, field-by-field
(`src/lib/curriculum/subjectKgAdapter.ts:94-122`):**

| Raw KG field | → `KnowledgeNode` (curriculum layer) | → `ConceptNode` (Teaching Engine layer) |
|---|---|---|
| `id` | ✓ | ✓ |
| `name` | ✓ (`title`) | ✓ (`name`) |
| `description` | ✓ | — (not in `ConceptNode`) |
| `difficulty` | ✓ | ✓ |
| `bloom` | — (not in `KnowledgeNode`) | ✓ |
| `requires` | ✓ (`prerequisites`) | ✓ (`prerequisites`) |
| `unlocks` | — (not in `KnowledgeNode`; see note below) | ✓ |
| `estimated_hours` | ✓ | ✓ |
| **`cross_links`** | **✗ dropped** | **✗ dropped** |
| **`mastery_threshold`** | **✗ dropped** | **✗ dropped** |

`cross_links` and `mastery_threshold` are parsed into the adapter's
internal `RawKGConcept` (`subjectKgAdapter.ts:29-41`, both typed fields,
not part of the `[key: string]: unknown` catch-all) but neither
`getNodes()` nor `getConceptNode()` — the adapter's only two exported
read paths — includes them in its return object. Confirmed by reading
the adapter's full 123 lines and both downstream type definitions
(`KnowledgeNode` in `src/lib/education/educationTypes.ts:154-162`,
`ConceptNode` in `src/lib/teaching-engine/types.ts:35-45`) — neither type
has a field for either value.

**Secondary, smaller note:** the curriculum-layer `KGNode` type
(`knowledgeGraph.ts:60-67`) also has no `unlocks` field; `getDirectUnlocks()`
(`knowledgeGraph.ts:424-427`) recomputes it via a reverse `prerequisites`
scan across all nodes instead of reading the authored `unlocks` edge
directly. Not a data-loss case (the result is computed correctly), but a
redundant-computation note worth flagging alongside the two real losses
above — folded into this ADR's scope rather than filed separately.

**`mastery_threshold` genuinely varies and is hand-tuned, not boilerplate.**
Read directly from the on-disk graphs this session:

| Subject | Concepts | Distinct `mastery_threshold` values | Range |
|---|---|---|---|
| Mathematics | 908 | 12 | 0.35 – 0.95 |
| Physics | 194 | 4 | 0.70 – 0.85 |
| Chemistry | 187 | 3 | 0.70 – 0.80 |
| Computer Science | 119 | 3 | 0.70 – 0.80 |
| Biology | 89 | 3 | 0.70 – 0.80 |

Mathematics in particular shows real per-concept difficulty-bar tuning
(a 0.35-threshold concept and a 0.95-threshold concept are being treated
identically at runtime today). Note the **unit mismatch**: the KG stores
this as a 0–1 fraction; the runtime's only mastery bar,
`ASSESSMENT_PASS_THRESHOLD` in `src/lib/school/assessment/assessmentTypes.ts:12`,
is a flat `70` on a 0–100 scale, applied identically to every chapter in
every subject — any future wiring must normalize the scale, not just
plumb the raw number through.

**The global `ASSESSMENT_PASS_THRESHOLD` constant has 15+ call sites
across nearly the entire Mastery/Assessment/Recommendation tier**,
confirmed by repo-wide grep (`grep -rn "ASSESSMENT_PASS_THRESHOLD" src/`):
`assessmentIntelligence.ts` (7 uses, including the literal
`AssessmentDecision.mastery_threshold` output field), `masteryIntelligence.ts`
(3 uses, including the `TRUE_MASTERY`/`FALSE_MASTERY` pass/fail split),
`evaluateAssessment.ts` (the actual grading function called from
`api/school/assessment/submit/route.ts`), `nextBestAction.ts`,
`dailyPlan.ts`, `learningOrchestrator.ts`, `learningNarrative.ts`,
`examReadiness.ts`, `achievementEngine.ts`, `progressReport.ts`. This is
not a narrow, single-function gap — the entire "what counts as mastered"
judgment across the Educational Brain rests on one hardcoded constant,
blind to the curriculum-authored per-concept granularity that already
exists on disk for 1,300+ concepts.

**`cross_links` are authored, but not in the shape the documentation
claims.** `ENGINE_REFERENCE.md` §2 states *"`cross_links` are always
inter-graph by design and never fail/warn"* (i.e., meant to link across
subjects — math → physics, etc.). Reading the actual mathematics graph
this session: 363 `cross_links` edges exist, **all of them intra-subject**
(`math.* → math.*`); **zero true cross-subject links exist anywhere in
the mathematics graph**. 326 of 908 math concepts (36%) carry at least
one `cross_links` entry. Chemistry (6), computer-science (10), and
biology (10) graphs also carry some `cross_links`, not yet checked
intra- vs. cross-subject in this pass. This means in current practice
`cross_links` functions as an authored **"related concept" / lateral
link** within a subject — a real, distinct signal from `requires`
(prerequisite, hierarchical) — not yet the cross-subject bridge the
schema's documentation describes. Both the existing documentation
("inter-graph by design") and any future consumption design should be
corrected/built around what the data actually is, not what was
originally intended.

## 3. Root Cause

The Generic Subject Adapter (`subjectKgAdapter.ts`) was built to satisfy
exactly the fields the two existing frozen consumer types
(`KnowledgeNode`, `ConceptNode`) already declared at the time the
canonical-KG-adapter pattern was introduced. The 10-field canonical
schema itself — `cross_links` and `mastery_threshold` included — was
designed and is being authored by the (separate) Curriculum Production
Pipeline session, which has no visibility into, and no mandate to
change, the Educational Brain's frozen consumer types. No one on either
side owns closing this gap: the Curriculum Pipeline's job is to author
correct, validated KG data (which it has done — the validator's 9 checks
pass on all five graphs); the Educational Brain's job, per this
session's own standing directive, is architecture — and until now no
session had audited the adapter's output against the schema's full
field list to notice two fields never survive the adapter boundary.

## 4. Proposed Architecture — comparing solutions

**Option A — Leave as-is.** Rejected: this is the literal status quo
this ADR exists to evaluate. The cost compounds over time — every new
subject (and every future densification of `mastery_threshold` tuning in
chemistry/CS/biology, which today cluster around only 3 values vs.
mathematics' 12) adds authored signal that lands in the same dead end.

**Option B — Add `cross_links`/`mastery_threshold` directly as new
fields on the frozen `ConceptNode`/`KnowledgeNode` types.** Rejected as
the default: `EXTENSION_GUIDE.md` §8 lists the Teaching Engine's
`ConceptNode` shape as one of the things that "never changes without an
explicit new architecture decision." This document *is* that decision
point, but bending the frozen type is the higher-blast-radius of the two
available options (touches the Teaching Engine's own input contract,
the one type every other engine's understanding of "the frozen core"
is anchored to) when a lower-blast-radius option (C) achieves the same
consumption goal without touching it at all.

**Option C — Add two new pure accessor functions to the Generic Subject
Adapter, alongside the existing `getNodes()`/`getConceptNode()`, that
expose the two currently-dropped fields directly — without modifying
`ConceptNode` or `KnowledgeNode` at all.** Selected. The adapter already
parses both fields into `RawKGConcept`; this is a matter of exposing
data it already has via new exports, not new parsing logic:

```ts
// New, additive exports — subjectKgAdapter.ts SubjectAdapter interface
export interface SubjectAdapter {
  getNodes(): KnowledgeNode[]
  getConceptNode(id: string): ConceptNode | undefined
  /** NEW — per-concept mastery bar, normalized 0–100 to match
   *  ASSESSMENT_PASS_THRESHOLD's existing scale. undefined if the
   *  concept doesn't exist or the KG predates this field. */
  getConceptMasteryThreshold(id: string): number | undefined
  /** NEW — authored related-concept ids (same-subject in current data;
   *  see §2 note on cross_links' actual vs. documented shape). Empty
   *  array if none authored. */
  getCrossLinkedConceptIds(id: string): string[]
}
```

This keeps `ConceptNode`/`KnowledgeNode` exactly as frozen today (zero
diff to either type, zero diff to any of their ~15+ existing consumers),
adds two new opt-in entry points only a deliberately-updated consumer
would call, and stays inside the adapter's own existing "platform
infrastructure, not subject-specific code" charter — no new per-subject
branching, works identically for all five canonical subjects via the
same generic raw-JSON read.

## 5. Benefits

- Closes the "authored data with zero runtime effect" gap without
  touching a single frozen type — the lowest-blast-radius design that
  still fully exposes the data.
- Makes `mastery_threshold` and `cross_links` available to **any** future
  consumer (Mastery Engine refinement, Assessment architecture,
  Recommendation Intelligence, Visualization selection — several of
  which are separately on the current priority list) through one shared,
  already-tested data path, rather than each future engine re-parsing
  `graph.json` independently.
- Corrects a real documentation/data mismatch (`cross_links` "inter-graph
  by design" claim vs. observed 100%-intra-subject reality in
  mathematics) before more design work is built on the wrong assumption.

## 6. Risks

- **Risk: `getConceptMasteryThreshold()`'s 0–1→0–100 normalization is
  done inconsistently by different future callers.** Mitigated by
  design: the function itself returns the normalized 0–100 value (not
  the raw fraction) — callers never see the raw KG unit, so there is
  nothing for a caller to get wrong.
- **Risk: a future consumer assumes `cross_links` are cross-subject
  (per the existing, currently-inaccurate `ENGINE_REFERENCE.md` wording)
  and builds a feature that silently does nothing because the data is
  actually intra-subject.** Mitigated: §10 of this ADR's implementation
  plan includes correcting `ENGINE_REFERENCE.md` §2's wording as part of
  Phase 1, before any consumer is built on top of it.
- **Risk: chemistry/CS/biology's much shallower `mastery_threshold`
  tuning (3 distinct values, narrow 0.70–0.80 range) makes any
  consumption built on it look like it's "barely doing anything" for
  those subjects while mathematics shows real variation.** Not a defect
  in this proposal — it accurately reflects the current state of
  curriculum authoring across subjects, which is the Curriculum
  Pipeline's domain, not this ADR's to fix or comment further on.

## 7. Backward Compatibility

Phase 1 (the only phase this ADR scopes for unilateral execution
readiness) is purely additive: two new exported functions, zero changes
to any existing export, zero changes to any existing call site, zero
changes to `KnowledgeNode`/`ConceptNode`. Every one of the ~15+ existing
`ASSESSMENT_PASS_THRESHOLD` call sites continues to work exactly as
before until and unless a future, separately-approved change migrates
any of them — none are migrated by this ADR.

## 8. Validation Strategy

**Phase 1 (additive accessors):**
- `npx tsx scripts/validate-knowledge-graph.ts docs/{subject}/kg/graph.json`
  for all five subjects — must continue to pass unchanged (no schema
  change, no data change).
- Unit-level sanity check (can be a throwaway script, not committed):
  `getConceptMasteryThreshold('math.found.mathematical-thinking')` etc.
  returns a 0–100 number matching `rawConcept.mastery_threshold * 100`
  for a sample of known ids across all five subjects; returns `undefined`
  for an unknown id.
- `npx tsc --noEmit` stash-diff against baseline — must show zero new
  errors (purely additive exports cannot break existing callers).
- `npx vitest run` — full suite must pass with an identical count to
  baseline (no existing code path is touched).

**Phases 2/3 (if separately approved — see §9):** would require their
own validation specs at approval time, scoped to whatever consumer is
approved; not specified here to avoid over-designing un-approved work.

## 9. Implementation Plan — phased, only Phase 1 proposed for near-term execution

This ADR proposes three phases of increasing scope and decreasing
readiness for unilateral action, per STRICT MODE's four-condition gate:

**Phase 1 — Additive adapter accessors + doc correction (LOW
blast radius, clears the STRICT MODE gate cleanly):**
1. Add `getConceptMasteryThreshold(id)` and `getCrossLinkedConceptIds(id)`
   to `SubjectAdapter` in `subjectKgAdapter.ts` (Option C design, §4).
2. Correct `ENGINE_REFERENCE.md` §2's `cross_links` description from
   "always inter-graph by design" to accurately describe the observed
   intra-subject reality (§2 evidence above).
3. Document both new functions in `ENGINE_REFERENCE.md` §4 (Generic
   Subject Adapter) and `DEPENDENCY_RULES.md`.
- *Four-condition check:* (1) doc-alone insufficient — the missing data
  path is the actual gap, not its description; (2) required for
  architectural integrity — closes a real authored-data-loss gap;
  (3) zero curriculum overlap — adapter code only, no KG/curriculum
  file touched; (4) zero production-behavior change — purely additive,
  no existing call site modified. **All four clear.** Per STRICT MODE
  this phase could be executed without further sign-off, but per this
  session's practice on ADR 04, execution is still deferred to an
  explicit follow-up turn — see the end-of-turn report's request.

**Phase 2 — Wire `getConceptMasteryThreshold()` into Assessment
Intelligence's per-chapter `mastery_threshold` output (MEDIUM blast
radius, requires explicit approval):**
1. In `assessmentIntelligence.ts`, replace the 6 hardcoded
   `mastery_threshold: ASSESSMENT_PASS_THRESHOLD` literals with a
   chapter-scoped aggregation over the chapter's `target_concepts`
   (proposed default: arithmetic mean of each concept's KG-derived
   threshold, falling back to `ASSESSMENT_PASS_THRESHOLD` for any
   concept the adapter returns `undefined` for — e.g. legacy
   English/social-science subjects, which have no canonical KG at all
   and use a 54-node hardcoded graph instead).
2. **Explicitly out of scope for Phase 2:** the other ~9 call sites of
   `ASSESSMENT_PASS_THRESHOLD` (pass/fail history comparisons in
   `masteryIntelligence.ts`, `evaluateAssessment.ts`,
   `learningOrchestrator.ts`, etc.) are a fundamentally different
   question — "was this past attempt, graded against whatever threshold
   applied at the time, a pass" — which would require persisting which
   threshold applied to each historical attempt to migrate correctly.
   Bundling that into this ADR would be scope creep; it is named here as
   a real, separate **Phase 3 candidate**, not silently dropped.
- *Four-condition check:* (4) is the one requiring judgment —
  `assessmentIntelligence.ts` is read by the live chat route's system
  prompt assembly, so this changes a number a student-facing assessment
  description references. Not self-clearing from evidence alone;
  **explicit approval required**, same posture as ADR 04.

**Phase 3 — `cross_links`-driven "Related Concepts" consumer (scope
undetermined, requires its own design pass if approved):**
Not designed in this ADR beyond noting it as the natural next step once
`getCrossLinkedConceptIds()` exists. Candidate consumers worth a future,
separate design pass: a new tier in the Recommendation Intelligence
cluster ("explore a related concept" after mastering one), or a
Visualization-selection input (cluster related concepts in a concept-map
visual). Deliberately left undesigned here — picking a single consumer
without first confirming product intent would be the same "I built it,
nothing wired it up" failure mode ADR 03/04 documented for the legacy
Teaching Action Engine and Recommendation duplication.

## 10. Future Impact

This ADR's Phase 1, once approved and executed, becomes the foundation
every future "use the richer KG data" idea builds on (several of which
are now explicitly on this session's priority list: Mastery Engine
evolution, Assessment architecture, Recommendation Intelligence,
Visualization selection) — rather than each future session re-deriving
its own ad hoc `graph.json` read. It also corrects a documentation claim
(`cross_links` "inter-graph by design") that would otherwise mislead
whichever future session designs Phase 3.
