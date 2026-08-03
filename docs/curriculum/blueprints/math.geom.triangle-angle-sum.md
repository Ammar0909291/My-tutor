# Teaching Blueprint: Triangle Angle Sum Theorem (`math.geom.triangle-angle-sum`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.triangle-angle-sum` |
| name | Triangle Angle Sum Theorem |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.triangle`, `math.geom.parallel-lines` |
| unlocks | `math.geom.polygon-angle-sum` |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — draw the parallel-line auxiliary construction |
| description (KG) | The sum of the three interior angles of any triangle in Euclidean geometry equals 180°.

 |

## Component 1 — Learning Objectives

- LO1: State the Triangle Angle Sum Theorem — the three INTERIOR angles of ANY triangle sum to exactly $180°$ — and use it to find a MISSING angle given the other two.
- LO2: Understand the PROOF sketch using a PARALLEL LINE drawn through one vertex (parallel to the opposite side), using `math.geom.parallel-lines`'s alternate-interior-angle properties to show the three angles form a straight line (hence $180°$) — recognizing this as a genuine PROOF, not merely an empirically observed pattern.
- LO3: Recognize this theorem holds SPECIFICALLY in EUCLIDEAN geometry — it does NOT hold universally in all geometric systems (e.g. on a curved/spherical surface, triangle angles can sum to MORE than $180°$), a boundary worth being aware of even at this introductory level.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` (the object being analyzed) and `math.geom.parallel-lines` (the key tool in the standard proof).

## Component 3 — Core Explanation

The **Triangle Angle Sum Theorem** states that the three INTERIOR angles of any triangle, in ordinary (Euclidean) geometry, sum to EXACTLY $180°$. This lets you find a MISSING third angle whenever the other two are known: $\theta_3=180°-\theta_1-\theta_2$.

The standard PROOF draws a line through one vertex, PARALLEL to the opposite side. This creates a set of ALTERNATE INTERIOR angles (from `math.geom.parallel-lines`) that are each equal to one of the triangle's original angles — arranging the three angles along the newly drawn straight line shows they must sum to $180°$ (since angles along a straight line always sum to $180°$). This is a genuine logical PROOF, not merely a pattern noticed by measuring many triangles.

This result holds SPECIFICALLY in Euclidean (flat) geometry. On a CURVED surface (like the surface of a sphere), triangle angle sums can exceed $180°$ — this theorem is a property of flat space, not an absolute universal truth about "triangles" in every conceivable geometric context.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding a missing angle, breaking MC-1)**: A triangle has angles $50°$ and $65°$. Find the third angle. Third angle $=180°-50°-65°=65°$. A common error adds the two given angles and STOPS there (reporting $115°$ as "the answer"), forgetting the final subtraction-from-$180°$ step — the theorem gives the TOTAL sum, from which the missing piece must still be isolated by subtraction.

**Example 2 (LO2 — understanding the proof)**: Sketch the standard proof: draw triangle $ABC$, then draw a line through vertex $C$ parallel to side $AB$. The two angles formed at $C$ on either side of the ORIGINAL angle $C$ are, via alternate interior angles, equal to angles $A$ and $B$ respectively. Since all three angles (the two "borrowed" ones plus the original angle $C$) lie along the straight line through $C$, and a straight line's angles sum to $180°$, angles $A+B+C=180°$ is proven.

