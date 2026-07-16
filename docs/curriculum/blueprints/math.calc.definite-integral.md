# Teaching Blueprint — math.calc.definite-integral

## Component 0 — Metadata
concept_id: math.calc.definite-integral
concept_name: Definite Integral
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: understand
estimated_hours: 10
mastery_threshold: 0.80
CPA_entry_stage: C
requires: [math.calc.riemann-sums]
cross_links: [math.real.riemann-integral]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The definite integral ∫_a^b f(x)dx is defined as the limit of Riemann sums: lim_{n→∞} Σᵢ f(xᵢ*)Δx. It measures the signed area between the graph of f and the x-axis from x=a to x=b. Regions above the x-axis contribute positively; regions below contribute negatively. The integral is a single real number, not a function. Key properties: linearity (∫(αf+βg)=α∫f+β∫g), additivity over intervals (∫_a^c f = ∫_a^b f + ∫_b^c f), and reversal of limits (∫_a^b f = −∫_b^a f).

**Conceptual progression:**
1. Definition as Riemann sum limit: partition [a,b], choose sample points, form Σ f(xᵢ*)Δxᵢ, take n→∞.
2. Signed area interpretation: ∫_a^b f(x)dx = (area above x-axis) − (area below x-axis) from a to b.
3. Reversal property: ∫_a^b f = −∫_b^a f. Special case: ∫_a^a f = 0.
4. Interval additivity: ∫_a^c f = ∫_a^b f + ∫_b^c f for any b (including b outside [a,c]).
5. Comparison: if f(x)≤g(x) on [a,b] then ∫_a^b f ≤ ∫_a^b g. Bounds: m(b−a)≤∫_a^b f ≤ M(b−a) where m,M are bounds of f.

**CPA arc (entry: C — advanced difficulty):**
- Concrete: net displacement analogy — if velocity v(t) is positive (moving right) then area above t-axis = distance; negative v(t) means leftward movement subtracts from net displacement. Net displacement = ∫_a^b v(t)dt = signed area.
- Pictorial: graph of f with shaded regions above (positive) and below (negative) the x-axis; labelled with "−" for below; net integral shown.
- Abstract: ∫_a^b f(x)dx = lim_{n→∞} Σᵢ f(xᵢ*)Δx; reversal and additivity formulas.

**Prior knowledge activated:** Riemann sums (math.calc.riemann-sums) — partition, sample points, Δx=( b−a)/n, sum Σf(xᵢ*)Δx; limit concept (math.calc.limits); signed area intuition from geometry.

---

## Component 2 — Misconception Registry

### MC-1: INTEGRAL-IS-ALWAYS-POSITIVE-AREA [FOUNDATIONAL]
**Description:** Learner believes ∫_a^b f(x)dx always equals the total (unsigned) area between the curve and the x-axis — ignores the signed nature, so regions below the x-axis are added (not subtracted). Gives a positive result even when the net integral is zero or negative.
**Surface form:** "∫_{−1}^{1} x dx = the area of two triangles, each of area 1/2, total = 1."
**Root cause:** "Area" is always positive in everyday language and in most geometric contexts. The word "area" in the definition causes the learner to interpret the integral as absolute area. The signed nature (cancellation of positive and negative) requires explicit emphasis.
**Trigger condition:** Any integral over an interval where f changes sign, or any integral of an odd function over a symmetric interval.
**Repair target:** TA-B01.

### MC-2: DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE
**Description:** Learner believes that evaluating ∫_a^b f(x)dx requires finding an antiderivative F(x) and computing F(b)−F(a). Does not recognise that the definite integral is a number defined geometrically/as a limit, and can sometimes be computed from geometry alone without antidifferentiation.
**Surface form:** "I can't evaluate ∫_0^2 √(4−x²) dx because I don't know the antiderivative of √(4−x²)."
**Root cause:** The Fundamental Theorem of Calculus (FTC) is the primary computational tool for definite integrals in most curricula; learners conflate the DEFINITION of the integral (Riemann sum limit) with the COMPUTATION method (FTC). But √(4−x²) over [0,2] is a quarter-circle of radius 2 — area = π.
**Trigger condition:** Any definite integral over a simple geometric shape (semicircle, triangle, trapezoid) where the antiderivative is unknown or complicated.
**Repair target:** TA-B02.

