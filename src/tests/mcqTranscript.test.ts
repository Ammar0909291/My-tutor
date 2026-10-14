/**
 * THE MULTIPLE-CHOICE QUESTION IN THE TUTOR MAX TRANSCRIPT — the pure rules.
 *
 * Defect (traced 2026-10-13): a served question lived only in the floating Quick Check panel's state. Tapping an
 * option cleared the panel and sent the option text as an ordinary user message, so the transcript read
 * "Tutor prose, Learner answer" with the question missing; after a reload the question came back as undifferentiated
 * trailing text of the tutor row (`appendMcqToHistoryText`), and live and reloaded views disagreed.
 *
 * `mcqTranscript.ts` is the one place that decides what a question message looks like: a live turn attaches the
 * served question to the tutor message, a reload recovers the SAME shape from the persisted text. These tests drive
 * that module against the REAL writer (`appendMcqToHistoryText`) so the two ends cannot drift apart.
 */
import { describe, expect, it } from 'vitest'
import { appendMcqToHistoryText, type TutorMCQ } from '@/lib/teaching/mcq'
import { splitStoredMcq, validTranscriptMcq, withRestoredMcq, type TranscriptMcq } from '@/lib/learn/mcqTranscript'

interface Msg { id: string; role: 'user' | 'assistant'; content: string; mcq?: TranscriptMcq }

const Q1: TutorMCQ = {
  question: 'Which of these is a vector quantity?',
  options: ['Speed', 'Velocity', 'Distance', 'Time'],
  correctIndex: 1,
}
const Q2: TutorMCQ = {
  question: 'A car travels 100 m in 20 s. What is its average speed?',
  options: ['2 m/s', '5 m/s', '20 m/s'],
  correctIndex: 1,
}
const PROSE1 = 'Velocity has a direction as well as a size. Let us check that idea.'
const PROSE2 = 'Good. Speed is distance divided by time.'

/** What the server persists for a tutor turn that asked `q` — through the real writer. */
const stored = (prose: string, q: TutorMCQ | null) => appendMcqToHistoryText(prose, q)

describe('validTranscriptMcq — the rule for "a well-formed served question"', () => {
  it('accepts a question with 2, 3 or 4 non-empty options and keeps their order', () => {
    expect(validTranscriptMcq({ question: 'Q?', options: ['a', 'b'] })).toEqual({ question: 'Q?', options: ['a', 'b'] })
    expect(validTranscriptMcq({ question: 'Q?', options: ['a', 'b', 'c', 'd'] })?.options).toEqual(['a', 'b', 'c', 'd'])
  })

  it('never carries the answer key or any other field through (only question + options)', () => {
    const v = validTranscriptMcq({ question: 'Q?', options: ['a', 'b'], correctIndex: 1, renderId: 'x', explanation: 'secret' })
    expect(Object.keys(v ?? {}).sort()).toEqual(['options', 'question'])
  })

  it.each([
    ['null', null],
    ['a string', 'Q? A) a B) b'],
    ['no question', { options: ['a', 'b'] }],
    ['blank question', { question: '   ', options: ['a', 'b'] }],
    ['one option', { question: 'Q?', options: ['a'] }],
    ['five options', { question: 'Q?', options: ['a', 'b', 'c', 'd', 'e'] }],
    ['a blank option', { question: 'Q?', options: ['a', ' '] }],
    ['a non-string option', { question: 'Q?', options: ['a', 2] }],
    ['options not an array', { question: 'Q?', options: 'a,b' }],
  ])('rejects %s (the turn is then an ordinary typed reply)', (_n, raw) => {
    expect(validTranscriptMcq(raw)).toBeNull()
  })
})

describe('splitStoredMcq — recovering the question from the persisted row', () => {
  it('round-trips what appendMcqToHistoryText wrote: prose back verbatim, question and every option in order', () => {
    const { prose, mcq } = splitStoredMcq(stored(PROSE1, Q1))
    expect(prose).toBe(PROSE1)
    expect(mcq).toEqual({ question: Q1.question, options: Q1.options })
  })

  it('round-trips a 3-option question and a multi-paragraph prose body', () => {
    const body = 'First paragraph.\n\nSecond paragraph with a list:\n- one\n- two'
    const { prose, mcq } = splitStoredMcq(stored(body, Q2))
    expect(prose).toBe(body)
    expect(mcq).toEqual({ question: Q2.question, options: Q2.options })
  })

  it('the options keep the order the tutor served them (never re-sorted or re-lettered)', () => {
    const q: TutorMCQ = { question: 'Pick one?', options: ['zebra', 'apple', 'mango', 'kiwi'], correctIndex: 0 }
    expect(splitStoredMcq(stored('Intro.', q)).mcq?.options).toEqual(['zebra', 'apple', 'mango', 'kiwi'])
  })

  it('a reply with no question block is returned untouched', () => {
    const plain = 'That is correct — velocity is a vector.'
    expect(splitStoredMcq(plain)).toEqual({ prose: plain, mcq: null })
  })

  it('FAILS SAFE: never invents a question from prose that merely contains lettered lines', () => {
    for (const text of [
      'Options:\nA) one\nB) two',                       // no question line before A) and nothing else
      'See below.\nA) one\nB) two',                     // the line before A) has no blank line above it
      'Q?\nB) one\nC) two',                             // does not start at A
      'Q?\nA) one\nC) two',                             // skips B
      'Q?\nA) one',                                     // only one option
      'Q?\nA) one\nB) two\nC) three\nD) four\nE) five', // five lettered lines
      'Some prose.\n\nQ?\nA) one\nB) two\nand then more prose', // the block is not at the end
    ]) {
      expect(splitStoredMcq(text), JSON.stringify(text)).toEqual({ prose: text, mcq: null })
    }
  })

  it('FAILS SAFE: a message that is only a question block (no prose) stays as plain text, never an empty bubble', () => {
    const only = 'What is 2+2?\nA) 3\nB) 4'
    expect(splitStoredMcq(only)).toEqual({ prose: only, mcq: null })
  })

  it('ignores trailing whitespace the database may add', () => {
    expect(splitStoredMcq(stored(PROSE1, Q1) + '\n\n  ').mcq?.question).toBe(Q1.question)
  })

  it('a question whose prose already contained it is stored once and stays plain text (no duplicate card)', () => {
    // appendMcqToHistoryText skips the append when the prose already asks the question, so there is no trailing block.
    const asked = `${Q1.question}\nPick one of the four.`
    expect(stored(asked, Q1)).toBe(asked)
    expect(splitStoredMcq(asked).mcq).toBeNull()
  })
})

