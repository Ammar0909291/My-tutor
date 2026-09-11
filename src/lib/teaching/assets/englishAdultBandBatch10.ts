/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 10.
 *
 * Continues Batches 1-9 (90 concepts) per the standing instruction to finish
 * all English concepts against the TRUE-gap list `englishAdultBandAudit.ts`
 * computes.
 *
 * 10 concepts (6 writing + 4 listening, all MIDDLE-native, continuing in KG
 * order): eng.writing.expository-writing, eng.writing.persuasive-writing-basics,
 * eng.writing.the-writing-process, eng.writing.outlining-and-planning,
 * eng.writing.drafting, eng.writing.editing-and-proofreading,
 * eng.listening.active-listening, eng.listening.listening-for-gist,
 * eng.listening.listening-for-detail,
 * eng.listening.distinguishing-sounds-in-speech. 30 new ADULT-band
 * closed-choice probes (3/concept), same mcq(FOUNDATIONAL)/misconception_probe
 * (DEVELOPING)/mcq(PROFICIENT) ladder as Batches 1-9, reusing each concept's
 * own two already-registered, already-ACTIVE misconceptions (every registry
 * checked, confirmed exactly 2) via genuinely different adult-context
 * examples (workplace writing, professional meetings, business
 * correspondence) than each concept's native-band probes use.
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

const EXPOSITORY_ADULT = adultLadder(
  'eng.writing.expository-writing', 'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC', 'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC',
  [
    {
      stem: 'A workplace guide explaining "how our expense reporting system works" is expository writing. Should it primarily state the writer\'s personal OPINION about whether the system is good or bad?',
      correct: 'No — expository writing explains and informs objectively (how something works, why it happens); it is not primarily about stating a personal opinion, which is closer to persuasive/argumentative writing',
      wrong: 'Yes — expository writing means stating your personal opinion about the topic being explained',
    },
    {
      stem: 'To explain a complex topic like "how compound interest works" in a report, is providing just the bare definition ("compound interest is interest calculated on both principal and accumulated interest") enough, with no example or elaboration?',
      correct: 'No — a bare definition alone rarely explains a complex topic adequately; effective exposition typically needs examples, elaboration, or context to make the idea genuinely understandable',
      wrong: 'Yes — a single definition or fact is sufficient to fully explain any complex topic, no elaboration needed',
    },
    {
      stem: 'A guide explaining "how our new onboarding process works" is expository writing. Should it primarily state the writer\'s opinion about whether the process is good or bad?',
      correct: 'No — expository writing focuses on informing and explaining objectively, not primarily on the writer\'s personal opinion',
      wrong: 'Yes — expository writing is defined by stating the writer\'s opinion about the subject',
    },
  ],
  [
    'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC, adult workplace framing with an expense-reporting guide rather than the existing everyday-sentence examples',
    'MC-A-DEFINITION-OR-FACT-ALONE-IS-ENOUGH-TO-EXPLAIN-A-COMPLEX-TOPIC, re-asked with "compound interest" rather than the existing toy examples',
    'MC-EXPOSITORY-WRITING-MEANS-STATING-YOUR-OPINION-ABOUT-THE-TOPIC, a second fresh example (an onboarding-process guide) forming the ladder\'s third rung',
  ],
)

