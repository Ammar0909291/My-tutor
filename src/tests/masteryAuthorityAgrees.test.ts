/**
 * THE PAYLOAD AND THE RECORD MUST NOT DISAGREE IN THE SAME TURN.
 *
 * ── MEASURED LIVE ───────────────────────────────────────────────────────────
 * phys.mech.friction, 2026-09-01, disposable account, deployed app. A learner
 * answered FOUR questions correctly and reached TRANSFER. The turn payload
 * carried `mastery.verified: true` — and the deterministic close, rendered by
 * the runtime in that same turn, said:
 *
 *   "Let's pause Friction Forces here for now.
 *    Worth another look later: Friction Forces."
 *
 * They were told they had mastered it and flagged for review, at once.
 *
 * ── HOW IT WAS FOUND, INCLUDING THE WRONG TURNING ───────────────────────────
 * The first hypothesis was that `launderedEvidence` had over-blocked. That was
 * FALSIFIED by reproducing the sequence against the real modules: with every
 * grade CLEAN the state classifies as `mastered`. Only when the CHECK grade's
 * SIGNAL fails to verify (production logged "model wrote its own options
 * beside a canonical probe" on exactly that turn) does the real shape appear —
 * and it is the same shape `conceptOutcome`'s own comment already records:
 *
 *   correctAtCheck 1   verifiedCorrectAtCheck 0
 *   correctAtPractice 2   verifiedCorrectAtPractice 2
 *   unauthoredKeyGrades 1
 *
 * ── WHAT WAS AND WAS NOT CHANGED ────────────────────────────────────────────
 * NOT changed: the record's refusal. It exists for a measured reason — an
 * invented key that was WRONG once certified a lesson — and loosening it to
 * make the payload look right would trade a cosmetic incoherence for a real
 * false certification.
 *
 * Changed: `buildMasterySummary` may no longer claim more than the record will
 * grant. Its own section header says "one source of truth"; it read
 * `masteryVerified` while the record read `masteryVerifiedStrict` through
 * `launderedEvidence`. That predicate now lives once, in masteryGate, and both
 * read it.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import { buildMasterySummary, launderedEvidence } from '@/lib/teaching/masteryGate'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'

const ev = (o: Record<string, unknown>) => o as Parameters<typeof advanceConversationState>[1]
const summary = (s: ConversationState) =>
  buildMasterySummary(s, { completionSuppressed: false, gatePending: false })

/** The measured live lesson. `checkClean` is the one variable that mattered. */
function driveLesson(opts: { inventedKeyEarly: boolean; checkClean: boolean }): ConversationState {
  let s: ConversationState = initialConversationState('phys.mech.friction')
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
  // GUIDE -> CHECK. Credits no counter by design; this is where the model
  // invented a key in the live run.
  s = advanceConversationState(s, ev({
    askedQuestion: true, signalCorrect: true, recoveryFired: false,
    unauthoredKey: opts.inventedKeyEarly, signalVerificationStatus: 'CLEAN',
  }))
  // The CHECK grade — authored probe, correct, verification per the option.
  s = advanceConversationState(s, ev({
    askedQuestion: true, signalCorrect: true, recoveryFired: false,
    unauthoredKey: false, signalVerificationStatus: opts.checkClean ? 'CLEAN' : 'CONTRADICTED',
  }))
  // Two PRACTICE grades, authored, clean.
  for (const _ of [1, 2]) {
    s = advanceConversationState(s, ev({
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
      unauthoredKey: false, signalVerificationStatus: 'CLEAN',
    }))
  }
  return s
}

describe('A. the live lesson reproduced', () => {
  const s = driveLesson({ inventedKeyEarly: true, checkClean: false })

  it('reaches TRANSFER on four correct answers', () => {
    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBe(1)
    expect(s.correctAtPractice).toBe(2)
  })

  it('the record declines to certify it — unchanged, and deliberately so', () => {
    expect(launderedEvidence(s)).toBe(true)
    expect(conceptOutcome(s, 'Friction Forces').status).toBe('needs_review')
  })

  it('and the PAYLOAD no longer contradicts that record', () => {
    // This is the whole fix. Before it, `verified` was true here.
    expect(summary(s).verified).toBe(false)
  })
})

describe('B. THE INVARIANT — the two authorities agree, over every combination', () => {
  for (const inventedKeyEarly of [true, false]) {
    for (const checkClean of [true, false]) {
      it(`invented=${inventedKeyEarly} checkClean=${checkClean}`, () => {
        const s = driveLesson({ inventedKeyEarly, checkClean })
        const payloadSaysMastered = summary(s).verified
        const recordSaysMastered = conceptOutcome(s, 'Friction Forces').status === 'mastered'
        // The payload may never claim mastery the record refuses.
        expect(payloadSaysMastered && !recordSaysMastered).toBe(false)
      })
    }
  }
})

describe('C. an ordinary lesson is untouched', () => {
  it('with no invented key, the learner is verified and recorded mastered', () => {
    const s = driveLesson({ inventedKeyEarly: false, checkClean: true })
    expect(launderedEvidence(s)).toBe(false)
    expect(summary(s).verified).toBe(true)
    expect(conceptOutcome(s, 'Friction Forces').status).toBe('mastered')
  })

  it('launderedEvidence is inert whenever no key was invented', () => {
    // The scoping that keeps this from touching every lesson in the product.
    const s = driveLesson({ inventedKeyEarly: false, checkClean: false })
    expect(s.unauthoredKeyGrades ?? 0).toBe(0)
    expect(launderedEvidence(s)).toBe(false)
  })
})

describe('D. one definition, not two', () => {
  it('launderedEvidence is defined once, in masteryGate', () => {
    const { readFileSync } = require('node:fs')
    const { join } = require('node:path')
    const gate = readFileSync(join(process.cwd(), 'src/lib/teaching/masteryGate.ts'), 'utf8')
    const sum = readFileSync(join(process.cwd(), 'src/lib/teaching/lessonSummary.ts'), 'utf8')
    expect((gate.match(/function launderedEvidence\b/g) ?? []).length).toBe(1)
    expect(/function launderedEvidence\b/.test(sum)).toBe(false)
    expect(sum).toContain("import { launderedEvidence } from './masteryGate'")
  })
})
