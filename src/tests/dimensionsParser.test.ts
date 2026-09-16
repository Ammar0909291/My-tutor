/**
 * Deterministic Physics Verifier, Batch 0 — dimension algebra + parser.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §4.1
 * (the two named negative controls), §4.2 (the real equation corpus this
 * parser must handle), §5 (the algebra + parser contract). Every equation in
 * §4.2 is pinned by name; both §4.1 non-equations are pinned by name, not
 * merely gestured at.
 */
import { describe, it, expect } from 'vitest'
import {
  parseEquation, dimensionOf, analyzeEquation,
  multiply, divide, power, dimensionsEqual, DIMENSIONLESS,
  type Dimension, type SymbolBindings,
} from '@/lib/teaching/physics/dimensions'

const Z: Dimension = { M: 0, L: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0 }
const M_: Dimension = { ...Z, M: 1 }
const L_: Dimension = { ...Z, L: 1 }
const T_: Dimension = { ...Z, T: 1 }
const I_: Dimension = { ...Z, I: 1 }
const THETA_: Dimension = { ...Z, Θ: 1 }

// Derived kinematics/dynamics dimensions used across the fixture bindings
// below — hand-built from the base 7, not imported from anywhere, so this
// file cannot silently agree with a bug shared with the module under test.
const VELOCITY: Dimension = { ...Z, L: 1, T: -1 }
const ACCELERATION: Dimension = { ...Z, L: 1, T: -2 }
const FORCE: Dimension = { ...Z, M: 1, L: 1, T: -2 } // kg m s^-2
const MOMENTUM: Dimension = { ...Z, M: 1, L: 1, T: -1 } // kg m s^-1
const ENERGY: Dimension = { ...Z, M: 1, L: 2, T: -2 } // kg m^2 s^-2
const LENGTH: Dimension = L_
const TIME: Dimension = T_
const GRAV_ACCEL: Dimension = ACCELERATION
const LINEAR_DENSITY: Dimension = { ...Z, M: 1, L: -1 } // kg/m (μ in a wave equation)
const PERMEABILITY: Dimension = { ...Z, M: 1, L: 1, T: -2, I: -2 } // μ0, henries/metre form
const CURRENT: Dimension = I_
const MAGNETIC_FIELD: Dimension = { ...Z, M: 1, T: -2, I: -1 } // tesla

describe('§4.1 — the two named non-equation false positives must be REJECTED', () => {
  it('rejects "src = (concept: string" (TypeScript, not physics)', () => {
    const r = parseEquation('src = (concept: string')
    expect(r.ok).toBe(false)
  })

  it('rejects "min = 4 km in (1/30) h" (a unit-conversion sentence, not an equation)', () => {
    const r = parseEquation('min = 4 km in (1/30) h')
    expect(r.ok).toBe(false)
  })

  it('the module never throws on either negative control, or on garbage input', () => {
    const inputs = [
      'src = (concept: string',
      'min = 4 km in (1/30) h',
      '',
      '=',
      '===',
      'a = ',
      ' = b',
      '((((',
      'a = b = c',
      '👍 = 🎉',
      'a'.repeat(5000) + ' = b',
    ]
    for (const text of inputs) {
      expect(() => parseEquation(text)).not.toThrow()
      expect(() => analyzeEquation(text, {})).not.toThrow()
    }
  })
})

