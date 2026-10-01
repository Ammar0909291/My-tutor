# math.stats.method-of-moments

## Identity
- **KG id**: `math.stats.method-of-moments`
- **Domain**: math.stats
- **Requires**: `math.stats.estimator`, `math.prob.moments`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
Apply the Method of Moments by setting the theoretical moment $E[X^k]$ equal to the corresponding
SAMPLE moment $\sum x_i^k/n$ and solving — NEVER matching to a mismatched sample statistic; use
as many simultaneous moment equations as there are unknown parameters — NEVER one equation for
multiple unknowns; and recognize this method is simpler but generally LESS efficient than MLE,
NEVER a strict replacement — useful specifically when MLE's likelihood is intractable.

## Core Understanding
THE $k$-TH THEORETICAL MOMENT MUST MATCH THE $k$-TH SAMPLE MOMENT — NEVER A MISMATCHED STATISTIC:
for data from an Exponential distribution with rate $\lambda$ (where $E[X]=1/\lambda$), given
sample mean $\bar x=4$: set $E[X]=\bar x$: $1/\lambda=4\Rightarrow\hat\lambda=1/4=0.25$. Setting
$E[X]$ equal to the SAMPLE VARIANCE or some other unrelated summary statistic instead of the
SAMPLE MEAN is WRONG — the FIRST moment $E[X]$ must be matched specifically to the sample FIRST
moment ($\bar x$), never an arbitrary or mismatched statistic.

MULTIPLE UNKNOWN PARAMETERS REQUIRE MULTIPLE SIMULTANEOUS MOMENT EQUATIONS — NEVER JUST ONE: for a
Normal distribution with BOTH $\mu$ AND $\sigma^2$ unknown: TWO moment equations are needed —
first moment $E[X]=\mu$ set equal to $\bar x$ gives $\hat\mu=\bar x$ directly; second moment
$E[X^2]=\mu^2+\sigma^2$ set equal to the sample second moment, then solved (using $\hat\mu$) for
$\hat{\sigma^2}$. Attempting to estimate BOTH parameters using only the FIRST moment equation
alone leaves the system UNDERDETERMINED — infinitely many solution pairs would satisfy just one
equation; a second, independent equation is REQUIRED to pin down both parameters uniquely.

METHOD OF MOMENTS TRADES EFFICIENCY FOR SIMPLICITY — A FALLBACK, NEVER A GENERAL REPLACEMENT FOR
MLE: the Method of Moments requires only algebraic equation-solving, no calculus-based
optimization — generally SIMPLER to compute than MLE. However, it is generally LESS EFFICIENT
(higher variance) than MLE. Its main practical value is as a FALLBACK specifically when the
likelihood function needed for MLE is analytically INTRACTABLE — never a claim that it's
preferable in general.

## Mental Models
- **"Match the k-th theoretical moment to the k-th sample moment — never a different-order or
  unrelated statistic."**
- **"As many equations as unknowns — one moment equation can't pin down two parameters."**
- **"Method of moments trades some efficiency for algebraic simplicity — a fallback for when
  MLE's calculus gets intractable, never a general upgrade."**

## Why Students Fail

### MC-1: THEORETICAL-MOMENT-MATCHED-TO-THE-WRONG-SAMPLE-STATISTIC
- **Surface form**: sets a theoretical moment equal to a mismatched sample statistic (e.g. sample
  variance instead of sample mean for the first moment).
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the correct sample moment for the given order, confirming $k=1$ matches
  the sample mean.

### MC-2: MULTIPLE-PARAMETERS-ESTIMATED-USING-ONLY-ONE-MOMENT-EQUATION-LEAVING-SYSTEM-UNDERDETERMINED
- **Surface form**: attempts to estimate multiple unknown parameters using only a single moment
  equation, rather than setting up as many equations as unknown parameters.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-count the unknown parameters and set up the corresponding number of moment
  equations, solving the full system.

## Misconceptions

### MC-1: THEORETICAL-MOMENT-MATCHED-TO-THE-WRONG-SAMPLE-STATISTIC
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MULTIPLE-PARAMETERS-ESTIMATED-USING-ONLY-ONE-MOMENT-EQUATION-LEAVING-SYSTEM-UNDERDETERMINED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Method of moments is solving a system of equations, one equation per unknown — never fewer
  equations than unknowns and expecting a unique answer."**
- **Anti-analogy**: method of moments isn't a "quick MLE" — it's a genuinely different (usually
  less precise) route, chosen for tractability, not accuracy.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exponential-rate single-parameter matching, $E[X]=\bar
  x$.
- **Demonstration 2 (targets MC-2)**: the two-parameter Normal case requiring both the first and
  second moment equations.
- **Demonstration 3**: the intractable-likelihood scenario motivating Method of Moments as a
  fallback.

## Discovery Questions
1. "Should the first theoretical moment be matched to the sample mean, or some other sample
   statistic?"
2. "If two parameters are unknown, is one moment equation enough to solve for both?"
3. "Is the Method of Moments generally more or less efficient than MLE — and when would you use
   it anyway?"

## Teaching Sequence
1. **Conceptual shift**: the correct order-matched moment equation, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the two-equation simultaneous system for two unknowns, working Demonstration
   2, isolating MC-2.
3. **Reused procedure**: the simplicity-versus-efficiency tradeoff and MLE-intractability
   fallback, working Demonstration 3.
4. **Mastery gate**: require a correct single-parameter moment-matching computation, a correct
   two-parameter simultaneous system setup, and a correct statement of when Method of Moments is
   preferred, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a theoretical moment matched to a mismatched sample statistic.
- Never accept two unknown parameters estimated from only one moment equation.
- Never accept Method of Moments presented as a general replacement for MLE rather than a
  fallback.

## Voice Teaching Notes
- Say "is that the sample mean, or a different sample statistic?" whenever a first-moment equation
  is set up.
- Ask "how many unknowns do you have, and how many equations?" whenever multiple parameters are
  being estimated.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly matches a single theoretical moment to its sample
  counterpart and solves.
- **Rung 2 (application)**: learner correctly sets up and solves a two-equation system for a
  two-parameter distribution.
- **Rung 3 (transfer)**: learner correctly identifies when Method of Moments is the practical
  choice over MLE, in a scenario with an intractable likelihood.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the correct sample moment for the given order.
- If MC-2 recurs, re-count the unknowns and set up the corresponding number of equations.

## Memory Hooks
- "Match order-k theoretical moment to order-k sample moment — never a mismatch."
- "One equation per unknown — never fewer."
- "Simpler than MLE, less efficient than MLE — the fallback when MLE gets intractable."

## Transfer Connections
- `math.stats.estimator` (already authored, this campaign, Batch 200): supplies the general
  estimator framework Method of Moments is a specific, simpler-to-compute instance of.
- `math.prob.moments` (already authored, certified domain): supplies the theoretical moment
  formulas $E[X^k]$ this method matches against.
- `math.stats.mle` (already authored, this campaign, Batch 206): the more efficient but
  computationally heavier alternative this method serves as a fallback for.

## Cross-Subject Connections
- Ecological and mixture-distribution modeling: fitting complicated mixture distributions where
  the likelihood involves intractable integrals is a genuine, common scenario where Method of
  Moments becomes the practical choice.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.method-of-moments.md`, reused by
  reference for its single-parameter exponential example, its two-parameter Normal system
  example, its intractable-likelihood fallback scenario, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on fitting a mixture distribution
  to ecological species-abundance data with an intractable likelihood.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.estimator`/`math.prob.moments`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.8, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 208): authored. First entry this batch. Companion batch concept:
  `math.stats.rao-blackwell`.
