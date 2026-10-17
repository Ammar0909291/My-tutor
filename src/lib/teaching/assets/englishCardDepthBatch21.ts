/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 21 (eng.grammar part 3, 24 cards).
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
 * slug and abandon the live row's identity. Each grammar concept already uses native band : mcq, misconception_probe, true_false, checkpoint and ADULT : mcq, misconception_probe, so the new cards take the FREE slots native band : short_answer, fill_blank and ADULT : checkpoint. Concepts that already hold one 3-option card (nouns, past-tenses, prepositions) receive two (short_answer + checkpoint). The native band is HIGH for parallel-structure and MIDDLE for the rest.
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


export const ENGLISH_CARD_DEPTH_BATCH_21: SeedProbe[] = [
  // ─── eng.grammar.interjections ───────────────────────────────────────────
  card('eng.grammar.interjections', 'short_answer', M,
    'A student says "Oops" in "Oops, I dropped my pen" is not an interjection because it has no exclamation point, and that interjections are just filler with no grammatical status. What is accurate?',
    '"Oops" is an interjection even with a comma, and interjections are a real word class',
    ['It is not an interjection, since interjections must carry an exclamation point', 'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS'],
    ['Interjections are only filler, so "oops" has no grammatical status at all in the sentence', 'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS'],
    'interjections mark reaction with comma or exclamation, are a real class, re-asked with "oops"'),
  card('eng.grammar.interjections', 'fill_blank', M,
    'Complete the sentence: an interjection ____.',
    'stands apart to express a reaction, with a comma or exclamation point',
    ['must always be followed by an exclamation point to count as one at all', 'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS'],
    ['is only filler with no real grammatical status in a sentence', 'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.interjections', 'checkpoint', A,
    'A transcription guide says "Hmm, that may work" contains no interjection because there is no exclamation point, and tells staff to delete "hmm" as meaningless filler. Which assessment is accurate?',
    '"Hmm" is an interjection, a real word class conveying hesitation, and a comma is enough to mark it',
    ['The guide is right: no exclamation point means no interjection', 'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS'],
    ['The guide is right: interjections are meaningless filler', 'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS'],
    'both misconceptions, with a transcription guide'),

  // ─── eng.grammar.modals ──────────────────────────────────────────────────
  card('eng.grammar.modals', 'short_answer', M,
    'A student says "could" in "Could you pass the salt?" and in "It could rain later" means the same thing, and that "must", "should" and "might" express the same strength. What is accurate?',
    '"Could" is a request in the first and a possibility in the second; the three modals differ',
    ['Each modal has just one meaning, so "could" means the same in both sentences', 'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING'],
    ['"Must", "should" and "might" express the same strength of obligation or certainty in a sentence', 'MC-MODAL-STRENGTH-IS-ALL-THE-SAME'],
    'modals have several meanings and differ in strength, re-asked with could'),
  card('eng.grammar.modals', 'fill_blank', M,
    'Complete the sentence: to read a modal verb, ____.',
    'use context to pick its meaning and check its strength',
    ['assume each modal has one fixed meaning', 'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING'],
    ['treat must, should and might as equally strong', 'MC-MODAL-STRENGTH-IS-ALL-THE-SAME'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.modals', 'checkpoint', A,
    'A policy says "Staff may leave early" means they are able to leave, and that "should", "must" and "might" in other lines carry the same force. Which assessment is accurate?',
    '"May" here grants permission, and must, should and might differ: required, advised, possible',
    ['The policy is right: each modal has only one meaning, such as ability', 'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING'],
    ['The policy is right: all these modals carry the same force', 'MC-MODAL-STRENGTH-IS-ALL-THE-SAME'],
    'both misconceptions, with a staff policy'),

  // ─── eng.grammar.negation ────────────────────────────────────────────────
  card('eng.grammar.negation', 'short_answer', M,
    'A student negates "They walk to school" as "They walk not to school", and writes "He can\'t never win" for extra emphasis. What is accurate?',
    'Use do + not + base verb, and only one negative: "He can\'t ever win"',
    ['"They walk not to school" is correct, since "not" can be added anywhere in a sentence', 'MC-JUST-ADD-NOT-ANYWHERE'],
    ['"He can\'t never win" is fine, since a double negative is just extra emphasis', 'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS'],
    'not follows an auxiliary; one negative per clause, re-asked with walking and winning'),
  card('eng.grammar.negation', 'fill_blank', M,
    'Complete the sentence: in standard English, a negative sentence ____.',
    'puts "not" after an auxiliary and uses one negative per clause',
    ['may take "not" anywhere in the clause', 'MC-JUST-ADD-NOT-ANYWHERE'],
    ['can pile up several negatives for extra emphasis in the same clause', 'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.negation', 'checkpoint', A,
    'A form reads "Applicants not should submit late documents" and "Nobody never replied", and the author calls both acceptable because "not" can go anywhere and double negatives add emphasis. Which assessment is accurate?',
    '"Should not submit" puts "not" after the modal, and "Nobody ever replied" needs just one negative',
    ['The author is right: "not" can be placed anywhere in a clause', 'MC-JUST-ADD-NOT-ANYWHERE'],
    ['The author is right: a double negative is only extra emphasis', 'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS'],
    'both misconceptions, with a form'),

  // ─── eng.grammar.nouns (two cards: one 3-option card already exists) ─────
  card('eng.grammar.nouns', 'short_answer', M,
    'A student says "freedom" is not a noun because you cannot touch it, and writes "three informations" because countability is arbitrary. What is accurate?',
    '"Freedom" is a noun naming an idea, and "information" is uncountable',
    ['"Freedom" is not a noun, since nouns name only physical things', 'MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS'],
    ['"Three informations" is fine, since whether a noun is countable is arbitrary', 'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY'],
    'nouns name ideas; countability follows the noun, re-asked with freedom and information'),
  card('eng.grammar.nouns', 'checkpoint', A,
    'A glossary says "courage" is not a noun because it is not physical, and allows "two baggages" since countability is arbitrary. Which assessment is accurate?',
    '"Courage" names a quality and is a noun, and "baggage" is uncountable: "two pieces of baggage"',
    ['The glossary is right: nouns name only physical things', 'MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS'],
    ['The glossary is right: whether a noun is countable is arbitrary', 'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY'],
    'both misconceptions, with courage and baggage'),

  // ─── eng.grammar.parallel-structure ──────────────────────────────────────
  card('eng.grammar.parallel-structure', 'short_answer', H,
    'A student says parallel structure only matters for lists of single words, and "fixes" "The mayor promised to cut taxes, building roads, and that schools would reopen" by changing a few words to sound alike. What is accurate?',
    'Parallelism covers phrases and clauses too, and a fix must match grammatical form',
    ['It applies only to simple lists of single words, so this sentence is not a parallelism error', 'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS'],
    ['A fix only needs the items to sound similar, so changing a few words is enough', 'MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR'],
    'parallelism covers phrases and clauses; fix by form, re-asked with a mayor'),
  card('eng.grammar.parallel-structure', 'fill_blank', H,
    'Complete the sentence: parallel structure ____.',
    'gives matching items the same grammatical form',
    ['applies only to simple lists of single words', 'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS'],
    ['is met once items merely sound alike', 'MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.parallel-structure', 'checkpoint', A,
    'A reviewer says "The plan will reduce costs, improving morale, and that turnover falls" is fine because parallelism covers only single-word lists, and fixes it by rewording until the items sound alike. Which assessment is accurate?',
    'The items mix forms; make all three verb phrases of the same shape',
    ['She is right: parallelism covers only single-word lists and nothing larger', 'MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS'],
    ['She is right: making the items sound similar is enough', 'MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMILAR'],
    'both misconceptions, with a plan summary'),

  // ─── eng.grammar.participles-and-participial-phrases ─────────────────────
  card('eng.grammar.participles-and-participial-phrases', 'short_answer', M,
    'A student says "running" in "the running water" is a gerund, and that "Running late, the bus left without me" is fine because the meaning is clear. What is accurate?',
    '"Running" modifies "water", so it is a participle; in the second sentence the phrase dangles',
    ['"Running" is a gerund, since a present participle is just a gerund again', 'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN'],
    ['The sentence is fine, since a dangling participle is acceptable if the meaning is clear to the reader', 'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR'],
    'participle modifies a noun; dangling phrases need a fit subject, re-asked with running water and a bus'),
  card('eng.grammar.participles-and-participial-phrases', 'fill_blank', M,
    'Complete the sentence: a present participle ____.',
    'describes a noun, and its phrase must fit the subject that follows',
    ['is the same as a gerund, which names an action as a noun in a sentence', 'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN'],
    ['may dangle whenever the meaning seems obvious', 'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.participles-and-participial-phrases', 'checkpoint', A,
    'A memo reads "Opening the folder, the error was visible", and a reviewer defends it as clear and calls "opening" a gerund. Which assessment is accurate?',
    '"Opening" is a participle, and the phrase dangles; rewrite with a person as subject',
    ['The reviewer is right: "opening" is a gerund', 'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN'],
    ['The reviewer is right: a dangling participle is fine if the meaning is clear to the reader', 'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR'],
    'both misconceptions, with a memo'),

  // ─── eng.grammar.past-tenses (two cards: one 3-option card already exists) ─
  card('eng.grammar.past-tenses', 'short_answer', M,
    'A student writes "buyed" for the past of "buy" and says "I walked home when it started to rain" means the same as "I was walking home when it started to rain". What is accurate?',
    '"Bought" is the irregular past, and "was walking" shows an action in progress',
    ['"Buyed" is right, since every past tense adds -ed', 'MC-ALL-PAST-TENSE-VERBS-ADD-ED'],
    ['The two sentences mean the same, since past continuous and simple past are interchangeable', 'MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE'],
    'irregular pasts; progress vs completed action, re-asked with buy and a walk home'),
  card('eng.grammar.past-tenses', 'checkpoint', A,
    'A report says "The team teached the class" and "While the manager reviewed the file, the phone rang" in place of "was reviewing", explaining that all past verbs add -ed and the two past tenses are interchangeable. Which assessment is accurate?',
    '"Taught" is irregular, and "was reviewing" shows the review in progress when the phone interrupted',
    ['She is right: all past-tense verbs add -ed', 'MC-ALL-PAST-TENSE-VERBS-ADD-ED'],
    ['She is right: the past continuous and simple past are interchangeable', 'MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE'],
    'both misconceptions, with a report'),

  // ─── eng.grammar.phrases ─────────────────────────────────────────────────
  card('eng.grammar.phrases', 'short_answer', M,
    'A student calls "the bridge on old" a phrase because it is a group of words, and says "since the bridge collapsed" is also just a phrase. What is accurate?',
    'A phrase is a group built around a head word; "since the bridge collapsed" is a clause',
    ['"The bridge on old" is a phrase, since any group of words counts as one', 'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS'],
    ['"Since the bridge collapsed" is a phrase, since phrases and clauses are the same thing', 'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING'],
    'phrase = unified group around a head; clause has subject + verb, re-asked with a bridge'),
  card('eng.grammar.phrases', 'fill_blank', M,
    'Complete the sentence: a phrase is ____.',
    'a unified group built around a head word',
    ['any group of words sitting together', 'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS'],
    ['the same thing as a clause', 'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING'],
    'Replacement texts for both misconceptions'),
  card('eng.grammar.phrases', 'checkpoint', A,
    'A manual says "the signed contract" and "the contract on signed" are both phrases because both are word groups, and treats "after the contract was signed" as a phrase too. Which assessment is accurate?',
    '"The signed contract" is a phrase, while "after the contract was signed" is a clause',
    ['The manual is right: any group of words is a phrase', 'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS'],
    ['The manual is right: phrases and clauses are the same thing, with no real difference', 'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING'],
    'both misconceptions, with a contract'),

  // ─── eng.grammar.prepositions (two cards: one 3-option card already exists) ─
  card('eng.grammar.prepositions', 'short_answer', M,
    'A student says prepositions only show location, so "in" in "in the evening" is wrong, and writes "afraid from spiders" because the preposition should be predictable from its meaning. What is accurate?',
    '"In the evening" shows time, and the pairing is learned as "afraid of spiders"',
    ['Prepositions only show location, so "in the evening" cannot be right', 'MC-PREPOSITIONS-ONLY-SHOW-LOCATION'],
    ['"Afraid from" is logical, since the preposition can be predicted from its meaning', 'MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING'],
    'prepositions show time and other relations; pairings are learned, re-asked with the evening and spiders'),
  card('eng.grammar.prepositions', 'checkpoint', A,
    'A guide rejects "She spoke during the break" because "during" can only show location, and teaches "depend from" as more logical than "depend on". Which assessment is accurate?',
    '"During the break" shows time, and "depend on" is a conventional pairing to learn, not predict',
    ['The guide is right: prepositions only show location', 'MC-PREPOSITIONS-ONLY-SHOW-LOCATION'],
    ['The guide is right: the preposition after a verb is predictable from meaning', 'MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING'],
    'both misconceptions, with during and depend on'),
]
