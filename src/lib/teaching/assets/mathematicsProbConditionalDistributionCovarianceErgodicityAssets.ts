/**
 * Batch: conditional-distribution, covariance, ergodicity (math.prob).
 *
 * Continuing math.prob (32/49 -> 35/49). Fresh frontier recompute after
 * joint-distribution/stationary-distribution/quantile's authoring found 7
 * ready concepts. Selected conditional-distribution (unlocks conditional-
 * expectation), covariance (unlocks correlation), and ergodicity (closes
 * stationary-distribution's own unlock) — leaving continuous-
 * distributions, discrete-distributions, generating-function, and
 * marginal-distribution (all terminal) for a following batch. Transcribed
 * from the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.prob.{conditional-distribution,covariance,ergodicity}.md.
 *
 *   CONDITIONAL-DISTRIBUTION  the formula f_{X|Y}(x|y)=f(x,y)/f_Y(y) is
 *           conditional probability's OWN structure applied to an ENTIRE
 *           distribution, never a genuinely new concept; dividing by the
 *           marginal GUARANTEES proper normalization, never merely a
 *           proportional rescaling; conditional expectation can genuinely
 *           DIFFER from marginal expectation, never assumed equal.
 *   COVARIANCE  the sign must never be reversed (positive: move together;
 *           negative: move oppositely); ZERO covariance NEVER implies
 *           independence — covariance detects only LINEAR co-movement; the
 *           shortcut formula requires correctly computed MARGINALS, never
 *           joint probabilities used directly.
 *   ERGODICITY  ergodic means time averages converge to the SPECIFIC π,
 *           never "equal visitation of all states"; ergodicity applies to
 *           FINITE chains just as much as infinite ones; time-average
 *           convergence and distributional convergence are DISTINCT
 *           results with different hypotheses, never interchangeable.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONDITIONAL_DISTRIBUTION = 'math.prob.conditional-distribution'
const COVARIANCE = 'math.prob.covariance'
const ERGODICITY = 'math.prob.ergodicity'

export const MATHEMATICS_PROB_CONDITIONAL_DISTRIBUTION_COVARIANCE_ERGODICITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONDITIONAL_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE CONDITIONAL DISTRIBUTION FORMULA IS CONDITIONAL PROBABILITY, APPLIED TO ENTIRE '
      + 'DISTRIBUTIONS — NEVER A NEW CONCEPT: for joint PMF f(1,1)=0.1, f(1,2)=0.2, f(2,1)=0.3, '
      + 'f(2,2)=0.4: f_Y(1)=f(1,1)+f(2,1)=0.4. Then f_{X|Y}(1|1)=0.1/0.4=0.25 and '
      + 'f_{X|Y}(2|1)=0.3/0.4=0.75 — this DIRECTLY matches math.prob.conditional-probability’s '
      + 'P(A|B)=P(A∩B)/P(B) structure, with f(x,y) playing the role of P(A∩B) and f_Y(y) playing '
      + 'the role of P(B). This is the SAME conditioning idea, NEVER a separately invented '
      + 'probability concept, just applied ACROSS an entire distribution over x instead of a '
      + 'single event.\n\n'
      + 'DIVIDING BY THE MARGINAL GUARANTEES PROPER NORMALIZATION — NEVER MERELY A RESCALING: '
      + 'checking f_{X|Y}(1|1)+f_{X|Y}(2|1)=0.25+0.75=1 — this is GUARANTEED, never a coincidence, '
      + 'because f_Y(1)=f(1,1)+f(2,1) is EXACTLY the sum of the numerators used, so dividing EACH '
      + 'numerator by that SAME sum ALWAYS produces terms summing to 1. The result is NOT merely '
      + '"proportional to a distribution" — dividing by the marginal IS exactly the normalization '
      + 'that makes it a genuine, properly normalized probability distribution in its own right.\n\n'
      + 'CONDITIONAL EXPECTATION CAN GENUINELY DIFFER FROM MARGINAL EXPECTATION — NEVER ASSUMED '
      + 'EQUAL: using f_{X|Y}(1|1)=0.25, f_{X|Y}(2|1)=0.75: E[X|Y=1]=1(0.25)+2(0.75)=1.75. The '
      + 'MARGINAL expectation from the SAME joint distribution is E[X]=1(0.3)+2(0.7)=1.7 — '
      + 'GENUINELY DIFFERENT from E[X|Y=1]=1.75. Conditioning on Y=1 SHIFTS the expected value '
      + 'away from the unconditional average, because it averages over a DIFFERENT (conditional, '
      + 'not marginal) distribution — never the same number by default, since "the expected value '
      + 'of X" depends on WHICH distribution you average over.',
    targetedMisconceptions: [`${CONDITIONAL_DISTRIBUTION}:MC-1`, `${CONDITIONAL_DISTRIBUTION}:MC-2`, `${CONDITIONAL_DISTRIBUTION}:MC-3`],
    source: eb(CONDITIONAL_DISTRIBUTION, 'Core Understanding — the conditional distribution formula as conditional probability applied to an entire distribution, dividing by the marginal guaranteeing proper normalization, and conditional expectation genuinely differing from marginal expectation'),
  },
  {
    conceptId: COVARIANCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE COVARIANCE SIGN MUST NEVER BE REVERSED: for a joint PMF with X=3 (above its mean 2.4) '
      + 'occurring disproportionately WITH Y=4 (above its mean 3.4): Cov(X,Y)=8.6-(2.4)(3.4)=0.44, '
      + 'POSITIVE — the two variables tend to be simultaneously HIGH together. REVERSING the '
      + 'pairing (same marginals, but X=1 now paired disproportionately with Y=4) flips the sign '
      + 'to EXACTLY -0.44 — confirming positive means "same side of their means together," '
      + 'negative means "opposite sides," and reversing the pairing structure reverses the sign '
      + 'predictably, never arbitrarily.\n\n'
      + 'ZERO COVARIANCE NEVER IMPLIES INDEPENDENCE — COVARIANCE ONLY DETECTS LINEAR CO-MOVEMENT: '
      + 'let X take values -1,0,1 each with probability 1/3, and Y=X² (Y is COMPLETELY, '
      + 'deterministically determined by X — about as dependent as two variables can be). E[X]=0, '
      + 'E[XY]=E[X³]=0, giving Cov(X,Y)=0-0·(2/3)=0 — EXACTLY zero, despite Y being a '
      + 'deterministic function of X. Independence DOES imply zero covariance (since independence '
      + 'gives E[XY]=E[X]E[Y]) — but the CONVERSE genuinely fails: covariance is sensitive ONLY to '
      + 'linear co-movement tendencies, and this symmetric, quadratic dependence produces none, '
      + 'making it completely INVISIBLE to covariance despite being real and strong.\n\n'
      + 'THE SHORTCUT REQUIRES CORRECTLY COMPUTED MARGINALS — NEVER JOINT PROBABILITIES USED '
      + 'DIRECTLY: to compute E[X] from a joint PMF, you must FIRST find the marginal '
      + 'P(X=x)=Σ_y p(x,y) (summing over ALL values of y for that fixed x) — NEVER use a single '
      + 'joint probability value directly as if it were the marginal. This is the SAME '
      + 'marginal-computation discipline established in math.prob.joint-distribution — '
      + 'covariance’s shortcut formula E[XY]-E[X]E[Y] is only correct when E[X] and E[Y] are '
      + 'genuinely the marginal expectations, computed properly.',
    targetedMisconceptions: [`${COVARIANCE}:MC-1`, `${COVARIANCE}:MC-2`, `${COVARIANCE}:MC-3`],
    source: eb(COVARIANCE, 'Core Understanding — the covariance sign never reversed, zero covariance never implying independence since covariance detects only linear co-movement, and the shortcut formula requiring correctly computed marginals'),
  },
  {
    conceptId: ERGODICITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ERGODIC MEANS TIME AVERAGES CONVERGE TO THE SPECIFIC π — NEVER "EQUAL VISITATION OF ALL '
      + 'STATES": for P=[[0.9,0.1],[0.3,0.7]]: irreducible (both states communicate) and '
      + 'aperiodic (P₁₁=0.9>0), hence ergodic, with π=(0.75,0.25) — genuinely NOT uniform. The '
      + 'ergodic theorem guarantees the long-run fraction of time in state 1 converges to 0.75, '
      + 'NOT to 0.5 — ergodicity says time averages track π, whatever π happens to be, never that '
      + 'all states get equal time.\n\n'
      + 'ERGODICITY APPLIES TO FINITE CHAINS JUST AS MUCH AS INFINITE ONES: for the SAME 2-state '
      + 'chain above, being finite, irreducible, and aperiodic is SUFFICIENT for ergodicity '
      + '(finite irreducible chains are automatically positive recurrent) — no infinite or '
      + 'continuous state space is required. A random walk on {0,1,…,n} or a finite weather chain '
      + 'can be fully analyzed for ergodicity using exactly the same irreducible+aperiodic check, '
      + 'never requiring an unbounded state space.\n\n'
      + 'TIME-AVERAGE CONVERGENCE AND DISTRIBUTIONAL CONVERGENCE ARE DISTINCT RESULTS WITH '
      + 'DIFFERENT HYPOTHESES: a random walk on a 10-cycle (period 2) has time fraction at vertex '
      + '0 converging to π₀=1/10 (the ergodic theorem holds for ANY irreducible + positive '
      + 'recurrent chain, periodic or not). But Pⁿ(0,0) OSCILLATES — zero for odd n, positive for '
      + 'even n — it NEVER converges, because distributional convergence additionally requires '
      + 'APERIODICITY. Confirming time averages converge is never sufficient to conclude the '
      + 'one-step distribution itself converges.',
    targetedMisconceptions: [`${ERGODICITY}:MC-1`, `${ERGODICITY}:MC-2`, `${ERGODICITY}:MC-3`],
    source: eb(ERGODICITY, 'Core Understanding — ergodicity meaning time averages converge to the specific π never equal visitation, ergodicity applying to finite chains just as much as infinite ones, and time-average versus distributional convergence as distinct results'),
  },
]

export const MATHEMATICS_PROB_CONDITIONAL_DISTRIBUTION_COVARIANCE_ERGODICITY_PROBES: SeedProbe[] = [
  {
    conceptId: CONDITIONAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the conditional distribution formula f_{X|Y}(x|y)=f(x,y)/f_Y(y) a genuinely new probability concept, unrelated to conditional probability P(A|B)?',
    choices: [
      { text: 'No — it DIRECTLY matches P(A|B)=P(A∩B)/P(B)’s structure, with f(x,y) playing the role of P(A∩B) and f_Y(y) playing the role of P(B); it is the SAME conditioning idea applied across an entire distribution', isCorrect: true },
      { text: 'Yes — the conditional distribution formula is a separately invented probability concept with no connection to conditional probability', isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-1` },
      { text: "Yes, since conditional distributions apply to entire distributions while conditional probability applies only to single events, making them fundamentally different ideas", isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_DISTRIBUTION}:MC-1`],
    source: eb(CONDITIONAL_DISTRIBUTION, 'Demonstration 1 — the direct structural match between f_{X|Y}(x|y) and P(A|B), directly breaking CONDITIONAL-DISTRIBUTION-ASSUMED-NEW-CONCEPT'),
  },
  {
    conceptId: CONDITIONAL_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f_{X|Y}(1|1)=0.25 and f_{X|Y}(2|1)=0.75, is the fact that these sum to exactly 1 a coincidence, or is it guaranteed?',
    choices: [
      { text: 'Guaranteed — f_Y(1) is EXACTLY the sum of the numerators used (f(1,1)+f(2,1)), so dividing EACH numerator by that SAME sum ALWAYS produces terms summing to 1; this is genuine normalization, never merely a proportional rescaling', isCorrect: true },
      { text: 'A coincidence — the values happen to sum to 1 in this particular example, but dividing by the marginal is merely a proportional rescaling with no guaranteed normalization', isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-2` },
      { text: "It depends on the specific joint distribution chosen, since dividing by a constant doesn't generally guarantee the results sum to 1", isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_DISTRIBUTION}:MC-2`],
    source: eb(CONDITIONAL_DISTRIBUTION, 'Demonstration 2 — the guaranteed-sum-to-1 verification for the conditional distribution, directly breaking CONDITIONAL-DISTRIBUTION-ASSUMED-MERELY-RESCALED'),
  },
  {
    conceptId: CONDITIONAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'From the same joint distribution, E[X|Y=1]=1.75 while E[X]=1.7 (the marginal expectation). Should these two numbers be equal?',
    choices: [
      { text: 'No — conditioning on Y=1 SHIFTS the expected value away from the unconditional average, because it averages over a DIFFERENT (conditional) distribution; the expected value of X genuinely depends on which distribution you average over', isCorrect: true },
      { text: 'Yes — the conditional expectation E[X|Y=y] must always equal the ordinary (marginal) expectation E[X], regardless of the value of y', isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-3` },
      { text: "Yes, since 'the expected value of X' is a single fixed number that never changes based on additional conditioning information", isCorrect: false, misconceptionId: `${CONDITIONAL_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_DISTRIBUTION}:MC-3`],
    source: eb(CONDITIONAL_DISTRIBUTION, 'Demonstration 3 — the E[X|Y=1]=1.75 versus E[X]=1.7 numeric contrast, directly breaking CONDITIONAL-EXPECTATION-ASSUMED-EQUAL-TO-MARGINAL'),
  },
  {
    conceptId: COVARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If Cov(X,Y) is computed as -0.44 (negative), does this mean X and Y tend to move together (both high or both low simultaneously)?',
    choices: [
      { text: 'No — a NEGATIVE covariance means the variables tend to be on OPPOSITE sides of their means (one high while the other is low); POSITIVE covariance is what indicates moving together', isCorrect: true },
      { text: 'Yes — negative covariance indicates the variables move together, both increasing or decreasing simultaneously', isCorrect: false, misconceptionId: `${COVARIANCE}:MC-2` },
      { text: "Yes, since the sign of covariance doesn't actually indicate directional relationship, only the magnitude does", isCorrect: false, misconceptionId: `${COVARIANCE}:MC-2` },
    ],
    targetedMisconceptions: [`${COVARIANCE}:MC-2`],
    source: eb(COVARIANCE, 'Demonstration 1 — the paired positive-versus-negative joint-distribution computation, directly breaking COVARIANCE-SIGN-INTERPRETATION-REVERSED'),
  },
  {
    conceptId: COVARIANCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X taking values -1,0,1 each with probability 1/3, and Y=X² (Y completely determined by X), Cov(X,Y)=0. Does this mean X and Y are independent?',
    choices: [
      { text: 'No — despite Cov(X,Y)=0 exactly, Y is a DETERMINISTIC function of X (about as dependent as two variables can be); covariance is sensitive ONLY to LINEAR co-movement, and this symmetric quadratic dependence produces none, making it invisible to covariance', isCorrect: true },
      { text: 'Yes — zero covariance always implies that two random variables are independent of each other', isCorrect: false, misconceptionId: `${COVARIANCE}:MC-1` },
      { text: "Yes, since covariance is a complete measure of all forms of dependence between two random variables", isCorrect: false, misconceptionId: `${COVARIANCE}:MC-1` },
    ],
    targetedMisconceptions: [`${COVARIANCE}:MC-1`],
    source: eb(COVARIANCE, 'Demonstration 2 — the Y=X² zero-covariance-despite-total-dependence construction, directly breaking ZERO-COVARIANCE-ASSUMED-TO-IMPLY-INDEPENDENCE'),
  },
  {
    conceptId: COVARIANCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To apply the shortcut formula Cov(X,Y)=E[XY]-E[X]E[Y] from a joint PMF, can E[X] be computed by using a single joint probability value p(x,y) directly?',
    choices: [
      { text: 'No — E[X] must FIRST be computed from the correct MARGINAL P(X=x)=Σ_y p(x,y), summing over ALL values of y for that fixed x; using a single joint probability value directly in place of the marginal gives a wrong result', isCorrect: true },
      { text: 'Yes — any single joint probability value p(x,y) can be used directly as if it were the marginal P(X=x) when applying the shortcut formula', isCorrect: false, misconceptionId: `${COVARIANCE}:MC-3` },
      { text: "Yes, since the marginal and any individual joint probability value describe the same underlying quantity for a fixed x", isCorrect: false, misconceptionId: `${COVARIANCE}:MC-3` },
    ],
    targetedMisconceptions: [`${COVARIANCE}:MC-3`],
    source: eb(COVARIANCE, 'Demonstration 3 — the explicit marginal computation preceding the shortcut formula application, directly breaking COVARIANCE-SHORTCUT-FORMULA-COMPUTED-WITH-WRONG-MARGINALS'),
  },
  {
    conceptId: ERGODICITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For an ergodic chain with π=(0.75,0.25) (genuinely non-uniform), does the ergodic theorem guarantee the long-run fraction of time in state 1 converges to 0.5 (equal visitation)?',
    choices: [
      { text: 'No — the ergodic theorem guarantees time averages converge to the SPECIFIC π, so the long-run fraction of time in state 1 converges to 0.75, NOT to 0.5; ergodicity never requires equal visitation of all states', isCorrect: true },
      { text: 'Yes — an ergodic chain must, by definition, spend equal time in every state in the long run', isCorrect: false, misconceptionId: `${ERGODICITY}:MC-1` },
      { text: "Yes, since ergodicity specifically means all states are visited with the same long-run frequency, regardless of the transition probabilities", isCorrect: false, misconceptionId: `${ERGODICITY}:MC-1` },
    ],
    targetedMisconceptions: [`${ERGODICITY}:MC-1`],
    source: eb(ERGODICITY, 'Demonstration 1 — the π=(0.75,0.25) 2-state chain, ergodic with genuinely unequal long-run visitation, directly breaking ERGODIC-MEANS-THE-CHAIN-VISITS-ALL-STATES-EQUALLY'),
  },
  {
    conceptId: ERGODICITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a finite Markov chain (like a 2-state weather chain) ever be ergodic, or does ergodicity require an infinite or continuous state space?',
    choices: [
      { text: 'A finite chain CAN be ergodic — being finite, irreducible, and aperiodic is SUFFICIENT for ergodicity, since finite irreducible chains are automatically positive recurrent; no infinite or continuous state space is required', isCorrect: true },
      { text: 'Ergodicity requires an infinite or continuous state space; a finite chain can never satisfy the ergodic theorem', isCorrect: false, misconceptionId: `${ERGODICITY}:MC-2` },
      { text: "Ergodicity is only meaningful for random walks on large graphs or continuous systems, never for a small finite chain", isCorrect: false, misconceptionId: `${ERGODICITY}:MC-2` },
    ],
    targetedMisconceptions: [`${ERGODICITY}:MC-2`],
    source: eb(ERGODICITY, 'Demonstration 2 — the same finite chain verified ergodic via irreducibility and aperiodicity alone, no infinite state space needed, directly breaking ERGODICITY-REQUIRES-AN-INFINITE-STATE-SPACE'),
  },
  {
    conceptId: ERGODICITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a random walk on a 10-cycle (period 2), the time fraction at vertex 0 converges to π₀=1/10 by the ergodic theorem. Does this also mean Pⁿ(0,0) (the one-step distribution) converges as n grows?',
    choices: [
      { text: 'No — Pⁿ(0,0) OSCILLATES (zero for odd n, positive for even n) and NEVER converges, because distributional convergence additionally requires APERIODICITY; time-average convergence and distributional convergence are DISTINCT results with different hypotheses', isCorrect: true },
      { text: 'Yes — since the ergodic theorem guarantees time averages converge to π, the one-step distribution Pⁿ(x,·) must also converge to π by the same result', isCorrect: false, misconceptionId: `${ERGODICITY}:MC-3` },
      { text: "Yes, since time-average convergence and distributional convergence are simply two different ways of stating the exact same mathematical fact", isCorrect: false, misconceptionId: `${ERGODICITY}:MC-3` },
    ],
    targetedMisconceptions: [`${ERGODICITY}:MC-3`],
    source: eb(ERGODICITY, 'Demonstration 3 — the 10-cycle’s converging time averages versus its perpetually oscillating Pⁿ(0,0), directly breaking TIME-AVERAGE-CONVERGENCE-MEANS-DISTRIBUTION-CONVERGENCE'),
  },
]
