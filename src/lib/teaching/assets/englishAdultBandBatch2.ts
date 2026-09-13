/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 2.
 *
 * ── SCOPE CORRECTION FROM RE-MEASUREMENT (2026-09-10) ───────────────────────
 * Batch 1's audit counted 204 concepts as "ADULT gap" by checking only for
 * an ADULT-band probe's presence. Re-measured with native-band awareness
 * (`scripts/qa/englishAdultBandAudit.ts`, `computeAdultGap()`):
 * `matcher.ts`'s `isHighAdultCompatible` gives a HIGH-native probe a +15
 * bonus against an ADULT learner (score 65, exactly the threshold), so a
 * HIGH-native concept's EXISTING probes already serve an ADULT learner —
 * no new authoring needed. Of the 204, 95 are HIGH-native and already
 * covered; the TRUE remaining gap is 109 (EARLY/ELEMENTARY/MIDDLE/
 * UNDERGRADUATE-native concepts, which get no matcher bonus toward ADULT).
 * This batch targets the corrected list, continuing where Batch 1 left off
 * in KG order and skipping the 6 already-covered HIGH-native phonetics
 * concepts (consonant-sounds, vowel-sounds, ipa-basics, minimal-pairs,
 * syllable-stress, sentence-stress) that sat between Batch 1's phonics
 * concepts and this batch's next genuinely-gapped ones.
 *
 * ── THIS BATCH ───────────────────────────────────────────────────────────
 * 10 concepts, 3 new ADULT-band closed-choice probes each (30 total) — the
 * bare mastery-gate contract. 4 phonics/phonetics (ELEMENTARY/MIDDLE
 * native) + 6 vocab (all MIDDLE native): eng.phonics.syllable-types,
 * eng.phonics.decoding-fluency, eng.phonetics.speech-sounds-overview,
 * eng.phonetics.articulation-organs, eng.vocab.word-recognition,
 * eng.vocab.context-clues, eng.vocab.synonyms-antonyms,
 * eng.vocab.word-families, eng.vocab.compound-words, eng.vocab.prefixes.
 *
 * Same structure, technique and register discipline as
 * englishAdultBandBatch1.ts: mcq(FOUNDATIONAL)/misconception_probe
 * (DEVELOPING)/mcq(PROFICIENT) ladder per concept, reusing each concept's
 * own two already-registered, already-ACTIVE misconceptions (every
 * registry checked and confirmed to hold exactly 2) via genuinely
 * different adult-context examples than the concept's native-band probes
 * and its own existing ADULT explanation (authoredSeedAssets.ts) already
 * use. Adult register throughout — workplace reading, adult self-study,
 * tutoring a child, reading real-world text — no child-storybook framing.
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

const SYLLABLE_TYPES_ADULT = adultLadder(
  'eng.phonics.syllable-types', 'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE', 'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN',
  [
    {
      stem: 'Helping a child sound out the unfamiliar word "picnic": is guessing the whole word from its shape a reliable approach, or is there a better one?',
      correct: 'Split it into syllables (pic-nic) and decode each one using known patterns — far more reliable than guessing from shape',
      wrong: 'Guess the whole word from its general shape — multisyllabic words are too unpredictable to break down',
    },
    {
      stem: 'Does the first syllable of "moment" ("mo") use a short vowel, the way the first syllable of "napkin" ("nap") does?',
      correct: 'No — "mo" is an open syllable (no closing consonant), so it uses the long vowel sound; not every syllable follows the same pattern',
      wrong: 'Yes — every syllable in every word follows the same short-vowel pattern',
    },
    {
      stem: 'Reading the unfamiliar word "ombudsman" aloud for the first time, is a shape-guess or a syllable-by-syllable decode the more reliable strategy?',
      correct: 'Syllable-by-syllable decoding (om-buds-man) — breaking multisyllabic words down is reliable, not a guessing game',
      wrong: 'A shape-guess — long unfamiliar words are too unpredictable to decode piece by piece',
    },
  ],
  [
    'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE, adult framing (helping a child) with "picnic" rather than the existing "napkin"/"reptile" examples',
    'MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN, re-asked with "moment" rather than the existing "tiger"/"baby" examples',
    'MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE, a second fresh example ("ombudsman") forming the ladder\'s third rung',
  ],
)

