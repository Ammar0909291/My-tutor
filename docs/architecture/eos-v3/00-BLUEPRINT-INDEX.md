# Educational Operating System — v3 Reference Architecture

**Status:** Clean-sheet reference design. Architecture only — no implementation, no
technology choices, no code.
**Relationship to existing repo architecture:** additive and non-binding. This does not
modify, supersede, or unfreeze `EDUCATIONAL_BRAIN_BIBLE.md` (v1, frozen), ADRs 02–14,
or `EOS_V2_ARCHITECTURE.md`. §9 of this file states precisely what v3 inherits from v2,
what it replaces, and why.
**Intended use:** the reference design an implementation team would build against for a
decade, and the standard against which the current system can be honestly measured.

---

## 0. Charter

Build the architecture for a system that teaches any human, any subject, from absolute
beginner to genuine mastery, better than the best available human teacher, at a cost and
latency that permits a hundred million concurrent learners — and that remains
architecturally valid when the underlying models are replaced three times over.

Three constraints make this hard, and every design decision below traces to one of them:

1. **Teaching is a control problem, not a generation problem.** The output is not text.
   The output is a durable change in a human being. Text is merely the actuator.
2. **The learner is not observable.** Knowledge is a latent variable. Every architecture
   decision is really a decision about how to estimate a hidden state from noisy,
   sparse, adversarially-biased evidence.
3. **The system must be trusted with children.** Every decision must be explainable,
   auditable, reversible, and safe by construction — not by prompt.

---

## 1. First principles: what is a teacher, structurally?

Strip away everything cultural. A teacher is a closed-loop controller over another
mind. Four irreducible functions:

| # | Function | Formal statement | If missing |
|---|---|---|---|
| F1 | **Estimate** | Infer the learner's latent knowledge state from observable behaviour | Teaches the wrong thing to the wrong person |
| F2 | **Select** | Choose the intervention with highest expected long-run learning gain | Random walk through content; the "engaged but not learning" failure |
| F3 | **Deliver** | Render the intervention into a channel the learner can absorb | Correct pedagogy the learner cannot receive |
| F4 | **Verify** | Obtain evidence that the intended change actually occurred | Hollow advancement — the defining failure of educational software |

Everything else a great teacher does is an *amplifier* of these four: rapport increases
the honesty of the F1 signal; motivation increases the exposure over which F2 operates;
a good analogy raises F3's channel capacity; a well-designed probe raises F4's
statistical power.

**Architectural consequence.** The system decomposes along F1–F4, not along
"chat / content / progress" (which is a product decomposition) and not along
"prompt / model / response" (which is an infrastructure decomposition). The four
functions become four planes, and every component in this blueprint belongs to exactly
one of them plus one substrate.

---

## 2. The central inversion

Standard AI-tutor architecture:

```
learner text → prompt → LLM → response → learner
                        ↑
              (everything important happens here)
```

The model is the processor. Teaching quality is an emergent property of prompt text.
This architecture cannot be made excellent, for four structural reasons:

- **Non-determinism where determinism is required.** "Never advance a learner who has
  not demonstrated independent performance" is a rule that must hold 100% of the time.
  A prompt yields ~95%. The 5% is exactly the population that quietly fails.
- **No accumulation.** Every turn re-derives the learner from a transcript. Nothing the
  system learns about teaching is retained across learners.
- **No accountability.** When a learner is harmed, there is no decision record — only a
  sampled token sequence.
- **Model coupling.** The pedagogy *is* the prompt, so replacing the model replaces the
  pedagogy.

**v3 inverts it:**

```
learner signal → SENSORS → structured observation
                                    ↓
                        LEARNER MODEL (latent state estimate)
                                    ↓
                        DECISION KERNEL (deterministic)
                                    ↓
                        TURN CONTRACT (typed, machine-checkable)
                                    ↓
                    RENDERER (LLM) → VERIFIER (gate) → learner
```

The LLM is a **peripheral device** occupying exactly three roles, never a fourth:

