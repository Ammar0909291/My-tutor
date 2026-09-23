/**
 * Batch: cdf, discrete-rv, continuous-rv (math.prob).
 *
 * Continuing math.prob (23/49 -> 26/49). Fresh frontier recompute after
 * random-variable's authoring found 4 ready concepts. Selected cdf
 * (unlocks quantile), discrete-rv (unlocks pmf + discrete-distributions),
 * and continuous-rv (unlocks pdf + continuous-distributions) — the three
 * highest-value picks, each opening further downstream concepts; leaving
 * stationary-distribution (unlocks ergodicity, a smaller markov-chain-only
 * cluster) for a following batch. Transcribed from the frozen Educational
 * Brain entries at educational-brain/concepts/mathematics/math.prob.{cdf,
 * discrete-rv,continuous-rv}.md.
 *
 *   CDF  F(x)=P(X≤x) accumulates probability, forcing NON-DECREASE and
 *           RIGHT-CONTINUITY; discrete RVs use SUMMATION of the PMF while
 *           continuous RVs use INTEGRATION of the PDF, the SAME definition
 *           with different machinery; P(X<b) and P(X≤b) genuinely differ
 *           only when X has an ATOM at the boundary, never in general.
 *   DISCRETE-RV  the PMF p(x)=P(X=x) must satisfy Σp(xᵢ)=1 EXACTLY, forced
 *           by the probability axioms, never optional; the SUPPORT is
 *           where p(x)>0, never the PMF's full domain ℝ (the PMF is
 *           defined everywhere, zero outside the support); the PMF and CDF
 *           are DIFFERENT objects computing different things, never
 *           interchangeable.
 *   CONTINUOUS-RV  probability is AREA under the density, never the
 *           density value itself, so P(X=c)=0 for EVERY single value c;
 *           f(x) CAN EXCEED 1 (only non-negativity and total-integral-1
 *           constrain it); the CDF and PDF are related by integration/
 *           differentiation, never interchangeable.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CDF = 'math.prob.cdf'
const DISCRETE_RV = 'math.prob.discrete-rv'
const CONTINUOUS_RV = 'math.prob.continuous-rv'

export const MATHEMATICS_PROB_CDF_DISCRETE_RV_CONTINUOUS_RV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CDF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE CDF ACCUMULATES PROBABILITY UP TO x, FORCING NON-DECREASE AND RIGHT-CONTINUITY: '
      + 'F(x)=P(X≤x) means, as x grows, the event {X≤x} only GROWS (never shrinks), so its '
      + 'probability cannot decrease — a decreasing "CDF" is definitionally impossible. For a fair '
      + 'coin encoded X=0,1: F(x)=0 for x<0, F(x)=1/2 for 0≤x<1, F(x)=1 for x≥1 — non-decreasing '
      + 'throughout, and right-continuous at x=0 (the value F(0)=1/2 matches the limit from the '
      + 'right, not the left, which is 0).\n\n'
      + 'DISCRETE USES SUMMATION, CONTINUOUS USES INTEGRATION — THE SAME DEFINITION, DIFFERENT '
      + 'MACHINERY: for discrete X with PMF p(k): F(x)=Σ_{k≤x}p(k), a step function. For '
      + 'continuous X with PDF f(t): F(x)=∫_{-∞}^x f(t)dt, a smooth curve — e.g. uniform on [0,2] '
      + 'gives F(x)=x/2 for 0≤x≤2. Both compute the identical quantity P(X≤x); only the '
      + 'aggregation method (sum versus integral) differs, reusing math.prob.random-variable’s own '
      + 'discrete/continuous distinction directly.\n\n'
      + 'THE STRICT-VERSUS-NON-STRICT DISTINCTION MATTERS PRECISELY WHEN X HAS AN ATOM AT THE '
      + 'BOUNDARY: for the coin-flip X, F(1)=P(X≤1)=1 (both outcomes included), but P(X<1) '
      + 'EXCLUDES X=1, leaving only X=0, so P(X<1)=1/2≠F(1)=1 — genuinely different. For a '
      + 'CONTINUOUS X (uniform on [0,2]): P(X<1.5) and P(X≤1.5)=F(1.5)=0.75 ARE equal, since '
      + 'P(X=1.5)=0 for continuous random variables. The gap between strict and non-strict appears '
      + 'ONLY when X carries positive probability at the exact boundary — the discrete/atom case, '
      + 'never in general.',
    targetedMisconceptions: [`${CDF}:MC-1`, `${CDF}:MC-2`, `${CDF}:MC-3`],
    source: eb(CDF, 'Core Understanding — the CDF accumulating probability and forcing non-decrease and right-continuity, discrete summation versus continuous integration as the same definition with different machinery, and the strict-versus-non-strict distinction mattering only at an atom'),
  },
  {
    conceptId: DISCRETE_RV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'NORMALIZATION MUST HOLD EXACTLY — Σp(xᵢ)=1 IS FORCED BY THE PROBABILITY AXIOMS, NEVER '
      + 'OPTIONAL: for X∈{1,2,3} with p(1)=0.4,p(2)=0.4,p(3)=0.3, the sum is 1.1≠1 — INVALID, '
      + 'since the events {X=1},{X=2},{X=3} are mutually exclusive and exhaustive, so by '
      + 'math.prob.probability-axioms’s own axioms, ΣP(X=xᵢ)=P(Ω)=1 is not a convention but a '
      + 'direct consequence. A valid fix: p(3)=0.2, giving sum exactly 1.0.\n\n'
      + 'THE SUPPORT IS WHERE p(x)>0 — THE PMF IS STILL DEFINED (AND EQUALS ZERO) EVERYWHERE ELSE: '
      + 'for a six-sided die, support={1,…,6}; p(7)=P(X=7)=0 — not because 7 is "outside the '
      + 'PMF’s domain," but because the PMF IS defined on all of ℝ and simply equals 0 there. The '
      + 'support is never "all the values the PMF is defined for" — it is specifically where the '
      + 'PMF is POSITIVE.\n\n'
      + 'THE PMF AND CDF ARE DIFFERENT OBJECTS COMPUTING DIFFERENT THINGS: for '
      + 'p(0)=0.1,p(1)=0.3,p(2)=0.4,p(3)=0.2: the PMF p(2)=0.4 gives P(X=2) — the probability of '
      + 'EXACTLY 2; the CDF F(2)=P(X≤2)=p(0)+p(1)+p(2)=0.8 gives the probability of AT MOST 2 — a '
      + 'SUM of PMF values, never identical to any single p(x) value except by coincidence.',
    targetedMisconceptions: [`${DISCRETE_RV}:MC-1`, `${DISCRETE_RV}:MC-2`, `${DISCRETE_RV}:MC-3`],
    source: eb(DISCRETE_RV, 'Core Understanding — PMF normalization forced exactly by the probability axioms, the support as where p(x) is positive rather than the PMF’s full domain, and the PMF and CDF as genuinely different objects'),
  },
  {
    conceptId: CONTINUOUS_RV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'PROBABILITY IS AREA, NEVER THE DENSITY VALUE ITSELF: for X uniform on [0,2] with f(x)=1/2: '
      + 'P(X=1)=∫₁¹(1/2)dx=0 (a zero-width integral), NOT f(1)=1/2. The density value at a point '
      + 'tells you how CONCENTRATED probability is nearby — like population density (people per '
      + 'km²) — never a probability itself. P(0.5≤X≤1.5)=∫_{0.5}^{1.5}(1/2)dx=1/2 IS positive, '
      + 'since the interval has positive width — the contrast between a single point (always '
      + 'zero) and an interval (generally positive) is exactly the point/area distinction.\n\n'
      + 'f(x) CAN EXCEED 1 — THE ONLY CONSTRAINTS ARE NON-NEGATIVITY AND TOTAL-INTEGRAL-EQUALS-1: '
      + 'for f(x)=3 on [0,1/3]: ∫₀^{1/3}3dx=3·(1/3)=1 — a perfectly VALID PDF, despite f(x)=3>1 '
      + 'throughout its support. Just as population density can exceed 1 person per unit area '
      + 'without contradiction (total population = density × area, integrated), f(x) is '
      + 'probability PER UNIT LENGTH, not a probability itself — there is NO constraint f(x)≤1.\n\n'
      + 'THE CDF AND PDF ARE RELATED BY INTEGRATION/DIFFERENTIATION, NEVER INTERCHANGEABLE: for '
      + 'f(x)=2x on [0,1]: F(x)=∫₀ˣ2t dt=x², so F(1/2)=1/4 — NOT f(1/2)=1. The CDF F(x)=P(X≤x) is '
      + 'always in [0,1], non-decreasing, F(0)=0 or the lower boundary value, F(∞)=1; the PDF '
      + 'f(x) has none of these constraints except non-negativity and total integral 1. "f→F: '
      + 'integrate. F→f: differentiate" — and because P(X=c)=∫_c^c f(x)dx=0 for EVERY c, '
      + 'individual points ALWAYS carry zero probability under a continuous distribution.',
    targetedMisconceptions: [`${CONTINUOUS_RV}:MC-1`, `${CONTINUOUS_RV}:MC-2`, `${CONTINUOUS_RV}:MC-3`],
    source: eb(CONTINUOUS_RV, 'Core Understanding — probability as area never the density value itself so single points always carry zero probability, densities permitted to exceed 1 with only non-negativity and total-integral-1 required, and the CDF/PDF related by integration/differentiation never interchangeable'),
  },
]

export const MATHEMATICS_PROB_CDF_DISCRETE_RV_CONTINUOUS_RV_PROBES: SeedProbe[] = [
  {
    conceptId: CDF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Could a computed function claiming to be a CDF F(x) decrease somewhere as x increases?',
    choices: [
      { text: 'No — since F(x)=P(X≤x) and {X≤x₁}⊆{X≤x₂} whenever x₁<x₂, the probability can only stay the same or grow; a decreasing "CDF" is definitionally impossible', isCorrect: true },
      { text: 'Yes — a valid CDF can decrease at certain points, representing an unusual but legitimate probability distribution', isCorrect: false, misconceptionId: `${CDF}:MC-3` },
      { text: "Yes, as long as the function eventually returns to a higher value further along the x-axis", isCorrect: false, misconceptionId: `${CDF}:MC-3` },
    ],
    targetedMisconceptions: [`${CDF}:MC-3`],
    source: eb(CDF, 'Demonstration 1 — the coin-flip step function F(x)=0,1/2,1, non-decreasing and right-continuous throughout, directly breaking CDF-ASSUMED-NON-DECREASING-VIOLATION-POSSIBLE'),
  },
  {
    conceptId: CDF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a continuous random variable X uniform on [0,2] with F(x)=x/2, how would you compute F(1.5)?',
    choices: [
      { text: 'By INTEGRATION — F(1.5)=∫_{-∞}^{1.5}f(t)dt, since X is continuous; for a discrete random variable, the analogous computation would instead be a SUMMATION of PMF values', isCorrect: true },
      { text: 'By SUMMATION — F(1.5)=Σ_{k≤1.5}f(k), treating the density values as if they were discrete PMF values to be added', isCorrect: false, misconceptionId: `${CDF}:MC-2` },
      { text: "It doesn't matter whether you sum or integrate, since both methods always give the identical numerical result for any random variable", isCorrect: false, misconceptionId: `${CDF}:MC-2` },
    ],
    targetedMisconceptions: [`${CDF}:MC-2`],
    source: eb(CDF, 'Demonstration 2 — discrete sum F(x)=Σ_{k≤x}p(k) versus continuous integral F(x)=∫_{-∞}^x f(t)dt=x/2 for uniform[0,2], directly breaking CDF-COMPUTATION-METHOD-MISMATCHED-TO-RV-TYPE'),
  },
  {
    conceptId: CDF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the discrete coin-flip X (X=0 or X=1, each with probability 1/2), is P(X<1) equal to F(1)=P(X≤1)=1?',
    choices: [
      { text: 'No — P(X<1) EXCLUDES X=1, leaving only X=0, so P(X<1)=1/2≠F(1)=1; the gap appears here because X has an ATOM (positive probability) exactly at the boundary x=1', isCorrect: true },
      { text: 'Yes — P(X<b) always equals P(X≤b)=F(b) for any random variable, discrete or continuous', isCorrect: false, misconceptionId: `${CDF}:MC-1` },
      { text: "Yes, since strict and non-strict inequalities are interchangeable in probability notation regardless of the random variable's type", isCorrect: false, misconceptionId: `${CDF}:MC-1` },
    ],
    targetedMisconceptions: [`${CDF}:MC-1`],
    source: eb(CDF, 'Demonstration 3 — P(X<1)=1/2≠F(1)=1 for the discrete coin-flip, contrasted with the continuous uniform case where P(X<1.5)=P(X≤1.5), directly breaking STRICT-AND-NONSTRICT-INEQUALITY-CONFLATED'),
  },
  {
    conceptId: DISCRETE_RV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X∈{1,2,3} with proposed PMF values p(1)=0.4, p(2)=0.4, p(3)=0.3, is this a valid PMF?',
    choices: [
      { text: 'No — the sum 0.4+0.4+0.3=1.1≠1; since {X=1},{X=2},{X=3} are mutually exclusive and exhaustive, the probability axioms FORCE the sum to equal exactly 1, so this assignment is invalid', isCorrect: true },
      { text: 'Yes — each individual value p(1), p(2), p(3) is a valid probability between 0 and 1, so the assignment as a whole is valid', isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-1` },
      { text: "Yes, since the PMF values only need to be checked for being non-negative, not for summing to any particular total", isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-1` },
    ],
    targetedMisconceptions: [`${DISCRETE_RV}:MC-1`],
    source: eb(DISCRETE_RV, 'Demonstration 1 — p(1)=0.4,p(2)=0.4,p(3)=0.3 summing to 1.1 (invalid), fixing to p(3)=0.2 for sum exactly 1.0, directly breaking PMF-SUMS-NOT-ONE'),
  },
  {
    conceptId: DISCRETE_RV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a fair six-sided die with support {1,…,6}, what is p(7)?',
    choices: [
      { text: 'p(7)=0 — the PMF is defined on the ENTIRE real line and simply equals 0 outside the support; the support {1,…,6} is specifically where p(x)>0, never "everywhere the PMF is defined"', isCorrect: true },
      { text: 'p(7) is undefined, since 7 falls outside the PMF’s domain, which only covers the die’s six possible outcomes', isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-2` },
      { text: "p(7) cannot be evaluated at all, since a PMF is only meaningful for values inside its support", isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-2` },
    ],
    targetedMisconceptions: [`${DISCRETE_RV}:MC-2`],
    source: eb(DISCRETE_RV, 'Demonstration 2 — a die’s support {1,…,6}; p(7)=0, p(-5)=0, the PMF defined everywhere and zero outside the support, directly breaking SUPPORT-IS-ALL-REALS'),
  },
  {
    conceptId: DISCRETE_RV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For p(0)=0.1, p(1)=0.3, p(2)=0.4, p(3)=0.2, is p(2) the same number as F(2)?',
    choices: [
      { text: 'No — p(2)=0.4 gives P(X=2), the probability of EXACTLY 2, while F(2)=p(0)+p(1)+p(2)=0.8 gives P(X≤2), the probability of AT MOST 2; these are different objects computing different things', isCorrect: true },
      { text: 'Yes — p(x) and F(x) are simply two different notations for computing the identical quantity at any given x', isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-3` },
      { text: "Yes, since both p(2) and F(2) describe the probability associated with the value 2", isCorrect: false, misconceptionId: `${DISCRETE_RV}:MC-3` },
    ],
    targetedMisconceptions: [`${DISCRETE_RV}:MC-3`],
    source: eb(DISCRETE_RV, 'Demonstration 3 — p(2)=0.4 (exactly 2) versus F(2)=p(0)+p(1)+p(2)=0.8 (at most 2), directly breaking PMF-IS-CDF'),
  },
  {
    conceptId: CONTINUOUS_RV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For X uniform on [0,2] with density f(x)=1/2, what is P(X=1)?',
    choices: [
      { text: 'P(X=1)=∫₁¹(1/2)dx=0 — a zero-width integral is always zero, regardless of the density’s height there; the density value f(1)=1/2 tells you concentration, never a probability itself', isCorrect: true },
      { text: 'P(X=1)=f(1)=1/2 — the density value at the point directly gives the probability of that exact value', isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-1` },
      { text: "P(X=1) cannot be determined without additional information about the specific distribution's shape near x=1", isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_RV}:MC-1`],
    source: eb(CONTINUOUS_RV, 'Demonstration 1 — for uniform[0,2], P(X=1)=∫₁¹(1/2)dx=0 versus P(0.5≤X≤1.5)=1/2, positive only because the interval has width, directly breaking SINGLE-VALUE-HAS-PROBABILITY'),
  },
  {
    conceptId: CONTINUOUS_RV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=3 on [0,1/3], with ∫₀^(1/3)3dx=1, is this a valid PDF even though f(x)=3>1 throughout?',
    choices: [
      { text: 'Yes — a density is probability PER UNIT LENGTH, not a probability itself, so there is NO constraint f(x)≤1; the only requirements are f(x)≥0 everywhere and the total integral equals exactly 1, both satisfied here', isCorrect: true },
      { text: 'No — a valid PDF must satisfy 0≤f(x)≤1 everywhere, just like an ordinary probability value, so f(x)=3 disqualifies it', isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-2` },
      { text: "No, since any density value exceeding 1 automatically makes the total integral exceed 1 as well", isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_RV}:MC-2`],
    source: eb(CONTINUOUS_RV, 'Demonstration 2 — f(x)=3 on [0,1/3]: ∫₀^(1/3)3dx=1, a valid PDF despite f(x)=3>1, directly breaking PDF-IS-PROBABILITY'),
  },
  {
    conceptId: CONTINUOUS_RV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=2x on [0,1], with F(x)=∫₀ˣ2t dt=x², is F(1/2) the same number as f(1/2)?',
    choices: [
      { text: 'No — F(1/2)=(1/2)²=1/4, while f(1/2)=2(1/2)=1; F and f are related by integration/differentiation ("f→F: integrate, F→f: differentiate"), never interchangeable values', isCorrect: true },
      { text: 'Yes — F(x) and f(x) are just two notations for the same underlying function evaluated at the same point', isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-3` },
      { text: "Yes, since both F and f describe properties of X at the value x=1/2", isCorrect: false, misconceptionId: `${CONTINUOUS_RV}:MC-3` },
    ],
    targetedMisconceptions: [`${CONTINUOUS_RV}:MC-3`],
    source: eb(CONTINUOUS_RV, 'Demonstration 3 — f(x)=2x on [0,1]: F(1/2)=1/4≠f(1/2)=1, genuinely different values, directly breaking CDF-PDF-CONFUSION'),
  },
]
