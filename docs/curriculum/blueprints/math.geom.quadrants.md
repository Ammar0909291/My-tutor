# Teaching Blueprint: Quadrants (`math.geom.quadrants`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.quadrants` |
| name | Quadrants |
| domain | Geometry |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.geom.coordinate-plane` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — labeled coordinate plane before rules |
| description (KG) | The four regions of the coordinate plane divided by the axes: Quadrant I (x>0, y>0), II (x<0, y>0), III (x<0, y<0), IV (x>0, y<0).

 |

## Component 1 — Learning Objectives

- LO1: Identify which QUADRANT a point $(x,y)$ lies in based on the SIGNS of $x$ and $y$: Quadrant I ($x>0,y>0$), Quadrant II ($x<0,y>0$), Quadrant III ($x<0,y<0$), Quadrant IV ($x>0,y<0$).
- LO2: Recognize the quadrants are numbered COUNTERCLOCKWISE starting from the upper-right (Quadrant I), NOT clockwise and NOT starting from a different corner — a fixed convention, not an arbitrary choice.
- LO3: Recognize that points lying ON an axis (where $x=0$ or $y=0$) belong to NEITHER adjacent quadrant — they are considered to be ON the axis (boundary), not inside any of the four quadrant regions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.coordinate-plane` — quadrants are the four regions this plane is divided into.

## Component 3 — Core Explanation

The coordinate plane is divided by its two axes into four **quadrants**, classified by the SIGNS of a point's coordinates: **Quadrant I** ($x>0$, $y>0$, upper right), **Quadrant II** ($x<0$, $y>0$, upper left), **Quadrant III** ($x<0$, $y<0$, lower left), **Quadrant IV** ($x>0$, $y<0$, lower right).

The numbering follows a fixed, standard CONVENTION — COUNTERCLOCKWISE starting from the upper-right quadrant (I) — this is a memorized convention, not something to be re-derived, and consistently used across all of mathematics.

Points lying exactly ON an axis (where $x=0$ or $y=0$, including the origin itself) belong to NEITHER adjacent quadrant — such points are on the BOUNDARY between quadrants, not classified as being "in" any of the four quadrant regions.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying quadrants from signs, breaking MC-1)**: Identify the quadrant for the points $(3,-2)$, $(-5,4)$, and $(-1,-6)$. $(3,-2)$: $x>0,y<0\Rightarrow$ Quadrant IV. $(-5,4)$: $x<0,y>0\Rightarrow$ Quadrant II. $(-1,-6)$: $x<0,y<0\Rightarrow$ Quadrant III. A common error confuses which sign combination corresponds to which numbered quadrant (e.g. assuming Quadrant II is where BOTH coordinates are negative, mixing it up with Quadrant III) — each quadrant's specific sign combination must be matched to its correct number, following the standard counterclockwise-from-upper-right convention.

**Example 2 (LO3 — points on an axis, breaking MC-2)**: Determine the quadrant for the point $(5,0)$. This point lies ON the x-axis (since $y=0$), so it is NOT in any quadrant — it's on the boundary between Quadrant I and Quadrant IV. A common error forces such a boundary point into one of the two adjacent quadrants (e.g. arbitrarily calling $(5,0)$ "Quadrant I" since $x>0$) — a point with a ZERO coordinate is specifically ON an axis, not inside any quadrant region at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — Matching Sign Combinations to the Correct Quadrant Number (Primitive P64: Conceptual Shift)

Work Example 1, explicitly reviewing all four sign combinations against their correct quadrant numbers using the counterclockwise convention.

- **MC-1 hook**: check whether sign combinations are correctly matched to their quadrant numbers.

### Teaching Action A02 — Axis Points Belong to No Quadrant (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting a genuine interior-quadrant point against a boundary (axis) point.

- **MC-2 hook**: this directly targets MC-2 (forcing an axis point into one of the adjacent quadrants).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Identify the quadrant for $(-4,-9)$.
  2. Identify the quadrant for $(7,2)$.
  3. Identify the quadrant for $(-3,8)$.
  4. Determine the quadrant for the point $(0,-6)$, and explain your reasoning.
- **P76 (Transfer Probe, mode = independence)**: "A robotics simulation tracks a robot's position on a 2D grid centered at its starting point (the origin), where positive x means 'east' and positive y means 'north.' (a) If the robot is currently at position $(-8,5)$, identify which quadrant it's in, and describe its direction from the origin (e.g. 'northwest'). (b) If the robot moves to position $(0,10)$ (due north, exactly on the y-axis), explain why this position isn't classified as being in any quadrant."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUADRANT-SIGN-COMBINATIONS-MISMATCHED-TO-WRONG-QUADRANT-NUMBER | Confusing which sign combination (e.g. both negative) corresponds to which numbered quadrant | Foundational |
| MC-2 | AXIS-POINTS-FORCED-INTO-AN-ADJACENT-QUADRANT-RATHER-THAN-RECOGNIZED-AS-BOUNDARY | Classifying a point lying on an axis (zero coordinate) as belonging to one of the adjacent quadrants, rather than recognizing it's on the boundary | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Quadrant Sign Combinations Mismatched to Wrong Quadrant Number") → P41 (detect: present Example 1 and check whether sign combinations are matched to the correct quadrant number) → P64 (conceptual shift: re-trace the counterclockwise-from-upper-right convention explicitly across all four quadrants).
- **B02 (targets MC-2)**: P27 ("Axis Points Forced into an Adjacent Quadrant Rather Than Recognized as Boundary") → P41 (detect: present Example 2 and check whether the axis point is (incorrectly) assigned to a quadrant) → P64 (conceptual shift: re-examine the coordinates explicitly, confirming a zero coordinate places the point ON an axis, not inside any quadrant).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.coordinate-plane`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.coordinate-plane`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.95 reflects that this is basic, foundational vocabulary expected to become fully automatic.
- MC-1 was ranked Foundational because it produces a genuinely wrong classification, while MC-2 was ranked Moderate as a narrower edge-case handling issue.
- The robotics-navigation transfer probe was deliberately chosen to connect the abstract quadrant convention to intuitive compass directions, reinforcing the counterclockwise numbering through a concrete spatial scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.coordinate-plane`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: labeled coordinate plane before rules) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
