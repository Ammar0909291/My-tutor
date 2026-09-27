/**
 * Batch: mle, sufficient-statistic, nonparametric (math.stats) — advances
 * the domain from 31/40 to 34/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's consistency/method-
 * of-moments/two-way-anova: mle requires math.stats.estimator +
 * math.calc.derivative-rules + math.prob.pdf; sufficient-statistic
 * requires math.stats.estimator + math.prob.conditional-distribution;
 * nonparametric requires only math.stats.hypothesis-testing — all already
 * authored. Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.stats.mle.md,
 * math.stats.sufficient-statistic.md, and math.stats.nonparametric.md.
 *
 * Grade band: mle uses GradeBand.UNDERGRADUATE, matching its
 * math.calc.derivative-rules prerequisite's own band (the log-likelihood/
 * score-equation derivation is inseparable from undergraduate calculus).
 * sufficient-statistic and nonparametric use GradeBand.HIGH, matching
 * math.stats' established baseline (their "expert" EB difficulty labels
 * do not bump them, per the established convention — their prerequisites
 * stay within the HIGH baseline).
 *
 * sufficient-statistic registers 3 formal misconceptions (full contract,
 * no retargeting needed). mle and nonparametric each register only 2; per
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

const MLE = 'math.stats.mle'
const SUFFICIENT_STATISTIC = 'math.stats.sufficient-statistic'
const NONPARAMETRIC = 'math.stats.nonparametric'

export const MATHEMATICS_STATS_MLE_SUFFICIENT_STATISTIC_NONPARAMETRIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'TAKE THE LOG FIRST — NEVER DIFFERENTIATE THE RAW PRODUCT-FORM LIKELIHOOD DIRECTLY: for data '
      + '$(x_1,\\dots,x_n)$ from an exponential distribution with rate $(\\lambda)$ (density '
      + '$(f(x\\mid\\lambda)=\\lambda e^{-\\lambda x})$): '
      + '$(L(\\lambda)=\\prod_i\\lambda e^{-\\lambda x_i}=\\lambda^ne^{-\\lambda\\sum x_i})$, and '
      + '$(\\log L(\\lambda)=n\\log\\lambda-\\lambda\\sum x_i)$ — converting the PRODUCT and the '
      + 'exponential into a manageable SUM. Differentiating the ORIGINAL product-form '
      + '$(L(\\lambda))$ directly is a genuinely tedious product-rule-heavy calculation; taking the '
      + 'log FIRST is the standard, dramatically more tractable route to the SAME answer (valid '
      + 'because log is monotonically increasing).\n\n'
      + 'FINDING THE MLE REQUIRES SETTING THE SCORE TO ZERO AND SOLVING — NEVER STOPPING AT THE '
      + 'DERIVATIVE EXPRESSION: continuing the exponential example, '
      + '$(\\frac{\\partial\\log L}{\\partial\\lambda}=\\frac{n}{\\lambda}-\\sum x_i=0'
      + '\\Rightarrow\\frac{n}{\\lambda}=\\sum x_i\\Rightarrow\\hat\\lambda=\\frac{n}{\\sum x_i}='
      + '\\frac{1}{\\bar x})$ (the reciprocal of the sample mean). Stopping after finding the '
      + 'DERIVATIVE expression without actually SETTING it to zero and solving leaves the MLE '
      + 'genuinely UNFOUND — the full solve step is required.\n\n'
      + 'MLES CARRY THREE LARGE-SAMPLE GUARANTEES — CONSISTENCY IS WHAT JUSTIFIES TRUSTING THEM '
      + 'WITH MORE DATA: MLEs are CONSISTENT (converge to the true parameter as n→∞), '
      + 'ASYMPTOTICALLY NORMAL (their sampling distribution approaches normal for large n), and '
      + 'ASYMPTOTICALLY EFFICIENT (achieving the lowest possible variance among consistent '
      + 'estimators, in the large-sample limit). Consistency in particular is exactly the property '
      + 'that justifies using MLE with confidence for large real-world datasets.',
    targetedMisconceptions: [`${MLE}:MC-1`, `${MLE}:MC-2`],
    source: eb(MLE, 'Core Understanding — taking the log first never differentiating the raw product-form likelihood directly, finding the MLE requiring setting the score to zero and solving never stopping at the derivative expression, and MLEs carrying three large-sample guarantees with consistency justifying trusting them with more data'),
  },
  {
    conceptId: SUFFICIENT_STATISTIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'SUFFICIENCY MEANS THE LEFTOVER DETAIL TELLS YOU NOTHING MORE ABOUT θ — NEVER A STATEMENT '
      + 'ABOUT ESTIMATOR ACCURACY: for n independent Bernoulli(θ) trials, let T=ΣXi (total '
      + 'successes). Given T=t, EVERY specific sequence with exactly t successes is EQUALLY LIKELY '
      + '— the conditional distribution of (X1,...,Xn) given T=t is uniform over all C(n,t) such '
      + 'sequences, probability 1/C(n,t) each, and this probability does NOT involve θ at all. '
      + 'This CONFIRMS T is sufficient — sufficiency is defined purely by whether θ drops out of '
      + 'this conditional distribution, unrelated to any specific estimator\'s accuracy.\n\n'
      + 'THE FACTORIZATION CRITERION VERIFIES SUFFICIENCY WITHOUT EVER COMPUTING THE CONDITIONAL '
      + 'DISTRIBUTION — NEVER THE ONLY AVAILABLE TEST: for the SAME Bernoulli sample, the joint '
      + 'PMF is f(x|θ)=θ^t(1-θ)^(n-t) where t=Σxi. Writing this as g(T(x)|θ)·h(x) with '
      + 'g(t|θ)=θ^t(1-θ)^(n-t) (depending on x ONLY through t) and h(x)=1 (never involving θ): the '
      + 'factorization holds EXACTLY, confirming T=ΣXi is sufficient — obtained WITHOUT computing '
      + 'the uniform conditional distribution the direct route required.\n\n'
      + 'SUFFICIENCY HAS GENUINE PRACTICAL CONSEQUENCE — NEVER MERELY A THEORETICAL LABEL: suppose '
      + 'an estimator θ̂1=X1 (using only the FIRST observation) is proposed for θ. Since T=ΣXi is '
      + 'sufficient, conditioning θ̂1 on T — computing E[X1|T=t] — produces a NEW estimator '
      + '(working out to t/n, the sample proportion) with strictly SMALLER variance than θ̂1=X1 '
      + 'alone for n>1. Basing an estimator on the sufficient statistic genuinely IMPROVES '
      + 'estimation quality — the Rao-Blackwell idea, never a purely classificatory exercise.',
    targetedMisconceptions: [`${SUFFICIENT_STATISTIC}:MC-1`, `${SUFFICIENT_STATISTIC}:MC-2`, `${SUFFICIENT_STATISTIC}:MC-3`],
    source: eb(SUFFICIENT_STATISTIC, 'Core Understanding — sufficiency meaning the leftover detail tells you nothing more about theta never a statement about estimator accuracy, the factorization criterion verifying sufficiency without ever computing the conditional distribution never the only available test, and sufficiency having genuine practical consequence never merely a theoretical label'),
  },
  {
    conceptId: NONPARAMETRIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'NONPARAMETRIC TESTS ARE PREFERRED FOR SMALL, NON-NORMAL SAMPLES — NEVER A DEFAULT t-TEST '
      + 'REGARDLESS OF SHAPE: for a SMALL sample (n=8) with clearly non-normal, heavily skewed '
      + 'data: with such a small sample, the Central Limit Theorem\'s normalizing effect on the '
      + 'sample mean hasn\'t kicked in strongly enough to reliably compensate for the population\'s '
      + 'genuine non-normality — a nonparametric test (making NO distributional assumption) avoids '
      + 'this risk entirely. Defaulting to the t-test REGARDLESS of sample size or apparent '
      + 'distribution shape is WRONG for this specific small, skewed scenario.\n\n'
      + 'THE CORRECT NONPARAMETRIC TEST MUST MATCH THE DATA\'S STRUCTURE — NEVER A DEFAULT '
      + '"TWO-SAMPLE" CHOICE: a study measures the SAME 12 patients\' pain levels BEFORE and AFTER '
      + 'treatment (matched pairs), with non-normal data. Since the data is PAIRED, the Wilcoxon '
      + 'SIGNED-RANK test is appropriate — NOT the Mann-Whitney U test, which is designed for TWO '
      + 'INDEPENDENT samples. Applying Mann-Whitney to genuinely PAIRED data mirrors the EXACT '
      + 'SAME paired-vs-independent structural mismatch error seen with the parametric t-test '
      + 'variants.\n\n'
      + 'RANKS PROVIDE ROBUSTNESS TO OUTLIERS AT THE COST OF MAGNITUDE INFORMATION — THE TRADE-OFF '
      + 'THAT ENABLES DISTRIBUTION-FREE VALIDITY: converting {3,7,50,9} to ranks {1,3,4,2}: once '
      + 'converted to ranks, the value 50\'s EXTREME magnitude no longer matters — it simply '
      + 'becomes "the largest," rank 4, exactly as it would if it had been 10 instead of 50; the '
      + 'outlier\'s disproportionate influence on the RAW numeric analysis is ELIMINATED by working '
      + 'with ranks instead of exact values.',
    targetedMisconceptions: [`${NONPARAMETRIC}:MC-1`, `${NONPARAMETRIC}:MC-2`],
    source: eb(NONPARAMETRIC, 'Core Understanding — nonparametric tests being preferred for small non-normal samples never a default t-test regardless of shape, the correct nonparametric test needing to match the data\'s structure never a default two-sample choice, and ranks providing robustness to outliers at the cost of magnitude information'),
  },
]

export const MATHEMATICS_STATS_MLE_SUFFICIENT_STATISTIC_NONPARAMETRIC_PROBES: SeedProbe[] = [
  {
    conceptId: MLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Would it be easier to differentiate the likelihood as a product, or take its log first?',
    choices: [
      { text: "Take the log first — for L(λ)=λⁿe^(-λΣxᵢ), log L(λ)=n log λ - λΣxᵢ converts the product and exponential into a manageable sum; differentiating the raw product-form L(λ) directly is a genuinely tedious product-rule-heavy calculation, while the log route reaches the same maximizing λ dramatically more easily", isCorrect: true },
      { text: "It's easier to differentiate the raw product-form likelihood directly, without taking the log first", isCorrect: false, misconceptionId: `${MLE}:MC-1` },
      { text: "Since the product and its log have different derivative formulas, taking the log first would actually change where the maximum occurs", isCorrect: false, misconceptionId: `${MLE}:MC-1` },
    ],
    targetedMisconceptions: [`${MLE}:MC-1`],
    source: eb(MLE, 'Discovery Question 1 as a detection probe (verbatim) — whether it would be easier to differentiate the likelihood as a product or take its log first, an answer favoring the raw product confirming RAW-PRODUCT-LIKELIHOOD-DIFFERENTIATED-DIRECTLY-INSTEAD-OF-TAKING-THE-LOG-FIRST'),
  },
  {
    conceptId: MLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Have you actually set the score to zero and solved for the parameter, or just written down the derivative?',
    choices: [
      { text: "The full solve is required — ∂logL/∂λ=n/λ-Σxᵢ=0 must be solved to get λ̂=n/Σxᵢ=1/x̄ (the reciprocal of the sample mean); stopping after finding the derivative expression n/λ-Σxᵢ without setting it to zero and solving leaves the MLE genuinely unfound", isCorrect: true },
      { text: "Writing down the derivative expression is enough — that itself is the maximum likelihood estimator", isCorrect: false, misconceptionId: `${MLE}:MC-2` },
      { text: "Since the derivative shows where the function is changing, the expression itself already identifies the location of the maximum", isCorrect: false, misconceptionId: `${MLE}:MC-2` },
    ],
    targetedMisconceptions: [`${MLE}:MC-2`],
    source: eb(MLE, 'Discovery Question 2 as a detection probe (verbatim) — whether the score has actually been set to zero and solved or just written down as a derivative, an answer treating the derivative alone as sufficient confirming SCORE-EXPRESSION-LEFT-UNSOLVED-INSTEAD-OF-SET-TO-ZERO-AND-SOLVED-FOR-THETA'),
  },
  {
    conceptId: MLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why would an MLE become more trustworthy as you collect more data?',
    choices: [
      { text: "Because MLEs are CONSISTENT — they converge to the true parameter as n→∞ — alongside being asymptotically normal and asymptotically efficient (lowest possible variance among consistent estimators in the large-sample limit); consistency specifically justifies trusting MLE with confidence for large real-world datasets", isCorrect: true },
      { text: "MLEs don't actually become more trustworthy with more data; their accuracy is fixed by the formula regardless of sample size", isCorrect: false, misconceptionId: `${MLE}:MC-1` },
      { text: "Since more data just means more terms in the product, the likelihood function becomes larger but not necessarily more informative about the parameter", isCorrect: false, misconceptionId: `${MLE}:MC-1` },
    ],
    targetedMisconceptions: [`${MLE}:MC-1`],
    source: eb(MLE, 'Discovery Question 3 as a detection probe (verbatim) — why an MLE becomes more trustworthy with more data, an answer denying any large-sample improvement re-targeting the log-transformation/large-sample-property understanding via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: SUFFICIENT_STATISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does verifying sufficiency mean checking an estimator\'s accuracy, or checking whether θ affects the leftover conditional distribution?',
    choices: [
      { text: "Checking whether θ affects the leftover conditional distribution — for n Bernoulli(θ) trials with T=ΣXi, given T=t every specific sequence is equally likely (probability 1/C(n,t), not involving θ at all); this confirms T is sufficient, unrelated to any specific estimator's accuracy", isCorrect: true },
      { text: "Verifying sufficiency means checking a specific estimator's accuracy built from that statistic", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-1` },
      { text: "Since sufficient statistics are used to build good estimators, verifying sufficiency should involve testing how accurate those estimators turn out to be", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-1` },
    ],
    targetedMisconceptions: [`${SUFFICIENT_STATISTIC}:MC-1`],
    source: eb(SUFFICIENT_STATISTIC, 'Discovery Question 1 as a detection probe (verbatim) — whether verifying sufficiency means checking estimator accuracy or whether theta affects the conditional distribution, an answer about estimator accuracy confirming SUFFICIENCY-ASSUMED-ABOUT-ESTIMATOR-ACCURACY'),
  },
  {
    conceptId: SUFFICIENT_STATISTIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is computing the conditional distribution directly the only way to verify sufficiency?',
    choices: [
      { text: "No — the factorization criterion f(x|θ)=g(T(x)|θ)·h(x) verifies sufficiency without computing the conditional distribution at all; for the Bernoulli PMF θ^t(1-θ)^(n-t), writing g(t|θ)=θ^t(1-θ)^(n-t) and h(x)=1 confirms T=ΣXi is sufficient via this computationally easier equivalent test", isCorrect: true },
      { text: "Yes, computing the conditional distribution directly is the only available way to verify sufficiency", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-2` },
      { text: "Since sufficiency is fundamentally defined via the conditional distribution, any other verification method would only be an approximation", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-2` },
    ],
    targetedMisconceptions: [`${SUFFICIENT_STATISTIC}:MC-2`],
    source: eb(SUFFICIENT_STATISTIC, 'Discovery Question 2 as a detection probe (verbatim) — whether computing the conditional distribution directly is the only way to verify sufficiency, an answer of "yes" confirming CONDITIONAL-DISTRIBUTION-ASSUMED-ONLY-SUFFICIENCY-TEST'),
  },
  {
    conceptId: SUFFICIENT_STATISTIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does labeling a statistic 'sufficient' have any practical consequence for how good an estimator built from it actually is?",
    choices: [
      { text: "Yes — since T=ΣXi is sufficient, conditioning θ̂1=X1 on T (computing E[X1|T=t]) produces a new estimator t/n with strictly SMALLER variance than X1 alone for n>1; basing an estimator on a sufficient statistic genuinely improves estimation quality, never a purely classificatory label", isCorrect: true },
      { text: "No, sufficiency is only a theoretical classification with no practical consequence for estimator quality", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-3` },
      { text: "Since sufficiency is defined purely in terms of conditional distributions, it should have no bearing on how an actual estimator performs", isCorrect: false, misconceptionId: `${SUFFICIENT_STATISTIC}:MC-3` },
    ],
    targetedMisconceptions: [`${SUFFICIENT_STATISTIC}:MC-3`],
    source: eb(SUFFICIENT_STATISTIC, 'Discovery Question 3 as a detection probe (verbatim) — whether labeling a statistic sufficient has any practical consequence for estimator quality, an answer of "no" confirming SUFFICIENCY-ASSUMED-MERELY-THEORETICAL-LABEL'),
  },
  {
    conceptId: NONPARAMETRIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a small, clearly skewed sample, is the t-test still the right default choice?',
    choices: [
      { text: "No — with a small sample (n=8) and clearly non-normal, heavily skewed data, the CLT's normalizing effect on the sample mean hasn't kicked in strongly enough to compensate for the genuine non-normality; a nonparametric test making no distributional assumption avoids this risk entirely", isCorrect: true },
      { text: "Yes, the t-test remains the right default choice regardless of sample size or distribution shape", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-1` },
      { text: "Since the t-test is the standard tool for comparing means, it should be used by default unless there is a specific reason to switch methods", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-1` },
    ],
    targetedMisconceptions: [`${NONPARAMETRIC}:MC-1`],
    source: eb(NONPARAMETRIC, 'Discovery Question 1 as a detection probe (verbatim) — whether the t-test is still the right default for a small skewed sample, an answer of "yes" confirming T-TEST-DEFAULTED-TO-REGARDLESS-OF-SAMPLE-SIZE-OR-DISTRIBUTION-SHAPE'),
  },
  {
    conceptId: NONPARAMETRIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the same subjects are measured twice, is Mann-Whitney the right test?',
    choices: [
      { text: "No — a study measuring the SAME 12 patients before and after treatment (matched pairs) with non-normal data needs the Wilcoxon SIGNED-RANK test, not Mann-Whitney U, which is designed for TWO INDEPENDENT samples; applying Mann-Whitney to paired data mirrors the exact paired-vs-independent mismatch seen with parametric t-test variants", isCorrect: true },
      { text: "Yes, Mann-Whitney is the correct test for the same subjects measured twice", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-2` },
      { text: "Since Mann-Whitney is the standard nonparametric test for comparing two groups, it should apply regardless of whether the groups are paired or independent", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-2` },
    ],
    targetedMisconceptions: [`${NONPARAMETRIC}:MC-2`],
    source: eb(NONPARAMETRIC, 'Discovery Question 2 as a detection probe (verbatim) — whether Mann-Whitney is the right test when the same subjects are measured twice, an answer of "yes" confirming WRONG-NONPARAMETRIC-TEST-USED-FOR-PAIRED-VS-INDEPENDENT-DATA-STRUCTURE'),
  },
  {
    conceptId: NONPARAMETRIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does converting to ranks make a test robust to an extreme outlier?',
    choices: [
      { text: "Converting {3,7,50,9} to ranks {1,3,4,2}: the value 50's extreme magnitude no longer matters — it simply becomes 'the largest,' rank 4, exactly as if it had been 10 instead; the outlier's disproportionate influence on raw numeric analysis is eliminated, but this trades away magnitude information", isCorrect: true },
      { text: "Ranks preserve the exact magnitude differences between values, so outliers still influence the test the same way they would with raw data", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-2` },
      { text: "Rank-based tests are a strictly free improvement over raw-value tests, with no information trade-off involved", isCorrect: false, misconceptionId: `${NONPARAMETRIC}:MC-2` },
    ],
    targetedMisconceptions: [`${NONPARAMETRIC}:MC-2`],
    source: eb(NONPARAMETRIC, 'Discovery Question 3 as a detection probe (verbatim) — why converting to ranks makes a test robust to an extreme outlier, an answer denying the magnitude-information trade-off re-targeted via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
]
