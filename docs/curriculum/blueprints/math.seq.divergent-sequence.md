<!-- BLUEPRINT: math.seq.divergent-sequence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Divergent Sequence
**Concept ID:** `math.seq.divergent-sequence`
**KG Fields:** difficulty=advanced | bloom=analyze | estimated_hours=4 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.divergent-sequence |
| name | Divergent Sequence |
| difficulty | advanced |
| bloom | analyze |
| estimated_hours | 4 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) — learner arrives with the formal convergence definition from `math.seq.convergent`; divergence is defined as the logical negation of convergence, requiring formal limit analysis rather than a prior concrete representation |
| requires (Tier-1) | math.seq.convergent |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.convergent**: {aₙ} converges to L iff for every ε>0 there exists N such that n>N → |aₙ−L|<ε; equivalently, lim_{n→∞} aₙ = L for some finite L ∈ ℝ

### Target Knowledge State
Student can define divergence as the logical negation of convergence; can classify sequences by divergence type (unbounded positive, unbounded negative, oscillating without limit); can prove divergence formally by negating the convergence definition or by applying boundedness; understands that bounded sequences may still diverge (oscillating case); knows the Monotone Convergence Theorem — a monotone bounded sequence must converge — and its contrapositive as a divergence criterion.

### Conceptual Obstacles
1. Believing every bounded sequence converges — {(−1)ⁿ} is bounded (all terms in {−1, +1}) yet diverges because it oscillates without settling near any single value
2. Equating divergence with blowing up to infinity — oscillating sequences like {(−1)ⁿ} or {sin(nπ/2)} are divergent without any term becoming large
3. Thinking {(−1)ⁿ/n} diverges because it alternates — the terms still approach 0 so the sequence converges to 0 (alternating signs do not guarantee divergence)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | BOUNDED-SEQUENCE-CONVERGES | Student concludes {(−1)ⁿ} converges because all terms lie in [−1,1]; confuses boundedness with convergence | Any bounded sequence presented for analysis |
| MC-2 | DIVERGES-ONLY-TO-INFINITY | Student classifies only sequences with aₙ→±∞ as divergent; treats oscillating sequences as "neither convergent nor divergent" | Sequences like {(−1)ⁿ} or {sin n} presented |
| MC-3 | ALTERNATING-SIGN-IMPLIES-DIVERGENCE | Student says {(−1)ⁿ/n} diverges because of alternating signs; misses that |aₙ|=1/n→0 forces the limit to 0 regardless of sign | Any sequence with alternating sign |

**Foundational Misconception:** MC-1 (BOUNDED-SEQUENCE-CONVERGES) — leads to systematic misclassification of oscillating sequences; addressed with {(−1)ⁿ} counterexample in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — learner already has the formal convergence definition.

**Scaffolding sequence:**
1. **A01 P02 FORMAL DEFINITION** — negate the convergence definition to obtain the formal divergence definition; classify the three divergence types with canonical examples
2. **A02 P06 CONTRAST PAIR** — convergent vs divergent sequences side-by-side: bounded-convergent / bounded-divergent (oscillating) / unbounded-divergent; address MC-1, MC-2
3. **A03 P05 WORKED EXAMPLE** — Monotone Convergence Theorem as a convergence tool and its contrapositive as a divergence tool; address MC-3
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Formal Definition and Taxonomy

**Primitive:** P02 FORMAL DEFINITION
**Purpose:** Define divergence as logical negation of convergence; establish the three-type taxonomy; address MC-2

---

**[P02 — FORMAL DEFINITION]**

**Convergence (prior concept):**
{aₙ} converges to L iff ∀ε>0 ∃N ∈ ℕ such that n > N ⟹ |aₙ − L| < ε

**Divergence (logical negation):**
{aₙ} **diverges** iff ∀L ∈ ℝ ∃ε_L > 0 such that ∀N ∈ ℕ ∃n > N with |aₙ − L| ≥ ε_L

In plain terms: no matter which real number L you propose as a candidate limit, the sequence fails to stay within ε_L of L for all large n.

**Three divergence types:**

| Type | Condition | Canonical Example | Notes |
|------|-----------|-------------------|-------|
| Diverges to +∞ | aₙ→+∞ | aₙ = n | Unbounded above |
| Diverges to −∞ | aₙ→−∞ | aₙ = −n | Unbounded below |
| Oscillates | Bounded but no single limit | aₙ = (−1)ⁿ | stays in {−1,+1} yet diverges |