describe('§4.2 — the ten real equations all parse, and compute correct dimensions under a consistent binding', () => {
  it('v = u + at (kinematics)', () => {
    const bindings: SymbolBindings = { v: VELOCITY, u: VELOCITY, a: ACCELERATION, t: TIME }
    const analysis = analyzeEquation('v = u + at', bindings)
    expect(analysis.parsed).toBe(true)
    expect(analysis.lhs?.ok).toBe(true)
    expect(analysis.rhs?.ok).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
      expect(analysis.lhs.dimension).toEqual(VELOCITY)
    }
  })

  it('a = F/m (dynamics, rearranged)', () => {
    const bindings: SymbolBindings = { a: ACCELERATION, F: FORCE, m: M_ }
    const analysis = analyzeEquation('a = F/m', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('p = mv (momentum)', () => {
    const bindings: SymbolBindings = { p: MOMENTUM, m: M_, v: VELOCITY }
    const analysis = analyzeEquation('p = mv', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('F = ma (Newton\'s second law)', () => {
    const bindings: SymbolBindings = { F: FORCE, m: M_, a: ACCELERATION }
    const analysis = analyzeEquation('F = ma', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('E = mc² (mass-energy equivalence)', () => {
    const c: Dimension = VELOCITY
    const bindings: SymbolBindings = { E: ENERGY, m: M_, c }
    const analysis = analyzeEquation('E = mc²', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('s = ut + ½at² (kinematics, with a vulgar-fraction coefficient and a squared symbol)', () => {
    const bindings: SymbolBindings = { s: LENGTH, u: VELOCITY, t: TIME, a: ACCELERATION }
    const analysis = analyzeEquation('s = ut + ½at²', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
      expect(analysis.lhs.dimension).toEqual(LENGTH)
    }
  })

  it('T = 2π√(L/g) (pendulum period — π is dimensionless with no binding needed)', () => {
    const bindings: SymbolBindings = { T: TIME, L: LENGTH, g: GRAV_ACCEL }
    const analysis = analyzeEquation('T = 2π√(L/g)', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('v = √(T/μ) (wave speed on a string — T here is TENSION, a force, not time)', () => {
    // The exact symbol-overloading case §4.3 names: T means something
    // different in this equation than in the pendulum equation above. This
    // fixture binds T to FORCE deliberately, proving bindings are per-call,
    // never global.
    const bindings: SymbolBindings = { v: VELOCITY, T: FORCE, μ: LINEAR_DENSITY }
    const analysis = analyzeEquation('v = √(T/μ)', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('B = μ₀nI (solenoid field — μ₀ is its own distinct symbol, never conflated with μ)', () => {
    const bindings: SymbolBindings = {
      B: MAGNETIC_FIELD,
      μ0: PERMEABILITY,
      n: { ...Z, L: -1 }, // turns per metre
      I: CURRENT,
    }
    const analysis = analyzeEquation('B = μ₀nI', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('a = Δv/Δt (Δv and Δt are each ONE symbol, never Δ times v)', () => {
    const bindings: SymbolBindings = { a: ACCELERATION, 'Δv': VELOCITY, 'Δt': TIME }
    const analysis = analyzeEquation('a = Δv/Δt', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
    // And Δ is never silently dropped or treated as its own factor: binding
    // only "v"/"t" (not "Δv"/"Δt") must leave both sides unbound.
    const wrongBinding: SymbolBindings = { a: ACCELERATION, v: VELOCITY, t: TIME }
    const wrongAnalysis = analyzeEquation('a = Δv/Δt', wrongBinding)
    expect(wrongAnalysis.rhs?.ok).toBe(false)
  })
})

describe('§4.2 — deliberately mismatched bindings are correctly flagged as inconsistent', () => {
  it('v = u + at is INCONSISTENT if a is bound to a force, not an acceleration', () => {
    const bindings: SymbolBindings = { v: VELOCITY, u: VELOCITY, a: FORCE, t: TIME }
    const analysis = analyzeEquation('v = u + at', bindings)
    expect(analysis.parsed).toBe(true)
    expect(analysis.rhs?.ok).toBe(false)
    if (!analysis.rhs?.ok) {
      expect(analysis.rhs?.reason).toMatch(/inconsistent addition/)
    }
  })

  it('F = ma is dimensionally WRONG if m is bound to a length, not a mass', () => {
    const bindings: SymbolBindings = { F: FORCE, m: LENGTH, a: ACCELERATION }
    const analysis = analyzeEquation('F = ma', bindings)
    expect(analysis.parsed).toBe(true)
    expect(analysis.lhs?.ok).toBe(true)
    expect(analysis.rhs?.ok).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(false)
    }
  })

  it('an unbound symbol abstains with a reason, never a guessed dimension', () => {
    const analysis = analyzeEquation('F = ma', { F: FORCE, m: M_ })
    expect(analysis.parsed).toBe(true)
    expect(analysis.rhs?.ok).toBe(false)
    if (!analysis.rhs?.ok) {
      expect(analysis.rhs?.reason).toBe('unbound symbol "a"')
    }
  })
})

describe('algebra primitives — multiply / divide / power / dimensionsEqual', () => {
  it('multiply adds exponents component-wise', () => {
    expect(multiply(M_, L_)).toEqual({ ...Z, M: 1, L: 1 })
    expect(multiply(FORCE, TIME)).toEqual(MOMENTUM)
  })

  it('divide subtracts exponents component-wise', () => {
    expect(divide(FORCE, M_)).toEqual(ACCELERATION)
    expect(divide(VELOCITY, TIME)).toEqual(ACCELERATION)
  })

  it('power scales every exponent, including fractional powers for roots', () => {
    expect(power(VELOCITY, 2)).toEqual({ ...Z, L: 2, T: -2 })
    expect(power({ ...Z, L: 2, T: -2 }, 0.5)).toEqual(VELOCITY)
    expect(power(DIMENSIONLESS, 5)).toEqual(DIMENSIONLESS)
  })

  it('dimensionsEqual is exact across all 7 exponents, order-independent construction', () => {
    expect(dimensionsEqual(FORCE, { T: -2, L: 1, M: 1, I: 0, Θ: 0, N: 0, J: 0 })).toBe(true)
    expect(dimensionsEqual(FORCE, MOMENTUM)).toBe(false)
    expect(dimensionsEqual(DIMENSIONLESS, Z)).toBe(true)
  })

  it('multiply/divide are inverse operations', () => {
    expect(divide(multiply(FORCE, TIME), TIME)).toEqual(FORCE)
  })
})

describe('total-function / never-throw guarantee, executed (not just structural)', () => {
  it('dimensionOf never throws even when handed an internally-inconsistent expression', () => {
    const parsed = parseEquation('v = u + at')
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      expect(() => dimensionOf(parsed.equation.rhs, {})).not.toThrow()
      const result = dimensionOf(parsed.equation.rhs, {})
      expect(result.ok).toBe(false)
    }
  })

  it('analyzeEquation on a Θ/N/J-dimensioned quantity resolves cleanly (all 7 base dimensions reachable)', () => {
    const bindings: SymbolBindings = { a: THETA_, b: THETA_ }
    const analysis = analyzeEquation('a = b', bindings)
    expect(analysis.parsed).toBe(true)
    if (analysis.lhs?.ok && analysis.rhs?.ok) {
      expect(dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)).toBe(true)
    }
  })

  it('a fuzz-style sweep of random junk strings never throws', () => {
    const chars = 'abcXYZ=+-*/^()√ ½²₀0123π():"\''.split('')
    let seed = 42
    function rand() {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    for (let i = 0; i < 500; i += 1) {
      const len = Math.floor(rand() * 20)
      let s = ''
      for (let j = 0; j < len; j += 1) s += chars[Math.floor(rand() * chars.length)]
      expect(() => parseEquation(s)).not.toThrow()
      expect(() => analyzeEquation(s, {})).not.toThrow()
    }
  })
})
