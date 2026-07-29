<!-- BLUEPRINT: math.seq.divergence-test -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Divergence Test (nth Term Test)
**Concept ID:** `math.seq.divergence-test`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=3 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.divergence-test |
| name | Divergence Test (nth Term Test) |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | A (Abstract) — learner has the full convergence machinery from `math.seq.series-convergence`; the Divergence Test is a logical consequence of the partial-sum limit definition, derived symbolically |
| requires (Tier-1) | math.seq.series-convergence |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.series-convergence**: Σaₙ converges iff the sequence of partial sums {Sₙ} has a finite limit L; geometric series formula; Divergence Test mentioned as a corollary (but not fully established as a standalone tool with its limitation)

### Target Knowledge State
Student can state the Divergence Test precisely (if lim aₙ ≠ 0 then Σaₙ diverges); can prove it from the definition of convergence; understands that the converse is FALSE with the harmonic series as the canonical counterexample; and can apply the test as a quick first-pass divergence check, correctly recognising when it is conclusive (diverges) versus inconclusive (aₙ → 0).

### Conceptual Obstacles
1. Concluding convergence from aₙ→0 — the test guarantees divergence when aₙ↛0, but says nothing when aₙ→0; the harmonic series Σ1/n diverges despite 1/n→0
2. Confusing the limit of the terms with the limit of the partial sums — lim aₙ = 0 is about the nth term sequence; lim Sₙ is about the series sum; these are different sequences
3. Believing the Harmonic series converges "very slowly" — Σ1/n diverges (→∞) no matter how slow; there is no "partial convergence"

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DIVERGENCE-TEST-PROVES-CONVERGENCE | Student concludes Σaₙ converges because aₙ→0; treats the Divergence Test as a two-directional test | Any series where the terms go to 0 |
| MC-2 | TERM-LIMIT-EQUALS-PARTIAL-SUM-LIMIT | Student equates lim aₙ with lim Sₙ; believes if the terms approach 0, the partial sums also approach 0 | Series problems where limit of terms is 0 but sum is nonzero |
| MC-3 | HARMONIC-CONVERGES-SLOWLY | Student says Σ1/n "converges very slowly" or "converges but to infinity"; misunderstands that divergence means Sₙ→∞, not slow convergence | Harmonic series discussion |

**Foundational Misconception:** MC-1 (DIVERGENCE-TEST-PROVES-CONVERGENCE) — the most dangerous error; the test is a one-directional divergence test only; addressed by proof in A01 and the harmonic counterexample in A02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — series-convergence definition is the prior foundation.

**Scaffolding sequence:**
1. **A01 P02 FORMAL DEFINITION** — state and prove the Divergence Test; contrast with its false converse; address MC-2
2. **A02 P06 CONTRAST PAIR** — conclusive (diverges) vs inconclusive (aₙ→0) cases with a comparison table; harmonic series as the canonical MC-1 counterexample; address MC-1, MC-3
3. **A03 P05 WORKED EXAMPLE** — systematic application of the Divergence Test as first-pass filter; examples where it concludes and examples where another test is needed
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Statement and Proof

**Primitive:** P02 FORMAL DEFINITION
**Purpose:** Prove the Divergence Test from the convergence definition; establish the one-directional nature; address MC-2

---

**[P02 — FORMAL DEFINITION]**

**Theorem (Divergence Test):**
If Σaₙ converges, then lim_{n→∞} aₙ = 0.

**Equivalently (contrapositive, used in practice):**
If lim_{n→∞} aₙ ≠ 0 (or the limit does not exist), then Σaₙ **diverges**.

**Proof:**
Suppose Σaₙ converges to L. Then {Sₙ} → L and {S_{n−1}} → L.
Since aₙ = Sₙ − S_{n−1}:
```
lim aₙ = lim (Sₙ − S_{n−1}) = L − L = 0   □
```

**The converse is FALSE:**
lim aₙ = 0 does NOT imply Σaₙ converges. The harmonic series Σ1/n is the standard counterexample: 1/n→0 yet Σ1/n diverges (proof in `math.seq.harmonic-series`).

