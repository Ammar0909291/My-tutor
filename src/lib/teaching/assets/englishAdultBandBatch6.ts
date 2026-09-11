/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 6.
 *
 * The original "next 50" campaign closed at Batch 5 (50 concepts, commits
 * 3afa9f5/df7f9c8/a14fe18/25df300/b853653). Continued per explicit follow-up
 * instruction: "continue the campaign until you finish all English
 * concepts" — i.e. drive the TRUE-gap list `englishAdultBandAudit.ts`'s
 * `computeAdultGap()` computes down to zero (69 concepts remaining at the
 * start of this batch).
 *
 * 10 concepts (all core grammar, all MIDDLE-native, continuing in KG
 * order): eng.grammar.modals, eng.grammar.conditionals,
 * eng.grammar.active-and-passive-voice, eng.grammar.direct-and-indirect-speech,
 * eng.grammar.gerunds-and-infinitives,
 * eng.grammar.participles-and-participial-phrases,
 * eng.grammar.subject-verb-agreement, eng.grammar.pronoun-antecedent-agreement,
 * eng.grammar.comparatives-and-superlatives, eng.grammar.capitalization-rules.
 * 30 new ADULT-band closed-choice probes (3/concept) — the bare mastery-gate
 * contract. Same mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/
 * mcq(PROFICIENT) ladder as Batches 1-5, reusing each concept's own two
 * already-registered, already-ACTIVE misconceptions (every registry checked
 * and confirmed to hold exactly 2) via genuinely different adult-context
 * examples (workplace writing, professional correspondence, formal
 * documents) than the concept's native-band probes use.
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

const MODALS_ADULT = adultLadder(
  'eng.grammar.modals', 'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING', 'MC-MODAL-STRENGTH-IS-ALL-THE-SAME',
  [
    {
      stem: 'In a company policy, "Employees may work from home on Fridays" uses "may." In "The results may indicate a problem," does "may" mean the same permission-granting thing?',
      correct: 'No — the first "may" grants permission, the second expresses possibility; the same modal can carry different meanings depending on context',
      wrong: 'Yes — a given modal verb always carries exactly one fixed meaning wherever it appears',
    },
    {
      stem: 'In a memo, is "You must submit the report by Friday" the same strength of obligation as "You should submit the report by Friday"?',
      correct: 'No — "must" expresses a strong, often required obligation; "should" expresses a recommendation; modal verbs vary in strength, not all interchangeable',
      wrong: 'Yes — modal verbs like "must" and "should" all express the same strength of obligation',
    },
    {
      stem: 'In "Employees can access the portal after 9 AM" (permission) vs. "This tool can process 1,000 requests per second" (capability), does "can" mean the same thing in both?',
      correct: 'No — the first expresses permission, the second expresses capability; the same modal "can" carries different meanings by context',
      wrong: 'Yes — "can" always means the same thing (ability) no matter the sentence',
    },
  ],
  [
    'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING, adult workplace framing with "may" (permission vs. possibility) rather than the existing everyday-sentence examples',
    'MC-MODAL-STRENGTH-IS-ALL-THE-SAME, re-asked with a "must" vs. "should" memo example rather than the existing toy examples',
    'MC-EACH-MODAL-HAS-ONLY-ONE-MEANING, a second fresh example ("can" for permission vs. capability) forming the ladder\'s third rung',
  ],
)

