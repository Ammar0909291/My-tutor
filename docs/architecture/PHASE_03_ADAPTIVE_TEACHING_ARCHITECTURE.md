# Phase 3 — Adaptive Teaching Architecture

**Document class:** Architecture blueprint. Design only.
**Status:** DRAFT — **READY FOR INDEPENDENT MERGE-GATE REVIEW** is declared in §29 and nowhere
else. Not canonical. Not approved. Not self-certified (Phase 1 §18).
**Version:** 3.1.0-draft (supersedes 3.0.0-draft; Appendix E is the change log)

> **Revision note (v3.1.0).** A merge-gate review returned DO NOT APPROVE on three blocking
> issues: an incomplete repository inventory (B1), an unexamined implemented control layer in
> `src/lib/kernel/` and `src/lib/eos-runtime/` (B2), and a route by which a dial move could
> bypass Phase 1's re-teach budget (B3). **No component was redesigned.** AT-1…AT-14 keep their
> responsibilities, their dials, their rules and their contracts. What changed is verification and
> placement: §0.1 now classifies every architecture authority including the authority index
> itself; §0.6 records the authority ladder Phase 3 sits under and reconciles a band-numbering
> divergence the first draft did not notice; §0.7 reconciles the four runtime subsystems B2 named,
> and finds **reuse in five of six cases and one duplication, eliminated by placement**; and §9.4a
> closes the budget hole while §16.1 narrows the missing-rung claim from six dials to four, which
> is what the evidence supports. The single largest consequence of B2 is that D4 and D5 turn out
> to be **existing normative BrainConfig budget keys with a live implementation**, which makes
> them reuse rather than invention and shrinks this phase's novelty claim accordingly.
**Owner:** Pappu (Chief Architect track)
**Phase:** 03 of the phased architecture program (`architecture/phase-03-adaptive-teaching`)
**Builds on:** Phase 1 Teaching Quality Architecture v1.2.0 (CANONICAL) and Phase 2 Visual
Intelligence Architecture v2.1.0 (CANONICAL) — **extended, never modified**
**Normative language:** RFC 2119 (MUST / MUST NOT / SHOULD / MAY).

**Governance compliance.** This document writes no code and modifies no runtime, route, schema,
API, prompt, database, UI, component, curriculum file, Knowledge Graph, or `educational-brain/`
file. It contains no pseudocode and no implementation plan. It modifies no Phase 1 or Phase 2
content. It introduces no competing decision authority, no second state machine, no parallel
pipeline, and no new asset class. Implementation of everything described here remains gated on
G1 (Canonical KG v1 freeze) and G2 (explicit per-item owner approval). Nothing here constitutes
a request for implementation approval.

---

## Table of Contents

