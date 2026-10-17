/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 19 (eng.grammar part 1, 25 cards).
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
 * slug and abandon the live row's identity. Each grammar concept already uses native band : mcq, misconception_probe, true_false, checkpoint and ADULT : mcq (two probes, one promoted by difficulty), misconception_probe, so the new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint. Concepts that already hold one 3-option card (adjectives, articles-and-determiners) receive two cards (short_answer + checkpoint). The native band is EARLY for capitalization-rules, HIGH for colons-semicolons-dashes, MIDDLE for the rest.
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


const E = GradeBand.EARLY

export const ENGLISH_CARD_DEPTH_BATCH_19: SeedProbe[] = [
  // ─── eng.grammar.active-and-passive-voice ────────────────────────────────
  card('eng.grammar.active-and-passive-voice', 'short_answer', M,
    'A student turns "The dog chased the ball" into "The ball chased the dog" to make it passive, and says passive voice is always bad writing. What is accurate?',
    'The passive is "The ball was chased by the dog", and it has real uses',
    ['"The ball chased the dog" is the passive, since you just swap subject and object', 'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE'],
    ['Passive voice is always bad writing, so it should be avoided in every sentence', 'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING'],
    'passive = be + past participle, not a swap; passive has uses, re-asked with a dog and a ball'),
  card('eng.grammar.active-and-passive-voice', 'fill_blank', M,
    'Complete the sentence: to form the passive, ____.',
    'make the object the subject and use be + past participle',
    ['swap the positions of the subject and the object', 'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE'],
    ['avoid it, since passive voice is always bad writing in any context', 'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.active-and-passive-voice', 'checkpoint', A,
    'A lab manager turns "The team calibrated the instrument" into "The instrument the team calibrated", calling that the passive, and bans the passive from all reports. Which assessment is accurate?',
    'The passive is "The instrument was calibrated (by the team)", and it suits reports where the doer is unimportant',
    ['He is right: the passive is just swapping subject and object', 'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE'],
    ['He is right: the passive is always bad writing', 'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING'],
    'both misconceptions, with a lab report'),

  // ─── eng.grammar.adjectives (two cards: one 3-option card already exists) ─
  card('eng.grammar.adjectives', 'short_answer', M,
    'A student says "wonderful" in "The soup smelled wonderful" is not an adjective because it comes after the verb, and that "a wooden round old table" is as natural as "an old round wooden table". What is accurate?',
    'An adjective can follow a linking verb, and adjectives follow a set order',
    ['"Wonderful" is not an adjective, since adjectives must come before the noun', 'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN'],
    ['Both orders are equally natural, since adjective order does not matter', 'MC-ADJECTIVE-ORDER-DOESNT-MATTER'],
    'adjectives after linking verbs; conventional order, re-asked with soup and a table'),
  card('eng.grammar.adjectives', 'checkpoint', A,
    'A product page reads "The jacket is waterproof" and "a leather brown big bag". An editor says "waterproof" is not an adjective because it follows the verb, and that the order of adjectives in the bag description is irrelevant. Which assessment is accurate?',
    '"Waterproof" is an adjective after a linking verb, and "a big brown leather bag" follows the usual order',
    ['She is right: an adjective must come before the noun', 'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN'],
    ['She is right: the order of adjectives never matters', 'MC-ADJECTIVE-ORDER-DOESNT-MATTER'],
    'both misconceptions, with a product page'),

  // ─── eng.grammar.adverbs ─────────────────────────────────────────────────
  card('eng.grammar.adverbs', 'short_answer', M,
    'A student says "friendly" in "a friendly dog" is an adverb because it ends in -ly, and that adverbs only modify verbs, so "quite" in "She runs quite slowly" must modify "runs". What is accurate?',
    '"Friendly" is an adjective, and "quite" modifies the adverb "slowly"',
    ['Every word that ends in -ly is an adverb, so "friendly" is one as well', 'MC-ALL-ADVERBS-END-IN-LY'],
    ['Adverbs only modify verbs, so "quite" modifies "runs"', 'MC-ADVERBS-ONLY-MODIFY-VERBS'],
    'adverbs are defined by what they modify, re-asked with friendly and quite slowly'),
  card('eng.grammar.adverbs', 'fill_blank', M,
    'Complete the sentence: to spot an adverb, ____.',
    'check what the word modifies: a verb, an adjective or another adverb',
    ['look for the -ly ending, since every adverb has one', 'MC-ALL-ADVERBS-END-IN-LY'],
    ['look for a word that modifies a verb, since adverbs modify nothing else', 'MC-ADVERBS-ONLY-MODIFY-VERBS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.adverbs', 'checkpoint', A,
    'In "The report was remarkably clear" a reviewer flags "remarkably" as wrong because adverbs only modify verbs, and in "The deadly virus spread" he labels "deadly" an adverb. Which assessment is accurate?',
    '"Remarkably" modifies the adjective "clear", and "deadly" is an adjective describing "virus"',
    ['He is right: adverbs only modify verbs', 'MC-ADVERBS-ONLY-MODIFY-VERBS'],
    ['He is right: "deadly" ends in -ly, so it is an adverb', 'MC-ALL-ADVERBS-END-IN-LY'],
    'both misconceptions, with remarkably and deadly'),

  // ─── eng.grammar.apostrophes ─────────────────────────────────────────────
  card('eng.grammar.apostrophes', 'short_answer', M,
    'A shop sign reads "Fresh banana\'s for sale", and a student says an apostrophe goes before every final s. She also writes "the girls\' bags" for one girl\'s bags, saying the apostrophe always goes in the same place. What is accurate?',
    'A simple plural needs no apostrophe; the owner\'s number decides its place',
    ['"Banana\'s" is correct, since an apostrophe goes before any final s', 'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS'],
    ['"The girls\' bags" is right for one girl, since the apostrophe always goes in the same place', 'MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL'],
    'no apostrophe in plain plurals; placement follows singular/plural owner, re-asked with a shop sign'),
  card('eng.grammar.apostrophes', 'fill_blank', M,
    'Complete the sentence: use an apostrophe for ____.',
    'possession or a contraction, placed by the owner\'s number',
    ['any word ending in s, including plain plurals like apples and cats', 'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS'],
    ['possession, always placed in the same spot', 'MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.apostrophes', 'checkpoint', A,
    'A newsletter prints "Our two supplier\'s raised prices" and "the managers\' office" for a single manager. The editor says apostrophes go before any final s, and in the same place for every possessive. Which assessment is accurate?',
    '"Suppliers" is a plain plural needing no apostrophe, and a single manager\'s office is "the manager\'s office"',
    ['She is right: an apostrophe goes before any final s', 'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS'],
    ['She is right: possessive apostrophes always go in the same place', 'MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL'],
    'both misconceptions, with a newsletter'),

  // ─── eng.grammar.articles-and-determiners (two cards) ────────────────────
  card('eng.grammar.articles-and-determiners', 'short_answer', M,
    'A student writes "an university" because u is a vowel letter, and "I like the music" to mean music in general, saying "the" is always needed. What is accurate?',
    '"A university", from its /j/ sound, and "I like music" needs no article',
    ['"An university" is correct, since a/an depends on the first letter, not the sound', 'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND'],
    ['"The" is always needed before a noun, so "the music" is right for music in general', 'MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED'],
    'a/an follows sound; no article for general uncountables, re-asked with university and music'),
  card('eng.grammar.articles-and-determiners', 'checkpoint', A,
    'A press release says "an unique feature" and "The water is essential for life", meaning water in general. The editor insists a/an follows the written letter and that "the" is always needed. Which assessment is accurate?',
    '"A unique feature", since the sound decides, and "Water is essential for life" needs no article in the general sense',
    ['He is right: a/an depends on the written letter, so "an unique" is correct', 'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND'],
    ['He is right: "the" is always needed before a noun, even in general statements', 'MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED'],
    'both misconceptions, with unique and water'),

  // ─── eng.grammar.capitalization-rules (EARLY native band) ────────────────
  card('eng.grammar.capitalization-rules', 'short_answer', E,
    'Mia writes about her pets. Which is written correctly?',
    'I like cats. My dog is brown.',
    ['I like Cats. My dog is Brown.', 'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD'],
    ['I like cats. my dog is brown.', 'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT'],
    'capitals for names and sentence starts only, re-asked with pets'),
  card('eng.grammar.capitalization-rules', 'fill_blank', E,
    'Complete the sentence: a capital letter goes ____.',
    'at the start of every sentence and on names',
    ['on any word that sounds important', 'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD'],
    ['only on the very first word of the whole text', 'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.capitalization-rules', 'checkpoint', A,
    'A newsletter reads "Our Team met on Monday. the Budget was approved." The editor says important words such as Team and Budget take capitals, and that only the first word of a text is capitalised. Which assessment is accurate?',
    '"Our team met on Monday. The budget was approved." — Monday and each sentence start take capitals',
    ['She is right: Team and Budget take capitals because they are important', 'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD'],
    ['She is right: only the first word of a text is capitalised', 'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT'],
    'both misconceptions, with a newsletter'),

  // ─── eng.grammar.clauses ─────────────────────────────────────────────────
  card('eng.grammar.clauses', 'short_answer', M,
    'A student says "although he tried" is not a clause because "although" makes it incomplete, and that a sentence containing an independent clause must be a simple sentence. What is accurate?',
    '"Although he tried" is a dependent clause, and one sentence can have several independent ones',
    ['"Although he tried" is not a clause, since a subordinating word stops it from being one at all', 'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE'],
    ['A sentence with an independent clause must be a simple sentence', 'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY'],
    'dependent clauses are clauses; independent clauses can combine, re-asked with "although he tried"'),
  card('eng.grammar.clauses', 'fill_blank', M,
    'Complete the sentence: a clause is ____.',
    'a group of words with a subject and a verb',
    ['a group of words that cannot begin with a subordinating word', 'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE'],
    ['a simple sentence, which no larger sentence can contain', 'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.clauses', 'checkpoint', A,
    'In "When the audit ended, the team celebrated, and the client signed", a trainer says "When the audit ended" is not a clause, and that the sentence has only one independent clause because independent clauses make simple sentences. Which assessment is accurate?',
    '"When the audit ended" is a dependent clause, and the sentence has two independent clauses',
    ['She is right: a clause starting with "when" is not a clause', 'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE'],
    ['She is right: any independent clause makes the sentence a simple sentence', 'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY'],
    'both misconceptions, with an audit sentence'),

  // ─── eng.grammar.colons-semicolons-dashes ────────────────────────────────
  card('eng.grammar.colons-semicolons-dashes', 'short_answer', H,
    'A student writes "You will need: a pen, paper and a ruler" and "The shop closed early, it was a holiday". She says a colon can follow any introductory phrase and that a semicolon is just another comma. What is accurate?',
    'Drop the colon, as it needs a full sentence before it; the clauses need a semicolon',
    ['The colon is fine after any introductory phrase, complete or not, since colons introduce lists', 'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE'],
    ['A comma works there, since semicolons and commas do the same job', 'MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY'],
    'colon needs a full sentence before it; semicolon vs comma, re-asked with a shop and a pen list'),
  card('eng.grammar.colons-semicolons-dashes', 'fill_blank', H,
    'Complete the sentence: a semicolon ____.',
    'joins two closely related independent clauses',
    ['does the same job as a comma, so either can be used', 'MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY'],
    ['may follow any introductory phrase, as a colon can', 'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.colons-semicolons-dashes', 'checkpoint', A,
    'A manual says "The kit includes: a drill, bits and a case" and "The test failed, the team reran it", defending both because colons follow any introduction and commas equal semicolons. Which assessment is accurate?',
    'The colon needs a complete sentence before it, and two independent clauses need a semicolon or conjunction, not a comma alone',
    ['The manual is right: a colon can follow any introduction', 'MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFORE-ISNT-A-COMPLETE-SENTENCE'],
    ['The manual is right: a comma and a semicolon are interchangeable', 'MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY'],
    'both misconceptions, with a technical manual'),

  // ─── eng.grammar.comma-usage ─────────────────────────────────────────────
  card('eng.grammar.comma-usage', 'short_answer', M,
    'A student writes "She opened the door, and walked in" because there is a pause, and says any "and" joining two parts needs a comma. What is accurate?',
    'No comma is needed: one subject has two verbs',
    ['A comma is needed, since any two parts joined by "and" take a comma', 'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA'],
    ['A comma goes wherever you pause when reading aloud, so it is needed', 'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING'],
    'commas do specific jobs, not mark pauses, re-asked with opening a door'),
  card('eng.grammar.comma-usage', 'fill_blank', M,
    'Complete the sentence: a comma is used ____.',
    'for a specific job, such as listing items',
    ['wherever you would naturally pause when speaking aloud', 'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING'],
    ['before every "and", whatever it joins', 'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.comma-usage', 'checkpoint', A,
    'A manager writes "The team reviewed the proposal, and approved it", explaining that commas mark pauses in speech and that "and" always takes a comma. Which assessment is accurate?',
    'The comma is wrong: "and" joins two verbs with one subject, and commas do specific jobs, not mark pauses',
    ['She is right: "and" always takes a comma', 'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA'],
    ['She is right: a comma goes wherever you pause', 'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING'],
    'both misconceptions, with a proposal review'),
]
