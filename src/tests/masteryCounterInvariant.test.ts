/**
 * ENG-D06 — "verified/complete with check=0 practice=0".
 *
 * ── VERDICT: BENIGN. The observation was an INSTRUMENT defect, and the
 *    invariant it appeared to violate is structurally guaranteed. ───────────
 *
 * The QA register recorded this as "P0 if confirmed" with root cause
 * UNCONFIRMED and two candidate explanations, (a) a real gap between recorded
 * evidence and the certified result, or (b) "a display/parsing artifact ...
 * the printed check/practice fields may not be the same counters the mastery
 * gate actually reads". It named direct DB verification as the necessary next
 * step. It was decidable from the repository alone, with no query:
 *
 *   `MasterySummary` (masteryGate.ts) exposes `checkCorrect` / `practiceCorrect`.
 *   The 19 QA driver scripts read `m?.correctAtCheck ?? 0` — a field the
 *   payload has never carried. `undefined ?? 0` is 0, so those drivers printed
 *   `check=0 practice=0` on EVERY turn of EVERY run, whatever the evidence.
 *   `verified` was read from the real field. The line was therefore
 *   structurally "check=0 practice=0 verified=<truth>", and the 0/0 measured
 *   nothing. All three ENG-D06 sightings came through that same `display()`.
 *
 * Explanation (b), confirmed. The drivers are corrected in the same commit —
 * a known-broken instrument left in place guarantees this false P0 recurs, and
 * this repo has recorded four prior occasions where a harness nearly condemned
 * the product for its own blind spot.
 *
 * ── AND THE INVARIANT ITSELF ───────────────────────────────────────────────
 * Independently of the instrument: `verifiedCorrectAtX <= correctAtX` holds
 * for every real fold path, because there is exactly ONE increment site for
 * each pair (conversationState.ts CHECK/PRACTICE cases) and the verified
 * increment is nested inside the same branch that unconditionally increments
 * the plain one. The tests below prove it by DRIVING the real fold rather than
 * by reading it, and prove the consequence that matters: `conceptMasteryVerdict`
 * — the single authority the completion gate, the payload and the permanent
 * record all consult — can never be true while the plain counters are 0/0.
 *
 * Nothing here weakens `masteryVerifiedStrict` or its anti-laundering
 * safeguards; it asserts what they already do.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  advanceConversationState,
  initialConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import {
  conceptMasteryVerdict,
  buildMasterySummary,
  MASTERY_CHECK_REQUIRED,
  MASTERY_PRACTICE_REQUIRED,
} from '@/lib/teaching/masteryGate'

const ev = (o: Partial<TurnEvidence>): TurnEvidence => ({
  askedQuestion: true,
  signalCorrect: null,
  recoveryFired: false,
  ...o,
} as TurnEvidence)

const invariantHolds = (s: ConversationState) =>
  (s.verifiedCorrectAtCheck ?? 0) <= s.correctAtCheck
  && (s.verifiedCorrectAtPractice ?? 0) <= s.correctAtPractice

describe('ENG-D06: verifiedCorrectAtX <= correctAtX on every real fold path', () => {
  it('holds across every combination of correctness x serverGraded, 12 turns deep', () => {
    // Exhaustive over the evidence shapes that can touch these counters, to a
    // depth well past the three graded answers mastery needs.
    const shapes: TurnEvidence[] = [
      ev({ signalCorrect: true, serverGraded: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: true, serverGraded: false } as Partial<TurnEvidence>),
      ev({ signalCorrect: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: false, serverGraded: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: false } as Partial<TurnEvidence>),
      ev({ signalCorrect: null, acknowledgement: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: null, askedQuestion: false } as Partial<TurnEvidence>),
      ev({ signalCorrect: null, recoveryFired: true } as Partial<TurnEvidence>),
    ]
    let checked = 0
    // Every sequence of length 4 over the 8 shapes (4,096), then 8 more turns
    // of the most evidence-productive shape on top of each.
    for (let a = 0; a < shapes.length; a++) {
      for (let b = 0; b < shapes.length; b++) {
        for (let c = 0; c < shapes.length; c++) {
          for (let d = 0; d < shapes.length; d++) {
            let s = initialConversationState('eng.grammar.verbs')
            for (const i of [a, b, c, d]) {
              s = advanceConversationState(s, shapes[i])
              expect(invariantHolds(s)).toBe(true)
              checked += 1
            }
            for (let k = 0; k < 8; k++) {
              s = advanceConversationState(s, shapes[0])
              expect(invariantHolds(s)).toBe(true)
              checked += 1
            }
          }
        }
      }
    }
    expect(checked).toBe(8 ** 4 * 12)
  })

  it('a fully mastered ladder ends with plain counters at or above the gates', () => {
    let s = initialConversationState('eng.grammar.verbs')
    for (let i = 0; i < 10; i++) {
      s = advanceConversationState(s, ev({ signalCorrect: true, serverGraded: true } as Partial<TurnEvidence>))
    }
    expect(conceptMasteryVerdict(s)).toBe(true)
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(MASTERY_CHECK_REQUIRED)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(MASTERY_PRACTICE_REQUIRED)
  })
})

describe('ENG-D06: the reported shape is unreachable through the real fold', () => {
  it('no reachable state has verdict=true with plain counters 0/0', () => {
    const shapes: TurnEvidence[] = [
      ev({ signalCorrect: true, serverGraded: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: true } as Partial<TurnEvidence>),
      ev({ signalCorrect: false } as Partial<TurnEvidence>),
      ev({ signalCorrect: null, acknowledgement: true } as Partial<TurnEvidence>),
    ]
    for (let a = 0; a < shapes.length; a++) {
      for (let b = 0; b < shapes.length; b++) {
        for (let c = 0; c < shapes.length; c++) {
          for (let d = 0; d < shapes.length; d++) {
            for (let e = 0; e < shapes.length; e++) {
              let s = initialConversationState('eng.grammar.verbs')
              for (const i of [a, b, c, d, e]) s = advanceConversationState(s, shapes[i])
              if (conceptMasteryVerdict(s)) {
                expect(s.correctAtCheck + s.correctAtPractice).toBeGreaterThan(0)
                const summary = buildMasterySummary(s, { completionSuppressed: false, gatePending: false })
                // The payload reads BOTH from the same state, so the printed
                // numbers and the verdict cannot disagree.
                expect(summary.verified).toBe(true)
                expect(summary.checkCorrect).toBeGreaterThanOrEqual(MASTERY_CHECK_REQUIRED)
                expect(summary.practiceCorrect).toBeGreaterThanOrEqual(MASTERY_PRACTICE_REQUIRED)
              }
            }
          }
        }
      }
    }
  })
})

describe('ENG-D06: the instrument, which is what actually produced 0/0', () => {
  it('MasterySummary exposes checkCorrect/practiceCorrect, never correctAtCheck', () => {
    const s = initialConversationState('eng.grammar.verbs')
    const summary = buildMasterySummary(s, { completionSuppressed: false, gatePending: false }) as Record<string, unknown>
    expect(Object.keys(summary)).toContain('checkCorrect')
    expect(Object.keys(summary)).toContain('practiceCorrect')
    expect(Object.keys(summary)).not.toContain('correctAtCheck')
    expect(Object.keys(summary)).not.toContain('correctAtPractice')
  })

  it('no QA driver reads the counters by a name the payload does not carry', () => {
    // The defect this pins: `m?.correctAtCheck ?? 0` is `undefined ?? 0`, so
    // the driver printed 0 on every turn of every run and three sightings of
    // that constant were filed as a P0 mastery defect.
    const dir = path.join(process.cwd(), 'scripts/qa')
    const offenders: string[] = []
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.ts')) continue
      const src = fs.readFileSync(path.join(dir, f), 'utf8')
      // Only the MASTERY-PAYLOAD read is wrong; reading the field off a
      // ConversationState (where it genuinely exists) is fine.
      if (/\bm(?:astery)?\?\.correctAt(?:Check|Practice)\b/.test(src)) offenders.push(f)
    }
    expect(offenders).toEqual([])
  })
})
