# Blueprint: math.de.nonlinear-ode

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.nonlinear-ode |
| name | Nonlinear ODEs |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 8 |
| Mastery threshold | 0.70 |
| MAMR | 4/5 |
| Prerequisites | math.de.first-order-ode, math.de.stability-analysis |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student analyses nonlinear autonomous ODEs and systems x' = f(x): identifies equilibria (fixed points) by solving f(x*)=0; linearises f around each equilibrium to obtain the Jacobian matrix J=Df(x*); classifies the local behaviour (stable/unstable node, saddle, stable/unstable spiral, centre) from the eigenvalues of J; sketches the phase portrait by combining local equilibrium analysis with the global flow; identifies common nonlinear phenomena including limit cycles (Poincaré-Bendixson theorem), nullclines, and the van der Pol and predator-prey (Lotka-Volterra) systems; and recognises the limitations of linearisation (e.g., Lyapunov stability vs. linearised stability for a centre).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a phase portrait for the pendulum x'=y, y'=−sin(x): mark equilibria at (0,0) (centre), (±π,0) (saddles); draw separatrices (heteroclinic orbits) from saddle to saddle; show oscillating orbits inside the separatrix (bounded pendulum swings) and rotating orbits outside (full rotations); annotate: "Nonlinear: equilibrium type changes with position. Near (0,0): looks like a centre. Far away: totally different behaviour")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LINEARISATION-ALWAYS-DETERMINES-NONLINEAR-BEHAVIOUR | Student believes the Jacobian eigenvalue classification always correctly describes the nonlinear system's behaviour near an equilibrium; doesn't know that a linearly-classified "centre" (purely imaginary eigenvalues) may be a stable or unstable spiral in the nonlinear system | Type 5 — instruction-induced (for nodes and saddles, linearisation is conclusive (Hartman-Grobman); for a centre, it is not — the nonlinear terms determine whether the orbit is actually closed, spiralling in, or spiralling out; this exceptional case is not always stressed, leaving students with the impression that linearisation is always reliable) |
| MC-2 | ALL-NONLINEAR-ODES-CANNOT-BE-SOLVED-EXACTLY | Student assumes that because the ODE is nonlinear, no exact solution exists; doesn't recognise that many nonlinear ODEs (separable, Bernoulli, exact, special substitutions) have exact solutions, and that qualitative analysis (phase portrait, equilibria) gives complete information without solving explicitly | Type 1 — overgeneralisation (linear ODEs have systematic exact-solution methods; students over-apply the lesson "nonlinear = hard = no exact solution" without recognising that the qualitative/geometrical approach to nonlinear systems is itself a complete methodology, not just an approximation) |
| MC-3 | EQUILIBRIUM-AT-ZERO-ONLY | Student looks only at x*=0 as an equilibrium; misses equilibria at other fixed points where f(x*)=0; may set f(x*)=0 only partially (e.g., checks only the first component of a 2D system) | Type 5 — instruction-induced (linear systems with constant coefficients have only one equilibrium at the origin; students transfer this uniqueness to nonlinear systems, which can have zero, one, or many equilibria depending on the shape of f) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Fixed points and linearisation:**

**Autonomous ODE system:** x' = f(x), x ∈ ℝⁿ.
**Equilibria:** x* s.t. f(x*)=0. At an equilibrium, the system stays forever.

**Linearisation at x*:** Set x=x*+u (small perturbation u):
x' = f(x*+u) ≈ f(x*) + Df(x*)u = Df(x*)u.
The linearised system is u' = Ju where J = Df(x*) is the Jacobian matrix.

**Eigenvalue classification (2×2 J):**
Let λ₁, λ₂ be eigenvalues of J.
| Type | Eigenvalue condition | Behaviour |
|------|---------------------|-----------|
| Stable node | λ₁, λ₂ < 0 (real) | Exponential approach to x* |
| Unstable node | λ₁, λ₂ > 0 (real) | Exponential departure |
| Saddle | λ₁ < 0 < λ₂ (real) | Approach along stable manifold, depart along unstable |
| Stable spiral | λ=α±βi, α<0 | Inward spiral |
| Unstable spiral | λ=α±βi, α>0 | Outward spiral |
| Centre (linear) | λ=±βi (imaginary) | Closed orbits (linear); nonlinear may differ |

**Worked example — pendulum (undamped):**
θ'' + sin(θ) = 0. System: x'=y, y'=−sin(x).
f(x,y)=(y,−sin(x)). f=0: y=0 and sin(x)=0 → x*=(nπ,0), n∈ℤ.
J = [[0,1],[−cos(x*),0]].
At x*=(0,0): J=[[0,1],[−1,0]] → λ=±i → Centre (linear). Nonlinear: actually a centre (energy conservation confirms closed orbits).
At x*=(π,0): J=[[0,1],[1,0]] → λ=±1 → Saddle.

