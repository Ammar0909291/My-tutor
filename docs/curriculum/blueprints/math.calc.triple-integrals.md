# Teaching Blueprint: Triple Integrals (`math.calc.triple-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.triple-integrals` |
| name | Triple Integrals |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.double-integrals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | ∭_E f(x,y,z) dV; evaluated via iterated integrals; computable in cylindrical (r,θ,z) and spherical (ρ,φ,θ) coordinates via the Jacobian.

 |

## Component 1 — Learning Objectives

- LO1: Set up and evaluate a triple integral $\iiint_Ef(x,y,z)\,dV$ as an ITERATED integral, correctly determining the bounds for each variable by carefully analyzing the region $E$'s shape (INNERMOST bounds may depend on the outer variables; outermost bounds must be constants).
- LO2: Convert a triple integral to CYLINDRICAL coordinates $(r,\theta,z)$ (using $dV=r\,dr\,d\theta\,dz$) when the region has CIRCULAR SYMMETRY around the $z$-axis, recognizing the extra factor of $r$ is required (NOT optional) whenever switching from Cartesian to cylindrical.
- LO3: Convert a triple integral to SPHERICAL coordinates $(\rho,\phi,\theta)$ (using $dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$) when the region has SPHERICAL symmetry, recognizing the correct volume element includes BOTH a $\rho^2$ factor AND a $\sin\phi$ factor — omitting either produces an incorrect result.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.double-integrals` — triple integrals extend the same iterated-integral and region-analysis principles to one more dimension.

## Component 3 — Core Explanation

A **triple integral** $\iiint_Ef(x,y,z)\,dV$ integrates a function over a 3D region $E$, evaluated as an ITERATED integral (three nested single-variable integrals). Setting up the bounds requires careful analysis of $E$'s shape: typically, the OUTERMOST integral's bounds are CONSTANTS, the MIDDLE integral's bounds may depend on the outermost variable, and the INNERMOST integral's bounds may depend on BOTH outer variables.

For regions with CIRCULAR symmetry (around the $z$-axis), converting to **cylindrical coordinates** $(r,\theta,z)$ often simplifies the integral significantly: $x=r\cos\theta$, $y=r\sin\theta$, $z=z$, with volume element $dV=r\,dr\,d\theta\,dz$ — the extra factor of $r$ (compared to naively writing $dr\,d\theta\,dz$) is essential, coming from the same Jacobian-scaling idea as polar coordinates in 2D.

For regions with SPHERICAL symmetry, converting to **spherical coordinates** $(\rho,\phi,\theta)$ gives volume element $dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ — TWO scaling factors are needed here: $\rho^2$ (from the radial direction) AND $\sin\phi$ (from how longitude circles shrink toward the poles, similar to how latitude lines shrink on a globe).

## Component 4 — Worked Examples

**Example 1 (LO1 — setting up iterated bounds, breaking MC-1)**: Set up $\iiint_Ef\,dV$ where $E$ is the region bounded by $0\le x\le1$, $0\le y\le x$, $0\le z\le x+y$. The correct iterated order (outer to inner, matching the dependency) is $\int_0^1\int_0^x\int_0^{x+y}f\,dz\,dy\,dx$ — outermost ($x$) uses constant bounds, middle ($y$) depends on $x$, innermost ($z$) depends on BOTH $x$ and $y$. A common error sets up the bounds in an inconsistent order (e.g. writing the $x$-bounds as depending on $y$ while the $y$-bounds ALSO depend on $x$, a circular dependency) — the bounds must form a genuine NESTED hierarchy, with each variable's bounds depending only on variables INTEGRATED LATER (i.e. those still "outside" it in the iteration order), never on variables integrated at the same or a more-inner stage.

**Example 2 (LO2 — cylindrical coordinates, breaking MC-2)**: Convert $\iiint_Ef\,dV$ to cylindrical coordinates for a region $E$ that is a cylinder of radius 2 (circularly symmetric around the $z$-axis). The correct conversion includes the extra $r$ factor: $\iiint_Ef(r\cos\theta,r\sin\theta,z)\cdot r\,dr\,d\theta\,dz$. A common error converts $x,y,z$ to $r,\theta,z$ in the FUNCTION but forgets to include the extra factor of $r$ in the volume element, writing simply $dr\,d\theta\,dz$ — this is the SAME omission error as forgetting the $r$ factor in 2D polar coordinates, now carried into 3D.

**Example 3 (LO3 — spherical coordinates, breaking MC-2 variant)**: Convert $\iiint_Ef\,dV$ to spherical coordinates for a region $E$ that is a solid sphere of radius $3$ (spherically symmetric). The correct conversion is $\iiint_Ef(\rho\sin\phi\cos\theta,\rho\sin\phi\sin\theta,\rho\cos\phi)\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$. A common error includes only ONE of the two scaling factors (e.g. writing $\rho\,d\rho\,d\phi\,d\theta$, missing the $\rho$ power or the $\sin\phi$ factor entirely) — BOTH factors are required together, since the volume element genuinely scales in two independent geometric ways (radially and by latitude-like angle).

## Component 5 — Teaching Actions

### Teaching Action A01 — Bounds Must Form a Genuine Nested Hierarchy (Primitive P64: Conceptual Shift)

Work Example 1, explicitly verifying each variable's bounds depend only on variables integrated later in the order.

- **MC-1 hook**: check whether the bounds' dependency structure is genuinely hierarchical (no circular dependency).

### Teaching Action A02 — Cylindrical Coordinates Require the Extra r Factor (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct volume element (with $r$) against the incorrect one (missing $r$), connecting to the analogous 2D polar-coordinates rule.

### Teaching Action A03 — Spherical Coordinates Require BOTH ρ² and sin(φ) Factors (Primitive P11: Representation Shift)

Work Example 3, explicitly identifying both scaling factors and their separate geometric origins.

- **MC-2 hook**: this directly targets MC-2 (omitting one or both required scaling factors when converting coordinate systems).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Set up (do not evaluate) $\iiint_Ef\,dV$ where $E$ is bounded by $0\le x\le2$, $0\le y\le x^2$, $0\le z\le x+y$.
  2. Convert $\iiint_Ef\,dV$ to cylindrical coordinates for a circularly-symmetric region, writing the full volume element.
  3. Convert $\iiint_Ef\,dV$ to spherical coordinates for a spherically-symmetric region, writing the full volume element.
  4. Explain, in one sentence, why the spherical volume element requires both a ρ² factor and a sin(φ) factor.
- **P76 (Transfer Probe, mode = independence)**: "A physicist needs to compute the total mass of a spherical planet with a density that varies with distance from the center, $\delta(\rho)$ (denser near the core), by integrating $\iiint_E\delta(\rho)\,dV$ over the planet's volume. (a) Explain why spherical coordinates are the natural choice for this integral, given the density depends only on $\rho$. (b) Write the full spherical-coordinate integral setup (including the correct volume element), and explain why omitting the sin(φ) factor would produce an incorrect total mass, even though the density function itself doesn't explicitly depend on φ."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ITERATED-INTEGRAL-BOUNDS-SET-UP-WITH-CIRCULAR-DEPENDENCY | Setting up triple integral bounds where variables depend on each other circularly, rather than forming a genuine nested nesting hierarchy | Foundational |
| MC-2 | COORDINATE-CONVERSION-VOLUME-ELEMENT-SCALING-FACTOR-OMITTED | Omitting the required scaling factor(s) (r for cylindrical; ρ² and/or sin(φ) for spherical) when converting the volume element to a new coordinate system | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Iterated Integral Bounds Set Up with Circular Dependency") → P41 (detect: present Example 1 and check whether the bounds' dependency structure is genuinely hierarchical) → P64 (conceptual shift: re-sketch the region $E$ and re-derive the bounds by peeling off one variable at a time, from innermost to outermost).
- **B02 (targets MC-2)**: P27 ("Coordinate Conversion Volume Element Scaling Factor Omitted") → P41 (detect: present Examples 2/3 and check whether the required scaling factor(s) are included) → P64 (conceptual shift: re-derive the volume element from the Jacobian of the coordinate transformation, confirming each factor's origin).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.double-integrals`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.multiple-integrals`.

## Component 8 — Teaching Notes

- estimated_hours = 10 (among the highest in the domain) reflects the genuine complexity of correctly setting up bounds AND choosing/converting between three different coordinate systems.
- Both misconceptions were ranked Foundational because each produces a fundamentally incorrect integral setup, not a minor computational slip.
- The planetary-mass transfer probe was deliberately chosen because integrating a radially-varying density over a sphere is a genuinely important physics application, making the spherical volume element's scaling factors concretely consequential rather than abstract bookkeeping.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.double-integrals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
