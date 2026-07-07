# ADR 07 — Mastery Intelligence Architecture (ARCHITECTURE SPECIFICATION — NOT IMPLEMENTED)

> Author: Chief Systems Architect for the Educational Brain (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED ARCHITECTURE SPECIFICATION. ZERO CODE CHANGES.**
> Scope: design only. No `route.ts` change. No schema change. No new
> engine written. No existing engine's dependency contract altered. This
> ADR designates an existing engine as canonical and specifies two
> additive extensions to it; it does not build either extension.
> Priority: **#2** in the user's 8-item Educational Brain architecture
> roadmap — "Mastery Intelligence Architecture: static vs evidence-
> adjusted mastery, global vs personalized mastery, Beginner→Intermediate→
> Expert progression, entrance examinations, mastery validation."
> Standing constraint this ADR operates under (explicit, this session):
> do **not** implement anything, do **not** request implementation
> approval. Implementation begins only after the Curriculum Production
> Pipeline declares Canonical Knowledge Graph v1 frozen **and** the user
> explicitly approves execution. This document is allowed to design;
> it is not allowed to build.
> Pre-ADR checklist completed this turn (per the user's binding
> requirement): re-read `EDUCATIONAL_BRAIN_V1.md`, `ENGINE_REFERENCE.md`,
> `DATA_FLOW.md`, `DEPENDENCY_RULES.md`, `EXTENSION_GUIDE.md`,
> `ARCHITECTURE_DECISIONS.md`, `ADR_02` through `ADR_06`, and
> `docs/project-memory/PROJECT_STATE.md` in full before drafting this
> document. No conflict was found between this ADR's direction and any
> frozen rule — see §11 for the full cross-reference.

---

## 1. Problem

The codebase has no single, canonical answer to "has this student mastered
this concept?" Five separate representations of mastery/progression exist
side by side today, none of which defers to another, and none of which is
reconciled with the others:

1. **`MasteryLevel`** (`src/lib/school/adaptive/masteryIntelligence.ts`) —
   a 4-value classification (`TRUE_MASTERY | DEVELOPING | FALSE_MASTERY |
   AT_RISK`), computed fresh on every call from four live signals
   (assessment/checkpoint/mistake/revision), never persisted, **chapter-
   scoped**, and — per `DATA_FLOW.md` §1 step 8 — wired only inside the
   School Mode gate (`api/learn/chat/route.ts`, `if (schoolCtx)`,
   lines ~294–838). It does not run for Library/general-subject learners
   at all.
2. **`TopicProgress.masteryPct`** (`prisma/schema.prisma`, `Int
   @default(0)`) — a persisted per-`[userId, subjectSlug, topicSlug]`
   percentage, read and **independently re-classified** by
   `learningProfile.ts` using its own ad hoc thresholds, bypassing
   `masteryIntelligence.ts` entirely (see §2).
3. **`EbLearnerConceptMastery`** (`prisma/schema.prisma`) — a continuous
   float score (`masteryScore`, `masteryConfidence`, `decayedScore`,
   `attemptCount`), **concept-scoped**, part of the archived/dormant `Eb*`
   Educational Brain Decision Pipeline (`ENABLE_EDUCATIONAL_BRAIN_PIPELINE`,
   default off per `ARCHITECTURE_DECISIONS.md` Part 2). Never read by any
   live code path.
4. **`TrackLevel`** (`src/lib/teaching-engine/types.ts`) — the frozen
   5-tier progression vocabulary (`T0`–`T4`) the Teaching Engine uses for
   `StudentState.level`. Mastery-adjacent (it represents how far a
   student has progressed) but computed and maintained completely
   separately from `MasteryLevel`.
5. **`LevelBand`** (`prisma/schema.prisma`, enum) — a 6-tier vocabulary
   (`COMPLETE_BEGINNER | BEGINNER | INTERMEDIATE | ADVANCED |
   PROFESSIONAL | EXPERT`) used exclusively by the goal-based placement
   subsystem (`LearningGoal.claimedLevel`/`targetLevel`,
   `PlacementAssessment.recommendedLevel`,
   `AssessmentAttempt.recommendedLevel`) — i.e. the codebase's existing
   "entrance examination" mechanism. It has zero connection to
   `TrackLevel` or `MasteryLevel`: a placement exam's `LevelBand` result
   never seeds the Teaching Engine's starting `TrackLevel`, and a
   learner's accumulated `MasteryLevel` classifications never roll up
   into a `LevelBand`.

In addition, a single flat constant, `ASSESSMENT_PASS_THRESHOLD = 70`
(`src/lib/school/assessment/assessmentTypes.ts:12`), is read by 12 files
as the universal pass/mastery bar — in direct tension with the
per-concept `mastery_threshold` field already authored in the Canonical
KG (0.35–0.95 fractional, 908 distinct values in mathematics alone) but
never exposed past the adapter (`ARCHITECTURE_DECISIONS.md` Finding 7 /
`ADR_05`, still correctly deferred).

This is exactly the situation the user's binding directive names:
**duplicated systems, overlapping responsibilities, no single elegant
design.** ADR 07 designates which of these survives as canonical and
specifies, without implementing, how the others are either retired,
reconciled, or formally bridged.

## 2. Evidence

**`masteryIntelligence.ts`'s school-only wiring** (`DATA_FLOW.md` §1 step
8): `@/lib/school/adaptive/masteryIntelligence (L438) →
buildMasteryIntelligenceBlock (L446)` sits inside the
`if (schoolCtx) { ... }` block (`route.ts` ~294–838). The Library/general
chat path (`route.ts` ~964 onward) never calls it.

