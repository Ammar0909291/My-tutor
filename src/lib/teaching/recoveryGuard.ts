/**
 * Recovery Guard — deterministic failure-state detection + authored
 * script retrieval.
 *
 * The Brain's most absolute law, previously left to LLM discretion:
 *  - decision-engine/03 §0  the preemption rule — a failure-state
 *                           utterance makes the teaching state irrelevant;
 *                           RECOVERY preempts everything.
 *  - foundations/04 P5      no content enters a flooded mind.
 *  - foundations/04 P20     the learner's stated internal state is ground
 *                           truth — accepted instantly, never re-inferred.
 *  - foundations/01 §3      the base script library (validate → shrink →
 *                           bank one win), per utterance.
 *  - first-lesson/05        lesson-one deltas (tighter shrinks; one
 *                           failure state per session; "I'm scared" /
 *                           "I'm stupid" / "I can't").
 *
 * Detection is deliberately conservative: strong identity utterances
 * ("I give up", "I'm stupid", "I hate maths") match anywhere; mild,
 * ambiguous ones ("I don't know", "I'm confused") match only when the
 * message is short enough to BE the utterance rather than contain it
 * incidentally ("I don't know if chapter 3 covers this" must not fire).
 * A missed detection degrades to today's behavior (LLM judgment); a
 * false fire delivers a gentle, proportionate script — the asymmetry
 * favors firing only on confident matches.
 */

export type FailureStateKey =
  | 'dont_know' | 'dont_understand' | 'confused' | 'forgot' | 'guessing'
  | 'too_hard' | 'give_up' | 'hate_subject' | 'scared' | 'stupid' | 'cant'
  // P1 (confusion-detection coverage gap): the learner isn't confused about
  // the CONCEPT — they're objecting to the teaching METHOD itself (repeated
  // Socratic questioning). Distinct failure state, distinct script: stop
  // asking, start showing, this turn and the next one.
  | 'too_many_questions'
  // P0-3: FRUSTRATION — distinct from every state above, which are all
  // honest admissions of struggle. Frustration is an affect signal (anger/
  // exasperation at the CONVERSATION, not the content) and needs a
  // different script: acknowledge briefly, apologize if the tutor caused
  // it (e.g. by repeating itself), then change strategy — never validate-
  // and-shrink like 'dont_know', never argue the point.
  | 'frustrated'

