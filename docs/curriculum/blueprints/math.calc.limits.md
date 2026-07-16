# Teaching Blueprint — math.calc.limits

## Component 0 — Metadata
concept_id: math.calc.limits
concept_name: Limit of a Function
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: analyze
estimated_hours: 15
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.func.real-valued-function, math.found.real-numbers]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The limit lim_{x→a} f(x) = L means that f(x) can be made arbitrarily close to L by taking x sufficiently close (but not equal) to a. The value (or existence) of f at a is irrelevant to the limit. Formalised by the ε-δ definition: for every ε>0, there exists δ>0 such that 0<|x−a|<δ implies |f(x)−L|<ε.

**Conceptual progression:**
1. Informal intuition: f(x) approaches L as x approaches a — from numerical tables and graphs.
2. The limit is about APPROACH, not arrival — f(a) can be undefined, different from L, or equal to L.
3. One-sided limits: lim_{x→a⁺} f(x) (from the right) and lim_{x→a⁻} f(x) (from the left).
4. Two-sided limit exists if and only if both one-sided limits equal the same value.
5. Limit laws: sum, product, quotient, constant-multiple rules for computing limits of compound expressions.
6. ε-δ definition: making the informal notion precise; δ is a response to an arbitrary challenge ε.

**CPA arc (entry: P):**
- Pictorial: graphs showing f(x) approaching L from left and right as x→a; graphs with holes, jumps, and vertical asymptotes; number line showing δ-neighbourhood of a mapping to ε-neighbourhood of L
- Abstract: formal notation lim_{x→a} f(x) = L; ε-δ definition; limit laws; algebraic cancellation for indeterminate forms

**Prior knowledge activated:** domain and range of a function; real number distance and absolute value |x−a|; function evaluation; factoring polynomials; concept of "infinity" as a process, not a number

---

## Component 2 — Misconception Registry

### MC-1: LIMIT-IS-THE-FUNCTION-VALUE [FOUNDATIONAL]
**Description:** Learner equates lim_{x→a} f(x) with f(a), believing the limit always equals the function value at a.
**Surface form:** For f(x) = (x²−1)/(x−1), evaluates f(1) = 0/0 and reports "limit is undefined" or "limit is 0/0."
**Root cause:** Has only seen continuous functions where limit = value; has not encountered removable discontinuities, holes, or piecewise-defined functions.
**Trigger condition:** Any function with a removable discontinuity or where f(a) is undefined.
**Repair target:** TA-B01.

### MC-2: LIMIT-REQUIRES-f(a)-DEFINED
**Description:** Learner believes a limit can exist only if f is defined at x=a.
**Surface form:** Sees f(x)=(x²−4)/(x−2) and says "no limit at x=2 because f(2) is undefined."
**Root cause:** Same root as MC-1; learner confuses the limit concept (based on approach) with evaluation (based on the point itself).
**Trigger condition:** Any problem where f(a) is undefined but the limit exists.
**Repair target:** TA-B01.

### MC-3: ONE-SIDED-EQUALS-TWO-SIDED
**Description:** Learner computes only the right-hand (or left-hand) limit and reports it as the two-sided limit without checking the other side.
**Surface form:** For f(x)=|x|/x, computes lim_{x→0⁺}=1 and reports lim_{x→0}=1, missing that lim_{x→0⁻}=−1.
**Root cause:** Does not know the existence criterion: two-sided limit requires both one-sided limits to agree.
**Trigger condition:** Any function with a jump discontinuity or where the graph behaves differently from left and right.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** "Does the limit lim_{x→3} (x²−9)/(x−3) exist? If so, what is it?" If learner successfully factors and finds 6 → begin TA-A01. If learner says "undefined" → flag MC-1/MC-2 for TA-B01 after instruction.

**Scaffolding ladder:**
1. Numerical tables: compute f(x) for x approaching a from both sides; observe approach to L
2. Graph reading: identify limits from graphs, including holes and jumps
3. Algebraic computation: factor and cancel for indeterminate 0/0 forms
4. One-sided limits: analyze from left and right separately; determine existence of two-sided limit
5. Limit laws: compute limits of sums/products/quotients without indeterminate forms

