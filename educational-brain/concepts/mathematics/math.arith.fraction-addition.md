# math.arith.fraction-addition

## Identity
- **KG ID**: `math.arith.fraction-addition`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.fractions`, `math.nt.lcm`
- **Unlocks**: `math.alg.rational-expressions-addition`
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.fraction-addition.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will add (and subtract) fractions with unlike denominators by finding a common denominator (the LCM of the denominators), correctly rescaling each numerator by the same factor used to convert its denominator, and correctly matching each rescaling factor to its own fraction.

## Core Understanding
Building directly on `math.nt.lcm`'s computational method, adding fractions with unlike denominators requires first converting both fractions to equivalent fractions sharing a common denominator — the LCM of the two original denominators is the standard, smallest choice. Converting a fraction to the common denominator means multiplying BOTH its numerator and denominator by the same scale factor (the LCM divided by that fraction's own original denominator) — per `math.arith.fraction-equivalence`'s equivalence-preserving rule, multiplying only the denominator (or only the numerator) would change the fraction's actual value. Only once both fractions share the identical denominator can the numerators be added directly, with the shared denominator carried through unchanged — fractions cannot be added by simply adding numerators and denominators independently, since that operation doesn't correspond to any meaningful combination of the original quantities.

## Mental Models
1. **The common-unit-first model**: fractions with different denominators are expressed in different-sized "pieces" — you cannot meaningfully combine thirds and halves until both are re-expressed in the SAME size piece (a common denominator), exactly as you cannot directly add "3 feet + 2 yards" without first converting to matching units.
2. **The paired-scaling model**: converting a fraction to a new denominator means multiplying numerator AND denominator by the identical scale factor — the two multiplications are one inseparable action, never performed independently.
3. **The matched-factor model**: each of the two fractions gets its OWN scale factor (LCM ÷ that fraction's own denominator) — the two scale factors are generally different from each other, and each must be applied only to its own fraction, never swapped.

## Why Students Fail
The dominant and most foundational failure is adding numerators together and denominators together directly (treating fraction addition as if it worked like ordinary paired addition), completely bypassing the need for a common denominator. A second failure, occurring even after correctly identifying the common denominator, is converting the denominator to the new common value but forgetting to apply the identical scaling to the numerator, leaving it at its original (now incorrect) value. A third failure, once both scale factors have been correctly computed, is applying the wrong scale factor to the wrong fraction — swapping which multiplier belongs to which original fraction.

## Misconceptions
- **MC-1 — NUMERATORS-AND-DENOMINATORS-ADDED-DIRECTLY** (FOUNDATIONAL)
  - **Statement**: The student adds fractions by adding the numerators together and the denominators together directly (e.g., 1/2 + 1/3 computed as 2/5), without finding any common denominator at all.
  - **Birth type**: Type 1, overgeneralization — whole-number addition combines corresponding parts directly, and this pattern is overgeneralized onto fractions, where numerator and denominator play fundamentally different roles (a count and a unit size) that cannot simply be added independently.
  - **Diagnostic probe**: Ask the student to compute 1/2 + 1/3; MC-1 shows as an answer of 2/5 rather than the correct 5/6.
  - **Repair approach**: Ground the common-unit-first model (Mental Model 1) with a concrete visual (e.g., a halves-strip and a thirds-strip physically overlaid), showing that "adding across" mismatched piece sizes produces a meaningless, incorrect result, and that both fractions must first be re-expressed in matching, same-sized pieces (sixths) before any addition of counts makes sense.

- **MC-2 — NUMERATOR-NOT-RESCALED-WHEN-DENOMINATOR-CONVERTED**
  - **Statement**: The student correctly converts a fraction's denominator to the common denominator but forgets to apply the identical scaling to the numerator, leaving it at its original, now-incorrect value (e.g., converting 1/3 to a denominator of 6 by multiplying the denominator by 2, but leaving the numerator as 1 instead of scaling it to 2, giving the wrong fraction 1/6 instead of the correct equivalent 2/6).
  - **Birth type**: Type 5, instruction-induced — the denominator-conversion step is often the visually salient part of the procedure (since it's the value being explicitly matched to the target common denominator), while the paired numerator scaling can be treated as a secondary, easily-skipped afterthought rather than an equally mandatory half of the same single action.
  - **Diagnostic probe**: Ask the student to convert 1/3 to a fraction with denominator 6 and narrate every step; MC-2 shows as scaling only the denominator (3→6) while leaving the numerator unscaled (staying at 1 rather than becoming 2).
  - **Repair approach**: Reinforce the paired-scaling model (Mental Model 2) by treating numerator and denominator scaling as one single, inseparable multiplication action — "multiply the WHOLE fraction by [scale factor]/[scale factor]," never "adjust the denominator, then maybe the numerator."

- **MC-3 — SCALE-FACTORS-SWAPPED-BETWEEN-FRACTIONS**
  - **Statement**: After correctly computing the two distinct scale factors needed (one per fraction, each equal to the common denominator divided by that fraction's own original denominator), the student applies the wrong scale factor to the wrong fraction, swapping which multiplier belongs to which original fraction.
  - **Birth type**: Type 4, notation-induced — when both scale factors are computed together before either conversion is carried out, it becomes visually easy to lose track of which factor was derived from which original denominator, especially if the two factors are written near each other without a clear pairing.
  - **Diagnostic probe**: Ask the student to add 1/4 + 1/6 (common denominator 12, scale factors 3 and 2 respectively) and narrate their scale-factor assignment; MC-3 shows as applying the factor of 2 to the 1/4 fraction and 3 to the 1/6 fraction (swapped), producing incorrect converted fractions.
  - **Repair approach**: Compute and apply each scale factor immediately, one fraction at a time, completing the full conversion of the first fraction before beginning the second — rather than computing both scale factors up front and then applying them, which invites the swap.

## Analogies
- **Mismatched-units analogy** (Mental Model 1): adding "3 feet + 2 yards" without first converting to a common unit produces a meaningless "5" of no particular unit — exactly as adding 1/2 + 1/3 by combining numerators and denominators directly produces a number with no coherent meaning relative to the original quantities.

## Demonstrations
- Overlaid halves-strip and thirds-strip visual, both re-expressed in sixths before addition, directly grounding why a common denominator is necessary (targeting MC-1).
- The full, explicit conversion of 1/3 to sixths, narrated as "multiply the WHOLE fraction by 2/2" (both numerator and denominator together), rather than two separate steps (targeting MC-2).
- The full worked computation of 1/4 + 1/6, with each fraction's own scale factor computed and applied immediately, one at a time, before moving to the next fraction (targeting MC-3).

## Discovery Questions
1. "Can you add 1/2 and 1/3 directly the way you'd add whole numbers — why or why not?"
2. "When you convert a fraction's denominator, does the numerator need to change too? By how much?"
3. "If two fractions need different scale factors, how do you make sure each factor gets applied to the right fraction?"

## Teaching Sequence
1. Confirm `math.arith.fractions` and `math.nt.lcm` are solid.
2. Introduce the common-unit-first model (Mental Model 1) via the overlaid-strips visual, directly targeting MC-1's bypass of common denominators.
3. Introduce the paired-scaling model (Mental Model 2) as one inseparable action, targeting MC-2.
4. Introduce the matched-factor model (Mental Model 3), completing one fraction's full conversion before starting the next, targeting MC-3.
5. Practice mixed problems requiring the LCM computation, both conversions, and the final addition, always narrating scale factors explicitly per fraction.

## Tutor Actions
- **SHOW: Demonstration** — the overlaid halves-and-thirds strips converted to sixths (Mental Model 1, targeting MC-1).
- **DO: Worked Example** — the full 1/3-to-sixths conversion narrated as one inseparable multiplication (targeting MC-2).
- **TEST-THINKING: Error Analysis** — a solved example with swapped scale factors (targeting MC-3), asking the student to find the error.
- **ORGANIZE: Matching** — match each fraction to its own correct scale factor before converting.

## Voice Teaching Notes
When converting a fraction's denominator, always say "multiply the WHOLE fraction by [factor] over [factor]" rather than "change the denominator to…" — this phrasing keeps numerator and denominator scaling verbally inseparable, directly targeting MC-2.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a real-world combination scenario (e.g., combining 1/4 cup and 1/6 cup of an ingredient) requiring the full LCM-based common-denominator procedure, assessing all three misconceptions together.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one item requiring two distinct, non-trivial scale factors (targeting MC-3) and one item where a careless direct-addition shortcut would produce a plausible-looking wrong answer (targeting MC-1).

## Tutor Recovery Strategy
If MC-1 persists after the overlaid-strips demonstration, regress to physically re-drawing both fractions on the SAME strip divided into the common number of pieces, counting shaded pieces directly, before returning to purely numeric procedure.

## Memory Hooks
- "Different-sized pieces can't be added directly — match the pieces first."
- "Convert the WHOLE fraction, numerator and denominator together, never just one."
- "Each fraction gets its OWN scale factor — don't mix them up."

## Transfer Connections
- `math.alg.rational-expressions-addition` (unlocks) applies this identical common-denominator procedure to algebraic fractions with variable denominators.

## Cross-Subject Connections
- Chemistry and cooking contexts: combining quantities expressed in different fractional units (e.g., recipe measurements) directly requires this concept's common-denominator procedure.

## Blueprint References
None — no Blueprint exists for `math.arith.fraction-addition` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This is the second of `math.arith`'s final 2 concepts, unblocked this session by `math.nt.lcm`'s authoring. With this entry and `fraction-simplification` complete, `math.arith` reaches 58/58 — DOMAIN CERTIFIED, the second mathematics domain to reach certification, after `math.found`.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 10 (final wave).
