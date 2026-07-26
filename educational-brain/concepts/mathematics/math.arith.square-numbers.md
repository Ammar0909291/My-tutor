# math.arith.square-numbers

## Identity
- **KG ID**: `math.arith.square-numbers`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.exponentiation`
- **Unlocks**: `math.arith.square-roots`
- **Cross-links**: `math.geom.area` — confirmed a Blueprint EXISTS (`docs/curriculum/blueprints/math.geom.area.md`) — Tier 1 cross-link probe engaging `math.geom.area`, per the Blueprint's own P76_mode declaration.
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.arith.square-numbers.md` (reused by reference throughout this entry).

## Learning Objective
The student will list and recognize perfect squares, correctly compute n² as n×n (never as 2n), recognize that squaring a negative integer always produces a positive perfect square, and verify whether a number is a perfect square by checking against consecutive integer squares rather than guessing from surface features like the last digit.

## Core Understanding
Per the Blueprint's Component 1: this concept studies the specific integers PRODUCED by squaring, not the squaring operation itself (already established in `math.arith.exponentiation`). The three critical, non-obvious facts are: (1) n² means n×n, an operation that coincidentally agrees with doubling (2n) only at n=2, so any FIRST example built around n=2 risks silently teaching the wrong general pattern; (2) squaring a negative integer always produces a positive result, since a negative times a negative gives a positive — (−n)² = n², the identical perfect square as its positive counterpart; (3) whether a number is a perfect square must be verified by locating it against consecutive integer squares (does some integer squared land exactly on it?), never guessed from surface features like a "typical" last digit, since matching last digits are necessary for some perfect squares but never sufficient.

## Mental Models
1. **The square-area model** (Blueprint TA-A01, Stage P): a perfect square n² is literally the area of an n×n grid of unit squares — squaring genuinely means "side length n, multiplied by itself," a direct geometric grounding that has nothing to do with doubling.
2. **The doubling-coincidence trap model**: at n=2 specifically, doubling (2×2=4) and squaring (2²=4) happen to agree — this is a one-time coincidence (2+2=2×2 is only true for the number 2), not a general pattern, and must be explicitly broken with a DIFFERENT value (e.g., n=6, where 6²=36 but 2×6=12) before it silently becomes a misconception.
3. **The bracket-between-consecutive-squares model**: to verify whether a number is a perfect square, locate it between two consecutive perfect squares (e.g., is 40 a perfect square? 6²=36, 7²=49, and 36<40<49 with no exact match, so 40 is NOT a perfect square) — this is the only reliable verification method, regardless of the number's last digit.

## Why Students Fail
Per the Blueprint's Component 1: the foundational and most common error is confusing squaring with doubling, an error silently reinforced if the very first squaring example a student sees happens to be n=2 (where both operations coincidentally agree) — the confusion becomes invisible until a different number is tried. A second failure is computing a negative integer's square as negative, missing that a negative times a negative gives a positive. A third failure is judging perfect-square status from a surface feature (the last digit) rather than genuine verification, since perfect squares' last digits ARE restricted (only 0,1,4,5,6,9 ever appear) but having one of those digits is necessary, not sufficient.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — SQUARING-MEANS-DOUBLING** (FOUNDATIONAL)
  - **Blueprint description**: student computes n² as 2n (doubling) rather than n×n (multiplying by itself).
  - **Birth type**: Type 2, perceptual intuition — reinforced by the specific coincidence that squaring and doubling agree at n=2, making the error perceptually invisible until a different number breaks the pattern.
  - **Repair approach**: Blueprint Repair Action B01 (via TA-A01's Stage C explicit check: squaring 3 gives 9, doubling gives 6 — different — establishing that n=2's agreement was a one-time coincidence, not a rule).

- **MC-2 — NEGATIVE-SQUARED-IS-NEGATIVE** (see Blueprint Component 2)
  - **Blueprint description**: student computes (−n)² as a negative number, rather than recognizing squaring a negative always yields a positive result.
  - **Birth type**: Type 1, overgeneralization — the negative sign is assumed to "carry through" any operation performed on a negative number, without applying the actual negative-times-negative-is-positive sign rule.
  - **Repair approach**: Blueprint Teaching Action A02, Contrast 1 — (−7)² computed explicitly as (−7)×(−7) = 49, the identical positive perfect square as 7² = 49.

