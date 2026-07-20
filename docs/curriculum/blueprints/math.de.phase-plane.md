# Teaching Blueprint: Phase Plane Analysis (`math.de.phase-plane`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.phase-plane` |
| name | Phase Plane Analysis |
| domain | Differential Equations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.de.systems-ode`, `math.de.slope-field` |
| unlocks | `math.de.stability-analysis` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — expert learner already solves linear systems $\vec x'=A\vec x$ via eigenvalues; the task is a genuinely pictorial way of understanding TWO coupled equations at once, directly generalizing the single-equation slope field |
| description (KG) | For 2D autonomous systems $x'=f(x,y),y'=g(x,y)$, trajectories in the $xy$-plane (phase plane) reveal global solution behavior. Equilibria classified by eigenvalue structure: nodes, spirals, saddles, centers. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the phase PORTRAIT of a 2D system as `math.de.slope-field`'s own single-equation slope-field idea, GENERALIZED from ONE dimension ($x$-$y$ plane, with $y'$ as the single prescribed slope at each $(x,y)$) to TWO coupled dimensions (the $x$-$y$ PHASE plane itself, with the VECTOR $(x'(t),y'(t))=(f(x,y),g(x,y))$ prescribing a DIRECTION at each point, rather than a single slope) — and correctly construct a small portion of a phase portrait by evaluating $(f,g)$ at sample points, directly paralleling `math.de.slope-field`'s own construction procedure.
- LO2: Find and classify EQUILIBRIA (points where $f(x,y)=g(x,y)=0$, i.e. where the system's velocity vector VANISHES entirely) using `math.de.systems-ode`'s own eigenvalue-based classification, applied to the LINEARIZATION of the system near each equilibrium — correctly identifying whether a specific equilibrium is a NODE (real eigenvalues, same sign), SADDLE (real eigenvalues, opposite signs), SPIRAL (complex eigenvalues, nonzero real part), or CENTER (purely imaginary eigenvalues) from the linearized system's eigenvalues.
- LO3: Correctly interpret a phase portrait's GLOBAL qualitative behavior for a specific nonlinear system (e.g. predator-prey-style dynamics) — identifying trajectories that spiral toward/away from an equilibrium, are attracted along one direction but repelled along another (saddle behavior), or orbit periodically around a center — and correctly explain why phase-plane analysis reveals genuinely GLOBAL solution behavior that neither equation's own slope field (viewed separately) could show.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.systems-ode` (systems $\vec x'=A\vec x$; solving via eigenvalues/eigenvectors) and `math.de.slope-field` (constructing a single-equation slope field by evaluating the ODE's right-hand side at a grid of points; sketching approximate solutions by tangent-following).

## Component 3 — Core Explanation

**The phase portrait generalizes `math.de.slope-field`'s own construction from one dimension to two**: `math.de.slope-field` constructs a picture for a SINGLE equation $y'=f(x,y)$ by evaluating the ONE prescribed slope at each grid point $(x,y)$. For a 2D AUTONOMOUS system $x'=f(x,y),y'=g(x,y)$ (two COUPLED equations, both derivatives depending on both variables, with no explicit $t$-dependence), the SAME construction idea applies: at each point $(x,y)$ in the phase plane, evaluate the VECTOR $(f(x,y),g(x,y))$ — this vector's DIRECTION (not merely a slope, since now there are two simultaneous rates of change) shows which way a trajectory PASSING through that point is instantaneously moving. Drawing these direction vectors (or arrows) at a grid of sample points is the DIRECT 2D analogue of `math.de.slope-field`'s own 1D segment-drawing procedure.

**Equilibria are found where the velocity vector vanishes, classified via `math.de.systems-ode`'s own eigenvalue machinery applied to the LINEARIZATION**: an equilibrium (or fixed point) is a point $(x^*,y^*)$ where $f(x^*,y^*)=g(x^*,y^*)=0$ SIMULTANEOUSLY — the system's velocity vanishes entirely there, so a trajectory starting exactly at an equilibrium stays there forever. Near such a point, the NONLINEAR system can be approximated by its LINEARIZATION (a first-order Taylor expansion, giving a linear system $\vec u'=J\vec u$ for the small deviation $\vec u=(x-x^*,y-y^*)$, where $J$ is the Jacobian matrix of partial derivatives evaluated at the equilibrium) — `math.de.systems-ode`'s own eigenvalue-based solution technique then applies DIRECTLY to $J$, and the resulting eigenvalues' STRUCTURE classifies the equilibrium's TYPE: real eigenvalues of the SAME sign give a NODE (trajectories flow directly toward/away, without spiraling); real eigenvalues of OPPOSITE sign give a SADDLE (attracted along one eigendirection, repelled along the other); complex eigenvalues with NONZERO real part give a SPIRAL (trajectories spiral in/out); PURELY IMAGINARY eigenvalues give a CENTER (closed periodic orbits, neither approaching nor receding).

**Phase-plane analysis reveals GLOBAL behavior neither equation's own slope field could show separately**: examining $x'=f(x,y)$'s slope field ALONE (treating $y$ as if it were a fixed parameter) or $y'=g(x,y)$'s slope field alone loses the COUPLING between the two variables entirely — the phase plane, by plotting BOTH variables' evolution SIMULTANEOUSLY in one picture, reveals how trajectories genuinely move through the FULL 2D state space, connecting multiple equilibria, distinguishing spiraling from direct approach, and revealing closed periodic orbits — qualitative GLOBAL structure invisible to either single-variable slope field considered in isolation.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing part of a phase portrait, directly paralleling slope-field construction, breaking MC-1)**: for the system $x'=y,y'=-x$ (a simple rotational system): evaluating the velocity vector $(f,g)=(y,-x)$ at sample points, DIRECTLY paralleling `math.de.slope-field`'s own point-by-point evaluation procedure: at $(1,0)$: $(f,g)=(0,-1)$ (pointing straight down); at $(0,1)$: $(f,g)=(1,0)$ (pointing right); at $(-1,0)$: $(f,g)=(0,1)$ (pointing up); at $(0,-1)$: $(f,g)=(-1,0)$ (pointing left) — plotting these four arrows reveals a CLOCKWISE rotational pattern around the origin, obtained via the SAME grid-evaluation procedure `math.de.slope-field` already established, now applied to a vector rather than a scalar slope.