All three are divergent. "Diverges" does not mean "blows up" — it means "does not converge."

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Which of the following sequences diverges?

(A) aₙ = 1/n
(B) aₙ = (−1)ⁿ
(C) aₙ = (n+1)/n
(D) aₙ = 1 + 1/n²

*Branch CORRECT (B):* (−1)ⁿ alternates between −1 and +1 indefinitely — no single L captures all terms within ε<2 for all large n. (A) converges to 0; (C) converges to 1; (D) converges to 1. ✓ Proceed to A02.

*Branch PARTIAL:* You may have flagged (C) as divergent because n+1 grows — but (n+1)/n = 1+1/n → 1. The numerator and denominator both grow; their ratio settles. Proceed to A02.

*Branch INCORRECT (A, C, D):* All three converge. 1/n→0; (n+1)/n→1; 1+1/n²→1. The divergent choice is (B): (−1)ⁿ oscillates between ±1 with no single limit. Proceed to A02.

*Branch NO_RESPONSE:* (B) diverges. (−1)ⁿ takes values +1 and −1 alternately — any proposed limit L is more than 1 away from at least half the terms. Proceed to A02.

---

### Teaching Action A02 — Bounded vs Unbounded Divergence

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish bounded-divergent (oscillating) from unbounded-divergent; destroy MC-1 with {(−1)ⁿ}; refine MC-2

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Bounded convergent vs bounded divergent:**

| Sequence | Bounded? | Limit? | Verdict |
|----------|----------|--------|---------|
| aₙ = 1/n | Yes, in (0,1] | L = 0 | Converges |
| aₙ = (−1)ⁿ | Yes, in {−1,+1} | None | **Diverges** |
| aₙ = (−1)ⁿ/n | Yes, in [−1,1] | L = 0 | Converges |

*MC-1 destroyed:* Boundedness does NOT guarantee convergence. {(−1)ⁿ} is bounded and divergent. The Monotone Convergence Theorem (A03) gives the correct sufficient condition.

*MC-3 addressed:* {(−1)ⁿ/n} converges to 0 despite alternating signs, because |aₙ| = 1/n→0 forces all terms into any ε-neighbourhood of 0 for large n.

**Contrast 2 — Unbounded divergence types:**

| Sequence | Behaviour | |
|----------|-----------|--|
| aₙ = n | Grows without bound | Diverges to +∞ |
| aₙ = (−1)ⁿ·n | Oscillates AND grows | Diverges (both unbounded and oscillating) |
| aₙ = sin(nπ/2) | Cycles through 0,1,0,−1,... | Diverges (bounded oscillation) |

**Summary rule:** A sequence converges iff it has exactly one cluster point that captures all tails. Divergence = zero, two, or infinitely many cluster points.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Classify aₙ = (−1)ⁿ + 1/n:

(A) Converges to 0, since 1/n→0 and the (−1)ⁿ term dies out
(B) Diverges; oscillates between approximately +1 and −1 with narrowing swings
(C) Converges to 1, since the even terms approach 1
(D) Diverges to +∞

*Branch CORRECT (B):* Even terms: 1+1/(2k)→1; odd terms: −1+1/(2k+1)→−1. Two distinct cluster points (±1), so no single limit exists. The sequence is bounded and divergent. ✓ Proceed to A03.

*Branch PARTIAL:* You noted the oscillation but may be unsure about the cluster points. Even-index terms converge to +1; odd-index terms converge to −1. A sequence converges only if ALL subsequences converge to the same limit. Since two subsequences converge to different values, the sequence diverges. Proceed to A03.

*Branch INCORRECT (A):* The 1/n part → 0, but it just shrinks the oscillation amplitude — it doesn't eliminate the oscillation. The sequence still has two cluster points ±1. Proceed to A03.

*Branch NO_RESPONSE:* Even terms 1+1/(2k)→1; odd terms −1+1/(2k+1)→−1. Two distinct cluster points → diverges (bounded oscillation). Proceed to A03.

---

### Teaching Action A03 — Monotone Convergence Theorem and Divergence Criterion

**Primitive:** P05 WORKED EXAMPLE
**Purpose:** Give a sufficient condition for convergence (MCT) and its contrapositive for divergence; address MC-3 precisely

