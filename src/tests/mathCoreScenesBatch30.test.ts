/**
 * Mathematics visual campaign, batch 30 (2026-10-12): the Euclidean algorithm (squares), lcm, congruence (a clock), residue
 * classes, Pythagorean triples, the distribution of primes, the prime number theorem, continued fractions, and the first
 * abstract-algebra helpers — algebraic structures, binary operations, the group axioms on ℤ₃, the Cayley table of S₃ and a
 * subgroup of ℤ₆. Every number a figure states is re-derived here from the DRAWN rectangles, dots, numerals, table cells, bars,
 * arrows and curves, and every table is re-checked for the group laws from the cells as drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB30'

type Obj = { type?: string; text?: string; color?: string; radius?: number; thickness?: number; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '')
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const lines = (s: SceneSpec, color?: string) => objs(s).filter((o) => (o.type === 'bond' || o.type === 'arrow') && o.from && o.to && (!color || o.color === color))
const bonds = (s: SceneSpec, color: string, thickness: number) => lines(s, color).filter((o) => o.type === 'bond' && near(o.thickness ?? 0, thickness, 1e-9))
const arrows = (s: SceneSpec, color: string) => lines(s, color).filter((o) => o.type === 'arrow')
const dots = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'node' && o.position && (!color || o.color === color))
const paths = (s: SceneSpec, color?: string) => objs(s).filter((o) => o.type === 'path' && o.points && (!color || o.color === color))
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const len = (o: Obj) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol
const sum = (xs: readonly number[]) => xs.reduce((s, v) => s + v, 0)
const disp = (o: Obj, u: number): [number, number] => [(o.to![0] - o.from![0]) / u, (o.to![1] - o.from![1]) / u]
const crossz = (p: readonly number[], q: readonly number[]) => p[0] * q[1] - p[1] * q[0]
const dotp = (p: readonly number[], q: readonly number[]) => p[0] * q[0] + p[1] * q[1]
const approx = (v: readonly number[], tol = 1) => v.map((x) => expect.closeTo(x, tol))
const slope = (o: Obj) => (o.to![1] - o.from![1]) / (o.to![0] - o.from![0])
/** Distance from point p to the infinite line through a drawn segment. */
const distToLine = (o: Obj, p: number[]) => Math.abs(crossz([o.to![0] - o.from![0], o.to![1] - o.from![1]], [p[0] - o.from![0], p[1] - o.from![1]])) / len(o)
const extent = (p: Obj) => { const xs = p.points!.map((q) => q[0]), ys = p.points!.map((q) => q[1]); return { cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, rx: (Math.max(...xs) - Math.min(...xs)) / 2, ry: (Math.max(...ys) - Math.min(...ys)) / 2 } }

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['math.nt.euclidean-algorithm', M.buildEuclideanAlgorithmScene, 'math-euclidean-algorithm'],
  ['math.nt.lcm', M.buildLcmScene, 'math-lcm'],
  ['math.nt.congruence', M.buildCongruenceScene, 'math-congruence'],
  ['math.nt.residue-classes', M.buildResidueClassesScene, 'math-residue-classes'],
  ['math.nt.pythagorean-triples', M.buildPythagoreanTriplesScene, 'math-pythagorean-triples'],
  ['math.nt.prime-distribution', M.buildPrimeDistributionScene, 'math-prime-distribution'],
  ['math.nt.prime-number-theorem', M.buildPrimeNumberTheoremScene, 'math-prime-number-theorem'],
  ['math.nt.continued-fractions', M.buildContinuedFractionsScene, 'math-continued-fractions'],
  ['math.abst.algebraic-structure', M.buildAlgebraicStructureScene, 'math-algebraic-structure'],
  ['math.abst.binary-operation', M.buildBinaryOperationScene, 'math-binary-operation'],
  ['math.abst.group-theory', M.buildGroupTheoryScene, 'math-group-theory'],
  ['math.abst.group-operation', M.buildGroupOperationScene, 'math-group-operation'],
  ['math.abst.subgroup', M.buildSubgroupScene, 'math-subgroup'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, _build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, `${conceptId} ${d.provenance}`).toBe(true)
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
  it.each(BATCH)('%s never draws a zero-length line', (_id, build) => {
    for (const o of lines(build())) expect(len(o)).toBeGreaterThan(0)
  })
})


