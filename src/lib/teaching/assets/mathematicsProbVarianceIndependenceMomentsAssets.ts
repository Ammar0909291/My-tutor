/**
 * Batch: variance, independence, moments (math.prob).
 *
 * With math.seq and math.calc now fully closed (Batches 86-95), this batch
 * moves the campaign to math.prob — already partially open at 3/49
 * (classical-probability, conditional-probability, expected-value) — the
 * domain with the most currently-ready concepts (9) anywhere in
 * mathematics. Prioritized for maximum downstream-unblocking value:
 * math.prob.variance (requires expected-value) unlocks covariance and
 * chebyshev (2 unlocks); math.prob.independence (requires conditional-
 * probability) has no further KG unlocks but is a foundational sibling
 * concept; math.prob.moments (requires expected-value) unlocks mgf.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{variance,independence,
 * moments}.md.
 *
 *   VARIANCE  variance — Var(X)=E[X²]−(E[X])², NEVER E[X²] alone (the
 *             subtraction is what centers the measurement on spread rather
 *             than raw magnitude); variance σ² and standard deviation σ are
 *             DIFFERENT quantities, never interchangeable; shifts never
 *             change variance (Var(X+c)=Var(X)), only scaling does, SQUARED
 *             (Var(aX+b)=a²Var(X)).
 *   INDEPENDENCE  independence — settled by ONE numerical comparison,
 *             P(A∩B) versus P(A)P(B), never by a causal story; disjoint
 *             events with positive probability are the STRONGEST possible
 *             dependence, the exact OPPOSITE of independence; mutual
 *             independence of 3+ events requires the FULL intersection's
 *             product, since pairwise checks alone can miss a hidden joint
 *             dependence.
 *   MOMENTS  moments — the first CENTRAL moment E[X−μ] is ALWAYS exactly
 *             zero for every random variable, by linearity of expectation,
 *             never a coincidence to verify per distribution; skewness is
 *             driven by TAILS, never just the distribution's "bulk"
 *             appearance; kurtosis's "−3" recalibrates against the normal
 *             distribution's own fourth standardized central moment
 *             (exactly 3), never an arbitrary adjustment.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VARIANCE = 'math.prob.variance'
const INDEPENDENCE = 'math.prob.independence'
const MOMENTS = 'math.prob.moments'

export const MATHEMATICS_PROB_VARIANCE_INDEPENDENCE_MOMENTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VARIANCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'VARIANCE IS E[X²]−(E[X])², NEVER E[X²] ALONE: for E[X]=3, E[X²]=13: Var(X)=13−9=4 — NOT '
      + '13. E[X²] measures the average squared MAGNITUDE (always positive, even for a constant '
      + 'far from zero); Var(X) measures the average squared DISTANCE FROM THE MEAN. For a '
      + 'constant random variable X≡5: E[X]=5, E[X²]=25, so Var(X)=25−25=0 — correctly zero '
      + 'spread — while E[X²]=25≠0, showing the two quantities genuinely differ whenever '
      + 'E[X]≠0.\n\n'
      + 'VARIANCE AND STANDARD DEVIATION ARE DIFFERENT QUANTITIES — σ² VERSUS σ, NEVER '
      + 'INTERCHANGEABLE: for a PMF with E[X]=2, E[X²]=6: Var(X)=6−4=2; the standard deviation is '
      + 'σ=√2≈1.41 — a DIFFERENT number from the variance itself. Reporting √Var(X) when asked '
      + 'for Var(X) conflates the two.\n\n'
      + 'SHIFTS NEVER CHANGE VARIANCE; ONLY SCALING FACTORS DO, SQUARED: adding a constant c '
      + 'moves EVERY value by the same amount, so all deviations from the (shifted) mean stay '
      + 'IDENTICAL — Var(X+c)=Var(X) exactly. But scaling by a stretches distances by a factor of '
      + 'a, and since variance SQUARES distances, Var(aX+b)=a²Var(X) — for Var(X)=16: '
      + 'Var(2X−5)=2²·16=64, the constant −5 contributing NOTHING, while the coefficient 2 '
      + 'contributes as 2²=4.',
    targetedMisconceptions: [`${VARIANCE}:MC-1`, `${VARIANCE}:MC-2`, `${VARIANCE}:MC-3`],
    source: eb(VARIANCE, 'Core Understanding — variance as E[X^2]-(E[X])^2 never E[X^2] alone, variance and standard deviation as genuinely different quantities, and shifts never changing variance while scaling changes it by the factor squared'),
  },
  {
    conceptId: INDEPENDENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'INDEPENDENCE IS A NUMERICAL COMPARISON, NEVER A CAUSAL JUDGMENT: A and B are independent '
      + 'iff P(A∩B)=P(A)P(B) — equivalently, P(A|B)=P(A): conditioning on B leaves A\'s '
      + 'probability unchanged. For two fair coins, A="first heads", B="second heads": '
      + 'P(A∩B)=1/4=P(A)P(B)=1/2·1/2 — independent, confirmed by arithmetic, never by a story '
      + 'about the coins being "unrelated."\n\n'
      + 'DISJOINT EVENTS WITH POSITIVE PROBABILITY ARE THE STRONGEST DEPENDENCE, THE OPPOSITE OF '
      + 'INDEPENDENT: for A="roll 1 or 2" (P(A)=1/3) and D="roll 3,4,5,6" (P(D)=2/3), disjoint: '
      + 'P(A∩D)=0≠2/9=P(A)P(D) — NOT independent; in fact P(A|D)=0, meaning knowing D occurred '
      + 'makes A IMPOSSIBLE, the exact opposite of "unaffected." Disjointness (for positive-'
      + 'probability events) is near-maximal dependence, never a form of independence — the '
      + 'everyday intuition "they don\'t overlap, so they\'re unrelated" inverts the actual '
      + 'relationship.\n\n'
      + 'MUTUAL INDEPENDENCE OF n≥3 EVENTS REQUIRES EVERY SUBCOLLECTION\'S PRODUCT, NOT JUST '
      + 'PAIRS: for two fair coins with A="first heads", B="second heads", X="same face" (all '
      + 'probability 1/2): every PAIR passes (P(A∩B)=P(A∩X)=P(B∩X)=1/4=each product) — yet '
      + 'P(A∩B∩X)=1/4≠1/8=P(A)P(B)P(X). Knowing any TWO of {A,B,X} determines the third exactly, '
      + 'a hidden joint dependence pairwise checks cannot detect — "pairwise independent" and '
      + '"mutually independent" are genuinely different strengths of claim.',
    targetedMisconceptions: [`${INDEPENDENCE}:MC-1`, `${INDEPENDENCE}:MC-2`, `${INDEPENDENCE}:MC-3`],
    source: eb(INDEPENDENCE, 'Core Understanding — independence as a numerical comparison P(A intersect B) versus P(A)P(B) rather than a causal judgment, disjoint positive-probability events being the strongest dependence rather than independence, and mutual independence requiring the full-intersection product rather than pairwise checks alone'),
  },
  {
    conceptId: MOMENTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE FIRST CENTRAL MOMENT IS ALWAYS EXACTLY ZERO, FOR EVERY RANDOM VARIABLE, BY '
      + 'CONSTRUCTION: for a fair die roll X, E[X]=3.5 (the first moment, μ). The first CENTRAL '
      + 'moment E[X−μ]=E[X]−μ=3.5−3.5=0 — this holds generally, E[X−μ]=E[X]−μ=μ−μ=0, for ANY '
      + 'random variable, by linearity of expectation. This is a structural fact forced by the '
      + 'definition of μ itself, never a coincidence to verify per distribution.\n\n'
      + 'SKEWNESS IS DRIVEN BY TAILS, NEVER JUST THE DISTRIBUTION\'S "BULK" APPEARANCE: a '
      + 'household-income distribution clustered near a moderate level, with a small number of '
      + 'extremely high values creating a long right tail, produces POSITIVE skewness — the '
      + 'cubed deviations from the rare large values dominate the sum, even though the bulk '
      + 'might look roughly symmetric to casual inspection. Contrast the fair die roll: skewness '
      + 'is EXACTLY zero, since every deviation above μ=3.5 is matched by an equal deviation '
      + 'below it, and cubing preserves this cancellation. Cubing amplifies large deviations far '
      + 'more than small ones, making skewness especially tail-sensitive.\n\n'
      + 'THE MGF ENCODES ALL MOMENTS AT ONCE; KURTOSIS\'S "−3" RECALIBRATES AGAINST THE NORMAL '
      + 'BASELINE: M(t)=E[e^(tX)] has M⁽ᵏ⁾(0)=E[Xᵏ] — a single object from which any moment can '
      + 'be extracted by differentiation. Separately, the normal distribution\'s own fourth '
      + 'standardized central moment E[(X−μ)⁴]/σ⁴ equals EXACTLY 3 — so kurtosis\'s "−3" is not '
      + 'an arbitrary adjustment, it recalibrates the scale so 0 means normal-like tails, '
      + 'positive means heavier tails, negative means lighter tails.',
    targetedMisconceptions: [`${MOMENTS}:MC-1`, `${MOMENTS}:MC-2`, `${MOMENTS}:MC-3`],
    source: eb(MOMENTS, 'Core Understanding — the first central moment always being exactly zero by linearity of expectation, skewness being driven by tails rather than bulk appearance, and kurtosis\'s -3 recalibrating against the normal distribution\'s own fourth standardized central moment of exactly 3'),
  },
]

export const MATHEMATICS_PROB_VARIANCE_INDEPENDENCE_MOMENTS_PROBES: SeedProbe[] = [
  {
    conceptId: VARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a constant random variable X≡5, E[X]=5 and E[X²]=25. Is Var(X)=25, or something else?',
    choices: [
      { text: 'Var(X)=E[X²]−(E[X])²=25−25=0 — correctly zero spread, since X never varies; E[X²]=25 alone measures average squared magnitude, a completely different quantity from variance', isCorrect: true },
      { text: 'Var(X)=25, since E[X²] already fully captures the variance of any random variable without any further subtraction needed', isCorrect: false, misconceptionId: `${VARIANCE}:MC-1` },
      { text: 'Var(X)=25, because for a constant random variable, the variance formula simplifies to just E[X²] with the mean term dropping out entirely', isCorrect: false, misconceptionId: `${VARIANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${VARIANCE}:MC-1`],
    source: eb(VARIANCE, 'Demonstration 1 — the constant random variable X=5 showing E[X^2]=25 does not equal Var(X)=0, directly breaking variance-is-E[X-squared]'),
  },
  {
    conceptId: VARIANCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a PMF with Var(X)=2, is the standard deviation σ also equal to 2?',
    choices: [
      { text: 'No — σ=√Var(X)=√2≈1.41, a genuinely DIFFERENT number from the variance itself; variance (σ²) and standard deviation (σ) are related but never interchangeable quantities', isCorrect: true },
      { text: 'Yes — variance and standard deviation are simply two different names for the identical numerical quantity', isCorrect: false, misconceptionId: `${VARIANCE}:MC-2` },
      { text: 'Yes, since taking a square root of a quantity never changes its actual numerical value in probability calculations', isCorrect: false, misconceptionId: `${VARIANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${VARIANCE}:MC-2`],
    source: eb(VARIANCE, 'Demonstration 2 — a PMF giving Var(X)=2 and sigma=sqrt(2) labeled explicitly as two different numbers, directly breaking variance-is-standard-deviation'),
  },
  {
    conceptId: VARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Test scores have Var(X)=100. If 10 points are added to every score, what is Var(X+10)?',
    choices: [
      { text: 'Var(X+10)=100, unchanged — adding a constant shifts every value by the same amount, so all deviations from the (shifted) mean stay identical; shifts never change variance, only scaling does', isCorrect: true },
      { text: 'Var(X+10)=110, since the constant 10 added to every score should be added directly to the variance as well', isCorrect: false, misconceptionId: `${VARIANCE}:MC-3` },
      { text: 'Var(X+10)=100+10²=200, since any transformation applied to the random variable should also square the added constant', isCorrect: false, misconceptionId: `${VARIANCE}:MC-3` },
    ],
    targetedMisconceptions: [`${VARIANCE}:MC-3`],
    source: eb(VARIANCE, 'Demonstration 3 — test scores with Var(X)=100 showing adding 10 points to every score leaves Var(X+10)=100 unchanged, directly breaking shift-changes-variance'),
  },
  {
    conceptId: INDEPENDENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a fair die, A="roll 1 or 2" and D="roll 3,4,5,6" are disjoint (they never happen together). Does this make A and D independent?',
    choices: [
      { text: 'No — disjoint events with positive probability are the STRONGEST possible dependence, the exact opposite of independent: P(A∩D)=0≠2/9=P(A)P(D), and P(A|D)=0 means knowing D occurred makes A IMPOSSIBLE', isCorrect: true },
      { text: 'Yes — since A and D never occur together, they cannot possibly affect each other\'s probability, which is exactly what independence means', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-1` },
      { text: 'Yes, because events that don\'t overlap at all are automatically unrelated to one another in every probabilistic sense', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${INDEPENDENCE}:MC-1`],
    source: eb(INDEPENDENCE, 'Demonstration 1 — A="roll 1 or 2" and D="roll 3-6" on a fair die being disjoint yet dependent with P(A|D)=0, directly breaking disjoint-means-independent'),
  },
  {
    conceptId: INDEPENDENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For two fair coins with A="first heads", B="second heads", X="same face" (each probability 1/2), every PAIR among {A,B,X} passes the independence product test. Does this mean all three are MUTUALLY independent?',
    choices: [
      { text: 'No — checking the FULL intersection reveals P(A∩B∩X)=1/4≠1/8=P(A)P(B)P(X); knowing any TWO of {A,B,X} determines the third exactly, a hidden joint dependence pairwise checks alone cannot detect', isCorrect: true },
      { text: 'Yes — if every pair among a collection of events passes the independence test, the whole collection must automatically be mutually independent', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-2` },
      { text: 'Yes, since pairwise independence is mathematically equivalent to mutual independence for any number of events', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${INDEPENDENCE}:MC-2`],
    source: eb(INDEPENDENCE, 'Demonstration 2 — the two-coin A,B,X construction where every pair passes but the triple intersection fails, directly breaking pairwise-implies-mutual'),
  },
  {
    conceptId: INDEPENDENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two machines sharing a power supply have P(A)=0.1, P(B)=0.2, P(A∩B)=0.02. Does sharing a power supply mean they must be dependent, or does the arithmetic decide?',
    choices: [
      { text: 'The arithmetic decides — P(A)P(B)=0.1×0.2=0.02 matches P(A∩B)=0.02 exactly, so A and B ARE independent by the data, regardless of how plausible the shared-infrastructure narrative sounds', isCorrect: true },
      { text: 'Sharing a physical connection like a power supply always guarantees dependence between two events, regardless of what the actual probabilities compute to', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-3` },
      { text: 'The plausibility of a causal story is sufficient by itself to determine independence, without needing to verify the product rule numerically', isCorrect: false, misconceptionId: `${INDEPENDENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${INDEPENDENCE}:MC-3`],
    source: eb(INDEPENDENCE, 'Demonstration 3 — two machines sharing a power supply where the product P(A)P(B) matches P(A intersect B) exactly despite the causal-sounding narrative, directly breaking independence-is-causal-unrelatedness'),
  },
  {
    conceptId: MOMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Could some unusual random variable have a nonzero first central moment E[X−μ]?',
    choices: [
      { text: 'No — E[X−μ]=E[X]−μ=μ−μ=0 for ANY random variable, by linearity of expectation; this is a structural fact forced by the definition of μ itself, never a coincidence that needs checking per distribution', isCorrect: true },
      { text: 'Yes — for sufficiently unusual or skewed distributions, the first central moment can come out nonzero', isCorrect: false, misconceptionId: `${MOMENTS}:MC-1` },
      { text: 'Yes, since the first central moment depends on the specific shape of the distribution and must be computed separately in each case', isCorrect: false, misconceptionId: `${MOMENTS}:MC-1` },
    ],
    targetedMisconceptions: [`${MOMENTS}:MC-1`],
    source: eb(MOMENTS, 'Demonstration 1 — the general algebraic proof E[X-mu]=0 alongside the die roll\'s numeric confirmation, directly breaking first-central-moment-assumed-variable'),
  },
  {
    conceptId: MOMENTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A household-income distribution\'s main body looks roughly symmetric, with just a few extremely high values in a long tail. Must its skewness be close to zero?',
    choices: [
      { text: 'No — skewness is driven by TAILS, never just the bulk appearance; the cubed deviations from the rare large values dominate the sum, producing substantial POSITIVE skewness even though the bulk looks roughly symmetric to casual inspection', isCorrect: true },
      { text: 'Yes — if the main body of a distribution looks symmetric, its skewness must be close to zero regardless of what happens in the tails', isCorrect: false, misconceptionId: `${MOMENTS}:MC-2` },
      { text: 'Yes, since skewness is primarily a measure of how typical or central values are distributed, not an extreme-value-sensitive statistic', isCorrect: false, misconceptionId: `${MOMENTS}:MC-2` },
    ],
    targetedMisconceptions: [`${MOMENTS}:MC-2`],
    source: eb(MOMENTS, 'Demonstration 2 — the income distribution\'s roughly-symmetric bulk versus its substantial positive skewness from a thin extreme tail, directly breaking skewness-judged-by-bulk-appearance'),
  },
  {
    conceptId: MOMENTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the "−3" in the kurtosis formula an arbitrary adjustment with no particular meaning?',
    choices: [
      { text: 'No — the normal distribution\'s own fourth standardized central moment E[(X−μ)⁴]/σ⁴ equals EXACTLY 3, so kurtosis\'s "−3" recalibrates the scale so that 0 means normal-like tails, positive means heavier tails, and negative means lighter tails', isCorrect: true },
      { text: 'Yes — the "−3" is simply a conventional adjustment added to the formula with no deeper mathematical justification behind it', isCorrect: false, misconceptionId: `${MOMENTS}:MC-3` },
      { text: 'Yes, since kurtosis could equally well be defined without subtracting anything, and the "−3" is purely a matter of historical notation preference', isCorrect: false, misconceptionId: `${MOMENTS}:MC-3` },
    ],
    targetedMisconceptions: [`${MOMENTS}:MC-3`],
    source: eb(MOMENTS, 'Demonstration 3 — the normal distribution\'s fourth standardized central moment equaling exactly 3, motivating kurtosis\'s -3, directly breaking kurtosis-minus-3-assumed-arbitrary'),
  },
]
