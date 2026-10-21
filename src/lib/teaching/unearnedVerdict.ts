/**
 * A VERDICT ON AN ANSWER THAT WAS NEVER GIVEN IS REMOVED.
 *
 * ── THE DEFECT (production, 2026-10-21, learner-experience run, two subjects) ────────────────────────────────────────────────────────
 * The learner wrote "Got it. Can I try a practice question?" — no answer to anything — and the engine attached its own card. The reply opened:
 *
 *   physics   "That's correct—you've seen that the allowed energies are given by Eₙ = (n + ½) ℏ ω, so each step up adds exactly one ℏ ω."
 *   biology   "That's right—you've linked the label at the bottom, 'Sustained proliferative signalling', to the idea that cancer cells keep telling themselves to divide."
 *
 * Nothing had been graded, and the learner had linked nothing. The model, told to write a lead-in, wrote one as if it were the reply to an
 * answer. A learner reads "That's correct" as a grade, and the next real card then looks harder than it should.
 *
 * ── WHAT THIS DOES ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * On a turn where the ENGINE's own card is attached, no answer was graded, and the model was told to write only a lead-in, a sentence that opens
 * with a verdict ("That's correct", "That's right", "Exactly", "Well done", "Correct —") is dropped WHOLE. Never rewritten: a sentence that starts
 * with a false verdict also carries a false attribution ("you've linked …"), and composing a corrected one would be new content. Never applied
 * to a turn that graded an answer, to a turn the model answers the learner's own message on, or to a verdict that is not the opening of a sentence.
 *
 * Pure and total.
 */

/** A sentence that BEGINS with a verdict on the learner's answer. */
const VERDICT_OPENING = new RegExp(
  '^(?:(?:yes|great|exactly|right|good|nice|perfect|okay|ok)[,.!—–-]?\\s+)*'
  + '(?:(?:that\'?s|that\\s+is|this\\s+is|it\'?s)\\s+(?:absolutely\\s+|exactly\\s+|completely\\s+|totally\\s+|quite\\s+)?(?:right|correct)\\b'
  + '|(?:you\'?re|you\\s+are)\\s+(?:absolutely\\s+|exactly\\s+|completely\\s+)?(?:right|correct)\\b'
  + '|(?:correct|exactly(?:\\s+right)?|well\\s+done|good\\s+job|nicely\\s+done|nice\\s+work|spot\\s+on|good\\s+answer)(?=[\\s,.!—–-]|$))',
  'i',
)

export const isUnearnedVerdictSentence = (sentence: string): boolean => VERDICT_OPENING.test((sentence ?? '').trim().replace(/^[*_>\s-]+/, '').replace(/[\u2018\u2019]/g, "'"))

export function dropUnearnedVerdict(text: string): { text: string; dropped: string[] } {
  const dropped: string[] = []
  const paragraphs = (typeof text === 'string' ? text : '').split(/\n{2,}/).map((para) => {
    const sentences = para.split(/(?<=[.!?])\s+(?=\S)/)
    const kept = sentences.filter((s) => {
      if (isUnearnedVerdictSentence(s)) { dropped.push(s); return false }
      return true
    })
    return kept.join(' ').trim()
  })
  if (dropped.length === 0) return { text, dropped }
  return { text: paragraphs.filter((p) => p.length > 0).join('\n\n'), dropped }
}
