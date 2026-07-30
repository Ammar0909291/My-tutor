# Blueprint: math.num.stiff-ode

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.stiff-ode |
| name | Stiff ODEs and Implicit Methods |
| Domain | math.num |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 6 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.num.runge-kutta |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given an ODE system y'=f(t,y) with a wide spread of eigenvalues of the Jacobian ∂f/∂y, the student identifies the system as stiff by computing the stiffness ratio (|λ_max|/|λ_min| ≫ 1); explains why explicit methods (Euler, RK4) are forced to use h ≪ 1/|λ_max| for stability even when the physical solution is smooth on the slow timescale 1/|λ_min|; derives the stability function of implicit Euler (R(hλ)=1/(1−hλ)) and shows A-stability (left half-plane ⊂ stability region); contrasts L-stability (R(hλ)→0 as hλ→−∞) with A-stability; and identifies BDF (Backward Differentiation Formula) methods as the standard stiff solver class in MATLAB's `ode15s` and scipy's `solve_ivp`.

## Component 2 — CPA Entry Stage
**C — Concrete** (a car suspension must respond quickly to bumps (fast mode) but settle smoothly over minutes (slow mode); a driver who steers every millisecond to chase the fast oscillation is wasting effort — before any ODE formulation)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | STIFF-MEANS-HARD-TO-SOLVE | Student treats "stiff" as a synonym for "numerically difficult" or "ill-conditioned" — does not understand that stiffness is specifically about the ratio of timescales (fast-decaying transients vs. slow solution of interest) that forces explicit methods to use unnecessarily small steps | Type 3 — language contamination ("stiff" sounds like "rigid" or "hard"; the technical definition in terms of Jacobian eigenvalue ratios is counterintuitive because a stiff ODE can have a very smooth, slow solution that is easy to describe but requires tiny steps for explicit methods) |
| MC-2 | IMPLICIT-METHODS-MORE-ACCURATE | Student believes implicit methods (implicit Euler, BDF) are more accurate than explicit methods (RK4) because they are used for hard problems — does not recognise that A-stable implicit methods often have lower formal order and that their advantage is stability, not accuracy | Type 5 — instruction-induced (stiff solvers are recommended for hard problems; students infer that "recommended for hard problems" means "more accurate"; they do not distinguish stability from accuracy) |
| MC-3 | STIFFNESS-IS-A-PROPERTY-OF-THE-EQUATION | Student believes stiffness is an intrinsic property of the ODE regardless of the time interval, not recognising that an ODE can be stiff on [0, ε] (fast transient) and non-stiff on [ε, T] (slow smooth solution); the stiffness ratio changes as the solution evolves | Type 1 — overgeneralization (a textbook labels an ODE "stiff" or "non-stiff"; students conclude this is a fixed, global property; the eigenvalues of ∂f/∂y in fact depend on y(t) and change along the trajectory) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of stiffness:**

| Representation | Content |
|---|---|
| Physical | A chemical reaction network where one reaction has rate k₁=10⁶ s⁻¹ and another k₂=10⁻² s⁻¹: stiffness ratio ≈10⁸; explicit methods need h<2×10⁻⁶ s to be stable, even though the interesting dynamics occur over seconds |
| Mathematical | Jacobian J=∂f/∂y has eigenvalues λ₁,…,λₙ with Re(λᵢ)<0. Stiffness ratio: s = max|Re(λᵢ)| / min|Re(λᵢ)| ≫ 1. Explicit Euler stable: h < 2/max|Re(λᵢ)| |
| Stability diagram | Explicit Euler stable inside disk |1+hλ|<1 (radius 1, centred at −1). Implicit Euler stable in entire left half-plane (A-stable). BDF2 stable in a wedge-shaped region covering almost the entire left half-plane |
| Cost comparison | y'=−10⁶y−10⁻²z: explicit RK4 needs h<2.785/10⁶≈3×10⁻⁶; implicit BDF2 with h=0.01 (timestep matched to slow dynamics) uses 10⁶/0.01=10⁸ fewer steps |

**Stiffness criterion (formal):** A linear system y'=Ay is stiff if: (1) all eigenvalues have negative real part (stability), and (2) stiffness ratio s = max_j|Re(λⱼ)|/min_j|Re(λⱼ)| ≫ 1.

**Implicit Euler stability function:**
For y'=λy: yₙ₊₁=yₙ+hλyₙ₊₁ → yₙ₊₁=yₙ/(1−hλ). Amplification factor: R(hλ)=1/(1−hλ).
For Re(λ)<0: |R(hλ)|=1/|1−hλ|<1 for ALL h>0. A-stable.

