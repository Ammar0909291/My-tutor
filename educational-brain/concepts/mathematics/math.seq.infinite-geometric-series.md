# math.seq.infinite-geometric-series

## Identity
- **KG id**: `math.seq.infinite-geometric-series`
- **Domain**: math.seq
- **Requires**: `math.seq.geometric-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Derive the infinite geometric series sum formula $S_\infty = \dfrac{a}{1-r}$ as the LIMIT of the
finite partial-sum formula as the number of terms grows without bound, apply it only when the
convergence condition $|r| < 1$ genuinely holds, and use it to convert recurring decimals to
fractions and to solve real-world "infinite process, finite total" problems.

## Core Understanding
`math.seq.geometric-series` established the finite sum formula
$S_n = a\dfrac{1 - r^n}{1 - r}$ for the sum of the first $n$ terms of a geometric series. The
INFINITE geometric series asks what happens to this sum as $n \to \infty$ — that is, as more and
more terms are added forever.

The answer hinges entirely on what happens to $r^n$ as $n$ grows. If $|r| < 1$ (the common ratio's
magnitude is strictly less than 1), then $r^n \to 0$ as $n \to \infty$ — each successive term is
smaller than the last by a fixed proportion, and the terms shrink toward zero fast enough that
their infinite sum converges to a single finite number. Substituting $r^n \to 0$ into the finite
formula gives the infinite sum formula directly: $S_\infty = a\dfrac{1 - 0}{1 - r} = \dfrac{a}{1-r}$.

This convergence condition, $|r| < 1$, is not optional — it is the entire reason the formula works,
and it must be checked BEFORE the formula is applied, not after. If $|r| \geq 1$, the series
DIVERGES and has no finite sum: when $r = 1$, every term equals $a$, so $S_n = na \to \infty$; when
$r > 1$, the terms grow without bound; and when $r = -1$, the partial sums oscillate forever between
$a$ and $0$ without settling on any single value. Applying the formula $a/(1-r)$ blindly to such a
case produces a number that is not the sum of anything — it is an algebraic expression evaluated
outside the domain where it represents a genuine limit.

Two important applications follow directly. First, every recurring decimal is exactly an infinite
geometric series in disguise — $0.333\ldots = 0.3 + 0.03 + 0.003 + \cdots$ is a geometric series
with $a = 0.3$ and $r = 0.1$, so $S_\infty = \dfrac{0.3}{1-0.1} = \dfrac{0.3}{0.9} = \dfrac13$,
converting the recurring decimal to its exact fractional value. Second, physical situations
involving an infinitely repeated process with a fixed shrinking ratio — a bouncing ball losing a
fixed fraction of height on each bounce, for instance — have their total (distance, area, etc.)
computable as an infinite geometric series precisely because the geometric structure (each stage a
fixed multiple of the one before) is present in both the mathematical and the physical situation.

## Mental Models
- **"The formula is a LIMIT — it only exists because $r^n$ vanishes."**
- **"Check $|r| < 1$ first, always — the formula is meaningless without it."**
- **"A recurring decimal is a geometric series wearing different clothes."**

## Why Students Fail
All three misconceptions below independently classify as Type 1 (overgeneralization): a habit
correctly trained on finite series or on ordinary limit language is carried over, unmodified, into
the infinite-series context where the convergence condition changes what is true. The Blueprint
carries no birth-type column, so each classification below is this entry's own independent
analysis.

## Misconceptions

### MC-1: FORMULA-WITHOUT-CONVERGENCE-CHECK
- **Surface form**: applying $S_\infty = a/(1-r)$ to a series with $|r| \geq 1$ — for example,
  computing $\sum_{n=0}^{\infty} 3^n$ (where $a=1$, $r=3$) as $\dfrac{1}{1-3} = -\dfrac12$, a
  negative number reported as the "sum" of a series of ever-growing positive terms.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: once the formula is memorized as a tool that
  "always works" for geometric series (reinforced by the finite-sum formula's own unconditional
  applicability), the convergence condition is treated as an optional footnote rather than the
  formula's own precondition for meaning anything at all.
- **Repair**: substitute the resulting "sum" back into a partial-sum computation for the same
  series and show the actual partial sums growing without bound, in direct contradiction to the
  finite value the formula produced — making the absurdity of the result concrete.

### MC-2: TERM-LIMIT-AS-SERIES-SUM
- **Surface form**: confusing $\lim_{n\to\infty} r^n = 0$ (a statement about individual TERMS
  vanishing) with the claim that the SERIES itself sums to $0$, or believing convergence of the
  terms to zero is the same fact as convergence of the sum to a finite value.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: the word "converges" is used both for a sequence of
  terms shrinking to a limit and for a series' partial sums approaching a limit, and the surface
  similarity in language is overgeneralized into treating the two convergence claims as
  interchangeable.
- **Repair**: explicitly separate the two limits side by side — $\lim r^n = 0$ (the terms vanish)
  versus $\lim S_n = a/(1-r)$ (the accumulated total settles at a nonzero finite value) — showing
  both are true simultaneously and neither implies the other's numerical value.

### MC-3: PARTIAL-SUM-IS-INFINITE-SUM
- **Surface form**: computing a specific finite partial sum $S_n$ for some particular $n$ (say,
  $S_{10}$) and reporting it as "the" infinite sum, rather than recognizing that only the LIMIT of
  $S_n$ as $n \to \infty$ qualifies.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: the finite-series habit of "compute $S_n$ for the
  given $n$ and that is the answer" is overgeneralized into the infinite case, where no finite $n$
  ever equals the infinite sum — only the limiting behavior does.
- **Repair**: compute successive partial sums ($S_5$, $S_{10}$, $S_{20}$) for a convergent series
  and show them getting closer and closer to, but never exactly equal to, the value $a/(1-r)$ —
  making "the infinite sum is a limit, not any single partial sum" a directly observed pattern.

## Analogies
- **"Zeno's approach to a wall"**: each step covers a fixed fraction of the remaining distance,
  and though infinitely many steps are taken, the total distance covered approaches — and in the
  limit equals — a finite value, exactly mirroring $S_\infty$.
- **Anti-analogy**: an infinite geometric series is NOT "adding infinitely many things, so the
  total must be infinite" — this intuition, true for a series whose terms do not shrink fast
  enough (or at all), is false exactly when $|r| < 1$, precisely because the terms shrink fast
  enough to keep the total bounded.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: attempt the formula on a divergent series ($r=3$), obtain a
  negative "sum," and cross-check against genuinely computed partial sums that are large and
  growing — a direct contradiction exposing the error.
- **Demonstration 2 (targets MC-2)**: for a specific convergent series, compute both
  $\lim_{n\to\infty} r^n$ (which is $0$) and $\lim_{n\to\infty} S_n$ (which is the nonzero
  $a/(1-r)$) side by side.
- **Demonstration 3 (targets MC-3)**: compute $S_5, S_{10}, S_{20}$ for a convergent series and
  plot them approaching, but never reaching, the formula's value.

## Discovery Questions
1. "What happens to the finite-sum formula $S_n = a\dfrac{1-r^n}{1-r}$ as $n$ grows very large,
   if $|r| < 1$? What if $|r| > 1$?"
2. "If every term of a series is positive and none of them are zero, could the infinite sum still
   be a finite number? What would have to be true about the terms for that to happen?"
3. "Is $0.999\ldots$ equal to $1$, or just very close to it? What does treating it as an infinite
   geometric series tell you?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.geometric-series`'s finite-sum formula, posing the question
   "what happens as $n \to \infty$?"
