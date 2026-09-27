/**
 * Batch: conjugate-prior, credible-interval, multiple-regression
 * (math.stats) — the FINAL batch in this campaign's math.stats domain,
 * closing it to 40/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's bayesian-inference:
 * conjugate-prior and credible-interval both require only bayesian-
 * inference (just authored); multiple-regression requires math.stats.
 * linear-regression + math.linalg.matrix-multiplication + math.linalg.
 * matrix-inverse — all already authored. Transcribed from their frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.stats.conjugate-prior.md, math.stats.credible-interval.md, and
 * math.stats.multiple-regression.md.
 *
 * Grade band: multiple-regression uses GradeBand.UNDERGRADUATE, matching
 * its math.linalg.matrix-inverse/matrix-multiplication prerequisites' own
 * band (same bump as linear-regression, its own direct prerequisite).
 * conjugate-prior and credible-interval use GradeBand.HIGH, matching
 * bayesian-inference's own band and math.stats' established baseline.
 *
 * All three EB entries register only 2 formal misconceptions each; per
 * this campaign's established convention, each concept's 3rd PROFICIENT
 * probe re-targets one of the two existing misconceptions via a fresh
 * worked example rather than inventing a fake third misconception.
 *
 * With this batch, math.stats reaches 40/40 — DOMAIN COMPLETE.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONJUGATE_PRIOR = 'math.stats.conjugate-prior'
const CREDIBLE_INTERVAL = 'math.stats.credible-interval'
const MULTIPLE_REGRESSION = 'math.stats.multiple-regression'

export const MATHEMATICS_STATS_CONJUGATE_PRIOR_CREDIBLE_INTERVAL_MULTIPLE_REGRESSION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONJUGATE_PRIOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE BETA-BINOMIAL UPDATE ADDS SUCCESSES TO α AND FAILURES (NEVER TOTAL TRIALS) TO β: for a '
      + 'Beta(2,3) prior on p, observing 7 successes out of 10 trials: posterior = '
      + 'Beta(2+7,3+(10-7))=Beta(9,6). Adding the TOTAL number of trials n (rather than '
      + 'specifically the FAILURES, n-k) to β — computing Beta(2+7,3+10)=Beta(9,13) instead — is '
      + 'WRONG; the update rule specifically requires adding SUCCESSES to α and FAILURES (not '
      + 'total trials) to β.\n\n'
      + 'CONJUGATE MEANS SAME FAMILY, UPDATED PARAMETERS — NEVER A DIFFERENT DISTRIBUTIONAL FORM: '
      + 'the posterior Beta(9,6) is genuinely the SAME distributional FAMILY (Beta) as the prior '
      + 'Beta(2,3), just with DIFFERENT parameters. This IS exactly what "conjugate" means — the '
      + 'mathematical FORM stays Beta throughout, with only the parameters shifting to reflect the '
      + 'newly observed data, which is precisely why NO fresh integration was needed to derive '
      + 'this result.\n\n'
      + 'CHOOSING A CONJUGATE PRIOR FOR CONVENIENCE IS A LEGITIMATE TRADEOFF — NEVER '
      + 'METHODOLOGICALLY ILLEGITIMATE: a statistician chooses a Beta prior for a proportion PARTLY '
      + 'because of its mathematical convenience, even though their TRUE prior belief might be '
      + 'better represented by some other, non-conjugate distribution shape. Conjugate priors '
      + 'offer substantial COMPUTATIONAL convenience (closed-form posteriors, no numerical '
      + 'integration) — this is a LEGITIMATE, practical reason for choosing a conjugate family, '
      + 'never a shortcut that undermines validity.',
    targetedMisconceptions: [`${CONJUGATE_PRIOR}:MC-1`, `${CONJUGATE_PRIOR}:MC-2`],
    source: eb(CONJUGATE_PRIOR, 'Core Understanding — the Beta-Binomial update adding successes to alpha and failures never total trials to beta, conjugate meaning the same family with updated parameters never a different distributional form, and choosing a conjugate prior for convenience being a legitimate tradeoff never methodologically illegitimate'),
  },
  {
    conceptId: CREDIBLE_INTERVAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A CREDIBLE INTERVAL IS A DIRECT PROBABILITY STATEMENT — NEVER FREQUENTIST PROCEDURAL '
      + 'LANGUAGE: for a posterior giving a 95% credible interval [0.3,0.5] on a proportion p: it '
      + 'means given the observed data, there is a 95% probability that the TRUE proportion p lies '
      + 'between 0.3 and 0.5. Interpreting this the SAME way one would (incorrectly) interpret a '
      + 'frequentist confidence interval — "if we repeated this experiment many times, 95% of such '
      + 'intervals would contain p" — is WRONG; the credible interval\'s actual meaning is a DIRECT '
      + 'probability statement about θ itself, given THIS specific data.\n\n'
      + 'CREDIBLE AND CONFIDENCE INTERVALS ARE GENUINELY DIFFERENT PROBABILITY CLAIMS — NEVER '
      + 'INTERCHANGEABLE: credible interval: "P(θ∈[a,b]|data)=0.95" — directly about θ\'s likely '
      + 'location. Confidence interval: "if this exact procedure were repeated many times with '
      + 'fresh data, 95% of the resulting intervals would contain the TRUE θ" — a statement about '
      + 'the PROCEDURE\'s long-run behavior, NEVER this specific interval.\n\n'
      + 'THE HPD INTERVAL IS THE NARROWEST CREDIBLE INTERVAL, COINCIDING WITH EQUAL-TAILED ONLY '
      + 'FOR SYMMETRIC POSTERIORS — NEVER ALWAYS: for a SYMMETRIC (unimodal, bell-shaped) '
      + 'posterior, the highest-density region naturally forms a SYMMETRIC interval around the '
      + 'center — matching the equal-tailed approach EXACTLY. For a SKEWED posterior, the '
      + 'highest-density region is NOT symmetric — the HPD interval would be NARROWER than the '
      + 'equal-tailed interval. Assuming the equal-tailed credible interval is ALWAYS identical to '
      + 'the HPD interval regardless of the posterior\'s shape is WRONG.',
    targetedMisconceptions: [`${CREDIBLE_INTERVAL}:MC-1`, `${CREDIBLE_INTERVAL}:MC-2`],
    source: eb(CREDIBLE_INTERVAL, 'Core Understanding — a credible interval being a direct probability statement never frequentist procedural language, credible and confidence intervals being genuinely different probability claims never interchangeable, and the HPD interval being the narrowest credible interval coinciding with equal-tailed only for symmetric posteriors'),
  },
  {
    conceptId: MULTIPLE_REGRESSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE MATRIX OLS SOLUTION REQUIRES THE CORRECT OPERATION SEQUENCE WITH COMPATIBLE '
      + 'DIMENSIONS — NEVER Xy OR X⁻¹y DIRECTLY: for a model with 2 predictors (plus intercept), '
      + 'n=50: X is 50×3, Xᵀ is 3×50, XᵀX is 3×3 (a SQUARE matrix, genuinely invertible if '
      + 'predictors aren\'t perfectly collinear), β̂ is 3×1. Confusing the matrix DIMENSIONS (e.g. '
      + 'attempting Xy directly, which isn\'t even dimension-compatible, or X⁻¹y, which requires X '
      + 'to be square, which it generally isn\'t) is WRONG — the specific operations (transpose, '
      + 'multiply, invert, multiply again) must be applied in the CORRECT order: (XᵀX)⁻¹Xᵀy, never '
      + 'a shortcut.\n\n'
      + 'THE OVERALL F-TEST AND INDIVIDUAL t-TESTS ANSWER GENUINELY DIFFERENT QUESTIONS — NEVER '
      + 'ASSUMED TO ALWAYS AGREE: a regression with 5 predictors has a SIGNIFICANT overall F-test '
      + '(p<0.001), but only 2 of the 5 individual predictors\' t-tests are significant. This is '
      + 'NOT a contradiction: the overall F-test confirms the predictors, taken TOGETHER, explain '
      + 'significant variance — but this doesn\'t require EVERY individual predictor to contribute '
      + 'significantly ON ITS OWN once the others are accounted for (some predictors may be '
      + 'REDUNDANT with each other).\n\n'
      + 'MULTICOLLINEARITY CORRUPTS INDIVIDUAL COEFFICIENTS — NEVER NECESSARILY THE MODEL\'S '
      + 'OVERALL PREDICTIVE VALIDITY: a model with two highly correlated predictors ("height in '
      + 'inches" and "height in centimeters," essentially the SAME thing) produces wildly unstable '
      + 'individual coefficient estimates despite the model\'s overall R² and F-test looking '
      + 'perfectly reasonable. The COMBINED contribution is stable (explaining the good overall '
      + 'fit), but the SPLIT between individual coefficients becomes unstable. Concluding the '
      + 'ENTIRE model is unreliable because of unstable individual coefficients is WRONG.',
    targetedMisconceptions: [`${MULTIPLE_REGRESSION}:MC-1`, `${MULTIPLE_REGRESSION}:MC-2`],
    source: eb(MULTIPLE_REGRESSION, 'Core Understanding — the matrix OLS solution requiring the correct operation sequence with compatible dimensions never Xy or X-inverse-y directly, the overall F-test and individual t-tests answering genuinely different questions never assumed to always agree, and multicollinearity corrupting individual coefficients never necessarily the model\'s overall predictive validity'),
  },
]

export const MATHEMATICS_STATS_CONJUGATE_PRIOR_CREDIBLE_INTERVAL_MULTIPLE_REGRESSION_PROBES: SeedProbe[] = [
  {
    conceptId: CONJUGATE_PRIOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When updating a Beta prior with Binomial data, do you add the total number of trials or just the failures to β?',
    choices: [
      { text: "Just the failures — for a Beta(2,3) prior observing 7 successes out of 10 trials: posterior = Beta(2+7,3+(10-7))=Beta(9,6); adding the total trials n=10 instead (giving Beta(9,13)) is wrong, since the update rule specifically requires adding FAILURES, not total trials, to β", isCorrect: true },
      { text: "The total number of trials, n, should be added to β", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-1` },
      { text: "Since every trial contributes information regardless of outcome, all n trials should be added to whichever parameter tracks the 'other' outcome", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-1` },
    ],
    targetedMisconceptions: [`${CONJUGATE_PRIOR}:MC-1`],
    source: eb(CONJUGATE_PRIOR, 'Discovery Question 1 as a detection probe (verbatim) — whether the total trials or just the failures are added to beta in a Beta-Binomial update, an answer of "total trials" confirming BETA-BINOMIAL-UPDATE-ADDS-TOTAL-TRIALS-INSTEAD-OF-FAILURES-TO-BETA'),
  },
  {
    conceptId: CONJUGATE_PRIOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the posterior distribution\'s family (e.g. Beta) change after updating, or just its parameters?',
    choices: [
      { text: "Just its parameters — the posterior Beta(9,6) is genuinely the SAME distributional family (Beta) as the prior Beta(2,3), just with different parameters; this IS exactly what 'conjugate' means, which is precisely why no fresh integration was needed", isCorrect: true },
      { text: "The distributional family changes to a new, different form after the Bayesian update", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-2` },
      { text: "Since new data genuinely changes belief about the parameter, the posterior's shape category should also be free to change from the prior's", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-2` },
    ],
    targetedMisconceptions: [`${CONJUGATE_PRIOR}:MC-2`],
    source: eb(CONJUGATE_PRIOR, 'Discovery Question 2 as a detection probe (verbatim) — whether the posterior\'s distributional family changes after updating or just its parameters, an answer claiming the family changes re-targeting the same-family understanding, since this concerns the core "conjugate" concept'),
  },
  {
    conceptId: CONJUGATE_PRIOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is choosing a conjugate prior for computational convenience a legitimate practice, or a methodological shortcut?',
    choices: [
      { text: "A legitimate practice — a statistician may choose a Beta prior partly for its mathematical convenience (closed-form posteriors, no numerical integration) even if their true belief might be better represented by a non-conjugate shape; this is a recognized, well-established practical tradeoff, never cheating", isCorrect: true },
      { text: "A methodological shortcut that undermines the validity of the analysis", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-2` },
      { text: "Since the true prior belief might differ from the conjugate family's shape, choosing conjugacy for convenience should be considered a compromise on analytical honesty", isCorrect: false, misconceptionId: `${CONJUGATE_PRIOR}:MC-2` },
    ],
    targetedMisconceptions: [`${CONJUGATE_PRIOR}:MC-2`],
    source: eb(CONJUGATE_PRIOR, 'Discovery Question 3 as a detection probe (verbatim) — whether choosing a conjugate prior for convenience is legitimate or a methodological shortcut, an answer of "shortcut" confirming CONJUGATE-PRIOR-SELECTION-FOR-CONVENIENCE-VIEWED-AS-METHODOLOGICALLY-ILLEGITIMATE'),
  },
  {
    conceptId: CREDIBLE_INTERVAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a 95% credible interval describe this specific interval directly, or hypothetical repeated experiments?',
    choices: [
      { text: "This specific interval directly — for a 95% credible interval [0.3,0.5] on a proportion p: given the observed data, there is a 95% probability that the TRUE p lies between 0.3 and 0.5, a direct probability statement about θ itself given THIS data, never a claim about hypothetical repetitions", isCorrect: true },
      { text: "It describes hypothetical repeated experiments, the same way a frequentist confidence interval does", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-1` },
      { text: "Since both credible and confidence intervals are constructed at a 95% level, they should share the same repeated-sampling interpretation", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-1` },
    ],
    targetedMisconceptions: [`${CREDIBLE_INTERVAL}:MC-1`],
    source: eb(CREDIBLE_INTERVAL, 'Discovery Question 1 as a detection probe (verbatim) — whether a 95% credible interval describes this specific interval directly or hypothetical repeated experiments, an answer favoring repeated experiments confirming CREDIBLE-INTERVAL-INTERPRETED-USING-FREQUENTIST-PROCEDURAL-LANGUAGE-INSTEAD-OF-DIRECT-PROBABILITY'),
  },
  {
    conceptId: CREDIBLE_INTERVAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do a credible interval and a confidence interval make the same probability claim?',
    choices: [
      { text: "No — a credible interval claims 'P(θ∈[a,b]|data)=0.95,' directly about θ's likely location; a confidence interval claims 'if this procedure were repeated many times, 95% of resulting intervals would contain the true θ,' about the PROCEDURE's behavior, never this specific interval", isCorrect: true },
      { text: "Yes, credible intervals and confidence intervals make the exact same underlying probability claim", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-2` },
      { text: "Since both intervals are often numerically similar in practice, they should be treated as making the same claim just derived via different computational methods", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-2` },
    ],
    targetedMisconceptions: [`${CREDIBLE_INTERVAL}:MC-2`],
    source: eb(CREDIBLE_INTERVAL, 'Discovery Question 2 as a detection probe (verbatim) — whether a credible interval and confidence interval make the same probability claim, an answer of "yes" confirming CREDIBLE-AND-CONFIDENCE-INTERVALS-TREATED-AS-INTERCHANGEABLE-MEANING-THE-SAME-THING'),
  },
  {
    conceptId: CREDIBLE_INTERVAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the HPD interval always coincide with the equal-tailed credible interval, regardless of the posterior's shape?",
    choices: [
      { text: "No — for a SYMMETRIC posterior, the highest-density region naturally forms a symmetric interval matching the equal-tailed approach exactly; for a SKEWED posterior, the HPD interval is NARROWER than the equal-tailed interval, since this coincidence is specific to symmetric posteriors and doesn't generalize", isCorrect: true },
      { text: "Yes, the HPD interval always coincides with the equal-tailed credible interval no matter the posterior's shape", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-1` },
      { text: "Since both intervals are constructed to hold the same total probability, they should always produce identical bounds by definition", isCorrect: false, misconceptionId: `${CREDIBLE_INTERVAL}:MC-1` },
    ],
    targetedMisconceptions: [`${CREDIBLE_INTERVAL}:MC-1`],
    source: eb(CREDIBLE_INTERVAL, 'Discovery Question 3 as a detection probe (verbatim) — whether the HPD interval always coincides with the equal-tailed interval regardless of posterior shape, an answer of "yes" re-targeting the direct-probability-vs-procedural understanding via the symmetric/skewed contrast, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: MULTIPLE_REGRESSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can you compute β̂ as Xy or X⁻¹y directly, or does it require the full (XᵀX)⁻¹Xᵀy sequence?',
    choices: [
      { text: "The full sequence is required — for a model with 2 predictors plus intercept, n=50: X is 50×3, XᵀX is 3×3 (square, invertible), β̂ is 3×1; attempting Xy directly isn't even dimension-compatible, and X⁻¹y requires X to be square, which it generally isn't", isCorrect: true },
      { text: "β̂ can be computed directly as Xy or X⁻¹y, without the full transpose-multiply-invert-multiply sequence", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-1` },
      { text: "Since X relates predictors to the outcome, multiplying or inverting it directly against y should give a valid shortcut to the coefficients", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-1` },
    ],
    targetedMisconceptions: [`${MULTIPLE_REGRESSION}:MC-1`],
    source: eb(MULTIPLE_REGRESSION, 'Discovery Question 1 as a detection probe (verbatim) — whether beta-hat can be computed as Xy or X-inverse-y directly or requires the full sequence, an answer proposing a shortcut confirming MATRIX-OLS-OPERATIONS-APPLIED-IN-WRONG-ORDER-OR-WITH-INCOMPATIBLE-DIMENSIONS'),
  },
  {
    conceptId: MULTIPLE_REGRESSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the overall F-test is significant but only some individual t-tests are, is that a contradiction?',
    choices: [
      { text: "No — a regression with 5 predictors can have a significant overall F-test (p<0.001) while only 2 of 5 individual t-tests are significant; the overall F-test confirms predictors TOGETHER explain significant variance, but doesn't require EVERY predictor to contribute significantly on its own (some may be redundant)", isCorrect: true },
      { text: "Yes, a significant overall F-test with some insignificant individual predictors is a contradiction indicating a broken model", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-2` },
      { text: "Since the F-test summarizes the same predictors the t-tests examine individually, a significant F-test should logically require every individual t-test to also be significant", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-2` },
    ],
    targetedMisconceptions: [`${MULTIPLE_REGRESSION}:MC-2`],
    source: eb(MULTIPLE_REGRESSION, 'Discovery Question 2 as a detection probe (verbatim) — whether a significant overall F-test with some insignificant individual t-tests is a contradiction, an answer of "yes" confirming OVERALL-F-TEST-AND-INDIVIDUAL-T-TESTS-ASSUMED-TO-ALWAYS-AGREE'),
  },
  {
    conceptId: MULTIPLE_REGRESSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does multicollinearity ruin a model's overall predictions, or just its individual coefficient interpretability?",
    choices: [
      { text: "Just its individual coefficient interpretability — two highly correlated predictors (height in inches and centimeters) produce wildly unstable individual coefficients despite the model's overall R² and F-test looking reasonable; the COMBINED contribution stays stable, but the SPLIT between coefficients becomes unstable", isCorrect: true },
      { text: "Multicollinearity ruins the entire model's overall predictive validity whenever it's present", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-2` },
      { text: "Since unstable individual coefficients signal something is fundamentally wrong with the fitting process, the whole model's predictions should be considered unreliable too", isCorrect: false, misconceptionId: `${MULTIPLE_REGRESSION}:MC-2` },
    ],
    targetedMisconceptions: [`${MULTIPLE_REGRESSION}:MC-2`],
    source: eb(MULTIPLE_REGRESSION, 'Discovery Question 3 as a detection probe (verbatim) — whether multicollinearity ruins overall predictions or just individual coefficient interpretability, an answer claiming it ruins overall predictions re-targeting OVERALL-F-TEST-AND-INDIVIDUAL-T-TESTS-ASSUMED-TO-ALWAYS-AGREE\'s underlying "one bad signal ruins everything" pattern via the multicollinearity demonstration, since this EB entry registers only 2 formal misconceptions'),
  },
]
