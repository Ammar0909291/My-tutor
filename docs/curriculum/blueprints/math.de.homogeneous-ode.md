# Blueprint: math.de.homogeneous-ode

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.homogeneous-ode |
| name | Homogeneous ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.first-order-ode, math.de.separable |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student identifies a homogeneous first-order ODE of the form dy/dx = f(y/x) (or equivalently M(x,y)dx + N(x,y)dy = 0 where M and N are homogeneous functions of the same degree); applies the substitution v = y/x (so y = vx and dy/dx = v + x dv/dx) to reduce the equation to a separable ODE in v and x; solves the separable ODE; and converts back to y using y = vx.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw dy/dx = f(y/x); show the substitution v=y/x ↔ y=vx as a "change of coordinates" from the (x,y) plane to the (x,v) plane; below, show the separated form dv/f(v)−v = dx/x emerging; annotate: "Homogeneous ODEs have the same structure at all scales — the substitution v=y/x exploits this scale-invariance")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | HOMOGENEOUS-MEANS-ZERO-RIGHT-SIDE | Student confuses "homogeneous first-order ODE" (dy/dx = f(y/x), a structure condition) with "homogeneous linear ODE" (dy/dx + P(x)y = 0, zero right side); applies the wrong technique to the wrong type | Type 3 — language contamination ("homogeneous" means "same throughout" in both cases, but the mathematical definition differs radically between nonlinear first-order and linear ODEs; this ambiguity is genuine — both uses appear in standard textbooks) |
| MC-2 | FORGETTING-PRODUCT-RULE-IN-DY-DX | Student substitutes y = vx but differentiates it as dy/dx = dv/dx (forgetting the product rule contribution x·dv/dx + v); gets the wrong reduced ODE | Type 5 — instruction-induced (students who just learned chain-rule-only substitutions (u-substitution) apply the same pattern here; the product rule for y = vx is dy/dx = v + x·dv/dx, which is NOT just dv/dx) |
| MC-3 | M-AND-N-MUST-HAVE-DEGREE-ZERO | Student thinks the test for homogeneity requires M and N to each have degree zero, rather than the same degree as each other | Type 1 — overgeneralisation (for dy/dx = f(y/x), the ratio N/M (or M/N) must depend on y/x only; this is equivalent to M and N being homogeneous of the SAME degree — not necessarily degree zero) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Homogeneous first-order ODEs:**

**Definition:** dy/dx = f(y/x). Equivalently, M(tx,ty) = tⁿM(x,y) and N(tx,ty) = tⁿN(x,y) for the same n (both homogeneous of degree n).

**Test:** Replace x by tx and y by ty in M(x,y)dx + N(x,y)dy = 0. If M and N both scale by the same power tⁿ, the ODE is homogeneous.

**Substitution:** v = y/x, so y = vx.
**Differentiate:** dy/dx = v + x dv/dx (product rule: d/dx[vx] = v·1 + x·dv/dx).
**Substitute into dy/dx = f(v):** v + x dv/dx = f(v).
**Separate:** x dv/dx = f(v) − v → dv/(f(v)−v) = dx/x.
**Integrate both sides.** Solve for v. Substitute back y = vx.

**Worked example:**
dy/dx = (x² + y²)/(2xy). Check: M=−(x²+y²), N=2xy, both degree 2. Homogeneous.
Substitute v = y/x: dy/dx = (1 + v²)/(2v).
v + x dv/dx = (1+v²)/(2v).
x dv/dx = (1+v²)/(2v) − v = (1+v²−2v²)/(2v) = (1−v²)/(2v).
Separate: 2v/(1−v²) dv = dx/x.
Integrate: −ln|1−v²| = ln|x| + C₁.
1/|1−v²| = A|x|.
1 − v² = 1/(Ax) → substitute v = y/x: 1 − y²/x² = 1/(Ax) → x² − y² = x/A.
General solution: x² − y² = Kx (implicit).

