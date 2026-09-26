/**
 * Batch: t-test, z-test, chi-squared-test (math.stats) — advances the
 * domain from 19/40 to 22/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's hypothesis-testing:
 * all three concepts require hypothesis-testing (t-test and chi-squared-
 * test also require math.prob.continuous-distributions, z-test also
 * requires math.prob.standard-normal) — all already authored. Transcribed
 * from their frozen Educational Brain entries at educational-brain/
 * concepts/mathematics/math.stats.t-test.md, math.stats.z-test.md, and
 * math.stats.chi-squared-test.md.
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

const T_TEST = 'math.stats.t-test'
const Z_TEST = 'math.stats.z-test'
const CHI_SQUARED_TEST = 'math.stats.chi-squared-test'

export const MATHEMATICS_STATS_T_TEST_Z_TEST_CHI_SQUARED_TEST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: T_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'UNKNOWN σ REQUIRES THE t-DISTRIBUTION\'S CRITICAL VALUE — NEVER THE NORMAL DISTRIBUTION\'S: '
      + 'testing H0:μ=20, Ha:μ≠20, with x̄=22, ESTIMATED s=4, n=25: T=(22-20)/(4/√25)=2/0.8=2.5, '
      + 'compared against t0.025,24≈2.064 — since 2.5>2.064, REJECT H0. Using the NORMAL '
      + 'distribution\'s critical value (1.96) instead is WRONG here — since σ is ESTIMATED (not '
      + 'known), the t-distribution\'s fatter tails, which account for the extra estimation '
      + 'uncertainty, are the correct reference, never the normal.\n\n'
      + 'PAIRED DATA REQUIRES THE PAIRED t-TEST — NEVER TREATED AS TWO INDEPENDENT GROUPS: for 15 '
      + 'patients\' blood pressure measured BEFORE and AFTER treatment (the SAME patients, matched '
      + 'pairs): since the before/after values are NATURALLY CORRELATED (each patient is their own '
      + 'baseline), the PAIRED test correctly analyzes the WITHIN-PATIENT DIFFERENCES directly — '
      + 'first computing each pair\'s difference, then running an ordinary ONE-SAMPLE test on those '
      + 'differences. Treating "before" and "after" as two INDEPENDENT groups IGNORES the pairing '
      + 'structure entirely, discarding valuable information and typically producing a LESS '
      + 'POWERFUL or misleading result.\n\n'
      + 'ROBUSTNESS TO NON-NORMALITY IS A LARGE-SAMPLE PROPERTY — NEVER A UNIVERSAL GUARANTEE: for '
      + 'a large sample (n=200) from a SKEWED population, the Central Limit Theorem ensures X̄\'s '
      + 'sampling distribution is approximately normal REGARDLESS of the underlying population\'s '
      + 'shape, making the t-test reasonably robust. For a SMALL sample (n=8) from an equally '
      + 'skewed population, there is NOT enough data for the CLT\'s approximation to reliably kick '
      + 'in, so the population\'s genuine non-normality CAN meaningfully distort the test\'s '
      + 'validity — robustness is earned by sample size, never assumed automatically regardless of '
      + 'n.',
    targetedMisconceptions: [`${T_TEST}:MC-1`, `${T_TEST}:MC-2`],
    source: eb(T_TEST, 'Core Understanding — unknown sigma requiring the t-distribution\'s critical value never the normal distribution\'s, paired data requiring the paired t-test never treated as two independent groups, and robustness to non-normality being a large-sample property never a universal guarantee'),
  },
  {
    conceptId: Z_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE Z-TEST REQUIRES σ GENUINELY KNOWN — NEVER s SILENTLY SUBSTITUTED: testing H0:μ=100, '
      + 'Ha:μ≠100, with x̄=104, KNOWN σ=8, n=64: Z=(104-100)/(8/√64)=4/1=4. This calculation is '
      + 'valid ONLY because σ is genuinely known — the z-test\'s normal-distribution reference is '
      + 'specifically justified by that assumption. Using the SAMPLE standard deviation s in place '
      + 'of σ without recognizing this changes the test\'s validity requirements introduces '
      + 'unaccounted-for extra uncertainty; that scenario calls for the t-test instead.\n\n'
      + 'ONE-TAILED AND TWO-TAILED TESTS USE DIFFERENT CRITICAL VALUES — NEVER THE SAME ONE '
      + 'REGARDLESS OF STRUCTURE: for Z=1.75 at α=0.05: a TWO-tailed test (Ha:μ≠μ0) compares '
      + '|Z|=1.75 against z0.025≈1.96 — since 1.75<1.96, FAIL TO REJECT. A ONE-tailed test '
      + '(Ha:μ>μ0) compares Z=1.75 against z0.05≈1.645 — since 1.75>1.645, REJECT. The IDENTICAL '
      + 'observed Z value leads to OPPOSITE decisions depending on which critical value — and hence '
      + 'which alternative-hypothesis structure — is appropriate.\n\n'
      + 'RECOGNIZING WHEN THE Z-TEST DOESN\'T APPLY IS PART OF USING IT CORRECTLY — NEVER ASSUMED '
      + 'UNCONDITIONALLY VALID: given sample data with sample standard deviation s=6 computed FROM '
      + 'the data, with no independently-known population σ: the z-test\'s core requirement '
      + '(genuinely known σ) is NOT met here — the t-test (using the t-distribution with n-1 '
      + 'degrees of freedom) is the appropriate choice, correctly accounting for the extra '
      + 'uncertainty from ESTIMATING σ. The known-σ z-test scenario is comparatively RARE in '
      + 'practice — most real analyses estimate σ from the sample.',
    targetedMisconceptions: [`${Z_TEST}:MC-1`, `${Z_TEST}:MC-2`],
    source: eb(Z_TEST, 'Core Understanding — the z-test requiring sigma genuinely known never s silently substituted, one-tailed and two-tailed tests using different critical values never the same one regardless of structure, and recognizing when the z-test doesn\'t apply being part of using it correctly never assumed unconditionally valid'),
  },
  {
    conceptId: CHI_SQUARED_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'EACH TERM MUST BE SQUARED AND DIVIDED BY ITS OWN EXPECTED VALUE — NEVER SUMMED DIRECTLY: '
      + 'for observed O={18,22,25,15}, expected E={20,20,20,20}: '
      + 'χ²=(18-20)²/20+(22-20)²/20+(25-20)²/20+(15-20)²/20=4/20+4/20+25/20+25/20='
      + '0.2+0.2+1.25+1.25=2.9. Omitting the SQUARING (or forgetting to divide by E for EACH term '
      + 'separately) and computing Σ(O-E) directly is WRONG — that sum is zero by construction, an '
      + 'obviously invalid "statistic." Each term must be squared and divided by its OWN '
      + 'category\'s expected frequency, then summed — never a shortcut.\n\n'
      + 'GOODNESS-OF-FIT AND INDEPENDENCE ARE GENUINELY DIFFERENT TESTS — NEVER INTERCHANGEABLE '
      + 'METHODS: testing whether a company\'s complaints are evenly distributed across 5 product '
      + 'categories is GOODNESS-OF-FIT (one variable compared to a theoretical distribution); '
      + 'testing whether customer satisfaction relates to which of 3 branches a customer visited is '
      + 'INDEPENDENCE (two variables, checked via a contingency table). Applying the '
      + 'goodness-of-fit computation method to a genuinely TWO-VARIABLE independence scenario is '
      + 'WRONG — the two scenarios require genuinely different data structures and expected-'
      + 'frequency computations, the latter derived from row/column totals, never the former\'s '
      + 'specified proportions.\n\n'
      + 'DEGREES OF FREEDOM USE DIFFERENT FORMULAS BY TEST TYPE — NEVER THE SAME FORMULA FOR BOTH: '
      + 'for a goodness-of-fit test with 6 categories: df=6-1=5. For an independence test with a '
      + '3×4 contingency table: df=(3-1)(4-1)=2×3=6 — genuinely DIFFERENT from applying k-1 to the '
      + 'total cell count (which would wrongly give df=3×4-1=11). The independence test\'s '
      + 'degrees-of-freedom formula reflects the table\'s ROW-AND-COLUMN structure, never simply '
      + '"total cells minus one."',
    targetedMisconceptions: [`${CHI_SQUARED_TEST}:MC-1`, `${CHI_SQUARED_TEST}:MC-2`],
    source: eb(CHI_SQUARED_TEST, 'Core Understanding — each term needing to be squared and divided by its own expected value never summed directly, goodness-of-fit and independence being genuinely different tests never interchangeable methods, and degrees of freedom using different formulas by test type never the same formula for both'),
  },
]

export const MATHEMATICS_STATS_T_TEST_Z_TEST_CHI_SQUARED_TEST_PROBES: SeedProbe[] = [
  {
    conceptId: T_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since σ here is estimated from the sample, should you use the normal distribution\'s critical value, or the t-distribution\'s?',
    choices: [
      { text: "The t-distribution's — for H0:μ=20, x̄=22, ESTIMATED s=4, n=25: T=(22-20)/(4/√25)=2.5, compared against t0.025,24≈2.064 (not the normal's 1.96); since σ is estimated, the t-distribution's fatter tails correctly account for the extra estimation uncertainty", isCorrect: true },
      { text: "The normal distribution's critical value, since it applies regardless of whether σ is known or estimated", isCorrect: false, misconceptionId: `${T_TEST}:MC-1` },
      { text: "Since s is meant to approximate σ, plugging it into the normal-based formula should give an equally valid test", isCorrect: false, misconceptionId: `${T_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${T_TEST}:MC-1`],
    source: eb(T_TEST, 'Discovery Question 1 as a detection probe (verbatim) — whether to use the normal or t-distribution critical value when sigma is estimated, an answer favoring the normal confirming NORMAL-DISTRIBUTION-CRITICAL-VALUE-USED-INSTEAD-OF-T-DISTRIBUTION'),
  },
  {
    conceptId: T_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "If the same subjects are measured twice, should you treat 'before' and 'after' as two independent groups?",
    choices: [
      { text: "No — for 15 patients measured before and after treatment (the same patients, matched pairs), the before/after values are naturally correlated; the PAIRED test correctly analyzes within-patient differences by first computing each pair's difference, then running a one-sample test — treating them as independent groups discards valuable pairing information", isCorrect: true },
      { text: "Yes, before and after measurements on the same subjects should be treated as two independent groups", isCorrect: false, misconceptionId: `${T_TEST}:MC-2` },
      { text: "Since before and after are two distinct sets of numbers, a standard two-sample comparison should apply regardless of who was measured", isCorrect: false, misconceptionId: `${T_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${T_TEST}:MC-2`],
    source: eb(T_TEST, 'Discovery Question 2 as a detection probe (verbatim) — whether before/after measurements on the same subjects should be treated as two independent groups, an answer of "yes" confirming MATCHED-PAIR-DATA-TREATED-AS-TWO-INDEPENDENT-GROUPS-IGNORING-THE-PAIRING-STRUCTURE'),
  },
  {
    conceptId: T_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the t-test\'s tolerance for non-normal data hold equally well at any sample size?',
    choices: [
      { text: "No — for a large sample (n=200) from a skewed population, the CLT ensures X̄'s sampling distribution is approximately normal regardless of population shape, making the t-test reasonably robust; but for a small sample (n=8) from an equally skewed population, there isn't enough data for the CLT to reliably kick in, so genuine non-normality CAN distort validity", isCorrect: true },
      { text: "Yes, the t-test's robustness to non-normal data holds equally well regardless of sample size", isCorrect: false, misconceptionId: `${T_TEST}:MC-1` },
      { text: "Since the t-test is specifically designed to handle uncertainty from small samples, it should be even more forgiving of non-normality at small n", isCorrect: false, misconceptionId: `${T_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${T_TEST}:MC-1`],
    source: eb(T_TEST, 'Discovery Question 3 as a detection probe (verbatim) — whether the t-test\'s tolerance for non-normal data holds equally well at any sample size, an answer of "yes" re-targeting the deeper "no adjustment needed" pattern via a fresh worked example, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: Z_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is σ in this problem a fact given from outside, or a number computed from this same sample? (testing H0:μ=100 with x̄=104, KNOWN σ=8, n=64)',
    choices: [
      { text: "A fact given from outside — Z=(104-100)/(8/√64)=4 is valid ONLY because σ is genuinely known from outside the sample; using the sample standard deviation s in place of σ without recognizing this would require switching to the t-test instead", isCorrect: true },
      { text: "It doesn't matter whether σ is known externally or computed from the sample — either way the z-test formula applies the same way", isCorrect: false, misconceptionId: `${Z_TEST}:MC-1` },
      { text: "Since sigma represents variability either way, substituting the sample's own s for it should be a safe, minor simplification", isCorrect: false, misconceptionId: `${Z_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${Z_TEST}:MC-1`],
    source: eb(Z_TEST, 'Discovery Question 1 as a detection probe (verbatim) — whether sigma is a fact given from outside or computed from the sample, an answer treating substitution as fine confirming SAMPLE-STANDARD-DEVIATION-SUBSTITUTED-FOR-KNOWN-SIGMA-WITHOUT-SWITCHING-TO-T-TEST'),
  },
  {
    conceptId: Z_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the same critical value apply whether the test is one-tailed or two-tailed?',
    choices: [
      { text: "No — for Z=1.75 at α=0.05: a two-tailed test compares |Z|=1.75 against z0.025≈1.96 (FAIL TO REJECT since 1.75<1.96), but a one-tailed test compares Z=1.75 against z0.05≈1.645 (REJECT since 1.75>1.645); the identical Z value leads to opposite decisions depending on tail structure", isCorrect: true },
      { text: "Yes, the same critical value applies regardless of whether the test is one-tailed or two-tailed", isCorrect: false, misconceptionId: `${Z_TEST}:MC-2` },
      { text: "Since both test types use the same standard normal distribution, the threshold for significance should be identical either way", isCorrect: false, misconceptionId: `${Z_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${Z_TEST}:MC-2`],
    source: eb(Z_TEST, 'Discovery Question 2 as a detection probe (verbatim) — whether the same critical value applies for one-tailed and two-tailed tests, an answer of "yes" confirming SAME-CRITICAL-VALUE-USED-REGARDLESS-OF-ONE-TAILED-OR-TWO-TAILED-STRUCTURE'),
  },
  {
    conceptId: Z_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If only the sample standard deviation is available, is the z-test still the right choice?',
    choices: [
      { text: "No — given sample data with s=6 computed FROM the data, with no independently-known population σ, the z-test's core requirement (genuinely known σ) is NOT met; the t-test, using the t-distribution with n-1 degrees of freedom, is the appropriate choice accounting for the extra uncertainty from estimating σ", isCorrect: true },
      { text: "Yes, the z-test remains the right choice as long as some standard deviation value is available to plug in", isCorrect: false, misconceptionId: `${Z_TEST}:MC-1` },
      { text: "Since the sample standard deviation is a reasonable stand-in for the population value, the z-test formula should still give a trustworthy result", isCorrect: false, misconceptionId: `${Z_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${Z_TEST}:MC-1`],
    source: eb(Z_TEST, 'Discovery Question 3 as a detection probe (verbatim) — whether the z-test is still the right choice when only the sample standard deviation is available, an answer of "yes" re-targeting SAMPLE-STANDARD-DEVIATION-SUBSTITUTED-FOR-KNOWN-SIGMA-WITHOUT-SWITCHING-TO-T-TEST via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: CHI_SQUARED_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does summing (O−E) directly, without squaring, give a meaningful statistic?',
    choices: [
      { text: "No — for observed O={18,22,25,15}, expected E={20,20,20,20}: Σ(O-E) is zero by construction, an obviously invalid statistic; the correct χ²=Σ(O-E)²/E=2.9 requires squaring each difference and dividing by its OWN category's expected frequency before summing", isCorrect: true },
      { text: "Yes, summing (O−E) directly without squaring gives a meaningful chi-squared statistic", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-1` },
      { text: "Since (O−E) already captures the deviation for each category, summing those deviations directly should reasonably measure overall discrepancy", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${CHI_SQUARED_TEST}:MC-1`],
    source: eb(CHI_SQUARED_TEST, 'Discovery Question 1 as a detection probe (verbatim) — whether summing (O-E) directly without squaring gives a meaningful statistic, an answer of "yes" confirming CHI-SQUARED-STATISTIC-COMPUTED-WITHOUT-SQUARING-OR-DIVIDING-EACH-TERM-CORRECTLY'),
  },
  {
    conceptId: CHI_SQUARED_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is a question about one variable's distribution the same kind of test as a question about whether two variables are related?",
    choices: [
      { text: "No — testing whether complaints are evenly distributed across 5 product categories is GOODNESS-OF-FIT (one variable vs. a theoretical distribution); testing whether satisfaction relates to branch visited is INDEPENDENCE (two variables via a contingency table) — genuinely different data structures and expected-frequency computations", isCorrect: true },
      { text: "Yes, a single-variable distribution question and a two-variable relationship question use the same chi-squared test method", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-2` },
      { text: "Since both questions are answered with a chi-squared statistic, the underlying computation method should be interchangeable between them", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${CHI_SQUARED_TEST}:MC-2`],
    source: eb(CHI_SQUARED_TEST, 'Discovery Question 2 as a detection probe (verbatim) — whether a one-variable distribution question is the same kind of test as a two-variable relationship question, an answer of "yes" confirming GOODNESS-OF-FIT-METHOD-APPLIED-TO-A-GENUINELY-TWO-VARIABLE-INDEPENDENCE-SCENARIO'),
  },
  {
    conceptId: CHI_SQUARED_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a goodness-of-fit test and an independence test use the same degrees-of-freedom formula?',
    choices: [
      { text: "No — a goodness-of-fit test with 6 categories has df=6-1=5, while an independence test with a 3×4 contingency table has df=(3-1)(4-1)=6, genuinely different from applying k-1 to the total cell count (which would wrongly give df=11); the independence formula reflects the table's row-and-column structure", isCorrect: true },
      { text: "Yes, both test types use the identical k-1 degrees-of-freedom formula", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-2` },
      { text: "Since both are chi-squared tests drawing from the same reference distribution, the degrees-of-freedom formula should be the same regardless of test type", isCorrect: false, misconceptionId: `${CHI_SQUARED_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${CHI_SQUARED_TEST}:MC-2`],
    source: eb(CHI_SQUARED_TEST, 'Discovery Question 3 as a detection probe (verbatim) — whether a goodness-of-fit test and an independence test use the same degrees-of-freedom formula, an answer of "yes" confirming the degrees-of-freedom half of GOODNESS-OF-FIT-METHOD-APPLIED-TO-A-GENUINELY-TWO-VARIABLE-INDEPENDENCE-SCENARIO, re-targeted via a fresh worked example since this EB entry registers only 2 formal misconceptions'),
  },
]
