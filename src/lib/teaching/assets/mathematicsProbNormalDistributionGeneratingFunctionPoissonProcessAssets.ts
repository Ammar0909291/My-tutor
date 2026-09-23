/**
 * Batch: normal-distribution, generating-function, poisson-process
 * (math.prob).
 *
 * Continuing math.prob (41/49 -> 44/49). Fresh frontier recompute after
 * discrete-distributions/continuous-distributions/martingale's authoring
 * found 3 ready concepts. Selected normal-distribution (unlocks clt, the
 * highest-value remaining pick), generating-function (closes pmf +
 * math.calc.power-series's joint prerequisite chain), and poisson-process
 * (closes the discrete-distributions + continuous-distributions +
 * independence convergence) — leaving only combinatorial-probability,
 * standard-normal, characteristic-function, clt, and convergence-types,
 * all currently blocked on further prerequisites. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.prob.{normal-distribution,generating-function,
 * poisson-process}.md.
 *
 *   NORMAL-DISTRIBUTION  N(μ,σ²)'s second parameter is the VARIANCE, the
 *           standard deviation requires a square root first; standardization
 *           is Z=(X-μ)/σ, never reversed; symmetry gives P(X>μ)=0.5 for ANY
 *           normal regardless of σ.
 *   GENERATING-FUNCTION  G''(1) gives a FALLING FACTORIAL moment, never
 *           E[X²] directly; independence makes generating functions
 *           MULTIPLY, never add; the MGF UNIQUELY determines the
 *           distribution, never just a moment-computation shortcut.
 *   POISSON-PROCESS  interarrival times are RANDOM and EXPONENTIAL, never
 *           regularly spaced; superposition works for ANY rates, never
 *           requiring equal λ's; thinning produces its OWN exponential
 *           interarrival times at the NEW rate, never the original rate.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NORMAL_DISTRIBUTION = 'math.prob.normal-distribution'
const GENERATING_FUNCTION = 'math.prob.generating-function'
const POISSON_PROCESS = 'math.prob.poisson-process'

export const MATHEMATICS_PROB_NORMAL_DISTRIBUTION_GENERATING_FUNCTION_POISSON_PROCESS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'N(μ,σ²)’S SECOND PARAMETER IS THE VARIANCE — THE STANDARD DEVIATION REQUIRES A SQUARE '
      + 'ROOT FIRST: for N(10,4): σ²=4, so σ=√4=2 — NEVER σ=4. The Z-formula always needs σ '
      + '(standard deviation), never σ² (variance) directly. For N(5,16): σ=√16=4, and Z=(X-5)/4 '
      + '— using σ²=16 as the denominator instead would give an entirely wrong Z-score.\n\n'
      + 'STANDARDIZATION IS Z=(X-μ)/σ — NEVER REVERSED: for X~N(10,1), finding P(X<8): '
      + 'Z=(8-10)/1=-2 (negative, since 8 is BELOW the mean), giving P(X<8)=Φ(-2)=0.0228. '
      + 'Reversing to Z=(μ-X)/σ=(10-8)/1=2 gives the WRONG sign, reflecting into the wrong tail '
      + 'entirely (Φ(2)=0.9772, the complement of the correct answer). The formula always '
      + 'subtracts the mean FROM the data value, never the reverse.\n\n'
      + 'SYMMETRY GIVES P(X>μ)=0.5 FOR ANY NORMAL, REGARDLESS OF σ: for both N(0,1) and N(0,4): '
      + 'P(X>0)=0.5 in BOTH cases — symmetry about the mean holds regardless of spread, never '
      + 'needing separate computation. THE 68-95-99.7 EMPIRICAL RULE gives fast estimation: for '
      + 'N(20,9) (σ=3), P(17<X<23)=P(μ-σ<X<μ+σ)≈68% — read directly from the rule, no table '
      + 'needed, since 17 and 23 are each exactly 1σ from the mean.',
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-1`, `${NORMAL_DISTRIBUTION}:MC-2`, `${NORMAL_DISTRIBUTION}:MC-3`],
    source: eb(NORMAL_DISTRIBUTION, 'Core Understanding — N(μ,σ²)’s second parameter as the variance requiring a square root before use, standardization Z=(X-μ)/σ never reversed, and symmetry giving P(X>μ)=0.5 for any Normal regardless of σ'),
  },
  {
    conceptId: GENERATING_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'G″(1) GIVES A FALLING FACTORIAL MOMENT, NEVER E[X²] DIRECTLY: differentiating '
      + 'G(z)=Σ_k P(X=k)z^k twice gives G″(z)=Σ_k k(k-1)P(X=k)z^(k-2), so '
      + 'G″(1)=Σ_k k(k-1)P(X=k)=E[X(X-1)]=E[X²]-E[X] — NOT E[X²] itself. The correct raw second '
      + 'moment requires the CONVERSION E[X²]=G″(1)+G′(1). For Bernoulli(p): G(z)=1-p+pz, '
      + 'G′(1)=p=E[X], G″(1)=0, so E[X²]=0+p=p — confirmed directly since X²=X for a 0/1 '
      + 'variable.\n\n'
      + 'INDEPENDENCE MAKES GENERATING FUNCTIONS MULTIPLY, NEVER ADD: for independent X,Y: '
      + 'G_{X+Y}(z)=E[z^(X+Y)]=E[z^X·z^Y]=E[z^X]E[z^Y]=G_X(z)G_Y(z) — a PRODUCT, mirroring PMF '
      + 'convolution P(X+Y=k)=Σ_j P(X=j)P(Y=k-j) at the transform level. Adding generating '
      + 'functions instead, Σ_k[P(X=k)+P(Y=k)]z^k, doesn’t even integrate to 1 (it sums to 2) — '
      + 'it isn’t even a valid probability distribution, confirming the sum is never the correct '
      + 'operation.\n\n'
      + 'THE MGF UNIQUELY DETERMINES THE DISTRIBUTION — IT IS NEVER JUST A MOMENT-COMPUTATION '
      + 'SHORTCUT: if M_X(t)=M_Y(t) for all t near 0, then X and Y have the SAME distribution — '
      + 'the MGF carries ALL distributional information, not merely the moments extracted from '
      + 'its derivatives. For independent X~N(μ₁,σ₁²), Y~N(μ₂,σ₂²): '
      + 'M_{X+Y}(t)=e^((μ₁+μ₂)t+(σ₁²+σ₂²)t²/2) — RECOGNIZABLE as the MGF of '
      + 'N(μ₁+μ₂,σ₁²+σ₂²), and by uniqueness this IS the distribution of X+Y, not merely a '
      + 'distribution sharing the same moments.',
    targetedMisconceptions: [`${GENERATING_FUNCTION}:MC-1`, `${GENERATING_FUNCTION}:MC-2`, `${GENERATING_FUNCTION}:MC-3`],
    source: eb(GENERATING_FUNCTION, 'Core Understanding — G″(1) as a falling factorial moment requiring conversion never E[X²] directly, independence making generating functions multiply never add, and the MGF uniquely determining the distribution never just a moment shortcut'),
  },
  {
    conceptId: POISSON_PROCESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'INTERARRIVAL TIMES ARE RANDOM AND EXPONENTIAL — NEVER REGULARLY SPACED: a rate-λ Poisson '
      + 'process has Sᵢ~Exponential(λ), mean 1/λ but standard deviation ALSO 1/λ — high '
      + 'variability, not regularity. Actual arrivals genuinely cluster (several close together) '
      + 'and spread out (long gaps) — "rate λ" describes only the AVERAGE, never a fixed spacing. '
      + 'A deterministic process with constant interarrival 1/λ is NOT a Poisson process at all '
      + '(it fails the independence-of-increments axiom).\n\n'
      + 'SUPERPOSITION WORKS FOR ANY RATES, NEVER REQUIRING EQUAL λ’s: for independent '
      + 'N₁(t)~Poisson(λ₁t) and N₂(t)~Poisson(λ₂t): N₁(t)+N₂(t)~Poisson((λ₁+λ₂)t) — verified via '
      + 'the MGF argument M_{N₁+N₂}(t)=e^(λ₁(e^t-1))·e^(λ₂(e^t-1))=e^((λ₁+λ₂)(e^t-1)), holding '
      + 'REGARDLESS of whether λ₁=λ₂. For a call center receiving calls from two sources at '
      + '4/hr and 6/hr: the total is Poisson(10/hr) directly.\n\n'
      + 'THINNING PRESERVES THE FULL POISSON STRUCTURE — THE THINNED PROCESS HAS ITS OWN '
      + 'EXPONENTIAL INTERARRIVAL TIMES AT THE NEW RATE, NEVER THE ORIGINAL RATE: keeping each '
      + 'event independently with probability p gives a Poisson(λp) process whose OWN '
      + 'interarrival times are Exponential(λp) — NOT Exponential(λ). For a bus route with '
      + 'λ=12/hr, each bus going your direction with probability 0.7: your buses form '
      + 'Poisson(8.4/hr), with mean interarrival time 1/8.4 hours, genuinely LONGER than the '
      + 'original 1/12 — sparser events, not the original spacing thinned down. The kept and '
      + 'discarded sub-processes are furthermore INDEPENDENT of each other, a non-obvious but '
      + 'essential fact.',
    targetedMisconceptions: [`${POISSON_PROCESS}:MC-1`, `${POISSON_PROCESS}:MC-2`, `${POISSON_PROCESS}:MC-3`],
    source: eb(POISSON_PROCESS, 'Core Understanding — interarrival times as random and exponential never regularly spaced, superposition working for any rates never requiring equal λ’s, and thinning producing its own exponential interarrival times at the new rate never the original'),
  },
]

export const MATHEMATICS_PROB_NORMAL_DISTRIBUTION_GENERATING_FUNCTION_POISSON_PROCESS_PROBES: SeedProbe[] = [
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X~N(10,4), what is σ (the standard deviation)?',
    choices: [
      { text: 'σ=√4=2 — the second parameter of N(μ,σ²) is the VARIANCE, so the standard deviation requires a square root first; using σ=4 directly would be wrong', isCorrect: true },
      { text: 'σ=4 — the second parameter of N(μ,σ²) directly gives the standard deviation', isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
      { text: "σ=16, since squaring the given parameter gives the standard deviation", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-1`],
    source: eb(NORMAL_DISTRIBUTION, 'Demonstration 1 — N(10,4)’s σ=√4=2, contrasted against the wrong σ=4, directly breaking SIGMA-VS-SIGMA-SQUARED'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X~N(10,1), to find P(X<8), is the correct standardization Z=(8-10)/1 or Z=(10-8)/1?',
    choices: [
      { text: 'Z=(8-10)/1=-2 — the formula always subtracts the mean FROM the data value (X-μ), giving a negative Z since 8 is below the mean; reversing it gives the wrong sign and the wrong tail entirely', isCorrect: true },
      { text: 'Z=(10-8)/1=2 — since 8 is less than the mean, subtracting the data value from the mean gives the correct standardization', isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-2` },
      { text: "Either order gives the same probability, since Φ(-2) and Φ(2) represent the same P(X<8)", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-2`],
    source: eb(NORMAL_DISTRIBUTION, 'Demonstration 2 — N(10,1)’s P(X<8) computed correctly via Z=-2 versus incorrectly via the reversed formula giving Z=2, directly breaking STANDARDIZATION-SIGN-ERROR'),
  },
  {
    conceptId: NORMAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does P(X>μ)=0.5 hold for both N(0,1) and N(0,4), even though they have very different spreads (σ=1 versus σ=2)?',
    choices: [
      { text: 'Yes — symmetry about the mean holds for ANY Normal distribution, REGARDLESS of σ; P(X>0)=0.5 in both cases, never needing separate computation for each spread', isCorrect: true },
      { text: 'No — P(X>μ)=0.5 only holds for the standard normal N(0,1); a wider distribution like N(0,4) needs a different value computed from scratch', isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-3` },
      { text: "It cannot be determined without computing the integral separately for each distribution's specific variance", isCorrect: false, misconceptionId: `${NORMAL_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${NORMAL_DISTRIBUTION}:MC-3`],
    source: eb(NORMAL_DISTRIBUTION, 'Demonstration 3 — P(X>0)=0.5 verified identically for both N(0,1) and N(0,4), regardless of spread, directly breaking SYMMETRY-FORGOTTEN'),
  },
  {
    conceptId: GENERATING_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For Bernoulli(p) with PGF G(z)=1-p+pz, G′(1)=p and G″(1)=0. Is G″(1) equal to E[X²]?',
    choices: [
      { text: 'No — G″(1)=E[X(X-1)]=E[X²]-E[X] is a FALLING FACTORIAL moment; the raw second moment requires E[X²]=G″(1)+G′(1)=0+p=p, confirmed directly since X²=X for a 0/1 variable', isCorrect: true },
      { text: 'Yes — G″(1) directly gives E[X²] for any random variable, with no further conversion needed', isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-2` },
      { text: "Yes, since differentiating twice and evaluating at z=1 is defined specifically to produce the raw second moment", isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTION}:MC-2`],
    source: eb(GENERATING_FUNCTION, 'Demonstration 1 — the Bernoulli(p) PGF check, confirming E[X²]=G″(1)+G′(1)=p, directly breaking G-PRIME-AT-1-GIVES-E[X-SQUARED]'),
  },
  {
    conceptId: GENERATING_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For independent X and Y, is G_{X+Y}(z)=G_X(z)+G_Y(z), or G_{X+Y}(z)=G_X(z)G_Y(z)?',
    choices: [
      { text: 'G_{X+Y}(z)=G_X(z)G_Y(z) — a PRODUCT: G_{X+Y}(z)=E[z^X·z^Y]=E[z^X]E[z^Y] by independence; adding the generating functions instead doesn’t even integrate to 1 (it sums to 2), so it isn’t a valid distribution', isCorrect: true },
      { text: 'G_{X+Y}(z)=G_X(z)+G_Y(z) — since PMF convolution for X+Y involves summing over probabilities, the generating functions should add correspondingly', isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-3` },
      { text: "Either the sum or the product works, since both operations preserve the essential probabilistic information about X+Y", isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTION}:MC-3`],
    source: eb(GENERATING_FUNCTION, 'Demonstration 2 — the independent-sum product rule G_{X+Y}(z)=G_X(z)G_Y(z), contrasted with the invalid, non-normalizing additive version, directly breaking INDEPENDENCE-MEANS-PGFS-ADD'),
  },
  {
    conceptId: GENERATING_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For independent X~N(μ₁,σ₁²) and Y~N(μ₂,σ₂²), M_{X+Y}(t) is computed and recognized as exactly the MGF of N(μ₁+μ₂,σ₁²+σ₂²). Does this only tell you that X+Y shares some moments with that Normal distribution?',
    choices: [
      { text: 'No — the MGF UNIQUELY determines the distribution; if M_X(t)=M_Y(t) for all t near 0, X and Y have the SAME distribution, so X+Y IS distributed as N(μ₁+μ₂,σ₁²+σ₂²) exactly, not merely sharing moments', isCorrect: true },
      { text: 'Yes — matching MGFs only guarantees that the two distributions share the same moments, not that they are the exact same distribution', isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-1` },
      { text: "Yes, since the MGF is fundamentally just a computational tool for extracting moments and carries no further distributional information", isCorrect: false, misconceptionId: `${GENERATING_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTION}:MC-1`],
    source: eb(GENERATING_FUNCTION, 'Demonstration 3 — the sum-of-independent-normals MGF derivation, using uniqueness to identify X+Y~N(μ₁+μ₂,σ₁²+σ₂²) exactly, directly breaking MGF-IS-JUST-A-TRICK-NOT-A-DISTRIBUTION-TOOL'),
  },
  {
    conceptId: POISSON_PROCESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a rate-λ Poisson process mean events arrive at regular intervals of exactly 1/λ time units?',
    choices: [
      { text: 'No — interarrival times Sᵢ~Exponential(λ) have standard deviation ALSO 1/λ (high variability); actual arrivals genuinely cluster and spread out — a deterministic process with constant spacing FAILS the independence-of-increments axiom', isCorrect: true },
      { text: 'Yes — "rate λ" means events arrive on a fixed schedule spaced exactly 1/λ time units apart', isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-1` },
      { text: "Yes, since a Poisson process is defined specifically to produce evenly-spaced, predictable arrival times", isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-1` },
    ],
    targetedMisconceptions: [`${POISSON_PROCESS}:MC-1`],
    source: eb(POISSON_PROCESS, 'Demonstration 1 — the mental simulation of 10 Exp(λ) interarrival draws, showing genuine clustering and gaps, directly breaking POISSON-PROCESS-REQUIRES-EQUALLY-SPACED-ARRIVALS'),
  },
  {
    conceptId: POISSON_PROCESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a call center receiving calls from two independent sources at 4/hr and 6/hr, does superposition require both sources to have the same rate to conclude the total is Poisson?',
    choices: [
      { text: 'No — superposition works for ANY rates, verified via the MGF argument M_{N₁+N₂}(t)=e^((λ₁+λ₂)(e^t-1)), holding regardless of whether λ₁=λ₂; the total here is Poisson(10/hr) directly', isCorrect: true },
      { text: 'Yes — superposition of independent Poisson processes only produces a Poisson result when both component processes share the same rate λ', isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-2` },
      { text: "Yes, since combining two different rates would produce some other, non-Poisson distribution for the total count", isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-2` },
    ],
    targetedMisconceptions: [`${POISSON_PROCESS}:MC-2`],
    source: eb(POISSON_PROCESS, 'Demonstration 2 — the MGF-based superposition proof applied to unequal rates λ₁=4,λ₂=6, directly breaking SUPERPOSITION-REQUIRES-SAME-RATE'),
  },
  {
    conceptId: POISSON_PROCESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a bus route with λ=12/hr, each bus going your direction with probability 0.7 (thinning), are the kept buses’ interarrival times Exponential(12) or Exponential(8.4)?',
    choices: [
      { text: 'Exponential(8.4) — the thinned process forms its OWN Poisson(λp)=Poisson(8.4/hr) process with its OWN exponential interarrival times at the NEW rate, genuinely LONGER on average than the original 1/12, never the original Exp(λ)', isCorrect: true },
      { text: 'Exponential(12) — thinning only removes some events from the original timeline, so the remaining events keep the original rate’s interarrival distribution', isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-3` },
      { text: "Exponential(12), since the underlying process generating all buses hasn't changed, only which ones you happen to observe", isCorrect: false, misconceptionId: `${POISSON_PROCESS}:MC-3` },
    ],
    targetedMisconceptions: [`${POISSON_PROCESS}:MC-3`],
    source: eb(POISSON_PROCESS, 'Demonstration 3 — the bus-route thinning example, deriving Exp(8.4/hr) interarrival times for the kept sub-process, directly breaking THINNING-CHANGES-THE-INTERARRIVAL-DISTRIBUTION'),
  },
]
