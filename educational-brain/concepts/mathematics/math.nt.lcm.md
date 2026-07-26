# math.nt.lcm

## Identity
- **KG ID**: `math.nt.lcm`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.prime-factorization`, `math.nt.gcd`
- **Unlocks**: `math.arith.fraction-addition`
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.lcm.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will compute the LCM of two integers — the smallest positive integer divisible by both — via prime factorization (taking the MAXIMUM shared exponent of each prime appearing in either number) and via its direct relationship to GCD (lcm(a,b) = ab / gcd(a,b)), correctly recognizing that LCM is always at least as large as the larger of the two numbers, the opposite bound from GCD.

## Core Understanding
Building directly on `math.nt.gcd`'s prime-factorization method, LCM is computed by the MIRROR-IMAGE rule: for each prime appearing in EITHER factorization, take the MAXIMUM of its exponents across the two numbers (rather than GCD's minimum), including primes that appear in only one of the two numbers at all (since the "minimum" comparison for LCM effectively treats a missing prime as exponent 0, and the maximum with any positive exponent is simply that exponent). LCM and GCD are also directly related via lcm(a,b) = (a×b) / gcd(a,b) — a genuinely useful shortcut once GCD is known, but one that silently breaks down (produces the wrong, oversized answer) if a student instead just multiplies a×b without dividing by the GCD, which only gives the correct LCM when a and b happen to be coprime (GCD = 1). A critical bound, the mirror image of GCD's own bound, is that LCM(a,b) is always GREATER THAN OR EQUAL TO the LARGER of a and b (never smaller), exactly opposite to GCD, which is always LESS THAN OR EQUAL TO the SMALLER of a and b.

## Mental Models
1. **The maximum-exponent-mirror model**: LCM uses the exact mirror rule to GCD — maximum shared exponent (including primes appearing in only one factorization) instead of minimum — computed from the identical two factorizations that GCD uses.
2. **The product-over-gcd model**: lcm(a,b) = (a×b) / gcd(a,b) is a genuine shortcut, but the division by GCD is mandatory whenever a and b share ANY common factor — skipping it silently produces an inflated, incorrect answer that is only coincidentally correct when a and b are coprime.
3. **The opposite-bound model**: GCD is always ≤ the smaller of the two numbers (a common divisor can't exceed either number); LCM is always ≥ the LARGER of the two numbers (a common multiple can't be smaller than either number) — these are genuinely opposite-direction bounds, not variations of the same fact.

## Why Students Fail
The dominant failure is computing LCM as the simple product a×b unconditionally, a shortcut that happens to be exactly correct only when a and b are coprime, and produces a systematically inflated (wrong) answer whenever they share any common factor. A second failure is the mirror image of `math.nt.gcd`'s own MC-1 — swapping the maximum-exponent rule (LCM) for the minimum-exponent rule (GCD) when computing via prime factorization, since both procedures operate on the identical two factorizations and differ only in which extreme is selected. A third failure is assuming LCM, like GCD, must be small or bounded by the smaller of the two numbers, missing that LCM's actual bound runs in the opposite direction (at least as large as the LARGER number).

## Misconceptions
- **MC-1 — LCM-COMPUTED-AS-SIMPLE-PRODUCT** (FOUNDATIONAL)
  - **Statement**: The student computes LCM(a,b) as simply a×b, without dividing by GCD(a,b), producing a correct answer only when a and b happen to be coprime and an inflated, wrong answer otherwise (e.g., LCM(4,6) computed as 24 instead of the correct 12).
  - **Birth type**: Type 1, overgeneralization — the simple-product shortcut IS exactly correct for coprime pairs, and this special case is overgeneralized into a universal rule without checking whether the pair shares any common factor.
  - **Diagnostic probe**: Ask the student to compute LCM(4,6); MC-1 shows as an answer of 24 (the plain product) rather than the correct 12 (the actual smallest common multiple: 4, 8, 12; 6, 12 — 12 is the first shared value).
  - **Repair approach**: Ground the product-over-gcd model (Mental Model 2) with an explicit side-by-side check — compute GCD(4,6) = 2 first, then lcm = (4×6)/2 = 12 — reinforcing that the division step is mandatory whenever GCD > 1, and demonstrating with a listed-multiples check (4, 8, 12, 16… vs. 6, 12, 18… — first shared value 12) that 24 is not even the SMALLEST common multiple, since 12 already works.

- **MC-2 — LCM-EXPONENT-RULE-CONFUSED-WITH-GCD**
  - **Statement**: The student takes the MINIMUM shared prime exponent when computing LCM via prime factorization (the rule that actually belongs to GCD), or vice versa.
  - **Birth type**: Type 6, analogy overextension — this is the mirror-image confusion of `math.nt.gcd`'s own MC-1 (GCD-LCM-EXPONENT-CONFUSION), arising from the identical root cause: GCD and LCM are computed from the same two factorizations via opposite-extreme rules, and the rule learned for one bleeds into the other without a strong enough distinguishing anchor.
  - **Diagnostic probe**: Present 12 = 2²×3 and 18 = 2×3² and ask the student to compute LCM using "the exponents you'd naturally combine"; MC-2 shows as taking the minimum (2¹×3¹ = 6, which is actually GCD(12,18)) instead of the maximum (2²×3² = 36, the correct LCM).
  - **Repair approach**: Compute GCD and LCM for the same pair side by side, explicitly labeling "GCD — smaller exponent" and "LCM — bigger exponent," reusing the identical mirror-image memory aid established in `math.nt.gcd`'s own repair for its MC-1.

- **MC-3 — LCM-ASSUMED-BOUNDED-LIKE-GCD**
  - **Statement**: The student believes LCM, like GCD, must be small — specifically, no larger than one of the original two numbers — carrying GCD's own "always ≤ the smaller number" bound incorrectly onto LCM.
  - **Birth type**: Type 6, analogy overextension — GCD's genuine, correct bound (GCD ≤ min(a,b)) is overextended by analogy onto LCM, which has the exact OPPOSITE bound (LCM ≥ max(a,b)), since the two concepts are structurally mirror images but their size relationships to the original numbers are not interchangeable.
  - **Diagnostic probe**: Ask the student whether LCM(8,12) could be smaller than 12; MC-3 shows as "maybe, if they share factors" rather than confidently stating LCM must be at least 12 (the larger number), since 12 itself must be among the multiples counted.
  - **Repair approach**: Reinforce the opposite-bound model (Mental Model 3) directly — a common MULTIPLE can never be smaller than either original number (since it must be reachable by multiplying that number by a positive integer), in direct contrast to a common DIVISOR, which can never exceed either original number.

## Analogies
- **Bus-schedule analogy**: if one bus arrives every 4 minutes and another every 6 minutes, the LCM (12 minutes) is when they NEXT arrive together — necessarily at least as long as the longer individual interval (6 minutes), never shorter than either schedule's own interval, directly grounding the opposite-bound model.

## Demonstrations
- Listing the first several multiples of two numbers side by side (4: 4,8,12,16…; 6: 6,12,18…) and identifying the first shared value, contrasted directly against the plain product (24), showing 12 is both correct and genuinely smaller (targeting MC-1).
- The side-by-side GCD-vs-LCM prime-factorization computation for the same pair (12 and 18), explicitly labeling which extreme (min/max) belongs to which concept (targeting MC-2).

## Discovery Questions
1. "Is LCM(a,b) always just a times b — or does that only work sometimes?"
2. "When computing LCM by prime factorization, do you want the SMALLER or LARGER shared exponent — and how is that different from GCD?"
3. "Could the LCM of two numbers ever be smaller than one of them?"

## Teaching Sequence
1. Confirm `math.nt.prime-factorization` and `math.nt.gcd` are solid.
2. Introduce LCM via the multiples-listing method first (concrete), contrasting directly against the plain-product shortcut to expose when it fails (targeting MC-1).
3. Introduce the prime-factorization method (maximum shared exponent), computed side by side with the same pair's GCD to reinforce the mirror-image distinction (targeting MC-2).
4. Introduce the product-over-gcd shortcut (lcm = ab/gcd) as a faster method once GCD is known, explicitly requiring the division step.
5. Introduce the opposite-bound model explicitly (targeting MC-3), contrasting GCD's ≤-smaller-number bound against LCM's ≥-larger-number bound.
6. Practice mixed problems requiring the student to justify which method and which bound applies.

## Tutor Actions
- **SHOW: Demonstration** — the multiples-listing method finding the first shared value.
- **TEST-THINKING: Error Analysis** — the plain-product-vs-correct-LCM contrast for a non-coprime pair (targeting MC-1).
- **ORGANIZE: Matching** — the side-by-side GCD-vs-LCM exponent-rule contrast (targeting MC-2).
- **TEST-THINKING: Prediction** — predict whether LCM could be smaller than one of the original numbers, before checking (targeting MC-3).

## Voice Teaching Notes
When computing LCM via prime factorization, say "bigger — for LCM" out loud before selecting each shared exponent, directly mirroring the verbal habit established for GCD's "smaller — for GCD" — the paired phrasing reinforces the mirror-image structure and targets MC-2 directly.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a bus-schedule or event-recurrence scenario requiring the student to compute LCM as "when do both recur together," explicitly justifying why the answer must be at least as large as the longer individual interval (targeting MC-3).
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one non-coprime pair requiring the product-over-gcd correction (targeting MC-1) and one item requiring the student to state LCM's lower bound relative to the two numbers (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to exhaustively listing multiples of both numbers side by side for every practice problem (no shortcut formulas at all) until the "first shared value" concept is solid, before reintroducing the prime-factorization and product-over-gcd shortcuts.

## Memory Hooks
- "Bigger for LCM, smaller for GCD — same factorizations, opposite choice."
- "Multiply, then divide by the GCD — skipping the division only works by coincidence when the numbers are coprime."
- "LCM can never be smaller than the larger number — a common multiple has to reach at least that far."

## Transfer Connections
- `math.arith.fraction-addition` (unlocks) requires finding a common denominator, which is exactly the LCM of the two denominators.

## Cross-Subject Connections
- Physics and engineering: periodic phenomena with different cycle lengths (e.g., gear ratios, wave beat frequencies) recur together at intervals determined by the LCM of their individual periods.

## Blueprint References
None — no Blueprint exists for `math.nt.lcm` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This is the fifth and final concept authored in this bounded `math.nt` cross-domain excursion, directly unblocking `math.arith.fraction-addition` — the last remaining `math.arith` concept. With this concept authored, both of `math.arith`'s final 2 concepts (`fraction-simplification`, `fraction-addition`) are now ready to be authored, allowing `math.arith` to close at 58/58 CERTIFIED in the next wave.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 2.