**P49 checkpoint:**
- CORRECT → "Equilibria: solve f(x*)=0. Linearise: u'=Df(x*)u. Eigenvalues of J classify type. Centre needs extra analysis." → A02
- PARTIAL (MC-3: only found x*=(0,0)) → "For a nonlinear system, f(x*)=0 may have MULTIPLE solutions — one, many, or none other than the trivial x*=0. For the pendulum: sin(x*)=0 gives x*=nπ for ALL integers n — infinitely many equilibria. ALWAYS solve f(x*)=0 completely, not just check x*=0." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Lotka-Volterra: x'=x(a−by), y'=y(−c+dx). Equilibria: x(a−by)=0 and y(−c+dx)=0. (1) x=0,y=0: predator-prey extinction. (2) x=c/d,y=a/b: coexistence. Jacobian at (c/d,a/b): J=[[0,−bc/d],[da/b,0]] → λ=±i√(ac) → Centre (linear). For Lotka-Volterra: actually a nonlinear centre (integrals of motion)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Limit cycles and global behaviour:**

**Nullclines:**
x-nullcline: f₁(x,y)=0 (x'=0 — flow is vertical).
y-nullcline: f₂(x,y)=0 (y'=0 — flow is horizontal).
Equilibria = intersections of nullclines.

**Poincaré-Bendixson theorem (2D):**
If a trajectory remains in a bounded closed region D with no equilibria, it must approach a LIMIT CYCLE (a closed orbit that is not an equilibrium).
Corollary: chaos cannot occur in 2D autonomous systems — it requires ≥3 dimensions.

**Van der Pol oscillator:**
ẍ − μ(1−x²)ẋ + x = 0, μ>0.
For |x|<1: 1−x²>0, so the damping term is NEGATIVE (energy injected).
For |x|>1: 1−x²<0, so damping is positive (energy dissipated).
Result: the system settles onto a unique STABLE LIMIT CYCLE regardless of initial conditions (for μ>0).

**Lyapunov functions:**
A Lyapunov function V(x)>0 with V'(x)=∇V·f(x)≤0 everywhere near x* certifies stability.
If V'(x)<0 (not just ≤0): asymptotically stable.
Advantage: works where linearisation gives a centre (inconclusive).

**P49 checkpoint:**
- CORRECT → "Nullclines mark where x'=0 or y'=0. Poincaré-Bendixson: bounded region + no equilibria → limit cycle. Van der Pol: unique stable limit cycle. Lyapunov V>0, V'≤0 → stable." → Gate (P91)
- PARTIAL (MC-1: linearisation of centre is conclusive) → "A linear centre (purely imaginary eigenvalues) is INCONCLUSIVE for the nonlinear system. The centre may be: (1) a nonlinear centre (closed orbits — Lotka-Volterra), (2) a stable spiral (nonlinear terms cause energy dissipation), or (3) an unstable spiral. To resolve, you need either a conserved quantity (first integral) or a Lyapunov function. Linearisation alone cannot distinguish these three cases." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "x'=x(1−x²), equilibria at x*=0,±1. J=1−3x*²: at x*=0, J=1>0 unstable; at x*=1, J=−2<0 stable; at x*=−1, J=−2<0 stable. Phase line: flow away from 0, toward ±1. No limit cycle in 1D (no Poincaré-Bendixson needed — just sign of f)." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 + MC-3 combined):**
Step 1 — "Finding ALL equilibria: set EVERY component of f(x*)=0 simultaneously. For 2D: two equations, two unknowns. For 1D autonomous x'=f(x): plot f vs. x and mark where f crosses zero — each zero is an equilibrium."
Step 2 — "Nonlinear ODEs with exact solutions: separable, Bernoulli (v=y^{1−n}), exact (Mdx+Ndy=0 with ∂M/∂y=∂N/∂x), homogeneous (v=y/x), and others. 'Nonlinear' does not automatically mean 'no exact solution.'"
Step 3 — "Even without an exact formula: the phase portrait (nullclines + equilibrium analysis + Poincaré-Bendixson) gives a COMPLETE qualitative picture of all possible long-term behaviours: does the trajectory go to an equilibrium, a limit cycle, or escape to infinity? This is not approximate — for 2D, it's exhaustive."

**TB-R02 (MC-1 LINEARISATION CENTRE):**
Step 1 — "Hartman-Grobman theorem: near a HYPERBOLIC equilibrium (no eigenvalue has zero real part), the nonlinear system is TOPOLOGICALLY equivalent to its linearisation. Hyperbolic types (nodes, saddles, spirals) are reliably classified by J's eigenvalues."
Step 2 — "Non-hyperbolic case: purely imaginary eigenvalues (centre in the linear system). The nonlinear terms determine whether the orbit is truly closed, spiralling in, or spiralling out. EXAMPLE: ẋ=−y+x³, ẏ=x+y³ vs. ẋ=−y−x³, ẏ=x−y³. Both have J=[[0,−1],[1,0]] (centre). The first is an unstable spiral (energy grows as r⁴); the second is a stable spiral."
Step 3 — "Resolution for centres: (i) if the system has a conserved quantity H(x,y)=const (first integral), orbits are level curves of H → actual centre. (ii) Use a Lyapunov function: if V>0 and V'<0 near x*, then stable spiral (not a true centre). (iii) Poincaré map / numerical computation can decide empirically."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Find all equilibria and classify each for: ẋ=x(1−y), ẏ=y(x−2). (Lotka-Volterra variant. Check (0,0), (2,1).)
2. For the system ẋ=−y+x(1−x²−y²), ẏ=x+y(1−x²−y²): (a) show x*=0 is an unstable spiral; (b) convert to polar coordinates (r'=r(1−r²), θ'=1); (c) show r=1 is a stable limit cycle.
3. The van der Pol equation ẍ−0.1(1−x²)ẋ+x=0: write as a 2D system, find the unique equilibrium at (0,0), classify it, and explain qualitatively why a limit cycle must exist near r=2.
4. Show that V(x,y)=x²+y² is a Lyapunov function for the system ẋ=−x+xy², ẏ=−y+x²y at (0,0). Classify the stability.
5. The pendulum with damping: ẋ=y, ẏ=−sinx−0.5y. Find all equilibria in [−2π,2π]×ℝ, classify each, and describe the long-term behaviour of a pendulum released from x=0.8π, y=0.

**P55 — Reflect & Consolidate:** "Nonlinear system x'=f(x): equilibria at f(x*)=0. Jacobian J=Df(x*): eigenvalues classify (node/saddle/spiral). Centre: inconclusive — need Lyapunov or first integral. Nullclines: nullclines intersect at equilibria. Poincaré-Bendixson: bounded, no equilibria → limit cycle. Lyapunov: V>0, V'≤0 → stable."

**P76 — Transfer Probe (Independence mode):**
(a) Poincaré map: for a periodic orbit γ of period T, define a transverse cross-section Σ and the Poincaré return map P: Σ→Σ by P(x₀)=φ_T(x₀) (the first return to Σ after one full period). A limit cycle corresponds to a fixed point of P. The stability of the limit cycle is determined by the eigenvalue of DP at the fixed point (|λ|<1 stable, |λ|>1 unstable). Explain how this converts a question about periodic orbits of ODEs into a fixed-point problem for maps. (b) Index theory: the Poincaré-Hopf index theorem assigns an integer index to each equilibrium of a 2D vector field (stable/unstable node: +1, saddle: −1). For any closed curve C containing no equilibria, the sum of indices of all equilibria inside equals the winding number of f on C. Use this to show that a limit cycle must contain at least one equilibrium inside it, with total index +1. (c) Normal form theory: near a Hopf bifurcation (a pair of complex eigenvalues crossing the imaginary axis), the nonlinear system in polar form becomes ṙ=ar+br³+⋯, θ̇=ω+⋯. Show that a limit cycle exists at r=√(−a/b) when a/b<0 (supercritical Hopf: stable limit cycle emerges from a stable spiral becoming unstable).

**P75 — Mastery Assessment:**
"(a) Analyse the system: ẋ=x(3−x−2y), ẏ=y(2−x−y). Find all equilibria, classify each using the Jacobian, and sketch the phase portrait. Identify which equilibrium is the long-term attractor. (b) A 'pendulum in a bucket' model: ẋ=y, ẏ=sin(x)−0.1y (note the POSITIVE sin). Find the equilibria in [0,2π]×ℝ and classify. Explain the physical difference from the restoring-force pendulum. (c) Show that the Lotka-Volterra system ẋ=x(a−by), ẏ=y(−c+dx) (a,b,c,d>0) has a conserved quantity H(x,y)=dx−c ln x+by−a ln y. Verify dH/dt=0 on solutions. Conclude that the coexistence equilibrium is a nonlinear centre (level curves of H are closed orbits). (d) Construct a Lyapunov function V=x²+2y² for the system ẋ=−x+2y², ẏ=−y. Compute V' and determine whether the origin is stable, asymptotically stable, or unstable."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the linearisation-at-centre limitation and the Poincaré-Bendixson theorem application
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.stability-analysis; reassign

**P78 — Completion:** Nonlinear ODEs certified. Student finds all equilibria, linearises via the Jacobian, classifies equilibrium types from eigenvalues, recognises the centre case as inconclusive, identifies limit cycles via Poincaré-Bendixson, sketches phase portraits using nullclines, and constructs or verifies Lyapunov functions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Poincaré map and limit-cycle stability; index theory and winding numbers; Hopf bifurcation normal form
Skill tested: Connect phase-portrait analysis to deeper geometric theories of periodic orbits and bifurcations

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