**P49 checkpoint:**
- CORRECT → "Homogeneous ODE: dy/dx=f(y/x). Substitute v=y/x, dy/dx=v+x dv/dx. Separable in v and x. Solve, back-substitute y=vx." → A02
- PARTIAL (MC-2: dy/dx = dv/dx) → "y = vx is a product of two functions of x. Differentiate using the product rule: dy/dx = d/dx[v·x] = (dv/dx)·x + v·(dx/dx) = x dv/dx + v. The v term (from differentiating x = 1) is essential — it's not just dv/dx." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "dy/dx = (x+y)/x = 1 + y/x = 1 + v. Substitute: v + x dv/dx = 1+v → x dv/dx = 1 → dv = dx/x → v = ln|x|+C. Back-substitute: y/x = ln|x|+C → y = x(ln|x|+C)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Recognition and the two types of "homogeneous":**

**Disambiguation:**
- "Homogeneous first-order ODE" (this concept): dy/dx = f(y/x). Nonlinear. Solved by v = y/x.
- "Homogeneous linear ODE" (second-order and higher): dy/dx + P(x)y = 0. Linear. Solved by integrating factor (first order) or characteristic equation (second order).
These are DIFFERENT concepts sharing the word "homogeneous" — always check the context.

**Recognition test:**
- Write dy/dx = M(x,y)/N(x,y).
- Check: if you substitute (x,y) → (tx,ty), does dy/dx stay the same? (i.e., does the ratio M(tx,ty)/N(tx,ty) = M(x,y)/N(x,y)?) If yes, it's homogeneous of this type.
- Equivalent: can you write dy/dx purely as a function of y/x?

**Alternative substitution v = x/y:** Used when dy/dx = g(x/y) appears more natural. Then x = vy, dx/dy = v + y dv/dy. Proceed symmetrically.

**P49 checkpoint:**
- CORRECT → "Two meanings of 'homogeneous': (1) dy/dx=f(y/x), nonlinear → v=y/x; (2) linear with zero right side → different method. Test: does scaling (x,y)→(tx,ty) leave dy/dx unchanged?" → Gate (P91)
- PARTIAL (MC-1: confused with zero right side) → "Homogeneous first-order ODE means dy/dx = f(y/x) — the right side is a function of the RATIO y/x. This is NOT the same as 'homogeneous linear ODE' (zero right side, like dy/dx+Py=0). For instance, dy/dx = y/x is a homogeneous first-order ODE (f(v)=v) AND also a linear ODE with zero right side — but dy/dx = (x+y)/x is only homogeneous first-order (f(v)=1+v), not linear." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Check: is dy/dx = (y²−x²)/(xy) homogeneous? Replace x by tx, y by ty: (t²y²−t²x²)/(tx·ty)=(t²(y²−x²))/(t²xy)=(y²−x²)/(xy). YES, it's homogeneous (degree 0 ratio). Substitute: v + x dv/dx = (v²−1)/v. x dv/dx = (v²−1)/v − v = (v²−1−v²)/v = −1/v. Separate: v dv = −dx/x. v²/2=−ln|x|+C. (y/x)²/2+ln|x|=C." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 FORGETTING-PRODUCT-RULE):**
Step 1 — "y = v(x)·x is a product. Product rule: dy/dx = v'·x + v·1 = x·(dv/dx) + v."
Step 2 — "Think of it as: y/x = v(x) is a new variable. When you change variables from y to v=y/x, you 'pay' an extra v in the derivative. This is the same mechanism as the chain rule in substitution."
Step 3 — "Memorise: for the substitution v = y/x, ALWAYS write dy/dx = v + x dv/dx (not just dv/dx or x dv/dx). The 'v' term is always there."

