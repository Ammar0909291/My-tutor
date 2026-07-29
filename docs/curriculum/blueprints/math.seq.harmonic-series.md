<!-- BLUEPRINT: math.seq.harmonic-series -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: The Harmonic Series
**Concept ID:** `math.seq.harmonic-series`
**KG Fields:** difficulty=advanced | bloom=analyze | estimated_hours=4 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.harmonic-series |
| name | The Harmonic Series |
| difficulty | advanced |
| bloom | analyze |
| estimated_hours | 4 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.seq.series-convergence |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.series-convergence**: Σaₙ converges iff partial sums {Sₙ} converge; Divergence Test: aₙ↛0 → diverges; aₙ→0 is necessary but NOT sufficient; p-series Σ1/nᵖ converges iff p>1

### Target Knowledge State
Student proves Σ1/n diverges via Oresme's grouping argument (S_{2^k} > 1 + k/2 → ∞); understands why the Divergence Test is inconclusive (1/n→0 satisfies the necessary condition, not the sufficient); explains that partial sums Hₙ ≈ ln n + γ grow without bound at logarithmic speed; articulates why p=1 is the exact boundary of p-series convergence; uses Hₙ ≈ ln n + 0.5772 to estimate partial sums.

### Conceptual Obstacles
1. Applying the Divergence Test backwards — aₙ→0 does not imply convergence; the test is one-directional
2. Believing "grows slowly" means "eventually converges" — logarithmic growth is still unbounded growth
3. Confusing the term 1/n (→0) with the partial sum Hₙ (→∞ like ln n)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | HARMONIC-CONVERGES-BECAUSE-TERMS-VANISH | Student reasons "1/n→0, so Σ1/n converges," applying the Divergence Test in the invalid reverse direction; confuses aₙ→0 (necessary for convergence) with aₙ→0 (sufficient for convergence) | Any problem asking WHY Σ1/n diverges; comparison with geometric series where both aₙ→0 and series converges |
| MC-2 | HARMONIC-CONVERGES-SLOWLY-TO-FINITE-LIMIT | Student observes that Hₙ grows very slowly and concludes it must eventually stabilise; does not grasp that logarithmic divergence is still divergence | Partial-sum table or estimation problems showing Hₙ growing sluggishly |
| MC-3 | PARTIAL-SUM-GROWS-LIKE-TERM | Student confuses the n-th term 1/n (→0) with the partial sum Hₙ (∼ln n); estimates Hₙ ≈ 1/n or expects partial sums to shrink as n increases | Any problem asking to estimate or compute Hₙ |

**Foundational Misconception:** MC-1 (HARMONIC-CONVERGES-BECAUSE-TERMS-VANISH) — the most common error; conflates necessity with sufficiency in the Divergence Test. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — advanced learner fluent with partial sums and convergence tests.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Shift from individual terms (1/n→0) to grouped blocks (each ≥ 1/2); Oresme's proof; why the Divergence Test is silent here
2. **A02 P04 PATTERN INDUCTION** — Partial sums Hₙ ≈ ln n + γ; logarithmic growth; estimation with the Euler–Mascheroni approximation
3. **A03 P06 CONTRAST PAIR** — Harmonic (p=1, diverges) vs Σ1/n^{1+ε} (p>1, converges): p=1 as exact watershed
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Oresme's Proof: Why Σ1/n Diverges

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Prove divergence via grouping; clarify the Divergence Test's one-directional nature; fix MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Individual terms (the misleading view):**

Terms: 1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, ...

These tend to 0. Naive reasoning: "1/n→0, so Σ1/n might converge." This is the trap — the Divergence Test says aₙ↛0 **implies** divergence, but aₙ→0 is inconclusive. We need a direct argument.