const CONDITIONALS_ADULT = adultLadder(
  'eng.grammar.conditionals', 'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE', 'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME',
  [
    {
      stem: 'In a business plan, "If sales increase, we will hire more staff" (first conditional, likely future) vs. "If sales increased tenfold overnight, we would need a new factory" (second conditional, hypothetical) — do these two sentences use the same grammatical structure?',
      correct: 'No — the first conditional uses present simple + "will," the second uses past simple + "would"; conditionals vary in structure depending on how likely/hypothetical the situation is',
      wrong: 'Yes — all conditional sentences follow exactly the same if-clause/result-clause structure',
    },
    {
      stem: 'In "If I had more budget, I would expand the team," does the past-tense verb "had" mean this is describing something that happened in the PAST?',
      correct: 'No — this is the second conditional, describing a present/future hypothetical (not currently true); the past-tense form here signals hypothetical distance, not past time',
      wrong: 'Yes — using a past-tense verb form always means the sentence is describing a past event',
    },
    {
      stem: 'In "If the client agrees, we will proceed" (first conditional) vs. "If I were the manager, I would change the policy" (second conditional), do these follow the same structure?',
      correct: 'No — the first uses present simple + "will" for a realistic future possibility, the second uses "were" + "would" for a hypothetical/unlikely scenario; the structures genuinely differ',
      wrong: 'Yes — every conditional sentence in English follows one identical pattern regardless of likelihood',
    },
  ],
  [
    'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE, adult workplace framing with a sales/hiring example rather than the existing everyday-sentence examples',
    'MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME, re-asked with a budget/hypothetical example rather than the existing toy examples',
    'MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE, a second fresh example (a client-agreement vs. hypothetical-manager scenario) forming the ladder\'s third rung',
  ],
)

const ACTIVE_PASSIVE_ADULT = adultLadder(
  'eng.grammar.active-and-passive-voice', 'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE', 'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING',
  [
    {
      stem: 'To turn "The manager reviewed the report" into passive voice, is it enough to simply swap the positions of "the manager" and "the report," giving "The report reviewed the manager"?',
      correct: 'No — passive voice requires a form of "be" plus the past participle ("The report was reviewed by the manager"), not just swapping word positions',
      wrong: 'Yes — passive voice is formed by simply swapping the subject and object positions',
    },
    {
      stem: 'In a scientific report, "The samples were tested under controlled conditions" uses passive voice. Is this automatically weaker or worse writing than an active-voice version?',
      correct: 'No — passive voice is a legitimate, often preferred choice when the ACTION matters more than who did it (common in scientific/technical writing); it is not inherently bad writing',
      wrong: 'Yes — passive voice is always a writing weakness and should never be used',
    },
    {
      stem: 'To turn "The committee approved the budget" into passive voice, is it enough to simply swap the positions, giving "The budget approved the committee"?',
      correct: 'No — the correct passive form is "The budget was approved by the committee" (be + past participle); swapping word order alone produces a different, incorrect meaning',
      wrong: 'Yes — passive voice just means putting the object where the subject was, with no other change needed',
    },
  ],
  [
    'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE, adult workplace framing with a report-review example rather than the existing everyday-sentence examples',
    'MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING, re-asked with a scientific-report example rather than the existing toy examples',
    'MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE, a second fresh example (a budget-approval sentence) forming the ladder\'s third rung',
  ],
)

const DIRECT_INDIRECT_ADULT = adultLadder(
  'eng.grammar.direct-and-indirect-speech', 'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS', 'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS',
  [
    {
      stem: 'To convert the direct quote \'The manager said, "I will review the file today"\' into indirect speech, is it enough to just remove the quotation marks, giving "The manager said I will review the file today"?',
      correct: 'No — indirect speech also requires tense backshift and pronoun changes: "The manager said [she/he] would review the file that day"; removing quotation marks alone is not sufficient',
      wrong: 'Yes — converting direct speech to indirect speech is simply a matter of deleting the quotation marks',
    },
    {
      stem: 'In reporting a universally true fact, does "The scientist said, \'Water boils at 100°C\'" still need its verb tense backshifted to "The scientist said water HAD BOILED at 100°C" in indirect speech?',
      correct: 'No — backshift is commonly skipped for statements that remain generally/universally true; "The scientist said water boils at 100°C" is the natural indirect form here',
      wrong: 'Yes — backshift to a past tense form is always required in indirect speech no matter what is being reported',
    },
    {
      stem: 'To convert the direct quote \'She said, "I am finishing the proposal"\' into indirect speech, is it enough to just remove the quotation marks, giving "She said I am finishing the proposal"?',
      correct: 'No — indirect speech needs tense backshift and pronoun adjustment: "She said she was finishing the proposal"; deleting quotation marks alone leaves it ungrammatical/incorrect as reported speech',
      wrong: 'Yes — indirect speech is created by simply dropping the quotation marks from the original sentence',
    },
  ],
  [
    'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS, adult workplace framing with a manager\'s file-review statement rather than the existing everyday-sentence examples',
    'MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS, re-asked with a universally-true scientific fact rather than the existing toy examples',
    'MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS, a second fresh example (a proposal-finishing statement) forming the ladder\'s third rung',
  ],
)

