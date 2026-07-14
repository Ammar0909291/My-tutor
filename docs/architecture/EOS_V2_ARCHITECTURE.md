# Educational Operating System — Version 2 Architecture (EOS v2)

**Status:** PROPOSED BLUEPRINT — design only. Nothing here is implemented by this
document. Adoption of any part into the runtime remains gated on explicit owner
approval (the standing G2 governance rule). Until adopted, the Educational Brain
Bible remains the authority for the v1 runtime; this document is the v2 target
it migrates toward.

**Date:** 2026-07-14
**Supersedes:** nothing yet. **Informs:** everything after it.
**Companion documents:** `EDUCATIONAL_BRAIN_BIBLE.md` (v1 runtime authority),
`MIGRATION_BLUEPRINT_V1.md` (v1→Brain connection plan, subsumed by §17 here upon
adoption), `CAPABILITY_MODEL_DESIGN.md` (v0.1, absorbed into §4.2 here),
`educational-brain/` (Deliveries 1–15 — the authored knowledge this OS executes).

---

## 0. Charter

My Tutor is not a chatbot, not an LLM wrapper, not prompt engineering. It is a
teaching machine. The long-term shape is:

```
Student → Educational Operating System → Teaching Action → Learning Outcome
```

The LLM is one replaceable component — a **device driver**, never the CPU. The
Educational Brain — authored pedagogy compiled into executable policy, plus the
evidence corpus only this product can accumulate — is the moat. Every release
must move teaching decisions **out of the model and into the OS**, measurably.

### 0.1 The Constitutional Laws

Every subsystem below is bound by these laws. A design that violates one is
wrong even if it works.

- **L1 — The Boundary Law.** Every turn passes through exactly three planes:
  PERCEIVE → DECIDE → RENDER. Probabilistic components (LLMs, classifiers) may
  live in PERCEIVE (as sensors) and RENDER (as drivers). **Nothing probabilistic
  lives in DECIDE.** DECIDE is pure, versioned, replayable code and data.
- **L2 — The Determinism Law.** Given the same evidence-log prefix and the same
  policy-pack version, DECIDE produces byte-identical decisions. Randomness, when
  pedagogically wanted (variety), is seeded and logged.
- **L3 — The Provenance Law.** Every decision cites the rule, table row, or
  authored asset that produced it. An unexplainable decision is an invented
  decision, and an invented decision is a bug (inherited verbatim from
  `student-state/09`).
- **L4 — The Evidence Law.** All learner state is a fold over an append-only
  evidence log. Snapshots are caches. State that cannot be re-derived from
  evidence does not exist.
- **L5 — The Stance Law.** The system is loyal to the learner's future
  competence, not their present comfort (First-Principles Review, 2026-07-10).
  Withholding an answer, scheduling struggle, and refusing hollow advancement are
  enforced in code — a smarter model must not be able to talk the OS out of them.
- **L6 — The Dignity Law.** Learner-model contents are descriptions, never
  verdicts; hypotheses with confidence, never facts; and they never leak to the
  learner as judgments (inherited from `student-state/README` design laws).
- **L7 — The Asymmetry Law.** Slow to certify, quick to protect. Mastery is
  hard to earn and hard to lose; recovery fires on weak signals because a false
  positive is gentle and a false negative is a lost learner.
- **L8 — The Budget Law.** Every turn spends from explicit budgets — questions,
  cognitive load, affect, time, length. Budgets are enforced by the OS, not
  requested from the model.

### 0.2 Non-goals

- Not a curriculum authoring system (the Curriculum Production Pipeline owns
  WHAT; this OS owns HOW and WHEN).
- Not an LMS/classroom admin product.
- Not an attempt to make the LLM "smarter" — the opposite: to need it less.
- Not a rewrite mandate: §17 defines a strangler-fig migration; the v1 runtime
  is the seed, not the enemy. Phases A–H (July 2026) are the embryo of this
  kernel and are treated as EOS milestone M0.

---

## 1. The Operating System Map

The OS metaphor is load-bearing, not decorative. Each mapping names a real
architectural obligation.

| OS concept | EOS v2 subsystem | Obligation it imposes |
|---|---|---|
| Kernel | Teaching Policy Engine + Teaching State Machine | Sole authority over teaching decisions; nothing bypasses it |
| Processes | Teaching Intents (per-concept teaching "jobs") | Every concept-in-progress has schedulable, suspendable state |
| Scheduler | Lesson & Spacing Scheduler | Decides which concept gets "CPU time" this session; preemption rules |
| Interrupts | Recovery Engine (affect interrupt controller) | Preempts any scheduled work; has its own return protocol |
| Syscall interface | The Teaching Action vocabulary (closed set) | The only way anything gets taught is through a typed action |
| Device drivers | Renderers: LLM voice, visual engines, TTS/STT, widgets | Swappable; conform to a driver contract; never make policy |
| Filesystem | Educational Memory (tiered stores, §10) | Single-writer per store; typed reads; retention policy |
| Virtual memory | Working-memory & load budgets (§4.10–4.11) | Every render plan fits the learner's span or is split |
| Shell | Conversation Controller (§8) | Turn-taking, register, one-move-per-turn, output verification |
| User space | Content: Canonical KGs, Brain knowledge, Asset catalog | Data, not code; hot-swappable; versioned |
| Boot loader | Placement & cold-start protocol (§7 of D10, compiled) | A learner is never taught before the OS knows where to begin |
| Panic handler | Degraded deterministic mode (§14, F9) | The OS teaches from assets even with every LLM down |

### 1.1 The four planes

All 26 requested subsystems resolve into four planes plus two substrates. This
is a deliberate compression: 26 peer services would be an over-engineered
distributed monolith. Good OS design has fewer moving parts than its
requirements list implies.

```
┌─────────────────────────────────────────────────────────────┐
│ EXPRESSION PLANE   Conversation Controller · Renderers ·    │
│                    Output Verifier                          │
├─────────────────────────────────────────────────────────────┤
│ DECISION PLANE     Teaching State Machine · Policy Engine · │
│  (the kernel)      Action Engine · Scheduler · Specialized  │
│                    engines (Assessment/Hint/Analogy/Visual/ │
│                    Recovery/Reflection/Mastery) as policy   │
│                    modules, not services                    │
├─────────────────────────────────────────────────────────────┤
│ MODEL PLANE        The Learner Model suite: 12 estimators   │
│                    folding one evidence log (§4)            │
├─────────────────────────────────────────────────────────────┤
│ PERCEPTION PLANE   Sensors: deterministic parsers, timing   │
│                    instruments, schema-constrained LLM      │
│                    classifiers with error bars (§3)         │
├─────────────────────────────────────────────────────────────┤
│ SUBSTRATE 1        Educational Memory (§10) — the log and   │
│                    its read models                          │
│ SUBSTRATE 2        Content & Brain policy packs (§6.2, §16) │
└─────────────────────────────────────────────────────────────┘
```

**Critique of this map.** The risk of the OS metaphor is cosplay — naming
things "kernel" without enforcing kernel discipline. The enforcement teeth are
L1–L3: a single choke-point module through which every teaching decision passes,
plus the provenance ledger that makes bypasses visible. If the codebase ever
contains a second path from learner message to LLM prompt that skips the kernel,
the metaphor has failed. This is testable (§15.7) and must be tested.

---

## 2. The Turn: PERCEIVE → DECIDE → RENDER

The fundamental unit of the OS is the turn. Its pipeline is the **Runtime
Decision Graph** (§11 gives the full DAG). The three-plane contract:

