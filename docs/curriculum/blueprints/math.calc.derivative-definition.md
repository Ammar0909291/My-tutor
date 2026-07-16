<!-- BLUEPRINT: math.calc.derivative-definition -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Derivative (Definition)
**Concept ID:** `math.calc.derivative-definition`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=10 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.derivative-definition |
| name | Derivative (Definition) |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 10 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.continuity, math.calc.derivative-intro |
| cross_links | math.real.differentiability-rigorous (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.continuity**: limit definition; f continuous at c iff lim_{x→c} f(x)=f(c); continuity on intervals
- **math.calc.derivative-intro**: intuitive notion of instantaneous rate of change; tangent line; introduction to f'(x) notation

### Target Knowledge State
Student understands the formal limit definition f'(x)=lim_{h→0}[f(x+h)−f(x)]/h as the instantaneous rate of change; can compute f'(x) or f'(a) from the definition by simplifying the difference quotient and taking the limit; understands that differentiability at a point implies continuity at that point, but continuity does not imply differentiability; and can identify points of non-differentiability (corners, cusps, vertical tangents).

### Conceptual Obstacles
1. Treating the difference quotient (f(x+h)−f(x))/h at a fixed nonzero h as the derivative — not recognizing that the limit h→0 is essential
2. Believing every continuous function is differentiable — not knowing about corners (|x| at 0) or cusps (x^{2/3} at 0)
3. Failing to simplify the difference quotient algebraically before taking the limit — trying to substitute h=0 directly gives 0/0; the algebraic cancellation step is required

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DIFFERENCE-QUOTIENT-IS-DERIVATIVE | Student confuses the difference quotient (f(x+h)−f(x))/h for a specific h>0 with the derivative; treats it as the answer without taking h→0 | Any computation where the simplified quotient still contains h |
| MC-2 | CONTINUITY-IMPLIES-DIFFERENTIABILITY | Student concludes f is differentiable everywhere because f is continuous; fails to consider corner/cusp points | Problems involving |x|, x^{2/3}, or piecewise functions |
| MC-3 | DIRECT-SUBSTITUTION-INTO-QUOTIENT | Student tries to substitute h=0 directly into [f(x+h)−f(x)]/h before algebraic simplification; gets 0/0 and stops | Every derivative-from-definition computation; the indeterminate form 0/0 is the trigger |

**Foundational Misconception:** MC-1 (DIFFERENCE-QUOTIENT-IS-DERIVATIVE) — the limit step is the entire substance of the definition; without it, the student has computed an average rate of change over an interval, not an instantaneous rate.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: physical instantaneous velocity via speedometer vs. average speed; P: secant line → tangent line as Δx→0; A: limit definition f'(x)=lim_{h→0}[f(x+h)−f(x)]/h
2. **A02 P04 PATTERN INDUCTION** — compute derivative from definition for f(x)=x, f(x)=x², f(x)=1/x; discover the cancellation pattern and power-rule hints
3. **A03 P06 CONTRAST PAIR** — differentiable vs. non-differentiable at a point: smooth curve vs. corner (|x|) vs. cusp; one-sided derivative limits
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Instantaneous Rate Bridge

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Connect the physical notion of instantaneous velocity to the formal limit definition; address MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (speedometer and average speed):**

A car travels 100 km in 2 hours. Average speed = 100/2 = 50 km/h.

But the speedometer reads the speed right now — not the average over 2 hours. At 50 km/h you could have been accelerating, braking, stopping. The speedometer reads the **instantaneous speed**.

How would you compute it? Measure the distance covered in a very short time interval Δt, then divide: speed ≈ Δs/Δt. As Δt → 0, this approaches the true instantaneous speed.

**Stage P — Pictorial (secant → tangent):**

For a function f, the difference quotient gives the slope of the **secant line** through (x, f(x)) and (x+h, f(x+h)):

```
f(x)
  │           ● (x+h, f(x+h))
  │          /·
  │        /   ·  ← tangent (limit)
  │      / secant
  │    ●
  │  (x, f(x))
  └────────────────── x
       x  x+h
```

As h→0, the secant line rotates to become the **tangent line** at (x, f(x)). The slope of the tangent is the derivative.

**Stage A — Algebraic (formal limit definition):**

**f'(x) = lim_{h→0} [f(x+h) − f(x)] / h**

This is the instantaneous rate of change of f at x. It exists if and only if this limit exists.

*Equivalently, at a specific point x=a:*
f'(a) = lim_{h→0} [f(a+h) − f(a)] / h

**Computation procedure (MC-3 antidote):**
1. Substitute f(x+h) and f(x) — expand and simplify the numerator
2. Factor out h from the numerator (this cancels the denominator h)
3. Only then take the limit as h→0 — substituting h=0 is now valid

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* f(x) = 5x. Compute [f(x+h)−f(x)]/h and simplify.

(A) [5(x+h)−5x]/h = 5h/h = 5 (no h remaining)
(B) [5(x+h)−5x]/h = 5(x+h−x)/h = 5x/h (incorrect simplification)
(C) [5(x+h)−5x]/h = [5x+5h−5x]/h = 5 (same as A)
(D) Cannot simplify — must substitute h=0 to get f'(x)

*Branch CORRECT (A or C):* [5(x+h)−5x]/h = 5h/h = 5. Since the simplified quotient has no h remaining, lim_{h→0} 5 = 5 → f'(x)=5. ✓ For a linear function, the instantaneous rate equals the constant slope. Proceed to A02.

*Branch PARTIAL:* You set up the difference quotient correctly but made an algebra error in simplification. 5(x+h)−5x=5h (the x terms cancel), then 5h/h=5. No h remains, so the limit is 5. Proceed to A02.

*Branch INCORRECT (D):* Direct substitution of h=0 before simplification gives 0/0 — an indeterminate form. Always simplify the difference quotient algebraically first so that h cancels. Here: 5h/h=5, then take the limit. Proceed to A02.

*Branch NO_RESPONSE:* [f(x+h)−f(x)]/h=[5x+5h−5x]/h=5h/h=5. The limit as h→0 of 5 is 5 → f'(x)=5. Proceed to A02.

---

### Teaching Action A02 — Pattern Induction from Definition

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Build fluency with the algebraic cancellation step; discover the power rule pattern; address MC-3

---

**[P04 — PATTERN INDUCTION]**

*Compute f'(x) from the definition for each function; identify the pattern.*

**Case 1: f(x) = x**

[f(x+h)−f(x)]/h = [(x+h)−x]/h = h/h = 1 → **f'(x) = 1**

**Case 2: f(x) = x²**

[(x+h)²−x²]/h = [x²+2xh+h²−x²]/h = [2xh+h²]/h = 2x+h → lim_{h→0}(2x+h) = **f'(x) = 2x**

*Key step:* The numerator had h² as well; factor h from both terms: h(2x+h)/h = 2x+h.

**Case 3: f(x) = x³**

[(x+h)³−x³]/h = [x³+3x²h+3xh²+h³−x³]/h = [3x²h+3xh²+h³]/h = 3x²+3xh+h² → **f'(x) = 3x²**

**Case 4: f(x) = 1/x (x≠0)**

[1/(x+h)−1/x]/h = [(x−(x+h))/(x(x+h))]/h = [−h/(x(x+h))]/h = −1/(x(x+h)) → **f'(x) = −1/x²**

*Pattern emerging (power rule):*
| f(x) | f'(x) |
|------|-------|
| x¹ | 1·x⁰ = 1 |
| x² | 2·x¹ = 2x |
| x³ | 3·x² |
| x^{−1} | −1·x^{−2} = −1/x² |

Pattern: f'(xⁿ) = n·x^{n−1} (to be proved in the derivative-rules blueprint).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Using the definition, the first step for f(x)=x² is to expand (x+h)². Which expansion is correct?

(A) x² + 2xh + h² (binomial expansion)
(B) x² + h² (forgetting the cross term)
(C) x² + 2xh (forgetting h²)
(D) x² + 2x (treating h as 1)

*Branch CORRECT (A):* (x+h)² = x²+2xh+h². ✓ The middle term 2xh is critical — it is what survives after canceling x² and then dividing by h. Without it, you get 0 (option B) or an incomplete expression. Proceed to A03.

*Branch PARTIAL:* You may have the expansion right but be unsure how it leads to f'(x)=2x. After subtracting x² and dividing by h: [2xh+h²]/h=2x+h → lim=2x. Proceed to A03.

*Branch INCORRECT (B, C, or D):* The binomial expansion (x+h)²=x²+2·x·h+h². Options B and C miss terms. The cross term 2xh is essential — after canceling x² in the numerator, it gives 2xh/h=2x in the limit. Proceed to A03.

*Branch NO_RESPONSE:* (x+h)²=x²+2xh+h² (expand using FOIL or the binomial theorem). Then [(x+h)²−x²]/h=[2xh+h²]/h=2x+h→2x. Proceed to A03.

---

### Teaching Action A03 — Differentiable vs. Non-Differentiable Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish differentiable from non-differentiable at a point; address MC-2

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Smooth vs. Corner**

| | f(x) = x² (smooth) | g(x) = |x| (corner at 0) |
|--|---------------------|------------------------|
| Continuous at x=0? | Yes | Yes |
| Right difference quotient as h→0⁺ | 2(0)=0 | +h/h = 1 |
| Left difference quotient as h→0⁻ | 2(0)=0 | −h/h = −1 |
| Left limit = Right limit? | Yes (both 0) | **No (1 ≠ −1)** |
| Differentiable at x=0? | **Yes** | **No** |

*Conclusion:* g(x)=|x| is continuous everywhere but not differentiable at x=0. The corner breaks the equal one-sided derivative limits required for the limit to exist.

**Contrast 2 — Differentiability Implies Continuity (but not vice versa)**

Theorem: If f is differentiable at a, then f is continuous at a.
Proof sketch: lim_{h→0}[f(a+h)−f(a)]=lim_{h→0}h·[f(a+h)−f(a)]/h=0·f'(a)=0.

Contrapositive: If f is NOT continuous at a, then f is NOT differentiable at a.
Converse FALSE: f continuous at a does NOT imply f differentiable at a (counterexample: |x| at 0).

**Summary of non-differentiability cases:**
- **Corner:** left and right tangent slopes exist but differ (e.g., |x| at 0)
- **Cusp:** slopes become ±∞ (e.g., x^{2/3} at 0)
- **Vertical tangent:** limit of difference quotient is ±∞ (e.g., ∛x at 0)
- **Discontinuity:** function not continuous → not differentiable

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* h(x) = |x − 2|. Is h differentiable at x = 2? At x = 5?

(A) Differentiable at 2; not differentiable at 5
(B) Not differentiable at 2; differentiable at 5
(C) Differentiable at both
(D) Not differentiable at either

*Branch CORRECT (B):* At x=2: right limit of difference quotient = +1; left limit = −1. Limits disagree → not differentiable at 2. At x=5: h(x)=x−2 near 5 (smooth, linear) → h'(5)=1. Differentiable at 5. ✓ Proceed to A04.

*Branch PARTIAL:* You may have the answer right but be unsure of the reasoning at x=5. Away from the corner (x=2), |x−2|=x−2 for x>2 — a linear function, differentiable everywhere on (2,∞). At x=5, h'(5)=1. Proceed to A04.

*Branch INCORRECT (A, C, or D):* The corner of |x−2| is at x=2, not x=5. At x=5 the function is linear (h(x)=x−2) with slope 1 — smooth and differentiable. At x=2 the left and right slopes disagree (−1 and +1) → not differentiable there. Proceed to A04.

*Branch NO_RESPONSE:* |x−2| has a corner at x=2 (left slope=−1, right slope=+1 → not differentiable). For x>2: h(x)=x−2, linear, h'(5)=1 → differentiable at 5. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Use the limit definition f'(x)=lim_{h→0}[f(x+h)−f(x)]/h.*

**Problem 1.** f(x) = 3x − 7. Find f'(x) from the definition.

**Problem 2.** f(x) = x² + 5x. Find f'(2) from the definition (compute at x=2 directly).

**Problem 3.** f(x) = 1/x. Find f'(x) from the definition. Show all algebraic steps.

**Problem 4.** g(x) = |2x − 4|. At which x-value does g have a corner? Is g differentiable there? Compute the one-sided difference quotient limits to justify.

---

**[P55 — SCORE]**

*Answers:*

1. [3(x+h)−7−(3x−7)]/h = 3h/h = 3 → **f'(x) = 3**

2. [(2+h)²+5(2+h)−(4+10)]/h = [4+4h+h²+10+5h−14]/h = [9h+h²]/h = 9+h → lim = **f'(2) = 9**

3. [1/(x+h)−1/x]/h = [(x−x−h)/(x(x+h))]/h = [−h/(x(x+h))]/h = −1/(x(x+h)) → lim = **f'(x) = −1/x²**

4. Corner at **x=2** (where 2x−4=0).
   Right limit (h→0⁺): [|2(2+h)−4|−0]/h = |2h|/h = 2h/h = 2
   Left limit (h→0⁻): [|2(2+h)−4|−0]/h = |2h|/h = −2h/h = −2 (since h<0, |2h|=−2h)
   Limits disagree (2≠−2) → **not differentiable at x=2**. Differentiable for all x≠2.

Score 1 point per problem (P77 total: 4 points). Problem 3: require explicit algebraic steps (not just the answer).

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links NOT Tier-1)*

