# math.seq.divergence-test

## Identity
- **KG id**: `math.seq.divergence-test`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
State and prove the Divergence Test (if $\sum a_n$ converges, then $\lim a_n=0$), use it in its
contrapositive form (if $\lim a_n\ne0$, then $\sum a_n$ diverges) as a fast first-pass divergence
check, and correctly recognize that the converse is FALSE — the test is a one-directional tool
that can never prove convergence.

## Core Understanding
`math.seq.series-convergence` already introduced the Divergence Test as a corollary of the
partial-sum definition of convergence, but this concept develops it fully as a standalone tool
with an explicit proof and a precise statement of its limitation. The theorem: if $\sum a_n$
converges to $L$, then the partial sums $S_n\to L$ and $S_{n-1}\to L$, and since
$a_n=S_n-S_{n-1}$, $\lim a_n=L-L=0$. Used in its CONTRAPOSITIVE form — the way it is actually
applied in practice — if $\lim_{n\to\infty}a_n\ne0$ (or the limit does not exist), then
$\sum a_n$ **diverges**.

The two-line usage protocol is: (1) compute $\lim a_n$; (2) if the limit is nonzero or does not
exist, the series DIVERGES — done, no further test needed; if the limit is zero, the test is
**INCONCLUSIVE** and a different test (comparison, ratio, integral, etc.) is required. This
inconclusive case is the test's entire limitation: $\lim a_n=0$ is NECESSARY for convergence
(proven above), but it is NOT SUFFICIENT — a series whose terms shrink to zero may still diverge.
The harmonic series $\sum 1/n$ is the canonical, mandatory counterexample: $1/n\to0$, yet the
series diverges (proven via the grouping argument in `math.seq.harmonic-series`).

The Divergence Test's practical value is SPEED: as the cheapest possible check, it should always
be applied FIRST, before any comparison, ratio, or integral test — if it settles the question
(terms don't shrink to zero), the problem is finished in one computation. Two related confusions
must be kept separate: the limit of the individual TERMS ($\lim a_n$) is a genuinely different
sequence from the limit of the PARTIAL SUMS ($\lim S_n$) — a convergent series always has
$\lim a_n=0$, but its actual sum $\lim S_n$ is typically a nonzero number. And "the harmonic
series converges slowly" is not a meaningful description — $\sum 1/n$ either has a finite limit
(converges) or it doesn't (diverges); its partial sums genuinely grow without bound
(like $\ln n$), there is no intermediate state of "partial convergence."

## Mental Models
- **"The Divergence Test only ever proves divergence — never convergence."**
- **"$\lim a_n=0$ is necessary, never sufficient, for $\sum a_n$ to converge."**
- **"Apply this test FIRST — it's the cheapest, and it either finishes the problem or moves you
  on."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: this is the identical mechanism already documented as
  `math.seq.series-convergence`'s own MC-1 (TERMS-TO-ZERO-IMPLIES-CONVERGENT) — the reasonable-
  feeling but false generalization "if the terms shrink to zero, the total must settle down,"
  recurring here at the specific level of naming the Divergence Test as a two-directional tool.
- **MC-2 (Type 3, language contamination)**: "$\lim a_n$" and "$\lim S_n$" share the identical
  "$\lim$" notation and surrounding vocabulary, and that shared linguistic form contaminates the
  two genuinely different sequences (individual terms vs. running totals) into being treated as
  the same limit.
- **MC-3 (Type 2, perceptual intuition)**: the harmonic series' terms visibly shrink very slowly,
  and that visual impression of gradualness is overgeneralized into the perceptual sense that the
  series must be "settling down" somewhere, rather than genuinely diverging (just slowly, in
  terms of the RATE of divergence, not in terms of eventually converging).

## Misconceptions

### MC-1: DIVERGENCE-TEST-PROVES-CONVERGENCE
- **Surface form**: concluding $\sum a_n$ converges because $a_n\to0$, treating the Divergence
  Test as usable in both directions.
- **Frequency band**: Foundational — the Blueprint's own note names this the most dangerous error
  on this concept.
- **Root cause (Type 1)**: the identical mechanism as `math.seq.series-convergence`'s own MC-1,
  recurring here.
- **Repair**: re-present the harmonic series as the standing counterexample — $1/n\to0$ yet
  $\sum1/n$ diverges — proving that "terms → 0" alone settles nothing about convergence.

### MC-2: TERM-LIMIT-EQUALS-PARTIAL-SUM-LIMIT
- **Surface form**: believing $\lim a_n$ and $\lim S_n$ are the same quantity, so that if the
  terms approach 0, the partial sums must also approach 0.
- **Frequency band**: Moderate.
- **Root cause (Type 3)**: as described above.
- **Repair**: for a concrete convergent series (e.g. $\sum(1/2)^n$), compute both limits
  explicitly side by side — $\lim a_n=0$ but $\lim S_n=2$ — making the two genuinely different
  numbers a directly observed fact.

### MC-3: HARMONIC-CONVERGES-SLOWLY
- **Surface form**: describing the harmonic series as "converging very slowly" or "converging to
  infinity," rather than correctly stating it diverges.
- **Frequency band**: Moderate.
- **Root cause (Type 2)**: as described above.
- **Repair**: state plainly that $S_n\to\infty$ (no finite limit exists) — a series either
  converges to a finite number or it doesn't; "slow" divergence is still divergence, with no
  intermediate category.

## Analogies
- **"A metal detector, not a treasure map"**: the Divergence Test can definitively tell you
  "nothing here" (diverges) when it beeps, but its silence (terms → 0) tells you nothing about
  whether treasure (convergence) is actually present — you need a different tool to find out.
- **Anti-analogy**: "inconclusive" from the Divergence Test does NOT mean "probably converges" —
  it means literally zero information has been gained about convergence either way.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: present three series with $a_n\to0$ — $\sum1/n$ (diverges),
  $\sum1/n^2$ (converges), $\sum(1/2)^n$ (converges) — showing the Divergence Test cannot
  distinguish any of them.
- **Demonstration 2 (targets MC-2)**: for $\sum(1/2)^n$, compute $\lim a_n=0$ and $\lim S_n=2$
  side by side, confirming they are different numbers.
- **Demonstration 3 (targets MC-3)**: show the harmonic series' partial sums growing like
  $\ln n\to\infty$, with no finite limit — genuine divergence, not slow settling.

## Discovery Questions
1. "If three different series all have terms shrinking to zero, but one diverges and two
   converge, can any single test based only on the term limit distinguish them?"
2. "Is $\lim a_n$ (the limit of individual terms) the same quantity as $\lim S_n$ (the limit of
   the running total)? Can you find a series where these differ?"
