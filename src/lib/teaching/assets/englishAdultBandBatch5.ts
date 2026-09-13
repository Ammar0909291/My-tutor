/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 5 (Group 5 of 5, FINAL).
 *
 * Continues Batches 1-4 (40 concepts, commits 3afa9f5/df7f9c8/a14fe18/25df300)
 * against the TRUE-gap list `englishAdultBandAudit.ts`'s `computeAdultGap()`
 * computes — EARLY/ELEMENTARY/MIDDLE/UNDERGRADUATE-native concepts only
 * (HIGH-native concepts already clear the ADULT mastery bar via
 * `matcher.ts`'s HIGH<->ADULT +15 compatibility bonus, so they are
 * correctly excluded).
 *
 * 10 concepts (all core grammar, all MIDDLE-native, continuing in KG
 * order): eng.grammar.negation, eng.grammar.phrases, eng.grammar.clauses,
 * eng.grammar.simple-sentences, eng.grammar.compound-sentences,
 * eng.grammar.complex-sentences, eng.grammar.present-tenses,
 * eng.grammar.past-tenses, eng.grammar.future-tenses,
 * eng.grammar.tense-consistency. 30 new ADULT-band closed-choice probes
 * (3/concept) — the bare mastery-gate contract. Same mcq(FOUNDATIONAL)/
 * misconception_probe(DEVELOPING)/mcq(PROFICIENT) ladder as Batches 1-4,
 * reusing each concept's own two already-registered, already-ACTIVE
 * misconceptions (every registry checked and confirmed to hold exactly 2)
 * via genuinely different adult-context examples (workplace writing,
 * professional correspondence, narrative writing) than the concept's
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

const NEGATION_ADULT = adultLadder(
  'eng.grammar.negation', 'MC-JUST-ADD-NOT-ANYWHERE', 'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS',
  [
    {
      stem: 'To negate "The team has finished the report," should "not" simply be inserted anywhere convenient, giving "The team has not finished the report" vs. some other random placement?',
      correct: 'No — "not" has a fixed position after the first auxiliary verb ("has"); it cannot be inserted anywhere in the sentence and still be grammatical',
      wrong: 'Yes — "not" can be placed anywhere in the sentence and the meaning/grammar stays the same',
    },
    {
      stem: 'In standard written English, does "I don\'t have no objections" (a double negative) mean the same as "I have no objections," just with extra emphasis?',
      correct: 'No — in standard English, a double negative is a grammatical error (the two negatives are read as canceling, producing confusion), not simply added emphasis',
      wrong: 'Yes — using two negative words together is just a stronger way of saying the same negative meaning',
    },
    {
      stem: 'To negate "She is reviewing the contract," should "not" simply be inserted anywhere convenient, giving "She is not reviewing the contract" vs. some other random placement?',
      correct: 'No — "not" goes after the auxiliary "is"; its position is fixed by the sentence\'s existing verb structure, not arbitrary',
      wrong: 'Yes — "not" can go anywhere and the sentence would still mean the same thing',
    },
  ],
  [
    'MC-JUST-ADD-NOT-ANYWHERE, adult workplace framing with a report status update ("has finished the report") rather than the existing everyday-sentence examples',
    'MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS, re-asked with a formal objection statement rather than the existing toy examples',
    'MC-JUST-ADD-NOT-ANYWHERE, a second fresh example (a contract-review status update) forming the ladder\'s third rung',
  ],
)

const PHRASES_ADULT = adultLadder(
  'eng.grammar.phrases', 'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS', 'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING',
  [
    {
      stem: 'Is "the quarterly report" a phrase in the same grammatical sense as any random group of words pulled from a sentence, like "report the quarterly"?',
      correct: 'No — "the quarterly report" is a genuine noun phrase (a grammatical unit built around a head word); a random, ungrammatical word grouping is not a phrase in this sense',
      wrong: 'Yes — a phrase is simply any group of words next to each other, grammatical or not',
    },
    {
      stem: 'Is "after the meeting ended" (which contains a subject "meeting" and a verb "ended") the same kind of unit as the phrase "after the meeting"?',
      correct: 'No — "after the meeting ended" is a clause (it has its own subject and verb), while "after the meeting" is a phrase (no subject-verb pair); phrases and clauses are different structures',
      wrong: 'Yes — phrases and clauses are just two names for the same kind of grammatical unit',
    },
    {
      stem: 'Is "reviewing the budget carefully" a phrase in the same grammatical sense as a random word grouping like "budget reviewing carefully the"?',
      correct: 'No — "reviewing the budget carefully" is a genuine verb phrase built around the head verb "reviewing"; a random word jumble is not a grammatical phrase',
      wrong: 'Yes — since both contain the same three content words, they count equally as phrases',
    },
  ],
  [
    'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS, adult workplace framing with "the quarterly report" rather than the existing everyday-sentence examples',
    'MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING, re-asked with a meeting-ended example rather than the existing toy examples',
    'MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS, a second fresh example (a budget-review phrase) forming the ladder\'s third rung',
  ],
)

