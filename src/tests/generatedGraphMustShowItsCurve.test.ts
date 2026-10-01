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
  it('GraphRenderer opens and resets through initialGraphView', () => {
    const src = readFileSync('src/components/visuals/GraphRenderer.tsx', 'utf8')
    expect(src.match(/initialGraphView\(spec\.domain\)/g)).toHaveLength(2)
  })

  it('the view fits the domain', () => {
    expect(initialGraphView([-5, 5])).toEqual({ cx: 0, cy: 0, ppu: 36 })
  })
})
