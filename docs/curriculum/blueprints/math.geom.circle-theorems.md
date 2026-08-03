# Teaching Blueprint: Circle Theorems (`math.geom.circle-theorems`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle-theorems` |
| name | Circle Theorems |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.geom.circle`, `math.geom.angle-pairs` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — diagram each theorem before the algebraic statement |
| description (KG) | Key theorems: inscribed angle = half central angle; tangent perpendicular to radius; equal chords equidistant from center; power of a point.

 |

## Component 1 — Learning Objectives

- LO1: Apply the INSCRIBED ANGLE THEOREM — an inscribed angle (vertex ON the circle) is EXACTLY HALF the CENTRAL angle (vertex at the center) subtending the SAME arc — and recognize this means ALL inscribed angles subtending the same arc are EQUAL to each other (all equal to half the same central angle).
- LO2: Apply the TANGENT-RADIUS PERPENDICULARITY theorem (already introduced in `math.geom.circle-parts`, now used in proofs) and the EQUAL-CHORDS-EQUIDISTANT-FROM-CENTER theorem — equal-length chords are always the SAME distance from the circle's center, and conversely.
- LO3: Apply the POWER OF A POINT theorem — for a point $P$ outside (or inside) a circle, and two lines through $P$ intersecting the circle at points $A,B$ and $C,D$ respectively, $PA\cdot PB=PC\cdot PD$ — a relationship that holds REGARDLESS of which specific pair of intersecting lines through $P$ is chosen.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle` (the shape) and `math.geom.angle-pairs` (needed for the inscribed-angle proof's angle relationships).

## Component 3 — Core Explanation

Several key **circle theorems** govern relationships between angles, chords, and points associated with circles. The **Inscribed Angle Theorem**: an angle INSCRIBED in a circle (its vertex ON the circle, its two sides being chords) is EXACTLY HALF the CENTRAL angle (vertex at the circle's center) that subtends the SAME arc. A powerful consequence: since ALL inscribed angles subtending the SAME arc equal half the SAME central angle, they must all be EQUAL to EACH OTHER, regardless of where on the remaining arc the inscribed angle's vertex sits.

The **tangent-radius perpendicularity** property (from `math.geom.circle-parts`) and the **equal-chords-equidistant-from-center** theorem (chords of EQUAL length are always the SAME perpendicular distance from the center, and conversely, chords equidistant from the center are equal in length) round out the basic chord/tangent relationships.

The **Power of a Point** theorem: for a point $P$ and any two lines through $P$ that intersect a circle (at $A,B$ for one line, $C,D$ for the other), the PRODUCT $PA\cdot PB$ EQUALS $PC\cdot PD$ — REGARDLESS of which specific pair of intersecting lines through $P$ is chosen; this constant product is called the "power of the point" $P$ with respect to the circle.

## Component 4 — Worked Examples

**Example 1 (LO1 — inscribed angle theorem, breaking MC-1)**: If a central angle subtending a particular arc measures $80°$, find the measure of an inscribed angle subtending the SAME arc. Inscribed angle $=\frac{80°}{2}=40°$. A common error computes the inscribed angle as EQUAL to the central angle (both $80°$), or DOUBLES the central angle instead of halving it — the inscribed angle is specifically HALF the central angle, never equal to it or double it.

**Example 2 (LO1 — all inscribed angles on the same arc are equal)**: For TWO different inscribed angles, both subtending the SAME arc (with vertices at two different points elsewhere on the circle), explain why both angles must be equal. Since BOTH inscribed angles equal HALF of the SAME central angle (by the Inscribed Angle Theorem), they must be equal TO EACH OTHER — regardless of exactly where their vertices sit on the remaining arc.

**Example 3 (LO3 — power of a point, breaking MC-2)**: For a point $P$ outside a circle, with one line through $P$ intersecting the circle at distances 4 and 10 from $P$ (so $PA=4$, $PB=10$), and a SECOND line through $P$ intersecting the circle at distance 5 from $P$ for one point ($PC=5$), find the distance to the second intersection point $PD$. By Power of a Point: $PA\cdot PB=PC\cdot PD\Rightarrow4\times10=5\times PD\Rightarrow40=5\cdot PD\Rightarrow PD=8$. A common error assumes the power-of-a-point PRODUCT should instead be a SUM (attempting $PA+PB=PC+PD$, i.e. $14=5+PD\Rightarrow PD=9$) — the relationship is specifically a PRODUCT equality, not a sum, and using the wrong operation produces a different (incorrect) value entirely.

## Component 5 — Teaching Actions

### Teaching Action A01 — Inscribed Angle Is Half, Never Equal to or Double, the Central Angle (Primitive P64: Conceptual Shift)

Work Example 1, explicitly deriving and emphasizing the "half" relationship.

- **MC-1 hook**: check whether the inscribed angle is correctly computed as HALF (not equal to or double) the central angle.

### Teaching Action A02 — All Inscribed Angles on the Same Arc Are Equal (reused procedure)

Work Example 2, explicitly connecting the shared "half the same central angle" relationship to conclude equality between different inscribed angles.

### Teaching Action A03 — Power of a Point Is a Product Relationship, Not a Sum (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct product-based computation against the incorrect sum-based attempt.

- **MC-2 hook**: this directly targets MC-2 (using sum instead of product in the power-of-a-point relationship).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. If a central angle subtending an arc measures $110°$, find the inscribed angle subtending the same arc.
  2. Explain why two different inscribed angles, both subtending the same arc, must be equal to each other.
  3. For a point $P$ outside a circle with $PA=6$, $PB=9$ on one line, and $PC=3$ on a second line through $P$, find $PD$.
  4. State the tangent-radius perpendicularity theorem and the equal-chords-equidistant-from-center theorem in your own words.
- **P76 (Transfer Probe, mode = independence)**: "A navigator is using triangulation from two lighthouses (both lying on the boundary of a circular safe-passage zone marked on a nautical chart), observing the angle between the two lighthouses from the ship's current position, and comparing it to the angle observed from a reference position also on the zone's boundary. (a) Explain, using the Inscribed Angle Theorem, why the ship's observed angle should equal the reference position's angle, PROVIDED both are inscribed angles subtending the same arc between the two lighthouses. (b) Explain what it would mean, navigationally, if the ship's observed angle came out DIFFERENT from the reference angle — connecting to whether the ship is genuinely on the same circular boundary."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INSCRIBED-ANGLE-COMPUTED-AS-EQUAL-TO-OR-DOUBLE-THE-CENTRAL-ANGLE-INSTEAD-OF-HALF | Computing an inscribed angle as equal to or double the corresponding central angle, rather than correctly halving it | Foundational |
| MC-2 | POWER-OF-A-POINT-RELATIONSHIP-COMPUTED-AS-A-SUM-INSTEAD-OF-A-PRODUCT | Using addition instead of multiplication when applying the power of a point theorem, producing an incorrect result | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Inscribed Angle Computed as Equal to or Double the Central Angle Instead of Half") → P41 (detect: present Example 1 and check whether the inscribed angle is (incorrectly) set equal to or double the central angle) → P64 (conceptual shift: re-state and re-apply the "half" relationship explicitly, using the theorem's proof sketch as reinforcement).
- **B02 (targets MC-2)**: P27 ("Power of a Point Relationship Computed as a Sum Instead of a Product") → P41 (detect: present Example 3 and check whether addition is (incorrectly) used instead of multiplication) → P64 (conceptual shift: re-state the theorem's product equation explicitly and re-solve using multiplication).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle`, `math.geom.angle-pairs`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.circle`.

## Component 8 — Teaching Notes

- estimated_hours = 10 (the highest in this batch) reflects the genuine breadth of this concept, covering four distinct theorems each requiring separate practice and proof understanding.
- Both misconceptions were ranked Foundational because each produces a numerically wrong result from a plausible-looking but incorrect operation (doubling instead of halving; summing instead of multiplying).
- The lighthouse-triangulation transfer probe was deliberately chosen because the Inscribed Angle Theorem's "equal angles from any point on the same arc" property is the mathematical basis for a genuine real-world navigation technique, giving the theorem immediate practical significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.circle`, `math.geom.angle-pairs`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: diagram each theorem before the algebraic statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
