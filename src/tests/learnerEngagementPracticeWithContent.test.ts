import { describe, expect, it } from 'vitest'
import { learnerMessageNeedsModelReply } from '@/lib/teaching/learnerEngagement'

describe('a practice request that ALSO says something still needs a real reply (real-learner run 2026-09-29)', () => {
  const needs = (m: string) => learnerMessageNeedsModelReply(m, { answeredPendingQuestion: false })
  it('the production message is answered by the model, not a stored paragraph', () => {
    expect(needs('i see no arrow in picture. can you give me new question to practice?')).toBe(true)
    expect(needs('ok i understand little bit. long string more slow. give me question please')).toBe(true)
  })
  it('a bare practice request is still served deterministically', () => {
    expect(needs('give me a practice question')).toBe(false)
    expect(needs('quiz me please')).toBe(false)
    expect(needs('ok. give me question please')).toBe(false)
  })
})