const DECODING_FLUENCY_ADULT = adultLadder(
  'eng.phonics.decoding-fluency', 'MC-ACCURATE-EQUALS-FLUENT', 'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL',
  [
    {
      stem: 'An adult reading a safety notice aloud reads quickly and with confident expression, but mispronounces two key words along the way. Is this fluent reading?',
      correct: 'No — fluency needs accuracy, automaticity, AND expression together; speed and expression alone are not enough',
      wrong: 'Yes — reading fast and with expression is the whole goal of fluent reading',
    },
    {
      stem: 'An adult reads a work email at a natural pace, getting every word right, but in a flat monotone with no phrasing at all. Is this fluent reading?',
      correct: 'No — expression and phrasing matter too; accuracy and pace alone are not the whole picture',
      wrong: 'Yes — reading fast and accurately is the main sign of fluency',
    },
    {
      stem: 'An adult reads a recipe out loud very quickly with lots of expression, but skips or garbles several ingredient names. Is this fluent reading?',
      correct: 'No — accuracy is not optional; a fast, expressive reading that garbles the actual words is not fluent',
      wrong: 'Yes — speed and expression are what matter most for fluent reading',
    },
  ],
  [
    'MC-ACCURATE-EQUALS-FLUENT, adult framing (a safety notice) rather than the existing generic student-reading example',
    'MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL, adult framing (a work email) rather than the existing generic student-reading example',
    'MC-ACCURATE-EQUALS-FLUENT, a second fresh example (a recipe) forming the ladder\'s third rung',
  ],
)

const SPEECH_SOUNDS_OVERVIEW_ADULT = adultLadder(
  'eng.phonetics.speech-sounds-overview', 'MC-SOUNDS-EQUAL-LETTERS', 'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS',
  [
    {
      stem: 'Does the word "knight" have the same number of letters as sounds?',
      correct: 'No — "knight" has 6 letters but only 3 sounds (/n/-/aɪ/-/t/), since several letters combine into or are silent within single sounds',
      wrong: 'Yes — the number of letters always equals the number of sounds',
    },
    {
      stem: 'A colleague from a different English-speaking region pronounces the vowel in "dance" slightly differently than you do. Is one of you speaking incorrectly?',
      correct: 'No — both are real, valid dialect variations of the same sound, not an error',
      wrong: 'Yes — there is only one correct way to pronounce each sound',
    },
    {
      stem: 'Does the word "through" have the same number of letters as sounds?',
      correct: 'No — "through" has 7 letters but only 3 sounds (/θ/-/r/-/uː/); letter count and sound count are genuinely different things',
      wrong: 'Yes — English spelling always gives one letter per sound',
    },
  ],
  [
    'MC-SOUNDS-EQUAL-LETTERS, re-asked with "knight" rather than the existing "though"/"ship" examples',
    'MC-SPEECH-SOUNDS-ARE-FIXED-UNITS, adult framing (a colleague) rather than the existing "bath"/"butter" examples',
    'MC-SOUNDS-EQUAL-LETTERS, a second fresh example ("through") forming the ladder\'s third rung',
  ],
)

