# math.arith.square-roots

## Identity
- **KG ID**: `math.arith.square-roots`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.square-numbers`
- **Unlocks**: `math.alg.radicals`, `math.geom.pythagorean-theorem`
- **Cross-links**: `math.alg.radicals`, `math.geom.pythagorean-theorem` — both confirmed NOT yet authored (no Blueprint for either, verified via directory listing) — P76_mode = independence, per the Blueprint's own Component 7 finding.
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.arith.square-roots.md` (reused by reference throughout this entry).

## Learning Objective
The student will define √x as the unique nonnegative number y such that y² = x, compute exact square roots of perfect squares from memory, correctly distinguish √x (one answer) from "solve y² = x" (two answers), estimate the square root of a non-perfect-square by bounding it between consecutive integers, and correctly extend the root concept to n-th roots, handling negative radicands correctly for odd-index roots.

## Core Understanding
Per the Blueprint's Component 3: √x is defined as THE unique NONNEGATIVE number y satisfying y² = x — not "a number that squares to x," of which there are generally two (y and −y). This distinction matters because √ is a FUNCTION (one output per input, by mathematical convention choosing the nonnegative root), while "solve y² = x" is a different task asking for every value satisfying the equation. For non-perfect squares, √x can be bounded between consecutive integers using known perfect squares (e.g., 16 < 20 < 25 gives 4 < √20 < 5). Extending to n-th roots reveals a genuine parity distinction: even-index roots (like square roots) require a nonnegative radicand and give a nonnegative result; odd-index roots (like cube roots) accept ANY real radicand, since an odd power preserves sign — √[3]{−8} = −2 is perfectly well-defined, with no sign ambiguity to resolve, unlike √−9, which is undefined over the reals.

## Mental Models
1. **The square-side-length model** (Blueprint TA-A01): √x is "the side length of a square whose area is x" — grounding the definition in `math.arith.square-numbers`'s own area interpretation, and making nonnegativity obvious (a side length can't be negative).
2. **The one-function-vs-two-solutions model**: √x asks a FUNCTION question (one output, by definition nonnegative); "solve y² = x" asks an EQUATION question (all values satisfying it, generally two) — these are genuinely different tasks that happen to share the same underlying relationship.
3. **The parity-governs-sign-restriction model**: whether a root's radicand can be negative depends entirely on whether the root's index is even or odd — even-index roots need a nonnegative radicand (over the reals); odd-index roots accept any real radicand, with a uniquely determined sign-matching result.

## Why Students Fail
Per the Blueprint's Component 6: the foundational failure is conflating the √ symbol (which names exactly one, nonnegative, number) with the full solution set of y² = x (which generally has two members) — a student exhibiting this either believes 9 has "one square root" without qualification and then contradicts themselves when asked to solve y² = 9, or vice versa. A second failure is over-generalizing that any root of a negative number is undefined, missing that this restriction is specific to EVEN-index roots and does not apply to odd-index roots like cube roots. A third, more minor failure is treating an irrational square root's bounding estimate as if it must round to one of the two bounding integers, rather than understanding it as a genuine non-integer real number that merely lies strictly between them.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — SQRT-SYMBOL-CONFLATED-WITH-ALL-ROOTS** (FOUNDATIONAL)
  - **Blueprint description**: believing √x itself denotes both +y and −y (rather than only the nonnegative root), conflating "compute √x" with "solve y² = x."
  - **Birth type**: Type 6, analogy overextension — students correctly learn that y² = x has two solutions, and overextend that fact by analogy onto the √ symbol itself, not recognizing that √ was specifically DEFINED as a single-valued function selecting only the nonnegative root.
  - **Repair approach**: Blueprint Repair Action B01 — re-anchored via Teaching Action A02's Contrast 1 (Compute √36 = 6, one number, vs. Solve y² = 36 for all y = ±6, two numbers), explicitly naming √ as a function.

- **MC-2 — NEGATIVE-RADICAND-ALWAYS-UNDEFINED** (see Blueprint Component 6)
  - **Blueprint description**: believing every root of a negative number is undefined, failing to distinguish even-index roots (genuinely undefined over the reals for negative radicands) from odd-index roots (well-defined for any real radicand).
  - **Birth type**: Type 1, overgeneralization — the correct, specific fact "square roots of negative numbers are undefined" gets overgeneralized to "ALL roots of negative numbers are undefined," without checking whether the root's index is even or odd.
  - **Repair approach**: Blueprint Repair Action B02 — re-derived from odd-power sign preservation, contrasting √[3]{−27} = −3 (well-defined) against √−9 (undefined), per Teaching Action A02's Contrast 2.

