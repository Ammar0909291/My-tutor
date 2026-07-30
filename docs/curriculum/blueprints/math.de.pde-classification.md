# Blueprint: math.de.pde-classification

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.pde-classification |
| name | Classification of PDEs |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | understand |
| Estimated hours | 4 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.pde |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student classifies second-order linear PDEs of the form Auₓₓ + Buₓᵧ + Cuᵧᵧ + lower-order terms = 0 using the discriminant Δ = B² − 4AC: elliptic (Δ<0), parabolic (Δ=0), hyperbolic (Δ>0); identifies canonical examples (Laplace/Poisson = elliptic, heat = parabolic, wave = hyperbolic); explains the connection between classification and the physical character of the equation (equilibrium vs. diffusion vs. propagation); and matches each class to its appropriate solution method and boundary/initial condition requirements.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 2×2 classification table: rows = discriminant (Δ<0, Δ=0, Δ>0); columns = (Canonical name, Physical archetype, Solution behaviour); fill: Elliptic|Laplace/Poisson|Equilibrium, no propagation; Parabolic|Heat equation|Smooth diffusion, one time direction; Hyperbolic|Wave equation|Wave propagation, characteristics; annotate: "Discriminant B²−4AC is the PDE analogue of the quadratic formula's b²−4ac — it classifies whether solutions 'look like' ellipses, parabolas, or hyperbolas")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | DISCRIMINANT-APPLIED-TO-COEFFICIENTS-NOT-PDE | Student applies B²−4AC to a quadratic polynomial appearing in the solution or in boundary data rather than to the COEFFICIENTS A, B, C of the leading second-order terms of the PDE itself | Type 3 — language contamination ("discriminant" is first encountered for quadratic equations ax²+bx+c=0; students reflexively apply Δ=b²−4ac to whatever polynomial appears in the PDE problem without identifying A, B, C as the PDE coefficients of uₓₓ, uₓᵧ, uᵧᵧ) |
| MC-2 | CLASSIFICATION-IS-GLOBAL-NOT-LOCAL | Student thinks the classification of a PDE with variable coefficients A(x,y), B(x,y), C(x,y) is fixed globally; doesn't realise that the discriminant B²−4AC can change sign across the domain, making a PDE elliptic in one region and hyperbolic in another | Type 5 — instruction-induced (textbook examples almost always have constant A, B, C where the classification is indeed global; variable-coefficient PDEs — like the Tricomi equation yuₓₓ+uᵧᵧ=0, elliptic for y>0 and hyperbolic for y<0 — are rarely presented, leaving students with the impression that classification is always a single fixed label) |
| MC-3 | PARABOLIC-MEANS-PARABOLA-SHAPE | Student confuses "parabolic PDE" with a PDE whose solution has a parabolic shape, or thinks the classification refers to the geometry of the solution rather than the discriminant condition Δ=0 | Type 3 — language contamination ("parabolic" in everyday mathematics describes a parabola (the curve y=x²); "parabolic PDE" is a technical classification by discriminant, not by the shape of any solution; the connection is to the theory of conic sections — an equation Ax²+Bxy+Cy²=1 is a parabola when B²−4AC=0 — but no solution of the heat equation is literally parabolic) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The second-order PDE discriminant:**

**General second-order linear PDE in 2 variables:**
A uₓₓ + B uₓᵧ + C uᵧᵧ + D uₓ + E uᵧ + F u = G(x,y).

**Classification by Δ = B² − 4AC:**
| Class | Condition | Canonical example |
|-------|-----------|-------------------|
| Elliptic | Δ < 0 | uₓₓ + uᵧᵧ = 0 (Laplace): A=1,B=0,C=1 → Δ=−4 |
| Parabolic | Δ = 0 | uₜ = k uₓₓ (heat): write as k uₓₓ − uₜ = 0 → A=k,B=0,C=0 → Δ=0 |
| Hyperbolic | Δ > 0 | uₜₜ = c² uₓₓ (wave): A=c²,B=0,C=−1 → Δ=4c²>0 |

**Physical characters:**
- **Elliptic:** equilibrium — solutions are determined by BCs on the whole boundary (Dirichlet or Neumann); no preferred direction; smooth solutions inside.
- **Parabolic:** diffusion — initial condition at t=0 + BCs on spatial boundary determine the solution for t>0; smoothing effect (infinitely smooth for t>0 even from rough IC).
- **Hyperbolic:** propagation — initial conditions at t=0 plus ICs for uₜ determine the solution; finite propagation speed (waves), characteristics, possible shocks.