### MC-3: INTEGRAL-ORDER-DOESNT-MATTER
**Description:** Learner writes ∫_a^b f(x)dx = ∫_b^a f(x)dx, treating the limits of integration as unordered. Does not know the reversal property: ∫_a^b f = −∫_b^a f.
**Surface form:** "∫_3^1 x dx = ∫_1^3 x dx = 4."
**Root cause:** Sums (ΣAᵢ) don't depend on the order of the summands. Learner applies this commutative intuition to integrals, ignoring that reversing the limits of integration reverses the direction of traversal and negates the integral.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute the left-Riemann sum for f(x)=x² on [0,2] using n=4 rectangles. What does the sum approximate?" If the learner correctly computes Δx=0.5, evaluates f at 0, 0.5, 1, 1.5, sums 0.5·(0+0.25+1+2.25)=0.5·3.5=1.75, and identifies this as an approximation to ∫_0^2 x² dx, proceed to A01. This confirms the Riemann sum concept and the integral-as-limit idea.

**Scaffolding ladder:**
- Rung 1 (concrete): velocity-time graph; shade regions above and below t-axis; interpret positive as "moved right" and negative as "moved left"; net displacement = signed area.
- Rung 2 (pictorial): graph of f with labelled positive and negative regions; compute integral as (positive area)−(negative area).
- Rung 3 (full understand): apply reversal property, interval additivity, and comparison theorems algebraically.

**Pacing note:** h=10 estimated hours; A01 in sessions 1–2; A02 in sessions 3–4; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Concrete (net displacement):
A particle moves with velocity v(t) (positive = rightward, negative = leftward).
- From t=0 to t=2: v(t)=3 (rightward). Distance = 3·2=6.
- From t=2 to t=3: v(t)=−2 (leftward). Distance = 2·1=2.
- Net displacement = 6−2=4 (4 units to the right of start).
- ∫_0^3 v(t)dt = 4 (signed sum, leftward travel subtracts).

REPRESENTATION 2 — Pictorial (signed area):
Graph of f(x) on [a,b]. Shade the region between f and the x-axis.
- Region above x-axis: area = A₊ (positive contribution).
- Region below x-axis: area = A₋ (negative contribution, absolute value).
- ∫_a^b f(x)dx = A₊ − A₋.

Example: f(x) = x on [−1, 2].
- On [−1,0]: f<0. Triangle below x-axis: area = (1/2)(1)(1) = 1/2. Negative contribution: −1/2.
- On [0,2]: f>0. Triangle above x-axis: area = (1/2)(2)(2) = 2. Positive contribution: +2.
- ∫_{−1}^{2} x dx = −1/2 + 2 = 3/2.

REPRESENTATION 3 — Formal definition:
∫_a^b f(x)dx = lim_{n→∞} Σᵢ₌₁ⁿ f(xᵢ*)·(b−a)/n.
This is a limit of sums — a single real number.

LINKING STATEMENT: "The integral is not 'area' in the colloquial sense — it is SIGNED area. Signed means positive above the x-axis, negative below. All three representations — physical displacement, geometric shading, and algebraic Riemann sum — encode the same idea."

**Assessment primitive: P49**

PROBE: "f(x) is positive on [0,3] (area=5) and negative on [3,7] (area=4). Find ∫_0^7 f(x)dx."
- CORRECT: "Positive contribution: +5. Negative contribution: −4. Integral = 5−4 = 1." → proceed to A02.
- PARTIAL: correct structure but adds both (gets 9) → Repair with B01 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA). "Regions below the x-axis contribute negatively. Integral = A₊ − A₋ = 5 − 4 = 1."
- INCORRECT: says integral = 9 (total area) → Repair with B01.
- NO_RESPONSE: "The definite integral is signed area: regions above contribute positively, regions below negatively. Integral = (area above) − (area below) = 5 − 4 = 1."

