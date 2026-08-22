/**
 * Teaching granularity — the fix for cross-turn fragmentation.
 *
 * Production evidence (2026-08-07 19:26–19:31Z): seven consecutive assistant
 * turns of 113–183 characters, each one sentence, most ending in a question.
 * The learner had to press through seven exchanges for one paragraph's worth
 * of teaching.
 */
import { describe, it, expect } from 'vitest'
import {
  decideTeachingGranularity, buildGranularityDirective, type TeachingLevel,
} from '@/lib/teaching/teachingGranularity'
import { initialConversationState, buildTurnDirective } from '@/lib/teaching/conversationState'

const state = (p: Partial<ReturnType<typeof initialConversationState>> = {}) =>
  ({ ...initialConversationState(), ...p })

describe('level selection is evidence-gated', () => {
  it('defaults to COMPLETE — a learner who is doing fine is never drip-fed', () => {
    expect(decideTeachingGranularity({ state: state() })).toBe('COMPLETE')
    expect(decideTeachingGranularity({ state: null })).toBe('COMPLETE')
    expect(decideTeachingGranularity({ state: state(), learnerRequest: 'diagram' })).toBe('COMPLETE')
  })

  it('one wobble is GUIDED, not REMEDIAL', () => {
    expect(decideTeachingGranularity({ state: state({ consecutiveFailures: 1 }) })).toBe('GUIDED')
    expect(decideTeachingGranularity({ state: state(), learnerRequest: 'explain_differently' })).toBe('GUIDED')
    expect(decideTeachingGranularity({
      state: state(), learnerRequest: 'explain_differently', remediationTier: 1,
    })).toBe('GUIDED')
  })

  it('REMEDIAL requires evidenced confusion — never a guess', () => {
    expect(decideTeachingGranularity({ state: state({ consecutiveFailures: 2 }) })).toBe('REMEDIAL')
    expect(decideTeachingGranularity({
      state: state(), learnerRequest: 'explain_differently', remediationTier: 2,
    })).toBe('REMEDIAL')
    expect(decideTeachingGranularity({ state: state(), recoveryKey: 'frustrated' })).toBe('REMEDIAL')
  })

  it('cannot reach REMEDIAL through question-asking alone', () => {
    for (const r of ['diagram', 'real_life_example'] as const) {
      expect(decideTeachingGranularity({ state: state(), learnerRequest: r, remediationTier: 5 }))
        .not.toBe('REMEDIAL')
    }
  })
})

describe('the directive states a FLOOR, which nothing else did', () => {
  it('COMPLETE demands a whole-sentence definition and forbids deferring', () => {
    const d = buildGranularityDirective('COMPLETE')
    expect(d).toMatch(/ONE\s+complete, natural sentence/)
    expect(d).toMatch(/Never\s+deliver a definition as fragments/)
    expect(d).toMatch(/never spread one across several\s+turns/)
    expect(d).toMatch(/ceiling, not a\s+target/)
  })

  it('GUIDED splits into ideas, explicitly not words', () => {
    const d = buildGranularityDirective('GUIDED')
    expect(d).toMatch(/meaningful IDEAS/)
    expect(d).toMatch(/never into individual words/)
  })

  it('REMEDIAL still refuses bare words', () => {
    const d = buildGranularityDirective('REMEDIAL')
    expect(d).toMatch(/smallest useful step/)
    expect(d).toMatch(/never as a bare word/)
  })

  it('every level produces a non-empty directive', () => {
    for (const l of ['COMPLETE', 'GUIDED', 'REMEDIAL'] as TeachingLevel[]) {
      expect(buildGranularityDirective(l).length).toBeGreaterThan(80)
    }
  })
})

