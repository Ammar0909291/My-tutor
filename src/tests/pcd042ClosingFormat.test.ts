/**
 * PCD-042 — a false closure carried entirely by the closing-format bullets.
 *
 * chem.org.mechanisms (#129). To a plain "ok that makes sense, thank you", the
 * tutor rendered a full mastery recap while the engine's own state read
 * `mastery.verified:false`, `practiceCorrect:0/2`, `completionSuppressed:true`,
 * `gatePending:true`. The deterministic gate refused the close and recorded
 * nothing — the AUTHORITATIVE predicate was never wrong. The learner read prose.
 *
 * Every pre-existing bookkeeping rule missed it because the turn contains no
 * bookkeeping sentence at all: no lesson count, no "next up is", no "next we
 * explore". Nothing to strip, by those rules.
 *
 * The fix keys on the FORMAT `client.ts` defines and authorises only at
 * [LESSON_COMPLETE], not on the phrasing inside it — so the negative controls
 * below matter as much as the reproduction: a lone recap line must survive.
 *
 * Runs the REAL enforceStance against real ConversationState values.
 */
import { describe, it, expect } from 'vitest'
import {
  enforceStance,
  rendersLessonClosingFormat,
  closingFormatSectionCount,
} from '@/lib/teaching/stanceEnforcement'
import { initialConversationState } from '@/lib/teaching/conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'

/** The chemistry turn, in the shape the audit recorded it. */
const PCD042_TURN = [
  '🎉 Excellent work! You worked through that mechanism carefully.',
  '',
  '✓ What you mastered – you can now: identify the nucleophile and electrophile in a polar reaction, draw curly arrows from the electron source to the sink, and distinguish an intermediate from a transition state.',
  "✓ What's coming – The next lesson unlocks 'Nature of Matter', which builds directly on the electron-pushing you have just practised.",
].join('\n')

/** The state actually in force: nothing practised, nothing verified. */
const unearned = (): ConversationState => ({
  ...initialConversationState('chem.org.mechanisms'),
  phase: 'OBSERVE', correctAtCheck: 0, correctAtPractice: 0,
})

/** A learner who genuinely met the bar. */
const earned = (): ConversationState => ({
  ...initialConversationState('chem.org.mechanisms'),
  phase: 'TRANSFER', demonstrated: true,
  correctAtCheck: 1, correctAtPractice: 2,
  verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2,
})

const run = (text: string, state: ConversationState) =>
  enforceStance({ text, state, move: null, misconceptionActive: false })

describe('PCD-042 — the original failing case', () => {
  it('escapes every pre-existing bookkeeping phrasing (why it reached a learner)', () => {
    // Not a rhetorical point: if any of these matched, the old rule would have
    // caught it and this defect would not exist.
    expect(PCD042_TURN).not.toMatch(/completed lesson/i)
    expect(PCD042_TURN).not.toMatch(/next up\s*(is|:)/i)
    expect(PCD042_TURN).not.toMatch(/next we(?:'ll| will)? (?:explore|cover|study)/i)
    expect(PCD042_TURN).not.toMatch(/\d+ of \d+ lessons/i)
  })

  it('is detected as the closing FORMAT', () => {
    expect(closingFormatSectionCount(PCD042_TURN)).toBe(2)
    expect(rendersLessonClosingFormat(PCD042_TURN)).toBe(true)
  })

  it('is flagged and the unearned claims are stripped', () => {
    const { cleanText, violations } = run(PCD042_TURN, unearned())
    expect(violations.map((v) => v.code)).toContain('FALSE_MASTERY_COMPLETION')
    expect(cleanText).not.toContain('What you mastered')
    expect(cleanText).not.toContain("What's coming")
    expect(cleanText).not.toContain('Nature of Matter')
  })

  it('keeps the praise — praise is never a completion claim', () => {
    const { cleanText } = run(PCD042_TURN, unearned())
    expect(cleanText).toContain('Excellent work')
  })

  it('does NOT become a "can never finish" defect — earned mastery keeps the close', () => {
    const { cleanText } = run(PCD042_TURN, earned())
    expect(cleanText).toContain('What you mastered')
    expect(cleanText).toContain("What's coming")
    expect(cleanText).toContain('Nature of Matter')
  })
})

describe('negative controls — the recap policy this fix preserves', () => {
  it('a LONE motivational "What\'s coming" line is not the template and survives', () => {
    // The exact case stanceEnforcement.ts\'s old policy protected.
    const lone = [
      'Nice — you got the arrow direction right that time.',
      "✓ What's coming – once this clicks, the elimination mechanisms will feel like the same move in reverse.",
    ].join('\n')
    expect(rendersLessonClosingFormat(lone)).toBe(false)
    const { cleanText, violations } = run(lone, unearned())
    expect(cleanText).toContain("What's coming")
    expect(violations.map((v) => v.code)).not.toContain('FALSE_MASTERY_COMPLETION')
  })

  it('a lone "What you mastered" sub-skill recap survives', () => {
    const lone = [
      'Good — that is exactly the distinction.',
      '✓ What you mastered – spotting which atom carries the partial positive charge.',
    ].join('\n')
    expect(rendersLessonClosingFormat(lone)).toBe(false)
    expect(run(lone, unearned()).cleanText).toContain('What you mastered')
  })

  it('ordinary teaching prose with ticks is untouched', () => {
    const teaching = [
      'Check each step against these:',
      '✓ the arrow starts at a lone pair or a bond',
      '✓ the arrow ends where the electrons land',
      '✓ charges balance on both sides',
    ].join('\n')
    expect(rendersLessonClosingFormat(teaching)).toBe(false)
    expect(run(teaching, unearned()).cleanText).toBe(teaching)
  })

  it('"Common mistakes" alone is teaching, claims nothing, and never triggers', () => {
    const t = '✓ Common mistakes – drawing the arrow from the positive centre instead of the electron pair.'
    expect(rendersLessonClosingFormat(t)).toBe(false)
    expect(run(t, unearned()).cleanText).toContain('Common mistakes')
  })

  it('an empty or junk turn cannot throw', () => {
    for (const t of ['', '   ', '✓', '🎉']) {
      expect(() => run(t, unearned())).not.toThrow()
      expect(rendersLessonClosingFormat(t)).toBe(false)
    }
  })
})

describe('cross-subject — the same shared runtime serves physics', () => {
  it('a physics turn rendering the template before mastery is stripped identically', () => {
    const physics = [
      '🎉 Excellent work! That was a clean free-body diagram.',
      '✓ What you mastered – resolving weight into components along an incline.',
      '✓ Common mistakes – forgetting that the normal force is not equal to mg on a slope.',
      "✓ What's coming – friction on inclines, which uses exactly this decomposition.",
    ].join('\n')
    const state: ConversationState = {
      ...initialConversationState('phys.mech.inclined-plane'),
      phase: 'GUIDE', correctAtCheck: 0, correctAtPractice: 0,
    }
    const { cleanText, violations } = enforceStance({
      text: physics, state, move: null, misconceptionActive: false,
    })
    expect(violations.map((v) => v.code)).toContain('FALSE_MASTERY_COMPLETION')
    expect(cleanText).not.toContain('What you mastered')
    expect(cleanText).toContain('Common mistakes')   // teaching kept, both subjects
    expect(cleanText).toContain('Excellent work')
  })
})
