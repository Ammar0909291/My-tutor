# Outcome Science Framework (OSF)

**Document class:** Scientific measurement specification — the framework by
which My Tutor proves, with clinical-trial-grade rigor, that Tutor Max
improves learning; and the loop by which that proof improves Tutor Max.
**Status:** SPECIFICATION — design only. No runtime code. No modification to
the frozen stack (`EOS_V2_ARCHITECTURE.md`, `EOS_V2_RUNTIME_SPECIFICATION.md`,
`EDUCATIONAL_BRAIN_COMPILER.md`, CEKR, `educational-brain/`). Implementation
remains G2-gated.
**Version:** 1.0.0. **Normative language:** RFC 2119.

**Grounding rule:** every metric in this document is operationally defined in
terms of evidence the frozen Runtime Specification already commits per turn
(RS §2.3 event catalog, decision provenance, latency instrumentation,
rev-level asset attribution via CEKR §13). A measurement framework that
requires instruments the system does not capture is fiction; this one
measures what the machine already writes down.

---

## Table of Contents

0. The scientific stance
1. The measurement substrate (what is already captured)
2. Learning outcome metrics (16 constructs, operational definitions)
3. Educational experimentation (designs and their legality)
4. Causal attribution
5. The evidence hierarchy and evidence lifecycle
6. Policy evolution protocol (when teaching changes)
7. The Brain improvement loop (assets, analogies, misconceptions, hints)
8. Scientific validity and bias control
9. The research pipeline (learner → discovery → Brain → Compiler → Kernel)
10. Ethics, privacy, and consent
11. Reporting standards (internal and peer-review grade)
12. Implementation roadmap · research roadmap · risks · unresolved questions

---

## 0. The Scientific Stance

- **OS-1 — Outcomes over engagement.** The product optimizes verified
  learning (EOS law L5). Engagement metrics are *diagnostics*, never
  objectives; any experiment whose winning arm improves engagement while
  flattening learning is a failed arm.
- **OS-2 — Pre-registration.** Every experiment declares hypothesis, primary
  outcome, analysis plan, sample plan, and stopping rule BEFORE launch, in a
  versioned registry. Post-hoc discoveries are hypothesis-generating, never
  confirmatory.
- **OS-3 — The counterfactual question is mandatory.** "Learning occurred" is
  meaningless without "compared to what." Every claim names its comparator
  (§3, §4).
- **OS-4 — Educational significance ≥ statistical significance.** Every
  pre-registration declares a minimum educationally meaningful effect (MEE)
  in construct units (e.g. +0.2 concepts-anchored/week, −15% misconception
  regrowth). Statistically significant effects below MEE do not change
  policy.
- **OS-5 — Asymmetric caution.** Changes that could harm learners require
  stronger evidence than changes that could only help (mirrors EOS L7).
  Recovery, affect, and young-learner policies sit in a protected class with
  elevated evidence bars and human review.
- **OS-6 — Honesty about instruments.** Every metric carries its instrument's
  known error profile (sensor precision/recall, RS §3); effect sizes are
  reported with measurement error acknowledged, not laundered.
- **OS-7 — No p-hacking by architecture.** The analysis engine computes the
  pre-registered analysis; exploratory queries run in a separate, labeled
  workspace whose outputs cannot gate policy directly.

---

## 1. The Measurement Substrate

What the frozen stack already writes per learner (the OSF adds NO new
runtime instrumentation in v1 — it adds analysis):

| Already captured (RS §2.3) | Science it enables |
|---|---|
| AnswerObserved (correct × latency-vs-baseline × stated confidence × scaffold level × hint debt × stage) | learning curves, fluency, calibration, hint-adjusted evidence strength |
| ForgettingProbeResult (recalled × gap × cued) | retention curves, savings, per-learner forgetting rates |
| TransferEvent components in MasteryCertified | transfer measurement at declared surface distances (CEKR TransferConditions) |
| MisconceptionDetected / MisconceptionRepairStep / regrowth probes | misconception epidemiology: incidence, repair efficacy, regrowth |
| RecoveryEntered/Exited + next-turn outcome join | recovery efficacy per script per state |
| DecisionRecorded (full rule path, pack version, seed) | policy evaluation, counterfactual replay, attribution |
| TeachingActionSelected + ASSET ids at CEKR rev level | per-asset, per-analogy, per-explanation outcome tables |
| Session boundaries, abandonment, failure-then-vanish flags | persistence, churn-linked-to-teaching signals |
| CalibrationSampled | confidence calibration curves |
| LoadSignatureDetected | overload rates per plan shape |
| OutputRejected / TemplateFallbackUsed | delivery-quality covariates (a confounder to control, §8) |
| Pack version pinned per session | clean version-cohort definition |

