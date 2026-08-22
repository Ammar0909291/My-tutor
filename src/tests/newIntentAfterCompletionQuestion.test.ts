/**
 * F2 (real-student session, 2026-08-22): on a completed lesson, "wait did i
 * pass? i dont think i understand it" was answered with the identical
 * canned "you've already finished... press Start next lesson" text — the
 * student's actual question was never reached.
 *
 * `lessonCompletionRespectsNewIntentHoisted` (route.ts) already ORs six
 * signals together to decide this, and the mechanism itself is sound and
 * unchanged. The reproduced message failed every one of them:
 *
 *   - no excursion opened, no concept/topic resolved (nothing to name)
 *   - isGenuineQuestion(): the "?" sits mid-message ("did i pass?"), not at
 *     the end of the trimmed string, and the trailing-only anchor rejected
 *     it outright
 *   - detectFailureState(): the dont_understand pattern required "don't
 *     understand" with nothing in between, and "don't THINK I understand"
 *     has "think i" sitting in the gap
 *   - isQuestionAnnouncement(): deliberately scoped to "I have a/one
 *     question" only, doesn't apply here
 *
 * Two narrow regex fixes, no new phrase list, no new detection layer:
 *   1. isGenuineQuestion() / readConversation()'s isQuestion: "?" anywhere
 *      in the message, not just at the end.
 *   2. recoveryGuard's dont_understand MILD pattern: allow an optional
 *      "think i" hedge between the negation and "understand".
 */
import { describe, it, expect } from 'vitest'
import { isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { isQuestionAnnouncement } from '@/lib/teaching/lessonCompletion'

/** Mirrors route.ts's own OR chain exactly (minus the excursion/topic
 *  signals, which need route-level state this file has no access to and
 *  which were already false in the reproduced case). */
function respondsToNewIntent(message: string): boolean {
  return isGenuineQuestion(message) || detectFailureState(message) !== null || isQuestionAnnouncement(message)
}

describe('F2 — the exact reproduced message now reads as new intent', () => {
  it('"wait did i pass? i dont think i understand it"', () => {
    expect(respondsToNewIntent('wait did i pass? i dont think i understand it')).toBe(true)
  })
})

describe('F2 — required positive controls (task-specified)', () => {
  for (const message of [
    'did I pass?',
    'did I finish?',
    'am I done?',
    'did I understand it?',
    "I don't think I understand it",
    'was that correct?',
  ]) {
    it(`"${message}" is recognized as new intent`, () => {
      expect(respondsToNewIntent(message)).toBe(true)
    })
  }
})

describe('F2 — required negative controls (task-specified) — must NOT break completion acknowledgements', () => {
  for (const message of ['ok', 'thanks', 'got it', 'okay, understood']) {
    it(`"${message}" is NOT treated as new intent`, () => {
      expect(respondsToNewIntent(message)).toBe(false)
    })
  }
})

describe('isGenuineQuestion — widened to "? anywhere", not just trailing', () => {
  it('a mid-message question followed by explanatory prose still counts', () => {
    expect(isGenuineQuestion('wait did i pass? i dont think i understand it')).toBe(true)
  })

  it('a hesitation prefix before the question mark still counts', () => {
    expect(isGenuineQuestion('um, is this right?')).toBe(true)
  })

  it('a standalone trailing question is unaffected (existing behavior)', () => {
    expect(isGenuineQuestion('What is radiation?')).toBe(true)
  })

  it('plain acknowledgements with no "?" anywhere are still not questions', () => {
    for (const m of ['Got it', 'Continue', 'Next', 'Go', 'Yes', 'OK', "I'm ready"]) {
      expect(isGenuineQuestion(m)).toBe(false)
    }
  })

  it('is still empty-safe', () => {
    expect(isGenuineQuestion('')).toBe(false)
    expect(isGenuineQuestion('   ')).toBe(false)
  })
})

describe('recoveryGuard — "don\'t think I understand" hedge', () => {
  it('matches the hedged phrasing', () => {
    expect(detectFailureState("I don't think I understand it")).toBe('dont_understand')
    expect(detectFailureState('i dont think i understand it')).toBe('dont_understand')
    expect(detectFailureState("I just don't think I understand")).toBe('dont_understand')
  })

  it('the original unhedged phrasing still matches (existing behavior)', () => {
    expect(detectFailureState("I don't understand")).toBe('dont_understand')
    expect(detectFailureState('i really dont understand this')).toBe('dont_understand')
  })

  it('does NOT match "I don\'t think YOU understand" — a different claim about the tutor', () => {
    expect(detectFailureState("I don't think you understand")).not.toBe('dont_understand')
  })

  it('does not fire on an unrelated correct-sounding statement', () => {
    expect(detectFailureState('I understand this now, thanks')).toBeNull()
  })
})
