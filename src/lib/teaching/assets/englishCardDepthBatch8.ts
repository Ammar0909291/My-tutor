/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 8 (eng.composition part 1, 8 concepts, 24 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 1,493 of English's 1,501 authored cards had only TWO options,
 * so a blind guess scored ~50 %. Owner decision 3 (2026-10-07, `turnContract.
 * certifiesMastery`) makes a 2-option card practice-only once a concept holds three
 * authored cards with 3+ options — which no English concept did. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit the
 * existing identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for EACH of the concept's
 * two registered misconceptions (ids read off the concept's own existing probes, so
 * none is invented). Every stem is a NEW worked example — none reuses a scenario the
 * concept's existing cards already ask. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Register, Worked Examples).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain
 * a second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment
 * slug and abandon the live row's identity. Each composition concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (HIGH) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const H = GradeBand.HIGH
const A = GradeBand.ADULT

type Kind = 'short_answer' | 'fill_blank' | 'checkpoint'

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
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: kind === 'fill_blank' ? ProbeDifficulty.PROFICIENT : ProbeDifficulty.DEVELOPING,
    stem,
    choices: [
      { text: correct, isCorrect: true },
      { text: wrongA[0], isCorrect: false, misconceptionId: id(wrongA[1]) },
      { text: wrongB[0], isCorrect: false, misconceptionId: id(wrongB[1]) },
    ],
    targetedMisconceptions: [id(wrongA[1]), id(wrongB[1])],
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Register; ${note}`,
  }
}


export const ENGLISH_CARD_DEPTH_BATCH_8: SeedProbe[] = [
  // ─── eng.composition.academic-writing-conventions ────────────────────────
  card('eng.composition.academic-writing-conventions', 'short_answer', H,
    'A student\'s essay on diet says, "Many views exist about sugar." Which revision shows academic objectivity with appropriate hedging?',
    '"The evidence suggests high sugar intake is linked to weight gain, though causation is not yet settled."',
    ['"Many views exist on sugar, and an objective writer should state no position at all."', 'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL'],
    ['"It might possibly be that sugar could perhaps have some kind of effect, since hedging means staying vague."', 'MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING'],
    'clear claim plus calibrated hedging, re-asked with a sugar essay'),
  card('eng.composition.academic-writing-conventions', 'fill_blank', H,
    'Complete the sentence: academic writing ____.',
    'makes a clear, evidenced claim and hedges only where the evidence is uncertain',
    ['avoids any opinion or argument, in order to stay objective', 'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL'],
    ['hedges every claim to the same degree, to stay safe', 'MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.academic-writing-conventions', 'checkpoint', A,
    'A report writer removes every argument in the name of objectivity and hedges every sentence with "might possibly". A reviewer says both habits are wrong. Which assessment is accurate?',
    'Yes: be clear and evidenced, and hedge in proportion to the evidence',
    ['No: objectivity means the writer should hold no argument of their own at all', 'MC-A-ACADEMIC-OBJECTIVITY-MEANS-HAVING-NO-OPINION-OR-ARGUMENT-AT-ALL'],
    ['No: heavy hedging on every claim is the safest way to sound academic and cautious', 'MC-B-HEDGING-LANGUAGE-MEANS-BEING-VAGUE-OR-WEAK-ABOUT-EVERYTHING'],
    'both misconceptions, in a report-review setting'),

  // ─── eng.composition.argumentation-basics ────────────────────────────────
  card('eng.composition.argumentation-basics', 'short_answer', H,
    'An outline for "the school should have a garden" lists six reasons, four of which repeat "it is nice". Another gives three different reasons in a deliberate order. Which is stronger?',
    'The three different reasons in a deliberate order',
    ['The six reasons, because more reasons always make a stronger argument', 'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT'],
    ['They are equal, because the order of the points does not matter if the points are good', 'MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD'],
    'distinct reasons and chosen order, re-asked with a school-garden outline'),
  card('eng.composition.argumentation-basics', 'fill_blank', H,
    'Complete the sentence: a strong argument has ____.',
    'distinct, well-chosen reasons arranged in a deliberate order',
    ['as many reasons as possible, however similar they are', 'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT'],
    ['good points in any order, since the arrangement is irrelevant', 'MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.argumentation-basics', 'checkpoint', A,
    'A memo on a new parking policy lists nine reasons in no particular order, several repeating each other. Revised, it gives three distinct reasons, strongest last. A colleague prefers the nine-reason version and says order is irrelevant. Which assessment is accurate?',
    'The revision is stronger: distinct reasons in a chosen order beat many repeated ones',
    ['The colleague is right that nine reasons make a stronger argument than three', 'MC-A-MORE-REASONS-IS-ALWAYS-A-STRONGER-ARGUMENT'],
    ['The colleague is right that the order of the points makes no difference to an argument', 'MC-B-ARGUMENT-ORGANIZATION-DOESNT-MATTER-AS-LONG-AS-THE-POINTS-ARE-GOOD'],
    'both misconceptions, with a parking-policy memo'),

  // ─── eng.composition.audience-and-purpose ────────────────────────────────
  card('eng.composition.audience-and-purpose', 'short_answer', H,
    'A student writes about "sleep". Her teacher asks for her purpose and audience. Which answer is correct?',
    'Purpose: persuade teens to sleep more; audience: her classmates',
    ['Purpose: sleep, since the purpose of a piece is simply its topic', 'MC-A-PURPOSE-IS-THE-TOPIC'],
    ['Audience: anyone who happens to read the essay, so no special planning is needed', 'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT'],
    'purpose vs. topic; audience as planned-for readers, re-asked with a sleep essay'),
  card('eng.composition.audience-and-purpose', 'fill_blank', H,
    'Complete the sentence: a writer\'s audience is ____.',
    'the specific readers being written for, with their knowledge and needs',
    ['whoever happens to end up reading it', 'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT'],
    ['the topic the writer chose to write about', 'MC-A-PURPOSE-IS-THE-TOPIC'],
    'three audience questions (Replacement text, MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT)'),
  card('eng.composition.audience-and-purpose', 'checkpoint', A,
    'A manager says her email is "about the software update" and sends it unchanged to the whole company. Which analysis is accurate?',
    '"About the update" is a topic, not a purpose, and she should shape it for the readers who need it',
    ['Her description states the purpose, since the purpose is the same as the topic', 'MC-A-PURPOSE-IS-THE-TOPIC'],
    ['No planning is needed, because the audience is just whoever happens to read the email', 'MC-B-AUDIENCE-MEANS-WHOEVER-READS-IT'],
    'both misconceptions, in a workplace email'),

  // ─── eng.composition.claim-evidence-reasoning ────────────────────────────
  card('eng.composition.claim-evidence-reasoning', 'short_answer', H,
    '"We should recycle more. Last year the town recycled 20% of its waste." Which addition best completes the argument?',
    '"A rate this low means most recyclable waste ends up in landfill."',
    ['Nothing: once a statistic stands beside the claim, the argument is already complete', 'MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH'],
    ['"In other words, we really should recycle more than we do."', 'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN'],
    'reasoning explains how evidence supports the claim, re-asked with a recycling statistic'),
  card('eng.composition.claim-evidence-reasoning', 'fill_blank', H,
    'Complete the sentence: reasoning is the part that ____.',
    'explains why the evidence supports the claim',
    ['can be left out once evidence sits beside the claim', 'MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH'],
    ['says the claim again in different words', 'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.claim-evidence-reasoning', 'checkpoint', A,
    'A proposal says, "We should adopt flexible hours. Staff turnover fell 15% at a firm that did." A reviewer asks for reasoning, and the author adds, "Therefore, flexible hours should be adopted." Which assessment is accurate?',
    'That only restates the claim; reasoning must explain the link',
    ['No reasoning was needed, since evidence placed beside a claim is enough', 'MC-A-EVIDENCE-NEXT-TO-A-CLAIM-IS-ENOUGH'],
    ['The addition is good reasoning, since reasoning means stating the claim again', 'MC-B-REASONING-MEANS-JUST-RESTATING-THE-CLAIM-AGAIN'],
    'both misconceptions, with a flexible-hours proposal'),

  // ─── eng.composition.comparative-essay-writing ───────────────────────────
  card('eng.composition.comparative-essay-writing', 'short_answer', H,
    'A student compares two songs. Which plan is best?',
    'Paragraphs organised by point, such as theme and mood, comparing both songs in each',
    ['Describe the first song fully, then describe the second song fully', 'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER'],
    ['Give a paragraph to each similarity, such as that both were released on a Friday', 'MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH'],
    'point-by-point structure and meaningful points, re-asked with two songs'),
  card('eng.composition.comparative-essay-writing', 'fill_blank', H,
    'Complete the sentence: a strong comparison is organised by ____.',
    'point, each point revealing something meaningful about both items',
    ['block, with one item described fully and then the other', 'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER'],
    ['whatever similarities and differences come to mind, however minor', 'MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.comparative-essay-writing', 'checkpoint', A,
    'Comparing two suppliers, an analyst writes four paragraphs on Supplier A, four on Supplier B, and a paragraph on the fact that both have blue logos. A colleague calls it a fine comparison. Which assessment is accurate?',
    'It is weak: use meaningful points such as price and reliability, and skip trivial ones',
    ['It is fine: comparing means fully describing one item and then the other', 'MC-A-A-COMPARATIVE-ESSAY-MEANS-FULLY-DESCRIBING-ONE-ITEM-THEN-FULLY-DESCRIBING-THE-OTHER'],
    ['It is fine: any similarity, even blue logos, deserves a whole paragraph of its own in the comparison', 'MC-B-ANY-SUPERFICIAL-SIMILARITY-OR-DIFFERENCE-IS-A-MEANINGFUL-POINT-OF-COMPARISON-WORTH-A-PARAGRAPH'],
    'both misconceptions, with two suppliers'),

  // ─── eng.composition.counterargument-and-rebuttal ────────────────────────
  card('eng.composition.counterargument-and-rebuttal', 'short_answer', H,
    'An essay argues for a later school start. Which treatment of the opposing view is strongest?',
    'State the strongest concern fairly, then answer it with specific evidence',
    ['Quote a silly objection, such as "some kids like mornings", and defeat it easily', 'MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT'],
    ['Mention the objection, then repeat "later starts are better" even more forcefully', 'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY'],
    'fair opposing view and a real rebuttal, re-asked with a school start time'),
  card('eng.composition.counterargument-and-rebuttal', 'fill_blank', H,
    'Complete the sentence: a good counterargument section ____.',
    'presents the opposing view fairly and answers it with specific reasons or evidence',
    ['picks the weakest opposing view so that it can be easily defeated', 'MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT'],
    ['restates your own position more forcefully', 'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.counterargument-and-rebuttal', 'checkpoint', A,
    'In a memo on remote work, a writer answers the objection "people lose team spirit" with "Some people just dislike change", then repeats "remote work is better" in bold. A reviewer is unimpressed. Which assessment is accurate?',
    'The objection was caricatured and the rebuttal only repeated the position',
    ['The writer did it right: counterarguments should be chosen so they are easy to defeat', 'MC-A-COUNTERARGUMENT-MEANS-PICKING-THE-WEAKEST-OPPOSING-VIEW-TO-EASILY-DEFEAT'],
    ['The writer did it right: a rebuttal is a more forceful restatement of the position', 'MC-B-REBUTTAL-MEANS-JUST-RESTATING-YOUR-ORIGINAL-POSITION-MORE-FORCEFULLY'],
    'both misconceptions, with a remote-work memo'),

  // ─── eng.composition.editing-for-style ───────────────────────────────────
  card('eng.composition.editing-for-style', 'short_answer', H,
    '"In spite of the fact that the roads were icy, the bus was on time." A grammar checker finds no errors. What is the best conclusion?',
    'It is correct but can be tightened: "Although the roads were icy, the bus was on time"',
    ['Nothing is left to edit, since the sentence is grammatically correct', 'MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT'],
    ['Cut it as far as possible, as in "Roads icy, bus on time", since cutting words always improves a sentence', 'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT'],
    'style pass after grammar; cut only what adds nothing, re-asked with an icy-roads sentence'),
  card('eng.composition.editing-for-style', 'fill_blank', H,
    'Complete the sentence: after a draft is grammatically correct, ____.',
    'do a style pass that cuts empty words but keeps the meaning',
    ['stop, since grammar is all that editing needs to check', 'MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT'],
    ['cut as many words as you can, whatever they carry', 'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.editing-for-style', 'checkpoint', A,
    'A sentence passes the grammar checker. One colleague says to cut every adjective, since cutting always improves a sentence; another says nothing is left to edit because the grammar is fine. Which approach is sound?',
    'Run a separate style pass: cut words that add nothing, and keep those that carry meaning',
    ['The first colleague: cutting words always improves a sentence, whatever is cut', 'MC-B-CUTTING-WORDS-ALWAYS-IMPROVES-A-SENTENCE-REGARDLESS-OF-WHAT-IS-CUT'],
    ['The second colleague: grammatical correctness means that no further editing is needed', 'MC-A-IF-A-SENTENCE-IS-GRAMMATICALLY-CORRECT-THERE-IS-NOTHING-LEFT-TO-EDIT'],
    'both misconceptions, in a workplace editing setting'),

  // ─── eng.composition.figurative-language-in-composition ──────────────────
  card('eng.composition.figurative-language-in-composition', 'short_answer', H,
    'A student explaining how a vaccine works writes, "The vaccine is a practice drill for your body\'s defences." A classmate says metaphors belong only in stories; another says more metaphors always improve writing. What is the best view?',
    'One clear, controlled metaphor can explain an abstract idea well',
    ['The first classmate is right: metaphors belong only in fiction and poetry', 'MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY'],
    ['Add several more metaphors, since any figurative language makes writing better', 'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING'],
    'controlled metaphors in explanation, re-asked with a vaccine metaphor'),
  card('eng.composition.figurative-language-in-composition', 'fill_blank', H,
    'Complete the sentence: in explanatory writing, a metaphor ____.',
    'can clarify an abstract idea if it is controlled and fits',
    ['has no place, because figurative language belongs only in fiction or poetry', 'MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY'],
    ['always improves the piece, however many are added', 'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING'],
    'Replacement texts for both misconceptions'),
  card('eng.composition.figurative-language-in-composition', 'checkpoint', A,
    'A finance blog explains compound interest as "a snowball rolling downhill". A critic says metaphors belong only in poetry; the editor adds three unrelated metaphors to the paragraph to improve it. Which assessment is accurate?',
    'The snowball clarifies; piling on unrelated metaphors confuses',
    ['The critic is right: figurative language belongs only in fiction or poetry', 'MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY'],
    ['The editor is right: more figurative language always improves writing, whatever it is', 'MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING'],
    'both misconceptions, with a compound-interest metaphor'),
]
