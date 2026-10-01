/**
 * Batch: bayes-theorem, lln, markov-chain (math.prob).
 *
 * Continues the math.prob domain opened in Batch 96. Prioritized for
 * downstream-unblocking value: math.prob.bayes-theorem (requires
 * conditional-probability + total-probability, both authored) unlocks
 * bayesian-inference in both math.prob and math.stats (2 unlocks);
 * math.prob.lln (requires chebyshev + independence, both authored) unlocks
 * clt (the Central Limit Theorem); math.prob.markov-chain (requires
 * conditional-probability + math.linalg.matrix-multiplication, both
 * already authored) has no further KG unlocks but is a major standalone
 * application concept.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.{bayes-theorem,lln,
 * markov-chain}.md.
 *
 *   BAYES-THEOREM  bayes-theorem — the POSTERIOR P(B|A) is NEVER the same
 *             as the LIKELIHOOD P(A|B); a small PRIOR keeps the posterior
 *             far below a test's headline sensitivity (base-rate neglect
 *             inverts this); Bayes generalizes directly to n hypotheses,
 *             never limited to the binary two-hypothesis case.
 *   LLN  lln — the Law of Large Numbers is a LIMIT statement, never a
 *             finite-n guarantee of exact equality; the gambler's fallacy
 *             mistakes DILUTION (future averaging) for COMPENSATION (coins
 *             have no memory, nothing is ever "owed"); WEAK LLN
 *             (convergence in probability, per-n) and STRONG LLN (almost
 *             sure convergence, the whole path) are genuinely DIFFERENT,
 *             non-equivalent claims.
 *   MARKOV-CHAIN  markov-chain — the Markov property demands the CURRENT
 *             state be FULLY sufficient, never merely "weighted most
 *             heavily" (recency is not Markov); multi-step probabilities
 *             require genuine MATRIX POWERS (Pⁿ), never linear scaling by
 *             n; a well-behaved chain's starting state can WASH OUT over
 *             time, reaching the same stationary distribution regardless
 *             of where it began.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BAYES_THEOREM = 'math.prob.bayes-theorem'
const LLN = 'math.prob.lln'
const MARKOV_CHAIN = 'math.prob.markov-chain'

export const MATHEMATICS_PROB_BAYES_THEOREM_LLN_MARKOV_CHAIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BAYES_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BAYES\' THEOREM INVERTS A CONDITIONAL PROBABILITY VIA A TRIVIAL REARRANGEMENT: from '
      + 'P(A∩B)=P(B|A)P(A)=P(A|B)P(B), dividing by P(A) gives P(B|A)=P(A|B)P(B)/P(A). Four named '
      + 'quantities: PRIOR P(B) (belief before evidence), LIKELIHOOD P(A|B) (probability of the '
      + 'evidence given B), POSTERIOR P(B|A) (updated belief), and EVIDENCE P(A) (the normalizing '
      + 'denominator, computed via the law of total probability when unknown directly).\n\n'
      + 'THE POSTERIOR IS NEVER THE SAME AS THE LIKELIHOOD — THE PRIOR DOES THE HEAVY LIFTING: '
      + 'for a disease with 1% prevalence, sensitivity P(+|D)=0.95, false-positive rate '
      + 'P(+|Dᶜ)=0.10: P(+)=0.95(0.01)+0.10(0.99)=0.1085, so P(D|+)=0.0095/0.1085≈8.8% — NOT '
      + '95%. The 95% sensitivity is P(+|D); the posterior P(D|+) is a genuinely different '
      + 'quantity, driven heavily by the small 1% prior.\n\n'
      + 'BAYES GENERALIZES DIRECTLY TO n HYPOTHESES, NEVER JUST A BINARY PAIR: for a partition '
      + '{B₁,...,Bₙ}, P(Bᵢ|A)=P(A|Bᵢ)P(Bᵢ)/∑ⱼP(A|Bⱼ)P(Bⱼ) — the two-hypothesis form (B,Bᶜ) is the '
      + 'special case n=2, never the limit of the method. For three machines producing '
      + 'defectives at rates 2%, 5%, 8% with proportions 50%, 30%, 20%: given a defective is '
      + 'found, P(machine A|defective)=0.010/(0.010+0.015+0.016)≈24% — the identical structure '
      + 'with n terms in the denominator, not a fundamentally different computation.',
    targetedMisconceptions: [`${BAYES_THEOREM}:MC-1`, `${BAYES_THEOREM}:MC-2`, `${BAYES_THEOREM}:MC-3`],
    source: eb(BAYES_THEOREM, 'Core Understanding — Bayes\' theorem derived via a trivial rearrangement of the conditional-probability formula, the posterior never equaling the likelihood since a small prior keeps it low, and Bayes generalizing directly to n hypotheses via a partition'),
  },
  {
    conceptId: LLN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'LLN IS A LIMIT STATEMENT — NEVER A FINITE-n GUARANTEE OF EXACT EQUALITY: after 5 '
      + 'fair-coin flips all landing heads, X̄₅=1 (badly off from μ=0.5). Continuing to flip '
      + 'FAIRLY, suppose the next 95 flips give 48 heads: X̄₁₀₀=(5+48)/100=0.53 — much closer to '
      + '0.5, NOT because the coin "owed" tails, but because the initial 5-heads streak is now '
      + 'just 5 out of 100 flips, DILUTED by the other 95 normal flips. LLN guarantees the '
      + 'PROBABILITY of a large deviation shrinks toward 0, never that the deviation becomes '
      + 'impossible at any finite n.\n\n'
      + 'THE GAMBLER\'S FALLACY MISTAKES DILUTION FOR COMPENSATION: after 6 heads in a row, the '
      + '7th flip remains exactly 50/50 — the coin has no memory and does not "owe" a tails. The '
      + 'average returning toward 0.5 over many MORE flips happens purely through dilution: a '
      + 'streak of 6 heads followed by 994 roughly-fair flips (about 497 heads) gives '
      + '(6+497)/1000≈0.503 — close to 0.5 not because any future flip was biased toward tails, '
      + 'but because the fixed streak of 6 became a tiny fraction of 1000 total flips.\n\n'
      + 'WEAK AND STRONG LLN ARE GENUINELY DIFFERENT, NON-EQUIVALENT CLAIMS: WLLN says for every '
      + 'ε>0, P(|X̄ₙ−μ|≥ε)→0 as n→∞ — re-evaluated separately at each n. SLLN says '
      + 'P(lim X̄ₙ=μ)=1 — a statement about the ENTIRE infinite sequence of running averages, '
      + 'viewed as one path, converging with probability 1. SLLN implies WLLN, never the reverse '
      + 'in general.',
    targetedMisconceptions: [`${LLN}:MC-1`, `${LLN}:MC-2`, `${LLN}:MC-3`],
    source: eb(LLN, 'Core Understanding — the Law of Large Numbers as a limit statement never a finite-n exact-equality guarantee, the gambler\'s fallacy mistaking dilution for compensation, and weak versus strong LLN as genuinely different non-equivalent convergence claims'),
  },
  {
    conceptId: MARKOV_CHAIN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE MARKOV PROPERTY IS A CLAIM ABOUT SUFFICIENCY, NEVER MERE RECENCY: a weather model '
      + 'where tomorrow depends only on TODAY genuinely satisfies the Markov property. Contrast '
      + 'a sequence where the NEXT exam score depends on the AVERAGE of the last THREE scores — '
      + 'under the state "single most recent score," this is NOT Markov, since the other two '
      + 'recent scores carry genuine additional predictive information the current state alone '
      + 'discards. The property demands the CURRENT state be FULLY sufficient, never merely '
      + '"weighted most heavily."\n\n'
      + 'MULTI-STEP PROBABILITIES REQUIRE GENUINE MATRIX POWERS, NEVER LINEAR SCALING: for a '
      + '2-state weather chain with one-step P(S→R)=0.2, the TWO-step probability is the (S,R) '
      + 'entry of P², computed as 0.28 — NOT 2×0.2=0.4 as naive scaling would suggest. Each '
      + 'intermediate step genuinely branches across every possible state, and matrix '
      + 'multiplication is exactly the operation that correctly sums over those branches.\n\n'
      + 'THE STARTING STATE\'S INFLUENCE CAN WASH OUT OVER TIME (ORIENTATION LEVEL): iterating '
      + 'the same 2-state chain, the distribution empirically approaches a fixed limit '
      + 'regardless of starting state. Solving πP=π gives π=(2/3,1/3) — the SAME stationary '
      + 'distribution reached whether starting Sunny or Rainy. Full treatment of when and why '
      + 'this holds is deferred to stationary-distribution and ergodicity.',
    targetedMisconceptions: [`${MARKOV_CHAIN}:MC-1`, `${MARKOV_CHAIN}:MC-2`, `${MARKOV_CHAIN}:MC-3`],
    source: eb(MARKOV_CHAIN, 'Core Understanding — the Markov property as a claim about the current state\'s full sufficiency rather than mere recency, multi-step probabilities requiring genuine matrix powers rather than linear scaling, and a chain\'s starting-state influence washing out toward the same stationary distribution'),
  },
]

export const MATHEMATICS_PROB_BAYES_THEOREM_LLN_MARKOV_CHAIN_PROBES: SeedProbe[] = [
  {
    conceptId: BAYES_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A disease test has 95% sensitivity (P(+|disease)=0.95). Given a positive test result, is P(disease|+) also 95%?',
    choices: [
      { text: 'No — the posterior P(disease|+) is a genuinely different quantity from the likelihood P(+|disease); with a rare 1% prior, applying Bayes\' theorem gives P(disease|+)≈8.8%, far below the 95% sensitivity', isCorrect: true },
      { text: 'Yes — P(B|A) and P(A|B) are algebraically the same quantity, so the sensitivity directly answers the posterior question', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-1` },
      { text: 'Yes, since a test\'s headline accuracy figure is defined to be exactly the same as the probability of disease given a positive result', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${BAYES_THEOREM}:MC-1`],
    source: eb(BAYES_THEOREM, 'Demonstration 1 — the frequency-table breakdown showing only 9 of 108 total positives have the disease despite 90%+ sensitivity, directly breaking posterior-equals-likelihood'),
  },
  {
    conceptId: BAYES_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'With sensitivity and specificity held fixed, does changing a disease\'s prevalence (prior) from 50% to 0.1% change the posterior P(disease|+)?',
    choices: [
      { text: 'Yes, dramatically — at 50% prevalence P(disease|+)≈64%, but at 0.1% prevalence P(disease|+)≈0.9%; the prior drives large swings in the posterior even with identical sensitivity/specificity', isCorrect: true },
      { text: 'No — as long as the test\'s sensitivity and specificity stay the same, the posterior probability of disease given a positive result stays the same too', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-2` },
      { text: 'No, since the posterior is entirely determined by the test\'s own accuracy figures and does not depend on how common the condition actually is', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${BAYES_THEOREM}:MC-2`],
    source: eb(BAYES_THEOREM, 'Demonstration 2 — varying the prior from 50% to 0.1% showing large swings in the posterior with identical sensitivity/specificity, directly breaking base-rate-neglect'),
  },
  {
    conceptId: BAYES_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Three machines produce defectives at rates 2%, 5%, 8%, with shares 50%, 30%, 20%. Given a defective is found, does Bayes\' theorem only work for exactly two hypotheses, or can it identify which machine most likely produced it among all three?',
    choices: [
      { text: 'Bayes generalizes directly to n hypotheses — for a partition {B₁,...,Bₙ}, P(Bᵢ|A)=P(A|Bᵢ)P(Bᵢ)/∑ⱼP(A|Bⱼ)P(Bⱼ); here P(machine A|defective)=0.010/(0.010+0.015+0.016)≈24%, the identical structure with three terms in the denominator', isCorrect: true },
      { text: 'Bayes\' theorem only applies when there are exactly two possible hypotheses, so a three-machine scenario would require pairing them up two at a time', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-3` },
      { text: 'A fundamentally different formula, unrelated to the two-hypothesis version, would be needed to handle three or more possible causes', isCorrect: false, misconceptionId: `${BAYES_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${BAYES_THEOREM}:MC-3`],
    source: eb(BAYES_THEOREM, 'Demonstration 3 — the three-machine generalized-Bayes example extending the identical structure to n hypotheses, directly breaking Bayes-only-works-for-two-hypotheses'),
  },
  {
    conceptId: LLN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'After a billion fair coin flips, will the sample mean X̄ₙ equal exactly 0.5?',
    choices: [
      { text: 'No — LLN is a LIMIT statement, never a finite-n guarantee of exact equality; a billion flips landing exactly 500 million heads is one specific outcome among astronomically many close alternatives, never guaranteed', isCorrect: true },
      { text: 'Yes — after enough trials, the Law of Large Numbers guarantees the sample mean becomes exactly indistinguishable from the true mean', isCorrect: false, misconceptionId: `${LLN}:MC-1` },
      { text: 'Yes, since LLN is a statement that the sample mean reaches the exact target value once the sample size is sufficiently large', isCorrect: false, misconceptionId: `${LLN}:MC-1` },
    ],
    targetedMisconceptions: [`${LLN}:MC-1`],
    source: eb(LLN, 'Demonstration 1 — a billion coin flips landing exactly 500 million heads being one outcome among astronomically many close alternatives, never guaranteed, directly breaking LLN-means-eventual-exact-equality'),
  },
  {
    conceptId: LLN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A fair coin has landed heads 6 times in a row. Is tails more likely on the next flip, to balance out the average?',
    choices: [
      { text: 'No — the coin has no memory; the 7th flip remains exactly 50/50. The average returning toward 0.5 over many MORE flips happens through DILUTION (the streak becomes a tiny fraction of many more flips), never through any future flip being biased toward tails', isCorrect: true },
      { text: 'Yes — after a streak of one outcome, the Law of Large Numbers makes the opposite outcome more likely on the next flip, to compensate and restore the average', isCorrect: false, misconceptionId: `${LLN}:MC-2` },
      { text: 'Yes, since the coin is now statistically "due" for tails after such an unusual run of heads in a row', isCorrect: false, misconceptionId: `${LLN}:MC-2` },
    ],
    targetedMisconceptions: [`${LLN}:MC-2`],
    source: eb(LLN, 'Demonstration 2 — the streak-of-6-diluted-by-994 arithmetic reaching approximately 0.503 with zero compensating bias on any individual flip, directly breaking the gambler\'s fallacy'),
  },
  {
    conceptId: LLN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is there a real difference between the Weak Law of Large Numbers (WLLN) and the Strong Law of Large Numbers (SLLN), or do they say the same thing?',
    choices: [
      { text: 'They are genuinely different, non-equivalent claims — WLLN says P(|X̄ₙ−μ|≥ε)→0 for each n separately, while SLLN says P(lim X̄ₙ=μ)=1, a statement about the ENTIRE infinite path at once; SLLN implies WLLN, never the reverse in general', isCorrect: true },
      { text: 'They say exactly the same thing, since both are described as "the sample mean converges to μ" and use the identical mathematical content underneath', isCorrect: false, misconceptionId: `${LLN}:MC-3` },
      { text: 'They are identical claims that merely differ in how confidently each one is typically stated in textbooks', isCorrect: false, misconceptionId: `${LLN}:MC-3` },
    ],
    targetedMisconceptions: [`${LLN}:MC-3`],
    source: eb(LLN, 'Demonstration 3 — WLLN\'s per-n probability statement contrasted directly against SLLN\'s whole-path almost-sure statement, directly breaking weak-strong-LLN-identical'),
  },
  {
    conceptId: MARKOV_CHAIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A sequence\'s next exam score depends on the AVERAGE of the last three scores. Under the state "single most recent score," is this sequence Markov, since the most recent score weighs heavily?',
    choices: [
      { text: 'No — the Markov property demands the current state be FULLY sufficient, never merely "weighted most heavily"; the other two recent scores carry genuine additional predictive information the single most-recent-score state discards', isCorrect: true },
      { text: 'Yes — as long as the most recent value influences the next one more than earlier values do, the sequence satisfies the Markov property', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-1` },
      { text: 'Yes, since "the current state matters most" and "the current state fully determines the next step" are the same claim about a sequence', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-1` },
    ],
    targetedMisconceptions: [`${MARKOV_CHAIN}:MC-1`],
    source: eb(MARKOV_CHAIN, 'Demonstration 1 — the weather model (genuinely Markov) versus the exam-score-average sequence (not Markov under a single-score state), directly breaking recency-mistaken-for-Markov'),
  },
  {
    conceptId: MARKOV_CHAIN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 2-state weather chain has one-step P(Sunny→Rainy)=0.2. Is the two-step probability simply 2×0.2=0.4?',
    choices: [
      { text: 'No — multi-step probabilities require genuine MATRIX POWERS, never linear scaling; the two-step probability is the correct entry of P², computed as 0.28, since each intermediate step genuinely branches across every possible state', isCorrect: true },
      { text: 'Yes — the n-step transition probability is always simply n times the one-step probability, since the chain repeats the same transition n times', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-2` },
      { text: 'Yes, because doing something twice in a Markov chain always means doubling the corresponding one-step probability directly', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-2` },
    ],
    targetedMisconceptions: [`${MARKOV_CHAIN}:MC-2`],
    source: eb(MARKOV_CHAIN, 'Demonstration 2 — the 2-state weather chain\'s two-step probability computed correctly as 0.28 via P^2 versus the wrong 0.4 from linear scaling, directly breaking multi-step-probability-linearly-scaled'),
  },
  {
    conceptId: MARKOV_CHAIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must a Markov chain\'s long-run behavior always depend on which state it started in?',
    choices: [
      { text: 'No — for a well-behaved chain, the starting state\'s influence can WASH OUT over time; the same 2-state weather chain reaches the identical stationary distribution (2/3,1/3) whether it starts Sunny or Rainy', isCorrect: true },
      { text: 'Yes — a Markov chain\'s long-run behavior is permanently determined by its starting state, no matter how many steps have elapsed', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-3` },
      { text: 'Yes, since the starting state is one of the chain\'s defining parameters and must therefore persist in shaping its behavior forever', isCorrect: false, misconceptionId: `${MARKOV_CHAIN}:MC-3` },
    ],
    targetedMisconceptions: [`${MARKOV_CHAIN}:MC-3`],
    source: eb(MARKOV_CHAIN, 'Demonstration 3 — the same chain\'s stationary distribution (2/3,1/3) reached from either starting state, directly breaking long-run-behavior-assumed-start-dependent'),
  },
]
