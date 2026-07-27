# EOS v3 · Plane 4 & 5 — Improvement, Operations, Governance

Planes 0–3 teach one learner well. Plane 4 is the reason the system teaches *better next
year than this year*, and it is where the platform's only durable competitive asset is
manufactured. Plane 5 is the reason it is allowed to exist.

---

## C-42 · Learner Simulator

**Why it exists.** Every pedagogical change is a hypothesis about human learning, and the
only way to test it is on humans — who are children, who get one childhood, and who cannot
be A/B tested at the rate the system needs to improve. This is the central methodological
problem of educational technology, and almost nobody solves it. The answer is a population
of simulated learners: not to replace evidence from real learners, but to eliminate the
*obviously bad* changes before any child meets them, and to make pedagogical logic
regression-testable in the way ordinary software is.

**Purpose.** Provide a fast, reproducible, parameterized population of synthetic learners
against which teaching policy can be exercised, regression-tested, and gated (A20).

**Responsibilities.** Maintain simulated learner archetypes parameterized on the same
dimensions the real Twin uses — prior knowledge distribution, specific held misconceptions
with defined resistance, forgetting rate, affect budget and triggers, persistence,
self-report bias, reading load, attention span, metacognitive calibration. Execute full
multi-session journeys against the real kernel, real state machine, real contracts, and a
stubbed or real renderer. Emit the same evidence stream a real learner would, so every
downstream component is exercised end to end.

**What it is used for, in order of value.**
1. **Regression gating.** A named set of scenarios that must never break: the fearful
   beginner reaching lesson-one completion; the learner who says "I don't know" three
   times receiving instruction rather than a fourth question; the confident-wrong learner
   being routed to misconception repair rather than praise; the returning learner after 14
   months being re-cued rather than re-taught; the bored advanced learner being
   accelerated rather than drilled. Each is a test, run on every change.
2. **Policy comparison.** Two policy versions run against the identical population with
   identical seeds; the difference is attributable to the policy alone — impossible with
   real learners.
3. **Failure discovery.** Adversarial simulated learners (the gamer, the disengaged, the
   erratic, the one who lies about their level in both directions) find states real
   testing never reaches.
4. **Coverage.** Proving the decision matrix is total by driving the state space directly.

**The honesty requirement.** A simulator is a model of a model and will be wrong. The
architecture treats it as a *filter, never a proof*: it can reject a change, it can never
certify one. Its parameters must be continuously fitted to real observed behaviour from
the Ledger, and its predictive fidelity must itself be a tracked metric — a simulator
whose predictions diverge from reality is a defect, and its divergences are the most
interesting research output the platform produces.

**Inputs.** Policy version under test, archetype population, seeds, real-behaviour
distributions for calibration.
**Outputs.** Scenario pass/fail, comparative learning-outcome estimates, discovered
failure states, coverage reports.

**Ownership.** Owns synthetic learners and pedagogical regression testing. **Must NOT
own** any claim about real learners, and must never write to a real Twin.

**Failure modes.** Overfitting policy to the simulator (mitigated by holding archetypes
out, by rotating them, and by requiring real-world confirmation before any change is
considered validated); false confidence (mitigated by the filter-not-proof rule, stated as
policy).

**Evolution.** Simulators fitted per real learner become *predictive* — the system can
forward-simulate several teaching paths for this specific learner and choose the one with
the best predicted outcome. That is planning, and it is the natural end state of this
architecture: model-based control over a learner-specific dynamics model.

---

## C-43 · Experiment Engine

**Why it exists.** Without controlled comparison, the platform accumulates opinions about
teaching, not knowledge. But experimentation on learners is ethically loaded in a way that
experimentation on shopping-cart layouts is not: the cost of the inferior arm is borne by a
child's education, and it is not recoverable.

**Purpose.** Run controlled comparisons that produce causal knowledge about teaching, under
binding ethical constraints.

