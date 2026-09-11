/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 7.
 *
 * Continues Batches 1-6 (60 concepts) per the standing instruction to finish
 * all English concepts against the TRUE-gap list `englishAdultBandAudit.ts`
 * computes.
 *
 * 10 concepts (6 grammar/punctuation + 4 reading, all MIDDLE-native,
 * continuing in KG order): eng.grammar.end-punctuation,
 * eng.grammar.comma-usage, eng.grammar.apostrophes,
 * eng.grammar.quotation-marks, eng.grammar.sentence-fragments,
 * eng.grammar.run-on-sentences-and-comma-splices,
 * eng.reading.print-to-meaning, eng.reading.reading-fluency,
 * eng.reading.literal-comprehension, eng.reading.main-idea-and-details.
 * 30 new ADULT-band closed-choice probes (3/concept), same
 * mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/mcq(PROFICIENT) ladder
 * as Batches 1-6, reusing each concept's own two already-registered,
 * already-ACTIVE misconceptions (every registry checked, confirmed exactly
 * 2) via genuinely different adult-context examples (workplace writing,
 * professional correspondence, reading a report/memo) than each concept's
 * native-band probes use.
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

const END_PUNCT_ADULT = adultLadder(
  'eng.grammar.end-punctuation', 'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK', 'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL',
  [
    {
      stem: 'In a memo, "What the client decided remains unclear" starts with "What" — does that mean it needs a question mark at the end?',
      correct: 'No — this is a statement using "what" as part of a noun clause, not a question; it correctly ends with a period, not a question mark',
      wrong: 'Yes — any sentence beginning with a wh-word like "what," "who," or "why" always needs a question mark',
    },
    {
      stem: 'In an email, "We finally closed the deal!" ends with an exclamation point. Does this only mean the writer typed it loudly, rather than expressing genuine excitement?',
      correct: 'No — an exclamation point signals strong emotion or emphasis (excitement, urgency, surprise), not merely "loud" typing; it is an emotional-tone marker',
      wrong: 'Yes — an exclamation point simply indicates the sentence is being said loudly, with no emotional meaning',
    },
    {
      stem: 'In a report, "Why the project stalled is still under investigation" starts with "Why" — does that mean it needs a question mark?',
      correct: 'No — this is a statement (a noun clause built on "why"), not a direct question; it correctly ends with a period',
      wrong: 'Yes — starting with a wh-word like "why" always requires a question mark at the end',
    },
  ],
  [
    'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK, adult workplace framing with a memo\'s "What the client decided..." rather than the existing everyday-sentence examples',
    'MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL, re-asked with a deal-closing email rather than the existing toy examples',
    'MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK, a second fresh example (a report\'s "Why the project stalled...") forming the ladder\'s third rung',
  ],
)

const COMMA_USAGE_ADULT = adultLadder(
  'eng.grammar.comma-usage', 'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA', 'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING',
  [
    {
      stem: 'In "The manager reviewed the report and approved it" (one subject, two verbs joined by "and"), does this need a comma before "and," the same as two full independent clauses would?',
      correct: 'No — a comma before "and" is needed only when joining two independent clauses; here "and" joins two verbs sharing one subject, so no comma is needed',
      wrong: 'Yes — any two things joined by "and" always need a comma before it',
    },
    {
      stem: 'In a formal report reading aloud, if a speaker pauses briefly after "In my opinion the deadline is unrealistic," does that spoken pause tell you where the written comma should go?',
      correct: 'No — comma placement follows grammatical rules (e.g., after an introductory phrase: "In my opinion, the deadline is unrealistic"), not wherever a speaker happens to pause; pause-based comma placement is unreliable',
      wrong: 'Yes — you should place a comma wherever you naturally pause when reading the sentence aloud',
    },
    {
      stem: 'In "The team analyzed the data and presented the findings" (one subject, two verbs), does this need a comma before "and"?',
      correct: 'No — since "and" here joins two verbs sharing the same subject "The team," not two independent clauses, no comma is needed before it',
      wrong: 'Yes — a comma is always required before "and" whenever it connects two actions',
    },
  ],
  [
    'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA, adult workplace framing with "reviewed the report and approved it" rather than the existing everyday-sentence examples',
    'MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING, re-asked with a formal-report-reading example rather than the existing toy examples',
    'MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA, a second fresh example ("analyzed the data and presented the findings") forming the ladder\'s third rung',
  ],
)