- **MC-3 — LAST-DIGIT-DECIDES-PERFECT-SQUARE** (see Blueprint Component 2)
  - **Blueprint description**: student judges a number to be a perfect square based solely on its last digit matching a common perfect-square ending, without verifying an actual integer square root exists.
  - **Birth type**: Type 1, overgeneralization — a genuinely necessary condition (perfect squares' last digits are restricted to 0,1,4,5,6,9) is mistaken for a sufficient one.
  - **Repair approach**: Blueprint Teaching Action A02, Contrast 2 — 15 ends in 5 but falls strictly between 3²=9 and 4²=16, so it is NOT a perfect square, contrasted directly against 25 (also ending in 5, and genuinely 5²).

## Analogies
- **Square-garden-plot analogy** (the Blueprint's own P76 transfer probe): a square vegetable patch's area is literally side-length-squared, grounding "perfect square" in a real physical area rather than an abstract number fact.

## Demonstrations
- Building the perfect-square list by direct multiplication (1²=1, 2²=4, 3²=9, …), with the explicit doubling-vs-squaring check at n=3 (Blueprint TA-A01, Stage C).
- The pictorial n×n grid of unit squares showing perfect squares as literal areas (Blueprint TA-A01, Stage P).
- The consecutive-squares bracket check applied to a non-square (40, between 6²=36 and 7²=49) (Blueprint TA-A02, Contrast 2).

## Discovery Questions
1. "Is n² really the same as 2n — how would checking a number OTHER than 2 settle this?"
2. "If you square a negative number, does the negative sign survive into the answer?"
3. "Does a number's last digit alone tell you whether it's a perfect square, or do you need to check something more directly?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: A01 (building the list by direct multiplication, breaking the doubling coincidence, connecting to geometric area) → A02 (negative-integer squaring contrasted against a naive guess; a last-digit-matching non-square contrasted against a genuine perfect square) → A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the n×n unit-square grid area model (Blueprint TA-A01, Stage P).
- **TEST-THINKING: Error Analysis** — the doubling-vs-squaring contrast at a value other than 2 (Blueprint TA-A01).
- **DO: Worked Example** — negative-integer squaring, e.g., (−9)² (Blueprint TA-A02).
- **TEST-THINKING: Error Analysis** — the "reasoning, not just the conclusion" evaluation of a last-digit-based perfect-square claim (Blueprint A03, Problem 4).

## Voice Teaching Notes
When introducing squaring, deliberately choose the FIRST worked example to be a number other than 2 (e.g., 3 or 6) — per the Blueprint's own design rationale, opening with n=2 risks silently teaching "squaring means doubling" before the coincidence can be caught.

## Assessment Signals
- **P76 (transfer probe, Tier 1 cross-link mode, engaging `math.geom.area`)**: reused verbatim from the Blueprint's Component 4 A03 — the square vegetable-patch scenario (144 sq ft → side 12 ft exactly; 150 sq ft → no exact whole-number side, bracketed between 12 and 13 ft; part (c)'s distinction between a practical approximation and the mathematical fact of non-perfect-squareness).
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the n=3 contrast, regress to physically building the n×n grid for several values (3, 4, 5) and counting total unit squares directly, before returning to symbolic n² notation.

## Memory Hooks
- "Squaring means times itself, not times two — check a number besides 2 to prove it."
- "A negative times a negative is always positive — squaring a negative never stays negative."
- "Last digit is a clue, never proof — bracket between consecutive squares to be sure."

## Transfer Connections
- `math.arith.square-roots` (unlocks) directly inverts this concept's perfect-square list.
- `math.geom.area` (Tier 1 cross-link) grounds every perfect square as a literal square's area.

## Cross-Subject Connections
- Physics: area-dependent quantities (e.g., pressure, intensity following inverse-square laws) rely on the same n² computation this concept establishes.

## Blueprint References
`docs/curriculum/blueprints/math.arith.square-numbers.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.geom.area`, Tier 1, Blueprint exists) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
