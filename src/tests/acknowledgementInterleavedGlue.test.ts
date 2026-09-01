/**
 * AN ACKNOWLEDGEMENT IS RARELY A CHAIN OF BARE TOKENS.
 *
 * ── THE DEFECT, MEASURED LIVE ───────────────────────────────────────────────
 * phys.mech.friction, 2026-09-01, disposable account, driven as a learner
 * against the deployed app. Five turns, phase pinned at OBSERVE the whole way,
 * `demonstrated: false`, check 0 / practice 0 — the "froze in OBSERVE" symptom.
 *
 * `OBSERVE -> DEMONSTRATE` moves on a graded-correct signal OR an
 * acknowledgement (advanceConversationState). The learner produced neither:
 *
 *   [ladder] { ack: false }   "ok, i think i follow so far"
 *   [ladder] { ack: false }   "ok that makes sense now, the surface pushes back"
 *
 * `LOW_SIGNAL_TOKENS_RE` is anchored `^...$` around a REPEAT of adjacent
 * tokens, so the tokens must be CONTIGUOUS. Real speech interleaves glue.
 * The sharpest case, verified against the real function before the fix:
 *
 *   isLowSignalAcknowledgement('yeah that makes sense')  ->  false
 *
 * Every word is drawn from the detector's own receipt vocabulary; the single
 * word "that" broke the chain. The most natural acknowledgement a learner can
 * give was invisible to the one detector written to catch it.
 *
 * ── THE REGRESSION THIS TEST EXISTS TO PREVENT ──────────────────────────────
 * The first version of the strip removed a bare "it" and so turned "got it"
 * into "got" and "i get it" into "i get", DESTROYING two tokens the list has
 * always carried. That was caught by running the negative controls, not by
 * reading the diff. Section C is that near-miss, pinned.
 */
import { describe, it, expect } from 'vitest'
import {
  isLowSignalAcknowledgement, initialConversationState, advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

// ═══════════════════════════════════════════════════════════════════════════
// A. THE VERBATIM PRODUCTION MESSAGES
// ═══════════════════════════════════════════════════════════════════════════
describe('A. the messages measured live', () => {
  it('"ok, i think i follow so far" is an acknowledgement', () => {
    expect(isLowSignalAcknowledgement('ok, i think i follow so far')).toBe(true)
  })

  it('"yeah that makes sense" — every word already in the vocabulary', () => {
    expect(isLowSignalAcknowledgement('yeah that makes sense')).toBe(true)
  })

  it('glue words do not have to be the same ones each time', () => {
    for (const m of [
      'ok that makes sense',
      'yeah i follow',
      'right, that all makes sense now',
      'ok i think i understand',
      "alright i'm with you",
      'yep got it now',
    ]) {
      expect(isLowSignalAcknowledgement(m), m).toBe(true)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// B. CONTENT STILL BREAKS THE ANCHOR
//
// This is what makes the strip safe: content words survive it and still fail
// the match. If a future edit widens the connective list far enough to strip
// real content, these are the cases that fail first.
// ═══════════════════════════════════════════════════════════════════════════
describe('B. a message carrying real content is not an acknowledgement', () => {
  for (const m of [
    'no that is wrong',
    'i think that is wrong',
    'it is fine',
    'so the answer is 30 N',
    'that is 30 N',
    'the box weighs 10 kg',
    'good question',
    'sure but why does it stop',
    'ok so is it always mu times weight?',
  ]) {
    it(`stays content: ${JSON.stringify(m)}`, () => {
      expect(isLowSignalAcknowledgement(m)).toBe(false)
    })
  }

  it('bare "so" is NOT stripped — it is a reasoning connective', () => {
    // Only the bigram "so far" is glue. Stripping "so" would make
    // "so the answer is 30 N" one step closer to reading as a receipt.
    expect(isLowSignalAcknowledgement('so the answer is 30 N')).toBe(false)
  })

  it('a receipt PLUS a substantive claim is deliberately still not low-signal', () => {
    // MEASURED, and deliberately NOT fixed here: this carries a correct
    // restatement of what was just taught. Calling it "low signal" would be
    // wrong, and grading it needs an evidence class that does not exist.
    // Recorded so the remaining half of the OBSERVE pin is not mistaken for
    // an oversight.
    expect(
      isLowSignalAcknowledgement('ok that makes sense now, the surface pushes back'),
    ).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. THE NEAR-MISS — pre-existing positives must survive the strip
// ═══════════════════════════════════════════════════════════════════════════
describe('C. every token the list already carried still matches', () => {
  for (const m of [
    'ok', 'okay', 'got it', 'i got it', 'i get it', 'makes sense', 'i see',
    'understood', 'i understand', 'sure', 'yep', 'cool', 'fine', 'noted',
    'continue', 'next', 'ready', "let's go", 'keep going', 'proceed', 'go ahead',
    'ok sir', 'got it sir',
  ]) {
    it(`unchanged: ${JSON.stringify(m)}`, () => {
      expect(isLowSignalAcknowledgement(m)).toBe(true)
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// D. DISTRESS IS STRUCTURALLY OUT OF REACH
//
// Not a word on a list: `failed` (which includes recoveryFired) returns from
// the fold ABOVE the acknowledgement branch, so a distress turn can never be
// folded as a receipt whatever this predicate returns.
// ═══════════════════════════════════════════════════════════════════════════
describe('D. an acknowledgement prefix cannot launder distress', () => {
  it('"ok but i still dont understand" is recovery, not a receipt', () => {
    expect(detectFailureState('ok but i still dont understand')).toBe('dont_understand')
    expect(isLowSignalAcknowledgement('ok but i still dont understand')).toBe(false)
  })

  it('a recovery turn never reaches the acknowledgement branch of the fold', () => {
    const s = { ...initialConversationState('phys.mech.friction'), phase: 'OBSERVE' as const }
    const next = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true,
      acknowledgement: true, // even if a caller wrongly reports one
    } as Parameters<typeof advanceConversationState>[1])
    // The failure path owns the turn; it must not be read as a delivery receipt.
    expect(next.phase).not.toBe('DEMONSTRATE')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// E. THE LADDER ACTUALLY MOVES — and the mastery bar does not
// ═══════════════════════════════════════════════════════════════════════════
describe('E. the fold consequence', () => {
  const ack = (s: ConversationState, message: string) =>
    advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      acknowledgement: isLowSignalAcknowledgement(message),
    } as Parameters<typeof advanceConversationState>[1])

  it('the live message now advances OBSERVE -> DEMONSTRATE', () => {
    const s = { ...initialConversationState('phys.mech.friction'), phase: 'OBSERVE' as const }
    expect(ack(s, 'ok, i think i follow so far').phase).toBe('DEMONSTRATE')
  })

  it('a hundred interleaved acknowledgements still verify no mastery', () => {
    // The whole safety argument for widening this: an acknowledgement moves
    // DELIVERY phases only. The gates read correctAtCheck / correctAtPractice,
    // which only a graded answer increments.
    let s: ConversationState = {
      ...initialConversationState('phys.mech.friction'), phase: 'CHECK' as const,
    }
    for (let i = 0; i < 100; i++) s = ack(s, 'yeah that makes sense')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })
})
