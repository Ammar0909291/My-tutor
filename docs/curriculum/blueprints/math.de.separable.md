# Blueprint: math.de.separable

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.separable |
| name | Separable ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.de.first-order-ode, math.calc.definite-integral |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student identifies a separable ODE of the form dy/dx = g(x)h(y); rewrites it as (1/h(y))dy = g(x)dx; integrates both sides to obtain the implicit general solution; solves for y explicitly when possible; applies initial conditions to determine the particular solution; identifies where the solution may fail to be valid (h(y)=0 → constant solutions; domain of integration); and handles the constant of integration correctly throughout.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the "separation" as a physical splitting motion: on the left side of dy/dx = g(x)h(y), draw y-terms moving to the left side and x-terms to the right; show ∫(1/h(y))dy = ∫g(x)dx; then show the implicit solution H(y)=G(x)+C; annotate: "One integration constant C for a first-order ODE — determined by the initial condition")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | TWO-CONSTANTS-FROM-TWO-INTEGRALS | Student writes ∫(1/h(y))dy+C₁=∫g(x)dx+C₂ and carries two constants throughout; doesn't know C₁ and C₂ can be combined into a single constant C=C₂−C₁ | Type 5 — instruction-induced (students learn "every indefinite integral gets a +C"; seeing two integrals, they add two constants; the teacher often doesn't emphasise that the difference of two arbitrary constants is one arbitrary constant) |
| MC-2 | FORGETTING-CONSTANT-SOLUTIONS | Student divides by h(y) without checking whether h(y)=0 gives a valid (constant) solution; misses the equilibrium solution y=y₀ where h(y₀)=0 | Type 5 — instruction-induced (the division step feels routine; students focus on the "main" integration and don't return to check y=y₀ as a separate case) |
| MC-3 | SEPARABLE-MEANS-ALWAYS-EXPLICITLY-SOLVABLE | Student assumes the implicit solution H(y)=G(x)+C can always be solved explicitly for y; doesn't know many separable ODEs yield implicit solutions that cannot be further simplified | Type 1 — overgeneralisation (simple examples (y'=xy, y'=y/x, y'=y²) all have explicit solutions; students assume "solve" means "find y=...") |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The separation of variables technique:**

**Form:** dy/dx = g(x)·h(y)

**Method:**
1. Separate: (1/h(y))dy = g(x)dx
2. Integrate both sides: ∫(1/h(y))dy = ∫g(x)dx + C
3. Result: H(y) = G(x) + C (implicit general solution)
4. Solve for y if possible (explicit solution)
5. Check: constant solutions where h(y)=0

**Worked example 1 — exponential growth/decay:**
dy/dx = ky. Separate: dy/y = k dx. Integrate: ln|y| = kx + C.
Exponentiate: |y| = e^{kx+C} = Ae^{kx} where A=eᶜ>0.
Include A=0: y=0 (the constant solution, since h(0)=0).
General solution: y = Ae^{kx} for any constant A (including A=0).

**Worked example 2 — nonlinear:**
dy/dx = y². Separate: dy/y² = dx. Integrate: −1/y = x + C.
Solve: y = −1/(x+C).
Check: h(y)=y²=0 when y=0 → y=0 is a constant solution.
Note: the general solution y=−1/(x+C) has a vertical asymptote at x=−C; domain: x≠−C.

**Worked example 3 — with initial condition:**
dy/dx = xy, y(0) = 3. General solution: y = Ae^{x²/2}. Apply y(0)=3: 3 = A·e⁰ → A=3. Particular solution: y = 3e^{x²/2}.

**P49 checkpoint:**
- CORRECT → "Separate: (1/h)dy=g dx. Integrate both sides, one constant C. Check h=0 for constant solutions. Apply IC to find C." → A02
- PARTIAL (MC-1: two constants) → "Both indefinite integrals produce a +C, but the two constants combine into one: H(y)+C₁=G(x)+C₂ → H(y)=G(x)+(C₂−C₁). Since C₂−C₁ is an arbitrary constant, we call it C. A first-order ODE has exactly one arbitrary constant in its general solution." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "dy/dx=y/x. Separate: dy/y=dx/x. Integrate: ln|y|=ln|x|+C. Exponentiate: |y|=e^C·|x|=A|x| → y=Ax (includes x=0 case). Check: h(y)=y → y=0 gives y=0=A·0: already included. General solution: y=Cx (C arbitrary)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Implicit solutions and equilibrium solutions:**

**Implicit solutions:** Not every separable ODE yields an explicit y=f(x). Example:
dy/dx = −x/y. Separate: y dy = −x dx. Integrate: y²/2 = −x²/2 + C → x²+y²=R² (circles).
Cannot be solved for y without a ±: y=±√(R²−x²). Each sign is a valid solution branch.

