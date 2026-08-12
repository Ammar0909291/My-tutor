# Teaching Blueprint: Area of a Circle (`math.geom.circle-area`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle-area` |
| name | Area of a Circle |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.circle`, `math.geom.area` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A = πr²; derivable via integration or as the limit of inscribed regular polygon areas.

 |

## Component 1 — Learning Objectives

- LO1: Apply the circle area formula $A=\pi r^2$, using the RADIUS specifically — a common error uses the diameter directly in place of $r$.
- LO2: Correctly convert a given DIAMETER to radius (dividing by 2) BEFORE applying the area formula, when only the diameter is provided.
- LO3: Understand (at a conceptual level, without full derivation) that $A=\pi r^2$ can be justified as the LIMIT of inscribed regular polygon areas as the number of sides $n\to\infty$ (connecting to `math.geom.regular-polygon`'s limiting-circle idea) — the formula isn't an arbitrary rule but a genuine consequence of this limiting process.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle` (the shape itself) and `math.geom.area` (the general concept of enclosed-region measurement).

## Component 3 — Core Explanation

The area of a circle is $A=\pi r^2$, where $r$ is the RADIUS. This formula uses the radius specifically — if only the DIAMETER is given, it must be converted to radius (dividing by 2) BEFORE substituting into the formula, since using the diameter directly in place of $r$ would produce an answer 4 times too large (since $(2r)^2=4r^2$, not $r^2$).

This formula isn't an arbitrary memorized rule — it can be justified as the LIMIT of INSCRIBED REGULAR POLYGON areas as the number of sides $n$ grows toward infinity (connecting directly to `math.geom.regular-polygon`'s observation that a regular $n$-gon approaches a circle's shape as $n\to\infty$). As the polygon's side count increases, its area gets closer and closer to $\pi r^2$, providing genuine geometric justification for the formula beyond rote memorization.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic application, breaking MC-1)**: Find the area of a circle with radius 6. $A=\pi(6)^2=36\pi$. A common error, when GIVEN the DIAMETER instead of the radius (e.g. "a circle with diameter 6"), plugs the diameter value DIRECTLY into the formula as if it were $r$ (computing $\pi(6)^2=36\pi$ when the TRUE radius is 3, giving the correct $\pi(3)^2=9\pi$) — the formula specifically requires the RADIUS; using the diameter value directly produces an answer 4 times too large.

**Example 2 (LO2 — converting diameter to radius first)**: Find the area of a circle with diameter 10. First convert: $r=10/2=5$. Then apply the formula: $A=\pi(5)^2=25\pi$.

**Example 3 (LO3 — the polygon-limit justification, breaking MC-2)**: Explain, conceptually, why $A=\pi r^2$ makes sense as a limiting case, using the sequence of inscribed regular polygons (hexagon, dodecagon, 100-gon, ...) from `math.geom.regular-polygon`. As the number of sides $n$ increases, each inscribed regular $n$-gon's area gets closer to the true circle's area, approaching $\pi r^2$ in the limit as $n\to\infty$ — this gives genuine geometric justification for the formula, rather than treating it as an arbitrary rule to memorize. A common error treats $A=\pi r^2$ as a purely arbitrary formula with no deeper justification, disconnected from the polygon-approximation idea already learned — recognizing the CONNECTION between these two concepts (regular polygons approaching a circle, and the circle's area formula) deepens understanding beyond rote formula application.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Requires Radius, Not Diameter (Primitive P06: Contrast Pair)

Work Example 1, contrasting the correct radius-based computation against the incorrect diameter-substituted-directly computation.

- **MC-1 hook**: this directly targets MC-1 (substituting the diameter directly for $r$).

### Teaching Action A02 — Convert Diameter to Radius First When Necessary (reused procedure)

Work Example 2, explicitly performing the diameter-to-radius conversion step before applying the formula.

### Teaching Action A03 — Connecting the Formula to the Polygon-Limit Justification (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting back to `math.geom.regular-polygon`'s limiting-circle observation.

- **MC-2 hook**: this directly targets MC-2 (treating the formula as arbitrary, disconnected from the polygon-approximation justification).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the area of a circle with radius 9.
  2. Find the area of a circle with diameter 14, converting to radius first.
  3. Explain, in one sentence, why using the diameter directly in place of r in the area formula gives an answer 4 times too large.
  4. Explain how the sequence of inscribed regular polygons with increasing side counts justifies the circle area formula.
- **P76 (Transfer Probe, mode = independence)**: "A pizza company advertises a 'large' pizza as having a 16-inch DIAMETER, and a customer wants to know the actual area of pizza they're getting to compare value against a competitor's pizza measured by radius. (a) Calculate the large pizza's area, being careful to convert diameter to radius first. (b) Explain what mistake the customer would make (and how much they'd overestimate the area) if they plugged the 16-inch diameter directly into the area formula as if it were the radius."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIAMETER-SUBSTITUTED-DIRECTLY-FOR-RADIUS-IN-AREA-FORMULA | Plugging a given diameter value directly into the area formula in place of r, producing an answer 4 times too large | Foundational |
| MC-2 | AREA-FORMULA-TREATED-AS-ARBITRARY-WITHOUT-CONNECTING-TO-THE-POLYGON-LIMIT-JUSTIFICATION | Treating πr² as an arbitrary memorized rule without recognizing its justification as the limit of inscribed regular polygon areas | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Diameter Substituted Directly for Radius in Area Formula") → P41 (detect: present Example 1 and check whether diameter is (incorrectly) substituted directly) → P64 (conceptual shift: re-verify which value is given (diameter vs. radius) and convert if necessary before substituting).
- **B02 (targets MC-2)**: P27 ("Area Formula Treated as Arbitrary Without Connecting to the Polygon-Limit Justification") → P41 (detect: ask the student to explain WHY the formula holds, checking whether the polygon-limit connection is made) → P64 (conceptual shift: re-walk through the inscribed-regular-polygon sequence explicitly, connecting each polygon's area getting closer to $\pi r^2$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle`, `math.geom.area`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.circle-circumference`, `math.geom.regular-polygon` (the limiting-process justification).

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this formula is foundational and expected to become near-automatic in application.
- MC-1 was ranked Foundational because it produces a substantially wrong numeric answer (4x too large), while MC-2 was ranked Minor since it reflects a missed conceptual connection rather than an incorrect computation.
- The pizza-diameter-vs-radius transfer probe was deliberately chosen because diameter/radius confusion in real-world size claims (like pizza advertising) is a genuinely common consumer-facing pitfall.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.circle`, `math.geom.area`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
