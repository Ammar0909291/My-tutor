# math.nt.euclidean-algorithm

## Identity
- **KG ID**: `math.nt.euclidean-algorithm`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.gcd`, `math.arith.remainder`
- **Unlocks**: `math.nt.extended-euclidean-algorithm`, `math.nt.bezout-identity`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.euclidean-algorithm.md` (reused by reference throughout this entry).

## Learning Objective
The student will execute the Euclidean Algorithm by hand (repeatedly replacing (a,b) with (b, a mod b) until the remainder reaches exactly 0), explain WHY the algorithm works via the identity gcd(a,b) = gcd(b, a mod b), and recognize its dramatic efficiency advantage over exhaustive divisor listing for large numbers.

## Core Understanding
Per the Blueprint's Component 3: the Euclidean Algorithm computes gcd(a,b) by repeatedly replacing the pair (a,b) with (b, a mod b) until the remainder is exactly 0 — at which point the OTHER number in that final pair is the GCD. The algorithm's correctness rests on the identity gcd(a,b) = gcd(b, a mod b): writing a = bq + r, any common divisor of a and b must also divide r = a − bq, and conversely any common divisor of b and r must also divide a = bq + r — so the pairs (a,b) and (b,r) share EXACTLY the same set of common divisors, hence the identical GCD. This makes the algorithm dramatically more efficient than listing every divisor of two numbers and comparing (which scales with the SIZE of the numbers) — the Euclidean Algorithm's step count grows only logarithmically, roughly proportional to the NUMBER OF DIGITS, making it practical even for enormous numbers.

## Mental Models
1. **The measuring-stick model** (Blueprint TA-A01): repeatedly laying a shorter stick against a longer one and marking off the leftover, over and over, is the ancient geometric origin of the algorithm — "keep replacing the pair with (smaller number, remainder) until the remainder hits zero."
2. **The shared-divisors-preserved model**: at every step, the pair (a,b) and its replacement (b, a mod b) have IDENTICAL sets of common divisors — nothing is lost or gained, only the numbers get smaller, which is exactly why the final nonzero value is the true GCD.
3. **The exactly-zero-not-merely-small model**: the stopping condition is the remainder reaching PRECISELY 0, verified by actually performing the division — a remainder that merely "looks small" is not sufficient grounds to stop.

## Why Students Fail
Per the Blueprint's Component 8: the foundational and most dangerous failure is stopping the algorithm because a remainder "looks small enough," without actually performing the confirming division to verify it is EXACTLY zero — dangerous specifically because this habit frequently produces the correct answer by coincidence (small numbers often do turn out to be the GCD), masking the error until a case arises where it actually matters. A second failure is reversing the replacement pair's order, incorrectly forming (a mod b, b) instead of the correct (b, a mod b), disrupting the required larger-then-smaller structure needed for the next step. A third failure is applying the gcd(a,b) = gcd(b, a mod b) identity as a memorized rule without understanding why common divisors are preserved at each replacement.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — STOPPING-CONDITION-BASED-ON-SMALL-REMAINDER** (FOUNDATIONAL)
  - **Blueprint description**: stopping the algorithm because a remainder "looks small" rather than verifying it is EXACTLY zero via an actual division.
  - **Birth type**: Type 2, perceptual intuition — a small remainder perceptually "feels" like the process must be nearly or already done, an intuition reinforced by the fact that this shortcut frequently happens to coincide with the correct answer, making the error self-reinforcing rather than self-correcting.
  - **Repair approach**: Blueprint Repair Action B01 — the explicit Contrast 2 (Blueprint TA-A02) distinguishing "stopping because it looks small" from "stopping because a specific division yields remainder exactly 0," reinforced by the transfer probe's part (b), which makes the shortcut's real failure risk explicit.

- **MC-2 — REPLACEMENT-PAIR-ORDER-REVERSED** (see Blueprint Component 6)
  - **Blueprint description**: incorrectly replacing (a,b) with (a mod b, b) (order reversed) instead of the correct (b, a mod b), disrupting the algorithm's required "larger, smaller" structure at each step.
  - **Birth type**: Type 4, notation-induced — the division statement a = bq + r visually presents b and r in a certain order, and without an explicit anchor to "divisor first, then remainder" the replacement pair's correct order can be easily transposed.
  - **Repair approach**: Blueprint Repair Action B02 — re-deriving the correct order directly from the division statement, explicitly stating "the next pair is (b, r), divisor then remainder."