---

**[P05 — WORKED EXAMPLE]**

**Monotone Convergence Theorem (MCT):**
If {aₙ} is monotone (non-decreasing or non-increasing) AND bounded, then {aₙ} converges.

**Contrapositive (divergence criterion):**
If {aₙ} is monotone but NOT bounded, then {aₙ} diverges (to ±∞).
If {aₙ} is NOT monotone, the MCT gives no conclusion — need other analysis.

**Worked Example 1 (MCT → convergence):**
aₙ = 1 − 1/n.
- Non-decreasing: aₙ₊₁ − aₙ = 1/(n(n+1)) > 0 ✓
- Bounded above by 1 ✓
- MCT: converges. Limit = 1.

**Worked Example 2 (contrapositive → divergence to +∞):**
aₙ = √n.
- Non-decreasing ✓, but unbounded above ✗
- MCT contrapositive: diverges to +∞.

**Worked Example 3 (non-monotone — MCT inapplicable):**
aₙ = (−1)ⁿ.
- Not monotone → MCT gives no information.
- Must use the limit definition directly: two subsequences (even→+1, odd→−1) → diverges.

**MC-3 precise resolution:**
aₙ = (−1)ⁿ/n: non-monotone → MCT inapplicable. But |aₙ| = 1/n→0 implies directly (squeeze theorem with −1/n ≤ aₙ ≤ 1/n) that aₙ→0. Alternating sign alone tells you nothing; the absolute value behaviour is decisive.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* aₙ = (2n+1)/n = 2 + 1/n. Classify using MCT.

(A) MCT applies: non-decreasing and bounded → converges to 2
(B) MCT applies: non-increasing and bounded → converges to 2
(C) MCT does not apply: sequence is not monotone
(D) MCT applies: non-increasing but unbounded → diverges

*Branch CORRECT (B):* aₙ₊₁ − aₙ = 1/(n+1) − 1/n = −1/(n(n+1)) < 0 → non-increasing. Bounded below by 2 (since 1/n > 0 → aₙ > 2). MCT → converges. Limit = 2 + lim(1/n) = 2. ✓ Proceed to A04.

*Branch PARTIAL:* You correctly identified monotone but chose non-decreasing. Check: aₙ₊₁ = 2+1/(n+1) < 2+1/n = aₙ (since 1/(n+1)<1/n for n≥1) → non-increasing, not non-decreasing. Conclusion is still convergence; limit = 2. Proceed to A04.

*Branch INCORRECT (A, D):* The sequence is non-increasing (terms decrease from 3 toward 2), bounded below by 2. MCT gives convergence to 2. Proceed to A04.

*Branch NO_RESPONSE:* aₙ = 2+1/n is non-increasing (1/n decreases) and bounded below (aₙ > 2 for all n). MCT: converges. Limit = 2. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*For each sequence, classify as convergent or divergent. For divergent sequences, identify the type.*

**Problem 1.** aₙ = (−1)ⁿ · 3

**Problem 2.** aₙ = n²/(n²+1)

**Problem 3.** aₙ = (−1)ⁿ/(n+1)

**Problem 4.** bₙ = 1 − (2/3)ⁿ

---

**[P55 — SCORE]**

*Answers:*

1. Oscillates between +3 and −3; bounded, no limit → **diverges (bounded oscillation)**
2. n²/(n²+1) = 1/(1+1/n²) → 1 → **converges to 1**
3. |aₙ| = 1/(n+1) → 0; squeeze: −1/(n+1) ≤ aₙ ≤ 1/(n+1) → **converges to 0**
4. (2/3)ⁿ → 0 since |2/3|<1 → bₙ → 1 → **converges to 1**

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Let aₙ = n·sin(πn). Classify this sequence as convergent or divergent. Justify your answer by identifying whether the MCT applies or by directly analyzing the limit.

