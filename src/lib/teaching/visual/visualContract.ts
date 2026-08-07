/**
 * The Visual Teaching Contract — the prompt block built FROM the decision.
 *
 * This is the inversion that makes V2 work. Previously the prompt asked the
 * model to decide whether a visual existed ("emit the VISUAL:<type> tag if…"),
 * and when the registry had no row it told the model to draw ASCII instead.
 * The model was therefore the last word on whether a learner saw a picture.
 *
 * Now the decision is already made and already attached to the response. The
 * prompt's only job is to tell the model what the learner is about to SEE, so
 * it teaches to that figure instead of describing an imaginary one.
 */

import { clamp } from './conceptText'
import type { EducationalPurpose, VisualDecision } from './types'

const PURPOSE_INSTRUCTION: Record<EducationalPurpose, string> = {
  explain:     'Use the figure to carry the explanation. Point at its parts in the order they matter.',
  compare:     'Use the figure to contrast the two cases. Name what differs and why it matters.',
  demonstrate: 'Walk the learner through the figure step by step. Show, do not define.',
  explore:     'Invite the learner to look at the figure and notice something before you explain it.',
  derive:      'Use the figure to build the result. Let each step follow visibly from the last.',
  simulate:    'Narrate what the figure is doing as it moves. Tie the motion to the underlying rule.',
  review:      'Use the figure to recall what was already learned. Prompt before telling.',
}

/**
 * Build the block injected into the system prompt.
 *
 * Returns '' when there is nothing to say (no decision) so callers can append
 * unconditionally.
 */
export function buildVisualContractBlock(decision: VisualDecision | null): string {
  if (!decision) return ''

  // ── Emergency path: no graphic could be produced ──────────────────────────
  // This is the ONLY place ASCII is ever requested, and it is reached only when
  // resolveVisual() exhausted the registry AND every archetype in the ladder.
  if (!decision.graphical) {
    return (
      '\n\nVISUAL CONTRACT: NO FIGURE AVAILABLE (exceptional). ' +
      'No graphical visualization could be produced for this request, so you ' +
      'must build the picture in words: a labelled ASCII figure, or a precise ' +
      'step-by-step spatial description ("imagine a horizontal line; on its ' +
      'left end…"). Keep it small and labelled. Do not claim a diagram is ' +
      'displayed on screen — none is.'
    )
  }

  const what = decision.conceptTitle ? `"${clamp(decision.conceptTitle, 60)}"` : 'this concept'
  const lines: string[] = []

  lines.push(
    '\n\nVISUAL CONTRACT: A FIGURE IS ALREADY BEING RENDERED ON THE LEARNER\'S SCREEN.',
  )
  lines.push(
    `A ${decision.representation ?? 'diagram'} of ${what} is attached to THIS response ` +
    'and the learner can see it right now. It was selected by the teaching ' +
    'engine, not by you.',
  )
  lines.push(PURPOSE_INSTRUCTION[decision.purpose])

  // Hard prohibitions — each one closes a specific observed production failure.
  lines.push(
    'RULES: (1) Do NOT draw an ASCII diagram — a real figure is already ' +
    'displayed and a second one competes with it. (2) Do NOT say "imagine" or ' +
    '"picture in your mind" — they are LOOKING at it. (3) Do NOT promise a ' +
    'diagram in future tense ("here is a diagram I would draw") — it is ' +
    'already there. (4) Refer to it directly: "look at the arrow", "notice ' +
    'where the two lines meet". (5) Keep the words short — the figure leads, ' +
    'the words support it.',
  )

  // CONTINUITY. The same figure persisting across turns is the normal case in a
  // real lesson: the tutor asks, the learner answers, the tutor corrects — all
  // against ONE diagram. Saying so stops the model from narrating a new figure
  // ("here is another diagram") when nothing on screen actually changed.
  const held = (decision.session?.turns ?? 0) > 0
  if (held) {
    lines.push(
      'CONTINUITY: this is the SAME figure that was already on screen last ' +
      'turn — it has not changed and has not been redrawn. Continue the ' +
      'current explanation against it. Do not re-introduce it, do not ' +
      'announce a new diagram, and do not describe it from scratch.',
    )
  }

  if (decision.excursion) {
    lines.push(
      `CONCEPT EXCURSION: the learner asked about ${what}, which is NOT the ` +
      'current lesson\'s concept. Teach what they asked, using the figure. ' +
      'The figure STAYS on this concept for the whole excursion — through ' +
      'your questions, their answers, and any correction — so keep teaching ' +
      `${what} until they signal they are done. When they are satisfied, ` +
      'offer to return to the lesson; do not force them back mid-explanation, ' +
      'and do not refuse the excursion.',
    )
  }

  return lines.join(' ')
}
