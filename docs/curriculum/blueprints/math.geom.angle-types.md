# Teaching Blueprint: Types of Angles (`math.geom.angle-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.angle-types` |
| name | Types of Angles |
| domain | Geometry |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.geom.angle` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — visual angle examples before naming |
| description (KG) | Classification of angles: acute (0°–90°), right (90°), obtuse (90°–180°), straight (180°), reflex (180°–360°).

 |

## Component 1 — Learning Objectives

- LO1: Classify an angle as ACUTE (between $0°$ and $90°$, EXCLUSIVE of both endpoints), RIGHT (exactly $90°$), OBTUSE (between $90°$ and $180°$), STRAIGHT (exactly $180°$), or REFLEX (between $180°$ and $360°$), given its measure.
- LO2: Correctly handle the BOUNDARY cases — $90°$ is RIGHT (not acute or obtuse), and $180°$ is STRAIGHT (not obtuse or reflex) — these exact-value categories are distinct from the open-interval ranges around them.
- LO3: Recognize that a reflex angle and its corresponding "regular" angle (measuring less than $180°$) are the SAME two rays, just measured on OPPOSITE sides — the reflex measure is $360°$ minus the smaller angle's measure.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.angle` (the basic concept of an angle and its measure).

## Component 3 — Core Explanation

Angles are classified by their measure: **acute** ($0°<\theta<90°$), **right** (exactly $\theta=90°$), **obtuse** ($90°<\theta<180°$), **straight** (exactly $\theta=180°$), and **reflex** ($180°<\theta<360°$).

The BOUNDARY values ($90°$, $180°$) are their OWN distinct categories, not simply "borderline acute/obtuse" or "borderline obtuse/reflex" — an angle is EITHER exactly right/straight, or strictly within one of the open-interval ranges, never both.

A reflex angle measures the SAME pair of rays as its non-reflex counterpart, just measured going the "long way around" — if the smaller angle between two rays is $\theta$, the reflex angle (the other way around) measures $360°-\theta$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — classification with a boundary case, breaking MC-1)**: Classify angles of $45°$, $90°$, and $120°$. $45°$ is ACUTE ($0°<45°<90°$). $90°$ is RIGHT (exactly, not "borderline acute"). $120°$ is OBTUSE ($90°<120°<180°$). A common error classifies $90°$ as "acute" (reasoning it's "close to acute range") or ambiguously as "acute or obtuse" — $90°$ is its OWN distinct category, RIGHT, never acute or obtuse.

**Example 2 (LO3 — reflex angle relationship, breaking MC-2)**: Given two rays forming a $70°$ angle (the smaller angle between them), find the REFLEX angle they also form. Reflex angle $=360°-70°=290°$. A common error assumes the reflex angle is simply $180°-70°=110°$ (confusing "reflex" with "supplementary") — reflex specifically means MORE than $180°$, measured as the FULL remaining rotation around the two rays, computed as $360°$ minus the smaller angle, NOT $180°$ minus it.

## Component 5 — Teaching Actions

### Teaching Action A01 — Boundary Values (90°, 180°) Are Their Own Exact Categories (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the open-interval categories against the exact boundary categories.

- **MC-1 hook**: this directly targets MC-1 (misclassifying an exact boundary value as belonging to an adjacent open-interval category).

### Teaching Action A02 — Reflex Angle Equals 360° Minus the Smaller Angle (Primitive P64: Conceptual Shift)

Work Example 2, explicitly deriving the reflex angle from the full-rotation relationship.

- **MC-2 hook**: this directly targets MC-2 (confusing reflex angle computation with supplementary-angle computation).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Classify angles of $30°$, $180°$, and $200°$.
  2. Classify an angle of exactly $90°$, explaining why it is not acute or obtuse.
  3. Given a $55°$ angle between two rays, find the reflex angle.
  4. Explain, in one sentence, the difference between a reflex angle and a supplementary angle.
- **P76 (Transfer Probe, mode = independence)**: "A robotic arm's joint can rotate through any angle from $0°$ to $360°$. A technician needs to program the joint to move to a position forming a $250°$ angle from its starting orientation. (a) Classify this $250°$ angle. (b) Find the smaller ('non-reflex') angle between the arm's start and end positions, and explain the relationship between these two angle measures."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDARY-ANGLE-VALUES-MISCLASSIFIED-AS-ADJACENT-OPEN-INTERVAL-CATEGORY | Classifying an exact boundary angle (90° or 180°) as belonging to an adjacent open-interval category (acute/obtuse or obtuse/reflex) instead of its own exact category | Moderate |
| MC-2 | REFLEX-ANGLE-COMPUTED-AS-SUPPLEMENTARY-INSTEAD-OF-360-MINUS-THE-ANGLE | Computing a reflex angle as 180° minus the given angle (confusing it with a supplementary angle) instead of 360° minus the given angle | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Boundary Angle Values Misclassified as Adjacent Open-Interval Category") → P41 (detect: present Example 1 and check whether $90°$ is (incorrectly) classified as acute or obtuse) → P64 (conceptual shift: re-state each category's precise boundary, confirming exact values get their own category).
- **B02 (targets MC-2)**: P27 ("Reflex Angle Computed as Supplementary Instead of 360 Minus the Angle") → P41 (detect: present Example 2 and check whether $180°-\theta$ is (incorrectly) used) → P64 (conceptual shift: re-derive using the full $360°$ rotation, confirming the reflex angle is the REMAINING portion of a full circle).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.angle`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.angle-measurement`.
- **Parent**: `math.geom.angle`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.95 (very high) reflects that this is basic classification vocabulary expected to be near-automatic once learned.
- MC-2 was ranked Foundational because confusing reflex with supplementary produces a genuinely wrong numerical answer, not just a labeling slip.
- The robotic-arm transfer probe was deliberately chosen to give reflex-angle classification concrete engineering relevance (full-rotation joints), beyond an abstract vocabulary drill.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.angle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: visual angle examples before naming) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
