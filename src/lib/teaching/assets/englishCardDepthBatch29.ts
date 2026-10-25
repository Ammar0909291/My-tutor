/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 29 (11 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_29: SeedProbe[] = [
  // linguistics.historical-linguistics-intro
  //   A: MC-A-LANGUAGE-CHANGE-IS-RANDOM-DECAY-OR-CORRUPTION-OF-A-PURER-EARLIER-FORM
  //   B: MC-B-LANGUAGE-CHANGE-HAPPENS-RANDOMLY-WORD-BY-WORD-WITH-NO-SYSTEMATIC-PATTERN
  adultCard("eng.linguistics.historical-linguistics-intro",
    "Old English and Modern English differ greatly. What is the sound linguistic view of the change between them?",
    "Each stage was a complete, working system that had itself changed, and sound changes follow regular patterns across many words",
    "Modern English is a decayed, corrupted version of a purer earlier form that has slowly lost its original structure and clarity",
    "The changes happened randomly, word by word, with no systematic pattern",
    "change is not decay; change is systematic"),
  // linguistics.language-acquisition-intro
  //   A: MC-A-CHILDREN-LEARN-LANGUAGE-PURELY-BY-IMITATING-WHAT-THEY-HEAR-ADULTS-SAY
  //   B: MC-B-LEARNING-A-LANGUAGE-LATER-IN-LIFE-IS-JUST-A-WEAKER-OR-WORSE-VERSION-OF-CH
  adultCard("eng.linguistics.language-acquisition-intro",
    "A toddler says \"I holded the baby bunnies\", and an adult newcomer to English quickly learns and applies a complex rule from a class. What do researchers conclude?",
    "\"Holded\" applies a rule never heard, so children do not learn by imitation alone; the adult's quick progress is a different route, not a worse one",
    "The child must have heard adults say \"holded\", because children learn language purely by imitating what they hear",
    "The adult's quick progress is only a weaker version of childhood acquisition, so learning a language later in life is just a weaker, worse way to learn it than childhood",
    "systematic child errors; later learning is different, not just weaker"),
  // linguistics.language-families
  //   A: MC-A-ANY-TWO-LANGUAGES-WITH-SIMILAR-SOUNDING-WORDS-MUST-BE-RELATED
  //   B: MC-B-LANGUAGES-USING-THE-SAME-WRITING-SYSTEM-OR-LOCATED-IN-THE-SAME-REGION-ARE
  adultCard("eng.linguistics.language-families",
    "Two languages share a region and a writing system, and a few words in them sound alike. How should a linguist judge whether they belong to one family?",
    "Look for systematic sound correspondences across many words; a few similar words may come from borrowing or coincidence, and a shared script or region proves nothing",
    "The similar-sounding words are enough to show that the languages are related",
    "Sharing a writing system and a region means the languages are automatically in the same family",
    "systematic correspondence is the evidence; similarity, script and region are not"),
  // linguistics.morphology-intro
  //   A: MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE
  //   B: MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-
  adultCard("eng.linguistics.morphology-intro",
    "How many morphemes are in \"teachers\", and of what kinds?",
    "Three: \"teach\", the derivational \"-er\" and the inflectional \"-s\"; syllables do not decide the count",
    "Two, because \"teachers\" has two syllables and each syllable is one morpheme, so there are no more than two",
    "Three, but \"-er\" and \"-s\" do the same kind of job, since adding any ending has the same kind of effect",
    "morphemes are units of meaning; derivational differs from inflectional"),
  // linguistics.phonology-intro
  //   A: MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING
  //   B: MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN
  adultCard("eng.linguistics.phonology-intro",
    "The \"p\" in \"pin\" is released with a puff of air and the \"p\" in \"spin\" is not, yet in English swapping them never changes a word. What does this show?",
    "They differ physically (phonetics) but are not different phonemes in English (phonology), because swapping them changes no meaning",
    "Phonetics and phonology ask the same question, so the difference in puffs must also be a difference in meaning between two English words",
    "Any two physically different sounds are different phonemes in every language, so English has two phonemes here",
    "phonetics vs phonology; physical difference is not phonemic"),
  // linguistics.pragmatics-intro
  //   A: MC-A-WHAT-A-SPEAKER-LITERALLY-SAYS-IS-ALWAYS-EXACTLY-WHAT-THEY-MEAN
  //   B: MC-B-IMPLICATURE-MEANS-THE-SAME-AS-LITERAL-VAGUENESS-OR-JUST-BEING-UNCLEAR
  adultCard("eng.linguistics.pragmatics-intro",
    "Asked \"Is the report ready?\", a colleague answers \"I am still waiting for the last figures.\" What is the best analysis?",
    "It does not literally say \"no\", but it implies the report is not ready; implicature is context-based meaning, not vagueness",
    "The speaker means exactly what was literally said, so no answer about readiness was given at all and nothing at all is implied",
    "The reply is just vague and unclear, since implicature means the same as being unclear",
    "literal versus intended meaning; implicature is not vagueness"),
  // linguistics.psycholinguistics-intro
  //   A: MC-A-INTROSPECTION-SIMPLY-THINKING-ABOUT-HOW-LANGUAGE-FEELS-TO-USE-IS-A-RELIAB
  //   B: MC-B-SPEECH-ERRORS-SLIPS-OF-THE-TONGUE-ARE-JUST-RANDOM-NOISE-WITH-NO-SYSTEMATI
  adultCard("eng.linguistics.psycholinguistics-intro",
    "A speaker says \"a lack of pies\" for \"a pack of lies\" and feels sure she knows exactly how her mind finds words. How should psycholinguists treat these two facts?",
    "The slip shows a systematic pattern in speech planning, and her feeling is not reliable evidence, so controlled experiments are needed",
    "Her confident feeling about how her mind finds words is a reliable way to study mental processes, because she knows her own mind best and can report on it directly",
    "The slip is just random noise with no system behind it",
    "experimental evidence over introspection; slips are systematic"),
  // linguistics.semantics-intro
  //   A: MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-R
  //   B: MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER
  adultCard("eng.linguistics.semantics-intro",
    "Which observation shows that meaning is more structured than a list of one-to-one word labels?",
    "\"A poodle is always a dog, but a dog is not always a poodle\" shows a systematic relationship between words, and \"dog bites man\" differs from \"man bites dog\" although the words are the same",
    "Each word is only a one-to-one label with no relationship to other words, so \"poodle\" and \"dog\" are unrelated labels",
    "\"Dog bites man\" and \"man bites dog\" mean the same, since a sentence's meaning is the sum of its word meanings in any order",
    "hyponymy; structure matters to sentence meaning"),
  // linguistics.sociolinguistics-intro
  //   A: MC-A-LANGUAGE-VARIATION-IS-ONLY-ABOUT-GEOGRAPHIC-REGION-NOT-SOCIAL-FACTORS
  //   B: MC-B-CODE-SWITCHING-AND-REGISTER-SHIFTING-MEAN-A-SPEAKER-DOESNT-FULLY-KNOW-EIT
  adultCard("eng.linguistics.sociolinguistics-intro",
    "In one city, newer nurses at a hospital use informal phrases with colleagues and formal ones with patients' families. What does sociolinguistics conclude?",
    "Social factors such as age and role produce systematic variation, and shifting style by setting shows command of both, not a gap in either",
    "Variation can only come from geographic region, so the nurses must come from different areas",
    "Switching between informal and formal speech shows that the nurse does not fully know either variety, since a speaker who knew them would stay in one",
    "variation is social as well as regional; switching shows command"),
  // linguistics.syntax-theory-intro
  //   A: MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY
  //   B: MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-
  adultCard("eng.linguistics.syntax-theory-intro",
    "A linguist notes that a child never says \"the ball big red\", and that \"The calendar boiled quietly\" follows English word order although it describes nothing sensible. What follows?",
    "Syntax is the speaker's untaught structural knowledge, and a sentence can be grammatical yet make no sense, so structure and meaning are separate",
    "Syntax is just the school grammar rules taught for writing correctly, so the child must have been taught that order in some lesson at school or at home",
    "The calendar sentence is ungrammatical, because a grammatically correct sentence must also make sense",
    "syntax is not school grammar; grammatical is not meaningful"),
  // linguistics.translation-studies-intro
  //   A: MC-A-A-GOOD-TRANSLATION-IS-A-MECHANICAL-WORD-FOR-WORD-SUBSTITUTION-FROM-ONE-LA
  //   B: MC-B-THERE-IS-ALWAYS-EXACTLY-ONE-CORRECT-TRANSLATION-FOR-A-GIVEN-PASSAGE-AND-A
  adultCard("eng.linguistics.translation-studies-intro",
    "A company must translate the slogan \"Our plan is a piece of cake\" for a market where the idiom does not exist. Which approach does translation studies support?",
    "Convey the idea, that the plan is easy, in a natural expression of the target language; more than one good translation may exist",
    "Substitute each word with its closest equivalent, since a good translation is a word-for-word substitution of the whole slogan, in the same word order",
    "Find the one correct translation of the passage, since every other version is wrong",
    "translation is not word-for-word; no single correct translation"),
]