| Role | Direction | What it does | What it must never do |
|---|---|---|---|
| **Sensor** | language → structure | Classify a learner utterance into typed observations | Decide what happens next |
| **Renderer** | structure → language | Voice a decision the kernel already made | Change, add to, or override the decision |
| **Author** | offline only | Draft candidate teaching assets for review | Reach a learner without passing review |

This is the single most important boundary in the blueprint. It is stated as Axiom A1
and enforced by the Output Verifier (C-31), the Turn Contract (C-04), and the
Dependency Rules (§7).

**Why it survives model progress rather than being obsoleted by it.** A better model
makes a better sensor and a better renderer — both roles improve monotonically inside
the same architecture. The reason not to let the model decide is not that it is weak;
it is that a decision-maker optimizing next-token plausibility is structurally aligned
with the learner's *present comfort*, while a teacher must be aligned with the
learner's *future competence*. Those objectives diverge exactly at the moments that
matter: withholding an answer, scheduling difficulty, refusing to advance. No amount of
capability closes an objective gap. It must be closed architecturally.

---

## 3. Design axioms

Binding. Every component below is checkable against these. Violations are architecture
bugs, not judgement calls.

**Substrate**
- **A1 — Model as peripheral.** No LLM output ever directly determines learner state,
  progression, or the next teaching action. Sensor → structure → kernel → contract.
- **A2 — The Ledger is truth.** All learner state is a materialized projection of an
  append-only, immutable evidence log. Any state must be reconstructible by replay.
- **A3 — Determinism where it matters.** Given identical state and inputs, the kernel
  produces an identical decision. Stochasticity is confined to rendering.
- **A4 — Every decision is explainable.** A decision that cannot cite the rule, the
  evidence, and the policy version that produced it is a bug, not a decision.
- **A5 — Two clocks.** Session time (turns, load, affect) and memory time (retention,
  decay, spacing) are independent and both first-class.

**Knowledge**
- **A6 — Concepts are claims, not topics.** A node is something a learner can be right
  or wrong about, and that can be independently verified. Chapters, units, and courses
  are *views*, never primitives.
- **A7 — Negative knowledge is first-class.** Misconceptions are nodes with lifecycle,
  prevalence, and repair paths — not annotations on positive knowledge.
- **A8 — Curriculum is compiled, not authored.** Sequences are derived from the graph
  plus a policy, and versioned as build artifacts.

**Learner**
- **A9 — Mastery is a distribution, not a number.** Every belief carries uncertainty,
  provenance, and a decay law.
- **A10 — Absence of evidence is not evidence.** "Unknown" and "known to be absent" are
  different states and must never collapse.
- **A11 — The model describes, never judges.** Learner state stores behaviour and
  evidence, never verdicts about the person.
- **A12 — High-water marks are permanent.** Demonstrated competence is never erased by
  decay; it is re-cued, never re-taught from zero.

**Teaching**
- **A13 — Strict decision preemption.** Safety > Affect > Pedagogical policy > Tactics.
  A lower band can never override a higher one, and the model can never override any.
- **A14 — Legality, not plans.** The teaching machine forbids illegal states (assess
  before teach; advance on echo; three questions in a row) rather than following a plan
  that can be abandoned.
- **A15 — Struggle is scheduled, not avoided.** The system targets a productive failure
  rate, not maximum success.
- **A16 — Every turn is a contract.** What the turn may and may not do is declared
  before generation and verified after.

**System**
- **A17 — Single ownership.** Exactly one component may write each piece of state.
  Everyone else reads.
- **A18 — Degrade, never fail.** Every dependency has a declared degradation rung; the
  system teaches something useful even with no model available.
- **A19 — Pedagogy is versioned and testable.** Teaching policy is a versioned artifact
  with a regression suite, like code.
- **A20 — Test on simulated learners before real ones.** No pedagogical change reaches
  a child before it has been run against the learner simulator.
- **A21 — Cost and latency are pedagogical constraints.** A budget breach degrades
  teaching quality, so it is an architectural concern, not an ops concern.
- **A22 — The learner owns their model.** Exportable, portable, inspectable, erasable.
- **A23 — Decade-stable schema.** The learner record must survive a decade of schema
  evolution without losing meaning; all evolution is additive plus replay.