**TB-R02 (MC-1 + MC-3 combined):**
Step 1 — "Two different uses of 'homogeneous': (1) in first-order nonlinear: means f(y/x) structure, scale-invariant; (2) in linear ODEs: means zero right side. The context tells you which: if the ODE is linear, 'homogeneous' means the right side is zero; if it's nonlinear of the form dy/dx = ratio, it's the f(y/x) type."
Step 2 — "Degree test: M(x,y) and N(x,y) are homogeneous of degree n if M(tx,ty)=tⁿM(x,y). M and N must have the SAME degree n for the ODE M dx+N dy=0 to be homogeneous (of the first-order nonlinear type). The degree n can be any integer — most textbook examples use n=1 or n=2."
Step 3 — "If M has degree 2 and N has degree 2: same degree → homogeneous ODE (apply v=y/x). If M has degree 2 and N has degree 3: different degrees → not this type of homogeneous ODE."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: dy/dx = (y² + xy)/x². (Check homogeneity, substitute v=y/x, separate, solve.)
2. Solve: (x² + 2xy)dy = (y² + 2xy)dx. (Rearrange to dy/dx=..., verify homogeneous, substitute.)
3. Solve the IVP: x dy − y dx = √(x²+y²) dx, y(1) = 0.
4. Show that any separable ODE dy/dx = g(x)h(y) that is also homogeneous (dy/dx = f(y/x)) must satisfy: g(x) = c/x and h(y) = f(y/x)/(c/x) for some constant c. What family of ODEs does this describe?
5. The ODE dy/dx = (ax + by)/(cx + dy) (a, b, c, d constants) is homogeneous. Solve it generally by substituting v = y/x. (Your answer will involve arctan or ln, depending on the discriminant of the denominator.)

**P55 — Reflect & Consolidate:** "Homogeneous first-order ODE: dy/dx = f(y/x). Test: M(tx,ty)=tⁿM, N(tx,ty)=tⁿN. Substitute v=y/x, so dy/dx=v+x dv/dx. Separable ODE in v,x. Solve, back-substitute y=vx. Distinct from 'homogeneous linear ODE'."

**P76 — Transfer Probe (Independence mode):**
(a) The Euler-Cauchy ODE: x²y'' + axy' + by = 0 is solved by the substitution x = eᵗ (or equivalently y = xᵐ). How does the homogeneous structure of this ODE — all terms have the same total degree (2) in x and y and its derivatives — motivate this substitution, by analogy with the v=y/x substitution? (b) The Clairaut equation: y = xy' + f(y') is a first-order ODE. Differentiate both sides with respect to x. Show that the general solution consists of a family of lines y = Cx + f(C), and that there is also a singular solution obtained by eliminating p=y' from y=xp+f(p) and y=xp'+f'(p')·0=x+f'(p)·p'. (c) Scale-invariant problems in physics: the heat equation boundary layer has self-similar solutions u(x,t) = g(x/√t). Explain how this is analogous to the v = y/x substitution for homogeneous ODEs.

**P75 — Mastery Assessment:**
"(a) Solve: (x²y + y³)dx + (x³ + xy²)dy = 0. (Verify homogeneous, substitute, separate, solve.) (b) A ray of light in a medium with refractive index n(x,y) = 1/y satisfies the homogeneous ODE dy/dx = y/x + √((y/x)²−1). Solve this ODE. (The solution should be a family of circles.) (c) The orbit equation dr/dθ = r·f(r·e_θ) in polar coordinates, where f is homogeneous of degree 0, can be converted to a separable ODE via u = 1/r. Explain the structural analogy with the v = y/x substitution. (d) For the ODE dy/dx = (y/x)·g(y/x), identify the general formula for the solution in terms of a single integral, and verify that the special case g(v)=v gives y = Cx (all lines through the origin)."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the disambiguation from homogeneous linear ODEs and the product-rule differentiation
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.separable; reassign

**P78 — Completion:** Homogeneous ODE certified. Student identifies the f(y/x) structure; distinguishes from homogeneous linear ODEs; applies v=y/x with correct product-rule differentiation; separates and solves; back-substitutes correctly.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Euler-Cauchy ODE; Clairaut equation; self-similar solutions in physics
Skill tested: Generalise the scale-invariance substitution idea to higher-order and physical contexts

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
