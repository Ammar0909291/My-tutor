<!-- BLUEPRINT: math.prob.variance -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Variance
**Concept ID:** `math.prob.variance`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.variance |
| name | Variance |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.prob.expected-value |
| cross_links | — |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.expected-value**: E[X] = Σx·P(X=x) (discrete) or ∫x·f(x)dx (continuous); E[X] as center of mass of the distribution

### Target Knowledge State
Student can compute Var(X) = E[X²] − (E[X])² for both discrete and continuous RVs, interpret variance as spread around the mean, and apply the scaling and shift rules: Var(aX+b) = a²·Var(X).

### Conceptual Obstacles
1. Computing E[X²] but forgetting to subtract (E[X])² — writing Var(X) = E[X²] instead of E[X²] − (E[X])²
2. Confusing Var(X) with standard deviation σ = √Var(X) — reporting σ as the variance
3. Believing that adding a constant shifts the variance: Var(X+c) = Var(X)+c (incorrect); the correct rule is Var(X+c) = Var(X)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | VARIANCE-IS-E[X²] | Student computes E[X²] and reports it as Var(X), omitting the subtraction of (E[X])² | Any Var(X) computation where E[X] ≠ 0 |
| MC-2 | VARIANCE-IS-STANDARD-DEVIATION | Student computes √(E[X²]−(E[X])²) and calls the result the variance; confuses σ with σ² | When the problem asks for Var(X) but student takes the square root |
| MC-3 | SHIFT-CHANGES-VARIANCE | Student writes Var(X+c) = Var(X)+c or Var(X+c) = Var(X+c); does not know that a constant shift does not change spread | Linear transform problems Var(aX+b) |

**Foundational Misconception:** MC-1 (VARIANCE-IS-E[X²]) — the most frequent computational error; must be explicitly flagged in A01 and reinforced in A02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** Pictorial (P) — proficient learner.

**Scaffolding sequence:**
1. **A01 P03 ANALOGY BRIDGE** — connect "spread from center" (visually: distribution width vs. balance point) to the squared-deviation formula; introduce both definition Var = E[(X−μ)²] and shortcut Var = E[X²] − μ²
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: discrete PMF (apply shortcut); WE2: continuous Uniform (integral + formula cross-check)
3. **A03 P91 Gate** — mastery assessment

**V-3 (CPA Concrete stage):** N/A — proficient learner enters at Pictorial stage.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Spread-from-Center Analogy

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Build intuition for variance as average squared distance from mean; introduce both formulas; address MC-1

---

**[P03 — ANALOGY BRIDGE]**

*Source domain (familiar):* Two classes have the same average test score of 70.

- Class A scores: {70, 70, 70, 70} — all identical, zero spread
- Class B scores: {50, 60, 80, 90} — same mean, wide spread

The mean alone does not describe the data. We need a measure of how far values deviate from the mean.

*Bridge:* Instead of average deviation (which sums to zero), we square each deviation so negatives don't cancel.

*Target domain (new):* **Variance = average squared deviation from mean**

**Definition formula:**
Var(X) = E[(X−μ)²] = Σ (xᵢ−μ)²·P(X=xᵢ)   (discrete)
                    = ∫ (x−μ)² f(x) dx         (continuous)

**Computational shortcut (algebra: expand (X−μ)²):**
Var(X) = **E[X²] − (E[X])²**

*Pictorial — two distributions with the same mean (μ=0):*

```
Low variance (tight):     High variance (wide):
    ▲                          ▲
    │ █                        │  █
    │█████                     │ █████
    │███████                   │██████████
────┼────────── x          ────┼────────── x
   -1  0  1                 -3  0   3
```

**Key separation (MC-1 antidote):**
- E[X²] is the average of X-squared — it is positive even when E[X]=0
- Var(X) = E[X²] − (E[X])² — always subtract (E[X])²
- They are equal only when E[X]=0

**Linear transform rules:**
| Transform | Variance rule |
|-----------|--------------|
| X + c | Var(X+c) = Var(X) — shift does not change spread |
| aX | Var(aX) = a²·Var(X) — scale squares |
| aX + b | Var(aX+b) = a²·Var(X) |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X has E[X]=3 and E[X²]=13. What is Var(X)?

(A) 13
(B) 13 − 3 = 10
(C) 13 − 9 = 4
(D) √(13−9) = 2

*Branch CORRECT (C):* Var(X) = E[X²] − (E[X])² = 13 − 3² = 13 − 9 = 4. ✓ Note that (D) gives σ = 2, which is the standard deviation — not the variance. Proceed to A02.

*Branch PARTIAL:* You may have subtracted E[X] instead of (E[X])². The formula requires squaring the mean: Var(X) = 13 − 3² = 13 − 9 = 4. Proceed to A02.

*Branch INCORRECT (A):* Answer A gives E[X²] = 13, not Var(X). You must subtract (E[X])² = 9. Var(X) = 13 − 9 = 4. This is the most common error (MC-1). Proceed to A02.

