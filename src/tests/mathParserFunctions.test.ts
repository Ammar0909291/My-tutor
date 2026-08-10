import { describe, it, expect } from 'vitest'
import { compileExpression } from '@/lib/visuals/mathParser'

/**
 * NAMED FUNCTIONS — the parser gap that was silently deleting correct science.
 *
 * Before this, the tokenizer rejected every letter but `x`, so any named
 * function failed to compile. The visual critic then refused the figure as a
 * blank plot — correctly, but the defect was upstream, and it removed a whole
 * class of true graphs. Measured examples that failed:
 *   100*exp(-0.2*x)        radioactive decay
 *   exp(-(x+2)^2*1.5)      activation-energy profile
 *   sin(x)                 simple harmonic motion
 */

const at = (eq: string, x: number) => compileExpression(eq)!.eval(x)
const compiles = (eq: string) => compileExpression(eq) !== null

describe('the measured blockers now compile and evaluate', () => {
  it('exponential decay', () => {
    expect(compiles('100*exp(-0.2*x)')).toBe(true)
    expect(at('100*exp(-0.2*x)', 0)).toBeCloseTo(100, 6)
    // A decay curve must actually decay.
    expect(at('100*exp(-0.2*x)', 5)).toBeLessThan(at('100*exp(-0.2*x)', 1))
    expect(at('100*exp(-0.2*x)', 5)).toBeCloseTo(100 * Math.exp(-1), 6)
  })

  it('a Gaussian — nested, negated, with a coefficient inside', () => {
    const eq = 'exp(-(x+2)^2 * 1.5)'
    expect(compiles(eq)).toBe(true)
    // Peaks at its centre, x = -2.
    expect(at(eq, -2)).toBeCloseTo(1, 6)
    expect(at(eq, 0)).toBeLessThan(at(eq, -2))
    expect(at(eq, -4)).toBeLessThan(at(eq, -2))
  })

  it('simple harmonic motion', () => {
    expect(at('sin(x)', 0)).toBeCloseTo(0, 6)
    expect(at('sin(x)', Math.PI / 2)).toBeCloseTo(1, 6)
    expect(at('cos(x)', 0)).toBeCloseTo(1, 6)
  })
})

describe('composing with everything that already worked', () => {
  it('functions combine with operators and each other', () => {
    expect(at('2*exp(x)', 0)).toBeCloseTo(2, 6)
    expect(at('exp(x) + x^2', 0)).toBeCloseTo(1, 6)
    expect(at('sin(x)*cos(x)', Math.PI / 4)).toBeCloseTo(0.5, 6)
    expect(at('exp(sin(x))', 0)).toBeCloseTo(1, 6)       // nested calls
    expect(at('-exp(x)', 0)).toBeCloseTo(-1, 6)          // unary minus outside
    expect(at('exp(-x)', 1)).toBeCloseTo(Math.exp(-1), 6) // unary minus inside
  })

  it('implicit multiplication reaches a function name', () => {
    expect(at('3exp(0)', 0)).toBeCloseTo(3, 6)
    expect(at('(x+1)sin(0)', 1)).toBeCloseTo(0, 6)
  })

  it('a leading y = or f(x) = is still stripped', () => {
    expect(at('y = exp(x)', 0)).toBeCloseTo(1, 6)
    expect(at('f(x) = sin(x)', 0)).toBeCloseTo(0, 6)
  })
})

describe('the whitelist is still a whitelist', () => {
  it('UNKNOWN IDENTIFIERS ARE REFUSED, not decomposed', () => {
    // The danger of reading letters at all: `tan(x)` must fail outright rather
    // than being torn into something the evaluator accepts.
    for (const eq of ['tan(x)', 'log(x)', 'ln(x)', 'sqrt(x)', 'wobble(x)', 'alert(1)', 'exx(x)']) {
      expect(compiles(eq), eq).toBe(false)
    }
  })

  it('a function name without its argument is refused', () => {
    for (const eq of ['exp', 'exp*2', 'sin + 1', 'exp x']) {
      expect(compiles(eq), eq).toBe(false)
    }
  })

  it('malformed input is still refused', () => {
    for (const eq of ['exp(', 'exp(x', 'exp(x))', '((', '', '   ', 'x^']) {
      expect(compiles(eq), eq).toBe(false)
    }
  })

  it('NO CODE EXECUTION — the evaluator is a whitelist, not eval()', () => {
    for (const eq of [
      'constructor', 'process.exit(1)', '__proto__', 'Math.exp(x)',
      'globalThis', 'require("fs")', 'x;alert(1)',
    ]) {
      expect(compiles(eq), eq).toBe(false)
    }
  })
})

describe('unary minus binds looser than a power — a pre-existing sign bug', () => {
  // `-x^2` used to evaluate to +9 at x=3, because the negation was applied to
  // the base before the power. A downward parabola came out pointing up: worse
  // than failing to compile, because the figure looks correct and teaches the
  // opposite. Found while enabling Gaussians, whose shape IS exp(-(...)^2).
  it('-x^2 is -(x^2), not (-x)^2', () => {
    expect(at('-x^2', 3)).toBeCloseTo(-9, 6)
    expect(at('-(x+2)^2', 3)).toBeCloseTo(-25, 6)
  })

  it('and the ordinary readings are unchanged', () => {
    expect(at('(-x)^2', 3)).toBeCloseTo(9, 6)
    expect(at('-0.5*x^2 + 8', 3)).toBeCloseTo(3.5, 6)
    expect(at('-2x + 1', 2)).toBeCloseTo(-3, 6)
    expect(at('-x', 4)).toBeCloseTo(-4, 6)
  })
})

describe('domain and overflow safety', () => {
  it('AN EXPRESSION THAT CANNOT PRODUCE A FINITE VALUE IS REFUSED', () => {
    // Infinity is not NaN, so the old probe let overflow through and a blank
    // plot could reach a learner.
    expect(compiles('exp(1000)')).toBe(false)
    expect(compiles('1/0')).toBe(false)
  })

  it('a legitimate pole is still allowed — it is finite elsewhere', () => {
    expect(compiles('1/(x-1)')).toBe(true)
    expect(at('1/(x-1)', 3)).toBeCloseTo(0.5, 6)
  })

  it('non-finite values at particular points are reported, not hidden', () => {
    // The caller (the critic) samples and requires enough finite points; the
    // parser's job is to hand back the honest value at each x.
    expect(Number.isFinite(at('1/(x-1)', 1))).toBe(false)
  })
})

describe('REGRESSION — everything that worked before behaves identically', () => {
  const cases: [string, number, number][] = [
    ['2x + 1', 3, 7],
    ['x^2', -3, 9],
    ['0.5 * x^2', 4, 8],
    ['y = x^2 - 2x - 3', 2, -3],
    ['-2x + 1', 2, -3],
    ['x', 5, 5],
    ['5', 0, 5],
    ['y=x', 2, 2],
  ]
  it.each(cases)('%s at x=%d', (eq, x, want) => {
    expect(compiles(eq)).toBe(true)
    expect(at(eq, x)).toBeCloseTo(want, 6)
  })

  it('previously-invalid input is still invalid', () => {
    for (const eq of ['((', 'wobble(((', 'y = sin(@@@)']) {
      expect(compiles(eq), eq).toBe(false)
    }
  })
})
