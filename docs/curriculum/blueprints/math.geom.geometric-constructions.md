# Teaching Blueprint: Geometric Constructions (`math.geom.geometric-constructions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.geometric-constructions` |
| name | Geometric Constructions |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.geom.triangle`, `math.geom.circle` |
| unlocks | (none in KG) |
| cross_links | `math.abst.galois-theory` |
| CPA_entry_stage | C (Concrete) — hands-on compass-and-straightedge practice |
| description (KG) | Constructions achievable using only compass and straightedge; includes bisecting angles and segments, constructing regular polygons; Galois theory classifies which are possible. |

## Component 1 — Learning Objectives

- LO1: Perform classic COMPASS-AND-STRAIGHTEDGE constructions — bisecting a SEGMENT (finding its midpoint via two intersecting arcs) and bisecting an ANGLE (via arcs from the vertex and from two points on the rays) — using ONLY these two tools, no measuring devices like a ruler's markings or a protractor.
- LO2: Recognize the STRICT LIMITATION of "compass and straightedge" — the straightedge may draw a line through two points but has NO markings for measuring length, and the compass may draw a circle but cannot be "locked" to transfer a length in ways beyond its basic drawing function — many familiar shortcuts (like directly measuring a length with a ruler) are NOT valid constructions under these rules.
- LO3: Recognize that NOT every geometric construction is achievable with compass and straightedge alone — some famous problems (like trisecting an arbitrary angle, or doubling a cube) are PROVABLY IMPOSSIBLE under these strict rules, a fact rigorously established by GALOIS THEORY (a deep algebraic tool classifying exactly which constructions are possible).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` and `math.geom.circle` — both are used extensively as the basic building blocks of classical constructions.

## Component 3 — Core Explanation

**Geometric constructions** use ONLY a COMPASS (drawing circles/arcs of any radius, centered anywhere) and a STRAIGHTEDGE (drawing a straight line through two given points) — critically, NEITHER tool has any length-MEASURING capability; the straightedge has no ruler markings, and the compass cannot be pre-set to some given length in ways beyond drawing a circle of that radius once established by two points already on the page.

Classic constructions include BISECTING a segment (drawing two arcs of equal radius from each endpoint, finding their two intersection points, and connecting those points — the resulting line crosses the original segment at its exact midpoint, perpendicular to it) and BISECTING an angle (drawing an arc from the vertex crossing both rays, then arcs of equal radius from those two crossing points, finding their intersection, and connecting it to the vertex).

A profound mathematical fact: NOT every conceivable construction is achievable this way. Some famous classical problems — TRISECTING an arbitrary angle (dividing it into three equal parts), and DOUBLING A CUBE (constructing a cube with exactly twice the volume of a given cube) — are PROVABLY IMPOSSIBLE using compass and straightedge alone, no matter how cleverly attempted. This impossibility is rigorously proven using GALOIS THEORY (an advanced algebraic framework, `math.abst.galois-theory`), which classifies EXACTLY which lengths/angles/constructions are achievable, based on which algebraic operations (essentially, taking square roots repeatedly) compass-and-straightedge constructions can perform.

## Component 4 — Worked Examples

**Example 1 (LO1 — bisecting a segment, breaking MC-1)**: Describe the compass-and-straightedge steps to bisect segment $AB$. Draw an arc of radius GREATER than half of $AB$ centered at $A$; draw an arc of the SAME radius centered at $B$; these two arcs intersect at two points (one on each side of $AB$); draw the straight line connecting these two intersection points — it crosses $AB$ at its exact midpoint, perpendicular to $AB$. A common error attempts to bisect the segment by simply "eyeballing" the midpoint or measuring with a ruler's length markings — a valid COMPASS-AND-STRAIGHTEDGE construction must use ONLY the two tools' basic drawing capabilities (arcs and straight connecting lines), never direct length measurement.

**Example 2 (LO2 — recognizing tool limitations, breaking MC-2)**: Determine whether "measuring a given segment's length with a ruler, then using that number to mark off an equal length elsewhere" counts as a valid compass-and-straightedge construction. NO — this uses the ruler's MEASURING markings, which is NOT part of the strict compass-and-straightedge toolkit; the VALID way to transfer a length is to open the compass to match the given segment's endpoints (using it purely as a "distance holder," never reading off a numeric measurement) and then draw an arc of that same radius elsewhere. A common error assumes any method that achieves the same visual RESULT (an equal-length segment) counts as "a construction," rather than recognizing the RULES specifically restrict WHICH operations are permitted (no numeric measurement, only compass/straightedge drawing operations).