**Example 3 (LO3 — recognizing the theorem's Euclidean-specific scope, breaking MC-2)**: A geography student notices that a "triangle" formed by three great-circle arcs on a globe (e.g. from the North Pole down to the equator, along the equator, then back up to the pole) can have THREE right angles, summing to $270°$ — seemingly violating the theorem. Explain why this is NOT a contradiction. This triangle exists on a CURVED (spherical) surface, not flat Euclidean space — the Triangle Angle Sum Theorem specifically applies to FLAT (Euclidean) geometry; spherical geometry is a genuinely different geometric system where this particular theorem doesn't apply. A common error treats the theorem as an absolute, context-free mathematical fact true for "any triangle anywhere," rather than recognizing it as a property specific to Euclidean (flat) geometry.

## Component 5 — Teaching Actions

### Teaching Action A01 — Subtract from 180° to Isolate the Missing Angle (Primitive P64: Conceptual Shift)

Work Example 1, explicitly performing the final subtraction step after summing the two known angles.

- **MC-1 hook**: check whether the final subtraction-from-180° step is performed, not just the summing of the two known angles.

### Teaching Action A02 — The Parallel-Line Proof Construction (reused procedure)

Work Example 2, explicitly walking through the auxiliary parallel-line construction and the alternate-interior-angle argument.

### Teaching Action A03 — The Theorem Is Euclidean-Specific, Not Universally True (Primitive P06: Contrast Pair)

Work Example 3, contrasting the flat-geometry guarantee against the curved-surface counterexample.

- **MC-2 hook**: this directly targets MC-2 (treating the theorem as an absolute truth true in all geometric contexts).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. A triangle has angles $40°$ and $85°$. Find the third angle.
  2. Explain, in your own words, how drawing a parallel line through a triangle's vertex proves the angle sum theorem.
  3. Explain why the Triangle Angle Sum Theorem specifically applies to Euclidean (flat) geometry.
  4. A triangle has angles $x$, $2x$, and $3x$. Find $x$ and each angle.
- **P76 (Transfer Probe, mode = independence)**: "An architect is designing a triangular roof truss and has measured two of the truss's three angles as $35°$ and $95°$ during a site survey. (a) Use the Triangle Angle Sum Theorem to find the third angle. (b) Explain why this theorem gives the architect complete confidence in the third angle's value without needing to physically measure it, given the truss is a genuine flat (Euclidean) triangle."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MISSING-ANGLE-COMPUTATION-STOPS-AT-SUM-OF-KNOWN-ANGLES-WITHOUT-SUBTRACTING-FROM-180 | Summing the two known angles and stopping there, without completing the final subtraction from 180° to isolate the missing angle | Foundational |
| MC-2 | ANGLE-SUM-THEOREM-TREATED-AS-UNIVERSALLY-TRUE-REGARDLESS-OF-GEOMETRIC-CONTEXT | Treating the 180° angle sum as an absolute truth for any triangle in any geometric context, rather than recognizing it as specific to Euclidean (flat) geometry | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Missing Angle Computation Stops at Sum of Known Angles Without Subtracting from 180") → P41 (detect: present Example 1 and check whether the final subtraction is performed) → P64 (conceptual shift: re-state the theorem's equation explicitly, $\theta_3=180°-\theta_1-\theta_2$, and re-complete the subtraction).
- **B02 (targets MC-2)**: P27 ("Angle Sum Theorem Treated as Universally True Regardless of Geometric Context") → P41 (detect: present Example 3 and check whether the spherical counterexample is (incorrectly) treated as a contradiction) → P64 (conceptual shift: re-state the theorem's Euclidean-specific scope explicitly, contrasting flat vs. curved geometric contexts).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle`, `math.geom.parallel-lines`.
- **Unlocks**: `math.geom.polygon-angle-sum`.
- **Related**: `math.geom.parallel-lines` (the key tool in the standard proof).

## Component 8 — Teaching Notes

- mastery_threshold = 0.95 reflects that this is one of the most foundational, frequently-used results in all of geometry, expected to become near-automatic.
- MC-1 was ranked Foundational because it produces a genuinely wrong final answer (an intermediate sum, not the actual missing angle), while MC-2 was ranked Moderate as a conceptual scope-awareness issue that doesn't affect ordinary problem-solving within Euclidean geometry itself.
- The roof-truss transfer probe was deliberately chosen because finding a hard-to-directly-measure angle from two known ones is a genuinely practical application of this theorem in construction and engineering contexts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.triangle`, `math.geom.parallel-lines`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.geom.polygon-angle-sum`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: parallel-line auxiliary construction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
