/**
 * Batch: series (partial sums, nth-term test), convergent sequences
 * (epsilon-N definition), and arithmetic sequences — all math.seq.
 *
 * All three become ready off already-authored math.seq.sequence (prior
 * batch); math.seq.convergent also needs math.calc.limits (already
 * authored, much earlier in this campaign). math.seq.series directly
 * unblocks math.seq.arithmetic-series and math.seq.geometric-series
 * next, plus (combined with math.trig.trig-functions and math.calc.
 * definite-integral, both already authored) math.calc.fourier-series-
 * intro — a further step back into math.calc's blocked chain. math.seq.
 * convergent unblocks math.seq.series-convergence next. math.seq.
 * arithmetic-sequence unblocks math.seq.arithmetic-series (jointly with
 * series).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.seq.series.md,
 * math.seq.convergent.md, and math.seq.arithmetic-sequence.md.
 *
 *   SERIES    series — a series is a running SUM (the limit of partial
 *             sums), never the same object as its underlying sequence (a
 *             fixed list of terms); infinitely many additions CAN sum to
 *             a finite total when the terms shrink fast enough, never
 *             automatically infinite just because the summing never
 *             stops; the nth-term test's true direction is "terms not
 *             vanishing means DEFINITELY diverges" — terms vanishing is
 *             NECESSARY but never SUFFICIENT for convergence, and the
 *             harmonic series is the standing counterexample to the
 *             false converse.
 *   CONVERGENT convergent — a sequence's limit L can be ANY real number,
 *             never assumed to be zero just because many textbook
 *             examples happen to converge there; "convergent implies
 *             bounded" is true, but its converse "bounded implies
 *             convergent" is FALSE — an oscillating bounded sequence
 *             like (-1)ⁿ never settles; convergence means the DISTANCE
 *             to L shrinks below any tolerance forever, never that the
 *             terms eventually EQUAL L exactly.
 *   ARITHSEQ  arithmetic-sequence — the closed form aₙ=a₁+(n-1)d comes
 *             from counting (n-1) applications of d, never n applications
 *             — a₁ itself already represents zero added d's; an
 *             arithmetic sequence with negative d decreases WITHOUT
 *             BOUND, never leveling off toward a limit the way geometric
 *             decay does — addition by a fixed amount structurally
 *             cannot approach a finite value; simple (flat-amount) and
 *             compound (percentage-of-balance) interest are genuinely
 *             different sequence types, never interchangeable "interest."
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SERIES = 'math.seq.series'
const CONVERGENT = 'math.seq.convergent'
const ARITHSEQ = 'math.seq.arithmetic-sequence'

export const MATHEMATICS_SEQ_SERIES_CONVERGENT_ARITHMETIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A series Σaₙ is the sum of a sequence\'s terms, DEFINED as the limit of partial sums '
      + 'Sₙ=a₁+a₂+...+aₙ: Σaₙ=lim(n→∞)Sₙ. The series converges if this limit exists and is finite, and '
      + 'diverges otherwise. A series is NEVER the same object as its underlying sequence: the sequence '
      + '{aₙ} is a fixed LIST, while the series is that list\'s accumulating RUNNING TOTAL — same '
      + 'numbers, two genuinely different mathematical objects.\n\n'
      + 'Infinitely many additions CAN sum to a finite total when the terms shrink fast enough — never '
      + 'automatically infinite just because the summing never stops. For Σ(1/2)ⁿ, the partial sums '
      + '1/2, 3/4, 7/8, 15/16,... approach (but never reach) 1, exactly like Zeno\'s paradox: infinitely '
      + 'many steps, finite total, because the steps shrink fast enough.\n\n'
      + 'The nth-term test gives ONE rigorous, one-directional implication: if Σaₙ converges, then '
      + 'aₙ→0. Its contrapositive is useful: if aₙ does not approach 0, the series definitely diverges. '
      + 'But the CONVERSE IS FALSE: aₙ→0 does NOT guarantee convergence — the harmonic series Σ1/n has '
      + 'terms vanishing to 0, yet its partial sums grow without bound (provable by grouping terms into '
      + 'blocks each exceeding 1/2). Terms vanishing is NECESSARY but never SUFFICIENT for convergence.',
    targetedMisconceptions: [`${SERIES}:MC-1`, `${SERIES}:MC-2`, `${SERIES}:MC-3`],
    source: eb(SERIES, 'Core Understanding — a series is the running-sum limit of partial sums genuinely distinct from its underlying sequence, infinitely many shrinking terms can sum to a finite total, and terms vanishing is necessary but never sufficient for convergence per the nth-term test\'s one-directional logic'),
  },
  {
    conceptId: CONVERGENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A sequence {aₙ} converges to L if, for every ε>0, there exists N such that |aₙ-L|<ε for all '
      + 'n>N. This limit L can be ANY real number — 5, -3, π, or 0 — never assumed to be zero just '
      + 'because many textbook examples happen to converge there. For aₙ=3+1/n, the vanishing 1/n is a '
      + 'CORRECTION term; the backbone constant 3 is what remains as n→∞, giving limit 3, never 0.\n\n'
      + 'Every convergent sequence is bounded — a true theorem. But its CONVERSE IS FALSE: a bounded '
      + 'sequence need not converge. The oscillating (-1)ⁿ is bounded between -1 and 1, yet never '
      + 'settles near any single value — direct evidence that boundedness alone cannot rule out '
      + 'oscillation. The correct positive statement adds monotonicity: bounded AND monotone together '
      + 'guarantee convergence (Monotone Convergence Theorem).\n\n'
      + 'Convergence means the DISTANCE to L shrinks below any tolerance FOREVER, never that the terms '
      + 'eventually EQUAL L exactly. For aₙ=1/n, no finite n ever makes aₙ exactly 0 (it stays positive '
      + 'always) — yet for any ε>0, |aₙ-0|<ε once n is large enough. Convergence is about arbitrarily '
      + 'close, never about arriving.',
    targetedMisconceptions: [`${CONVERGENT}:MC-1`, `${CONVERGENT}:MC-2`, `${CONVERGENT}:MC-3`],
    source: eb(CONVERGENT, 'Core Understanding — a sequence\'s limit can be any real number never assumed zero, convergent implies bounded but the converse is false as oscillating sequences show, and convergence means the distance to the limit shrinks forever rather than the terms eventually equaling the limit'),
  },
  {
    conceptId: ARITHSEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An arithmetic sequence follows aₙ=aₙ₋₁+d for a fixed common difference d. Unwinding this '
      + 'recursion — a₂=a₁+d, a₃=a₁+2d, a₄=a₁+3d — gives the closed form aₙ=a₁+(n-1)d, where the count '
      + 'is (n-1), never n: a₁ itself already represents ZERO added d\'s, a₂ represents one, so aₙ '
      + 'represents exactly (n-1).\n\n'
      + 'Long-run behavior is classified entirely by the sign of d: positive d produces unbounded '
      + 'increase, negative d produces unbounded DECREASE, and d=0 produces a constant sequence. There '
      + 'is NO decay-toward-a-limit case for arithmetic sequences — a structural consequence of addition '
      + 'rather than multiplication. For a₁=10,d=-2, the sequence continues 10,8,6,4,2,0,-2,-4,... past '
      + 'zero without bound, NEVER leveling off the way a geometric sequence with r=0.5 approaches (but '
      + 'never reaches) zero.\n\n'
      + 'Simple interest (a fixed dollar amount added each period) and compound interest (a fixed '
      + 'percentage of the CURRENT, growing balance) are genuinely DIFFERENT sequence types — additive '
      + '(arithmetic) versus multiplicative (geometric) — never interchangeable just because both are '
      + 'colloquially called "interest." $1000 at 5% for 3 years reaches $1150 simple (arithmetic) but '
      + '$1157.625 compound (geometric) — a small but genuine numerical gap from the structural '
      + 'difference.',
    targetedMisconceptions: [`${ARITHSEQ}:MC-1`, `${ARITHSEQ}:MC-2`, `${ARITHSEQ}:MC-3`],
    source: eb(ARITHSEQ, 'Core Understanding — the closed form counts exactly (n-1) applications of the common difference never n, an arithmetic sequence with negative d decreases without bound rather than leveling off, and simple versus compound interest are genuinely different additive versus multiplicative sequence types'),
  },
]

export const MATHEMATICS_SEQ_SERIES_CONVERGENT_ARITHMETIC_PROBES: SeedProbe[] = [
  // --- math.seq.series ------------------------------------------
  {
    conceptId: SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the sequence (1/2,1/4,1/8,...) the same object as the series 1/2+1/4+1/8+...? What\'s different about them, even though they use the same numbers?',
    choices: [
      { text: 'No — the sequence is a fixed LIST of terms, while the series is that list\'s accumulating RUNNING TOTAL (1/2, then 3/4, then 7/8, ...); same numbers, two genuinely different mathematical objects, never the same thing just written differently', isCorrect: true },
      { text: 'Yes — a series is simply the sequence written with plus signs instead of commas, a purely notational difference', isCorrect: false, misconceptionId: `${SERIES}:MC-1` },
      { text: 'Yes, since both objects are built from the identical terms and therefore represent the same mathematical quantity', isCorrect: false, misconceptionId: `${SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${SERIES}:MC-1`],
    source: eb(SERIES, 'Discovery Question 1 — is the sequence (1/2,1/4,1/8,...) the same object as the series 1/2+1/4+1/8+..., what\'s different about them, even though they use the same numbers'),
  },
  {
    conceptId: SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does 1/2+1/4+1/8+1/16+... ever exceed 1? Compute the first five partial sums and see what they approach.',
    choices: [
      { text: 'No — the partial sums 1/2, 3/4, 7/8, 15/16, 31/32 approach but never exceed 1; infinitely many additions can sum to a FINITE total when the terms shrink fast enough, exactly like Zeno\'s paradox reaching the wall in finite time despite infinitely many steps', isCorrect: true },
      { text: 'Yes — since you are adding infinitely many positive terms, the sum must eventually exceed any finite bound, including 1', isCorrect: false, misconceptionId: `${SERIES}:MC-2` },
      { text: 'The sum cannot be determined, since an infinite sum of positive numbers is always undefined', isCorrect: false, misconceptionId: `${SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${SERIES}:MC-2`],
    source: eb(SERIES, 'Discovery Question 2 — does 1/2+1/4+1/8+1/16+... ever exceed 1; compute the first five partial sums and see what they approach'),
  },
  {
    conceptId: SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The harmonic series 1+1/2+1/3+... has terms that shrink to 0. Does that guarantee it converges?',
    choices: [
      { text: 'No — grouping the harmonic series\' terms into blocks that each exceed 1/2 shows the partial sums grow without bound despite every individual term vanishing; terms going to 0 is NECESSARY but never SUFFICIENT for convergence, and the harmonic series is the standing counterexample to the false converse', isCorrect: true },
      { text: 'Yes — since the nth-term test says a series converges whenever its terms approach zero, the harmonic series must converge', isCorrect: false, misconceptionId: `${SERIES}:MC-3` },
      { text: 'Yes, since any series whose terms shrink toward zero automatically has a finite, well-defined sum', isCorrect: false, misconceptionId: `${SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${SERIES}:MC-3`],
    source: eb(SERIES, 'Discovery Question 3 — the harmonic series 1+1/2+1/3+... has terms that shrink to 0, does that guarantee it converges; try grouping the terms into blocks that each add up to at least 1/2'),
  },

  // --- math.seq.convergent ------------------------------------------
  {
    conceptId: CONVERGENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The sequence aₙ=3+1/n has terms 4, 3.5, 3.33,.... Does it converge to 0, or to something else?',
    choices: [
      { text: 'To 3 — the 1/n term is a vanishing CORRECTION, and the backbone constant 3 is what remains as n→∞; a sequence\'s limit can be ANY real number, never assumed to be 0 just because the vanishing part visibly shrinks to zero', isCorrect: true },
      { text: 'To 0 — since the 1/n part of the formula goes to zero, the entire sequence converges to zero', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-1` },
      { text: 'The sequence does not converge at all, since it contains a term that changes with n', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVERGENT}:MC-1`],
    source: eb(CONVERGENT, 'Discovery Question 1 — the sequence a_n=3+1/n has terms 4, 3.5, 3.33,...; does it converge to 0, or to something else; what role does the 1/n part actually play'),
  },
  {
    conceptId: CONVERGENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is (-1)ⁿ bounded? Does it converge? Can a sequence be bounded without converging?',
    choices: [
      { text: 'Yes, it is bounded (between -1 and 1), but it does NOT converge — it oscillates forever between +1 and -1, settling near no single value; "convergent implies bounded" is true, but its CONVERSE "bounded implies convergent" is FALSE', isCorrect: true },
      { text: 'Yes, it is bounded, and boundedness alone is sufficient to guarantee that (-1)ⁿ converges', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-2` },
      { text: 'No, (-1)ⁿ is not bounded, since its values alternate rather than staying within any fixed range', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVERGENT}:MC-2`],
    source: eb(CONVERGENT, 'Discovery Question 2 — is (-1)^n bounded; does it converge; can a sequence be bounded without converging'),
  },
  {
    conceptId: CONVERGENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For aₙ=1/n, is there any finite n where aₙ is exactly 0? If not, in what sense does the sequence "converge to 0"?',
    choices: [
      { text: 'No finite n ever makes aₙ exactly 0 (it stays positive always) — yet for any ε>0, |aₙ-0|<ε once n is large enough; convergence means the DISTANCE to the limit shrinks below any tolerance FOREVER, never that the terms eventually EQUAL the limit exactly', isCorrect: true },
      { text: 'Yes — eventually, for sufficiently large n, the sequence aₙ=1/n literally becomes exactly 0', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-3` },
      { text: 'The sequence "converges to 0" simply means it gets close enough to 0 that the exact difference stops mattering for any practical calculation', isCorrect: false, misconceptionId: `${CONVERGENT}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVERGENT}:MC-3`],
    source: eb(CONVERGENT, 'Discovery Question 3 — for a_n=1/n, is there any finite n where a_n is exactly 0; if not, in what sense does the sequence converge to 0'),
  },

  // --- math.seq.arithmetic-sequence ------------------------------------------
  {
    conceptId: ARITHSEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Starting from a₁, how many times do you add d to reach a₂? To reach a₃? To reach aₙ? Is it n times, or something else?',
    choices: [
      { text: '(n-1) times — a₁ itself already represents ZERO added d\'s, a₂ has ONE, a₃ has TWO, so aₙ has exactly (n-1); the closed form is aₙ=a₁+(n-1)d, never a₁+nd', isCorrect: true },
      { text: 'n times — since aₙ is the nth term, d must be added exactly n times to reach it from a₁', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-1` },
      { text: '(n+1) times, since the first term a₁ itself counts as one addition of d before the sequence even begins', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${ARITHSEQ}:MC-1`],
    source: eb(ARITHSEQ, 'Discovery Question 1 — starting from a_1, how many times do you add d to reach a_2, to reach a_3, to reach a_n, is it n times, or something else'),
  },
  {
    conceptId: ARITHSEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a₁=10 and d=-2, does this sequence ever level off, or does it keep decreasing forever? Compare to a geometric sequence with r=0.5 — does that one level off?',
    choices: [
      { text: 'It keeps decreasing FOREVER, without bound: 10,8,6,4,2,0,-2,-4,... continuing past zero indefinitely; unlike geometric decay (r=0.5 approaches but never reaches zero), addition by a fixed nonzero amount structurally CANNOT approach a finite limit — there is no decay-toward-a-limit case for arithmetic sequences', isCorrect: true },
      { text: 'It levels off and approaches zero, the same way the geometric sequence with r=0.5 does, since both sequences are decreasing', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-2` },
      { text: 'It levels off at exactly a₁=10, since the common difference does not actually change the sequence\'s long-run resting value', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${ARITHSEQ}:MC-2`],
    source: eb(ARITHSEQ, 'Discovery Question 2 — if a_1=10 and d=-2, does this sequence ever level off, or does it keep decreasing forever; compare this to a geometric sequence with r=0.5, does that one level off'),
  },
  {
    conceptId: ARITHSEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A bank pays a flat $50 every year on your $1000 deposit, versus another bank paying 5% of your current balance every year. After a few years, are these the same amount of money?',
    choices: [
      { text: 'No — the flat-$50 bank is ARITHMETIC (a fixed dollar amount added each period, simple interest), while the 5%-of-balance bank is GEOMETRIC (a fixed percentage of a growing balance, compound interest); these are genuinely different sequence types, never interchangeable just because both are called "interest"', isCorrect: true },
      { text: 'Yes — both banks pay "interest," so the two accounts will always accumulate to the identical amount over any number of years', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-3` },
      { text: 'Yes, since a fixed dollar amount and a fixed percentage always produce mathematically equivalent growth patterns over time', isCorrect: false, misconceptionId: `${ARITHSEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${ARITHSEQ}:MC-3`],
    source: eb(ARITHSEQ, 'Discovery Question 3 — a bank pays you a flat $50 every year on your $1000 deposit, versus another bank that pays 5% of your current balance every year; after a few years, are these the same amount of money; which sequence type models each bank'),
  },
]
