# math.nt.prime-number

## Identity
- **KG ID**: `math.nt.prime-number`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.divisibility`
- **Unlocks**: `math.nt.fundamental-theorem-arithmetic`, `math.nt.prime-factorization`
- **Cross-links**: `math.nt.fundamental-theorem-arithmetic` — confirmed NOT Tier 1 (per the Blueprint's own declaration) — P76_mode = independence, using a cryptography-context transfer probe instead.
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.prime-number.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the definition of a prime number (a natural number greater than 1 whose only positive divisors are 1 and itself), correctly classify numbers as prime, composite, or neither, correctly exclude 1 from both categories, identify 2 as the only even prime, and test primality using the √p divisor-check method.

## Core Understanding
Per the Blueprint's Component 1: a prime number is a natural number greater than 1 whose only positive divisors are 1 and itself; every other natural number greater than 1 is composite (having at least one additional divisor); and 1 is deliberately excluded from both categories — not an oversight, but a structural necessity, since if 1 were considered prime, the Fundamental Theorem of Arithmetic's unique-factorization guarantee would break down (6 could be factored as 2×3, or 1×2×3, or 1×1×2×3, endlessly). Primes are the multiplicative "atoms" from which every other integer is built, exactly as chemical atoms combine into molecules. To test whether a number p is prime, it suffices to check divisibility only by integers from 2 up to √p — any factor larger than √p would have a corresponding co-factor smaller than √p that would already have been found.

## Mental Models
1. **The indivisible-atoms model** (Blueprint TA-A01, the molecular analogy): primes are the indivisible multiplicative building blocks, exactly as atoms are chemistry's indivisible building blocks — composite numbers, like molecules, are combinations of these atoms.
2. **The divisor-count model**: primality is entirely about COUNTING divisors, not about any surface feature like parity or last digit — exactly two positive divisors (1 and itself) means prime; more than two means composite; exactly one (only for the number 1) means neither.
3. **The √p-bound model**: to test primality efficiently, only divisors up to √p need checking — a factor beyond √p would always pair with a co-factor below √p, which would already have surfaced the compositeness.

## Why Students Fail
Per the Blueprint's Component 2: the foundational failure is including 1 as prime, reasoning that "its only divisor is itself" without recognizing the definition's explicit "greater than 1" requirement, itself a structural necessity for unique factorization. A second failure conflates primality with parity or oddness — believing 2 (the only even prime) cannot be prime because it's even, or conversely believing all odd numbers must be prime, missing odd composites like 9, 15, or 21. A third failure relies on a last-digit heuristic (numbers ending in 1, 3, 7, or 9 "must be" prime), which correctly describes primes above 5 but is not a valid TEST, since composites like 21, 51, and 91 also end in those digits.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — PRIME-INCLUDES-ONE** (FOUNDATIONAL)
  - **Blueprint description**: argues 1 is prime because "its only divisors are 1 and itself"; misses the "greater than 1" clause in the definition.
  - **Birth type**: Type 4, notation-induced — the informal shorthand version of the definition ("only divisors are 1 and itself") is technically satisfied by 1 as well, and without the definition's full, explicit "greater than 1" clause held in view, the shorthand alone invites the error.
  - **Repair approach**: Blueprint Repair Action B01 — explicitly counting DISTINCT divisors (1 has exactly one; a prime has exactly two, requiring 1 ≠ p), tied directly to why unique factorization requires excluding 1.

- **MC-2 — ODD-EQUALS-PRIME** (see Blueprint Component 2)
  - **Blueprint description**: claims 2 is not prime because "even numbers are never prime"; or that all odd numbers are prime (missing composites like 9, 15, 21).
  - **Birth type**: Type 1, overgeneralization — since most primes above 2 happen to be odd, the pattern is overgeneralized in both directions: assuming evenness disqualifies primality, and assuming oddness guarantees it.
  - **Repair approach**: Blueprint Repair Action B02 — the direct divisor-count contrast (2: divisors {1,2}, prime; 9: divisors {1,3,9}, composite), re-anchoring on divisor count rather than parity.

- **MC-3 — LAST-DIGIT-HEURISTIC** (see Blueprint Component 2)
  - **Blueprint description**: incorrectly concludes primality from the last digit alone (e.g., "21 ends in 1 so it's prime") without testing divisors.
  - **Birth type**: Type 1, overgeneralization — the true but partial fact "primes above 5 end in 1, 3, 7, or 9" is overgeneralized into a sufficient TEST, when it is only a necessary condition, not sufficient.
  - **Repair approach**: Blueprint Repair Action B03 — concrete counter-examples (21=3×7, 51=3×17, 91=7×13, all ending in "prime-typical" digits yet composite), reinforcing the √p divisor-check as the only valid test.

## Analogies
- **Atoms-and-molecules analogy** (Blueprint TA-A01): just as water (H₂O) is built from indivisible hydrogen and oxygen atoms, 12 = 2²×3 is built from the indivisible prime atoms 2 and 3 — but 7 cannot be split into smaller multiplicative pieces, making it a prime "atom."

## Demonstrations
- The tile-rectangle model (Blueprint TA-A01): arranging p tiles into rectangular arrays — if only the 1×p (or p×1) arrangement is possible, p is prime; multiple arrangements mean composite.
- The three-representation table for p=13 versus p=15 (Blueprint TA-A02): concrete tiling, procedural divisor listing, and formal definition, side by side, making the prime/composite distinction concrete across representations.
- The prime/composite/neither contrast set (Blueprint TA-A03): 2, 3, 7, 13 (prime); 4, 9, 15, 21 (composite); 1 (neither) — directly targeting all three misconceptions in one pass.

## Discovery Questions
1. "Does 1 satisfy the FULL definition of a prime number, including the 'greater than 1' part?"
2. "Is 2 prime? Is every odd number prime? How do you know, using divisor counts rather than parity?"
3. "Does a number's last digit alone tell you whether it's prime, or do you need to actually test divisors?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (the atoms-and-molecules analogy, concrete tile-rectangle test) → TA-A02 (three-representation shift for a prime and a composite example, the special case of 1) → TA-A03 (prime vs. composite vs. neither contrast, the only-even-prime correction) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the atoms-and-molecules primes-as-building-blocks framing (Blueprint TA-A01).
- **DO: Demonstration** — the tile-rectangle primality test.
- **ORGANIZE: Representation Table** — the concrete/procedural/formal three-way shift for p=13 vs. p=15 (Blueprint TA-A02).
- **TEST-THINKING: Error Analysis** — the last-digit-heuristic counter-examples (21, 51, 91), directly targeting MC-3.

## Voice Teaching Notes
Whenever discussing 2, explicitly say "the only even prime" as a fixed phrase every time — per the Blueprint's own Teaching Notes, this concept is the single most common source of MC-2 and deserves this emphasis in nearly every session touching primes.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's GR-9 — `math.nt.fundamental-theorem-arithmetic` confirmed NOT Tier 1)**: reused verbatim from the Blueprint's Component 4 A04 — the cryptography-context primality test of 91 (testing divisibility by 2, 3, 5, 7, finding 91 = 7×13).
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the distinct-divisor-count correction, regress to physically counting out divisors on paper for several small numbers (1, 2, 3, 4, 5) side by side, circling each one, until the exactly-two-vs-exactly-one distinction is visually unmistakable, before returning to abstract definition recall.

## Memory Hooks
- "A prime has exactly TWO divisors — one is never enough, so 1 doesn't count."
- "2 is the lonely even prime — parity doesn't decide primality, divisor count does."
- "Last digit is a clue, never a test — check the actual divisors."

## Transfer Connections
- `math.nt.fundamental-theorem-arithmetic` (unlocks) states that every integer greater than 1 factors uniquely into primes — directly motivating why 1 must be excluded from primality.
- `math.nt.prime-factorization` (unlocks) requires fluent prime identification to express any integer as a product of prime powers.

## Cross-Subject Connections
- Computer science: cryptographic algorithms (as in the Blueprint's own P76 transfer probe) rely fundamentally on prime numbers and the difficulty of factoring large composites.

## Blueprint References
`docs/curriculum/blueprints/math.nt.prime-number.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.nt.fundamental-theorem-arithmetic`, NOT Tier 1) was independently re-verified at authoring time and remains accurate. This is the second concept authored in `math.nt` (after `divisibility`), continuing the bounded cross-domain step toward unblocking `math.arith`'s final 2 concepts via the `prime-factorization` → `gcd` → `lcm` chain.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 2.
