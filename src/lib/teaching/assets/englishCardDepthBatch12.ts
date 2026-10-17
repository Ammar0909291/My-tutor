/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 12 (eng.vocab part 1, 8 concepts, 24 cards).
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
 * slug and abandon the live row's identity. Each vocabulary concept already uses
 *   native band : mcq, misconception_probe, checkpoint, true_false
 *   ADULT       : mcq, misconception_probe
 * so the three new cards take the FREE slots:
 *   native band (HIGH, or MIDDLE for compound-words, context-clues, homonyms-homophones and idioms) : short_answer, fill_blank      ADULT : checkpoint
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const M = GradeBand.MIDDLE
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


export const ENGLISH_CARD_DEPTH_BATCH_12: SeedProbe[] = [
  // ─── eng.vocab.academic-vocabulary ───────────────────────────────────────
  card('eng.vocab.academic-vocabulary', 'short_answer', H,
    'A student calls "mitosis" and "hypothesis" the same kind of academic word because both sound complex, and reads "power" in a physics text as "strength". What is accurate?',
    '"Hypothesis" is general academic vocabulary and "mitosis" is subject jargon; "power" has a precise physics meaning',
    ['"Hypothesis" and "mitosis" are both academic vocabulary, since any complex-sounding word in an academic text counts', 'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY'],
    ['"Power" means strength in physics, exactly as in everyday speech, since academic words keep their casual meaning', 'MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH'],
    'general academic words vs. jargon; meanings that shift, re-asked with mitosis, hypothesis and power'),
  card('eng.vocab.academic-vocabulary', 'fill_blank', H,
    'Complete the sentence: academic vocabulary consists of ____.',
    'words used across school subjects, which may carry precise meanings there',
    ['any complex-sounding word that appears in an academic text', 'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY'],
    ['words that keep exactly their everyday meanings in academic writing', 'MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.academic-vocabulary', 'checkpoint', A,
    'A trainee tags "enthalpy" and "therefore" as the same kind of academic vocabulary, and assumes "model" in a statistics paper means a fashion model. Which assessment is accurate?',
    '"Enthalpy" is subject jargon and "therefore" is general academic vocabulary; "model" has a specialised meaning',
    ['Both count as academic vocabulary, because both sound complex', 'MC-A-ANY-UNFAMILIAR-OR-COMPLEX-SOUNDING-WORD-IN-AN-ACADEMIC-TEXT-COUNTS-AS-ACADEMIC-VOCABULARY'],
    ['"Model" means the same as in casual speech, since academic words never change meaning', 'MC-B-ACADEMIC-WORDS-MEAN-THE-SAME-THING-IN-ACADEMIC-WRITING-AS-THEY-DO-IN-EVERYDAY-CASUAL-SPEECH'],
    'both misconceptions, with enthalpy, therefore and model'),

  // ─── eng.vocab.collocations ──────────────────────────────────────────────
  card('eng.vocab.collocations', 'short_answer', H,
    'A learner writes "do a photograph" and "heavy tea" for "take a photograph" and "strong tea", arguing that near-synonyms swap freely; another calls all collocations idioms. What is the best view?',
    'Collocations are habitual pairings with transparent meaning, unlike idioms',
    ['Near-synonyms swap freely, since a word that fits the meaning fits the phrase', 'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE'],
    ['Collocations are just a fancy name for idioms, so both work the same way', 'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS'],
    'fixed pairings with transparent meaning, re-asked with take a photograph and strong tea'),
  card('eng.vocab.collocations', 'fill_blank', H,
    'Complete the sentence: a collocation is a habitual word pairing with ____.',
    'a transparent meaning, which a close synonym often cannot replace',
    ['a meaning that fits any synonym, so words can be swapped freely', 'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE'],
    ['a surprising, non-literal meaning, just like an idiom', 'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.collocations', 'checkpoint', A,
    'A manager writes "make a risk" for "take a risk" because "make" and "take" can both mean "do", and calls "take a risk" an idiom like "kick the bucket". Which assessment is accurate?',
    '"Take a risk" is a collocation with a transparent meaning; it is not an idiom',
    ['"Make a risk" is equally fine, since a close synonym of "take" fits the same meaning', 'MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE'],
    ['She is right: collocations are just idioms by another name', 'MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS'],
    'both misconceptions, with take a risk'),

  // ─── eng.vocab.compound-words ────────────────────────────────────────────
  card('eng.vocab.compound-words', 'short_answer', M,
    '"Blackboard" is a board for writing, "blackbird" is one particular kind of bird, and "post office" is written as two words. What is true of compound words?',
    'Their meanings can be opaque, and they may be written closed, hyphenated or open',
    ['Every compound means exactly the sum of its parts, so "blackbird" is any black bird', 'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM'],
    ['A real compound is always written as one word, so "post office" is not a compound', 'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD'],
    'opaque meanings and three spellings, re-asked with blackboard, blackbird and post office'),
  card('eng.vocab.compound-words', 'fill_blank', M,
    'Complete the sentence: a compound word is two words that ____.',
    'combine to express one idea, whether written together, hyphenated or apart',
    ['always mean exactly the sum of their parts', 'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM'],
    ['are always joined into a single written word', 'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.compound-words', 'checkpoint', A,
    'A trainee says "greenhouse" must mean any house that is green, and that "high school" cannot be a compound because it is written as two words. Which assessment is accurate?',
    '"Greenhouse" is opaque, and "high school" is a compound written open',
    ['She is right about "greenhouse": compounds are literal sums of their parts', 'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM'],
    ['She is right about "high school": compounds are always written as one word', 'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD'],
    'both misconceptions, with greenhouse and high school'),

  // ─── eng.vocab.connotation-denotation ────────────────────────────────────
  card('eng.vocab.connotation-denotation', 'short_answer', H,
    'A writer wants to praise a colleague who works hard to get things right, and chooses between "meticulous" and "fussy". Another says connotation is just each reader\'s opinion. What is the best view?',
    'Choose "meticulous": connotation is shared, so near-synonyms are not interchangeable',
    ['Either works, since similar literal meanings make the words interchangeable', 'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE'],
    ['It does not matter, because connotation is only personal opinion and varies unpredictably', 'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION'],
    'denotation plus shared connotation, re-asked with meticulous and fussy'),
  card('eng.vocab.connotation-denotation', 'fill_blank', H,
    'Complete the sentence: when choosing between near-synonyms, check ____.',
    'both their literal meaning and the shared feeling each carries',
    ['only that their literal meanings match, since then they are interchangeable', 'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE'],
    ['your own opinion of each word, since connotation is purely personal', 'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.connotation-denotation', 'checkpoint', A,
    'In a reference letter a writer changes "slim" to "skinny" and "assertive" to "bossy", thinking each pair is interchangeable, and says nobody agrees on how words sound anyway. Which assessment is accurate?',
    'Same denotation does not make them interchangeable; connotation is shared, so the swaps change the tone',
    ['The swaps are harmless, since words with the same meaning are interchangeable', 'MC-SAME-DENOTATION-MEANS-INTERCHANGEABLE'],
    ['Connotation is purely personal, so no change of tone can be predicted from the swaps', 'MC-CONNOTATION-IS-JUST-PERSONAL-OPINION'],
    'both misconceptions, in a reference letter'),

  // ─── eng.vocab.context-clues ─────────────────────────────────────────────
  card('eng.vocab.context-clues', 'short_answer', M,
    '"The frugal family cooked at home, reused jars and bought only what they needed." A student sees "bought", guesses "frugal" means "shopping", and is sure she is right. What is the best advice?',
    'Use all the clues in the sentence, and treat the guess as one to test',
    ['Settle on "shopping", since one nearby word is enough to decide', 'MC-GUESS-FROM-ONE-WORD-NEARBY'],
    ['Be certain of it, because context clues always give the exact meaning of a word', 'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY'],
    'scan all clues and keep the guess revisable, re-asked with "frugal"'),
  card('eng.vocab.context-clues', 'fill_blank', M,
    'Complete the sentence: to work out an unknown word from context, ____.',
    'read the whole sentence and test your guess',
    ['pick the first word nearby that stands out', 'MC-GUESS-FROM-ONE-WORD-NEARBY'],
    ['trust that context clues always give the exact meaning', 'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.context-clues', 'checkpoint', A,
    'A trainee meets "ephemeral" in "The ephemeral blossoms were gone by morning". She guesses "beautiful" from "blossoms" and treats it as certain. Which assessment is accurate?',
    '"Gone by morning" is the key clue (short-lived); the guess should use the whole sentence and stay open to revision',
    ['Her guess is sound: one nearby word, "blossoms", is enough to decide', 'MC-GUESS-FROM-ONE-WORD-NEARBY'],
    ['She is right to be certain, since context always settles a word\'s meaning', 'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY'],
    'both misconceptions, with "ephemeral"'),

  // ─── eng.vocab.etymology ─────────────────────────────────────────────────
  card('eng.vocab.etymology', 'short_answer', H,
    '"Terrific" once meant "causing terror". A student says it still truly means that, and another says every English word comes from a single language with no borrowing. What is the best view?',
    'Check current usage for today\'s meaning; English borrows from many languages',
    ['"Terrific" truly means "terrifying", since a word\'s original sense is its correct meaning', 'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY'],
    ['Every word comes from one clear source language, with no borrowing from others', 'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING'],
    'origin does not fix present meaning; borrowing is common, re-asked with "terrific"'),
  card('eng.vocab.etymology', 'fill_blank', H,
    'Complete the sentence: a word\'s etymology tells us ____.',
    'how the word developed, not what it means today',
    ['its true meaning today, which is its oldest meaning', 'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY'],
    ['the single language it came from, with no borrowing', 'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.etymology', 'checkpoint', A,
    'A writer insists "decimate" can only mean "kill one in ten" because of its Latin origin, and that each English word has one source language. Which assessment is accurate?',
    'Origin does not fix present meaning, and English words often come from several languages by borrowing',
    ['He is right: the original meaning is the true meaning today', 'MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY'],
    ['He is right: each English word has one clear source and no borrowing', 'MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING'],
    'both misconceptions, with "decimate"'),

  // ─── eng.vocab.homonyms-homophones ───────────────────────────────────────
  card('eng.vocab.homonyms-homophones', 'short_answer', M,
    '"Bat" (animal) and "bat" (cricket) are spelled alike but differ in meaning; "pair" and "pear" sound alike but are spelled differently. A student calls all four "homonyms" and says context never helps. What is accurate?',
    '"Bat/bat" are homonyms, "pair/pear" are homophones; context decides',
    ['All four are homonyms, since homonym and homophone mean the same thing', 'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING'],
    ['Context cannot help, so these words are simply confusing and no rule decides them', 'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS'],
    'homonym vs. homophone; context decides, re-asked with bat and pear'),
  card('eng.vocab.homonyms-homophones', 'fill_blank', M,
    'Complete the sentence: to tell which meaning or spelling is intended, ____.',
    'use the surrounding context',
    ['ignore the context, since it does not matter for these words', 'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS'],
    ['treat homonyms and homophones as one thing and pick either', 'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING'],
    'use context (Replacement text, MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS)'),
  card('eng.vocab.homonyms-homophones', 'checkpoint', A,
    'A trainee writes "Their going to hire a new site manager" and says "there/their/they\'re" are all "homonyms", so any spelling is fine because context does not matter. Which assessment is accurate?',
    'They are homophones (different spelling, same sound), and context decides: "They\'re going to hire a new site manager"',
    ['They are homonyms, which is exactly the same thing as homophones', 'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING'],
    ['Any spelling is fine, since context does not matter for these words', 'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS'],
    'both misconceptions, with their/there/they\'re in a workplace sentence'),

  // ─── eng.vocab.idioms ────────────────────────────────────────────────────
  card('eng.vocab.idioms', 'short_answer', M,
    'A learner tries to decode "bite the bullet" by translating each word, and says "chew the bullet" must mean the same. What is the best advice?',
    'An idiom is learned whole with fixed wording: "chew the bullet" is not it',
    ['Decode it word by word, so it means to bite a bullet', 'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY'],
    ['Swap in "chew" freely, since the meaning stays similar whichever word is used', 'MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR'],
    'idioms are fixed wholes, re-asked with "bite the bullet"'),
  card('eng.vocab.idioms', 'fill_blank', M,
    'Complete the sentence: idioms are learned as ____.',
    'whole phrases with fixed wording',
    ['word-by-word translations of their literal parts', 'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY'],
    ['flexible wordings in which any similar word can be swapped in', 'MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.idioms', 'checkpoint', A,
    'A manager reads "back to the drawing board" as a literal trip to a board, and later writes "back to the sketch table" because the meaning seems similar. Which assessment is accurate?',
    'The idiom means starting again; its meaning cannot be derived word by word, and its wording is fixed',
    ['She should read each word literally to find its meaning', 'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY'],
    ['She can change words freely as long as the meaning stays similar', 'MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR'],
    'both misconceptions, with "back to the drawing board"'),
]