const PERSUASIVE_ADULT = adultLadder(
  'eng.writing.persuasive-writing-basics', 'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE', 'MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON',
  [
    {
      stem: 'A proposal states, IN BOLD, "This is absolutely, undeniably the BEST option, no question about it!" with no supporting evidence. Does the forceful, strong language alone make this persuasive writing?',
      correct: 'No — persuasive writing requires actual reasons and evidence supporting a claim; forceful or emphatic language alone, without support, is not genuinely persuasive',
      wrong: 'Yes — stating an opinion forcefully or with strong, emphatic language is what makes writing persuasive',
    },
    {
      stem: 'In a proposal arguing for a new vendor, is "I just personally like this vendor better" a valid REASON supporting the argument, or is it merely restating a preference without giving a reason?',
      correct: 'It is merely restating a preference — "I like it" doesn\'t explain WHY the vendor is better (cost, quality, reliability); a genuine reason gives evidence or logic, not just a repeated preference',
      wrong: 'Yes — restating that you personally prefer something counts as a valid supporting reason in persuasive writing',
    },
    {
      stem: 'A memo declares, in strong language, "Obviously, everyone agrees this is the only sensible choice!" with no supporting evidence. Does this forceful phrasing alone make the memo persuasive?',
      correct: 'No — without actual evidence or reasoning, forceful language is just assertion, not persuasion; genuine persuasive writing needs support for its claims',
      wrong: 'Yes — using forceful, confident language is sufficient by itself to make writing persuasive',
    },
  ],
  [
    'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE, adult workplace framing with a bolded proposal claim rather than the existing everyday-sentence examples',
    'MC-B-RESTATING-A-PERSONAL-PREFERENCE-COUNTS-AS-A-REASON, re-asked with a vendor-preference example rather than the existing toy examples',
    'MC-A-STATING-AN-OPINION-FORCEFULLY-OR-WITH-STRONG-LANGUAGE-MAKES-IT-PERSUASIVE, a second fresh example (a "obviously everyone agrees" memo) forming the ladder\'s third rung',
  ],
)

const WRITING_PROCESS_ADULT = adultLadder(
  'eng.writing.the-writing-process', 'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS', 'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING',
  [
    {
      stem: 'A colleague believes skilled professional writers produce a polished, final report in a single draft, with no revision needed. Is producing a finished piece in one pass typical of good writers?',
      correct: 'No — even skilled writers typically go through multiple drafts and revisions; producing a perfect final piece on the first pass is not the normal or expected writing process',
      wrong: 'Yes — good writers are able to produce a finished, polished piece of writing in a single draft, with no revision needed',
    },
    {
      stem: 'When improving a report, is REVISING (reworking content, structure, and argument for clarity and effectiveness) the same activity as EDITING (fixing grammar, spelling, and punctuation)?',
      correct: 'No — revising addresses bigger-picture content, organization, and clarity, while editing addresses surface-level correctness (grammar, spelling); they are related but distinct stages',
      wrong: 'Yes — editing and revising are simply two names for the exact same activity in the writing process',
    },
    {
      stem: 'A new employee believes an experienced writer can produce a polished final memo in one draft with no revision. Is this typical of skilled writers?',
      correct: 'No — the writing process typically involves multiple drafts and revision, even for experienced writers; a single perfect pass is not the norm',
      wrong: 'Yes — skilled, experienced writers are able to produce a finished piece in just one draft, without needing revision',
    },
  ],
  [
    'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS, adult workplace framing with a colleague\'s belief about professional report-writing rather than the existing everyday-sentence examples',
    'MC-EDITING-AND-REVISING-ARE-THE-SAME-THING, re-asked with a report-improvement framing rather than the existing toy examples',
    'MC-GOOD-WRITERS-PRODUCE-A-FINISHED-PIECE-IN-ONE-PASS, a second fresh example (a new employee\'s belief about a memo) forming the ladder\'s third rung',
  ],
)

const OUTLINING_ADULT = adultLadder(
  'eng.writing.outlining-and-planning', 'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST', 'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING',
  [
    {
      stem: 'A project manager plans a report using a simple bullet-point list of main topics rather than a formal Roman-numeral (I, A, 1, a) outline structure. Is this still a legitimate way to outline and plan writing?',
      correct: 'Yes — an outline can take many forms (bullet points, mind maps, informal lists); it does not have to follow a strict, formal Roman-numeral structure to be a valid planning tool',
      wrong: 'No — a genuine outline must follow the rigid, formal Roman-numeral (I, A, 1, a) structure; other formats don\'t count as real outlines',
    },
    {
      stem: 'A writer creates an outline for a report but discovers, while drafting, that a better organization has occurred to them. Should the outline be treated as fixed and unchangeable once drafting has begun?',
      correct: 'No — an outline is a flexible planning tool; writers commonly adjust their outline as new ideas emerge during drafting, rather than treating it as a locked, unchangeable plan',
      wrong: 'Yes — once an outline is created, it must be followed exactly and cannot be changed during the drafting process',
    },
    {
      stem: 'An employee plans a presentation using a simple informal list of topics rather than a formal Roman-numeral outline. Is this a legitimate planning approach?',
      correct: 'Yes — planning tools like informal lists or bullet points are legitimate forms of outlining; a rigid formal structure is not required',
      wrong: 'No — only a formal, structured outline with Roman numerals counts as genuine planning',
    },
  ],
  [
    'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST, adult workplace framing with a project manager\'s bullet-point plan rather than the existing everyday-sentence examples',
    'MC-ONCE-AN-OUTLINE-IS-MADE-IT-CANT-BE-CHANGED-DURING-DRAFTING, re-asked with a mid-drafting reorganization discovery rather than the existing toy examples',
    'MC-AN-OUTLINE-MUST-BE-A-RIGID-FORMAL-ROMAN-NUMERAL-LIST, a second fresh example (an informal presentation-planning list) forming the ladder\'s third rung',
  ],
)

