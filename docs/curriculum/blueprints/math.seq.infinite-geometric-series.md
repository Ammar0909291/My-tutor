<!-- BLUEPRINT: math.seq.infinite-geometric-series -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Infinite Geometric Series
**Concept ID:** `math.seq.infinite-geometric-series`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.infinite-geometric-series |
| name | Infinite Geometric Series |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | A (Abstract) — learner arrives with the finite GP sum formula Sₙ = a(1−rⁿ)/(1−r) from `math.seq.geometric-series`; the new step (taking n→∞) is purely algebraic, requiring |rⁿ|→0 when |r|<1 |
| requires (Tier-1) | math.seq.geometric-series |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.geometric-series**: Sₙ = a(1−rⁿ)/(1−r) for r≠1; convergence when |r|<1; divergence when |r|≥1

### Target Knowledge State
Student can derive S∞ = a/(1−r) by taking the limit of Sₙ as n→∞ when |r|<1; can verify the convergence condition (|r|<1 required, signed r allowed including negative); can apply the formula to find the sum, the first term, or r given partial information; and can convert a recurring decimal to a fraction using the infinite GP sum.

### Conceptual Obstacles
1. Applying S∞ = a/(1−r) without checking |r|<1 — when |r|≥1, the formula gives a finite-looking number but the series actually diverges; must check convergence first
2. Treating the infinite sum as "the sequence limit" — the limit of the terms (rⁿ→0) is not the same as the sum of the series; students conflate lim aₙ with Σaₙ
3. Using the finite Sₙ formula as the infinite sum — stopping at Sₙ = a(1−rⁿ)/(1−r) without taking n→∞; the infinite sum is the limit, not any single partial sum

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | FORMULA-WITHOUT-CONVERGENCE-CHECK | Student applies a/(1−r) without first verifying |r|<1; may report a finite sum for a divergent series | Any problem where r is not obviously less than 1 in absolute value |
| MC-2 | TERM-LIMIT-AS-SERIES-SUM | Student reports lim rⁿ = 0 as the "sum" of the infinite GP; confuses the convergence of terms with the value of the sum | Problems asking for the sum where |r|<1 |
| MC-3 | PARTIAL-SUM-IS-INFINITE-SUM | Student uses Sₙ for a specific large n as the exact infinite sum; does not take the limit n→∞ | Any infinite GP sum problem |

**Foundational Misconception:** MC-1 (FORMULA-WITHOUT-CONVERGENCE-CHECK) — leads to incorrect sums for divergent series; addressed by always verifying |r|<1 before applying the formula in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — learner has the finite GP sum formula; the new content is taking n→∞.

**Scaffolding sequence:**
1. **A01 P02 FORMAL DEFINITION** — derive S∞ = a/(1−r) from the limit of Sₙ; state the convergence condition; distinguish MC-2 and MC-3
2. **A02 P04 PATTERN INDUCTION** — tabulate partial sums approaching S∞; examine divergent cases (|r|≥1); apply to signed r; address MC-1
3. **A03 P05 WORKED EXAMPLE** — recurring decimal to fraction conversion; inverse problems (given S∞ find a or r)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Derivation of S∞

**Primitive:** P02 FORMAL DEFINITION
**Purpose:** Derive the infinite sum formula from the finite formula via a limit; establish the convergence condition; address MC-2, MC-3

---

**[P02 — FORMAL DEFINITION]**

**Starting point (prior concept):**
Finite GP sum: Sₙ = a(1−rⁿ)/(1−r) for r≠1

**Taking n→∞ when |r|<1:**
If |r|<1, then |rⁿ| = |r|ⁿ→0 as n→∞ (exponential decay for |r|<1).

Therefore:
```
S∞ = lim_{n→∞} Sₙ = lim_{n→∞} a(1−rⁿ)/(1−r) = a(1−0)/(1−r) = a/(1−r)
```

**Convergence condition:**
The infinite geometric series Σₙ₌₀^∞ arⁿ converges **if and only if |r| < 1**, with sum:
```
S∞ = a/(1−r)
```
If |r| ≥ 1, the series **diverges** (Sₙ → ±∞ or oscillates without bound).

**Three cases when |r| = 1:**
- r = 1: Sₙ = na → ∞ (diverges)
- r = −1: Sₙ alternates between a and 0 → no limit (diverges)

**MC-2 clarification:**
When |r|<1: terms rⁿ→0 (yes) AND the series sum = a/(1−r) (nonzero in general).
These are different things: lim rⁿ = 0 ≠ Σrⁿ = 1/(1−r).

