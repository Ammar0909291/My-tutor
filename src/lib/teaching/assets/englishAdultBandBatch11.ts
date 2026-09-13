/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT CAMPAIGN — Batch 11.
 *
 * Continues Batches 1-10 (100 concepts) per the standing instruction to
 * finish all English concepts against the TRUE-gap list
 * `englishAdultBandAudit.ts` computes.
 *
 * 10 concepts (4 listening + 6 speaking, all MIDDLE-native, continuing in
 * KG order): eng.listening.following-instructions,
 * eng.listening.note-taking-while-listening,
 * eng.listening.listening-comprehension-strategies,
 * eng.listening.critical-listening, eng.speaking.oral-fluency,
 * eng.speaking.pronunciation-in-conversation, eng.speaking.conversation-skills,
 * eng.speaking.asking-and-answering-questions, eng.speaking.storytelling-orally,
 * eng.speaking.discussion-skills. 30 new ADULT-band closed-choice probes
 * (3/concept), same mcq(FOUNDATIONAL)/misconception_probe(DEVELOPING)/
 * mcq(PROFICIENT) ladder as Batches 1-10, reusing each concept's own two
 * already-registered, already-ACTIVE misconceptions (every registry checked,
 * confirmed exactly 2) via genuinely different adult-context examples
 * (workplace meetings, professional calls, business discussions) than each
 * concept's native-band probes use.
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

const FOLLOWING_INSTRUCTIONS_ADULT = adultLadder(
  'eng.listening.following-instructions', 'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH', 'MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED',
  [
    {
      stem: 'A manager says, "Before you send the report, double-check the figures, then get approval from finance, and only then email it to the client." Should an employee act on the FIRST instruction heard ("send the report") immediately, without waiting to hear the rest?',
      correct: 'No — acting on the first instruction immediately, before hearing the full set of steps, risks skipping required steps (checking figures, getting approval); it is better to hear the whole instruction before acting',
      wrong: 'Yes — acting immediately on the first instruction you hear is the correct approach to following instructions',
    },
    {
      stem: 'A colleague says, "Submit the form after you get manager sign-off, which you should request once you\'ve reviewed the budget." Are these three steps meant to be executed in the exact order they were MENTIONED (submit, then sign-off, then review), or in a different logical order?',
      correct: 'A different logical order — despite the mention order (submit/sign-off/review), the actual sequence is: review the budget first, then request sign-off, then submit; instructions aren\'t always executed in the order they\'re spoken',
      wrong: 'Yes — instructions are always executed in exactly the same order they are mentioned, regardless of the actual logical sequence',
    },
    {
      stem: 'A supervisor says, "Before you file the invoice, verify the amount, then get it stamped, and only then send it to accounting." Should an employee act on the FIRST instruction heard ("file the invoice") immediately?',
      correct: 'No — acting immediately on just the first-heard instruction risks missing required prior steps (verifying, stamping); the full instruction should be heard before acting',
      wrong: 'Yes — reacting to the first instruction heard, without waiting for the rest, is the correct approach',
    },
  ],
  [
    'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH, adult workplace framing with a report-sending sequence rather than the existing everyday-sentence examples',
    'MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED, re-asked with a form-submission/sign-off sequence rather than the existing toy examples',
    'MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH, a second fresh example (an invoice-filing sequence) forming the ladder\'s third rung',
  ],
)

const NOTE_TAKING_ADULT = adultLadder(
  'eng.listening.note-taking-while-listening', 'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD', 'MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE',
  [
    {
      stem: 'During a long client briefing, an employee tries to write down EVERY word the client says, word for word. Is this an effective note-taking strategy?',
      correct: 'No — trying to transcribe every word word-for-word is unsustainable and causes the note-taker to fall behind and miss meaning; effective notes capture key points and structure, not verbatim transcription',
      wrong: 'Yes — writing down as much as possible, word for word, is what makes for good notes',
    },
    {
      stem: 'During a strategy meeting, is jotting down random facts as they happen to come up, with no organization or hierarchy, an effective note-taking approach?',
      correct: 'No — effective notes have some structure (main points, sub-points, hierarchy) rather than being a disorganized list of random facts written down as they occur',
      wrong: 'Yes — note-taking is just writing down whatever facts come up, in no particular order or structure',
    },
    {
      stem: 'During a long training session, an employee attempts to write every word the trainer says. Is this effective note-taking?',
      correct: 'No — attempting word-for-word transcription typically causes the note-taker to fall behind and lose the overall meaning; effective notes prioritize key ideas over completeness',
      wrong: 'Yes — capturing as many exact words as possible is the mark of effective note-taking',
    },
  ],
  [
    'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD, adult workplace framing with a client briefing rather than the existing everyday-sentence examples',
    'MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE, re-asked with a strategy-meeting example rather than the existing toy examples',
    'MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD, a second fresh example (a long training session) forming the ladder\'s third rung',
  ],
)

