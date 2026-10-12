/**
 * Mathematics visual campaign, batch 7 (2026-10-11): twelve single-variable calculus concepts, part 2.
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB7'

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
  ['math.calc.mean-value-theorem', M.buildMeanValueTheoremScene, 'math-mean-value-theorem'],
  ['math.calc.related-rates', M.buildRelatedRatesScene, 'math-related-rates'],
  ['math.calc.linearization', M.buildLinearizationScene, 'math-linearization'],
  ['math.calc.definite-integral', M.buildDefiniteIntegralScene, 'math-definite-integral'],
  ['math.calc.ftc-part1', M.buildFtcPart1Scene, 'math-ftc-part1'],
  ['math.calc.ftc-part2', M.buildFtcPart2Scene, 'math-ftc-part2'],
  ['math.calc.improper-integrals', M.buildImproperIntegralsScene, 'math-improper-integrals'],
  ['math.calc.integral-area', M.buildIntegralAreaScene, 'math-integral-area'],
  ['math.calc.arc-length', M.buildArcLengthScene, 'math-arc-length'],
  ['math.calc.taylor-series', M.buildTaylorSeriesScene, 'math-taylor-series'],
  ['math.calc.parametric-curves', M.buildParametricCurvesScene, 'math-parametric-curves'],
  ['math.calc.fourier-series-intro', M.buildFourierSeriesIntroScene, 'math-fourier-series-intro'],
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
const cross = (a: XY, b: XY) => a[0] * b[1] - a[1] * b[0]
/** Area a set of vertical hatch lines stands for: sum of (length / unit) x step. */
const hatched = (ls: Obj[], unitY: number, step: number) => ls.reduce((s, o) => s + (len(o) / unitY) * step, 0)
const hatchOf = (s: SceneSpec, color: string, thickness: number) => lines(s, color).filter((o) => (o as Obj).thickness === thickness && near(o.from![0], o.to![0]))
const midpointIntegral = (f: (x: number) => number, a: number, b: number, n = 4000) => { let s = 0; const dx = (b - a) / n; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * dx) * dx; return s }

