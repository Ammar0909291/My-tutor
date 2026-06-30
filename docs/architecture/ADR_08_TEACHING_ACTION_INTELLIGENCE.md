# ADR 08 — Teaching Action Intelligence (ARCHITECTURE SPECIFICATION — NOT IMPLEMENTED)

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED ARCHITECTURE SPECIFICATION. ZERO CODE CHANGES.**
> Scope: design only. No `route.ts` change. No schema change. No new
> engine written. No existing engine's dependency contract altered. This
> ADR designates the existing decision hierarchy as canonical, names the
> one real gap in it, and specifies an additive extension; it does not
> build the extension.
> Priority: **#3** in the user's 8-item Educational Brain architecture
> roadmap — "Teaching Action Intelligence."
> Standing constraint this ADR operates under (explicit, this session):
> do **not** implement anything, do **not** request implementation
> approval. Implementation begins only after the Curriculum Production
> Pipeline declares Canonical Knowledge Graph v1 frozen **and** the user
> explicitly approves execution. This document is allowed to design; it
> is not allowed to build.
> Pre-ADR checklist completed this turn (per the user's binding,
> refined-this-session requirement): re-read
> `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` in full, then
> `EDUCATIONAL_BRAIN_V1.md`, `ARCHITECTURE_DECISIONS.md`, `DATA_FLOW.md`,
> `DEPENDENCY_RULES.md`, `EXTENSION_GUIDE.md`, ADR 02 through ADR 07, and
> `docs/project-memory/PROJECT_STATE.md`. No conflict was found between
> this ADR's direction and any frozen rule or prior ADR — see §11. The
> Bible is updated as part of this ADR's deliverables (§0 governance
> rule: "an ADR that does not update the Bible is not finished").

---

## 1. Problem

**"How should I teach this turn?" has two different answers depending on
which mode the learner is in, even though nothing about the underlying
engines requires that to be true.**

Two layers in the codebase both answer "how to teach this turn," at two
different grains:

1. **The Strategy layer** — `teachingStrategy.getTeachingStrategy()`
   (`src/lib/school/adaptive/teachingStrategy.ts`), a 7-value
   `TeachingStrategyType` (`FOUNDATION_REBUILD | MISCONCEPTION_REPAIR |
   MOMENTUM_RECOVERY | CONFIDENCE_CORRECTION | APPLICATION_FOCUS |
   CONFIDENCE_BUILDING | ACCELERATED_GROWTH`) synthesized from mastery,
   misconception confidence, concept transfer, confidence calibration,
   momentum, and staleMate signals. Per ADR 02, this **runs in both
   School and Library/general modes** (`route.ts` ~536 school branch,
   ~991 Library branch).
2. **The Action layer** — the frozen Teaching Engine `decide()`
   (`src/lib/teaching-engine/index.ts`, `TeachingMode` + its own 6-value
   `ActionType` + `TrackLevel` difficulty) → Teaching Action Generator
   (`teachingActionGenerator.ts`, 10-value `TeachingActionType` with
   `presentation_mode`/`visual_type`/`interaction_level`/`bloom_level`/
   `prerequisites_to_review`) → Dynamic Lesson Composer
   (`lessonComposer.ts`, a 10-stage ordered `LessonPlan`). This is the
   layer that actually specifies *concrete pedagogical form* — visual vs.
   worked example vs. analogy vs. simulation, what Bloom level, what
   interaction level, what stage sequence for the turn.

**Finding: layer 2 — the richer, more concrete layer — never executes
for Library/general learners, and the reason is not a deliberate design
decision recorded anywhere. It is a side effect of how one piece of
session state is written.**

The entire `decide()` → TAG → Lesson Composer chain (`route.ts` ~1277–
1395) is gated on a single condition: `if (snapshotCurrentConceptId)`
(line 1282), where `snapshotCurrentConceptId` is read once, at the top of
the route, from `learnSession.contextSnapshot.currentConceptNodeId`
(line 68). Grepping the entire `src/` tree for `currentConceptNodeId`
turns up exactly **one write site**, and it sits inside `if (schoolCtx)`:

