# Teaching Blueprint: Parallelogram (`math.geom.parallelogram`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.parallelogram` |
| name | Parallelogram |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.geom.quadrilateral` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — nested-category diagram before definitions |
| description (KG) | A quadrilateral with both pairs of opposite sides parallel; includes rectangles (90° angles), rhombuses (all sides equal), and squares (both).

 |

## Component 1 — Learning Objectives

- LO1: Define a PARALLELOGRAM as a quadrilateral with BOTH pairs of opposite sides parallel, and identify RECTANGLE (all angles $90°$), RHOMBUS (all sides equal), and SQUARE (both conditions) as SPECIAL CASES of the parallelogram — not separate, unrelated shape categories.
- LO2: Recognize the NESTED HIERARCHY: every square IS a rhombus AND a rectangle; every rectangle and every rhombus IS a parallelogram; but NOT every parallelogram is a rectangle or rhombus — the relationship is a one-way SUBSET containment, not an equivalence.
- LO3: State the key parallelogram PROPERTIES that follow from the parallel-sides definition: opposite sides are EQUAL in length, opposite angles are EQUAL, and the diagonals BISECT each other (cut each other exactly in half).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.quadrilateral` — the parallelogram is a specific, defined subtype.

## Component 3 — Core Explanation

A **parallelogram** is a quadrilateral with BOTH pairs of opposite sides PARALLEL. Three important SPECIAL CASES exist within this category: a **rectangle** (a parallelogram with all four angles exactly $90°$), a **rhombus** (a parallelogram with all four sides equal length), and a **square** (a parallelogram satisfying BOTH conditions — all right angles AND all equal sides).

These form a NESTED HIERARCHY, not four separate categories: every SQUARE is automatically both a rectangle (right angles) AND a rhombus (equal sides); every rectangle and every rhombus is automatically a parallelogram (since both satisfy the parallel-sides definition); but the containment goes only ONE WAY — a general parallelogram is NOT necessarily a rectangle (its angles needn't be $90°$) or a rhombus (its sides needn't be equal).

From the basic parallel-sides definition, several PROPERTIES follow (provable, not additional assumptions): opposite SIDES are equal in length; opposite ANGLES are equal; and the two DIAGONALS BISECT each other (each diagonal cuts the other exactly into two equal halves at their intersection point).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — nested hierarchy, breaking MC-1)**: Determine whether "every rectangle is a parallelogram" and "every parallelogram is a rectangle" are each true or false. "Every rectangle is a parallelogram" — TRUE (a rectangle satisfies the parallel-sides condition, plus the extra right-angle condition). "Every parallelogram is a rectangle" — FALSE (a general parallelogram's angles need not be $90°$; a "leaning" parallelogram with $70°/110°$ angles is a valid parallelogram but not a rectangle). A common error treats the relationship as a two-way EQUIVALENCE (assuming "parallelogram" and "rectangle" are interchangeable terms, or that any property proven for parallelograms automatically fails to distinguish rectangles as special) — the containment is a ONE-WAY subset relationship, not symmetric.

**Example 2 (LO3 — diagonals bisecting each other, breaking MC-2)**: For a parallelogram with diagonals intersecting at point $P$, if one diagonal has total length 10, find the length of EACH half from a vertex to $P$. Since the diagonals BISECT each other, each half is $10/2=5$. A common error assumes the diagonals are also EQUAL in length to each other (confusing "bisect each other" with "are equal in length") — bisection means EACH diagonal is cut in half by the OTHER, but this says nothing about whether the TWO diagonals have the same total length as each other (they generally do NOT, except in the special case of a rectangle, where the diagonals ARE additionally equal in length).

## Component 5 — Teaching Actions

### Teaching Action A01 — The Nested Hierarchy Is a One-Way Containment (Primitive P06: Contrast Pair)

Work Example 1, explicitly testing both directions of the implication ("rectangle $\Rightarrow$ parallelogram" vs. "parallelogram $\Rightarrow$ rectangle") to show only one direction holds.

- **MC-1 hook**: this directly targets MC-1 (treating the nested hierarchy as a two-way equivalence).

### Teaching Action A02 — Diagonals Bisecting Each Other Is Not the Same as Diagonals Being Equal (Primitive P64: Conceptual Shift)

Work Example 2, explicitly distinguishing "bisect each other" from "equal length," noting the latter is a rectangle-specific extra property.

- **MC-2 hook**: this directly targets MC-2 (confusing bisection with equal diagonal lengths).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Determine whether "every square is a rhombus" is true, and justify.
  2. Determine whether "every rhombus is a square" is true, and justify.
  3. For a parallelogram with diagonals of total length 8 and 14 intersecting at point $P$, find the length of each half of both diagonals.
  4. Explain, in one sentence, why a general parallelogram's diagonals bisect each other but are not necessarily equal in length.
- **P76 (Transfer Probe, mode = independence)**: "A furniture designer is building a picture frame and wants to verify, using only a tape measure (no protractor), that the frame is a genuine RECTANGLE (not just a general, possibly-leaning parallelogram shape). (a) Explain why simply confirming the opposite sides are parallel and equal (confirming it's a parallelogram) is NOT enough to guarantee it's a rectangle. (b) Using the fact that a rectangle's diagonals are additionally EQUAL in length (beyond just bisecting each other), explain how measuring both diagonals could help verify the frame is truly rectangular."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARALLELOGRAM-RECTANGLE-RHOMBUS-SQUARE-HIERARCHY-TREATED-AS-TWO-WAY-EQUIVALENCE | Treating the nested containment relationship (square⊂rhombus/rectangle⊂parallelogram) as a two-way equivalence rather than a one-way subset relationship | Foundational |
| MC-2 | DIAGONALS-BISECTING-EACH-OTHER-CONFUSED-WITH-DIAGONALS-BEING-EQUAL-IN-LENGTH | Confusing the property that a parallelogram's diagonals bisect each other with the (rectangle-specific) property that the diagonals are equal in length | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Parallelogram-Rectangle-Rhombus-Square Hierarchy Treated as Two-Way Equivalence") → P41 (detect: present Example 1 and check whether both directions of implication are (incorrectly) assumed true) → P64 (conceptual shift: re-test each direction explicitly with a counterexample for the false direction).
- **B02 (targets MC-2)**: P27 ("Diagonals Bisecting Each Other Confused with Diagonals Being Equal in Length") → P41 (detect: present Example 2 and check whether "bisect" is (incorrectly) taken to mean "equal length") → P64 (conceptual shift: re-derive the bisection property directly from the parallel-sides definition, then separately note that equal-length diagonals is an EXTRA property specific to rectangles).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.quadrilateral`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.trapezoid` (the other major special-case quadrilateral, with only one pair of parallel sides instead of two).
- **Parent**: `math.geom.quadrilateral`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects the genuine importance of correctly understanding this shape hierarchy, which recurs throughout later geometry.
- Both misconceptions were ranked Foundational because each reflects a genuine logical/definitional confusion that would misclassify shapes incorrectly, not a minor computational slip.
- The picture-frame transfer probe was deliberately chosen because verifying "true rectangle" status using only measurable diagonal lengths (no protractor) is a genuinely practical application distinguishing rectangles from general parallelograms.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.quadrilateral`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: nested-category diagram before definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
