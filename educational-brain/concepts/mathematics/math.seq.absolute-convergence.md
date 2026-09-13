# math.seq.absolute-convergence

## Identity
- **KG id**: `math.seq.absolute-convergence`
- **Domain**: math.seq
- **Requires**: `math.seq.alternating-series`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint describes several
  forward relationships in prose without a formal `unlocks` list)
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
Distinguish three convergence classes for $\sum a_n$ — ABSOLUTELY convergent ($\sum|a_n|$
converges), CONDITIONALLY convergent ($\sum a_n$ converges but $\sum|a_n|$ diverges), and
divergent; apply the two-step classification pipeline (test $\sum|a_n|$ first, then $\sum a_n$
directly only if the first test fails); and state the Riemann Rearrangement Theorem, recognizing
that only absolutely convergent series are safe to rearrange without changing their sum.

## Core Understanding
`math.seq.alternating-series` established that the alternating harmonic series
$\sum(-1)^{n+1}\frac1n$ converges even though the ordinary harmonic series $\sum\frac1n$ (its
absolute-value counterpart) diverges. This concept formalizes that gap into three distinct
convergence classes: a series is ABSOLUTELY convergent if $\sum|a_n|$ itself converges (a strictly
stronger property); CONDITIONALLY convergent if $\sum a_n$ converges but $\sum|a_n|$ diverges (the
convergence depends on the signs themselves, via cancellation); or simply divergent.

Absolute convergence is provably the stronger property: if $\sum|a_n|$ converges, then $\sum a_n$
converges too (via $b_n=a_n+|a_n|$, so $0\le b_n\le2|a_n|$, giving $\sum b_n$ convergent by
comparison, and $\sum a_n=\sum b_n-\sum|a_n|$ as a difference of two convergent series). This
justifies the TWO-STEP classification pipeline: first test $\sum|a_n|$ — if it converges, the
series is absolutely convergent and no further test is needed; only if $\sum|a_n|$ diverges does
$\sum a_n$ need to be tested directly (via the alternating series test or the divergence test) to
distinguish "conditionally convergent" from "divergent."

The reason conditional convergence exists at all is SIGN-CANCELLATION: for a conditionally
convergent series, the sum of its positive terms alone diverges to $+\infty$ and the sum of its
negative terms alone diverges to $-\infty$ (if either were finite, $\sum|a_n|$ would converge,
contradicting conditional convergence) — yet these two divergent quantities interleave in exactly
the right way to produce a finite limit. Removing the signs (taking absolute values) eliminates
this delicate cancellation mechanism entirely, which is exactly why $\sum|a_n|$ can diverge even
when $\sum a_n$ does not.

This distinction has a genuinely surprising practical consequence, the RIEMANN REARRANGEMENT
THEOREM: an absolutely convergent series can be rearranged in any order without changing its sum,
but a conditionally convergent series can be rearranged to converge to ANY target real number
(or to diverge), simply by choosing how many positive versus negative terms to take at each step
before the target is over/undershot. The alternating harmonic series, reordered, can be made to
sum to $\frac32\ln2$ instead of its standard-order sum $\ln2$ — the identical terms, only
reordered.

## Mental Models
- **"Absolute convergence is a strictly STRONGER property — test it FIRST."**
- **"Conditional convergence exists only because of sign-cancellation between two infinite,
  divergent reservoirs."**
- **"Rearrangement is always safe for absolute convergence, and never safe for conditional
  convergence — Riemann's theorem lets it hit ANY target."**

## Why Students Fail

### MC-1: CONDITIONAL-EQUALS-ABSOLUTE
- **Surface form**: believing convergence and absolute convergence are the identical property,
  failing to recognize conditionally convergent series as a genuinely separate class.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: for many familiar series (geometric, $p$-series
  with all-positive terms), convergence and absolute convergence genuinely coincide, so the
  distinction never surfaces until an alternating series with a divergent absolute-value series is
  encountered.
- **Repair**: present a series where $\sum a_n$ converges but $\sum|a_n|$ diverges (the alternating
  harmonic series), showing the two properties genuinely split apart.

### MC-2: ABSOLUTE-DIVERGENCE-IMPLIES-SERIES-DIVERGENCE
- **Surface form**: concluding $\sum a_n$ diverges purely because $\sum|a_n|$ diverges, forgetting
  that sign-cancellation can still produce conditional convergence.
- **Frequency band**: Foundational (the Blueprint's own declared foundational misconception — if
  held, every conditionally convergent series is misclassified as divergent, eliminating the
  entire class).
- **Root cause (Type 1, overgeneralization)**: for many series, a diverging absolute-value series
  does correctly signal outright divergence, so that pattern is overgeneralized to cases where
  sign-cancellation intervenes.
- **Repair**: explicitly work through the alternating harmonic series's own Step 1 (diverges) and
  Step 2 (converges by the alternating series test) as two genuinely separate questions, showing
  Step 1's failure does not settle the matter.

### MC-3: REARRANGEMENT-SAFE-FOR-ALL
- **Surface form**: applying rearrangement-invariance ("reordering a sum never changes it") to all
  convergent series, unaware that this licence applies only to absolutely convergent ones.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: finite-sum rearrangement is always safe, and this
  intuition is carried over unmodified into the infinite-series setting, where it fails for the
  conditionally convergent class.
