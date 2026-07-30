# Blueprint: math.func.zero-of-function

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.zero-of-function |
| Title | Zeros of a Function |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.func.graph-of-function |
| Cross-links | math.num.root-finding |
| Unlocks | math.num.root-finding |

## Component 1 — Learning Objective
Given a function f, the student defines a zero as a value x* where f(x*)=0 (equivalently, an x-intercept of the graph), finds zeros algebraically by solving f(x)=0, counts zeros using graphical analysis, distinguishes zeros (x-values) from y-intercepts (the single y-value when x=0), and connects to math.num.root-finding methods for functions that cannot be solved in closed form.

## Component 2 — CPA Entry Stage
**C — Concrete** (graph overlaid with x-axis; colored dots at x-intercepts; explicit solving of f(x)=0)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ZEROS-ARE-Y-VALUES | Student confuses zeros of f with the y-intercept; says "the zero is 5" when the y-intercept f(0)=5 is meant; does not distinguish x-intercepts (zeros) from y-intercept (value at x=0) | Type 3 — language contamination ("zero" sounds like "the value zero" which is a y-value; the distinction between x-coordinate and y-coordinate is lost) |
| MC-2 | EVERY-FUNCTION-HAS-A-ZERO | Student assumes every function crosses the x-axis; does not consider functions with no real zeros (e.g., f(x)=x²+1, f(x)=eˣ) | Type 5 — instruction-induced (early examples always have integer zeros; no-zero cases are introduced later) |
| MC-3 | HOLE-VS-ZERO | Student treats a removable discontinuity (hole in a rational function) as a zero; does not check that the function must evaluate to zero (not be undefined) at a zero | Type 5 — instruction-induced (both holes and zeros involve x-values where the numerator may vanish; the denominator condition is missed) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of zeros:**

| Representation | Description | Example: f(x)=x²−4 |
|---|---|---|
| Algebraic | f(x*)=0; solve f(x)=0 | x²−4=0 → x=±2 |
| Graphical | x-intercept (where graph crosses/touches x-axis) | Graph touches x-axis at (−2,0) and (2,0) |
| Factored form | Zeros are negatives of factors: f(x)=a(x−r₁)(x−r₂)… | x²−4=(x−2)(x+2): zeros at x=2 and x=−2 |
| Set notation | Zero set Z(f)={x: f(x)=0} | Z(f)={−2,2} |

**Y-intercept vs. zeros:**
| | Definition | How to find |
|---|---|---|
| Y-intercept | The single point (0, f(0)) where graph crosses y-axis | Evaluate f(0) |
| Zeros | All values x* where f(x*)=0; x-intercepts | Solve f(x)=0 |

For f(x)=x²−4: y-intercept = f(0)=−4, so (0,−4). Zeros: x=±2, so (−2,0) and (2,0).

**Counting zeros by type:**
- f(x)=x²−1: two real zeros (±1)
- f(x)=x²: one repeated zero (0); graph touches but does not cross x-axis
- f(x)=x²+1: no real zeros (discriminant < 0)
- f(x)=x³: one zero (0); crosses x-axis

**P49 checkpoint:**
- CORRECT → "Zero: x* where f(x*)=0. Found by solving f(x)=0. Geometrically: x-intercepts. Distinct from y-intercept f(0). Not every function has zeros." → A02
- PARTIAL (solves correctly but confuses zero with y-intercept) → "For f(x)=x²−4: what is f(0)? That's the y-intercept. What are the solutions to x²−4=0? Those are the zeros." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Where does the graph of f(x)=x²−4 cross the x-axis? Set y=0 in y=x²−4 and solve." → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Functions with no zeros, one zero, many zeros — gate:**

