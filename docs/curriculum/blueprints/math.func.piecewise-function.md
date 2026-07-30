# Blueprint: math.func.piecewise-function

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.piecewise-function |
| Title | Piecewise Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.function-concept |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a piecewise-defined function, the student evaluates it at a specified input by selecting the correct piece (including boundary cases), graphs it by drawing each piece on its restricted domain with correct open/closed endpoints, determines whether the function is continuous at each boundary by checking one-sided limit equality and function value, writes a piecewise formula from a graph, and recognises that the absolute value function is a canonical piecewise function.

## Component 2 — CPA Entry Stage
**C — Concrete** (postal rate tables, taxi fare schedules, income tax brackets — each a real piecewise rule before symbolic notation is introduced)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | OPEN-ENDPOINT-IGNORED | Student evaluates the function at a boundary using only one piece without checking which endpoint is included (open vs. closed); assigns a value at a point where the function is undefined or uses the wrong branch | Type 5 — instruction-induced (early examples use strict inequalities only; open-circle notation is introduced late and its role at boundaries isn't emphasized) |
| MC-2 | PIECEWISE-MUST-BE-DISCONTINUOUS | Student assumes all piecewise functions have jumps; does not recognize that pieces can meet continuously, as in the absolute value function | Type 1 — overgeneralization (the most memorable piecewise examples are those with jumps; continuous piecewise functions are perceived as "not really piecewise") |
| MC-3 | DOMAIN-PIECES-OVERLAP | Student writes a piecewise formula where two pieces share a boundary point (e.g., both f(x)=2x for x<3 AND f(x)=x+3 for x≥3 overlap at x=3 is fine, but student writes x≤3 and x≥3), making the boundary ambiguous | Type 1 — overgeneralization (students see that "union of pieces covers everything" but don't apply the mutual-exclusion requirement carefully at boundary points — the overlap is by exactly one point and the value must be assigned unambiguously) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a piecewise function:**

| Representation | Example: f(x) = ⎧ 2x if x < 0 ⎨ 1 if x = 0 ⎩ x² if x > 0 |
|---|---|
| Algebraic formula | Brace notation with piece–domain pairs; cover entire domain with no ambiguity |
| Graph | Each piece drawn only on its restricted domain; filled dot = included, open dot = excluded |
| Verbal rule | "Use 2x for negative inputs, output 1 for input zero, use x² for positive inputs" |
| Table | Organized by which piece applies: x=−2→−4, x=0→1, x=3→9 |

**Evaluation procedure:**
Step 1: Identify the input value x.
Step 2: Determine which piece's domain condition x satisfies.
Step 3: Substitute into ONLY that piece's formula.
Step 4: At boundary points, check which side uses ≤ or = (closed) vs. < or > (open).

**Worked example:** f(x) = ⎧ 3x+1 if x ≤ 2 ⎨ x²−1 if x > 2

- f(−1): x=−1 satisfies x≤2 → f(−1)=3(−1)+1=−2.
- f(2): x=2 satisfies x≤2 (closed) → f(2)=3(2)+1=7.
- f(3): x=3 satisfies x>2 → f(3)=9−1=8.
- f(2) from the other side (limit): lim x→2⁺ (x²−1)=3 ≠ 7. Discontinuity at x=2.

**Absolute value as a piecewise function:**
|x| = ⎧ x if x ≥ 0 ⎨ −x if x < 0.
Graph: two half-lines meeting at (0,0). Continuous. This is the canonical piecewise function.

**P49 checkpoint:**
- CORRECT → "Select the piece whose domain contains the input. At boundaries, the closed-endpoint piece wins. Open dot = excluded, closed dot = included." → A02
- PARTIAL (evaluates interior points correctly, fails at boundary x=2) → "At x=2, which inequality is satisfied: x≤2 or x>2? The ≤ includes the boundary; the > does not." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "The function charges $5 for trips under 3 km and $10 for 3 km or more. What is the charge for exactly 3 km? Which rule applies?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Continuity at boundaries — gate:**

**Gate question (MC-2):** "Is a piecewise function always discontinuous at its boundary points?"

No. A piecewise function is continuous at x=a if:
1. Both one-sided limits exist and are equal: lim x→a⁻ f(x) = lim x→a⁺ f(x).
2. The function value equals that limit: f(a) equals the common limit.

**Test on f(x) = ⎧ 2x if x ≤ 1 ⎨ x+1 if x > 1:**
- lim x→1⁻ f(x) = 2(1) = 2.
- lim x→1⁺ f(x) = 1+1 = 2.
- f(1) = 2(1) = 2 (left piece, closed at x=1).
- All three equal 2. **Continuous at x=1.** ✓

**Test on f(x) = ⎧ 3x+1 if x ≤ 2 ⎨ x²−1 if x > 2:**
- lim x→2⁻ f(x) = 7. lim x→2⁺ f(x) = 3. 7 ≠ 3. **Discontinuous (jump).** ✗

**Graphing procedure:**
1. Graph each piece on its restricted domain only.
2. At each boundary: compute the value from the piece that OWNS the boundary (closed endpoint). Draw a filled circle there.
3. On the other side: compute the limit. Draw an open circle to show that value is not achieved.

**P49 checkpoint:**
- CORRECT → "Piecewise functions CAN be continuous. Check: left limit = right limit = f(a). Both open/closed endpoints must be consistent: exactly one piece owns each boundary point." → A03
- PARTIAL (draws graph but places open/closed dots on wrong side) → "Which piece has x≤2? That piece owns x=2 — put the closed dot on its endpoint value. The other piece approaches with an open dot." → TB-R01 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Draw y=x for x≤1 and y=2−x for x>1. At x=1, what does the first piece give? What does the second piece approach? Are they equal?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Writing piecewise formulas; connected vs. disconnected:**

**Contrast 1 — Reading a piecewise formula from a graph:**

From graph: line through (0,−2) with slope 2 for x<1 (open circle at (1,0)); horizontal line y=3 for x≥1 (filled circle at (1,3)).

f(x) = ⎧ 2x−2 if x < 1 ⎨ 3 if x ≥ 1.

Check boundary: left limit as x→1⁻ is 2(1)−2=0. f(1)=3. 0≠3 — jump discontinuity at x=1.

**Contrast 2 — Constructing a continuous piecewise function:**

Want a function that is linear on [0,2] and quadratic on [2,5], and continuous at x=2.
Say f(x)=ax+b for x≤2 and f(x)=c(x−2)²+d for x>2.
Continuity: 2a+b = d (values match); a = 0 (slopes match requires first derivative continuity if desired, but value-only continuity just needs the value match).
Example: f(x)=x for x≤2 and f(x)=(x−2)²+2 for x>2. At x=2: left=2, right=0+2=2. ✓ Continuous.

**Domain partition requirement:**
Every x in the domain must belong to exactly one piece. The standard approach: use strict inequality (<) for all but one boundary point, which gets ≤ (or =). Never use ≤ on both neighboring pieces at a shared boundary — that creates ambiguity, not a function.

**P49 checkpoint:**
- CORRECT → "Read piecewise formula from graph by writing each piece's formula and its domain. At each boundary, assign ≤ (or =) to exactly one piece. Continuous iff left limit = right limit = function value at boundary." → Gate (P91)
- PARTIAL (writes formula correctly but assigns ≤ to both pieces at a shared boundary) → "At x=2, you wrote x≤2 for piece 1 and x≥2 for piece 2. Both claim x=2. A function can only have ONE value at x=2 — which piece owns that point?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "From the graph: on (−∞,0] it's a flat line at y=1. On (0,∞) it's y=x. Write the piecewise formula." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 OPEN-ENDPOINT-IGNORED):**
Step 1 — "At each boundary point, exactly ONE piece owns it (through a ≤ or = condition). The other piece only APPROACHES that point — it does not include it. An open circle on a graph means 'the function does NOT equal this value here.'" Step 2 — f(x)=⎧2x+1 if x<3 ⎨x² if x≥3. At x=3: which condition contains x=3? x≥3 does (closed). So f(3)=9 from the second piece, NOT f(3)=7 from the first. Step 3 — "Check the inequality symbol, not just the formula. < and > = open (excluded); ≤, ≥, = = closed (included). The ownership determines which formula to use at the exact boundary."

**TB-R02 (MC-2 PIECEWISE-MUST-BE-DISCONTINUOUS):**
Step 1 — "Piecewise notation is just a tool for organizing different formulas on different domains. Nothing in the definition forces the pieces to disconnect at the boundaries. Continuity depends on whether the pieces' VALUES AGREE at boundaries, not on whether you used brace notation." Step 2 — |x|=⎧x if x≥0 ⎨−x if x<0. Two pieces. At x=0: left limit = −(0)=0; right limit = 0; f(0)=0. All three equal — perfectly continuous. Step 3 — "Always test continuity explicitly at each boundary. 'Piecewise' describes the form, not the behavior."

**TB-R03 (MC-3 DOMAIN-PIECES-OVERLAP):**
Step 1 — "A function must assign EXACTLY ONE output to each input. If two pieces both claim x=3 (e.g., x≤3 and x≥3), then x=3 has two pieces and potentially two values — that breaks the function rule." Step 2 — Fix by making all boundary ownership unambiguous: use x<3 for the first piece and x≥3 for the second. Now x=3 belongs only to the second. OR: x≤3 for the first and x>3 for the second. Either is fine; never both ≤ and ≥. Step 3 — "Exactly one inequality per boundary point should be 'closed' (≤ or ≥). The other must be strict (< or >). This guarantees mutual exclusion."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. For f(x) = ⎧ x²+1 if x<−1 ⎨ 3 if x=−1 ⎩ 2x−1 if x>−1: evaluate f(−3), f(−1), f(0), f(2). Is f continuous at x=−1?
2. Graph: f(x) = ⎧ −x+2 if x≤0 ⎨ x² if 0<x≤2 ⎩ 4 if x>2. Mark all open/closed endpoints. State where f is continuous and where it has jump discontinuities.
3. Write a piecewise formula for f such that: f is linear on (−∞,1] with f(0)=3 and f(1)=1, and f is constant at 1 on (1,∞). Is f continuous at x=1?
4. Express f(x)=|2x−4|+3 as a piecewise function (no absolute value symbols). Evaluate f(2) and identify the vertex.

**P55 — Reflect & Consolidate:** "Piecewise: one formula per subdomain, covering every input exactly once. Evaluate by selecting the active piece. At boundaries: the closed-endpoint piece owns the value. Continuous at a iff left limit = right limit = f(a). Absolute value is the canonical piecewise function."

**P76 — Transfer Probe (Independence mode):**
A spline is a piecewise-polynomial function designed to be smooth (continuous AND with matching derivatives) at its breakpoints. For f(x) = ⎧ ax+b if x ≤ 1 ⎨ cx²+d if x > 1, find conditions on a, b, c, d that make f: (a) continuous at x=1 (one equation); (b) differentiable at x=1 — the derivatives of both pieces must agree there (second equation); (c) with f(0)=2 and f(2)=5. Solve for a, b, c, d. Sketch the result.

**P55 — Reflect & Consolidate:** "Splines require both value-continuity (C⁰) and derivative-continuity (C¹) at breakpoints. Enforcing both generates equations that constrain the coefficients. This is how smooth curves are fitted to data in animation, engineering, and numerical analysis."

**P75 — Mastery Assessment:**
"f(x) = ⎧ k(x+2) if x < 1 ⎨ x²+1 if x ≥ 1. (a) Find the value of k that makes f continuous at x=1. (b) With that k: compute f(−2), f(0), f(1), f(3). (c) Sketch f. (d) Is f differentiable at x=1? (Check if the derivative of each piece agrees at x=1 for the k you found.)"

**P55 — Reflect & Consolidate:** "Determining constants for continuity: set lim x→a⁻ f(x) = lim x→a⁺ f(x) = f(a) and solve for the unknown. Differentiability is a stronger condition: derivatives must also match. Checking both is the standard approach for constructing smooth piecewise models."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.piecewise-function complete
- Score 3/5 → REVIEW open/closed endpoint selection and continuity test at boundaries; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.function-concept; reassign

**P78 — Completion:** Piecewise functions certified. Student evaluates piecewise functions at any input including boundaries, graphs with correct open/closed endpoints, tests continuity at boundary points, writes piecewise formulas from graphs, and identifies absolute value as a canonical piecewise function.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Cubic spline conditions (C⁰ + C¹ continuity) as a system of linear equations; connecting piecewise-function algebra to smooth curve fitting
Skill tested: Set up and solve the two-condition (value + derivative match) system; verify solution; sketch the resulting smooth spline

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
