# Blueprint: math.prob.quantile

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.quantile |
| name | Quantile |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 2 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.prob.cdf |
| Cross-links | math.stats.percentile |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the p-th quantile (0<p<1) of a random variable X as Q(p)=inf{x: F(x)≥p} where F is the CDF; computes quantiles from given CDFs; identifies the median as Q(0.5), quartiles as Q(0.25) and Q(0.75), and percentiles; applies the quantile function to transform Uniform(0,1) to any target distribution (the inverse-CDF or quantile method); and distinguishes quantiles from moments (mean, variance) as measures of distribution shape.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the CDF curve F(x) increasing from 0 to 1; draw a horizontal line at height p=0.75; the quantile Q(0.75) is the x-value where the line meets the curve — i.e. where F(x)=0.75 for the first time; label Q(0.25), Q(0.5)=median, Q(0.75) on the graph; annotate: "the middle 50% of the distribution lies between Q(0.25) and Q(0.75) — the interquartile range IQR=Q(0.75)−Q(0.25)")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | QUANTILE-IS-THE-CDF | Student confuses Q(p) (which maps probability to value) with F(x) (which maps value to probability); inverts the direction; writes Q(0.5)=F(0.5) or similar | Type 3 — language contamination (both F and Q involve probability and x-values; the direction of the mapping is the only difference, and students who haven't explicitly worked with inverse functions conflate them) |
| MC-2 | MEDIAN-ALWAYS-EQUALS-MEAN | Student assumes Q(0.5)=E[X] for all distributions; doesn't know they coincide only for symmetric distributions | Type 5 — instruction-induced (Normal distribution is the canonical first example; mean=median for Normal; students generalise; skewed distributions (Exponential, log-normal) have mean≠median) |
| MC-3 | QUANTILE-IS-ONLY-DEFINED-FOR-CONTINUOUS-DISTRIBUTIONS | Student doesn't know how to define or compute quantiles for discrete distributions; thinks quantiles require a smooth CDF | Type 5 — instruction-induced (quantile formulas are typically derived for continuous distributions first; the infimum definition Q(p)=inf{x:F(x)≥p} handles discrete distributions but students aren't always shown this) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Quantiles — inverting the CDF:**

**Definition:** For 0<p<1, the p-th quantile of X is Q(p) = inf{x : F(x) ≥ p}.
- For continuous, strictly increasing F: Q(p) = F⁻¹(p) (the inverse CDF).
- For discrete F: Q(p) is the smallest x where F first reaches or exceeds p.

**Named quantiles:**
- Q(0.5) = **median** (50th percentile): half the probability is below, half above
- Q(0.25) = **first quartile** (Q1): 25% below
- Q(0.75) = **third quartile** (Q3): 75% below
- IQR = Q(0.75)−Q(0.25): "middle 50%" spread measure
- Q(k/100) = k-th **percentile**: k% below

**Examples:**
- X~Exponential(λ): F(x)=1−e^{−λx}. Set F(x)=p: 1−e^{−λx}=p → x=−ln(1−p)/λ. So Q(p)=−ln(1−p)/λ. Median=Q(0.5)=ln(2)/λ≈0.693/λ. Mean=1/λ>ln(2)/λ: mean>median (right-skewed distribution).
- X~Uniform(0,1): F(x)=x. Q(p)=p. Median=0.5.
- X~Bernoulli(0.3): P(X=0)=0.7, P(X=1)=0.3. F(0)=0.7, F(1)=1. Q(0.5)=inf{x:F(x)≥0.5}=0. Median=0 (the mode of this distribution).

**Inverse CDF method for simulation:** If U~Uniform(0,1) and we want X~F, set X=Q(U)=F⁻¹(U). Then P(X≤x)=P(Q(U)≤x)=P(U≤F(x))=F(x). This is how random samples from any distribution are generated computationally from uniform random numbers.