- **A24 — Human override exists everywhere.** For any autonomous decision there is a
  named human channel that can inspect, veto, and correct it.

---

## 4. The OS map — six planes

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ PLANE 5 · GOVERNANCE            Ethics board · Policy versioning · Audit ·      │
│ (spans all planes)              Data rights · Human override · Safety charter   │
├────────────────────────────────────────────────────────────────────────────────┤
│ PLANE 4 · IMPROVEMENT           Experiment Engine · Learner Simulator ·         │
│ (offline / async)               Causal Analytics · Content Pipeline · Authoring │
│                                 · Asset Economy · Curriculum Compiler           │
├────────────────────────────────────────────────────────────────────────────────┤
│ PLANE 3 · DELIVERY   (F3)       Prompt Compiler · Renderer · Output Verifier ·  │
│                                 Conversation Controller · Visualization ·       │
│                                 Multimodal I/O · Relationship & Motivation      │
├────────────────────────────────────────────────────────────────────────────────┤
│ PLANE 2 · DECISION   (F2)       Decision Kernel · Teaching State Machine ·      │
│                                 Strategy · Recovery · Placement · Review        │
│                                 Scheduler · Struggle Controller · Session Planner│
├────────────────────────────────────────────────────────────────────────────────┤
│ PLANE 1 · UNDERSTANDING (F1,F4) Sensor Bank · Learner Twin (epistemic,          │
│                                 affective, metacognitive, identity) ·           │
│                                 Misconception Engine · Mastery Engine ·         │
│                                 Memory Model · Assessment Engine                │
├────────────────────────────────────────────────────────────────────────────────┤
│ PLANE 0 · SUBSTRATE             Evidence Ledger · Clocks · Turn Contract ·      │
│                                 Capability Plane (model routing) · Identity ·   │
│                                 Knowledge Substrate · Degradation Controller    │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Dependency law:** a plane may depend on planes strictly *below* it. Plane 4 reads
everything and writes only to Plane 0 (as new evidence, assets, or policy versions).
Plane 5 can veto any plane but implements none. No upward dependency exists anywhere.
This single rule is what makes the system testable: every plane can be exercised with
the planes above it absent.

---

## 5. Runtime flow — the anatomy of one turn

Nine stages. Stages 1–4 and 7–9 are deterministic; stochasticity exists only in 5–6.

```
 1. INGEST      raw signal (text, audio, ink, image, silence, latency) + wall clock
                → normalized MultimodalObservation
                ↑ nothing is discarded here; timing and prosody are data (§C-33)

 2. SENSE       Sensor Bank: N independent typed classifiers, run in parallel
                → ObservationSet {correctness, confidence, affect, intent,
                  misconception match, metacognitive marker, off-task, distress}
                each with its own confidence + abstention option

 3. UPDATE      Learner Twin applies ObservationSet → posterior belief update
                Ledger append (evidence rows) happens HERE, before any decision
                → LearnerState (projection), StateDelta (what changed and why)

 4. DECIDE      Decision Kernel, in strict band order:
                  Band 0 Safety      → may terminate or hand off
                  Band 1 Affect      → may preempt to Recovery
                  Band 2 Policy      → teaching state legality + strategy
                  Band 3 Tactics     → action selection from the legal set
                → Decision {action, target, constraints, rationale, policyVersion}

 5. CONTRACT    Prompt Compiler turns Decision → TurnContract:
                  must-do, must-not-do, vocabulary budget, question budget,
                  register, length bound, required artifacts, forbidden reveals,
                  success predicate
                → compiled instruction set + retrieved assets

 6. RENDER      Capability Plane routes to a model tier → candidate utterance
                (assets from the Asset Economy are preferred over generation;
                 generation is the fallback, not the default)

 7. VERIFY      Output Verifier checks candidate against the TurnContract.
                PASS → emit.  REPAIRABLE → constrained regeneration (bounded retries).
                FAIL → degrade one rung (asset → template → shorter contract).
                Every rejection is logged as training signal for Plane 4.

 8. EMIT        Conversation Controller delivers across channels (text, voice,
                visual, interactive), commits the turn, opens the response window

 9. SETTLE      Post-turn async: schedule updates (review), evidence rollups,
                experiment assignment recording, asset effectiveness attribution,
                analytics emission. Never blocks the learner.
```