const DRAFTING_ADULT = adultLadder(
  'eng.writing.drafting', 'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING', 'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE',
  [
    {
      stem: 'While drafting a report, a writer notices a possible grammar mistake in a sentence. Should the writer stop the entire drafting process immediately to fix that error before continuing?',
      correct: 'No — during drafting, it is generally more effective to keep the ideas flowing and fix small errors like grammar during a later editing pass, rather than stopping constantly to perfect each sentence',
      wrong: 'Yes — every error, however small, must be stopped and fixed immediately during drafting before continuing to write',
    },
    {
      stem: 'A writer gets stuck mid-draft, unsure exactly how to phrase the next paragraph perfectly. Should they stop drafting entirely until the exact right wording comes to them?',
      correct: 'No — a common, effective strategy is to write a rough placeholder version and keep moving forward, refining it later, rather than halting the whole draft waiting for the perfect wording',
      wrong: 'Yes — if a writer gets stuck, they should stop drafting completely until they know exactly what to write next',
    },
    {
      stem: 'While drafting a proposal, a writer notices what might be a spelling error mid-sentence. Should they stop the whole drafting process to fix it right away?',
      correct: 'No — minor errors like this are typically better addressed during a later editing pass; stopping constantly during drafting disrupts the flow of ideas',
      wrong: 'Yes — any error noticed during drafting, however minor, must be stopped and corrected before continuing',
    },
  ],
  [
    'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING, adult workplace framing with a report-drafting grammar slip rather than the existing everyday-sentence examples',
    'MC-IF-YOU-GET-STUCK-YOU-SHOULD-STOP-DRAFTING-UNTIL-YOU-KNOW-EXACTLY-WHAT-TO-WRITE, re-asked with a mid-paragraph phrasing block rather than the existing toy examples',
    'MC-YOU-MUST-STOP-AND-FIX-EVERY-ERROR-DURING-DRAFTING, a second fresh example (a proposal\'s mid-sentence spelling slip) forming the ladder\'s third rung',
  ],
)

const EDITING_PROOFREADING_ADULT = adultLadder(
  'eng.writing.editing-and-proofreading', 'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR', 'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS',
  [
    {
      stem: 'A report writer runs spell-check and grammar-check software before submitting. Do these automated tools reliably catch EVERY error, such as correctly-spelled words used incorrectly ("their" vs. "there") or logical inconsistencies?',
      correct: 'No — spell-check and grammar-check tools miss many errors, especially correctly-spelled-but-wrong-word mistakes and logical/factual issues; they are helpful but not sufficient on their own',
      wrong: 'Yes — spell-check and grammar-check tools reliably catch every error in a piece of writing, making additional proofreading unnecessary',
    },
    {
      stem: 'Is reading a document silently one time enough to reliably catch all proofreading errors, or do other techniques (reading aloud, reading backwards, taking a break before re-reading) genuinely help catch more?',
      correct: 'One silent read-through is often not enough — techniques like reading aloud, reading in reverse order, or returning after a break genuinely help catch errors a single silent read misses',
      wrong: 'Yes — reading a document silently one time is sufficient to catch all proofreading errors',
    },
    {
      stem: 'A writer relies entirely on their word processor\'s spell-check and grammar-check before sending an important email. Will these tools reliably catch every error, including correctly-spelled words used in the wrong context?',
      correct: 'No — automated tools miss context-dependent errors (like using the wrong correctly-spelled homophone) and logical issues; they should supplement, not replace, careful proofreading',
      wrong: 'Yes — relying entirely on spell-check and grammar-check tools is sufficient to catch every error before sending',
    },
  ],
  [
    'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR, adult workplace framing with a report writer\'s pre-submission check rather than the existing everyday-sentence examples',
    'MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS, re-asked with reading-aloud/reverse-order techniques rather than the existing toy examples',
    'MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR, a second fresh example (an important email\'s pre-send check) forming the ladder\'s third rung',
  ],
)

