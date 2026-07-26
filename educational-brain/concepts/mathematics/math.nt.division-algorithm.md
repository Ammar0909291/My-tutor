# math.nt.division-algorithm

## Identity
- **KG ID**: `math.nt.division-algorithm`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.found.well-ordering-principle`, `math.arith.division`
- **Unlocks**: `math.nt.modular-arithmetic`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.nt.division-algorithm.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the Division Algorithm precisely (for integers a and b > 0, there exist UNIQUE integers q and r with a = bq + r, 0 ≤ r < b), explain both its existence proof (via the Well-Ordering Principle) and uniqueness proof (via contradiction), and correctly apply it to negative dividends, where the remainder must still satisfy 0 ≤ r < b.

## Core Understanding
Per the Blueprint's Component 3: for integers a and b > 0, there exist UNIQUE integers q and r such that a = bq + r with 0 ≤ r < b. Existence is proved via the Well-Ordering Principle: considering the set S of all nonnegative values a − bq (over every integer q), this set is nonempty and therefore has a LEAST element by Well-Ordering — that least value is r, and it automatically satisfies r < b (otherwise an even smaller nonnegative value would exist, contradicting minimality). Uniqueness follows because if two valid representations existed, their difference would force b(q₁ − q₂) = r₂ − r₁, but since both remainders lie in [0,b), their difference has absolute value less than b — and the only multiple of b with absolute value less than b is 0, forcing q₁ = q₂ and r₁ = r₂. For NEGATIVE dividends, the remainder must STILL stay in [0,b) — this means the quotient is generally NOT simply the ordinary "rounded toward zero" division result; for a = −7, b = 3, naive truncation gives q = −2 with an invalid remainder of −1, while the correct division-algorithm answer is q = −3, r = 2.

## Mental Models
1. **The least-nonnegative-leftover model** (Blueprint TA-A01): among all the ways to subtract multiples of b from a, the remainder r is specifically the SMALLEST nonnegative result achievable — Well-Ordering guarantees this smallest value exists and is unique.
2. **The bounded-uniqueness model**: uniqueness holds specifically AMONG representations satisfying the stated remainder bound 0 ≤ r < b — other arithmetically-true equations of the form a = bq + (something) that violate this bound simply aren't valid division-algorithm representations to begin with, so they don't contradict uniqueness.
3. **The remainder-decides-the-quotient model** (for negative a): always determine r FIRST by ensuring 0 ≤ r < b, THEN back out q = (a − r)/b — never trust ordinary rounded/truncated division to automatically respect this constraint for a negative dividend.

## Why Students Fail
Per the Blueprint's Component 8: the foundational and practically consequential failure is assuming ordinary rounded or truncated division (which typically rounds toward zero) automatically satisfies the 0 ≤ r < b constraint, especially for negative dividends — a genuine, real source of off-by-one errors in practical computing contexts, not merely an academic distinction. A second failure is over-interpreting "uniqueness" to mean no OTHER equation of the form a = bq + r can be written at all, rather than uniqueness specifically among representations satisfying the stated remainder bound. A third failure is checking only one side of the two-sided remainder constraint (verifying r < b but forgetting r ≥ 0, or vice versa), treating it as a single-sided check.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — TRUNCATED-DIVISION-ASSUMED-VALID-FOR-NEGATIVE-DIVIDENDS** (FOUNDATIONAL)
  - **Blueprint description**: assuming ordinary rounded/truncated division (rounding towards zero) automatically satisfies the Division Algorithm's 0 ≤ r < b constraint, especially for negative dividends, without checking or adjusting.
  - **Birth type**: Type 1, overgeneralization — the truncation-toward-zero behavior of ordinary calculator and programming-language division works correctly (and matches intuition) for positive dividends, and this behavior is overgeneralized to negative dividends, where it genuinely disagrees with the Division Algorithm's own convention.
  - **Repair approach**: Blueprint Repair Action B01 — working through Example 3's explicit correction (a = −17, b = 5: naive q = −3 gives an invalid r = −2; correct is q = −4, r = 3), showing the naive quotient must be adjusted by exactly 1.

- **MC-2 — UNIQUENESS-MISUNDERSTOOD-AS-NO-OTHER-ARITHMETIC-REPRESENTATION-EXISTS** (see Blueprint Component 6)
  - **Blueprint description**: believing uniqueness means no OTHER equation of the form a = bq + r can be written at all, rather than uniqueness specifically among representations satisfying the stated remainder bound 0 ≤ r < b.
  - **Birth type**: Type 1, overgeneralization — the word "unique" is taken at its broadest possible reading (no alternative equation whatsoever), rather than the theorem's actual, narrower scope (unique among bound-satisfying representations).
  - **Repair approach**: Blueprint Repair Action B02 — Example 2's demonstration that 47 = 6(6)+11 is arithmetically true but fails the remainder bound (11 ≥ 6), so it simply isn't a competing valid representation at all.

- **MC-3 — REMAINDER-BOUND-CHECKED-ONLY-FOR-UPPER-LIMIT** (see Blueprint Component 6)
  - **Blueprint description**: verifying r < b but forgetting to also check r ≥ 0 (or vice versa), treating the remainder constraint as a single-sided check rather than the full two-sided range.
  - **Birth type**: Type 4, notation-induced — the constraint 0 ≤ r < b is written as one compound inequality, but the two halves are logically independent checks, and a habit of scanning only for the more visually salient upper bound can silently drop the lower-bound verification.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on the full two-sided constraint as two separate, both-mandatory checks, directly connecting a dropped lower-bound check to exactly the kind of negative-remainder error MC-1 describes.

## Analogies
- **Cyclic-scheduling analogy** (the Blueprint's own P76 transfer probe): assigning a retroactively-inserted, negatively-numbered task to one of 7 rotating workers requires the correct negative-dividend handling — using ordinary rounded division would assign the wrong worker, directly illustrating MC-1's real-world consequence.

## Demonstrations
- Physically grouping 47 objects into bags of 6, counting 7 full bags with 5 left over, directly grounding Example 1's q=7, r=5 (Blueprint TA-A01).
- The negative-dividend correction for a=−17, b=5: naive truncation (q=−3, invalid r=−2) contrasted against the correct division-algorithm answer (q=−4, r=3) (Blueprint TA-A02, Contrast 2), targeting MC-1.
- The uniqueness check for 47 = 6(6)+11, showing it fails the remainder bound and therefore doesn't contradict uniqueness (Blueprint TA-A02, Contrast 1), targeting MC-2.

## Discovery Questions
1. "Does ordinary calculator division always give you a remainder that satisfies 0 ≤ r < b, even for a negative dividend?"
2. "If someone writes 47 = 6×6 + 11, does that contradict the Division Algorithm's uniqueness claim?"
3. "Are you checking BOTH sides of 0 ≤ r < b, or just one?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (existence via Well-Ordering, applied concretely to the grouping-into-bags scenario) → TA-A02 (uniqueness via the bounded-representations argument; the negative-dividend correction) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — physically grouping objects into bags, connecting to existence (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the negative-dividend naive-vs-correct contrast (Blueprint TA-A02, Contrast 2), targeting MC-1.
- **TELL: Explanation** — the bounded-uniqueness argument (Blueprint TA-A02, Contrast 1), targeting MC-2.
- **ORGANIZE: Checklist** — the explicit two-sided remainder-bound check (targeting MC-3).

## Voice Teaching Notes
For any negative-dividend problem, say "find r first, in the range zero to b, THEN find q" rather than "divide and see what you get" — this ordering habit, directly modeled on the Blueprint's own correction rule, is the single highest-leverage move against MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A03 — the cyclic-scheduling transfer probe, assigning a negative task number to one of 7 rotating workers using correct negative-dividend handling.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, regress to exclusively working with a number line for negative-dividend problems, physically marking off multiples of b from a until landing in the [0,b) range, before returning to purely symbolic computation.

## Memory Hooks
- "Find r first, in range zero to b — then back out q, never trust rounded division blindly for negatives."
- "Unique means unique AMONG bound-satisfying answers — not that no other equation could ever be written."
- "Check BOTH sides of 0 ≤ r < b, every time — not just the upper bound."

## Transfer Connections
- `math.nt.modular-arithmetic` (unlocks) is defined directly using this concept's remainder, extended to a full arithmetic system on residues.

## Cross-Subject Connections
- Computer science: negative-dividend division behavior varies across programming languages, and understanding the Division Algorithm's own convention (as opposed to a given language's truncation or flooring behavior) is directly relevant to avoiding off-by-one bugs, as in the cyclic-scheduling transfer probe.

## Blueprint References
`docs/curriculum/blueprints/math.nt.division-algorithm.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3.
