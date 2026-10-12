/**
 * Mathematics visual campaign, batch 6 (2026-10-11): twelve single-variable calculus concepts.
 * Each test checks the MATHEMATICS the figure draws — the drawn coordinates are mapped
 * back to math coordinates and compared with an independent calculation — not just
 * that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB6'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const hasDot = (s: SceneSpec, x: number, y: number, tol = 0.025) => dots(s).some((d) => near(d.position![0], x, tol) && near(d.position![1], y, tol))
/** Map screen coordinates back to math coordinates for a figure drawn as (x*u+ox, y*u+oy). */
const back = (u: number, ox = 0, oy = 0) => (p: number[]): [number, number] => [(p[0] - ox) / u, (p[1] - oy) / u]

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.calc.limits', M.buildLimitScene, 'math-limits'],
  ['math.calc.one-sided-limits', M.buildOneSidedLimitsScene, 'math-one-sided-limits'],
  ['math.calc.limits-at-infinity', M.buildLimitsAtInfinityScene, 'math-limits-at-infinity'],
  ['math.calc.continuity', M.buildPointContinuityScene, 'math-continuity'],
  ['math.calc.continuity-types', M.buildContinuityTypesScene, 'math-continuity-types'],
  ['math.calc.derivative-intro', M.buildDerivativeIntroScene, 'math-derivative-intro'],
  ['math.calc.derivative-definition', M.buildDerivativeDefinitionScene, 'math-derivative-definition'],
  ['math.calc.differentiability', M.buildDifferentiabilityScene, 'math-differentiability'],
  ['math.calc.increasing-decreasing', M.buildIncreasingDecreasingScene, 'math-increasing-decreasing'],
  ['math.calc.local-extrema', M.buildLocalExtremaScene, 'math-local-extrema'],
  ['math.calc.concavity', M.buildConcavityScene, 'math-concavity'],
  ['math.calc.riemann-sums', M.buildRiemannSumsScene, 'math-riemann-sums'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
  })
  it.each(['math.linalg.vector-addition', 'math.func.linear-function'])('%s is deliberately still figure-less (reserved fixture for the AI-generation tests)', (conceptId) => {
    const d = resolveVisual({ message: '', lessonConceptId: conceptId, learnerRequest: null, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.asset?.scope).not.toBe('concept')
  })
})