*Expected answer:* sin(πn) = 0 for all integer n (since πn is always a multiple of π and sin(kπ)=0). So aₙ = n·0 = 0 for all n ≥ 1. The sequence is constantly 0 → **converges to 0**. (This tests whether the student correctly evaluates sin at integer multiples of π rather than applying oscillation intuition from the sine function's general graph.)

---

**[P55 — SCORE]**

Transfer probe: 1 point.

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
| 3/5 | → Identify missed items; if MC-1 (bounded=convergent) → B01; if MC-2 (divergence=blowing up) → B02; targeted repair |
| ≤ 2/5 | → Return to A01; rework the formal definition and the taxonomy; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.divergent-sequence` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** none directly (see KG).

Next concept: convergence tests (divergence-test, comparison-test, ratio-test, integral-test) that formally determine whether more complex sequences and their associated series converge or diverge.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — BOUNDED-SEQUENCE-CONVERGES Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You concluded a bounded sequence must converge. Boundedness is necessary for convergence (unbounded sequences diverge) but not sufficient. A bounded sequence can oscillate indefinitely without settling near any single value."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Is {(−1)ⁿ} convergent or divergent? It satisfies |aₙ| ≤ 1 for all n.
*Correct response:* Divergent. Bounded means all terms stay within a finite range — but {(−1)ⁿ} keeps switching between +1 and −1 without settling. The Monotone Convergence Theorem says bounded AND monotone → convergent; {(−1)ⁿ} is bounded but NOT monotone, so MCT is inapplicable and the sequence oscillates.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'bounded → converges' → to: 'bounded + monotone → converges (MCT); bounded alone → may converge or may oscillate (diverge).' The missing ingredient is monotonicity. Use both conditions together."

---

### Repair Action B02 — DIVERGES-ONLY-TO-INFINITY Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You treated divergence as synonymous with growing to infinity. Divergence simply means 'does not converge to a finite limit.' Oscillating sequences that remain bounded are also divergent."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A student says {sin(nπ/2)} is "neither convergent nor divergent because it bounces around without growing." What is wrong?
*Correct response:* {sin(nπ/2)} is divergent. The sequence cycles through 0, 1, 0, −1, ... — multiple cluster points, no single limit. Divergent means not convergent, regardless of whether the terms stay bounded.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'divergent = blows up to ±∞' → to: 'divergent = has no finite limit.' Three types: (1) → +∞, (2) → −∞, (3) oscillates with no single cluster point. All three are divergent."

---

### Repair Action B03 — ALTERNATING-SIGN-IMPLIES-DIVERGENCE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You flagged a sequence as divergent because it has alternating signs. Alternating signs do not guarantee divergence — what matters is whether the terms get arbitrarily close to a single value."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Does {(−1)ⁿ/n} converge or diverge?
*Correct response:* Converges to 0. For any ε>0, choose N>1/ε; then n>N → |aₙ|=1/n<ε. The alternating sign is irrelevant once |aₙ|→0.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'alternating sign → diverges' → to: 'check |aₙ| first; if |aₙ|→0, the sequence converges to 0 regardless of sign pattern.' The Squeeze Theorem applies: −|aₙ| ≤ aₙ ≤ |aₙ| → both sides → 0 → aₙ → 0."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Classify: aₙ = (−1)ⁿ(1+1/n). Convergent or divergent? |
| R2 | 3 days | State MCT precisely. Give one example where MCT applies and one where it does not (explain why not). |
| R3 | 7 days | Show from the definition that {(−1)ⁿ} diverges (exhibit ε and two subsequences with different limits). |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | none |
| Requires (Tier-1) | math.seq.convergent |

**GR-8 compliance:** no cross_links in KG — documented.
**GR-9 compliance:** P76 uses an independent problem (n·sin(πn)) not connected to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **{(−1)ⁿ} is the pillar example:** Every discussion of bounded divergence must anchor to this sequence. Require students to verify via two subsequences (even→+1, odd→−1) before moving on. A student who can do this always correctly applies the two-subsequence test.
- **MCT scope:** The MCT is a convergence theorem, not a divergence theorem. Use its contrapositive (monotone + unbounded → diverges to ±∞) carefully; for non-monotone sequences, it gives no information.
- **{(−1)ⁿ/n} as the test case for MC-3:** This is the most common source of MC-3. Emphasize: the absolute value |aₙ|=1/n tells you everything about whether the sequence has a limit. Signs modulate position around the limit but don't prevent convergence.
- **Connecting to series:** Divergent sequences reappear in the Divergence Test for series (if aₙ↛0, the series diverges). This blueprint is the prerequisite understanding for why the Divergence Test works.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; justified with prior symbolic command | PASS |
| V-4 | bloom=analyze → analysis tasks in A02/A03 present | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P02, A02=P06, A03=P05) |
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
| V-19 | h=4 → standard structure (3 main TAs + gate) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
