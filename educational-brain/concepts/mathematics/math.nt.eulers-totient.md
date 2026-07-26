# math.nt.eulers-totient

## Identity
- **KG ID**: `math.nt.eulers-totient`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.divisibility`, `math.nt.prime-factorization`
- **Unlocks**: `math.nt.rsa-basics`
- **Cross-links**: none (KG lists none).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.eulers-totient.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will compute Euler's totient function φ(n) — the count of integers in {1, …, n} coprime to n — using the product formula n∏(1 − 1/p) over each DISTINCT prime p dividing n, correctly distinguishing "coprime to n" (sharing no common factor with n) from "prime," and correctly computing φ(p) = p − 1 for any prime p directly.

## Core Understanding
Building on `math.nt.prime-factorization`'s prime-power decomposition, Euler's totient function φ(n) counts how many integers from 1 to n share NO common factor with n (i.e., have GCD(k,n) = 1) — critically, "coprime to n" has nothing to do with whether k itself is prime; it only requires k and n to share no common prime factor. The computational formula φ(n) = n∏(1 − 1/p) applies one (1 − 1/p) factor per DISTINCT prime dividing n, regardless of that prime's exponent in n's factorization — so φ(12) = φ(2²×3) uses exactly two factors, (1−1/2) and (1−1/3), not one factor per copy of 2. A special, directly-derivable case is φ(p) for a prime p itself: since a prime has no divisors smaller than itself, EVERY integer from 1 to p−1 is automatically coprime to p, giving φ(p) = p − 1 directly, without needing the general product formula at all.

## Mental Models
1. **The distinct-primes-only model**: the totient formula's product runs over each DISTINCT prime dividing n exactly once, no matter how many times that prime appears in n's factorization — φ(8) = φ(2³) still uses only ONE factor of (1 − 1/2), not three.
2. **The shares-no-factor model**: "coprime to n" means GCD(k,n) = 1 — sharing literally zero prime factors with n — a condition entirely about factor-sharing, with no requirement that k itself be prime.
3. **The prime-shortcut model**: for a prime p, φ(p) = p − 1 directly, since every one of the p−1 smaller positive integers automatically shares no factor with p (a prime has no factors smaller than itself to potentially share).

## Why Students Fail
The dominant failure is applying the product formula's (1 − 1/p) factor once per PRIME-POWER occurrence rather than once per distinct prime, effectively double- or triple-counting a repeated prime factor's contribution. A second failure is conflating "coprime to n" with "prime relative to n" or believing φ(n) counts how many prime numbers are ≤ n, missing that coprimality is entirely about shared factors, unrelated to whether the counted integer k is itself prime. A third failure is miscomputing φ(p) for a prime p by an off-by-one error, forgetting that p itself is not coprime to itself and must be excluded, or by unnecessarily applying the full product formula and making an arithmetic slip instead of using the direct p−1 shortcut.

## Misconceptions
- **MC-1 — TOTIENT-FORMULA-COUNTS-PRIME-FACTOR-MULTIPLICITY-INSTEAD-OF-DISTINCT-PRIMES** (FOUNDATIONAL)
  - **Statement**: The student applies the (1 − 1/p) factor once per occurrence of a prime in n's factorization (i.e., once per exponent unit), rather than once per DISTINCT prime, producing an incorrect result for any n with a repeated prime factor (e.g., computing φ(8) = 8×(1−1/2)×(1−1/2)×(1−1/2) instead of the correct single factor 8×(1−1/2) = 4).
  - **Birth type**: Type 4, notation-induced — the prime factorization itself visually displays repeated prime factors (2×2×2 for 8), and without an explicit "one factor per DISTINCT prime, regardless of exponent" instruction, the visual repetition in the factorization invites a matching repetition in the formula's application.
  - **Diagnostic probe**: Ask the student to compute φ(8); MC-1 shows as an answer smaller than the correct 4, from over-applying the (1−1/2) factor multiple times.
  - **Repair approach**: Ground the distinct-primes-only model (Mental Model 1) by explicitly listing the DISTINCT primes dividing n first (as a separate, deduplicated list) before applying the product formula, making the one-factor-per-distinct-prime rule a visible, separate step.

- **MC-2 — COPRIME-CONFUSED-WITH-PRIME**
  - **Statement**: The student believes "coprime to n" means k itself must be prime, or that φ(n) counts how many prime numbers are less than or equal to n, rather than correctly understanding coprimality as sharing zero common factors with n regardless of k's own primality.
  - **Birth type**: Type 3, language contamination — the word "coprime" phonetically and visually resembles "prime," inviting a reading that ties the term to primality rather than its actual meaning (shared-factor-free relative to n).
  - **Diagnostic probe**: Ask the student whether 8 (a composite number) is coprime to 15; MC-2 shows as "no, because 8 isn't prime," rather than correctly checking whether 8 and 15 share any common prime factor (they don't: 8 = 2³, 15 = 3×5, so they ARE coprime, regardless of 8's own compositeness).
  - **Repair approach**: Ground the shares-no-factor model (Mental Model 2) by explicitly testing coprimality via GCD computation (GCD(8,15) = 1) rather than any reference to whether either number is itself prime, reinforcing that coprimality is a RELATIONSHIP between two numbers, not a property of one number in isolation.

- **MC-3 — TOTIENT-OF-A-PRIME-OFF-BY-ONE**
  - **Statement**: The student computes φ(p) for a prime p as p instead of the correct p − 1, forgetting that p itself is not coprime to itself and must be excluded from the count.
  - **Birth type**: Type 1, overgeneralization — the count "integers from 1 to p" naturally includes p itself, and without explicitly checking whether p should be excluded, the boundary is overlooked, especially since p being coprime to itself would require GCD(p,p) = 1, which is false (GCD(p,p) = p, not 1).
  - **Diagnostic probe**: Ask the student to compute φ(7); MC-3 shows as an answer of 7 rather than the correct 6.
  - **Repair approach**: Ground the prime-shortcut model (Mental Model 3) by explicitly listing the integers 1 through p−1 (never including p) and confirming each one is coprime to p, making the excluded upper boundary explicit and visible.

## Analogies
- **Guest-list-minus-yourself analogy**: counting integers coprime to n is like counting how many people at a party you share no allergy with — you don't count yourself in that tally (you always "share" everything with yourself), directly grounding why p itself is excluded from φ(p)'s count.

## Demonstrations
- The full computation of φ(12) = φ(2²×3), explicitly listing the distinct primes {2,3} first (deduplicated from the factorization 2²×3), then applying 12×(1−1/2)×(1−1/3) = 4, targeting MC-1.
- A direct coprimality check between two composite numbers (8 and 15) via GCD, confirming coprimality despite neither being prime, targeting MC-2.
- The direct computation of φ(7) = 6, explicitly listing integers 1 through 6 (never 7) and confirming each is coprime to 7, targeting MC-3.

## Discovery Questions
1. "Does the totient formula use one factor per prime FACTOR-COPY, or one factor per DISTINCT prime?"
2. "Is 8 coprime to 15 — does it matter that 8 isn't itself prime?"
3. "For a prime p, is p itself included in the count of integers coprime to p?"

## Teaching Sequence
1. Confirm `math.nt.divisibility` and `math.nt.prime-factorization` are solid.
2. Introduce the shares-no-factor model (Mental Model 2) first, via direct GCD-based coprimality checks between various pairs (some prime, some composite), targeting MC-2 proactively.
3. Introduce the prime-shortcut model (Mental Model 3) for φ(p) = p−1, targeting MC-3.
4. Introduce the general product formula, explicitly listing distinct primes before applying it (Mental Model 1), targeting MC-1.
5. Practice mixed problems including primes, prime powers, and numbers with multiple distinct prime factors.

## Tutor Actions
- **DO: Worked Example** — the distinct-primes-first computation of φ(12) (targeting MC-1).
- **TEST-THINKING: Error Analysis** — the coprimality check between two composite numbers, 8 and 15 (targeting MC-2).
- **DO: Worked Example** — the direct φ(7) = 6 computation with explicit boundary listing (targeting MC-3).
- **ORGANIZE: Matching** — match a number's prime factorization to its deduplicated distinct-prime list before computing φ.

## Voice Teaching Notes
Before applying the totient formula, ask "what are the DISTINCT primes — not counting repeats?" as a standing, separate question — this habit directly targets MC-1 by forcing an explicit deduplication step before any computation.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present an RSA-context scenario requiring φ(n) for a number with a repeated prime factor, directly assessing MC-1, alongside a coprimality-check sub-question distinguishing composite-but-coprime pairs (targeting MC-2).
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one prime-power input (targeting MC-1), one composite-coprimality check (targeting MC-2), and one direct prime input (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to writing out the full factor list with exponents explicitly separated from the distinct-prime list as two different, clearly labeled lines for every problem, until the deduplication step becomes automatic.

## Memory Hooks
- "Count distinct primes, not prime copies — one factor per prime, however many times it appears."
- "Coprime is about SHARED factors, not about being prime yourself."
- "For a prime p, count 1 through p−1 — never include p itself."

## Transfer Connections
- `math.nt.rsa-basics` (unlocks) relies directly on Euler's totient function as the core computation behind RSA key generation.

## Cross-Subject Connections
- Computer science: Euler's totient function is foundational to RSA public-key cryptography, directly grounding this concept's KG description's real-world stakes.

## Blueprint References
None — no Blueprint exists for `math.nt.eulers-totient` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3 part 2.