**Responsibilities.** Assignment (learner-level, cohort-level, or within-learner
crossover, which is often the most powerful and least costly design); exploration budget
allocation across the Asset Economy and the Strategy Engine; guardrails; sequential
analysis with early stopping; result publication into asset scores and policy versions.

**The ethical constraints are architectural, not procedural:**
- Both arms must be *defensible teaching*. The system never runs a known-inferior arm; it
  compares two credible approaches.
- Struggling learners and learners in a fragile affect state are excluded from exploration
  automatically. Exploration happens on stable learners in stable states.
- A **floor guarantee**: no learner's experience may fall below a defined quality bar
  because of assignment. Any arm that breaches the floor is stopped immediately for
  everyone, not merely analyzed.
- **Simulator-first**: no arm reaches learners without passing C-42.
- Sequential monitoring with automatic stopping on harm, not merely at the planned end.
- Full disclosure to guardians and institutions that the system continuously improves
  through comparison, in plain language.

**Inputs.** Hypotheses from Analytics and Authoring, eligible-population definitions,
budget.
**Outputs.** Assignments (recorded in the Ledger at decision time, which is what makes
later analysis honest), results with effect sizes and uncertainty, stopping decisions.

**Ownership.** Owns experimental design and assignment. **Must not own** what counts as a
good outcome (C-44) or deployment (C-45).

**Failure modes.** Underpowered experiments producing noise treated as knowledge (minimum
detectable effect declared *before* running, and results below it reported as
inconclusive, never as null); metric myopia (short-horizon proxies favour the wrong arm —
addressed by requiring at least one long-horizon retention outcome for any pedagogical
claim); interference between simultaneous experiments (an experiment registry with
declared interaction domains).

**Evolution.** Continuous, always-on bandit allocation across the asset library with
long-horizon reward — the platform becomes an instrument that is permanently, cautiously
learning to teach.

---

## C-44 · Learning Analytics & Causal Inference

**Why it exists.** The Ledger contains the answer to "does this work" for every teaching
decision the platform has ever made. Extracting it is not a reporting task; it is a causal
inference task, because teaching decisions are not randomly assigned — they are made
*because* of learner state, which is precisely the confounder.

**Purpose.** Convert the evidence stream into reliable causal knowledge about teaching,
and into the honest measurement of whether the platform works.

**Responsibilities.** Maintain the decision-consequence join; estimate effects using the
recorded decision rationale and the *rejected alternatives* as the basis for propensity
and counterfactual analysis; validate every gate criterion against downstream success;
validate prerequisite edges empirically; surface misconception prevalence; detect policy
regressions; produce the outcome hierarchy below; detect and report differential
effectiveness across learner populations (an intervention that helps one group and harms
another must never hide inside an average).

**The outcome hierarchy — what the platform is judged on**, in strict priority order.
Naming these is an architectural act, because a system tends to become whatever it
measures:

| Rank | Outcome | Why it is above the next |
|---|---|---|
| 1 | **Durable transferable mastery** — verified application in novel contexts, months later | the actual definition of learning |
| 2 | **Learner autonomy** — decreasing dependence on the system for the same class of problem | a tutor that is not becoming unnecessary is failing |
| 3 | **Metacognitive calibration** — the learner's improving ability to know what they know | the skill that outlives the content |
| 4 | **Learning identity** — movement on "I can learn this" | the variable with the longest half-life |
| 5 | **Learning efficiency** — mastery per learner-minute | respects the scarcest resource |
| 6 | **Return** — the learner comes back | necessary, and only meaningful given 1–5 |

**Explicit anti-metrics.** Time-in-app, message count, streaks, completion percentage, and
session length are *diagnostic* signals only and may never be optimization targets. Any of
them rising while (1)–(4) are flat is a defect. This must be enforced at the level of what
the organization is permitted to target, because it is the failure mode that has destroyed
the educational value of almost every consumer learning product.

**Inputs.** The Ledger. **Outputs.** Effect estimates, gate validations, graph-revision
proposals, authoring priorities, regression alerts, outcome reporting.