**P49 checkpoint:**
- CORRECT → "Δ=B²−4AC: Δ<0 elliptic (Laplace), Δ=0 parabolic (heat), Δ>0 hyperbolic (wave). Physical: equilibrium / diffusion / propagation." → A02
- PARTIAL (MC-1: wrong identification of A,B,C) → "A, B, C are the coefficients of the SECOND-ORDER TERMS ONLY: uₓₓ, uₓᵧ, uᵧᵧ. Specifically: A = coefficient of uₓₓ; B = coefficient of uₓᵧ; C = coefficient of uᵧᵧ. Lower-order terms (uₓ, uᵧ, u, constant) play NO role in classification. Then compute Δ=B²−4AC." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Classify 3uₓₓ − 4uₓᵧ + 5uᵧᵧ = 0. A=3, B=−4, C=5. Δ=16−60=−44<0. Elliptic. Classify uₓₓ − 2uₓᵧ + uᵧᵧ + uₓ = 0. A=1,B=−2,C=1. Δ=4−4=0. Parabolic." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Variable coefficients and mixed-type PDEs:**

**Variable-coefficient example — Tricomi equation:**
y uₓₓ + uᵧᵧ = 0.
A=y, B=0, C=1. Δ=0²−4y·1=−4y.
- For y>0: Δ<0 — ELLIPTIC (subsonic flow analogy).
- For y=0: Δ=0 — PARABOLIC (transition, sonic).
- For y<0: Δ>0 — HYPERBOLIC (supersonic flow).
This PDE changes type across y=0 — the classification is LOCAL (depends on position).

**Implications for solution methods:**
- **Elliptic** → boundary value problem; use Fourier series, separation of variables, Green's functions; do NOT specify time evolution.
- **Parabolic** → initial-boundary value problem; use Fourier series in x, exponential decay in t; well-posed with u(x,0)=f(x) + BCs.
- **Hyperbolic** → initial-boundary value problem with TWO initial conditions (u and uₜ); d'Alembert's formula or Fourier series; finite propagation speed means information travels along characteristics.

**Mixed BCs:**
- Elliptic: specify u or ∂u/∂n on the ENTIRE boundary (overdetermination or underdetermination leads to ill-posedness).
- Parabolic: specify u at t=0 and BCs in x; do NOT need ∂u/∂t at t=0.
- Hyperbolic: specify BOTH u and ∂u/∂t at t=0 (Cauchy data).

**P49 checkpoint:**
- CORRECT → "Variable coefficients: classify locally via Δ(x,y)=B(x,y)²−4A(x,y)C(x,y) — may change across domain. Elliptic→BVP. Parabolic→IC+BCs. Hyperbolic→IC+∂u/∂t IC+BCs." → Gate (P91)
- PARTIAL (MC-2: global classification for variable coefficients) → "For variable A(x,y), B(x,y), C(x,y): compute Δ(x,y)=B²−4AC at each point. The CLASSIFICATION CAN CHANGE across the domain. The Tricomi equation yuₓₓ+uᵧᵧ=0 is elliptic for y>0 and hyperbolic for y<0 — there is no single global label. When the problem specifies a domain, classify Δ on that domain (it may be a single type, or mixed)." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Classify each PDE in its domain: (1) uₓₓ+uᵧᵧ=f(x,y) in disk {x²+y²<1}: A=1,B=0,C=1,Δ=−4<0 everywhere → ELLIPTIC throughout. (2) uₜ=uₓₓ+uᵧᵧ (heat in 2D) as −uₜ+uₓₓ+uᵧᵧ=0: treat (x,y,t) — mixed character (see remark). In (x,t): A=1,B=0,C=0 → Δ=0, PARABOLIC." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Identify A, B, C mechanically: write the PDE and label the LEADING terms only — the terms with second-order derivatives. Circle uₓₓ, uₓᵧ, uᵧᵧ. Their coefficients (possibly functions of x, y) are A, B, C respectively. Everything else is dropped."
Step 2 — "Conic section analogy: the ALGEBRAIC curve Ax²+Bxy+Cy²=1 is an ellipse if B²−4AC<0, a parabola if B²−4AC=0, a hyperbola if B²−4AC>0. The PDE classification uses the IDENTICAL discriminant — the conic labels carry over to PDEs by this analogy, not because solutions have conic shapes."
Step 3 — "Parabolic clarification: 'parabolic PDE' means Δ=0 — the discriminant is exactly zero. The heat equation IS parabolic. It does NOT mean solutions are parabola-shaped. A solution to the heat equation uₜ=uₓₓ starting from u(x,0)=e^{−x²} (a bell curve) stays a bell curve — never a parabola."

