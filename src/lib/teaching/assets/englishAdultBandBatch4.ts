/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 4 (Group 4 of 5).
 *
 * Continues Batches 1-3 (30 concepts, commits 3afa9f5/df7f9c8/a14fe18)
 * against the TRUE-gap list `englishAdultBandAudit.ts`'s `computeAdultGap()`
 * computes — EARLY/ELEMENTARY/MIDDLE/UNDERGRADUATE-native concepts only
 * (HIGH-native concepts already clear the ADULT mastery bar via
 * `matcher.ts`'s HIGH<->ADULT +15 compatibility bonus, so they are
 * correctly excluded).
 *
 * 10 concepts (all core grammar, all MIDDLE-native, continuing in KG
 * order): eng.grammar.adjectives, eng.grammar.adverbs,
 * eng.grammar.prepositions, eng.grammar.conjunctions,
 * eng.grammar.interjections, eng.grammar.articles-and-determiners,
 * eng.grammar.subject-and-predicate, eng.grammar.word-order,
 * eng.grammar.sentence-types-by-function, eng.grammar.question-formation.
 * 30 new ADULT-band closed-choice probes (3/concept) — the bare
 * mastery-gate contract. Same mcq(FOUNDATIONAL)/misconception_probe
 * (DEVELOPING)/mcq(PROFICIENT) ladder as Batches 1-3, reusing each
 * concept's own two already-registered, already-ACTIVE misconceptions
 * (every registry checked and confirmed to hold exactly 2) via genuinely
 * different adult-context examples (workplace writing, adult reading,
 * professional correspondence) than the concept's native-band probes use.
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

const ADJECTIVES_ADULT = adultLadder(
  'eng.grammar.adjectives', 'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN', 'MC-ADJECTIVE-ORDER-DOESNT-MATTER',
  [
    {
      stem: 'In a performance review, a manager writes "the team was satisfied." Is "satisfied" an adjective even though it comes AFTER the noun/subject rather than before it?',
      correct: 'Yes — "satisfied" is a predicate adjective; adjectives can follow a linking verb and describe the subject from after it',
      wrong: 'No — a word can only be an adjective if it sits directly before the noun it describes',
    },
    {
      stem: 'A résumé lists "a large, professional, red logo." Could this be reordered to "a red, large, professional logo" with no change in how natural it sounds to a fluent reader?',
      correct: 'No — English adjectives before a noun follow a conventional order (size before color, etc.); reordering sounds unnatural even though the meaning is unchanged',
      wrong: 'Yes — adjective order before a noun is arbitrary and any order sounds equally natural',
    },
    {
      stem: 'In the sentence "The proposal seems reasonable," is "reasonable" an adjective, given that it appears after "seems" rather than before "proposal"?',
      correct: 'Yes — it is a predicate adjective describing "the proposal" through the linking verb "seems"',
      wrong: 'No — since it does not precede a noun, it cannot be functioning as an adjective here',
    },
  ],
  [
    'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN, adult workplace framing with a performance review ("satisfied") rather than the existing everyday-sentence examples',
    'MC-ADJECTIVE-ORDER-DOESNT-MATTER, re-asked with a résumé/logo description example rather than the existing toy examples',
    'MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN, a second fresh example (a business proposal, "seems reasonable") forming the ladder\'s third rung',
  ],
)

const ADVERBS_ADULT = adultLadder(
  'eng.grammar.adverbs', 'MC-ALL-ADVERBS-END-IN-LY', 'MC-ADVERBS-ONLY-MODIFY-VERBS',
  [
    {
      stem: 'In "the meeting starts soon," is "soon" an adverb, even though it doesn\'t end in "-ly"?',
      correct: 'Yes — "soon" is an adverb of time; many adverbs (soon, fast, often, well) don\'t take the "-ly" ending',
      wrong: 'No — a word can only be an adverb if it ends in "-ly"',
    },
    {
      stem: 'In "the report was extremely thorough," does "extremely" modify a verb, or does it modify the adjective "thorough"?',
      correct: 'It modifies the adjective "thorough" — adverbs can modify adjectives, other adverbs, and whole sentences, not only verbs',
      wrong: 'It must be modifying a hidden verb, since adverbs only ever modify verbs',
    },
    {
      stem: 'In "she completed the audit well," is "well" an adverb even though it doesn\'t end in "-ly"?',
      correct: 'Yes — "well" is the adverb form used with "do"/"complete"-type verbs; not all adverbs carry the "-ly" ending',
      wrong: 'No — since "well" has no "-ly" ending, it cannot be classified as an adverb here',
    },
  ],
  [
    'MC-ALL-ADVERBS-END-IN-LY, adult workplace framing with a meeting-scheduling example ("soon") rather than the existing everyday-sentence examples',
    'MC-ADVERBS-ONLY-MODIFY-VERBS, re-asked with a business-report example ("extremely thorough") rather than the existing toy examples',
    'MC-ALL-ADVERBS-END-IN-LY, a second fresh example (an audit report, "completed... well") forming the ladder\'s third rung',
  ],
)