```ts
// route.ts ~1701
if (schoolCtx) {
  const newCurrentId = lessonPlanHoisted?.currentConcept?.nodeId ?? null
  ...
  if (conceptChanged || workedExampleChanged) {
    prisma.learnSession.update({
      ...
      data: { contextSnapshot: { ...(conceptChanged ? { currentConceptNodeId: newCurrentId, ... } : {}) } },
    })
  }
}
```

There is no equivalent write for Library sessions anywhere in the
codebase. So for a Library/general learner, `snapshotCurrentConceptId`
is permanently `null`, the `if (snapshotCurrentConceptId)` gate at line
1282 never opens, and `decide()`/TAG/Lesson Composer simply never run —
not because any of the three engines requires school context (none of
them do; see §2), but because nothing ever seeds the one piece of state
that starts the chain.

This is exactly the kind of gap the binding directive asks ADR 08 to
find and resolve at the design level: a "world-class human teacher"
decides *how* to teach — visual vs. derivation vs. worked example,
the right Bloom level, the right interaction mode, a sensible stage
sequence — for every student in front of them, not only the ones
enrolled in a board curriculum. Today, a Library learner gets the
coarser Strategy-layer posture ("this is a CONFIDENCE_BUILDING turn")
but none of the concrete HOW: no visual-type selection, no
presentation-mode choice, no Bloom-level target, no lesson-stage
sequencing. That asymmetry is not justified by anything intrinsic to
the engines — it is justified by nothing at all; it was never decided.

A second, smaller finding from the same audit: `teachingActionGenerator.ts`'s
header comment states `decide()`'s `ActionType` "plus ... `ConceptNode.concept_type`
... are mapped" onto `TeachingActionType` — but `mapActionType()`'s actual
signature (`decision, subjectSlug, visualType, assessmentType`) never
receives `concept` or `concept_type` at all. `concept_type` genuinely
does influence the final `TeachingActionType`, but only indirectly: the
Teaching Engine's own `decide()` already folds `concept_type` into
`decision.action_type` for the `'teach'` mode case, and TAG only ever
sees that pre-baked result. The comment is imprecise, not wrong in
substance — flagged here as a doc-accuracy note, not an architectural
finding, and not worth a standalone Finding entry.

## 2. Evidence

**The Teaching Engine is intrinsically mode-agnostic.** `decide()`
(`src/lib/teaching-engine/index.ts`) takes exactly three parameters —
`StudentState`, `ConceptNode`, `LearningHistory` — none of which carries
`board`, `grade`, or any school-catalog concept. It is a pure function
with zero I/O (`ARCHITECTURE_DECISIONS.md` Permanent Rule 2). Nothing
about its signature or body couples it to School Mode.