// ── helpers ────────────────────────────────────────────────────────────────────────────────
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const pathsOf = (s: SceneSpec, color: string, min = 8) => paths(s, color).filter((p) => p.points!.length >= min)
const labelAt = (s: SceneSpec, p: readonly number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p as number[]) < tol)
const numsIn = (t: string) => (t.replace(/−/g, '-').match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
const num = (t: string) => Number(t.replace('−', '-'))
const hasText = (s: SceneSpec, t: string) => texts(s).includes(t)
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  let acc = Number(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = Number(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
const lhsVal = (t: string) => evalLR(t)
const rhsVal = (t: string) => evalLR(`${t.split('=')[1].trim()} =`)
const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
const isPrimeNum = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }
const piOf = (x: number) => { let c = 0; for (let n = 2; n <= x; n++) if (isPrimeNum(n)) c++; return c }
const mod = (a: number, n: number) => ((a % n) + n) % n
/** closed boxes drawn by rect(): pair each bottom edge with the top edge of the same x-span, `height` above it */
const rectBoxes = (s: SceneSpec, color: string, thickness: number, height: number) => {
  const hs = bonds(s, color, thickness).filter((o) => near(o.from![1], o.to![1], 1e-6)).map((o) => ({ x0: Math.min(o.from![0], o.to![0]), x1: Math.max(o.from![0], o.to![0]), y: o.from![1] }))
  const out: Array<{ x0: number; x1: number; y0: number; y1: number }> = []
  for (const a of hs) for (const b of hs) if (a !== b && near(a.x0, b.x0, 1e-6) && near(a.x1, b.x1, 1e-6) && near(b.y - a.y, height, 0.02)) out.push({ x0: a.x0, x1: a.x1, y0: a.y, y1: b.y })
  return out
}
/** a table read back from the drawn numerals/letters: cell(i, j) for i, j in 0..n-1 */
const readTable = (s: SceneSpec, at: (i: number, j: number) => readonly number[], n: number) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => labelAt(s, at(i, j))!.text!))
const latin = (t: string[][]) => t.every((row) => new Set(row).size === row.length) && t[0].every((_, j) => new Set(t.map((row) => row[j])).size === t.length)
const isAssociative = (t: string[][], names: string[]) => { const op = (a: string, b: string) => t[names.indexOf(a)][names.indexOf(b)]; return names.every((a) => names.every((b) => names.every((c) => op(op(a, b), c) === op(a, op(b, c))))) }

