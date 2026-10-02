/**
 * MATHEMATICS — probe DEPTH, batch 1: math.arith (64 (concept, band) pairs, 128 probes).
 *
 * ── WHY DEPTH ───────────────────────────────────────────────────────────────
 * Measured 2026-10-02 (`contract-audit.ts --subject mathematics --min 4`):
 * 916 of 917 mathematics (concept, band) pairs held EXACTLY three gradeable
 * probes — the mastery bar (`correctAtCheck >= 1` plus `correctAtPractice >=
 * 2`) with no fresh question to spare. Since the owner-approved G2 rule of
 * 2026-09-24 the gate may re-ask a question the learner got WRONG once the
 * fresh pool is spent, so a mistake no longer makes mastery unreachable — but
 * measured in production the same day (weak-learner QA,
 * math.geom.pythagorean-theorem), the tutor states the correct answer after a
 * miss ("Not quite — the answer is: …"), so a re-ask of that question can be
 * passed by recalling what was just shown rather than by mastery. Five probes let a
 * learner recover from one or two mistakes on questions they have not seen —
 * the depth physics and chemistry already hold (probeInventoryDepth.test.ts).
 * This file lifts every math.arith pair to five.
 *
 * ── IDENTITY (not cosmetic) ─────────────────────────────────────────────────
 * Every probe joins the pair's EXISTING ladder slot — the (concept, kind, band)
 * slot already holding two probes — at the two difficulty rungs that slot does
 * not use yet. No singleton slot is converted (that would re-identify a seeded
 * probe and serve one question under two identities). Asserted for the whole
 * corpus by probeInventoryDepth.test.ts.
 *
 * ── CONTENT ─────────────────────────────────────────────────────────────────
 * Grounded in each concept's Educational Brain entry (its misconceptions and
 * worked reasoning). Every question is new for its concept — none repeats a
 * stem already served — and every wrong option is an error a learner actually
 * makes (a dropped carry, smaller-from-larger subtraction, the wrong base for a
 * percentage change, a swapped divisor). Options carry no " — " working, so the
 * served option is the whole option and length gives nothing away.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { EARLY, ELEMENTARY, MIDDLE, HIGH, ADULT } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_ARITH_PROBES: SeedProbe[] = [
  // math.arith.absolute-value — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.absolute-value', MIDDLE, 'mcq', D, 'What is |3 − 8|?', '5', ['−5', '11', '−11'], 'absolute value of a difference is never negative'),
  q('math.arith.absolute-value', MIDDLE, 'mcq', A, 'On a number line, how far apart are −4 and 6?', '10', ['2', '−10', '6'], 'distance between two points as |a − b|'),

  // math.arith.addition — EARLY (mcq ladder F,D -> + P,A)
  q('math.arith.addition', EARLY, 'mcq', P, 'There are 2 red cars and 5 blue cars. How many cars are there in all?', '7', ['3', '25', '6'], 'putting two groups together'),
  q('math.arith.addition', EARLY, 'mcq', A, 'Sam has 6 pencils. He gets 4 more, then 4 more again. How many pencils does he have now?', '14', ['10', '12', '16'], 'adding on twice'),

  // math.arith.addition — ELEMENTARY (mcq ladder F,D -> + P,A)
  q('math.arith.addition', ELEMENTARY, 'mcq', P, 'What is 256 + 178?', '434', ['324', '334', '444'], 'two carries; 324 drops both, 334 drops the second'),
  q('math.arith.addition', ELEMENTARY, 'mcq', A, 'A shop sells 148 apples in the morning and 267 in the afternoon. How many apples does it sell in the whole day?', '415', ['305', '405', '315'], 'a word problem with two carries'),

  // math.arith.borrowing — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.borrowing', ELEMENTARY, 'mcq', D, 'What is 81 − 46?', '35', ['45', '25', '34'], '45 is the smaller-from-larger error instead of borrowing'),
  q('math.arith.borrowing', ELEMENTARY, 'mcq', A, 'What is 500 − 263?', '237', ['363', '337', '247'], 'borrowing through two zeros; 337 breaks the chain'),

  // math.arith.carrying — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.carrying', ELEMENTARY, 'mcq', D, 'What is 68 + 57?', '125', ['115', '135', '25'], 'carry into tens and into hundreds'),
  q('math.arith.carrying', ELEMENTARY, 'mcq', A, 'What is 999 + 1?', '1000', ['9910', '100', '990'], 'a carry that ripples through every column'),

  // math.arith.column-addition — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.column-addition', ELEMENTARY, 'mcq', D, 'Add 305 and 42 in columns. What is the total?', '347', ['725', '3047', '337'], '725 comes from lining 42 up under the wrong columns'),
  q('math.arith.column-addition', ELEMENTARY, 'mcq', A, 'Add 127, 45 and 8 in columns. What is the total?', '180', ['160', '170', '190'], 'a column summing to 20 carries 2, not 1'),

  // math.arith.counting-sequence — EARLY (mcq ladder F,P -> + D,A)
  q('math.arith.counting-sequence', EARLY, 'mcq', D, 'What number comes just before twenty?', 'nineteen', ['twenty-one', 'eighteen', 'ten'], 'counting back across a decade'),
  q('math.arith.counting-sequence', EARLY, 'mcq', A, 'Count on: 27, 28, 29. What number comes next?', '30', ['210', '20', '31'], '210 is the "twenty-ten" decade-crossing error'),

  // math.arith.counting — EARLY (mcq ladder F,P -> + D,A)
  q('math.arith.counting', EARLY, 'mcq', D, 'You count 4 apples in a row. Then you move them into a circle. How many apples are there now?', '4', ['More than 4', 'Fewer than 4', 'You cannot know'], 'moving objects does not change how many there are'),
  q('math.arith.counting', EARLY, 'mcq', A, 'You count 9 toy cars. What does the last number you said tell you?', 'How many cars there are', ['Which car is the biggest', 'Nothing, you must count again', 'How many cars are red'], 'the last number counted gives the total'),

  // math.arith.cube-numbers — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.cube-numbers', ELEMENTARY, 'mcq', D, 'What is 3 cubed?', '27', ['9', '6', '81'], 'cubing is not tripling (6) or squaring (9)'),
  q('math.arith.cube-numbers', ELEMENTARY, 'mcq', A, 'Which of these is a cube number?', '64', ['36', '12', '81'], 'a cube number is n × n × n, not a multiple of three'),

  // math.arith.decimal-operations — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.decimal-operations', MIDDLE, 'mcq', D, 'What is 5.2 − 1.75?', '3.45', ['4.53', '3.55', '4.45'], 'subtraction with a placeholder zero (5.20)'),
  q('math.arith.decimal-operations', MIDDLE, 'mcq', A, 'What is 1.2 ÷ 0.3?', '4', ['0.4', '0.04', '40'], 'dividing by a decimal less than one makes the answer larger'),

  // math.arith.decimals — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.decimals', MIDDLE, 'mcq', D, 'Which list is in order from smallest to largest?', '0.09, 0.4, 0.45, 0.5', ['0.4, 0.5, 0.09, 0.45', '0.5, 0.45, 0.4, 0.09', '0.09, 0.45, 0.4, 0.5'], 'more digits after the point does not mean larger'),
  q('math.arith.decimals', MIDDLE, 'mcq', A, 'What is 0.6 written as a fraction in lowest terms?', '3/5', ['6/100', '1/6', '6/10'], 'tenths place value, then simplify'),

  // math.arith.direct-variation — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.direct-variation', MIDDLE, 'mcq', D, 'y varies directly with x, and y = 12 when x = 4. What is y when x = 10?', '30', ['18', '40', '3'], 'find k = 3, then y = 3 × 10'),
  q('math.arith.direct-variation', MIDDLE, 'mcq', A, 'A table gives x = 2, 4, 6 with y = 5, 10, 16. Is y in direct variation with x?', 'No, because y ÷ x is not the same for every pair', ['Yes, because both go up', 'Yes, because the first two pairs fit', 'Yes, because y always goes up by about 5'], 'direct variation needs one constant ratio for every pair'),

  // math.arith.division — EARLY (mcq ladder F,D -> + P,A)
  q('math.arith.division', EARLY, 'mcq', P, '8 apples are put into bags of 2. How many bags are there?', '4', ['6', '10', '16'], 'division as making equal groups'),
  q('math.arith.division', EARLY, 'mcq', A, '12 stickers are shared equally between 3 friends. How many does each friend get?', '4', ['9', '15', '36'], 'sharing equally'),

  // math.arith.division — ELEMENTARY (mcq ladder F,D -> + P,A)
  q('math.arith.division', ELEMENTARY, 'mcq', P, 'What is 56 ÷ 7?', '8', ['7', '9', '49'], 'division as the inverse of a times-table fact'),
  q('math.arith.division', ELEMENTARY, 'mcq', A, 'A baker has 45 buns and puts 6 in each box. How many boxes does she need so that every bun is boxed?', '8', ['7', '7.5', '9'], 'interpreting the remainder: a part-filled box is still a box'),

  // math.arith.division — MIDDLE (mcq ladder D,P -> + F,A)
  q('math.arith.division', MIDDLE, 'mcq', F, 'What is 72 ÷ 8?', '9', ['8', '64', '80'], 'basic division fact'),
  q('math.arith.division', MIDDLE, 'mcq', A, 'If 84 ÷ 7 = 12, what is 84 ÷ 14?', '6', ['24', '12', '98'], 'doubling the divisor halves the quotient'),

  // math.arith.divisor-dividend — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.divisor-dividend', ELEMENTARY, 'mcq', D, 'In 35 ÷ 5 = 7, which number is the divisor?', '5', ['35', '7', '40'], 'the divisor is the number you divide by'),
  q('math.arith.divisor-dividend', ELEMENTARY, 'mcq', A, '48 sweets are shared among 6 children, and 48 ÷ 6 = 8. What does the quotient 8 tell you?', 'How many sweets each child gets', ['How many children there are', 'How many sweets there were', 'How many sweets are left over'], 'the quotient is the size of each share'),

  // math.arith.estimation — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.estimation', ELEMENTARY, 'mcq', D, 'Estimate 398 + 211 by rounding each number to the nearest hundred.', '600', ['500', '609', '700'], 'estimate first; 609 is the exact sum, not an estimate'),
  q('math.arith.estimation', ELEMENTARY, 'mcq', A, 'Which is the best quick estimate of 31 × 19?', '600', ['500', '589', '900'], 'round to 30 × 20; 589 is the exact product'),

  // math.arith.expanded-form — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.expanded-form', ELEMENTARY, 'mcq', D, 'Which number is 3000 + 40 + 6?', '3046', ['346', '3406', '30406'], 'an empty hundreds place needs a zero'),
  q('math.arith.expanded-form', ELEMENTARY, 'mcq', A, 'Which shows 8205 in expanded form?', '8000 + 200 + 5', ['8000 + 200 + 50', '800 + 20 + 5', '8 + 2 + 0 + 5'], 'each digit is worth its place'),

  // math.arith.exponent-rules — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.exponent-rules', MIDDLE, 'mcq', D, 'Simplify (2x³)².', '4x⁶', ['2x⁶', '4x⁵', '2x⁹'], 'the power applies to the coefficient too, and powers multiply'),
  q('math.arith.exponent-rules', MIDDLE, 'mcq', A, 'Simplify x⁻² · x⁵.', 'x³', ['x⁻¹⁰', 'x⁻⁷', '−x³'], 'add exponents, including the negative one'),

  // math.arith.exponentiation — MIDDLE (misconception_probe ladder D,P -> + F,A)
  q('math.arith.exponentiation', MIDDLE, 'misconception_probe', F, 'What is 5²?', '25', ['10', '7', '52'], 'a power is repeated multiplication, not 5 × 2'),
  q('math.arith.exponentiation', MIDDLE, 'misconception_probe', A, 'Which is larger, 2⁵ or 5²?', '2⁵', ['5²', 'They are equal', 'Powers cannot be compared'], '2⁵ = 32 and 5² = 25: swapping base and exponent changes the value'),

  // math.arith.fraction-addition — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.fraction-addition', MIDDLE, 'mcq', D, 'What is 2/5 + 1/10?', '1/2', ['3/15', '3/10', '2/50'], 'convert to tenths, add numerators only, simplify'),
  q('math.arith.fraction-addition', MIDDLE, 'mcq', A, 'What is 3/4 − 1/6?', '7/12', ['1/2', '2/12', '7/24'], 'common denominator 12 for a subtraction'),

  // math.arith.fraction-equivalence — ELEMENTARY (misconception_probe ladder D,P -> + F,A)
  q('math.arith.fraction-equivalence', ELEMENTARY, 'misconception_probe', F, 'Which fraction is equivalent to 2/3?', '4/6', ['3/4', '4/5', '2/6'], 'multiply top and bottom by the same number'),
  q('math.arith.fraction-equivalence', ELEMENTARY, 'misconception_probe', A, 'Fill the gap: 3/5 = ?/20', '12', ['18', '8', '15'], 'the bottom was multiplied by 4, so the top must be too'),

  // math.arith.fraction-multiplication — ELEMENTARY (misconception_probe ladder D,P -> + F,A)
  q('math.arith.fraction-multiplication', ELEMENTARY, 'misconception_probe', F, 'What is 2/3 × 3/4?', '1/2', ['5/7', '6/7', '8/9'], 'multiply tops and bottoms: 6/12'),
  q('math.arith.fraction-multiplication', ELEMENTARY, 'misconception_probe', A, 'What is half of 3/5?', '3/10', ['6/10', '3/7', '1/5'], 'half of means × 1/2'),

  // math.arith.fraction-reciprocal — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.fraction-reciprocal', MIDDLE, 'mcq', D, 'What is the reciprocal of 5?', '1/5', ['−5', '5', '0.5'], 'a whole number is 5/1, so flip it'),
  q('math.arith.fraction-reciprocal', MIDDLE, 'mcq', A, 'What is 2/3 ÷ 4/9?', '3/2', ['8/27', '1/6', '27/8'], 'multiply by the reciprocal 9/4'),

  // math.arith.fraction-simplification — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.fraction-simplification', MIDDLE, 'mcq', D, 'Simplify 24/36 to lowest terms.', '2/3', ['12/18', '4/6', '6/9'], 'keep dividing until no common factor is left'),
  q('math.arith.fraction-simplification', MIDDLE, 'mcq', A, 'Simplify 91/119 to lowest terms.', '13/17', ['It is already in lowest terms', '9/11', '1/2'], '91 = 7 × 13 and 119 = 7 × 17 share the factor 7'),

  // math.arith.fractions — ADULT (mcq ladder F,P -> + D,A)
  q('math.arith.fractions', ADULT, 'mcq', D, 'A recipe for 4 people uses 3/4 of a cup of flour. How much flour is needed for 2 people?', '3/8 of a cup', ['3/2 of a cup', '1/4 of a cup', '3/4 of a cup'], 'halving a fraction doubles its denominator'),
  q('math.arith.fractions', ADULT, 'mcq', A, 'Which is larger, 5/8 or 3/5?', '5/8', ['3/5', 'They are equal', 'They cannot be compared'], 'compare as 25/40 and 24/40'),

  // math.arith.fractions — MIDDLE (misconception_probe ladder D,P -> + F,A)
  q('math.arith.fractions', MIDDLE, 'misconception_probe', F, 'A pizza is cut into 8 equal slices and you eat 3. What fraction did you eat?', '3/8', ['3/5', '5/8', '8/3'], 'part over the whole, not part over the rest'),
  q('math.arith.fractions', MIDDLE, 'misconception_probe', A, 'Which fraction is closest to 1?', '9/10', ['2/3', '1/10', '5/9'], 'a bigger denominator does not make a fraction bigger'),

  // math.arith.improper-fractions — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.improper-fractions', ELEMENTARY, 'mcq', D, 'Write 3 2/5 as an improper fraction.', '17/5', ['32/5', '6/5', '15/5'], 'three wholes are 15 fifths, plus 2 fifths'),
  q('math.arith.improper-fractions', ELEMENTARY, 'mcq', A, 'Which is greater, 11/4 or 2 1/2?', '11/4', ['2 1/2', 'They are equal', 'They cannot be compared'], '11/4 is 2 3/4'),

  // math.arith.integer-arithmetic — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.integer-arithmetic', MIDDLE, 'mcq', D, 'What is −8 + 3?', '−5', ['5', '−11', '11'], 'adding a positive moves right from −8'),
  q('math.arith.integer-arithmetic', MIDDLE, 'mcq', A, 'What is (−2)³ + 4 × (−3)?', '−20', ['4', '−4', '20'], 'an odd power of a negative is negative; multiply before adding'),

  // math.arith.inverse-variation — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.inverse-variation', MIDDLE, 'mcq', D, 'y varies inversely with x, and y = 6 when x = 4. What is y when x = 8?', '3', ['12', '10', '2'], 'the product x × y = 24 stays constant'),
  q('math.arith.inverse-variation', MIDDLE, 'mcq', A, '5 workers take 12 days to build a wall. At the same rate, how long would 10 workers take?', '6 days', ['24 days', '7 days', '12 days'], 'workers × days stays constant'),

  // math.arith.irrational-roots — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.irrational-roots', MIDDLE, 'mcq', D, 'Which of these numbers is irrational?', '√12', ['√9', '√(4/9)', '√0.25'], 'only a non-square has an irrational root; 4/9 and 0.25 are perfect squares'),
  q('math.arith.irrational-roots', MIDDLE, 'mcq', A, 'Between which two whole numbers does √50 lie?', '7 and 8', ['6 and 7', '24 and 26', '49 and 51'], '49 < 50 < 64'),

  // math.arith.long-division — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.long-division', MIDDLE, 'mcq', D, 'What is 924 ÷ 4?', '231', ['213', '23', '2301'], 'one quotient digit per digit brought down'),
  q('math.arith.long-division', MIDDLE, 'mcq', A, 'What is 1830 ÷ 6?', '305', ['35', '350', '3005'], 'a zero must be written when the divisor does not go'),

  // math.arith.long-multiplication — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.long-multiplication', ELEMENTARY, 'mcq', D, 'What is 23 × 14?', '322', ['115', '312', '232'], '115 adds the partial products without the place-value shift'),
  q('math.arith.long-multiplication', ELEMENTARY, 'mcq', A, 'What is 125 × 32?', '4000', ['625', '3750', '4200'], 'the second partial product is 125 × 30, not 125 × 3'),

  // math.arith.mental-addition — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.mental-addition', ELEMENTARY, 'mcq', D, 'What is 36 + 49? Think of 49 as 50 − 1.', '85', ['86', '84', '95'], 'add 50, then take the extra 1 back'),
  q('math.arith.mental-addition', ELEMENTARY, 'mcq', A, 'Work out 198 + 357 in your head.', '555', ['553', '557', '545'], 'add 200, then subtract the 2 you added too many'),

  // math.arith.mental-arithmetic — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.mental-arithmetic', MIDDLE, 'mcq', D, 'Work out 25 × 16 in your head.', '400', ['300', '350', '4000'], '25 × 4 = 100, and 16 is 4 fours'),
  q('math.arith.mental-arithmetic', MIDDLE, 'mcq', A, 'Work out 503 − 298 in your head.', '205', ['201', '195', '215'], 'subtract 300, then add back 2 — not take 2 more away'),

  // math.arith.mental-multiplication — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.mental-multiplication', MIDDLE, 'mcq', D, 'Work out 15 × 12 mentally.', '180', ['150', '170', '120'], '15 × 10 + 15 × 2: both parts are needed'),
  q('math.arith.mental-multiplication', MIDDLE, 'mcq', A, 'Work out 99 × 7 mentally.', '693', ['700', '707', '637'], '100 × 7 − 7: the adjustment is subtracted'),

  // math.arith.mixed-numbers — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.mixed-numbers', ELEMENTARY, 'mcq', D, 'What is 1 1/4 + 2 1/2?', '3 3/4', ['3 2/6', '3 1/2', '4 1/4'], 'add wholes, then add 1/4 and 2/4'),
  q('math.arith.mixed-numbers', ELEMENTARY, 'mcq', A, 'What is 2 1/2 × 2?', '5', ['4 1/2', '4 1/4', '2 1/4'], 'the half is doubled too, not only the whole part'),

  // math.arith.multiplication-table — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.multiplication-table', ELEMENTARY, 'mcq', D, 'What is 8 × 7?', '56', ['54', '63', '15'], 'a commonly confused fact'),
  q('math.arith.multiplication-table', ELEMENTARY, 'mcq', A, 'You know 9 × 6 = 54. What is 9 × 7?', '63', ['55', '61', '64'], 'one more group of 9'),

  // math.arith.multiplication — EARLY (mcq ladder F,D -> + P,A)
  q('math.arith.multiplication', EARLY, 'mcq', P, 'There are 3 bags with 5 apples in each bag. How many apples are there?', '15', ['8', '35', '12'], 'equal groups'),
  q('math.arith.multiplication', EARLY, 'mcq', A, 'There are 2 rows of chairs with 6 chairs in each row. How many chairs are there?', '12', ['8', '26', '10'], 'rows of equal size'),

  // math.arith.multiplication — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.multiplication', ELEMENTARY, 'mcq', D, 'What is 4 × 25?', '100', ['29', '80', '125'], 'four quarters of a hundred'),
  q('math.arith.multiplication', ELEMENTARY, 'mcq', A, 'A box holds 12 eggs. How many eggs are in 7 boxes?', '84', ['19', '72', '94'], '12 × 7 as 10 × 7 + 2 × 7'),

  // math.arith.negative-numbers — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.negative-numbers', MIDDLE, 'mcq', D, 'The temperature is −4 °C and rises by 9 degrees. What is it now?', '5 °C', ['−13 °C', '−5 °C', '13 °C'], 'counting up across zero'),
  q('math.arith.negative-numbers', MIDDLE, 'mcq', A, 'What is −6 − (−10)?', '4', ['−16', '−4', '16'], 'subtracting a negative adds'),

  // math.arith.number-base — HIGH (mcq ladder F,P -> + D,A)
  q('math.arith.number-base', HIGH, 'mcq', D, 'Write the number ten in base two.', '1010', ['1100', '10', '1001'], 'eight plus two'),
  q('math.arith.number-base', HIGH, 'mcq', A, 'What is the base-five number 243 in base ten?', '73', ['243', '9', '48'], '2 × 25 + 4 × 5 + 3'),

  // math.arith.number-line — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.number-line', ELEMENTARY, 'mcq', D, 'On a number line, which number is exactly halfway between 10 and 20?', '15', ['14', '30', '5'], 'the midpoint of two marks'),
  q('math.arith.number-line', ELEMENTARY, 'mcq', A, 'A number line from 0 to 100 has a mark every 10. A dot sits halfway between the 60 and 70 marks. What number is it?', '65', ['6.5', '60', '61'], 'reading a scale whose marks are worth 10'),

  // math.arith.ones-tens-hundreds — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.ones-tens-hundreds', ELEMENTARY, 'mcq', D, 'How many tens are there in 250 altogether?', '25', ['5', '2', '250'], 'all the tens, not just the tens digit'),
  q('math.arith.ones-tens-hundreds', ELEMENTARY, 'mcq', A, 'Which number has 6 hundreds, 0 tens and 9 ones?', '609', ['69', '690', '6009'], 'the empty tens place needs a zero'),

  // math.arith.order-of-operations — ELEMENTARY (misconception_probe ladder D,P -> + F,A)
  q('math.arith.order-of-operations', ELEMENTARY, 'misconception_probe', F, 'What is 20 − 3 × 5?', '5', ['85', '75', '15'], 'multiply before subtracting; 85 works left to right'),
  q('math.arith.order-of-operations', ELEMENTARY, 'misconception_probe', A, 'What is (8 + 4) ÷ 2 × 3?', '18', ['2', '14', '30'], 'brackets first, then ÷ and × left to right; 2 does × before ÷'),

  // math.arith.ordering — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.ordering', ELEMENTARY, 'mcq', D, 'Which list is in order from smallest to largest?', '209, 290, 902, 920', ['290, 209, 920, 902', '920, 902, 290, 209', '209, 902, 290, 920'], 'compare hundreds first, then tens'),
  q('math.arith.ordering', ELEMENTARY, 'mcq', A, 'Which number is between 3450 and 3500?', '3475', ['3405', '3550', '3045'], 'compare digit by digit from the left'),

  // math.arith.percentage-calculations — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.percentage-calculations', MIDDLE, 'mcq', D, 'What is 15% of 200?', '30', ['15', '3', '300'], 'ten percent is 20, five percent is 10'),
  q('math.arith.percentage-calculations', MIDDLE, 'mcq', A, '12 is 40% of what number?', '30', ['4.8', '52', '28'], 'finding the whole, not 40% of 12'),

  // math.arith.percentage-change — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.percentage-change', MIDDLE, 'mcq', D, 'A jacket costs £80 and is reduced by 25%. What is the new price?', '£60', ['£55', '£20', '£100'], '25% of 80 is 20, taken off'),
  q('math.arith.percentage-change', MIDDLE, 'mcq', A, 'A town grew from 2000 to 2500 people. What is the percentage increase?', '25%', ['20%', '500%', '50%'], 'divide the change by the ORIGINAL value; 20% uses the new value'),

  // math.arith.percentages — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.percentages', MIDDLE, 'mcq', D, 'What is 3/5 as a percentage?', '60%', ['35%', '0.6%', '3.5%'], 'out of 100: 3/5 = 60/100'),
  q('math.arith.percentages', MIDDLE, 'mcq', A, 'In a class of 25 pupils, 7 wear glasses. What percentage wear glasses?', '28%', ['7%', '18%', '32%'], '7/25 = 28/100'),

  // math.arith.place-value — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.place-value', ELEMENTARY, 'mcq', D, 'What is the value of the 3 in 5312?', '300', ['3', '30', '3000'], 'the hundreds place'),
  q('math.arith.place-value', ELEMENTARY, 'mcq', A, 'Which number is 10 times bigger than 46?', '460', ['56', '4600', '406'], 'each digit moves one place to the left'),

  // math.arith.proportion — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.proportion', MIDDLE, 'mcq', D, '5 pens cost £3.50. How much do 8 pens cost at the same price?', '£5.60', ['£6.50', '£5.00', '£4.20'], 'one pen costs 70p'),
  q('math.arith.proportion', MIDDLE, 'mcq', A, 'Solve 3/x = 12/20.', 'x = 5', ['x = 80', 'x = 15', 'x = 4'], '12x = 60'),

  // math.arith.ratios — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.ratios', ELEMENTARY, 'mcq', D, 'Share 20 sweets in the ratio 3 : 1. How many are in the bigger share?', '15', ['5', '3', '17'], 'four parts of 5'),
  q('math.arith.ratios', ELEMENTARY, 'mcq', A, 'The ratio of cats to dogs is 2 : 5. There are 10 cats. How many dogs are there?', '25', ['13', '4', '50'], 'scale both parts by 5'),

  // math.arith.remainder — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.remainder', ELEMENTARY, 'mcq', D, 'What is the remainder when 29 is divided by 4?', '1', ['25', '7', '3'], '25 is the decimal part of 7.25, not a remainder'),
  q('math.arith.remainder', ELEMENTARY, 'mcq', A, 'When a whole number is divided by 6, which remainder is impossible?', '6', ['0', '5', '1'], 'a remainder is always smaller than the divisor'),

  // math.arith.repeating-decimals — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.repeating-decimals', MIDDLE, 'mcq', D, 'Which fraction equals 0.666…?', '2/3', ['6/10', '66/100', '3/5'], 'a repeating decimal is not a cut-off one'),
  q('math.arith.repeating-decimals', MIDDLE, 'mcq', A, 'What is 0.272727… as a fraction in lowest terms?', '3/11', ['27/100', '27/90', '2/7'], 'two repeating digits over 99: 27/99'),

  // math.arith.rounding — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.rounding', MIDDLE, 'mcq', D, 'What is 6.47 rounded to one decimal place?', '6.5', ['6.4', '6.0', '7'], 'look only at the next digit'),
  q('math.arith.rounding', MIDDLE, 'mcq', A, 'What is 2960 rounded to the nearest hundred?', '3000', ['2900', '2000', '3060'], 'rounding up carries into the thousands'),

  // math.arith.scientific-notation — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.scientific-notation', MIDDLE, 'mcq', D, 'Write 0.00072 in scientific notation.', '7.2 × 10⁻⁴', ['7.2 × 10⁴', '72 × 10⁻⁵', '0.72 × 10⁻³'], 'small numbers take a negative exponent and a coefficient from 1 to 10'),
  q('math.arith.scientific-notation', MIDDLE, 'mcq', A, 'What is (6 × 10⁵) ÷ (3 × 10²)?', '2 × 10³', ['2 × 10⁷', '3 × 10³', '18 × 10⁷'], 'divide coefficients and subtract exponents'),

  // math.arith.significant-figures — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.significant-figures', MIDDLE, 'mcq', D, 'How many significant figures does 0.0450 have?', '3', ['4', '2', '5'], 'leading zeros do not count; the trailing zero does'),
  q('math.arith.significant-figures', MIDDLE, 'mcq', A, 'A rectangle measures 4.2 cm by 3.15 cm. How should its area be reported?', '13 cm²', ['13.23 cm²', '13.2 cm²', '13.230 cm²'], 'no more significant figures than the least precise measurement (2)'),

  // math.arith.square-numbers — ELEMENTARY (mcq ladder F,P -> + D,A)
  q('math.arith.square-numbers', ELEMENTARY, 'mcq', D, 'What is 9 squared?', '81', ['18', '99', '27'], 'squaring is not doubling'),
  q('math.arith.square-numbers', ELEMENTARY, 'mcq', A, 'Which of these is a square number?', '144', ['140', '124', '164'], '12 × 12; the last digit alone does not decide'),

  // math.arith.square-roots — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.square-roots', MIDDLE, 'mcq', D, 'What is √(9 × 16)?', '12', ['25', '144', '7'], '√9 × √16'),
  q('math.arith.square-roots', MIDDLE, 'mcq', A, 'Which is the best estimate of √30?', '5.5', ['5', '6', '15'], 'between 5 and 6, nearer the middle since 30 is about halfway from 25 to 36'),

  // math.arith.subitizing — EARLY (mcq ladder F,P -> + D,A)
  q('math.arith.subitizing', EARLY, 'mcq', D, 'A domino shows 2 dots on one half and 3 dots on the other. How many dots is that?', '5', ['6', '4', '23'], 'seeing two small groups and putting them together'),
  q('math.arith.subitizing', EARLY, 'mcq', A, 'Ten dots are shown as two rows of five. What is the quick way to know there are ten?', 'See five and five', ['Count every dot slowly', 'Guess', 'Look at the biggest dot'], 'known patterns make counting unnecessary'),

  // math.arith.subtraction — EARLY (mcq ladder F,D -> + P,A)
  q('math.arith.subtraction', EARLY, 'mcq', P, 'There are 10 balloons. 4 balloons pop. How many are left?', '6', ['14', '4', '5'], 'taking away'),
  q('math.arith.subtraction', EARLY, 'mcq', A, 'Mia has 9 shells. Tom has 5 shells. How many more shells does Mia have?', '4', ['14', '5', '9'], 'subtraction as the difference'),

  // math.arith.subtraction — ELEMENTARY (mcq ladder F,D -> + P,A)
  q('math.arith.subtraction', ELEMENTARY, 'mcq', P, 'What is 400 − 125?', '275', ['325', '385', '285'], '325 takes the smaller digit from the larger in every column'),
  q('math.arith.subtraction', ELEMENTARY, 'mcq', A, 'A book has 312 pages. Ali has read 178 pages. How many pages are left?', '134', ['266', '144', '490'], 'a word problem needing two exchanges'),

  // math.arith.terminating-decimals — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.terminating-decimals', MIDDLE, 'mcq', D, 'Which of these fractions gives a decimal that never ends?', '5/6', ['3/8', '7/20', '9/25'], '6 has a prime factor 3; the others have only 2s and 5s'),
  q('math.arith.terminating-decimals', MIDDLE, 'mcq', A, 'Does 21/30 give a terminating decimal?', 'Yes', ['No, because 30 has a factor of 3', 'No, because 21 is not a multiple of 2 or 5', 'It depends on the calculator'], 'simplify first: 21/30 = 7/10'),

  // math.arith.unit-rate — MIDDLE (mcq ladder F,P -> + D,A)
  q('math.arith.unit-rate', MIDDLE, 'mcq', D, 'A pack of 6 batteries costs £4.20. What is the cost of one battery?', '£0.70', ['£0.60', '£1.43', '£25.20'], 'divide the cost by the number of items'),
  q('math.arith.unit-rate', MIDDLE, 'mcq', A, 'A tap fills 18 litres in 4 minutes. How long does it take to fill 45 litres?', '10 minutes', ['8 minutes', '12 minutes', '15 minutes'], 'rate 4.5 litres per minute'),
]
