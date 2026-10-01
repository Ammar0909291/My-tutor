/**
 * Batch: hypothesis-testing, ci-proportion, ci-mean (math.stats) —
 * advances the domain from 16/40 to 19/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's sampling-
 * distribution/confidence-interval: hypothesis-testing requires sampling-
 * distribution + math.prob.conditional-probability; ci-proportion and
 * ci-mean both require confidence-interval (ci-mean also requires
 * math.prob.continuous-distributions) — all already authored. Transcribed
 * from their frozen Educational Brain entries at educational-brain/
 * concepts/mathematics/math.stats.hypothesis-testing.md,
 * math.stats.ci-proportion.md, and math.stats.ci-mean.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline and all prerequisites' own HIGH band.
 *
 * hypothesis-testing registers 3 formal misconceptions (full contract, no
 * retargeting needed). ci-proportion and ci-mean each register only 2; per
 * this campaign's established convention, each concept's 3rd PROFICIENT
 * probe re-targets one of the two existing misconceptions via a fresh
 * worked example rather than inventing a fake third misconception.
 *
 * Note: hypothesis-testing's KG entry marks it a terminal node (unlocks
 * none) in the current Mathematics Knowledge Graph — confirmed exact match
 * in its own EB entry's Curriculum Feedback.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const HYPOTHESIS_TESTING = 'math.stats.hypothesis-testing'
const CI_PROPORTION = 'math.stats.ci-proportion'
const CI_MEAN = 'math.stats.ci-mean'

export const MATHEMATICS_STATS_HYPOTHESIS_TESTING_CI_PROPORTION_CI_MEAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HYPOTHESIS_TESTING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE P-VALUE IS P(DATA|H0) — NEVER P(H0|DATA): for a website-design test, H0:μ=45s, '
      + 'H1:μ>45s, n=100, x̄=48s, s=15s: the test statistic is z=(48-45)/(15/√100)=3/1.5=2, giving '
      + 'p-value P(Z≥2)≈0.023. The CORRECT interpretation: "IF H0 were true (true mean really '
      + '45s), there would only be a 2.3% chance of observing a sample mean this high purely by '
      + 'random variation." The INCORRECT interpretation, "there\'s a 2.3% chance H0 is true," '
      + 'REVERSES the conditional entirely — the p-value is computed BY ASSUMING H0 throughout, so '
      + 'it can NEVER simultaneously report H0\'s own probability; this is EXACTLY the general '
      + 'P(A|B)≠P(B|A) error, now appearing in its highest-stakes statistical form.\n\n'
      + 'FAILING TO REJECT H0 MEANS INSUFFICIENT EVIDENCE — NEVER PROOF THAT H0 IS TRUE: a p-value '
      + 'of 0.08 against α=0.05 leads to "fail to reject H0" — this means the test did NOT find '
      + 'strong enough evidence against H0 with this sample, NEVER that H0 has been PROVEN true; '
      + 'absence of evidence is never evidence of absence, and a larger sample or different data '
      + 'could still reveal a real effect this particular test missed.\n\n'
      + 'TYPE I AND TYPE II ERRORS ARE DISTINCT, TRADING OFF AGAINST EACH OTHER — NEVER BOTH '
      + 'REDUCED BY ADJUSTING α ALONE: for a medical test, H0="no disease," H1="has disease": a '
      + 'Type I error (rejecting a TRUE H0) means wrongly telling a healthy patient they are sick '
      + '— a false positive. A Type II error (failing to reject a FALSE H0) means missing a sick '
      + 'patient entirely — a false negative. Lowering α (demanding stronger evidence to reject H0) '
      + 'reduces Type I error risk but INCREASES Type II error risk, all else equal — there is NO '
      + 'way to simultaneously minimize both by adjusting α alone; only genuinely MORE DATA '
      + 'improves both at once.',
    targetedMisconceptions: [`${HYPOTHESIS_TESTING}:MC-1`, `${HYPOTHESIS_TESTING}:MC-2`, `${HYPOTHESIS_TESTING}:MC-3`],
    source: eb(HYPOTHESIS_TESTING, 'Core Understanding — the p-value being P(data|H0) never P(H0|data), failing to reject H0 meaning insufficient evidence never proof that H0 is true, and Type I and Type II errors being distinct and trading off against each other never both reduced by adjusting alpha alone'),
  },
  {
    conceptId: CI_PROPORTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE STANDARD ERROR FORMULA\'S STRUCTURE MUST BE REPRODUCED EXACTLY — NEVER p̂² OR A MISSING '
      + 'DIVISION BY n: for p̂=0.6, n=100: using z0.025≈1.96: 0.6±1.96√(0.6(0.4)/100)='
      + '0.6±1.96√0.0024=0.6±1.96(0.049)=0.6±0.096, giving (0.504,0.696). Using the WRONG variance '
      + 'formula inside the square root (e.g. p̂² instead of p̂(1-p̂), or forgetting to divide by n) '
      + 'produces a genuinely wrong interval — the formula\'s specific structure (p̂(1-p̂)/n under '
      + 'the square root) must be reproduced EXACTLY, never approximated.\n\n'
      + 'BOTH LARGE-SAMPLE CONDITIONS MUST BE CHECKED — NEVER JUST ONE: for p̂=0.98, n=40: check '
      + 'np̂=40(0.98)=39.2≥10 ✓. Check n(1-p̂)=40(0.02)=0.8 — this is NOT ≥10 ✗. Since ONE of the '
      + 'two conditions FAILS, the large-sample condition is NOT satisfied overall, and the '
      + 'normal-approximation-based interval would be UNRELIABLE. Checking ONLY the first '
      + 'condition (passing easily here) and concluding the large-sample condition holds is WRONG '
      + '— a highly skewed p̂ can pass one condition while badly failing the other, so BOTH must be '
      + 'verified INDEPENDENTLY, never assumed to travel together.\n\n'
      + 'BOTH CONDITIONS MUST HOLD SIMULTANEOUSLY FOR THE NORMAL APPROXIMATION TO BE TRUSTWORTHY: '
      + 'for a well-behaved case, p̂=0.45, n=200: check np̂=90≥10 ✓, n(1-p̂)=110≥10 ✓ — both hold, '
      + 'so the standard interval is valid: using z0.05≈1.645, 0.45±1.645√(0.45(0.55)/200)≈'
      + '0.45±0.058, giving (0.392,0.508). This well-behaved case contrasts directly with the '
      + 'p̂=0.98 failure — demonstrating that skew (not just sample size alone) drives whether both '
      + 'conditions hold.',
    targetedMisconceptions: [`${CI_PROPORTION}:MC-1`, `${CI_PROPORTION}:MC-2`],
    source: eb(CI_PROPORTION, 'Core Understanding — the standard error formula\'s structure needing to be reproduced exactly never p-hat-squared or a missing division by n, and both large-sample conditions needing to be checked never just one since a skewed p-hat can pass one while failing the other'),
  },
  {
    conceptId: CI_MEAN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'USE z ONLY WHEN σ IS GENUINELY KNOWN — NEVER REACHING FOR t OUT OF HABIT WHEN z APPLIES: '
      + 'for x̄=50, KNOWN σ=8, n=64: using z0.025≈1.96: 50±1.96·8/√64=50±1.96(1)=50±1.96, giving '
      + '(48.04,51.96). Using the t-distribution\'s critical value here — even though σ is '
      + 'GENUINELY known — is an unnecessary habit that misses the actual distinguishing condition '
      + '(though it still produces a valid, if overly conservative, interval); the z-interval is '
      + 'the correct and simpler choice specifically when σ is known.\n\n'
      + 'USE t WITH n-1 DEGREES OF FREEDOM WHEN σ IS ESTIMATED — NEVER z\'S CRITICAL VALUE: for '
      + 'x̄=50, ESTIMATED s=8, n=16: since σ is UNKNOWN, use t0.025,15≈2.131: '
      + '50±2.131·8/√16=50±2.131(2)=50±4.262, giving (45.738,54.262) — notably WIDER than if '
      + 'z=1.96 had been mistakenly used, since t0.025,15>z0.025. Using z=1.96 here UNDERSTATES the '
      + 'true uncertainty, producing an interval that is falsely NARROWER (and less genuinely "95% '
      + 'confident") than it should be — a genuinely wrong, overconfident result, never a merely '
      + 'conservative one.\n\n'
      + 'WIDTH SHRINKS WITH LARGER n BUT GROWS WITH HIGHER CONFIDENCE — TWO SEPARATE, NEVER '
      + 'CONFLATED, EFFECTS: comparing a 95% interval (z≈1.96) against a 99% interval (z≈2.576) '
      + 'for the SAME data (x̄=50, σ=8, n=64): the 99% interval is WIDER, using the larger critical '
      + 'value — greater confidence requires a wider range to maintain that higher guarantee. This '
      + 'is a genuinely SEPARATE effect from the √n-driven width shrinkage as sample size grows — '
      + 'never the same lever.',
    targetedMisconceptions: [`${CI_MEAN}:MC-1`, `${CI_MEAN}:MC-2`],
    source: eb(CI_MEAN, 'Core Understanding — using z only when sigma is genuinely known never reaching for t out of habit, using t with n-1 degrees of freedom when sigma is estimated never z\'s critical value, and width shrinking with larger n but growing with higher confidence as two separate never conflated effects'),
  },
]

export const MATHEMATICS_STATS_HYPOTHESIS_TESTING_CI_PROPORTION_CI_MEAN_PROBES: SeedProbe[] = [
  {
    conceptId: HYPOTHESIS_TESTING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "If a p-value is 0.023, does that mean there's a 2.3% chance the null hypothesis is true?",
    choices: [
      { text: "No — for H0:μ=45s, H1:μ>45s, z=2, p-value≈0.023 means \"IF H0 were true, there would only be a 2.3% chance of observing a sample mean this high purely by random variation\"; the p-value is computed BY ASSUMING H0, so it can never simultaneously report H0's own probability", isCorrect: true },
      { text: "Yes, a p-value of 0.023 means there is a 2.3% chance that the null hypothesis is true", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-1` },
      { text: "Since the p-value measures how likely the observed result is under the null, it should directly translate into how likely the null itself is", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-1` },
    ],
    targetedMisconceptions: [`${HYPOTHESIS_TESTING}:MC-1`],
    source: eb(HYPOTHESIS_TESTING, 'Discovery Question 1 as a detection probe (verbatim) — whether a p-value of 0.023 means a 2.3% chance the null hypothesis is true, an answer of "yes" confirming P-VALUE-INTERPRETED-AS-PROBABILITY-H0-TRUE'),
  },
  {
    conceptId: HYPOTHESIS_TESTING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a test fails to reject H0, has H0 been proven true?',
    choices: [
      { text: "No — a p-value of 0.08 against α=0.05 leads to \"fail to reject H0,\" meaning the test did not find strong enough evidence against H0 with this sample, never that H0 has been proven true; absence of evidence is never evidence of absence", isCorrect: true },
      { text: "Yes, failing to reject H0 proves that H0 is true", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-2` },
      { text: "Since the test specifically checked for evidence against H0 and found none strong enough, that outcome should count as confirming H0", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-2` },
    ],
    targetedMisconceptions: [`${HYPOTHESIS_TESTING}:MC-2`],
    source: eb(HYPOTHESIS_TESTING, 'Discovery Question 2 as a detection probe (verbatim) — whether failing to reject H0 proves H0 true, an answer of "yes" confirming FAIL-TO-REJECT-INTERPRETED-AS-PROVING-H0'),
  },
  {
    conceptId: HYPOTHESIS_TESTING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If you lower the significance level α to reduce false positives, does that also reduce false negatives?',
    choices: [
      { text: "No — for a medical test, lowering α (demanding stronger evidence to reject H0) reduces Type I error risk (false positive, wrongly telling a healthy patient they're sick) but INCREASES Type II error risk (false negative, missing a sick patient); there's no way to simultaneously minimize both by adjusting alpha alone, only more data improves both", isCorrect: true },
      { text: "Yes, lowering alpha to reduce false positives also automatically reduces false negatives", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-3` },
      { text: "Since both Type I and Type II errors are undesirable outcomes, tightening the test's standards should reduce both kinds of mistakes together", isCorrect: false, misconceptionId: `${HYPOTHESIS_TESTING}:MC-3` },
    ],
    targetedMisconceptions: [`${HYPOTHESIS_TESTING}:MC-3`],
    source: eb(HYPOTHESIS_TESTING, 'Discovery Question 3 as a detection probe (verbatim) — whether lowering alpha to reduce false positives also reduces false negatives, an answer of "yes" confirming TYPE-I-AND-TYPE-II-ERROR-CONFLATED'),
  },
  {
    conceptId: CI_PROPORTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the formula under the square root p̂(1−p̂)/n, or something else?',
    choices: [
      { text: "p̂(1−p̂)/n exactly — for p̂=0.6, n=100: 0.6±1.96√(0.6(0.4)/100)=0.6±0.096, giving (0.504,0.696); using p̂² instead of p̂(1-p̂), or forgetting to divide by n, produces a genuinely wrong interval", isCorrect: true },
      { text: "The formula under the square root is p̂² divided by n, not p̂(1−p̂)/n", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-1` },
      { text: "Since p̂ already represents the proportion, squaring it directly should give a reasonable approximation of the variance term", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-1` },
    ],
    targetedMisconceptions: [`${CI_PROPORTION}:MC-1`],
    source: eb(CI_PROPORTION, 'Discovery Question 1 as a detection probe (verbatim) — whether the formula under the square root is p-hat(1-p-hat)/n or something else, an answer proposing p-hat-squared confirming STANDARD-ERROR-FORMULA-FOR-PROPORTION-MISCONSTRUCTED'),
  },
  {
    conceptId: CI_PROPORTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If n×p̂ is comfortably above 10, does that guarantee n×(1−p̂) is too?',
    choices: [
      { text: "No — for p̂=0.98, n=40: np̂=39.2≥10 passes easily, but n(1-p̂)=0.8 fails; a highly skewed p̂ can pass one condition while badly failing the other, so both must be verified independently, never assumed to travel together", isCorrect: true },
      { text: "Yes, if n times p-hat comfortably clears 10, then n times (1 minus p-hat) is guaranteed to as well", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-2` },
      { text: "Since both quantities come from the same sample size n, passing one large-sample check should reasonably imply the other passes too", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CI_PROPORTION}:MC-2`],
    source: eb(CI_PROPORTION, 'Discovery Question 2 as a detection probe (verbatim) — whether n times p-hat comfortably above 10 guarantees n times (1-p-hat) is too, an answer of "yes" confirming ONLY-ONE-LARGE-SAMPLE-CONDITION-CHECKED-INSTEAD-OF-BOTH'),
  },
  {
    conceptId: CI_PROPORTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a survey with p̂=0.03 (3% awareness) and n=300, is it safe to construct the standard proportion CI without further checks?',
    choices: [
      { text: "No — check both conditions independently: np̂=300(0.03)=9, which is NOT ≥10, so the large-sample condition already fails on this count alone; even without checking n(1-p̂), one failing condition is enough to make the normal-approximation-based interval unreliable, so both must always be verified", isCorrect: true },
      { text: "Yes, since n=300 is a fairly large sample size, the standard proportion CI can be constructed safely regardless of p̂", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-2` },
      { text: "Since np̂ and n(1-p̂) both come from the same well-behaved sample size, a large overall n should be sufficient on its own", isCorrect: false, misconceptionId: `${CI_PROPORTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CI_PROPORTION}:MC-2`],
    source: eb(CI_PROPORTION, 'A fresh worked example re-targeting the both-conditions-must-be-checked distinction (a low-awareness p̂=0.03 survey instead of p̂=0.98) at PROFICIENT difficulty, since this EB entry registers only 2 formal misconceptions — an answer treating large n alone as sufficient confirming ONLY-ONE-LARGE-SAMPLE-CONDITION-CHECKED-INSTEAD-OF-BOTH'),
  },
  {
    conceptId: CI_MEAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is σ genuinely known here, or would using t be a harmless (if unnecessary) habit? (x̄=50, KNOWN σ=8, n=64)',
    choices: [
      { text: "σ is genuinely known, so z is the correct and simpler choice — 50±1.96·8/√64=50±1.96, giving (48.04,51.96); reaching for t here would still produce a valid but overly conservative interval, missing the actual distinguishing condition", isCorrect: true },
      { text: "Since a distribution parameter is involved, the t-distribution should always be used regardless of whether σ is known", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-1` },
      { text: "Because sample-based intervals are generally safer with t, it should be preferred here even with σ known", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-1` },
    ],
    targetedMisconceptions: [`${CI_MEAN}:MC-1`],
    source: eb(CI_MEAN, 'Discovery Question 1 as a detection probe (verbatim) — whether sigma is genuinely known or using t would be a harmless habit, an answer defaulting to t regardless confirming T-DISTRIBUTION-USED-EVEN-WHEN-SIGMA-IS-GENUINELY-KNOWN'),
  },
  {
    conceptId: CI_MEAN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "If σ is estimated by s, does using z's critical value give a valid interval, or does it understate the uncertainty?",
    choices: [
      { text: "It understates the uncertainty — for x̄=50, ESTIMATED s=8, n=16: the correct t0.025,15≈2.131 gives 50±4.262, notably WIDER than the falsely narrow 50±1.96(2)=50±3.92 that using z would give; z=1.96 here produces a genuinely wrong, overconfident result", isCorrect: true },
      { text: "Yes, using z's critical value still gives a perfectly valid interval even when σ is estimated by s", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-2` },
      { text: "Since s is meant to substitute for σ, plugging it into the same z-based formula should give an equally trustworthy result", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-2` },
    ],
    targetedMisconceptions: [`${CI_MEAN}:MC-2`],
    source: eb(CI_MEAN, 'Discovery Question 2 as a detection probe (verbatim) — whether using z\'s critical value when sigma is estimated by s gives a valid interval or understates uncertainty, an answer of "valid" confirming Z-CRITICAL-VALUE-USED-WHEN-SIGMA-IS-UNKNOWN-AND-ESTIMATED-BY-S'),
  },
  {
    conceptId: CI_MEAN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A pharmaceutical researcher has x̄=12, sample-estimated s=3, n=9 (σ unknown). Should they use z0.025≈1.96 or t0.025,8≈2.306 to build a 95% CI for the mean?',
    choices: [
      { text: "t0.025,8≈2.306 — since σ is unknown and estimated by s, the t-distribution with n-1=8 degrees of freedom is required; using z=1.96 instead would understate the true uncertainty from estimating s, producing a falsely narrower interval than the evidence supports", isCorrect: true },
      { text: "z0.025≈1.96, since it's the more commonly used critical value for a 95% confidence interval", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-2` },
      { text: "Either critical value works equally well here since both are close in magnitude for a 95% interval", isCorrect: false, misconceptionId: `${CI_MEAN}:MC-2` },
    ],
    targetedMisconceptions: [`${CI_MEAN}:MC-2`],
    source: eb(CI_MEAN, 'A fresh worked example re-targeting the sigma-unknown t-distribution requirement (a pharmaceutical n=9 sample instead of n=16) at PROFICIENT difficulty, since this EB entry registers only 2 formal misconceptions — an answer choosing z over t confirming Z-CRITICAL-VALUE-USED-WHEN-SIGMA-IS-UNKNOWN-AND-ESTIMATED-BY-S'),
  },
]
