/**
 * Batch: probability-measure, markov-inequality (math.prob).
 *
 * Continues the math.prob domain opened in Batch 96. Only 2 concepts were
 * simultaneously ready this batch: math.prob.probability-measure (requires
 * event, authored Batch 100) unlocks probability-axioms; math.prob.
 * markov-inequality (requires expected-value, authored Batch 96) unlocks
 * chebyshev per the live KG (a KG unlocks/requires asymmetry against
 * chebyshev's own requires field, already verified and not a discrepancy —
 * chebyshev is already authored regardless).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{probability-measure,
 * markov-inequality}.md.
 *
 *   PROBABILITY-MEASURE  probability-measure — probability lives in [0,1],
 *             NEVER on a percentage scale (70% must be CONVERTED to 0.70
 *             before it functions as a probability); the complement rule
 *             P(Aᶜ)=1−P(A) follows directly from P(Ω)=1, never 1+P(A) or
 *             P(A) itself; the GENERAL addition rule P(A∪B)=P(A)+P(B)−
 *             P(A∩B) subtracts the overlap, with the plain sum a SPECIAL
 *             CASE only for mutually exclusive events, never the general
 *             rule.
 *   MARKOV-INEQUALITY  markov-inequality — the one-line proof drops a
 *             non-negative term directly from the definition of
 *             expectation, needing NOTHING about the distribution's shape;
 *             Markov is DISTRIBUTION-FREE, applying to ANY non-negative X
 *             with finite mean, never restricted to a named distribution;
 *             the bound is TIGHT only at a specific two-point distribution,
 *             never an equality for generic X (e.g. wildly loose for
 *             Poisson).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PROBABILITY_MEASURE = 'math.prob.probability-measure'
const MARKOV_INEQUALITY = 'math.prob.markov-inequality'

export const MATHEMATICS_PROB_PROBABILITY_MEASURE_MARKOV_INEQUALITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROBABILITY_MEASURE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'PROBABILITY LIVES IN [0,1], NEVER ON A PERCENTAGE SCALE: a probability measure P assigns '
      + 'each event A⊆Ω a number P(A)∈[0,1]. For a jar of 3 red and 7 blue marbles, '
      + 'P(red)=3/10=0.3 — NOT 3, not 30, not "30%". Everyday language ("70% chance") must be '
      + 'CONVERTED (divide by 100: 70%→0.70) before it functions as a probability; a value '
      + 'outside [0,1] (like 70, 1.3, or −0.2) is never valid.\n\n'
      + 'THE COMPLEMENT RULE FOLLOWS DIRECTLY FROM P(Ω)=1: since A and Aᶜ are mutually exclusive '
      + 'and A∪Aᶜ=Ω, the mutually-exclusive addition axiom gives P(A)+P(Aᶜ)=P(Ω)=1, so '
      + 'P(Aᶜ)=1−P(A) — never 1+P(A) or P(A) itself. Applying P(∅)=0 follows the same way: Ω and '
      + '∅ are mutually exclusive with Ω∪∅=Ω, giving P(Ω)+P(∅)=P(Ω)=1⇒P(∅)=0.\n\n'
      + 'THE GENERAL ADDITION RULE SUBTRACTS THE OVERLAP; THE PLAIN SUM IS ONLY A SPECIAL CASE: '
      + 'for events A,B, P(A∪B)=P(A)+P(B)−P(A∩B) — the overlap A∩B is counted once in P(A) and '
      + 'again in P(B), so subtracting it once corrects the double-count. Only when A,B are '
      + 'mutually exclusive (A∩B=∅, so P(A∩B)=0) does this reduce to the familiar '
      + 'P(A∪B)=P(A)+P(B) — that simpler rule is a SPECIAL CASE learned first, never the general '
      + 'one.',
    targetedMisconceptions: [`${PROBABILITY_MEASURE}:MC-1`, `${PROBABILITY_MEASURE}:MC-2`, `${PROBABILITY_MEASURE}:MC-3`],
    source: eb(PROBABILITY_MEASURE, 'Core Understanding — probability living in [0,1] never a percentage scale, the complement rule P(A^c)=1-P(A) following directly from P(Omega)=1, and the general addition rule subtracting the overlap with the plain sum only a mutually-exclusive special case'),
  },
  {
    conceptId: MARKOV_INEQUALITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE ONE-LINE PROOF, DIRECTLY FROM THE DEFINITION OF EXPECTATION: for X≥0 and a>0, '
      + 'E[X]=E[X·𝟙_(X≥a)]+E[X·𝟙_(X<a)]≥E[X·𝟙_(X≥a)]≥a·E[𝟙_(X≥a)]=a·P(X≥a). The first '
      + 'inequality drops the non-negative term E[X·𝟙_(X<a)]≥0; the second replaces X by a on the '
      + 'event X≥a, since X≥a there by definition. Rearranging: P(X≥a)≤E[X]/a. The bound uses '
      + "NOTHING about the distribution's shape — only E[X] and a.\n\n"
      + 'MARKOV IS DISTRIBUTION-FREE — IT APPLIES TO ANY NON-NEGATIVE X WITH FINITE MEAN, NEVER '
      + 'A NAMED DISTRIBUTION: if E[X]=5, then P(X≥25)≤5/25=1/5, regardless of whether X is '
      + 'Binomial, Poisson, Exponential, or anything else non-negative with that mean. The '
      + 'inputs are ONLY E[X] and a — nothing else about the distribution matters, which is both '
      + 'the bound\'s power (universal applicability) and its limitation (it can be very loose, '
      + 'since it ignores shape entirely).\n\n'
      + 'THE BOUND IS TIGHT ONLY AT A SPECIFIC TWO-POINT DISTRIBUTION, NEVER FOR GENERIC X: let '
      + 'X=0 with probability 1−p and X=a with probability p. Then E[X]=ap, and '
      + 'P(X≥a)=p=E[X]/a — equality holds EXACTLY here. For most distributions (e.g. Poisson), '
      + 'the bound is far from tight: for X~Poisson(4), Markov bounds P(X≥20)≤4/20=0.2, while '
      + 'the true value is approximately 0.0000084 — an enormous gap, since Poisson never '
      + 'concentrates its mass at just two points {0,a}.',
    targetedMisconceptions: [`${MARKOV_INEQUALITY}:MC-1`, `${MARKOV_INEQUALITY}:MC-2`, `${MARKOV_INEQUALITY}:MC-3`],
    source: eb(MARKOV_INEQUALITY, "Core Understanding — Markov's inequality's one-line proof from the definition of expectation, its distribution-free applicability to any non-negative X with finite mean, and its bound being tight only at a specific two-point distribution never generically"),
  },
]

export const MATHEMATICS_PROB_PROBABILITY_MEASURE_MARKOV_INEQUALITY_PROBES: SeedProbe[] = [
  {
    conceptId: PROBABILITY_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A forecast says "70% chance of rain." Is P(rain)=70 correct?',
    choices: [
      { text: 'No — probability always lives in [0,1]; 70% must be CONVERTED by dividing by 100, giving P(rain)=0.70, never the raw percentage number 70', isCorrect: true },
      { text: 'Yes — P(rain)=70 is correct, since the forecast directly states the chance as a percentage number', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-1` },
      { text: 'Yes, since probability and percentage are just two names for the exact same numerical scale with no conversion needed', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-1` },
    ],
    targetedMisconceptions: [`${PROBABILITY_MEASURE}:MC-1`],
    source: eb(PROBABILITY_MEASURE, 'Demonstration 1 — converting a 70% chance of rain to P(rain)=0.70, directly breaking probability-as-percentage'),
  },
  {
    conceptId: PROBABILITY_MEASURE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If P(A)=0.7, is P(Aᶜ)=1.7, or 0.7, or something else?',
    choices: [
      { text: 'P(Aᶜ)=1−0.7=0.3 — the complement rule follows directly from P(A)+P(Aᶜ)=P(Ω)=1, checked directly: 0.7+0.3=1; never 1+P(A)=1.7 or P(Aᶜ)=P(A) itself', isCorrect: true },
      { text: 'P(Aᶜ)=1+0.7=1.7, since the complement should add to, rather than subtract from, the total probability of 1', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-2` },
      { text: 'P(Aᶜ)=0.7, the same as P(A), since an event and its complement should share equal probability by symmetry', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-2` },
    ],
    targetedMisconceptions: [`${PROBABILITY_MEASURE}:MC-2`],
    source: eb(PROBABILITY_MEASURE, 'Demonstration 2 — for P(A)=0.7, deriving P(A^c)=1-0.7=0.3 checked directly against 0.7+0.3=1, directly breaking complement-error'),
  },
  {
    conceptId: PROBABILITY_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For P(A)=0.5, P(B)=0.4, P(A∩B)=0.2, is P(A∪B)=P(A)+P(B)=0.9 always correct, even when A and B share outcomes?',
    choices: [
      { text: 'No — the GENERAL addition rule subtracts the overlap: P(A∪B)=0.5+0.4−0.2=0.7; the plain sum 0.9 double-counts the shared outcomes and is only correct when A∩B=∅ (mutually exclusive), a special case', isCorrect: true },
      { text: 'Yes — P(A∪B)=P(A)+P(B) is always the correct formula for the probability of a union, regardless of whether the two events overlap', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-3` },
      { text: 'Yes, since the intersection P(A∩B) only matters for computing conditional probabilities, never for computing a union directly', isCorrect: false, misconceptionId: `${PROBABILITY_MEASURE}:MC-3` },
    ],
    targetedMisconceptions: [`${PROBABILITY_MEASURE}:MC-3`],
    source: eb(PROBABILITY_MEASURE, 'Demonstration 3 — the wrong sum 0.9 double-counting the overlap versus the correct P(A union B)=0.7, directly breaking addition-formula-always-sum'),
  },
  {
    conceptId: MARKOV_INEQUALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is Markov's inequality a formula specific to one named distribution, like Binomial or Poisson?",
    choices: [
      { text: 'No — Markov is DISTRIBUTION-FREE; the bound P(X≥a)≤E[X]/a depends only on E[X] and a, and applies identically to ANY non-negative random variable with finite mean, regardless of shape', isCorrect: true },
      { text: "Yes — Markov's inequality is tied to a specific probability distribution, the way many other named formulas in probability are", isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-1` },
      { text: 'Yes, since applying the inequality correctly requires first identifying which specific named distribution the random variable follows', isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-1` },
    ],
    targetedMisconceptions: [`${MARKOV_INEQUALITY}:MC-1`],
    source: eb(MARKOV_INEQUALITY, "Demonstration 1 — the same bound applied identically to any non-negative distribution sharing a given mean, directly breaking Markov-requires-specific-distribution"),
  },
  {
    conceptId: MARKOV_INEQUALITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "To bound P(|X−μ|≥a) using Markov's inequality, can it be applied directly to X−μ, which may be negative?",
    choices: [
      { text: 'No — Markov strictly requires X≥0; X−μ can be negative, so it must first be transformed into a non-negative quantity, e.g. by squaring: (X−μ)²≥a², before Markov can be applied', isCorrect: true },
      { text: "Yes — Markov's inequality can be applied directly to any quantity, including one that takes negative values, without any transformation needed first", isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-2` },
      { text: 'Yes, since the "Markov" in Markov\'s inequality refers to the same symmetric structure used in Markov chains, which already accommodates negative values', isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-2` },
    ],
    targetedMisconceptions: [`${MARKOV_INEQUALITY}:MC-2`],
    source: eb(MARKOV_INEQUALITY, 'Demonstration 2 — converting |X-mu|>=a into a Markov-applicable form via (X-mu)^2>=a^2, directly breaking Markov-requires-X-symmetric'),
  },
  {
    conceptId: MARKOV_INEQUALITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For X~Poisson(4), Markov bounds P(X≥20)≤4/20=0.2. Is this bound exactly equal to the true probability?',
    choices: [
      { text: 'No — the true probability is approximately 0.0000084, an enormous gap from the bound 0.2; Markov\'s bound is TIGHT only for a specific two-point distribution, and is typically very loose for smoother distributions like Poisson', isCorrect: true },
      { text: "Yes — P(X≥a)=E[X]/a holds as an exact equality for every non-negative random variable, Poisson included", isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-3` },
      { text: 'Yes, since Markov\'s inequality is specifically designed to give the precise tail probability for any distribution with a known mean', isCorrect: false, misconceptionId: `${MARKOV_INEQUALITY}:MC-3` },
    ],
    targetedMisconceptions: [`${MARKOV_INEQUALITY}:MC-3`],
    source: eb(MARKOV_INEQUALITY, 'Demonstration 3 — the Poisson(4) comparison showing Markov\'s bound of 0.2 against the true value of approximately 0.0000084, directly breaking Markov-bound-is-tight-for-all-distributions'),
  },
]
