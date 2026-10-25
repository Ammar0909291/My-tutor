/**
 * ENGLISH ADULT-BAND CARD-DEPTH — Batch 26 (20 cards, one per (concept, ADULT) pair). Why this exists, what a card is and the P-10 slot rule: see
 * `englishAdultCard.ts`. A new 3-option `fill_blank` card takes each pair from four gradeable probes to five; each wrong answer carries the id of one
 * of the concept's two registered misconceptions (A = first, B = second in `englishAdultMisconceptionIds.ts`). Option lengths are balanced (the correct
 * answer is the uniquely longest option in about a third of the cards, as chance would give), like the earlier card-depth batches.
 */
import type { SeedProbe } from './brainSeedAssets'
import { adultCard } from './englishAdultCard'

export const ENGLISH_CARD_DEPTH_BATCH_26: SeedProbe[] = [
  // composition.figurative-language-in-composition
  //   A: MC-A-FIGURATIVE-LANGUAGE-ONLY-BELONGS-IN-FICTION-OR-POETRY
  //   B: MC-B-ANY-FIGURATIVE-LANGUAGE-ADDED-IS-AUTOMATICALLY-GOOD-WRITING
  adultCard("eng.composition.figurative-language-in-composition",
    "An engineer explains why a cache speeds up a website: \"A cache is a shelf of frequently used tools kept at arm's reach, so the workshop does not walk to the warehouse for each one.\" What is the sound view of this sentence?",
    "It earns its place by making an abstract mechanism concrete for the reader, which is a clarity job even in expository writing",
    "It does not belong, because figurative language is only for fiction and poetry and expository writing should stay literal",
    "It is good simply because it is figurative, so adding two or three more unrelated comparisons to the paragraph would improve it further",
    "figurative language as a clarity tool in composition; more is not better"),
  // composition.logical-fallacies
  //   A: MC-A-IF-AN-ARGUMENTS-CONCLUSION-IS-TRUE-OR-AGREEABLE-THE-ARGUMENT-CANT-BE-FALL
  //   B: MC-B-EVERY-STRONG-DISAGREEMENT-OR-CRITICISM-OF-A-PERSON-IS-AN-AD-HOMINEM-FALLA
  adultCard("eng.composition.logical-fallacies",
    "A reviewer judges two arguments. (1) \"The bridge is safe, because the engineer who doubts it is a failure.\" The bridge is in fact safe. (2) \"Treat the forecast with caution, because the forecaster is paid a bonus if the deal closes.\" Which judgment is correct?",
    "Argument 1 is fallacious despite its true conclusion, as it attacks the doubter, not the claim; argument 2 names a relevant stake, so it is not automatically ad hominem",
    "Neither argument can be fallacious in the way described, because argument 1 has a conclusion that is true and so its reasoning must be sound, whatever it says about the doubter",
    "Both arguments are ad hominem, because any criticism of a person mentioned in an argument is that fallacy",
    "true conclusion does not repair weak support; criticizing a person is not automatically ad hominem"),
  // composition.persuasive-techniques
  //   A: MC-A-SOPHISTICATED-PERSUASION-MEANS-INCLUDING-EVERY-TECHNIQUE-SEPARATELY-IN-IT
  //   B: MC-B-A-COUNTERARGUMENT-SHOULD-ALWAYS-GO-AT-THE-VERY-END-REGARDLESS-OF-THE-ARGU
  adultCard("eng.composition.persuasive-techniques",
    "A pitch to a city council for a community garden is being drafted. Which structure shows sophisticated persuasion?",
    "Reinforce one point with evidence plus an emotionally resonant framing of that same evidence, and place the counterargument where the argument's structure calls for it",
    "Give ethos, pathos, logos and counterargument each its own separate section, so that every technique is present",
    "Weave the appeals into the points, but always put the counterargument in the final paragraph, whatever the structure of the argument, because that is its standard place",
    "integration over inventory; counterargument placement follows the argument"),
  // composition.plagiarism-and-citation-ethics
  //   A: MC-A-PLAGIARISM-IS-JUST-A-TECHNICAL-FORMATTING-RULE-NOT-A-REAL-ETHICAL-ISSUE
  //   B: MC-B-ANY-CITATION-MISTAKE-EVEN-A-MINOR-FORMATTING-ERROR-IS-EQUALLY-SERIOUS-AS-
  adultCard("eng.composition.plagiarism-and-citation-ethics",
    "Two cases: Dana pastes a page from an online article into her report and presents it as her own with no attribution. Sam cites an article honestly but puts the year in the wrong place in the reference. Which view is accurate?",
    "Dana's case is plagiarism, a false claim of authorship that harms the original author and trust; Sam's is a minor slip in a genuine attempt to credit the source",
    "Neither is an ethical issue, because plagiarism is just a technical formatting rule about how sources are listed, and a rule about listing sources has no real victim",
    "Both are equally serious plagiarism, since any citation mistake is as bad as deliberate copying",
    "plagiarism is misrepresenting authorship; intent and attribution attempt separate severity"),
  // composition.research-paper-writing
  //   A: MC-A-A-RESEARCH-PAPER-IS-A-SEQUENCE-OF-SOURCE-SUMMARIES
  //   B: MC-B-SYNTHESIZING-SOURCES-MEANS-ONLY-USING-SOURCES-THAT-AGREE
  adultCard("eng.composition.research-paper-writing",
    "A student writing on sleep and memory has found five studies, one of which found no effect. How should she organize and use them?",
    "Outline by sub-argument and, in each section, draw on the sources that bear on that point, including the study that disagrees",
    "Give each study its own section in turn, summarizing it fully, so the paper reads as a sequence of source summaries, one study after another",
    "Leave out the study that found no effect, since synthesizing sources means using only sources that agree",
    "synthesis by idea, not by source; disagreeing sources belong in the synthesis"),
  // composition.rhetorical-analysis
  //   A: MC-A-RHETORICAL-ANALYSIS-MEANS-LISTING-EVERY-DEVICE-FOUND
  //   B: MC-B-EVALUATING-EFFECTIVENESS-MEANS-STATING-WHETHER-YOU-AGREE-WITH-THE-ARGUMEN
  adultCard("eng.composition.rhetorical-analysis",
    "Asked to analyze the effectiveness of a union leader's speech that she disagrees with, a student drafts a thesis. Which is the best?",
    "The speech is effective for its audience of workers because its personal stories and plain repetition together build solidarity behind one demand",
    "The speech uses a story, repetition, a rhetorical question, a statistic and an analogy, and each of these devices is identified in turn below",
    "The speech is ineffective because I do not agree with its demand, and my own view of the demand is what makes a speech effective or not",
    "analysis claims how devices work together for purpose and audience; effectiveness is not agreement"),
  // composition.rhetorical-appeals
  //   A: MC-A-PATHOS-MEANS-JUST-BEING-EMOTIONAL-OR-DRAMATIC
  //   B: MC-B-LOGOS-MEANS-JUST-USING-NUMBERS-OR-STATISTICS
  adultCard("eng.composition.rhetorical-appeals",
    "A proposal asks the school board to fund a crossing guard at a busy corner. Which approach uses a genuine appeal rather than the surface of one?",
    "Tie a specific concern, a child stepping off the curb at that corner, to the claim that a guard is needed, and support it with explained evidence",
    "Open with dramatic, tragic wording that is not tied to the claim, since emotion on the page is what pathos means",
    "Quote several statistics about road deaths across the country with no explanation of how they bear on this corner, since logos just means using numbers",
    "pathos must connect a feeling to the claim; logos is reasoning, not numbers alone"),
  // composition.rhetorical-devices
  //   A: MC-A-NAMING-THE-DEVICE-IS-THE-SAME-AS-EXPLAINING-ITS-EFFECT
  //   B: MC-B-ANY-REPEATED-WORD-OR-BALANCED-PHRASE-IS-AUTOMATICALLY-A-DELIBERATE-DEVICE
  adultCard("eng.composition.rhetorical-devices",
    "An analysis of a commencement line, \"Not for fame, not for fortune, not for ourselves, but for those who follow\", is being checked. Which comment shows a complete analysis?",
    "The repeated \"not for\" builds a rhythm of what the speaker sets aside, so the final \"but for those who follow\" lands with emphasis",
    "The line uses repetition.",
    "The words \"for\" and \"the\" recur across the whole speech, so each of them is a deliberate rhetorical device.",
    "name the device and explain its effect in this passage; not every repeated word is a device"),
  // composition.style-voice-and-tone
  //   A: MC-A-STYLE-IS-JUST-USING-FANCY-OR-COMPLICATED-VOCABULARY
  //   B: MC-B-A-WRITERS-STYLE-SHOULD-STAY-EXACTLY-THE-SAME-ACROSS-EVERY-PIECE-THEY-WRIT
  adultCard("eng.composition.style-voice-and-tone",
    "A travel writer known for vivid, concrete detail is asked to draft a short, formal safety notice for a hostel. What is the best approach?",
    "Keep the habits readers recognize, such as concrete wording, and adjust the flexible surface, such as formality and humor, to the notice's audience",
    "Make the notice sound impressive with elaborate vocabulary, since strong style means fancy or complicated words",
    "Write the notice exactly as a travel article would be written, because a true style must stay the same in every piece and changing it would be inauthentic",
    "style has a recognizable core and a flexible surface; precision beats fanciness"),
  // grammar.adverbs
  //   A: MC-ADVERBS-ONLY-MODIFY-VERBS
  //   B: MC-ALL-ADVERBS-END-IN-LY
  adultCard("eng.grammar.adverbs",
    "Which statement about the adverbs in \"The new engine runs fast and is surprisingly quiet\" is correct?",
    "\"Fast\" is an adverb modifying \"runs\" even without -ly, and \"surprisingly\" is an adverb modifying the adjective \"quiet\"",
    "\"Surprisingly\" cannot be an adverb here, because it modifies the adjective \"quiet\" and adverbs only modify verbs",
    "\"Fast\" cannot be an adverb because it does not end in -ly, so it must be an adjective here",
    "adverbs are defined by what they modify, not by -ly"),
  // grammar.apostrophes
  //   A: MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLUR
  //   B: MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-
  adultCard("eng.grammar.apostrophes",
    "Choose the correct pair of phrases: the bags belonging to one passenger, and the two new suitcases at the carousel.",
    "\"the passenger's bags\" and \"two new suitcases\"",
    "\"the passenger's bags\" and \"two new suitcase's\", because an apostrophe goes before any s at the end of a word",
    "\"the passengers' bags\" for one passenger and \"two new suitcases\", because a possessive apostrophe always goes in the same place",
    "possession and contraction only; singular and plural possessives differ"),
  // grammar.clauses
  //   A: MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE
  //   B: MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY
  adultCard("eng.grammar.clauses",
    "In \"Although the printer jammed, the staff finished the forms, and the manager signed them\", how many clauses are there, and of what kinds?",
    "Three: \"Although the printer jammed\" is dependent, and the other two are independent, each with its own subject and verb",
    "Two: \"Although the printer jammed\" is not a real clause, because a word like \"although\" means there is no clause",
    "One: an independent clause can only be a whole simple sentence, so only one of them counts as an independent clause",
    "a dependent clause still has a subject and verb; a sentence can hold several independent clauses"),
  // grammar.colons-semicolons-dashes
  //   A: MC-A-A-COLON-CAN-BE-USED-AFTER-ANY-INTRODUCTORY-PHRASE-EVEN-IF-WHAT-COMES-BEFO
  //   B: MC-B-SEMICOLONS-AND-COMMAS-DO-THE-SAME-JOB-AND-CAN-BE-USED-INTERCHANGEABLY
  adultCard("eng.grammar.colons-semicolons-dashes",
    "A cook edits two sentences: \"The recipe needs: flour, eggs and milk.\" and \"The oven was hot, the dough was ready.\" Which pair of edits is correct?",
    "Remove the colon after \"needs\", and join the two clauses with a semicolon (or a comma plus \"and\")",
    "Keep the colon after \"needs\", since a colon can follow any introductory phrase",
    "Leave the comma between the two clauses, since a comma and a semicolon do the same job and can be swapped",
    "a colon follows a complete clause; a comma alone cannot join clauses"),
  // grammar.comma-usage
  //   A: MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA
  //   B: MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING
  adultCard("eng.grammar.comma-usage",
    "Which sentence has its commas placed correctly?",
    "After the storm passed, the crew packed the van and left before dawn.",
    "After the storm passed the crew packed the van, and left before dawn, because a comma belongs before every \"and\" joining two ideas.",
    "After the storm passed the crew packed the van and left before dawn, because a comma is only needed where you pause when speaking.",
    "a comma ends an introductory clause; none before \"and\" when it joins two verbs"),
  // grammar.complex-sentences
  //   A: MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND
  //   B: MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST
  adultCard("eng.grammar.complex-sentences",
    "Which description of \"The crew finished the roof before the rain started\" is correct?",
    "A complex sentence: one independent clause plus a dependent clause beginning with \"before\", which can follow the main clause",
    "A compound sentence, because \"before\" joins two clauses just as \"and\" or \"but\" would",
    "Not a complex sentence, because its dependent clause comes second and a dependent clause must always come first",
    "complex means one independent clause and a dependent clause, in either order"),
  // grammar.compound-sentences
  //   A: MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS
  //   B: MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE
  adultCard("eng.grammar.compound-sentences",
    "Which sentence is a correctly punctuated compound sentence?",
    "\"The vendor sent the invoice; the client paid it the next day.\" Two independent clauses joined by a semicolon.",
    "\"The vendor sent the invoice, the client paid it the next day.\" A comma works as a joiner just as a semicolon does.",
    "\"The vendor sent and paid the invoice.\" It is compound, because it contains the conjunction \"and\".",
    "two independent clauses; a comma alone is not a joiner; a conjunction alone does not make compound"),
  // grammar.conditionals
  //   A: MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE
  //   B: MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME
  adultCard("eng.grammar.conditionals",
    "A manager says, \"If the budget were bigger, we would hire two analysts.\" What does the sentence express?",
    "A second conditional: an unreal or unlikely present situation, where the past form \"were\" does not mean past time",
    "The same structure as \"If the budget grows, we will hire two analysts\", since all conditionals work the same way",
    "A statement about last year, because the past-tense \"were\" means the situation is in the past",
    "four distinct conditional types; second conditional past tense signals unreality"),
  // grammar.end-punctuation
  //   A: MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK
  //   B: MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL
  adultCard("eng.grammar.end-punctuation",
    "Which ending is correct for \"When the shipment arrives remains a mystery\", and for \"I cannot believe we won the contract\" said with delighted surprise?",
    "A period after the first, as it is a statement; an exclamation point for the second, as it carries strong feeling, not volume",
    "A question mark after the first, because it begins with a wh-word",
    "A period after the second, because the sentence is not loud and an exclamation point only marks loudness, so strong feeling does not count",
    "end punctuation follows function, not a wh-word or volume"),
  // grammar.parallel-structure
  //   A: MC-A-PARALLEL-STRUCTURE-ONLY-APPLIES-TO-SIMPLE-LISTS-OF-SINGLE-WORDS
  //   B: MC-B-FIXING-A-PARALLEL-STRUCTURE-ERROR-JUST-MEANS-MAKING-THE-ITEMS-SOUND-SIMIL
  adultCard("eng.grammar.parallel-structure",
    "Which revision fixes \"The policy aims to cut waste, improving safety, and for staff to be happier\"?",
    "The policy aims to cut waste, improve safety, and make staff happier.",
    "Leave it as it is, because parallel structure only applies to simple lists of single words, not to longer phrases like these.",
    "The policy aims to cut waste, to improving safety, and to happier staff, because adding the same word to each item makes them sound alike.",
    "parallel form at phrase level; matching sound is not matching grammatical form"),
  // grammar.participles-and-participial-phrases
  //   A: MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR
  //   B: MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN
  adultCard("eng.grammar.participles-and-participial-phrases",
    "A report says \"Driving to the site, the bridge came into view.\" Which comment is correct?",
    "The phrase dangles, since a bridge does not drive; the subject must be the driver, as in \"Driving to the site, we saw the bridge\"",
    "It is fine as written, because the meaning is clear enough from context, so readers will supply the missing driver and no rewrite is needed",
    "\"Driving\" here is a gerund, so the phrase names an activity and cannot modify anything",
    "a participial phrase must modify the right noun; participle is not a gerund"),
]