**Latency budget** (P95, learner-perceived): 1–4 ≤ 120 ms, 5 ≤ 40 ms, 6 = the only
variable stage, 7 ≤ 80 ms, total non-model overhead ≤ 250 ms. Stage 6 is skipped
entirely when a validated asset covers the contract — the architecture's main latency
and cost lever, and it improves as the asset library grows (§C-27).

---

## 6. The other four required flows

**Data flow (write side).** Exactly one path writes truth:
`Sensor → Evidence Ledger → projections`. Nothing else writes learner state. Mastery,
misconceptions, schedules, and analytics are all *derived projections*, rebuildable
from the ledger by replay. This is what makes A2, A4, A19, and A23 simultaneously
achievable: policy improvements can be applied retroactively to history, and a
mis-calibrated sensor can be corrected and the entire learner population re-derived
without data loss.

**Teaching flow (the macro loop above the turn).**
```
PLACE → FRAME → INSTRUCT → GUIDE → RELEASE → VERIFY → CONSOLIDATE → TRANSFER → RETAIN
  │                                              │                              │
  └── Placement Engine                           └── gate: independent          └── Review
      (never re-teaches ANCHORED)                     performance required          Scheduler
                                                      (A14 legality)                (memory time)
```
Backward edges are legal only downward-one-rung (RELEASE→GUIDE), never a jump to
INSTRUCT — that is the "invisible restart" failure, forbidden by A12.

**Decision hierarchy.** Four bands, strict preemption (A13):
```
Band 0  SAFETY        harm, crisis disclosure, age-inappropriate content, abuse
        └ may override every other band; may end the session; may summon a human
Band 1  AFFECT        distress, shame, fear, overload, collapse
        └ preempts all pedagogy; content never delivered over an ungated affect state
Band 2  POLICY        teaching-state legality, mastery gates, struggle budget, spacing
        └ deterministic; the source of every "no" the system gives
Band 3  TACTICS       which action, which representation, which asset, which words
        └ the only band where preference, history, and exploration operate
```
Within Band 3 alone is the Experiment Engine permitted to vary behaviour.

**Ownership hierarchy.** Every state element has exactly one writer (A17). The full
table lives in `05-...#ownership-matrix`; the invariant is that no component appears
twice in the writer column for the same field, and read access is unrestricted within
the dependency law.

---

## 7. Layer boundaries and the dependency rules

Seven rules, mechanically checkable:

- **D1** No component may call upward across planes.
- **D2** No component outside Plane 1 may write learner belief state.
- **D3** No component outside Plane 0 may write the Ledger. (Others *emit* evidence;
  the Ledger owns the write.)
- **D4** No component may call a model directly; all model access is through the
  Capability Plane, and only in a declared role (sensor / renderer / author).
- **D5** No renderer output reaches a learner without passing the Output Verifier.
- **D6** No component may hold a private copy of learner state; read the projection.
- **D7** No teaching content may exist only inside a prompt. Content lives in the Asset
  Economy, is versioned, and is referenced by identity.

D7 is the least obvious and the most consequential: it is what converts a system whose
knowledge evaporates every turn into one that accumulates.

---

## 8. Component index

48 components. Full specifications in files 01–06; each carries Purpose, Responsibilities,
Inputs, Outputs, Internal logic, Ownership, Dependencies, Must-not-own, Why it exists,
Failure modes, Evolution. C-46 to C-48 were not in the first draft — they were forced by
the critique and regret rounds in file 06, which records why.

