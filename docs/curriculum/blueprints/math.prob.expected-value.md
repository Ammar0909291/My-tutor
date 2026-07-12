<!-- BLUEPRINT: math.prob.expected-value -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Expected Value
**Concept ID:** `math.prob.expected-value`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.expected-value |
| name | Expected Value |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.prob.random-variable, math.prob.pmf, math.prob.pdf |
| cross_links | — |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.random-variable**: X maps outcomes to numbers; discrete vs. continuous distinction
- **math.prob.pmf**: P(X=x) for discrete RVs; probabilities sum to 1
- **math.prob.pdf**: f(x) for continuous RVs; probabilities are areas under the curve

### Target Knowledge State
Student can compute E[X] = Σx·P(X=x) for discrete RVs and E[X] = ∫x·f(x)dx for continuous RVs, interpret expected value as the long-run average (center of mass of the distribution), and distinguish it from the arithmetic mean of outcomes.

### Conceptual Obstacles
1. Conflating E[X] with the unweighted arithmetic average (1+2+3+…)/n, ignoring probabilities
2. Applying the discrete sum formula to a continuous RV (no PMF exists)
3. Believing E[X] must equal a value X can actually take

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ARITHMETIC-AVERAGE-CONFUSION | Student computes (x₁+…+xₙ)/n, treating each outcome as equally likely regardless of given probabilities | Non-uniform PMF where probabilities differ across outcomes |
| MC-2 | DISCRETE-FORMULA-FOR-CONTINUOUS | Student writes E[X]=Σx·P(X=x) for a continuous RV, plugging in individual point values | Given a continuous RV described by a PDF |
| MC-3 | EXPECTED-MUST-BE-ACHIEVABLE | Student rejects a fractional or non-integer E[X] as "impossible" because no single trial yields exactly that value | Lottery-type problems where E[X] is not in the support of X |

**Foundational Misconception:** MC-1 (ARITHMETIC-AVERAGE-CONFUSION) — most common entry error; addressed directly in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** Pictorial (P) — proficient learner.

**Scaffolding sequence:**
1. **A01 P03 ANALOGY BRIDGE** — connect weighted GPA average (known) to probability-weighted average; pictorial balance-point diagram on a number line
2. **A02 P07 WORKED EXAMPLE PAIR** — apply both formulas: WE1 discrete (lottery PMF), WE2 continuous (Uniform PDF with integral + symmetry cross-check)
3. **A03 P91 Gate** — mastery assessment

**V-3 (CPA Concrete stage):** N/A — proficient learner enters at Pictorial stage.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Weighted Average Analogy

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Build the probability-weighted average concept; address MC-1

---

**[P03 — ANALOGY BRIDGE]**

*Source domain (familiar):* Weighted course grade. Final grade = 40% midterm + 60% final.
- Midterm score 70, Final score 90: Grade = 0.40×70 + 0.60×90 = 28 + 54 = **82**
- Simple average: (70+90)/2 = 80 — wrong, because the two components carry different weights

*Bridge:* A random variable X is like a test with outcomes as "scores." Each outcome xᵢ is weighted by how likely it is — its probability P(X=xᵢ).

*Target domain (new):* **Expected value = probability-weighted average**

| Type | Formula |
|------|---------|
| Discrete | E[X] = Σ xᵢ · P(X=xᵢ) |
| Continuous | E[X] = ∫₋∞^∞ x · f(x) dx |

*Pictorial — balance point on a number line:*

A loaded die with P(1)=0.5, P(2)=0.3, P(3)=0.2:

```
Probability mass:
  0.5        0.3    0.2
   ↓          ↓      ↓
───●──────────●──────●───
   1          2      3
              ▲
           E[X] = 1.7
```

E[X] = 1(0.5) + 2(0.3) + 3(0.2) = 0.5 + 0.6 + 0.6 = **1.7**

Arithmetic mean: (1+2+3)/3 = 2.0 — incorrect, pulled too far right because it ignores that P(1) is largest.

**Key insight:** E[X] is the balance point (center of mass) of the distribution. High-probability outcomes pull it toward them.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X has PMF: P(X=2)=0.6, P(X=8)=0.4. Which is E[X]?

(A) 5 — the midpoint of 2 and 8
(B) 4.4 — probability-weighted average
(C) 2 — the more probable value
(D) 8 — the larger value

*Branch CORRECT (B):* E[X] = 2(0.6) + 8(0.4) = 1.2 + 3.2 = 4.4. ✓ The balance point sits below the midpoint 5 because X=2 is more likely. Proceed to A02.

*Branch PARTIAL:* You set up the weighted sum correctly but made a computation error. E[X] = 2(0.6) + 8(0.4) = 1.2 + 3.2 = 4.4. Re-check your multiplication, then proceed to A02.

