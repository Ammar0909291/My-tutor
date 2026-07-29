<!-- BLUEPRINT: math.seq.ratio-test -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Ratio Test for Series
**Concept ID:** `math.seq.ratio-test`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=5 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.ratio-test |
| name | Ratio Test for Series |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.seq.series-convergence |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.series-convergence**: Σaₙ converges iff {Sₙ} converges; geometric series converges iff |r| < 1; Divergence Test

### Target Knowledge State
Student can state and apply D'Alembert's Ratio Test: compute L = lim_{n→∞} |a_{n+1}/aₙ|; conclude convergence if L < 1, divergence if L > 1, and recognise the test is inconclusive if L = 1. Student knows the ratio test is especially powerful for series involving factorials (n!), exponentials (rⁿ), or their products, and understands why the test always gives L = 1 for p-series (requiring a different test there).

### Conceptual Obstacles
1. Confusing L = 1 (inconclusive) with divergence — the ratio test gives no information when L = 1; the harmonic series and Σ1/n² both yield L = 1 yet have opposite convergence
2. Factorial algebra errors: replacing (n+1)!/n! with n or 1 rather than (n+1); or mishandling a_{n+1} when aₙ involves (n+1) in the denominator
3. Overgeneralising: applying the ratio test to p-series or simple rational series where it always fails (L = 1 every time) instead of switching to a comparison or integral test

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | RATIO-TEST-L=1-MEANS-DIVERGES | Student sees L = 1 and concludes the series diverges; the test is in fact inconclusive — the series may converge, diverge, or oscillate | Any series whose ratio test gives exactly L = 1 (p-series, many rational series) |
| MC-2 | FACTORIAL-ALGEBRA-ERROR | Student computes (n+1)!/n! as n or 1 instead of n+1; or simplifies a_{n+1}/aₙ by cancelling incorrectly when factorials appear in both numerator and denominator | Any ratio-test problem involving n! |
| MC-3 | RATIO-TEST-UNIVERSAL | Student applies the ratio test to every convergence problem including simple p-series and polynomial/rational series, repeatedly getting L = 1 and stuck; does not recognise the test is inappropriate for these forms | Problems with Σ1/nᵖ, Σn/(n²+1), or any purely polynomial series |