const APOSTROPHES_ADULT = adultLadder(
  'eng.grammar.apostrophes', 'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS', 'MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL',
  [
    {
      stem: 'In a memo listing "three new employee\'s joined this month," is the apostrophe in "employee\'s" correctly placed, given that this is simply describing multiple employees (a plain plural), not showing possession?',
      correct: 'No — this is a simple plural ("three new employees joined"), which never takes an apostrophe; the apostrophe here is a genuine error, not a possessive',
      wrong: 'Yes — adding an apostrophe before the "s" is correct whenever a word ends in "s," including plain plurals',
    },
    {
      stem: 'In "the managers\' decision" (plural possessive, multiple managers) vs. "the manager\'s decision" (singular possessive, one manager), does the apostrophe go in the same place for both?',
      correct: 'No — the singular possessive places the apostrophe before the "s" ("manager\'s"), while the plural possessive (for a word already ending in "s") places it after the "s" ("managers\'"); placement depends on singular vs. plural',
      wrong: 'Yes — possessive apostrophes always go in the identical position, whether the noun is singular or plural',
    },
    {
      stem: 'In a report noting "the two department\'s budgets were cut," is the apostrophe in "department\'s" correctly placed for describing two departments\' shared budgets?',
      correct: 'No — for a plural possessive ("two departments\'"), the apostrophe goes AFTER the final "s" ("departments\' budgets"), not before it as written',
      wrong: 'Yes — the apostrophe placement stays the same regardless of whether one or multiple departments are meant',
    },
  ],
  [
    'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS, adult workplace framing with a memo\'s "employee\'s joined" rather than the existing everyday-sentence examples',
    'MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL, re-asked with "managers\'" vs. "manager\'s" rather than the existing toy examples',
    'MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS, a second fresh example (a report\'s "two department\'s budgets") forming the ladder\'s third rung',
  ],
)

const QUOTATION_MARKS_ADULT = adultLadder(
  'eng.grammar.quotation-marks', 'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO', 'MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE',
  [
    {
      stem: 'In a meeting summary, "The manager said that the project was on schedule" reports what was said WITHOUT the exact original words. Does this indirect report still need quotation marks around "the project was on schedule"?',
      correct: 'No — indirect/reported speech (not the exact original words) does not take quotation marks; only DIRECT quotations of someone\'s exact words are enclosed in quotation marks',
      wrong: 'Yes — quotation marks should be used around any report of what someone said, direct or indirect',
    },
    {
      stem: 'In American English, does the comma go OUTSIDE the closing quotation mark in \'She said, "I will finish it today", and left the room\'?',
      correct: 'No — in standard American English, commas and periods go INSIDE the closing quotation mark: \'She said, "I will finish it today," and left the room\'',
      wrong: 'Yes — in American English, commas and end punctuation always go outside the closing quotation mark',
    },
    {
      stem: 'In a report, "The client mentioned that the delivery would be delayed" reports what was said without exact original wording. Does this indirect report need quotation marks?',
      correct: 'No — since this paraphrases rather than quotes exact words, no quotation marks are needed; quotation marks are reserved for direct quotations',
      wrong: 'Yes — any report of what someone said should be enclosed in quotation marks, whether paraphrased or exact',
    },
  ],
  [
    'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO, adult workplace framing with a meeting summary rather than the existing everyday-sentence examples',
    'MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE, re-asked with a formal quoted statement rather than the existing toy examples',
    'MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO, a second fresh example (a client-delivery report) forming the ladder\'s third rung',
  ],
)