const CLAUSES_ADULT = adultLadder(
  'eng.grammar.clauses', 'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY', 'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE',
  [
    {
      stem: 'Is "the team submitted the report, and the client approved it" — which contains TWO independent clauses joined by "and" — still made up of independent clauses, even though the whole sentence isn\'t a simple sentence?',
      correct: 'Yes — each half ("the team submitted the report" / "the client approved it") is an independent clause on its own; an independent clause doesn\'t require the whole sentence to be a simple sentence',
      wrong: 'No — since the whole sentence is compound rather than simple, neither half can be called an independent clause',
    },
    {
      stem: 'In "because the deadline moved," does "because" prevent this from being a genuine clause, since it can\'t stand alone as a full sentence?',
      correct: 'No — "because the deadline moved" is still a clause (it has a subject "deadline" and a verb "moved"); it\'s a DEPENDENT clause, not a non-clause',
      wrong: 'Yes — since it can\'t stand alone, "because the deadline moved" isn\'t a clause at all, just a phrase',
    },
    {
      stem: 'Is "the manager reviewed the file, but she found no errors" — which contains TWO independent clauses joined by "but" — still made up of independent clauses, even though the whole sentence isn\'t a simple sentence?',
      correct: 'Yes — each half is a complete independent clause; being joined into a compound sentence doesn\'t strip either half of its independent-clause status',
      wrong: 'No — joining two clauses with "but" means neither one counts as independent anymore',
    },
  ],
  [
    'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY, adult workplace framing with a report/client-approval example rather than the existing everyday-sentence examples',
    'MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE, re-asked with a deadline-change example rather than the existing toy examples',
    'MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY, a second fresh example (a file-review/no-errors compound sentence) forming the ladder\'s third rung',
  ],
)

const SIMPLE_SENTENCES_ADULT = adultLadder(
  'eng.grammar.simple-sentences', 'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE', 'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE',
  [
    {
      stem: 'Is "The newly appointed regional sales director carefully reviewed every quarterly performance report before the board meeting" a simple sentence, even though it is long?',
      correct: 'Yes — it is still a simple sentence because it has only ONE independent clause (one subject-verb core); being long or having extra descriptive words doesn\'t change the sentence TYPE',
      wrong: 'No — a sentence this long cannot be simple; simple sentences must be short',
    },
    {
      stem: 'Is "The manager reviewed the budget and approved the proposal" a simple sentence, given that it contains the word "and"?',
      correct: 'Yes — it is still simple because "and" here joins two VERBS (reviewed / approved) sharing one subject ("The manager"), not two independent clauses; a simple sentence can contain "and" without becoming compound',
      wrong: 'No — any sentence containing "and" is automatically compound, never simple',
    },
    {
      stem: 'Is "The company\'s newly hired chief financial officer thoroughly examined the annual budget" a simple sentence, even though it is long?',
      correct: 'Yes — length doesn\'t determine sentence type; this has one independent clause (one subject-verb core), so it is simple regardless of how many words it contains',
      wrong: 'No — a sentence with this many words cannot be classified as simple',
    },
  ],
  [
    'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE, adult workplace framing with a long formal sentence about a sales director rather than the existing everyday-sentence examples',
    'MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, re-asked with a budget-review-and-approval example rather than the existing toy examples',
    'MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE, a second fresh example (a CFO/budget sentence) forming the ladder\'s third rung',
  ],
)

const COMPOUND_SENTENCES_ADULT = adultLadder(
  'eng.grammar.compound-sentences', 'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE', 'MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS',
  [
    {
      stem: 'In "The team worked quickly and efficiently," does "and" make this a compound sentence, since "and" is a coordinating conjunction?',
      correct: 'No — "and" here joins two adverbs (quickly / efficiently), not two independent clauses; a coordinating conjunction only creates a compound sentence when it joins two full independent clauses',
      wrong: 'Yes — any use of a coordinating conjunction like "and" automatically makes a sentence compound',
    },
    {
      stem: 'In "We reviewed the contract; we signed it the same day," could the semicolon be replaced with just a comma ("We reviewed the contract, we signed it the same day") with no grammatical problem?',
      correct: 'No — using only a comma between two independent clauses (with no coordinating conjunction) creates a comma splice, a genuine error; a semicolon and a bare comma are not interchangeable here',
      wrong: 'Yes — a semicolon and a comma can be swapped freely between independent clauses with no grammatical difference',
    },
    {
      stem: 'In "She reviewed and approved the proposal," does "and" make this a compound sentence?',
      correct: 'No — "and" here joins two verbs (reviewed / approved) sharing one subject, not two independent clauses, so this remains a simple sentence, not a compound one',
      wrong: 'Yes — since "and" is present, the sentence must be compound',
    },
  ],
  [
    'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE, adult workplace framing with "worked quickly and efficiently" rather than the existing everyday-sentence examples',
    'MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS, re-asked with a contract-review/signing example rather than the existing toy examples',
    'MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE, a second fresh example (a proposal review-and-approval sentence) forming the ladder\'s third rung',
  ],
)

