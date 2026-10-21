/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 39 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_39: SeedProbe[] = [
  // vocab.context-clues
  //   A: MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY
  //   B: MC-GUESS-FROM-ONE-WORD-NEARBY
  adultCard("eng.vocab.context-clues",
    "A reader meets \"The lugubrious clerk sat alone, and the room fell silent after his sad reply.\" She decides from the single word \"alone\" that \"lugubrious\" means \"lonely\" and treats her guess as certain. What is sound?",
    "Weigh all the clues together (\"alone\", \"silent\", \"sad reply\") to infer something like \"gloomy\", and treat it as probable until checked",
    "Treat her guess as certain, because context clues always give certainty",
    "Settle on \"lonely\" from the one nearby word \"alone\" and ignore the other clues, since a single close word is the best guide to what an unfamiliar word means in a sentence",
    "weigh the whole evidence; inference is not certainty"),
  // vocab.etymology
  //   A: MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY
  //   B: MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING
  adultCard("eng.vocab.etymology",
    "A writer insists \"awful\" can only mean \"full of awe\" because that is what it originally meant, and assumes \"algebra\" must come from one single clear ancestor language. Which statement is accurate?",
    "A word's origin does not fix its meaning today, since language changes; and many words, such as \"algebra\", passed through several languages",
    "\"Awful\" can only mean \"full of awe\", because a word's original meaning is its true meaning today and later senses such as \"terrible\" are simply mistakes",
    "\"Algebra\" must come from one single clear ancestor language with no borrowing",
    "current meaning rules; words are often borrowed"),
  // vocab.homonyms-homophones
  //   A: MC-CONTEXT-DOESNT-MATTER-FOR-THESE-WORDS
  //   B: MC-HOMONYM-AND-HOMOPHONE-ARE-THE-SAME-THING
  adultCard("eng.vocab.homonyms-homophones",
    "A trainee says \"bank\" (of a river) and \"bank\" (for money) are homophones, that \"two\" and \"too\" are homonyms, and that context does not matter when choosing between such words. Which statement is accurate?",
    "The two \"bank\" words are homonyms (same spelling); \"two\" and \"too\" are homophones (same sound); and context decides which meaning fits",
    "Context does not matter for these words, so any of them can go in any gap in a sentence, since the meaning of each word is the same everywhere",
    "Homonyms and homophones are the same thing, so both labels fit both pairs",
    "homonym is same spelling; homophone is same sound; context decides"),
  // vocab.idioms
  //   A: MC-A-YOU-CAN-FIGURE-OUT-AN-IDIOMS-MEANING-BY-TRANSLATING-EACH-WORD-LITERALLY
  //   B: MC-B-YOU-CAN-FREELY-CHANGE-WORDS-WITHIN-AN-IDIOM-AS-LONG-AS-THE-MEANING-STAYS-
  adultCard("eng.vocab.idioms",
    "A learner hears that a plan has \"gone down the drain\" and reads it as water in a plumbing system, and later writes \"gone down the sink\" to say a plan failed. Which statement is accurate?",
    "\"Gone down the drain\" is a fixed expression whose meaning, wasted or lost, is learned as a unit; changing a word breaks it",
    "The meaning can be worked out by translating each word literally, so the plumbing reading is right",
    "Changing \"drain\" to \"sink\" is fine, since words in an idiom can be swapped if the meaning stays similar to the original idiom",
    "idioms are fixed units, not word-by-word"),
  // vocab.multiple-meaning-words
  //   A: MC-DICTIONARY-LISTS-MEANINGS-IN-IMPORTANCE-ORDER
  //   B: MC-MULTIPLE-MEANING-WORDS-ARE-JUST-HOMONYMS
  adultCard("eng.vocab.multiple-meaning-words",
    "A reader takes the first-listed dictionary sense of \"bright\" in \"a bright student\" and says \"bright\" (shining) and \"bright\" (clever) are just homonyms. Which statement is accurate?",
    "Choose the sense that fits the context rather than the first listed, and the two senses of \"bright\" are related meanings of one word through a shared idea of clarity, not unrelated homonyms",
    "The first-listed sense is the most important one, since dictionaries list meanings in order of importance",
    "The two senses are just homonyms, since multiple-meaning words are the same as homonyms",
    "context picks the sense; polysemy is not homonymy"),
  // vocab.phrasal-verbs
  //   A: MC-A-A-PHRASAL-VERBS-MEANING-CAN-USUALLY-BE-FIGURED-OUT-FROM-THE-VERB-AND-PART
  //   B: MC-B-YOU-CAN-ALWAYS-PLACE-THE-OBJECT-EITHER-BETWEEN-THE-VERB-AND-PARTICLE-OR-A
  adultCard("eng.vocab.phrasal-verbs",
    "A learner reads \"They turned down the offer\" as physically turning something downward, and writes \"They looked the children after\" because the object can always go between the verb and the particle. Which statement is accurate?",
    "\"Turned down\" means \"refused\", a unit learned as a whole; \"look after\" cannot be split by its object, so it is \"look after the children\"",
    "\"Turned down\" can be worked out from \"turned\" and \"down\", so it means turned downward",
    "\"Looked the children after\" is fine, because the object can always go either between the verb and particle or after both, in any phrasal verb",
    "phrasal verbs are units; object placement varies by verb"),
  // vocab.register-and-formality
  //   A: MC-FORMAL-ALWAYS-MEANS-BETTER-OR-MORE-CORRECT
  //   B: MC-INFORMAL-REGISTER-MEANS-BAD-GRAMMAR-OR-SLOPPY-WRITING
  adultCard("eng.vocab.register-and-formality",
    "A colleague answers a teammate's quick chat message \"Done, thanks!\" with \"Your informal register is sloppy; please use formal language\", adding that formal English is always more correct. Which statement is accurate?",
    "Register is about fit to context: a brief informal reply suits a team chat and is not sloppy, and formal English is only suited to other occasions",
    "The colleague is right that formal English is always better or more correct",
    "The reply is sloppy, because informal register means bad grammar or careless writing, and even a quick chat message should be written in formal, careful English",
    "register is context fit; informal is not sloppy"),
  // vocab.roots-and-origins
  //   A: MC-A-ROOT-ALWAYS-KEEPS-THE-EXACT-SAME-MEANING-IN-EVERY-WORD
  //   B: MC-IF-A-WORD-LOOKS-LIKE-IT-HAS-A-ROOT-IT-MUST-BE-THAT-ROOT
  adultCard("eng.vocab.roots-and-origins",
    "A learner says the root \"ped\" (foot) in \"pedestrian\" and \"pedal\" must also be in \"pedant\" because the letters match, and that a root keeps exactly the same meaning in every word that has it. Which statement is accurate?",
    "\"Ped\" meaning foot is a genuine root in \"pedestrian\" and \"pedal\", but \"pedant\" only looks as if it has it; a root's meaning can shift over time",
    "A root always keeps exactly the same meaning in every word it appears in",
    "\"Pedant\" must contain the root for \"foot\", since a word that looks like it has a root must have it, and this one has the same first three letters, \"ped\"",
    "roots build word families; look-alikes can mislead"),
  // vocab.semantic-fields
  //   A: MC-A-A-SEMANTIC-FIELD-IS-JUST-A-LIST-OF-SYNONYMS-FOR-ONE-WORD
  //   B: MC-B-ANY-WORDS-THAT-OFTEN-APPEAR-TOGETHER-IN-THE-SAME-CONTEXT-BELONG-TO-THE-SA
  adultCard("eng.vocab.semantic-fields",
    "A learner groups \"rain\", \"snow\", \"hail\" and \"drizzle\" but says they are not a semantic field because they are not synonyms, and then adds \"umbrella\" because it often appears near rain words. Which statement is accurate?",
    "The four weather words form a semantic field: distinct words from one conceptual domain, not synonyms; \"umbrella\" is not added just because it often appears with them",
    "They are not a semantic field, because a semantic field is just a list of synonyms for one word",
    "\"Umbrella\" belongs in the field, because any words that often appear together in the same context belong to the same semantic field, so it joins the four weather words",
    "field is a conceptual domain; not synonyms, not co-occurrence"),
  // vocab.suffixes
  //   A: MC-SUFFIX-SPELLING-CHANGES-ARE-RANDOM
  //   B: MC-SUFFIXES-ONLY-CHANGE-MEANING-NOT-WORD-CLASS
  adultCard("eng.vocab.suffixes",
    "A trainee forms \"hoping\" from \"hope\" and \"modernize\" from \"modern\", says the dropped \"e\" in \"hoping\" is a random exception, and says suffixes like \"-ize\" only add a shade of meaning. Which statement is accurate?",
    "The dropped \"e\" follows a spelling pattern before a vowel suffix, and \"-ize\" changes the word class: adjective \"modern\" becomes verb \"modernize\"",
    "The dropped \"e\" in \"hoping\" is a random exception, since suffix spelling changes are random and follow no pattern that a learner could use to spell other words",
    "\"-ize\" only adds a shade of meaning, since suffixes change meaning but not word class",
    "suffix spelling patterns; suffixes change word class"),
]