**Stage B — Grouped blocks (Oresme's representation, 14th century):**

Group the series by powers of 2:

```
Σ1/n = 1 + (1/2) + (1/3 + 1/4) + (1/5 + 1/6 + 1/7 + 1/8) + ...
             ↑          ↑                     ↑
           1 term    2 terms              4 terms  (block k=2)
```

Each block k has 2^{k−1} terms. The smallest term in block k is 1/2^k, so:

block k sum ≥ 2^{k−1} × (1/2^k) = **1/2**

Every block contributes at least 1/2, regardless of k.

**Formal inequality:** For all k ≥ 1:

S_{2^k} = 1 + (1/2) + (1/3 + 1/4) + ··· + (1/(2^{k−1}+1) + ··· + 1/2^k) > 1 + k·(1/2) = **1 + k/2**

**Divergence:** S_{2^k} > 1 + k/2 → ∞ as k → ∞ → {Sₙ} unbounded → **Σ1/n diverges**. □

**Why the Divergence Test was silent:**
- Divergence Test: aₙ↛0 → Σaₙ diverges (valid)
- Converse (INVALID): aₙ→0 → Σaₙ converges
- Here: 1/n→0 means the test is **inconclusive** — it cannot conclude convergence OR divergence. Oresme's proof is required.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Using Oresme's grouping, show that S_8 > 2.5.

(A) S_8 = 1 + 1/2 + (1/3+1/4) + (1/5+1/6+1/7+1/8) > 1 + 1/2 + 1/2 + 1/2 = 2.5 ✓
(B) We cannot show S_8 > 2.5 — the terms are decreasing, so the partial sum must also decrease
(C) k=3 → S_{2^3} = S_8 > 1 + 3/2 = 2.5 by the formal inequality ✓
(D) S_8 is approximately 1/8 since the last term is 1/8

*Branch CORRECT (A or C):* Both routes work. (A) Direct grouping: the four blocks (1), (1/2), (1/3+1/4), (1/5+···+1/8) each contribute ≥ 1/2 after the first, giving 1 + 3×(1/2) = 2.5 as a lower bound. (C) The formal inequality with k=3 gives S_8 = S_{2^3} > 1 + 3/2 = 2.5. ✓ Proceed to A02.

*Branch INCORRECT (B):* Individual terms decrease, but partial sums always increase when terms are positive — each new term adds to the total, never subtracts. Sₙ is monotone increasing; only the rate of increase slows. Proceed to A02.

*Branch INCORRECT (D):* 1/8 is the 8th TERM, not the 8th partial sum. Hₙ accumulates all preceding terms: S_8 = 1 + 1/2 + 1/3 + ··· + 1/8 ≈ 2.718. Proceed to A02.

*Branch NO_RESPONSE:* Group S_8 into blocks: (1) + (1/2) + (1/3+1/4) + (1/5+1/6+1/7+1/8). Bounds for the last two blocks: 1/3+1/4 > 1/4+1/4 = 1/2; 1/5+1/6+1/7+1/8 > 1/8×4 = 1/2. So S_8 > 1 + 1/2 + 1/2 + 1/2 = 2.5. Proceed to A02.

---

### Teaching Action A02 — How Hₙ Grows: The Euler–Mascheroni Constant

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Induce the logarithmic growth pattern Hₙ ≈ ln n + γ; build intuition for "very slow but unbounded" divergence; develop estimation skill

---

**[P04 — PATTERN INDUCTION]**

**Observed partial sums:**

| n | Hₙ (exact) | ln n | Hₙ − ln n |
|---|------------|------|-----------|
| 1 | 1.0000 | 0.000 | 1.000 |
| 10 | 2.9290 | 2.303 | 0.626 |
| 100 | 5.1874 | 4.605 | 0.582 |
| 1000 | 7.4855 | 6.908 | 0.577 |
| 10000 | 9.7876 | 9.210 | 0.578 |

**Pattern:** Hₙ − ln n converges to a fixed constant — the **Euler–Mascheroni constant**:

γ = lim_{n→∞} (Hₙ − ln n) ≈ **0.5772...**

**Approximation formula:** Hₙ ≈ ln n + 0.5772

**Growth rate — how slow is logarithmic?**

- H_{10} ≈ 2.93 (10 terms)
- H_{1000} ≈ 7.49 (1,000 terms)
- H_{10^6} ≈ ln(10^6) + 0.58 ≈ 6·ln 10 + 0.58 ≈ 14.39 (one million terms)
- To reach Hₙ = 100: need n ≈ e^{100 − 0.58} ≈ e^{99.42} ≈ **2 × 10^{43}** terms

The harmonic series diverges. But the divergence is so slow that no physical computer running since the Big Bang could sum enough terms to reach 100.

**Connection to MC-2:** "Slow growth" ≠ "eventual convergence." Hₙ grows without bound — it crosses every finite threshold, given enough terms. Convergence requires eventual stability at a fixed value, which Hₙ never achieves.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Estimate H_{1000} using Hₙ ≈ ln n + 0.5772. (Use ln 1000 = 3 ln 10 ≈ 6.908.)

(A) H_{1000} ≈ 7.485
(B) H_{1000} ≈ 6.908 (just ln 1000)
(C) H_{1000} ≈ 0.001 (the 1000th term is 1/1000)
(D) H_{1000} ≈ ln 1001 − ln 1 ≈ ln 1001

*Branch CORRECT (A):* H_{1000} ≈ ln 1000 + 0.577 = 6.908 + 0.577 ≈ **7.485**. Matches the table. ✓ Proceed to A03.

*Branch PARTIAL (B):* You computed ln 1000 but forgot γ ≈ 0.5772. H_{1000} ≈ 6.908 + 0.577 ≈ 7.485. Proceed to A03.

*Branch INCORRECT (C):* You found the 1000th TERM (1/1000 = 0.001), not the partial SUM. The partial sum Hₙ accumulates all 1000 terms: H_{1000} ≈ 7.485. Proceed to A03.

*Branch NO_RESPONSE:* Hₙ ≈ ln n + γ. Here n=1000, ln 1000 = 3 ln 10 ≈ 6.908, γ ≈ 0.577. So H_{1000} ≈ 6.908 + 0.577 ≈ **7.485**. Proceed to A03.

---

### Teaching Action A03 — p=1 Is the Exact Watershed

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast Σ1/n (p=1, diverges) with Σ1/n^{1+ε} (converges) and Σ1/n^{1−ε} (diverges); establish p=1 as the exact boundary; connect harmonic series as the canonical boundary case

---

**[P06 — CONTRAST PAIR]**

**p-series convergence:** Σ1/nᵖ converges if and only if p > 1.

**Contrast at the boundary:**

| p | Σ1/nᵖ | Status | Reason |
|---|-------|--------|--------|
| 0.5 | Σ1/√n | Diverges | p < 1 |
| 0.99 | Σ1/n^{0.99} | Diverges | p < 1 |
| **1** | **Σ1/n** | **Diverges** | **p = 1 (harmonic)** |
| 1.01 | Σ1/n^{1.01} | Converges | p > 1 |
| 2 | Σ1/n² | Converges | p > 1 |

**Why exactly p=1 is the watershed — block analysis:**

*p = 1:* Each block k contributes ≥ 2^{k−1}/2^k = 1/2 (Oresme's argument) → blocks don't shrink → S_{2^k} → ∞.

*p = 1+ε (ε > 0):* Block k maximum term is 1/(2^{k−1}+1)^{1+ε} ≤ 1/2^{k(1+ε)}. Block sum ≤ 2^{k−1}/2^{k(1+ε)} = (1/2)·(1/2^{kε}). This is a geometric series with ratio 2^{−ε} < 1 → converges.

*p < 1:* Each block grows (block sum ≥ (1/2)·2^{k(1−p)} → ∞) → diverges even faster than harmonic.

**The knife-edge:** At p=1, blocks contribute a fixed 1/2 forever — enough to diverge, but just barely. Any positive ε tips the blocks toward 0, yielding convergence. The harmonic series is the canonical case where this balance fails on the divergence side.

**Intuition:** 1/n falls off "just barely too slowly" to be summable. The harmonic series is the slowest possible divergence — every series with terms that shrink faster (any p>1) converges.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* A student claims "Σ1/n diverges because 1/n goes to zero too slowly." Is this precise enough, and what would a more rigorous statement say?

(A) Correct — any series with slowly-decaying terms must diverge
(B) Imprecise — "slowly" is not a rigorous criterion. The precise statement: the grouping argument shows S_{2^k} > 1 + k/2 → ∞, meaning partial sums are unbounded; equivalently, Hₙ ∼ ln n → ∞
(C) Wrong — 1/n→0, so the Divergence Test says nothing; in fact partial sums are bounded
(D) Correct — "decaying too slowly to zero" is the standard rigorous definition of p-series divergence

*Branch CORRECT (B):* The student's intuition is directionally correct but imprecise. "Slowly" is not a rigorous criterion. The rigorous statement uses the grouping proof: S_{2^k} > 1 + k/2 → ∞, or equivalently Hₙ ∼ ln n → ∞, showing partial sums are unbounded. ✓ Proceed to A04.

*Branch INCORRECT (A, D):* Σ1/n² also decays slowly (1/n²→0) but converges. Slow decay alone does not imply divergence — the Divergence Test gives no information when aₙ→0, regardless of rate. Proceed to A04.

*Branch INCORRECT (C):* (C) correctly identifies the Divergence Test as inconclusive, but "partial sums are bounded" is false — Hₙ is unbounded. The series diverges; the claim that sums are bounded is the opposite of what happens. Proceed to A04.

*Branch NO_RESPONSE:* The student's phrasing is imprecise. Correct reasoning: the Divergence Test is inconclusive (1/n→0). Oresme's grouping provides the actual proof: every block of 2^{k−1} terms sums to ≥ 1/2, so S_{2^k} > 1 + k/2 → ∞. "Slowly" is replaced by the concrete lower bound 1/2 per block. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Complete the grouping proof: show that S_{2^k} > 1 + k/2 for all integers k ≥ 1 by writing out the block structure and showing each block contributes ≥ 1/2.

**Problem 2.** Σ1/n^{1.001} converges but Σ1/n diverges, even though both have terms tending to 0. Using the block argument, explain precisely why the exponent difference matters.

**Problem 3.** Using Hₙ ≈ ln n + 0.5772: (a) estimate H_{e^{10}} (use ln(e^{10}) = 10); (b) estimate the smallest n for which Hₙ > 5.

**Problem 4.** A student argues: "Σ(−1)ⁿ/n converges by the Alternating Series Test. Its terms have the same magnitude as 1/n. Therefore Σ1/n also converges — its terms are no larger." Identify all errors.

---

**[P55 — SCORE]**

*Answers:*

1. Block k consists of terms 1/(2^{k−1}+1) + ··· + 1/2^k — exactly 2^{k−1} terms, each ≥ 1/2^k. Block sum ≥ 2^{k−1} × 1/2^k = 1/2. Therefore S_{2^k} = 1 + Σ_{j=1}^k (block j) > 1 + k × (1/2) = 1 + k/2. ✓

2. At p=1: block k has maximum term 1/2^k and 2^{k−1} terms → block sum ≥ 2^{k−1}/2^k = 1/2 (constant, never shrinks). At p=1.001: maximum term 1/2^{k·1.001}, block sum ≤ 2^{k−1}/2^{k·1.001} = (1/2)·(1/2^{0.001k}) → 0 geometrically. The blocks shrink to 0 for p>1; they do not shrink for p=1. This is the exact mechanism behind the watershed. ✓

3. (a) H_{e^{10}} ≈ ln(e^{10}) + 0.577 = 10 + 0.577 ≈ **10.577**. (b) Hₙ > 5 → ln n > 5 − 0.577 = 4.423 → n > e^{4.423} ≈ **83**. So approximately n = 83 terms. ✓

4. Errors: (i) The inference "Σ(−1)ⁿ/n converges → Σ1/n converges" is invalid — a conditionally convergent series converges by sign-cancellation, not by magnitude. Taking absolute values can produce divergence (MC-2 from absolute convergence). (ii) "Its terms are no larger": |1/n| = |(−1)ⁿ/n| exactly — the terms are the same magnitude, so the comparison proves nothing in either direction. (iii) The correct conclusion: Σ1/n diverges by Oresme's proof; the AST confirms only that the signed series converges, which is a separate fact. ✓ (Full credit for identifying at least 2 errors.)

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Determine all p for which Σₙ₌₁^∞ 1/nᵖ converges. Use the harmonic series as a reference case.

*(a)* State the p-series convergence criterion.

*(b)* Explain, using the grouping argument, why p=1 is the exact boundary and not p=0.99 or p=1.01.

*(c)* How does the harmonic series fit into this picture as the p=1 case?

*Expected answer:*

*(a)* Σ1/nᵖ converges iff p > 1.

*(b)* At p=1 (harmonic): every block contributes ≥ 1/2 → S_{2^k} → ∞. At p=1+ε: block sum ≤ (1/2)·(2^{−ε})^k → geometric series → converges. At p=1−ε: block sum ≥ (1/2)·(2^{ε})^k → grows → diverges faster. The exact threshold is where blocks stop shrinking: precisely p=1.

*(c)* The harmonic series is the canonical p=1 case — the unique p-series at the exact convergence boundary. It diverges, but so slowly (∼ ln n) that in practice the divergence is hard to observe. It establishes that aₙ→0 alone (no matter how fast) is insufficient for convergence.

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts addressed); 0.5 if criterion stated correctly but boundary reasoning absent or imprecise.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.75 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items: grouping proof → B01; logarithmic growth confusion → B02; term/partial-sum confusion → B03; targeted repair |
| ≤ 2/5 | → Return to A01; redo grouping proof step by step; confirm Divergence Test limitation; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.harmonic-series` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** Comparison-test benchmarks (harmonic as canonical divergent reference); logarithmic-denominator series Σ1/(n ln n); absolute vs conditional convergence of the alternating harmonic.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — HARMONIC-CONVERGES-BECAUSE-TERMS-VANISH Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You applied the Divergence Test in the invalid reverse direction. The test says: if aₙ does NOT tend to 0, then Σaₙ diverges. It says nothing when aₙ → 0. The harmonic series shows exactly this: 1/n→0, yet Σ1/n diverges."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* True or false: if aₙ→0 then Σaₙ converges.
*Correct response:* False. Σ1/n is the canonical counterexample: 1/n→0 but Σ1/n diverges (Oresme). The Divergence Test is one-directional only — aₙ↛0 → diverges; aₙ→0 → inconclusive.

**[P64 — CONCEPTUAL SHIFT]**
"aₙ→0 is a *necessary* condition for convergence, not a *sufficient* one. Think: to be a prime number, n must be odd (necessary for n>2) — but being odd doesn't make n prime (9 is odd, not prime). Similarly, convergence requires aₙ→0, but aₙ→0 doesn't guarantee convergence. The harmonic series is the 'odd non-prime' of series analysis."

---

### Repair Action B02 — HARMONIC-CONVERGES-SLOWLY-TO-FINITE-LIMIT Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You confused 'grows slowly' with 'converges.' Hₙ ∼ ln n → ∞ — it grows without bound, at a logarithmically slow pace. Convergence requires partial sums to approach a fixed finite limit. That never happens for Hₙ."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* H_{10^{43}} ≈ ln(10^{43}) + 0.577 ≈ 99.5. Does this show the series is "almost converged"?
*Correct response:* No. After 10^{43} terms, the partial sum is about 99.5. But H_{e^{100}} ≈ 100.58 — the sum exceeds 100 eventually. It keeps growing, indefinitely, no matter how many terms we've accumulated.

**[P64 — CONCEPTUAL SHIFT]**
"Logarithmic growth is still unbounded growth. The function ln n → ∞ just as surely as n → ∞ or √n → ∞ — it simply takes astronomically longer to see large values. 'Slow divergence' is still divergence. The harmonic series never settles: give it more terms, the partial sum climbs further, always."

---

### Repair Action B03 — PARTIAL-SUM-GROWS-LIKE-TERM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You confused the n-th term 1/n (which→0) with the n-th partial sum Hₙ (which→∞ like ln n). These are different objects: the term tells you the size of the most recent addition; the partial sum tells you the total accumulated so far."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Which is larger: H_{1000} or 1/1000?
*Correct response:* H_{1000} ≈ 7.485. The term 1/1000 = 0.001. H_{1000} is roughly 7,485 times larger. The partial sum is the accumulation of 1000 positive terms; the final term is a tiny contribution to a large total.

**[P64 — CONCEPTUAL SHIFT]**
"The partial sum Hₙ never decreases — each new term 1/n > 0 adds to the total. By the time we reach term 1000, we have summed 999 previous positive contributions already. Use the formula: Hₙ ≈ ln n + 0.577. The term 1/n and the partial sum Hₙ diverge completely in behaviour — one shrinks to 0, the other grows to infinity."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Explain in one paragraph why 1/n→0 does not imply Σ1/n converges, and state the key step of the grouping proof. |
| R2 | 3 days | Estimate H_{e^{20}} using Hₙ ≈ ln n + 0.5772. (Answer: H_{e^{20}} ≈ 20.577.) |
| R3 | 7 days | For what values of p does Σ1/(n^p · ln n) converge? (Hint: integral test — for p>1 the integral ∫x^{−p}(ln x)^{−1}dx converges; for p=1 let u=ln x → ∫1/u du = ln(ln x)→∞ → diverges; p<1 also diverges by comparison with Σ1/n^p.) |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.seq.comparison-test (harmonic as canonical divergent benchmark), math.seq.absolute-convergence (alternating harmonic as canonical conditional-convergence example) |
| Requires (Tier-1) | math.seq.series-convergence |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent p-series problem.

---

## Component 8 — Teaching Notes

- **MC-1 is nearly universal:** Almost every student's first instinct is "1/n→0 so it converges." The correction must be structural, not just factual: draw the Divergence Test as a one-way arrow explicitly; contrast it with the (invalid) reverse. The necessary/sufficient distinction is the real pedagogical target.
- **Oresme's proof should be drawn, not just stated:** The grouping into blocks of 2^{k−1} terms is visually compelling. Draw the blocks on a number line or as a bar chart; students who draw it rarely forget it. Emphasise that the block size doubles each step while the minimum per term halves — these cancel exactly, giving every block ≥ 1/2.
- **The astronomical slowness is a feature, not a bug:** Students who learn that you need ∼ 2×10^{43} terms to reach a sum of 100 experience genuine surprise. This makes the divergence feel "real" despite its imperceptibility in finite computation. Use it deliberately: "How many atoms in the observable universe? About 10^{80}. How many terms do you need to reach a sum of 140? About 10^{60}." The scale illustrates that slow divergence is still divergence.
- **P77 Problem 4 connects to math.seq.absolute-convergence:** Students who have studied absolute convergence will recognise this as the MC-2 error from that blueprint. If this blueprint precedes absolute-convergence, it primes students for that concept; if it follows, it reinforces it. Either ordering benefits from making the connection explicit.
- **R3 connection:** The integral test result for Σ1/(n ln n) — divergence confirmed by u=ln x substitution — directly connects to math.seq.integral-test's A02 content. Cross-reference this for students who have already studied that blueprint.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; abstract entry appropriate for advanced learner | PASS |
| V-4 | bloom=analyze → P07 optional; P11 chosen for term-vs-block representation shift enabling the proof | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.75×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=4 → 3 main TAs + gate appropriate | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
