# math.nt.primality-testing

## Identity
- **KG ID**: `math.nt.primality-testing`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.fermats-little-theorem`
- **Unlocks**: `math.nt.rsa-basics`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7 (⌈0.7×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.nt.primality-testing.md` (reused by reference throughout this entry).

## Learning Objective
The student will apply trial division as the most basic primality test and recognize its severe impracticality for large n, apply the Fermat primality test via the contrapositive of Fermat's Little Theorem while recognizing that passing is only evidence never proof, and recognize the existence of Carmichael numbers that defeat the naive test for every base, correctly distinguishing probabilistic tests (Miller-Rabin) from deterministic tests (AKS).

## Core Understanding
Per the Blueprint's Component 3: trial division (checking divisibility by every integer up to √n) is completely correct but impractically slow for large n. The Fermat test uses the CONTRAPOSITIVE of Fermat's Little Theorem: if a^(n−1)≢1 (mod n) for some base a, then n is DEFINITELY composite — but the converse does not hold: a^(n−1)≡1 (mod n) passing for some base is only evidence consistent with primality, never proof, since some composites pass for specific bases too. Carmichael numbers are composites that pass the Fermat test for EVERY coprime base — no amount of additional base-testing under the plain test could ever correctly flag them as composite. This motivates Miller-Rabin (a refined probabilistic test that CAN detect Carmichael numbers, giving overwhelming but not absolute confidence) versus AKS (a deterministic, polynomial-time test giving absolute mathematical certainty).

## Mental Models
1. **The correct-but-impractical model** (Blueprint TA-A01): trial division always works — the problem is purely practical scaling, not correctness.
2. **The evidence-not-proof model** (Blueprint TA-A02): passing the Fermat test for some base is consistent with primality but never proves it — only failing gives certainty.
3. **The genuinely-fooled-not-just-unlucky model** (Blueprint TA-A03): Carmichael numbers aren't cases where you happened to pick unlucky bases — they pass for every single valid base, requiring a structurally different test.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a^(n−1)≡1 (mod n) holding for some base a proves n is prime, missing that this is only evidence, never proof. A second foundational failure is believing testing enough different bases under the Fermat test eventually correctly identifies any composite number, missing that Carmichael numbers pass for every valid base. A third failure is believing probabilistic tests like Miller-Rabin and deterministic tests like AKS give the exact same kind of certainty, missing the fundamental distinction between overwhelming confidence and absolute mathematical certainty.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — FERMAT-TEST-PASSING-ASSUMED-TO-PROVE-PRIMALITY** (FOUNDATIONAL)
  - **Blueprint description**: believing a^(n−1)≡1 (mod n) holding for some base a proves n is prime, missing that this is only evidence, never proof.
  - **Birth type**: Type 4, notation-induced — the contrapositive direction (failure implies composite) is logically valid and easy to state, and this validity is silently, incorrectly extended to the converse direction (passing implies prime), which the same congruence notation does not actually support.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 2's pseudoprime 341, passing for base 2 yet genuinely composite.

- **MC-2 — EXHAUSTIVE-BASE-TESTING-ASSUMED-TO-CATCH-EVERY-COMPOSITE** (FOUNDATIONAL)
  - **Blueprint description**: believing testing enough different bases under the Fermat test eventually correctly identifies any composite number, missing that Carmichael numbers pass for every valid base.
  - **Birth type**: Type 1, overgeneralization — the reasonable intuition that "more testing catches more errors" is carried over from ordinary statistical testing, where it usually holds, into a setting where a specific structural exception (Carmichael numbers) defeats it entirely.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Example 3's Carmichael number 561, passing for every coprime base.

- **MC-3 — PROBABILISTIC-AND-DETERMINISTIC-TESTS-ASSUMED-EQUIVALENT** (Moderate)
  - **Blueprint description**: believing probabilistic tests like Miller-Rabin and deterministic tests like AKS give the exact same kind of certainty, missing the fundamental distinction between overwhelming confidence and absolute mathematical certainty.
  - **Birth type**: Type 3, language contamination — both tests are colloquially described as "telling you whether a number is prime," blurring the genuinely different certainty guarantees each one actually provides.
  - **Repair approach**: Blueprint Repair Action B03 — re-emphasizing the distinction from Example 3's discussion, contrasting overwhelming confidence against absolute proof.

## Analogies
- **The correctness-versus-scale framing** (Blueprint TA-A01): "checking divisors up to √n is completely correct — the problem is purely practical: for a huge n, there are simply too many candidates to check."

## Demonstrations
- The full trial-division check confirming 97 is prime (Blueprint Example 1).
- The pseudoprime 341, passing the Fermat test for base 2 (2^340≡1 mod 341) yet genuinely composite (341=11×31) (Blueprint Example 2), targeting MC-1.
- The Carmichael number 561, passing the Fermat test for EVERY coprime base, defeating exhaustive base-testing entirely (Blueprint Example 3), targeting MC-2/MC-3.

## Discovery Questions
1. "Is trial division ever wrong, or is its only problem how long it takes?"
2. "If a^(n−1)≡1 (mod n) holds for one base, does that prove n is prime?"
3. "If you tested every single possible base and a number passed every time, would you know for certain it's prime?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (trial division works but doesn't scale — Example 1) → TA-A02 (passing the Fermat test is evidence, not proof — Example 2, MC-1 hook) → TA-A03 (Carmichael numbers fool every base; probabilistic vs. deterministic — Example 3, MC-2/MC-3 hooks) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **DO: Worked Example** — the full trial-division check for 97 (Blueprint Example 1).
- **TEST-THINKING: Error Analysis** — the pseudoprime 341 passing for base 2 yet composite (Blueprint Example 2), targeting MC-1.
- **TEST-THINKING: Error Analysis** — the Carmichael number 561 passing for every base (Blueprint Example 3), targeting MC-2.
- **ORGANIZE: Concept Map** — the probabilistic-versus-deterministic distinction between Miller-Rabin and AKS, targeting MC-3.

## Voice Teaching Notes
When a student reports the Fermat test passed for a chosen base, ask "does that PROVE it's prime, or is it just evidence?" as a standing verbal check directly targeting MC-1 before any primality conclusion is accepted.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A04 — the cryptographic large-prime-generation scenario, explaining trial division's impracticality, the Fermat filter's limits, and the Miller-Rabin trade-off.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state explicitly, for any Fermat-test result, whether the outcome was "fail" (certain composite) or "pass" (only evidence) before drawing any conclusion, until the asymmetry becomes automatic.

## Memory Hooks
- "Trial division always works — it's just too slow for big numbers."
- "Failing the Fermat test proves composite. Passing only suggests prime."
- "Carmichael numbers pass every base — testing more bases won't save you."

## Transfer Connections
- `math.nt.rsa-basics` (unlocks) relies directly on efficiently generating large primes using this concept's primality-testing machinery.
- `math.nt.fermats-little-theorem` (requires) supplies the theorem whose contrapositive this concept's Fermat test directly uses.

## Cross-Subject Connections
- Computer science / cryptography: efficient primality testing (Miller-Rabin in practice) is essential for generating the large primes RSA and other cryptosystems depend on.

## Blueprint References
`docs/curriculum/blueprints/math.nt.primality-testing.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 6 part 1.