*Branch INCORRECT (A, C, or D):* Answer A ignores probabilities — it is the arithmetic midpoint, not the weighted average. Multiply each value by its probability: E[X] = 2×0.6 + 8×0.4 = 1.2 + 3.2 = 4.4. The result is pulled toward 2 because P(X=2)=0.6 is larger. Revisit the balance-point diagram above, then proceed to A02.

*Branch NO_RESPONSE:* E[X] = Σ xᵢ·P(X=xᵢ) = 2(0.6) + 8(0.4) = 4.4. Each outcome is multiplied by its probability before summing. Proceed to A02.

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Apply the formula to both discrete and continuous cases; address MC-2 and MC-3

---

**[P07 — WORKED EXAMPLE PAIR]**

**Worked Example 1 — Discrete RV (Lottery)**

*Problem:* A lottery ticket costs $1. With probability 0.01 you win $50 (net gain $49); with probability 0.99 you lose (net gain −$1). Find E[X].

*Solution:*

| xᵢ | P(X=xᵢ) | xᵢ · P(X=xᵢ) |
|----|---------|-------------|
| 49 | 0.01 | 0.49 |
| −1 | 0.99 | −0.99 |

E[X] = 0.49 + (−0.99) = **−$0.50**

*Interpretation:* On average you lose $0.50 per ticket played. Note: −$0.50 is never the actual outcome of any single play — it is the long-run average. **E[X] need not be a value X can take** (MC-3 addressed).

---

**Worked Example 2 — Continuous RV (Uniform)**

*Problem:* X ~ Uniform on [1, 5], so f(x) = 1/4 for 1 ≤ x ≤ 5. Find E[X].

*Solution — integral formula:*

E[X] = ∫₁⁵ x · (1/4) dx = (1/4) ∫₁⁵ x dx = (1/4)[x²/2]₁⁵ = (1/4)(25/2 − 1/2) = (1/4)(12) = **3**

*Cross-check — symmetry formula for U(a,b):* E[X] = (a+b)/2 = (1+5)/2 = 3 ✓

*Key contrast:* We used ∫x·f(x)dx, NOT Σx·P(X=x). A continuous RV has P(X=x)=0 for every single point — the discrete sum formula does not apply (MC-2 addressed).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* X has PDF f(x) = 2x on [0, 1]. Which expression correctly sets up E[X]?

(A) ∫₀¹ x · 2x dx
(B) Σ x · 2x (sum over all x in [0, 1])
(C) ∫₀¹ 2x dx (integral of f(x) alone)
(D) (0+1)/2 = 0.5 (midpoint of the support)

*Branch CORRECT (A):* E[X] = ∫₀¹ 2x² dx = 2[x³/3]₀¹ = 2/3. ✓ You correctly multiplied x by f(x)=2x to get the integrand 2x². Note that D gives the midpoint of the support, not the expected value — they agree only for symmetric distributions like Uniform. Proceed to A03.

*Branch PARTIAL:* You recognized the integral is needed but may have integrated f(x) without the x weighting. The integrand must be x·f(x) = x·2x = 2x². E[X] = ∫₀¹ 2x² dx = 2/3. Proceed to A03.

*Branch INCORRECT (B):* Option B uses a discrete sum — but X is a continuous RV with a PDF. No point has positive probability mass. Use the integral: E[X] = ∫₀¹ x · 2x dx = 2/3. Proceed to A03.

*Branch NO_RESPONSE:* For a continuous RV with PDF f(x), use E[X] = ∫ x · f(x) dx. Here: E[X] = ∫₀¹ x · 2x dx = ∫₀¹ 2x² dx = 2[x³/3]₀¹ = 2/3. Proceed to A03.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Solve all four problems. Show your work.*

**Problem 1.** X = number of heads when flipping 2 fair coins.
PMF: P(X=0)=1/4, P(X=1)=1/2, P(X=2)=1/4. Find E[X].

**Problem 2.** A game pays: win $10 with probability 0.3; break even ($0) with probability 0.2; lose $3 with probability 0.5. Find E[X]. Is this game worth playing?

**Problem 3.** X ~ Uniform on [4, 10]. Find E[X] using:
(a) The integral formula ∫₄¹⁰ x · f(x) dx
(b) The symmetry formula (a+b)/2
Confirm both agree.

**Problem 4.** X has PDF f(x) = 3x² on [0, 1]. Find E[X].

---

**[P55 — SCORE]**

*Answers:*
1. E[X] = 0(1/4) + 1(1/2) + 2(1/4) = 0 + 1/2 + 1/2 = **1**
2. E[X] = 10(0.3) + 0(0.2) + (−3)(0.5) = 3 + 0 − 1.5 = **1.5** — worth playing (E[X] > 0)
3. (a) f(x) = 1/6; E[X] = (1/6)∫₄¹⁰ x dx = (1/6)[x²/2]₄¹⁰ = (1/6)(50−8) = 42/6 = **7**
   (b) (4+10)/2 = **7** ✓
