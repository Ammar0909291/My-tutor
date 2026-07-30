# Blueprint: math.de.bifurcation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.bifurcation |
| name | Bifurcation Theory |
| Domain | math.de |
| Difficulty | research |
| Bloom level | analyze |
| Estimated hours | 9 |
| Mastery threshold | 0.65 |
| MAMR | 4/5 |
| Prerequisites | math.de.nonlinear-ode, math.de.stability-analysis |
| Cross-links | — |
| Unlocks | math.de.chaos |

## Component 1 — Learning Objective
The student analyses how the qualitative behaviour of a nonlinear ODE x' = fμ(x) changes as a parameter μ varies: identifies and classifies the four generic codimension-one local bifurcations (saddle-node, transcritical, pitchfork, Hopf); derives their normal forms and recognises the universal bifurcation diagrams (fold/cusp, pitchfork with/without symmetry breaking, Hopf amplitude equation); distinguishes supercritical from subcritical Hopf bifurcations by the sign of the first Lyapunov coefficient; sketches the bifurcation diagram (equilibria vs. μ, with stable/unstable branches) for scalar systems; and applies the implicit function theorem to explain why a bifurcation occurs when the Jacobian's eigenvalue crosses zero (or the imaginary axis for Hopf).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw three bifurcation diagrams side by side: (1) Saddle-node: a parabola x* vs. μ with two branches meeting at a fold point — upper branch solid (stable), lower branch dashed (unstable), labelled "two equilibria annihilate at μ=μ_c"; (2) Pitchfork: one stable branch for μ<0, splits into two stable branches + one unstable branch for μ>0, symmetric about x*=0; (3) Hopf: an equilibrium x*=0 solid for μ<0, dashed for μ>0, surrounded by a growing cylinder of closed orbits (limit cycle amplitude ∝ √(μ−μ_c)) for μ>μ_c; annotate: "As μ crosses a critical value, the number or stability of equilibria/cycles changes — this is a bifurcation")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | BIFURCATION-IS-JUST-STABILITY-CHANGE | Student thinks a bifurcation is only when an equilibrium changes from stable to unstable; misses that a bifurcation is a topological change in the phase portrait — including creation/destruction of equilibria (saddle-node) and birth of limit cycles (Hopf), not just a sign change in one eigenvalue | Type 5 — instruction-induced (stability analysis using Jacobian eigenvalues is taught first; students encounter "eigenvalue crosses zero → something changes" and conflate this with the full definition of bifurcation, missing that a change from stable spiral to unstable spiral without a new attractor emerging is just loss of stability, not itself a bifurcation in the strict topological sense) |
| MC-2 | NORMAL-FORM-IS-AN-APPROXIMATION | Student treats the bifurcation normal form (e.g., ẋ = μx − x³ for pitchfork) as an approximation valid only near the bifurcation point; doesn't understand that after a near-identity change of coordinates the normal form exactly captures ALL qualitative behaviour near the bifurcation up to topological equivalence — the normal form IS the system's local topology, not an approximation to it | Type 5 — instruction-induced (Taylor expansion is taught as an approximation; students see the normal form derived via Taylor expansion and infer it's approximate, when in fact the key theorem (Guckenheimer-Holmes) says there exists an exact smooth coordinate change making the system equal to the normal form to any desired order, with the error term qualitatively irrelevant near the bifurcation) |
| MC-3 | SUBCRITICAL-HOPF-HAS-NO-LIMIT-CYCLE | Student thinks a subcritical Hopf bifurcation never has a limit cycle because the small-amplitude cycle is unstable; misses that a subcritical Hopf often coexists with a LARGE-AMPLITUDE stable limit cycle created by a saddle-node bifurcation of cycles at a larger radius — the subcritical case is the source of dangerous hysteresis (the system jumps to the large attractor as μ crosses μ_c, and stays there when μ retreats below μ_c) | Type 1 — overgeneralisation (the supercritical Hopf is presented first as the "generic" case with a unique stable limit cycle growing from the bifurcation point; students carry forward "Hopf = one limit cycle born at bifurcation" and don't recognise the subcritical scenario, which requires knowing that the first Lyapunov coefficient's sign determines the entire global picture near the bifurcation) |

## Component 4 — Session TA Cap
**Cap = 11** (hrs = 9 → cap 11)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Saddle-node, transcritical, and pitchfork bifurcations:**

**Bifurcation definition:** A bifurcation of x'=fμ(x) at μ=μ_c occurs when the phase portrait changes qualitatively as μ passes through μ_c (number, type, or stability of equilibria/cycles changes). The Jacobian Dfμ(x*) must be non-hyperbolic (eigenvalue on the imaginary axis) at a bifurcation point.

**Saddle-node (fold) bifurcation — normal form:**
ẋ = μ − x²   (scalar example).
Equilibria: x* = ±√μ (exist only for μ≥0).
At μ=0: x*=0, f'(0)=0 (non-hyperbolic). For μ>0: two equilibria (+√μ stable, −√μ unstable). For μ<0: none. Two equilibria are created out of nothing as μ increases through 0.

**Transcritical bifurcation — normal form:**
ẋ = μx − x²   (fixed point x*=0 always exists).
Equilibria: x*=0 and x*=μ.
Stability: at x*=0, f'(0)=μ (stable μ<0, unstable μ>0). At x*=μ: stable for μ>0. The two equilibria exchange stability at μ=0.

**Pitchfork bifurcation (supercritical) — normal form:**
ẋ = μx − x³.
Equilibria: x*=0 always; x*=±√μ for μ>0.
At μ<0: x*=0 stable. At μ>0: x*=0 unstable, x*=±√μ stable. Symmetry x→−x is preserved — the pitchfork is forced by the Z₂ symmetry of x³.

**Subcritical pitchfork:**
ẋ = μx + x³.
Equilibria: x*=0 always; x*=±√(−μ) for μ<0.
At μ<0: x*=0 stable, x*=±√(−μ) unstable. At μ>0: x*=0 unstable, no other equilibria. The stable branches disappear before μ=0 — dangerous: the system jumps to a distant attractor at μ=0.

**Classification criterion:**
Assume fμ(x*)=0 and ∂f/∂x=0 at (μ_c, x*). Compute ∂²f/∂x² and ∂f/∂μ:
- If ∂f/∂μ ≠ 0 and ∂²f/∂x² ≠ 0: saddle-node.
- If ∂f/∂μ=0 but terms linear in both μ and x are present: transcritical.
- If odd symmetry f(x)=−f(−x): pitchfork.

**P49 checkpoint:**
- CORRECT → "Saddle-node: two equilibria collide and vanish. Transcritical: exchange of stability. Pitchfork (super): symmetric pair born from instability. Subcritical: pair destroyed before instability, causing jump." → A02
- PARTIAL (MC-1: defines bifurcation as only stability change) → "A bifurcation is a TOPOLOGICAL change in the phase portrait — not just a sign flip of one eigenvalue. The saddle-node bifurcation CREATES or DESTROYS equilibria: before μ=0 in ẋ=μ−x², there is NO equilibrium at all. After, there are TWO. Neither existed before. The Hopf bifurcation CREATES a limit cycle. These are qualitative changes in phase-portrait topology, not just stability." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Classify ẋ = μ − x² − 2x: rewrite as ẋ = (μ−2x) − x² (hint: find equilibria and check Jacobian at each). Equilibria: x* = (−2±√(4+4μ))/2 = −1 ± √(1+μ). At μ=−1: single equilibrium x*=−1, f'(x*)=−2+2x*+derivative=0 — this is a saddle-node. For μ>−1: two equilibria. For μ<−1: none." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Hopf bifurcation and normal form theory:**

**Hopf bifurcation (2D system):**
Consider ẋ = fμ(x), x∈ℝ², with an equilibrium x*=0 and Jacobian eigenvalues λ(μ) = α(μ) ± iβ(μ).
Hopf bifurcation at μ=0 if: (H1) α(0)=0, β(0)≠0 (eigenvalues on imaginary axis); (H2) dα/dμ|_{μ=0} ≠ 0 (eigenvalues cross transversally).
Result: a limit cycle is born at μ=0 with amplitude O(√|μ|).

**Supercritical vs. subcritical — first Lyapunov coefficient a₁:**
The normal form in polar coordinates near the Hopf bifurcation:
ṙ = α(μ)r + a₁r³ + O(r⁵),   θ̇ = β(μ) + O(r²).
- Supercritical (a₁ < 0): stable limit cycle at r=√(−α/a₁) emerges for μ>0 (where α>0). Equilibrium loses stability smoothly; limit cycle grows continuously from zero.
- Subcritical (a₁ > 0): UNSTABLE limit cycle for μ<0 (where α<0). At μ=0 it collapses into the equilibrium, which becomes unstable — the system jumps to a distant attractor. Dangerous: large sudden jump.

**Computing a₁ from the vector field:**
For ẋ = Ax + F(x,μ) where A has eigenvalues ±iβ, the first Lyapunov coefficient is:
a₁ = (1/16)[fˣˣˣ+fˣʸʸ+gˣˣʸ+gʸʸʸ] + (1/16β)[fˣʸ(fˣˣ+fʸʸ)−gˣʸ(gˣˣ+gʸʸ)−fˣˣgˣˣ+fʸʸgʸʸ].
(All derivatives at the bifurcation point.) Sign of a₁ determines super vs. subcritical.

**Van der Pol revisited:**
ẍ − μ(1−x²)ẋ + x = 0. Equilibrium at (0,0). Jacobian eigenvalues at μ=0: ±i (on imaginary axis), crossing rate dα/dμ = 1/2 > 0. First Lyapunov coefficient a₁ < 0 → supercritical Hopf → stable limit cycle born for μ>0. Amplitude ≈ 2 for large μ.

**Bifurcation diagram construction:**
For each μ, plot stable branches as solid curves, unstable as dashed. Mark fold points (saddle-node), exchange points (transcritical), and bifurcation points (pitchfork, Hopf). Arrows show direction of flow on each branch.

**P49 checkpoint:**
- CORRECT → "Hopf: eigenvalues α±iβ cross imaginary axis. a₁<0: supercritical (stable cycle). a₁>0: subcritical (dangerous jump). First Lyapunov coefficient from 3rd-order expansion of vector field." → Gate (P91)
- PARTIAL (MC-3: subcritical has no limit cycle) → "A subcritical Hopf does produce a limit cycle — it is UNSTABLE. For a₁>0, μ<0, there is an unstable limit cycle surrounding the stable equilibrium. It shrinks to zero amplitude as μ→0⁻ and the equilibrium becomes unstable at μ=0, with no nearby stable cycle to land on — hence the dangerous JUMP to a distant attractor. The coexistence of a large stable limit cycle (created by a global saddle-node of cycles) is what makes the subcritical case exhibit hysteresis: the jump up at μ=μ_c and the jump down at μ=μ_down < μ_c are at DIFFERENT parameter values." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "ẋ=μx−x³+y, ẏ=−y+x². Equilibrium near origin: approximately (0,0) for small μ. Jacobian at (0,0): [[μ,1],[0,−1]]. Eigenvalues λ=(μ−1)/2 ± √((μ+1)²/4). For μ=1: eigenvalues are 0 and −1 → saddle-node? No: at μ=1, x*=0 no longer — solve f=0: x=x³−μx from first equation, x(x²−μ)=y and from second: y=x². Thus x(x²−μ)=x² → x³−μx−x²=0, more complex. Demonstrate: classify the eigenvalue crossing for the uncoupled linear part instead." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Bifurcation = topological change: count equilibria, count limit cycles, check stability types on BOTH sides of μ_c. List what exists at μ<μ_c and at μ>μ_c. If the lists differ in NUMBER or TYPE — that is a bifurcation. A change in stability alone (node → spiral, or stable → unstable without new objects appearing) is NOT a bifurcation in the strict sense."
Step 2 — "Normal form is EXACT in coordinate: the Sternberg/Guckenheimer-Holmes theorem guarantees a smooth near-identity coordinate change h(x,μ) such that the transformed system IS the normal form to any desired order. The error terms (O(r⁵) or higher) are TOPOLOGICALLY irrelevant near the bifurcation: they don't create or destroy equilibria or cycles near (x*,μ_c). So 'normal form = approximation' is WRONG — it IS the local topology."
Step 3 — "Classification recipe: at a suspected bifurcation (fμ(x*)=0, ∂f/∂x(x*,μ_c)=0): compute the second derivative ∂²f/∂x² and cross-derivative ∂²f/∂x∂μ. If both nonzero: saddle-node. If ∂²f/∂x∂μ≠0 but ∂²f/∂x²=0 with a symmetry: pitchfork. This is not guessing — it follows from the Weierstrass preparation theorem applied to f at the degenerate point."

**TB-R02 (MC-3 SUBCRITICAL-HOPF):**
Step 1 — "The amplitude equation ṙ=αr+a₁r³ has equilibria at r=0 (the fixed point) and r²=−α/a₁. For a₁>0, r²=−α/a₁ > 0 requires α<0 (i.e., μ<μ_c). So for μ<μ_c there IS a limit cycle — it is UNSTABLE (check by differentiating: ∂/∂r(αr+a₁r³)=α+3a₁r²; at r=√(−α/a₁), this equals α+3a₁(−α/a₁)=α−3α=−2α>0 since α<0 — positive means unstable)."
Step 2 — "As μ→0⁻ (from below), this unstable limit cycle shrinks (r→0). At μ=0: the equilibrium becomes unstable and the limit cycle has zero radius — both merge, the equilibrium loses stability, and there is no nearby stable cycle. The system must jump to whatever distant attractor exists."
Step 3 — "Hysteresis: if you increase μ from μ<0, the system stays at the stable equilibrium until μ=μ_c (jump up to a large attractor). If you then decrease μ, the system stays on that large attractor until μ=μ_fold<μ_c where the large stable cycle is destroyed by a global saddle-node bifurcation of cycles. The jump down occurs at a DIFFERENT parameter value than the jump up — this is hysteresis, and it is the engineering danger of subcritical Hopf bifurcations."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Classify the bifurcation in ẋ = μx(1−x) − εx at x*=0: find μ_c, identify the bifurcation type, and sketch the bifurcation diagram for both ε=0 and ε small positive.
2. For the system ẋ = −y + μx − x(x²+y²), ẏ = x + μy − y(x²+y²): convert to polar coordinates, find the Hopf bifurcation value μ_c, determine the first Lyapunov coefficient, classify super/subcritical, and find the exact limit cycle amplitude for μ>μ_c.
3. The normal form for a subcritical pitchfork is ẋ = μx + x³ − x⁵. Sketch the bifurcation diagram showing: (a) all equilibria branches; (b) their stability; (c) the fold point (saddle-node of equilibria) at some μ_fold < 0; (d) the hysteresis loop if μ is swept up and then down.
4. Prove that the saddle-node bifurcation condition (fμ(x*,μ_c)=0, ∂f/∂x=0, ∂f/∂μ≠0, ∂²f/∂x²≠0) implies that near (x*,μ_c), the equilibrium locus is locally a parabola x≈x* + √(−2(∂f/∂μ/∂²f/∂x²)(μ−μ_c)).
5. The Lorenz system at r=1 (see chaos): ẋ=σ(y−x), ẏ=rx−y−xz, ż=xy−bz at r=1 has a pitchfork bifurcation at the origin. Find the two new equilibria C± that are born, and show they exist for r>1.

**P55 — Reflect & Consolidate:** "Bifurcation = topological phase-portrait change at a critical parameter. Four types: saddle-node (two equilibria collide), transcritical (stability exchange), pitchfork (symmetric pair born), Hopf (limit cycle born). Normal form captures local topology exactly. a₁<0 → supercritical Hopf (safe, gradual). a₁>0 → subcritical Hopf (dangerous, hysteresis). Bifurcation diagram: stable=solid, unstable=dashed, vs. parameter μ."

**P76 — Transfer Probe (Independence mode):**
(a) Codimension and unfolding: the codimension of a bifurcation is the number of parameters needed to unfold it generically. The cusp bifurcation (normal form ẋ = μ₁ + μ₂x − x³) is codimension 2 — it requires TWO parameters and organises the saddle-node curves in (μ₁,μ₂) parameter space into the famous cusp catastrophe. Explain why a single-parameter family generically encounters at most codimension-1 bifurcations, and how the cusp appears at the boundary of the region in parameter space where the saddle-node persists. (b) Global bifurcations: local bifurcations (saddle-node, Hopf) are determined by the vector field at one point. Global bifurcations involve large-scale changes — e.g., a homoclinic orbit (a trajectory that leaves and returns to the same saddle point). At a homoclinic bifurcation, a limit cycle is created or destroyed by collision with a saddle point. The period of the cycle → ∞ as the bifurcation is approached (the orbit must traverse the slow region near the saddle). Derive the period scaling T ∼ −1/λ_s ln(μ−μ_c) where λ_s is the saddle's stable eigenvalue. (c) Symmetry and equivariant bifurcation theory: if fμ is equivariant under a group action Γ (i.e., fμ(γx) = γfμ(x) for all γ∈Γ), then the bifurcation structure is constrained by representation theory. The pitchfork's symmetry group is Z₂={1,−1}. For the group O(2) (rotational symmetry), bifurcations in the fixed-point subspace can include steady-state (pitchfork) or Hopf branches, classified by the irreducible representations of O(2). Explain why the Hopf bifurcation in a rotationally symmetric system can produce either standing or rotating wave solutions.

**P75 — Mastery Assessment:**
"(a) Analyse ẋ = μ − x² + x³: find all equilibria for each μ, determine their stability, identify any bifurcations and classify them. What happens qualitatively at the bifurcation point(s)? (b) For the 2D system ẋ = μx − y − x(x²+y²)², ẏ = x + μy − y(x²+y²)²: show the equilibrium at the origin undergoes a Hopf bifurcation at μ=0. Compute the first Lyapunov coefficient (the dominant term from the amplitude equation in polar form) and classify super/subcritical. (c) A mechanical system ẍ + (x²−1)ẋ + μx = 0 is studied: write as a 2D system, find all equilibria for each μ, classify each, and identify any bifurcations as μ varies through positive values. (d) Explain, without computation, why a subcritical Hopf bifurcation in an engineering system (e.g., fluid flow past a wing at increasing speed) is more dangerous than a supercritical one. What does hysteresis mean physically, and why does it make safe operating boundaries difficult to determine experimentally?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the subcritical/supercritical distinction and the Lyapunov coefficient computation
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.nonlinear-ode; reassign

**P78 — Completion:** Bifurcation Theory certified. Student identifies the four codimension-1 bifurcations from normal forms and bifurcation diagrams; computes the first Lyapunov coefficient to distinguish supercritical from subcritical Hopf bifurcations; constructs bifurcation diagrams with correct stability information; explains hysteresis in subcritical bifurcations; and applies the implicit function theorem framework to justify why bifurcations require non-hyperbolic Jacobians.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Codimension-2 cusp catastrophe; global homoclinic bifurcations; equivariant bifurcation theory and symmetry groups
Skill tested: Connect local normal-form classification to global topology, parameter-space structure, and symmetry-constrained bifurcation patterns

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
