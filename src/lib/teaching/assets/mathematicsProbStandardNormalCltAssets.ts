/**
 * Batch: standard-normal, clt (math.prob).
 *
 * Continuing math.prob (44/49 -> 46/49). Fresh frontier recompute after
 * normal-distribution/generating-function/poisson-process's authoring
 * found exactly 2 ready concepts. The remaining 3 (combinatorial-
 * probability, characteristic-function, convergence-types) are each
 * blocked on unauthored external domains (math.disc, math.de, math.real
 * respectively) and cannot be closed from within math.prob alone.
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.prob.{standard-normal,clt}.md.
 *
 *   STANDARD-NORMAL  standardize FIRST, never look up Φ(x) directly for a
 *           non-standard normal; Φ(-z)=1-Φ(z), never Φ(-z)=Φ(z) (density
 *           symmetry is not CDF symmetry); independent normals sum with
 *           VARIANCES adding, never standard deviations.
 *   CLT  CLT describes the SAMPLING DISTRIBUTION of the mean, the
 *           population never changes shape; "large n" is the price paid
 *           for a NON-NORMAL population, never a universal requirement (an
 *           already-normal population is exact at every n); CLT concerns
 *           AGGREGATION — a single observation gets no normality boost
 *           whatsoever.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const STANDARD_NORMAL = 'math.prob.standard-normal'
const CLT = 'math.prob.clt'

export const MATHEMATICS_PROB_STANDARD_NORMAL_CLT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STANDARD_NORMAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'STANDARDIZE FIRST — NEVER LOOK UP Φ(x) DIRECTLY FOR A NON-STANDARD NORMAL: for X~N(70,100) '
      + '(σ=10): P(X≤85)=Φ((85-70)/10)=Φ(1.5)≈0.933 — the raw value 85 is NEVER plugged directly '
      + 'into Φ; it must first be converted to a z-score via z=(x-μ)/σ. Skipping standardization '
      + 'and computing Φ(85) directly is meaningless, since Φ is defined for the STANDARD normal '
      + 'specifically.\n\n'
      + 'Φ(-z)=1-Φ(z) — NEVER Φ(-z)=Φ(z): the DENSITY φ IS symmetric (φ(-z)=φ(z)), but the CDF is '
      + 'NOT symmetric in that same sense. P(Z<-1)=Φ(-1)=1-Φ(1)≈1-0.841=0.159 — the LEFT tail '
      + 'probability, genuinely different from Φ(1)≈0.841 (the probability of being below +1). '
      + 'Confusing PDF symmetry with CDF symmetry gives a probability that’s the complement of '
      + 'the correct one.\n\n'
      + 'INDEPENDENT NORMALS SUM WITH VARIANCES ADDING, NEVER STANDARD DEVIATIONS: if '
      + 'X~N(μ₁,σ₁²)⊥Y~N(μ₂,σ₂²), then X+Y~N(μ₁+μ₂,σ₁²+σ₂²) — the VARIANCES add directly; the '
      + 'standard deviations do NOT simply add (e.g. σ_{X+Y}=√(σ₁²+σ₂²)≠σ₁+σ₂ in general). This '
      + 'closure under linear combination is a distinguishing property of the normal family, '
      + 'verified by E[Z]=(μ-μ)/σ=0 and Var(Z)=σ²/σ²=1 for the standardization itself.',
    targetedMisconceptions: [`${STANDARD_NORMAL}:MC-1`, `${STANDARD_NORMAL}:MC-2`, `${STANDARD_NORMAL}:MC-3`],
    source: eb(STANDARD_NORMAL, 'Core Understanding — standardizing first never looking up Φ(x) directly for a non-standard normal, Φ(-z)=1-Φ(z) never Φ(-z)=Φ(z) since CDF symmetry differs from density symmetry, and independent normals summing with variances adding never standard deviations'),
  },
  {
    conceptId: CLT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CLT DESCRIBES THE SAMPLING DISTRIBUTION OF THE MEAN — THE POPULATION NEVER CHANGES SHAPE: '
      + 'for a strongly right-skewed insurance-claims population: drawing samples of n=2 and '
      + 'computing X̄₂ many times gives a histogram STILL noticeably skewed; at n=30, MUCH more '
      + 'symmetric; at n=100, closely resembling a normal curve. The individual claim-size '
      + 'POPULATION itself never changes — exactly as skewed at the end as the start. What '
      + 'changes is the DISTRIBUTION OF THE SAMPLE MEAN across repeated samples, a genuinely '
      + 'different, derived object, growing increasingly bell-shaped as n grows regardless of the '
      + 'population’s original shape.\n\n'
      + '"LARGE n" IS THE PRICE PAID FOR A NON-NORMAL POPULATION — NEVER A UNIVERSAL '
      + 'REQUIREMENT: if X₁,…,Xₙ are iid N(μ,σ²) (population ALREADY normal), X̄ₙ is EXACTLY '
      + 'N(μ,σ²/n) for EVERY n, including n=1 (trivially, X̄₁=X₁~N(μ,σ²) exactly) — an older, '
      + 'exact fact (sums/averages of normal variables are exactly normal), needing NO CLT '
      + 'approximation at all. CLT’s large-n condition exists SPECIFICALLY to handle a non-normal '
      + 'population; for an already-normal one, there’s nothing to approximate.\n\n'
      + 'CLT CONCERNS AGGREGATION — A SINGLE OBSERVATION GETS NO NORMALITY BOOST WHATSOEVER: for '
      + 'the skewed insurance-claims population: a SINGLE claim size X remains exactly as skewed '
      + 'as the population itself — its distribution IS the population distribution, period, '
      + 'with zero CLT effect. Only the AVERAGE (or SUM) of MANY independent claims approaches '
      + 'normality, and only as the NUMBER AVERAGED grows. There is no "population size" '
      + 'parameter in CLT at all — what matters is the SAMPLE SIZE used in one specific averaging '
      + 'computation, never a growing count of individually-considered observations.',
    targetedMisconceptions: [`${CLT}:MC-1`, `${CLT}:MC-2`, `${CLT}:MC-3`],
    source: eb(CLT, 'Core Understanding — CLT describing the sampling distribution of the mean while the population never changes shape, large n as the price paid for a non-normal population never a universal requirement, and CLT concerning aggregation so a single observation gets no normality boost'),
  },
]

export const MATHEMATICS_PROB_STANDARD_NORMAL_CLT_PROBES: SeedProbe[] = [
  {
    conceptId: STANDARD_NORMAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X~N(70,100) with σ=10, to find P(X≤85), should you compute Φ(85) directly?',
    choices: [
      { text: 'No — you must standardize FIRST: P(X≤85)=Φ((85-70)/10)=Φ(1.5)≈0.933; Φ is defined for the STANDARD normal specifically, so the raw value 85 must be converted to a z-score first', isCorrect: true },
      { text: 'Yes — Φ can be applied directly to any raw value from any Normal distribution, since Φ describes normal probabilities in general', isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-1` },
      { text: "Yes, since Φ(85) and Φ((85-70)/10) always give the identical result regardless of the distribution's parameters", isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-1` },
    ],
    targetedMisconceptions: [`${STANDARD_NORMAL}:MC-1`],
    source: eb(STANDARD_NORMAL, 'Demonstration 1 — N(70,100)’s P(X≤85)=Φ(1.5), requiring standardization before table lookup, directly breaking ALL-NORMAL-DISTRIBUTIONS-ARE-STANDARD'),
  },
  {
    conceptId: STANDARD_NORMAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is Φ(-1) equal to Φ(1), the same way the density φ(-1)=φ(1)?',
    choices: [
      { text: 'No — Φ(-1)=1-Φ(1)≈1-0.841=0.159, genuinely different from Φ(1)≈0.841; the DENSITY is symmetric (φ(-z)=φ(z)), but the CDF’s symmetry rule is Φ(-z)=1-Φ(z), a reflection PLUS a complement, never a direct mirror', isCorrect: true },
      { text: 'Yes — since the standard normal density is symmetric about 0, the CDF inherits that exact same symmetry, so Φ(-z)=Φ(z)', isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-2` },
      { text: "Yes, since both the density and the CDF of a symmetric distribution must satisfy the identical mirror-symmetry property", isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-2` },
    ],
    targetedMisconceptions: [`${STANDARD_NORMAL}:MC-2`],
    source: eb(STANDARD_NORMAL, 'Demonstration 2 — P(Z<-1)=Φ(-1)=1-Φ(1)≈0.159, contrasted against the wrong Φ(1)≈0.841, directly breaking SYMMETRY-MEANS-Φ(−z)=Φ(z)'),
  },
  {
    conceptId: STANDARD_NORMAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For independent X~N(μ₁,σ₁²) and Y~N(μ₂,σ₂²), what is Var(X+Y), and does SD(X+Y) equal SD(X)+SD(Y)?',
    choices: [
      { text: 'Var(X+Y)=σ₁²+σ₂² — the VARIANCES add directly; SD(X+Y)=√(σ₁²+σ₂²), which does NOT equal σ₁+σ₂ in general, since standard deviations do not simply add', isCorrect: true },
      { text: 'Var(X+Y)=(σ₁+σ₂)², since the standard deviations of independent normals add directly and the variance is just that sum squared', isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-3` },
      { text: "Var(X+Y)=σ₁²+σ₂² and also SD(X+Y)=σ₁+σ₂, since both variances and standard deviations add for independent normals", isCorrect: false, misconceptionId: `${STANDARD_NORMAL}:MC-3` },
    ],
    targetedMisconceptions: [`${STANDARD_NORMAL}:MC-3`],
    source: eb(STANDARD_NORMAL, 'Demonstration 3 and Core Understanding — independent normals summing with variances adding (X+Y~N(μ₁+μ₂,σ₁²+σ₂²)) never standard deviations, directly breaking STANDARD-DEVIATION-IS-THE-STANDARDISED-SCORE (via the closure-under-linear-combination property)'),
  },
  {
    conceptId: CLT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a strongly right-skewed insurance-claims population, as sample size n grows and X̄ₙ’s histogram becomes bell-shaped, does the underlying claim-size POPULATION itself become normal-shaped?',
    choices: [
      { text: 'No — the individual claim-size POPULATION never changes shape, exactly as skewed at the end as the start; what changes is the DISTRIBUTION OF THE SAMPLE MEAN across repeated samples, a genuinely different, derived object', isCorrect: true },
      { text: 'Yes — as n grows large, the underlying population distribution itself gradually transforms into a normal shape', isCorrect: false, misconceptionId: `${CLT}:MC-1` },
      { text: "Yes, since CLT describes how any population becomes approximately normal once enough data has been collected", isCorrect: false, misconceptionId: `${CLT}:MC-1` },
    ],
    targetedMisconceptions: [`${CLT}:MC-1`],
    source: eb(CLT, 'Demonstration 1 — the skewed insurance-claims population’s fixed shape versus its sample-mean histograms bell-shaping at n=2,30,100, directly breaking CLT-MEANS-POPULATION-BECOMES-NORMAL'),
  },
  {
    conceptId: CLT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If X₁,…,Xₙ are iid N(μ,σ²) (the population is ALREADY normal), is a large sample size n needed before X̄ₙ can be treated as approximately normal?',
    choices: [
      { text: 'No — X̄ₙ is EXACTLY N(μ,σ²/n) for EVERY n, including n=1; "large n" is the price paid SPECIFICALLY for a non-normal population, and an already-normal population needs no CLT approximation at all', isCorrect: true },
      { text: 'Yes — a large sample size is universally required before any sample mean can be treated as normally distributed, regardless of the population', isCorrect: false, misconceptionId: `${CLT}:MC-2` },
      { text: "Yes, since CLT's large-n condition applies to every population without exception, even one that is already exactly normal", isCorrect: false, misconceptionId: `${CLT}:MC-2` },
    ],
    targetedMisconceptions: [`${CLT}:MC-2`],
    source: eb(CLT, 'Demonstration 2 — a normal population’s exact N(μ,σ²/n) sampling distribution at every n, including n=1, requiring no approximation, directly breaking LARGE-N-ALWAYS-REQUIRED'),
  },
  {
    conceptId: CLT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the skewed insurance-claims population, does a SINGLE randomly drawn claim size X become approximately normal, since CLT applies "for large samples"?',
    choices: [
      { text: 'No — a single observation X remains exactly as skewed as the population itself, with zero CLT effect; only the AVERAGE (or SUM) of MANY independent observations approaches normality as the number averaged grows', isCorrect: true },
      { text: 'Yes — CLT guarantees that any single observation from a large enough population is approximately normally distributed', isCorrect: false, misconceptionId: `${CLT}:MC-3` },
      { text: "Yes, since a large population size itself is what CLT requires, regardless of how many observations are averaged together", isCorrect: false, misconceptionId: `${CLT}:MC-3` },
    ],
    targetedMisconceptions: [`${CLT}:MC-3`],
    source: eb(CLT, 'Demonstration 3 — a single claim’s unchanged skewed shape contrasted against X̄₁₀₀’s approximate normality, directly breaking CLT-APPLIES-TO-SINGLE-OBSERVATION'),
  },
]
