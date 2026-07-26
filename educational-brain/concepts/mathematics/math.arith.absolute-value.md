# math.arith.absolute-value

## Identity
- **KG ID**: `math.arith.absolute-value`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.negative-numbers`, `math.arith.number-line`
- **Unlocks**: `math.alg.absolute-value-equations`
- **Cross-links**: `math.alg.absolute-value-equations` (confirmed NOT yet authored, no Blueprint), `math.real.metric-space` (confirmed AUTHORED Blueprint) — Tier 1 cross-link probe engages `math.real.metric-space`.
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.arith.absolute-value.md` (reused by reference throughout this entry).

## Learning Objective
The student will apply the piecewise definition of absolute value (|x| = x if x ≥ 0, |x| = −x if x < 0) to numbers and to variable expressions, recognize that |x| is always nonnegative, and compute |a − b| as the distance between two points on the number line.

## Core Understanding
Per the Blueprint's Component 3: the piecewise definition's negative case is genuine arithmetic negation, not cosmetic sign-removal — for x = −5, |x| = −(−5) = 5 is the actual operation of negating −5, a distinction that becomes essential once the input is a variable expression like x − 3 rather than a signed numeral (there is no "minus character" to delete from an expression; the negation must be genuinely computed). |x| measures distance from zero and is therefore always nonnegative, generalizing directly to |a − b| as the distance between any two points a and b, with |x| itself the special case b = 0.

## Mental Models
1. **The distance-from-zero model**: |x| is literally how far x sits from 0 on the number line, never negative because distance itself is never negative.
2. **The negation-not-deletion model**: computing the negative case of |x| means applying the real arithmetic negation operation to the whole expression, not deleting a minus sign.
3. **The unified-distance model**: "distance from zero" and "distance between two points" are the same formula (|a−b|), with distance-from-zero simply the case b = 0 — not two separate ideas.

## Why Students Fail
Failure clusters around treating absolute value as a symbol-manipulation trick (delete the minus sign) rather than a genuine operation, which works by coincidence on bare negative numerals but breaks the moment the input is an algebraic expression whose sign isn't visually obvious. A second failure is not internalizing that |x| can never be negative as an absolute, no-exceptions fact, and a third is treating the number-line "distance from zero" idea and the two-point "distance between a and b" idea as unrelated formulas to memorize separately.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — ABSOLUTE-VALUE-AS-SIGN-REMOVAL** (FOUNDATIONAL)
  - **Blueprint description**: believing the negative case of absolute value means cosmetically "removing the minus sign" rather than applying the genuine arithmetic negation operation, an error that becomes consequential once the input is a variable expression.
  - **Birth type**: Type 4, notation-induced — the visual similarity between "delete a minus character" and "apply negation" makes the two operations indistinguishable for bare negative numerals, and the notation itself offers no cue that a genuine operation (not a text edit) is required.
  - **Repair approach**: Blueprint Teaching Action A01 (Primitive P11, Representation Shift) — work Example 1's algebraic-expression case (|x−3| at x=1) explicitly, re-anchoring on "the negative case requires genuine negation of the whole expression."

- **MC-2 — ABSOLUTE-VALUE-ASSUMED-SOMETIMES-NEGATIVE** (High)
  - **Blueprint description**: believing |x| could come out negative for some input, missing that it is always nonnegative since it measures distance.
  - **Birth type**: Type 1, overgeneralization — treating absolute value as an ordinary "apply a sign to the input" operation rather than recognizing its output range is categorically restricted.
  - **Repair approach**: Blueprint Teaching Action A02 (Primitive P28, Conflict Evidence) — direct evidence that no input, however negative, produces a negative |x|.

- **MC-3 — DISTANCE-FROM-ZERO-TREATED-AS-SEPARATE-FROM-DISTANCE-BETWEEN-POINTS** (Moderate)
  - **Blueprint description**: treating "distance from zero" and "distance between two points" as requiring fundamentally different formulas, missing that |x| = |x−0| is simply the special case b = 0 of |a−b|.
  - **Birth type**: Type 6, analogy overextension — |x| is taught first as a single-input operation, and students fail to extend that same formula to the two-input case without an explicit bridging demonstration.
  - **Repair approach**: Blueprint Teaching Action A03 (Primitive P06, Contrast Pair) — direct demonstration that |x| = |x−0|.

## Analogies
- **Distance-walked analogy**: the distance you walk from home to a store is never negative regardless of which direction you walk — |x| is exactly this idea applied to numbers on a line.
- **Non-analogy warning**: avoid framing the negative case as "flip the sign," which can reinforce MC-1's sign-removal framing; instead frame it as "apply the negation operation."

## Demonstrations
- Number-line point-marking: mark x = −5 and 0, physically measure the distance between them, connecting it to |−5| = 5.
- Side-by-side evaluation of |x−3| at multiple values of x (some making x−3 positive, some negative), making the variable-expression case (MC-1's target) concrete.

## Discovery Questions
1. "For |x−3|, can you just erase a minus sign from x−3 to get the answer — why or why not?"
2. "Is there any number x for which |x| comes out negative? How do you know?"
3. "Is 'distance from zero' really a different idea from 'distance between two points,' or is it the same formula in disguise?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (piecewise definition, genuine negation, numeric + algebraic-expression example) → TA-A02 (always-nonnegative evidence) → TA-A03 (distance-from-zero as the special case of distance-between-points) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the piecewise definition, emphasizing genuine negation (Blueprint TA-A01).
- **SHOW: Demonstration** — number-line distance marking (Blueprint TA-A02/A03).
- **DO: Worked Example** — the algebraic-expression case |x−3| (Blueprint Example 1).
- **TEST-THINKING: Prediction** — predict the sign of |x| before computing, for several inputs.

## Voice Teaching Notes
When discussing the negative case of |x|, say "apply the negation" rather than "flip the sign" or "remove the minus" — the phrasing itself is a direct lever against MC-1's sign-removal framing.

## Assessment Signals
- **P76 (transfer probe, Tier 1 cross-link mode, engaging `math.real.metric-space`)**: reused verbatim from the Blueprint's Component 5 A04 — the temperature-readings-vs-temperature-curves scenario connecting |a−b| to the sup-norm metric $d_{\sup}(f,g)=\max_x|f(x)-g(x)|$.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the algebraic-expression example, regress to purely numeric bare-negative examples (|−3|, |−7|) until the negation-as-genuine-operation idea is solid on its own, before reintroducing the variable-expression case.

## Memory Hooks
- "Negate it, don't erase it."
- "Distance is never negative — no exceptions, ever."

## Transfer Connections
- `math.alg.absolute-value-equations` (unlocks) will apply this piecewise definition to solve equations.
- `math.real.metric-space` generalizes |a−b| to a full distance function (metric) over abstract spaces, including functions.

## Cross-Subject Connections
- Physics: measuring magnitude of displacement or error regardless of direction reuses the "always nonnegative distance" idea directly.

## Blueprint References
`docs/curriculum/blueprints/math.arith.absolute-value.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's cross-link verification (V-5) was independently re-confirmed via directory listing at authoring time: `math.alg.absolute-value-equations` unauthored, `math.real.metric-space` authored, consistent with the Blueprint's own finding.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
