/**
 * Mathematics visual campaign, batch 31 (2026-10-12): cosets, normal subgroups, quotient groups, homomorphisms, isomorphisms, group
 * actions, the symmetric group, field extensions, and the first linear-algebra helpers — matrices, addition, multiplication, transpose
 * and symmetric matrices. Tables, cosets, orbits, permutations and matrix products are recomputed here from first principles and
 * compared with what the figure actually DRAWS (numerals, coloured dots, arrows, lines), never with the generator's own constants.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB31'

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
  ['math.abst.coset', M.buildCosetScene, 'math-coset'],
  ['math.abst.normal-subgroup', M.buildNormalSubgroupScene, 'math-normal-subgroup'],
  ['math.abst.quotient-group', M.buildQuotientGroupScene, 'math-quotient-group'],
  ['math.abst.group-homomorphism', M.buildGroupHomomorphismScene, 'math-group-homomorphism'],
  ['math.abst.group-isomorphism', M.buildGroupIsomorphismScene, 'math-group-isomorphism'],
  ['math.abst.group-action', M.buildGroupActionScene, 'math-group-action'],
  ['math.abst.symmetric-group', M.buildSymmetricGroupScene, 'math-symmetric-group'],
  ['math.abst.field-extension', M.buildFieldExtensionScene, 'math-field-extension'],
  ['math.linalg.matrix', M.buildMatrixScene, 'math-matrix'],
  ['math.linalg.matrix-addition', M.buildMatrixAdditionScene, 'math-matrix-addition'],
  ['math.linalg.matrix-multiplication', M.buildMatrixMultiplicationScene, 'math-matrix-multiplication'],
  ['math.linalg.matrix-transpose', M.buildMatrixTransposeScene, 'math-matrix-transpose'],
  ['math.linalg.symmetric-matrix', M.buildSymmetricMatrixScene, 'math-symmetric-matrix'],
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
const dist = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const labelAt = (s: SceneSpec, p: readonly number[], tol = 0.06) => labelsOf(s).find((o) => dist(o.position!, p) < tol)
const numsIn = (t: string) => (t.replace(/−/g, '-').match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
const hasText = (s: SceneSpec, t: string) => texts(s).includes(t)
const evalLR = (expr: string) => {
  const toks = expr.split('=')[0].trim().split(/\s+/)
  let acc = Number(toks[0])
  for (let i = 1; i < toks.length; i += 2) { const v = Number(toks[i + 1]); acc = toks[i] === '+' ? acc + v : toks[i] === '−' ? acc - v : toks[i] === '×' ? acc * v : acc / v }
  return acc
}
const mod = (a: number, n: number) => ((a % n) + n) % n
const SUB: Record<string, number> = { '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9 }
/** the numeral grid of a matrix as drawn: m[i][j] = text of the label at at(i, j) */
const readGrid = (s: SceneSpec, at: (i: number, j: number) => readonly number[], rows: number, cols: number) => Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => labelAt(s, at(i, j))!))
const nums = (g: ReturnType<typeof readGrid>) => g.map((row) => row.map((l) => Number(l.text)))
const matMul = (A: number[][], B: number[][]) => A.map((row) => B[0].map((_, j) => row.reduce((t, v, k) => t + v * B[k][j], 0)))
/** all pairs of the 6 permutations of 3 points, as a Cayley composition */
const PERMS = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [2, 1, 0], [0, 2, 1]]
const NAMES = ['e', 'r', 'q', 's', 't', 'u']
const compose = (a: number, b: number) => { const r = [0, 1, 2].map((x) => PERMS[a][PERMS[b][x]]); return PERMS.findIndex((p) => p.every((v, i) => v === r[i])) }