const SENTENCE_FRAGMENTS_ADULT = adultLadder(
  'eng.grammar.sentence-fragments', 'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT', 'MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP',
  [
    {
      stem: 'In a report draft, "Because the client requested changes to the proposal" contains a subject ("client") and a verb ("requested"). Is this a complete sentence?',
      correct: 'No — even though it has a subject and verb, "Because" makes this a dependent clause that cannot stand alone; it is a fragment, not a complete sentence',
      wrong: 'Yes — having a subject and a verb somewhere in the group of words is enough to make it a complete sentence',
    },
    {
      stem: 'To fix the fragment "Which delayed the entire schedule," is the ONLY way to fix it adding more words to that same standalone group (e.g., "Which thing delayed the entire schedule happened yesterday")?',
      correct: 'No — a common, often better fix is attaching the fragment to a nearby independent clause ("The vendor missed the deadline, which delayed the entire schedule"), not just padding the fragment itself with more words',
      wrong: 'Yes — fixing a fragment always means adding more words to that same isolated group until it works alone',
    },
    {
      stem: 'In "Although the budget was approved last week" (subject "budget," verb "was approved"), is this a complete sentence?',
      correct: 'No — "Although" makes this a dependent clause that cannot stand alone as a sentence, despite having a subject and verb; it is a fragment',
      wrong: 'Yes — since it has both a subject and a verb, it counts as a complete, standalone sentence',
    },
  ],
  [
    'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT, adult workplace framing with a report draft\'s "Because the client requested..." rather than the existing everyday-sentence examples',
    'MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP, re-asked with "Which delayed the entire schedule" rather than the existing toy examples',
    'MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT, a second fresh example ("Although the budget was approved...") forming the ladder\'s third rung',
  ],
)

const RUN_ON_ADULT = adultLadder(
  'eng.grammar.run-on-sentences-and-comma-splices', 'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA', 'MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES',
  [
    {
      stem: 'In "The report was late, the client was upset" (two independent clauses joined by only a comma), is this just as grammatically correct as "The report was late, and the client was upset" (comma plus coordinating conjunction), since both use a comma?',
      correct: 'No — the first is a comma splice, a genuine error (a comma alone cannot join two independent clauses); the second correctly adds a coordinating conjunction after the comma',
      wrong: 'Yes — using a comma between two independent clauses is always correct, with or without a conjunction following it',
    },
    {
      stem: 'To fix the comma splice "The team finished early, they left the office," is splitting it into two separate sentences the ONLY correct fix?',
      correct: 'No — other valid fixes include adding a coordinating conjunction ("finished early, so they left"), using a semicolon ("finished early; they left"), or subordinating one clause ("Because the team finished early, they left") — splitting into two sentences is only one option among several',
      wrong: 'Yes — splitting into two separate sentences is the only grammatically correct way to fix a comma splice or run-on',
    },
    {
      stem: 'In "The proposal was approved, the funding was released" (two independent clauses joined only by a comma), is this as correct as "The proposal was approved, and the funding was released"?',
      correct: 'No — the first is a comma splice (an error); a comma alone cannot join two independent clauses without a coordinating conjunction or other proper connector',
      wrong: 'Yes — since both use a comma to connect two clauses, they are equally correct',
    },
  ],
  [
    'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA, adult workplace framing with a report/client-reaction example rather than the existing everyday-sentence examples',
    'MC-B-THE-ONLY-WAY-TO-FIX-A-RUN-ON-OR-COMMA-SPLICE-IS-TO-SPLIT-IT-INTO-TWO-SEPARATE-SENTENCES, re-asked with a team-finished-early example rather than the existing toy examples',
    'MC-A-A-COMMA-SPLICE-IS-JUST-AS-CORRECT-AS-A-COMPOUND-SENTENCE-SINCE-BOTH-USE-A-COMMA, a second fresh example (a proposal-approval/funding sentence) forming the ladder\'s third rung',
  ],
)