const LISTENING_STRATEGIES_ADULT = adultLadder(
  'eng.listening.listening-comprehension-strategies', 'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME', 'MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT',
  [
    {
      stem: 'A skilled listener in a business call sometimes misses a word or two but still follows the overall conversation successfully using context. Does being a GOOD listener require understanding every single word perfectly on the first try?',
      correct: 'No — skilled listeners routinely use context and strategies to compensate for missed words; understanding every word perfectly the first time is not required to be a good listener',
      wrong: 'Yes — being a good listener means understanding every single word perfectly the first time, with no gaps',
    },
    {
      stem: 'While listening to a presentation about "declining sales," a listener predicts the next topic will be "possible causes of the decline," based on how such presentations typically proceed. Is this prediction just a random guess unrelated to evidence, or is it grounded in a reasonable pattern?',
      correct: 'It is grounded in a reasonable, evidence-based pattern — predicting based on context and typical structure is a genuine listening strategy, not the same as randomly guessing or blindly assuming you\'re right',
      wrong: 'It is just a random guess; predicting what comes next in listening always means guessing randomly or assuming you\'re automatically right',
    },
    {
      stem: 'A skilled listener on a conference call misses a phrase or two but still follows the discussion successfully. Does good listening require catching every word perfectly the first time?',
      correct: 'No — using context to fill gaps is a normal, effective listening strategy; perfect word-for-word comprehension on the first pass is not required',
      wrong: 'Yes — good listening requires perfect, word-for-word comprehension on the very first attempt',
    },
  ],
  [
    'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME, adult workplace framing with a business call rather than the existing everyday-sentence examples',
    'MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT, re-asked with a "declining sales" presentation prediction rather than the existing toy examples',
    'MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME, a second fresh example (a conference call) forming the ladder\'s third rung',
  ],
)

const CRITICAL_LISTENING_ADULT = adultLadder(
  'eng.listening.critical-listening', 'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT', 'MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL',
  [
    {
      stem: 'In a business pitch, one presenter speaks confidently and fluently but offers weak evidence, while another presenter speaks hesitantly but offers strong, well-supported reasoning. Does the confident, fluent delivery mean the first presenter is making the STRONGER argument?',
      correct: 'No — delivery confidence and argument strength are separate; a confident, fluent speaker can still make a weak argument, and a hesitant speaker can make a strong one; critical listening evaluates the reasoning, not just the delivery style',
      wrong: 'Yes — a speaker who sounds confident and fluent is automatically making the stronger, more valid argument',
    },
    {
      stem: 'A speaker supports a claim by mentioning "one anecdote from a friend" alongside "a large, peer-reviewed study." Does each piece of evidence prove the point EQUALLY well, just because both were mentioned as "evidence"?',
      correct: 'No — evidence quality varies significantly; a single anecdote provides much weaker support than a large, peer-reviewed study, even though both are technically "evidence" that was mentioned',
      wrong: 'Yes — any evidence a speaker mentions proves their point equally well, regardless of its quality or source',
    },
    {
      stem: 'In a team meeting, one colleague speaks confidently but with thin justification, while another speaks more hesitantly but with solid reasoning. Does the confident delivery mean the first colleague has the stronger argument?',
      correct: 'No — confident delivery does not equal argument strength; critical listening requires evaluating the actual reasoning and evidence, independent of how fluently it was delivered',
      wrong: 'Yes — speaking confidently and fluently automatically indicates the stronger, more credible argument',
    },
  ],
  [
    'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT, adult workplace framing with a business pitch rather than the existing everyday-sentence examples',
    'MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL, re-asked with an anecdote-vs-study comparison rather than the existing toy examples',
    'MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT, a second fresh example (a team meeting) forming the ladder\'s third rung',
  ],
)