| ID | Component | Plane | File |
|---|---|---|---|
| C-01 | Evidence Ledger | 0 | 01 |
| C-02 | Dual Clock Service | 0 | 01 |
| C-03 | Identity & Continuity Service | 0 | 01 |
| C-04 | Turn Contract Registry | 0 | 01 |
| C-05 | Capability Plane (model abstraction & routing) | 0 | 01 |
| C-06 | Degradation Controller | 0 | 01 |
| C-07 | Budget Governor (cost / latency / attention) | 0 | 01 |
| C-08 | Epistemic Substrate (claim graph) | 0 | 02 |
| C-09 | Misconception Graph | 0 | 02 |
| C-10 | Representation Registry | 0 | 02 |
| C-11 | Transfer Graph | 0 | 02 |
| C-12 | Curriculum Compiler | 4 | 02 |
| C-13 | Standards & Institution Projection | 4 | 02 |
| C-14 | Asset Economy | 4 | 02 |
| C-15 | Authoring System | 4 | 02 |
| C-16 | Content Generation Pipeline | 4 | 02 |
| C-17 | Sensor Bank | 1 | 03 |
| C-18 | Learner Twin — Epistemic Model | 1 | 03 |
| C-19 | Learner Twin — Affective Model | 1 | 03 |
| C-20 | Learner Twin — Metacognitive Model | 1 | 03 |
| C-21 | Learner Twin — Identity & Motivation Model | 1 | 03 |
| C-22 | Memory & Forgetting Model | 1 | 03 |
| C-23 | Misconception Engine (runtime) | 1 | 03 |
| C-24 | Mastery Engine | 1 | 03 |
| C-25 | Assessment Engine | 1 | 03 |
| C-26 | Placement Engine | 2 | 03 |
| C-27 | Review Scheduler | 2 | 03 |
| C-28 | Decision Kernel | 2 | 04 |
| C-29 | Teaching State Machine | 2 | 04 |
| C-30 | Strategy Engine | 2 | 04 |
| C-31 | Recovery Engine | 2 | 04 |
| C-32 | Struggle Controller | 2 | 04 |
| C-33 | Session Planner | 2 | 04 |
| C-34 | Prompt Compiler | 3 | 04 |
| C-35 | Renderer | 3 | 04 |
| C-36 | Output Verifier | 3 | 04 |
| C-37 | Conversation Controller | 3 | 04 |
| C-38 | Visualization & Simulation Engine | 3 | 04 |
| C-39 | Multimodal I/O Plane | 3 | 04 |
| C-40 | Relationship Engine | 3 | 04 |
| C-41 | Human Plane (teacher / parent / institution) | 3 | 04 |
| C-42 | Learner Simulator | 4 | 05 |
| C-43 | Experiment Engine | 4 | 05 |
| C-44 | Learning Analytics & Causal Inference | 4 | 05 |
| C-45 | Governance, Safety & Data Rights | 5 | 05 |
| C-46 | Ad-hoc Intent Bridge | 2 | 06 |
| C-47 | Social Learning Plane | 3 | 06 |
| C-48 | Refer-Out | 3 | 06 |

Files 05–06 also carry: the testing architecture (five tiers), the scaling architecture,
the fault-tolerance ladder, runtime monitoring, the ownership matrix, six rounds of
self-critique with the design changes each forced, the regret test, the load-bearing core
and build order, the twelve invariants, the residual limits, and the prohibitions.

---

## 9. Honest positioning against EOS v2

**Revised 2026-07-27 after a full read of all three v2 documents** —
`EOS_V2_ARCHITECTURE.md` (1,397 lines), `EOS_V2_RUNTIME_SPECIFICATION.md` (921), and
`EOS_IMPLEMENTATION_MASTERPLAN.md` (388). The first version of this section was written
from section headings only and was wrong in three material ways. It is corrected below
rather than quietly edited, because a comparison document that misrepresents what it is
compared against is worse than no comparison.

### 9.1 Three claims retracted

