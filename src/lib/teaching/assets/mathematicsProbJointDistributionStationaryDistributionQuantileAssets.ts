/**
 * Batch: joint-distribution, stationary-distribution, quantile (math.prob).
 *
 * Continuing math.prob (29/49 -> 32/49). Fresh frontier recompute after
 * pmf/pdf/distribution's authoring found 6 ready concepts. Selected
 * joint-distribution (unlocks covariance), stationary-distribution
 * (unlocks ergodicity, closing the transition-matrix cluster), and
 * quantile (closes cdf's own remaining unlock) — leaving
 * continuous-distributions, discrete-distributions, and
 * generating-function (all terminal, no further unlocks) for a following
 * batch. Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{joint-distribution,
 * stationary-distribution,quantile}.md.
 *
 *   JOINT-DISTRIBUTION  a marginal requires GENUINELY summing/integrating
 *           across the other variable, never read directly from a single
 *           joint-table entry; the integration region must match the
 *           ACTUAL support, never constant bounds on a non-rectangular
 *           region; the two marginals ALONE never determine the joint —
 *           the joint carries additional relationship information.
 *   STATIONARY-DISTRIBUTION  π is the LONG-RUN distribution the chain
 *           converges to, never the initial distribution; detailed
 *           balance is SUFFICIENT but NEVER NECESSARY for stationarity;
 *           uniqueness needs IRREDUCIBILITY and convergence needs
 *           ERGODICITY — separate hypotheses, never automatic for every
 *           chain.
 *   QUANTILE  Q maps probabilities to values while F maps values to
 *           probabilities — INVERSE directions, never the same function;
 *           the median equals the mean ONLY for symmetric distributions,
 *           never universally; the infimum definition handles discrete
 *           distributions directly, never requiring a smooth CDF.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const JOINT_DISTRIBUTION = 'math.prob.joint-distribution'
const STATIONARY_DISTRIBUTION = 'math.prob.stationary-distribution'
const QUANTILE = 'math.prob.quantile'

export const MATHEMATICS_PROB_JOINT_DISTRIBUTION_STATIONARY_DISTRIBUTION_QUANTILE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: JOINT_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A MARGINAL PROBABILITY REQUIRES GENUINELY SUMMING ACROSS THE WHOLE ROW — NEVER READ FROM A '
      + 'SINGLE CELL: for two fair dice with joint PMF p(x,y)=1/36: P(X=3)=Σ_{y=1}^6 p(3,y)='
      + 'Σ_{y=1}^6(1/36)=6/36=1/6 — summing the joint PMF across ALL 6 possible values of Y for '
      + 'the fixed row x=3. This answer matches the known single-die fact P(X=3)=1/6, but it was '
      + 'NEVER read directly off any single entry of the joint table — it REQUIRED summing across '
      + 'the entire row, never a shortcut.\n\n'
      + 'THE INTEGRATION REGION MUST MATCH THE ACTUAL SUPPORT — NEVER CONSTANT BOUNDS ON A '
      + 'NON-RECTANGULAR SUPPORT: for the joint PDF f(x,y)=2 on the TRIANGULAR region 0≤x≤y≤1: '
      + 'the marginal PDF of X is f_X(x)=∫ₓ¹2 dy=2(1-x) for 0≤x≤1 — integrating y from x TO 1 '
      + '(the ACTUAL, x-DEPENDENT range where the joint PDF is nonzero), NEVER from a fixed '
      + 'constant like 0 to 1 regardless of x. Using constant bounds on a support that is '
      + 'genuinely triangular would integrate over regions where f(x,y)=0, giving a WRONG '
      + 'marginal.\n\n'
      + 'THE MARGINAL LOOKS DIFFERENT FROM THE JOINT — AND MARGINALS ALONE NEVER DETERMINE THE '
      + 'JOINT: the marginal f_X(x)=2(1-x) is a genuinely DIFFERENT-LOOKING function from the '
      + 'joint PDF’s CONSTANT value f(x,y)=2 — "derived from" the joint never means "identical in '
      + 'form to" the joint. Nor do the two marginals TOGETHER determine the full joint '
      + 'distribution — the joint can carry ADDITIONAL information about how X and Y RELATE '
      + '(their covariance/dependence structure) that neither marginal alone reveals; knowing '
      + 'both marginals is NEVER sufficient to reconstruct the joint.',
    targetedMisconceptions: [`${JOINT_DISTRIBUTION}:MC-1`, `${JOINT_DISTRIBUTION}:MC-2`, `${JOINT_DISTRIBUTION}:MC-3`],
    source: eb(JOINT_DISTRIBUTION, 'Core Understanding — a marginal requiring genuine summation/integration across the other variable never a single cell, integration bounds matching the actual support shape, and the two marginals alone never determining the full joint distribution'),
  },
  {
    conceptId: STATIONARY_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'π IS THE LONG-RUN DISTRIBUTION THE CHAIN CONVERGES TO — NEVER THE INITIAL DISTRIBUTION: '
      + 'for a weather chain starting Sunny (π₀=[1,0,0]): after many steps, π₀·Pⁿ→π — the '
      + 'STATIONARY distribution, generally DIFFERENT from [1,0,0] unless the chain happens to '
      + 'already start there. "Stationary" means unchanged by ONE MORE STEP (πP=π), never "fixed '
      + 'from the start" — for an ergodic chain, ANY starting distribution eventually converges '
      + 'to the SAME π, regardless of where it began.\n\n'
      + 'DETAILED BALANCE IS SUFFICIENT, NEVER NECESSARY, FOR STATIONARITY: if πᵢPᵢⱼ=πⱼPⱼᵢ for '
      + 'ALL pairs (flows between i and j cancel in both directions), then π IS stationary: '
      + 'ΣᵢπᵢPᵢⱼ=ΣᵢπⱼPⱼᵢ=πⱼΣᵢPⱼᵢ=πⱼ. But the CONVERSE fails: a 3-cycle chain (1→2→3→1 with '
      + 'probability 1) has stationary distribution π=[1/3,1/3,1/3], yet VIOLATES detailed '
      + 'balance (flux 1→2=1/3, flux 2→1=0, genuinely unequal) — this chain has "probability '
      + 'currents" flowing in one direction, stationary WITHOUT being reversible.\n\n'
      + 'UNIQUENESS AND CONVERGENCE EACH HAVE THEIR OWN, SEPARATE HYPOTHESES: uniqueness of π '
      + 'holds ONLY for IRREDUCIBLE chains — a REDUCIBLE chain with closed classes C₁,C₂ has '
      + 'infinitely many stationary distributions (any convex combination of each class’s own '
      + 'stationary distribution). Separately, even for an irreducible chain, if it is PERIODIC '
      + '(period d≥2), a unique stationary distribution STILL EXISTS, but the chain does NOT '
      + 'converge to it — it oscillates forever instead. Only ERGODIC chains (irreducible + '
      + 'aperiodic + positive recurrent) both have a unique π AND actually converge to it.',
    targetedMisconceptions: [`${STATIONARY_DISTRIBUTION}:MC-1`, `${STATIONARY_DISTRIBUTION}:MC-2`, `${STATIONARY_DISTRIBUTION}:MC-3`],
    source: eb(STATIONARY_DISTRIBUTION, 'Core Understanding — π as the long-run distribution never the initial one, detailed balance as sufficient never necessary for stationarity, and uniqueness/convergence each requiring their own separate hypotheses'),
  },
  {
    conceptId: QUANTILE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Q MAPS PROBABILITIES TO VALUES; F MAPS VALUES TO PROBABILITIES — INVERSE DIRECTIONS, NEVER '
      + 'THE SAME FUNCTION: for X~Exponential(λ): F(x)=1-e^(-λx). Setting F(x)=p: '
      + 'x=-ln(1-p)/λ=Q(p). Median=Q(0.5)=ln2/λ≈0.693/λ, while mean=1/λ>ln2/λ — mean exceeds '
      + 'median, confirming right-skew. If F(5)=0.7, then Q(0.7)=5: F answers "what’s the '
      + 'probability of being ≤5?"; Q answers "what value has 70% of the distribution below it?" '
      + '— genuinely inverse questions.\n\n'
      + 'THE MEDIAN EQUALS THE MEAN ONLY FOR SYMMETRIC DISTRIBUTIONS, NEVER UNIVERSALLY: for '
      + 'X~Uniform(0,1): F(x)=x, so Q(p)=p, median=0.5=mean — they coincide because Uniform is '
      + 'symmetric. But for the Exponential above, mean≠median — skewed distributions routinely '
      + 'have mean≠median, and the Normal distribution’s mean-equals-median property (often the '
      + 'first example encountered) is a special case of symmetry, never a universal fact about '
      + 'all distributions.\n\n'
      + 'THE INFIMUM DEFINITION HANDLES DISCRETE DISTRIBUTIONS DIRECTLY, NEVER REQUIRING A SMOOTH '
      + 'CDF: for X~Bernoulli(0.3): F(0)=0.7, F(1)=1. Q(0.5)=inf{x:F(x)≥0.5}=0 (since F(0)=0.7≥0.5 '
      + 'already) — the median is 0, the distribution’s mode, computed directly from the infimum '
      + 'definition without any need for F to be continuous or strictly increasing.',
    targetedMisconceptions: [`${QUANTILE}:MC-1`, `${QUANTILE}:MC-2`, `${QUANTILE}:MC-3`],
    source: eb(QUANTILE, 'Core Understanding — Q and F as inverse-direction mappings never the same function, the median equaling the mean only for symmetric distributions never universally, and the infimum definition handling discrete distributions directly without requiring continuity'),
  },
]

export const MATHEMATICS_PROB_JOINT_DISTRIBUTION_STATIONARY_DISTRIBUTION_QUANTILE_PROBES: SeedProbe[] = [
  {
    conceptId: JOINT_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For two fair dice with joint PMF p(x,y)=1/36, can P(X=3) be read directly from a single entry of the joint table?',
    choices: [
      { text: 'No — P(X=3)=Σ_{y=1}^6 p(3,y)=6/36=1/6 requires GENUINELY summing the joint PMF across ALL 6 values of Y for the fixed row x=3, never a single-cell shortcut', isCorrect: true },
      { text: 'Yes — any single entry p(3,y) in row x=3 already gives the correct marginal probability P(X=3) directly', isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-1` },
      { text: "Yes, since p(3,1)=1/36 happens to match part of the answer, that single value can be used directly as P(X=3)", isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${JOINT_DISTRIBUTION}:MC-1`],
    source: eb(JOINT_DISTRIBUTION, 'Demonstration 1 — the two-dice joint PMF’s row-sum marginal computation for P(X=3), directly breaking MARGINAL-READ-DIRECTLY-FROM-JOINT-ENTRY'),
  },
  {
    conceptId: JOINT_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the joint PDF f(x,y)=2 on the triangular region 0≤x≤y≤1, should the marginal f_X(x) be computed by integrating y from 0 to 1 (constant bounds), or from x to 1?',
    choices: [
      { text: 'From x to 1 — f_X(x)=∫ₓ¹2 dy=2(1-x), using the ACTUAL x-DEPENDENT range where the joint PDF is nonzero; constant bounds would integrate over regions where f(x,y)=0, giving a WRONG marginal', isCorrect: true },
      { text: 'From 0 to 1 — the same constant bounds always apply regardless of whether the joint support is rectangular or triangular', isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-2` },
      { text: "It doesn't matter which bounds are used, since integrating a constant function of 2 gives the same result either way", isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${JOINT_DISTRIBUTION}:MC-2`],
    source: eb(JOINT_DISTRIBUTION, 'Demonstration 2 — the triangular-support joint PDF’s x-dependent marginal integration f_X(x)=2(1-x), directly breaking JOINT-PDF-INTEGRATION-REGION-MISIDENTIFIED'),
  },
  {
    conceptId: JOINT_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If you know both marginal distributions of X and Y, do you have enough information to reconstruct the full joint distribution of (X,Y)?',
    choices: [
      { text: 'No — the marginals describe each variable in isolation, but the joint can carry ADDITIONAL information about how X and Y RELATE (their dependence structure) that neither marginal alone reveals', isCorrect: true },
      { text: 'Yes — the two marginal distributions together always fully determine the joint distribution of (X,Y)', isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-3` },
      { text: "Yes, since the joint distribution is simply derived from combining the two marginals with no additional information needed", isCorrect: false, misconceptionId: `${JOINT_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${JOINT_DISTRIBUTION}:MC-3`],
    source: eb(JOINT_DISTRIBUTION, 'Demonstration 3 — the marginal-versus-joint shape contrast foreshadowing covariance, directly breaking JOINT-DISTRIBUTION-ASSUMED-DETERMINED-BY-MARGINALS-ALONE'),
  },
  {
    conceptId: STATIONARY_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a weather chain starting Sunny (π₀=[1,0,0]), is π₀ itself the chain’s stationary distribution?',
    choices: [
      { text: 'Not necessarily — π is the LONG-RUN distribution the chain converges to (π₀·Pⁿ→π as n grows), generally DIFFERENT from the starting distribution unless the chain happens to already start at π', isCorrect: true },
      { text: 'Yes — the stationary distribution π is by definition the distribution the chain starts in at time 0', isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-1` },
      { text: "Yes, since 'stationary' means fixed from the beginning, so whatever the initial distribution is must be the stationary one", isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${STATIONARY_DISTRIBUTION}:MC-1`],
    source: eb(STATIONARY_DISTRIBUTION, 'Demonstration 1 — the weather chain converging from [1,0,0] toward π over many steps, directly breaking STATIONARY-DISTRIBUTION-IS-THE-INITIAL-DISTRIBUTION'),
  },
  {
    conceptId: STATIONARY_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a 3-cycle chain (1→2→3→1 with probability 1) with stationary distribution π=[1/3,1/3,1/3], must this π satisfy detailed balance (πᵢPᵢⱼ=πⱼPⱼᵢ)?',
    choices: [
      { text: 'No — this π is stationary yet VIOLATES detailed balance (flux 1→2=1/3, flux 2→1=0, genuinely unequal); detailed balance is SUFFICIENT but NEVER NECESSARY for stationarity, since this chain has directional probability currents', isCorrect: true },
      { text: 'Yes — any distribution that is stationary must also satisfy detailed balance, since that is the definition of stationarity', isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-2` },
      { text: "Yes, since detailed balance is a required property that every stationary distribution must exhibit", isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${STATIONARY_DISTRIBUTION}:MC-2`],
    source: eb(STATIONARY_DISTRIBUTION, 'Demonstration 2 — the 3-cycle chain’s π=[1/3,1/3,1/3], stationary yet violating detailed balance, directly breaking DETAILED-BALANCE-IS-REQUIRED-FOR-STATIONARITY'),
  },
  {
    conceptId: STATIONARY_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every Markov chain have exactly one stationary distribution?',
    choices: [
      { text: 'No — a REDUCIBLE chain with closed classes has infinitely many stationary distributions, and even an irreducible but PERIODIC chain has a unique π that the chain never actually converges to; uniqueness needs irreducibility, convergence needs ergodicity, separate hypotheses', isCorrect: true },
      { text: 'Yes — every Markov chain, regardless of its structure, has exactly one unique stationary distribution that it converges to', isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-3` },
      { text: "Yes, since the balance equations πP=π always have exactly one solution for any transition matrix P", isCorrect: false, misconceptionId: `${STATIONARY_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${STATIONARY_DISTRIBUTION}:MC-3`],
    source: eb(STATIONARY_DISTRIBUTION, 'Demonstration 3 — a reducible chain’s multiple stationary distributions versus a periodic chain’s unique-but-non-convergent one, directly breaking EVERY-CHAIN-HAS-A-UNIQUE-STATIONARY-DISTRIBUTION'),
  },
  {
    conceptId: QUANTILE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If F(5)=0.7 for some random variable X, what is Q(0.7)?',
    choices: [
      { text: 'Q(0.7)=5 — F and Q are INVERSE directions of the same relationship; F answers "probability of being ≤5," while Q(0.7) answers "what value has 70% of the distribution below it," and here that value is 5', isCorrect: true },
      { text: 'Q(0.7)=F(0.7) — Q and F are simply the same function evaluated at the same input', isCorrect: false, misconceptionId: `${QUANTILE}:MC-1` },
      { text: "Q(0.7) cannot be determined from F(5)=0.7 alone; they describe unrelated properties of X", isCorrect: false, misconceptionId: `${QUANTILE}:MC-1` },
    ],
    targetedMisconceptions: [`${QUANTILE}:MC-1`],
    source: eb(QUANTILE, 'Demonstration 1 — the F(5)=0.7⇒Q(0.7)=5 inverse-direction check, directly breaking QUANTILE-IS-THE-CDF'),
  },
  {
    conceptId: QUANTILE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X~Exponential(λ) with median=ln2/λ≈0.693/λ and mean=1/λ, does the median equal the mean?',
    choices: [
      { text: 'No — mean=1/λ>ln2/λ=median, since Exponential is right-skewed; the median equals the mean ONLY for symmetric distributions like Uniform or Normal, never universally across all distributions', isCorrect: true },
      { text: 'Yes — the median always equals the mean for every probability distribution, just as it does for the Normal distribution', isCorrect: false, misconceptionId: `${QUANTILE}:MC-2` },
      { text: "Yes, since Q(0.5) is defined specifically to always coincide with E[X] for any distribution", isCorrect: false, misconceptionId: `${QUANTILE}:MC-2` },
    ],
    targetedMisconceptions: [`${QUANTILE}:MC-2`],
    source: eb(QUANTILE, 'Demonstration 2 — Exponential’s median ln2/λ versus mean 1/λ, a genuine mean-median gap, directly breaking MEDIAN-ALWAYS-EQUALS-MEAN'),
  },
  {
    conceptId: QUANTILE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For X~Bernoulli(0.3) with F(0)=0.7 and F(1)=1, can the median Q(0.5) be computed, even though F is not continuous or strictly increasing?',
    choices: [
      { text: 'Yes — Q(0.5)=inf{x:F(x)≥0.5}=0, since F(0)=0.7≥0.5 already; the infimum definition handles discrete distributions directly, with no requirement that F be continuous or strictly increasing', isCorrect: true },
      { text: 'No — quantiles are only defined for continuous distributions with a smooth, strictly increasing CDF, so Q(0.5) is undefined here', isCorrect: false, misconceptionId: `${QUANTILE}:MC-3` },
      { text: "No, since a discrete distribution's step-function CDF cannot be inverted to produce a well-defined quantile", isCorrect: false, misconceptionId: `${QUANTILE}:MC-3` },
    ],
    targetedMisconceptions: [`${QUANTILE}:MC-3`],
    source: eb(QUANTILE, 'Demonstration 3 — Bernoulli(0.3)’s median computed directly via the infimum definition, with no continuity required, directly breaking QUANTILE-IS-ONLY-DEFINED-FOR-CONTINUOUS-DISTRIBUTIONS'),
  },
]