const ORAL_FLUENCY_ADULT = adultLadder(
  'eng.speaking.oral-fluency', 'MC-FLUENCY-MEANS-ZERO-HESITATION', 'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR',
  [
    {
      stem: 'A confident, fluent speaker in a business presentation occasionally pauses briefly to think of the right word, using natural fillers like "well" or "let me put it this way." Does this brief hesitation mean the speaker is NOT genuinely fluent?',
      correct: 'No — natural pausing and occasional hesitation are normal even in fluent speech; fluency doesn\'t require zero hesitation, just smooth, effective overall communication',
      wrong: 'Yes — true fluency means speaking with absolutely zero hesitation or pausing at any point',
    },
    {
      stem: 'A fluent, effective speaker occasionally makes a small grammatical slip (e.g., a minor subject-verb agreement error) while speaking smoothly and communicating clearly. Does this small grammar error mean the speaker is not fluent?',
      correct: 'No — fluency is primarily about smooth, effective communication of meaning, not perfect grammatical accuracy; a fluent speaker can make occasional small grammar errors and still be genuinely fluent',
      wrong: 'Yes — true fluency requires perfectly correct grammar at all times, with no errors whatsoever',
    },
    {
      stem: 'A confident speaker in a meeting occasionally pauses to find the right word, using fillers like "you know" or "I mean." Does this occasional hesitation disqualify the speaker from being fluent?',
      correct: 'No — occasional natural pausing is normal in fluent speech and does not disqualify someone from being a fluent speaker',
      wrong: 'Yes — any hesitation at all means the speaker cannot be considered fluent',
    },
  ],
  [
    'MC-FLUENCY-MEANS-ZERO-HESITATION, adult workplace framing with a business presentation rather than the existing everyday-sentence examples',
    'MC-FLUENCY-REQUIRES-PERFECT-GRAMMAR, re-asked with a minor subject-verb-agreement slip rather than the existing toy examples',
    'MC-FLUENCY-MEANS-ZERO-HESITATION, a second fresh example (a meeting with occasional filler words) forming the ladder\'s third rung',
  ],
)

const PRONUNCIATION_ADULT = adultLadder(
  'eng.speaking.pronunciation-in-conversation', 'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL', 'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION',
  [
    {
      stem: 'A professional speaks English clearly and is easily understood by colleagues in meetings, but retains a noticeable non-native accent. Should sounding exactly like a native speaker be the GOAL of pronunciation practice for effective workplace communication?',
      correct: 'No — the realistic, useful goal of pronunciation is being clearly understood, not eliminating one\'s accent entirely; a noticeable accent with clear, intelligible speech is perfectly effective communication',
      wrong: 'Yes — sounding exactly like a native speaker, with no accent at all, should be the goal of pronunciation practice',
    },
    {
      stem: 'In conversation, is getting every individual sound perfectly precise MORE important for being understood than using correct word stress and sentence intonation?',
      correct: 'No — stress and intonation patterns often matter more for intelligibility than perfect individual sounds; mispronouncing stress can cause more confusion than a slightly imperfect individual sound',
      wrong: 'Yes — perfecting each individual sound matters more for being understood than stress and intonation patterns',
    },
    {
      stem: 'A speaker communicates clearly and is easily understood in professional conversations but retains a noticeable accent. Should eliminating that accent entirely be the practical GOAL of pronunciation work?',
      correct: 'No — the practical goal is clear, intelligible communication, not accent elimination; a clear, understandable accent is a fully successful outcome',
      wrong: 'Yes — the goal of pronunciation practice should be to eliminate any accent and sound exactly native',
    },
  ],
  [
    'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL, adult workplace framing with a professional colleague\'s accent rather than the existing everyday-sentence examples',
    'MC-PERFECT-INDIVIDUAL-SOUNDS-MORE-IMPORTANT-THAN-STRESS-AND-INTONATION, re-asked with a general conversational-intelligibility framing rather than the existing toy examples',
    'MC-NATIVE-LIKE-ACCENT-IS-THE-GOAL, a second fresh example (a professional speaker\'s accent) forming the ladder\'s third rung',
  ],
)