const GERUNDS_INFINITIVES_ADULT = adultLadder(
  'eng.grammar.gerunds-and-infinitives', 'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS', 'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE',
  [
    {
      stem: 'In "Reviewing contracts is part of my job," is "Reviewing" functioning the same way as it does in "I am reviewing contracts right now" (present continuous)?',
      correct: 'No — in the first sentence "Reviewing" is a gerund acting as the SUBJECT (a noun); in the second, "reviewing" is part of the present continuous VERB phrase; the same -ing form serves two different grammatical roles',
      wrong: 'Yes — an -ing word is always functioning as the present continuous tense, regardless of its position in the sentence',
    },
    {
      stem: 'In "The manager avoided discussing the issue," could "discussing" be replaced with "to discuss," giving "The manager avoided to discuss the issue," with no change in grammaticality?',
      correct: 'No — "avoid" specifically requires a gerund ("avoided discussing"), not an infinitive; gerunds and infinitives are not always freely interchangeable after every verb',
      wrong: 'Yes — gerunds and infinitives can always be swapped for each other after any verb with no grammatical difference',
    },
    {
      stem: 'In "Negotiating the contract took three weeks," is "Negotiating" functioning the same way as in "We are negotiating the contract" (present continuous)?',
      correct: 'No — in the first, "Negotiating" is a gerund acting as the sentence\'s subject (a noun); in the second, it is part of the present continuous verb; the identical -ing form plays different roles',
      wrong: 'Yes — any word ending in -ing is always part of the present continuous tense',
    },
  ],
  [
    'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS, adult workplace framing with "Reviewing contracts" as a job description rather than the existing everyday-sentence examples',
    'MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE, re-asked with "avoided discussing" rather than the existing toy examples',
    'MC-GERUND-IS-JUST-PRESENT-CONTINUOUS, a second fresh example ("Negotiating the contract" as a subject) forming the ladder\'s third rung',
  ],
)

const PARTICIPLES_ADULT = adultLadder(
  'eng.grammar.participles-and-participial-phrases', 'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN', 'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR',
  [
    {
      stem: 'In "Reviewing the contract, the lawyer noticed an error," is "Reviewing" functioning the same way as the gerund "Reviewing" in "Reviewing contracts is her job" (a noun/subject)?',
      correct: 'No — in the first sentence "Reviewing the contract" is a present PARTICIPIAL phrase modifying "the lawyer" (acting like an adjective); in the second, "Reviewing" is a gerund acting as a noun/subject; the identical -ing form plays different grammatical roles',
      wrong: 'Yes — an -ing participle and an -ing gerund are always the same grammatical thing wherever they appear',
    },
    {
      stem: 'In "Walking into the office, the coffee machine was already broken," is this dangling participle acceptable because a reader can probably guess the meaning?',
      correct: 'No — even when meaning is guessable, a dangling participle (here, illogically implying the coffee machine was walking) is still considered a genuine grammatical error to correct, not an acceptable shortcut',
      wrong: 'Yes — as long as a reader can figure out the intended meaning, a dangling participle is not really a problem worth fixing',
    },
    {
      stem: 'In "Having finished the audit, the team submitted their report," is "Having finished" functioning as a gerund (a noun/subject), the same as "Finishing the audit was satisfying"?',
      correct: 'No — "Having finished the audit" is a perfect participial phrase modifying "the team" (adjective-like); "Finishing the audit" in the second sentence is a gerund functioning as the subject; different roles despite the shared -ing/participle form',
      wrong: 'Yes — participles and gerunds are interchangeable names for the exact same grammatical function',
    },
  ],
  [
    'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN, adult workplace framing with a lawyer reviewing a contract rather than the existing everyday-sentence examples',
    'MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR, re-asked with an office/coffee-machine example rather than the existing toy examples',
    'MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN, a second fresh example (an audit report submission) forming the ladder\'s third rung',
  ],
)

