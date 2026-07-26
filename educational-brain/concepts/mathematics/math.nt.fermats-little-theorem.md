# math.nt.fermats-little-theorem

## Identity
- **KG ID**: `math.nt.fermats-little-theorem`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.modular-arithmetic`, `math.nt.prime-number`
- **Unlocks**: `math.nt.eulers-theorem`, `math.nt.primality-testing`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.fermats-little-theorem.md` (reused by reference throughout this entry).

## Learning Objective
The student will state Fermat's Little Theorem (if p is prime and p∤a, then a^(p−1)≡1 mod p) and verify it directly for small examples, correctly identify that the hypothesis p∤a is essential — since the conclusion genuinely fails to 0 rather than 1 when p|a — and apply the theorem to efficiently compute a^k mod p for large exponents by reducing k modulo (p−1) first.

## Core Understanding
Per the Blueprint's Component 3: if p is prime and p∤a (equivalently gcd(a,p)=1), then a^(p−1)≡1 (mod p). The hypothesis p∤a is essential and not a subtle edge case: if p DOES divide a, then a^(p−1)≡0^(p−1)=0 (mod p) — a genuinely different, directly computable, definite failure, not merely "the theorem doesn't apply." Practically, since a^(p−1)≡1 (mod p), the sequence of powers a^1,a^2,a^3,... mod p is eventually periodic with period dividing p−1 — so computing a^N mod p for a huge exponent N can be done by first reducing N modulo (p−1) to a much smaller equivalent exponent r, then computing the far more manageable a^r mod p, giving the same answer as the infeasible direct computation.

## Mental Models
1. **The always-lands-on-one model** (Blueprint TA-A01): for prime p and p∤a, repeatedly multiplying by a modulo p always cycles back to exactly 1 at the (p−1)th power.
2. **The hypothesis-failure-is-computable model** (Blueprint TA-A02): when p|a, the theorem doesn't just "not apply" abstractly — direct computation shows a^(p−1)≡0, a concrete different answer.
3. **The exponent-reduction model** (Blueprint TA-A02): the periodicity established by the theorem means huge exponents can be replaced by their remainder modulo p−1 before computing, turning an infeasible calculation into a trivial one.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is applying the theorem's conclusion without first checking that p does not divide a, overlooking that the conclusion genuinely fails (giving 0, not 1) when this hypothesis is violated. A second failure is attempting to compute a^N mod p for a large N by direct computation rather than first reducing the exponent modulo p−1 using the theorem's periodicity. A third failure is, when reducing a large exponent, mistakenly reducing modulo p rather than the correct p−1 (the actual period the theorem establishes).

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — HYPOTHESIS-P-DOES-NOT-DIVIDE-A-OVERLOOKED** (FOUNDATIONAL)
  - **Blueprint description**: applying Fermat's Little Theorem's conclusion without first checking that p does not divide a, overlooking that the conclusion genuinely fails (giving 0, not 1) when this hypothesis is violated.
  - **Birth type**: Type 5, instruction-induced — the theorem is frequently recalled and recited in an abbreviated verbal form ("a^(p−1)≡1 mod p for prime p") that drops the crucial p∤a qualifier, making the omission easy to inherit from how the statement is casually spoken.
  - **Repair approach**: Blueprint Repair Action B01 — computing 14^6 mod 7 directly, showing the actual result is 0, not 1, confirming the hypothesis's necessity.

- **MC-2 — LARGE-EXPONENT-COMPUTED-DIRECTLY-WITHOUT-REDUCTION** (Moderate)
  - **Blueprint description**: attempting to compute a^N mod p for a large N by direct computation rather than first reducing the exponent modulo p−1 using the theorem's periodicity.
  - **Birth type**: Type 1, overgeneralization — the habit of computing powers directly (valid and necessary for small exponents) is carried over unchanged to large-exponent cases, where it becomes computationally infeasible instead of merely inefficient.
  - **Repair approach**: Blueprint Repair Action B02 — re-anchoring on "reduce the EXPONENT modulo p−1 first — this is always valid by the theorem's periodicity."

