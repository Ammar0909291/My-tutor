/**
 * "QUIZ ME" GETS A QUESTION OR IS TOLD WHY NOT (Issue B, 2026-10-10).
 *
 * Production re-drive (docs/qa/LIVE_REDRIVE_2026-10-10.md): 3 of 62 explicit
 * "quiz me" turns (`phys.meas.units` twice, `chem.elect.batteries`) shipped a
 * worked example and no card — the gate had declined at DEMONSTRATE to keep
 * the authored cards for the mastery check, and model-written cards are no
 * longer served (owner decision 2026-10-07). The gate now spends a reserved
 * card on an explicit request (route, `quiz-request-spends-reserved-card`);
 * this module words the reply for the cases that still ship without a NEW
 * card, so the learner is never handed a worked example as if it were the quiz:
 *  - the card on screen is the one still unanswered → say it is the same one;
 *  - every authored card for the concept is used → say so;
 *  - no card could be given for any other reason → say so.
 * It never writes a question, never grades and never touches the card. Pure.
 */

export type QuizRequestReason =
  | 'card-served'
  | 'unanswered-card-reoffered'
  | 'no-card-pool-exhausted'
  | 'no-card-available'

export const QUIZ_UNANSWERED_LEAD =
  'This is the question you have not answered yet — choose an answer below and I will mark it.'

/**
 * Production re-drive on cf79346 (bio.behav.innate-behavior-instinct, 2026-10-10):
 * "give me a quiz" at DEMONSTRATE was told every question was used, and the
 * very next "quiz me" (at GUIDE) brought back a question answered wrong
 * earlier — the owner-approved one re-ask of a missed question (G2, 2026-09-24),
 * which runs only from GUIDE on. Both lines now say so: the exhausted line
 * mentions that seen questions come back once more (when one is waiting), and
 * a re-asked card is introduced as one seen before. Allocation is unchanged.
 */
export function quizPoolExhaustedLead(conceptTitle: string | null | undefined, reaskLater = false): string {
  const on = conceptTitle ? ` on ${conceptTitle}` : ''
  if (reaskLater) {
    return `You have answered every new practice question I have${on} in this lesson. `
      + 'A question you have already seen comes back once more after a little more teaching. '
      + 'Say "next" to move on, or tell me which part you want to go over.'
  }
  return `You have answered every practice question I have${on} in this lesson, so I can't give you a new one. `
    + 'Say "next" to move on, or tell me which part you want to go over.'
}

/** The teaching floor's own exhausted line (it then teaches the idea again). */
export function quizPoolExhaustedFloorLead(conceptTitle: string, reaskLater = false): string {
  return reaskLater
    ? `You have answered every new practice question I have on ${conceptTitle} in this lesson; a question you have already seen comes back once more a little later. Here is the idea once more.`
    : `You have answered every practice question I have on ${conceptTitle} in this lesson, so here is the idea once more.`
}

export const QUIZ_REASK_LEAD = 'You have seen this question before in this lesson — here it is once more.'

/** A re-asked card is introduced as one the learner has seen. Idempotent. */
export function labelReaskedCard(reply: string): { text: string; changed: boolean } {
  const t = (reply ?? '').trim()
  if (t.startsWith(QUIZ_REASK_LEAD)) return { text: reply, changed: false }
  return { text: t ? `${QUIZ_REASK_LEAD}\n\n${t}` : QUIZ_REASK_LEAD, changed: true }
}

export function quizUnavailableLead(conceptTitle: string | null | undefined): string {
  const on = conceptTitle ? ` on ${conceptTitle}` : ''
  return `I don't have a practice question I can give you${on} right now, so here is the idea instead. `
    + 'Say "next" when you are ready to keep going.'
}

/**
 * THE MODEL REFUSES A CARD THE APP IS ABOUT TO SHOW (live, 2026-10-14, Carnot Cycle).
 *
 * The model is told never to write a quiz question (AUTHORED_ONLY_INSTRUCTION — only the app's reviewed cards are asked). A learner
 * who types "ask me a multiple choice question" therefore got "I'm sorry—I can't give a multiple-choice question…" in the tutor's
 * message while the Quick Check panel opened with a question at the same moment: two statements that cannot both be true. When a
 * card IS attached this turn, a short apology-or-refusal paragraph about not giving a multiple-choice question / quiz is replaced
 * by one line introducing the card. Anything longer, or not a refusal, is left alone; a turn with no card attached keeps its
 * honest "I don't have a practice question" lead (see below).
 */
export const QUIZ_CARD_INTRO = 'Here is a quick check — choose an answer below.'
const REFUSAL_WORD_RE = /\b(?:sorry|apologi[sz]e|unfortunately|unable|not able|can(?:no|['’])t|cannot|won['’]?t be able)\b/i
const QUIZ_WORD_RE = /\b(?:multiple[- ]choice|mcq|quiz|quick check|practice question|question card)\b/i
const MAX_REFUSAL_PARAGRAPH = 320

export function replaceQuizRefusal(reply: string, intro: string = QUIZ_CARD_INTRO): { text: string; changed: boolean } {
  if (typeof reply !== 'string' || reply.trim() === '') return { text: reply, changed: false }
  const paragraphs = reply.split(/\n{2,}/)
  let replaced = false
  const kept: string[] = []
  for (const p of paragraphs) {
    const t = p.trim()
    const refusal = t.length > 0 && t.length <= MAX_REFUSAL_PARAGRAPH && REFUSAL_WORD_RE.test(t) && QUIZ_WORD_RE.test(t)
    if (!refusal) { kept.push(p); continue }
    // the first refusal becomes the intro (or nothing when the caller already adds its own lead); later ones are dropped
    if (!replaced && intro) kept.push(intro)
    replaced = true
  }
  return replaced ? { text: kept.join('\n\n'), changed: true } : { text: reply, changed: false }
}

/** Leads this module or the teaching floor already wrote — never added twice. */
const ALREADY_SAID_RE = /^(?:This is the question you have not answered yet|You have answered every (?:new )?practice question|I don't have a practice question I can give you)/i

export function quizRequestNotice(input: {
  cardAttached: boolean
  cardIsTheUnansweredOne: boolean
  poolExhausted: boolean
  conceptTitle: string | null | undefined
  reply: string
  /** A question already seen is still waiting for its one re-ask (blocked this turn by phase). */
  reaskLater?: boolean
}): { text: string; changed: boolean; reason: QuizRequestReason } {
  const reply = (input.reply ?? '').trim()
  if (input.cardAttached && !input.cardIsTheUnansweredOne) {
    const fixed = replaceQuizRefusal(input.reply)
    return { text: fixed.text, changed: fixed.changed, reason: 'card-served' }
  }
  if (ALREADY_SAID_RE.test(reply)) {
    return {
      text: input.reply, changed: false,
      reason: input.cardAttached ? 'unanswered-card-reoffered' : input.poolExhausted ? 'no-card-pool-exhausted' : 'no-card-available',
    }
  }
  if (input.cardAttached) {
    const body = replaceQuizRefusal(reply, '').text.trim()
    return { text: body ? `${QUIZ_UNANSWERED_LEAD}\n\n${body}` : QUIZ_UNANSWERED_LEAD, changed: true, reason: 'unanswered-card-reoffered' }
  }
  const lead = input.poolExhausted ? quizPoolExhaustedLead(input.conceptTitle, input.reaskLater === true) : quizUnavailableLead(input.conceptTitle)
  return {
    text: reply ? `${lead}\n\n${reply}` : lead,
    changed: true,
    reason: input.poolExhausted ? 'no-card-pool-exhausted' : 'no-card-available',
  }
}
