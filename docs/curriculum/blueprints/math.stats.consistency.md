# Teaching Blueprint: Consistency of Estimators (`math.stats.consistency`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.consistency` |
| name | Consistency of Estimators |
| domain | Statistics |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.stats.estimator`, `math.prob.convergence-types` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | θ̂ₙ is consistent iff θ̂ₙ →^P θ as n→∞. Sufficient condition: bias→0 and variance→0. By LLN, sample mean is consistent for population mean.

 |

## Component 1 — Learning Objectives

- LO1: Define CONSISTENCY — an estimator $\hat\theta_n$ (indexed by sample size $n$) is consistent if $\hat\theta_n\to^P\theta$ as $n\to\infty$ (converges IN PROBABILITY to the true parameter, from `math.prob.convergence-types`) — a statement about LARGE-SAMPLE behavior, NOT about any single fixed-size sample.
- LO2: Apply the SUFFICIENT condition: if BOTH bias$\to0$ AND variance$\to0$ as $n\to\infty$, then the estimator is consistent — and recognize this is a SUFFICIENT (not necessary) condition, i.e. an estimator could in principle be consistent via a different route, but this bias/variance-both-vanish route is the most common practical check.
- LO3: Recognize the Law of Large Numbers (LLN) directly implies the SAMPLE MEAN is a consistent estimator of the population mean — connecting this abstract definition to a concrete, already-familiar result.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.estimator` (the object being characterized) and `math.prob.convergence-types` (needed for the "converges in probability" definition underlying consistency).

## Component 3 — Core Explanation

