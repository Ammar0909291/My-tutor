/**
 * Phase 5 — fact-check gate, NUMBERS (proposal item 1, step 1, owner go-ahead
 * 2026-10-04). Three abstain-by-default detectors over free tutor prose:
 * N1 written arithmetic, N2 "N times more" ratio claims, N3 a quantity that
 * contradicts an authored sentence describing the same setup. The cases below
 * are real tutor sentences (lasers live lesson) or worked examples from the
 * physics corpus; every "pass" case is one a naive checker would get wrong.
 */
import { describe, it, expect } from 'vitest'
import {
  checkArithmetic,
  checkRatioClaims,
  checkAgainstAuthored,
  checkNumericClaims,
  parseUnit,
  numberValue,
} from '@/lib/teaching/factCheckNumeric'

describe('numbers and units', () => {
  it('parses mantissa × power of ten in every written form', () => {
    expect(numberValue('3 × 10¹⁵')).toBeCloseTo(3e15, -10)
    expect(numberValue('1.6 × 10⁻¹⁹')).toBeCloseTo(1.6e-19, 25)
    expect(numberValue('6.67x10^-11')).toBeCloseTo(6.67e-11, 16)
    expect(numberValue('13 600')).toBe(13600)
    expect(numberValue('1,000')).toBe(1000)
  })

  it('parses prefixed and compound units', () => {
    expect(parseUnit('mA')).toEqual({ base: 'A', factor: 1e-3 })
    expect(parseUnit('kΩ')).toEqual({ base: 'Ω', factor: 1e3 })
    expect(parseUnit('m/s²')).toEqual({ base: 'm/s²', factor: 1 })
    expect(parseUnit('km/s')?.factor).toBe(1000)
    expect(parseUnit('milliwatt')).toEqual({ base: 'W', factor: 1e-3 })
    expect(parseUnit('apples')).toBeNull()
  })
})

describe('N1 arithmetic', () => {
  it.each([
    ['I = (12 − 6.2)/100 = 0.058 A.'],
    ['I = (12 − 6.2)/100 = 58 mA.'],
    ['E = 1240 ÷ 632.8 = 1.96 eV.'],
    ['d = 1500 × 0.8 / 2 = 600 m.'],
    ['W = mg = 5 × 9.8 = 49 N.'],
    ['T = 2π√(0.5/9.8) = 1.42 s.'],
    ['Efficiency = 350/1000 = 35 %.'],
    ['g = 6.67 × 10⁻¹¹ × 5.97 × 10²⁴ / (6.37 × 10⁶)² = 9.8 m/s².'],
    ['Total current = 4.55 + 9.09 + 6.82 = 20.5 A.'],
    ['The time is 3600/60 = 1 min.'],
    ['v ≈ 340 × 2 ≈ 700 m/s.'],
  ])('passes a correct calculation: %s', (s) => {
    expect(checkArithmetic(s)).toEqual([])
  })

  it.each([
    ['E = 1240/632.8 = 0.51 eV.', '0.51'],
    ['d = 1500 × 0.8 / 2 = 1200 m.', '1200'],
    ['W = mg = 5 × 9.8 = 59 N.', '59'],
  ])('flags a wrong calculation: %s', (s, claimed) => {
    const flags = checkArithmetic(s)
    expect(flags).toHaveLength(1)
    expect(flags[0].kind).toBe('arithmetic')
    expect(flags[0].claimed).toContain(claimed)
  })

  it('treats a bare-number definition as a conversion, not arithmetic', () => {
    expect(checkArithmetic('Remember that 1 eV = 1.6 × 10⁻¹⁹ J.')).toEqual([])
    expect(checkArithmetic('So 1 km = 1000 m.')).toEqual([])
  })

  // Each of these was a false positive on authored physics/chemistry content
  // in the first corpus smoke run (2026-10-04).
  it.each([
    ['KE = ½mv² = ½ × 4 × 9 = 18 J.'],
    ['E = ½CV² = ½ × 1.0e-4 × 400 = 0.020 J.'],
    ['½ × 1200 × 20² = 240 kJ dissipated over 40 m.'],
    ['Salt B: s=(Ksp/4)^(1/3)=(10⁻⁹)^(1/3)≈10⁻³ M.'],
    ['B = μ₀nI = 4π×10⁻⁷ × 500 × 2.0 ≈ 1.26 mT.'],
    ['Let Cr = x: x + 4(−2) = −2, so x = +6.'],
    ['Total momentum is 0, so 1 × v + 3 × 2 = 0 and v = −6 m/s.'],
    ['8 corners × 1/8 = 1 whole atom.'],
    ['r(H2)/r(O2) = sqrt(32/2) = 4.'],
    ['sin r = sin 30° / 1.50 = 0.3333, so r = 19.5°.'],
    ['12.11 + 0.3 = 12.4 (one decimal place).'],
  ])('does not flag authored content: %s', (s) => {
    expect(checkArithmetic(s)).toEqual([])
  })

  it('still checks a result followed by a parenthetical aside', () => {
    expect(checkArithmetic('12.11 + 0.3 = 17 (one decimal place).')).toHaveLength(1)
  })

  it('abstains on symbolic or unparseable equations', () => {
    expect(checkArithmetic('F = ma, so doubling m doubles F.')).toEqual([])
    expect(checkArithmetic('E = hf = hc/λ.')).toEqual([])
    expect(checkArithmetic('Step 2: v = u + at.')).toEqual([])
  })
})

