# math.arith.long-division

## Identity
- **KG ID**: `math.arith.long-division`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.division`, `math.arith.long-multiplication`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.long-division.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly execute the step-by-step long-division algorithm (divide, multiply, subtract, bring down, repeat) for multi-digit dividends, correctly aligning each quotient digit by place value, and correctly recognizing when the process is complete (all dividend digits brought down, final remainder less than the divisor).

## Core Understanding
Long division is an iterative, four-step cycle — divide (estimate how many times the divisor fits into the current partial dividend), multiply (compute divisor times that estimate), subtract (find the leftover), bring down (append the next digit of the dividend to the leftover, forming a new partial dividend) — repeated until every digit of the original dividend has been brought down and the process terminates. Each quotient digit produced by one cycle must be written directly above the LAST digit of the dividend that was used to form that cycle's partial dividend, reflecting its true place value; this is the identical place-value-alignment principle from `math.arith.long-multiplication`'s partial products, applied here to quotient-digit placement instead. The process is only complete once EVERY dividend digit has been brought down and the final remainder satisfies 0 ≤ r < divisor (the same completion condition formalized in `math.arith.remainder`) — stopping earlier, even if the numbers "look small enough," produces an incomplete, incorrect quotient.

## Mental Models
1. **The repeated-cycle model**: long division is the SAME four-step cycle (divide, multiply, subtract, bring down) repeated once per digit of the dividend — mastering one cycle means mastering the whole algorithm, since nothing new happens in later cycles beyond repetition.
2. **The place-value-column model**: each quotient digit belongs directly above the dividend digit that completed the partial dividend used to produce it — exactly mirroring how each long-multiplication partial product belongs to a specific place-value column.
3. **The exhaustion-plus-range-check completion model**: the algorithm is finished only when two conditions both hold — every dividend digit has been brought down, AND the final leftover is strictly less than the divisor — matching `math.arith.remainder`'s own a = bq + r, 0 ≤ r < b completion criterion.

## Why Students Fail
The dominant failure is a genuine step-skip within the repeated cycle — most commonly forgetting to bring down the next dividend digit after subtracting, which silently truncates the dividend the rest of the computation is based on. A second failure is misaligning a quotient digit's column position, especially in the first cycle when the divisor doesn't evenly divide the dividend's leading digit(s), so the "first quotient digit" isn't positioned above the dividend's very first digit. A third failure is terminating the process prematurely — treating a leftover that merely "looks small" as sufficient grounds to stop, without verifying that every dividend digit has actually been brought down.

## Misconceptions
- **MC-1 — DIGIT-BRING-DOWN-SKIPPED** (FOUNDATIONAL)
  - **Statement**: After subtracting within one cycle, the student forgets to bring down the next digit of the dividend before continuing, silently working with an incomplete partial dividend for the rest of the computation.
  - **Birth type**: Type 5, instruction-induced — the four-step cycle (divide, multiply, subtract, bring down) has four mandatory sub-steps performed identically each repetition, and under the compounded procedural load of repeating this cycle multiple times, the "bring down" step — positioned last in each cycle, right before the pattern restarts — is the one most often silently dropped.
  - **Diagnostic probe**: Present a multi-digit long division and ask the student to narrate every step aloud; MC-1 shows as the student subtracting correctly within one cycle but moving to estimate the next quotient digit without appending the next dividend digit first.
  - **Repair approach**: Ground the repeated-cycle model (Mental Model 1) explicitly by naming all four steps aloud on every single repetition, without exception, even after the pattern feels automatic — treating "bring down" as inseparable from "subtract," never optional.

- **MC-2 — QUOTIENT-DIGIT-COLUMN-MISALIGNED**
  - **Statement**: The student writes a quotient digit above the wrong column, especially in the first cycle when the divisor doesn't divide the dividend's leading digit(s) evenly, so the first quotient digit doesn't align with the dividend's very first digit.
  - **Birth type**: Type 4, notation-induced — the written layout requires visually tracking which dividend digit each quotient digit corresponds to, and when the first cycle spans more than one leading digit (because the divisor is larger than the first digit alone), the visual "one digit per column" expectation from simpler cases breaks down without explicit reinforcement.
  - **Diagnostic probe**: Present a division where the divisor exceeds the dividend's first digit (e.g., 144 ÷ 12, where 12 doesn't fit into 1) and ask the student to identify which dividend digit their first quotient digit aligns with; MC-2 shows as a misplaced or unjustified column choice.
  - **Repair approach**: Ground the place-value-column model (Mental Model 2) with explicit column markers drawn above each dividend digit before starting, connecting quotient-digit placement to long-multiplication's own partial-product placement, which the student has already mastered.

- **MC-3 — PROCESS-TERMINATED-BEFORE-ALL-DIGITS-BROUGHT-DOWN**
  - **Statement**: The student stops the long-division algorithm once the numbers "look small enough," without verifying that every dividend digit has actually been brought down and that the final remainder is less than the divisor.
  - **Birth type**: Type 1, overgeneralization — a genuinely correct-feeling heuristic ("the leftover is small now, so I must be nearly done") gets applied as if it were the actual completion criterion, without checking the two explicit conditions (all digits brought down, remainder < divisor) that actually define completion.
  - **Diagnostic probe**: Present a long division with several digits in the dividend and ask the student to identify when they know they're finished; MC-3 shows as a vague "the number got small" justification rather than an explicit check of both completion conditions.
  - **Repair approach**: Explicitly teach the exhaustion-plus-range-check completion model (Mental Model 3) as a two-part checklist verified at the end of every long division, mirroring `math.arith.remainder`'s own explicit 0 ≤ r < b verification habit.

## Analogies
- **Assembly-line-cycle analogy**: long division is like an assembly line repeating the exact same four-station cycle (divide, multiply, subtract, bring down) once per unit of raw material (each dividend digit) — skipping a station on any single pass (MC-1) breaks that pass's output regardless of how correctly earlier passes were done.

## Demonstrations
- A fully narrated long division with all four steps named aloud on every repetition, including an explicit "bring down" call-out each time (targeting MC-1).
- A division where the divisor exceeds the dividend's leading digit(s), with explicit column markers showing where the first quotient digit belongs (targeting MC-2).
- A completed long division with an explicit final checklist: "are all dividend digits brought down? Is the remainder less than the divisor?" (targeting MC-3).

## Discovery Questions
1. "After you subtract, is there a step you always do before moving on to the next cycle?"
2. "If the divisor is bigger than the dividend's very first digit, where does your first quotient digit actually belong?"
3. "How do you know for certain that a long division is completely finished, not just 'looking done'?"

## Teaching Sequence
1. Confirm `math.arith.division` and `math.arith.long-multiplication` are solid.
2. Introduce the repeated-cycle model (Mental Model 1) with all four steps named explicitly on a simple example.
3. Practice the "bring down" step as a mandatory, never-optional final step of every cycle (targeting MC-1).
4. Introduce a division where the divisor exceeds the leading digit(s), explicitly marking columns (targeting MC-2).
5. Teach the explicit two-part completion checklist (targeting MC-3), applied at the end of every problem.
6. Practice mixed multi-digit divisions, always ending with the explicit completion check.

## Tutor Actions
- **DO: Worked Example** — a fully narrated four-step-cycle long division.
- **TEST-THINKING: Error Analysis** — present a solved example with a skipped bring-down step (MC-1) and ask the student to find the error.
- **SHOW: Demonstration** — explicit column markers for a division where the divisor exceeds the leading digit.
- **ORGANIZE: Checklist** — the two-part completion check (all digits brought down; remainder < divisor).

## Voice Teaching Notes
After every subtraction step, ask "what's the very next thing you do?" rather than letting the student proceed silently — this verbal checkpoint directly targets MC-1 by making the bring-down step an explicit, answered question rather than an assumed continuation.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a multi-digit division where the divisor exceeds the dividend's leading digits, requiring correct column alignment, complete digit bring-down, and explicit completion verification together.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one item with a divisor larger than the dividend's first digit (targeting MC-2) and one item requiring the student to explicitly state why the process is complete (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to physically writing out each of the four step names (Divide, Multiply, Subtract, Bring down) as a checklist beside the problem and checking off each one explicitly every cycle, before allowing the steps to be performed without the written checklist.

## Memory Hooks
- "Divide, Multiply, Subtract, Bring down — the same four steps, every single time, no skipping."
- "Each quotient digit sits above the dividend digit that finished its cycle."
- "Not done until every digit is down AND the remainder is smaller than the divisor."

## Transfer Connections
- Polynomial long division (algebra, later domain) reuses the identical four-step cycle structure, with polynomial terms playing the role of digits.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept at this time; long division is a pure arithmetic-procedure skill whose primary transfer value is within mathematics (polynomial long division).

## Blueprint References
None — no Blueprint exists for `math.arith.long-division` (verified via directory listing of `docs/curriculum/blueprints/`).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 8.