const ARTICULATION_ORGANS_ADULT = adultLadder(
  'eng.phonetics.articulation-organs', 'MC-ONLY-TONGUE-MATTERS', 'MC-VOICED-VOICELESS-IS-VOLUME',
  [
    {
      stem: 'To make the "b" sound, the lips press together and then release while the tongue stays relaxed and uninvolved. Does the tongue have to be involved for every consonant sound?',
      correct: 'No — some sounds, like "b" and "p," are made mainly with the lips, with little or no tongue involvement',
      wrong: 'Yes — only the tongue matters for making consonant sounds',
    },
    {
      stem: 'An adult whispers the sound "zzz" as quietly as possible — but their vocal cords never vibrate during it. Is whether a sound is voiced or voiceless about how loud it is?',
      correct: 'No — voicing is about whether the vocal cords vibrate, not about volume; a whispered sound can reveal this by its lack of vibration, not its quietness',
      wrong: 'Yes — voiced versus voiceless is really about how loud the sound is',
    },
    {
      stem: 'To make the "f" sound, the bottom lip touches the top teeth while the tongue stays relaxed. Does making a consonant always require the tongue to move?',
      correct: 'No — "f" is made mainly with the lip and teeth, with minimal tongue involvement, just like "m" and "b"',
      wrong: 'Yes — every single consonant sound in English requires active tongue movement',
    },
  ],
  [
    'MC-ONLY-TONGUE-MATTERS, re-asked with "b" rather than the existing "mmmm"/"ffff" examples',
    'MC-VOICED-VOICELESS-IS-VOLUME, adult framing (a whispered "zzz") rather than the existing shouted-"sss"/whispered-"zzzz" examples',
    'MC-ONLY-TONGUE-MATTERS, a second fresh example ("f") forming the ladder\'s third rung',
  ],
)

const WORD_RECOGNITION_ADULT = adultLadder(
  'eng.vocab.word-recognition', 'MC-DECODING-EQUALS-RECOGNIZING-MEANING', 'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD',
  [
    {
      stem: 'An adult ESL learner sounds out the printed word "receipt" correctly as /r/-/ɪ/-/s/-/iː/-/t/ but does not connect it to the paper slip they already know by ear when shopping. Have they fully recognized the word?',
      correct: 'No — decoding the sounds is only half the job; word recognition also requires linking the decoded sounds to the meaning already known from spoken vocabulary',
      wrong: 'Yes — successfully sounding out the letters means the word has been fully recognized',
    },
    {
      stem: 'An adult sees the printed word "questionnaire" for the first time and does not recognize it by sight. Does that mean "questionnaire" is a word they do not know at all?',
      correct: 'No — they may already know and use the SPOKEN word "questionnaire" perfectly well; not recognizing its printed form is a different, narrower gap',
      wrong: 'Yes — if a learner cannot recognize a word in print, that word must be completely unknown to them',
    },
    {
      stem: 'An adult correctly sounds out the unfamiliar printed word "itinerary" but pauses, unsure what it refers to. Is sounding it out correctly the same as fully recognizing the word?',
      correct: 'No — recognizing a word means connecting the sounded-out form to an actual meaning, not just producing the correct sounds',
      wrong: 'Yes — once the sounds are produced correctly, the word has been recognized',
    },
  ],
  [
    'MC-DECODING-EQUALS-RECOGNIZING-MEANING, adult ESL framing with "receipt" rather than the existing "cat" example',
    'MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD, re-asked with "questionnaire" rather than the existing "umbrella" example',
    'MC-DECODING-EQUALS-RECOGNIZING-MEANING, a second fresh example ("itinerary") forming the ladder\'s third rung',
  ],
)