| First-draft claim | Reality | Verdict |
|---|---|---|
| "v2's policy layer leaves band ordering to convention; v3 adds strict preemption" | v2 §6.1 specifies a **seven-band filter network** (0 INTERRUPTS → 6 TIE-BREAK), explicitly "ordered by *authority*, not by confidence." RS §5.2 makes it normative: a Band-0 firing makes its effect "the whole decision skeleton; bands 1–4 are SKIPPED." | **Retracted.** v2's banding is finer than v3's four bands and is normatively specified. v3's scheme is a coarsening. |
| "v2 has no learner simulator; v3 makes it a first-class gate" | v2 §15.4 specifies persona automata — 6 canonical personas, ≥10⁴ episodes per release candidate, invariant violations must be zero. RS T-5 makes it a **merge gate**. Masterplan K6 budgets 4 ew to build it. | **Retracted.** v2 got there first and specified it more concretely (episode counts, named personas, merge-blocking). |
| "v2's model *suite* drifts into competing authorities; v3's single Twin fixes it" | v2 §4.0 defines **one** estimator contract; all 12 models are pure folds over **one** evidence log. The §4 global critique names the double-counting risk and resolves it with the designated-owner rule, enforced by RS §5.1's `reads[]` declaration — the pack compiler *rejects* a rule reading a non-owned proxy field. | **Retracted, and the reasoning was backwards.** v2 solved this more rigorously than v3, which merely asserts single ownership. v2's 12 estimators are also deliberately finer than v3's 5, with a stated reason v3 does not answer: their time constants differ by orders of magnitude (seconds / sessions / weeks), and merging time scales smears signal. |

Two further first-draft claims were overstated: v2 **does** have an asset lifecycle,
capture-on-miss, cost tiers T0–T3, and cross-learner outcome tables (Teacher Memory,
§10; the "asset flywheel," §16.2) — so "v2 treats content as memory, v3 makes it an
economy" is wrong; only the *depreciating-vs-appreciating* framing is new. And of the
"five components with no v2 equivalent," two were wrong: Identity & Motivation is
largely covered by v2's Motivation Model (§4.7), Curiosity Model (§4.6), and the
Capability model's `STATED_NO` (a learner's "I can't do maths" is trusted instantly);
Budget Governor is largely covered by Law L8 plus the budget fields in PolicyDecision.

### 9.2 What v2 already has, and v3 inherits wholesale

The inversion itself (v2 L1: "nothing probabilistic lives in DECIDE"; the LLM as
"device driver, never the CPU"). Evidence-log-as-truth with folds and re-fold (L4).
Determinism given committed evidence (L2). Provenance or it is a bug (L3). Loyalty to
future competence enforced in code (L5). Descriptions never verdicts (L6). Asymmetric
certify/protect (L7). Budgets enforced by the OS (L8). The 15-stage turn pipeline. The
three-layer teaching statechart with evidence-gated transitions and one-step-down
failure. The Output Verifier with a closed rule-code set and a two-attempt rejection
protocol. Recovery as an interrupt controller with its own micro-machine. Policy as
compiled, semver'd, citation-bearing data. Degraded deterministic mode. Replay testing.
Architecture tests for kernel bypass. Every one of v3's twelve invariants has a v2
ancestor in RS §14's I-1…I-24.

**The honest summary: v3 did not discover the inversion. v2 did, and specified it to a
depth v3 does not reach.**

### 9.3 What v3 genuinely adds

Nine items survive the full read. Each is absent from all three v2 documents.

1. **Immutable claim identities** (C-08). v2 keys everything on `conceptId`. v3 stores
   evidence against identities that are minted once and never reused, with graph nodes
   as *views* over them. This is what lets a learner record survive a decade of
   curriculum rebuilds; v2 pins *pack* versions but has no answer for graph churn.
2. **Curriculum Compiler with evidence-preserving migration** (C-12): learners pinned to
   curriculum builds, migration maps per build, and the rule that a split node inherits
   *reduced* confidence on each child. v2 has no curriculum-versioning story.
3. **Curriculum recall** (C-16/C-45): because the ledger records what each learner was
   taught, a corrected claim yields the exact affected population. This falls out of
   v2's own L4 and v2 never claims it.
4. **Practice/Disposition nodes** for interpretive domains — literature, ethics, design,
   argument. v2's model is built for determinate knowledge throughout and is silent here.
