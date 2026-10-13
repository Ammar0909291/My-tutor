/**
 * Mathematics visual campaign, batch 5 (2026-10-11): twelve trigonometry and algebra concepts.
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
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB5'

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
  ['math.trig.trig-functions', M.buildTrigFunctionsScene, 'math-trig-functions'],
  ['math.trig.pythagorean-identities', M.buildPythagoreanIdentitiesScene, 'math-pythagorean-identities'],
  ['math.trig.law-of-sines', M.buildLawOfSinesScene, 'math-law-of-sines'],
  ['math.trig.law-of-cosines', M.buildLawOfCosinesScene, 'math-law-of-cosines'],
  ['math.trig.eulers-formula', M.buildEulersFormulaScene, 'math-eulers-formula'],
  ['math.alg.completing-the-square', M.buildCompletingTheSquareScene, 'math-completing-the-square'],
  ['math.alg.discriminant', M.buildDiscriminantScene, 'math-discriminant'],
  ['math.alg.remainder-theorem', M.buildRemainderTheoremScene, 'math-remainder-theorem'],
  ['math.alg.factor-theorem', M.buildFactorTheoremScene, 'math-factor-theorem'],
  ['math.alg.polynomial-inequality', M.buildPolynomialInequalityScene, 'math-polynomial-inequality'],
  ['math.alg.rational-expressions', M.buildRationalExpressionsScene, 'math-rational-expressions'],
  ['math.alg.inequality', M.buildInequalityScene, 'math-inequality'],
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
const dist = (a: XY, b: XY) => Math.hypot(b[0] - a[0], b[1] - a[1])
const angleAt = (v: XY, a: XY, b: XY) => {
  const p = [a[0] - v[0], a[1] - v[1]], q = [b[0] - v[0], b[1] - v[1]]
  return (Math.acos((p[0] * q[0] + p[1] * q[1]) / (Math.hypot(p[0], p[1]) * Math.hypot(q[0], q[1]))) * 180) / Math.PI
}
const centreOfRing = (o: Obj): XY => [o.points!.reduce((s, p) => s + p[0], 0) / o.points!.length, o.points!.reduce((s, p) => s + p[1], 0) / o.points!.length]
const rad = (d: number) => (d * Math.PI) / 180

describe('the mathematics each figure draws', () => {
  it('Trigonometric functions: the circle has radius R, P is on it at 50°, the legs are R·cos and R·sin, and tan is the height on the tangent line', () => {
    const { R, cx, cy, deg } = M.TRIG
    const { cos, sin, tan } = M.trigValues(deg)
    expect(cos ** 2 + sin ** 2).toBeCloseTo(1, 12); expect(tan).toBeCloseTo(sin / cos, 12)
    const s = M.buildTrigFunctionsScene()
    const ring = paths(s, INK).find((p) => p.points!.length > 50)!.points!
    for (const p of ring) expect(Math.hypot(p[0] - cx, p[1] - cy)).toBeCloseTo(R, 1)
    const P = dots(s, GREEN)[0].position!
    expect(Math.hypot(P[0] - cx, P[1] - cy)).toBeCloseTo(R, 1)
    expect(Math.atan2(P[1] - cy, P[0] - cx) * 180 / Math.PI).toBeCloseTo(deg, 0)
    const red = lines(s, RED)[0], blue = lines(s, BLUE)[0]
    expect(len(red)).toBeCloseTo(R * cos, 1); expect(len(blue)).toBeCloseTo(R * sin, 1)             // cos leg, sin leg
    expect(near(blue.from![0], red.to![0], 0.02)).toBe(true)                                         // the sin leg stands on the end of the cos leg
    const tanSeg = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.07)!
    expect(near(tanSeg.from![0], cx + R, 0.01)).toBe(true); expect(len(tanSeg)).toBeCloseTo(R * tan, 1)
    const T = [tanSeg.to![0], tanSeg.to![1]]
    expect(Math.abs((T[0] - cx) * (P[1] - cy) - (T[1] - cy) * (P[0] - cx))).toBeLessThan(0.05)       // centre, P and T are collinear
    expect(texts(s)).toEqual(expect.arrayContaining(['\u03B8 = 50\u00B0', 'cos \u03B8 = 0.64', 'sin \u03B8 = 0.77', 'tan \u03B8 = 1.19', 'P (cos \u03B8, sin \u03B8)']))
  })

  it('Pythagorean identities: 0.8² + 0.6² = 1, 1 + 0.75² = 1.25², and the drawn triangles have those sides', () => {
    const { R, cx, cy, cos, sin } = M.PYID
    expect(cos ** 2 + sin ** 2).toBeCloseTo(1, 12)
    const tan = sin / cos, sec = 1 / cos
    expect(1 + tan ** 2).toBeCloseTo(sec ** 2, 12); expect(tan).toBeCloseTo(0.75, 12); expect(sec).toBeCloseTo(1.25, 12)
    expect(0.36 + 0.64).toBeCloseTo(1, 12); expect(1 + 0.5625).toBeCloseTo(1.25 ** 2, 12)
    const s = M.buildPythagoreanIdentitiesScene()
    const red = lines(s, RED)[0], blue = lines(s, BLUE)[0]
    expect(len(red)).toBeCloseTo(R * cos, 1); expect(len(blue)).toBeCloseTo(R * sin, 1)
    expect(Math.hypot(len(red), len(blue))).toBeCloseTo(R, 1)                                        // legs and radius: Pythagoras
    const P = dots(s, GREEN)[0].position!
    expect(Math.hypot(P[0] - cx, P[1] - cy)).toBeCloseTo(R, 1)
    const big = lines(s, VIOLET).filter((o) => (o as Obj).thickness === 0.07)
    const vertical = big.find((o) => near(o.from![0], o.to![0]))!, base = big.find((o) => near(o.from![1], o.to![1]))!
    expect(len(vertical)).toBeCloseTo(R * tan, 1)                                                    // opposite = tan θ (adjacent scaled to 1)
    expect(near(vertical.from![0], cx + R, 0.01)).toBe(true)
    const hyp = lines(s, VIOLET).find((o) => (o as Obj).thickness === 0.035)!
    const T = hyp.to!
    expect(Math.hypot(T[0] - cx, T[1] - cy)).toBeCloseTo(R * sec, 1)                                 // hypotenuse = sec θ
    expect(Math.hypot(R, R * tan)).toBeCloseTo(R * sec, 9)
    expect(near(base.to![0], cx + R, 0.01)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['cos \u03B8 = 0.8', 'sin \u03B8 = 0.6', 'tan \u03B8 = 0.75', 'sec \u03B8 = 1.25', 'sin\u00B2\u03B8 + cos\u00B2\u03B8 = 0.36 + 0.64 = 1', '1 + tan\u00B2\u03B8 = sec\u00B2\u03B8']))
  })

  it('Law of sines: the triangle has angles 40°, 60°, 80°, its corners lie on a circle of radius R, and side ÷ sin(opposite angle) = 2R for all three', () => {
    const { R, cy, angles, units } = M.LOS
    const V = M.losVertices()
    for (const v of [V.A, V.B, V.C]) expect(Math.hypot(v[0], v[1] - cy)).toBeCloseTo(R, 9)           // inscribed in the circle
    expect(angleAt(V.A, V.B, V.C)).toBeCloseTo(angles.A, 6); expect(angleAt(V.B, V.A, V.C)).toBeCloseTo(angles.B, 6); expect(angleAt(V.C, V.A, V.B)).toBeCloseTo(angles.C, 6)
    const k = units / R
    const a = dist(V.B, V.C) * k, b = dist(V.C, V.A) * k, c = dist(V.A, V.B) * k
    expect(a / Math.sin(rad(angles.A))).toBeCloseTo(2 * units, 9)
    expect(b / Math.sin(rad(angles.B))).toBeCloseTo(2 * units, 9)
    expect(c / Math.sin(rad(angles.C))).toBeCloseTo(2 * units, 9)
    expect([a, b, c].map((v) => Math.round(v * 100) / 100)).toEqual([6.43, 8.66, 9.85])
    const s = M.buildLawOfSinesScene()
    // the drawn ink triangle is that triangle
    const tri = lines(s, INK).filter((o) => (o as Obj).thickness === 0.06)
    expect(tri).toHaveLength(3)
    const drawn = tri.map((o) => len(o) * k).sort((p, q) => p - q)
    expect(drawn[0]).toBeCloseTo(a, 1); expect(drawn[1]).toBeCloseTo(b, 1); expect(drawn[2]).toBeCloseTo(c, 1)
    const ring = paths(s, GREEN).find((p) => p.points!.length > 50)!.points!
    for (const p of ring) expect(Math.hypot(p[0], p[1] - cy)).toBeCloseTo(R, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['40\u00B0', '60\u00B0', '80\u00B0', 'a \u00F7 sin A = 10', 'b \u00F7 sin B = 10', 'c \u00F7 sin C = 10', '= 2R = 10']))
  })

  it('Law of cosines: c² = a² + b² − 2ab cos C = 31 for a = 5, b = 6, C = 60°, against 61 for a right angle; the drawn triangle has those sides and angle', () => {
    const { u, ox, oy, a, b, C } = M.LOC
    expect(M.lawOfCosinesC2(a, b, C)).toBeCloseTo(31, 9); expect(M.lawOfCosinesC2(a, b, 90)).toBeCloseTo(61, 9)
    expect(Math.sqrt(31)).toBeCloseTo(5.5678, 3); expect(2 * a * b * Math.cos(rad(C))).toBeCloseTo(30, 9)
    const s = M.buildLawOfCosinesScene()
    const toMath = back(u, ox, oy)
    const sides = lines(s).filter((o) => (o as Obj).thickness === 0.06)
    expect(sides).toHaveLength(3)
    const ink = sides.filter((o) => o.color === INK), blue = sides.find((o) => o.color === BLUE)!
    const lengths = ink.map((o) => len(o) / u).sort((p, q) => p - q)
    expect(lengths[0]).toBeCloseTo(5, 1); expect(lengths[1]).toBeCloseTo(6, 1)
    expect(len(blue) / u).toBeCloseTo(Math.sqrt(31), 1)                                              // the third side is √31
    const Cp = toMath([ox, oy, 0]) as XY
    expect(Cp[0]).toBeCloseTo(0, 6)
    const [bx, ax] = [ink.find((o) => near(o.to![1], oy, 0.01))!, ink.find((o) => !near(o.to![1], oy, 0.01))!]
    expect(angleAt([ox, oy], bx.to!.slice(0, 2) as XY, ax.to!.slice(0, 2) as XY)).toBeCloseTo(C, 0)   // the angle at C
    const ref = lines(s, SLATE).filter((o) => (o as Obj).thickness === 0.03 && len(o) > 1)
    expect(ref).toHaveLength(2)
    expect(Math.max(...ref.map((o) => len(o) / u))).toBeCloseTo(Math.sqrt(61), 1)                    // the 90° case: hypotenuse √61
    expect(texts(s)).toEqual(expect.arrayContaining(['a = 5', 'b = 6', 'C = 60\u00B0', 'if C = 90\u00B0: c\u00B2 = 61', 'c\u00B2 = a\u00B2 + b\u00B2 \u2212 2ab cos C = 31', 'c \u2248 5.57']))
  })

  it("Euler's formula: e^(iθ) = cos θ + i sin θ is the point on the unit circle at θ, and e^(iπ) = −1 so e^(iπ) + 1 = 0", () => {
    const { R, cx, cy, deg } = M.EULER
    expect(Math.cos(Math.PI)).toBe(-1); expect(Math.sin(Math.PI)).toBeCloseTo(0, 12)
    expect(Math.cos(Math.PI) + 1).toBe(0)
    const s = M.buildEulersFormulaScene()
    const dd = dots(s, GREEN)
    expect(dd).toHaveLength(2)
    const p = dd.find((d) => d.radius === 0.15)!.position!, minusOne = dd.find((d) => d.radius === 0.17)!.position!
    expect(p[0]).toBeCloseTo(cx + R * Math.cos(rad(deg)), 1); expect(p[1]).toBeCloseTo(cy + R * Math.sin(rad(deg)), 1)   // cos θ + i sin θ
    expect(minusOne[0]).toBeCloseTo(cx - R, 1); expect(minusOne[1]).toBeCloseTo(cy, 1)                                    // the point −1
    expect(len(lines(s, RED)[0])).toBeCloseTo(R * Math.cos(rad(deg)), 1); expect(len(lines(s, BLUE)[0])).toBeCloseTo(R * Math.sin(rad(deg)), 1)
    const half = paths(s, VIOLET).find((q) => q.points!.length > 30)!.points!
    const a0 = Math.atan2(half[0][1] - cy, half[0][0] - cx), a1 = Math.atan2(half[half.length - 1][1] - cy, half[half.length - 1][0] - cx)
    expect(Math.abs(a1 - a0)).toBeCloseTo(Math.PI, 1)                                                // the arc is half a turn: θ = π
    expect(texts(s)).toEqual(expect.arrayContaining(['e^(i\u03B8)', 'e^(i\u03B8) = cos \u03B8 + i sin \u03B8', 'e^(i\u03C0) = \u22121', 'e^(i\u03C0) + 1 = 0']))
  })

  it('Completing the square: x² (16) + 3x (12) + 3x (12) + 9 = 49 = (x + 3)², with the four rectangles tiling a (x + 3) square', () => {
    const { u, x, h } = M.CTS
    expect(x * x + 2 * h * x + h * h).toBe((x + h) ** 2); expect(x * x + 6 * x).toBe((x + 3) ** 2 - 9)
    for (const t of [-5, -1, 0, 2.5, 7]) expect(t * t + 6 * t + 9).toBeCloseTo((t + 3) ** 2, 9)
    const s = M.buildCompletingTheSquareScene()
    // group the outline segments (thickness 0.04) into the four rectangles by colour and read their bounding boxes
    const box = (segs: Obj[]) => {
      const xs = segs.flatMap((o) => [o.from![0], o.to![0]]), ys = segs.flatMap((o) => [o.from![1], o.to![1]])
      return { w: (Math.max(...xs) - Math.min(...xs)) / u, h: (Math.max(...ys) - Math.min(...ys)) / u, x0: Math.min(...xs), y0: Math.min(...ys) }
    }
    const outline = (color: string) => lines(s, color).filter((o) => (o as Obj).thickness === 0.04)
    const blue = box(outline(BLUE)), aid = box(outline(VIOLET))
    expect(blue.w).toBeCloseTo(x, 1); expect(blue.h).toBeCloseTo(x, 1)                                // the x by x square
    expect(aid.w).toBeCloseTo(h, 1); expect(aid.h).toBeCloseTo(h, 1)                                  // the 3 by 3 corner
    const reds = outline(RED)
    expect(reds).toHaveLength(8)                                                                      // two strips, four sides each
    const strips = [box(reds.slice(0, 4)), box(reds.slice(4))]
    const dims = strips.map((b) => [Math.round(b.w * 10) / 10, Math.round(b.h * 10) / 10].sort())
    for (const d of dims) expect(d).toEqual([3, 4])                                                   // each strip is 3 by x
    const area = blue.w * blue.h + strips[0].w * strips[0].h + strips[1].w * strips[1].h + aid.w * aid.h
    expect(area).toBeCloseTo((x + h) ** 2, 1)                                                         // the pieces total (x + 3)²
    // together the pieces span a square of side x + 3
    const allX = [blue.x0, blue.x0 + blue.w * u, aid.x0 + aid.w * u], allY = [blue.y0, aid.y0 + aid.h * u]
    expect((Math.max(...allX) - Math.min(...allX)) / u).toBeCloseTo(x + h, 1); expect((Math.max(...allY) - Math.min(...allY)) / u).toBeCloseTo(x + h, 1)
    expect(texts(s)).toEqual(expect.arrayContaining(['x\u00B2 + 6x + 9 = (x + 3)\u00B2', 'x\u00B2 + 6x = (x + 3)\u00B2 \u2212 9']))
  })

  it('Discriminant: b² − 4ac is 16, 0, −12 for c = −3, 1, 4, and the drawn curves meet the x-axis twice, once (touching) and never', () => {
    const { u, ox, oy, a, b, cs } = M.DISC
    expect(cs.map((c) => M.discriminant(a, b, c))).toEqual([16, 0, -12])
    const s = M.buildDiscriminantScene()
    const toMath = back(u, ox, oy)
    const curves = [paths(s, BLUE)[0], paths(s, GREEN)[0], paths(s, RED)[0]].map((p) => p.points!.map((q) => toMath(q)))
    curves.forEach((pts, i) => { for (const [x, y] of pts) expect(Math.abs(y - (x * x - 2 * x + cs[i]))).toBeLessThan(0.15) })   // coordinates are rounded to 0.01 on a steep curve
    const crossings = (pts: XY[]) => { let n = 0; for (let i = 1; i < pts.length; i++) if (pts[i - 1][1] * pts[i][1] < 0) n++; return n }
    expect(crossings(curves[0])).toBe(2)                                                              // two real roots
    expect(crossings(curves[1])).toBe(0); expect(Math.min(...curves[1].map((p) => p[1]))).toBeLessThan(0.05); expect(Math.min(...curves[1].map((p) => p[1]))).toBeGreaterThan(-1e-6)   // touches
    expect(Math.min(...curves[2].map((p) => p[1]))).toBeGreaterThan(2)                                // stays above the axis
    const roots = dots(s, GREEN).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(roots.map(([x, y]) => [Math.round(x), Math.round(y)])).toEqual([[-1, 0], [1, 0], [3, 0]])
    expect(texts(s)).toEqual(expect.arrayContaining(['16 > 0: two real roots', '0: one repeated root', '\u221212 < 0: no real roots']))
  })

  it('Remainder theorem: the remainder of p(x) ÷ (x − a) equals p(a) for every a; here p(1) = −6 and p(x) = (x − 1)·x − 6', () => {
    const { u, ox, oy, a } = M.POLY
    expect(M.polyP(1)).toBe(-6)
    expect(M.syntheticDivide(1)).toEqual({ quotient: [1, 0], remainder: -6 })
    for (const t of [-4, -2, -0.5, 0, 1, 2, 3.5, 7]) { expect(M.syntheticDivide(t).remainder).toBeCloseTo(M.polyP(t), 9); expect((t - 1) * t - 6).toBeCloseTo(M.polyP(t), 9) }
    const s = M.buildRemainderTheoremScene()
    const toMath = back(u, ox, oy)
    const curve = paths(s, INK)[0].points!
    for (const p of curve) { const [x, y] = toMath(p); expect(Math.abs(y - (x * x - x - 6))).toBeLessThan(0.15) }
    const d = toMath(dots(s, GREEN)[0].position!)
    expect(d[0]).toBeCloseTo(a, 1); expect(d[1]).toBeCloseTo(-6, 1)                                   // the point (1, p(1)) on the graph
    const g = lines(s, RED)[0]; expect(near(g.from![0], g.to![0])).toBe(true); expect(near(g.from![1], oy, 0.01)).toBe(true)
    expect(texts(s)).toEqual(expect.arrayContaining(['p(x) = x\u00B2 \u2212 x \u2212 6', 'p(x) = (x \u2212 1)\u00B7x \u2212 6', 'p(1) = \u22126 = remainder']))
  })

  it('Factor theorem: p(3) = p(−2) = 0 so (x − 3) and (x + 2) are factors and p = (x − 3)(x + 2); p(1) = −6 ≠ 0 so (x − 1) is not', () => {
    const { u, ox, oy } = M.POLY
    expect(M.polyP(3)).toBe(0); expect(M.polyP(-2)).toBe(0); expect(M.polyP(1)).not.toBe(0)
    expect(M.syntheticDivide(3).remainder).toBe(0); expect(M.syntheticDivide(-2).remainder).toBe(0); expect(M.syntheticDivide(1).remainder).toBe(-6)
    for (const t of [-3, -1, 0, 0.5, 2, 5]) expect((t - 3) * (t + 2)).toBeCloseTo(M.polyP(t), 9)
    const s = M.buildFactorTheoremScene()
    const toMath = back(u, ox, oy)
    const pts = dots(s).map((d) => toMath(d.position!)).sort((p, q) => p[0] - q[0])
    expect(pts).toHaveLength(3)
    expect(pts.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10])).toEqual([[-2, 0], [1, -6], [3, 0]])
    expect(dots(s, GREEN)).toHaveLength(2); expect(dots(s, RED)).toHaveLength(1)
    expect(texts(s)).toEqual(expect.arrayContaining(['p(3) = 0', 'p(\u22122) = 0', 'p(x) = (x \u2212 3)(x + 2)', 'p(1) = \u22126 \u2260 0: not a factor']))
  })

  it('Polynomial inequality: p changes sign at −1, 1, 3, giving − + − +; the drawn chart colours and the highlighted solution match the sign of p', () => {
    const { u, ox, oy, roots } = M.PINEQ
    expect(roots.map((r) => M.pineqP(r) === 0)).toEqual([true, true, true])
    expect([-2, 0, 2, 4].map((t) => Math.sign(M.pineqP(t)))).toEqual([-1, 1, -1, 1])
    const s = M.buildPolynomialInequalityScene()
    const toMath = back(u, ox, oy)
    for (const p of paths(s, INK)[0].points!) { const [x, y] = toMath(p); expect(Math.abs(y - M.pineqP(x))).toBeLessThan(0.2) }   // rounding to 0.01 on a steep cubic
    const chart = lines(s).filter((o) => (o as Obj).thickness === 0.12 && near(o.from![1], -4.2 * u + oy, 0.01))
    expect(chart).toHaveLength(4)
    for (const seg of chart) {
      const mid = (toMath(seg.from!)[0] + toMath(seg.to!)[0]) / 2
      expect(seg.color).toBe(M.pineqP(mid) > 0 ? GREEN : RED)                                        // green exactly where p > 0
    }
    const sol = lines(s, GREEN).filter((o) => (o as Obj).thickness === 0.12 && near(o.from![1], oy, 0.01))
    expect(sol).toHaveLength(2)
    for (const seg of sol) { const [a, b] = [toMath(seg.from!)[0], toMath(seg.to!)[0]]; for (const t of [0.25, 0.5, 0.75]) expect(M.pineqP(a + (b - a) * t)).toBeGreaterThan(0) }   // p > 0 along the whole highlight
    const rings = paths(s, GREEN).filter((p) => p.points!.length === 25).map((p) => toMath(centreOfRing(p))).sort((p, q) => p[0] - q[0])
    expect(rings).toHaveLength(3); rings.forEach(([x], i) => expect(Math.abs(x - [-1, 1, 3][i])).toBeLessThan(0.05))   // roots excluded: open circles
    expect(texts(s)).toEqual(expect.arrayContaining(['p(x) = (x + 1)(x \u2212 1)(x \u2212 3)', 'sign of p', 'p(x) > 0: \u22121 < x < 1 or x > 3']))
  })

  it('Rational expressions: (x² − 9)/(x − 3) = x + 3 for every x ≠ 3, undefined at 3, and the graph is that line with a hole at (3, 6)', () => {
    const { u, oy, hole } = M.RATX
    for (const t of [-4.5, -1, 0, 2.9, 3.1, 7]) expect(M.ratF(t)).toBeCloseTo(t + 3, 9)
    expect(Number.isNaN(M.ratF(3))).toBe(true)                                                         // 0 ÷ 0
    expect((3 - 3) * (3 + 3)).toBe(3 * 3 - 9 + 0 * 0 + 0)                                              // the top is 0 at x = 3
    expect(hole).toEqual([3, 6])
    const s = M.buildRationalExpressionsScene()
    const toMath = back(u, 0, oy)
    const pieces = lines(s, BLUE)
    expect(pieces).toHaveLength(2)
    for (const l of pieces) for (const p of [l.from!, l.to!]) { const [x, y] = toMath(p); expect(y).toBeCloseTo(x + 3, 1) }   // both pieces lie on y = x + 3
    const [left, right] = [...pieces].sort((p, q) => p.from![0] - q.from![0])
    const gapLo = toMath(left.to!)[0], gapHi = toMath(right.from!)[0]
    expect(gapLo).toBeLessThan(3); expect(gapHi).toBeGreaterThan(3)                                    // x = 3 falls in the gap
    const ring = paths(s, RED)[0]; const [hx, hy] = toMath(centreOfRing(ring))
    expect(hx).toBeCloseTo(3, 1); expect(hy).toBeCloseTo(6, 1)
    expect(hy).toBeCloseTo(hx + 3, 1)                                                                  // the hole is ON the line
    expect(texts(s)).toEqual(expect.arrayContaining(['(x\u00B2 \u2212 9) \u00F7 (x \u2212 3)', '= (x \u2212 3)(x + 3) \u00F7 (x \u2212 3)', '= x + 3', 'hole at (3, 6): x \u2260 3']))
  })

  it('Inequality: open circle at 2 for x > 2, filled dot at −1 for x ≤ −1, and −1 < x ≤ 3 is open at −1 and filled at 3; the thick lines cover exactly the solutions', () => {
    const { u, ox, axisY, rows } = M.INEQ
    const X = (x: number) => x * u + ox
    const gt = (x: number) => x > 2, le = (x: number) => x <= -1, between = (x: number) => -1 < x && x <= 3
    expect([gt(2), gt(2.001), le(-1), le(-1.001), between(-1), between(-0.999), between(3), between(3.001)]).toEqual([false, true, true, true, false, true, true, false])
    const s = M.buildInequalityScene()
    const rings = paths(s).filter((p) => p.points!.length === 25)
    const filled = dots(s)
    const ringAt = (x: number, y: number) => rings.some((r) => { const c = centreOfRing(r); return near(c[0], X(x), 0.02) && near(c[1], y, 0.02) })
    const dotAt = (x: number, y: number) => filled.some((d) => near(d.position![0], X(x), 0.02) && near(d.position![1], y, 0.02))
    expect(ringAt(2, rows.gt)).toBe(true); expect(dotAt(2, rows.gt)).toBe(false)                         // 2 is NOT a solution of x > 2
    expect(dotAt(-1, rows.le)).toBe(true); expect(ringAt(-1, rows.le)).toBe(false)                       // -1 IS a solution of x <= -1
    expect(ringAt(-1, rows.between)).toBe(true); expect(dotAt(3, rows.between)).toBe(true)
    const arrows = lines(s).filter((o) => o.type === 'arrow' && o.color !== SLATE)
    const right = arrows.find((o) => near(o.from![1], rows.gt, 0.01))!, left = arrows.find((o) => near(o.from![1], rows.le, 0.01))!
    expect(near(right.from![0], X(2), 0.01)).toBe(true); expect(right.to![0]).toBeGreaterThan(right.from![0])     // x > 2 goes right
    expect(near(left.from![0], X(-1), 0.01)).toBe(true); expect(left.to![0]).toBeLessThan(left.from![0])          // x <= -1 goes left
    const seg = lines(s, BLUE).find((o) => near(o.from![1], rows.between, 0.01))!
    expect(near(seg.from![0], X(-1), 0.01) && near(seg.to![0], X(3), 0.01)).toBe(true)
    const ticks = lines(s, SLATE).filter((o) => near(o.from![0], o.to![0]) && near(len(o), 0.24, 0.01) && near((o.from![1] + o.to![1]) / 2, axisY, 0.01))
    expect(ticks).toHaveLength(10)                                                                      // -4 .. 5
    expect(texts(s)).toEqual(expect.arrayContaining(['x > 2', 'x \u2264 \u22121', '\u22121 < x \u2264 3']))
  })
})