4. E[X] = ∫₀¹ x · 3x² dx = 3∫₀¹ x³ dx = 3[x⁴/4]₀¹ = **3/4**

Score 1 point per problem (P77 total: 4 points).

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links = [])*

*Problem:* You draw a single card from a standard 52-card deck and receive the following payoff X:
- Draw a heart (13 cards): win $3
- Draw a spade or club (26 cards): win $0
- Draw a diamond (13 cards): lose $2

(a) Write the PMF of X. Express probabilities as fractions in simplest form.
(b) Compute E[X].
(c) If you play this game 200 times, approximately how much do you expect to win or lose in total? Justify using E[X].

*Expected answers:*

(a) P(X=3) = 13/52 = 1/4; P(X=0) = 26/52 = 1/2; P(X=−2) = 13/52 = 1/4

(b) E[X] = 3(1/4) + 0(1/2) + (−2)(1/4) = 3/4 + 0 − 1/2 = 3/4 − 2/4 = **1/4 = $0.25**

(c) 200 × $0.25 = **$50 expected total gain** — each play averages $0.25, so 200 plays average $50.

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all three parts correct — PMF, E[X] value, and linearity application).

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
| 4/5 | → Re-examine missed item; targeted re-explanation; concept marked proficient with review flag |
| ≤ 3/5 | → Return to A01; re-engage the balance-point analogy; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.prob.expected-value` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** `math.prob.variance`, `math.prob.moments`

Next concept recommendation: `math.prob.variance` — builds directly on E[X²] − (E[X])², which uses the expected-value formula again.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ARITHMETIC-AVERAGE-CONFUSION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You computed (x₁+x₂+…+xₙ)/n — the arithmetic mean. This treats every outcome as equally likely. In probability, outcomes carry different weights: their probabilities."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A biased coin gives Heads (X=1) with probability 0.8 and Tails (X=0) with probability 0.2. A student says E[X] = (0+1)/2 = 0.5. What is the correct E[X]?
*Correct response:* E[X] = 0(0.2) + 1(0.8) = **0.8** — the high probability of Heads pulls the expected value far above the midpoint.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'add outcomes and divide by count' → to: 'multiply each outcome by its probability, then sum.' The probabilities are the weights, and they need not be equal. E[X] is the balance point of the distribution — it is always pulled toward the most probable outcomes."

---

### Repair Action B02 — DISCRETE-FORMULA-FOR-CONTINUOUS Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used the discrete sum Σx·P(X=x) for a continuous RV. For a continuous RV, P(X=x)=0 for every individual point — there are no probability mass spikes. The PDF f(x) gives density, not point probability."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* X has PDF f(x)=4x³ on [0,1]. Which correctly computes E[X]?
(A) Σx·4x³ over all x∈[0,1]; (B) ∫₀¹ x·4x³ dx
*Correct response:* (B): E[X] = ∫₀¹ 4x⁴ dx = 4[x⁵/5]₀¹ = 4/5.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: Σx·P(X=x) → to: ∫x·f(x)dx. The integral is the exact continuous analogue of the discrete sum — it replaces Σ with ∫ and replaces P(X=x) with f(x)dx. Think of f(x)dx as the probability weight on the infinitesimal interval [x, x+dx]."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | X has PMF: P(X=0)=0.3, P(X=1)=0.5, P(X=4)=0.2. Find E[X]. |
| R2 | 3 days | X ~ Uniform on [0, 6]. Find E[X] using the integral formula. |
| R3 | 7 days | X has PDF f(x)=2x on [0,1]. (a) Find E[X]. (b) Is E[X] equal to 0.5 (the midpoint of [0,1])? Explain. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | — |
| P76_mode | independence (cross_links = []) |
| Unlocks | math.prob.variance, math.prob.moments |
| Requires (Tier-1) | math.prob.random-variable, math.prob.pmf, math.prob.pdf |

**GR-8 compliance:** No cross-links to document.
**GR-9 compliance:** P76 uses an independent novel problem (card game payoff) unrelated to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **MC-1 prevention:** Always introduce the analogy (weighted GPA) before showing the formula; students who have computed GPA are already familiar with weighted averaging, making the bridge very short.
- **WE1 interpretation:** Explicitly state that −$0.50 is never the actual outcome of any single play — this directly confronts MC-3 without requiring a separate repair action.
- **Discrete/continuous pairing:** WE1 (lottery) and WE2 (Uniform PDF) are intentionally adjacent so students see the structural parallel before the gate. The symmetry cross-check in WE2 reinforces verification habits.
- **Linearity hook:** Part (c) of P76 introduces the idea that 200E[X] = total expected gain — a preview of the Linearity of Expectation concept that the math.prob.linearity-expectation blueprint will formalize.

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
