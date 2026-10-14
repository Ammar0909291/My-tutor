/**
 * THE MULTIPLE-CHOICE QUESTION, AS A MESSAGE IN THE TUTOR MAX TRANSCRIPT.
 *
 * ROOT CAUSE (traced 2026-10-13). A tutor turn that asks a multiple-choice question carries it in a SEPARATE field of
 * the chat response (`mcq`: question + options, answer key stripped by `mcqForClient`). `LessonScreen` kept that in
 * ONE React state slot, `activeMcq`, and drew it only in the floating Quick Check panel; the tutor MESSAGE (what the
 * transcript lists) held the prose alone. The moment the learner tapped an option the panel was cleared
 * (`setActiveMcq(null)`) and the option text was sent as an ordinary user message — so the transcript read
 *     Tutor: <prose, no question>   Learner: "Three pieces of equipment"
 * and the only place the question survived was the "Tutor history" log, itself a client-only list that is lost on a
 * reload. Persistence was never the gap: `appendMcqToHistoryText` already writes the question and its options onto
 * the stored assistant row (`Message.content`), so after a reload the question came back — but as undifferentiated
 * plain text at the end of the prose (and inside the "Read more" fold of a long reply), and different from the live
 * session, where it was missing altogether.
 *
 * THE FIX keeps ONE canonical timeline and ONE persistence path (no second message system, no new column):
 *   - LIVE: the served question is attached to the tutor message that asked it (`ChatMsg.mcq`), so it renders as part
 *     of that message — above whatever the learner answers next, and still there after the answer.
 *   - RESTORED: the same question is recovered from the plain-text block `appendMcqToHistoryText` wrote, split off the
 *     prose, and attached as the SAME `mcq` field — so a live turn and a reloaded turn render identically and the
 *     question is never in both the prose and the card.
 * The Quick Check panel (the answering control) and the Tutor history (the secondary review log) are untouched.
 *
 * Pure: no React, no I/O, no clock.
 */

/** A question and its options, in the order the tutor served them. The answer key is never part of this. */
export interface TranscriptMcq {
  question: string
  options: string[]
}

/**
 * The one rule for "this is a well-formed served question" — the rule `LessonScreen` has always applied before it
 * puts a question on screen: a non-empty question and 2-4 non-empty option strings. A malformed payload yields null
 * and the turn is an ordinary typed reply.
 */
export function validTranscriptMcq(raw: unknown): TranscriptMcq | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as { question?: unknown; options?: unknown }
  if (typeof r.question !== 'string' || r.question.trim() === '') return null
  if (!Array.isArray(r.options) || r.options.length < 2 || r.options.length > 4) return null
  if (!r.options.every((o) => typeof o === 'string' && o.trim() !== '')) return null
  return { question: r.question, options: r.options as string[] }
}

/** `A) text` … `D) text` — the lettered line `appendMcqToHistoryText` writes for option i. */
const OPTION_LINE = /^([A-D])\) (\S.*)$/

/**
 * Split the plain-text rendering `appendMcqToHistoryText` appends (`\n\n<question>\nA) …\nB) …`) off the END of a
 * stored tutor message.
 *
 * FAILS SAFE — returns the content untouched with `mcq: null` unless ALL of these hold: the last lines are 2-4
 * option lines lettered A, B, (C, D) in order; the line before `A)` is a non-empty line that is itself not an option
 * line; that question line starts the text or follows a blank line; and some prose remains once the block is removed
 * (an empty prose would render as the "thinking" placeholder, which is worse than a plain-text question).
 */
export function splitStoredMcq(content: string): { prose: string; mcq: TranscriptMcq | null } {
  if (typeof content !== 'string') return { prose: content, mcq: null }
  const lines = content.replace(/\s+$/, '').split('\n')
  // Walk the trailing run of option lines.
  let first = lines.length
  while (first > 0 && OPTION_LINE.test(lines[first - 1])) first--
  const optionLines = lines.slice(first)
  if (optionLines.length < 2 || optionLines.length > 4) return { prose: content, mcq: null }
  const options: string[] = []
  for (let i = 0; i < optionLines.length; i++) {
    const m = OPTION_LINE.exec(optionLines[i])
    if (!m || m[1] !== String.fromCharCode(65 + i)) return { prose: content, mcq: null }
    options.push(m[2].trim())
  }
  const q = first - 1
  if (q < 0) return { prose: content, mcq: null }
  const question = lines[q].trim()
  if (question === '' || OPTION_LINE.test(lines[q])) return { prose: content, mcq: null }
  if (q > 0 && lines[q - 1].trim() !== '') return { prose: content, mcq: null }
  const prose = lines.slice(0, q).join('\n').replace(/\s+$/, '')
  if (prose.trim() === '') return { prose: content, mcq: null }
  return { prose, mcq: { question, options } }
}

/** The part of `ChatMsg` this module reads and writes. */
interface McqCarryingMessage {
  role: 'user' | 'assistant'
  content: string
  mcq?: TranscriptMcq
}

/**
 * Restored (persisted) history → transcript messages: every ASSISTANT message whose stored text ends with the
 * appended question block gets that question as `mcq` and the block removed from `content`. USER messages (the
 * learner's answers and free text), messages that already carry `mcq`, and messages without a block are returned
 * as the very same objects. Order and length never change; a message is never moved to another position.
 */
export function withRestoredMcq<T extends McqCarryingMessage>(msgs: T[]): T[] {
  return msgs.map((m) => {
    if (m.role !== 'assistant' || m.mcq) return m
    const { prose, mcq } = splitStoredMcq(m.content)
    return mcq ? { ...m, content: prose, mcq } : m
  })
}
