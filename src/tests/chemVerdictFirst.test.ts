/**
 * CHEM-028 (2026-10-05, chemistry real-learner run): a graded answer's verdict
 * was buried — "A 0.5 M sugar solution is a true solution… In contrast, a gold
 * sol… will show a vivid Tyndall beam…" with the correction, if any, at the
 * end. The verdict now comes first, on an authored key only (an unauthored key
 * stays verdict-free by design, see route.ts correctForConfirmation).
 */
import { describe, it, expect } from 'vitest'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'
import { confirmCorrectAnswer } from '@/lib/teaching/answerConfirmation'

const probe = { question: 'Which mixture shows a visible Tyndall beam?', options: ['A sugar solution (0.5 M)', 'A gold sol'], correctIndex: 1 }

describe('verdict first', () => {
  it('a wrong answer whose correction comes late gets "Not quite." up front, once', () => {
    const late = 'A 0.5 M sugar solution is a true solution, so its particles are too small to scatter light. In contrast, a gold sol will show a vivid Tyndall beam. So the answer is a gold sol, not the sugar solution.'
    const r = stateCorrectionForWrongAnswer({ text: late, correct: false, probe: probe as never })
    expect(r.text.startsWith('Not quite. A 0.5 M sugar solution')).toBe(true)
    expect(r.text.match(/Not quite/g)?.length).toBe(1)
    expect(r.reason).toBe('verdict-moved-first')
  })
  it('a correction already in the opening sentence is left alone', () => {
    const t = 'Not quite — a gold sol is the one that scatters light. Sugar particles are too small.'
    expect(stateCorrectionForWrongAnswer({ text: t, correct: false, probe: probe as never }).text).toBe(t)
  })
  it('a lecture with no correction at all gets the full correction first', () => {
    const r = stateCorrectionForWrongAnswer({ text: 'Both mixtures look clear to the naked eye.', correct: false, probe: probe as never })
    expect(r.text.startsWith('Not quite — the answer is: A gold sol')).toBe(true)
  })
  it('a correct answer confirmed only at the end is confirmed first', () => {
    const r = confirmCorrectAnswer({ text: 'A gold sol has particles of about 20 nm. They scatter light, so that is correct.', correct: true, priorConfirmations: 0 })
    expect(r.added).toBe(true)
    expect(r.text.startsWith('A gold sol')).toBe(false)
  })
  it('a correct answer confirmed in the opening sentence is unchanged', () => {
    const t = "That's right — a gold sol scatters light. Its particles are about 20 nm."
    expect(confirmCorrectAnswer({ text: t, correct: true, priorConfirmations: 0 })).toEqual({ text: t, added: false })
  })
  it('an unauthored key (correct: null) gets no verdict at all', () => {
    expect(stateCorrectionForWrongAnswer({ text: 'Both look clear.', correct: null, probe: probe as never }).added).toBe(false)
  })
})

describe('the correction carries no reviewer capitals (CHEM-003, live re-drive)', () => {
  it('authored option text is lowered in the prepended correction', () => {
    const p = { question: 'Is that because water molecules pack tightly?', options: ['No — water breaks the trend because of HYDROGEN BONDING; size alone predicts the LOWEST boiling point', 'Yes'], correctIndex: 0 }
    const r = stateCorrectionForWrongAnswer({ text: '', correct: false, probe: p as never })
    expect(r.text).toMatch(/hydrogen bonding/)
    expect(r.text).not.toMatch(/HYDROGEN|LOWEST/)
  })
})
