# Blueprint: math.de.linear-first-order

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.linear-first-order |
| name | Linear First-Order ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.de.first-order-ode, math.de.ode-linearity, math.calc.u-substitution |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student identifies a first-order linear ODE of the form dy/dx + P(x)y = Q(x); computes the integrating factor μ(x) = exp(∫P(x)dx); multiplies both sides by μ to obtain (μy)' = μQ(x); integrates both sides to obtain the general solution y = (1/μ)∫μQ dx + C/μ; applies initial conditions to determine the particular solution; and identifies when the homogeneous equation (Q=0) has a simpler exponential solution.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the standard form dy/dx + P(x)y = Q(x) on one side; show the integrating factor μ=e^{∫P dx} appearing as a "multiplying key" on the left arrow; then show (μy)'=μQ after multiplication; annotate: "The trick: μ is chosen so the left side becomes a perfect derivative of μy — then integration is straightforward")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | INTEGRATING-FACTOR-MUST-INCLUDE-CONSTANT | Student writes μ(x) = Ce^{∫P dx} and carries C throughout, creating confusion about which C is from the integrating factor and which is from the integration of both sides | Type 5 — instruction-induced (students know indefinite integrals include a +C; they don't realize that for the integrating factor, any valid antiderivative works — the constant of integration in μ is absorbed into the final arbitrary constant C, so the simplest choice is to set it to zero) |
| MC-2 | FORGETTING-TO-DIVIDE-BY-MU-AT-THE-END | Student correctly computes ∫μQ dx but writes y = ∫μQ dx + C instead of y = (1/μ)(∫μQ dx + C), forgetting to divide by μ when isolating y | Type 3 — language contamination (the step (μy)' = μQ is visually presented as a multiplication, not a composition; students solve for μy correctly but then forget the y= μy/μ step, seeing it as "already solved") |
| MC-3 | MISIDENTIFYING-THE-STANDARD-FORM | Student tries to apply the integrating factor method to dy/dx = P(x)y + Q(x) (wrong sign convention) or to a Bernoulli equation, getting the wrong μ | Type 1 — overgeneralisation (the integrating factor method is learned in one form; students apply it to any equation with a y-term on the right, not checking whether the equation is actually in dy/dx + P(x)y = Q(x) form with P, Q functions of x only) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The integrating factor method:**

**Standard form:** dy/dx + P(x)y = Q(x) — where P and Q are functions of x only.

**Key idea:** Find a function μ(x) such that d/dx[μy] = μ(dy/dx) + μP(x)y = μ(dy/dx + P(x)y) = μQ(x).

**This requires:** μ'y = μP(x)y → μ'/μ = P(x) → μ = e^{∫P(x)dx}.

**Method:**
1. Write in standard form: dy/dx + P(x)y = Q(x)
2. Compute μ(x) = e^{∫P(x)dx} (choose the simplest antiderivative: set constant = 0)
3. Multiply: (μy)' = μQ(x)
4. Integrate: μy = ∫μQ(x)dx + C
5. Solve: y = (1/μ)[∫μQ(x)dx + C]

**Worked example 1 — simple:**
dy/dx − 2y = eˣ. Standard form: dy/dx + (−2)y = eˣ. So P = −2, Q = eˣ.
μ = e^{∫−2 dx} = e^{−2x}.
Multiply: (e^{−2x}y)' = e^{−2x}·eˣ = e^{−x}.
Integrate: e^{−2x}y = −e^{−x} + C.
Solve: y = e^{2x}(−e^{−x} + C) = −eˣ + Ce^{2x}.

**Worked example 2 — with initial condition:**
dy/dx + y/x = x, y(1) = 2. P = 1/x, Q = x.
μ = e^{∫(1/x)dx} = e^{ln|x|} = x (take x>0).
(xy)' = x·x = x².
xy = x³/3 + C.
y = x²/3 + C/x.
Apply y(1)=2: 2 = 1/3 + C → C = 5/3.
Particular solution: y = x²/3 + 5/(3x).

**P49 checkpoint:**
- CORRECT → "Standard form: dy/dx + P(x)y = Q(x). Integrating factor: μ=e^{∫P dx}. Multiply, integrate: μy=∫μQ dx+C. Divide by μ." → A02
- PARTIAL (MC-1: constant in μ) → "For the integrating factor, ANY antiderivative of P works. If you write μ=Ce^{∫P dx}, then dividing by μ gives y=(C₁e^{∫P dx})⁻¹(∫μQ dx+C₂)/C — two constants multiply and combine into one. The convention is: set the constant in ∫P dx to zero, giving the simplest μ=e^{∫P dx}. The final arbitrary constant comes from integrating μQ." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "dy/dx − 3y = 6. Standard form: dy/dx + (−3)y = 6. P=−3, Q=6. μ=e^{−3x}. (e^{−3x}y)'=6e^{−3x}. Integrate: e^{−3x}y=−2e^{−3x}+C. Divide: y=−2+Ce^{3x}. Check: y'=3Ce^{3x}; y'−3y=3Ce^{3x}−3(−2+Ce^{3x})=6. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**When and how the method extends:**

**Homogeneous case (Q=0):** dy/dx + P(x)y = 0. Separable! dy/y = −P(x)dx. General solution: y = Ce^{−∫P dx} = C/μ. The integrating factor approach confirms this.

**Variable-coefficient oscillator:** dy/dx + (sin x)y = sin x. P=sin x, Q=sin x. μ=e^{−cos x}. (e^{−cos x}y)'=sin x·e^{−cos x}. Integrate: e^{−cos x}y=e^{−cos x}+C. Solve: y=1+Ce^{cos x}. (Particular solution y=1; general solution y=1+Ce^{cos x}.)

**Bernoulli note:** dy/dx + P(x)y = Q(x)yⁿ (n≠0,1) — substitution v=y^{1−n} converts to a linear equation solvable by the integrating factor method. This is covered in Bernoulli ODEs.

**P49 checkpoint:**
- CORRECT → "Homogeneous: y=C/μ=Ce^{−∫P dx}. Integrating factor works for all Q (including Q=0). Bernoulli converts to linear." → Gate (P91)
- PARTIAL (MC-2: forgot to divide by μ) → "After integrating: μy=∫μQ dx+C. That's μy, not y. Divide both sides by μ(x) to get y=(1/μ(x))∫μQ dx+C/μ(x). The C/μ(x) term gives the homogeneous solution; the integral gives the particular solution." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "t dy/dt + 2y = t², y(1)=0. Divide by t: dy/dt + (2/t)y = t. P=2/t, Q=t. μ=e^{2ln t}=t². (t²y)'=t²·t=t³. Integrate: t²y=t⁴/4+C. Divide: y=t²/4+C/t². Apply y(1)=0: 0=1/4+C → C=−1/4. Solution: y=t²/4−1/(4t²)." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 INTEGRATING-FACTOR-MUST-INCLUDE-CONSTANT):**
Step 1 — "μ(x)=e^{∫P dx} where ∫P dx means ANY antiderivative of P. If ∫P dx = F(x)+C₁, then μ=e^{F(x)+C₁}=e^{C₁}·e^{F(x)}. Multiplying both sides of the ODE by this μ gives e^{C₁}·e^{F(x)}·y on the left. When you integrate the right and get C₂, solving gives y=e^{−F(x)}(e^{−C₁}C₂+···). The e^{−C₁} just rescales the arbitrary constant — so set C₁=0 from the start."
Step 2 — "Convention: ALWAYS use the simplest antiderivative (no constant) for ∫P dx inside the exponent of μ. The one arbitrary constant in the solution comes from integrating μQ, not from μ itself."
Step 3 — "Verify: if your final answer has two free constants but the ODE is first-order, you've made this error. Combine them into one."

**TB-R02 (MC-2 + MC-3 combined):**
Step 1 — "After integrating: write μ(x)·y = ∫μQ dx + C clearly on the page. Then divide every term on both sides by μ(x). Only then write y = ···."
Step 2 — "Standard form check: is the ODE dy/dx + P(x)y = Q(x) with P and Q depending ONLY on x? If y appears nonlinearly (e.g., y², sin y), or if P also depends on y, the integrating factor method does not apply directly."
Step 3 — "Bernoulli test: if the right side is Q(x)yⁿ (n≠0,1), use the Bernoulli substitution v=y^{1−n} to convert to linear form first."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: dy/dx + (1/x)y = x², x>0. Find the general solution and the particular solution with y(1) = 1.
2. Solve: dy/dx − y tan x = sec x. (Use μ = e^{−∫tan x dx} = cos x.)
3. Solve: dy/dx + 2xy = 2x. (Hint: Q=2x=P·x/x·x — but use the integrating factor method systematically, not guessing.)
4. Convert the Bernoulli equation dy/dx − y = y³ to a linear ODE via v = y^{−2}; then solve using the integrating factor method.
5. A mixing tank initially contains 100 L of pure water. Brine with 0.5 kg/L flows in at 2 L/min; the well-mixed solution drains at 2 L/min. The salt amount y(t) satisfies dy/dt + (2/100)y = 0.5·2. Solve the IVP with y(0) = 0 and find the long-run salt concentration.

**P55 — Reflect & Consolidate:** "Standard form: dy/dx + P(x)y = Q(x). Integrating factor: μ=e^{∫P dx} (no constant in exponent). Multiply: (μy)'=μQ. Integrate: μy=∫μQ dx+C. Divide: y=(1/μ)(∫μQ dx+C). One constant C. Bernoulli converts to linear."

**P76 — Transfer Probe (Independence mode):**
(a) The integrating factor approach generalises to linear systems: d**x**/dt = A(t)**x** + **b**(t). For a 1D system this is exactly the scalar linear ODE. For 2D, the matrix exponential e^{∫A dt} plays the role of μ. What must A(t) satisfy for e^{∫A dt} to be a valid integrating factor matrix? (b) Sturm-Liouville theory: the self-adjoint form is d/dx[p(x)y'] + q(x)y = λw(x)y. The weight function w(x) plays a role analogous to the integrating factor for converting the equation to self-adjoint form. What property does the eigensolution set have that makes it useful for expanding arbitrary functions? (c) The method of integrating factors in thermodynamics: an inexact differential δQ is converted to an exact differential dS = δQ/T (entropy) via the integrating factor 1/T (temperature). What is the mathematical condition for an inexact differential form P dx + Q dy to admit an integrating factor μ(x,y)?

**P75 — Mastery Assessment:**
"(a) Solve dy/dx + (2/x)y = eˣ/x² for x>0 with y(1) = 0. (b) A particle moves with velocity v(t) satisfying dv/dt + (b/m)v = g where b>0 (drag coefficient), m (mass), g (gravity). This is a linear first-order ODE for v. Solve it with v(0)=0 (starts from rest). What is the terminal velocity as t→∞? (c) For the equation xdy/dx = y + x (rewrite in standard form first), find the general solution and the envelope of the family of particular solutions. (d) The equation dy/dx + P(x)y = Q(x) has two particular solutions y₁(x) and y₂(x). Show that y₁ − y₂ is a solution of the homogeneous equation dy/dx + P(x)y = 0. Why is this?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW integrating factor construction and the divide-by-μ step
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.first-order-ode or math.calc.u-substitution; reassign

**P78 — Completion:** Linear First-Order ODE certified. Student identifies standard form; computes integrating factor correctly; multiplies, integrates, and divides by μ; applies initial conditions; handles variable-coefficient cases.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Matrix exponential integrating factor; Sturm-Liouville weight functions; thermodynamic integrating factor
Skill tested: Abstract the integrating factor idea beyond scalar ODEs to matrix systems and differential forms

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
