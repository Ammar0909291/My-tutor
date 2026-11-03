/**
 * Mathematics visual campaign, batch 46 (2026-11-03): Angle Measure and Right-Triangle Trigonometry. Both were served the shared "Geometry Shapes"
 * card (a triangle labelled "3 sides", ∠A + ∠B + ∠C = 180° printed under a rectangle, a circle) — nothing about radians or sine / cosine / tangent.
 * Every claim is re-derived from the DRAWN coordinates, not from the generator's constants alone.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB46'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const stepObjs = (s: SceneSpec, i: number): Obj[] => s.steps[i].objects as Obj[]
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathLength = (pts: number[][]) => pts.slice(1).reduce((t, p, i) => t + dist(pts[i], p), 0)
const texts = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label').map((o) => o.text)

const ANGLE = M.buildAngleMeasureScene()
const TRI = M.buildRightTriangleTrigScene()

describe.each([['math.trig.angle-measure', 'math-angle-measure'], ['math.trig.right-triangle-trig', 'math-right-triangle-trig']])('%s is served its own figure', (concept, id) => {
  it.each([null, 'diagram'] as const)(`resolves to ${id} (request: %s)`, (req) => {
    const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: concept, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.graphical, d.provenance).toBe(true)
    expect(d.asset?.scope).toBe('concept')
    expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    expect(isRetiredVisualBinding(concept)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(concept)).toBe(false)
  })
})

describe.each([['angle measure', ANGLE], ['right-triangle trig', TRI]] as const)('the %s figure is well-formed', (_n, scene) => {
  it('passes the scene validator and the figure audit', () => {
    const v = validateSceneSpec(scene) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: scene } as never)).toEqual([])
  })
  it('keeps every coordinate inside ±5, fits the label budget, three cumulative steps with narration', () => {
    for (const o of objs(scene)) for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
      expect(Math.abs(p[0])).toBeLessThanOrEqual(5); expect(Math.abs(p[1])).toBeLessThanOrEqual(5)
    }
    expect(objs(scene).filter((o) => o.type === 'label' && !isGlyphLabel(o as never)).length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    expect(scene.steps).toHaveLength(3)
    for (const st of scene.steps) { expect((st.narration ?? '').length).toBeGreaterThan(20); expect(st.objects.length).toBeLessThanOrEqual(50) }
    expect(scene.steps.reduce((n, s) => n + (s.narration ?? '').length, 0)).toBeLessThan(1000)
  })
})

describe('angle measure: the radian is read off the drawn geometry', () => {
  const thick = stepObjs(ANGLE, 1).find((o) => o.type === 'path' && o.color === '#3b82f6')!
  const ruler = stepObjs(ANGLE, 1).find((o) => o.type === 'bond' && o.color === '#3b82f6')!
  const radii = stepObjs(ANGLE, 0).filter((o) => o.type === 'bond' && o.from![0] === M.AM.cx && o.from![1] === M.AM.cy)

  it('the thick arc runs along the circle: every point is one radius from the centre', () => {
    for (const p of thick.points!) expect(dist(p, [M.AM.cx, M.AM.cy])).toBeCloseTo(M.AM.R, 1)
  })
  it('the arc is as long as the radius, and so is the straight ruler laid below the circle', () => {
    expect(pathLength(thick.points!)).toBeCloseTo(M.AM.R, 1)
    expect(dist(ruler.from!, ruler.to!)).toBeCloseTo(M.AM.R, 6)
    expect(ruler.from![1]).toBeLessThan(M.AM.cy - M.AM.R)   // below the circle, not on it
  })
  it('the angle between the two drawn radii is one radian (arc ÷ radius = 1), about 57.3°', () => {
    expect(radii).toHaveLength(2)
    const [a, b] = radii.map((r) => Math.atan2(r.to![1] - r.from![1], r.to![0] - r.from![0]))
    const angle = Math.abs(b - a)
    expect(angle).toBeCloseTo(1, 1)
    expect((angle * 180) / Math.PI).toBeCloseTo(57.3, 0)
    expect(pathLength(thick.points!) / M.AM.R).toBeCloseTo(angle, 1)
  })
  it('the half-turn marker is at the far left of the circle: π radians = 180°, and 2π = 360° is named', () => {
    const half = stepObjs(ANGLE, 2).find((o) => o.type === 'node')!
    expect(half.position![0]).toBeCloseTo(M.AM.cx - M.AM.R, 6); expect(half.position![1]).toBeCloseTo(M.AM.cy, 6)
    expect(texts(ANGLE)).toEqual(expect.arrayContaining(['π = 180°', '2π = 360°', 'arc = r', 'θ = 1 radian']))
  })
  it('the lesson’s conversion holds: 2π radians = 360°', () => { expect(2 * Math.PI * (180 / Math.PI)).toBeCloseTo(360, 9); expect(M.ONE_RADIAN_DEG).toBeCloseTo(57.2958, 3) })
})

describe('right-triangle trig: sides and ratios are read off the drawn triangle', () => {
  const sides = stepObjs(TRI, 0).filter((o) => o.type === 'bond' && o.color !== '#94a3b8')
  const byColor = (c: string) => sides.find((o) => o.color === c)!
  const adj = byColor('#ef4444'), opp = byColor('#3b82f6'), hyp = byColor('#e2e8f0')
  const len = (o: Obj) => dist(o.from!, o.to!)

  it('the triangle is right-angled at B (Pythagoras on the DRAWN sides) and is 3-4-5', () => {
    expect(len(adj) ** 2 + len(opp) ** 2).toBeCloseTo(len(hyp) ** 2, 6)
    expect([len(opp), len(adj), len(hyp)].map((v) => Math.round(v * 100) / 100)).toEqual([3, 4, 5])
    expect(adj.to).toEqual(opp.from)                       // they meet at B
  })
  it('the hypotenuse is the longest side and faces the right angle; opposite is vertical, adjacent horizontal', () => {
    expect(len(hyp)).toBeGreaterThan(len(adj)); expect(len(hyp)).toBeGreaterThan(len(opp))
    expect(opp.from![0]).toBeCloseTo(opp.to![0], 9); expect(adj.from![1]).toBeCloseTo(adj.to![1], 9)
  })
  it('θ is at the lower-left corner: opposite is the side NOT touching it, adjacent is the one touching it', () => {
    const A = adj.from!
    expect(hyp.from).toEqual(A)
    expect(dist(opp.from!, A)).toBeGreaterThan(0.5); expect(dist(opp.to!, A)).toBeGreaterThan(len(adj) - 1e-6)   // neither end of the opposite side is at A
    expect(dist(adj.from!, A)).toBe(0)
  })
  it('the stated ratios are the drawn ones: sin = 3/5, cos = 4/5, tan = 3/4', () => {
    expect(len(opp) / len(hyp)).toBeCloseTo(3 / 5, 6)
    expect(len(adj) / len(hyp)).toBeCloseTo(4 / 5, 6)
    expect(len(opp) / len(adj)).toBeCloseTo(3 / 4, 6)
    expect(texts(TRI)).toEqual(expect.arrayContaining(['sin θ = 3/5', 'cos θ = 4/5', 'tan θ = 3/4', 'adjacent', 'opposite', 'hypotenuse']))
    expect(M.rtThetaDeg()).toBeCloseTo(36.87, 2)
  })
  it('the angle arc spans exactly θ = atan(3/4)', () => {
    const arc = stepObjs(TRI, 0).find((o) => o.type === 'path')!
    const last = arc.points![arc.points!.length - 1], A = hyp.from!
    expect((Math.atan2(last[1] - A[1], last[0] - A[0]) * 180) / Math.PI).toBeCloseTo(M.rtThetaDeg(), 0)
  })
  it('no figure text is left over from the old "Geometry Shapes" card', () => {
    const all = texts(TRI).join(' | ') + texts(ANGLE).join(' | ')
    expect(all).not.toMatch(/3 sides|Rectangle|∠A/)
  })
})
