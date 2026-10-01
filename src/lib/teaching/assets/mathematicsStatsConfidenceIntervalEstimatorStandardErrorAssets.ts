/**
 * Batch: confidence-interval, estimator, standard-error (math.stats) —
 * advances the domain from 13/40 to 16/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's sampling-
 * distribution: confidence-interval requires sampling-distribution +
 * math.prob.normal-distribution; estimator requires sampling-distribution
 * + math.prob.expected-value; standard-error requires only sampling-
 * distribution — all prerequisites already authored. Transcribed from
 * their frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.stats.confidence-interval.md, math.stats.estimator.md,
 * and math.stats.standard-error.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline and all three prerequisites' own HIGH band.
 *
 * confidence-interval and estimator each register 3 formal misconceptions
 * (full contract, no retargeting needed). standard-error registers only 2;
 * per this campaign's established convention, its 3rd PROFICIENT probe
 * re-targets one of the two existing misconceptions via a fresh worked
 * example rather than inventing a fake third misconception.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONFIDENCE_INTERVAL = 'math.stats.confidence-interval'
const ESTIMATOR = 'math.stats.estimator'
const STANDARD_ERROR = 'math.stats.standard-error'

export const MATHEMATICS_STATS_CONFIDENCE_INTERVAL_ESTIMATOR_STANDARD_ERROR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONFIDENCE_INTERVAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE CI FORMULA ASSEMBLES TWO ALREADY-KNOWN PIECES — NEVER NEW, INDEPENDENT CONSTANTS: for '
      + 'n=25, x̄=52, known σ=10: the standard error is σ/√n=10/√25=2, EXACTLY the sampling '
      + 'distribution\'s own standard error of X̄. The 1.96 is EXACTLY the standard normal\'s own '
      + 'z-value marking the middle 95% of area. The CI x̄±1.96(2)=52±3.92=[48.08,55.92] is a direct '
      + 'ASSEMBLY of two facts already established elsewhere — never a formula introducing '
      + 'anything genuinely new.\n\n'
      + '"95% CONFIDENCE" DESCRIBES THE CONSTRUCTION PROCEDURE\'S LONG-RUN SUCCESS RATE — NEVER A '
      + 'PROBABILITY ABOUT THIS ONE FIXED INTERVAL: for the interval [48.08,55.92]: the CORRECT '
      + 'interpretation is "if we repeated this entire sampling-and-construction procedure many '
      + 'times, about 95% of the resulting intervals would contain the true μ." The INCORRECT '
      + 'interpretation, "there is a 95% probability μ is between 48.08 and 55.92," treats the '
      + 'FIXED, unknown constant μ as if it were random — but once this SPECIFIC interval is '
      + 'computed, μ either IS or IS NOT in it, with NO remaining randomness to assign a '
      + 'probability to.\n\n'
      + 'UNKNOWN σ REQUIRES A GENUINELY WIDER INTERVAL VIA THE t-DISTRIBUTION — NEVER THE SAME '
      + 'z=1.96 FORMULA WITH s SILENTLY SUBSTITUTED: reusing the same sample (n=25, x̄=52, now with '
      + 'sample standard deviation s=10 and σ UNKNOWN): naively computing 52±1.96(10/5)=52±3.92 '
      + 'UNDERSTATES the true uncertainty, because s ITSELF is an estimate subject to its own '
      + 'sampling variability. The correct approach uses a t-distribution critical value with '
      + 'n-1=24 degrees of freedom (approximately 2.064, LARGER than 1.96), giving '
      + '52±2.064(2)=52±4.128 — genuinely WIDER than the known-σ interval on the SAME underlying '
      + 'data.',
    targetedMisconceptions: [`${CONFIDENCE_INTERVAL}:MC-1`, `${CONFIDENCE_INTERVAL}:MC-2`, `${CONFIDENCE_INTERVAL}:MC-3`],
    source: eb(CONFIDENCE_INTERVAL, 'Core Understanding — the CI formula assembling two already-known pieces never new independent constants, "95% confidence" describing the construction procedure\'s long-run success rate never a probability about this one fixed interval, and unknown sigma requiring a genuinely wider interval via the t-distribution never the same z=1.96 formula with s silently substituted'),
  },
  {
    conceptId: ESTIMATOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'AN ESTIMATOR IS A FIXED RULE — AN ESTIMATE IS ITS SAMPLE-SPECIFIC OUTPUT, NEVER THE SAME '
      + 'THING: the estimator "μ̂=X̄" is a RULE: "average whatever sample you collect." Applied to '
      + 'Sample A (10 scores averaging 78), the ESTIMATE is μ̂=78. Applied to a DIFFERENT Sample B, '
      + 'the SAME ESTIMATOR produces the ESTIMATE μ̂=82. The estimator (the averaging rule) NEVER '
      + 'changed — only the resulting estimate changed, because the SAMPLE changed.\n\n'
      + 'UNBIASEDNESS IS VERIFIED VIA LINEARITY OF EXPECTATION — NEVER ASSUMED AUTOMATICALLY: for '
      + 'μ̂=X̄=(1/n)ΣXi: E[X̄]=(1/n)ΣE[Xi]=(1/n)·nμ=μ — so X̄ IS unbiased, for ANY sample size n, '
      + 'even n=1. But unbiasedness is NEVER automatic for any reasonable-LOOKING statistic — the '
      + 'naive sample variance (1/n)Σ(Xi-X̄)² is actually BIASED (requiring the n-1 correction), '
      + 'proving that E[θ̂]=θ must ALWAYS be explicitly verified, never assumed just because a '
      + 'formula "looks like it should work."\n\n'
      + 'UNBIASEDNESS AND CONSISTENCY ARE INDEPENDENT PROPERTIES — NEVER ONE IMPLYING THE OTHER: '
      + 'consider μ̂\'=X1 (using ONLY the first observation): E[μ̂\']=E[X1]=μ — ALSO unbiased, '
      + 'exactly like X̄. But its standard error NEVER shrinks as n grows (it only ever looks at '
      + 'X1), so μ̂\' is NOT consistent — more data doesn\'t make it any more reliable. Contrast '
      + 'with X̄: ALSO unbiased, AND consistent (σ/√n→0 as n→∞). Both estimators share '
      + 'unbiasedness, yet ONE improves with more data and one DOES NOT — proving unbiasedness '
      + 'ALONE says NOTHING about whether more data helps.',
    targetedMisconceptions: [`${ESTIMATOR}:MC-1`, `${ESTIMATOR}:MC-2`, `${ESTIMATOR}:MC-3`],
    source: eb(ESTIMATOR, 'Core Understanding — an estimator being a fixed rule while an estimate is its sample-specific output never the same thing, unbiasedness being verified via linearity of expectation never assumed automatically, and unbiasedness and consistency being independent properties never one implying the other'),
  },
  {
    conceptId: STANDARD_ERROR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'SE REQUIRES DIVIDING BY √n — NEVER n ITSELF OR THE RAW STANDARD DEVIATION ALONE: for n=25, '
      + 's=10: SE=10/√25=10/5=2. A common error reports s=10 directly, or divides by n instead of '
      + '√n (giving 10/25=0.4, WRONG) — the standard error SPECIFICALLY requires the SQUARE ROOT '
      + 'of n in the denominator, a genuinely different computation from either the raw standard '
      + 'deviation or a naive 1/n scaling.\n\n'
      + 'QUADRUPLING n HALVES SE — NEVER QUARTERS IT: if SE=4 at n=16, increasing to n=64 '
      + '(QUADRUPLED): since √64=2√16 (√n DOUBLES when n quadruples), the new SE=4/2=2 — HALVED, '
      + 'NEVER reduced to a quarter. A common error assumes quadrupling n should QUARTER SE '
      + '(treating the relationship as directly proportional to n rather than √n) — because of '
      + 'the square root, SE shrinks more SLOWLY than n grows, producing DIMINISHING returns as '
      + 'sample size increases, never a proportional payoff.\n\n'
      + 'SE IS THE SAMPLING DISTRIBUTION\'S OWN STANDARD DEVIATION — NEVER THE SAME AS THE RAW '
      + 'DATA\'S STANDARD DEVIATION: for 100 exam scores with sample standard deviation s=12: this '
      + 's=12 describes how SPREAD OUT the individual scores are WITHIN this one sample. The '
      + 'standard error 12/√100=1.2 describes how much the SAMPLE MEAN ITSELF would vary if the '
      + 'sampling were REPEATED many times — a MUCH SMALLER number, reflecting that averages are '
      + 'more stable than individual data points.',
    targetedMisconceptions: [`${STANDARD_ERROR}:MC-1`, `${STANDARD_ERROR}:MC-2`],
    source: eb(STANDARD_ERROR, 'Core Understanding — SE requiring dividing by root n never n itself or the raw standard deviation alone, quadrupling n halving SE never quartering it, and SE being the sampling distribution\'s own standard deviation never the same as the raw data\'s standard deviation'),
  },
]

export const MATHEMATICS_STATS_CONFIDENCE_INTERVAL_ESTIMATOR_STANDARD_ERROR_PROBES: SeedProbe[] = [
  {
    conceptId: CONFIDENCE_INTERVAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is the confidence interval formula's 1.96 a brand-new, independent constant, or something you already know from the normal distribution?",
    choices: [
      { text: "Something already known — for n=25, x̄=52, known σ=10: SE=σ/√n=2 (the sampling distribution's own standard error) and 1.96 is exactly the standard normal's own 95%-area z-value; the CI x̄±1.96(2) is a direct assembly of two already-established facts, never a new independent ingredient", isCorrect: true },
      { text: "1.96 is a brand-new, independent constant specifically invented for confidence intervals", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-1` },
      { text: "Since confidence intervals are their own topic, the formula's constants should be treated as separate from anything learned about the normal distribution", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-1` },
    ],
    targetedMisconceptions: [`${CONFIDENCE_INTERVAL}:MC-1`],
    source: eb(CONFIDENCE_INTERVAL, 'Discovery Question 1 as a detection probe (verbatim) — whether the CI formula\'s 1.96 is a new independent constant or something already known, an answer treating it as new confirming CI-FORMULA-ASSUMED-NEW-INDEPENDENT-CONSTANTS'),
  },
  {
    conceptId: CONFIDENCE_INTERVAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does "95% confidence" mean there is a 95% probability that θ falls within this specific, already-computed interval?',
    choices: [
      { text: "No — for the interval [48.08,55.92], the correct interpretation is that repeating the entire sampling-and-construction procedure many times would produce intervals containing the true μ about 95% of the time; once this specific interval is computed, μ either is or is not in it, with no remaining randomness to assign a probability to", isCorrect: true },
      { text: "Yes, 95% confidence means there is a 95% probability that θ is within this specific computed interval", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-2` },
      { text: "Since the interval was built using a 95% confidence level, that percentage should directly describe the chance the parameter lies inside it", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-2` },
    ],
    targetedMisconceptions: [`${CONFIDENCE_INTERVAL}:MC-2`],
    source: eb(CONFIDENCE_INTERVAL, 'Discovery Question 2 as a detection probe (verbatim) — whether "95% confidence" means a 95% probability theta is in this specific interval, an answer of "yes" confirming CONFIDENCE-LEVEL-ASSUMED-PROBABILITY-OF-THIS-INTERVAL'),
  },
  {
    conceptId: CONFIDENCE_INTERVAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When σ is unknown and estimated by s, can you simply substitute s into the same formula with z=1.96, without any other adjustment?',
    choices: [
      { text: "No — for the same sample (n=25, x̄=52, s=10, σ unknown): naively computing 52±1.96(10/5)=52±3.92 understates the true uncertainty since s itself is an estimate; the correct approach uses a t-distribution critical value with 24 degrees of freedom (≈2.064, larger than 1.96), giving 52±2.064(2)=52±4.128, genuinely wider", isCorrect: true },
      { text: "Yes, you can substitute s for σ directly into the same z=1.96 formula with no other adjustment needed", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-3` },
      { text: "Since s is just an estimate of σ, plugging it into the exact same formula should give an equally valid interval", isCorrect: false, misconceptionId: `${CONFIDENCE_INTERVAL}:MC-3` },
    ],
    targetedMisconceptions: [`${CONFIDENCE_INTERVAL}:MC-3`],
    source: eb(CONFIDENCE_INTERVAL, 'Discovery Question 3 as a detection probe (verbatim) — whether s can simply be substituted for unknown sigma with z=1.96 and no other adjustment, an answer of "yes" confirming UNKNOWN-SIGMA-ASSUMED-TO-NEED-NO-ADJUSTMENT'),
  },
  {
    conceptId: ESTIMATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "If two people calculate 'X̄' on two different samples and get different numbers, does that mean they used different estimators?",
    choices: [
      { text: "No — the estimator \"μ̂=X̄\" is a fixed rule (\"average whatever sample you collect\"); applied to Sample A it gives estimate 78, applied to Sample B it gives estimate 82, but the estimator itself never changed, only the resulting estimate changed because the sample changed", isCorrect: true },
      { text: "Yes, getting different numbers from the same formula on different samples means they used different estimators", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-1` },
      { text: "Since 'estimator' and 'estimate' both refer to the numeric result of a calculation, different results imply different estimators were applied", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-1` },
    ],
    targetedMisconceptions: [`${ESTIMATOR}:MC-1`],
    source: eb(ESTIMATOR, 'Discovery Question 1 as a detection probe (verbatim) — whether different numbers from the same rule on different samples means different estimators were used, an answer of "yes" confirming ESTIMATOR-AND-ESTIMATE-CONFLATED'),
  },
  {
    conceptId: ESTIMATOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If an estimator is unbiased, does that guarantee it also gets more reliable with a bigger sample?',
    choices: [
      { text: "No — consider μ̂'=X1 (using only the first observation): E[μ̂']=E[X1]=μ, also unbiased exactly like X̄, but its standard error never shrinks as n grows, so it is NOT consistent; X̄ is both unbiased AND consistent, proving unbiasedness alone says nothing about whether more data helps", isCorrect: true },
      { text: "Yes, an unbiased estimator is automatically guaranteed to become more reliable as the sample size grows", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-2` },
      { text: "Since unbiasedness and reliability both sound like desirable properties of a good estimator, one should naturally imply the other", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-2` },
    ],
    targetedMisconceptions: [`${ESTIMATOR}:MC-2`],
    source: eb(ESTIMATOR, 'Discovery Question 2 as a detection probe (verbatim) — whether an unbiased estimator is guaranteed to get more reliable with a bigger sample, an answer of "yes" confirming UNBIASEDNESS-ASSUMED-TO-IMPLY-CONSISTENCY'),
  },
  {
    conceptId: ESTIMATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is any reasonable-looking sample statistic automatically an unbiased estimator of the corresponding population parameter?',
    choices: [
      { text: "No — unbiasedness must be verified via linearity of expectation, e.g. E[X̄]=μ genuinely holds, but the naive sample variance (1/n)Σ(Xi-X̄)² is actually BIASED (requiring the n-1 correction), proving E[θ̂]=θ must always be explicitly checked, never assumed just because a formula 'looks like it should work'", isCorrect: true },
      { text: "Yes, any reasonable-looking sample statistic is automatically an unbiased estimator of the corresponding parameter", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-3` },
      { text: "Since a statistic is specifically designed to estimate a parameter, it should be safe to assume it is unbiased without further verification", isCorrect: false, misconceptionId: `${ESTIMATOR}:MC-3` },
    ],
    targetedMisconceptions: [`${ESTIMATOR}:MC-3`],
    source: eb(ESTIMATOR, 'Discovery Question 3 as a detection probe (verbatim) — whether any reasonable-looking sample statistic is automatically an unbiased estimator, an answer of "yes" confirming SAMPLE-STATISTIC-ASSUMED-ALWAYS-UNBIASED'),
  },
  {
    conceptId: STANDARD_ERROR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the standard error computed by dividing by n, or by the square root of n?',
    choices: [
      { text: "By the square root of n — for n=25, s=10: SE=10/√25=10/5=2; reporting s=10 directly or dividing by n instead (giving 10/25=0.4) is wrong, since standard error specifically requires the square root of n in the denominator", isCorrect: true },
      { text: "By n itself — the standard error is computed as the raw standard deviation divided directly by n", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-1` },
      { text: "Since larger samples should give proportionally smaller error, dividing by n directly seems like the natural scaling to use", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-1` },
    ],
    targetedMisconceptions: [`${STANDARD_ERROR}:MC-1`],
    source: eb(STANDARD_ERROR, 'Discovery Question 1 as a detection probe (verbatim) — whether the standard error is computed by dividing by n or by the square root of n, an answer of "n" confirming STANDARD-ERROR-COMPUTED-WITHOUT-DIVIDING-BY-SQUARE-ROOT-OF-N'),
  },
  {
    conceptId: STANDARD_ERROR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you quadruple your sample size, does the standard error get cut to a quarter, or to a half?',
    choices: [
      { text: "To a half — if SE=4 at n=16, increasing to n=64 (quadrupled) gives new SE=4/2=2, halved, since √64=2√16 (√n doubles when n quadruples); the square root means SE shrinks more slowly than n grows, never a proportional quartering", isCorrect: true },
      { text: "To a quarter — quadrupling the sample size cuts the standard error to one-fourth of its original value", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-2` },
      { text: "Since the sample size increased by a factor of 4, the standard error should decrease by that same factor of 4", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-2` },
    ],
    targetedMisconceptions: [`${STANDARD_ERROR}:MC-2`],
    source: eb(STANDARD_ERROR, 'Discovery Question 2 as a detection probe (verbatim) — whether quadrupling the sample size cuts SE to a quarter or a half, an answer of "a quarter" confirming SAMPLE-SIZE-INCREASE-ASSUMED-TO-SCALE-STANDARD-ERROR-PROPORTIONALLY-RATHER-THAN-VIA-SQUARE-ROOT'),
  },
  {
    conceptId: STANDARD_ERROR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the standard error the same thing as the standard deviation of the raw data in your sample?',
    choices: [
      { text: "No — for 100 exam scores with sample standard deviation s=12: this s=12 describes how spread out individual scores are within the sample, while the standard error 12/√100=1.2 describes how much the sample MEAN itself would vary across repeated sampling — a much smaller number answering a genuinely different question", isCorrect: true },
      { text: "Yes, the standard error and the raw sample standard deviation are the same quantity and can be used interchangeably", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-1` },
      { text: "Since both are called some form of 'standard' spread measure, they should refer to the same underlying number", isCorrect: false, misconceptionId: `${STANDARD_ERROR}:MC-1` },
    ],
    targetedMisconceptions: [`${STANDARD_ERROR}:MC-1`],
    source: eb(STANDARD_ERROR, 'Discovery Question 3 as a detection probe (verbatim) — whether the standard error is the same as the raw sample standard deviation, an answer of "yes" re-targeting STANDARD-ERROR-COMPUTED-WITHOUT-DIVIDING-BY-SQUARE-ROOT-OF-N\'s underlying conflation of SE with raw spread via a fresh worked example, since this EB entry registers only 2 formal misconceptions'),
  },
]
