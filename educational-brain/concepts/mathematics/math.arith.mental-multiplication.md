# math.arith.mental-multiplication

## Identity
- **KG ID**: `math.arith.mental-multiplication`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.multiplication-table`
- **Unlocks**: `math.arith.mental-arithmetic`
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.mental-multiplication.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will flexibly apply mental multiplication strategies — doubling/halving, distributive decomposition, and powers-of-10 patterns — to compute products without a written algorithm, selecting a strategy suited to the specific numbers involved.

## Core Understanding
Mental multiplication is not one procedure but a toolkit of strategies, each suited to particular number structures: distributive decomposition (splitting a factor into a sum, e.g., 23 × 6 = (20 × 6) + (3 × 6)) works generally; doubling-and-halving (e.g., 15 × 16 = 30 × 8) exploits a factor that can be evenly halved; powers-of-10 patterns (e.g., 34 × 100 = 3400) exploit the multiplier's specific structure. The central skill is recognizing which strategy fits the numbers at hand, and executing it completely — a partial application of any strategy (stopping halfway through a decomposition, or halving an odd number without accounting for the remainder) produces a wrong answer that looks like a reasonable shortcut.

## Mental Models
1. **The split-and-recombine model** (distributive decomposition): break one factor into a sum of easier pieces, multiply each piece by the other factor, then add the partial results back together — every piece must be accounted for, or the recombination is incomplete.
2. **The balance-scale model** (doubling/halving): multiplying one factor by 2 and dividing the other by 2 keeps the product unchanged, like moving equal weight between two pans of a balance scale — but this only works cleanly when the number being halved divides evenly; halving an odd number breaks the balance.
3. **The digit-shift model** (powers of 10): multiplying by 10, 100, 1000, … shifts every digit left by the corresponding number of places — a pattern grounded in place value, not an arbitrary "add zeros" rule.

## Why Students Fail
The dominant failure is applying the distributive-decomposition strategy incompletely — splitting a factor into parts but forgetting to multiply one of the parts, effectively dropping a term from the sum. A second failure is misapplying doubling-and-halving to a number that doesn't halve evenly, silently dropping the remainder rather than recognizing the strategy doesn't cleanly apply. A third failure is miscounting how many place-value shifts a power-of-10 multiplication requires, especially for larger powers.

## Misconceptions
- **MC-1 — DISTRIBUTIVE-DECOMPOSITION-APPLIED-INCOMPLETELY** (FOUNDATIONAL)
  - **Statement**: The student splits a factor into parts (e.g., 23 = 20 + 3) but multiplies only one part by the other factor, dropping the second term entirely (e.g., computing 23 × 6 as 20 × 6 = 120, forgetting the 3 × 6 = 18 term, giving 120 instead of 138).
  - **Birth type**: Type 5, instruction-induced — the decomposition step is often taught as "split the number, then multiply the big part," with the smaller part's contribution treated as an afterthought rather than an equally mandatory term, so under time pressure the smaller term is the one most often dropped.
  - **Diagnostic probe**: Ask the student to compute 23 × 6 mentally and narrate their steps aloud; MC-1 shows as computing 20 × 6 and stopping, or forgetting to add the 3 × 6 contribution.
  - **Repair approach**: Explicitly frame the decomposition as "two separate multiplications that must BOTH happen, then get added" (Mental Model 1), practicing with the smaller term deliberately made non-trivial (e.g., 23 × 6's "3 × 6 = 18" is not a rounding error to skip) so both terms feel equally mandatory.

- **MC-2 — HALVING-DOUBLING-MISAPPLIED-TO-AN-ODD-FACTOR**
  - **Statement**: The student applies the doubling-and-halving strategy to a factor that doesn't divide evenly by 2, silently dropping the remainder rather than recognizing the strategy requires an evenly-halvable number (e.g., attempting 15 × 17 by halving 17 to "8" and doubling 15 to 30, losing the leftover 0.5 of 17).
  - **Birth type**: Type 1, overgeneralization — having seen the strategy work cleanly on even numbers, the student overgeneralizes it to odd numbers without checking the evenness precondition the strategy actually depends on.
  - **Diagnostic probe**: Present a doubling-and-halving problem with an odd factor (e.g., 15 × 17) and ask the student to apply the strategy; MC-2 shows as halving 17 to a rounded "8" or "8.5" treated as 8, without recognizing the strategy has broken down.
  - **Repair approach**: Explicitly teach the evenness precondition as part of the strategy-selection step (Mental Model 2's balance-scale framing: "does this factor split evenly in half? If not, this strategy doesn't apply cleanly — choose a different one, like distributive decomposition instead").

- **MC-3 — POWER-OF-10-SHIFT-COUNT-MISCOUNTED**
  - **Statement**: When multiplying by a power of 10 (e.g., 100, 1000), the student appends the wrong number of zeros or shifts digits an incorrect number of places, especially for larger powers of 10.
  - **Birth type**: Type 4, notation-induced — the "add zeros" surface-level trick (rather than the underlying place-value shift) is easy to apply with an off-by-one zero-count error, especially for powers of 10 beyond the most commonly drilled ones (10, 100).
  - **Diagnostic probe**: Ask the student to compute 34 × 10,000; MC-3 shows as an incorrect number of appended zeros (e.g., 340,000 or 34,000,000 instead of the correct 340,000... verify: 34 × 10,000 = 340,000 — three extra zeros correctly appended from four zeros in 10,000 minus... actually 34 has no trailing zero, so 34×10,000 directly appends the 4 zeros of 10,000: 340,000. A miscounted answer might be 3,400,000 or 34,000.).
  - **Repair approach**: Ground the shift explicitly in place value (Mental Model 3: "each zero in the power of 10 is one place-value shift left") rather than a bare "count the zeros and copy them" rule, and practice with a mix of powers of 10 (10, 100, 1,000, 10,000) to prevent over-fitting to the most common cases.

## Analogies
- **Toolbox analogy**: mental multiplication strategies are like tools in a toolbox — distributive decomposition is a versatile wrench that works on almost anything, doubling-and-halving is a specialized tool that only fits certain "evenly-halvable" bolts, and the powers-of-10 shift is a tool built for one specific job (multiplying by 10, 100, …).

## Demonstrations
- Side-by-side computation of 23 × 6 via full distributive decomposition, explicitly writing both partial terms before adding (targeting MC-1).
- A doubling-and-halving computation on an even factor (15 × 16 = 30 × 8 = 240) contrasted against an attempted (and broken) application to an odd factor (15 × 17), showing why the strategy doesn't cleanly apply (targeting MC-2).

## Discovery Questions
1. "When you split 23 into 20 and 3, do BOTH pieces need to be multiplied, or just the bigger one?"
2. "Does doubling-and-halving work the same way when the number you're halving is odd?"
3. "How many place-value shifts does multiplying by 10,000 require — and how do you know, beyond just counting zeros?"

## Teaching Sequence
1. Confirm `math.arith.multiplication-table` fluency is solid.
2. Introduce distributive decomposition first as the general-purpose strategy, explicitly requiring both terms (targeting MC-1).
3. Introduce doubling-and-halving with an explicit evenness precondition check (targeting MC-2), contrasted against a broken odd-factor attempt.
4. Introduce powers-of-10 shifts grounded in place value, not zero-counting alone (targeting MC-3), practiced across a range of powers.
5. Practice strategy SELECTION explicitly — present a mixed set of problems and ask the student to name which strategy fits before computing.

## Tutor Actions
- **DO: Worked Example** — the full distributive decomposition of 23 × 6, both terms shown explicitly.
- **TEST-THINKING: Error Analysis** — the broken odd-factor doubling-and-halving attempt (15 × 17).
- **ORGANIZE: Matching** — match a multiplication problem to the mental strategy best suited to it.
- **TEST-THINKING: Prediction** — before computing, predict how many place-value shifts a powers-of-10 multiplication requires.

## Voice Teaching Notes
When a student begins a distributive decomposition aloud, prompt for BOTH terms explicitly before allowing them to add ("what's the big part times six? And what's the small part times six?") — this verbal completeness check directly targets MC-1's dropped-term failure.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a problem requiring the student to choose between distributive decomposition and doubling-and-halving for a given pair of factors, justifying the choice based on the numbers' structure (even/odd, proximity to a round number).
- **P77 (mastery gate)**: 4/5 correct across a mixed set covering all three strategies, including at least one item with an odd factor presented as a doubling-and-halving distractor (targeting MC-2).

## Tutor Recovery Strategy
If MC-1 persists, regress to writing out the full expanded distributive form on paper for every problem (20 × 6 = 120, 3 × 6 = 18, 120 + 18 = 138) until both-terms completeness becomes automatic, before allowing purely mental (unwritten) execution.

## Memory Hooks
- "Split it, multiply BOTH pieces, then add — never just the big one."
- "Halving only works cleanly on even numbers — check first."
- "Count the zeros as place-value shifts, not just digits to copy."

## Transfer Connections
- `math.arith.mental-arithmetic` (unlocks) combines this concept's strategies with `math.arith.mental-addition`'s strategies into a broader mental-computation toolkit.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; mental multiplication is a pure arithmetic-fluency skill with its primary transfer value inside mathematics (broader mental arithmetic, estimation).

## Blueprint References
None — no Blueprint exists for `math.arith.mental-multiplication` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