---

### TA-B01 — Repair for MC-1 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'the definite integral equals the total positive area under the curve.' The definite integral equals SIGNED area: positive above the x-axis, NEGATIVE below."

**P41 — MISCONCEPTION DETECTOR**
"∫_{−1}^{1} x dx. The graph of y=x is a straight line through the origin. From −1 to 0: below x-axis (area = 1/2). From 0 to 1: above x-axis (area = 1/2). What is ∫_{−1}^{1} x dx?
(A) 1/2 + 1/2 = 1 (total area).
(B) −1/2 + 1/2 = 0 (signed area: below subtracts)."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The integral of x from −1 to 1 is 0 because x is an odd function on a symmetric interval — the left half cancels the right half. The Riemann sum definition makes this precise: for negative f(xᵢ*), the summand f(xᵢ*)·Δx is NEGATIVE. These negative terms cancel positive terms. The result is net signed area. To compute TOTAL (unsigned) area, use ∫_a^b |f(x)|dx — a different computation that requires finding where f changes sign and splitting the interval."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Reversal of limits:
∫_a^b f(x)dx = −∫_b^a f(x)dx.
Proof: reversing the limits reverses the direction of traversal; each Δxᵢ changes sign; the sum negates.
Special case: ∫_a^a f(x)dx = 0 (trivially: no width, no area).

Example: ∫_1^3 x dx = [x²/2]_1^3 = 9/2 − 1/2 = 4.
∫_3^1 x dx = −4.

PAIR B — Interval additivity:
∫_a^c f(x)dx = ∫_a^b f(x)dx + ∫_b^c f(x)dx.
This holds for ANY b, even outside [a,c]. It is a tautology of signed area.

Example: ∫_0^5 f dx = ∫_0^2 f dx + ∫_2^5 f dx.
If ∫_0^5 f=7 and ∫_0^2 f=3, then ∫_2^5 f=4.
Using reversal: ∫_0^5 f = ∫_0^3 f + ∫_3^5 f. If ∫_3^5 f=−2, then ∫_0^3 f=9.

PAIR C — Linearity:
∫_a^b (αf(x)+βg(x))dx = α∫_a^b f(x)dx + β∫_a^b g(x)dx.
Pull constants out; split sums of functions.

COMPARISON:
| Property | Formula | Key insight |
|---|---|---|
| Reversal | ∫_a^b f = −∫_b^a f | Orientation matters |
| Same limits | ∫_a^a f = 0 | No interval, no area |
| Additivity | ∫_a^c f = ∫_a^b f + ∫_b^c f | Split any interval |
| Linearity | ∫αf+βg = α∫f+β∫g | Distributive over sum and scalar |

**Assessment primitive: P49**

PROBE: "Given ∫_0^6 f(x)dx=10 and ∫_4^6 f(x)dx=3, find ∫_0^4 f(x)dx and ∫_4^0 f(x)dx."
- CORRECT: "By additivity: ∫_0^6=∫_0^4+∫_4^6 → 10=∫_0^4+3 → ∫_0^4=7. By reversal: ∫_4^0=−∫_0^4=−7." → proceed to A03.
- PARTIAL: ∫_0^4 correct but ∫_4^0 wrong (also gives 7) → Repair with B03 (INTEGRAL-ORDER-DOESNT-MATTER). "Reversing the limits NEGATES: ∫_4^0=−∫_0^4=−7."
- INCORRECT: subtracts ∫_4^6 from wrong total → Check subtraction: 10−3=7 ✓; correct the step if arithmetic is the only issue.
- NO_RESPONSE: "Additivity: ∫_0^6 f = ∫_0^4 f + ∫_4^6 f. So 10=∫_0^4 f+3 → ∫_0^4 f=7. Reversal: ∫_4^0 f=−∫_0^4 f=−7."

