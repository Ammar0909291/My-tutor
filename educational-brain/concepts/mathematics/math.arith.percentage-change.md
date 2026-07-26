# math.arith.percentage-change

## Identity
- **KG ID**: `math.arith.percentage-change`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.percentage-calculations`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.percentage-change.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly compute percentage change as (new − old) / old × 100%, always dividing by the ORIGINAL (old) value, correctly signaling whether a change is an increase or a decrease, and correctly reasoning about successive percentage changes without assuming they combine additively.

## Core Understanding
Building on `math.arith.percentage-calculations`'s whole-identification discipline, percentage change has one additional, non-negotiable rule: the denominator is always the ORIGINAL value, never the new value, regardless of whether the change is an increase or a decrease. A price rising from $80 to $100 is a 25% increase ((100−80)/80 × 100% = 25%), NOT a 20% increase (which would result from incorrectly dividing by the new value, 100). The sign of the result matters as much as its magnitude: a decrease should be reported as a negative percentage change (or explicitly labeled "a decrease of X%"), not silently reported as a positive number that erases the direction of the change. Finally, successive percentage changes do not combine by simple addition or subtraction — a 10% increase followed by a 10% decrease does NOT return a quantity to its original value, because each percentage change is computed against a DIFFERENT base (the second change's "old" value is the first change's "new" value).

## Mental Models
1. **The original-value-anchor model**: percentage change always measures against the STARTING point, never the ending point — "change" is inherently relative to where you began, not where you ended up.
2. **The signed-direction model**: percentage change is a signed quantity — positive means increase, negative means decrease — and dropping the sign silently discards the most important piece of information (which direction the change went).
3. **The moving-base model**: each successive percentage change is computed against whatever the CURRENT value is at that point, not the ORIGINAL value from before any changes — so a chain of percentage changes multiplies scale factors together, it does not add percentages.

## Why Students Fail
The dominant failure is dividing by the wrong base — using the new (ending) value instead of the old (original) value as the denominator, a mistake that produces a plausible-looking but structurally wrong percentage. A second failure is computing the magnitude of a decrease correctly but reporting it without the negative sign or "decrease" label, effectively presenting a decrease as though it were an increase of the same size. A third failure is assuming successive percentage changes combine additively (a 10% increase then a 10% decrease returns to the start), missing that each change's base shifts.

## Misconceptions
- **MC-1 — WRONG-BASE-USED-FOR-PERCENTAGE-CHANGE** (FOUNDATIONAL)
  - **Statement**: The student divides by the NEW value instead of the OLD (original) value when computing percentage change, e.g., computing the change from 80 to 100 as (100−80)/100 × 100% = 20% instead of the correct (100−80)/80 × 100% = 25%.
  - **Birth type**: Type 5, instruction-induced — `math.arith.percentage-calculations`'s own MC-1 (which-quantity-is-the-whole-misidentified) carries forward directly into this concept, since percentage change is itself a specific instance of "find what percentage the change IS OF the original," and if the whole-identification habit from that prerequisite isn't solid, this concept's specific always-use-the-old-value rule can be applied inconsistently.
  - **Diagnostic probe**: Present a price increase from $80 to $100 and ask for the percentage change; MC-1 shows as an answer of 20% (dividing by the new value) instead of the correct 25%.
  - **Repair approach**: Explicitly re-anchor on the original-value-anchor model (Mental Model 1) with a standing verbal check before any calculation: "which value is the STARTING point — that's always the denominator, no exceptions."

- **MC-2 — PERCENTAGE-DECREASE-SIGN-DROPPED**
  - **Statement**: The student correctly computes the magnitude of a percentage decrease but reports it as a positive number without indicating direction, effectively presenting the decrease as though it were an increase of the same size.
  - **Birth type**: Type 1, overgeneralization — `math.arith.percentage-calculations` is typically practiced almost exclusively with all-positive, increase-flavored framing ("what is X% of Y"), and the student overgeneralizes that percentage results are always reported as plain positive numbers without direction.
  - **Diagnostic probe**: Present a price DROP from $100 to $80 and ask for the percentage change; MC-2 shows as an answer of "20%" with no indication that it is a decrease, rather than "−20%" or "a 20% decrease."
  - **Repair approach**: Explicitly require every percentage-change answer to state BOTH the magnitude AND the direction ("a 20% decrease," not just "20%"), reinforcing the signed-direction model (Mental Model 2) as a mandatory, not optional, part of a complete answer.

- **MC-3 — REPEATED-PERCENTAGE-CHANGES-ASSUMED-TO-CANCEL**
  - **Statement**: The student assumes a percentage increase followed by an equal-magnitude percentage decrease (or vice versa) returns a quantity to its original value, treating percentage changes as though they combine by simple addition/subtraction.
  - **Birth type**: Type 6, analogy overextension — ordinary additive quantities (like adding and then subtracting the same dollar amount) genuinely do cancel, and the student overextends this familiar additive-cancellation pattern to percentage changes, which are multiplicative and computed against a shifting base.
  - **Diagnostic probe**: Ask the student what happens to $100 after a 10% increase followed by a 10% decrease; MC-3 shows as an answer of "$100, back to the start," when the correct answer is $99 ($100 → $110 after the increase → $110 × 0.9 = $99 after the decrease, since the decrease's 10% is now computed against $110, not the original $100).
  - **Repair approach**: Explicitly walk the moving-base model (Mental Model 3) step by step for a concrete example, showing that the second percentage change's base is the RESULT of the first change, not the original starting value — making the asymmetry (10% of a bigger number is more than 10% of the original) concrete and visible.

## Analogies
- **Hiking-elevation analogy**: percentage change is like measuring how much elevation you've gained or lost relative to where you STARTED your hike, not relative to your current position — the starting point is fixed and always the reference, regardless of which direction you've moved.
- **Non-analogy warning**: avoid framing repeated percentage changes as "like adding and subtracting the same number," which directly primes MC-3's additive-cancellation error; instead frame each successive change as "a new percentage of whatever you have NOW."

## Demonstrations
- Side-by-side computation of the SAME price change (80 → 100) computed with the correct base (old value, giving 25%) versus the incorrect base (new value, giving 20%), making the difference concrete (targeting MC-1).
- A step-by-step walkthrough of $100 → 10% increase → $110 → 10% decrease → $99, explicitly showing the shifting base at each step (targeting MC-3).

## Discovery Questions
1. "When computing percentage change, do you divide by the number you started with, or the number you ended with?"
2. "If a price drops by 20%, should your answer just say '20%,' or does it need to say something more?"
3. "If something increases by 10% and then decreases by 10%, does it end up back where it started? Why or why not?"

## Teaching Sequence
1. Confirm `math.arith.percentage-calculations`'s whole-identification discipline is solid.
2. Introduce the original-value-anchor model (Mental Model 1) with a standing verbal check ("which value is the STARTING point?") before every calculation, directly targeting MC-1.
3. Require every answer to explicitly state direction (increase/decrease), reinforcing the signed-direction model (Mental Model 2), targeting MC-2.
4. Walk the moving-base model (Mental Model 3) for a concrete successive-percentage-change example, targeting MC-3.
5. Practice mixed problems covering single increases, single decreases, and successive changes, always requiring explicit direction labeling.

## Tutor Actions
- **TELL: Explanation** — the always-divide-by-the-original rule, emphasized as non-negotiable.
- **DO: Worked Example** — the side-by-side correct-vs-incorrect-base computation for the same price change.
- **TEST-THINKING: Prediction** — before computing successive percentage changes, predict whether they cancel, then verify.
- **TEST-THINKING: Error Analysis** — present an answer with the sign/direction dropped (MC-2) and ask the student to correct it.

## Voice Teaching Notes
Before any percentage-change calculation, ask aloud "which number is the ORIGINAL — the one you started with?" as a standing, separate question — this verbal habit directly targets MC-1 by forcing whole-identification before any arithmetic, mirroring the parent concept's own highest-leverage habit.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a successive-percentage-change scenario (e.g., a stock rising 15% then falling 15%) and require the student to compute the true final value and explain why it doesn't return to the original, directly assessing MC-3.
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one decrease requiring explicit direction labeling (targeting MC-2) and one successive-change item (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to concrete, small-number examples where the correct and incorrect answers are visibly very different (e.g., an original value near zero), making the consequence of using the wrong base impossible to overlook, before returning to realistic-scale problems.

## Memory Hooks
- "Always divide by where you STARTED, never where you ENDED UP."
- "A decrease is still a percentage — say which direction, every time."
- "Each new percentage change works on what you have NOW, not what you started with."

## Transfer Connections
- Compound interest and growth/decay problems (later concepts) directly extend the moving-base model (Mental Model 3) to many successive percentage changes.

## Cross-Subject Connections
- Economics and finance: inflation rates, stock price changes, and interest calculations are direct real-world applications of percentage change, including the successive-change trap (MC-3) in compound growth scenarios.

## Blueprint References
None — no Blueprint exists for `math.arith.percentage-change` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This concept's own `related` reference from `math.arith.percentage-calculations` (authored in Wave 6 part 2) noted this concept as unauthored at that time — now resolved.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
