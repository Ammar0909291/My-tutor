/**
 * LEARNER-MOVE RECOVERY EQUIVALENCE — Batch 6 (design doc §8 row 6, RECOVERY
 * rung only). Proves `recoveryActive: recoveryKeyHoisted !== null` and
 * `recoveryActive: learnerMoveStageAHoisted.has('DISTRESS')` are the SAME
 * boolean across a real corpus — not by argument alone (that proof is
 * structural and already lives in `learnerMoveAgreement.ts`'s own header:
 * both read `turnIntent.failureState`, the identical field on the identical
 * object), but measured, the same discipline
 * `learnerMoveSteeringEquivalence.test.ts` (Batch 5) established.
 *
 * Corpus: every firing/non-firing fixture in `recoveryGuard.test.ts`
 * (`detectFailureState`'s own test file — reused, not re-derived) plus the
 * design doc §4.4 gap phrasings, included here as NEGATIVE CONTROLS: both
 * sides must agree they do NOT fire, proving the conversion changes
 * nothing about that pre-existing, deliberately-unfixed gap.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { readLearnerMove } from '@/lib/teaching/learnerMove'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

/** Same real chain the route now uses: turnIntent -> reading. */
function distressFires(message: string, priorUserMessage: string | null = null): { recoveryKey: boolean; reading: boolean } {
  const intent = readTurnIntent(message, priorUserMessage)
  const reading = readLearnerMove(intent, { isBareAcknowledgement: false, isLowSignalAcknowledgement: false })
  return {
    recoveryKey: intent.failureState !== null,
    reading: reading.has('DISTRESS'),
  }
}

// ── Positive corpus: every message recoveryGuard.test.ts asserts DOES fire ──
const FIRING = [
  'I give up',
  'ok fine I just give up on this whole thing honestly',
  "I'm so stupid, everyone else gets this",
  'i am scared of getting it wrong again',
  'I hate maths and I always have',
  'this is just too hard for me',
  "I can't do this",
  "I don't know",
  'i dont know...',
  "I'm confused",
  'that was a guess',
  'I know nothing',
  'dont know',
  'dunno',
  'Where?',
  'What?',
  'Why?',
  "This doesn't make sense",
  'I never learned this',
  'we never studied that in school',
  'idk',
  'idk lol',
  'beats me',
  'drawing a blank',
  'I quit',
  'I just quit',
  'huh?',
  'huh',
  'no idea',
  'no idea...',
  'my mind is blank',
  'mind went blank',
]

// ── Negative corpus: recoveryGuard.test.ts's own "does NOT fire" fixtures —
// mild utterances buried in a long message, which detectFailureState
// deliberately requires to BE the whole message. ──
const NON_FIRING_MILD = [
  "I don't know if chapter 3 covers this but could you explain how photosynthesis relates to the carbon cycle in more detail please",
  "I'm confused about why the author of this very long historical passage decided to introduce the treaty before the war ended, can we go through the timeline",
]

// ── The §4.4 gap phrasings, verbatim from the design doc's own 9/9 table —
// negative controls: BOTH sides must agree they do NOT fire, proving this
// batch changes nothing about the pre-existing, deliberately-unfixed gap. ──
const GAP_PHRASINGS_4_4 = [
  'sir i not understand this',
  'i not understand',
  'i cannot understand',
  'i can not understand',
  "i couldn't understand",
  'i am not getting it',
  "i'm not getting it",
  'not able to understand',
  'i am very weak in this',
]

// The design doc's own controls for §4.4 — these DO fire on both sides
// (the gap is specifically the non-standard-English phrasings above, not
// every confusion utterance).
const GAP_TABLE_CONTROLS_FIRE = [
  "i don't understand",
  'I am lost',
]

// An ordinary answer, and an ordinary teaching turn — bare or unrelated
// text, neither side should ever fire.
const ORDINARY = [
  'the anode',
  'A',
  'B',
  'static friction',
  'ok got it thanks',
  "let's move on",
  'can we go back to fractions',
]

