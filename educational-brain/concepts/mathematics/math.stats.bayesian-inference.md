# math.stats.bayesian-inference

## Identity
- **KG id**: `math.stats.bayesian-inference`
- **Domain**: math.stats
- **Requires**: `math.prob.bayes-theorem`, `math.stats.mle`
- **Unlocks**: none
- **Cross-links**: `math.prob.bayesian-inference`
- **Difficulty**: expert
- **Bloom level**: evaluate
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective
State the Bayesian framework's core move — treating $\theta$ ITSELF as RANDOM with a prior
$\pi(\theta)$ — as a GENUINELY different philosophy from frequentist statistics, NEVER just
different notation for the same idea; compute the posterior $\pi(\theta\mid x)\propto
L(x\mid\theta)\pi(\theta)$ as the PRODUCT of prior and likelihood, NEVER either piece alone; and
contrast Bayesian credible intervals' DIRECT probability statements about $\theta$ against
frequentist confidence intervals' INDIRECT statements — never interpreted as equivalent.

## Core Understanding
BAYESIAN AND FREQUENTIST STATISTICS ARE GENUINELY DIFFERENT PHILOSOPHIES — NEVER MERELY
DIFFERENT NOTATIONS FOR THE SAME IDEA: Frequentist: $\theta$ is a FIXED, unknown constant — it has
ONE true value and does NOT have "a probability distribution" of its own. Bayesian: $\theta$ is
treated as RANDOM, with a probability distribution reflecting belief about its likely value,
updated as data arrives. Assuming these two frameworks are just DIFFERENT NOTATIONS for computing
the "same underlying thing" misses that they represent GENUINELY DIFFERENT philosophical starting
points about what probability even MEANS when applied to a parameter.

THE POSTERIOR REQUIRES MULTIPLYING BOTH THE PRIOR AND LIKELIHOOD TOGETHER — NEVER EITHER ALONE:
for a Beta$(2,2)$ prior on a proportion $p$, and a single observed Bernoulli success ($x=1$,
likelihood $L(x\mid p)=p$): posterior $\propto L(x\mid p)\pi(p)\propto p\cdot p(1-p)=p^2(1-p)$ —
matching a Beta$(3,2)$ form. Computing the posterior as simply the PRIOR alone (ignoring the
likelihood/data entirely) or the LIKELIHOOD alone (ignoring the prior) is WRONG — the posterior
genuinely requires MULTIPLYING both together; omitting either piece defeats the entire purpose of
"updating" prior belief with new data.

CREDIBLE INTERVALS MAKE DIRECT PROBABILITY STATEMENTS; CONFIDENCE INTERVALS NEVER DO: contrasting
a 95% Bayesian CREDIBLE interval $[a,b]$ against a 95% frequentist CONFIDENCE interval $[c,d]$ for
the same parameter: Bayesian: "$P(\theta\in[a,b]\mid\text{data})=0.95$" — a DIRECT probability
statement about where $\theta$ likely lies, GIVEN the observed data. Frequentist: "if this
procedure were repeated many times, 95% of the resulting intervals would contain the TRUE (fixed)
$\theta$" — an INDIRECT statement about the PROCEDURE's long-run behavior, NEVER a direct
probability about this specific interval containing $\theta$. Interpreting the frequentist
confidence interval AS IF it made the same direct probability claim as the Bayesian credible
interval is precisely the misinterpretation this contrast is designed to clarify.

## Mental Models
- **"Frequentist θ is a fixed target you can't assign a probability to; Bayesian θ is treated as
  random, carrying its own probability distribution — genuinely different starting points."**
- **"The posterior is prior times likelihood — never one ingredient standing in for the whole
  recipe."**
- **"A credible interval speaks directly about θ; a confidence interval speaks about the
  procedure — never interchangeable claims."**

## Why Students Fail

### MC-1: BAYESIAN-AND-FREQUENTIST-FRAMEWORKS-TREATED-AS-MERELY-NOTATIONAL-VARIANTS
- **Surface form**: treats Bayesian and frequentist statistics as different notations for
  computing the same underlying thing, rather than recognizing they are genuinely different
  philosophical frameworks.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state each framework's treatment of $\theta$ explicitly, side by side.

### MC-2: POSTERIOR-COMPUTED-USING-ONLY-THE-PRIOR-OR-ONLY-THE-LIKELIHOOD
- **Surface form**: computes the posterior distribution using only the prior or only the
  likelihood, omitting the required multiplication of both together.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the posterior explicitly as the product of both pieces.

