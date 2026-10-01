/**
 * Batch: partial-sums, geometric-sequence, arithmetic-series (math.seq).
 *
 * Continuing the math.seq domain opened to unblock math.calc (Batches 86-87).
 * This batch prioritizes downstream-unblocking value: math.seq.partial-sums
 * (requires math.seq.series, authored Batch 87) unlocks math.seq.
 * series-convergence and math.seq.telescoping-series; math.seq.
 * geometric-sequence (requires math.seq.sequence, authored Batch 86) unlocks
 * math.seq.geometric-series. math.seq.arithmetic-series (requires math.seq.
 * arithmetic-sequence and math.seq.series, both already authored) closes out
 * the arithmetic-sequence+series combo from Batch 87, though it has no
 * further unlocks of its own (KG unlocks: none).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.seq.{partial-sums,
 * geometric-sequence,arithmetic-series}.md.
 *
 *   PARTIAL-SUMS  partial-sums — the partial-sum sequence {Sn} is a NEW,
 *                 DIFFERENT sequence from the term sequence {an}, recovered
 *                 term-by-term via an=Sn-Sn-1; partial sums need NOT be
 *                 monotone increasing (the alternating harmonic series'
 *                 partial sums oscillate); three distinct objects — term
 *                 sequence, partial-sum sequence, series-sum limit — must
 *                 never be conflated.
 *   GEOMETRIC-SEQUENCE  geometric-sequence — unwinding aₙ=aₙ₋₁·r gives the
 *                 closed form aₙ=a₁·rⁿ⁻¹; sign (oscillation) and magnitude
 *                 (growth vs. decay, from |r| vs. 1) are two INDEPENDENT
 *                 questions, never conflated; the ratio r is the FULL
 *                 multiplicative factor (1+rate), never the bare rate alone.
 *   ARITHMETIC-SERIES  arithmetic-series — the Gauss pairing argument (write
 *                 Sn forward and backward, add column by column) derives
 *                 Sn=n(a1+an)/2 for ANY n, odd or even, since it adds two
 *                 COMPLETE copies of Sn rather than pairing within one copy;
 *                 the sum formula and the term formula aₙ=a₁+(n-1)d answer
 *                 genuinely different questions and must never be conflated.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PARTIAL_SUMS = 'math.seq.partial-sums'
const GEOMETRIC_SEQUENCE = 'math.seq.geometric-sequence'
const ARITHMETIC_SERIES = 'math.seq.arithmetic-series'

export const MATHEMATICS_SEQ_PARTIAL_SUMS_GEOMETRIC_ARITHMETIC_SERIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PARTIAL_SUMS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Given a term sequence {aₙ}, the Nth PARTIAL SUM is Sₙ=a₁+a₂+⋯+aₙ — the total of the first n terms. '
      + 'Crucially, {Sₙ} is a genuinely NEW, DIFFERENT sequence from {aₙ}, indexed by exactly the same n but '
      + 'built by accumulation rather than direct lookup: S₁=a₁, S₂=a₁+a₂, S₃=a₁+a₂+a₃, and so on. Confusing '
      + '{Sₙ} with {aₙ} — or with the SERIES-SUM limit ∑aₙ that {Sₙ} may or may not converge to — conflates '
      + 'three genuinely distinct mathematical objects: the term sequence, the partial-sum sequence, and the '
      + 'series-sum limit.\n\n'
      + 'Any individual term can be RECOVERED from consecutive partial sums via aₙ=Sₙ−Sₙ₋₁ (for n≥2, with '
      + 'a₁=S₁): subtracting away everything already accumulated through the (n−1)th term isolates exactly '
      + 'the nth term. This recovery formula is the precise inverse of how {Sₙ} was built from {aₙ} in the '
      + 'first place.\n\n'
      + 'Partial sums need NOT be monotone increasing, even though "adding more terms" may sound like it '
      + 'should always grow the total. If some terms are negative, Sₙ can decrease from Sₙ₋₁ to Sₙ. The '
      + 'alternating harmonic series 1−½+⅓−¼+⋯ is the canonical counterexample: its partial sums oscillate '
      + 'up and down around their eventual limit (ln 2) rather than climbing steadily — S₁=1, S₂=0.5, '
      + 'S₃≈0.833, S₄≈0.583, and so on, never monotone.',
    targetedMisconceptions: [`${PARTIAL_SUMS}:MC-1`, `${PARTIAL_SUMS}:MC-2`, `${PARTIAL_SUMS}:MC-3`],
    source: eb(PARTIAL_SUMS, 'Core Understanding — the partial-sum sequence Sn is a new/different sequence from the term sequence an, recovered term-by-term via an=Sn-Sn-1, partial sums need not be monotone, and the term sequence, partial-sum sequence, and series-sum limit must never be conflated'),
  },
  {
    conceptId: GEOMETRIC_SEQUENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A geometric sequence is defined by the recursion aₙ=aₙ₋₁·r for a fixed common RATIO r. Unwinding '
      + 'this recursion — a₂=a₁·r, a₃=a₂·r=a₁·r², a₄=a₃·r=a₁·r³ — derives the closed form aₙ=a₁·rⁿ⁻¹ '
      + 'directly, with the exponent n−1 traceable to counting exactly n−1 multiplication steps from a₁ to '
      + 'aₙ (never n itself). This mirrors math.seq.arithmetic-sequence\'s own unwinding derivation of '
      + 'aₙ=a₁+(n−1)d — multiplicative accumulation here, additive accumulation there.\n\n'
      + 'Long-run behavior is entirely determined by r, split into two INDEPENDENT questions — magnitude '
      + 'and sign. For |r|<1: aₙ→0 (DECAY). For |r|>1: |aₙ|→∞ (GROWTH). Separately, for r<0: the sign of '
      + 'rⁿ⁻¹ alternates each step, producing OSCILLATION superimposed on whatever growth/decay magnitude '
      + '|r| determines — sign and magnitude never determine each other. (Boundary cases: r=1 gives a '
      + 'constant sequence; r=0 zeroes every term past a₁; r=−1 oscillates between +a₁ and −a₁ with neither '
      + 'growth nor decay.) This decay-toward-zero case has no arithmetic-sequence analogue, since additive '
      + 'accumulation cannot asymptotically approach a value the way repeated multiplication by a proper '
      + 'fraction does.\n\n'
      + 'Geometric sequences model MULTIPLICATIVE (compound) processes — compound interest, radioactive '
      + 'decay, population growth — with a₁ the starting quantity and r the per-period multiplicative '
      + 'FACTOR. For a 5% annual compound-interest scenario, r=1.05 (the FULL multiplicative factor, '
      + '"keep the existing 100%, plus 5% more") — never the bare rate 0.05 alone, which would replace the '
      + 'entire balance with just the interest earned.',
    targetedMisconceptions: [`${GEOMETRIC_SEQUENCE}:MC-1`, `${GEOMETRIC_SEQUENCE}:MC-2`, `${GEOMETRIC_SEQUENCE}:MC-3`],
    source: eb(GEOMETRIC_SEQUENCE, 'Core Understanding — unwinding the recursion gives the closed form aₙ=a1·r^(n-1), sign and magnitude are independent questions determining oscillation versus growth/decay, and the ratio r is the full multiplicative factor never the bare rate'),
  },
  {
    conceptId: ARITHMETIC_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'math.seq.arithmetic-sequence already owns the term formula aₙ=a₁+(n−1)d, and math.seq.series '
      + 'already owns the general partial-sum definition Sₙ=a₁+a₂+⋯+aₙ. This concept applies the Gauss '
      + 'pairing technique to the arithmetic case specifically, producing a genuine closed-form sum '
      + 'formula — it does not re-derive either prerequisite, and it explicitly separates the SUM (a '
      + 'running total) from the TERM (a single value).\n\n'
      + 'The GAUSS PAIRING ARGUMENT derives the sum formula by writing Sₙ TWICE: forward, '
      + 'Sₙ=a₁+(a₁+d)+⋯+aₙ, and backward, Sₙ=aₙ+(aₙ−d)+⋯+a₁. Adding the two expressions column by column, '
      + 'EVERY column sums to exactly a₁+aₙ — consecutive terms from the front and back always pair to the '
      + 'same total — giving 2Sₙ=n(a₁+aₙ), so Sₙ=n(a₁+aₙ)/2. This works for ANY n, odd or even, because the '
      + 'argument adds two COMPLETE copies of Sₙ (never pairing within a single copy), so no column is ever '
      + 'left unpaired regardless of parity.\n\n'
      + 'Substituting aₙ=a₁+(n−1)d into Sₙ=n(a₁+aₙ)/2 gives the algebraically equivalent second form '
      + 'Sₙ=n(2a₁+(n−1)d)/2 — useful when aₙ itself is unknown but d is known; the choice between the two '
      + 'forms is purely about which avoids an unnecessary extra computation.\n\n'
      + 'The sum and the term are genuinely DIFFERENT objects, growing at different rates: aₙ=a₁+(n−1)d '
      + 'answers "what is the value of the nth term alone?" while Sₙ=n(a₁+aₙ)/2 answers "what is the total '
      + 'of all n terms?" — Sₙ grows approximately as n² while aₙ grows only linearly, a structural '
      + 'difference, not just a notational one.',
    targetedMisconceptions: [`${ARITHMETIC_SERIES}:MC-1`, `${ARITHMETIC_SERIES}:MC-2`, `${ARITHMETIC_SERIES}:MC-3`],
    source: eb(ARITHMETIC_SERIES, 'Core Understanding — the Gauss pairing argument derives Sn=n(a1+an)/2 for any n by adding two complete copies of Sn forward and backward, substituting an=a1+(n-1)d gives an equivalent second form, and the sum and term formulas answer genuinely different questions'),
  },
]

export const MATHEMATICS_SEQ_PARTIAL_SUMS_GEOMETRIC_ARITHMETIC_SERIES_PROBES: SeedProbe[] = [
  {
    conceptId: PARTIAL_SUMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the sequence aₙ=n (so a₁=1,a₂=2,a₃=3,...), is S₃ the same thing as a₃, or something different?',
    choices: [
      { text: 'Different — S₃=a₁+a₂+a₃=1+2+3=6 (the total of the first 3 terms), while a₃=3 (just the third term alone); {Sₙ} is a genuinely new sequence built by accumulation, distinct from {aₙ}', isCorrect: true },
      { text: 'The same — S₃ and a₃ both refer to "the value at index 3", so they must be equal', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-1` },
      { text: 'The same, since the partial-sum sequence is just another name for the original sequence indexed the same way', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-1` },
    ],
    targetedMisconceptions: [`${PARTIAL_SUMS}:MC-1`],
    source: eb(PARTIAL_SUMS, 'Discovery Question — for a concrete sequence, is the partial sum Sn the same object as the term an, or a genuinely different accumulated total'),
  },
  {
    conceptId: PARTIAL_SUMS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the alternating harmonic series 1−½+⅓−¼+⋯, do the partial sums S₁,S₂,S₃,S₄,... always increase as more terms are added?',
    choices: [
      { text: 'No — S₁=1, S₂=0.5, S₃≈0.833, S₄≈0.583: the partial sums oscillate up and down (since some terms being added are negative), never monotone, even though they eventually converge toward ln 2', isCorrect: true },
      { text: 'Yes — adding more terms to a running total always makes the partial sums increase, since you are accumulating more values each time', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-2` },
      { text: 'Yes, because a partial-sum sequence is monotone increasing by definition, regardless of the signs of the terms being summed', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-2` },
    ],
    targetedMisconceptions: [`${PARTIAL_SUMS}:MC-2`],
    source: eb(PARTIAL_SUMS, 'Discovery Question — using the alternating harmonic series as a counterexample, do partial sums always increase as more terms are added'),
  },
  {
    conceptId: PARTIAL_SUMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given S₄=20 and S₅=26 for some sequence, what is a₅, the 5th term?',
    choices: [
      { text: 'a₅=S₅−S₄=26−20=6 — recovering the individual term requires subtracting away everything already accumulated through the previous partial sum, the precise inverse of how {Sₙ} was built from {aₙ}', isCorrect: true },
      { text: 'a₅=S₅=26, since the partial sum at index 5 already tells you the value of the 5th term directly', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-3` },
      { text: 'It cannot be determined, since a₅ and S₅ are the same sequence and no further information distinguishes them', isCorrect: false, misconceptionId: `${PARTIAL_SUMS}:MC-3` },
    ],
    targetedMisconceptions: [`${PARTIAL_SUMS}:MC-3`],
    source: eb(PARTIAL_SUMS, 'Discovery Question — given consecutive partial sums, how do you recover the individual term via an=Sn-Sn-1'),
  },
  {
    conceptId: GEOMETRIC_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a₁=3, r=2, is a₄=3·2⁴=48, or a₄=3·2³=24?',
    choices: [
      { text: 'a₄=3·2³=24 — unwinding the recursion term by term (a₂=6, one multiplication; a₃=12, two; a₄=24, three) shows the exponent counts multiplication STEPS from a₁ to aₙ, always n−1, never n', isCorrect: true },
      { text: 'a₄=3·2⁴=48, since the exponent should equal the term\'s index n directly', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-1` },
      { text: 'Either answer is acceptable, since the exponent convention is just a matter of notation preference', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SEQUENCE}:MC-1`],
    source: eb(GEOMETRIC_SEQUENCE, 'Demonstration 1 — unwinding the recursion from a1=3,r=2 to derive an=3·2^(n-1), directly breaking the exponent-assumed-equal-to-index misconception'),
  },
  {
    conceptId: GEOMETRIC_SEQUENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For r=−2 (negative AND with |r|>1), does the sequence oscillate, grow, both, or neither?',
    choices: [
      { text: 'Both — the negative sign makes it oscillate (alternating positive/negative), and separately |r|=2>1 makes its magnitude grow without bound; sign and magnitude are two independent questions, not one', isCorrect: true },
      { text: 'Only oscillates, since a negative ratio can only ever produce oscillation, never magnitude growth or decay', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-2` },
      { text: 'Only decays, since a negative sign always signals shrinking behavior regardless of the ratio\'s magnitude', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SEQUENCE}:MC-2`],
    source: eb(GEOMETRIC_SEQUENCE, 'Demonstration 2 — the four-way sign/magnitude comparison (r=0.5, r=3, r=-0.5, r=-2), directly breaking the sign-and-magnitude-behavior-conflated misconception'),
  },
  {
    conceptId: GEOMETRIC_SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A $1000 balance earns 5% annual compound interest. What is the correct ratio r to model this as a geometric sequence: r=0.05, or r=1.05?',
    choices: [
      { text: 'r=1.05 — the ratio must be the FULL multiplicative factor, keeping the existing 100% balance plus the 5% growth; after one year, $1000×1.05=$1050, correctly retaining the principal', isCorrect: true },
      { text: 'r=0.05, since that is the stated growth rate and the ratio in a geometric sequence should equal the rate directly', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-3` },
      { text: 'r=0.05, since multiplying by the bare percentage correctly gives the amount of interest earned each year', isCorrect: false, misconceptionId: `${GEOMETRIC_SEQUENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${GEOMETRIC_SEQUENCE}:MC-3`],
    source: eb(GEOMETRIC_SEQUENCE, 'Demonstration 3 — compound interest with the correct multiplicative factor r=1.05, directly breaking the ratio-set-to-bare-growth-rate misconception'),
  },
  {
    conceptId: ARITHMETIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the AP 2,5,8,11,..., what is the sum of the first 4 terms — is it a₄=11, or S₄=26?',
    choices: [
      { text: 'S₄=26 (computed as 2+5+8+11=26, or via S₄=4(2+11)/2=26) — the "find the sum" question requires the SUM formula, a structurally different formula from the term formula a₄=a₁+3d=11', isCorrect: true },
      { text: 'a₄=11, since that is the value produced by the arithmetic-sequence formula just learned, and it is the only formula available for this AP', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-1` },
      { text: 'a₄=11, since the term formula and the sum formula are two different names for computing the identical quantity', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${ARITHMETIC_SERIES}:MC-1`],
    source: eb(ARITHMETIC_SERIES, 'Demonstration 1 — computing both a4=11 and S4=26 explicitly for the same AP, directly breaking the term-formula-as-sum misconception'),
  },
  {
    conceptId: ARITHMETIC_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Gauss pairing argument (writing Sₙ forward and backward and adding) still work when n=5 (an odd number of terms), or does it leave a middle term unpaired?',
    choices: [
      { text: 'It still works perfectly — the argument adds TWO COMPLETE copies of Sₙ (forward and backward), so all 5 columns each sum to a₁+aₙ with nothing ever left over; oddness of n is irrelevant since pairing never happens within a single copy', isCorrect: true },
      { text: 'It fails for odd n, since visually pairing front-to-back within one copy of Sₙ leaves the middle term stranded with no partner', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-2` },
      { text: 'It requires a special adjusted formula whenever n is odd, different from the formula used for even n', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${ARITHMETIC_SERIES}:MC-2`],
    source: eb(ARITHMETIC_SERIES, 'Demonstration 2 — the odd-n verification for n=5, confirming all 5 columns still sum to a1+an, directly breaking the pairing-only-works-for-even-n misconception'),
  },
  {
    conceptId: ARITHMETIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the AP 1,3,5,7,9, computing (a₁+a₅)/2=(1+9)/2=5 — is 5 the sum of all 5 terms, or only part of the computation?',
    choices: [
      { text: 'Only part of the computation — 5 is the AVERAGE term; the actual sum requires multiplying by n=5 as well: S₅=5×5=25, which matches the direct addition 1+3+5+7+9=25', isCorrect: true },
      { text: '5 is the final sum, since (a₁+aₙ)/2 already represents the complete Gauss pairing formula', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-3` },
      { text: '5 is the final sum, since computing the average of the first and last terms is equivalent to computing the total of all terms', isCorrect: false, misconceptionId: `${ARITHMETIC_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${ARITHMETIC_SERIES}:MC-3`],
    source: eb(ARITHMETIC_SERIES, 'Demonstration 3 — the average-versus-total contrast for 1,3,5,7,9, directly breaking the forgetting-n-in-sum misconception'),
  },
]
