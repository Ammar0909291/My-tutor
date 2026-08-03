# Teaching Blueprint: Length (`math.geom.length`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.length` |
| name | Length |
| domain | Geometry |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.geom.line-segment` |
| unlocks | `math.geom.distance-formula` |
| cross_links | `math.geom.distance-formula` |
| CPA_entry_stage | C (Concrete) — physical measurement before abstraction |
| description (KG) | The one-dimensional measure of a line segment; extended to curves via arc length.

 |

## Component 1 — Learning Objectives

- LO1: Define LENGTH as the one-dimensional measure of a line segment — a single non-negative number representing "how far apart" the segment's two endpoints are.
- LO2: Recognize that length is ALWAYS non-negative — a "negative length" is not a meaningful geometric quantity, unlike, say, a signed coordinate difference.
- LO3: Recognize that the length concept EXTENDS beyond straight segments to CURVES via arc length (previewing `math.calc.arc-length`) — length is fundamentally about measuring "how far you'd travel along" a path, whether straight or curved.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.line-segment` — length is the measure assigned to a segment.

## Component 3 — Core Explanation

**Length** is the one-dimensional measure of a line segment — a single non-negative number quantifying the distance between its two endpoints. Length is ALWAYS non-negative: it represents a magnitude (how far apart two points are), never a signed or negative quantity, even though the underlying coordinate DIFFERENCES used to compute it (in later formulas) may be negative before being converted to a length via absolute value or squaring.

The concept of length extends beyond straight segments: the length of a CURVED path is called ARC LENGTH — measuring "how far you'd travel" if you walked along the curve from one end to the other, generalizing the straight-segment case to curved ones (a full treatment appears in `math.calc.arc-length`).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — length as a non-negative measure, breaking MC-1)**: For a segment from point $A$ to point $B$, and the same segment traversed from $B$ to $A$, state the length in each direction. In BOTH directions, the length is the SAME non-negative number — length doesn't depend on which endpoint is called "the start." A common error, when computing length via a coordinate subtraction (e.g. $x_B-x_A$), leaves the result NEGATIVE if $x_A>x_B$, reporting a "negative length" — length must be the ABSOLUTE VALUE (or otherwise non-negative form) of any such difference; a raw signed subtraction is not yet the length itself.

**Example 2 (LO3 — extending to curves)**: Explain, conceptually, what it would mean to measure the "length" of a winding hiking trail (a curved path) rather than a straight segment. The trail's length is the total distance you'd walk along its curved path from start to end — this generalizes the straight-segment length concept to curves, and is formally called ARC LENGTH.

## Component 5 — Teaching Actions

### Teaching Action A01 — Length Is Always Non-Negative, Even When Computed from a Signed Difference (Primitive P64: Conceptual Shift)

Work Example 1, explicitly converting a signed coordinate difference into a genuine non-negative length via absolute value.

- **MC-1 hook**: check whether a genuinely non-negative length value is reported, not a raw (possibly negative) coordinate difference.

### Teaching Action A02 — Length Extends to Curves as Arc Length (reused procedure)

Present Example 2, previewing the arc-length generalization.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Explain why length must always be reported as a non-negative number.
  2. Given a segment where a coordinate subtraction gives $-7$, state the segment's actual length.
  3. Explain, in your own words, what "arc length" measures for a curved path.
  4. Explain why a segment's length is the same regardless of which endpoint you consider the "start."
- **P76 (Transfer Probe, mode = independence)**: "A GPS app calculates the straight-line ('as the crow flies') length between two hiking trailheads as 3.2 km, but the actual winding trail connecting them is much longer. (a) Explain why these two 'length' measurements (straight-line vs. trail) are both valid length concepts, but represent different quantities. (b) Explain which one is genuinely an example of 'arc length' as introduced in this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LENGTH-REPORTED-AS-A-NEGATIVE-VALUE-FROM-AN-UNCONVERTED-SIGNED-DIFFERENCE | Reporting a length as negative when computed from a signed coordinate subtraction, without converting to a non-negative value | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Length Reported as a Negative Value from an Unconverted Signed Difference") → P41 (detect: present Example 1 and check whether a negative value is (incorrectly) reported as the length) → P64 (conceptual shift: re-apply the absolute value explicitly, confirming length is always non-negative).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.line-segment`.
- **Unlocks**: `math.geom.distance-formula`.
- **Related**: `math.geom.area`, `math.geom.perimeter`.
- **Cross-links**: `math.geom.distance-formula`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.95 reflects that this is an extremely foundational concept expected to be fully automatic.
- Only one misconception is registered, reflecting the concept's genuine simplicity at this introductory level — the primary pitfall is the sign issue when length is later computed via coordinate subtraction.
- The GPS-trail transfer probe was deliberately chosen to make the straight-length-vs-arc-length distinction concrete and familiar from everyday technology use.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.line-segment`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.geom.distance-formula`) |
| V-5 | cross_links checked against disk | PASS (`math.geom.distance-formula`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (1 entry) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical measurement before abstraction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
