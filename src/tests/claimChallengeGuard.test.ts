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
import { isClaimChallenge, buildClaimChallengeBlock, CHALLENGE_ACKNOWLEDGED_RE } from '@/lib/teaching/claimChallengeGuard'

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

describe('isClaimChallenge — WIDENED (real cross-subject audit, chem.bond.resonance)', () => {
  // ── THE EXACT PRODUCTION FAILURE ────────────────────────────────────────
  // A real-student audit challenged a wrong formal-charge claim TWICE, in
  // the two most natural ways a real (especially young/ESL) student
  // disputes something: citing a remembered fact, and citing a remembered
  // authority ("my teacher said"). NEITHER matched the pre-widening
  // CHALLENGE_RE (verified by testing the pre-fix pattern set directly
  // against both strings before this fix — neither "wrong", "not right",
  // anchored "actually", nor "read/heard/learned … not …" occurs in
  // either message), so the humility directive was never injected and the
  // tutor was free to double down, which it did.
  it.each([
    'wait, im confused, u said oxygen has 5 valence electron but i thought oxygen has 6? and how can all three oxygen be -1 if total charge is only -2?',
    'im really confused now, i thought formal charges must add up to the real charge, thats what my teacher said before',
  ])('detects the ACTUAL reproduced production challenge: %s', (msg) => {
    expect(isClaimChallenge(msg)).toBe(true)
  })

  it.each([
    'i thought i would try that later',
    "i thought i'd go outside after this",
    'my teacher gave us homework about this',
  ])('does NOT fire on a forward-looking/unrelated "i thought"/"my teacher" sentence: %s', (msg) => {
    expect(isClaimChallenge(msg)).toBe(false)
  })

  it.each([
    'my teacher said always use active voice not passive',
    'we learned in class that oxygen has 6 valence electrons',
    'i thought the answer was different, we learned that in school',
  ])('detects other natural "remembered fact/authority" challenge shapes: %s', (msg) => {
    expect(isClaimChallenge(msg)).toBe(true)
  })

  // Non-vacuity: the OLD pattern set (pre-widening) genuinely misses both
  // reproduced production strings — proving the widening, not some other
  // change, is what makes the two cases above pass.
  it('NON-VACUITY: the pre-widening CHALLENGE_RE genuinely misses both reproduced strings', () => {
    const OLD_CHALLENGE_RE = new RegExp(
      [
        String.raw`\bthat'?s?\s+(?:not|n'?t)\s+(?:right|true|correct|accurate)\b`,
        String.raw`\b(?:that'?s|you'?re|you\s+are)\s+wrong\b`,
        String.raw`\bare\s+you\s+sure\b`,
        String.raw`\bi\s+don'?t\s+think\s+(?:that'?s\s+)?(?:right|true|correct|so)\b`,
        String.raw`\bthat\s+doesn'?t\s+sound\s+(?:right|true|correct)\b`,
        String.raw`\bi\s+don'?t\s+believe\s+that\b`,
        String.raw`^(?:no,?\s+)?(?:wait,?\s+)?actually\b`,
        String.raw`\bi\s+(?:read|heard|learned|learnt)\s+(?:that\s+)?.{0,60}\bnot\b`,
        String.raw`\bisn'?t\s+that\s+wrong\b`,
        String.raw`\bthat'?s\s+not\s+what\s+i\s+(?:learned|learnt|heard|read)\b`,
      ].join('|'),
      'i',
    )
    expect(OLD_CHALLENGE_RE.test(
      'wait, im confused, u said oxygen has 5 valence electron but i thought oxygen has 6? and how can all three oxygen be -1 if total charge is only -2?',
    )).toBe(false)
    expect(OLD_CHALLENGE_RE.test(
      'im really confused now, i thought formal charges must add up to the real charge, thats what my teacher said before',
    )).toBe(false)
  })
})

describe('CHALLENGE_ACKNOWLEDGED_RE — did the reply take the challenge seriously?', () => {
  it.each([
    'You may have caught something — let me double-check that calculation.',
    "You're right to question that; let me verify the numbers.",
    'Good catch — I was wrong about that.',
    "That's a fair point, my mistake.",
    "I'm not fully certain about that specific detail.",
    'Let me correct that: the double-bonded oxygen has formal charge 0, not -1.',
  ])('recognises an acknowledging reply: %s', (text) => {
    expect(CHALLENGE_ACKNOWLEDGED_RE.test(text)).toBe(true)
  })

  it.each([
    // The ACTUAL production failures, verbatim (trimmed where very long).
    "Let's walk through the formal-charge calculation together—just one step at a time.",
    'Hold on—lets correct that: each single-bond oxygen actually has 4 lone-pair electrons, not 8.',
    'the formal charges in the individual resonance structures do not have to match the real charge of the ion',
    'When you average the three, the double-bond oxygen’s +1 appears only one-third of the time.',
  ])('does NOT recognise the actual unacknowledging production replies: %s', (text) => {
    expect(CHALLENGE_ACKNOWLEDGED_RE.test(text)).toBe(false)
  })

  it('does not falsely fire on an ordinary confident, correct defence (no false positive against a legitimate answer)', () => {
    const legitimateDefence =
      'Actually, I am confident that is correct: sodium has 11 protons, matching its atomic number on the periodic table.'
    expect(CHALLENGE_ACKNOWLEDGED_RE.test(legitimateDefence)).toBe(false)
    // (This is a DELIBERATE, documented limitation, not a bug: this module
    // cannot tell a correct confident defence from an incorrect one. See
    // teachingIntegrityMastery.test.ts for how the mastery gate — not this
    // regex — is what actually stays safe in that case.)
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