---

### TA-B02 — Repair for MC-2 (DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'you must find an antiderivative to evaluate a definite integral.' The definite integral is defined as a limit of Riemann sums — a number. When the graph is a simple geometric shape, the integral can be found from geometry without any antiderivative."

**P41 — MISCONCEPTION DETECTOR**
"Evaluate ∫_0^3 √(9−x²) dx.
(A) Can't do it — no antiderivative for √(9−x²).
(B) Recognise the graph: y=√(9−x²) is the upper half of a circle of radius 3. On [0,3] it is a quarter-circle. Area = πr²/4 = 9π/4."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The Fundamental Theorem of Calculus gives a SHORTCUT: for many functions, ∫_a^b f(x)dx = F(b)−F(a) where F'=f. But the integral MEANS Riemann sum limit — a geometric area. For simple shapes (triangle, rectangle, semicircle, trapezoid), compute the area from the formula for that shape. ∫_0^2 √(4−x²)dx: upper semicircle of radius 2 → area = π(2)²/4 = π. ∫_0^3 2 dx: rectangle, area = 2·3=6. Always check: is this a simple shape? If yes, use geometry."

→ Return to A01 or A03 as appropriate.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: using properties to evaluate integrals without antiderivatives.

SETUP: suppose we know ∫_0^1 f(x)dx=3, ∫_0^1 g(x)dx=5.

PATTERN 1 — Linearity:
∫_0^1 (2f(x)−3g(x))dx = 2·3−3·5 = 6−15 = −9.
∫_0^1 (f(x)+g(x))dx = 3+5 = 8.

PATTERN 2 — Symmetry:
If f is odd (f(−x)=−f(x)) and the interval is [−a,a]:
∫_{−a}^{a} f(x)dx = 0 (positive and negative halves cancel).
If f is even (f(−x)=f(x)):
∫_{−a}^{a} f(x)dx = 2∫_0^a f(x)dx.

PATTERN 3 — Comparison and bounds:
If 0 ≤ f(x) ≤ 5 on [1,4], then 0 ≤ ∫_1^4 f ≤ 5·3 = 15.
If f(x) ≥ g(x) on [a,b], then ∫_a^b f ≥ ∫_a^b g.

PATTERN 4 — Geometric computation:
∫_0^2 (2−x)dx: triangle with base 2 and height 2, above x-axis. Area = (1/2)(2)(2)=2.
∫_0^4 |x−2|dx: two triangles, each with base 2 and height 2, area = 2·(1/2)(2)(2)=4.
Note: ∫_0^4 (x−2)dx = ∫_0^4 |x−2|dx is false: the former is 0 (odd function symmetric about 2); the latter is 4 (total area). This IS the MC-1 distinction.

**Assessment primitive: P49**

PROBE: "Given that ∫_0^4 f(x)dx=10 and ∫_0^4 g(x)dx=2, find ∫_0^4 (3f(x)+g(x))dx."
- CORRECT: "Linearity: 3·10+1·2=32." → proceed to A04.
- PARTIAL: correct formula, arithmetic error → "3·∫f + 1·∫g = 3(10)+2 = 32."
- INCORRECT: treats as (3+1)·(10+2)=48 (wrong distribution) → "Linearity applies to each integral separately: α∫f+β∫g, not (α+β)·∫(f+g)."
- NO_RESPONSE: "By linearity: ∫_0^4(3f+g)dx=3·∫_0^4 f+1·∫_0^4 g=3(10)+2=32."

---

### TA-B03 — Repair for MC-3 (INTEGRAL-ORDER-DOESNT-MATTER)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'reversing the limits of integration does not change the integral.' Reversing the limits NEGATES the integral: ∫_a^b f = −∫_b^a f."

