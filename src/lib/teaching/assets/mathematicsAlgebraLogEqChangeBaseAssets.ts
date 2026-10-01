/**
 * Twelfth math.alg asset batch — logarithmic-equations and change-of-base.
 *
 * Continues serving-asset coverage for math.alg (36/59 -> 38/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.logarithmic-equations.md
 * and math.alg.change-of-base.md.
 *
 *   LOGEQ        logarithmic-equations — every candidate must be
 *                checked against the domain of the ORIGINAL logarithms
 *                (arguments strictly positive), never accepted straight
 *                from the exponentiated equation; multi-term logs are
 *                CONDENSED first, never manipulated term-by-term; the
 *                condensing rule matches the log operation to the
 *                correct arithmetic on arguments (sum→product,
 *                difference→quotient), never the reverse.
 *   CHANGEBASE   change-of-base — the original ARGUMENT goes in the
 *                numerator and the original BASE in the denominator,
 *                never flipped (a flipped fraction gives the
 *                reciprocal, a genuinely different number); the choice
 *                of new base is pure computational convenience — ANY
 *                valid base gives the identical final answer, never a
 *                different one. Only 2 misconceptions exist in the EB
 *                entry; MC-1 (the numerator/denominator reversal) is
 *                reused across two probes at different framings per
 *                campaign convention, rather than inventing a false
 *                third misconception.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LOGEQ = 'math.alg.logarithmic-equations'
const CHANGEBASE = 'math.alg.change-of-base'

export const MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOGEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A logarithmic equation has the unknown as the ARGUMENT of a logarithm, and is solved in four '
      + 'stages: CONDENSE any multiple logarithm terms into a single logarithm using the '
      + 'product/quotient/power rules; EXPONENTIATE both sides to eliminate the logarithm entirely; '
      + 'solve the resulting algebraic equation; and CHECK every candidate against the domain '
      + 'requirement that every ORIGINAL logarithm\'s argument must be strictly positive.\n\n'
      + 'This final domain-checking stage is structurally necessary, never optional bookkeeping: '
      + 'exponentiation can produce algebraic candidates that satisfy the exponentiated equation but '
      + 'do not satisfy the domain of the ORIGINAL logarithmic expressions. For log_2(x)+log_2(x−2)=3, '
      + 'condensing and exponentiating gives x²−2x−8=0, so x=4 or x=−2 — but log_2(−2) is undefined, '
      + 'so x=−2 is EXTRANEOUS and must be discarded, regardless of how cleanly it emerged from the '
      + 'algebra. The check interrogates the ORIGINAL equation, never the transformed one.\n\n'
      + 'The condensing step must come FIRST, never after attempting term-by-term manipulation of '
      + 'separate logarithms — for log(x+1)−log(x−1)=log(3), condensing via the quotient rule gives '
      + 'log((x+1)/(x−1))=log(3), which (same base on both sides) lets the arguments be equated '
      + 'directly. The condensing rule matches the operation between logs to the correct operation on '
      + 'arguments: addition of logs condenses via MULTIPLICATION of arguments, subtraction of logs '
      + 'condenses via DIVISION of arguments — never the arguments combined the same way the logs '
      + 'were combined (log(x+1)−log(x−1) is never (x+1)−(x−1)).',
    targetedMisconceptions: [`${LOGEQ}:MC-1`, `${LOGEQ}:MC-2`, `${LOGEQ}:MC-3`],
    source: eb(LOGEQ, 'Core Understanding — solving proceeds condense, exponentiate, solve, domain-check, with the domain check against the original logarithms being structurally necessary, not optional'),
  },
  {
    conceptId: CHANGEBASE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Most calculators compute only base 10 and base e directly, but real problems routinely need '
      + 'logarithms in other bases. The change-of-base formula log_a(x) = log_b(x)/log_b(a) bridges '
      + 'this gap. The formula\'s structure is precise and asymmetric: the ORIGINAL ARGUMENT x goes '
      + 'in the NUMERATOR; the ORIGINAL BASE a goes in the DENOMINATOR — this is not an arbitrary '
      + 'convention, it falls directly out of solving a^y=x for y using logarithms in base b: taking '
      + 'log_b of both sides gives y·log_b(a)=log_b(x), so y=log_b(x)/log_b(a), and y is exactly '
      + 'log_a(x) by definition.\n\n'
      + 'Flipping the fraction does NOT give a differently-formatted but still-valid answer — it '
      + 'gives the RECIPROCAL, a genuinely different number. For log_3(50) via base 10, the correct '
      + 'value is log(50)/log(3)≈3.561; the flipped log(3)/log(50)≈0.281 is the reciprocal, not '
      + 'merely a variant.\n\n'
      + 'The choice of new base b is a matter of computational convenience ONLY — ANY valid base '
      + '(any positive number ≠1) produces the IDENTICAL final numerical answer for log_a(x). '
      + 'Computing log_2(7) via base 10 gives ≈2.807; computing it via base e also gives ≈2.807 — '
      + 'the same one specific real number, never a different one depending on which base was chosen '
      + 'for the calculation.',
    targetedMisconceptions: [`${CHANGEBASE}:MC-1`, `${CHANGEBASE}:MC-2`],
    source: eb(CHANGEBASE, 'Core Understanding — the argument goes in the numerator and the base in the denominator (never flipped, which gives the reciprocal), and any valid new base gives the identical final answer'),
  },
]

export const MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_PROBES: SeedProbe[] = [
  // --- math.alg.logarithmic-equations ------------------------------------------
  {
    conceptId: LOGEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solving log_2(x)+log_2(x−2)=3 gives candidates x=4 and x=−2. Should both be reported as solutions?',
    choices: [
      { text: 'No — check each against the ORIGINAL logarithms: x=4 gives log_2(4)+log_2(2), both defined, valid; x=−2 gives log_2(−2), undefined, so x=−2 is extraneous and discarded', isCorrect: true },
      { text: 'Yes — both candidates satisfy the exponentiated equation x(x−2)=8, so both are valid solutions', isCorrect: false, misconceptionId: `${LOGEQ}:MC-1` },
      { text: 'Yes, since the algebra to reach both candidates was performed correctly', isCorrect: false, misconceptionId: `${LOGEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGEQ}:MC-1`],
    source: eb(LOGEQ, 'Detection probe (Blueprint) — every candidate must be checked against the original logarithms\' domain (arguments strictly positive), never accepted from the exponentiated equation alone'),
  },
  {
    conceptId: LOGEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To solve log(x+1)−log(x−1)=log(3), what should be done first?',
    choices: [
      { text: 'Condense the left side using the quotient rule into log((x+1)/(x−1))=log(3), then equate the arguments directly since both sides share the same base', isCorrect: true },
      { text: 'Attempt to isolate x by manipulating the separate log terms individually', isCorrect: false, misconceptionId: `${LOGEQ}:MC-2` },
      { text: 'Immediately exponentiate each log term separately before combining anything', isCorrect: false, misconceptionId: `${LOGEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${LOGEQ}:MC-2`],
    source: eb(LOGEQ, 'Detection probe (Blueprint) — multi-term logarithmic expressions must be condensed into a single logarithm FIRST, before any other algebraic manipulation is attempted'),
  },
  {
    conceptId: LOGEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Condense log(x+1) − log(x−1) into a single logarithm.',
    choices: [
      { text: 'log((x+1)/(x−1)) — subtraction of logs condenses via DIVISION of the arguments', isCorrect: true },
      { text: 'log((x+1)−(x−1)) — treating the log subtraction as if it distributes over the arguments', isCorrect: false, misconceptionId: `${LOGEQ}:MC-3` },
      { text: 'log(x+1) multiplied by log(x−1), combined into one expression', isCorrect: false, misconceptionId: `${LOGEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${LOGEQ}:MC-3`],
    source: eb(LOGEQ, 'Detection probe (Blueprint) — subtraction of logs condenses via division of arguments, never by subtracting the arguments themselves, which visually resembles ordinary arithmetic but is not the correct rule'),
  },

  // --- math.alg.change-of-base -------------------------------------------
  {
    conceptId: CHANGEBASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Using the change-of-base formula to evaluate log_3(50) with base 10, which quantity goes in the numerator?',
    choices: [
      { text: 'log(50) — the original ARGUMENT (50) goes in the numerator; the original BASE (3) goes in the denominator, giving log(50)/log(3)≈3.561', isCorrect: true },
      { text: 'log(3) — the original base goes in the numerator', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-1` },
      { text: 'It does not matter which goes on top, since both orderings are equally valid', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-1` },
    ],
    targetedMisconceptions: [`${CHANGEBASE}:MC-1`],
    source: eb(CHANGEBASE, 'Detection probe (Blueprint) — the formula\'s structure is asymmetric: the original argument goes in the numerator and the original base in the denominator, derived directly from solving a^y=x'),
  },
  {
    conceptId: CHANGEBASE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A computation of log_3(50) via base 10 gives log(3)/log(50)≈0.281. Is this a valid alternate answer?',
    choices: [
      { text: 'No — this is the fraction flipped (base in the numerator, argument in the denominator), giving the RECIPROCAL of the correct answer (≈3.561), a genuinely different number, not a valid variant', isCorrect: true },
      { text: 'Yes — any way of arranging the numerator and denominator gives an equally valid form of the same answer', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-1` },
      { text: 'Yes, since both fractions use the same two logarithm values', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-1` },
    ],
    targetedMisconceptions: [`${CHANGEBASE}:MC-1`],
    source: eb(CHANGEBASE, 'Detection probe (Blueprint) — flipping the numerator and denominator produces the reciprocal, a genuinely different number from the correct answer, not a cosmetic variant'),
  },
  {
    conceptId: CHANGEBASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing log_2(7) using base 10 gives ≈2.807. If a different calculation used base e instead, what result should it give?',
    choices: [
      { text: 'The identical value, ≈2.807 — the choice of new base is pure computational convenience and never changes the final answer, since log_2(7) is one specific real number', isCorrect: true },
      { text: 'A different value, since base e and base 10 are different bases', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-2` },
      { text: 'A value that is only approximately close, since different bases introduce small unavoidable discrepancies', isCorrect: false, misconceptionId: `${CHANGEBASE}:MC-2` },
    ],
    targetedMisconceptions: [`${CHANGEBASE}:MC-2`],
    source: eb(CHANGEBASE, 'Detection probe (Blueprint) — the choice of new base affects only the computational route, never the final result; any valid base produces the identical answer'),
  },
]