describe('the mathematics each figure draws', () => {
  it('Mean value theorem: the secant through (1, 0.25) and (5, 6.25) has slope 1.5, and the tangent at c = 3 has slope f′(3) = 1.5, parallel to it', () => {
    const { u, ox, oy, a, b, c } = M.MVT
    const m = (M.mvtF(b) - M.mvtF(a)) / (b - a)
    expect(m).toBe(1.5); expect(M.mvtFp(c)).toBe(1.5); expect(c).toBeGreaterThan(a); expect(c).toBeLessThan(b)
    const s = M.buildMeanValueTheoremScene()
    const toMath = back(u, ox, oy)
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - x * x / 4)).toBeLessThan(0.1) }
    const secant = lines(s, BLUE).find((o) => (o as Obj).thickness === 0.04)!, tangent = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.05)!
    expect(slopeOf(secant)).toBeCloseTo(1.5, 1); expect(slopeOf(tangent)).toBeCloseTo(1.5, 1)
    expect(Math.abs(cross(dirOf(secant), dirOf(tangent))) / (len(secant) * len(tangent))).toBeLessThan(0.02)          // parallel
    const onSecant = (p: number[]) => Math.abs(cross(dirOf(secant), [p[0] - secant.from![0], p[1] - secant.from![1]])) / len(secant)
    for (const d of dots(s, RED)) expect(onSecant(d.position!)).toBeLessThan(0.03)                                    // both endpoints lie on the secant
    const dc = toMath(dots(s, GREEN)[0].position!); expect(dc[0]).toBeCloseTo(c, 1); expect(dc[1]).toBeCloseTo(M.mvtF(c), 1)
    const onTan = Math.abs(cross(dirOf(tangent), [dots(s, GREEN)[0].position![0] - tangent.from![0], dots(s, GREEN)[0].position![1] - tangent.from![1]])) / len(tangent)
    expect(onTan).toBeLessThan(0.03)                                                                                    // the point (c, f(c)) is on the tangent
    expect(texts(s)).toEqual(expect.arrayContaining(['a', 'b', 'c', 'average slope 1.5', 'f\u2032(c) = 1.5 at c = 3', 'parallel']))
  })

  it('Related rates: x² + y² = 25 for the drawn ladder, and differentiating gives dy/dt = −x/y · dx/dt = −3/4; the arrows have that ratio', () => {
    const { u, ox, oy, L, x, dxdt } = M.RELR
    const y = M.ladderY(x)
    expect(y).toBe(4); expect(x * x + y * y).toBe(L * L)
    expect(M.ladderDydt(x, dxdt)).toBe(-0.75)
    const h = 1e-6; expect((M.ladderY(x + h) - M.ladderY(x)) / h).toBeCloseTo(-0.75, 4)                                  // the derivative of y(x) = √(25 − x²) at 3
    const s = M.buildRelatedRatesScene()
    const ladder = lines(s, INK)[0]
    expect(len(ladder) / u).toBeCloseTo(5, 1)                                                                            // 5 long
    expect(near(ladder.from![0], x * u + ox, 0.02) && near(ladder.from![1], oy, 0.02)).toBe(true)                        // foot at (3, 0)
    expect(near(ladder.to![0], ox, 0.02) && near(ladder.to![1], y * u + oy, 0.02)).toBe(true)                            // top at (0, 4)
    expect(len(lines(s, BLUE)[0]) / u).toBeCloseTo(3, 1); expect(len(lines(s, RED)[0]) / u).toBeCloseTo(4, 1)           // legs x and y
    const arr = lines(s).filter((o) => o.type === 'arrow')
    const dx = arr.find((o) => o.color === VIOLET)!, dy = arr.find((o) => o.color === GREEN)!
    expect(dirOf(dx)[0]).toBeGreaterThan(0); expect(dirOf(dy)[1]).toBeLessThan(0)                                         // foot moves out, top moves down
    expect(len(dy) / len(dx)).toBeCloseTo(0.75, 1)                                                                       // |dy/dt| : dx/dt = 3 : 4
    expect(texts(s)).toEqual(expect.arrayContaining(['x = 3', 'y = 4', 'x\u00B2 + y\u00B2 = 25', 'dx/dt = 1', 'x dx/dt + y dy/dt = 0', 'dy/dt = \u22123/4', '3 \u00B7 1 + 4 \u00B7 dy/dt = 0']))
  })

  it('Linearization: L(x) = 2 + (x − 4)/4 is the tangent of √x at 4, accurate near 4 (error 0.002) and poor far away (error 0.25)', () => {
    const { u, ox, oy, a, near: nr, far } = M.LINR
    expect(M.linF(a)).toBe(2); expect(M.linL(a)).toBe(2)
    const h = 1e-7; expect((M.linF(a + h) - M.linF(a)) / h).toBeCloseTo(0.25, 5)                                         // f′(4) = 1/4
    expect(Math.abs(M.linF(nr) - M.linL(nr))).toBeCloseTo(0.0024, 3); expect(Math.abs(M.linF(far) - M.linL(far))).toBeCloseTo(0.25, 12)
    expect(Math.abs(M.linF(nr) - M.linL(nr))).toBeLessThan(Math.abs(M.linF(far) - M.linL(far)) / 50)
    const s = M.buildLinearizationScene()
    const toMath = back(u, ox, oy)
    const tan = lines(s, VIOLET)[0]; expect(slopeOf(tan)).toBeCloseTo(0.25, 2)
    for (const p of [tan.from!, tan.to!]) { const [x, y] = toMath(p); expect(y).toBeCloseTo(M.linL(x), 1) }
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(y).toBeCloseTo(Math.sqrt(x), 1) }
    const on = dots(s, BLUE).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0]), approx = dots(s, RED).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(on).toHaveLength(2); expect(approx).toHaveLength(2)
    expect(on[0][0]).toBeCloseTo(far, 1); expect(on[1][0]).toBeCloseTo(nr, 1)
    expect(on[0][1]).toBeCloseTo(1, 1); expect(approx[0][1]).toBeCloseTo(1.25, 1)                                        // at x = 1: curve 1, tangent 1.25
    expect(texts(s)).toEqual(expect.arrayContaining(['L(x) = 2 + (x \u2212 4)/4', 'x = 4.4: error 0.002', 'x = 1: error 0.25']))
  })

  it('Definite integral: the three shaded regions of (x − 1)(x − 3) have areas +4/3, −4/3, +4/3 and total 4/3', () => {
    const { u, step } = M.DEFI
    const F = M.defiAntiderivative
    expect([F(1) - F(0), F(3) - F(1), F(4) - F(3)].map((v) => Math.round(v * 1e9) / 1e9)).toEqual([4 / 3, -4 / 3, 4 / 3].map((v) => Math.round(v * 1e9) / 1e9))
    expect(F(4) - F(0)).toBeCloseTo(4 / 3, 12)
    expect(midpointIntegral(M.defiF, 0, 4)).toBeCloseTo(4 / 3, 6)
    const s = M.buildDefiniteIntegralScene()
    const green = hatchOf(s, GREEN, 0.022), red = hatchOf(s, RED, 0.022)
    const aGreen = hatched(green, u, step), aRed = hatched(red, u, step)
    expect(aGreen).toBeCloseTo(8 / 3, 1); expect(aRed).toBeCloseTo(4 / 3, 1)                                              // two positive regions, one negative
    // the red hatch lines hang BELOW the axis and the green ones stand ABOVE it
    for (const o of red) expect(Math.max(o.from![1], o.to![1])).toBeLessThanOrEqual(0.001)
    for (const o of green) expect(Math.min(o.from![1], o.to![1])).toBeGreaterThanOrEqual(-0.001)
    expect(aGreen - aRed).toBeCloseTo(4 / 3, 1)                                                                          // signed total
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = (x \u2212 1)(x \u2212 3)', '+4/3', '\u22124/3', '\u222B\u2080\u2074 f = 4/3 \u2212 4/3 + 4/3 = 4/3']))
  })

  it('FTC part 1: the shaded area under t/2 up to 3 is A(3) = 2.25, the curve A(x) = x²/4 goes through it, and its slope at 3 equals f(3) = 1.5', () => {
    const { u, ox, topOy, botOy, x, step } = M.FTC1
    expect(M.ftcA(x)).toBe(2.25); expect(M.ftcF(x)).toBe(1.5)
    const h = 1e-6; expect((M.ftcA(x + h) - M.ftcA(x)) / h).toBeCloseTo(M.ftcF(x), 4)                                   // A′ = f
    for (const t of [0.5, 1.7, 3, 4.2]) expect(midpointIntegral(M.ftcF, 0, t)).toBeCloseTo(M.ftcA(t), 6)                // A is the area function
    const s = M.buildFtcPart1Scene()
    expect(hatched(hatchOf(s, BLUE, 0.022), u, step)).toBeCloseTo(2.25, 1)
    const toBottom = back(u, ox, botOy)
    for (const p of paths(s, GREEN)[0].points!) { const [t, y] = toBottom(p); expect(Math.abs(y - t * t / 4)).toBeLessThan(0.1) }
    const d = toBottom(dots(s, GREEN)[0].position!); expect(d[0]).toBeCloseTo(3, 1); expect(d[1]).toBeCloseTo(2.25, 1)
    const tan = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.05)!; expect(slopeOf(tan)).toBeCloseTo(1.5, 1)   // slope of A at 3 (equal axes scales)
    const hF = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.07)!; expect(len(hF) / u).toBeCloseTo(1.5, 1)       // the height of f at 3
    expect(len(hF) / u).toBeCloseTo(slopeOf(tan), 1)                                                                      // slope of A = height of f
    expect(topOy).toBeGreaterThan(botOy)
    expect(texts(s)).toEqual(expect.arrayContaining(['f(t) = t/2', 'A(3) = 2.25', 'A(x) = x\u00B2/4', 'A\u2032(3) = f(3) = 1.5']))
  })

  it('FTC part 2: the area under y = x from 1 to 3 is 4 = F(3) − F(1) with F = x²/2 (4.5 − 0.5)', () => {
    const { u, centres, oy, a, b, step } = M.FTC2
    expect(M.ftc2F(b) - M.ftc2F(a)).toBe(4); expect(midpointIntegral(M.ftc2f, a, b)).toBeCloseTo(4, 9)
    expect(M.ftc2F(a)).toBe(0.5); expect(M.ftc2F(b)).toBe(4.5)
    const h = 1e-6; for (const t of [1, 2, 3]) expect((M.ftc2F(t + h) - M.ftc2F(t)) / h).toBeCloseTo(M.ftc2f(t), 4)           // F′ = f
    const s = M.buildFtcPart2Scene()
    expect(hatched(hatchOf(s, BLUE, 0.022), u, step)).toBeCloseTo(4, 1)                                                    // drawn area = 4
    const toRight = (p: number[]): XY => [(p[0] - centres[1]) / u + 2, (p[1] - oy) / u]
    const heights = dots(s, GREEN).map((d) => toRight(d.position!)).sort((p, q) => p[0] - q[0])
    expect(heights).toHaveLength(2)
    expect(heights[0][1]).toBeCloseTo(0.5, 1); expect(heights[1][1]).toBeCloseTo(4.5, 1)
    const gap = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.07)!; expect(len(gap) / u).toBeCloseTo(4, 1)       // F(3) − F(1) drawn as a length
    expect(texts(s)).toEqual(expect.arrayContaining(['f(x) = x', 'area = 4', 'F(x) = x\u00B2/2', 'F(3) \u2212 F(1) = 4.5 \u2212 0.5 = 4']))
  })

  it('Improper integral: the area under 1/x² from 1 to R is 1 − 1/R (0.5, 0.667, 0.833 for R = 2, 3, 6) and tends to 1', () => {
    const { u, yStretch, step, rs } = M.IMPI
    rs.forEach((r, i) => expect(M.impArea(r)).toBeCloseTo([0.5, 2 / 3, 5 / 6][i], 12)); expect(M.impArea(1e9)).toBeCloseTo(1, 8)
    for (const r of rs) expect(midpointIntegral(M.impF, 1, r)).toBeCloseTo(1 - 1 / r, 6)
    expect(midpointIntegral(M.impF, 1, 1e4, 2e6)).toBeCloseTo(1, 3)
    const s = M.buildImproperIntegralsScene()
    const parts = [GREEN, BLUE, VIOLET].map((c) => hatched(hatchOf(s, c, 0.022), u * yStretch, step))
    expect(parts[0]).toBeCloseTo(0.5, 1); expect(parts[0] + parts[1]).toBeCloseTo(2 / 3, 1); expect(parts[0] + parts[1] + parts[2]).toBeCloseTo(5 / 6, 1)   // cumulative areas
    expect(parts[0] + parts[1] + parts[2]).toBeLessThan(1)                                                                  // never reaches 1
    expect(texts(s)).toEqual(expect.arrayContaining(['1 to 2: area 0.5', '1 to 3: area 0.667', '1 to 6: area 0.833', 'area up to R = 1 \u2212 1/R \u2192 1']))
  })

  it('Area between curves: the strips of height x − x² between the crossings (0, 0) and (1, 1) add up to 1/6', () => {
    const { u, ox, oy, step } = M.BETW
    expect(M.betTop(0)).toBe(M.betBottom(0)); expect(M.betTop(1)).toBe(M.betBottom(1))
    expect(midpointIntegral((x) => M.betTop(x) - M.betBottom(x), 0, 1)).toBeCloseTo(1 / 6, 7); expect(1 / 2 - 1 / 3).toBeCloseTo(1 / 6, 12)
    const s = M.buildIntegralAreaScene()
    const strips = hatchOf(s, GREEN, 0.035)
    expect(strips).toHaveLength(10)
    expect(hatched(strips, u, step)).toBeCloseTo(1 / 6, 2)
    const toMath = back(u, ox, oy)
    for (const o of strips) { const [x, y0] = toMath(o.from!), [, y1] = toMath(o.to!); expect(Math.abs(Math.min(y0, y1) - x * x)).toBeLessThan(0.03); expect(Math.abs(Math.max(y0, y1) - x)).toBeLessThan(0.03) }   // each strip runs from the parabola up to the line
    const cr = dots(s, GREEN).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(cr[0][0]).toBeCloseTo(0, 1); expect(cr[1][0]).toBeCloseTo(1, 1); expect(cr[1][1]).toBeCloseTo(1, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['y = x', 'y = x\u00B2', 'strip height = x \u2212 x\u00B2', 'area = \u222B\u2080\u00B9 (x \u2212 x\u00B2) dx = 1/2 \u2212 1/3 = 1/6']))
  })

  it('Arc length: the drawn chords total 5.84, 5.90, 5.91 for n = 2, 4, 8, each below the exact length 5.9157 and rising towards it', () => {
    const { u, ox, oy, ns } = M.ARC
    expect(M.exactArcLength()).toBeCloseTo(midpointIntegral((x) => Math.sqrt(1 + (x / 2) ** 2), 0, 4), 6)                    // = ∫ √(1 + f′²) dx
    expect(ns.map((n) => Math.round(M.chordLength(n) * 100) / 100)).toEqual([5.84, 5.9, 5.91])
    for (let i = 1; i < ns.length; i++) expect(M.chordLength(ns[i])).toBeGreaterThan(M.chordLength(ns[i - 1]))
    for (const n of ns) expect(M.chordLength(n)).toBeLessThan(M.exactArcLength())
    expect(M.exactArcLength() - M.chordLength(1000)).toBeLessThan(1e-4)
    const s = M.buildArcLengthScene()
    const toMath = back(u, ox, oy)
    const total = (color: string, t: number) => lines(s, color).filter((o) => (o as Obj).thickness === t).reduce((sum, o) => sum + len(o) / u, 0)
    expect(total(RED, 0.05)).toBeCloseTo(M.chordLength(ns[0]), 1); expect(total(BLUE, 0.04)).toBeCloseTo(M.chordLength(ns[1]), 1); expect(total(GREEN, 0.03)).toBeCloseTo(M.chordLength(ns[2]), 1)
    for (const o of lines(s, GREEN).filter((l) => (l as Obj).thickness === 0.03)) for (const p of [o.from!, o.to!]) { const [x, y] = toMath(p); expect(Math.abs(y - x * x / 4)).toBeLessThan(0.05) }   // chord ends are ON the curve
    expect(texts(s)).toEqual(expect.arrayContaining(['2 chords: 5.84', '4 chords: 5.90', '8 chords: 5.91', 'exact length \u2248 5.92']))
  })

  it('Taylor series: each added term of sin x ≈ x − x³/6 + x⁵/120 is a better fit, and the drawn curves are those polynomials', () => {
    const { u, ox, oy } = M.TAY
    for (const x of [0.5, 1, 2, 3]) { const e = (d: 1 | 3 | 5) => Math.abs(Math.sin(x) - M.taylorSin(x, d)); expect(e(3)).toBeLessThan(e(1)); expect(e(5)).toBeLessThan(e(3)) }
    expect(M.taylorSin(1, 3)).toBeCloseTo(1 - 1 / 6, 12); expect(M.taylorSin(1, 5)).toBeCloseTo(1 - 1 / 6 + 1 / 120, 12)
    const s = M.buildTaylorSeriesScene()
    const toMath = back(u, ox, oy)
    const curveWith = (color: string, f: (x: number) => number, tol: number) => { const c = paths(s, color)[0]; expect(c, color).toBeDefined(); for (const p of c.points!) { const [x, y] = toMath(p); expect(Math.abs(y - f(x))).toBeLessThan(tol) } }
    curveWith(INK, Math.sin, 0.08); curveWith(RED, (x) => M.taylorSin(x, 1), 0.08); curveWith(BLUE, (x) => M.taylorSin(x, 3), 0.1); curveWith(GREEN, (x) => M.taylorSin(x, 5), 0.1)
    // the degree-5 curve follows sin x over a longer stretch than the degree-3 one
    const reach = (d: 1 | 3 | 5) => { let x = 0; while (Math.abs(Math.sin(x) - M.taylorSin(x, d)) < 0.1) x += 0.01; return x }
    expect(reach(3)).toBeGreaterThan(reach(1)); expect(reach(5)).toBeGreaterThan(reach(3))
    expect(texts(s)).toEqual(expect.arrayContaining(['sin x', 'x', 'x \u2212 x\u00B3/6', 'x \u2212 x\u00B3/6 + x\u2075/120']))
  })

  it('Parametric curves: every drawn point satisfies x²/9 + y²/4 = 1; the four marked points are t = 0, π/2, π, 3π/2; the direction is counter-clockwise', () => {
    const { u } = M.PARAM
    const s = M.buildParametricCurvesScene()
    const body = paths(s, INK)[0].points!
    for (const p of body) { const [x, y] = [p[0] / u, p[1] / u]; expect(Math.abs(x * x / 9 + y * y / 4 - 1)).toBeLessThan(0.02) }
    const marks = dots(s, GREEN).map((d) => [d.position![0] / u, d.position![1] / u] as XY)
    expect(marks).toHaveLength(4)
    for (const t of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) { const [x, y] = M.paramPoint(t); expect(marks.some((m) => near(m[0], x, 0.03) && near(m[1], y, 0.03)), `t=${t}`).toBe(true) }
    expect(M.paramPoint(0)[0]).toBeCloseTo(3, 12); expect(M.paramPoint(Math.PI / 2)[1]).toBeCloseTo(2, 12)
    expect(Math.cos(0.7) ** 2 + Math.sin(0.7) ** 2).toBeCloseTo(1, 12)                                                // eliminating t
    const arrow = lines(s, VIOLET).find((o) => o.type === 'arrow')!
    const [x1, y1] = [arrow.from![0] / u, arrow.from![1] / u]
    expect(x1 * dirOf(arrow)[1] - y1 * dirOf(arrow)[0]).toBeGreaterThan(0)                                              // angular momentum > 0: counter-clockwise
    expect(texts(s)).toEqual(expect.arrayContaining(['t = 0', 't = \u03C0/2', 't = \u03C0', 't = 3\u03C0/2', 'x = 3 cos t, y = 2 sin t', 'x\u00B2/9 + y\u00B2/4 = 1']))
  })

  it('Fourier series: the drawn sums are (4/π) Σ sin(kx)/k over odd k, and three terms are closer to the square wave than one', () => {
    const { u } = M.FOUR
    expect(M.fourierPartial(Math.PI / 2, 1)).toBeCloseTo(4 / Math.PI, 12)
    expect(M.fourierPartial(Math.PI / 2, 5)).toBeCloseTo((4 / Math.PI) * (1 - 1 / 3 + 1 / 5), 12)
    const err = (n: number) => { let e = 0; for (let x = 0.2; x < Math.PI - 0.2; x += 0.05) e += (M.fourierPartial(x, n) - M.squareWave(x)) ** 2; return e }
    expect(err(5)).toBeLessThan(err(1)); expect(err(1000)).toBeLessThan(err(5))                                          // more terms: closer
    expect(M.squareWave(1)).toBe(1); expect(M.squareWave(-1)).toBe(-1)
    const s = M.buildFourierSeriesIntroScene()
    const toMath = (p: number[]): XY => [p[0] / u, p[1] / (1.6 * u)]
    for (const [color, n] of [[RED, 1], [GREEN, 5]] as const) { const c = paths(s, color)[0]; expect(c, color).toBeDefined(); for (const p of c.points!) { const [x, y] = toMath(p); expect(Math.abs(y - M.fourierPartial(x, n))).toBeLessThan(0.05) } }
    const wave = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06)
    expect(wave).toHaveLength(2); expect(toMath(wave[0].from!)[1]).toBeCloseTo(-1, 2); expect(toMath(wave[1].from!)[1]).toBeCloseTo(1, 2)     // −1 on the left, +1 on the right
    expect(texts(s)).toEqual(expect.arrayContaining(['square wave', '(4/\u03C0) sin x', 'first three odd terms']))
  })
})
