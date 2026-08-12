# Teaching Blueprint: Normal Approximation (`math.stats.normal-approximation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.normal-approximation` |
| name | Normal Approximation |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.prob.clt`, `math.stats.normal-distribution` |
| unlocks | (none in KG) |
| cross_links | `math.prob.clt` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Bin(n,p) ≈ N(np, np(1−p)) for large n. Poisson(λ) ≈ N(λ,λ) for large λ. Continuity correction: P(X≤k)=P(X≤k+0.5) improves approximation for discrete distributions.

 |

## Component 1 — Learning Objectives

- LO1: Apply the NORMAL APPROXIMATION to the BINOMIAL — $\text{Bin}(n,p)\approx N(np,np(1-p))$ for LARGE $n$ — using mean $np$ and variance $np(1-p)$ as the approximating normal distribution's parameters.
- LO2: Apply the NORMAL APPROXIMATION to the POISSON — $\text{Poisson}(\lambda)\approx N(\lambda,\lambda)$ for LARGE $\lambda$ — recognizing this uses the SAME mean and variance value $\lambda$ (a special Poisson property, since a Poisson distribution's mean equals its variance).
- LO3: Apply the CONTINUITY CORRECTION $P(X\le k)\approx P(Y\le k+0.5)$ (using the continuous normal $Y$ to approximate the discrete $X$) — recognizing this correction genuinely IMPROVES the approximation's accuracy, and that OMITTING it (or applying it in the wrong direction, e.g. for $P(X\ge k)$ vs. $P(X\le k)$) systematically biases the approximate probability.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.clt` (the Central Limit Theorem, the deep justification for why these approximations work) and `math.stats.normal-distribution` (the approximating distribution itself).

## Component 3 — Core Explanation

For LARGE $n$, a Binomial distribution can be APPROXIMATED by a normal distribution: $\text{Bin}(n,p)\approx N(np,np(1-p))$ — using the binomial's own MEAN ($np$) and VARIANCE ($np(1-p)$) as the approximating normal's parameters. This approximation is a direct consequence of the Central Limit Theorem (`math.prob.clt`), since a binomial random variable can be viewed as a SUM of many independent Bernoulli trials.

Similarly, for LARGE $\lambda$, a Poisson distribution can be approximated: $\text{Poisson}(\lambda)\approx N(\lambda,\lambda)$ — notably using the SAME value $\lambda$ for BOTH mean and variance, reflecting the Poisson distribution's own special property that its mean always equals its variance.

Because the BINOMIAL and POISSON are DISCRETE distributions (taking only integer values) while the NORMAL is CONTINUOUS, a **continuity correction** improves the approximation's accuracy: $P(X\le k)\approx P(Y\le k+0.5)$ (extending the boundary by 0.5 to better "cover" the discrete probability mass at exactly $k$ using the continuous distribution). This correction genuinely matters — omitting it, or misapplying its DIRECTION (adding vs. subtracting 0.5, depending on whether the inequality is $\le$, $<$, $\ge$, or $>$), systematically biases the resulting approximate probability.

## Component 4 — Worked Examples

**Example 1 (LO1 — binomial normal approximation, breaking MC-1)**: Approximate $\text{Bin}(100,0.5)$ with a normal distribution, stating the mean and variance. Mean $=np=100(0.5)=50$. Variance $=np(1-p)=100(0.5)(0.5)=25$ (standard deviation $=5$). A common error uses $p$ or $n$ ALONE as the approximating normal's mean or variance (e.g. mistakenly using just $p=0.5$ as the mean, forgetting to multiply by $n$) — the approximating normal's parameters are specifically $np$ (mean) and $np(1-p)$ (variance), reproducing the binomial's OWN mean and variance exactly, not simplified or partial versions of the formula.

**Example 2 (LO2 — Poisson approximation using the same λ for both parameters)**: Approximate $\text{Poisson}(50)$ (large $\lambda=50$) with a normal distribution. Mean $=50$, variance $=50$ (standard deviation $=\sqrt{50}\approx7.07$) — using the SAME value $\lambda=50$ for BOTH parameters, reflecting the Poisson's characteristic mean-equals-variance property.

