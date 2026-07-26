# math.nt.sieve-of-eratosthenes

## Identity
- **KG ID**: `math.nt.sieve-of-eratosthenes`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.prime-number`, `math.nt.divisibility`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 3
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.sieve-of-eratosthenes.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly execute the Sieve of Eratosthenes to find all primes up to a given limit — listing all integers, then iteratively marking the multiples of each successive unmarked number as composite (starting each prime's marking from its square, not the prime itself), continuing until every number up to the limit has been correctly classified.

## Core Understanding
The Sieve of Eratosthenes finds all primes up to a limit N by starting with a list of every integer from 2 to N, then repeatedly taking the smallest unmarked number (which is guaranteed to be prime, since it survived marking by every smaller prime), and marking all of ITS multiples as composite — critically, starting the marking at that number's SQUARE (since any smaller multiple, like 2×p or 3×p, was already marked by a smaller prime factor) — and continuing this process until the current prime being processed exceeds the square root of N, at which point every remaining unmarked number is guaranteed prime (any composite ≤ N must have at least one prime factor ≤ √N, so if no factor that small has marked it, no larger factor could either). The prime number itself must never be marked as one of its own multiples — the marking process removes composite multiples, and the prime survives as the unmarked "cause" of that round of marking.

## Mental Models
1. **The elimination-tournament model**: each unmarked number that survives to be processed is guaranteed prime, precisely because every smaller prime has already had its chance to mark it as a multiple and failed — surviving all previous rounds IS the proof of primality at that point in the process.
2. **The square-start model**: when marking multiples of a prime p, marking should start at p² (not 2p), since every smaller multiple of p (2p, 3p, …, (p−1)p) already has a smaller prime factor and was necessarily marked in an earlier round.
3. **The √N-stopping model**: once the current prime being processed exceeds √N, every remaining unmarked number must be prime — since any composite number ≤ N is guaranteed to have at least one prime factor ≤ √N, and if no such factor has marked it by now, none exists.

## Why Students Fail
The dominant failure is marking a prime as one of its own multiples during its own marking round, incorrectly removing it from the final prime list. A second failure is stopping the sieve process before reaching the √N threshold, leaving some composite numbers unmarked and incorrectly classified as prime. A third failure is assuming a number surviving just one or two rounds of marking (e.g., not being a multiple of 2) is already confirmed prime, without continuing the process through all necessary smaller primes.

## Misconceptions
- **MC-1 — NUMBER-ITSELF-CROSSED-OUT-AS-A-MULTIPLE-OF-ITSELF** (FOUNDATIONAL)
  - **Statement**: When marking multiples of a prime p, the student includes p itself in the marking (since p is technically "a multiple of p," namely 1×p), incorrectly removing the prime from the final list.
  - **Birth type**: Type 4, notation-induced — the instruction "mark multiples of p" is technically satisfied by p itself (1×p = p), and without an explicit "start marking from 2p (or better, p²), never from p itself" clarification, the literal instruction invites this error.
  - **Diagnostic probe**: Ask the student to sieve up to 20 and check whether 2, 3, 5, 7 remain unmarked at the end; MC-1 shows as one or more small primes missing from the final list, having been marked during their own round.
  - **Repair approach**: Ground the square-start model (Mental Model 2) explicitly — "start marking THIS prime's multiples at p², never at p itself" — and verify after each round that the prime just processed remains visibly unmarked.

- **MC-2 — SIEVE-STOPPED-BEFORE-REACHING-SQRT-LIMIT**
  - **Statement**: The student stops the sieve process after only a few rounds (e.g., marking multiples of 2 and 3 only), before the current prime exceeds √N, leaving some composite numbers incorrectly unmarked and misclassified as prime.
  - **Birth type**: Type 1, overgeneralization — a small, fixed number of "rounds" (perhaps matching however many small primes were used in an introductory example) is assumed to always be sufficient, without checking whether the actual √N threshold for the CURRENT limit has actually been reached.
  - **Diagnostic probe**: Ask the student to sieve up to 100, stopping only after marking multiples of 2 and 3, and check the final list for errors; MC-2 shows as composite numbers like 49 (=7²) remaining unmarked, since marking multiples of 7 was never performed despite 7 ≤ √100.
  - **Repair approach**: Ground the √N-stopping model (Mental Model 3) explicitly by computing √N BEFORE starting the sieve and stating the exact stopping prime threshold up front, rather than deciding when to stop based on a feeling of "enough rounds."

- **MC-3 — SURVIVING-ONE-ROUND-ASSUMED-SUFFICIENT-FOR-PRIMALITY**
  - **Statement**: The student concludes a number is prime after it survives just one round of marking (e.g., concluding 9 is prime because it isn't a multiple of 2), without continuing through all remaining necessary smaller primes.
  - **Birth type**: Type 1, overgeneralization — surviving ONE elimination round is mistaken for surviving ALL necessary rounds, generalizing "not eliminated yet" to "confirmed prime" prematurely.
  - **Diagnostic probe**: Ask the student whether 9 is prime immediately after only the multiples-of-2 round has been marked; MC-3 shows as "yes, since it's not even," missing that 9 is a multiple of 3 and will be marked in the next round.
  - **Repair approach**: Ground the elimination-tournament model (Mental Model 1) explicitly — a number is only confirmed prime once it has survived EVERY round up through primes ≤ √N, not merely the first round it happened to be checked against.

## Analogies
- **Elimination-tournament analogy** (Mental Model 1): each round of the sieve is like a tournament bracket round — surviving one round only means you haven't been eliminated YET, not that you've won the whole tournament; a number is only confirmed prime once every relevant round has been completed.

## Demonstrations
- A fully worked sieve up to 30, explicitly marking multiples of 2 starting at 4 (not 2), multiples of 3 starting at 9 (not 3), and stopping once the current prime (5, since √30 ≈ 5.5) exceeds √30, verifying the final unmarked list matches the known primes up to 30.
- A deliberately incomplete sieve (stopped after only the multiples-of-2 round) contrasted against the same sieve carried to completion, showing 9, 15, 21, 25 incorrectly surviving in the incomplete version (targeting MC-2 and MC-3).

## Discovery Questions
1. "When you mark multiples of 5, does 5 itself get marked, or does the marking start somewhere else?"
2. "How do you know when the sieve process is actually finished — is there a specific number you can compute in advance?"
3. "If a number survives the first round of marking, is it already confirmed prime?"

## Teaching Sequence
1. Confirm `math.nt.prime-number` and `math.nt.divisibility` are solid.
2. Introduce the elimination-tournament model (Mental Model 1) with a small worked example (sieve up to 20), explicitly stating survival-so-far vs. confirmed-prime, targeting MC-3.
3. Introduce the square-start model (Mental Model 2), explicitly marking multiples of a prime starting at its square, targeting MC-1.
4. Introduce the √N-stopping model (Mental Model 3), computing the stopping threshold up front before starting a larger sieve, targeting MC-2.
5. Practice a full sieve up to 50 or 100, requiring the student to state the stopping prime threshold before beginning.

## Tutor Actions
- **DO: Worked Example** — the full sieve up to 30, marking multiples starting at each prime's square (targeting MC-1).
- **TEST-THINKING: Error Analysis** — the incomplete-vs-complete sieve contrast (targeting MC-2 and MC-3).
- **SHOW: Demonstration** — the elimination-tournament framing applied to a specific number surviving successive rounds.
- **TEST-THINKING: Prediction** — before starting a sieve, predict and state the stopping prime threshold (√N).

## Voice Teaching Notes
Before starting any sieve, ask "what's the stopping threshold — what's the square root of your limit?" as a standing, separate question — this habit directly targets MC-2 by making the stopping condition explicit and computed, not assumed.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a sieve-up-to-100 task and require the student to state the stopping threshold before beginning, execute the sieve correctly (starting each prime's marking at its square), and verify the final list against known primes, directly assessing all three misconceptions together.
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one item testing whether a prime is correctly excluded from its own marking round (targeting MC-1) and one item requiring the student to state and justify the stopping threshold (targeting MC-2).

## Tutor Recovery Strategy
If MC-1 persists, regress to physically circling each prime in a different color BEFORE marking its multiples, visually distinguishing "the prime causing this round" from "the multiples being eliminated this round," before returning to a purely numeric marking process.

## Memory Hooks
- "Mark multiples starting at the square — never the prime itself."
- "Stop at the square root of your limit — compute it first, don't guess."
- "Surviving one round isn't proof — only surviving ALL necessary rounds confirms prime."

## Transfer Connections
- `math.nt.prime-factorization` benefits directly from a pre-computed list of small primes generated via the sieve.

## Cross-Subject Connections
- Computer science: the Sieve of Eratosthenes is a canonical algorithm-efficiency teaching example, illustrating how eliminating candidates early (rather than testing each number independently) dramatically reduces computational work.

## Blueprint References
None — no Blueprint exists for `math.nt.sieve-of-eratosthenes` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3 part 2.
