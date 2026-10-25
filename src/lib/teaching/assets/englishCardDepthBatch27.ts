/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 27 (10 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_27: SeedProbe[] = [
  // grammar.phrases
  //   A: MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS
  //   B: MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING
  adultCard("eng.grammar.phrases",
    "Which of these is a genuine grammatical phrase?",
    "\"the old wooden gate\", a noun phrase: related words working together as one unit around the head noun \"gate\"",
    "\"gate the wooden old\", because a phrase is just any group of words",
    "\"when the old gate closed\", because a phrase and a clause are the same thing",
    "a phrase works as one unit around a head word; a phrase is not a clause"),
  // grammar.pronoun-antecedent-agreement
  //   A: MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR
  //   B: MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL
  adultCard("eng.grammar.pronoun-antecedent-agreement",
    "A notice reads \"Everybody are welcome, and the host told the guide that she would start.\" Which correction handles both problems?",
    "\"Everybody is welcome\" (indefinite pronouns are singular), and name who \"she\" is: the host told the guide, \"I will start.\"",
    "Keep \"she\" as it is, because an ambiguous pronoun reference is fine if the context seems clear, and readers can sort it out",
    "Keep \"everybody are\", because an indefinite pronoun refers to a group and is always plural",
    "indefinite pronouns are singular; ambiguous reference needs a clear antecedent"),
  // grammar.pronouns
  //   A: MC-PRONOUNS-ONLY-REPLACE-PEOPLE
  //   B: MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS
  adultCard("eng.grammar.pronouns",
    "In \"The printer jammed, so the technician fixed it, and she cut herself on the tray\", what do the pronouns \"it\" and \"herself\" do?",
    "\"It\" replaces \"the printer\", a thing; \"herself\" refers back to the technician, so it does real grammatical work",
    "\"It\" must be an error, because pronouns replace only people, and a printer is not a person",
    "\"Herself\" only adds emphasis, so it could be dropped from \"she cut herself on the tray\" without changing the meaning of the sentence",
    "pronouns replace any noun; a reflexive pronoun can be required"),
  // grammar.quotation-marks
  //   A: MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO
  //   B: MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERI
  adultCard("eng.grammar.quotation-marks",
    "Which sentence is punctuated correctly in American English?",
    "The pilot said, \"We will land soon.\"",
    "The pilot said, \"that we would land soon.\"",
    "The pilot said, \"We will land soon\".",
    "quotation marks only for exact words; the period goes inside the closing mark"),
  // grammar.run-on-sentences-and-comma-splices
  //   A: MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A
  //   B: MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPA
  adultCard("eng.grammar.run-on-sentences-and-comma-splices",
    "Which statement about fixing \"The shipment arrived, the clerk logged it\" is correct?",
    "It is a comma splice; fix it with a semicolon, a comma plus \"and\", or two sentences",
    "It is already a correct compound sentence, because a comma is a valid joiner on its own",
    "It is a comma splice, and the only possible fix is to split it into two separate sentences",
    "comma splice is an error; several fixes exist"),
  // grammar.sentence-combining
  //   A: MC-A-COMBINING-SENTENCES-JUST-MEANS-ADDING-AND-BETWEEN-THEM
  //   B: MC-B-A-LONGER-COMBINED-SENTENCE-IS-ALWAYS-BETTER-THAN-SEVERAL-SHORT-ONES
  adultCard("eng.grammar.sentence-combining",
    "Two sentences, \"The road flooded.\" and \"The convoy turned back.\", are to be combined to show the cause. Which choice states the principle best?",
    "\"Because the road flooded, the convoy turned back\": the connector states the relationship; short sentences can stay apart",
    "\"The road flooded and the convoy turned back\": \"and\" is the right connector for any two ideas",
    "Join every sentence in the report into one long sentence, because a longer combined sentence is always better than several short ones",
    "connector must show the relationship; longer is not always better"),
  // grammar.sentence-fragments
  //   A: MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A
  //   B: MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-G
  adultCard("eng.grammar.sentence-fragments",
    "Which statement about \"While the inspector checked the wiring.\" is correct?",
    "It is a fragment: \"while\" makes a dependent clause even with a subject and verb, so attach it to a main clause or rewrite it",
    "It is a complete sentence, because it has a subject and a verb",
    "It is a fragment, and the only fix is to keep adding words to the fragment itself, never to join it to a neighbouring clause",
    "subject and verb are not sufficient; fixes include joining to a main clause"),
  // grammar.sentence-types-by-function
  //   A: MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE
  //   B: MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD
  adultCard("eng.grammar.sentence-types-by-function",
    "Which statement about \"Please close the door.\" and \"Could you close the door?\" is correct?",
    "The first is imperative and the second interrogative: function sets the type, and a question need not begin with a question word",
    "The first is declarative, because it ends in a period and the punctuation mark alone defines the sentence type, whatever the sentence does",
    "The second is not a question, because questions always begin with a question word",
    "sentence type is function, not punctuation or opening word"),
  // grammar.simple-sentences
  //   A: MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE
  //   B: MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE
  adultCard("eng.grammar.simple-sentences",
    "Is \"The tired volunteers from three nearby towns cleaned and repainted the entire hall before dawn\" a simple sentence?",
    "Yes: one independent clause and no dependent clause; the compound predicate and the length do not change that",
    "No, because it contains \"and\", and a sentence with \"and\" is never simple, even when it has only one subject and one clause",
    "No, because it is long, and a simple sentence has to be short, with only a few words in it",
    "simple means one independent clause, no dependent clause"),
  // grammar.subject-and-predicate
  //   A: MC-PREDICATE-IS-JUST-THE-VERB
  //   B: MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD
  adultCard("eng.grammar.subject-and-predicate",
    "In \"Down the hallway rushed the nurse with the tray\", what are the subject and the predicate?",
    "The subject is \"the nurse with the tray\"; the predicate is all that tells what she does: \"rushed down the hallway\"",
    "The subject is \"the nurse with the tray\", and the predicate is just the verb \"rushed\", so \"down the hallway\" belongs to neither",
    "The subject is \"Down\", because the subject is always the first word",
    "subject is who or what, not the first word; predicate is more than the verb"),
]