const CONVERSATION_SKILLS_ADULT = adultLadder(
  'eng.speaking.conversation-skills', 'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT', 'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG',
  [
    {
      stem: 'In a networking conversation, one person does almost all the talking while the other barely gets a word in. Does talking a lot make this a GOOD conversation?',
      correct: 'No — good conversation involves balanced turn-taking and genuine listening, not one person dominating the talk time; talking a lot is not the same as conversing well',
      wrong: 'Yes — good conversation is defined by how much one person talks; talking a lot makes for a good conversation',
    },
    {
      stem: 'During a thoughtful business discussion, there is a brief pause of silence while both people consider what was just said. Does this silence necessarily mean something has gone wrong?',
      correct: 'No — brief silences are a natural, often positive part of thoughtful conversation, giving people time to process and reflect; silence doesn\'t automatically signal a problem',
      wrong: 'Yes — any silence during a conversation always means something has gone wrong',
    },
    {
      stem: 'At a professional event, one person dominates the conversation while the other says very little. Does talking more make this a genuinely good conversation?',
      correct: 'No — a genuinely good conversation involves both people engaging and listening, not one person doing most of the talking',
      wrong: 'Yes — the person who talks more is having the better, more successful conversation',
    },
  ],
  [
    'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT, adult workplace framing with a networking event rather than the existing everyday-sentence examples',
    'MC-SILENCE-IN-A-CONVERSATION-MEANS-SOMETHING-WENT-WRONG, re-asked with a thoughtful-pause business discussion rather than the existing toy examples',
    'MC-GOOD-CONVERSATION-MEANS-TALKING-A-LOT, a second fresh example (a professional event) forming the ladder\'s third rung',
  ],
)

const ASKING_ANSWERING_ADULT = adultLadder(
  'eng.speaking.asking-and-answering-questions', 'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER', 'MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC',
  [
    {
      stem: 'In a job interview, when asked "Can you describe a time you solved a difficult problem at work?", is answering simply "Yes" a COMPLETE answer to the question?',
      correct: 'No — "Yes" only confirms that such an instance exists but doesn\'t actually answer the substance of the question, which asks for a description; a complete answer needs to provide the requested details',
      wrong: 'Yes — a simple "yes" or "no" is always a complete answer, regardless of what the question actually asked for',
    },
    {
      stem: 'In a meeting, someone asks, "What caused the delay in the shipment?" Would a response about the WEATHER in general (a topic loosely related but not actually addressing the cause) count as a good answer, just because it\'s "related to the topic"?',
      correct: 'No — a good answer must actually address what was specifically asked, not merely relate to the general topic area; a loosely related response that doesn\'t answer the specific question isn\'t a good answer',
      wrong: 'Yes — any response related to the general topic counts as a good answer to a specific question, regardless of whether it addresses what was actually asked',
    },
    {
      stem: 'In a performance review, when asked "Can you give an example of when you showed leadership?", is answering simply "Yes" a complete answer?',
      correct: 'No — this only confirms an example exists but doesn\'t provide it; a complete answer needs to actually describe the example requested',
      wrong: 'Yes — confirming with a simple "yes" fully answers a request for an example',
    },
  ],
  [
    'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER, adult workplace framing with a job interview question rather than the existing everyday-sentence examples',
    'MC-A-GOOD-QUESTION-CAN-BE-ANSWERED-WITH-ANYTHING-RELATED-TO-THE-TOPIC, re-asked with a shipment-delay/weather example rather than the existing toy examples',
    'MC-A-YES-OR-NO-ANSWER-IS-ALWAYS-A-COMPLETE-ANSWER, a second fresh example (a performance-review leadership question) forming the ladder\'s third rung',
  ],
)

