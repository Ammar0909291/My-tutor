/**
 * Batch: bayesian-inference, experimental-design, rao-blackwell
 * (math.stats) — advances the domain from 34/40 to 37/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's mle/sufficient-
 * statistic/nonparametric: bayesian-inference requires math.prob.bayes-
 * theorem + math.stats.mle; experimental-design requires math.stats.
 * sampling + math.stats.anova; rao-blackwell requires math.stats.
 * sufficient-statistic + math.stats.bias-variance — all already authored.
 * Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.stats.bayesian-inference.md,
 * math.stats.experimental-design.md, and math.stats.rao-blackwell.md.
 *
 * Authoring bayesian-inference also unblocks the final 2 math.stats
 * concepts (conjugate-prior, credible-interval), both requiring only
 * bayesian-inference — the next and final batch for this domain.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline (all three EB "expert" difficulty labels do not bump them, per
 * the established convention — their prerequisites stay within the HIGH
 * baseline).
 *
 * All three EB entries register only 2 formal misconceptions each; per
 * this campaign's established convention, each concept's 3rd PROFICIENT
 * probe re-targets one of the two existing misconceptions via a fresh
 * worked example rather than inventing a fake third misconception.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BAYESIAN_INFERENCE = 'math.stats.bayesian-inference'
const EXPERIMENTAL_DESIGN = 'math.stats.experimental-design'
const RAO_BLACKWELL = 'math.stats.rao-blackwell'

export const MATHEMATICS_STATS_BAYESIAN_INFERENCE_EXPERIMENTAL_DESIGN_RAO_BLACKWELL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BAYESIAN AND FREQUENTIST STATISTICS ARE GENUINELY DIFFERENT PHILOSOPHIES — NEVER MERELY '
      + 'DIFFERENT NOTATIONS FOR THE SAME IDEA: Frequentist: θ is a FIXED, unknown constant — it '
      + 'has ONE true value and does NOT have "a probability distribution" of its own. Bayesian: θ '
      + 'is treated as RANDOM, with a probability distribution reflecting belief about its likely '
      + 'value, updated as data arrives. Assuming these two frameworks are just DIFFERENT '
      + 'NOTATIONS for computing the "same underlying thing" misses that they represent GENUINELY '
      + 'DIFFERENT philosophical starting points.\n\n'
      + 'THE POSTERIOR REQUIRES MULTIPLYING BOTH THE PRIOR AND LIKELIHOOD TOGETHER — NEVER EITHER '
      + 'ALONE: for a Beta(2,2) prior on a proportion p, and a single observed Bernoulli success '
      + '(x=1, likelihood L(x|p)=p): posterior ∝ L(x|p)π(p) ∝ p·p(1-p)=p²(1-p) — matching a '
      + 'Beta(3,2) form. Computing the posterior as simply the PRIOR alone (ignoring the likelihood/'
      + 'data) or the LIKELIHOOD alone (ignoring the prior) is WRONG — the posterior genuinely '
      + 'requires MULTIPLYING both together; omitting either piece defeats the entire purpose of '
      + '"updating" prior belief with new data.\n\n'
      + 'CREDIBLE INTERVALS MAKE DIRECT PROBABILITY STATEMENTS; CONFIDENCE INTERVALS NEVER DO: '
      + 'Bayesian: "P(θ∈[a,b]|data)=0.95" — a DIRECT probability statement about where θ likely '
      + 'lies, GIVEN the observed data. Frequentist: "if this procedure were repeated many times, '
      + '95% of the resulting intervals would contain the TRUE (fixed) θ" — an INDIRECT statement '
      + 'about the PROCEDURE\'s long-run behavior, NEVER a direct probability about this specific '
      + 'interval containing θ.',
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-1`, `${BAYESIAN_INFERENCE}:MC-2`],
    source: eb(BAYESIAN_INFERENCE, 'Core Understanding — Bayesian and frequentist statistics being genuinely different philosophies never merely different notations for the same idea, the posterior requiring multiplying both the prior and likelihood together never either alone, and credible intervals making direct probability statements while confidence intervals never do'),
  },
  {
    conceptId: EXPERIMENTAL_DESIGN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'RANDOMIZATION IS WHAT ENABLES CAUSAL CLAIMS — NEVER SOMETHING OBSERVATIONAL DATA CAN '
      + 'SUBSTITUTE FOR: a researcher testing a new fertilizer RANDOMLY assigns half of 100 plots '
      + 'to receive it. Since assignment is RANDOM, any other factor affecting yield (soil quality, '
      + 'sunlight) is, on AVERAGE, equally distributed between groups — ruling out these factors as '
      + 'SYSTEMATIC alternative explanations. Assuming an OBSERVATIONAL study (where farmers CHOOSE '
      + 'whether to use the fertilizer) would support the SAME causal conclusion is WRONG — without '
      + 'random assignment, farmers who CHOOSE the fertilizer might systematically differ in other '
      + 'ways that CONFOUND the fertilizer\'s true effect.\n\n'
      + 'BLOCKING ON A KNOWN NOISE SOURCE IMPROVES PRECISION — NEVER AN OPPORTUNITY TO SKIP WHEN '
      + 'AVAILABLE: for an experiment run across FIVE distinct greenhouse locations (each with its '
      + 'own microclimate): an RCBD (treating "greenhouse location" as a BLOCKING factor) is more '
      + 'appropriate than a simple CRD — since the microclimates are a KNOWN source of variability, '
      + 'blocking by greenhouse REMOVES this noise from the residual variance, making the treatment '
      + 'comparison more PRECISE.\n\n'
      + 'FACTORIAL DESIGNS CAPTURE INTERACTIONS THAT SEPARATE EXPERIMENTS WOULD MISS — NEVER '
      + 'INTERCHANGEABLE WITH RUNNING TWO SINGLE-FACTOR STUDIES: for studying BOTH fertilizer type '
      + 'AND irrigation method\'s effects on crop yield SIMULTANEOUSLY: a factorial design (analyzed '
      + 'via two-way ANOVA) allows testing BOTH main effects AND their INTERACTION in ONE combined '
      + 'experiment — running two SEPARATE single-factor experiments would MISS any interaction '
      + 'effect entirely and would generally require MORE total resources.',
    targetedMisconceptions: [`${EXPERIMENTAL_DESIGN}:MC-1`, `${EXPERIMENTAL_DESIGN}:MC-2`],
    source: eb(EXPERIMENTAL_DESIGN, 'Core Understanding — randomization being what enables causal claims never something observational data can substitute for, blocking on a known noise source improving precision never an opportunity to skip, and factorial designs capturing interactions separate experiments would miss'),
  },
  {
    conceptId: RAO_BLACKWELL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE THEOREM\'S UNBIASEDNESS CONCLUSION REQUIRES AN ALREADY-UNBIASED θ̂ — NEVER APPLIED TO '
      + 'RESCUE A BIASED ONE: given θ̂ unbiased and T sufficient for θ: θ̃=E[θ̂|T] is GUARANTEED '
      + 'unbiased (same as θ̂) AND has MSE ≤ θ̂\'s MSE. Assuming the theorem ALSO guarantees θ̃ '
      + 'unbiased EVEN IF θ̂ ISN\'T (attempting to apply the theorem starting from a BIASED '
      + 'estimator) is WRONG — the unbiasedness conclusion specifically REQUIRES starting from an '
      + 'ALREADY unbiased θ̂; the theorem never magically removes bias from a biased starting '
      + 'estimator.\n\n'
      + '"NO GREATER THAN" INCLUDES EXACT EQUALITY — NEVER A GUARANTEE OF STRICT IMPROVEMENT: if '
      + 'θ̂ is ALREADY a function of the sufficient statistic T alone (i.e. θ̂=g(T)): since θ̂ is '
      + 'already a function of T, conditioning on T changes NOTHING: E[g(T)|T]=g(T)=θ̂ EXACTLY — so '
      + 'θ̃=θ̂, with NO improvement (but also no worsening). Assuming Rao-Blackwellization must '
      + 'ALWAYS produce a STRICTLY better (lower MSE) estimator is WRONG.\n\n'
      + 'RAO-BLACKWELLIZATION IS A SYSTEMATIC IMPROVEMENT RECIPE — NEVER REQUIRING AD HOC '
      + 'CLEVERNESS: given a crude, inefficient unbiased estimator (using just the FIRST '
      + 'observation X1 to estimate a population mean, ignoring the rest of the sample) and knowing '
      + 'the sample MEAN X̄ is sufficient: computing E[X1|X̄] produces a NEW estimator GUARANTEED at '
      + 'least as good as X1 alone — and in this classic case works out to EXACTLY X̄ itself, a '
      + 'dramatic improvement.',
    targetedMisconceptions: [`${RAO_BLACKWELL}:MC-1`, `${RAO_BLACKWELL}:MC-2`],
    source: eb(RAO_BLACKWELL, 'Core Understanding — the theorem\'s unbiasedness conclusion requiring an already-unbiased starting estimator never applied to rescue a biased one, "no greater than" including exact equality never a guarantee of strict improvement, and Rao-Blackwellization being a systematic improvement recipe never requiring ad hoc cleverness'),
  },
]

export const MATHEMATICS_STATS_BAYESIAN_INFERENCE_EXPERIMENTAL_DESIGN_RAO_BLACKWELL_PROBES: SeedProbe[] = [
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are Bayesian and frequentist statistics just two notations for the same underlying idea, or genuinely different philosophies?',
    choices: [
      { text: "Genuinely different philosophies — Frequentist treats θ as a FIXED, unknown constant with one true value and no probability distribution of its own; Bayesian treats θ as RANDOM, with a probability distribution reflecting belief, updated as data arrives; these are different philosophical starting points about what probability means", isCorrect: true },
      { text: "Just two different notations for computing the same underlying quantity", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
      { text: "Since both frameworks ultimately produce an estimate for theta, the underlying computation and interpretation should be equivalent", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-1`],
    source: eb(BAYESIAN_INFERENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether Bayesian and frequentist statistics are just two notations or genuinely different philosophies, an answer of "same notation" confirming BAYESIAN-AND-FREQUENTIST-FRAMEWORKS-TREATED-AS-MERELY-NOTATIONAL-VARIANTS'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can you compute a posterior using only the prior, or only the likelihood, and skip the other?',
    choices: [
      { text: "No — for a Beta(2,2) prior and Bernoulli success (likelihood L(x|p)=p): posterior ∝ p·p(1-p)=p²(1-p), matching a Beta(3,2) form; computing it from the prior alone or likelihood alone is wrong, since the posterior genuinely requires MULTIPLYING both together", isCorrect: true },
      { text: "Yes, the posterior can be computed using only the prior or only the likelihood, skipping the other", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-2` },
      { text: "Since the prior already captures belief about theta, the likelihood is only needed as an occasional sanity check rather than a required multiplicative factor", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-2`],
    source: eb(BAYESIAN_INFERENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether the posterior can be computed using only the prior or only the likelihood, an answer of "yes" confirming POSTERIOR-COMPUTED-USING-ONLY-THE-PRIOR-OR-ONLY-THE-LIKELIHOOD'),
  },
  {
    conceptId: BAYESIAN_INFERENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a 95% confidence interval make the same direct probability claim about θ as a 95% credible interval?',
    choices: [
      { text: "No — a Bayesian credible interval says 'P(θ∈[a,b]|data)=0.95,' a direct probability statement about θ given the data; a frequentist confidence interval says 'if repeated many times, 95% of resulting intervals would contain the true θ,' an indirect statement about the procedure, never a direct probability about this specific interval", isCorrect: true },
      { text: "Yes, a 95% confidence interval makes the exact same direct probability claim about theta as a credible interval", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
      { text: "Since both intervals are computed at the same 95% level, they should be interpreted identically regardless of which framework produced them", isCorrect: false, misconceptionId: `${BAYESIAN_INFERENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${BAYESIAN_INFERENCE}:MC-1`],
    source: eb(BAYESIAN_INFERENCE, 'Discovery Question 3 as a detection probe (verbatim) — whether a confidence interval makes the same direct probability claim as a credible interval, an answer of "yes" re-targeting the frequentist-vs-Bayesian philosophical distinction via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: EXPERIMENTAL_DESIGN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does an observational study, where subjects choose their own treatment, support the same causal conclusion as a randomized experiment?',
    choices: [
      { text: "No — random assignment ensures other factors (soil quality, sunlight) are on average equally distributed between groups, ruling out systematic alternative explanations; in an observational study, farmers who CHOOSE the fertilizer might systematically differ in ways that CONFOUND the true effect, making a causal claim unjustified", isCorrect: true },
      { text: "Yes, an observational study can support the same strength of causal conclusion as a randomized experiment", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-1` },
      { text: "Since both study types collect real data on the outcome of interest, the strength of the causal conclusion should depend only on sample size, not on how treatment was assigned", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPERIMENTAL_DESIGN}:MC-1`],
    source: eb(EXPERIMENTAL_DESIGN, 'Discovery Question 1 as a detection probe (verbatim) — whether an observational study supports the same causal conclusion as a randomized experiment, an answer of "yes" confirming OBSERVATIONAL-NON-RANDOMIZED-DATA-ASSUMED-TO-SUPPORT-THE-SAME-CAUSAL-CONCLUSIONS-AS-RANDOMIZED-EXPERIMENTS'),
  },
  {
    conceptId: EXPERIMENTAL_DESIGN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you know experimental units differ by a specific known factor, should you ignore that and use a simple CRD anyway?',
    choices: [
      { text: "No — for an experiment across FIVE greenhouse locations (each with its own microclimate), an RCBD treating 'greenhouse location' as a blocking factor is more appropriate than a simple CRD, since blocking by the KNOWN source of variability removes this noise from the residual variance, improving precision", isCorrect: true },
      { text: "Yes, a simple CRD should be used even when a known, exploitable source of variability is available to block on", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-2` },
      { text: "Since blocking adds complexity to the design, ignoring a known noise source and using a simpler CRD keeps the analysis cleaner without meaningfully affecting precision", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-2` },
    ],
    targetedMisconceptions: [`${EXPERIMENTAL_DESIGN}:MC-2`],
    source: eb(EXPERIMENTAL_DESIGN, 'Discovery Question 2 as a detection probe (verbatim) — whether a known factor should be ignored in favor of a simple CRD, an answer of "yes" confirming BLOCKING-OPPORTUNITY-ON-A-KNOWN-NOISE-SOURCE-MISSED-IN-FAVOR-OF-A-SIMPLER-CRD'),
  },
  {
    conceptId: EXPERIMENTAL_DESIGN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does running two separate single-factor experiments give you the same information as one factorial design?',
    choices: [
      { text: "No — for studying BOTH fertilizer type AND irrigation method simultaneously, a factorial design (analyzed via two-way ANOVA) tests BOTH main effects AND their interaction in ONE experiment; running two separate single-factor experiments would MISS any interaction effect entirely and generally require MORE total resources", isCorrect: true },
      { text: "Yes, two separate single-factor experiments give you the same information as one combined factorial design", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-1` },
      { text: "Since each single-factor experiment carefully isolates one variable's effect, running two of them should be strictly more informative than combining both factors into one design", isCorrect: false, misconceptionId: `${EXPERIMENTAL_DESIGN}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPERIMENTAL_DESIGN}:MC-1`],
    source: eb(EXPERIMENTAL_DESIGN, 'Discovery Question 3 as a detection probe (verbatim) — whether two separate single-factor experiments give the same information as one factorial design, an answer of "yes" re-targeting the causal/design-structure understanding via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: RAO_BLACKWELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does the Rao-Blackwell theorem's unbiasedness conclusion apply even if you start from a biased estimator?",
    choices: [
      { text: "No — the theorem's unbiasedness conclusion specifically requires an already-unbiased θ̂; given θ̂ unbiased and T sufficient, θ̃=E[θ̂|T] is guaranteed unbiased and has MSE ≤ θ̂'s, but the theorem never magically removes bias from a biased starting estimator", isCorrect: true },
      { text: "Yes, the theorem guarantees unbiasedness for the conditioned estimator even when starting from a biased one", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-1` },
      { text: "Since conditioning on a sufficient statistic generally improves an estimator, it should also be able to correct bias along the way", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-1` },
    ],
    targetedMisconceptions: [`${RAO_BLACKWELL}:MC-1`],
    source: eb(RAO_BLACKWELL, 'Discovery Question 1 as a detection probe (verbatim) — whether the theorem\'s unbiasedness conclusion applies starting from a biased estimator, an answer of "yes" confirming THEOREM-APPLIED-STARTING-FROM-A-BIASED-ESTIMATOR-EXPECTING-UNBIASEDNESS'),
  },
  {
    conceptId: RAO_BLACKWELL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If an estimator is already a function of the sufficient statistic, does Rao-Blackwellizing it still strictly improve it?',
    choices: [
      { text: "No — if θ̂ is already a function of T alone (θ̂=g(T)), conditioning on T changes NOTHING: E[g(T)|T]=g(T)=θ̂ exactly, so θ̃=θ̂ with no improvement (but also no worsening); 'no greater than' includes exact equality, never a guarantee of strict improvement", isCorrect: true },
      { text: "Yes, Rao-Blackwellization always strictly improves the estimator's MSE regardless of its starting form", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-2` },
      { text: "Since the theorem promises the conditioned estimator is 'no worse,' it should always yield a genuinely lower MSE in every case", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-2` },
    ],
    targetedMisconceptions: [`${RAO_BLACKWELL}:MC-2`],
    source: eb(RAO_BLACKWELL, 'Discovery Question 2 as a detection probe (verbatim) — whether Rao-Blackwellizing an estimator already a function of the sufficient statistic still strictly improves it, an answer of "yes" confirming RAO-BLACKWELLIZATION-EXPECTED-TO-ALWAYS-PRODUCE-STRICT-IMPROVEMENT'),
  },
  {
    conceptId: RAO_BLACKWELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does applying Rao-Blackwellization to a crude estimator require new problem-specific cleverness, or is it a mechanical procedure?',
    choices: [
      { text: "A mechanical procedure — given a crude unbiased estimator using just X1 to estimate a population mean, and knowing the sample mean X̄ is sufficient, computing E[X1|X̄] produces a new estimator guaranteed at least as good, working out to exactly X̄ — a systematic recipe, never requiring fresh problem-specific insight", isCorrect: true },
      { text: "It requires new problem-specific cleverness each time; there is no general mechanical procedure", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-2` },
      { text: "Since every estimation problem has its own unique structure, applying the theorem should demand a custom derivation tailored to each specific case", isCorrect: false, misconceptionId: `${RAO_BLACKWELL}:MC-2` },
    ],
    targetedMisconceptions: [`${RAO_BLACKWELL}:MC-2`],
    source: eb(RAO_BLACKWELL, 'Discovery Question 3 as a detection probe (verbatim) — whether Rao-Blackwellization requires new problem-specific cleverness or is a mechanical procedure, an answer requiring fresh cleverness confirming the systematic-recipe half of RAO-BLACKWELLIZATION-EXPECTED-TO-ALWAYS-PRODUCE-STRICT-IMPROVEMENT re-targeted via this EB entry\'s third demonstration, since it registers only 2 formal misconceptions'),
  },
]