// ── F3 regression suite (2026-08-22) ──────────────────────────────────────
// A real-student session showed confusion being answered at unchanged
// difficulty. Root cause: the `<!--SIGNAL confusion="true">` read was parsed,
// persisted and logged, but never reached a teaching decision — the two
// detectors that DID lower granularity (EXPLAIN_DIFF_RE, detectFailureState)
// are fixed phrase lists, and measured against 36 natural confusion
// utterances, 21 matched neither.
describe('F3 — reported confusion lowers granularity', () => {
  it('a single reported confusion drops COMPLETE to GUIDED', () => {
    expect(decideTeachingGranularity({ state: state(), signalConfusion: true }))
      .toBe('GUIDED')
    expect(decideTeachingGranularity({ state: null, signalConfusion: true }))
      .toBe('GUIDED')
  })

  it('confusion alone never reaches REMEDIAL — words are still off the table', () => {
    expect(decideTeachingGranularity({ state: state(), signalConfusion: true }))
      .not.toBe('REMEDIAL')
  })

  it('confusion ON TOP OF a wobble is REMEDIAL', () => {
    expect(decideTeachingGranularity({
      state: state({ consecutiveFailures: 1 }), signalConfusion: true,
    })).toBe('REMEDIAL')
  })

  it('confusion ON TOP OF a prior re-explanation is REMEDIAL', () => {
    expect(decideTeachingGranularity({
      state: state(), remediationTier: 1, signalConfusion: true,
    })).toBe('REMEDIAL')
  })

  it('confusion does not override an already-stronger signal downward', () => {
    // recoveryKey and 2 failures were REMEDIAL before; they stay REMEDIAL.
    expect(decideTeachingGranularity({
      state: state({ consecutiveFailures: 2 }), signalConfusion: true,
    })).toBe('REMEDIAL')
    expect(decideTeachingGranularity({
      state: state(), recoveryKey: 'confused', signalConfusion: true,
    })).toBe('REMEDIAL')
  })

  // The negative controls: the field must not act on absence or on false.
  it('confusion=false and confusion absent both leave the ladder untouched', () => {
    expect(decideTeachingGranularity({ state: state(), signalConfusion: false }))
      .toBe('COMPLETE')
    expect(decideTeachingGranularity({ state: state(), signalConfusion: null }))
      .toBe('COMPLETE')
    expect(decideTeachingGranularity({ state: state(), signalConfusion: undefined }))
      .toBe('COMPLETE')
    expect(decideTeachingGranularity({ state: state() })).toBe('COMPLETE')
  })

  it('a false confusion read cannot cancel real failure evidence', () => {
    expect(decideTeachingGranularity({
      state: state({ consecutiveFailures: 2 }), signalConfusion: false,
    })).toBe('REMEDIAL')
    expect(decideTeachingGranularity({
      state: state({ consecutiveFailures: 1 }), signalConfusion: false,
    })).toBe('GUIDED')
  })

  // Every pre-F3 input combination must resolve exactly as it did before, so
  // the new field cannot have moved an existing learner's teaching.
  it('every pre-existing case is byte-identical with the field omitted', () => {
    const cases: Array<[Parameters<typeof decideTeachingGranularity>[0], TeachingLevel]> = [
      [{ state: state() }, 'COMPLETE'],
      [{ state: null }, 'COMPLETE'],
      [{ state: state(), learnerRequest: 'diagram' }, 'COMPLETE'],
      [{ state: state(), learnerRequest: 'real_life_example' }, 'COMPLETE'],
      [{ state: state({ consecutiveFailures: 1 }) }, 'GUIDED'],
      [{ state: state({ consecutiveFailures: 2 }) }, 'REMEDIAL'],
      [{ state: state({ consecutiveFailures: 5 }) }, 'REMEDIAL'],
      [{ state: state(), learnerRequest: 'explain_differently' }, 'GUIDED'],
      [{ state: state(), learnerRequest: 'explain_differently', remediationTier: 2 }, 'REMEDIAL'],
      [{ state: state(), recoveryKey: 'too_hard' }, 'REMEDIAL'],
      // tier alone, with no confusion and no request, was and stays COMPLETE
      [{ state: state(), remediationTier: 1 }, 'COMPLETE'],
      [{ state: state(), remediationTier: 3 }, 'COMPLETE'],
    ]
    for (const [input, expected] of cases) {
      expect(decideTeachingGranularity(input)).toBe(expected)
    }
  })
})

describe('turn directive integration', () => {
  const base = {
    state: state(), nextMove: 'teach' as const, maxParagraphs: 4,
    workedExampleFirst: false, visualType: null,
  }

  it('the floor is stated alongside the ceiling', () => {
    const out = buildTurnDirective({ ...base, granularity: 'COMPLETE' })
    expect(out).toMatch(/Length budget: at most 4 short paragraphs/)
    expect(out).toMatch(/DEFINITION RULE/)
    expect(out).toMatch(/ceiling, not a\s+target/)
  })

  it('omitting granularity leaves the directive exactly as before', () => {
    const withOut = buildTurnDirective(base)
    expect(withOut).not.toMatch(/DEFINITION RULE/)
    expect(withOut).toMatch(/Length budget: at most 4 short paragraphs/)
  })

  it('a struggling learner gets REMEDIAL wording, not the COMPLETE floor', () => {
    const out = buildTurnDirective({ ...base, granularity: 'REMEDIAL' })
    expect(out).toMatch(/Granularity: REMEDIAL/)
    expect(out).not.toMatch(/ceiling, not a\s+target/)
  })
})
