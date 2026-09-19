# math.stats.percentile

## Identity
- **KG id**: `math.stats.percentile`
- **Domain**: math.stats
- **Requires**: `math.stats.measures-of-spread`
- **Unlocks**: none
- **Cross-links**: `math.prob.quantile`
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Define the $p$-th percentile as the value below which $p\%$ of the data falls — a statement about
PROPORTION, never a raw score or count; identify $Q_1,Q_2,Q_3$ as the 25th/50th/75th percentiles,
recognizing $Q_2$ IS the median (never a separately-computed, potentially-different value); and
compute $\mathrm{IQR}=Q_3-Q_1$, recognizing it as ROBUST to outliers (never affected by extreme
tail values the way the full range is).

## Core Understanding
PERCENTILE RANK IS PROPORTION BELOW — NEVER A RAW SCORE PERCENTAGE: a student at the 85th
percentile on a standardized test means 85% of OTHER test-takers scored LOWER — it says NOTHING
about what fraction of TEST QUESTIONS the student answered correctly (which could be entirely
different, e.g. 92% correct). A common error confuses "85th percentile" with "scored 85% of
questions correctly" — percentile RANK (relative standing among test-takers) and raw SCORE
percentage (fraction of questions correct) are ENTIRELY DIFFERENT quantities that can diverge
substantially.

$Q_2$ IS THE MEDIAN — NEVER A SEPARATELY-COMPUTED VALUE THAT MIGHT DISAGREE: for
$\{3,5,7,9,11\}$: the sorted middle value is 7. BOTH the median AND $Q_2$ are EXACTLY 7 — they
are the SAME quantity BY DEFINITION, never two independently-computed values that HAPPEN to
coincide. There is NO scenario where a correctly-computed $Q_2$ differs from the correctly-computed
median — treating them as requiring separate computation methods that "might occasionally
disagree" misunderstands that $Q_2$ IS the median, by construction.

THE IQR IS ROBUST TO OUTLIERS — THE FULL RANGE IS NOT: for $\{2,4,6,8,10,12,100\}$ (with an
outlier, 100): $Q_1=4$, $Q_3=12$, giving $\mathrm{IQR}=12-4=8$ — barely affected by the outlier
100 at all. The full RANGE $=100-2=98$ — DRASTICALLY inflated by the SINGLE outlier. Because the
IQR depends ONLY on the two quartile positions (ignoring the extreme tails entirely), an extreme
value at either end has LITTLE TO NO effect on $Q_1$ or $Q_3$ — the IQR measures the spread of
the MIDDLE 50% only, deliberately excluding the extremes the full range is fully exposed to.

## Mental Models
- **"Percentile is about WHERE you stand relative to others, never about how many points you
  earned."**
- **"Q2 and the median are the same word for the same number — never two separate computations
  to reconcile."**
- **"IQR only looks at the middle 50% — outliers in the tails simply don't reach it."**

## Why Students Fail

### MC-1: PERCENTILE-RANK-CONFUSED-WITH-RAW-SCORE-PERCENTAGE
- **Surface form**: confuses percentile rank (proportion of data below a value) with raw score
  percentage (fraction of items answered correctly), treating them as the same quantity.
- **Birth type**: Foundational severity (Blueprint's own declared severity — this produces a
  genuinely wrong interpretation of reported data, a very common real-world misunderstanding).
- **Repair**: re-state the percentile definition explicitly as "proportion of data below,"
  distinguishing it from a raw score fraction.

### MC-2: Q2-TREATED-AS-A-SEPARATELY-COMPUTED-VALUE-FROM-THE-MEDIAN
- **Surface form**: treats $Q_2$ as requiring separate computation from the median, rather than
  recognizing they are the identical quantity by definition.
- **Birth type**: Moderate severity (Blueprint's own declared severity — primarily a conceptual
  redundancy-recognition issue rather than a computational error).
- **Repair**: re-verify both computations arrive at the identical value, confirming they are the
  same quantity by definition.

## Misconceptions

### MC-1: PERCENTILE-RANK-CONFUSED-WITH-RAW-SCORE-PERCENTAGE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: Q2-TREATED-AS-A-SEPARATELY-COMPUTED-VALUE-FROM-THE-MEDIAN
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Percentile is your position in the line, not the score on your test paper — two completely
  different measurements of 'how you did.'"**
- **Anti-analogy**: the IQR is not a shrunk version of the full range — it deliberately looks
  only at the middle half, so an outlier anywhere in the tails simply never enters the
  computation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the 85th-percentile-versus-92%-correct contrast.
- **Demonstration 2 (targets MC-2)**: the $\{3,5,7,9,11\}$ $Q_2$-equals-median verification.
- **Demonstration 3**: the outlier-containing dataset's IQR-versus-full-range comparison.

## Discovery Questions
1. "Does being at the 85th percentile mean you answered 85% of the questions correctly?"
2. "Are $Q_2$ and the median computed separately, or are they the exact same value?"
3. "Why is the IQR less affected by outliers than the full range?"

## Teaching Sequence
1. **Contrast pair**: the percentile-rank-versus-raw-score-percentage distinction, working
   Demonstration 1, isolating MC-1.
2. **Procedure reuse**: the $Q_2$-equals-median verification, working Demonstration 2, isolating
   MC-2.
3. **Conceptual shift**: the IQR-versus-full-range outlier-robustness comparison, working
   Demonstration 3.
4. **Mastery gate**: require a correct percentile interpretation, a correct $Q_2$/median
   verification, and a correct IQR computation with a robustness explanation, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept percentile rank confused with raw score percentage.
- Never accept $Q_2$ treated as potentially differing from the median.
- Never accept the IQR described as merely a smaller version of the full range rather than a
  genuinely outlier-robust measure.

## Voice Teaching Notes
- Say "is that a statement about proportion below, or about raw score?" whenever a percentile is
  interpreted.
- Ask "does that outlier actually reach into the middle 50%?" whenever the IQR's robustness is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly interprets a stated percentile as a proportion-
  below statement.
- **Rung 2 (application)**: learner correctly computes $Q_1,Q_2,Q_3$ and verifies $Q_2$ equals
  the median.
- **Rung 3 (transfer)**: learner correctly computes the IQR for a dataset with an outlier and
  explains why it is more robust than the full range.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the percentile definition as "proportion of data below."
- If MC-2 recurs, re-verify $Q_2$ and the median arrive at the identical value.

## Memory Hooks
- "Percentile is rank among others — never a raw score percentage."
- "Q2 IS the median — one number, one name."
- "IQR ignores the tails entirely — outliers there simply don't count."

## Transfer Connections
- `math.stats.measures-of-spread` (already authored, certified domain): supplies the
  spread-measurement framework this concept's percentile and IQR machinery refines.
- `math.prob.quantile` (already authored, certified domain, genuine cross-link): supplies the
  probability-theory generalization of this concept's percentile definition.

## Cross-Subject Connections
- Medicine: pediatric growth charts report a child's height/weight percentile relative to peers,
  a direct real-world application of percentile rank versus raw measurement.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.percentile.md`, reused by reference
  for its percentile-rank-versus-raw-score contrast, its $Q_2$-equals-median verification, its
  IQR-versus-full-range outlier example, and its two-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on interpreting a pediatric growth
  chart's height percentile correctly.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.measures-of-spread`, unlocks none, cross_links `math.prob.quantile`,
  developing/apply, mastery_threshold 0.9, estimated_hours 2) was directly verified against the
  live KG and matches exactly. `math.prob.quantile` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 195): authored. Second entry this batch. Companion batch concept:
  `math.stats.normal-distribution`.