**Ownership.** Owns measurement and causal claims. **Must not own** the interventions.

**Failure modes.** Confounded causal claims presented as fact (mitigated by requiring
either randomization or an explicit, stated identification strategy for every causal
claim — observational estimates are labelled as such); p-hacking across thousands of
assets (pre-registration for pedagogical claims; false-discovery control for asset
scoring); optimizing a proxy (the anti-metric rule); privacy leakage through aggregates
(differential privacy on any external release).

**Evolution.** The platform becomes the largest instrument for learning science ever
built — and, importantly, one whose findings are reproducible, because the Ledger permits
exact replay. That is a scientific contribution, not only a product advantage.

---

## C-45 · Governance, Safety & Data Rights

**Why it exists.** The system makes consequential, autonomous decisions about children,
holds intimate longitudinal data about how their minds work, and is subject to
irresistible commercial pressure to optimize for engagement. None of those is manageable
by good intentions. They are manageable by architecture: named owners, hard boundaries,
audit trails, and channels that cannot be bypassed.

**Purpose.** Make the system's power accountable, bounded, and correctable.

**Responsibilities.**
- **Safety charter**: crisis detection and human handoff; content boundaries by age; abuse
  and grooming detection; the requirement that a safety decision may summon a named human
  and never resolves purely in software.
- **Policy governance**: every pedagogical policy is a versioned artifact with an owner,
  a review record, a simulator gate, a staged rollout, and a one-action rollback. A policy
  change is a deployment, with the same rigour as a code deployment (A19).
- **Audit**: any decision, for any learner, at any past moment, reconstructible with its
  inputs, rule, policy version, and rejected alternatives (A4). This is what makes the
  system defensible to a parent, a school board, or a regulator.
- **Data rights**: consent management, minimization (nothing is captured that no component
  consumes), retention limits by data class, erasure via crypto-shredding without breaking
  replay, and full learner-owned export (A22).
- **Objective boundaries**: the enforced prohibitions — the Identity model may not serve
  engagement; the Relationship Engine may not serve retention; the Struggle Controller may
  not be given an engagement objective; anti-metrics may not become targets. These are
  listed in one place, owned by one body, and checked.
- **Human override** everywhere (A24), with overrides recorded as evidence.
- **Bias and equity monitoring**: differential outcomes by language, locale, disability,
  and socioeconomic proxy, measured continuously and reported, with the explicit
  expectation that discovered gaps are defects to fix rather than statistics to note.

**Inputs.** Everything. **Outputs.** Vetoes, policy releases, audit responses, rights
executions, published outcome and equity reporting.

**Ownership.** Owns the boundaries. **Must not own** the teaching — it constrains, it does
not instruct.

**Failure modes.** Governance as theatre (mitigated by making it mechanical: the simulator
gate, the rollback action, and the audit query are code paths, not meetings); overreach
paralyzing improvement (staged rollout and rollback exist precisely so most changes are
low-stakes and fast); regulatory divergence across jurisdictions (rights profiles are
per-jurisdiction data, not branching logic in the kernel).

**Evolution.** External audit: the architecture is deliberately built so that an
independent party could be given the ability to verify claims about how learners were
taught. Very few systems in any domain can offer that, and in education it will eventually
be required.

---

## Cross-cutting · Testing architecture

Five tiers. Tiers 3 and 4 are what distinguish this from ordinary software testing, and
they are the ones nobody builds.

| Tier | What is tested | Method | Gate |
|---|---|---|---|
| T1 · Unit | Pure logic: belief updates, decay, scheduling, contract composition, verifier checks | Deterministic tests over fixtures | Every commit |
| T2 · Component | Each component against its declared contract, with dependencies stubbed | Contract tests; every capability has a frozen evaluation suite | Every commit |
| T3 · **Pedagogical regression** | Full journeys through the real kernel against simulated learners (C-42) | Named scenarios that must never break | Every policy or kernel change |
| T4 · **Transcript conformance** | Recorded real sessions replayed against a new policy; every divergence classified as improvement, neutral, or regression, by a reviewer | Replay from the Ledger | Every policy change |
| T5 · Live | Staged rollout with automatic stopping on outcome or safety regression | Canary → cohort → general | Every release |

