# Teaching Blueprint: Poisson's Equation (`math.de.poisson-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.poisson-equation` |
| name | Poisson's Equation |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.laplace-equation` |
| unlocks | none |
| cross_links | `math.de.greens-function` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the already-known steady-state plate scenario, now with a heat source added |
| description (KG) | ∇²u = f; the nonhomogeneous version of Laplace's equation. Arises in electrostatics (Poisson's equation for potential), Newtonian gravity. Solved by Green's functions when f is a source term. |

## Component 1 — Learning Objectives

- LO1: State **Poisson's Equation** $\nabla^2u=f$ as the NONHOMOGENEOUS generalization of `math.de.laplace-equation` (the special case $f\equiv0$), and recognize that Laplace's Equation's special properties relying on $f\equiv0$ (the mean value property, the maximum principle) do NOT automatically carry over unchanged to the nonhomogeneous case.
- LO2: Apply Poisson's Equation to a physical modeling context — electrostatics, where $\nabla^2V=-\rho/\varepsilon_0$ relates the electric potential $V$ to a charge density $\rho$ — correctly identifying which physical quantity plays the role of $f$, and interpreting $f=0$ (Laplace's Equation) as describing a charge-FREE region.
- LO3 (orientation level — full treatment deferred to the unlocked cross-link): recognize **Green's functions** as the named technique for solving Poisson's Equation when $f$ is a genuine source term — finding the response to a single point-source, then superposing over the actual source distribution — deferred to `math.de.greens-function`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.laplace-equation` ($\nabla^2u=u_{xx}+u_{yy}=0$, the steady-state/equilibrium framing, the mean value property, and the maximum principle).

## Component 3 — Core Explanation

**Poisson's Equation as the nonhomogeneous generalization**: $\nabla^2u=f$ is Laplace's Equation with a SOURCE term $f$ added to the right-hand side — Laplace's Equation is exactly the special case $f\equiv0$. This single change has significant consequences: Laplace's Equation's special properties (the mean value property — a harmonic function's value equals the average of surrounding values; the maximum principle — extrema only on the boundary) are consequences SPECIFIC to the homogeneous case, and do not automatically extend unchanged once a nonzero source $f$ is present.

**A physical source of the equation — electrostatics**: the electrostatic potential $V$ satisfies $\nabla^2V=-\rho/\varepsilon_0$, where $\rho$ is the charge density. In a region with NO charge ($\rho=0$), this reduces EXACTLY to Laplace's Equation $\nabla^2V=0$ — meaning `math.de.laplace-equation`'s entire solution machinery (separation of variables, mean value property, maximum principle) applies validly only in charge-FREE regions. Wherever actual charge is present ($\rho\ne0$), the full nonhomogeneous Poisson equation must be solved instead, and none of Laplace's special properties can be assumed to hold there without separate justification.

**Green's functions — solving via a point-source response (orientation level)**: Green's function methods solve Poisson's Equation by first finding the response to a single idealized POINT source (a Green's function $G$, satisfying $\nabla^2G=\delta$, the Dirac delta), then building the solution for an ARBITRARY source distribution $f$ by superposing (integrating) many such point-source responses, each weighted by $f$'s own value at that point. Full development of this technique is the dedicated subject of `math.de.greens-function`.

## Component 4 — Worked Examples

**Example 1 (LO1 — the mean value property genuinely fails for Poisson solutions, breaking MC-1)**: let $u=x^2$, so $\nabla^2u=u_{xx}+u_{yy}=2+0=2$ — a Poisson-equation solution with constant source $f=2$. Check the mean value property at the origin over a circle of radius $r$: $u(r\cos\theta,r\sin\theta)=r^2\cos^2\theta$, whose average over $\theta\in[0,2\pi]$ is $r^2\cdot\frac12=\frac{r^2}2$. But $u(0,0)=0^2=0$. Since $\frac{r^2}2\ne0$ for $r>0$, the mean value property FAILS for this Poisson solution — directly demonstrating that `math.de.harmonic-functions`'s mean value property is a SPECIAL feature of the homogeneous $f=0$ case, not something automatically inherited whenever $\nabla^2u$ is merely computed for some function.

**Example 2 (LO2 — electrostatics, Poisson reducing to Laplace in charge-free regions, breaking MC-2)**: the electrostatic potential satisfies $\nabla^2V=-\rho/\varepsilon_0$. In the empty space between two charged plates (a charge-free region, $\rho=0$), this reduces EXACTLY to $\nabla^2V=0$ — Laplace's Equation — meaning every technique `math.de.laplace-equation` developed (separation of variables, the mean value property) applies validly there. But at the plates themselves, or anywhere charge genuinely exists ($\rho\ne0$), the FULL nonhomogeneous equation must be solved, and (per Example 1) none of Laplace's special properties can be assumed to hold at those points.

**Example 3 (LO3, orientation level — Green's function point-source-then-superpose strategy)**: to solve $\nabla^2u=f$ for an arbitrary source distribution $f$, the Green's function approach first solves the SIMPLER problem $\nabla^2G=\delta$ (the response to a single idealized point source at one location), then builds the full solution by superposing (integrating) copies of $G$, each shifted to a different point and weighted by $f$'s actual value there — a strategy fully developed in `math.de.greens-function`, previewed here only as the general "point-source-then-superpose" idea.

## Component 5 — Teaching Actions

### Teaching Action A01 — Laplace's Special Properties Do Not Automatically Extend (Primitive P11: Representation Shift)

State: "Poisson's Equation looks like Laplace's Equation with one extra term — but that one term is exactly what breaks the special properties (mean value, maximum principle) that made Laplace's Equation so structured." Work Example 1's direct numerical failure of the mean value property.

- **MC-1 hook**: ask "does the mean value property (or the maximum principle) automatically hold for any function satisfying Poisson's Equation, the same way it holds for harmonic functions?" — a "yes" answer reveals MC-1 (assuming Laplace's special properties transfer unchanged to the nonhomogeneous case).

### Teaching Action A02 — Poisson's Equation Contains Laplace's Equation as a Special Case (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the electrostatic potential equation reduces EXACTLY to Laplace's Equation the moment $\rho=0$ — not a separate, unrelated equation, but the SAME equation with its source term set to zero. State: "Laplace's Equation isn't a different topic from Poisson's Equation — it's the special case where the source vanishes."

- **MC-2 hook**: ask "are Poisson's Equation and Laplace's Equation essentially unrelated equations requiring completely separate theory?" — a "yes" answer reveals MC-2 (missing that Laplace's Equation is the direct special case $f\equiv0$ of Poisson's Equation).

### Teaching Action A03 — Green's Functions Solve by Point-Source, Then Superpose (Primitive P06: Contrast Pair)

Contrast `math.de.laplace-equation`'s separation-of-variables strategy (directly solving the full boundary-value problem at once) against Example 3's Green's-function strategy (solve the simplest possible point-source case first, then combine many such solutions to handle an arbitrary source). State: "Green's functions aren't a shortcut notation — they represent a genuinely different STRATEGY: solve the simplest version once, then build up the general answer by superposition."

- **MC-3 hook**: ask "are Green's functions just a convenient way to write down the answer to Poisson's Equation, rather than representing a distinct solution strategy?" — a "yes" answer reveals MC-3 (missing the specific point-source-then-superpose strategy Green's functions represent).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State Poisson's Equation and explain, in one sentence, how it differs from Laplace's Equation.
  2. For $u=y^2$ satisfying $\nabla^2u=f$, compute $f$ directly, and check whether $u$ satisfies the mean value property at the origin over a circle of radius $r$ (compute the average and compare to $u(0,0)$).
  3. In the electrostatic potential equation $\nabla^2V=-\rho/\varepsilon_0$, explain what the equation reduces to in a charge-free region, and name which equation this matches.
  4. Explain, in general terms, why Green's functions solve Poisson's Equation by first considering a single point source, referencing the superposition idea from this lesson.
- **P76 (Transfer Probe, mode = independence)**: "A gravitational potential $\Phi$ in Newtonian gravity satisfies Poisson's Equation $\nabla^2\Phi=4\pi G\rho$, where $\rho$ is mass density and $G$ is the gravitational constant. (a) Explain what this equation reduces to in the empty vacuum of space, far from any mass ($\rho=0$), and name the resulting equation. (b) A student assumes that because the gravitational potential equation 'looks like' Laplace's Equation, it must satisfy the same mean value property everywhere $\rho$ is nonzero. Using this lesson's electrostatics-style reasoning and Example 1's counterexample, explain why this assumption is incorrect. (c) Explain, in general terms, how a Green's-function approach would build the solution for an arbitrary mass distribution $\rho$ from the response to a single point mass."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAPLACE-PROPERTIES-ASSUMED-TO-EXTEND | Believing Laplace's Equation's special properties (mean value property, maximum principle) automatically extend unchanged to Poisson's Equation, missing that these are consequences specific to the homogeneous $f\equiv0$ case | Foundational |
| MC-2 | POISSON-AND-LAPLACE-ASSUMED-UNRELATED | Believing Poisson's Equation and Laplace's Equation require entirely separate, unrelated theory, missing that Laplace's Equation is the direct special case $f\equiv0$ of Poisson's Equation | High |
| MC-3 | GREENS-FUNCTIONS-ASSUMED-MERELY-NOTATIONAL | Believing Green's functions are just a convenient notation for writing the answer, missing the specific point-source-then-superpose STRATEGY they represent, genuinely different from separation of variables | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Laplace Properties Assumed to Extend") → P41 (detect: ask whether the mean value property automatically holds for any Poisson-equation solution) → P64 (conceptual shift: re-walk Example 1's direct numerical counterexample, re-anchoring on "these properties are special to the homogeneous case — they genuinely fail once a source term is present").
- **B02 (targets MC-2)**: P27 (name it: "Poisson and Laplace Assumed Unrelated") → P41 (detect: ask whether Poisson's Equation and Laplace's Equation require completely separate theory) → P64 (conceptual shift: re-walk Example 2's charge-free reduction, re-anchoring on "Laplace's Equation is the special case where Poisson's source term vanishes").
- **B03 (targets MC-3)**: P27 (name it: "Green's Functions Assumed Merely Notational") → P41 (detect: ask whether Green's functions are just a convenient way to write the answer) → P64 (conceptual shift: re-walk Example 3's point-source-then-superpose framing, re-anchoring on "this is a genuinely distinct solution strategy, not a notational shortcut").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.laplace-equation` (the equation $\nabla^2u=0$, its equilibrium framing, the mean value property, and the maximum principle — this concept's entire framing is built around contrasting with and generalizing that concept's special homogeneous case).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.greens-function`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational/conceptual depth (a genuine numerical demonstration that the mean value property fails, and a concrete physical modeling application) and LO3 kept orientation-level, appropriately previewing Green's functions without developing the technique's own machinery.
- **Division of labor**: `math.de.laplace-equation` owns the homogeneous equation and its special properties; this concept owns the NONHOMOGENEOUS generalization and the crucial warning that those special properties do not automatically transfer, deliberately reusing that concept's own mean-value-property/maximum-principle machinery as the explicit point of contrast rather than introducing unrelated new content.
- Example 1's use of $u=x^2$ (and Example 2's structural parallel using electrostatics) were chosen deliberately: $u=x^2$ gives a clean, hand-computable counterexample to the mean value property, making MC-1's target error concretely falsifiable rather than merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.greens-function` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: the already-known steady-state plate scenario, now with a heat source added) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