const SVA_ADULT = adultLadder(
  'eng.grammar.subject-verb-agreement', 'MC-AGREE-WITH-THE-NEAREST-NOUN', 'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS',
  [
    {
      stem: 'In "The list of requirements FOR the new project ARE due tomorrow," does "requirements" (the noun closest to the verb) correctly determine the verb, making "are" correct?',
      correct: 'No — the verb must agree with the TRUE subject "list" (singular), not the nearest noun "requirements"; the correct form is "The list ... IS due tomorrow"',
      wrong: 'Yes — a verb should always agree with whichever noun sits closest to it in the sentence',
    },
    {
      stem: 'In "The committee IS meeting today" (singular verb) vs. "The committee ARE divided on the issue" (plural verb, both grammatically defensible in different English varieties treating the group as a unit or as individual members), is a collective noun like "committee" ALWAYS required to take a plural verb?',
      correct: 'No — a collective noun typically takes a singular verb when acting as one unit, and can take a plural verb (especially in British English) when emphasizing individual members acting separately; it is not always plural',
      wrong: 'Yes — collective nouns like "committee," "team," or "staff" always require a plural verb form',
    },
    {
      stem: 'In "The box of documents FOR the audit WAS/WERE left on the desk," does "documents" (the nearest noun) correctly determine the verb, making "were" correct?',
      correct: 'No — the verb must agree with "box" (the true singular subject), not "documents"; the correct form is "The box ... WAS left on the desk"',
      wrong: 'Yes — the verb should match whichever noun is physically nearest to it, regardless of which noun is the true subject',
    },
  ],
  [
    'MC-AGREE-WITH-THE-NEAREST-NOUN, adult workplace framing with a "list of requirements" example rather than the existing everyday-sentence examples',
    'MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS, re-asked with a "committee" example rather than the existing toy examples',
    'MC-AGREE-WITH-THE-NEAREST-NOUN, a second fresh example ("box of documents") forming the ladder\'s third rung',
  ],
)

const PRONOUN_ANTECEDENT_ADULT = adultLadder(
  'eng.grammar.pronoun-antecedent-agreement', 'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL', 'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR',
  [
    {
      stem: 'In "Everyone on the team must submit THEIR/THEY timesheet," is "everyone" (an indefinite pronoun) grammatically ALWAYS plural, requiring a plural verb like "submit their timesheets ARE due"?',
      correct: 'No — "everyone," like most indefinite pronouns (each, everybody, someone), is grammatically SINGULAR and traditionally takes a singular verb, even though "their" is now widely accepted as a gender-neutral singular pronoun referring to it',
      wrong: 'Yes — indefinite pronouns like "everyone" or "each" are always grammatically plural',
    },
    {
      stem: 'In a memo: "The manager told the client that HE would need to review the contract." Given that "he" could refer to either the manager or the client, is this ambiguous reference acceptable because a reader will probably figure out who is meant?',
      correct: 'No — ambiguous pronoun reference is a genuine clarity problem to fix (e.g., by naming who specifically), not something to leave because the reader "probably" can guess correctly',
      wrong: 'Yes — as long as context makes the intended meaning likely, an ambiguous pronoun reference does not need to be fixed',
    },
    {
      stem: 'In "Each employee should bring THEIR laptop," is "each" (an indefinite pronoun) grammatically ALWAYS plural?',
      correct: 'No — "each" is grammatically singular; it correctly takes a singular verb ("each employee IS required"), even while "their" is commonly used with it as a gender-neutral singular pronoun',
      wrong: 'Yes — since "each" can refer to a group, it is always grammatically plural',
    },
  ],
  [
    'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL, adult workplace framing with "everyone ... timesheet" rather than the existing everyday-sentence examples',
    'MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR, re-asked with a manager/client memo example rather than the existing toy examples',
    'MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL, a second fresh example ("each employee ... laptop") forming the ladder\'s third rung',
  ],
)

