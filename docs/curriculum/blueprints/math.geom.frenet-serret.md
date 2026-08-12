# Teaching Blueprint: Frenet-Serret Formulas (`math.geom.frenet-serret`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.frenet-serret` |
| name | Frenet-Serret Formulas |
| domain | Geometry |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.geom.curvature` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The system T' = κN, N' = −κT + τB, B' = −τN relating the tangent T, normal N, binormal B and encoding all local geometry of a space curve.

 |

## Component 1 — Learning Objectives

- LO1: Identify the THREE mutually PERPENDICULAR vectors of the **Frenet frame** (TNB frame) at a point on a space curve: TANGENT $T$ (direction of motion), NORMAL $N$ (direction the curve is turning), and BINORMAL $B$ (perpendicular to both, completing a right-handed system, $B=T\times N$).
- LO2: State the Frenet-Serret system $T'=\kappa N$, $N'=-\kappa T+\tau B$, $B'=-\tau N$, and identify CURVATURE $\kappa$ (from `math.geom.curvature`, measuring how sharply the curve BENDS within its immediate plane of motion) and TORSION $\tau$ (a NEW quantity measuring how much the curve TWISTS OUT of that plane, into 3D) — recognizing torsion as a genuinely NEW concept, not simply curvature computed differently.
- LO3: Recognize that a curve with ZERO torsion EVERYWHERE lies ENTIRELY in a single PLANE (a "flat," non-twisting curve) — torsion specifically measures departure from planarity, while curvature alone (even if nonzero) is compatible with a purely planar curve.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.curvature` — the Frenet-Serret formulas extend curvature into a full 3D local-geometry framework, adding torsion.

## Component 3 — Core Explanation