**P41 — MISCONCEPTION DETECTOR**
"∫_1^3 x dx = 4. What is ∫_3^1 x dx?
(A) Also 4 — the area between x=1 and x=3 is the same regardless of direction.
(B) −4 — reversing the limits reverses the sign."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"In the Riemann sum, Δxᵢ = (b−a)/n. When a<b, Δx>0. When a>b, (b−a)<0, so Δx<0. The entire sum changes sign. Geometrically: traversing from 1 to 3 is a 'forward' sweep; traversing from 3 to 1 is 'backward' — like walking the same path in reverse, accumulating the same shape but with opposite orientation (like a vector going the wrong way). The NUMBER produced is negated. This is why ∫_a^a f=0: b=a gives (b−a)=0 and every Δx=0."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A01 or A03.

### TA-B03 — Repair for MC-3 (INTEGRAL-ORDER-DOESNT-MATTER)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Without computing antiderivatives: (a) Find ∫_{−3}^{3} x³ dx. (b) Find ∫_0^4 √(16−x²) dx."
[Expected: (a) x³ is odd on [−3,3]: integral=0. (b) y=√(16−x²) is the upper half of a circle of radius 4; on [0,4] it is a quarter-circle: area=π(16)/4=4π.]

**Day 10 prompt:**
"Show algebraically that if ∫_a^b f(x)dx=I and ∫_b^c f(x)dx=J then ∫_c^a f(x)dx=−I−J."
[Expected: ∫_c^a f = −∫_a^c f = −(∫_a^b f + ∫_b^c f) = −(I+J) = −I−J.]

**Day 30 prompt:**
"Prove: if f(x)≥0 on [a,b] then ∫_a^b f(x)dx≥0 using the Riemann sum definition."
[Expected: Since f(xᵢ*)≥0 and Δxᵢ=(b−a)/n>0 for a<b, each summand f(xᵢ*)Δxᵢ≥0. The sum Σf(xᵢ*)Δxᵢ≥0. The limit of non-negative quantities is non-negative. So ∫_a^b f≥0.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.calc.riemann-sums — partition, sample points, sum formula Σf(xᵢ*)Δx, and the idea that the definite integral is the limit of these sums; the current blueprint is the formalisation and properties of that limit

**Unlocked blueprints:**
- math.calc.ftc-part1 — Fundamental Theorem of Calculus Part 1: d/dx ∫_a^x f(t)dt = f(x); requires the definite integral as a function of its upper limit
- math.calc.ftc-part2 — FTC Part 2: ∫_a^b f(x)dx = F(b)−F(a); the primary computational tool for definite integrals, built on the definite integral concept developed here

**Cross-links:** math.real.riemann-integral — NOT Tier 1; P76 uses independence mode.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA) is the most damaging misconception: learners who believe integrals are always positive will get wrong answers for all functions that change sign, including every odd-function integral. The net displacement physical analogy (A01) makes signed area feel natural rather than arbitrary.

**Geometry-first evaluation:** Before introducing FTC, present several definite integrals evaluable from geometry — triangles, rectangles, semicircles. This establishes that ∫_a^b f(x)dx is a NUMBER whose value comes from the shape of the graph, not from algebraic manipulation. MC-2 cannot form if the geometric interpretation is primary.

**Reversal property as orientation:** The reversal property (MC-3) is most cleanly understood via the Riemann sum sign flip when Δx=(b−a)/n becomes negative. Students who understand the sign of Δx never forget the reversal property.

