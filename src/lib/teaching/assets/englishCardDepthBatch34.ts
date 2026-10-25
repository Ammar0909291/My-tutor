/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 34 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_34: SeedProbe[] = [
  // phonetics.minimal-pairs
  //   A: MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS
  //   B: MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE
  adultCard("eng.phonetics.minimal-pairs",
    "Which choice correctly identifies a minimal pair?",
    "\"ship\" and \"sheep\", which differ in exactly one phoneme (the vowel) with every other sound identical",
    "\"ship\" and \"chop\", which sound similar enough to count",
    "\"knight\" and \"night\", because they look different on the page, so they must differ in a sound as well, which makes them a minimal pair",
    "one phoneme, same position; spelling differences do not count"),
  // phonetics.phonetic-transcription
  //   A: MC-ONE-CORRECT-TRANSCRIPTION-EXISTS
  //   B: MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS
  adultCard("eng.phonetics.phonetic-transcription",
    "A student transcribes \"dance\" with five symbols, one per letter, and insists the textbook form is the only correct one even though a speaker from another region says the vowel differently. Which statement is accurate?",
    "Transcription records sounds, not letters, so \"dance\" has four symbols; speakers with different sounds can have different valid transcriptions",
    "The textbook form is the only correct transcription, so any other transcription is wrong, whatever sounds the speaker actually produces in speech",
    "A transcription is a letter-by-letter substitution of symbols, so \"dance\" needs five",
    "transcription records sounds; more than one valid transcription"),
  // phonetics.prosody
  //   A: MC-PROSODY-IS-JUST-INTONATION
  //   B: MC-PROSODY-ONLY-CONVEYS-GRAMMAR
  adultCard("eng.phonetics.prosody",
    "A listener analyzes the reply \"Sure, I'll look at it\", said slowly with heavy stress on \"look\" and a flat pitch. Which analysis is the most complete?",
    "Prosody combines stress, rhythm and intonation: heavy stress, slow timing and flat pitch together can signal reluctance",
    "Prosody is just intonation, so the flat pitch is all there is to analyze, and stress and timing add nothing to the meaning",
    "Prosody only conveys grammar, so these features show only that the sentence is a statement",
    "prosody integrates three elements and carries more than grammar"),
  // phonetics.rhythm-and-timing
  //   A: MC-EACH-SYLLABLE-TAKES-EQUAL-TIME
  //   B: MC-RHYTHM-IS-THE-SAME-AS-STRESS
  adultCard("eng.phonetics.rhythm-and-timing",
    "Compare \"BOOKS help\" and \"The BOOKS will HELP us\". A learner gives every syllable the same time in both and says rhythm just means which syllables are stressed. Which statement is accurate?",
    "English is stress-timed: stressed syllables recur at roughly equal intervals, with unstressed ones squeezed between; rhythm is timing",
    "Each syllable takes equal time in English, so the learner is right to give every syllable the same length, as in a drumbeat, with no squeezing of any syllable",
    "Rhythm is the same thing as stress, so the learner only needs to mark the stressed syllables",
    "stress-timed rhythm; rhythm is not stress"),
  // phonetics.sentence-stress
  //   A: MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD
  //   B: MC-EVERY-WORD-GETS-EQUAL-STRESS
  adultCard("eng.phonetics.sentence-stress",
    "A trainee says \"I walked TO the station, not FROM it\", stressing \"to\" for contrast, and later reads another sentence with equal weight on every word. Which statement is accurate?",
    "Content words normally carry the stress and function words are reduced, but the split is not fixed per word: \"to\" can be stressed for contrast; and English is not stressed evenly across all words",
    "The function word \"to\" can never be stressed, because the content and function split is fixed per word",
    "Every word in a sentence should get equal stress, since English sentences are stressed evenly",
    "sentence stress; function words can be stressed for contrast"),
  // phonetics.speech-sounds-overview
  //   A: MC-SOUNDS-EQUAL-LETTERS
  //   B: MC-SPEECH-SOUNDS-ARE-FIXED-UNITS
  adultCard("eng.phonetics.speech-sounds-overview",
    "A student says \"though\" has six sounds because it has six letters, and that two speakers who pronounce the middle of \"water\" differently cannot be producing the same sound. Which statement is accurate?",
    "Letters and sounds are independent systems, so \"though\" has fewer sounds than letters; one phoneme can vary physically across speakers",
    "\"Though\" has six sounds, because sounds equal letters",
    "The speakers must be producing different sounds, because speech sounds are fixed units that cannot vary physically at all, so two pronunciations mean two phonemes",
    "sounds are not letters; sounds vary physically"),
  // phonetics.syllable-stress
  //   A: MC-STRESS-IS-JUST-LOUDNESS
  //   B: MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING
  adultCard("eng.phonetics.syllable-stress",
    "A trainee shouts the second syllable of \"photographer\" to mark its stress, and assumes \"record\" always has the same stress because of its spelling. Which statement is accurate?",
    "Stress bundles length, pitch change and full vowel quality, not loudness alone, and it is not fixed by spelling: \"record\" shifts with its role",
    "Shouting is the right way to mark stress, since stress is just loudness",
    "\"Record\" is always stressed on the same syllable, because the stress pattern is fixed by the way the word is spelled, whether it is a noun or a verb in the sentence",
    "stress is several cues; stress can shift"),
  // phonetics.vowel-sounds
  //   A: MC-MONOPHTHONGS-AND-DIPHTHONGS-ARE-THE-SAME
  //   B: MC-VOWELS-HAVE-NO-ARTICULATION-PLACE
  adultCard("eng.phonetics.vowel-sounds",
    "A student stretches the vowel in \"boy\" and feels it change, and also says vowels have no articulation place because nothing touches. Which statement is accurate?",
    "The vowel in \"boy\" is a diphthong that glides from one quality to another; vowels are described by tongue height, backness and rounding",
    "It is a monophthong, because monophthongs and diphthongs are the same thing",
    "Vowels have no place of articulation, because nothing touches or closes the vocal tract, so there is nothing to describe about the tongue or the lips",
    "diphthongs glide; vowels have positions"),
  // phonics.alphabet-recognition
  //   A: MC-CASE-ARE-DIFFERENT-LETTERS
  //   B: MC-SHAPE-CONFUSION-MIRROR-LETTERS
  adultCard("eng.phonics.alphabet-recognition",
    "A learner reads \"TAXI\" on a sign and writes \"taxi\" in her notebook, and she mixes up \"p\" and \"q\" when copying words. Which statement is accurate?",
    "Upper and lower case are forms of one letter, so the word is unchanged; the p and q mix-ups are mirror-shape confusions that practice can fix",
    "\"T\" and \"t\" are different letters, so the notebook word is a different word from the one on the sign and may have a different meaning for the reader",
    "\"p\" and \"q\" are the same letter turned around, so confusing them does not matter",
    "case forms are one letter; mirror letters are distinct"),
  // phonics.blending-segmenting
  //   A: MC-BLENDING-IS-JUST-FAST-LETTERS
  //   B: MC-SEGMENTING-STOPS-AT-SYLLABLES
  adultCard("eng.phonics.blending-segmenting",
    "An adult learner reads \"trip\" by quickly saying the letter names \"tee-ar-eye-pee\", and segments \"dust\" into \"du-st\". Which statement is accurate?",
    "Blending glides the separate sounds /t/ /r/ /ɪ/ /p/ into a word, not letter names; segmenting reaches the single phonemes /d/ /ʌ/ /s/ /t/",
    "Saying the letter names quickly is blending, since blending is just fast letters, and the individual sounds do not need to be heard at all in the word",
    "\"Du-st\" is full segmentation, since segmenting stops at syllables or chunks",
    "blending uses sounds; segmenting reaches phonemes"),
]