**TB-R02 (MC-2 GLOBAL-VS-LOCAL):**
Step 1 — "For A, B, C CONSTANT (most textbook problems): Δ is a single number → classification is global and uniform throughout the domain."
Step 2 — "For A(x,y), B(x,y), C(x,y) VARIABLE: Δ(x,y) is a function → evaluate at each point. If Δ>0 everywhere in the domain: hyperbolic. If Δ<0 everywhere: elliptic. If Δ changes sign: the PDE is of MIXED TYPE (like Tricomi)."
Step 3 — "Physically mixed-type PDEs model transonic flow, where the flow transitions from subsonic (elliptic, pressure propagates in all directions) to supersonic (hyperbolic, characteristics only downstream). This is why mixed-type PDEs are hard: no single solution method works everywhere."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Classify each PDE: (a) 4uₓₓ + 4uₓᵧ + uᵧᵧ = 0; (b) uₓₓ − uᵧᵧ = 0; (c) uₓₓ + 2uₓᵧ + uᵧᵧ − uₓ = 0; (d) uₓₓ + 4uᵧᵧ = 0.
2. Show that every PDE of the form uₓₓ + uᵧᵧ = F(x,y,u,uₓ,uᵧ) is elliptic regardless of F.
3. For the PDE (y²+1)uₓₓ + uᵧᵧ = 0: (a) find the discriminant Δ as a function of y; (b) classify the PDE in each region of the xy-plane; (c) for what value of y (if any) is the PDE parabolic?
4. A researcher claims that a BVP for the wave equation (hyperbolic) with only boundary conditions (no initial condition on uₜ) is well-posed. Explain, using the classification, why this is likely to be ill-posed.
5. Write the heat equation uₜ = c²uₓₓ in the form of the general second-order linear PDE with independent variables (x,t) instead of (x,y). Identify A, B, C and compute Δ. Confirm it is parabolic.

**P55 — Reflect & Consolidate:** "Auₓₓ+Buₓᵧ+Cuᵧᵧ+⋯=0. Δ=B²−4AC: <0 elliptic (Laplace), =0 parabolic (heat), >0 hyperbolic (wave). Variable coefficients: classify locally. Physical meaning: equilibrium / diffusion / wave propagation. IC/BC requirements: BVP / IC+BCs / IC+∂ₜIC+BCs."

**P76 — Transfer Probe (Independence mode):**
(a) Canonical forms: every second-order linear PDE can be reduced (by a change of variables) to a canonical form in which cross-derivative terms vanish. For elliptic PDEs, the canonical form is ũₛₛ + ũₜₜ + lower = 0 (Laplace structure); for hyperbolic, ũₛₜ + lower = 0 (d'Alembert structure); for parabolic, ũₛₛ − ũₜ + lower = 0 (heat structure). Show that the transformation to canonical form amounts to diagonalising the symbol matrix [[A, B/2],[B/2, C]]. (b) Systems of first-order PDEs: the wave equation uₜₜ=c²uₓₓ can be written as a 2×2 first-order system [uₜ; cₓ]' = [[0,c],[c,0]][uₓ; uₜ]. The eigenvalues of the coefficient matrix give the characteristic speeds ±c. Explain how this characteristic analysis generalises the scalar hyperbolic classification. (c) Pseudo-differential operators: the symbol of the second-order PDE A uₓₓ + B uₓᵧ + C uᵧᵧ is σ(ξ,η) = Aξ²+Bξη+Cη² (obtained by replacing ∂/∂x→iξ, ∂/∂y→iη). Show that the PDE is elliptic iff σ≠0 for all (ξ,η)≠(0,0) — i.e., the operator has no real "direction of non-coerciveness," which is equivalent to Δ<0.

**P75 — Mastery Assessment:**
"(a) Classify and state the appropriate initial/boundary conditions for: (i) the Helmholtz equation uₓₓ+uᵧᵧ+k²u=0; (ii) the Klein-Gordon equation uₜₜ−c²uₓₓ+m²u=0; (iii) the Schrödinger equation iuₜ=−uₓₓ+Vu (interpret as real/imaginary system). (b) The PDE Δu=u in a bounded domain with u=0 on the boundary: (i) classify the equation; (ii) state why this is an eigenvalue problem; (iii) explain whether solutions necessarily exist for all values of the constant m² in Δu+m²u=0. (c) Explain in physical terms (no computation) why an elliptic PDE requires boundary conditions everywhere on the boundary, while a parabolic PDE only requires conditions on part of the boundary (the initial time and spatial edges). What would happen if you tried to impose uₜ(x,0)=g(x) as an extra IC for the heat equation? (d) For the variable-coefficient PDE u_xx − x·u_yy = 0: determine the type in each of the three regions x>0, x=0, x<0. Sketch the transition curve in the xy-plane."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the variable-coefficient local classification and the IC/BC requirements per type
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.pde; reassign

**P78 — Completion:** Classification of PDEs certified. Student applies the discriminant B²−4AC to identify elliptic, parabolic, and hyperbolic PDEs; recognises the canonical examples (Laplace, heat, wave); classifies variable-coefficient PDEs locally; and matches each class to its correct initial/boundary condition requirements and solution character.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Canonical form reduction; first-order system characteristics; pseudo-differential symbol
Skill tested: Connect the discriminant classification to the deeper structure of the PDE's characteristic geometry and operator theory

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
