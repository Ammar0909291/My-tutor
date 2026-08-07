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
