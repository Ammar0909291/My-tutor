/**
 * ENG-D11 — a server-graded WRONG answer must carry a correction.
 *
 * Every reply string below is quoted from the register's own evidence. The
 * negative controls carry the weight: this enforcer speaks on the learner's
 * behalf, so a false "Not quite" on a turn the server graded CORRECT, or on a
 * turn it did not grade at all, would be worse than the defect.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  stateCorrectionForWrongAnswer,
  STATES_INCORRECT,
} from '@/lib/teaching/wrongAnswerCorrection'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const rootsProbe: TutorMCQ = {
  question: "Which word uses the 'scrib/script' root?",
  options: ['biography', 'manuscript', 'telephone', 'photograph'],
  correctIndex: 1,
}

describe('ENG-D11: the correction fires on the server verdict alone', () => {
  it.each([
    // Verbatim from the register's evidence list.
    ["I thought you were picking biography as the word that uses the 'scrib/script' root. Is that right?"],
    ['Here is your next question.'],
    ["Let's take one small step together. I'll walk through it with you and pause whenever it helps.\n\nWe can continue from here whenever you're ready."],
  ])('corrects a graded-wrong turn whose reply never does: %j', (reply) => {
    const r = stateCorrectionForWrongAnswer({ text: reply, correct: false, probe: rootsProbe })
    expect(r.added).toBe(true)
    expect(r.text).toContain('manuscript')
    expect(r.text).toMatch(/not quite/i)
    // The model's own teaching is preserved, never replaced.
    expect(r.text).toContain(reply.trim().slice(0, 20))
  })

  it('names the answer from the authored key, not from anywhere else', () => {
    const r = stateCorrectionForWrongAnswer({ text: 'Here is your next question.', correct: false, probe: rootsProbe })
    expect(r.text).toContain(rootsProbe.options[rootsProbe.correctIndex])
  })

  it('stands alone when the reply was stripped empty (the content-free hold)', () => {
    const r = stateCorrectionForWrongAnswer({ text: '   ', correct: false, probe: rootsProbe })
    expect(r.added).toBe(true)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.text).toContain('manuscript')
  })

  // ── NEGATIVE CONTROLS ─────────────────────────────────────────────────────
  it.each([
    ['graded CORRECT', true],
    ['NOT graded at all', null],
  ])('stays silent when the answer was %s', (_label, correct) => {
    const r = stateCorrectionForWrongAnswer({
      text: 'Here is your next question.', correct: correct as boolean | null, probe: rootsProbe,
    })
    expect(r.added).toBe(false)
    expect(r.reason).toBe('not-graded-wrong')
    expect(r.text).toBe('Here is your next question.')
  })

  it.each([
    [null],
    [undefined],
    [{ options: ['a', 'b'] }],                       // no correctIndex
    [{ options: ['a', 'b'], correctIndex: 9 }],      // out of range
    [{ options: [], correctIndex: 0 }],              // empty
    [{ options: ['   '], correctIndex: 0 }],         // blank option
  ])('refuses to speak with no usable authored key: %j', (probe) => {
    const r = stateCorrectionForWrongAnswer({ text: 'Next question.', correct: false, probe: probe as never })
    expect(r.added).toBe(false)
    expect(r.reason).toBe('no-key')
    expect(r.text).toBe('Next question.')
  })

  it('does not speak twice when the reply already corrects AND names the answer', () => {
    const r = stateCorrectionForWrongAnswer({
      text: "That's not quite right — the answer is manuscript, which carries the 'scrib/script' root.",
      correct: false,
      probe: rootsProbe,
    })
    expect(r.added).toBe(false)
    expect(r.reason).toBe('already-corrected')
  })

  it('handles the typographic apostrophe the tutor actually writes', () => {
    const r = stateCorrectionForWrongAnswer({
      text: 'That’s not quite right — the answer is manuscript.',
      correct: false,
      probe: rootsProbe,
    })
    expect(r.added).toBe(false)
  })

  it('BOTH halves are required to stay silent — either alone still corrects', () => {
    // says wrong, never names the answer (the "not quite, anyway…" shape)
    const a = stateCorrectionForWrongAnswer({
      text: "Not quite. Let's move on to the next one.", correct: false, probe: rootsProbe,
    })
    expect(a.added).toBe(true)
    // names the answer, never says the learner was wrong (reads as agreement)
    const b = stateCorrectionForWrongAnswer({
      text: 'The manuscript example shows the root clearly.', correct: false, probe: rootsProbe,
    })
    expect(b.added).toBe(true)
  })

  it('shared option vocabulary cannot count as naming the answer', () => {
    const probe: TutorMCQ = {
      question: 'Which sentence uses a compound subject?',
      options: ['Dogs are popular pets.', 'Dogs and cats are popular pets.', 'Dogs run quickly.'],
      correctIndex: 1,
    }
    // "Dogs"/"popular"/"pets" are shared; naming them is not naming option B.
    const r = stateCorrectionForWrongAnswer({
      text: 'Not quite. Dogs are popular pets, as we said.', correct: false, probe,
    })
    expect(r.added).toBe(true)
  })

  it('is idempotent', () => {
    const once = stateCorrectionForWrongAnswer({ text: 'Next question.', correct: false, probe: rootsProbe })
    const twice = stateCorrectionForWrongAnswer({ text: once.text, correct: false, probe: rootsProbe })
    expect(twice.added).toBe(false)
    expect(twice.text).toBe(once.text)
  })

  it('never throws on malformed input', () => {
    expect(() => stateCorrectionForWrongAnswer({ text: undefined as never, correct: false, probe: rootsProbe })).not.toThrow()
  })

  it('STATES_INCORRECT does not fire on ordinary teaching prose', () => {
    for (const s of [
      'No two words are alike in origin.',
      'Actually this rule is older than you think.',
      'The right-hand side of the word carries the root.',
    ]) expect(STATES_INCORRECT.test(s)).toBe(false)
  })
})

describe('ENG-D11: the verdict comes from the real grader', () => {
  it('a real wrong tap grades false and draws the correction', () => {
    const g = gradeMcqAnswer('biography', rootsProbe)
    expect(g.correct).toBe(false)
    expect(stateCorrectionForWrongAnswer({ text: 'Here is your next question.', correct: g.correct, probe: rootsProbe }).added).toBe(true)
  })

  it('a real correct tap grades true and draws nothing', () => {
    const g = gradeMcqAnswer('manuscript', rootsProbe)
    expect(g.correct).toBe(true)
    expect(stateCorrectionForWrongAnswer({ text: 'Here is your next question.', correct: g.correct, probe: rootsProbe }).added).toBe(false)
  })

  it('an ungradeable typed answer grades null and draws nothing', () => {
    const g = gradeMcqAnswer('hmm i am not sure about this one', rootsProbe)
    expect(g.correct).toBeNull()
    expect(stateCorrectionForWrongAnswer({ text: 'Here is your next question.', correct: g.correct, probe: rootsProbe }).added).toBe(false)
  })
})

describe('ENG-D11: route wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('is wired from the server grade and the graded probe', () => {
    expect(src).toContain('stateCorrectionForWrongAnswer')
    const at = src.indexOf('stateCorrectionForWrongAnswer({')
    expect(at).toBeGreaterThan(0)
    const block = src.slice(at, at + 300)
    expect(block).toContain('correct: mcqGradeHoisted?.correct ?? null')
    expect(block).toContain('probe: pendingMcqHoisted')
  })

  it('runs after the correct-answer enforcer, so the two cannot both speak', () => {
    expect(src.indexOf('confirmCorrectAnswer({')).toBeLessThan(src.indexOf('stateCorrectionForWrongAnswer({'))
  })
})
