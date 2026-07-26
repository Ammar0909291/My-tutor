# math.arith.long-multiplication

## Identity
- **KG ID**: `math.arith.long-multiplication`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.multiplication-table`, `math.arith.carrying`
- **Unlocks**: (none in current KG)
- **Related**: none listed
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.long-multiplication.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly execute the standard written algorithm for multiplying multi-digit numbers by computing partial products for each digit of the second factor, shifting each partial product one place left per digit position, correctly carrying within each partial-product computation, and summing the aligned partial products.

## Core Understanding
Long multiplication decomposes a multi-digit multiplication into a sum of simpler single-digit-by-multi-digit partial products, each scaled by the place value of the digit that produced it. Multiplying 23 × 14 means computing 23 × 4 (the ones-digit partial product) and 23 × 10 (the tens-digit partial product, which is really 23 × 1 shifted one place left to represent "tens"), then adding the two partial products together. The written shorthand shifts the second partial product one column left (or writes a placeholder zero) specifically to represent this ×10 scaling — omitting the shift silently discards the place-value meaning of the second digit being multiplied, turning a correct procedure into an incorrect one that looks superficially similar.

## Mental Models
1. **The partial-products-by-place-value model**: each digit of the multiplier contributes its own partial product, scaled by its place value (ones, tens, hundreds, …) — the written shift is not decoration, it IS the ×10, ×100, etc. scaling made visible.
2. **The area-model bridge**: 23 × 14 can be pictured as a rectangle split into four smaller rectangles (20×10, 20×4, 3×10, 3×4) — long multiplication's partial products are simply these same four pieces grouped by which digit of 14 produced them (20×10+3×10 = the tens-digit partial product; 20×4+3×4 = the ones-digit partial product).
3. **The carry-within-a-row model**: carrying during long multiplication happens WITHIN a single partial-product row, exactly as in `math.arith.carrying`'s single-multiplication carrying — but the carry from one partial product does NOT cross over into the next partial product's row; each row's carrying is self-contained.

## Why Students Fail
The dominant failure is executing the correct sequence of digit-by-digit multiplications but forgetting the place-value shift for every partial product after the first — the resulting numbers "look like" a completed multiplication but silently ignore that the second digit multiplied represents tens, not ones. A second failure is a carrying error localized within one partial-product row (dropping or misapplying a carry generated mid-row), and a third is correctly computing and shifting the partial products but making a column-alignment error during the final addition step, effectively undoing correct work with an addition mistake.

## Misconceptions
- **MC-1 — PARTIAL-PRODUCT-PLACE-VALUE-SHIFT-OMITTED** (FOUNDATIONAL)
  - **Statement**: The student computes each partial product correctly but fails to shift subsequent partial products one place left per digit position (no placeholder), effectively treating every partial product as if it were multiplied by the ones digit only.
  - **Birth type**: Type 4, notation-induced — the shift is represented purely by column position in the written layout, with no explicit symbol marking it, so a student copying the procedure's surface form without understanding the place-value reasoning behind the shift can easily drop it.
  - **Diagnostic probe**: "Compute 23 × 14, showing both partial products before adding." A student exhibiting MC-1 writes the second partial product (23 × 1) in the same column position as the first (23 × 4) rather than shifted one place left, producing an answer far smaller than the correct 322.
  - **Repair approach**: Ground the shift explicitly in the area-model bridge (Mental Model 2) — show that the tens-digit partial product represents 23 × 10, not 23 × 1, and that writing it shifted one place left (or with a trailing placeholder zero) is exactly how "× 10" is represented in place-value notation, not an arbitrary formatting rule.

- **MC-2 — CARRY-DROPPED-WITHIN-A-PARTIAL-PRODUCT-ROW**
  - **Statement**: While computing a single partial product (e.g., 23 × 4), the student generates a carry from the ones-digit multiplication but fails to add it into the tens-digit multiplication within that same row.
  - **Birth type**: Type 5, instruction-induced — carrying was mastered as a single-operation skill in `math.arith.carrying`, but long multiplication requires performing it correctly multiple times in sequence within one row, and the increased procedural load (track the current digit, the running product, AND the pending carry) can cause a previously-solid skill to break down under compounded demand.
  - **Diagnostic probe**: Present a partial-product computation that generates a carry partway through (e.g., 23 × 4, where 3×4=12 generates a carry of 1 into the tens place) and ask the student to show every intermediate step; MC-2 shows as the carry being computed but never added into the next digit's product.
  - **Repair approach**: Slow down the partial-product computation into explicit sub-steps, writing the carry digit visibly above the next column before multiplying that column, exactly as in `math.arith.carrying`'s own repair approach, reinforcing that long multiplication's carrying is the identical skill, just repeated across more digits per row.

- **MC-3 — PARTIAL-PRODUCT-COLUMN-MISALIGNMENT-DURING-ADDITION**
  - **Statement**: Both partial products are computed and shifted correctly, but the final addition step misaligns columns (often when the two partial products have different numbers of digits), producing an incorrect sum despite correct partial products.
  - **Birth type**: Type 1, overgeneralization — the student applies single-multiplication column-addition habits without re-checking alignment when the two partial products differ in length, assuming their existing addition procedure transfers automatically regardless of length mismatch.
  - **Diagnostic probe**: Present a long multiplication whose two partial products have different digit counts (e.g., 23 × 14, where 23×4=92 has two digits and 23×1(shifted)=23 shifted becomes 230, three digits) and ask the student to add them; MC-3 shows as misaligned place-value columns in the final sum despite correct partial products.
  - **Repair approach**: Explicitly re-verify place-value column alignment (ones under ones, tens under tens) as a distinct, separate step from computing the partial products themselves — treating the final addition as its own mini `math.arith.column-addition` task requiring its own alignment check, not an automatic afterthought.

## Analogies
- **Assembly-line analogy**: each partial product is like one worker's contribution to an assembly line, correctly labeled by which "shift" (place value) it belongs to before all contributions are combined at the end — mislabeling a shift (MC-1) means the final combination is wrong even if each worker did their own job correctly.

## Demonstrations
- The area-model rectangle split into four smaller rectangles for 23 × 14, mapped directly onto the two long-multiplication partial products (Mental Model 2), making the place-value shift visually undeniable.
- A fully narrated partial-product computation with the carry digit written explicitly above each column before it's used (targeting MC-2).

## Discovery Questions
1. "When you multiply by the tens digit, are you really multiplying by that digit alone, or by ten times that digit — and how does the written shift show this?"
2. "If a carry shows up partway through one partial product, does it affect the NEXT partial product's row, or stay within the current row?"
3. "When your two partial products have different numbers of digits, how do you make sure you're adding matching place values together?"

## Teaching Sequence
1. Confirm `math.arith.multiplication-table` fluency and `math.arith.carrying`'s single-multiplication carrying are solid.
2. Introduce the area-model bridge (Mental Model 2) for a two-digit-by-two-digit example, explicitly connecting each rectangle to a partial product.
3. Walk a fully narrated partial-product computation with visible carry-tracking (targeting MC-2).
4. Explicitly teach the place-value shift as "this row represents ×10 (or ×100, …)," not a formatting convention (targeting MC-1).
5. Treat the final addition as a separate, explicit alignment-check step (targeting MC-3).
6. Practice mixed-length multi-digit problems, interleaving cases where partial products have matching and differing digit counts.

## Tutor Actions
- **SHOW: Demonstration** — the area-model rectangle split mapped to partial products.
- **DO: Worked Example** — a fully narrated partial-product computation with visible carrying.
- **TEST-THINKING: Error Analysis** — present a solved example missing the place-value shift (MC-1) and ask the student to find the error.
- **ORGANIZE: Matching** — match each partial product to the place-value shift it requires.

## Voice Teaching Notes
When narrating a partial product, explicitly say "this is 23 times ONE TEN, so it's shifted one place" rather than "now move over one space" — naming the place value out loud, not just the mechanical action, directly targets MC-1's notation-without-meaning failure.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (no Blueprint exists for a natural cross-link target at this KG position; KG lists none). Present a three-digit-by-two-digit multiplication requiring three partial products of differing lengths, assessing place-value shift, within-row carrying, and final alignment together.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one item with partial products of differing digit counts (targeting MC-3) and at least one item requiring a carry within a partial product (targeting MC-2).

## Tutor Recovery Strategy
If MC-1 persists after the area-model demonstration, regress to writing out the full expanded form of each partial product (e.g., "23 × 10 = 230," not just "23" shifted) until the place-value meaning is explicit, before returning to the compressed shifted-digit notation.

## Memory Hooks
- "Each row is its own place value — shift it to show what it's really worth."
- "Carry stays in its own row — it doesn't jump to the next partial product."

## Transfer Connections
- Polynomial multiplication (algebra, later domain) reuses the identical partial-products-by-place-value structure, with terms playing the role of place-value columns.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept at this time; long multiplication is a pure arithmetic-procedure skill whose primary transfer value is within mathematics (polynomial multiplication).

## Blueprint References
None — no Blueprint exists for `math.arith.long-multiplication` (verified via directory listing of `docs/curriculum/blueprints/`).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
