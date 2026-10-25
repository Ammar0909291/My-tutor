/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 35 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_35: SeedProbe[] = [
  // phonics.consonant-blends
  //   A: MC-BLEND-IS-ONE-FUSED-SOUND
  //   B: MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING
  adultCard("eng.phonics.consonant-blends",
    "An adult learner says the \"str\" at the start of \"strap\" is one fused sound, and that \"sh\" in \"shed\" is a blend like \"st\". Which statement is accurate?",
    "In \"strap\" /s/, /t/ and /r/ are each articulated separately, so it is a blend; \"sh\" is a digraph, one new sound",
    "\"Str\" is one fused sound, since a blend is one fused sound",
    "\"Sh\" is a blend just like \"st\", since blends and digraphs are the same thing, two letters read as two sounds in a row",
    "blend keeps every sound; digraph is one new sound"),
  // phonics.consonants
  //   A: MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS
  //   B: MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND
  adultCard("eng.phonics.consonants",
    "A learner reads \"cent\" with a hard /k/ like \"cat\", and says the \"b\" in \"lamb\" must be pronounced because every letter makes exactly one sound. Which statement is accurate?",
    "The letter \"c\" has two sounds, and which one occurs is predictable from the letter after it; a silent letter such as the \"b\" in \"lamb\" is not pronounced, so not every letter makes one sound",
    "\"C\" always makes the one hard sound /k/, since c and g are single-sound letters",
    "The \"b\" in \"lamb\" must be pronounced, because every letter makes exactly one sound",
    "c and g are conditioned; silent letters exist"),
  // phonics.decoding-fluency
  //   A: MC-ACCURATE-EQUALS-FLUENT
  //   B: MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL
  adultCard("eng.phonics.decoding-fluency",
    "Three adults read the same notice aloud. Ana reads every word correctly but one painful word at a time. Ben reads very fast and skips words. Cho reads at a natural pace, accurately, with natural stress and rhythm. Who is reading fluently?",
    "Cho: fluency needs accuracy, automaticity and prosody together",
    "Ana, because reading every word correctly is the same as fluency",
    "Ben, because fluency means reading fast above all",
    "fluency is accuracy, automaticity and prosody together"),
  // phonics.digraphs
  //   A: MC-DIGRAPH-IS-A-BLEND
  //   B: MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES
  adultCard("eng.phonics.digraphs",
    "A learner says the \"ch\" in \"chop\" is a blend of two sounds, and reads the vowel digraph \"ea\" in \"beat\" with a short vowel like the \"ea\" in \"head\". Which statement is accurate?",
    "\"Ch\" is a digraph, two letters for one new sound, not a blend; vowel digraphs vary, so \"ea\" is long in \"beat\", short in \"head\"",
    "\"Ch\" is a blend of two sounds, since a digraph is a blend",
    "\"Ea\" in \"beat\" is short like the one in \"head\", since vowel digraphs follow short-vowel rules in every word they appear in, so \"beat\" is said like \"bet\"",
    "digraph is not a blend; vowel digraphs vary"),
  // phonics.long-vowels-silent-e
  //   A: MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL
  //   B: MC-SILENT-E-DOES-NOTHING
  adultCard("eng.phonics.long-vowels-silent-e",
    "A learner reads \"cap\" and \"cape\" with the same vowel, saying the final \"e\" does nothing, and reads \"have\" with a long vowel, saying any final \"e\" makes the vowel long. Which statement is accurate?",
    "The silent \"e\" in \"cape\" reaches back over the consonant to make the \"a\" long, but \"have\" is an exception",
    "\"Have\" must have a long vowel, because any final \"e\" at the end of a word means a long vowel, so \"have\" should rhyme with \"gave\"",
    "\"Cap\" and \"cape\" share a vowel sound, because the silent \"e\" does nothing",
    "silent e changes the vowel; not every final e does"),
  // phonics.print-concepts
  //   A: MC-PICTURE-IS-THE-STORY
  //   B: MC-SPACES-ARE-DECORATION
  adultCard("eng.phonics.print-concepts",
    "A new reader looks at a bus timetable with a small picture of a bus and a column of printed times. She says the picture tells her when the bus leaves, and reads \"Bus12Arrives9:30\" as one long word because spaces are just decoration. What should she know?",
    "The printed words carry the information, and spaces mark where one word or unit ends, so she reads \"Bus 12 arrives 9:30\" as units",
    "The picture tells the story, so she can ignore the printed words and read the whole timetable from the small drawing of the bus alone",
    "The spaces are only decoration, so the run-together text can be read as one word",
    "print carries the message; spaces mark word boundaries"),
  // phonics.rhyming
  //   A: MC-FIRST-SOUND-IS-ENOUGH
  //   B: MC-SPELLING-MUST-MATCH
  adultCard("eng.phonics.rhyming",
    "In a word game, a player says \"rain\" and \"ran\" rhyme because both start with \"r\", and that \"laugh\" and \"half\" do not rhyme because their endings are spelled differently. Which statement is accurate?",
    "Rhyme depends on an identical final stressed vowel and what follows it, whatever the spelling: \"rain\" and \"ran\" do not rhyme, while \"laugh\" and \"half\" do",
    "\"Rain\" and \"ran\" rhyme, since sharing the first sound is enough",
    "\"Laugh\" and \"half\" do not rhyme, because rhyming words must be spelled the same at the end",
    "rhyme is the rime, not the first sound or spelling"),
  // phonics.short-vowels
  //   A: MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL
  //   B: MC-VOWEL-LETTER-NAME-IS-THE-SOUND
  adultCard("eng.phonics.short-vowels",
    "A learner reads \"bed\" with the vowel sound \"ee\" because that is the name of the letter e, and reads \"bone\" with a short vowel because one-syllable words always have a short vowel. Which statement is accurate?",
    "A vowel's short sound is the one it takes in a closed syllable, not its alphabet name, so \"bed\" has /ɛ/; and \"bone\", with a silent \"e\", has a long vowel, so syllable count does not decide it",
    "\"Bone\" has a short vowel, because one-syllable words always have a short vowel",
    "\"Bed\" has the vowel sound \"ee\", because a vowel letter's name is its sound",
    "short vowel in a closed syllable; not letter name, not syllable count"),
  // phonics.sight-words
  //   A: MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH
  //   B: MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL
  adultCard("eng.phonics.sight-words",
    "A tutor says the sight word \"can\" must be memorized as an unsoundable shape, and a learner who keeps mixing up \"was\" and \"saw\" says recognizing each word by its shape is enough. Which statement is accurate?",
    "\"Can\" is fully regular and can be sounded out; \"sight word\" names a teaching purpose, high frequency, not undecodability, and relying on shape alone leads to mix-ups like \"was\" and \"saw\"",
    "Recognizing each word by its shape is enough, so the learner need not attend to the letters in order",
    "Sight words cannot be sounded out at all, so \"can\" must be memorized as a whole shape",
    "sight word is a purpose category; shape alone is not enough"),
  // phonics.syllable-types
  //   A: MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN
  //   B: MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE
  adultCard("eng.phonics.syllable-types",
    "To read the unfamiliar word \"robot\" (ro-bot), a learner guesses from its overall shape, saying long words are unpredictable, and then gives both syllables a short vowel. Which statement is accurate?",
    "Split it into syllables and identify each type: \"ro\" is open, so long, and \"bot\" is closed, so short; syllable types signal the vowel",
    "Both syllables take short vowels, since all syllables follow the same pattern, so \"robot\" would be read with a short \"o\" in each syllable",
    "The learner is right to guess, since long words are unpredictable",
    "six syllable types signal vowel sounds in long words too"),
]
