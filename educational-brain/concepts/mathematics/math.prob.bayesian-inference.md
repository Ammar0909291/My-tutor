# math.prob.bayesian-inference

## Identity
- **KG id**: `math.prob.bayesian-inference`
- **Domain**: math.prob
- **Requires**: `math.prob.bayes-theorem`
- **Unlocks**: none
- **Cross-links**: `math.stats.bayesian-inference` (KG-declared, but NOT yet authored — verified
  via `ls`; independence mode used, correcting the Blueprint's own claimed cross-link mode, see
  Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective
Frame inference as a prior-to-posterior update via `math.prob.bayes-theorem`'s own formula,
$P(\theta|\text{data})\propto P(\text{data}|\theta)P(\theta)$; identify CONJUGATE PRIOR families
(Beta-Binomial, Normal-Normal, Gamma-Poisson), computing closed-form posterior mean, variance,
and credible intervals; distinguish a CREDIBLE interval from a frequentist CONFIDENCE interval —
never the same statement; and recognize conjugacy as a computational convenience, never a
requirement for valid Bayesian inference.

## Core Understanding
CONJUGACY GIVES A CLOSED-FORM POSTERIOR, UPDATING PSEUDO-COUNTS DIRECTLY: for $\theta\sim
\text{Beta}(\alpha,\beta)$ (prior) and $k$ heads in $n$ flips (Binomial likelihood), the posterior
is $\theta|k,n\sim\text{Beta}(\alpha+k,\beta+n-k)$ — $\alpha$ counts PSEUDO-successes, $\beta$
counts PSEUDO-failures, and each real observation updates the count directly: $k$ real successes
$\to\alpha+k$. Posterior mean $(\alpha+k)/(\alpha+\beta+n)$ is a weighted average of the prior
mean $\alpha/(\alpha+\beta)$ and the MLE $k/n$; as $n\to\infty$, the posterior mean $\to k/n$ —
data eventually overwhelm any fixed prior. Normal-Normal and Gamma-Poisson follow the identical
pattern (precisions add for Normal-Normal; pseudo-counts accumulate for Gamma-Poisson).

A CREDIBLE INTERVAL IS A DIRECT PROBABILITY STATEMENT ABOUT $\theta$ — A CONFIDENCE INTERVAL IS
NOT: a 95% Bayesian credible interval $[L,U]$ states $P(\theta\in[L,U]|\text{data})=0.95$
DIRECTLY — $\theta$ genuinely has 95% posterior probability of lying in that interval. A
frequentist 95% confidence interval is a property of the PROCEDURE: if the experiment were
repeated many times and the interval recomputed each time, 95% of such intervals would contain
the true (fixed, non-random) $\theta$ — for a frequentist, "the probability $\theta$ is in THIS
specific interval" is 0 or 1, never 0.95. These answer genuinely different questions and are
never interchangeable statements.

CONJUGACY IS A COMPUTATIONAL CONVENIENCE, NEVER A REQUIREMENT: most real models (logistic
regression, neural networks) have NO conjugate prior — the posterior still EXISTS, but lacks a
closed-form expression. MCMC (Markov Chain Monte Carlo) and variational inference approximate or
sample from the posterior directly in these cases; the underlying structure (prior × likelihood
$\to$ posterior) remains identical regardless of whether a closed form exists.

## Mental Models
- **"A prior is a starting count of pseudo-observations — real data simply adds more counts to
  the same running tally, in the Beta-Binomial case literally."**
- **"Credible and confidence intervals share a percentage but answer entirely different
  questions — one is a probability about the parameter, the other a property of a repeated
  procedure."**

## Why Students Fail

### MC-1: PRIOR-IS-ARBITRARY-SO-BAYES-IS-SUBJECTIVE
- **Surface form**: dismisses Bayesian inference as "subjective" because different priors give
  different posteriors, missing that priors can be non-informative, posteriors converge with
  enough data, and all inference requires assumptions.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — "subjective"
  in everyday language means unreliable or biased, but here it refers to incorporating prior
  information, not arbitrary opinion).
- **Repair**: re-anchor on the posterior-convergence formula directly, showing any reasonable
  prior is overwhelmed as $n$ grows.

### MC-2: CONJUGATE-PRIOR-IS-THE-ONLY-VALID-PRIOR
- **Surface form**: uses only conjugate priors because they give closed-form solutions, missing
  that conjugacy is a computational convenience, not a requirement.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — introductory
  courses show only conjugate examples, so the closed-form result is mistaken for necessary).
- **Repair**: re-anchor on the fact that the posterior exists for ANY prior; conjugacy only
  affects whether it has a closed form.

### MC-3: CREDIBLE-INTERVAL-EQUALS-CONFIDENCE-INTERVAL
- **Surface form**: equates a 95% credible interval with a 95% confidence interval, stating
  "there's a 95% chance $\theta$ is in $[L,U]$" for a frequentist confidence interval.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — both are
  called "95% intervals," obscuring the genuinely different interpretations).
- **Repair**: re-anchor on the procedure-versus-parameter distinction directly — the frequentist
  interval is about repeated sampling, never a probability statement about $\theta$ itself.

## Misconceptions

### MC-1: PRIOR-IS-ARBITRARY-SO-BAYES-IS-SUBJECTIVE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: CONJUGATE-PRIOR-IS-THE-ONLY-VALID-PRIOR
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: CREDIBLE-INTERVAL-EQUALS-CONFIDENCE-INTERVAL
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A conjugate prior is a shortcut through the same forest every other prior also has to
  cross — the destination (a genuine posterior) exists for all of them, only the terrain
  differs."**
