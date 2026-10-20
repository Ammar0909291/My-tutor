/**
 * A REQUEST FOR A PICTURE THAT CANNOT BE MET MUST STILL GET AN EXPLANATION.
 *
 * ── THE FINDING (hard-concept learner run, 2026-10-20, four concepts in three subjects) ─────────
 * The learner asked "Can you show me a diagram of this?" and no figure could be served (the generator's critic rejected the figure,
 * or the concept has none). The model, told the screen is empty, still drafted a diagram — ASCII art, or "the left box shows …" —
 * and the clean-up steps did their job: the unbacked ASCII art was removed (asciiDiagramGuard) and the sentences that describe a
 * figure that is not there were removed (stripPhantomVisualClaims). What was left reached the learner as:
 *
 *   I don't have a picture for this one, so I'll explain it in words.
 *   y
 *   Imagine this picture: the bold curve C encloses the region D …                      (math.calc.greens-theorem)
 *
 *   I don't have a picture for this one, so I'll explain it in words.
 *   A + B ⇌ I (fast pre-equilibrium)                                                   (chem.kinet.mechanism)
 *
 *   I don't have a picture for this one …   - Social Factors: the left box shows …     (eng.linguistics.sociolinguistics-intro)
 *
 * — a stray axis letter, a single line of a mechanism, or a description of boxes that do not exist: the honest sentence, followed
 * by an explanation that was cut to nothing. The learner asked for help understanding and got neither a picture nor the words.
 *
 * THE FIX IS ONE REGENERATION, THE SAME SHAPE AS `repairStubReply` (route.ts): when the picture request is unmet AND what is left of
 * the reply is not an explanation, ask the model once more for the explanation IN WORDS, with the constraint stated, and keep the
 * retry only if it really is one. Never invented here: the retry is the model's own words under the same system prompt, and a retry
 * that is itself a stub, asks a question, or still describes a figure is discarded (the reply is then left as it was).
 *
 * Pure and total: nothing here calls a model.
 */

import { isPhantomVisualClaim } from '../visualRegistry'

/** The shortest reply that can count as an explanation in words (a stub is a line or two; a real answer names several things). */
export const MIN_EXPLANATION_CHARS = 320

/** Remove what a stripped diagram leaves behind: lines of one or two characters (an axis letter, a bullet, "|"), and blank runs. */
export function withoutDiagramDebris(text: string): string {
  return (typeof text === 'string' ? text : '')
    .split('\n')
    .filter((line) => line.trim().length === 0 || line.trim().replace(/[^\p{L}\p{N}]/gu, '').length > 2 || /[=⇌→]/.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Split a sentence-ish list into the sentences that survive the phantom-claim test. */
function sentencesOf(text: string): string[] {
  return text.split(/(?<=[.!?])\s+(?=\S)|\n+/).map((s) => s.trim()).filter(Boolean)
}

/**
 * True when the reply to an UNMET picture request does not explain anything: too short once the debris is gone, or still describing
 * a figure that is not there. `text` is the reply BEFORE the "I don't have a picture" line is added.
 */
export function pictureReplyIsNotAnExplanation(text: string): boolean {
  const body = withoutDiagramDebris(text)
  if (body.length < MIN_EXPLANATION_CHARS) return true
  const sentences = sentencesOf(body)
  if (sentences.length === 0) return true
  // Still talking about the figure: more than a third of the sentences describe a picture, a box or an arrow.
  const phantom = sentences.filter((s) => isPhantomVisualClaim(s) || /\bimagine this (picture|diagram|figure)\b/i.test(s)).length
  return phantom / sentences.length > 1 / 3
}

/** The instruction appended to the system prompt for the one retry. */
export function buildNoPictureRepairAppendix(): string {
  return (
    '\n\nPICTURE REQUEST THAT CANNOT BE MET (mandatory for THIS reply): the learner asked to see a diagram or picture and NONE can be shown on the screen. '
    + 'Do the job the diagram would have done, IN WORDS: in 5 to 8 sentences of plain prose, name each part of the idea and say how the parts connect or what happens in order, '
    + 'using one concrete example if it helps. Do NOT draw anything: no ASCII or box art, no arrows made of characters, no fenced block, no table of boxes. '
    + 'Do NOT say or imply that a picture, diagram, figure, box, arrow or screen exists ("this picture shows", "the left box", "as you can see", "look at"). '
    + 'Do NOT say you cannot draw or have no picture (that is added separately). Do NOT ask the learner a question. Do not begin a new topic.'
  )
}

/**
 * Judge the retry. It replaces the reply only when it is long enough to be an explanation, asks nothing, and does not describe a
 * figure; otherwise null (the caller keeps what it had).
 */
export function acceptNoPictureRepair(retry: string): string | null {
  // The fence is looked for on the RAW retry: the debris filter would drop a bare ``` line before it was seen.
  if (/```/.test(retry)) return null
  const body = withoutDiagramDebris(retry)
  if (/\?/.test(body)) return null
  if (pictureReplyIsNotAnExplanation(body)) return null
  return body
}