*Branch NO_RESPONSE:* Var(X) = E[X²] − (E[X])². Here E[X²]=13, E[X]=3: Var(X) = 13 − 9 = 4. Always subtract the square of the mean. Proceed to A02.

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Apply both formulas step-by-step; connect continuous case to integral; address MC-2 and MC-3

---

**[P07 — WORKED EXAMPLE PAIR]**

**Worked Example 1 — Discrete PMF**

*Problem:* X has PMF: P(X=0)=1/4, P(X=2)=1/2, P(X=4)=1/4. Find Var(X).

*Step 1 — Find E[X]:*
E[X] = 0(1/4) + 2(1/2) + 4(1/4) = 0 + 1 + 1 = **2**

*Step 2 — Find E[X²]:*
E[X²] = 0²(1/4) + 2²(1/2) + 4²(1/4) = 0 + 2 + 4 = **6**

*Step 3 — Apply shortcut:*
Var(X) = E[X²] − (E[X])² = 6 − 2² = 6 − 4 = **2**

*Standard deviation:* σ = √Var(X) = √2 ≈ 1.41 (note: the variance is 2, not √2)

---

**Worked Example 2 — Continuous Uniform U(0, 4)**

*Problem:* X ~ U(0, 4), f(x) = 1/4 on [0, 4]. Find Var(X).

*Step 1 — Find E[X]:*
E[X] = (0+4)/2 = **2** (by symmetry)

*Step 2 — Find E[X²] via integral:*
E[X²] = ∫₀⁴ x² · (1/4) dx = (1/4)[x³/3]₀⁴ = (1/4)(64/3) = **16/3**

*Step 3 — Apply shortcut:*
Var(X) = E[X²] − (E[X])² = 16/3 − 4 = 16/3 − 12/3 = **4/3**

*Cross-check with Uniform formula:* Var[U(a,b)] = (b−a)²/12 = 16/12 = 4/3 ✓

*Linear transform example:* Let Y = 3X + 1. Then:
E[Y] = 3E[X]+1 = 7;  Var(Y) = 3²·Var(X) = 9·(4/3) = **12**
Note that the constant +1 contributes nothing to variance (MC-3 addressed).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Var(X) = 16. Find Var(2X − 5).

(A) 32 − 5 = 27
(B) 4 · 16 = 64
(C) 4 · 16 − 5 = 59
(D) 2 · 16 = 32

*Branch CORRECT (B):* Var(2X−5) = 2²·Var(X) = 4·16 = 64. ✓ The constant −5 does not affect variance; only the coefficient 2 matters, and it contributes as 2² = 4. Proceed to A03.

*Branch PARTIAL:* You applied the scaling rule but may have included the constant. Var(aX+b) = a²·Var(X) — constants b vanish. Here: 2²·16 = 64. Proceed to A03.

*Branch INCORRECT (A, C, or D):* Var(aX+b) = a²·Var(X). Here a=2, so the multiplier is a²=4, not a=2. Constants b shift the distribution but leave spread unchanged. Var(2X−5) = 4·16 = 64. Proceed to A03.

*Branch NO_RESPONSE:* Var(aX+b) = a²·Var(X). Var(2X−5) = 2²·Var(X) = 4·16 = 64. The constant −5 has no effect on variance. Proceed to A03.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Show all work. Use the shortcut formula Var(X) = E[X²] − (E[X])².*

**Problem 1.** X has PMF: P(X=−1)=1/2, P(X=1)=1/2. Find Var(X).

**Problem 2.** X has PMF: P(X=0)=0.3, P(X=2)=0.4, P(X=5)=0.3. Find E[X] and Var(X).

**Problem 3.** Var(X) = 9. Find:
(a) Var(3X + 7)
(b) Var(−X)
(c) Var(X − 4)

**Problem 4.** X ~ U(2, 8). Find Var(X) using both:
(a) The Uniform variance formula (b−a)²/12
(b) The integral shortcut E[X²] − (E[X])²

---

**[P55 — SCORE]**

*Answers:*

1. E[X] = −1(1/2)+1(1/2) = 0; E[X²] = 1(1/2)+1(1/2) = 1; Var(X) = 1 − 0 = **1**

2. E[X] = 0(0.3)+2(0.4)+5(0.3) = 0.8+1.5 = **2.3**
   E[X²] = 0(0.3)+4(0.4)+25(0.3) = 1.6+7.5 = **9.1**
   Var(X) = 9.1 − (2.3)² = 9.1 − 5.29 = **3.81**

3. (a) Var(3X+7) = 9·Var(X) = **81**
   (b) Var(−X) = (−1)²·Var(X) = Var(X) = **9** (flipping sign doesn't change spread)
   (c) Var(X−4) = Var(X) = **9** (constant shift)

4. (a) (8−2)²/12 = 36/12 = **3**
   (b) E[X]=(2+8)/2=5; E[X²]=(1/6)∫₂⁸x²dx=(1/6)[x³/3]₂⁸=(1/6)(512/3−8/3)=(1/6)(504/3)=28; Var=28−25=**3** ✓

Score 1 point per problem (P77 total: 4 points). Problem 2: both E[X] and Var must be correct for the point.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links = [])*