const COMPLEX_SENTENCES_ADULT = adultLadder(
  'eng.grammar.complex-sentences', 'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND', 'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST',
  [
    {
      stem: 'Is "Although the deadline moved, the team delivered on time" a compound sentence, since it has two clauses joined by "although"?',
      correct: 'No — "although" is a SUBORDINATING conjunction, making one clause dependent on the other; a sentence with a dependent + independent clause is COMPLEX, not compound',
      wrong: 'Yes — any sentence with two clauses joined by a conjunction, subordinating or coordinating, is compound',
    },
    {
      stem: 'In "The team delivered on time although the deadline moved," is this still a complex sentence, even though the dependent clause ("although the deadline moved") comes SECOND rather than first?',
      correct: 'Yes — a complex sentence just needs one dependent and one independent clause; the dependent clause can come before or after the independent clause',
      wrong: 'No — a complex sentence requires the dependent clause to come first; putting it second changes the sentence type',
    },
    {
      stem: 'Is "Because the client requested changes, the designer revised the proposal" a compound sentence, since it has two clauses joined by "because"?',
      correct: 'No — "because" is subordinating, so this is a complex sentence (one dependent clause + one independent clause), not compound',
      wrong: 'Yes — any two-clause sentence joined by a conjunction word counts as compound',
    },
  ],
  [
    'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND, adult workplace framing with a deadline/delivery example rather than the existing everyday-sentence examples',
    'MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST, re-asked with the dependent clause placed second rather than the existing toy examples',
    'MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND, a second fresh example (a client-request/proposal-revision sentence) forming the ladder\'s third rung',
  ],
)

const PRESENT_TENSES_ADULT = adultLadder(
  'eng.grammar.present-tenses', 'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW', 'MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE',
  [
    {
      stem: 'In a company policy document, "The office closes at 6 PM" uses the simple present. Does this mean the office is closing RIGHT NOW, at this exact moment?',
      correct: 'No — the simple present here expresses a general fact/routine (a standing policy), not an action happening at this exact instant',
      wrong: 'Yes — the simple present always means the action is happening right now, at the moment of speaking',
    },
    {
      stem: 'In "I have worked here for five years," does the present perfect simply mean the same thing as the simple past "I worked here for five years"?',
      correct: 'No — the present perfect connects a past action to the present moment (still working here now), while the simple past would suggest the connection to now is not being emphasized or has ended; they carry a different meaning, not an identical one',
      wrong: 'Yes — the present perfect is just another way of writing the simple past, with no meaning difference',
    },
    {
      stem: 'In a shipping schedule, "The train departs at 9 AM daily" uses the simple present. Does this mean the train is departing RIGHT NOW?',
      correct: 'No — this expresses a scheduled, recurring fact, not an action occurring at the exact moment of speaking',
      wrong: 'Yes — simple present verbs always describe an action happening at this very instant',
    },
  ],
  [
    'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW, adult workplace framing with an office-hours policy rather than the existing everyday-sentence examples',
    'MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE, re-asked with a work-tenure example rather than the existing toy examples',
    'MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW, a second fresh example (a train departure schedule) forming the ladder\'s third rung',
  ],
)

const PAST_TENSES_ADULT = adultLadder(
  'eng.grammar.past-tenses', 'MC-ALL-PAST-TENSE-VERBS-ADD-ED', 'MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE',
  [
    {
      stem: 'In "The board went over the budget yesterday," is "went" formed by adding "-ed" to a base verb like most past-tense verbs?',
      correct: 'No — "went" is an irregular past-tense form of "go"; not all past-tense verbs are formed by adding "-ed"',
      wrong: 'Yes — every past-tense verb in English is formed by adding "-ed" to the base form',
    },
    {
      stem: 'In "The phone rang while she was signing the contract," could "was signing" (past continuous) be replaced with "signed" (simple past) with no change in meaning about what was happening at the moment the phone rang?',
      correct: 'No — "was signing" shows an ongoing action interrupted by the phone ringing, while "signed" would suggest a completed action; they express a different relationship to the interrupting event',
      wrong: 'Yes — past continuous and simple past are interchangeable and always mean exactly the same thing',
    },
    {
      stem: 'In "The company chose a new vendor last quarter," is "chose" formed by adding "-ed" to a base verb?',
      correct: 'No — "chose" is the irregular past-tense form of "choose"; irregular verbs don\'t follow the "-ed" pattern',
      wrong: 'Yes — since it\'s in the past tense, it must have been formed by adding "-ed"',
    },
  ],
  [
    'MC-ALL-PAST-TENSE-VERBS-ADD-ED, adult workplace framing with a board-meeting budget review ("went over") rather than the existing everyday-sentence examples',
    'MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE, re-asked with a contract-signing interruption example rather than the existing toy examples',
    'MC-ALL-PAST-TENSE-VERBS-ADD-ED, a second fresh example (a vendor-selection sentence, "chose") forming the ladder\'s third rung',
  ],
)