**Two-line usage protocol:**
1. Compute lim_{n→∞} aₙ.
2. If limit ≠ 0 (or doesn't exist) → **DIVERGES** (done).
   If limit = 0 → **INCONCLUSIVE** (need another test).

(MC-2 clarification: lim aₙ is the limit of the sequence of individual terms; lim Sₙ is the limit of accumulated partial sums. These are different sequences. Proof above shows lim aₙ = 0 is NECESSARY for convergence of Σaₙ, not sufficient.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Apply the Divergence Test to Σₙ₌₁^∞ n/(2n+1).

(A) aₙ = n/(2n+1) → 1/2 ≠ 0 → **DIVERGES**
(B) aₙ = n/(2n+1) → 0 → inconclusive
(C) aₙ = n/(2n+1) → ∞ → **DIVERGES**
(D) aₙ = n/(2n+1) → 1/2 → **CONVERGES** to 1/2

*Branch CORRECT (A):* lim n/(2n+1) = lim 1/(2+1/n) = 1/2 ≠ 0 → **DIVERGES** by the Divergence Test. ✓ Proceed to A02.

*Branch INCORRECT (B):* n/(2n+1) = 1/(2+1/n) → 1/2, not 0. When the limit is 1/2 ≠ 0, the Divergence Test concludes divergence immediately. Proceed to A02.

*Branch INCORRECT (D):* The Divergence Test says if lim aₙ = L ≠ 0, the SERIES Σaₙ diverges. The series is not the same as the sequence; the partial sums Sₙ → ∞, not to 1/2. Proceed to A02.

*Branch NO_RESPONSE:* lim n/(2n+1) = 1/2 ≠ 0 → Σn/(2n+1) DIVERGES. The terms don't shrink; each term stays near 1/2, so the sum grows without bound. Proceed to A02.

---

### Teaching Action A02 — Conclusive vs Inconclusive Cases

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Build a clear mental map of when the test settles things and when it doesn't; destroy MC-1, MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Conclusive (DIVERGES) vs Inconclusive (need more):**

| Series | lim aₙ | Divergence Test | Actual behaviour |
|--------|--------|-----------------|-----------------|
| Σ n/(n+1) | → 1 ≠ 0 | **DIVERGES** | Diverges ✓ |
| Σ cos(n) | oscillates, no limit | **DIVERGES** | Diverges ✓ |
| Σ (−1)ⁿ | oscillates between ±1 | **DIVERGES** | Diverges ✓ |
| Σ 1/n | → 0 | **INCONCLUSIVE** | Diverges (harmonic) |
| Σ 1/n² | → 0 | **INCONCLUSIVE** | Converges (π²/6) |
| Σ (1/2)ⁿ | → 0 | **INCONCLUSIVE** | Converges (=2) |

*MC-1 destroyed:* Three series with aₙ→0 have completely different fates — one diverges, two converge. The Divergence Test cannot distinguish them. It only concludes divergence, never convergence.

**Contrast 2 — What "inconclusive" means practically:**

| Verdict | What you know | What to do next |
|---------|--------------|-----------------|
| DIVERGES | Series diverges — done | Nothing |
| INCONCLUSIVE | Series may converge OR diverge | Apply comparison test, ratio test, integral test, etc. |

**MC-3 addressed:** "Converges slowly" is not a mathematical concept. Σ1/n either has a finite limit (converges) or doesn't (diverges). Sₙ = 1+1/2+1/3+⋯+1/n grows like ln n → ∞. No partial sum is "the sum" — the series has no sum.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For each series, state the Divergence Test conclusion:

(I) Σₙ₌₁^∞ 1/n³
(II) Σₙ₌₁^∞ (n+1)/n
(III) Σₙ₌₁^∞ sin(1/n)

(A) I: inconclusive; II: diverges; III: inconclusive
(B) I: converges; II: diverges; III: converges
(C) I: diverges; II: diverges; III: diverges
(D) All three: inconclusive

*Branch CORRECT (A):* (I) 1/n³→0 → inconclusive (actually converges, p-series p=3>1). (II) (n+1)/n=1+1/n→1≠0 → **diverges**. (III) sin(1/n)→sin(0)=0 → inconclusive (actually diverges via comparison with 1/n). ✓ Proceed to A03.

*Branch PARTIAL:* (II) is settled: terms→1≠0, series diverges. (I) and (III) have terms→0 — inconclusive from this test. Proceed to A03.

*Branch INCORRECT (B, D):* The Divergence Test never concludes convergence. (I) and (III) are inconclusive (not "converges"). (II) terms→1≠0 → diverges (not inconclusive). Proceed to A03.

*Branch NO_RESPONSE:* (I) 1/n³→0: inconclusive. (II) 1+1/n→1≠0: DIVERGES. (III) sin(0)=0: inconclusive. Proceed to A03.

---

### Teaching Action A03 — Systematic First-Pass Application

**Primitive:** P05 WORKED EXAMPLE
**Purpose:** Demonstrate the Divergence Test as a first-pass filter in a convergence-testing workflow

---

**[P05 — WORKED EXAMPLE]**

**Strategy:** The Divergence Test is the cheapest test — compute lim aₙ first. If it's non-zero, stop. If it's zero, move to the appropriate deeper test.

**Workflow applied to five series:**

**Series 1: Σ 2ⁿ/(n·2ⁿ + 1) = Σ 1/(n + 1/2ⁿ)**

lim = 1/(n+0) → 0 as n→∞. Inconclusive. (In fact, by comparison with 1/n: diverges.)

**Series 2: Σ (n² + 1)/(3n² − 2)**

lim = (1 + 1/n²)/(3 − 2/n²) → 1/3 ≠ 0. **DIVERGES** — done immediately.

**Series 3: Σ n!/nⁿ**

aₙ = n!/nⁿ = (n/n)·((n−1)/n)·⋯·(1/n) ≤ 1·1·⋯·(1/n) → 0. Inconclusive. (Ratio test: aₙ₊₁/aₙ = (n+1)!/(n+1)^{n+1} · nⁿ/n! = nⁿ/(n+1)ⁿ = (n/(n+1))ⁿ → 1/e < 1 → converges.)

**Series 4: Σ (−1)ⁿ**

lim aₙ does not exist (oscillates). **DIVERGES** — done.

**Series 5: Σ 1/√n**

1/√n → 0. Inconclusive. (p-series p=1/2<1 → diverges, but needs another test.)

**Summary table:**

| Series | lim aₙ | Test result | Next step |
|--------|--------|-------------|-----------|
| (n²+1)/(3n²−2) | 1/3 | **DIVERGES** | None |
| (−1)ⁿ | DNE | **DIVERGES** | None |
| n!/nⁿ | 0 | Inconclusive | Ratio test |
| 1/√n | 0 | Inconclusive | p-series/Integral test |
| 2ⁿ/(n·2ⁿ+1) | 0 | Inconclusive | Comparison test |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* True or False — if the Divergence Test is inconclusive for Σaₙ, the series must converge.

(A) True — inconclusive means we haven't proven divergence yet, so it converges
(B) False — inconclusive means the test gives no information; the series could either converge or diverge
(C) True — if the terms go to 0, the series must sum to 0 or a finite value
(D) False — inconclusive means we know the series diverges but can't prove it yet

*Branch CORRECT (B):* Inconclusive = no conclusion from this test. Σ1/n (divergent) and Σ1/n² (convergent) are both inconclusive for the Divergence Test. Need another test to decide. ✓ Proceed to A04.

*Branch INCORRECT (A, C):* Inconclusive does NOT mean converges. The harmonic series Σ1/n has terms→0 (Divergence Test inconclusive) but diverges. "Inconclusive" means we need more information. Proceed to A04.

*Branch INCORRECT (D):* Inconclusive means we have no information from this test — not that we suspect divergence. The series might converge or diverge. Proceed to A04.

*Branch NO_RESPONSE:* **False.** Inconclusive = test gives no information. Σ1/n and Σ1/n² are both inconclusive here — one diverges, one converges. A different test is required. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Apply the Divergence Test: state DIVERGES or INCONCLUSIVE, and give the value of lim aₙ.*

**Problem 1.** Σ (3n² − 1)/(n² + n)

**Problem 2.** Σ 1/n²

**Problem 3.** Σ arctan(n)

**Problem 4.** Σ (0.99)ⁿ

---

**[P55 — SCORE]**

*Answers:*

1. lim (3n²−1)/(n²+n) = lim (3−1/n²)/(1+1/n) = 3 ≠ 0 → **DIVERGES**
2. lim 1/n² = 0 → **INCONCLUSIVE** (actually converges to π²/6)
3. lim arctan(n) = π/2 ≠ 0 → **DIVERGES**
4. lim (0.99)ⁿ = 0 → **INCONCLUSIVE** (|r|<1, geometric → converges to (0.99)/(1−0.99)=99)

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Three students apply the Divergence Test to the series Σ cos(1/n):

- Student A: "lim cos(1/n) = cos(0) = 1 ≠ 0 → the series diverges."
- Student B: "cos(1/n) oscillates for different n → inconclusive."
- Student C: "cos(1/n) → 1 as n→∞, and 1 ≠ 0, so the series diverges."

(a) Which student(s) are correct, and why?

(b) Does knowing that cos(1/n) → 1 tell you anything about how fast Σcos(1/n) grows?

*Expected answers:*

(a) Students A and C are correct. cos(1/n) is a well-defined limit as n→∞ (since 1/n→0 and cosine is continuous at 0): lim cos(1/n) = cos(0) = 1 ≠ 0. By the Divergence Test, Σcos(1/n) **diverges**. Student B is wrong: cos(1/n) does NOT oscillate (1/n→0 monotonically, so cos(1/n)→1 monotonically from below). "Oscillates" is not a property of this sequence.

(b) Since each term → 1, the partial sums Sₙ ≈ n → ∞ at roughly linear speed. The series grows like n (much faster than the harmonic series which grows like ln n).

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
| 3/5 | → Identify error type; if MC-1 (treated inconclusive as converges) → B01; if MC-2 (confused term limit with partial sum limit) → B02; targeted repair |
| ≤ 2/5 | → Return to A01; reprove the theorem; make the converse failure explicit; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.divergence-test` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** none directly (see KG).

Next concept: `math.seq.comparison-test`, `math.seq.ratio-test`, `math.seq.integral-test` — the tools for settling the inconclusive cases.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DIVERGENCE-TEST-PROVES-CONVERGENCE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You concluded convergence because aₙ→0. The Divergence Test only proves divergence (when aₙ↛0). When aₙ→0, the test is inconclusive — it cannot prove convergence. The harmonic series Σ1/n diverges despite 1/n→0."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Does Σ1/n converge or diverge? What does the Divergence Test say about it?
*Correct response:* Σ1/n diverges (shown via the grouping argument or integral test). The Divergence Test says lim(1/n)=0 → inconclusive. "Inconclusive" is not the same as "converges."

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'aₙ→0 → series converges' → to: 'aₙ→0 → Divergence Test is inconclusive; I need a different test.' The only safe conclusion from the Divergence Test is divergence (when aₙ↛0)."

---

### Repair Action B02 — TERM-LIMIT-EQUALS-PARTIAL-SUM-LIMIT Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You treated lim aₙ as the same as lim Sₙ. These are limits of two different sequences. lim aₙ is the limit of individual terms; lim Sₙ is the limit of running totals. The proof that lim aₙ = 0 is NECESSARY (aₙ = Sₙ − Sₙ₋₁ → L−L = 0) shows they are connected but not equal."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For Σ(1/2)ⁿ: what is lim aₙ, and what is lim Sₙ?
*Correct response:* lim aₙ = lim (1/2)ⁿ = 0. lim Sₙ = 2 (sum of the series). They are different: 0 ≠ 2.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'lim aₙ = lim Sₙ' → to: 'these are different sequences. lim aₙ is the individual-term limit; lim Sₙ is the running total limit. For a convergent series, lim aₙ = 0 but lim Sₙ = S (the sum), and S ≠ 0 in general.'"

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Apply the Divergence Test to Σ (n+2)/(3n+1). State the limit and the conclusion. |
| R2 | 3 days | Give one series with aₙ→0 that converges, and one that diverges. State which test proves each. |
| R3 | 7 days | Prove the Divergence Test from the definition of series convergence (write the proof in full). |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | none |
| Requires (Tier-1) | math.seq.series-convergence |

**GR-8 compliance:** no cross_links in KG — documented.
**GR-9 compliance:** P76 uses an independent problem (cos(1/n)).

---

## Component 8 — Teaching Notes

- **The test is a time-saver, not a complete tool:** Emphasise that the Divergence Test should be the FIRST check applied to any series, before ratio/comparison/integral tests. Its value is speed — if aₙ↛0, one computation ends the problem.
- **The harmonic series is mandatory:** Every student must know Σ1/n diverges despite 1/n→0. This is the cornerstone counterexample for MC-1 and appears in every subsequent convergence-test blueprint as a reference point.
- **Proof is short enough to memorise:** The two-line proof (aₙ = Sₙ−Sₙ₋₁ → L−L=0) is elegant and short. Requiring students to write it from memory in R3 embeds the logical structure rather than just the rule.
- **arctan and similar sequences:** lim arctan(n) = π/2 ≠ 0 is a common trap — students may think arctan(n)→0 because arctan(0)=0. Emphasise that n→∞, not n→0.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; derived logically from prior series-convergence definition | PASS |
| V-4 | bloom=apply → applied in A03 systematically | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P02, A02=P06, A03=P05) |
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
| V-19 | h=3 → compact structure (3 main TAs + gate) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