2. **Derivation**: substitute $r^n \to 0$ (for $|r|<1$) into the finite formula to obtain
   $S_\infty = a/(1-r)$, making the derivation's dependence on the convergence condition explicit
   from the start.
3. **Conflict evidence**: the three demonstrations above, each isolating one misconception.
4. **Application**: convert a recurring decimal to a fraction using the formula, and solve a
   bouncing-ball-style total-distance problem.
5. **Mastery gate**: require the learner to check $|r|<1$ before applying the formula on a mixed
   set of convergent and divergent series, and to correctly convert at least one recurring decimal.

## Tutor Actions
- Before accepting any application of $S_\infty = a/(1-r)$, ask the learner to state the value of
  $r$ and confirm $|r| < 1$ — never let the formula be applied silently.
- When a learner reports a specific partial sum as "the" infinite sum, ask what happens to that sum
  as more terms are added, to surface the limit concept.

## Voice Teaching Notes
- Introduce the formula by DERIVING it live from the finite-sum formula in front of the learner,
  narrating the $r^n \to 0$ substitution aloud, so the convergence condition is heard as the
  formula's origin, not an afterthought.
- When a learner applies the formula without checking $|r|<1$, ask "what is $r$ here, and is its
  size less than 1?" before evaluating whether their answer is otherwise correct.

## Assessment Signals
- **Rung 1 (recognition)**: learner states the convergence condition $|r|<1$ before being asked to
  apply the formula.
- **Rung 2 (application)**: learner correctly computes $S_\infty$ for a convergent series and
  correctly identifies a divergent series as having no finite sum.
- **Rung 3 (transfer)**: learner correctly converts a recurring decimal to an exact fraction using
  the infinite geometric series formula, and correctly solves a real-world "infinite process, finite
  total" problem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the partial-sum cross-check demonstration on the specific divergent series
  the learner attempted.
- If MC-2 recurs, re-present the two limits side by side with the learner's own numbers.
- If MC-3 recurs, compute additional partial sums with the learner and have them state, in their
  own words, why no single partial sum can equal the infinite sum.

## Memory Hooks
- "Check $|r|<1$ first — always."
- "The terms vanish; the sum doesn't — two different limits."
- "No partial sum IS the infinite sum; it only gets closer."

## Transfer Connections
- `math.seq.geometric-series` (already authored): supplies the finite-sum formula this concept's
  entire derivation depends on.

## Cross-Subject Connections
- None formal. The Blueprint's own transfer probe (a bouncing ball dropped from 4 meters, each
  bounce reaching $3/4$ of the previous height, total distance traveled $= 28$ meters) illustrates
  a physical application but introduces no cross-subject KG dependency.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.infinite-geometric-series.md`, reused by
  reference for its derivation of $S_\infty = a/(1-r)$, its recurring-decimal worked examples
  ($0.333\ldots = 1/3$ and $0.142857\ldots = 1/7$), its inverse-problem examples (finding $r$ or
  $a$ given $S_\infty$), the bouncing-ball transfer probe, and its three-misconception registry
  (independently birth-type-classified above, since the Blueprint carries no birth-type column).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks`, `cross_links`, `difficulty`,
  `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly between the Blueprint and
  the live KG.

## Version History
- 2026-09-13 (Batch 62): authored. Unblocked by `math.seq.geometric-series` (Batch 58). Companion
  batch concepts: `math.calc.partial-fractions`, `math.trig.trig-equations`,
  `math.seq.recursive-sequences`. `math.seq` moves from 10/21 toward 12/21 this batch (two
  math.seq concepts authored).