const FUTURE_TENSES_ADULT = adultLadder(
  'eng.grammar.future-tenses', 'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE', 'MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME',
  [
    {
      stem: 'In "Look at those clouds — it is going to rain," could "is going to rain" be swapped for "will rain" with no change in how natural or accurate the sentence sounds?',
      correct: 'No — "going to" is used for a prediction based on present evidence (the clouds); "will" is more typical for a spontaneous decision or general prediction without visible evidence; they are not fully interchangeable in every context',
      wrong: 'Yes — "will" and "going to" always mean exactly the same thing and can be swapped freely in any sentence',
    },
    {
      stem: 'In a company itinerary, "The flight departs at 6 PM tomorrow" uses the present tense. Can the present tense express future time here?',
      correct: 'Yes — the simple present is commonly used for scheduled future events (timetables, itineraries); present tense verbs are not limited to present-time meaning',
      wrong: 'No — the present tense can only ever refer to present or habitual time, never to the future',
    },
    {
      stem: 'In "The engineer looked at the data and said, \'I will investigate this issue,\'" is "will" here used for a spontaneous, in-the-moment decision — the same kind of use as "going to" would express a pre-planned intention?',
      correct: 'No — "will" here expresses a decision made at the moment of speaking, while "going to" typically signals a plan already made beforehand; the two are not fully interchangeable',
      wrong: 'Yes — "will" and "going to" express identical meanings in every context, including spontaneous decisions',
    },
  ],
  [
    'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE, adult workplace framing with a weather-based prediction rather than the existing everyday-sentence examples',
    'MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME, re-asked with a flight-itinerary example rather than the existing toy examples',
    'MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE, a second fresh example (a spontaneous workplace decision, "I will investigate") forming the ladder\'s third rung',
  ],
)

const TENSE_CONSISTENCY_ADULT = adultLadder(
  'eng.grammar.tense-consistency', 'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY', 'MC-NARRATIVE-TENSE-CANT-BE-PRESENT',
  [
    {
      stem: 'In "She reviewed the report, which HAD BEEN submitted late," does the shift from simple past ("reviewed") to past perfect ("had been submitted") break tense consistency?',
      correct: 'No — tense consistency means staying within one consistent time-frame overall; the past perfect here correctly signals the submission happened BEFORE the review, a legitimate shift within the past time-frame, not an error',
      wrong: 'Yes — every verb in a passage must be in the exact same tense form, so switching from "reviewed" to "had been submitted" is always an error',
    },
    {
      stem: 'Could a story be told consistently using present-tense verbs throughout (e.g., "She opens the door and sees the mess") rather than past tense?',
      correct: 'Yes — narrative can be told consistently in the present tense (the "historical present"); tense consistency is about staying within ONE time-frame, not requiring past tense specifically',
      wrong: 'No — narratives can only ever be told using past tense; present-tense narration is always inconsistent',
    },
    {
      stem: 'In "The manager explained the policy, which HAD CHANGED the previous month," does the shift from simple past ("explained") to past perfect ("had changed") break tense consistency?',
      correct: 'No — the past perfect correctly marks that the change happened BEFORE the explaining; this is a legitimate shift within the past time-frame, not an inconsistency',
      wrong: 'Yes — any change in verb tense form within a passage is automatically an inconsistency error',
    },
  ],
  [
    'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY, adult workplace framing with a report-review/late-submission example rather than the existing everyday-sentence examples',
    'MC-NARRATIVE-TENSE-CANT-BE-PRESENT, re-asked with a "historical present" storytelling example rather than the existing toy examples',
    'MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY, a second fresh example (a policy-explanation/policy-change sentence) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_5: SeedProbe[] = [
  ...NEGATION_ADULT, ...PHRASES_ADULT, ...CLAUSES_ADULT, ...SIMPLE_SENTENCES_ADULT,
  ...COMPOUND_SENTENCES_ADULT, ...COMPLEX_SENTENCES_ADULT, ...PRESENT_TENSES_ADULT,
  ...PAST_TENSES_ADULT, ...FUTURE_TENSES_ADULT, ...TENSE_CONSISTENCY_ADULT,
]
