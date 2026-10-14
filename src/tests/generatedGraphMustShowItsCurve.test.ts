/**
 * A generated graph opened on empty axes, and the tutor described its curve.
 *
 * 2026-09-30 learner baseline, C2 (chem.equil.le-chatelier, real account): the
 * Tier-3 figure was a graph of `-5000 * (1/x) + 10` titled "Van't Hoff
 * Isocline: ln K vs 1/T", opening on −5…5. Every value there is beyond ±1000,
 * so nothing was drawn. The learner: "i dont see any line in this graph";
 * "there is no curve in the picture!!" — the tutor: "the curve you see …",
 * four times. A graph whose curve is not in its opening view is refused.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { compileExpression } from '@/lib/visuals/mathParser'
import { visibleCurveFraction, initialGraphView } from '@/lib/visuals/graphView'
import { validateGeneratedFigure } from '@/lib/teaching/visual/visualEngine'

const ctx = {
  conceptId: 'chem.equil.le-chatelier', title: "Le Chatelier's Principle", prerequisites: [],
  description: "Equilibrium shifts to oppose a change in concentration, pressure or temperature; the equilibrium constant depends on temperature, which a van't Hoff isocline plots.",
}
const C2 = { type: 'graph', equation: '-5000 * (1/x) + 10', title: "Van't Hoff Isocline: ln K vs 1/T", xLabel: '1/T (1/K)', yLabel: 'ln K', domain: [-5, 5] }

describe('the production figure', () => {
  it('draws nothing in its opening view', () => {
    expect(visibleCurveFraction(C2.equation, C2.domain as [number, number])).toBe(0)
  })

  it('is anchored to its concept, so only the empty view refuses it', () => {
    const r = validateGeneratedFigure({ ...C2, equation: '-5 * x + 1' }, ctx, { requireAxisLabels: true })
    expect(r.ok).toBe(true)
  })

  it('is refused as nothing-drawable', () => {
    const r = validateGeneratedFigure(C2, ctx, { requireAxisLabels: true })
    expect(r).toEqual({ ok: false, reason: 'nothing-drawable' })
  })
})

describe('ordinary graphs still pass', () => {
  it.each([
    ['2x + 1', undefined],
    ['x^2', [-3, 3]],
    ['1/x', undefined],
    ['sin(x)', [-6.28, 6.28]],
    ['0.5*x^2', [0, 4]],
  ] as const)('%s', (equation, domain) => {
    expect(visibleCurveFraction(equation, domain as [number, number] | undefined)!).toBeGreaterThan(0.05)
  })
})

describe('the renderer and the check share one opening view', () => {
  it('GraphRenderer opens, re-fits and resets through initialGraphView (one source of truth for the opening view)', () => {
    const src = readFileSync('src/components/visuals/GraphRenderer.tsx', 'utf8')
    // initial state, the re-fit once the frame height is measured, and Reset — all three through the same function, with the equation
    expect(src.match(/initialGraphView\(spec\.domain, spec\.equation/g)).toHaveLength(3)
    expect(src).not.toMatch(/initialGraphView\(spec\.domain\)/)
  })

  it('the equation-fitted view never shows LESS of a curve than the origin-centred one (so the admission check stays conservative)', () => {
    const share = (view: { cx: number; cy: number; ppu: number }, equation: string, domain: [number, number], heightPx: number) => {
      const c = compileExpression(equation)!
      const halfH = heightPx / 2 / view.ppu
      let seen = 0, n = 0
      for (let i = 0; i <= 120; i++) {
        const y = c.eval(domain[0] + ((domain[1] - domain[0]) * i) / 120)
        n++
        if (Number.isFinite(y) && Math.abs(y - view.cy) <= halfH) seen++
      }
      return seen / n
    }
    const cases: Array<[string, [number, number]]> = [
      ['10/x', [1, 10]], ['x^2', [-3, 3]], ['2*x+3', [-5, 5]], ['0.5*x+200', [0, 10]], ['sin(x)', [0, 6.28]], ['100*exp(-0.3*x)', [0, 10]],
      ['-5000*(1/x)+10', [0.001, 0.01]], ['1/x', [-5, 5]], ['x^3 - 4*x', [-3, 3]], ['0.02*x', [0, 100]],
    ]
    for (const [eq, dom] of cases) for (const h of [200, 259, 298, 360]) {
      const legacy = share(initialGraphView(dom), eq, dom, h)
      const fitted = share(initialGraphView(dom, eq, h), eq, dom, h)
      expect(fitted, `${eq} @${h}px`).toBeGreaterThanOrEqual(Math.min(legacy, 0.999))
    }
  })

  it('a curve that fits, or crosses zero, keeps its opening view EXACTLY; a clipped one-sided curve is fitted from zero (Boyle P = 10/V, 2026-10-14)', () => {
    for (const [eq, dom] of [['x', [-5, 5]], ['x^2', [-3, 3]], ['sin(x)', [0, 6.28]], ['x^3 - 4*x', [-3, 3]], ['0.5*x', [-10, 10]]] as Array<[string, [number, number]]>) {
      expect(initialGraphView(dom, eq), eq).toEqual(initialGraphView(dom))
    }
    const boyle = initialGraphView([1, 10], '10/x', 298)
    expect(initialGraphView([1, 10])).toEqual({ cx: 5.5, cy: 0, ppu: 40 })
    // the whole curve (P from 1 to 10) is inside the fitted view, and the empty negative half is not: the lower edge sits just under zero
    const halfH = 298 / 2 / boyle.ppu
    expect(boyle.cy + halfH).toBeGreaterThanOrEqual(10)
    expect(boyle.cy - halfH).toBeGreaterThan(-2)
    expect(boyle.cy - halfH).toBeLessThanOrEqual(0)
  })

  it('the view fits the domain', () => {
    expect(initialGraphView([-5, 5])).toEqual({ cx: 0, cy: 0, ppu: 36 })
  })
})