**The unit ledger.** OSF defines three analysis units, never conflated:
**exposure** (one asset/action served), **episode** (one concept process),
**learner** (longitudinal). Clustering is respected: exposures nest in
episodes nest in learners nest in cohorts — all standard errors MUST be
cluster-robust or multilevel (§8).

---

## 2. Learning Outcome Metrics

Each construct: operational definition → instrument → known threats.

| # | Construct | Operational definition (v1) |
|---|---|---|
| 1 | **Immediate learning** | P(correct, unaided, hint-debt-free) on same-session post-items minus matched pre/placement baseline, per concept |
| 2 | **Delayed learning** | same, on items ≥ cfg:mastery.minGapDays later (the gate's delayed component) — the PRIMARY learning outcome; immediate learning alone is explicitly NOT accepted as learning (performance ≠ learning, the classic trap) |
| 3 | **Long-term retention** | per-concept recall probability curve from ForgettingProbeResults; summary: fitted half-life; population summary: median half-life per concept per teaching variant |
| 4 | **Transfer** | success rate on TransferCondition items at declared surface distance, ≥1 distance band from training surfaces; near/far reported separately, never pooled |
| 5 | **Automaticity** | fluency-gate attainment: latency ≤ 1.25× personal baseline AND correct AND unhesitant, ×3 (RS) — reported as time-to-automaticity and attainment rate |
| 6 | **Conceptual understanding** | composite, reported unbundled: own-words restatement success (NAME gate), boundary-case judgment items, misconception-probe cleanliness. No single number; a profile |
| 7 | **Problem solving** | multi-step item success with scaffold level 4 (solo), stage ≥5, decomposed by error locus (schema selection vs execution — from item structure) |
| 8 | **Reasoning** | quality-coded self-explanations and why-probes (rubric-scored items; deterministic rubrics where possible, human/panel-scored samples otherwise — instrumented honestly as such) |
| 9 | **Confidence calibration** | Brier-style calibration score over CalibrationSampled; target is calibration, not confidence height (per student-state/04) |
| 10 | **Cognitive load** | overload-signature rate per exposure, conditioned on plan element count; proxy measure, labeled as proxy |
| 11 | **Motivation** | behavioral only: voluntary return rate, voluntary session extension, curiosity-question rate. Self-report surveys optional and separate. Never an objective (OS-1) |
| 12 | **Frustration** | recovery-entry rate per hour, failure-spiral incidence, override rate ("I'm fine") |
| 13 | **Persistence** | struggle-continuation rate (post-failure next-turn engagement), failure-then-vanish rate (the churn signature), comeback rate after failure sessions |
| 14 | **Time-to-mastery** | active learning time from concept process start to ANCHORED certification; reported per concept with capability-profile stratification (raw pooled time-to-mastery is a selection-bias machine — §8) |
| 15 | **Teaching efficiency** | concepts-anchored per active learning hour, stratified as above; the headline SYSTEM metric |
| 16 | **Teaching cost** | tokens + compute + human-review minutes per anchored concept — the denominator of the business case, kept OUT of teaching-policy objective functions (cost pressure must never silently shape pedagogy; cost-motivated changes go through the same outcome gates as any change) |

**Composite indices are forbidden as gates.** Any policy gate names specific
constructs. (A single "learning score" invites Goodharting the composite.)

---

## 3. Educational Experimentation

### 3.1 Assignment machinery
The frozen stack provides the levers: pack **cohort overlays** (EBC §5.5)
assign policy variants; session pack-pinning gives clean exposure windows;
DecisionRecorded gives per-turn arm provenance. Randomization unit default:
**learner** (not session, not turn) — teaching effects contaminate across
turns within a learner; turn-level randomization is legal only for
turn-local, memoryless questions (e.g. phrasing A/B of one script), declared
as such in pre-registration.

### 3.2 The design ladder (choose the weakest sufficient design)
1. **Offline replay (counterfactual, zero learner risk).** Candidate policy
   re-runs recorded evidence logs (RS T-4 machinery): where decisions differ,
   outcomes are NOT observable — replay answers *what would change and how
   often*, bounding blast radius, never estimating effects. Mandatory first
   step for every policy change.
2. **Simulation (persona automata, RS T-5).** Effect direction under modeled
   learners; a gate, not evidence about humans.
3. **A/B (two-arm RCT).** The confirmatory workhorse. Learner-randomized,
   pre-registered, MEE-powered, stratified by (ageBand, subject, capability
   profile band, prior-mastery band).
4. **Multi-arm bandits.** Legal ONLY for asset-level selection among
   already-safety-cleared variants (which of 4 approved analogies), with:
   propensity logging mandatory (every serve records P(arm) — enabling
   unbiased off-policy analysis via inverse propensity weighting), floor
   probabilities (no arm below ε — preserves identifiability and protects
   against premature convergence on noise), and exclusion from the protected
   class (§0 OS-5: recovery/affect content never bandit-allocated).
5. **Stepped-wedge / phased rollout.** For infrastructure-flavored changes
   where simultaneous A/B is impractical; time-effects modeled explicitly.
6. **Observational + adjustment.** For questions randomization can't touch
   (long-horizon retention across years); estimates labeled OBSERVATIONAL,
   never gate-grade alone.

### 3.3 Named comparisons
- **Version comparison:** pack semver vs predecessor on the metric battery,
  learner-randomized where possible, else regression-discontinuity on
  activation date with cohort controls.
- **Teacher comparison (policy-vs-policy):** two Brain policy variants =
  two "teachers"; the ADR metric (share of un-provenanced decisions) is a
  covariate — comparisons are only clean between equally-deterministic
  systems.
- **Human vs AI:** supported as an external-comparator protocol (matched
  curriculum units, shared item banks, delayed+transfer outcomes,
  pre-registered) — flagged honestly: full randomization of human tutoring
  is usually infeasible; expect matched-cohort designs with declared
  limitations. This is the peer-review flagship study class (§12 research
  roadmap R3).

---

## 4. Causal Attribution

**The problem:** thousands of micro-decisions per learner; outcomes arrive
delayed; naive per-action correlation is guaranteed to lie (actions are
chosen BECAUSE of learner state — confounding by indication, the same
problem medicine has).

**The OSF attribution stack (weakest→strongest):**
1. **Decision-consequence join (L5).** Turn N's DecisionRecorded joined to
   turn N+1..k outcomes — descriptive; hypothesis generation only.
2. **Propensity-based off-policy estimation.** Because DECIDE is
   deterministic given state (L2), the "propensity" of an action is 1 —
   which kills naive IPW. Attribution therefore requires *deliberate
   exploration*: the bandit floors (§3.2) and seeded tie-break variation
   (RS C-7 PRNG) are the injected randomness that makes causal estimation
   possible at the action level. Where the kernel had no choice (legality
   left one action), no attribution is claimed — "forced moves teach us
   nothing about alternatives" is a reported category, not a gap to paper
   over.
3. **Micro-randomized trials (MRT).** For within-episode questions
   (hint-now vs teach-now at a stuck point), the policy table itself carries
   a pre-registered randomization cell (a policy-pack construct: a rule whose
   effect is a seeded random choice between two declared effects, logged with
   probability). This is how "which teaching action caused it" gets a real
   answer: local randomization at the decision point, proximal outcomes
   (next-k-turn success, episode completion), causal excursion effects.
4. **Instrumented natural experiments.** Pack activations, content arrival
   order, capacity throttles — analyzed with standard quasi-experimental
   designs, labeled as such.

**Attribution honesty rules:** effects attribute to the *decision*, not the
renderer's phrasing, unless phrasing was the randomized unit; asset-level
effects attribute to CEKR rev (rev-skew rule, CEKR §13); "which misconception
disappeared" = repair-sequence completion + delayed disguised re-probe
cleanliness + regrowth-free interval — never same-session claims (the frozen
never-certify-same-session rule is also a measurement rule).

---

## 5. The Evidence Hierarchy and Lifecycle

**Hierarchy (gate-grade descending):**
- **E1** Pre-registered learner-randomized experiment meeting MEE + power.
- **E2** Pre-registered MRT / bandit with propensity logging.
- **E3** Replicated quasi-experiment (stepped-wedge, discontinuity).
- **E4** Adjusted observational with negative-control checks.
- **E5** Descriptive joins, exploratory findings, simulation results.
- **E6** Authored expert judgment (the Brain's priors — where everything
  starts; the whole framework exists to upgrade E6 claims to E1–E3).

**Evidence objects.** Every finding is an **EvidenceClaim** {claim, construct,
comparator, effect size + CI, tier, pre-registration ref, cohort scope,
analysis version, data window} — versioned documents feeding CEKR
EvidenceSummary snapshots (CEKR §2.2 #29) so effectiveness knowledge is
provenance-carrying knowledge like everything else.

**Accumulation & conflict:** claims about the same (entity, construct,
population) accumulate via fixed/random-effects meta-analysis across cohorts
(cross-school, cross-country = moderator variables, not pooled blindly —
heterogeneity Q/I² reported; an analogy that works in one language/culture
and fails in another is a *finding*, recorded as scoped claims).
Contradictory claims at equal tier → CONFLICT state (mirrors CEKR Conflict
nodes): triggers a designed tie-breaker study or an ACCEPTED_SCOPED
resolution (works-for-X-not-Y). Weak evidence (E4–E6) may tune Band-5/6
priors; only E1–E3 may change Band 0–4 policy (this line is the constitution
of the whole framework).

---

## 6. Policy Evolution Protocol

**When may teaching policy change?** A pack change gates on:
1. Class of change → evidence bar:
   - Protected class (recovery, affect, lesson-one, young learners):
     E1/E2 + human pedagogy review + no-harm margin on frustration and
     persistence metrics (not just neutrality on the primary outcome).
   - Standard pedagogy (Band 3–4 content/tables): E1–E3.
   - Selection/personalization (Band 5–6): E2 bandit evidence sufficient.
   - Thresholds within declared safeRanges: E3+ with regression monitoring.
2. **Simulation gate + replay diff** pass (frozen EBC/RS machinery) — always,
   regardless of evidence tier.
3. **Guardrail battery:** a candidate must not regress any guardrail metric
   (frustration rate, failure-then-vanish, calibration, protected-class
   outcomes) beyond pre-declared non-inferiority margins — a change that
   improves speed while burning persistence loses.
4. **Canary rollout:** cohort ramp (e.g. 5%→25%→100%) with sequential
   monitoring (alpha-spending — peeking is planned, not sinful) and
   auto-halt triggers on guardrail breach.
5. **Rollback:** packs are immutable data — rollback = re-activating the
   prior version at next session boundary (RS I-20); rollback is a
   one-decision, no-deploy act, rehearsed in CI.
6. **Regression detection (steady state):** every pack version carries its
   metric battery baseline; scheduled monitors compare live cohorts against
   baseline with change-point detection; sustained regression files an
   incident + candidate rollback.

---

## 7. The Brain Improvement Loop

The closed loop, entity class by entity class (all effects at CEKR rev
granularity; all changes flow through authoring → CEKR → Compiler → packs —
evidence never mutates content directly):

| Entity | Improvement mechanism | Retirement trigger |
|---|---|---|
| **Explanations** | ranked by delayed-outcome deltas within (concept, register, ageBand) strata (E2 bandit); low performers flagged to authoring with their failure profile (WHERE they fail: which stratum, which prior-misconception state) — "which explanation failed" gets an answer with a reason | persistent underperformance vs siblings at adequate n → DEPRECATED (ADR-14 lifecycle), never deleted |
| **Analogies** | outcome tables + misconception-birth surveillance: elevated downstream incidence of a BREEDS-linked misconception among learners served analogy A is the retirement alarm the anti-analogy law waits for | birth-rate elevation confirmed at E2/E3 → retire + record a Revision explaining why (institutional memory against re-introduction) |
| **Misconception knowledge** | epidemiology: incidence by birth type, detection precision of phrase automata (probe-confirmed vs phrase-flagged), repair efficacy per collision case, regrowth curves | a collision case with high burn rate (recognized, not felt) → flagged; birth-type hypotheses corrected by evidence |
| **Hints** | ladder-level outcomes: post-hint unaided success (not just next-step success — a hint that produces answers without learning shows up in the delayed data), hint-debt→gate-failure correlation | step hints that function as answer delivery (high immediate, null delayed) → demoted/reauthored |
| **Recovery scripts** | RecoveryExited next-turn joins + what-restores accumulation per failure state × persona band | scripts with inferior re-engagement at n → replaced; per-learner what-restores stays personalization, population patterns become authored variants |
| **Assessment items** | psychometrics: difficulty, discrimination, distractor functioning (does each SIGNALS distractor actually attract its misconception holders?), differential item functioning across languages/cultures (a fairness gate, §8) | non-discriminating or DIF-flagged items → REVIEW |
| **Capability model** | prerequisite-edge validation: P(success on X | Y state) tables test authored capability DAG edges; population priors (P(root=NO|multiply=NO)) fitted for cold-start; misattribution audits via diagnostic-item cross-checks | edges the data contradicts → Conflict node + review (data proposes, humans dispose — the DAG is authored knowledge, evidence-audited) |
| **Policy tables** | §6 protocol; the D1-grid thresholds, budgets, and matrix cells become evidence-fitted parameters within authored structure (the "Brain v3" shape from the EOS spec) | — |

---

## 8. Scientific Validity and Bias Control

- **Power & minimum samples.** Pre-registration computes n from MEE, ICC
  (clustering!), and outcome variance; standing guidance published per
  construct (delayed learning is high-variance: expect hundreds of learners
  per arm, not dozens; asset bandits converge faster on proximal outcomes but
  MUST be delayed-outcome-audited before any retirement decision). No
  experiment launches unpowered — an unpowered "trial" is noise generation
  with extra steps.
- **Selection bias.** Learners select subjects, times, and persistence.
  Controls: randomize within-eligible populations; intention-to-treat as the
  primary analysis (dropouts count — a policy that teaches survivors
  brilliantly and drives others away must lose); attrition reported per arm
  with differential-attrition tests.
- **Survivorship bias.** Time-to-mastery and retention conditioned on
  completers are survivor metrics — always paired with completion rates;
  failure-then-vanish is a first-class outcome precisely to keep the
  vanished in the denominator.
- **Measurement bias.** Sensor error profiles (RS) enter as measurement
  models; item DIF audits across languages/cultures/ageBands; rubric-scored
  constructs double-scored on samples with agreement reported.
- **AI bias.** Two distinct risks, named separately: (a) sensor bias —
  classifier accuracy varying by learner language/phrasing culture → per-
  population sensor audits with labeled samples; (b) renderer bias — register
  and warmth varying by inferred demographics → verifier-side audits on
  matched RenderPlans. Both are standing audits, not one-time checks.
- **Teacher bias (in comparisons).** Human-comparison studies control for
  expectancy effects where possible (blind outcome scoring; shared item
  banks; outcomes scored by parties blind to arm).
- **Novelty/Hawthorne effects.** Version comparisons discount the first k
  sessions post-switch or model novelty explicitly.
- **Multiple comparisons.** The metric battery is large by design;
  gate decisions use only pre-registered primaries; secondaries are FDR-
  controlled and labeled.
- **Construct validity drift (Goodhart).** Any metric used as a gate gets a
  paired "dark twin" audit metric it could be gamed against (e.g.
  time-to-mastery ↔ regrowth rate; immediate learning ↔ delayed learning);
  divergence between twins is itself an alarm.

---

## 9. The Research Pipeline

How every learner anonymously improves Tutor Max:

```
Learner turns (instrumented by the frozen runtime)
  → Evidence log (pseudonymous ids, PII-redacted at ingest)
    → Research Data Layer: de-identified, k-anonymity-thresholded extracts;
      cohort aggregates; NO verbatim text leaves the redaction boundary
      → Analysis Engine: pre-registered analyses + exploratory workspace
        → EvidenceClaims (versioned, tiered)
          → CEKR EvidenceSummary snapshots  ──────────────┐
          → Authoring queue: findings become Brain        │
            revisions (new collision cases, retired        │ the loop
            analogies, retuned tables) with Revision       │ closes
            provenance citing the EvidenceClaim            │
            → Brain Compiler → policy packs → EOS kernel ──┘
              → new evidence, next cycle
```

Rules: aggregation thresholds before any cross-learner statistic ships
(min-n per cell); geographic/school-level analyses at coarse granularity;
discoveries enter the Brain ONLY as authored revisions citing EvidenceClaims
(humans in the loop; the pipeline proposes, authors dispose, the compiler
verifies, the kernel executes) — which is exactly the AI-independence
property extended to statistics: if the analysis engine vanished, the Brain
retains every incorporated finding as cited, versioned knowledge.

## 10. Ethics, Privacy, and Consent

- **Minors:** verbatim capture remains owner-gated (standing decision);
  redaction-by-default at ingest; guardian-facing transparency surfaces.
- **Consent tiers:** product improvement analytics (ToS-level) vs research
  publication (explicit opt-in cohorts); external publication uses only the
  opt-in stratum.
- **Equipoise:** arms must be genuinely plausible-best; no arm may be a
  known-worse teaching condition ("no-recovery control" is unethical and
  forbidden — comparators are best-known-practice, mirroring clinical
  active-comparator norms).
- **Stopping for benefit/harm:** sequential monitoring stops trials early
  on decisive results in either direction; harmed cohorts are remediated
  (extra review episodes on affected concepts).
- **Review:** an internal research-ethics checklist per pre-registration;
  external IRB partnership before any peer-reviewed human-subjects
  publication.

## 11. Reporting Standards

- Internal: every gate decision publishes its EvidenceClaim bundle (effect,
  CI, tier, guardrails, attrition) — decisions are auditable documents.
- Peer-review grade: pre-registration public (OSF-style), CONSORT-style
  flow diagrams for RCTs, de-identified analysis datasets per the consent
  tier, analysis code versioned. The system's determinism (replayable
  decisions, pack pinning) makes it unusually reproducible for education
  research — that reproducibility is the scientific selling point.

---

## 12. Roadmaps, Risks, Unresolved Questions

**Implementation roadmap (G2-gated):**
- **OSF-M0** Ratify; publish the metric battery + operational definitions as
  the standing reference; pre-registration registry (a docs/process, no
  runtime).
- **OSF-M1** Research Data Layer: redaction boundary, pseudonymization,
  cohort extract jobs over the existing evidence tables.
- **OSF-M2** Analysis engine v1: learning curves, retention fits,
  per-asset outcome tables, guardrail monitors; EvidenceClaim registry.
- **OSF-M3** Experiment machinery: cohort overlays wired to assignment,
  propensity logging, canary + rollback drills, sequential monitors.
- **OSF-M4** MRT cells in policy packs (the randomization-rule construct) —
  the causal attribution unlock.
- **OSF-M5** CEKR EvidenceSummary loop + authoring-queue integration (joint
  with CEKR-M5).

**Research roadmap:**
- **R1** Baseline observational atlas: learning/retention/misconception
  epidemiology across current subjects (E4–E5; the descriptive foundation).
- **R2** First confirmatory RCT: worked-example-first policy vs prior policy
  (already runtime-toggleable) on delayed learning + persistence.
- **R3** Flagship external study: Tutor Max vs matched conventional
  instruction, delayed + transfer outcomes, opt-in cohort, IRB-partnered.
- **R4** Misconception repair science: collision-case efficacy MRTs — the
  first genuinely novel contribution candidate (repair-at-scale data exists
  nowhere else).
- **R5** Cross-language/cross-culture moderator studies (analogies, items,
  registers).

**Risks:** (1) small-n reality vs this framework's ambitions — most cells
will be underpowered for years; the framework's own discipline (tiers,
no-unpowered-trials) must be applied to itself, with E5/E6 humility as the
default state; (2) metric gaming pressure as the org grows (OS-1 and dark-
twin audits are the constitutional defenses; they need governance teeth);
(3) privacy incidents would poison the entire pipeline — the redaction
boundary is safety-critical infrastructure; (4) analysis-engine bugs
masquerading as findings — analysis code needs the same testing rigor as the
kernel (golden datasets with known planted effects).

**Unresolved questions:** the MEE table per construct (needs pilot variance
data — R1 feeds it); rubric-scored reasoning at scale (deterministic rubrics
vs human panels vs — carefully — model-assisted scoring with human
calibration, which reintroduces an AI dependence this framework must then
audit); whether persistence/motivation guardrails need age-specific margins;
the governance body that owns gate decisions (a decision for the owner, not
this document).

**Future milestones:** a standing annual "State of Learning" internal report
generated from the atlas; the first peer-reviewed publication (target: R3 or
R4); eventually, the outcome tables themselves becoming a licensable
evidence asset — the moat, measured.

---

*End of specification v1.0.0. Design only; adoption and every milestone
remain owner decisions under the standing G1/G2 governance rules.*
