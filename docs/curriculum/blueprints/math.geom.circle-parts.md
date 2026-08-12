# Teaching Blueprint: Parts of a Circle (`math.geom.circle-parts`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle-parts` |
| name | Parts of a Circle |
| domain | Geometry |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.geom.circle` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — labeled circle diagram |
| description (KG) | Radius (center to boundary), diameter (chord through center), chord (segment joining two boundary points), arc (portion of boundary), sector (pie slice), tangent (line touching at one point).

 |

## Component 1 — Learning Objectives

- LO1: Identify RADIUS (a segment from the center to the boundary) and DIAMETER (a CHORD passing THROUGH the center) — and state that the diameter is EXACTLY twice the radius, since it consists of two radii placed end-to-end through the center.
- LO2: Identify CHORD (a segment joining any two points on the boundary — the diameter is the special case passing through the center) and ARC (a portion of the boundary/curve itself, not a straight segment) — distinguishing a chord (straight line) from the arc it "cuts off" (curved boundary piece).
- LO3: Identify SECTOR (a "pie slice" region bounded by two radii and an arc) and TANGENT (a line touching the circle at EXACTLY one point) — and state the key tangent property: a tangent line is always PERPENDICULAR to the radius drawn to the point of tangency.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle` — this concept catalogs the circle's named component parts.

## Component 3 — Core Explanation

A circle has several named parts. The **radius** is a segment from the CENTER to any point on the boundary. The **diameter** is a special CHORD that passes THROUGH the center — since it's made of two radii placed end-to-end (center to one boundary point, extended through the center to the opposite boundary point), the diameter is ALWAYS exactly TWICE the radius.

A **chord** is any segment joining two points on the boundary (the diameter is simply the special chord that happens to pass through the center). An **arc** is a portion of the circle's CURVED boundary itself — distinct from a chord, which is the STRAIGHT segment connecting the arc's two endpoints; a chord and its corresponding arc "cut off" the same two boundary points but are geometrically very different objects (one straight, one curved).

A **sector** is a "pie slice" region bounded by TWO radii and the arc between them. A **tangent** is a line that touches the circle at EXACTLY ONE point — and importantly, a tangent line is ALWAYS PERPENDICULAR to the radius drawn to that single touching point.

## Component 4 — Worked Examples

**Example 1 (LO1 — radius vs. diameter relationship, breaking MC-1)**: Given a circle with radius 7, find the diameter. Diameter $=2\times7=14$. A common error treats radius and diameter as INTERCHANGEABLE or confuses which is which when given a numeric value (e.g. plugging a given "diameter" value directly into a formula expecting "radius," or vice versa) — the diameter is ALWAYS exactly DOUBLE the radius; mixing these up in a formula produces an answer off by a factor of 2 (or 1/2).

**Example 2 (LO2 — chord vs. arc distinction, breaking MC-2)**: For two points on a circle's boundary, identify BOTH the chord and the arc connecting them, and explain the difference. The CHORD is the straight line SEGMENT directly connecting the two points (cutting across the circle's interior). The ARC is the CURVED portion of the boundary itself, going from one point to the other along the circle's edge. A common error treats "chord" and "arc" as synonyms for "the distance between two boundary points," failing to distinguish the STRAIGHT chord (a straight-line segment, measurable with an ordinary ruler) from the CURVED arc (a portion of the circular boundary, generally a LONGER path than the straight chord between the same two points).

**Example 3 (LO3 — tangent perpendicularity)**: For a circle centered at the origin with radius 5, and a tangent line touching the circle at point $(5,0)$, state the direction of the radius to that point and the tangent line's direction. The radius to $(5,0)$ points along the HORIZONTAL direction (from the origin outward along the x-axis). The tangent line at that point must therefore be VERTICAL (perpendicular to the horizontal radius) — confirming the tangent-radius perpendicularity property directly.

## Component 5 — Teaching Actions

### Teaching Action A01 — Diameter Is Always Exactly Twice the Radius (Primitive P64: Conceptual Shift)

Work Example 1, explicitly deriving the diameter from two radii placed end-to-end through the center.

- **MC-1 hook**: check whether the radius/diameter relationship (factor of 2) is correctly applied, not confused or reversed.

### Teaching Action A02 — Chord Is Straight, Arc Is Curved — Distinct Objects for the Same Two Points (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the straight chord against the curved arc connecting the same two boundary points.

- **MC-2 hook**: this directly targets MC-2 (treating chord and arc as synonymous "distance between two points" concepts).

### Teaching Action A03 — Tangent Lines Are Always Perpendicular to the Radius at the Touch Point (reused procedure)

Work Example 3, explicitly verifying the perpendicularity property with a concrete coordinate example.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given a circle with diameter 18, find the radius.
  2. For two points on a circle's boundary, explain the difference between the chord and the arc connecting them.
  3. Sketch (describe) a sector of a circle, identifying its two bounding radii and the arc between them.
  4. Explain why a tangent line drawn at a point on a circle must be perpendicular to the radius at that point.
- **P76 (Transfer Probe, mode = independence)**: "A satellite dish's curved reflector surface is a portion of a circle (in cross-section), and an engineer needs to mount a straight support beam that just TOUCHES the dish's curved edge at exactly one point without crossing into the dish's interior. (a) Identify what type of line this support beam represents (chord, arc, or tangent), and justify your choice. (b) Explain what angle the support beam must make with the radius drawn to that touching point, and why this specific angle is guaranteed by the geometry."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RADIUS-AND-DIAMETER-CONFUSED-OR-USED-INTERCHANGEABLY | Confusing radius and diameter, or using one value in a formula expecting the other, producing an answer off by a factor of 2 | Foundational |
| MC-2 | CHORD-AND-ARC-TREATED-AS-SYNONYMOUS | Treating chord (a straight segment) and arc (a curved boundary portion) as interchangeable concepts, rather than distinct geometric objects for the same two points | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Radius and Diameter Confused or Used Interchangeably") → P41 (detect: present Example 1 and check whether the factor-of-2 relationship is correctly applied) → P64 (conceptual shift: re-derive the diameter explicitly as two end-to-end radii through the center).
- **B02 (targets MC-2)**: P27 ("Chord and Arc Treated as Synonymous") → P41 (detect: present Example 2 and check whether chord and arc are distinguished) → P64 (conceptual shift: re-sketch both the straight chord and the curved arc for the same two points, confirming they are visually and geometrically distinct).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.circle`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is foundational vocabulary expected to become near-automatic, underlying all subsequent circle-related work.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong identification or computation that would propagate into later, more advanced circle problems.
- The satellite-dish transfer probe was deliberately chosen because the tangent-line concept has an immediately concrete engineering application (a support beam touching a curved surface at one point), grounding the perpendicularity property in a physical scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.circle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: labeled circle diagram) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