- **Repair**: demonstrate the alternating harmonic series's rearranged sum $\frac32\ln2$ against
  its standard-order sum $\ln2$ — the identical terms, genuinely different totals.

## Misconceptions

### MC-1: CONDITIONAL-EQUALS-ABSOLUTE
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ABSOLUTE-DIVERGENCE-IMPLIES-SERIES-DIVERGENCE
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: REARRANGEMENT-SAFE-FOR-ALL
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two infinite reservoirs, positive and negative, balanced by the order you draw from them"**:
  a conditionally convergent series' sum depends on the specific order the positive and negative
  contributions arrive in, since each reservoir alone is infinite.
- **Anti-analogy**: a conditionally convergent series is NOT simply "a slower version" of an
  absolutely convergent one — it is a fundamentally different mechanism (order-dependent
  cancellation) rather than a weaker degree of the same property.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: classify $\sum(-1)^n/n^2$ (absolutely convergent, since
  $\sum1/n^2$ converges) against $\sum(-1)^{n+1}/n$ (only conditionally convergent, since
  $\sum1/n$ diverges but the alternating series test succeeds).
- **Demonstration 2 (targets MC-2)**: apply the two-step pipeline to $\sum(-1)^{n+1}/\sqrt n$ —
  Step 1 ($\sum1/\sqrt n$ diverges) does NOT settle the question; Step 2 (the alternating series
  test succeeds) shows genuine conditional convergence.
- **Demonstration 3 (targets MC-3)**: compare the alternating harmonic series's standard-order
  sum ($\ln2\approx0.6931$) against a specific reordering's sum ($\frac32\ln2\approx1.0397$),
  using the identical set of terms.

## Discovery Questions
1. "If $\sum a_n$ converges but $\sum|a_n|$ diverges, what does that tell you about how the
   convergence is being achieved?"
2. "If $\sum|a_n|$ diverges, is the question of whether $\sum a_n$ converges automatically
   settled?"
3. "If you can reorder a series's terms and get a different sum, what does that say about summing
   an infinite series compared to summing a finite one?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.alternating-series`'s alternating harmonic series example,
   framing absolute/conditional convergence as formalizing that concept's own convergent-but-not-
   absolutely-convergent case.
2. **Conflict evidence**: the two-step pipeline applied to a series whose Step 1 fails but whose
   Step 2 succeeds.
3. **Contrast pair**: an absolutely convergent series (rearrangement-safe) versus a conditionally
   convergent one (rearrangement changes the sum, per Riemann's theorem).
4. **Mastery gate**: require classifying a series into one of the three classes via the two-step
   pipeline, and stating whether rearrangement is safe for a given classification.

## Tutor Actions
- Never accept a classification of "divergent" from a diverging $\sum|a_n|$ alone without the
  learner also testing $\sum a_n$ directly.
- When a learner claims a rearranged sum must equal the original, ask whether the series is
  absolutely or only conditionally convergent before accepting the claim.

## Voice Teaching Notes
- Say "test the absolute-value series FIRST" as a fixed procedural rule whenever classification
  begins.
- When a learner conflates convergence with absolute convergence, ask "does $\sum|a_n|$ converge
  too, or only $\sum a_n$?" to force the distinction into words.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the three convergence classes and their
  defining criteria.
- **Rung 2 (application)**: learner correctly classifies a given series via the two-step pipeline.
- **Rung 3 (transfer)**: learner correctly states whether rearrangement changes a given series's
  sum, citing the correct convergence class.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the absolutely-versus-conditionally-convergent contrast.
- If MC-2 recurs, re-run the two-step pipeline on a genuine conditional-convergence case.
- If MC-3 recurs, re-run the rearranged-sum numeric contrast.

## Memory Hooks
- "Test $\sum|a_n|$ first — absolute convergence is the stronger claim."
- "A diverging absolute-value series does NOT settle the question — check $\sum a_n$ directly."
- "Rearrangement is safe only for absolute convergence — conditional convergence can hit any
  target."

## Transfer Connections
- `math.seq.alternating-series` (already authored): supplies the alternating harmonic series
  example this concept formalizes into the conditional-convergence class.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.absolute-convergence.md`, reused by
  reference for its three-class diagram, its classification gallery, its Riemann Rearrangement
  Theorem statement and numeric demonstration, and its three-misconception registry (birth types
  independently assigned above from the Blueprint's own trigger/description language, since no
  explicit birth-type column is given).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (classifying
  $\sum(-1)^n/(n^2+1)$ via the limit comparison test, then determining rearrangement safety).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG discrepancy noted, resolved toward the KG**: the Blueprint's Component 7
  describes forward relationships in prose ("power series absolute convergence," "radius of
  convergence analysis") without a formal, KG-checkable `unlocks` list; direct KG query confirms
  `unlocks: []` for this concept. This entry's Identity section uses the KG's value.

## Version History
- 2026-09-13 (Batch 67): authored. Unblocked by `math.seq.alternating-series` (Batch 66).
  Companion batch concepts: `math.seq.integral-test`, `math.seq.ratio-test`,
  `math.seq.root-test`. `math.seq` moves from **17/21** toward **18/21** this batch.