describe('every figure is well-formed', () => {
  it.each(BATCH)('%s passes the scene validator the renderer uses', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
  it.each(BATCH)('%s passes the figure audit that admits a figure to a learner (no blockers)', (_id, build) => {
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: build() } as never)).toEqual([])
  })
  it.each(BATCH)('%s keeps every coordinate inside +-5', (conceptId, build) => {
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
  it.each(BATCH)('%s fits the intermediate label budget (marks of 1-2 characters are free)', (_id, build) => {
    const named = labelsOf(build()).filter((o) => !isGlyphLabel(o as never))
    expect(named.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    expect(named.length).toBeGreaterThan(0)
  })
  it.each(BATCH)('%s stays under the 50-objects-per-step limit', (_id, build) => {
    for (const st of build().steps) expect(st.objects.length).toBeLessThanOrEqual(50)
  })
  it.each(BATCH)('%s has three cumulative steps with narration', (_id, build) => {
    const s = build()
    expect(s.steps).toHaveLength(3)
    for (const st of s.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
    expect((s.ariaLabel ?? '').length).toBeGreaterThan(60)
  })
  it.each(BATCH)('%s uses only semantic role colours and a framing camera distance', (_id, build) => {
    const roles = new Set([SLATE, INK, RED, BLUE, VIOLET, GREEN])
    const s = build()
    for (const o of objs(s)) if (o.color) expect(roles.has(o.color.toLowerCase()), `${o.type} ${o.color}`).toBe(true)
    expect(s.cameraDistance!).toBeGreaterThanOrEqual(7)
    expect(s.cameraDistance!).toBeLessThanOrEqual(13)
  })
})

type XY = [number, number]
const dirOf = (o: Obj): XY => [o.to![0] - o.from![0], o.to![1] - o.from![1]]
const slopeOf = (o: Obj) => dirOf(o)[1] / dirOf(o)[0]
const centreOfRing = (o: Obj): XY => [o.points!.reduce((s, p) => s + p[0], 0) / o.points!.length, o.points!.reduce((s, p) => s + p[1], 0) / o.points!.length]
const rings = (s: SceneSpec) => paths(s).filter((p) => p.points!.length === 25)

describe('the mathematics each figure draws', () => {
  it('Limit: every drawn point is on y = x + 1, both approaches close in on height 2, the hole at (1, 2) is the missing point, and the limit is 2', () => {
    const { u, ox, oy, a, left, right } = M.LIM
    const toMath = back(u, ox, oy)
    expect(M.limF(0.5)).toBeCloseTo(1.5, 12); expect(M.limF(1.05)).toBeCloseTo(2.05, 12)
    expect(Number.isNaN(M.limF(1))).toBe(true)                                                         // 0 / 0
    for (const h of [1e-3, 1e-6, 1e-9]) { expect(Math.abs(M.limF(1 - h) - 2)).toBeLessThan(2 * h); expect(Math.abs(M.limF(1 + h) - 2)).toBeLessThan(2 * h) }   // the limit is 2 from both sides
    const s = M.buildLimitScene()
    const reds = dots(s, RED).map((d) => toMath(d.position!)), blues = dots(s, BLUE).map((d) => toMath(d.position!))
    expect(reds).toHaveLength(3); expect(blues).toHaveLength(3)
    for (const [x, y] of [...reds, ...blues]) expect(y).toBeCloseTo(x + 1, 1)                         // on the graph
    reds.forEach(([x]) => expect(x).toBeLessThan(a)); blues.forEach(([x]) => expect(x).toBeGreaterThan(a))
    const gaps = (pts: XY[]) => pts.map(([x]) => Math.abs(x - a)).sort((p, q) => q - p)
    const gl = gaps(reds), gr = gaps(blues)
    for (let i = 1; i < 3; i++) { expect(gl[i]).toBeLessThan(gl[i - 1]); expect(gr[i]).toBeLessThan(gr[i - 1]) }   // each approach gets closer
    expect(Math.abs(reds.sort((p, q) => q[0] - p[0])[0][1] - 2)).toBeLessThan(0.06)                  // the closest points are within 0.06 of 2
    const hole = toMath(centreOfRing(rings(s)[0]))
    expect(hole[0]).toBeCloseTo(1, 1); expect(hole[1]).toBeCloseTo(2, 1)
    const pieces = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06)
    expect(pieces).toHaveLength(2)
    const [pl, pr] = [...pieces].sort((p, q) => p.from![0] - q.from![0])
    expect(toMath(pl.to!)[0]).toBeLessThan(1); expect(toMath(pr.from!)[0]).toBeGreaterThan(1)          // x = 1 falls in the gap
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = (x\u00B2 \u2212 1)/(x \u2212 1)', 'limit = 2']))
  })

  it('One-sided limits: the left piece is y = x (limit 1), the right piece y = x + 2 (limit 3), f(1) = 3; the sides disagree', () => {
    const { u, ox, oy, a, left, right } = M.ONES
    const toMath = back(u, ox, oy)
    expect(M.onesF(1 - 1e-9)).toBeCloseTo(1, 6); expect(M.onesF(1 + 1e-9)).toBeCloseTo(3, 6); expect(M.onesF(1)).toBe(3)
    expect(M.onesF(1 - 1e-9)).not.toBeCloseTo(M.onesF(1 + 1e-9), 1)
    const s = M.buildOneSidedLimitsScene()
    const reds = dots(s, RED).map((d) => toMath(d.position!)), blues = dots(s, BLUE).map((d) => toMath(d.position!))
    expect(reds).toHaveLength(left.length); expect(blues).toHaveLength(right.length)
    for (const [x, y] of reds) { expect(x).toBeLessThan(a); expect(y).toBeCloseTo(x, 1) }
    for (const [x, y] of blues) { expect(x).toBeGreaterThan(a); expect(y).toBeCloseTo(x + 2, 1) }
    expect(Math.max(...reds.map((p) => p[1]))).toBeLessThan(1); expect(Math.min(...blues.map((p) => p[1]))).toBeGreaterThan(3)   // left stays below 1, right stays above 3
    const ring = toMath(centreOfRing(rings(s)[0])); expect(ring[0]).toBeCloseTo(1, 1); expect(ring[1]).toBeCloseTo(1, 1)         // open: (1, 1) is not on the graph
    const filled = dots(s, INK).map((d) => toMath(d.position!)); expect(filled).toHaveLength(1)
    expect(filled[0][0]).toBeCloseTo(1, 1); expect(filled[0][1]).toBeCloseTo(3, 1)                                                   // filled: f(1) = 3
    expect(texts(s)).toEqual(expect.arrayContaining(['from the left \u2192 1', 'from the right \u2192 3', '1 \u2260 3: no limit at x = 1']))
  })

  it('Limits at infinity: the curve is y = 2 + 1/x, the points sink to 2 from above on the right and rise to 2 from below on the left, and y = 2 is drawn as the asymptote', () => {
    const { u, ox, oy, right, left } = M.LINF
    const toMath = back(u, ox, oy)
    for (const t of [1e3, 1e6]) { expect(M.linfF(t) - 2).toBeCloseTo(0, 2); expect(M.linfF(-t) - 2).toBeCloseTo(0, 2) }
    expect(M.linfF(1e9) - 2).toBeGreaterThan(0); expect(M.linfF(-1e9) - 2).toBeLessThan(0)
    const s = M.buildLimitsAtInfinityScene()
    for (const c of paths(s, INK)) for (const p of c.points!) { const [x, y] = toMath(p); expect(Math.abs(y - (2 + 1 / x))).toBeLessThan(0.15) }
    const r = dots(s, BLUE).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0]), l = dots(s, RED).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    right.forEach((x, i) => { expect(r[i][0]).toBeCloseTo(x, 1); expect(r[i][1]).toBeCloseTo(M.linfF(x), 1) })
    const lsorted = [...left].sort((p, q) => p - q)
    lsorted.forEach((x, i) => { expect(l[i][0]).toBeCloseTo(x, 1); expect(l[i][1]).toBeCloseTo(M.linfF(x), 1) })
    for (let i = 1; i < r.length; i++) expect(r[i][1]).toBeLessThan(r[i - 1][1])                         // sinking
    for (let i = 1; i < l.length; i++) expect(l[i][1]).toBeLessThan(l[i - 1][1])                          // left points run far to near: the heights fall away from 2, i.e. they rise to 2 as x → −∞
    for (const d of l) expect(d[1]).toBeLessThan(2); for (const d of r) expect(d[1]).toBeGreaterThan(2)   // from below on the left, from above on the right
    const asym = lines(s, GREEN)[0]
    expect(near(asym.from![1], asym.to![1], 0.01)).toBe(true); expect(toMath(asym.from!)[1]).toBeCloseTo(2, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = 2 + 1/x', 'x \u2192 \u221E: f(x) \u2192 2', 'x \u2192 \u2212\u221E: f(x) \u2192 2', 'y = 2: horizontal asymptote']))
  })

  it('Continuity: f(1) = 1 exists, the limit is 1 from both sides, they are equal, and the drawn dot is on the curve', () => {
    const { u, ox, oy, a, left, right } = M.CONT
    const toMath = back(u, ox, oy)
    expect(M.contF(a)).toBe(1)
    for (const h of [1e-3, 1e-6]) { expect(M.contF(a - h)).toBeCloseTo(M.contF(a), 2); expect(M.contF(a + h)).toBeCloseTo(M.contF(a), 2) }   // limit = f(a)
    const s = M.buildPointContinuityScene()
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - (x * x / 2 + 0.5))).toBeLessThan(0.1) }
    const d = toMath(dots(s, GREEN)[0].position!); expect(d[0]).toBeCloseTo(1, 1); expect(d[1]).toBeCloseTo(1, 1)
    const reds = dots(s, RED).map((q) => toMath(q.position!)), blues = dots(s, BLUE).map((q) => toMath(q.position!))
    expect(reds).toHaveLength(left.length); expect(blues).toHaveLength(right.length)
    for (const [x, y] of [...reds, ...blues]) expect(Math.abs(y - M.contF(x))).toBeLessThan(0.05)
    const guideLine = lines(s, VIOLET)[0]; expect(toMath(guideLine.from!)[1]).toBeCloseTo(1, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(1) = 1', 'limit = 1', 'limit = f(1): continuous']))
  })

  it('Types of discontinuity: removable (a hole on y = x), jump (1 then 2, different one-sided limits), infinite (y = 1/x with x·y = 1 and a vertical asymptote at 0)', () => {
    const { s: sc, centres } = M.DISCON
    const s = M.buildContinuityTypesScene()
    const inPanel = (c: number) => (o: Obj) => (o.from ? Math.abs(o.from[0] - c) < 1.9 : o.points ? Math.abs(o.points[0][0] - c) < 1.9 : o.position ? Math.abs(o.position[0] - c) < 1.9 : false)
    const toP = (c: number) => (p: number[]): XY => [(p[0] - c) / sc, p[1] / sc]
    // removable
    const t1 = toP(centres[0])
    const rem = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06 && inPanel(centres[0])(o))
    expect(rem).toHaveLength(2)
    for (const l of rem) for (const p of [l.from!, l.to!]) { const [x, y] = t1(p); expect(y).toBeCloseTo(x, 1) }
    const hole = t1(centreOfRing(paths(s, RED)[0])); expect(hole[0]).toBeCloseTo(1, 1); expect(hole[1]).toBeCloseTo(1, 1)
    // jump
    const t2 = toP(centres[1])
    const jl = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06 && inPanel(centres[1])(o))
    expect(jl).toHaveLength(2)
    const [lp, rp] = [...jl].sort((p, q) => p.from![0] - q.from![0])
    expect(t2(lp.from!)[1]).toBeCloseTo(1, 1); expect(t2(rp.from!)[1]).toBeCloseTo(2, 1)               // left height 1, right height 2
    expect(t2(lp.from!)[1]).not.toBeCloseTo(t2(rp.from!)[1], 1)
    const jr = t2(centreOfRing(paths(s, BLUE)[0])); expect(jr[0]).toBeCloseTo(0, 1); expect(jr[1]).toBeCloseTo(1, 1)   // open at the left value
    const jd = dots(s, BLUE).map((d) => t2(d.position!)).find((p) => p[1] > 1.5)!; expect(jd[0]).toBeCloseTo(0, 1); expect(jd[1]).toBeCloseTo(2, 1)
    // infinite
    const t3 = toP(centres[2])
    for (const c of paths(s, INK).filter(inPanel(centres[2]))) for (const p of c.points!) { const [x, y] = t3(p); expect(Math.abs(x * y - 1)).toBeLessThan(0.1) }
    const asym = lines(s, GREEN)[0]; expect(near(t3(asym.from!)[0], 0, 0.01)).toBe(true)                // the asymptote is the line x = 0
    expect(texts(s)).toEqual(expect.arrayContaining(['removable', 'jump', 'infinite', 'hole', 'sides differ', 'unbounded']))
  })

  it('Derivative intro: the tangent at P(2, 1) has slope f′(2) = 1 and touches the curve only at P; at Q(4, 4) the slope is 2, so the slope varies', () => {
    const { u, ox, oy, p, q } = M.DER
    expect(M.derFp(p)).toBe(1); expect(M.derFp(q)).toBe(2); expect(M.derF(p)).toBe(1); expect(M.derF(q)).toBe(4)
    for (const x of [-1, 0, 1, 3, 4, 6]) expect(M.derF(x)).toBeGreaterThanOrEqual(M.derF(p) + M.derFp(p) * (x - p) - 1e-12)   // the curve is on or above its tangent: they touch only at P
    const s = M.buildDerivativeIntroScene()
    const toMath = back(u, ox, oy)
    for (const c of paths(s, INK)) for (const pt of c.points!) { const [x, y] = toMath(pt); expect(Math.abs(y - x * x / 4)).toBeLessThan(0.1) }
    const tans = lines(s, VIOLET).filter((o) => (o as Obj).thickness === 0.05)
    expect(tans).toHaveLength(2)
    const sl = tans.map(slopeOf).sort((a, b) => a - b)
    expect(sl[0]).toBeCloseTo(1, 1); expect(sl[1]).toBeCloseTo(2, 1)                                      // slope 1 at P, slope 2 at Q
    for (const [t, [x0, y0]] of [[tans.find((o) => near(slopeOf(o), 1, 0.05))!, [p, M.derF(p)]], [tans.find((o) => near(slopeOf(o), 2, 0.05))!, [q, M.derF(q)]]] as const) {
      const [sx, sy] = [(x0 * u + ox), (y0 * u + oy)]
      expect(Math.abs((sx - t.from![0]) * dirOf(t)[1] - (sy - t.from![1]) * dirOf(t)[0])).toBeLessThan(0.05)   // the point is on its tangent
    }
    const run = lines(s, RED)[0], rise = lines(s, BLUE)[0]
    expect(near(len(run), 1 * u)).toBe(true); expect(near(len(rise), 1 * u)).toBe(true)                    // run 1, rise 1: slope 1
    expect(texts(s)).toEqual(expect.arrayContaining(['P', 'Q', 'slope 1', 'f\u2032(2) = 1', 'slope 2: steeper']))
  })

  it('Derivative definition: the secant slopes through P(2, 1) are 1.5, 1.25, 1.125 = 1 + h/4 for h = 2, 1, 0.5, and they close in on the tangent slope 1', () => {
    const { u, ox, oy, p } = M.DER
    const { hs } = M.SEC
    expect(hs.map((h) => M.secantSlope(p, h))).toEqual([1.5, 1.25, 1.125])
    for (const h of hs) expect(M.secantSlope(p, h)).toBeCloseTo(1 + h / 4, 12)
    for (const h of [1e-3, 1e-6]) expect(M.secantSlope(p, h)).toBeCloseTo(M.derFp(p), 3)                  // the limit is f′(2) = 1
    const s = M.buildDerivativeDefinitionScene()
    const toMath = back(u, ox, oy)
    const secants = [RED, BLUE, VIOLET].map((c) => lines(s, c).find((o) => (o as Obj).thickness === 0.04)!)
    const slopes = secants.map(slopeOf)
    slopes.forEach((m, i) => expect(m / 1).toBeCloseTo(M.secantSlope(p, hs[i]), 1))                       // the DRAWN lines have those slopes
    for (let i = 1; i < slopes.length; i++) expect(Math.abs(slopes[i] - 1)).toBeLessThan(Math.abs(slopes[i - 1] - 1))   // each is closer to 1
    // the second point of each secant is on the curve at x = 2 + h, and the line passes through P and through it
    const qs = [dots(s, RED).find((d) => d.radius === 0.12)!, dots(s, BLUE)[0], dots(s, VIOLET).find((d) => d.radius === 0.12)!].map((d) => toMath(d.position!))
    qs.forEach(([x, y], i) => { expect(x).toBeCloseTo(p + hs[i], 1); expect(y).toBeCloseTo(M.derF(p + hs[i]), 1) })
    const tangent = lines(s, GREEN)[0]; expect(slopeOf(tangent)).toBeCloseTo(1, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['h = 2: slope 1.5', 'h = 1: 1.25', 'h = 0.5: 1.125', 'h \u2192 0: slope 1 = f\u2032(2)']))
  })

  it('Differentiability: x² has slope 0 at 0; |x| has left slope −1 and right slope +1 (they differ); ∛x has an infinite slope there (vertical tangent)', () => {
    const { s: sc, centres } = M.DIFF
    expect(Math.abs(-1 - 0) / 1).toBe(1)
    const dq = (f: (x: number) => number, h: number) => (f(h) - f(0)) / h
    expect(dq((x) => x * x, 1e-6)).toBeCloseTo(0, 5); expect(dq((x) => x * x, -1e-6)).toBeCloseTo(0, 5)                 // both sides agree: f′(0) = 0
    expect(dq(Math.abs, 1e-6)).toBeCloseTo(1, 9); expect(dq(Math.abs, -1e-6)).toBeCloseTo(-1, 9)                        // they disagree
    expect(dq(Math.cbrt, 1e-6)).toBeGreaterThan(1e3); expect(dq(Math.cbrt, 1e-9)).toBeGreaterThan(dq(Math.cbrt, 1e-6))  // grows without bound
    const s = M.buildDifferentiabilityScene()
    const toP = (c: number) => (p: number[]): XY => [(p[0] - c) / sc, p[1] / sc]
    const t1 = toP(centres[0])
    for (const p of paths(s, INK).filter((c) => Math.abs(c.points![0][0] - centres[0]) < 1.9)[0].points!) { const [x, y] = t1(p); expect(Math.abs(y - x * x)).toBeLessThan(0.05) }
    const flat = lines(s, VIOLET).find((o) => near(o.from![1], o.to![1]))!; expect(near(flat.from![1], 0, 0.01)).toBe(true)   // the tangent y = 0
    const lft = lines(s, RED)[0], rgt = lines(s, BLUE)[0]
    expect(slopeOf(lft)).toBeCloseTo(-1, 1); expect(slopeOf(rgt)).toBeCloseTo(1, 1)
    expect(near(lft.to![0], centres[1], 0.01) && near(rgt.from![0], centres[1], 0.01)).toBe(true)                        // they meet at the corner
    const t3 = toP(centres[2])
    for (const p of paths(s, INK).filter((c) => Math.abs(c.points![0][0] - centres[2]) < 1.9)[0].points!) { const [x, y] = t3(p); expect(Math.abs(y - Math.cbrt(x))).toBeLessThan(0.15) }
    const vt = lines(s, VIOLET).find((o) => near(o.from![0], o.to![0]))!; expect(near(vt.from![0], centres[2], 0.01)).toBe(true)  // vertical tangent
    expect(texts(s)).toEqual(expect.arrayContaining(['smooth', 'corner', 'vertical tangent', 'differentiable', 'slopes \u22121 and +1 differ', 'infinite slope']))
  })

  it('Increasing and decreasing: f′ = x² − 1 is positive on the green pieces (x < −1, x > 1) and negative on the red piece, with turning points at ±1', () => {
    const { u, oy } = M.INC
    expect(M.incFp(-1)).toBe(0); expect(M.incFp(1)).toBe(0); expect(M.incF(-1)).toBeCloseTo(2 / 3, 12); expect(M.incF(1)).toBeCloseTo(-2 / 3, 12)
    const s = M.buildIncreasingDecreasingScene()
    const toMath = back(u, 0, oy)
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - (x ** 3 / 3 - x))).toBeLessThan(0.1) }
    expect(paths(s, GREEN)).toHaveLength(2); expect(paths(s, RED)).toHaveLength(1)
    for (const c of paths(s, GREEN)) for (const p of c.points!.slice(1, -1)) { const [x] = toMath(p); expect(M.incFp(x)).toBeGreaterThan(-0.05) }     // f′ > 0 along green
    for (const p of paths(s, RED)[0].points!.slice(1, -1)) { const [x] = toMath(p); expect(M.incFp(x)).toBeLessThan(0.05) }                              // f′ < 0 along red
    // the green pieces really are increasing and the red piece really is decreasing in the drawn data
    for (const c of paths(s, GREEN)) { const ys = c.points!.map((p) => toMath(p)[1]); for (let i = 1; i < ys.length; i++) expect(ys[i]).toBeGreaterThan(ys[i - 1] - 0.02) }
    const ry = paths(s, RED)[0].points!.map((p) => toMath(p)[1]); for (let i = 1; i < ry.length; i++) expect(ry[i]).toBeLessThan(ry[i - 1] + 0.02)
    const turns = dots(s, VIOLET).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(turns).toHaveLength(2); expect(turns[0][0]).toBeCloseTo(-1, 1); expect(turns[1][0]).toBeCloseTo(1, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = x\u00B3/3 \u2212 x', 'increasing: f\u2032 > 0', 'decreasing: f\u2032 < 0']))
  })

  it('Local extrema: g′ = x³ − 2x is 0 at 0 and ±√2, the tangents drawn there are horizontal, g″ < 0 at the maximum and > 0 at the minima', () => {
    const { u, ox, oy } = M.EXT
    for (const x of [0, Math.SQRT2, -Math.SQRT2]) expect(M.extFp(x)).toBeCloseTo(0, 12)
    expect(M.extF(0)).toBe(0); expect(M.extF(Math.SQRT2)).toBeCloseTo(-1, 12); expect(M.extF(-Math.SQRT2)).toBeCloseTo(-1, 12)
    const g2 = (x: number) => 3 * x * x - 2
    expect(g2(0)).toBeLessThan(0); expect(g2(Math.SQRT2)).toBeGreaterThan(0); expect(g2(-Math.SQRT2)).toBeGreaterThan(0)
    const s = M.buildLocalExtremaScene()
    const toMath = back(u, ox, oy)
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - M.extF(x))).toBeLessThan(0.15) }
    const flats = lines(s, VIOLET).filter((o) => (o as Obj).thickness === 0.045)
    expect(flats).toHaveLength(3)
    for (const f of flats) expect(near(f.from![1], f.to![1], 0.01)).toBe(true)                            // horizontal: slope 0
    const mx = dots(s, RED).map((d) => toMath(d.position!)), mn = dots(s, BLUE).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(mx).toHaveLength(1); expect(mx[0][0]).toBeCloseTo(0, 1); expect(mx[0][1]).toBeCloseTo(0, 1)
    expect(mn).toHaveLength(2); expect(mn[0][0]).toBeCloseTo(-Math.SQRT2, 1); expect(mn[1][0]).toBeCloseTo(Math.SQRT2, 1); for (const m of mn) expect(m[1]).toBeCloseTo(-1, 1)
    for (const d of [...mx, ...mn]) expect(flats.some((f) => near(f.from![1], d[1] * u + oy, 0.02))).toBe(true)   // each extremum sits on a horizontal tangent
    // the maximum is above both neighbours and the minima below theirs
    expect(M.extF(0)).toBeGreaterThan(M.extF(0.3)); expect(M.extF(0)).toBeGreaterThan(M.extF(-0.3)); expect(M.extF(1.5)).toBeGreaterThan(M.extF(Math.SQRT2))
    expect(texts(s)).toEqual(expect.arrayContaining(['local max (0, 0)', 'local min', "g\u2032(x) = x\u00B3 \u2212 2x = 0"]))
  })

  it('Concavity: x³/6 is above its tangent at x = 1.5 (f″ > 0) and below its tangent at x = −1.5 (f″ < 0); the bending changes at the origin', () => {
    const { u, ox, oy, t } = M.CONC
    const f = M.concF, fp = M.concFp
    for (const x of [0, 0.5, 2, 3]) expect(f(x)).toBeGreaterThanOrEqual(f(t) + fp(t) * (x - t) - 1e-12)         // x > 0: curve on or above tangent at t
    for (const x of [0, -0.5, -2, -3]) expect(f(x)).toBeLessThanOrEqual(f(-t) + fp(-t) * (x - -t) + 1e-12)       // x < 0: on or below tangent at -t
    expect(Math.sign(t)).toBe(1); expect(Math.sign(-t)).toBe(-1)                                                  // f″(x) = x
    const s = M.buildConcavityScene()
    const toMath = back(u, ox, oy)
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - x ** 3 / 6)).toBeLessThan(0.1) }
    const up = lines(s, BLUE).find((o) => (o as Obj).thickness === 0.04)!, down = lines(s, RED).find((o) => (o as Obj).thickness === 0.04)!
    expect(slopeOf(up)).toBeCloseTo(fp(t), 1); expect(slopeOf(down)).toBeCloseTo(fp(-t), 1)                      // the drawn tangents have f′ slopes
    const du = dots(s, BLUE).map((d) => toMath(d.position!))[0], dd = dots(s, RED).map((d) => toMath(d.position!))[0]
    expect(du[0]).toBeCloseTo(t, 1); expect(du[1]).toBeCloseTo(f(t), 1); expect(dd[0]).toBeCloseTo(-t, 1); expect(dd[1]).toBeCloseTo(f(-t), 1)
    const infl = toMath(dots(s, GREEN)[0].position!); expect(infl[0]).toBeCloseTo(0, 1); expect(infl[1]).toBeCloseTo(0, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = x\u00B3/6', 'concave up: above the tangent', 'concave down: below the tangent', 'inflection point']))
  })

  it('Riemann sums: left sums for x²/4 on [0, 4] are 3.5 (n = 4) and 4.375 (n = 8), below the exact area 16/3, rising towards it; the drawn rectangles add up to those sums', () => {
    const { u, ox, oy, n1, n2 } = M.RIE
    expect(M.leftSum(n1)).toBeCloseTo(3.5, 12); expect(M.leftSum(n2)).toBeCloseTo(4.375, 12); expect(M.exactArea()).toBeCloseTo(16 / 3, 12)
    expect(M.leftSum(n1)).toBeLessThan(M.leftSum(n2)); expect(M.leftSum(n2)).toBeLessThan(M.exactArea())
    expect(Math.abs(M.leftSum(1000) - M.exactArea())).toBeLessThan(0.01)                                          // n → ∞ approaches the exact area
    const s = M.buildRiemannSumsScene()
    // area of the drawn rectangles: each rectangle has one horizontal top line; its width times its height above the axis
    const axisY = oy
    const area = (color: string, thickness: number) => lines(s, color).filter((o) => (o as Obj).thickness === thickness && near(o.from![1], o.to![1]))
      .reduce((sum, o) => sum + (len(o) / u) * ((o.from![1] - axisY) / u), 0)
    expect(area(BLUE, 0.04)).toBeCloseTo(M.leftSum(n1), 1)
    expect(area(GREEN, 0.025)).toBeCloseTo(M.leftSum(n2), 1)
    expect(lines(s, BLUE).filter((o) => (o as Obj).thickness === 0.04 && near(o.from![1], o.to![1]))).toHaveLength(n1)
    expect(lines(s, GREEN).filter((o) => (o as Obj).thickness === 0.025 && near(o.from![1], o.to![1]))).toHaveLength(n2)
    // each rectangle's top-left corner is ON the curve (left endpoint rule)
    const toMath = back(u, ox, oy)
    for (const o of lines(s, BLUE).filter((l) => (l as Obj).thickness === 0.04 && near(l.from![1], l.to![1]))) { const [x, y] = toMath(o.from!); expect(y).toBeCloseTo(x * x / 4, 1) }
    expect(texts(s)).toEqual(expect.arrayContaining(['n = 4: 3.5', 'n = 8: 4.375', 'exact area = 16/3 \u2248 5.33']))
  })
})