const PRINT_TO_MEANING_ADULT = adultLadder(
  'eng.reading.print-to-meaning', 'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION', 'MC-COMPREHENSION-IS-ALL-OR-NOTHING',
  [
    {
      stem: 'In a training session, an employee reads a technical manual aloud with perfect pronunciation but cannot answer any question about what it said. Does correctly SOUNDING OUT the text mean they understood its meaning?',
      correct: 'No — decoding printed text correctly (reading it aloud accurately) is not the same skill as comprehending its meaning; the two can genuinely diverge',
      wrong: 'Yes — if someone reads a passage aloud without pronunciation errors, that proves they understood what it meant',
    },
    {
      stem: 'After reading a report, an employee understands the main conclusion clearly but is fuzzy on two supporting details. Does this partial understanding mean they comprehended NOTHING, since comprehension is all-or-nothing?',
      correct: 'No — comprehension exists on a spectrum; understanding the main point while being unclear on some details is genuine partial comprehension, not zero comprehension',
      wrong: 'Yes — comprehension is all-or-nothing: either you understand a text completely, or you understood none of it',
    },
    {
      stem: 'A trainee reads a safety procedure aloud fluently and without mistakes but later cannot explain what to do in an emergency. Does fluent oral reading prove comprehension here?',
      correct: 'No — accurate oral reading (decoding) and understanding meaning (comprehension) are separate skills; fluent reading alone does not guarantee the meaning was grasped',
      wrong: 'Yes — reading a passage aloud without errors is sufficient proof that its meaning was understood',
    },
  ],
  [
    'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION, adult workplace framing with a training-manual read-aloud rather than the existing everyday-sentence examples',
    'MC-COMPREHENSION-IS-ALL-OR-NOTHING, re-asked with a report\'s main-conclusion-vs-details example rather than the existing toy examples',
    'MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION, a second fresh example (a safety-procedure read-aloud) forming the ladder\'s third rung',
  ],
)

const READING_FLUENCY_ADULT = adultLadder(
  'eng.reading.reading-fluency', 'MC-READING-FLUENCY-IS-JUST-SPEED', 'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE',
  [
    {
      stem: 'An employee reads a policy document very quickly but with a flat, robotic tone and pauses in odd places. Does reading FAST alone make this fluent reading?',
      correct: 'No — reading fluency includes accuracy, appropriate expression/phrasing, and comprehension alongside speed; fast-but-flat reading with poor phrasing is not truly fluent',
      wrong: 'Yes — reading fluency is simply a measure of how quickly someone can read text aloud',
    },
    {
      stem: 'Does simply reading a large volume of text (without any feedback or practice on accuracy/expression) automatically develop reading fluency over time, with no other input needed?',
      correct: 'No — fluency develops through practice that includes feedback, repeated reading, and attention to accuracy and expression — not merely from accumulating reading volume alone',
      wrong: 'Yes — reading fluency develops automatically just from reading enough text, regardless of how that reading is practiced',
    },
    {
      stem: 'A trainee reads a report rapidly, mispronouncing several technical terms and ignoring punctuation-based pauses. Does the speed alone make this fluent reading?',
      correct: 'No — accuracy and appropriate phrasing/expression are also required for fluency; fast reading full of pronunciation errors and ignored pauses is not fluent',
      wrong: 'Yes — as long as the reading is fast, it counts as fluent regardless of accuracy or expression',
    },
  ],
  [
    'MC-READING-FLUENCY-IS-JUST-SPEED, adult workplace framing with a policy-document read-aloud rather than the existing everyday-sentence examples',
    'MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE, re-asked with a volume-without-feedback framing rather than the existing toy examples',
    'MC-READING-FLUENCY-IS-JUST-SPEED, a second fresh example (a report read with mispronunciations) forming the ladder\'s third rung',
  ],
)

