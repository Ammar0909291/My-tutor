/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 40 (12 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_40: SeedProbe[] = [
  // vocab.synonyms-antonyms
  //   A: MC-EVERY-WORD-HAS-A-SIMPLE-OPPOSITE
  //   B: MC-SYNONYMS-ARE-EXACTLY-IDENTICAL
  adultCard("eng.vocab.synonyms-antonyms",
    "A manager describes a calm colleague as \"lazy\" instead of \"relaxed\", saying synonyms are identical, and asks for the opposite of \"window\". Which statement is accurate?",
    "Synonyms have similar, not identical, meanings and often differ in connotation, so \"lazy\" is not a neutral swap for \"relaxed\"; and many words, like \"window\", have no simple opposite",
    "\"Window\" must have a simple opposite, since every word has one",
    "\"Lazy\" and \"relaxed\" are exactly identical, with no difference in how they feel",
    "synonyms differ in connotation; not every word has an opposite"),
  // vocab.thesaurus-and-dictionary-skills
  //   A: MC-A-THE-FIRST-WORD-LISTED-IN-A-THESAURUS-ENTRY-IS-ALWAYS-THE-BEST-CHOICE
  //   B: MC-B-ALL-SYNONYMS-LISTED-TOGETHER-ARE-FULLY-INTERCHANGEABLE-IN-EVERY-SITUATION
  adultCard("eng.vocab.thesaurus-and-dictionary-skills",
    "Looking up \"big\" in a thesaurus, a writer picks the first listed word, \"colossal\", for \"a big problem at work\", and assumes all the listed words are interchangeable. What should the writer do instead?",
    "Test several listed options against the sentence and its tone, and check meanings in a dictionary, since an entry groups similar words without ranking them or making them interchangeable",
    "Keep \"colossal\", because the first word listed in a thesaurus entry is always the best choice",
    "Pick any listed word, because all synonyms listed together are fully interchangeable in every situation, so the choice makes no difference to tone or meaning in a report",
    "thesaurus lists are not ranked or interchangeable"),
  // vocab.word-families
  //   A: MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY
  //   B: MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS
  adultCard("eng.vocab.word-families",
    "A learner puts \"play\", \"player\" and \"plate\" in one word family because they start alike, and thinks every member of a family must be the same word class as \"play\". Which statement is accurate?",
    "\"Play\" and \"player\" share a root and related meaning, so they belong together, with members in different word classes; \"plate\" only looks similar",
    "\"Plate\" belongs to the family, since similar spelling means the same family",
    "Every member of a word family is in the same word class as \"play\", since family members are always the same class, so \"playful\" cannot belong to it",
    "families share meaning through a root; members differ in class"),
  // vocab.word-formation-processes
  //   A: MC-ALL-NEW-WORDS-ARE-FORMED-THE-SAME-WAY
  //   B: MC-CONVERSION-MUST-INVOLVE-SOME-HIDDEN-SUFFIX-OR-CHANGE
  adultCard("eng.vocab.word-formation-processes",
    "A team notes the blend \"smog\", the compound \"bookshelf\" and the verb \"to text\" (from the noun). A trainee says all three were formed the same way, and that \"to text\" must have a hidden suffix. Which statement is accurate?",
    "They are three different processes, blending, compounding and conversion, and conversion changes a word's role with no change in spelling or sound, so there is no hidden suffix",
    "All new words are formed the same way, so the three words share one process",
    "\"To text\" must involve a hidden suffix or some other change, since conversion always does",
    "several word-formation processes; conversion has no change"),
  // vocab.word-recognition
  //   A: MC-DECODING-EQUALS-RECOGNIZING-MEANING
  //   B: MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD
  adultCard("eng.vocab.word-recognition",
    "An adult learner sounds out \"mortgage\" correctly and, saying it aloud, realizes it is the word her bank uses. Another sounds out \"tariff\" correctly but has never heard the word. What does this show?",
    "Decoding gives a pronunciation, and recognition links it to a meaning already in the spoken vocabulary: the first learner recognizes the word, and the second decodes it without recognizing it, so it is new to her",
    "Both recognize their word, because decoding a word accurately is the same as recognizing its meaning",
    "The first learner does not know the word, because an unfamiliar printed word means an unknown word",
    "decoding is not recognition; unfamiliar print can be a known word"),
  // writing.citations-and-referencing
  //   A: MC-A-ONLY-DIRECT-QUOTES-NEED-CITATION
  //   B: MC-B-CITING-A-SOURCE-MEANS-THE-INFORMATION-IS-AUTOMATICALLY-TRUE-OR-GOOD-EVIDE
  adultCard("eng.writing.citations-and-referencing",
    "A report paraphrases a market-share figure from an industry study in its own words without a citation, and a second report cites a blog post for a claim, which the writer says makes the claim reliable. Which statement is accurate?",
    "Paraphrased facts still need attribution, and a citation shows where information came from, not that it is true",
    "The first report needs no citation, because only direct quotes need citation",
    "The second claim is reliable, because citing a source makes information automatically true, even when the source is only a blog post",
    "paraphrase needs attribution; citation is not proof"),
  // writing.creative-writing-forms
  //   A: MC-A-A-CREATIVE-FORM-LIKE-FLASH-FICTION-OR-FREE-VERSE-HAS-NO-RULES-OR-CONSTRAI
  //   B: MC-B-THE-SAME-CONTENT-AND-STRUCTURE-WORKS-EQUALLY-WELL-IN-ANY-CREATIVE-FORM
  adultCard("eng.writing.creative-writing-forms",
    "A writer entering a ten-line poetry contest hands in a 40-line piece, saying creative forms have no rules, and plans to turn a play's dialogue-heavy three-scene plot into a poem line for line. Which statement is accurate?",
    "Each form has real conventions, such as a poem's line and sound and a script's dialogue and stage direction, so content must fit the form",
    "The length limit does not apply, since a creative form has no rules or constraints",
    "The same content and structure work equally well in any creative form, so the plot can be moved into a poem line by line, unchanged from the play",
    "creative forms have conventions; content must fit form"),
  // writing.descriptive-writing
  //   A: MC-DESCRIPTIVE-WRITING-ONLY-USES-VISUAL-SIGHT-DETAILS
  //   B: MC-MORE-ADJECTIVES-ALWAYS-MAKES-DESCRIPTION-MORE-VIVID
  adultCard("eng.writing.descriptive-writing",
    "A student describes a harbour as \"a big, huge, enormous, gigantic harbour\" and says descriptive writing should use only what you can see. Which statement is accurate?",
    "A few precise sensory details, including sound, smell and touch, make description more vivid than a pile of near-synonym adjectives, and description is not limited to what is seen",
    "Description should use only visual details, since descriptive writing only uses sight",
    "The four adjectives make it more vivid, since more adjectives always make description more vivid",
    "precise sensory detail; not only sight; not more adjectives"),
  // writing.drafting
  //   A: MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WR
  //   B: MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING
  adultCard("eng.writing.drafting",
    "Drafting a proposal, a writer pauses to fix a spelling doubt in every sentence and, when stuck on a paragraph, stops writing until she knows exactly how to phrase it. What is the better approach?",
    "Keep drafting: mark uncertain spots to fix later and write what you can, since correction belongs to editing",
    "Stop drafting when stuck until you know exactly what to write, since writing without a clear plan only wastes time",
    "Stop and fix every error as it appears, since errors must be fixed during drafting",
    "drafting captures ideas; mark and move on"),
  // writing.editing-and-proofreading
  //   A: MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS
  //   B: MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR
  adultCard("eng.writing.editing-and-proofreading",
    "A writer reads her letter silently once and runs spell-check, then sends it, trusting both to catch every error. It says \"I will meet you hear at nine.\" Which statement is accurate?",
    "\"Hear\" for \"here\" is a real word, so spell-check misses it, and a quick silent read lets the brain auto-correct; several passes catch more",
    "The silent read caught everything, since reading silently once catches all errors",
    "Spell-check catches every error, so \"hear\" would have been flagged and the writer could safely send the letter once the tool had run",
    "tools and one silent read miss errors"),
  // writing.essay-structure
  //   A: MC-THE-CONCLUSION-JUST-REPEATS-THE-INTRODUCTION-WORD-FOR-WORD
  //   B: MC-THE-INTRODUCTION-JUST-ANNOUNCES-THE-TOPIC-THE-WAY-A-PARAGRAPHS-TOPIC-SENTEN
  adultCard("eng.writing.essay-structure",
    "An essay opens with \"This essay is about school start times\" and closes by repeating that sentence word for word. What revision follows the essay-structure discipline?",
    "Open with a specific, arguable thesis, such as that schools should start later because of what sleep research shows, and close by developing that thesis rather than repeating the opening",
    "Keep the conclusion as a word-for-word repeat, since a conclusion just repeats the introduction",
    "Keep the opening, since an introduction just announces the topic the way a topic sentence does",
    "thesis, not announcement; conclusion develops rather than repeats"),
  // writing.expository-writing
  //   A: MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC
  //   B: MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC
  adultCard("eng.writing.expository-writing",
    "A guide explaining how a bus pass works begins \"I think the pass is a fantastic deal\", then adds only the line \"A bus pass is a ticket valid for a month\" and gives no examples. Which statement is accurate?",
    "Expository writing explains with facts, definitions and examples, so the guide needs an objective explanation of how the pass is used, not opinion",
    "The definition alone is enough to explain how a bus pass works, so no examples or steps for using it are needed in the guide at all, since a clear definition says everything",
    "The opening opinion is right, since expository writing means stating your opinion about the topic",
    "expository explains objectively with examples"),
]
