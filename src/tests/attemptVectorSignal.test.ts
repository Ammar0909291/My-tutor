/**
 * P1-1 — the declared AttemptVector. The assertions that matter are the
 * honesty ones: nothing is guessed, nothing is coerced, and the tag never
 * survives into text the learner or the store sees.
 */
import { describe, it, expect } from 'vitest'
import {
  ATTEMPT_VECTOR_HONESTY_CLASS, buildAttemptVectorInstruction,
  parseAttemptVectorTag, declaredAxisCount,
} from '@/lib/teaching/attemptVectorSignal'

const TAG = '<!--ATTEMPT channel="visual" representation="diagram" concreteness="iconic" ' +
  'entry="example-first" granularity="decomposed" agency="joint"-->'

describe('P1-1 · honesty class', () => {
  it('is PROXY and never instrumentation', () => {
    expect(ATTEMPT_VECTOR_HONESTY_CLASS).toBe('PROXY')
  })

  it('instructs omission rather than guessing', () => {
    const s = buildAttemptVectorInstruction()
    expect(s).toContain('never guess')
    expect(s).toContain('invisible to the student')
    expect(s).toContain('what you intended, not what you wrote')
  })
})

describe('P1-1 · parsing declares, never infers', () => {
  it('reads all six declared axes', () => {
    const { vector } = parseAttemptVectorTag(`Here is the idea.\n${TAG}`)
    expect(vector).toEqual({
      channel: 'visual', representation: 'diagram', concreteness: 'iconic',
      entryPoint: 'example-first', granularity: 'decomposed', agency: 'joint',
    })
  })

  it('omits an undeclared axis rather than defaulting it', () => {
    const { vector } = parseAttemptVectorTag('x\n<!--ATTEMPT channel="verbal"-->')
    expect(vector).toEqual({ channel: 'verbal' })
    expect(vector).not.toHaveProperty('agency')
    expect(declaredAxisCount(vector)).toBe(1)
  })

  it('drops an out-of-set value instead of coercing it', () => {
    const { vector } = parseAttemptVectorTag('x\n<!--ATTEMPT channel="interpretive-dance" agency="joint"-->')
    expect(vector).toEqual({ agency: 'joint' })
  })

  it('returns null when no tag is present — nothing is derived from the reply', () => {
    const r = parseAttemptVectorTag('A long explanation with a diagram and an example.')
    expect(r.vector).toBeNull()
    expect(r.cleanText).toBe('A long explanation with a diagram and an example.')
    expect(declaredAxisCount(null)).toBe(0)
  })

  it('returns null for a tag whose every attribute was dropped', () => {
    // "declared nothing" and "declared an empty intent" must not look alike.
    expect(parseAttemptVectorTag('x\n<!--ATTEMPT channel="nonsense"-->').vector).toBeNull()
  })

  it('never records METHOD or INSTANCE — those have real sources', () => {
    const { vector } = parseAttemptVectorTag(`x\n${TAG}`)
    expect(vector).not.toHaveProperty('method')
    expect(vector).not.toHaveProperty('instance')
  })
})

describe('P1-1 · the tag never reaches the learner or the store', () => {
  it('strips the tag from the reply', () => {
    const { cleanText } = parseAttemptVectorTag(`Two layers, one inside the other.\n${TAG}`)
    expect(cleanText).toBe('Two layers, one inside the other.')
    expect(cleanText).not.toContain('ATTEMPT')
  })

  it('is total — malformed input yields text unchanged and no throw', () => {
    for (const t of ['', '<!--ATTEMPT', '<!--ATTEMPT-->', 'no tag at all']) {
      expect(() => parseAttemptVectorTag(t)).not.toThrow()
    }
    expect(parseAttemptVectorTag('<!--ATTEMPT-->').vector).toBeNull()
  })
})
