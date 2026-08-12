# Teaching Blueprint: Converse of the Pythagorean Theorem (`math.geom.pythagorean-converse`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.pythagorean-converse` |
| name | Converse of the Pythagorean Theorem |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.geom.pythagorean-theorem` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | If a² + b² = c² for sides a, b, c of a triangle, then the triangle is right-angled with hypotenuse c.

 |

## Component 1 — Learning Objectives

- LO1: Apply the CONVERSE of the Pythagorean theorem — given a triangle's three side lengths $a,b,c$ (with $c$ the LONGEST), if $a^2+b^2=c^2$, then the triangle IS right-angled, with the right angle OPPOSITE the longest side $c$.
- LO2: Recognize that the converse is a genuinely SEPARATE logical statement from the original theorem — the original says "right triangle $\Rightarrow$ $a^2+b^2=c^2$"; the converse says "$a^2+b^2=c^2$ $\Rightarrow$ right triangle" — and while BOTH happen to be true here, a theorem's converse is not automatically true in general (this is a special, provable fact about THIS particular theorem).
- LO3: Correctly identify which side must be $c$ (the LONGEST) before testing the equation — testing with the WRONG side as $c$ produces a false negative (incorrectly concluding "not a right triangle" when it actually is one).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.pythagorean-theorem` — the converse directly reverses its logical direction.

## Component 3 — Core Explanation

The **Converse of the Pythagorean Theorem** states: given a triangle with side lengths $a,b,c$, if $a^2+b^2=c^2$ (where $c$ is the LONGEST of the three sides), then the triangle IS a right triangle, with the right angle located OPPOSITE side $c$ (making $c$ the hypotenuse).

This is a genuinely SEPARATE logical claim from the original Pythagorean theorem. The original theorem states "IF a triangle is right-angled, THEN $a^2+b^2=c^2$" (right angle $\Rightarrow$ equation). The converse reverses this: "IF $a^2+b^2=c^2$, THEN the triangle is right-angled" (equation $\Rightarrow$ right angle). In general mathematics, a statement's converse is NOT automatically true just because the original statement is — this particular converse happens to ALSO be true (provable via the Law of Cosines or a direct congruence argument), but that's a special fact about this theorem, not a general logical guarantee.

Applying the converse correctly requires identifying the LONGEST side FIRST and designating it $c$ — testing the equation with a shorter side incorrectly placed as "$c$" will fail even for a genuine right triangle, since only the true longest side (opposite the actual right angle) satisfies the equation.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — correct application, breaking MC-1)**: Determine whether a triangle with sides 6, 8, 10 is a right triangle. The LONGEST side is 10, so let $c=10$: check $6^2+8^2=36+64=100=10^2$ ✓ — YES, this is a right triangle (right angle opposite the side of length 10). A common error tests the equation with a SHORTER side incorrectly designated as $c$ (e.g. checking $6^2+10^2\stackrel{?}{=}8^2$, which is false) and incorrectly concludes "not a right triangle" — the longest side MUST be tested as $c$; testing any other arrangement can give a false negative even for a genuine right triangle.

**Example 2 (LO2 — the converse as a separate, provable claim)**: State explicitly why "$a^2+b^2=c^2\Rightarrow$ right triangle" is not automatically guaranteed just because "right triangle $\Rightarrow$ $a^2+b^2=c^2$" is true — using a general example of a DIFFERENT mathematical statement whose converse is FALSE (e.g. "if a number is divisible by 4, it's divisible by 2" is true, but its converse "if a number is divisible by 2, it's divisible by 4" is FALSE, since 6 is divisible by 2 but not 4) — showing converses require SEPARATE justification, which the Pythagorean converse genuinely has (via an independent proof), even though converses aren't automatically true in general.

**Example 3 (LO1 — a non-right triangle case)**: Determine whether a triangle with sides 5, 6, 7 is a right triangle. Longest side is 7: check $5^2+6^2=25+36=61\ne49=7^2$ — NOT a right triangle (the sums don't match).

## Component 5 — Teaching Actions

### Teaching Action A01 — Identify the Longest Side as c Before Testing (Primitive P64: Conceptual Shift)

Work Example 1, explicitly identifying the longest side FIRST before applying the equation.

- **MC-1 hook**: check whether the longest side is correctly identified as $c$ before testing.

### Teaching Action A02 — A Theorem's Converse Requires Separate Justification (Primitive P06: Contrast Pair)

Work Example 2, contrasting a true-converse case (Pythagorean) against a false-converse case (divisibility) to illustrate that converses aren't automatic.

- **MC-2 hook**: reinforces that the Pythagorean converse's truth is a specific, separately-proven fact, not a general logical guarantee.

### Teaching Action A03 — Testing a Non-Right Triangle (reused procedure)

Work Example 3, applying the same correct procedure to confirm a negative case.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Determine whether a triangle with sides 9, 12, 15 is a right triangle.
  2. Determine whether a triangle with sides 4, 5, 6 is a right triangle.
  3. Explain, in one sentence, why the longest side must be tested as c in the converse.
  4. Explain why a theorem's converse is not automatically true just because the original theorem is true, using an example other than the Pythagorean theorem.
- **P76 (Transfer Probe, mode = independence)**: "A carpenter wants to verify that a wooden frame's corner is EXACTLY square (a right angle) without a protractor, by measuring the three sides of a triangular brace: 3 ft, 4 ft, and 5 ft (using the classic '3-4-5 rule' method). (a) Use the Converse of the Pythagorean Theorem to confirm this method genuinely guarantees a right angle. (b) Explain why the carpenter must measure and test with the LONGEST side (5 ft) specifically, rather than testing with $3^2+5^2$ against $4^2$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | WRONG-SIDE-DESIGNATED-AS-C-WHEN-TESTING-THE-CONVERSE | Testing the Pythagorean converse equation with a side other than the longest designated as c, producing a false negative even for a genuine right triangle | Foundational |
| MC-2 | CONVERSE-ASSUMED-AUTOMATICALLY-TRUE-BECAUSE-THE-ORIGINAL-THEOREM-IS-TRUE | Assuming any theorem's converse is automatically true simply because the original theorem is true, without recognizing this requires separate proof | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Wrong Side Designated as c When Testing the Converse") → P41 (detect: present Example 1 and check whether the longest side is correctly identified as $c$) → P64 (conceptual shift: re-identify the longest side explicitly by comparing all three lengths before testing).
- **B02 (targets MC-2)**: P27 ("Converse Assumed Automatically True Because the Original Theorem Is True") → P41 (detect: present Example 2 and check whether the general converse-truth assumption is challenged) → P64 (conceptual shift: re-examine the divisibility counterexample, confirming converses need independent justification).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.pythagorean-theorem`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.pythagorean-theorem`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects that while the computational procedure is simple, correctly identifying the longest side and understanding the logical converse relationship require genuine care.
- MC-1 was ranked Foundational because it produces a genuinely wrong conclusion (false negative) about a real triangle's shape, while MC-2 was ranked Moderate as a broader logical-reasoning habit that doesn't affect correct application of THIS specific theorem once learned.
- The carpenter's 3-4-5-rule transfer probe was deliberately chosen because this is a genuinely famous, practical real-world application of the converse, giving the theorem immediate hands-on relevance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.pythagorean-theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