describe('N2 ratio claims', () => {
  it('flags the live lasers claim (10⁹ times for a power ratio of 200)', () => {
    const prose =
      'A 5‑milliwatt helium‑neon laser pointer emits about 3 × 10¹⁵ photons per second. ' +
      'A typical 1‑watt LED flashlight emits roughly 10⁹ times more photons, but they spread out in every direction.'
    const flags = checkRatioClaims(prose)
    expect(flags).toHaveLength(1)
    expect(flags[0].kind).toBe('ratio')
    expect(flags[0].claimed).toBe('10⁹ times')
    expect(flags[0].expected).toContain('200')
  })

  it('passes the same comparison stated correctly', () => {
    expect(checkRatioClaims('A 1 W torch uses 200 times more power than a 5 mW laser pointer.')).toEqual([])
  })

  it('passes inverse-square, T⁴ and pendulum claims (allowed powers)', () => {
    expect(checkRatioClaims('Move from 1 m to 2 m away and the intensity is 4 times less.')).toEqual([])
    expect(checkRatioClaims('A star at 6000 K radiates 16 times more per square metre than one at 3000 K.')).toEqual([])
    expect(checkRatioClaims('A 4 m pendulum has a period 2 times longer than a 1 m pendulum.')).toEqual([])
  })

  it('abstains when the inputs are ambiguous or absent', () => {
    // Two kinds with two values each — which ratio is meant is unclear.
    expect(checkRatioClaims('A 2 m, 10 V source and a 4 m, 20 V source: one is 50 times stronger.')).toEqual([])
    // Only one stated quantity.
    expect(checkRatioClaims('A 1 W LED is about 1000 times brighter than a candle.')).toEqual([])
  })
})

describe('N3 conflict with authored content', () => {
  const authored = ['With a 12 V supply, a 100 Ω resistor and a 620 Ω load, the Zener takes 48 mA.']

  it('flags a different value for the same setup', () => {
    const flags = checkAgainstAuthored('With the 12 V supply and 100 Ω resistor, the Zener takes 38 mA.', authored)
    expect(flags).toHaveLength(1)
    expect(flags[0].kind).toBe('authored')
    expect(flags[0].claimed).toContain('38')
    expect(flags[0].expected).toContain('48')
  })

  it('passes the matching value and a different setup', () => {
    expect(checkAgainstAuthored('With the 12 V supply and 100 Ω resistor, the Zener takes 48 mA.', authored)).toEqual([])
    expect(checkAgainstAuthored('With a 14 V supply and a 200 Ω resistor, the Zener takes 30 mA.', authored)).toEqual([])
  })

  it('needs authored sentences with at least three quantities', () => {
    expect(checkAgainstAuthored('A 12 V supply and 100 Ω give 38 mA.', ['The supply is 12 V.'])).toEqual([])
  })
})

describe('checkNumericClaims', () => {
  it('returns nothing for prose without digits', () => {
    expect(checkNumericClaims('Light slows down in glass.')).toEqual([])
  })

  it('runs all three detectors', () => {
    const prose =
      'W = 5 × 9.8 = 59 N. ' +
      'A 5 mW pointer emits 3 × 10¹⁵ photons per second; a 1 W torch emits 10⁹ times more. ' +
      'With the 12 V supply and 100 Ω resistor, the Zener takes 38 mA.'
    const kinds = checkNumericClaims(prose, ['With a 12 V supply, a 100 Ω resistor and a 620 Ω load, the Zener takes 48 mA.']).map((f) => f.kind)
    expect(kinds.sort()).toEqual(['arithmetic', 'authored', 'ratio'])
  })
})
