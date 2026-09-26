/**
 * Batch: bias-variance, p-value, power (math.stats) — advances the domain
 * from 25/40 to 28/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's anova/type-errors/
 * test-statistic: bias-variance requires math.stats.estimator; p-value
 * requires math.stats.test-statistic; power requires math.stats.type-
 * errors — all already authored. Transcribed from their frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.stats.bias-variance.md, math.stats.p-value.md, and
 * math.stats.power.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline and all prerequisites' own HIGH band.
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

const BIAS_VARIANCE = 'math.stats.bias-variance'
const P_VALUE = 'math.stats.p-value'
const POWER = 'math.stats.power'

export const MATHEMATICS_STATS_BIAS_VARIANCE_P_VALUE_POWER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIAS_VARIANCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BIAS AND VARIANCE ANSWER GENUINELY DIFFERENT QUESTIONS — NEVER THE SAME QUANTITY: for an '
      + 'estimator with E[θ̂]=5.2 when the true parameter is θ=5, and Var(θ̂)=0.09: Bias=5.2-5=0.2 '
      + '(how far the estimator\'s AVERAGE is from the truth), while the variance 0.09 separately '
      + 'measures how SPREAD OUT individual estimates are AROUND that average. Computing "bias" as '
      + 'simply the variance or some other spread measure conflates two entirely different '
      + 'concepts.\n\n'
      + 'MSE REQUIRES SQUARING THE BIAS BEFORE ADDING VARIANCE — NEVER ADDING THEM DIRECTLY: for '
      + 'bias=0.2 and variance=0.09: MSE=(0.2)²+0.09=0.04+0.09=0.13. Computing MSE as simply BIAS '
      + 'plus VARIANCE without squaring first gives the WRONG value 0.2+0.09=0.29 — the '
      + 'decomposition specifically requires SQUARING the bias term before adding it to the '
      + 'variance, never a bare linear sum.\n\n'
      + 'AN UNBIASED ESTIMATOR CAN HAVE WORSE MSE THAN A BIASED ONE — NEVER ASSUME UNBIASED MEANS '
      + 'BEST: Estimator A (unbiased, bias=0, variance=1.0) has MSE=0+1.0=1.0. Estimator B '
      + '(slightly biased, bias=0.3, variance=0.2) has MSE=(0.3)²+0.2=0.09+0.2=0.29 — genuinely '
      + 'LOWER than Estimator A\'s, despite B being biased and A being perfectly unbiased. Assuming '
      + 'an UNBIASED estimator must always be preferable ignores that variance matters equally — '
      + 'the FULL MSE, accounting for both terms, is the complete measure of estimator quality, '
      + 'never bias alone.',
    targetedMisconceptions: [`${BIAS_VARIANCE}:MC-1`, `${BIAS_VARIANCE}:MC-2`],
    source: eb(BIAS_VARIANCE, 'Core Understanding — bias and variance answering genuinely different questions never the same quantity, MSE requiring squaring the bias before adding variance never adding them directly, and an unbiased estimator being able to have worse MSE than a biased one never assume unbiased means best'),
  },
  {
    conceptId: P_VALUE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE P-VALUE CONDITIONS ON H0, COMPUTING A PROBABILITY ABOUT THE DATA — NEVER THE REVERSE: '
      + 'for p=0.03: this means "ASSUMING H0 is true, the probability of observing a test statistic '
      + 'at least this extreme is 0.03" — a conditional probability about the DATA, given H0. '
      + 'Stating "the probability that H0 is true is 0.03" REVERSES the conditioning entirely: the '
      + 'p-value conditions ON H0 (computing something about the data), while that incorrect claim '
      + 'would require conditioning ON the data to compute something about H0 — an entirely '
      + 'different Bayesian calculation the p-value simply never performs.\n\n'
      + 'A LARGE P-VALUE MEANS INSUFFICIENT EVIDENCE — NEVER PROOF THAT H0 IS TRUE: for p=0.08 '
      + 'against α=0.05: since 0.08>0.05, FAIL TO REJECT H0 — this does NOT mean H0 has been '
      + 'proven true, only that this particular data doesn\'t provide sufficiently strong evidence '
      + 'against it at the chosen threshold. Interpreting "fail to reject" as "H0 is confirmed '
      + 'true" or "there is no effect" overstates what the test actually established.\n\n'
      + 'THE P-VALUE IS NEVER P(H0 TRUE) — A FUNDAMENTALLY DIFFERENT, BAYESIAN QUANTITY: for '
      + 'p=0.03, the WRONG interpretation "there\'s a 3% chance H0 is true" treats the p-value as a '
      + 'probability ABOUT H0, which frequentist statistics does not compute — that would require a '
      + 'PRIOR probability on H0 and Bayes\' theorem, tools the p-value framework simply doesn\'t '
      + 'use. The CORRECT interpretation: "IF H0 were true, there would be only a 3% chance of '
      + 'observing data this extreme (or more extreme)" — a statement about how SURPRISING the '
      + 'DATA would be under H0, NEVER a direct probability statement about H0 itself.',
    targetedMisconceptions: [`${P_VALUE}:MC-1`, `${P_VALUE}:MC-2`],
    source: eb(P_VALUE, 'Core Understanding — the p-value conditioning on H0 and computing a probability about the data never the reverse, a large p-value meaning insufficient evidence never proof that H0 is true, and the p-value never being P(H0 true) since that is a fundamentally different Bayesian quantity'),
  },
  {
    conceptId: POWER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'POWER IS DIRECTLY 1-β — NEVER A SEPARATELY COMPUTED, UNRELATED QUANTITY: given β=0.2 for a '
      + 'test scenario, power=1-0.2=0.8 (80%) — power and β are NOT two independent numbers '
      + 'requiring separate derivation; once one is known, the other follows IMMEDIATELY by this '
      + 'direct relationship. Treating power as something requiring its own separate calculation, '
      + 'unconnected to β, misses that they are literally complementary probabilities of the same '
      + 'random event (correctly detecting H1 versus failing to detect it).\n\n'
      + 'EVERY POWER-INCREASING FACTOR CARRIES ITS OWN GENUINE TRADEOFF — NEVER A COST-FREE '
      + 'IMPROVEMENT: three factors increase power — larger SAMPLE SIZE n (costs more time/'
      + 'resources to collect), larger EFFECT SIZE (a property of REALITY, not something a '
      + 'researcher can simply choose to increase), and larger α (a more lenient threshold, but '
      + 'this DIRECTLY increases the Type I error rate — more false positives). Recommending "just '
      + 'increase α" to boost power without naming the corresponding rise in false-positive risk '
      + 'misses that EVERY lever here has a real cost — never a free lunch.\n\n'
      + 'POWER ANALYSIS IS A PRE-STUDY PLANNING TOOL — NEVER A POST-HOC JUSTIFICATION: a researcher '
      + 'who finds a NON-significant result and THEN computes "post-hoc power" using the observed '
      + 'effect size FROM THAT SAME STUDY, arguing "our power was low, so the non-significant '
      + 'result doesn\'t mean much," is using a mathematically near-direct function of the p-value '
      + 'itself — providing NO genuinely new information. Genuine power analysis uses an ASSUMED '
      + '(not-yet-observed) effect size, conducted BEFORE data collection, to determine an '
      + 'appropriate sample size in advance.',
    targetedMisconceptions: [`${POWER}:MC-1`, `${POWER}:MC-2`],
    source: eb(POWER, 'Core Understanding — power being directly 1 minus beta never a separately computed unrelated quantity, every power-increasing factor carrying its own genuine tradeoff never a cost-free improvement, and power analysis being a pre-study planning tool never a post-hoc justification'),
  },
]

export const MATHEMATICS_STATS_BIAS_VARIANCE_P_VALUE_POWER_PROBES: SeedProbe[] = [
  {
    conceptId: BIAS_VARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are bias and variance the same quantity, or do they measure two different things about an estimator?',
    choices: [
      { text: "Two different things — for an estimator with E[θ̂]=5.2 when θ=5, and Var(θ̂)=0.09: Bias=5.2-5=0.2 measures how far the estimator's average is from the truth, while variance=0.09 separately measures how spread out individual estimates are around that average", isCorrect: true },
      { text: "Bias and variance are the same quantity, just computed with different formulas", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-1` },
      { text: "Since both describe some form of 'error' in an estimator, they should be interchangeable measures of the same underlying property", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${BIAS_VARIANCE}:MC-1`],
    source: eb(BIAS_VARIANCE, 'Discovery Question 1 as a detection probe (verbatim) — whether bias and variance are the same quantity or measure two different things, an answer of "same quantity" confirming BIAS-AND-VARIANCE-CONFLATED-AS-THE-SAME-QUANTITY'),
  },
  {
    conceptId: BIAS_VARIANCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When computing MSE, do you add bias and variance directly, or square the bias first?',
    choices: [
      { text: "Square the bias first — for bias=0.2 and variance=0.09: MSE=(0.2)²+0.09=0.13; adding them directly without squaring gives the wrong value 0.2+0.09=0.29, since the decomposition specifically requires squaring the bias term first", isCorrect: true },
      { text: "Add bias and variance directly, without squaring the bias first", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-2` },
      { text: "Since bias and variance are both measured in the same units as the parameter, adding them directly should give a valid combined error measure", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${BIAS_VARIANCE}:MC-2`],
    source: eb(BIAS_VARIANCE, 'Discovery Question 2 as a detection probe (verbatim) — whether MSE adds bias and variance directly or squares the bias first, an answer favoring direct addition confirming MSE-COMPUTED-BY-ADDING-BIAS-AND-VARIANCE-WITHOUT-SQUARING-THE-BIAS'),
  },
  {
    conceptId: BIAS_VARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can a biased estimator ever have lower overall error (MSE) than an unbiased one?',
    choices: [
      { text: "Yes — Estimator A (unbiased, bias=0, variance=1.0) has MSE=1.0, while Estimator B (biased=0.3, variance=0.2) has MSE=(0.3)²+0.2=0.29, genuinely LOWER despite B being biased; the full MSE accounts for both terms, never bias alone", isCorrect: true },
      { text: "No, an unbiased estimator always has lower or equal MSE compared to any biased estimator", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-1` },
      { text: "Since unbiasedness means the estimator is 'correct on average,' it should always be the more accurate choice overall", isCorrect: false, misconceptionId: `${BIAS_VARIANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${BIAS_VARIANCE}:MC-1`],
    source: eb(BIAS_VARIANCE, 'Discovery Question 3 as a detection probe (verbatim) — whether a biased estimator can ever have lower MSE than an unbiased one, an answer of "no" re-targeting the deeper bias/variance conflation via the "unbiased must be best" pattern, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: P_VALUE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a p-value of 0.03 describe a probability about the data, or a probability about H0?',
    choices: [
      { text: "A probability about the data — p=0.03 means 'ASSUMING H0 is true, the probability of observing a test statistic at least this extreme is 0.03,' a conditional probability about the DATA given H0, never the reverse", isCorrect: true },
      { text: "A probability about H0 — the p-value directly tells you the probability that H0 is true", isCorrect: false, misconceptionId: `${P_VALUE}:MC-1` },
      { text: "Since the p-value is computed in the context of testing H0, it should naturally describe H0's own probability of being true", isCorrect: false, misconceptionId: `${P_VALUE}:MC-1` },
    ],
    targetedMisconceptions: [`${P_VALUE}:MC-1`],
    source: eb(P_VALUE, 'Discovery Question 1 as a detection probe (verbatim) — whether a p-value describes a probability about the data or about H0, an answer of "about H0" confirming P-VALUE-DEFINITION-CONDITIONING-REVERSED'),
  },
  {
    conceptId: P_VALUE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If p=0.08 and α=0.05, does failing to reject H0 mean H0 has been proven true?',
    choices: [
      { text: "No — since 0.08>0.05, FAIL TO REJECT H0, but this does not mean H0 has been proven true, only that this particular data doesn't provide sufficiently strong evidence against it at the chosen threshold; genuine uncertainty remains", isCorrect: true },
      { text: "Yes, failing to reject H0 when p=0.08 against α=0.05 means H0 has been proven true", isCorrect: false, misconceptionId: `${P_VALUE}:MC-2` },
      { text: "Since the test found no significant evidence against H0, that outcome should count as confirming H0 is correct", isCorrect: false, misconceptionId: `${P_VALUE}:MC-2` },
    ],
    targetedMisconceptions: [`${P_VALUE}:MC-2`],
    source: eb(P_VALUE, 'Discovery Question 2 as a detection probe (verbatim) — whether failing to reject H0 with p=0.08 against alpha=0.05 means H0 has been proven true, an answer of "yes" confirming P-VALUE-INTERPRETED-AS-THE-PROBABILITY-THAT-H0-IS-TRUE\'s underlying overconfidence pattern'),
  },
  {
    conceptId: P_VALUE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is 'there's a 3% chance H0 is true' a correct way to describe p=0.03?",
    choices: [
      { text: "No — the correct interpretation is 'IF H0 were true, there would be only a 3% chance of observing data this extreme (or more extreme)'; treating the p-value as a probability ABOUT H0 requires a prior probability and Bayes' theorem, tools the frequentist p-value framework simply doesn't use", isCorrect: true },
      { text: "Yes, 'there's a 3% chance H0 is true' is a correct way to describe p=0.03", isCorrect: false, misconceptionId: `${P_VALUE}:MC-2` },
      { text: "Since the p-value quantifies how unlikely the null hypothesis scenario is, restating it directly as the probability H0 is true should be a reasonable simplification", isCorrect: false, misconceptionId: `${P_VALUE}:MC-2` },
    ],
    targetedMisconceptions: [`${P_VALUE}:MC-2`],
    source: eb(P_VALUE, 'Discovery Question 3 as a detection probe (verbatim) — whether "there\'s a 3% chance H0 is true" correctly describes p=0.03, an answer of "yes" confirming P-VALUE-INTERPRETED-AS-THE-PROBABILITY-THAT-H0-IS-TRUE'),
  },
  {
    conceptId: POWER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you know β for a test, do you need a separate calculation to find its power, or does it follow immediately?',
    choices: [
      { text: "It follows immediately — given β=0.2, power=1-0.2=0.8; power and β are not two independent numbers requiring separate derivation, they are complementary probabilities of the same random event (correctly detecting H1 versus failing to detect it)", isCorrect: true },
      { text: "You need a separate, independent calculation to find power, unrelated to β", isCorrect: false, misconceptionId: `${POWER}:MC-1` },
      { text: "Since power and beta describe different aspects of the test's performance, they should each require their own distinct formula and computation", isCorrect: false, misconceptionId: `${POWER}:MC-1` },
    ],
    targetedMisconceptions: [`${POWER}:MC-1`],
    source: eb(POWER, 'Discovery Question 1 as a detection probe (verbatim) — whether power requires a separate calculation from beta or follows immediately, an answer requiring separate computation confirming POWER-AND-BETA-TREATED-AS-UNRELATED-QUANTITIES-REQUIRING-SEPARATE-COMPUTATION'),
  },
  {
    conceptId: POWER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is raising α to boost power a cost-free improvement, or does it come with a tradeoff?',
    choices: [
      { text: "It comes with a tradeoff — a larger α is a more lenient threshold that DIRECTLY increases the Type I error rate (more false positives); every power-increasing factor (larger n, larger effect size, larger α) carries its own genuine cost, never a free lunch", isCorrect: true },
      { text: "Raising alpha to boost power is a cost-free improvement with no accompanying downside", isCorrect: false, misconceptionId: `${POWER}:MC-2` },
      { text: "Since raising alpha only affects the decision threshold, it should improve power without any negative side effects on the test's error rates", isCorrect: false, misconceptionId: `${POWER}:MC-2` },
    ],
    targetedMisconceptions: [`${POWER}:MC-2`],
    source: eb(POWER, 'Discovery Question 2 as a detection probe (verbatim) — whether raising alpha to boost power is cost-free or comes with a tradeoff, an answer of "cost-free" confirming POWER-INCREASING-ACTIONS-ASSUMED-COST-FREE-WITHOUT-RECOGNIZING-THEIR-TRADEOFFS'),
  },
  {
    conceptId: POWER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is computing "power" after already seeing a non-significant result the same as genuine power analysis done before the study?',
    choices: [
      { text: "No — a researcher who finds a non-significant result and THEN computes 'post-hoc power' using the SAME data's observed effect size is using a near-direct function of the p-value itself, providing no genuinely new information; genuine power analysis uses an assumed effect size, conducted BEFORE data collection", isCorrect: true },
      { text: "Yes, post-hoc power computed after seeing a non-significant result is methodologically equivalent to pre-study power analysis", isCorrect: false, misconceptionId: `${POWER}:MC-2` },
      { text: "Since power is defined the same mathematical way regardless of when it's computed, calculating it after the study should be just as informative", isCorrect: false, misconceptionId: `${POWER}:MC-2` },
    ],
    targetedMisconceptions: [`${POWER}:MC-2`],
    source: eb(POWER, 'Discovery Question 3 as a detection probe (verbatim) — whether post-hoc power computed after a non-significant result is the same as genuine pre-study power analysis, an answer of "yes" confirming the post-hoc-vs-pre-study half of POWER-INCREASING-ACTIONS-ASSUMED-COST-FREE-WITHOUT-RECOGNIZING-THEIR-TRADEOFFS, re-targeted via this EB entry\'s third demonstration since it registers only 2 formal misconceptions'),
  },
]