const ACTIVE_LISTENING_ADULT = adultLadder(
  'eng.listening.active-listening', 'MC-HEARING-EQUALS-LISTENING', 'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT',
  [
    {
      stem: 'During a meeting, an employee\'s ears register every word spoken (hearing), but their mind is elsewhere, and they cannot recall what was said afterward. Is this the same as genuinely LISTENING?',
      correct: 'No — hearing is the passive physical reception of sound, while listening requires actively attending to and processing meaning; registering sound without engagement is not the same as listening',
      wrong: 'Yes — hearing the words spoken is the same thing as listening to and understanding them',
    },
    {
      stem: 'During a colleague\'s explanation, does active listening mean staying completely silent and not interacting at all, or does it involve engaged responses like nodding, asking clarifying questions, and paraphrasing?',
      correct: 'Active listening involves engaged interaction — nodding, asking clarifying questions, paraphrasing what was heard — not simply staying silent throughout',
      wrong: 'Active listening specifically means staying completely silent while the other person speaks, with no interaction at all',
    },
    {
      stem: 'During a client call, an employee\'s ears register every word (hearing), but they are distracted and cannot summarize what the client said afterward. Is this genuine listening?',
      correct: 'No — this is hearing without processing; genuine listening requires actively attending to and comprehending the meaning of what is said',
      wrong: 'Yes — as long as the sound registers in someone\'s ears, that counts as listening',
    },
  ],
  [
    'MC-HEARING-EQUALS-LISTENING, adult workplace framing with a distracted meeting attendee rather than the existing everyday-sentence examples',
    'MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT, re-asked with a colleague-explanation example rather than the existing toy examples',
    'MC-HEARING-EQUALS-LISTENING, a second fresh example (a distracted client call) forming the ladder\'s third rung',
  ],
)

const LISTENING_GIST_ADULT = adultLadder(
  'eng.listening.listening-for-gist', 'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST', 'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING',
  [
    {
      stem: 'While listening to a colleague\'s update, an employee misses a few individual words but still grasps that "the project is behind schedule due to a supplier delay." Is understanding every single word necessary to get the general gist of a message?',
      correct: 'No — listening for gist means getting the overall meaning, which is possible even while missing some individual words; word-perfect comprehension is not required for gist understanding',
      wrong: 'Yes — you must understand every single word spoken to grasp even the general gist of a message',
    },
    {
      stem: 'Is quickly grasping the overall gist of a long meeting (what it was generally about) a LOWER-level skill than catching every specific detail (exact figures, names, dates)?',
      correct: 'No — gist listening and detailed listening are different skills suited to different purposes, not a hierarchy where one is inherently lower or easier than the other; gist listening (filtering for overall meaning while ignoring noise) is its own genuine skill',
      wrong: 'Yes — listening for the general gist is a lower, less advanced skill than listening for precise details',
    },
    {
      stem: 'While listening to a presentation, a listener misses several individual words but still understands that "sales grew this quarter due to a new marketing campaign." Is missing individual words a barrier to grasping the gist?',
      correct: 'No — the overall gist can still come through clearly even when specific words are missed; gist comprehension doesn\'t require catching every word',
      wrong: 'Yes — missing any individual words makes it impossible to understand the gist of what was said',
    },
  ],
  [
    'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST, adult workplace framing with a colleague\'s project update rather than the existing everyday-sentence examples',
    'MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING, re-asked with a meeting-gist-vs-detail framing rather than the existing toy examples',
    'MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST, a second fresh example (a sales presentation) forming the ladder\'s third rung',
  ],
)

