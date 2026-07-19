# Teaching Blueprint: Laplace's Equation (`math.de.laplace-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.laplace-equation` |
| name | Laplace's Equation |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.de.separation-of-variables-pde` |
| unlocks | none |
| cross_links | `math.cx.harmonic-functions` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — a steady-state temperature distribution on a rectangular plate, before the general equation |
| description (KG) | ∇²u = u_{xx}+u_{yy} = 0 (elliptic). Solutions are harmonic functions, satisfying the mean value property and maximum principle. Solved on disks/rectangles by separation; on complex domains by conformal mapping. |

## Component 1 — Learning Objectives

- LO1: State **Laplace's Equation**, $\nabla^2u = u_{xx}+u_{yy}=0$, and recognize it as `math.de.pde`'s own canonical **elliptic** example — a purely SPATIAL equilibrium condition with no time variable, describing a state that has already settled (e.g. the final, unchanging steady-state temperature distribution on a plate).
- LO2: Solve Laplace's Equation on a **rectangle** using the **separation of variables** technique already mastered (`math.de.separation-of-variables-pde`) — directly reapplying that technique's separation ansatz, eigenvalue problem, and Fourier-series-matching steps, with the only change being the specific PDE and boundary conditions involved.
- LO3: State, at an orientation level (per this corpus's established precedent for large-scope research/expert-tier concepts), the **mean value property** (a harmonic function's value at any point equals the average of its values on any circle centered there) and the **maximum principle** (a harmonic function on a bounded region attains its maximum and minimum on the BOUNDARY, never in the interior) — and recognize **conformal mapping** as the named technique for solving Laplace's Equation on more complex (non-rectangular, non-disk) domains, without deriving that technique here.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.separation-of-variables-pde` (the separation ansatz $u(x,t)=X(x)T(t)$, the resulting eigenvalue problem, and assembling the general solution via a Fourier series matching the boundary/initial data).

## Component 3 — Core Explanation

**Laplace's Equation as the elliptic case, revisited**: $\nabla^2u=u_{xx}+u_{yy}=0$ is precisely the canonical elliptic PDE already named in `math.de.pde`'s classification — a purely spatial balance condition, with NO time variable at all. Physically, this describes a system that has reached EQUILIBRIUM: the final, unchanging steady-state temperature distribution on a plate (once heat has stopped flowing), or an electrostatic potential in a charge-free region. A function $u$ satisfying $\nabla^2u=0$ is called **harmonic**.

**Solving on a rectangle via separation of variables — the same technique, a new equation**: Laplace's Equation on a rectangle can be solved using EXACTLY the separation-of-variables procedure already mastered: assume $u(x,y)=X(x)Y(y)$, substitute into $u_{xx}+u_{yy}=0$, and divide to isolate $x$-dependence from $y$-dependence, setting both sides equal to a separation constant. This produces two ODEs (one for $X$, one for $Y$), and the boundary conditions on $u$ translate into boundary conditions on $X$ or $Y$ separately — forming an eigenvalue/boundary-value problem for whichever variable carries the two HOMOGENEOUS (zero) boundary conditions, exactly paralleling the heat-equation derivation. The resulting eigenfunctions are then assembled into a Fourier-series-matched solution to fit the remaining (nonzero) boundary condition.

**The mean value property and maximum principle (orientation level)**: harmonic functions satisfy a striking structural property — the **mean value property**: the value of $u$ at any point equals the AVERAGE of $u$'s values on any circle centered at that point (and lying within the domain). A direct consequence is the **maximum principle**: a harmonic function on a bounded region cannot attain its maximum (or minimum) value at an INTERIOR point — the extreme values must occur on the region's BOUNDARY. (Intuitively: if an interior point's value were strictly greater than every value on some surrounding circle, it couldn't equal that circle's average, contradicting the mean value property.) For domains too complex for direct separation of variables (irregular shapes), **conformal mapping** — transforming the complex domain into a simpler one (like a disk) via a holomorphic map, solving there, then mapping the solution back — is the named technique used, though its full mechanics require complex analysis machinery beyond this concept's scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — recognizing the elliptic, equilibrium character)**: A thin rectangular metal plate has its four edges held at FIXED, unchanging temperatures (e.g. one edge at $100°$, the other three at $0°$), and enough time has passed for the interior temperature to stop changing. The steady-state temperature $u(x,y)$ satisfies Laplace's Equation $u_{xx}+u_{yy}=0$ — notice there is NO time variable $t$ anywhere in this equation, consistent with `math.de.pde`'s framing of elliptic equations as describing a state that has already settled, not a process still evolving.

