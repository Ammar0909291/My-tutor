<!-- BLUEPRINT: math.prob.normal-distribution -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Normal Distribution
**Concept ID:** `math.prob.normal-distribution`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=6 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.normal-distribution |
| name | Normal Distribution |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.prob.continuous-distributions |
| cross_links | math.stats.normal-distribution (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.continuous-distributions**: Uniform U(a,b) and Exponential Exp(λ) PDFs; computing probabilities as areas; named distribution properties tables

### Target Knowledge State
Student can identify X ~ N(μ, σ²) by its parameters; interpret μ as the center and σ as the spread; standardize to Z = (X−μ)/σ ~ N(0,1); use the standard normal table (or symmetry rules) to compute P(X<x), P(X>x), and P(a<X<b); and apply the 68-95-99.7 empirical rule.

### Conceptual Obstacles
1. Confusing σ (standard deviation) with σ² (variance) when interpreting N(μ, σ²) — plugging σ² into a formula that expects σ
2. Standardizing in the wrong direction: computing Z=(μ−X)/σ instead of Z=(X−μ)/σ, reversing the tail
3. Forgetting that P(X>μ) = 0.5 for any Normal by symmetry — instead computing it from scratch or guessing 0

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SIGMA-VS-SIGMA-SQUARED | Student confuses σ and σ² when reading N(μ,σ²); for N(10,4) uses σ=4 (variance) instead of σ=√4=2 (standard deviation) in the Z formula | N(μ,σ²) with σ²≠1; any standardization step |
| MC-2 | STANDARDIZATION-SIGN-ERROR | Student computes Z=(μ−X)/σ (reversed) or divides by σ² instead of σ | Any Z-score computation, especially when x<μ |
| MC-3 | SYMMETRY-FORGOTTEN | Student does not use Normal symmetry; computes P(X>μ) from scratch or writes 0 | Probability questions involving the mean or symmetric intervals |

**Foundational Misconception:** MC-1 (SIGMA-VS-SIGMA-SQUARED) — arises immediately from the N(μ,σ²) notation; must be explicitly flagged before any computation.

---

## Component 3 — Scaffolding Protocol

**Entry point:** Pictorial (P) — proficient learner.

**Scaffolding sequence:**
1. **A01 P03 ANALOGY BRIDGE** — connect symmetric bell-shaped histograms (familiar from descriptive statistics) to the theoretical bell curve; introduce N(μ,σ²) notation and the standardization Z=(X−μ)/σ
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: standardize and read Z-table (one-sided probability); WE2: use symmetry and two-sided interval
3. **A03 P06 CONTRAST PAIR** — narrow vs. wide bell curves (varying σ); N(μ,σ²) vs. N(μ,4σ²); 68-95-99.7 empirical rule
4. **A04 P91 Gate** — mastery assessment

**V-3 (CPA Concrete stage):** N/A — proficient learner enters at Pictorial stage.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Bell Curve Analogy

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Connect familiar symmetric histograms to the Normal PDF; introduce notation and standardization; address MC-1 and MC-3

---

**[P03 — ANALOGY BRIDGE]**

*Source domain (familiar):* Heights of adult women in a country cluster near 165 cm, with fewer women much shorter or taller. If you make a histogram of 10,000 measurements, it looks bell-shaped and symmetric.

*Bridge:* The Normal distribution is the theoretical model for this bell shape. It is determined by exactly two parameters:
- **μ** = mean (center — the peak of the bell)
- **σ²** = variance (spread — controls how wide the bell is); **σ = √σ²** is the standard deviation

*Target domain (new):* **X ~ N(μ, σ²)**

PDF: f(x) = (1/(σ√(2π))) · exp(−(x−μ)²/(2σ²))

*Pictorial — three bell curves with same mean μ=0:*

```
f(x)
  │    σ=0.5 (narrow)
  │     ▲
  │    ███
  │   █████
  │──█████████─────── σ=1 (standard)
  │ ████████████
  │─────██████████████────── σ=2 (wide)
  └────────────────── x
        μ=0
```

**Key facts (derive from symmetry):**
- P(X < μ) = P(X > μ) = **0.5** (symmetric about μ)
- E[X] = μ; Var(X) = σ²

**N(μ, σ²) notation warning (MC-1):**
In "N(μ, σ²)", the second parameter is the **variance** σ². The standard deviation is σ = √σ².

| Notation | μ | σ² | σ |
|----------|---|---|---|
| N(5, 9) | 5 | 9 | 3 |
| N(0, 4) | 0 | 4 | 2 |
| N(10, 1) | 10 | 1 | 1 |

**Standardization:** To compute probabilities, transform to the **standard normal** Z ~ N(0, 1):

Z = (X − μ) / σ

Then P(X < x) = P(Z < z) where z = (x − μ)/σ, and P(Z < z) is read from the standard normal table (Φ(z)).

**Standard normal key values (memorize):**

| z | Φ(z) = P(Z < z) |
|---|-----------------|
| 0 | 0.5000 |
| 1 | 0.8413 |
| 2 | 0.9772 |
| 3 | 0.9987 |
| −1 | 0.1587 |
| −2 | 0.0228 |

Symmetry rule: **Φ(−z) = 1 − Φ(z)**

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X ~ N(10, 4). What is σ (the standard deviation)?

(A) σ = 4
(B) σ = √4 = 2
(C) σ = 4² = 16
(D) σ = 10

*Branch CORRECT (B):* In N(10, 4), the second parameter is σ²=4, so σ=√4=2. ✓ Always take the square root to get σ before using the Z formula. Proceed to A02.

*Branch PARTIAL:* You may have written σ=2 but been unsure why. In N(μ,σ²), the second parameter is always the variance σ². Here σ²=4 → σ=√4=2. Proceed to A02.

*Branch INCORRECT (A):* Answer A uses σ=4, confusing the variance with the standard deviation. N(10, 4) means μ=10 and σ²=4, so σ=√4=2. This is critical: using σ=4 in the Z formula gives wrong Z-scores. Proceed to A02.

*Branch NO_RESPONSE:* N(μ,σ²): the second parameter is the variance. σ=√σ²=√4=2. Memorize: "N of mu comma sigma-squared." Proceed to A02.

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Apply Z-standardization and table lookup; use symmetry for two-sided intervals; address MC-2

---

**[P07 — WORKED EXAMPLE PAIR]**

**Worked Example 1 — One-Sided Probability**

*Problem:* X ~ N(50, 25) (μ=50, σ²=25, σ=5). Find P(X < 60).

*Step 1 — Standardize:* Z = (60 − 50)/5 = **2**

*Step 2 — Table lookup:* P(Z < 2) = Φ(2) = **0.9772**

So P(X < 60) = **0.9772** — about 97.7% of values fall below 60.

*Also find P(X > 60):* P(X > 60) = 1 − 0.9772 = **0.0228**

*Also find P(X < 45):* Z = (45−50)/5 = −1; P(Z < −1) = Φ(−1) = 1−Φ(1) = 1−0.8413 = **0.1587**
Note Z is negative because 45 is below the mean (MC-2 addressed: X−μ = 45−50 = −5, not +5).

---

**Worked Example 2 — Symmetric Two-Sided Interval**

*Problem:* X ~ N(100, 16) (μ=100, σ=4). Find P(92 < X < 108).

*Step 1 — Standardize both endpoints:*
Z₁ = (92 − 100)/4 = −8/4 = **−2**
Z₂ = (108 − 100)/4 = 8/4 = **2**

*Step 2 — Compute area between:*
P(−2 < Z < 2) = Φ(2) − Φ(−2) = 0.9772 − 0.0228 = **0.9544**

*Alternative using symmetry:* P(|Z| < 2) = 2·Φ(2) − 1 = 2(0.9772) − 1 = 0.9544 ✓

*Interpretation:* About 95.4% of values lie within 2 standard deviations of the mean (the "95 rule").

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X ~ N(0, 1) (already standard normal). Find P(X > 1).

(A) 1 − Φ(1) = 1 − 0.8413 = 0.1587
(B) Φ(1) = 0.8413
(C) Φ(−1) = 0.1587 (by symmetry)
(D) Both A and C, since they give the same value

*Branch CORRECT (D):* Both A (direct complement) and C (symmetry) give 0.1587. P(X>1) = 1−Φ(1) = 0.1587 = Φ(−1). These two approaches are equivalent by symmetry of N(0,1). Proceed to A03.

*Branch PARTIAL:* You found 0.1587 but may not have recognized that both methods are valid. P(X>1)=1−Φ(1) and Φ(−1)=1−Φ(1) always — the symmetry rule Φ(−z)=1−Φ(z) makes them identical. Proceed to A03.

*Branch INCORRECT (B):* That gives P(X<1)=0.8413, the left-tail probability. For the right tail P(X>1): subtract from 1 → 1−0.8413=0.1587. Proceed to A03.

*Branch NO_RESPONSE:* P(X>1)=1−P(X≤1)=1−Φ(1)=1−0.8413=0.1587. Equivalently, Φ(−1)=0.1587 by symmetry. Proceed to A03.

---

### Teaching Action A03 — Shape Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish N(μ₁,σ₁²) from N(μ₂,σ₂²); introduce 68-95-99.7 rule; reinforce MC-3 (symmetry)

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Same Mean, Different Spread**

| | X ~ N(0, 1) | Y ~ N(0, 4) |
|--|------------|------------|
| μ | 0 | 0 |
| σ² | 1 | 4 |
| σ | 1 | 2 |
| P(−1 < · < 1) | Φ(1)−Φ(−1)=0.6827 | Φ(0.5)−Φ(−0.5)≈0.383 |
| Appearance | Narrow bell | Wide bell |
| P(· > 0) | 0.5 | 0.5 |

*Note:* P(·>μ)=0.5 for BOTH — symmetry applies regardless of σ (MC-3 addressed).

**Contrast 2 — 68-95-99.7 Empirical Rule**

For X ~ N(μ, σ²):

| Range | Coverage | Z-range |
|-------|----------|---------|
| μ ± 1σ | ≈ 68.27% | −1 to +1 |
| μ ± 2σ | ≈ 95.45% | −2 to +2 |
| μ ± 3σ | ≈ 99.73% | −3 to +3 |

*Application:* For N(100, 25) (σ=5):
- 68% of values lie in [95, 105]
- 95% of values lie in [90, 110]
- 99.7% of values lie in [85, 115]

Values beyond 3σ from the mean are extremely rare (<0.3%).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X ~ N(20, 9) (σ=3). Using only the 68-95-99.7 rule (no Z-table), estimate P(17 < X < 23).

(A) ≈ 0.50 (within 1σ on one side)
(B) ≈ 0.68 (within 1σ on both sides)
(C) ≈ 0.95 (within 2σ)
(D) ≈ 0.32 (outside 1σ)

*Branch CORRECT (B):* 17 = 20 − 3 = μ − 1σ and 23 = 20 + 3 = μ + 1σ. The interval [μ−σ, μ+σ] contains ≈68% of values. ✓ Proceed to A04.

*Branch PARTIAL:* You identified the correct interval as 1σ wide but may have given the wrong percentage. The 68-95-99.7 rule: 1σ → 68%, 2σ → 95%, 3σ → 99.7%. Proceed to A04.

*Branch INCORRECT (A or D):* 17 and 23 are each exactly 1σ from the mean in opposite directions. The symmetric interval (μ±1σ) covers ≈68% of the distribution, not 50% or 32%. Proceed to A04.

*Branch NO_RESPONSE:* 17=μ−σ and 23=μ+σ → one standard deviation on each side → 68-95-99.7 rule → ≈68% coverage. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Use the standard normal table values: Φ(0)=0.5, Φ(1)=0.8413, Φ(2)=0.9772, Φ(3)=0.9987.*

**Problem 1.** X ~ N(0, 1). Find P(−1 < X < 2).

**Problem 2.** X ~ N(80, 25) (σ = 5). Find P(X > 90).

**Problem 3.** X ~ N(100, 4) (σ = 2). Find P(96 < X < 102).

**Problem 4.** X ~ N(50, 100) (σ = 10). Using the empirical rule:
(a) What interval contains approximately 95% of values?
(b) What is P(X > 50)?

---

**[P55 — SCORE]**

*Answers:*

1. P(−1<X<2) = Φ(2)−Φ(−1) = 0.9772 − (1−0.8413) = 0.9772 − 0.1587 = **0.8185**

2. Z=(90−80)/5=2; P(X>90)=P(Z>2)=1−Φ(2)=1−0.9772=**0.0228**

3. Z₁=(96−100)/2=−2; Z₂=(102−100)/2=1;
   P(96<X<102)=Φ(1)−Φ(−2)=0.8413−0.0228=**0.8185**

4. (a) μ±2σ = 50±20 → [30, 70] ≈ 95% of values
   (b) P(X>50)=P(X>μ)=**0.5** (by symmetry)

Score 1 point per problem (P77 total: 4 points). Problem 3 and 4: both sub-parts must be correct.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links NOT Tier-1)*