**P49 checkpoint:**
- CORRECT → "Stiffness: large spread of Jacobian eigenvalues. Explicit Euler stability requires h<2/|λ_max|, which is tiny for stiff problems. Implicit Euler: A-stable (stable for all h>0 when Re(λ)<0)." → A02
- PARTIAL (understands stiffness ratio but not why it forces small steps) → "Explicit Euler amplification factor: R(hλ)=1+hλ. For stability: |1+hλ|<1. The stability REGION is inside the unit disk centred at −1. The fast eigenvalue λ_max has large |λ_max|, so h must satisfy h<2/|λ_max| — independent of whether you NEED accuracy on that timescale. Stiffness forces stability-driven, not accuracy-driven, step-size choice." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For y'=−1000y−0.001z, y(0)=1, z(0)=1, what is the stiffness ratio? What step size does explicit Euler require for stability? What step size would RK4 require? How does this compare with the 'slow' timescale 1/0.001=1000?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Stiff solver gallery:**

**Test problem (Robertson chemical kinetics):**
y₁'=−0.04y₁+10⁴y₂y₃
y₂'=0.04y₁−10⁴y₂y₃−3×10⁷y₂²
y₃'=3×10⁷y₂²

Stiffness ratio: ≈10¹⁰ to 10¹³ during integration. Explicit RK4 with h=10⁻¹³: requires ~10¹³ steps to reach t=10¹¹. Implicit BDF2 with adaptive h: ~300 steps total. Speed ratio: ≈3×10¹⁰.

**BDF methods (Backward Differentiation Formulae):**
BDF1 (implicit Euler): yₙ₊₁=yₙ+hf(tₙ₊₁,yₙ₊₁) — order 1, A-stable
BDF2: yₙ₊₁=(4yₙ−yₙ₋₁)/3+2h/3·f(tₙ₊₁,yₙ₊₁) — order 2, A(α)-stable (wedge)
BDF3: order 3, A(α)-stable
BDF4,5,6: higher order; stability regions shrink. BDF7+ are unstable (not used).

**L-stability vs. A-stability:**
A-stable: stability region contains the entire left half-plane (|R(hλ)|<1 for all Re(hλ)<0)
L-stable: additionally |R(hλ)|→0 as |hλ|→∞ (fast modes are completely damped — "L for dissipative")
Implicit Euler: L-stable. Trapezoidal rule (Crank-Nicolson): A-stable but NOT L-stable (|R(hλ)|→1 as hλ→−∞, so fast modes persist as high-frequency oscillations).

**Practical consequence:** Trapezoidal rule applied to a stiff ODE produces spurious oscillations as fast transients are not damped; implicit Euler eliminates them. For chemical kinetics and circuit simulation (where fast transients must die out): use L-stable methods (implicit Euler, BDF1, SDIRK).

**Pattern:** For stiff ODEs: implicit BDF or SDIRK methods. MATLAB `ode15s` (BDF2-5), scipy `solve_ivp(method='BDF')`, SUNDIALS CVODE. The inner linear solve (each implicit step requires solving J_Δy=−F) dominates runtime — Jacobian computation and LU factorisation account for most stiff-solver cost.

**P49 checkpoint:**
- CORRECT → "BDF methods: multistep, order 1-6, A(α)-stable, standard for stiff problems. L-stability: fast modes fully damped (implicit Euler). A-stability alone: trapezoidal rule can show spurious oscillations for stiff problems." → A03
- PARTIAL (understands stability region but not L-stability) → "The trapezoidal rule has amplification factor R(hλ)=(1+hλ/2)/(1−hλ/2). As hλ→−∞ (large negative, fast stiff eigenvalue): R→(−∞)/(+∞)→−1. So the fast mode oscillates between +1 and −1 amplitude — it never damps! This 'high-frequency ringing' is the symptom of A-stable-but-not-L-stable methods applied to stiff problems. L-stability (R→0) eliminates this." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Apply the trapezoidal rule to y'=−1000y, y(0)=1 with h=0.1 for three steps. Compute R(hλ)=(1+hλ/2)/(1−hλ/2) for hλ=−100. What happens to y₁,y₂,y₃?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Stiffness-as-synonym gate:**

**Gate question (MC-1):** "A student encounters a nonlinear ODE and an explicit solver that runs extremely slowly (taking millions of tiny steps). They say 'this ODE is stiff so it's hard to solve.' Is 'stiff' the right word, and if so, what precisely is hard?"

'Stiff' IS the right diagnosis if the ODE's Jacobian has eigenvalues of widely different magnitude with negative real parts. But "hard to solve" is misleading: the physical solution may be perfectly smooth and simple (slow dynamics only). What is hard is: (1) using an EXPLICIT method, which must track every fast transient even when the fast modes have already decayed; (2) the CURE is to switch to an implicit method, not to increase accuracy of the explicit method. A well-chosen implicit solver (BDF, SDIRK) typically solves the same problem with thousands of times fewer steps.

