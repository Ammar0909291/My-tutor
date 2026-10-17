/**
 * MATHEMATICS CARD-DEPTH CAMPAIGN — Batch 1 (twenty-two concepts below the floor, 22 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 22 of 908 mathematics concepts held fewer than three authored cards with
 * 3+ options (22 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Library, Replacement and
 * Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds mcq and misconception_probe probes at its own band, so the new card takes the FREE slot step_check at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const EA = GradeBand.EARLY
const EL = GradeBand.ELEMENTARY
const M = GradeBand.MIDDLE
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'mcq' | 'misconception_probe' | 'true_false' | 'checkpoint' | 'step_check' | 'short_answer' | 'fill_blank' | 'numeric'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  const wrong = (w: [string, string]) => ({ text: w[0], isCorrect: false, ...(w[1] ? { misconceptionId: id(w[1]) } : {}) })
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [{ text: correct, isCorrect: true }, wrong(wrongA), wrong(wrongB)],
    targetedMisconceptions: [wrongA, wrongB].filter((w) => w[1]).map((w) => id(w[1])),
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Library; ${note}`,
  }
}

export const MATHEMATICS_CARD_DEPTH_BATCH_1: SeedProbe[] = [
  card('math.arith.order-of-operations', 'step_check', EL,
    'What is 18 − 6 + 3?',
    '15 — subtract and add from left to right: 12 + 3',
    ['9 — add first, because A comes before S in the rule', 'MC-addition-before-subtraction'],
    ['21 — treat the subtraction as an addition: 18 + 6 − 3', ''],
    'MC-addition-before-subtraction, re-asked with 18 − 6 + 3'),
  card('math.abst.group-theory', 'step_check', U,
    'Is the set of positive integers {1, 2, 3, …} under addition a group?',
    'No — it has no identity element, so it has no inverses either',
    ['Yes — it is closed under addition and associative, which is enough', 'MC-closure-suffices'],
    ['Yes — every n has an inverse, namely −n, so inverses exist', 'MC-3'],
    'MC-closure-suffices and MC-3, re-asked with the positive integers under addition'),
  card('math.nt.prime-number', 'step_check', M,
    'A student lists the primes up to 10 as 3, 5, 7. What is missing from her list, and why?',
    '2 — it is prime, because its only divisors are 1 and itself',
    ['Nothing — 2 is even, so it cannot be prime', 'MC-primes-are-odd'],
    ['1 — it is prime, because its only divisors are 1 and itself', 'MC-1'],
    'MC-primes-are-odd and MC-1, re-asked as what is missing from a list of primes'),
  card('math.geom.coordinate-plane', 'step_check', M,
    'A drone flies from the origin to the point (5, −3). In which quadrant does it finish?',
    'Quadrant IV — positive x is to the right and negative y is below',
    ['Quadrant II — the negative number puts it on the left side', 'MC-2'],
    ['Quadrant I — both numbers count as distances from the origin', ''],
    'MC-2 quadrant sign error, re-asked with (5, −3)'),
  card('math.arith.counting-sequence', 'step_check', EA,
    'A child counts three toys as "one, three, two". What is wrong with this?',
    'The words must be said in the fixed order: one, two, three',
    ['Nothing — she said three number words, so the count is right', 'MC-order-optional'],
    ['She should start counting from zero, not from one', ''],
    'MC-order-optional, re-asked with a mixed-up count of three toys'),
  card('math.arith.subitizing', 'step_check', EA,
    'Seven dots are shown as a group of four and a group of three. How can seeing them this way help?',
    'She can see 4 and 3 at a glance and put them together to make seven',
    ['It does not help — she still has to count all seven one at a time', 'MC-no-composition'],
    ['It helps her count the seven dots one by one a little faster', 'MC-fast-counting'],
    'MC-no-composition and MC-fast-counting, re-asked with four and three dots'),
  card('math.arith.number-line', 'step_check', EL,
    'The marks on a number line are at 0, 1, 2 and 3, equally spaced. Is there a point for 2½?',
    'Yes — halfway between the marks for 2 and 3',
    ['No — number lines only have points for whole numbers', 'MC-only-whole-numbers'],
    ['Yes — at the mark for 3, because 2½ rounds up', ''],
    'MC-only-whole-numbers, re-asked with the position of 2½'),
  card('math.arith.ordering', 'step_check', EL,
    'One shelf holds 64 books and another holds 59. Which shelf holds more?',
    'The 64 shelf — compare the tens first: 6 tens is more than 5 tens',
    ['The 59 shelf, because 9 is bigger than 4', 'MC-compare-ones-first'],
    ['They hold the same, because both are close to 60', ''],
    'MC-compare-ones-first, re-asked with 64 and 59'),
  card('math.arith.remainder', 'step_check', EL,
    'A shop packs eggs into boxes of 6. With 40 eggs, how many are left over after filling as many boxes as possible?',
    '4 — since 40 = 6 × 6 + 4',
    ['6 — the number of full boxes', 'MC-quotient-as-remainder'],
    ['10 — packing 5 boxes of 6 leaves 10', 'MC-remainder-can-exceed-divisor'],
    'MC-quotient-as-remainder and MC-remainder-can-exceed-divisor, re-asked with 40 eggs in boxes of 6'),
  card('math.arith.divisor-dividend', 'step_check', EL,
    'Sharing 56 sweets among 8 children gives 7 each, written 56 ÷ 8 = 7. Which number is the dividend?',
    '56 — the amount being divided up',
    ['8, because the dividend is the number we divide by', 'MC-names-swapped'],
    ['7 — the answer is called the dividend', ''],
    'MC-names-swapped, re-asked with 56 ÷ 8'),
  card('math.found.set-equality', 'step_check', M,
    'You show that every element of {2, 4, 6} is also in {2, 4, 6, 8}. What can you conclude?',
    'The first is a subset of the second, but you cannot yet say they are equal',
    ['The sets are equal, because every member of the first is in the second', 'MC-one-direction-suffices'],
    ['The sets are equal, because both contain only even numbers', ''],
    'MC-one-direction-suffices, re-asked with {2, 4, 6} and {2, 4, 6, 8}'),
  card('math.found.proper-subset', 'step_check', M,
    'Set P holds the letters a, e, i and o. Set Q holds a, e, i, o and u. Is P a proper subset of Q?',
    'Yes — every element of P is in Q, and Q also has u',
    ['No — a proper subset must be missing at least two elements', 'MC-needs-large-gap'],
    ['No — a proper subset must have exactly the same elements', ''],
    'MC-needs-large-gap, re-asked with the letters a, e, i, o and u'),
  card('math.found.axiom', 'step_check', H,
    'Why does Euclid begin his geometry with a few axioms instead of proving every statement?',
    'Every proof must start somewhere, so a few statements are chosen as starting points',
    ['Those statements are too complicated to prove', 'MC-too-hard-to-prove'],
    ['They are so obvious that nobody could doubt them', 'MC-axiom-is-obvious-truth'],
    'MC-too-hard-to-prove and MC-axiom-is-obvious-truth, re-asked about Euclid\'s axioms'),
  card('math.arith.improper-fractions', 'step_check', EL,
    'A recipe needs 5/3 cups of flour. How is this amount written as a mixed number?',
    '1⅔',
    ['2⅓', 'MC-parts-swapped'],
    ['⅔', 'MC-whole-ignored'],
    'MC-parts-swapped and MC-whole-ignored, re-asked with 5/3'),
  card('math.arith.mixed-numbers', 'step_check', EL,
    'To work out 3 × 2½ a student multiplies 3 × 2 = 6 and leaves the ½ alone. What is wrong?',
    'The ½ must be multiplied by 3 too, so 3 × 2½ = 7½',
    ['Nothing — the whole part and the fraction can be handled separately, giving 6½', 'MC-parts-separately'],
    ['The 2½ should be read as 2 × ½, so the answer is 3', 'MC-juxtaposition-is-multiplication'],
    'MC-parts-separately and MC-juxtaposition-is-multiplication, re-asked with 3 × 2½'),
  card('math.arith.repeating-decimals', 'step_check', M,
    'Which statement about 0.444… is correct?',
    'It is exactly 4/9, a rational number',
    ['It never ends, so it is irrational and cannot be a fraction', 'MC-endless-means-irrational'],
    ['It is only close to 4/9, slightly less than it', 'MC-repeating-is-approximate'],
    'MC-endless-means-irrational and MC-repeating-is-approximate, re-asked with 0.444…'),
  card('math.arith.terminating-decimals', 'step_check', M,
    'Which of 7/12, 9/12 and 5/6 gives a decimal that stops?',
    '9/12, because it simplifies to 3/4',
    ['None of them, because 12 and 6 both have a factor of 3', 'MC-judge-before-simplifying'],
    ['All of them, because every fraction gives a decimal that ends', 'MC-all-fractions-terminate'],
    'MC-judge-before-simplifying and MC-all-fractions-terminate, re-asked with three fractions'),
  card('math.found.empty-set', 'step_check', M,
    'The set of integers strictly between 5 and 6 and the set of unicorns that exist are both empty. How do they compare?',
    'They are equal: there is only one empty set',
    ['They are different sets, because they are described differently', 'MC-many-empty-sets'],
    ['They are equal only if both are described in the same words', ''],
    'MC-many-empty-sets, re-asked with two empty sets'),
  card('math.found.logical-connectives', 'step_check', H,
    'In logic, the compound statement "if P then Q" has P false and Q true. Is the compound statement true or false?',
    'True — a conditional is only false when P is true and Q is false',
    ['False — P and Q must have the same truth value', 'MC-conditional-as-biconditional'],
    ['Undefined — a conditional needs P to be true', ''],
    'MC-conditional-as-biconditional, re-asked with P false and Q true'),
  card('math.geom.angle-measurement', 'step_check', M,
    'A dial turns through three quarters of a full 360° turn. Through what angle has it turned?',
    '270° — that is 3 × 90°',
    ['135° — that is 3 × 45°', 'MC-fraction-of-turn'],
    ['180° — three quarters of a half turn', ''],
    'MC-fraction-of-turn, re-asked with a dial turning three quarters of a full turn'),
  card('math.geom.perpendicular-lines', 'step_check', M,
    'Line m is tilted on the page, and line n crosses it at 90°. Are the two lines perpendicular?',
    'Yes — what matters is the 90° angle between them, not their tilt on the page',
    ['No — perpendicular lines must be one horizontal and one vertical', 'MC-perpendicular-means-upright'],
    ['No — perpendicular lines meet at 180°', 'MC-perpendicular-is-straight'],
    'MC-perpendicular-means-upright and MC-perpendicular-is-straight, re-asked with a tilted line'),
  card('math.geom.point', 'step_check', M,
    'How much of the page does a mathematical point cover?',
    'None — a point marks a position and has no size',
    ['A tiny amount, like the smallest dot a pencil can make', 'MC-point-has-size'],
    ['Exactly one square millimetre, by convention', 'MC-arbitrary-convention'],
    'MC-point-has-size and MC-arbitrary-convention, re-asked as how much of the page a point covers'),
]