| Function | Zeros? | How many | Why |
|---|---|---|---|
| f(x)=x²+1 | None | 0 | x²+1≥1>0 always; discriminant 0−4=−4<0 |
| f(x)=eˣ | None | 0 | eˣ>0 always |
| f(x)=ln(x) | One: x=1 | 1 | ln(1)=0; only one solution |
| f(x)=x³−x | Three: −1,0,1 | 3 | Factors as x(x−1)(x+1) |
| f(x)=(x²−1)/(x−1) | One: x=−1 | 1 | x=1 is a hole (undefined), not a zero |

**Gate question (MC-3):** "f(x)=(x²−1)/(x−1). Setting numerator=0: x²−1=0→x=±1. Is x=1 a zero of f?"

No. f(1) is undefined (denominator=0). A zero requires f(x*)=0 (the function evaluates to zero, not becomes undefined). At x=1 there is a removable discontinuity (hole). At x=−1: f(−1)=(1−1)/(−1−1)=0/(−2)=0. x=−1 IS a zero.

**P49 checkpoint:**
- CORRECT → "Zeros: where f(x*)=0 (not undefined). No zero iff graph never crosses x-axis. Holes in rational functions are not zeros." → A03
- PARTIAL (applies rational root theorem blindly, doesn't check for holes) → "Before declaring x=1 a zero, check: is f(1) actually equal to 0, or is it undefined?" → TB-R03 → A03
- INCORRECT → TB-R03 → A03
- NO_RESPONSE → "For f(x)=(x²−1)/(x−1), what happens when you substitute x=1? Is f(1)=0 or is f(1) undefined?" → TB-R03 → A03

### A03 — P06 CONTRAST PAIR
**Algebraic vs. numerical methods; connection to math.num.root-finding:**

| Approach | When applicable | Method | Example |
|---|---|---|---|
| Factoring | Polynomials with rational roots | Factor → set each factor to 0 | x²−5x+6=(x−2)(x−3)=0→x=2,3 |
| Quadratic formula | Degree-2 polynomials | x=(−b±√(b²−4ac))/(2a) | x²+x−1=0→x=(−1±√5)/2 |
| Rational root theorem | Polynomials with integer coefficients | Test ±(divisors of a₀)/(divisors of aₙ) | See math.func.rational-root |
| Numerical (math.num.root-finding) | Transcendental functions, no closed form | Bisection, Newton's method | cos(x)=x; ln(x)=2−x |

**When closed-form solutions don't exist:** f(x)=x−cos(x) has one zero near x≈0.739, but it cannot be expressed in terms of standard functions. This is where numerical root-finding (bisection, Newton's method, secant method) takes over — connecting to math.num.root-finding.

**P49 checkpoint:**
- CORRECT → "Zeros of algebraic functions: factor, use quadratic formula, or rational root theorem. For transcendental equations: numerical methods (math.num.root-finding). Always verify that f(x*)=0 not undefined." → Gate (P91)
- PARTIAL (knows factoring, unaware of numerical methods) → "Can you solve cos(x)=x algebraically? What would you do instead?" → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "For f(x)=x³−2x+1, list the possible rational zeros using ±factors of 1 / ±factors of 1." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 ZEROS-ARE-Y-VALUES):**
Step 1 — "Two different intercepts: Y-intercept = (0, f(0)) — set x=0, find y. X-intercepts (zeros) = (x*, 0) — set y=0 (i.e., f(x)=0), find x." Step 2 — Draw the coordinate axes. Mark (0, f(0)) on the y-axis: that's ONE point. Mark the zeros on the x-axis: those are the x-intercepts. Distinct axes, distinct meaning. Step 3 — "A zero is always an x-value, not a y-value. When asked for a zero, you give an x-coordinate. When asked for the y-intercept, you give a y-coordinate."

**TB-R02 (MC-2 EVERY-FUNCTION-HAS-A-ZERO):**
Step 1 — "Graph f(x)=x²+1: parabola with vertex at (0,1). Never touches the x-axis. x²+1≥1>0 for all real x. There are no real zeros — the solutions x²=−1 are complex." Step 2 — f(x)=eˣ: always positive (eˣ>0). Range=(0,∞). The graph never crosses the x-axis. No zeros. Step 3 — "Check: (1) does the function have a minimum/maximum? If the minimum is >0, no zeros. (2) By the intermediate value theorem, zeros exist only if the function changes sign."

