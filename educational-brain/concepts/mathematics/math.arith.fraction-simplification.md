# math.arith.fraction-simplification

## Identity
- **KG ID**: `math.arith.fraction-simplification`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.fraction-equivalence`, `math.nt.gcd`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.fraction-simplification.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will simplify a fraction to lowest terms by dividing both numerator and denominator by their greatest common divisor (GCD), correctly verify that the resulting fraction cannot be reduced further, and correctly identify the GCD via prime factorization rather than checking only small, "obvious" common factors.

## Core Understanding
Building on `math.arith.fraction-equivalence`'s general principle (multiplying or dividing numerator and denominator by the SAME nonzero number preserves a fraction's value) and `math.nt.gcd`'s computational methods, simplifying a fraction to lowest terms means dividing both numerator and denominator by their GCD — not just ANY common factor. Dividing by a common factor smaller than the GCD produces a genuinely equivalent, smaller-looking fraction, but one that is NOT yet in lowest terms, since further reduction remains possible; only dividing by the GCD guarantees the result cannot be simplified any further. Because the GCD is not always obvious from a fraction's surface appearance (a shared large prime factor can hide in two numbers that don't share any small, "obvious" common factor like 2, 3, or 5), the reliable method is computing the GCD directly via prime factorization or the Euclidean algorithm, never by inspection alone.

## Mental Models
1. **The complete-vs-partial-reduction model**: dividing by a common factor smaller than the GCD is a genuine, valid step, but an INCOMPLETE one — the fraction is simplified, just not to LOWEST terms, and further reduction remains available.
2. **The same-number-both-parts model** (from `math.arith.fraction-equivalence`): the numerator and denominator must always be divided by the exact SAME number to preserve the fraction's value — dividing them by different numbers changes what the fraction actually represents.
3. **The hidden-shared-prime model**: two numbers can share a common factor that isn't one of the "usual suspects" (2, 3, 5) — the only reliable way to find the TRUE GCD is prime factorization or the Euclidean algorithm, not a quick visual check for small common factors.

## Why Students Fail
The dominant failure is stopping after dividing by SOME common factor, mistaking a partially-reduced fraction for one in lowest terms, without verifying no further common factor remains. A second failure, more procedural, is dividing the numerator and denominator by two DIFFERENT numbers rather than the same one, breaking the fraction's actual value while appearing to "simplify" it. A third failure is judging a fraction to already be in lowest terms based on the absence of small, easily-spotted common factors, missing a larger shared prime factor that a systematic GCD computation would reveal.

## Misconceptions
- **MC-1 — SIMPLIFICATION-STOPS-BEFORE-LOWEST-TERMS** (FOUNDATIONAL)
  - **Statement**: The student divides numerator and denominator by a common factor smaller than the true GCD, producing a genuinely equivalent but not-fully-reduced fraction, and incorrectly treats it as finished (e.g., simplifying 24/36 by dividing by 2 to get 12/18, stopping there, rather than continuing to 2/3 via GCD=12).
  - **Birth type**: Type 1, overgeneralization — dividing by ANY common factor genuinely does produce a smaller, equivalent fraction, and the student overgeneralizes "smaller-looking" as equivalent to "fully reduced," without an explicit habit of re-checking for further common factors.
  - **Diagnostic probe**: Ask the student to simplify 24/36 and check their work; MC-1 shows as an answer like 12/18 (correctly equivalent, but not lowest terms) presented as the final, complete simplification.
  - **Repair approach**: Ground the complete-vs-partial-reduction model (Mental Model 1) with an explicit verification habit — after any division step, ask "do the new numerator and denominator still share a common factor?" and repeat the division until the answer is no, or compute the GCD directly up front to guarantee a one-step complete reduction.

- **MC-2 — NUMERATOR-AND-DENOMINATOR-DIVIDED-BY-DIFFERENT-VALUES**
  - **Statement**: The student divides the numerator and denominator by two DIFFERENT numbers (rather than the same number), producing a fraction with a genuinely different value, while believing they have correctly simplified it.
  - **Birth type**: Type 5, instruction-induced — the mechanical action of "make the numbers smaller by dividing" is performed on each part somewhat independently, without the equivalence-preserving constraint (dividing by the exact same value) held firmly in view from `math.arith.fraction-equivalence`.
  - **Diagnostic probe**: Ask the student to simplify 8/12 and show each division step explicitly; MC-2 shows as, for example, dividing the numerator by 4 and the denominator by 2 (giving 2/6, a different value from the original 8/12 = 2/3), rather than dividing both by the same value.
  - **Repair approach**: Re-anchor explicitly on the same-number-both-parts model (Mental Model 2), verifying via cross-multiplication or decimal comparison that the "simplified" fraction still equals the original before accepting any simplification as valid.

- **MC-3 — LOWEST-TERMS-ASSUMED-FROM-SMALL-OBVIOUS-FACTORS-ONLY**
  - **Statement**: The student judges a fraction to already be in lowest terms because it doesn't share an "obvious" small common factor (like 2, 3, or 5), missing a larger shared prime factor that a systematic GCD check would reveal (e.g., believing 91/143 is already simplified, missing that both share the factor 13: 91 = 7×13, 143 = 11×13).
  - **Birth type**: Type 2, perceptual intuition — a quick visual scan for small, familiar factors "feels" like a complete check, especially since most everyday simplification examples involve small shared factors, making the perceptual habit an unreliable stand-in for the actual GCD computation.
  - **Diagnostic probe**: Present 91/143 and ask whether it is already in lowest terms; MC-3 shows as "yes" based on the absence of small shared factors, without computing the actual prime factorizations.
  - **Repair approach**: Reinforce the hidden-shared-prime model (Mental Model 3) by walking through the full prime factorization of both parts of a "deceptive" fraction like 91/143, showing the shared factor 13 that a quick visual scan would miss, establishing prime factorization (not visual inspection) as the reliable standing habit.

## Analogies
- **Reducing-a-recipe analogy**: a recipe calling for "8 cups flour, 12 cups sugar" can be reduced to "2 cups flour, 3 cups sugar" (the same ratio, smaller numbers) — but reducing it only partway, to "4 cups flour, 6 cups sugar," is still a valid smaller recipe, just not the SIMPLEST version of it.

## Demonstrations
- The step-by-step simplification of 24/36, first via a smaller common factor (2, giving 12/18) then continuing to the true GCD (12, giving 2/3), directly contrasting a partial and complete reduction (targeting MC-1).
- The full prime factorization of 91 and 143, revealing the shared factor 13 despite no small common factor being visible (targeting MC-3).

## Discovery Questions
1. "After you divide, can you still find a common factor in the new numerator and denominator — or are you truly done?"
2. "Are you dividing the numerator and the denominator by the exact same number?"
3. "Just because two numbers don't share an obvious small factor like 2, 3, or 5, does that mean they share NO common factor at all?"

## Teaching Sequence
1. Confirm `math.arith.fraction-equivalence` and `math.nt.gcd` are solid.
2. Introduce the same-number-both-parts model (Mental Model 2) as a non-negotiable constraint, targeting MC-2 proactively.
3. Introduce the complete-vs-partial-reduction model (Mental Model 1) via the 24/36 stepwise example, targeting MC-1.
4. Introduce the hidden-shared-prime model (Mental Model 3) via the 91/143 example, targeting MC-3.
5. Practice mixed simplification problems, always requiring the student to verify the GCD was truly found (via prime factorization) before accepting a result as fully simplified.

## Tutor Actions
- **DO: Worked Example** — the stepwise 24/36 simplification, partial then complete (targeting MC-1).
- **TEST-THINKING: Error Analysis** — a division-by-different-numbers error, asking the student to spot why the result isn't equivalent (targeting MC-2).
- **DO: Worked Example** — the 91/143 prime-factorization reveal (targeting MC-3).
- **TEST-THINKING: Prediction** — before simplifying, predict whether a fraction is already in lowest terms, then verify via prime factorization.

## Voice Teaching Notes
After any simplification step, ask "is there STILL a common factor left?" as a standing, separate verbal check — this single habit, applied consistently, directly targets MC-1 by making the completeness check explicit rather than assumed.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a fraction with a hidden large shared prime factor (like 91/143) and require the student to compute the GCD via prime factorization to determine whether it is truly in lowest terms, directly assessing MC-3.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one fraction requiring more than one division step if approached incorrectly (targeting MC-1) and one item with a hidden large shared prime factor (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to requiring the GCD be computed explicitly via prime factorization BEFORE any division is performed (rather than dividing by a guessed common factor first), guaranteeing a single, complete reduction step every time, before allowing the faster, guess-then-check approach.

## Memory Hooks
- "Smaller isn't always simplest — check again for one more common factor."
- "Divide both parts by the SAME number, always."
- "No small common factor doesn't mean no common factor — check the actual prime factorizations."

## Transfer Connections
- `math.nt.gcd` (prerequisite) supplies both the minimum-exponent prime-factorization method and the Euclidean algorithm this concept applies directly.
- Ratio simplification (`math.arith.ratios`) reuses the identical GCD-based reduction procedure.

## Cross-Subject Connections
- Chemistry: simplifying mole ratios in chemical formulas to their lowest whole-number terms directly reuses this concept's GCD-based reduction.

## Blueprint References
None — no Blueprint exists for `math.arith.fraction-simplification` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This is one of `math.arith`'s final 2 concepts, unblocked this session by `math.nt.gcd`'s authoring; with this entry and `fraction-addition` complete, `math.arith` reaches 58/58 — DOMAIN CERTIFIED.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 10 (final wave).