**`deriveTeachingAction()` (TAG's pure core) is also mode-agnostic.**
Its signature is `(decision: TeachingDecision, concept: ConceptNode,
context: TeachingActionContext)`, where `TeachingActionContext` is
`{ subjectSlug, chapterTitle, weakConcepts, misconceptions,
assessmentType }` — no `board`, no `grade`, no `Chapter` object. It only
needs a subject slug and a display title, both of which a Library module
already has (`currentModule.slug` / `currentModule.title`, already read
at `route.ts` ~984–987 for the Strategy-layer block).

**`composeLessonPlan()` (Lesson Composer's pure core) is also
mode-agnostic.** Per `ENGINE_REFERENCE.md` §12, its inputs are
`TeachingDecision`, `TeachingAction`, `AssessmentDecision | null`,
`ConceptNode`, and `LessonComposerContext { activeMisconceptions,
reviewDueConceptIds }` — again no `board`/`grade`/`Chapter`.

**The only place `board`/`grade`/`Chapter` enter this chain is the two
async convenience wrappers, and in both cases the coupling is the same
shape-only pattern ADR 02 and ADR 07 already found and resolved
elsewhere:**

- `getTeachingAction()` (TAG) and `getLessonPlan()` (Lesson Composer)
  each independently call `getAssessmentDecision(userId, board, grade,
  subjectSlug, subjectId, chapter)` purely to resolve an optional
  `assessmentType`/`assessment` value for their output. Both call sites
  are wrapped in `.catch(() => null)` — a failed or skipped resolution
  degrades silently (`teachingActionGenerator.ts` ~221–224,
  `lessonComposer.ts` ~359–361).
- `getAssessmentDecision()` itself (`assessmentIntelligence.ts:207`)
  forwards `board`/`grade` only into `getMasteryProfile(userId, board,
  grade, ...)` — and ADR 07 §2 already confirmed, by reading the full
  503-line file, that `getMasteryProfile`'s `board`/`grade` parameters
  are **structurally unused**, never referenced in the function body.
- The `chapter: Chapter` parameter both wrappers require resolves, by
  grep, to a four-field interface (`src/lib/education/educationTypes.ts:164`):
  `{ id: string; order: number; title: string; kgNodeIds: string[] }`.
  Both of `getAssessmentDecision`'s actual chapter-shaped consumers —
  `getChapterProgressDetails()` (`schoolProgress.ts:119`) and
  `getMasteryProfile()` — only ever read `chapter.kgNodeIds` /
  `chapter.id` off it. This is the **identical "trivial shape, not
  genuinely board-coupled" pattern** ADR 02 §7 already proved for
  `lessonPlanner.buildLessonPlan()`'s `KnowledgeNode` parameter, and
  which that ADR's follow-up already wired via a trivial inline mapping
  from a Library module's nodes.

**Conclusion of the evidence:** none of the three engines in the Action
layer (`decide()`, TAG, Lesson Composer) is genuinely board/grade-coupled.
The entire reason this layer is School-only in practice is the single
missing write site for `currentConceptNodeId` in the Library branch of
`route.ts` — the same category of gap ADR 02 closed for
`teachingStrategy`/`spacedRevision`/`lessonPlanner`, and ADR 07 proposed
closing for `masteryIntelligence`.

**The two layers do not communicate with each other.** Grepping
`route.ts`, the Strategy-layer call (~536–551 school, ~991–1001 library)
and the Action-layer call (~1277–1395, school-only today) are
independent `try`/`catch` blocks. Neither reads the other's output.
Both append separate advisory blocks ("TEACHING STRATEGY" and "TEACHING
ENGINE DECISION" / "TEACHING ACTION" / "LESSON PLAN") to the same
`systemPrompt` for the same turn, for School-mode learners, today. This
is not a bug — Permanent Rule 11 explicitly allows independently-failing
advisory blocks — but it is also not a *designed* relationship; it has
never been stated anywhere which question each layer is supposed to
answer relative to the other. §4 makes that relationship explicit.

## 3. Alternative designs

**Option A — Leave as-is.** Rejected. Library/general learners
permanently lack the concrete HOW-to-teach layer (visual selection,
Bloom targeting, lesson-stage sequencing) for a reason that was never
chosen, only fallen into. This directly fails the binding "world-class
human teacher" test: a real teacher does not have a richer toolkit for
curriculum students than for everyone else by accident.

**Option B — Merge `TeachingStrategyType` (7 values) and
`TeachingActionType` (10 values) into one unified vocabulary/engine.**
Rejected. The two answer genuinely different-grained questions — the
Strategy layer is a *posture* synthesized from six longitudinal signals
(why this turn should feel a certain way), the Action layer is a
*concrete pedagogical form* derived from the Teaching Engine's
turn-by-turn decision (what this turn should actually look like).
Collapsing them loses that grain distinction and is exactly the kind of
premature unification ADR 07 §3 Option D already rejected for mastery,
for the identical reason: a correct unified shape depends on roadmap
items not yet specified (#4 Dynamic Lesson Composition, #5 Student
Memory Evolution), so unifying now risks redesigning again later.

**Option C — Designate the Action layer (`decide()` → TAG → Lesson
Composer) as the canonical "Teaching Action Intelligence" surface;
designate the Strategy layer as a distinct, intentionally coarser
"Teaching Posture" surface; formally document their relationship without
merging them; extend the Action layer to Library mode using the exact
additive evidence pattern ADR 02/07 already established (trivial
`Chapter`-shape mapping, structurally-unused `board`/`grade` forwarding,
a new `currentConceptNodeId` seed-and-persist path for Library
sessions).** Selected. Reasoning in §4.

**Option D — Build a brand-new third "Teaching Action Intelligence"
engine that subsumes both existing layers.** Rejected as premature, same
rationale as Option B and as ADR 07 §3 Option D: two working, live
engines already exist; replacing both with a new design this early in
the roadmap (item 3 of 8) risks a second redesign once items #4–#5
constrain the correct shape.

## 4. Selected design

The Action layer (`decide()` → TAG → Lesson Composer) is designated the
single canonical **Teaching Action Intelligence** surface — the
authority on concrete pedagogical form for a turn (`action_type`,
`presentation_mode`, `visual_type`, `interaction_level`, `bloom_level`,
`prerequisites_to_review`, and the ordered `LessonPlan` stage sequence).
The Strategy layer (`teachingStrategy.ts`) keeps its existing, distinct
role as **Teaching Posture Intelligence** — a coarser, longitudinal-signal
synthesis that answers a different question ("what should this stretch
of turns feel like for this learner") and is explicitly *not* merged
into the Action layer. This relationship — two layers, two grains, one
feeding the system prompt as a posture-level frame and the other as an
action-level instruction — is the architecture from this point forward,
recorded so it is never silently re-discovered as accidental duplication.

Two additive, independently-stageable extensions are specified (neither
implemented):

### (a) Library Mode Extension for the Action layer

Mirrors ADR 02's and ADR 07 §4(a)'s precedent exactly:

1. A `currentConceptNodeId` seed-and-persist path is added for Library
   sessions, paralleling the existing school-only write at `route.ts`
   ~1701–1724. The natural seed point is the same `currentModule`
   resolution already performed for the Strategy-layer Library block
   (`route.ts` ~984–987) — the first/in-progress node of the learner's
   current Library module becomes the initial `currentConceptNodeId`,
   and subsequent turns advance it from the Lesson Composer's own
   `currentConcept.nodeId` output, identical in spirit to how the school
   path already advances it from `lessonPlanHoisted`.
2. The `if (snapshotCurrentConceptId)` block at `route.ts` ~1282 needs no
   change at all — it is already mode-agnostic; it simply never fired
   for Library because the seed never existed.
3. `getTeachingAction()`/`getLessonPlan()`'s `board`/`grade`/`chapter`
   parameters receive the same placeholder treatment ADR 02 already
   established (`''`/`0` for board/grade) and the same trivial inline
   `Chapter` mapping ADR 02 §7's follow-up already built for
   `lessonPlanner` (`{ id: module.slug, order: 0, title: module.title,
   kgNodeIds: module.nodes.map(n => n.slug) }`).
4. No change to `TeachingActionType`'s 10-value union, `LessonStageType`'s
   10-value union, or any existing function signature — only new call
   sites in the Library branch of `route.ts`, exactly as ADR 02/07
   already did for their respective engines.

### (b) Formal Strategy/Action layer relationship (specification-only)

No code changes; a documentation contract, recorded here and in the
Bible (§6 below), so future ADRs (in particular #4 Dynamic Lesson
Composition) build on a stated relationship instead of re-discovering
the same two-layers-juxtaposed structure as a fresh ambiguity:

| Layer | Engine | Grain | Inputs | Modes (after this ADR's proposal) |
|---|---|---|---|---|
| Teaching Posture Intelligence | `teachingStrategy.ts` | longitudinal posture, ~session-scale | mastery, misconception confidence, concept transfer, confidence calibration, momentum, staleMate | School + Library (already, ADR 02) |
| Teaching Action Intelligence | `decide()` → TAG → Lesson Composer | concrete turn-level pedagogical form | `StudentState`, `ConceptNode`, `LearningHistory` | School today; School + Library (proposed, §4a) |

Neither layer calls the other. Both remain independent advisory inputs
to the same `systemPrompt`, consistent with Permanent Rule 11 (a
satellite engine degrading to null must never block a turn) — this ADR
does not propose coupling their failure modes together.

### (c) `teachingActionGenerator.ts` header comment correction

The minor doc-accuracy note in §1 (the header comment overstating
`concept_type` as a direct `mapActionType()` input) is recorded here for
a future low-risk doc fix; it does not warrant a Finding entry or any
runtime change, since the underlying behavior is already correct —
only the comment's wording is imprecise.

## 5. Trade-offs

**Option C vs. A:** C closes a real capability gap for Library learners
(visual-type selection, Bloom-level targeting, lesson-stage sequencing)
at the cost of one new seed-and-persist write path and two new call
sites — both additive, both following an already-twice-validated
pattern (ADR 02, ADR 07). A's only "advantage" is zero work, which is
not a defensible trade-off against the world-class-teacher test this
ADR is required to pass.

**Option C vs. B:** C keeps two working engines independently
testable and revertible; B would entangle them and force a single
redesign moment that the roadmap is not ready for (Dynamic Lesson
Composition and Student Memory Evolution, items #4–#5, both plausibly
change what "lesson stage" and "longitudinal signal" should mean). C's
cost is that the system prompt carries two separate advisory blocks
per turn rather than one fused block — an LLM-context cost, not an
architectural one, and already the norm today for School-mode turns.

**Within C, extension (a) specifically:** the new `currentConceptNodeId`
seed for Library sessions is the one genuinely new piece of runtime
behavior here (vs. ADR 02/07, which only added new *callers* of already-
running engines). It needs the same validation discipline as any new
persisted-state write — specified in §9.

## 6. Scalability

`decide()` has zero I/O (Permanent Rule 2) — extending its call volume
to Library mode adds no new query cost at all, only more invocations of
an already-O(1)-per-call pure function. TAG and Lesson Composer's pure
cores (`deriveTeachingAction`, `composeLessonPlan`) are likewise pure,
zero-I/O mappings. The only new I/O this ADR's proposal introduces is
the same `getAssessmentDecision` lookup the School path already performs
on every turn (already running in production at School-mode volume
today) — extending it to Library mode roughly doubles its call volume,
the same scaling change ADR 02 already made for three other engines and
ADR 07 proposed for a fourth, with no observed scaling issue. The new
`currentConceptNodeId` write for Library sessions is one additional
conditional `prisma.learnSession.update()` per turn where the concept
changed — identical cost profile to the existing School-mode write at
the same call site, already running in production.

## 7. AI independence impact

Zero change to the deterministic/probabilistic boundary (Permanent
Rules 9–10). `decide()`, TAG, and Lesson Composer remain 100%
rule-based, zero-LLM-call, in both their current School-only form and
their proposed Library-extended form — extending their reach does not
add a new probabilistic component anywhere. The practical AI-independence
benefit is the same shape as ADR 07's: today, a future non-LLM tutoring
component (roadmap item #8) reasoning about "what concrete pedagogical
form should this turn take" would have a rich, deterministic answer for
School learners and nothing but a coarse posture label for Library
learners. After this ADR's proposed extension, that answer is uniform
across both modes — directly reducing the asymmetric surface area item
#8 would otherwise have to special-case.

## 8. Backward compatibility

Fully additive at the type level: `TeachingActionType`'s 10-value union,
`TeachingMode`'s 4-value union, `TrackLevel`'s frozen 5-value union, and
`LessonStageType`'s 10-value union are all unchanged. No Prisma schema
change beyond the already-existing, already-JSON-typed
`contextSnapshot` field gaining one more populated key
(`currentConceptNodeId`) for a session category (Library) that
previously left it absent — this is the same kind of additive,
non-breaking field population ADR 02 already performed for
`lastSuccessfulTeachingStyle`/`currentWorkedExample`. No Teaching
Engine, TAG, or Lesson Composer function signature changes — only new
call sites and a new, optional seed value. School-mode behavior is
provably unaffected: the proposed Library seed path is additive code in
the `!schoolCtx` branch, and the existing `if (schoolCtx)` write at
~1701–1724 is untouched.

## 9. Validation strategy

For the future implementation (none of this runs now):
- **Library Mode smoke test** (§4a): manual dev-server chat turn against
  a Library subject, confirm the new `TEACHING ENGINE DECISION` /
  `TEACHING ACTION` / `LESSON PLAN` blocks render for a Library session,
  are advisory-only, and degrade to absent on any error per Permanent
  Rule 11.
- **Concept-progression smoke test**: confirm `currentConceptNodeId`
  advances correctly across multiple Library turns (mirrors the existing
  School-mode behavior at the same call site) and that a Library
  session's snapshot never collides with a School session's snapshot
  shape (same `contextSnapshot` JSON field, already namespaced per
  `learnSession.id`).
- **Standard regression gate**, matching every prior ADR in this
  session: `npx tsc --noEmit` diffed against a pre-change baseline,
  `npx vitest run` at identical pass count to baseline, manual smoke of
  at least one School Mode chat turn (regression check — School Mode's
  existing three blocks must render byte-identically to today, since
  none of the three engines' own logic changes).
- **Header comment fix** (§4c): no runtime validation needed; a one-line
  doc correction reviewed for accuracy only.

## 10. Migration strategy

Staged, mirroring the observe-then-enforce pattern ADR 06 §12 and ADR 07
§10 already specify:

1. **Phase 1 — Library Mode extension (§4a), flagged off by default.**
   Ship the new seed-and-persist path and the new call sites behind a
   feature flag; run for one full deploy cycle observing for errors/
   latency before flipping default on. This is the lowest-risk phase of
   the two — purely additive, no existing behavior touched, identical
   risk profile to ADR 02's already-shipped Library extensions.
2. **Phase 2 — flip Phase 1's flag on by default** once confirmed clean.
3. **Doc-only Phase — header comment correction (§4c)**, independent of
   Phases 1–2, zero runtime risk, can land at any time.

Each phase is independently revocable and independently approvable.

## 11. Relationship to previous ADRs

- **ADR 02** (`ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md`) — direct
  precedent and directly reused evidence pattern: the unused-`board`/
  `grade`-parameter proof and the trivial-`Chapter`/`KnowledgeNode`-shape
  proof that justified extending `teachingStrategy`/`spacedRevision`/
  `lessonPlanner` to Library mode apply, by the same kind of reading-the-
  function-body evidence, to `getAssessmentDecision`'s `board`/`grade`/
  `chapter` parameters as consumed by TAG and Lesson Composer's async
  wrappers. §4a is the next, not-yet-executed link in that same chain —
  now applied to the Action layer rather than the Posture layer.
- **ADR 07** (`ADR_07_MASTERY_INTELLIGENCE_ARCHITECTURE.md`) — identical
  evidence-and-extension pattern (§4a of that ADR), applied here to a
  different engine cluster. Also directly relevant: ADR 07 §13 explicitly
  predicted this ADR would benefit from "a canonical, single-source
  `MasteryLevel` signal, available in both School and Library modes" —
  this ADR's proposed Library extension (§4a) is consistent with that
  prediction; `getMasteryProfile()` (consumed transitively via
  `getAssessmentDecision`) is the same function ADR 07 already proposed
  extending, and both extensions are independently stageable.
- **ADR 03 / ADR 04** — not directly touched; same underlying principle
  ("consolidate to the live, working system; don't maintain two")
  reaffirmed here for the Strategy/Action layer relationship (§4b), but
  unlike ADR 03/04's findings, neither layer here is dead code — both
  are live, and this ADR explicitly does **not** propose retiring
  either.
- **ARCHITECTURE_DECISIONS.md Permanent Rule 12** ("No engine downstream
  of the Teaching Engine may call back upstream of it") — fully
  preserved: TAG and Lesson Composer remain pure consumers of
  `TeachingDecision`; this ADR's proposed extension adds new *callers*
  in the Library branch, never a new write path back into Student
  Memory, Mastery Intelligence, or Assessment Intelligence from within
  TAG or Lesson Composer themselves.
- **ARCHITECTURE_DECISIONS.md Permanent Rule 4** ("Teaching Action
  Generator never modifies Teaching Decisions") — unaffected; `§4a`'s
  extension adds call sites, not new write behavior inside TAG.

No conflict was found with any frozen rule in `EDUCATIONAL_BRAIN_V1.md`,
`ENGINE_REFERENCE.md`, `DEPENDENCY_RULES.md`, or `EXTENSION_GUIDE.md`.
The Teaching Engine's existing dependency contract (pure, zero I/O, no
caller-visible state) is preserved unchanged — §4a only adds a second
calling context, exactly as `DEPENDENCY_RULES.md`'s caller-based model
already accommodates for `teachingStrategy`/`spacedRevision`/
`lessonPlanner` after ADR 02 and proposes for `masteryIntelligence`
after ADR 07.

## 12. Relationship to the Canonical Knowledge Graph

No Canonical KG field is touched, read differently, or newly exposed by
this ADR. `ConceptNode`, as consumed by `decide()`/TAG/Lesson Composer,
is unchanged — `createSubjectAdapter(subjectCode).getConceptNode(id)`
(the Generic Subject Adapter) is already fully subject-agnostic and
already used identically for both School and Library subjects elsewhere
in `route.ts` (e.g. the Knowledge Graph context block at ~1177). This
ADR's proposed Library extension does not require the adapter to change
in any way — it only requires a Library session to start supplying a
valid concept id via the new seed path (§4a), which the adapter already
knows how to resolve for any subject in its registry.

## 13. Relationship to the Teaching Engine

The Teaching Engine's `decide()` function and its types
(`src/lib/teaching-engine/{index,types}.ts`) remain **completely
untouched** by this ADR — no signature change, no new field, no new
mode, no new `ActionType` value, no `TrackLevel` change. This is by
design: `decide()` is explicitly frozen (`EDUCATIONAL_BRAIN_V1.md` §4,
`EXTENSION_GUIDE.md` §8) and was already proven mode-agnostic by
construction (§2) — it takes a `StudentState`/`ConceptNode`/
`LearningHistory` triple with no awareness of School vs. Library at all.
This ADR's entire proposed extension (§4a) lives strictly *around* the
Teaching Engine — in the calling code that decides *whether* and *with
what concept id* to invoke `decide()` — never inside it. TAG and Lesson
Composer's existing guarantee (Permanent Rule 4: never modify a
`TeachingDecision`) is unaffected; both continue to read
`decision.goal`/`decision.estimated_time`/`decision.action_type`
verbatim regardless of which mode supplied the `ConceptNode`. The
Teaching Engine's role in the architecture — sole authority over
`TeachingMode`, `TrackLevel`, and the base `ActionType`/goal/time
decision — is unchanged and, after this ADR's proposed extension, simply
exercised more uniformly across the platform rather than redefined.

## 14. Future implementation plan

Not executed in this or any session until both gating conditions are
met: (1) the Curriculum Production Pipeline declares Canonical Knowledge
Graph v1 frozen, and (2) the user explicitly approves execution. When
both are satisfied, implementation proceeds in the phases specified in
§10, in order, each independently validated per §9 before being
proposed for the next.

This ADR directly feeds roadmap item **#4 — Dynamic Lesson Composition**
(the next item): with the Action layer's Library-mode gap named and a
concrete extension specified, item #4 can design the next evolution of
`LessonPlan`/`LessonStageType` against a single, mode-uniform Action
layer rather than having to special-case School vs. Library lesson
composition as a fresh, unresolved asymmetry. It also feeds roadmap item
**#5 — Student Memory Evolution**, since the new `currentConceptNodeId`
Library-mode seed (§4a) is itself a small but real extension of what
Student Memory's session-snapshot layer persists — item #5 should treat
this ADR's seed mechanism as existing precedent when it designs the
fuller long-term memory model.