**MC-3 clarification:**
S∞ is the limit of {Sₙ}, not any specific Sₙ. For Σ(1/2)ⁿ: S₁=1/2, S₂=3/4, S₃=7/8, ... → S∞=1.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find the sum of the infinite GP: 6 + 2 + 2/3 + 2/9 + ⋯

(A) S∞ = 6/(1−1/3) = 9
(B) S∞ = 6/(1−2) = −6 (using r=2 instead of r=1/3)
(C) S∞ does not exist since the series has infinitely many terms
(D) S∞ = 6+2 = 8 (first two terms only)

*Branch CORRECT (A):* a=6, r=2/6=1/3, |r|=1/3<1 → converges. S∞=6/(1−1/3)=6/(2/3)=**9** ✓ Proceed to A02.

*Branch PARTIAL:* You identified the formula but may have computed a or r incorrectly. First term a=6; ratio r=2/6=1/3; S∞=6/(2/3)=9. Proceed to A02.

*Branch INCORRECT (B or D):* (B) r = second/first = 2/6 = 1/3, not 2. (D) A finite sum is not the infinite sum. Check: |r|=1/3<1 → converges; S∞=6/(1−1/3)=9. Proceed to A02.

*Branch NO_RESPONSE:* r=2/6=1/3; |r|<1 ✓; S∞=a/(1−r)=6/(1−1/3)=6/(2/3)=9. Proceed to A02.

---

### Teaching Action A02 — Convergence vs Divergence Cases

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Tabulate partial sums to see convergence; examine divergent cases; address MC-1

---

**[P04 — PATTERN INDUCTION]**

**Pattern 1 — Partial sums converging (|r|<1):**

Σₙ₌₀^∞ (1/2)ⁿ: a=1, r=1/2, S∞=1/(1−1/2)=2

| n | Sₙ |
|---|-----|
| 0 | 1 |
| 1 | 1.5 |
| 5 | 1.96875 |
| 10 | 1.999023... |
| ∞ | **2** (limit) |

**Pattern 2 — Divergent case (r=2>1):**

Σₙ₌₀^∞ 2ⁿ: Sₙ = 2ⁿ⁺¹−1

| n | Sₙ |
|---|-----|
| 5 | 63 |
| 10 | 2047 |
| ∞ | ∞ (diverges) |

Applying the formula: a/(1−r)=1/(1−2)=−1. This gives a finite-looking number but the series is DIVERGENT — the formula is invalid when |r|≥1. (MC-1 addressed.)

**Pattern 3 — Negative ratio (|r|<1, r<0):**

Σₙ₌₀^∞ (−1/3)ⁿ: a=1, r=−1/3, |r|=1/3<1 → converges.
S∞ = 1/(1−(−1/3)) = 1/(4/3) = **3/4**

Partial sums oscillate but converge:
S₀=1, S₁=2/3, S₂=7/9, S₃=20/27, ... → 3/4

**Decision process (MC-1 prevention):**
1. Identify r from consecutive terms: r = a₂/a₁
2. Check: is |r| < 1? If NO → series diverges, STOP.
3. If YES → apply S∞ = a/(1−r)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For which of these infinite GPs does S∞ exist?

(I) 3 + 6 + 12 + 24 + ⋯ (r=2)
(II) 1 − 1/2 + 1/4 − 1/8 + ⋯ (r=−1/2)
(III) 1 + 1 + 1 + 1 + ⋯ (r=1)