An estimator $\hat\theta_n$ is **consistent** for a parameter $\theta$ if $\hat\theta_n\to^P\theta$ as $n\to\infty$ — meaning, as the sample size grows WITHOUT BOUND, the estimator converges IN PROBABILITY to the true parameter value (per `math.prob.convergence-types`'s formal definition). This is fundamentally a LARGE-SAMPLE (asymptotic) property — it says nothing directly about how good the estimator is for any ONE specific, fixed sample size; it's a statement about the LIMITING behavior as $n$ grows.

A commonly-used SUFFICIENT condition for consistency: if BOTH the bias AND the variance of $\hat\theta_n$ approach ZERO as $n\to\infty$, then $\hat\theta_n$ is consistent. This is SUFFICIENT but not the ONLY possible route to consistency (other, less common paths exist too) — but checking "does bias→0 and variance→0?" is the standard practical technique.

The Law of Large Numbers directly implies that the SAMPLE MEAN $\bar{X}_n$ is a consistent estimator of the population mean $\mu$ — this familiar result (large samples' averages get closer to the true mean) is exactly a special case of the general consistency concept.

## Component 4 — Worked Examples

**Example 1 (LO1 — consistency as an asymptotic, not fixed-n, property, breaking MC-1)**: Explain why an estimator being "consistent" doesn't guarantee it's accurate for $n=10$. Consistency describes behavior as $n\to\infty$ — it says the estimator gets ARBITRARILY close to $\theta$ eventually, with high probability, as the sample size grows without bound; it makes NO promise about performance at any SPECIFIC, small, fixed sample size like $n=10$. A common error interprets "consistent" as meaning "accurate for any sample size, including small ones," rather than correctly understanding it as a purely ASYMPTOTIC (large-$n$-limit) guarantee.

**Example 2 (LO2 — checking the sufficient condition, breaking MC-2)**: For an estimator with bias $=\frac{1}{n}$ (which $\to0$ as $n\to\infty$) and variance $=\frac{\sigma^2}{n}$ (which ALSO $\to0$ as $n\to\infty$), conclude the estimator is consistent. Since BOTH bias and variance vanish in the limit, the sufficient condition is satisfied — the estimator is consistent. A common error checks only ONE of the two conditions (e.g. verifying bias$\to0$ alone) and concludes consistency without also verifying variance$\to0$ — BOTH conditions must hold together for this sufficient condition to apply; checking only one is incomplete.

**Example 3 (LO3 — sample mean's consistency via LLN)**: Explain why the sample mean $\bar{X}_n$ is a consistent estimator of the population mean $\mu$, connecting to the Law of Large Numbers. The LLN states that $\bar{X}_n\to^P\mu$ as $n\to\infty$ — this IS exactly the definition of consistency, applied to the specific case of the sample mean estimating the population mean; the sample mean's consistency isn't a separate fact requiring independent proof, but a direct restatement of the LLN in this framework's vocabulary.

## Component 5 — Teaching Actions

### Teaching Action A01 — Consistency Is an Asymptotic Property, Not a Fixed-n Accuracy Guarantee (Primitive P64: Conceptual Shift)

Work Example 1, explicitly emphasizing the large-$n$-limit nature of the definition.

- **MC-1 hook**: check whether consistency is correctly understood as an asymptotic (not fixed-sample-size) property.

### Teaching Action A02 — Checking Both Bias→0 AND Variance→0 Together (Primitive P06: Contrast Pair)

Work Example 2, explicitly verifying BOTH conditions of the sufficient criterion.

- **MC-2 hook**: this directly targets MC-2 (checking only one of the two required conditions for the sufficient consistency criterion).

### Teaching Action A03 — Sample Mean's Consistency as a Direct LLN Restatement (reused procedure)

Work Example 3, explicitly connecting the abstract consistency definition to the already-familiar LLN.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain, in one sentence, what it means for an estimator to be "consistent."
  2. For an estimator with bias $\to0$ but variance approaching a NONZERO constant as $n\to\infty$, determine whether the sufficient condition for consistency is satisfied, and justify.
  3. Explain why the sample mean's consistency is a direct consequence of the Law of Large Numbers.
  4. Explain why consistency alone does not guarantee an estimator is accurate for a small sample size like $n=5$.
- **P76 (Transfer Probe, mode = independence)**: "A quality-control engineer at a manufacturing plant uses an estimator for the average defect rate, based on inspecting a sample of products, and is told the estimator is 'consistent.' (a) Explain what this consistency property does and does NOT guarantee about the estimator's accuracy for a specific small daily sample of 20 products. (b) Explain what would need to be true about the estimator's bias and variance as the daily sample size grows, for this consistency property to hold via the standard sufficient condition."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONSISTENCY-INTERPRETED-AS-A-FIXED-SAMPLE-SIZE-ACCURACY-GUARANTEE | Interpreting "consistent" as meaning the estimator is accurate for any sample size, rather than correctly understanding it as a purely asymptotic (large-n-limit) property | Foundational |
| MC-2 | ONLY-ONE-OF-BIAS-OR-VARIANCE-CONDITIONS-CHECKED-FOR-THE-SUFFICIENT-CRITERION | Checking only bias→0 or only variance→0, rather than verifying both conditions together as the sufficient criterion requires | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Consistency Interpreted as a Fixed Sample Size Accuracy Guarantee") → P41 (detect: present Example 1 and check whether consistency is (incorrectly) taken to guarantee small-sample accuracy) → P64 (conceptual shift: re-state the formal definition explicitly, emphasizing the $n\to\infty$ limit).
- **B02 (targets MC-2)**: P27 ("Only One of Bias or Variance Conditions Checked for the Sufficient Criterion") → P41 (detect: present Example 2 and check whether only one condition is verified) → P64 (conceptual shift: re-check both bias and variance limits explicitly and separately before concluding consistency).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.estimator`, `math.prob.convergence-types`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.estimator`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept is primarily a definitional and connective one, linking to already-established convergence and LLN ideas.
- Both misconceptions were ranked Foundational because each reflects a genuine misunderstanding of what the property actually claims, not a minor computational slip.
- The quality-control transfer probe was deliberately chosen because distinguishing "works well eventually with more data" from "works well right now with today's small sample" is a genuinely important practical distinction in real statistical practice.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.estimator`, `math.prob.convergence-types`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
