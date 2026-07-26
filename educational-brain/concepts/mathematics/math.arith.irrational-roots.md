# math.arith.irrational-roots

## Identity
- **KG ID**: `math.arith.irrational-roots`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.square-roots`, `math.found.irrational-numbers`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.irrational-roots.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will recognize that the square root of a non-perfect-square positive integer (e.g., √2, √3, √5) is irrational — a genuine, provable mathematical fact, not merely an unfound pattern — understand that this is distinct from a decimal approximation of that root, and correctly distinguish which integer square roots are rational (perfect squares only) from which are irrational (every other positive integer).

## Core Understanding
Building on `math.arith.square-roots`'s computational definition and `math.found.irrational-numbers`'s general category, this concept makes a specific, provable claim: for any positive integer n that is NOT a perfect square, √n is irrational — it cannot be written as a ratio of two integers, and its decimal expansion never terminates or repeats, no matter how many digits are computed. This is not an open question or a pattern that merely hasn't been found yet — it is a mathematical certainty, provable (per the KG's own description) using the uniqueness of prime factorization: if √n were rational, expressible as a/b in lowest terms, the prime factorizations of a² and n·b² would have to match, but the exponents of each prime in a perfect square are always even, while n's own prime factorization (having at least one prime to an odd power, since n isn't a perfect square) makes this impossible. A decimal approximation like 1.41421356… for √2 is genuinely just that — an approximation, however many digits are shown — never the exact value, which cannot be fully written as a terminating or repeating decimal at all.

## Mental Models
1. **The provable-certainty model**: √n's irrationality (for non-perfect-square n) is a settled mathematical FACT with a genuine proof, not a "no one has found the pattern yet" open question — no amount of computed decimal digits will ever reveal a repeating or terminating pattern, because none exists.
2. **The perfect-square-exception model**: MOST integer square roots are irrational; the perfect squares (1, 4, 9, 16, 25, …) are the specific, limited exception where the square root happens to be a whole number (and hence rational) — irrationality is the general rule for integer square roots, not the special case.
3. **The approximation-vs-exact-value model**: a decimal like 1.41421356… is a truncated APPROXIMATION of √2, useful for calculation, but it is never the EXACT value — the true value of √2 cannot be fully captured by any finite (or even infinite repeating) decimal.

## Why Students Fail
The dominant failure is treating a computed decimal approximation as if it WERE the exact value of an irrational square root, rather than understanding it as a truncated stand-in for a number that can never be fully written in decimal form. A second, more subtle failure is doubting that irrationality is a genuinely PROVEN fact, instead treating it as a claim that simply hasn't been disproven yet ("maybe the pattern just hasn't been found with enough decimal places") — a serious misunderstanding of what mathematical proof establishes. A third failure is overgeneralizing that EVERY square root of an integer is irrational, forgetting that perfect squares (whose square roots are integers, and therefore rational) are the explicit exception this concept is built around.

## Misconceptions
- **MC-1 — DECIMAL-APPROXIMATION-TREATED-AS-EXACT-VALUE** (FOUNDATIONAL)
  - **Statement**: The student treats a computed decimal approximation of an irrational square root (e.g., 1.41421356… for √2) as though it were the exact, complete value, rather than recognizing it as a truncated stand-in for a number with no terminating or repeating decimal representation.
  - **Birth type**: Type 1, overgeneralization — nearly all of a student's prior decimal experience comes from rational numbers, where writing enough digits eventually captures the exact value (or reveals an exact repeating block), and this experience is overgeneralized to irrational numbers, where no finite or repeating decimal ever equals the true value.
  - **Diagnostic probe**: Ask the student whether 1.41421356 IS √2 or merely represents it approximately; MC-1 shows as treating the decimal as exactly equal, rather than as a rounded stand-in.
  - **Repair approach**: Ground the approximation-vs-exact-value model (Mental Model 3) by showing that adding more decimal digits to 1.41421356… always changes the value slightly (it never "locks in" or repeats), directly contrasting this against a genuine rational decimal like 0.3333… (which DOES have an exactly repeating, fully-specified pattern).

- **MC-2 — IRRATIONALITY-DOUBTED-AS-PATTERN-NOT-YET-FOUND**
  - **Statement**: The student believes that √2's decimal expansion might eventually terminate or start repeating if computed to enough digits, treating irrationality as an open question rather than a proven fact.
  - **Birth type**: Type 2, perceptual intuition — a very long, seemingly patternless string of digits perceptually "feels like" it could just be a very long, not-yet-discovered repeating pattern, rather than a mathematically certain, permanently non-repeating expansion — a well-documented and deep-seated intuition in mathematics education.
  - **Diagnostic probe**: Ask the student directly: "if we computed √2 to a trillion decimal digits, could the digits eventually start repeating?" MC-2 shows as "maybe, we just haven't checked far enough" rather than a confident "no, this has been proven impossible."
  - **Repair approach**: Introduce the provable-certainty model (Mental Model 1) explicitly, citing the KG's own noted proof strategy (uniqueness of prime factorization: a perfect square's prime factorization always has every exponent even, but a non-perfect-square integer's factorization has at least one odd exponent, making an exact rational square root impossible) at an appropriate level of abstraction — the point being that this is a genuine PROOF, settling the question permanently, not empirical pattern-searching.

- **MC-3 — ALL-INTEGER-SQUARE-ROOTS-ASSUMED-IRRATIONAL**
  - **Statement**: The student believes every square root of a positive integer is irrational, forgetting that perfect squares (1, 4, 9, 16, 25, …) have whole-number, and therefore rational, square roots.
  - **Birth type**: Type 1, overgeneralization — having just learned that MOST integer square roots are irrational, the student overgeneralizes this to ALL integer square roots, losing track of the perfect-square exception already established in `math.arith.square-roots`.
  - **Diagnostic probe**: Ask the student whether √16 is rational or irrational; MC-3 shows as "irrational" (incorrectly generalizing from the surrounding non-perfect-square examples) rather than correctly identifying 16 as a perfect square with rational square root 4.
  - **Repair approach**: Reinforce the perfect-square-exception model (Mental Model 2) with a side-by-side sorting exercise — a mixed list of integers, sorted into "perfect square (rational root)" and "not a perfect square (irrational root)" categories — making the exception explicit and checkable rather than assumed away.

## Analogies
- **Never-ending, never-repeating hallway analogy**: an irrational square root's decimal expansion is like a hallway that goes on forever without ever repeating its pattern of doors — no matter how far you walk (how many digits you compute), you never reach a point where the pattern starts cycling, unlike a rational decimal's hallway, which is guaranteed to eventually repeat.

## Demonstrations
- Side-by-side decimal expansions of a genuinely repeating rational decimal (e.g., 1/3 = 0.333…) and a truncated irrational approximation (√2 ≈ 1.41421356…), highlighting that only the first has an exact, fully-specified repeating pattern (targeting MC-1 and MC-2).
- A sorting activity: a mixed list of integers (4, 7, 9, 12, 16, 20, 25, …) sorted into "perfect square, rational root" versus "not a perfect square, irrational root" (targeting MC-3).

## Discovery Questions
1. "Is 1.41421356 the EXACT value of √2, or just a useful approximation of it?"
2. "If we computed √2 to a trillion decimal places, could the digits ever start repeating? How do we know?"
3. "Is every square root of a whole number irrational — or are there exceptions?"

## Teaching Sequence
1. Confirm `math.arith.square-roots` and `math.found.irrational-numbers` are solid.
2. Introduce the perfect-square-exception model (Mental Model 2) first, re-anchoring which integer square roots ARE rational (targeting MC-3 proactively).
3. Introduce the approximation-vs-exact-value model (Mental Model 3), contrasting a genuinely repeating rational decimal against a truncated irrational approximation (targeting MC-1).
4. Introduce the provable-certainty model (Mental Model 1), citing the prime-factorization-based proof strategy at an appropriate level of abstraction (targeting MC-2).
5. Practice mixed identification: given an integer, determine whether its square root is rational or irrational, and if irrational, correctly treat any decimal representation as an approximation only.

## Tutor Actions
- **ORGANIZE: Matching** — sort integers into "perfect square" versus "not a perfect square" categories, targeting MC-3.
- **SHOW: Demonstration** — the side-by-side repeating-rational vs. truncated-irrational decimal comparison, targeting MC-1.
- **TELL: Explanation** — the prime-factorization-based proof strategy at an appropriate conceptual level, targeting MC-2.
- **TEST-THINKING: Prediction** — predict whether a given integer's square root is rational or irrational before checking.

## Voice Teaching Notes
When discussing a decimal approximation of an irrational root, consistently use language like "approximately" or "rounded to" rather than stating the decimal as if it were the exact value — this small, consistent phrasing habit directly reinforces the approximation-vs-exact-value model and works against MC-1 in ordinary conversation.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a scenario requiring the student to (a) identify whether a given integer's square root is rational or irrational, (b) explain why a decimal approximation is not the exact value if irrational, and (c) state, at a conceptual level, why this is a proven fact rather than an open question.
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one perfect-square item (targeting MC-3) and one item requiring the student to distinguish an approximation from an exact value (targeting MC-1).

## Tutor Recovery Strategy
If MC-2 persists, regress to a concrete, hands-on demonstration of long division applied to a genuine repeating rational decimal (showing exactly how and why the repeat happens, tied to the finite number of possible remainders), contrasted against the impossibility of such a finite remainder cycle ever emerging for an irrational root, before returning to the abstract proof statement.

## Memory Hooks
- "A decimal for an irrational number is always a stand-in, never the whole truth."
- "Irrational isn't 'unsolved' — it's proven, permanently, no exceptions."
- "Perfect squares are the exception — their roots are whole numbers, and therefore rational."

## Transfer Connections
- `math.found.irrational-numbers` (prerequisite) supplies the general category this concept specializes; this concept is a concrete, checkable instance of that broader category.
- Proof by contradiction (a common technique in `math.found`'s proof-family concepts) is the standard proof strategy underlying this concept's own irrationality claim.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; irrational roots are a pure mathematics topic with foundational value for later real-analysis and algebra concepts.

## Blueprint References
None — no Blueprint exists for `math.arith.irrational-roots` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time. This is the third of `math.arith`'s final 3 concepts to be authored; the remaining 2 (`fraction-simplification`, `fraction-addition`) remain blocked on `math.nt.gcd`/`math.nt.lcm`, not yet authored.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 9.
