/**
 * Batch: random-variable, transition-matrix (math.prob).
 *
 * Opening math.prob's continuation (21/49 -> 23/49) after math.linalg
 * reached 61/61 completion. Fresh frontier recompute found exactly 2 ready
 * concepts: random-variable (unlocks distribution and expected-value,
 * both high-value downstream concepts — the highest-priority pick) and
 * transition-matrix (closes markov-chain's own declared unlock).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{random-variable,
 * transition-matrix}.md.
 *
 *   RANDOM-VARIABLE  X is a FUNCTION Ω→ℝ, never a fixed value; the event
 *           {X=x} is a preimage computed FROM the function, and X itself
 *           is never the same object as its derived distribution; discrete
 *           versus continuous is decided by CARDINALITY of the range,
 *           never by apparent "size."
 *   TRANSITION-MATRIX  Pᵢⱼ is a CONDITIONAL probability (transitioning
 *           FROM i TO j), never a marginal "probability of being in j";
 *           n-step probabilities require GENUINE matrix exponentiation
 *           (Pⁿ), never n×Pᵢⱼ; irreducibility means EVENTUAL reachability
 *           in SOME number of steps, never specifically "all Pᵢⱼ>0" in one
 *           step.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RANDOM_VARIABLE = 'math.prob.random-variable'
const TRANSITION_MATRIX = 'math.prob.transition-matrix'

export const MATHEMATICS_PROB_RANDOM_VARIABLE_TRANSITION_MATRIX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RANDOM_VARIABLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A RANDOM VARIABLE IS A FUNCTION, NEVER A FIXED NUMBER: for a die roll, Ω={1,…,6} and '
      + 'X(ω)=ω defines X as the RULE mapping every outcome to a number — X(4)=4 is a VALUE, '
      + 'P(X=4)=P({4})=1/6 is a PROBABILITY, but X ITSELF is the entire function, never reducible '
      + 'to any single output. Writing "X=4" says nothing about what happens when ω=1,2,3,5,6 — '
      + 'only "X:{1,…,6}→ℝ, X(ω)=ω for all ω" fully defines the random variable.\n\n'
      + 'THE EVENT {X=x} IS A PREIMAGE, COMPUTED FROM THE FUNCTION, NEVER THE FUNCTION ITSELF: for '
      + 'two dice with S(i,j)=i+j, {S=7}={(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)} — the SET of '
      + 'outcomes mapping to 7 under S — giving P(S=7)=6/36=1/6. The random variable S (the '
      + 'function) and its DISTRIBUTION (the table of probabilities P(S=x) for each x) are '
      + 'genuinely DIFFERENT objects: S comes first, the distribution is DERIVED by computing '
      + 'P({ω:S(ω)=x}) for each x — never the reverse.\n\n'
      + 'DISCRETE VERSUS CONTINUOUS IS DECIDED BY CARDINALITY OF THE RANGE, NEVER BY "SIZE": a die '
      + 'roll’s range {1,…,6} is finite hence DISCRETE; the number of heads in infinite flips has '
      + 'range {0,1,2,…}, countably infinite, still DISCRETE; a randomly chosen person’s height '
      + 'has an UNCOUNTABLE range (an interval), hence CONTINUOUS — even though {0,1,…,10000} is a '
      + 'much "bigger-looking" set than [0,1], the countable set is discrete and the small '
      + 'interval is continuous. Countability decides the classification, never apparent '
      + 'magnitude.',
    targetedMisconceptions: [`${RANDOM_VARIABLE}:MC-1`, `${RANDOM_VARIABLE}:MC-2`, `${RANDOM_VARIABLE}:MC-3`],
    source: eb(RANDOM_VARIABLE, 'Core Understanding — a random variable as a function never a fixed value, the event {X=x} as a preimage genuinely distinct from the derived distribution, and discrete-versus-continuous decided by cardinality never apparent size'),
  },
  {
    conceptId: TRANSITION_MATRIX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Pᵢⱼ IS A CONDITIONAL PROBABILITY — TRANSITIONING FROM i TO j, NEVER A MARGINAL "BEING IN '
      + 'j": for the weather chain P=[[0.7,0.2,0.1],[0.3,0.4,0.3],[0.2,0.3,0.5]] '
      + '(Sunny/Cloudy/Rainy): P_SR=0.1 means "GIVEN today is Sunny, probability tomorrow is '
      + 'Rainy" — never "the probability of being Rainy" in isolation. Each ROW sums to 1 (from '
      + 'any state, the chain must go SOMEWHERE), never each column.\n\n'
      + 'n-STEP PROBABILITIES REQUIRE GENUINE MATRIX EXPONENTIATION, NEVER LINEAR SCALING: for a '
      + '2-state chain P=[[0.6,0.4],[0.2,0.8]]: P⁽²⁾₁₂=(P²)₁₂=P₁₁P₁₂+P₁₂P₂₂=0.6(0.4)+0.4(0.8)='
      + '0.24+0.32=0.56 — computed by SUMMING over every intermediate state k, never 2×P₁₂=0.8. '
      + 'The Chapman-Kolmogorov equation Pᵐ⁺ⁿ=Pᵐ·Pⁿ formalizes this: moving m steps then n steps '
      + 'equals moving m+n steps directly, verified by matrix multiplication, never addition or '
      + 'scalar scaling.\n\n'
      + 'IRREDUCIBILITY MEANS EVENTUAL REACHABILITY, NEVER "ALL Pᵢⱼ>0 IN ONE STEP": for '
      + 'P=[[0,1],[1,0]] (states alternate): P₁₁=0 and P₂₂=0, yet P₁₂=1 and P₂₁=1 — states 1 and 2 '
      + 'communicate directly (each reachable from the other in ONE step), so this chain IS '
      + 'irreducible, despite having zero diagonal entries. Separately, for '
      + 'P=[[0,1,0],[0.5,0,0.5],[0,0.5,0.5]]: P₁₃=0 (unreachable in one step), but '
      + '(P²)₁₃=P₁₁P₁₃+P₁₂P₂₃+P₁₃P₃₃=0+0.5(0.5)+0=0.25>0 — reachable in TWO steps, so states 1 '
      + 'and 3 STILL communicate. Irreducibility requires only that SOME power P⁽ⁿ⁾ has a positive '
      + '(i,j) entry, never that n=1 specifically.',
    targetedMisconceptions: [`${TRANSITION_MATRIX}:MC-1`, `${TRANSITION_MATRIX}:MC-2`, `${TRANSITION_MATRIX}:MC-3`],
    source: eb(TRANSITION_MATRIX, 'Core Understanding — Pᵢⱼ as a conditional transition probability never a marginal, n-step probabilities requiring genuine matrix exponentiation never linear scaling, and irreducibility meaning eventual multi-step reachability never specifically one-step positivity'),
  },
]

export const MATHEMATICS_PROB_RANDOM_VARIABLE_TRANSITION_MATRIX_PROBES: SeedProbe[] = [
  {
    conceptId: RANDOM_VARIABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a die roll with Ω={1,…,6} and X(ω)=ω, does writing "X=4" fully define the random variable X?',
    choices: [
      { text: 'No — X is the entire function X:{1,…,6}→ℝ mapping EVERY outcome to a number; "X=4" only says X(4)=4, saying nothing about ω=1,2,3,5,6', isCorrect: true },
      { text: 'Yes — writing "X=4" fully specifies the random variable, since 4 is the value X is currently equal to', isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-1` },
      { text: "Yes, since a random variable is just an ordinary algebraic variable that happens to take the value 4 in this case", isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-1` },
    ],
    targetedMisconceptions: [`${RANDOM_VARIABLE}:MC-1`],
    source: eb(RANDOM_VARIABLE, 'Demonstration 1 — X(1)=1,…,X(6)=6 for a die roll, the full mapping never a single value, directly breaking RV-IS-FIXED-VALUE'),
  },
  {
    conceptId: RANDOM_VARIABLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a fair coin with X(H)=1, X(T)=0, is the random variable X the same object as its probability distribution P(X=0)=P(X=1)=0.5?',
    choices: [
      { text: 'No — X (the function mapping outcomes to numbers) and its distribution (the derived table of probabilities) are genuinely DIFFERENT objects; X comes first, and the distribution is COMPUTED from it, never the reverse', isCorrect: true },
      { text: 'Yes — the random variable X and its probability distribution are simply two names for the same underlying mathematical object', isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-2` },
      { text: "Yes, since the distribution table is what actually gets used in calculations, making it effectively the same thing as X itself", isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-2` },
    ],
    targetedMisconceptions: [`${RANDOM_VARIABLE}:MC-2`],
    source: eb(RANDOM_VARIABLE, 'Demonstration 2 — for a fair coin, X(H)=1,X(T)=0 as the function versus P(X=0)=P(X=1)=0.5 as the derived distribution, directly breaking RV-IS-DISTRIBUTION'),
  },
  {
    conceptId: RANDOM_VARIABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a random variable with range {0,1,…,10000} (10,001 possible values) continuous, since it has so many values, while one with range [0,1] is discrete, since the interval looks "small"?',
    choices: [
      { text: 'No — the reverse is true: {0,1,…,10000} is finite hence COUNTABLE, so it is DISCRETE, while [0,1] is an UNCOUNTABLE interval, so it is CONTINUOUS; countability decides the classification, never apparent size', isCorrect: true },
      { text: 'Yes — the "bigger-looking" set {0,1,…,10000} is continuous, while the "smaller-looking" interval [0,1] is discrete', isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-3` },
      { text: "It depends on which set has more total possible outcomes, which in this case is {0,1,…,10000}, making it continuous", isCorrect: false, misconceptionId: `${RANDOM_VARIABLE}:MC-3` },
    ],
    targetedMisconceptions: [`${RANDOM_VARIABLE}:MC-3`],
    source: eb(RANDOM_VARIABLE, 'Demonstration 3 — {0,1,…,10000} (large, countable, DISCRETE) versus [0,1] (small, uncountable, CONTINUOUS), directly breaking DISCRETE-MEANS-SMALL'),
  },
  {
    conceptId: TRANSITION_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the weather chain with P_SR=0.1 (Sunny row, Rainy column), what does this entry mean?',
    choices: [
      { text: 'GIVEN today is Sunny, the probability tomorrow is Rainy is 0.1 — a CONDITIONAL probability of transitioning FROM Sunny TO Rainy, never a standalone "probability of being Rainy"', isCorrect: true },
      { text: 'The overall probability that it is Rainy, considered on its own without reference to today’s weather', isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-1` },
      { text: "The probability that it was Rainy yesterday, given it is Sunny today", isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANSITION_MATRIX}:MC-1`],
    source: eb(TRANSITION_MATRIX, 'Demonstration 1 — the weather chain’s P_SR=0.1 read as a conditional probability, with row-sum-to-1 verified, directly breaking P-IJ-IS-THE-PROBABILITY-OF-BEING-IN-STATE-J'),
  },
  {
    conceptId: TRANSITION_MATRIX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the 2-state chain P=[[0.6,0.4],[0.2,0.8]], what is the 2-step transition probability P⁽²⁾₁₂?',
    choices: [
      { text: '0.56 — computed as (P²)₁₂=P₁₁P₁₂+P₁₂P₂₂=0.6(0.4)+0.4(0.8)=0.24+0.32=0.56, summing over every intermediate state, never a linear-scaling shortcut', isCorrect: true },
      { text: '0.8 — computed as 2×P₁₂=2×0.4=0.8, scaling the one-step probability linearly by the number of steps', isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-2` },
      { text: "0.4 — the same as the one-step probability P₁₂, since additional steps don't change the transition probability", isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-2` },
    ],
    targetedMisconceptions: [`${TRANSITION_MATRIX}:MC-2`],
    source: eb(TRANSITION_MATRIX, 'Demonstration 2 — the 2-state chain’s P⁽²⁾₁₂=0.56 computed via summing over intermediate states, versus the wrong 0.8 from linear scaling, directly breaking N-STEP-PROBABILITY-IS-N-TIMES-ONE-STEP'),
  },
  {
    conceptId: TRANSITION_MATRIX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For P=[[0,1],[1,0]] (an alternating 2-state chain, so P₁₁=0 and P₂₂=0), is this chain irreducible?',
    choices: [
      { text: 'Yes — states 1 and 2 communicate directly since P₁₂=1 and P₂₁=1 (each reachable from the other in ONE step); irreducibility requires only SOME power P⁽ⁿ⁾ to have a positive entry, never that every Pᵢⱼ itself be positive', isCorrect: true },
      { text: 'No — since P₁₁=0 and P₂₂=0 (not every entry of P is positive), the chain cannot be irreducible', isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-3` },
      { text: "No, because a chain is only irreducible if it is possible to stay in the same state for at least one step", isCorrect: false, misconceptionId: `${TRANSITION_MATRIX}:MC-3` },
    ],
    targetedMisconceptions: [`${TRANSITION_MATRIX}:MC-3`],
    source: eb(TRANSITION_MATRIX, 'Demonstration 3 — the alternating 2-state chain’s irreducibility despite zero diagonal entries, and the 3-state chain’s 2-step reachability despite a zero 1-step entry, directly breaking IRREDUCIBLE-MEANS-ALL-TRANSITION-PROBABILITIES-ARE-POSITIVE'),
  },
]
