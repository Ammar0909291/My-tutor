# math.arith.mental-arithmetic

## Identity
- **KG ID**: `math.arith.mental-arithmetic`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.mental-addition`, `math.arith.mental-multiplication`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.mental-arithmetic.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will flexibly combine mental-addition and mental-multiplication strategies (decomposition, compensation, memorized facts) to perform arithmetic computations quickly and accurately without written work, selecting a strategy suited to the specific numbers involved rather than applying one strategy rigidly to every problem.

## Core Understanding
Mental arithmetic is the integration of `math.arith.mental-addition`'s and `math.arith.mental-multiplication`'s separate strategy toolkits into one flexible, number-structure-driven practice: decomposition (splitting a number into easier parts), compensation (rounding one number to a convenient value and adjusting the result back), and direct fact recall all remain available, and the skilled mental calculator's core ability is recognizing which strategy — or combination — best fits the SPECIFIC numbers in front of them, rather than always reaching for the same one. A critical procedural detail specific to compensation is that it is a two-part, opposite-direction operation: rounding a number UP for convenience requires subtracting the same adjustment back out at the end (or rounding DOWN requires adding it back) — performing only the rounding half of compensation without its matching reversal produces a systematically wrong answer. A second critical detail is that mental strategies are NOT bound to the written algorithm's fixed right-to-left, ones-first order — working from the largest place value first (e.g., computing 47 + 38 as (40+30) + (7+8), tens before ones) is often easier mentally, even though it would be unusual to write down that way in a column algorithm.

## Mental Models
1. **The toolkit-selection model**: decomposition, compensation, and direct recall are separate tools, each suited to different number structures — the skill is choosing the right tool for the numbers at hand, not applying one tool to every problem.
2. **The compensation-is-a-round-trip model**: compensation always has two opposite-direction parts — adjust toward a convenient number, then adjust the RESULT back by the same amount in the opposite direction — a "round trip," not a one-way adjustment.
3. **The order-independence model**: mental strategies are free to work from the largest place value first (unlike the written algorithm's fixed right-to-left convention), since nothing about mental computation requires mimicking the column algorithm's ones-first order.

## Why Students Fail
The dominant failure is applying a single, recently-drilled mental strategy rigidly to every problem regardless of whether the specific numbers actually suit it, rather than re-assessing which strategy fits each new problem's number structure. A second failure, specific to compensation, is performing only the rounding-adjustment half of the procedure and forgetting the matching reverse adjustment, since the two halves move in opposite directions and only the first (rounding) feels like the "main" step. A third failure is assuming mental strategies must mirror the written algorithm's fixed right-to-left order, unnecessarily constraining a flexible mental process to a rigid procedural habit imported from a different, unrelated context.

## Misconceptions
- **MC-1 — STRATEGY-NOT-MATCHED-TO-NUMBER-STRUCTURE** (FOUNDATIONAL)
  - **Statement**: The student applies a single mental strategy (e.g., always decomposition, or always compensation) rigidly to every problem, regardless of whether the specific numbers actually suit that strategy, rather than re-assessing fit for each new problem.
  - **Birth type**: Type 1, overgeneralization — having built fluency with one strategy in `math.arith.mental-addition` or `math.arith.mental-multiplication`, the student overgeneralizes that fluency into "this is THE strategy," rather than recognizing each prerequisite concept itself taught multiple strategies precisely because different numbers suit different tools.
  - **Diagnostic probe**: Present two problems back to back where one clearly suits compensation (e.g., 98 + 47) and one clearly suits decomposition (e.g., 34 + 52) and ask the student to solve both mentally, narrating their strategy choice; MC-1 shows as using the SAME strategy for both, even when it is clearly more awkward for one of them.
  - **Repair approach**: Explicitly practice strategy SELECTION as its own skill, separate from execution — presenting a problem and asking "which strategy fits best here, and why?" before any computation is attempted, reinforcing the toolkit-selection model (Mental Model 1).

- **MC-2 — COMPENSATION-ADJUSTMENT-NOT-REVERSED**
  - **Statement**: The student performs the rounding-adjustment half of a compensation strategy but forgets to apply the matching reverse adjustment to the result, producing a systematically wrong answer (e.g., computing 47 + 38 by rounding 38 up to 40 and adding [47 + 40 = 87], but forgetting to subtract the 2 back out, leaving 87 instead of the correct 85).
  - **Birth type**: Type 5, instruction-induced — compensation is often taught and practiced with heavy emphasis on the rounding step (the "clever trick" part), while the mandatory reverse-adjustment step is treated as a minor afterthought rather than an equally mandatory half of the same procedure.
  - **Diagnostic probe**: Ask the student to compute 47 + 38 using compensation and narrate every step; MC-2 shows as rounding 38 to 40, computing 47 + 40 = 87, and stopping there without subtracting the 2 back out.
  - **Repair approach**: Explicitly frame compensation as the round-trip model (Mental Model 2) — "adjust one number for convenience, get an answer, then reverse that SAME adjustment on the answer" — treated as one inseparable two-part move, never a single step.

- **MC-3 — MENTAL-DECOMPOSITION-FORCED-INTO-WRITTEN-ALGORITHM-ORDER**
  - **Statement**: The student insists on decomposing and combining numbers mentally in the same right-to-left, ones-digit-first order required by the written column algorithm, even when working from the largest place value first would be easier mentally.
  - **Birth type**: Type 6, analogy overextension — the written algorithm's fixed right-to-left convention (a genuine structural requirement of that specific notation, needed for correct carrying/borrowing) gets overextended by analogy onto mental computation, which has no such structural requirement and is often easier the other way around.
  - **Diagnostic probe**: Ask the student to compute 47 + 38 mentally and narrate their approach; MC-3 shows as an insistence on starting from the ones digits (7+8) before considering the tens, even when the student finds this awkward, rather than freely starting from the larger place value (40+30).
  - **Repair approach**: Explicitly demonstrate and practice starting from the LARGEST place value first for several examples, naming this as a deliberate departure from the written algorithm's convention, permitted and often preferable specifically because mental computation has no carrying-column constraint to respect.

## Analogies
- **Toolbox-and-job-fit analogy**: just as `math.arith.mental-multiplication`'s own toolbox metaphor applies, choosing a mental strategy is choosing the right tool for a specific job — a strategy that works beautifully on one pair of numbers can be clumsy on another, and skilled mental calculators re-select the tool every time, not just once.

## Demonstrations
- Two contrasting problems solved side by side with clearly different best-fit strategies (e.g., 98 + 47 via compensation, 34 + 52 via decomposition), narrating why each strategy fits its problem (targeting MC-1).
- A full compensation computation with both halves explicitly narrated — the rounding adjustment AND its reversal — for 47 + 38 (targeting MC-2).
- The same addition computed both ones-first (written-algorithm style) and tens-first (mental-strategy style), showing both give the correct answer but the tens-first approach is often faster mentally (targeting MC-3).

## Discovery Questions
1. "Would compensation or decomposition be easier for THIS particular pair of numbers — and would your answer change for a different pair?"
2. "When you round a number up for convenience, what do you need to do to the answer afterward?"
3. "Does a mental calculation have to start from the ones digit, the way a written column addition does?"

## Teaching Sequence
1. Confirm `math.arith.mental-addition` and `math.arith.mental-multiplication`'s individual strategies are solid.
2. Introduce strategy SELECTION explicitly as its own skill (Mental Model 1), practicing "which strategy fits?" before any computation, targeting MC-1.
3. Reinforce the round-trip compensation model (Mental Model 2) with both halves narrated explicitly, targeting MC-2.
4. Introduce the order-independence model (Mental Model 3), contrasting ones-first and tens-first approaches to the same problem, targeting MC-3.
5. Practice a wide-ranging mixed set requiring the student to justify their strategy choice for each problem before computing.

## Tutor Actions
- **TEST-THINKING: Prediction** — before computing, predict which strategy fits a given problem best and justify the choice.
- **DO: Worked Example** — the full round-trip compensation computation with both halves narrated.
- **SHOW: Demonstration** — the same addition computed ones-first versus tens-first, contrasted directly.
- **ORGANIZE: Matching** — match a set of problems to their best-fit mental strategy.

## Voice Teaching Notes
Before allowing a student to compute, ask "which strategy are you going to use, and why does it fit these particular numbers?" as a standing separate question — this habit directly targets MC-1 by forcing an explicit strategy-selection step rather than an automatic default.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a set of varied problems (some suiting compensation, some decomposition) and require the student to justify their strategy choice for each before computing, directly assessing MC-1.
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one compensation item requiring the reverse adjustment (targeting MC-2) and one item where a tens-first approach is markedly easier than ones-first (targeting MC-3).

## Tutor Recovery Strategy
If MC-2 persists, regress to writing out both halves of every compensation computation explicitly on paper (the rounding step AND the reversal step, as two clearly labeled lines) until the two-part structure becomes automatic, before returning to purely mental, unwritten execution.

## Memory Hooks
- "Pick the tool that fits THESE numbers — not the one you used last time."
- "Round for convenience, then reverse that SAME amount — compensation is a round trip, not a one-way street."
- "Mental math can start big and work down — it doesn't have to go ones-first like the written algorithm."

## Transfer Connections
- Estimation (`math.arith.estimation`) reuses this concept's flexible strategy-selection habit when quickly approximating a computation before or instead of computing exactly.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; mental arithmetic is a pure arithmetic-fluency skill with its primary transfer value inside mathematics (quick estimation, everyday calculation) and general numeracy.

## Blueprint References
None — no Blueprint exists for `math.arith.mental-arithmetic` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This is the final concept of the `math.arith` domain's currently-ready set; 3 concepts remain blocked on number-theory prerequisites (`math.nt.gcd`, `math.nt.lcm`) and one further foundational prerequisite (`math.found.irrational-numbers`, already authored, but gated behind `square-roots`, now resolved this same wave).

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 8.
