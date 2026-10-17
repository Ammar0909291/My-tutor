/**
 * ENGLISH CARD-DEPTH CAMPAIGN — Batch 13 (eng.vocab part 2, 12 concepts, 35 cards).
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
 * so the new cards take the FREE slots
 *   native band : short_answer, fill_blank      ADULT : checkpoint
 * (native band is HIGH for multiple-meaning-words, register-and-formality,
 * roots-and-origins and semantic-fields, MIDDLE for the rest). eng.vocab.prefixes
 * already holds one 3-option card, so it receives only two (short_answer + checkpoint).
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


export const ENGLISH_CARD_DEPTH_BATCH_13: SeedProbe[] = [
  // ─── eng.vocab.multiple-meaning-words ────────────────────────────────────
  card('eng.vocab.multiple-meaning-words', 'short_answer', H,
    '"Foot" means a body part and also the base of a hill, and a dictionary lists "unit of length" first. A student says all multiple meanings are unrelated homonyms, and picks the first-listed sense for "the foot of the hill". What is the best advice?',
    'The senses of "foot" are related, and context, not listing order, selects "base of the hill"',
    ['They are unrelated homonyms like "bat", so no connection exists between the senses of "foot"', 'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS'],
    ['Pick the first-listed sense, since a dictionary lists meanings in order of importance', 'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER'],
    'polysemy vs. homonymy; context over listing order, re-asked with "foot"'),
  card('eng.vocab.multiple-meaning-words', 'fill_blank', H,
    'Complete the sentence: to choose between a word\'s senses, ____.',
    'use the context, and notice whether the meanings are related',
    ['take the first one the dictionary lists, since it is the most important', 'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER'],
    ['assume the senses are unrelated homonyms and guess between them', 'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.multiple-meaning-words', 'checkpoint', A,
    'A reader takes the first-listed dictionary sense of "run" for "run a department". A colleague says all the senses of "run" are just unrelated homonyms. Which assessment is accurate?',
    'Use context ("manage" fits here); the senses of "run" are mostly related extensions',
    ['The first-listed sense is right, since dictionaries list meanings by importance', 'MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER'],
    ['The colleague is right: multiple meanings are just homonyms with no link between them', 'MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS'],
    'both misconceptions, with "run"'),

  // ─── eng.vocab.phrasal-verbs ─────────────────────────────────────────────
  card('eng.vocab.phrasal-verbs', 'short_answer', M,
    '"She turned down the offer" means she refused it. A learner reads "turned down" literally, and says "turned the offer down", "turned it down" and "turned down it" are all fine. What is accurate?',
    '"Turn down" means refuse, and with "it" the object goes in the middle',
    ['It means to turn something downwards, just as the words literally say', 'MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PARTICLES-LITERAL-MEANINGS'],
    ['All three word orders are fine, since the object can go anywhere in a phrasal verb', 'MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-AFTER-BOTH-REGARDLESS-OF-WHICH-PHRASAL-VERB-IT-IS'],
    'non-literal meaning and separability, re-asked with "turn down"'),
  card('eng.vocab.phrasal-verbs', 'fill_blank', M,
    'Complete the sentence: with phrasal verbs, ____.',
    'the meaning often differs from its parts, and separability is learned verb by verb',
    ['the meaning can usually be worked out from the literal sense of the verb and its particle', 'MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PARTICLES-LITERAL-MEANINGS'],
    ['the object can always go either in the middle or after both words', 'MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-AFTER-BOTH-REGARDLESS-OF-WHICH-PHRASAL-VERB-IT-IS'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.phrasal-verbs', 'checkpoint', A,
    'A learner reads "We cannot put up with delays" literally, and writes "We cannot put delays up with". Which assessment is accurate?',
    '"Put up with" means tolerate and is inseparable: "put up with delays"',
    ['It literally means to place something up with someone', 'MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PARTICLES-LITERAL-MEANINGS'],
    ['The object can go between the words, as "put delays up with" shows', 'MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-AFTER-BOTH-REGARDLESS-OF-WHICH-PHRASAL-VERB-IT-IS'],
    'both misconceptions, with "put up with"'),

  // ─── eng.vocab.prefixes (two cards: one 3-option card already exists) ────
  card('eng.vocab.prefixes', 'short_answer', M,
    'Compare "in-" in "incorrect" and in "income". What is true of prefixes?',
    '"In-" means "not" in incorrect but "into" in income; prefixes carry several meanings',
    ['"In-" has one fixed meaning in every word, so it means "not" in both incorrect and income', 'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING'],
    ['Prefixes only negate, so "income" must mean "not coming"', 'MC-PREFIXES-ONLY-NEGATE-MEANING'],
    'prefixes carry several kinds of meaning, re-asked with incorrect and income'),
  card('eng.vocab.prefixes', 'checkpoint', A,
    'A trainee says "prepay" means "not pay" because prefixes just negate, and that "pre-" means "before" in "present" too. Which assessment is accurate?',
    '"Prepay" means pay before; prefixes also mark time, and "present" does not use "pre-" as a prefix',
    ['"Prepay" means "not pay", since prefixes only negate', 'MC-PREFIXES-ONLY-NEGATE-MEANING'],
    ['"Present" contains "pre-" meaning "before", because a prefix always has one fixed meaning', 'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING'],
    'both misconceptions, with prepay and present'),

  // ─── eng.vocab.register-and-formality ────────────────────────────────────
  card('eng.vocab.register-and-formality', 'short_answer', H,
    'In an interview, one candidate says "Yeah, no worries, I can do that" and another says "Certainly, I would be happy to." A student says the second is always more correct and the first is bad grammar. What is accurate?',
    'Register should fit the situation; neither is a grammar error',
    ['The formal reply is always more correct, whatever the situation', 'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT'],
    ['The informal reply is bad grammar and sloppy writing, so it should be avoided', 'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING'],
    'register fits audience; informal is not an error, re-asked with an interview'),
  card('eng.vocab.register-and-formality', 'fill_blank', H,
    'Complete the sentence: the best register is the one that ____.',
    'fits the audience and situation, formal or informal',
    ['is the most formal, since formality means correctness', 'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT'],
    ['avoids contractions and casual words, which are always sloppy', 'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.register-and-formality', 'checkpoint', A,
    'A team lead posts "Thanks all, great job on the launch!" in the team chat, and a colleague calls it sloppy and says to rewrite it in the most formal style possible. Which assessment is accurate?',
    'A casual register suits a team chat; formality is not the same as correctness',
    ['The colleague is right: the more formal the style, the more correct it is', 'MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT'],
    ['The colleague is right: casual wording and contractions always mean sloppy writing', 'MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING'],
    'both misconceptions, in a workplace chat'),

  // ─── eng.vocab.roots-and-origins ─────────────────────────────────────────
  card('eng.vocab.roots-and-origins', 'short_answer', H,
    'The root "port" means "carry". A student says "important" still literally means "carried in", and that "portion" must contain the root because it looks like it. What is accurate?',
    'Roots give an educated first guess, but meanings shift, and "portion" only looks like it has the root',
    ['"Important" still literally means carried in, since a root keeps its exact meaning in every word', 'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD'],
    ['"Portion" must contain the root "port", since a word that looks like it has a root has it', 'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT'],
    'root meanings shift; look-alikes are not roots, re-asked with "port"'),
  card('eng.vocab.roots-and-origins', 'fill_blank', H,
    'Complete the sentence: a root gives you ____, which you then check against how the word is used.',
    'an educated first guess at the meaning',
    ['the exact meaning, which never changes in any word', 'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD'],
    ['proof of a root connection whenever a word looks similar', 'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.roots-and-origins', 'checkpoint', A,
    'A colleague says "transmit" and "mission" share the root meaning "send", that "mitten" must too because it contains "mit", and that "commit" literally means "send together" today. Which assessment is accurate?',
    'Roots give a first guess; "mitten" is unrelated, and "commit" has shifted from the literal root meaning',
    ['"Mitten" contains the root "mit", since looking like a root is enough', 'MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT'],
    ['"Commit" still literally means "send together", since a root keeps its exact meaning', 'MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD'],
    'both misconceptions, with mitten and commit'),

  // ─── eng.vocab.semantic-fields ───────────────────────────────────────────
  card('eng.vocab.semantic-fields', 'short_answer', H,
    '"Sprint", "stroll", "limp" and "hop" are in the movement field. A student says they must mean the same thing, and that "stadium" belongs to the field because it often appears with "sprint". What is accurate?',
    'A field groups related words with different meanings; co-occurrence alone does not put "stadium" in it',
    ['A semantic field is a list of synonyms, so all four words mean the same', 'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD'],
    ['Words that often appear together always share a semantic field, so "stadium" belongs', 'MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD'],
    'a field is related, not identical, meanings; co-occurrence is not membership'),
  card('eng.vocab.semantic-fields', 'fill_blank', H,
    'Complete the sentence: a semantic field is a set of words ____.',
    'in one conceptual area, though not synonyms',
    ['that are all synonyms of one word', 'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD'],
    ['that often appear together in the same context', 'MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.semantic-fields', 'checkpoint', A,
    'An analyst groups "invoice", "ledger", "audit" and "receipt" as a finance field and says they are synonyms; she adds "coffee" because it appears in finance meetings. Which assessment is accurate?',
    'The first four share a field without being synonyms, and "coffee" only co-occurs with them',
    ['They are all synonyms of "money", which is what a field is', 'MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD'],
    ['"Coffee" belongs in the field because it appears together with those words', 'MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SAME-SEMANTIC-FIELD'],
    'both misconceptions, with finance words'),

  // ─── eng.vocab.suffixes ──────────────────────────────────────────────────
  card('eng.vocab.suffixes', 'short_answer', M,
    '"Beauty" becomes "beautiful" when "-ful" is added. A student says the suffix only changes the shade of meaning, and that the y-to-i change is random. What is accurate?',
    '"-ful" turns the noun into an adjective, and y changes to i by a spelling rule',
    ['The suffix changes only the meaning, never the word class', 'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS'],
    ['The spelling change is random, so each word\'s spelling must be memorised separately', 'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM'],
    'suffixes change word class; spelling changes follow rules, re-asked with beauty/beautiful'),
  card('eng.vocab.suffixes', 'fill_blank', M,
    'Complete the sentence: when you add a suffix, ____.',
    'check the word class and the spelling rule for the base',
    ['expect only a change of meaning shade, never of word class', 'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS'],
    ['expect spelling changes to be random exceptions', 'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.suffixes', 'checkpoint', A,
    'A trainee turns "happy" into "happiness", says "-ness" only alters the shade of meaning, and calls the y-to-i change an arbitrary quirk. Which assessment is accurate?',
    '"-ness" turns an adjective into a noun, and y changes to i by a regular spelling rule',
    ['She is right: suffixes change only shades of meaning, never the word class', 'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS'],
    ['She is right: spelling changes before suffixes are arbitrary', 'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM'],
    'both misconceptions, with happy/happiness'),

  // ─── eng.vocab.synonyms-antonyms ─────────────────────────────────────────
  card('eng.vocab.synonyms-antonyms', 'short_answer', M,
    '"Smart" and "cunning" are synonyms, and a student asks for the opposite of "river". What is accurate?',
    'Synonyms are similar but can differ in feeling; "river" has no true antonym, unlike "hot"',
    ['Synonyms are exactly identical in every way, so "smart" and "cunning" are interchangeable', 'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL'],
    ['Every word has a simple opposite, so "river" must have one waiting to be found', 'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE'],
    'synonyms differ in shade; only gradable words have antonyms, re-asked with smart/cunning and river'),
  card('eng.vocab.synonyms-antonyms', 'fill_blank', M,
    'Complete the sentence: with synonyms and antonyms, ____.',
    'synonyms differ in shade, and only gradable words have opposites',
    ['synonyms are identical, so any one can replace another in any sentence', 'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL'],
    ['every word has a simple opposite waiting to be found', 'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.synonyms-antonyms', 'checkpoint', A,
    'A manager swaps "confident" for "arrogant" in a review, and asks for the opposite of "laptop". Which assessment is accurate?',
    '"Confident" and "arrogant" differ in judgement, and "laptop" has no simple antonym',
    ['They are exactly identical, so either word can be used in the review without any change', 'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL'],
    ['"Laptop" has a simple opposite, like every other word', 'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE'],
    'both misconceptions, in a performance review'),

  // ─── eng.vocab.thesaurus-and-dictionary-skills ───────────────────────────
  card('eng.vocab.thesaurus-and-dictionary-skills', 'short_answer', M,
    'Under "big", a thesaurus lists "enormous" first, then "sizable", "grand" and "huge". A student uses "enormous" for "a big thank you" and "grand" for "a big brother". What is the best advice?',
    'Check each candidate against meaning, tone and phrase; neither the first word nor the group is automatically right',
    ['Always use the first listed word, since it is the best choice', 'MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE'],
    ['Any listed synonym fits any situation, since they are interchangeable', 'MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION'],
    'check fit; thesaurus lists are not ranked or interchangeable, re-asked with "big"'),
  card('eng.vocab.thesaurus-and-dictionary-skills', 'fill_blank', M,
    'Complete the sentence: before using a thesaurus word, ____.',
    'check its meaning and tone in your own sentence',
    ['choose the first one listed, since it is the best choice', 'MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE'],
    ['assume every word listed together is fully interchangeable', 'MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.thesaurus-and-dictionary-skills', 'checkpoint', A,
    'Editing a letter, a writer replaces "ask" with the thesaurus\'s first listing, "interrogate", and says the grouped words can be used anywhere. Which assessment is accurate?',
    'Grouped words differ in tone and meaning; "interrogate" is too strong, so check the fit',
    ['The first-listed word is always the best choice', 'MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE'],
    ['All the listed synonyms are fully interchangeable in every situation', 'MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION'],
    'both misconceptions, with "ask" and "interrogate"'),

  // ─── eng.vocab.word-families ─────────────────────────────────────────────
  card('eng.vocab.word-families', 'short_answer', M,
    '"Care", "careful" and "careless" form a word family. A student adds "cart" and "carpet" because they start with "car", and says all members must be adjectives like "careful". What is accurate?',
    'A family shares a base meaning; "cart" and "carpet" only start alike',
    ['"Cart" and "carpet" belong, since similar spelling at the start means the same family', 'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY'],
    ['All members must be the same word class as "careful"', 'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS'],
    'shared meaning, not spelling; mixed word classes, re-asked with care and car-'),
  card('eng.vocab.word-families', 'fill_blank', M,
    'Complete the sentence: a word family is built on ____.',
    'a shared base meaning across word classes',
    ['similar spelling at the start of the words', 'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY'],
    ['the same word class for every member', 'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.word-families', 'checkpoint', A,
    'A trainee puts "friend", "friendly" and "fiend" in one family because they look alike, and says every member must be a noun like "friend". Which assessment is accurate?',
    '"Fiend" is unrelated; "friendly" (adjective) and "befriend" (verb) belong to the family',
    ['"Fiend" belongs, since similar spelling means the same family', 'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY'],
    ['"Friendly" cannot belong, since every member must be a noun', 'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS'],
    'both misconceptions, with friend, friendly and fiend'),

  // ─── eng.vocab.word-formation-processes ──────────────────────────────────
  card('eng.vocab.word-formation-processes', 'short_answer', M,
    '"Backpack" (two words joined), "photo" (shortened) and "water" used as a verb in "water the plants" are all newer uses. A student says all are formed the same way, and that verb "water" must hide a suffix. What is accurate?',
    'Different processes: compounding, clipping and conversion (a change of job only)',
    ['All are formed the same way, by combining two parts into one new word', 'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY'],
    ['Verb "water" must hide a suffix or some change of form, because verbs need endings', 'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE'],
    'compounding, clipping and conversion, re-asked with backpack, photo and water'),
  card('eng.vocab.word-formation-processes', 'fill_blank', M,
    'Complete the sentence: new words are formed by ____.',
    'several processes, including conversion',
    ['one process, combining parts, in every case', 'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY'],
    ['adding some hidden suffix whenever a noun becomes a verb', 'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.word-formation-processes', 'checkpoint', A,
    'A team notes the verb "to google", the blend "motel" and the compound "laptop". A trainee says all three came about the same way, and that verb "google" must hide a suffix. Which assessment is accurate?',
    'Three processes: conversion, blending and compounding; verb "google" shows no suffix',
    ['All three were formed the same way, by joining parts', 'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY'],
    ['Verb "google" must hide a suffix or change of form', 'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE'],
    'both misconceptions, with google, motel and laptop'),

  // ─── eng.vocab.word-recognition ──────────────────────────────────────────
  card('eng.vocab.word-recognition', 'short_answer', M,
    'A student sounds out "tsunami" correctly but cannot say what it means; another sees "giraffe" in print, says "I don\'t know it", yet knows giraffes when she hears the word. What is accurate?',
    'Decoding is not knowing the meaning, and a word unfamiliar in print may be known from speech',
    ['The first student recognised the word, since sounding it out means recognising it', 'MC-DECODING-EQUALS-RECOGNIZING-MEANING'],
    ['The second does not know the word, because an unfamiliar-looking printed word is an unknown word', 'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD'],
    'decoding vs. recognition, re-asked with tsunami and giraffe'),
  card('eng.vocab.word-recognition', 'fill_blank', M,
    'Complete the sentence: after decoding a printed word, ____.',
    'ask whether you know it from speech, and what it means',
    ['you can be sure you understand it, because decoding is recognising meaning', 'MC-DECODING-EQUALS-RECOGNIZING-MEANING'],
    ['treat it as an unknown word if it looked unfamiliar on the page', 'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD'],
    'Replacement texts for both misconceptions'),
  card('eng.vocab.word-recognition', 'checkpoint', A,
    'An adult learner decodes "invoice" perfectly but cannot say what it is, and assumes that, because it looked unfamiliar on the page, she has never heard it. Which assessment is accurate?',
    'Decoding is not meaning; she may know the spoken word, so she should check how it sounds',
    ['She recognises it, since decoding it correctly means she knows it', 'MC-DECODING-EQUALS-RECOGNIZING-MEANING'],
    ['She has never heard it, because an unfamiliar-looking printed word is always an unknown word', 'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD'],
    'both misconceptions, with "invoice"'),
]
