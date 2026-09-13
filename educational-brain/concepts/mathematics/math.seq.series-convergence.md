# math.seq.series-convergence

## Identity
- **KG id**: `math.seq.series-convergence`
- **Domain**: math.seq
- **Requires**: `math.seq.partial-sums`, `math.seq.convergent`
- **Unlocks**: `math.calc.power-series`
- **Cross-links**: `math.calc.power-series`
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 20

## Learning Objective
Define convergence of an infinite series $\sum a_n$ as the convergence of its sequence of partial
sums $\{S_n\}$, apply the geometric series convergence criterion ($|r|<1$) to find exact sums, and
use the Divergence Test correctly — recognizing it as a one-directional tool that can prove
divergence but never prove convergence.

## Core Understanding
`math.seq.partial-sums` established $S_n=a_1+a_2+\cdots+a_n$ as a sequence in its own right, and
`math.seq.convergent` established what it means for a sequence to converge to a finite limit. A
**series** $\sum_{n=1}^{\infty} a_n$ converges precisely when its own sequence of partial sums
$\{S_n\}$ converges: $\sum a_n=\lim_{n\to\infty} S_n$. If $\{S_n\}$ diverges, the series diverges.
This definition reduces "does this infinite sum make sense?" entirely to the already-mastered
question "does this sequence converge?" — no new machinery is needed, only a new object
(partial sums) to apply it to.

The most important convergent series type is the **geometric series**,
$\sum_{n=0}^{\infty} ar^n=a+ar+ar^2+\cdots$. Its partial sum has the closed form
$S_n=a(1-r^{n+1})/(1-r)$ (derived by the multiply-and-subtract trick: $S_n-rS_n=a-ar^{n+1}$).
When $|r|<1$, $r^{n+1}\to0$ as $n\to\infty$, so the limit exists and
$\sum_{n=0}^{\infty} ar^n=a/(1-r)$. When $|r|\ge1$, the partial sums do not settle down, and the
series diverges. Crucially, $r$ may be NEGATIVE and the series still converges, provided
$|r|<1$ — an alternating geometric series like $\sum(-1/3)^n$ converges to $1/(1+1/3)=3/4$ exactly
as readily as a positive-ratio one.

The **Divergence Test** follows from a simple observation: if $\sum a_n$ converges to $L$, then
both $S_n\to L$ and $S_{n-1}\to L$, so $a_n=S_n-S_{n-1}\to L-L=0$. Used in its contrapositive form
— if $a_n\not\to0$, then $\sum a_n$ diverges — this test is a fast DIVERGENCE detector. But it is
NOT a convergence detector: if $a_n\to0$, the test gives NO information about convergence, because
"terms shrinking to zero" is necessary but not sufficient for a series to converge. The canonical
counterexample is the **harmonic series** $\sum 1/n$: its terms shrink to zero, yet its partial
sums grow without bound (provably, via the grouping argument
$S_{2^k}>1+k/2\to\infty$) — the series diverges despite $1/n\to0$.

## Mental Models
- **"A series converges exactly when its partial sums do — no new definition needed."**
- **"The Divergence Test only ever proves divergence — it can never prove convergence."**
- **"The harmonic series is the permanent warning: shrinking to zero is not enough."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: the plausible-sounding heuristic "if the pieces being
  added get smaller and smaller, the total must settle down" is a reasonable-feeling
  overgeneralization from finite experience, and it is exactly false — the harmonic series is the
  standing counterexample.
- **MC-2 (Type 1, overgeneralization)**: the finite-series habit "compute $S_n$ and that is the
  answer" is overgeneralized into the infinite case, where no single partial sum, however large
  $n$ is, ever equals the infinite sum — only the LIMIT of the partial sums does. This is the
  identical mechanism already documented for `math.seq.infinite-geometric-series`'s own MC-3
  (PARTIAL-SUM-IS-INFINITE-SUM), recurring here at the more general series level.
- **MC-3 (Type 2, perceptual intuition)**: a negative common ratio visually and intuitively
  suggests instability or "not settling down," a perceptual impression overgeneralized into
  believing convergence requires a positive ratio, when in fact the ONLY requirement is
  $|r|<1$ regardless of sign.

## Misconceptions

### MC-1: TERMS-TO-ZERO-IMPLIES-CONVERGENT
- **Surface form**: "$\sum 1/n$ converges because $1/n\to0$" — applying the reasoning to the
  harmonic series, which actually diverges.
- **Frequency band**: Foundational — the Blueprint names this the concept's central obstacle.
- **Root cause (Type 1)**: as described above — a reasonable-feeling but false generalization
  from finite-sum experience.
- **Repair**: present the harmonic series' grouping argument directly
  ($S_{2^k}>1+k/2\to\infty$) as the permanent counterexample — terms shrinking to zero is
  necessary but never sufficient for convergence.

### MC-2: PARTIAL-SUM-AS-TOTAL-SUM
- **Surface form**: reporting $S_5\approx0.97$ for $\sum(1/2)^n$ as "the sum" of the series,
  rather than recognizing the true sum is $\lim S_n=1$.
- **Frequency band**: Moderate to High.
- **Root cause (Type 1)**: the identical mechanism as `math.seq.infinite-geometric-series`'s own
  MC-3, recurring here — the finite-sum habit "compute and stop" carried unmodified into the
  infinite case.
- **Repair**: compute successive partial sums and show them approaching, but never reaching, the
  true limiting value — the sum IS the limit, never any single partial sum.

### MC-3: GEOMETRIC-RATIO-MUST-BE-POSITIVE
- **Surface form**: believing a geometric series with $r=-1/3$ cannot converge because the ratio
  is negative, overlooking that $|r|=1/3<1$ is the only condition that matters.
