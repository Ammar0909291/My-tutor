/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 28 (9 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_28: SeedProbe[] = [
  // grammar.tense-consistency
  //   A: MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY
  //   B: MC-NARRATIVE-TENSE-CANT-BE-PRESENT
  adultCard("eng.grammar.tense-consistency",
    "A story reads: \"Marta opens the door and hears a noise. The noise had started an hour earlier.\" Which comment on tense consistency is correct?",
    "It is consistent: present tense can narrate a story, and \"had started\" is a motivated shift to an earlier time",
    "It is inconsistent, because all verbs in a passage must match exactly, so \"had started\" must become \"starts\" to fit the rest",
    "It is inconsistent from the first sentence, because a narrative cannot be told in the present tense",
    "consistency follows real time relationships; narrative can be present tense"),
  // grammar.verbs
  //   A: MC-HELPING-VERBS-ARE-NOT-REAL-VERBS
  //   B: MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS
  adultCard("eng.grammar.verbs",
    "In \"The committee has been considering the offer, and the members seem uneasy\", which statement is correct?",
    "\"Has been considering\" is one verb phrase with its helping verbs, and \"seem\" is a verb though nothing physical happens",
    "\"Considering\" is the only verb in the first clause, because helping verbs like \"has been\" are not real verbs and so do not count as verbs",
    "\"Seem\" is not a verb, because verbs are only physical actions",
    "helping verbs are part of the verb; verbs include states"),
  // grammar.word-classes-overview
  //   A: MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE
  //   B: MC-WORD-CLASS-IS-FIXED-PER-WORD
  adultCard("eng.grammar.word-classes-overview",
    "In \"The light was too bright, so she asked him to light the candle\", what is true of the word \"light\"?",
    "It is a noun in the first clause and a verb in the second: its class is decided by its job in each sentence",
    "It is the same class both times, because both uses refer to light and meaning alone decides the class",
    "It is only a noun, because each word has one fixed class",
    "word class is function in a sentence"),
  // linguistics.applied-linguistics-intro
  //   A: MC-A-ANY-LANGUAGE-TEACHING-METHOD-THAT-FEELS-TRADITIONAL-OR-FAMILIAR-MUST-BE-E
  //   B: MC-B-A-STANDARDIZED-LANGUAGE-TEST-THAT-USES-ONE-DIALECT-IS-A-NEUTRAL-FAIR-MEAS
  adultCard("eng.linguistics.applied-linguistics-intro",
    "A school district plans its English-language program and its entry test. Which plan reflects applied-linguistics thinking?",
    "Choose methods by acquisition-research findings such as meaningful input and communicative practice, and check that the test does not penalize legitimate features of other dialects",
    "Keep the long-standing method because it feels familiar and traditional, which shows it is effective",
    "Use a test based on one standard dialect, because a single-dialect test is a neutral, fair measure of language skill",
    "familiarity does not certify effectiveness; single-dialect tests are not neutral"),
  // linguistics.bilingualism-and-multilingualism
  //   A: MC-A-A-TRUE-BILINGUAL-MUST-HAVE-EQUAL-NATIVE-LIKE-FLUENCY-IN-BOTH-LANGUAGES-SE
  //   B: MC-B-A-BILINGUAL-CHILD-MIXING-TWO-LANGUAGES-IN-ONE-SENTENCE-IS-CONFUSED-OR-DEL
  adultCard("eng.linguistics.bilingualism-and-multilingualism",
    "A bilingual teenager speaks Spanish at home and English at school, and sometimes mixes both in one sentence with friends. What does the research view say?",
    "Her strengths differ by domain, a normal bilingual pattern, and mixing languages in a sentence is skilled, not confused",
    "She is not truly bilingual unless she has equal, native-like fluency in both languages for every topic and setting she uses",
    "The mixing shows she is confused about which language she is speaking",
    "domain-specific fluency; code-mixing is not confusion"),
  // linguistics.computational-linguistics-intro
  //   A: MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAN
  //   B: MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALL
  adultCard("eng.linguistics.computational-linguistics-intro",
    "A writing assistant produces polished, fluent paragraphs but sometimes states a false fact. What is the best interpretation?",
    "Fluency reflects patterns learned from text, not human-like understanding of meaning, and such systems have real limits, for example in working out what a pronoun refers to",
    "Fluent, grammatical output shows that it must understand the meaning the way a human does",
    "Computational language systems handle every aspect of language equally well, so the false fact must be a one-off slip",
    "fluency is not understanding; systems have limits"),
  // linguistics.corpus-linguistics-intro
  //   A: MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE
  //   B: MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICA
  adultCard("eng.linguistics.corpus-linguistics-intro",
    "A writer believes a phrase is extremely common in edited writing, but a large corpus shows it appears rarely. Elsewhere, another construction is rare in the corpus yet used by careful writers. Which conclusion is sound?",
    "The corpus is better evidence of frequency than intuition, and rarity in a corpus does not make a construction ungrammatical",
    "The writer's intuition about how often a phrase is used is just as reliable as large-scale corpus counts, so the data adds nothing",
    "Anything rare in the corpus must be ungrammatical",
    "corpus frequency vs intuition; frequency is not grammaticality"),
  // linguistics.dialectology
  //   A: MC-A-DIALECT-BOUNDARIES-ARE-SHARP-LINES-WHERE-EVERYONE-ON-ONE-SIDE-SPEAKS-ONE-
  //   B: MC-B-A-DIALECT-IS-ONE-SINGLE-UNIFIED-THING-EVERYONE-IN-A-REGION-EITHER-HAS-OR-
  adultCard("eng.linguistics.dialectology",
    "A map shows three features of speech across a region (a word for a soft drink, a vowel, a grammatical construction), each with its own boundary line. What does it show?",
    "The boundaries are gradual and do not coincide, and speakers within a named dialect vary in which features they use",
    "Dialects are separated by one sharp line, with everyone on one side speaking one way and everyone on the other speaking differently",
    "The named dialect is a single unified thing that every resident either fully has or does not have",
    "isoglosses do not align; a dialect is not monolithic"),
  // linguistics.discourse-analysis-intro
  //   A: MC-A-A-TEXT-WITH-LOTS-OF-COHESIVE-DEVICES-LIKE-PRONOUNS-AND-CONJUNCTIONS-IS-AU
  //   B: MC-B-CONVERSATIONAL-TURN-TAKING-JUST-HAPPENS-RANDOMLY-WITH-NO-UNDERLYING-STRUC
  adultCard("eng.linguistics.discourse-analysis-intro",
    "Analyzing a recorded service call, a student notes that \"it\", \"this\" and \"however\" recur often and that the two speakers swap turns in a regular pattern with few overlaps. Which conclusion is sound?",
    "Frequent cohesive devices do not guarantee coherence, so check what they refer to; regular turn-taking shows structure",
    "The many cohesive devices make the text automatically coherent, so there is no need to check what \"it\" or \"this\" refer to",
    "The way the speakers take turns just happens randomly, with no underlying structure",
    "cohesion is not coherence; turn-taking is structured"),
]
