/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 7 (eng.reading part 2, 8 concepts, 24 cards).
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
 * slug and abandon the live row's identity. Each reading concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (ELEMENTARY, or HIGH for reading-across-genres) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const EL = GradeBand.ELEMENTARY
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


export const ENGLISH_CARD_DEPTH_BATCH_7: SeedProbe[] = [
  // ─── eng.reading.main-idea-and-details ───────────────────────────────────
  card('eng.reading.main-idea-and-details', 'short_answer', EL,
    'A paragraph begins, "My bike has a squeaky bell." The next four sentences say how my bike takes me to school, the shop, the park and my friend\'s house. What is the main idea?',
    'My bike takes me to lots of places',
    ['My bike has a squeaky bell, because the first sentence is always the main idea', 'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA'],
    ['There is no main idea, because no sentence says it word for word', 'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE'],
    'main idea covers all details; it can be implied, re-asked with a bike paragraph'),
  card('eng.reading.main-idea-and-details', 'fill_blank', EL,
    'Complete the sentence: the main idea is ____.',
    'the big idea that all the sentences support, stated or implied',
    ['always the first sentence of the paragraph', 'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA'],
    ['only a sentence that is written out word for word in the text', 'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.main-idea-and-details', 'checkpoint', A,
    'A paragraph opens, "The office was cold on Monday." It then lists how remote work saves staff time, money and stress, without ever stating that remote work is beneficial. Which analysis is accurate?',
    'Implied main idea: remote work has several benefits',
    ['The main idea is that the office was cold, since the first sentence is always the main idea', 'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA'],
    ['There is no main idea, since none is stated word for word in the paragraph', 'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE'],
    'both misconceptions, with an implied main idea'),

  // ─── eng.reading.predicting-and-confirming ───────────────────────────────
  card('eng.reading.predicting-and-confirming', 'short_answer', EL,
    'A story called "The Day the Lights Went Out" opens with thunder and a dark house. A reader predicts a power cut, then reads that the lights were switched off for a surprise party. What should she do?',
    'Revise her prediction using the new clue, because a prediction is a working guess',
    ['Decide that predictions need no clues from the text, so any guess would have done', 'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES'],
    ['Defend her power-cut prediction, since a prediction should be kept once it is made', 'MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED'],
    'predict from clues, then confirm or revise, re-asked with a lights-out story'),
  card('eng.reading.predicting-and-confirming', 'fill_blank', EL,
    'Complete the sentence: a good prediction uses clues from the text and is ____.',
    'changed when new information shows it was wrong',
    ['a free guess that needs no clues', 'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES'],
    ['defended to the end, even when the text disagrees', 'MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.predicting-and-confirming', 'checkpoint', A,
    'From the title "Budget Cuts Hit Training Programmes", a reader predicts the report will mention staff morale. Midway it focuses on equipment costs. One colleague says predictions need no textual basis; another says the reader must now argue the report is wrong. Which view is sound?',
    'The prediction came from a title clue and can be revised',
    ['The first colleague is right: a prediction is only a guess and needs no clues', 'MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES'],
    ['The second is right: once made, a prediction must be defended, not revised', 'MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED'],
    'both misconceptions, with a report title'),

  // ─── eng.reading.print-to-meaning ────────────────────────────────────────
  card('eng.reading.print-to-meaning', 'short_answer', EL,
    'Mo reads a page aloud perfectly but cannot say what it was about. Lia says she "understood nothing" about another page, yet she can say who it was about. What is true?',
    'Mo needs to check his meaning; Lia understood part of it and can work on the gaps',
    ['Mo understood it, since he read every word correctly aloud', 'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION'],
    ['Lia understood nothing, since understanding is all or nothing', 'MC-COMPREHENSION-IS-ALL-OR-NOTHING'],
    'accurate reading is not comprehension; comprehension comes in parts, re-asked with Mo and Lia'),
  card('eng.reading.print-to-meaning', 'fill_blank', EL,
    'Complete the sentence: to check comprehension, ____.',
    'explain what the text said in your own words, and notice which parts are unclear',
    ['listen to yourself read it aloud without any mistakes', 'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION'],
    ['decide whether you understood all of it or none of it', 'MC-COMPREHENSION-IS-ALL-OR-NOTHING'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.print-to-meaning', 'checkpoint', A,
    'An employee reads a safety notice aloud flawlessly but cannot explain what to do in an emergency, and says, "I got none of it." Which assessment is accurate?',
    'Accurate reading is not understanding; he should target the gaps',
    ['He understood it, since reading aloud without a single error shows comprehension', 'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION'],
    ['He is right: if he cannot explain all of it, then he understood nothing', 'MC-COMPREHENSION-IS-ALL-OR-NOTHING'],
    'both misconceptions, with a safety notice'),

  // ─── eng.reading.reading-across-genres ───────────────────────────────────
  card('eng.reading.reading-across-genres', 'short_answer', H,
    'A student has a news report on a flood, a poem about the flood and a government recovery plan. Which synthesis is strongest?',
    'One that links them by theme and shows what each genre adds',
    ['Three back-to-back paragraph summaries, one for each source', 'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK'],
    ['None is possible, because a poem, a report and a plan belong to different genres', 'MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED'],
    'synthesis across genres, re-asked with a flood report, poem and plan'),
  card('eng.reading.reading-across-genres', 'fill_blank', H,
    'Complete the sentence: to synthesise texts from different genres, ____.',
    'find the ideas they share and what each genre adds to them',
    ['summarise each one in turn and stop there', 'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK'],
    ['keep them apart, since different genres cannot be connected', 'MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.reading-across-genres', 'checkpoint', A,
    'An analyst has a customer complaint email, a technical memo and a short employee diary about the same outage. She writes one summary of each. A manager says texts in different genres cannot be meaningfully combined. Which view is accurate?',
    'They can be synthesised around a shared claim',
    ['Her three summaries already count as a synthesis of the sources', 'MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK'],
    ['The manager is right: different genres cannot be meaningfully connected', 'MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED'],
    'both misconceptions, with an outage case'),

  // ─── eng.reading.reading-fluency ─────────────────────────────────────────
  card('eng.reading.reading-fluency', 'short_answer', EL,
    'Raj wants to read more smoothly. He reads as fast as he can, thinking speed is the goal, and he reads many new books once each. What is the best advice?',
    'Practise repeated reading, aiming for accuracy, pace and expression',
    ['Keep going as fast as he can, since fluency is speed', 'MC-READING-FLUENCY-IS-JUST-SPEED'],
    ['Just keep reading many new books once each, since fluency develops by itself', 'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE'],
    'three components and repeated reading, re-asked with Raj'),
  card('eng.reading.reading-fluency', 'fill_blank', EL,
    'Complete the sentence: to build fluency, ____.',
    're-read the same short passage until it flows, as well as reading widely',
    ['read as quickly as you can', 'MC-READING-FLUENCY-IS-JUST-SPEED'],
    ['simply read lots of new texts once each', 'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.reading-fluency', 'checkpoint', A,
    'A trainee skims every procedure at top speed with flat expression, and believes that reading a large volume will automatically make him fluent. Which advice is accurate?',
    'Judge fluency by accuracy, pace and expression, and add repeated reading',
    ['He is right that speed is what fluency means', 'MC-READING-FLUENCY-IS-JUST-SPEED'],
    ['He is right that sheer volume alone will build fluency without any extra practice', 'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE'],
    'both misconceptions, with a trainee'),

  // ─── eng.reading.skimming-and-scanning ───────────────────────────────────
  card('eng.reading.skimming-and-scanning', 'short_answer', EL,
    'You need the phone number on a long page, and later must explain how an author\'s argument works. What should you do?',
    'Scan for the number, and read carefully to explain the argument',
    ['Use the same technique for both, because skimming and scanning are two names for one skill', 'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES'],
    ['Skim for both, because skimming gives the same understanding as careful reading', 'MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING'],
    'purpose decides the technique; depth needs careful reading, re-asked with a phone number'),
  card('eng.reading.skimming-and-scanning', 'fill_blank', EL,
    'Complete the sentence: you skim to get the general idea and scan to find one fact, and ____.',
    'neither gives the depth of careful reading',
    ['they are really the same technique under two names', 'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES'],
    ['both give the same understanding as careful reading', 'MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.skimming-and-scanning', 'checkpoint', A,
    'Before a meeting, an analyst skims a 30-page report for its general topic, then scans for one figure. A colleague says the two are the same technique and that skimming gives the same understanding as careful reading, so details can be skipped. Which view is accurate?',
    'They are different techniques, and neither gives a careful reader\'s depth',
    ['The colleague is right that they are the same technique under two names', 'MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES'],
    ['The colleague is right that skimming gives the same depth, so details can safely be skipped', 'MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING'],
    'both misconceptions, with a 30-page report'),

  // ─── eng.reading.summarizing ─────────────────────────────────────────────
  card('eng.reading.summarizing', 'short_answer', EL,
    'A student summarises a three-page article about bees. Which summary is best?',
    'A short paragraph in her own words giving the main idea and key details',
    ['Three important sentences copied word for word', 'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES'],
    ['A page and a half that includes every detail from the article', 'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL'],
    'own words, load-bearing details only, re-asked with a bee article'),
  card('eng.reading.summarizing', 'fill_blank', EL,
    'Complete the sentence: a good summary ____.',
    'keeps the main idea and key details, in your own words',
    ['copies the most important sentences from the text', 'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES'],
    ['includes every detail so that nothing is lost', 'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.summarizing', 'checkpoint', A,
    'To summarise a project report for executives, one analyst pastes the three most important sentences; another tries to include every figure and quote. Which approach is sound?',
    'Neither: restate the main idea and key details in your own words',
    ['The first: copying the key sentences is what summarising means', 'MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES'],
    ['The second: a good summary includes every detail from the original', 'MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL'],
    'both misconceptions, with a project report'),

  // ─── eng.reading.text-structure ──────────────────────────────────────────
  card('eng.reading.text-structure', 'short_answer', EL,
    'A passage has two paragraphs. The first says why a river flooded; the second compares two flood barriers. A student says its structure is "two paragraphs" and that the whole passage is one pattern. What is the best view?',
    'Look at how the ideas relate: the first part is cause-effect and the second compare-contrast',
    ['She is right that structure means how many paragraph breaks there are', 'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS'],
    ['It must be given one overall label, so choose only cause-effect for all of it', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN'],
    'structure is the relationship between ideas; sections can differ, re-asked with a flood passage'),
  card('eng.reading.text-structure', 'fill_blank', EL,
    'Complete the sentence: text structure is shown by ____.',
    'how the ideas relate, such as sequence or cause and effect',
    ['where the paragraph breaks fall', 'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS'],
    ['one pattern that must fit the entire text', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN'],
    'Replacement texts for both misconceptions'),
  card('eng.reading.text-structure', 'checkpoint', A,
    'A report is cut into six tidy sections. One tells a project\'s events in time order; another weighs two software options side by side. A reviewer says six sections show the structure, and that a report can have only one pattern. Which analysis is accurate?',
    'Structure is how ideas relate, and patterns can differ by section',
    ['The reviewer is right that clear sections are what text structure means', 'MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS'],
    ['The reviewer is right that the report can only have one structure pattern', 'MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN'],
    'both misconceptions, with a sectioned report'),
]
