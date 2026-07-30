# Blueprint: math.de.wave-equation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.wave-equation |
| name | The Wave Equation |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 7 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.separation-of-variables-pde, math.de.fourier-series |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student solves the initial-boundary value problem for the wave equation uₜₜ = c² uₓₓ on [0,L] by separation of variables: derives the eigenvalue problem X''+λX=0 and the time ODE T''+c²λT=0 (giving sinusoidal time dependence), assembles the series solution u(x,t)=Σ[aₙcos(cλₙ^{1/2}t)+bₙsin(cλₙ^{1/2}t)]sin(nπx/L), applies BOTH initial conditions u(x,0)=f(x) and uₜ(x,0)=g(x) to determine the coefficients; derives d'Alembert's solution u(x,t)=½[f(x+ct)+f(x−ct)] for the unbounded domain problem; and interprets the solution physically: finite propagation speed c, standing waves (harmonics), and energy conservation.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw two diagrams: LEFT — a plucked string on [0,L] at t=0 (triangle shape), then its evolution at t=L/(4c), L/(2c), L/c — the shape travels, reflects, and reproduces; annotate "Finite propagation speed c, reflection at boundaries"; RIGHT — show the first three standing-wave modes on [0,L]: n=1 (fundamental), n=2 (first harmonic), n=3 (second harmonic); annotate "Nodes fixed at endpoints, antinodes oscillate")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ONE-INITIAL-CONDITION-FOR-WAVE | Student sets up the wave equation IBVP with only u(x,0)=f(x) (one IC) and forgets uₜ(x,0)=g(x) (initial velocity); gets an underdetermined system (two sets of Fourier coefficients for one equation) | Type 5 — instruction-induced (the heat equation requires only ONE initial condition u(x,0)=f(x); students carry this into the wave equation without noticing that the wave equation is SECOND-ORDER in t, requiring two ICs — analogous to needing both y(0) and y'(0) for a second-order ODE IVP) |
| MC-2 | TIME-OSCILLATION-FREQUENCY-EQUALS-EIGENVALUE | Student writes Tₙ(t)=Asin(λₙt)+Bcos(λₙt) (using λₙ as the frequency) instead of Tₙ(t)=A sin(cλₙ^{1/2}t)+B cos(cλₙ^{1/2}t); forgets that the time ODE is T''+c²λₙT=0, whose frequency is c√λₙ, not λₙ | Type 5 — instruction-induced (the ODE T''+c²λT=0 has angular frequency ωₙ=c√λₙ, which is c times the square root of the eigenvalue; students often write ωₙ=λₙ (confusing the eigenvalue with its square root) or ωₙ=cλₙ (using the eigenvalue linearly instead of its square root)) |
| MC-3 | DALEMBERT-APPLIES-INSIDE-BOUNDED-DOMAIN | Student applies d'Alembert's formula u=½[f(x+ct)+f(x−ct)] directly to the bounded [0,L] problem without the odd-extension or method of images correction; gets a solution that doesn't satisfy the BCs u(0,t)=u(L,t)=0 | Type 1 — overgeneralisation (d'Alembert's formula is derived for the unbounded line −∞<x<∞; on a finite interval, the formula only works if f is extended as a 2L-periodic ODD function; applying it naively to a bounded domain ignores reflections at the boundaries, violating the BCs) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Separation of variables for the wave equation:**

**IBVP:** uₜₜ = c² uₓₓ, 0<x<L, t>0; u(0,t)=u(L,t)=0; u(x,0)=f(x); uₜ(x,0)=g(x).

**Step 1 — Assume u=X(x)T(t):**
T''/c²T = X''/X = −λ.
→ X''+λX=0 (Dirichlet BCs) and T''+c²λT=0.

**Step 2 — Eigenfunctions of X:**
Xₙ(x) = sin(nπx/L), λₙ=(nπ/L)², n=1,2,3,…

**Step 3 — Time ODE:**
T''+c²λₙT=0 → Tₙ(t) = aₙcos(ωₙt) + bₙsin(ωₙt) where ωₙ=c√λₙ=cnπ/L.

**Step 4 — Superposition:**
u(x,t) = Σₙ₌₁^∞ [aₙcos(nπct/L) + bₙsin(nπct/L)]sin(nπx/L).

**Step 5 — Apply ICs:**
u(x,0) = Σaₙsin(nπx/L) = f(x) → aₙ = (2/L)∫₀ᴸ f(x)sin(nπx/L)dx.
uₜ(x,0) = Σbₙ(nπc/L)sin(nπx/L) = g(x) → bₙ = (2/(nπc))∫₀ᴸ g(x)sin(nπx/L)dx.

**Worked example — plucked string:**
f(x)=sin(πx/L), g(x)=0.
a₁=1, aₙ=0 for n≥2. b₁=0, bₙ=0 for n≥2.
u(x,t) = sin(πx/L)cos(πct/L). Standing wave: the string oscillates without translating.

**P49 checkpoint:**
- CORRECT → "Two ICs: aₙ from u(x,0)=f(x), bₙ from uₜ(x,0)=g(x). Time ODE: T''+c²λₙT=0 → Tₙ=aₙcos(ωₙt)+bₙsin(ωₙt), ωₙ=cnπ/L." → A02
- PARTIAL (MC-1: only one IC used) → "The wave equation uₜₜ=c²uₓₓ is SECOND-ORDER in t. Just like a second-order ODE y''=fy needs BOTH y(0) and y'(0) to pin down its solution, the wave IBVP needs BOTH u(x,0)=f(x) AND uₜ(x,0)=g(x). The aₙ coefficients come from f, the bₙ coefficients from g. Without g, the bₙ are undetermined — you have half the solution." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "uₜₜ=4uₓₓ, [0,π], u=0 at ends, u(x,0)=sin(x), uₜ(x,0)=2sin(2x). c=2, ωₙ=2n. a₁=1 (from u(x,0)=sin x), aₙ=0 else. From uₜ(x,0)=2sin2x: Σbₙ(2n)sin(nx)=2sin2x → b₂·4=2 → b₂=1/2, others 0. u=sin(x)cos(2t)+(1/2)sin(2x)sin(4t)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**D'Alembert's solution and energy:**

**D'Alembert's formula (infinite domain, −∞<x<∞):**
uₜₜ = c²uₓₓ, u(x,0)=f(x), uₜ(x,0)=g(x).
General solution: u(x,t) = φ(x+ct) + ψ(x−ct) (two travelling waves in opposite directions).
With ICs: u(x,t) = ½[f(x+ct)+f(x−ct)] + (1/(2c))∫_{x−ct}^{x+ct} g(s)ds.

**Domain of dependence:** u(x₀,t₀) depends only on f and g in [x₀−ct₀, x₀+ct₀]. Signals travel at speed ≤ c — FINITE propagation speed. Contrast with heat equation (infinite speed).

**For bounded domain [0,L]:** use d'Alembert with the ODD 2L-periodic extension F of f. Then u(x,t)=½[F(x+ct)+F(x−ct)] matches the BCs by the odd-periodicity.

**Energy conservation:**
E(t) = (1/2)∫₀ᴸ [uₜ² + c²uₓ²] dx (kinetic + potential).
Using integration by parts and the wave equation: dE/dt = 0.
E is constant — the wave equation conserves energy (contrast with heat equation where E(t) decreases).

**Standing waves as superposition of travelling waves:**
sin(nπx/L)cos(nπct/L) = ½[sin(nπ(x+ct)/L) + sin(nπ(x−ct)/L)].
A standing wave IS a superposition of two equal-amplitude waves travelling in opposite directions.

**P49 checkpoint:**
- CORRECT → "D'Alembert: u=½[f(x+ct)+f(x−ct)]+1/(2c)∫g for ℝ; odd-extension for [0,L]. Finite speed c = domain of dependence. Energy conserved. Standing wave = superposition of two travelling waves." → Gate (P91)
- PARTIAL (MC-3: applied d'Alembert without odd extension) → "D'Alembert's formula ONLY applies directly on the infinite domain ℝ. On [0,L] with u(0,t)=0, you need to EXTEND f to all of ℝ as an ODD function (so F(x)=−F(−x)) and make it 2L-periodic. Then u(x,t)=½[F(x+ct)+F(x−ct)]. Without this step, the formula gives a function that does NOT vanish at x=0 and x=L, violating the BCs." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "uₜₜ=uₓₓ on ℝ, u(x,0)=e^{−x²}, uₜ(x,0)=0. D'Alembert: u=½[e^{−(x+t)²}+e^{−(x−t)²}]. At t=1, x=3: u(3,1)=½[e^{−16}+e^{−4}]≈½e^{−4}≈0.0092. Interpretation: the Gaussian splits into two equal-amplitude Gaussian pulses moving left and right." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Why two ICs? The wave equation is uₜₜ=c²uₓₓ — second derivative in time. Integrating once in t gives uₜ, integrating again gives u. Each integration introduces one arbitrary function of x. To pin down BOTH, you need u(x,0)=f(x) AND uₜ(x,0)=g(x)."
Step 2 — "Time ODE: T''+c²λₙT=0. Rewrite: T''=−c²λₙT. This is SHM with angular frequency ωₙ=c√λₙ (NOT λₙ). Solution: Tₙ=aₙcos(ωₙt)+bₙsin(ωₙt) where ωₙ=c·nπ/L (for eigenvalues λₙ=(nπ/L)²)."
Step 3 — "Coefficient extraction: (i) Set t=0: u(x,0)=Σaₙsin(nπx/L)=f(x) → aₙ=(2/L)∫f·sin. (ii) Differentiate in t and set t=0: uₜ(x,0)=Σbₙωₙsin(nπx/L)=g(x) → bₙ=(2/L)∫g·sin, DIVIDED by ωₙ=cnπ/L."

**TB-R02 (MC-3 DALEMBERT-BOUNDED):**
Step 1 — "D'Alembert works on ℝ because the characteristics x±ct reach any point. On [0,L], the characteristic from x₀ at t=0 'bounces' off the boundary — this reflection is not captured by the simple formula without extension."
Step 2 — "Odd extension: define F(x) for x∈[−L,L] as F(x)=f(x) for x≥0 and F(x)=−f(−x) for x<0. Extend periodically with period 2L. Then F(0)=0 and F(nL)=0 automatically, so u(0,t)=½[F(ct)+F(−ct)]=0 (since F is odd)."
Step 3 — "Equivalence: the d'Alembert formula with odd-periodic extension F produces exactly the same answer as the Fourier sine series solution Σaₙsin(nπx/L)cos(nπct/L) (when g=0). Both methods are correct on [0,L]; the d'Alembert form is more explicit for tracking how wave fronts travel and reflect."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: uₜₜ = 9uₓₓ, 0<x<π, u(0,t)=u(π,t)=0, u(x,0)=sin(x)+sin(2x)/4, uₜ(x,0)=0.
2. Solve: uₜₜ = uₓₓ, 0<x<1, u(0,t)=u(1,t)=0, u(x,0)=0, uₜ(x,0)=sin(πx). (Only bₙ are nonzero.)
3. Use d'Alembert's formula for the IVP uₜₜ=c²uₓₓ on ℝ with u(x,0)=f(x)=e^{−|x|} and uₜ(x,0)=0. Find u(0,t) for t>0 and show it equals [e^{−ct}+e^{−ct}]/2=e^{−ct}.
4. Show that the standing wave u(x,t)=sin(nπx/L)cos(nπct/L) can be written as the sum of two equal-amplitude travelling waves. Identify the speed and direction of each.
5. Verify that the energy E(t)=½∫₀^π[uₜ²+uₓ²]dx is conserved for the solution to Problem 1.

**P55 — Reflect & Consolidate:** "Wave equation uₜₜ=c²uₓₓ: separation → X''+λX=0 + T''+c²λT=0. Two ICs: aₙ from u(x,0), bₙ from uₜ(x,0)/ωₙ. D'Alembert on ℝ: u=½[f(x+ct)+f(x−ct)]+1/(2c)∫g. Bounded: use odd 2L-periodic extension. Energy conserved. Standing wave = sum of two travelling waves."

**P76 — Transfer Probe (Independence mode):**
(a) Non-dispersive vs. dispersive waves: the wave equation uₜₜ=c²uₓₓ is non-dispersive — all frequencies travel at the same speed c. A dispersive wave equation is uₜₜ=c²uₓₓ−αuₓₓₓₓ (beam equation), where different frequencies travel at different speeds. Show that for a solution eⁱ⁽ᵏˣ⁻ωᵗ⁾ to satisfy each equation, the dispersion relation is ω=ck (non-dispersive) and ω²=c²k²+αk⁴ (dispersive), and that the GROUP velocity v_g=dω/dk differs from the phase velocity v_p=ω/k for the dispersive case. (b) Reflection and transmission: consider a wave equation with a discontinuity in wave speed at x=0: c=c₁ for x<0 and c=c₂ for x>0. A wave e^{i(k₁x−ωt)} from x<0 hits the interface and produces a reflected and transmitted wave. Use continuity of u and uₓ at x=0 to derive the reflection coefficient R=(c₁−c₂)/(c₁+c₂) and transmission coefficient T=2c₁/(c₁+c₂). Show that energy is conserved: R²+T²·(c₂/c₁)=1. (c) Wave equation in higher dimensions: the 3D wave equation uₜₜ=c²∇²u has Kirchhoff's formula u(x,t)=(1/(4πc²t))∫_{|y−x|=ct}[g(y)+f(y)/∂t + something]dS as its general solution (Huygens principle in 3D). Explain why in 3D, a compact initial disturbance produces a sharp wave front (Huygens' principle holds), while in 2D it does not (the tail effect: "Hadamard's method of descent").

**P75 — Mastery Assessment:**
"(a) Solve uₜₜ=4uₓₓ on [0,2] with u(0,t)=u(2,t)=0, u(x,0)=x(2−x), uₜ(x,0)=1. Compute the first three terms of the solution explicitly. (b) A guitar string of length L=0.65 m with wave speed c=300 m/s. What is the fundamental frequency (in Hz)? What are the first three harmonic frequencies? Compare with the equal-temperament A4=440 Hz. (c) Show by direct substitution that u(x,t)=F(x+ct)+G(x−ct) (for arbitrary twice-differentiable F, G) is the GENERAL solution of uₜₜ=c²uₓₓ on ℝ. Show that the d'Alembert formula is a specific choice of F and G determined by the ICs. (d) The dispersive Schrödinger equation iu_t = −u_{xx} (in dimensionless form): find a plane-wave solution eⁱ⁽ᵏˣ⁻ωᵗ⁾ and determine the dispersion relation. Is this equation dispersive? Why does the quantum wave function's modulus |u|² satisfy a conservation law, while the equation itself is not a real-valued wave equation?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the two-initial-condition requirement and d'Alembert's odd-extension for bounded domains
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.separation-of-variables-pde or math.de.fourier-series; reassign

**P78 — Completion:** The Wave Equation certified. Student separates variables with both ICs, correctly identifies ωₙ=cnπ/L as the oscillation frequency, derives d'Alembert's formula, applies the odd-extension correctly for bounded domains, verifies energy conservation, and interprets standing waves as superpositions of travelling waves.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Dispersion relations and dispersive vs. non-dispersive waves; reflection and transmission; Kirchhoff's formula and Huygens' principle
Skill tested: Place the wave equation in the broader context of wave physics, including dispersion, multi-D wave behaviour, and energy transport

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