const PREPOSITIONS_ADULT = adultLadder(
  'eng.grammar.prepositions', 'MC-PREPOSITIONS-ONLY-SHOW-LOCATION', 'MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING',
  [
    {
      stem: 'In "the deadline is on Friday," does the preposition "on" show a physical location?',
      correct: 'No — "on" here shows a point in time, not a location; prepositions also express time, manner, cause, and other relationships',
      wrong: 'Yes — prepositions only ever show physical location, so "on" must indicate a place',
    },
    {
      stem: 'Could you reliably predict that English uses "interested IN" (not "interested ON" or "interested AT") just from the meaning of "interested"?',
      correct: 'No — the correct preposition after many words is a fixed, memorized pairing, not something derivable from meaning alone',
      wrong: 'Yes — if you understand the meaning of a word well enough, you can always predict which preposition follows it',
    },
    {
      stem: 'In "we are responsible for the outcome," does the preposition "for" show a physical location?',
      correct: 'No — "for" here shows purpose/responsibility, not location, another example of a preposition expressing a non-spatial relationship',
      wrong: 'Yes — since it is a preposition, "for" must be indicating where something is located',
    },
  ],
  [
    'MC-PREPOSITIONS-ONLY-SHOW-LOCATION, adult workplace framing with a deadline example ("on Friday") rather than the existing everyday-sentence examples',
    'MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING, re-asked with "interested in" rather than the existing toy examples',
    'MC-PREPOSITIONS-ONLY-SHOW-LOCATION, a second fresh example (accountability language, "responsible for") forming the ladder\'s third rung',
  ],
)

const CONJUNCTIONS_ADULT = adultLadder(
  'eng.grammar.conjunctions', 'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY', 'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM',
  [
    {
      stem: 'Do "and" (coordinating) and "although" (subordinating) join clauses in exactly the same grammatical way?',
      correct: 'No — "and" joins two equal independent clauses, while "although" makes one clause dependent on the other; they work differently',
      wrong: 'Yes — all conjunctions join clauses in the same way, regardless of type',
    },
    {
      stem: 'In "We reviewed the contract, and we signed it the same day," is the comma before "and" placed randomly, or does it follow a rule?',
      correct: 'It follows a rule — a comma goes before a coordinating conjunction joining two independent clauses',
      wrong: 'It is placed randomly — comma use around conjunctions has no consistent rule',
    },
    {
      stem: 'Do "or" (coordinating) and "because" (subordinating) function identically when joining two clauses in a business email?',
      correct: 'No — "or" links two independent, equal clauses, while "because" subordinates one clause as the reason for the other',
      wrong: 'Yes — since both are conjunctions, they must join clauses the same way',
    },
  ],
  [
    'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY, adult workplace framing with "and"/"although" rather than the existing everyday-sentence examples',
    'MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM, re-asked with a contract-signing example rather than the existing toy examples',
    'MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY, a second fresh example (a business email, "or"/"because") forming the ladder\'s third rung',
  ],
)

const INTERJECTIONS_ADULT = adultLadder(
  'eng.grammar.interjections', 'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS', 'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS',
  [
    {
      stem: 'In a meeting transcript, someone says "Well, I suppose we could try that." Is "well" an interjection here even though there\'s no exclamation point?',
      correct: 'Yes — "well" is an interjection expressing hesitation/consideration; an exclamation point is not required for a word to be an interjection',
      wrong: 'No — a word only counts as an interjection if it is followed by an exclamation point',
    },
    {
      stem: 'Is "um" in a recorded interview transcript just meaningless filler with no grammatical status, or does it have a genuine word class?',
      correct: 'It has a genuine word class — it is classified as an interjection, a recognized part of speech, not merely noise',
      wrong: 'It is just filler noise with no grammatical status at all',
    },
    {
      stem: 'In "Oh, I hadn\'t considered that angle," is "Oh" an interjection even though the sentence isn\'t written as an exclamation?',
      correct: 'Yes — "Oh" is an interjection expressing a reaction; it doesn\'t need an exclamation point to function as one',
      wrong: 'No — without an exclamation point, "Oh" cannot be classified as an interjection',
    },
  ],
  [
    'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS, adult workplace framing with a meeting transcript ("Well,...") rather than the existing everyday-sentence examples',
    'MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS, re-asked with an interview transcript ("um") rather than the existing toy examples',
    'MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS, a second fresh example (professional correspondence, "Oh,...") forming the ladder\'s third rung',
  ],
)