**Equilibrium solutions (constant solutions):** Before dividing by h(y), identify ALL y₀ with h(y₀)=0.
These give constant solutions y(x)=y₀ that are valid for all x.
After the separation, the general formula H(y)=G(x)+C may or may not include y₀ as a limit (sometimes it does as C→±∞, sometimes it doesn't).

**Singular solutions:** Some ODEs have solutions that are not special cases of the general solution — these must be found separately. Example: dy/dx = y^{2/3}. Separate: y^{-2/3}dy=dx. Integrate: 3y^{1/3}=x+C. Cubing: y=((x+C)/3)³. ALSO: y=0 is a constant solution — it IS the limit as the trajectory collapses, but it satisfies the ODE independently.

**Checking: always verify** by substituting back into the original ODE.

**P49 checkpoint:**
- CORRECT → "Implicit solutions: H(y)=G(x)+C (may not simplify further). Equilibrium solutions: h(y₀)=0. Verify all solutions by substitution." → Gate (P91)
- PARTIAL (MC-2: forgot constant solutions) → "Before dividing by h(y), set h(y)=0 and solve: each solution y=y₀ is a constant solution (y'=0, and g(x)·h(y₀)=0 ✓). Check whether these are included in the general solution formula by taking limits of C, or record them separately." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "dy/dx=(1−y)y. Equilibrium: h(y)=y(1−y)=0 → y=0 and y=1. Separate (for y≠0,1): dy/(y(1−y))=dx. Partial fractions: 1/(y(1−y))=1/y+1/(1−y). Integrate: ln|y|−ln|1−y|=x+C → y/(1−y)=Ae^x → y=Ae^x/(1+Ae^x). Check: as A→0, y→0. As A→∞, y→1. Both equilibria are limits of the general solution." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 TWO-CONSTANTS-FROM-TWO-INTEGRALS):**
Step 1 — "Write ∫(1/h)dy=∫g dx. On the left: H(y)+C₁. On the right: G(x)+C₂. Move C₁ to the right: H(y)=G(x)+(C₂−C₁). Since C₁ and C₂ are BOTH arbitrary, their difference is also arbitrary — call it C=C₂−C₁."
Step 2 — "Shortcut: integrate the LEFT side without a constant; integrate the RIGHT side and add C. This convention is equivalent and gives H(y)=G(x)+C directly."
Step 3 — "Confirmation: a first-order ODE has exactly one arbitrary constant in its general solution. If you see two constants in your answer, you've overcounted — simplify."

**TB-R02 (MC-2 FORGETTING-CONSTANT-SOLUTIONS):**
Step 1 — "ALWAYS check h(y)=0 first. List all y₀ with h(y₀)=0. These give constant solutions y=y₀. Write them down BEFORE separating."
Step 2 — "After finding the general solution, check: are the y₀ values included as special cases (e.g., when C=0 or C→∞)? If yes, the general formula covers them. If no, list them separately as additional solutions."
Step 3 — "Example: dy/dx=y². h(y)=y²=0 when y=0. Constant solution y=0. General solution y=−1/(x+C). As C→±∞, y→0, but y=0 is a separate valid solution since −1/(x+C) never equals 0 for finite C. Record y=0 explicitly."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve the IVP: dy/dx = 3y, y(0) = 2.
2. Solve: dy/dx = x/y. Find the explicit solution and describe the family of curves.
3. Solve: dy/dx = (1+y²)/(1+x²). (Separate and use ∫1/(1+u²)du = arctan(u)+C.)
4. Find all solutions (including equilibrium solutions) of dy/dx = y(2−y). Sketch the solution curves in the xy-plane.
5. Solve: dy/dx = xy/(x²+1), y(0) = 1. Verify your answer by substituting back.

**P55 — Reflect & Consolidate:** "Separate: (1/h)dy=g dx. Integrate both sides, ONE constant C. Check h=0 for equilibria. Apply IC for particular solution. Verify by substitution. Implicit solutions are valid answers when explicit form not available."

**P76 — Transfer Probe (Independence mode):**
(a) Logistic equation: dy/dt = ry(1−y/K) (r,K>0). This is separable. Solve it by partial fractions: 1/(y(1−y/K))=1/y+1/(K−y). Show the general solution is y(t)=K/(1+Ae^{−rt}) (logistic curve). Identify the equilibrium solutions. What is the long-run behaviour? (b) Separation of variables for PDEs: the heat equation u_t = k u_{xx} is often solved by assuming u(x,t)=X(x)T(t). Substituting and separating gives T'/kT = X''/X = −λ (a constant). This gives two ODEs: T'+kλT=0 and X''+λX=0. How is this analogous to the ODE separation technique? (c) Bernoulli's principle in fluid dynamics gives (along a streamline) P+½ρv²+ρgh=const. The equation for the velocity of fluid exiting a tank at height h satisfies dh/dt=−A√(2gh)/B (Torricelli's law). Solve this separable ODE for h(t).

**P75 — Mastery Assessment:**
"A population of bacteria grows according to dy/dt = ky(M−y) where k=0.001, M=1000 (carrying capacity), and y(0)=50 (initial population). (a) Identify the equilibrium solutions. (b) Solve the ODE (it is separable via partial fractions). (c) Find the particular solution satisfying the initial condition. (d) When does the population reach y=500 (half carrying capacity)? (e) Sketch the solution and describe the long-run behaviour."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW equilibrium solutions and handling of the integration constant
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.first-order-ode or math.calc.definite-integral; reassign

**P78 — Completion:** Separable ODE certified. Student separates variables; integrates; finds general and particular solutions; identifies equilibria; handles implicit solutions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Logistic equation; PDE separation of variables; Torricelli's law
Skill tested: Apply separable ODEs to population dynamics, PDEs, and fluid flow

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