const COMPARATIVES_ADULT = adultLadder(
  'eng.grammar.comparatives-and-superlatives', 'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST', 'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES',
  [
    {
      stem: 'In a performance review, would "This quarter\'s results are more efficienter than last quarter\'s" (adding BOTH "more" and "-er") be a correct way to form a comparative?',
      correct: 'No — English uses either the "-er" suffix OR "more" before longer adjectives, never both together; the correct form here is "more efficient," not "more efficienter"',
      wrong: 'Yes — combining "more" with "-er" is an acceptable way to strengthen a comparative in formal writing',
    },
    {
      stem: 'In "This proposal is BETTER than the last one" (irregular comparative of "good"), is "better" simply an incorrect/nonstandard form that should be "more good"?',
      correct: 'No — "better" is the correct, standard irregular comparative of "good" (like "worse" for "bad"); it is not a mistake to be corrected to "more good"',
      wrong: 'Yes — any comparative that does not follow the regular "-er"/"more" pattern is a grammatical mistake',
    },
    {
      stem: 'In a report, would "This is the MOST FASTEST method we tested" (using BOTH "most" and "-est") be a correct way to form a superlative?',
      correct: 'No — English uses either the "-est" suffix OR "most," never both together; the correct form is "the fastest method"',
      wrong: 'Yes — combining "most" with "-est" is an acceptable way to emphasize a superlative in formal writing',
    },
  ],
  [
    'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST, adult workplace framing with a quarterly performance review rather than the existing everyday-sentence examples',
    'MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES, re-asked with a proposal-comparison example rather than the existing toy examples',
    'MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST, a second fresh example ("most fastest method") forming the ladder\'s third rung',
  ],
)

const CAPITALIZATION_ADULT = adultLadder(
  'eng.grammar.capitalization-rules', 'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD', 'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT',
  [
    {
      stem: 'In a company memo, should "Budget," "Strategy," and "Growth" be capitalized throughout the document simply because they sound like important business concepts?',
      correct: 'No — capitalization is not based on how "important" a word sounds; ordinary common nouns like "budget," "strategy," and "growth" stay lowercase unless they start a sentence or are part of a proper noun',
      wrong: 'Yes — words that sound important or significant should be capitalized wherever they appear',
    },
    {
      stem: 'In a multi-sentence email, does only the very FIRST word of the entire email need a capital letter, with every other sentence in the email starting lowercase?',
      correct: 'No — every new sentence throughout the email needs to start with a capital letter, not just the first sentence of the whole message',
      wrong: 'Yes — only the first word of an entire piece of writing needs to be capitalized; later sentences can start lowercase',
    },
    {
      stem: 'In a project report, should "Deadline," "Milestone," and "Objective" be capitalized throughout simply because they sound like key project-management terms?',
      correct: 'No — these remain ordinary common nouns and stay lowercase unless starting a sentence or part of a proper name (like a specific "Milestone Report" title); sounding important is not a capitalization rule',
      wrong: 'Yes — significant-sounding project terms should be capitalized every time they appear in a report',
    },
  ],
  [
    'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD, adult workplace framing with a company memo\'s "Budget"/"Strategy"/"Growth" rather than the existing everyday-sentence examples',
    'MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT, re-asked with a multi-sentence email rather than the existing toy examples',
    'MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD, a second fresh example (a project report\'s "Deadline"/"Milestone"/"Objective") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_6: SeedProbe[] = [
  ...MODALS_ADULT, ...CONDITIONALS_ADULT, ...ACTIVE_PASSIVE_ADULT, ...DIRECT_INDIRECT_ADULT,
  ...GERUNDS_INFINITIVES_ADULT, ...PARTICIPLES_ADULT, ...SVA_ADULT, ...PRONOUN_ANTECEDENT_ADULT,
  ...COMPARATIVES_ADULT, ...CAPITALIZATION_ADULT,
]
