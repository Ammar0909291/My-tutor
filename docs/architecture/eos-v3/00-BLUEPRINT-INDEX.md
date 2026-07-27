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

## 9. Honest positioning against the existing repo architecture

v3 is a clean-sheet derivation, but it did not appear in a vacuum. Stated plainly:

**Inherited from EOS v2 and kept, because they are correct.**
PERCEIVE → DECIDE → RENDER as the turn spine; the sensor plane as an explicit
architectural layer; the teaching state machine as a legality structure; the verifier
gate as a hard boundary; educational memory as a filesystem-like plane; the principle
that prompt engineering is a symptom to be replaced by mechanism.

**Replaced.**
- v2 keeps the learner model as a *suite of models*; v3 makes it a single Twin over one
  ledger with typed sub-models, because independent models drift and produce competing
  authorities (violating A17).
- v2's policy layer is a policy *engine*; v3 splits it into a strictly banded kernel
  (A13) so that safety and affect can never be outvoted by pedagogy — v2 leaves this to
  ordering convention.
- v2 has no learner simulator. v3 makes it a first-class component (C-42) and makes it
  a *gate* (A20), because otherwise every pedagogical change is tested on children.
- v2 treats content as memory; v3 treats it as an economy with a lifecycle and an
  explicit depreciating/appreciating split (C-14), because that is what determines
  whether the system's value compounds.
- v3 adds five components with no v2 equivalent: Identity & Motivation (C-21), Transfer
  Graph (C-11), Relationship Engine (C-40), Human Plane (C-41), Budget Governor (C-07).

**Not addressed here.** Migration from the current live system. v3 is a target
architecture; a migration arc would be a separate document, and per the repo's standing
governance rules nothing in this blueprint authorizes implementation.

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
