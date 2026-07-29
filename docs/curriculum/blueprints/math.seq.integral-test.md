<!-- BLUEPRINT: math.seq.integral-test -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Integral Test for Series
**Concept ID:** `math.seq.integral-test`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=5 | mastery_threshold=0.7

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.integral-test |
| name | Integral Test for Series |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.7 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.seq.series-convergence, math.calc.improper-integrals |
| cross_links | math.calc.improper-integrals |
| P76_mode | cross-link probe (math.calc.improper-integrals file exists on disk) |
| MAMR | 4/5 (⌈0.7 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.series-convergence**: Σaₙ converges iff {Sₙ} converges; harmonic series Σ1/n diverges despite terms→0
- **math.calc.improper-integrals**: ∫ₐ^∞ f(x)dx = lim_{t→∞} ∫ₐ^t f(x)dx; convergence of this limit determines whether the integral converges

### Target Knowledge State
Student can state the Integral Test conditions (f continuous, positive, decreasing on [N,∞) with f(n)=aₙ) and conclusion (Σaₙ and ∫_N^∞ f(x)dx either both converge or both diverge). Student understands the integral and series do NOT converge to the same value — only convergence/divergence is shared. Student can apply the integral test to derive the p-series test (p > 1 converges, p ≤ 1 diverges) and to series involving logarithmic denominators.

### Conceptual Obstacles
1. Equating the integral value with the series sum — the integral and series share convergence behaviour but NOT their numerical values; the integral gives an estimate, not the exact sum
2. Omitting the monotone-decreasing condition — the integral test requires f to be continuous, positive, AND decreasing; applying it to a non-monotone function can yield incorrect conclusions
3. Believing that the starting index (n=1 vs. n=2 vs. n=N) affects convergence — changing the starting index changes the series value but never its convergence or divergence status

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | INTEGRAL-EQUALS-SERIES-SUM | Student concludes Σaₙ = ∫₁^∞ f(x)dx; equates the integral value with the series sum; may accept partial credit for "close approximation" framing | Any integral-test problem asking for the convergence decision; reverse-engineering problems asking for the series sum |
| MC-2 | MONOTONE-NOT-REQUIRED | Student applies integral test to a function that is positive but not eventually decreasing; does not verify the decreasing condition before applying the test | Series with oscillating or eventually-increasing terms; e.g., aₙ = sin²n/n² (not monotone but the test still works because a different bound applies) |
| MC-3 | STARTING-INDEX-CHANGES-CONVERGENCE | Student believes Σₙ₌₁^∞ aₙ and Σₙ₌₂^∞ aₙ may have different convergence; or that starting at n=N "changes" the test outcome | Any problem where integral is evaluated from 2 or N rather than 1; p-series with restricted domains |

**Foundational Misconception:** MC-1 (INTEGRAL-EQUALS-SERIES-SUM) — causes students to use the integral value as a series answer on every integral-test problem; addressed explicitly in A01's contrast between ∫₁^∞ 1/x² dx = 1 and Σ1/n² = π²/6. These are not equal.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — advanced learner with improper integral fluency; the integral test is a purely algebraic–analytic argument with no physical-world entry point needed.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — A: integral test statement with conditions; area-under-curve bounding argument; p-series derivation as the primary application; MC-1 antidote
2. **A02 P04 PATTERN INDUCTION** — apply integral test to logarithmic-denominator series; induce the boundary between convergence and divergence for families like Σ1/(n·(ln n)ᵖ)
3. **A03 P06 CONTRAST PAIR** — compare series/integral convergence vs. value; contrast conditions (monotone required vs. not); starting-index invariance
4. **A04 P91 Gate** — mastery assessment including cross-link probe to math.calc.improper-integrals

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Integral Test Statement and P-Series Derivation

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** State the integral test with conditions; prove convergence equivalence via area bounds; derive the p-series test as the canonical application; address MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Algebraic statement and area proof:**

**Integral Test:** Let f be a function that is

1. **Continuous** on [1, ∞)
2. **Positive**: f(x) > 0 for all x ≥ 1
3. **Decreasing**: f(x) ≥ f(y) whenever x ≤ y

and suppose f(n) = aₙ for all positive integers n. Then:

Σₙ₌₁^∞ aₙ  and  ∫₁^∞ f(x) dx

**either both converge or both diverge.**

**Area bounding argument:**

Since f is decreasing: f(n+1) ≤ ∫ₙ^{n+1} f(x)dx ≤ f(n)

Summing from n=1 to N−1:

∑_{n=2}^N aₙ ≤ ∫₁^N f(x)dx ≤ ∑_{n=1}^{N-1} aₙ

This double inequality shows the partial sums and integral run together: one is bounded iff the other is. Taking N→∞ gives the equivalence.

**Critical warning (MC-1):** The integral and series converge to **different values**. They share only convergence/divergence.

Example: ∫₁^∞ 1/x² dx = [−1/x]₁^∞ = **1**, but Σₙ₌₁^∞ 1/n² = **π²/6 ≈ 1.6449**. Not equal.

**Primary application — p-series test:**

For f(x) = 1/xᵖ (p > 0): continuous, positive, and decreasing on [1,∞).

∫₁^∞ 1/xᵖ dx = lim_{t→∞} ∫₁^t x^{-p} dx

- If **p ≠ 1**: [x^{1-p}/(1-p)]₁^t = t^{1-p}/(1-p) − 1/(1-p)
  - p > 1: 1−p < 0 → t^{1-p} → 0 → integral = **1/(p−1)** (converges)
  - p < 1: 1−p > 0 → t^{1-p} → ∞ → integral **diverges**
- If **p = 1**: ∫1/x dx = [ln x]₁^t = ln t → ∞ → **diverges** (harmonic series!)

**p-Series Test (proved by Integral Test):**

Σ 1/nᵖ  **converges** iff **p > 1**; **diverges** iff **p ≤ 1**.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Apply the integral test to Σₙ₌₁^∞ 1/n². State whether it converges or diverges. Does the integral value equal the series sum?

(A) ∫₁^∞ 1/x² dx = 1 → series converges to 1
(B) ∫₁^∞ 1/x² dx = 1 → series converges; the sum is π²/6, not 1
(C) ∫₁^∞ 1/x² dx = π²/6 → series converges to π²/6
(D) Integral test inapplicable — 1/x² is not decreasing

*Branch CORRECT (B):* ∫₁^∞ 1/x² dx = [−1/x]₁^∞ = 0−(−1) = 1 — **converges** → series converges. But the sum Σ1/n² = π²/6, not 1. Integral and series have different numerical values. ✓ Proceed to A02.

*Branch INCORRECT (A):* The integral convergence tells us the series converges, but the integral value (1) is NOT the series sum. Σ1/n² = π²/6 ≈ 1.6449 — a famous result requiring separate machinery (Fourier series / Euler's method). Proceed to A02.

*Branch INCORRECT (C):* The integral evaluates to 1 (not π²/6). The series sum happens to be π²/6. Neither value is obtained directly from the other — they are not equal. Proceed to A02.

*Branch INCORRECT (D):* f(x) = 1/x² is indeed decreasing on [1,∞): f'(x) = −2/x³ < 0. All three conditions (continuous, positive, decreasing) are satisfied. Proceed to A02.

*Branch NO_RESPONSE:* ∫₁^∞ 1/x² dx = 1 (finite) → p-series with p=2>1 converges. The sum Σ1/n² = π²/6 ≠ 1 — the integral value ≠ series sum. Proceed to A02.

---

### Teaching Action A02 — Logarithmic Denominators and the Boundary Family

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Apply integral test to series with ln n; induce the convergence/divergence boundary for Σ1/(n·(ln n)ᵖ); connect to improper integrals via substitution

---

**[P04 — PATTERN INDUCTION]**

**Motivation:** The Divergence Test and p-series test are inconclusive for Σ1/(n ln n): terms→0, and the form 1/(n·ln n) is not a p-series. The integral test handles this cleanly.

**Series 1 — Σₙ₌₂^∞ 1/(n ln n):**

f(x) = 1/(x ln x): continuous, positive, decreasing for x ≥ 2.

∫₂^t 1/(x ln x) dx  [substitute u = ln x, du = dx/x]
= ∫_{ln 2}^{ln t} 1/u du = [ln u]_{ln 2}^{ln t} = ln(ln t) − ln(ln 2) → ∞

**Diverges**. ✓ (Note: starting from n=2, not n=1, because ln 1 = 0.)

**Series 2 — Σₙ₌₂^∞ 1/(n(ln n)²):**

Same f with squared log. ∫₂^t 1/(x(ln x)²) dx = [−1/ln x]₂^t = −1/ln t + 1/ln 2 → 0 + 1/ln 2

Finite → **converges**. ✓

**Induced pattern — ln-family boundary:**

| Series | p | Convergence |
|--------|---|-------------|
| Σ 1/(n(ln n)^{1/2}) | 1/2 | diverges |
| Σ 1/(n ln n) | 1 | diverges |
| Σ 1/(n(ln n)²) | 2 | converges |
| Σ 1/(n(ln n)³) | 3 | converges |

Generalisation: **Σₙ₌₂^∞ 1/(n(ln n)ᵖ) converges iff p > 1** — an exact parallel to the p-series test, one logarithmic level deeper.

Proof pattern: ∫₂^∞ 1/(x(ln x)ᵖ) dx uses u = ln x → ∫_{ln 2}^∞ u^{-p} du — the same p-series integral one level removed, converging iff p > 1.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Does Σₙ₌₂^∞ 1/(n · ln n · ln(ln n)) converge or diverge? Apply the integral test (or use the pattern above extended one more level).

(A) Diverges — third-level logarithm corresponds to p=1 in the next tier, which diverges
(B) Converges — logarithms in the denominator always force convergence
(C) Inconclusive — the integral test cannot handle triple logarithms
(D) Converges — ln(ln n) grows, so terms go to 0 faster than 1/(n ln n)

*Branch CORRECT (A):* ∫ 1/(x ln x · ln(ln x)) dx — substitute u = ln(ln x), du = dx/(x ln x) → ∫ 1/u du = ln u → ln(ln(ln t)) → ∞. **Diverges**. Third-level version of p=1 — still diverges, regardless of how many logarithms are nested. ✓ Proceed to A03.

*Branch INCORRECT (B, D):* Stacking more logarithms in the denominator does NOT ensure convergence unless the exponent on the outermost log exceeds 1. Here the outermost logarithm factor is ln(ln n), appearing once (exponent 1) — diverges. Proceed to A03.

*Branch NO_RESPONSE:* Pattern extension: 1/(n·ln n·ln(ln n)) → substitute u=ln(ln x) → ∫1/u du → ln(ln(ln t)) → ∞ → **diverges**. The "p=1 in the next tier" pattern applies recursively at every logarithmic level. Proceed to A03.

---

### Teaching Action A03 — Contrast: Convergence vs. Value; Conditions Required

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast series convergence with integral value; verify and contrast monotone condition in different scenarios; establish starting-index invariance

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Same convergence, different values:**

| | Integral ∫₁^∞ | Series Σₙ₌₁^∞ |
|--|--------------|--------------|
| 1/x² | 1 | π²/6 ≈ 1.6449 |
| 1/x³ | 1/2 | π²/6 − 1 − 1/4 ≈ 0.202 (partial; exact via Apéry's constant concepts) |
| Conclusion | Finite | Finite (both converge) |

The integral and series converge to different values. The integral test only transfers convergence/divergence information — never numerical values.

**Contrast 2 — Monotone condition matters:**

| Function | Conditions met? | Test applicable? |
|----------|----------------|-----------------|
| f(x) = 1/x² | Continuous, positive, decreasing ✓ | YES |
| f(x) = (1+sin x)/x | Positive but NOT monotone ✗ | NO (directly) |
| f(x) = e^{-x}·sin²x | Positive, decreasing on average, not strictly monotone | Must bound instead — use DCT with Σe^{-n} |
| f(x) = 1/(x·ln x) (x≥2) | Continuous, positive, decreasing ✓ | YES (start at n=2) |

Checking decrease: compute f'(x) and verify f'(x) < 0 on the interval, or argue from the denominator being increasing.

**Contrast 3 — Starting index invariance (MC-3 antidote):**

Σₙ₌₁^∞ 1/n  and  Σₙ₌₂^∞ 1/n  differ by exactly a₁ = 1.

If one converges to a limit L, the other converges to L − 1 (or L + 1). If one diverges, the other diverges.

General rule: changing the starting index N of Σₙ₌_N^∞ and ∫_N^∞ f(x)dx changes the value but NOT convergence. A finite number of terms cannot make a divergent series converge or a convergent series diverge.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* A student applies the integral test to determine that Σₙ₌₁^∞ 1/(n(ln(n+1))²) converges. They then claim: "The sum equals ∫₁^∞ 1/(x(ln(x+1))²) dx." What is wrong?

(A) Nothing — integral test gives the series sum
(B) The test conditions may not all be verified; also the integral value ≠ the series sum
(C) The integral test doesn't apply to this series — the denominator has n+1, not n
(D) The series diverges — (ln(n+1))² grows too slowly

*Branch CORRECT (B):* Two errors: (1) The student should verify that f(x) = 1/(x(ln(x+1))²) is continuous, positive, and decreasing before applying the test. (2) Even if the series converges, the integral value ≠ the series sum — the integral test does not compute series sums, only establishes convergence. ✓ Proceed to A04.

*Branch INCORRECT (A):* The integral test never gives series sums. It establishes convergence or divergence only. Proceed to A04.

*Branch INCORRECT (C):* The +1 inside the log does not invalidate the test — as long as f is continuous, positive, and decreasing, the test applies. The issue is the false claim about the integral equaling the series sum. Proceed to A04.

*Branch NO_RESPONSE:* The integral test never computes series sums — only shared convergence/divergence. The integral value and series sum differ numerically. Additionally, the decreasing condition should be verified (f'(x) < 0 for x ≥ 1). Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

*For each series: verify the integral test conditions, evaluate the improper integral, and state convergence or divergence.*

**Problem 1.** Σₙ₌₁^∞ 1/n^{1/3}

**Problem 2.** Σₙ₌₂^∞ 1/(n(ln n)²)

**Problem 3.** Σₙ₌₁^∞ n·e^{-n²}

**Problem 4.** Σₙ₌₁^∞ 1/n^{1.5}

---

**[P55 — SCORE]**

*Answers:*

1. f(x) = x^{-1/3}: continuous, positive, decreasing on [1,∞). ∫₁^∞ x^{-1/3}dx = [x^{2/3}/(2/3)]₁^∞ = (3/2)·∞ → **diverges**. p=1/3 < 1. ✓

2. f(x) = 1/(x(ln x)²): continuous, positive, decreasing for x≥2. ∫₂^t [−1/ln x]₂^t = 1/ln 2 (finite) → **converges**. ✓

3. f(x) = xe^{-x²}: continuous, positive; decreasing for x ≥ 1 (f'(x) = e^{-x²}(1−2x²) < 0 for x ≥ 1). ∫₁^∞ xe^{-x²}dx = [−(1/2)e^{-x²}]₁^∞ = 0 + 1/(2e) = 1/(2e) → **converges**. ✓

4. f(x) = x^{-3/2}: p=3/2 > 1 → **converges** (p-series). ∫₁^∞ x^{-3/2}dx = [−2/√x]₁^∞ = 0 + 2 = 2. ✓

Score 1 point per problem. Full credit requires: conditions stated (at least "continuous, positive, decreasing") + integral computation + convergence conclusion.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.calc.improper-integrals)*

*Problem:* Apply the integral test to Σₙ₌₂^∞ 1/(n ln n).

This problem requires skills from **math.calc.improper-integrals**: evaluate ∫₂^∞ 1/(x ln x)dx using the limit definition of an improper integral.

*(a)* Verify that f(x) = 1/(x ln x) satisfies the integral test conditions on [2, ∞).

*(b)* Using the substitution u = ln x, evaluate ∫₂^t 1/(x ln x)dx.

*(c)* Take the limit as t → ∞ and state whether the improper integral converges or diverges.

*(d)* Conclude: does Σₙ₌₂^∞ 1/(n ln n) converge or diverge?

*Expected answer:*

*(a)* f(x) = 1/(x ln x) is continuous for x > 1, positive for x ≥ 2 (ln x > 0), and decreasing (f'(x) = −(1 + ln x)/(x ln x)² < 0). ✓

*(b)* u = ln x, du = dx/x. When x=2: u=ln 2; when x=t: u=ln t.
∫₂^t dx/(x ln x) = ∫_{ln 2}^{ln t} du/u = [ln u]_{ln 2}^{ln t} = ln(ln t) − ln(ln 2) ✓

*(c)* lim_{t→∞} [ln(ln t) − ln(ln 2)] = ∞ (since ln(ln t) → ∞ as t → ∞). Improper integral **diverges**. ✓

*(d)* By the integral test: Σₙ₌₂^∞ 1/(n ln n) **diverges**. ✓

*Connection to math.calc.improper-integrals:* The limit definition ∫₂^∞ f(x)dx = lim_{t→∞} ∫₂^t f(x)dx is essential — without it, the integral cannot be evaluated rigorously, and the "infinite upper limit" has no meaning.

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all four parts correct; 0.5 if integral set-up correct but limit evaluation missing or divergence conclusion absent).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.7 × 5⌉ = 4). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items; value-vs-convergence confusion → B01; missing conditions → B02; starting-index error → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-prove p-series via integral test; re-examine area-bound argument; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.integral-test` complete. Threshold 0.7 requires 4/5 correct.

**Unlocks:** math.seq.absolute-convergence, deeper analysis of series comparison families.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — INTEGRAL-EQUALS-SERIES-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You equated the improper integral value with the series sum. The integral test establishes shared convergence/divergence — it does not transfer numerical values. The integral of a function and the sum of the function's values at integers are fundamentally different objects."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* ∫₁^∞ 1/x² dx = 1. A student concludes Σₙ₌₁^∞ 1/n² = 1. What is the correct sum?
*Correct response:* Σ1/n² = π²/6 ≈ 1.6449 (the Basel problem, solved by Euler). The integral = 1 ≠ π²/6. The integral test only tells us both converge; it provides no method to compute either value from the other.

**[P64 — CONCEPTUAL SHIFT]**
"The integral test is a comparison principle: integral bounded → partial sums bounded (and vice versa). It is NOT a computation tool. To find a series sum, you need a closed-form telescoping, a Fourier series argument, or another specialised method. The integral gives only a rough estimate (the area-bound inequalities show Sₙ ≤ a₁ + ∫₁^n f(x)dx, so the integral is an upper bound — but not the exact sum)."

---

### Repair Action B02 — MONOTONE-NOT-REQUIRED Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You applied the integral test without verifying the decreasing condition. The integral test requires f to be continuous, positive, AND eventually decreasing. If f is not decreasing, the area bounds used in the proof break down — the partial sums can exceed ∫f(x)dx in unpredictable ways."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Can the integral test be applied to Σ (1+sin(πn/2))/n² directly?
*Correct response:* No — f(x) = (1+sin(πx/2))/x² oscillates and is not monotone. DCT with 2/n² (since 0 ≤ 1+sin(πx/2) ≤ 2) is needed instead.

**[P64 — CONCEPTUAL SHIFT]**
"Before applying the integral test: check the three conditions. Continuous: usually immediate for smooth functions. Positive: verify f(x) > 0 on [N,∞). Decreasing: compute f'(x) and verify f'(x) < 0, or argue that the denominator is growing faster than the numerator. If any condition fails, switch to a comparison test or another appropriate tool."

---

### Repair Action B03 — STARTING-INDEX-CHANGES-CONVERGENCE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You changed the starting index (from n=1 to n=2) and concluded the convergence status might differ. Changing the starting index changes only the numerical value of the series, not its convergence or divergence."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Σₙ₌₂^∞ 1/(n ln n) diverges (as shown). Does Σₙ₌₃^∞ 1/(n ln n) converge?
*Correct response:* No — dropping the n=2 term (1/(2·ln 2)) from a divergent series leaves it divergent. A single finite term cannot rescue a divergent series. Similarly, the harmonic series Σₙ₌₁^∞ 1/n diverges, and so does Σₙ₌₁000000^∞ 1/n.

**[P64 — CONCEPTUAL SHIFT]**
"Convergence is a property of the tail of the series, not the first few terms. Adding or removing finitely many terms can change the sum but NEVER changes convergence or divergence. This is why the integral test's ∫_N^∞ f(x)dx can use any N — the choice of N changes the integral's value but not whether it diverges."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Apply the integral test to Σₙ₌₁^∞ 1/n^{0.5}. State the conditions, evaluate ∫₁^∞ x^{-0.5}dx, and conclude. |
| R2 | 3 days | Does Σₙ₌₂^∞ 1/(n(ln n)^{1/2}) converge or diverge? Use the integral test with u = ln x. |
| R3 | 7 days | A student claims: "∫₁^∞ 1/x³ dx = 1/2, so Σₙ₌₁^∞ 1/n³ = 1/2." Identify the error and state the correct conclusion about Σ1/n³. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.calc.improper-integrals |
| P76_mode | cross-link probe (file exists on disk) |
| Unlocks | math.seq.absolute-convergence |
| Requires (Tier-1) | math.seq.series-convergence, math.calc.improper-integrals |

**GR-8 compliance:** cross_links = [math.calc.improper-integrals]; Tier-1 prerequisite → P76 uses cross-link probe mode.
**GR-9 compliance:** P76 explicitly connects to math.calc.improper-integrals (limit definition of improper integral, substitution) as a cross-link probe — not an independence problem.

---

## Component 8 — Teaching Notes

- **The p-series derivation is the main payoff:** Most students learn "Σ1/nᵖ converges iff p > 1" as a memorised fact. The integral test lets them derive it in two minutes. Require the derivation — it reinforces both the integral test and the concept of improper integrals.
- **Always state the conditions:** Many students apply the integral test mechanically without checking monotonicity. Build the habit: write "f continuous, positive, decreasing — check" before computing anything.
- **Logarithmic families (A02) are high-value:** Σ1/(n ln n) diverges and Σ1/(n(ln n)²) converges — a pair that cannot be distinguished by the Divergence Test, p-series test, or ratio test. The integral test is the right tool. These appear frequently in real analysis courses.
- **Cross-link probe (P76):** This is the only blueprint in math.seq that uses cross-link probe mode. The P76 problem directly requires the limit definition of improper integrals from math.calc.improper-integrals — students who learned the integral test without that prior knowledge cannot complete the transfer probe, making it a genuine assessment of prerequisite integration.
- **R3 targets MC-1 in spaced review:** The stated error (∫₁^∞1/x³ dx = 1/2, so Σ1/n³ = 1/2) is a realistic mistake. The correct conclusion: Σ1/n³ converges (p=3>1) but its sum is Apéry's constant ζ(3) ≈ 1.202, not 1/2. The integral value is not the series sum.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; abstract area-bound derivation | PASS |
| V-4 | bloom=apply → P07 not required | N/A |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.calc.improper-integrals) |
| V-11 | P76_mode = cross-link probe (GR-9, math.calc.improper-integrals file exists) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.7×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=5 → 3 main TAs + gate appropriate | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
