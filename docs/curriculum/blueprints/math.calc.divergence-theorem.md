# Teaching Blueprint: Divergence Theorem (`math.calc.divergence-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.divergence-theorem` |
| name | Divergence Theorem |
| domain | Calculus |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.60 → MAMR = ⌈0.60×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.calc.surface-integrals`, `math.calc.curl-divergence` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | ∭_E ∇·F dV = ∬_S F·dS, where S is the boundary of solid E; relates the total divergence inside a region to the outward flux through its boundary.

 |

## Component 1 — Learning Objectives

- LO1: State the Divergence Theorem $\iiint_E\nabla\cdot F\,dV=\iint_SF\cdot dS$, where $S$ is the CLOSED boundary surface of solid region $E$, oriented with an OUTWARD-pointing normal.
- LO2: Use the theorem to convert a difficult SURFACE FLUX integral into an often-easier VOLUME integral of divergence (or vice versa), choosing whichever direction is computationally simpler for the specific $F$ and region $E$.
- LO3: Recognize that the Divergence Theorem requires $S$ to be a CLOSED surface (fully enclosing a solid region) — it does NOT apply directly to an open surface (like a single hemisphere without its flat base), which instead requires Stokes' theorem or direct computation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.surface-integrals` (the flux integral $\iint_SF\cdot dS$) and `math.calc.curl-divergence` (computing $\nabla\cdot F$).

## Component 3 — Core Explanation

