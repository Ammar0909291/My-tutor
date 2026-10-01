/**
 * Batch: total-probability, chebyshev, mgf (math.prob).
 *
 * Continues the math.prob domain opened in Batch 96. Prioritized for
 * downstream-unblocking value: math.prob.total-probability (requires
 * conditional-probability) unlocks bayes-theorem; math.prob.chebyshev
 * (requires variance, authored Batch 96) unlocks lln (the weak Law of
 * Large Numbers); math.prob.mgf (requires moments, authored Batch 96, and
 * math.calc.power-series, already authored) unlocks characteristic-
 * function per the live KG.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{total-probability,
 * chebyshev,mgf}.md.
 *
 *   TOTAL-PROBABILITY  total-probability — the law is a WEIGHTED average by
 *             base rates P(Bᵢ), never a simple unweighted average; a
 *             partition requires BOTH mutual exclusivity AND exhaustiveness
 *             — neither alone suffices; the law extends beyond two cases to
 *             ANY partition size, including the continuous case, never
 *             limited to the two-case form.
 *   CHEBYSHEV  chebyshev — P(|X−μ|≥kσ)≤1/k² is an UPPER BOUND, never the
 *             exact probability (a Normal r.v. can sit far below it);
 *             distribution-freeness is the ENTIRE POINT, never a
 *             limitation requiring the shape "worked around"; k MUST be
 *             standardized (raw deviation)/σ before applying the formula,
 *             never a raw deviation substituted directly.
 *   MGF  mgf — this concept COMPUTES and DERIVES, never redefines
 *             M(t)=E[e^(tX)] (already previewed in math.prob.moments); the
 *             derivative-extraction rule M^(k)(0)=E[Xᵏ] comes from
 *             POWER-SERIES coefficient matching, never an isolated fact;
 *             for independent X,Y, M_(X+Y)=M_X·M_Y, letting a sum's
 *             distribution be IDENTIFIED via MGF algebra, never requiring
 *             convolution.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TOTAL_PROBABILITY = 'math.prob.total-probability'
const CHEBYSHEV = 'math.prob.chebyshev'
const MGF = 'math.prob.mgf'

export const MATHEMATICS_PROB_TOTAL_PROBABILITY_CHEBYSHEV_MGF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TOTAL_PROBABILITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE LAW IS A WEIGHTED AVERAGE BY BASE RATES, NEVER A SIMPLE AVERAGE: since '
      + 'A=A∩Ω=A∩(B₁∪⋯∪Bₙ)=(A∩B₁)∪⋯∪(A∩Bₙ), and the A∩Bᵢ pieces are mutually exclusive, '
      + 'P(A)=∑P(A∩Bᵢ)=∑P(A|Bᵢ)P(Bᵢ). For a disease test with P(D)=0.01, sensitivity '
      + 'P(+|D)=0.95, false-positive rate P(+|Dᶜ)=0.10: P(+)=0.95(0.01)+0.10(0.99)=0.1085 — the '
      + 'RARE case D contributes proportionally little, exactly as its small weight demands; a '
      + 'naive unweighted average (0.95+0.10)/2=0.525 would be badly wrong.\n\n'
      + 'A PARTITION REQUIRES BOTH MUTUAL EXCLUSIVITY AND EXHAUSTIVENESS — NEITHER ALONE '
      + 'SUFFICES: applying the law to a collection that isn\'t genuinely a partition gives '
      + 'incorrect results. {heads, tails} IS a valid partition of a coin flip (mutually '
      + 'exclusive AND exhaustive); {heads, even} for a die is NOT (fails both properties '
      + 'simultaneously). For ANY event B, {B,Bᶜ} is always a valid 2-element partition.\n\n'
      + 'THE LAW EXTENDS BEYOND TWO CASES TO ANY PARTITION SIZE, INCLUDING CONTINUOUS '
      + 'CONDITIONING: generalizing the two-case P(A)=P(A|B)P(B)+P(A|Bᶜ)P(Bᶜ) to n cases, '
      + 'P(A)=∑ᵢP(A|Bᵢ)P(Bᵢ), and further to a continuous conditioning variable Y: '
      + 'P(A)=∫P(A|Y=y)f_Y(y)dy. The same tower-property structure applies to expectation: '
      + 'E[X]=∑ᵢE[X|Bᵢ]P(Bᵢ).',
    targetedMisconceptions: [`${TOTAL_PROBABILITY}:MC-1`, `${TOTAL_PROBABILITY}:MC-2`, `${TOTAL_PROBABILITY}:MC-3`],
    source: eb(TOTAL_PROBABILITY, 'Core Understanding — the Law of Total Probability as a weighted average by base rates, a partition requiring both mutual exclusivity and exhaustiveness, and the law extending beyond two cases to any partition size including the continuous case'),
  },
  {
    conceptId: CHEBYSHEV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'CHEBYSHEV IS A CEILING, NEVER THE EXACT PROBABILITY: for μ=50, σ=5, k=2: '
      + 'P(|X−50|≥10)≤1/2²=0.25 — but for a NORMAL random variable specifically, the ACTUAL '
      + 'probability at k=2 is ≈0.0455, more than FIVE TIMES smaller than the bound. The bound '
      + 'must remain valid for the WORST-CASE distribution consistent with that μ,σ — for '
      + 'well-behaved distributions like Normal, the true probability is typically far below '
      + 'the ceiling.\n\n'
      + 'DISTRIBUTION-FREENESS IS THE ENTIRE POINT — NEVER A REASON TO DEMAND THE SHAPE FIRST: '
      + 'given only μ=1000, σ=50 hours (lifetime distribution unmodeled, possibly skewed), '
      + 'bounding P(|X−1000|≥100): since 100=2σ, Chebyshev gives ≤1/4 IMMEDIATELY — no '
      + 'distributional assumption is needed, available, or would help. Insisting "we can\'t '
      + 'answer without knowing the distribution" misses that Chebyshev exists EXACTLY for this '
      + 'situation — its derivation never uses the shape of X at any step.\n\n'
      + 'k MUST BE STANDARDIZED — A RAW DEVIATION IS NEVER SUBSTITUTED DIRECTLY: for μ=200, '
      + 'σ=10, bounding P(|X−200|≥40): the raw deviation is 40 (original units), so k=40/10=4, '
      + 'giving bound 1/16=0.0625. Plugging k=40 directly gives the nonsensical 1/1600 — '
      + 'SIXTEEN TIMES smaller, conflating "40 units away" with "40 STANDARD DEVIATIONS away."',
    targetedMisconceptions: [`${CHEBYSHEV}:MC-1`, `${CHEBYSHEV}:MC-2`, `${CHEBYSHEV}:MC-3`],
    source: eb(CHEBYSHEV, 'Core Understanding — Chebyshev\'s inequality as an upper bound never the exact probability, distribution-freeness being the entire point never a limitation, and k requiring standardization by dividing the raw deviation by sigma'),
  },
  {
    conceptId: MGF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THIS CONCEPT COMPUTES AND DERIVES — IT DOES NOT REDEFINE: math.prob.moments already '
      + 'introduces M(t)=E[e^(tX)] and states M^(k)(0)=E[Xᵏ] at orientation level. For '
      + 'X~Exponential(λ): M_X(t)=E[e^(tX)]=λ/(λ−t) (finite for t<λ). Differentiating: '
      + 'M_X\'(0)=λ/λ²=1/λ — matching the already-known E[X]=1/λ exactly, concretely verifying '
      + 'the previewed derivative rule.\n\n'
      + 'THE DERIVATIVE RULE COMES FROM POWER-SERIES COEFFICIENT MATCHING, NEVER AN ISOLATED '
      + 'FACT: expanding e^(tX)=∑(tX)ᵏ/k! and taking expectations term-by-term: '
      + 'M_X(t)=∑(E[Xᵏ]/k!)tᵏ — a power series in t whose kth coefficient is E[Xᵏ]/k!. By '
      + 'math.calc.power-series\'s own fact that the kth Taylor coefficient equals f^(k)(0)/k!, '
      + 'matching coefficients gives M_X^(k)(0)=E[Xᵏ] exactly — derived from power-series '
      + 'machinery, not stated as an unmotivated trick.\n\n'
      + 'UNIQUENESS AND THE PRODUCT RULE MAKE THE MGF GENUINELY POWERFUL, NOT JUST NOTATIONAL: '
      + 'if M_X(t)=M_Y(t) near t=0, then X and Y have the SAME distribution. For independent '
      + 'X,Y: M_(X+Y)(t)=E[e^(tX)e^(tY)]=E[e^(tX)]E[e^(tY)]=M_X(t)M_Y(t) — the MGF of a sum of '
      + 'independent variables is the PRODUCT of their individual MGFs. For n iid '
      + 'Exponential(λ) variables, the sum\'s MGF is recognized as Gamma(n,λ)\'s own MGF, so by '
      + 'uniqueness the sum follows Gamma(n,λ) — identified entirely through MGF algebra, no '
      + 'convolution required.',
    targetedMisconceptions: [`${MGF}:MC-1`, `${MGF}:MC-2`, `${MGF}:MC-3`],
    source: eb(MGF, 'Core Understanding — the MGF as the full development (not a redefinition) of moments\' own preview, the derivative-extraction rule derived from power-series coefficient matching, and the product rule with uniqueness letting a sum\'s distribution be identified without convolution'),
  },
]

export const MATHEMATICS_PROB_TOTAL_PROBABILITY_CHEBYSHEV_MGF_PROBES: SeedProbe[] = [
  {
    conceptId: TOTAL_PROBABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'With P(B₁)=0.001, P(B₂)=0.999, P(A|B₁)=1, P(A|B₂)=0, is P(A) the simple average [1+0]/2=0.5, or something else?',
    choices: [
      { text: 'Something else — the weighted average P(A)=1(0.001)+0(0.999)=0.001; the rare case B₁ contributes negligibly to P(A), exactly as its tiny base rate P(B₁)=0.001 demands', isCorrect: true },
      { text: 'P(A)=0.5, since averaging the two conditional probabilities directly gives the correct total probability regardless of how likely each case is', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-1` },
      { text: 'P(A)=0.5, because the law of total probability treats every conditioning case as equally weighted by default', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-1` },
    ],
    targetedMisconceptions: [`${TOTAL_PROBABILITY}:MC-1`],
    source: eb(TOTAL_PROBABILITY, 'Demonstration 1 — the extreme-weight example showing the weighted average 0.001 versus the wrong simple average 0.5, directly breaking total-probability-averages-probabilities'),
  },
  {
    conceptId: TOTAL_PROBABILITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a die roll, is {"roll shows heads"-style label, "roll is even"} — i.e. {heads, even} — a valid partition to apply the law of total probability to?',
    choices: [
      { text: 'No — a partition requires BOTH mutual exclusivity AND exhaustiveness, and {heads, even} fails both simultaneously (it doesn\'t even meaningfully apply to a die, and doesn\'t cover every outcome without overlap); {B, Bᶜ} for any event B is always a safe, valid 2-element partition instead', isCorrect: true },
      { text: 'Yes — any collection of two labeled cases can serve as a partition for the law of total probability, regardless of whether they overlap or leave gaps', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-2` },
      { text: 'Yes, since only one of the two properties (mutual exclusivity or exhaustiveness) needs to hold for a valid partition', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-2` },
    ],
    targetedMisconceptions: [`${TOTAL_PROBABILITY}:MC-2`],
    source: eb(TOTAL_PROBABILITY, 'Demonstration 2 — {heads,tails} as a valid partition versus {heads,even} failing both properties, directly breaking partition-is-optional'),
  },
  {
    conceptId: TOTAL_PROBABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A bag has 10 coins with different biases p₁,...,p₁₀, each equally likely to be picked. Does the law of total probability only work for exactly two conditioning cases, or can it handle all 10 at once?',
    choices: [
      { text: 'It handles all 10 at once — the law generalizes directly to P(H)=∑(pᵢ/10) for any partition size n, never limited to the two-case form; two cases is simply the simplest illustrative example', isCorrect: true },
      { text: 'The law of total probability only applies when there are exactly two conditioning cases, so a 10-coin scenario would need a fundamentally different technique', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-3` },
      { text: 'The 10-case scenario would need to be broken down into multiple separate two-case applications of the law, since it cannot be applied directly to more than two cases', isCorrect: false, misconceptionId: `${TOTAL_PROBABILITY}:MC-3` },
    ],
    targetedMisconceptions: [`${TOTAL_PROBABILITY}:MC-3`],
    source: eb(TOTAL_PROBABILITY, 'Demonstration 3 — the bag-of-coins n-case generalization P(H)=sum(p_i/10), directly breaking total-probability-is-only-for-two-cases'),
  },
  {
    conceptId: CHEBYSHEV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Chebyshev gives P(|X−μ|≥2σ)≤0.25. For a Normal random variable specifically, is the actual probability exactly 0.25?',
    choices: [
      { text: 'No — Chebyshev is a CEILING, never the exact probability; for a Normal random variable, the actual probability at k=2 is ≈0.0455, more than five times smaller than the 0.25 bound', isCorrect: true },
      { text: 'Yes — Chebyshev\'s inequality gives the precise, exact probability for any distribution with the stated mean and variance', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-1` },
      { text: 'Yes, since the formula 1/k² is derived to compute the exact tail probability rather than merely bound it', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-1` },
    ],
    targetedMisconceptions: [`${CHEBYSHEV}:MC-1`],
    source: eb(CHEBYSHEV, 'Demonstration 1 — the k=2 comparison between Chebyshev\'s bound 0.25 and the Normal distribution\'s actual probability of about 0.0455, directly breaking bound-is-exact'),
  },
  {
    conceptId: CHEBYSHEV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A factory\'s lifetime data has μ=1000, σ=50 hours, but the distribution\'s shape is completely unmodeled and possibly skewed. Can Chebyshev\'s inequality still bound P(|X−1000|≥100)?',
    choices: [
      { text: 'Yes — distribution-freeness is the ENTIRE POINT of Chebyshev, never a limitation; since 100=2σ, the bound ≤1/4 applies IMMEDIATELY with no distributional assumption needed, available, or helpful beyond μ and σ', isCorrect: true },
      { text: 'No — Chebyshev\'s inequality cannot be applied until the distribution\'s specific shape is known, exactly like most other probability tools such as Normal tables', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-2` },
      { text: 'No, since bounding a probability without knowing the distribution\'s shape is mathematically impossible for any technique, including Chebyshev', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-2` },
    ],
    targetedMisconceptions: [`${CHEBYSHEV}:MC-2`],
    source: eb(CHEBYSHEV, 'Demonstration 2 — a factory\'s lifetime data with unmodeled distribution shape bounded immediately via mu and sigma alone, directly breaking distribution-specific-assumption'),
  },
  {
    conceptId: CHEBYSHEV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For μ=200, σ=10, bounding P(|X−200|≥40): should k be set to 40 directly, or to 40/10=4?',
    choices: [
      { text: 'k=40/10=4 — k must always be STANDARDIZED as (raw deviation)/σ; using k=4 gives the correct bound 1/16=0.0625, while plugging in the raw deviation k=40 directly gives the nonsensical 1/1600, sixteen times smaller', isCorrect: true },
      { text: 'k=40 — the raw deviation stated in the problem can be substituted directly into the formula P(|X−μ|≥kσ)≤1/k² without any further adjustment', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-3` },
      { text: 'k=40, since "k" in Chebyshev\'s formula refers to the same quantity as the raw deviation given in the problem statement', isCorrect: false, misconceptionId: `${CHEBYSHEV}:MC-3` },
    ],
    targetedMisconceptions: [`${CHEBYSHEV}:MC-3`],
    source: eb(CHEBYSHEV, 'Demonstration 3 — mu=200, sigma=10, deviation 40 giving correct k=4 versus incorrect k=40, directly breaking raw-deviation-not-standardized'),
  },
  {
    conceptId: MGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'This concept introduces M(t)=E[e^(tX)] again. Does it define the MGF for the first time, or fully develop something already previewed?',
    choices: [
      { text: 'It fully develops something already previewed — math.prob.moments already introduced M(t)=E[e^(tX)] and M^(k)(0)=E[Xᵏ] at orientation level; this concept computes and derives, it does not redefine', isCorrect: true },
      { text: 'It defines the moment generating function for the first time, as a genuinely new concept unrelated to anything covered previously', isCorrect: false, misconceptionId: `${MGF}:MC-1` },
      { text: 'It replaces the earlier preview with a completely different, more advanced definition of the same-looking notation', isCorrect: false, misconceptionId: `${MGF}:MC-1` },
    ],
    targetedMisconceptions: [`${MGF}:MC-1`],
    source: eb(MGF, 'Demonstration 1 — the exponential distribution\'s MGF computed explicitly with its derivative verified against the already-known E[X]=1/lambda, directly breaking MGF-assumed-new-definition'),
  },
  {
    conceptId: MGF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the rule M^(k)(0)=E[Xᵏ] (differentiating the MGF at 0 extracts moments) an independent probability fact to memorize, or does it follow from something else?',
    choices: [
      { text: 'It follows from power-series coefficient matching — expanding e^(tX)=∑(tX)ᵏ/k! and taking expectations gives M_X(t)=∑(E[Xᵏ]/k!)tᵏ, and matching this against the general Taylor-coefficient fact f^(k)(0)/k! yields M^(k)(0)=E[Xᵏ] directly', isCorrect: true },
      { text: 'It is an independent probability fact with no deeper mathematical justification, simply stated and applied as its own standalone rule', isCorrect: false, misconceptionId: `${MGF}:MC-2` },
      { text: 'It is a notational convention chosen for convenience, unconnected to any broader mathematical machinery like power series', isCorrect: false, misconceptionId: `${MGF}:MC-2` },
    ],
    targetedMisconceptions: [`${MGF}:MC-2`],
    source: eb(MGF, 'Demonstration 2 — the geometric-series coefficient-matching derivation of E[X^k]=k!/lambda^k, directly breaking derivative-rule-assumed-independent-fact'),
  },
  {
    conceptId: MGF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To find the distribution of a sum of n independent Exponential(λ) random variables, is direct convolution of densities the only reliable method?',
    choices: [
      { text: 'No — multiplying the individual MGFs gives (λ/(λ−t))ⁿ, which is recognized as Gamma(n,λ)\'s own MGF; by uniqueness, the sum IS Gamma(n,λ)-distributed, identified entirely through MGF algebra with no convolution required', isCorrect: true },
      { text: 'Yes — convolving the densities directly is the only reliable way to determine the distribution of a sum of independent random variables', isCorrect: false, misconceptionId: `${MGF}:MC-3` },
      { text: 'Yes, since MGF multiplication only provides an approximation to the true distribution, never an exact identification the way convolution does', isCorrect: false, misconceptionId: `${MGF}:MC-3` },
    ],
    targetedMisconceptions: [`${MGF}:MC-3`],
    source: eb(MGF, 'Demonstration 3 — n independent exponentials\' MGF product recognized as Gamma(n,lambda)\'s own MGF, directly breaking convolution-assumed-only-reliable-method'),
  },
]