**Pacing gate:** Must score ≥ 4/5 on P91 to earn mastery credit (MAMR = 80%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Limits as Approach, Not Arrival
**Primitive sequence:** P11 → P49

**P11 — REPRESENTATION SHIFT:**

*Pictorial — graphical intuition:*
Consider f(x) = (x²−1)/(x−1). At x=1, f(1) = 0/0 (undefined). But plot nearby values:
- x=0.9: f(0.9)=(0.81−1)/(0.9−1)=(−0.19)/(−0.1)=1.9
- x=0.99: f(0.99)=1.99
- x=0.999: f(0.999)=1.999
- x=1.1: f(1.1)=2.1
- x=1.01: f(1.01)=2.01
- x=1.001: f(1.001)=2.001

The graph has a HOLE at (1, 2), but f(x) approaches 2 from both sides. The limit is 2 even though f(1) is undefined.

*Abstract — algebraic approach:*
Factor the numerator: (x²−1)/(x−1) = (x+1)(x−1)/(x−1) = x+1, for x ≠ 1.
As x → 1 (but x ≠ 1): x+1 → 2. So lim_{x→1} (x²−1)/(x−1) = 2.

Key insight: the limit process explicitly excludes x=a (we say "x approaches a" not "x equals a"). The limit is about the behaviour of f NEAR a, not AT a.

*Formal notation:* lim_{x→a} f(x) = L.

**P49 — ADAPTIVE CHECKPOINT:**
"Find lim_{x→2} (x²−4)/(x−2). Note that f(2) is undefined."

- CORRECT (factor to x+2, limit=4): "Correctly factored: (x²−4)/(x−2)=(x+2)(x−2)/(x−2)=x+2 for x≠2. As x→2: x+2→4. Limit=4." → TA-A02
- PARTIAL (correct factor step but wrong arithmetic at the end): "Good factoring. Now substitute x=2 into x+2: 2+2=4. The limit is 4, not what you got." → TA-A02
- INCORRECT (reported "undefined"): "f(2) is undefined, but the limit doesn't evaluate f AT 2 — it asks: where does f(x) go as x APPROACHES 2? Factor out the (x−2) that causes the undefined form." → TA-B01
- NO_RESPONSE: "Factor: x²−4=(x+2)(x−2). Divide: (x+2)(x−2)/(x−2)=x+2 for x≠2. As x→2: x+2→4. Limit=4." → TA-A02

---

### TA-A02 — One-Sided Limits and Existence Criterion
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | Limit EXISTS | Limit DOES NOT EXIST (DNE) |
|---|---|---|
| Example | lim_{x→1} (x²−1)/(x−1) = 2 | lim_{x→0} |x|/x |
| Left-hand limit | 2 | lim_{x→0⁻} |x|/x = −1 |
| Right-hand limit | 2 | lim_{x→0⁺} |x|/x = +1 |
| Both sides equal? | Yes — both equal 2 ✓ | No — −1 ≠ +1 ✗ |
| Conclusion | Two-sided limit = 2 | Two-sided limit DNE |
| f at the point | f(1) undefined (hole) | f(0)=0/0 undefined |

Existence criterion: lim_{x→a} f(x) = L exists if and only if lim_{x→a⁻} f(x) = L = lim_{x→a⁺} f(x).

Third case — limit exists and equals function value (continuous): lim_{x→3} (x+2) = 5 = f(3). All three are equal — this is the SPECIAL case, not the general case.

**P49 — ADAPTIVE CHECKPOINT:**
"Determine whether lim_{x→0} f(x) exists, where f(x)=3 for x<0 and f(x)=−1 for x≥0."

- CORRECT (DNE — left limit=3, right limit=−1, not equal): "Correct. Left limit: as x→0⁻, f(x)=3. Right limit: as x→0⁺, f(x)=−1. 3≠−1 → DNE." → TA-A03
- PARTIAL (correctly computed one limit but didn't compare): "You found one side — now find the other and compare. If they differ, the limit DNE." → TA-A03
- INCORRECT (reported limit=3 or limit=−1 from one side only): "You've computed only one one-sided limit. Check BOTH sides: left limit and right limit. Only if they match is the two-sided limit that common value." → TA-B02
- NO_RESPONSE: "Left: for x<0, f(x)=3 → lim_{x→0⁻}=3. Right: for x≥0, f(x)=−1 → lim_{x→0⁺}=−1. 3≠−1 → limit DNE." → TA-A03

---

### TA-A03 — Limit Laws and Algebraic Computation
**Primitive sequence:** P04 → P49

**P04 — PATTERN INDUCTION:**
Study these examples to identify the limit laws:

Example 1: lim_{x→2} [x+3] = lim_{x→2} x + lim_{x→2} 3 = 2+3 = 5. (Sum law)
Example 2: lim_{x→3} [x·(x−1)] = lim_{x→3} x · lim_{x→3} (x−1) = 3·2 = 6. (Product law)
Example 3: lim_{x→4} [√x] = √(lim_{x→4} x) = √4 = 2. (Root law — for continuous functions)
Example 4: lim_{x→1} [(x²−1)/(x−1)] = lim_{x→1}(x+1) = 2 (after algebraic cancellation — the quotient law can't be applied directly when limit of denominator is 0; cancel first).

Pattern questions:
1. When can you apply limit laws directly? (When no indeterminate form like 0/0 results)
2. What must you do for 0/0 forms? (Factor and cancel the shared factor creating the zero)
3. When can you substitute x=a directly? (When f is defined and continuous at a)

Limit laws summary:
- lim[f±g] = lim f ± lim g (sum/difference)
- lim[f·g] = lim f · lim g (product)
- lim[f/g] = lim f / lim g, provided lim g ≠ 0 (quotient)
- lim[c·f] = c·lim f (constant multiple)

**P49 — ADAPTIVE CHECKPOINT:**
"Compute lim_{x→3} [(x²−9)/(x−3)]. Explain your method."

- CORRECT (factor x²−9=(x+3)(x−3), cancel, limit=6): "x²−9=(x−3)(x+3). After cancellation: x+3. Limit as x→3: 3+3=6." → TA-A04
- PARTIAL (correctly identifies indeterminate form but makes algebraic error): "Good recognition of 0/0 form. Factor x²−9 as (x−3)(x+3). Cancel (x−3) with denominator. Remaining: x+3 → 3+3=6." → TA-A04
- INCORRECT (substituted directly, got 0/0, reported DNE): "0/0 is indeterminate — it means cancel the common factor, not that the limit doesn't exist. Factor the numerator and cancel." → TA-B01
- NO_RESPONSE: "x²−9=(x+3)(x−3). Divide by (x−3): remaining x+3. As x→3: x+3→6. Limit=6." → TA-A04

---

### TA-A04 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 80% → PASS requires ⌈0.80 × 5⌉ = 4/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Compute lim_{x→2} (x²−4)/(x−2). [Answer: factor to (x+2)(x−2)/(x−2) = x+2; limit = 4]
Item 2: Does lim_{x→0} |x|/x exist? Justify using one-sided limits. [Answer: left limit=−1, right limit=1; 1≠−1 → DNE]
Item 3: True or False — if lim_{x→a} f(x) = L, then f(a) = L. [Answer: FALSE — f(a) may be undefined or ≠ L; limit and function value are independent]
Item 4: If lim_{x→2} f(x)=5 and lim_{x→2} g(x)=3, compute lim_{x→2} [2f(x) − g(x)]. [Answer: 2(5)−3=7, by sum/constant-multiple laws]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
Let f(x) = (x²−1)/(x−1) for x≠1, and f(1) = 0.

(a) What is f(1)? [Answer: 0 — defined by the piecewise rule]
(b) What is lim_{x→1} f(x)? [Answer: lim_{x→1}(x+1)=2 (after factoring); limit=2]
(c) Is the limit equal to the function value? [Answer: No — lim=2 but f(1)=0; limit and value are different]
(d) What would f(1) need to equal for the limit and value to agree? [Answer: f(1)=2 — this would make f continuous at x=1]
(e) What is the name for the type of discontinuity at x=1 in the original definition? [Answer: removable discontinuity — the limit exists but differs from (or is not equal to) the function value; a single point can "fill the hole"]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score ≥ 4/5 → PASS → P78 COMPLETION
- Score < 4/5 → FAIL → Route to TA-B01 (limit-vs-value confusion) or TA-B02 (one-sided limit errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Limits of functions: mastered. You can compute limits using algebraic cancellation and limit laws, distinguish limits from function values, apply one-sided limit tests for existence, and recognise removable discontinuities. This is the analytical foundation for continuity and derivatives."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Limit-Is-The-Function-Value / Limit-Requires-f(a)-Defined
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two related errors: LIMIT-IS-THE-FUNCTION-VALUE (claiming lim_{x→a}f(x) = f(a) always) and LIMIT-REQUIRES-f(a)-DEFINED (saying the limit doesn't exist because f(a) is undefined). Both confuse the limit (about APPROACH) with evaluation (about ARRIVAL)."

**P41 — MISCONCEPTION DETECTOR:**
> "Consider f(x)=(x²−1)/(x−1). At x=1: f(1)=0/0 — undefined. But the table shows: f(0.9)=1.9, f(0.99)=1.99, f(1.1)=2.1, f(1.01)=2.01. f(x) approaches 2, even though f(1) is undefined. The limit is 2. The function's undefined state at the target point is irrelevant to the limit."

**P64 — CONCEPTUAL SHIFT:**
> "The limit is a statement about the journey, not the destination. Imagine approaching a city on a road but the city gate is closed (f(a) undefined or different from L). You can still observe how close to the city you're getting — that's the limit. Whether you actually reach the gate doesn't change how close you got. The ε-δ definition encodes this: we require 0<|x−a|<δ (x ≠ a), explicitly excluding x=a from the limit condition."

→ TA-A01

---

### TA-B02 — Repair: One-Sided-Equals-Two-Sided
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error is ONE-SIDED-EQUALS-TWO-SIDED — reporting a limit after checking only one side of approach. The two-sided limit requires agreement from BOTH sides: lim_{x→a}f(x) exists if and only if lim_{x→a⁻}f(x) = lim_{x→a⁺}f(x) = L."

**P41 — MISCONCEPTION DETECTOR:**
> "Test f(x)=|x|/x near x=0. Right: x>0 → |x|=x → f=1. Limit from right=1. Left: x<0 → |x|=−x → f=−1. Limit from left=−1. You found 1 from the right — but the left gives −1. Since 1≠−1, the two-sided limit DNE. Checking only one side missed the contradiction."

**P64 — CONCEPTUAL SHIFT:**
> "The two-sided limit is a bilateral agreement — both parties (left approach and right approach) must agree on the same value L. If you only check one side, you've heard from only one party. Always check both limits and compare: if they agree → L is the limit; if they disagree → limit DNE."

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.calc.limits
  MAMR: 0.80
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Compute lim_{x→3} (x²−9)/(x−3)."
  session_3_probe: "Does lim_{x→2} f(x) exist for f(x)=x+1 when x<2 and f(x)=x²−1 when x≥2?"
  session_7_probe: "Compute lim_{x→0} sin(x)/x. What numerical evidence supports your answer?"
  session_14_probe: "Explain the difference between lim_{x→a}f(x) and f(a). Give an example where they differ."
  session_30_probe: "Sketch a function where lim_{x→2}f(x)=4 but f(2)=7. Is such a function possible? Explain."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.func.real-valued-function — domain, range, function evaluation [BLUEPRINT EXISTS]
- math.found.real-numbers — real number line, absolute value, distance [BLUEPRINT EXISTS]

**Unlocks:**
- math.calc.continuity — f continuous at a iff lim_{x→a}f(x) = f(a)
- math.calc.derivative-definition — derivative as a limit of difference quotient

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The limit-vs-function-value distinction (MC-1/MC-2) is the central conceptual barrier. The numerical table approach in P11 must precede any algebraic technique — learners who jump to algebra without the intuition produce MC-1 errors mechanically.

**V-3 check:** N/A — difficulty is advanced; CPA_ENTRY=P (not C, so V-3 concrete-anchor check does not apply). The pictorial entry (graphs and numerical tables) is appropriate for advanced level.

**Indeterminate forms:** explicitly teach that 0/0 is an INDETERMINATE form (not "undefined limit") — it signals that cancellation is required, not that the limit doesn't exist.

**One-sided limits:** always introduce them via a graph with a visible jump before using piecewise notation. Visual intuition prevents MC-3.

**GR-10 — MAMR enforcement:** MAMR = 80%. For n=5, PASS threshold = ⌈0.80×5⌉ = 4/5. A learner who scores 3/5 or below does NOT receive mastery credit. Routes to TA-B01 or TA-B02, then retakes the gate.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P11 (B-category primitive for advanced/analyze)
- [x] GR-2: Each non-gate TA (A01, A02, A03) contains P49
- [x] GR-3: TA-A04 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A04; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A04 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe uses removable discontinuity analysis
- [x] GR-10: MAMR = 80% stated; PASS threshold = 4/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.calc.limits)
- [x] V-2: difficulty=advanced, bloom=analyze, h=15, thresh=0.80 match KG
- [x] V-3: N/A — difficulty is advanced; CPA_ENTRY=P (not C, so V-3 concrete-anchor check does not apply)
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P11 correctly anchors TA-A01 (representation shift: numerical table → graphical hole → algebraic cancellation)
- [x] V-6: bloom=analyze → P07 not required; no P07 present; P04 used for limit laws (pattern analysis)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.80 × 5⌉ = 4/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items cover algebraic computation, one-sided test, limit≠value, limit laws
- [x] V-13: P76 probe is genuine transfer (piecewise-defined function with removable discontinuity analysis)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain matches h=15 scope (3 main TAs + gate — within spec for h≥6)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 N/A note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Numerical table approach grounds limit intuition before algebraic technique; approach/arrival distinction established before one-sided analysis ✓
- Robust: 3-TA chain balances h=15 depth; P91 gate enforces 80% threshold (4/5) ✓

**STATUS: PACKAGE_READY**
