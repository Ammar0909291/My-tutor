# Teaching Blueprint: Area of a Triangle (`math.geom.area-triangle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.area-triangle` |
| name | Area of a Triangle |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.geom.triangle` |
| unlocks | `math.geom.area-polygon` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing area with a clearly marked perpendicular altitude before the general formulas are stated abstractly |
| description (KG) | Area = ½ × base × height; also Heron's formula: √(s(s−a)(s−b)(s−c)) where s is the semiperimeter. |

## Component 1 — Learning Objectives

- LO1: Compute a triangle's area as $\frac12\times\text{base}\times\text{height}$, correctly identifying "height" as the PERPENDICULAR distance (the altitude, per `math.geom.triangle`'s own definition) from a vertex to the line containing the opposite side — never any other slant side.
- LO2: Compute area via **Heron's formula** $\sqrt{s(s-a)(s-b)(s-c)}$, where $s=\frac{a+b+c}{2}$ is the semiperimeter — using ONLY the three side lengths, with no height information needed at all.
- LO3: Recognize when Heron's formula is preferred or necessary (only side lengths are known, with no perpendicular pair readily available) versus when $\frac12bh$ is more direct (a height is already given or trivially computable), and verify both formulas give the SAME area for the same triangle.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` (the altitude is a perpendicular auxiliary segment from a vertex to the opposite side — explicitly NOT one of the triangle's three boundary sides, a distinction that concept itself already corrects as a common confusion).

## Component 3 — Core Explanation

**Base and height: the height must be perpendicular**: the formula $\text{Area}=\frac12\times\text{base}\times\text{height}$ requires "height" to mean specifically the PERPENDICULAR distance (the altitude) from the vertex opposite the chosen base to the LINE containing that base — exactly `math.geom.triangle`'s own altitude definition, which that concept already distinguishes from any of the triangle's ordinary (slant) sides. Using any other segment — like one of the two remaining sides, which is generally NOT perpendicular to the base — gives a wrong area entirely.

**Heron's formula: sides only, no height required**: Heron's formula, $\text{Area}=\sqrt{s(s-a)(s-b)(s-c)}$ with semiperimeter $s=\frac{a+b+c}{2}$, computes area using ONLY the three side lengths $a,b,c$ — no height or altitude value is needed anywhere in the computation. This makes it the natural choice when a triangle's sides are known but no perpendicular height is directly available or easy to compute.

**Both formulas always agree — choose whichever is more direct**: since both compute the SAME quantity (the triangle's area), they must always produce identical results for the same triangle. When a height is already obvious (e.g. a right triangle's two legs), $\frac12bh$ is the more direct computation; when only side lengths are known (e.g. a general scalene triangle with no perpendicular pair visible), Heron's formula is the natural — often the only readily available — choice.

## Component 4 — Worked Examples

**Example 1 (LO1 — using the correct perpendicular height, breaking MC-1)**: A triangle with base $BC=10$ and altitude from $A$ to line $BC$ measuring $6$ (drawn perpendicular): $\text{Area}=\frac12(10)(6)=30$. If a student mistakenly used the slant side $AB=8$ (not perpendicular to $BC$) as "height" instead, they would compute $\frac12(10)(8)=40\ne30$ — a genuinely wrong answer, since $AB$ is not the perpendicular distance from $A$ to $BC$ at all.

**Example 2 (LO2 — Heron's formula from sides alone, breaking MC-2)**: For a triangle with sides $a=5,b=6,c=7$ (no height given or needed): $s=\frac{5+6+7}{2}=9$. $\text{Area}=\sqrt{9(9-5)(9-6)(9-7)}=\sqrt{9\times4\times3\times2}=\sqrt{216}=6\sqrt6\approx14.7$ — computed ENTIRELY from the three side lengths, with no height or altitude value used anywhere.

**Example 3 (LO2/LO3 — both formulas agree, and when each is preferred, breaking MC-3)**: For a $3$-$4$-$5$ right triangle (legs $3,4$, hypotenuse $5$): using $\frac12bh$ directly (the two legs are perpendicular to each other, so either can serve as base and height): $\text{Area}=\frac12(3)(4)=6$. Using Heron's formula: $s=\frac{3+4+5}{2}=6$, $\text{Area}=\sqrt{6(6-3)(6-4)(6-5)}=\sqrt{6\times3\times2\times1}=\sqrt{36}=6$ — BOTH formulas give exactly $6$. Since the legs already supply a trivial perpendicular height here, $\frac12bh$ is clearly more direct; Heron's formula becomes NECESSARY instead for a triangle like Example 2's $5$-$6$-$7$ scalene case, where no two sides are perpendicular to each other.

## Component 5 — Teaching Actions

### Teaching Action A01 — Height Means Perpendicular, Never a Slant Side (Primitive P11: Representation Shift)

State: "height in this formula is exactly the altitude from `math.geom.triangle` — the PERPENDICULAR distance to the base's line, never one of the other two sides." Work Example 1's correct computation, then check what the slant-side substitution would (wrongly) give.

- **MC-1 hook**: ask "can any side of the triangle be used as the 'height' in the area formula, as long as it's drawn from the opposite vertex?" — a "yes" answer reveals MC-1 (using a slant side instead of the genuine perpendicular altitude).

### Teaching Action A02 — Heron's Formula Needs Only the Sides (Primitive P28: Conflict Evidence)

Present Example 2's direct computation: a complete, correct area found using ONLY $a,b,c$, with no height value anywhere. State: "Heron's formula was built exactly for the situation where you don't have (or don't need) a height at all — three side lengths are sufficient on their own."

- **MC-2 hook**: ask "does Heron's formula also require knowing the triangle's height, in addition to its three sides?" — a "yes" answer reveals MC-2 (missing that Heron's formula needs sides only).

### Teaching Action A03 — Both Formulas Always Agree; Choose the More Direct One (Primitive P06: Contrast Pair)

Contrast Example 3's two computations for the SAME $3$-$4$-$5$ triangle — both giving exactly $6$ — against Example 2's scalene triangle where no perpendicular pair is available at all. State: "the two formulas can never disagree — they compute the same area. Use $\frac12bh$ when a perpendicular height is obvious; use Heron's formula when it isn't."

- **MC-3 hook**: ask "could the two formulas ever give genuinely different areas for the same triangle?" — a "yes" answer reveals MC-3 (missing that both formulas compute the identical quantity and must always agree).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the area of a triangle with base $12$ and altitude $5$.
  2. Compute the area of a triangle with sides $a=8,b=15,c=17$ using Heron's formula.
  3. Verify that problem 2's triangle is actually a right triangle (check $8^2+15^2=17^2$), then compute its area using $\frac12bh$ with the two legs, and confirm it matches your Heron's-formula answer.
  4. Explain why using a triangle's slant side (rather than its perpendicular altitude) as "height" in $\frac12bh$ produces an incorrect area.
- **P76 (Transfer Probe, mode = independence)**: "A land surveyor measures a triangular plot's three boundary side lengths directly with a tape measure, but has no way to measure any perpendicular height across the uneven terrain. (a) Explain why Heron's formula is the appropriate tool for computing this plot's area, referencing what information it needs and doesn't need. (b) A colleague suggests instead measuring the perpendicular distance from one corner to the opposite boundary line, to use $\frac12bh$ — explain why this could, in principle, give the same area as Heron's formula, but would require additional fieldwork the surveyor may not have access to. (c) Explain why, regardless of which method is used, the two computations must agree once fully carried out."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HEIGHT-CONFUSED-WITH-A-SLANT-SIDE | Using one of the triangle's other sides (not the perpendicular altitude) as "height" in the area formula, producing an incorrect area | Foundational |
| MC-2 | HERONS-FORMULA-ASSUMED-TO-NEED-HEIGHT | Believing Heron's formula requires knowing the triangle's height in addition to its three sides, missing that it uses only the side lengths | Foundational |
| MC-3 | THE-TWO-AREA-FORMULAS-ASSUMED-COULD-DISAGREE | Believing the base-height formula and Heron's formula could give genuinely different areas for the same triangle | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Height Confused with a Slant Side") → P41 (detect: ask a student to compute a triangle's area and check whether they use a non-perpendicular side as height) → P64 (conceptual shift: re-walk Example 1's contrast between the correct altitude (giving 30) and the incorrect slant-side substitution (giving 40), re-anchoring on "height must be the perpendicular distance, exactly per `math.geom.triangle`'s own altitude definition").
- **B02 (targets MC-2)**: P27 (name it: "Heron's Formula Assumed to Need Height") → P41 (detect: ask a student what information Heron's formula requires, and check for a "sides and height" answer) → P64 (conceptual shift: re-walk Example 2's complete computation using only $a,b,c$, re-anchoring on "Heron's formula was built specifically for when you have no height at all").
- **B03 (targets MC-3)**: P27 (name it: "The Two Area Formulas Assumed Could Disagree") → P41 (detect: ask a student whether the two formulas could give different areas for the same triangle, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's matching computations (both giving 6), re-anchoring on "they compute the identical quantity — always the same answer, just reached via different available information").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle` (the altitude's precise perpendicular definition, and its explicit distinction from an ordinary side, this concept's LO1 directly reuses).
- **Unlocks**: `math.geom.area-polygon` (extends area computation to general polygons, often by decomposing into triangles and applying this concept's own formulas).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (correct perpendicular height), A02 (Heron's sides-only requirement), and A03 (the formulas' agreement and when to prefer each) each target a distinct LO, appropriate for a concept combining two well-known formulas with one important execution caution.
- Example 3's $3$-$4$-$5$ triangle was deliberately chosen because it is simultaneously a case where a perpendicular height is trivially available (the legs) AND both formulas can be fully computed and compared numerically — giving MC-3's "they must agree" claim a concrete, verified instance rather than an assertion.
- This concept's MC-1 directly reuses `math.geom.triangle`'s own already-corrected altitude-vs-side confusion, applying it specifically to the area-computation context rather than re-deriving the distinction from scratch.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: marked perpendicular altitude computed before the general formulas) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