**`masteryIntelligence.getMasteryProfile`'s `board`/`grade` parameters are
structurally unused** — confirmed by reading the full 503-line file this
session: neither parameter is referenced anywhere in the function body,
only forwarded into the signature. This is the **identical evidence
pattern** `ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md` used to justify
wiring `teachingStrategy.getTeachingStrategy()` and
`spacedRevision.getDueRevisions()` into the Library path — both of those
functions also accepted unused `board`/`grade` params before ADR 02
extended their call sites. `lessonPlanner.buildLessonPlan()` followed the
same pattern (ADR 02 §7 follow-up #1, implemented 2026-06-30). Mastery
Intelligence is the next function in this exact lineage that has not yet
been extended.

**`learningProfile.ts` independently re-derives a mastery classification**
(`src/lib/school/adaptive/learningProfile.ts:64–70`):

```ts
const masteredTopics = topicProgressRows
  .filter((r) => r.status === 'MASTERED')
  .map((r) => r.topicSlug)

const strugglingTopics = topicProgressRows
  .filter((r) => r.status === 'IN_PROGRESS' && r.masteryPct > 0 && r.masteryPct < 60)
  .map((r) => r.topicSlug)
```

and at line 91, the assessment-pass check is a **literal hardcoded `70`**,
not an import of `ASSESSMENT_PASS_THRESHOLD`:

```ts
const passedAssessments = assessmentRows.filter(
  (r) => typeof r.score === 'number' && r.score >= 70,
).length
```

This is concrete, already-realized drift risk: the constant
`ASSESSMENT_PASS_THRESHOLD` exists specifically so the pass bar has one
source of truth, yet `learningProfile.ts` re-states its value as a
magic number instead of importing it. `learningProfile.ts` is a member
of the Recommendation Intelligence cluster
(`ENGINE_REFERENCE.md`/`DEPENDENCY_RULES.md`), which Permanent Rule 7
(`ARCHITECTURE_DECISIONS.md` Part 1) requires to *read* Mastery
Intelligence's conclusions, never independently score mastery. Computing
`masteredTopics`/`strugglingTopics` directly from raw `TopicProgress`
fields with its own thresholds — rather than calling
`masteryIntelligence.getMasteryProfile()` — is a borderline violation of
that rule today: it is not literally "scoring," but it is an independent
classification decision the canonical engine already exists to make.

**`assessmentIntelligence.ts`'s `mastery_threshold` field is always the
flat constant, never a real per-concept value**
(`src/lib/school/adaptive/assessmentIntelligence.ts`, 6 call sites, e.g.
line 94): `mastery_threshold: ASSESSMENT_PASS_THRESHOLD`. This is worth
disambiguating explicitly: `AssessmentDecision.mastery_threshold` (an
`AssessmentIntelligence` output field) and the Canonical KG's
`mastery_threshold` (an authored, per-concept, unexposed field — ADR 05
Finding 7) share a name but are unrelated today. The former is just the
global constant under a field name that *suggests* per-concept
granularity it does not have.

**`EbLearnerConceptMastery`** (`prisma/schema.prisma`, confirmed via grep
with surrounding context): `@@id([userId, conceptId, language])`,
`masteryScore: Float @default(0)`, `masteryConfidence: Float
@default(0.1)`, `decayedScore: Float @default(0)`, `attemptCount`,
`lastSeenAt`, `firstAttemptAt` — part of the 24-model `Eb*` family
documented as dormant in `ARCHITECTURE_DECISIONS.md` Part 2 and Finding 5.
Zero importers outside `src/lib/educationalBrain/*`.

**`LevelBand`** (`prisma/schema.prisma:813–820`): `COMPLETE_BEGINNER,
BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL, EXPERT`. Used by
`LearningGoal.claimedLevel`/`targetLevel` (733–734),
`PlacementAssessment.recommendedLevel` (738),
`AssessmentAttempt.recommendedLevel` (775) — a goal/career-oriented
placement flow (`LearningGoal` → `PlacementAssessment` →
`AssessmentAttempt` → `LearningEstimate` → `StudyCommitment`) that is
the codebase's existing "entrance examination" mechanism. None of these
models or the engine(s) that populate them are referenced anywhere in
`src/lib/teaching-engine/`, `src/lib/school/adaptive/masteryIntelligence.ts`,
or `src/lib/memory/` (confirmed by grep — no cross-references found).

**`TrackLevel`** (`src/lib/teaching-engine/types.ts`): `'T0' | 'T1' | 'T2'
| 'T3' | 'T4'`, used in `StudentState.level`, as part of
`ConceptNode.difficulty: GraphDifficulty | TrackLevel`, and in
`TeachingDecision.difficulty`. Per `EXTENSION_GUIDE.md` §8, this union is
explicitly **frozen** — "never changes without an explicit new
architecture decision."

## 3. Alternative designs

**Option A — Leave as-is.** Rejected. Directly contradicts this turn's
binding instruction ("never allow duplicated systems... prefer one
elegant system over multiple similar systems"). Five non-unified
representations is the textbook case that instruction targets.

**Option B — Promote `EbLearnerConceptMastery`'s continuous float score
to canonical, retire `MasteryLevel`'s classification system.** Rejected.
This would require migrating the entire live school teaching path off a
working, currently-load-bearing engine onto a dormant one with zero
production validation, zero historical data (every row would start at
`masteryScore: 0`), and zero proof its decay/confidence tuning produces
sound classifications at the chapter granularity the Teaching Engine and
Assessment Intelligence actually consume. It would also be a premature
bet on concept-level granularity before the Curriculum Pipeline freezes
the Canonical KG v1 (which determines how finely concepts are even
authored) — exactly the kind of "locking to assumptions that may change"
risk the user has repeatedly flagged (ADR 05, ADR 06).

**Option C — Designate `masteryIntelligence.ts`'s `MasteryLevel`
classification as canonical; extend its reach (Library mode) and
consolidate its duplicate consumers (`learningProfile.ts`); formally
bridge — without merging — the three genuinely-different-scope
vocabularies (`MasteryLevel`, `TrackLevel`, `LevelBand`) with a static
mapping table; leave `EbLearnerConceptMastery` dormant exactly as
`ARCHITECTURE_DECISIONS.md` Part 2 already treats the whole `Eb*`
pipeline.** Selected. Reasoning in §4.

**Option D — Design and build one brand-new universal mastery engine
that subsumes all five representations.** Rejected as premature
over-engineering at this point in the roadmap. A universal mastery
model's correct shape depends on decisions not yet made by the
remaining roadmap items — Teaching Action Intelligence (#3), Dynamic
Lesson Composition (#4), and Student Memory Evolution (#5) in particular
will each touch what "mastery" needs to express. Designing a unified
engine now, at item 2 of 8, risks redesigning it again at item 5 once
Student Memory Evolution is specified. Consistent with Option B's
rejection rationale and with the user's own stated end-state ("minimal
redesign" once both freezes complete) — minimal redesign is best served
by consolidating what exists now and deferring a full unification design
until the roadmap's dependent items are themselves specified.

## 4. Chosen architecture

`masteryIntelligence.ts`'s `MasteryLevel` classification is designated
the single canonical "is this concept/chapter mastered" authority for the
school-pipeline-shaped portion of the platform, going forward. Three
additive, independently-stageable extensions are specified (none
implemented):

### (a) Library Mode Extension
Call `getMasteryProfile()` from the Library/general chat path
(`route.ts` ~964 onward), mirroring exactly how ADR 02 wired
`teachingStrategy.getTeachingStrategy()` and
`spacedRevision.getDueRevisions()` into that path, and how its §7
follow-up wired `lessonPlanner.buildLessonPlan()` in. A new, optional
`MASTERY INTELLIGENCE` block would be appended to the Library system
prompt the same way the School Mode block already is — using the
already-built `buildMasteryIntelligenceBlock()` renderer unchanged.
`chapterId`/`kgNodeIds` for a Library subject would resolve through the
Generic Subject Adapter's concept ids exactly as `lessonPlanner`'s ADR 02
follow-up already proved works for a `CurriculumNode`-shaped input via a
trivial inline mapping. No change to `getMasteryProfile()`'s signature,
no change to `MasteryLevel`'s 4-value union, no change to its dependency
contract (still ✓ Student Memory + chapter progress; ✗ everything else
per `DEPENDENCY_RULES.md`).

### (b) Recommendation-Cluster Consolidation
`learningProfile.ts`'s `masteredTopics`/`strugglingTopics` computation
(today: independent re-derivation from raw `TopicProgress` fields, §2)
would be replaced with a call into `masteryIntelligence.getMasteryProfile()`
per relevant chapter, consuming its `level: MasteryLevel` output instead
of re-classifying. This brings `learningProfile.ts` into unambiguous
compliance with Permanent Rule 7, removes the literal hardcoded `70`
(replaced with the proper `ASSESSMENT_PASS_THRESHOLD` import, or removed
entirely once the call is delegated), and eliminates one of the five
non-unified representations as an independent decision point — it
becomes a *consumer* of the canonical one, not a sixth classifier. This
does not change `learningProfile.ts`'s public `StudentLearningProfile`
shape; only its internal computation of two existing fields.

### (c) Cross-Vocabulary Mapping Table (new, specification-only)
A small, pure, static lookup — conceptually
`src/lib/school/adaptive/masteryVocabulary.ts` (not created this
session) — that defines deterministic, documented translations between
the three vocabularies that genuinely serve different scopes and are
**not** proposed to merge:

| Vocabulary | Scope | Cardinality | Lives in |
|---|---|---|---|
| `MasteryLevel` | per chapter, evidence-classified, recomputed every call | 4 | `masteryIntelligence.ts` |
| `TrackLevel` | per teaching turn, Teaching Engine's pedagogical tier | 5 (T0–T4) | `teaching-engine/types.ts` (frozen) |
| `LevelBand` | per `LearningGoal`, one-time placement-exam result | 6 | `prisma/schema.prisma` |

Proposed (unimplemented) translation functions:
`levelBandToTrackLevel(band: LevelBand): TrackLevel` — seeds a new
learner's starting `TrackLevel` from a completed `PlacementAssessment`,
instead of every new learner starting blind at a hardcoded default.
`masteryLevelToTrackLevelSignal(level: MasteryLevel): 'advance' |
'hold' | 'remediate'` — a coarse advisory signal, **not** a TrackLevel
override (the Teaching Engine's `decide()` remains the sole authority
over `TrackLevel` transitions per `DEPENDENCY_RULES.md`; this mapping
would only ever be caller-supplied input data, never a write into
`StudentState` from outside the existing call chain). No schema change;
no enum is renamed, merged, or extended — `EXTENSION_GUIDE.md` §8's
freeze of `TrackLevel` is fully respected.

### (d) `EbLearnerConceptMastery` — explicitly out of scope
Remains dormant, exactly as `ARCHITECTURE_DECISIONS.md` Part 2 already
rules for the entire `Eb*` pipeline. Promoting it to live status is a
separate, explicit architectural decision (per Part 2's own wording),
not something this ADR decides. This finding is recorded as **Finding 8**
in `ARCHITECTURE_DECISIONS.md` (see §15 below) so it is not silently
re-discovered later as if new.

## 5. Trade-offs

**Option C vs. B:** C ships zero migration risk (no production data
moves, no new persisted model touched) and keeps the currently-load-
bearing chapter classification engine in place; its cost is that it does
not modernize mastery into a continuous, decay-aware score — chapter-
level classification remains coarser than `EbLearnerConceptMastery`'s
concept-level float would allow. That coarseness is accepted: nothing in
the live Teaching Engine, TAG, or Lesson Composer currently consumes
concept-level mastery granularity either, so the coarser representation
is not actually a bottleneck against today's consumers.

**Option C vs. D:** C is incremental and immediately specifiable; D
would be more "elegant" in the abstract but cannot be correctly designed
yet without items #3–#5 of the roadmap, so attempting it now risks
exactly the rework the user's stated end-goal ("minimal redesign") is
trying to avoid.

**Within C, extension (b) specifically:** consolidating
`learningProfile.ts` onto `masteryIntelligence.ts`'s classification will
change `learningProfile.ts`'s live output (`masteredTopics`/
`strugglingTopics`/`preferredDifficulty`) in some cases, because
`masteryIntelligence.ts`'s classification weighs four signals
(assessment/checkpoint/mistake/revision) whereas the current ad hoc logic
only reads `TopicProgress.status`/`masteryPct` and raw mistake counts.
This is a **behavior change to a live Recommendation-cluster engine**,
not a pure refactor — it requires the equivalence validation specified
in §9 before it would be safe to implement, and is correctly the
highest-risk piece of this ADR's three extensions.

## 6. Scalability

`getMasteryProfile()` already recomputes per call with no persistence
(`ENGINE_REFERENCE.md` Engine 7) — its cost is `O(few DB queries)` per
`(userId, chapterId)` pair, identical whether called from School Mode or
Library Mode. Extending it to Library Mode roughly doubles its call
volume, the same scaling change ADR 02 already made for
`teachingStrategy`/`spacedRevision`/`lessonPlanner` and which is already
running in production without an observed scaling issue — this ADR
introduces no new scaling risk beyond a precedent already validated.
The mapping table (§4c) is a static, in-memory lookup — `O(1)` per call,
no DB I/O, no scaling concern at any learner volume. Consolidating
`learningProfile.ts` (§4b) replaces N ad hoc Prisma reads with calls into
an engine that already performs its own (cached-per-call, not
cross-request-cached) reads — net query volume is expected to be
roughly neutral to lower, since `masteryIntelligence.ts`'s existing
`Promise.all` batching is reused instead of `learningProfile.ts`'s
separate, parallel raw queries.

## 7. AI independence impact

Zero change to the deterministic/probabilistic boundary
(`ARCHITECTURE_DECISIONS.md` Permanent Rules 9–10): `masteryIntelligence.ts`
remains 100% rule-based threshold logic, no LLM call, in both its
current school-only form and its proposed Library-extended form. The
practical AI-independence benefit is downstream: today, a future
non-LLM tutoring component (roadmap item #8) reasoning about "has this
student mastered X" would have to pick among five inconsistent signals.
After this ADR's consolidation (§4a–b), there is one canonical,
deterministic answer per chapter, plus one documented (not yet built)
bridge to the placement/exam vocabulary — directly reducing the surface
area item #8 will eventually have to reconcile.

## 8. Backward compatibility

Fully additive at the type level: `MasteryLevel`'s 4-value union,
`TrackLevel`'s 5-value union (frozen per `EXTENSION_GUIDE.md` §8), and
`LevelBand`'s 6-value enum are all unchanged — the mapping table (§4c)
reads them, never modifies them. No Prisma schema change. No
`SubjectAdapter`/`ConceptNode`/`KnowledgeNode` change. No Teaching
Engine, TAG, or Lesson Composer signature change. `getMasteryProfile()`'s
existing signature and 4-value output are unchanged — only its set of
*callers* would grow (§4a) and one existing *caller's* internal
implementation would change (§4b). The one item that is **not**
backward compatible at the behavior level is `learningProfile.ts`'s
output values themselves (§5) — flagged explicitly, not glossed over,
and gated on the validation strategy below before any future
implementation turn could respond "yes" to whether this is safe to ship.

## 9. Validation strategy

For the future implementation (none of this runs now):
- **Equivalence/regression check for `learningProfile.ts`** (§4b): run
  both the current ad hoc classification and the proposed
  `masteryIntelligence`-routed classification against the same sample of
  real `TopicProgress`/assessment/mistake rows; diff the resulting
  `masteredTopics`/`strugglingTopics`/`preferredDifficulty` sets; any
  divergence must be explained (signal-richness improvement) rather than
  silently accepted, before the change is considered ready to ship.
- **Library Mode smoke test** (§4a): manual dev-server chat turn against
  a Library subject (e.g. mathematics outside school context), confirm
  the new `MASTERY INTELLIGENCE` block renders, is advisory-only, and
  degrades to `null`/absent on any error per Permanent Rule 11 (never
  block a turn).
- **Mapping table unit tests** (§4c): exhaustive table-driven tests for
  `levelBandToTrackLevel`/`masteryLevelToTrackLevelSignal` covering all
  enum combinations (6 × nothing-else and 4 × nothing-else respectively
  — small, fully enumerable domains), each asserting a specific,
  documented output.
- **Standard regression gate**, matching every prior ADR in this
  session: `npx tsc --noEmit` diffed against a pre-change baseline,
  `npx vitest run` at identical pass count to baseline, manual smoke of
  at least one School Mode chat turn (regression check — School Mode's
  existing `MASTERY INTELLIGENCE` block must render byte-identically to
  today, since `getMasteryProfile()`'s own logic is unchanged).

## 10. Migration strategy

Staged, mirroring the observe-then-enforce pattern already specified in
`ADR_06` §12 and already used for `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`:

1. **Phase 1 — Library Mode extension (§4a), flagged off by default.**
   Ship the additional call site behind a feature flag; run for one full
   deploy cycle observing for errors/latency before flipping default on.
   Lowest risk of the three extensions — purely additive, no existing
   behavior touched.
2. **Phase 2 — flip Phase 1's flag on by default** once confirmed clean,
   following the same staged-trust precedent ADR 02 already established
   for its own Library-mode extensions.
3. **Phase 3 — `learningProfile.ts` consolidation (§4b),** gated
   separately from Phase 1/2 because it changes existing live output (§5,
   §8). Requires the equivalence validation (§9) to run and be reviewed
   *before* this phase is proposed for execution, not after.
4. **Phase 4 — Mapping table (§4c),** built as a small, independent, pure
   module with zero dependents at first; wired into exactly one low-risk
   consumer (e.g., seeding a new `LearningGoal`'s initial `TrackLevel`
   recommendation from its `PlacementAssessment.recommendedLevel`) before
   any broader adoption is considered.

Each phase is independently revocable and independently approvable —
none requires the others to ship first except in the listed order.

## 11. Relationship to previous ADRs

- **ADR 02** (`ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md`) — direct
  precedent and reused evidence pattern: the unused-`board`/`grade`-param
  proof that justified extending `teachingStrategy`/`spacedRevision`/
  `lessonPlanner` to Library mode applies identically to
  `masteryIntelligence.getMasteryProfile`, confirmed by this session's
  own reading of the function body. §4a is the next, not-yet-executed
  link in that same chain.
- **ADR 03 / ADR 04** — not directly touched (dead-code retirement and a
  still-unexecuted-by-design retirement proposal); this ADR's underlying
  principle ("consolidate to the live, working system; don't maintain
  two") is the same spirit ADR 04 applied to
  `learningOrchestrator.ts`/`nextBestAction.ts`, applied here to
  `masteryIntelligence.ts`/`EbLearnerConceptMastery`.
- **ADR 05** (`ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`) —
  shares the exact `mastery_threshold` field this ADR's §12 below
  addresses. ADR 07 does not re-open exposing that field — it remains
  blocked exactly where the second-pivot CLAUDE.md rule and ADR 05 left
  it — but designates the correct future consumer (see §12) so a future,
  separately-approved Phase 2 of ADR 05 has an unambiguous integration
  point instead of inventing a new one.
- **ADR 06** (`ADR_06_KG_CONSUMPTION_PIPELINE.md`) — no direct dependency
  (Mastery Intelligence does not read the KG file directly — it reads
  Student Memory and chapter progress per `DEPENDENCY_RULES.md`), but
  consistent layering: ADR 06's Gate sits between the KG file and the
  adapter; this ADR's extensions sit entirely downstream of the adapter,
  in the Mastery tier. No conflict, no overlap.
- **`ARCHITECTURE_DECISIONS.md` Finding 4** (two generations of
  Recommendation Intelligence) — same "two generations coexist, name the
  live winner, document the dormant one rather than silently maintaining
  both" pattern, applied here to mastery instead of recommendation
  aggregation. This ADR adds the equivalent record as **Finding 8** (§15).
- **`ARCHITECTURE_DECISIONS.md` Permanent Rule 7** ("Recommendation
  Engine never evaluates mastery") — §4b's consolidation is explicitly
  designed to bring `learningProfile.ts` into clearer compliance with
  this existing rule, not to introduce a new one.

No conflict was found with any frozen rule in `EDUCATIONAL_BRAIN_V1.md`,
`ENGINE_REFERENCE.md`, `DEPENDENCY_RULES.md`, or `EXTENSION_GUIDE.md`.
Mastery Intelligence's existing dependency contract (✓ Student Memory +
chapter progress; ✗ Teaching Engine, TAG, Lesson Composer, Assessment
Intelligence, Recommendation engines, the LLM, DB writes) is preserved
unchanged by every extension proposed here — §4a only adds a second
*caller* (the existing dependency-rule model is caller-based, exactly as
`DEPENDENCY_RULES.md`'s summary table already documents for
`teachingStrategy`/`spacedRevision` after ADR 02).

## 12. Relationship to the Canonical Knowledge Graph

The Canonical KG's authored, per-concept `mastery_threshold` field
(0.35–0.95, `ADR_05` / Finding 7) remains unexposed past
`subjectKgAdapter.ts`, per the second-pivot rule in `CLAUDE.md` — this
ADR does not change that and does not re-request approval to change it.
What this ADR establishes, for when that gate eventually opens: the
correct future consumer of a per-concept `mastery_threshold` is
`masteryIntelligence.ts`'s classification logic specifically — e.g.,
replacing the flat `ASSESSMENT_PASS_THRESHOLD` comparison
(`masteryIntelligence.ts:103`) with a per-concept threshold for that
chapter's dominant concept, once `getConceptMasteryThreshold()` (ADR 05's
proposed, unimplemented accessor) exists. This is recorded so a future
ADR 05-Phase-2 turn integrates into the canonical engine this ADR
designates, rather than building a second, competing mastery-threshold
consumer. No other Canonical KG field is touched or referenced by this
ADR.

## 13. Future implementation plan

Not executed in this or any session until both gating conditions are
met: (1) the Curriculum Production Pipeline declares Canonical Knowledge
Graph v1 frozen, and (2) the user explicitly approves execution. When
both are satisfied, implementation proceeds in the four phases specified
in §10, in order, each independently validated per §9 before being
proposed for the next. Phase 3 (`learningProfile.ts` consolidation)
additionally requires the equivalence report described in §9 to be
generated and reviewed as its own deliverable before that phase is
proposed for execution — it is the one piece of this ADR with a real
behavior-change risk and should not be bundled into the same approval
as the purely additive Phases 1, 2, and 4.

This ADR directly feeds roadmap item **#3 — Teaching Action Intelligence**
(the next item): a canonical, single-source `MasteryLevel` signal,
available in both School and Library modes, is a cleaner input for
designing how Teaching Action Intelligence selects/sequences pedagogical
actions than the current five-way-fragmented state would have been.