**P49 checkpoint:**
- CORRECT → "Q(p)=F⁻¹(p). Median=Q(0.5). IQR=Q(0.75)−Q(0.25). Exponential: median=ln2/λ<mean=1/λ. Inverse CDF method: X=Q(U), U~Uniform(0,1)." → Gate (P91)
- PARTIAL (confuses Q and F) → "F maps VALUES to PROBABILITIES: F(x)=P(X≤x). Q maps PROBABILITIES to VALUES: Q(p)=inf{x:F(x)≥p}. They are inverses of each other (when F is invertible). Example: if F(3)=0.7, then Q(0.7)=3." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "Exponential(1) CDF: F(x)=1−e^{-x}. What value x satisfies F(x)=0.5? Solve: 1−e^{-x}=0.5 → e^{-x}=0.5 → x=ln2≈0.693. This is Q(0.5), the median." → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 QUANTILE-IS-THE-CDF):**
Step 1 — "F: x → probability. Q: probability → x. They are inverse functions. Draw arrows: F goes LEFT to RIGHT (x-axis to y-axis of the CDF graph). Q goes RIGHT to LEFT (y-axis back to x-axis). If F(5)=0.7: 'the probability of being ≤5 is 70%'. Q(0.7)=5: 'the 70th percentile is 5'."
Step 2 — "Computation direction: to find Q(0.9), look at the horizontal line at 0.9 on the CDF graph and read off the x-value. To find F(10), look at the vertical line at x=10 and read off the probability."
Step 3 — "For continuous strictly increasing F: Q=F⁻¹ in the usual sense. Set F(x)=p and solve for x: that's Q(p)."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X~Normal(0,1). The 97.5th percentile is z₀.₀₂₅=1.96 (standard table value). What is Q(0.975)? What is Q(0.025)? (Use symmetry: Q(1−p)=−Q(p) for the standard Normal.)
2. X~Exponential(2). Find the median, Q1, and Q3. Compute IQR=Q3−Q1.
3. X has CDF F(x)=x² for 0≤x≤1. Find Q(p) for all 0<p<1.
4. U~Uniform(0,1). Define X=−ln(U)/λ. What is the CDF of X? Identify its distribution. (This is the inverse CDF method applied to Exponential(λ).)
5. X~Poisson(3). Compute Q(0.5) (the median) using the CDF: find the smallest integer k with P(X≤k)≥0.5. (You'll need P(X≤0)≈0.050, P(X≤1)≈0.199, P(X≤2)≈0.423, P(X≤3)≈0.647.)

**P55 — Reflect & Consolidate:** "Q(p)=F⁻¹(p): value at which CDF first reaches p. Median=Q(0.5); IQR=Q(0.75)−Q(0.25). Right-skewed: mean>median. Inverse CDF method: simulate any distribution from Uniform."

**P76 — Transfer Probe (Cross-link mode: math.stats.percentile):**
(a) In statistics, the sample quantile of a dataset {x₁,…,xₙ} at level p is computed from the order statistics x_{(1)}≤⋯≤x_{(n)} using various interpolation formulas (different software uses different conventions). The key idea: x_{(k)} estimates Q(k/n) or Q((k−0.5)/n). Explain why the sample quantile is a natural estimator of the population quantile. (b) Quantile-Quantile (Q-Q) plots: to check if data follows a Normal distribution, plot sample quantiles against Normal quantiles. If the data is Normal, the plot is a straight line. If the tail is heavier than Normal (e.g. Student's t), the plot curves upward at the extremes. Interpret a Q-Q plot where the right tail curves upward. (c) In risk management, the Value at Risk (VaR) at level α is defined as VaR_α = Q(α) of the loss distribution. If losses are Heavy-tailed, why does the median (Q(0.5)) underestimate tail risk compared to VaR_0.99?

**P75 — Mastery Assessment:**
"(a) X~Gamma(2,1): f(x)=xe^{-x} for x>0. The CDF has no closed form, but Q(0.5)≈1.678 (given). Interpret this: 'half of all Gamma(2,1) realisations are below ___'. (b) The mean of Gamma(2,1)=2>median≈1.678. What does this say about the skewness? (c) If Y=2X where X~Gamma(2,1), what is Q_Y(0.5)? (Use the CDF transformation: F_Y(y)=P(Y≤y)=P(X≤y/2)=F_X(y/2). Hence Q_Y(p)=2·Q_X(p).) (d) What is IQR(Y)?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW direction of quantile (Q=F⁻¹, not F)
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.cdf; reassign

**P78 — Completion:** Quantile certified. Student defines Q(p)=F⁻¹(p); computes median, quartiles, IQR; applies inverse CDF method; connects to percentiles and Q-Q plots.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.stats.percentile])
Target: Sample quantiles; Q-Q plots; Value at Risk; sample vs population quantile
Skill tested: Connect population quantile to statistical estimation and risk measures

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
