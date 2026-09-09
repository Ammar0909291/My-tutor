/**
 * P1 FIX — FACTUAL CONTENT INTEGRITY / FALSE-CLAIM DEFENCE.
 *
 * ── THE DEFECT (real-student English verification) ─────────────────────────
 * The tutor taught a false etymology ("knight" -> "night" as one word
 * undergoing sound change). The learner correctly challenged it. The tutor
 * did not acknowledge uncertainty — it generated MORE confident, fabricated
 * reasoning defending the original claim.
 *
 * This module does not (and cannot) decide whether the challenged claim was
 * actually true — see its own header for why that boundary is deliberate.
 * It answers the narrower, decidable question: did the learner just directly
 * dispute something the tutor said? If so, inject a directive that forbids
 * doubling down with invented detail and requires honest uncertainty instead.
 */
import { describe, it, expect } from 'vitest'
import { isClaimChallenge, buildClaimChallengeBlock } from '@/lib/teaching/claimChallengeGuard'

describe('isClaimChallenge — the challenge shape, not an ordinary question', () => {
  it.each([
    "that's not right, i learned it differently",
    "That's not true.",
    'are you sure about that?',
    "Are you sure?",
    "I don't think that's true",
    "I don't think so",
    'that doesnt sound right to me',
    "that doesn't sound correct",
    'no, actually knight and night are not related',
    'wait, actually I read that they come from different roots',
    'I read that they are unrelated words, not the same root',
    "isn't that wrong though?",
    "that's not what I learned in school",
    'you are wrong about that',
    "You're wrong.",
    "I don't believe that",
  ])('detects a genuine challenge: %s', (msg) => {
    expect(isClaimChallenge(msg)).toBe(true)
  })

  it.each([
    'why is that?',
    'I dont understand this',
    'ok that makes sense',
    'can you explain differently',
    'this is actually pretty easy once you see it',
    'what is the difference between a and b?',
    'thanks for explaining',
    'is that always true?',
    '',
    '   ',
  ])('does NOT fire on an ordinary question, ack, or confusion signal: %s', (msg) => {
    expect(isClaimChallenge(msg)).toBe(false)
  })

  it('is safe on non-string input', () => {
    expect(isClaimChallenge(undefined as unknown as string)).toBe(false)
    expect(isClaimChallenge(null as unknown as string)).toBe(false)
  })

  it('"actually" mid-sentence (a hedge, not a challenge) does not fire, but a leading one does', () => {
    expect(isClaimChallenge('it is actually pretty simple once you see the pattern')).toBe(false)
    expect(isClaimChallenge('Actually, I think that is incorrect.')).toBe(true)
    expect(isClaimChallenge('No, actually, I read something different.')).toBe(true)
  })
})

describe('buildClaimChallengeBlock — the directive contract', () => {
  it('forbids doubling down and requires honest uncertainty', () => {
    const block = buildClaimChallengeBlock('')
    expect(block).toMatch(/Do NOT defend/i)
    expect(block).toMatch(/Never invent a new supporting detail/i)
    expect(block).toMatch(/honestly/i)
  })

  it('appends grounding when supplied, without duplicating the humility instruction', () => {
    const grounding = '\n\nCURRICULUM GROUNDING: some authored fact.'
    const block = buildClaimChallengeBlock(grounding)
    expect(block).toContain(grounding)
    expect(block.indexOf('Do NOT defend')).toBeLessThan(block.indexOf(grounding))
  })

  it('is a non-empty, additive block even with no grounding available (the ordinary case)', () => {
    const block = buildClaimChallengeBlock('')
    expect(block.length).toBeGreaterThan(50)
  })
})