describe('RECOVERY equivalence: recoveryKeyHoisted !== null === reading.has(\'DISTRESS\')', () => {
  it.each(FIRING)('FIRING: %s', (msg) => {
    const { recoveryKey, reading } = distressFires(msg)
    expect(reading).toBe(recoveryKey)
    expect(recoveryKey).toBe(true) // sanity: this corpus really does fire
  })

  it.each(NON_FIRING_MILD)('NON-FIRING (mild, buried in a long message): %s', (msg) => {
    const { recoveryKey, reading } = distressFires(msg)
    expect(reading).toBe(recoveryKey)
    expect(recoveryKey).toBe(false) // sanity: this corpus really does not fire
  })

  it.each(GAP_PHRASINGS_4_4)('§4.4 GAP (negative control — both sides agree: NO fire): %s', (msg) => {
    const { recoveryKey, reading } = distressFires(msg)
    expect(reading).toBe(recoveryKey)
    expect(recoveryKey).toBe(false) // the gap itself — unchanged by this batch
  })

  it.each(GAP_TABLE_CONTROLS_FIRE)('§4.4 table control (DOES fire on both): %s', (msg) => {
    const { recoveryKey, reading } = distressFires(msg)
    expect(reading).toBe(recoveryKey)
    expect(recoveryKey).toBe(true)
  })

  it.each(ORDINARY)('ORDINARY (never fires): %s', (msg) => {
    const { recoveryKey, reading } = distressFires(msg)
    expect(reading).toBe(recoveryKey)
    expect(recoveryKey).toBe(false)
  })

  it('summary: 0 disagreements across the full combined corpus', () => {
    const all = [...FIRING, ...NON_FIRING_MILD, ...GAP_PHRASINGS_4_4, ...GAP_TABLE_CONTROLS_FIRE, ...ORDINARY]
    const disagreements = all.filter((msg) => {
      const { recoveryKey, reading } = distressFires(msg)
      return recoveryKey !== reading
    })
    expect(disagreements).toEqual([])
    expect(all.length).toBeGreaterThanOrEqual(44)
  })
})

describe('the reading\'s DISTRESS signal clears the >= 0.8 authority bar', () => {
  it('confidence is CONFIDENCE.RECOVERY_GUARD (0.9)', () => {
    const intent = readTurnIntent('I give up', null)
    const reading = readLearnerMove(intent, { isBareAcknowledgement: false, isLowSignalAcknowledgement: false })
    const signal = reading.signals.find((s) => s.kind === 'DISTRESS')
    expect(signal).toBeDefined()
    expect(signal!.confidence).toBe(0.9)
    expect(signal!.confidence).toBeGreaterThanOrEqual(0.8)
  })
})

