/**
 * Batch: consistency, method-of-moments, two-way-anova (math.stats) —
 * advances the domain from 28/40 to 31/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's bias-variance/
 * p-value/power: consistency requires math.stats.estimator +
 * math.prob.convergence-types; method-of-moments requires math.stats.
 * estimator + math.prob.moments; two-way-anova requires math.stats.anova
 * — all already authored. Transcribed from their frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.stats.
 * consistency.md, math.stats.method-of-moments.md, and
 * math.stats.two-way-anova.md.
 *
 * Grade band: GradeBand.HIGH throughout, matching math.stats' established
 * baseline (two-way-anova's "expert" EB difficulty label does not bump it,
 * matching the established convention — its sole prerequisite, anova,
 * stays within math.stats' HIGH baseline).
 *
 * All three EB entries register only 2 formal misconceptions each; per
 * this campaign's established convention, each concept's 3rd PROFICIENT
 * probe re-targets one of the two existing misconceptions via a fresh
 * worked example rather than inventing a fake third misconception.
 *
 * With this batch, math.stats reaches 31/40.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONSISTENCY = 'math.stats.consistency'
const METHOD_OF_MOMENTS = 'math.stats.method-of-moments'
const TWO_WAY_ANOVA = 'math.stats.two-way-anova'

export const MATHEMATICS_STATS_CONSISTENCY_METHOD_OF_MOMENTS_TWO_WAY_ANOVA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONSISTENCY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CONSISTENCY IS A LARGE-SAMPLE LIMIT PROPERTY — NEVER A FIXED-n ACCURACY GUARANTEE: an '
      + 'estimator "consistent" for θ means θ̂n→P θ as n→∞ — it gets ARBITRARILY close to θ '
      + 'eventually, with high probability, as sample size grows without bound. It makes NO '
      + 'promise about performance at any SPECIFIC, small, fixed sample size like n=10. '
      + 'Interpreting "consistent" as "accurate for any sample size, including small ones" '
      + 'mistakes an ASYMPTOTIC guarantee for a claim about every individual n.\n\n'
      + 'THE SUFFICIENT CONDITION REQUIRES BOTH BIAS AND VARIANCE TO VANISH — NEVER JUST ONE: for '
      + 'an estimator with bias=1/n (which →0) and variance=σ²/n (which ALSO →0) as n→∞: since '
      + 'BOTH conditions are satisfied, the sufficient condition holds and the estimator is '
      + 'consistent. Checking only ONE of the two (e.g. verifying bias→0 alone) and concluding '
      + 'consistency WITHOUT also verifying variance→0 is incomplete — both must hold TOGETHER for '
      + 'this sufficient condition to apply.\n\n'
      + 'THE SAMPLE MEAN\'S CONSISTENCY IS A DIRECT RESTATEMENT OF THE LLN — NEVER A SEPARATE FACT '
      + 'NEEDING ITS OWN PROOF: the Law of Large Numbers states X̄n→P μ as n→∞ — this IS EXACTLY '
      + 'the definition of consistency, applied to the sample mean estimating the population mean. '
      + 'The sample mean\'s consistency is not an independent result requiring its own derivation; '
      + 'it is the LLN, restated in consistency\'s vocabulary.',
    targetedMisconceptions: [`${CONSISTENCY}:MC-1`, `${CONSISTENCY}:MC-2`],
    source: eb(CONSISTENCY, 'Core Understanding — consistency being a large-sample limit property never a fixed-n accuracy guarantee, the sufficient condition requiring both bias and variance to vanish never just one, and the sample mean\'s consistency being a direct restatement of the LLN never a separate fact needing its own proof'),
  },
  {
    conceptId: METHOD_OF_MOMENTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE k-TH THEORETICAL MOMENT MUST MATCH THE k-TH SAMPLE MOMENT — NEVER A MISMATCHED '
      + 'STATISTIC: for data from an Exponential distribution with rate λ (where E[X]=1/λ), given '
      + 'sample mean x̄=4: set E[X]=x̄: 1/λ=4⇒λ̂=1/4=0.25. Setting E[X] equal to the SAMPLE VARIANCE '
      + 'or some other unrelated summary statistic instead of the SAMPLE MEAN is WRONG — the FIRST '
      + 'moment E[X] must be matched specifically to the sample FIRST moment (x̄), never an '
      + 'arbitrary or mismatched statistic.\n\n'
      + 'MULTIPLE UNKNOWN PARAMETERS REQUIRE MULTIPLE SIMULTANEOUS MOMENT EQUATIONS — NEVER JUST '
      + 'ONE: for a Normal distribution with BOTH μ AND σ² unknown: TWO moment equations are '
      + 'needed — first moment E[X]=μ set equal to x̄ gives μ̂=x̄ directly; second moment '
      + 'E[X²]=μ²+σ² set equal to the sample second moment, then solved (using μ̂) for σ̂². '
      + 'Attempting to estimate BOTH parameters using only the FIRST moment equation alone leaves '
      + 'the system UNDERDETERMINED — infinitely many solution pairs would satisfy just one '
      + 'equation.\n\n'
      + 'METHOD OF MOMENTS TRADES EFFICIENCY FOR SIMPLICITY — A FALLBACK, NEVER A GENERAL '
      + 'REPLACEMENT FOR MLE: the Method of Moments requires only algebraic equation-solving, no '
      + 'calculus-based optimization — generally SIMPLER to compute than MLE. However, it is '
      + 'generally LESS EFFICIENT (higher variance) than MLE. Its main practical value is as a '
      + 'FALLBACK specifically when the likelihood function needed for MLE is analytically '
      + 'INTRACTABLE — never a claim that it\'s preferable in general.',
    targetedMisconceptions: [`${METHOD_OF_MOMENTS}:MC-1`, `${METHOD_OF_MOMENTS}:MC-2`],
    source: eb(METHOD_OF_MOMENTS, 'Core Understanding — the k-th theoretical moment needing to match the k-th sample moment never a mismatched statistic, multiple unknown parameters requiring multiple simultaneous moment equations never just one, and Method of Moments trading efficiency for simplicity as a fallback never a general replacement for MLE'),
  },
  {
    conceptId: TWO_WAY_ANOVA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'TWO-WAY ANOVA TESTS THREE SEPARATE HYPOTHESES — NEVER ONE COMBINED "DOES ANYTHING MATTER" '
      + 'TEST: for a study testing BOTH "fertilizer type" (Factor A) and "watering frequency" '
      + '(Factor B) on plant growth: THREE distinct hypotheses are tested — (1) main effect of '
      + 'fertilizer type (averaged across watering frequencies), (2) main effect of watering '
      + 'frequency (averaged across fertilizer types), (3) the fertilizer-by-watering INTERACTION '
      + '(does fertilizer\'s effect depend on watering frequency?). Treating two-way ANOVA as '
      + 'testing only ONE combined hypothesis misses that it decomposes into THREE separate, '
      + 'individually-testable effects, each with its OWN F-statistic and its OWN conclusion.\n\n'
      + 'A SIGNIFICANT INTERACTION CAN MASK OR INVALIDATE A NAIVE MAIN-EFFECT READING — NEVER '
      + 'REPORTED AWAY: a study finds a SIGNIFICANT interaction between "drug dosage" and "patient '
      + 'age group," where the drug HELPS young patients but HARMS elderly patients (opposite '
      + 'effects), yet the "average" main effect of dosage appears roughly ZERO (the opposite '
      + 'effects cancel out). Reporting "dosage has no significant main effect" ALONE is '
      + 'MISLEADING — the zero-looking main effect masks a genuinely important, STRONG '
      + 'interaction.\n\n'
      + 'BLOCKING CONTROLS NOISE — IT IS NEVER THE SAME AS A GENUINE RESEARCH-INTEREST FACTOR: an '
      + 'agricultural experiment tests fertilizer types across plots on FIVE different days, '
      + 'including "day" as a BLOCKING factor to account for day-to-day weather variation. '
      + '"Fertilizer type" is the genuine RESEARCH-INTEREST factor — the actual scientific '
      + 'question. "Day" is included specifically to ACCOUNT FOR AND REMOVE day-to-day noise from '
      + 'the residual variance, improving the fertilizer comparison\'s precision — the researcher '
      + 'does NOT fundamentally care about "which day was best."',
    targetedMisconceptions: [`${TWO_WAY_ANOVA}:MC-1`, `${TWO_WAY_ANOVA}:MC-2`],
    source: eb(TWO_WAY_ANOVA, 'Core Understanding — two-way ANOVA testing three separate hypotheses never one combined test, a significant interaction being able to mask or invalidate a naive main-effect reading never reported away, and blocking controlling noise never being the same as a genuine research-interest factor'),
  },
]

export const MATHEMATICS_STATS_CONSISTENCY_METHOD_OF_MOMENTS_TWO_WAY_ANOVA_PROBES: SeedProbe[] = [
  {
    conceptId: CONSISTENCY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does calling an estimator 'consistent' tell you anything about how accurate it is for a sample of size 10?",
    choices: [
      { text: "No — consistency means θ̂n→P θ as n→∞, getting arbitrarily close to θ eventually with high probability as sample size grows without bound; it makes NO promise about performance at any specific, small, fixed sample size like n=10", isCorrect: true },
      { text: "Yes, 'consistent' means the estimator is accurate for any sample size, including small ones like n=10", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-1` },
      { text: "Since consistency is a desirable estimator property, it should guarantee good performance across all sample sizes, not just large ones", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-1` },
    ],
    targetedMisconceptions: [`${CONSISTENCY}:MC-1`],
    source: eb(CONSISTENCY, 'Discovery Question 1 as a detection probe (verbatim) — whether "consistent" tells you anything about accuracy at n=10, an answer of "yes" confirming CONSISTENCY-INTERPRETED-AS-A-FIXED-SAMPLE-SIZE-ACCURACY-GUARANTEE'),
  },
  {
    conceptId: CONSISTENCY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If bias goes to zero but variance does not, is the sufficient condition for consistency satisfied?',
    choices: [
      { text: "No — the sufficient condition requires BOTH bias→0 AND variance→0; for an estimator with bias=1/n and variance=σ²/n, both must vanish as n→∞ together, checking only bias→0 alone and concluding consistency without also verifying variance→0 is incomplete", isCorrect: true },
      { text: "Yes, bias going to zero alone is sufficient to conclude the estimator is consistent", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-2` },
      { text: "Since bias is generally considered the more important property, its vanishing should be enough to establish consistency on its own", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-2` },
    ],
    targetedMisconceptions: [`${CONSISTENCY}:MC-2`],
    source: eb(CONSISTENCY, 'Discovery Question 2 as a detection probe (verbatim) — whether bias going to zero alone satisfies the sufficient condition for consistency, an answer of "yes" confirming ONLY-ONE-OF-BIAS-OR-VARIANCE-CONDITIONS-CHECKED-FOR-THE-SUFFICIENT-CRITERION'),
  },
  {
    conceptId: CONSISTENCY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the sample mean's consistency a separate fact from the Law of Large Numbers, or the same fact restated?",
    choices: [
      { text: "The same fact restated — the LLN states X̄n→P μ as n→∞, which IS EXACTLY the definition of consistency applied to the sample mean estimating the population mean; it is not an independent result requiring its own derivation", isCorrect: true },
      { text: "A separate fact requiring its own independent proof, distinct from the Law of Large Numbers", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-1` },
      { text: "Since consistency and the LLN are studied in different contexts, they should be treated as related but ultimately distinct results needing separate justification", isCorrect: false, misconceptionId: `${CONSISTENCY}:MC-1` },
    ],
    targetedMisconceptions: [`${CONSISTENCY}:MC-1`],
    source: eb(CONSISTENCY, 'Discovery Question 3 as a detection probe (verbatim) — whether the sample mean\'s consistency is separate from the LLN or the same fact restated, an answer treating it as separate re-targeting the asymptotic-property misunderstanding via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: METHOD_OF_MOMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Should the first theoretical moment be matched to the sample mean, or some other sample statistic?',
    choices: [
      { text: "The sample mean — for an Exponential distribution with E[X]=1/λ and sample mean x̄=4: setting E[X]=x̄ gives 1/λ=4⇒λ̂=0.25; the FIRST moment E[X] must be matched specifically to the sample FIRST moment (x̄), never an arbitrary or mismatched statistic like sample variance", isCorrect: true },
      { text: "The sample variance, since it captures more information about the distribution's spread", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-1` },
      { text: "Any convenient sample statistic works, since the method just requires setting some theoretical quantity equal to some sample quantity", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-1` },
    ],
    targetedMisconceptions: [`${METHOD_OF_MOMENTS}:MC-1`],
    source: eb(METHOD_OF_MOMENTS, 'Discovery Question 1 as a detection probe (verbatim) — whether the first theoretical moment should be matched to the sample mean or another statistic, an answer proposing sample variance confirming THEORETICAL-MOMENT-MATCHED-TO-THE-WRONG-SAMPLE-STATISTIC'),
  },
  {
    conceptId: METHOD_OF_MOMENTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two parameters are unknown, is one moment equation enough to solve for both?',
    choices: [
      { text: "No — for a Normal distribution with both μ and σ² unknown, TWO moment equations are needed: the first (E[X]=μ=x̄) gives μ̂ directly, and the second (E[X²]=μ²+σ²) is then solved for σ̂²; using only one equation leaves the system UNDERDETERMINED with infinitely many solution pairs", isCorrect: true },
      { text: "Yes, one moment equation is enough to solve for two unknown parameters", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-2` },
      { text: "Since the first moment equation involves both parameters implicitly, it should be possible to extract both values from it alone", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-2` },
    ],
    targetedMisconceptions: [`${METHOD_OF_MOMENTS}:MC-2`],
    source: eb(METHOD_OF_MOMENTS, 'Discovery Question 2 as a detection probe (verbatim) — whether one moment equation is enough to solve for two unknown parameters, an answer of "yes" confirming MULTIPLE-PARAMETERS-ESTIMATED-USING-ONLY-ONE-MOMENT-EQUATION-LEAVING-SYSTEM-UNDERDETERMINED'),
  },
  {
    conceptId: METHOD_OF_MOMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Method of Moments generally more or less efficient than MLE — and when would you use it anyway?',
    choices: [
      { text: "Generally LESS efficient (higher variance) than MLE, but simpler to compute (only algebraic equation-solving, no calculus-based optimization); its main practical value is as a FALLBACK specifically when MLE's likelihood function is analytically intractable, never a general replacement", isCorrect: true },
      { text: "The Method of Moments is generally more efficient than MLE and should be preferred whenever possible", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-1` },
      { text: "Since both methods estimate the same parameters, they should have essentially the same efficiency and be interchangeable in practice", isCorrect: false, misconceptionId: `${METHOD_OF_MOMENTS}:MC-1` },
    ],
    targetedMisconceptions: [`${METHOD_OF_MOMENTS}:MC-1`],
    source: eb(METHOD_OF_MOMENTS, 'Discovery Question 3 as a detection probe (verbatim) — whether Method of Moments is more or less efficient than MLE and when to use it, an answer claiming it is more efficient re-targeting the method\'s role via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: TWO_WAY_ANOVA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a two-way ANOVA test one combined hypothesis, or three separate ones?',
    choices: [
      { text: "Three separate ones — for testing both fertilizer type and watering frequency: (1) main effect of fertilizer, (2) main effect of watering frequency, (3) the fertilizer-by-watering interaction, each with its OWN F-statistic and OWN conclusion, never one combined 'does anything matter' test", isCorrect: true },
      { text: "One combined hypothesis testing whether anything at all matters across both factors", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-1` },
      { text: "Since two-way ANOVA extends one-way ANOVA, it should still produce a single overall F-statistic and conclusion", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-1` },
    ],
    targetedMisconceptions: [`${TWO_WAY_ANOVA}:MC-1`],
    source: eb(TWO_WAY_ANOVA, 'Discovery Question 1 as a detection probe (verbatim) — whether two-way ANOVA tests one combined hypothesis or three separate ones, an answer of "one combined" confirming TWO-WAY-ANOVA-TREATED-AS-TESTING-ONE-COMBINED-HYPOTHESIS-RATHER-THAN-THREE-SEPARATE-EFFECTS'),
  },
  {
    conceptId: TWO_WAY_ANOVA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could a main effect look like zero on average, even when the true effect is strong but opposite in different subgroups?',
    choices: [
      { text: "Yes — a study finds a significant interaction between drug dosage and patient age group, where the drug HELPS young patients but HARMS elderly patients; the average main effect of dosage appears roughly ZERO since the opposite effects cancel out, but this masks a genuinely strong interaction", isCorrect: true },
      { text: "No, a null-looking main effect always means the factor genuinely has no effect on the outcome", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-2` },
      { text: "Since the main effect is computed by averaging across subgroups, a zero result should reliably indicate there is no meaningful effect anywhere", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-2` },
    ],
    targetedMisconceptions: [`${TWO_WAY_ANOVA}:MC-2`],
    source: eb(TWO_WAY_ANOVA, 'Discovery Question 2 as a detection probe (verbatim) — whether a main effect can look like zero on average despite a strong opposite effect in subgroups, an answer of "no" confirming SIGNIFICANT-INTERACTION-OVERLOOKED-WHILE-ONLY-MAIN-EFFECTS-ARE-REPORTED'),
  },
  {
    conceptId: TWO_WAY_ANOVA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is a blocking factor included because the researcher cares about its own effect, or to control for noise?",
    choices: [
      { text: "To control for noise — an agricultural experiment includes 'day' as a blocking factor to account for day-to-day weather variation, improving the fertilizer comparison's precision; the researcher does NOT fundamentally care about 'which day was best,' only about removing its nuisance variability", isCorrect: true },
      { text: "Because the researcher genuinely cares about the blocking factor's own effect, just like the primary research factor", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-1` },
      { text: "Since a blocking factor is included in the same statistical model as the research factor, it should be treated with equal scientific interest", isCorrect: false, misconceptionId: `${TWO_WAY_ANOVA}:MC-1` },
    ],
    targetedMisconceptions: [`${TWO_WAY_ANOVA}:MC-1`],
    source: eb(TWO_WAY_ANOVA, 'Discovery Question 3 as a detection probe (verbatim) — whether a blocking factor is included for its own effect or to control for noise, an answer treating it as a genuine research-interest factor re-targeting the two-way ANOVA structure-misunderstanding via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
]