0. [Reconciliation Map](#0-reconciliation-map) — §0.1 inventory · §0.2 the canonical adaptation stack · §0.3 ownership boundary and handoffs · §0.4 contradictions between reused authorities · §0.5 the brief's scope items, mapped · **§0.6 authority-ladder compliance and the band-numbering reconciliation** *(new in v3.1.0)* · **§0.7 runtime control-layer reconciliation** *(new in v3.1.0)*
1. [Executive Summary](#1-executive-summary)
2. [Design Principles](#2-design-principles)
3. [System Overview and Layer Model](#3-system-overview-and-layer-model)
4. [AT-1 · The Adaptive Control Loop](#4-at-1--the-adaptive-control-loop)
5. [AT-2 · The Adaptation State Vector](#5-at-2--the-adaptation-state-vector)
6. [AT-3 · The Adaptive Posture Engine](#6-at-3--the-adaptive-posture-engine)
7. [AT-4 · The Pressure Model](#7-at-4--the-pressure-model)
8. [AT-5 · The Adaptation Arbiter](#8-at-5--the-adaptation-arbiter)
9. [AT-6 · The Stability Governor](#9-at-6--the-stability-governor)
10. [AT-7 · Scaffolding Architecture](#10-at-7--scaffolding-architecture)
11. [AT-8 · Hint Architecture](#11-at-8--hint-architecture)
12. [AT-9 · Pace Adaptation](#12-at-9--pace-adaptation)
13. [AT-10 · Difficulty Adaptation](#13-at-10--difficulty-adaptation)
14. [AT-11 · Cognitive Load Adaptation](#14-at-11--cognitive-load-adaptation)
15. [AT-12 · Misconception and Confusion Response](#15-at-12--misconception-and-confusion-response)
16. [AT-13 · The Adaptation Escalation Order](#16-at-13--the-adaptation-escalation-order)
17. [AT-14 · Campaign Adaptation](#17-at-14--campaign-adaptation)
18. [Adaptive Decision Inputs, Outputs and Constraints](#18-adaptive-decision-inputs-outputs-and-constraints)
19. [Adaptive Governance](#19-adaptive-governance)
20. [Adaptive Metrics](#20-adaptive-metrics)
21. [Failure Modes and Fallback Architecture](#21-failure-modes-and-fallback-architecture)
22. [Extensibility and Scalability](#22-extensibility-and-scalability)
23. [Risks](#23-risks)
24. [Trade-offs](#24-trade-offs)
25. [Future Implementation Guidance](#25-future-implementation-guidance)
26. [Acceptance Criteria](#26-acceptance-criteria)
27. [Open Questions](#27-open-questions)
28. [Reconciliation Procedure Execution Record](#28-reconciliation-procedure-execution-record)
29. [Merge Requirements](#29-merge-requirements)

Appendices: A Glossary · B Compliance statement · C Feedback to other owners · D Explicit deferrals · **E Change log v3.0.0-draft → v3.1.0-draft** *(new)*

---

## 0. Reconciliation Map

Phase 1 §17 is binding. Its seven-step procedure was executed **before** any design work; §28 is
the execution record and this section is its output. The procedure changed the shape of Phase 3
twice: once when the live posture selector was found (§0.2), and once when the scaffold and hint
dials turned out to already exist in three vocabularies across four documents (§0.4).

The adaptive territory is the second-most crowded in the repository after the visual one, and it
is crowded in a more dangerous way: the existing authorities are **charters without instruments**.
`C-32 Struggle Controller` is given the entire difficulty control loop in one paragraph, with no
definition of what a scaffolding level is, what a hint rung is, or what makes an adjustment legal.
A Phase 3 that read that paragraph as "unowned" would have duplicated a charter; a Phase 3 that
read it as "owned" would have designed nothing. Both readings are wrong, and §0.2 states the line.

### 0.1 Repository-wide inventory

Every architecture authority touching adaptive teaching. Verdicts follow Phase 1 §17 STEP 4:
**Reused** (consumed as-is) · **Extended** (built on, with the extension stated) · **Complemented**
(adjacent, no overlap) · **Superseded** (replaced) · **Independent** · **N/A** (not an architecture
authority). Produced from a directory listing, not from memory — see §28.

**A. The two canonical phases**

| Authority | What it owns | Verdict | Rationale |
|---|---|---|---|
| **Phase 1 §4 TQ-1 Teaching Strategy Engine** | Archetype selection, strategy commitment, holding, abandonment conditions | **Reused — binding** | Phase 3 selects no archetype and abandons no strategy. It adapts **inside** a committed strategy and *recommends* abandonment when adaptation is exhausted (§17). |
| **Phase 1 §5 TQ-2 Pedagogical Planner** | The nine-phase arc, phase entry/exit, arc resumption, SYNC-1…SYNC-6 | **Reused — binding** | Phase 3 advances no phase and certifies no evidence. Dial state is *scoped by* arc phase (§9 SG-6) and is not a second phase pointer. |
| **Phase 1 §6 TQ-3 Teaching Method Library** | 17 methods; preconditions, prohibitions, shapes, failure signatures, repair ladders, `degradedForm` | **Reused** | The fade schedule in M11, the load bound in M6, the wait rule in M4 are method-internal quality contracts. Phase 3 supplies the standing dial values those contracts are evaluated against; it edits no method. |
| **Phase 1 §7 TQ-4 Adaptive Re-teaching** | Trigger taxonomy T1–T11, the six-cause diagnosis, the eight-axis Difference Operator, `closure()`, the failed-attempt set, re-teach budgets, the refinement protocol | **Extended, with an explicit boundary** | **The most important reconciliation in this document.** TQ-4 owns *what a different attempt is*. Phase 3 owns *how much support that attempt carries*. Three of Phase 3's six dials have per-attempt projections in TQ-4's axis set; the projection rules are stated in §5.4 and neither authority is weakened. Phase 3 defines **no second difference rule**. |
| **Phase 1 §9 TQ-6 Teacher Decision Flow** | The unified turn flow; three constraint sources at `C-28` Band 2; the eight questions | **Extended** | Phase 3 adds **one** further Band-2 constraint source and **one** Band-5 personalization supply (band numbering per EOS v2, which owns band semantics — §0.6.2). It adds no band, no authority, and no question. |
| **Phase 1 §10 TQ-7 Teaching Quality Metrics** | Process metrics, the four tiers, the counter-metrics, the OSF boundary | **Extended** | §20's adaptive metrics are Tier A process metrics and Tier D attribution inputs. Phase 3 defines **no outcome metric** and makes no learning claim. Two of TQ-7's counter-metrics (hint-take rate, success near 100%) are adaptive counter-metrics and are reused verbatim, not restated as new. |
| **Phase 2 §4 VD-1 / §5 VD-2 / §10 VD-7** | Whether a visual appears, its purpose, the fallback ladder | **Complemented** | Modality is a channel decision Phase 2 and Phase 1 axis 1 already own. Phase 3's dials do not include modality — see §5.3's exclusion list. Where load pressure implicates a channel change, Phase 3 emits pressure and Phase 1/Phase 2 decide. |
| **Phase 2 §9.2 mastery gates / withdrawal probes** | Unaided-assessment invalidation by a supporting visual | **Reused — and generalized in one direction only** | The principle *support present during an unaided item invalidates the evidence* is Phase 2's, stated for visuals. §9 SG-6 applies the same principle to scaffold and hint dials. This is reuse of a rule, not a new rule; §10.5 and §11.6 cite Phase 2 as its origin. |

**B. EOS — the charter layer**

| Authority | What it owns | Verdict | Rationale |
|---|---|---|---|
| **`eos-v3/04` C-32 Struggle Controller** | *"Estimate current success rate over a rolling window; hold the target band…; adjust difficulty, hint availability, and scaffolding to steer toward it; enforce hint discipline…; own the answer-withholding policy…; hard-stop on affect signals."* Outputs: difficulty target, hint policy, scaffolding level, withholding decisions | **Extended — this is the primary integration surface** | C-32 is the **owner of the control loop and its objective**. It names four outputs and defines none of them. Phase 3 supplies the instrument: the typed dial set (§5), the legality of an adjustment (§8, §9), and the ladders behind "hint availability" and "scaffolding level" (§10, §11). **C-32 keeps the loop, the objective and the veto.** Phase 3 never sets the target band and never overrides the affect hard-stop. **Ownership transfer, stated precisely (corrected v3.1.0 — improvement I1):** `C-32`'s charter says it *"adjust[s] difficulty, hint availability, and scaffolding"*; §3.4 assigns the *how much support, right now* decision to AT-2/AT-7/AT-8. **That is a transfer of the adjustment decision**, not merely the gift of an instrument, and AH-1 is its record. v3.0.0-draft's summary line ("loses no responsibility") contradicted AH-1 and is withdrawn. What `C-32` retains is the objective (the target band), the withholding policy, and the absolute affect veto — which is the part that must not move, and does not. |
| **`eos-v3/04` C-28 Decision Kernel** | Band order; the legal action set; totality of its decision matrix | **Reused — binding** | Phase 3 publishes constraints into **Band 2** (subtractive legality) and parameters into **Band 5** (personalization) — EOS v2 numbering, corrected in v3.1.0 from v3.0.0-draft's "Band 3", which is `C-30` selection and is forbidden to Phase 3 (§0.6.2). It decides nothing at Band 0/1 and preempts nothing. |
| **`eos-v3/04` C-29 Teaching State Machine** | Teaching states; **sole authority on advancement** | **Reused — binding** | No dial value advances, blocks or reverses a state. A fully-faded scaffold is not mastery evidence; `C-29` decides on evidence, unchanged (Phase 1 SYNC-1/SYNC-3 apply to Phase 3 verbatim). |
| **`eos-v3/04` C-30 Action Selector** | Per-turn action choice within the legal set | **Reused** | Phase 3 selects no action. Dials narrow and parameterize; `C-30` still chooses. |
| **`eos-v3/04` C-31 Recovery Engine** | Failure-state detection, recovery protocols, the recovery escalation ladder, the exit rule | **Reused — binding, preemptive** | Recovery **preempts** adaptation entirely (§8 AR-1). Phase 3 has no distress path of its own; adding one would be a second recovery authority. On recovery exit, §9 SG-8 mirrors `C-31`'s own "one rung below entry, never at zero" for the dials. |
| **`eos-v3/04` C-33 Session Planner** | Session shape, attention budget, the protected close, compaction | **Reused** | Session-scale pacing (how much of today's budget goes where) is `C-33`'s. Phase 3's PACE dial is turn-scale (§12.1 draws the line explicitly). |
| **`eos-v3/04` C-19 / `03-LEARNER.md`** | Affect estimation, persistence profile, recovery profile | **Reused** | Phase 3 estimates no affect. It consumes affect as a pressure with absolute priority. |
| **`eos-v3/04` C-43 (experimentation slice)** | The exploration budget reserved in selection tie-breaks | **Complemented** | Dial policy is a legitimate experiment surface; Phase 3 reserves no exploration slice of its own and defers to `C-43`. |
| **`eos-v3/05`, `eos-v3/06`** | Improvement loops; counterfactual/regret analysis | **Complemented** | §20's adjustment records are inputs to both. `alternativesRejected[]`'s Phase 3 analogue is the *rejected pressure* field (§7.4), for the same counterfactual reason. |
| **`EOS_V2_RUNTIME_SPECIFICATION.md` §3.4** | `TeachingState.scaffoldDial: 0–4 (0=full worked, 4=solo)`, **GUIDED-only, state-scoped, reset on transition**; `AnswerObserved.scaffoldLevel: 0–4` and `hintDebt: int` | **Extended — and this is the reuse that prevented an invention** | A scaffold dial **already exists** with a 0–4 scale and stated endpoints. Phase 3 adopts that scale and those endpoints verbatim (§10.2). Its extension is exactly two things: the dial persists **beyond GUIDED and across sessions**, and its movement acquires legality rules. This is structurally the same move TQ-2 made on ADR 09 — adopt the existing object's vocabulary and generalize its scope — and it is made for the same reason. |
| **`EOS_V2_RUNTIME_SPECIFICATION.md` §5.2** | Six-band policy evaluation order; Band 5 personalization *"MAY set representation/anchor/**pace** fields; MUST NOT alter move, stageCeiling, budgets, or legality outcomes"* | **Reused — binding** | An existing rule already forbids the personalization band from altering budgets or legality. Phase 3's narrowing-only contract (§18.3) is that rule restated at its own layer, not a new one. **The word `pace` already appears in a band definition** and is therefore not a term Phase 3 coins. |
| **`EOS_V2_ARCHITECTURE.md`** | The expertise-reversal note (*"scaffold dial tied inversely to Knowledge rung"*); the five-band policy engine | **Reused** | §10.6's expertise-reversal rule is this note promoted to a legality constraint, credited here rather than presented as new. |
| **`EOS_IMPLEMENTATION_MASTERPLAN.md`** | Implementation sequencing | **Complemented** | §25's stages sequence *into* it, never alongside it. |

**C. The primitive / composition stack**

| Authority | What it owns | Verdict | Rationale |
|---|---|---|---|
| **`EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` (FINAL)** | 91 primitives, 8 categories, the composition grammar, the atomicity test. **Category F — REGULATION** is described verbatim as *"manages the process of the session — pacing, load, feedback, metacognition. **The control plane.**"* and contains **P81 SCAFFOLDING, P82 FADING, P83 INTERLEAVING CONTROL, P84 LOAD MANAGEMENT, P85 PACING CONTROL, P86 MODALITY SWITCHING** | **Reused — binding, and the grounding of this entire phase** | **The single most important finding of this reconciliation.** The control plane is not missing from the repository; it exists as six frozen primitives, and it has no layer above it. Phase 3's dials are not invented categories — each is the standing parameter that one Category-F primitive sets (§5.2 carries the one-to-one map). Phase 3 authors **no primitive**, renames none, and adds none. |
| **`TEACHING_PRIMITIVE_ARCHITECTURE.md` Part 8** | The eight-layer Teaching OS stack, including **"LAYER 5 — ADAPTIVE LESSON ORCHESTRATOR: monitors execution, fires adaptation rules… Output: next primitive to execute, next Teaching Action, protocol switches"** | **Extended** | Phase 1 §0.1 recorded that TQ-1/TQ-2/TQ-4 occupy Layer 5. That is true of Layer 5's *sequencing* half — which approach, which phase, which re-teach. Layer 5's other half, the one its own text calls *"fires adaptation rules"*, has no specification anywhere. **Phase 3 is the specification of that half.** Layer 5 is therefore jointly held by Phase 1 and Phase 3 along a stated seam (§3.2), not by Phase 3 alone. |
| **`docs/curriculum/PRIMITIVE_LIBRARY.md` (ACTIVE)** | The authored primitive library, incl. **P11 PARTIAL WORKED EXAMPLE** and **P12 FADED WORKED EXAMPLE** (a named compound of P10 + P82) | **Reused** | P11/P12 are the authored scaffold rungs at the primitive layer. §10.2's ladder is checked against them for consistency and adds no primitive. |
| **`docs/curriculum/protocols/*` (ACTIVE, 1 reference implementation)** | Per-concept authored Protocols with entry conditions, exit conditions, escalation, and the S0–S9 diagnostic state map | **Reused** | Phase 1 established Protocol ≡ Strategy. Where an authored Protocol declares its own escalation, **it wins** over generic dial policy exactly as it wins over generic archetype selection (§19.2). Phase 3 authors no Protocol. |
| **`TEACHING_COMPOSITION_GRAMMAR.md`, `TEACHING_BLUEPRINT_SPECIFICATION.md`** | Composition grammar; the per-concept blueprint contract | **Reused** | Dial constraints that are concept-intrinsic (a concept whose minimum viable step size is large) belong in the blueprint, authored by the existing contract. Phase 3 proposes no new blueprint field it authors itself; where one is needed it is recorded as feedback (Appendix C). |
| **`KG_CONCEPT_GRANULARITY_STANDARD.md`** | Concept granularity; the explicit statement that *"a lesson is a **pacing** decision"* kept at a different layer from the KG node | **Reused — binding** | KGCS already separates pacing from concept grain and assigns pacing to the composition layer. §12 respects that split and does not re-open it. |
| **`CEKR_CANONICAL_EDUCATIONAL_KNOWLEDGE_REPRESENTATION.md`** | `HintSpec` — *"ladder-typed hint content with easier-than metadata"*; `REQUIRES_CAPABILITY`; `HINTS_FOR`; `MasteryCondition {… hintDebt: 0}`; validator **V-9** hint easier-than consistency | **Reused — binding** | **The hint ladder is already a typed, authored knowledge object with a stated invariant and a validator.** Phase 3 defines no hint content type, no ladder schema, and no easier-than rule. It defines only *which rung is granted now and why* (§11). `MasteryCondition.hintDebt: 0` is an existing rule Phase 3 obeys and does not restate as its own. |
| **`EDUCATIONAL_BRAIN_COMPILER.md`** | `HintDef {id, targetRef, ladderType, stage, requiresCapabilities[]}`; **compile-time proofs E0401** (`hint.stage ≤ target.stage − 1`) and **E0402** (`hint.requiresCapabilities ⊆ target.requiresCapabilities`); coverage lint E0507 | **Reused — binding** | The easier-than law is already **unviolatable by construction** because violating hints never reach the pack. §11.3's grant rules are downstream of a guarantee that already exists. Phase 3 adds no compile-time check and no error code. |
| **`EDUCATIONAL_BRAIN_AUTHORING_SDK.md`** | The authoring ecosystem; the *hint preview* tool with its easier-than proof | **Complemented** | Any authorable object Phase 3 needs is an SDK concern; §22.3 records it as a handoff rather than designing it. |
| **`CAPABILITY_MODEL_DESIGN.md`** | *"Hint policy 'if they cannot do the calculation, teach' → deterministic: hint generator checks required capabilities before hinting toward any step"* | **Reused** | The capability precondition on a hint already exists and is deterministic. §11.3 HL-2 cites it rather than re-deriving it. |

**D. ADRs**

| ADR | Verdict | Rationale |
|---|---|---|
| ADR 02 General Learner Diagnostic Layer | **Extended** | It records that the 7-type teaching strategy and its `[HINT]` bias run for **both** School and Library sessions, and that the `[HINT]` instruction text is duplicated across the two branches. §6 builds on the first fact; the second is existing recorded debt Phase 3 does not touch. |
| ADR 03 · ADR 04 | **Independent** | Retirement decisions; Phase 3 resurrects nothing. |
| ADR 05 · ADR 06 | **Complemented** | Phase 3 requests no new KG field. Concept-intrinsic dial bounds are recorded as feedback (AF-7), G1-gated. |
| ADR 07 Mastery Intelligence | **Reused** | `MasteryLevel` is canonical and is an *input* to posture selection (§6.2). No dial classifies mastery. |
| **ADR 08 Teaching Action Intelligence** | **Extended** | ADR 08 owns the **Posture / Action** split that Phase 1 §0.2 preserved. Phase 3's posture layer (§6) is the Posture half of that split, given a home. `TeachingDecision` gains the ASV projection as a captured field — handoff AH-3. |
| ADR 09 Dynamic Lesson Composition | **Reused** | Already extended by TQ-2. Phase 3 introduces no stage concept and no second `planSignature`. Dial state is **not** carried in `lessonStageProgress` (§5.5). |
| **ADR 10 Student Memory** | **Extended** | The ASV is per-learner-per-concept standing state and belongs in an existing store, not a new one (§5.5). Its placement is the runtime owner's decision — handoff AH-2. ADR 10's existing *"New: pacing signals"* field group is the nearest existing home and is named as the candidate. |
| ADR 11 Recommendation Intelligence | **Complemented** | Cross-session planning; no dial interaction. |
| ADR 12 Visualization & Simulation | **Complemented** | Production tier. Phase 3 crosses no visual boundary; modality is excluded from the dial set (§5.3). |
| **ADR 13 Evidence Engine** | **Extended** | Evidence records must carry the support conditions under which they were produced, or they are uninterpretable (§10.5, §11.4). EOS v2's `AnswerObserved` already carries `scaffoldLevel` and `hintDebt`; making that true of ADR 13's canonical tables is handoff AH-9. Phase 3 defines **no evidence store**. |
| **ADR 14 Knowledge Asset Lifecycle** | **Reused** | `'hint_tier_1' \| 'hint_tier_2' \| 'hint_tier_3'` already exist as asset kinds. Phase 3 authors no asset and adds no kind; §11.2's ladder is reconciled against these three tiers in §0.4. |
| ADR 15 Rendered Reality Model | **Complemented** | Visual ground truth. No dial interaction. |

**E. The `educational-brain/` knowledge tree**

| Authority | Verdict | Rationale |
|---|---|---|
| **`foundations/02` — the D1 grid** (speed × correctness × confidence; the fluency gate; FRAGILE's three-part response; the three-representation escalation feed) | **Reused — binding** | The D1 grid **is** Phase 3's primary pressure source (§7.2). Phase 3 defines no response-diagnosis taxonomy. FRAGILE's *"hold, one more of the same, name the improvement"* is a dial instruction already authored, and §9 SG-6 protects it by freezing dials during a hold. |
| **`foundations/01` — Recovery Engine** · `foundations/03` — Voice-First Model (the **wait-time law**, the load-bearing-sentence rule) · `foundations/04` — 23 Universal Principles | **Reused — binding** | The wait-time law is a PACE constraint that already exists (§12.2). Principles 3, 7, 14, 20, 22 are cited by number where they constrain a dial; none is restated. |
| **`decision-engine/02` — Student State Engine** (affect / cognitive / drive / knowledge-trajectory states; **the priority ordering**; the detection-honesty rules) | **Reused — binding** | This is the repository's learner-state taxonomy and its priority order. §8's arbitration bands **are** this ordering; Phase 3 adds only the dial-level rules the ordering does not reach. Phase 3 defines no state. |
| **`decision-engine/03` — Decision Matrix** (the preemption rule; per-teaching-state × student-state decisions) | **Reused** | Where the matrix names a decision, it wins. Phase 3 supplies the *magnitude* of adjustments the matrix names qualitatively, never a different decision. |
| **`decision-engine/05` — Escalation Engine** (four ladders; the recovery-failure ladder; **the six standing moves** REPEAT / CHANGE REPRESENTATION / STEP BACK / STEP FORWARD / CHANGE MODALITY / CHANGE PREREQUISITE / END SESSION, each with triggers) | **Reused — binding** | The six standing moves are the authored move set. Three of them (STEP BACK, STEP FORWARD, CHANGE MODALITY) are dial moves under other names; §16.3 maps them one-to-one so no seventh move is invented. The *"one dimension changed per rung"* law is inherited, not restated. |
| **`decision-engine/07` — Lesson Planning Engine** §2 **continue / repeat / slow down**, §3 the **compaction protocol**, §5 **introducing challenge**, §8 session boundaries | **Reused — binding** | *"SLOW DOWN … Reduce ONE dimension — smaller numbers or fewer steps or recognition-instead-of-recall, never 'an easier topic' (audible demotion)"* is the one-dial law and the audible-demotion ban, both **already authored**. Phase 3 cites them as inherited law (§8 AR-2, §13.4) and claims neither as new. Compaction is the authored multi-step-jump exception (§9 SG-2). |
| **`decision-engine/01`, `/04`, `/06`, `/08`** | **Reused** | State machine, seven-filter selector, conversation registers, loop invariants. Phase 3 adds no filter and no register. |
| **`assessment/` (10 docs)**, esp. `/05` mastery gates + evidence hierarchy, `/09` failure taxonomy, `/02` binary-search diagnosis, `/06` modality | **Reused — binding** | The evidence hierarchy already ranks assisted below unassisted production; §10.5 and §11.4 are that hierarchy's dial-side consequence. Phase 3 defines no gate and no probe. |
| **`misconceptions/` — 6 birth types, the 7-step repair sequence** elicit→commit→collide→replace→contrast→apply→re-probe, burned collisions, metastasis chains | **Reused — binding** | §15.2's dial-freeze law exists *to protect this sequence* and adds nothing to it. Phase 3 authors no repair step. |
| **`student-state/` (10 docs)**, esp. `/04` confidence (build-slow/collapse-steep asymmetry, personalized affect budgets), `/05` behaviour (**persistence-scaled struggle budgets**, measured attention span), `/06` emotional (recovery speed, what-restores), `/09` trajectory (velocity, plateau diagnosis tree) | **Reused — binding** | Per-learner personalization of the target band and of dwell/rate limits reads these fields; Phase 3 stores none of them and computes none of them. §9's dwell constants are explicitly *personalized by* `/05`'s persistence scaling rather than defined as universals. |
| **`first-lesson/` (8 docs)** — the hard limits (1 concept, ≤3 new words × 3 uses, 2-sentence bursts, ≤6 questions, failure budget 1, WM treated as 2 slots) | **Reused — binding** | These are authored pace, load and difficulty **ceilings** for one situation. §21.3's lesson-one profile is a clamp that defers to them entirely; Phase 3 sets no lesson-one value of its own. |
| **`placement/` (8 docs)** — placement, category mastery, resumption, decay timeline, FORGOTTEN ≠ UNKNOWN | **Reused** | Placement sets the *entry* position; Phase 3 adapts from it. Re-placement is never a dial move (§17.4). |
| **`validation/`, `concepts/`, `teaching-actions/`** | **Reused** | Consumed as authored pedagogy; edited nowhere. |
| **`educational-brain/cognitive-load/`** | **ABSENT — cited across the tree, does not exist** | Delivery 2 §5's intrinsic/extraneous/germane theory was planned and never authored. §14 is written *around* this absence rather than filling it, because filling it would be Brain-tree authoring under an architecture document's cover. Recorded as AF-2. |

**F. Governance, contracts, process, and the frozen v1.0 corpus** *(added v3.1.0 — this entire section was absent from v3.0.0-draft and is blocking issue B1)*

v3.0.0-draft had sections A–F and **no equivalent of Phase 1 §0.1 E**. The documents that would have populated it were therefore unclassified, and the completeness statement's escape clause ("directly or by the category rows above") was empty because no category row covered them. Every one now carries exactly one verdict. Where a document has no adaptive relevance that is **stated as the finding**, not left implied.

| Document | Verdict | Rationale / adaptive relevance |
|---|---|---|
| **`README.md` — the Architecture Authority Index** | **Reused — and binding on this document** | **The most consequential omission of v3.0.0-draft.** It answers "when two documents here disagree, which one wins?" and publishes an authority ladder in which every phase document, including this one, sits at row 6 ("Everything else … Advisory"). It also names two code files as sole owners of decisions Phase 3 touches. Full treatment in **§0.6**. |
| **`EDUCATIONAL_BRAIN_BIBLE.md`** | **Extended** | LIVING; the pre-EOS single source of truth (authority ladder row 5). Read in substance for this revision: its §3 engine map and §6 flow sections were checked for adaptive overlap. Three engines touch dial territory and are reconciled in §0.7 (Engine 15 Teaching Strategy Orchestrator, Engine 16 Teaching Output Bias, Engine 20 Strategy Effectiveness). **Bible primacy applies: where this document and the Bible disagree, the Bible wins until amended.** The Bible gains the Phase 3 pointer on approval — AH-7. |
| **`DEPENDENCY_RULES.md`** | **Reused — binding** | The 15 permanent rules. Checked against all 15 for this revision; compliance stated in §0.6.3. Rule 9 (one probabilistic component per turn) governs §4.4. Its Teaching Engine entry ("performs zero I/O and calls zero other engines") and its satellite-engine entry ("never called *by* the core teaching chain") both bear on Phase 3's dependency direction — resolved in §0.6.4. |
| **`ENGINE_REFERENCE.md`** | **Reused (and corrected)** | Frozen interface document. Engine 16 (Teaching Output Bias) is the AC-3 finding; Engine 17 (Teaching Style Detector) documents a file that **does not exist on disk** — a second documentation/reality divergence found in this revision (AF-10). Phase 3 redefines no engine interface. |
| **`DATA_FLOW.md`** | **Reused** | The code-grounded 65-step turn trace. Steps 17 and 55 place the `[HINT]` bias and tag parse in the flow; both resolve to the AC-3 stub. Phase 3 adds **no step** to this flow — the control loop occupies the existing policy stage (§0.7.1). |
| **`EDUCATIONAL_BRAIN_V1.md`** | **Reused** | FROZEN v1.0 architecture, consumed unchanged. No adaptive authority beyond what the Bible indexes. |
| **`EXTENSION_GUIDE.md`** | **Reused** | Its extension pattern — extend in place, never fork a parallel pipeline — is followed: every Phase 3 mechanism attaches to an existing band, store or engine rather than standing beside one. |
| **`ARCHITECTURE_DECISIONS.md`** | **Reused** | Findings register (Findings 8–10 consumed via Phase 1). Phase 3 adds no finding to another owner's file; its own findings are Appendix C feedback. |
| **`ARCHITECTURE_COMPLETION_REPORT_V1.md`** | **Reused** | The v1.0 completion record and five-wave sequence; §25's stages sequence into it. Contains no adaptive authority. |
| **`RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md`** | **Reused — binding** | CANONICAL interface. Every Phase 3 → runtime interface (§18) is expressed through it (AH-10). Its placement row records an existing "difficulty-floor default" behaviour that D3 must not contradict (§13.2). |
| **`WAVE_0_APPROVAL_CHECKLIST.md`** | **Extended** | The G2 instrument; §25's stages become checklist items (AH-8). Phase 3's merge adds none by itself. |
| **`VALIDATION_FRAMEWORK_P10.md`** | **Extended** | Owns the three test tiers, the LLM transcript seam and the frozen fixture set. **§22.4's replay and offline-evaluation claim belongs inside this framework, not beside it** — reconciled in §22.4. Phase 3 defines no parallel harness. |
| **`OUTCOME_SCIENCE_FRAMEWORK.md`** | **Complemented** | OSF owns outcome constructs, experimental design and causal attribution; §20 supplies process features only. Its `AnswerObserved (… × scaffold level × hint debt × stage)` row independently corroborates AP9. |
| **`MIGRATION_BLUEPRINT_V1.md`** | **Complemented** | The 7-phase runtime migration plan. §25's stages must be merged into one sequence with it at implementation planning — a handoff, not designed here. |
| **`ISS_01_LADDER_RECONCILIATION.md`** | **Reused — and it constrains §10.2 and §16** | **BLOCKED on a pedagogical decision; Phase 1 §0.1 E warned it "may affect TQ-2's rung semantics."** v3.0.0-draft never opened it. Read for this revision: it documents a **live 6-phase ladder** (`conversationState.ts` `PHASE_ORDER`, step-down computed as `phaseIndex − 1` floored) against the 10-state canonical TSM, with three defects including "mastery becomes unreachable." Consequences in §0.7.4. **Phase 3 must not be read as resolving ISS-01**, which remains the owner's decision. |
| **`ARCHITECTURE_ISSUE_REGISTER.md`** | **Reused** | EOS v2 issue register; its hint/analogy-discipline E-code overlap note is consistent with AC-2. Phase 3 adds no issue to another owner's register. |
| **`ARCHITECTURAL_ROOT_CAUSE_ANALYSIS.md`** | **Reused** | Root-cause findings for Tutor Max failure classes, consumed. **No adaptive authority** — checked, none found. |
| **`DEVELOPMENT_FLOW_DOCUMENT.md`** | **Reused** | Canonical project-standard flow; respected. **No adaptive authority.** |
| **`PROJECT_TASK_BREAKDOWN.md`** | **Complemented** | Execution roadmap; §25 must be reconciled into it, not run alongside it. |
| **`RUNTIME_MAINTENANCE_TRANSITION.md`** | **Reused** | The final planned runtime-architecture posture; respected. **No adaptive authority.** |
| **`MERGE_PLAN.md`** | **Independent** | Branch consolidation history. No architectural interaction. |
| **`ARCHITECTURAL_GOVERNANCE_REGISTRY.md`** | **Reused — binding** | The ownership instrument. v3.0.0-draft discussed it in §0.3 but gave it **no verdict row** — itself an instance of the anti-pattern it exists to prevent. Verdict recorded here; §0.3 is its output. |
| `ASSETIDENTITY_AUDIT.md` · `ENGINEERING_HANDOVER.md` · `ENGINEERING_RUNBOOK_BLOCKED_ITEMS.md` · `PHYSICS_FOUNDATION_MIGRATION_REPORT.md` | **N/A — not architecture authorities** | Operational records and audits. Each checked for adaptive authority; **none contains any.** Same basis as Phase 1 §0.1 F. |

**G. Live runtime code read for capability verification (read-only; the runtime owner's territory)**

*Expanded in v3.1.0. v3.0.0-draft listed only the first five rows, all under `src/lib/school/adaptive/` — a sample presented as a survey, which missed the largest candidate owner of the control plane (blocking issue B2). The four subsystems the review named are reconciled in full in **§0.7**; their verdicts are recorded here.*

| Artifact | Finding | Verdict |
|---|---|---|
| `src/lib/school/adaptive/teachingStrategy.ts` | `determineStrategy()` — a **live, deterministic, priority-ordered selector over 7 adaptive postures** with a stalemate-driven `excludeStrategy` rotation and a `foundationBias` default | **Extended — §0.2, §6** |
| `src/lib/school/adaptive/strategyEffectiveness.ts` | Detects *"the same strategy firing 3+ times in a row on an unmastered topic"* | **Reused** — a live anti-thrash precursor (§9.5) |
| `src/lib/school/adaptive/teachingOutputBias.ts` | **13 lines; every exported function returns a constant.** A stub | **Reused (as evidence of a gap)** — AC-3, AF-1 |
| `src/lib/school/adaptive/{confidenceCalibration,learningMomentum,conceptTransfer,misconceptionEngine}.ts` | The five signals `getTeachingStrategy()` folds | **Reused** — Phase 3's posture inputs already exist |
| `src/lib/school/tutoring/hintTag.ts` + the `route.ts` `[HINT]` path | A parsed `[HINT]` tag whose bias input is the stub above | **Reused (as evidence of a gap)** — AF-1 |
| **`src/lib/kernel/policy/{types,engine,basePack,index}.ts`** | **An implemented seven-band policy engine** (`BandId = 0…6`) with subtractive Band-2 filters, a Band-5 personalization surface, `Budgets`, `DecisionTrace`, and conflict resolution by specificity → mandatory → lexical. `basePack.ts` already encodes the D1 grid as **Band-4 rules** (`B4.d1.misconceiving.v1`, `B4.d1.fragile.v1`, `B4.d1.confused.v1`, citing `foundations/02 §1`) and first-lesson limits as **Band-2 legality rules** | **Reused — and it is the evaluator Phase 3's rules run inside.** §0.7.1 |
| **`src/lib/kernel/frustration.ts`** | A live affect machine — `CALM \| STRAINED \| FLOODED \| RECOVERING` — with `affectBandOf()` → `calm \| strained \| flooded`, read in `route.ts` | **Reused — binding.** It is the selector for the `strained` column of the normative budget table. §0.7.2 |
| **`src/lib/kernel/{policyMove,parity,shadow,verifier,simulation,tsm,planner,stages,actions}`** | Move mapping, parity harness, shadow pipeline, output verifier, persona simulation, the 10-state TSM | **Reused** — `policyMove.ts` is a **named sole owner** of "what move is this turn?" (§0.6.2). Phase 3 selects no move |
| **`src/lib/eos-runtime/{flags,policyGate,verifierGate,degradedMode,packLoader,buildContext}.ts`** | `ENABLE_EOS_RUNTIME` master flag; `PolicyMode off\|shadow\|primary` (the master implies **shadow**, never primary); `VerifierMode off\|log\|enforce`; **`degradedMode.ts` = RS P-3 degraded deterministic mode** | **Reused — binding.** §21.2's fallback ladder is reconciled onto P-3 rather than competing with it. §0.7.3 |
| **`src/lib/teaching/conversationState.ts`** | `PHASE_ORDER` + `phaseIndex − 1` floored step-down (the ISS-01 ladder); `responseBudget(register, consecutiveFailures)` — **a live struggle-scaled response-length dial** whose own comment cites `foundations/04 P5`; `decideNextMove`; `PHASE_MAX_QUESTION_STAGE` | **Reused — and it is the live implementation of D4's turn-density sub-setting.** §0.7.4 |

**Inventory completeness statement (rebuilt v3.1.0).** Enumerated by directory listing: **52** pre-existing documents in `docs/architecture/` (this document is excluded from its own denominator — v3.0.0-draft counted itself, which inflated the figure and helped obscure B1), **7** in `docs/architecture/eos-v3/`, **8** specification/library artifacts in `docs/curriculum/` plus its `protocols/` and `blueprints/` directories, the full `educational-brain/` tree (**11** directories), and **four runtime subsystems** read read-only. Each carries exactly one verdict in sections A–G above; section D covers ADR 02–15 without gaps. **Zero documents remain unclassified**, and v3.0.0-draft's escape clause ("directly or by the category rows above") has been removed rather than relied upon. **Superseded was used zero times — Phase 3 replaces nothing.**

### 0.2 The canonical adaptation stack — and the two lines Phase 3 must not cross

Three separate documents describe pieces of the control plane and none describes all of it. This
is the single canonical statement. **Every level has exactly one owner and one authority.**

```
 ══════════ WHAT IS TAUGHT — Phase 1 territory (canonical, untouched) ═══════════

  W-A  WHICH CONCEPT          C-33 + Review Scheduler + Phase 1 §9.3 Q1
  W-B  WHICH APPROACH         TQ-1 archetype / authored Protocol         (campaign)
  W-C  WHICH PHASE            TQ-2 arc                                    (campaign)
  W-D  WHICH METHOD           TQ-1 methodSequence over TQ-3               (1..n turns)
  W-E  WHICH ACTION           C-30 selector                               (turn)
  W-F  IS THIS DIFFERENT      TQ-4 Difference Operator                    (re-teach)

 ══════════ HOW MUCH SUPPORT — ★ PHASE 3 territory ══════════════════════════════

  H-A  POSTURE     Which adaptive stance is this learner in?      ★ AT-3
                   (extends the live 7-posture selector)
  H-B  PRESSURE    What is the learner state pushing on?          ★ AT-4
  H-C  ARBITRATE   Which single pressure is answered now?         ★ AT-5
  H-D  DIALS       What are the standing control settings?        ★ AT-2
                   scaffold · hint · difficulty · pace · load · interleaving
  H-E  STABILITY   Is this adjustment legal as a control move?    ★ AT-6
                        │
                        │  AdaptationConstraint (narrowing) + AdaptationParameters
                        ▼  — one direction, no back-reads (§18.3)

 ══════════ EXECUTION — existing, untouched ════════════════════════════════════

  X-A  OBJECTIVE + VETO       C-32 target band · affect hard-stop · withholding policy
  X-B  LEGALITY               C-29 · C-28 Band 2
  X-C  SELECTION              C-28 tactics band → C-30   (Phase 3 never enters)
  X-D  PREEMPTION             C-31 Recovery (above everything)
  X-E  PRIMITIVES             P81 P82 P83 P84 P85 P86 (Category F, FINAL)
```

**Line 1 — Phase 3 never crosses into WHAT.** It selects no concept, archetype, phase, method or
action, and it never declares an attempt "different". Every dial move leaves the *content* of
teaching exactly where Phase 1 put it.

**Line 2 — Phase 3 never crosses into OBJECTIVE or VETO.** `C-32` keeps the target band, the
withholding policy and the absolute affect hard-stop. Phase 3 is the **instrument** `C-32` steers
with, not a second steersman. A Phase 3 that set its own band would be a second controller with a
second objective, which is exactly the failure the governance rules exist to prevent.

**The honest statement of contribution**, in the form Phase 1 §0.2 established for Protocols:

> **The control plane already exists** — as six frozen primitives (P81–P86), as a live 7-posture
> selector, as a scaffold dial with a 0–4 scale, as a typed hint ladder with a compile-time
> easier-than proof, and as a charter in `C-32`. **What does not exist is the layer that makes
> them one object.** There is no named set of dials, no rule for when a dial may move, no rule
> for how far, no arbitration when two pressures implicate different dials, and no rule that
> stops a dial from oscillating. Phase 3 supplies exactly that layer and authors none of the
> pieces it composes.

**The live posture selector is the Phase-3 analogue of Phase 1's Protocol finding.** Phase 1
discovered its "strategy archetypes" were a re-invention of the authored Protocol class.
Reconciliation found the same pattern here: a naive Phase 3 would have invented an "adaptive mode"
enum, and `determineStrategy()` **already is one** — deterministic, priority-ordered, evidence-fed
by five engines, logged to `TeachingStrategyEvent`, and read back for stalemate detection. Its
seven values are not approaches to a concept (that is TQ-1); they are *stances toward a learner
state*. §6 extends that set rather than competing with it, and §6.1 states why the two sets are
orthogonal rather than rival.

**Three consequences, all binding:**

- **C3-1 · The dials are Category-F primitives, one level up.** Every dial in §5.2 is the standing
  parameter of exactly one Category-F primitive. A dial with no primitive is not admissible; a
  Category-F primitive with no dial is a per-turn move, not a standing setting, and stays where it
  is. This is the admissibility test the dial set is closed under.
- **C3-2 · The primitive composition grammar constrains dial moves.** `P26 SCHEMA ACTIVATION →
  P28 COGNITIVE CONFLICT` (activate before colliding) and the CPA chain `P06 → P07 → P08` are
  ordering laws over primitives. A dial move that would break an in-flight primitive sequence is
  illegal — which is the grammar-level justification for §15.2's dial freeze, not a new rule
  invented for misconceptions.
- **C3-3 · Adaptation is not a teaching act.** No dial move is, by itself, a turn. A turn is always
  an action selected by `C-30`; the dials say how that action is parameterized. A system in which
  "lower the difficulty" is a *thing the tutor did* has confused the control plane with the
  teaching plane, and the learner experiences it as being managed rather than taught.

### 0.3 Ownership boundary and handoffs

`ARCHITECTURAL_GOVERNANCE_REGISTRY.md` §4 assigns territory, and Phase 3 states where it sits
rather than assuming permission.

| Registry assignment | Bearing on Phase 3 |
|---|---|
| **Pappu OWNS** Primitive Library · Composition Grammar · Blueprint Specification · Teaching Blueprints · Protocols · CPA grammar · Curriculum Production | The layer above Category-F primitives is inside this territory, on the same basis Phase 1's Method and Strategy layers were. Authoring it here is within the assigned role. |
| **Pappu MUST NEVER MODIFY** `src/` runtime · Decision/Teaching Engine · Evidence/Mastery/Session · QA framework · the Contract · ADRs | Phase 3 modifies none of these. `teachingStrategy.ts`, `teachingOutputBias.ts` and `route.ts` were **read only**, for capability verification, and every finding about them is recorded as feedback or as a proposal — never as a change. |
| **Mohammad OWNS** Runtime · Teaching + Decision Engine · Evidence/Mastery/Review/Recovery · ADRs · Bible · Contract · this registry | **Most of Phase 3's outputs land here.** They are therefore **proposals requiring the runtime owner's acceptance**, not authored changes. Phase 3's merge enacts none of them. |
| **Decision Engine — FROZEN, Pappu a forbidden editor** (`educational-brain/decision-engine/`) | Phase 3 reads all eight documents and **edits none**. Where it found a gap (`decision-engine/05` has no dwell rule) it records feedback, per Phase 1 §17.3. |

**Cross-owner handoffs.** None is enacted by this document.

| ID | Handoff | Territory |
|---|---|---|
| **AH-1** | `C-32`'s four unstructured outputs (difficulty target, hint policy, scaffolding level, withholding decisions) are replaced by **one typed Adaptation State Vector** (§5). `C-32` retains the loop, the band and the veto; it gains an instrument and transfers the adjustment decision (§0.1). | EOS `C-32` — runtime owner |
| **AH-2** | The ASV is persisted as per-learner-per-concept standing state in an **existing** ADR 10 store (candidate: Store 2, alongside the *pacing signals* group ADR 10 already carries). No new store. | ADR 10 — runtime owner |
| **AH-3** | `C-28`'s decision record captures the ASV snapshot and the adjustment record (§7.4) as **one field group with Phase 1's AttemptVector (H-1)**, not two. Two separate capture proposals against the same record would produce two schemas for one turn. | `C-28` + ADR 08 — runtime owner |
| **AH-4** | The scaffold vocabulary is unified: `EOS_V2_RUNTIME_SPECIFICATION` §3.4's `scaffoldDial 0–4` becomes the single definition, and `eos-v3` `C-32`'s prose *"scaffolding level"* is bound to it. §0.4 records the divergence. | EOS v2 + eos-v3 — runtime owner |
| **AH-5** | ADR 08 records the **Posture layer** explicitly: `teachingStrategy.ts`'s 7 postures are the Posture half of ADR 08's own Posture/Action split, and are distinct from Phase 1's 9 archetypes (§6.1). | ADR 08 — runtime owner |
| **AH-6** | Evidence records carry `scaffoldLevel` and `hintDebt`, as `EOS_V2`'s `AnswerObserved` already specifies, so assisted and unassisted evidence remain distinguishable (§10.5, §11.4). | ADR 13 — runtime owner |
| **AH-7** | The Bible's engine map and §6 gain the adaptive control plane and AT-1…AT-14; the ADR index records ADR 08 and ADR 13 as *extended by Phase 3*. | Bible — runtime owner |
| **AH-8** | `WAVE_0_APPROVAL_CHECKLIST.md` gains items for §25's stages. **Phase 3's merge unblocks nothing.** | Wave 0 — owner |
| **AH-9** | `ENGINE_REFERENCE.md` #16's description of `teachingOutputBias.ts` is corrected to record that the file is a stub (AF-1). Documentation correction only. | `ENGINE_REFERENCE` — runtime owner |
| **AH-10** | All Phase 3 → runtime interfaces (§18) are expressed through `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md`, never around it. | Contract — runtime owner |
| **AH-11** *(new v3.1.0 — B2/I2)* | Phase 3's pressure and governor rules are authored **into the existing policy pack** (`kernel/policy/basePack.ts`'s format, at Bands 2/4/5), not into a new evaluator. Which wiring frame governs at implementation time — the EOS band pipeline or the live pre-EOS prompt-assembly path — is the runtime owner's sequencing decision, not an assumption of this document. | `kernel/policy/` + EOS runtime — runtime owner |
| **AH-12** *(new v3.1.0 — B3)* | `C-28`'s adjustment record carries `consumesReteachBudget`, and Phase 1's §7.7 budget counter is readable by the Band-2 governor rules so an exhausted budget removes D1/D5 failure-response moves from the candidate set. | `C-28` + Phase 1 budget owner — runtime owner |

**Unresolved boundary carried forward.** Phase 1's OQ-10 (whether phase architecture documents
belong in `docs/architecture/`, which the registry assigns to the runtime owner) applies
identically and is not re-litigated. Recorded as AQ-9.

### 0.4 Contradictions between reused authorities — recorded, not fixed

Reconciliation must record contradictions it finds rather than smooth them (Phase 2 §0.4's
precedent). Three were found. **All three predate Phase 3, all three belong to other owners, and
Phase 3 resolves none of them** — it states which reading it adopts and why.

**AC-1 · The scaffold dial exists twice, with different scopes.**

| | `EOS_V2_RUNTIME_SPECIFICATION` §3.4 | `eos-v3` `C-32` |
|---|---|---|
| Name | `scaffoldDial` | "scaffolding level" |
| Range | `0–4`, `0 = full worked`, `4 = solo` | unquantified |
| Scope | **GUIDED only**; state-scoped; **reset on state transition** | unscoped |
| Owner | TSM (the state machine) | `C-32` (the struggle controller) |
| Lifetime | one teaching state | unstated |

Two documents give the same quantity two owners and two lifetimes. **Phase 3 adopts EOS v2's
scale and endpoints** (they are the only defined ones) **and `eos-v3`'s ownership** (a control
quantity belongs to the controller, not the state machine, or the state machine acquires a second
job). It extends the scope beyond GUIDED, which neither document does, and §10.2 says so plainly.
Recorded as AF-4; resolution is AH-4 and is the runtime owner's.

**AC-2 · The hint ladder exists four times, in four vocabularies.**

| Authority | Object | Rungs |
|---|---|---|
| `CEKR` | `HintSpec` — ladder-typed, easier-than metadata, `HINTS_FOR` edge | ladder type, unbounded stage |
| `EDUCATIONAL_BRAIN_COMPILER` | `HintDef {ladderType, stage, requiresCapabilities[]}` + E0401/E0402 proofs | stage arithmetic, unbounded |
| `ADR 14` | asset kinds `hint_tier_1 \| hint_tier_2 \| hint_tier_3` | **exactly three** |
| `eos-v3` `C-32` | prose: *"hints escalate in specificity slowly; the answer is the last resort"* | unenumerated |

`ADR 14`'s three tiers and `CEKR`/`EBC`'s unbounded `stage` are not obviously the same ladder, and
nothing states a mapping. **Phase 3 adopts `CEKR`/`EBC` as the authoritative hint model** —
because it is the one carrying a machine-checked invariant — and treats ADR 14's three tiers as
the *asset packaging* of that ladder rather than a competing enumeration. §11.2 defines rung
*semantics* without fixing a rung count, precisely so it does not adjudicate between the two.
Recorded as AF-3.

**AC-3 · A live engine documents behaviour it does not have.** `ENGINE_REFERENCE.md` #16 describes
`teachingOutputBias.ts` as *"gates how much scaffolding the response should include"*, and
`DATA_FLOW.md` steps 17 and 55 place its output in the turn flow. The file is 13 lines and every
function returns a constant. The hint-bias value threaded through `route.ts` is always `null`;
the output bias is always `BALANCED`. **The scaffolding gate documented as live does not compute
anything.** This is not a design contradiction but a documentation-versus-reality one, and it is
load-bearing for Phase 3's honesty about its own novelty: §10 and §11 are not competing with a
working system. Recorded as AF-1; correction is AH-9.

### 0.5 The brief's scope items, mapped honestly

Twenty-two items were briefed. Designing all twenty-two would have duplicated Phase 1 in four
places and `C-32` in three.

| Brief item | Disposition |
|---|---|
| Adaptive Teaching Decision Engine | **Designed** — AT-1 (§4), as a control loop inside `C-28`'s existing bands, not a new engine beside it |
| Teaching Strategy Selection | **DEFERRED to Phase 1 TQ-1 §4.5.** Not designed. What Phase 3 designs is *posture* selection (§6), which ADR 08 already distinguishes from approach selection |
| Teaching Strategy Transition Rules | **Split.** Strategy transitions are TQ-1 §4.6 — reused. *Posture* transitions are designed (§6.3) |
| Re-teaching Architecture | **DEFERRED to Phase 1 TQ-4 in full.** Phase 3 designs the rung *below* re-teaching that TQ-4 does not have (§16) |
| Strategy Escalation | **DEFERRED to `decision-engine/05` (four ladders, six standing moves) and TQ-4 §7.7.** Phase 3 contributes the escalation *order* across authorities (§16) and the dwell rule the ladders lack (§9) |
| Strategy Abandonment | **DEFERRED to TQ-1 §4.6.** Phase 3 emits an exhaustion signal; TQ-1 decides (§17.3) |
| Scaffolding Architecture | **Designed** — AT-7 (§10), extending EOS v2's `scaffoldDial` and P81/P82 |
| Hint Architecture | **Designed at the decision layer only** — AT-8 (§11). The hint *content model*, the ladder *schema* and the easier-than *law* are CEKR/EBC's and are not re-authored |
| Misconception Response Architecture | **DEFERRED to `educational-brain/misconceptions/` and TQ-4 diagnosis C2.** Phase 3 contributes one rule: the dial freeze that protects the collision (§15.2) |
| Confusion Response Architecture | **Designed, narrowly** — §15.3's three-way disambiguation, because the correct dial response differs sharply between three states the corpus currently treats as one trigger (T3) |
| Pace Adaptation | **Designed as a controller over an existing quantity** — AT-9 (§12). v3.0.0-draft called this "the genuinely unowned dial"; **that was falsified in v3.1.0** — `RS §18`'s `budgets.paragraphs.*` and `budgets.maxNewTerms` are normative, and `conversationState.ts`'s `responseBudget()` implements them. What Phase 3 adds is the controller, not the quantity (§0.7.4) |
| Difficulty Adaptation | **Designed at the instrument layer only** — AT-10 (§13). `C-32` keeps the loop and the band |
| Cognitive Load Adaptation | **Designed at the control layer only** — AT-11 (§14). The element budget itself is `RS §18`'s `budgets.maxNewElements` ("load filter"), reused; the intrinsic/extraneous/germane theory is deferred to the unauthored `educational-brain/cognitive-load/` library (AF-2) |
| Teaching Campaign Adaptation | **Designed as an interaction contract** — AT-14 (§17). The campaign objects are Phase 1's |
| Student State Signals | **DEFERRED to `decision-engine/02` and `student-state/` in full.** Phase 3 defines no state and no detector; §7 maps existing states to pressures |
| Adaptive Decision Inputs | **Designed** — §18.1, with a five-level existence status per field |
| Adaptive Decision Outputs | **Designed** — §18.2 |
| Adaptive Constraints | **Designed** — §18.3, narrowing-only |
| Adaptive Governance | **Designed** — §19 |
| Adaptive Metrics | **Designed** — §20, bounded against TQ-7 and OSF |
| Failure Modes | **Designed** — §21, per component and consolidated |
| Fallback Architecture | **Designed** — §21.2, the blind-adaptation ladder |
| Extensibility | **Designed** — §22 |

**Nine of twenty-two are wholly or mostly deferred.** That ratio is the reconciliation working
correctly, not a thin phase: the adaptive brief overlaps Phase 1 more than any other, and the
value of Phase 3 is concentrated in the five things nobody owns — the dial set, arbitration,
stability, the hint/scaffold decision layer, and the missing escalation rung.

### 0.6 Authority-ladder compliance and the band-numbering reconciliation *(new in v3.1.0)*

`docs/architecture/README.md` is the repository's **Architecture Authority Index**. It exists to
answer one question — *when two documents here disagree, which one wins?* — and v3.0.0-draft never
opened it. Four consequences follow, and none of them changes a Phase 3 component.

#### 0.6.1 Phase 3 is advisory, and says so

The published ladder is: (1) `EOS_V2_ARCHITECTURE.md` **Frozen** — owns the 8 Constitutional Laws,
the 4 planes, the turn pipeline's shape and **band semantics**; (2) `EOS_V2_RUNTIME_SPECIFICATION.md`
**Frozen** — owns runtime behaviour, invariants `I-*`, verifier rules `V-*`, failure handling
`P-*`, and **`§18` BrainConfig defaults, "the only normative source for constants"**;
(3) `CEKR` **Frozen**; (4) `EOS_IMPLEMENTATION_MASTERPLAN` Living; (5) `EDUCATIONAL_BRAIN_BIBLE` +
ADRs **Frozen v1.0**; (6) **everything else in the directory — Advisory.**

**Phase 3 sits at row 6.** So do Phase 1 and Phase 2. This is recorded plainly because it changes
how this document must be read: where Phase 3 and a frozen EOS document disagree, **the frozen
document wins and Phase 3 is the bug**. The index's own words: *"A gap found while implementing a
frozen document is a spec bug — file it against that document; do not invent behaviour to cover
it."* Every Appendix C item is filed on exactly that basis.

Note also that the ladder does **not** list `eos-v3/`. v3.0.0-draft treated `eos-v3/04` as its
primary integration surface. That remains the right *reference* for component responsibilities
(`C-28`…`C-43`), but where the two EOS generations differ on anything the ladder assigns to EOS v2
— band semantics and constants, specifically — **EOS v2 governs**. §0.6.2 is the first place this
bites.

#### 0.6.2 The band-numbering divergence — recorded, and resolved by the ladder

v3.0.0-draft published constraints "into `C-28` Band 2" and parameters "into `C-28` Band 3",
using `eos-v3`'s four-band summary (0 safety · 1 affect · 2 policy · 3 tactics). **EOS v2 — which
owns band semantics — has seven bands**, and `src/lib/kernel/policy/types.ts` implements them as
`BandId = 0…6`:

```
 EOS v2 / implemented          eos-v3/04 summary        Phase 3 publication target
 ─────────────────────────────────────────────────────────────────────────────────────
 Band 0  interrupts            Band 0 safety            never (AR-1)
 Band 1  obligations           Band 1 affect            never (AR-1)
 Band 2  legality (SUBTRACTIVE) Band 2 policy           ★ AdaptationConstraint  — UNCHANGED
 Band 3  authored dispatch     ─┐                       never (authored wins, §19.2)
 Band 4  policy tables          ├ Band 3 tactics        pressure→dial rules live here (§0.7.1)
 Band 5  PERSONALIZATION       ─┤                       ★ AdaptationParameters — CORRECTED
 Band 6  tie-break             ─┘                       AR-8's tie-break defers here
```

**Two corrections applied throughout this document, and they are the only substantive edits B2
forced:**

- `AdaptationConstraint` → **Band 2**. Unchanged, and now correct for a stronger reason: EOS v2's
  Band 2 is *defined* as subtractive, and `types.ts` carries the comment *"Set by Band 2 legality
  filters to REMOVE candidate moves. Subtractive."* Phase 3's narrowing-only contract (§18.3) is
  not a new invariant — **it is Band 2's existing semantics**, which is a considerably better
  place to stand than a self-declared rule.
- `AdaptationParameters` → **Band 5, not Band 3.** EOS v2 Band 5 is personalization: *"MAY set
  representation/anchor/**pace** fields; MUST NOT alter move, stageCeiling, budgets, or legality
  outcomes."* That is `AdaptationParameters` exactly, including the prohibition Phase 3 already
  imposed on itself (§18.3's "no action names in parameters"). eos-v3's "Band 3 tactics" is
  `C-30` selection, which Phase 3 must never touch — so v3.0.0-draft's label was not merely
  imprecise, it named the one band Phase 3 is forbidden to enter.

**Band 5's budget prohibition, and why it does not break D4/D5.** Band 5 "MUST NOT alter …
budgets." Two of Phase 3's dials *are* budgets (§0.7.4). The resolution requires no redesign
because it is what the live code already does: **the dial selects among the normative values
RS §18 already ships; it does not author or alter a budget.** `responseBudget()` selects between
`budgets.paragraphs.beginner` = 4 and `.../strained` = 2 on register × struggle. Selecting a
shipped value is personalization; changing what the shipped values are is a BrainConfig amendment,
which Phase 3 neither performs nor requests. §5.2 and §18.3 now say this.

#### 0.6.3 The 15 permanent dependency rules

v3.0.0-draft cited Rule 9 twice and never stated compliance with the set. Checked for this
revision against `DEPENDENCY_RULES.md`'s per-engine sections and the Bible's citations (no single
enumerated list exists in either file — recorded as a limitation in §28):

- **Rule 9 · one probabilistic component per turn.** §4.4's loop is enum comparison and table
  lookup, and RS §13 independently forbids the Hint module from touching the LLM. Compliant.
- **Rule 14 · single-writer ownership.** The ASV has exactly one writer (§4.3 step 7, as corrected
  in §0.7.1) and Phase 3 writes to no store it does not own. Compliant.
- **Rule 7 · engines never independently score mastery.** No dial advances, blocks or reverses a
  teaching state (§3.4). Compliant.
- **Rule 4 · downstream engines only add fields, never overwrite the source.** `AdaptationConstraint`
  removes options and never adds one; `AdaptationParameters` sets no action. Compliant.
- **Rule 12 · the hard DAG boundary between tiers.** See §0.6.4.
- The remaining rules (1, 2, 3, 5, 6, 8, 10, 11, 13, 15) govern KG immutability, memory writes,
  recommendation-tier isolation, visual-tier leafness and prompt assembly. **Phase 3 touches none
  of their subjects and violates none.**

#### 0.6.4 Dependency direction — the improvement I2 asked for

Two dependency laws bear on Phase 3 and they are not the same law:

- **RS §13's global law:** *"dependencies point downward in the plane stack (Expression → Decision
  → Model → Perception → Substrates); any upward import is an architecture-test failure (T-7)."*
  The control plane sits in the **Decision plane**. It reads Model-plane views and publishes into
  the Decision plane's own bands. Downward and lateral only. **Compliant.**
- **RS §13's Policy Engine contract:** allowed deps *packs, views*; **forbidden deps *Evidence
  writes, drivers, storage***; and the engine is marked *pure*. v3.0.0-draft's §4.3 step 7 said the
  loop "commits" and "writes" the adjustment record. **That would violate this contract.**
  Corrected in §4.3: the loop **emits** the adjustment record as an event; the Evidence Store
  appends it, exactly as the engine already emits events #20 and #26. No new writer is created.
- **`DEPENDENCY_RULES.md`'s live-tier law:** the eight adaptive-tier satellites *"feed the system
  prompt directly; they are never called **by** the core teaching chain."* AT-3 consumes
  `teachingStrategy.ts`'s **published output**, which under EOS is a Model-plane view feeding a
  Decision-plane band. Under the live pre-EOS wiring the satellites feed the prompt instead.
  **Both readings are satisfied by the same rule: Phase 3 reads a published value and calls
  nothing.** Which frame governs at implementation time is the runtime owner's sequencing
  decision, recorded as AH-11 rather than assumed.

---

### 0.7 Runtime control-layer reconciliation *(new in v3.1.0 — blocking issue B2)*

The review found four runtime subsystems that v3.0.0-draft never opened and that plausibly own
parts of the control plane. Each is reconciled below against the four verdicts the revision brief
specifies: **reuses · extends · constrains · duplicates**. The summary, stated before the detail
because it is the honest headline:

| Mechanism | Phase 3's relationship | Net effect on Phase 3 |
|---|---|---|
| **Band 2** (subtractive legality) | **REUSES** | `AdaptationConstraint` **is** a Band-2 filter. No new narrowing mechanism |
| **Band 5** (personalization) | **REUSES** | `AdaptationParameters` **is** a Band-5 effect. Publication target corrected from Band 3 |
| **Band 4 D1-grid rules** (`basePack.ts`) | **DUPLICATED → eliminated by placement** | AT-4's pressures become **rules in the existing pack at the existing bands**, not a parallel deriver |
| **Frustration bands** (`frustration.ts`) | **REUSES — binding** | AR-1's preemption and §21.3's recovery clamp read this machine. Phase 3 detects no affect |
| **Degraded mode** (`degradedMode.ts`, RS P-3) | **REUSES — binding** | §21.2's AF-ladder is scoped *inside* P-3, not beside it |
| **`responseBudget()`** (`conversationState.ts`) | **REUSES — and it is D4's live implementation** | D4/D5 are existing normative BrainConfig keys, not new dials |
| **`policy/engine.ts`** conflict resolution | **CONSTRAINS Phase 3** | AT-5 arbitrates *pressures*, never band rules. Sole ownership honoured |
| **`policyMove.ts`** move mapping | **CONSTRAINS Phase 3** | Phase 3 selects no move. Already true; now stated |
| **ISS-01 ladder** (`PHASE_ORDER`) | **CONSTRAINS Phase 3** | §10.2 and §16 must not be read as resolving a BLOCKED decision |

**One duplication was found and it is eliminated architecturally, without redesign**, by placing
AT-4's rules inside the existing pack rather than beside it (§0.7.1). Every other relationship is
reuse or constraint. **No Phase 3 component was removed, added, split or merged.**

#### 0.7.1 `src/lib/kernel/policy/` — the evaluator Phase 3's rules run inside

`policy/engine.ts` and `policy/types.ts` implement a seven-band policy engine with `PolicyInputs`,
`RuleGuard`, `RuleEffect`, `Budgets`, `DecisionTrace`, `EnginePolicyDecision`, and conflict
resolution by *specificity → mandatory → lexical*. `README.md` §3 names it as a **sole owner**:
*"Band evaluation, conflict resolution, completeness — `src/lib/kernel/policy/engine.ts`… a second
implementation is a defect, not a refactoring opportunity."*

**The duplication.** `basePack.ts` already encodes the D1 grid as Band-4 rules —
`B4.d1.misconceiving.v1`, `B4.d1.fragile.v1`, `B4.d1.confused.v1`, each citing `foundations/02 §1`
— which is the same source AT-4 §7.2 derives its primary pressures from. Two mechanisms reading
one authority to produce turn effects is a duplication by any reading.

**The elimination, and it is placement rather than redesign.** AT-4's pressure rules and AT-6's
governor rules are **authored as rules in the existing policy pack, at the existing bands,
evaluated by the existing engine**:

```
 AT-6 STABILITY GOVERNOR rules (SG-1…SG-8)   → Band 2 rules   (subtractive: they REMOVE
                                                illegal dial moves from the candidate set)
 AT-4 PRESSURE rules (§7.2)                  → Band 4 rules   (policy tables; they sit
                                                alongside the existing B4.d1.* rules and
                                                extend the same quadrant reading to dials)
 AT-2 ASV values published                   → Band 5 effect  (personalization)
 §21.3 CLAMP profiles                        → Band 2 rules   (first-lesson limits are
                                                ALREADY Band-2 rules in basePack.ts)
 AR-1 affect preemption                      → Band 0         (already implemented:
                                                B0.recovery.preempt.v1)
```

**What this changes in Phase 3: the location of its rules, not their content.** Every SG rule,
every pressure in §7.2, and every clause of §8's arbitration keeps its wording and its
justification. What is withdrawn is any implication that Phase 3 supplies a *second evaluator*.

**AT-5's arbitration, bounded against the sole owner.** This is the sharpest boundary in the
revision, and §8 now carries it:

> `policy/engine.ts` owns **rule conflict resolution** — two rules colliding on a field, resolved
> by specificity, mandatory-beats-optional, then lexical `ruleId`. **AT-5 owns nothing of the
> kind.** It resolves *which learner-state pressure is answered*, which is a question upstream of
> any rule firing. Where AT-5's ordering must be enforced at rule-evaluation time, it is expressed
> as **band assignment and rule specificity within the existing engine** — AR-3's band priority is
> band assignment, AR-4's reversibility ordering is specificity, AR-8's tie-break defers to the
> engine's own lexical rule and to Band 6. **Phase 3 implements no resolver.**

**AR-5 (never average opposing pressures) survives this placement**, and is strengthened by it:
the engine already emits `PolicyConflictDetected` when two equal-specificity rules collide, and
its own comment calls that *"always a pack bug."* AR-5's `contradictory-pressure` event is the
same discipline one layer up — a signal that the state model is wrong, not a value to interpolate.

**Consequence for §4.3 step 7.** RS §13 forbids the Policy Engine from performing Evidence writes.
The adjustment record is therefore **emitted as an event and appended by the Evidence Store**, not
written by the loop. §4.3 is corrected accordingly. This preserves Permanent Rule 14's
single-writer invariant and creates no new writer.

#### 0.7.2 `src/lib/kernel/frustration.ts` — affect bands, reused verbatim

A live machine over `CALM | STRAINED | FLOODED | RECOVERING`, with `affectBandOf()` projecting to
`calm | strained | flooded`, read in `route.ts` and consumed by the K5 verifier's praise-band rule.

**Verdict: REUSES, binding.** Phase 3 already refused to detect affect (§5.3's exclusion list,
AR-1, §3.4). This machine is the concrete thing AR-1 defers to and the concrete selector for the
`strained` column of RS §18's budget table (§0.7.4). Two clarifications are added, no rules
changed: §8 AR-1 names `frustration.ts` as the preemption source, and §21.3's recovery-clamp row
names `FLOODED`/`RECOVERING` as the states that raise it. **Phase 3 adds no affect state and no
detector.**

#### 0.7.3 `src/lib/eos-runtime/` — flags, gates, and degraded mode

`flags.ts` gates the whole subsystem behind `ENABLE_EOS_RUNTIME`, with `PolicyMode
off | shadow | primary` where *the master flag implies shadow, never primary*, and `policyGate.ts`
documents *"why primary is not reachable yet."* **The engine is therefore implemented and not yet
authoritative** — which is why Phase 3 is not in conflict with production behaviour today, and why
reconciling it now rather than after merge is the cheap moment.

`degradedMode.ts` implements **RS P-3 degraded deterministic mode** and its header states the
principle Phase 3's §21.2 independently arrived at: *"banner-free (learner not told 'AI down')"*,
and *"a second template body would be a second owner of degraded pedagogy."*

**Verdict: REUSES, binding.** §21.2's AF0–AF4 ladder describes **adaptation availability**, which
is orthogonal to P-3's **generation availability** — but they can co-occur, so §21.2 now states
the precedence: **P-3 governs the turn; the AF-ladder governs the vector inside it.** In P-3 the
vector holds and publishes (AF3/AF4 behaviour), because a degraded turn still needs support
conditions. Phase 3 introduces no second degraded mode and no second template path.

#### 0.7.4 `src/lib/teaching/conversationState.ts` — D4 and D5 already exist as normative budgets

The most consequential finding of this revision, and the one that most reduces Phase 3's claim to
novelty.

**`responseBudget(register, consecutiveFailures)`** returns 4/2 (beginner), 7/4 (intermediate),
`null`/6 (expert), keyed on `consecutiveFailures >= 2`, with the comment *"Struggle makes responses
SHORTER, never longer — a flooded mind gets less text, not more (foundations/04 P5)."*

Those are **exactly** `RS §18`'s normative BrainConfig keys:

```
 budgets.paragraphs.beginner / strained        4 / 2      → D4 turn density
 budgets.paragraphs.intermediate / strained    7 / 4      → D4 turn density
 budgets.paragraphs.expert / strained       null / 6      → D4 turn density
 budgets.maxNewTerms.beginner / other          1 / 2      → D4 new-element rate
 budgets.maxNewElements (beginner/int/exp)   2 / 3 / 4    → D5 element budget ("load filter")
 conv.maxConsecutiveQuestions                     2       → already enforced, Band 2
 recovery.behavioralTrigger        2 consecutive failures → AR-1's trigger
 fluency.latencyFactor / fluency.count    1.25× / 3       → §13.4's fluency gate
```

**Verdict: REUSES — and §5.2 is corrected to say so.** D4's turn-density and new-element-rate
sub-settings and D5's element budget are **not new dials**. They are existing normative constants
with shipped defaults and a live implementation. What Phase 3 contributes for them is narrower and
should be stated narrowly: a **controller** — the governor's dwell, hysteresis and rate limits, and
the pressure that selects among the shipped values on a state read richer than
`consecutiveFailures >= 2`.

This also resolves Band 5's budget prohibition (§0.6.2): **the dial selects a shipped value; it
never alters one.** RS §18 remains the only normative source for constants, and §19.3 is corrected
from "following ADR 10's BrainConfig proposal" to "RS §18 is the normative source; ADR 10's store
is the persistence proposal."

**The ISS-01 ladder constrains §10.2 and §16.** `PHASE_ORDER` with `phaseIndex − 1` floored is a
live step-down-one-with-a-floor mechanism — structurally the same shape as AP6 and SG-2, and
ISS-01 records three defects in it, one catastrophic, **blocked on a pedagogical decision the
owner has not made**. Consequences, all additive:

- §10.2's scaffold ladder is **not** the ISS-01 ladder and must not be conflated with it: one is
  support level within a phase, the other is phase position. Stated in §10.2.
- §16's rung order must not be read as resolving ISS-01's CHECK/PRACTICE ordering defect. Stated
  in §16.3 as EL-8.
- Recorded as **AF-11**: whichever way ISS-01 resolves, §10.3's phase clamps must be re-checked
  against the resulting phase order, because the clamps are keyed on phase identity.

---

## 1. Executive Summary

### 1.1 The question

> *A learner is halfway through a concept and something is going wrong. Not wrong enough to
> re-teach, not wrong enough to stop. What does the tutor change?*

Phase 1 answers the large adaptive questions well. It knows how to pick an approach, how to hold
it, how to tell a genuine re-teach from a paraphrase, and when to abandon. What it has no answer
for is the small one — and the small one is most of teaching. A human tutor spends far more of a
session adjusting *how much help, how hard, how fast, how much at once* than choosing between
analogy and demonstration. Those adjustments are continuous, they are mostly invisible to the
learner, and they are the difference between a lesson that fits and one that is merely correct.

The repository has all the parts of this and none of the assembly. It has six frozen primitives
whose own taxonomy calls them *"the control plane."* It has a struggle controller chartered to
*"adjust difficulty, hint availability, and scaffolding"* with no definition of any of the three.
It has a scaffold dial that exists only inside one teaching state and resets when the state
changes. It has a hint ladder with a compile-time correctness proof and no rule for when a rung is
granted. And it has a live posture selector that already runs on every turn, feeding a
scaffolding-gate module that returns a constant.

### 1.2 What Phase 3 adds

Four structural additions and one ordering.

**(A) A named, closed control state.** The **Adaptation State Vector** (§5): six dials —
scaffold, hint, difficulty, pace, load, interleaving — each the standing parameter of exactly one
Category-F primitive, each with defined range, defined default, and defined behaviour when its
input signal is absent. Today these four to six quantities are decided implicitly, per turn, by
whichever prompt fragment happened to mention them. A closed vector makes adaptation *inspectable*:
a turn's support conditions become a value, not an impression.

**(B) Arbitration and stability — the two properties adaptive systems fail at.** Any control
system with more than one input needs a rule for conflict and a rule against oscillation.
Reconciliation found neither in the repository. §8 supplies arbitration: one dial per adjustment
(inherited from the corpus's own SLOW DOWN rule), a strict priority over pressures (inherited
from `decision-engine/02`), a reversibility ordering that moves cheap dials before expensive ones,
and — the sharpest of them — **a ban on averaging opposing pressures**, because a dial set to
satisfy two contradictory readings satisfies neither and destroys the diagnosis. §9 supplies
stability: dwell, rate limits, hysteresis, monotonic fade, freeze windows, and an oscillation
detector whose firing means *the dial is not the problem* and routes to diagnosis rather than to
another adjustment.

**(C) The two dials nobody defined as decisions.** Scaffolding (§10) and hints (§11) are named in
four documents — five, counting the implemented `scaffoldDial` — and specified in none as
*decisions*. (Pace and load, by contrast, turn out to be **existing normative budget keys with a
live implementation**; §0.7.4 records that as reuse, and this summary claims no novelty for them.) §10 defines the ladder, the fade law, the
asymmetric re-scaffold rule, the assessment ceiling, and — the one that inverts a common
intuition — the **expertise-reversal rule**, under which support above the learner's need is a
defect rather than a safe default. §11 defines the grant decision: one rung per request, the
answer is not on the ladder, a request inside the wait-time window is not a request, and hint debt
attaches to the evidence record or the evidence is a lie.

**(D) The missing rung.** Today the response to a struggling learner jumps from *refine* (same
representation, narrower scope) straight to *re-teach* (a new primary axis under the Difference
Operator). Between them sits the move a real teacher makes constantly — **same teaching, one
notch more support** — and it has no home in any document. §16 places it, and states the full
escalation order across all five owning authorities so that no rung is skipped silently and no
rung is spent past its budget.

**(E) One ordering, stated once.** §16's ladder is the deliverable a reviewer should test hardest,
because it is the only section that arranges *other people's components* into a sequence. If it is
wrong, it is wrong in a way that would make Phase 1 and `C-32` fight at runtime.

### 1.3 What Phase 3 deliberately does not do

It does not select a strategy, a phase, a method, or an action. It does not decide whether a
re-teach is different. It does not set the target success band or overrule the affect stop. It
does not detect affect, estimate confidence, classify misconceptions, or define a learner state.
It does not author a primitive, a hint, a probe, a protocol, or a blueprint field. It does not
resolve the three contradictions it found in other owners' documents. It introduces no new store,
no new evidence table, no new asset kind, and no new error code. And it makes **no claim that
adaptation causes learning** — adaptation quality is a process property, measured on TQ-7's Tier A
and attributed, if at all, on OSF's terms.

---

## 2. Design Principles

Ten principles, each stated so a future decision can be checked against it and found in violation.
Where a principle is inherited it says so; a renamed inheritance would be a duplicate.

**AP1 · The control plane is not the teaching plane.**
A dial move is never a turn. Adaptation parameterizes an action chosen elsewhere. *(New. Its
violation is the failure where the learner is managed rather than taught — C3-3.)*

**AP2 · One dial per adjustment.**
Two simultaneous adjustments may work and teach nothing about why. *(Inherited:
`decision-engine/07` §2's SLOW DOWN rule, `decision-engine/05`'s one-dimension-per-rung law, and
Phase 1 P8. Restated because it is the law Phase 3 most depends on, and its scope is widened from
escalation rungs to every adjustment.)*

**AP3 · Support and demand never move together.**
Scaffold and difficulty must not change in the same adjustment. A scaffolded harder item and an
unscaffolded easier one can produce identical performance, and the resulting evidence cannot be
attributed to either. *(New — the strongest consequence of AP2, and the reason §5.6's coupling
table is a prohibition rather than a closure.)*

**AP4 · Adaptation is bounded by commitment, not free of it.**
Dials move inside a committed strategy and a current arc phase. Adaptation that would only make
sense under a different approach is not an adjustment — it is evidence for abandonment, and it is
reported as such. *(Extends Phase 1 P4 to the control plane.)*

**AP5 · Every adjustment names its pressure.**
An adjustment with no recorded cause is a defect, not a nicety. Unattributable adaptation cannot
be debugged, cannot be attributed to outcomes, and is indistinguishable from drift. *(Inherited:
Phase 1 P1 and §9.4's explainability prediction.)*

**AP6 · Raising support is asymmetric with lowering it.**
Fade is the default direction; every increase is an event with a cause and lands one rung, never
at full support. *(New at the dial layer; mirrors `C-31`'s authored exit rule — resume one rung
below entry, never at zero — deliberately, because the same demoralization is at stake.)*

**AP7 · Never average opposing pressures.**
When two pressures point opposite ways on one dial, the diagnosis is wrong, not the setting.
Split the difference and you get a value nobody's state called for. *(New. This is the principle
most likely to be violated by a plausible implementation.)*

**AP8 · Adaptation must be safe when blind.**
With no usable signal the vector **holds**. It does not guess, and in particular it does not drift
toward ease — a system that softens whenever it cannot see is an assistant with extra steps.
*(New; the fallback architecture §21.2 is this principle's mechanism.)*

**AP9 · Support must be visible in the evidence it produced.**
Every learner production carries the dial state under which it occurred, or the evidence cannot be
ranked on the existing evidence hierarchy. *(Inherited: `assessment/05`'s hierarchy, EOS v2's
`AnswerObserved.scaffoldLevel`/`hintDebt`, Phase 2 §9.2's withdrawal logic. Phase 3 adds no new
requirement — it states the consequence of an existing one for two dials.)*

**AP10 · Reuse before creation, always.**
Checked before every object in this document; the reuse decision is recorded in §0.1. *(Inherited:
Phase 1 P10. Its application is why the dial set is six and not sixteen — see §5.3's exclusions.)*

---

## 3. System Overview and Layer Model

### 3.1 Two orthogonal questions

Phase 1's organizing insight was four *time scales*. Phase 3's is a second *dimension* on the same
scales: at every scale, teaching answers two independent questions.

```
                    WHAT                              HOW MUCH
                    (content of teaching)             (conditions of teaching)
 ─────────────────────────────────────────────────────────────────────────────────
 CURRICULUM         which concept        C-33         — (no dial; placement sets entry)
 CAMPAIGN           which approach       TQ-1         posture, standing dial profile   ★
                    which phase          TQ-2
 EPISODE            session shape        C-33         session-scale budget    C-33
 TURN               which action         C-30         dial values for this turn ★
 RE-TEACH           which axis           TQ-4         dial constraints on the attempt ★
```

The two columns are genuinely independent: the same analogy can be delivered at scaffold 1 or
scaffold 3, fast or slow, in one chunk or four, and those are different lessons. Conflating them
is what produces both classic failures — a system that changes *what* it teaches when it should
have changed *how much help*, and a system that quietly makes everything easier and calls it
personalization.

**The column is not a fifth time scale.** It runs at every scale, which is precisely why it needs
its own owner rather than being distributed across the four existing ones.

### 3.2 The seam with Phase 1 inside Layer 5

`TEACHING_PRIMITIVE_ARCHITECTURE.md` Part 8's Layer 5 — the Adaptive Lesson Orchestrator — is
described as doing three things: *monitors execution*, *fires adaptation rules*, *manages the
session arc*. Phase 1 took the first and third. Phase 3 takes the second. The seam, stated so
neither phase can claim the other's half:

| Layer 5 responsibility | Owner | Instrument |
|---|---|---|
| Monitor execution, detect failure, classify the trigger | **Phase 1 TQ-4** §7.2–§7.3 | trigger taxonomy + six-cause diagnosis |
| Manage the session arc, phase transitions, resumption | **Phase 1 TQ-2** §5 | the nine-phase arc |
| Protocol switches / approach change | **Phase 1 TQ-1** §4.6 | abandonment conditions |
| **Fire adaptation rules** | **★ Phase 3 AT-1…AT-6** | the ASV + arbitration + stability |
| Emit the next primitive / action | **`C-30`** | the action selector |

### 3.3 Component map

```
                  ┌──────────────────────────────────────────────────────────┐
                  │  PLANE 1 — PERCEPTION (existing, untouched)              │
                  │  Sensors · Twin · Mastery · Affect · D1 grid read        │
                  └──────────────────────────┬───────────────────────────────┘
                                             │ learner state (existing taxonomies)
                                             ▼
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │  ADAPTIVE CONTROL PLANE                                    ★ PHASE 3           │
 │                                                                                │
 │   ┌──────────────┐   states→pressures   ┌──────────────┐                       │
 │   │ AT-3 POSTURE │──────────────────────▶│ AT-4 PRESSURE│                      │
 │   │ ENGINE       │  posture biases       │ MODEL        │                      │
 │   │ (extends the │  which pressures      └──────┬───────┘                      │
 │   │  live 7-set) │  are admissible              │ pressure set                 │
 │   └──────────────┘                              ▼                              │
 │                                          ┌──────────────┐                      │
 │                                          │ AT-5 ARBITER │  one pressure wins    │
 │                                          └──────┬───────┘  (never an average)  │
 │                                                 ▼                              │
 │   ┌──────────────┐   proposed move      ┌──────────────┐                       │
 │   │ AT-2  ASV    │◀─────────────────────│ AT-6 STABILITY│ dwell · rate ·       │
 │   │ 6 dials      │    committed move    │ GOVERNOR      │ hysteresis · freeze  │
 │   └──────┬───────┘                      └──────────────┘  · oscillation        │
 │          │                                                                     │
 │   AT-7 scaffold · AT-8 hint · AT-9 pace · AT-10 difficulty · AT-11 load        │
 │   AT-12 misconception/confusion response · AT-13 escalation order              │
 │   AT-14 campaign interaction (to/from TQ-1, TQ-2)                              │
 └───────────────────────────────┬────────────────────────────────────────────────┘
                                 │ AdaptationConstraint (Band 2 legality, subtractive)
                                 │ AdaptationParameters (Band 5 personalization)
                                 ▼
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │  TURN SCALE (existing, untouched)                                              │
 │  C-28 Band 0 interrupts → Band 1 obligations → Band 2 legality (subtractive)   │
 │       → Band 3 authored dispatch → Band 4 policy → Band 5 personalization       │
 │       → Band 6 tie-break → C-30 → C-34 → C-35 → C-36 → C-37                    │
 │  (EOS v2 / kernel/policy numbering — §0.6.2. C-31 preempts at Band 0.)          │
 │  C-32 holds the target band, the withholding policy and the affect veto        │
 └───────────────────────────────┬────────────────────────────────────────────────┘
                                 ▼
                    Ledger (adjustment + outcome join) → TQ-7 Tier A/D · OSF
```

**The single most important property of this diagram:** Phase 3 adds **one** constraint source at
Band 2 and **one** personalization supply at Band 5, and **zero** decision authorities. Both are
existing band semantics rather than new mechanisms (§0.7.1). It never runs at Band 0 or Band 1;
`C-31` preempts it exactly as it preempts everything else.

### 3.4 The one-authority rule, restated per question

| Question | Single authority | Phase 3 relationship |
|---|---|---|
| What is the learner's state? | Plane 1 / `decision-engine/02` | consumer only |
| Which concept, approach, phase, method, action? | `C-33` / TQ-1 / TQ-2 / TQ-1 / `C-30` | consumer only |
| Is the learner ready to advance? | `C-29` **alone** | no dial advances anything |
| Is this re-teach genuinely different? | **TQ-4** | Phase 3 constrains the attempt; TQ-4 judges difference |
| What is the target success band? | **`C-32`** | consumer only; Phase 3 never sets it |
| Is the learner distressed, and what then? | `C-19` detects, **`C-31`** acts | Phase 3 yields entirely |
| May the answer be withheld? | **`C-32`** withholding policy | Phase 3's hint ladder stops short of the answer (§11.3 HL-2) |
| Which adaptive posture is this? | **AT-3** | new — extends the live 7-set |
| How much support, right now? | **AT-2 / AT-7 / AT-8** | new |
| Is this adjustment legal as a control move? | **AT-6** | new |
| Which single pressure is answered? | **AT-5** | new |
| Has adaptation been exhausted? | **AT-13**, reported to **TQ-1** | new signal; TQ-1 decides |
| Which rule wins when two collide on a field? | **`kernel/policy/engine.ts`** | sole owner (`README.md` §3); AT-5 arbitrates *pressures*, never rules (§8.3) |
| What move is this turn? | **`kernel/policyMove.ts`** | sole owner (`README.md` §3); Phase 3 selects no move |
| Does this dial move consume Phase 1's re-teach budget? | **§9.4a** (BB-1 ∧ BB-2), enforced at Band 2 | new rule; Phase 1 §7.7 remains the budget's owner |
| What is a normative constant's value? | **`RS §18`** | consumer only; new governor constants are proposals against RS §18 (§19.3) |
| Did learning occur? | OSF | Phase 3 makes no claim |

### 3.5 Data dependencies

Phase 1 §3.4's five-level status vocabulary is reused verbatim: **PRESENT** (directly
instrumented) · **PARTIAL** (some channels/learners/concepts) · **PROXY** (substitute with a
declared error profile) · **PLANNED** (designed, not built) · **ABSENT** (`ABSENT-GATED` if
blocked on G1/G2). An architecture whose inputs do not exist is a wish, so every input carries its
status, owner, acquisition path, and **defined behaviour when absent**.

| Field | Consumer | Status | Owner | Acquisition | Behaviour when absent |
|---|---|---|---|---|---|
| Correctness per response | AT-4 (D1 grid) | **PRESENT** | Runtime signals | already captured | n/a |
| **Response latency** | AT-4 (D1 grid speed axis), AT-9 | **PRESENT** | Runtime | server-measured at ingress; already written to `PROBE_OUTCOME` | n/a |
| **Response confidence** | AT-4 (D1 grid confidence axis) | **PROXY** | Runtime signals | LLM self-report; error profile unmeasured | Declare the proxy at every use (Phase 1 R14). Where absent, the D1 grid degrades to a 2×1 read and MISCONCEIVING/CONFUSED cannot be separated → §15.3's disambiguation goes to its safe branch |
| Mastery level / ladder rung | AT-3, AT-10 | **RECORDED** | Plane 1 / ADR 07 | — | n/a |
| ACTIVE misconception set | AT-3, AT-12 | **RECORDED** | Plane 1 | — | Dial freeze (§15.2) cannot be triggered by state; falls back to trigger-based entry only |
| The 5 posture input signals (mastery, misconception confidence, transfer, calibration, momentum) | AT-3 | **PRESENT** | `src/lib/school/adaptive/*` | already computed and folded per turn | Each contributes `null`; the existing selector already treats null as "no data" |
| **`scaffoldLevel` on evidence records** | AT-7, AP9 | **PLANNED** | EOS v2 `AnswerObserved` specifies it; ADR 13's canonical tables do not carry it | AH-6 | **Evidence cannot be ranked assisted-vs-unassisted.** AT-7 still sets the dial, but §10.5's contract is unenforceable and fade decisions run on turn-local knowledge only |
| **`hintDebt` on evidence records** | AT-8, AP9 | **PLANNED** | same | AH-6 | `MasteryCondition {hintDebt: 0}` (CEKR) becomes uncheckable — a **pre-existing** consequence Phase 3 inherits and reports, not one it creates |
| Authored hint ladder per item/concept | AT-8 | **ABSENT-GATED** (schema PRESENT, content near-empty) | CEKR/EBC schema exists; authoring is the Curriculum/Brain program's | Authoring, G1-gated | **AT-8 goes INERT** for that item: no rung is granted, and the turn falls through to `C-32`'s withholding policy unchanged. Deliberately inert rather than improvised — a fabricated hint has no easier-than proof and may hand over the answer |
| Concept-intrinsic dial bounds (minimum viable step size, irreducible load) | AT-10, AT-11 | **ABSENT** | Blueprint Specification (Pappu) / KG (Pipeline) | A blueprint field; recorded as AF-7 | Dials use archetype-level defaults; the concept cannot declare "this cannot be decomposed further" and the system may attempt an illegal decomposition |
| **Working-capacity estimate** | AT-11 | **ABSENT** | no instrument exists anywhere | not designed here | **AT-11 runs on proxies only** (§14.3), and every load decision is marked `capacityUnknown`. This is Phase 1's own recorded gap, inherited |
| Measured attention span, persistence profile | AT-6 (dwell personalization), AT-10 (band personalization) | **PARTIAL** | `student-state/05` authored; instrumentation partial | — | Universal defaults; personalization inert below a minimum-evidence threshold |
| Per-learner recovery speed / what-restores | AT-6 SG-8 | **PARTIAL** | `student-state/06` | — | Universal post-recovery re-entry rung |
| ASV persistence across turns and sessions | all | **ABSENT** | ADR 10 (AH-2) | capture, not derivation | **The whole control plane is inert.** Without persistence there is no standing state to move, and every turn re-decides — which is exactly today's behaviour. This is §25 Stage 1's entire purpose |
| Adjustment records (pressure, dial, direction, cause) | AT-1, §20 | **ABSENT** | `C-28` decision record (AH-3) | capture | No adaptive metric is computable; §20 is inert |
| Population dial-effectiveness evidence | §19.4, §22.2 | **ABSENT** (accrues post-launch) | Evidence Engine / ADR 13 | accrues after Stage 1 | Deterministic defaults; no learned policy |

**The honest summary.** Of eighteen inputs, four are PRESENT, one RECORDED-plus-PRESENT, three
PARTIAL, one PROXY, two PLANNED, and seven ABSENT — and **the two most load-bearing absences are
both capture, not computation**: the vector itself and the adjustment record. That is the same
shape as Phase 1's AttemptVector finding, it has the same resolution (a persistence change at
`C-28`, G2-gated), and §25 sequences it first for the same reason. The dominant *content* absence
is the hint ladder: the schema and its compile-time proof exist; the authored rungs largely do
not. **AT-8 is complete as logic and near-empty as content**, which is Phase 1 R1 recurring, and
is stated rather than smoothed.

---

## 4. AT-1 · The Adaptive Control Loop

### 4.1 Why it exists

Adaptation today is an emergent property of prompt text. Several advisory blocks mention support,
difficulty and pacing; none of them holds state; the model reconciles them by fluency. That
produces the two symmetrical failures a control loop exists to prevent: **drift** (the settings
wander with no cause and no record) and **thrash** (they swing on the last data point).

A loop is not a new engine. It is the statement of *when* the control plane runs, *what it reads*,
*what it may emit*, and *what it is forbidden to do* — expressed inside `C-28`'s existing bands so
that it cannot become a second kernel.

### 4.2 Purpose

Maintain the Adaptation State Vector across turns and sessions: observe, derive pressures,
arbitrate to at most one, check the move for control legality, commit it with its cause, and
publish the resulting constraints and parameters to `C-28`.

### 4.3 The cycle

```
 ── every turn, inside C-28, after Band 1 clears ──────────────────────────────

  1  READ        Learner state (Plane 1), the D1 grid read of the last
                 response, the committed strategy + arc phase (Phase 1),
                 the standing ASV.
                 Reads only published outputs. Reads no component's internals.

  2  POSTURE     AT-3 resolves the adaptive posture (or holds the current one
                 under its own dwell rule).

  3  PRESSURE    AT-4 maps states to a set of directional pressures on named
                 dials. Zero pressures is the common and correct case.

  4  ARBITRATE   AT-5 selects AT MOST ONE pressure to answer this turn.
                 Records every pressure it did not answer.

  5  PROPOSE     The owning dial component (AT-7…AT-11) proposes a move:
                 one dial, one step, in the pressured direction.

  6  GOVERN      AT-6 accepts, defers, or rejects the move on control-legality
                 grounds (dwell, rate, hysteresis, freeze window, oscillation).
                 A rejected move is recorded; it is never silently dropped.

  7  COMMIT      The ASV is updated and the adjustment record EMITTED as an event:
                 { dial, from, to, pressure, evidence, posture, rejectedPressures[],
                   arcPhase, strategyId, policyVersion, dialSetVersion,
                   consumesReteachBudget: bool }        -- §9.4a
                 EMITTED, never written. RS §13 forbids the Policy Engine from
                 performing Evidence writes; the Evidence Store appends, exactly
                 as it does for the engine's existing events. No new writer is
                 created and Permanent Rule 14's single-writer invariant holds.
                 (Corrected v3.1.0 — v3.0.0-draft said "written".)

  8  PUBLISH     AdaptationConstraint[]  → Band 2  (subtractive legality — EOS v2
                                          semantics, not a new mechanism; §0.7.1)
                 AdaptationParameters    → Band 5  (personalization; MUST NOT alter
                                          budgets — it SELECTS shipped RS §18 values)

 ── steps 2–7 are SKIPPED entirely when Band 0 or Band 1 fires ────────────────
```

**Step 8 runs even when steps 2–7 are skipped.** During recovery the vector still publishes — it
publishes the *held* values, plus the recovery clamp (§9 SG-8). A control plane that goes silent
under preemption would leave `C-30` unparameterized at precisely the moment support matters most.

### 4.4 Determinism

The loop is a **pure function** of its published inputs and the standing vector. Same inputs, same
vector, same output — always. Three consequences, all deliberate:

- Trajectories **replay deterministically**, satisfying `eos-v3/01`'s ledger and replay
  requirement, which Phase 1 §11.1 also depends on.
- The loop makes **no LLM call**, in conformance with Permanent Rule 9 (one probabilistic
  component per turn). Every step is enum comparison and table lookup. This is not an efficiency
  claim; it is a legality constraint, and any future design that wants a model in this loop is
  proposing a rule change and must say so.
- Where a learned dial policy is eventually desirable (§22.2), it enters as a **tie-break under
  the same containment pattern the tactics band already uses** — as a ranking over moves the
  governor has already declared legal, never as a replacement for the governor.

### 4.5 Responsibilities

Owns loop sequencing, the adjustment record, and publication. **Must not own** learner state
(Plane 1), the target band or the veto (`C-32`), legality of actions (`C-29`), action choice
(`C-30`), recovery (`C-31`), the campaign objects (TQ-1/TQ-2), or difference judgement (TQ-4).

### 4.6 Failure modes

- **Loop-as-kernel drift.** The loop accumulates responsibilities until it is deciding turns.
  Mitigated structurally: its only outputs are a narrowing constraint set and a parameter set, and
  neither can name an action.
- **Silent no-op turns.** Most turns produce no adjustment, which is correct, but a loop that
  records nothing on those turns loses the denominator every §20 metric needs. Mitigated by
  recording the *pressure set* even when it is empty.
- **Publication without state.** With ASV persistence ABSENT (§3.5) the loop runs, publishes
  defaults, and looks healthy while adapting nothing. This is the most likely early-implementation
  failure and it is invisible without §20's dial-movement metric.

### 4.7 Falsifiable prediction

*Turn-to-turn variance in the published support parameters falls sharply under a governed loop
relative to ungoverned per-turn derivation, without a fall in the rate at which genuine pressures
are answered.* If variance falls **and** answered-pressure rate falls with it, the governor is
merely suppressing adaptation and its dwell constants are wrong.

---

## 5. AT-2 · The Adaptation State Vector

### 5.1 Why a vector rather than four outputs

`C-32` names four outputs — difficulty target, hint policy, scaffolding level, withholding
decision. Four independent outputs cannot express the one property that matters most: **they
interact**. A harder item at higher scaffold is not obviously harder. A faster pace at higher load
is not obviously faster. Treating them as separate outputs makes AP3 unstatable and makes every
outcome unattributable.

A vector also gives adaptation an **identity**, which is what makes it comparable across turns,
across learners, and against outcomes — the same argument Phase 1 made for the AttemptVector, at a
different layer and for a different purpose.

### 5.2 The dials

A **closed, enumerated set**. Closure is deliberate, for the reasons Phase 1 §4.4 gave: an open
set cannot be arbitrated over, cannot accumulate evidence, and cannot be tie-broken
deterministically. Amendment is by version (§5.7), never at runtime.

Admissibility test (C3-1): **every dial is the standing parameter of exactly one Category-F
primitive.** The mapping is the set's justification, not a decoration.

| # | Dial | Range | Primitive | What it controls | Default |
|---|---|---|---|---|---|
| **D1** | **SCAFFOLD** | `0–4` (0 = full worked, 4 = solo) — **EOS v2's scale, adopted verbatim** | **P81 SCAFFOLDING / P82 FADING** | the standing degree of structural support in the learner's production | phase-determined (§10.3) |
| **D2** | **HINT** | ladder rung: `H0` (none granted) … `Hn`, where the ladder and `n` are CEKR/EBC's per item | **P81** (transient grant) | which authored hint rung has been granted on the current item | `H0` |
| **D3** | **DIFFICULTY** | offset in item-difficulty steps relative to the learner's current frontier for this concept | (no single primitive — item selection) | the demand of the next item | frontier + 0 |
| **D4** | **PACE** | three sub-settings: new-element rate, turn density, wait-time multiplier | **P85 PACING CONTROL / P55 WAIT TIME** | how much arrives per turn and how long the learner is given | archetype default |
| **D5** | **LOAD** | element budget per turn + decomposition level | **P84 LOAD MANAGEMENT** | how many simultaneous elements the learner must hold | archetype default |
| **D6** | **INTERLEAVING** | `blocked` … `interleaved` (ordered) | **P83 INTERLEAVING CONTROL** | whether practice mixes concepts | `blocked` within a campaign |

**D4 and D5 are existing normative constants, not new dials (recorded v3.1.0 — B2).**
`RS §18` — "the only normative source for constants" under the authority ladder — already ships
`budgets.paragraphs.{beginner,intermediate,expert}` and their `strained` variants, `budgets.
maxNewTerms`, and `budgets.maxNewElements` labelled *"load filter"*. `conversationState.ts`'s
`responseBudget(register, consecutiveFailures)` is their live implementation. **D4's turn-density
and new-element-rate sub-settings and D5's element budget therefore REUSE existing keys.** What
Phase 3 adds for them is the controller, not the quantity: dwell, hysteresis, rate limiting, and a
pressure that selects among the shipped values on a richer state read than
`consecutiveFailures >= 2`. Two consequences follow and both are constraints, not licences:
**(i)** the dial **selects a shipped value and never alters one**, which is what keeps it legal at
Band 5 (whose contract forbids altering budgets — §0.6.2); **(ii)** changing what the shipped
values *are* is a BrainConfig amendment against RS §18, which Phase 3 neither performs nor
requests.

**D3 has no Category-F primitive and is admitted anyway** — stated rather than hidden. Difficulty
is realized by *item selection*, which is `C-30`/`C-14` territory, not by a regulation primitive.
It is in the vector because it is one of `C-32`'s four named outputs and because AP3 is
unstatable without it. **Consequence:** D3 is the one dial Phase 3 does not own end-to-end. It
publishes a *target*; `C-30` selects the item. A reviewer should treat D3 as the weakest member of
the set (AQ-2).

**D2 is a transient, not a standing setting**, and is in the standing vector only so that
`hintDebt` accumulates against the item. It resets to `H0` on every new item. §11.5 states why
mixing a transient into a standing vector is the lesser evil.

### 5.3 What is deliberately NOT a dial

Exclusions matter more than inclusions in a closed set, because each one is a boundary someone
will later want to cross.

| Excluded | Why | Owner |
|---|---|---|
| **Modality / channel** | It is Phase 1 axis 1 and a Phase 2 decision. P86 MODALITY SWITCHING is a *move*, not a standing level. Making it a dial would create a second modality authority. | Phase 1 / Phase 2 |
| **Representation** | Phase 1 axis 3. Changing it is a re-teach, not an adjustment. | TQ-4 |
| **Method** | Phase 1 axis 2, sequenced by TQ-1. | TQ-1 / TQ-3 |
| **Agency** | Phase 1 axis 7 — and the per-attempt projection of D1 (§5.4). Two names for one quantity would guarantee divergence. | Phase 1, projected |
| **Granularity** | Phase 1 axis 6 — the per-attempt projection of D5's decomposition setting. | Phase 1, projected |
| **Register / tone / warmth** | The Relationship Engine (`C-40`) and the conversation registers (`decision-engine/06`). **Register never drops on error** is an authored law; a warmth dial would let it. | `C-40` |
| **Session length / budget** | `C-33`, session scale. | `C-33` |
| **Review interval / spacing** | The Review Scheduler and the memory engine. Spacing is a schedule, not a control setting. | Review Scheduler |
| **Withholding (answer-give)** | `C-32`'s named policy. §11.3 HL-2 stops the hint ladder short of it deliberately. | `C-32` |
| **Affect / encouragement** | `C-19` detects, `C-31` acts. A "reassurance dial" is a recovery authority in disguise. | `C-19` / `C-31` |

**Ten exclusions to six inclusions.** That ratio is the point: nearly everything that *feels*
adaptive is already owned, and the residue is small and specific.

### 5.4 Projection onto Phase 1's attempt axes — the reconciliation that keeps both operators intact

Three dials have per-attempt projections in Phase 1's eight-axis set. Left unstated, this would be
two authorities over one quantity — exactly the defect Phase 1 §17.2 names as *inventing an
existing class*.

| ASV dial (standing) | Phase 1 axis (per attempt) | Relationship |
|---|---|---|
| **D1 SCAFFOLD** | **axis 7 AGENCY** (`tutor-does < joint < learner-does`) | Axis 7 is the **per-attempt projection** of D1. `scaffoldDial 0` projects to `tutor-does`; `4` projects to `learner-does`; the middle rungs project to `joint`. |
| **D5 LOAD** (decomposition level) | **axis 6 GRANULARITY** (`whole < decomposed < atomic-step`) | Axis 6 is the per-attempt projection of D5's decomposition setting. Phase 1 §7.3 already routes diagnosis **C4 cognitive-load overflow → axis 6**, which is this projection stated from the other side. |
| **D3 DIFFICULTY** | — (no axis) | Difficulty is not an attempt property in Phase 1's model; a harder item is not a different *teaching*. Correctly absent from the axis set. |

**The two-lock rule.** When a move changes a quantity that has both a dial and an axis, it must be
legal **twice**:

```
 A re-teach whose primary axis is 6 or 7 is ALSO a dial move on D5 or D1.
 It is executed only if:
    (i)  TQ-4 declares it legal as a DIFFERENCE   — L1…L5, closure, not in failedAttempts
    (ii) AT-6 declares it legal as a CONTROL MOVE — dwell, rate, hysteresis, no freeze window
 Either authority may refuse. NEITHER may overrule the other.
 Both are narrowing, so two locks can only ever reduce the legal set — never expand it.
```

This is the correct resolution rather than a compromise: the two authorities are asking genuinely
different questions. *Is this different teaching?* and *is this a stable control move?* have
independent right answers, and a system that answers only the first will re-teach at a new agency
level three turns running because each individual change was "different."

**Directional note.** A dial move that is *not* a re-teach (no failure occurred; the pressure was
boredom or load) does not invoke TQ-4 at all. Only lock (ii) applies. TQ-4 is a re-teach authority,
not a general change authority, and Phase 3 must not inflate it into one.

**Budget consequence (added v3.1.0 — blocking issue B3).** A move that passes both locks is a
re-teach *and* a control move, and it therefore **consumes Phase 1 §7.7's re-teach budget**. The
two-lock rule was never intended to create a cheaper name for a budgeted act. §9.4a states the
rule, §16.1 narrows the missing-rung claim to the four dials it actually holds for, and §16.3's
EL-7 places the resulting boundary inside the escalation order.

### 5.5 Where the vector lives

- The ASV is **per learner × per concept**, standing across turns and sessions — the same scope as
  a Phase 1 campaign, and for the same reason: a support level earned on fractions says nothing
  about ratios.
- Session-scoped elements (D2 hint rung, and D4's wait-time multiplier under fatigue) reset on the
  session boundary that `decision-engine/07` §8 already defines. Phase 3 defines **no new session
  boundary**.
- It is **not** carried in `lessonStageProgress`. That key is ADR 09's and TQ-2's, and it holds
  arc position. Adding control state to it would give one key two owners — precisely the defect
  TQ-2 avoided by adopting ADR 09's key for arc position and nothing else.
- Its home is an **existing** ADR 10 store (AH-2). Phase 3 proposes no store and defines no schema.

### 5.6 Coupling: a prohibition, not a closure

Phase 1's axes are correlated, so it needed `closure()` — a function returning the changes a
primary change *forces*. The dials are different in kind, and this is worth stating precisely
because the obvious move would be to copy the closure mechanism.

**The dials are near-independent by construction.** Each is the parameter of a distinct
regulation primitive, and the primitive taxonomy separated them because they are separately
controllable. There is no dial whose movement *forces* another to move.

There is, however, one pair whose movements **confound each other's evidence**:

```
 D1 SCAFFOLD ↑  makes an item easier to complete
 D3 DIFFICULTY ↓ makes an item easier to complete

 Moving both in one adjustment produces a performance change that cannot be
 attributed to either. Moving them in OPPOSITE directions in one adjustment
 produces a change that may be invisible while both underlying settings moved.
```

**AP3, stated as the rule: D1 and D3 MUST NOT change in the same adjustment.** Not "should
rarely" — must not. This is a prohibition rather than a forcing relation, and it is why Phase 3
publishes a **coupling prohibition table** rather than a dependency matrix:

```
 PAIR                       RELATION            RULE
 ─────────────────────────────────────────────────────────────────────────
 D1 SCAFFOLD × D3 DIFFICULTY  confounding        MUST NOT co-move (AP3)
 D2 HINT     × D1 SCAFFOLD    confounding        A hint grant MUST NOT raise D1
                                                 (§11.5 — transient vs standing)
 D4 PACE     × D5 LOAD        correlated,        MAY co-move ONLY under an
                              not confounding    explicit recovery or first-lesson
                                                 clamp, which is a profile, not an
                                                 adjustment (§21.3)
 D6 INTERLEAVING × all        independent        no constraint
 all other pairs              independent        no constraint
```

**Why this is safer than a closure matrix.** Phase 1 §12 R4b names over-permissive closure as the
Difference Operator's principal residual risk: a `•` that is not genuinely forced turns a
constraint into a licence. A prohibition table has no such failure mode — it can only ever forbid.
The cost is that a genuinely forced coupling, if one is later discovered, cannot be expressed and
would have to be handled as two sequenced adjustments. That cost is accepted, and the trade is
recorded in §24 T3.

### 5.7 Versioning

Following Phase 1 §4.3's V-1/V-2/V-3 verbatim in structure, because divergent versioning rules
across two vectors in one system would be its own defect:

- **AV-1** Every persisted ASV and every adjustment record carries `dialSetVersion`. Vectors under
  a retired dial set remain readable and are **not comparable** across versions.
- **AV-2** Dial-effectiveness evidence is version-scoped and never silently carried forward.
  Changing a dial's range or semantics starts a new evidence lineage.
- **AV-3** Every amendment declares its migration per record class — `CARRIED`, `SCOPED`, or
  `RETIRED`. An amendment with no declared migration is rejected at review.
- **AV-4** A dial may be added only if it passes the admissibility test in AV-5 **and** its
  movements are not expressible as a combination of existing dials. A dial that is a blend of two
  others is a preset, not a dial (§22.1).
- **AV-5 · The admissibility test, restated in two clauses (strengthened v3.1.0 — improvement I5).**
  v3.0.0-draft stated C3-1 as "one Category-F primitive per dial" and then admitted D3, which has
  none — a closure rule with an exception on its first application. The rule is now stated to
  cover the case it always had to:

  > A dial is admissible iff it is the standing parameter of **either** (a) a Category-F
  > regulation primitive with no existing dial, **or** (b) an existing **normative BrainConfig key
  > under RS §18** with no existing dial. Nothing else is admissible.

  Under (a): D1 (P81/P82), D2 (P81), D4 (P85/P55), D5 (P84), D6 (P83). Under (b): D4 and D5 also
  qualify (`budgets.*`), which is corroboration rather than duplication. **D3 DIFFICULTY qualifies
  under neither** and remains the set's one admitted exception — now an *explicit, bounded* one
  rather than a silent breach of the rule stated a paragraph earlier. Its justification is that
  `C-32`'s charter names it and AP3 is unstatable without it; its cost is recorded in W4/AQ-2 and
  its authority is confined to publishing a target that `C-30` realizes (§13.2).

### 5.8 Responsibilities

Owns the dial set, ranges, defaults, the coupling prohibitions, projection onto Phase 1's axes,
and version discipline. **Must not own** any dial's *pedagogy* (AT-7…AT-11 own that), when a dial
moves (AT-5/AT-6), or what an action is (`C-30`).

### 5.9 Failure modes

- **Dial sprawl.** Six becomes sixteen and the vector stops being arbitrable. Mitigated by AV-4
  and C3-1; the Category-F primitive set is finite and frozen, which bounds the dial set at six
  plus D3.
- **Projection divergence.** D1 and axis 7 drift apart because two components write them
  independently. Mitigated by the two-lock rule making them a single decision with two checks —
  but **unmitigated at the schema level** until AH-3 lands them in one field group. This is the
  concrete reason AH-3 asks for one group rather than two.
- **Vector as a personalization profile.** The vector accumulates a per-learner "style" and stops
  responding to state. Detected by §20's dial-movement metric approaching zero with pressures
  still firing.

### 5.10 Falsifiable prediction

*Support conditions recorded as a vector will show that a material share of learner productions
currently counted as evidence occurred at non-zero scaffold or non-zero hint debt.* If the share
is near zero, either the dials are not moving (§5.9) or the system was already teaching unassisted
throughout — and in the second case AP9 is cheap insurance rather than a correction.

---

## 6. AT-3 · The Adaptive Posture Engine

### 6.1 Posture is not archetype — and this is the finding that shaped the section

Reconciliation found a live, deterministic, seven-valued selector already running on every turn in
both School and Library sessions (ADR 02), fed by five signal engines, logged to
`TeachingStrategyEvent`, and read back for stalemate detection. The naive Phase 3 move — inventing
an "adaptive mode" enum — would have re-created it.

The two sets are orthogonal, and stating why is what keeps them from becoming rivals:

| | **Archetype** (Phase 1 TQ-1) | **Posture** (this section) |
|---|---|---|
| Answers | *How will this concept be taught?* | *What stance does this learner's current state require?* |
| Scope | one concept-attempt (campaign) | learner × topic, re-evaluated per turn |
| Selected from | concept knowledge type, prerequisites, assets | mastery, misconception confidence, transfer, calibration, momentum |
| Changes when | the approach fails (abandonment) | the learner's state changes |
| Values | A1…A9, closed | the live 7, closed |
| Effect | sequences methods, instantiates the arc | **biases which pressures are admissible and which dials they may touch** |

A learner can be in `A1 CONCRETE-FIRST` (archetype) while in `CONFIDENCE_BUILDING` (posture), and
both are true statements about different questions. ADR 08 already carries this distinction as the
**Posture / Action** split; Phase 1 §0.2 preserved it; §6 is where the Posture half finally gets a
specification. Recorded as AH-5.

### 6.2 The posture set

**Adopted verbatim from the live selector. Phase 3 adds no posture and renames none.**

| Posture | Live trigger (unchanged) | Adaptive meaning — what Phase 3 adds |
|---|---|---|
| `FOUNDATION_REBUILD` | mastery `AT_RISK`; or beginner evidence | Demand is capped; D3 may not rise; D1 fade is slowed. The posture in which support is cheap and challenge is expensive |
| `MISCONCEPTION_REPAIR` | misconception confidence `HIGH`; or `FALSE_MASTERY` + any misconception | **The dial-freeze posture** (§15.2). Support must not rise during collision; difficulty must not fall |
| `MOMENTUM_RECOVERY` | `DISENGAGEMENT_RISK` or `DECLINING_MOMENTUM` | D4 pace and D5 load lead; D3 is held. The posture in which the problem is rhythm, not demand |
| `CONFIDENCE_CORRECTION` | `OVERCONFIDENT` + `FALSE_MASTERY` | D1 fade is **accelerated** and D3 may rise — the one posture where increasing demand is the corrective act |
| `APPLICATION_FOCUS` | transfer `WEAK` with a mastery base | D6 interleaving leads; D1 held low |
| `CONFIDENCE_BUILDING` | `UNDERCONFIDENT` | Success density is protected: D3 held or lowered, D1 held. Performance already outpaces belief, so demand is not the lever |
| `ACCELERATED_GROWTH` | `TRUE_MASTERY` + `TRANSFER_STRONG` + strong momentum | D3 and D6 lead; D1 → 4. The compaction-adjacent posture (`decision-engine/07` §3) |

**The added column is the entire contribution.** Today a posture is selected and then used to
bias prompt text — through a module that returns a constant (AC-3). §6.2 makes a posture mean
something checkable: *which pressures are admissible, and which dials they may move*.

### 6.3 Posture transitions

- **Selection is the live procedure, unchanged.** Priority-ordered, first match wins, nulls mean
  "no data", `foundationBias` supplies the unknown-learner default. Phase 3 re-derives none of it.
- **Dwell is added.** The live selector has no dwell: it re-derives every turn from folds that can
  flip on one response. §9 SG-1 applies to posture as to dials — a posture holds for a minimum
  evidence count unless a higher-priority posture's trigger fires. *This is a genuine addition and
  a genuine change in behaviour*, and it is recorded as a proposal (AH-5), not applied.
- **The stalemate rotation is retained and re-grounded.** `excludeStrategy` rotation on three
  repeats of an unmastered topic is a live anti-thrash mechanism. §9.5 keeps it and adds the
  missing half: rotation on *count* is a weaker signal than rotation on *no state change*, and a
  rotation that fires with the learner's state genuinely improving is a false positive. Recorded
  as AF-6.
- **Posture never preempts.** A posture change is not a recovery, not an abandonment, and not a
  phase transition. It changes which pressures are admissible on the next pass and nothing else.

### 6.4 Responsibilities

Owns the mapping from posture to admissible pressures and permitted dials, and posture dwell.
**Must not own** the five input signals (existing engines), the posture trigger rules (live,
unchanged), strategy selection (TQ-1), or state classification (`decision-engine/02`).

### 6.5 Failure modes

- **Posture/archetype conflict.** `ACCELERATED_GROWTH` under an `A1 CONCRETE-FIRST` strategy wants
  demand the archetype's commitments forbid. Resolved by AP4: the strategy's `commitments[]` are
  Band-2 MUSTs and win; the posture's pressure is recorded as *unanswerable under the current
  strategy*, and a run of those is exactly the evidence TQ-1's abandonment conditions consume
  (§17.3). **This is not a defect; it is the intended reporting path.**
- **Posture thrash on thin folds.** Momentum and calibration are volatile. Mitigated by dwell,
  which does not exist today.
- **Posture as identity.** A learner is left in `FOUNDATION_REBUILD` indefinitely because the
  posture suppresses the demand that would produce evidence to leave it. **This is the most
  serious failure mode in the section** — it is self-sealing. Mitigated by §20's posture-residency
  counter-metric, which treats long residency in any demand-capping posture as a defect signal
  against the posture's own exit condition rather than as a fact about the learner.

### 6.6 Falsifiable prediction

*Adding dwell reduces posture switches per session without reducing the rate at which a posture
change is followed by an improvement in the signal that triggered it.* If improvement-following
rate drops, dwell is too long and is suppressing genuine responsiveness.

---

## 7. AT-4 · The Pressure Model

### 7.1 Why pressures rather than rules

The obvious design is a rule table: state → dial move. It fails for a reason worth stating,
because the failure is not obvious until two states fire at once: a rule table has no way to
express *disagreement*. Two rules that both match produce two moves, and the system either applies
both (violating AP2) or applies whichever ran last (violating everything).

A **pressure** is a rule's output before it becomes an action: a named, directional, attributable
demand on one dial. Pressures can coexist, be counted, be ranked, and be *rejected with a record*.
That last property is what makes adaptation debuggable — Phase 1 made `alternativesRejected[]`
mandatory for the same reason, and §7.4 makes the pressure analogue mandatory for that reason too.

### 7.2 Pressure sources — all existing, none new

**Phase 3 defines no learner state and no detector.** Every pressure derives from a taxonomy that
already exists.

**Placement (added v3.1.0 — B2, the one duplication found).** `src/lib/kernel/policy/basePack.ts`
already encodes the D1 grid as Band-4 rules — `B4.d1.misconceiving.v1`, `B4.d1.fragile.v1`,
`B4.d1.confused.v1`, each citing `foundations/02 §1`, the same source this table derives from. Two
mechanisms reading one authority to produce turn effects is a duplication. It is eliminated by
**placement, not redesign**: the pressure rules below are authored as **Band-4 rules in the
existing pack, evaluated by the existing engine**, sitting alongside the `B4.d1.*` rules and
extending the same quadrant reading from moves to dials. Every pressure keeps its wording, its
source and its justification; what is withdrawn is any implication of a second deriver. §0.7.1
carries the full mapping.

| Source (existing authority) | Reading | Pressure |
|---|---|---|
| **`foundations/02` D1 grid** — FLUENT MASTERY | fast + correct + confident | `DEMAND↑` on D3; `SUPPORT↓` on D1 |
| **D1 grid** — FRAGILE | slow-correct or hedged-correct | `HOLD` — an explicit *null* pressure that **blocks** other pressures on D1/D3 (§9 SG-6). The corpus's authored response is *hold, one more of the same*; a dial move here would contradict it |
| **D1 grid** — CONFUSED / GUESSING | slow + wrong | `SUPPORT↑` on D1 **or** `LOAD↓` on D5 — disambiguated by §15.3 |
| **D1 grid** — MISCONCEIVING | fast + wrong | **No dial pressure.** Routes to the misconception track; §15.2 freezes the dials |
| **`decision-engine/02`** affect states | distress, shame, fatigue | **Not a pressure.** `C-31` preempts (§8 AR-1). Phase 3 emits nothing |
| **`decision-engine/02`** drive states — BORED | correct + fast + disengaged | `DEMAND↑` on D3, `INTERLEAVE↑` on D6 |
| **`decision-engine/02`** drive states — CONFIDENT (3 fluent successes) | the authored challenge trigger | `DEMAND↑` — and note this is the *same* count as the fluency gate, which `foundations/02` §2 already observes is not a coincidence |
| **`assessment/09`** failure cause **C4 load overflow** | performance degrades with complexity, not content | `LOAD↓` on D5 (decompose) — Phase 1 §7.3 already routes C4 to axis 6, which is D5's projection |
| **`assessment/09`** cause **C3 representation mismatch** | understands in one form not another | **No dial pressure.** This is a re-teach on axis 1/3 — TQ-4's, not Phase 3's |
| **`assessment/09`** cause **C1 prerequisite** | errors cluster at a sub-skill | **No dial pressure.** Leave the concept (§16 rung 6) |
| **`assessment/09`** cause **C6 tutor defect** | a question outran the teaching | **No dial pressure.** *Give*, and log against the decision. Softening the dials here would hide a system defect as a learner property — the most insidious available error |
| **Latency inflation vs the learner's own baseline** | responses slowing across equivalent items | `PACE↓` on D4 |
| **`student-state/05`** measured attention span exceeded | session-position signal | `PACE↓`, `LOAD↓` |
| **TQ-2 arc phase entry** | e.g. entering INDEPENDENT PRACTICE | **Structural clamp, not a pressure** — §10.3. Clamps are not arbitrated |
| **Learner explicit request** ("slower", "simpler", "harder") | direct report | Pressure at **elevated weight** — the learner's own report is high-weight evidence (TQ-1 §4.6's precedent). It is still arbitrated, and it is still subject to the governor |

### 7.3 Pressure structure

```
 Pressure {
   dial                -- exactly one of D1…D6
   direction           -- ↑ | ↓ | HOLD
   magnitude           -- always ONE step (AP2). Multi-step requires a named
                       --   protocol (§9 SG-2), which is not a pressure
   source              -- the authority and reading that produced it
   evidence            -- the specific observations, with their instrument status
   weight              -- band, from decision-engine/02's existing priority order
   admissible          -- whether the current posture permits it (§6.2)
 }
```

**`magnitude` is fixed at one step by construction.** A pressure cannot ask for two. This removes
an entire class of arbitration problem and enforces AP2 at the type level rather than by
convention.

### 7.4 Rejected pressures are recorded

Every pressure not answered this turn is written to the adjustment record. Three reasons, all
load-bearing:

1. **Counterfactual analysis.** `eos-v3/06` reasons over what was not done; without rejected
   pressures it can only see the taken path.
2. **Sustained-pressure detection.** §20's under-adaptation metric is "a pressure present for N
   turns with no adjustment" — computable only if rejections are recorded.
3. **Arbitration debugging.** An arbiter that systematically starves one pressure is a defect that
   is invisible in the taken-move log.

### 7.5 Failure modes

- **Pressure inflation.** Every observation becomes a pressure and arbitration runs constantly.
  Mitigated by the source table being closed and derived from existing taxonomies; a new pressure
  source requires a new *authority*, not a new heuristic.
- **Instrument laundering.** The confidence axis of the D1 grid is a PROXY (§3.5). A pressure
  derived from it must carry that status, or a proxy silently becomes an instrument — Phase 1 R14
  recurring at a new consumer. Every pressure's `evidence` carries its instrument status for
  exactly this reason.
- **Missing HOLD.** The FRAGILE reading produces a *blocking* pressure, which is unusual and easy
  to drop in implementation. Dropping it converts the corpus's authored FRAGILE response into an
  ordinary adjustment and destroys consolidation.

---

## 8. AT-5 · The Adaptation Arbiter

### 8.1 Purpose

Reduce a pressure set to **at most one** answered pressure, deterministically, with the rejections
recorded. Zero is a legitimate and common outcome.

### 8.2 The arbitration rules

**AR-1 · Preemption, not arbitration, for affect.**
If Band 0 or Band 1 fires, the arbiter does not run. `C-31` preempts; the vector holds and applies
the recovery clamp (§9 SG-8). Phase 3 has **no distress branch**, deliberately: a control plane
with its own affect path is a second recovery engine. **The preemption source is
`src/lib/kernel/frustration.ts`'s live affect machine** (`CALM | STRAINED | FLOODED | RECOVERING`,
projected by `affectBandOf()`), already implemented and already read at Band 0 by
`B0.recovery.preempt.v1` — named here in v3.1.0 so no reader infers that Phase 3 supplies one.

**AR-2 · One pressure, one dial, one step.**
Inherited from `decision-engine/07` §2's *"Reduce ONE dimension"*, `decision-engine/05`'s
one-dimension-per-rung law, and Phase 1 P8. The arbiter never answers two pressures, even when
they touch different dials and both look safe.

**AR-3 · Band priority first.**
`decision-engine/02`'s existing ordering — **affect > cognitive > drive** — decides between
pressures of different bands. A cognitive pressure always outranks a drive pressure; boredom never
outranks confusion. Phase 3 adds no band and reorders nothing.

**AR-4 · Within a band, cheapest-reversible first.**
When two pressures share a band, the dial that is cheapest to undo wins. The ordering is by
**cost of being wrong**, not by expected benefit:

```
 D2 HINT        one item's evidence           cheapest
 D4 PACE        one turn's rhythm
 D5 LOAD        one item's structure
 D1 SCAFFOLD    a fade trajectory
 D6 INTERLEAVE  a practice block
 D3 DIFFICULTY  a frontier estimate + the learner's read of themselves   most expensive
```

Difficulty is last because a wrong difficulty move is both slow to detect and identity-loaded:
the learner experiences it as a statement about them, which is why `decision-engine/07` §2 already
bans the audible demotion. A wrong hint costs one item.

**AR-5 · Never average opposing pressures. (AP7)**
If two pressures point opposite ways on the same dial — boredom says `DEMAND↑`, load says
`LOAD↓` — the arbiter **answers neither**. It emits a `contradictory-pressure` event and the turn
proceeds unadjusted, with the next turn's action biased toward a diagnostic probe under
`C-30`'s existing selection.

This is the rule most likely to be "optimized away" by an implementer, and it is the one that must
not be. Opposing pressures mean the state read is wrong — a learner is not simultaneously
under-stimulated and overloaded. Averaging produces a setting neither state called for, and worse,
it *resolves* the contradiction invisibly so the bad state read is never corrected.

**AR-6 · A blocking HOLD wins outright.**
FRAGILE's HOLD, a freeze window (§9 SG-6), or a structural clamp (§10.3) beats every directional
pressure on the affected dials. Clamps are not arbitrated against; they bound the space the
arbiter works in.

**AR-7 · Posture admissibility is a filter, not a tie-break.**
Pressures the current posture marks inadmissible (§6.2) are removed **before** ranking, and
recorded as rejected-by-posture. A posture that removes every pressure repeatedly is the
self-sealing failure §6.5 names.

**AR-8 · Determinism.**
Ties after AR-3…AR-7 are broken by a fixed dial order (D2, D4, D5, D1, D6, D3), then by a
deterministic seed on `(learnerId, conceptId, turnOrdinal)`. No randomness enters outside the
seed, so replay is exact — the same requirement Phase 1 §4.5 S8 imposed on its own tie-break.

### 8.3 What the arbiter never does

Selects an action · reads component internals · changes more than one dial · overrides a clamp ·
runs during recovery · sets the target band · makes a legal action illegal in a way `C-29` did not
already imply (it may only *narrow*, and narrowing to empty is handled at §21.2).

**And, added v3.1.0 (B2): it never resolves a rule conflict.** `docs/architecture/README.md` §3
names `src/lib/kernel/policy/engine.ts` the **sole owner** of *"band evaluation, conflict
resolution, completeness"*, and states that *"a second implementation is a defect, not a
refactoring opportunity."* The boundary:

> The engine resolves **two rules colliding on a field** — by specificity, then
> mandatory-beats-optional, then lexical `ruleId`. **AT-5 resolves which learner-state pressure is
> answered**, which is a question upstream of any rule firing. Where AT-5's ordering must take
> effect at rule-evaluation time it is expressed **inside** the engine's existing mechanics:
> AR-3's band priority is *band assignment*, AR-4's reversibility ordering is *rule specificity*,
> AR-6's clamps are *Band-2 subtractive rules*, and AR-8's tie-break defers to the engine's own
> lexical rule and to Band 6. **Phase 3 implements no resolver.**

AR-5 is strengthened by this placement rather than weakened by it: the engine already emits
`PolicyConflictDetected` for an equal-specificity collision and calls it *"always a pack bug."*
AR-5's `contradictory-pressure` event is the same discipline one layer up — a signal that the
state model is wrong, never a value to interpolate.

### 8.4 Failure modes

- **Starvation.** A low-band pressure is never answered because a higher one is always present.
  Detected by §20's sustained-rejection metric. Deliberately **not** mitigated by an
  aging/priority-boost mechanism: a pressure that is always outranked is usually a symptom, and
  boosting it would answer the symptom over the cause.
- **Contradiction as a normal outcome.** If `contradictory-pressure` fires often, the state model
  is wrong, not the arbiter. Tracked as a first-class defect signal against Plane 1 rather than as
  arbiter noise.
- **Clamp collision.** Two clamps bound the same dial in opposite directions (a first-lesson
  ceiling and an assessment floor). Defined behaviour: the **more restrictive** clamp wins, and if
  the resulting range is empty the turn is not adapted and a `clamp-conflict` defect is emitted.
  An empty range must never silently pick a value.

### 8.5 Falsifiable prediction

*Under one-pressure-per-turn arbitration, the share of adjustments that are followed by a
subsequent reversal on the same dial falls relative to unarbitrated multi-dial adjustment.* If
reversal rate does not fall, the arbiter is picking the wrong pressure and AR-4's ordering is
wrong.

---

## 9. AT-6 · The Stability Governor

### 9.1 Why this is the component the repository is missing most

Every authored escalation ladder in the corpus specifies *what changes at each rung* and none
specifies *how long a rung is held before the next*. `decision-engine/05` has four ladders and no
dwell rule. The live posture selector re-derives on every turn from folds that flip on one
response. `strategyEffectiveness.ts` detects a stalemate at three repeats — the only anti-thrash
mechanism in the running system, and it counts repeats rather than measuring change.

**Where the governor belongs — the question the review asked (answered v3.1.0).** The split is
between the rules and their evaluation, and both halves already have owners:

> **The governor's rules are pedagogy and belong to adaptive teaching.** SG-3's asymmetry is
> `student-state/04`'s build-slow/collapse-steep finding; SG-4's monotonic fade is the fade
> discipline; SG-5 is the three-representation rule; SG-6's windows each protect an authored
> sequence; SG-8 mirrors `C-31`'s exit rule. None of that is runtime concern.
> **Their evaluation is runtime and belongs to `kernel/policy/engine.ts`.** SG-1…SG-8 are
> authored as **Band-2 subtractive rules** that remove illegal dial moves from the candidate set
> (§0.7.1). The governor is a rule set, not an evaluator.

So the answer is neither/both: adaptive teaching owns *what stability means here*; the runtime owns
*when the rules fire and how collisions resolve*. A governor implemented as its own evaluator would
be the second implementation `README.md` §3 forbids.

A control system with no dwell, no rate limit and no hysteresis oscillates. That is not a
pedagogical claim; it is what control systems do. And oscillation in this system is not a cosmetic
defect: a learner whose support level rises and falls every turn experiences a tutor who cannot
decide whether they can do this, which is worse than a tutor who is consistently slightly wrong.

### 9.2 The governor's rules

**SG-1 · Minimum dwell, measured in evidence, not turns.**
A dial holds for a minimum number of *learner productions* after a move — not a minimum number of
turns, because turns without production carry no information about whether the move worked.
Defaults are personalized by `student-state/05`'s persistence scaling and are **inert below that
file's own minimum-evidence threshold**, falling back to a universal default. Phase 3 proposes no
numeric constants; constants belong in a policy store (§19.3), not in an architecture document.

**SG-2 · Rate limit: one step per adjustment.**
Multi-step jumps are legal **only** under a named, already-authored protocol:

| Protocol | Authority | Jump |
|---|---|---|
| Compaction / test-out | `decision-engine/07` §3 | D3 and D1 jump together — the one authorized AP3 exception, because compaction is a *placement* act, not an adjustment |
| Recovery entry | `C-31` | all dials to the recovery clamp |
| Recovery exit | `C-31` exit rule | one rung below entry, never at zero (SG-8) |
| First-lesson entry | `first-lesson/02` | the authored hard limits as clamps |
| Placement / re-placement | `placement/` | entry values set, not adjusted |

An unnamed multi-step move is illegal. This is what makes "the system suddenly made everything
much easier" a *detectable* event rather than an impression.

**SG-3 · Hysteresis: the thresholds are asymmetric.**
The evidence required to *raise* a dial back after lowering it is strictly greater than the
evidence that lowered it, and vice versa on the fade direction. Symmetric thresholds guarantee
oscillation at the boundary — a learner sitting near the threshold flips every other production.
Asymmetry is the standard remedy and it is also pedagogically right: `student-state/04`'s
build-slow / collapse-steep confidence asymmetry says the cost of a wrong raise and a wrong drop
are not equal, so the thresholds should not be either.

**SG-4 · Monotonic fade is the default direction.**
Within one campaign, D1 SCAFFOLD and D2 HINT availability trend **down**. Every increase is an
event with a recorded cause. Absent a cause, a dial does not rise — which makes comfort drift
(§20's counter-metric) structurally visible rather than a matter of judgement.

**SG-5 · Oscillation detection: reversal means the dial is not the problem.**
N reversals on one dial within a window is not a signal to adjust more carefully. It is a signal
that the dial is the wrong lever, and it routes to **diagnosis** (Phase 1 §7.3), not to another
adjustment.

This is deliberately the control-plane analogue of the corpus's own **three-representation rule**
(*"two failed representations are prerequisite evidence, not a delivery problem"*,
`foundations/02` §4, Universal Principle 7). The reasoning transfers exactly: repeatedly varying
one dimension without effect is evidence about a *different* dimension. Stating it as an analogue
rather than a new rule is deliberate — the pedagogy is already authored; only its application to
dials is new.

**SG-6 · Freeze windows.**
Dials do not move during:

| Window | Reason | Authority |
|---|---|---|
| A misconception collision (elicit → commit → collide) | Raising support past the learner's committed answer destroys the collision; lowering difficulty hides it | `misconceptions/`, §15.2 |
| An unaided assessment item | Support present during an unaided item invalidates the evidence | `assessment/05`, Phase 2 §9.2 |
| A FRAGILE hold | The authored response is *one more of the same*; a dial move makes it not-the-same | `foundations/02` §3 |
| A method beat in progress | A method either completes its shape or is explicitly aborted with a reason (Phase 1 §9.3 Q6) | TQ-3 / Phase 1 |
| The protected session close | Content is dropped before the close, never the close | `C-33` |

**SG-7 · Every adjustment is attributable.**
Dial, direction, pressure, evidence, posture, arc phase, strategy, rejected pressures, versions.
An adjustment that cannot name its cause is a defect (AP5), and — per Phase 1 §9.4's prediction —
a turn that cannot be explained by naming a rule and its evidence indicates an undocumented
decision path.

**SG-8 · Post-recovery re-entry, one rung below.**
On recovery exit the dials resume at **one rung more supportive than at recovery entry, never at
maximum support**. This mirrors `C-31`'s own exit rule verbatim and for the same reason: resuming
at full support is the invisible restart, and it tells the learner the episode erased their
progress. Personalized by `student-state/06`'s recovery-speed field where present.

### 9.3 What the governor never does

Decide *which* dial (AT-5) · decide *why* (AT-4) · override a clamp · run at Band 0/1 · advance or
block a teaching state · turn a rejection into a different move. **A rejected move is a rejection,
recorded.** A governor that substitutes an alternative when it refuses one is arbitrating, and
there would then be two arbiters.

### 9.4 Interaction with Phase 1's budgets

Phase 1 §7.7 budgets *re-teach attempts*; §9 budgets *adjustments*. They are different resources
and must not be netted. But they interact at one point, and it needs stating:

> A dial move that is **not** a re-teach does not consume a re-teach budget, and a re-teach does
> **not** reset an adjustment dwell. However, **a re-teach resets the oscillation window** on any
> dial whose projection (axis 6 or 7) the re-teach changed — because the teaching changed, so prior
> dial evidence on that axis no longer describes the same situation.

Without this rule the two budgets would silently couple, and a learner who received a legitimate
re-teach would be blocked from a legitimate support change by an oscillation count accrued under
different teaching.

### 9.4a The budget-bypass rule (added v3.1.0 — blocking issue B3)

**The defect this closes.** v3.0.0-draft stated three things that were jointly inconsistent:
§5.4 made D1 the standing form of Phase 1 axis 7 AGENCY and D5 the standing form of axis 6
GRANULARITY; §9.4 exempted "adjustments" from the re-teach budget; and §16 placed ADAPT below
RE-TEACH. Because §16's ladder is by construction the *response-to-failure* ladder, a
failure-response move on D1 or D5 **is** an axis 6/7 change — which Phase 1 §7.4 defines as a
re-teach and Phase 1 §7.7 budgets at three distinct attempts per claim per session. Relabelled as
an adjustment, the same move consumed no budget. Phase 1's own §7.4.2 verification tables confirm
the collision concretely: Ladder 1 rung 3 ("concrete enactment") is primary axis 7; Ladder 3 rung 2
("decompose to one component") is primary axis 6; Ladder 3 rung 3 ("transfer the apparatus to the
learner") is axis 7. All three are re-teaches in Phase 1 and were rung-2 dial moves in Phase 3.

**The rule.** Budget consumption is determined by **two facts about the move, not by its name**:

```
 A dial move CONSUMES Phase 1 §7.7's re-teach budget iff BOTH hold:

   (BB-1)  the dial has a Phase 1 axis projection  — D1 (axis 7) or D5 (axis 6)
   (BB-2)  the move is taken in RESPONSE TO A FAILURE
           (trigger class T1, T4, T6, T8 per Phase 1 §7.2, or any entry to
            the §16 ladder at rung 2 or above)

 A dial move DOES NOT consume it iff EITHER:

   (BB-3)  the dial has no axis projection — D2 HINT, D3 DIFFICULTY,
           D4 PACE, D6 INTERLEAVING; or
   (BB-4)  the move is not a failure response — the pressure was boredom,
           fluency, load detected without failure, attention-span, a learner
           request, or a clamp/profile application (§21.3).
```

**Why the boundary falls exactly there.** Phase 1's budget exists to stop a learner being taught
the same claim repeatedly under superficially different guises. An axis 6/7 change following a
failure *is* another attempt at the claim — that is what Phase 1's operator says it is, and Phase 3
has no standing to reclassify it. A hint grant, a pace change or a difficulty step is not another
attempt at the claim: the teaching is unchanged and the learner has not been re-taught anything.
BB-3 is therefore not a loophole but the honest statement that four of the six dials sit outside
the act Phase 1 budgets. BB-4 is the same statement about *why* the move was made: decomposing for
a learner who is fluent-but-overloaded is not a second attempt at a failed claim.

**Enforcement, and the reason it is checkable rather than asserted.** Every adjustment record
carries `consumesReteachBudget` (§4.3 step 7), set by BB-1 ∧ BB-2 at commit time. A budgeted move
is refused by the governor when Phase 1's budget is exhausted, on the same footing as any other
governor rejection — so **exhaustion of Phase 1's budget removes the move from the candidate set
before AT-5 can select it**, which is Band 2's subtractive semantics doing the work rather than a
new mechanism. §20 gains a corresponding audit metric: *budgeted dial moves as a share of D1/D5
moves*, whose expected value is well above zero and whose collapse toward zero would indicate the
classifier has been mis-set.

**The two-lock rule remains valid and is strengthened.** Lock (i) still asks *is this different
teaching?* and lock (ii) still asks *is this a stable control move?*; both may still refuse
independently. What is added is that passing lock (i) now carries lock (i)'s **cost**, not merely
its permission — which is what the two-lock rule always implied and never said.

### 9.5 Reconciliation with the live stalemate detector

`strategyEffectiveness.ts` fires when the same posture repeats 3+ times on an unmastered topic.
That is a real anti-thrash mechanism and Phase 3 keeps it. Two observations, recorded as feedback
(AF-6) rather than as a change:

- It counts **repeats**, where SG-5 counts **reversals**. They detect different pathologies —
  stuck versus oscillating — and both are worth having. They are complementary, not redundant.
- Its trigger is a count with no reference to whether the learner's state improved. A posture
  repeating three times *while the learner improves* is the system working, and rotating out of it
  would be a false positive. Adding a no-state-change condition is proposed, not applied.

### 9.6 Failure modes

- **Over-damping.** Dwell and hysteresis so conservative that genuine pressures go unanswered for
  many turns. **This is the governor's principal risk and its most likely form of failure**, since
  every rule in §9.2 is a brake. Detected by §20's under-adaptation metric, and it is the exact
  failure §4.7's prediction is designed to catch.
- **Clamp/freeze sprawl.** Enough freeze windows that dials rarely move at all. Bounded by SG-6's
  table being closed and every entry citing an existing authority.
- **Reversal-window mis-scoping.** Too wide and normal responsiveness reads as oscillation; too
  narrow and real oscillation is missed. Window sizes are policy-store values (§19.3), tunable
  without an architecture change — which is why they are not fixed here.
- **Governor as a second decision-maker.** Mitigated by §9.3: reject, never substitute.

### 9.7 Falsifiable prediction

*Learners under a governed control plane will show fewer dial reversals per campaign and equal or
higher unassisted-production rates than learners under ungoverned adjustment.* If reversals fall
and unassisted production falls with them, the governor is trading responsiveness for stability at
a net loss and its thresholds are wrong.

---

## 10. AT-7 · Scaffolding Architecture

### 10.1 What already exists, and what is missing

Scaffolding is named in five places and specified as a decision in none:

- **P81 SCAFFOLDING / P82 FADING** (FINAL) — *"a scaffold is not a crutch — it is a primitive that
  manages the load of another primitive until that primitive is executable without support"*, and
  fading is *"executed deliberately, not by default."* The pedagogy is authored and frozen.
- **P11 PARTIAL WORKED EXAMPLE / P12 FADED WORKED EXAMPLE** (ACTIVE) — authored rungs at the
  primitive layer.
- **`EOS_V2_RUNTIME_SPECIFICATION` §3.4** — `scaffoldDial: 0–4 (0 = full worked, 4 = solo)`,
  GUIDED-only, reset on state transition.
- **Phase 1 M11 STEP-BY-STEP COACHING** — *"MUST NOT fade faster than unassisted evidence permits
  — the fade schedule is evidence-gated, not turn-gated"*, plus the slow-correct prohibition.
- **`eos-v3` `C-32`** — "scaffolding level" as an output, undefined.

What is missing is everything between: the dial's scope beyond one teaching state, the rule for
raising it, the ceiling under assessment, and the fact that more support is not safer.

### 10.2 The ladder

**EOS v2's scale and endpoints are adopted verbatim.** Phase 3 does not renumber, rename or
rescale an existing dial — that would create AC-1 a second time.

| D1 | Support form | Learner produces | Primitive grounding |
|---|---|---|---|
| **0** | Full worked example; the tutor executes and narrates | nothing; attends | P10 WORKED EXAMPLE PRESENTATION |
| **1** | Partial worked example; the final step is removed | the last step | **P11 PARTIAL WORKED EXAMPLE** |
| **2** | Faded; progressively more steps removed | a growing middle | **P12 FADED WORKED EXAMPLE** (P10 + P82) |
| **3** | Prompted; the learner executes with cues available | all steps, cued | P52 TARGETED REDIRECT as available support |
| **4** | Solo; no support present | all steps, unaided | — |

**Rung 4 is the only rung that produces advancement evidence.** This is not a Phase 3 rule; it is
`assessment/05`'s evidence hierarchy and Phase 1 L2 (*assisted success never exits GUIDED*),
restated at the dial layer so the dial cannot be used to route around them.

**The ladder does not fix `n`.** Where an authored Protocol or blueprint declares concept-specific
rungs, those win (§19.2), exactly as an authored Protocol wins over a generic archetype.

**This ladder is not the ISS-01 ladder (added v3.1.0 — B1).** `conversationState.ts`'s
`PHASE_ORDER` with `phaseIndex − 1` floored is a **phase** ladder — position in the teaching
sequence — and is the subject of `ISS_01_LADDER_RECONCILIATION.md`, which is BLOCKED on an
unresolved pedagogical decision. D1 is a **support** ladder *within* a phase. They have similar
shapes (step one, never to zero) and different subjects, and conflating them would attach Phase 3
to a blocked decision it has no standing to make. §16.3 EL-8 restates this for the escalation
order; AF-11 records that §10.3's clamps must be re-verified once ISS-01 resolves.

### 10.3 Phase clamps: scaffolding is bounded by the arc, not chosen freely

TQ-2's arc phases imply support ceilings and floors. These are **structural clamps**, not
pressures — they bound the range the arbiter works in and are never arbitrated against (AR-6).

| Arc phase (TQ-2) | D1 range | Why |
|---|---|---|
| EXPLANATION / EXAMPLES | 0–1 | The tutor is producing; the learner is not yet |
| GUIDED PRACTICE | 1–3 | The phase *is* decreasing support — its exit evidence is *decreasing support* |
| **INDEPENDENT PRACTICE** | **4 only** | The phase exists to produce unassisted evidence; any support makes it a different phase |
| Unaided assessment item | **4, frozen** | SG-6; support invalidates the evidence |
| REVISION (retrieval) | 4, with cued fallback | Cued recovery is `placement/06`'s FORGOTTEN ≠ UNKNOWN treatment, not a scaffold raise |

**The INDEPENDENT clamp is the load-bearing one.** It makes "advance on scaffolded success"
structurally impossible rather than discouraged. Phase 1 already made it illegal at the state
machine; the clamp closes the control-plane route to the same violation.

### 10.4 Fade and raise are asymmetric

- **Fade is the default direction** (SG-4) and is **evidence-gated, never turn-gated** — M11's
  rule, inherited unchanged. Slow-correct does not fade (`foundations/02`: *slow-right is not
  mastery*).
- **Raising requires a named cause** and lands **one rung** (AP6). A learner failing at D1 = 3
  goes to 2, not to 0. Dropping to full support on one failure is the invisible restart, and
  `C-31`'s authored exit rule exists because that move is demoralizing.
- **The raise is silent.** `decision-engine/05`'s STEP BACK rule is *"one step / one sub-step,
  silently, no commentary ever."* Narrating a support increase converts an adjustment into an
  audible demotion. Inherited, not new.

### 10.5 Scaffolding must be visible in the evidence

**Every learner production record carries the D1 value under which it occurred.** Without it, the
evidence hierarchy cannot rank the production, `C-29` cannot distinguish assisted from unassisted,
and Phase 1's L2 becomes uncheckable in practice even though it is stated.

`EOS_V2`'s `AnswerObserved` already specifies `scaffoldLevel: 0–4`. Making that true of ADR 13's
canonical tables is **AH-6**, and it is a proposal into the runtime owner's territory, not a
Phase 3 schema. Until it lands, §3.5 records the consequence honestly: fade decisions run on
turn-local knowledge only.

### 10.6 The expertise-reversal rule — more support is not safer

The intuition that scaffolding is a safe default is wrong, and the repository already says so:
`EOS_V2_ARCHITECTURE` records *"scaffold dial tied inversely to Knowledge rung… worked examples
for novices, problem-first for RELIABLE+"* as an automatic behaviour. Phase 3 promotes that note
to a legality constraint:

> **Support materially above the learner's demonstrated need is a defect, not a courtesy.** A
> learner at INDEPENDENT on this concept's prerequisites who is handed a full worked example is
> being taught something they can already do, and the redundancy consumes the working capacity the
> new material needs.

Two consequences: `CONFIDENCE_BUILDING` posture **may not raise D1** (its lever is difficulty and
success density, not support — §6.2); and §20 tracks over-scaffolding as a counter-metric with the
same seriousness as under-support, because only one of the two is uncomfortable enough to be
noticed without instrumentation.

### 10.7 Responsibilities

Owns the D1 ladder semantics, phase clamps, fade/raise asymmetry, and the evidence-visibility
contract. **Must not own** the fade *schedule* inside a method (TQ-3 M11), advancement (`C-29`),
the evidence hierarchy (`assessment/05`), or recovery support (`C-31`).

### 10.8 Failure modes

- **Scaffold as comfort.** D1 drifts up and never comes down; every session feels supportive and
  produces no unassisted evidence. Detected by SG-4's monotonic-fade default making every raise an
  event, and by §20's net-direction counter-metric.
- **Fade on assisted evidence.** The dial fades because the learner succeeded *at the current
  rung* — which is exactly what the current rung was designed to produce. Mitigated by the fade
  gate reading unassisted-at-this-rung evidence, and by the rung-4-only advancement rule.
- **Clamp evasion via method choice.** A method whose shape embeds support (M12 Worked Example) is
  selected during INDEPENDENT. Mitigated by the clamp publishing as an `AdaptationConstraint` that
  narrows the legal action set at Band 2 (subtractive legality), before `C-30` selects.
- **Ladder/primitive drift.** §10.2's rungs and P11/P12's definitions diverge over time. **Not
  mitigated mechanically** — this is Phase 1 R15 recurring, and it is honest to say so.

### 10.9 Falsifiable prediction

*Campaigns whose D1 reaches 4 with unassisted production before SUMMARY will show materially
higher delayed retrieval than campaigns that complete with D1 < 4.* If not, the fade discipline is
costing time for nothing and the clamp should be re-examined.

---

## 11. AT-8 · Hint Architecture

### 11.1 Boundary — what Phase 3 does NOT design here

The hint *content model* is authored and machine-checked already, and re-deriving it would be the
clearest possible instance of the anti-pattern Phase 1 §17.2 names.

| Already owned | Owner |
|---|---|
| Hint content type, ladder typing, easier-than metadata, `HINTS_FOR` | **CEKR** `HintSpec` |
| `HintDef {ladderType, stage, requiresCapabilities[]}`; compile-time proofs **E0401** (`hint.stage ≤ target.stage − 1`) and **E0402** (`hint.requiresCapabilities ⊆ target.requiresCapabilities`); coverage lint E0507 | **`EDUCATIONAL_BRAIN_COMPILER`** |
| Hint asset packaging (`hint_tier_1..3`) and lifecycle | **ADR 14** |
| Capability precondition before hinting toward a step | **`CAPABILITY_MODEL_DESIGN`** |
| The answer-withholding policy and its honest explanation | **`C-32`** |
| **The hint module itself** — `hint(request) → slot content`; allowed deps *Knowledge/Capability views, packs, catalog*; **forbidden dep: the LLM** | **`RS §13`** (added v3.1.0 — B2). A hint module already exists in the frozen subsystem contracts. AT-8 is the **grant decision upstream of `hint(request)`**, never a second module, and its HL-4 capability precondition is that contract's *Knowledge/Capability views* dependency restated. The forbidden-LLM dep independently guarantees §11.7's "retrieval, never generation" |
| `MasteryCondition {hintDebt: 0}` | **CEKR** |
| Hint-take rate rising with mastery as a counter-metric | **Phase 1 TQ-7 §10.3** |

**Phase 3 designs one thing: the grant decision.** Which rung is released, now, to this learner,
on this item — and what that release costs.

### 11.2 Rung semantics without a rung count

Because AC-2 leaves two rung enumerations unreconciled, §11 defines what a rung *means* and
declines to fix `n`:

```
 H0   nothing granted                    the default state of every item
 H1   ORIENT      — direct attention to the relevant feature; adds no content
 H2   NARROW      — eliminate part of the space; the learner still selects
 H3   METHOD      — name the applicable procedure or schema, not its execution
 H4   STEP        — execute one step; the learner completes the rest
 ─────────────────────────────────────────────────────────────────────────────
 (n)  THE ANSWER  — NOT A RUNG. See HL-2.
```

Where an item carries an authored `HintSpec` ladder, **the authored ladder wins** and this
sequence is the fallback shape only. The value of stating a shape at all is that it makes HL-1's
"one rung at a time" meaningful for items with no authored ladder — where AT-8 is otherwise inert
(§3.5).

### 11.3 The grant rules

**HL-1 · One rung per request, never skipped.**
Inherited from `C-32`'s *"hints escalate in specificity slowly."* Skipping rungs converts a ladder
into a give.

**HL-2 · The answer is not on the ladder.**
A *give* is a different act with a different owner (`C-32`'s withholding policy; Phase 1 diagnosis
C6's *give*). Placing the answer at the top of the hint ladder would make handing it over the
natural terminus of ordinary escalation, which is precisely the assistant behaviour `C-32` exists
to prevent. The ladder terminates one rung short, and exhaustion routes to §16, not to the answer.

**HL-3 · A request inside the wait-time window is not a request.**
`foundations/03`'s wait-time law and **P55 WAIT TIME** make silence a teaching act. A hint
requested before the window elapses is impatience, and granting it teaches that hesitation is
answered with help. The window is a D4 sub-setting (§12.2), which is why pace and hints are
coupled through one dial rather than two.

**HL-4 · Capability precondition.**
A hint that requires a capability the learner lacks is not a hint. `CAPABILITY_MODEL_DESIGN`'s
rule and E0402's compile-time proof already guarantee this for authored hints; the grant decision
inherits it and adds nothing.

**HL-5 · A hint grant MUST NOT raise D1.**
The distinction this rule protects is the core of the section. A **hint** is transient — scoped to
one item, consumed, and gone. **Scaffolding** is standing — it changes the form of the learner's
production until faded. Conflating them means every hint permanently softens the lesson, and the
fade discipline of §10 silently unwinds. A learner may take three hints on one item and still be at
D1 = 4: they are working unaided, and they asked for orientation three times. Those are different
facts and the system must be able to hold both.

**HL-6 · Three hints on one item ends the item.**
An item requiring the ladder to exhaustion is above the learner's frontier. The correct response is
to leave the item — not to hint it to death, which produces a completed item, a corrupted evidence
record and no learning. Routes to §16 rung 2 (a dial adjustment on D3) or higher.

**HL-7 · Repeated first-rung insufficiency is an authoring defect.**
If H1 is systematically insufficient across items for a concept, the ladder is mis-authored — the
rungs are too far apart. This routes to the authoring queue exactly as Phase 1 §7.7's third budget
row does, and for the same reason: repeated failure across a population is a content defect, not a
learner property.

### 11.4 Hint debt

Hint debt is an existing quantity (`EOS_V2`'s `AnswerObserved.hintDebt`, CEKR's
`MasteryCondition {hintDebt: 0}`). Phase 3 states two consequences and invents neither:

- **Debt attaches to the evidence record, and downgrades it.** A correct answer at hint debt 2 is
  not a correct answer at hint debt 0. Recording the outcome without the debt is a false record,
  and it is the mechanism by which hint-assisted performance is laundered into mastery.
- **Debt is per item and resets with the item.** It is not a learner trait. A learner is not "a
  hint-taker"; they took hints on these items, and `student-state/05`'s rule that affinities are
  statistics rather than identities applies here verbatim.

### 11.5 Why a transient sits in a standing vector

D2 is the one dial that resets constantly, which is a real inconsistency in an otherwise standing
vector. The alternative — a separate hint state outside the ASV — was rejected: it would put the
one quantity most likely to be confused with scaffolding outside the structure whose entire purpose
is keeping the two apart, and it would place hint grants outside the governor, which is where HL-3
and HL-6 have to be enforced. The inconsistency is the lesser cost and is recorded in §24 T4.

### 11.6 Responsibilities

Owns the grant decision, rung semantics for unauthored items, the wait-window rule, and the
hint/scaffold separation. **Must not own** hint content, the ladder schema, the easier-than law,
the answer-give decision (`C-32`), or the evidence hierarchy (`assessment/05`).

### 11.7 Failure modes

- **Empty ladders.** The dominant failure and it is a content failure: the schema exists, the
  authored rungs largely do not. AT-8 goes **inert** rather than improvising (§3.5) — a fabricated
  hint carries no easier-than proof and may hand over the answer.
- **Hint as the path of least resistance.** Under a fluent renderer, granting a hint is always the
  most locally agreeable move. Structurally mitigated: hints are granted by the control plane
  against a pressure and a governor, not produced by the renderer at will — which is only true if
  the ladder is a retrieval, never a generation.
- **Debt not captured.** Then HL-4's contract and CEKR's `hintDebt: 0` gate are both unenforceable.
  Pre-existing (AH-6), inherited, reported.
- **Wait-window unmeasurable in text.** The window depends on elapsed time, which is PRESENT
  server-side, but "the learner is thinking" and "the learner has left" are indistinguishable from
  a timestamp alone. HL-3 therefore has a real error profile and must not be applied strictly at
  long durations.

### 11.8 Falsifiable prediction

*Under one-rung-at-a-time granting with debt recorded, mean hint debt per solved item falls across
a campaign while unassisted solve rate rises.* If debt falls because learners stop asking rather
than because they need less, the help-seeking counter-metric (TQ-7 §10.3) fires — and that is a
relationship failure, not a success.

---

## 12. AT-9 · Pace Adaptation

### 12.1 Ownership — corrected in v3.1.0

v3.0.0-draft opened this section "The one dial with no existing owner." **That was wrong**, and the
correction is recorded here rather than quietly applied: `RS §18` ships
`budgets.paragraphs.{beginner,intermediate,expert}` with `strained` variants and
`budgets.maxNewTerms` as **normative constants**, and `src/lib/teaching/conversationState.ts`'s
`responseBudget(register, consecutiveFailures)` implements them live, citing `foundations/04 P5`.
Pace is owned. What was missing is a controller over it richer than a two-valued struggle flag, and
a rule against oscillating it.

Pace is nonetheless split across owners, and that line still needs drawing. `C-33` owns *session*
pacing — how the attention budget is allocated across phases. `KG_CONCEPT_GRANULARITY_STANDARD` explicitly assigns
*"a lesson is a pacing decision"* to the composition layer and keeps it off the KG node.
`EOS_V2` §5.2 lets Band 5 set "pace fields" without defining them. **P85 PACING CONTROL** exists as
a frozen primitive with no controller above it.

The line: **`C-33` owns how much of today goes where. D4 owns how much arrives per turn.** Session
budget versus turn density. They interact only through the budget, which `C-33` sets and Phase 3
consumes.

### 12.2 Three sub-settings

Pace is not one quantity, and treating it as one produces the failure where "slow down" makes
turns longer instead of smaller.

| Sub-setting | Controls | Grounded in |
|---|---|---|
| **New-element rate** | how many genuinely new elements per turn | `first-lesson/02`'s ≤3-new-words limit is the authored floor case |
| **Turn density** | how much text/structure arrives in one turn | `first-lesson/02`'s 2-sentence bursts; `foundations/03`'s load-bearing-sentence rule |
| **Wait-time multiplier** | how long before the tutor fills the silence | **P55 WAIT TIME**; `foundations/03`'s wait-time law; consumed by HL-3 |

**On whether P55 should be its own dial (AQ-1), the lean is stated rather than left open
(v3.1.0 — M3): it should not.** Wait time and turn density are moved by the same pressures, in the
same direction, under the same clamps, and separating them would create a pair that AP2 forbids
from co-moving while every real adjustment wants them to. It stays a sub-setting unless data shows
a pressure that moves one without the other. This is a lean; AQ-1 remains open for the count of
dials as a whole.

**Two of the three sub-settings are existing normative keys** — `budgets.paragraphs.*` for turn
density, `budgets.maxNewTerms` for new-element rate. The wait-time multiplier is the one with no
BrainConfig key, grounded instead in P55 and `foundations/03`. D4 therefore **selects** shipped
values for two sub-settings and controls the third, which is what keeps it legal at Band 5, whose
contract forbids altering budgets (§0.6.2).

**New-element rate is not difficulty and not load.** A hard item delivered one element at a time is
slow, not easy. Three easy elements at once is fast, not hard. Conflating the three is what makes
"adaptive pacing" in most systems indistinguishable from "make it easier."

### 12.3 Why pace moves first

AR-4 ranks D4 second-cheapest, and there is a pedagogical reason beyond reversibility: **a pace
change is invisible to the learner.** Slowing down does not signal a judgement about them.
Lowering difficulty does — which is why `decision-engine/07` §2 bans the audible demotion and why
`decision-engine/05`'s STEP BACK insists on silence. Given two adjustments that would relieve the
same pressure, the one the learner does not experience as a verdict is the right first move.

**The corollary is a prohibition: a pace change must never be announced.** "Let's slow down" is a
statement about the learner delivered as a courtesy.

### 12.4 The triad is already authored

`decision-engine/07` §2's **continue / repeat / slow down** is the authored pace decision, and §3's
compaction protocol is the authored acceleration. Phase 3 adds no fourth option. What it adds is
the dial that makes "slow down" a *value* rather than an event — so that the next turn knows the
previous one slowed, and so that speeding back up is a governed move rather than a reversion.

### 12.5 Responsibilities

Owns the three sub-settings, their ranges, and the invisibility rule. **Must not own** session
budget or compaction (`C-33`, `decision-engine/07`), wait-time *pedagogy* (`foundations/03`), or
turn length as a rendering concern (`C-35`).

### 12.6 Failure modes

- **Pace as the universal answer.** Because it is cheapest and invisible, every pressure gets
  answered with a pace change and the genuine problem is never addressed. Detected by §20's
  per-dial adjustment distribution: a distribution dominated by D4 is a defect signal, not
  efficiency.
- **Wait-time in an asynchronous medium.** The learner's silence may mean thinking, distraction, or
  departure. `decision-engine/07` §8's session-boundary rule bounds the long end; the short end
  (HL-3) is the usable one.
- **Density adaptation colliding with authored bursts.** `first-lesson`'s limits are ceilings, not
  targets. Resolved by treating them as clamps (§21.3).

### 12.7 Falsifiable prediction

*Under an explicit pace dial, the correlation between response latency inflation and subsequent
error rate weakens* — because the system is responding to the fatigue signal before it becomes a
failure. If latency inflation still predicts errors as strongly, D4 is not being moved, or it is
being moved on the wrong sub-setting.

---

## 13. AT-10 · Difficulty Adaptation

### 13.1 `C-32` keeps the loop; Phase 3 supplies the instrument

`C-32`'s charter is complete and Phase 3 does not touch it: *"Estimate current success rate over a
rolling window; hold the target band (a productive failure rate, personalized — a resilient
learner's band sits higher); adjust difficulty, hint availability, and scaffolding to steer toward
it… hard-stop on affect signals."*

**Phase 3 never sets the band, never estimates the success rate, and never overrides the veto.**
It supplies three things the charter leaves open: what a difficulty step is, when a step is legal,
and how a step is delivered without becoming a verdict.

### 13.2 Difficulty is item selection, not concept change

D3 is an offset relative to the learner's current frontier for this concept, realized by **item
selection** — `C-30`/`C-14` territory. Phase 3 publishes a target; it does not choose the item.

The prohibition that makes this safe is already authored: *"Reduce ONE dimension — smaller numbers
or fewer steps or recognition-instead-of-recall, **never 'an easier topic'**"*
(`decision-engine/07` §2). Moving to an easier *concept* is not a difficulty adjustment; it is
either a prerequisite move (§16 rung 6) or an audible demotion.

### 13.3 The band is personalized and Phase 3 reads it

`student-state/05`'s persistence-scaled struggle budgets and `student-state/04`'s per-learner
affect budgets already personalize how much failure a learner can carry. `C-32`'s band consumes
them. Phase 3 reads the resulting band and moves D3 toward it — one step, under the governor. It
computes no band of its own, which is the difference between an instrument and a second controller.

### 13.4 Delivery rules

- **Never announce a difficulty drop.** The audible-demotion ban, inherited.
- **A difficulty rise may be announced, as an offer.** `decision-engine/07` §5's authored framing —
  *"want to see the mean version?"*, adventure not evaluation, a miss costs nothing visible — is
  the authored form and Phase 3 adds no other.
- **Never co-move with D1** (AP3). A harder item at higher support is an experiment with two
  variables.
- **Difficulty rises only from fluency, never from correctness alone.** `foundations/02` §2's
  fluency gate (fast + correct + confident, three in a row) is the authored trigger. Rising on
  correctness alone is the premature-advancement failure the gate exists to prevent.

### 13.5 Responsibilities

Owns the step definition, the legality of a step, and delivery framing. **Must not own** the target
band or the veto (`C-32`), item selection (`C-30`/`C-14`), concept difficulty definitions (the KG),
or mastery classification (ADR 07).

### 13.6 Failure modes

- **Comfort drift.** Success rate is easy to raise and easy to mistake for progress. This is
  `C-32`'s own named failure mode (*optimizing engagement instead of learning*), inherited with its
  structural prohibition: **engagement, time-on-task and session count MUST NOT be objectives at
  any level** (TQ-7 §10.3, `C-32`). §20 tracks net D3 direction per campaign for exactly this.
- **Frontier estimate error.** D3 is an offset from a frontier that may be wrong. AR-4 ranks D3
  last partly for this reason: the dial with the least reliable reference point should move least
  often.
- **Difficulty used to relieve confusion.** The most expensive misdiagnosis in the system, because
  when the confusion is a productive collision, lowering difficulty dissolves it. §15.3 exists to
  prevent exactly this.

### 13.7 Falsifiable prediction

*Under fluency-gated difficulty rises, the share of advancement events later reversed by
delayed-retrieval failure falls relative to correctness-gated rises.* If it does not, the fluency
gate is costing pace for nothing — which would be a finding against `foundations/02`, not against
this section, and would need to be reported there.

---

## 14. AT-11 · Cognitive Load Adaptation

### 14.1 An honest opening: the theory library does not exist

`educational-brain/cognitive-load/` is cited across the Brain tree as the owner of the
intrinsic/extraneous/germane distinction and the Cognitive Load Engine. It was planned in
Delivery 2 §5 and **never authored** (§0.1 E; AF-2).

Phase 3 does not fill it. Authoring load theory inside an architecture document would be Brain-tree
authoring under another owner's cover, and it would produce exactly the duplicated ownership the
governance registry exists to prevent. §14 therefore designs only the **control response** and
defers the theory, explicitly and by name.

### 14.2 What the control layer owns

| Owned here | Deferred |
|---|---|
| The element budget as a dial value (D5) | What counts as an element (`cognitive-load/`, unauthored) |
| The decomposition level and its projection to Phase 1 axis 6 | Intrinsic vs extraneous vs germane (deferred) |
| Which pressure lowers load, and when it is legal | The theory of why decomposition works (deferred) |
| The proxy set and its error profile (§14.3) | A working-capacity instrument — **ABSENT everywhere** (§3.5) |

### 14.3 Load runs on proxies, and says so

No working-capacity instrument exists anywhere in the repository — Phase 1 §3.4 recorded this and
Phase 3 inherits it. D5 therefore moves on proxies, each with a declared weakness:

| Proxy | Reading | Weakness |
|---|---|---|
| **Complexity dissociation** | performance degrades with *complexity* while content difficulty is held | The strongest available proxy; it is `assessment/09`'s own C4 signature. Requires items that vary complexity independently of content, which most do not |
| **Latency inflation** vs the learner's own baseline | responses slowing on equivalent items | Confounded with fatigue, distraction, and the asynchronous medium |
| **Error locus shift** | errors move from schema selection to execution | Requires item structure the evidence model may not carry |
| **Self-report** | "this is a lot" | Under-reported by exactly the learners most affected (`placement/02`'s shame model) |

**Every D5 move is marked `capacityUnknown`** until an instrument exists. That mark is not
decoration: §20's load metrics must not be reported as capacity measurements, and a future phase
that builds the instrument must be able to find every decision made without one.

### 14.4 The control response

The pressure `LOAD↓` is answered by **decomposition** — which is Phase 1 axis 6 and Phase 1 §7.3's
authored route for diagnosis C4. Phase 3 adds no second response and no second route. What it adds
is that decomposition has a *standing level* rather than being re-decided per failure, so a learner
who needed atomic steps last turn is not silently returned to whole-problem delivery this turn.

**Raising load is not a pressure of its own.** Load rises by *fade* — the same monotonic default as
scaffolding (SG-4) — as the learner's productions stop showing the load signature. A `LOAD↑`
pressure would be an invitation to overload someone who is merely quiet.

### 14.5 Responsibilities

Owns the element budget and decomposition level as dial values, the proxy set, and the
`capacityUnknown` marking. **Must not own** load theory (deferred), the C4 diagnosis
(`assessment/09`), axis 6's difference semantics (TQ-4), or method-internal load bounds (TQ-3 M6).

### 14.6 Failure modes

- **Proxy laundering.** A proxy reported often enough starts being read as a measurement — Phase 1
  R14, recurring here with a weaker proxy set. Mitigated only by the `capacityUnknown` mark and by
  §20 refusing to report load as capacity. **Residual: high.**
- **Decomposition without recomposition.** The learner masters atomic steps and never reassembles
  the whole. The whole is the skill; the steps were the scaffold. Mitigated by the fade default —
  D5 must return toward `whole` before the campaign completes, and a campaign completing at maximum
  decomposition is a defect signal.
- **Load confused with difficulty.** Both look like "too hard". AR-4 and §15.3 separate them; a
  system that does not will decompose problems the learner finds easy but numerous, and simplify
  problems the learner finds hard but few.

### 14.7 Falsifiable prediction

**Deliberately none.** A component whose central input has no instrument cannot make an honest
falsifiable prediction about that input's effect, and manufacturing one to satisfy a checklist
would be worse than the gap — Phase 1 §15's A10 established this precedent and it is followed here
rather than smoothed. §26 records A10 as PARTIAL for the same reason and names AT-11 as one of two
components lacking a prediction.

---

## 15. AT-12 · Misconception and Confusion Response

### 15.1 Scope — almost everything here is deferred

Misconception repair is fully owned: `educational-brain/misconceptions/` carries the six birth
types, the seven-step repair sequence (elicit → commit → collide → replace → contrast → apply →
re-probe), the burned-collision definition, and the metastasis-chain mechanism. Phase 1 routes
diagnosis **C2** to it and forbids re-explanation as a response. `MISCONCEPTION_REPAIR` is a live
posture.

**Phase 3 authors no repair step and no birth type.** It contributes exactly two rules, both about
what the *dials* must do so the authored repair is not destroyed by ordinary adaptation.

### 15.2 The repair dial freeze

The seven-step sequence depends on the learner **committing** to their own wrong answer and then
colliding with evidence. Ordinary adaptation is lethal to it:

```
 STEP           ORDINARY ADAPTATION WOULD…              CONSEQUENCE
 ────────────────────────────────────────────────────────────────────────────
 elicit         see a wrong answer → raise D1           the learner never commits
 commit         see hesitation → grant a hint (D2)      the commitment is diluted
 collide        see confusion → lower D3                the conflict is dissolved
                                                        — the repair becomes a re-teach
```

**The rule: during elicit → commit → collide, D1, D2 and D3 are FROZEN.** No support increase, no
hint grant, no difficulty reduction. The window is SG-6's first row.

This is not a new pedagogical claim. It is the primitive grammar's own ordering law —
`P26 SCHEMA ACTIVATION → P28 COGNITIVE CONFLICT INDUCTION`, activate before colliding — expressed
as a control constraint (C3-2). A dial move that pre-empts the conflict breaks a composition rule
in a FINAL document.

**After the collision** (replace → contrast → apply → re-probe) dials resume, and D1 **may rise
once** — schema replacement is genuinely new learning and deserves support, which the collision did
not.

**`P29 CONFLICT RESOLUTION PAUSE` is in the freeze window too.** The pause is the mechanism; filling
it with a hint (HL-3's failure at a different moment) ends the repair before it starts.

### 15.3 Confusion is three states wearing one word

The corpus treats confusion as one trigger — Phase 1 T3, *"affect-adjacent; assess affect first."*
That is correct as a first move and insufficient as a dial rule, because the three underlying
states demand **opposite** dial responses:

| Confusion is… | Signature | Correct dial response | Wrong response costs |
|---|---|---|---|
| **Affect** | uncorrelated with content difficulty; distress markers; help-seeking collapse | **None.** `C-31` preempts; dials hold, recovery clamp applies | Teaching through distress |
| **Load** | degrades with complexity, not content; latency inflation; errors at the end of long items | `LOAD↓` (D5 decompose), then `PACE↓` (D4) | The learner is overwhelmed by quantity and receives an easier *idea*, which insults and does not help |
| **Collision** | a confident prior contradicted by new evidence; the learner argues; the wrong answer is *stable* | **FREEZE** (§15.2). Do not soften anything | **The most expensive error in the system:** lowering difficulty during a productive conflict converts a repair into a re-teach, and the misconception survives with a burned collision |

**The disambiguation order is affect → collision → load**, and the reason for that order is
asymmetry of harm. Affect first because it has absolute priority and its cost is a learner who
stops returning. Collision **before** load because misclassifying a collision as load produces a
burned collision — `misconceptions/` records that a burned collision makes the *next* repair
harder, so the damage compounds — whereas misclassifying load as a collision costs one frustrating
turn that the next signal corrects.

**When the signals cannot separate collision from load, the safe branch is FREEZE.** Freezing a
learner who was merely overloaded costs one turn of unnecessary difficulty; softening a learner who
was mid-collision costs the repair and damages the next one. Asymmetric caution, applied the same
way `student-state/`'s design laws already apply it.

**Detection honesty.** Separating collision from load depends partly on the confidence signal,
which is a **PROXY** (§3.5). Where confidence is unavailable, the disambiguation degrades and the
safe branch is taken more often than it should be. That is a stated cost, not a hidden one.

### 15.4 Responsibilities

Owns the freeze window's dial semantics and the confusion disambiguation's *dial consequences*.
**Must not own** the repair sequence, birth types, or burned-collision semantics
(`misconceptions/`); the C2 diagnosis (Phase 1 §7.3); affect detection (`C-19`); or recovery
(`C-31`).

### 15.5 Failure modes

- **Freeze mis-entry.** The window opens on a suspected collision that is not one, and a genuinely
  overloaded learner is held at demand for several turns. Bounded by SG-5's oscillation/duration
  window and by the freeze ending at the collision step regardless of outcome.
- **Freeze evasion.** A hint is granted during the window because the hint path did not check the
  freeze. Mitigated structurally: hints are governed moves (§11.5's justification for keeping D2
  inside the ASV), so the freeze applies to them by construction.
- **Disambiguation on a proxy.** Stated in §15.3; unmitigated until the confidence instrument is
  real.

### 15.6 Falsifiable prediction

*Campaigns in which the dial freeze held through the collision step will show higher
misconception-repair durability at re-probe than campaigns in which a dial moved mid-collision.*
If durability is unchanged, the freeze is costing responsiveness for nothing and SG-6's first row
should be narrowed to the collide step alone.

---

## 16. AT-13 · The Adaptation Escalation Order

### 16.1 The missing rung

This is the section a reviewer should test hardest, because it is the only one that arranges other
owners' components into a sequence.

Phase 1's response to a struggling learner has two settings. **Refinement** (§7.6) holds the
representation constant, names what the learner got right, and narrows to the failing sub-claim —
the correct move when something worked. **Re-teach** (§7.4) changes a primary axis under the
Difference Operator — the correct move when the approach failed. Between them, unhoused, is the
move a human tutor makes more often than either:

> *Same teaching. Same representation. Same claim. One notch more support, or one step smaller,
> or a little slower.*

That move is not a refinement (nothing partially worked; the scope is unchanged), and for four of
the six dials it is not a re-teach either, because those four have **no axis in Phase 1's operator
at all**: a hint grant, a difficulty step, a pace change and an interleaving change cannot be
expressed as a primary-axis change, so under L1 they read as paraphrase and are illegal. For those
four the move genuinely has no home, and a system faithful to Phase 1 must either narrow scope it
should not narrow or change an axis it has no diagnosis for. **Rung 2 is that move.**

**Scope correction (v3.1.0 — blocking issue B3).** v3.0.0-draft claimed rung 2 for all six dials.
That claim is false for **D1 SCAFFOLD and D5 LOAD**, whose projections onto Phase 1 axes 7 and 6
mean Phase 1 *does* already house them — as re-teaches, with a budget (§9.4a). The honest claim is
therefore narrower and still substantial:

> **The missing rung is genuine for D2 HINT, D3 DIFFICULTY, D4 PACE and D6 INTERLEAVING — four of
> six dials, and the four that account for most within-turn adaptation. For D1 and D5 the move is
> not missing from Phase 1; what was missing was a *standing value* for it and a rule against
> oscillating it.** Rung 2 remains the correct place for D1/D5 moves too, but those moves are
> budgeted re-teaches under BB-1 ∧ BB-2 rather than free adjustments.

Placing this rung — and paying for the half of it that Phase 1 already owns — remains Phase 3's
single largest contribution to the existing architecture, at two-thirds of the size v3.0.0-draft
claimed for it.

### 16.2 The order

```
 RUNG   MOVE                          OWNER                        BUDGET
 ──────────────────────────────────────────────────────────────────────────────────
  0    HOLD / CONSOLIDATE             foundations/02 (FRAGILE)     per D1-grid rule
       one more of the same;          Phase 1 T9
       dials frozen (SG-6)

  1    REFINE                         Phase 1 §7.6                 2 narrowing passes
       name what was right;                                        (Phase 1's own)
       narrow to the failing
       sub-claim; dials frozen

  2 ★  ADAPT                          ★ PHASE 3                    governor-bounded
       one dial, one step,                                         (dwell · rate ·
       under the governor                                          hysteresis · SG-5)
       D1/D5 on failure ALSO                                       + Phase 1 §7.7
       consume Phase 1's budget                                      when BB-1 ∧ BB-2
       (§9.4a, EL-7)                                                 (§9.4a)

  3    RE-TEACH                       Phase 1 §7.4                 3 attempts/claim/
       one primary axis + closure;                                 session (Phase 1 §7.7)
       also a dial move if the
       axis is 6 or 7 (§5.4)

  4    ESCALATE                       decision-engine/05           per-ladder
       the authored ladder for                                     (authored)
       the failed method

  5    ABANDON THE STRATEGY           TQ-1 §4.6                    abandonment
       Phase 3 and TQ-4 recommend;                                 conditions
       TQ-1 decides                                                (pre-declared)

  6    LEAVE THE CONCEPT              placement/ + assessment/02   —
       prerequisite micro-diagnosis
```

### 16.3 The laws that make it an order rather than a list

**EL-1 · Diagnosis determines the entry rung; the ladder is not always entered at 0.**
Phase 1 §7.3's six causes route directly:

| Diagnosis | Entry |
|---|---|
| **C1** missing prerequisite | **rung 6** immediately. Adapting around a missing prerequisite manufactures failure |
| **C2** misconception | **off this ladder entirely** — the repair track, with the §15.2 freeze |
| **C3** representation mismatch | **rung 3** (axis 1 or 3). Rung 2 cannot fix a representation mismatch, and trying wastes turns |
| **C4** load overflow | **rung 2** (D5) — this is the rung C4 was always looking for |
| **C5** attention / affect | **off this ladder** — `C-31` preempts |
| **C6** tutor defect | **off this ladder** — *give*, and log against the decision |
| *Undiagnosed but legal* (T5 partial, T7 silence, T9 fragile) | rung 0 or 1 per Phase 1's own routing |

**Only C4 and the undiagnosed-legal cases enter at rung 2.** That is a narrow gate, deliberately:
rung 2 is not a general softener, and a system that entered it by default would be the comfort-drift
failure with a ladder around it.

**EL-2 · No rung is skipped upward without a recorded reason.**
Jumping from 1 to 4 may be correct; doing it silently is not. The reason is written to the
adjustment record.

**EL-3 · A rung is exhausted before the next is entered.**
Each rung's budget is its owner's, listed above. Phase 3 adds no budget to another owner's rung and
sets only rung 2's, which the governor already bounds.

**EL-4 · Descending is legal and unremarkable.**
A learner who succeeds after rung 3 returns to rung 0. The ladder is not a ratchet, and treating it
as one produces a system that only ever gets more elaborate.

**EL-5 · `decision-engine/05`'s six standing moves map onto the rungs; no seventh move is invented.**

| Standing move (authored) | Rung | Mapping |
|---|---|---|
| REPEAT | 0 | Legal once, delivery problems only — authored constraint, unchanged |
| STEP BACK | **2** | *"one step / one sub-step, silently"* — a D1 or D5 move |
| STEP FORWARD | **2** | A D3 or D1 move on the fluency signal |
| CHANGE MODALITY | **3** | Phase 1 axis 1 — a re-teach, not a dial (§5.3) |
| CHANGE REPRESENTATION | **3** | Phase 1 axis 3 |
| CHANGE PREREQUISITE | **6** | Via micro-diagnosis, authored |
| END SESSION | — | `C-33` / `C-31`; not on this ladder |

Three of the six authored standing moves turn out to be dial moves under other names, and two are
re-teaches. That the authored move set partitions cleanly across rungs 2 and 3 is the strongest
available corroboration that rung 2 is a real rung and not an invention — the corpus was already
making these moves, with no layer that distinguished them from re-teaching.

**EL-7 · Rung 2 is not a cheaper name for rung 3. (added v3.1.0 — B3)**
A rung-2 move on D1 or D5 taken in response to a failure **is** a Phase 1 re-teach and consumes
Phase 1 §7.7's budget (§9.4a, BB-1 ∧ BB-2). It stays at rung 2 because the *teaching* is unchanged
and the escalation order should reflect the size of the move, not its cost — but it is paid for at
rung 3's rate. When Phase 1's budget is exhausted, D1/D5 failure-response moves leave the candidate
set and the ladder advances to rung 3 or 4 on the remaining dimensions. **No adaptation path
bypasses the budget**, and the ladder does not acquire an unbudgeted lane.

**EL-8 · This order does not resolve ISS-01. (added v3.1.0 — B1)**
`ISS_01_LADDER_RECONCILIATION.md` is BLOCKED on a pedagogical decision about the live 6-phase
ladder's CHECK/PRACTICE ordering and its interaction with the 10-state TSM. §16's rungs are an
*escalation* order over responses to difficulty; ISS-01's is a *phase* order over teaching states.
They are different objects and Phase 3 must not be read as having settled the second. Whichever way
ISS-01 resolves, §10.3's phase clamps must be re-checked against the resulting phase order (AF-11).

**EL-6 · Exhaustion at rung 2 is a signal, not a decision.**
When the governor rejects every legal dial move and pressures persist, AT-13 emits
`adaptationExhausted` to TQ-1. **TQ-1 decides** whether that meets an abandonment condition. Phase 3
never abandons a strategy (§17.3).

### 16.4 Failure modes

- **Rung 2 as the default.** Every difficulty answered with a dial nudge; nothing is ever
  re-taught. Detected by §20's rung-distribution metric — a distribution concentrated at rung 2 is
  a defect signal, not efficiency.
- **Rung inflation.** Escalating to rung 4 or 5 on thin evidence because the lower rungs feel too
  small. Bounded by EL-2's recorded-reason requirement.
- **Ladder/ladder confusion.** `decision-engine/05`'s per-method ladders live *inside* rung 4;
  reading them as a competing sequence would produce two escalation orders. EL-5's mapping exists
  to prevent that reading, and §19.2 states that where an authored Protocol declares its own
  escalation, it wins outright.

### 16.5 Falsifiable prediction

*With rung 2 available, the rate of re-teaches that change an axis the diagnosis did not implicate
falls* — because the system is no longer forced to express "a bit more support" as an axis change.
If that rate does not fall, rung 2 is not being entered, or Phase 1's L2 was already preventing the
mis-typed re-teaches this rung was meant to absorb — in which case rung 2's justification is weaker
than §16.1 claims and should be re-argued.

---

## 17. AT-14 · Campaign Adaptation

### 17.1 The contract with Phase 1, stated in one direction

Phase 1 owns the campaign objects. Phase 3 owns the control state that runs inside them. The
interaction is one of **containment**, and containment has to be stated in both directions or one
side will quietly absorb the other.

| | Phase 1 (campaign) | Phase 3 (control) |
|---|---|---|
| Object | `TeachingStrategy`, `ConceptArc` | `AdaptationStateVector` |
| Scope | one concept-attempt | one concept, spanning attempts (§17.2) |
| Created by | TQ-1 selection | initialized at campaign start from archetype defaults |
| Ended by | abandonment / completion | **not ended by abandonment** — see §17.2 |
| Constrains | which methods and actions | how those actions are parameterized |
| May cause | strategy abandonment | **only a recommendation** (§17.3) |

### 17.2 What survives an abandonment — and why it is not obvious

Phase 1 §4.6 is emphatic: an abandoned strategy is never resumed, a new attempt is a **new
campaign** with `attemptOrdinal + 1`, a fresh arc, and a fresh selection. The obvious inference is
that the ASV resets too. **It should not**, and the reasoning is worth stating because getting it
wrong reproduces the invisible restart at the control layer:

> The archetype failed. The learner's *capacity* did not change when it failed. A learner who
> needed decomposed steps and a slow pace under `A8 ANALOGICAL-TRANSFER` still needs them under
> `A1 CONCRETE-FIRST`. Resetting the dials to defaults at abandonment would restart every
> adaptation the campaign had earned, and the learner would experience the new approach arriving
> at a pace and support level already demonstrated not to work.

**The rule:**

```
 ON STRATEGY ABANDONMENT:
   D1 SCAFFOLD     carried, capped at the new archetype's phase clamp
   D4 PACE         carried
   D5 LOAD         carried
   D2 HINT         reset (item-scoped; the item is gone)
   D3 DIFFICULTY   reset to the new archetype's entry, because difficulty is
                   relative to a frontier the failed approach could not measure
   D6 INTERLEAVING reset to blocked (a new campaign begins blocked)

 Carried values are marked `carriedFrom: <strategyId>` so their provenance is
 visible and their evidence is not attributed to the new archetype (AV-2's
 principle applied across a campaign boundary).
```

**On campaign COMPLETION the vector is retained, not discarded** — it is the starting estimate for
the next campaign on this concept after decay (Phase 1 §5.0's regression path). Retention is
subject to the same decay treatment `placement/06` applies to knowledge: a support level from
fourteen months ago is a weak prior, not a setting.

### 17.3 Phase 3 never abandons

`adaptationExhausted` (EL-6) is a **recommendation** into TQ-1's existing abandonment machinery,
alongside TQ-4's. TQ-1 decides. Three reasons this must be one-directional:

1. TQ-1's abandonment conditions are **pre-declared at selection time**, which is what makes
   holding a strategy meaningful (§4.6). A second component that could abandon on its own criteria
   would void that.
2. Exhausted adaptation is genuinely ambiguous evidence: it may mean the approach is wrong, or that
   the concept is premature, or that the dial set is too coarse for this learner. Only TQ-1 sees
   enough to choose.
3. Two abandonment authorities would produce the drift Phase 1 §4.6 explicitly designs against.

### 17.4 Re-placement is never a dial move

If adaptation exhaustion coincides with prerequisite evidence, the correct move is rung 6 —
`placement/`'s machinery, unchanged. **Lowering dials until a concept becomes passable is the
control-plane form of a fake completion**, and `placement/03`'s prohibition on fake completions
applies to it directly.

### 17.5 Cross-concept and multi-campaign interaction

Phase 1 R12 records, unmitigated, that a session running three concurrent campaigns may produce
register whiplash. Phase 3 inherits that risk and adds one observation and one non-decision:

- **Observation.** The ASV is per-concept, so a session spanning three concepts carries three
  control states. Some dials are plausibly learner-global within a session rather than
  concept-scoped — D4's wait-time multiplier under fatigue is the clearest case, since fatigue is
  not concept-specific.
- **Non-decision.** Phase 3 does **not** introduce a session-global dial layer. It would be a
  second vector with a second scope and an unstated precedence rule against the first, which is a
  worse defect than the imprecision it would fix. Recorded as **AQ-3**, with the observation that
  `C-33`'s session budget is the existing nearest control and should be tried first.

### 17.6 Falsifiable prediction

*Campaigns whose second attempt carries the first attempt's pace and load settings will reach
unassisted production faster than campaigns whose second attempt resets them.* If carrying makes no
difference, §17.2's carry rule is complexity without benefit and the vector should reset at
abandonment.

---

## 18. Adaptive Decision Inputs, Outputs and Constraints

### 18.1 Inputs

All inputs are **published outputs of existing components**. Phase 3 reads no component's internal
state, in conformance with Phase 1 §11.1 and the Contract.

| Input | Source | Status (§3.5) |
|---|---|---|
| D1-grid read of the last response (speed × correctness × confidence) | Plane 1 + runtime signals | PRESENT / PRESENT / **PROXY** |
| Student states (affect · cognitive · drive · knowledge-trajectory) + their priority band | `decision-engine/02` | RECORDED |
| The five posture signals (mastery, misconception confidence, transfer, calibration, momentum) | the live adaptive engines | PRESENT |
| Diagnosis (six causes) and trigger class (T1–T11) | Phase 1 TQ-4 | derived per turn |
| Committed strategy + archetype + `commitments[]` | Phase 1 TQ-1 | PLANNED (Phase 1 gated) |
| Current arc phase + phase clamps | Phase 1 TQ-2 | PLANNED |
| Target success band + affect veto state | **`C-32`** | charter exists; instrument does not |
| Authored hint ladder for the current item | CEKR / EBC pack | schema PRESENT, content sparse |
| Authored Protocol escalation, where one exists | `docs/curriculum/protocols/` | 1 reference implementation |
| The standing ASV | ADR 10 store (AH-2) | **ABSENT** |
| Learner personalization fields (persistence, attention span, recovery speed) | `student-state/` | PARTIAL |

### 18.2 Outputs

| Output | Consumer | Nature |
|---|---|---|
| `AdaptationConstraint[]` | `C-28` **Band 2** (legality) | **subtractive** — removes candidate moves. This is Band 2's existing semantics (`kernel/policy/types.ts`), not a Phase 3 invariant |
| `AdaptationParameters` | `C-28` **Band 5** (personalization) | **parameterizing only** — how the selected action is delivered. Corrected from "Band 3" in v3.1.0 (§0.6.2) |
| `AdjustmentRecord` | Ledger → TQ-7 Tier A/D, `eos-v3/05`, `eos-v3/06` | evidence |
| `adaptationExhausted` | **TQ-1** | recommendation only (§17.3) |
| `contradictory-pressure`, `clamp-conflict`, `oscillation-detected` | defect channel | defect signals |
| Authoring defects (HL-7, ladder gaps, concept dial-bound gaps) | authoring queue | routed exactly as Phase 1 §7.7 routes its own |

### 18.3 The two contracts

```
 AdaptationConstraint {
   dial, clause, scope: concept | item | turn,
   severity: MUST | SHOULD,
   forbiddenActions[]          -- narrowing only; never adds an action
   dialSetVersion, policyVersion
 }

 AdaptationParameters {
   scaffoldLevel               -- D1, 0–4
   hintRungGranted             -- D2, or H0
   difficultyOffset            -- D3, relative to frontier (a TARGET, not an item)
   pace { newElementRate, turnDensity, waitMultiplier }   -- D4
   load  { elementBudget, decompositionLevel }            -- D5
   interleaving                                            -- D6
   capacityUnknown: bool       -- §14.3
   proxyFlags[]                -- every input whose status is PROXY
   dialSetVersion, policyVersion
 }
```

**Three invariants:**

- **NARROWING ONLY.** `AdaptationConstraint` may remove options and may never add one. This is what
  guarantees Phase 3 cannot make an illegal action legal — the same guarantee Phase 1 §11.3 gives
  for its three contracts, and the same one `EOS_V2` §5.2 already imposes on Band 5.
- **NO EVIDENCE CLAIMS.** Neither contract asserts that a learner knows anything. Phase 1 §11.3
  corrected `ArcConstraint` for carrying `requiredEvidence[]`; Phase 3 does not repeat that error.
  Advancement remains `C-29`'s alone.
- **NO ACTION NAMES IN PARAMETERS.** `AdaptationParameters` describes conditions, never moves. A
  parameter set that named an action would be selecting one.

### 18.4 Interface catalogue

```
 resolvePosture(learnerProjection, signals, currentPosture)  → Posture
 derivePressures(state, d1Read, diagnosis, posture)          → Pressure[]
 arbitrate(pressures, clamps, posture)                       → Pressure | none
 proposeMove(pressure, asv)                                  → DialMove
 govern(move, asv, history, freezeWindows)                   → Accept | Defer | Reject(reason)
 commit(move, asv)                                           → AdaptationStateVector
 constraintsFor(asv, arcPhase, strategy)                     → AdaptationConstraint[]
 parametersFor(asv)                                          → AdaptationParameters
 escalationRung(diagnosis, history)                          → Rung
 adaptationExhausted(conceptId, learnerId)                   → bool + evidence
```

All are **pure** given their arguments and the standing vector, so trajectories replay
deterministically (§4.4).

---

## 19. Adaptive Governance

### 19.1 What may change without an architecture amendment

| Change | Requires |
|---|---|
| A dwell, rate, hysteresis or window **value** | Policy-store change (§19.3) + review |
| A dial's **range or semantics** | Architecture amendment + `dialSetVersion` bump + AV-3 migration |
| **Adding or removing a dial** | Architecture amendment + C3-1 + AV-4 justification |
| A **new pressure source** | A new *authority*, not a heuristic (§7.5) |
| An **arbitration rule** (AR-1…AR-8) | Architecture amendment; these are the phase's core |
| A **freeze window** | Architecture amendment, citing the authority the freeze protects |
| A **posture** | ADR 08 / runtime owner — not Phase 3's to add (§6.2) |

### 19.2 Precedence — authored beats generic, everywhere

Inherited from Phase 1 §4.5 S1 and applied without exception:

```
 1  An authored Protocol's own escalation and entry/exit clauses
 2  A concept blueprint's declared dial bounds (when the field exists — AF-7)
 3  A method's own prohibitions and quality contract (TQ-3)
 4  Generic dial policy (this document)
```

A generic dial rule never overrides authored human expertise about a specific concept. Where the
two disagree, the authored artifact wins and the disagreement is recorded as feedback to whichever
is wrong.

### 19.3 Constants live in a policy store, not here

Every numeric threshold in §9 — dwell counts, hysteresis gaps, reversal windows, rate limits — is a
**BrainConfig value**. **Corrected in v3.1.0 (B1):** `RS §18` is *"the only normative source for
constants"* under the authority ladder and already ships the values Phase 3's dials consume
(`budgets.*`, `fluency.latencyFactor` = 1.25×, `fluency.count` = 3, `recovery.behavioralTrigger` =
2 consecutive failures, `conv.maxConsecutiveQuestions` = 2, `session.affectBudget.cap` = 2 /
lessonOne 1). New governor constants are therefore **additions to RS §18**, proposed against that
document; ADR 10's `BrainConfig` store is the *persistence* proposal, not the normative source.
v3.0.0-draft named only ADR 10 and thereby pointed at the wrong authority. This document
deliberately publishes **no numbers**. Two
reasons: they must be calibrated against Tier C outcomes and should be expected to move (Phase 1
OQ-5's precedent), and numbers in an architecture document acquire a false authority that survives
the evidence that should have changed them.

### 19.4 Experimentation

Dial policy is a legitimate experiment surface. It runs under **`C-43`'s existing exploration
slice** and OSF's experimental design. Phase 3 reserves no slice of its own and defines no
experiment framework — a second experimentation authority would confound the first.

### 19.5 The structural prohibition, restated

**Engagement, time-on-task, session count and success rate MUST NOT be objectives of the control
plane at any level.** This is `C-32`'s own prohibition and TQ-7 §10.3's, inherited verbatim because
the adaptive layer is where it is easiest to violate: every dial has a direction that raises
short-term comfort, and a control plane optimized for comfort inverts into the assistant behaviour
the whole architecture exists to prevent — without any single adjustment being individually wrong.
That is precisely why the prohibition must be structural rather than a matter of judgement, and why
§20's counter-metrics measure net direction rather than per-move correctness.

---

## 20. Adaptive Metrics

### 20.1 Boundary

Adaptive metrics are **Tier A process metrics** and **Tier D attribution inputs** under Phase 1
TQ-7. They measure whether adaptation had the properties of good adaptation. **They are not
evidence of learning.** Only Tier C — delayed unassisted retrieval — is, and Tier C is
methodologically OSF's. A report generated from §20 may not be captioned as showing that learning
occurred.

Phase 3 defines **no outcome metric** and **no new evidence store**.

### 20.2 Process metrics

| Metric | Reads | Detects |
|---|---|---|
| **Adjustment rate** per session and per campaign | adjustment records | drift (high) vs inertia (zero) |
| **Per-dial distribution** | adjustment records | over-reliance on one dial (§12.6) |
| **Reversal rate** per dial | adjustment records | oscillation; validates SG-3's hysteresis |
| **Rejected-move rate**, by governor reason | governor rejections | over-damping (§9.6) |
| **Rung distribution** (§16) | escalation records | rung-2 default (§16.4); rung inflation |
| **Sustained-pressure rate** — pressure present ≥ N turns, unanswered | rejected pressures | **under-adaptation**; arbiter starvation |
| **Ineffective-adjustment rate** — adjustment followed by no change in the pressuring signal | adjustment + next-turn join | **over-adaptation**; wrong dial choice |
| **Contradictory-pressure rate** | arbiter events | a defect signal against **Plane 1's state model**, not against the arbiter |
| **Freeze-window integrity** — dial moves attempted inside a window | governor rejections | implementation defects at the highest-cost moments |
| **Posture residency** | posture records | the self-sealing posture failure (§6.5) |
| **Proxy-dependence share** — decisions made with `capacityUnknown` or a PROXY flag | parameters | proxy laundering (Phase 1 R14) |
| **Budgeted-move share** — D1/D5 moves flagged `consumesReteachBudget` as a share of all D1/D5 moves *(added v3.1.0 — B3)* | adjustment records | a collapse toward zero means BB-1 ∧ BB-2 has been mis-set and the budget is being bypassed |

### 20.3 Counter-metrics

Directions that look like success and are not. Two are Phase 1's, reused verbatim rather than
restated as new.

| Counter-metric | What it detects |
|---|---|
| **Net dial direction toward ease** across a campaign | **comfort drift** — the control plane's defining failure |
| **D1 rising while mastery rises** | over-scaffolding / expertise reversal (§10.6) |
| **Campaign completing at D1 < 4** | advancement on assisted evidence — should be structurally impossible (§10.3); non-zero means the clamp is leaking |
| **Campaign completing at maximum decomposition** | decomposition without recomposition (§14.6) |
| *Hint-take rate rising with mastery* | **Phase 1 TQ-7 §10.3** — scaffolding substituting for competence |
| *Success rate near 100%* | **Phase 1 TQ-7 §10.3** — the struggle band abandoned toward comfort |
| **Adjustment rate rising with no change in Tier B indicators** | adaptation theatre — the system is busy and nothing moves |

### 20.4 The attribution join

For each dial, direction, and posture: its effect on Tier B indicators and Tier C retention,
conditioned on learner state, concept and archetype. This is TQ-7 Tier D's machinery and OSF's
causal apparatus. Phase 3 supplies the process side — which is why `rejectedPressures[]` (§7.4) is
mandatory, for the same counterfactual reason Phase 1 made `alternativesRejected[]` mandatory.

**Phase 3 attempts no causal inference of its own.**

### 20.5 The core adaptive quality statement

> Adaptation was good if the conditions of teaching changed when the learner's state called for
> it, changed by the smallest sufficient amount, changed on a dimension the state actually
> implicated, did not change back, and the record says why.

Five clauses, five failures: inertia, over-correction, wrong dial, oscillation, and unattributable
drift. Every metric above maps to one of them.

---

## 21. Failure Modes and Fallback Architecture

### 21.1 Consolidated failure modes

Per-component modes are in §4.6, §5.9, §6.5, §7.5, §8.4, §9.6, §10.8, §11.7, §12.6, §13.6, §14.6,
§15.5. Six are **system-level** — they arise from the composition, not from any component.

| # | Failure | Why it is systemic | Detection |
|---|---|---|---|
| **F1** | **Comfort drift.** Every dial has an easing direction; each individual move is defensible; the campaign ends softer than it began with no one decision at fault | No single component is wrong. Only the *net direction over time* reveals it | §20.3 net-direction counter-metric; SG-4's monotonic-fade default makes every raise an event |
| **F2** | **Adaptation theatre.** The loop runs, records, publishes — and the vector never moves because persistence is absent or the governor over-damps. Everything looks instrumented | Health looks identical to function from every log except dial movement | §20.2 adjustment rate = 0 with non-empty pressure sets |
| **F3** | **Two-vector divergence.** The ASV and Phase 1's AttemptVector disagree about agency or granularity because two writers | The projection (§5.4) is a design rule that nothing enforces until AH-3 lands them in one field group | Cross-check axis 6/7 against D5/D1 in the decision record — **impossible until AH-3** |
| **F4** | **Ladder collision.** §16's order, `decision-engine/05`'s four ladders, and an authored Protocol's escalation all fire | Three authored escalation structures exist and Phase 3 is the first to sequence them | §19.2's precedence; EL-5's mapping; a `precedence-conflict` defect |
| **F5** | **Proxy compounding.** The D1 grid's confidence axis is a proxy; §15.3's disambiguation, D3's fluency gate and several pressures all read it. One unvalidated signal drives many decisions | Each consumer is individually honest; the *aggregate* dependence is what is dangerous | §20.2 proxy-dependence share; every parameter set carries `proxyFlags[]` |
| **F6** | **Empty content, complete logic.** Hint ladders, concept dial bounds and authored Protocols exist for a small minority of concepts. Every component is complete as logic and thin as content | Phase 1 R1, recurring. No architecture solves it | Inert-component rates as first-class reported quantities, exactly as Phase 1 reports degraded-execution rate |

### 21.2 Fallback: the blind-adaptation ladder

**AP8: with no usable signal, the vector holds.** It does not guess, and it does not drift toward
ease. The ladder, most-capable first:

```
 AF0  FULL          All inputs present. The loop runs as specified.

 AF1  PROXY-FLAGGED Confidence is a proxy. The loop runs; §15.3's
                    disambiguation takes its safe branch (FREEZE) more often;
                    every parameter set carries proxyFlags[].

 AF2  PARTIAL       Some inputs absent. Pressures derivable only from the
                    absent inputs are not emitted — NOT estimated. Dials with
                    no live pressure source HOLD.

 AF3  BLIND         No usable state read this turn. The vector HOLDS at its
                    standing values and publishes them unchanged. No dial moves
                    in either direction. Recorded as an adaptation-blind turn.

 AF4  NO STATE      No persisted ASV (today's real condition). The loop
                    publishes ARCHETYPE DEFAULTS — the values Phase 1's
                    archetype and TQ-2's phase clamp already imply — and
                    adapts nothing. Behaviour is exactly today's behaviour,
                    plus a record that adaptation is unavailable.
```

**Precedence against RS P-3 degraded mode (added v3.1.0 — B2).** `src/lib/eos-runtime/
degradedMode.ts` implements RS `P-3` — *degraded deterministic mode*, template renders and scripted
moves, *"banner-free (learner not told 'AI down')"* — and its own header states the principle this
ladder independently arrived at: *"a second template body would be a second owner of degraded
pedagogy."* The two ladders describe different scarcities and must not be merged:

> **P-3 governs generation availability; the AF-ladder governs adaptation availability.** They
> co-occur, and P-3 wins the turn: in a P-3 turn the vector **holds and publishes its standing
> values** (AF3/AF4 behaviour), because a degraded turn still needs support conditions to render
> at. Phase 3 introduces **no second degraded mode, no template path, and no banner**.

**AF4 is the current state of the world**, and saying so is the point: an architecture whose
degraded mode is *"the system as it exists today, with a defect report attached"* fails safely, and
its first implementation stage cannot regress anything.

**Two rules bind the whole ladder.** *Never fabricate a state read* — an absent signal produces no
pressure, never an estimated one, following Phase 1 §3.4.1's inert-not-heuristic precedent.
*Degradation is always recorded* — an unrecorded fallback is indistinguishable from a healthy loop
that had nothing to do, which is F2.

### 21.3 Profiles: clamps, not adaptations

Some situations impose authored bounds. These are **clamps applied to the vector**, never
adjustments, and they are never arbitrated against (AR-6).

| Profile | Clamp | Authority |
|---|---|---|
| **First lesson** | The authored hard limits — 1 concept, ≤3 new words × 3 uses, 2-sentence bursts, ≤6 questions, failure budget 1, WM as 2 slots | `first-lesson/02` — Phase 3 sets **no** lesson-one value of its own |
| **Recovery** | All dials to the recovery clamp; exit at one rung below entry (SG-8). **Raised by `frustration.ts`'s `FLOODED` state and released via `RECOVERING`** (added v3.1.0 — B2); `STRAINED` selects the `strained` column of RS §18's budget table rather than the full clamp | `C-31` + `kernel/frustration.ts` |
| **Unaided assessment** | D1 = 4, D2 = H0, frozen | `assessment/05`, Phase 2 §9.2 |
| **Session close** | Dials held; content is dropped before the close, never the close | `C-33` |
| **Accessibility / reading-load signature** | Channel and burst adaptations per the authored signature | `student-state/05` §7 |

**Every clamp is another owner's authored rule.** Phase 3 contributes only the statement that
clamps bound the arbiter's range rather than competing with it — which is what stops a generic dial
policy from quietly overriding `first-lesson`'s limits on the one occasion they matter most.

---

## 22. Extensibility and Scalability

### 22.1 Extending the dial set

A new dial requires all four:

1. **C3-1** — it is the standing parameter of a Category-F primitive that has no dial.
2. **AV-4** — its movements are not expressible as a combination of existing dials. *A blend of two
   dials is a **preset**, not a dial.*
3. A stated **coupling relation** to every existing dial (independent, correlated, or confounding —
   §5.6).
4. A stated **projection** onto Phase 1's axis set, or an explicit statement that none exists.

Presets — named bundles such as a "fatigue profile" — are legitimate and are **not** dials. They
are clamps (§21.3) or archetype defaults, and they are subject to SG-2's named-protocol rule for
multi-step moves.

### 22.2 A learned dial policy

The evolution `C-30` and `C-32` both anticipate. It enters under one constraint:

> A learned policy may **rank moves the governor has already declared legal**. It may not replace
> the governor, propose an illegal move, or move more than one dial.

This is the existing tactics-band containment pattern — a learned policy over an enumerated space
with the legal set as an action mask. It requires the decision-consequence join (§20.4), which
requires the adjustment record, which requires AH-3. **No learned policy is possible before Stage 1
data exists**, and claiming otherwise would be the kind of roadmap fiction §25 is written to avoid.

### 22.3 New subjects and new authoring surfaces

- **New subject:** none of AT-1…AT-14 is subject-specific. Dials, pressures, arbitration and the
  governor are domain-independent by construction, exactly as the primitive library is. What a new
  subject needs is *content* — hint ladders, concept dial bounds, authored Protocols — which is the
  Curriculum/Brain program's, not Phase 3's.
- **New authorable objects:** concept dial bounds (AF-7) would be a **blueprint field**, authored
  under the existing Blueprint Specification. Phase 3 designs no authoring format and no SDK
  affordance; `EDUCATIONAL_BRAIN_AUTHORING_SDK` would need to support it, and that is recorded as a
  handoff rather than designed here — Phase 1 §0.1 C set this precedent for TQ-3's Method schema.

### 22.4 Scalability

- **Per turn.** The loop is enum comparisons, one arbitration over a set that is almost always
  empty or singleton, and a table lookup. **No LLM call** (Permanent Rule 9). Cost is negligible
  against the generation it parameterizes.
- **Storage.** One ASV per learner × concept — the same cardinality as Phase 1's campaign objects
  and bounded by the same thing. Adjustment records are append-only and grow with *adjustments*,
  not turns, and most turns produce none.
- **The real scaling limit is content, not computation.** At ~1,756 concepts, the binding constraint
  on adaptation quality is authored hint ladders and concept dial bounds. This is Phase 1 R1 and
  OQ-1 recurring, and Phase 3 does not solve it.
- **Replay.** Determinism (§4.4) means a trajectory replays exactly, which is what makes offline
  evaluation of a dial-policy change possible without touching a learner. **Corrected v3.1.0 (I4):
  that evaluation belongs inside `VALIDATION_FRAMEWORK_P10.md`'s existing tiers and frozen fixture
  set, and inside `kernel/simulation/`'s existing persona and invariant harness — not beside
  either.** Phase 3 defines no harness, no fixture format and no evaluation tier; a dial-policy
  change is a new *case* for instruments that already exist.

---

## 23. Risks

| # | Risk | Severity | Likelihood | Mitigation | Residual |
|---|---|---|---|---|---|
| **AR-R1** | **Comfort drift (F1).** Individually defensible moves compose into a campaign that got easier for no reason. | **High** | **High** | Structural: SG-4's monotonic default makes every raise an event; §19.5's objective prohibition; §20.3's net-direction counter-metric. None of these prevents it — they make it *visible*. | **Medium–High.** The honest dominant risk of any control plane, and it is a discipline problem as much as a design one. |
| **AR-R2** | **Empty content (F6).** Hint ladders and concept dial bounds exist for a small minority of concepts; AT-8 is inert for most items. | **High** | **Certain** | Inert-not-improvised (§3.5); inert rates reported as first-class quantities; authoring defects routed (HL-7). | **High** — Phase 1 R1 recurring; no architecture solves it. |
| **AR-R3** | **Over-damping (§9.6).** Every governor rule is a brake; a conservative parameterization produces a system that never adapts and looks stable. | **High** | **Medium** | §20's sustained-pressure and rejected-move metrics; §4.7's prediction targets exactly this; constants live in a tunable policy store (§19.3). | Medium |
| **AR-R4** | **Two-vector divergence (F3).** The ASV and the AttemptVector disagree about agency/granularity. | High | **Medium** | The two-lock rule (§5.4) is a design rule with **no mechanical enforcement** until AH-3 lands both in one field group. | **Medium — unmitigated until AH-3.** |
| **AR-R5** | **Proxy compounding (F5).** One unvalidated confidence signal drives §15.3's disambiguation, D3's fluency gate and several pressures. | **High** | **High** | `proxyFlags[]` on every parameter set; §20's proxy-dependence share; §15.3's safe branch under absence. Measuring the proxy's error profile is named as Stage 1 work — it is Phase 1's R14 with more consumers. | **Medium–High.** |
| **AR-R6** | **Rung 2 becomes the default (§16.4).** Every difficulty answered with a dial nudge; nothing is re-taught. | Medium | **Medium** | EL-1's narrow entry gate (only C4 and undiagnosed-legal); §20's rung distribution. | Medium |
| **AR-R7** | **Layer count.** Phase 3 adds fourteen named components to a system that already has forty-plus engines and two canonical phases. | **High** | Medium | Nine of the fourteen are thin (a rule set, not a mechanism); no new decision authority; two narrowing contracts; §25 sequences arrival. **Complexity is a real cost and is not fully mitigated.** | Medium |
| **AR-R8** | **Self-sealing posture (§6.5).** A demand-capping posture suppresses the evidence needed to leave it. | Medium | Medium | §20's posture-residency counter-metric treats long residency as a defect against the exit condition, not a fact about the learner. | Medium |
| **AR-R9** | **Freeze-window sprawl.** SG-6 grows until dials rarely move. | Medium | Low | The table is closed; each entry cites an existing authority; §20 tracks attempted moves inside windows. | Low |
| **AR-R10** | **D3's weak grounding.** Difficulty is the one dial with no Category-F primitive and a frontier estimate that may be wrong. | Medium | Medium | AR-4 ranks it last-to-move; §13.2 confines it to item selection; recorded as AQ-2. | Medium |
| **AR-R11** | **Governance drift.** Phase 3's concepts leak into implementation ahead of G1/G2 because dials look like small, safe changes. | Medium | **Medium** | Explicit gating in the header; §25's stages routed through Wave 0 (AH-8). Dials are *especially* prone to this: "just add a scaffold level" reads like a tweak and is a persistence change. | Low–Medium |
| **AR-R12** | **Adaptation experienced as management.** The learner notices being adjusted. | Medium | Medium | The invisibility rules (§12.3, §10.4, §13.4) are inherited authored law, not new. But they are behavioural constraints on a fluent renderer, which is exactly the class Phase 1 P2 says instructions do not hold. | **Medium — the mitigation is weaker than the risk.** |

---

## 24. Trade-offs

**T1 · A closed dial set vs. expressiveness.**
*Chosen:* six dials plus D3, closed, amended by version. *Cost:* real adaptive moves outside the
set cannot be expressed and must be routed as re-teaches or clamps. *Why:* an open set cannot be
arbitrated over, cannot accumulate evidence, and cannot be tie-broken deterministically — Phase 1
§4.4's reasoning, which applies here identically.

**T2 · Stability vs. responsiveness.**
*Chosen:* stability, via dwell, hysteresis and rate limits. *Cost:* the system will sometimes be
slower to answer a genuine pressure than a human tutor. *Why:* oscillation is worse than lag. A
tutor who cannot decide whether the learner can do this is more damaging than one who is
consistently a little behind — and lag is detectable and tunable (§20), while oscillation
corrodes the relationship silently.

**T3 · A prohibition table vs. a closure function.**
*Chosen:* prohibitions (§5.6). *Cost:* a genuinely forced coupling, if later discovered, cannot be
expressed and must be handled as two sequenced adjustments. *Why:* Phase 1 R4b names
over-permissive closure as the Difference Operator's principal residual risk. A prohibition table
has no such failure mode — it can only forbid.

**T4 · A transient inside a standing vector.**
*Chosen:* D2 HINT lives in the ASV despite resetting per item (§11.5). *Cost:* a real inconsistency
in the vector's semantics. *Why:* the alternative places the quantity most easily confused with
scaffolding outside the structure whose purpose is keeping them apart, and puts hint grants outside
the governor — where HL-3 and HL-6 must be enforced.

**T5 · Extending the live posture set vs. designing a clean one.**
*Chosen:* the live seven, verbatim. *Cost:* they were derived for School-mode signals and their
boundaries are uneven (`CONFIDENCE_CORRECTION` fires on a narrow conjunction; `ACCELERATED_GROWTH`
is also the fallthrough). *Why:* a competing set would be the exact failure Phase 1 §17.2 names.
The uneven boundaries are recorded as AQ-4, not silently fixed in another owner's territory.

**T6 · Deferring load theory.**
*Chosen:* design the control response, defer intrinsic/extraneous/germane to the unauthored Brain
library (§14.1). *Cost:* AT-11 is the weakest component in the phase and carries no falsifiable
prediction. *Why:* authoring load theory inside an architecture document would create the duplicate
ownership the registry exists to prevent, and would place pedagogy in a document the pedagogy owner
does not own.

**T7 · Fourteen components.**
*Chosen:* name each responsibility separately. *Cost:* AR-R7 — the phase looks larger than its
substance, and nine components are thin. *Why:* collapsing them would hide the ownership seams,
and every seam in this phase abuts another owner's territory. A smaller document would be a less
reviewable one.

---

## 25. Future Implementation Guidance

**Nothing here is approved.** Every stage is G1/G2-gated and enters through the Wave 0 instrument
(AH-8).

### 25.1 Sequencing principle

Same as Phase 1 §14.1: **sequence by evidence-unlock, not by apparent value.** A stage that
produces no new recorded quantity cannot be evaluated and cannot inform the next.

### 25.2 Proposed stages

| Stage | Content | Unlocks | Gate |
|---|---|---|---|
| **S1 · Capture** | The ASV and the adjustment record become captured fields on the decision record and an existing ADR 10 store — **as one field group with Phase 1's AttemptVector** (AH-3). Nothing adapts. | Everything. §20 becomes computable; F3 becomes detectable; the learned policy (§22.2) becomes conceivable | G2 — persistence change |
| **S2 · Publish, hold** | The loop runs at **AF4**: publishes archetype defaults and adapts nothing. Behaviour is byte-for-byte today's. | Proves the loop is inert-safe before it is allowed to move anything | G2 |
| **S3 · Two dials** | D4 PACE and D5 LOAD only — the two cheapest, most reversible, least visible dials. Full governor. | The first real adaptation, on the dials whose failure costs least | G2 |
| **S4 · Scaffold** | D1, with phase clamps (§10.3) and evidence visibility (AH-6). | Rung 4-only advancement becomes structurally enforced | G2 + AH-6 |
| **S5 · Hint** | D2, on concepts with authored ladders **only**. Inert elsewhere. | The hint decision layer, where content exists | G2 + authored ladders (G1-adjacent) |
| **S6 · Difficulty** | D3, D6, and the `C-32` band integration (AH-1). | The full vector | G2 + `C-32` owner acceptance |
| **S7 · Rung 2** | §16's escalation order wired across Phase 1, `decision-engine/05` and the governor. | The missing rung, once every lower dependency is real | G2 + Phase 1 implementation |

### 25.3 What must be true before S3

- S1's records exist and are queryable, and the ASV persists across turns and sessions.
- Phase 1's campaign objects exist, or S3 runs with no strategy frame and AP4 is unenforceable.
- The policy store holds the governor's constants (§19.3); constants must not ship hardcoded, or
  §20's tuning loop is impossible.
- The confidence proxy's error profile has been measured against held-out human judgement — this is
  Phase 1's own named Stage 1 work, and AR-R5 makes it more urgent here than there.

### 25.4 Standing constraints on every stage

No stage may: add a decision authority; make an illegal action legal; introduce a second LLM call
(Permanent Rule 9); write to a store it does not own; set the target band; override the affect
veto; or advance a teaching state. Every stage must leave AF4 reachable as a fallback.

---

## 26. Acceptance Criteria

Criteria for the **document**, not for an implementation.

| # | Criterion | Status |
|---|---|---|
| **AA1** | Every briefed scope item is designed, deferred with a named owner, or split — with the disposition stated. | ✅ §0.5 (9 of 22 deferred) |
| **AA2** | Phase 1 §17's seven-step reconciliation executed **before** design work and published. | ✅ §0, §28 |
| **AA3** | Every architecture authority in the repository carries exactly one verdict, produced from a directory listing. | ✅ **MET IN v3.1.0 — it was FALSE in v3.0.0-draft.** That draft had no governance/process section, leaving ~21 authorities unclassified including `EDUCATIONAL_BRAIN_BIBLE.md` (zero mentions), `DEPENDENCY_RULES.md`, `ISS_01_LADDER_RECONCILIATION.md` and `README.md` itself, while asserting completeness via an escape clause no category row supported. §0.1 F and G now classify every one; the escape clause is removed. |
| **AA4** | The canonical adaptation stack is published with one owner and one authority per level. | ✅ §0.2 |
| **AA5** | The governance registry is reconciled and every cross-owner handoff is explicit. | ✅ §0.3 — AH-1…AH-10 |
| **AA6** | Contradictions found between reused authorities are recorded, not smoothed or resolved. | ✅ §0.4 — AC-1, AC-2, AC-3 |
| **AA7** | No component duplicates an existing authority; every "must not own" is explicit. | ✅ §3.4 and per-component |
| **AA8** | Existing taxonomies, ladders and scales are reused verbatim rather than re-derived. | ✅ EOS v2's 0–4 scale, the 7 postures, the D1 grid, the six standing moves, CEKR/EBC's hint model, `decision-engine/02`'s priority order |
| **AA9** | The boundary with Phase 1's Difference Operator is stated as a projection with a two-lock rule, not as an overlap. | ✅ §5.4 |
| **AA10** | Every required input carries existence status, owner, acquisition path and defined absent-behaviour. | ✅ §3.5 — five-level scale, reused from Phase 1 |
| **AA11** | Arbitration is deterministic and total: every pressure set has a defined outcome, including empty and contradictory. | ✅ §8.2 AR-1…AR-8 |
| **AA12** | Stability is specified, not assumed: dwell, rate, hysteresis, freeze, oscillation, post-recovery re-entry. | ✅ §9.2 SG-1…SG-8 |
| **AA13** | The escalation order across all owning authorities is stated, with entry rules and no skipped rungs. | ✅ §16 |
| **AA14** | Constraints are narrowing-only and carry no evidence claims. | ✅ §18.3 |
| **AA15** | Metrics are process metrics, bounded against TQ-7 and OSF, with counter-metrics. | ✅ §20 |
| **AA16** | A fallback exists for every degradation level, and the fully-degraded mode is safe. | ✅ §21.2 — AF4 is today's behaviour plus a defect report |
| **AA17** | Risks and trade-offs state residual risk and accepted cost, not only mitigations. | ✅ §23, §24 |
| **AA18** | Every component declares a falsifiable prediction. | ⚠️ **PARTIAL — two components, stated plainly (M5).** §4.7, §5.10, §6.6, §8.5, §9.7, §10.9, §11.8, §12.7, §13.7, §15.6, §16.5, §17.6 carry predictions. **AT-11 (§14.7) declares none, deliberately and with reasons; AT-2's (§5.10) is weak and is counted as partial rather than met.** Following Phase 1 A10's precedent: a prediction manufactured to satisfy a checklist is worse than an acknowledged gap. Carried as debt against Stage 1 data. |
| **AA19** | No code, runtime, schema, API, prompt, database, UI, curriculum or KG change; no pseudocode; no implementation plan. | ✅ document only |
| **AA20** | Implementation guidance is sequenced by evidence-unlock and explicitly gated. | ✅ §25 |
| **AA21** | Open questions are recorded as open rather than resolved by assertion. | ✅ §27 |
| **AA22** | Every new object passes an admissibility test against the frozen primitive architecture. | ✅ C3-1; §22.1 |
| **AA23** | **Independent merge-gate review recommends approval.** | ❌ **NOT MET — and not self-certifiable.** §29. A merge-gate review of v3.0.0-draft returned DO NOT APPROVE on B1/B2/B3; v3.1.0 answers all three. A further independent review is required and this document does not anticipate its outcome. |
| **AA24** *(new v3.1.0)* | **Every live runtime subsystem that could own part of the control plane carries a verdict of reuses / extends / constrains / duplicates.** | ✅ §0.1 G and §0.7 — four subsystems, nine mechanisms; **one duplication found and eliminated by placement** (§0.7.1), five reuses, three constraints |
| **AA25** *(new v3.1.0)* | **No adaptation path bypasses a Phase 1 budget.** | ✅ §9.4a (BB-1…BB-4), §16.3 EL-7, §5.4's budget consequence, §4.3's `consumesReteachBudget` capture, §20.2's audit metric |
| **AA26** *(new v3.1.0)* | **The document states the authority ladder it sits under, and every claim that crosses a frozen document defers to it.** | ✅ §0.6 — Phase 3 is row 6 (Advisory); band numbering corrected to EOS v2's; constants deferred to RS §18 |

**AA18 and AA23 remain the two open criteria; AA3 moved from falsely-met to met.** AA18 is accepted
debt against Stage 1 data. AA23 is structural: Phase 1 §18 forbids the author from certifying the
document, and this document does not.

**Scope confirmation (required by the revision brief).** Architectural scope did **not** expand in
v3.1.0. Component count is unchanged at fourteen (AT-1…AT-14). The dial set is unchanged at six
plus D3. No principle was added or removed (AP1…AP10 intact). No new adaptive subsystem, contract,
store, evidence table, asset kind, error code, primitive, posture, state or taxonomy was
introduced. The only new *rules* are §9.4a's budget classifier and AV-5's restatement of an
admissibility test that already existed; both **narrow** what Phase 3 may do. Two new handoffs
(AH-11, AH-12) and three new feedback items (AF-9…AF-11) are records, not designs. The one
substantive reduction is §16.1's narrowing of the missing-rung claim from six dials to four.

---

## 27. Open Questions

Recorded as open because answering them by assertion would be worse.

**AQ-1 · Is six the right number of dials?** The set is justified by C3-1 (one Category-F primitive
each), which is a principled bound but not an empirical one. Category F contains nineteen
primitives; six were judged to have standing parameters. A reviewer should test that judgement —
particularly **P83 INTERLEAVING CONTROL** (is D6 a dial or a scheduling decision belonging to the
Review Scheduler?) and **P55 WAIT TIME** (folded into D4 as a sub-setting; it could be its own
dial).

**AQ-2 · D3 has no primitive.** Difficulty is admitted because `C-32` names it and AP3 needs it,
but it is realized by item selection in another component's territory. It is the weakest member of
the set. Either the vector should carry a target that is not a dial, or difficulty control genuinely
belongs entirely to `C-30`/`C-32` and the ASV should reference it rather than hold it.

**AQ-3 · Should some dials be session-global rather than concept-scoped?** Fatigue is not
concept-specific, so D4's wait multiplier plausibly is not either. Phase 3 deliberately does **not**
introduce a session-global layer (§17.5) because a second vector with an unstated precedence rule
would be worse. But the imprecision is real.

**AQ-4 · The live posture set's boundaries are uneven.** `CONFIDENCE_CORRECTION` fires on a narrow
conjunction; `ACCELERATED_GROWTH` is both a posture and the fallthrough default. Phase 3 adopted
the set verbatim rather than fixing it in another owner's territory. Whether it should be
regularized is the runtime owner's question, informed by usage data that does not yet exist.

**AQ-5 · What is the correct default when collision and load cannot be separated?** §15.3 chooses
FREEZE on asymmetric-harm grounds, and the argument is sound as far as it goes — but it is reasoning
from harm asymmetry, not from data, and it will hold a genuinely overloaded learner at demand some
of the time. This is Phase 1's OQ-4 (the refinement/re-teach boundary) recurring at a different
seam, and it is honest to say it is a lean rather than a decision.

**AQ-6 · Should hint debt decay?** CEKR's `MasteryCondition {hintDebt: 0}` is binary and per-item.
Whether a learner who needed hints in week one should carry any residue into week four's mastery
evaluation is a real question about what mastery means, and it belongs to whoever owns
`MasteryCondition`, not to Phase 3.

**AQ-7 · Is the ASV the right home for a learned policy's state?** §22.2 constrains a learned policy
to ranking legal moves, but says nothing about where its per-learner parameters live. Answering it
now would be designing for a stage that cannot begin until Stage 1 data exists.

**AQ-8 · Where does the human belong?** Phase 1's OQ-8 asks whether a human teacher may set a
strategy archetype. The dial analogue is sharper and more likely to arise: may a teacher pin a
scaffold level or a pace, and does that pin survive a governor rejection or a freeze window? A
human's judgement is high-weight evidence; a frozen collision window exists precisely because
softening it is tempting. Unresolved.

**AQ-9 · Where does a phase architecture document belong?** Phase 1's OQ-10 and Phase 2's VQ-8,
carried forward unchanged. Owner decision.

---

## 28. Reconciliation Procedure Execution Record

Phase 1 §17 executed in full, **before** design work.

| Step | Action | Result |
|---|---|---|
| **1 · Inventory** | Directory listing of `docs/architecture/` (52 pre-existing + `eos-v3/` 7), `docs/curriculum/` (8 specs + `protocols/` + `blueprints/`), `educational-brain/` (11 directories); targeted grep for `hint`, `scaffold`, `pace`, `load`, `difficulty`, `adaptive` across all of them | ~30 authorities touching adaptive territory identified (§0.1). The greps, not the listing, surfaced CEKR's `HintSpec`, EBC's E0401/E0402, and EOS v2's `scaffoldDial` |
| **2 · Governance registry** | Read in full | Decision Engine, Runtime, Evidence, ADRs and the Bible are the runtime owner's, Pappu a forbidden editor → §0.3's boundary and AH-1…AH-10. The Do-Not-Rebuild list was checked against every proposed object |
| **3 · ADR reconciliation** | Read what each ADR **selected**, not what it diagnosed | ADR 08's Posture/Action split is the home for §6; ADR 14 already carries `hint_tier_1..3`; ADR 13 owns evidence and Phase 3 must not add a store; ADR 10 carries an existing pacing-signals group |
| **4 · Document reconciliation** | One verdict per authority | §0.1. Superseded used zero times. **Three contradictions found and recorded rather than smoothed** (§0.4) |
| **5 · Ownership verification** | One owner per responsibility; every transfer stated | `C-32` keeps the loop, band and veto and gains an instrument (AH-1) — the only near-transfer in the phase, and it is a *gain*, not a takeover. No responsibility is removed from any existing component |
| **6 · Authority verification** | Checked every decision for a second decider | Two found. (a) Scaffold/agency would have had two authorities → resolved by the projection and two-lock rule (§5.4). (b) A new "adaptive mode" enum would have competed with the live posture selector → resolved by extending it (§6) |
| **7 · Independent review** | Performed on v3.0.0-draft; returned **DO NOT APPROVE** on B1/B2/B3. v3.1.0 answers all three. A further independent review is required | §29 |

**Re-execution record (v3.1.0).** Steps 1, 4, 5 and 6 were re-run after the review, because B1 and
B2 showed the first pass had sampled where it claimed to survey:

| Step re-run | What changed | Result |
|---|---|---|
| **1 · Inventory** | Re-enumerated by directory listing and **mechanically diffed against §0.1's tables** rather than checked by recollection | 21 unclassified authorities found, including the authority index and the Bible. §0.1 F added |
| **1b · Runtime inventory** | Extended from `src/lib/school/adaptive/` to `src/lib/kernel/`, `src/lib/kernel/policy/`, `src/lib/eos-runtime/`, `src/lib/teaching/conversationState.ts` | An implemented seven-band policy engine, an affect machine, a degraded mode and a live response-budget dial found. §0.1 G and §0.7 added |
| **4 · Document reconciliation** | Verdicts written for all 21 | Superseded still used zero times |
| **5 · Ownership verification** | Re-run over the newly found subsystems | Two sole owners identified in `README.md` §3 (`policy/engine.ts`, `policyMove.ts`); §8.3 and §3.4 now bound AT-5 against both. `C-32`'s transfer restated honestly (I1) |
| **6 · Authority verification** | Re-run per mechanism | **One duplication found** — AT-4's pressure derivation against `basePack.ts`'s `B4.d1.*` rules — eliminated by placing Phase 3's rules inside the existing pack (§0.7.1). Everything else is reuse or constraint |

**The anti-pattern that fired this time.** Phase 1 §17.2 names *"reconciling what a review named"*
and *"trusting the status line."* v3.0.0-draft did both: it reconciled the documents its own
reading surfaced, and it accepted EOS v2/v3's "reference design / SPECIFICATION" status lines
without checking whether the specification had been implemented. It had been. Phase 1 §18's clause
applies squarely — *"a finding of the form 'another previously unseen architecture document was
discovered' after §17's procedure has been executed indicates the procedure failed"* — and the
procedural remedy adopted here is recorded as feedback **AF-12** rather than as a private fix.

**Anti-patterns actively checked** (Phase 1 §17.2):

- *Reconciling the citation, not the design* — read what `C-32`, ADR 08 and ADR 14 **selected**.
- *Trusting the status line* — read `EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` (FINAL) in
  substance; its Category F appendix is the grounding of §5.
- *Reconciling what a review named* — the document list came from a directory listing.
- *Assuming territory* — the registry is cited in §0.3 and every runtime output is a proposal.
- *Inventing an existing class* — **this check fired three times**: the posture set, the scaffold
  dial, and the hint ladder each already existed. Each is extended rather than replaced. Without
  this check, Phase 3 would have shipped three duplicates.

**Verification beyond documents.** Five runtime files were read **read-only** for capability
verification: `teachingStrategy.ts`, `strategyEffectiveness.ts`, `teachingOutputBias.ts`,
`hintTag.ts`, and the relevant `route.ts` call sites. This produced AC-3 — a documented engine that
computes nothing — which no amount of document reading would have found, and which materially
changed §10's and §11's claims about their own novelty.

**Honest limitations.** Five, stated so a reviewer knows where to press hardest (expanded in v3.1.0; items 1–2 unchanged, item 3 revised, items 4–5 new):

1. **`PRIMITIVE_LIBRARY.md` was not read in full** (310 KB). Category F's membership was verified
   from `EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md`'s appendix and the P11/P12/P81/P82/P85 entries
   were checked directly. **C3-1 — the admissibility test the whole dial set rests on — is
   therefore the least-verified claim in this document.**
2. **The 15 permanent dependency rules were checked as Phase 1 checked them** — against
   `DEPENDENCY_RULES.md`'s per-engine sections and the Bible's citations, not against a single
   canonical enumerated list, because no such list was found in either file. Rule 9 (one
   probabilistic component per turn) is the one Phase 3 most directly depends on and it was verified
   in substance.
3. **`C-32`'s implementation status is now partly established, and remains partly open.** v3.1.0
   found the band engine, the frustration machine and the response-budget dial that implement parts
   of `C-32`'s charter, and reconciled them (§0.7). What was **not** established is whether a live
   rolling-window success-rate estimator or a target-band computation exists anywhere; no such code
   was found, but absence-of-finding is weaker than absence. §13 assumes `C-32`'s band is supplied
   and does not design it — if a live band controller exists, §13 is still under-reconciled.
4. **`PRIMITIVE_LIBRARY.md` was still not read in full** (310 KB). Category F membership and the
   P11/P12/P81/P82/P85 entries were verified; **AV-5 clause (a) remains the least-verified claim in
   this document.**
5. **The policy pack was read at the level of rule ids, bands and citations, not rule bodies.**
   `basePack.ts`'s guards and effects were not exhaustively evaluated. If a rule there already
   moves a dial-like quantity that §0.7.1 did not identify, a second duplication may exist.

---

## 29. Merge Requirements

Phase 3 may be merged only when **all** hold:

0. **The v3.0.0-draft merge-gate findings are confirmed resolved.** That review returned DO NOT
   APPROVE on B1 (incomplete inventory), B2 (unexamined implemented control layer) and B3 (a route
   around Phase 1's re-teach budget). v3.1.0 answers all three — §0.1 F/G, §0.6, §0.7 and §9.4a —
   and Appendix E maps every change to its issue. **The author does not certify that the answers
   are sufficient**; confirming that is the reviewer's task.
1. All acceptance criteria met except those explicitly carried as partial, with the carry stated
   (§26: AA18 partial, AA23 open; AA24–AA26 added in v3.1.0).
2. **An independent merge-gate review recommends approval.** Per Phase 1 §18 the author may declare
   only readiness and may never self-certify. The reviewer must assume nothing is correct and verify
   against the repository, not against this document.
3. The reconciliation record (§28) is confirmed complete by that reviewer — in particular that no
   further unreconciled adaptive authority exists, and that §28's five stated limitations are
   acceptable or are closed.
4. Handoffs **AH-1…AH-12** are acknowledged by the runtime owner as *proposals*. **Phase 3's merge
   authorizes none of them**, and in particular does not authorize the ASV persistence change,
   which is the one that looks small and is not.
5. G1 and G2 remain in force. Merging Phase 3 unblocks no implementation and adds no Wave 0 item by
   itself.
6. Merge convention: `--no-ff` merge commit, no squash, no rebase of public history.
7. On approval, the Bible, the governance registry and the EOS blueprint index gain Phase 3
   pointers (AH-7) — runtime-owner actions.

**Suggested reviewer focus**, re-ranked for v3.1.0 by where I judge this document weakest:

1. **§0.7's runtime verdicts** — the newest and least-settled material. In particular: is §0.7.1's
   "one duplication, eliminated by placement" the right count, or does `basePack.ts` contain
   further dial-like rules that §28's limitation 5 admits were not read at body level?
2. **§9.4a's BB-1…BB-4** — whether the budget classifier is *complete*. A move that is a failure
   response on a projected dial but is classified BB-4 would reopen B3.
3. **§16's escalation order with EL-7** — still the only section sequencing other owners'
   components, now with a budget interaction across a canonical phase boundary.
4. **§5.4's two-lock rule** — whether the projection preserves both operators or merely asserts it.
   AR-R4 says it is unenforced until AH-3 lands both vectors in one field group.
5. **AV-5 clause (a)** — §28's limitation 4 makes this the least-verified claim in the document.
6. **§15.3's disambiguation** — a PROXY signal plus an asymmetric-harm argument, not data (AQ-5).
7. **§14 AT-11** — the weakest component: no instrument, no theory library, no prediction.
8. **Whether fourteen components is warranted** (AR-R7, T7).

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **Adaptation State Vector (ASV)** | The closed set of six standing control dials, per learner × concept (§5). |
| **Dial** | A standing control parameter; the persistent setting of one Category-F regulation primitive (§5.2). |
| **Pressure** | A named, directional, attributable demand on exactly one dial, magnitude always one step (§7.3). |
| **Clamp** | An authored bound on a dial's range from another authority; never arbitrated against (§21.3). |
| **Freeze window** | An interval in which no dial may move, protecting an in-flight pedagogical structure (§9.2 SG-6). |
| **Posture** | One of the live seven adaptive stances toward a learner state; distinct from an archetype (§6). |
| **Projection** | The per-attempt expression of a standing dial in Phase 1's axis set — D1→axis 7, D5→axis 6 (§5.4). |
| **Two-lock rule** | A move touching a projected quantity must be legal both as a difference (TQ-4) and as a control move (AT-6) (§5.4). |
| **Rung 2 / ADAPT** | The escalation rung between refinement and re-teaching: same teaching, one dial step (§16). |
| **Hint debt** | Accumulated hint rungs granted on an item; attaches to and downgrades the evidence record (§11.4). |
| **Adaptation blindness** | A turn with no usable state read; the vector holds and the turn is recorded as blind (§21.2 AF3). |
| **Comfort drift** | A campaign whose net dial direction is toward ease with no single decision at fault (§20.3, F1). |
| **Clamp conflict** | Two clamps bounding one dial in opposite directions; the more restrictive wins, and an empty range emits a defect rather than picking a value (§8.4). |
| **Sustained pressure** | A pressure present and unanswered for ≥ N turns; the under-adaptation signal (§20.2). |
| **Budgeted dial move** | A D1 or D5 move taken in response to a failure; it is a Phase 1 re-teach and consumes Phase 1 §7.7's budget (§9.4a, BB-1 ∧ BB-2). |
| **Authority ladder** | `README.md`'s precedence order over architecture documents. Phase 3 sits at row 6, Advisory (§0.6.1). |
| **Adaptation theatre** | A loop that runs, records and publishes while the vector never moves (F2). |

## Appendix B — Compliance statement

Produced under the repository's Chief Architect governance rules, `README.md`'s authority ladder
(under which this document is Advisory, row 6 — §0.6.1), Phase 1 §17's reconciliation procedure,
and Phase 1 §18's self-certification prohibition. It reads and reuses the existing
corpus; introduces no parallel pipeline, decision authority, state machine, store, evidence table,
asset kind, error code, primitive, posture, state, or taxonomy; modifies no runtime, route, schema,
API, prompt, database, UI, component, curriculum file, Knowledge Graph, or `educational-brain/`
document; modifies no Phase 1 or Phase 2 content; contains no pseudocode and no implementation plan;
implements nothing; and requests no implementation approval. **Runtime code was read read-only for
capability verification and none of it was modified**: `src/lib/school/adaptive/*`,
`src/lib/school/tutoring/hintTag.ts`, `src/lib/kernel/` (incl. `policy/`, `frustration.ts`,
`policyMove.ts`, `tsm/`, `simulation/`), `src/lib/eos-runtime/`,
`src/lib/teaching/conversationState.ts`, and the relevant `src/app/api/learn/chat/route.ts` call
sites. Every finding about them is recorded as feedback (Appendix C) or as a proposal (§0.3),
never as a change. Where it found existing components sufficient it
consumed them by reference and said so; where it found defects in documents it does not own it
recorded feedback (Appendix C) rather than editing them.

## Appendix C — Feedback to other owners

**AF-1 · A documented live engine computes nothing.** `src/lib/school/adaptive/teachingOutputBias.ts`
is 13 lines; every exported function returns a constant. `ENGINE_REFERENCE.md` #16 describes it as
*"gates how much scaffolding the response should include"* and `DATA_FLOW.md` steps 17 and 55 place
its output in the turn flow. The hint bias threaded through `route.ts` is always `null`. Proposal:
correct the documentation (AH-9), and decide separately whether the engine should be implemented or
retired. *For the runtime owner.*

**AF-2 · `educational-brain/cognitive-load/` does not exist.** It is cited across the Brain tree as
the owner of the intrinsic/extraneous/germane distinction and the Cognitive Load Engine (Delivery 2
§5, planned, never authored). §14 is written around the absence. It is the largest remaining
dangling-citation gap in the tree of the kind Delivery 11 closed for `foundations/`. *For the Brain
authoring owner.*

**AF-3 · The hint ladder exists in four vocabularies** (AC-2): CEKR's `HintSpec`, EBC's `HintDef`
with unbounded `stage`, ADR 14's three `hint_tier_*` asset kinds, and `C-32`'s prose. No mapping is
stated between the unbounded stage and the three tiers. Phase 3 adopts CEKR/EBC as authoritative and
treats ADR 14's tiers as packaging, but a document should say so. *For the runtime owner.*

**AF-4 · The scaffold dial has two owners and two lifetimes** (AC-1): `EOS_V2_RUNTIME_SPECIFICATION`
§3.4 gives it to the TSM, scopes it to GUIDED and resets it on transition; `eos-v3` `C-32` gives it
to the struggle controller unscoped. Proposal AH-4. *For the runtime owner.*

**AF-5 · No working-capacity instrument exists anywhere.** Phase 1 §3.4 recorded this; Phase 3 is
its largest consumer and every load decision is marked `capacityUnknown` as a result. Restated
because a second phase now depends on it. *For the Twin / Student-Memory owner.*

**AF-6 · The live stalemate detector rotates on count, not on change.**
`strategyEffectiveness.ts` fires at three repeats of a posture on an unmastered topic. A posture
repeating three times *while the learner improves* is the system working; rotating out of it is a
false positive. Proposal: add a no-state-change condition. Separately, the live posture selector has
**no dwell** and re-derives from folds that flip on one response (§6.3). *For the runtime owner.*

**AF-7 · No field records concept-intrinsic dial bounds.** A concept whose minimum viable step size
is large, or whose load is irreducible, cannot say so. AT-10 and AT-11 therefore use archetype
defaults and may attempt an illegal decomposition. This is the adaptive analogue of Phase 1's
REQUIRED-BUT-ABSENT knowledge-type gap and Phase 2's absent CPA-position field. A **blueprint
field** under the existing Blueprint Specification is the natural home. *For the Blueprint /
Curriculum owner.*

**AF-9 · The band vocabulary differs between two frozen authorities** *(new v3.1.0)*.
`EOS_V2_ARCHITECTURE.md` owns band semantics and defines seven bands (0 interrupts, 1 obligations,
2 legality/subtractive, 3 authored dispatch, 4 policy tables, 5 personalization, 6 tie-break),
implemented as `BandId = 0…6` in `kernel/policy/types.ts`. `eos-v3/04` `C-28` summarizes four
(0 safety, 1 affect, 2 policy, 3 tactics). No mapping is stated between them, and the collision is
not benign: "Band 3" means *authored dispatch* in one and *tactics/selection* in the other. Phase 3
adopts EOS v2's numbering per the authority ladder (§0.6.2) and publishes the mapping there.
A statement in whichever document is authoritative would prevent the next reader repeating
v3.0.0-draft's error. *For the runtime owner.*

**AF-10 · `ENGINE_REFERENCE.md` #17 documents a file that does not exist** *(new v3.1.0)*.
Engine 17 "Teaching Style Detector" is documented at `src/lib/school/adaptive/teachingStyle.ts`
with a four-value output and a "trusts a stored last successful style" behaviour. **No such file is
on disk.** This is a second instance of the AC-3 class found while verifying the adaptive cluster,
and it matters for the same reason: a documented adaptive engine that does not exist invites a
future phase to reconcile against a capability the platform does not have. *For the runtime owner.*

**AF-11 · ISS-01's resolution will require re-checking §10.3's phase clamps** *(new v3.1.0)*.
`ISS_01_LADDER_RECONCILIATION.md` is BLOCKED on a pedagogical decision about the live 6-phase
ladder's CHECK/PRACTICE ordering. Phase 3's scaffold clamps (§10.3) are keyed on **phase identity**,
so whichever way ISS-01 resolves, the clamp table must be re-verified against the resulting phase
order. Recorded now so the dependency is not discovered later. Phase 3 does not resolve ISS-01.
*For the Decision Engine / runtime owner.*

**AF-12 · Phase 1 §17's procedure needs a mechanical completeness check and a runtime step**
*(new v3.1.0)*. Phase 1 §18 states that discovering an unreconciled authority after §17 has run
"indicates the procedure failed and must itself be amended." That happened here twice. Two
amendments are proposed, neither applied (Phase 1 is canonical and not this document's to edit):
**(a)** STEP 4 should require the document list to be **mechanically diffed** against the phase's
own verdict tables, not checked by reading — the omission of 21 authorities survived three passes
of careful prose review and was found in seconds by a diff; **(b)** the procedure should carry an
explicit **STEP 4b · runtime reconciliation** for phases that make claims about existing behaviour,
because a "SPECIFICATION" status line does not tell you whether the specification has been
implemented, and in this repository it had been. *For the Phase 1 owner.*

**AF-8 · `decision-engine/05`'s ladders have no dwell rule.** Four ladders specify what changes at
each rung and none specifies how long a rung is held. §9 SG-1 is Phase 3's answer for dials; the
authored ladders would benefit from the same. *For the Decision Engine owner — recorded, not
edited, per Phase 1 §17.3.*

## Appendix D — Explicit deferrals

Recorded so a later phase does not read silence as an opening.

| Deferred | To | Why |
|---|---|---|
| Strategy selection, transitions, abandonment | Phase 1 TQ-1 | Owned and canonical |
| Re-teaching, the Difference Operator, refinement | Phase 1 TQ-4 | Owned and canonical |
| Arc phases, transitions, resumption | Phase 1 TQ-2 | Owned and canonical |
| Method definitions and repair ladders | Phase 1 TQ-3 | Owned and canonical |
| Misconception birth types and the 7-step repair | `educational-brain/misconceptions/` | Authored; Phase 3 adds only the dial freeze |
| Learner states, detection, priority bands | `decision-engine/02`, `student-state/` | Authored; Phase 3 consumes |
| Affect detection and recovery | `C-19`, `C-31` | Owned; preemptive |
| The target success band and answer-withholding | `C-32` | Charter owned; Phase 3 supplies the instrument only |
| Hint content, ladder schema, easier-than law | CEKR, EBC | Authored and machine-checked |
| Intrinsic / extraneous / germane load theory | `educational-brain/cognitive-load/` (unauthored) | Not Phase 3's to author (AF-2) |
| Modality and visual decisions | Phase 1 axis 1, Phase 2 | Owned |
| Session shape, budget, close, compaction | `C-33`, `decision-engine/07` | Owned |
| Spacing and review scheduling | Review Scheduler | Owned |
| Mastery classification and advancement | `C-29`, ADR 07 | Owned; no dial advances anything |
| Outcome measurement and causal attribution | OSF, TQ-7 Tier C/D | Owned; Phase 3 makes no learning claim |
| Resolution of AC-1, AC-2, AC-3 | The runtime owner | Recorded, not resolved |

---

## Appendix E — Change log, v3.0.0-draft → v3.1.0-draft

**Nothing was redesigned.** Fourteen components, six dials plus D3, ten principles, two contracts,
and every rule in AT-1…AT-14 are unchanged in substance. The changes below are verification,
placement, and one scope reduction.

### E.1 Blocking issues → document changes

| Issue | Change | Where |
|---|---|---|
| **B1** Inventory incomplete; AA3 false | New **§0.1 F** — governance/contracts/process/frozen-v1.0 corpus, 22 verdict rows covering `README.md`, `EDUCATIONAL_BRAIN_BIBLE.md`, `DEPENDENCY_RULES.md`, `ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `VALIDATION_FRAMEWORK_P10.md`, `ISS_01_LADDER_RECONCILIATION.md`, `ARCHITECTURAL_GOVERNANCE_REGISTRY.md`, `EDUCATIONAL_BRAIN_V1.md`, `EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md`, `ARCHITECTURE_COMPLETION_REPORT_V1.md`, `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md`, `WAVE_0_APPROVAL_CHECKLIST.md`, `OUTCOME_SCIENCE_FRAMEWORK.md`, `MIGRATION_BLUEPRINT_V1.md`, `ARCHITECTURE_ISSUE_REGISTER.md`, `ARCHITECTURAL_ROOT_CAUSE_ANALYSIS.md`, `DEVELOPMENT_FLOW_DOCUMENT.md`, `PROJECT_TASK_BREAKDOWN.md`, `RUNTIME_MAINTENANCE_TRANSITION.md`, `MERGE_PLAN.md` and the four N/A operational records. **Documents with no adaptive relevance say so explicitly.** | §0.1 F |
| **B1** | New **§0.6** — authority-ladder compliance: Phase 3 is row 6 (Advisory); the band-numbering divergence recorded and resolved by the ladder; **all 15 permanent dependency rules** stated; dependency direction resolved | §0.6.1–§0.6.4 |
| **B1** | AA3 corrected from a false ✅ to a documented ✅ with the falsification recorded; completeness statement rebuilt without its escape clause; self-counting removed (M1) | §26 AA3, §0.1 |
| **B2** | New **§0.1 G** — five further runtime rows: `kernel/policy/`, `kernel/frustration.ts`, `kernel/{policyMove,parity,shadow,verifier,simulation,tsm,…}`, `eos-runtime/`, `conversationState.ts` | §0.1 G |
| **B2** | New **§0.7** — per-mechanism reconciliation with the four required verdicts. **Result: five reuses, three constraints, one duplication eliminated by placement** | §0.7.1–§0.7.4 |
| **B2** | Band 2 confirmed as reuse of existing subtractive semantics; **`AdaptationParameters` retargeted from Band 3 to Band 5**; ten band references corrected | §0.6.2, §0.2, §3.3, §4.3, §18.2, §18.3, §22.2 |
| **B2** | **AT-4's pressures and AT-6's governor rules are placed inside the existing policy pack** at Bands 2/4/5 — the duplication against `basePack.ts`'s `B4.d1.*` rules is removed by placement, not redesign | §0.7.1, §7.2 |
| **B2** | **AT-5 bounded against `policy/engine.ts`'s sole ownership** of conflict resolution; AR-3/AR-4/AR-8 expressed as band assignment, specificity and the engine's own tie-break | §8.3, §3.4 |
| **B2** | `frustration.ts` named as AR-1's preemption source and §21.3's clamp trigger | §8.2, §21.3 |
| **B2** | §21.2's fallback ladder scoped **inside** RS P-3 rather than beside it | §21.2 |
| **B2** | **D4/D5 recorded as REUSE of RS §18 normative budget keys** with a live implementation; dial *selects* a shipped value and never alters one | §5.2, §0.7.4 |
| **B2** | §4.3 step 7 corrected from *write* to *emit* — RS §13 forbids the policy plane from performing Evidence writes | §4.3, §0.6.4 |
| **B2** | Governor placement answered: rules are pedagogy, evaluation is runtime | §9.1 |
| **B3** | New **§9.4a** — the budget-bypass rule: BB-1…BB-4 determine consumption by *dial projection* ∧ *failure response*, not by name | §9.4a |
| **B3** | §16.1's missing-rung claim **narrowed from six dials to four** (D2, D3, D4, D6); D1/D5 acknowledged as already housed by Phase 1 | §16.1 |
| **B3** | New **EL-7** — rung 2 is not a cheaper name for rung 3; budget exhaustion removes D1/D5 failure-response moves from the candidate set at Band 2 | §16.3 |
| **B3** | Two-lock rule given its budget consequence; `consumesReteachBudget` added to the adjustment record; audit metric added; **AH-12** handoff added | §5.4, §4.3, §20.2, §0.3 |

### E.2 Important improvements → document changes

| ID | Change | Where |
|---|---|---|
| **I1** Ownership transfers | `C-32`'s "loses no responsibility" line **withdrawn**; the adjustment-decision transfer stated plainly and reconciled with AH-1 | §0.1 B |
| **I2** Dependency direction | RS §13's global plane law, the Policy Engine's forbidden-write contract, and `DEPENDENCY_RULES`' satellite law each stated and each satisfied; **AH-11** records that the wiring frame is the runtime owner's decision | §0.6.4, §0.3 |
| **I3** Runtime/doc mismatches | `teachingStyle.ts` documented-but-absent recorded as **AF-10** alongside AF-1 | Appendix C |
| **I4** Replay claim | Offline dial-policy evaluation reconciled **into** `VALIDATION_FRAMEWORK_P10.md`'s tiers and `kernel/simulation/`'s harness; no parallel harness | §22.4, §0.1 F |
| **I5** Dial admissibility | **AV-5** restates the test in two clauses so D3 is an explicit bounded exception rather than a silent breach | §5.7 |

### E.3 Minor improvements

| ID | Change |
|---|---|
| **M1** | Self-counting removed from the inventory denominator (52 pre-existing, not 53) |
| **M2** | §16.2's rung-2 budget column now names Phase 1 §7.7 when BB-1 ∧ BB-2 hold |
| **M3** | §12.2 states the lean on P55: it stays a D4 sub-setting, with the reason |
| **M4** | Appendix A gains *clamp conflict*, *sustained pressure*, *budgeted dial move*, *authority ladder* |
| **M5** | AA18 names **two** components lacking a prediction (AT-11 none, AT-2 weak), not one |

### E.4 What did NOT change

AT-1…AT-14's responsibilities, exclusions, interfaces and failure modes · the six dials and their
ranges · AP1…AP10 · AR-1…AR-8's content · SG-1…SG-8's content · the coupling prohibition table ·
the two-lock rule's structure · the escalation order's rungs and owners · §18's two contracts ·
§20's metrics and counter-metrics (one added) · §21's failure modes and AF-ladder shape ·
§23's risks · §24's trade-offs · §25's stages · every deferral in Appendix D.

Three new records (AH-11, AH-12; AF-9…AF-12) and one new criterion group (AA24…AA26) are
**records and checks, not designs**.

---

**READY FOR INDEPENDENT MERGE-GATE REVIEW**