The true difficulty of the stiff ODE is the INNER LINEAR SOLVE at each step (J·Δy=−F, where J is the Jacobian). For large n, this dominates runtime. The ODE is not hard to solve analytically — it is hard to solve cheaply with explicit methods.

**P49 checkpoint:**
- CORRECT → "Stiff = wide Jacobian eigenvalue spread. The slow solution is simple; the fast transients have already decayed. Explicit methods are forced to track the fast modes. Implicit methods decouple stability from the fast timescale, but pay with a Jacobian solve each step." → Gate (P91)
- PARTIAL (correctly diagnoses stiffness but says implicit is always better) → "Implicit methods are better FOR STIFF problems. For non-stiff problems, the inner Jacobian solve (LU factorisation, O(n³) for dense J) is wasted cost that explicit methods avoid. scipy's `solve_ivp` starts with RK45 (explicit) and suggests BDF if it detects stiffness (millions of tiny steps). Choose the method based on the problem, not habit." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "The ODE y'=−y+sin(t) is NOT stiff (λ=−1). The ODE y'=−10⁶y+sin(t) IS stiff. In both cases, the solution for large t is close to sin(t). Why does the second ODE require a stiff solver even though both long-time solutions look the same?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-3 STIFFNESS-IS-A-PROPERTY-OF-THE-EQUATION):**
Step 1 — "The stiffness of a system depends on the Jacobian J(t)=∂f/∂y(t), evaluated at the current solution y(t). In a nonlinear system, y(t) changes with t, so J(t) changes — the stiffness ratio s(t)=max|Re(λᵢ(t))|/min|Re(λᵢ(t))| changes too. A problem can be extremely stiff during the initial transient (large |λ_max|) and non-stiff once the transient decays." Step 2 — Robertson kinetics example: y₂(t) (intermediate radical concentration) peaks briefly then decays. During the peak, J has an eigenvalue with |Re|≈3×10⁷; after the peak, all eigenvalues are small. A good adaptive stiff solver detects this and increases h automatically once the fast mode decays. Step 3 — "Practical implication: adaptive stiff solvers (MATLAB ode15s, scipy BDF with atol/rtol) monitor the Jacobian spectrum automatically. They take tiny steps during the stiff phase and large steps once the fast modes have decayed. The 'stiffness' seen by the solver therefore changes along the integration path."

**TB-R02 (MC-2 IMPLICIT-METHODS-MORE-ACCURATE):**
Step 1 — "Implicit Euler (BDF1) has global error O(h) — the same order as explicit Euler. BDF2 has global error O(h²) — the same as the trapezoidal rule. RK4 has global error O(h⁴). For the same h, RK4 is much more accurate than BDF2. For a non-stiff problem at tol=10⁻⁶, RK4 reaches the tolerance with h≈0.1, while BDF2 needs h≈0.001 (10× more steps)." Step 2 — "The advantage of implicit methods is NOT accuracy — it is stability. For a stiff problem, explicit RK4 needs h<3×10⁻⁷ (stability-driven), taking 10⁷ steps. BDF2 needs h≈0.01 (accuracy-driven, 1000 steps), each step requiring a Jacobian solve — but 1000 Jacobian solves still beats 10⁷ RK4 evaluations." Step 3 — "Rule: for non-stiff problems, use explicit RK45 (accurate and cheap). For stiff problems, use implicit BDF (few steps despite low formal order, because steps are stability-limited not accuracy-limited in explicit methods). Never use implicit methods for non-stiff problems — the inner solve wastes computation."

**TB-R03 (MC-1 STIFF-MEANS-HARD-TO-SOLVE):**
Step 1 — "Stiff ODEs are NOT hard to describe or understand. The Robertson problem's solution reaches equilibrium smoothly over 10¹¹ seconds — a biologically simple trajectory. What is 'hard' is telling an explicit solver to IGNORE the fast transient it cannot help but track. The cure is not a smarter explicit solver — it is an implicit solver that does not need to track the fast modes." Step 2 — Formal definition: y'=f(t,y) is stiff on [t₀,T] if the stiffness ratio s=max_j|Re(λⱼ(J))|/min_j|Re(λⱼ(J))| ≫ 1 along the solution, where all eigenvalues have negative real part (stable system). Step 3 — "Diagnostic: run the ODE with an explicit solver and observe the step size sequence. If the solver takes thousands of steps where the solution barely changes — that is stiffness. The solver is stability-limited, not accuracy-limited. Switch to a stiff solver (`method='BDF'` or `'Radau'`) and compare step counts."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. The ODE y'=−1000y+sin(t), y(0)=1. (a) What is the stiffness ratio? (b) What step size does explicit Euler require for stability? (c) Apply implicit Euler with h=0.1 for 5 steps (each step requires solving yₙ₊₁=yₙ+hf(tₙ₊₁,yₙ₊₁) → yₙ₊₁=yₙ+h(−1000yₙ₊₁+sin(tₙ₊₁)) → yₙ₊₁=(yₙ+h·sin(tₙ₊₁))/(1+1000h)). (d) After t=0.01 (10 time constants), the fast transient has decayed. Why can a stiff solver use h=0.1 for t>0.01 but not for t<0.001?
2. Compare the stability functions R(hλ) for explicit Euler, implicit Euler, and the trapezoidal rule. Evaluate each at hλ=−100. Which method damps the fast mode most? Which shows spurious oscillations?
3. A chemical kinetics system has 3 species and Jacobian eigenvalues −10⁶, −1000, −0.001. (a) What is the stiffness ratio? (b) What is the maximum h for RK4 stability? (c) BDF2 with h=0.01: how many total steps to t=100? How many for explicit RK4?
4. Identify which of the following ODEs are stiff: (a) y'=−y, y(0)=1 on [0,10]; (b) y'=[−10⁶ 0; 0 −1]y on [0,100]; (c) y'=y(1−y) on [0,20] (logistic equation); (d) the heat equation semi-discretised on a grid of 100 points (eigenvalues of the tridiagonal Laplacian matrix scale as −(100)²=−10⁴).

