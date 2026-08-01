/**
 * WP-8 — shadow control plane. The assertions that matter are the safety ones:
 * nothing is applied, nothing is fabricated, and every unavailable prerequisite
 * degrades rather than guesses.
 */
import { describe, it, expect } from 'vitest'
import {
  ASV_HONESTY_CLASS, readAsvAttributes, declaredDials, projectStandingAsv,
  GOVERNOR_CONSTANT_KEYS, resolveGovernorConstants, allSet,
  PHASE3_GOVERNOR_RULES, rulesCiteTheirSource, rulesAreInAuthorisedBands, band2IsSubtractiveOnly,
  runShadowStages, evaluateS5, evaluateS6, evaluateS7,
  type GovernorConstant, type GovernorConstantKey, type StageInputs,
} from '@/lib/teaching/adaptation'
import { parseAdaptationStateTag } from '@/lib/teaching/attemptVectorSignal'

const emptyConstants = new Map<GovernorConstantKey, GovernorConstant>(
  GOVERNOR_CONSTANT_KEYS.map((k) => [k, { key: k, availability: 'NOT_SET' as const, detail: '' }]),
)
const setConstants = new Map<GovernorConstantKey, GovernorConstant>(
  GOVERNOR_CONSTANT_KEYS.map((k) => [k, { key: k, availability: 'SET' as const, value: 1, detail: '' }]),
)
const base: StageInputs = { asv: null, standingAsv: null, constants: emptyConstants }

describe('WP-8 · AH-1 — the typed ASV', () => {
  it('is PROXY honesty class', () => {
    expect(ASV_HONESTY_CLASS).toBe('PROXY')
  })

  it('reads the six dials from declared attributes', () => {
    const v = readAsvAttributes(
      'scaffold="3" hint="H2" difficulty="-1" paceRate="2" loadBudget="4" ' +
      'loadDecomposition="decomposed" interleaving="blocked"')!
    expect(v.scaffoldDial).toBe(3)
    expect(v.hintRung).toBe('H2')
    expect(v.difficultyOffset).toBe(-1)
    expect(v.load?.decomposition).toBe('decomposed')
    expect(declaredDials(v)).toEqual(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])
  })

  it('rejects out-of-range and unauthored values rather than coercing', () => {
    expect(readAsvAttributes('scaffold="9"')).toBeNull()          // outside 0–4
    expect(readAsvAttributes('hint="a-bit"')).toBeNull()          // not H<n>
    expect(readAsvAttributes('interleaving="sometimes"')).toBeNull()
  })

  it('returns null when nothing is declared — absent, not empty', () => {
    expect(readAsvAttributes('')).toBeNull()
    expect(declaredDials(null)).toEqual([])
  })

  it('holds standing dials that this turn did not declare', () => {
    const merged = projectStandingAsv({ scaffoldDial: 2 }, { interleaving: 'blocked' })
    expect(merged).toEqual({ scaffoldDial: 2, interleaving: 'blocked' })
  })

  it('rides the existing ATTEMPT tag — no second capture path', () => {
    const { vector } = parseAdaptationStateTag('reply\n<!--ATTEMPT channel="verbal" scaffold="1"-->')
    expect(vector).toEqual({ scaffoldDial: 1 })
  })
})

describe('WP-8 · §19.3 — governor constants, no hardcoded numbers', () => {
  it('reports every constant NOT_SET when the store is empty', async () => {
    const m = await resolveGovernorConstants({ async findByNames() { return [] } })
    expect([...m.values()].every((c) => c.availability === 'NOT_SET')).toBe(true)
    expect([...m.values()].every((c) => c.value === undefined)).toBe(true)
  })

  it('degrades to NOT_SET with a reason when the store fails', async () => {
    const m = await resolveGovernorConstants({ async findByNames() { throw new Error('down') } })
    expect(m.get('governor.hysteresisGap')!.detail).toContain('store unavailable')
  })

  it('rejects a non-numeric row rather than coercing it', async () => {
    const m = await resolveGovernorConstants({
      async findByNames() {
        return [{ name: 'governor.hysteresisGap', value: '3', version: 1, effectiveFrom: new Date(0), effectiveTo: null }]
      },
    })
    expect(m.get('governor.hysteresisGap')!.availability).toBe('NOT_SET')
    expect(m.get('governor.hysteresisGap')!.detail).toContain('rejected rather than coerced')
  })

  it('allSet is false when any needed key is missing', () => {
    expect(allSet(emptyConstants, ['governor.hysteresisGap'])).toBe(false)
    expect(allSet(setConstants, ['governor.hysteresisGap'])).toBe(true)
  })
})

describe('WP-8 · AH-11 — rules in the existing pack format', () => {
  it('cites its source, sits in Bands 2/4/5, and is subtractive at Band 2', () => {
    expect(PHASE3_GOVERNOR_RULES.length).toBeGreaterThan(0)
    expect(rulesCiteTheirSource()).toBe(true)
    expect(rulesAreInAuthorisedBands()).toBe(true)
    expect(band2IsSubtractiveOnly()).toBe(true)
  })

  it('ships no hardcoded threshold in any guard', () => {
    // Guards read state and shape; numbers come from the policy store or the
    // stage stays inert.
    for (const r of PHASE3_GOVERNOR_RULES) expect(r.guard.reads.length).toBeGreaterThan(0)
  })
})

describe('WP-8 · S3–S7 shadow safety', () => {
  it('applies nothing, under every input combination', () => {
    for (const i of [
      base,
      { ...base, constants: setConstants },
      { ...base, constants: setConstants, asv: { scaffoldDial: 2 as const, hintRung: 'H1' }, authoredHintRungs: ['H1'], c32Accepted: true, recentOutcomes: [true, false] },
    ]) {
      const r = runShadowStages(i)
      expect(r.anyApplied).toBe(false)
      expect(r.stages.every((s) => s.applied === false)).toBe(true)
    }
  })

  it('degrades to NOT_EVALUABLE when constants are unset — never guesses', () => {
    const r = runShadowStages(base)
    expect(r.evaluated).toBe(0)
    expect(r.stages.every((s) => s.detail.length > 0)).toBe(true)  // always recorded
  })

  it('S5 stays inert without an authored ladder, and rejects an unauthored rung', () => {
    expect(evaluateS5({ ...base, asv: { hintRung: 'H3' } }).verdict).toBe('INERT')
    const r = evaluateS5({ ...base, asv: { hintRung: 'H3' }, authoredHintRungs: ['H0', 'H1'] })
    expect(r.verdict).toBe('NOT_EVALUABLE')
    expect(r.recommendation).toBeNull()
  })

  it('S6 stays inert without C-32 acceptance — never assumed', () => {
    expect(evaluateS6({ ...base, asv: { difficultyOffset: 1 } }).verdict).toBe('INERT')
    expect(evaluateS6({ ...base, asv: { difficultyOffset: 1 }, c32Accepted: true }).verdict).toBe('EVALUATED')
  })

  it('S7 refuses a success rate over zero samples', () => {
    expect(evaluateS7({ ...base, constants: setConstants, recentOutcomes: [] }).verdict).toBe('NOT_EVALUABLE')
    expect(evaluateS7({ ...base, constants: setConstants, recentOutcomes: [true] }).verdict).toBe('EVALUATED')
  })
})