describe('the route wires Batch 6 correctly — source pins', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('arbitrateTurn reads the reading, never the raw recoveryKeyHoisted null-check, for recoveryActive', () => {
    const at = ROUTE.indexOf('turnArbitrationHoisted = arbitrateTurn({')
    expect(at).toBeGreaterThan(-1)
    const block = ROUTE.slice(at, at + 400)
    expect(block).toMatch(/recoveryActive:\s*learnerMoveStageAHoisted\.has\('DISTRESS'\)/)
    expect(block).not.toMatch(/recoveryActive:\s*recoveryKeyHoisted\s*!==\s*null/)
  })

  it('learnerRequestActive was UNTOUCHED by Batch 6 (this batch\'s own exclusion) — SUPERSEDED BY BATCH 7', () => {
    // Batch 6 deliberately left this field as the raw compound
    // `turnIntent.learnerRequest !== null || turnIntent.ambiguous` — the
    // design doc's own "one rung per commit" applied to this same call
    // site. Batch 7 (design doc §8 row 6's second half) converts it too,
    // once `.ambiguous`'s pass-through was verified rather than assumed to
    // need a new reading field. See
    // learnerMoveRequestEquivalence.test.ts for that batch's own proof.
    // Original assertion, preserved:
    //
    //   const block = ROUTE.slice(at, at + 600)
    //   expect(block).toMatch(/learnerRequestActive:\s*\n\s*turnIntent\.learnerRequest !== null \|\| turnIntent\.ambiguous/)
    //   expect(block).not.toMatch(/learnerRequestActive:\s*learnerMoveStageAHoisted/)
    const at = ROUTE.indexOf('turnArbitrationHoisted = arbitrateTurn({')
    const block = ROUTE.slice(at, at + 2000)
    expect(block).toMatch(/learnerRequestActive:\s*\n\s*learnerMoveStageAHoisted\.has\('HELP_REQUEST'\) \|\| learnerMoveStageAHoisted\.ambiguous/)
    expect(block).not.toMatch(/learnerRequestActive:\s*\n\s*turnIntent\.learnerRequest !== null \|\| turnIntent\.ambiguous/)
  })

  it('exactly 3 readLearnerMove( call-EXPRESSIONS in the whole file — all three now fallback-shaped except the new earliest one, which is why the count grew rather than stayed flat', () => {
    // Batch 5 pinned 2 (its own unconditional assignment + Batch 1's own
    // `?? readLearnerMove(...)` fallback). Batch 6 adds a THIRD real call
    // site — the new earliest hoist, before `arbitrateTurn(` — and converts
    // Batch 5's OWN site from an unconditional assignment into a third
    // `?? readLearnerMove(...)` fallback. "Consolidated" means only ONE of
    // the three ever actually EXECUTES its call in practice (the earliest
    // one; the other two short-circuit on `??` once it has run) — it does
    // NOT mean the literal source text has fewer call-expressions, since a
    // fallback's call-expression is still written in the source even though
    // it is conditionally skipped at runtime. Confirmed no third computation
    // ever actually RUNS by the `??` guard itself (see the next two tests)
    // and by learnerMoveSteeringEquivalence.test.ts's own re-pinned count.
    const code = ROUTE
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    expect(code.split('readLearnerMove(').length - 1).toBe(3)
  })

  it('the new early hoist is genuinely BEFORE arbitrateTurn(, not after', () => {
    const hoistAt = ROUTE.indexOf('learnerMoveStageAHoisted = learnerMoveStageAHoisted ?? readLearnerMove(turnIntent, {\n              isBareAcknowledgement: isBareAckHoisted,')
    const arbitrateAt = ROUTE.indexOf('turnArbitrationHoisted = arbitrateTurn({')
    expect(hoistAt).toBeGreaterThan(-1)
    expect(arbitrateAt).toBeGreaterThan(-1)
    expect(hoistAt).toBeLessThan(arbitrateAt)
  })

  it('the Batch 5 site now reuses via ?? — never recomputes unconditionally', () => {
    const at = ROUTE.indexOf("// Learner-Move Interpreter, Batch 5 (design doc §8 row 5): stage")
    expect(at).toBeGreaterThan(-1)
    const block = ROUTE.slice(at, at + 2200)
    expect(block).toMatch(/learnerMoveStageAHoisted = learnerMoveStageAHoisted \?\? readLearnerMove\(/)
  })

  it('recoveryGuard.ts / detectFailureState is untouched by this batch — no diff marker, no widened pattern list added here', () => {
    // Structural proxy: this batch's own commit never touches that file —
    // verified by the commit diff itself, not re-derivable from route.ts.
    // This test instead pins the NEGATIVE-CONTROL behaviour recorded above:
    // the §4.4 gap phrasings still fail to fire detectFailureState, which
    // would break the moment someone widens it without updating this file.
    for (const msg of GAP_PHRASINGS_4_4) {
      expect(detectFailureState(msg)).toBeNull()
    }
  })
})
