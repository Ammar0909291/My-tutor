# math.nt.prime-factorization

## Identity
- **KG ID**: `math.nt.prime-factorization`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.prime-number`, `math.nt.divisibility`
- **Unlocks**: `math.nt.gcd`, `math.nt.lcm`, `math.nt.fundamental-theorem-arithmetic`
- **Cross-links**: none (KG lists none; Blueprint confirms `cross_links: []`).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.nt.prime-factorization.md` (reused by reference throughout this entry).

## Learning Objective
The student will decompose any composite integer into its canonical prime-power factorization (via factor trees or the repeated-division method), correctly apply the primality-check "stop rule" to every intermediate factor, and recognize that the resulting factorization is unique up to the order in which the prime factors are written.

## Core Understanding
Per the Blueprint's Component 1: every composite integer can be written as a product of prime powers, and this factorization is unique up to reordering (the Fundamental Theorem of Arithmetic) — the canonical form arranges primes in ascending order with exponents, e.g., n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ. Two systematic methods reach this same result: factor trees (repeatedly splitting a number into a pair of factors until every "leaf" is prime) and the division method (repeatedly dividing by the smallest prime that divides evenly). The critical procedural discipline is the "stop rule": a split terminates ONLY when a factor is actually prime — treating any factored-but-still-composite expression (like 72 = 8 × 9) as if it were finished is the single most common failure mode. Because multiplication is commutative, two different factor trees for the same number always converge on the identical set of primes and exponents, just possibly written in a different order — canonical form (ascending prime order) exists specifically to remove that superficial ambiguity.

## Mental Models
1. **The onion-peeling model** (Blueprint TA-A01): each split reveals either another layer (a composite factor — keep peeling) or the core (a prime factor — stop); you're not done until every piece you're holding is a core.
2. **The two-paths-same-destination model**: a factor tree and the division method are two different ROUTES to the same canonical factorization — trying both for the same number and seeing them converge is direct, concrete evidence for the uniqueness theorem, before it's ever stated abstractly.
3. **The primality-gate model**: the primality check isn't advisory — it is the strict, non-negotiable termination condition for every branch of a factor tree; a branch that hasn't passed the primality check is not a leaf yet, no matter how "factored" it looks.

## Why Students Fail
Per the Blueprint's Component 2: the foundational failure is halting the factorization process at a composite intermediate factor, conflating "I split the number" with "I fully prime-factored the number" (e.g., stopping at 72 = 8 × 9 rather than continuing to 2³ × 3²). A second failure is including 1 as if it were a valid prime factor, carrying forward a garbled version of the primality definition that omits the "greater than 1" requirement. A third failure is believing that two factor trees producing primes in a different written order represent two genuinely DIFFERENT factorizations, missing that multiplication's commutativity makes any reordering the same underlying factorization.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — STOPS-AT-COMPOSITE-FACTOR** (FOUNDATIONAL)
  - **Blueprint description**: halts factorization when reaching a composite factor, leaving the factorization incomplete (e.g., writes 72 = 8 × 9 and stops).
  - **Birth type**: Type 5, instruction-induced — the general skill of "splitting a number into factors" is taught and practiced before prime factorization specifically, and without an explicit, separately-drilled primality check at each step, the more general (and insufficient) "factored" habit persists past the point where it should stop.
  - **Repair approach**: Blueprint Repair Action B01 — explicit primality-testing of every intermediate factor (is 8 prime? is 9 prime?) before it can be marked as a leaf, treating the check as a mandatory gate, not a suggestion.

- **MC-2 — ONE-IS-PRIME** (see Blueprint Component 2)
  - **Blueprint description**: includes 1 as a prime factor (e.g., writes 12 = 1 × 2² × 3).
  - **Birth type**: Type 1, overgeneralization — this is `math.nt.prime-number`'s own foundational MC-1 (PRIME-INCLUDES-ONE) recurring in a new procedural context, carried forward whenever the "greater than 1" clause of the primality definition isn't actively held in mind during factorization.
  - **Repair approach**: Blueprint Repair Action B01 (shared with MC-1) — re-stating the full primality definition including "greater than 1" at the point of every leaf check.