const LITERAL_COMPREHENSION_ADULT = adultLadder(
  'eng.reading.literal-comprehension', 'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT', 'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING',
  [
    {
      stem: 'An employee knows the definition of every individual word in a dense legal clause but still cannot explain what the clause actually means as a whole. Does knowing every word\'s meaning guarantee understanding the text?',
      correct: 'No — understanding individual words does not automatically produce understanding of how they combine into the text\'s overall meaning; comprehension requires more than word-level knowledge',
      wrong: 'Yes — if you know the meaning of every word in a passage, you automatically understand the passage as a whole',
    },
    {
      stem: 'To demonstrate literal comprehension of a memo\'s stated facts, must an employee recite the memo\'s EXACT original wording from memory, or can they restate the same facts in their own words?',
      correct: 'No, exact memorization is not required — literal comprehension means accurately grasping what is directly stated, which can be demonstrated by restating the facts correctly in one\'s own words',
      wrong: 'Yes — literal comprehension specifically requires memorizing and reproducing the exact original wording of the text',
    },
    {
      stem: 'A trainee can define every word in a complex procedure\'s instructions but cannot correctly follow the steps. Does knowing each word\'s meaning guarantee they understood the instructions?',
      correct: 'No — word-level knowledge alone does not guarantee comprehension of the combined meaning or the procedure as a whole',
      wrong: 'Yes — understanding each individual word is sufficient to guarantee full comprehension of a text',
    },
  ],
  [
    'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT, adult workplace framing with a legal clause rather than the existing everyday-sentence examples',
    'MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING, re-asked with a memo\'s stated facts rather than the existing toy examples',
    'MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT, a second fresh example (a procedure\'s instructions) forming the ladder\'s third rung',
  ],
)

const MAIN_IDEA_ADULT = adultLadder(
  'eng.reading.main-idea-and-details', 'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA', 'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE',
  [
    {
      stem: 'A report opens with "Yesterday\'s meeting ran long" before going on to argue that the company needs a new scheduling policy. Is the FIRST sentence automatically the report\'s main idea?',
      correct: 'No — the first sentence is often just an opening detail or hook; here the main idea (needing a new scheduling policy) appears later, not in the first sentence',
      wrong: 'Yes — the first sentence of a passage is always its main idea',
    },
    {
      stem: 'A paragraph explains multiple benefits of remote work without ever writing the exact sentence "remote work has many benefits." Can there still be a valid main idea if it is never stated word-for-word?',
      correct: 'Yes — a main idea can be IMPLIED by the supporting details without ever being written verbatim; it does not have to appear as an exact sentence in the text',
      wrong: 'No — a main idea only counts if it is stated word-for-word somewhere in the text',
    },
    {
      stem: 'An email begins "I hope you had a good weekend" before explaining an urgent budget shortfall. Is the FIRST sentence automatically the email\'s main idea?',
      correct: 'No — the first sentence here is a pleasantry, not the main idea; the main idea (the urgent budget shortfall) comes later',
      wrong: 'Yes — whatever sentence appears first in a piece of writing is always its main idea',
    },
  ],
  [
    'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA, adult workplace framing with a meeting-report opening rather than the existing everyday-sentence examples',
    'MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE, re-asked with a remote-work-benefits paragraph rather than the existing toy examples',
    'MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA, a second fresh example (an email opening with a pleasantry) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_7: SeedProbe[] = [
  ...END_PUNCT_ADULT, ...COMMA_USAGE_ADULT, ...APOSTROPHES_ADULT, ...QUOTATION_MARKS_ADULT,
  ...SENTENCE_FRAGMENTS_ADULT, ...RUN_ON_ADULT, ...PRINT_TO_MEANING_ADULT, ...READING_FLUENCY_ADULT,
  ...LITERAL_COMPREHENSION_ADULT, ...MAIN_IDEA_ADULT,
]
