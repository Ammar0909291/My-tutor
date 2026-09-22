/**
 * Batch: sample-space, linearity-expectation, standard-deviation (math.prob).
 *
 * Continues the math.prob domain opened in Batch 96. math.prob.sample-space
 * (requires math.found.set-theory, already authored) unlocks probability-
 * axioms, the sole remaining unlock-bearing candidate in this batch.
 * math.prob.linearity-expectation and math.prob.standard-deviation (both
 * requiring already-authored concepts) are leaf nodes but foundational
 * sibling concepts — natural companions to expected-value and variance,
 * both authored in Batch 96.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{sample-space,
 * linearity-expectation,standard-deviation}.md.
 *
 *   SAMPLE-SPACE  sample-space — Ω is a genuine SET, never merely an
 *             informal list (its set structure is what makes complement,
 *             union, and intersection well-defined); Ω can be finite,
 *             countably infinite, or uncountable — probability works for
 *             ALL three, never limited to finite cases; the SAME experiment
 *             can have DIFFERENT valid sample spaces depending on the
 *             question, never fixed uniquely by the physical action alone.
 *   LINEARITY-EXPECTATION  linearity-expectation — E[aX+bY]=aE[X]+bE[Y]
 *             holds regardless of DEPENDENCE, independence is NEVER
 *             required (only the product rule E[XY]=E[X]E[Y] needs it);
 *             the indicator-variable technique sidesteps the joint
 *             distribution entirely; linearity applies ONLY to linear
 *             functions — E[f(X)]=f(E[X]) is FALSE for general nonlinear f.
 *   STANDARD-DEVIATION  standard-deviation — SD returns units to the
 *             ORIGINAL scale while variance stays in squared units, never
 *             interchangeable; a SHIFT never changes SD, only a SCALE does
 *             (by the absolute value of the factor); SD is
 *             √E[(X−μ)²], never E[|X−μ|] (the mean absolute deviation) —
 *             genuinely different statistics.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SAMPLE_SPACE = 'math.prob.sample-space'
const LINEARITY_EXPECTATION = 'math.prob.linearity-expectation'
const STANDARD_DEVIATION = 'math.prob.standard-deviation'

export const MATHEMATICS_PROB_SAMPLE_SPACE_LINEARITY_EXPECTATION_STANDARD_DEVIATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SAMPLE_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Ω IS A GENUINE SET, NOT MERELY AN INFORMAL LIST: the sample space Ω collects every '
      + 'possible outcome of a random experiment, with each element ω∈Ω an elementary outcome. '
      + 'Because Ω is a set, every set-theoretic tool applies directly: an event is a subset '
      + 'A⊆Ω, its complement Aᶜ=Ω\\A is always well-defined, and P(Aᶜ)=1−P(A) works ONLY because '
      + 'this complement is genuinely well-defined via set subtraction — a mere "list" of '
      + 'outcomes has no such guaranteed complement.\n\n'
      + 'Ω CAN BE FINITE, COUNTABLY INFINITE, OR UNCOUNTABLE — PROBABILITY WORKS FOR ALL THREE: '
      + 'a coin flip gives finite Ω={H,T}; rolling a die until the first 6 gives countably '
      + 'infinite Ω={1,2,3,...}=ℕ; picking a uniform random real in [0,1] gives uncountable '
      + 'Ω=[0,1]. For uncountable Ω, P({ω})=0 for any single outcome ω — NOT a contradiction, '
      + 'since probabilities are assigned to EVENTS (measurable subsets), not individual points: '
      + 'P([0,0.5])=0.5 even though every single point has probability exactly 0.\n\n'
      + 'THE SAME EXPERIMENT CAN HAVE DIFFERENT VALID SAMPLE SPACES, DEPENDING ON THE QUESTION: '
      + 'rolling one die can have Ω={1,2,3,4,5,6} (if the exact number matters) or '
      + 'Ω={even,odd} (if only parity matters) — both are genuinely valid, chosen to match the '
      + 'level of detail the question requires, never fixed uniquely by the physical action '
      + 'alone.',
    targetedMisconceptions: [`${SAMPLE_SPACE}:MC-1`, `${SAMPLE_SPACE}:MC-2`, `${SAMPLE_SPACE}:MC-3`],
    source: eb(SAMPLE_SPACE, 'Core Understanding — the sample space as a genuine set never merely an informal list, probability working for finite/countably-infinite/uncountable sample spaces alike, and the same experiment admitting different valid sample spaces depending on the question'),
  },
  {
    conceptId: LINEARITY_EXPECTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'LINEARITY OF EXPECTATION HOLDS REGARDLESS OF DEPENDENCE — INDEPENDENCE IS NEVER '
      + 'REQUIRED: E[X+Y]=E[X]+E[Y] ALWAYS, proven directly from the joint-distribution sum with '
      + 'no independence assumption used anywhere. For a coin flip X (1 if heads, 0 if tails) '
      + 'and Y=1−X (perfectly, negatively DEPENDENT on X): E[X+Y]=E[1]=1=E[X]+E[Y]=½+½ — '
      + 'linearity holds even for perfectly dependent variables.\n\n'
      + 'THE INDICATOR-VARIABLE TECHNIQUE SIDESTEPS THE JOINT DISTRIBUTION ENTIRELY: for the '
      + 'hat-check problem (n people, hats returned randomly, X=number who receive their own '
      + 'hat), letting Xᵢ=1 if person i gets their own hat: E[Xᵢ]=1/n, so E[X]=∑E[Xᵢ]=n·(1/n)=1 '
      + '— regardless of n, and regardless of whether the Xᵢ are independent (they are NOT). '
      + 'Linearity never cares about the joint structure; only the individual expectations '
      + 'matter.\n\n'
      + 'LINEARITY IS SPECIFICALLY ABOUT LINEAR COMBINATIONS — E[f(X)]=f(E[X]) IS FALSE FOR '
      + 'GENERAL f: E[aX+b]=aE[X]+b holds because aX+b is LINEAR (degree 1). But E[X²]≠(E[X])² '
      + 'in general — for X=0 or 2 equally likely: E[X]=1, (E[X])²=1, but E[X²]=(0+4)/2=2≠1. '
      + "Jensen's inequality captures the direction for convex f (like x²): E[f(X)]≥f(E[X]), "
      + 'with the gap E[X²]−(E[X])² being EXACTLY Var(X)≥0 — never zero unless X is constant.',
    targetedMisconceptions: [`${LINEARITY_EXPECTATION}:MC-1`, `${LINEARITY_EXPECTATION}:MC-2`, `${LINEARITY_EXPECTATION}:MC-3`],
    source: eb(LINEARITY_EXPECTATION, 'Core Understanding — linearity of expectation holding regardless of dependence with independence never required, the indicator-variable technique sidestepping the joint distribution, and linearity applying only to linear functions never general nonlinear f'),
  },
  {
    conceptId: STANDARD_DEVIATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'SD RETURNS UNITS TO THE ORIGINAL SCALE — VARIANCE DOES NOT: for exam scores with '
      + 'Var(X)=100 (units: points²), SD(X)=√100=10 (units: points) — a score of 80 is exactly '
      + '1 SD above a mean of 70, a directly interpretable statement. "Variance is 100 points '
      + 'squared above the mean" is not a meaningful sentence; SD exists precisely to restore '
      + 'an interpretable unit.\n\n'
      + 'A SHIFT NEVER CHANGES SD; ONLY A SCALE DOES, BY THE ABSOLUTE VALUE OF THE FACTOR: for '
      + 'X~Uniform{1,2,3,4,5}, E[X]=3, Var(X)=2, SD(X)=√2≈1.41. Let Y=2X−3: '
      + 'SD(Y)=|2|·SD(X)=2√2≈2.83, while E[Y]=2(3)−3=3. Checking directly, Y∈{−1,1,3,5,7} — '
      + "visibly twice as spread out as X's values, confirming the scaling factor multiplies "
      + 'spread while the −3 shift (which did move the mean) left the spread itself untouched.\n\n'
      + 'SD IS √E[(X−μ)²], NEVER E[|X−μ|] — THE TWO ARE DIFFERENT STATISTICS: mean absolute '
      + 'deviation (MAD) averages the absolute deviations directly; SD squares first, averages, '
      + 'then square-roots. These are genuinely different numbers for the same distribution — SD '
      + 'is not simply "a more precise name for" MAD, and the formulas are not interchangeable.',
    targetedMisconceptions: [`${STANDARD_DEVIATION}:MC-1`, `${STANDARD_DEVIATION}:MC-2`, `${STANDARD_DEVIATION}:MC-3`],
    source: eb(STANDARD_DEVIATION, 'Core Understanding — standard deviation returning units to the original scale unlike variance, a shift never changing SD while a scale multiplies it by the absolute value of the factor, and SD being the square root of the average squared deviation never the mean absolute deviation'),
  },
]

export const MATHEMATICS_PROB_SAMPLE_SPACE_LINEARITY_EXPECTATION_STANDARD_DEVIATION_PROBES: SeedProbe[] = [
  {
    conceptId: SAMPLE_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a coin flip with Ω={H,T}, why does P(Aᶜ)=1−P(A) work for the event A={H}?',
    choices: [
      { text: 'Because Ω is a genuine SET, so Aᶜ=Ω\\A={T} is well-defined via set subtraction — a mere informal "list" of outcomes has no such guaranteed complement operation', isCorrect: true },
      { text: 'Because Ω is simply an informal list of outcomes, and any list automatically supports a "the rest of the list" operation without further structure', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-1` },
      { text: 'Because probability rules like P(Aᶜ)=1−P(A) are true by definition regardless of what kind of mathematical object Ω actually is', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${SAMPLE_SPACE}:MC-1`],
    source: eb(SAMPLE_SPACE, 'Demonstration 1 — for Omega={H,T}, the event A={H} and its complement A^c=Omega\\{H}={T} computed via set subtraction, directly breaking sample-space-outcomes-labeled'),
  },
  {
    conceptId: SAMPLE_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Rolling a die repeatedly until the first 6 appears gives Ω={1,2,3,...} (countably infinite). Is probability still fully defined here, or must Ω always be finite?',
    choices: [
      { text: 'Probability is fully defined here — Ω need not be finite; a countably infinite sample space (like this geometric-distribution setup) or even an uncountable one works just as validly as a finite Ω', isCorrect: true },
      { text: 'Probability only works for finite sample spaces, so this countably infinite Ω is not a valid setup for assigning probabilities', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-2` },
      { text: 'This scenario would need to be artificially truncated to some large finite number of rolls before probability could be meaningfully applied', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${SAMPLE_SPACE}:MC-2`],
    source: eb(SAMPLE_SPACE, 'Demonstration 2 — rolling a die until the first 6 giving countably infinite Omega with probability fully defined, directly breaking sample-space-must-be-finite'),
  },
  {
    conceptId: SAMPLE_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Rolling one die can use Ω={1,2,3,4,5,6} or Ω={even,odd}. Is there only one correct sample space for this experiment?',
    choices: [
      { text: 'No — both are genuinely valid sample spaces for the identical physical roll, chosen to match the level of detail the specific question requires, never fixed uniquely by the experiment alone', isCorrect: true },
      { text: 'Yes — a given physical experiment has exactly one correct sample space, and any other proposed set of outcomes must be an error', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-3` },
      { text: 'Yes, since Ω is uniquely determined by the physical mechanism of the experiment itself, independent of what question is being asked', isCorrect: false, misconceptionId: `${SAMPLE_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${SAMPLE_SPACE}:MC-3`],
    source: eb(SAMPLE_SPACE, 'Demonstration 3 — one die roll validly using either Omega={1,...,6} or Omega={even,odd} depending on the question, directly breaking sample-space-unique'),
  },
  {
    conceptId: LINEARITY_EXPECTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a coin flip X (1 if heads, 0 if tails) and Y=1−X (perfectly dependent on X), does E[X+Y]=E[X]+E[Y] still hold, given that X and Y are dependent?',
    choices: [
      { text: 'Yes — linearity of expectation holds regardless of dependence; E[X+Y]=E[1]=1=E[X]+E[Y]=½+½, confirming the additive rule requires NO independence assumption anywhere', isCorrect: true },
      { text: 'No — E[X+Y]=E[X]+E[Y] only holds when X and Y are independent, so this formula cannot be applied to this perfectly dependent pair', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-1` },
      { text: 'No, since dependent random variables require an entirely different, more complex formula to compute the expectation of their sum', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEARITY_EXPECTATION}:MC-1`],
    source: eb(LINEARITY_EXPECTATION, 'Demonstration 1 — X and Y=1-X perfectly dependent yet E[X+Y]=E[X]+E[Y] confirmed, directly breaking linearity-requires-independence'),
  },
  {
    conceptId: LINEARITY_EXPECTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is E[XY]=E[X]E[Y] always true for any two random variables, the same way E[X+Y]=E[X]+E[Y] always is?',
    choices: [
      { text: 'No — plus distributes through E always regardless of dependence, but times (the product rule E[XY]=E[X]E[Y]) requires INDEPENDENCE; confusing the two rules applies the product rule where it does not hold', isCorrect: true },
      { text: 'Yes — both the additive rule and the multiplicative rule for expectation hold universally for any random variables, with no conditions required for either', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-2` },
      { text: 'Yes, since both rules follow directly from the same underlying linearity property of the expectation operator', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEARITY_EXPECTATION}:MC-2`],
    source: eb(LINEARITY_EXPECTATION, 'Demonstration 2/memory rule — plus distributes through E always, times only when independent, directly breaking E[XY]=E[X]E[Y]-always'),
  },
  {
    conceptId: LINEARITY_EXPECTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For X equal to 0 or 2 with equal probability, is E[X²]=(E[X])²?',
    choices: [
      { text: 'No — E[X]=1 so (E[X])²=1, but E[X²]=(0+4)/2=2≠1; linearity applies ONLY to linear functions (like aX+b), and E[f(X)]=f(E[X]) is FALSE for the nonlinear f(x)=x²', isCorrect: true },
      { text: 'Yes — E[f(X)]=f(E[X]) holds for any function f, linear or not, since expectation always distributes through function application', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-3` },
      { text: 'Yes, since squaring is just a special case of a linear operation on a random variable, so the linearity rule extends to it directly', isCorrect: false, misconceptionId: `${LINEARITY_EXPECTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEARITY_EXPECTATION}:MC-3`],
    source: eb(LINEARITY_EXPECTATION, 'Demonstration 3 — X=0 or 2 equally likely giving E[X^2]=2 not equal to (E[X])^2=1, directly breaking linearity-applies-to-nonlinear-functions'),
  },
  {
    conceptId: STANDARD_DEVIATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Exam scores have Var(X)=100 (points²). Are variance and standard deviation just two names for the same number?',
    choices: [
      { text: 'No — SD(X)=√100=10 points, a genuinely different number in different (original, not squared) units; a score of 80 is "1 SD above a mean of 70," a directly interpretable statement variance alone cannot give', isCorrect: true },
      { text: 'Yes — variance and standard deviation are interchangeable terms that both refer to the identical numerical measure of spread', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-1` },
      { text: 'Yes, since "100 points squared above the mean" and "10 points above the mean" describe the same underlying quantity just phrased differently', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-1` },
    ],
    targetedMisconceptions: [`${STANDARD_DEVIATION}:MC-1`],
    source: eb(STANDARD_DEVIATION, 'Demonstration 1 — exam scores with Var=100 points-squared versus SD=10 points, only SD giving an interpretable statement, directly breaking SD-and-variance-are-interchangeable'),
  },
  {
    conceptId: STANDARD_DEVIATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If every value in a dataset increases by 5 (a constant shift), does the standard deviation change?',
    choices: [
      { text: 'No — Var(X+b)=E[(X+b−(μ+b))²]=E[(X−μ)²]=Var(X), the b cancels exactly; a shift never changes SD, since it moves every value (and the mean) by the same amount, leaving spread untouched', isCorrect: true },
      { text: 'Yes — since E[X+5]=E[X]+5 shifts the mean, the standard deviation must shift by the same amount as well', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-2` },
      { text: 'Yes, because any additive change applied to every value in a dataset always propagates identically to every summary statistic computed from it', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-2` },
    ],
    targetedMisconceptions: [`${STANDARD_DEVIATION}:MC-2`],
    source: eb(STANDARD_DEVIATION, 'Demonstration 2 — deriving Var(X+b)=Var(X) directly showing the shift b cancels, directly breaking adding-constant-changes-SD'),
  },
  {
    conceptId: STANDARD_DEVIATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is standard deviation the same thing as the mean absolute deviation (the average distance from the mean)?',
    choices: [
      { text: 'No — SD is √E[(X−μ)²] (squares first, averages, then square-roots), while MAD is E[|X−μ|] (averages absolute deviations directly); these are genuinely different statistics that produce different numbers for the same distribution', isCorrect: true },
      { text: 'Yes — standard deviation is simply a more precise name for the average absolute distance of values from the mean', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-3` },
      { text: 'Yes, since both formulas measure "spread" and are mathematically interchangeable ways of expressing the identical computation', isCorrect: false, misconceptionId: `${STANDARD_DEVIATION}:MC-3` },
    ],
    targetedMisconceptions: [`${STANDARD_DEVIATION}:MC-3`],
    source: eb(STANDARD_DEVIATION, 'Demonstration 3 — side-by-side computation of SD and MAD on the same dataset producing two different numbers, directly breaking SD-is-the-average-deviation'),
  },
]
