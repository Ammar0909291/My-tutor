# Blueprint: math.func.vertex-form

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.vertex-form |
| name | Vertex Form of a Quadratic |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.quadratic-function, math.alg.completing-the-square |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a quadratic function in standard form f(x)=ax²+bx+c, the student converts it to vertex form f(x)=a(x−h)²+k by completing the square, reads the vertex (h,k) and axis of symmetry x=h directly from vertex form, uses the vertex to determine the function's minimum (a>0) or maximum (a<0) value, converts back from vertex form to standard form by expanding, and recognizes vertex form as the canonical form connecting quadratic functions to transformations of f(x)=x².

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit graph of y=x² shifted and scaled; visual identification of vertex before algebraic formula; completing-the-square shown geometrically as a square area)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | VERTEX-FROM-STANDARD-WRONG | Student reads the vertex directly from standard form ax²+bx+c as (b, c), or computes vertex incorrectly as (−b/2a, c) without substituting back; does not use the full formula h=−b/(2a), k=f(h) | Type 5 — instruction-induced (the b and c coefficients appear prominently in standard form; students try to read off the vertex from these visible constants rather than deriving h and k from the full completing-the-square process) |
| MC-2 | HORIZONTAL-SHIFT-SIGN-ERROR | Student reads f(x)=a(x−h)²+k as vertex at (−h, k), applying an extra sign flip; e.g., vertex form (x−3)² → vertex at (−3, 0) instead of (3, 0) | Type 3 — language contamination ((x−h) contains a minus sign; students interpret the minus as "the x-coordinate is negative h" rather than "the shift is h to the right") |
| MC-3 | K-IS-THE-MINIMUM-VALUE-ALWAYS | Student identifies k as the minimum (not the maximum) regardless of the sign of a; does not connect k to a minimum when a>0 but a maximum when a<0 | Type 1 — overgeneralization (the most common example is a>0, which gives a minimum at k; student memorizes "vertex y-value is the minimum" without conditioning on the direction of opening) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Three forms of a quadratic and what each reveals:**

| Form | Formula | What it reveals directly | Requires work to find |
|---|---|---|---|
| Standard form | ax²+bx+c | y-intercept (c), coefficients | Vertex, axis of symmetry, zeros |
| Vertex form | a(x−h)²+k | Vertex (h,k), axis of symmetry x=h, max/min value k | y-intercept, zeros |
| Factored form | a(x−r₁)(x−r₂) | Zeros (r₁, r₂), stretch factor | Vertex, y-intercept |

**Vertex form: reading off the parameters:**
f(x)=a(x−h)²+k.
- a: vertical stretch/reflection (same as in transformations). a>0 → opens up; a<0 → opens down.
- h: horizontal shift. **Positive h → vertex at x=h to the RIGHT of origin.** (The minus sign inside x−h is part of the formula; h itself is the right-shift.)
- k: vertical shift. Vertex at y=k. k is the minimum (a>0) or maximum (a<0).
- Vertex: **(h, k)**.
- Axis of symmetry: **x=h**.

**Worked reading examples:**
- f(x)=2(x−3)²+1: a=2, h=3, k=1. Vertex=(3,1). Opens up. Minimum y=1. Axis x=3.
- g(x)=−(x+2)²+5: rewrite as −(x−(−2))²+5. a=−1, h=−2, k=5. Vertex=(−2,5). Opens down. Maximum y=5.
- h(x)=3x²−12x+13: need to convert. (Done in A02.)

**Vertex formula from standard form:** h=−b/(2a), k=f(h)=c−b²/(4a).

**P49 checkpoint:**
- CORRECT → "Vertex form a(x−h)²+k: vertex=(h,k). The sign inside the bracket is OPPOSITE to h (x−h → vertex at +h). k is min if a>0, max if a<0." → A02
- PARTIAL (reads vertex as (−h, k) when form shows (x−3)²) → "In (x−3)²: what value of x makes x−3=0? That x is the vertex's x-coordinate — which equals +3, not −3." → TB-R02 → A02
- INCORRECT → TB-R02 → A02
- NO_RESPONSE → "f(x)=(x−4)²+2. What x makes the square term equal to zero? At that x, what is f(x)? That point is the vertex." → TB-R02 → A02

### A02 — P04 PATTERN INDUCTION
**Converting standard → vertex form by completing the square:**

**Algorithm (a=1 case first):**
f(x)=x²+bx+c.
Step 1: Group x-terms: f(x)=(x²+bx)+c.
Step 2: Complete the square: add and subtract (b/2)².
f(x)=(x²+bx+(b/2)²)−(b/2)²+c.
Step 3: Factor the trinomial: f(x)=(x+b/2)²+(c−b²/4).
Vertex: h=−b/2, k=c−b²/4.

