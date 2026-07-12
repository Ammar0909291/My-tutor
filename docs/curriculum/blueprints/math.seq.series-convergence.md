<!-- BLUEPRINT: math.seq.series-convergence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Convergence of Series
**Concept ID:** `math.seq.series-convergence`
**KG Fields:** difficulty=advanced | bloom=analyze | estimated_hours=20 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.series-convergence |
| name | Convergence of Series |
| difficulty | advanced |
| bloom | analyze |
| estimated_hours | 20 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.seq.partial-sums, math.seq.convergent |
| cross_links | math.calc.power-series (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.partial-sums**: Sₙ = a₁+a₂+⋯+aₙ; partial sums as a new sequence
- **math.seq.convergent**: sequence {aₙ} converges iff lim_{n→∞} aₙ = L for some finite L

### Target Knowledge State
Student understands that a series Σaₙ converges iff its sequence of partial sums {Sₙ} converges; can apply the geometric series formula (Σarⁿ converges iff |r|<1, sum=a/(1−r)); can use the Divergence Test (if aₙ↛0 then Σaₙ diverges); and can analyze the harmonic series as a canonical example of a divergent series whose terms tend to zero.

### Conceptual Obstacles
1. Believing aₙ→0 implies Σaₙ converges — the harmonic series Σ1/n diverges even though 1/n→0; the Divergence Test gives a sufficient condition for divergence, not a sufficient condition for convergence
2. Confusing Sₙ (the nth partial sum, a finite number) with Σaₙ (the infinite series, a limit); treating any large partial sum as "the sum"
3. For geometric series, thinking |r|<1 requires r>0; negative r with |r|<1 (e.g., r=−1/2) still yields a convergent alternating geometric series

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | TERMS-TO-ZERO-IMPLIES-CONVERGENT | Student concludes Σaₙ converges because aₙ→0; applies to harmonic series (1/n→0 but Σ1/n diverges) | Any series where the terms visibly decrease to 0 |
| MC-2 | PARTIAL-SUM-AS-TOTAL-SUM | Student identifies Sₙ for a large n as the sum of the series; does not take the limit; confuses a finite approximation with the exact infinite sum | Series problems asking for the exact sum or convergence |
| MC-3 | GEOMETRIC-RATIO-MUST-BE-POSITIVE | Student requires r>0 for convergence; overlooks that alternating geometric series with |r|<1 also converge | Geometric series with negative common ratio, e.g., Σ(−1/2)ⁿ |

**Foundational Misconception:** MC-1 (TERMS-TO-ZERO-IMPLIES-CONVERGENT) — leads to incorrect convergence conclusions for the harmonic series and many similar cases; addressed with the harmonic series counterexample in A02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: bouncing ball (physical infinite sum with finite total); P: plot of partial sums converging to a limit; A: formal definition Sₙ=Σᵢ₌₁ⁿaᵢ, Σaₙ converges iff lim Sₙ exists
2. **A02 P04 PATTERN INDUCTION** — compute partial sums for geometric series (closed form telescopes), then for harmonic series (no upper bound); induce the Divergence Test from the contrapositive
3. **A03 P06 CONTRAST PAIR** — convergent geometric (|r|<1) vs. divergent (|r|≥1); Divergence Test: what it CAN conclude vs. CANNOT conclude; harmonic vs. geometric
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Bouncing Ball to Formal Definition

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the series concept in physical intuition; introduce partial sums and the convergence definition; address MC-2

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (bouncing ball):**

A ball is dropped from height 1 metre. Each bounce reaches 1/2 of the previous height. The ball bounces forever (in this ideal model).

Total distances per phase: 1, 1/2, 1/2, 1/4, 1/4, 1/8, 1/8, ...

Total distance = 1 + 2(1/2) + 2(1/4) + 2(1/8) + ⋯ = 1 + 1 + 1/2 + 1/4 + ⋯

This physical total is finite even though infinitely many bounces occur. The sum converges.

**Stage P — Pictorial (partial sums plot):**

For Σ(1/2)ⁿ (n=1,2,3,...):

| n | aₙ | Sₙ |
|---|----|----|
| 1 | 1/2 | 0.5 |
| 2 | 1/4 | 0.75 |
| 3 | 1/8 | 0.875 |
| 4 | 1/16 | 0.9375 |
| 5 | 1/32 | 0.96875 |
| ∞ | → 0 | → **1** |

```
Sₙ
 1 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ limit
   •
  •
 •
•                            n
1   2   3   4   5   ...
```

The partial sums approach 1 as n→∞ — the series converges to 1 (MC-2 antidote: the series equals the limit of partial sums, not any finite Sₙ).

**Stage A — Algebraic (formal definition):**

**Definition:** The series Σₙ₌₁^∞ aₙ **converges** if the sequence of partial sums {Sₙ} converges:
Sₙ = a₁ + a₂ + ⋯ + aₙ,    Σaₙ = lim_{n→∞} Sₙ

If {Sₙ} diverges, the series **diverges**.

**Geometric Series (the most important convergent type):**

Σₙ₌₀^∞ arⁿ = a + ar + ar² + ar³ + ⋯

Partial sum formula: Sₙ = a(1−rⁿ⁺¹)/(1−r)  for r≠1

Convergence: If **|r| < 1**, then rⁿ→0 as n→∞, so:
**Σₙ₌₀^∞ arⁿ = a/(1−r)**

If |r| ≥ 1, the series diverges.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Does Σₙ₌₀^∞ (2/3)ⁿ converge? If so, find the sum.

(A) Diverges, since the partial sums grow
(B) Converges; sum = 1/(1 − 2/3) = 3
(C) Converges; sum = (2/3)/(1 − 2/3) = 2
(D) Converges; sum = 2/3 (just the first term)

*Branch CORRECT (B):* r = 2/3, |r| < 1 → converges. Sum = a/(1−r) = 1/(1−2/3) = 1/(1/3) = **3**. (First term a=1 since n starts at 0.) ✓ Proceed to A02.

*Branch PARTIAL:* You identified convergence correctly but may have computed the first term as 2/3 rather than 1 (the n=0 term is (2/3)⁰=1). Sum = 1/(1−2/3) = 3. Proceed to A02.

*Branch INCORRECT (A):* |r|=2/3<1, so the series converges — partial sums approach a finite limit. Divergence occurs when |r|≥1. Sum = a/(1−r) = 1/(1/3) = 3. Proceed to A02.

*Branch NO_RESPONSE:* |r|=2/3<1 → converges. Sum = a/(1−r): first term a=(2/3)⁰=1, so sum=1/(1−2/3)=3. Proceed to A02.

---

### Teaching Action A02 — Pattern Induction: Geometric and Harmonic

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Derive convergence/divergence patterns from partial sum calculations; discover the Divergence Test; address MC-1

---

**[P04 — PATTERN INDUCTION]**

**Pattern 1 — Geometric series Sₙ formula:**

For Σₙ₌₀^{N} arⁿ: multiply Sₙ by r → rSₙ = ar+ar²+⋯+arᴺ⁺¹. Subtract:
Sₙ − rSₙ = a − arᴺ⁺¹ → Sₙ(1−r) = a(1−rᴺ⁺¹) → **Sₙ = a(1−rᴺ⁺¹)/(1−r)**

As N→∞: if |r|<1, rᴺ⁺¹→0 → sum = **a/(1−r)** ✓

**Pattern 2 — Harmonic series Σ1/n diverges (famous result):**

Partial sums grow without bound. Key grouping argument:
S₁=1, S₂=1+1/2=3/2, S₄=S₂+1/3+1/4>3/2+1/4+1/4=2, S₈>2+4·(1/8)=2+1/2=5/2, S_{2ᵏ}>1+k/2→∞

```
n         1  2  3  4  5  6  7  8  ...
1/n       1  1/2  1/3  1/4  1/5  1/6  1/7  1/8  ...
Sₙ        1  1.5  1.83  2.08  2.28  2.45  2.59  2.71  ...
```

Even though 1/n→0, the partial sums grow logarithmically and diverge.

**Divergence Test (induced from Harmonic series pattern):**

Observation: If Σaₙ converges, then lim Sₙ = L and lim S_{n-1} = L, so aₙ = Sₙ − S_{n-1} → L−L = 0.

**Divergence Test (Contrapositive form used in practice):**
If lim_{n→∞} aₙ ≠ 0 (or the limit doesn't exist), then Σaₙ **diverges**.

*Critical limitation (MC-1):* The Divergence Test only proves divergence. It CANNOT prove convergence. If aₙ→0, the series may converge OR diverge (harmonic: 1/n→0 but Σ1/n diverges).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Does the Divergence Test definitively determine whether Σ1/√n converges?

(A) Yes — since 1/√n → 0, the test confirms Σ1/√n converges
(B) No — since 1/√n → 0, the Divergence Test is inconclusive; we need another test
(C) Yes — since 1/√n → 0 slowly, the test confirms divergence
(D) Yes — since 1/√n → 0, but faster than 1/n, it converges

*Branch CORRECT (B):* The Divergence Test only confirms divergence when aₙ↛0. Since 1/√n→0, the test is **inconclusive**. (In fact Σ1/√n diverges — a p-series with p=1/2<1 — but you need a different test to prove it.) Proceed to A03.

*Branch PARTIAL:* You correctly identified the Divergence Test is inconclusive but may be unsure about the series's actual behavior. Σ1/√n is a p-series with p=1/2<1: divergent. The Divergence Test is powerless here; the Integral Test or Comparison Test is needed. Proceed to A03.

*Branch INCORRECT (A or D):* The Divergence Test says: aₙ→0 → test gives no information. It does NOT say "aₙ→0 → series converges." The harmonic series is the canonical counterexample: 1/n→0 but Σ1/n diverges. Proceed to A03.

*Branch NO_RESPONSE:* Divergence Test: if aₙ→0, the test is inconclusive. Only when aₙ↛0 does the test conclude divergence. For 1/√n→0, we cannot conclude from the Divergence Test alone — another test is required. Proceed to A03.

---

### Teaching Action A03 — Convergent vs. Divergent Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Compare all three geometric-series cases; contrast Divergence Test capability; address MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Geometric Series: Three Cases**

| Case | Example | Condition | Conclusion |
|------|---------|-----------|-----------|
| Convergent | Σ(1/2)ⁿ | r=1/2, |r|<1 | Sum = a/(1−r) = 2 |
| Convergent, alternating | Σ(−1/3)ⁿ | r=−1/3, |r|=1/3<1 | Sum = 1/(1+1/3) = 3/4 |
| Divergent | Σ2ⁿ | r=2, |r|>1 | aₙ→∞, diverges |
| Divergent (boundary) | Σ1ⁿ = Σ1 | r=1 | Sₙ=n→∞, diverges |
| Divergent (boundary) | Σ(−1)ⁿ | r=−1, |r|=1 | aₙ oscillates ±1, diverges |

*MC-3 addressed:* Negative r with |r|<1 (e.g., r=−1/3) gives a convergent alternating geometric series. Only |r|≥1 diverges.

**Contrast 2 — Divergence Test Capability**

| Given | Divergence Test says | Can we conclude? |
|-------|---------------------|-----------------|
| aₙ = n/(n+1) → 1 ≠ 0 | Σaₙ **diverges** | YES |
| aₙ = 1/n → 0 | **Inconclusive** | NO (need another test; Σ1/n actually diverges) |
| aₙ = 1/n² → 0 | **Inconclusive** | NO (need another test; Σ1/n² actually converges to π²/6) |
| aₙ = 1/(2ⁿ) → 0 | **Inconclusive** | NO (Divergence Test alone cannot prove convergence; geometric series test proves it converges) |

*Summary:* The Divergence Test is a quick **divergence detector** (if aₙ↛0, done — it diverges). It is powerless as a **convergence detector**.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Classify each series using the Divergence Test alone (converges / diverges / inconclusive):

(I) Σₙ₌₁^∞ n²/(n²+1)
(II) Σₙ₌₁^∞ 1/n³
(III) Σₙ₌₁^∞ (0.99)ⁿ

(A) I diverges; II inconclusive; III inconclusive
(B) I diverges; II converges; III converges
(C) I inconclusive; II inconclusive; III inconclusive
(D) I diverges; II diverges; III converges

*Branch CORRECT (A):* (I) aₙ=n²/(n²+1)→1≠0 → **diverges**. (II) aₙ=1/n³→0 → **inconclusive** (actually converges, but Divergence Test cannot say so). (III) aₙ=(0.99)ⁿ→0 → **inconclusive** (actually converges as geometric with r=0.99; but Divergence Test alone is inconclusive). ✓ Proceed to A04.

*Branch PARTIAL:* You classified (I) correctly. For (II) and (III): both have terms→0, so the Divergence Test gives no information. They happen to converge (p-series p=3>1, and geometric |r|<1) but a different test is needed to confirm that. Proceed to A04.

*Branch INCORRECT (B, C, D):* The Divergence Test concludes divergence only when aₙ↛0. For series (II) and (III), terms→0, so the test is inconclusive — not "convergent." That inference requires additional tests not covered here. Proceed to A04.

*Branch NO_RESPONSE:* Divergence Test: converge? can't say from this test alone (terms→0). Diverge? YES if terms↛0. (I): terms→1≠0 → diverges. (II) and (III): terms→0 → inconclusive. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*For each series: state whether it converges or diverges, identify the test or formula used, and find the sum if convergent.*

**Problem 1.** Σₙ₌₀^∞ (3/4)ⁿ

**Problem 2.** Σₙ₌₀^∞ (−1/2)ⁿ

**Problem 3.** Σₙ₌₁^∞ n/(n+2)

**Problem 4.** Find S₄ (the 4th partial sum) of Σₙ₌₀^∞ (1/3)ⁿ. Then state the exact infinite sum and compare.

---

**[P55 — SCORE]**

*Answers:*

1. Geometric, r=3/4, |r|<1 → **converges**; sum = 1/(1−3/4) = **4**

2. Geometric, r=−1/2, |r|=1/2<1 → **converges**; sum = 1/(1−(−1/2)) = 1/(3/2) = **2/3**

3. aₙ = n/(n+2) → 1 ≠ 0 as n→∞ → **diverges** by the Divergence Test

4. S₄ = 1+1/3+1/9+1/27 = 27/27+9/27+3/27+1/27 = **40/27 ≈ 1.481**
   Infinite sum: 1/(1−1/3) = 3/2 = **1.5** (S₄ is already close but the exact sum requires taking the limit)

Score 1 point per problem (P77 total: 4 points). Problem 4: require both S₄ and the exact infinite sum.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links NOT Tier-1)*

*Problem:* A geometric series has first term a=12 and common ratio r=−1/3.

(a) Verify the series converges and state the reason.

(b) Compute the exact infinite sum.

(c) Compute the 3rd partial sum S₃ (terms indexed from n=0: a, ar, ar²).

(d) The partial sum S₃ differs from the infinite sum. Explain why the partial sum is not the answer to "what does the series converge to?" What is the correct definition of the sum of an infinite series?

*Expected answers:*

(a) r=−1/3, |r|=1/3<1 → **converges** (geometric series convergence criterion). Note r is negative — confirmed not a barrier to convergence (MC-3).

(b) Sum = a/(1−r) = 12/(1−(−1/3)) = 12/(4/3) = **9**

(c) S₃ = 12 + 12(−1/3) + 12(−1/3)² = 12 − 4 + 4/3 = 8 + 4/3 = **28/3 ≈ 9.33**

(d) S₃ ≈ 9.33 overshoots the exact sum 9 (because the r=−1/3 term alternates, causing oscillation above and below the limit). The sum of an infinite series is defined as **lim_{n→∞} Sₙ** — the limit of the sequence of partial sums, not any particular Sₙ no matter how large n is.

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all four parts correct).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.75 × 5⌉ = 4). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items; if Divergence Test misuse → B01; if partial-sum confusion → B02; targeted repair |
| ≤ 2/5 | → Return to A01; re-engage bouncing ball and partial sum plot; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.series-convergence` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** `math.calc.power-series`

Next concept recommendation: Child test blueprints — `math.seq.divergence-test`, `math.seq.comparison-test`, `math.seq.ratio-test`, `math.seq.integral-test` — each deepens the convergence analysis toolkit.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — TERMS-TO-ZERO-IMPLIES-CONVERGENT Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You concluded Σaₙ converges because aₙ→0. This is incorrect. The Divergence Test only works in one direction: aₙ↛0 guarantees divergence. If aₙ→0, no conclusion is possible from this test alone."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A student says Σ1/n converges because 1/n→0. What counterargument defeats this?
*Correct response:* The harmonic series Σ1/n diverges despite 1/n→0. This is the canonical example showing that terms tending to zero is necessary but NOT sufficient for convergence.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'aₙ→0 → series converges' → to: 'aₙ→0 means we cannot rule out convergence, but more evidence is needed (ratio test, comparison test, integral test, etc.).' The harmonic series is the permanent warning: slow decay is not enough."

---

### Repair Action B02 — PARTIAL-SUM-AS-TOTAL-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used Sₙ for a specific large n as the sum of the series. Sₙ is the sum of the first n terms — a finite approximation. The series sum is the limit of Sₙ as n→∞, which may be a different value or may not exist."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For Σ(1/2)ⁿ, S₅=31/32≈0.97. A student says "the series sums to about 0.97." Is this the series sum?
*Correct response:* No. S₅=0.97 is the partial sum through n=5. The series sum = lim S_n = 1/(1−1/2) = 1. The partial sum 0.97 is a good approximation but not the exact infinite sum.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'the sum is Sₙ for large n' → to: 'the sum is lim_{n→∞} Sₙ — the limit, not any single partial sum.' The series sum is an asymptotic value — you approach it but the partial sums never equal it (unless the series terminates)."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Does Σ(2/5)ⁿ converge? If so, find the sum. |
| R2 | 3 days | Does Σ n/(2n+1) converge or diverge? Apply the Divergence Test and state whether it gives a definitive answer. |
| R3 | 7 days | A geometric series has sum 6 and first term 2. Find the common ratio r. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.calc.power-series (NOT Tier-1) |
| P76_mode | independence (cross-link NOT Tier-1) |
| Unlocks | math.calc.power-series |
| Requires (Tier-1) | math.seq.partial-sums, math.seq.convergent |

**GR-8 compliance:** cross_links = [math.calc.power-series]; NOT Tier-1 → documented.
**GR-9 compliance:** P76 uses an independent problem (geometric series a=12, r=−1/3) unrelated to the non-Tier-1 cross-linked concept.

---

## Component 8 — Teaching Notes

- **Harmonic series is the pillar counterexample:** Every discussion of the Divergence Test must anchor to Σ1/n. Students who know this counterexample by name and proof (the grouping argument) will not make MC-1 errors. Spend time on the grouping argument in A02.
- **Geometric series formula derivation:** The multiply-and-subtract derivation (Sₙ − rSₙ = a − arᴺ⁺¹) is elegant and short. Students who derive it themselves retain the formula. Make this derivation explicit and require it in P77 or P76 in the next spaced review.
- **Alternating geometric (MC-3):** Use Σ(−1/2)ⁿ as the standard alternating geometric example. Draw the partial sums on a number line to show oscillation converging to 2/3. This makes MC-3 very concrete.
- **Scope:** This blueprint covers: definition, geometric series (including alternating), Divergence Test. Child blueprints cover: Comparison Test, Ratio Test, Integral Test, Alternating Series Test. Do not introduce these tests here — the gate tests only the geometric formula and Divergence Test.
- **R3 (inverse problem):** The spaced review problem "find r given the sum" inverts the formula: sum=a/(1−r) → r=1−a/sum. This reinforces algebraic flexibility with the formula and is a common exam question type.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; concrete bouncing ball present in A01 | PASS |
| V-4 | bloom=analyze → P07 not required | N/A |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.calc.power-series, NOT T1) |
| V-11 | P76_mode = independence (GR-9, cross-link NOT Tier-1) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.75×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=20 → standard structure (3 main TAs + gate) | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