const LISTENING_DETAIL_ADULT = adultLadder(
  'eng.listening.listening-for-detail', 'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD', 'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED',
  [
    {
      stem: 'When listening for a specific detail (like a meeting\'s exact start time) in a long announcement, does listening for detail mean trying to catch EVERY single word spoken, or targeting the specific information needed?',
      correct: 'Listening for detail means targeting and catching specific needed information (like the exact time), not necessarily catching every single word of surrounding content',
      wrong: 'Listening for detail means trying to catch and process every single word spoken in the announcement',
    },
    {
      stem: 'A listener catches four out of five key figures mentioned in a financial briefing but misses one. Does missing that one detail mean the whole listening task was a total failure?',
      correct: 'No — catching most of the needed details is still substantial success; missing one detail doesn\'t erase the value of what was successfully captured',
      wrong: 'Yes — missing even a single detail means the entire listening task is a complete failure',
    },
    {
      stem: 'When listening for a specific detail (like a shipment\'s tracking number) in a longer voicemail, does listening for detail require processing every single word of the voicemail?',
      correct: 'No — it means targeting the specific piece of information needed (the tracking number), not necessarily every word around it',
      wrong: 'Yes — listening for detail always requires catching and processing every single word spoken',
    },
  ],
  [
    'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD, adult workplace framing with a meeting-time announcement rather than the existing everyday-sentence examples',
    'MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED, re-asked with a financial-briefing figures example rather than the existing toy examples',
    'MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD, a second fresh example (a voicemail tracking number) forming the ladder\'s third rung',
  ],
)

const DISTINGUISHING_SOUNDS_ADULT = adultLadder(
  'eng.listening.distinguishing-sounds-in-speech', 'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT', 'MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH',
  [
    {
      stem: 'In a fast conference call, similar-sounding words like "affect" and "effect" both appear in contexts where either could plausibly fit grammatically. Can sentence context ALONE always reliably resolve which word was said?',
      correct: 'No — context helps but cannot always fully disambiguate similar-sounding words, especially when both could plausibly fit; relying on context alone is not always sufficient',
      wrong: 'Yes — sentence context can always be relied on to tell similar-sounding words apart, no matter the situation',
    },
    {
      stem: 'A listener can clearly distinguish "ship" from "sheep" when each word is spoken slowly and in isolation. Does that guarantee they will automatically distinguish the same pair when spoken quickly in fast, connected conversational speech?',
      correct: 'No — distinguishing sounds in careful, isolated speech does not automatically transfer to fast, connected speech, where sounds blend, reduce, and change in ways that make the same distinction much harder',
      wrong: 'Yes — if you can tell a minimal pair apart in slow, careful speech, you will automatically be able to tell it apart in fast conversational speech too',
    },
    {
      stem: 'In a rapid business call, similar-sounding words like "there" and "their" appear in contexts where either could plausibly fit. Can context alone always fully resolve which word was intended?',
      correct: 'No — context is helpful but not always fully sufficient, especially with genuinely ambiguous surrounding phrasing; similar-sounding words can still cause real confusion',
      wrong: 'Yes — sentence context alone is always enough to correctly distinguish similar-sounding words in any situation',
    },
  ],
  [
    'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT, adult workplace framing with a conference call\'s "affect"/"effect" rather than the existing everyday-sentence examples',
    'MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH, re-asked with "ship"/"sheep" rather than the existing toy examples',
    'MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT, a second fresh example (a business call\'s "there"/"their") forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_10: SeedProbe[] = [
  ...EXPOSITORY_ADULT, ...PERSUASIVE_ADULT, ...WRITING_PROCESS_ADULT, ...OUTLINING_ADULT,
  ...DRAFTING_ADULT, ...EDITING_PROOFREADING_ADULT, ...ACTIVE_LISTENING_ADULT,
  ...LISTENING_GIST_ADULT, ...LISTENING_DETAIL_ADULT, ...DISTINGUISHING_SOUNDS_ADULT,
]