- **MC-3 — GCD-IDENTITY-TREATED-AS-UNEXPLAINED-RULE** (see Blueprint Component 6)
  - **Blueprint description**: applying gcd(a,b) = gcd(b, a mod b) as a memorized rule without understanding why common divisors are preserved at each replacement step.
  - **Birth type**: Type 5, instruction-induced — the algorithm's mechanical procedure (replace and repeat) can be practiced to fluency without ever engaging with the underlying divisor-preservation argument, especially under bloom=apply's execution-focused assessment style.
  - **Repair approach**: Blueprint Repair Action B03 — working through Example 2's explicit common-divisor-set comparison, showing (252,105) and (105,42) share the identical divisor set {1,3,7,21}.

## Analogies
- **Measuring-stick analogy** (Blueprint TA-A01): the ancient geometric origin of the algorithm — repeatedly measuring a longer length against a shorter one, marking off the leftover each time, until nothing is left over, directly grounding the repeated-replacement structure in a physical process.

## Demonstrations
- The full step-by-step execution of gcd(252,105) (Blueprint Example 1), each division labeled explicitly in a = bq + r form.
- The explicit common-divisor-set comparison for (252,105) versus (105,42) (Blueprint Example 2), both yielding {1,3,7,21}, directly demonstrating the divisor-preservation identity, targeting MC-3.
- The gcd(48,18) computation carried through to a genuine remainder of 0, contrasted against stopping early at a "small-looking" intermediate remainder (Blueprint Example 3), targeting MC-1.

## Discovery Questions
1. "Is the remainder small, or is it exactly zero — and how do you know for certain?"
2. "When you replace (a,b) with the next pair, which number comes first — the remainder, or the previous divisor?"
3. "Why do (a,b) and (b, a mod b) always share the exact same set of common divisors?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (the algorithm procedure via the measuring-stick analogy, then the symbolic step-by-step execution) → TA-A02 (why the algorithm works via the shared-divisor-set argument; the stopping-condition/efficiency contrast) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the measuring-stick repeated-leftover process (Blueprint TA-A01).
- **DO: Worked Example** — the full gcd(252,105) computation, every step labeled (Blueprint Example 1).
- **TEST-THINKING: Error Analysis** — the common-divisor-set comparison verifying the identity (Blueprint Example 2), targeting MC-3.
- **TEST-THINKING: Prediction** — before finalizing an answer, verify the stopping remainder is exactly 0, not merely small (targeting MC-1).

## Voice Teaching Notes
At each step, ask "is that remainder exactly zero, or does it just look small?" as a standing, separate verbal check before accepting any GCD answer — this habit, directly modeled on the Blueprint's own stopping-condition emphasis, is the single highest-leverage move against MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A03 — the RSA/cryptography efficiency scenario, including part (b)'s direct confrontation of the "stop at a small remainder" shortcut's real risk.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, regress to requiring the student to write out the full division statement (a = bq + r) explicitly for every single step, with the remainder circled, before allowing any judgment about whether to stop, until the exactly-zero verification habit becomes automatic.

## Memory Hooks
- "Small isn't the stopping rule — exactly zero is."
- "The next pair is (divisor, remainder), in that order — never swapped."
- "Every step keeps the same common divisors — that's why the last nonzero value is the true GCD."

## Transfer Connections
- `math.nt.extended-euclidean-algorithm` (unlocks) tracks coefficients alongside this algorithm's same remainder-replacement steps.
- `math.nt.bezout-identity` (unlocks) is proven using exactly this algorithm's mechanics, run in reverse.

## Cross-Subject Connections
- Computer science: the Euclidean Algorithm is among the oldest algorithms still in active use, foundational to cryptographic key generation and any system requiring fast GCD computation on large numbers.

## Blueprint References
`docs/curriculum/blueprints/math.nt.euclidean-algorithm.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3.