**TB-R03 (MC-3 HOLE-VS-ZERO):**
Step 1 — "A zero of f requires TWO things: (1) x* is in the domain of f, AND (2) f(x*)=0. If the denominator is 0 at x*, then x* is NOT in the domain — it is a hole or vertical asymptote, not a zero." Step 2 — (x²−1)/(x−1)=(x+1)(x−1)/(x−1)=x+1 for x≠1. At x=1: hole (the function is undefined). At x=−1: f(−1)=0/(−2)=0. Zero at x=−1. Step 3 — "Factor numerator and denominator separately. Zeros of numerator NOT also zeros of denominator = zeros of the function. Zeros of both numerator and denominator = holes."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Find all zeros of: (a) f(x)=x²−7x+12; (b) g(x)=x³−x; (c) h(x)=(x²−9)/(x+3). State whether each is a true zero or a hole.
2. Determine how many real zeros each function has without finding them: (a) f(x)=x⁴+2x²+1; (b) g(x)=x⁵−3; (c) h(x)=eˣ−1.
3. The function f(x)=x³−2 has one real zero. Find it exactly. Then explain why x=cos(x) cannot be solved exactly and describe how you would locate its zero numerically.
4. A student says: "f(x)=x²−4 has zeros at x=±2 and y-intercept −4. The zero at x=2 is 2 units above the y-intercept." Identify and correct the conceptual error.

**P55 — Reflect & Consolidate:** "Zero = x-value where f(x*)=0 = x-intercept. Distinct from y-intercept f(0). Holes are not zeros. Some functions have no real zeros. For non-algebraic equations: numerical root-finding (math.num.root-finding)."

**P76 — Transfer Probe (Cross-link mode: math.num.root-finding):**
The bisection method locates a zero of a continuous function f on [a,b] when f(a) and f(b) have opposite signs. (a) Apply bisection to f(x)=x³−2 on [1,2] for 3 iterations, halving the interval each time. (b) Show that after n iterations, the error in the zero estimate is at most (b−a)/2ⁿ. (c) How many iterations are needed to estimate √[3]{2} to within 0.01? (d) Explain why bisection is guaranteed to work (use the Intermediate Value Theorem).

**P55 — Reflect & Consolidate:** "Bisection exploits sign-changes (IVT guarantees a zero between sign-change endpoints). Error halves each iteration: n iterations gives error ≤(b−a)/2ⁿ. This is a guaranteed but slow convergence. Newton's method converges faster but requires f'(x)."

**P75 — Mastery Assessment:**
"f(x)=(x³−8)/(x²−4). (a) Find all zeros of f (where f is defined AND equals zero). (b) Find all holes in the graph. (c) Find the y-intercept. (d) How many times does the graph cross the x-axis? Sketch the approximate shape near the zeros and holes."

**P55 — Reflect & Consolidate:** "For rational functions: factor fully. Zeros = x where numerator=0 and denominator≠0. Holes = x where both numerator=0 and denominator=0 (cancel the common factor). Y-intercept = f(0) if 0 is in the domain."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.zero-of-function complete
- Score 3/5 → REVIEW holes vs. zeros in rational functions; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.graph-of-function; reassign

**P78 — Completion:** Zeros of functions certified. Student defines zeros as x-intercepts, finds them algebraically, distinguishes them from y-intercepts and holes, and knows when numerical methods (math.num.root-finding) are required.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = ['math.num.root-finding'])
Target: Bisection method as a systematic zero-finding algorithm; IVT as the guarantee; error analysis
Skill tested: Apply bisection step-by-step; derive error bound; situate zeros in the broader context of numerical methods

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
