# Teaching Blueprint: Maximum Likelihood Estimation (`math.stats.mle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.mle` |
| name | Maximum Likelihood Estimation |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.stats.estimator`, `math.calc.derivative-rules`, `math.prob.pdf` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Chooses θ̂ = argmax L(θ|data) where L(θ) = ∏f(xᵢ|θ) is the likelihood. Maximized by setting the score (∂log L/∂θ) to zero. MLEs are consistent, asymptotically normal, and asymptotically efficient.

 |

## Component 1 — Learning Objectives

- LO1: Construct the LIKELIHOOD function $L(\theta)=\prod_i f(x_i|\theta)$ (the PRODUCT of the density/probability function evaluated at each observed data point, treated as a function of the unknown parameter $\theta$) — and choose $\hat\theta=\text{argmax}_\theta L(\theta)$, the value MAXIMIZING this function.
- LO2: Apply the LOG-LIKELIHOOD trick — maximize $\log L(\theta)=\sum_i\log f(x_i|\theta)$ instead of $L(\theta)$ directly — recognizing this is VALID because $\log$ is a MONOTONICALLY INCREASING function (so the MAXIMIZING $\theta$ is identical for $L$ and $\log L$), while converting a PRODUCT into a much more tractable SUM for differentiation.
- LO3: Find the MLE by setting the SCORE $\frac{\partial\log L}{\partial\theta}=0$ and solving — and recognize MLEs have three important large-sample properties: they are CONSISTENT, ASYMPTOTICALLY NORMAL, and ASYMPTOTICALLY EFFICIENT (achieving the lowest possible variance among consistent estimators, in the large-sample limit).

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.estimator` (the general estimation framework), `math.calc.derivative-rules` (needed to maximize the log-likelihood), and `math.prob.pdf` (the density function $f(x|\theta)$ used to build the likelihood).

## Component 3 — Core Explanation

**Maximum Likelihood Estimation (MLE)** chooses the parameter value $\hat\theta$ that MAXIMIZES the **likelihood function** $L(\theta)=\prod_{i=1}^n f(x_i|\theta)$ — the product of the density (or probability mass) function evaluated at each independently observed data point, viewed as a function of the UNKNOWN parameter $\theta$ (with the data $x_i$ held fixed).

Directly maximizing a PRODUCT of many terms is often algebraically awkward (especially for differentiation). The standard trick: maximize the **log-likelihood** $\log L(\theta)=\sum_i\log f(x_i|\theta)$ INSTEAD — this is VALID because $\log$ is MONOTONICALLY INCREASING, so whatever $\theta$ maximizes $L(\theta)$ ALSO maximizes $\log L(\theta)$ (and vice versa); meanwhile, the logarithm converts the PRODUCT into a much more tractable SUM, dramatically simplifying the calculus.

To find the MLE, set the **score** $\frac{\partial\log L}{\partial\theta}=0$ and solve for $\theta$ (using `math.calc.derivative-rules`). MLEs enjoy three powerful large-sample guarantees: they are CONSISTENT (converge to the true parameter as $n\to\infty$, per `math.stats.consistency`), ASYMPTOTICALLY NORMAL (their sampling distribution approaches a normal distribution for large $n$), and ASYMPTOTICALLY EFFICIENT (achieving the lowest possible variance among consistent estimators, in the large-sample limit) — making MLE one of the most theoretically well-justified estimation methods.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — the log-likelihood trick, breaking MC-1)**: For data $x_1,\ldots,x_n$ from an exponential distribution with rate $\lambda$ (density $f(x|\lambda)=\lambda e^{-\lambda x}$), write the likelihood and log-likelihood. $L(\lambda)=\prod_i\lambda e^{-\lambda x_i}=\lambda^ne^{-\lambda\sum x_i}$. $\log L(\lambda)=n\log\lambda-\lambda\sum x_i$ (converting the PRODUCT and the exponential into a manageable SUM). A common error attempts to differentiate the ORIGINAL product-form likelihood $L(\lambda)$ directly (a genuinely tedious product-rule-heavy calculation), rather than taking the log FIRST to simplify — the log transformation isn't optional convenience; it's the standard, dramatically more tractable route to the same answer.

