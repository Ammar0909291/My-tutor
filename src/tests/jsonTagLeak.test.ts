/**
 * PHASE 7 — the bare-JSON machine-tag leak.
 *
 * OBSERVED LIVE during a real-account student-experience study (2026-09-06,
 * deployed app): a learner asked for a simpler explanation and the tutor's
 * ENTIRE reply, verbatim, was:
 *
 *   {"question_stage":"1"}
 *
 * matching neither the comment shape (`<!--ATTEMPT …-->`, Phase 1's own
 * defect) nor the bracket shape (`[ASSESSMENT_RESULT …]`, Phase 6) this sweep
 * already covered — a third instance of the same root cause this module's own
 * header names ("no parser keyed to a tag NAME can ever recover from the
 * model choosing a different name"), this time in a different syntax.
 *
 * The P0 hazard in fixing it — and the reason the negative controls below
 * matter — is that this is a Computer Science teaching platform: a genuine
 * lesson turn can legitimately say `{"name": "Ada"}` as TEXT. The fix must
 * therefore key on the PARSED KEYS being this codebase's own internal
 * signal/attempt/stage vocabulary, never on JSON syntax alone.
 */
import { describe, it, expect } from 'vitest'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'

describe('Phase 7 — the observed bare-JSON leak is closed', () => {
  it('strips the exact fragment observed in production when it is the whole reply', () => {
    const out = stripResidualMachineTags('{"question_stage":"1"}')
    expect(out).not.toMatch(/question_stage/)
  })

  it('strips it when it stands alone on its own line alongside real teaching', () => {
    const text = 'Two pendulums of the same length keep the same time.\n{"question_stage":"1"}'
    const out = stripResidualMachineTags(text)
    expect(out).not.toMatch(/question_stage/)
    expect(out).toContain('Two pendulums of the same length keep the same time.')
  })

  it('strips other internal-vocabulary keys, singly and combined', () => {
    expect(stripResidualMachineTags('{"stage":"2"}')).not.toMatch(/"stage"/)
    expect(stripResidualMachineTags('{"phase":"GUIDE","move":"ask"}')).not.toMatch(/GUIDE/)
    expect(stripResidualMachineTags('{"signal":"true","confidence":"high"}')).not.toMatch(/confidence/)
  })

  it('the detector is no longer blind to the JSON shape', () => {
    expect(hasResidualMachineTag('{"question_stage":"1"}')).toBe(true)
    expect(hasResidualMachineTag(stripResidualMachineTags('{"question_stage":"1"}'))).toBe(false)
  })
})

describe('Phase 7 — P0 GUARD: genuine JSON teaching content must survive', () => {
  it('leaves a CS lesson\'s own JSON example alone (unrelated keys)', () => {
    const text = 'A JSON object looks like {"name": "Ada", "age": 36}.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves a data-structures lesson\'s worked example alone', () => {
    const text = 'Given the record {"id": 1, "score": 87}, compute the average.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('does not strip a partial-key overlap that also carries a non-machine key', () => {
    // "confidence" is internal vocabulary, but this fragment also names
    // "student" — not on the allowlist — so it is a real (if odd) example,
    // not an unmistakable machine declaration.
    const text = '{"student": "Ada", "confidence": "high"}'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves JSON that is part of a longer line of prose alone', () => {
    // The observed leak stood ALONE on its own line; JSON woven into a
    // sentence is a worked example, not a standalone declaration.
    const text = 'The config object {"phase": "prod"} controls the build.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('the detector does not flag genuine CS-teaching JSON as residue', () => {
    expect(hasResidualMachineTag('A JSON object looks like {"name": "Ada"}.')).toBe(false)
  })
})

describe('Phase 7 — the sweep does not eat legitimate prose', () => {
  it('leaves an empty object alone (no keys to judge)', () => {
    const text = 'An empty object is written {}.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves a JSON array alone', () => {
    const text = '["stage", "phase"]'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves malformed/unparseable braces alone rather than guessing', () => {
    const text = 'Set notation: {1, 2, 3} is a finite set.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('is idempotent and never throws on odd input', () => {
    const once = stripResidualMachineTags('{"question_stage":"1"}')
    expect(stripResidualMachineTags(once)).toBe(once)
    expect(stripResidualMachineTags('')).toBe('')
    expect(() => stripResidualMachineTags('{' as string)).not.toThrow()
  })

  it('still strips the comment- and bracket-shaped families it always did (no regression)', () => {
    expect(stripResidualMachineTags('Hi.<!--SIGNAL correctness="true"-->')).not.toMatch(/SIGNAL/)
    expect(stripResidualMachineTags('Nice work. [ASSESSMENT_RESULT correctness=1]')).not.toMatch(/ASSESSMENT_RESULT/)
  })

  it('[LESSON_COMPLETE] still survives alongside a JSON leak on the same turn', () => {
    const text = '{"question_stage":"1"}\nThat is the whole idea. [LESSON_COMPLETE]'
    const out = stripResidualMachineTags(text)
    expect(out).toContain('[LESSON_COMPLETE]')
    expect(out).not.toMatch(/question_stage/)
  })
})
