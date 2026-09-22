/**
 * Fifteenth math.alg asset batch — pascals-triangle and rationalizing-denominators.
 *
 * Continues serving-asset coverage for math.alg (42/59 -> 44/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.pascals-triangle.md
 * and math.alg.rationalizing-denominators.md.
 *
 *   PASCALS      pascals-triangle — row and position are both
 *                0-INDEXED, never 1-indexed despite the everyday
 *                "first row/first entry" instinct; edge entries are
 *                DEFINED as 1, never computed by the sum-the-two-above
 *                rule. Only 2 misconceptions exist in the EB entry;
 *                MC-1 (indexing) is reused across two probes at
 *                different framings per campaign convention.
 *   RATIONALIZE  rationalizing-denominators — the multiplier must
 *                exactly match the denominator's own radical, never an
 *                unrelated one; a binomial radical denominator needs
 *                its CONJUGATE, never the radical alone (which leaves a
 *                radical term behind); forming a conjugate flips ONLY
 *                the connecting sign, never both signs or the wrong
 *                one.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PASCALS = 'math.alg.pascals-triangle'
const RATIONALIZE = 'math.alg.rationalizing-denominators'

export const MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PASCALS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Pascal\'s Triangle is a triangular array where every entry equals the SUM of the two entries '
      + 'directly above it, with each row\'s two outer edges always equal to 1. Counting rows '
      + 'starting at n=0 for the single-entry top row, row n contains exactly the binomial '
      + 'coefficients C(n,0), C(n,1), ..., C(n,n) in order — the entry at position k (also starting '
      + 'at k=0) of row n IS C(n,k). Both the row and the position are 0-INDEXED, never 1-indexed — '
      + 'the visual layout invites everyday "first row, first entry" counting language, but the '
      + 'mathematical convention is that the single-entry top row is row 0, not row 1.\n\n'
      + 'The addition rule is not arbitrary: C(n,k)=C(n−1,k−1)+C(n−1,k) is a genuine combinatorial '
      + 'identity — choosing k items from n either INCLUDES one specific fixed item (leaving '
      + 'C(n−1,k−1) ways for the rest) or EXCLUDES it (leaving C(n−1,k) ways), and these two '
      + 'mutually exclusive, exhaustive cases add.\n\n'
      + 'Edge entries are DEFINED as 1, NEVER computed by the sum rule — an edge position has at '
      + 'most one entry diagonally above it, not two, so "sum the two above" simply does not apply '
      + 'there; the construction rule is genuinely two parts: edges fixed at 1, interior entries '
      + 'summed.',
    targetedMisconceptions: [`${PASCALS}:MC-1`, `${PASCALS}:MC-2`],
    source: eb(PASCALS, 'Core Understanding — row and position are both 0-indexed, and edge entries are defined as 1 rather than computed by the interior sum rule'),
  },
  {
    conceptId: RATIONALIZE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Rationalizing a denominator means rewriting a fraction so its denominator contains no '
      + 'radical, without changing the fraction\'s value — multiplying numerator and denominator by '
      + 'the identical nonzero quantity is always multiplying by 1, changing FORM but never VALUE.\n\n'
      + 'For a denominator that is a single radical term, the multiplier must be that SAME radical '
      + '(never an unrelated one) — 3/√5 becomes (3√5)/5 by multiplying by √5, since √5×√5=5 '
      + 'eliminates the radical directly.\n\n'
      + 'For a denominator that is a binomial containing a radical (a+√b), multiplying by the '
      + 'radical alone does NOT work — expanding (a+√b)(√b) still leaves a radical term. Instead, '
      + 'the multiplier must be the CONJUGATE, a−√b, chosen specifically because (a+√b)(a−√b) is a '
      + 'difference of squares, a²−b, which eliminates the radical entirely by cancelling the cross '
      + 'terms a radical-alone multiplication leaves behind.\n\n'
      + 'Forming a conjugate means flipping ONLY the sign BETWEEN the two terms, never both signs '
      + 'and never the wrong one — the conjugate of a+√b is a−√b, never −a−√b or −a+√b.',
    targetedMisconceptions: [`${RATIONALIZE}:MC-1`, `${RATIONALIZE}:MC-2`, `${RATIONALIZE}:MC-3`],
    source: eb(RATIONALIZE, 'Core Understanding — the multiplier must exactly match the denominator\'s radical for a single term, a binomial radical denominator needs its conjugate, and forming a conjugate flips only the connecting sign'),
  },
]

export const MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_PROBES: SeedProbe[] = [
  // --- math.alg.pascals-triangle ------------------------------------------
  {
    conceptId: PASCALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Using Pascal\'s Triangle to find C(5,2), which row should you use — the row labeled "row 5" using everyday first-second-third counting from the top, or the row found by counting rows starting at 0?',
    choices: [
      { text: 'Count starting at 0 — the single-entry top row is row 0, so the correct row 5 is the SIXTH row down from the top, not the fifth', isCorrect: true },
      { text: 'The row labeled "row 5" using everyday 1-indexed counting from the top (the fifth row down)', isCorrect: false, misconceptionId: `${PASCALS}:MC-1` },
      { text: 'It does not matter which counting convention is used, as long as it is applied consistently within one problem', isCorrect: false, misconceptionId: `${PASCALS}:MC-1` },
    ],
    targetedMisconceptions: [`${PASCALS}:MC-1`],
    source: eb(PASCALS, 'Detection probe — row and position in Pascal\'s Triangle are both 0-indexed, conflicting with the everyday 1-indexed "first row" counting the visual layout invites'),
  },
  {
    conceptId: PASCALS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Row 5 of Pascal\'s Triangle is 1,5,10,10,5,1. To find C(5,2), which entry do you read?',
    choices: [
      { text: 'The entry at position k=2, counting positions from 0: that is the THIRD entry, 10', isCorrect: true },
      { text: 'The entry at the 2nd position counting from 1: that is 5', isCorrect: false, misconceptionId: `${PASCALS}:MC-1` },
      { text: 'The 2nd entry from the right instead of the left, since the direction of counting does not matter', isCorrect: false, misconceptionId: `${PASCALS}:MC-1` },
    ],
    targetedMisconceptions: [`${PASCALS}:MC-1`],
    source: eb(PASCALS, 'Verification of death — given a novel C(n,k) lookup, the learner correctly identifies the right 0-indexed row and position on the first attempt'),
  },
  {
    conceptId: PASCALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Constructing row 4 of Pascal\'s Triangle from row 3 (1,3,3,1), how should the first and last entries of row 4 be found?',
    choices: [
      { text: 'They are simply set to 1 by definition — the edges are never computed by summing, since an edge position has at most one entry diagonally above it, not two', isCorrect: true },
      { text: 'By summing the two entries above, exactly like every other entry in the row', isCorrect: false, misconceptionId: `${PASCALS}:MC-2` },
      { text: 'By summing the single entry above with itself', isCorrect: false, misconceptionId: `${PASCALS}:MC-2` },
    ],
    targetedMisconceptions: [`${PASCALS}:MC-2`],
    source: eb(PASCALS, 'Detection probe (Blueprint) — edge entries are defined as 1, never computed by the sum-the-two-above rule, which has no clear meaning at a boundary position'),
  },

  // --- math.alg.rationalizing-denominators -------------------------------------------
  {
    conceptId: RATIONALIZE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To rationalize 3/√5, what should numerator and denominator be multiplied by?',
    choices: [
      { text: '√5 — the exact same radical as the denominator, since √5×√5=5 eliminates the radical directly', isCorrect: true },
      { text: 'Any radical, such as √3, since multiplying by a radical always clears a radical denominator', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-1` },
      { text: 'The number 5 alone, without a radical', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIONALIZE}:MC-1`],
    source: eb(RATIONALIZE, 'Detection probe (Blueprint P41) — the multiplier must be exactly the denominator\'s own radical, never an unrelated or mismatched one'),
  },
  {
    conceptId: RATIONALIZE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To rationalize 2/(3+√2), can you multiply top and bottom by √2 alone, the way you would for a single-term radical denominator?',
    choices: [
      { text: 'No — expanding (3+√2)(√2) still leaves a radical term (3√2+2); for a binomial denominator, multiply instead by the CONJUGATE 3−√2, so (3+√2)(3−√2)=9−2=7 has no radical left', isCorrect: true },
      { text: 'Yes — the same single-radical technique that worked before always works, regardless of the denominator\'s shape', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-2` },
      { text: 'Yes, since √2 appears in the denominator and multiplying by it should always eliminate a radical', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIONALIZE}:MC-2`],
    source: eb(RATIONALIZE, 'Detection probe (Blueprint P41) — the single-radical technique fails on a binomial denominator; the conjugate is required instead, triggering the difference-of-squares identity'),
  },
  {
    conceptId: RATIONALIZE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the conjugate of 3+√2?',
    choices: [
      { text: '3−√2 — only the sign BETWEEN the two terms is flipped; each term\'s own value stays the same', isCorrect: true },
      { text: '−3−√2 — both signs in the expression are flipped', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-3` },
      { text: '−3+√2 — the sign of the first term alone is flipped', isCorrect: false, misconceptionId: `${RATIONALIZE}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIONALIZE}:MC-3`],
    source: eb(RATIONALIZE, 'Detection probe (Blueprint P41) — forming a conjugate flips only the sign between the two terms, never both signs or the wrong one'),
  },
]