Three properties make this possible and are direct consequences of Plane 0: the kernel is
deterministic (T1/T3 are reproducible), the Ledger is complete (T4 exists at all), and
policy is a versioned artifact (all of it is diffable). An architecture without those
three cannot be tested this way, which is why most teaching systems are validated by
demo and vibe.

**The seam that matters.** Everything above the Capability Plane must be testable with no
model in the loop — the renderer is stubbed and the verifier checks the contract. If a
test requires a live model, the boundary has been violated somewhere.

---

## Cross-cutting · Scaling architecture

The design's scaling property is structural rather than clever: **the runtime has no
cross-learner dependency**. Every read and write in Planes 0–3 is scoped to one learner.
That single fact yields near-linear horizontal scale.

- **Sharding key: learner id**, uniformly, everywhere. No runtime transaction ever spans
  two learners.
- **Kernel is stateless and replicated**; state lives in the Ledger and its projections.
- **Ledger is partitioned by learner** and tiered hot/warm/cold. Replay is never from
  origin: periodic immutable **state checkpoints** mean reconstruction reads one snapshot
  plus a bounded tail. Without checkpoints, a decade-long ledger makes replay
  asymptotically unusable — with them, replay cost is constant.
- **Projections are materialized and cached**; the hot path reads projections, never the
  raw log.
- **Cross-learner work is asynchronous, batch, and never on the turn path**: asset scoring,
  prevalence statistics, experiment analysis, policy fitting. If any of it stops, teaching
  continues (it degrades improvement, not service).
- **Twin storage tiering.** A decade of learning across ~10⁴ claims with full provenance is
  the dominant storage cost. Active claims are hot; ANCHORED and long-dormant claims are
  compacted to summary plus checkpoint, with full evidence in cold storage, recoverable.
- **Inference economics**: the asset-served path (T0) is the primary lever. As coverage
  grows, the fraction of turns requiring a model call falls, so unit cost declines with
  scale — the opposite of the usual dynamic, and the reason the Asset Economy is a scaling
  component, not merely a quality one.
- **Geographic**: learner data is regionally resident; the knowledge substrate, assets, and
  policy are globally replicated read-only artifacts. Clean separation, no conflict.

**The real limit** is not compute. It is the human review capacity in the Asset Economy
and the Authoring System — the appreciating half of the content economy has a human in it
by design. Scaling that is an organizational architecture problem (reviewer recruitment,
calibration, tooling, and the ratio of generated-to-reviewed content), and it should be
planned as deliberately as the technical one.

---

## Cross-cutting · Runtime monitoring

Monitoring for a teaching system must watch pedagogy, not only infrastructure. Four
classes, all with defined alerting:

1. **Infrastructure** — latency by stage, error rates, provider health, degradation rung.
2. **Model quality** — capability suite scores tracked continuously against frozen sets,
   to catch a provider silently getting worse; verifier rejection rate by violation class
   (a rising rate is the earliest available signal of model drift).
3. **Pedagogical health** — question-per-turn distribution, recovery trigger rate, gate
   pass rates, time-to-first-teaching-act, repeat-explanation rate, ratio of *give* to
   *ask* moves. These detect the register collapses that destroy teaching quality long
   before any outcome metric moves.
4. **Outcome** — the C-44 hierarchy, cohort-tracked, with regression alerting, and always
   stratified by budget pressure, degradation rung, and learner population so that harm to
   a subgroup cannot hide inside an average.

The most important single monitored quantity: **the distribution of consecutive questions
asked before the system gives something**. It is cheap to compute, it is the signature of
the most common and most damaging failure mode in AI tutoring, and it should be visible on
the first dashboard anyone looks at.