- **Frequency band**: Moderate.
- **Root cause (Type 2)**: the perceptual impression that alternation or "flipping sign" implies
  instability, overgeneralized past what the convergence CONDITION actually requires.
- **Repair**: plot the partial sums of an alternating geometric series (e.g. $\sum(-1/2)^n$) on a
  number line, showing them oscillate but converge, settling toward the limit from both sides.

## Analogies
- **The bouncing ball**: a ball dropped and bouncing to half its previous height each time
  travels a total distance that is finite, even though it bounces infinitely many times —
  the physical analogue of a convergent geometric series.
- **Anti-analogy**: "the terms get smaller" is NOT the same claim as "the sum settles down" —
  the harmonic series makes this distinction concrete and permanent.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute partial sums of the harmonic series at
  $n=1,2,4,8,16,\ldots$ and show them growing without bound despite each term shrinking.
- **Demonstration 2 (targets MC-2)**: compute $S_5, S_{10}, S_{20}$ for a convergent geometric
  series and show them approaching, never equaling, the formula's predicted sum.
- **Demonstration 3 (targets MC-3)**: plot the partial sums of $\sum(-1/2)^n$ oscillating around
  and converging to $2/3$.

## Discovery Questions
1. "If every term of a series shrinks to zero, must the total sum be finite? What would you need
   to check to be sure?"
2. "Is a specific partial sum, however large $n$ is, ever exactly equal to the infinite sum?"
3. "Does a negative common ratio automatically prevent a geometric series from converging? What
   condition actually determines convergence?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.partial-sums` and `math.seq.convergent`, defining series
   convergence as nothing more than partial-sum-sequence convergence.
2. **Pattern induction**: derive the geometric series partial-sum formula and the harmonic
   series' divergence via the grouping argument, inducing the Divergence Test from the
   contrapositive.
3. **Contrast pair**: convergent vs. divergent geometric cases (including the alternating case),
   and what the Divergence Test can and cannot conclude.
4. **Conflict evidence**: the three demonstrations above.
5. **Mastery gate**: require classification of several series by convergence/divergence, an
   exact geometric sum including a negative-ratio case, and an explicit statement of what the
   Divergence Test's inconclusive result does and does not mean.

## Tutor Actions
- Never accept "the terms go to zero, so it converges" without prompting for the harmonic-series
  counterexample.
- When a learner reports a partial sum as the series' value, ask what happens as more terms are
  added.
- When a negative ratio appears, explicitly ask for $|r|$ before accepting a convergence verdict.

## Voice Teaching Notes
- Introduce the Divergence Test explicitly as "a one-way street" — it can slam the door shut on
  convergence, but it can never open it — so the directionality is heard, not just read.
- When a learner cites the harmonic series' terms shrinking as evidence FOR convergence, redirect
  immediately to the grouping argument rather than restating the rule abstractly.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that terms shrinking to zero does not guarantee
  convergence, citing the harmonic series.
- **Rung 2 (application)**: learner correctly finds the exact sum of a geometric series,
  including one with a negative ratio.
- **Rung 3 (transfer)**: learner correctly applies the Divergence Test to conclude divergence
  where applicable, and correctly identifies when the test is inconclusive.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the harmonic-series grouping demonstration with the learner's own
  computed partial sums.
- If MC-2 recurs, compute additional partial sums together and ask what value they are
  approaching.
- If MC-3 recurs, re-run the alternating-series oscillation plot with the learner's own numbers.

## Memory Hooks
- "Shrinking to zero is necessary, never sufficient."
- "The sum is the limit — no single partial sum is ever the answer."
- "Only $|r|<1$ matters — the sign of $r$ does not."

## Transfer Connections
- `math.seq.partial-sums` (already authored): supplies the sequence $\{S_n\}$ whose convergence
  this entry's own definition is built directly on.
- `math.seq.convergent` (already authored): supplies the convergence definition this entry
  applies to the partial-sum sequence.
- `math.seq.infinite-geometric-series` (already authored, Batch 62): its own MC-3
  (PARTIAL-SUM-IS-INFINITE-SUM) is the identical mechanism as this entry's own MC-2, now
  recurring at the general-series level rather than the geometric-specific one.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.series-convergence.md`, reused by
  reference for its bouncing-ball anchor, its geometric-series-formula derivation, its harmonic-
  series grouping argument, and its three-misconception registry (independently birth-type-
  classified above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own INDEPENDENCE-mode probe (a geometric
  series with $a=12$, $r=-1/3$, computing the exact sum, a partial sum, and explaining why the
  partial sum is not the answer to "what does the series converge to").

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks`, `cross_links`, `difficulty`,
  `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly between the Blueprint and
  the live KG.
- Genuine content-overlap recorded (not fixed): this entry's own MC-2 is the identical mechanism
  as `math.seq.infinite-geometric-series`'s own MC-3, authored one batch earlier — both entries
  now cross-reference each other. This is intentional depth, not duplication: the mechanism
  recurs at two structurally distinct levels (a specific geometric series vs. a general series).

## Version History
- 2026-09-13 (Batch 63): authored. Unblocked by `math.seq.partial-sums` and `math.seq.convergent`
  (both Batch 54/59-era). Companion batch concepts: `math.trig.polar-form-complex`,
  `math.disc.recurrence-relation`, `math.disc.asymptotic-notation`. This entry's own `unlocks`
  field (`math.calc.power-series`) is a real forward relationship — it is the sole prerequisite
  of `math.calc.power-series`, which reopens math.calc's frontier next batch, closing the
  standing note left at the end of Batch 62. `math.seq` reaches **13/21** this batch.
