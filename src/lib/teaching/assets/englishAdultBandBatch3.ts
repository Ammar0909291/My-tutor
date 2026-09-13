/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 3.
 *
 * Continues Batch 1 (10 eng.phonics, commit 3afa9f5) and Batch 2 (10
 * phonics/phonetics/vocab, commit df7f9c8) against the TRUE-gap list
 * `englishAdultBandAudit.ts`'s `computeAdultGap()` computes — EARLY/
 * ELEMENTARY/MIDDLE/UNDERGRADUATE-native concepts only (HIGH-native
 * concepts already clear the ADULT mastery bar via `matcher.ts`'s
 * HIGH<->ADULT +15 compatibility bonus, so they are correctly excluded).
 *
 * 10 concepts (6 vocab + 4 grammar, all MIDDLE-native, continuing in KG
 * order): eng.vocab.suffixes, eng.vocab.word-formation-processes,
 * eng.vocab.homonyms-homophones, eng.vocab.idioms, eng.vocab.phrasal-verbs,
 * eng.vocab.thesaurus-and-dictionary-skills, eng.grammar.word-classes-overview,
 * eng.grammar.nouns, eng.grammar.pronouns, eng.grammar.verbs. 30 new
 * ADULT-band closed-choice probes (3/concept) — the bare mastery-gate
 * contract. Same mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/
 * mcq(PROFICIENT) ladder as Batches 1-2, reusing each concept's own two
 * already-registered, already-ACTIVE misconceptions (every registry
 * checked and confirmed to hold exactly 2) via genuinely different
 * adult-context examples (workplace writing, adult reading, real-world
 * idiom/phrasal-verb usage) than the concept's native-band probes use.
 *
 * eng.grammar.nouns already has TWO native-band gap-closing probes
 * (englishBandGapAssets.ts, MIDDLE band, both MC-COUNTABLE-VS-UNCOUNTABLE-
 * IS-ARBITRARY) — unrelated to this file, which adds ADULT-band probes
 * only and reuses BOTH of the concept's two registered misconceptions
 * (MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS + MC-COUNTABLE-VS-UNCOUNTABLE-IS-
 * ARBITRARY, from authoredSeedAssets.ts's original two-misconception
 * registry), not a third invented one.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'english'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

