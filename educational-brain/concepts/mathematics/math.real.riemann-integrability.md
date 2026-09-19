# math.real.riemann-integrability

## Identity
- **KG id**: `math.real.riemann-integrability`
- **Domain**: math.real
- **Requires**: `math.real.riemann-integral`
- **Unlocks**: none
- **Cross-links**: `math.meas.measure-zero` (confirmed genuinely authored via `ls`; genuine
  cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State the Lebesgue criterion precisely ($f$ Riemann integrable iff BOUNDED AND its discontinuity
set has MEASURE ZERO), recognizing it as the EXACT dividing line, sharper than "continuous"
(sufficient, not necessary) or "bounded" (necessary, not sufficient) alone; re-diagnose the
Dirichlet function via the criterion directly (discontinuous everywhere, discontinuity set has
POSITIVE measure); and exhibit a function with INFINITELY MANY (countable) discontinuities that IS
integrable, confirming MEASURE — never cardinality — determines integrability.

## Core Understanding
THE LEBESGUE CRITERION RESOLVES BOTH OF `math.real.riemann-integral`'S ONE-DIRECTIONAL GAPS AT
ONCE: that concept establishes boundedness NECESSARY but not sufficient, and continuity SUFFICIENT
but not necessary. The Lebesgue criterion gives a genuine IF-AND-ONLY-IF: $f$ integrable
$\Leftrightarrow$ bounded AND discontinuity set has measure zero. Tabulating: $f_1(x)=x^2$
(continuous, discontinuity set $\varnothing$, measure zero) — integrable. $f_2(x)=\lfloor x\rfloor$
(discontinuous at finitely many points, a measure-zero set) — integrable, even though NOT
continuous everywhere, a case continuity alone couldn't resolve.

RE-DIAGNOSING THE DIRICHLET FUNCTION: ITS DISCONTINUITY SET HAS POSITIVE MEASURE, CORRECTLY
PREDICTING FAILURE: the Dirichlet function is discontinuous at EVERY $x\in[0,1]$ — its
discontinuity set is the ENTIRE interval, with measure $\mu([0,1])=1$, POSITIVE not zero. The
criterion correctly predicts NON-integrability: boundedness holds, but the measure-zero condition
fails — CONFIRMING, via a genuinely different mechanism (measuring the discontinuity set) than
`math.real.riemann-integral`'s own direct upper/lower-sum argument, the SAME conclusion. This is
independent diagnosis, never coincidental agreement.

A COUNTABLY INFINITE DISCONTINUITY SET STILL HAS MEASURE ZERO — MEASURE, NOT COUNT, DECIDES
INTEGRABILITY: for $g$ discontinuous only at the countably many points of $\mathbb Q\cap[0,1]$: by
`math.meas.measure-zero`'s own fact that countable sets have measure zero, $g$'s discontinuity set
has measure zero — so $g$ IS Riemann integrable, DESPITE infinitely many discontinuities. Contrast
directly against the Dirichlet function (also infinitely discontinuous, but on a set of POSITIVE
measure, and NOT integrable): the identical "infinitely many discontinuities" description applies
to both, yet one is integrable and the other isn't — MEASURE, never mere cardinality, is the
deciding factor.

## Mental Models
- **"The Lebesgue criterion doesn't just add another sufficient condition to the pile — it's the
  precise boundary that boundedness and continuity alone could only approach from opposite
  sides."**
- **"Counting discontinuities tells you nothing about integrability — measuring the set they form
  tells you everything."**

## Why Students Fail

### MC-1: LEBESGUE-CRITERION-ASSUMED-MERELY-SUFFICIENT
- **Surface form**: believes the Lebesgue criterion is just another sufficient condition for
  integrability, like continuity.
- **Birth type**: Foundational severity (Blueprint's own declared severity — every prior
  integrability fact encountered was one-directional, making a genuine if-and-only-if easy to
  underestimate).
- **Repair**: re-walk the three-function classification table, including the step-function case
  continuity alone couldn't resolve.

### MC-2: LEBESGUE-CRITERION-DIRICHLET-PREDICTION-ASSUMED-COINCIDENTAL
- **Surface form**: believes the criterion's correct prediction of the Dirichlet function's
  non-integrability is merely a coincidental match with the already-known result.
- **Birth type**: High severity (Blueprint's own declared severity — two different arguments
  reaching the same conclusion naturally invites suspicion of one being derivative of the other).
- **Repair**: re-walk the independent measure computation for the Dirichlet function's
  discontinuity set.

### MC-3: INFINITE-DISCONTINUITIES-ASSUMED-TO-RULE-OUT-INTEGRABILITY
- **Surface form**: believes having infinitely many discontinuities automatically rules out
  Riemann integrability.
- **Birth type**: High severity (Blueprint's own declared severity — "infinitely many" sounds
  inherently pathological, obscuring that countable infinities are measure-zero-compatible).
- **Repair**: re-walk the countably-discontinuous-yet-integrable function, contrasted against the
  Dirichlet function.

## Misconceptions

### MC-1: LEBESGUE-CRITERION-ASSUMED-MERELY-SUFFICIENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: LEBESGUE-CRITERION-DIRICHLET-PREDICTION-ASSUMED-COINCIDENTAL
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: INFINITE-DISCONTINUITIES-ASSUMED-TO-RULE-OUT-INTEGRABILITY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Lebesgue criterion is like a precise property line, not just a fence somewhere inside
  the yard — boundedness and continuity were each rough markers, but the criterion is the exact
  boundary itself."**
- **Anti-analogy**: "infinitely many discontinuities" does NOT automatically mean "too broken to
  integrate" — a countable infinity of discontinuities is measure-zero, exactly as harmless as a
  single point.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the three-function table ($x^2$, $\lfloor x\rfloor$,
  Dirichlet), showing the criterion resolves the step-function case continuity alone couldn't.
- **Demonstration 2 (targets MC-2)**: the Dirichlet function's discontinuity-set measure computed
  independently as 1, matching the earlier Darboux-sum verdict.
- **Demonstration 3 (targets MC-3)**: a countably-discontinuous function versus the Dirichlet
  function, sharing "infinitely many discontinuities" but differing in measure and integrability.

## Discovery Questions
1. "Is the Lebesgue criterion just another sufficient condition for integrability, or is it the
   exact necessary-and-sufficient dividing line?"
2. "Does the Lebesgue criterion's correct prediction of the Dirichlet function's non-integrability
   merely coincidentally match the already-known result?"
3. "Does having infinitely many discontinuities automatically rule out Riemann integrability?"

## Teaching Sequence
1. **Representation shift**: the three-function classification table, isolating MC-1.
2. **Conflict evidence**: the Dirichlet function's independent measure-based re-diagnosis,
   isolating MC-2.
3. **Contrast pair**: the countably-discontinuous-yet-integrable function versus the Dirichlet
   function, isolating MC-3.
4. **Mastery gate**: require a correct statement of the Lebesgue criterion identifying which part
   is already-known and which is new, a correct measure computation for a new discontinuity set,
   and a correct explanation of why infinite discontinuities alone don't determine integrability,
   at the Blueprint's own stated MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept the Lebesgue criterion presented as merely another sufficient condition.
- Never accept the criterion's Dirichlet-function prediction dismissed as coincidental.
- Never accept a claim that infinitely many discontinuities automatically rules out
  integrability.

## Voice Teaching Notes
- Say "is that necessary, sufficient, or both?" whenever an integrability condition is discussed.
- When discontinuities are counted, ask "what's the measure of that set, not just how many points
  are in it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the Lebesgue criterion and identifies its
  already-known versus new components.
- **Rung 2 (application)**: learner correctly computes the measure of a new function's
  discontinuity set and predicts integrability from it.
- **Rung 3 (transfer)**: learner correctly explains, for a piecewise function with countably many
  gluing points, why those points pose no obstacle to integrability, and why a positive-measure
  discontinuous subinterval genuinely would.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the three-function classification table.
- If MC-2 recurs, re-walk the independent Dirichlet-function measure computation.
- If MC-3 recurs, re-walk the countably-discontinuous-yet-integrable contrast.

## Memory Hooks
- "The Lebesgue criterion is exact — both necessary and sufficient, not just another sufficient
  condition."
- "Two independent arguments reaching the same conclusion isn't coincidence — it's confirmation."
- "Countably infinite discontinuities are measure-zero — infinite count never automatically means
  non-integrable."

## Transfer Connections
- `math.real.riemann-integral` (already authored, this campaign, Batch 135): supplies Darboux
  sums, the boundedness-necessary and continuity-sufficient one-directional facts, and the
  Dirichlet function non-example this concept directly re-diagnoses.
- `math.meas.measure-zero` (already authored, certified domain): the KG's declared cross-link,
  whose countable-sets-have-measure-zero fact this concept directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.riemann-integrability.md`, reused by
  reference for its three-function classification table, its independent Dirichlet-function
  re-diagnosis, its countably-discontinuous-yet-integrable demonstration, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against `math.meas.measure-zero`,
  reasoning about a piecewise function's countably many gluing points and contrasting them with a
  positive-measure discontinuous subinterval.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.riemann-integral`, unlocks none, cross_links `math.meas.measure-zero`, expert/
  analyze, mastery_threshold 0.8, estimated_hours 4) was directly verified against the live KG and
  matches exactly. The Blueprint's own cross-link-probe P76 mode was independently re-verified via
  `ls educational-brain/concepts/mathematics/` (`math.meas.measure-zero` genuinely authored) and
  required no correction.

## Version History
- 2026-09-19 (Batch 136): authored. Second entry this batch, closing out the riemann-integral
  chain's own declared unlock alongside `ftc-rigorous`. Companion batch concept:
  `math.real.ftc-rigorous`.
