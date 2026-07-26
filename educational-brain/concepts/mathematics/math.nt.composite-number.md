# math.nt.composite-number

## Identity
- **KG ID**: `math.nt.composite-number`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.prime-number`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.composite-number.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly define a composite number (a positive integer greater than 1 that is not prime — equivalently, one with at least one divisor other than 1 and itself), correctly classify numbers as prime, composite, or neither (1), and correctly identify the smallest composite number without relying on a perceptual sense of "many divisors."

## Core Understanding
A composite number is precisely a positive integer greater than 1 that has at least ONE divisor besides 1 and itself — this is the mirror-image definition to `math.nt.prime-number`'s own definition, and the two categories, together with the special exclusion of 1, exhaustively but not overlappingly cover: 1 is neither prime nor composite (excluded from both by the same "greater than 1" boundary that excludes it from primality); every other integer greater than 1 is EITHER prime OR composite, never both. Critically, "composite" does not mean "has MANY divisors" — the bar is exactly ONE additional divisor beyond 1 and itself, so a number like 4 (divisors 1, 2, 4 — only one extra divisor, 2) already qualifies as composite, making 4 the smallest composite number, well before numbers with more numerous-feeling divisor lists like 12 or 24.

## Mental Models
1. **The one-extra-divisor-is-enough model**: composite status requires only ONE divisor beyond 1 and itself — not "several" or "many" — so even a number with just three total divisors (like 4, or any prime squared) already qualifies.
2. **The exhaustive-except-one model**: every integer greater than 1 is EITHER prime OR composite, with 1 as the single, deliberate exception to this otherwise complete dichotomy.
3. **The "other than" qualifier model**: every positive integer has 1 and itself as divisors — the word "factor" alone doesn't distinguish anything; the meaningful test for compositeness is specifically whether a divisor exists OTHER THAN those two automatic ones.

## Why Students Fail
The dominant failure, carried forward directly from `math.nt.prime-number`'s own boundary case, is treating "not prime" and "composite" as perfectly interchangeable, forgetting that 1 is excluded from both categories rather than automatically falling into whichever one isn't "prime." A second failure is conflating the everyday sense of "has factors" (which every number greater than 1 trivially satisfies, via 1 and itself) with the specific composite-defining test of having a divisor OTHER than those two. A third failure is misidentifying the smallest composite number, perceptually associating "composite" with having several distinct-feeling divisors, and overlooking that 4 already qualifies with just one additional divisor.

## Misconceptions
- **MC-1 — ONE-MISCLASSIFIED-AS-COMPOSITE-BY-EXCLUSION** (FOUNDATIONAL)
  - **Statement**: The student, having correctly learned that 1 is not prime, concludes that 1 must therefore be composite (treating prime/composite as an exhaustive dichotomy covering every positive integer, with no third excluded category).
  - **Birth type**: Type 1, overgeneralization — the natural assumption that every number is "one or the other" (a common pattern in binary classifications) is overgeneralized here, missing that this specific classification scheme deliberately reserves 1 as neither.
  - **Diagnostic probe**: Ask the student to classify 1 as prime, composite, or neither; MC-1 shows as "composite," reasoning "well, it's not prime, so it must be the other one."
  - **Repair approach**: Reinforce the exhaustive-except-one model (Mental Model 2) by explicitly naming all three categories together every time this classification is discussed — prime, composite, and the single exception 1 — rather than presenting it as a two-way choice.

- **MC-2 — COMPOSITE-DEFINITION-CONFLATED-WITH-HAVING-ANY-FACTORS**
  - **Statement**: The student believes any number that "has factors" (which is technically true of every positive integer, via 1 and itself) could be called composite, missing the specific "other than 1 and itself" qualifier that actually distinguishes composite numbers from primes.
  - **Birth type**: Type 3, language contamination — the everyday word "factor" carries no built-in exclusion of the trivial factors (1 and the number itself), so a definition that omits explicitly restating "other than 1 and itself" each time can be misread as applying to every number.
  - **Diagnostic probe**: Ask the student whether 7 is composite, since "7 has factors — 1 and 7"; MC-2 shows as agreeing that having ANY factors qualifies a number as composite, rather than correctly requiring a factor beyond those two.
  - **Repair approach**: Reinforce the "other than" qualifier model (Mental Model 3) by explicitly restating the full definition — "a divisor OTHER THAN 1 and itself" — as a fixed, non-abbreviated phrase every time, never shortened to just "has factors."

- **MC-3 — SMALLEST-COMPOSITE-NUMBER-MISIDENTIFIED**
  - **Statement**: The student misidentifies the smallest composite number as something larger than 4 (commonly guessing 6, 8, or 9), perceptually associating "composite" with having several distinct-feeling divisors rather than checking the actual, minimal one-extra-divisor requirement.
  - **Birth type**: Type 2, perceptual intuition — numbers like 6 (divisors 1, 2, 3, 6) or 12 "feel" more thoroughly composite due to having more listed divisors, while 4 (divisors 1, 2, 4) perceptually feels closer to a prime, since it has comparatively few divisors.
  - **Diagnostic probe**: Ask the student to name the smallest composite number; MC-3 shows as an answer larger than 4, often accompanied by uncertainty about whether 4 "really counts."
  - **Repair approach**: Reinforce the one-extra-divisor-is-enough model (Mental Model 1) by explicitly listing 4's divisors (1, 2, 4) and confirming the single extra divisor (2) already satisfies the definition, directly contrasting this against 2 and 3 (prime, no extra divisor) to make 4's status the smallest qualifying case.

## Analogies
- **Membership-card analogy**: composite status is like qualifying for a club that requires just ONE extra credential beyond the two everyone automatically has — meeting the bar exactly once is enough; you don't need a stack of extra credentials to qualify.

## Demonstrations
- The full divisor list for 4 (1, 2, 4), explicitly identifying the one extra divisor (2) that makes it composite, contrasted against 2 and 3's prime divisor lists (targeting MC-3).
- A three-column sorting table (Prime / Composite / Neither) with 1 explicitly placed in its own "Neither" column, never merged into either of the other two (targeting MC-1).

## Discovery Questions
1. "If 1 isn't prime, does that automatically make it composite — or is there a third possibility?"
2. "Does every number 'have factors'? So does 'has factors' alone tell you a number is composite?"
3. "What's the smallest composite number — and how do you know, using the actual definition rather than a feeling about how many divisors it has?"

## Teaching Sequence
1. Confirm `math.nt.prime-number`'s definition and its exclusion of 1 are solid.
2. Introduce the exhaustive-except-one model (Mental Model 2) with all three categories (prime, composite, neither) presented together from the start, targeting MC-1.
3. Introduce the "other than" qualifier model (Mental Model 3) with the full, unabbreviated definition stated every time, targeting MC-2.
4. Introduce the one-extra-divisor-is-enough model (Mental Model 1) via the 4-vs-6-vs-12 divisor-count comparison, targeting MC-3.
5. Practice mixed classification problems requiring students to name all three categories and justify each classification with an explicit divisor check.

## Tutor Actions
- **ORGANIZE: Sorting Table** — the three-column Prime/Composite/Neither sort with 1 explicitly placed (targeting MC-1).
- **TELL: Explanation** — the full, unabbreviated "other than 1 and itself" definition (targeting MC-2).
- **DO: Worked Example** — the divisor-list comparison for 4 versus 6 versus 12 (targeting MC-3).
- **TEST-THINKING: Prediction** — before checking, predict the smallest composite number, then verify via divisor listing.

## Voice Teaching Notes
Whenever classifying a number, always state all three possible outcomes aloud before answering ("is it prime, composite, or the special case 1?") — this habit directly targets MC-1 by keeping the third category visible every time, rather than defaulting to a two-way choice.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a mixed list of integers including 1, a prime, and several composites of varying divisor-list length (including 4), requiring full classification and explicit divisor-based justification for each.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including the classification of 1 (targeting MC-1), a "has factors" trick question about a prime (targeting MC-2), and identification of the smallest composite number (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to a strict three-column sorting drill repeated across many examples, with 1 always sorted first and separately before any prime/composite classification begins, until the three-way partition becomes automatic.

## Memory Hooks
- "Prime, composite, or the lone exception 1 — three outcomes, not two."
- "Everyone has 1 and itself as factors — composite needs one MORE."
- "4 is already composite — one extra divisor (2) is all it takes."

## Transfer Connections
- `math.nt.sieve-of-eratosthenes` (sibling concept) directly identifies composite numbers as the ones crossed out during the sieving process.
- `math.nt.prime-factorization` relies on correctly recognizing composite numbers as the ones requiring further breakdown into primes.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; composite-number classification is a pure number-theory vocabulary and concept skill with primary transfer value inside mathematics (factoring, prime testing).

## Blueprint References
None — no Blueprint exists for `math.nt.composite-number` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3 part 2.
