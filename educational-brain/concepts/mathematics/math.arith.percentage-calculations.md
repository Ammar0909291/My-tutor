# math.arith.percentage-calculations

## Identity
- **KG ID**: `math.arith.percentage-calculations`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.percentages`
- **Unlocks**: (none in current KG)
- **Related**: `math.arith.percentage-change`
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.percentage-calculations.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly solve the three canonical percentage-calculation problem types — finding a percentage OF a quantity, finding what percentage one quantity IS OF another, and finding the whole GIVEN a part and its percentage — by first correctly identifying which quantity in the problem is the whole (100%) before selecting a calculation method.

## Core Understanding
Building on `math.arith.percentages`'s foundational part-whole meaning, this concept is about applying that meaning across three structurally different problem directions, all governed by the single relation part = percentage × whole. The single highest-leverage skill is correctly identifying WHICH quantity in a word problem plays the role of "the whole" (100%) before doing any arithmetic — once that identification is correct, all three problem types reduce to the same relation solved for a different unknown (solve for part; solve for percentage; solve for whole). Students who skip the identification step and instead pattern-match on surface keywords are the ones who apply the wrong operation direction.

## Mental Models
1. **The always-identify-the-whole-first model**: before any calculation, explicitly answer "which quantity represents 100% here?" — this single question, asked first and consistently, prevents the majority of procedural errors in this concept.
2. **The part=%×whole triangle model**: a three-quantity relation (part, percentage, whole) where knowing any two determines the third — visualized as a triangle/fraction-wheel where covering the unknown quantity reveals which operation (multiply or divide) to use.
3. **The reciprocal-direction model**: "finding the part" (multiply by the percentage) and "finding the whole" (divide by the percentage) are inverse operations of each other, just as multiplication and division are inverses — recognizing this inverse relationship prevents treating the three problem types as three unrelated procedures to memorize separately.

## Why Students Fail
The three problem types are surface-similar (all involve a percentage, a "part," and a "whole") but require different operations depending on which quantity is unknown. Students who have only practiced "find a percentage of a number" (multiplication) default to that same operation even when the problem structure actually requires finding the whole (division) — because they never explicitly practiced identifying the whole first, they instead pattern-match on which numbers appear in the problem and apply a familiar-feeling operation regardless of whether it is the correct one for that problem's actual unknown.

## Misconceptions
- **MC-1 — WHICH-QUANTITY-IS-THE-WHOLE-MISIDENTIFIED** (FOUNDATIONAL)
  - **Statement**: The student misidentifies which quantity in a word problem is the whole (100%), often defaulting to whichever number is stated first or is numerically larger, rather than reasoning about which quantity the percentage is genuinely a fraction OF.
  - **Birth type**: Type 5, instruction-induced — when practice sets are dominated by one problem type (typically "find a percentage of a given whole," where the whole is usually stated first and is usually the larger number), the student generalizes a surface pattern ("the bigger/first number is the whole") instead of the underlying reasoning ("the whole is whatever quantity the percentage is a fraction of").
  - **Diagnostic probe**: Present a problem where the whole is NOT the first-stated or larger number (e.g., "15 is 25% of what number?" where 15 is smaller and stated first) and ask the student to identify the whole before calculating; MC-1 shows as either identifying 15 as the whole or skipping the identification step entirely and guessing an operation.
  - **Repair approach**: Drill the identification step in isolation, separated from calculation — present several word problems and ask ONLY "what is the whole here?" with no arithmetic required, until the identification skill is independently solid, before recombining it with calculation.

- **MC-2 — FINDING-THE-WHOLE-CONFUSED-WITH-FINDING-THE-PART**
  - **Statement**: Once the whole is correctly identified as unknown, the student still multiplies by the percentage (the "find the part" operation) instead of dividing, producing an answer smaller than the known part even though the whole must be larger than any part of it.
  - **Birth type**: Type 6, analogy overextension — the "find a percentage of a number" procedure (multiply) is the first and most heavily practiced percentage procedure, and its multiply-by-the-percentage pattern gets overextended by analogy to every percentage problem, including ones whose correct operation is actually the inverse.
  - **Diagnostic probe**: Ask the student to sanity-check their own answer against the size relationship: "should the whole be bigger or smaller than the part you were given?" A student with MC-2 will often produce answer values that are smaller than the given part yet not notice the contradiction until prompted.
  - **Repair approach**: Explicitly teach the reciprocal-direction model (Mental Model 3) alongside a standing self-check habit: "is my answer's size relationship to the given part sensible?" — a whole must always be at least as large as any of its parts (for percentages ≤ 100%), so this single sanity check catches the majority of MC-2 errors before they're finalized.

- **MC-3 — PERCENT-EXCEEDING-100-ASSUMED-IMPOSSIBLE**
  - **Statement**: The student treats any percentage over 100% as an error or impossibility (e.g., rejects "this year's sales are 120% of last year's" as nonsensical), because their working definition of percentage was built entirely on part-of-a-whole examples where the part is always smaller than or equal to the whole.
  - **Birth type**: Type 1, overgeneralization — early percentage instruction is dominated by proper-fraction-style examples (a part that is less than its whole), and the student overgeneralizes "percentage" to mean "necessarily ≤ 100%" rather than recognizing that a percentage can express any ratio, including a quantity that exceeds its comparison base (e.g., growth, increase, "more than the original").
  - **Diagnostic probe**: Ask the student to interpret "the new price is 150% of the old price" in their own words; MC-3 surfaces as confusion, rejection of the premise, or an attempt to "fix" the number down to 100% or below.
  - **Repair approach**: Introduce concrete over-100% examples early and explicitly (population growth, price increases, "more than double" scenarios expressed as percentages) alongside the standard under-100% part-of-whole examples, framing percentage explicitly as "a way to express ANY ratio between two quantities," not restricted to proper-fraction cases.

## Analogies
- **Recipe-scaling analogy**: finding the whole given a part and its percentage is like knowing you have "30% of the flour a recipe needs" and working backward to find out how much flour the full recipe calls for — the known amount is smaller than the answer you're solving for, which primes the correct size intuition against MC-2.
- **Non-analogy warning**: avoid over-relying on discount/sale-price examples (always ≤100%) as the sole worked-example pool, since a steady diet of "part is smaller" examples is exactly what produces MC-3.

## Demonstrations
- Side-by-side worked examples of all three problem types using the SAME underlying numbers (e.g., "40 is what % of 200?", "what is 20% of 200?", "40 is 20% of what number?"), so the structural relationship between the three types is visually and numerically obvious rather than three disconnected procedures.
- A percentage triangle/wheel diagram physically covering the unknown quantity to reveal the needed operation (Mental Model 2), demonstrated across all three problem types.

## Discovery Questions
1. "In this problem, which quantity represents the whole thing — the 100%?"
2. "If you're solving for the whole, should your answer be bigger or smaller than the part you were given? Why?"
3. "Can a percentage ever be more than 100%? What would that mean in real life?"

## Teaching Sequence
1. Confirm `math.arith.percentages`'s part-whole-percentage relation is solid.
2. Drill whole-identification in isolation (no calculation) across varied problem phrasings, directly targeting MC-1.
3. Introduce all three problem types side-by-side using shared numbers (per Demonstrations) so the reciprocal relationship (Mental Model 3) is explicit from the start, rather than teaching "find the part" to fluency first and only later introducing "find the whole" as an afterthought (which is exactly the sequencing that produces MC-2 in the wild).
4. Introduce the size-relationship sanity check as a standing habit for every solved problem.
5. Introduce over-100% examples explicitly and early relative to typical practice-set composition, to preempt MC-3.
6. Practice all three problem types interleaved (never blocked by type), requiring whole-identification as an explicit first written step before any calculation.

## Tutor Actions
- **TELL: Explanation** — the part=%×whole relation and its three solve-for-X variants.
- **DO: Worked Example** — the shared-numbers three-type comparison (see Demonstrations).
- **TEST-THINKING: Prediction** — before calculating, predict whether the answer should be bigger or smaller than the given part.
- **TEST-THINKING: Error Analysis** — present a solved "find the whole" problem with MC-2's multiply-instead-of-divide error and ask the student to find and explain the mistake.

## Voice Teaching Notes
Always ask "what's the whole here?" as an explicit, separate spoken question before any calculation prompt — making the identification step audibly its own turn (rather than folding it silently into the calculation) is the single highest-leverage voice-teaching habit for this concept, directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (no Blueprint exists yet for `math.arith.percentage-change`, the natural next concept, so no genuine Tier-1 cross-link target is available). Present an over-100% real-world scenario (e.g., "a town's population is now 130% of what it was 10 years ago — if the population was 4,000 then, what is it now?") requiring both correct whole-identification (the OLD population) and comfort with percentages exceeding 100% (MC-3).
- **P77 (mastery gate)**: 5/5 correct across all three problem types (find-the-part, find-the-percentage, find-the-whole) with at least one item where the whole is not the first-stated number (targeting MC-1) and one item exceeding 100% (targeting MC-3).

## Tutor Recovery Strategy
If whole-identification (MC-1) remains shaky after isolated drilling, regress to concrete, physically groundable examples (e.g., "this jar has some marbles; 25% of them are red; there are 5 red marbles — how many marbles are in the whole jar?") where the whole is a tangible, countable total, before returning to abstract word-problem phrasing.

## Memory Hooks
- "Ask 'what's the whole?' before you touch a single number."
- "Bigger comes from smaller when you're finding the whole — check your answer's size before you're done."

## Transfer Connections
- Ratio and proportion problems (`math.arith.ratios`, `math.arith.proportion`) use the identical "identify the base quantity first" reasoning skill.
- Percentage change and interest calculations (future concepts) directly extend the "find the whole given a part" reasoning to more complex multi-step scenarios.

## Cross-Subject Connections
- Chemistry: concentration and yield calculations (e.g., percent yield, percent composition) require the same whole-identification discipline before applying a percentage formula.
- Economics/finance contexts (real-world word problems): interest, tax, and discount calculations all require correctly identifying the base (whole) amount before applying a rate.

## Blueprint References
None — no Blueprint exists for `math.arith.percentage-calculations` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
`math.arith.percentage-change` (this concept's `related` sibling) does not yet have a Blueprint or Educational Brain entry — confirmed via directory listing — so the P76 transfer probe above uses independence mode rather than a genuine cross-link; this should be revisited once `percentage-change` is authored, as it would be a strong genuine Tier-1 cross-link target at that point. No KG or Blueprint file was modified in authoring this entry.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 6 part 2.