## Misconceptions

### MC-1: BAYESIAN-AND-FREQUENTIST-FRAMEWORKS-TREATED-AS-MERELY-NOTATIONAL-VARIANTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: POSTERIOR-COMPUTED-USING-ONLY-THE-PRIOR-OR-ONLY-THE-LIKELIHOOD
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Frequentist θ is a hidden treasure buried at one fixed spot — Bayesian θ is a cloud of
  belief you keep reshaping as clues arrive."**
- **Anti-analogy**: computing a posterior from the prior alone is like updating your opinion
  without reading the new evidence — and computing it from the likelihood alone is like ignoring
  everything you believed before the data arrived; neither is genuine updating.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the fixed-versus-random-$\theta$ philosophical contrast.
- **Demonstration 2 (targets MC-2)**: the Beta$(2,2)$-prior-times-Bernoulli-likelihood posterior
  computation.
- **Demonstration 3**: the credible-interval-versus-confidence-interval direct-versus-indirect
  contrast.

## Discovery Questions
1. "Are Bayesian and frequentist statistics just two notations for the same underlying idea, or
   genuinely different philosophies?"
2. "Can you compute a posterior using only the prior, or only the likelihood, and skip the
   other?"
3. "Does a 95% confidence interval make the same direct probability claim about θ as a 95%
   credible interval?"

## Teaching Sequence
1. **Contrast pair**: the fixed-versus-random-$\theta$ philosophical distinction, working
   Demonstration 1, isolating MC-1.
2. **Conceptual shift**: the prior-times-likelihood posterior derivation, working Demonstration
   2, isolating MC-2.
3. **Reused procedure**: the credible-versus-confidence-interval interpretation contrast, working
   Demonstration 3.
4. **Mastery gate**: require a correct statement of the Bayesian-versus-frequentist philosophical
   distinction, a correct posterior computation as prior times likelihood, and a correct
   explanation of the credible-versus-confidence-interval interpretive difference, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept Bayesian and frequentist statistics treated as merely notational variants.
- Never accept a posterior computed using only the prior or only the likelihood.
- Never accept a frequentist confidence interval interpreted as making the same direct
  probability claim as a Bayesian credible interval.

## Voice Teaching Notes
- Say "is θ being treated as fixed, or as random with its own distribution here?" whenever the
  two frameworks are being contrasted.
- Ask "did you multiply the prior and the likelihood, or use just one of them?" whenever a
  posterior is being computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the fundamental philosophical difference
  between Bayesian and frequentist treatment of $\theta$.
- **Rung 2 (application)**: learner correctly computes an unnormalized posterior as the product
  of a given prior and likelihood.
- **Rung 3 (transfer)**: learner correctly explains what a Bayesian credible interval directly
  tells a data scientist that a frequentist confidence interval technically does not, in a
  click-through-rate scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state each framework's treatment of $\theta$ explicitly, side by side.
- If MC-2 recurs, re-derive the posterior explicitly as the product of both pieces.

## Memory Hooks
- "Frequentist θ is fixed; Bayesian θ is random — genuinely different starting points, never
  the same idea in different notation."
- "Posterior is prior times likelihood — never one alone."
- "Credible intervals speak directly about θ; confidence intervals speak about the procedure."

## Transfer Connections
- `math.prob.bayes-theorem` (already authored, certified domain): supplies the mathematical tool
  underlying the posterior computation.
- `math.stats.mle` (already authored, this campaign, Batch 206): supplies the likelihood function
  this framework reuses and reweights by the prior.
- `math.prob.bayesian-inference` (cross-link; already authored): supplies the related
  probability-side treatment of Bayesian updating this concept's statistics-side framework
  connects to.

## Cross-Subject Connections
- A/B testing and data science: sequentially updating a belief about a website button's
  click-through rate as new data arrives is one of the most natural, common real-world
  applications of Bayesian reasoning.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.bayesian-inference.md`, reused by
  reference for its fixed-versus-random-$\theta$ contrast, its Beta-prior posterior computation,
  its credible-versus-confidence-interval contrast, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a data scientist estimating a
  website button's click-through rate using a Bayesian prior updated with observed click data.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.bayes-theorem`/`math.stats.mle`, unlocks none, cross_links
  `math.prob.bayesian-inference`, expert/evaluate, mastery_threshold 0.75, estimated_hours 8)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 215): authored. First entry this batch. Companion batch concept:
  `math.prob.marginal-distribution`.
