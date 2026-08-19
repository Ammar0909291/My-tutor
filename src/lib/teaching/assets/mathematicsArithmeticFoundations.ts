/**
 * Early arithmetic — the concepts a beginner meets before anything else.
 *
 * The foundations batch covered the meta-level (what mathematical thinking is,
 * what a definition does) and the logic vocabulary. This covers the ground a
 * child actually stands on first: counting, what a digit's position means, and
 * the number line that every later idea gets drawn on.
 *
 * All eight had a full Educational Brain entry and served the learner nothing.
 *
 * ── BAND ────────────────────────────────────────────────────────────────────
 * EARLY for the counting cluster and ELEMENTARY for place value and ordering,
 * matching where each sits in a real curriculum rather than defaulting to one
 * band for tidiness. A band with probes and no explanation would be worse than
 * no band, so each concept carries both.
 *
 * ── REGISTER ────────────────────────────────────────────────────────────────
 * These are the youngest learners the platform serves, so the sentences are
 * short and every idea is anchored in something countable before it is named.
 * `first-lesson/02` puts a hard limit on new words for exactly this audience;
 * nothing here introduces more than one.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COUNT = 'math.arith.counting'
const SEQ = 'math.arith.counting-sequence'
const SUB = 'math.arith.subitizing'
const PV = 'math.arith.place-value'
const OTH = 'math.arith.ones-tens-hundreds'
const EXP = 'math.arith.expanded-form'
const NL = 'math.arith.number-line'
const ORD = 'math.arith.ordering'

export const MATHEMATICS_ARITHMETIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COUNT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.EARLY,
    content:
      'Put four buttons on the table. Touch each one and say: one, two, three, four.\n\n'
      + 'Three things had to go right there, and only one of them is saying the words. You '
      + 'touched every button — none skipped. You touched each button once — none counted '
      + 'twice. And the LAST word you said, four, is how many there are altogether. That '
      + 'last part surprises people: the other numbers were just steps along the way.\n\n'
      + 'This is why counting the same buttons in a different order still gives four. The '
      + 'answer belongs to the group, not to the path you took through it.',
    targetedMisconceptions: [`${COUNT}:MC-last-word-not-total`],
    source: eb(COUNT, 'Identity + Mental models — one-to-one, stable order, cardinality'),
  },
  {
    conceptId: SEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.EARLY,
    content:
      'One, two, three, four, five… the counting words always come in the same order. Not '
      + 'sometimes. Always.\n\n'
      + 'That is what makes counting work at all. If the words came in a different order '
      + 'each time, the last one you said would tell you nothing. Because the order never '
      + 'changes, "seven" always means further along than "five" — and further along means '
      + 'more.\n\n'
      + 'The sequence also never runs out. Whatever number you stop at, there is another one '
      + 'after it. You could keep going all day and never reach the end, because there is '
      + 'no end to reach.',
    targetedMisconceptions: [`${SEQ}:MC-order-optional`],
    source: eb(SEQ, 'Identity — stable order as the property that makes counting mean something'),
  },
  {
    conceptId: SUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.EARLY,
    content:
      'Roll a die and you see the five without counting the dots. You just know.\n\n'
      + 'That instant seeing has a name: subitizing. It works for small groups — up to about '
      + 'four or five — and it stops working after that. Show someone nine scattered dots '
      + 'and they have to count.\n\n'
      + 'It is worth noticing because it shows that "how many" is not always counting. And '
      + 'it is useful: seeing six as a three and a three, without counting to six, is the '
      + 'first step towards adding in your head.',
    targetedMisconceptions: [`${SUB}:MC-subitizing-unlimited`],
    source: eb(SUB, 'Identity — instant recognition of small quantities, and its limit'),
  },
  {
    conceptId: PV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Look at 22. Both digits are a 2, but they are not worth the same. The one on the '
      + 'right is worth 2. The one on the left is worth 20.\n\n'
      + 'A digit\'s value depends on WHERE it sits. That is place value, and it is the idea '
      + 'that lets ten symbols write every number there is. Move a digit one place to the '
      + 'left and it is worth ten times as much.\n\n'
      + 'It also explains zero. In 205 the zero is not nothing — it is holding the tens '
      + 'place open, so the 2 stays in the hundreds where it belongs. Take the zero out and '
      + 'you get 25, a completely different number.',
    targetedMisconceptions: [`${PV}:MC-digit-value-fixed`],
    source: eb(PV, 'Identity + Misconception register — position determines value; zero as placeholder'),
  },
  {
    conceptId: OTH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Reading right to left, the places are ones, then tens, then hundreds. Each one is ten '
      + 'times the place before it.\n\n'
      + 'So in 348 the 8 is eight ones, the 4 is four tens (forty), and the 3 is three '
      + 'hundreds. Say it that way a few times and the number stops being three separate '
      + 'symbols and becomes three hundred and forty-eight.\n\n'
      + 'The ten-times pattern keeps going forever: after hundreds come thousands, then ten '
      + 'thousands. You never need a new rule, only the next name.',
    targetedMisconceptions: [`${OTH}:MC-place-order-reversed`],
    source: eb(OTH, 'Identity — the ×10 ladder and its direction'),
  },
  {
    conceptId: EXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Expanded form pulls a number apart to show what each digit is really worth:\n\n'
      + '    463 = 400 + 60 + 3\n\n'
      + 'Nothing has changed about the number. You have only stopped hiding the place values '
      + 'and written them out.\n\n'
      + 'It is worth doing because it makes later arithmetic obvious instead of magical. '
      + 'When you add 463 and 200, expanded form shows immediately that only the hundreds '
      + 'part is affected. And the zeros are the giveaway: 400 has two, 60 has one, because '
      + 'that is exactly how far each digit sits from the ones place.',
    targetedMisconceptions: [`${EXP}:MC-expanded-changes-value`],
    source: eb(EXP, 'Identity — decomposition by place value, value preserved'),
  },
  {
    conceptId: NL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Draw a straight line and mark 0, then 1, then 2, keeping the gaps the same size. That '
      + 'even spacing is the whole point — it makes distance mean something.\n\n'
      + 'Now every number has a home, and the picture tells you things the digits do not. '
      + 'Further right is bigger, always. The gap between 3 and 7 is the same size as the '
      + 'gap between 10 and 14, because both are four steps.\n\n'
      + 'The line is also honest about what lies between the marks. Halfway between 2 and 3 '
      + 'is a real place, and it needs a number — which is where fractions come from. The '
      + 'line never runs out of room to the right, and later it will run left of zero too.',
    targetedMisconceptions: [`${NL}:MC-uneven-spacing`],
    source: eb(NL, 'Identity + Mental models — even spacing makes distance meaningful'),
  },
  {
    conceptId: ORD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Which is bigger, 78 or 91? Look at the tens first. Nine tens beats seven tens, so 91 '
      + 'wins — and you never had to look at the ones.\n\n'
      + 'That is the rule: compare the highest place first, and only move right when it is a '
      + 'tie. For 340 and 342 the hundreds match, the tens match, so it comes down to 0 '
      + 'against 2, and 342 is bigger.\n\n'
      + 'Watch out for length. More digits does mean bigger for whole numbers — 100 beats '
      + '99 — but that is because of the places, not the count of symbols, and the shortcut '
      + 'will let you down badly once decimals arrive.',
    targetedMisconceptions: [`${ORD}:MC-longer-is-bigger`],
    source: eb(ORD, 'Identity + Misconception register — compare by highest place, not by length'),
  },
]

export const MATHEMATICS_ARITHMETIC_PROBES: SeedProbe[] = [
  // ── counting ──────────────────────────────────────────────────────────────
  {
    conceptId: COUNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You count some shells: one, two, three, four, five. How many shells are there?',
    choices: [
      { text: 'Five', isCorrect: true },
      { text: 'One', isCorrect: false, misconceptionId: `${COUNT}:MC-last-word-not-total` },
    ],
    targetedMisconceptions: [`${COUNT}:MC-last-word-not-total`],
    source: eb(COUNT, 'Assessment gate — the last word said is the total'),
  },
  {
    conceptId: COUNT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You count six blocks left to right and get six. Now you count the same blocks right to left. What do you get?',
    choices: [
      { text: 'Six — the answer belongs to the group, not to the order you count in', isCorrect: true },
      { text: 'A different number, because you started somewhere else', isCorrect: false, misconceptionId: `${COUNT}:MC-order-changes-total` },
    ],
    targetedMisconceptions: [`${COUNT}:MC-order-changes-total`],
    source: eb(COUNT, 'Assessment gate — order irrelevance'),
  },
  {
    conceptId: COUNT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A child counting seven buttons touches one button twice. What goes wrong?',
    choices: [
      { text: 'They get eight — counting one thing twice adds a number that is not there', isCorrect: true },
      { text: 'Nothing, as long as they say the words in order', isCorrect: false, misconceptionId: `${COUNT}:MC-words-only` },
      { text: 'They get six', isCorrect: false, misconceptionId: `${COUNT}:MC-direction-of-error` },
    ],
    targetedMisconceptions: [`${COUNT}:MC-words-only`],
    source: eb(COUNT, 'Assessment gate — one-to-one correspondence, not just recitation'),
  },

  // ── counting-sequence ─────────────────────────────────────────────────────
  {
    conceptId: SEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What number comes straight after eleven?',
    choices: [
      { text: 'Twelve', isCorrect: true },
      { text: 'Twenty', isCorrect: false, misconceptionId: `${SEQ}:MC-teen-confusion` },
    ],
    targetedMisconceptions: [`${SEQ}:MC-teen-confusion` ],
    source: eb(SEQ, 'Assessment gate — the successor in the counting sequence'),
  },
  {
    conceptId: SEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is there a biggest counting number — one with nothing after it?',
    choices: [
      { text: 'No — whatever number you stop at, there is always another one after it', isCorrect: true },
      { text: 'Yes, you get to the end eventually', isCorrect: false, misconceptionId: `${SEQ}:MC-finite-sequence` },
    ],
    targetedMisconceptions: [`${SEQ}:MC-finite-sequence`],
    source: eb(SEQ, 'Assessment gate — the sequence has no last term'),
  },
  {
    conceptId: SEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does saying the counting words in the SAME order every time matter?',
    choices: [
      { text: 'Because the last word only tells you how many if the words never change places', isCorrect: true },
      { text: 'It does not matter, as long as you say them all', isCorrect: false, misconceptionId: `${SEQ}:MC-order-optional` },
    ],
    targetedMisconceptions: [`${SEQ}:MC-order-optional`],
    source: eb(SEQ, 'Assessment gate — stable order is what makes the total meaningful'),
  },

  // ── subitizing ────────────────────────────────────────────────────────────
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You glance at a die and instantly see it shows three, without counting. What did you just do?',
    choices: [
      { text: 'Recognised the amount at a glance', isCorrect: true },
      { text: 'Counted very fast', isCorrect: false, misconceptionId: `${SUB}:MC-fast-counting` },
    ],
    targetedMisconceptions: [`${SUB}:MC-fast-counting`],
    source: eb(SUB, 'Assessment gate — recognition is not fast counting'),
  },
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Someone glances at twelve scattered dots. Can they tell how many at a glance?',
    choices: [
      { text: 'No — instant seeing only works for small groups, so they must count', isCorrect: true },
      { text: 'Yes, with enough practice you can see any amount instantly', isCorrect: false, misconceptionId: `${SUB}:MC-subitizing-unlimited` },
    ],
    targetedMisconceptions: [`${SUB}:MC-subitizing-unlimited`],
    source: eb(SUB, 'Assessment gate — the limit of subitizing'),
  },
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.EARLY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Six dots are shown as two groups of three. How does seeing it that way help?',
    choices: [
      { text: 'You can see three and three and know it is six, without counting to six', isCorrect: true },
      { text: 'It does not help — you still have to count all six', isCorrect: false, misconceptionId: `${SUB}:MC-no-composition` },
    ],
    targetedMisconceptions: [`${SUB}:MC-no-composition`],
    source: eb(SUB, 'Assessment gate — composing small recognised groups'),
  },

  // ── place-value ───────────────────────────────────────────────────────────
  {
    conceptId: PV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the number 22, what is the digit on the LEFT worth?',
    choices: [
      { text: '20', isCorrect: true },
      { text: '2 — both digits are the same, so they are worth the same', isCorrect: false, misconceptionId: `${PV}:MC-digit-value-fixed` },
    ],
    targetedMisconceptions: [`${PV}:MC-digit-value-fixed`],
    source: eb(PV, 'Assessment gate — position determines value'),
  },
  {
    conceptId: PV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What job is the zero doing in 205?',
    choices: [
      { text: 'Holding the tens place open, so the 2 stays in the hundreds', isCorrect: true },
      { text: 'Nothing — it is worth zero, so it could be left out', isCorrect: false, misconceptionId: `${PV}:MC-zero-is-nothing` },
    ],
    targetedMisconceptions: [`${PV}:MC-zero-is-nothing`],
    source: eb(PV, 'Assessment gate — zero as placeholder'),
  },
  {
    conceptId: PV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Move the digit 7 one place to the LEFT in a number. What happens to its value?',
    choices: [
      { text: 'It becomes ten times as much', isCorrect: true },
      { text: 'It goes up by ten', isCorrect: false, misconceptionId: `${PV}:MC-add-ten-not-times-ten` },
      { text: 'It stays the same', isCorrect: false, misconceptionId: `${PV}:MC-digit-value-fixed` },
    ],
    targetedMisconceptions: [`${PV}:MC-add-ten-not-times-ten`],
    source: eb(PV, 'Assessment gate — each place is ×10, not +10'),
  },

  // ── ones-tens-hundreds ────────────────────────────────────────────────────
  {
    conceptId: OTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In 348, what is the 4 worth?',
    choices: [
      { text: 'Forty', isCorrect: true },
      { text: 'Four', isCorrect: false, misconceptionId: `${OTH}:MC-face-value` },
      { text: 'Four hundred', isCorrect: false, misconceptionId: `${OTH}:MC-place-order-reversed` },
    ],
    targetedMisconceptions: [`${OTH}:MC-face-value`],
    source: eb(OTH, 'Assessment gate — naming the tens place'),
  },
  {
    conceptId: OTH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Reading a whole number from the RIGHT, which place comes first?',
    choices: [
      { text: 'Ones', isCorrect: true },
      { text: 'Hundreds', isCorrect: false, misconceptionId: `${OTH}:MC-place-order-reversed` },
    ],
    targetedMisconceptions: [`${OTH}:MC-place-order-reversed`],
    source: eb(OTH, 'Assessment gate — the direction of the place ladder'),
  },
  {
    conceptId: OTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many ones make one hundred?',
    choices: [
      { text: 'A hundred — because each place is ten times the one before, and ten tens make a hundred', isCorrect: true },
      { text: 'Ten', isCorrect: false, misconceptionId: `${OTH}:MC-one-step-only` },
    ],
    targetedMisconceptions: [`${OTH}:MC-one-step-only`],
    source: eb(OTH, 'Assessment gate — composing two steps of the ×10 ladder'),
  },

  // ── expanded-form ─────────────────────────────────────────────────────────
  {
    conceptId: EXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which is 463 written in expanded form?',
    choices: [
      { text: '400 + 60 + 3', isCorrect: true },
      { text: '4 + 6 + 3', isCorrect: false, misconceptionId: `${EXP}:MC-face-value-sum` },
      { text: '4 × 6 × 3', isCorrect: false, misconceptionId: `${EXP}:MC-wrong-operation` },
    ],
    targetedMisconceptions: [`${EXP}:MC-face-value-sum`],
    source: eb(EXP, 'Assessment gate — expanding by place value, not by digit'),
  },
  {
    conceptId: EXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 400 + 60 + 3 a different number from 463?',
    choices: [
      { text: 'No — it is the same number, just written so you can see each place', isCorrect: true },
      { text: 'Yes, it is bigger because there are three numbers added together', isCorrect: false, misconceptionId: `${EXP}:MC-expanded-changes-value` },
    ],
    targetedMisconceptions: [`${EXP}:MC-expanded-changes-value`],
    source: eb(EXP, 'Assessment gate — expansion preserves value'),
  },
  {
    conceptId: EXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Write 507 in expanded form.',
    choices: [
      { text: '500 + 7 — there are no tens, so that place contributes nothing', isCorrect: true },
      { text: '500 + 0 + 7 is wrong; you must write 5 + 0 + 7', isCorrect: false, misconceptionId: `${EXP}:MC-face-value-sum` },
      { text: '50 + 7', isCorrect: false, misconceptionId: `${EXP}:MC-place-dropped` },
    ],
    targetedMisconceptions: [`${EXP}:MC-place-dropped`],
    source: eb(EXP, 'Assessment gate — expanding a number containing a zero'),
  },

  // ── number-line ───────────────────────────────────────────────────────────
  {
    conceptId: NL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'On a number line, which of 4 and 9 sits further to the right?',
    choices: [
      { text: '9 — further right always means bigger', isCorrect: true },
      { text: '4', isCorrect: false, misconceptionId: `${NL}:MC-direction-reversed` },
    ],
    targetedMisconceptions: [`${NL}:MC-direction-reversed`],
    source: eb(NL, 'Assessment gate — direction of increase'),
  },
  {
    conceptId: NL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why must the gaps between marks on a number line all be the same size?',
    choices: [
      { text: 'So that distance means something — four steps is the same length wherever you are', isCorrect: true },
      { text: 'It just looks tidier; the sizes do not matter', isCorrect: false, misconceptionId: `${NL}:MC-uneven-spacing` },
    ],
    targetedMisconceptions: [`${NL}:MC-uneven-spacing`],
    source: eb(NL, 'Assessment gate — even spacing is what carries meaning'),
  },
  {
    conceptId: NL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is there a point exactly halfway between 2 and 3 on the number line?',
    choices: [
      { text: 'Yes — it is a real place, and it needs a number of its own', isCorrect: true },
      { text: 'No — there is nothing between two whole numbers', isCorrect: false, misconceptionId: `${NL}:MC-only-whole-numbers` },
    ],
    targetedMisconceptions: [`${NL}:MC-only-whole-numbers`],
    source: eb(NL, 'Assessment gate — the line is not just the marked points'),
  },

  // ── ordering ──────────────────────────────────────────────────────────────
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which is bigger, 78 or 91?',
    choices: [
      { text: '91 — nine tens beats seven tens, so the ones never matter', isCorrect: true },
      { text: '78, because 8 is bigger than 1', isCorrect: false, misconceptionId: `${ORD}:MC-compare-ones-first` },
    ],
    targetedMisconceptions: [`${ORD}:MC-compare-ones-first`],
    source: eb(ORD, 'Assessment gate — compare the highest place first'),
  },
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which is bigger, 340 or 342?',
    choices: [
      { text: '342 — the hundreds and tens tie, so it comes down to the ones', isCorrect: true },
      { text: '340, because it is a rounder number', isCorrect: false, misconceptionId: `${ORD}:MC-roundness` },
    ],
    targetedMisconceptions: [`${ORD}:MC-roundness`],
    source: eb(ORD, 'Assessment gate — moving right only on a tie'),
  },
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says "more digits always means a bigger number". When does that rule let them down?',
    choices: [
      { text: 'With decimals — 0.9 has fewer digits than 0.25 but is larger', isCorrect: true },
      { text: 'Never — it always works', isCorrect: false, misconceptionId: `${ORD}:MC-longer-is-bigger` },
    ],
    targetedMisconceptions: [`${ORD}:MC-longer-is-bigger`],
    source: eb(ORD, 'Assessment gate — where the digit-count shortcut breaks'),
  },
]