**Example 3 (LO3 — impossibility of angle trisection)**: State why an arbitrary angle cannot, in general, be trisected using compass and straightedge alone (without fully deriving the Galois-theoretic proof). While BISECTING an angle (dividing into 2 equal parts) is always possible, TRISECTING an arbitrary angle (dividing into 3 equal parts) is PROVABLY IMPOSSIBLE for most angles — this isn't a matter of insufficient cleverness or a still-unsolved open problem, but a RIGOROUSLY PROVEN impossibility (via Galois theory, connecting constructible lengths to specific algebraic properties that a general angle-trisection would require but that compass-and-straightedge operations cannot achieve).

## Component 5 — Teaching Actions

### Teaching Action A01 — Bisecting a Segment via Two Equal-Radius Arcs (Primitive C: Concrete Hands-On Construction)

Work Example 1, physically (or via careful diagram) performing the segment-bisection construction step by step.

- **MC-1 hook**: check whether only valid compass/straightedge operations (arcs, connecting lines) are used, not direct measurement.

### Teaching Action A02 — Strict Tool Limitations: No Ruler Markings, No Measured Transfer (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting a valid compass-based length transfer against an invalid ruler-measurement-based shortcut.

- **MC-2 hook**: this directly targets MC-2 (assuming any method achieving the same visual result counts as a valid construction, regardless of the specific operations used).

### Teaching Action A03 — Some Constructions Are Provably Impossible, Not Just Unsolved (Primitive P64: Conceptual Shift)

Present Example 3, emphasizing the RIGOROUS impossibility (via Galois theory) rather than mere difficulty.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Describe the compass-and-straightedge steps to bisect a given angle.
  2. Explain why using a ruler's numeric markings to measure and transfer a length is not a valid compass-and-straightedge operation.
  3. Explain the difference between "bisecting" an angle (always possible) and "trisecting" an arbitrary angle (generally impossible) with compass and straightedge.
  4. Explain, in your own words, what it means for Galois theory to "classify" which constructions are possible.
- **P76 (Transfer Probe, mode = independence)**: "A mathematics history student learns that ancient Greek geometers spent centuries attempting to trisect an arbitrary angle using only compass and straightedge, never succeeding. (a) Explain why their repeated failure was NOT due to lack of cleverness or insufficient technique, but a fundamental mathematical impossibility. (b) Explain, at a high level, how a rigorous algebraic proof (via Galois theory) can establish that NO clever construction technique, however sophisticated, could ever succeed at this particular task."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONSTRUCTION-PERFORMED-VIA-DIRECT-MEASUREMENT-INSTEAD-OF-VALID-COMPASS-STRAIGHTEDGE-STEPS | Attempting to bisect a segment or angle via direct measurement (ruler/protractor) rather than the valid arc-based compass-and-straightedge steps | Moderate |
| MC-2 | ANY-METHOD-ACHIEVING-THE-SAME-VISUAL-RESULT-ASSUMED-VALID-REGARDLESS-OF-OPERATIONS-USED | Assuming any method achieving the same visual outcome counts as a valid construction, rather than recognizing the strict rules on which specific operations (arcs, connecting lines, no measurement) are permitted | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Construction Performed via Direct Measurement Instead of Valid Compass-Straightedge Steps") → P41 (detect: present Example 1 and check whether direct measurement is used instead of the arc-based method) → P64 (conceptual shift: re-perform the construction using only valid arc-drawing and line-connecting steps).
- **B02 (targets MC-2)**: P27 ("Any Method Achieving the Same Visual Result Assumed Valid Regardless of Operations Used") → P41 (detect: present Example 2 and check whether a measurement-based shortcut is (incorrectly) accepted as valid) → P64 (conceptual shift: re-state the strict rules explicitly, distinguishing "achieving the same result" from "using only the permitted operations").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle`, `math.geom.circle`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.abst.galois-theory` (the advanced algebraic tool proving impossibility results for this concept).

## Component 8 — Teaching Notes

- estimated_hours = 10 (the highest in this batch) reflects the genuine breadth of classical constructions to master, plus the conceptually rich impossibility results connecting to abstract algebra.
- MC-2 was ranked Foundational because it reflects a fundamental misunderstanding of what "a construction" even means under these formal rules, while MC-1 was ranked Moderate as primarily a practical execution habit (reaching for a ruler out of convenience) rather than a deep conceptual confusion.
- The angle-trisection-history transfer probe was deliberately chosen because the genuine historical multi-century failure to trisect angles is a compelling, memorable illustration of the difference between "hard" and "provably impossible," directly previewing the Galois-theory connection.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.triangle`, `math.geom.circle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.abst.galois-theory`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: hands-on compass-and-straightedge practice) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
