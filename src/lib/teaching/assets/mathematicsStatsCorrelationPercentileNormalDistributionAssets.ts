/**
 * Batch: correlation, percentile, normal-distribution (math.stats) —
 * advances the domain from 7/40 to 10/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's measures-of-spread
 * and descriptive-statistics: correlation and percentile both require
 * measures-of-spread (correlation also requires math.prob.correlation,
 * already authored); normal-distribution requires descriptive-statistics
 * and math.prob.normal-distribution, both already authored. Transcribed
 * from their frozen Educational Brain entries at educational-brain/
 * concepts/mathematics/math.stats.correlation.md,
 * math.stats.percentile.md, and math.stats.normal-distribution.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline.
 *
 * All three EB entries register only 2 formal misconceptions each (not 3)
 * — per the campaign's established convention for this case, the 3rd
 * PROFICIENT-difficulty probe for each concept RE-TARGETS one of the two
 * existing misconceptions via a fresh worked example, rather than
 * inventing a fake third misconception. (Each EB entry's third Discovery
 * Question / Core Understanding paragraph — non-linear-vs-causation for
 * correlation, IQR-robustness for percentile, CLT-justifies-t-test for
 * normal-distribution — is still transcribed into the explanation content
 * for tutor context, even though it has no dedicated probe.)
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CORRELATION = 'math.stats.correlation'
const PERCENTILE = 'math.stats.percentile'
const NORMAL_DISTRIBUTION = 'math.stats.normal-distribution'

export const MATHEMATICS_STATS_CORRELATION_PERCENTILE_NORMAL_DISTRIBUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CORRELATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A COMPUTED r OUTSIDE [-1,1] IS AN ARITHMETIC ERROR — NEVER A VALID "STRONGER THAN PERFECT" '
      + 'RESULT: if a student computes r=1.4: since r is MATHEMATICALLY GUARANTEED to lie in '
      + '[-1,1] (a direct consequence of the formula\'s Cauchy-Schwarz-like structure), ANY value '
      + 'outside this range is IMPOSSIBLE for a correct calculation — it signals an ARITHMETIC '
      + 'MISTAKE somewhere, and the calculation must be RE-CHECKED. Accepting r=1.4 at face value '
      + '(interpreting it as "even stronger than perfect correlation") is WRONG.\n\n'
      + 'r MEASURES LINEAR ASSOCIATION ONLY — A STRONG NON-LINEAR RELATIONSHIP CAN STILL PRODUCE '
      + 'r≈0: for data following a PERFECT parabolic relationship y=x² over a SYMMETRIC range like '
      + 'x∈{-3,...,3}: since y=x² is symmetric around x=0 (increasing for x>0, decreasing for x<0), '
      + 'there\'s NO overall linear trend across the full range — the positive and negative linear '
      + 'contributions CANCEL OUT, producing r≈0 even though x and y are PERFECTLY (non-linearly) '
      + 'related. Interpreting r≈0 as conclusive evidence of "no relationship whatsoever," without '
      + 'first checking a SCATTERPLOT for a strong non-linear pattern r simply isn\'t designed to '
      + 'detect, is WRONG.\n\n'
      + 'CORRELATION NEVER IMPLIES CAUSATION — r² IS A DIFFERENT, RELATED QUANTITY: a study finds a '
      + 'strong positive correlation (r=0.85) between ice cream sales and drowning incidents. This '
      + 'does NOT mean ice cream sales CAUSE drowning — both are likely driven by a THIRD, '
      + 'confounding factor (hot weather: more ice cream sold and more swimming, hence more '
      + 'drowning risk, in summer). A strong r demonstrates genuine STATISTICAL association, NEVER '
      + 'by itself evidence of a direct causal link. r² (the coefficient of determination) is a '
      + 'SEPARATE quantity from r itself, representing the proportion of variance "explained" — '
      + 'never interchangeable with r.',
    targetedMisconceptions: [`${CORRELATION}:MC-1`, `${CORRELATION}:MC-2`],
    source: eb(CORRELATION, 'Core Understanding — a computed r outside [-1,1] being an arithmetic error never a valid stronger-than-perfect result, r measuring linear association only so a strong non-linear relationship can still produce r near zero, and correlation never implying causation with r-squared being a different related quantity'),
  },
  {
    conceptId: PERCENTILE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'PERCENTILE RANK IS PROPORTION BELOW — NEVER A RAW SCORE PERCENTAGE: a student at the 85th '
      + 'percentile on a standardized test means 85% of OTHER test-takers scored LOWER — it says '
      + 'NOTHING about what fraction of TEST QUESTIONS the student answered correctly (which could '
      + 'be entirely different, e.g. 92% correct). A common error confuses "85th percentile" with '
      + '"scored 85% of questions correctly" — percentile RANK (relative standing among test-takers) '
      + 'and raw SCORE percentage (fraction of questions correct) are ENTIRELY DIFFERENT quantities '
      + 'that can diverge substantially.\n\n'
      + 'Q2 IS THE MEDIAN — NEVER A SEPARATELY-COMPUTED VALUE THAT MIGHT DISAGREE: for '
      + '{3,5,7,9,11}: the sorted middle value is 7. BOTH the median AND Q2 are EXACTLY 7 — they '
      + 'are the SAME quantity BY DEFINITION, never two independently-computed values that HAPPEN '
      + 'to coincide. There is NO scenario where a correctly-computed Q2 differs from the '
      + 'correctly-computed median.\n\n'
      + 'THE IQR IS ROBUST TO OUTLIERS — THE FULL RANGE IS NOT: for {2,4,6,8,10,12,100} (with an '
      + 'outlier, 100): Q1=4, Q3=12, giving IQR=12-4=8 — barely affected by the outlier 100 at all. '
      + 'The full range=100-2=98 — DRASTICALLY inflated by the SINGLE outlier. Because the IQR '
      + 'depends ONLY on the two quartile positions (ignoring the extreme tails entirely), an '
      + 'extreme value at either end has LITTLE TO NO effect on Q1 or Q3 — the IQR measures the '
      + 'spread of the MIDDLE 50% only, deliberately excluding the extremes the full range is fully '
      + 'exposed to.',
    targetedMisconceptions: [`${PERCENTILE}:MC-1`, `${PERCENTILE}:MC-2`],
    source: eb(PERCENTILE, 'Core Understanding — percentile rank being proportion below never a raw score percentage, Q2 being the median never a separately-computed value that might disagree, and the IQR being robust to outliers while the full range is not'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE 68-95-99.7 PAIRING MUST NOT BE INTERCHANGED: for μ=100, σ=15: the range containing '
      + 'approximately 95% of the data is 100±2(15)=(70,130) — using 2 STANDARD DEVIATIONS, never '
      + '1. A common error computes 100±15=(85,115) and calls THIS the 95% range, confusing which '
      + 'percentage pairs with which standard-deviation count. The SPECIFIC pairing (68%↔1SD, '
      + '95%↔2SD, 99.7%↔3SD) must be applied EXACTLY as stated, never interchanged.\n\n'
      + 'FAILING TO REJECT NORMALITY IS NEVER PROOF OF NORMALITY: a Shapiro-Wilk test producing '
      + 'p=0.3 (failing to reject H0: "data is normal," at α=0.05) JUSTIFIES saying "there is '
      + 'insufficient evidence to conclude the data is NOT normal." It does NOT justify saying "the '
      + 'data IS PROVEN normal" — a failed rejection NEVER proves the null hypothesis true, only '
      + 'that THIS particular sample didn\'t provide strong enough evidence against it. This is the '
      + 'SAME "absence-of-evidence-isn\'t-evidence-of-absence" logic that applies to every '
      + 'hypothesis test.\n\n'
      + 'THE CLT MAKES THE SAMPLE MEAN APPROXIMATELY NORMAL REGARDLESS OF THE POPULATION\'S SHAPE: '
      + 'for a researcher with raw data from a clearly SKEWED population but a LARGE sample size '
      + '(n=500): methods relying on the sample mean\'s normality (like a t-test) remain reasonably '
      + 'TRUSTED here BECAUSE the Central Limit Theorem guarantees the SAMPLE MEAN\'s own sampling '
      + 'distribution becomes approximately normal for large n, REGARDLESS of the underlying '
      + 'population\'s shape — even though the RAW individual data points are skewed, the t-test '
      + 'remains valid, thanks to the large sample size alone.',
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-1`, `${NORMAL_DISTRIBUTION}:MC-2`],
    source: eb(NORMAL_DISTRIBUTION, 'Core Understanding — the 68-95-99.7 pairing not being interchanged, failing to reject normality never being proof of normality, and the CLT making the sample mean approximately normal regardless of the population\'s shape'),
  },
]

export const MATHEMATICS_STATS_CORRELATION_PERCENTILE_NORMAL_DISTRIBUTION_PROBES: SeedProbe[] = [
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you compute r=1.4, what does that tell you about your calculation?',
    choices: [
      { text: "It tells you there's an arithmetic error somewhere — r is mathematically guaranteed to lie in [-1,1], so any value outside this range is impossible for a correct calculation and the deviations, sums, or square root must be re-checked", isCorrect: true },
      { text: "It means the correlation is even stronger than a perfect correlation of 1", isCorrect: false, misconceptionId: `${CORRELATION}:MC-1` },
      { text: "Since r measures how strongly related two variables are, a larger computed value should simply indicate an even stronger relationship", isCorrect: false, misconceptionId: `${CORRELATION}:MC-1` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-1`],
    source: eb(CORRELATION, 'Discovery Question 1 as a detection probe (verbatim) — what a computed r=1.4 tells you about the calculation, an answer treating it as a stronger-than-perfect result confirming OUT-OF-RANGE-COMPUTED-R-ACCEPTED-RATHER-THAN-RECOGNIZED-AS-AN-ERROR'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could two variables be perfectly related and still have r close to zero?',
    choices: [
      { text: "Yes — for a perfect parabolic relationship y=x² over a symmetric range like x∈{-3,...,3}, the positive and negative linear contributions cancel out, producing r≈0 even though x and y are perfectly (non-linearly) related; r only measures linear association", isCorrect: true },
      { text: "No, if two variables are perfectly related, r must be close to 1 or -1, never close to zero", isCorrect: false, misconceptionId: `${CORRELATION}:MC-2` },
      { text: "Since a perfect relationship means the variables move together in a fully determined way, r should always reflect that with a value near an extreme", isCorrect: false, misconceptionId: `${CORRELATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-2`],
    source: eb(CORRELATION, 'Discovery Question 2 as a detection probe (verbatim) — whether two perfectly related variables could still have r close to zero, an answer of "no" confirming NEAR-ZERO-R-INTERPRETED-AS-NO-RELATIONSHIP-WITHOUT-CHECKING-FOR-NON-LINEAR-PATTERNS'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student computes r=-1.3 for a dataset showing a strong downward trend. Is this a valid "extra strong" negative correlation?',
    choices: [
      { text: "No — r is mathematically guaranteed to lie in [-1,1] regardless of sign, so r=-1.3 is just as impossible as r=1.4; a value outside this range always signals an arithmetic error, never a stronger negative relationship than a perfect r=-1", isCorrect: true },
      { text: "Yes, r=-1.3 represents an even stronger negative correlation than the maximum possible value of -1", isCorrect: false, misconceptionId: `${CORRELATION}:MC-1` },
      { text: "Since the trend is described as strong, a magnitude greater than 1 is a reasonable way to express that extra strength numerically", isCorrect: false, misconceptionId: `${CORRELATION}:MC-1` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-1`],
    source: eb(CORRELATION, 'A fresh worked example re-targeting Discovery Question 1\'s out-of-range detection (r=-1.3 instead of r=1.4, negative sign) at PROFICIENT difficulty, since this EB entry registers only 2 formal misconceptions — an answer accepting r=-1.3 as valid confirming OUT-OF-RANGE-COMPUTED-R-ACCEPTED-RATHER-THAN-RECOGNIZED-AS-AN-ERROR'),
  },
  {
    conceptId: PERCENTILE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does being at the 85th percentile mean you answered 85% of the questions correctly?',
    choices: [
      { text: "No — being at the 85th percentile means 85% of other test-takers scored LOWER; it says nothing about what fraction of test questions were answered correctly, which could be entirely different, e.g. 92% correct", isCorrect: true },
      { text: "Yes, the 85th percentile means the student answered exactly 85% of the questions correctly", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-1` },
      { text: "Since percentile is reported as a percentage, it should represent the same kind of percentage as a raw test score", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-1` },
    ],
    targetedMisconceptions: [`${PERCENTILE}:MC-1`],
    source: eb(PERCENTILE, 'Discovery Question 1 as a detection probe (verbatim) — whether the 85th percentile means 85% of questions were answered correctly, an answer of "yes" confirming PERCENTILE-RANK-CONFUSED-WITH-RAW-SCORE-PERCENTAGE'),
  },
  {
    conceptId: PERCENTILE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are Q2 and the median computed separately, or are they the exact same value?',
    choices: [
      { text: "They are the exact same value by definition — for {3,5,7,9,11}, the sorted middle value is 7, and BOTH the median and Q2 are exactly 7; there is no scenario where a correctly-computed Q2 differs from the correctly-computed median", isCorrect: true },
      { text: "Q2 and the median are computed using separate methods and might occasionally disagree", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-2` },
      { text: "Since Q2 comes from quartile theory and the median from a different summary-statistic tradition, they could plausibly diverge for unusual datasets", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-2` },
    ],
    targetedMisconceptions: [`${PERCENTILE}:MC-2`],
    source: eb(PERCENTILE, 'Discovery Question 2 as a detection probe (verbatim) — whether Q2 and the median are computed separately or are the exact same value, an answer treating them as separately computed confirming Q2-TREATED-AS-A-SEPARATELY-COMPUTED-VALUE-FROM-THE-MEDIAN'),
  },
  {
    conceptId: PERCENTILE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A child is at the 40th percentile for height on a growth chart. Does this mean the child is 40% shorter than the tallest possible child?',
    choices: [
      { text: "No — the 40th percentile means 40% of other children (of the same age/sex) are shorter than this child; it is a statement about rank position among peers, never a raw fraction of some maximum height", isCorrect: true },
      { text: "Yes, being at the 40th percentile means the child's height is 40% of the way to the maximum possible height", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-1` },
      { text: "Since percentile is expressed as a percentage, it should represent the same fraction-of-total idea as a raw measurement comparison", isCorrect: false, misconceptionId: `${PERCENTILE}:MC-1` },
    ],
    targetedMisconceptions: [`${PERCENTILE}:MC-1`],
    source: eb(PERCENTILE, 'A fresh worked example re-targeting the percentile-rank-versus-raw-measurement distinction (a growth-chart height percentile instead of a test score) at PROFICIENT difficulty, since this EB entry registers only 2 formal misconceptions — an answer treating percentile as a raw fraction confirming PERCENTILE-RANK-CONFUSED-WITH-RAW-SCORE-PERCENTAGE'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does 95% of a normal distribution\'s data fall within 1 or 2 standard deviations of the mean?',
    choices: [
      { text: "2 standard deviations — for μ=100, σ=15, the range containing approximately 95% of the data is 100±2(15)=(70,130); the 68-95-99.7 pairing (68%↔1SD, 95%↔2SD, 99.7%↔3SD) must be applied exactly, never interchanged", isCorrect: true },
      { text: "1 standard deviation — 95% of the data falls within μ±1σ", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
      { text: "Since 1 standard deviation already captures most of a normal distribution's density visually, it should correspond to the commonly cited 95% figure", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-1`],
    source: eb(NORMAL_DISTRIBUTION, 'Discovery Question 1 as a detection probe (verbatim) — whether 95% of a normal distribution\'s data falls within 1 or 2 standard deviations, an answer of "1" confirming PERCENTAGE-TO-STANDARD-DEVIATION-PAIRING-CONFUSED-IN-THE-68-95-99-7-RULE'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a non-significant Shapiro-Wilk test result prove the data is normally distributed?',
    choices: [
      { text: "No — a Shapiro-Wilk test producing p=0.3 (failing to reject H0 at α=0.05) only justifies \"insufficient evidence to conclude the data is NOT normal\"; a failed rejection never proves the null hypothesis true, the same absence-of-evidence-isn't-evidence-of-absence logic as every hypothesis test", isCorrect: true },
      { text: "Yes, failing to reject the null hypothesis in a Shapiro-Wilk test proves the data is normally distributed", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-2` },
      { text: "Since the test specifically checks for normality and found no significant deviation, that outcome should count as confirmation of normality", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-2`],
    source: eb(NORMAL_DISTRIBUTION, 'Discovery Question 2 as a detection probe (verbatim) — whether a non-significant Shapiro-Wilk result proves normality, an answer of "yes" confirming FAILING-TO-REJECT-NORMALITY-TREATED-AS-PROOF-OF-NORMALITY'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For μ=50, σ=8, what range contains approximately 68% of the data?',
    choices: [
      { text: "(42,58) — using 50±1(8), since 68% pairs with exactly 1 standard deviation; computing 50±2(8)=(34,66) instead would wrongly apply the 2-standard-deviation range to the 68% figure", isCorrect: true },
      { text: "(34,66) — using 50±2(8), treating 2 standard deviations as the range for 68% of the data", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
      { text: "Since 68% is the smallest of the three named percentages, it should be reasonable to pair it with the largest standard-deviation count to be safe", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-1`],
    source: eb(NORMAL_DISTRIBUTION, 'A fresh worked example re-targeting the 68-95-99.7 pairing (μ=50,σ=8, the 68% range instead of the 95% range) at PROFICIENT difficulty, since this EB entry registers only 2 formal misconceptions — an answer pairing 68% with 2 standard deviations confirming PERCENTAGE-TO-STANDARD-DEVIATION-PAIRING-CONFUSED-IN-THE-68-95-99-7-RULE'),
  },
]