const STRONG_PATTERNS: Array<[FailureStateKey, RegExp]> = [
  ['give_up',      /\bi\s+(just\s+)?(give|gave)\s+up\b/i],
  ['stupid',       /\bi(?:'?m|\s+am)\s+(so\s+|just\s+|too\s+)?(stupid|dumb|an idiot)\b/i],
  ['scared',       /\bi(?:'?m|\s+am)\s+(really\s+|so\s+)?(scared|afraid|frightened)\b/i],
  ['hate_subject', /\bi\s+hate\s+(this|maths?|math|physics|chemistry|biology|english|reading|school|it)\b/i],
  ['too_hard',     /\b(this|it)(?:'?s|\s+is)\s+(way\s+|just\s+|really\s+)?too\s+(hard|difficult)\b/i],
  ['cant',         /\bi\s+(just\s+)?can'?t\s+do\s+(this|it|maths?|math|any of this)\b/i],
  // Absolute-ignorance signals — strong because they leave no ambiguity
  ['dont_know',    /\bi\s+(know\s+)?nothing\s+(about\s+\S+\s+)?at\s+all\b|\bi\s+know\s+absolutely\s+nothing\b/i],
  ['dont_know',    /\b(i\s+have\s+no\s+idea|no\s+clue|how\s+would\s+i\s+know)\b/i],
  // P1: the learner is objecting to the questioning itself, not the concept
  // — matches with or without a leading "I" ("why do you keep asking me
  // questions", "stop asking me so many questions", "too many questions").
  ['too_many_questions', /\bwhy\s+(do\s+you|are\s+you)\s+(keep\s+asking|asking\s+(me\s+)?so\s+many)\b/i],
  ['too_many_questions', /\b(stop|quit)\s+asking\s+(me\s+)?(so\s+many\s+)?questions\b/i],
  ['too_many_questions', /\btoo\s+many\s+questions\b/i],
  ['too_many_questions', /\bwhy\s+(do\s+you\s+)?keep\s+(quizzing|questioning|testing)\s+me\b/i],
  // P0-3: emphatic repetition/exasperation — the learner is not admitting
  // ignorance, they are objecting to being asked again ("I SAID NO",
  // "no no no", "how many times", "for the third time", "ugh", "omg").
  ['frustrated', /\bi\s+(already\s+)?(said|told\s+you)\s+no\b/i],
  ['frustrated', /\b(no[.,!]*\s+){2,}no\b/i],
  ['frustrated', /\bhow\s+many\s+times\b/i],
  ['frustrated', /\bfor\s+the\s+(second|third|fourth|fifth|\d+(st|nd|rd|th))\s+time\b/i],
  ['frustrated', /\bomg\b/i],
  ['frustrated', /\bugh+\b/i],
  // Profanity is one signal among several here, never the sole detector —
  // kept to unambiguous words to avoid false-firing on incidental subject
  // content (history/literature can legitimately mention milder words).
  ['frustrated', /\b(fuck(?:ing)?|shit|wtf|bullshit)\b/i],
]

const MILD_PATTERNS: Array<[FailureStateKey, RegExp]> = [
  ['dont_understand', /\bi\s+(really\s+|just\s+)?(don'?t|do\s+not)\s+understand\b/i],
  ['confused',        /\bi(?:'?m|\s+am)\s+(so\s+|really\s+|totally\s+)?(confused|lost)\b/i],
  ['confused',        /\b(really\s+confusing|this\s+is\s+confusing)\b/i],
  // P1: "makes no sense" was already covered elsewhere (masteryGate.ts's
  // explain-differently detector) but NOT the far more common phrasing
  // "this/that doesn't make sense" — the recovery guard, being the
  // preemptive classifier, needs it directly.
  ['confused',        /\b(this|that|it)\s+(doesn'?t|does\s+not)\s+make\s+(any\s+)?sense\b/i],
  ['confused',        /\bmakes?\s+no\s+sense\b/i],
  ['dont_know',       /\bi\s+(don'?t|do\s+not)\s+know\b/i],
  ['dont_know',       /\bi\s+know\s+nothing\b/i],
  // P1: bare "don't know" / "dunno" with no subject pronoun — a common
  // terse reply the "I ..." patterns above miss entirely. Whole-message
  // match only (never a substring) so "don't know if that's it, but..."
  // doesn't false-fire.
  ['dont_know',       /^(i\s+)?(don'?t|do\s+not|dunno)\s*(know)?[.!?…\s]*$/i],
  // P1: present-tense "don't get it" — the existing masteryGate.ts pattern
  // only matched the past tense ("didn't get it"); this is the far more
  // common live phrasing.
  ['dont_understand', /\b(i\s+)?(still\s+)?(don'?t|do\s+not)\s+get\s+(it|that|this)\b/i],
  ['forgot',          /\bi\s+(forgot|forget)\b|\bi\s+can'?t\s+remember\b/i],
  ['guessing',        /\bi(?:'?m|\s+was)\s+(just\s+)?guessing\b|\bthat\s+was\s+a\s+guess\b/i],
  // P1: a terse one-word interrogative echo, and ONLY that echo, is a
  // strong signal the learner doesn't have enough to answer with — not a
  // genuine substantive question (those come with content: "why does it
  // fall down?"). Whole-message match, optional punctuation only.
  ['dont_understand', /^(where|what|why|how)\s*[?!.…]*$/i],
]

/** Mild utterances only fire when the message is short enough to BE the
 * utterance (not merely contain it mid-paragraph). */
const MILD_MAX_LENGTH = 120

/**
 * P0-3: structural "shouting" check — deliberately NOT a phrase list.
 * Requires enough alphabetic content (>= 8 letters) and multiple words so
 * a short, legitimately-capitalized answer ("NO", "TRUE", "DNA") can never
 * misfire; requires an uppercase ratio high enough that normal sentence
 * capitalization can't trigger it by accident.
 */
function isShoutingCaps(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 8) return false
  if (!/\s/.test(text.trim())) return false
  const upper = text.replace(/[^A-Z]/g, '')
  return upper.length / letters.length >= 0.7
}

/**
 * P0-3: repeated-identical-answer check — the learner's normalized message
 * matches their own immediately preceding message. Structural, not a
 * phrase list: any content can trigger it. Trivial acknowledgements
 * ("ok", "yes") are excluded via the length floor — those are handled
 * elsewhere (masteryGate.isBareAcknowledgement) and repeating one is not
 * evidence of frustration.
 */
function isRepeatedAnswer(message: string, priorUserMessage: string | null | undefined): boolean {
  if (!priorUserMessage) return false
  const normalize = (s: string) => s.trim().toLowerCase().replace(/['’]/g, '').replace(/[.,!?…\s]+/g, ' ').trim()
  const a = normalize(message)
  const b = normalize(priorUserMessage)
  return a.length >= 4 && a === b
}

/**
 * priorUserMessage (optional, default undefined): the learner's immediately
 * preceding message, when the caller has it — enables the repeated-answer
 * check above. Omitting it (every pre-existing call site) reproduces the
 * exact prior behavior; no existing caller's result changes.
 */
export function detectFailureState(message: string, priorUserMessage?: string | null): FailureStateKey | null {
  const text = message.trim()
  for (const [key, re] of STRONG_PATTERNS) {
    if (re.test(text)) return key
  }
  if (isShoutingCaps(text)) return 'frustrated'
  if (isRepeatedAnswer(text, priorUserMessage)) return 'frustrated'
  if (text.length <= MILD_MAX_LENGTH) {
    for (const [key, re] of MILD_PATTERNS) {
      if (re.test(text)) return key
    }
  }
  return null
}

/** The authored scripts, foundations/01 §3 — validate, shrink, bank a win.
 * Each entry is the general script; the lesson-one delta swaps in
 * first-lesson/05's tighter version where one exists. */
const SCRIPTS: Record<FailureStateKey, { general: string; lessonOne?: string }> = {
  dont_know: {
    general:
      'Validate lightly ("fair enough — let\'s make it smaller"), then SHRINK ' +
      'the open question into a two-choice question. Any answer to the ' +
      'two-choice form — right or wrong — gets banked warmly ("there you go") ' +
      'and you resume one step below where the block occurred. Never press ' +
      'them to "just think harder".',
    lessonOne:
      'Shrink all the way to ECHO — not even a two-choice: "no problem — say ' +
      'it with me: ..." Echo cannot fail. A question arrived too early; do ' +
      'not ask another one this turn.',
  },
  dont_understand: {
    general:
      'Say "okay — let\'s come at it differently" with zero surprise or ' +
      'disappointment, then CHANGE REPRESENTATION entirely — a different ' +
      'channel (concrete example, demonstration, story), NEVER the same ' +
      'explanation repeated louder or slower.',
    lessonOne:
      'The only legal move is BACK TO DEMONSTRATION — show it again, slower, ' +
      'exaggerated. No re-explanation of any kind: a beginner cannot ' +
      'triangulate between two verbal explanations.',
  },
  confused: {
    general:
      'Normalize first ("that\'s the normal feeling right before this clicks"), ' +
      'then localize with EXACTLY ONE boundary question ("is it the first part ' +
      'or the second part that\'s fuzzy?"). Re-teach only the located part.',
    lessonOne:
      'Normalize and SKIP localization — a beginner cannot answer "which ' +
      'part?" about a whole they don\'t have. Go back one step silently and ' +
      'make the step smaller.',
  },
  forgot: {
    general:
      'Say "totally normal — it comes back fast" as fact, then CUED RETRIEVAL: ' +
      'give back the encoding context ("remember the pizza-slices picture?") ' +
      'and let THEM retrieve. Never re-teach from zero — storage survives; ' +
      'access is what weakened.',
  },
  guessing: {
    general:
      'REWARD THE DISCLOSURE LOUDLY: "thank you for telling me — that\'s ' +
      'exactly the useful thing to say." Their honesty is worth more than a ' +
      'lucky guess. Then step back one level: the question outran the ' +
      'teaching — that is the lesson\'s fault, never theirs.',
  },
  too_hard: {
    general:
      'Say "yeah — let\'s split it" (never contest the claim), then split off ' +
      'ONE 30-second sub-step and prove it\'s doable. When it lands: "that\'s ' +
      'the hardest part — you just did it."',
    lessonOne:
      'Split to CO-PRODUCTION: do it WITH them, voices overlapping, fading ' +
      'within the same attempt ("say it with me... again... now you finish ' +
      'it"). The proof arrives inside one breath.',
  },
  give_up: {
    general:
      'Say "okay — I\'ve got this one." NO pep talk. Hard stop on their ' +
      'attempt: YOU perform the task once, thinking aloud, with zero pressure ' +
      'to participate. Do not hand it back this turn. Insisting they try ' +
      'again right now is the fastest way to convert a bad moment into a ' +
      'shutdown.',
    lessonOne:
      'Teaching is over for this session: perform the skill once more with ' +
      'visible enjoyment, bank any tiniest win available, and close warmly ' +
      'NOW.',
  },
  hate_subject: {
    general:
      'Validate and externalize in one sentence: "that\'s a lot of bad history ' +
      'talking — this isn\'t going to be that." Target the PAST TEACHING, ' +
      'never them and never the subject as unfixable. Then find the smallest, ' +
      'most private win available right now. NO speech about why the subject ' +
      'is actually great — a first success is the only counter-argument that ' +
      'works.',
  },
  scared: {
    general:
      'NEVER say "don\'t be scared". Name it lightly, normalize it, and shrink ' +
      'the stakes to zero OUT LOUD: "lots of people feel nervous here — good ' +
      'news, there\'s nothing to get wrong today." Then demonstrate more and ' +
      'ask less; go slower, lower, quieter.',
  },
  stupid: {
    general:
      'Immediate calm contradiction WITH EVIDENCE, never reassurance: point to ' +
      'a specific thing they did minutes ago that contradicts it ("people who ' +
      'can\'t do this don\'t solve what you solved two minutes ago"). Then a ' +
      'guaranteed win within 60 seconds. Reassurance ("no you\'re not!") is an ' +
      'opinion and gets discarded; evidence sticks.',
    lessonOne:
      'Evidence-contradiction, one unfailable win, then END EARLY on that win ' +
      '— this utterance spends the whole session\'s affect budget by itself.',
  },
  cant: {
    general:
      'Handle physically, not verbally: CO-PRODUCTION immediately ("we\'ll do ' +
      'it together — you don\'t have to do anything alone yet"). Arguing with ' +
      '"I can\'t" grants it a debate; thirty seconds of doing it together ' +
      'hands them the counter-evidence: "you just did."',
  },
  // P1: the complaint is about the METHOD (Socratic questioning), not the
  // concept — do not defend the method, do not ask a clarifying question
  // about the complaint itself (that would BE another question). Acknowledge
  // once, then switch immediately to direct demonstration/explanation.
  too_many_questions: {
    general:
      'Acknowledge it plainly and briefly ("fair — let\'s switch it up"), then ' +
      'STOP asking questions. Teach the next piece directly: show or explain ' +
      'it outright, worked-example style, with no question attached to the ' +
      'end of your response. Do not ask them to predict, guess, or infer ' +
      'anything they have not already been taught — that is what triggered ' +
      'this. Earn the right to ask again only after at least one full turn ' +
      'of pure demonstration.',
    lessonOne:
      'STOP asking anything this turn and the next. Demonstrate the idea once, ' +
      'plainly, start to finish, with zero questions attached. A beginner who ' +
      'says this has been asked to infer something before being shown it.',
  },
  // P0-3: frustration (anger/exasperation at the conversation, not honest
  // struggle with the content) — never validate-and-shrink like dont_know;
  // acknowledge briefly, apologize if the tutor caused it, then switch
  // strategy outright. The forbidden move is repeating the same question
  // (verbatim or rephrased) — that IS the loop that caused this.
  frustrated: {
    general:
      'Acknowledge it briefly and plainly ("sorry — I hear you, let\'s try this ' +
      'differently"). A short apology is appropriate if you have been asking ' +
      'the same or a similar question repeatedly; do not over-apologize or ' +
      'dwell on it. Then change strategy immediately: do NOT ask the same ' +
      'question again in any form — not verbatim, not rephrased, not ' +
      'simplified. Switch to a direct demonstration or explanation with a ' +
      'concrete example instead, with no question attached to the end of ' +
      'your response. Tone: calm and steady — never defensive, never matching ' +
      'their intensity, never chiding them for how they said it.',
    lessonOne:
      'Apologize once, briefly, then STOP asking anything this turn and the ' +
      'next. Demonstrate the idea plainly, start to finish. A beginner who is ' +
      'frustrated this early needs proof the friction is over, not another ' +
      'attempt at the same question.',
  },
}

/**
 * The RECOVERY block — injected LAST, preempting every other instruction
 * (decision-engine/03 §0: the teaching state is irrelevant; foundations/04
 * P5: no content enters a flooded mind).
 *
 * sessionFailureCount drives escalation so the same script never repeats
 * indefinitely (decision-engine/05: per-failure ladders, one-dimension-per-rung).
 */
export function buildRecoveryBlock(key: FailureStateKey, isFirstLesson: boolean, sessionFailureCount = 0): string {
  const script = SCRIPTS[key]
  const body = (isFirstLesson && script.lessonOne) ? script.lessonOne : script.general

  let escalation = ''
  if (sessionFailureCount >= 4) {
    escalation =
      '\n- AFFECT BUDGET EXHAUSTED (4+ failures this session): Close this concept ' +
      'for today. Acknowledge the struggle warmly, tell the learner you will return ' +
      'to it next session, and pivot immediately to something they can succeed at ' +
      'right now. Do NOT attempt another explanation or question on this topic.'
  } else if (sessionFailureCount >= 2) {
    escalation =
      '\n- REPEATED STRUGGLE (2+ failures this session): Stop ALL questions this ' +
      'turn. Do not offer a two-choice question. Validate once ("I hear you — this ' +
      'one is stubborn"), give a SHORT demonstration of the concept yourself (show, ' +
      'don\'t ask), say "we\'ll come back to this" and move to a simpler related point.'
  }

  return (
    '\n\nRECOVERY — PREEMPTS EVERYTHING ABOVE (the student just voiced a ' +
    'failure state; their stated state is ground truth — never argue with it, ' +
    'never second-guess it, never answer it with a question):\n' +
    `- ${body}\n` +
    '- No new content this turn. No assessment. No calibration questions. ' +
    'One goal only: validate, shrink, and bank one small genuine win.\n' +
    '- Tone: calm, warm, unhurried. Do not become MORE energetic or jokey — ' +
    'matched energy; playfulness on struggle reads as mockery.' +
    escalation
  )
}
