/**
 * Batch: anova, type-errors, test-statistic (math.stats) — advances the
 * domain from 22/40 to 25/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's hypothesis-testing
 * specializations (t-test/z-test/chi-squared-test): anova requires
 * hypothesis-testing + math.prob.continuous-distributions; type-errors and
 * test-statistic both require only hypothesis-testing — all already
 * authored. Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.stats.anova.md,
 * math.stats.type-errors.md, and math.stats.test-statistic.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline and hypothesis-testing's own HIGH band (anova's "expert" EB
 * difficulty label does not bump it, matching the established convention
 * that grade band follows the prerequisite chain, not the difficulty
 * label alone — anova's own prerequisites stay within math.stats' HIGH
 * baseline).
 *
 * anova registers 3 formal misconceptions (full contract, no retargeting
 * needed). type-errors and test-statistic each register only 2; per this
 * campaign's established convention, each concept's 3rd PROFICIENT probe
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

const ANOVA = 'math.stats.anova'
const TYPE_ERRORS = 'math.stats.type-errors'
const TEST_STATISTIC = 'math.stats.test-statistic'

export const MATHEMATICS_STATS_ANOVA_TYPE_ERRORS_TEST_STATISTIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANOVA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ANOVA IS ONE COMBINED TEST CONTROLLING THE OVERALL ERROR RATE — NEVER EQUIVALENT TO '
      + 'REPEATED PAIRWISE T-TESTS: testing three fertilizer types for equal mean crop yield, '
      + 'H0:μA=μB=μC: running three SEPARATE pairwise t-tests instead, each at α=0.05, inflates '
      + 'the OVERALL chance of at least one false positive to roughly 1-(0.95)³≈14.3% — noticeably '
      + 'higher than the intended 5%. ANOVA\'s single combined F-test avoids this inflation, '
      + 'testing all three means at once while controlling the overall error rate at the stated α '
      + '— NEVER a mere shortcut for running several t-tests.\n\n'
      + 'THE VARIANCE PARTITION IS A GUARANTEED ALGEBRAIC IDENTITY — NEVER A COINCIDENTAL '
      + 'RELATIONSHIP: for Group A: 2,4; Group B: 6,8; Group C: 10,12 (grand mean 7): '
      + 'SSTotal=25+9+1+1+9+25=70, SSBetween=2(16)+2(0)+2(16)=64, SSWithin=2+2+2=6. Check: '
      + '64+6=70=SSTotal EXACTLY — this is guaranteed by construction, never a coincidence to '
      + 'verify after the fact. F=(64/2)/(6/3)=32/2=16, a large value; treating SSBetween and '
      + 'SSWithin as two independently-computed numbers that merely happen to relate misses that '
      + 'they ALWAYS sum to SSTotal exactly.\n\n'
      + 'A SIGNIFICANT F PROVES ONLY THAT SOME DIFFERENCE EXISTS — NEVER WHICH SPECIFIC PAIR(S): '
      + 'for the same data, F=16 is large, strong evidence against H0 — SOME group\'s mean '
      + 'genuinely differs. But despite the sample means (3,7,11) LOOKING like every pair differs, '
      + 'this ANOVA result ALONE does not formally establish whether it\'s A≠B, A≠C, B≠C, or all '
      + 'three — pinpointing which specific pair(s) requires a SEPARATE post-hoc test (e.g. '
      + 'Tukey\'s HSD), never part of the ANOVA F-test itself. ANOVA\'s validity also depends on '
      + 'its stated assumptions (approximately equal variances, approximate normality) genuinely '
      + 'holding, never assumed by default.',
    targetedMisconceptions: [`${ANOVA}:MC-1`, `${ANOVA}:MC-2`, `${ANOVA}:MC-3`],
    source: eb(ANOVA, 'Core Understanding — ANOVA being one combined test controlling the overall error rate never equivalent to repeated pairwise t-tests, the variance partition being a guaranteed algebraic identity never coincidental, and a significant F proving only that some difference exists never which specific pairs'),
  },
  {
    conceptId: TYPE_ERRORS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'TYPE I AND TYPE II ERRORS OCCUPY SPECIFIC, NON-INTERCHANGEABLE CELLS IN THE 2×2 TABLE — '
      + 'NEVER SWAPPED: a medical test rejects H0="no disease" (concluding the patient HAS it), but '
      + 'the patient actually does NOT have the disease — H0 was TRUE, the decision REJECTED it: '
      + 'this is EXACTLY a Type I error (false positive), rate α. Contrast: the SAME test FAILS to '
      + 'reject H0 (concluding no disease), but the patient ACTUALLY HAS the disease — H0 was '
      + 'FALSE, the decision FAILED TO REJECT it: this is EXACTLY a Type II error (false negative), '
      + 'rate β. Getting the SPECIFIC pairing right, not just "there are two kinds of errors," is '
      + 'essential.\n\n'
      + 'DECREASING α INCREASES β FOR FIXED n — NEVER A COST-FREE IMPROVEMENT: setting α=0.01 '
      + 'instead of 0.05 (a stricter threshold) with n held FIXED makes H0 HARDER to reject — '
      + 'reducing false positives (Type I errors) — but this SAME stricter threshold also makes it '
      + 'HARDER to correctly reject a truly false H0, INCREASING false negatives (Type II errors, '
      + 'β). Assuming a stricter α is an unambiguous improvement with no cost misses this DIRECT '
      + 'consequence — for FIXED n, reducing one error rate ALWAYS raises the other; only '
      + 'INCREASING the sample size can reduce BOTH simultaneously.',
    targetedMisconceptions: [`${TYPE_ERRORS}:MC-1`, `${TYPE_ERRORS}:MC-2`],
    source: eb(TYPE_ERRORS, 'Core Understanding — Type I and Type II errors occupying specific non-interchangeable cells in the 2x2 table never swapped, and decreasing alpha increasing beta for fixed n never a cost-free improvement'),
  },
  {
    conceptId: TEST_STATISTIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A TEST STATISTIC\'S VALUE ONLY CARRIES MEANING THROUGH ITS POSITION RELATIVE TO THE NULL '
      + 'DISTRIBUTION — NEVER AS A BARE NUMBER: comparing z=2.5 against z=0.3: z=2.5 is FAR into '
      + 'the tail of the standard normal (unusual, unlikely under H0), while z=0.3 sits near the '
      + 'CENTER (typical, unremarkable under H0). The LARGER magnitude indicates the data would be '
      + 'more SURPRISING if H0 were true — hence stronger evidence against it. Treating "z=2.5" as '
      + 'simply "a computed number," without connecting its MAGNITUDE to how unusual that value is '
      + 'under the null distribution, misses the entire point of a test statistic.\n\n'
      + 'DIFFERENT TESTS USE DIFFERENT KNOWN REFERENCE DISTRIBUTIONS — NEVER ONE-SIZE-FITS-ALL: a '
      + 'one-sample mean test with KNOWN σ uses the z-distribution; the SAME test with UNKNOWN σ '
      + '(estimated by s) uses the t-distribution (with n-1 degrees of freedom); a chi-squared '
      + 'goodness-of-fit test uses the χ²-distribution. This KNOWN reference distribution under H0 '
      + 'is EXACTLY what makes a p-value computable — without it, there would be no basis for '
      + 'judging whether an observed value is surprising.\n\n'
      + 'MORE EXTREME STATISTIC MEANS SMALLER P-VALUE — NEVER A LARGER ONE: a test statistic in '
      + 'the extreme tail of the null distribution has a SMALLER p-value than one near the center, '
      + 'because the p-value is DEFINED as the tail probability of observing something at least as '
      + 'extreme — and there is LESS tail area beyond a MORE extreme point. Assuming "bigger '
      + 'statistic = bigger p-value" mistakenly generalizes "bigger number = bigger probability" '
      + 'without accounting for the tail-probability definition; the relationship is genuinely '
      + 'INVERSE.',
    targetedMisconceptions: [`${TEST_STATISTIC}:MC-1`, `${TEST_STATISTIC}:MC-2`],
    source: eb(TEST_STATISTIC, 'Core Understanding — a test statistic\'s value only carrying meaning through its position relative to the null distribution never as a bare number, different tests using different known reference distributions never one-size-fits-all, and a more extreme statistic meaning a smaller p-value never a larger one'),
  },
]

export const MATHEMATICS_STATS_ANOVA_TYPE_ERRORS_TEST_STATISTIC_PROBES: SeedProbe[] = [
  {
    conceptId: ANOVA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is running ANOVA basically the same as running a pairwise t-test for every pair of groups?',
    choices: [
      { text: "No — testing three fertilizer types with H0:μA=μB=μC, running three separate pairwise t-tests each at α=0.05 inflates the overall false-positive chance to roughly 1-(0.95)³≈14.3%; ANOVA's single combined F-test avoids this inflation, testing all means at once while controlling the overall error rate at the stated α", isCorrect: true },
      { text: "Yes, ANOVA is essentially equivalent to running a separate pairwise t-test for every pair of groups", isCorrect: false, misconceptionId: `${ANOVA}:MC-1` },
      { text: "Since ANOVA and pairwise t-tests both compare group means, they should produce the same overall error-rate guarantee", isCorrect: false, misconceptionId: `${ANOVA}:MC-1` },
    ],
    targetedMisconceptions: [`${ANOVA}:MC-1`],
    source: eb(ANOVA, 'Discovery Question 1 as a detection probe (verbatim) — whether ANOVA is basically the same as running pairwise t-tests for every pair, an answer of "yes" confirming ANOVA-CONFLATED-WITH-REPEATED-PAIRWISE-TESTS'),
  },
  {
    conceptId: ANOVA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are SS_Between and SS_Within just two separately computed numbers that happen to be related, or are they guaranteed to add up to SS_Total exactly?',
    choices: [
      { text: "Guaranteed to add up exactly — for Group A: 2,4; B: 6,8; C: 10,12: SSTotal=70, SSBetween=64, SSWithin=6, and 64+6=70 exactly by construction; this is an algebraic identity, never a coincidence to verify after the fact", isCorrect: true },
      { text: "They are two independently computed quantities that merely happen to be related in this case", isCorrect: false, misconceptionId: `${ANOVA}:MC-2` },
      { text: "Since SS_Between and SS_Within measure different sources of variation, whether they sum to SS_Total should depend on the specific dataset", isCorrect: false, misconceptionId: `${ANOVA}:MC-2` },
    ],
    targetedMisconceptions: [`${ANOVA}:MC-2`],
    source: eb(ANOVA, 'Discovery Question 2 as a detection probe (verbatim) — whether SS_Between and SS_Within are separately computed or guaranteed to sum to SS_Total, an answer treating them as coincidental confirming SS-DECOMPOSITION-TREATED-AS-COINCIDENTAL'),
  },
  {
    conceptId: ANOVA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "If ANOVA's F-test is significant, does that tell you specifically which groups differ from each other?",
    choices: [
      { text: "No — F=16 is strong evidence against H0 that SOME group's mean differs, but this ANOVA result alone does not establish whether it's A≠B, A≠C, B≠C, or all three; pinpointing which specific pair(s) requires a separate post-hoc test (e.g. Tukey's HSD), never part of the F-test itself", isCorrect: true },
      { text: "Yes, a significant F-test identifies specifically which groups differ from each other", isCorrect: false, misconceptionId: `${ANOVA}:MC-3` },
      { text: "Since the F-test detects that some group's mean is different, it should also reveal which specific comparison drove that result", isCorrect: false, misconceptionId: `${ANOVA}:MC-3` },
    ],
    targetedMisconceptions: [`${ANOVA}:MC-3`],
    source: eb(ANOVA, 'Discovery Question 3 as a detection probe (verbatim) — whether a significant F-test identifies which groups specifically differ, an answer of "yes" confirming SIGNIFICANT-F-ASSUMED-TO-IDENTIFY-WHICH-GROUPS-DIFFER'),
  },
  {
    conceptId: TYPE_ERRORS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If H0 is actually true but the test rejects it, is that a Type I or a Type II error?',
    choices: [
      { text: "Type I error — a medical test rejects H0='no disease' (concluding the patient HAS it) but the patient actually does NOT have it: H0 was TRUE, the decision REJECTED it, exactly the false-positive Type I error, rate α", isCorrect: true },
      { text: "Type II error — rejecting a true H0 is a Type II error", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-1` },
      { text: "Since any wrong decision counts as an error, whether it's called Type I or Type II shouldn't depend on the specific truth/decision combination", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-1` },
    ],
    targetedMisconceptions: [`${TYPE_ERRORS}:MC-1`],
    source: eb(TYPE_ERRORS, 'Discovery Question 1 as a detection probe (verbatim) — whether rejecting a true H0 is Type I or Type II, an answer of "Type II" confirming TYPE-I-AND-TYPE-II-ERROR-TRUTH-DECISION-COMBINATIONS-SWAPPED-OR-CONFUSED'),
  },
  {
    conceptId: TYPE_ERRORS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you make α stricter without changing the sample size, does that reduce both types of errors, or just one at the cost of the other?',
    choices: [
      { text: "Just one at the cost of the other — setting α=0.01 instead of 0.05 with n fixed makes H0 harder to reject, reducing Type I errors, but also makes it harder to correctly reject a truly false H0, INCREASING Type II errors (β); only increasing sample size can reduce both simultaneously", isCorrect: true },
      { text: "Yes, making α stricter reduces both Type I and Type II errors simultaneously with no downside", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-2` },
      { text: "Since a stricter significance level generally means a more careful test, it should improve both error rates together", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-2` },
    ],
    targetedMisconceptions: [`${TYPE_ERRORS}:MC-2`],
    source: eb(TYPE_ERRORS, 'Discovery Question 3 as a detection probe (verbatim) — whether a stricter alpha with fixed n reduces both error types or trades one for the other, an answer of "reduces both" confirming REDUCING-ALPHA-ASSUMED-TO-BE-A-COST-FREE-IMPROVEMENT-WITHOUT-INCREASING-BETA'),
  },
  {
    conceptId: TYPE_ERRORS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If H0 is actually false but the test fails to reject it, is that a Type I or a Type II error?',
    choices: [
      { text: "Type II error — the same medical test fails to reject H0 (concluding no disease) but the patient ACTUALLY HAS the disease: H0 was FALSE, the decision FAILED TO REJECT it, exactly the false-negative Type II error, rate β", isCorrect: true },
      { text: "Type I error — failing to reject a false H0 is a Type I error", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-1` },
      { text: "Since both truth/decision mismatches represent the test being wrong in some way, the specific error label shouldn't matter much", isCorrect: false, misconceptionId: `${TYPE_ERRORS}:MC-1` },
    ],
    targetedMisconceptions: [`${TYPE_ERRORS}:MC-1`],
    source: eb(TYPE_ERRORS, 'Discovery Question 2 as a detection probe (verbatim) — whether failing to reject a false H0 is Type I or Type II, an answer of "Type I" re-targeting TYPE-I-AND-TYPE-II-ERROR-TRUTH-DECISION-COMBINATIONS-SWAPPED-OR-CONFUSED via the complementary cell of the 2x2 table, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: TEST_STATISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does the number '2.5' by itself tell you anything about the strength of evidence against H0, without knowing what distribution it's being compared against?",
    choices: [
      { text: "No — z=2.5 is far into the tail of the standard normal (unusual, unlikely under H0) while z=0.3 sits near the center (typical); the LARGER magnitude only carries meaning through its position relative to the null distribution, never as a bare number on its own", isCorrect: true },
      { text: "Yes, the number 2.5 by itself tells you the strength of evidence against H0 regardless of any reference distribution", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-1` },
      { text: "Since a larger number generally suggests a stronger effect, 2.5 should already indicate meaningfully strong evidence on its own", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-1` },
    ],
    targetedMisconceptions: [`${TEST_STATISTIC}:MC-1`],
    source: eb(TEST_STATISTIC, 'Discovery Question 1 as a detection probe (verbatim) — whether the number 2.5 by itself tells you anything without knowing the reference distribution, an answer of "yes" confirming TEST-STATISTIC-VALUE-TREATED-AS-A-BARE-NUMBER-DISCONNECTED-FROM-THE-NULL-DISTRIBUTION'),
  },
  {
    conceptId: TEST_STATISTIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If one test statistic is more extreme (farther into the tail) than another, does it have a larger or smaller p-value?',
    choices: [
      { text: "Smaller — the p-value is defined as the tail probability of observing something at least as extreme, and there is LESS tail area beyond a MORE extreme point; the relationship is genuinely inverse, never bigger-statistic-means-bigger-p-value", isCorrect: true },
      { text: "Larger — a more extreme test statistic corresponds to a larger p-value", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-2` },
      { text: "Since a bigger number usually corresponds to a bigger measured quantity, a more extreme statistic should reasonably give a bigger p-value too", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-2` },
    ],
    targetedMisconceptions: [`${TEST_STATISTIC}:MC-2`],
    source: eb(TEST_STATISTIC, 'Discovery Question 3 as a detection probe (verbatim) — whether a more extreme test statistic has a larger or smaller p-value, an answer of "larger" confirming LARGER-TEST-STATISTIC-ASSUMED-TO-CORRESPOND-TO-LARGER-P-VALUE'),
  },
  {
    conceptId: TEST_STATISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a one-sample mean test with known σ use the same reference distribution as one with unknown σ?',
    choices: [
      { text: "No — a one-sample mean test with KNOWN σ uses the z-distribution, while the SAME test with UNKNOWN σ (estimated by s) uses the t-distribution with n-1 degrees of freedom; different tests use different known reference distributions, never one-size-fits-all", isCorrect: true },
      { text: "Yes, both known-σ and unknown-σ one-sample mean tests use the identical reference distribution", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-1` },
      { text: "Since both tests examine the same population mean, the underlying reference distribution used for the p-value calculation should be interchangeable", isCorrect: false, misconceptionId: `${TEST_STATISTIC}:MC-1` },
    ],
    targetedMisconceptions: [`${TEST_STATISTIC}:MC-1`],
    source: eb(TEST_STATISTIC, 'Discovery Question 2 as a detection probe (verbatim) — whether a known-sigma and unknown-sigma one-sample mean test use the same reference distribution, an answer of "yes" re-targeting the reference-distribution-matching content via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
]