5. **Ad-hoc Intent Bridge** (C-46). v2 is curriculum-first end to end: the Scheduler owns
   concept activation and there is no path for "help me with question 7." This is the
   largest product-level gap in v2 and the one most likely to decide adoption.
6. **Human Plane** (C-41) — teacher, parent, institution views and the human correction
   channel. v2 mentions guardian views once, as future Evolution.
7. **Relationship Engine** (C-40). v2 has continuity *mechanics* (Episode Memory threads,
   continuity beats) but no relationship model, no promises ledger, no earned-permission
   framing for proactive contact.
8. **Refer-Out** (C-48) and the **outcome hierarchy with named anti-metrics** (C-44).
   v2's success metrics are engineering-facing (AI-Decision Ratio, violation rate); v3
   adds the ranked learning-outcome hierarchy and the structural prohibition on
   engagement, retention, and satisfaction ever becoming targets.
9. **Social Learning Plane** (C-47). v2's action catalog has a SOCIAL family; there is
   no peer architecture.

Three further additions are refinements rather than gaps: cost and latency as
*pedagogical* budgets that narrow contracts (v2's §16 budgets are operational);
instructional-language proficiency as a Twin dimension with language-vs-knowledge
failure disambiguation (v2 notes RU/HI lexicon lag but does not model the learner's
language); and multimodal ink/camera capture as a first-class plane (v2 has prosody as
a future sensor).

### 9.4 Where v2 is stronger, and v3 should adopt from it

- **The Capability Model** (v2 §4.2) — subject-agnostic operational skills with their own
  lattice, prerequisite DAG, context tags, and a legality filter that structurally
  prevents "square roots before multiplication" *across subjects*. v3 has no equivalent
  and is worse for its absence. This is the single best idea in v2.
- **The attribution algorithm**: only diagnostic items update strongly; a compound-item
  *failure* updates nothing, because failure proves the conjunction failed, not which
  conjunct. v3 lacks this and would have made the error.
- **The Hint Engine** (v2 §9.2), typed by *what is missing* — concept missing means no
  hint at all, route to teach. v3's hint discipline is a paragraph by comparison.
- **Sensors do not read model state** (RS §20.6), specified as a resolved ambiguity with
  its cost acknowledged. v3 asserts "blinded sensors" without the analysis.
- **Normative precision.** RS gives 36 event types with exhaustive payloads, 14 machines
  with full transition tables, 24 release-blocking invariants, 15 verifier rule codes,
  and shipped BrainConfig defaults. v3 is a vision document; RS is buildable.
- **The masterplan exists**: ~70 engineer-weeks, a dependency graph, a critical path
  (C1→C2→C4→K4→K5→K6), and a model-tier assignment table.

### 9.5 Verdict

v3 is **not** a replacement for v2 and should not be read as one. v2 is the deeper and
more implementable document; v3's value is a set of nine genuine gaps plus an outside-in
re-derivation that independently reproduced v2's core inversion — which is meaningful
evidence that the inversion is correct, since it was reached twice from different
starting points.

The defensible use of this blueprint: **treat §9.3 as a proposed amendment list against
v2, and §9.4 as v3's own defect list.** Anyone building should build v2 with the RS in
hand, and fold in v3's nine additions where they fit. Nothing here justifies restarting.

### 9.6 Correction to an earlier estimate in this session

Session-count estimates given before this read (≈65–95 sessions for a core, "roughly one
month") were made without knowledge of `EOS_IMPLEMENTATION_MASTERPLAN.md`, which already
costs the work at ~70 engineer-weeks core, 18–24 months for one engineer, 6–7 months for
five, with K3 (kernelization of a 2,700-line route) alone at 6 ew and marked "frontier
required." The masterplan's §6 also already answers the smaller-model-versus-frontier
question this session was asked. **Treat the masterplan's numbers as authoritative and
this session's as superseded** — they were optimistic, and they were uninformed.

**Not addressed here.** Migration from the live system: v2 §17 and the masterplan own
that, and per the standing G1/G2 governance rules nothing in this blueprint authorizes
implementation.

---

## 10. Reading order

1. `01-SUBSTRATE.md` — Plane 0: ledger, clocks, contracts, capability plane, budgets
2. `02-KNOWLEDGE.md` — the epistemic substrate and the content economy
3. `03-LEARNER.md` — the Twin, misconceptions, mastery, memory, placement, review
4. `04-TEACHING-RUNTIME.md` — decision kernel through delivery and the human plane
5. `05-IMPROVEMENT-AND-OPERATIONS.md` — simulator, experiments, analytics, governance,
   testing architecture, scaling architecture, runtime monitoring
6. `06-CRITIQUE-AND-REGRET.md` — six critique rounds, the regret test, the three
   components they forced, the ownership matrix, the build order, and the invariants,
   limits, and prohibitions

**If you read only one file**, read 06: it contains what the design got wrong first and
what it must never do — which is more useful than what it does.

---

## Phase architecture built on this blueprint

**Phase 1 — Teaching Quality Architecture** ·
`../PHASE_01_TEACHING_QUALITY_ARCHITECTURE.md` · **CANONICAL** (v1.2.0, 2026-07-31)

Introduces the **Campaign scale** — the per-concept, multi-turn, often multi-session layer
between `C-33`'s session and `C-28`'s turn — and seven components (TQ-1…TQ-7) that sit above
this blueprint's teaching runtime without replacing any part of it.

Integration is deliberately narrow: Phase 1 adds **three narrowing-only constraint sources to
`C-28` Band 2** (TQ-1 strategy commitments, TQ-2 arc phase, TQ-4 re-teach legality) and **zero
new decision authorities**. They may remove options from the legal action set and may never add
one. `C-29`, `C-30`, `C-31`, `C-32` and `C-33` are unchanged; `C-29` remains the sole authority
on advancement. One ownership transfer is recorded: `C-30`'s per-learner approach history moves
to TQ-4's typed failed-attempt set (Phase 1 §4.1, handoff H-2).

Architecture only — no implementation is authorized by its canonicalization.

**Phase 2 — Visual Intelligence Architecture** ·
`../PHASE_02_VISUAL_INTELLIGENCE_ARCHITECTURE.md` · **CANONICAL** (v2.1.0, 2026-07-31)

Extends Phase 1 with the *pedagogical* visual tier: whether a visual appears (default no, with
ten enumerated contraindications), why (a closed ten-purpose taxonomy, each visual carrying a
one-sentence claim), and which form class. The *production* tier — renderers, cache, validators,
asset lifecycle, rendered state — remains ADR 12/14/15's and is consumed by reference.

Two one-directional projections cross the tier boundary: `VisualIntent` downward and
`VisualAvailability` upward. Neither is a call, so the Visual tier still calls into nothing and
ADR 12 §13's leaf rule holds verbatim.

Architecture only — authorizes no implementation; W4-2 remains gated.

**Phase 3 — Adaptive Teaching Architecture** ·
`../PHASE_03_ADAPTIVE_TEACHING_ARCHITECTURE.md` · **CANONICAL** (v3.1.0, 2026-07-31)

The adaptive control plane, extending Phases 1 and 2. Fourteen components AT-1…AT-14 over six
dials plus D3, including the Adaptation State Vector — one typed object replacing `C-32`'s four
unstructured outputs — the pressure model, the arbiter, and the stability governor that supplies
the dwell, rate limit and hysteresis every authored escalation ladder lacks.

`C-32` keeps the control loop, the target band, the withholding policy and the absolute affect
veto. Phase 3 supplies the instrument and takes the adjustment decision (AH-1). Its constraints
publish to Band 2 (subtractive) and its parameters to Band 5 (personalization).

**Note on band numbering.** This blueprint's four-band summary of `C-28` (0 safety · 1 affect ·
2 policy · 3 tactics) is a summary. `EOS_V2_ARCHITECTURE.md` owns band semantics per
`../README.md`'s authority ladder, and defines seven bands, implemented as `BandId = 0…6` in
`src/lib/kernel/policy/types.ts`. Phase 3 publishes against the seven-band scheme.

Architecture only — authorizes no implementation; G1 and G2 remain in force.