const ARTICLES_ADULT = adultLadder(
  'eng.grammar.articles-and-determiners', 'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND', 'MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED',
  [
    {
      stem: 'A cover letter reads "an honest assessment." Since "honest" starts with the letter H (a consonant letter), should it be "a honest assessment" instead?',
      correct: 'No — "an" is correct because "honest" is pronounced starting with a vowel SOUND (the H is silent); the choice depends on sound, not spelling',
      wrong: 'Yes — "a"/"an" is chosen based on the first letter of the word, so a consonant letter like H always takes "a"',
    },
    {
      stem: 'In "the CEO announced the merger" vs. "she was promoted to CEO," is "the" always required or always omitted before "CEO"?',
      correct: 'Neither — "the" is used when referring to a specific, identified CEO, and omitted when "CEO" is used as a role/title, not a fixed rule of always/never',
      wrong: 'It is a fixed rule: "the" is either always required before a job title or always omitted, with no exceptions',
    },
    {
      stem: 'A memo mentions "an hour-long meeting." Since "hour" starts with the letter H, should this be "a hour-long meeting"?',
      correct: 'No — "an" is correct because "hour" is pronounced starting with a vowel sound (the H is silent), the same sound-based rule as "an honest assessment"',
      wrong: 'Yes — since "hour" starts with the consonant letter H, "a" should be used instead of "an"',
    },
  ],
  [
    'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND, adult workplace framing with a cover letter ("an honest assessment") rather than the existing everyday-sentence examples',
    'MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED, re-asked with a CEO/job-title example rather than the existing toy examples',
    'MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND, a second fresh example (a meeting memo, "an hour-long meeting") forming the ladder\'s third rung',
  ],
)

const SUBJECT_PREDICATE_ADULT = adultLadder(
  'eng.grammar.subject-and-predicate', 'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD', 'MC-PREDICATE-IS-JUST-THE-VERB',
  [
    {
      stem: 'In "Under the new policy, the team submitted the report early," is "the team" the subject even though it isn\'t the first word of the sentence?',
      correct: 'Yes — "the team" is the subject; the subject is whatever performs the action, not necessarily the first word (here an introductory phrase comes before it)',
      wrong: 'No — the subject must always be the very first word of the sentence, so it would be "Under"',
    },
    {
      stem: 'In "The committee reviewed the budget carefully," is the predicate just the word "reviewed," or does it include more?',
      correct: 'The predicate includes more — "reviewed the budget carefully" is the whole predicate; the predicate is everything that says what the subject does, not just the verb',
      wrong: 'The predicate is just the single verb "reviewed"; everything else is separate from the predicate',
    },
    {
      stem: 'In "After much discussion, the board approved the budget," is "the board" the subject even though "After much discussion" comes first?',
      correct: 'Yes — "the board" is the subject; an introductory phrase at the start of a sentence is not automatically the subject',
      wrong: 'No — since "After" is the first word, the subject must start there',
    },
  ],
  [
    'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD, adult workplace framing with a policy memo ("the team submitted...") rather than the existing everyday-sentence examples',
    'MC-PREDICATE-IS-JUST-THE-VERB, re-asked with a budget-review example rather than the existing toy examples',
    'MC-SUBJECT-IS-ALWAYS-THE-FIRST-WORD, a second fresh example (a board meeting summary, "After much discussion,...") forming the ladder\'s third rung',
  ],
)

const WORD_ORDER_ADULT = adultLadder(
  'eng.grammar.word-order', 'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES', 'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE',
  [
    {
      stem: 'Could "Reviewed the manager the report" mean the same as "The manager reviewed the report" in English, since word order is just a stylistic choice?',
      correct: 'No — English relies on Subject-Verb-Object word order to show who did what to whom; scrambling it breaks or changes the meaning, unlike in more flexible-order languages',
      wrong: 'Yes — English word order is flexible like many other languages, so the words can be rearranged freely without changing the meaning',
    },
    {
      stem: 'In "she carefully reviewed the contract," could "carefully" be placed anywhere in the sentence (e.g., "she reviewed carefully the contract") with no change to how natural it sounds?',
      correct: 'No — adverb placement follows conventions in English (an adverb doesn\'t usually sit between a verb and its direct object); not every position sounds equally natural',
      wrong: 'Yes — adverbs like "carefully" can go anywhere in a sentence and it will sound equally natural',
    },
    {
      stem: 'Would "The report the manager reviewed" and "The manager reviewed the report" be understood as meaning the same thing by a fluent English reader?',
      correct: 'No — the first restructures meaning/emphasis (it reads as a relative-clause fragment, not a complete simple statement); English word order carries grammatical information, it isn\'t interchangeable',
      wrong: 'Yes — since both contain the same words, English readers would understand them as identical in meaning',
    },
  ],
  [
    'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES, adult workplace framing with a report-review example rather than the existing everyday-sentence examples',
    'MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE, re-asked with "carefully reviewed" rather than the existing toy examples',
    'MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES, a second fresh example (a report/manager sentence) forming the ladder\'s third rung',
  ],
)