**Foundational Misconception:** MC-1 (RATIO-TEST-L=1-MEANS-DIVERGES) — the most frequent error at the terminal decision step, after correct computation. Addressed directly in A02 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — advanced learner; the ratio test is a fully algebraic criterion grounded in comparison with a geometric series.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — A: derive the ratio test from the geometric-series comparison idea; apply to a factorial-exponential example; establish the three-case decision rule
2. **A02 P04 PATTERN INDUCTION** — apply ratio test to a gallery of factorial/exponential series; discover L = 1 by computing with p-series; formulate the "ratio test domain" (where it works vs. doesn't)
3. **A03 P06 CONTRAST PAIR** — compare ratio test vs. comparison test for the same series; contrast L < 1, L > 1, L = 1 cases side by side
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving and Applying the Ratio Test

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the ratio test in geometric series reasoning; state the three cases; apply correctly to a factorial series

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Algebraic derivation:**

**Key idea:** If the ratio of successive terms eventually looks like a geometric series with ratio L, the series inherits that series's convergence.

Formally, suppose L = lim_{n→∞} |a_{n+1}/aₙ| exists.

If **L < 1**: choose r with L < r < 1. For all large n, |a_{n+1}| < r|aₙ|, so |aₙ| < Crⁿ for some C. Σ|aₙ| ≤ CΣrⁿ (convergent geometric) → Σaₙ **converges absolutely**.

If **L > 1**: eventually |a_{n+1}| > |aₙ| → terms grow → aₙ↛0 → **diverges** by Divergence Test.

If **L = 1**: no conclusion. Both Σ1/n (diverges) and Σ1/n² (converges) give L = 1 — the ratio test is **inconclusive**.

**Ratio Test (D'Alembert):**

L = lim_{n→∞} |a_{n+1} / aₙ|

| L | Conclusion |
|---|-----------|
| L < 1 | Σaₙ **converges** (absolutely) |
| L > 1 | Σaₙ **diverges** |
| L = 1 | **Inconclusive** — need another test |

**Why factorial and exponential series are natural candidates:**

When aₙ = (something)^n or n!, the ratio a_{n+1}/aₙ collapses to a simple expression via cancellation.

**Worked example — Σ 2ⁿ/n!:**

a_{n+1}/aₙ = [2^{n+1}/(n+1)!] / [2ⁿ/n!] = [2^{n+1}·n!] / [2ⁿ·(n+1)!] = 2/(n+1)

L = lim 2/(n+1) = **0** < 1 → **converges**. ✓

(The exponential 2ⁿ is eventually dominated by n! — the series converges rapidly.)

**Worked example — Σ nⁿ/n!:**

a_{n+1}/aₙ = [(n+1)^{n+1}/(n+1)!] / [nⁿ/n!] = [(n+1)^{n+1}·n!] / [(n+1)!·nⁿ] = [(n+1)^n / nⁿ] = (1 + 1/n)ⁿ

L = lim (1 + 1/n)ⁿ = **e** > 1 → **diverges**. ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Apply the ratio test to Σ n!/3ⁿ. What is L and what does the test conclude?

(A) L = 1/3 < 1 → converges
(B) L = n/3 → ∞ > 1 → diverges
(C) L = lim [(n+1)!/3^{n+1}] / [n!/3ⁿ] = lim (n+1)/3 = ∞ → diverges
(D) L = 3/(n+1) → 0 < 1 → converges

*Branch CORRECT (C):* a_{n+1}/aₙ = [(n+1)!·3ⁿ] / [3^{n+1}·n!] = (n+1)/3 → ∞ as n→∞. L > 1 → **diverges** (n! grows faster than 3ⁿ). ✓ Proceed to A02.

*Branch PARTIAL:* You identified L > 1 correctly. The exact limit: (n+1)/3 → ∞ (not just "n/3"); ∞ > 1 means terms grow without bound → diverges. Proceed to A02.

*Branch INCORRECT (A, D):* You may have inverted the ratio. a_{n+1}/aₙ = (n+1)!/3^{n+1} ÷ n!/3ⁿ = (n+1)/3 (factorial simplifies: (n+1)!/n! = n+1; exponential: 3ⁿ/3^{n+1} = 1/3). L = lim (n+1)/3 → ∞ → diverges. Proceed to A02.

*Branch NO_RESPONSE:* a_{n+1}/aₙ = [(n+1)!/3^{n+1}]·[3ⁿ/n!] = (n+1)/3 → ∞. L = ∞ > 1 → diverges. Proceed to A02.

---

### Teaching Action A02 — Pattern Gallery and L = 1 Domain

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Build a rapid-recognition table for when ratio test works; discover L = 1 failure domain through p-series; formulate when to choose ratio test vs. another tool

---

**[P04 — PATTERN INDUCTION]**

**Gallery of ratio-test results:**

| Series | aₙ | a_{n+1}/aₙ | L | Conclusion |
|--------|----|-------------|---|-----------|
| Σ 2ⁿ/n! | 2ⁿ/n! | 2/(n+1) | 0 | converges |
| Σ n!/nⁿ | n!/nⁿ | (n/(n+1))ⁿ = (1/(1+1/n))ⁿ | 1/e | converges |
| Σ nⁿ/n! | nⁿ/n! | (1+1/n)ⁿ | e | diverges |
| Σ n!/3ⁿ | n!/3ⁿ | (n+1)/3 | ∞ | diverges |
| Σ (n+1)/3ⁿ | (n+1)/3ⁿ | (n+2)/(3(n+1)) | 1/3 | converges |
| Σ 1/n² | 1/n² | n²/(n+1)² | 1 | **inconclusive** |
| Σ 1/n | 1/n | n/(n+1) | 1 | **inconclusive** |

**Pattern (inductive observation):**

The ratio test gives L ≠ 1 when: series involves exponentials (rⁿ), factorials (n!), or their products.
The ratio test always gives L = 1 when: series is a rational function of n (powers of n only, no factorial/exponential).

**Why L = 1 for all p-series (proving the pattern):**

aₙ = 1/nᵖ → |a_{n+1}/aₙ| = nᵖ/(n+1)ᵖ = (n/(n+1))ᵖ = (1/(1+1/n))ᵖ → 1ᵖ = **1**.

This holds for every value of p, so the ratio test cannot distinguish convergent from divergent p-series — always L = 1, always inconclusive.

**Decision rule:** Use ratio test when you see n! or rⁿ in aₙ. Use comparison or integral test for rational/polynomial series.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For which of these series is the ratio test likely to give a definitive answer (L ≠ 1)?

(I) Σ n³/2ⁿ   (II) Σ 1/n³   (III) Σ (n!)²/(2n)!

(A) Only I and III; II gives L = 1
(B) All three give L ≠ 1
(C) Only I; II and III give L = 1
(D) None — ratio test always gives L = 1

*Branch CORRECT (A):* (I) has 2ⁿ → L = 1/2 < 1 (converges). (III) has factorials → L = (n+1)²/((2n+2)(2n+1)) = (n+1)²/(2(n+1)(2n+1)) = (n+1)/(2(2n+1)) → 1/4 < 1 (converges). (II) is a p-series → L = 1, inconclusive. ✓ Proceed to A03.

*Branch PARTIAL:* You identified the key series. Confirm (III): (n!)²/(2n)! has ratio [(n+1)!]²/[(2n+2)!] ÷ [(n!)²/(2n)!] = (n+1)²/((2n+2)(2n+1)) → 1/4 < 1 → converges. Proceed to A03.

*Branch INCORRECT (B, C, D):* p-series (II) always gives L = 1 (proven in the gallery above). Series with exponentials (I) and factorials (III) give definitive L values. Proceed to A03.

*Branch NO_RESPONSE:* Ratio test works for n! and rⁿ terms. (I): L = lim [(n+1)³/2^{n+1}]·[2ⁿ/n³] = (1/2)lim[(n+1)/n]³ = 1/2 < 1 → converges. (III): ratio → 1/4 < 1 → converges. (II): rational, L = 1 → inconclusive. Proceed to A03.

---

### Teaching Action A03 — Three-Case Contrast and Test Selection

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast L < 1, L > 1, L = 1 outcomes concretely; compare ratio test with comparison test on the same series to show when each is superior

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Three cases of the ratio test:**

| L | Example | Conclusion | Mistake to avoid |
|---|---------|-----------|----------------|
| L = 0 | Σ 2ⁿ/n!: L=0 | converges | None (L=0 still < 1) |
| L = 1/3 | Σ (n+1)/3ⁿ: L=1/3 | converges | — |
| L = 3/2 | Σ 3ⁿ/2ⁿ = Σ(3/2)ⁿ: L=3/2 | diverges | — |
| L = 1 | Σ 1/n: L=1 (diverges), Σ 1/n²: L=1 (converges) | **inconclusive** | Concluding divergence from L=1 (MC-1) |
| L = ∞ | Σ n!/3ⁿ: L=∞ | diverges | — |

**Contrast 2 — Ratio test vs. comparison test on Σ (n+1)/3ⁿ:**

*Ratio test:* a_{n+1}/aₙ = (n+2)/(3(n+1)) → 1/3 < 1 → converges. ✓ (3 lines)

*Comparison test:* (n+1)/3ⁿ ≤ 2n/3ⁿ = 2·n·(1/3)ⁿ. Need to show Σn·(1/3)ⁿ converges — requires differentiation of the geometric series or a separate argument. (Many more steps)

Verdict: ratio test is far more efficient here because of the 3ⁿ factor.

**Contrast 3 — Ratio test vs. comparison test on Σ 1/(n²+1):**

*Ratio test:* L = lim (n/(n+1))² → 1. Inconclusive.

*LCT with 1/n²:* L = lim [n²/(n²+1)] = 1 → converges. ✓

Verdict: for polynomial denominators, comparison or LCT is always better.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Apply the ratio test to Σ n²·2ⁿ/n!. Compute L and state the conclusion.

(A) L = 2/(n+1) → 0 < 1 → converges (ignoring the n² factor incorrectly)
(B) L = lim [(n+1)²·2^{n+1}/(n+1)!] / [n²·2ⁿ/n!] = lim [2(n+1)/n²] = 0 < 1 → converges
(C) L = lim 2(n+1)²/n² = 2 > 1 → diverges
(D) L = 1 → inconclusive (n² makes this a polynomial-type series)

*Branch CORRECT (B):* a_{n+1}/aₙ = [(n+1)²·2^{n+1}/(n+1)!]·[n!/(n²·2ⁿ)] = [2(n+1)²·n!]/[n²·(n+1)!] = [2(n+1)²]/[n²·(n+1)] = 2(n+1)/n² → 0 as n→∞. L = 0 < 1 → **converges**. ✓ Proceed to A04.

*Branch PARTIAL:* You set up the ratio correctly. Simplify: (n+1)!/n! = n+1; the n² factor cancels partly: 2(n+1)²/[n²(n+1)] = 2(n+1)/n² → 0. L = 0 < 1 → converges. Proceed to A04.

*Branch INCORRECT (C, D):* (C) This would mean the n² grows faster than the factorial, but n! grows far faster than any polynomial — L should go to 0. (D) This series has 2ⁿ/n! which makes it ratio-test–friendly; L → 0, not 1. Proceed to A04.

*Branch NO_RESPONSE:* aₙ = n²·2ⁿ/n!; a_{n+1} = (n+1)²·2^{n+1}/(n+1)!. Ratio = 2(n+1)²/[n²(n+1)] = 2(n+1)/n² → 0. L = 0 < 1 → converges. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

*Apply the ratio test to each series. State L, and conclude convergence, divergence, or inconclusiveness (with a note on what to try instead).*

**Problem 1.** Σₙ₌₁^∞ 2ⁿ/n!

**Problem 2.** Σₙ₌₁^∞ nⁿ/n!

**Problem 3.** Σₙ₌₁^∞ (n+1)/3ⁿ

**Problem 4.** Σₙ₌₁^∞ 1/n² (apply ratio test; state what it tells you and what test you would use instead)

---

**[P55 — SCORE]**

*Answers:*

1. a_{n+1}/aₙ = 2/(n+1) → L = **0** < 1 → **converges** ✓

2. a_{n+1}/aₙ = (1+1/n)ⁿ → L = **e** ≈ 2.718 > 1 → **diverges** ✓

3. a_{n+1}/aₙ = (n+2)/(3(n+1)) → L = **1/3** < 1 → **converges** ✓

4. a_{n+1}/aₙ = n²/(n+1)² → L = **1** → **inconclusive**. Use p-series test (p=2 > 1) or integral test to confirm convergence. ✓

Score 1 point per problem. Problem 4: must state both that ratio test is inconclusive AND name a valid alternative test.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Determine whether Σₙ₌₁^∞ n²/3ⁿ converges or diverges.

*(a)* Set up the ratio a_{n+1}/aₙ and simplify fully.

*(b)* Compute L = lim_{n→∞} |a_{n+1}/aₙ|.

*(c)* State the conclusion and verify that the test is definitive (L ≠ 1).

*Expected answer:*

*(a)* a_{n+1}/aₙ = [(n+1)²/3^{n+1}] / [n²/3ⁿ] = (n+1)²/(3n²)

*(b)* L = lim (n+1)²/(3n²) = lim (n²+2n+1)/(3n²) = **1/3** < 1 ✓

*(c)* L = 1/3 < 1 → **converges** absolutely. Definitive since L ≠ 1.

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all three parts correct; 0.5 if L correct but conclusion omitted or setup has minor error).

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
| 3/5 | → Identify missed items; L=1 error → B01; factorial algebra → B02; wrong test choice → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-derive the geometric-series connection; drill factorial simplification; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.ratio-test` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** math.seq.root-test (natural follow-up — root test is strictly stronger; understanding ratio test first motivates root test).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — RATIO-TEST-L=1-MEANS-DIVERGES Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You concluded the series diverges because the ratio test gave L = 1. When L = 1, the ratio test tells you nothing — it cannot distinguish convergence from divergence. Both Σ1/n (diverges) and Σ1/n² (converges) yield L = 1."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* The ratio test gives L = 1 for Σ1/n. What can you conclude?
*Correct response:* Nothing from the ratio test alone. L = 1 is the inconclusive case. To determine convergence we need the p-series test (p=1 → diverges) or the integral test — neither of which is the ratio test.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'L = 1 → diverges' → to: 'L = 1 → ratio test is uninformative; switch to a different test (comparison, LCT, integral test, p-series test) suited to the form of the series.' The value L = 1 is not a verdict — it is an absence of evidence."

---

### Repair Action B02 — FACTORIAL-ALGEBRA-ERROR Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You simplified a factorial ratio incorrectly. The key identity: (n+1)!/n! = n+1 (not n, not 1). Every other factor in the ratio must also be updated — replacing n with n+1 throughout a_{n+1}."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Simplify a_{n+1}/aₙ where aₙ = 3ⁿ/(n!).
*Correct response:* a_{n+1} = 3^{n+1}/(n+1)!. Ratio = 3^{n+1}/(n+1)! · n!/3ⁿ = 3/(n+1). Note: (n+1)!/n! = n+1, so division flips it to n!/（n+1)! = 1/(n+1). Students who write 3/(n!) are missing the cancellation.

**[P64 — CONCEPTUAL SHIFT]**
"For any factorial ratio: (n+1)!/n! = n+1. Write it out: (n+1)! = (n+1)·n·(n−1)·…·1 = (n+1)·n!. So (n+1)!/n! = n+1. Drill this identity until it is automatic. When computing a_{n+1}, replace every n with n+1 in the formula — every occurrence, including exponents."

---

### Repair Action B03 — RATIO-TEST-UNIVERSAL Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You applied the ratio test to a series with only polynomial terms. For any p-series or rational series in n, the ratio test always returns L = 1 and is always inconclusive. The ratio test is designed for series with factorial or exponential factors."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Compute the ratio test limit for Σ1/n³.
*Correct response:* L = lim (n/(n+1))³ = 1. Inconclusive. This is the pattern for all p-series. Use the p-series test directly: p = 3 > 1 → converges.

**[P64 — CONCEPTUAL SHIFT]**
"Test-selection rule: scan aₙ for the tell-tale signs. See n! or rⁿ (or both)? → ratio test is your first choice. See only nᵖ, polynomials, or rational functions? → skip the ratio test entirely; use LCT or integral test. Using the ratio test on the wrong series type wastes effort and always gets stuck at L = 1."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Apply the ratio test to Σ n³/2ⁿ. State L and conclude. |
| R2 | 3 days | Apply the ratio test to Σ (2n)!/(n!)². Compute a_{n+1}/aₙ carefully — both factorials change. State L and conclude. |
| R3 | 7 days | The ratio test gives L = 1 for Σ 1/√n. What test should be used instead? Apply it and state the conclusion. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.seq.root-test |
| Requires (Tier-1) | math.seq.series-convergence |

**GR-8 compliance:** cross_links = none.
**GR-9 compliance:** P76 uses an independent problem unrelated to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **Factorial cancellation is the core skill:** Before teaching the ratio test, confirm students can compute (n+1)!/n! = n+1 fluently. Failure here (MC-2) is the most time-consuming repair because it is a mechanical prerequisite, not a conceptual one — drill it separately if needed.
- **L = 1 is the only nuanced case:** MC-1 is conceptually important: L = 1 carries no information. Make sure students can name two examples with L = 1 and opposite fates (harmonic: L=1, diverges; Σ1/n²: L=1, converges) — having both in memory permanently defeats MC-1.
- **The ratio test outperforms comparison for exponential/factorial series:** Comparison tests for Σ2ⁿ/n! would need an upper bound — the ratio test settles it in one step. Teach students to see the factorial/exponential flag and reach for the ratio test immediately.
- **R2 is demanding:** Σ(2n)!/(n!)² is related to the central binomial coefficients; a_{n+1}/aₙ = (2n+2)(2n+1)/(n+1)² = 2(2n+1)/(n+1) → 4 > 1 → diverges. This is a useful higher-difficulty practice item.
- **Connection to power series (future):** The ratio test is the primary tool for finding the radius of convergence of a power series — every student who masters the ratio test here will have a much easier time with power series later.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; abstract derivation from geometric series | PASS |
| V-4 | bloom=apply → P07 not required | N/A |
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
| V-19 | h=5 → 3 main TAs + gate appropriate | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
