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

export function quizPoolExhaustedLead(conceptTitle: string | null | undefined): string {
  const on = conceptTitle ? ` on ${conceptTitle}` : ''
  return `You have answered every practice question I have${on} in this lesson, so I can't give you a new one. `
    + 'Say "next" to move on, or tell me which part you want to go over.'
}

export function quizUnavailableLead(conceptTitle: string | null | undefined): string {
  const on = conceptTitle ? ` on ${conceptTitle}` : ''
  return `I don't have a practice question I can give you${on} right now, so here is the idea instead. `
    + 'Say "next" when you are ready to keep going.'
}

/** Leads this module or the teaching floor already wrote — never added twice. */
const ALREADY_SAID_RE = /^(?:This is the question you have not answered yet|You have answered every practice question|I don't have a practice question I can give you)/i

export function quizRequestNotice(input: {
  cardAttached: boolean
  cardIsTheUnansweredOne: boolean
  poolExhausted: boolean
  conceptTitle: string | null | undefined
  reply: string
}): { text: string; changed: boolean; reason: QuizRequestReason } {
  const reply = (input.reply ?? '').trim()
  if (input.cardAttached && !input.cardIsTheUnansweredOne) return { text: input.reply, changed: false, reason: 'card-served' }
  if (ALREADY_SAID_RE.test(reply)) {
    return {
      text: input.reply, changed: false,
      reason: input.cardAttached ? 'unanswered-card-reoffered' : input.poolExhausted ? 'no-card-pool-exhausted' : 'no-card-available',
    }
  }
  if (input.cardAttached) {
    return { text: reply ? `${QUIZ_UNANSWERED_LEAD}\n\n${reply}` : QUIZ_UNANSWERED_LEAD, changed: true, reason: 'unanswered-card-reoffered' }
  }
  const lead = input.poolExhausted ? quizPoolExhaustedLead(input.conceptTitle) : quizUnavailableLead(input.conceptTitle)
  return {
    text: reply ? `${lead}\n\n${reply}` : lead,
    changed: true,
    reason: input.poolExhausted ? 'no-card-pool-exhausted' : 'no-card-available',
  }
}
