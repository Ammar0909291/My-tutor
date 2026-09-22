/**
 * Batch: event, bayesian-inference, law-of-unconscious (math.prob).
 *
 * Continues the math.prob domain opened in Batch 96. math.prob.event
 * (requires sample-space, authored Batch 99) unlocks probability-axioms.
 * math.prob.bayesian-inference (requires bayes-theorem, authored Batch 98)
 * and math.prob.law-of-unconscious (requires expected-value, authored
 * Batch 96) are leaf nodes but natural continuations of their respective
 * prerequisite concepts.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{event,
 * bayesian-inference,law-of-unconscious}.md.
 *
 *   EVENT  event — an event is a SUBSET of Ω, never a single outcome (it
 *             can contain zero, one, or many outcomes, gathered by checking
 *             every ω against a condition); the complement Aᶜ=Ω\A is
 *             EVERYTHING remaining, never just "the one opposite outcome";
 *             overlapping events are perfectly VALID — mutual exclusivity
 *             is a special case to CHECK for, never a requirement.
 *   BAYESIAN-INFERENCE  bayesian-inference — conjugacy gives a closed-form
 *             posterior by updating PSEUDO-COUNTS directly, with the
 *             prior's influence shrinking (never persisting) as data
 *             accumulate; a CREDIBLE interval is a direct probability
 *             statement about θ, while a CONFIDENCE interval is a property
 *             of the repeated PROCEDURE — never the same claim; conjugacy
 *             is a computational CONVENIENCE, never a requirement for
 *             valid Bayesian inference.
 *   LAW-OF-UNCONSCIOUS  law-of-unconscious — LOTUS skips finding Y=g(X)'s
 *             own distribution ENTIRELY, computing E[g(X)] directly from
 *             X's own distribution; E[g(X)]≠g(E[X]) in general, only LINEAR
 *             g preserves this equality; LOTUS works for ANY measurable g,
 *             never requiring monotonicity or invertibility the way the
 *             change-of-variable theorem for densities does.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EVENT = 'math.prob.event'
const BAYESIAN_INFERENCE = 'math.prob.bayesian-inference'
const LAW_OF_UNCONSCIOUS = 'math.prob.law-of-unconscious'

export const MATHEMATICS_PROB_EVENT_BAYESIAN_INFERENCE_LAW_OF_UNCONSCIOUS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EVENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'AN EVENT IS A SUBSET, NEVER A SINGLE OUTCOME: an event A is ANY subset of Ω — it can '
      + 'contain 0, 1, or many outcomes. For Ω={1,2,3,4,5,6} (a die roll), the event "even '
      + 'number" is A={2,4,6} — a genuine collection of THREE outcomes, gathered by checking each '
      + 'ω∈Ω against the condition and collecting every one that qualifies, never named as a '
      + 'single representative outcome.\n\n'
      + 'THE COMPLEMENT IS EVERYTHING REMAINING, NOT JUST ONE OUTCOME: Aᶜ=Ω\\A collects EVERY '
      + 'outcome in Ω not in A. For Ω={HH,HT,TH,TT} and A={HH}, Aᶜ={HT,TH,TT} — ALL THREE '
      + 'remaining outcomes, not merely "the one opposite outcome" (TT alone would be wrong). A '
      + 'and Aᶜ always PARTITION Ω: every outcome belongs to exactly one of the two.\n\n'
      + 'OVERLAPPING EVENTS ARE VALID; MUTUAL EXCLUSIVITY IS A SPECIAL CASE, NOT A REQUIREMENT: '
      + 'any subset of Ω is a valid event, and two events can share outcomes freely — A={1,2,3} '
      + 'and B={2,3,4} are both valid events in Ω={1,...,6} even though A∩B={2,3}≠∅. Mutually '
      + 'exclusive events (A∩B=∅, no shared outcomes) are a SPECIAL CASE that must be CHECKED '
      + 'for explicitly, never assumed to hold for every pair of events.',
    targetedMisconceptions: [`${EVENT}:MC-1`, `${EVENT}:MC-2`, `${EVENT}:MC-3`],
    source: eb(EVENT, 'Core Understanding — an event as any subset of Omega never a single outcome, the complement collecting everything remaining never just one opposite-feeling outcome, and overlapping events being valid with mutual exclusivity a special case to check for'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CONJUGACY GIVES A CLOSED-FORM POSTERIOR, UPDATING PSEUDO-COUNTS DIRECTLY: for '
      + 'θ~Beta(α,β) (prior) and k heads in n flips (Binomial likelihood), the posterior is '
      + 'θ|k,n~Beta(α+k,β+n−k) — α counts PSEUDO-successes, β counts PSEUDO-failures, and each '
      + 'real observation updates the count directly. Posterior mean (α+k)/(α+β+n) is a weighted '
      + 'average of the prior mean and the MLE k/n; as n→∞, the posterior mean→k/n — data '
      + 'eventually OVERWHELM any fixed prior.\n\n'
      + 'A CREDIBLE INTERVAL IS A DIRECT PROBABILITY STATEMENT ABOUT θ — A CONFIDENCE INTERVAL '
      + 'IS NOT: a 95% Bayesian credible interval [L,U] states P(θ∈[L,U]|data)=0.95 DIRECTLY — θ '
      + 'genuinely has 95% posterior probability of lying in that interval. A frequentist 95% '
      + 'confidence interval is a property of the PROCEDURE: if the experiment were repeated many '
      + 'times, 95% of such intervals would contain the true (fixed) θ — for a frequentist, "the '
      + 'probability θ is in THIS specific interval" is 0 or 1, never 0.95. These answer '
      + 'genuinely different questions.\n\n'
      + 'CONJUGACY IS A COMPUTATIONAL CONVENIENCE, NEVER A REQUIREMENT: most real models '
      + '(logistic regression, neural networks) have NO conjugate prior — the posterior still '
      + 'EXISTS, but lacks a closed-form expression. MCMC and variational inference approximate '
      + 'or sample from the posterior directly in these cases; the underlying structure (prior × '
      + 'likelihood → posterior) remains identical regardless of whether a closed form exists.',
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-1`, `${BAYESIAN_INFERENCE}:MC-2`, `${BAYESIAN_INFERENCE}:MC-3`],
    source: eb(BAYESIAN_INFERENCE, 'Core Understanding — conjugacy giving a closed-form posterior via pseudo-count updates with the prior overwhelmed as data accumulate, a credible interval being a direct probability statement about theta unlike a confidence interval, and conjugacy as a computational convenience never a requirement'),
  },
  {
    conceptId: LAW_OF_UNCONSCIOUS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'LOTUS SKIPS FINDING THE DISTRIBUTION OF Y=g(X) ENTIRELY — DIRECTLY USING X\'S OWN '
      + 'DISTRIBUTION: for X~Uniform{1,...,6} (a die), computing E[X²] two ways: the HARD route '
      + "finds Y=X²'s distribution first, then E[Y]=∑yP(Y=y)=91/6. LOTUS skips step one "
      + 'entirely: E[X²]=∑x²P(X=x)= the SAME sum, 91/6 — computed directly from X\'s own PMF, '
      + 'never touching P(X²=y) at all. "Unconscious" means forgetting that finding Y\'s '
      + 'distribution was ever a required step.\n\n'
      + 'E[g(X)]≠g(E[X]) IN GENERAL — ONLY LINEAR g PRESERVES THIS EQUALITY: for '
      + 'X~Exponential(λ), E[X]=1/λ. Computing E[X²] via LOTUS gives 2/λ² — NOT (1/λ)²=1/λ². The '
      + 'gap is exactly Var(X)=E[X²]−(E[X])²=1/λ². This equality holds ONLY for linear g(x)=ax+b '
      + '(where E[aX+b]=aE[X]+b is genuinely valid); for nonlinear g, Jensen\'s inequality '
      + 'governs the direction of the gap instead.\n\n'
      + 'LOTUS WORKS FOR ANY MEASURABLE g — NEVER REQUIRING MONOTONICITY OR INVERTIBILITY: '
      + 'unlike the change-of-variable theorem for densities (which genuinely requires g '
      + 'monotone or piecewise monotone to derive f_Y), LOTUS\'s sum or integral ∑g(x)f_X(x) '
      + 'makes sense for ANY function g — monotone, non-monotone, even non-invertible. LOTUS '
      + 'bypasses the change-of-variable machinery entirely, precisely because it never needs '
      + 'f_Y in the first place.',
    targetedMisconceptions: [`${LAW_OF_UNCONSCIOUS}:MC-1`, `${LAW_OF_UNCONSCIOUS}:MC-2`, `${LAW_OF_UNCONSCIOUS}:MC-3`],
    source: eb(LAW_OF_UNCONSCIOUS, 'Core Understanding — LOTUS skipping the distribution of Y=g(X) entirely by using X\'s own distribution directly, E[g(X)] not equaling g(E[X]) except for linear g, and LOTUS working for any measurable g without requiring monotonicity or invertibility'),
  },
]

export const MATHEMATICS_PROB_EVENT_BAYESIAN_INFERENCE_LAW_OF_UNCONSCIOUS_PROBES: SeedProbe[] = [
  {
    conceptId: EVENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For two coin flips with Ω={HH,HT,TH,TT}, the event "at least one head" — is it a single outcome, or a collection of outcomes?',
    choices: [
      { text: 'A collection — checking every outcome against the condition gives {HH,HT,TH} (three outcomes qualify, TT is excluded); an event is a SUBSET of Ω, never a single outcome', isCorrect: true },
      { text: 'A single outcome — "at least one head" refers to one specific representative flip result, such as HH', isCorrect: false, misconceptionId: `${EVENT}:MC-1` },
      { text: 'A single outcome, since events in probability always correspond to exactly one occurrence, matching the everyday meaning of "event"', isCorrect: false, misconceptionId: `${EVENT}:MC-1` },
    ],
    targetedMisconceptions: [`${EVENT}:MC-1`],
    source: eb(EVENT, 'Demonstration 1 — gathering all outcomes qualifying for "at least one head" into the event {HH,HT,TH}, directly breaking event-is-outcome'),
  },
  {
    conceptId: EVENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For Ω={HH,HT,TH,TT} and C={HH,TT}, is the complement Cᶜ just {HT} (the single "opposite" outcome), or something more?',
    choices: [
      { text: 'Something more — Cᶜ=Ω\\C={HT,TH}, ALL remaining outcomes not in C; the complement collects everything left over, never just one "opposite-feeling" outcome', isCorrect: true },
      { text: 'Cᶜ={HT} — the complement names only the single outcome that feels most opposite to the event C', isCorrect: false, misconceptionId: `${EVENT}:MC-2` },
      { text: 'Cᶜ={TH} — the complement is the one specific outcome positioned most differently from the event\'s own outcomes', isCorrect: false, misconceptionId: `${EVENT}:MC-2` },
    ],
    targetedMisconceptions: [`${EVENT}:MC-2`],
    source: eb(EVENT, 'Demonstration 2 — for C={HH,TT}, computing C^c=Omega\\C={HT,TH} as both remaining outcomes, directly breaking event-complement-one-outcome'),
  },
  {
    conceptId: EVENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In Ω={HH,HT,TH,TT}, A={HH,HT} and B={HT,TH} share the outcome HT. Does this overlap disqualify either A or B from being a valid event?',
    choices: [
      { text: 'No — overlapping events are perfectly valid; any subset of Ω is a valid event, and mutual exclusivity (A∩B=∅) is a SPECIAL CASE that must be checked for explicitly, never assumed to hold for every pair', isCorrect: true },
      { text: 'Yes — since A and B share the outcome HT, at least one of them cannot be a genuine event; every outcome must belong to only one event at a time', isCorrect: false, misconceptionId: `${EVENT}:MC-3` },
      { text: 'Yes, because valid events must always partition the sample space into non-overlapping pieces, the same way heads and tails partition a coin flip', isCorrect: false, misconceptionId: `${EVENT}:MC-3` },
    ],
    targetedMisconceptions: [`${EVENT}:MC-3`],
    source: eb(EVENT, 'Demonstration 3 — A={HH,HT} and B={HT,TH} both valid events despite overlapping at HT, directly breaking events-must-partition'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does using a specific prior make Bayesian inference inherently unreliable or "subjective" in a bad sense?',
    choices: [
      { text: 'No — the posterior-convergence formula shows any reasonable prior\'s influence shrinks as data accumulate (posterior mean converges to the MLE as n→∞); "subjective" here means incorporating prior information, not arbitrary bias', isCorrect: true },
      { text: 'Yes — since different priors give different posteriors, Bayesian inference is fundamentally unreliable and its conclusions should not be trusted', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
      { text: 'Yes, because choosing a prior always dominates the final result regardless of how much data is eventually collected', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-1`],
    source: eb(BAYESIAN_INFERENCE, 'Demonstration 1 — starting from Beta(2,2) and observing 7 heads in 10 flips giving a posterior mean between the prior and the MLE, directly breaking prior-is-arbitrary-so-Bayes-is-subjective'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A model like logistic regression has no conjugate prior. Does this mean a valid posterior does not exist for it, or just that it lacks a closed form?',
    choices: [
      { text: 'The posterior still EXISTS — conjugacy is a computational CONVENIENCE, never a requirement; non-conjugate models still have genuine posteriors, just without a closed-form expression, approximated via MCMC or variational inference instead', isCorrect: true },
      { text: 'No valid posterior exists without a conjugate prior — conjugate priors are the only ones that produce mathematically legitimate Bayesian inference', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-2` },
      { text: 'Bayesian inference simply cannot be applied to any model lacking a conjugate prior family', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-2`],
    source: eb(BAYESIAN_INFERENCE, 'Demonstration 2 — the Gamma-Poisson closed form generalizing identically to non-conjugate models solved via MCMC, directly breaking conjugate-prior-is-the-only-valid-prior'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a 95% Bayesian credible interval mean the same thing as a 95% frequentist confidence interval?',
    choices: [
      { text: 'No — a 95% credible interval directly states P(θ∈[L,U]|data)=0.95, a genuine probability about the parameter; a 95% confidence interval is a property of the repeated PROCEDURE (95% of such intervals would contain the true θ across repeated experiments) — never a probability about this specific interval', isCorrect: true },
      { text: 'Yes — both intervals are called "95% intervals" and both directly assign a 95% probability to the parameter lying within the stated range', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-3` },
      { text: 'Yes, since credible and confidence intervals are simply two different names taught in different courses for the identical statistical concept', isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-3`],
    source: eb(BAYESIAN_INFERENCE, 'Demonstration 3 — the credible-interval-versus-confidence-interval contrast (direct parameter probability versus repeated-procedure property), directly breaking credible-interval-equals-confidence-interval'),
  },
  {
    conceptId: LAW_OF_UNCONSCIOUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X~Exponential(λ) with E[X]=1/λ, is E[X²] equal to (E[X])²=1/λ²?',
    choices: [
      { text: 'No — computing E[X²] via LOTUS gives 2/λ², not (1/λ)²=1/λ²; the gap is exactly Var(X)=1/λ², since only LINEAR g preserves E[g(X)]=g(E[X])', isCorrect: true },
      { text: 'Yes — E[g(X)]=g(E[X]) holds for any function g, so squaring the expected value always gives the expected value of the square', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-1` },
      { text: 'Yes, since expectation is a linear operator that always commutes with any transformation applied to the random variable', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-1` },
    ],
    targetedMisconceptions: [`${LAW_OF_UNCONSCIOUS}:MC-1`],
    source: eb(LAW_OF_UNCONSCIOUS, 'Demonstration 1 — the Exponential distribution\'s E[X^2]=2/lambda^2 not equal to (E[X])^2=1/lambda^2, directly breaking E[g(X)]=g(E[X])'),
  },
  {
    conceptId: LAW_OF_UNCONSCIOUS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X~Uniform{1,...,6} (a die), to compute E[X²] via LOTUS, must you first find the distribution of Y=X² (i.e. P(X²=y) for each possible value y)?',
    choices: [
      { text: 'No — LOTUS computes E[X²]=∑x²P(X=x)=91/6 directly from X\'s own PMF, with zero reference to P(X²=y) anywhere; LOTUS skips finding Y\'s distribution entirely', isCorrect: true },
      { text: 'Yes — finding Y=X²\'s own distribution first is a required preliminary step before LOTUS can be applied to compute E[X²]', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-2` },
      { text: 'Yes, since LOTUS is simply another name for the standard change-of-variable procedure that always requires finding f_Y first', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-2` },
    ],
    targetedMisconceptions: [`${LAW_OF_UNCONSCIOUS}:MC-2`],
    source: eb(LAW_OF_UNCONSCIOUS, 'Demonstration 2 — the die example computing E[X^2]=91/6 with zero reference to P(X^2=y), directly breaking LOTUS-requires-knowing-distribution-of-Y'),
  },
  {
    conceptId: LAW_OF_UNCONSCIOUS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does LOTUS require the function g to be monotone or invertible, the way the change-of-variable theorem for densities does?',
    choices: [
      { text: 'No — LOTUS\'s sum or integral ∑g(x)f_X(x) makes sense for ANY measurable g — monotone, non-monotone, even non-invertible; LOTUS bypasses the change-of-variable machinery entirely since it never needs f_Y in the first place', isCorrect: true },
      { text: 'Yes — LOTUS requires g to be monotone or invertible, exactly like the change-of-variable theorem used to derive the density of Y=g(X)', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-3` },
      { text: 'Yes, since without monotonicity the sum or integral defining E[g(X)] would not be well-defined for a general function g', isCorrect: false, misconceptionId: `${LAW_OF_UNCONSCIOUS}:MC-3` },
    ],
    targetedMisconceptions: [`${LAW_OF_UNCONSCIOUS}:MC-3`],
    source: eb(LAW_OF_UNCONSCIOUS, 'Demonstration 3 — LOTUS applied directly to a non-monotone g with no monotonicity check required, directly breaking LOTUS-only-works-for-monotone-g'),
  },
]
