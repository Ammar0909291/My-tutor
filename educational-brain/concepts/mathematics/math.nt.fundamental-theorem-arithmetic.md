# math.nt.fundamental-theorem-arithmetic

## Identity
- **KG ID**: `math.nt.fundamental-theorem-arithmetic`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.prime-factorization`
- **Unlocks**: `math.nt.gcd`, `math.nt.lcm`
- **Cross-links**: `math.abst.ufd` — confirmed NOT yet authored (no Blueprint, verified via directory listing) — P76_mode = independence, per the Blueprint's own Component 7 finding.
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.fundamental-theorem-arithmetic.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the Fundamental Theorem of Arithmetic precisely (every integer greater than 1 is either prime or expressible as a product of primes, unique up to order), correctly interpret "unique up to order" as comparing the MULTISET of prime factors rather than their written sequence, and recognize existence and uniqueness as two logically separate claims requiring separate justification.

## Core Understanding
Per the Blueprint's Component 3: every integer n > 1 is either prime, or can be written as a product of primes, and this factorization is unique up to the order the factors are written in — two factorizations using the identical primes with the identical exponents, merely listed in a different sequence, count as the SAME factorization, not two different ones. The theorem actually makes two separate claims: EXISTENCE (a prime factorization can always be found — comparatively easy to see, via repeated division or strong induction) and UNIQUENESS (that factorization is the ONLY one, up to order — the theorem's genuinely deep, non-obvious content, resting on Euclid's Lemma: if a prime p divides a product ab, then p divides a or p divides b, a fact specific to primes that fails for composite divisors).

## Mental Models
1. **The multiset-not-sequence model** (Blueprint TA-A01): "unique up to order" means comparing WHICH primes appear and HOW MANY of each — 2×2×3×5 and 5×3×2×2 are the identical factorization, since both represent the multiset {2,2,3,5}, merely written differently.
2. **The two-separate-claims model**: existence (some factorization can be found) is a logically WEAKER claim than uniqueness (no alternative factorization exists) — the theorem asserts both, but they require fundamentally different kinds of justification, and conflating them into "one obvious fact" misses the theorem's actual depth.
3. **The prime-only-grouping model**: a factorization only counts as a PRIME factorization if every factor is actually prime — an expression like 36 = 4×9 is a valid ordinary factoring, but NOT a prime factorization, since 4 and 9 aren't prime; breaking it down further always lands back on the same unique prime factorization (2²×3²).

## Why Students Fail
Per the Blueprint's Component 6: the foundational and most common failure is treating two differently-ORDERED but identical-content factorizations as genuinely different results, doubting a correct answer simply because a classmate's factor tree branched in a different order. A second failure is not recognizing existence and uniqueness as two separate claims, treating the theorem as one single "obvious" statement rather than appreciating that uniqueness is the deeper, harder-to-prove half. A third failure is treating a non-prime factor grouping (like 36 = 4×9) as a genuinely different valid "prime factorization" alternative, rather than recognizing it simply isn't a prime factorization at all.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — REORDERED-FACTORIZATION-TREATED-AS-DIFFERENT** (FOUNDATIONAL)
  - **Blueprint description**: believing two factorizations using the identical multiset of primes, merely written in a different order, count as genuinely different factorizations.
  - **Birth type**: Type 4, notation-induced — the WRITTEN sequence of factors is the only visible surface feature distinguishing two computations, and without an explicit "compare the multiset, not the sequence" framing, a superficial visual difference is mistaken for a substantive mathematical difference.
  - **Repair approach**: Blueprint Repair Action B01 — re-anchoring on comparing the multiset directly (Blueprint TA-A01's two-students Example 2), showing 2×3×3×5 and 3×5×2×3 both represent {2,3,3,5}.

- **MC-2 — EXISTENCE-AND-UNIQUENESS-CONFLATED-AS-ONE-CLAIM** (see Blueprint Component 6)
  - **Blueprint description**: not recognizing existence (a factorization can be found) and uniqueness (no alternative exists) as two logically separate claims requiring separate justification.
  - **Birth type**: Type 1, overgeneralization — the theorem's name and casual statement ("every number factors into primes uniquely") is absorbed as one undifferentiated fact, since both halves are usually taught and stated together without separating which part is "easy" (existence) and which is "deep" (uniqueness).
  - **Repair approach**: Blueprint Repair Action B02 — Example 3's explicit separation, showing the factor-tree process mechanically demonstrates existence while uniqueness is a separate, stronger, Euclid's-Lemma-based guarantee.

- **MC-3 — NON-PRIME-FACTOR-GROUPINGS-TREATED-AS-VALID-ALTERNATIVE-FACTORIZATIONS** (see Blueprint Component 6)
  - **Blueprint description**: treating an expression like 36 = 4×9 as a genuinely different valid "prime factorization" alternative to 36 = 2²×3², rather than recognizing it simply isn't a prime factorization at all.
  - **Birth type**: Type 1, overgeneralization — any valid factoring (into any two factors, not necessarily prime) is treated as an equally legitimate "prime factorization," missing the specific requirement that every factor must itself be prime.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on the prime-only-grouping model (Mental Model 3), breaking 4×9 down further to show it lands back on the identical 2²×3².

## Analogies
- **Cryptographic-security analogy** (the Blueprint's own P76 transfer probe): a cryptographic system relying on a large composite's factorization being effectively unique means finding ANY valid factorization necessarily reveals THE (unique) intended one — directly illustrating why uniqueness, not just existence, carries real practical stakes.

## Demonstrations
- The factor tree for 84, worked to completion (Blueprint TA-A01, Example 1), establishing existence mechanically.
- The two-students-different-order scenario for 90 (Blueprint TA-A01/A02, Example 2), directly targeting MC-1 by showing both land on the identical multiset {2,3,3,5}.
- The existence-vs-uniqueness contrast for 100 (Blueprint TA-A02, Example 3), separating "a factorization exists" from "no alternative exists," targeting MC-2.

## Discovery Questions
1. "If two students factor the same number but list the prime factors in a different order, have they found different factorizations?"
2. "Is 'a factorization exists' the same claim as 'this is the ONLY factorization' — or are these two separate things to prove?"
3. "Is 36 = 4×9 a valid prime factorization of 36? Why or why not?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (existence via factor trees, then the "unique up to order" clarification via the two-students scenario) → TA-A02 (existence vs. uniqueness as two separate claims, plus the non-prime-grouping contrast) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the factor tree for 84, establishing existence (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the two-students-different-order scenario (Blueprint TA-A01/A02), directly targeting MC-1.
- **TELL: Explanation** — the existence-vs-uniqueness separation (Blueprint TA-A02), targeting MC-2.
- **TEST-THINKING: Prediction** — before checking, predict whether 36 = 4×9 counts as a valid prime factorization (targeting MC-3).

## Voice Teaching Notes
When a student doubts their own correctly-ordered factorization because a classmate's looks different, ask "same primes, same counts — different order?" as a standing verbal check — this directly targets MC-1 by redirecting attention from surface sequence to the actual multiset.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — `math.abst.ufd` confirmed unauthored)**: reused verbatim from the Blueprint's Component 5 A03 — the cryptographic-security transfer probe, explaining why uniqueness (not just existence) is what makes "finding a factorization" equivalent to "finding the intended factorization."
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, regress to physically sorting factor cards into piles by prime value (all the 2s together, all the 3s together, etc.) regardless of the order they were originally written, making the multiset comparison tactile and visual, before returning to written notation.

## Memory Hooks
- "Compare the multiset, not the sequence — order never matters here."
- "Existence says 'it can be done'; uniqueness says 'no other way exists' — two different claims, two different proofs."
- "Every factor in a PRIME factorization must actually BE prime — 4 and 9 don't count."

## Transfer Connections
- `math.nt.gcd` (unlocks) computes the GCD directly via matched prime-power exponents, relying on this theorem's uniqueness guarantee.
- `math.nt.lcm` (unlocks) similarly relies on unique factorization for its maximum-exponent computation.

## Cross-Subject Connections
- Computer science: cryptographic systems (RSA and similar) rely fundamentally on unique factorization's guarantee, as explored in this concept's own P76 transfer probe.

## Blueprint References
`docs/curriculum/blueprints/math.nt.fundamental-theorem-arithmetic.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.abst.ufd` unauthored) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3.