**Example 2 (LO2 — separation of variables applied directly)**: Solve $u_{xx}+u_{yy}=0$ on the rectangle $0\le x\le\pi$, $0\le y\le1$, with $u(0,y)=u(\pi,y)=0$ (zero on the left/right edges) and $u(x,0)=0$, $u(x,1)=f(x)$ (zero on the bottom, a given profile $f(x)$ on top). Separating $u=X(x)Y(y)$: substitution gives $X''Y+XY''=0$, so $\frac{X''}{X}=-\frac{Y''}{Y}=-\lambda$. The TWO homogeneous boundary conditions ($u=0$ at $x=0,\pi$) apply to $X$: $X''+\lambda X=0$, $X(0)=X(\pi)=0$ — EXACTLY the same eigenvalue problem already solved in `math.de.separation-of-variables-pde`'s own worked example, giving $\lambda_n=n^2$, $X_n(x)=\sin(nx)$. The $Y$-equation becomes $Y''-n^2Y=0$ (note the sign, since it's $-\lambda$ on that side), with general solution $Y_n(y)=A_n\sinh(ny)+B_n\cosh(ny)$; the condition $Y(0)=0$ forces $B_n=0$, leaving $Y_n(y)=A_n\sinh(ny)$. The full solution is $u(x,y)=\sum_n c_n\sin(nx)\sinh(ny)$, with $c_n$ determined by matching $u(x,1)=\sum_n c_n\sin(nx)\sinh(n) = f(x)$ — a Fourier sine series exactly as before, with $c_n\sinh(n)$ playing the role of the usual Fourier coefficient.

**Example 3 (LO3 — the maximum principle, verified on a simple case)**: For the plate in Example 1 (edges held at $100°$ on one side, $0°$ on the other three), the maximum principle guarantees the STEADY-STATE interior temperature never exceeds $100°$ nor drops below $0°$ ANYWHERE inside the plate — the hottest and coldest points are necessarily on the boundary (where the temperatures were fixed), never somewhere in the middle exceeding what any edge was set to. This matches physical intuition (heat flowing from hot to cold regions cannot spontaneously create an interior "hot spot" hotter than the imposed boundary temperature) and is a direct, checkable consequence of the mean value property stated in Component 3.

## Component 5 — Teaching Actions

### Teaching Action A01 — Laplace's Equation as Settled Equilibrium (Primitive P11: Representation Shift)

Present Example 1's steady-state plate scenario, emphasizing the absence of a time variable. State: "this equation describes a situation that's already FINISHED changing — no $t$ appears anywhere, because there's nothing left to evolve. Compare this to the heat equation, which described the PROCESS of getting there."

### Teaching Action A02 — Separation of Variables, Same Technique, New Equation (Primitive P11: Representation Shift)