At each point along a smooth space curve, the **Frenet frame** (TNB frame) consists of three mutually PERPENDICULAR unit vectors: the **tangent** $T$ (pointing in the curve's instantaneous direction of motion), the **normal** $N$ (pointing in the direction the curve is CURVING, perpendicular to $T$), and the **binormal** $B=T\times N$ (perpendicular to both, completing a right-handed coordinate system that travels along with the curve).

The **Frenet-Serret formulas** describe how this frame CHANGES as you move along the curve: $T'=\kappa N$, $N'=-\kappa T+\tau B$, $B'=-\tau N$ — where $\kappa$ (CURVATURE, from `math.geom.curvature`) measures how sharply the curve bends WITHIN its immediate plane of motion, and $\tau$ (**TORSION**, a genuinely NEW quantity introduced here) measures how much the curve TWISTS OUT of that plane, into the third dimension. Torsion is NOT simply "curvature computed a different way" — it's an independent geometric quantity capturing a fundamentally different kind of bending (out-of-plane twisting, rather than in-plane turning).

A curve with ZERO torsion EVERYWHERE ($\tau=0$ throughout) lies ENTIRELY within a single flat PLANE — it never twists out of that plane, even if its curvature $\kappa$ is nonzero (a circle, for instance, has nonzero curvature but zero torsion, since it's a purely planar curve). Torsion specifically detects and measures NON-planarity; curvature alone says nothing about whether a curve is planar or genuinely three-dimensional.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying the TNB frame, breaking MC-1)**: For a particle moving along a helix, describe the roles of $T$, $N$, and $B$ at a given instant. $T$ points along the particle's current direction of travel. $N$ points toward the CENTER of the helix's local curving (perpendicular to $T$, in the plane of the immediate turn). $B$ is perpendicular to BOTH $T$ and $N$, completing the right-handed frame — for a helix, $B$ points in a direction related to the helix's overall axis. A common error confuses $N$ (the direction of TURNING, i.e. curvature's direction) with $B$ (the OUT-OF-PLANE direction, related to torsion) — these are DIFFERENT vectors serving different roles; $N$ captures in-plane bending direction, while $B$ captures the frame's third, out-of-plane axis.

**Example 2 (LO2 — torsion as a genuinely new quantity, breaking MC-2)**: Explain why a helix (a 3D spiral, like a spring) has BOTH nonzero curvature AND nonzero torsion, while a circle (a flat, planar curve) has nonzero curvature but ZERO torsion. The circle bends (nonzero $\kappa$) but stays entirely within one flat plane (zero $\tau$, no twisting out of that plane). The helix ALSO bends (nonzero $\kappa$, similar bending "tightness" to a circle of the same radius) but ADDITIONALLY twists continuously out of any single plane as it rises along its axis (nonzero $\tau$) — this is a genuinely SEPARATE property from curvature, not derivable just from knowing $\kappa$. A common error assumes torsion is just "curvature in the third dimension" or some recombination of curvature information, rather than recognizing it as an INDEPENDENT quantity that must be separately computed and can be zero even when curvature is large, or vice versa (in principle).

**Example 3 (LO3 — zero torsion implies planarity, breaking MC-3 collapsed with earlier)**: Given a curve with $\tau=0$ at every point, state what can be concluded about its shape. The curve lies ENTIRELY within a single flat plane — zero torsion everywhere is exactly the condition for planarity, regardless of how large or small the curvature $\kappa$ is at any point (the curve can still bend sharply or gently, entirely within that one plane).

## Component 5 — Teaching Actions

### Teaching Action A01 — Distinguishing N (In-Plane Turning) from B (Out-of-Plane Axis) (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the roles of $N$ and $B$ within the TNB frame.

- **MC-1 hook**: this directly targets MC-1 (confusing the normal and binormal vectors' distinct roles).

### Teaching Action A02 — Torsion Is an Independent Quantity from Curvature (Primitive P64: Conceptual Shift)

Work Example 2, explicitly contrasting a circle (curvature only) against a helix (both curvature and torsion).

- **MC-2 hook**: this directly targets MC-2 (treating torsion as derivable from curvature rather than an independent geometric quantity).

### Teaching Action A03 — Zero Torsion Everywhere Means the Curve Is Planar (reused procedure)

Present Example 3, connecting the zero-torsion condition directly to planarity.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.65×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Describe, in your own words, the roles of the tangent, normal, and binormal vectors in the Frenet frame.
  2. Explain why a circle has zero torsion despite having nonzero curvature.
  3. Explain why a helix has nonzero torsion, unlike a circle.
  4. If a curve is known to have zero torsion at every point, what can you conclude about its overall shape?
- **P76 (Transfer Probe, mode = independence)**: "An aerospace engineer designing a roller coaster track wants a genuinely three-dimensional loop-the-loop-with-a-twist section (not just a flat vertical circle), and needs to characterize how much the track 'twists' out of any single plane along its length, separate from how sharply it curves. (a) Explain which of the two Frenet-Serret quantities (curvature or torsion) specifically measures this out-of-plane twisting. (b) Explain why simply knowing the track's curvature at each point would be INSUFFICIENT to fully describe whether the track has this 3D twisting feature."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NORMAL-AND-BINORMAL-VECTORS-ROLES-CONFUSED | Confusing the normal vector (in-plane turning direction) with the binormal vector (out-of-plane axis direction) in the Frenet frame | Foundational |
| MC-2 | TORSION-TREATED-AS-DERIVABLE-FROM-CURVATURE-RATHER-THAN-INDEPENDENT | Treating torsion as a recombination or derivative of curvature information, rather than recognizing it as a genuinely independent geometric quantity | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Normal and Binormal Vectors' Roles Confused") → P41 (detect: present Example 1 and check whether $N$ and $B$'s distinct roles are correctly identified) → P64 (conceptual shift: re-derive each vector's specific defining role — $N$ from the curvature/turning direction, $B$ as the frame-completing cross product).
- **B02 (targets MC-2)**: P27 ("Torsion Treated as Derivable from Curvature Rather Than Independent") → P41 (detect: present Example 2 and check whether torsion is (incorrectly) assumed derivable from curvature alone) → P64 (conceptual shift: re-examine the circle-vs-helix contrast, confirming torsion and curvature vary independently).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.curvature`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.differential-geometry-curves`.

## Component 8 — Teaching Notes

- estimated_hours = 8, bloom = analyze, and mastery_threshold = 0.65 (a relatively low MAMR-input) reflect this concept's genuine advanced difficulty — introducing a full 3D local-geometry framework with a new independent quantity (torsion).
- Both misconceptions were ranked Foundational because each reflects a fundamental misunderstanding of the Frenet frame's structure or the independence of its two key invariants.
- The 3D roller-coaster transfer probe was deliberately chosen because a genuinely twisting (non-planar) track section makes torsion's distinct, independent role from curvature immediately tangible and motivated by real engineering design concerns.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.curvature`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
