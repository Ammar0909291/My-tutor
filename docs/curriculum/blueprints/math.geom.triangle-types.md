# Teaching Blueprint: Types of Triangles (`math.geom.triangle-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.triangle-types` |
| name | Types of Triangles |
| domain | Geometry |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.triangle` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — visual triangle examples before naming |
| description (KG) | Classification by sides: scalene (all sides different), isosceles (two sides equal), equilateral (all sides equal). By angles: acute, right, obtuse.

 |

## Component 1 — Learning Objectives

- LO1: Classify a triangle BY SIDES as SCALENE (all three sides different lengths), ISOSCELES (at least two sides equal), or EQUILATERAL (all three sides equal).
- LO2: Classify a triangle BY ANGLES as ACUTE (all three angles $<90°$), RIGHT (one angle exactly $90°$), or OBTUSE (one angle $>90°$) — and recognize these two classification systems (by sides, by angles) are INDEPENDENT — a triangle gets ONE label from EACH system simultaneously (e.g. "isosceles right triangle").
- LO3: Recognize that EQUILATERAL triangles are ALWAYS equiangular (all angles exactly $60°$), hence always ACUTE — this is a special, GUARANTEED overlap between the two classification systems, not a coincidence needing separate verification each time.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` (the basic triangle concept).

## Component 3 — Core Explanation

Triangles are classified in TWO independent ways. BY SIDES: **scalene** (all three sides different), **isosceles** (at least two sides equal), **equilateral** (all three sides equal). BY ANGLES: **acute** (all angles $<90°$), **right** (one angle exactly $90°$), **obtuse** (one angle $>90°$).

These two systems are INDEPENDENT — a single triangle gets ONE classification from EACH system, combined (e.g. a triangle can be "scalene and obtuse," "isosceles and right," etc.). Classifying by sides tells you nothing directly about the angle classification, and vice versa, EXCEPT in one guaranteed special case: an EQUILATERAL triangle (all sides equal) is ALWAYS also EQUIANGULAR (all angles equal, each exactly $60°$, since the angles sum to $180°$), and since $60°<90°$, an equilateral triangle is ALWAYS acute — this single overlap is guaranteed by geometry, not something requiring separate case-by-case checking.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — combining both classification systems, breaking MC-1)**: Classify a triangle with sides 5, 5, 8 and angles that work out to be $\{51.3°,51.3°,77.4°\}$ (approximately). By sides: ISOSCELES (two sides equal, 5 and 5). By angles: ACUTE (all angles $<90°$). Full classification: "isosceles acute triangle." A common error assumes the SIDE classification alone determines the angle classification (e.g. assuming "isosceles" implies something specific about the angles beyond the two equal base angles) — the two systems must be evaluated SEPARATELY and independently, then combined.

**Example 2 (LO3 — the guaranteed equilateral-implies-acute overlap)**: Classify an equilateral triangle (all sides equal) by angles. Since all sides are equal, ALL angles are also equal (equiangular) — and since the three angles sum to $180°$, each angle is exactly $180°/3=60°$. Since $60°<90°$, the triangle is ALWAYS acute — this holds for EVERY equilateral triangle, guaranteed by the geometry, not something that needs individual verification for each specific equilateral triangle encountered.

**Example 3 (LO1, LO2 — a case with no overlap guarantee, breaking MC-2)**: Classify a triangle with sides 3, 4, 5 (a right triangle, since $3^2+4^2=5^2$) by sides. Since all three sides (3, 4, 5) are DIFFERENT, this is SCALENE — even though it's also a RIGHT triangle by angles. A common error assumes a right triangle must be isosceles (perhaps from over-familiarity with 45-45-90 right triangles specifically) — right triangles can be scalene (like 3-4-5), isosceles (like 45-45-90), but NEVER equilateral (since an equilateral triangle is always acute, per Example 2's guarantee) — the side classification must be checked independently for each specific right triangle.

## Component 5 — Teaching Actions

### Teaching Action A01 — Classify by Sides and by Angles Independently, Then Combine (Primitive P64: Conceptual Shift)

Work Example 1, explicitly performing both classifications separately before combining into the full description.

- **MC-1 hook**: this directly targets MC-1 (assuming one classification system determines the other).

### Teaching Action A02 — Equilateral Guarantees Acute, But No Other Overlaps Are Guaranteed (Primitive P06: Contrast Pair)

Work Example 2 (the guaranteed case) alongside Example 3 (a non-guaranteed case), explicitly contrasting the one true guarantee against cases requiring independent verification.

- **MC-2 hook**: this directly targets MC-2 (over-generalizing from familiar special cases, like assuming right triangles must be isosceles).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Classify a triangle with sides 6, 6, 6 by both sides and angles.
  2. Classify a triangle with sides 7, 9, 12 (given it works out to have one obtuse angle) by both sides and angles.
  3. Explain why an equilateral triangle is always acute.
  4. Give an example (sides and rough angle description) of a right triangle that is scalene, and explain why this shows right triangles aren't always isosceles.
- **P76 (Transfer Probe, mode = independence)**: "A structural engineer is choosing triangular support brackets for a bridge, and needs brackets classified both by their side lengths (for material-cutting purposes) and by their angles (for load-bearing analysis, since obtuse-angled brackets distribute force differently than acute ones). (a) Explain why the engineer cannot determine the angle classification just from knowing the bracket is 'isosceles,' and must check the actual angles separately. (b) If a bracket design specifies an equilateral triangle, explain what the engineer can immediately conclude about its angles without further calculation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIDE-CLASSIFICATION-ASSUMED-TO-DETERMINE-ANGLE-CLASSIFICATION | Assuming a triangle's side classification (scalene/isosceles/equilateral) directly determines its angle classification, rather than checking the two systems independently | Foundational |
| MC-2 | RIGHT-TRIANGLES-ASSUMED-TO-ALWAYS-BE-ISOSCELES | Assuming right triangles must always be isosceles (over-generalizing from the familiar 45-45-90 case), rather than recognizing right triangles can be scalene, isosceles, but never equilateral | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Side Classification Assumed to Determine Angle Classification") → P41 (detect: present Example 1 and check whether the angle classification is (incorrectly) inferred from the side classification alone) → P64 (conceptual shift: re-classify by both systems independently, confirming they must each be checked separately).
- **B02 (targets MC-2)**: P27 ("Right Triangles Assumed to Always Be Isosceles") → P41 (detect: present Example 3's 3-4-5 case and check whether it's (incorrectly) assumed isosceles) → P64 (conceptual shift: re-check the actual side lengths explicitly, confirming scalene right triangles exist).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.triangle`.
- **Parent**: `math.geom.triangle`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that while this is foundational vocabulary, correctly recognizing the independence of the two classification systems requires genuine care.
- MC-1 was ranked Foundational because it reflects a structural misunderstanding of how the two classification systems relate, while MC-2 was ranked Moderate as a narrower over-generalization from a single familiar example.
- The bridge-bracket transfer probe was deliberately chosen because both classification systems (sides for manufacturing, angles for structural analysis) have genuinely distinct real-world purposes, motivating why they must be tracked independently.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.triangle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: visual triangle examples before naming) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1/LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
