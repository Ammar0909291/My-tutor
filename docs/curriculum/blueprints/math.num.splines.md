# Blueprint: math.num.splines

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.splines |
| Title | Spline Interpolation |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.num.interpolation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a set of data points, the student constructs a piecewise polynomial spline by writing the conditions for C⁰ (continuity), C¹ (continuous first derivative), and C² (continuous second derivative) at interior knots; sets up and counts the equations for a natural cubic spline (S''(x₀)=S''(xₙ)=0); explains why splines avoid the Runge phenomenon that afflicts high-degree global polynomial interpolation; and distinguishes interpolating splines (pass through data) from approximating splines (B-splines, Bezier curves) by contrasting their defining properties.

## Component 2 — CPA Entry Stage
**C — Concrete** (bend a flexible ruler (a physical spline) through plotted data points; observe that it is piecewise smooth with continuous curvature — before any algebraic conditions)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MORE-SMOOTHNESS-ALWAYS-BETTER | Student always imposes C² conditions even when C¹ is sufficient, adding unnecessary complexity and potentially over-constraining the system | Type 1 — overgeneralization (textbook examples always feature the most refined spline — natural cubic; students infer that maximum smoothness is always optimal without considering that C⁰ linear splines suffice for many engineering applications) |
| MC-2 | SPLINE-CONTROL-POINTS-ARE-INTERPOLATION-POINTS | Student believes B-splines and Bezier curves pass exactly through their control points; confuses the interpolating and approximating frameworks | Type 3 — language contamination (all splines are described as "fitting a curve through points"; the phrase "through points" implies interpolation; the distinction between control points as weights vs. data points as constraints is never emphasised) |
| MC-3 | PIECEWISE-LINEAR-IS-NOT-A-SPLINE | Student does not recognise piecewise-linear interpolation (connecting dots with straight lines) as the simplest C⁰ spline, and cannot extend the spline framework to linear pieces | Type 5 — instruction-induced (splines are introduced via cubic splines to achieve visual smoothness; the piecewise-linear case is treated as a naive method, not as a degenerate member of the spline family) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a spline:**

| Representation | Content for cubic spline on [x₀, x₁] |
|---|---|
| Physical | Thin flexible beam deflected at knot points; curvature continuous by elasticity |
| Algebraic | Sᵢ(x)=aᵢ+bᵢ(x−xᵢ)+cᵢ(x−xᵢ)²+dᵢ(x−xᵢ)³ on [xᵢ, xᵢ₊₁] |
| Conditions table | Interpolation (2n), C⁰ (n−1), C¹ (n−1), C² (n−1) + 2 boundary = 4n equations for 4n unknowns |
| Smoothness comparison | C⁰ linear: connected but kinked; C¹ cubic: smooth tangent; C² cubic: smooth curvature |

**Smoothness levels for n−1 interior knots:**
| Class | Condition at each knot | Degree required |
|---|---|---|
| C⁰ | Sᵢ(xᵢ₊₁)=Sᵢ₊₁(xᵢ₊₁) | ≥1 |
| C¹ | + S'ᵢ(xᵢ₊₁)=S'ᵢ₊₁(xᵢ₊₁) | ≥3 |
| C² | + S''ᵢ(xᵢ₊₁)=S''ᵢ₊₁(xᵢ₊₁) | ≥3 (but need 2 boundary conditions) |

**Natural cubic spline boundary conditions:** S''(x₀)=0, S''(xₙ)=0 (zero curvature at the endpoints — "free" ends). Other choices: clamped (prescribed first derivatives at endpoints), periodic.

**P49 checkpoint:**
- CORRECT → "A cubic spline on n+1 points has n pieces, each with 4 coefficients = 4n unknowns. Conditions: 2n (interpolation) + 3(n−1) (C¹ and C²) + 2 boundary = 4n equations. Unique solution for the natural cubic spline." → A02
- PARTIAL (can state conditions but cannot count equations) → "Count: n pieces × 2 endpoint values = 2n equations (interpolation). C⁰ adds n−1 equations (interior matching). C¹ adds n−1. C² adds n−1. Natural BC adds 2. Total: 2n+3(n−1)+2=5n−1 — wait, that overcounts. Let's recount: 2n+2(n−1)+2=4n. Each piece has 4 unknowns → 4n total → uniquely determined." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For 3 data points (2 pieces), how many cubic polynomial coefficients are there total? List the conditions that must hold at the interior knot x₁." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Spline gallery — from coarse to refined:**

**Level 0 (C⁰ linear spline):** Connect adjacent points with straight line segments. Simple, fast. Approximation error O(h²) for smooth f. Kinked at knots.

**Level 1 (C¹ cubic spline):** Clamped cubic spline with prescribed derivatives at endpoints. Smooth tangents. Error O(h⁴).

**Level 2 (C² natural cubic spline):** Zero curvature at endpoints. Visually the smoothest. Error O(h⁴). Minimises ∫[f''(x)]² dx among all interpolants — the spline is the "least-bent" curve through the data.