- **MC-3 — ESTIMATION-ROUNDS-TO-NEAREST-INTEGER-ONLY** (see Blueprint Component 6)
  - **Blueprint description**: believing an irrational square root must be reported as one of the two bounding integers (rounding), rather than understanding it as a genuine non-integer real number that merely lies between them.
  - **Birth type**: Type 5, instruction-induced — the bounding-estimation procedure (locate between consecutive integers) can be mistaught or misheard as "round to the nearer one," collapsing a genuine irrational value into an integer approximation treated as exact.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchored on the square-side-length model, showing a square of area 20 has a genuine, single, non-integer side length strictly between the side lengths of the area-16 and area-25 squares.

## Analogies
- **Picture-frame-mat analogy** (the Blueprint's own P76 transfer probe): a framer needing a square mat of a specific area must find the side length via square-root estimation when the area isn't a perfect square, grounding the bounding-estimate skill in a genuine practical need.

## Demonstrations
- Building a square of area 16 (or 25, or 9) from unit squares and asking "what's the side length?" before introducing the √ symbol (Blueprint TA-A01).
- The side-by-side contrast of "compute √36" (one answer) versus "solve y² = 36" (two answers) (Blueprint TA-A02, Contrast 1), directly targeting MC-1.
- The side-by-side contrast of √−9 (undefined) versus √[3]{−8} = −2 (well-defined), naming the even/odd-index rule explicitly (Blueprint TA-A02, Contrast 2), targeting MC-2.

## Discovery Questions
1. "Does 9 have one square root or two — and does your answer change depending on whether I ask for √9 or ask you to solve y² = 9?"
2. "Is √−9 defined? What about the cube root of −8 — is that different, and why?"
3. "Is √20 exactly equal to 4, exactly equal to 5, or something else entirely?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (square-root as the inverse of squaring, grounded in the area model, generalizing to estimation for non-perfect squares) → TA-A02 (√-notation vs. "solve for y" contrast; extension to n-th roots via the even/odd-index parity rule) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — building a square of a given area and identifying its side length (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the √36-vs-solve-y²=36 contrast (Blueprint TA-A02, Contrast 1).
- **DO: Worked Example** — the even/odd-index root contrast, √−9 vs. √[3]{−8} (Blueprint TA-A02, Contrast 2).
- **TEST-THINKING: Prediction** — before computing, estimate which two consecutive integers a non-perfect-square root falls between.

## Voice Teaching Notes
When asked "what is √x," always answer with exactly one number, and when asked to "solve y² = x," always answer with the full solution set — modeling this distinction consistently in every spoken answer is the single highest-leverage move against MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — both cross-link targets confirmed unauthored)**: reused verbatim from the Blueprint's Component 5 A03 — the picture-frame-mat estimation scenario (area 200 sq cm) paired with the odd-root physics-formula scenario, deliberately two independent scenarios since neither cross-link target has an authored Blueprint yet.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the function-vs-equation contrast, regress to asking the two questions ("what is √9?" and "solve y² = 9") as an explicit paired drill for several perfect squares in a row, until the single-answer-vs-two-answer distinction becomes automatic, before introducing non-perfect-square estimation.

## Memory Hooks
- "√ gives you ONE number — the nonnegative one. 'Solve y²=x' gives you up to two."
- "Even roots need a nonnegative radicand. Odd roots don't care about sign at all."

## Transfer Connections
- `math.alg.radicals` (unlocks) generalizes radical notation and simplification directly from this concept's √ definition and n-th-root extension.
- `math.geom.pythagorean-theorem` (unlocks) requires taking a square root of a sum/difference of squares to compute a hypotenuse or leg length.

## Cross-Subject Connections
- Physics: formulas involving odd-index roots of signed quantities (as in the Blueprint's own P76 transfer probe) rely directly on this concept's even/odd-index parity rule.

## Blueprint References
`docs/curriculum/blueprints/math.arith.square-roots.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (both `math.alg.radicals` and `math.geom.pythagorean-theorem` unauthored) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 8.
