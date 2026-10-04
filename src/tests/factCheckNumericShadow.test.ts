/**
 * Numeric fact-check STEP 3 — production shadow, N1 + N2 only (owner
 * instruction 2026-10-04). Pins the controlled live-validation cases A–G and
 * the safety contract: N3 unreachable, the reply is only read, nothing but a
 * log line comes out, no learner identifiers in the record.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { numericShadowRecord, numericFactCheckMode } from '@/lib/teaching/factCheckNumericShadow'

const MODULE = readFileSync(join(process.cwd(), 'src/lib/teaching/factCheckNumericShadow.ts'), 'utf8')
const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const BLOCK = ROUTE.slice(ROUTE.indexOf('// NUMERIC FACT-CHECK, STEP 3'), ROUTE.indexOf('// SAVE ONCE'))

describe('controlled validation cases', () => {
  it('A. correct arithmetic → no flag', () => {
    const r = numericShadowRecord('So the weight is W = mg = 5 × 9.8 = 49 N.', 'phys.mech.weight')
    expect(r.outcome).toBe('abstained')
    expect(r.n1).toBe(0)
  })

  it('B. clearly wrong arithmetic → N1 flag', () => {
    const r = numericShadowRecord('So the weight is W = mg = 5 × 9.8 = 59 N.', 'phys.mech.weight')
    expect(r.outcome).toBe('flagged')
    expect(r.n1).toBe(1)
    expect(r.findings[0]).toMatchObject({ detector: 'N1', type: 'arithmetic', claimed: '59 N', expected: '49' })
  })

  it('C. correct ratio → no flag', () => {
    const r = numericShadowRecord('A 1 W torch uses 200 times more power than a 5 mW laser pointer.', 'phys.mod.lasers')
    expect(r.outcome).toBe('abstained')
  })

  it('D. clearly wrong ratio → N2 flag (the live lasers sentence)', () => {
    const r = numericShadowRecord(
      'A 5‑milliwatt helium‑neon laser pointer emits about 3 × 10¹⁵ photons per second. A typical 1‑watt LED flashlight emits roughly 10⁹ times more photons.',
      'phys.mod.lasers',
    )
    expect(r.outcome).toBe('flagged')
    expect(r.n2).toBe(1)
    expect(r.findings[0]).toMatchObject({ detector: 'N2', type: 'ratio' })
  })

  it('E. ambiguous calculation → abstain', () => {
    expect(numericShadowRecord('8 corners × 1/8 = 1 whole atom.', null).outcome).toBe('abstained')
    expect(numericShadowRecord('Then 2 × 9.8 × h = 39.2.', null).outcome).toBe('abstained')
  })

  it('F. symbolic expression → abstain', () => {
    expect(numericShadowRecord('From v² = u² + 2as we get s = (v² − u²)/2a.', null).n1).toBe(0)
    expect(numericShadowRecord('F = ma, so doubling m doubles F.', null).outcome).not.toBe('flagged')
  })

  it('G. new scenario → N3 completely inactive (no authored input exists, no authored finding kind)', () => {
    const r = numericShadowRecord('With 18 V across 3 Ω and 6 Ω in series, the current is 2 A.', 'phys.elec.series')
    expect(r.outcome).not.toBe('flagged')
    expect(r.findings.every((f) => f.detector === 'N1' || f.detector === 'N2')).toBe(true)
    // The function has no parameter through which authored content could arrive.
    expect(numericShadowRecord.length).toBeLessThanOrEqual(3)
  })

  it('reports no-candidate only for a reply without any digit', () => {
    expect(numericShadowRecord('Light slows down in glass because it interacts with electrons.', null).outcome).toBe('no-candidate')
  })
})

describe('safety contract', () => {
  afterEach(() => { delete process.env.NUMERIC_FACT_CHECK_MODE })

  it('imports only N1 and N2; N3 and the aggregate are unreachable', () => {
    expect(MODULE).toMatch(/import \{ checkArithmetic, checkRatioClaims, type NumericFlag \} from '\.\/factCheckNumeric'/)
    const code = MODULE.replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    expect(code).not.toMatch(/checkAgainstAuthored|checkNumericClaims/)
    expect(BLOCK).not.toMatch(/checkAgainstAuthored|checkNumericClaims|factCheckNumeric'/)
  })

  it('the route block only reads the reply and only logs', () => {
    expect(BLOCK.length).toBeGreaterThan(100)
    expect(BLOCK).not.toMatch(/servedText\s*=[^=]/)
    expect(BLOCK).not.toMatch(/prisma\.|routeAI|retry|evidence|mastery|topicProgress|return /i)
    expect(BLOCK).toMatch(/console\.log\('\[numeric-fact-check\] '/)
    // It sits after F1 and before the save of the served text.
    expect(ROUTE.indexOf('// NUMERIC FACT-CHECK, STEP 3')).toBeGreaterThan(ROUTE.indexOf("console.log('[fact-check] '"))
  })

  it('the record holds no learner identifiers and the input is untouched', () => {
    const text = 'W = 5 × 9.8 = 59 N.'
    const copy = String(text)
    const r = numericShadowRecord(text, 'phys.mech.weight')
    expect(text).toBe(copy)
    expect(Object.keys(r).sort()).toEqual(['at', 'candidate', 'chars', 'conceptId', 'detectors', 'findings', 'n1', 'n2', 'outcome'])
    expect(JSON.stringify(r)).not.toMatch(/userId|sessionId|email|password|secret|apiKey|bearer/i)
  })

  it('mode: shadow by default, off only when set; no serve mode exists', () => {
    expect(numericFactCheckMode()).toBe('shadow')
    process.env.NUMERIC_FACT_CHECK_MODE = 'off'
    expect(numericFactCheckMode()).toBe('off')
    process.env.NUMERIC_FACT_CHECK_MODE = 'serve'
    expect(numericFactCheckMode()).toBe('shadow')
  })
})
