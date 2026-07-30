# Blueprint: math.de.ode-order

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.ode-order |
| name | ODE Order and Degree |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | remember |
| Estimated hours | 1 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.de.ode |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the ORDER of an ODE as the order of the highest derivative appearing in the equation; defines the DEGREE as the power to which the highest-order derivative is raised (when the ODE is polynomial in its derivatives); classifies given ODEs by order and degree; identifies that order determines the number of arbitrary constants in the general solution; and distinguishes first-order, second-order, and nth-order ODEs from the structure of the equation.

## Component 2 — CPA Entry Stage
**C — Concrete** (present four equations side by side: (1) y'=2x [order 1, degree 1]; (2) y''+3y'+2y=0 [order 2, degree 1]; (3) (y''')²+y=x [order 3, degree 2]; (4) y''+sin(y')=0 [order 2, degree undefined/not a polynomial ODE]; annotate: "Order = highest derivative; Degree = power of that derivative (when polynomial); General solution has n arbitrary constants for an order-n ODE")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ORDER-IS-THE-POWER-OF-THE-DERIVATIVE | Student identifies the order as the exponent on the derivative (e.g., (y')³ → order 3) rather than the order of the derivative itself | Type 3 — language contamination ("order" and "degree" are both words for "how big/strong something is"; students conflate the two; the phrase "third power" sounds like "third order") |
| MC-2 | DEGREE-ALWAYS-EXISTS | Student assigns a degree to non-polynomial ODEs (e.g., assigns degree 1 to y''+sin(y')=0) not knowing that the degree is only defined when the ODE is a polynomial in its derivatives | Type 5 — instruction-induced (all initial examples are polynomial ODEs; students assume degree always applies without checking the polynomial condition) |
| MC-3 | NUMBER-OF-CONSTANTS-EQUALS-DEGREE | Student states the general solution has as many arbitrary constants as the degree rather than the order | Type 3 — language contamination (both "order" and "degree" are numerical measures of the ODE; students confuse which one governs the count of integration constants) |

## Component 4 — Session TA Cap
**Cap = 3** (hrs = 1 → cap 3)

## Component 5 — Teaching Action Sequence

### A01 — P04 PATTERN INDUCTION
**Classifying ODEs by order and degree:**

**Order:** The order of an ODE is the order of the HIGHEST derivative present.
- y'=f(x) → order 1
- y''+p(x)y'+q(x)y=0 → order 2
- y''' + y = x² → order 3

**Degree:** If the ODE is a polynomial in the derivatives (i.e., the derivatives appear only as algebraic terms — no sin, exp, etc. of derivatives), then the DEGREE is the power to which the highest-order derivative is raised.
- y'' + y = 0 → degree 1 (y'' appears to the first power)
- (y'')² + y' = x → degree 2
- y'' + sin(y') = 0 → degree undefined (not polynomial in y')

**Number of arbitrary constants in the general solution:**
An nth-order ODE has n independent solutions (for linear ODEs) → general solution has exactly n arbitrary constants. This is a fundamental result: order governs the dimension of the solution space.

**Examples for classification:**
1. y' + 3y = eˣ → order 1, degree 1
2. (y'')³ + 2y' = 0 → order 2, degree 3
3. y⁴ (the 4th derivative) + y = 0 → order 4, degree 1
4. √(y'') + y = 0 → order 2, degree undefined (y'' appears as √y'', i.e., (y'')^{1/2}, not a polynomial power)

**P49 checkpoint:**
- CORRECT → "Order = highest derivative's order. Degree = power of highest derivative (polynomial ODEs only). n-th order → n arbitrary constants in general solution." → Gate (P91)
- PARTIAL (MC-1: order = power of derivative) → "Order is determined by WHICH derivative appears (first derivative, second derivative, etc.), not by the exponent on it. In (y')³=x: the highest derivative is y' (first derivative) → order 1. The ³ is the DEGREE (the power). Order=1, Degree=3." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "Classify: (a) y''' − 2y'' + y = 0: order=3 (y''' is the highest derivative), degree=1 (y''' appears to the first power). (b) (y'')²+y'=x: order=2, degree=2. (c) y'·sin(y)=1: order=1, degree=1 (y' appears to the first power — but y itself is not a derivative, so the ODE IS polynomial in its derivatives)." → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 + MC-3 combined):**
Step 1 — "Order: count the prime marks (or the superscript number). y' is order 1. y'' is order 2. y^{(4)} is order 4. The highest one in the ODE determines the ODE's order — regardless of any exponents."
Step 2 — "Degree: after identifying the highest-order derivative, ask: does it appear as a polynomial (integer powers only, no functions like sin or sqrt applied to it)? If yes, the degree is the power it appears to. If no (e.g., e^{y''}, sin(y''), √y''), the degree is undefined."
Step 3 — "n arbitrary constants: solve a first-order ODE → one constant C₁. Second-order → C₁ and C₂. To determine both constants, you need two initial/boundary conditions. This is why 'initial value problem' for a second-order ODE gives two initial conditions: y(0)=a, y'(0)=b."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Classify each ODE by order and degree (or state undefined for degree): (a) y'' + 4y = 0; (b) (y')⁴ + y = sin x; (c) y''' = x²y'; (d) y'' + eʸ' = 0; (e) (y'')^{3/2} = 1 + (y')².
2. How many arbitrary constants does the general solution of (a) y'' + y' + y = 0 have? (b) y^{(5)} = x have?
3. An ODE has the general solution y = C₁e²ˣ + C₂e⁻ˣ + 3x. What is the order of the ODE? (Count the arbitrary constants.)
4. Rewrite (y'')^{1/2} = 1 + y as a polynomial ODE by squaring both sides. What is the order and degree of the resulting equation? (Note: squaring may introduce extraneous solutions.)
5. True or false: "A second-degree ODE always requires two initial conditions." Justify.

**P55 — Reflect & Consolidate:** "Order = highest derivative. Degree = power of that derivative (polynomial ODEs only; else undefined). Order-n ODE: general solution has n arbitrary constants. Squaring/rationalising can change the degree but not the order."

**P76 — Transfer Probe (Independence mode):**
(a) In classical mechanics, Newton's second law F=ma=mẍ is a second-order ODE in position x(t). Why does the second-order nature imply you need both initial position and initial velocity to determine the trajectory? (b) In the theory of linear ODEs, the existence-uniqueness theorem (Picard-Lindelöf) guarantees that a first-order ODE y'=f(x,y) with a single initial condition y(x₀)=y₀ has a unique solution near x₀ under mild regularity. For what order n ODE would you need n initial conditions for uniqueness? (c) The Cauchy-Kowalewski theorem extends existence-uniqueness to PDEs of various orders. For the wave equation u_{tt}=c²u_{xx} (second-order in both t and x), what initial data is needed? What does "order in t" tell you about the number of initial conditions in t?

**P75 — Mastery Assessment:**
"(a) An ODE's general solution is y = C₁x² + C₂x + C₃ + x³. What is the order of the ODE? (b) Write the general form of a 4th-order linear ODE with constant coefficients (i.e., aₒy^{(4)}+a₁y'''+a₂y''+a₃y'+a₄y=f(x)). How many linearly independent solutions does the homogeneous version have? (c) A physicist writes: 'd²y/dx² = −(dy/dx)³'. Classify this ODE. Is it linear? (d) Is the ODE (y'²+1)^{3/2}=y'' polynomial in its derivatives? After squaring: what is the degree? (e) Why must a 5th-order initial value problem be given exactly 5 initial conditions?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW degree definition for non-polynomial ODEs
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.ode; reassign

**P78 — Completion:** ODE Order and Degree certified. Student classifies ODEs by order and degree; states the connection between order and number of arbitrary constants; identifies non-polynomial ODEs where degree is undefined.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Newton's second law as 2nd-order ODE; existence-uniqueness theorem; Cauchy-Kowalewski
Skill tested: Connect order classification to physical initial conditions and mathematical existence theory

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
