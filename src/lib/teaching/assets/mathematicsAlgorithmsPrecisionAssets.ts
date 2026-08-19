/**
 * Seventeenth batch — the written algorithms, and the arithmetic of
 * how-much-do-you-actually-know.
 *
 *   ALGORITHMS carrying, borrowing, long-multiplication, long-division.
 *              Every register in this group records the SAME shape of
 *              error: a step performed correctly in the wrong COLUMN, or
 *              a chain broken partway. These are not concept failures,
 *              they are bookkeeping failures — and each explanation
 *              therefore has to say what the column MEANS, because a
 *              learner who knows why the carry is worth ten can spot a
 *              misplaced one and a learner who has memorised the motion
 *              cannot.
 *   PROPORTION decimals, percentages. Both are place value and division
 *              wearing different clothes; both get taught as new number
 *              types with their own procedures, which is exactly the
 *              misconception the registers record.
 *   PRECISION  rounding, significant-figures. The arithmetic of what a
 *              measurement actually claims — where a calculator's twelve
 *              digits are an overstatement, not an answer.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CARRY = 'math.arith.carrying'
const BORROW = 'math.arith.borrowing'
const LMUL = 'math.arith.long-multiplication'
const LDIV = 'math.arith.long-division'
const DEC = 'math.arith.decimals'
const PCT = 'math.arith.percentages'
const ROUND = 'math.arith.rounding'
const SIGFIG = 'math.arith.significant-figures'

export const MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CARRY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Adding 47 + 38, the units give 7 + 8 = 15. Only the 5 can stay in the units column, '
      + 'because a column holds one digit — the other 10 is one TEN, so it moves to the tens '
      + 'column as a 1.\n\n'
      + 'That is what the little 1 means: not "one" but "one ten", already converted. So you '
      + 'write 1 above the tens and never 15 in the units, and the tens column becomes '
      + '1 + 4 + 3 = 8, giving 85. Knowing the carry is worth ten is what lets you notice a '
      + 'misplaced one; someone who has learnt the motion without the meaning cannot.\n\n'
      + 'The carry belongs to the column immediately LEFT, always, and it must be added in '
      + 'even when the next column is quiet. In 195 + 5, the units make 10 so 0 stays and 1 '
      + 'carries; the tens are then 1 + 9 + 0 = 10, which carries AGAIN. A carry can set off '
      + 'a chain, and dropping the second one because the first felt finished is the '
      + 'commonest way this goes wrong.',
    targetedMisconceptions: [`${CARRY}:MC-1`, `${CARRY}:MC-2`],
    source: eb(CARRY, 'Identity + Misconception register — the carry is one TEN; the chain continues'),
  },
  {
    conceptId: BORROW, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Subtracting 52 − 27, the units ask 2 − 7 and there is not enough. So take one ten from '
      + 'the tens column: the 5 becomes 4 and the 2 becomes 12, because the ten arrived as '
      + 'TEN units. Now 12 − 7 = 5 and 4 − 2 = 2, giving 25.\n\n'
      + 'The borrowed amount is ten, not one. Turning the 2 into a 3 is the error this step '
      + 'invites, and it comes from copying the "little 1" of carrying without asking what it '
      + 'is worth. Nothing was created — 52 is still 40 + 12, exactly as it was 50 + 2.\n\n'
      + 'Borrowing across a zero is where it genuinely gets hard, and it needs to be done one '
      + 'column at a time rather than jumped. For 302 − 178: the tens column has nothing to '
      + 'give, so it borrows from the hundreds first, becoming 3 → 2 with the tens now 10; '
      + 'THEN the tens lend to the units, so the tens fall to 9 and the units become 12. The '
      + 'chain is hundreds → tens → units, and skipping the middle step is what produces the '
      + 'classic wrong answer.',
    targetedMisconceptions: [`${BORROW}:MC-1`, `${BORROW}:MC-2`],
    source: eb(BORROW, 'Identity + Misconception register — the borrow is worth ten; the zero chain is stepwise'),
  },
  {
    conceptId: LMUL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Long multiplication splits one factor by place value and adds the pieces. For 34 × 26: '
      + 'multiply 34 by 6 to get 204, then 34 by 20 to get 680, and add — 884.\n\n'
      + 'That second row is where the method is won or lost. You are multiplying by 20, not '
      + 'by 2, so the row must be shifted one column left — or equivalently, written with a 0 '
      + 'in the units. Omitting the shift computes 34 × 2 and adds it to 34 × 6, which '
      + 'answers a different question entirely and is the single commonest defect in this '
      + 'algorithm.\n\n'
      + 'The shift is not a rule about where to put your pen; it IS the place value. Writing '
      + 'the 0 explicitly rather than leaving a gap makes the row say what it means, and it '
      + 'removes the alignment error at the final addition, where columns that drifted by one '
      + 'produce an answer that is wrong by a plausible-looking amount rather than an obvious '
      + 'one.',
    targetedMisconceptions: [`${LMUL}:MC-1`, `${LMUL}:MC-3`],
    source: eb(LMUL, 'Identity + Misconception register — the shift IS the place value'),
  },
  {
    conceptId: LDIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Long division works left to right, taking one digit at a time: how many times does the '
      + 'divisor fit, subtract, bring down the next digit, repeat. For 738 ÷ 6 — 6 into 7 '
      + 'once with 1 left, bring down the 3 to make 13, 6 into 13 twice with 1 left, bring '
      + 'down the 8 to make 18, 6 into 18 three times exactly. The answer is 123.\n\n'
      + 'Every digit must be brought down, including the ones that look pointless. If the '
      + 'divisor does not fit, the quotient gets a 0 in that column and you bring down the '
      + 'next digit anyway — 618 ÷ 6 has a 0 in the tens place, and omitting it turns 103 '
      + 'into 13.\n\n'
      + 'The quotient digit goes ABOVE the digit you just brought down, and that alignment is '
      + 'the whole record of place value in this algorithm. It is also why the process is not '
      + 'finished until the last digit of the dividend has been used: stopping early leaves a '
      + 'remainder that is really a further quotient digit, and the answer comes out roughly '
      + 'a factor of ten wrong.',
    targetedMisconceptions: [`${LDIV}:MC-1`, `${LDIV}:MC-3`],
    source: eb(LDIV, 'Identity + Misconception register — bring down every digit; alignment carries place value'),
  },
  {
    conceptId: DEC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A decimal continues place value to the right of the point: tenths, hundredths, '
      + 'thousandths. 0.7 is seven tenths, and 0.70 is seventy hundredths — the same amount, '
      + 'which is why the trailing zero changes nothing.\n\n'
      + 'More digits does not mean bigger. 0.7 is LARGER than 0.65, even though 65 beats 7 as '
      + 'a whole number, because 0.7 is seven tenths and 0.65 is six tenths and a bit. '
      + 'Comparing decimals means comparing column by column from the left, exactly as with '
      + 'whole numbers, rather than counting digits.\n\n'
      + 'And 3.7 is one number, not a 3 next to a 7. Adding 3.7 + 2.5 by treating the parts '
      + 'separately gives 5.12, which is wrong because the tenths overflowed: 7 tenths plus 5 '
      + 'tenths is 12 tenths, i.e. one whole and 2 tenths, so the answer is 6.2. The columns '
      + 'carry across the decimal point just as they do everywhere else, and that is the '
      + 'point of using place value for fractions at all.',
    targetedMisconceptions: [`${DEC}:MC-1`, `${DEC}:MC-2`],
    source: eb(DEC, 'Identity + Misconception register — longer is not larger; the point does not split the number'),
  },
  {
    conceptId: PCT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Per cent means "per hundred", so 25% is simply 25/100, which is 0.25, which is ¼. '
      + 'These are not four related quantities — they are one number written four ways, and a '
      + 'percentage is not a different kind of number requiring its own arithmetic.\n\n'
      + 'That makes "25% of 80" an ordinary multiplication: 0.25 × 80 = 20. The word "of" '
      + 'means times here as it does everywhere else, so no special procedure is needed and '
      + 'the version you can do in your head — a quarter of 80 — is the same calculation.\n\n'
      + 'Successive changes do not cancel, and this is where percentages cost people money. '
      + 'A price rises 10% then falls 10%: £100 becomes £110, and 10% of £110 is £11, so it '
      + 'lands at £99. The percentages are taken of DIFFERENT bases, so the fall is worth '
      + 'more than the rise. For the same reason a 50% loss needs a 100% gain to recover — '
      + 'percentage changes multiply (×1.1 then ×0.9 = ×0.99) rather than adding.',
    targetedMisconceptions: [`${PCT}:MC-1`, `${PCT}:MC-3`],
    source: eb(PCT, 'Identity + Misconception register — one number four ways; changes multiply, not add'),
  },
  {
    conceptId: ROUND, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Rounding replaces a number with the nearest one at some chosen coarseness. 3.847 to '
      + 'two DECIMAL PLACES is 3.85 — count positions after the point. To two SIGNIFICANT '
      + 'FIGURES it is 3.8 — count meaningful digits from the first non-zero one.\n\n'
      + 'The two are different instructions and diverge sharply on small numbers. 0.004617 to '
      + '2 decimal places is 0.00, which throws the number away entirely; to 2 significant '
      + 'figures it is 0.0046, which keeps it. Those leading zeros are placeholders showing '
      + 'where the digits sit, so they are never counted as significant.\n\n'
      + 'Round at the END, not along the way. Rounding intermediate results feels harmless '
      + 'and compounds: a value rounded to 2 decimal places then multiplied by 1000 carries '
      + 'its error up by a factor of a thousand with it. Keep full precision through the '
      + 'working and round once, when you report — the rounding is a statement about how much '
      + 'you are claiming to know, and it belongs at the point where the claim is made.',
    targetedMisconceptions: [`${ROUND}:MC-1`, `${ROUND}:MC-2`],
    source: eb(ROUND, 'Identity + Misconception register — s.f. is not d.p.; round once, at the end'),
  },
  {
    conceptId: SIGFIG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Significant figures record how much a measurement actually claims. A length written as '
      + '2.5 m claims two figures — somewhere between 2.45 and 2.55 — while 2.50 m claims '
      + 'three and is a stronger statement about the instrument used.\n\n'
      + 'A result can be no more precise than its worst input. Multiply 2.5 by 3.14159 and '
      + 'the calculator offers 7.853975; reporting that claims seven figures of knowledge '
      + 'from a measurement that supplied two, so the honest answer is 7.9. The extra digits '
      + 'are not more accurate, they are a false claim, and a calculator display is a working '
      + 'value rather than a result.\n\n'
      + 'Multiplication and addition follow different rules, because they lose precision '
      + 'differently. For × and ÷, match the fewest SIGNIFICANT FIGURES among the inputs. For '
      + '+ and −, match the fewest DECIMAL PLACES: 12.11 + 0.3 = 12.41 on paper, but the 0.3 '
      + 'knows nothing about hundredths, so the answer is 12.4. Using the multiplication rule '
      + 'on a sum is the standard error here, and it usually overstates what you know.',
    targetedMisconceptions: [`${SIGFIG}:MC-1`, `${SIGFIG}:MC-2`],
    source: eb(SIGFIG, 'Identity + Misconception register — × and + have different rules; the display is not the result'),
  },
]

export const MATHEMATICS_ALGORITHMS_PRECISION_PROBES: SeedProbe[] = [
  // --- math.arith.carrying ----------------------------------------------------------
  {
    conceptId: CARRY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Adding 47 + 38, the units give 15. What do you carry, and what is it worth?',
    choices: [
      { text: 'Carry 1, worth one TEN, and leave 5 in the units', isCorrect: true },
      { text: 'Carry 15 into the tens column', isCorrect: false, misconceptionId: `${CARRY}:MC-1` },
      { text: 'Carry 1, worth one unit, into the tens', isCorrect: false, misconceptionId: `${CARRY}:MC-1` },
    ],
    targetedMisconceptions: [`${CARRY}:MC-1`],
    source: eb(CARRY, 'Assessment gate — the carry is one ten, already converted'),
  },
  {
    conceptId: CARRY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 195 + 5?',
    choices: [
      { text: '200 — the units carry, and the tens then make 10 and carry AGAIN', isCorrect: true },
      { text: '100 — the units carry once and the tens are done', isCorrect: false, misconceptionId: `${CARRY}:MC-2` },
      { text: '190', isCorrect: false, misconceptionId: `${CARRY}:MC-2` },
    ],
    targetedMisconceptions: [`${CARRY}:MC-2`],
    source: eb(CARRY, 'Misconception register — a carry can set off a chain'),
  },
  {
    conceptId: CARRY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which column does a carry from the units go into?',
    choices: [
      { text: 'The tens — always the column immediately to the left', isCorrect: true },
      { text: 'The hundreds, since the carry is worth ten', isCorrect: false, misconceptionId: `${CARRY}:MC-3` },
      { text: 'Whichever column still has room', isCorrect: false, misconceptionId: `${CARRY}:MC-3` },
    ],
    targetedMisconceptions: [`${CARRY}:MC-3`],
    source: eb(CARRY, 'Transfer probe — the carry belongs one column left'),
  },

  // --- math.arith.borrowing -----------------------------------------------------------
  {
    conceptId: BORROW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In 52 − 27, the units cannot do 2 − 7. After borrowing, what is in the units?',
    choices: [
      { text: '12 — the ten arrives as ten units', isCorrect: true },
      { text: '3 — add the little 1 to the 2', isCorrect: false, misconceptionId: `${BORROW}:MC-2` },
      { text: '2 — the borrow only changes the tens column', isCorrect: false, misconceptionId: `${BORROW}:MC-2` },
    ],
    targetedMisconceptions: [`${BORROW}:MC-2`],
    source: eb(BORROW, 'Assessment gate — the borrow is worth ten'),
  },
  {
    conceptId: BORROW, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In 302 − 178, the tens column is 0 and has nothing to lend. What happens?',
    choices: [
      { text: 'The tens borrow from the hundreds first, becoming 10, then lend to the units — one column at a time', isCorrect: true },
      { text: 'The units borrow straight from the hundreds, skipping the tens', isCorrect: false, misconceptionId: `${BORROW}:MC-1` },
      { text: 'The subtraction cannot be done in that column', isCorrect: false, misconceptionId: `${BORROW}:MC-1` },
    ],
    targetedMisconceptions: [`${BORROW}:MC-1`],
    source: eb(BORROW, 'Misconception register — the zero chain is stepwise'),
  },
  {
    conceptId: BORROW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which column does the units column borrow FROM?',
    choices: [
      { text: 'The tens — the column immediately to its left', isCorrect: true },
      { text: 'The hundreds, since that has the most to spare', isCorrect: false, misconceptionId: `${BORROW}:MC-3` },
      { text: 'The answer row', isCorrect: false, misconceptionId: `${BORROW}:MC-3` },
    ],
    targetedMisconceptions: [`${BORROW}:MC-3`],
    source: eb(BORROW, 'Transfer probe — the borrow source is one column left'),
  },

  // --- math.arith.long-multiplication ---------------------------------------------------
  {
    conceptId: LMUL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In 34 × 26, the second partial product multiplies 34 by what?',
    choices: [
      { text: '20 — giving 680, written shifted one column left', isCorrect: true },
      { text: '2 — giving 68, written under the first row', isCorrect: false, misconceptionId: `${LMUL}:MC-1` },
      { text: '26 — the whole second factor again', isCorrect: false },
    ],
    targetedMisconceptions: [`${LMUL}:MC-1`],
    source: eb(LMUL, 'Assessment gate — the tens digit means twenty'),
  },
  {
    conceptId: LMUL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why must the second row be shifted one column left?',
    choices: [
      { text: 'Because it IS the place value — you multiplied by 20, not 2', isCorrect: true },
      { text: 'It is a layout convention that keeps the working tidy', isCorrect: false, misconceptionId: `${LMUL}:MC-1` },
      { text: 'To leave room for the carries', isCorrect: false, misconceptionId: `${LMUL}:MC-3` },
    ],
    targetedMisconceptions: [`${LMUL}:MC-1`],
    source: eb(LMUL, 'Misconception register — the shift is not a pen-placement rule'),
  },
  {
    conceptId: LMUL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is 34 × 26?',
    choices: [
      { text: '884 — 204 plus 680', isCorrect: true },
      { text: '272 — 204 plus 68', isCorrect: false, misconceptionId: `${LMUL}:MC-1` },
      { text: '824 — the rows added a column out', isCorrect: false, misconceptionId: `${LMUL}:MC-3` },
    ],
    targetedMisconceptions: [`${LMUL}:MC-1`, `${LMUL}:MC-3`],
    source: eb(LMUL, 'Transfer probe — the shift changes the answer'),
  },

  // --- math.arith.long-division ------------------------------------------------------------
  {
    conceptId: LDIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 738 ÷ 6?',
    choices: [
      { text: '123', isCorrect: true },
      { text: '13 remainder 0', isCorrect: false, misconceptionId: `${LDIV}:MC-3` },
      { text: '132', isCorrect: false, misconceptionId: `${LDIV}:MC-2` },
    ],
    targetedMisconceptions: [`${LDIV}:MC-3`],
    source: eb(LDIV, 'Assessment gate — every digit is used'),
  },
  {
    conceptId: LDIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Dividing 618 by 6, the divisor does not fit into the 1 in the tens. What do you write?',
    choices: [
      { text: '0 in the tens of the quotient, then bring down the next digit anyway — the answer is 103', isCorrect: true },
      { text: 'Nothing — skip that column and carry on, giving 13', isCorrect: false, misconceptionId: `${LDIV}:MC-1` },
      { text: '1, since the digit is there', isCorrect: false, misconceptionId: `${LDIV}:MC-2` },
    ],
    targetedMisconceptions: [`${LDIV}:MC-1`],
    source: eb(LDIV, 'Misconception register — a zero quotient digit still occupies its column'),
  },
  {
    conceptId: LDIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Where does each quotient digit go?',
    choices: [
      { text: 'Above the digit just brought down — that alignment is the record of place value', isCorrect: true },
      { text: 'At the right-hand end, building the answer left to right as you go', isCorrect: false, misconceptionId: `${LDIV}:MC-2` },
      { text: 'Anywhere above the bar, since the order is what matters', isCorrect: false, misconceptionId: `${LDIV}:MC-2` },
    ],
    targetedMisconceptions: [`${LDIV}:MC-2`],
    source: eb(LDIV, 'Transfer probe — alignment carries the place value'),
  },

  // --- math.arith.decimals -------------------------------------------------------------------
  {
    conceptId: DEC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which is larger, 0.7 or 0.65?',
    choices: [
      { text: '0.7 — seven tenths beats six tenths and a bit', isCorrect: true },
      { text: '0.65 — it has more digits', isCorrect: false, misconceptionId: `${DEC}:MC-1` },
      { text: 'They are equal', isCorrect: false, misconceptionId: `${DEC}:MC-1` },
    ],
    targetedMisconceptions: [`${DEC}:MC-1`],
    source: eb(DEC, 'Assessment gate — compare column by column, not by digit count'),
  },
  {
    conceptId: DEC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 3.7 + 2.5?',
    choices: [
      { text: '6.2 — 7 tenths plus 5 tenths is 12 tenths, so one whole carries across the point', isCorrect: true },
      { text: '5.12 — add the whole parts and the decimal parts separately', isCorrect: false, misconceptionId: `${DEC}:MC-2` },
      { text: '5.2', isCorrect: false, misconceptionId: `${DEC}:MC-2` },
    ],
    targetedMisconceptions: [`${DEC}:MC-2`],
    source: eb(DEC, 'Misconception register — the point does not split the number'),
  },
  {
    conceptId: DEC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does 0.70 differ from 0.7?',
    choices: [
      { text: 'No — seventy hundredths is seven tenths, so the trailing zero changes nothing', isCorrect: true },
      { text: 'Yes — 0.70 is ten times bigger', isCorrect: false, misconceptionId: `${DEC}:MC-1` },
      { text: 'Yes — 0.70 has more digits so it is more precise as a number', isCorrect: false, misconceptionId: `${DEC}:MC-1` },
    ],
    targetedMisconceptions: [`${DEC}:MC-1`],
    source: eb(DEC, 'Transfer probe — trailing zeros do not change the value'),
  },

  // --- math.arith.percentages ------------------------------------------------------------------
  {
    conceptId: PCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 25% as a decimal and as a fraction?',
    choices: [
      { text: '0.25 and ¼ — one number written three ways', isCorrect: true },
      { text: '25.0 and 25/1 — a percentage is its own kind of number', isCorrect: false, misconceptionId: `${PCT}:MC-1` },
      { text: '2.5 and 25/10', isCorrect: false, misconceptionId: `${PCT}:MC-1` },
    ],
    targetedMisconceptions: [`${PCT}:MC-1`],
    source: eb(PCT, 'Assessment gate — per cent means per hundred'),
  },
  {
    conceptId: PCT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How do you work out 25% of 80?',
    choices: [
      { text: 'Multiply: 0.25 × 80 = 20 — "of" means times, no special procedure', isCorrect: true },
      { text: 'Use the percentage formula, which is different from ordinary multiplication', isCorrect: false, misconceptionId: `${PCT}:MC-2` },
      { text: 'Divide 80 by 25', isCorrect: false, misconceptionId: `${PCT}:MC-2` },
    ],
    targetedMisconceptions: [`${PCT}:MC-2`],
    source: eb(PCT, 'Misconception register — "of" means times here too'),
  },
  {
    conceptId: PCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A £100 price rises 10%, then falls 10%. What is it now?',
    choices: [
      { text: '£99 — the fall is 10% of £110, a different base, so the changes multiply rather than cancel', isCorrect: true },
      { text: '£100 — the rise and fall cancel', isCorrect: false, misconceptionId: `${PCT}:MC-3` },
      { text: '£101', isCorrect: false, misconceptionId: `${PCT}:MC-3` },
    ],
    targetedMisconceptions: [`${PCT}:MC-3`],
    source: eb(PCT, 'Transfer probe — successive percentage changes do not cancel'),
  },

  // --- math.arith.rounding ----------------------------------------------------------------------
  {
    conceptId: ROUND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 3.847 to two significant figures?',
    choices: [
      { text: '3.8', isCorrect: true },
      { text: '3.85 — that is two figures after the point', isCorrect: false, misconceptionId: `${ROUND}:MC-1` },
      { text: '4.0', isCorrect: false },
    ],
    targetedMisconceptions: [`${ROUND}:MC-1`],
    source: eb(ROUND, 'Assessment gate — significant figures are not decimal places'),
  },
  {
    conceptId: ROUND, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 0.004617 to two significant figures?',
    choices: [
      { text: '0.0046 — leading zeros are placeholders and never count as significant', isCorrect: true },
      { text: '0.00 — two figures after the point', isCorrect: false, misconceptionId: `${ROUND}:MC-1` },
      { text: '0.0000 — the first two zeros are the two figures', isCorrect: false, misconceptionId: `${ROUND}:MC-3` },
    ],
    targetedMisconceptions: [`${ROUND}:MC-1`, `${ROUND}:MC-3`],
    source: eb(ROUND, 'Misconception register — leading zeros are not significant'),
  },
  {
    conceptId: ROUND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When should you round in a multi-step calculation?',
    choices: [
      { text: 'Once, at the end — an intermediate rounding gets multiplied up along with everything else', isCorrect: true },
      { text: 'At every step, to keep the numbers manageable', isCorrect: false, misconceptionId: `${ROUND}:MC-2` },
      { text: 'It makes no difference where you round', isCorrect: false, misconceptionId: `${ROUND}:MC-2` },
    ],
    targetedMisconceptions: [`${ROUND}:MC-2`],
    source: eb(ROUND, 'Transfer probe — intermediate rounding compounds'),
  },

  // --- math.arith.significant-figures ---------------------------------------------------------------
  {
    conceptId: SIGFIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A length is written 2.5 m. What does that claim?',
    choices: [
      { text: 'Two significant figures — somewhere between 2.45 and 2.55 m', isCorrect: true },
      { text: 'Exactly 2.5 m, with no uncertainty', isCorrect: false },
      { text: 'The same as 2.50 m', isCorrect: false, misconceptionId: `${SIGFIG}:MC-3` },
    ],
    targetedMisconceptions: [`${SIGFIG}:MC-3`],
    source: eb(SIGFIG, 'Assessment gate — figures record precision'),
  },
  {
    conceptId: SIGFIG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your calculator gives 2.5 × 3.14159 = 7.853975. What do you report?',
    choices: [
      { text: '7.9 — two figures, because the 2.5 supplied only two and the rest is a false claim', isCorrect: true },
      { text: '7.853975 — that is what the calculator computed', isCorrect: false, misconceptionId: `${SIGFIG}:MC-2` },
      { text: '7.85398 — round the display a little', isCorrect: false, misconceptionId: `${SIGFIG}:MC-2` },
    ],
    targetedMisconceptions: [`${SIGFIG}:MC-2`],
    source: eb(SIGFIG, 'Misconception register — a display is a working value, not a result'),
  },
  {
    conceptId: SIGFIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is 12.11 + 0.3, reported honestly?',
    choices: [
      { text: '12.4 — for + and −, match the fewest DECIMAL PLACES; 0.3 knows nothing about hundredths', isCorrect: true },
      { text: '12.41 — that is the arithmetic', isCorrect: false, misconceptionId: `${SIGFIG}:MC-2` },
      { text: '12 — match the fewest significant figures, which is two', isCorrect: false, misconceptionId: `${SIGFIG}:MC-1` },
    ],
    targetedMisconceptions: [`${SIGFIG}:MC-1`],
    source: eb(SIGFIG, 'Transfer probe — addition uses decimal places, not significant figures'),
  },
]