describe('the mathematics each figure draws', () => {
  it('Cosets: the dot colours split ℤ₆ into {0, 3}, {1, 4}, {2, 5}; same colour holds exactly when the difference lies in H = {0, 3}, the pieces are disjoint, cover everything and have |H| = 2 elements, so the index is 6 ÷ 2 = 3', () => {
    const s = M.buildCosetScene(), { n, step } = M.CST, cols = [BLUE, RED, GREEN]
    const colour = (k: number) => cols.indexOf(dots(s).filter((d) => near(d.radius ?? 0, 0.18, 1e-9)).find((d) => dist(d.position!, M.cstNode(k)) < 0.02)!.color!)
    const cls = [0, 1, 2, 3, 4, 5].map(colour); const groups = [0, 1, 2].map((c) => [0, 1, 2, 3, 4, 5].filter((k) => cls[k] === c)); expect(groups).toEqual([[0, 3], [1, 4], [2, 5]])
    const H = [0, 3]; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) expect(cls[a] === cls[b], `${a} ~ ${b}`).toBe(H.includes(mod(b - a, n)))              // aH = bH iff a⁻¹b ∈ H
    groups.forEach((g, c) => { expect(g).toHaveLength(H.length); expect(g).toEqual(H.map((h) => mod(h + c, n)).sort((p, q) => p - q)) })                         // each coset is a shifted copy of H
    expect(groups.flat().sort((p, q) => p - q)).toEqual([0, 1, 2, 3, 4, 5]); expect(groups.length).toBe(n / H.length)                                      // a partition, index 3
    const chords = [BLUE, RED, GREEN].map((c) => bonds(s, c, 0.05)[0]); chords.forEach((o, c) => { const [a, b] = [o.from!, o.to!].map((p) => [0, 1, 2, 3, 4, 5].find((k) => dist(p, M.cstNode(k)) < 0.02)!); expect([a, b].sort()).toEqual(groups[c]); expect(mod(b - a, n)).toBe(step) })
    ;['{0, 3}', '{1, 4}', '{2, 5}'].forEach((t, c) => { const l = labelsOf(s).find((o) => o.text === t)!; expect(l.color).toBe(cols[c]); expect(numsIn(t)).toEqual(groups[c]) })
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('index'))!.text!)[0]).toBe(groups.length); expect(hasText(s, '6 ÷ 2 = 3')).toBe(true); expect(evalLR('6 ÷ 2 =')).toBe(groups.length)
    ;[0, 1, 2, 3, 4, 5].forEach((k) => expect(labelAt(s, M.cstNum(k))?.text).toBe(String(k)))
  })

  it('Normal subgroups: the blue dots are gH and the red dots Hg recomputed from the permutations — {r, t} vs {r, u} for H = {e, s} (not normal) and {s, t, u} for both with N = {e, r, q} (normal, for every g)', () => {
    const s = M.buildNormalSubgroupScene(), blue = dots(s, BLUE).map((d) => d.position!), red = dots(s, RED).map((d) => d.position!)
    const letterOfRay = (panel: number, p: readonly number[], extra: number) => NAMES.findIndex((_, k) => dist(p, M.nsbMark(panel, k, extra)) < 0.02)
    const setOf = (panel: number, pts: number[][], extra: number) => pts.filter((p) => (p[0] < 0) === (panel === 0)).map((p) => letterOfRay(panel, p, extra)).sort((a, b) => a - b)
    NAMES.forEach((nm, k) => [0, 1].forEach((panel) => expect(labelAt(s, M.nsbLetter(panel, k))?.text).toBe(nm)))
    const parseSet = (t: string) => (/\{(.*)\}/.exec(t)![1].split(',').map((x) => NAMES.indexOf(x.trim())))
    const info = [0, 1].map((panel) => { const sub = parseSet(labelsOf(s).find((o) => o.text!.includes('=') && o.text!.includes('{') && (o.position![0] < 0) === (panel === 0))!.text!), g = NAMES.indexOf(labelsOf(s).find((o) => /^g = [a-z]$/.test(o.text!) && (o.position![0] < 0) === (panel === 0))!.text!.slice(4)); return { sub, g } })
    expect(info).toEqual([{ sub: [0, 3], g: 1 }, { sub: [0, 1, 2], g: 3 }])
    info.forEach(({ sub, g }, panel) => {
      const left = sub.map((h) => compose(g, h)).sort((a, b) => a - b), right = sub.map((h) => compose(h, g)).sort((a, b) => a - b)
      expect(setOf(panel, blue, M.NSB.left)).toEqual(left); expect(setOf(panel, red, M.NSB.right)).toEqual(right)                                        // the drawn dots ARE gH and Hg
    })
    const normal = (sub: number[]) => PERMS.every((_, g) => JSON.stringify(sub.map((h) => compose(g, h)).sort()) === JSON.stringify(sub.map((h) => compose(h, g)).sort()))
    expect(normal(info[0].sub)).toBe(false); expect(normal(info[1].sub)).toBe(true)
    const closed = (sub: number[]) => sub.every((a) => sub.every((b) => sub.includes(compose(a, b)))); expect(closed(info[0].sub) && closed(info[1].sub)).toBe(true)  // both really are subgroups
    expect(setOf(0, blue, M.NSB.left)).not.toEqual(setOf(0, red, M.NSB.right)); expect(setOf(1, blue, M.NSB.left)).toEqual(setOf(1, red, M.NSB.right))
    expect(labelsOf(s).find((o) => o.text === 'not normal')!.color).toBe(RED); expect(labelsOf(s).find((o) => o.text === 'normal')!.color).toBe(GREEN)
  })

  it('Quotient groups: the six nodes carry the colours of the cosets {0, 3}, {1, 4}, {2, 5}; the sum of two classes depends only on their colours (well-defined) and matches ℤ₃, with 1 + 2 = 3 and 4 + 5 = 9 both landing in [0]', () => {
    const s = M.buildQuotientGroupScene(), cols = [BLUE, RED, GREEN]
    const cls = [0, 1, 2, 3, 4, 5].map((k) => cols.indexOf(dots(s).filter((d) => near(d.radius ?? 0, 0.17, 1e-9)).find((d) => dist(d.position!, M.qtgNode(k)) < 0.02)!.color!)); expect(cls).toEqual([0, 1, 2, 0, 1, 2])
    const table = new Map<string, number>(); for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) { const key = `${cls[a]},${cls[b]}`, v = cls[(a + b) % 6]; if (table.has(key)) expect(table.get(key), `well-defined at ${key}`).toBe(v); else table.set(key, v) }
    expect(table.size).toBe(9); for (const [key, v] of table) { const [x, y] = key.split(',').map(Number); expect(v).toBe((x + y) % 3) }                                      // the quotient adds like ℤ₃
    const big = dots(s).filter((d) => near(d.radius ?? 0, 0.24, 1e-9)); expect(big).toHaveLength(3); big.forEach((d) => { const c = [0, 1, 2].find((q) => dist(d.position!, M.qtgClass(q)) < 0.02)!; expect(d.color).toBe(cols[c]) })
    ;[0, 1, 2].forEach((c) => expect(labelsOf(s).find((o) => o.text === `[${c}]`)!.color).toBe(cols[c]))
    expect(cls.filter((c) => c === 0)).toHaveLength(6 / 3); expect(new Set(cls).size).toBe(6 / 2)                                                            // |G/N| = |G| / |N| = 3
    expect(hasText(s, '1 + 2 = 3')).toBe(true); expect(hasText(s, '4 + 5 = 9')).toBe(true); expect(cls[evalLR('1 + 2 =') % 6]).toBe(0); expect(cls[evalLR('4 + 5 =') % 6]).toBe(0)
    expect(hasText(s, '[1] + [2] = [0]')).toBe(true); expect(table.get('1,2')).toBe(0)
  })

  it('Group homomorphism: every arrow takes k to k mod 2, φ(a + b) = φ(a) + φ(b) for all 36 pairs, the kernel is {0, 2, 4} (the red arrows), the image is {0, 1}, and each fibre has |kernel| = 3 elements', () => {
    const s = M.buildGroupHomomorphismScene(), arr = [...arrows(s, RED), ...arrows(s, BLUE)]; expect(arr).toHaveLength(6)
    const ringNode = (p: number[]) => [0, 1, 2, 3, 4, 5].reduce((best, k) => (dist(p, M.homNode(k)) < dist(p, M.homNode(best)) ? k : best), 0), target = (p: number[]) => [0, 1].reduce((best, v) => (dist(p, M.HOM.right[v] as number[]) < dist(p, M.HOM.right[best] as number[]) ? v : best), 0)
    const phi: number[] = []; arr.forEach((a) => { phi[ringNode(a.from!)] = target(a.to!) }); expect(phi).toEqual([0, 1, 0, 1, 0, 1]); phi.forEach((v, k) => expect(v).toBe(k % 2))
    for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) expect(phi[(a + b) % 6], `φ(${a}+${b})`).toBe((phi[a] + phi[b]) % 2)                                      // the homomorphism law
    const kernel = [0, 1, 2, 3, 4, 5].filter((k) => phi[k] === 0); expect(kernel).toEqual([0, 2, 4]); expect(kernel.every((a) => kernel.every((b) => kernel.includes((a + b) % 6)))).toBe(true)
    expect(arrows(s, RED).map((a) => ringNode(a.from!)).sort()).toEqual(kernel); expect(arrows(s, BLUE).map((a) => ringNode(a.from!)).sort()).toEqual([1, 3, 5])        // red = kernel, blue = the rest
    expect([...new Set(phi)].sort()).toEqual([0, 1]); expect([0, 1].map((v) => phi.filter((x) => x === v).length)).toEqual([kernel.length, kernel.length])         // onto ℤ₂, fibres of size |ker|
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('kernel'))!.text!)).toEqual(kernel); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('image'))!.text!)).toEqual([0, 1])
    ;[0, 1, 2, 3, 4, 5].forEach((k) => expect(labelAt(s, M.homNum(k))?.text).toBe(String(k))); expect(hasText(s, 'parity map')).toBe(true)
  })

  it('Group isomorphism: the right table is the product of the headers it names (1, i, −1, −i as complex numbers), the left is addition mod 4, and cell for cell the two tables have the same colour, so k ↦ iᵏ is a bijection that turns sums into products', () => {
    const s = M.buildGroupIsomorphismScene(), { names, cols } = M.ISO
    const cell = (panel: number, i: number, j: number) => labelAt(s, M.isoAt(panel, i, j))!, head = (panel: number, k: number, row: boolean) => labelAt(s, row ? M.isoAt(panel, -1, k) : M.isoAt(panel, k, -1))!
    const cx = (t: string): [number, number] => (t === '1' ? [1, 0] : t === 'i' ? [0, 1] : t === '−1' ? [-1, 0] : [0, -1]), mul = (a: [number, number], b: [number, number]): [number, number] => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
    for (let k = 0; k < 4; k++) { expect(head(0, k, true).text).toBe(String(k)); expect(head(0, k, false).text).toBe(String(k)); expect(head(1, k, true).text).toBe(names[k]); expect(head(1, k, false).text).toBe(names[k]) }
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const L = cell(0, i, j), R = cell(1, i, j); expect(Number(L.text), `Z4 ${i}+${j}`).toBe((i + j) % 4)
      expect(cx(R.text!), `${names[i]}·${names[j]}`).toEqual(mul(cx(head(1, i, false).text!), cx(head(1, j, true).text!)).map((v) => v + 0))                      // each entry is the product of its headers
      expect(L.color).toBe(R.color); expect(L.color).toBe(cols[(i + j) % 4])                                                                              // identical colour pattern
    }
    const phi = [0, 1, 2, 3].map((k) => names[k]); expect(new Set(phi).size).toBe(4); expect(phi).toEqual(['1', 'i', '−1', '−i'])                              // k ↦ iᵏ is a bijection
    let power: [number, number] = [1, 0]; for (let k = 0; k < 4; k++) { expect(cx(names[k])).toEqual(power.map((v) => v + 0)); power = mul(power, [0, 1]) }
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) expect(cx(names[(a + b) % 4])).toEqual(mul(cx(names[a]), cx(names[b])).map((v) => v + 0))        // φ(a + b) = φ(a) φ(b)
    expect(new Set([0, 1, 2, 3].map((k) => head(0, k, true).color)).size).toBe(4); expect(texts(s)).toEqual(expect.arrayContaining(['plus mod 4', 'powers of i', 'same colour pattern', 'isomorphic']))
  })

  it('Group action: the 8 symmetries of the drawn square (found from its corner coordinates) send corner 1 to all 4 corners (green dots), only 2 of them fix it (the identity and the reflection in the violet diagonal), and 4 × 2 = 8', () => {
    const s = M.buildGroupActionScene(), corners = [0, 1, 2, 3].map((k) => M.actCorner(k) as number[]), key = (p: number[]) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`, set = new Set(corners.map(key))
    const transforms: Array<(p: number[]) => number[]> = [(p) => p, (p) => [-p[1], p[0]], (p) => [-p[0], -p[1]], (p) => [p[1], -p[0]], (p) => [p[0], -p[1]], (p) => [-p[0], p[1]], (p) => [p[1], p[0]], (p) => [-p[1], -p[0]]]
    const syms = transforms.filter((t) => corners.every((c) => set.has(key(t(c))))); expect(syms).toHaveLength(8)                                              // all 8 maps are symmetries of the drawn square
    ;[0, 1, 2, 3].forEach((k) => expect(dots(s, INK).some((d) => dist(d.position!, corners[k]) < 0.02)).toBe(true))
    const orbit = new Set(syms.map((t) => key(t(corners[0])))); const stab = syms.filter((t) => key(t(corners[0])) === key(corners[0])); expect([orbit.size, stab.length]).toEqual([4, 2])
    const green = dots(s, GREEN); expect(green).toHaveLength(4); green.forEach((d) => expect(orbit.has(key(d.position!))).toBe(true))                              // the green dots are the orbit
    const axis = bonds(s, VIOLET, 0.04)[0]; expect(distToLine(axis, corners[0])).toBeLessThan(0.02); expect(distToLine(axis, corners[2])).toBeLessThan(0.02)         // the violet line is the diagonal 1–3
    const reflect = stab.find((t) => key(t(corners[1])) !== key(corners[1]))!; expect(key(reflect(corners[1]))).toBe(key(corners[3])); expect(key(reflect(corners[2]))).toBe(key(corners[2]))   // it swaps 2 and 4, fixes 1 and 3
    expect(orbit.size * stab.length).toBe(syms.length)                                                                                                       // orbit-stabiliser
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('orbit'))!.text!)[0]).toBe(orbit.size); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('stabiliser'))!.text!)[0]).toBe(stab.length)
    expect(hasText(s, '4 × 2 = 8')).toBe(true); expect(evalLR('4 × 2 =')).toBe(syms.length); expect(numsIn(labelsOf(s).find((o) => /^\d+ symmetries$/.test(o.text!))!.text!)[0]).toBe(syms.length)
    ;[0, 1, 2, 3].forEach((k) => expect(labelAt(s, M.actLabel(k))?.text).toBe(String(k + 1)))
  })

  it('Symmetric group: the six wiring diagrams read back as six distinct bijections of {1, 2, 3} — exactly all 3! = 6 permutations, closed under composition and containing the identity — named e, r, q, s, t, u', () => {
    const s = M.buildSymmetricGroupScene(), lines = bonds(s, BLUE, 0.03); expect(lines).toHaveLength(18)
    const perms = [0, 1, 2, 3, 4, 5].map((idx) => [0, 1, 2].map((i) => { const l = lines.find((o) => dist(o.from!, M.symTop(idx, i)) < 0.02)!; return [0, 1, 2].find((j) => dist(l.to!, M.symBottom(idx, j)) < 0.02)! }))
    perms.forEach((p) => expect([...p].sort()).toEqual([0, 1, 2]))                                                                                          // each diagram is a bijection
    expect(new Set(perms.map((p) => p.join(''))).size).toBe(6); const all: number[][] = []; for (const a of [0, 1, 2]) for (const b of [0, 1, 2]) for (const c of [0, 1, 2]) if (new Set([a, b, c]).size === 3) all.push([a, b, c])
    expect(perms.map((p) => p.join('')).sort()).toEqual(all.map((p) => p.join('')).sort()); expect(perms.length).toBe(1 * 2 * 3)                                  // all 3! of them
    const key = (p: number[]) => p.join(''), set = new Set(perms.map(key)); for (const p of perms) for (const q of perms) expect(set.has(key([0, 1, 2].map((x) => p[q[x]])))).toBe(true); expect(set.has('012')).toBe(true)
    expect(key(perms[0])).toBe('012'); expect(perms.filter((p) => p.some((v, i) => v === i)).length).toBeGreaterThan(0)
    ;[0, 1, 2, 3, 4, 5].forEach((idx) => expect(labelAt(s, [M.SYM.cols[idx % 3], M.SYM.rows[Math.floor(idx / 3)] - 1.0])?.text).toBe(M.SYM.names[idx]))
    expect(numsIn(labelsOf(s).find((o) => o.text!.endsWith('permutations'))!.text!)[0]).toBe(6); expect(hasText(s, '3 × 2 × 1 = 6')).toBe(true); expect(evalLR('3 × 2 × 1 =')).toBe(6)
    expect(perms.filter((p) => p.filter((v, i) => v !== i).length === 2)).toHaveLength(3); expect(perms.filter((p) => p.filter((v, i) => v !== i).length === 3)).toHaveLength(2)   // 3 swaps, 2 rotations
  })

  it('Field extension: the drawn points are the integer pairs (a, b) = a + b√2, the violet point (1, 1) squares to the red point (3, 2) by (ac + 2bd, ad + bc), numerically (1 + √2)² = 3 + 2√2, and the two basis arrows give degree 2', () => {
    const s = M.buildFieldExtensionScene(), { ox, oy, u, aMax, bMax } = M.FEX, dd = (p: readonly number[]) => ({ a: Math.round(((p[0] - ox) / u) * 100) / 100, b: Math.round(((p[1] - oy) / u) * 100) / 100 })
    const grid = dots(s, SLATE).filter((d) => near(d.radius ?? 0, 0.08, 1e-9)).map((d) => dd(d.position!)); expect(grid).toHaveLength((aMax + 1) * (bMax + 1)); grid.forEach((g) => { expect(Number.isInteger(g.a)).toBe(true); expect(Number.isInteger(g.b)).toBe(true) })
    const P1 = dd(dots(s, VIOLET)[0].position!), Q = dd(dots(s, RED)[0].position!); expect([P1.a, P1.b]).toEqual([1, 1]); expect([Q.a, Q.b]).toEqual([3, 2])
    const mul = (x: { a: number; b: number }, y: { a: number; b: number }) => ({ a: x.a * y.a + 2 * x.b * y.b, b: x.a * y.b + x.b * y.a }); expect(mul(P1, P1)).toEqual(Q)                                // (a + b√2)(c + d√2)
    expect(Q.a + Q.b * Math.SQRT2).toBeCloseTo((P1.a + P1.b * Math.SQRT2) ** 2, 9)
    const basis = [...arrows(s, GREEN), ...arrows(s, BLUE)]; expect(basis).toHaveLength(2); const g = dd(arrows(s, GREEN)[0].to!), b = dd(arrows(s, BLUE)[0].to!); expect([g.a, g.b]).toEqual([1, 0]); expect([b.a, b.b]).toEqual([0, 1])
    expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('degree'))!.text!)[0]).toBe(basis.length)                                                      // degree = dimension = 2
    const parse = (t: string) => { const m = /^(\d+) \+ (\d*)√2$/.exec(t)!; return { a: Number(m[1]), b: m[2] === '' ? 1 : Number(m[2]) } }
    expect(parse(labelsOf(s).find((o) => o.text === '1 + √2')!.text!)).toEqual(P1); expect(parse(labelsOf(s).find((o) => o.text === '3 + 2√2')!.text!)).toEqual(Q)
    expect(hasText(s, '(1 + √2)² = 3 + 2√2')).toBe(true); expect(hasText(s, 'basis 1, √2')).toBe(true); expect(labelAt(s, [M.fexAt(1, 0)[0], M.fexAt(0, 0)[1] - 0.5])?.text).toBe('1')
  })

  it('Matrix: the numerals read back as the 2 × 3 matrix [[1, 2, 3], [4, 5, 6]] between two brackets, the labels give 2 rows, 3 columns and size 2 × 3 (6 entries), and the marked entry a₂₃ is 6', () => {
    const s = M.buildMatrixScene(), G = nums(readGrid(s, M.mtxAt, 2, 3)); expect(G).toEqual([[1, 2, 3], [4, 5, 6]]); expect(G.length * G[0].length).toBe(6)
    const br = bonds(s, SLATE, 0.05); expect(br).toHaveLength(6); const tall = br.filter((o) => near(o.from![0], o.to![0], 1e-6)); expect(tall).toHaveLength(2); expect(Math.min(...tall.map((o) => o.from![0]))).toBeLessThan(M.mtxAt(0, 0)[0]); expect(Math.max(...tall.map((o) => o.from![0]))).toBeGreaterThan(M.mtxAt(0, 2)[0])
    expect(numsIn(labelsOf(s).find((o) => o.text === '2 rows')!.text!)[0]).toBe(G.length); expect(numsIn(labelsOf(s).find((o) => o.text === '3 columns')!.text!)[0]).toBe(G[0].length); expect(numsIn(labelsOf(s).find((o) => o.text!.startsWith('size'))!.text!)).toEqual([G.length, G[0].length])
    const lab = labelsOf(s).find((o) => o.text!.startsWith('a'))!.text!, [r, c] = [...lab.split(' ')[0].slice(1)].map((ch) => SUB[ch]); expect([r, c]).toEqual([2, 3]); expect(G[r - 1][c - 1]).toBe(Number(lab.split('=')[1])); expect(G[r - 1][c - 1]).toBe(6)
    const mark = dots(s, GREEN)[0]; expect(dist(mark.position!, [M.mtxAt(r - 1, c - 1)[0] + 0.5, M.mtxAt(r - 1, c - 1)[1]])).toBeLessThan(0.02)                      // the green dot sits at that entry
    expect(readGrid(s, M.mtxAt, 2, 3).every((row) => row.every((l) => l.color === INK))).toBe(true)
  })

  it('Matrix addition: C is the entrywise sum of A and B for all four positions (recomputed from the drawn numerals), the top-right entries 2, 6, 8 are the green ones, and the caption 2 + 6 = 8 matches them', () => {
    const s = M.buildMatrixAdditionScene(), [A, B, C] = [0, 1, 2].map((m) => readGrid(s, (i, j) => M.madAt(m, i, j), 2, 2))
    expect([A, B, C].map(nums)).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[6, 8], [10, 12]]])
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) expect(Number(C[i][j].text), `(${i},${j})`).toBe(Number(A[i][j].text) + Number(B[i][j].text))
    ;[A, B, C].forEach((m) => m.forEach((row, i) => row.forEach((l, j) => expect(l.color).toBe(i === 0 && j === 1 ? GREEN : INK))))
    expect(hasText(s, '2 + 6 = 8')).toBe(true); expect(evalLR('2 + 6 =')).toBe(Number(C[0][1].text)); expect(Number(A[0][1].text) + Number(B[0][1].text)).toBe(Number(C[0][1].text))
    expect([A, B, C].every((m) => m.length === 2 && m[0].length === 2)).toBe(true); expect(labelAt(s, [-2.7, M.MAD.cy - M.MAD.dy / 2])?.text).toBe('+'); expect(labelAt(s, [-0.1, M.MAD.cy - M.MAD.dy / 2])?.text).toBe('=')
    expect(bonds(s, SLATE, 0.05)).toHaveLength(18); expect(hasText(s, 'add entry by entry')).toBe(true)
  })

  it('Matrix multiplication: the drawn C equals A × B computed independently (all four entries), the green row, red column and violet entry are row 1, column 1 and C₁₁, and 1 × 5 = 5, 2 × 7 = 14, 5 + 14 = 19 are exactly the dot product', () => {
    const s = M.buildMatrixMultiplicationScene(), [A, B, C] = [0, 1, 2].map((m) => readGrid(s, (i, j) => M.mmtAt(m, i, j), 2, 2)), a = nums(A), b = nums(B), c = nums(C)
    expect(a).toEqual([[1, 2], [3, 4]]); expect(b).toEqual([[5, 6], [7, 8]]); expect(c).toEqual(matMul(a, b)); expect(c).toEqual([[19, 22], [43, 50]])
    A.forEach((row, i) => row.forEach((l, j) => expect(l.color, `A${i}${j}`).toBe(i === 0 ? GREEN : INK))); B.forEach((row, i) => row.forEach((l, j) => expect(l.color, `B${i}${j}`).toBe(j === 0 ? RED : INK))); C.forEach((row, i) => row.forEach((l, j) => expect(l.color).toBe(i === 0 && j === 0 ? VIOLET : INK)))
    const rowA = A[0].map((l) => Number(l.text)), colB = B.map((r) => Number(r[0].text)), prods = rowA.map((v, k) => v * colB[k]); expect(prods).toEqual([5, 14]); expect(prods.reduce((t, v) => t + v, 0)).toBe(c[0][0])
    ;['1 × 5 = 5', '2 × 7 = 14', '5 + 14 = 19'].forEach((t) => { expect(hasText(s, t)).toBe(true); expect(evalLR(t)).toBe(Number(t.split('=')[1])) })
    expect(evalLR('1 × 5 =')).toBe(rowA[0] * colB[0]); expect(evalLR('2 × 7 =')).toBe(rowA[1] * colB[1]); expect(c[0][0]).toBe(19)
    expect(matMul(b, a)).not.toEqual(matMul(a, b))                                                                                                          // AB ≠ BA in general
    expect(a[0].length).toBe(b.length); expect(labelAt(s, [-2.7, M.MMT.cy - M.MMT.dy / 2])?.text).toBe('×'); expect(labelAt(s, [-0.1, M.MMT.cy - M.MMT.dy / 2])?.text).toBe('=')
  })

  it('Matrix transpose: the drawn Aᵀ (3 × 2) has (Aᵀ)ᵢⱼ = Aⱼᵢ for every entry of the drawn A (2 × 3), the colours follow each row of A into the matching column of Aᵀ, and transposing twice gives A back', () => {
    const s = M.buildMatrixTransposeScene(), Ag = readGrid(s, M.mtpA, 2, 3), Tg = readGrid(s, M.mtpT, 3, 2), A = nums(Ag), T = nums(Tg)
    expect(A).toEqual([[1, 2, 3], [4, 5, 6]]); expect(T).toEqual([[1, 4], [2, 5], [3, 6]]); expect([T.length, T[0].length]).toEqual([A[0].length, A.length])
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { expect(T[i][j], `T(${i},${j})`).toBe(A[j][i]); expect(Tg[i][j].color).toBe(Ag[j][i].color) }
    expect(Ag[0].every((l) => l.color === GREEN)).toBe(true); expect(Ag[1].every((l) => l.color === RED)).toBe(true)
    const back = T[0].map((_, j) => T.map((row) => row[j])); expect(back).toEqual(A)                                                                          // (Aᵀ)ᵀ = A
    expect(bonds(s, SLATE, 0.05)).toHaveLength(12); expect(arrows(s, SLATE)).toHaveLength(1); ;['A', 'Aᵀ', 'transpose', 'rows become columns'].forEach((t) => expect(hasText(s, t)).toBe(true))
  })

  it('Symmetric matrix: the drawn 3 × 3 matrix equals its own transpose entry by entry, mirror entries share a colour and the three pairs have three different colours, and the diagonal 1, 4, 6 is white', () => {
    const s = M.buildSymmetricMatrixScene(), G = readGrid(s, M.smmAt, 3, 3), m = nums(G)
    expect(m).toEqual([[1, 2, 3], [2, 4, 5], [3, 5, 6]]); const T = m[0].map((_, j) => m.map((row) => row[j])); expect(T).toEqual(m)                              // A = Aᵀ
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { expect(m[i][j]).toBe(m[j][i]); expect(G[i][j].color).toBe(G[j][i].color); if (i === j) expect(G[i][j].color).toBe(INK) }
    const pairColours = [[0, 1], [0, 2], [1, 2]].map(([i, j]) => G[i][j].color); expect(new Set(pairColours).size).toBe(3); expect(pairColours).not.toContain(INK)
    expect(m.length).toBe(m[0].length); expect(m[0][1] === m[1][0] && m[0][2] === m[2][0] && m[1][2] === m[2][1]).toBe(true)
    expect(bonds(s, SLATE, 0.05)).toHaveLength(6); expect(hasText(s, 'A = Aᵀ')).toBe(true); expect(hasText(s, 'mirror pairs share a colour')).toBe(true)
  })
})