(A) I and II only
(B) II only
(C) All three (they all have a pattern)
(D) None (infinite series can't have finite sums)

*Branch CORRECT (B):* (I) r=2, |r|=2≥1 → diverges. (II) r=−1/2, |r|=1/2<1 → converges, S∞=1/(1+1/2)=2/3. (III) r=1 → Sₙ=n→∞. Only (II) has |r|<1. ✓ Proceed to A03.

*Branch PARTIAL:* You identified (II) converges. Confirm: (I) r=2 makes Sₙ grow without bound; (III) r=1 gives Sₙ=n→∞. S∞ exists only for (II). Proceed to A03.

*Branch INCORRECT (A, C, D):* Only |r|<1 gives convergence. (I) has r=2>1 → diverges. (III) has r=1 → diverges (sum of infinitely many 1s). (II) alone qualifies. Proceed to A03.

*Branch NO_RESPONSE:* |r|<1 is required. (I) |r|=2 ✗; (III) |r|=1 ✗; (II) |r|=1/2 ✓ → S∞=1/(3/2)=2/3. Proceed to A03.

---

### Teaching Action A03 — Applications: Recurring Decimals and Inverse Problems

**Primitive:** P05 WORKED EXAMPLE
**Purpose:** Apply S∞ to recurring decimals and inverse-formula problems

---

**[P05 — WORKED EXAMPLE]**

**Application 1 — Recurring decimal to fraction:**

Convert 0.333... to a fraction.

Write as an infinite GP: 0.3 + 0.03 + 0.003 + ⋯ = 3/10 + 3/100 + 3/1000 + ⋯

a = 3/10, r = 1/10, |r|<1 ✓

S∞ = (3/10)/(1−1/10) = (3/10)/(9/10) = **1/3** ✓

Convert 0.142857142857... = 0.142857 recurring:

a = 142857/10⁶, r = 1/10⁶:
S∞ = (142857/10⁶)/(1−1/10⁶) = 142857/(10⁶−1) = 142857/999999 = **1/7** ✓

**Application 2 — Inverse problem (given S∞, find r):**

An infinite GP has first term 8 and S∞ = 24. Find r.

S∞ = a/(1−r): 24 = 8/(1−r) → 1−r = 8/24 = 1/3 → **r = 2/3**

Verify: |r|=2/3<1 ✓; S∞=8/(1/3)=24 ✓

**Application 3 — Inverse problem (given S∞ and r, find a):**

S∞ = 10, r = −1/2. Find a.

10 = a/(1−(−1/2)) = a/(3/2) → **a = 15**

Verify: |r|=1/2<1 ✓; S∞=15/(3/2)=10 ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* An infinite GP has S∞ = 5 and r = 1/4. Find a, then find the sum of the first 3 terms S₃.

(A) a=5/(1−1/4)=5·(3/4)=15/4; S₃=(15/4)(1−(1/4)³)/(3/4)=(15/4)·(63/64)/(3/4)=315/64
(B) a=5·(1−1/4)=15/4; S₃=a(1−r³)/(1−r)=(15/4)(63/64)/(3/4)=315/64≈4.92
(C) a=15/4; S₃=5 (same as S∞)
(D) a=5(1−1/4)=15/4; S₃ = 15/4+15/16+15/64=(240+60+15)/64=315/64

*Branch CORRECT (A, B, or D):* S∞=a/(1−r)=a/(3/4)=5 → a=**15/4**. S₃=(15/4)(1−1/64)/(3/4)=(15/4)·(63/64)·(4/3)=(15·63)/(3·64)=5·63/64=**315/64≈4.92** ✓ Proceed to A04.

*Branch PARTIAL:* You found a correctly but S₃ needs the finite formula Sₙ=a(1−rⁿ)/(1−r). S₃=(15/4)(1−(1/4)³)/(3/4)=(15/4)·(63/64)/(3/4)=315/64. Proceed to A04.

*Branch INCORRECT (C):* S₃≠S∞. S∞ is the limit as n→∞; S₃ is the finite sum of just 3 terms. Compute: 15/4+15/16+15/64=240/64+60/64+15/64=315/64≈4.92<5. Proceed to A04.

*Branch NO_RESPONSE:* S∞=a/(1−r): 5=a/(3/4) → a=15/4. S₃=a(1−r³)/(1−r)=(15/4)(1−1/64)/(3/4)=(15/4)·(63/64)·(4/3)=315/64. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Apply the infinite geometric series formula.*

**Problem 1.** Find S∞ for: 4 − 2 + 1 − 1/2 + ⋯

**Problem 2.** Does Σₙ₌₀^∞ (5/4)ⁿ converge? State S∞ if it does.

**Problem 3.** An infinite GP has S∞=18 and r=2/3. Find the first term a.

**Problem 4.** Convert 0.272727... to a fraction using the infinite GP formula.

---

**[P55 — SCORE]**

*Answers:*

1. a=4, r=−1/2, |r|=1/2<1 → S∞=4/(1−(−1/2))=4/(3/2)=**8/3**
2. r=5/4, |r|=5/4>1 → **diverges**; no S∞ exists
3. S∞=a/(1−r): 18=a/(1−2/3)=a/(1/3) → **a=6**; verify: |r|=2/3<1 ✓
4. 0.27 repeating = 27/100 + 27/10000 + ⋯; a=27/100, r=1/100; S∞=(27/100)/(99/100)=27/99=**3/11**

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A ball is dropped from a height of 4 metres. After each bounce it rises to 3/4 of the previous height and then falls back down. Assume the ball bounces infinitely many times.

(a) Write the total distance travelled as an infinite series (first drop + bounces).

(b) Find the exact total distance.

(c) Why is your answer finite even though the ball bounces infinitely many times?

*Expected answers:*

(a) First drop: 4 m. Then each bounce = rise + fall = 2·(3/4)·4, 2·(3/4)²·4, ⋯
Total = 4 + 2·3 + 2·(9/4) + ⋯ = 4 + Σₙ₌₁^∞ 2·4·(3/4)ⁿ = 4 + 8·Σₙ₌₁^∞ (3/4)ⁿ

(b) Σₙ₌₁^∞ (3/4)ⁿ = (3/4)/(1−3/4) = (3/4)/(1/4) = 3
Total = 4 + 8·3 = 4 + 24 = **28 metres**

(c) The bounce heights form a geometric sequence with |r|=3/4<1 — each bounce is shorter by the factor 3/4. The distances decrease exponentially fast, so their infinite sum is finite.

---

**[P55 — SCORE]**

Transfer probe: 1 point.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.8 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items; if MC-1 (no convergence check) → B01; if MC-3 (used finite Sₙ) → B02; targeted repair |
| ≤ 2/5 | → Return to A01; rederive from the limit of Sₙ; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.infinite-geometric-series` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** none directly (see KG).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — FORMULA-WITHOUT-CONVERGENCE-CHECK Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You applied S∞=a/(1−r) without first checking |r|<1. This formula is derived assuming rⁿ→0. If |r|≥1, rⁿ does not tend to 0 and the formula is meaningless — the series diverges."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Apply a/(1−r) to Σₙ₌₀^∞ 3ⁿ (a=1, r=3). What does the formula give? Is that the correct sum?
*Correct response:* Formula gives 1/(1−3)=−1/2. But the series 1+3+9+27+⋯ grows without bound — it diverges. The formula is invalid because |r|=3≥1.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'apply a/(1−r) to any GP' → to: 'FIRST check |r|<1; THEN apply a/(1−r).' Make convergence check step 1, always."

---

### Repair Action B02 — PARTIAL-SUM-IS-INFINITE-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You reported Sₙ for a specific n as the infinite sum. Sₙ is a finite approximation — the infinite sum is the limit lim_{n→∞} Sₙ, which equals a/(1−r) when |r|<1."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For Σ(1/2)ⁿ, compute S₃ and S∞. Are they equal?
*Correct response:* S₃ = 1/2+1/4+1/8 = 7/8. S∞ = lim Sₙ = 1. They differ: 7/8 < 1. The infinite sum is always the limit, not any partial sum.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'infinite sum = Sₙ for large n' → to: 'infinite sum = lim Sₙ = a/(1−r).' No finite Sₙ ever equals S∞ exactly (for a non-trivial series)."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Find S∞ for: 10 + 5 + 2.5 + 1.25 + ⋯ |
| R2 | 3 days | An infinite GP has S∞=12 and a=3. Find r. Verify |r|<1. |
| R3 | 7 days | Convert 0.454545... to a fraction using infinite GP. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | none |
| Requires (Tier-1) | math.seq.geometric-series |

**GR-8 compliance:** no cross_links in KG — documented.
**GR-9 compliance:** P76 (bouncing ball) is independent of any cross-linked concept.

---

## Component 8 — Teaching Notes

- **Always check |r|<1 first:** Every worked example should demonstrate the convergence check as a mandatory first step, never optional. Students who see it done every time internalize it as a habit.
- **Recurring decimals:** This application makes the abstract formula immediately useful and connects to prior arithmetic knowledge. The 0.333...=1/3 verification (which students often know intuitively) is a confidence-builder; 0.272727...=3/11 confirms the method works beyond the obvious case.
- **The bouncing ball (P76):** Classic physics application. The "infinite bounces, finite total distance" result is counter-intuitive to many students and provides genuine motivation for the formula.
- **Negative r:** Ensure at least one practice problem uses negative r (e.g., r=−1/2) to prevent students from adding the mental constraint "r must be positive" to the convergence check.
- **Connection to series convergence:** This concept is the learner's first experience with an infinite series having a finite sum. It provides the foundation intuition that the divergence test, ratio test, and other convergence tests build on.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; limit of known finite formula; algebraic derivation | PASS |
| V-4 | bloom=apply → application problems throughout | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P02, A02=P04, A03=P05) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.8×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=4 → standard structure (3 main TAs + gate) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