**Worked example (a=1):** f(x)=x²−6x+11.
(x²−6x) + 11 = (x²−6x+9) − 9 + 11 = (x−3)² + 2. Vertex: (3, 2). ✓
Check: f(3)=9−18+11=2. ✓

**Algorithm (a≠1 case):**
f(x)=ax²+bx+c.
Step 1: Factor a from x-terms: f(x)=a(x²+(b/a)x)+c.
Step 2: Complete the square inside the bracket.
f(x)=a(x²+(b/a)x+(b/(2a))²)−a(b/(2a))²+c.
Step 3: Factor: f(x)=a(x+b/(2a))²+(c−b²/(4a)).
Vertex: h=−b/(2a), k=c−b²/(4a).

**Worked example (a≠1):** f(x)=3x²−12x+13.
3(x²−4x)+13 = 3(x²−4x+4)−12+13 = 3(x−2)²+1. Vertex: (2, 1). ✓
Check: f(2)=12−24+13=1. ✓

**Gallery — pattern recognition:**
| Standard form | Vertex form | Vertex |
|---|---|---|
| x²+4x+7 | (x+2)²+3 | (−2, 3) |
| x²−8x+10 | (x−4)²−6 | (4, −6) |
| 2x²+8x+6 | 2(x+2)²−2 | (−2, −2) |
| −x²+6x−5 | −(x−3)²+4 | (3, 4) max |

**P49 checkpoint:**
- CORRECT → "Complete the square: group x-terms, factor a if needed, add/subtract (half-coefficient)², write as a perfect square. Vertex (h,k) read directly from a(x−h)²+k." → A03
- PARTIAL (adds (b/2)² but forgets to subtract it, getting a wrong k) → "When you add (b/2)² inside the bracket, you've added a(b/2)² to the function. You must subtract the same amount outside to keep the function equal. Always add AND subtract." → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "For f(x)=x²−4x+7: what is half of −4? Square it: (−2)²=4. Add 4 and subtract 4: x²−4x+4+7−4=(x−2)²+3." → TB-R01 → A03

### A03 — P06 CONTRAST PAIR
**Vertex form ↔ standard form; vertex vs. y-intercept; minimum vs. maximum:**

**Contrast 1 — Converting BACK (vertex → standard):**
Expand a(x−h)²+k:
f(x)=2(x−3)²+1 = 2(x²−6x+9)+1 = 2x²−12x+18+1 = 2x²−12x+19.
Standard form: 2x²−12x+19. y-intercept=19 (set x=0). ✓

**Contrast 2 — Minimum vs. maximum:**
a>0: parabola opens up. Vertex is LOWEST point. k = MINIMUM value of f.
a<0: parabola opens down. Vertex is HIGHEST point. k = MAXIMUM value of f.

Example: f(x)=−2(x−1)²+8. a=−2<0. Vertex=(1,8). Opens down. **Maximum** value is 8 (occurs at x=1).

**Contrast 3 — Vertex vs. y-intercept:**
Vertex: the turning point of the parabola. x=h, y=k. Not on y-axis unless h=0.
y-intercept: where the graph crosses the y-axis. x=0. For f(x)=a(x−h)²+k: f(0)=a(−h)²+k=ah²+k. Not the same as the vertex unless h=0.

Example: f(x)=2(x−3)²+1. Vertex=(3,1). y-intercept=f(0)=2(9)+1=19. Different. ✓

**Axis of symmetry and symmetry of zeros:** Zeros of f are symmetric about x=h. If x₁ and x₂ are zeros, then (x₁+x₂)/2=h. This means h=−b/(2a) from standard form — same formula.

**P49 checkpoint:**
- CORRECT → "Vertex form → standard: expand the square and collect. Standard → vertex: complete the square. k=min (a>0) or max (a<0). y-intercept=f(0)=ah²+k ≠ vertex unless h=0. Zeros symmetric about x=h." → Gate (P91)
- PARTIAL (correctly finds vertex but states k is always the minimum) → "Check: a=−2 in f(x)=−2(x−1)²+8. Does the parabola open up or down? If it opens DOWN, is the vertex the lowest or highest point?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For f(x)=−(x−2)²+9: substitute x=2 to find f(2). Can f(x) ever EXCEED this value? Check f(0), f(1), f(3), f(4)." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 VERTEX-FROM-STANDARD-WRONG):**
Step 1 — "The vertex cannot be read directly from ax²+bx+c. The b and c in standard form are NOT the vertex coordinates. The vertex x-coordinate is h=−b/(2a) — a formula requiring BOTH a and b — and the y-coordinate k=f(h) requires substituting h back into the function." Step 2 — f(x)=x²−6x+5. If you read vertex as (b,c)=(−6,5) — wrong. Correct: h=−(−6)/(2·1)=3; k=f(3)=9−18+5=−4. Vertex=(3,−4). The correct vertex lies below the x-axis; the incorrect (−6,5) is nowhere near the parabola. Step 3 — "The formula h=−b/(2a) is the x-coordinate of the vertex. Always compute this first, then substitute to get k=f(h). Or complete the square to get vertex form directly."

