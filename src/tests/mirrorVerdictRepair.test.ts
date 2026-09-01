/**
 * "SO YOU'RE SAYING THE FRICTION FORCE IS 40 N. IS THAT RIGHT?"
 *
 * ── QUEUE ITEM (3), MEASURED LIVE AT LAST ───────────────────────────────────
 * The mirror turn had gone unseen for eighteen transcripts, so it was carried
 * as "not observed" rather than closed. It reproduced on 2026-09-01
 * (phys.mech.friction, disposable account, deployed app) on a session parked
 * mid-struggle — and it landed on the worst possible turn:
 *
 *   learner: "40 N — friction always equals μ_s × N"      (a WRONG option)
 *   tutor:   "So you're saying the friction force is 40 N. Is that right?"
 *
 *   isMirrorTurn -> true, overlap 0.33
 *   [mcq-grade]  -> correct: false, with the authored key in hand
 *
 * The learner gave a wrong answer and was asked to CONFIRM it, by a server
 * that knew it was wrong and knew the right one, and said neither.
 *
 * ── WHY THIS IS NOW REPAIRABLE, WHEN IT PREVIOUSLY WAS NOT ──────────────────
 * route.ts recorded the reason for detection-only, and it was exact:
 * "composing a verdict would mean inventing one for a FREE-RESPONSE answer the
 * server has no ground truth for." That reasoning is SCOPED, not universal —
 * it does not hold for an MCQ graded against an authored key, where the
 * verdict is not a judgement to invent but a value already computed.
 *
 * So the repair states what the server already knows and NOTHING else. With no
 * grade it returns the text untouched, which is the free-response case, where
 * the original conclusion still stands and the next-turn directive remains the
 * only handling.
 *
 * It REPLACES rather than prefixes, deliberately: a mirror IS the whole turn
 * (the detector requires <= 2 sentences ending on a confirmation request), so
 * there is no teaching to preserve — which is exactly what made it
 * unrepairable in place before ground truth was available.
 */
import { describe, it, expect } from 'vitest'
import { repairMirrorWithVerdict, isMirrorTurn } from '@/lib/teaching/attributionGuard'

const LEARNER = '40 N — friction always equals μ_s × N'
const MIRROR = "So you're saying the friction force is 40 N. Is that right?"
const KEY = '20 N — static friction matches the push.'

describe('A. the verbatim live turn', () => {
  it('is detected as a mirror', () => {
    expect(isMirrorTurn(MIRROR, LEARNER).isMirror).toBe(true)
  })

  it('a WRONG graded answer is corrected, with the answer the server holds', () => {
    const r = repairMirrorWithVerdict({
      text: MIRROR, learnerMessage: LEARNER,
      graded: { correct: false, correctOptionText: KEY },
    })
    expect(r.repaired).toBe(true)
    expect(r.reason).toBe('revealed-answer')
    expect(r.text).toBe('Not quite — the answer was: 20 N — static friction matches the push.')
    // The learner is never asked to confirm their own wrong answer again.
    expect(r.text).not.toMatch(/is that right|am i right|you're saying/i)
  })

  it('a CORRECT graded answer is confirmed instead of queried', () => {
    const r = repairMirrorWithVerdict({
      text: MIRROR, learnerMessage: LEARNER, graded: { correct: true },
    })
    expect(r.repaired).toBe(true)
    expect(r.reason).toBe('confirmed-correct')
    expect(r.text).toBe("That's right.")
  })
})

describe('B. the free-response case is deliberately untouched', () => {
  it('no server grade means no repair — the documented limit', () => {
    for (const graded of [null, undefined, { correct: null }]) {
      const r = repairMirrorWithVerdict({
        text: MIRROR, learnerMessage: LEARNER,
        graded: graded as Parameters<typeof repairMirrorWithVerdict>[0]['graded'],
      })
      expect(r.repaired).toBe(false)
      expect(r.reason).toBe('no-server-grade')
      expect(r.text).toBe(MIRROR)
    }
  })
})

describe('C. a turn that restates and then TEACHES is not a mirror', () => {
  // The detector's specificity is what keeps this repair from eating real
  // teaching; asserted here because this repair REPLACES the whole turn.
  for (const text of [
    "So you're saying 40 N. That is the MAXIMUM, but the push was only 20 N, so friction matches the push instead.",
    'Not quite — the answer was: 20 N. Let me check your thinking with this.',
    'Exactly right — static friction matches the push.',
  ]) {
    it(`untouched: ${JSON.stringify(text.slice(0, 52))}`, () => {
      const r = repairMirrorWithVerdict({
        text, learnerMessage: LEARNER, graded: { correct: false, correctOptionText: KEY },
      })
      expect(r.repaired).toBe(false)
      expect(r.reason).toBe('not-a-mirror')
      expect(r.text).toBe(text)
    })
  }
})

describe('D. the answer key is handled exactly as the gate handles it', () => {
  it('a key that is itself a question is not revealed', () => {
    const r = repairMirrorWithVerdict({
      text: MIRROR, learnerMessage: LEARNER,
      graded: { correct: false, correctOptionText: 'What happens to friction?' },
    })
    expect(r.text).toBe('Not quite.')
  })

  it('an empty or missing key falls back to the bare form', () => {
    for (const correctOptionText of ['', '   ', null, undefined]) {
      const r = repairMirrorWithVerdict({
        text: MIRROR, learnerMessage: LEARNER,
        graded: { correct: false, correctOptionText },
      })
      expect(r.text).toBe('Not quite.')
    }
  })

  it('terminal punctuation is normalised through the SAME helper as the gate', () => {
    // Shares `endStopped` with gateAssessment, so the double-full-stop defect
    // fixed there cannot reappear here independently.
    expect(repairMirrorWithVerdict({
      text: MIRROR, learnerMessage: LEARNER,
      graded: { correct: false, correctOptionText: 'It doubles.' },
    }).text).toBe('Not quite — the answer was: It doubles.')
    expect(repairMirrorWithVerdict({
      text: MIRROR, learnerMessage: LEARNER,
      graded: { correct: false, correctOptionText: 'It doubles' },
    }).text).toBe('Not quite — the answer was: It doubles.')
  })
})

describe('E. the route wires it with the gate\'s own derivation', () => {
  it('takes the option text from the pending MCQ it was graded against', () => {
    const { readFileSync } = require('node:fs')
    const { join } = require('node:path')
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain('repairMirrorWithVerdict({')
    const idx = route.indexOf('repairMirrorWithVerdict({')
    const block = route.slice(idx, idx + 700)
    expect(block).toContain('pendingMcqHoisted?.options?.[pendingMcqHoisted.correctIndex]')
  })
})