describe('withRestoredMcq — a persisted conversation, rebuilt', () => {
  /** Tutor asks Q1 → learner answers → tutor feedback + asks Q2 → learner answers → tutor feedback. */
  const history = (): Msg[] => [
    { id: 't1', role: 'assistant', content: stored(PROSE1, Q1) },
    { id: 'u1', role: 'user', content: 'Velocity' },
    { id: 't2', role: 'assistant', content: stored(PROSE2, Q2) },
    { id: 'u2', role: 'user', content: '5 m/s' },
    { id: 't3', role: 'assistant', content: 'Yes — 100 / 20 = 5 m/s.' },
  ]

  it('keeps the order and the length: nothing is added, removed or moved', () => {
    const out = withRestoredMcq(history())
    expect(out.map((m) => m.id)).toEqual(['t1', 'u1', 't2', 'u2', 't3'])
  })

  it('puts each question on the tutor message that asked it — so it sits directly above that question\'s answer', () => {
    const out = withRestoredMcq(history())
    expect(out[0].mcq).toEqual({ question: Q1.question, options: Q1.options })
    expect(out[2].mcq).toEqual({ question: Q2.question, options: Q2.options })
    // The answer that follows each question-bearing tutor message is the learner's reply to THAT question.
    expect(out[1]).toMatchObject({ role: 'user', content: 'Velocity' })
    expect(out[3]).toMatchObject({ role: 'user', content: '5 m/s' })
    expect(out[0].mcq?.options).toContain(out[1].content)
    expect(out[2].mcq?.options).toContain(out[3].content)
  })

  it('removes the question block from the prose, so the question is shown once (card), never twice', () => {
    const out = withRestoredMcq(history())
    expect(out[0].content).toBe(PROSE1)
    expect(out[0].content).not.toContain(Q1.question)
    expect(out[2].content).toBe(PROSE2)
    expect(out[2].content).not.toContain('A) ')
  })

  it('leaves learner messages and feedback-only tutor messages as the very same objects (free text and feedback unchanged)', () => {
    const src = history()
    const out = withRestoredMcq(src)
    for (const i of [1, 3, 4]) expect(out[i]).toBe(src[i])
    expect(out[4].mcq).toBeUndefined()
  })

  it('never converts a LEARNER message, even one that looks like a question block', () => {
    const typed = 'Here is mine.\n\nWhy?\nA) because\nB) since'
    const out = withRestoredMcq<Msg>([{ id: 'u', role: 'user', content: typed }])
    expect(out[0].content).toBe(typed)
    expect(out[0].mcq).toBeUndefined()
  })

  it('does not overwrite a message that already carries its live question', () => {
    const live: Msg = { id: 't', role: 'assistant', content: PROSE1, mcq: { question: 'Live?', options: ['x', 'y'] } }
    expect(withRestoredMcq([live])[0]).toBe(live)
  })

  it('is idempotent: restoring twice yields the same transcript', () => {
    const once = withRestoredMcq(history())
    expect(withRestoredMcq(once)).toEqual(once)
  })

  it('two lessons\' histories are independent: restoring one never carries its questions into the other', () => {
    const lessonA = withRestoredMcq<Msg>([{ id: 'a1', role: 'assistant', content: stored(PROSE1, Q1) }])
    const lessonB = withRestoredMcq<Msg>([{ id: 'b1', role: 'assistant', content: 'A fresh lesson with no question yet.' }])
    expect(lessonA[0].mcq?.question).toBe(Q1.question)
    expect(lessonB.some((m) => m.mcq)).toBe(false)
    expect(JSON.stringify(lessonB)).not.toContain(Q1.question)
  })

  it('an empty history is an empty transcript', () => {
    expect(withRestoredMcq<Msg>([])).toEqual([])
  })
})
