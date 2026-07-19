# Teaching Blueprint: Estimator (`math.stats.estimator`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.estimator` |
| name | Estimator |
| domain | Statistics |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.sampling-distribution`, `math.prob.expected-value` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a real sample-to-estimate scenario (guessing an unknown average from a sample) before the formal definition |
| description (KG) | A rule (function of sample data) for estimating a population parameter. An estimate is the specific value from a given sample. Properties: unbiasedness (E[θ̂]=θ), consistency, efficiency, sufficiency. |

## Component 1 — Learning Objectives

- LO1: Distinguish an **estimator** ($\hat\theta$, a rule/function of the sample, e.g. "take the sample mean") from an **estimate** (the specific number that rule produces for one particular sample) — directly refuting the misconception that these two words are interchangeable.
- LO2: Define **unbiasedness** ($E[\hat\theta]=\theta$, the estimator's average value across all possible samples equals the true parameter) and verify it for a specific estimator using the linearity of expectation.
- LO3: Define **consistency** (as sample size $n\to\infty$, $\hat\theta$ converges to $\theta$) and explain why an estimator can be unbiased but not very useful in a single small sample, or consistent but biased for small $n$ — the two properties are related but distinct guarantees.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sampling-distribution` (a statistic like $\bar X$ has its own probability distribution across repeated samples, with $E[\bar X]=\mu$ and standard error $\sigma/\sqrt n$) and `math.prob.expected-value` (computing $E[X]$ and its linearity) — an estimator's bias and variance properties are computed directly using these tools.

## Component 3 — Core Explanation

**Estimator vs. estimate**: an **estimator** $\hat\theta$ is a *rule* — a function applied to sample data, defined before you ever see a specific sample (e.g. "$\hat\mu = \bar X$, the sample mean" is an estimator for the population mean $\mu$). An **estimate** is the specific *number* that rule outputs once applied to one particular collected sample (e.g. "the sample mean of these 30 measurements is $\hat\mu = 42.3$"). The estimator is a random variable (it varies from sample to sample); the estimate is one realized value of it.

**Unbiasedness**: an estimator $\hat\theta$ is unbiased if $E[\hat\theta] = \theta$ — that is, averaged over **all possible samples** the estimator could have produced, its long-run average value equals the true parameter exactly, with no systematic over- or under-estimation. This is a statement about the estimator's *sampling distribution* (from `math.stats.sampling-distribution`), not about any single estimate.

**Consistency**: an estimator $\hat\theta_n$ (indexed by sample size $n$) is consistent if, as $n\to\infty$, $\hat\theta_n$ converges (in probability) to the true parameter $\theta$ — larger samples make the estimator increasingly reliable. Consistency and unbiasedness are **different guarantees**: unbiasedness is about the *average* being exactly right at every sample size (including small ones); consistency is about the estimator's *spread* shrinking toward the true value as $n$ grows, even if it is somewhat biased for small $n$. An estimator can be unbiased at every $n$ yet have such high variance for small samples that individual estimates are unreliable; another can be biased for small $n$ (bias vanishing as $n$ grows) yet still consistent.

**Other properties (named, not the focus here)**: efficiency (an unbiased estimator with the smallest possible variance among unbiased estimators) and sufficiency (the estimator captures all the information in the sample relevant to $\theta$) are further refinements of "how good" an estimator is, beyond unbiasedness and consistency alone.

## Component 4 — Worked Examples

**Example 1 (LO1 — estimator vs. estimate, breaking MC-1)**: The estimator "$\hat\mu=\bar X$" is a rule: "average whatever sample you collect." Applied to Sample A (10 test scores averaging 78), the **estimate** is $\hat\mu=78$. Applied to a different Sample B (a different 10 students), the same **estimator** $\hat X$ produces the **estimate** $\hat\mu=82$. The estimator (the averaging rule) never changed — only the resulting estimate changed, because the sample changed. Confusing "the estimator" with "the number 78" mistakes the rule for one of its many possible outputs.

**Example 2 (LO2 — verifying unbiasedness)**: For $\hat\mu=\bar X = \frac{1}{n}\sum_{i=1}^n X_i$, using linearity of expectation: $E[\bar X] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n}\cdot n\mu = \mu$. So $\bar X$ is an unbiased estimator of $\mu$ — its average value across all possible samples is exactly $\mu$, for **any** sample size $n$, even $n=1$.

**Example 3 (LO3 — unbiased but highly variable at small n, vs. consistency, breaking MC-2)**: Consider estimating $\mu$ using just the **first observation**, $\hat\mu' = X_1$ (ignoring the rest of the sample). $E[\hat\mu']=E[X_1]=\mu$ — this is **also unbiased**, exactly like $\bar X$. But its standard error never shrinks as $n$ grows (it only ever looks at $X_1$), so $\hat\mu'$ is **not consistent** — more data doesn't make it any more reliable. Contrast with $\bar X$: also unbiased, **and** consistent (standard error $\sigma/\sqrt n \to 0$ as $n\to\infty$, from `math.stats.sampling-distribution`). Both estimators share the unbiasedness property, yet one improves with more data and one does not — proving unbiasedness alone says nothing about whether more data helps.

## Component 5 — Teaching Actions

### Teaching Action A01 — Estimator (the Rule) vs. Estimate (the Number) (Primitive P06: Contrast Pair)

State plainly: "an estimator is a recipe you could apply to ANY sample before you've even collected one; an estimate is what that recipe outputs from the ONE sample you actually got." Work Example 1, explicitly running the same estimator (the averaging rule) against two different samples to produce two different estimates.

- **MC-1 hook**: ask "if two people calculate '$\bar X$' on two different samples and get different numbers, does that mean they used different estimators?" — a "yes" answer reveals MC-1 (conflating the estimator, a fixed rule, with the estimate, its sample-dependent output).