*Problem:* IQ scores are modeled as X ~ N(100, 225) (μ=100, σ²=225, σ=15).

(a) What is σ? (Read carefully from the N(μ,σ²) notation.)

(b) Find P(X < 115). (Standardize, then use the table.)

(c) Find P(85 < X < 130).

(d) About what percentage of people have IQ above 130? What about above 145?

*Expected answers:*

(a) σ² = 225 → **σ = 15**

(b) Z = (115−100)/15 = 1; P(X<115) = Φ(1) = **0.8413**

(c) Z₁ = (85−100)/15 = −1; Z₂ = (130−100)/15 = 2;
   P(85<X<130) = Φ(2)−Φ(−1) = 0.9772−0.1587 = **0.8185**

(d) P(X>130): Z=(130−100)/15=2; P(Z>2)=1−0.9772=**0.0228 ≈ 2.3%**
   P(X>145): Z=(145−100)/15=3; P(Z>3)=1−0.9987=**0.0013 ≈ 0.13%**

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all four parts correct).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.9 × 5⌉ = 5). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Identify missed item; if MC-1 → B01 repair; if complement/symmetry error → B02 repair; targeted re-explanation |
| ≤ 3/5 | → Return to A01; re-engage bell curve analogy and notation; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.prob.normal-distribution` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** `math.prob.clt`

Next concept recommendation: `math.prob.clt` (Central Limit Theorem) — explains why the Normal arises so universally.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SIGMA-VS-SIGMA-SQUARED Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used σ² as the standard deviation in the Z formula. In N(μ,σ²), the second parameter is the variance — not the standard deviation. The Z formula requires σ=√σ², not σ² itself."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* X ~ N(5, 16). A student writes Z=(X−5)/16. What error did they make?
*Correct response:* They used σ²=16 where σ=√16=4 is needed. Correct: Z=(X−5)/4. The denominator is always σ (standard deviation), never σ² (variance).

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'divide by σ²' → to: 'divide by σ=√(second parameter).' Mnemonic: 'N of mu comma sigma-squared — take the square root before dividing.' Always compute σ=√σ² as the first step."

---

### Repair Action B02 — STANDARDIZATION-SIGN-ERROR Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You computed Z=(μ−X)/σ or made a sign error in standardization. The Z formula is always Z=(X−μ)/σ — data value X minus the mean μ. Reversing gives the wrong sign, which reflects into the wrong tail."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* X ~ N(10, 1). Find P(X<8).
Student writes Z=(10−8)/1=2 → P(Z<2)=0.9772. What is wrong?
*Correct response:* Z=(X−μ)/σ=(8−10)/1=**−2** (negative, since 8 is below the mean). P(X<8)=Φ(−2)=0.0228. The reversed sign gives the complementary probability.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'Z=(μ−X)/σ' → to: 'Z=(X−μ)/σ, data minus mean.' When X<μ, Z is negative and you expect a probability below 0.5. If your Z is positive for a value below the mean, you've reversed the formula."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | X ~ N(0, 1). Find P(X < −2) and P(−1 < X < 1). |
| R2 | 3 days | X ~ N(70, 100) (σ=10). Find P(X > 80) and P(50 < X < 90). |
| R3 | 7 days | X ~ N(μ, σ²). If P(X<μ+2σ)=0.9772, what is P(X>μ+2σ)? What is P(X<μ−2σ)? Use symmetry only. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.stats.normal-distribution (NOT Tier-1) |
| P76_mode | independence (cross-linked concept is NOT Tier-1) |
| Unlocks | math.prob.clt |
| Requires (Tier-1) | math.prob.continuous-distributions |

**GR-8 compliance:** cross_links = [math.stats.normal-distribution]; NOT Tier-1 → P76 uses independence mode.
**GR-9 compliance:** P76 uses an independent novel problem (IQ scores) unrelated to the non-Tier-1 cross-linked concept.

---

## Component 8 — Teaching Notes

- **Standard normal table scope:** This blueprint uses four Z-values (0, ±1, ±2, ±3) that students are expected to memorize. Full table lookup is introduced conceptually but the gate only requires these key values. The CLT blueprint can extend to arbitrary Z-values.
- **Notation variability:** Some textbooks write N(μ, σ) (standard deviation, not variance) or use different parameterizations for the Normal. Alert students to check the convention in their textbook. This blueprint uses the N(μ,σ²) convention throughout.
- **No closed-form CDF:** The Normal CDF has no algebraic closed form — all probability computations require the Z-table (or software). Students who want to derive probabilities analytically will fail. Make this explicit.
- **68-95-99.7 for estimation:** The empirical rule is introduced in A03 as a fast estimation tool. Problems requiring exact table values are in the gate; problems using the rule are in P49/A03 to maintain accessibility.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; concrete stage skipped for proficient | N/A |
| V-4 | bloom=apply → P07 present in main sequence | PASS (A02) |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P03, A02=P07, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.stats.normal-distribution, NOT T1) |
| V-11 | P76_mode = independence (GR-9, cross-link NOT Tier-1) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=6 → standard structure (3 main TAs + gate) | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