**Example 3 (LO3 — applying the continuity correction correctly, breaking MC-2)**: Approximate $P(X\le30)$ for $X\sim\text{Bin}(100,0.3)$ (mean $=30$, variance $=21$, std dev $\approx4.58$) using the normal approximation WITH continuity correction. $P(X\le30)\approx P(Y\le30.5)$ where $Y\sim N(30,21)$ — computing $z=\frac{30.5-30}{4.58}\approx0.109$, giving $P(Z\le0.109)\approx0.543$. A common error OMITS the continuity correction entirely (computing $P(Y\le30)$ directly, using $z=0$ exactly, giving $P(Z\le0)=0.5$ — a noticeably different, less accurate approximation) — the $+0.5$ adjustment genuinely improves accuracy for this discrete-to-continuous approximation and shouldn't be skipped.

## Component 5 — Teaching Actions

### Teaching Action A01 — Approximating Normal Parameters Are np and np(1-p) Exactly, Not Simplified Versions (Primitive P64: Conceptual Shift)

Work Example 1, explicitly computing both parameters using the full formulas.

- **MC-1 hook**: check whether the full $np$ and $np(1-p)$ formulas are used, not a simplified or partial substitute.

### Teaching Action A02 — Poisson's Mean-Equals-Variance Property Carries into Its Approximation (reused procedure)

Present Example 2, explicitly connecting the Poisson's own property to the approximation's parameters.

### Teaching Action A03 — The Continuity Correction Improves Accuracy and Shouldn't Be Skipped (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the corrected and uncorrected approximation results.

- **MC-2 hook**: this directly targets MC-2 (omitting the continuity correction or misapplying its direction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State the mean and variance of the normal approximation to $\text{Bin}(200,0.4)$.
  2. State the mean and variance of the normal approximation to $\text{Poisson}(75)$.
  3. Using the continuity correction, approximate $P(X\ge20)$ for $X\sim\text{Bin}(50,0.3)$ (mean 15, variance 10.5).
  4. Explain, in one sentence, why the continuity correction is needed when approximating a discrete distribution with a continuous one.
- **P76 (Transfer Probe, mode = independence)**: "A call center receives an average of 120 calls per hour (modeled as Poisson with $\lambda=120$, a large value), and a manager wants to estimate the probability of receiving fewer than 100 calls in a given hour without computing the exact Poisson probabilities directly. (a) Explain why a normal approximation is appropriate here, given the large $\lambda$. (b) Set up (but do not fully evaluate) the normal approximation calculation, including the continuity correction, for $P(X<100)$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | APPROXIMATING-NORMAL-PARAMETERS-SIMPLIFIED-OR-PARTIALLY-COMPUTED | Using a simplified or partial version of the np/np(1-p) formulas for the approximating normal's mean and variance, rather than the full correct computation | Foundational |
| MC-2 | CONTINUITY-CORRECTION-OMITTED-OR-APPLIED-IN-THE-WRONG-DIRECTION | Omitting the continuity correction entirely, or applying its +0.5/-0.5 adjustment in the wrong direction for the given inequality type | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Approximating Normal Parameters Simplified or Partially Computed") → P41 (detect: present Example 1 and check whether the full $np$/$np(1-p)$ formulas are used) → P64 (conceptual shift: re-derive both parameters explicitly from the binomial's own mean and variance formulas).
- **B02 (targets MC-2)**: P27 ("Continuity Correction Omitted or Applied in the Wrong Direction") → P41 (detect: present Example 3 and check whether the correction is applied, and in the correct direction) → P64 (conceptual shift: re-apply the correction explicitly, confirming the +0.5 direction matches the specific inequality type).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.clt`, `math.stats.normal-distribution`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.prob.clt`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this is a fairly direct application once the underlying CLT justification and normal distribution mechanics are solid.
- MC-1 was ranked Foundational because it produces a genuinely wrong approximating distribution, while MC-2 was ranked Moderate since omitting the correction still produces a REASONABLE (if slightly less accurate) approximation, rather than a wildly wrong one.
- The call-center-Poisson transfer probe was deliberately chosen because approximating a large-λ Poisson process is a genuinely practical operations-research application, motivating the approximation's real computational convenience over exact Poisson calculation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.prob.clt`, `math.stats.normal-distribution`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.prob.clt`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
