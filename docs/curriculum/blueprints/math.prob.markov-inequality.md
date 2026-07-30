# Blueprint: math.prob.markov-inequality

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.markov-inequality |
| name | Markov's Inequality |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 2 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.prob.expected-value |
| Cross-links | — |
| Unlocks | math.prob.chebyshev |

## Component 1 — Learning Objective
The student states Markov's inequality: for X≥0 and a>0, P(X≥a)≤E[X]/a; proves it in one line from the definition of expectation; applies it to bound tail probabilities when only the mean is known; recognises when Markov is tight (concentrated at 0 and a); and identifies that Markov requires X≥0 but no distributional assumptions beyond finite mean.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a non-negative distribution with mean μ; mark the threshold a=5μ on the x-axis; the region X≥a is a tail; Markov says: the probability in this tail is ≤ μ/(5μ) = 1/5 = 20%; visualise the worst case: a point mass at 0 and another at 5μ with probability 1/5 — this IS the tightest distribution, confirming Markov is tight in general)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MARKOV-REQUIRES-SPECIFIC-DISTRIBUTION | Student thinks Markov's inequality is a formula for a specific distribution (like the Binomial or Poisson); doesn't recognise it as a universal bound holding for ANY non-negative random variable | Type 5 — instruction-induced (probability inequalities are usually introduced alongside specific distributions; students categorise Markov as a "distribution result" rather than a distribution-free bound) |
| MC-2 | MARKOV-REQUIRES-X-SYMMETRIC | Student tries to apply Markov to X that can be negative; doesn't know the non-negativity requirement; or tries to apply it to deviations from the mean before converting to a non-negative quantity | Type 3 — language contamination ("Markov" is associated with Markov chains (unrelated), and students assume both share some symmetry/stationarity requirement) |
| MC-3 | MARKOV-BOUND-IS-TIGHT-FOR-ALL-DISTRIBUTIONS | Student thinks P(X≥a)=E[X]/a (equality) for all non-negative X; doesn't know equality holds only for the degenerate two-point distribution concentrated on {0,a} | Type 1 — overgeneralisation (if shown the tight example, students assume it generalises to equality always) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Markov's inequality — one of the simplest and most powerful inequalities in probability:**

**Statement:** If X≥0 and a>0, then P(X≥a) ≤ E[X]/a.

**Proof (one line):** E[X] = E[X·1_{X≥a}] + E[X·1_{X<a}] ≥ E[X·1_{X≥a}] ≥ a·E[1_{X≥a}] = a·P(X≥a). Rearranging: P(X≥a)≤E[X]/a. ∎

(The first ≥ drops the non-negative term E[X·1_{X<a}]≥0; the second ≥ replaces X by a on the event X≥a since X≥a on that event.)

**Applications:**
- If E[X]=5: P(X≥25) ≤ 5/25 = 1/5. Regardless of the distribution.
- If number of errors in a program has mean 10: P(≥100 errors) ≤ 1/10.

**When is the bound tight?** X=0 with probability 1−p and X=a with probability p. Then E[X]=ap, and P(X≥a)=p=E[X]/a. So equality holds for this two-point distribution.

**Limitation:** The bound can be trivial (P(X≥a)≤1 is always true, so when E[X]/a≥1 the Markov bound gives nothing). For example if E[X]=10 and a=5: P(X≥5)≤10/5=2 — trivially true but useless. Markov is only useful when a>E[X].

**P49 checkpoint:**
- CORRECT → "P(X≥a)≤E[X]/a for X≥0. Proof: lower-bound E[X] by a·P(X≥a). Tight at {0,a} two-point distribution. Requires X≥0 and a>E[X] for a non-trivial bound." → Gate (P91)
- PARTIAL → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "E[X]=E[X·1_{X≥a}]+E[X·1_{X<a}]. Which term is bigger? What lower bound can you put on E[X·1_{X≥a}] using the fact that X≥a on this event?" → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 MARKOV-REQUIRES-SPECIFIC-DISTRIBUTION):**
Step 1 — "Markov's inequality is distribution-free: it holds for ANY non-negative random variable with finite mean. The only inputs are E[X] (the mean) and a (the threshold). Nothing else about the distribution matters."
Step 2 — "This is its power and its limitation: power because it applies universally; limitation because it ignores the shape of the distribution and therefore can be very loose (e.g. for a Normal distribution, Chebyshev is much tighter, and the exact Normal tail is tighter still)."
Step 3 — "Hierarchy of bounds: Markov (needs only mean, X≥0) → Chebyshev (needs mean and variance, any X) → distribution-specific bounds (need full distribution). Use the weakest tool that gives what you need; use Markov when only the mean is known."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X is a non-negative random variable with E[X]=3. Bound P(X≥12) using Markov's inequality.
2. A factory produces items; the expected number of defects per batch is 6. Use Markov to bound the probability that a batch has at least 30 defects. Is this bound useful?
3. X≥0 with E[X]=μ. Show that P(X≥kμ)≤1/k for any k>1. This is the standard multiplicative form of Markov.
4. Give an example of a distribution where Markov's bound P(X≥a)=E[X]/a (equality) holds exactly.
5. Why can't Markov be applied directly to P(|X−μ|≥a) (i.e. to bound the probability that X deviates from its mean by a)? What transformation is needed? (Hint: what is |X−μ|? Is it non-negative? What is its mean?)

**P55 — Reflect & Consolidate:** "P(X≥a)≤E[X]/a for X≥0. Proof: E[X]≥a·P(X≥a). Distribution-free. Tight at two-point {0,a}. Only useful when a>E[X]. Gateway to Chebyshev (apply Markov to (X−μ)²)."

**P76 — Transfer Probe (Independence mode):**
(a) Chebyshev's inequality from Markov: let Y=(X−μ)². Y is non-negative. E[Y]=Var(X)=σ². P(|X−μ|≥k) = P(Y≥k²) ≤ E[Y]/k² = σ²/k² (by Markov applied to Y). This IS Chebyshev's inequality. Write it in the form P(|X−μ|≥kσ)≤1/k². (b) Apply Chebyshev (derived from Markov) to X with E[X]=50, Var(X)=25: bound P(|X−50|≥15). Compare with Markov applied directly to X (using E[X]=50, threshold a=65): which is tighter? (c) What does it mean that Chebyshev "refines" Markov? What extra information does it use?

**P75 — Mastery Assessment:**
"(a) Prove Markov's inequality from scratch (no notes). (b) Apply it: X~Poisson(4). Bound P(X≥20) using Markov. Compare with the exact value P(X≥20)=∑_{k=20}^∞ e⁻⁴4ᵏ/k! ≈ 0.0000084. Is Markov tight here? (c) Is Markov ever tight for the Poisson distribution? (Recall: tightness requires the distribution to concentrate on {0,a}. Does Poisson ever do this?)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW proof and tightness condition
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.expected-value; reassign

**P78 — Completion:** Markov's Inequality certified. Student states and proves the bound; applies to tail probabilities; derives Chebyshev from it; understands tightness and when it's useful.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Deriving Chebyshev from Markov; comparing bounds for specific distributions
Skill tested: Chain Markov to Chebyshev; assess tightness

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