const CONTEXT_CLUES_ADULT = adultLadder(
  'eng.vocab.context-clues', 'MC-GUESS-FROM-ONE-WORD-NEARBY', 'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY',
  [
    {
      stem: 'In a work email, "The taciturn manager said little during the entire meeting," is it reliable to guess "taciturn" means "quiet" based only on the word "meeting"?',
      correct: 'No — the fuller clue "said little during the entire meeting" is what actually signals quietness; the whole sentence should be weighed, not just one nearby word',
      wrong: 'Yes — the closest nearby word is usually enough to determine a word\'s meaning',
    },
    {
      stem: 'You guessed "adamant" means "unsure" from one sentence. The next sentence says "she was so adamant that no one could change her mind." Should you keep your original guess?',
      correct: 'No — this new context contradicts "unsure"; the guess should be revised toward "firm/unyielding" — a context-clue guess is a working hypothesis, not a locked-in answer',
      wrong: 'Yes — once you make a context-clue guess, it is certain and should not be revised',
    },
    {
      stem: 'In "The affable receptionist greeted every visitor warmly," is it reliable to guess "affable" means "friendly" based only on the word "visitor"?',
      correct: 'No — the phrase "greeted every visitor warmly" is what actually signals friendliness; weigh the whole sentence, not one nearby word alone',
      wrong: 'Yes — the nearest word alone is enough to pin down a meaning',
    },
  ],
  [
    'MC-GUESS-FROM-ONE-WORD-NEARBY, adult workplace framing with "taciturn" rather than the existing "reticent"/"gregarious" examples',
    'MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY, re-asked with "adamant" rather than the existing "candid"/"morose" examples',
    'MC-GUESS-FROM-ONE-WORD-NEARBY, a second fresh example ("affable") forming the ladder\'s third rung',
  ],
)

const SYNONYMS_ANTONYMS_ADULT = adultLadder(
  'eng.vocab.synonyms-antonyms', 'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL', 'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE',
  [
    {
      stem: 'On a resume, are "frugal" and "stingy" exactly identical, with zero difference in how they feel to a hiring manager?',
      correct: 'No — both describe careful spending, but "stingy" sounds negative while "frugal" sounds like a positive trait to list',
      wrong: 'Yes — synonyms are always fully interchangeable with no difference at all',
    },
    {
      stem: 'Does the word "table" have a meaningful antonym, the same way "hot" has "cold"?',
      correct: 'No — "table" is a concrete noun/category, not a gradable quality, so it has no true antonym',
      wrong: 'Yes — every word has a simple, clear-cut opposite',
    },
    {
      stem: 'In a performance review, are "assertive" and "aggressive" exactly identical, with no difference in tone?',
      correct: 'No — both describe a forceful manner, but "aggressive" sounds critical while "assertive" sounds like a positive trait',
      wrong: 'Yes — words that describe similar behavior are always fully interchangeable',
    },
  ],
  [
    'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL, adult workplace framing (a resume) with "frugal"/"stingy" rather than the existing "cheap"/"affordable" example',
    'MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE, re-asked with "table" rather than the existing "chair"/"book" examples',
    'MC-SYNONYMS-ARE-EXACTLY-IDENTICAL, a second fresh example (a performance review, "assertive"/"aggressive") forming the ladder\'s third rung',
  ],
)

const WORD_FAMILIES_ADULT = adultLadder(
  'eng.vocab.word-families', 'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY', 'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS',
  [
    {
      stem: 'Do "act," "actor," and "acre" belong to the same word family, since they all start with "ac"?',
      correct: 'No — "acre" shares no actual meaning connection with "act"/"actor"; a true word family requires a shared root meaning, not just similar spelling',
      wrong: 'Yes — sharing the same starting letters is enough to be a word family',
    },
    {
      stem: 'If "inform" is a verb, must "informative" (from the same word family) also be a verb?',
      correct: 'No — "informative" is an adjective; word families typically span different word classes (verb, noun, adjective, adverb) built from the same root',
      wrong: 'Yes — all members of a word family must share the same word class',
    },
    {
      stem: 'Do "part," "party," and "park" belong to the same word family, since they all start with "par"?',
      correct: 'No — "party" and "park" share no real meaning connection with "part"; matching starting letters is not the same as a shared root meaning',
      wrong: 'Yes — words that start the same way are automatically in the same family',
    },
  ],
  [
    'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY, re-asked with "act"/"actor"/"acre" rather than the existing "sun"/"sunk"/"sung" and "car"/"care"/"card" examples',
    'MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS, re-asked with "inform"/"informative" rather than the existing "decide"/"decisive" example',
    'MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY, a second fresh example ("part"/"party"/"park") forming the ladder\'s third rung',
  ],
)