*Problem:* A ball is thrown upward. Its height (in meters) at time t (in seconds) is h(t) = 20t − 5t².

(a) Compute the difference quotient [h(t+Δt)−h(t)]/Δt and simplify.

(b) Take the limit as Δt→0 to find h'(t), the instantaneous velocity.

(c) Find the instantaneous velocity at t=1 and t=3.

(d) At what time t does the ball reach its highest point? (Hint: v=h'(t)=0.)

(e) Is h differentiable for all t≥0? Explain briefly.

*Expected answers:*

(a) [20(t+Δt)−5(t+Δt)²−(20t−5t²)]/Δt
   = [20t+20Δt−5t²−10t·Δt−5(Δt)²−20t+5t²]/Δt
   = [20Δt−10t·Δt−5(Δt)²]/Δt
   = 20 − 10t − 5Δt

(b) lim_{Δt→0}(20−10t−5Δt) = **h'(t) = 20 − 10t**

(c) h'(1) = 20−10 = **10 m/s** (still rising); h'(3) = 20−30 = **−10 m/s** (falling)

(d) h'(t)=0 → 20−10t=0 → **t=2 seconds** (maximum height)

(e) Yes — h(t)=20t−5t² is a polynomial, so it is differentiable for all t∈ℝ (no corners, cusps, or discontinuities).

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all five parts correct).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.85 × 5⌉ = 5). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Re-examine missed item; if MC-3 (direct substitution) → B01; if MC-2 (continuity confusion) → B02; targeted repair |
| ≤ 3/5 | → Return to A01; re-engage speedometer analogy and secant→tangent picture; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.calc.derivative-definition` complete. Threshold 0.85 requires 5/5 correct.

**Unlocks:** `math.calc.derivative-rules`, `math.calc.mean-value-theorem`

Next concept recommendation: `math.calc.derivative-rules` — the chain of power/product/chain rules builds directly on the definition proved here.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DIRECT-SUBSTITUTION-INTO-QUOTIENT Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You substituted h=0 before simplifying. At that stage the denominator is also 0, giving 0/0 — an indeterminate form. The point of the algebraic work is to factor h from the numerator so it cancels, making direct substitution valid only afterward."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For f(x)=x², a student writes: [f(x+0)−f(x)]/0=0/0 → "undefined." What should they do instead?
*Correct response:* Expand first: [(x+h)²−x²]/h=[2xh+h²]/h=2x+h. Now substitute h=0: 2x+0=2x. The limit is 2x, not undefined.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'substitute h=0 immediately' → to: 'expand, cancel h, then substitute h=0.' The cancellation step is the algebraic key that resolves the indeterminate form 0/0."

---

### Repair Action B02 — CONTINUITY-IMPLIES-DIFFERENTIABILITY Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You assumed that continuity guarantees differentiability. Continuity is necessary but not sufficient. A function can be continuous at a point but have no well-defined tangent line there — for example, |x| is continuous at 0 but has a sharp corner."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* f(x)=|x|. A student says "f is continuous everywhere, so f'(0) exists." Is this correct?
*Correct response:* No. Check one-sided limits of the difference quotient at 0: right limit=+1, left limit=−1. They differ → f'(0) does not exist. Continuity is necessary but not sufficient for differentiability.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'continuous → differentiable' → to: 'differentiable → continuous (but not the other way).' The direction of implication matters. Always check whether one-sided derivative limits agree at suspected corners or cusps."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Using the definition, find f'(x) for f(x)=2x²−3x. |
| R2 | 3 days | Find f'(4) from the definition for f(x)=√x. (Hint: rationalize using conjugate.) |
| R3 | 7 days | At x=1, is g(x)=|x²−1| differentiable? Compute one-sided limits to decide. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.real.differentiability-rigorous (NOT Tier-1) |
| P76_mode | independence (cross-link NOT Tier-1) |
| Unlocks | math.calc.derivative-rules, math.calc.mean-value-theorem |
| Requires (Tier-1) | math.calc.continuity, math.calc.derivative-intro |

**GR-8 compliance:** cross_links = [math.real.differentiability-rigorous]; NOT Tier-1 → documented.
**GR-9 compliance:** P76 uses an independent problem (projectile motion h(t)=20t−5t²) unrelated to the non-Tier-1 cross-linked concept.

---

## Component 8 — Teaching Notes

- **Algebraic cancellation as the core skill:** The computation `expand → simplify → cancel h → limit` is the entire definition in practice. Students who cannot perform this algebraic step will be blocked from all subsequent derivative computation. Make step 2 (simplification) explicit and slow.
- **Velocity context as anchor:** The speedometer→difference-quotient bridge (A01) should be returned to whenever a student loses meaning. "What is the derivative?" → "Instantaneous rate of change" → "What does 'instantaneous' mean?" → "The limit of average rates as the interval shrinks."
- **|x| is the canonical counterexample:** Every student should be able to explain why |x| is not differentiable at 0. Use it as the template: draw it, compute the one-sided limits, show they disagree.
- **Differentiation rules are not taught here:** This blueprint establishes the definition and computing from it. The derivative-rules blueprint (chain, product, quotient) uses the definition as a black box. Do not anticipate rules here.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; concrete speedometer/velocity present in A01 | PASS |
| V-4 | bloom=understand → P07 not required | N/A |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.real.differentiability-rigorous, NOT T1) |
| V-11 | P76_mode = independence (GR-9, cross-link NOT Tier-1) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.85×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=10 → standard structure (3 main TAs + gate) | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