Work Example 2's full derivation, explicitly pointing out at each step where it matches `math.de.separation-of-variables-pde`'s own procedure (the eigenvalue problem for $X$ is IDENTICAL to that concept's own worked example) and where it differs (the $Y$-equation uses hyperbolic sine/cosine instead of the heat equation's exponential decay, since Laplace's Equation lacks the first-order time derivative that produced the decaying exponential there).

### Teaching Action A03 — The Maximum Principle: Interior Values Are Bounded by the Boundary (Primitive P06: Contrast Pair)

Present Example 3's direct physical consequence: no interior point of the plate can be hotter than $100°$ or colder than $0°$. State: "this isn't just a plausible-sounding physical fact — it's a mathematical guarantee, following directly from the mean value property: an interior 'hot spot' exceeding every surrounding circle's average is a contradiction in terms for a harmonic function."

- **MC-1 hook**: ask "could a harmonic function's steady-state solution have an interior point HOTTER than every boundary temperature?" — a "yes" answer reveals MC-1 (missing the maximum principle's guarantee that extreme values occur only on the boundary, never strictly inside).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why Laplace's Equation has no time variable, connecting this to the elliptic classification and the equilibrium/steady-state physical interpretation.
  2. Set up (following Example 2's structure) the separation of variables for $u_{xx}+u_{yy}=0$ on the rectangle $0\le x\le\pi$, $0\le y\le2$, with $u(0,y)=u(\pi,y)=0$ and $u(x,0)=0$, $u(x,2)=g(x)$ — identify the eigenvalue problem and its solution, reusing the already-known $X_n,\lambda_n$ from Example 2 where applicable.
  3. Using the maximum principle, explain what you can conclude about the interior values of a harmonic function on a disk if its boundary values are all between $-5$ and $5$.
  4. Explain, in your own words, what conformal mapping is used for in this context (solving Laplace's Equation), without needing to describe HOW it works mechanically.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.cx.harmonic-functions` is not yet authored; a future revision may add a genuine cross-link probe into the complex-analysis characterization of harmonic functions once that entry exists)**: "An electrical engineer models the steady-state electric potential $u(x,y)$ inside a rectangular region with no charges present, satisfying Laplace's Equation, with specified potentials on all four edges. (a) Explain why this is an appropriate application of Laplace's Equation, referencing the equilibrium/no-time-variable framing from Component 3. (b) Using the maximum principle, explain what the engineer can immediately conclude about the potential at any interior point, given only the RANGE of potentials specified on the boundary, without solving the full separation-of-variables problem. (c) If the region were instead an oddly-shaped, non-rectangular area, explain (at the level of naming the technique, not deriving it) what method the engineer would need to reach for instead of direct separation of variables."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INTERIOR-HARMONIC-VALUE-ASSUMED-UNBOUNDED-BY-BOUNDARY | Believing a harmonic function's interior values could exceed the range of its boundary values, missing the maximum principle's guarantee that extremes occur only on the boundary | Foundational |
| MC-2 | LAPLACE-SEPARATION-CONFUSED-WITH-HEAT-EQUATION-SEPARATION | Applying the heat equation's decaying-exponential time-solution form to Laplace's Equation, missing that Laplace's Equation has no time variable and the second spatial variable instead produces hyperbolic sine/cosine solutions | Foundational |
| MC-3 | HARMONIC-FUNCTION-ASSUMED-TO-REQUIRE-NO-BOUNDARY-DATA | Believing a harmonic function is fully determined by the equation $\nabla^2u=0$ alone, without recognizing that boundary conditions are still required to pin down a UNIQUE solution (just as with the heat/wave equations) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Interior-Harmonic-Value-Unbounded Assumption") → P41 (detect: ask whether an interior point's steady-state value could exceed every boundary value) → P64 (conceptual shift: re-walk Example 3's direct physical reasoning, re-anchoring on "the mean value property forces any interior value to equal a surrounding average — it can never exceed everything around it").
- **B02 (targets MC-2)**: P27 (name it: "Laplace-Heat Separation Confusion") → P41 (detect: ask a student to solve the $Y$-equation from Example 2's separation and check whether they produce a decaying exponential, as in the heat equation, rather than $\sinh/\cosh$) → P64 (conceptual shift: re-walk Example 2's explicit derivation of $Y''-n^2Y=0$, re-anchoring on "there's no first-order time derivative here to produce decay — the second spatial variable's equation is genuinely different in character from the heat equation's time equation").
- **B03 (targets MC-3)**: P27 (name it: "Harmonic-Function-Needs-No-Boundary-Data Assumption") → P41 (detect: ask whether $\nabla^2u=0$ alone, without any boundary conditions, determines a unique function $u$) → P64 (conceptual shift: re-anchor on "just like the heat and wave equations needed boundary/initial data to pin down ONE specific solution from the general family, Laplace's Equation needs boundary conditions too — the equation alone only narrows things down to the harmonic family, not one specific member of it").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.separation-of-variables-pde` (the separation ansatz, eigenvalue-problem derivation, and Fourier-series-matching procedure this concept directly reapplies to a new PDE).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists `math.cx.harmonic-functions` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.cx.harmonic-functions.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the complex-analysis characterization of harmonic functions (as real/imaginary parts of holomorphic functions) once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (equilibrium recognition), A02 (separation of variables reapplied), and A03 (mean value/maximum principle) each target a distinct LO, appropriate for a concept that largely reapplies an already-mastered technique to a new equation, plus new structural theory (orientation level) about harmonic functions.
- LO3 and its treatment of the mean value property, maximum principle, and conformal mapping deliberately use an **orientation-level treatment**, following this corpus's established precedent for large-scope research/expert-tier concepts (`math.cat.limits`, `math.nt.analytic-number-theory`, `math.fnal.banach-space`, `math.de.pde`) — this blueprint states these properties correctly and demonstrates the maximum principle's physical consequence, without deriving the mean value property from the divergence theorem or developing conformal mapping technique in depth (both genuinely belong to more specialized future concepts).
- Example 2 was deliberately constructed to reuse `math.de.separation-of-variables-pde`'s own eigenvalue problem ($X_n=\sin(nx)$, $\lambda_n=n^2$) verbatim wherever the boundary conditions match, isolating the ONE genuinely new piece of the derivation (the $Y$-equation's hyperbolic-function solution, since Laplace's Equation lacks a first-order time term) as the sole new content requiring attention.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.cx.harmonic-functions not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a steady-state plate scenario before the general equation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