const COMPOUND_WORDS_ADULT = adultLadder(
  'eng.vocab.compound-words', 'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM', 'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD',
  [
    {
      stem: 'Does "deadline" mean something related to dead people and lines, the same way "doorbell" means a bell for a door?',
      correct: 'No — "deadline" is opaque; it names a final due date, unrelated to death, unlike the transparent "doorbell"',
      wrong: 'Yes — every compound word\'s meaning is always the literal sum of its two parts',
    },
    {
      stem: 'Is "sister-in-law" a real compound word, even though it\'s written with hyphens instead of as one unbroken word?',
      correct: 'Yes — it names one unified relationship, making it a hyphenated compound; compounds can be closed, hyphenated, or open',
      wrong: 'No — compound words are always written as one unbroken word',
    },
    {
      stem: 'Does "butterfly" mean something related to butter and flies, the same way "bedroom" means a room for a bed?',
      correct: 'No — "butterfly" is opaque; it names an insect, unrelated to dairy or flying insects called flies specifically, unlike the transparent "bedroom"',
      wrong: 'Yes — compound word meanings always add up literally from their two parts',
    },
  ],
  [
    'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM, re-asked with "deadline" rather than the existing "ladybug"/"butterfly" examples',
    'MC-COMPOUND-WORDS-ARE-ALWAYS-WRITTEN-AS-ONE-WORD, re-asked with "sister-in-law" rather than the existing "mother-in-law"/"ice cream" examples',
    'MC-COMPOUND-MEANING-IS-ALWAYS-LITERAL-SUM, a second fresh example ("butterfly") forming the ladder\'s third rung',
  ],
)

const PREFIXES_ADULT = adultLadder(
  'eng.vocab.prefixes', 'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING', 'MC-PREFIXES-ONLY-NEGATE-MEANING',
  [
    {
      stem: 'On a job application form, does "re-" mean the same thing in "resubmit" and "recall"?',
      correct: 'No — "resubmit" means submit again (repetition), but "recall" can mean call back to mind (not simple repetition); the same prefix can carry different senses',
      wrong: 'Yes — a prefix always keeps one single fixed meaning wherever it appears',
    },
    {
      stem: 'What does the prefix "co-" add in "coworker"?',
      correct: 'Togetherness: "co-" shows someone working alongside another, not negation — prefixes don\'t only negate',
      wrong: 'Negation: prefixes always reverse the base word\'s meaning',
    },
    {
      stem: 'On a delivery notice, does "over-" mean the same thing in "overdue" and "overlook"?',
      correct: 'No — "overdue" means past due (time), but "overlook" means to miss noticing something (not a time sense); the same prefix can carry different senses',
      wrong: 'Yes — once you learn what a prefix means in one word, it means exactly that in every word',
    },
  ],
  [
    'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING, adult framing (a job application) with "re-" rather than the existing "un-"/"re-" examples',
    'MC-PREFIXES-ONLY-NEGATE-MEANING, re-asked with "co-" rather than the existing "pre-"/"sub-" examples',
    'MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING, a second fresh example (a delivery notice, "over-") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_2: SeedProbe[] = [
  ...SYLLABLE_TYPES_ADULT,
  ...DECODING_FLUENCY_ADULT,
  ...SPEECH_SOUNDS_OVERVIEW_ADULT,
  ...ARTICULATION_ORGANS_ADULT,
  ...WORD_RECOGNITION_ADULT,
  ...CONTEXT_CLUES_ADULT,
  ...SYNONYMS_ANTONYMS_ADULT,
  ...WORD_FAMILIES_ADULT,
  ...COMPOUND_WORDS_ADULT,
  ...PREFIXES_ADULT,
]