const STORYTELLING_ADULT = adultLadder(
  'eng.speaking.storytelling-orally', 'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER', 'MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY',
  [
    {
      stem: 'When telling a colleague about a chaotic client meeting, does a GOOD oral story need to include every single minor detail in the exact chronological order it happened?',
      correct: 'No — an engaging oral story selects and emphasizes the most meaningful moments rather than exhaustively including every minor detail in strict order; selective focus makes a story compelling',
      wrong: 'Yes — a good oral story must include every single detail, told in the exact order events occurred',
    },
    {
      stem: 'When telling a story about a tense negotiation, is the speaker\'s VOCAL EXPRESSION (tone, pacing, emphasis) just an optional decorative extra, separate from the "real" content of the story?',
      correct: 'No — vocal expression is a genuine part of how oral storytelling conveys meaning and emotion; it is not separate decoration but part of the substance of how the story communicates',
      wrong: 'Yes — vocal expression is just an optional extra that has nothing to do with the actual content of the story',
    },
    {
      stem: 'When telling a colleague about a hectic project launch, does a good oral story need to include every minor detail in exact chronological order?',
      correct: 'No — selecting and emphasizing the meaningful moments makes a story more engaging than exhaustively listing every minor detail in order',
      wrong: 'Yes — a good oral story requires including every detail in the precise order it happened',
    },
  ],
  [
    'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER, adult workplace framing with a chaotic client meeting rather than the existing everyday-sentence examples',
    'MC-B-VOCAL-EXPRESSION-IS-AN-OPTIONAL-EXTRA-SEPARATE-FROM-THE-REAL-CONTENT-OF-THE-STORY, re-asked with a tense-negotiation story rather than the existing toy examples',
    'MC-A-A-GOOD-ORAL-STORY-INCLUDES-EVERY-DETAIL-IN-EXACT-ORDER, a second fresh example (a hectic project launch) forming the ladder\'s third rung',
  ],
)

const DISCUSSION_SKILLS_ADULT = adultLadder(
  'eng.speaking.discussion-skills', 'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA', 'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL',
  [
    {
      stem: 'In a team discussion, a participant builds on and clarifies a colleague\'s already-mentioned idea rather than introducing something brand new. Does a contribution need to introduce a completely NEW idea to be a good, valuable discussion contribution?',
      correct: 'No — building on, clarifying, or synthesizing existing ideas is just as valuable a discussion contribution as introducing something new; a good contribution doesn\'t have to be novel',
      wrong: 'Yes — a good discussion contribution must always introduce a brand-new idea that hasn\'t been mentioned yet',
    },
    {
      stem: 'In a project meeting, a team member respectfully says, "I see it differently — here\'s why I think we should consider another approach," explaining their reasoning calmly. Does disagreeing in a discussion necessarily mean being rude or confrontational?',
      correct: 'No — disagreement can be expressed respectfully and constructively, as shown here; disagreeing is not inherently rude or confrontational',
      wrong: 'Yes — disagreeing with someone in a discussion always means being rude or confrontational',
    },
    {
      stem: 'In a strategy discussion, a participant clarifies and builds on a colleague\'s already-mentioned point rather than introducing a brand-new idea. Is this still a valuable discussion contribution?',
      correct: 'Yes — clarifying, expanding, or synthesizing existing points is a genuinely valuable contribution, just as much as introducing something new',
      wrong: 'No — only introducing genuinely new ideas counts as a valuable discussion contribution',
    },
  ],
  [
    'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA, adult workplace framing with a team discussion rather than the existing everyday-sentence examples',
    'MC-DISAGREEING-MEANS-BEING-RUDE-OR-CONFRONTATIONAL, re-asked with a respectful project-meeting disagreement rather than the existing toy examples',
    'MC-A-GOOD-DISCUSSION-CONTRIBUTION-MEANS-INTRODUCING-A-NEW-IDEA, a second fresh example (a strategy discussion) forming the ladder\'s third rung',
  ],
)

export const ENGLISH_ADULT_BAND_BATCH_11: SeedProbe[] = [
  ...FOLLOWING_INSTRUCTIONS_ADULT, ...NOTE_TAKING_ADULT, ...LISTENING_STRATEGIES_ADULT,
  ...CRITICAL_LISTENING_ADULT, ...ORAL_FLUENCY_ADULT, ...PRONUNCIATION_ADULT,
  ...CONVERSATION_SKILLS_ADULT, ...ASKING_ANSWERING_ADULT, ...STORYTELLING_ADULT,
  ...DISCUSSION_SKILLS_ADULT,
]