- **MC-3 — FACTORIZATION-ORDER-MATTERS** (see Blueprint Component 2)
  - **Blueprint description**: believes 2 × 3² × 5 and 5 × 3² × 2 are different factorizations.
  - **Birth type**: Type 6, analogy overextension — students correctly learn that ORDER matters in many other mathematical contexts (subtraction, division, function composition), and overextend that general caution to multiplication-based factorization, where commutativity actually makes order irrelevant to the underlying result.
  - **Repair approach**: Blueprint Repair Action B02 — direct numeric verification that both orderings multiply to the identical value, reinforced by adopting one fixed canonical form (ascending prime order) to eliminate the superficial ambiguity going forward.

## Analogies
- **Onion-peeling analogy** (Blueprint TA-A01): each layer peeled away reveals either another layer (composite — keep going) or the core (prime — stop); for 48, peeling 2×24, then 2×12, then 2×6, then 2×3, ends with all-prime leaves: 2⁴×3.

## Demonstrations
- The factor tree for 48, split step by step down to all-prime leaves, with the primality-check stop rule stated explicitly at every branch (Blueprint TA-A01), directly targeting MC-1.
- The division-method computation of 84 (84 → 42 → 21 → 7, all divided by the smallest working prime) shown alongside an alternative factor tree for the same number, both converging on 2²×3×7 (Blueprint TA-A02), directly targeting MC-3.
- The complete-vs-incomplete contrast table for 72 (2³×3² vs. 8×9) (Blueprint TA-A03), directly targeting MC-1.

## Discovery Questions
1. "Is 8 a valid 'leaf' in a factor tree, or does it need to be split further? How do you check?"
2. "If two different factor trees for the same number both end in prime leaves, will they always give the same final answer?"
3. "Is 2×3²×5 a genuinely different factorization from 5×3²×2, or the same one written differently?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (factor trees and the primality stop rule, via the onion-peeling analogy) → TA-A02 (the division method, worked alongside an alternative factor tree, demonstrating uniqueness concretely) → TA-A03 (complete-vs-incomplete factorization contrast, plus the two-tree-same-result uniqueness contrast) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the onion-peeling factor-tree framing (Blueprint TA-A01).
- **DO: Worked Example** — the division-method computation paired with an alternative factor tree for the same number (Blueprint TA-A02).
- **TEST-THINKING: Error Analysis** — the complete-vs-incomplete factorization contrast (72 = 2³×3² vs. 8×9) (Blueprint TA-A03).
- **ORGANIZE: Matching** — match differently-ordered factorizations of the same number to confirm they represent one canonical result.

## Voice Teaching Notes
At every branch of a factor tree, ask "is this a prime, or does it need to be split again?" as an explicit, separate question before moving on — this verbal gate, taken directly from the Blueprint's own pedagogical priority note, is the single highest-leverage move against MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's own `cross_links: []` declaration)**: reused verbatim from the Blueprint's Component 4 A04 — the perfect-square-via-factorization probe (factor 360, determine it is not a perfect square since 2 and 5 appear to odd exponents, then find the smallest k making 360k a perfect square).
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the explicit primality-gate framing, regress to a strict two-question checklist applied at every single branch, with no exceptions: "(1) is this number prime? (2) if not, what are two factors?" — repeated mechanically until the check becomes automatic, before allowing faster, less explicit factoring.

## Memory Hooks
- "Factored isn't the same as PRIME-factored — check every piece before you stop."
- "1 is never a prime factor — the definition requires greater than 1, no exceptions."
- "Same primes, same exponents, any order — one factorization, however it's written."

## Transfer Connections
- `math.nt.gcd` (unlocks) computes the greatest common divisor directly from shared prime factors between two numbers.
- `math.nt.lcm` (unlocks) computes the least common multiple directly from the union of prime factorizations.
- `math.nt.fundamental-theorem-arithmetic` (unlocks) formally states the uniqueness property this concept demonstrates concretely.

## Cross-Subject Connections
- Computer science: factorization-based algorithms (including cryptographic ones) rely directly on the difficulty of finding an integer's prime factorization for large numbers.

## Blueprint References
`docs/curriculum/blueprints/math.nt.prime-factorization.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`cross_links: []`) was independently re-verified at authoring time and remains accurate. This is the third concept authored in `math.nt` (after `divisibility`, `prime-number`), continuing the bounded cross-domain step toward `math.nt.gcd` and `math.nt.lcm`, which will unblock `math.arith`'s final 2 concepts.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 2.