**Example 2 (LO3 — setting the score to zero, breaking MC-2)**: Continuing Example 1, find the MLE $\hat\lambda$ by setting the score to zero. $\frac{\partial\log L}{\partial\lambda}=\frac{n}{\lambda}-\sum x_i=0\Rightarrow\frac{n}{\lambda}=\sum x_i\Rightarrow\hat\lambda=\frac{n}{\sum x_i}=\frac{1}{\bar{x}}$ (the reciprocal of the sample mean). A common error stops after finding the DERIVATIVE expression $\frac{n}{\lambda}-\sum x_i$ without actually SETTING it to zero and solving for $\lambda$ — finding the MLE requires the full solve step, not just the score expression itself.

**Example 3 (LO3 — MLE's large-sample properties)**: State the three key large-sample properties of MLEs, and briefly explain WHY consistency in particular is a valuable guarantee for practical use. Consistency means as more data is collected, the MLE genuinely converges to the true parameter value — this is exactly the property that justifies using MLE with confidence for large real-world datasets (asymptotic normality and efficiency further justify constructing confidence intervals and trusting the MLE's precision).

## Component 5 — Teaching Actions

### Teaching Action A01 — Take the Log First to Convert the Product into a Sum (Primitive P64: Conceptual Shift)

Work Example 1, explicitly performing the log transformation before attempting any differentiation.

- **MC-1 hook**: check whether the log-likelihood transformation is applied before differentiating, not the raw product-form likelihood.

### Teaching Action A02 — Setting the Score to Zero and Solving, Not Stopping at the Derivative (Primitive P11: Representation Shift)

Work Example 2, explicitly completing the full set-to-zero-and-solve procedure.

- **MC-2 hook**: this directly targets MC-2 (stopping at the score's derivative expression without solving for the estimator).

### Teaching Action A03 — MLE's Three Large-Sample Guarantees (reused procedure)

Present Example 3, connecting the theoretical properties to practical justification for using MLE.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. For data from a Poisson distribution with rate $\lambda$ (probability mass $f(x|\lambda)=\frac{\lambda^xe^{-\lambda}}{x!}$), write the log-likelihood for $n$ observations.
  2. Continuing problem 1, find the MLE $\hat\lambda$ by setting the score to zero and solving.
  3. Explain, in one sentence, why maximizing the log-likelihood gives the same answer as maximizing the likelihood directly.
  4. State the three key large-sample properties of MLEs.
- **P76 (Transfer Probe, mode = independence)**: "A biologist collects data on the number of mutations observed per gene sample, modeling this count with a Poisson distribution of unknown rate $\lambda$ (the average mutation rate), and wants to estimate $\lambda$ from the collected data using MLE. (a) Explain why the biologist would take the LOG of the likelihood function before attempting to maximize it. (b) Explain why the resulting MLE is expected to become increasingly accurate as the biologist collects more gene samples, connecting to MLE's consistency property."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RAW-PRODUCT-LIKELIHOOD-DIFFERENTIATED-DIRECTLY-INSTEAD-OF-TAKING-THE-LOG-FIRST | Attempting to differentiate the raw product-form likelihood directly, rather than first converting to the log-likelihood sum for tractability | Moderate |
| MC-2 | SCORE-EXPRESSION-LEFT-UNSOLVED-INSTEAD-OF-SET-TO-ZERO-AND-SOLVED-FOR-THETA | Stopping at the derivative (score) expression without setting it to zero and solving for the parameter, leaving the MLE unfound | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Raw Product Likelihood Differentiated Directly Instead of Taking the Log First") → P41 (detect: present Example 1 and check whether the log transformation is applied before differentiating) → P64 (conceptual shift: re-derive the log-likelihood explicitly, showing the product-to-sum simplification).
- **B02 (targets MC-2)**: P27 ("Score Expression Left Unsolved Instead of Set to Zero and Solved for Theta") → P41 (detect: present Example 2 and check whether the solve step is completed) → P64 (conceptual shift: re-set the score expression to zero explicitly and re-solve algebraically for the parameter).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.estimator`, `math.calc.derivative-rules`, `math.prob.pdf`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.method-of-moments` (an alternative, simpler-to-compute estimation method).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects the genuine breadth of this concept — likelihood construction, log-transformation technique, calculus-based optimization, and theoretical properties all in one topic.
- MC-2 was ranked Foundational because an incomplete solve genuinely fails to produce an estimator at all, while MC-1 was ranked Moderate since it typically still leads to a (eventually) correct, if far more laborious, result.
- The gene-mutation-rate transfer probe was deliberately chosen because Poisson-rate MLE estimation from count data is a genuinely common real scientific application, grounding the abstract procedure in a concrete research scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.estimator`, `math.calc.derivative-rules`, `math.prob.pdf`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