const SENTENCE_TYPES_ADULT = adultLadder(
  'eng.grammar.sentence-types-by-function', 'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD', 'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE',
  [
    {
      stem: 'In a client email, "Can you send the invoice today?" is a question. Does every question have to start with a question word like "what" or "who"?',
      correct: 'No — this question starts with "Can," an auxiliary verb, and is still a genuine (interrogative) question; not all questions begin with a wh-word',
      wrong: 'Yes — a sentence can only be a question if it begins with a question word',
    },
    {
      stem: 'A colleague writes "I can\'t believe the deadline moved again." with a period, not an exclamation point. Does the period alone prove this is a simple declarative statement rather than an exclamatory one in tone?',
      correct: 'Not necessarily — sentence type by function is about the sentence\'s communicative purpose (here, expressing strong feeling), not only which punctuation mark was typed',
      wrong: 'Yes — the punctuation mark used is the only thing that determines a sentence\'s type; a period always means purely declarative',
    },
    {
      stem: 'In "Would you mind reviewing this by Friday?" is this a genuine question even though it doesn\'t start with a wh-word like "what" or "when"?',
      correct: 'Yes — it starts with the auxiliary "Would" and functions as a polite interrogative request; question words are not required for a sentence to be a question',
      wrong: 'No — since it doesn\'t begin with a question word, it cannot be classified as an interrogative sentence',
    },
  ],
  [
    'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD, adult workplace framing with a client email ("Can you send...") rather than the existing everyday-sentence examples',
    'MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE, re-asked with a deadline-frustration email rather than the existing toy examples',
    'MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD, a second fresh example (a polite work request, "Would you mind...") forming the ladder\'s third rung',
  ],
)

const QUESTION_FORMATION_ADULT = adultLadder(
  'eng.grammar.question-formation', 'MC-JUST-ADD-DO-TO-ANY-STATEMENT', 'MC-WH-QUESTIONS-DONT-NEED-INVERSION',
  [
    {
      stem: 'To turn "The manager is reviewing the file" into a question, should you add "does" in front, giving "Does the manager is reviewing the file"?',
      correct: 'No — "is" is already an auxiliary verb, so the question is formed by inverting it: "Is the manager reviewing the file?"; "do"-support is only needed when there is no existing auxiliary',
      wrong: 'Yes — every statement is turned into a question by adding "do"/"does"/"did" at the front',
    },
    {
      stem: 'To ask a wh-question about "The client will call tomorrow," does "When will the client call tomorrow?" still need the subject-auxiliary inversion (will before the subject), or can you just add "when" to the front unchanged?',
      correct: 'It still needs inversion — "When will the client call?" requires "will" to move before "the client"; wh-questions are not exempt from subject-auxiliary inversion',
      wrong: 'No inversion is needed for wh-questions — you can just place the wh-word at the front and leave the rest of the statement unchanged',
    },
    {
      stem: 'To turn "The team completed the audit" into a question, should you add "does" in front, giving "Does the team completed the audit"?',
      correct: 'No — since "completed" is a simple past verb with no existing auxiliary, "do"-support in the correct tense is needed: "Did the team complete the audit?" (note "complete," not "completed")',
      wrong: 'Yes — simply adding "does" to the front of any statement correctly forms a question',
    },
  ],
  [
    'MC-JUST-ADD-DO-TO-ANY-STATEMENT, adult workplace framing with "is reviewing" (existing auxiliary) rather than the existing everyday-sentence examples',
    'MC-WH-QUESTIONS-DONT-NEED-INVERSION, re-asked with a client-call wh-question rather than the existing toy examples',
    'MC-JUST-ADD-DO-TO-ANY-STATEMENT, a second fresh example (an audit-completion sentence, past tense) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_4: SeedProbe[] = [
  ...ADJECTIVES_ADULT, ...ADVERBS_ADULT, ...PREPOSITIONS_ADULT, ...CONJUNCTIONS_ADULT,
  ...INTERJECTIONS_ADULT, ...ARTICLES_ADULT, ...SUBJECT_PREDICATE_ADULT, ...WORD_ORDER_ADULT,
  ...SENTENCE_TYPES_ADULT, ...QUESTION_FORMATION_ADULT,
]