**Level 3 (B-spline basis):** Represent the spline in the B-spline basis for numerical stability. Control polygon gives intuitive shape control. B-splines have local support — changing one control point affects only a few pieces.

**Runge phenomenon contrast:** High-degree global polynomial through n+1 equally spaced points oscillates wildly near endpoints for smooth functions like 1/(1+25x²) (Runge's function). The degree-10 Lagrange interpolant at equally spaced points on [−1,1] has maximum error ≈10⁻³; degree-20 error ≈0.3; degree-40 error > 10. Natural cubic spline on the same points: error ≤ C·h⁴ — stable and convergent.

**P49 checkpoint:**
- CORRECT → "Splines avoid Runge's phenomenon because they are piecewise polynomials of low (typically degree 3) degree. The degree-n polynomial fits the data exactly but oscillates; the spline fits the data exactly with bounded, smooth curvature by spreading the fit across many low-degree pieces." → A03
- PARTIAL (understands Runge's oscillation but cannot connect to spline advantage) → "Why doesn't the spline oscillate? Because each cubic piece only 'knows about' the data points at its two endpoints (plus continuity at knots). It has no incentive to pass through far-away data, unlike the global polynomial which must honour all n+1 points simultaneously." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Plot 1/(1+25x²) on [−1,1] and fit it with a degree-10 Lagrange interpolant and a cubic spline at the same 11 equally-spaced points. Which curve behaves better near the endpoints?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Interpolating vs. approximating splines:**

**Interpolating cubic spline:** Passes through every data point exactly. The coefficients are determined by the interpolation + smoothness conditions — a linear system. Use when: data is known exactly; visual interpolation required.

**B-spline (approximating):** Control points ATTRACT the curve but the curve does NOT pass through them (except at the endpoints in some formulations). The Bezier curve is the simplest case. B-spline is defined as a weighted combination of B-spline basis functions. Properties: local support (changing one control point affects only a few pieces); convex hull property (curve lies inside the convex hull of the control polygon); affine invariance. Use when: shape design (CAD/CAM); data has noise (interpolating would over-fit).

**Key contrast:**
| Property | Interpolating cubic spline | B-spline (approximating) |
|---|---|---|
| Passes through data | Yes | No (control polygon) |
| Local support | No (global solve for all coefficients) | Yes |
| Use case | Exact data; interpolation | Noisy data; design |
| Runge risk | Low (piecewise degree 3) | Low (same reason) |

**Can a B-spline interpolate?** Yes — by solving for control points that reproduce the data exactly. This is called "spline interpolation in B-spline form" and gives numerical stability over the monomial basis.

**P49 checkpoint:**
- CORRECT → "Interpolating splines pass through data exactly; approximating splines (B-splines, Bezier) use control points that attract but do not constrain the curve. Interpolating splines are used when data is exact; approximating splines when shape design or noisy data is the goal." → Gate (P91)
- PARTIAL (knows interpolating vs. approximating but confuses B-spline control points with data points) → "A B-spline control polygon and the B-spline curve are two different objects. The curve is a smooth approximation to the polygon — it follows the polygon's shape without touching each vertex. Draw three control points forming a triangle. The B-spline curve will be a smooth curve bulging toward the middle vertex." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "A CAD engineer moves a 'control point' in software and the curve smoothly follows. Is this an interpolating or approximating spline? How do you know?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 MORE-SMOOTHNESS-ALWAYS-BETTER):**
Step 1 — "Higher smoothness requires higher degree and more equations. C⁰ piecewise-linear connects data with straight lines — fast, simple, robust, C⁰ error O(h²). C² natural cubic is beautiful but costs a global tridiagonal solve and requires at least 3 data points per piece to avoid under-determination. For rough engineering data, C⁰ or C¹ is often appropriate." Step 2 — Counter-example: you have 1000 noisy measurements and want to sketch a smooth trend. A C² natural cubic spline passes through every noisy point exactly — the curve wiggles as much as the noise. A C¹ or B-spline approximation would give a smoother, more meaningful trend. Step 3 — "Rule: choose the smoothness level that matches the application. Interpolation of exact data: C² natural cubic is standard. Noisy data or shape design: B-spline approximation. Piecewise-linear: sufficient for area calculations, numerical integration, or rendering where visual smoothness is unimportant."

**TB-R02 (MC-2 SPLINE-CONTROL-POINTS-ARE-INTERPOLATION-POINTS):**
Step 1 — "An interpolating spline passes through every data point. A B-spline or Bezier curve passes through its control points only at the two endpoints (in some conventions) and nowhere else in between. The interior control points PULL the curve toward them like gravity — the curve bends toward them without touching." Step 2 — Demonstration: draw three control points P₀=(0,0), P₁=(1,2), P₂=(2,0). The quadratic Bezier curve is B(t)=(1−t)²P₀+2t(1−t)P₁+t²P₂. At t=0: B=P₀; at t=1: B=P₂; at t=½: B=¼P₀+½P₁+¼P₂=(1,1)≠P₁. Step 3 — "When you move a control point in Bezier/B-spline CAD software, you are changing a WEIGHT in a weighted average, not moving a point on the curve. The actual curve point at parameter t is a weighted blend of nearby control points."

**TB-R03 (MC-3 PIECEWISE-LINEAR-IS-NOT-A-SPLINE):**
Step 1 — "Piecewise linear is the simplest spline: each piece is a polynomial of degree 1 (a line segment), and the pieces join with C⁰ continuity. The spline framework is general: degree-1 = piecewise linear (C⁰), degree-3 with C¹ and C² = cubic spline. The same interpolation conditions apply; only the polynomial degree changes." Step 2 — Equations for piecewise linear on n+1 points: n pieces × 2 coefficients = 2n unknowns. Conditions: 2n values (interpolation at both endpoints of each piece) = 2n equations. Exactly determined; C⁰ holds automatically because adjacent pieces share an endpoint. Step 3 — "Unifying view: a 'spline of degree k' is a piecewise degree-k polynomial with as many continuous derivatives as possible (degree k−1 at most). Degree 1 = C⁰ linear spline. Degree 3 = C² cubic spline (one lower than the polynomial degree). The spline framework unifies all cases."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Three data points: (0,0), (1,1), (2,0). (a) Construct the piecewise linear C⁰ spline. (b) Set up the conditions for a natural cubic spline (C² with S''(0)=S''(2)=0). List all equations and solve for the 8 coefficients (4 per piece).
2. A natural cubic spline is fit to n+1 uniformly spaced data from f(x)=e^x on [0,1]. If the error is O(h⁴), estimate how many points are needed to guarantee error < 10⁻⁸. Compare with a degree-10 global polynomial using equally spaced points.
3. A student uses a degree-15 Lagrange polynomial to interpolate Runge's function f(x)=1/(1+25x²) on 16 equally spaced points in [−1,1]. Describe what will happen near x=±1. Now explain how replacing the polynomial with a cubic spline resolves the problem.
4. In a CAD system, a designer moves a B-spline control point from (3,2) to (3,4). (a) Does the curve pass through (3,2) before the move? (b) Which portions of the curve change? (c) How does local support (the B-spline property that each control point influences only k+1 spans) compare to a global polynomial?

**P55 — Reflect & Consolidate:** "Cubic spline: n pieces × 4 coefficients, determined by 2n interpolation + 3(n−1) smoothness + 2 boundary = 4n conditions. Natural BC: S''=0 at ends. Avoids Runge phenomenon. B-spline: approximating (control polygon ≠ interpolation), local support, standard in CAD."

**P76 — Transfer Probe (Independence mode):**
A periodic spline satisfies S(x₀)=S(xₙ) and S'(x₀)=S'(xₙ) and S''(x₀)=S''(xₙ) (periodic boundary conditions). (a) How many boundary conditions does a periodic cubic spline have compared to a natural cubic spline? (b) Set up the system of equations for a periodic cubic spline on 4 equally spaced points in [0, 2π] fitted to f(x)=sin(x). (c) Solve numerically and plot the spline vs. sin(x). (d) Prove that the periodic cubic spline minimises ∫₀^{2π}[S''(x)]² among all periodic C² interpolants (hint: integration by parts).

**P55 — Reflect & Consolidate:** "Periodic splines replace the natural boundary conditions with periodicity constraints. The system remains tridiagonal (or circulant for periodic) and uniquely solvable. The minimisation property generalises: any natural/periodic cubic spline minimises the curvature integral — it is the 'smoothest' interpolant."

**P75 — Mastery Assessment:**
"You are fitting a flight-path altitude profile h(t) at 6 measured times (t₀,…,t₅). You know the aircraft's climb rate dh/dt at t₀ and t₅ (clamped conditions). (a) Set up the full 4n×4n linear system for the clamped cubic spline. (b) Identify the tridiagonal structure of the system and explain why it is efficient to solve. (c) Estimate the error if the true altitude profile is h(t)=100sin(t/50) and points are spaced 10 seconds apart. (d) A sensor glitch introduces noise at t₃. Should you use an interpolating spline or an approximating B-spline? Justify."

**P55 — Reflect & Consolidate:** "Real applications: clamped cubic splines for smooth paths with known endpoint derivatives; B-spline smoothing for noisy sensor data. The tridiagonal system is a key efficiency advantage of cubic splines — O(n) solver replaces O(n³) for a full system."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.splines complete
- Score 3/5 → REVIEW condition counting and Runge phenomenon; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.num.interpolation; reassign

**P78 — Completion:** Spline interpolation certified. Student constructs natural cubic splines by writing and counting conditions, explains Runge phenomenon avoidance, distinguishes interpolating from approximating splines, and applies splines to practical path-fitting problems.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Periodic spline boundary conditions; minimisation property via integration by parts
Skill tested: Modify condition count for periodicity; set up and solve the spline system; prove the energy-minimisation property

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
