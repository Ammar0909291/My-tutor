# Phase 1 — Teaching Quality Architecture

**Document class:** Architecture blueprint. Design only.
**Status:** DRAFT — revised after architecture review R1; pending fresh review. Not approved,
not merged, not implemented.
**Version:** 1.1.0-draft (supersedes 1.0.0-draft; see Appendix C for the full review response)
**Owner:** Pappu (Chief Architect track)
**Phase:** 01 of the phased architecture program (`phase-01-teaching-quality`)
**Normative language:** RFC 2119 (MUST / MUST NOT / SHOULD / MAY).

**Governance compliance.** This document writes no code, modifies no runtime, no route,
no schema, no API, no curriculum file, no Knowledge Graph, and no existing
`educational-brain/` file. It introduces no competing state machine, no second decision
authority, and no parallel pipeline. Implementation of every component described here
remains gated on the standing G1 (Canonical KG v1 freeze) and G2 (explicit per-item owner
approval) rules recorded in project memory. Nothing in this document constitutes a request
for implementation approval.

---

## Table of Contents

0. [Reconciliation Map — what is new, what is reused](#0-reconciliation-map)
1. [Executive Summary](#1-executive-summary)
2. [Design Principles](#2-design-principles)
3. [System Overview and Layer Model](#3-system-overview-and-layer-model) — incl. **§3.4 Data Dependencies** *(new in v1.1.0)*
4. [TQ-1 · Teaching Strategy Engine](#4-tq-1--teaching-strategy-engine)
5. [TQ-2 · Pedagogical Planner](#5-tq-2--pedagogical-planner) — incl. **§5.0 Lifecycle Synchronization** and **§5.7 Relationship to ADR 09** *(new in v1.1.0)*
6. [TQ-3 · Teaching Method Library](#6-tq-3--teaching-method-library)
7. [TQ-4 · Adaptive Re-teaching Framework](#7-tq-4--adaptive-re-teaching-framework)
8. [TQ-5 · Lesson Gold Standard](#8-tq-5--lesson-gold-standard)
9. [TQ-6 · Teacher Decision Flow](#9-tq-6--teacher-decision-flow)
10. [TQ-7 · Teaching Quality Metrics](#10-tq-7--teaching-quality-metrics)
11. [Interfaces Between Components](#11-interfaces-between-components)
12. [Risks](#12-risks)
13. [Trade-offs](#13-trade-offs)
14. [Future Implementation Guidance](#14-future-implementation-guidance)
15. [Acceptance Criteria](#15-acceptance-criteria)
16. [Open Questions](#16-open-questions)

Appendices: A Glossary · B Compliance statement · **C Review response (v1.1.0)** ·
**D Curriculum Feedback** *(both new in v1.1.0)*

---

## 0. Reconciliation Map

This section comes first because it is the section that protects the architecture. The
repository already contains a large, deliberate teaching-decision corpus. A Phase 1 that
re-designed those components would produce exactly the failure the project's governance
rules exist to prevent: two authorities for one question, resolved at runtime by whichever
code path ran last.

Every Phase 1 deliverable is therefore classified against what already exists.

| Phase 1 deliverable | Existing owner(s) | Verdict | What Phase 1 actually contributes |
|---|---|---|---|
| 1. Teaching Strategy Engine | EOS v3 `C-30` (selection funnel **and per-learner approach history**); `educational-brain/decision-engine/04` (seven filters); `foundations/02` (D1 grid) | **EXTEND, with one explicit ownership transfer** | `C-30` selects an *action per turn*. No component holds a *named, committed multi-turn approach*. TQ-1 adds the Strategy object above `C-30` and leaves `C-30`'s selection unchanged. **Ownership transfer:** `C-30`'s stated responsibility to "maintain per-learner approach history" moves to TQ-4's typed `failedAttempts` set — see §4.1. |
| 2. Pedagogical Planner | `C-33` (session shape); `C-29` (teaching states); `decision-engine/07` | **NEW LAYER, NO NEW ADVANCEMENT AUTHORITY** | Nothing owns the **concept-level lesson arc** (Hook → … → Revision). TQ-2 adds it as intra-state structure over `C-29`'s existing states. It is a third lifecycle, not a second advancement authority — see §5.0. |
| 2b. Cross-turn lesson-stage continuity | **ADR 09** (`contextSnapshot.lessonStageProgress`, Option B, selected) | **TQ-2 IS ADR 09 GENERALIZED** | ADR 09's selected design already persists concept-scoped stage position across turns using the proven AI-emitted-tag pattern. That object *is* the arc position. TQ-2 adopts ADR 09's vocabulary, key, and persistence mechanism and generalizes them across sessions and archetypes — it does not introduce a parallel pointer. Full treatment in §5.7. |
| 3. Teaching Method Library | `educational-brain/teaching-actions/` (27 actions, 6 families) | **EXTEND** | The catalogue is a set of *moves*. A Method is a multi-turn *technique* with preconditions, internal beats, a quality contract, and a failure signature. TQ-3 defines the Method schema and composes existing actions; it redefines no action. |
| 4. Adaptive Re-teaching | `C-31`; `decision-engine/05` (escalation ladders); `assessment/09` (failure taxonomy) | **EXTEND** | The ladders exist. What does not exist is a *checkable definition of "different"*. TQ-4 adds the Difference Operator, which converts the anti-paraphrase rule from an aspiration into an enforceable constraint. |
| 5. Lesson Gold Standard | — | **GENUINELY NEW** | No document in the repository defines when a lesson is good enough to ship. |
| 6. Teacher Decision Flow | `C-28` (four bands) | **CONSOLIDATE** | The eight questions in the brief are not eight decisions; they resolve into `C-28`'s existing band order. TQ-6 supplies the missing per-question deterministic answering rules and the unified flow. |
| 7. Teaching Quality Metrics | `OUTCOME_SCIENCE_FRAMEWORK.md` (outcome science, 16 constructs) | **COMPLEMENT** | OSF measures whether *learning* happened. Nothing measures whether *teaching* had the properties of good teaching. TQ-7 owns process quality and the process↔outcome join; it defines no competing outcome metric. |

**Taxonomies reused — and audited before reuse.**

Version 1.0.0-draft treated verbatim reuse as sufficient. It is not. Reuse without
verification propagates whatever defect the source carries, and it did: the knowledge-type
taxonomy below was adopted unaudited and turned out to be both unbacked by data and
internally incoherent. Every reused taxonomy is now recorded with its audit result.

- **Knowledge types** — `decision-engine/04` Filter 2. **Audited; two defects found and
  corrected here.** (i) The category `live misconception` is a property of a *learner-concept
  pair*, not of a concept. It is removed from the concept-intrinsic taxonomy and re-sited as a
  learner-state precondition — see §3.4 and §6.2. The concept-intrinsic set used by this
  document is therefore the five members: `concept`, `procedure`, `causal system`,
  `fact/convention`, `physical procedure`. (ii) No such field exists in the data; see §3.4 and
  the REQUIRED-BUT-ABSENT classification there. Both are recorded as Curriculum Feedback
  against `decision-engine/04` in Appendix D; neither is fixed by editing that file, which is
  outside this document's authority.
- Teaching states — `C-29`: `UNSTARTED → FRAMED → INSTRUCTED → GUIDED → RELEASED → VERIFIED
  → CONSOLIDATED → TRANSFERRED`, plus preemptive `RECOVERY`. *Audited: consistent, adopted
  unchanged.*
- Lesson-stage continuity vocabulary — ADR 09: `LessonStage`, `LessonStageType`,
  `lessonStageProgress`, `planSignature`, and the named `replan` event. *Audited: adopted and
  generalized, §5.7.*
- Response diagnosis — `foundations/02` D1 grid (speed × correctness × confidence).
- Failure causes — `assessment/09` six-cause taxonomy.
- Misconception birth types — `educational-brain/misconceptions/` (six types).
- Action catalogue — `educational-brain/teaching-actions/` (27 actions, 6 families).

**Supersession status.** Phase 1 supersedes no existing ADR or `educational-brain/` file.
One ADR requires an index amendment rather than supersession: **ADR 09 is absorbed, not
superseded** — its selected Option B remains the correct mechanism and TQ-2 is its
generalization. On approval of this document, the Bible's ADR index should record ADR 09 as
*extended by Phase 1 TQ-2*, which is a scope note, not a supersession. Marking it superseded
would be wrong and would discard a design already proven in production for one stage type.

Where Phase 1 finds an existing rule insufficient it says so explicitly and adds a layer above
it; where it finds an existing rule *defective* (the knowledge-type taxonomy) it records
Curriculum Feedback rather than editing another owner's file.

---

## 1. Executive Summary

### 1.1 The question

> *How does an AI decide to teach like an exceptional human teacher?*

The honest answer this architecture gives is that it does not decide — not in the sense of
one model choosing well. Exceptional teaching is not a generation problem. It is a
**constraint problem plus a selection problem plus a memory problem**, and each of the
three fails in a different way when handed to a language model:

- **Constraint.** A model asked to teach will answer, because answering is what its
  training rewards. Withholding, slowing down, refusing to advance on a weak signal, and
  ending a session deliberately are all behaviours that must be *structurally impossible to
  violate*, not politely requested in a prompt.
- **Selection.** "Which teaching move now" is a genuine pedagogical judgement over an
  enumerated space with real evidence attached. Left to next-token plausibility, it
  collapses to the most fluent move, which is nearly always *explain again*.
- **Memory.** The single most recognizable failure of AI tutoring is re-explaining the same
  thing in different words. That failure is not a wording problem. It is the absence of a
  record of what was already tried and a definition of what would count as different.

### 1.2 What Phase 1 adds

Three structural additions, and one measurement instrument.

**(A) The missing middle layer.** The system today has a per-session planner and a per-turn
kernel, and nothing between them. But teaching a concept is neither a session nor a turn —
it is a *campaign* spanning many turns and often several sessions. Phase 1 introduces two
objects at that scale:

- the **Teaching Strategy** (TQ-1): a named, committed, multi-turn approach to one concept
  for one learner, selected once and held until explicitly invalidated;
- the **Concept Lesson Arc** (TQ-2): the pedagogical shape that strategy takes — Hook,
  Intuition, Explanation, Visual, Examples, Guided Practice, Independent Practice, Summary,
  Revision — expressed as a partially ordered set of phases with entry conditions and exit
  evidence, mapped onto the existing teaching states rather than replacing them.

Without this layer, every turn is decided afresh, and coherence across turns is an accident
of prompt context. With it, incoherence becomes detectable: a turn that does not advance the
committed strategy's arc is a recorded deviation with a reason.

**(B) The Difference Operator.** Phase 1's sharpest contribution. Teaching attempts are
modelled as vectors on seven axes — channel, method, representation family, concreteness,
entry point, granularity, agency. Re-teaching is legal only when the new attempt differs
from the failed attempt on **exactly one** load-bearing axis, and that axis is the one the
diagnosis implicates. Distance zero *is* paraphrase, and is therefore illegal by
construction rather than discouraged by instruction. This is checkable at decision time and
verifiable at output time, and it is what converts "genuinely change teaching strategy" from
an intention into a guarantee.

**(C) The Lesson Gold Standard.** Ten hard gates and ten scored dimensions, all defined over
evidence the system already records. The architecturally important part is not the rubric —
it is the split it forces: each gate is classified as **structurally enforced** (impossible
to violate, because legality or a contract clause prevents it) or **measured after the fact**
(possible to violate, detected later). A quality criterion that cannot be placed in the first
category is an aspiration, and the document says which is which rather than implying all are
guarantees.

**(D) Process quality metrics** (TQ-7), distinguished from outcome metrics, which the
Outcome Science Framework already owns. The join between the two — which teaching properties
actually predict retention — is the only place the platform can learn something no general
model has, because it requires being the venue where the learning happened.

### 1.3 What Phase 1 deliberately does not do

It does not attempt to make teaching quality emerge from better prompting; it does not
introduce a second authority for advancement, a second decision authority, or a second content
model — it does introduce two additional *planning* lifecycles, whose synchronization with
`C-29` is specified in §5.0; it does not resolve
the content-coverage problem (the honest dominant failure mode of every component here is
empty libraries, not wrong logic); and it does not claim the metrics prove learning — only
delayed unassisted retrieval does that, and that instrument belongs to OSF.

---

## 2. Design Principles

Ten principles. Each is stated so that a future design decision can be checked against it
and found in violation.

**P1 · Decide before you speak.**
Every consequential choice is made, recorded, and constrained before any text is generated.
The renderer voices a decision; it never makes one. *(Inherited from EOS `C-28`/`C-35`;
restated because every Phase 1 component sits upstream of the renderer and must not smuggle
a decision downstream.)*

**P2 · Quality that matters is structural, not exhortative.**
If a teaching property can be violated by a fluent model in a plausible moment, an
instruction will not prevent it. Prefer legality constraints and contract clauses over
guidance. Where structural enforcement is impossible, say so and measure instead.

**P3 · Different must be defined, not asserted.**
Any rule of the form "change the approach" is inert until "changed" is computable. Every
adaptive move in this architecture carries a distance definition.

**P4 · Commitment across turns, adaptation within them.**
A strategy is held until invalidated; a turn adapts freely inside it. Neither extreme works:
per-turn re-decision produces incoherence, and rigid plans produce scripted courseware. The
strategy is a *frame*, the arc is a *budget*, and deviation inside them is free and recorded.

**P5 · Diagnose before re-teaching.**
Re-teaching without classifying the failure is guessing with extra steps. A re-teach with no
recorded diagnosis is a defect, not a kindness.

**P6 · The learner's production is the evidence; the tutor's confidence is not.**
Advancement requires unassisted learner production. Nothing the tutor says, and nothing the
learner echoes, is evidence of anything.

**P7 · Struggle is the mechanism; distress is the stop.**
Difficulty is retained deliberately because it is how learning happens. Affect has absolute
veto. These are not in tension: the first is the objective, the second is the boundary.

**P8 · One reason per change.**
When something is changed in response to failure, change exactly one thing. Two
simultaneous changes may work and teach you nothing about why — which means the next
learner gets no benefit.

**P9 · Every component must be able to be wrong.**
Each component declares a falsifiable prediction and a failure signature. A component that
cannot fail observably cannot be improved and cannot be trusted.

**P10 · Reuse before creation, always.**
Before any new object, rule, taxonomy, or library is introduced, the existing corpus is
checked and the reuse decision is recorded. A new system is never the answer to an existing
system being rough.

---

## 3. System Overview and Layer Model

### 3.1 The four time scales

The central organizing insight of this phase. Teaching decisions occur at four distinct
scales, and conflating any two of them is the source of most teaching-quality defects.

```
 SCALE            HORIZON              OWNER                     QUESTION ANSWERED
 ───────────────────────────────────────────────────────────────────────────────────────
 CURRICULUM       weeks – months       C-33 + Review Scheduler   Which concept next?
 CAMPAIGN         many turns,          ★ TQ-1 Strategy           How will this concept
  (per concept)   often multi-session  ★ TQ-2 Arc                be taught, in what shape?
 EPISODE          one session          C-33 Session Planner      What is the shape of today?
 TURN             one exchange         C-28 Decision Kernel      What happens right now?
```

★ = introduced by Phase 1. The Campaign scale is the gap. Everything the brief asks for —
lesson flow, method switching, genuine re-teaching, lesson quality — lives at Campaign
scale, which is precisely why none of it currently has an owner.

### 3.2 Component map

```
                       ┌─────────────────────────────────────────────┐
                       │  PLANE 1 — PERCEPTION  (existing, untouched) │
                       │  Sensors · Learner Twin · Mastery · Affect   │
                       └───────────────────────┬─────────────────────┘
                                               │  learner state projection
                                               ▼
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │  CAMPAIGN SCALE                                        ★ PHASE 1              │
  │                                                                              │
  │   ┌────────────────────┐  strategy   ┌────────────────────┐                  │
  │   │ TQ-1 STRATEGY      │────────────▶│ TQ-2 PEDAGOGICAL   │                  │
  │   │ ENGINE             │             │ PLANNER            │                  │
  │   │ picks + holds the  │◀────────────│ instantiates the   │                  │
  │   │ multi-turn approach│ invalidation│ 9-phase arc        │                  │
  │   └─────────┬──────────┘             └─────────┬──────────┘                  │
  │             │  method sequence                 │  current phase +            │
  │             │                                  │  exit evidence required     │
  │             ▼                                  │                             │
  │   ┌────────────────────┐                       │                             │
  │   │ TQ-3 METHOD        │                       │                             │
  │   │ LIBRARY            │  composes ▶ 27-action catalogue (existing)          │
  │   └─────────┬──────────┘                       │                             │
  │             │                                  │                             │
  │   ┌─────────▼──────────────────────────────────▼──────────┐                  │
  │   │ TQ-4 ADAPTIVE RE-TEACHING (Difference Operator)       │                  │
  │   │ owns every response to failure at Campaign scale      │                  │
  │   └───────────────────────────┬───────────────────────────┘                  │
  └───────────────────────────────┼──────────────────────────────────────────────┘
                                  │  constrained legal approach set
                                  ▼
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │  TURN SCALE  (existing, untouched)                                           │
  │  C-28 Decision Kernel  →  C-29 State Machine  →  C-30 Action Selector        │
  │  C-31 Recovery · C-32 Struggle · C-34 Compiler · C-35 Renderer · C-36 Verifier│
  └───────────────────────────────┬──────────────────────────────────────────────┘
                                  │  decisions + outcomes (the Ledger)
                                  ▼
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │  ★ TQ-5 LESSON GOLD STANDARD    ★ TQ-7 TEACHING QUALITY METRICS              │
  │  evaluate trajectories          measure process quality; join to OSF outcomes │
  └──────────────────────────────────────────────────────────────────────────────┘

  ★ TQ-6 TEACHER DECISION FLOW is not a component. It is the specification of how
    all of the above compose into the eight decisions a teacher actually makes.
```

### 3.3 The one-authority rule, restated per question

| Question | Single authority | Phase 1 relationship |
|---|---|---|
| What is the learner's state? | Learner Twin (Plane 1) | consumer only |
| Which concept next? | `C-33` + Review Scheduler | consumer only |
| What state is this concept's teaching in? | `C-29` | consumer; TQ-2 adds sub-structure inside states (§5.0 SYNC-1/SYNC-3) |
| Is the learner ready to advance? | `C-29` **alone** | TQ-2 may propose, never certify (§5.0 SYNC-3) |
| What is legal right now? | `C-29` | TQ-4 *adds* constraints (never removes) |
| Which approach for this concept? | **TQ-1** | new |
| Which pedagogical phase now? | **TQ-2** | new |
| Which action this turn? | `C-30` | unchanged; now operates inside a strategy frame |
| Is this re-teach genuinely different? | **TQ-4** | new |
| Is this lesson good enough? | **TQ-5** | new |
| Did learning occur? | OSF | TQ-7 supplies the process side of the join only |

---

### 3.4 Data dependencies

Added in v1.1.0. Version 1.0.0-draft asserted that its components ran on data the system
already holds. Review found that false in at least one load-bearing case. An architecture that
depends on fields that do not exist is not a design, it is a wish, so every required field is
now recorded with its existence status, its owner, its acquisition path, and — most
importantly — the **defined behaviour when it is absent**.

**Status legend.** `PRESENT` — exists in data today. `DERIVED` — computed at runtime from
present fields. `RECORDED` — written by an existing runtime path. `ABSENT` — does not exist;
acquisition required. `ABSENT-GATED` — does not exist and its acquisition is gated on G1/G2.

| Field | Consumer | Status | Owner | Acquisition path | Behaviour when absent |
|---|---|---|---|---|---|
| Concept id, prerequisites, difficulty, bloom | TQ-1 S2/S3, TQ-2 | PRESENT | Curriculum Production Pipeline | — | n/a |
| **Concept knowledge type** (5-member taxonomy) | **TQ-1 S2; every Method's `knowledgeTypeFit[]`** | **ABSENT-GATED** | Curriculum Production Pipeline | New canonical KG field, or an authored per-concept assignment. **G1-gated.** | **S2 goes INERT** — see §3.4.1 |
| Concept-level authored dispatch | TQ-1 S1 | PRESENT (sparse, ~250 of ~1,756) | `educational-brain/concepts/` | Ongoing authoring program | S1 does not fire; funnel proceeds to S2 |
| Mastery / ladder rung per concept | TQ-1 S3, TQ-2 exits, `C-29` | RECORDED | Plane 1 Learner Twin | — | n/a |
| ACTIVE misconception set | TQ-1 S3, TQ-4 C2 | RECORDED | Plane 1 | — | S3 cannot cut corrupted-prerequisite archetypes; recorded as reduced-confidence selection |
| Response speed / confidence (D1 grid) | TQ-4 T9/T10, TQ-5 S5 | **ABSENT in both channels** | Multimodal I/O plane | `foundations/03 §7` records the cause: the STT path requests bare transcription and discards timing and prosody before the decision layer sees the turn. Recovery is cheap but is a runtime change. | T9/T10 undetectable; **S5 NOT YET SCOREABLE** (§8.4) |
| Working-capacity estimate | TQ-1 S6, TQ-5 S2 | ABSENT | — (no instrument specified anywhere) | Requires an instrument this architecture does not design | S6 uses archetype static load only; **S2 NOT YET SCOREABLE** |
| Attempt vector components | TQ-4 L1–L4 | ABSENT | TQ-4 (this document) | Capture, not derivation — see §11.2 | TQ-4 cannot function; this is Stage 1's entire purpose |
| Lesson-stage position | TQ-2 | ABSENT (designed, not built) | ADR 09 Option B, selected but unimplemented | `contextSnapshot.lessonStageProgress` | Arc position unknown; TQ-2 inert |
| Asset availability per concept | TQ-1 S7, TQ-3 `degradedForm` | PRESENT | AssetIdentity catalogue | — | Treated as unavailable; degraded form runs |
| Population effectiveness evidence | TQ-1 S8, TQ-7 Tier D | ABSENT (accumulates post-launch) | Evidence Engine (ADR 13) | Accrues only after Stages 1–6 run | S8 falls through to deterministic seed |

**The honest summary of this table:** six of the eleven fields are absent today, and three of
those are absent for reasons this document cannot fix. That is not a reason to abandon the
design — Stage 1 (§14.2) exists precisely to acquire the most important of them — but it is a
reason to stop describing the components as ready to run.

#### 3.4.1 Knowledge type: REQUIRED BUT ABSENT

The single most consequential data gap, and the one v1.0.0-draft got wrong twice.

**What exists.** `src/lib/curriculum/subjectKgAdapter.ts` derives a three-value
`ConceptType` — `conceptual | application | problem_solving` — by switching on the KG's
`bloom` field. The canonical KG's 10-field schema carries no knowledge-type field at all.

**What is required.** The five-member concept-intrinsic taxonomy (§0): `concept`, `procedure`,
`causal system`, `fact/convention`, `physical procedure`.

**These do not map.** Bloom level describes *cognitive demand*; knowledge type describes *what
kind of thing is being learned*. A `procedure` and a `causal system` can share a Bloom level
and must be taught completely differently — which is precisely what filter S2 exists to
express. Deriving one from the other would produce confident, wrong archetype selection.

**Interim behaviour: S2 GOES INERT.** When knowledge type is unavailable for a concept, filter
S2 does not run and cuts nothing; the funnel proceeds to S3 with the full archetype set, and
the selection record is marked `knowledgeTypeUnavailable`. Every Method's `knowledgeTypeFit[]`
is likewise non-binding for that concept.

Inert, deliberately, rather than heuristic. A wrong knowledge type silently mis-selects the
archetype for an entire concept campaign, and the failure is invisible — the lesson looks
fine and teaches the wrong way. An absent filter merely widens the candidate set, which the
later filters then narrow on evidence that does exist. **Under asymmetric caution (P7's
sibling principle), a missing filter is strictly safer than a fabricated one.**

**Acquisition path.** A knowledge-type field on the canonical KG, authored by the Curriculum
Production Pipeline. This is G1-gated and is explicitly *not* requested by this document. It
is recorded as Curriculum Feedback in Appendix D.

#### 3.4.2 `live misconception` is not a concept type

The second correction. `decision-engine/04` Filter 2 lists `live misconception` alongside five
concept-intrinsic categories. It does not belong there: a concept is never *of type* live
misconception — a **learner** has one, about a concept. Filtering concept-intrinsic archetype
fit by a learner-state category conflates the two and produces incoherent selection.

**Correction applied throughout this document:**
- Removed from the concept-intrinsic taxonomy (§0) and from filter S2.
- Re-sited as a **learner-state precondition** in filter S3, where the ACTIVE-misconception
  check already lives, and in Method `preconditions[]`/`prohibitions[]` (§6.2).
- M14 Error Analysis and M2 Analogy's misconception prohibition are expressed against learner
  state, not concept type.

Recorded as Curriculum Feedback against `decision-engine/04` (Appendix D). That file is not
edited here — it belongs to another authority, and silently correcting another owner's file is
exactly the behaviour the governance rules forbid.

---

## 4. TQ-1 · Teaching Strategy Engine

### 4.1 Why it exists

`C-30` answers "which action this turn." It answers it well, and it answers it *afresh every
turn*. That is the defect. A human teacher who has decided to teach fractions by physical
partitioning does not reconsider that decision every sixty seconds; they run the approach,
watch it, and change it deliberately when it fails. A system that re-selects per turn will,
under a fluent renderer, drift toward whichever move is locally most plausible — and the
locally most plausible move is almost always another explanation.

There is also a subtler failure. Without a committed approach, "we already tried that" has
no referent. The action history is a list of moves, not a record of an approach. So the
system cannot tell the difference between *this analogy failed* and *analogical teaching is
wrong for this learner on this concept* — and it is the second judgement that a good teacher
makes.

**Ownership transfer from `C-30` (recorded v1.1.0).** Version 1.0.0-draft claimed "nothing owns
a multi-turn approach." That overstated the gap: `C-30`'s documented responsibilities already
include *"maintain per-learner approach history so the system does not repeat what already
failed for this person."* The accurate statement is narrower and still sufficient to justify
this component: **`C-30` owns an untyped approach history at turn scale; no component owns a
named, committed approach at campaign scale.**

This document therefore makes one explicit ownership transfer rather than a silent takeover:

> `C-30`'s per-learner approach history is **superseded by TQ-4's typed `failedAttempts` vector
> set** (§7.4.4), which is the same responsibility with a defined structure, a defined growth
> and compaction policy (§12 R8), and a defined comparison semantics. `C-30` retains action
> selection and relinquishes approach memory. On implementation, `C-30`'s responsibility list
> must be amended to record this, or two approach histories will accumulate independently.

Stating the transfer is the point. A silent takeover of another component's documented
responsibility is exactly what the governance rules forbid, and it was present in v1.0.0-draft.

### 4.2 Purpose

Select, commit to, hold, monitor, and deliberately abandon a **Teaching Strategy**: a named
multi-turn approach to one concept for one learner.

### 4.3 The Strategy object

A Strategy is a *frame*, not a script. It constrains and orders; it does not dictate
utterances.

```
TeachingStrategy {
  strategyId
  conceptId                  -- exactly one concept; strategies never span concepts
  learnerId
  attemptOrdinal             -- 1 for first attempt at this concept, 2 after abandonment…
  archetype                  -- from the closed set in §4.4
  rationale                  -- why this archetype, citing the inputs that selected it
  alternativesRejected[]     -- mandatory; the archetypes not chosen and why
  entryRepresentation        -- the concrete starting representation
  methodSequence[]           -- ordered, from TQ-3; a plan, not a contract
  commitments[]              -- properties that MUST hold while the strategy is active
  abandonmentConditions[]    -- explicit, pre-declared; §4.6
  budget { turns, attempts, sessions }
  distanceSignature          -- the TQ-4 vector this strategy occupies
  status                     -- PROPOSED | ACTIVE | SUSPENDED | ABANDONED | COMPLETED
                             --   lifecycle and its synchronization: §5.0
  policyVersion              -- policy version that produced it
  archetypeSetVersion        -- which closed archetype set was in force
  axisSetVersion             -- which axis set distanceSignature is expressed in
}
```

**Versioning of the closed sets (added v1.1.0).** §4.4 and §6.3 are closed sets amended by
version, but v1.0.0-draft never said what happens to accumulated evidence when they change.
Three rules close that gap:

- **V-1 · Every persisted vector carries `axisSetVersion`.** Vectors recorded under a retired
  axis set remain readable but are **not comparable** across versions, and `closure()` is never
  applied across an axis-set boundary (§7.4.4).
- **V-2 · Effectiveness evidence is version-scoped and never silently carried forward.** Adding
  a tenth archetype does not inherit the ninth's evidence, and amending an archetype's
  definition starts a new evidence lineage rather than continuing the old one. Carrying
  evidence across a definitional change would attribute outcomes to a policy that did not
  produce them.
- **V-3 · An amendment declares its migration.** Each amendment states, per affected record
  class, whether prior evidence is `CARRIED` (definition unchanged, id renamed), `SCOPED`
  (readable, excluded from current attribution), or `RETIRED`. An amendment with no declared
  migration is rejected at review.

Three fields carry most of the architectural weight.

**`alternativesRejected[]` is mandatory.** A strategy record that says only what was chosen
cannot be debugged and cannot be learned from. It is also the input to TQ-4: the rejected
set is where the *next* strategy comes from when this one fails, and computing it fresh
after a failure — under time pressure, with the learner waiting — produces worse choices
than computing it up front when nothing was urgent.

**`abandonmentConditions[]` are declared in advance.** A strategy that can be abandoned for
any reason at any time is not a commitment. Pre-declaring the exit conditions is what makes
holding it meaningful, and it removes the single largest source of drift: abandoning an
approach because the current turn felt awkward.

**`commitments[]` are properties, not steps.** Example: a `CONCRETE-FIRST` strategy commits
to *no symbolic notation before the learner has produced the idea in concrete form*. This is
a constraint the Decision Kernel enforces every turn, and it is exactly the kind of rule that
prompt instructions fail to hold across a long conversation.

### 4.4 Strategy archetypes

A **closed, enumerated set**. Closure is deliberate: an open set cannot be reasoned over,
cannot accumulate evidence, and cannot be tie-broken deterministically. New archetypes are
added by versioned amendment, never invented at runtime.

| # | Archetype | Shape | Best fit (knowledge type) | Prerequisite demand | Characteristic failure |
|---|---|---|---|---|---|
| A1 | **CONCRETE-FIRST** | manipulate → notice → name → symbolize | concept; physical procedure | very low | learner enjoys the manipulation, never abstracts |
| A2 | **DERIVATIONAL** | establish prior → show necessity → arrive at the claim | concept; causal system | high — priors must be solid | derivation is followed and not retained |
| A3 | **CONTRASTIVE** | present near-neighbours → force discrimination → name the difference | concept *(and the archetype of choice when the learner has an ACTIVE misconception — learner state, not concept type)* | medium | learner learns the pair, not the principle |
| A4 | **NARRATIVE** | a situation that *requires* the idea → the idea as resolution | fact/convention; concept | low | the story is remembered, the idea is not |
| A5 | **MODEL-BUILDING** | build the mental model explicitly → operate it → test it | causal system | medium | the model is accepted, never run |
| A6 | **PROCEDURAL-COACHING** | worked → completion → faded → independent | procedure | low | fluency without meaning |
| A7 | **SOCRATIC-DISCOVERY** | question-led construction by the learner | concept | **high** — needs material to reason from | degenerates into guessing; illegal for beginners |
| A8 | **ANALOGICAL-TRANSFER** | map a known domain → transfer structure → mark the breakdown | concept; causal system | medium — source domain must be genuinely known | imported inference becomes a new misconception (birth type 6) |
| A9 | **EXPERIENTIAL-SIMULATION** | interact with a system → extract its behaviour → formalize | causal system; physical procedure | low | play without extraction |

Each archetype's *characteristic failure* column is load-bearing: it is the failure signature
TQ-7 monitors and TQ-4 diagnoses against.

**Archetype admissibility rule (added v1.1.0).** §6.7 states an admissibility rule for Methods
— a method duplicating another's distance signature *and* failure signature is the same method
renamed — but v1.0.0-draft applied no equivalent rule to archetypes, which is inconsistent.
The rule now applies to both, with one addition:

> An archetype is admissible only if it differs from every other archetype on **at least two**
> of: (i) characteristic failure, (ii) prerequisite demand profile, (iii) knowledge-type fit.
> One dimension of difference is a variant, not an archetype.

**Audit of the two pairs review flagged as under-discriminated:**

- **A2 DERIVATIONAL vs A5 MODEL-BUILDING.** *Retained as distinct.* They differ on all three:
  A2's characteristic failure is *followed and not retained* (the learner accepts each step and
  reconstructs none); A5's is *accepted and never run* (the learner holds the model as a
  picture and cannot operate it). A2 demands solid formal priors; A5 demands almost none — it
  builds the model from scratch. A2 fits `concept` and `causal system`; A5 fits `causal system`
  only. The distinction is real: a derivation establishes *necessity*, a model establishes
  *mechanism*, and a learner can have either without the other.
- **A3 CONTRASTIVE vs A8 ANALOGICAL-TRANSFER.** *Retained, with a sharpened boundary.* Both
  reason over a reference case, which is what made them look alike, but they run in opposite
  directions. A3 uses a **near** neighbour to force *discrimination* — the reference is
  deliberately similar and the learning is what separates them. A8 uses a **distant** source to
  force *transfer* — the reference is deliberately dissimilar and the learning is what carries
  across. Their characteristic failures are correspondingly opposite: A3 fails by the learner
  memorizing the pair instead of the principle; A8 fails by the learner importing an inference
  the source has and the target does not. **Sharpened boundary added to the set definition:**
  A3's reference case must share the concept's domain; A8's must not. An archetype using a
  same-domain reference for transfer is A3 misapplied, and this is now checkable.

Both pairs survive. The audit was still worth running — it produced the A3/A8 domain rule,
which did not exist before and which prevents a real misselection.

**A7 SOCRATIC-DISCOVERY carries a hard legality gate.** It is illegal when the learner has
nothing to reason from — which is the definition of a complete beginner on this concept. This
gate already exists in `C-29` ("no assessment action is legal before INSTRUCTED") and in the
first-lesson corpus; TQ-1 restates it because archetype selection is where the violation
would originate.

### 4.5 Selection procedure

Selection runs **once per concept-attempt**, not per turn. It is a narrowing funnel,
deliberately structured to match `C-30`'s existing seven-filter shape so that the two are
legible as one family of mechanism rather than two competing ones.

```
S1  AUTHORED OVERRIDE
    The concept's educational-brain entry names a dispatch order?
    → That order IS the strategy. Human expertise on this specific claim
      beats generic policy. Its named poor-fits are excluded outright.
    → Funnel stops. (Today: ~250 of ~1,756 concepts. See §4.9.)

S2  KNOWLEDGE-TYPE FIT
    Cut archetypes outside the concept's knowledge-type row (the FIVE-member
    concept-intrinsic taxonomy — §0, §3.4.2; `live misconception` is NOT a
    member and is handled at S3 as learner state).
    → REQUIRED-BUT-ABSENT (§3.4.1). When knowledge type is unavailable this
      filter GOES INERT and cuts nothing; the selection record is marked
      `knowledgeTypeUnavailable`. Deliberately inert rather than heuristic:
      a fabricated knowledge type mis-selects an entire campaign invisibly,
      whereas an absent filter merely widens the set for S3–S8 to narrow on
      evidence that does exist.

S3  PREREQUISITE AND LEARNER-STATE ADMISSIBILITY
    Cut archetypes whose prerequisite demand exceeds verified learner state.
    → This is the filter that eliminates A7 and A2 for beginners.
    → An ACTIVE misconception on a prerequisite cuts every archetype that
      builds on that prerequisite (reuses C-29's corrupted-foundation rule).
    → An ACTIVE misconception on THIS concept constrains the set toward
      collision-capable archetypes (A3 CONTRASTIVE) and cuts A8 outright
      (analogies reinforce whichever schema is already active). This is
      where the former `live misconception` "knowledge type" correctly
      lives — it is learner state, not a property of the concept (§3.4.2).

S4  LEARNER CONSTRAINTS
    Reading load, attention span, modality availability, accessibility
    profile, age band, register. Cuts A9 without a device; cuts text-heavy
    archetypes under a reading-load signature.

S5  HISTORY EXCLUSION
    Cut archetypes that have failed for THIS learner on THIS concept.
    Down-weight archetypes with negative affinity evidence for this learner
    across concepts — down-weight, never cut, and only above the
    minimum-evidence threshold.

S6  COGNITIVE LOAD ADMISSIBILITY
    Estimated intrinsic + extraneous load of the archetype against current
    capacity. A2 and A5 are expensive; under a depleted learner they are cut.

S7  EXECUTABILITY  (asset availability + the containment invariant)
    (a) Does the concept have the authored assets this archetype needs?
        A8 without an authored analogy library, or A9 without a simulation,
        is a strategy the system cannot execute. Cut, or degrade to the
        archetype's declared fallback (TQ-3 `degradedForm`).
    (b) CONTAINMENT INVARIANT (added v1.1.0). An archetype is admissible only
        if at least one method in its sequence yields at least one action that
        survives C-30's own filters for this learner and this concept.

        This is the invariant that keeps TQ-1's funnel and C-30's funnel from
        disagreeing. Both apply knowledge-type, learner-constraint, history and
        load filtering, at different scales; without containment, TQ-1 can
        commit to an archetype whose every constituent action C-30 then cuts,
        and the learner receives a strategy with no legal moves in it.
        Verified at selection time, not discovered at turn time.

S8  TIE-BREAK
    Population effectiveness evidence for this archetype on this concept,
    then deterministic seed (learner id + concept id + attempt ordinal),
    so behaviour is reproducible on replay. An exploration slice is
    reserved for the experimentation framework.
```

**If the funnel empties**, the outcome is not failure. It is the declared universal
fallback: `A1 CONCRETE-FIRST` with the lowest-load entry representation available, plus a
recorded coverage defect against the concept. A funnel that can return nothing produces a
runtime surprise; a funnel with a declared floor produces a defect report.

### 4.6 Holding and abandonment

**Holding.** While a strategy is `ACTIVE`, the Decision Kernel MUST enforce its
`commitments[]` as Band 2 policy constraints, and `C-30`'s action selection is restricted to
actions compatible with the current method in `methodSequence`. Deviation is permitted — a
learner's question is always answerable — but a deviating turn is recorded as a deviation
with a reason, and a run of deviations is itself an abandonment condition.

**Abandonment** is a first-class, recorded event, never a drift. Legal triggers, all
pre-declared at selection time:

| Trigger | Threshold | Next action |
|---|---|---|
| Archetype characteristic failure observed | 2 occurrences | Re-select via TQ-4, excluding this archetype |
| Method exhaustion | every method in the sequence has failed | Re-select at a lower concreteness level |
| Budget exhaustion | turns or attempts spent | Suspend; route to prerequisite diagnosis |
| Prerequisite gap discovered | any | **Suspend**, not abandon — the strategy may be correct and merely premature |
| Affect stop | any | Suspend immediately; `C-31` preempts; resume one rung below entry |
| Learner explicit rejection | "this isn't helping" | Abandon; the learner's report is high-weight evidence |

**Suspension versus abandonment is a real distinction**, and getting it wrong is expensive
in both directions. A suspended strategy is resumed at its arc position after the blocking
condition clears; an abandoned strategy is never resumed for this attempt and is excluded
from re-selection. Treating every interruption as abandonment throws away work and produces
the invisible restart; treating every failure as suspension produces a system that never
changes approach.

### 4.7 Responsibilities

Owns archetype selection, strategy commitment, commitment enforcement input, deviation
recording, and abandonment. **Must not own** teaching-state legality (`C-29`), per-turn
action choice (`C-30`), the phase structure (TQ-2), learner state (Plane 1), or wording
(`C-35`).

### 4.8 Interfaces

```
selectStrategy(conceptId, learnerProjection, assetAvailability, history)
    → TeachingStrategy | StrategySelectionDefect

evaluateStrategyHealth(strategyId, recentEvidence)
    → { status, triggeredConditions[], recommendation }

strategyConstraints(strategyId)
    → PolicyConstraint[]     -- consumed by C-28 Band 2
```

### 4.9 Failure modes

- **Empty authored coverage.** S1 fires for a minority of concepts. This is the dominant,
  honest failure mode and it is a *content* problem, not a logic problem: the funnel is
  complete, its inputs are not. Mitigation is generic per-knowledge-type defaults good enough
  to stand alone, plus authoring priority computed from graph centrality.
- **Premature commitment.** A strategy chosen on a thin learner model and held too long.
  Mitigated by the two-occurrence characteristic-failure trigger and by making the first turn
  of any strategy diagnostic as well as instructional.
- **Over-personalization from thin evidence.** S5's affinity down-weighting fires before
  enough data exists. Mitigated by a minimum-evidence threshold below which S5 is inert.
- **Archetype set too coarse.** Nine archetypes may not discriminate finely enough for some
  domains. Recorded as Open Question OQ-2 rather than pre-emptively solved.
- **Empty intersection at S7(b).** Every archetype fails the containment invariant — the
  concept has assets for nothing and the learner's constraints cut the rest. This is a distinct
  outcome from an empty funnel and must not be silently collapsed into the A1 fallback, because
  A1 would fail containment too. Defined behaviour: **do not start the campaign.** Route to the
  nearest prerequisite with a non-empty intersection, and emit a blocking coverage defect naming
  the concept and the constraint that emptied the set. A learner is better served by a
  prerequisite that can actually be taught than by a campaign with no legal moves.
- **Funnel/selector disagreement drift.** Containment is verified at selection time, but the
  learner's constraints change during a campaign, so an archetype legal at selection can become
  uncontainable mid-campaign. Detected as method exhaustion (§4.6) and handled as abandonment;
  a rising rate of mid-campaign containment loss is a defect signal against S4's constraint
  model rather than against the archetype.

### 4.10 Falsifiable prediction

*Learners taught under a committed strategy will show fewer distinct representation families
per concept and higher unassisted-success rates than learners taught under per-turn
selection.* If committed strategies show no difference in unassisted success, TQ-1 is
decoration and should be removed.

---

## 5. TQ-2 · Pedagogical Planner

### 5.0 Lifecycle synchronization (added v1.1.0)

Version 1.0.0-draft claimed repeatedly to introduce "no second state machine." That claim was
false, and the review was right to call it a hidden-state defect. This section replaces the
claim with the accurate one and specifies the behaviour the claim was concealing.

**The accurate claim: no second authority for advancement.**

Three lifecycles run concurrently over one learner-concept pair. Having three is correct —
they describe different things at different scales. Pretending there is one is what was wrong.

```
 LIFECYCLE            SCALE      OWNER   STATES
 ────────────────────────────────────────────────────────────────────────────
 CONCEPT MASTERY      concept    C-29    UNSTARTED → FRAMED → INSTRUCTED →
   (authoritative)                       GUIDED → RELEASED → VERIFIED →
                                         CONSOLIDATED → TRANSFERRED (+RECOVERY)

 STRATEGY             campaign   TQ-1    PROPOSED → ACTIVE → SUSPENDED →
                                         (ACTIVE | ABANDONED) ; → COMPLETED

 ARC PHASE            campaign   TQ-2    HOOK → INTUITION → EXPLANATION →
                                         (VISUAL) → EXAMPLES → GUIDED_PRACTICE →
                                         INDEPENDENT_PRACTICE → SUMMARY → REVISION
```

**Precedence rules — the invariants that make three lifecycles safe:**

- **SYNC-1 · `C-29` is the sole authority on advancement.** Mastery state is the only lifecycle
  whose transitions certify learning. TQ-1 and TQ-2 never advance, block, or reverse it.
- **SYNC-2 · The arc may not block a legal `C-29` transition.** If `C-29` advances on evidence
  the arc did not plan for — a learner volunteering a correct unprompted production during
  GUIDED_PRACTICE, which is common and desirable — the transition stands. The arc **re-aligns
  forward** to the phase matching the new state and records an `out-of-phase-advance` event.
  Nothing is re-taught, and no evidence is discarded.
- **SYNC-3 · The arc may not advance `C-29`.** Completing a phase is not evidence. Exiting
  INDEPENDENT_PRACTICE proposes advancement; `C-29`'s own evidence requirement decides it.
  This is the door that must stay shut, or arc completion becomes a second route to mastery.
- **SYNC-4 · Preemption cascades downward, never upward.** `C-31` RECOVERY preempts `C-29`;
  when it does, Strategy → `SUSPENDED` and the arc re-enters the phase corresponding to
  `C-29`'s post-recovery state (one rung below entry, never HOOK). On recovery exit, the
  strategy resumes `ACTIVE` at that phase. TQ-1 and TQ-2 never preempt anything.
- **SYNC-5 · Strategy completion requires mastery, not arc completion.** `COMPLETED` is
  reachable only when `C-29` reaches `VERIFIED` **and** SUMMARY has executed. REVISION being
  outstanding does **not** block completion — see §5.2's corrected wording and §8.1's two-stage
  closure. (v1.0.0-draft made REVISION unskippable and thereby made strategy completion
  unreachable within a session; that was an unintended consequence, now removed.)
- **SYNC-6 · Totality.** The legal-combination table below MUST be total over the state space.
  Any combination not listed is a **build-time failure**, matching the completeness requirement
  `C-28` already imposes on its own decision matrix. There is no implicit default.

**Legal combinations (abbreviated; the full matrix is the build-time artifact):**

| `C-29` state | Legal arc phases | Legal strategy status | Notes |
|---|---|---|---|
| UNSTARTED | — | PROPOSED | Arc not yet instantiated |
| FRAMED | HOOK, INTUITION | ACTIVE | |
| INSTRUCTED | EXPLANATION, VISUAL, EXAMPLES | ACTIVE | VISUAL is parallel, not sequential |
| GUIDED | GUIDED_PRACTICE | ACTIVE | |
| RELEASED | INDEPENDENT_PRACTICE | ACTIVE | |
| VERIFIED | SUMMARY | ACTIVE, COMPLETED | Completion gate (SYNC-5) |
| CONSOLIDATED | REVISION | COMPLETED | Post-completion, later session |
| TRANSFERRED | REVISION | COMPLETED | |
| RECOVERY (preemptive) | phase at preemption, frozen | SUSPENDED | SYNC-4 |
| any | any | SUSPENDED | Blocking condition; arc frozen, not reset |
| any | n/a — arc discarded | ABANDONED | New attempt gets a new campaign + new arc |

**Reading the table forward:** the arc adds *sub-structure inside* `C-29` states. INSTRUCTED
contains three arc phases; GUIDED contains one. That is the entire relationship, and it is why
the arc is a planning lifecycle rather than a competing mastery lifecycle.

### 5.1 Why it exists

The brief asks for a lesson built as Hook → Intuition → Explanation → Visual → Examples →
Guided Practice → Independent Practice → Summary → Revision. That flow is real, it is what
good teaching looks like, and nothing in the repository owns it.

But it must be built carefully, because the flow is also the single most dangerous idea in
this document. Implemented naively it becomes a **script**, and scripted courseware is the
best-documented failure mode in educational software: the learner deviates, and the system
either abandons the plan (chaos) or follows it anyway (irrelevance). `C-29`'s design notes
already say this outright — "lesson plans are fictions."

The resolution is to treat the arc not as a sequence but as a **partially ordered set of
phases, each with an entry condition and an exit evidence requirement**, instantiated
differently by each strategy archetype, and mapped onto the existing teaching states so that
it adds structure *inside* states rather than becoming a second **authority for advancement**
(§5.0, SYNC-1 and SYNC-3).

### 5.2 The nine phases

Each phase is defined by what it *accomplishes*, not by what the tutor says.

| Phase | Accomplishes | Entry condition | Exit evidence | `C-29` state | Skippable? |
|---|---|---|---|---|---|
| **HOOK** | creates the need for the idea | concept FRAMED-eligible | learner engaged with the question the concept answers | `FRAMED` | rarely — see §5.5 |
| **INTUITION** | an informal, correct pre-formal grasp | HOOK exited | learner gestures at the idea in their own words, imprecisely, **and the utterance does not match the concept's misconception register** | `FRAMED` | no for A1/A4/A9; yes for A6 |
| **EXPLANATION** | the precise claim, stated | INTUITION exited *or* archetype starts here | learner can restate the claim (restatement ≠ understanding) | `INSTRUCTED` | no |
| **VISUAL** | a non-verbal representation of the same claim | any time after HOOK | learner can point/read the representation | `INSTRUCTED` (parallel) | conditional — §5.4 |
| **EXAMPLES** | the claim instantiated, including boundaries | EXPLANATION exited | learner classifies a novel instance correctly | `INSTRUCTED` | no |
| **GUIDED PRACTICE** | production with support | EXAMPLES exited | learner completes with decreasing support | `GUIDED` | no |
| **INDEPENDENT PRACTICE** | **unassisted** production | GUIDED exit evidence present | unassisted correct production at criterion | `RELEASED` | **never** |
| **SUMMARY** | consolidation and closure | any exit or budget end | learner produces the summary where possible | `VERIFIED` | **never omitted** |
| **REVISION** | delayed retrieval | scheduled, later session | unassisted retrieval after delay | `CONSOLIDATED` → `TRANSFERRED` | **never omitted from the plan** — see below |

**Three phases are never skippable, and the reasons differ.** INDEPENDENT PRACTICE is
unskippable because it is the only phase that produces the evidence advancement requires —
skipping it means advancing on assisted performance, which `C-29` already makes illegal.
SUMMARY is unskippable because the last event colours the memory of the whole session, and
because a session that ends mid-struggle creates a debt. REVISION is unskippable because a
concept learned and never retrieved is a concept not learned — and it is the phase that most
systems drop, because it happens on a different day and produces no immediate satisfaction.

**Correction to REVISION's status (v1.1.0).** Version 1.0.0-draft called REVISION "never
skippable" without noticing that its execution is not under the system's control: it happens
days later, and a learner may never return. That produced two unintended consequences — no
strategy could complete within a session (§5.0 SYNC-5), and no lesson could be scored until
+30 days (§8.1). The precise rule is:

> **REVISION is never omitted from the plan. Whether it is EXECUTED is not the system's to
> guarantee.** A scheduled REVISION that never occurs because the learner did not return is
> recorded as an *outcome* — retention unknown — and never as a defect of the lesson that
> preceded it. A REVISION that was never *scheduled* is a defect of the lesson.

A standard that requires an uncontrollable event is not a standard; a standard that requires
the system to have *scheduled* the event is enforceable, and is what is meant here.

### 5.3 The arc is instantiated by the strategy, not fixed

This is what prevents the script failure. Different archetypes produce genuinely different
arcs from the same nine phases:

```
A1 CONCRETE-FIRST
   HOOK → [manipulation] → INTUITION → EXAMPLES → EXPLANATION → VISUAL
        → GUIDED → INDEPENDENT → SUMMARY → REVISION
   Note: EXPLANATION comes AFTER examples and intuition. Naming the thing
   the learner has already built is a different act from defining it first.

A2 DERIVATIONAL
   HOOK → [prior retrieval] → EXPLANATION(derivation) → VISUAL
        → EXAMPLES → GUIDED → INDEPENDENT → SUMMARY → REVISION
   Note: no INTUITION phase — the derivation IS the intuition. Inserting a
   separate informal phase before a derivation weakens it.

A6 PROCEDURAL-COACHING
   HOOK(short) → EXPLANATION(brief) → EXAMPLES(worked, in full)
        → GUIDED(completion → faded) → INDEPENDENT → SUMMARY → REVISION
   Note: INTUITION is genuinely optional for a procedure; VISUAL is often
   the procedure's own notation, not an added diagram.

A7 SOCRATIC-DISCOVERY
   HOOK → INTUITION(learner-produced) → EXAMPLES(learner-generated)
        → EXPLANATION(learner-produced, tutor-refined) → GUIDED
        → INDEPENDENT → SUMMARY → REVISION
   Note: the tutor's EXPLANATION is a refinement of the learner's, never a
   replacement. Replacing it retroactively invalidates the discovery.
   Note (v1.1.0): this arc OPENS with a learner-produced phase, which is only
   coherent because A7's own admissibility gate (§4.4, filter S3) already
   requires the learner to hold strong priors on this concept's prerequisites.
   A7's arc presumes those priors; it does not build them. Where they are
   absent the archetype is cut at S3 and this arc is never instantiated.
```

The planner therefore does not own an arc. It owns an **arc instantiation function**: given
an archetype, a concept, and a learner, produce the phase graph with entry conditions and
exit evidence bound.

### 5.4 Conditional phases

**VISUAL** is conditional, and this is a genuine design decision rather than a convenience.
A visual that does not carry instructional load adds extraneous cognitive load and *reduces*
learning — this is one of the best-established findings in the field, and the reason
"add a diagram" is not automatically good teaching. VISUAL is therefore entered only when
one of these holds:

1. the claim is spatial, dynamic, or relational (its structure is not linearizable in prose);
2. verbal load has exceeded capacity and a channel change reduces it;
3. TQ-4 requires a channel change for a re-teach;
4. the learner's profile indicates a reading-load signature.

If none holds, VISUAL is skipped and **the skip is recorded with its reason** — because
TQ-5's gate G7 requires either a non-verbal representation or a justification for its
absence. A skip with no reason is a gate failure.

**HOOK** is conditional in one narrow case: an in-progress concept resumed within the same
session does not need re-hooking. Across a session boundary it does — see §5.6.

### 5.5 Phase transitions are evidence-gated, not time-gated

The exit condition of every phase is *learner evidence*, never turns elapsed. This is the
mechanism that prevents the arc from degenerating into a script: the plan cannot advance by
itself. If exit evidence is absent, the phase does not exit; if the phase cannot exit within
budget, that is an abandonment condition for the strategy, not a reason to advance anyway.

Three phase-transition rules deserve to be stated as laws because their violation is the
most common form of the "looks like teaching, produces nothing" failure:

- **L0 · Imprecise is not the same as wrong.** INTUITION accepts an imprecise account, which
  makes it the phase where a plausible-sounding *misconception* is most likely to be certified
  as understanding. Its exit check is therefore two-sided: the utterance must gesture at the
  idea **and** must not match the concept's misconception register. An intuition utterance that
  matches a known wrong pattern does not exit the phase — it routes to TQ-4 diagnosis C2.
- **L1 · Restatement is not comprehension.** EXPLANATION's exit evidence is that the learner
  can restate the claim. That is the *exit condition of the explanation phase*, and nothing
  more. It is not evidence of understanding, and it may never be used to justify skipping
  EXAMPLES or GUIDED.
- **L2 · Assisted success never exits GUIDED.** GUIDED exits on *decreasing support*, and
  INDEPENDENT entry requires the support to have reached zero. Advancing on a supported
  success is the echo-advancement failure, and `C-29` already makes it illegal; the arc must
  not create a back door to it.
- **L3 · A phase may be re-entered, and re-entry is not restart.** Failure in INDEPENDENT
  returns to GUIDED — not to HOOK. This mirrors `C-31`'s exit rule (resume one rung below
  entry, never at zero) and exists for the same reason: the invisible restart is
  demoralizing and wastes everything already established.

### 5.6 Cross-session arcs

A concept campaign routinely spans sessions. The arc therefore carries **resumption
obligations**:

- The arc position persists. A concept at GUIDED on Tuesday is at GUIDED on Thursday.
- Resumption across a session boundary requires a **warm-up**, not a re-teach: a brief
  retrieval of the prior position's content. This is opening retrieval — it belongs to the
  session's OPENING phase (`C-33`) and doubles as a decay measurement.
- If warm-up retrieval fails, the arc re-enters the *previous* phase, not the beginning.
- A gap beyond the decay threshold escalates warm-up to a re-establishment pass, governed by
  the existing placement/resumption rules rather than re-derived here.

### 5.7 Relationship to ADR 09 — TQ-2 is ADR 09 generalized

Added in v1.1.0. Version 1.0.0-draft's reconciliation table characterized ADR 09 as "per-turn
plan recomputation," which is the **problem ADR 09 diagnoses**, not the **solution it
selected**. The review was right that this under-reconciliation would have produced two
cross-turn stage pointers with two owners — the exact defect §0 exists to prevent, introduced
by the section written to prevent it.

**What ADR 09 already selected (Option B).** A `contextSnapshot.lessonStageProgress` key
holding `{ conceptId, planSignature, stageIndex, totalStages }`, where `planSignature` is a
cheap deterministic fingerprint of what determines plan *shape*; the AI emits a lightweight
progress tag parsed server-side exactly as `parseWorkedExampleTag()` already does; and a
signature mismatch triggers an explicit, named **`replan`** event rather than a silent
inconsistency.

**That object is the arc position.** TQ-2 therefore does not introduce a parallel mechanism.
It **adopts ADR 09's vocabulary, key, and persistence pattern** and generalizes them along
three dimensions ADR 09 explicitly scoped out:

| Dimension | ADR 09 | TQ-2 generalization |
|---|---|---|
| Stage vocabulary | `LessonStageType`, derived per-turn from the current `TeachingDecision` | The nine arc phases, derived once from the strategy archetype (§5.3) |
| Horizon | Within-session continuity | Cross-session (§5.6), with resumption obligations and decay-scaled warm-up |
| Shape source | One recomputed plan shape | Archetype-instantiated arc — different archetypes yield genuinely different phase graphs |
| Replan trigger | `planSignature` mismatch | `planSignature` mismatch **or** strategy abandonment (§4.6) — the same event, now with a named cause |

**Concrete reuse commitments, so no parallel object is created:**

- **RC-1** The arc position persists under ADR 09's existing key, `lessonStageProgress`. No new
  snapshot key is introduced for arc position.
- **RC-2** `planSignature` is retained as the continuation/replan fingerprint, extended to
  include the archetype id — because two arcs over the same concept under different archetypes
  are genuinely different plans and must not be treated as continuations of each other.
- **RC-3** ADR 09's named `replan` event is retained as the single vocabulary for plan
  discontinuity. TQ-1's strategy abandonment *emits* a `replan`; it does not define a second
  discontinuity concept.
- **RC-4** ADR 09's Option C (a normalized `LessonStageProgress` table) remains deferred on
  ADR 09's own reasoning. TQ-2 does not reopen it. Should the Evidence Engine later require
  stage-level analytics, that decision belongs to ADR 10/13, exactly as ADR 09 stated.
- **RC-5** ADR 09 is recorded in the Bible's ADR index as **extended by Phase 1 TQ-2**, not
  superseded (§0).

**What this costs.** TQ-2 inherits ADR 09's mechanism, including its dependence on an
AI-emitted tag — a self-report, weaker than instrumented capture. That is a real limitation
and it is accepted deliberately: it is the pattern already proven in production for worked
examples, and inventing a stronger mechanism here would create the duplicate ownership this
section exists to avoid. The limitation is recorded in §12 R11.

### 5.8 Responsibilities

Owns phase definitions, arc instantiation per archetype, phase entry/exit conditions, phase
transition and re-entry, conditional-phase decisions with recorded reasons, and cross-session
arc resumption. **Must not own** teaching states or advancement (`C-29`, §5.0 SYNC-1/SYNC-3),
transition evidence requirements (`C-29`), session shape (`C-33`), strategy choice (TQ-1), or
action choice (`C-30`).

### 5.9 Interfaces

```
instantiateArc(strategy, conceptId, learnerProjection) → ConceptArc
currentPhase(arcId)         → { phase, entered, exitEvidenceRequired[], satisfied[] }
evaluatePhaseExit(arcId, evidence) → { exit: bool, transition, reason }
arcConstraints(arcId)       → ArcConstraint[]      -- forbiddenActions only; see §11.3
resumeArc(arcId, gapDuration) → { warmUpRequired, resumePhase }
realignArc(arcId, c29State)   → { newPhase, event: 'out-of-phase-advance' }  -- SYNC-2
```

### 5.10 Failure modes

- **Script drift.** The strongest risk. Mitigated by evidence-gated transitions, by treating
  the arc as a budget the kernel may deviate within, and by making deviation a recorded
  first-class event rather than an exception.
- **Phase thrash.** Rapid re-entry cycling between GUIDED and INDEPENDENT. Mitigated by a
  minimum-dwell rule and by routing a second consecutive re-entry to TQ-4 rather than
  retrying the same phase.
- **Arc completion without learning.** Every phase exits, the learner still cannot do it
  later. This is the failure that only REVISION detects — which is why it is unskippable and
  why TQ-7's Tier C is the only real proof.

### 5.11 Falsifiable prediction

*Arcs whose INDEPENDENT phase exits on genuinely unassisted evidence will show materially
higher delayed retrieval at +7 days than arcs that exit INDEPENDENT on assisted evidence.*
If not, L2 is costing time for nothing and the gate should be re-examined.

---

## 6. TQ-3 · Teaching Method Library

### 6.1 Method versus Action — why both exist

The repository already contains a catalogue of 27 **teaching actions** in six families
(SHOW / TELL / DO / TEST-THINKING / ORGANIZE / SOCIAL). That catalogue is not what the brief
is asking for, and the distinction matters.

- An **Action** is a *move type*: one thing the tutor does in one turn. "Demonstration."
  "Worked Example." "Error Analysis." It is the unit `C-30` selects.
- A **Method** is a *technique*: a named pedagogical device with internal structure spanning
  one to many turns, its own preconditions, its own quality contract, its own recognizable
  failure, and its own repair ladder. "Analogy" as a method is not one move — it is
  establish-source → map → transfer → **mark the breakdown boundary**, and a system that
  does the first three and skips the fourth manufactures misconceptions.

A method composes actions. The library adds the layer at which teaching *technique* is
described, and it is the layer TQ-1's `methodSequence[]` and TQ-4's Difference Operator both
operate on.

### 6.2 The Method schema

```
TeachingMethod {
  methodId, name, family
  intent                 -- the cognitive change it is supposed to produce
  knowledgeTypeFit[]     -- the FIVE-member concept-intrinsic taxonomy (§0, §3.4.2).
                         --   NON-BINDING when knowledge type is unavailable (§3.4.1).
  learnerStateFit[]      -- preconditions on LEARNER state, incl. active-misconception
                         --   status. This is where the former `live misconception`
                         --   "knowledge type" correctly lives (§3.4.2).
  archetypeAffinity[]    -- which TQ-1 archetypes naturally contain it
  preconditions[]        -- what MUST be true of learner and concept
  prohibitions[]         -- when it is ILLEGAL (not merely unwise)
  shape[]                -- ordered internal beats; the method's own micro-arc
  composedActions[]      -- which of the 27 actions realize each beat
  distanceVector         -- position on TQ-4's seven axes
  qualityContract        -- must / must-not clauses passed to C-34 and checked by C-36
  failureSignature       -- how you OBSERVE that it failed
  repairLadder[]         -- rungs when it fails; one dimension per rung
  loadProfile            -- intrinsic / extraneous cost
  registerConstraints    -- age band, reading load, modality requirements
  assetDemand[]          -- authored assets required for full execution
  degradedForm           -- what it becomes when those assets are absent
  evidenceHooks[]        -- what it writes to the Ledger
}
```

Four fields are the reason this schema is worth having.

**`prohibitions[]`** are legality, not advice. A method with no prohibitions is almost
certainly under-specified — every real teaching technique is wrong somewhere, and the places
it is wrong are where the damage happens.

**`shape[]`** is what makes a method more than a label. It is where "an analogy must declare
its breakdown boundary" lives, and it is enforceable: a method whose final beat did not
execute is an incomplete method, and TQ-5 gate G3 can see that.

**`failureSignature[]`** is what makes the method falsifiable and what TQ-4 diagnoses
against. A method whose failure is not observable cannot be adapted away from.

**`degradedForm`** is the honest acknowledgement that most concepts lack authored assets.
A method that simply cannot run without content is a method that never runs. Every method
must declare what it becomes when its assets are missing — or declare that it is
unavailable, which is also a legitimate answer and is far better than silently degrading
into generic prose.

### 6.3 The library

The brief names eleven methods. All eleven are specified below. The library is **not closed
at eleven** — six further methods are required for the schema to cover the knowledge-type
taxonomy, and omitting them would leave `procedure` under-served, and would leave the
ACTIVE-misconception learner state with no delivery vehicle at all.
They are listed in §6.4 rather than quietly dropped.

---

**M1 · VISUAL TEACHING**
*Intent:* make structure perceptible that prose linearizes.
*Fits:* concept, causal system, procedure.
*Preconditions:* the claim has spatial, dynamic, or relational structure.
*Prohibitions:* MUST NOT be used decoratively; a visual with no stated instructional
function is prohibited (it adds extraneous load and reduces learning). MUST NOT be served
without an accessibility description conveying the same instructional content — a caption is
not a description.
*Shape:* orient (what am I looking at) → direct attention to the load-bearing feature →
relate to the claim → have the learner read something off it.
*Failure signature:* learner can describe the picture but cannot use it; learner attends to a
salient irrelevant feature.
*Repair ladder:* simplify (remove elements) → annotate the critical feature → animate the
change → have the learner draw it.
*Degraded form:* verbal spatial description with explicit structure markers; flag the
coverage gap.

**M2 · ANALOGY**
*Intent:* transfer known relational structure to an unknown domain.
*Preconditions:* the source domain must be *verified* known to this learner, not assumed.
*Prohibitions:* MUST NOT be used when the concept's anti-analogy list names it as a
backfire. MUST NOT be left without a declared breakdown boundary. MUST NOT be the first
representation when the **learner has an ACTIVE misconception on this concept** — a
`learnerStateFit` prohibition, not a knowledge-type one (§3.4.2) — because an analogy
reinforces whichever schema is already active, including the wrong one.
*Shape:* establish source → map correspondences explicitly → transfer the inference →
**mark where the analogy breaks** → have the learner state one thing the analogy does *not*
carry.
*Failure signature:* the learner defends the analogy rather than the claim; the learner draws
an inference true of the source and false of the target (a new misconception, birth type 6).
*Repair ladder:* one patch ("in this analogy, ignore…") → swap to a genuinely different
source domain → drop analogy as a family for this learner-concept pair and go direct.
*Note:* the fourth beat is not optional politeness. An unmarked analogy is a misconception
generator, and the repository's own misconception corpus records birth type 6 for exactly
this.

**M3 · STORY**
*Intent:* give an idea a memorable structure and a reason to exist.
*Fits:* fact/convention, concept.
*Prohibitions:* MUST NOT carry the load in the decoration — if the memorable part is not the
load-bearing part, the learner remembers the story and not the idea. MUST NOT be used where
the concept's difficulty is structural rather than motivational.
*Shape:* situation → the problem the idea solves → the idea as resolution → strip the story
and restate the idea bare.
*Failure signature:* learner recalls the narrative and cannot state the claim without it.
*Repair ladder:* strip and restate → re-anchor the claim to a second, structurally different
situation → drop narrative framing.

**M4 · SOCRATIC QUESTIONING**
*Intent:* the learner constructs the claim; construction is retained better than reception.
*Preconditions:* the learner MUST already possess material to reason from.
*Prohibitions:* **MUST NOT run before INSTRUCTED**, and MUST NOT be used with a complete
beginner. MUST NOT exceed the consecutive-question bound. MUST NOT continue after two
successive non-productive answers — at that point it has become guessing, and guessing under
questioning is humiliating rather than instructive.
*Shape:* establish the ground → a question the learner can answer → a question that exposes
the tension → the learner resolves it → the tutor names what the learner produced.
*Failure signature:* answers get shorter; "I don't know" appears; hedging increases.
*Repair ladder:* narrow the question → give the missing premise → convert to a worked
example → abandon Socratic for this concept-learner pair.
*Note:* this method carries the strictest prohibitions in the library because its failure
mode is the *quiz-first* register, which is the single most common way AI tutors substitute
interrogation for teaching.

**M5 · DEMONSTRATION**
*Intent:* provide the experience the words were pointing at.
*Prohibitions:* MUST NOT be run without a stake — a demonstration with no committed
prediction is television. MUST NOT be run so fast the critical instant is invisible.
*Shape:* set up → **elicit a committed prediction** → run → resolve against the prediction →
name what happened.
*Failure signature:* learner watches and shrugs; learner predicts wrong and is unbothered
(no prediction was ever really committed).
*Repair ladder:* re-run slowed with the critical instant exaggerated → decompose to one
component → transfer the apparatus to the learner.

**M6 · DERIVATION**
*Intent:* show that the claim is *necessary*, not merely asserted.
*Preconditions:* every prior in the chain is verified at or above INDEPENDENT.
*Prohibitions:* MUST NOT run on unverified priors — a derivation from shaky priors is worse
than no derivation, because it teaches that the subject is arbitrary. MUST NOT exceed the
working-memory bound in chain length without an external record.
*Shape:* retrieve priors → state the goal → each step with its justification → arrive →
**have the learner reproduce one step unaided**.
*Failure signature:* the learner follows each step and cannot reproduce any; the learner
agrees continuously (continuous agreement is a warning, not a success).
*Repair ladder:* externalize the chain → shorten by granting an intermediate → reverse
direction (start from the result, work back) → drop to procedural coaching.

**M7 · SIMULATION**
*Intent:* build a mental model of a dynamic system by operating it.
*Prohibitions:* MUST NOT be left un-extracted — play without extraction is entertainment.
MUST NOT be treated as evidence of mastery inside its own skin (the chocolate-covered-broccoli
guard already in the corpus): mastery must be re-verified outside the simulation.
*Shape:* free exploration → a targeted manipulation task → prediction before manipulation →
**extract the rule in the learner's words** → verify outside the simulation.
*Failure signature:* fluent manipulation with no articulable rule.
*Note:* simulation interaction traces are among the richest diagnostic signals available —
how a learner manipulates a system exposes mental models that language conceals. This is an
input to Plane 1, not a decoration.

**M8 · MNEMONIC**
*Intent:* make an arbitrary association retrievable.
*Fits:* fact/convention **only**.
*Prohibitions:* **MUST NOT substitute for understanding.** Illegal before INSTRUCTED and
before a comprehension check has passed. A mnemonic attached to a concept the learner does
not understand produces confident retrieval of a meaningless string, which is worse than
forgetting because it is invisible.
*Carve-out (added v1.1.0):* for **genuinely arbitrary conventions** — element symbols, notation
choices, keyboard shortcuts, irregular spellings — there is nothing to understand, and the
comprehension-check prohibition would block the method's single legitimate use. The carve-out
is narrow and must be earned: the concept must be tagged arbitrary-convention, and the tag
requires that no derivation, mechanism, or reason for the convention exists to be taught. "The
learner finds it hard" is not arbitrariness, and a mnemonic applied there is the substitution
the prohibition exists to prevent.
*Shape:* confirm understanding → introduce the device → rehearse → **decouple** (retrieve the
content without the device).
*Failure signature:* the learner recalls the mnemonic and cannot unpack it.

**M9 · REAL-WORLD EXAMPLE**
*Intent:* answer "why does this exist" and anchor abstraction.
*Prohibitions:* MUST NOT be fabricated. MUST NOT be culturally assumed — an example that
requires unshared context teaches nothing and quietly signals the learner does not belong.
*Shape:* the situation → where the concept appears in it → what changes if the concept is
wrong → invite the learner's own instance.
*Failure signature:* polite acknowledgement with no engagement; the learner cannot produce
their own instance.

**M10 · COUNTEREXAMPLE**
*Intent:* establish the boundary of a claim; convert an over-general rule into a precise one.
*Preconditions:* **the correct schema must already be stable.**
*Prohibitions:* MUST NOT be used before the rule is solid — a counterexample presented to a
fragile schema destroys the schema rather than bounding it. This mirrors the stability guard
the corpus already places on Error Analysis, and for the same reason.
*Shape:* restate the rule → present the case that violates it → let the learner notice →
refine the rule → re-test the refined rule.
*Failure signature:* the learner abandons the rule entirely rather than bounding it — the
signature of having run this method too early.

**M11 · STEP-BY-STEP COACHING**
*Intent:* build fluent procedural execution with fading support.
*Fits:* procedure, physical procedure.
*Shape:* fully worked → completion problems (last step removed, then last two) → faded →
independent → **fluency**.
*Prohibitions:* MUST NOT fade faster than unassisted evidence permits — the fade schedule is
evidence-gated, not turn-gated. MUST NOT be terminated at correct-but-slow: slow-correct is
not-yet, and advancing past it stacks load on a non-automatic skill.
*Failure signature:* correctness collapses at the first unsupported step; execution is
correct but latency does not fall across attempts.

---

### 6.4 Methods the brief omits that the library requires

Stated explicitly rather than silently added or silently dropped:

| Method | Why it is required |
|---|---|
| **M12 · Worked Example** | The single best-evidenced technique for procedural and problem-solving knowledge. M11 contains it as a beat, but it is also a standalone method with its own quality rules. |
| **M13 · Contrasting Cases** | The primary instrument for concept discrimination; the only method that reliably teaches a boundary. Required by archetype A3. |
| **M14 · Error Analysis** | The primary instrument for an **ACTIVE misconception in the learner** (`learnerStateFit`, not a concept type — §3.4.2). Without it, the misconception corpus has no delivery vehicle. |
| **M15 · Self-Explanation Prompting** | Learner-generated explanation is among the highest-yield activities available and is nearly free. |
| **M16 · Concrete Manipulation** | Required by archetype A1; the enactive end of the concreteness axis, which the Difference Operator needs to exist. |
| **M17 · Retrieval Practice** | Required by the REVISION phase; without it, REVISION has no method. |

### 6.5 Responsibilities

Owns method definitions, preconditions, prohibitions, internal shapes, quality contracts,
failure signatures, and repair ladders. **Must not own** which method runs now (TQ-1 sequences
it, `C-30` selects the action), legality of the *state* (`C-29`), or wording (`C-35`).

### 6.6 Interfaces

```
getMethod(methodId)                             → TeachingMethod
methodsFor(knowledgeType, archetype, learner)   → TeachingMethod[]  (precondition-filtered)
methodContract(methodId, beat)                  → ContractClause[]  -- to C-34 / C-36
methodDistance(methodA, methodB)                → DistanceVector    -- to TQ-4
methodBeatComplete(methodId, beat, evidence)    → bool
```

### 6.7 Failure modes

- **Method sprawl.** Seventeen becomes forty and the set loses meaning. Mitigated by
  requiring every new method to declare a distinct `distanceVector` and a distinct
  `failureSignature`; a method that duplicates another's vector and failure is the same
  method under a new name.
- **Contract inflation.** Quality contracts grow until no output satisfies them. Mitigated by
  the satisfiability pre-check and declared relaxation order the verifier already requires.
- **Degraded forms becoming the norm.** With most concepts lacking assets, `degradedForm`
  runs almost always and the library's quality claims quietly become fiction. Mitigated by
  measuring degraded-execution rate as a tracked, reported quantity — see TQ-7 Tier A.

---

## 7. TQ-4 · Adaptive Re-teaching Framework

### 7.1 Why it exists, and why it is the sharpest part of Phase 1

Ask any AI tutor "I don't understand" three times and you will receive three versions of the
same explanation. The words differ; the teaching does not. This is the defining failure of
the category, and it is not a wording problem — it is a **definitional** problem. No system
can avoid paraphrasing until "different" is computable.

Existing repository components handle the neighbouring problems well: `C-31` owns recovery,
`decision-engine/05` owns escalation ladders with a one-dimension-per-rung law,
`assessment/09` owns the failure taxonomy. What is missing is the operator that makes the
one-dimension law checkable, and the diagnosis-first discipline that prevents re-teaching
from being a reflex.

### 7.2 Trigger taxonomy

The brief names six triggers. Five more are required for coverage; all eleven are classified,
because **the correct response differs sharply between them and treating them alike is itself
a defect**.

| # | Trigger | Class | Correct response class |
|---|---|---|---|
| T1 | "I don't understand" | explicit non-comprehension | diagnose → re-teach |
| T2 | "explain differently" | explicit method rejection | **honour it literally** — change axis 2 or 3, minimum |
| T3 | "I'm confused" | affect-adjacent | assess affect first; may route to `C-31` before any teaching |
| T4 | Wrong answer | performance failure | D1 grid read → diagnose → route |
| T5 | Partial understanding | **partial success** | **refine, do NOT re-teach** — §7.6 |
| T6 | Repeated confusion | compounding failure | escalate representation; hard budget applies |
| T7 | Silence / no response | ambiguous | wait first; then a *give*, never another question |
| T8 | Off-target answer | frame mismatch | the learner is answering a different question — re-frame, don't re-explain |
| T9 | Correct but hesitant | FRAGILE (D1) | **not a failure** — hold and consolidate; re-teaching here destroys confidence |
| T10 | Correct but fast and wrong-reasoned | dangerous quadrant | route to misconception track; never spot-correct |
| T11 | "Just tell me" | struggle rejection | `C-32` withholding policy + honest explanation; not a re-teach trigger |

**T9 and T5 are the two most commonly mishandled**, and in the same direction: the system
treats a partial success as a failure and re-teaches everything, destroying the part that
worked and signalling to the learner that their genuine progress registered as nothing.

### 7.3 Diagnosis is mandatory before re-teaching

**No re-teach may be selected without a recorded diagnosis.** This is a hard gate (TQ-5 G4),
not a recommendation. Reusing `assessment/09`'s six-cause taxonomy verbatim:

| Cause | Signature | Correct axis to change |
|---|---|---|
| C1 Missing prerequisite | errors cluster at a specific sub-skill | **none** — leave the concept; teach the prerequisite |
| C2 Misconception interference | a confident, consistent, *wrong* pattern | none — route to misconception repair (collision, not re-explanation) |
| C3 Representation mismatch | understands in one form, not another | **axis 3 (representation) or axis 1 (channel)** |
| C4 Cognitive load overflow | performance degrades with complexity, not content | **axis 6 (granularity)** — decompose |
| C5 Attention / affect | performance uncorrelated with difficulty | none — `C-31` preempts |
| C6 Tutor defect | a question outran the teaching | **none** — the correct response is to *give*; log against the decision, not the learner |

Two of the six causes have "none" as the correct axis change, and one (C6) is not the
learner's failure at all. **A system that re-teaches on every failure is wrong more than half
the time**, which is the quantitative form of why diagnosis-first is a gate.

### 7.4 The Difference Operator

> **Revision note (v1.1.0).** Version 1.0.0-draft defined legality as a flat axis count with
> the rule `D = 1`. Architecture review demonstrated that this was wrong, and wrong in a way
> that mattered: encoded against these same seven axes, the repository's own escalation ladder
> (`decision-engine/05`) produces `D = 3` or `D = 4` at nearly every rung. Rung 2 of the failed-
> explanation ladder — "change CHANNEL: demonstrate" — simultaneously changes channel, method,
> representation and concreteness, because those are not independent choices. The flat count
> therefore made the corpus's own escalation engine illegal while claiming to formalize it.
> The correction below keeps the pedagogy the one-dimension law protects and drops the
> arithmetic that misrepresented it.

#### 7.4.1 The axes are a coordinate system, not a basis

Teaching attempts are described on seven axes:

```
AXIS 1  CHANNEL          verbal · visual · enactive · symbolic · auditory
AXIS 2  METHOD           M1…M17 (TQ-3)
AXIS 3  REPRESENTATION   concrete-object · diagram · graph · table · algebraic ·
                         narrative · physical-apparatus
AXIS 4  CONCRETENESS     enactive < iconic < symbolic          (ordered)
AXIS 5  ENTRY POINT      definition-first · example-first · problem-first ·
                         phenomenon-first · contrast-first
AXIS 6  GRANULARITY      whole < decomposed < atomic-step      (ordered)
AXIS 7  AGENCY           tutor-does < joint < learner-does     (ordered)
```

These axes are **correlated, not orthogonal**. Choosing method `M5 Demonstration` fixes
channel, largely fixes representation, and constrains concreteness — one pedagogical choice
with forced consequences, not four choices. The corpus's "change exactly one dimension" always
meant one *pedagogical* dimension. Counting coordinates counts the consequences too, and
mistakes a single disciplined change for an undiagnosable multiple one.

#### 7.4.2 Primary axis and closure

Legality is defined over an intentional change plus its forced consequences.

```
PRIMARY AXIS   The single axis the diagnosis (§7.3) implicates. Exactly one,
               always named, always recorded.

CLOSURE        closure(fromVector, primaryAxis, targetValue) → Vector

               A TOTAL, PURE function. Given the attempt being replaced, the
               primary axis, and its new value, it returns the full vector
               including every axis change FORCED by that choice.

               Total  → every (vector, axis, value) triple has a defined result;
                        an undefined triple is a BUILD-TIME failure, never a
                        runtime surprise. This mirrors the totality requirement
                        C-28 already imposes on its own decision matrix.
               Pure   → same inputs, same output, always. This is what preserves
                        deterministic replay (§11.1): closure introduces no new
                        nondeterminism, because it reads nothing but its arguments.
```

**The re-teach legality rule (v1.1):**

```
A re-teach attempt B replacing a failed attempt A is LEGAL iff:

  (L1)  exactly ONE primary axis p is declared, and B[p] ≠ A[p]
  (L2)  p is the axis the recorded diagnosis (§7.3) implicates
  (L3)  B = closure(A, p, B[p])
        — every other axis on which B differs from A lies in the closure.
          A change outside the closure is the undiagnosable multiple change
          Principle P8 forbids, and is ILLEGAL.
  (L4)  B ∉ failedAttempts(learner, concept)
  (L5)  B satisfies all C-29 legality and all TQ-3 preconditions

  B = A  (no primary axis changed) is PARAPHRASE and remains ILLEGAL.
```

Paraphrase is still illegal by construction — L1 requires an actual change on a named axis —
so the property the whole component exists to guarantee is preserved unchanged. What is no
longer required is that the change have no consequences.

**Verification against the existing ladder.** The failed-explanation ladder is now legal at
every rung, which is the correctness test the flat count failed:

| Rung | Primary axis | Closure carries | v1.0 verdict | v1.1 verdict |
|---|---|---|---|---|
| 1 · different frame, same channel | 3 representation | (nothing forced) | legal | **legal** |
| 2 · change channel: demonstrate | 1 channel | method, representation, concreteness | *illegal (D=4)* | **legal** |
| 3 · concrete enactment | 7 agency | channel, concreteness | *illegal (D=3)* | **legal** |
| 4 · stop; prerequisite diagnosis | — (leaves the concept) | n/a | n/a | n/a — not a re-teach |

#### 7.4.3 The axis-dependency matrix

A published, versioned artifact — not an implementation detail. It states which axes are
forced by a change to each primary axis, and it is the specification `closure()` implements.
`•` = always forced; `○` = forced conditionally, on the target value.

```
 PRIMARY ↓        FORCES →   1 chan  2 meth  3 repr  4 conc  5 entry  6 gran  7 agency
 ─────────────────────────────────────────────────────────────────────────────────────
 1 CHANNEL                     —       •       •       ○        ·        ·        ·
 2 METHOD                      •       —       •       ○        ○        ·        ○
 3 REPRESENTATION              ○       ·       —       ○        ·        ·        ·
 4 CONCRETENESS                ○       ○       •       —        ·        ·        ·
 5 ENTRY POINT                 ·       ○       ·       ·        —        ·        ·
 6 GRANULARITY                 ·       ·       ·       ·        ·        —        ·
 7 AGENCY                      ○       ○       ·       ○        ·        ·        —
```

Three properties this matrix must satisfy, all checkable at build time:

- **Totality** — every primary axis has a defined row.
- **Acyclicity of forcing** — closure is computed in one pass; a forcing cycle (axis A forces
  B forces A) is a build-time failure. The matrix above is acyclic by construction because
  forcing always flows toward *more constrained* axes.
- **Minimality** — a `•` that is not genuinely forced weakens L3 into permissiveness. Every
  `•` requires a stated pedagogical justification in the matrix's own record.

Axes 5 and 6 force almost nothing, which is the useful signal: entry point and granularity are
the two axes that can be changed nearly independently, and they are therefore the cheapest
genuine changes available. That is a real finding the flat count concealed.

#### 7.4.4 Consequences

*First*, paraphrase remains structurally illegal, enforced at decision time (the candidate set
is filtered by L1–L5) and again at output time (§7.5).

*Second*, L4 requires a persisted set of failed attempt vectors per learner per concept. This
is a *memory* requirement, and it is why the paraphrase failure is universal in stateless
systems: without the failed set, "different from what we tried" has no referent. Its growth
and compaction are specified in §12 R8; its ownership transfer from `C-30` in §4.1.

*Third*, every persisted vector carries `axisSetVersion` and `policyVersion` (§4.3). Vectors
recorded under a retired axis set remain readable but are **not comparable** across versions,
and closure is never applied across an axis-set boundary.

#### 7.4.5 Rejected alternative: `D ≤ 2`

Recorded because the review raised it explicitly and it is the obvious patch. It was rejected.
`D ≤ 2` still forbids rung 2 (four coordinates change), so it does not fix the defect; and it
newly *permits* genuinely undiagnosable double changes, so it costs the property P8 exists to
protect. Relaxing a threshold cannot repair a model whose coordinates are correlated — the
fix has to distinguish intended change from forced consequence, which is what closure does.

### 7.5 The paraphrase detector

L1–L3 are necessary but not sufficient. A system can change the entry point nominally while
producing text that is semantically the previous explanation. So re-teach turns carry a
**two-part check**:

1. **Structural** — primary axis declared and changed, closure respected, checked at decision
   time. Deterministic and free (small enum comparisons plus one table lookup).
2. **Semantic** — the produced utterance's similarity to the failed utterance must fall below
   a threshold, checked at output time by `C-36`. A re-teach that passes structurally and
   fails semantically is a *repairable* violation: constrained regeneration naming the axis
   that was supposed to change.

The false-positive rate of the semantic check is itself a tracked metric — a detector that
frequently rejects genuinely different teaching is a defect in the detector.

### 7.6 Partial understanding is not a re-teach

The most valuable distinction in this component, and the one most systems get wrong.

When a learner demonstrates partial understanding, something worked. Re-teaching the whole
claim discards it, costs time, and — worse — tells the learner their progress did not
register. The correct operation is **refinement**:

```
REFINEMENT PROTOCOL

 1  Identify precisely which sub-claim failed. If this cannot be
    identified, the correct next move is a diagnostic probe, not a re-teach.
 2  Explicitly name what the learner GOT RIGHT. Not encouragement —
    information. It tells them what to keep.
 3  Hold the representation constant. B = A is CORRECT here, because
    this is not a re-teach and the paraphrase rule does not apply.
 4  Narrow scope to the failing sub-claim only.
 5  Re-test the sub-claim in isolation, then the whole claim.
```

Step 3 is the point: **the Difference Operator's legality rule does not apply to refinement**,
and misapplying it — forcing a representation change on a partially successful attempt — is
itself a defect. This is why T5 is classified separately in §7.2.

**Refinement is budgeted.** Version 1.0.0-draft budgeted re-teaching and left refinement
unbounded, which permitted indefinite narrowing and, through step 1's diagnostic probe, a run
of consecutive questions that never technically counted as a re-teach. Two rules close this:

- **Maximum 2 narrowing passes** per claim per session. On exhaustion the path escalates to
  full diagnosis (§7.3) and is thereafter governed by the re-teach budgets in §7.7 — a third
  narrowing is not a legal move.
- **Refinement probes count against the consecutive-question bound** (gate G6). A diagnostic
  probe is a question regardless of the protocol that emitted it, and exempting it would
  reintroduce the quiz register through a side door.

### 7.7 Budgets

| Budget | Limit | On exhaustion |
|---|---|---|
| Distinct attempts on one claim, one session | 3 | Stop teaching this concept. Run prerequisite micro-diagnosis. *(Reuses the existing three-representation rule.)* |
| Consecutive re-teaches without a learner production | 2 | Force a `give` or a production task; a third consecutive re-teach is not a legal move |
| Attempts across all sessions on one claim | 6 | Authoring defect report against the concept's assets, routed to the authoring queue |
| Escalation-ladder rung 3+ on any method | any | Authoring flag against that concept's entry |

The third row is the important one: repeated failure across sessions is not a learner
property, it is **a content defect**, and routing it to authoring rather than to more
retrying is how the system improves rather than merely persists.

### 7.8 Re-teaching decision flow

```
        learner signal
              │
              ▼
   ┌──────────────────────┐
   │ CLASSIFY TRIGGER     │  T1…T11 (§7.2)
   └──────────┬───────────┘
              │
       ┌──────┴──────────────────────────────┬───────────────────┐
       ▼                                     ▼                   ▼
  affect-class?                       partial success?      not-a-failure?
  (T3, distress)                      (T5)                  (T9, T11)
       │ yes                                │ yes                │ yes
       ▼                                    ▼                    ▼
  ┌──────────┐                     ┌────────────────┐    ┌──────────────┐
  │ C-31     │ preempts            │ REFINEMENT     │    │ HOLD /       │
  │ RECOVERY │ everything          │ (§7.6)         │    │ CONSOLIDATE  │
  └──────────┘                     │ D = 0 correct  │    │ or C-32      │
       │                           └────────────────┘    └──────────────┘
       ▼ on exit, resume one rung below entry
  ┌────────────────────────────────────────────────────┐
  │ DIAGNOSE  (§7.3, six causes)          ← MANDATORY  │
  └───────────────┬────────────────────────────────────┘
                  │
     ┌────────────┼────────────┬───────────────┬────────────────┐
     ▼            ▼            ▼               ▼                ▼
   C1 prereq   C2 miscon.   C3 repr.       C4 load          C6 tutor
     │            │         mismatch          │             defect
     ▼            ▼            │              ▼                ▼
  leave the   misconception    │          decompose        GIVE, and
  concept;    collision        │          (axis 6)         log against
  teach the   (NOT a           │                           the DECISION
  prereq      re-explanation)  │                           not the learner
                               ▼
              ┌────────────────────────────────────┐
              │ SELECT re-teach attempt B where    │
              │   primary axis p = diagnosed axis  │
              │   B[p] ≠ A[p]        (L1, L2)      │
              │   B = closure(A, p, B[p])    (L3)  │
              │   B ∉ failedAttempts         (L4)  │
              │   B legal under C-29 + TQ-3  (L5)  │
              └────────────────┬───────────────────┘
                               │  none available?
                               ├──────────────────────▶ escalate: drop
                               │                        concreteness (axis 4)
                               ▼                        or route to prereq
              ┌────────────────────────────────────┐
              │ BUDGET CHECK (§7.7)                │
              │ exceeded → prereq diagnosis /      │
              │            authoring defect report │
              └────────────────┬───────────────────┘
                               ▼
              ┌────────────────────────────────────┐
              │ EXECUTE  →  C-36 semantic          │
              │ paraphrase check on output         │
              └────────────────────────────────────┘
```

### 7.9 Responsibilities

Owns trigger classification, diagnosis routing, the Difference Operator, the failed-attempt
set, re-teach legality, the refinement protocol, and re-teach budgets. **Must not own** affect
detection (Plane 1), recovery execution (`C-31`), method definitions (TQ-3), or strategy
abandonment (TQ-1 — TQ-4 *recommends*, TQ-1 decides).

### 7.10 Interfaces

```
classifyTrigger(learnerTurn, priorDecision, twinState) → Trigger
diagnose(trigger, evidence, history)                   → Diagnosis | InsufficientEvidence
attemptVector(decisionRecord)                          → AttemptVector
closure(fromVector, primaryAxis, targetValue)          → AttemptVector   -- total, pure
axisDependencyMatrix(axisSetVersion)                   → ForcingMatrix
legalReteachSet(conceptId, learnerId, diagnosis)       → AttemptVector[]
refinementPlan(partialEvidence)                        → RefinementPlan
reteachBudgetState(conceptId, learnerId)               → BudgetState
```

### 7.11 Failure modes

- **Diagnosis on insufficient evidence.** The taxonomy demands a classification the evidence
  may not support. `InsufficientEvidence` is therefore a *first-class return value*, and its
  correct handling is a diagnostic probe — not a guessed diagnosis. A system that always
  produces a diagnosis is producing fiction.
- **Axis exhaustion.** All values on the diagnosed axis tried, none worked. Escalation drops
  concreteness (axis 4) or routes to prerequisites; this is the designed floor, not an error.
- **Semantic detector false positives.** Tracked as its own metric; a high rate is a defect in
  the detector, not the renderer.
- **Vector under-specification.** Two genuinely different teaching acts mapping to the same
  vector, so a real change reads as paraphrase. Mitigated by treating vector collisions found
  in review as evidence the axis set needs a versioned amendment (§4.3, §7.4.4).
- **Over-permissive closure.** The mirror risk of the v1.0 defect, and the one to watch now: a
  `•` in the dependency matrix that is not genuinely forced turns L3 from a constraint into a
  licence, and a maximally-forcing matrix would permit any change at all. Mitigated by the
  minimality property (§7.4.3) requiring per-entry pedagogical justification, and measured by
  tracking mean closure size — a rising mean is a defect signal against the matrix.

### 7.12 Falsifiable prediction

*Under the primary-axis-plus-closure operator, the rate of "explain again in different words"
turns falls to near zero, and second-attempt success rate rises measurably relative to
unconstrained re-teaching.* If second-attempt success does not rise, the operator is enforcing
variety without enforcing pedagogy, and the axis set or the dependency matrix is wrong.

*Secondary, testing the v1.1 correction specifically:* under closure, escalation-ladder rungs
execute as authored. If a material share of legal re-teaches still cannot be expressed as
one primary axis plus its closure, the axis set remains over-decomposed and needs collapsing
rather than the matrix needing widening.

---

## 8. TQ-5 · Lesson Gold Standard

### 8.1 Purpose

Define, in terms of evidence the system already records, when a lesson is good enough to be
considered production-ready. Nothing in the repository currently answers this, which means
teaching quality is at present asserted rather than measured.

**Unit of evaluation:** one **concept-attempt trajectory** — all decisions, actions, learner
responses, and outcomes for one learner, one concept, one strategy attempt, across however
many turns and sessions it spans. Not a session, and not a turn: a session may contain
several lessons and a turn contains none.

### 8.1.1 Trajectory closure — provisional and final (added v1.1.0)

Version 1.0.0-draft defined the unit but never defined when it *closes*. Combined with
REVISION's since-corrected "never skippable" status, this made every trajectory unscoreable
until its REVISION occurred — up to thirty days later, and never at all for a churned learner.
That would have made §14.2 Stage 2 unable to produce a baseline in any useful timeframe,
which is fatal to the whole implementation sequence, since every later stage is judged against
that baseline.

Closure is therefore two-stage:

```
PROVISIONAL CLOSURE
  Trigger : C-29 reaches VERIFIED and SUMMARY has executed
            (or the strategy is ABANDONED, which also closes provisionally)
  Timing  : same session, typically minutes after the lesson ends
  Scores  : all 10 gates + S1…S10 excluding revision-dependent terms
  Purpose : the operational quality signal. This is the number that drives
            authoring priority, defect reports, and Stage 2's baseline.

FINAL CLOSURE
  Trigger : the scheduled REVISION executes, OR its scheduling window lapses
  Timing  : +1 to +30 days
  Scores  : provisional scores, unchanged, PLUS retention outcome
  Purpose : the learning signal, and the join key into TQ-7 Tier C / OSF.
  Lapsed  : a window that lapses because the learner did not return is recorded
            as retention-unknown. It is an OUTCOME, never a lesson defect —
            the lesson cannot be blamed for a learner who did not come back.
```

**The two scores are reported separately and are never averaged into one number.** They
measure different things — one measures whether the teaching had the right properties, the
other whether it worked — and collapsing them would hide exactly the divergence (§8.7) that
makes the rubric falsifiable.

**Production-readiness is assessed at provisional closure.** Final closure validates the
rubric, not the lesson: a systematic gap between high provisional scores and poor final
outcomes is evidence the rubric is wrong, and is the trigger to rebuild it against outcome
data (§8.7).

### 8.2 The structural / measured split

The most important thing this section does. Every criterion is classified:

- **STRUCTURAL** — enforced by legality (`C-29`), policy (`C-28` Band 2), or a contract clause
  the verifier holds (`C-36`). A conforming implementation *cannot* violate it. A violation is
  a bug in the enforcement, not a teaching defect.
- **MEASURED** — detectable only after the fact from the trajectory. It can be violated. It is
  reported, trended, and drives improvement.

An architecture that presents all criteria as guarantees is lying. The split is what makes
the standard honest, and it is also the roadmap: moving a criterion from MEASURED to
STRUCTURAL is a concrete, valuable engineering task with a clear definition of done.

### 8.3 Hard gates

A lesson failing **any** gate is not production-ready, regardless of score.

| ID | Gate | Class | Enforcement point |
|---|---|---|---|
| **G1** | No assessment action before `INSTRUCTED` | STRUCTURAL | `C-29` legality |
| **G2** | No advancement on assisted or echoed evidence | STRUCTURAL | `C-29` transition evidence requirement |
| **G3** | Every re-teach declares a primary axis, changes it, and respects closure (§7.4.2 L1–L3); no paraphrase | STRUCTURAL (L1–L3) + MEASURED (semantic check) | TQ-4 filter; `C-36` semantic check |
| **G4** | Every re-teach is preceded by a recorded diagnosis | STRUCTURAL | TQ-4 precondition |
| **G5** | The lesson has a close; a session never ends on unresolved failure without a banked win | STRUCTURAL | `C-33` budget reservation; abandoned-session debt |
| **G6** | No more than 2 consecutive question-actions, **refinement probes included** (§7.6) | STRUCTURAL | `C-29` legality + contract clause |
| **G7** | A non-verbal representation was served, or its absence carries an **enumerated reason code** | MEASURED | trajectory audit |
| **G8** | Any surfaced misconception is addressed, or deferred with an **enumerated reason code** | MEASURED | trajectory audit |
| **G9** | Every action carries a rationale and `alternativesRejected[]` | STRUCTURAL | `C-28` decision record schema |
| **G10** | The tutor never affirmed a wrong answer or denied a right one | STRUCTURAL | `C-36` correctness-consistency check |
| **G11** | A REVISION was **scheduled** (execution is not required — §5.2) | STRUCTURAL | TQ-2 arc completion requirement |

Seven of eleven are fully structural given the frozen architecture; G3 is half-structural; G7
and G8 are measured and are the two clearest candidates for future structural promotion.

**G7 and G8 require enumerated reason codes (added v1.1.0).** As originally written, both
passed on the existence of *any* recorded justification, which measured whether the system
writes strings rather than whether it teaches. Both now draw from a **closed, versioned reason
set**; a reason outside the set fails the gate, and adding a reason requires an amendment —
which forces the case to be argued rather than typed.

```
G7 · legal reasons for serving no non-verbal representation
     VERBAL_CLAIM         the claim has no spatial/dynamic/relational structure
     CHANNEL_UNAVAILABLE  learner context or accessibility profile precludes it
     ASSET_ABSENT         no authored visual exists  → emits a coverage defect
     LOAD_REDUCTION       adding a channel would exceed capacity now

G8 · legal reasons for deferring a surfaced misconception
     NOT_BLOCKING         it does not contradict any prerequisite of current work
     AFFECT_PROTECTED     C-31 preempted; repair queued for a stable moment
     BUDGET_EXHAUSTED     queued to the repair queue with a scheduled slot
     INSUFFICIENT_EVIDENCE  one ambiguous signal; queued for re-probe
```

`ASSET_ABSENT` deliberately both passes the gate and emits a coverage defect: the lesson was
not wrong to proceed, and the catalogue was wrong to be empty. Those are different failures
with different owners, and conflating them would either punish lessons for authoring debt or
hide the debt entirely.

### 8.4 Scored dimensions

Ten dimensions, each 0–4 with observable anchors. Anchors are stated in terms of ledger
evidence, never impressions.

The **Instrument** column was added in v1.1.0. Version 1.0.0-draft claimed in §8.1 that every
criterion was defined over evidence the system already records; review found three that are
not. A rubric that scores around a missing instrument produces confident numbers from nothing,
which is precisely the failure OSF's `OS-6` exists to prevent. Dimensions marked **NYS** (not
yet scoreable) are **excluded from the mean** until their instrument lands — they are not
scored as zero, and they are not quietly estimated.

| ID | Dimension | Instrument | 0 | 2 | 4 |
|---|---|---|---|---|---|
| **S1** | Arc completeness | ✅ available | phases missing with no reason | present, some skipped with reason codes | all archetype-required phases present with exit evidence |
| **S2** | Load discipline | ❌ **NYS** — no working-capacity instrument exists (§3.4) | new elements far above capacity | at capacity | within capacity with headroom at every phase |
| **S3** | Representation richness | ✅ available | one representation only | two, one non-verbal | ≥2 genuinely distinct (differing on axis 3) plus a learner-produced one |
| **S4** | Interaction balance | ✅ available | tutor-talk ≥ 90% | ~70% | learner production ≥ 40% of turns **and** ≥1 extended production (§NTH-4 note) |
| **S5** | Struggle calibration | ❌ **NYS** — requires the speed/confidence read discarded at the STT boundary (`foundations/03 §7`) | success rate outside band throughout | in band part of the time | in the productive band, adjusted on evidence |
| **S6** | Responsiveness | ✅ available (via `alternativesRejected[]`) | decisions traceable to the plan only | mixed | every decision traceable to specific learner evidence |
| **S7** | Voice quality | ⚠️ **PARTIAL** — register and burst discipline are measurable in text; wait-time is not a tutor-side quantity in an async medium | register drops on error; walls of text | mostly consistent | consistent register, burst discipline |
| **S8** | Assessment quality | ✅ available | items do not discriminate | some discriminate | items discriminate; distractors misconception-mapped |
| **S9** | Closure quality | ✅ available | no summary | tutor-produced summary | learner-produced summary; open loops recorded |
| **S10** | Efficiency | ✅ available | turns far above concept baseline | at baseline | at or below baseline for equal evidence |

**S7's wait-time anchor was removed rather than marked NYS.** Wait time is instructional in
speech, where the tutor controls the silence. In an asynchronous text medium the silence
belongs to the learner, so "wait-time honoured" was not a hard-to-measure property — it was a
category error, imported from the voice literature without checking the channel. It returns as
a scored property if and when duplex voice lands (`C-37`'s stated evolution).

**Production-ready threshold:** all **eleven** gates pass **AND** the mean over *scoreable*
dimensions ≥ 3.0 **AND** no scoreable dimension below 2.

**Threshold honesty (v1.1.0).** With S2 and S5 excluded, the mean today runs over eight
dimensions, not ten — and the two excluded are the two most directly tied to cognitive load and
productive difficulty. The threshold is therefore measuring a *narrower* construct than the
rubric describes, and comparisons across a period in which an instrument lands are not valid.
Both facts must be reported alongside any score. See OQ-5 for the calibration status of the
3.0/2.0 numbers themselves, which remain reasoned rather than empirical.

The floor matters as much as the mean. A lesson scoring 4 on eight dimensions and 0 on
interaction balance is a lecture, and averaging conceals exactly the failure that most needs
surfacing.

**S10 is deliberately last and deliberately weighted equally.** Efficiency is a real quality —
a lesson that takes four times as long for the same evidence has cost the learner three
sessions they could have spent elsewhere. But it must never dominate, because the fastest
lesson is always "tell them the answer," which scores zero everywhere else. Ranking S10 with
the others and requiring a floor on all dimensions is the structural guard against
optimizing for speed.

### 8.5 Evaluation modes

1. **Offline trajectory replay** — the primary mode. Deterministic gates and most dimensions
   compute directly from recorded decisions. Runs continuously over sampled trajectories.
2. **Predictive pre-flight** — evaluate the *plan* (strategy + arc) before execution against
   the gates it can already determine (e.g. an arc omitting INDEPENDENT fails G2 in advance).
   Cheap and catches whole classes of defect before a learner sees them.
3. **Expert human review** — a calibration sample, scored by qualified educators blind to the
   automated score. Its purpose is to measure the *automated scorer's* validity, not to grade
   lessons; where human and machine diverge, the machine's rubric is the suspect.
4. **Adversarial suite** — hand-built trajectories that *should* fail specific gates,
   confirming the gates fire. A gate never observed firing is a gate never verified.

### 8.6 What the Gold Standard explicitly does not claim

It measures whether teaching had the properties of good teaching. **It does not measure
whether learning occurred.** A trajectory can pass every gate and score 4.0 and leave the
learner unable to do the thing a week later. Only delayed unassisted retrieval settles that,
and it belongs to TQ-7 Tier C and to OSF.

Stating this plainly is a design requirement, not modesty: a quality standard that quietly
implies it proves learning becomes the metric the system optimizes, and the system will
learn to produce trajectories that score well.

### 8.7 Falsifiable prediction

*Trajectories scoring ≥3.0 will show materially higher +7-day unassisted retrieval than
trajectories scoring <2.0 on the same concepts.* If they do not, the rubric measures the
appearance of good teaching rather than good teaching, and must be rebuilt against outcome
data rather than against pedagogical theory.

---

## 9. TQ-6 · Teacher Decision Flow

### 9.1 The eight questions are not eight decisions

The brief lists eight decisions. Treated as eight independent decision procedures they would
conflict — "when to ask questions" and "when to explain" would each claim the same turn, and
the conflict would be resolved by ordering accident.

They are instead **eight views of one decision**, resolved by `C-28`'s existing band order.
Phase 1 does not add a ninth authority; it supplies the deterministic answering rule each
question was missing.

### 9.2 The unified turn flow

```
                         ┌─────────────────────┐
   learner turn ────────▶│  SENSORS / TWIN     │  (Plane 1, existing)
                         └──────────┬──────────┘
                                    ▼
   ╔══════════════════════════ C-28 DECISION KERNEL ══════════════════════════╗
   ║                                                                          ║
   ║  BAND 0 · SAFETY ────────────────────────────────────▶ terminate/escalate║
   ║       │ clear                                                            ║
   ║  BAND 1 · AFFECT ────────────────────────────────────▶ C-31 RECOVERY     ║
   ║       │ clear                                             (preemptive)   ║
   ║       ▼                                                                  ║
   ║  BAND 2 · POLICY  — produces the LEGAL ACTION SET                        ║
   ║       ├── C-29 teaching-state legality                                   ║
   ║       ├── C-32 struggle band + hint/withholding policy                   ║
   ║       ├── C-33 session budget + protected close                          ║
   ║       ├── ★ TQ-1 strategy commitments          ◀── new constraint source ║
   ║       ├── ★ TQ-2 arc phase entry/exit          ◀── new constraint source ║
   ║       └── ★ TQ-4 re-teach legality             ◀── new constraint source ║
   ║           (primary axis + closure, §7.4.2)                                ║
   ║       │                                                                  ║
   ║       ▼                                                                  ║
   ║  BAND 3 · TACTICS — selection WITHIN the legal set                       ║
   ║       └── C-30 action selector, operating inside                         ║
   ║           the TQ-1 strategy frame and TQ-2 current phase                 ║
   ║                                                                          ║
   ╚══════════════════════════════════┬═══════════════════════════════════════╝
                                      ▼
              C-34 compile → C-35 render → C-36 verify → C-37 deliver
                                      │
                                      ▼
                          Ledger (decision + outcome join)
                                      │
                                      ▼
                        ★ TQ-5 gates · ★ TQ-7 metrics
```

**The single most important property of this diagram:** Phase 1 adds three *constraint
sources* to Band 2 and zero new decision authorities. TQ-1, TQ-2, and TQ-4 narrow the legal
set. They never select. Selection remains `C-30`'s, at Band 3, where it already lives.

### 9.3 The eight questions, answered deterministically

**Q1 · What to teach.** *Owner: `C-33` + Review Scheduler + TQ-1.*
Strict priority, first match wins:
```
1  Safety / crisis                                  → not a teaching decision
2  ACTIVE misconception blocking a prerequisite of  → repair it first (C-29
   anything scheduled today                            forbids building on it)
3  Due review at risk of decay past recovery        → retrieval practice (M17)
4  Suspended concept whose blocker has cleared      → resume at arc position
5  Current concept campaign, arc incomplete         → continue
6  Next concept by readiness + curriculum order     → new campaign, TQ-1 selects
7  Nothing ready                                    → consolidation or close
```
Row 2 above row 3 is deliberate: teaching new material on a corrupted foundation produces
work that must later be undone, which is worse than a decayed memory.

**Anti-thrash rule (added v1.1.0).** As written in v1.0.0-draft, row 4 outranked row 5, so a
suspended concept whose blocker cleared would preempt an in-progress campaign — which could
itself then be preempted on the next clearing, and so on. Two rules bound it:

- **AT-1 · Minimum dwell.** An `ACTIVE` campaign may not be preempted by row 4 within its
  minimum dwell (one completed arc phase, or one session, whichever comes first).
- **AT-2 · Prerequisite exception.** AT-1 is waived when the resuming concept is a prerequisite
  of the active one — in that case preemption is not thrash, it is the correct order of work,
  and continuing the active campaign would be building on the gap that suspended it.

With both in force, row 4's effective position is *below* row 5 except on the prerequisite
path, which is the behaviour originally intended.

**Q2 · When to explain.** *Owner: `C-29` legality + TQ-2 phase + TQ-4.*
Explain when the arc is in EXPLANATION, **or** when diagnosis returns C3 (representation
mismatch) and the chosen axis change is an explanation form, **or** when the learner asks and
no unassisted attempt is currently owed.
Do **not** explain: as the response to a first "I don't know" following a question that
outran teaching (that is diagnosis C6 — the correct move is to *give* something concrete,
and to log the defect against the decision); or as a second consecutive re-teach with no
learner production between (budget row 2).

**Q3 · When to ask.** *Owner: `C-29` legality + TQ-3 preconditions.*
Ask only when **all** hold: state is at or past `INSTRUCTED`; consecutive-question count < 2;
the learner has material to reason from; and the question's *purpose is declared* —
`ask-to-diagnose` (I do not know what they know) versus `ask-to-consolidate` (I know, and
retrieval will strengthen it). An undeclared-purpose question is not a legal action; this is
what stops questioning from becoming a conversational default.

**Q4 · When to demonstrate.** *Owner: TQ-2 arc + TQ-4 escalation.*
Demonstrate when: the learner is a complete beginner on this concept (demonstrate *before*
explaining — the first-lesson law); the concept is dynamic, procedural, or physical; an
explanation has failed once and diagnosis returns C3 (escalation rung 2 — the words were
pointing at an experience the learner lacks); or the arc's archetype places demonstration
first (A1, A5, A9). Never demonstrate without eliciting a committed prediction (M5).

**Q5 · When to show visuals.** *Owner: TQ-2 §5.4.*
The four conditions in §5.4, and only those. A visual that satisfies none is decorative and
prohibited. Absence must be justified in the record (gate G7).

**Q6 · When to switch method.** *Owner: TQ-4.*
Only after diagnosis; only when the diagnosis implicates axis 2 or 3; only to a method not in
the failed set; only when its preconditions hold. Never mid-beat: a method in progress either
completes its shape or is **explicitly aborted with a recorded reason**. Abandoning a method
silently between beats is how the incoherence this whole layer exists to prevent gets back in.

**Q7 · When to review.** *Owner: Review Scheduler + TQ-2 REVISION.*
Scheduled review fires per the spacing schedule. Opportunistic review fires when a
prerequisite is naturally touched by today's work (free retrieval, take it). Forced review
fires when a prerequisite tests weak during a new campaign — and it interrupts, because
proceeding on a weak prerequisite manufactures failure.

**Q8 · When to finish.** *Owner: TQ-2 (lesson) and `C-33` (session) — two different questions.*

*Finish the lesson* (concept campaign complete) when: INDEPENDENT exit evidence is present at
criterion **and** SUMMARY has run **and** REVISION is scheduled. Nothing else finishes a
lesson — not budget, not fatigue. Those *suspend* it.

*Finish the session* when: the session budget's reserved close is reached; or the affect stop
fires; or a summit-ending opportunity presents itself (a clean success at a natural boundary —
ending on a win is worth more than one more concept); or the learner ends it.

**Distinguishing these two is load-bearing.** Conflating them produces either sessions that
never end because the lesson is not done, or concepts marked complete because the session
ended — and the second is the mechanism by which fake mastery enters the learner model.

### 9.4 Falsifiable prediction

*Every turn produced by a conforming implementation is explainable by naming the band, the
rule, and the evidence.* If a turn occurs that cannot be so explained, an undocumented
decision path exists — which is a defect by definition under `A4`/P1.

---

## 10. TQ-7 · Teaching Quality Metrics

### 10.1 Purpose and boundary

Measure whether teaching had the properties of good teaching, and supply the process side of
the join that lets OSF determine which of those properties actually cause learning.

**Boundary with OSF, stated precisely.** OSF owns outcome constructs, experimental design,
causal attribution, and the statistical machinery. TQ-7 owns process instrumentation and
defines no competing outcome metric. The join between them — *which teaching properties
predict retention* — is the point of both, and it is the one body of knowledge that cannot be
obtained anywhere except the venue where the learning happened.

**Stated once, plainly, so it cannot be inferred wrongly (added v1.1.0):**

> **Phase 1 owns process measurement, not proof of learning.** Tier A measures tutor behaviour.
> Tier B measures in-lesson performance, which is contaminated by the teaching that just
> occurred and is the classic cramming artefact. Tier D attributes over the other tiers.
> **Only Tier C — delayed unassisted retrieval — is evidence that learning occurred, and Tier C
> is methodologically OSF's.** A reader who takes Tiers A, B or D as proof of learning has
> misread this component, and no report generated from them may be captioned as showing that
> learning happened.

The brief for this phase asked for "measurable indicators showing that learning actually
occurred." What Phase 1 can honestly deliver is the *process* half of that, plus the join that
makes the outcome half attributable. Claiming more would be the exact substitution §10.5
lists as this component's primary failure mode.

### 10.2 Four tiers

**Tier A · Process compliance.** Derived directly from TQ-5. Per-gate violation rate; per-
dimension score distribution; **degraded-method-execution rate** (how often TQ-3 methods ran
in `degradedForm` for want of assets — the honest measure of the content gap);
strategy-abandonment rate by archetype; deviation rate from committed strategies. Cheap,
deterministic, computable on every trajectory. Tier A answers *did we teach the way we said we
would* — nothing more, and it must never be presented as more.

**Tier B · In-lesson learning indicators.** Observable within the lesson; necessary but not
sufficient evidence of learning:
- **Assisted → unassisted transition** — the primary in-lesson indicator, because it is the
  only one that cannot be produced by echoing.
- **Latency reduction** on equivalent items across attempts (fluency developing).
- **Self-correction rate** — a learner who catches their own error has a monitoring model,
  which is a stronger signal than a correct answer.
- **Learner-produced explanation quality** against the concept's own criteria.
- **Within-lesson transfer** — correct application to an instance not taught.
- **Misconception phrase disappearance** — the learner's characteristic wrong phrasing stops
  appearing (and, critically, does not reappear under load later). **CONTINGENT on OQ-6**: this
  is the one Tier B indicator requiring verbatim learner language, and it is unavailable for
  any learner whose rights profile prohibits verbatim capture. It must be reported as
  unavailable for those learners, never silently omitted from their quality picture.
- **Hedging reduction** — confidence language converging toward calibration.

**Tier C · Retention.** The only real proof. Unassisted retrieval at +1 day, +7 days,
+30 days, and at transfer. Owned methodologically by OSF; TQ-7 supplies the process
attribution. **No Tier A or B measure may be treated as evidence of learning in the absence of
Tier C.** This is stated as a rule because the pressure to substitute cheap in-lesson signals
for expensive delayed ones is permanent.

**Tier D · Teaching effectiveness attribution.** The decision-consequence join: for each
strategy archetype, method, representation, and asset — its effect on Tier B and Tier C,
conditioned on learner state and concept. This is what makes the library get better instead
of merely bigger, and it requires `alternativesRejected[]` (§4.3) to support counterfactual
questions.

### 10.3 Counter-metrics

Metrics tracked specifically to detect the system gaming its own objectives. Every one of
these has a *direction that looks like success and is not*.

| Counter-metric | What it detects |
|---|---|
| Hint-take rate rising with mastery | Scaffolding substituting for competence |
| Help-seeking rate falling over time | Learner has stopped reporting confusion — the relationship has degraded, and Plane 1's input quality is collapsing |
| Success rate near 100% | The struggle band has been abandoned toward comfort; nothing is being learned |
| Session length rising with no retention change | Engagement optimization has crept in |
| Assets promoted with high Tier B and flat Tier C | Content that produces in-lesson performance and no retention — the most dangerous asset class |
| Gate pass rate at 100% across all trajectories | The gates are not discriminating and are probably mis-specified |

**Structural prohibition, restated from `C-32` and OSF:** engagement, time-on-task, and
session count MUST NOT be objectives at any level of this system. They are diagnostics. A
teaching-quality system given an engagement objective inverts into the assistant behaviour
the entire architecture exists to prevent, and it does so without any single component being
individually wrong — which is why the prohibition must be architectural rather than a matter
of judgement.

### 10.4 The core quality statement

Everything above reduces to one claim, stated so it can be checked:

> A lesson was good if a learner who could not do X unassisted before can do X unassisted
> after, can still do it after a delay, can do it in a form they were not taught, and the
> system's own records explain why each teaching decision was made.

Four clauses, four failure modes: no baseline (X was already known), no delay (crammed), no
transfer (memorized the surface), no explanation (unrepeatable, so the next learner gains
nothing).

### 10.5 Failure modes

- **Metric substitution.** Tier A is cheap and Tier C is slow, so Tier A becomes the de facto
  quality measure. Mitigated by the §10.2 rule and by refusing to report Tier A without the
  Tier C sample alongside it.
- **Attribution under confounding.** Better learners get different teaching, so methods look
  effective when they were merely allocated to strong learners. Mitigated by OSF's causal
  machinery — TQ-7 does not attempt its own causal inference.
- **Instrument error laundering.** Tier B indicators depend on sensors with real error
  profiles. Every metric carries its instrument's error profile, per `OS-6`.

---

## 11. Interfaces Between Components

### 11.1 Interface principles

- All interfaces are **typed and pure** where possible: given the same inputs, the same
  outputs, so trajectories replay deterministically.
- **Constraints flow down, evidence flows up.** No Phase 1 component calls a turn-scale
  component; they publish constraints that `C-28` consumes at Band 2.
- **No component reads another's internal state.** Only published outputs.
- Every interface is **versioned**, and its version appears in the decision record.

### 11.2 Interface catalogue

| From | To | Payload | Direction |
|---|---|---|---|
| Plane 1 (Twin) | TQ-1 | learner projection: mastery, misconceptions, affinities, constraints | down |
| TQ-1 | TQ-2 | `TeachingStrategy` (archetype, method sequence, commitments) | across |
| TQ-1 | `C-28` Band 2 | `PolicyConstraint[]` from `commitments[]` | down |
| TQ-2 | `C-28` Band 2 | `ArcConstraint[]` — forbidden actions only; no evidence claims (§11.3) | down |
| `C-29` | TQ-2 | state transitions, incl. out-of-phase advances requiring re-alignment (§5.0 SYNC-2) | up |
| TQ-2 | `C-30` | current phase + admissible action families | down |
| TQ-3 | TQ-1 | method definitions, preconditions, affinities | across |
| TQ-3 | `C-34`/`C-36` | `qualityContract` clauses for the active method beat | down |
| TQ-4 | `C-28` Band 2 | re-teach legality filter (primary axis + closure, §7.4.2) | down |
| TQ-4 | TQ-1 | abandonment *recommendation* (TQ-1 decides) | across |
| TQ-4 | `C-36` | paraphrase-check clause naming the axis that must differ | down |
| Ledger | TQ-4 | failed-attempt vector set per learner per concept (**captured, not derived** — see below) | up |
| Ledger | TQ-5 | complete concept-attempt trajectory | up |
| TQ-5 | TQ-7 | gate results + dimension scores | across |
| TQ-7 | OSF | process features for the process↔outcome join | across |
| TQ-7 | Authoring queue | coverage defects, asset defect reports, authoring flags | up |

**AttemptVector is CAPTURED, not derived (resolved v1.1.0).** v1.0.0-draft was ambiguous:
§11.2 implied derivation via `attemptVector(decisionRecord)` while §14.2 Stage 1 said "record
attempt vectors." These are different designs with different gating, and the ambiguity had to
be resolved rather than left to implementation.

**Resolution: capture.** Derivation is not possible. Axes 3 (representation), 4 (concreteness),
5 (entry point) and 7 (agency) are not present in the existing decision record — they are
properties of the *pedagogical intent* of a turn, and nothing today writes them down. A
`attemptVector(decisionRecord)` that inferred them from action type and rendered text would be
reconstructing intent from output, which is guessing.

Consequences, stated plainly because they change the gating:
- Capturing the vector is a **persistence change** and is therefore G2-gated.
- `C-28`'s decision record gains the vector as a first-class field, written by the kernel at
  decision time — the only point where the intent is actually known.
- `attemptVector()` remains in TQ-4's interface (§7.10) as a *reader*, not a deriver.
- This is precisely the work of §14.2 Stage 1, and it is why Stage 1 must precede Stage 3:
  without capture, TQ-4's L4 has nothing to compare against.

### 11.3 The three constraint contracts

The only interfaces that change turn-scale behaviour. All three are **narrowing only** — they
may remove options from the legal set and may never add one, which is what guarantees Phase 1
cannot make an illegal action legal.

```
StrategyConstraint  { strategyId, clause, scope: concept, severity: MUST | SHOULD }
ArcConstraint       { arcId, phase, forbiddenActions[] }
ReteachConstraint   { failedVectorSet[], primaryAxis, closureSet[], axisSetVersion }
```

**`ArcConstraint` carries no `requiredEvidence[]` (corrected v1.1.0).** v1.0.0-draft included
it, which quietly made TQ-2 a second owner of transition evidence requirements — `C-29`'s
documented responsibility. Arc gating is now expressed purely as `forbiddenActions[]`, which is
genuinely narrowing, and **all** evidence requirements defer to `C-29`. This also simplifies
§5.0's precedence rules: with no evidence claim of its own, the arc cannot contradict `C-29`
about whether advancement is earned.

**`ReteachConstraint` carries the closure set, not a distance number** — see §7.4.2.

---

## 12. Risks

| # | Risk | Severity | Likelihood | Mitigation | Residual |
|---|---|---|---|---|---|
| **R1** | **Empty libraries.** Every component here is complete as logic and sparse as content. Method libraries, per-concept dispatch, analogies, probes exist for a small minority of concepts. | **High** | **Certain** | Generic per-knowledge-type defaults good enough to stand alone; `degradedForm` declared per method; degraded-execution rate tracked as a first-class metric (TQ-7 Tier A); authoring priority computed from graph centrality. | **High** — this is the honest dominant risk and it is a content problem no architecture solves. |
| **R2** | **Layer count.** Four scales, seven new components, three constraint contracts. Complexity has its own failure rate. | High | Medium | Narrowing-only contracts; no new decision authority; every component's exclusion list explicit; Phase 1 is architecture — the implementation roadmap (§14) sequences it so complexity arrives incrementally and each increment is independently valuable. | Medium |
| **R3** | **Arc becomes a script.** The nine phases are read as a sequence and produce scripted courseware. | **High** | Medium | Evidence-gated transitions; archetype-specific instantiation; arc as budget not script; deviation as a recorded first-class event. | Medium — requires implementation discipline, not just design. |
| **R4** | **Difference Operator enforces variety without pedagogy.** L1 is satisfied by changing a primary axis that does not matter for this failure. | High | Medium | L2 (the primary axis must be the *diagnosed* one) carries the pedagogy; §7.12's prediction tests exactly this. | Medium |
| **R4b** | **Over-permissive closure.** The mirror of the v1.0 defect: a dependency-matrix entry that is not genuinely forced turns L3 from a constraint into a licence, and a maximally-forcing matrix permits any change at all. | High | Medium | Minimality requirement with per-entry pedagogical justification (§7.4.3); mean closure size tracked as a defect signal; matrix is versioned and reviewed, not editable per-concept. | Medium — this is now the operator's principal risk, and it is newly introduced by the v1.1 correction. |
| **R5** | **Diagnosis fabrication.** The six-cause taxonomy demands a classification thin evidence cannot support. | High | **High** | `InsufficientEvidence` as a first-class return; correct handling is a diagnostic probe; diagnosis confidence recorded and low-confidence diagnoses trended. | Medium |
| **R6** | **Gold Standard becomes the optimization target.** Trajectories are produced that score well without teaching well. | **High** | Medium | The §8.7 prediction ties the rubric to Tier C; human calibration reviews the *scorer*, not the lesson; a 100% gate pass rate is itself a counter-metric. | Medium |
| **R7** | **Strategy commitment holds too long.** A wrong approach persists because abandonment is deliberately hard. | Medium | Medium | Two-occurrence characteristic-failure trigger; explicit learner rejection abandons immediately; abandonment-rate-by-archetype tracked. | Low |
| **R8** | **Unbounded failed-attempt state, and its read path.** v1.0.0-draft dismissed cost by pointing at cheap integer comparison while ignoring the table behind it. `failedAttempts` grows as learners × concepts × attempts and is read on every failure turn. | Medium | **High** | **Compaction, specified:** the set is compacted per `(learner, concept)` to the **distinct vector set plus occurrence counts and last-failed timestamps**. This bounds the row count by the size of the vector space rather than by attempt count, which is what makes it finite — a learner who fails twenty times on one concept still occupies at most the distinct approaches they actually experienced. Retention follows the learner-data policy; vectors under a retired `axisSetVersion` are archived, not compared (§4.3 V-1). Read path is a single indexed lookup on `(learnerId, conceptId)`. | Low |
| **R8b** | **Latency.** Strategy selection, diagnosis, closure computation, and verification per turn. | Medium | Low | Strategy selection is once per campaign, not per turn; closure is one table lookup over seven small enums; the expensive check (semantic paraphrase) runs only on re-teach turns. | Low |
| **R9** | **Reduced apparent responsiveness.** Constraints refuse things a fluent model would happily do, and a learner may experience this as rigidity. | Medium | Medium | Constraints narrow the legal set, never the conversational surface — a learner's question is always answerable; withholding is always explained once, plainly, with a path forward. | Medium |
| **R10** | **Governance drift.** Phase 1 concepts leak into implementation ahead of G1/G2. | Medium | Low | Explicit gating statement in the header; every component's future work routed through the Wave 0 approval instrument. | Low |
| **R11** | **Arc position rests on an AI-emitted self-report.** TQ-2 inherits ADR 09's tag mechanism (§5.7), which is weaker than instrumented capture: a renderer that mis-reports its own stage corrupts the arc position, and the corruption is invisible until a `planSignature` mismatch. | Medium | Medium | Accepted deliberately to avoid duplicate ownership. Mitigated by `planSignature` mismatch producing an explicit `replan` rather than silent drift, and by `C-29` remaining authoritative on advancement (§5.0 SYNC-1) so a corrupted arc position cannot certify mastery. Tag-vs-state disagreement rate tracked. | Medium |
| **R12** | **Strategy interference across concurrent campaigns.** A session running three concepts runs three archetypes; register whiplash between a Socratic campaign and a concrete-first one may degrade both. Promoted from an open question in v1.0.0-draft — it is a plausible degradation, not a research question. | Medium | Medium | Unmodelled today. Nearest available control is `C-33`'s session shape, which already limits concurrent new concepts. Measurement: compare per-concept Tier B outcomes in single-campaign vs multi-campaign sessions once Stage 1 data exists. | **Medium — unmitigated.** |
| **R13** | **Absent instruments make the Gold Standard measure a narrower construct than it describes.** With S2 and S5 excluded (§8.4), the mean runs over eight dimensions, and the two excluded are those most tied to cognitive load and productive difficulty. | Medium | **Certain** | Exclusion is explicit rather than estimated; both facts reported alongside every score; comparisons spanning an instrument landing are declared invalid. | Medium — resolvable only by acquiring the instruments (§3.4). |

---

## 13. Trade-offs

**T1 · Committed strategy vs. per-turn freedom.**
*Chosen:* commitment with recorded deviation. *Cost:* a wrong strategy persists slightly
longer than pure per-turn selection would allow. *Why:* per-turn re-decision produces
incoherence and, under a fluent renderer, converges on repeated explanation — the failure the
whole phase exists to eliminate. The cost is bounded by pre-declared abandonment conditions;
the benefit is that "we already tried that" acquires a referent.

**T2 · Closed archetype and method sets vs. open generation.**
*Chosen:* closed, versioned sets. *Cost:* a genuinely novel teaching approach cannot be
invented at runtime. *Why:* an open set cannot accumulate evidence, cannot be tie-broken
deterministically, cannot be replayed, and cannot be reasoned over. Closure is what makes
Tier D attribution possible at all. Novel approaches enter by versioned amendment, which is a
feature — it forces the case to be made.

**T3 · One primary axis plus closure vs. a flat distance threshold.**
*Chosen (revised v1.1.0):* exactly one *intentional* change, plus whatever that change forces.
*Cost:* the architecture now depends on a dependency matrix whose entries are pedagogical
judgements, and a wrong entry silently widens or narrows what is legal — a subtler failure than
a wrong threshold, and harder to notice (R4b). *Why:* the flat threshold was not merely
imprecise, it was wrong — it forbade the corpus's own escalation ladder at three of four rungs.
Distinguishing intended change from forced consequence is the only formulation that preserves
P8's diagnosability *and* permits the teaching the corpus already prescribes. `D ≤ 2` was
considered and rejected (§7.4.5): it fixes neither problem and costs the property P8 protects.

**T4 · Structural enforcement vs. flexibility.**
*Chosen:* structural wherever possible. *Cost:* the system will refuse a legitimate move in
some rare situation a human teacher would make. *Why:* the alternative is a system that
usually behaves and occasionally quiz-firsts a frightened beginner. Asymmetric caution: the
rare refusal is recoverable, the rare violation is not.

**T5 · Arc completeness vs. efficiency.**
*Chosen:* completeness, with S10 tracking the cost. *Cost:* lessons take longer than a fast
explain-and-test loop. *Why:* the fast loop's evidence is assisted performance, which does not
predict retention. But the cost is genuinely borne by learners, which is why efficiency is a
scored dimension with equal weight rather than an afterthought.

**T6 · Rich instrumentation vs. privacy and simplicity.**
*Chosen:* record decisions, rationales, rejected alternatives, and verbatim learner phrases
where misconception evidence requires it. *Cost:* a substantial, sensitive data footprint —
particularly for minors. *Why:* an unexplainable decision is an uninspectable decision, and
Tier D is impossible without the join. **This trade-off is not fully resolved here** — the
data-governance question for verbatim capture from minors is a standing owner decision
already recorded in project memory, and it is repeated as OQ-6.

**T7 · Phase 1 as new layer vs. refactor of existing components.**
*Chosen:* new layer above, existing components untouched. *Cost:* more components, and some
conceptual overlap between TQ-1 and `C-30`'s funnel. *Why:* the existing components are
frozen, correct at their own scale, and depended on. A refactor would be a larger change with
worse governance properties for the same benefit.

---

## 14. Future Implementation Guidance

**Nothing below is authorized.** Every item is G2-gated and enters implementation only via the
existing Wave 0 approval instrument, in dependency order.

### 14.1 Sequencing principle

Order by *evidence-unlock*, not by architectural elegance. A component that makes the system
observable is worth more early than a component that makes it clever, because cleverness
without observability cannot be verified and cannot be improved.

### 14.2 Proposed stages

**Stage 1 — Instrumentation (highest value, lowest risk).**
**Capture** attempt vectors (§7.4, §11.2) on every teaching decision — a persistence change,
G2-gated, written by the kernel at decision time because that is the only point where
pedagogical intent is known; maintain the compacted failed-attempt set (§12 R8); record
diagnoses where they already occur. **No behaviour changes at all** — nothing reads the vectors
yet. This alone makes the paraphrase rate measurable for the first time, converting the central
claim of this document from assertion to measurement. If the measured paraphrase rate is low,
several later stages should be reconsidered.

**Stage 2 — TQ-5 offline evaluation.**
Implement the gates and dimensions as a read-only trajectory evaluator over recorded data.
Still no behaviour change. Produces the baseline every later stage is judged against, and the
adversarial suite proves the gates fire.

**Stage 3 — TQ-4 structural half.**
The primary-axis + closure filter (L1–L5) and the mandatory-diagnosis precondition, as Band 2
constraints. This is the first learner-visible behaviour change and the highest-value one. It
requires Stage 1's captured failed-attempt set and the published, reviewed dependency matrix.

**Stage 4 — TQ-3 method schema.**
Formalize the schema and populate it for the methods already exercised by authored concept
entries. This is largely a *transcription* of knowledge the corpus already holds, not new
authoring.

**Stage 5 — TQ-2 arc.**
The arc as a Band 2 constraint source over `C-29`'s existing states, persisted via ADR 09's
`lessonStageProgress` (§5.7 RC-1…RC-5) — which means **ADR 09 Option B is implemented as part
of this stage rather than separately**, and the §5.0 synchronization table is enforced as a
build-time totality check. Requires Stage 4 (arcs are instantiated from method sequences).

**Stage 6 — TQ-1 strategy commitment.**
Last of the behaviour changes, because it is the most invasive and depends on all of the
above. Its value is largely unrealizable without Stages 3–5.

**Stage 7 — TQ-7 Tier C/D join.**
Requires longitudinal data that only accumulates after Stages 1–6 are running in production.
Cannot be pulled earlier by effort.

### 14.3 What must be true before Stage 3

- Stage 1 instrumentation has run long enough to establish a baseline paraphrase rate.
- The axis set (§7.4.1) has survived review against real trajectories without vector collisions.
- **The axis-dependency matrix (§7.4.3) has been reviewed and passes its three build-time
  properties — totality, acyclicity, minimality — and every `•` carries its stated pedagogical
  justification.** Without minimality review, L3 is a licence rather than a constraint (R4b).
- **`closure()` is verified total** over the axis set: every (vector, axis, value) triple has a
  defined result. An undefined triple must fail the build, not the turn.
- **The existing escalation ladders execute as authored under closure** — the regression test
  that the v1.1 correction actually worked (§7.4.2's verification table, mechanized).
- The `InsufficientEvidence` path has a defined, tested behaviour — otherwise mandatory
  diagnosis becomes mandatory fabrication (R5).

### 14.4 Standing constraints on all stages

- No component may be implemented in a way that lets it *add* to the legal action set.
- No stage may introduce an engagement objective at any level.
- Every stage ships with its falsifiable prediction registered in advance, per `OS-2`.

---

## 15. Acceptance Criteria

Phase 1 is complete and approvable when all of the following hold. These are criteria for the
**document**, not for an implementation.

| # | Criterion | Status |
|---|---|---|
| **A1** | All seven briefed deliverables are designed to component depth: purpose, responsibilities, exclusions, internal logic, interfaces, failure modes. | ✅ §4–§10 |
| **A2** | All twelve required output sections are present. | ✅ |
| **A3** | Every deliverable is reconciled against existing repository components, with a recorded verdict of NEW / EXTEND / CONSOLIDATE / COMPLEMENT. | ✅ §0 |
| **A4** | No component duplicates an existing authority; every "must not own" is explicit. | ✅ §3.3 and per-component |
| **A5** | Existing taxonomies are reused verbatim rather than re-derived. | ✅ §0 |
| **A6** | "Genuinely change strategy rather than paraphrase" is defined as a computable, checkable predicate. | ✅ §7.4.2 (L1–L5) |
| **A7** | Lesson quality criteria are classified structural vs. measured, **and each declares whether its instrument exists**. | ✅ §8.2–§8.4 (instrument column added v1.1.0) |
| **A8** | All eight teacher decisions have deterministic answering rules with named defaults. | ✅ §9.3 |
| **A9** | Quality metrics are distinguished from outcome metrics, with the OSF boundary stated. | ✅ §10.1 |
| **A10** | Every component declares at least one falsifiable prediction. | ⚠️ **PARTIAL** — §4.10, §5.11, §7.12, §8.7, §9.4 carry explicit predictions; **TQ-3 and TQ-7 do not** and express falsifiability only through failure signatures and counter-metrics. Marked partial in v1.1.0; v1.0.0-draft marked this satisfied, which was wrong given its own footnote. |
| **A11** | Risks and trade-offs state residual risk and accepted cost, not only mitigations. | ✅ §12, §13 |
| **A12** | No code, runtime, schema, API, curriculum, or KG change. | ✅ document only |
| **A13** | Implementation guidance is sequenced by evidence-unlock and explicitly G2-gated. | ✅ §14 |
| **A14** | Open questions are recorded as open rather than resolved by assertion; resolved items are removed rather than left open. | ✅ §16 |
| **A15** | **Every required field a component depends on is recorded with existence status, owner, acquisition path, and defined absent-behaviour.** | ✅ §3.4 (added v1.1.0) |
| **A16** | **All concurrent lifecycles are enumerated, with precedence, legal combinations, and a totality requirement.** | ✅ §5.0 (added v1.1.0) |
| **A17** | **Every scoreable unit has a defined closure point.** | ✅ §8.1.1 (added v1.1.0) |
| **A18** | **Independent architecture review recommends approval.** | ❌ **NOT MET — owner-marked only.** Review R1 returned DO NOT APPROVE against v1.0.0-draft. v1.1.0 responds to all findings (Appendix C) and requires a fresh independent review. This criterion may not be self-marked by the author. |

**A10 is honestly partial rather than smoothed over.** Two components lack a falsifiable
prediction. This is not repaired by inventing one — a prediction manufactured to satisfy a
checklist is worse than an acknowledged gap, because it looks like evidence of rigour while
testing nothing. TQ-3's and TQ-7's predictions should emerge from Stage 1 data.

**Approval gate.** Phase 1 is complete only when A18 is satisfied — a fresh independent
architecture review recommends approval — **and** the owner has approved. On approval: commit,
merge to `main`, delete the feature branch. The merged document becomes the canonical
foundation for Phase 2 (`architecture/phase-02-visual-intelligence`), which will consume TQ-2's
VISUAL phase conditions (§5.4) and TQ-3's M1/M7 as its entry points.

**Status at v1.1.0: NOT COMPLETE.** Sixteen of eighteen criteria are met, A10 is partial, and
A18 is unmet by construction until the next review runs.

---

## 16. Open Questions

Questions this document deliberately does not answer, because answering them by assertion
would be worse than leaving them open.

**OQ-1 · Authored-strategy coverage economics.** TQ-1's funnel step S1 (authored override)
produces the best selections and exists for a minority of concepts. Reaching meaningful
coverage across ~1,756 concepts at the corpus's established quality bar is a multi-year
authoring effort. Is the correct answer to author more, to make generic defaults good enough
that authoring is a refinement rather than a requirement, or to accept permanently uneven
coverage and route authoring by graph centrality? *This is a resourcing decision, not an
architectural one.*

**OQ-2 · Archetype granularity.** Nine archetypes may be too coarse for domains with
distinctive pedagogies (early literacy and proof-based mathematics have almost nothing in
common). Sub-archetypes per subject, or a flat larger set? Resolvable only against real
selection data — deferred to post-Stage-1.

**OQ-3 · RESOLVED in v1.1.0 — retained as a closed record, not an open question.**
The question was whether the axes' non-orthogonality made `D = 1` unachievable. Review
established that it did, and worse than suspected: the flat count forbade the corpus's own
escalation ladder at three of four rungs. Resolved by the primary-axis-plus-closure model
(§7.4.2), which was one of the two candidate resolutions named here. The residual risk it
creates — over-permissive closure — is now tracked as R4b rather than as an open question,
because it is a known failure mode with a stated mitigation rather than an undecided design.

**OQ-4 · Refinement/re-teach boundary.** §7.6 requires distinguishing partial understanding
from failure. On thin evidence — a single ambiguous response — that distinction may not be
reliably computable. What is the correct default when the classifier is uncertain? Defaulting
to refinement risks under-teaching; defaulting to re-teach risks discarding real progress.
Provisional lean: refinement, because its failure is recoverable in one turn and re-teaching's
failure costs the learner's sense that progress registered — but this is a lean, not a
decision.

**OQ-5 · Gold Standard threshold calibration.** The 3.0 mean / 2.0 floor threshold is a
reasoned starting point, not an empirical one. It must be calibrated against Tier C outcomes
once the join exists, and it should be expected to move.

**OQ-6 · Verbatim capture governance for minors — architecturally resolved, owner confirmation
outstanding.** Promoted from provisional in v1.1.0. **The architectural answer is settled:
verbatim capture is SEVERABLE.** Every axis in the AttemptVector is structural — an enum over
channel, method, representation, concreteness, entry point, granularity and agency — and none
carries learner language. TQ-4 therefore functions completely without verbatim capture, and
Stage 1 has no dependency on it. What remains is not an architecture question but a policy
one: whether the *misconception evidence model* may retain verbatim phrases for learners in a
protected rights class, which costs exactly one Tier B indicator (§10.2, now marked contingent)
and nothing else. **Owner decision, not an architectural unknown.**

**OQ-7 · REMOVED — promoted to risk R12.** Multi-concept strategy interference is a plausible
degradation with no mitigation, not an unanswered design question. It belongs in the risk
register where it is tracked and measured, and leaving it filed as an open question understated
it.

**OQ-8 · Where the human belongs.** `C-41` gives a teacher an override channel. Should a
human teacher be able to *set* a strategy archetype for a learner, and if so, does that
override survive an abandonment condition firing? A human's judgement is high-weight
evidence, but a strategy failing its own pre-declared exit conditions is exactly the
situation where evidence should win. Unresolved.

**OQ-9 · Does closure belong to the axis set or to the method library?** New in v1.1.0, arising
directly from the correction. The dependency matrix (§7.4.3) is currently a property of the
axis set — one matrix for all concepts. But forcing may be domain-specific: changing
representation in early literacy may force a channel change that the same move in algebra does
not. A per-domain matrix would be more accurate and would multiply the review surface by the
number of domains. Insufficient evidence to choose; the single global matrix is the deliberate
starting point because it is reviewable, and per-domain variants should be introduced only where
data shows a global entry is wrong.

---

## Appendix A — Glossary of Phase 1 terms

| Term | Definition |
|---|---|
| **Campaign** | All teaching of one concept for one learner under **one strategy attempt**. Spans turns and sessions. The scale Phase 1 introduces. A second attempt at the same concept — after abandonment — is a **new campaign** with a new arc and a new `attemptOrdinal`; it is never a continuation of the first. |
| **Primary axis** | The single axis a re-teach intentionally changes, selected by diagnosis (§7.4.2). |
| **Closure** | The total, pure function returning the axis changes *forced* by a primary-axis change (§7.4.2). |
| **Teaching Strategy** | A named, committed, multi-turn approach to one concept (TQ-1). |
| **Archetype** | One of nine enumerated strategy shapes (§4.4). |
| **Concept Lesson Arc** | The phase graph a strategy takes (TQ-2); a view over `C-29` states, not a state machine. |
| **Phase** | One of nine pedagogical stages with an entry condition and exit evidence (§5.2). |
| **Method** | A multi-turn teaching technique with preconditions, internal beats, and a failure signature (TQ-3). |
| **Action** | One move from the existing 27-item catalogue. Methods compose actions. |
| **Attempt Vector** | A teaching attempt's position on the seven axes (§7.4.1). Structural only — carries no learner language, which is what makes verbatim capture severable (OQ-6). |
| **Difference Operator** | The re-teach legality rule: one declared primary axis, changed, plus its closure (§7.4.2). An attempt identical to the failed one is paraphrase and is illegal. |
| **Provisional / Final closure** | The two points at which a trajectory becomes scoreable (§8.1.1). |
| **Refinement** | Narrowing to a failing sub-claim while holding representation constant. Not a re-teach (§7.6). |
| **Trajectory** | The complete record of one concept-attempt; TQ-5's unit of evaluation. |
| **Structural criterion** | A criterion a conforming implementation cannot violate. |
| **Measured criterion** | A criterion detectable only after the fact. |

## Appendix B — Compliance statement

This document was produced under the repository's Chief Architect governance rules. It reads
and reuses the existing corpus; it introduces no parallel pipeline; it modifies no runtime,
route, schema, API, curriculum file, Knowledge Graph, or existing `educational-brain/`
document; it implements nothing; and it requests no implementation approval. Where it finds
an existing component insufficient for a Phase 1 deliverable, it says so explicitly and adds a
layer above it rather than redefining it. Where it finds an existing component *defective*, it
records Curriculum Feedback (Appendix D) rather than editing another owner's file.

---

## Appendix C — Review response (v1.0.0-draft → v1.1.0)

Architecture review R1 returned **DO NOT APPROVE** against v1.0.0-draft with five critical
findings, thirteen important improvements, seven nice-to-haves, and twenty-five required
modifications R1–R25. This appendix records the disposition of every item. Nothing was silently
ignored; two items were modified rather than accepted as written, and the rationale is given.

### C.1 Critical findings

| Finding | Disposition | Where |
|---|---|---|
| **CRIT-1** `D = 1` makes the corpus's own escalation ladder illegal (rungs at D=3–4) | **ACCEPTED IN FULL.** The flat count is removed and replaced with primary-axis + closure. The finding was correct and the defect was more serious than an open question: the operator contradicted the ladder it claimed to formalize. | §7.4 (rewritten), §7.4.5 |
| **CRIT-2** ADR 09 under-reconciled; two arc pointers | **ACCEPTED IN FULL**, in the owner's preferred direction: TQ-2 **is** ADR 09 generalized. Vocabulary, snapshot key, `planSignature`, and the `replan` event are reused rather than reinvented. ADR 09 is *extended*, not superseded. | §0 (row 2b), §5.7 (RC-1…RC-5) |
| **CRIT-3** Knowledge type depends on data that does not exist; taxonomy mixes concept and learner categories | **ACCEPTED IN FULL.** Knowledge type marked REQUIRED-BUT-ABSENT with S2 going inert; `live misconception` removed from the concept taxonomy and re-sited as learner state. | §3.4, §3.4.1, §3.4.2, §4.5 S2/S3, §6.2 |
| **CRIT-4** "No second state machine" false; synchronization undefined | **ACCEPTED IN FULL.** Three lifecycles enumerated, six precedence rules, legal-combination table with a totality requirement, wording corrected in all three places. | §5.0, §0, §1.3, §3.3, §5.1 |
| **CRIT-5** No trajectory closure definition; REVISION makes lessons unscoreable | **ACCEPTED IN FULL.** Provisional and final closure defined; REVISION reworded from "never skippable" to "never omitted from the plan." | §8.1.1, §5.2, §5.0 SYNC-5 |

### C.2 Required modifications R1–R25

| # | Disposition | Section(s) | Note |
|---|---|---|---|
| R1 | Accepted | §7.4.2, §7.4.3 | Primary axis + closure + published dependency matrix |
| R2 | Accepted | §7.5, §7.8, §7.10, §7.11, §7.12, §11.3, §12 R4, §13 T3, §14.3 | Full propagation |
| R3 | Accepted | §16 OQ-3 | Retained as a *closed record* rather than deleted, so the reasoning survives |
| R4 | Accepted | §0 | ADR 09 row added; recorded as extended, not superseded |
| R5 | Accepted | §5.7 | Five explicit reuse commitments |
| R6 | Accepted | §3.4 | Eleven-field dependency table |
| R7 | Accepted | §3.4.1, §4.5 S2 | Inert, deliberately not heuristic |
| R8 | Accepted | §0, §3.4.2, §4.5 S3, §6.2, §6.4 M14, §6.3 M2 | Plus Curriculum Feedback, Appendix D |
| R9 | Accepted | §5.0 | SYNC-1…SYNC-6 + legal-combination table |
| R10 | Accepted | §0, §1.3, §3.3, §5.1 | "No second authority for advancement" |
| R11 | Accepted | §8.1.1 | Two scores, never averaged |
| R12 | Accepted | §5.2 | Plus new gate G11 (REVISION *scheduled*) |
| R13 | Accepted | §8.4 | Instrument column; S2/S5 NYS and excluded from the mean |
| R14 | Accepted | §8.3 | Closed reason-code sets for G7 and G8 |
| R15 | Accepted | §4.5 S7(b), §4.9 | Containment invariant + empty-intersection behaviour |
| R16 | Accepted | §0, §4.1 | Explicit ownership transfer from `C-30` |
| R17 | Accepted | §11.2, §14.2 | Resolved as **capture**, and therefore G2-gated |
| R18 | Accepted | §7.6, §7.7 | 2 narrowing passes; probes count against G6 |
| R19 | Accepted | §4.4 | Admissibility rule + both pair audits; produced the new A3/A8 domain rule |
| R20 | Accepted | §4.3 (V-1…V-3) | Versioning and evidence migration |
| R21 | Accepted | §12 R8 | Compaction to distinct-vector-set + counts |
| R22 | Accepted | §9.3 Q1 | AT-1 minimum dwell, AT-2 prerequisite exception |
| R23 | Accepted | §11.3 | `requiredEvidence[]` removed from `ArcConstraint` |
| R24 | Accepted | §10.1, §10.2 | Explicit boundary statement; Tier B indicator marked contingent |
| R25 | Accepted | §15 | A10 → PARTIAL; A15–A18 added, A18 owner-marked only |

**Nice-to-haves:** NTH-1 accepted (§5.2, new law L0); NTH-2 accepted with a deliberately narrow
carve-out (§6.3 M8); NTH-3 accepted (§5.3); NTH-4 accepted (§8.4 S4 anchor); NTH-5 accepted
(§16 OQ-7 → §12 R12); NTH-6 accepted (Appendix A); NTH-7 accepted (§16 OQ-6 promoted).

### C.3 Items modified rather than accepted as written

Two, both recorded so the divergence is visible rather than buried.

**R3 — modified.** The review asked that OQ-3 be *deleted*. It is instead retained as an
explicitly closed record. Deleting it would erase the reasoning that produced the v1.1
correction, and a future reader encountering the closure model would have no record of what it
replaced or why. The substance of the instruction — OQ-3 must not remain an open question — is
satisfied.

**NTH-2 — modified.** The review asked for an arbitrary-convention carve-out to M8's
prohibition. Accepted, but narrowed: the carve-out requires an explicit
`arbitrary-convention` tag on the concept, and the tag requires that *no* derivation or reason
for the convention exists. Without that gate the carve-out would swallow the rule — "the
learner finds it hard" would become sufficient grounds for a mnemonic, which is exactly the
substitution-for-understanding failure M8's prohibition exists to prevent.

### C.4 Nothing rejected

No review item was rejected. Two were modified as above; twenty-three of twenty-five required
modifications plus all five critical findings and all thirteen important improvements were
accepted as written.

### C.5 New risk introduced by this revision

The correction is not free. Replacing a flat threshold with a dependency matrix moves the
failure mode from *too strict* to *possibly too permissive*: an entry marked as forcing when it
is not turns L3 from a constraint into a licence. This is tracked as **R4b** and is now the
operator's principal risk. It is a better risk than the one it replaces — an over-permissive
constraint is measurable via mean closure size, whereas the v1.0 defect made correct teaching
illegal — but it is a real cost of the fix and is recorded as such.

---

## Appendix D — Curriculum Feedback

Findings about files this document does not own. Recorded, not fixed — editing another
authority's file is what the governance rules forbid.

**CF-1 · `educational-brain/decision-engine/04` Filter 2 taxonomy conflates two kinds of
category.** Five of its six knowledge types are concept-intrinsic; `live misconception` is a
property of a learner-concept pair. Filtering concept-intrinsic fit by a learner-state category
produces incoherent selection. This document uses the five-member concept-intrinsic set and
re-sites the sixth as learner state (§3.4.2). Recommendation to that file's owner: split the
row explicitly rather than leaving the two mixed.

**CF-2 · No knowledge-type field exists on the canonical Knowledge Graph.** Filter 2's taxonomy
has no data behind it; the runtime's `inferConceptType(bloom)` yields a three-value proxy over
a different construct (cognitive demand, not kind-of-knowledge). Any component filtering by
knowledge type is inert today (§3.4.1). Recommendation to the Curriculum Production Pipeline:
consider a knowledge-type field in a future canonical KG schema version. **G1-gated; not
requested by this document.**

**CF-3 · The voice instrument loss recorded in `foundations/03 §7` has a measurable
consequence.** Two Gold Standard dimensions (S2, S5) and two re-teach triggers (T9, T10) are
unavailable because timing and prosody are discarded at the transcription boundary. This
document does not propose a fix — that is runtime work — but it does now quantify what the
loss costs downstream (§3.4, §8.4).