**Properties as computational tools:** The linearity, additivity, and comparison properties in A03 should be presented as a toolkit for evaluating integrals given partial information — a style of problem common in calculus courses and the IMO competition context. Practise these before FTC to distinguish the integral's algebraic properties from FTC computation.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: CPA_entry_stage=C (advanced difficulty); concrete anchor included in A01 (net displacement analogy) ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links not Tier 1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; no P07 (WORKED EXAMPLE PAIR not required); B-category primitives P11, P06, P04 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (signed area from graph + additivity + reversal)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: Riemann sum definition, signed area, reversal/additivity/linearity/comparison properties all consistent with Stewart/Apostol calculus; geometric integral examples (quarter-circle, triangle) verified; no fabricated theorems

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"f(x) is above the x-axis on [0,2] (area=4) and below on [2,5] (area=3). Find ∫_0^5 f(x)dx."
[Expected: Signed area: +4−3=1. ∫_0^5 f=1.]

**Item 2:**
"Given ∫_1^5 f(x)dx=8 and ∫_1^3 f(x)dx=5, find ∫_3^5 f(x)dx."
[Expected: Additivity: ∫_1^5=∫_1^3+∫_3^5 → 8=5+∫_3^5 → ∫_3^5=3.]

**Item 3:**
True or False: "∫_5^1 f(x)dx = ∫_1^5 f(x)dx."
[Expected: FALSE. Reversal: ∫_5^1 f = −∫_1^5 f. They are negatives of each other, not equal (unless both are 0).]

**Item 4:**
"Evaluate ∫_0^3 2 dx geometrically (without finding an antiderivative)."
[Expected: f(x)=2 is a horizontal line at height 2. On [0,3], the region is a rectangle with width 3 and height 2. Area = 6. ∫_0^3 2 dx = 6.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"The graph of f(x) on [−2, 4] has the following properties:
- On [−2, 0]: f(x) > 0, and the region between f and the x-axis is a triangle with base 2 and height 3.
- On [0, 4]: f(x) < 0, and the region between f and the x-axis is a rectangle with width 4 and height 1.

(a) Find ∫_{−2}^{0} f(x)dx.
(b) Find ∫_{0}^{4} f(x)dx.
(c) Find ∫_{−2}^{4} f(x)dx.
(d) Find ∫_{4}^{−2} f(x)dx."

[Expected:
(a) f>0 on [−2,0]; triangle area = (1/2)(2)(3)=3. ∫_{−2}^{0} f = +3.
(b) f<0 on [0,4]; rectangle area = 4·1=4, but negative. ∫_0^4 f = −4.
(c) By additivity: ∫_{−2}^{4} f = 3+(−4) = −1.
(d) By reversal: ∫_4^{−2} f = −∫_{−2}^4 f = −(−1) = 1.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if all four parts are correct ((a)=3, (b)=−4, (c)=−1, (d)=1); 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner understands signed area, interval additivity, the reversal property, and geometric evaluation.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or P76(b) (treats negative-area region as positive): → TA-B01 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA), then re-gate
- FAIL on Item 3 (TRUE) or P76(d) (gets −1 instead of 1): → TA-B03 (INTEGRAL-ORDER-DOESNT-MATTER), then re-gate
- FAIL on Item 4 (cannot evaluate without antiderivative): → TA-B02 (DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE), then re-gate
- FAIL on Item 2 (additivity error): → return to A02 additivity/reversal section; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of the definite integral as signed area, its properties, and geometric evaluation.

Key anchors to carry forward:
- Definition: ∫_a^b f(x)dx = lim_{n→∞} Σ f(xᵢ*)Δx. A single real number — signed area.
- Signed: regions below x-axis contribute NEGATIVELY. ∫ of an odd function over symmetric interval = 0.
- Reversal: ∫_a^b f = −∫_b^a f. ∫_a^a f = 0.
- Additivity: ∫_a^c f = ∫_a^b f + ∫_b^c f for any b.
- Linearity: ∫(αf+βg)=α∫f+β∫g.
- Geometry: triangles, rectangles, semicircles can be evaluated without antiderivatives.

Next concepts: math.calc.ftc-part1 and math.calc.ftc-part2 — the Fundamental Theorem connects the definite integral to antiderivatives: ∫_a^b f(x)dx=F(b)−F(a) where F'=f."
