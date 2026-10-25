/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 33 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_33: SeedProbe[] = [
  // literature.setting-and-atmosphere
  //   A: MC-A-SETTING-IS-JUST-NEUTRAL-BACKGROUND-INFORMATION-WITH-NO-EMOTIONAL-EFFECT
  //   B: MC-B-A-SPECIFIC-SETTING-CAN-ONLY-EVER-CREATE-ONE-FIXED-ATMOSPHERE
  adultCard("eng.literature.setting-and-atmosphere",
    "A story opens in a seaside cafe. One version says \"salt-streaked windows rattled in a cold wind\"; another says \"sunlight spilled across the warm, bustling tables\". What does this show about setting?",
    "The same literal setting can create different atmospheres through specific descriptive choices, so setting is crafted, not neutral",
    "Setting is neutral background information with no emotional effect on the reader, so the two openings differ only in their incidental detail",
    "A cafe can only ever create one fixed atmosphere, so one of the two versions must be wrong",
    "setting is crafted and creates atmosphere; one setting can create several"),
  // literature.short-story-study
  //   A: MC-A-SHORT-STORY-IS-JUST-A-SHORT-NOVEL
  //   B: MC-B-EVERY-DETAIL-MUST-BE-A-DEEP-SYMBOL
  adultCard("eng.literature.short-story-study",
    "A 900-word story ends as a woman reads the first line of a letter, and earlier it mentions in passing that her kettle was blue. A student calls the story \"unfinished\" and the blue kettle a deep symbol. What is the sounder analysis?",
    "The compressed, open ending is deliberate and its effect should be examined; a passing detail is not automatically a symbol",
    "The story is an incomplete novel, because a short story is just a short novel and should resolve every thread it begins, so the open ending is a flaw",
    "The kettle must be a deep symbol, since every detail in a story must be one",
    "short story is a different form; not every detail is a symbol"),
  // literature.symbolism
  //   A: MC-A-SYMBOL-HAS-ONE-FIXED-UNIVERSAL-MEANING-ACROSS-ALL-STORIES
  //   B: MC-ANY-OBJECT-MENTIONED-REPEATEDLY-IN-A-STORY-IS-AUTOMATICALLY-A-SYMBOL
  adultCard("eng.literature.symbolism",
    "A story mentions a character's bicycle in nine scenes because she cycles to work. In another story, a locked gate appears each time a character avoids a hard conversation. Which analysis is sound?",
    "The bicycle is practical, not a symbol; the gate carries meaning beyond its function, set by this story, not a universal rule",
    "Both objects stand for the same thing in every story, since a symbol has one fixed universal meaning that every reader should know",
    "The bicycle is a symbol, because any object mentioned repeatedly is automatically a symbol",
    "symbol needs invested meaning; repetition alone is not enough"),
  // literature.theme-and-message
  //   A: MC-A-STORY-CAN-ONLY-HAVE-ONE-CORRECT-THEME
  //   B: MC-THEME-IS-THE-SAME-AS-THE-TOPIC-OR-SUBJECT-OF-THE-STORY
  adultCard("eng.literature.theme-and-message",
    "After reading a novel about a fishing village, one student says \"the theme is the sea\", another says its theme is that communities survive by sharing risk, and a third argues, with evidence, for a theme about the cost of tradition. What is the best response?",
    "\"The sea\" names a topic, not a theme; a theme is a specific insight, and the other two can both be supported by evidence, so a story may support more than one",
    "Only one of the three can be right, because a story can have only one correct theme",
    "\"The sea\" is a theme, since a theme is the same as the topic or subject of the story",
    "theme is an insight, not a topic; more than one theme can be supported"),
  // phonetics.accents-and-dialects
  //   A: MC-A-ACCENTS-ARE-MISPRONUNCIATIONS-OR-CARELESS-SPEECH
  //   B: MC-B-A-STANDARD-OR-PRESTIGE-ACCENT-IS-LINGUISTICALLY-MORE-CORRECT
  adultCard("eng.phonetics.accents-and-dialects",
    "Two classmates from different regions pronounce the vowel in \"bath\" differently, and a teacher says the prestige version is linguistically more correct and the other a mispronunciation. What does linguistics say?",
    "Both are systematic accent patterns with their own consistent rules, so neither is a mispronunciation or more correct",
    "The other version is a mispronunciation, since accents are careless departures from correct speech and should be fixed in class",
    "Both are rule-governed, but the prestige version is still linguistically more correct than the other",
    "accents are systematic; no accent is more correct"),
  // phonetics.articulation-organs
  //   A: MC-ONLY-TONGUE-MATTERS
  //   B: MC-VOICED-VOICELESS-IS-VOLUME
  adultCard("eng.phonetics.articulation-organs",
    "A learner says /s/ more loudly and believes it turns into /z/, and also thinks the /m/ sound needs only the tongue. Which statement is accurate?",
    "/s/ and /z/ differ in voicing, vibration of the vocal folds, not loudness; /m/ uses the lips, so many articulators matter",
    "Only the tongue matters, so /m/ is made by moving the tongue alone, with the lips and the rest of the mouth only along for the ride",
    "Saying /s/ louder turns it into /z/, since voiced versus voiceless is just volume",
    "articulators work together; voicing is vibration not volume"),
  // phonetics.connected-speech
  //   A: MC-CONNECTED-SPEECH-CHANGES-ARE-SLOPPY-SPEECH
  //   B: MC-CONNECTED-SPEECH-IS-RANDOM
  adultCard("eng.phonetics.connected-speech",
    "A coach calls \"hambag\" for \"handbag\" and \"tem bags\" for \"ten bags\" lazy or random. What does phonetics say?",
    "These are regular assimilations that fluent speakers produce; they follow rules, so they are neither sloppy nor random",
    "They are sloppy speech, since the careful, fully separated pronunciation is the standard that all speakers should aim for",
    "They are random changes that happen unpredictably from one utterance to the next",
    "connected speech is regular and rule-governed"),
  // phonetics.consonant-sounds
  //   A: MC-CLASSIFICATION-IS-JUST-LABELING
  //   B: MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT
  adultCard("eng.phonetics.consonant-sounds",
    "A student meets the consonant /ʒ/ (as in \"measure\") and has never classified it. Which approach is best?",
    "Run the diagnostic method: find place, manner and voicing and combine them; the framework works for any consonant",
    "Look it up in a memorized table of labels, since classification is just labeling sounds already known",
    "Judge each dimension on its own as if unrelated, so that saying it is \"voiced\" alone is a full classification of the sound",
    "place, manner and voicing as a method; they combine"),
  // phonetics.intonation-patterns
  //   A: MC-ALL-QUESTIONS-RISE
  //   B: MC-INTONATION-IS-DECORATIVE-NOT-MEANINGFUL
  adultCard("eng.phonetics.intonation-patterns",
    "A speaker says \"Where are you going?\", then \"You're going now.\" and \"You're going now?\". Which statement about intonation is accurate?",
    "A wh-question like the first normally falls, and the last two differ only in pitch: intonation can be the only signal separating a statement from a question",
    "Every question must rise, so the first question should end with a rising pitch",
    "Intonation is decorative and carries no meaning, so the last two sentences mean the same thing",
    "not all questions rise; intonation carries meaning"),
  // phonetics.ipa-basics
  //   A: MC-IPA-MATCHES-ENGLISH-SPELLING
  //   B: MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS
  adultCard("eng.phonetics.ipa-basics",
    "A student transcribes \"knight\" by writing a symbol for every letter, and reads the symbol /ʃ/ (as in \"ship\") as \"s\" followed by \"h\". Which statement is accurate?",
    "IPA labels sounds, not spellings: \"knight\" has fewer sounds than letters, and /ʃ/ is one symbol for one sound",
    "IPA follows English spelling, so each letter of \"knight\" should get its own symbol, including the silent k and gh",
    "IPA symbols are just fancy letters, so /ʃ/ is read by sounding out its parts like a spelling",
    "IPA is a notation for sounds; symbols are not spelling"),
]
