/**
 * Criterion 5 — a correct answer is explicitly confirmed as correct.
 *
 * Measured before this existed: 39% of server-graded-correct answers in
 * physics and 57% in chemistry were met with any acknowledgement at all.
 * The gate is >= 90%.
 *
 * The cases that matter most here are the NEGATIVE ones. A confirmation
 * attached to a wrong answer is worse than the defect it fixes, so most of
 * this file is about what must never happen.
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'vitest'
import { confirmCorrectAnswer, CONFIRMS_CORRECT } from '@/lib/teaching/answerConfirmation'

const REAL_UNCONFIRMED = 'Here is a question to check your understanding:'
const REAL_REMEDIATION =
  "Let's take one small step together. I'll walk through it with you and pause whenever it helps."

describe('a correct answer is confirmed', () => {
  it('prepends a confirmation to the captured spring-mass T15 turn', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: true })
    expect(r.added).toBe(true)
    expect(r.text).toBe("That's right. Here is a question to check your understanding:")
  })

  it('fixes the turn that offered remediation for a correct answer', () => {
    const r = confirmCorrectAnswer({ text: REAL_REMEDIATION, correct: true })
    expect(r.added).toBe(true)
    expect(CONFIRMS_CORRECT.test(r.text)).toBe(true)
    // the tutor's own words survive intact
    expect(r.text.endsWith(REAL_REMEDIATION)).toBe(true)
  })

  it('rotates phrasing so a run of correct answers is not one canned sentence', () => {
    const said = [0, 1, 2, 3].map(
      (n) => confirmCorrectAnswer({ text: 'Next question.', correct: true, priorConfirmations: n }).text,
    )
    expect(new Set(said.slice(0, 3)).size).toBe(3)
    expect(said[3]).toBe(said[0])           // deterministic, not random
  })
})

describe('it never speaks twice', () => {
  const already = [
    "That's right. Let me check your thinking with this.",   // the real T14
    'That’s right. Let me check your thinking with this.', // U+2019 — the encoding that made the scorer read 2%
    'Great, you picked the correct restoring-force rule!',
    'You’re right—gravity just shifts the equilibrium.',
    'Exactly. Now try this one.',
    'Yes, that follows from the same rule.',
  ]
  for (const t of already) {
    it(`leaves an already-confirming reply untouched: ${t.slice(0, 34)}…`, () => {
      const r = confirmCorrectAnswer({ text: t, correct: true })
      expect(r.added).toBe(false)
      expect(r.text).toBe(t)
    })
  }

  it('is idempotent — running it twice adds one confirmation, not two', () => {
    const once = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: true })
    const twice = confirmCorrectAnswer({ text: once.text, correct: true })
    expect(twice.added).toBe(false)
    expect(twice.text).toBe(once.text)
  })
})

describe('NEGATIVE CONTROLS — it must never congratulate a wrong answer', () => {
  it('does nothing on a graded-WRONG answer', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: false })
    expect(r.added).toBe(false)
    expect(r.text).toBe(REAL_UNCONFIRMED)
  })

  it('does nothing when nothing was graded this turn', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: null })
    expect(r.added).toBe(false)
  })

  it('there is no input other than correct===true that produces a confirmation', () => {
    for (const correct of [false, null, undefined as unknown as null]) {
      for (const priorConfirmations of [0, 1, 2, 99, -1, NaN]) {
        expect(
          confirmCorrectAnswer({ text: 'anything at all', correct, priorConfirmations }).added,
        ).toBe(false)
      }
    }
  })

  it('adds nothing to an empty reply rather than inventing a turn', () => {
    for (const text of ['', '   ', '\n']) {
      const r = confirmCorrectAnswer({ text, correct: true })
      expect(r.added).toBe(false)
      expect(r.text).toBe(text)
    }
  })

  it('survives a hostile count without throwing or misindexing', () => {
    for (const n of [NaN, -5, Infinity, 1e9, 2.7]) {
      const r = confirmCorrectAnswer({ text: 'Next.', correct: true, priorConfirmations: n })
      expect(r.added).toBe(true)
      expect(CONFIRMS_CORRECT.test(r.text)).toBe(true)
    }
  })
})

describe('the detector matches the one the scorer measures with', () => {
  it('does not treat a bare directional "right" as praise', () => {
    // "the right-hand side" must not read as a confirmation, or the criterion
    // scores itself green on physics prose.
    expect(CONFIRMS_CORRECT.test('Move the term to the right-hand side.')).toBe(false)
    expect(CONFIRMS_CORRECT.test('The force points to the right.')).toBe(false)
  })

  it('does match the phrasings the tutor actually produced', () => {
    for (const t of ["That's right.", 'Correct — well done.', 'Yes, exactly right.']) {
      expect(CONFIRMS_CORRECT.test(t)).toBe(true)
    }
  })
})

describe('the route actually applies it', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('is wired on the shipping text path, not merely imported', () => {
    expect(route).toMatch(/cleanText = confirmed\.text/)
  })

  it('is fed the SERVER grade, never a model self-report', () => {
    // The one input that may produce a confirmation is gradeMcqAnswer's
    // verdict. If this ever reads a SIGNAL field instead, the guarantee in
    // answerConfirmation.ts's header is void.
    expect(route).toMatch(/correct: mcqGradeHoisted\?\.correct \?\? null/)
    const call = route.slice(route.indexOf('confirmCorrectAnswer({'), route.indexOf('cleanText = confirmed.text'))
    expect(call).not.toMatch(/signal/i)
  })

  it('rotates on persisted pre-turn state, not on this turn', () => {
    expect(route).toMatch(/priorConfirmations: priorConfirmationsHoisted/)
    expect(route).toMatch(/priorConfirmationsHoisted = Number\.isFinite/)
  })
})