**P55 — Reflect & Consolidate:** "Stiff ODE: wide Jacobian eigenvalue spread. Explicit methods stability-limited: h<2/|λ_max|. Implicit Euler: A-stable. BDF methods: standard stiff solvers (ode15s, scipy BDF). L-stability: fast modes fully damped. Stiffness is local in time (eigenvalues change along trajectory)."

**P76 — Transfer Probe (Independence mode):**
Differential-algebraic equations (DAEs) of the form F(t,y,y')=0 (or M(t)y'=f(t,y) with singular mass matrix M) arise in constrained mechanical systems, electrical circuits, and chemical equilibria. (a) Show that the index-1 DAE y'=f(y,z), 0=g(y,z) can be interpreted as the stiffness limit of the ODE y'=f(y,z), εz'=g(y,z) as ε→0 (singular perturbation). (b) Explain why explicit methods cannot directly solve DAEs without regularisation. (c) MATLAB's `ode15s` and `ode23t` can solve index-1 and some index-2 DAEs via differentiation of the constraint g=0. What additional information (Jacobian structure, consistent initial conditions) is needed? (d) For a mechanical system with holonomic constraints q̈=f(q,q̇)−Jᵀλ, g(q)=0 (index-3), why do BDF methods fail at high index and what is the Baumgarte stabilisation fix?

**P55 — Reflect & Consolidate:** "DAEs are the limit of stiff ODEs as the fast timescale goes to zero. Index-1 DAEs are solvable by BDF with consistent initial conditions. Higher-index DAEs require index reduction (differentiate constraints) or stabilisation (Baumgarte). Understanding stiff ODEs is the prerequisite for DAE solvers — the eigenvalue at infinity replaces the fast eigenvalue of the stiff ODE."

**P75 — Mastery Assessment:**
"A battery model consists of a fast electrochemical reaction (timescale 10⁻⁶ s) coupled to a slow thermal dynamics (timescale 10² s). The coupled ODE has stiffness ratio 10⁸. (a) Why is explicit RK45 impractical for a 1-hour simulation? (b) BDF2 with tolerance 10⁻⁶: estimate the total number of steps needed (the fast transient lasts 10⁻⁴ s, then the thermal dynamics dominate). (c) Each BDF step requires solving a 100×100 Jacobian system. What fraction of total computation is the Jacobian solve vs. the function evaluation? (d) A student proposes splitting: integrate the fast electrochemical subsystem with an explicit method on tiny steps, and the thermal subsystem separately on large steps. What is operator splitting, and what accuracy order does Strang splitting achieve?"

**P55 — Reflect & Consolidate:** "Multi-timescale systems (battery, combustion, climate): implicit BDF for the full coupled system, or operator splitting to decouple fast and slow components. Splitting introduces a splitting error (Strang splitting is O(Δt²)), which must be balanced against the accuracy of each subsolver. The decision is driven by the Jacobian structure (dense vs. block-diagonal) and whether the coupling between fast and slow subsystems is strong or weak."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.stiff-ode complete
- Score 3/5 → REVIEW stiffness definition and stability function comparison; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.num.runge-kutta; reassign

**P78 — Completion:** Stiff ODEs certified. Student identifies stiffness via Jacobian eigenvalue spread, explains why explicit methods require stability-driven tiny steps, derives implicit Euler A-stability and BDF L-stability, and selects the appropriate solver class for stiff vs. non-stiff problems.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Differential-algebraic equations (DAEs); index theory; Baumgarte stabilisation
Skill tested: Derive DAEs as stiff ODE limit; explain index-1 solvability; identify failure modes for higher-index DAEs; connect to BDF solver requirements

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
