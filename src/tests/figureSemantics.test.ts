/**
 * figureSemantics — the deterministic arithmetic / dimension checker for the
 * equations a figure prints. It must (a) catch a planted slip and (b) never
 * accuse a correct teaching label, because a false accusation on a learner-facing
 * figure would send the author after a defect that is not there.
 */
import { describe, it, expect } from 'vitest'
import { checkChain, checkFigureTexts, collectBindings, evaluateExpression } from '@/lib/teaching/visual/figureSemantics'

const chain = (text: string, figure: string[] = [text]) => checkChain(text, collectBindings(figure))

describe('evaluateExpression', () => {
  it('evaluates numbers with units to SI and a dimension', () => {
    expect(evaluateExpression('72 km/h')!.v).toBeCloseTo(20, 9)
    expect(evaluateExpression('2943 J / 12 s')!.v).toBeCloseTo(245.25, 9)
    expect(evaluateExpression('9.8 m/s²')!.v).toBeCloseTo(9.8, 9)
  })
  it('does not treat a bare letter as a unit (m is mass here, g is gravity)', () => {
    expect(evaluateExpression('m g')).toBeNull()
    expect(evaluateExpression('F d cos θ')).toBeNull()
  })
  it('refuses anything that is not arithmetic', () => {
    expect(evaluateExpression('60°')).toBeNull()
    expect(evaluateExpression('|A||B| cos θ')).toBeNull()
    expect(evaluateExpression('')).toBeNull()
  })
})

describe('checkChain — correct teaching labels are left alone', () => {
  const GOOD = [
    'P = W/t = 2943 J / 12 s = 245 W',
    'v = Δx/Δt = 8 m / 4 s = +2 m/s',
    'a = Δv/Δt = 2 m/s / 4 s = 0.5 m/s²',
    'g = 4π² / 4.02 = 9.8 m/s²',
    '72 km/h = 20 m/s',
    'distance = 4 + 3 = 7 m',
    'T = m₂a = 2 × 4 = 8 N',
    'R = ρL/A = 1.68×10⁻⁸ × 10 / 10⁻⁶ = 0.17 Ω',
    'V = E − Ir = 12 − 2 × 0.5 = 11 V',
    'I_Z = 58 − 10 = 48 mA',
    '350 + 650 = 1000 MJ',
  ]
  for (const text of GOOD) {
    it(`accepts: ${text}`, () => {
      expect(chain(text).contradictions, text).toEqual([])
    })
  }
  it('accepts an assignment that redefines g (Earth value does not apply)', () => {
    expect(chain('station: g ≈ 8.7 m/s²').contradictions).toEqual([])
  })
  it('splits two statements in one label', () => {
    expect(checkFigureTexts(['a = 1.96 m/s²   T = 23.52 N']).contradictions).toBe(0)
  })
})

describe('checkChain — planted slips are caught', () => {
  it('a wrong product', () => {
    const r = chain('P = W/t = 2943 J / 12 s = 254 W')
    expect(r.checked).toBe(true)
    expect(r.contradictions.length).toBeGreaterThan(0)
  })
  it('a unit slip: m/s where m/s² belongs', () => {
    const r = chain('a = Δv/Δt = 2 m/s / 4 s = 0.5 m/s')
    expect(r.contradictions.length).toBeGreaterThan(0)
    expect(r.contradictions[0].reason).toMatch(/dimensions differ/)
  })
  it('a wrong prefix', () => {
    expect(chain('72 km/h = 20 km/s').contradictions.length).toBeGreaterThan(0)
  })
  it('a wrong unit-less working line', () => {
    expect(chain('T = m₂a = 2 × 4 = 9 N').contradictions.length).toBeGreaterThan(0)
  })
  it('uses symbols the SAME figure binds', () => {
    // m = 5 kg and g give W = 49 N; a figure that says 94 N contradicts itself.
    const ok = checkFigureTexts(['m = 5 kg', 'W = m g = 5 × 9.8 = 49 N'])
    expect(ok.contradictions).toBe(0)
    const bad = checkFigureTexts(['m = 5 kg', 'W = m g = 5 × 9.8 = 94 N'])
    expect(bad.contradictions).toBeGreaterThan(0)
  })
})

describe('checkChain — says "cannot tell" instead of guessing', () => {
  it('symbolic-only and ambiguous chains are not judged', () => {
    for (const t of ['v = u + at', 'KE = ½mv²', 'F = ma', 'A · B = |A||B| cos θ = 6', 'x–t: x = t²']) {
      const r = chain(t)
      expect(r.contradictions, t).toEqual([])
    }
  })
  it('an ambiguous letter (m = mass AND metre) is not read as a unit', () => {
    // "2 m v" with m bound as mass: read as units it would be metres — ambiguous, so unevaluable.
    expect(evaluateExpression('2 m v', collectBindings(['m = 5 kg', 'v = 3 m/s']))).toBeNull()
  })
})
