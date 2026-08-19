/**
 * Eighteenth batch — the last of math.arith, plus two from number theory.
 *
 * This batch CLOSES math.arith: every authored Educational Brain entry in
 * the domain will have serving assets behind it.
 *
 *   FRACTIONS   fraction-simplification, fraction-addition. The two
 *               operations where a learner who "knows fractions" still
 *               reliably gets the wrong answer, for opposite reasons —
 *               stopping too early, and not converting at all.
 *   SIGNED      integer-arithmetic. Where sign rules meet notation and
 *               −3² turns out not to be what it looks like.
 *   FLUENCY     mental-arithmetic. Strategy chosen from the numbers in
 *               front of you, not from habit — and the compensation you
 *               must remember to undo.
 *   MAGNITUDE   irrational-roots, scientific-notation. What a decimal
 *               approximation is NOT, and how to carry a number whose
 *               size is the point.
 *   NUMBER      composite-number, divisibility-rules. 1 is neither prime
 *               nor composite, and the rule for 3 is not the rule for 9.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FSIMP = 'math.arith.fraction-simplification'
const FADD = 'math.arith.fraction-addition'
const IARITH = 'math.arith.integer-arithmetic'
const MARITH = 'math.arith.mental-arithmetic'
const IROOT = 'math.arith.irrational-roots'
const SCIN = 'math.arith.scientific-notation'
const COMP = 'math.nt.composite-number'
const DIVR = 'math.nt.divisibility-rules'

export const MATHEMATICS_ARITH_CLOSE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FSIMP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Simplifying a fraction means dividing top and bottom by the SAME number. 12/18 → 6/9 '
      + 'by halving both, and the value has not changed because you scaled numerator and '
      + 'denominator identically — dividing only one of them makes a different fraction '
      + 'entirely.\n\n'
      + '6/9 is not finished. Both are divisible by 3, giving 2/3, and "lowest terms" means '
      + 'no common factor is left. Stopping at the first cancellation you notice is the '
      + 'commonest outcome here, and it is why the reliable method is to divide by the '
      + 'GREATEST common divisor in one move: gcd(12, 18) = 6, so 12/18 = 2/3 directly.\n\n'
      + 'The obvious small factors are not the whole story. 51/68 looks simplified because '
      + 'neither number is even and neither ends in 5 — but 51 = 3 × 17 and 68 = 4 × 17, so '
      + 'it reduces to 3/4. Checking only 2, 3 and 5 leaves fractions like this looking done '
      + 'when they are not, which is exactly why the gcd is worth computing rather than '
      + 'guessed at.',
    targetedMisconceptions: [`${FSIMP}:MC-1`, `${FSIMP}:MC-3`],
    source: eb(FSIMP, 'Identity + Misconception register — lowest terms, and the non-obvious common factor'),
  },
  {
    conceptId: FADD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'You can only add fractions that count the same thing. 1/4 + 2/4 = 3/4 because both are '
      + 'quarters — three of them. When the denominators differ you must first rewrite both '
      + 'in a shared unit.\n\n'
      + 'Adding tops and bottoms is therefore not addition of anything: 1/2 + 1/3 is not 2/5. '
      + 'A quick check settles it — 2/5 is less than 1/2, and adding a positive amount to a '
      + 'half cannot land below it. The right move is a common denominator of 6, giving 3/6 + '
      + '2/6 = 5/6.\n\n'
      + 'When you convert a denominator, the numerator must be scaled BY THE SAME FACTOR, '
      + 'because that is what keeps the value fixed. Turning 1/2 into sixths multiplies the '
      + 'bottom by 3, so the top becomes 3, not 1 — leaving it as 1/6 has silently changed '
      + 'the number. And each fraction gets its OWN factor: here 1/2 is scaled by 3 and 1/3 '
      + 'by 2, so swapping them scales both wrongly and the arithmetic that follows is beyond '
      + 'rescue.',
    targetedMisconceptions: [`${FADD}:MC-1`, `${FADD}:MC-2`],
    source: eb(FADD, 'Identity + Misconception register — same unit first; rescale the numerator too'),
  },
  {
    conceptId: IARITH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Integer arithmetic is the four operations on positive and negative whole numbers, and '
      + 'the sign rules are short: like signs multiply to a positive, unlike signs to a '
      + 'negative. (−4) × (−3) = 12 and (−4) × 3 = −12, and division behaves identically.\n\n'
      + 'With several factors, counting the negatives works: an even number of them gives a '
      + 'positive and an odd number a negative, since they cancel in pairs. That trick '
      + 'belongs to multiplication and division ONLY — it says nothing about addition, where '
      + '(−3) + (−4) = −7 and no cancelling happens at all.\n\n'
      + 'The notational trap is worth learning once. −3² is −9, not 9, because the exponent '
      + 'binds tighter than the minus: it means −(3²). Only (−3)² is 9, where the brackets '
      + 'make the negative part of the base. Calculators follow this convention exactly, so '
      + 'an answer that disagrees is usually the brackets and not the machine.',
    targetedMisconceptions: [`${IARITH}:MC-1`, `${IARITH}:MC-2`],
    source: eb(IARITH, 'Identity + Misconception register — −3² is not (−3)²; sign counting is for × and ÷'),
  },
  {
    conceptId: MARITH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Mental arithmetic is choosing a route the numbers in front of you make easy, which is '
      + 'a different skill from running a written algorithm in your head. 1000 − 998 is best '
      + 'done by counting up 2, and setting up a mental borrow through three zeros is the '
      + 'hard way to reach the same answer.\n\n'
      + 'So the strategy comes from the numbers, not from habit. Near a round number, '
      + 'compensate: 47 + 29 is 47 + 30 − 1 = 76. Awkward factors, rebalance: 5 × 18 is 10 × '
      + '9 = 90. Big and messy, decompose: 6 × 23 is 120 + 18.\n\n'
      + 'Compensation is the strategy that most often goes wrong, and always in the same way '
      + '— the adjustment gets made and not undone. If you rounded 29 up to 30 you added one '
      + 'too many, so you must subtract 1 at the end; forgetting leaves you exactly one out, '
      + 'which is close enough to look right. Written methods work left-to-right in fixed '
      + 'columns, but mentally you are free to take whichever part is easiest first, and '
      + 'forcing the written order throws that advantage away.',
    targetedMisconceptions: [`${MARITH}:MC-1`, `${MARITH}:MC-2`],
    source: eb(MARITH, 'Identity + Misconception register — match strategy to numbers; undo the compensation'),
  },
  {
    conceptId: IROOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The square root of an integer is either a whole number or irrational — there is no '
      + 'middle case. √9 = 3 exactly, and √2 cannot be written as any fraction at all.\n\n'
      + 'So not every root is irrational: √16, √25 and √100 are 4, 5 and 10, and the perfect '
      + 'squares are precisely the integers with whole roots. The irrationality of √2 is a '
      + 'PROOF, not an unfinished search — assume √2 = p/q in lowest terms, and it follows '
      + 'that p and q are both even, contradicting "lowest terms". No better fraction is '
      + 'waiting to be found, because the argument rules out every fraction at once.\n\n'
      + 'And 1.41421356 is not √2. It is an approximation, in exactly the sense that 0.333 '
      + 'approximates ⅓ — the decimal never terminates and never repeats, so any written '
      + 'version stops early. When exactness matters, leave the answer as √2; converting to '
      + 'a decimal is a last step for reporting a measurement, not a way of finishing the '
      + 'mathematics.',
    targetedMisconceptions: [`${IROOT}:MC-1`, `${IROOT}:MC-3`],
    source: eb(IROOT, 'Identity + Misconception register — the decimal is not the number; not all roots are irrational'),
  },
  {
    conceptId: SCIN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Scientific notation writes a number as a × 10ⁿ where a is at least 1 and less than 10. '
      + '4 500 000 becomes 4.5 × 10⁶ and 0.00032 becomes 3.2 × 10⁻⁴, which makes very large '
      + 'and very small quantities comparable at a glance.\n\n'
      + 'The coefficient rule is not decoration: 45 × 10⁵ is the right VALUE and is not in '
      + 'scientific notation, and the whole point of the form is that every number has '
      + 'exactly one representation, so two can be compared by their exponents alone. Fixing '
      + 'it means moving the point one place left and raising the exponent by one.\n\n'
      + 'A negative exponent means small, not negative. 3.2 × 10⁻⁴ = 0.00032, a positive '
      + 'number below one; the sign of the exponent says which way the point travels, and the '
      + 'sign of the number is carried by the coefficient. After multiplying or dividing two '
      + 'such numbers, the coefficient often lands outside the range — 5 × 10³ times 4 × 10² '
      + 'is 20 × 10⁵, which must be renormalised to 2 × 10⁶ before it counts as an answer.',
    targetedMisconceptions: [`${SCIN}:MC-1`, `${SCIN}:MC-2`],
    source: eb(SCIN, 'Identity + Misconception register — the coefficient range is the point; negative exponent means small'),
  },
  {
    conceptId: COMP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A composite number is a whole number above 1 with a divisor other than 1 and itself. '
      + '6 is composite because 2 and 3 divide it; 4 is the smallest composite number, since '
      + '2 and 3 are prime.\n\n'
      + 'Every whole number above 1 is prime or composite, and 1 is NEITHER. It is not prime '
      + 'because a prime needs exactly two distinct divisors and 1 has one; and it is not '
      + 'composite for the same reason, since it has no divisor beyond itself. Reasoning "1 '
      + 'is not prime, so it must be composite" treats the pair as exhaustive over all whole '
      + 'numbers when the definitions both start above 1.\n\n'
      + 'Excluding 1 is not a technicality — it is what makes prime factorisation unique. If '
      + '1 counted as prime, 12 would be 2 × 2 × 3 and 1 × 2 × 2 × 3 and 1 × 1 × 2 × 2 × 3, '
      + 'and the Fundamental Theorem of Arithmetic would have to be stated with an apology. '
      + 'Note too that having factors is not what makes a number composite: every number has '
      + 'factors, including 1 and itself. It is having an EXTRA one that does it.',
    targetedMisconceptions: [`${COMP}:MC-1`, `${COMP}:MC-2`],
    source: eb(COMP, 'Identity + Misconception register — 1 is neither; excluding it makes factorisation unique'),
  },
  {
    conceptId: DIVR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Divisibility rules read the answer off a number\'s digits instead of dividing. By 2: '
      + 'the last digit is even. By 5: it ends 0 or 5. By 10: it ends 0. Those work because '
      + '10 is divisible by 2, 5 and 10, so every column above the units already is.\n\n'
      + 'The rules for 3 and 9 both use the digit sum and they are NOT the same rule. Divisible '
      + 'by 3 means the digit sum is divisible by 3; by 9 means the digit sum is divisible by '
      + '9. So 123 has digit sum 6 — divisible by 3, not by 9 — and every multiple of 9 is a '
      + 'multiple of 3 while the reverse fails constantly.\n\n'
      + 'Larger powers of 2 need more than the last digit. Since 100 is divisible by 4, only '
      + 'the last TWO digits matter: 1316 is divisible by 4 because 16 is, and checking just '
      + 'the 6 would say the same thing about 1326, which is not. By 8, use the last three, '
      + 'for the same reason with 1000. And the rule for 11 alternates signs along the digits '
      + '— 2915 gives 2 − 9 + 1 − 5 = −11, which is divisible by 11, so 2915 is.',
    targetedMisconceptions: [`${DIVR}:MC-1`, `${DIVR}:MC-2`],
    source: eb(DIVR, 'Identity + Misconception register — 3 is not 9; 4 needs two digits'),
  },
]

export const MATHEMATICS_ARITH_CLOSE_PROBES: SeedProbe[] = [
  // --- math.arith.fraction-simplification ---------------------------------------------
  {
    conceptId: FSIMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Simplify 12/18 to lowest terms.',
    choices: [
      { text: '2/3 — divide both by gcd(12, 18) = 6', isCorrect: true },
      { text: '6/9 — divide both by 2', isCorrect: false, misconceptionId: `${FSIMP}:MC-1` },
      { text: '6/18 — halve the numerator', isCorrect: false, misconceptionId: `${FSIMP}:MC-2` },
    ],
    targetedMisconceptions: [`${FSIMP}:MC-1`, `${FSIMP}:MC-2`],
    source: eb(FSIMP, 'Assessment gate — lowest terms via the gcd'),
  },
  {
    conceptId: FSIMP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 51/68 already in lowest terms? Neither number is even and neither ends in 5.',
    choices: [
      { text: 'No — 51 = 3 × 17 and 68 = 4 × 17, so it reduces to 3/4', isCorrect: true },
      { text: 'Yes — there is no common factor of 2, 3 or 5', isCorrect: false, misconceptionId: `${FSIMP}:MC-3` },
      { text: 'Yes — 51 is odd, so nothing divides both', isCorrect: false, misconceptionId: `${FSIMP}:MC-3` },
    ],
    targetedMisconceptions: [`${FSIMP}:MC-3`],
    source: eb(FSIMP, 'Misconception register — the non-obvious common factor'),
  },
  {
    conceptId: FSIMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why must numerator and denominator be divided by the SAME number?',
    choices: [
      { text: 'Scaling both identically leaves the value unchanged; dividing one makes a different fraction', isCorrect: true },
      { text: 'It is a convention that keeps the answer tidy', isCorrect: false, misconceptionId: `${FSIMP}:MC-2` },
      { text: 'They need not be — you may simplify whichever is easier', isCorrect: false, misconceptionId: `${FSIMP}:MC-2` },
    ],
    targetedMisconceptions: [`${FSIMP}:MC-2`],
    source: eb(FSIMP, 'Transfer probe — equal scaling preserves value'),
  },

  // --- math.arith.fraction-addition -----------------------------------------------------
  {
    conceptId: FADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 1/2 + 1/3?',
    choices: [
      { text: '5/6 — rewrite as 3/6 + 2/6', isCorrect: true },
      { text: '2/5 — add the tops and the bottoms', isCorrect: false, misconceptionId: `${FADD}:MC-1` },
      { text: '1/6', isCorrect: false, misconceptionId: `${FADD}:MC-1` },
    ],
    targetedMisconceptions: [`${FADD}:MC-1`],
    source: eb(FADD, 'Assessment gate — a common denominator first'),
  },
  {
    conceptId: FADD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Someone answers 1/2 + 1/3 = 2/5. What check exposes it instantly?',
    choices: [
      { text: '2/5 is less than 1/2 — adding a positive amount to a half cannot land below it', isCorrect: true },
      { text: 'Nothing quick; you must redo the arithmetic', isCorrect: false, misconceptionId: `${FADD}:MC-1` },
      { text: 'The denominators should have been multiplied instead', isCorrect: false, misconceptionId: `${FADD}:MC-1` },
    ],
    targetedMisconceptions: [`${FADD}:MC-1`],
    source: eb(FADD, 'Misconception register — the size check catches direct addition'),
  },
  {
    conceptId: FADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Converting 1/2 into sixths, what happens to the numerator?',
    choices: [
      { text: 'It is multiplied by 3 too, giving 3/6 — the same factor as the denominator', isCorrect: true },
      { text: 'It stays 1, giving 1/6', isCorrect: false, misconceptionId: `${FADD}:MC-2` },
      { text: 'It is multiplied by 2, the factor for the other fraction', isCorrect: false, misconceptionId: `${FADD}:MC-3` },
    ],
    targetedMisconceptions: [`${FADD}:MC-2`, `${FADD}:MC-3`],
    source: eb(FADD, 'Transfer probe — rescale the numerator by the same factor'),
  },

  // --- math.arith.integer-arithmetic -------------------------------------------------------
  {
    conceptId: IARITH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is (−4) × (−3)?',
    choices: [
      { text: '12 — like signs give a positive', isCorrect: true },
      { text: '−12', isCorrect: false },
      { text: '−7', isCorrect: false },
    ],
    targetedMisconceptions: [`${IARITH}:MC-2`],
    source: eb(IARITH, 'Assessment gate — the sign rule for multiplication'),
  },
  {
    conceptId: IARITH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is −3², and how does it differ from (−3)²?',
    choices: [
      { text: '−9 — the exponent binds tighter than the minus, so it means −(3²); only (−3)² is 9', isCorrect: true },
      { text: '9 — a square is always positive', isCorrect: false, misconceptionId: `${IARITH}:MC-1` },
      { text: '−6 — multiply −3 by 2', isCorrect: false, misconceptionId: `${IARITH}:MC-1` },
    ],
    targetedMisconceptions: [`${IARITH}:MC-1`],
    source: eb(IARITH, 'Misconception register — the exponent binds before the minus'),
  },
  {
    conceptId: IARITH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Counting negatives tells you the sign of a product. Does it work for (−3) + (−4)?',
    choices: [
      { text: 'No — the trick belongs to × and ÷ only; the sum is −7 and nothing cancels', isCorrect: true },
      { text: 'Yes — two negatives cancel, giving 7', isCorrect: false, misconceptionId: `${IARITH}:MC-2` },
      { text: 'Yes — an even count gives a positive, so +7', isCorrect: false, misconceptionId: `${IARITH}:MC-2` },
    ],
    targetedMisconceptions: [`${IARITH}:MC-2`],
    source: eb(IARITH, 'Transfer probe — sign counting does not extend to addition'),
  },

  // --- math.arith.mental-arithmetic ----------------------------------------------------------
  {
    conceptId: MARITH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the easiest mental route to 1000 − 998?',
    choices: [
      { text: 'Count up from 998 — the gap is 2', isCorrect: true },
      { text: 'Set up the borrow through the three zeros in your head', isCorrect: false, misconceptionId: `${MARITH}:MC-3` },
      { text: 'Round 998 to 1000 and answer 0', isCorrect: false, misconceptionId: `${MARITH}:MC-2` },
    ],
    targetedMisconceptions: [`${MARITH}:MC-3`],
    source: eb(MARITH, 'Assessment gate — the numbers choose the route'),
  },
  {
    conceptId: MARITH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You compute 47 + 29 as 47 + 30 = 77. What must you do next?',
    choices: [
      { text: 'Subtract 1 — you added one too many, and the compensation has to be undone', isCorrect: true },
      { text: 'Nothing — 77 is the answer', isCorrect: false, misconceptionId: `${MARITH}:MC-2` },
      { text: 'Add 1, to match the rounding up', isCorrect: false, misconceptionId: `${MARITH}:MC-2` },
    ],
    targetedMisconceptions: [`${MARITH}:MC-2`],
    source: eb(MARITH, 'Misconception register — the adjustment must be reversed'),
  },
  {
    conceptId: MARITH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which strategy fits 5 × 18 best?',
    choices: [
      { text: 'Rebalance to 10 × 9 = 90 — halve one factor and double the other', isCorrect: true },
      { text: 'Run the written column algorithm mentally', isCorrect: false, misconceptionId: `${MARITH}:MC-3` },
      { text: 'Always decompose, whatever the numbers look like', isCorrect: false, misconceptionId: `${MARITH}:MC-1` },
    ],
    targetedMisconceptions: [`${MARITH}:MC-1`, `${MARITH}:MC-3`],
    source: eb(MARITH, 'Transfer probe — match the strategy to the number structure'),
  },

  // --- math.arith.irrational-roots -------------------------------------------------------------
  {
    conceptId: IROOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is √16 irrational?',
    choices: [
      { text: 'No — it is exactly 4; the perfect squares are precisely the integers with whole roots', isCorrect: true },
      { text: 'Yes — all square roots are irrational', isCorrect: false, misconceptionId: `${IROOT}:MC-3` },
      { text: 'Yes — only roots of 1 are rational', isCorrect: false, misconceptionId: `${IROOT}:MC-3` },
    ],
    targetedMisconceptions: [`${IROOT}:MC-3`],
    source: eb(IROOT, 'Assessment gate — perfect squares have whole roots'),
  },
  {
    conceptId: IROOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is √2 = 1.41421356?',
    choices: [
      { text: 'No — that is an approximation that stops early, as 0.333 approximates a third', isCorrect: true },
      { text: 'Yes — that is its value to full precision', isCorrect: false, misconceptionId: `${IROOT}:MC-1` },
      { text: 'Yes — calculators give exact values for roots', isCorrect: false, misconceptionId: `${IROOT}:MC-1` },
    ],
    targetedMisconceptions: [`${IROOT}:MC-1`],
    source: eb(IROOT, 'Misconception register — the decimal is not the number'),
  },
  {
    conceptId: IROOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Might a fraction equal to √2 still be found one day?',
    choices: [
      { text: 'No — the proof rules out every fraction at once: p/q in lowest terms forces p and q both even', isCorrect: true },
      { text: 'Possibly — nobody has found one yet', isCorrect: false, misconceptionId: `${IROOT}:MC-2` },
      { text: 'Yes, with a large enough denominator', isCorrect: false, misconceptionId: `${IROOT}:MC-2` },
    ],
    targetedMisconceptions: [`${IROOT}:MC-2`],
    source: eb(IROOT, 'Transfer probe — irrationality is proved, not unsearched'),
  },

  // --- math.arith.scientific-notation -------------------------------------------------------------
  {
    conceptId: SCIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Write 4 500 000 in scientific notation.',
    choices: [
      { text: '4.5 × 10⁶', isCorrect: true },
      { text: '45 × 10⁵', isCorrect: false, misconceptionId: `${SCIN}:MC-1` },
      { text: '0.45 × 10⁷', isCorrect: false, misconceptionId: `${SCIN}:MC-1` },
    ],
    targetedMisconceptions: [`${SCIN}:MC-1`],
    source: eb(SCIN, 'Assessment gate — the coefficient sits in [1, 10)'),
  },
  {
    conceptId: SCIN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does 3.2 × 10⁻⁴ equal?',
    choices: [
      { text: '0.00032 — a positive number below one; the exponent sign says which way the point moves', isCorrect: true },
      { text: '−32000 — the negative exponent makes it negative', isCorrect: false, misconceptionId: `${SCIN}:MC-2` },
      { text: '−0.00032', isCorrect: false, misconceptionId: `${SCIN}:MC-2` },
    ],
    targetedMisconceptions: [`${SCIN}:MC-2`],
    source: eb(SCIN, 'Misconception register — negative exponent means small, not negative'),
  },
  {
    conceptId: SCIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '(5 × 10³) × (4 × 10²) gives 20 × 10⁵. Is that the answer?',
    choices: [
      { text: 'Not yet — 20 is outside [1, 10), so renormalise to 2 × 10⁶', isCorrect: true },
      { text: 'Yes — the value is correct, so the form does not matter', isCorrect: false, misconceptionId: `${SCIN}:MC-3` },
      { text: 'Yes — the coefficient rule applies only to the inputs', isCorrect: false, misconceptionId: `${SCIN}:MC-3` },
    ],
    targetedMisconceptions: [`${SCIN}:MC-3`],
    source: eb(SCIN, 'Transfer probe — renormalise after combining'),
  },

  // --- math.nt.composite-number ---------------------------------------------------------------------
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the smallest composite number?',
    choices: [
      { text: '4 — since 2 and 3 are prime and 1 is neither', isCorrect: true },
      { text: '1', isCorrect: false, misconceptionId: `${COMP}:MC-3` },
      { text: '2', isCorrect: false, misconceptionId: `${COMP}:MC-3` },
    ],
    targetedMisconceptions: [`${COMP}:MC-3`],
    source: eb(COMP, 'Assessment gate — the smallest composite'),
  },
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '1 is not prime. Does that make it composite?',
    choices: [
      { text: 'No — it is neither; both definitions start above 1, so they are not exhaustive over every whole number', isCorrect: true },
      { text: 'Yes — every number is prime or composite', isCorrect: false, misconceptionId: `${COMP}:MC-1` },
      { text: 'Yes — 1 has factors, namely itself', isCorrect: false, misconceptionId: `${COMP}:MC-2` },
    ],
    targetedMisconceptions: [`${COMP}:MC-1`, `${COMP}:MC-2`],
    source: eb(COMP, 'Misconception register — 1 is neither prime nor composite'),
  },
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does excluding 1 from the primes matter?',
    choices: [
      { text: 'It keeps prime factorisation unique — otherwise 12 would be 2×2×3 and 1×2×2×3 and so on', isCorrect: true },
      { text: 'It does not matter; it is an arbitrary convention', isCorrect: false, misconceptionId: `${COMP}:MC-1` },
      { text: 'Because 1 has too many factors to be useful', isCorrect: false, misconceptionId: `${COMP}:MC-2` },
    ],
    targetedMisconceptions: [`${COMP}:MC-1`],
    source: eb(COMP, 'Transfer probe — uniqueness of factorisation is the reason'),
  },

  // --- math.nt.divisibility-rules ---------------------------------------------------------------------
  {
    conceptId: DIVR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is 123 divisible by 3? By 9?',
    choices: [
      { text: 'By 3 yes, by 9 no — the digit sum is 6, which 3 divides and 9 does not', isCorrect: true },
      { text: 'By both — the digit-sum rule is the same for 3 and 9', isCorrect: false, misconceptionId: `${DIVR}:MC-1` },
      { text: 'By neither — 123 is odd', isCorrect: false },
    ],
    targetedMisconceptions: [`${DIVR}:MC-1`],
    source: eb(DIVR, 'Assessment gate — the 3 rule is not the 9 rule'),
  },
  {
    conceptId: DIVR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How do you test divisibility by 4?',
    choices: [
      { text: 'Check the last TWO digits — 100 is divisible by 4, so everything above them already is', isCorrect: true },
      { text: 'Check the last digit is even', isCorrect: false, misconceptionId: `${DIVR}:MC-2` },
      { text: 'Check the digit sum is divisible by 4', isCorrect: false, misconceptionId: `${DIVR}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVR}:MC-2`],
    source: eb(DIVR, 'Misconception register — one digit is not enough for 4'),
  },
  {
    conceptId: DIVR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Apply the rule for 11 to 2915.',
    choices: [
      { text: '2 − 9 + 1 − 5 = −11, which 11 divides, so 2915 is divisible by 11', isCorrect: true },
      { text: '2 + 9 + 1 + 5 = 17, so it is not', isCorrect: false, misconceptionId: `${DIVR}:MC-3` },
      { text: '2 + 9 − 1 + 5 = 15, so it is not — alternating from the second digit', isCorrect: false, misconceptionId: `${DIVR}:MC-3` },
    ],
    targetedMisconceptions: [`${DIVR}:MC-3`],
    source: eb(DIVR, 'Transfer probe — the alternating-sign rule for 11'),
  },
]