describe('the mathematics each figure draws', () => {
  it('Euclidean algorithm: the drawn squares tile the 48 × 18 rectangle exactly (2 of 18, 1 of 12, 2 of 6), the counts and leftovers reproduce 48 = 2 × 18 + 12, 18 = 1 × 12 + 6, 12 = 2 × 6 + 0, and the last square side is gcd = 6', () => {
    const s = M.buildEuclideanAlgorithmScene(), { u, a, b, eqY, eqX } = M.EUC
    const [outer] = rectBoxes(s, SLATE, 0.05, b * u); expect((outer.x1 - outer.x0) / u).toBeCloseTo(a, 1); expect((outer.y1 - outer.y0) / u).toBeCloseTo(b, 1)
    const sq = (color: string, side: number) => rectBoxes(s, color, 0.05, side * u)
    const blue = sq(BLUE, 18), violet = sq(VIOLET, 12), green = sq(GREEN, 6); expect([blue.length, violet.length, green.length]).toEqual([2, 1, 2])
    const all = [...blue, ...violet, ...green]; all.forEach((q) => expect((q.x1 - q.x0) / u).toBeCloseTo((q.y1 - q.y0) / u, 1))                           // every piece is a square
    const area = all.reduce((t, q) => t + ((q.x1 - q.x0) / u) * ((q.y1 - q.y0) / u), 0); expect(area).toBeCloseTo(a * b, 0)                                // they fill the rectangle exactly
    for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const ox = Math.min(all[i].x1, all[j].x1) - Math.max(all[i].x0, all[j].x0), oy = Math.min(all[i].y1, all[j].y1) - Math.max(all[i].y0, all[j].y0); expect(ox > 0.01 && oy > 0.01).toBe(false) }
    all.forEach((q) => { expect(q.x0).toBeGreaterThan(outer.x0 - 0.02); expect(q.x1).toBeLessThan(outer.x1 + 0.02); expect(q.y0).toBeGreaterThan(outer.y0 - 0.02); expect(q.y1).toBeLessThan(outer.y1 + 0.02) })
    const q0 = blue.length, r0 = a - q0 * b, q1 = violet.length, r1 = b - q1 * r0, q2 = green.length, r2 = r0 - q2 * r1
    expect([q0, r0, q1, r1, q2, r2]).toEqual([2, 12, 1, 6, 2, 0]); expect(Math.round((violet[0].x1 - violet[0].x0) / u)).toBe(r0); expect(Math.round((green[0].x1 - green[0].x0) / u)).toBe(r1)    // the leftover of each round is the next square's side
    const lines = [0, 1, 2].map((k) => labelAt(s, [eqX, eqY[k]])!.text!), nums = lines.map(numsIn)
    expect(nums).toEqual([[48, 2, 18, 12], [18, 1, 12, 6], [12, 2, 6, 0]]); lines.forEach((t) => expect(lhsVal(t)).toBe(Number(t.split('=')[0]))); lines.forEach((t) => expect(evalLR(`${t.split('=')[1].trim()} =`)).toBe(Number(t.split('=')[0])))
    expect(r1).toBe(gcdOf(a, b)); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('gcd'))!.text!)[0]).toBe(r1)
    ;[[18, 0], [18, 1], [12, 2], [6, 3], [6, 4]].forEach(([side], i) => expect(labelsOf(s).filter((o) => o.text === String(side)).length).toBeGreaterThan(0))
  })

  it('Least common multiple: the blue row holds exactly the multiples of 4 and the red row the multiples of 6 up to 24, the green overlay marks their common values 12 and 24, the least is 12, and 12 = 4 × 6 ÷ gcd(4, 6)', () => {
    const s = M.buildLcmScene(), { x0, u, a, b, max, rows } = M.LCM, val = (p: number[]) => Math.round((p[0] - x0) / u)
    const A = dots(s, BLUE).map((d) => val(d.position!)).sort((p, q) => p - q), B = dots(s, RED).map((d) => val(d.position!)).sort((p, q) => p - q)
    expect(A).toEqual([4, 8, 12, 16, 20, 24]); expect(B).toEqual([6, 12, 18, 24]); expect(A.every((n) => n % a === 0)).toBe(true); expect(B.every((n) => n % b === 0)).toBe(true)
    expect(A).toEqual(Array.from({ length: max }, (_, i) => i + 1).filter((n) => n % a === 0)); expect(B).toEqual(Array.from({ length: max }, (_, i) => i + 1).filter((n) => n % b === 0))   // all of them, no gaps
    A.forEach((n) => expect(labelAt(s, [M.lcmAt(n, 0)[0], rows[0] + 0.42])?.text).toBe(String(n))); B.forEach((n) => expect(labelAt(s, [M.lcmAt(n, 1)[0], rows[1] - 0.45])?.text).toBe(String(n)))
    const common = A.filter((n) => B.includes(n)); expect(common).toEqual([12, 24])
    const green = dots(s, GREEN), greenVals = [...new Set(green.map((d) => val(d.position!)))].sort((p, q) => p - q); expect(green).toHaveLength(4); expect(greenVals).toEqual(common)
    const conn = bonds(s, GREEN, 0.04); expect(conn).toHaveLength(2); expect(conn.map((o) => val(o.from!)).sort((p, q) => p - q)).toEqual(common); conn.forEach((o) => expect(near(o.from![0], o.to![0], 1e-6)).toBe(true))
    const big = green.filter((d) => near(d.radius ?? 0, 0.2, 1e-9)); expect(big).toHaveLength(2); big.forEach((d) => expect(val(d.position!)).toBe(Math.min(...common)))   // the least one is emphasised
    const lcm = Math.min(...common); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('lcm'))!.text!)[0]).toBe(lcm); expect(lcm * gcdOf(a, b)).toBe(a * b)
    expect(hasText(s, '4 × 6 ÷ 2 = 12')).toBe(true); expect(lhsVal('4 × 6 ÷ 2 = 12')).toBe(lcm); expect(common.every((n) => n % lcm === 0)).toBe(true)
  })

  it('Congruence: each numeral sits on the ray of its remainder mod 5 and on the ring of its lap, the green dots 2, 7, 12 share one ray, and the written congruences have differences divisible by 5', () => {
    const s = M.buildCongruenceScene(), { n, rings } = M.CNG
    const polar = (p: number[]) => ({ r: Math.hypot(p[0], p[1]), ang: mod(Math.round((Math.atan2(p[1], p[0]) * 180) / Math.PI), 360) })
    const residueOf = (p: number[]) => mod(Math.round((90 - polar(p).ang) / 72), n)
    for (let k = 0; k <= 14; k++) {
      const lab = labelAt(s, M.cngAt(k))!; expect(lab.text, `numeral ${k}`).toBe(String(k)); const q = polar(lab.position!)
      expect(residueOf(lab.position!), `ray of ${k}`).toBe(k % n); expect(rings.findIndex((r) => Math.abs(r - q.r) < 0.05), `ring of ${k}`).toBe(Math.floor(k / n))
    }
    const g = dots(s, GREEN); expect(g).toHaveLength(3)
    const ks = g.map((d) => { const dd = polar(d.position!), lap = rings.findIndex((r) => Math.abs(r + 0.34 - dd.r) < 0.05); return lap * n + residueOf(d.position!) }).sort((p, q) => p - q); expect(ks).toEqual([2, 7, 12])
    expect(new Set(ks.map((k) => k % n)).size).toBe(1); ks.slice(1).forEach((k, i) => expect((k - ks[i]) % n).toBe(0))                                        // same ray ⇒ differences are multiples of 5
    ;['7 ≡ 2 (mod 5)', '12 ≡ 7 (mod 5)'].forEach((t) => { expect(hasText(s, t)).toBe(true); const [a, b, m] = numsIn(t); expect(m).toBe(n); expect((a - b) % m).toBe(0); expect(ks).toContain(a); expect(ks).toContain(b) })
    expect(labelAt(s, [0, 0])?.text).toBe('mod 5')
  })

  it('Residue classes: every integer −5…8 has the colour of its class mod 4 (4 per class, each class steps by 4), the legend names [0]…[3], and the hops 2 then 3 from 0 land on 5, which is in class [1]', () => {
    const s = M.buildResidueClassesScene(), { lo, hi, dx, x0 } = M.RSC, cols = [BLUE, RED, GREEN, VIOLET]
    const classes: number[][] = [[], [], [], []]
    for (let k = lo; k <= hi; k++) {
      expect(num(labelAt(s, M.rscAt(k))!.text!), `numeral ${k}`).toBe(k)
      const d = objs(s).find((o) => o.type === 'node' && o.position && near(o.radius ?? 0, 0.1, 1e-9) && dist(o.position, [M.rscAt(k)[0], M.rscAt(k)[1] + 0.4]) < 0.02)!
      const c = cols.indexOf(d.color!); expect(c, `class of ${k}`).toBe(mod(k, 4)); classes[c].push(k)
    }
    classes.forEach((cl) => { cl.slice(1).forEach((k, i) => expect(k - cl[i]).toBe(4)) })                                      // each class is a progression with step 4
    expect(classes.flat().sort((p, q) => p - q)).toEqual(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)); expect(classes.map((c) => c.length)).toEqual([4, 3, 3, 4]); expect(classes[1]).toEqual([-3, 1, 5]); expect(classes[3]).toEqual([-5, -1, 3, 7])
    ;[0, 1, 2, 3].forEach((c) => expect(labelsOf(s).find((o) => o.text === `[${c}]`)!.color).toBe(cols[c]))
    const hopG = pathsOf(s, GREEN)[0].points!, hopV = pathsOf(s, VIOLET)[0].points!, kOf = (x: number) => Math.round((x - x0) / dx + lo) + 0
    const ends = (pts: number[][]) => [kOf(Math.min(...pts.map((p) => p[0]))), kOf(Math.max(...pts.map((p) => p[0])))]
    expect(ends(hopG)).toEqual([0, 2]); expect(ends(hopV)).toEqual([2, 5]); const [h1, h2] = [ends(hopG)[1] - ends(hopG)[0], ends(hopV)[1] - ends(hopV)[0]]
    expect([mod(h1, 4), mod(h2, 4)]).toEqual([2, 3]); expect(mod(h1 + h2, 4)).toBe(1); expect(classes[1]).toContain(ends(hopV)[1])                                // [2] + [3] lands in [1]
    expect(classes[1]).toContain(6 + 7 - 12); expect(hasText(s, '[2] + [3] = [1]')).toBe(true)
  })

  it('Pythagorean triples: the drawn legs and hypotenuse are 3, 4, 5 and 5, 12, 13 units (right angle, a² + b² = c²), the captions agree, and each triple comes from coprime m > n > 0 as m² − n², 2mn, m² + n²', () => {
    const s = M.buildPythagoreanTriplesScene(), slate = bonds(s, SLATE, 0.05), hyp = bonds(s, VIOLET, 0.05); expect([slate.length, hyp.length]).toEqual([4, 2])
    M.PYT.tris.forEach((t, i) => {
      const inTri = (o: Obj) => (i === 0 ? o.from![0] < -2.4 : o.from![0] > 0.2), legs = slate.filter(inTri), h = hyp.filter(inTri)[0]; expect(legs).toHaveLength(2)
      const lens = [...legs.map((o) => len(o) / t.s), len(h) / t.s].map((v) => Math.round(v * 10) / 10); const [l1, l2] = legs.map((o) => len(o) / t.s), c = len(h) / t.s
      expect([l1, l2].sort((p, q) => p - q)).toEqual([expect.closeTo(t.a, 1), expect.closeTo(t.b, 1)]); expect(c).toBeCloseTo(t.c, 1); expect(l1 ** 2 + l2 ** 2).toBeCloseTo(c ** 2, 0); expect(lens.length).toBe(3)
      const [p, q] = legs; const v1 = [p.to![0] - p.from![0], p.to![1] - p.from![1]], v2 = [q.to![0] - q.from![0], q.to![1] - q.from![1]]; expect(Math.abs(v1[0] * v2[0] + v1[1] * v2[1])).toBeLessThan(0.02)   // the legs meet at a right angle
      expect(labelsOf(s).filter((o) => [t.a, t.b, t.c].map(String).includes(o.text!) && (i === 0 ? o.position![0] < -1.6 : o.position![0] > -0.2)).map((o) => o.text!).sort()).toEqual([t.a, t.b, t.c].map(String).sort())
      expect([t.m * t.m - t.n * t.n, 2 * t.m * t.n, t.m * t.m + t.n * t.n]).toEqual([t.a, t.b, t.c]); expect(gcdOf(t.m, t.n)).toBe(1); expect(t.m).toBeGreaterThan(t.n); expect(t.n).toBeGreaterThan(0)
      expect(gcdOf(gcdOf(t.a, t.b), t.c)).toBe(1)                                                                                                       // primitive
    })
    const caps = labelsOf(s).filter((o) => o.text!.includes('²')).map((o) => numsIn(o.text!)); expect(caps).toEqual([[3, 4, 5], [5, 12, 13]]); caps.forEach(([a, b, c]) => expect(a * a + b * b).toBe(c * c))
    expect(labelsOf(s).filter((o) => o.text!.startsWith('m =')).map((o) => numsIn(o.text!))).toEqual([[2, 1], [3, 2]])
  })

  it('Prime distribution: each bar is the number of primes in its block of 20 (8, 4, 5, 5, 3, counted independently), they add to 25 = π(100), and the violet average line is 25 ÷ 5 = 5', () => {
    const s = M.buildPrimeDistributionScene(), { sy, base, blocks } = M.PDS
    const bars = bonds(s, BLUE, 0.5).sort((p, q) => p.from![0] - q.from![0]); expect(bars).toHaveLength(5)
    const counts = bars.map((b) => Math.round((b.to![1] - b.from![1]) / sy)); expect(counts).toEqual([8, 4, 5, 5, 3])
    blocks.forEach(([a, b], k) => { expect(counts[k]).toBe(piOf(b) - piOf(a - 1)); expect(labelsOf(s).filter((o) => /^\d+$/.test(o.text!)).reduce((m, o) => (dist(o.position!, bars[k].to!) < dist(m.position!, bars[k].to!) ? o : m)).text).toBe(String(counts[k])); expect(labelAt(s, [bars[k].from![0], base - 0.5])?.text).toBe(`${a}–${b}`); expect(bars[k].from![1]).toBeCloseTo(base, 1) })
    const total = counts.reduce((p, q) => p + q, 0); expect(total).toBe(25); expect(total).toBe(piOf(100)); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('25 primes'))!.text!)[0]).toBe(total)
    const avg = bonds(s, VIOLET, 0.03)[0]; expect((avg.from![1] - base) / sy).toBeCloseTo(total / counts.length, 1); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('average'))!.text!)[0]).toBe(5)
    expect(counts.some((c, k) => k > 0 && c > counts[k - 1])).toBe(true); expect(counts[0]).toBeGreaterThan(counts[counts.length - 1])                    // thinning out overall, but not monotonically
  })

  it('Prime number theorem: the drawn staircase equals π(x) at every x (jumps by 1 exactly at the 25 primes up to 100), the red curve is x / ln x, the points at 100 read 25 and 21.7 (ratio 1.15), and the independently computed ratio falls towards 1', () => {
    const s = M.buildPrimeNumberTheoremScene(), { ox, sx, oy, sy } = M.PNT, dd = (p: number[]) => ({ x: (p[0] - ox) / sx, y: (p[1] - oy) / sy })
    const stair = pathsOf(s, BLUE)[0].points!.map(dd), step = (x: number) => { let y = 0; for (const p of stair) if (p.x <= x + 0.05) y = p.y; return Math.round(y) }
    for (let x = 2; x <= 100; x++) expect(step(x), `π(${x})`).toBe(piOf(x))
    const jumps = stair.slice(1).filter((p, i) => Math.abs(p.x - stair[i].x) < 0.05 && p.y > stair[i].y + 0.5).map((p) => Math.round(p.x)); expect(jumps).toEqual(Array.from({ length: 99 }, (_, i) => i + 2).filter(isPrimeNum)); expect(jumps).toHaveLength(25)
    const cv = pathsOf(s, RED)[0].points!.map(dd); cv.forEach((p) => expect(Math.abs(p.y - p.x / Math.log(p.x))).toBeLessThan(0.15))
    const g = dd(dots(s, GREEN)[0].position!), r = dd(dots(s, RED)[0].position!); expect([g.x, g.y]).toEqual([expect.closeTo(100, 0), expect.closeTo(25, 1)]); expect(r.x).toBeCloseTo(100, 0); expect(r.y).toBeCloseTo(100 / Math.log(100), 1)
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('25 primes'))!.text!)[0]).toBe(25); expect(Number(labelsOf(s).find((o) => o.text!.startsWith('100 / ln'))!.text!.split('≈')[1])).toBeCloseTo(100 / Math.log(100), 1)
    expect(Number(labelsOf(s).find((o) => o.text!.startsWith('ratio'))!.text!.split(' ')[1])).toBeCloseTo(25 / (100 / Math.log(100)), 2)
    const N = 1_000_000, sieve = new Uint8Array(N + 1); let count = 0; const at: Record<number, number> = {}
    for (let i = 2; i <= N; i++) { if (!sieve[i]) { count++; for (let j = i * i; j <= N; j += i) sieve[j] = 1 } if (i === 1e3 || i === 1e4 || i === 1e5 || i === 1e6) at[i] = count }
    const ratio = [1e3, 1e4, 1e5, 1e6].map((x) => at[x] / (x / Math.log(x))); expect(ratio[0]).toBeGreaterThan(ratio[1]); expect(ratio[1]).toBeGreaterThan(ratio[2]); expect(ratio[2]).toBeGreaterThan(ratio[3]); expect(ratio[3]).toBeGreaterThan(1)   // π(x)/(x/ln x) → 1 from above
    expect(ratio[3]).toBeLessThan(25 / (100 / Math.log(100)))
  })

  it('Continued fractions: each division line a = q × b + r is true and chains into the next (17, 5) → (5, 2) → (2, 1), the quotients 3, 2, 2 are the nested numerals, 3 + 1/(2 + 1/2) = 17/5 = 3.4, and [3; 2, 2] is written', () => {
    const s = M.buildContinuedFractionsScene(), { divRows, divX, nested: N } = M.CFR
    const rows = divRows.map((y) => labelAt(s, [divX, y])!.text!), parts = rows.map(numsIn); expect(parts).toEqual([[17, 3, 5, 2], [5, 2, 2, 1], [2, 2, 1, 0]])
    parts.forEach(([a, q, b, r]) => { expect(q * b + r).toBe(a); expect(r).toBeLessThan(b) })
    parts.slice(1).forEach(([a, , b], i) => { expect([a, b]).toEqual([parts[i][2], parts[i][3]]) })                                                      // (a, b) → (b, a mod b)
    expect(parts[2][3]).toBe(0); expect(parts[1][3]).toBe(gcdOf(17, 5)); const q = parts.map((p) => p[1]); expect(q).toEqual([3, 2, 2])
    const read = (p: Pt2) => Number(labelAt(s, p)!.text); type Pt2 = readonly [number, number]
    const a0 = read(N.three), a1 = read(N.twoB), a2 = read(N.twoC), num1 = read(N.numA), num2 = read(N.numB); expect([a0, a1, a2]).toEqual(q); expect([num1, num2]).toEqual([1, 1])
    const value = a0 + num1 / (a1 + num2 / a2); expect(value).toBeCloseTo(17 / 5, 12); expect(value).toBeCloseTo(3.4, 12)
    expect(labelAt(s, N.plusA)?.text).toBe('+'); expect(labelAt(s, N.plusB)?.text).toBe('+'); expect(bonds(s, SLATE, 0.03)).toHaveLength(2)
    expect(hasText(s, '17/5 = 3.4')).toBe(true); expect(17 / 5).toBeCloseTo(3.4, 12); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('['))!.text!)).toEqual(q)
    const back = q.reduceRight((acc, a, i) => (i === q.length - 1 ? a : a + 1 / acc), 0); expect(back).toBeCloseTo(17 / 5, 12)                                // the CF evaluates back to the fraction
  })

  it('Algebraic structure: the left table is addition mod 4 and the right one multiplication mod 4 as drawn — the left is a Latin square with identity 0 and inverses, the right has rows 0 and 2 without a 1 (red marks), so only the left is a group', () => {
    const s = M.buildAlgebraicStructureScene(), names = ['0', '1', '2', '3']
    const L = readTable(s, (i, j) => M.tblAt(0, i, j), 4), R = readTable(s, (i, j) => M.tblAt(1, i, j), 4)
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { expect(Number(L[i][j])).toBe((i + j) % 4); expect(Number(R[i][j])).toBe((i * j) % 4) }
    ;[0, 1].forEach((p) => names.forEach((nm, k) => { expect(labelAt(s, M.tblAt(p, -1, k))?.text).toBe(nm); expect(labelAt(s, M.tblAt(p, k, -1))?.text).toBe(nm) }))
    expect(labelAt(s, M.tblAt(0, -1, -1))?.text).toBe('+'); expect(labelAt(s, M.tblAt(1, -1, -1))?.text).toBe('×')
    expect(latin(L)).toBe(true); expect(L[0]).toEqual(names); expect(L.map((r) => r[0])).toEqual(names)                                                   // 0 is the identity, every row and column a permutation
    expect(names.every((a) => names.some((b) => L[Number(a)][Number(b)] === '0'))).toBe(true); expect(isAssociative(L, names)).toBe(true)              // so (ℤ₄, +) is a group
    expect(R[1]).toEqual(names); expect(isAssociative(R, names)).toBe(true)                                                                             // 1 is the identity under ×, still associative
    const noInverse = names.filter((a) => !names.some((b) => R[Number(a)][Number(b)] === '1')); expect(noInverse).toEqual(['0', '2'])
    const marks = dots(s, RED).map((d) => [0, 1, 2, 3].find((i) => Math.abs(M.tblAt(1, i, 3)[1] - d.position![1]) < 0.02)); expect(marks.sort()).toEqual([0, 2])   // the red marks are exactly those rows
    expect(latin(R)).toBe(false); expect(labelsOf(s).find((o) => o.text === 'a group')!.color).toBe(GREEN); expect(labelsOf(s).find((o) => o.text === 'not a group')!.color).toBe(RED)
  })

  it('Binary operation: plain + on {0, 1, 2} gives 3, 3 and 4 (drawn in red, outside the set) while + mod 3 stays inside it, and both tables are symmetric (checked from the cells)', () => {
    const s = M.buildBinaryOperationScene(), inS = (v: number) => [0, 1, 2].includes(v)
    const L = readTable(s, (i, j) => M.bnoAt(0, i, j), 3).map((r) => r.map(Number)), R = readTable(s, (i, j) => M.bnoAt(1, i, j), 3).map((r) => r.map(Number))
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { expect(L[i][j]).toBe(i + j); expect(R[i][j]).toBe((i + j) % 3) }
    ;[0, 1].forEach((p) => [0, 1, 2].forEach((k) => { expect(labelAt(s, M.bnoAt(p, -1, k))?.text).toBe(String(k)); expect(labelAt(s, M.bnoAt(p, k, -1))?.text).toBe(String(k)) }))
    const outside = L.flatMap((row, i) => row.map((v, j) => ({ i, j, v }))).filter((c) => !inS(c.v)); expect(outside.map((c) => c.v).sort()).toEqual([3, 3, 4]); expect(R.flat().every(inS)).toBe(true)   // closed or not
    const redLabels = labelsOf(s).filter((o) => o.color === RED && /^\d$/.test(o.text!)); expect(redLabels).toHaveLength(3); expect(dots(s, RED)).toHaveLength(0)
    outside.forEach((c) => expect(redLabels.some((o) => dist(o.position!, M.bnoAt(0, c.i, c.j)) < 0.02 && o.text === String(c.v))).toBe(true))   // exactly the cells outside S are red
    const inkEntries = L.flatMap((row, i) => row.map((v, j) => ({ v, i, j }))).filter((c) => inS(c.v)); inkEntries.forEach((c) => expect(labelAt(s, M.bnoAt(0, c.i, c.j))!.color).not.toBe(RED))
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { expect(L[i][j]).toBe(L[j][i]); expect(R[i][j]).toBe(R[j][i]) }                               // commutative
    expect(bonds(s, VIOLET, 0.03)).toHaveLength(0)
    expect(labelsOf(s).find((o) => o.text === 'closed')!.color).toBe(GREEN); expect(labelsOf(s).find((o) => o.text === 'not closed')!.color).toBe(RED)
  })

  it('Group theory: the table is addition mod 3 as drawn — closed, associative for all 27 triples, row and column 0 copy the headers (green frames), and the violet dots sit exactly on the 0 entries, giving the inverse pairs 0↔0 and 1↔2', () => {
    const s = M.buildGroupTheoryScene(), names = ['0', '1', '2'], T = readTable(s, (i, j) => M.grpAt(i, j), 3)
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) expect(Number(T[i][j])).toBe((i + j) % 3)
    names.forEach((nm, k) => { expect(labelAt(s, M.grpAt(-1, k))?.text).toBe(nm); expect(labelAt(s, M.grpAt(k, -1))?.text).toBe(nm) }); expect(labelAt(s, M.grpAt(-1, -1))?.text).toBe('+')
    expect(T.flat().every((v) => names.includes(v))).toBe(true); expect(isAssociative(T, names)).toBe(true)                                              // closure and associativity from the drawn cells
    expect(T[0]).toEqual(names); expect(T.map((r) => r[0])).toEqual(names)                                                                              // identity 0
    const rowBox = rectBoxes(s, GREEN, 0.04, M.GRP.rowH), colBox = rectBoxes(s, GREEN, 0.04, M.grpAt(-1, 0)[1] + 0.4 - (M.grpAt(2, 0)[1] - 0.4)); expect(bonds(s, GREEN, 0.04)).toHaveLength(8); expect([rowBox.length, colBox.length]).toEqual([1, 1])
    const inside = (bx: { x0: number; x1: number; y0: number; y1: number }, p: readonly number[]) => p[0] > bx.x0 && p[0] < bx.x1 && p[1] > bx.y0 && p[1] < bx.y1
    ;[0, 1, 2].forEach((j) => { expect(inside(rowBox[0], M.grpAt(0, j))).toBe(true); expect(inside(rowBox[0], M.grpAt(1, j))).toBe(false) })                  // the green row frame holds exactly row 0
    ;[0, 1, 2].forEach((i) => { expect(inside(colBox[0], M.grpAt(i, 0))).toBe(true); expect(inside(colBox[0], M.grpAt(i, 1))).toBe(false) })                  // and the column frame exactly column 0
    const zeros = T.flatMap((row, i) => row.map((v, j) => ({ i, j, v }))).filter((c) => c.v === '0'), marks = dots(s, VIOLET); expect(marks).toHaveLength(zeros.length); zeros.forEach((c) => expect(marks.some((d) => dist(d.position!, [M.grpAt(c.i, c.j)[0] + 0.4, M.grpAt(c.i, c.j)[1]]) < 0.02)).toBe(true))
    expect(names.every((a) => names.some((b) => T[Number(a)][Number(b)] === '0'))).toBe(true); expect(T[1][2]).toBe('0'); expect(T[2][1]).toBe('0'); expect(hasText(s, 'inverse of 1 is 2')).toBe(true)
    expect(T.every((row, i) => row.every((v, j) => v === T[j][i]))).toBe(true)                                                                          // abelian
    expect(hasText(s, 'identity 0')).toBe(true)
  })

  it('Group operation (S₃): every cell is the composition of the permutations named in its row and column (recomputed independently), the table is a Latin square with identity e, associative for all 216 triples, and r ∘ s = t ≠ u = s ∘ r, so it is not commutative', () => {
    const s = M.buildGroupOperationScene(), names = ['e', 'r', 'q', 's', 't', 'u'], perms = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [2, 1, 0], [0, 2, 1]]
    const comp = (a: number, b: number) => { const r = [0, 1, 2].map((x) => perms[a][perms[b][x]]); return perms.findIndex((p) => p.every((v, i) => v === r[i])) }
    const T = readTable(s, (i, j) => M.groAt(i, j), 6); for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) expect(T[i][j], `${names[i]}∘${names[j]}`).toBe(names[comp(i, j)])
    names.forEach((nm, k) => { expect(labelAt(s, M.groAt(-1, k))?.text).toBe(nm); expect(labelAt(s, M.groAt(k, -1))?.text).toBe(nm) }); expect(labelAt(s, M.groAt(-1, -1))?.text).toBe('∘')
    expect(latin(T)).toBe(true); expect(T[0]).toEqual(names); expect(T.map((r) => r[0])).toEqual(names); expect(isAssociative(T, names)).toBe(true)                  // a group
    expect(names.every((a) => names.some((b) => T[names.indexOf(a)][names.indexOf(b)] === 'e'))).toBe(true)                                              // every element has an inverse
    const asym = T.flatMap((row, i) => row.map((v, j) => ({ i, j, v }))).filter((c) => c.v !== T[c.j][c.i]); expect(asym.length).toBeGreaterThan(0)         // not commutative
    const red = dots(s, RED), green = dots(s, GREEN); expect([red.length, green.length]).toEqual([1, 1])
    expect(dist(red[0].position!, [M.groAt(1, 3)[0] - 0.4, M.groAt(1, 3)[1]])).toBeLessThan(0.02); expect(dist(green[0].position!, [M.groAt(3, 1)[0] - 0.4, M.groAt(3, 1)[1]])).toBeLessThan(0.02)   // the dots mark r∘s and s∘r
    expect([T[1][3], T[3][1]]).toEqual(['t', 'u']); expect(T[1][3]).not.toBe(T[3][1])                                                                    // r∘s ≠ s∘r
    expect(numsIn(labelsOf(s).find((o) => o.text!.endsWith('elements'))!.text!)[0]).toBe(names.length); expect(hasText(s, 'not commutative')).toBe(true)
  })

  it('Subgroup: the green set {0, 2, 4} is closed under + mod 6, has the identity and inverses and its size 3 divides 6, while the red arrow 1 → 3 is the sum 1 + 2 = 3 that makes {0, 1, 2} not closed', () => {
    const s = M.buildSubgroupScene(), n = 6, nodes = [0, 1, 2, 3, 4, 5].map((k) => M.sbgNode(k))
    ;[0, 1, 2, 3, 4, 5].forEach((k) => { expect(labelAt(s, M.sbgNum(k))?.text).toBe(String(k)); expect(dots(s, INK).some((d) => dist(d.position!, nodes[k]) < 0.02)).toBe(true) })
    const nodeOf = (p: number[]) => nodes.reduce((best, c, i) => (dist(p, c) < dist(p, nodes[best]) ? i : best), 0)
    const H = dots(s, GREEN).map((d) => nodeOf(d.position!)).sort((p, q) => p - q); expect(H).toEqual([0, 2, 4])
    H.forEach((a) => H.forEach((b) => expect(H).toContain((a + b) % n)))                                                                                  // closed
    expect(H).toContain(0); H.forEach((a) => expect(H).toContain(mod(-a, n))); expect(n % H.length).toBe(0)                                             // identity, inverses, |H| | |G|
    const tri = bonds(s, GREEN, 0.05); expect(tri).toHaveLength(3); const pairs = tri.map((o) => [nodeOf(o.from!), nodeOf(o.to!)].sort().join()).sort(); expect(pairs).toEqual(['0,2', '0,4', '2,4'])
    const arr = arrows(s, RED); expect(arr).toHaveLength(1); const from = nodeOf(arr[0].from!), to = nodeOf(arr[0].to!); expect([from, to]).toEqual([1, 3])
    const bad = [0, 1, 2]; expect(bad.some((a) => bad.some((b) => !bad.includes((a + b) % n)))).toBe(true); expect((to - from) + from).toBe(3); expect(bad).not.toContain(to)   // 1 + 2 = 3 escapes {0, 1, 2}
    expect(hasText(s, '1 + 2 = 3')).toBe(true); expect(lhsVal('1 + 2 = 3')).toBe(to); expect(to - from).toBe(2)                                           // the hop length is the other summand
    expect(hasText(s, '{0, 1, 2} is not closed')).toBe(true); expect(hasText(s, 'H = {0, 2, 4}')).toBe(true); expect(labelAt(s, [-3.2, 2.6])?.text).toBe('add mod 6')
  })
})