- **MC-3 — EXPONENT-REDUCED-MODULO-P-INSTEAD-OF-P-MINUS-1** (Moderate)
  - **Blueprint description**: when reducing a large exponent, mistakenly reducing modulo p rather than the correct p−1 (the actual period established by the theorem).
  - **Birth type**: Type 6, analogy overextension — the modulus p is the "special number" throughout the rest of modular-arithmetic work (residues, congruences), so the reduction step is analogized to reduce by p as well, missing that the THEOREM's own period is p−1, not p.
  - **Repair approach**: Blueprint Repair Action B03 — re-deriving from the theorem's own statement that the period is p−1 (since a^(p−1)≡1 is what repeats), not p itself.

## Analogies
- **The essential-hypothesis contrast** (Blueprint TA-A02): "ALWAYS check p∤a FIRST — if p divides a, the theorem doesn't apply, and in fact you can directly compute a^(p−1)≡0, a completely different outcome."

## Demonstrations
- The full power sequence for p=7, a=3, landing on exactly 1 at the 6th power (Blueprint Example 1).
- The direct computation of 14^6 mod 7 = 0, when 7|14, confirming the hypothesis's necessity (Blueprint Example 2), targeting MC-1.
- The exponent-reduction computation of 3^100 mod 7 via reducing 100 modulo 6 first (Blueprint Example 3), targeting MC-2/MC-3.

## Discovery Questions
1. "Does a^(p−1)≡1 (mod p) hold for EVERY integer a and prime p, or only under a specific condition?"
2. "If p divides a, what actually happens to a^(p−1) mod p — does the theorem's conclusion still hold?"
3. "To compute a huge power like a^100 mod p, do you have to compute the actual enormous number first?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (verifying the theorem and its essential hypothesis, using Examples 1 and 2, MC-1 hook) → TA-A02 (reducing large exponents via periodicity, contrast pairs using Examples 1/2 and Example 3) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **DO: Worked Example** — the full power sequence for p=7, a=3, landing on 1 at the 6th power (Blueprint Example 1).
- **TEST-THINKING: Error Analysis** — the direct computation of 14^6 mod 7 = 0 when the hypothesis is violated (Blueprint Example 2), targeting MC-1.
- **DO: Worked Example** — the exponent-reduction computation of 3^100 mod 7 (Blueprint Example 3), targeting MC-2/MC-3.
- **TELL: Explanation** — the precise rule: always check p∤a first, and reduce the exponent modulo p−1, never p (Blueprint TA-A02).

## Voice Teaching Notes
Before any application of the theorem, ask "does p divide a, or not?" as a standing verbal check — a fast, mandatory gate directly targeting MC-1 before any computation proceeds.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A03 — the RSA-style key-generation scenario computing 7^1,000,003 mod 13 via exponent reduction, with an explicit gcd check before applying the theorem.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state the hypothesis check "p∤a?" out loud and verify it explicitly before any theorem application is accepted, using a hypothesis-violated case each time until the check becomes an automatic first step.

## Memory Hooks
- "Check p∤a FIRST — skip it, and the theorem's promise doesn't hold."
- "If p divides a, you get 0, not 1 — a real, different, computable answer."
- "Reduce the exponent modulo p−1, never modulo p itself."

## Transfer Connections
- `math.nt.eulers-theorem` (unlocks) generalizes this result to composite moduli, using Euler's totient function in place of p−1.
- `math.nt.primality-testing` (unlocks) uses Fermat's Little Theorem as the basis of the Fermat primality test.

## Cross-Subject Connections
- Computer science / cryptography: exponent reduction via Fermat's Little Theorem is a foundational computational technique underlying practical RSA-scale modular exponentiation.

## Blueprint References
`docs/curriculum/blueprints/math.nt.fermats-little-theorem.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 5 part 1.