The **Divergence Theorem** (Gauss's Theorem) states $\iiint_E\nabla\cdot F\,dV=\iint_SF\cdot dS$, where $E$ is a solid 3D region and $S$ is its CLOSED boundary surface, oriented with an OUTWARD-pointing normal. It relates the TOTAL divergence (a measure of "outflow-ness") accumulated throughout the interior of $E$ to the total FLUX (net outward flow) through its entire boundary — intuitively, if the field is "expanding" everywhere inside (positive divergence), that expansion must manifest as net outward flow crossing the boundary.

Practically, this lets you CONVERT between a surface flux integral and a volume integral, choosing whichever is easier: sometimes computing $\nabla\cdot F$ and integrating over a simple solid region $E$ is far easier than directly parametrizing and integrating over a complicated boundary surface $S$ (especially if $S$ consists of multiple distinct pieces, like a cube's six faces).

Crucially, the theorem requires $S$ to be a genuinely CLOSED surface — fully enclosing $E$ with NO gaps. An OPEN surface (like a single hemisphere, missing its flat circular base) is NOT the boundary of any solid region on its own, so the Divergence Theorem does NOT apply directly to it; such cases require either adding a "capping" surface to close it, or using a different technique entirely (like Stokes' theorem, if the goal involves a curl-related integral instead).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic application, breaking MC-1)**: For $F=(x,y,z)$ and $E$ the solid unit ball ($x^2+y^2+z^2\le1$), evaluate $\iint_SF\cdot dS$ where $S$ is the unit sphere. Compute $\nabla\cdot F=\frac{\partial x}{\partial x}+\frac{\partial y}{\partial y}+\frac{\partial z}{\partial z}=1+1+1=3$ (a CONSTANT). By the Divergence Theorem: $\iint_SF\cdot dS=\iiint_E3\,dV=3\cdot\text{Vol}(E)=3\cdot\frac{4}{3}\pi(1)^3=4\pi$. A common error attempts to compute the SURFACE integral $\iint_SF\cdot dS$ directly by parametrizing the sphere (a genuinely more involved computation, requiring spherical coordinates and a normal vector setup), missing the far simpler VOLUME-integral route made available by the Divergence Theorem when the divergence turns out to be a simple constant.

**Example 2 (LO3 — the closed-surface requirement, breaking MC-2)**: For a SINGLE hemisphere $S$ (the curved surface only, NOT including its flat circular base), attempting to apply the Divergence Theorem DIRECTLY to $\iint_SF\cdot dS$ is INVALID — this hemisphere alone is NOT a closed surface (it doesn't fully enclose any solid region by itself). A common error applies the Divergence Theorem formula directly to this open hemisphere anyway, treating "half a sphere" as if it were interchangeable with a closed surface — the correct approach would be to ADD the flat circular base (forming a genuinely closed surface enclosing the solid hemisphere region), apply the Divergence Theorem to the CLOSED combination, and then SUBTRACT the (separately computed) flux through the flat base to isolate the curved surface's contribution.

**Example 3 (LO2 — choosing the easier direction)**: For $F=(x^3,y^3,z^3)$ and $E$ a solid cube $[0,1]^3$, evaluate the flux through all six faces. Rather than computing six SEPARATE surface integrals (one per face, each requiring its own parametrization and normal vector), use the Divergence Theorem: $\nabla\cdot F=3x^2+3y^2+3z^2$, so $\iiint_E(3x^2+3y^2+3z^2)\,dV$ — a single, more manageable TRIPLE integral over the simple cube region, avoiding six separate surface-integral computations entirely.

## Component 5 — Teaching Actions

### Teaching Action A01 — Converting a Surface Flux Integral into a Volume Integral (Primitive P64: Conceptual Shift)

Work Example 1, explicitly computing the divergence first and recognizing the volume-integral route as more efficient.

- **MC-1 hook**: check whether the volume-integral shortcut is recognized before attempting a direct surface-integral computation.

### Teaching Action A02 — The Theorem Requires a Genuinely Closed Surface (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the invalid direct application to an open hemisphere against the correct "close it, apply, then subtract" strategy.

- **MC-2 hook**: this directly targets MC-2 (applying the theorem directly to an open surface).

### Teaching Action A03 — Avoiding Multiple Separate Surface Integrals via One Volume Integral (reused procedure)

Work Example 3, explicitly contrasting the six-separate-face approach against the single volume-integral approach.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.60×5⌉ = 3/5.

- **P77 (4-problem set)**:
  1. For $F=(2x,2y,2z)$ and $E$ the solid unit ball, use the Divergence Theorem to find $\iint_SF\cdot dS$.
  2. Explain, in one sentence, why the Divergence Theorem cannot be applied directly to a single open hemisphere surface (without its flat base).
  3. Describe the strategy for computing the flux through an open hemisphere using the Divergence Theorem indirectly (via capping and subtracting).
  4. For $F=(x^2,y^2,z^2)$ and $E$ a solid cube $[0,2]^3$, set up (do not evaluate) the volume integral given by the Divergence Theorem, instead of six separate surface integrals.
- **P76 (Transfer Probe, mode = independence)**: "A fluid dynamics engineer needs to compute the net flow rate of fluid OUT of a complicated-shaped tank (with an irregular, multi-piece boundary surface), given the fluid's velocity field $F$ throughout the tank's interior. (a) Explain why using the Divergence Theorem — converting the flux integral into a volume integral of $\nabla\cdot F$ over the tank's interior — could be dramatically more practical than parametrizing and integrating over each irregular boundary piece separately. (b) Explain what physical significance a POSITIVE value of $\nabla\cdot F$ at some interior point would have, connecting to the idea of that point being a 'source' contributing to net outward flow."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VOLUME-INTEGRAL-SHORTCUT-NOT-RECOGNIZED-BEFORE-ATTEMPTING-DIRECT-SURFACE-COMPUTATION | Attempting to directly compute a difficult surface flux integral without first checking whether the Divergence Theorem offers a simpler volume-integral route | Moderate |
| MC-2 | DIVERGENCE-THEOREM-APPLIED-DIRECTLY-TO-AN-OPEN-NON-CLOSED-SURFACE | Applying the Divergence Theorem formula directly to an open surface that doesn't fully enclose a solid region, rather than closing it first or using a different technique | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Volume Integral Shortcut Not Recognized Before Attempting Direct Surface Computation") → P41 (detect: present Example 1 and check whether the divergence is computed and the volume-integral route considered first) → P64 (conceptual shift: re-work the problem by computing $\nabla\cdot F$ first and comparing the effort of each route).
- **B02 (targets MC-2)**: P27 ("Divergence Theorem Applied Directly to an Open Non-Closed Surface") → P41 (detect: present Example 2 and check whether the theorem is (incorrectly) applied to the open hemisphere directly) → P64 (conceptual shift: re-identify the missing "cap" needed to close the surface, then re-derive the correct capping-and-subtracting strategy).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.surface-integrals`, `math.calc.curl-divergence`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.stokes-theorem` (the analogous theorem relating surface integrals of curl to boundary-curve circulation).

## Component 8 — Teaching Notes

- difficulty = expert, bloom = analyze, and mastery_threshold = 0.60 reflect this concept's genuine conceptual weight, on par with `math.calc.stokes-theorem`.
- MC-2 was ranked Foundational because misapplying the theorem to an open surface produces a formula that is simply INVALID (not applicable), a more serious error than MC-1's merely inefficient (but still eventually correct, if laborious) direct approach.
- The fluid-tank transfer probe was deliberately chosen because computing net outward flow through a complicated real container boundary is exactly the practical scenario where the Divergence Theorem's volume-integral shortcut has genuine engineering value, distinct from an artificial exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.surface-integrals`, `math.calc.curl-divergence`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.60×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
