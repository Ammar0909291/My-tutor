/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 23 (eng.grammar part 5, 24 cards).
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
 * slug and abandon the live row's identity. Each grammar concept already uses native band : mcq, misconception_probe, true_false/checkpoint and ADULT : mcq, misconception_probe, so the new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint. The native band is MIDDLE for every concept in this batch.
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


export const ENGLISH_CARD_DEPTH_BATCH_23: SeedProbe[] = [
  // ─── eng.grammar.sentence-types-by-function ──────────────────────────────
  card('eng.grammar.sentence-types-by-function', 'short_answer', M,
    'A student says "Is the shop open today?" is not a question because it does not start with a question word, and that "Pass me the salt!" is an exclamation because of its mark. What is accurate?',
    '"Is the shop open today?" is a question by inversion; "Pass me the salt!" is a command',
    ['It is not a question, since questions always start with a question word', 'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD'],
    ['"Pass me the salt!" is an exclamation, because the mark alone defines the sentence type', 'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE'],
    'type follows structure and purpose, not mark or first word, re-asked with a shop and the salt'),
  card('eng.grammar.sentence-types-by-function', 'fill_blank', M,
    'Complete the sentence: a sentence\'s type is decided by ____.',
    'its structure and purpose',
    ['the punctuation mark at the end of it', 'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE'],
    ['whether it starts with a question word', 'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.sentence-types-by-function', 'checkpoint', A,
    'A style guide says "Could you review this by noon?" is not a question since it does not begin with a wh-word, and that "Submit the form!" is exclamatory because of its mark. Which assessment is accurate?',
    '"Could you review this by noon?" is a question by inversion, and "Submit the form!" is a command whatever its mark',
    ['The guide is right: questions always start with a question word', 'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD'],
    ['The guide is right: the end mark defines the sentence type', 'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE'],
    'both misconceptions, with a style guide'),

  // ─── eng.grammar.simple-sentences ────────────────────────────────────────
  card('eng.grammar.simple-sentences', 'short_answer', M,
    'A student says "I sang, and he danced" is simple because it is short, and that "Sam and Lee cooked and cleaned" cannot be simple because it contains "and". What is accurate?',
    'The first has two independent clauses, so it is compound; the second is simple',
    ['Short sentences are simple, so the first one is simple', 'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE'],
    ['A sentence with "and" is never simple, so the second one cannot be a simple sentence', 'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE'],
    'simple = one independent clause; length and "and" do not decide, re-asked with singing and cooking'),
  card('eng.grammar.simple-sentences', 'fill_blank', M,
    'Complete the sentence: a simple sentence has ____.',
    'exactly one independent clause, of any length',
    ['few words, which is what makes a sentence simple', 'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE'],
    ['no "and" anywhere in it', 'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.simple-sentences', 'checkpoint', A,
    'A manual calls "Only the newly promoted regional managers attended the annual strategy workshop" non-simple because it is long, and "The analysts collected and checked the data" non-simple because it has "and". Which assessment is accurate?',
    'Both are simple: each has one independent clause, whatever the length or the "and"',
    ['The manual is right: long sentences are not simple', 'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE'],
    ['The manual is right: a sentence with "and" is never simple', 'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE'],
    'both misconceptions, with a long sentence and a compound-predicate sentence'),

  // ─── eng.grammar.subject-and-predicate ───────────────────────────────────
  card('eng.grammar.subject-and-predicate', 'short_answer', M,
    'In "Down the hill rolled the cart", a student says the subject is "Down" because it is first, and in "The cart rolled quickly" that the predicate is just "rolled". What is accurate?',
    'The subject is "the cart", and the predicate is "rolled quickly", more than the verb',
    ['The subject is "Down", since the subject is always the very first word of the sentence', 'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD'],
    ['The predicate is just the verb "rolled", with nothing else in it', 'MC-PREDICATE-IS-JUST-THE-VERB'],
    'ask who or what; the predicate is more than the verb, re-asked with a rolling cart'),
  card('eng.grammar.subject-and-predicate', 'fill_blank', M,
    'Complete the sentence: to find the subject, ____.',
    'ask who or what the sentence is about; the predicate is everything else',
    ['take the first word, since the subject always comes first', 'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD'],
    ['find the verb, since the predicate is just that one word', 'MC-PREDICATE-IS-JUST-THE-VERB'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.subject-and-predicate', 'checkpoint', A,
    'In "Across the floor slid the cabinet", an analyst names "Across" as the subject, and in "The cabinet slid easily" calls the predicate just "slid". Which assessment is accurate?',
    'The subject is "the cabinet", and the predicate is "slid easily"',
    ['He is right: the subject is the first word', 'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD'],
    ['He is right: the predicate is only the verb, nothing else in the sentence', 'MC-PREDICATE-IS-JUST-THE-VERB'],
    'both misconceptions, with a sliding cabinet'),

  // ─── eng.grammar.subject-verb-agreement ──────────────────────────────────
  card('eng.grammar.subject-verb-agreement', 'short_answer', M,
    'A student writes "The key to the lockers are lost" and "The jury are deciding", saying a verb agrees with the nearest noun and collective nouns always take plural verbs. What is accurate?',
    '"The key ... is lost" agrees with "key"; "The jury is deciding" treats it as a unit',
    ['"The key to the lockers are lost" is correct, since the verb agrees with the nearest noun', 'MC-AGREE-WITH-THE-NEAREST-NOUN'],
    ['"The jury are deciding" is correct, since collective nouns always take plural verbs', 'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS'],
    'agree with the true subject; collective nouns as one unit, re-asked with lockers and a jury'),
  card('eng.grammar.subject-verb-agreement', 'fill_blank', M,
    'Complete the sentence: to choose a verb form, ____.',
    'find the true subject; a collective noun as one unit is singular',
    ['match the noun nearest to the verb', 'MC-AGREE-WITH-THE-NEAREST-NOUN'],
    ['give every collective noun a plural verb, since groups are always many', 'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.subject-verb-agreement', 'checkpoint', A,
    'A report says "The cost of the repairs are high" because "repairs" is nearest, and "The board are voting" because collective nouns are always plural. Which assessment is accurate?',
    '"The cost of the repairs is high" (subject "cost"), and "The board is voting" treats the board as one unit',
    ['It is right: the verb agrees with the nearest noun', 'MC-AGREE-WITH-THE-NEAREST-NOUN'],
    ['It is right: collective nouns always take plural verbs', 'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS'],
    'both misconceptions, with repairs and a board'),

  // ─── eng.grammar.tense-consistency ───────────────────────────────────────
  card('eng.grammar.tense-consistency', 'short_answer', M,
    'A student says "By the time we arrived, the show had already started" has a tense error because the verbs do not match exactly, and that a story containing "The detective enters the room and looks around" is wrong because narrative cannot be in the present. What is accurate?',
    'The shift to the past perfect is motivated by an earlier time, and a story can be told consistently in the present',
    ['It is an error, since every verb in a passage must match exactly', 'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY'],
    ['The present-tense story is wrong, since narrative tense cannot be present', 'MC-NARRATIVE-TENSE-CANT-BE-PRESENT'],
    'motivated shifts are fine; present narration is valid, re-asked with a show and a detective'),
  card('eng.grammar.tense-consistency', 'fill_blank', M,
    'Complete the sentence: tense consistency means ____.',
    'shifting only when the time changes, in past or present',
    ['making every verb in a passage match exactly, whatever the time', 'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY'],
    ['telling every narrative in the past tense', 'MC-NARRATIVE-TENSE-CANT-BE-PRESENT'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.tense-consistency', 'checkpoint', A,
    'A guide flags "The firm had hired staff before it moved" as inconsistent because the verbs differ, and changes a present-tense case study ("The manager opens the file and reads it") to the past because narratives cannot use the present. Which assessment is accurate?',
    'The past perfect marks an earlier event; present narration can be consistent',
    ['The guide is right: all verbs must match exactly', 'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY'],
    ['The guide is right: narrative cannot use the present tense in any report or story', 'MC-NARRATIVE-TENSE-CANT-BE-PRESENT'],
    'both misconceptions, with a hiring case study'),

  // ─── eng.grammar.verbs ───────────────────────────────────────────────────
  card('eng.grammar.verbs', 'short_answer', M,
    'In "She will have finished by noon", a student says the only verb is "finished", and in "He loves jazz" that "loves" is not a verb because nothing physical happens. What is accurate?',
    'The verb phrase is "will have finished", and "loves" is a verb of state',
    ['Only "finished" is a verb, since helping verbs are not real verbs at all', 'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS'],
    ['"Loves" is not a verb, since verbs are only physical actions', 'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS'],
    'verb phrases include helpers; verbs can name states, re-asked with finishing and jazz'),
  card('eng.grammar.verbs', 'fill_blank', M,
    'Complete the sentence: a verb phrase ____.',
    'includes any helping verbs, and verbs can name states and mental processes',
    ['is only the main verb, because helping verbs do not count', 'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS'],
    ['names only visible physical actions', 'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.verbs', 'checkpoint', A,
    'A guide says "Employees must have signed the form" has the single verb "signed", and that "The manager wants a quiet room" has no verb because nothing physical happens. Which assessment is accurate?',
    'The verb phrase is "must have signed", and "wants" is a verb expressing a state of desire',
    ['The guide is right: helping verbs are not real verbs', 'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS'],
    ['The guide is right: verbs are only physical actions', 'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS'],
    'both misconceptions, with signing and wanting'),

  // ─── eng.grammar.word-classes-overview ───────────────────────────────────
  card('eng.grammar.word-classes-overview', 'short_answer', M,
    'A student says "water" is always a noun, so "Please water the plants" has no verb there, and that "shout" in "The shout startled her" is a verb because it names an action. What is accurate?',
    'In "water the plants" the word works as a verb, and "shout" works as a noun',
    ['"Water" is always a noun, whatever the sentence', 'MC-WORD-CLASS-IS-FIXED-PER-WORD'],
    ['"Shout" is a verb there because it describes an action, so meaning alone decides the class', 'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE'],
    'class depends on job, not fixed or meaning alone, re-asked with water and shout'),
  card('eng.grammar.word-classes-overview', 'fill_blank', M,
    'Complete the sentence: to name a word\'s class, ____.',
    'check its job in this sentence',
    ['use the class it always has, since each word has one', 'MC-WORD-CLASS-IS-FIXED-PER-WORD'],
    ['go by whether its meaning describes an action or a thing', 'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.word-classes-overview', 'checkpoint', A,
    'A glossary lists "email" only as a noun, and treats "cancellation" in "The cancellation delayed us" as a verb because it describes an action. Which assessment is accurate?',
    '"Email" also works as a verb, and "cancellation" is a noun here',
    ['The glossary is right: each word has one fixed class', 'MC-WORD-CLASS-IS-FIXED-PER-WORD'],
    ['The glossary is right: a word that describes an action is a verb', 'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE'],
    'both misconceptions, with email and cancellation'),

  // ─── eng.grammar.word-order ──────────────────────────────────────────────
  card('eng.grammar.word-order', 'short_answer', M,
    'A learner says "The dog bit the man" and "The man bit the dog" mean the same because English word order is flexible, and writes "She speaks fluently English" and "a car red". What is accurate?',
    'Swapping subject and object changes who does what; "a red car" and "speaks English fluently" show set places',
    ['Both sentences mean the same, since English word order is flexible like other languages', 'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES'],
    ['"She speaks fluently English" and "a car red" are fine, since adjectives and adverbs can go anywhere in a sentence', 'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE'],
    'English word order carries meaning; modifiers have set places, re-asked with a dog and a man'),
  card('eng.grammar.word-order', 'fill_blank', M,
    'Complete the sentence: in English, ____.',
    'word order carries meaning, subject before verb',
    ['word order is flexible, so any order keeps the meaning', 'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES'],
    ['adjectives and adverbs can go anywhere in the sentence', 'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.word-order', 'checkpoint', A,
    'A manual says "Reviewed the manager the report" and "The manager reviewed the report" are interchangeable, and approves "He completed quickly the task". Which assessment is accurate?',
    'The first breaks English subject-verb-object order, and the adverb belongs after the object: "completed the task quickly"',
    ['The manual is right: English word order is flexible', 'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES'],
    ['The manual is right: adverbs can go anywhere', 'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE'],
    'both misconceptions, with a manager and a report'),
]