*Problem:* A fair game pays X dollars, where X=1, 3, or 5 each with probability 1/3.

(a) Find E[X] and Var(X).

(b) Define Y = 2X − 1 (double the winnings minus $1 entry fee). Find E[Y] and Var(Y) using the linear transform rules — do NOT recompute from the PMF of Y.

(c) Which has more spread: X or Y? Justify using the variances.

*Expected answers:*

(a) E[X] = (1+3+5)/3 = **3** (equal probabilities, so arithmetic mean)
   E[X²] = (1+9+25)/3 = 35/3
   Var(X) = 35/3 − 9 = 35/3 − 27/3 = **8/3 ≈ 2.67**

(b) E[Y] = 2E[X]−1 = 2(3)−1 = **5**
   Var(Y) = 2²·Var(X) = 4·(8/3) = **32/3 ≈ 10.67**

(c) Y has more spread: Var(Y)=32/3 > Var(X)=8/3. The factor-of-2 scaling doubles the distances from the mean, and since variance squares the distances, Var(Y)=4·Var(X).

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all three parts correct).

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
| 4/5 | → Re-examine missed item; identify whether error is MC-1 (wrong formula) or MC-3 (shift rule); targeted repair |
| ≤ 3/5 | → Return to A01; re-engage spread analogy; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.prob.variance` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** `math.prob.covariance`, `math.prob.chebyshev`

Next concept recommendation: `math.prob.standard-deviation` (child node) or `math.prob.covariance` — both build directly on Var(X).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — VARIANCE-IS-E[X²] Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote Var(X)=E[X²]. The variance is not E[X²] — it is E[X²] minus the square of the mean. E[X²] measures average squared magnitude; variance measures average squared distance from the center."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* X is always equal to 5 (a constant RV: P(X=5)=1). What is Var(X)?
*Correct response:* E[X]=5, E[X²]=25. Var(X) = 25 − 5² = 25 − 25 = 0. A constant has zero variance. But E[X²]=25≠0 — showing E[X²] and Var(X) differ whenever E[X]≠0.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'Var(X)=E[X²]' → to: 'Var(X)=E[X²]−(E[X])².' The subtracted term (E[X])² centers the computation — it removes the contribution of the mean's own magnitude and leaves only the spread around it."

---

### Repair Action B02 — SHIFT-CHANGES-VARIANCE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You computed Var(X+c) ≠ Var(X). Adding a constant shifts every value of X by the same amount — all distances from the (new) mean stay exactly the same. The spread is unchanged."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Test scores X have Var(X)=100. The teacher adds 10 points to every score (Y=X+10). What is Var(Y)?
*Correct response:* Var(Y)=Var(X+10)=Var(X)=100. Adding 10 shifts the mean from E[X] to E[X]+10, but every score shifts by the same 10 — all deviations (X−μ) remain identical. No change in spread.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'Var(X+c) involves c' → to: 'Var(X+c)=Var(X); only multiplicative factors a affect variance as a².' Mnemonic: 'shifts don't spread, scales do.'"

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | X has PMF: P(X=1)=1/3, P(X=2)=1/3, P(X=3)=1/3. Find Var(X). |
| R2 | 3 days | X ~ U(0,6). Find Var(X) using both the formula and integration. |
| R3 | 7 days | If Var(X)=4, find Var(5X−3) and Var(−2X+1). |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | — |
| P76_mode | independence (cross_links = []) |
| Unlocks | math.prob.covariance, math.prob.chebyshev |
| Requires (Tier-1) | math.prob.expected-value |

**GR-8 compliance:** No cross-links to document.
**GR-9 compliance:** P76 uses an independent novel problem (fair game payoff) unrelated to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **Formula choice:** Teach the shortcut E[X²]−(E[X])² as the primary formula. The definition E[(X−μ)²] is important for intuition but produces messy arithmetic when μ is not a nice number. Students who learn the shortcut early make far fewer MC-1 errors.
- **Variance vs. standard deviation:** Explicitly label both σ² and σ in WE1 — call σ² the "variance" and σ the "standard deviation" — to prevent MC-2. Some students trust "σ" labels over numerical values.
- **Uniform cross-check:** As in the expected-value blueprint, the formula Var[U(a,b)]=(b−a)²/12 serves as a reliable verification tool. Using it in WE2 teaches the verification habit.
- **Problem 3(b) of P77:** Var(−X)=Var(X) is a subtle but important result — negating X mirrors the distribution but preserves all deviations. This preempts a common error in the covariance blueprint.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; concrete stage skipped for proficient | N/A |
| V-4 | bloom=apply → P07 present in main sequence | PASS (A02) |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P03, A02=P07) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A03) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, cross_links=[]) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=4 → lean structure (2 main TAs + gate) | PASS (A01, A02, A03=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