- **Anti-analogy**: "95% credible" and "95% confidence" are NOT the same claim wearing different
  names — one directly assigns probability to the parameter, the other describes a procedure's
  long-run behavior.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: starting from Beta(2,2) (mild fair-coin bias) and observing
  7 heads in 10 flips gives posterior Beta(9,5), mean $9/14\approx0.643$ — between the prior mean
  0.5 and the MLE 0.70, confirming the prior's influence shrinks as data accumulate rather than
  dominating arbitrarily.
- **Demonstration 2 (targets MC-2)**: a Gamma-Poisson posterior for observed counts $3,1,4,1,5$
  ($n=5,\sum x_i=14$) with prior Gamma(2,1) gives posterior Gamma(16,6), mean $\approx2.67$ — a
  closed form here, but the same prior×likelihood structure applies identically to non-conjugate
  models solved via MCMC instead.
- **Demonstration 3 (targets MC-3)**: a 95% credible interval for $\theta$ directly states
  $P(\theta\in[L,U]|\text{data})=0.95$; the corresponding frequentist confidence interval instead
  guarantees that 95% of INTERVALS constructed this way (across repeated experiments) would
  contain the true fixed $\theta$ — a claim about the procedure, not this specific interval.

## Discovery Questions
1. "Does using a specific prior make Bayesian inference inherently unreliable or biased?"
2. "Is a non-conjugate prior invalid, or just computationally less convenient?"
3. "Does a 95% credible interval mean the same thing as a 95% confidence interval?"

## Teaching Sequence
1. **Representation shift**: work the Beta-Binomial conjugate model in full, connecting directly
   to `math.prob.bayes-theorem`'s own formula.
2. **Conceptual shift**: Demonstration 1's posterior-convergence example, isolating MC-1 by
   showing the prior's diminishing influence as data accumulate.
3. **Pattern induction**: Demonstration 2's Gamma-Poisson generalization, isolating MC-2 by
   confirming the same structure applies whether or not a closed form exists.
4. **Contrast pair**: Demonstration 3's credible-versus-confidence distinction, isolating MC-3 by
   requiring the procedure-versus-parameter distinction stated explicitly.
5. **Mastery gate**: require correctly computed posterior summaries across multiple conjugate
   families, a correct credible-interval interpretation, and a correct posterior-predictive
   computation, at the Blueprint's own stated MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept "Bayesian inference is subjective" without the posterior-convergence
  counterargument.
- Never accept a credible interval described using confidence-interval language ("95% chance the
  true value is in this range, across repeated samples").

## Voice Teaching Notes
- Say "would that prior's influence still matter with a lot more data, or does it fade?"
  whenever the subjectivity objection arises.
- When an interval is interpreted, ask "is that a direct probability about the parameter, or a
  statement about a repeated procedure?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Beta-Binomial (or other conjugate)
  posterior from a stated prior and observed data.
- **Rung 2 (application)**: learner correctly computes and interprets a credible interval,
  distinguishing it from a confidence interval.
- **Rung 3 (transfer)**: learner correctly applies Bayesian updating to a NEW discrete-prior
  scenario (e.g. distinguishing between two candidate models), and correctly reasons about
  non-conjugate priors requiring MCMC.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the posterior-convergence formula directly.
- If MC-2 recurs, re-anchor on the posterior existing for any prior, conjugacy being convenience
  only.
- If MC-3 recurs, re-anchor on the procedure-versus-parameter distinction directly.

## Memory Hooks
- "More data always dilutes the prior's grip — subjectivity fades, it doesn't persist."
- "Conjugacy is convenience, not a requirement — every prior has a posterior somewhere."
- "Credible is about the parameter; confidence is about the procedure — never interchange them."

## Transfer Connections
- `math.prob.bayes-theorem` (already authored, this campaign, Batch 104): supplies the
  $P(\theta|\text{data})\propto P(\text{data}|\theta)P(\theta)$ formula this concept's conjugate
  updates are built from directly.

## Cross-Subject Connections
- None formal (see Curriculum Feedback regarding `math.stats.bayesian-inference`).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.bayesian-inference.md`, reused by
  reference for its Beta-Binomial conjugate derivation, its Normal-Normal and Gamma-Poisson
  extensions, its credible-versus-confidence interval contrast, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own transfer probe, examining posterior
  concentration under the Bernstein-von Mises theorem, Bayes factors versus frequentist p-values
  for model selection, and empirical Bayes as a hyperparameter-estimation compromise.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (third occurrence this campaign)**: the
  Blueprint's own Component 8 states "Mode: Cross-link (cross_links =
  [math.stats.bayesian-inference])," but `math.stats.bayesian-inference` has NO authored
  Educational Brain entry (confirmed via `ls`; the entire `math.stats` domain remains unstarted
  in this campaign). Per the established convention, this entry uses INDEPENDENCE mode instead,
  treating the Blueprint's Bernstein-von Mises/Bayes-factor/empirical-Bayes content as a
  self-contained transfer probe. All other fields (requires `math.prob.bayes-theorem`, unlocks
  none, expert/apply, mastery_threshold 0.75, estimated_hours 8) matched exactly.

## Version History
- 2026-09-18 (Batch 105): authored. First entry this batch. Companion batch concept:
  `math.stats.population-sample` (opening the `math.stats` domain). `math.prob` moves 8/49 →
  **9/49** this batch.
