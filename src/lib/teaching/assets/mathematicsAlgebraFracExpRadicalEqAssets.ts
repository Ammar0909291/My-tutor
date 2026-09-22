/**
 * Twenty-first math.alg asset batch — fractional-exponent and radical-equations.
 *
 * Continues serving-asset coverage for math.alg (54/59 -> 56/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.fractional-exponent.md
 * and math.alg.radical-equations.md.
 *
 *   FRACEXP      fractional-exponent — the DENOMINATOR is always the
 *                root index and the NUMERATOR is always the power,
 *                never the reverse; taking the root first keeps numbers
 *                smaller and is preferred, never defaulted away from
 *                without comparing. Only 2 misconceptions exist in the
 *                EB entry; MC-2 (role-swap) is reused across two probes
 *                at different framings per campaign convention.
 *   RADICALEQ    radical-equations — a radical must be ISOLATED before
 *                squaring, never squared while still accompanied by
 *                another term; every candidate solution must be checked
 *                against the ORIGINAL unsquared equation, since
 *                squaring loses sign information and can manufacture
 *                extraneous solutions, never accepted from the squared
 *                equation alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FRACEXP = 'math.alg.fractional-exponent'
const RADICALEQ = 'math.alg.radical-equations'

export const MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FRACEXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A fractional exponent a^(m/n) is defined to agree with radical notation exactly: '
      + 'a^(m/n) = ⁿ√(a^m), equivalently (ⁿ√a)^m — these are provably equal by the power-of-a-power '
      + 'rule, never a coincidence to memorize twice. The bottom number of the fraction, n, is '
      + 'ALWAYS the root\'s index; the top number, m, is ALWAYS the power — NEVER the reverse. For '
      + '16^(3/4), the correct computation is (⁴√16)³, never (∛16)⁴, since 4 (the denominator) is '
      + 'the root and 3 (the numerator) is the power.\n\n'
      + 'Because both computation orders reach the identical answer, the practical choice is a '
      + 'matter of arithmetic convenience: taking the ROOT FIRST shrinks the base to a small number '
      + 'before any exponentiation happens, while raising to the power first can produce an '
      + 'enormous intermediate value. For 27^(4/3), computing (∛27)⁴=3⁴=81 stays small throughout, '
      + 'while ∛(27⁴)=∛531,441=81 reaches the same answer through a much larger intermediate '
      + 'number — root-first is the more efficient default whenever a genuine choice exists.',
    targetedMisconceptions: [`${FRACEXP}:MC-1`, `${FRACEXP}:MC-2`],
    source: eb(FRACEXP, 'Core Understanding — the denominator is always the root index and the numerator always the power, and taking the root first generally keeps intermediate numbers smaller'),
  },
  {
    conceptId: RADICALEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A radical equation is solved by isolating the radical, then squaring both sides — this '
      + 'works because squaring a matching-index radical cancels it. The isolation step must happen '
      + 'BEFORE squaring, never as optional cleanup afterward: squaring an expression that still '
      + 'contains an un-isolated radical, like √(2x−1)+3, does NOT eliminate it — it produces '
      + '(2x−1)+6√(2x−1)+9, a messier expression that still carries the radical inside a middle '
      + 'term.\n\n'
      + 'The structurally important fact this concept introduces: squaring is NOT reversible, since '
      + 'it discards sign information — both a=b and a=−b square to the identical a²=b². This means '
      + 'squaring both sides can manufacture a solution that satisfies the SQUARED equation without '
      + 'satisfying the ORIGINAL one — an extraneous solution. This is not a rare edge case; the '
      + 'check against the ORIGINAL, unsquared equation is a REQUIRED final stage, never optional '
      + 'verification — a radical equation is not solved until every candidate has been '
      + 'individually confirmed against the equation as originally written.',
    targetedMisconceptions: [`${RADICALEQ}:MC-1`, `${RADICALEQ}:MC-2`, `${RADICALEQ}:MC-3`],
    source: eb(RADICALEQ, 'Core Understanding — a radical must be isolated before squaring, and every candidate must be checked against the original equation since squaring discards sign information and can manufacture extraneous solutions'),
  },
]

export const MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_PROBES: SeedProbe[] = [
  // --- math.alg.fractional-exponent ------------------------------------------
  {
    conceptId: FRACEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For 16^(3/4), which number is the root index and which is the power?',
    choices: [
      { text: '4 (the denominator) is the root index, 3 (the numerator) is the power, giving (⁴√16)³ = 2³ = 8', isCorrect: true },
      { text: '3 (the numerator) is the root index, 4 (the denominator) is the power, giving (∛16)⁴', isCorrect: false, misconceptionId: `${FRACEXP}:MC-2` },
      { text: 'It does not matter which number plays which role, since both give the same final answer', isCorrect: false, misconceptionId: `${FRACEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${FRACEXP}:MC-2`],
    source: eb(FRACEXP, 'Detection probe (Blueprint P41) — the denominator of a fractional exponent is always the root index and the numerator is always the power, never the reverse'),
  },
  {
    conceptId: FRACEXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Evaluating 8^(2/3), should the exponent 2 be treated as the root index or the power?',
    choices: [
      { text: 'The power — 3 (the denominator) is the root index, so 8^(2/3) = (∛8)² = 2² = 4', isCorrect: true },
      { text: 'The root index — giving 8^(2/3) = (²√8)³, an incorrect reading that swaps the roles', isCorrect: false, misconceptionId: `${FRACEXP}:MC-2` },
      { text: 'Either role is valid depending on which is more convenient to compute', isCorrect: false, misconceptionId: `${FRACEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${FRACEXP}:MC-2`],
    source: eb(FRACEXP, 'Verification of death — given a new fractional exponent, the learner labels which number is the root index (denominator) and which is the power (numerator) correctly before computing'),
  },
  {
    conceptId: FRACEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Evaluating 27^(4/3), which computation order keeps the intermediate numbers smaller?',
    choices: [
      { text: 'Root first: (∛27)⁴ = 3⁴ = 81, keeping every intermediate number small', isCorrect: true },
      { text: 'Power first: ∛(27⁴) = ∛531,441, which reaches the same answer but through a much larger intermediate number', isCorrect: false, misconceptionId: `${FRACEXP}:MC-1` },
      { text: 'Both orders involve equally large intermediate numbers, so the choice makes no practical difference', isCorrect: false, misconceptionId: `${FRACEXP}:MC-1` },
    ],
    targetedMisconceptions: [`${FRACEXP}:MC-1`],
    source: eb(FRACEXP, 'Detection probe (Blueprint P77 item 2) — taking the root first generally keeps intermediate numbers smaller than raising to the power first, even though both orders are mathematically equivalent'),
  },

  // --- math.alg.radical-equations -------------------------------------------
  {
    conceptId: RADICALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solving √(2x−1)+3=x, should you square both sides immediately as written?',
    choices: [
      { text: 'No — isolate the radical first (subtract 3: √(2x−1)=x−3), since squaring while the radical is still accompanied by another term does not eliminate it', isCorrect: true },
      { text: 'Yes — squaring the equation as written eliminates the radical directly', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-2` },
      { text: 'Yes, since squaring each term separately (the radical term and the 3) always works', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${RADICALEQ}:MC-2`],
    source: eb(RADICALEQ, 'Detection probe (Blueprint P41) — a radical must be isolated before squaring; squaring a sum containing an un-isolated radical produces a middle term that still carries the radical'),
  },
  {
    conceptId: RADICALEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solving √(x+2)=x by squaring gives candidates x=2 and x=−1. Should both be reported as solutions?',
    choices: [
      { text: 'No — check each individually against the ORIGINAL equation: x=2 gives √4=2 ✓, but x=−1 gives √1=1≠−1, so x=−1 is extraneous and must be discarded', isCorrect: true },
      { text: 'Yes — both candidates correctly solve the squared equation, so both are valid solutions', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-1` },
      { text: 'Yes, since squaring is a fully reversible operation that never introduces extra solutions', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${RADICALEQ}:MC-1`],
    source: eb(RADICALEQ, 'Detection probe (Blueprint P41) — every candidate from a squared equation must be individually checked against the original, unsquared equation, since squaring can manufacture extraneous solutions'),
  },
  {
    conceptId: RADICALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After isolating a radical, you need to square (x−3). What is the correct expansion?',
    choices: [
      { text: 'x²−6x+9 — the full binomial square (a−b)²=a²−2ab+b², including the middle term', isCorrect: true },
      { text: 'x²−9 — squaring each term separately and dropping the middle term', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-3` },
      { text: 'x²+9 — squaring each term separately with a sign change', isCorrect: false, misconceptionId: `${RADICALEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${RADICALEQ}:MC-3`],
    source: eb(RADICALEQ, 'Detection probe (Blueprint P41) — a squared binomial must be expanded using the full (a−b)²=a²−2ab+b² pattern, including the middle term, never term-by-term as if squaring distributed over addition'),
  },
]