**Example 2 (LO2 — classifying an equilibrium via the linearization's eigenvalues, breaking MC-2)**: for the system $x'=x-y,y'=x+y$: the ONLY equilibrium is $(0,0)$ (checking: $x-y=0,x+y=0\Rightarrow x=y=0$). Since the system is ALREADY LINEAR, the Jacobian is simply $J=\begin{pmatrix}1&-1\\1&1\end{pmatrix}$ everywhere. Computing eigenvalues via `math.de.systems-ode`'s own characteristic-polynomial method: $\det(J-\lambda I)=(1-\lambda)^2+1=0\Rightarrow(1-\lambda)^2=-1\Rightarrow\lambda=1\pm i$ — COMPLEX eigenvalues with NONZERO real part (1). By LO2's classification rule, this is a SPIRAL — and specifically, since the real part is POSITIVE, trajectories spiral OUTWARD from the origin, confirmed directly by the eigenvalue structure without needing to solve the system explicitly or plot many points.

**Example 3 (LO3 — reading global qualitative behavior for a nonlinear system, breaking MC-3)**: for a predator-prey-style system with equilibria at $(0,0)$ (a saddle, by direct linearization — extinction of both species is unstable) and at some positive $(x^*,y^*)$ (a center or spiral, depending on model parameters, by a similar linearization): the FULL phase portrait reveals trajectories starting near $(0,0)$ being REPELLED away (saddle behavior, consistent with populations naturally growing from small values), while trajectories elsewhere may ORBIT around $(x^*,y^*)$ (center behavior, giving sustained periodic oscillation of both populations) — a genuinely GLOBAL qualitative picture (extinction is unstable; a positive coexistence equilibrium supports oscillation) that neither the $x$-equation's own slope field (with $y$ frozen) nor the $y$-equation's own slope field (with $x$ frozen) could reveal in isolation, since each ignores the OTHER variable's simultaneous evolution.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Phase Portrait Generalizes `math.de.slope-field`'s Own Construction to Two Dimensions (Primitive P11: Representation Shift)

State: "you already know how to build a slope field for ONE equation by evaluating its right-hand side at grid points — the phase portrait does EXACTLY this, evaluating a VECTOR $(f,g)$ instead of a single slope, at each point in the phase plane." Walk Example 1's direct point-by-point vector evaluation.

- **MC-1 hook**: ask "is constructing a phase portrait for a 2D system a genuinely new procedure, or does it directly generalize `math.de.slope-field`'s own grid-evaluation construction to a vector-valued quantity?" — a "genuinely new procedure" answer reveals MC-1 (missing the direct generalization relationship).

### Teaching Action A02 — Equilibrium Type Is Read Directly From the Linearization's Eigenvalues (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing the Jacobian's eigenvalues ($1\pm i$) IMMEDIATELY classifies the origin as an outward spiral, with NO need to solve the system explicitly or plot extensive trajectories. State: "you don't need to laboriously plot many trajectories near an equilibrium to determine its type — `math.de.systems-ode`'s own eigenvalue machinery, applied to the linearization, tells you directly: real same-sign eigenvalues, a node; real opposite-sign, a saddle; complex nonzero-real-part, a spiral; purely imaginary, a center."

- **MC-2 hook**: ask "to classify an equilibrium's type (node, saddle, spiral, or center), is extensive direct plotting of nearby trajectories necessary, or can the linearization's eigenvalues determine this directly?" — a "extensive plotting necessary" answer reveals MC-2 (missing the direct eigenvalue-based classification).

### Teaching Action A03 — Phase-Plane Analysis Reveals Global Behavior Invisible to Either Variable's Slope Field Alone (Primitive P06: Contrast Pair)

Contrast examining $x'=f(x,y)$'s own slope field with $y$ artificially frozen (losing the genuine coupling) against Example 3's FULL phase portrait, which reveals the saddle-at-extinction/center-at-coexistence global structure only visible when BOTH variables' simultaneous evolution is tracked together. State: "freezing one variable and looking at the other equation's slope field in isolation throws away the coupling that makes the system genuinely two-dimensional — the phase plane is specifically designed to preserve and reveal that coupling."

- **MC-3 hook**: ask "could examining each equation's own slope field separately (treating the other variable as fixed) reveal the same global qualitative structure the full phase portrait shows?" — a "yes, equivalent information" answer reveals MC-3 (missing that separate slope fields discard the genuine coupling between the two variables).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the system $x'=-y,y'=x$, evaluate the velocity vector at $(1,0),(0,1),(-1,0),(0,-1)$ and describe the resulting rotational pattern.
  2. Find all equilibria of the system $x'=x+2y,y'=3x+2y$.
  3. Compute the Jacobian eigenvalues at the equilibrium from problem 2 and classify its type.
  4. Explain, in your own words, why phase-plane analysis reveals global behavior that examining each equation's own slope field separately cannot.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A control-systems engineer is analyzing a two-variable feedback system $x'=f(x,y),y'=g(x,y)$ near its designed operating equilibrium, and wants to know whether the system will naturally settle back to that equilibrium after a small disturbance (stability) or diverge away from it (instability). (a) Explain how the engineer would compute the linearization's Jacobian matrix at the equilibrium, and what role `math.de.systems-ode`'s own eigenvalue method plays in analyzing it. (b) If the computed eigenvalues turn out to be complex with a NEGATIVE real part, explain what this tells the engineer about the system's behavior near the equilibrium, using this lesson's classification. (c) Explain why the engineer specifically needs the FULL phase-plane picture (not just the eigenvalue classification alone) to understand how trajectories starting FAR from the equilibrium (not just infinitesimally close) actually behave."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PHASE-PORTRAIT-ASSUMED-GENUINELY-NEW-PROCEDURE | Believing constructing a phase portrait is a genuinely new procedure, missing that it directly generalizes `math.de.slope-field`'s own grid-evaluation construction to a vector-valued quantity | Foundational |
| MC-2 | EQUILIBRIUM-CLASSIFICATION-ASSUMED-TO-REQUIRE-EXTENSIVE-PLOTTING | Believing classifying an equilibrium's type requires extensive direct plotting of nearby trajectories, missing that the linearization's eigenvalues determine this directly | High |
| MC-3 | SEPARATE-SLOPE-FIELDS-ASSUMED-EQUIVALENT-TO-PHASE-PORTRAIT | Believing examining each equation's own slope field separately reveals the same global qualitative structure as the full phase portrait, missing that this discards the genuine coupling between variables | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Phase Portrait Assumed Genuinely New Procedure") → P41 (detect: ask whether phase-portrait construction is new or generalizes slope fields) → P64 (conceptual shift: re-walk Example 1's direct vector-evaluation parallel).
- **B02 (targets MC-2)**: P27 (name it: "Equilibrium Classification Assumed to Require Extensive Plotting") → P41 (detect: ask whether classification requires extensive plotting or direct eigenvalue analysis) → P64 (conceptual shift: re-walk Example 2's direct eigenvalue-based classification).
- **B03 (targets MC-3)**: P27 (name it: "Separate Slope Fields Assumed Equivalent to Phase Portrait") → P41 (detect: ask whether separate slope fields reveal the same global structure) → P64 (conceptual shift: re-walk Example 3's saddle-at-extinction/center-at-coexistence global picture).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.systems-ode` (the eigenvalue-based solution method for linear systems $\vec x'=A\vec x$ this concept's equilibrium classification directly reuses) and `math.de.slope-field` (the single-equation grid-evaluation construction this concept's phase portrait directly generalizes).
- **Unlocks**: `math.de.stability-analysis` (formalizing the stability implications of each equilibrium type this concept classifies).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 establishing the direct generalization from `math.de.slope-field`, LO2 given full depth via a directly computed eigenvalue classification, and LO3 demonstrating genuinely global qualitative insight.
- **Division of labor**: `math.de.systems-ode` already owns the eigenvalue-based solution technique for linear systems, previewing (via one P76 transfer probe, not a dedicated treatment) the general idea of eigenvalues determining qualitative behavior for a predator-prey-style linearized system (verified by grep — no dedicated node/saddle/spiral/center classification found there); `math.de.slope-field` already owns the single-equation grid-evaluation construction procedure this concept directly generalizes. This concept owns the FULL 2D phase-portrait construction, the complete four-way equilibrium classification (node/saddle/spiral/center) via linearization, and the genuinely global qualitative-behavior interpretation.
- Example 3's deliberate choice of a predator-prey-style scenario (rather than a purely abstract linear system) was made specifically to give LO3's "global behavior invisible to separate slope fields" claim a concrete, intuitive grounding — extinction-instability and coexistence-oscillation are directly meaningful, memorable qualitative conclusions.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.de.stability-analysis`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: expert learner already solves linear systems; task is a genuinely pictorial 2D generalization of slope fields) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