function adultLadder(
  conceptId: string,
  mcA: string,
  mcB: string,
  items: [
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
    { stem: string; correct: string; wrong: string },
  ],
  notes: [string, string, string],
): SeedProbe[] {
  const mcAId = `${conceptId}:${mcA}`
  const mcBId = `${conceptId}:${mcB}`
  return [
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
      stem: items[0].stem,
      choices: [
        { text: items[0].correct, isCorrect: true },
        { text: items[0].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[0]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'misconception_probe',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
      stem: items[1].stem,
      choices: [
        { text: items[1].correct, isCorrect: true },
        { text: items[1].wrong, isCorrect: false, misconceptionId: mcBId },
      ],
      targetedMisconceptions: [mcBId],
      source: src(conceptId, notes[1]),
    },
    {
      conceptId, subjectSlug: S, probeKind: 'mcq',
      gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
      stem: items[2].stem,
      choices: [
        { text: items[2].correct, isCorrect: true },
        { text: items[2].wrong, isCorrect: false, misconceptionId: mcAId },
      ],
      targetedMisconceptions: [mcAId],
      source: src(conceptId, notes[2]),
    },
  ]
}

const SUFFIXES_ADULT = adultLadder(
  'eng.vocab.suffixes', 'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS', 'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM',
  [
    {
      stem: 'When "-ment" is added to "employ" (a verb) to make "employment," does the suffix only add meaning, or does it also change the word\'s class?',
      correct: 'It changes the word class too — "employment" is a noun, not a verb',
      wrong: 'Suffixes only add meaning and never change a word\'s class',
    },
    {
      stem: 'Is the spelling change from "big" to "biggest" (doubling the final consonant) a random exception to memorize?',
      correct: 'No — it follows the same systematic rule: double a short-vowel-preceded final consonant before a vowel-starting suffix',
      wrong: 'Yes — suffix spelling changes are random and must be memorized case by case',
    },
    {
      stem: 'On a job application, "-able" is added to "read" to make "readable." Does this suffix change the word\'s class?',
      correct: 'Yes — "readable" is an adjective, while "read" is a verb; this is the same grammatical job suffixes often do',
      wrong: 'No — a suffix only ever adds shades of meaning to the same word class',
    },
  ],
  [
    'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS, adult workplace framing with "-ment"/"employ" rather than the existing "-tion"/"create"/"-ness"/"kind" examples',
    'MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM, re-asked with "big"/"biggest" rather than the existing "hope"/"hoping"/"run"/"running" examples',
    'MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS, a second fresh example (a job application, "-able"/"read") forming the ladder\'s third rung',
  ],
)

const WORD_FORMATION_ADULT = adultLadder(
  'eng.vocab.word-formation-processes', 'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY', 'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE',
  [
    {
      stem: 'Is "brunch" (blended from "breakfast" and "lunch") formed the same way as "info" (shortened from "information")?',
      correct: 'No — "brunch" is blending (fusing parts of two words) while "info" is clipping (shortening one word); these are distinct processes',
      wrong: 'Yes — all new words are formed the same generic way, by combining or changing parts',
    },
    {
      stem: 'At work, the noun "impact" is now often used as a verb ("this will impact sales") with no spelling change at all. Does true conversion require some hidden suffix or spelling change?',
      correct: 'No — conversion is exactly a zero-change grammatical role shift; there is no hidden change to find',
      wrong: 'Yes — conversion must involve some hidden suffix or spelling change even if it isn\'t obvious',
    },
    {
      stem: 'Is "webinar" (blended from "web" and "seminar") formed the same way as "memo" (shortened from "memorandum")?',
      correct: 'No — "webinar" is blending while "memo" is clipping; word-formation processes are genuinely distinct, not one generic mechanism',
      wrong: 'Yes — every new word is created through the same combine-or-shorten process',
    },
  ],
  [
    'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY, adult framing with "brunch"/"info" rather than the existing "smog"/"app"/"toothbrush"/"gym" examples',
    'MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE, adult workplace framing ("impact") rather than the existing "text"/"email" examples',
    'MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY, a second fresh example ("webinar"/"memo") forming the ladder\'s third rung',
  ],
)

const HOMONYMS_HOMOPHONES_ADULT = adultLadder(
  'eng.vocab.homonyms-homophones', 'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING', 'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS',
  [
    {
      stem: 'Are "write," "right," and "rite" homonyms, since they all sound the same?',
      correct: 'No — they are homophones; they sound identical but are spelled differently, unlike homonyms, which are spelled the same',
      wrong: 'Yes — homonym and homophone mean the same thing',
    },
    {
      stem: 'In a work email, "Please book the venue," does "book" mean a printed volume, the same as it usually does?',
      correct: 'No — the surrounding context ("the venue") signals the "reserve" meaning here, not the printed-volume meaning',
      wrong: 'Yes — "book" always means a printed volume regardless of context',
    },
    {
      stem: 'Are "wear," "ware," and "where" homonyms, since they all sound the same?',
      correct: 'No — they are homophones (same sound, different spelling); homonyms share BOTH spelling and sound',
      wrong: 'Yes — words that sound identical are automatically homonyms',
    },
  ],
  [
    'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING, adult framing with "write"/"right"/"rite" rather than the existing "to/too/two"/"their/there/they\'re" examples',
    'MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS, adult workplace framing ("book the venue") rather than the existing "cast"/"bank" examples',
    'MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING, a second fresh example ("wear"/"ware"/"where") forming the ladder\'s third rung',
  ],
)

const IDIOMS_ADULT = adultLadder(
  'eng.vocab.idioms', 'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY', 'MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR',
  [
    {
      stem: 'Can you figure out what "hit the ground running" means by translating "hit," "the," "ground," and "running" separately?',
      correct: 'No — the idiom\'s meaning ("start energetically without delay") must be learned as one fixed whole-unit expression',
      wrong: 'Yes — you can figure out an idiom\'s meaning by translating each word literally',
    },
    {
      stem: '"Container" is a genuine synonym of "boat." Can you say "spill the container" instead of "spill the beans" and keep the idiomatic meaning?',
      correct: 'No — idioms are fixed expressions; swapping even a real synonym breaks the idiom entirely',
      wrong: 'Yes — you can freely change words within an idiom as long as the meaning stays similar',
    },
    {
      stem: 'Can you figure out what "under the weather" means by translating "under," "the," and "weather" separately?',
      correct: 'No — the idiom means "feeling ill," which cannot be decoded from the individual words at all',
      wrong: 'Yes — idioms are always decodable by translating their individual words',
    },
  ],
  [
    'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY, re-asked with "hit the ground running" rather than the existing "break the ice"/"raining cats and dogs" examples',
    'MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-SIMILAR, re-asked with "spill the beans" rather than the existing "miss the boat"/"kick the bucket" examples',
    'MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY, a second fresh example ("under the weather") forming the ladder\'s third rung',
  ],
)

const PHRASAL_VERBS_ADULT = adultLadder(
  'eng.vocab.phrasal-verbs', 'MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PARTICLES-LITERAL-MEANINGS', 'MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-AFTER-BOTH-REGARDLESS-OF-WHICH-PHRASAL-VERB-IT-IS',
  [
    {
      stem: '"The project was called off at the last minute." Does "called off" here involve any literal calling?',
      correct: 'No — "call off" is a fixed phrasal verb meaning "cancel," with no derivable connection to literal calling',
      wrong: 'Yes — a phrasal verb\'s meaning can usually be figured out from the verb and particle\'s literal meanings',
    },
    {
      stem: '"She looked up the word" is correct, and so is "she looked the word up." Does this mean you can always split any phrasal verb this way?',
      correct: 'No — "look up" happens to be separable, but many phrasal verbs like "run into" are inseparable; each must be checked individually',
      wrong: 'Yes — you can always place the object either between the verb and particle or after both, regardless of which phrasal verb it is',
    },
    {
      stem: '"The meeting was called off." Does "called off" involve any literal calling on the phone?',
      correct: 'No — "call off" is idiomatic, meaning "cancel," unrelated to phone calls',
      wrong: 'Yes — phrasal verbs generally keep some literal connection to their individual words',
    },
  ],
  [
    'MC-A-..., re-asked with "call off" rather than the existing "put off"/"gave up" examples',
    'MC-B-..., re-asked with "look up" (separable) vs. "run into" (inseparable) rather than the existing "run into"/"look after" example',
    'MC-A-..., a second fresh example (repeated "call off" check) forming the ladder\'s third rung',
  ],
)

const THESAURUS_DICTIONARY_ADULT = adultLadder(
  'eng.vocab.thesaurus-and-dictionary-skills', 'MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE', 'MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION',
  [
    {
      stem: 'Editing a report, a thesaurus lists "begin" first under "start." Should you always substitute the first-listed word without checking your sentence?',
      correct: 'No — thesaurus entries are grouped by similarity, not ranked by best fit; check several options against your specific sentence',
      wrong: 'Yes — the first word listed in a thesaurus entry is always the best choice',
    },
    {
      stem: 'A thesaurus groups "fix," "repair," and "patch" together as synonyms of "mend." Are all three fully interchangeable in a formal report?',
      correct: 'No — they carry different registers ("patch" sounds informal/temporary); check a dictionary\'s usage label before swapping',
      wrong: 'Yes — all synonyms listed together are fully interchangeable in every situation',
    },
    {
      stem: 'A thesaurus lists "commence" first under "start." Should a writer always pick the first-listed option?',
      correct: 'No — "commence" is more formal than "start"; the best choice depends on the sentence\'s context and tone, not list order',
      wrong: 'Yes — thesaurus entries are ranked with the best word listed first',
    },
  ],
  [
    'MC-A-..., adult framing (editing a report) with "begin"/"start" rather than the existing "glad"/"happy"/"content"/"happy" examples',
    'MC-B-..., adult framing (a formal report) with "fix"/"repair"/"patch" rather than the existing "request/demand/beg"/"slim/skinny/gaunt" examples',
    'MC-A-..., a second fresh example ("commence"/"start") forming the ladder\'s third rung',
  ],
)

const WORD_CLASSES_OVERVIEW_ADULT = adultLadder(
  'eng.grammar.word-classes-overview', 'MC-WORD-CLASS-IS-FIXED-PER-WORD', 'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE',
  [
    {
      stem: 'On a form, "Please book your slot" uses "book" as a verb. Is "book" always the same word class no matter how it\'s used?',
      correct: 'No — "book" functions as a verb here but as a noun in "read a book"; the same word can belong to different classes depending on use',
      wrong: 'Yes — "book" is always the same word class no matter how it\'s used',
    },
    {
      stem: 'In "The arrival delayed the meeting," is "arrival" a verb, since it describes an event-like happening?',
      correct: 'No — "arrival" functions as a noun here; it takes "the" and acts as the subject, regardless of feeling event-like',
      wrong: 'Yes — if a word\'s meaning is about an event, it must be a verb',
    },
    {
      stem: 'On an invoice, "Please charge my card" uses "charge" as a verb. Does "charge" always stay in that same word class?',
      correct: 'No — "charge" is a noun in "a small charge applies"; word class shifts with use, it is not fixed to the word itself',
      wrong: 'Yes — once a word\'s class is set in one sentence, it stays fixed everywhere else',
    },
  ],
  [
    'MC-WORD-CLASS-IS-FIXED-PER-WORD, adult framing (a form) with "book" rather than the existing "light"/"run" examples',
    'MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE, re-asked with "arrival" rather than the existing "decision" example',
    'MC-WORD-CLASS-IS-FIXED-PER-WORD, a second fresh example (an invoice, "charge") forming the ladder\'s third rung',
  ],
)

const NOUNS_ADULT = adultLadder(
  'eng.grammar.nouns', 'MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS', 'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY',
  [
    {
      stem: 'In "Her patience impressed the whole team," which words are nouns — only "team," or "patience" too?',
      correct: 'Both — "patience" is an abstract noun (a quality/idea), just as real a noun as the concrete "team"',
      wrong: 'Only "team" — nouns are things you can touch or see',
    },
    {
      stem: 'On a shopping list, should you write "three equipments" or "three pieces of equipment"?',
      correct: '"Three pieces of equipment" — equipment is uncountable, measured in units like "piece," not counted directly with a number',
      wrong: '"Three equipments" — equipment is a noun, and any noun can take a plural -s',
    },
    {
      stem: 'In "Her honesty surprised everyone," is "honesty" a real noun, the same as the concrete "everyone" nearby?',
      correct: 'Yes — "honesty" is an abstract noun naming a quality; abstract nouns are just as valid as concrete ones',
      wrong: 'No — only words naming physical, touchable things count as nouns',
    },
  ],
  [
    'MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS, adult framing ("patience"/"team") rather than the existing "table"/"happiness"/"freedom" examples',
    'MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY, adult framing (a shopping list, "equipment") rather than the existing "furniture"/"advice" examples',
    'MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS, a second fresh example ("honesty") forming the ladder\'s third rung',
  ],
)

const PRONOUNS_ADULT = adultLadder(
  'eng.grammar.pronouns', 'MC-PRONOUNS-ONLY-REPLACE-PEOPLE', 'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS',
  [
    {
      stem: '"I bought a new laptop. It works well." What does the pronoun "it" replace?',
      correct: '"Laptop" — a thing, not a person; pronouns can stand in for objects and ideas too, not just people',
      wrong: 'Nothing valid — pronouns can only replace people\'s names',
    },
    {
      stem: 'On a form, "He signed the document himself." Is "himself" just adding emphasis, or doing real grammatical work?',
      correct: 'Real work — "himself" is the OBJECT of "signed," showing the action\'s target is the same as its subject, not merely emphasis',
      wrong: 'Just emphasis — reflexive pronouns only stress a point and could be removed with no grammatical change',
    },
    {
      stem: '"I filed the report. It was late." What does "it" replace here?',
      correct: '"The report" — a thing, confirming pronouns replace objects and ideas as readily as people',
      wrong: 'Nothing — that use is invalid, since "it" must refer to a person',
    },
  ],
  [
    'MC-PRONOUNS-ONLY-REPLACE-PEOPLE, adult framing ("laptop") rather than the existing "lamp" example',
    'MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS, adult workplace framing ("signed the document himself") rather than the existing "hurt herself" example',
    'MC-PRONOUNS-ONLY-REPLACE-PEOPLE, a second fresh example ("the report") forming the ladder\'s third rung',
  ],
)

const VERBS_ADULT = adultLadder(
  'eng.grammar.verbs', 'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS', 'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS',
  [
    {
      stem: 'In "I understand the contract," is anything physically happening? Is "understand" still a verb?',
      correct: 'Nothing is physically happening, but "understand" is still a verb — it expresses a mental state, not just physical action',
      wrong: '"Understand" cannot be a verb since nothing is physically being done',
    },
    {
      stem: 'In "The report has been reviewed," is "reviewed" the only verb, or is "has been" also part of it?',
      correct: '"Has been reviewed" together is the complete verb phrase — "has" and "been" are genuine helping verbs',
      wrong: 'Only "reviewed" is the verb — helping verbs like "has"/"been" don\'t really count',
    },
    {
      stem: 'In "She believes the plan will work," is anything physically happening? Is "believes" still a verb?',
      correct: 'Nothing is physically happening, but "believes" is a verb — mental-state verbs are genuine verbs, just like physical-action ones',
      wrong: '"Believes" is not a real verb, since no physical action is described',
    },
  ],
  [
    'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS, adult workplace framing ("understand the contract") rather than the existing "know"/"is" examples',
    'MC-HELPING-VERBS-ARE-NOT-REAL-VERBS, adult framing ("has been reviewed") rather than the existing "have finished" example',
    'MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS, a second fresh example ("believes") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_3: SeedProbe[] = [
  ...SUFFIXES_ADULT,
  ...WORD_FORMATION_ADULT,
  ...HOMONYMS_HOMOPHONES_ADULT,
  ...IDIOMS_ADULT,
  ...PHRASAL_VERBS_ADULT,
  ...THESAURUS_DICTIONARY_ADULT,
  ...WORD_CLASSES_OVERVIEW_ADULT,
  ...NOUNS_ADULT,
  ...PRONOUNS_ADULT,
  ...VERBS_ADULT,
]