**TB-R02 (MC-2 HORIZONTAL-SHIFT-SIGN-ERROR):**
Step 1 — "In f(x)=a(x−h)²+k: the shift is h to the RIGHT. The minus sign is PART OF THE FORMULA, not a signal to negate h." Step 2 — Physical interpretation: x−h=0 when x=h. At x=h, the (x−h)² term is zero, so f(h)=a(0)+k=k. The vertex is at x=h. If the formula shows (x−3)², vertex is at x=3 (not −3). If it shows (x+2)²=(x−(−2))², vertex is at x=−2. Step 3 — "Quick check: find the x that makes the squared factor equal to zero. That x IS the vertex x-coordinate. Always solve 'what makes the bracket zero?' — never just copy the sign."

**TB-R03 (MC-3 K-IS-THE-MINIMUM-VALUE-ALWAYS):**
Step 1 — "k is the VALUE of f at the vertex. Whether this is a minimum or maximum depends on which way the parabola opens — determined by the sign of a." Step 2 — f(x)=2(x−1)²+3: a=2>0, opens UP. Vertex=(1,3) is the LOWEST point. Minimum=3. g(x)=−2(x−1)²+3: a=−2<0, opens DOWN. Vertex=(1,3) is the HIGHEST point. Maximum=3. Same vertex value k=3, but one is a min and one is a max. Step 3 — "Rule: a>0 → opens up → vertex is minimum (lowest). a<0 → opens down → vertex is maximum (highest). Check the sign of a FIRST, then interpret k."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Convert to vertex form by completing the square: (a) f(x)=x²−10x+29; (b) g(x)=2x²+8x+3; (c) h(x)=−x²+4x+1.
2. From vertex form, identify vertex, axis of symmetry, and maximum/minimum: (a) f(x)=3(x−2)²−7; (b) g(x)=−½(x+4)²+6.
3. A projectile has height h(t)=−5t²+20t+1 meters (t in seconds). Convert to vertex form. What is the maximum height, and when does it occur?
4. The vertex of a parabola is (−1, 4) and it passes through (1, 0). Find the equation in both vertex form and standard form.

**P55 — Reflect & Consolidate:** "Standard→vertex: complete the square, factor a first. Vertex→standard: expand. Vertex=(h,k): h=−b/(2a), k=f(h). Sign rule: (x−h)² → vertex at +h. k=min iff a>0; k=max iff a<0. y-intercept=ah²+k (not k)."

**P76 — Transfer Probe (Independence mode):**
The vertex form extends to conic sections. An ellipse centered at (h,k) with semi-axes a and b satisfies (x−h)²/a²+(y−k)²/b²=1. (a) Identify the center and semi-axes of (x−2)²/9+(y+1)²/4=1. (b) Show that when b=a and the equation is a circle, the vertex form of the standard circle equation (x−h)²+(y−k)²=r² reveals center (h,k) by the same sign-flip logic as the parabola's vertex. (c) For a parabola in vertex form y=a(x−h)²+k, identify h and k as the focus-shifts in the conic-section derivation.

**P55 — Reflect & Consolidate:** "The (x−h)²+(y−k)² and (x−h)²/a² patterns unify vertex/center identification across conics. The sign-flip rule (x−h → center at +h) applies universally in all shifted conics, not just parabolas. Vertex form is the entry point to the broader language of conic sections."

**P75 — Mastery Assessment:**
"f(x)=2x²−12x+13. (a) Convert to vertex form. (b) State vertex, axis of symmetry, and minimum value. (c) Find zeros using vertex form (solve 2(x−3)²+k=0 for the k you found). (d) Find the y-intercept from standard form and verify using vertex form. (e) Sketch the parabola, marking vertex, zeros, y-intercept, and axis of symmetry."

**P55 — Reflect & Consolidate:** "Vertex form is the synthesis of all parabola information: it encodes the transformation from y=x² (translation right h, up k, vertical stretch a). Every feature follows: zeros = h±√(−k/a) (when k/a<0), y-intercept = ah²+k, axis x=h, max/min = k with direction from a."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.vertex-form complete
- Score 3/5 → REVIEW sign convention for h and completing-the-square algorithm; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.quadratic-function or math.alg.completing-the-square; reassign

**P78 — Completion:** Vertex form certified. Student converts between standard and vertex forms by completing the square, reads vertex, axis, and extremum directly from vertex form, correctly interprets the sign of h, identifies minimum vs. maximum from the sign of a, and connects vertex form to the transformation language of function transformations.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Vertex/center-identification pattern across conic sections; unifying sign-flip rule for (x−h)² in circles and ellipses; parabola as a conic section
Skill tested: Apply the (x−h)² → center at +h rule to circle and ellipse equations; connect vertex form to the broader conic section framework

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
