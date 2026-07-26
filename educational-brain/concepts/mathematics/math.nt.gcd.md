# math.nt.gcd

## Identity
- **KG ID**: `math.nt.gcd`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.divisibility`, `math.nt.prime-factorization`
- **Unlocks**: `math.arith.fraction-simplification`, `math.nt.bezout-identity`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.gcd.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute GCD(a,b) via prime factorization (taking the MINIMUM shared exponent of each common prime) and via the Euclidean algorithm (repeated division-with-remainder until the remainder reaches exactly 0), correctly distinguish coprimality from primality (two composite numbers can be coprime), and correctly identify the GCD as the LAST NONZERO remainder in the Euclidean algorithm, not a premature intermediate value.

## Core Understanding
Per the Blueprint's Component 1: the GCD of two integers is computable by three methods that must all agree — exhaustive divisor listing (the concrete, brute-force ground truth), prime factorization (for each prime shared by both numbers, take the MINIMUM of its two exponents, multiplying the results together), and the Euclidean algorithm (repeatedly replacing (a,b) with (b, a mod b) until the remainder is 0, at which point the GCD is the last NONZERO remainder — the divisor in that final step). Two conceptual traps dominate: first, GCD's minimum-exponent rule is the mirror image of LCM's maximum-exponent rule applied to the IDENTICAL two factorizations, so swapping them produces a plausible-looking but entirely wrong answer with no obvious "red flag." Second, coprimality (GCD = 1) is entirely about sharing ZERO prime factors — it has nothing to do with whether either number is itself prime, and two composite numbers (like 8 = 2³ and 9 = 3²) can be perfectly coprime if their prime "ingredients" don't overlap at all.

## Mental Models
1. **The three-methods-must-agree model** (Blueprint TA-A01/A03): listing, prime factorization, and the Euclidean algorithm are three independent routes to the same GCD — when they disagree, exactly one method has a specific, findable error, and cross-checking is the standing discipline for catching it.
2. **The minimum-vs-maximum mirror model** (Blueprint TA-A02, Contrast 1): GCD and LCM are computed from the SAME two factorizations, differing only in whether the SMALLER (GCD) or LARGER (LCM) shared exponent is taken for each prime — computed side by side on one example, this mirror structure itself becomes the memory aid.
3. **The shared-primes-not-shared-primality model** (Blueprint TA-A02, Contrast 2): coprimality asks whether two numbers share ANY prime factor at all — completely independent of whether either number happens to be prime itself; two "highly composite" numbers built from disjoint prime ingredients are automatically coprime.

## Why Students Fail
Per the Blueprint's Component 8: MC-1 (GCD/LCM exponent confusion) is the single highest-leverage misconception precisely because the two rules are mirror images applied to identical input, with no external signal (like an obviously wrong magnitude) reliably catching a swap. A second failure is assuming coprimality requires at least one prime number among the pair, missing that zero-shared-primes is the actual (and sole) criterion. A third failure is stopping the Euclidean algorithm at the first small or "nice-looking" remainder rather than continuing until the remainder is genuinely 0, then misreporting an intermediate value as the final GCD.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — GCD-LCM-EXPONENT-CONFUSION** (FOUNDATIONAL)
  - **Blueprint description**: takes the MAXIMUM shared prime exponent when computing GCD (the rule that actually belongs to LCM), or vice versa.
  - **Birth type**: Type 6, analogy overextension — GCD and LCM are taught in close proximity using nearly identical procedures on the same factorizations, and the rule learned for one is easily overextended by analogy onto the other without a strong enough distinguishing anchor.
  - **Repair approach**: Blueprint Repair Action B01 — the side-by-side min-vs-max computation on one shared example (Blueprint TA-A02, Contrast 1), anchoring "smaller for GCD, bigger for LCM."

- **MC-2 — COPRIME-REQUIRES-A-PRIME-NUMBER** (see Blueprint Component 2)
  - **Blueprint description**: believes GCD(a,b)=1 (coprime) requires at least one of a,b to be prime, rejecting or doubting coprimality between two composite numbers.
  - **Birth type**: Type 1, overgeneralization — since primes are the most familiar "no common factors" example, the property gets overgeneralized from "primes are often coprime with other numbers" to "coprimality requires a prime," losing the actual criterion (zero shared prime factors).
  - **Repair approach**: Blueprint Repair Action B02 — direct factorization of a composite-composite coprime pair (8 = 2³, 9 = 3²: no shared prime, GCD = 1).

- **MC-3 — EUCLIDEAN-ALGORITHM-WRONG-STOPPING-POINT** (see Blueprint Component 2)
  - **Blueprint description**: stops the Euclidean algorithm at the first small remainder encountered, or reports the WRONG value as the GCD, rather than continuing until the remainder is exactly 0 and taking the last nonzero remainder.
  - **Birth type**: Type 1, overgeneralization — a "small-looking" remainder is mistaken for the natural stopping point, generalizing from an intuitive (but incorrect) sense of when a repeated-division process should "feel" finished, rather than applying the algorithm's actual, strict, remainder-exactly-0 termination condition.
  - **Repair approach**: Blueprint Repair Action B03 — the completed-vs-stopped-early contrast (Blueprint TA-A02, Contrast 3), reinforcing "take one more step and verify a zero remainder" as a transferable habit.

## Analogies
- **Cookie-packaging analogy** (the Blueprint's own P76 transfer probe): finding the largest box size that packages two different cookie counts with none left over is directly the GCD — and a LARGE GCD (as in 180 and 252's GCD of 36) means the packaging resolves MORE cleanly, not less, directly countering any lingering association between "complicated composite numbers" and "no clean common structure."

## Demonstrations
- The three-representation shift for GCD(24,36): exhaustive divisor listing, a Venn-diagram-style shared-prime-factor picture, and the formal prime-factorization/Euclidean-algorithm methods, all converging on 12 (Blueprint TA-A01).
- The side-by-side GCD-vs-LCM computation for 40 and 60 using the same two factorizations, contrasting minimum and maximum exponent rules directly (Blueprint TA-A02, Contrast 1), targeting MC-1.
- The completed Euclidean algorithm for GCD(252,105), explicitly identifying the step where the remainder finally reaches 0 (Blueprint TA-A02, Contrast 3), targeting MC-3.

## Discovery Questions
1. "For the same two factorizations, does GCD use the SMALLER or LARGER shared exponent of each prime — and how is that different from LCM?"
2. "Can two composite numbers (neither one prime) still be coprime? Check 8 and 9 directly."
3. "In the Euclidean algorithm, how do you know for certain you've reached the final answer, not just a small intermediate remainder?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (three methods — listing, prime factorization, Euclidean algorithm — converging on one answer) → TA-A02 (min-vs-max exponent contrast targeting MC-1; coprime composite-composite contrast targeting MC-2; completed-vs-early-stopped Euclidean algorithm targeting MC-3) → TA-A03 (a composite problem requiring all three methods to agree, surfacing any residual method-specific error) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the three-method convergence for GCD(24,36) (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the side-by-side GCD-vs-LCM min/max exponent contrast (Blueprint TA-A02, Contrast 1).
- **DO: Worked Example** — the coprime composite-composite pair (8, 9) (Blueprint TA-A02, Contrast 2).
- **ORGANIZE: Cross-Verification** — computing the same GCD via all three methods and confirming agreement (Blueprint TA-A03).

## Voice Teaching Notes
Whenever computing GCD via prime factorization, explicitly say "smaller — for GCD" out loud before selecting each shared exponent — this verbal anchor, directly modeled on the Blueprint's own mirror-image memory aid, is the single highest-leverage move against MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's GR-9 — no cross_links)**: reused verbatim from the Blueprint's Component 4 A04 — the cookie-packaging scenario (180 chocolate chip, 252 oatmeal cookies), including part (c)'s correction of the claim that non-coprime composite numbers can't have a "clean" GCD.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the side-by-side contrast, regress to computing GCD and LCM for the SAME pair back to back for several examples, labeling each answer explicitly ("GCD — smaller," "LCM — bigger") until the association becomes automatic, before allowing either computation in isolation.

## Memory Hooks
- "Smaller for GCD, bigger for LCM — same factorizations, opposite choice."
- "Coprime means zero shared primes — not 'one of them is prime.'"
- "The Euclidean algorithm isn't done until the remainder is exactly zero — the GCD is the LAST nonzero value, not the first small one."

## Transfer Connections
- `math.arith.fraction-simplification` (unlocks) reduces a fraction to lowest terms by dividing numerator and denominator by their GCD.
- `math.nt.bezout-identity` (unlocks) expresses the GCD as an integer linear combination, proved constructively using the Euclidean algorithm's own steps.

## Cross-Subject Connections
- Computer science: the Euclidean algorithm is among the oldest and most widely implemented algorithms, foundational to cryptographic key generation and modular arithmetic implementations.

## Blueprint References
`docs/curriculum/blueprints/math.nt.gcd.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (no cross_links) was independently re-verified at authoring time and remains accurate. This is the fourth concept authored in `math.nt` (after `divisibility`, `prime-number`, `prime-factorization`), and directly unblocks `math.arith.fraction-simplification` — one of the two remaining `math.arith` concepts. Only `math.nt.lcm` (no Blueprint) remains before `math.arith.fraction-addition` is also unblocked and `math.arith` can return to close out at 58/58 CERTIFIED.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 2.
