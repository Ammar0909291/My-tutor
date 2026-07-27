/**
 * K7 — the Frustration machine (RS §4.14).
 *
 * The one §4 estimator implementable without behavioral baselines (absolute
 * triggers) and with an existing customer (the verifier's affect band).
 * These tests pin the spec's transition table, the fold's replay properties,
 * and the relationship to the pre-K7 floor it supersedes.
 */
import { describe, it, expect } from 'vitest'
import {
  initialFrustration, readFrustration, stepFrustration, affectBandOf,
  type FrustrationMachine, type FrustrationEvidence,
} from '@/lib/kernel/frustration'
import { buildVerifierContext } from '@/lib/eos-runtime/buildContext'

const quiet: FrustrationEvidence = { failed: null, recoveryFired: false, succeeded: false }
const fail: FrustrationEvidence = { failed: true, recoveryFired: false, succeeded: false }
const win: FrustrationEvidence = { failed: false, recoveryFired: false, succeeded: true }
const utter: FrustrationEvidence = { failed: null, recoveryFired: true, succeeded: false }

function run(events: FrustrationEvidence[], from = initialFrustration()): FrustrationMachine {
  return events.reduce(stepFrustration, from)
}

describe('the §4.14 transition table', () => {
  it('CALM → STRAINED on one failure (the spec trigger, stricter than the old floor)', () => {
    expect(run([fail]).state).toBe('STRAINED')
  })

  it('→ FLOODED on two failures inside the three-turn window', () => {
    expect(run([fail, fail]).state).toBe('FLOODED')
    expect(run([fail, quiet, fail]).state).toBe('FLOODED')      // 2-in-3 still floods
  })

  it('the window FORGETS: two failures four turns apart do not flood', () => {
    expect(run([fail, quiet, quiet, quiet, fail]).state).toBe('STRAINED')
  })

  it('→ RECOVERING on a recovery-guard utterance, from any state', () => {
    expect(run([utter]).state).toBe('RECOVERING')
    expect(run([fail, fail, utter]).state).toBe('RECOVERING')
  })

  it('RECOVERING exits to CALM only after a banked win AND a clean turn', () => {
    // The §4.14 exit criteria, in order. A win alone is not enough…
    expect(run([utter, win]).state).toBe('RECOVERING')
    // …the clean turn after it completes the exit…
    expect(run([utter, win, quiet]).state).toBe('CALM')
    // …and a failure after the win voids it.
    expect(run([utter, win, fail]).state).toBe('RECOVERING')
  })

  it('a win banked BEFORE the flood does not count', () => {
    // Entering recovery clears winBanked: the win must come after.
    const m = run([win, utter])
    expect(m.winBanked).toBe(false)
    expect(run([win, utter, quiet]).state).toBe('RECOVERING')
  })

  it('FLOODED drains through STRAINED, never straight to CALM', () => {
    expect(run([fail, fail, quiet, quiet, win]).state).toBe('STRAINED')
    expect(run([fail, fail, quiet, quiet, win, win]).state).toBe('CALM')
  })

  it('a null answer is never counted as a failure (fabrication forbidden)', () => {
    expect(run([quiet, quiet, quiet]).state).toBe('CALM')
  })
})

describe('fold properties', () => {
  it('is deterministic and replayable: same events ⇒ identical state', () => {
    const events = [fail, quiet, fail, utter, win, quiet, fail, win, win]
    expect(JSON.stringify(run(events))).toBe(JSON.stringify(run(events)))
  })

  it('snapshot-resume equals full refold (the RS L4 cache property)', () => {
    const events = [fail, fail, utter, win, quiet, fail]
    for (let cut = 0; cut <= events.length; cut++) {
      const snapshot = run(events.slice(0, cut))
      const resumed = run(events.slice(cut), readFrustration(JSON.parse(JSON.stringify(snapshot))))
      expect(JSON.stringify(resumed), `cut at ${cut}`).toBe(JSON.stringify(run(events)))
    }
  })

  it('readFrustration is total on garbage (a snapshot field never takes a turn down)', () => {
    for (const raw of [null, undefined, 42, 'x', {}, { state: 'PANIC' }, { recentFailures: 'no' }]) {
      // Unknown/invalid stored states fall back to CALM, never throw.
      expect(readFrustration(raw).state).toBe('CALM')
      expect(() => stepFrustration(readFrustration(raw), fail)).not.toThrow()
    }
    // A valid stored state survives the round trip.
    expect(readFrustration({ state: 'FLOODED', recentFailures: [true, true], winBanked: false }).state).toBe('FLOODED')
  })
})

describe('the customer — the verifier affect band', () => {
  it('maps CALM/STRAINED/FLOODED/RECOVERING onto the verifier vocabulary', () => {
    expect(affectBandOf('CALM')).toBe('calm')
    expect(affectBandOf('STRAINED')).toBe('strained')
    expect(affectBandOf('FLOODED')).toBe('flooded')
    // RECOVERING stays flooded: caution must not relax until the exit holds.
    expect(affectBandOf('RECOVERING')).toBe('flooded')
  })

  it('a supplied band is authoritative over the legacy floor', () => {
    const base = {
      contentRegister: 'beginner' as const, move: 'TEACH' as const, phase: 'GUIDE',
      stageCeiling: 4, vocabularyUnlocked: true, formulaUnlocked: true,
      recoveryActive: false, maxQuestions: 0 as const, maxParagraphs: 4, maxNewTerms: 1,
      vocabularyBans: [], assessmentActive: false, lessonCompletionAuthorized: false,
      sessionFailureCount: 0, learnerText: 'x', reactMandated: false,
      legalTags: [], bannedConceptTerms: [],
    }
    // Machine says strained after ONE failure — the floor would have said calm.
    expect(buildVerifierContext({ ...base, affectBand: 'strained' }).affectBand).toBe('strained')
    // Without machine state the floor still applies, unchanged.
    expect(buildVerifierContext(base).affectBand).toBe('calm')
    expect(buildVerifierContext({ ...base, sessionFailureCount: 2 }).affectBand).toBe('strained')
    expect(buildVerifierContext({ ...base, recoveryActive: true }).affectBand).toBe('flooded')
  })

  it('never disagrees with the floor in the floor\'s own confident cases', () => {
    // Where the old floor said flooded (recovery active), the machine also
    // says flooded — RECOVERING maps there. Where the floor said strained
    // (≥2 failures), the machine says strained or worse. The machine only
    // ever tightens; it never relaxes a band the floor would have set.
    expect(affectBandOf(run([utter]).state)).toBe('flooded')
    const twoFailures = run([fail, fail])
    expect(['strained', 'flooded']).toContain(affectBandOf(twoFailures.state))
  })
})
