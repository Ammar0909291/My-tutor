# math.arith.scientific-notation

## Identity
- **KG ID**: `math.arith.scientific-notation`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.exponentiation`, `math.arith.decimals`
- **Unlocks**: `math.arith.significant-figures`
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.scientific-notation.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly write a number in scientific notation a × 10ⁿ with the coefficient a strictly satisfying 1 ≤ |a| < 10, correctly determine the sign and magnitude of the exponent n for both very large and very small numbers, and correctly apply exponent rules when multiplying or dividing numbers expressed in scientific notation.

## Core Understanding
Scientific notation exists to compactly represent very large or very small quantities using a fixed-format coefficient (always between 1 and 10 in absolute value) multiplied by a power of 10 that carries all the "size" information. The coefficient constraint (1 ≤ |a| < 10) is not optional styling — it is what makes scientific notation a well-defined, comparable format: 45 × 10³ and 4.5 × 10⁴ represent the same number, but only the second is in proper scientific notation, and without enforcing the constraint, comparing or combining two scientific-notation numbers becomes ambiguous. The exponent's sign directly encodes which direction the decimal point moved to reach the coefficient: moving the decimal point LEFT (making a large number smaller, into the 1-to-10 range) requires a POSITIVE exponent to restore the original magnitude; moving it RIGHT (making a small number larger, into the 1-to-10 range) requires a NEGATIVE exponent.

## Mental Models
1. **The coefficient-window model**: the coefficient must always land in the window [1, 10) — if it doesn't, the number isn't yet in proper scientific notation, and the exponent needs adjusting to compensate.
2. **The decimal-point-direction model**: the direction the decimal point moves to form the coefficient directly determines the exponent's sign — moving left (shrinking toward 1-10) pairs with a positive exponent (since the original number was large); moving right (growing toward 1-10) pairs with a negative exponent (since the original number was small).
3. **The exponent-rules-carry-over model**: multiplying or dividing numbers in scientific notation means multiplying/dividing the coefficients AND applying the product/quotient exponent rule (from `math.arith.exponent-rules`) to the powers of 10 — with one extra step: if the resulting coefficient falls outside [1, 10), it must be renormalized, shifting the excess into the exponent.

## Why Students Fail
The dominant failure is writing a coefficient outside the required [1, 10) range without checking the constraint, producing a technically-equal but improperly-formatted expression. A second, closely related failure is confusing which direction the decimal point's movement corresponds to which exponent sign — an error that becomes more likely because moving the decimal point "to the right" feels like it should make the number "bigger" (and the exponent more positive) regardless of whether the ORIGINAL number was large or small. A third failure appears when combining two scientific-notation numbers via multiplication or division: the exponent rules are correctly applied to the powers of 10, but the final renormalization step (checking whether the resulting coefficient is still in [1,10)) is skipped.

## Misconceptions
- **MC-1 — COEFFICIENT-RANGE-VIOLATED** (FOUNDATIONAL)
  - **Statement**: The student writes a coefficient outside the required [1, 10) range, e.g., writing 45 × 10³ instead of the properly normalized 4.5 × 10⁴.
  - **Birth type**: Type 4, notation-induced — the underlying VALUE (45 × 10³ = 45,000 = 4.5 × 10⁴) is correct either way, so nothing about the arithmetic itself signals that the coefficient's range is a required FORMATTING constraint rather than a free choice.
  - **Diagnostic probe**: Ask the student to write 45,000 in scientific notation; MC-1 shows as an answer like 45 × 10³ or 450 × 10², both numerically equal to the correct value but violating the [1,10) coefficient constraint.
  - **Repair approach**: Explicitly teach the coefficient-window model (Mental Model 1) as a mandatory check performed on EVERY scientific-notation answer — "is your coefficient between 1 and 10? If not, it's not finished yet" — treated as a required final verification step, not an optional refinement.

- **MC-2 — EXPONENT-SIGN-DIRECTION-CONFUSED**
  - **Statement**: The student uses the wrong sign for the exponent relative to the size of the original number, e.g., writing 0.0045 as 4.5 × 10³ instead of the correct 4.5 × 10⁻³.
  - **Birth type**: Type 2, perceptual intuition — moving the decimal point to the RIGHT (as required to convert 0.0045 into the coefficient 4.5) can perceptually feel like "the number is getting bigger, so the exponent should be positive," even though the ORIGINAL number was small and the exponent must be negative to correctly restore its true (small) magnitude.
  - **Diagnostic probe**: Ask the student to convert 0.0045 to scientific notation; MC-2 shows as a positive exponent (e.g., 4.5 × 10³) instead of the correct negative one (4.5 × 10⁻³).
  - **Repair approach**: Ground the sign rule in the decimal-point-direction model (Mental Model 2) with an explicit self-check: "was the ORIGINAL number big or small? A big original number needs a positive exponent to represent its size; a small original number needs a negative exponent" — anchoring the sign decision to the original number's actual magnitude, not to the direction the decimal point happened to move.

- **MC-3 — EXPONENT-RENORMALIZATION-SKIPPED-AFTER-COMBINING**
  - **Statement**: When multiplying or dividing two numbers in scientific notation, the student correctly multiplies/divides the coefficients and applies the exponent rule to the powers of 10, but fails to renormalize the result if the resulting coefficient falls outside [1, 10), e.g., computing (5 × 10²) × (4 × 10³) as 20 × 10⁵ and leaving it there instead of renormalizing to 2 × 10⁶.
  - **Birth type**: Type 5, instruction-induced — the multiplication/division procedure itself (multiply coefficients, add/subtract exponents) is often taught and practiced as a complete, self-contained algorithm, with the renormalization check treated as an afterthought rather than an integrated final step of the same procedure.
  - **Diagnostic probe**: Present (5 × 10²) × (4 × 10³) and ask the student to simplify fully; MC-3 shows as stopping at 20 × 10⁵ without recognizing the coefficient 20 violates the [1,10) constraint and needs renormalizing.
  - **Repair approach**: Explicitly append the coefficient-window check (Mental Model 1) as the FINAL mandatory step of every multiplication/division procedure in scientific notation, treating "multiply coefficients, combine exponents, THEN renormalize if needed" as one single three-part procedure, never a two-part procedure with an optional third step.

## Analogies
- **Odometer-window analogy**: the coefficient's [1, 10) constraint is like a car odometer window designed to always show a single leading digit before the decimal — if the "trip" produces a number outside that window, the display format needs adjusting (carrying into the next digit), even though the underlying distance traveled hasn't changed.

## Demonstrations
- Side-by-side conversion of the same number (45,000) into both an improperly-formatted (45 × 10³) and properly-normalized (4.5 × 10⁴) scientific notation, showing they represent the same value but only one satisfies the coefficient constraint (targeting MC-1).
- A worked conversion of a very small number (0.0045) with the decimal-point movement explicitly tracked and connected to the resulting negative exponent (targeting MC-2).
- A full multiplication example ((5 × 10²) × (4 × 10³)) carried through to the renormalization step explicitly (targeting MC-3).

## Discovery Questions
1. "Is your coefficient between 1 and 10 — if not, is your answer actually finished?"
2. "The original number you started with — was it big or small? Does that tell you whether the exponent should be positive or negative?"
3. "After multiplying two scientific-notation numbers together, is there one more check you need to do before you're done?"

## Teaching Sequence
1. Confirm `math.arith.exponentiation` and `math.arith.decimals` are solid.
2. Introduce the coefficient-window model (Mental Model 1) with the [1,10) constraint as a mandatory final check, using the 45,000 example (targeting MC-1).
3. Introduce the decimal-point-direction model (Mental Model 2) for both large and small numbers side by side, anchoring the exponent's sign to the original number's actual magnitude (targeting MC-2).
4. Introduce multiplication/division of scientific-notation numbers, explicitly integrating the renormalization check as the mandatory final step of the procedure (targeting MC-3).
5. Practice mixed conversion and combination problems, always requiring the coefficient-window check as the last step of every answer.

## Tutor Actions
- **TELL: Explanation** — the [1,10) coefficient constraint, framed as mandatory formatting, not optional style.
- **DO: Worked Example** — the large-number and small-number conversion pair, with decimal-point direction explicitly tracked.
- **TEST-THINKING: Error Analysis** — present a multiplication result missing renormalization (MC-3) and ask the student to finish it correctly.
- **TEST-THINKING: Prediction** — before converting a number, predict whether the exponent will be positive or negative based on the original number's size.

## Voice Teaching Notes
After any scientific-notation answer is given, ask "is that coefficient really between 1 and 10?" as a standing, separate verbal check — this single habit, applied consistently, catches MC-1 immediately and, when extended to post-multiplication answers, catches MC-3 as well.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a real-world large-and-small-number scenario (e.g., a very large astronomical distance and a very small measurement in the same problem) requiring correct scientific-notation conversion of both, directly assessing MC-1 and MC-2 together.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one large-number conversion, one small-number conversion (targeting MC-2), and one multiplication/division item requiring renormalization (targeting MC-3).

## Tutor Recovery Strategy
If MC-2 persists, regress to explicitly writing the original number's magnitude in words ("this is a SMALL number, much less than 1") immediately before assigning the exponent's sign, until the original-magnitude-to-sign connection is automatic, before returning to purely symbolic decimal-point tracking.

## Memory Hooks
- "Coefficient between 1 and 10 — always check, never skip."
- "Big original number, positive exponent. Small original number, negative exponent — the ORIGINAL size decides, not just which way the decimal moved."
- "Multiply, combine exponents, THEN check the coefficient window again — three steps, not two."

## Transfer Connections
- `math.arith.significant-figures` (unlocks) directly builds on scientific notation's compact representation to express precision unambiguously.

## Cross-Subject Connections
- Physics and chemistry: scientific notation is the standard representation for extremely large (astronomical distances) and extremely small (atomic/subatomic scales) quantities across both subjects.

## Blueprint References
None — no Blueprint exists for `math.arith.scientific-notation` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