3. "If a series' partial sums grow without bound, however slowly, does the series converge to
   anything?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s own corollary statement of the test,
   now developing the full proof and its precise limitation.
2. **Contrast pair**: conclusive (diverges) vs. inconclusive ($a_n\to0$) cases side by side,
   including the harmonic series as the canonical counterexample.
3. **Worked example**: systematic first-pass application across several series, modeling the
   two-line usage protocol.
4. **Conflict evidence**: the three demonstrations above.
5. **Mastery gate**: require classifying several series as DIVERGES or INCONCLUSIVE, stating the
   term limit each time, and proving the theorem from the definition of series convergence.

## Tutor Actions
- Never accept "the terms go to zero, so it converges" — immediately prompt for the harmonic
  series counterexample.
- When a learner reports a term limit and a partial-sum limit, confirm they understand these are
  two different sequences.
- When "slow convergence" language appears for a divergent series, correct it immediately to
  "divergence, at a slow rate."

## Voice Teaching Notes
- Introduce the test as "the cheapest first check, never the last word" — framing its value as
  speed, not completeness.
- When a learner treats an inconclusive result as evidence for convergence, ask "what would
  change your mind if the series actually diverged instead?"

## Assessment Signals
- **Rung 1 (recognition)**: learner states that the Divergence Test can never prove convergence.
- **Rung 2 (application)**: learner correctly applies the test to classify several series as
  DIVERGES or INCONCLUSIVE, and correctly moves to a different test when inconclusive.
- **Rung 3 (transfer)**: learner correctly proves the theorem from the definition of series
  convergence and correctly distinguishes $\lim a_n$ from $\lim S_n$ in a novel example.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the three-series contrast (one diverges, two converge, all with
  terms → 0).
- If MC-2 recurs, re-compute both limits explicitly for a concrete convergent series.
- If MC-3 recurs, re-show the harmonic series' unbounded partial-sum growth directly.

## Memory Hooks
- "This test only ever proves divergence — never convergence."
- "$\lim a_n$ and $\lim S_n$ are different sequences — never conflate them."
- "Slow divergence is still divergence."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the partial-sum definition of
  convergence this test's proof is built directly on, and first mentioned this test as a
  corollary — this entry develops it into a fully standalone tool.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.divergence-test.md`, reused by
  reference for its two-line proof, its conclusive-vs-inconclusive contrast table, its
  systematic worked-example workflow, and its three-misconception registry (independently
  birth-type-classified above, since the Blueprint carries severity labels but no birth-type
  column).
- Transfer probe cited by reference: the Blueprint's own three-student scenario evaluating
  $\sum\cos(1/n)$, distinguishing a genuine limit computation from an incorrect "oscillates"
  claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks` (none, on both sides),
  `cross_links` (none, on both sides), `difficulty`, `bloom`, `mastery_threshold`, and
  `estimated_hours` all match exactly between the Blueprint and the live KG.
- Genuine content-overlap recorded (not fixed): this entry's own MC-1 is the identical mechanism
  as `math.seq.series-convergence`'s own MC-1 (Batch 63), now cross-referenced. This is
  intentional depth, not duplication — the general series-convergence concept introduces the
  test as a corollary, while this concept develops it into a fully standalone tool with its own
  proof and usage protocol.

## Version History
- 2026-09-13 (Batch 64): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.trig.de-moivres-theorem`, `math.trig.eulers-formula`,
  `math.calc.power-series`. `math.seq` moves from **13/21** toward **14/21** this batch.