### 2.1 PERCEIVE
Input: raw learner message, timing metadata, client instrumentation, (future)
voice prosody. Output: **typed evidence events** with source, confidence, and
sensor version. Sensors never decide anything; they report. An LLM classifier is
a legitimate sensor (e.g., "does this free-text answer express the target
misconception? yes/no/unsure + confidence") because its output is recorded as
evidence and the decision made from it is deterministic. Sensor errors are a
modeled quantity, not a surprise.

### 2.2 DECIDE
Input: the learner's model states (folds over evidence), session state, concept
state, content availability, policy packs. Output: a **TeachingIntent** — the
complete, typed decision for this turn:

- teaching state (which statechart node we are in — §5)
- move: TEACH | SHOW | ASK | RECOVER | CLOSE | CELEBRATE | WAIT
- action: one entry from the closed action vocabulary (§7)
- representation: medium + specific asset/template references
- budgets: max questions (0 or 1), max length, max new elements, stage ceiling
- content payload: resolved assets (explanation, example, probe, script)
- provenance: the rule path that produced all of the above

No LLM call occurs anywhere in this plane. Ever. That is the whole point.

### 2.3 RENDER
Input: TeachingIntent. Output: the learner-facing turn (text, visual, widget,
audio). The LLM's job here is **voice** — natural phrasing of a decided move,
warmth, continuity with the conversation — inside hard constraints. The
**Output Verifier** (§8.4) lints the render against the intent (question count,
length, banned vocabulary, no formula before the FORMALIZE state, no concept
name before NAME) and repairs or re-renders on violation. Prompts *request*;
verifiers *enforce* — this closes the gap that made v1 prompt-stack teaching
non-deterministic.

**Critique.** Isn't a "verifier + re-render" loop just prompt engineering with
extra steps? No — the decisive difference is that the *decision* was already
made and logged before any model saw the turn, violations are detected
mechanically, and the fallback on repeated violation is a deterministic template
render (F5, §14). The model can fail to phrase; it cannot succeed at deciding.

---

## 3. Perception Plane — the Sensor Architecture

**Purpose.** Convert everything observable about the learner into the evidence
log, with honesty about uncertainty.

**Sensor registry** (each versioned; each with a false-positive/false-negative
profile maintained from labeled samples):

| Sensor | Type | Emits |
|---|---|---|
| Utterance-state detector | deterministic regex/pattern (v1: `recoveryGuard.ts`) | UTTERANCE_STATE {failureStateKey, verbatim} |
| Autonomy detector | deterministic | AUTONOMY_REQUEST |
| Answer classifier | LLM, schema-constrained (v1: `<!--SIGNAL-->`) | ANSWER_OUTCOME {correct, statedConfidence, confusion} |
| Latency instrument | server timestamps (v1: PROBE_OUTCOME latency) | LATENCY {ms, vsBaseline} |
| Question detector | deterministic text check on OWN output | ASSISTANT_ASKED {count} |
| Silence/abandonment | timeout watcher | SILENCE {duration}, SESSION_ABANDONED {lastState} |
| Learner-question sensor | LLM classifier | LEARNER_QUESTION {topic, depthSignal} — feeds Curiosity |
| Calibration sampler | elicited confidence vs outcome | CALIBRATION_SAMPLE |
| Load-signature detector | deterministic heuristics | LOAD_SIGNATURE {marker} (errors correlate with length not difficulty, etc.) |
| Prosody/timing (future) | STT verbose output | HESITATION, SELF_CORRECTION (recovers foundations/03 §7's discarded channel) |

**Decision rules.** A sensor may only append events. The fabrication guard: an
ANSWER_OUTCOME on a turn where no question was asked is discarded and the sensor
distrust counter increments (F1). Every event carries `source: {sensorId,
version}` so re-folds can down-weight known-bad sensor versions retroactively —
this is why L4 matters: **we can fix yesterday's perception errors without
having stored yesterday's wrong conclusions.**

**Failure modes & recovery.** Sensor outage → the turn proceeds evidence-poor
(models widen confidence intervals; policy gets conservative). Sensor
fabrication → discard + distrust (F1). Systematic bias → recalibration from
labeled audits; re-fold.

**Testing.** Golden corpora per sensor (labeled utterances, answers); precision/
recall floors as CI gates; mutation tests (paraphrase robustness for
deterministic patterns).

**Evolution.** Sensors are where model improvements land first and safest: a
100× better model is a better classifier with tighter error bars — and still
just a sensor.

**Critique.** The biggest perception risk is over-trusting the answer
classifier, since most learner state flows through it. Mitigations: latency is
measured server-side (not model-claimed); high-stakes state changes (mastery,
misconception confirmation) require multi-event corroboration; and the
diagnostic-item rule (§4.2) restricts which events are allowed to update models
strongly.

---

## 4. Model Plane — the Learner Model Suite

### 4.0 The common estimator contract

All twelve models are instances of one contract (this factoring is itself an
architectural decision — twelve bespoke subsystems would drift apart):

- **Input:** typed evidence events (each model subscribes to specific types).
- **State:** a typed, versioned document; every field carries `{value,
  confidence, evidenceRefs, updatedAt, freshness}`.
- **Algorithm:** a pure fold `state' = fold(state, event)` plus a decay
  function `state' = age(state, Δt)`. Fold version is recorded; upgrading an
  estimator re-folds history (L4).
- **Output:** read-only views consumed by the Decision Plane. No model calls
  another's internals; cross-model composition happens in the Student Model
  umbrella (§4.1) and in policy.
- **Laws:** L6 (descriptions not verdicts), L7 (asymmetric transitions),
  freshness-aware (stale ≠ false — stale triggers probes, not conclusions).
- **Failure modes (shared):** overfitting to noise (min-evidence thresholds
  before any field is policy-visible); stale state on returning learners
  (freshness gates + resumption protocol); attribution ambiguity (only
  designated diagnostic events update strongly).
- **Testing (shared):** property tests on folds (idempotent re-fold; snapshot =
  fold(log); monotone confidence in evidence count); golden event streams →
  expected states; simulated-learner distribution checks (§15.4).

The twelve models, each specified as deltas from this contract:

### 4.1 Student Model (the umbrella)
- **Purpose:** the composed, read-only view the kernel consumes: identity &
  context (age band, language, accessibility signatures, guardianship flags) +
  the eleven estimator views + the digital-twin question set (`student-state/09`:
  eight mandatory questions any teaching decision may ask of it).
- **Inputs:** profile data (self-reported, trust-calibrated per `placement/02`),
  all estimator outputs.
- **Outputs:** `StudentView` — the single argument the Policy Engine receives
  about the person.
- **Internal state:** none of its own beyond identity; it is a composition.
- **Decision rules:** self-report is a hypothesis with a known bias direction
  (adults under-report, children's reports track shame not skill); the
  miscalibration direction is itself a persistent field.
- **Failure modes:** treating the umbrella as writable (forbidden — writes go
  through evidence only); identity confusion across account linking (auth layer
  owns identity; the model keys on canonical user id).
- **Evolution:** family/guardian views (privacy-filtered), multi-tutor
  hand-off summaries.
- **Critique:** an umbrella invites god-object creep. Guard: `StudentView` is
  assembled per-turn from views, never stored, never extended with fields that
  don't come from an estimator.

### 4.2 Capability Model
The load-bearing replacement for beginner/intermediate/expert. Absorbs and
extends `CAPABILITY_MODEL_DESIGN.md` v0.1.

- **Purpose:** represent *operational skills* — subject-agnostic, testable
  operations — so no teaching action ever demands an operation the learner
  cannot perform. This is what structurally prevents "square roots before
  multiplication."
- **Vocabulary:** a versioned registry (~40 at launch), clustered: numeric
  (count, compare, estimate, add-subtract, multiply, divide, fractions, square,
  root, negative-numbers, proportional-reasoning), symbolic (read-notation,
  substitute-into-formula, isolate-variable, solve-linear-equation), spatial
  (identify-direction, visualize-vectors, mentally-rotate), graphical
  (read-simple-graph, read-axes, interpret-slope, read-table), verbal
  (restate-own-words, follow-two-step-instruction, compare-two-claims),
  experimental (predict-outcome, control-variables). **Admission rule:** a
  capability exists only if at least one policy rule branches on it.
- **Per-capability metadata:** prerequisite capabilities (a small DAG:
  divide→multiply; proportional-reasoning→fractions+divide), decay class,
  typical acquisition band, context tags (a capability may be RELIABLE in math
  contexts and SHAKY in physics word problems — context-tagged evidence, one
  state with per-context modifiers, not duplicate capabilities).
- **States:** `UNKNOWN → (STATED_NO | OBSERVED_NO) → SHAKY → RELIABLE →
  AUTOMATIC → EXPERT`, with high-water mark kept.
  - Promote to RELIABLE: ≥2 unaided successes in ≥2 contexts.
  - Promote to AUTOMATIC: fluency gate — correct + fast-vs-baseline +
    unhesitant, ≥3 occasions (this is where chunking is *measured*, §12).
  - Demote: only on fresh contradicting evidence, never by decay; decay marks
    freshness stale → schedules a micro-probe (L7).
  - STATED_NO (from "I can't do maths") is trusted immediately (L6, ground
    truth) and is the cheapest state to overturn — one demonstrated success.
- **Concept binding:** every KG concept carries `requiresCapabilities[]`
  (authored in Brain concept entries; compiler-validated; inferable fallback
  from domain+difficulty for uncovered concepts). The **Capability Legality
  Filter** (§6.1 band 2) rejects any TeachingIntent whose action demands a
  capability in {OBSERVED_NO, STATED_NO}; UNKNOWN triggers either a one-item
  micro-probe or capability-first teaching insert (just-in-time repair,
  extending `placement/05`).
- **Attribution algorithm:** only *diagnostic items* — items authored/selected
  to isolate a single capability — update states strongly. Multi-capability
  items update weakly and only on success (success proves all; failure proves
  the conjunction failed, not which conjunct — a real logic constraint most
  tutoring systems get wrong).
- **Failure modes:** vocabulary creep (admission rule); cross-context
  overclaiming (context tags); misattribution (diagnostic-item rule); insulting
  a returning learner with a stale NO (freshness → probe first, never assume).
- **Testing:** simulated learners with ground-truth capability profiles; the
  model must recover the profile within N diagnostic exposures; legality filter
  property: no emitted intent ever requires a NO capability (10k-session
  invariant, §15.4).
- **Evolution:** population priors (P(root=NO | multiply=NO) learned from the
  corpus — cold-start inference); capability→concept requirement learning from
  failure correlations (proposing missing annotations to human review).
- **Critique:** the boundary between a capability and a concept will blur
  (is "fractions" not a concept?). Ruling: if it lives in a curriculum KG and is
  *taught*, it is a concept; its *operational fluency* is the capability. The
  two link (mastering concept X promotes capability x) but are never merged —
  concepts are subject-scoped, capabilities are learner-scoped and portable.

### 4.3 Knowledge Model
- **Purpose:** per-(learner, concept) instructional position. Reuses
  `student-state/02`'s 8-rung ladder verbatim: UNKNOWN → RECOGNIZED → IMITATES
  → ASSISTED → INDEPENDENT → AUTOMATIC → TRANSFER → EXPERT.
- **Inputs:** ANSWER_OUTCOME (with scaffold level + hint debt), TRANSFER_EVENT,
  retention-probe results, teaching-state transitions.
- **State:** rung + high-water mark + per-rung evidence + hint-debt-adjusted
  strength (an answer bought with 3 hints is weak evidence for INDEPENDENT).
- **Decision rules:** rung ↔ statechart entry point mapping (the structural ban
  on re-teaching from zero); rungs move down only via Forgetting-Model
  modulation (access weakens; storage survives — FORGOTTEN ≠ UNKNOWN).
- **Failure modes:** echo-advancement (learner repeats words → falsely
  RECOGNIZED→IMITATES; guarded by requiring *produced* evidence, own-words
  restatement); gaming (claims of understanding never move rungs — L5).
- **Evolution:** per-domain rung velocity feeds the Velocity Model;
  representation-family inheritance to sibling concepts (`student-state/08`).
- **Critique:** eight rungs risk false precision from sparse evidence. Guard:
  rungs are only policy-visible with min evidence; between-rung uncertainty is
  explicit and the policy tables accept rung *ranges*.

### 4.4 Misconception Model
- **Purpose:** the ledger of wrong models — separate from absent knowledge,
  because the treatment is opposite (collide-and-replace vs teach).
- **Reuses:** `student-state/03` (ledger, strength DOMINANT/UNDER-LOAD/RESIDUAL,
  lifecycle with no ERASED status, DORMANT-VERIFIED re-checks forever) +
  `misconceptions/` D13 (6 birth types, 7-step repair, burned-collision rule,
  metastasis chain checks).
- **Inputs:** fast-confident-wrong signatures (the D1 grid's dangerous
  quadrant), verbatim phrase evidence, repair outcomes, regrowth probes.
- **Decision rules (as policy inputs):** an ACTIVE misconception on a
  prerequisite blocks advancement through it (corrupted ≠ absent — chain check);
  repairs never certify same-session; 2 regrowths → re-rate HIGH + flag the
  repair path for authoring review; the incompatibility guard — never serve an
  asset whose `incompatibilities` list the learner's active misconceptions
  (ADR 14 field, now enforced in the kernel).
- **Failure modes:** false misconception from a hedged guess (guarded: only
  fast+confident wrongs update strongly; hesitant wrongs update nothing —
  encoded in v1 already); phantom repair (collision the learner memorized —
  burned-collision tracking forces fresh collision cases).
- **Testing:** golden repair sequences; regrowth simulations; the six-learner
  audit scenarios from D9 as executable cases.
- **Critique:** verbatim phrase capture for minors is a privacy decision, not
  an engineering one — remains owner-gated (standing note), with redaction at
  ingest as the default posture.

### 4.5 Confidence Model
- **Purpose:** calibration, not height. Target state: learner confidence
  tracks learner competence (calibration levels L0–L3 as a *taught skill*,
  `student-state/04`).
- **Inputs:** CALIBRATION_SAMPLE (stated or behavioral confidence × outcome),
  latency (fast = confident), hedging language markers.
- **State:** per-domain calibration curve; chronic-pattern classification
  (5 patterns per D8); build-slow/collapse-steep asymmetry parameters that
  personalize affect budgets.
- **Decision rules:** OVERCONFIDENT+wrong → misconception pipeline, not praise
  reduction; UNDERCONFIDENT+right → evidence-based contradiction (point at
  their own performance), never reassurance ("evidence sticks, opinion
  doesn't" — foundations/01).
- **Failure modes:** cultural/linguistic hedging misread as low confidence
  (calibrate per learner baseline, not absolute markers).
- **Evolution:** confidence-elicitation UI (predict-then-check) as a
  first-class widget, making calibration training explicit.

### 4.6 Curiosity Model
- **Purpose:** detect and *spend* intrinsic interest — the cheapest fuel the
  system has. Curiosity is evidence, not decoration.
- **Inputs:** LEARNER_QUESTION events (topic, unprompted-ness, depth),
  tangent requests, voluntary return patterns, dwell on optional content.
- **State:** interest vector over domains/representations (statistics with
  confidence — never identities, per the affinity law); novelty appetite
  estimate; question-asking rate baseline.
- **Decision rules:** anchors and examples are selected to intersect the
  interest vector when legality permits (a kinematics anchor becomes a football
  for one learner, an orbit for another — same authored spine, personalized
  surface); an unprompted learner question about a *future* concept is a
  scheduling signal (curiosity-driven prefetch: the Scheduler may legally
  advance it); tangents are honored-then-returned (answer-first law) with the
  tangent recorded.
- **Failure modes:** mistaking compliance for curiosity (only unprompted
  behavior updates the model); interest-vector overfit (min evidence; decay).
- **Testing:** simulated curious/incurious learners; assert anchor selection
  shifts without any legality violation.
- **Critique:** the danger is entertainment-capture — optimizing for expressed
  interest over learning (the engagement-maximization failure of consumer
  products, and L5's direct enemy). Guard: curiosity influences *surface
  selection only* (which anchor, which example skin), never gate decisions,
  never mastery, never pacing beyond the explicit prefetch rule.

### 4.7 Motivation Model
- **Purpose:** the drive band — is there fuel for teaching at all — and what
  restores it. Distinct from Frustration (affect interrupt) and Curiosity
  (interest direction): motivation is the *slow* variable.
- **Inputs:** session frequency/regularity, voluntary session length, response
  effort trends, goal statements, failure-then-vanish events, streak/return
  behavior after breaks.
- **State:** drive level (engaged / coasting / fading / detached) with
  trajectory; goal orientation (mastery vs performance vs obligation —
  inferred, low-stakes); per-learner what-restores list (from Recovery Memory:
  which interventions preceded drive recovery).
- **Decision rules:** fading drive → MOMENTUM_RECOVERY-class policies (short
  completable units, engineered wins, visible progress artifacts); detached +
  returning → resumption protocol with zero guilt framing; drive is spent
  deliberately (a hard push is *scheduled* onto high-drive days, never onto
  fading ones — `student-state/08` momentum law).
- **Failure modes:** moralizing (the model must never generate "you should
  study more" — L6); conflating low drive with low ability.
- **Evolution:** proactive scheduling integration (the OS initiates contact —
  one of the four structural moats) once product surface exists.

### 4.8 Frustration Model (affect interrupt source)
- **Purpose:** the fast affect variable; feeds the interrupt controller.
- **Inputs:** UTTERANCE_STATE events (ground truth, instant), failure density,
  latency collapse (rage-quit-speed answers), abandonment mid-struggle,
  P1-style session failure counts.
- **State:** affect band (calm / strained / flooded) + spiral detection
  (failure-spiral trajectory from `decision-engine/02`) + personal triggers
  ledger (what reliably precedes flooding — then engineered out of that
  learner's plans) + recovery speed (personalizes how long RECOVERY holds).
- **Decision rules:** band preemption — the affect band outranks every
  cognitive consideration (the rule that collapsed ~180 decision-matrix cells
  in D7); flooded → Recovery Engine owns the turn; strained → budgets tighten
  (fewer elements, shorter, zero questions).
- **Failure modes:** false flooding reads on terse-by-nature learners
  (baseline-relative detection); learner masking (state politeness while
  flooding — behavioral signals cross-check stated calm).
- **Critique:** Frustration/Motivation/Curiosity could collapse into one
  "affect+drive" estimator. Kept separate because their time constants differ
  by orders of magnitude (seconds/sessions/weeks) and merging time scales in
  one estimator is how signals get smeared. They share evidence, not state.

### 4.9 Cognitive Load Model
- **Purpose:** estimate the load a candidate render plan imposes, and the load
  the learner is currently under. The enforcement point for CLT.
- **Inputs:** LOAD_SIGNATURE events; render-plan element counts; Capability
  Model automaticity states (an automatized operation is ~1 chunk; a
  non-automatized one is its full step count).
- **Algorithm:** `intrinsic(plan) = Σ new elements × novelty weight −
  automatized compressions`; `extraneous(plan) = medium overhead + split-
  attention + redundancy penalties`; germane is a target, not a term. Load
  legality: `intrinsic + extraneous ≤ span budget` (from §4.10) minus affect
  penalty (anxiety consumes slots — the models compose here).
- **Decision rules:** over-budget plans are repaired (split into two turns,
  swap medium, defer vocabulary) before rejection; a diagram *replaces* prose
  (dual-coding credit) rather than adding to it.
- **Failure modes:** element-counting is an approximation and will be wrong at
  the margins; guard: the budget is soft-enforced pre-render but LOAD_SIGNATURE
  feedback closes the loop post-hoc (the estimator is calibrated against
  observed overload, per learner).
- **Testing:** plan corpora with expert-labeled load ranks; estimator must
  rank-correlate; simulated overload learners must produce shrinking plans.

### 4.10 Working Memory Model
- **Purpose:** the span estimate the Load Model budgets against.
- **Inputs:** overload signatures (errors correlated with element count, not
  difficulty; mid-instruction loss — "wait, what was the first step?"),
  multi-step instruction outcomes, age prior.
- **State:** effective span (start: age-banded prior — young child ≈2 usable
  slots under instruction, adult ≈3–4), confidence, per-modality modifiers
  (reading-load signature from `student-state/05 §7` lowers the *text* span
  specifically, not the person — accommodation, never diagnosis).
- **Decision rules:** span is a budget input only; it is never surfaced, never
  named, never treated as fixed (it rises with domain automaticity — which is
  the Capability Model's job to detect, and the composition happens in the
  Load Model, not here).
- **Failure modes:** pathologizing (L6 — the model describes performance under
  load, it never diagnoses); conflating span with attention (separate signal:
  attention span in minutes lives in the behaviour profile and shapes session
  length, not element budgets).

### 4.11 Forgetting Model
- **Purpose:** per-learner, per-memory-class retention curves; the Scheduler's
  physics engine.
- **Inputs:** spaced retention probes (the only ground truth), gap lengths,
  relearning speed (savings — fast relearning proves storage survived).
- **State:** per-concept half-life estimates; per-learner global forgetting
  rate (the key personalization, `student-state/07`); memory-class parameters
  (motor/verbal/conceptual/procedural decay differently).
- **Algorithm:** any standard adaptive-spacing estimator (SM-2-family or
  half-life regression) — the *architecture* only requires: probabilistic
  recall estimate per item per time, updated on each probe.
- **Decision rules:** review scheduled near recall probability ~0.7 (desirable
  difficulty band); FORGOTTEN routes to cued retrieval, never re-teaching
  (storage vs access law); decay never demotes mastery certification —
  it schedules verification (L7).
- **Failure modes:** confusing forgetting with misconception regrowth (probe
  distinguishes: absent vs wrong-and-confident); over-scheduling reviews until
  sessions are all review (Scheduler cap: review load ≤ fraction of session,
  overflow prioritized by downstream dependency count).

### 4.12 Learning Velocity Model
- **Purpose:** rate and acceleration of rung movement per effort-time; the
  earliest-warning instrument and the plateau classifier.
- **Inputs:** Knowledge Model rung transitions × active time; Capability
  promotions; assessment outcomes over time.
- **State:** per-domain velocity, acceleration; plateau classification via the
  D8 diagnosis tree — consolidation (velocity↓, errors↓ — *do not thrash*),
  stuck (velocity↓, errors flat/up, affect strain — intervene), boredom-slide
  (fast correct, drive↓ — compress and challenge).
- **Decision rules:** acceleration↓ across domains → check global factors
  (sleep/season/life — surfaced as gentle check-in, never inferred-and-stated);
  readiness for harder material is a *derived three-way answer* (yes / not yet /
  wrong question) rather than a threshold.
- **Failure modes:** velocity worship (speed is not the goal; L5 — the model
  informs pacing, never gets optimized for).

**Global critique of the Model Plane.** Twelve estimators over one log risks
double-counting the same evidence into correlated states, then policies reading
the same fact three times with three names ("failed twice" appears in
Frustration, Velocity, and Knowledge). Resolution: policies must consume the
*designated owner* of each construct (affect reads Frustration only; pacing
reads Velocity only), enforced by the policy-pack schema — each rule declares
which model fields it may read, and the compiler rejects rules reading
non-owned proxies.

---

## 5. Teaching State Machine (TSM)

### 5.1 Why hierarchical, and why these states

The task prompt lists ~20 candidate flat states. A flat 20-state machine
conflates three orthogonal dimensions, which makes transition tables
combinatorial and evidence gates ambiguous. EOS v2 uses a **three-layer
hierarchical statechart**:

```
LAYER 1  SESSION      OPEN → CORE → CLOSE          (+ retro-close debt)
LAYER 2  CONCEPT      the instructional ladder (below), one machine per
                      active concept, suspendable/resumable (a "process")
LAYER 3  INTERRUPT    RECOVERY overlay — preempts, runs its own machine,
                      returns one step below entry
```

**Concept-layer states (10):**

```
DIAGNOSE → ANCHOR → DEMONSTRATE → NAME → [FORMALIZE] →
GUIDED → INDEPENDENT → REFLECT → ASSESS → TRANSFER
```

Deliberate merges and exclusions from the candidate list (this answers "more or
fewer?" — **fewer states, more layers**):

- *Observe + Concrete Experience + Motivate* → **ANCHOR.** Observation of a
  concrete thing IS the concrete experience, and need-creation (the only honest
  motivation move — first-lesson/07's "need before names") lives here.
  A dedicated MOTIVATE state would institutionalize motivational speeches — a
  documented anti-pattern.
- *Analogy, Story, Demonstration* → representation choices *within*
  DEMONSTRATE (the Action Engine picks the form; the state is the function).
- *Concept Introduction + Vocabulary* → **NAME** — one state, hard-gated: the
  concept's name and terms are **banned vocabulary** in all earlier states
  (enforced by the Output Verifier — the definition-first anti-pattern becomes
  mechanically impossible).
- *Formula* → **FORMALIZE**, optional per concept (a `formalizable` flag in the
  concept entry; letter-sound correspondence has none; Newton's first law does).
- *Worked Example + Guided Practice* → **GUIDED** with an internal scaffold
  dial (worked → completion → co-production → prompted), because the fading is
  continuous, not state-shaped.
- *Revision* → not a state: a **scheduler episode type** (REVIEW) that re-enters
  the ladder at ASSESS/GUIDED with reduced scaffold.
- *Recovery* → not a ladder state: the Layer-3 interrupt.
- *Mastery, Graduation* → not states: **Knowledge-Model statuses** the Mastery
  Engine assigns after TRANSFER evidence; a state machine should not contain
  terminal ceremonies, the Scheduler owns "what next."

### 5.2 Transition table (concept layer)

Every upward edge is evidence-gated; time and turn-count never advance a state.

| From → To | Evidence gate |
|---|---|
| DIAGNOSE → ANCHOR | prior-knowledge status resolved (probe answered, or Knowledge Model already ≥ RECOGNIZED — then DIAGNOSE is skipped entirely) |
| ANCHOR → DEMONSTRATE | learner engaged with the anchor: substantive response to a Stage-1/2 question, or explicit recognition |
| DEMONSTRATE → NAME | the thing shown ≥2 instances (one is an event, two are a pattern) AND learner produced a correct prediction/echo |
| NAME → FORMALIZE | learner restated the concept in own words (produced, not echoed) |
| NAME/FORMALIZE → GUIDED | naming gate passed; formula (if any) anchored to the plain-words meaning |
| GUIDED → INDEPENDENT | fluency gate on completion problems: correct + fast-vs-baseline + unhesitant, scaffold fully faded |
| INDEPENDENT → REFLECT | ≥2 unaided successes |
| REFLECT → ASSESS | self-explanation produced (or consciously skipped by policy — flow protection) |
| ASSESS → TRANSFER | gate items passed at required strength (hint-debt-free) |
| TRANSFER → (exit) | ≥1 success in a genuinely novel surface → Mastery Engine certification pipeline (§9.7) |

**Downward rules (failure handling):**
- Any failure event drops **exactly one state** (never more — the
  one-dimension-per-rung escalation law).
- Two failures at the same state → representation change within the state
  (different channel, never the same explanation louder).
- Three failures at the same state → **stuck-concept protocol**: park the
  concept (suspend the process), switch to a scheduled alternative, register a
  repair episode; the concept's authoring gets a feedback flag (the failure→
  one-artifact-same-week loop from first-lesson/08).
- Recovery interrupt exits one state below entry (never at or above).
- Hysteresis: first re-advance after a drop needs one fluent success (high-
  water credit); a fresh advance needs the full gate. This kills oscillation.
- Floors: once DEMONSTRATE has occurred, the floor is DEMONSTRATE (re-show);
  ANCHOR is only re-entered on concept re-entry after long decay.

**Session layer:** OPEN (retro-close debt paid first → engineered win if owed →
opening retrieval of due reviews → continuity beat) → CORE (concept processes
scheduled) → CLOSE (protected; triggered by time, affect-budget exhaustion, or
summit-ending soft trigger; never sacrificed to content). Boundary = inactivity
gap per `decision-engine/07 §8` (attention-span-scaled ~30min); abandonment
mid-CORE creates the retro-close debt and, after a failure, the
failure-then-vanish flag (the churn signature).

**Failure modes of the TSM itself:** state corruption (snapshot lost) → re-fold
from evidence (L4 makes the machine crash-only software); gate starvation (a
learner who can't pass ANCHOR→DEMONSTRATE) → stuck-concept protocol catches it
at the state level, placement re-check at the process level; skip pressure from
autonomy requests → honored as *provisional advance*: the ladder moves, but
certification is withheld and a verification episode is scheduled (L5 without
imprisoning the learner).

**Testing:** exhaustive transition-table tests; property: no path from any
state to a question above its stage ceiling; simulated learners must reach
TRANSFER only through complete gate chains; fuzzed event sequences never
produce illegal states.

**Critique.** Ten gated states could feel bureaucratic for an advanced learner
who walks in knowing the concept. Answer: DIAGNOSE resolves rung ≥ INDEPENDENT
→ the machine *enters at* ASSESS (entry-point mapping from the Knowledge rung —
the structural ban on re-teaching from zero cuts both ways). Expertise reversal
is thereby structural: the ladder is fully traversed only by those who need it.

---

## 6. Teaching Policy Engine (TPE)

### 6.1 The decision procedure

Pure function, versioned: `(StudentView, ConceptState, SessionState,
InterruptState, PolicyPacks, ContentIndex) → TeachingIntent`. Executed as a
**seven-band filter network** (generalizing `decision-engine/04`'s proven
funnel and the v1 route's block order into one auditable pass):

```
BAND 0  INTERRUPTS      affect band flooded / recovery utterance / fear /
                        give-up → Recovery Engine owns the turn. Full stop.
BAND 1  OBLIGATIONS     retro-close debt · opening retrieval · close-on-win
                        when budget spent · placement probe in flight
BAND 2  LEGALITY        capability gates (§4.2) · stage ceiling (per TSM
                        state) · question budget · load budget (§4.9) ·
                        register floor · misconception incompatibility guard
                        — filters REMOVE candidate moves/actions; they never
                        add. If the legal set is empty → F3 fallback.
BAND 3  AUTHORED        per-concept dispatch from the Brain concept entry
                        (if authored, it wins outright — retrieval beats
                        derivation, always)
BAND 4  POLICY TABLES   the compiled decision matrix: TSM state × knowledge
                        quadrant (D1 grid: fluent/FRAGILE/MISCONCEIVING/
                        CONFUSED) × drive band → move + action class
BAND 5  PERSONALIZE     representation affinity stats · what-restores ·
                        interest-vector anchor selection · pace modifiers
BAND 6  TIE-BREAK       least-recently-used representation · lowest setup
                        cost · seeded novelty
```

Every band annotates the intent with the rule identifiers that fired (L3). The
bands are ordered by *authority*, not by confidence: an interrupt outranks an
authored script; an authored script outranks a generic table; personalization
never overrides legality.

### 6.2 Policy packs — policy as data

All Band-3/4/5 content is **data, not code**: versioned policy packs compiled
from the Educational Brain by the **Brain Compiler** (§16.2). A pack bundle:

- the decision matrix (D7/03 compiled to typed rows)
- the D1 adaptive grid (speed × correctness × confidence quadrant rules)
- the action catalog with fit/legality metadata (D12)
- recovery scripts (D11 foundations/01 + first-lesson/05 deltas)
- escalation ladders (D7/05)
- per-concept dispatch entries (concepts/*)
- budgets & thresholds (BrainConfig: the ADR-10 versioned policy store)

Packs are semver'd; a pack upgrade is deployed by data push, gated by the
simulation suite (§15.4) and replay diff (§15.3). This is the mechanism by
which the Brain stops being documentation and becomes the executing authority —
resolving permanently the Architecture Audit's core finding ("0 of 52 authored
layers retrieved at runtime").

**Failure modes:** deadlock (empty legal set) → guaranteed fallback ladder:
(1) SHOW the easiest legal demonstration for the current state; (2) shrink to
an echo-level micro-win; (3) warm close with scheduled follow-up. All three are
always legal by construction (they demand no capabilities, ask nothing, and fit
minimal load). Conflicting rules → compiler rejects packs with overlapping
guards at equal specificity (no silent cells, no ambiguous cells — the
Correction-2 lesson made structural). Table explosion → the affect-band
preemption rule keeps the matrix factored (~40 live rows, not 180+).

**Testing:** golden decision tables (input state → expected intent, hundreds of
rows, curated from D9's simulated sessions); property tests (legality
invariants; band monotonicity — adding personalization can never change
legality outcomes); pack-diff regression harness.

**Critique.** Policy-as-data can rot into an inscrutable rule swamp — the
expert-system failure mode of the 1980s. Three guards: (1) every rule carries a
citation into the Brain tree (rules are *compiled scholarship*, not folk
tuning); (2) the simulation suite is the merge gate, so rule interactions are
measured, not guessed; (3) the rule count is a tracked health metric with a
budget — when a new rule is needed, the first question is which existing rule
should generalize instead (the Gap Analysis discipline, applied to policy).

---

## 7. Teaching Action Engine (TAE)

**Purpose:** convert the TPE's chosen *action class* into a fully specified,
renderable **ActionSpec**.

**The action vocabulary** is the Brain's 27-action catalog (D12; 6 families:
SHOW, TELL, DO, TEST-THINKING, ORGANIZE, SOCIAL) — a **closed set** (the
syscall table). The task prompt's list (animation, diagram, simulation, story,
analogy, worked example, observation, question, experiment, reflection, quiz,
revision, project, roleplay, 3D, widget) factors cleanly: *story, analogy,
worked example, experiment, roleplay, project, quiz…* are actions (pedagogical
functions); *animation, diagram, 3D, widget, table, timeline…* are **media
forms** the Visual Decision Engine (§9.5) assigns to an action. Function first,
form second — always. A "simulation" is the Simulation action rendered as an
interactive widget; the same action for a 6-year-old may render as a
teacher-driven "watch what happens when…" sequence.

**Selection inputs:** action class + TSM state (fit tables: which actions are
legal per state), knowledge type of the concept (D2 §6 fit), capability
requirements of each candidate action, setup-cost tier, persona/age notes,
affinity statistics, action outcome table (which actions have historically
worked for this learner and this concept across the population — Evidence
Memory §10).

**Output ActionSpec:** action id · media form · content slots resolved to
assets (explanation asset, example asset, probe item, script) or to
authoring-on-miss requests · interaction contract (what the learner is expected
to do) · evidence contract (what events this action should generate — every
action declares its own instrumentation, closing the capture loop by
construction).

**Special guards (inherited, now enforced):** chocolate-covered-broccoli guard
on Game (mastery re-verified outside the game skin); stability guard on Error
Analysis (never plant a flaw before the correct schema is solid); Matching's
bidirectional check; one-analogy-at-a-time.

**Failure modes:** no asset for the slot → tiered degradation: cached asset →
parametric template → constrained generation captured as DRAFT for review (the
ADR-14 lifecycle — generation feeds the catalog, so every miss makes the system
more deterministic next time) → plain scripted fallback. Action thrash
(oscillating forms) → novelty budget + LRU tie-break.

**Testing:** fit-table exhaustiveness (every state × knowledge-type has ≥1
legal action with a zero-setup-cost fallback); asset-resolution fuzzing;
evidence-contract conformance (a rendered action that cannot emit its declared
evidence fails CI).

**Critique.** The closed-set law will chafe when a genuinely new action is
invented. Correct response: extend the catalog *in the Brain*, recompile packs
— hours, not a code release. The set stays closed at runtime precisely so it
can be open in authoring.

---

## 8. Conversation Controller (the shell)

**Purpose:** everything about the *conversation* as distinct from the
*teaching*: turn-taking, voice, and the enforcement loop.

**Responsibilities:**
1. **Turn compilation.** TeachingIntent + ActionSpec + assets → RenderPlan,
   using the react→move→invite skeleton (every learner utterance gets a
   contentful reaction before the move; every turn ends with a hand-back
   appropriate to the move — a question only if the move is ASK).
2. **Register control.** The age/tone register ladder; register never drops on
   error (foundations/03); adult-shame and child-fragility variants; matched
   energy (playfulness on struggle reads as mockery — enforced as a banned-
   pattern list per affect band).
3. **Budget enforcement.** Question count (0/1 by move), length budget
   (register × struggle, shrinking under strain), new-term budget (≤1 for
   beginners), element budget (from Load Model).
4. **The Output Verifier** — the innovation that retires prompt-hoping:
   post-render, deterministically lint the draft against the intent: question
   count · length · banned vocabulary (concept terms before NAME, formula
   before FORMALIZE, IPA at beginner register, subject-specific bans like
   "SI" in physics lesson one) · praise register · move conformance (a TEACH
   turn ending in "?" fails) · tag hygiene. Violation → one constrained
   re-render with the specific violation named; second violation → template
   fallback from the ActionSpec's scripted form. Every violation is an
   evidence event (RENDER_VIOLATION) — model quality becomes measurable.
5. **Interruption handling.** Learner asks anything off-plan → answer-first
   law (never deflect), then a return beat; the tangent logged for Curiosity.
   Autonomy requests honored per §5.2. Silence → wait-time law (the pause IS
   the pedagogy) before the non-verbal distress protocol.
6. **Continuity.** Contingency + continuity beats (D7/06): each turn carries
   one thread backward ("like the corner-shop example") — pulled from Episode
   Memory, not reinvented.

**Failure modes:** verifier false positives blocking good renders (rules are
syntactic and conservative; measured FP rate; template fallback is always
warm); driver latency → streaming with early-commit of the reaction beat;
model outage → F9 degraded mode (§14).

**Testing:** verifier golden suite (violating/conforming drafts); end-to-end
turn tests with a stub driver; adversarial drafts (model tries to smuggle a
quiz into a TEACH turn — must be caught).

**Critique.** Hard verification risks robotic sameness — the "robot register"
anti-pattern the Brain itself documents. The skeleton is constrained; the
*skin* is free: the driver owns word choice, humor, warmth, callbacks inside
the budgets. If learner-response engagement entropy drops after verifier
tightening, that is a canary metric (§15.6) demanding loosened surface
constraints — never loosened decision constraints.

---

## 9. Specialized Engines (kernel policy modules)

These are not services; they are policy modules invoked by the bands of §6.1,
each owning one hard sub-problem.

### 9.1 Assessment Engine
- **Doctrine:** assessment is **evidence acquisition with a price** (time,
  affect, flow). It runs when the value of information exceeds the price —
  never as a ritual.
- **When:** DIAGNOSE (placement: three-bracket verification, binary search on
  cut-nodes, affect budget 2 — compiled from `placement/03` + assessment/02);
  inline checks (disguised single items during GUIDED/INDEPENDENT, capped ≤1
  per N teaching turns); gates (ASSESS state: certification items, delayed +
  transfer components mandatory — same-session evidence cannot certify);
  retention probes (Scheduler-driven, spaced); calibration samples
  (predict-then-check, low stakes).
- **Never:** when affect band ≠ calm; during recovery; within the failure
  budget's shadow (a learner who just failed gets a win before any item);
  formal multi-question exams for learners below Stage-4 questioning (the v1
  assessment gate, generalized); lesson one beyond its own protocol.
- **Stopping rule:** stop when the decision the evidence informs is determined
  either way, when the confidence interval is inside the decision threshold, or
  when the affect budget is spent — whichever first. Un-resolved = default
  conservative (place lower, certify later).
- **Interaction with teaching:** every ASK carries an evidence contract; items
  are authored with distractor→misconception maps (assessment/03) so a wrong
  answer is *diagnosis*, not just a minus; oral/visual/practical modality
  selection per the accommodation-vs-measurement boundary (assessment/06).
- **Failure modes:** examiner drift (structurally impossible: ASK moves are
  budgeted and the exam protocol is a gated policy row); teaching-to-the-probe
  (item banks with surface rotation; disguised gates); gaming (certification
  requires produced, hint-debt-free, multi-context evidence).
- **Testing:** simulated learners with known states — the engine must place
  and certify within bounded item counts; miscalibrated-self-report suites
  (false beginner/false advanced from D10's simulations as executable tests).

### 9.2 Hint Engine
- **Doctrine:** a hint is a *diagnosis-first* intervention; the ladder is typed
  by **what is missing**, and a hint must be strictly easier than the problem
  (checkable: its question stage ≤ problem stage − 1; requires only RELIABLE+
  capabilities).
- **The ladder:**
  1. *Concept missing* → **no hint** — route to teach (drop TSM state). Hinting
     at an absent concept is the "harder than the lesson" bug, now illegal.
  2. *Schema-selection missing* (has pieces, can't see which apply) →
     **strategic hint**: name the *kind* of thinking ("this is a comparing-two-
     journeys problem"), never the step.
  3. *Step missing, capability present* → **progressive step hints**, 3 fixed
     rungs: orient ("where are we in the plan?") → narrow ("the part that
     changes is the denominator") → bridge (do the step *with* them) — never
     the answer; rung 3 converts to co-production.
  4. *Confidence missing* (has it, won't commit) → **motivational hint**:
     evidence-based ("you did exactly this move two problems ago").
  5. *Post-solution* → **reflective hint** ("what made this one easier than it
     looked?") — feeds Reflection Engine.
- **Recovery hints** are not hints: recovery utterances route to the Recovery
  Engine, full stop (a stuck-and-flooded learner needs a state change, not
  information).
- **Hint debt:** every hint taken is logged against the item's evidence
  strength; mastery items must be debt-free.
- **Failure modes:** misdiagnosis of what's missing → the ladder is ordered so
  errors are cheap (a strategic hint given when a step hint was needed wastes
  one turn; the reverse — a step hint when the concept is missing — is the
  harmful direction, and the concept-missing check runs first, against the
  Knowledge Model, not the LLM's guess).
- **Testing:** hint-easier-than-problem property (stage arithmetic, capability
  requirements); golden ladders per authored concept; debt accounting.

### 9.3 Analogy Engine
- **Purpose:** select — never invent at decision time — the analogy for
  DEMONSTRATE/TEACH moves.
- **Inputs:** authored analogy libraries per concept (with mapping tables:
  which features carry, which do NOT), anti-analogy lists (analogies that
  breed Type-6 misconceptions — e.g., water-circuit for current), learner
  interest vector, analogies already used (Episode Memory), the misconception
  ledger (an analogy whose overextension matches an active misconception is
  illegal — incompatibility guard).
- **Rules:** one analogy at a time; the mapping is made explicit at NAME time
  ("the pizza is the whole; the slices are the denominator — but pizzas don't
  have negative slices, and fractions do"); every analogy is *retired
  explicitly* at its boundary case before FORMALIZE (analogy retirement is a
  scheduled beat, not an accident); overextension probes are planted in ASSESS.
- **Failure modes:** analogy collision (learner's prior analogy conflicts) →
  elicit theirs first (repair sequence step 1 applies to analogies too);
  cultural mismatch (interest-vector + locale tags on assets).
- **Evolution:** cross-learner outcome table per analogy per misconception
  profile — the population learns which bridge holds which traffic.

### 9.4 Visual Decision Engine
- **Doctrine:** the OS decides the medium **before** the driver runs; a model
  may *request* a visual (tagged), the engine disposes.
- **Decision inputs:** the concept's authored representation needs
  (spatial/temporal/quantitative/relational/procedural annotations), TSM state
  (ANCHOR/DEMONSTRATE/GUIDED favor showing; retrieval-flavored states must NOT
  hand the learner the visual that would do the recall for them — desirable
  difficulty), dual-coding budget (a diagram *replaces* prose), device/age,
  cost tier (T0 cached concept-keyed asset → T1 parametric template → T2
  generated-then-captured → T3 authored interactive), a11y (mandatory alt
  description; reading-load signature prefers visual+voice over text).
- **Form selection:** quantitative-comparison→table/bar; change-over-time→
  timeline/animation; spatial-relation→diagram/3D (3D only when the third
  dimension carries meaning — cost guard); causal-mechanism→animation or
  stepped diagram; procedure→whiteboard steps; system-with-parameters→
  interactive widget/simulation (only at GUIDED+, where the learner has enough
  model to form predictions — a simulation before ANCHOR is television).
- **Failure modes:** decorative visuals (banned: every visual must carry the
  load of ≥1 removed sentence — the compiler literally requires the render
  plan's prose budget to shrink when a visual is attached); render failure →
  degrade one tier, never block the turn.
- **Testing:** decision-table goldens; the P2-violation regression (visuals
  keyed to concept, not text-hash — ADR 12's cache contract).

### 9.5 Recovery Engine (the interrupt controller)
- **Coverage** (each state: detector → immediate script family → escalation →
  exit):
  - *Confusion* — stated or behavioral → normalize + localize-one-boundary
    (or skip localization pre-NAME) → representation change → stuck protocol.
  - *Fear* — "I'm scared", avoidance patterns → stakes-to-zero script, more
    demonstration less asking; lesson-one delta: one failure state per session
    max.
  - *Frustration* — spiral detection → shrink + engineered win; budgets
    tighten; close-on-win if budget spent.
  - *Boredom* — fast-correct + drive slide → **not comfort**: compress,
    skip-ahead probe, challenge injection (boredom is a drive problem; treating
    it with warmth is the wrong band).
  - *Giving up* — "I give up" → hard stop on their attempt; teacher performs
    once, zero participation pressure; hand-back deferred a full turn.
  - *Repeated failure* — the failure-budget machine (per-session cap; P1/P4's
    counter formalized); at cap: concept closed for the day *on a win*.
  - *Silence* — wait-time law first (silence is often thinking); then
    non-verbal distress protocol; timeout evidence recorded, never scolded.
  - *Random guessing* — fast+wrong+low-effort signature → stakes lowered,
    honesty rewarded when disclosed ("thank you for telling me"), item
    non-decisive (assessment integration), two-choice shrink.
  - *Overconfidence* — fast+wrong+high-confidence → **not recovery**: routed
    to the Misconception pipeline (elicit→commit→collide). Emotional scripts
    for cognitive problems are a category error the router must not make.
  - *Underconfidence* — right+hedged chronic → evidence-based contradiction,
    calibration training, engineered independent wins.
- **Mechanics:** detectors emit interrupt events; Band 0 grants the engine the
  turn; it runs its own micro-machine (VALIDATE → SHRINK → BANK-ONE-WIN →
  RE-ENTER one TSM state below entry); scripts retrieved from packs
  (foundations/01, first-lesson/05), escalated by the per-session failure
  count (the P2 ladder, now pack-driven); every entry/exit is evidence
  (RECOVERY_ENTERED/EXITED + next-turn outcome join — the L1 loop), which is
  how *what-restores* gets learned per learner.
- **Failure modes:** false positive → gentle by design (L7); frequency cap +
  learner override ("I'm fine — keep going") recorded and respected; missed
  detection → degrades to v1 behavior (model judgment), and every miss found in
  audit becomes a detector pattern (the sensor corpus grows).
- **Testing:** the utterance corpus (every phrase in the Brain's libraries must
  trigger); escalation goldens; router tests (overconfidence must NOT enter
  recovery); simulated fragile learners must never receive a question while
  flooded (10k-session invariant).

### 9.6 Reflection Engine
- **Purpose:** consolidation and metacognition — the germane-load state.
- **Moves:** post-win self-explanation ("why did that work?"); session-close
  summaries *produced by the learner* (retrieval, not recap — the OS never
  summarizes at the learner when the learner can summarize at the OS);
  predict-then-check calibration beats; strategy naming ("what kind of problem
  was this?") feeding transfer.
- **Rules:** reflection is skippable under flow protection (interrupting deep
  flow for ritual reflection is a net loss — flow is rarer than reflection);
  variety-rotated to prevent ritual parroting; L0–L3 calibration progression
  tracked in the Confidence Model.
- **Failure modes:** reflection-as-ceremony (detected: reflection answers with
  no informational content → rotate form, reduce frequency).

### 9.7 Mastery Engine
- **Certification:** rung AUTOMATIC + retention STABLE (≥1 spaced probe ≥7
  days) + ≥1 TRANSFER event, hint-debt-free = **ANCHORED** (compiled from
  `placement/04`). Confidence levels ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN.
- **Laws:** never-reteach (ANCHORED categories are never re-entered as teaching
  targets — reviews and cues only); decay ≠ demotion (F-model schedules
  verification; failed verification → cued-recovery episode, and only *failed
  cued recovery* reopens teaching); earn-slow/lose-slow (L7 both directions);
  category progression via gate concepts; regression repair targets specific
  gates, never whole categories.
- **Failure modes:** certification inflation (the delayed+transfer requirement
  is the guard — same-session evidence structurally cannot certify); the
  opposite — mastery starvation for learners who game-avoid assessment →
  disguised gates + provisional-advance verification episodes.

---

## 10. Educational Memory (the filesystem)

Tiered stores, single-writer each, all downstream of the one log:

| Store | Contents | Writer | Read pattern | Retention |
|---|---|---|---|---|
| **Evidence Memory** | the append-only typed event log — ground truth (L4) | Perception plane + kernel (DECISION events) | folds, joins, replay | permanent (subject to privacy policy); severe events & breakthroughs never compacted |
| **Turn buffer** | current-turn working set | pipeline | this turn only | discarded |
| **Session Memory** | TSM states, budgets spent, conversation counters, episode phase | kernel persist stage | next turn | session + boundary |
| **Episode Memory** | per-episode summaries, threads for continuity, retro-close debts | summarizer (post-episode) | Conversation Controller continuity; append-raw/read-summaries | rolling, summaries permanent |
| **Working Memory Model store** | span estimates | its estimator | Load Model | permanent, decaying confidence |
| **Long-term Learner Memory** | the 12 model states (snapshots/caches of folds) | each estimator (single-writer per model) | StudentView assembly | permanent; re-derivable |
| **Capability Memory** | capability states — **cross-subject, learner-scoped** | Capability estimator | legality filters everywhere | permanent |
| **Misconception Memory** | the ledger + repair history + burned collisions | Misconception estimator | Bands 2–4; Analogy/Assessment guards | permanent (DORMANT-VERIFIED kept forever) |
| **Teaching Memory** (per-learner) | what works for THIS learner: representation affinities, what-restores, pace, trigger ledger | Band-5 feedback folds | personalization band | permanent, statistical |
| **Recovery Memory** | recovery entries/exits, speeds, script outcomes | Recovery Engine | its personalization + Motivation | permanent |
| **Teacher Memory** (cross-learner) | population outcome tables: action × concept × learner-band effectiveness; analogy tables; misconception prevalence; probe quality | nightly aggregation workers (ADR 13's three-tier chain) | Bands 4–6 priors; authoring feedback | permanent, anonymized |
| **Asset/Content Memory** | knowledge assets (ADR 14 lifecycle), visual cache (concept-keyed), policy packs | authoring pipeline + capture-on-miss | Action Engine resolution | versioned |

**Rules:** no store is written by two subsystems; every read is through a typed
view; PII (verbatims) is redacted/flagged at ingest per the owner-gated privacy
policy for minors; every store except Evidence is a cache by law (L4) — the
recovery answer to any corruption question is "re-fold."

**Critique.** Event sourcing at scale is the known cost: log growth, fold
latency, migration complexity. Mitigations: per-learner log partitioning;
snapshot-plus-tail folding (O(new events) per turn); compaction with
never-compact classes (severe negatives, breakthroughs, misconception
verbatims); estimator versions pinned per snapshot so lazy re-folds amortize.
The cost is paid because replayability and provenance are not features here —
they are the product's epistemology.

---

## 11. Runtime Decision Graph (the per-turn pipeline)

```
 1 INGEST         message, timings, client events            [transactional]
 2 SENSE          run sensor registry → evidence events      [probabilistic, recorded]
 3 COMMIT-1       append perception evidence                 [transactional]
 4 FOLD           update model snapshots (affected models)   [pure]
 5 INTERRUPT SCAN Band 0 check                               [pure]
 6 SCHEDULE       session layer step; pick/resume concept    [pure]
 7 TSM STEP       concept machine transition (evidence gates)[pure]
 8 POLICY         Bands 1–6 → TeachingIntent                 [pure]
 9 RESOLVE        Action Engine: assets/templates            [deterministic + capture-on-miss]
10 COMPILE        Conversation Controller → RenderPlan       [pure]
11 RENDER         driver call (LLM/visual/template)          [probabilistic]
12 VERIFY         Output Verifier → repair/re-render/fallback[deterministic]
13 COMMIT-2       assistant turn, DECISION event w/ full     [transactional]
                  provenance, RENDER_VIOLATIONs, evidence
                  contracts armed for next turn
14 PERSIST        session/TSM snapshots                      [transactional]
15 POST           async: aggregations, capture ingestion,    [background]
                  scheduling updates, notifications
```

Steps 4–10 are the kernel: given committed evidence, they are a deterministic
function (L2). Replay = feed the log through steps 4–10 and diff intents. The
render (11) is outside the determinism boundary by design; its *output* is
recorded so full-conversation replay is still exact as data.

---

## 12. Cognitive Science → Runtime Mechanism Table

Each principle names the *exact* mechanism that changes behavior — a principle
without a mechanism is decoration.

| Principle | Runtime mechanism (owner) |
|---|---|
| Working memory limits | element budget per RenderPlan; over-budget plans split/repaired (Load Model + Verifier) |
| Chunking | automaticity states compress element counts (Capability → Load composition); chunk formation is *measured* (fluency gate), never assumed |
| Spacing | Scheduler injects REVIEW episodes at recall-probability ~0.7 from per-learner curves (Forgetting Model) |
| Retrieval practice | produce-the-answer items only ("do you remember X?" is a banned pattern); opening retrieval mandated in OPEN; cued retrieval on FORGOT |
| Interleaving | practice-set composer mixes discriminable schemas once ≥2 exist at INDEPENDENT; never before (interleaving one schema is noise) |
| Dual coding | Visual Engine pairs verbal+visual when load permits; visual must replace prose (budget arithmetic); decorative visuals illegal |
| Cognitive load theory | intrinsic/extraneous estimation as legality filter (Band 2); germane protected by Reflection Engine |
| Expertise reversal | scaffold dial tied inversely to Knowledge rung; DIAGNOSE entry-point mapping skips the ladder for the fluent; worked examples for novices, problem-first for RELIABLE+ — automatic, not configured |
| Automaticity | fluency gate (correct+fast+unhesitant) drives GUIDED→INDEPENDENT and RELIABLE→AUTOMATIC; latency measured server-side against personal baseline |
| Transfer | TRANSFER is a mandatory certification component; transfer maps authored per concept; capability transfer credited cross-subject; strategy-naming beats (Reflection) build the abstraction |
| Desirable difficulty | review timing at 0.7 recall; retrieval before re-exposure; visuals withheld during recall states |
| Testing effect | inline checks are retrieval events by design; every ASK is both instruction and evidence |
| Wait time | silence tolerance before any re-prompt (Conversation Controller timer, band-scaled) |

---

## 13. Replacing Prompt Engineering — the Inventory

Every current prompt mechanism, classified by destination. (The v1 stack is
~20 blocks; Phases A–H already moved the first tranche.)

| Current prompt mechanism | Destination in EOS v2 |
|---|---|
| Principle 2 / question mandates | **retired** (done, Phase A) → Question budget in kernel + Verifier count |
| Question Stage Policy prose | stage ceiling computed per TSM state (done as directive; prose remains only as School-mode fallback until migration) |
| Explanation Sequencing Law prose | TSM state ordering (ANCHOR→…→FORMALIZE) + banned-vocabulary verifier — the *order becomes states*, not sentences |
| LEARNING RULES 1–5 | budgets + verifier + policy rows |
| ACTIVE TEACHING STRATEGY block | Band 4 policy tables (strategy becomes intent fields, not prose) |
| TEACHING ENGINE DECISION block | the TeachingIntent itself (internal; only its content payload reaches the driver) |
| ACTION PROCEDURE blocks | ActionSpec templates from packs (content payload, not instruction) |
| HINT TAG instruction | Hint Engine ladder; driver receives the *chosen hint text slot*, not hint philosophy |
| ASSESSMENT PROTOCOL block | Assessment Engine gated policy; exam flow is a scripted action sequence |
| PREREQUISITES NOT MET warnings | Capability/Knowledge legality filters — the situation stops arising |
| Misconception alert blocks | Band 2 incompatibility guard + Band 3 repair dispatch (collision case as content payload) |
| Recovery blocks | Recovery Engine scripts (content payload) + Band 0 (already runtime-triggered in v1) |
| First-lesson protocol block | lesson-one policy pack: locked budgets/config (first-lesson/04), enforced by Verifier |
| Curriculum progression / roadmap / coach context blocks | Scheduler state (the model never needs to be *told* boundaries it cannot cross — illegal concepts simply never appear in intents) |
| Placement probe blocks | Assessment Engine DIAGNOSE flow (probe items as payload) |
| Session lifecycle blocks (opening/closing) | Session-layer states with scripted beats as payload |
| VISUAL tag instructions | Visual Engine decision; driver told which visual, not whether |
| Adaptive tutor context / learner profile prose | consumed by the kernel; the driver gets *derived* constraints (register, budgets), not raw profiles — a major token and interference reduction |
| Memory-from-previous-lessons prose | Episode Memory continuity beats, selected by the Controller |
| Notation rules (IPA etc.) | Verifier banned-pattern lists per register |
| LESSON_COMPLETE tag protocol | TSM exit + Mastery pipeline; learner-visible completion is a UI event, not a model utterance |

**What legitimately remains prompt (the authorized residue,** `validation/03`**):**
persona/voice definition; empathy phrasing; language style; the rendering of
*decided* content into natural conversation; novel-utterance handling (routed
to sensors first). Target steady-state driver prompt: **persona (~150 tokens) +
laws summary (~100) + turn directive (~80) + content payload (variable)** —
versus v1's ~4,000-token, 20-block stack. The reduction is not cosmetic: fewer
concurrent instructions = less interference = higher conformance, and
conformance is now *measured* (RENDER_VIOLATION rate) rather than hoped.

---

## 14. Failure Mode Catalog

| # | Failure | Detection | Recovery | Prevention |
|---|---|---|---|---|
| F1 | Sensor fabrication (classifier invents outcomes) | consistency rules (signal without question; probe answered that was never asked) | discard event; sensor distrust counter; conservative policy | schema-constrained outputs; fabrication-forbidden contracts; corroboration for high-stakes updates |
| F2 | Affect misread (false recovery / missed recovery) | override utterances; audit sampling; next-turn outcome joins | learner override honored + recorded; missed cases become detector patterns | L7 asymmetric design; frequency caps; baseline-relative detectors |
| F3 | Policy deadlock (empty legal action set) | kernel invariant check | guaranteed fallback ladder (easiest legal SHOW → echo micro-win → warm close) | pack compiler proves every state has a zero-requirement action |
| F4 | State oscillation (advance/drop loops) | cycle detection in TSM history | hysteresis; stuck-concept protocol after 3 cycles | two-successes-to-advance on fragile rungs; high-water re-entry credit |
| F5 | Renderer non-conformance | Output Verifier | one constrained re-render → template fallback | driver contract tests; violation-rate SLO per model version |
| F6 | Stale learner state (returning learner) | freshness fields | resumption protocol: warm-up probes from high-water mark, never assume, never re-teach from zero | decay marks staleness; probes precede consequential decisions |
| F7 | Cold start (no evidence) | trivially known | age/level-claim priors + three-bracket placement; conservative ceilings; population priors as soft prior only | boot protocol is mandatory (no teaching before placement resolves) |
| F8 | Evidence log gap/corruption | checksums; fold monotonicity violations | re-fold from last good snapshot; degrade to session-local teaching | append-only store; transactional commits; backups |
| F9 | LLM outage / degraded model | driver health checks; violation-rate spike | **degraded deterministic mode**: scripted moves + assets + template renders + practice items — the OS still teaches; voice quality drops, decisions don't | asset coverage growth; template library per action |
| F10 | Learner gaming ("understood!" to advance) | claims vs produced evidence divergence | provisional advance + scheduled verification; certification withheld (L5) | mastery requires produced, debt-free, delayed evidence |
| F11 | Capability misattribution | conflicting evidence across contexts | diagnostic-item isolation; context tags; weak updates from compound items | attribution algorithm (§4.2) |
| F12 | Robot register (over-mechanized voice) | engagement entropy canary; register audits | loosen surface constraints; rotate scripts; humor budget | skeleton-vs-skin boundary (§8 critique) |
| F13 | Personalization overfit | confidence intervals on affinities | min-evidence thresholds; decay | affinities as statistics, never switches |
| F14 | Policy pack regression | replay diff + simulation gate pre-deploy | pack rollback (data revert, no code deploy) | semver'd packs; canary cohort rollout |
| F15 | Privacy breach (minor verbatims) | ingest-time PII classifier; audits | redaction; purge pipeline | owner-gated capture policy; redact-by-default at ingest |
| F16 | Kernel bypass (new code path skips DECIDE) | provenance coverage metric (turns without DECISION events) | block release | architecture test (§15.7); choke-point module ownership |
| F17 | Cross-model double-counting | policy schema field-ownership audit | rule rejection at compile | designated-owner rule (§4 critique) |
| F18 | Scheduler starvation (review debt swallows sessions) | review-fraction metric | cap + dependency-ranked overflow | budget law applied to the scheduler itself |

---

## 15. Testing Architecture

1. **Unit (pure core).** Every fold, gate, filter, and policy function is pure
   → exhaustively unit-testable. Property tests: budget invariants (no intent
   ever exceeds question/load/length budgets); legality (no intent requires a
   NO capability; no question above stage ceiling); fold laws (snapshot ≡
   fold(log); idempotent re-fold); TSM reachability (TRANSFER unreachable
   without complete gate chains).
2. **Golden decision tables.** Curated (state → expected intent) rows, sourced
   from the Brain's worked traces (D7/04's three traces, D9's session
   simulations, D10's six placement students) — the authored scholarship
   becomes executable specification.
3. **Replay testing.** Recorded evidence logs (anonymized production + synthetic)
   re-run through candidate kernels/packs → decision diff reports; diffs in
   sensitive bands (recovery, assessment, certification) require human review.
   This is the regression mechanism for policy evolution.
4. **Simulation testing.** Persona automata — parameterized synthetic learners
   (capability profile, error model, affect dynamics, latency distributions,
   gaming propensity): fragile beginner · false-advanced adult · bored expert ·
   guesser · silent child · returning-after-14-months (the D9/D10 cast,
   mechanized). Run 10⁴ episodes per candidate release; assert invariant
   violations = 0 (never calculation before capability; never >1 question per
   turn; recovery always fires on scripted utterances; flooded learners never
   receive items; mastery only via transfer) and compare outcome distributions
   (time-to-first-win, rungs/hour, failure-then-vanish rate) across versions —
   offline policy evaluation before any learner sees a change.
5. **Educational-correctness suite.** The Phase-H scenario tests generalized:
   every authored anti-pattern in the Brain's anti-library (16 entries,
   first-lesson/06) becomes a detector + a regression test asserting the OS
   cannot produce it.
6. **Determinism harness.** Stub driver; seeded tie-breaks; byte-identical
   intent traces across runs and machines — CI-gated (L2 is a test, not a hope).
7. **Architecture tests.** Kernel choke-point: every assistant turn in every
   integration test must carry a DECISION provenance event (F16); no module
   outside RENDER may import a driver; no module inside DECIDE may perform I/O
   besides the log.
8. **Canary metrics (production).** Render-violation rate per driver version;
   invented-move rate; engagement entropy; recovery precision (override rate);
   time-to-first-win; failure-then-vanish. Regressions page a human.

---

## 16. The Educational Brain in EOS v2 — and the AGI Future

### 16.1 The moat, restated precisely

Assume models get 100× smarter. What do they still not have?

1. **The evidence corpus.** Longitudinal, instrumented, per-learner learning
   records — manufactured by deliberately scheduled probes, joined
   decision→consequence. Not in any training set; grows only where teaching
   happens.
2. **Cross-learner outcome tables.** Which collision repairs which
   misconception for which learner band; which analogy holds; which probe
   discriminates. Teacher Memory is empirical pedagogy no one can prompt for.
3. **Verified state.** A frontier model can *converse about* a learner; it
   cannot *know* what this learner did under instrumentation last month unless
   this system tells it.
4. **The stance, in code.** L5 is the structural answer to "why not just chat
   with the AGI?": a general assistant is loyal to present comfort by
   construction (it satisfies the current request). The OS is loyal to future
   competence *because the kernel — not the model — decides*, and the kernel's
   incentives are compiled, audited pedagogy. A 100× model inside EOS v2 is a
   100× better voice, sensor, and asset-drafter. It still cannot advance a
   learner past a gate, skip a capability check, or answer instead of teach.
5. **Proactive scheduling + relationship continuity** — the OS initiates;
   assistants wait.

### 16.2 How AI reasoning disappears from teaching decisions

The **Brain Compiler** is the engine of disappearance: authored knowledge
(educational-brain/*) compiles into policy packs, scripts, item banks, and
asset seeds — retrieval replaces derivation permanently (D3–D15 built the
scholarship; the compiler makes it executable). Per-turn LLM *reasoning about
pedagogy* is then measurable residue:

- **The AI-Decision Ratio (ADR metric):** share of turn decisions (move,
  action, stage, medium, budget, advancement) not backed by a rule/table/asset
  citation. v1 measured ≈ 100% (Architecture Audit: 0/52 layers retrieved).
  Phases A–H moved move/budget/stage/recovery/autonomy to ≈ code. EOS v2
  target: **0% in DECIDE**, with the invented-move detector (§13, F16)
  policing drift.
- **Capability curve per model generation:** each new model is onboarded as
  driver + sensors only; its improvements show up as lower violation rates and
  tighter sensor error bars — never as new decision authority. Model swaps
  become a driver-contract test run, not a re-prompt-engineering project
  (model-agnosticism as a tested property).
- **Asset flywheel:** every generation-on-miss is captured into review (ADR 14)
  — the system converts its own residue into determinism. The asymptote: the
  LLM as pure voice-renderer over an authored, evidence-ranked catalog — the
  ADR 14 endgame, now with the kernel that makes it enforceable.

### 16.3 Brain v3 shape

Brain v1 = frozen architecture docs. Brain v2 = the authored knowledge tree
(D1–D15). **Brain v3 = authored structure + evidence-fitted parameters**: the
tables keep their authored *shape* and citations, while thresholds, orderings,
and per-band effectiveness weights are tuned from Teacher Memory under the
simulation+replay gates. Authored scholarship sets the priors; a million
learners set the posteriors; humans review the diffs. The Brain stays auditable
the whole way — that is what "the Brain is the moat" means operationally.

---

## 17. Relationship to the Existing System & Migration Arc

**What already exists and is kept (this spec is their target, not their
replacement):**

- `conversationState.ts` (Phases C–G) — the proto-TSM concept layer + budgets
  + next-move: kernel embryo.
- `recoveryGuard.ts` + P1–P5 — proto-interrupt-controller + affect budget +
  recovery evidence.
- `signals.ts`, latency capture — proto-sensors.
- `sessionLifecycle.ts` — session layer.
- `placementVerification.ts` — boot loader seed.
- `teaching-engine/decide()` + strategy engine — Band-4 ancestors.
- AssetIdentity/Evidence Engine (W1-3/W1-4, ADR 13/14) — Asset & Evidence
  Memory seeds. `EbEvidenceEvent` is the Evidence-Memory schema ancestor.
- The Brain tree (D1–D15) — the source the compiler will compile.
- Bible v1 + ADRs — remain the v1 authority; upon owner adoption of this spec,
  the Bible gains an EOS v2 index entry and each migration milestone updates it.

**Migration arc (strangler fig; every milestone independently valuable and
G2-gated; no big-bang rewrite):**

- **M0 (done, July 2026):** Phases A–H — decisions begun moving into runtime.
- **M1 — Evidence spine:** unify all writes into the typed event log with
  DECISION provenance events; replay harness over it.
- **M2 — Capability Memory v1:** per `CAPABILITY_MODEL_DESIGN.md` M1–M3;
  legality filter on capability states.
- **M3 — Kernelization:** extract PERCEIVE/DECIDE/RENDER boundaries inside the
  chat route (the route is already the orchestrator — Architecture Audit); the
  choke-point module + architecture test (F16).
- **M4 — Policy packs:** Brain Compiler v1 (D1 grid, decision matrix, action
  catalog, recovery scripts → data); Band structure in the kernel.
- **M5 — Output Verifier loop** + banned-vocabulary state gates (NAME/
  FORMALIZE enforcement).
- **M6 — Degraded deterministic mode + simulation CI** (persona automata as a
  merge gate).
- **M7 — Estimator suite completion** (the remaining models of §4, each
  shipped only when a policy consumes it — no model without a customer).

---

## 18. Self-Critique Register (standing challenges to this design)

1. **"Determinism is a lie because sensors are probabilistic."** Accepted and
   scoped: L2 claims determinism *given committed evidence*. The honest
   statement is: uncertainty is quarantined at the boundaries and recorded,
   never diffused through the decision core. That is the strongest claim
   available to any perceiving system, human teachers included.
2. **"Twenty-six subsystems is over-engineering."** Agreed — hence four planes,
   twelve estimators on one contract, and engines as policy modules. The
   requirements list is honored conceptually; the implementation is deliberately
   smaller than the org chart implies. Rule going forward: no new subsystem
   without a consumer (mirrors the capability admission rule).
3. **"A gated ladder will bore fast learners."** Expertise reversal is
   structural (DIAGNOSE entry mapping, skip-ahead probes on boredom band,
   provisional autonomy advancement). If simulation shows fluent personas
   grinding through ANCHOR, that is a release-blocking bug, not a tuning note.
4. **"Mechanized teaching will feel robotic."** The skeleton/skin boundary plus
   the engagement-entropy canary. Note the asymmetry of the alternative: v1's
   warmth was also non-deterministic *pedagogy*, and the SI-Units transcript
   shows what that buys. Warmth belongs to the driver; judgment to the kernel.
5. **"Content coverage (3/1800 concepts) makes this a castle without furniture."**
   The kernel is content-light by design: generic policy packs + capability
   gates already teach better than prompt-stacking (Phases A–H proved the
   pattern). Authored entries upgrade concepts from generic to excellent
   incrementally; capture-on-miss furnishes rooms as learners walk through
   them; instrumented skeletons (D15) order the authoring queue by evidence.
6. **"Event sourcing is operationally expensive."** Costed in §10; paid
   deliberately because provenance and replay are the epistemology of the
   product (the moat is the corpus; the corpus is the log).
7. **"Policy packs become an expert-system swamp."** Three guards in §6.2
   (citations mandatory, simulation merge gate, rule-count budget). The 1980s
   expert systems died of unvalidated rules and no feedback loop; this design
   is a feedback loop with rules inside it.
8. **"Why not let a 100× model just teach?"** Because loyalty-to-future-
   competence is an incentive property, not an intelligence property (§16.1).
   Intelligence improves the tutor's *hands and eyes*; the OS is its *spine*.

---

## 19. Glossary

- **ActionSpec** — fully resolved, renderable action (function + form + content).
- **ADR metric** — AI-Decision Ratio: fraction of turn decisions lacking rule provenance.
- **Band** — one authority level of the policy filter network (§6.1).
- **Brain Compiler** — build step turning `educational-brain/` into policy packs.
- **Capability** — subject-agnostic, testable operation with lattice state.
- **DECIDE** — the pure decision plane; the kernel.
- **Evidence contract** — the events an action commits to emit.
- **Fold** — pure state reconstruction from the evidence log.
- **Policy pack** — versioned data bundle of compiled pedagogy.
- **Provisional advance** — autonomy-honored progression without certification.
- **RenderPlan / TeachingIntent** — the typed outputs of Controller / kernel.
- **Skeleton vs skin** — decided structure vs model-rendered surface.
- **TSM** — Teaching State Machine (three-layer statechart, §5).

---

*End of specification. Adoption, sequencing, and every runtime change derived
from this document remain owner decisions under the standing G1/G2 governance
rules.*