### Teaching Action A02 — Unbiasedness via Linearity of Expectation (Primitive P11: Representation Shift)

Present the concept intuitively first: "if you could repeat the sampling process infinitely many times and average all the resulting estimates together, an unbiased estimator's grand average lands exactly on the truth — no systematic drift high or low." Shift to the symbolic verification in Example 2, using linearity of expectation directly.

### Teaching Action A03 — Unbiasedness Is Not Consistency (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: $\hat\mu'=X_1$ is unbiased (matches $\bar X$'s unbiasedness) yet fails to improve with more data, while $\bar X$ is unbiased **and** improves. State: "unbiasedness is about the estimator's average being correct — it says nothing about how much any single estimate might vary, or whether that variation shrinks with a bigger sample. Consistency is the separate promise that more data genuinely helps."

- **MC-2 hook**: ask "if an estimator is unbiased, does that guarantee it also gets more reliable with a bigger sample?" — a "yes" answer reveals MC-2 (assuming unbiasedness implies consistency, rather than recognizing them as independent properties).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A researcher proposes the estimator "$\hat\sigma^2 = \frac{1}{n}\sum(X_i-\bar X)^2$" for the population variance. Explain, in your own words, what makes this an *estimator* rather than an *estimate*, using this specific formula.
  2. Given $\hat p = \frac{1}{n}\sum_{i=1}^n Y_i$ where each $Y_i$ is 1 or 0 (indicating success/failure) with $E[Y_i]=p$, use linearity of expectation to show $\hat p$ is unbiased for $p$.
  3. Explain why an estimator that only uses the last observation, $\hat\theta'' = X_n$, is unbiased for $\mu$ (if each $X_i$ has mean $\mu$) but not consistent, paralleling the reasoning in Example 3.
  4. Two statisticians compute the sample mean from the SAME dataset of 50 values and get the same number, 63.4. Is 63.4 the "estimator" or the "estimate" here? Justify your answer.
- **P76 (Transfer Probe, mode = independence)**: "A quality-control engineer wants to estimate the true defect rate $p$ of a manufacturing line. They propose two rules: Estimator A samples 100 items and reports the proportion defective; Estimator B samples just 5 items and reports the proportion defective. (a) Explain why both A and B can be unbiased estimators of $p$ despite using very different sample sizes. (b) Explain, using the concept of consistency, why Estimator A is more trustworthy in practice even though both are unbiased. (c) If the engineer only ever samples exactly 5 items every single time (never increasing $n$), can Estimator B still be called consistent? Justify your answer using the definition of consistency directly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ESTIMATOR-AND-ESTIMATE-CONFLATED | Treating "estimator" and "estimate" as interchangeable terms, rather than distinguishing the fixed rule (estimator) from its sample-specific numeric output (estimate) | Foundational |
| MC-2 | UNBIASEDNESS-ASSUMED-TO-IMPLY-CONSISTENCY | Assuming an unbiased estimator must also be consistent (improve with more data), rather than recognizing these as independent properties | Foundational |
| MC-3 | SAMPLE-STATISTIC-ASSUMED-ALWAYS-UNBIASED | Assuming any reasonable-looking sample statistic is automatically an unbiased estimator of the corresponding population parameter, without verifying $E[\hat\theta]=\theta$ directly (e.g. the naive sample variance $\frac{1}{n}\sum(X_i-\bar X)^2$ is actually biased) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Estimator-Estimate Conflation") → P41 (detect: ask a student to state, in their own words, what "the sample mean" refers to when two different samples give two different numeric answers) → P64 (conceptual shift: re-walk Example 1, emphasizing the same averaging rule applied to Sample A and Sample B, producing two different estimates from one unchanged estimator).
- **B02 (targets MC-2)**: P27 (name it: "Unbiased-Implies-Consistent Assumption") → P41 (detect: ask "if I told you an estimator is unbiased, do you now know it gets better with more data?") → P64 (conceptual shift: re-present Example 3's $X_1$-only estimator, unbiased yet not consistent, as direct proof the two properties are independent).
- **B03 (targets MC-3)**: P27 (name it: "Automatic-Unbiasedness Assumption") → P41 (detect: ask whether $\frac{1}{n}\sum(X_i-\bar X)^2$ is automatically unbiased for the population variance, without deriving it) → P64 (conceptual shift: note that verifying unbiasedness always requires the explicit $E[\hat\theta]=\theta$ computation as in Example 2 — some seemingly natural statistics, like the naive variance formula, actually fail this check and require a correction (the $n-1$ divisor), which is why unbiasedness must be checked, never assumed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sampling-distribution` (the sampling-distribution machinery — $E[\bar X]=\mu$, standard error $\sigma/\sqrt n$ — that unbiasedness and consistency are defined against), `math.prob.expected-value` (linearity of expectation, used directly to verify unbiasedness).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag places this at a "3 TAs + gate" tier — A01 (estimator/estimate distinction), A02 (unbiasedness), and A03 (unbiasedness vs. consistency) each target a distinct LO, appropriate for a concept whose primary challenge is precise vocabulary and property distinctions rather than heavy computation.
- MC-3 (automatic-unbiasedness assumption) was deliberately included even though it isn't directly one of the three LOs, because it is the single most common "gotcha" in introductory statistics (the naive sample variance formula's bias, corrected by the $n-1$ divisor) — Teaching Notes flag this as a natural forward-pointer for whichever future concept formally teaches the corrected sample-variance estimator.
- Example 3's paired estimators ($\bar X$ vs. $X_1$-only) were chosen because both are exactly, provably unbiased by the same linearity-of-expectation argument from Example 2 — isolating consistency as the only difference between them, rather than introducing any new computational technique.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: sample-to-estimate scenario before formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
