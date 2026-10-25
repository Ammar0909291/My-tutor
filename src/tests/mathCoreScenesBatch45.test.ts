/**
 * Mathematics visual campaign, batch 45 (2026-10-20): Green's theorem (math.calc.greens-theorem). The concept was served NO figure.
 * Every number the figure states is re-derived here from the DRAWN arrows, never from the generator's constants alone: the blue path
 * is a closed counter-clockwise square of area 1 (shoelace), the line integral of the DRAWN red field arrows along each DRAWN edge is
 * 0, 1, 1, 0 (total 2), the curl integrand is 2 by finite differences, and 2 × the drawn area equals the circulation.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { complexityFor, isGlyphLabel } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import * as M from '@/lib/teaching/sceneGenerators/mathCoreScenesB45'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const RED = '#ef4444', BLUE = '#3b82f6', GREEN = '#22c55e', VIOLET = '#a78bfa', SLATE = '#94a3b8', INK = '#e2e8f0'
const arrows = (s: SceneSpec, color: string) => objs(s).filter((o) => o.type === 'arrow' && o.color === color && o.from && o.to)
const labelsOf = (s: SceneSpec) => objs(s).filter((o) => o.type === 'label')
const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol

const scene = M.buildGreensTheoremScene()
/** screen -> math units */
const mx = (x: number) => (x - M.GR.cx) / M.GR.u
const my = (y: number) => (y - M.GR.cy) / M.GR.u
const path = arrows(scene, BLUE)
const verts = path.map((a) => [mx(a.from![0]), my(a.from![1])] as [number, number])
const FIELD = (x: number, y: number): [number, number] => [-y, x]

describe("math.calc.greens-theorem is served its own figure, as a figure OF the concept", () => {
  it.each([null, 'diagram'] as const)('resolves to the Green scene (request: %s)', (req) => {
    const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: 'math.calc.greens-theorem', learnerRequest: req, subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    expect(d.graphical, d.provenance).toBe(true)
    expect(d.asset?.scope).toBe('concept')
    expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('math-greens-theorem')
    expect(isRetiredVisualBinding('math.calc.greens-theorem')).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.calc.greens-theorem')).toBe(false)
  })
})

describe('the figure is well-formed (math.calc.greens-theorem)', () => {
  it('passes the scene validator and the figure audit that admits a figure to a learner', () => {
    const v = validateSceneSpec(scene) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: scene } as never)).toEqual([])
  })
  it('keeps every coordinate inside ±5, fits the label budget and stays under 50 objects per step', () => {
    for (const o of objs(scene)) for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
      expect(Math.abs(p[0])).toBeLessThanOrEqual(5); expect(Math.abs(p[1])).toBeLessThanOrEqual(5)
    }
    const named = labelsOf(scene).filter((o) => !isGlyphLabel(o as never))
    expect(named.length).toBeGreaterThan(0); expect(named.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    for (const st of scene.steps) expect(st.objects.length).toBeLessThanOrEqual(50)
  })
  it('has three cumulative steps with narration, only role colours and a framing camera', () => {
    expect(scene.steps).toHaveLength(3)
    for (const st of scene.steps) expect((st.narration ?? '').length).toBeGreaterThan(20)
    const roles = new Set([SLATE, INK, RED, BLUE, VIOLET, GREEN])
    for (const o of objs(scene)) if (o.color) expect(roles.has(o.color.toLowerCase())).toBe(true)
    expect(scene.cameraDistance!).toBeGreaterThanOrEqual(7); expect(scene.cameraDistance!).toBeLessThanOrEqual(13)
    expect(scene.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(1000)
  })
})

describe("the mathematics the figure draws (math.calc.greens-theorem)", () => {
  it('the boundary C is four head-to-tail arrows closing a square of side 1, traversed counter-clockwise (positive shoelace area 1)', () => {
    expect(path).toHaveLength(4)
    for (let i = 0; i < 4; i++) {   // head of each arrow is the tail of the next
      expect(near(path[i].to![0], path[(i + 1) % 4].from![0])).toBe(true)
      expect(near(path[i].to![1], path[(i + 1) % 4].from![1])).toBe(true)
    }
    let a2 = 0
    for (let i = 0; i < 4; i++) { const [x0, y0] = verts[i], [x1, y1] = verts[(i + 1) % 4]; a2 += x0 * y1 - x1 * y0 }
    expect(near(a2 / 2, 1, 0.01)).toBe(true)                // signed area +1: counter-clockwise, area 1
    for (const [x, y] of verts) { expect([0, 1].some((v) => near(x, v, 0.01))).toBe(true); expect([0, 1].some((v) => near(y, v, 0.01))).toBe(true) }
  })

  it('the red arrows are F = (−y, x) at the middle of each edge', () => {
    const field = arrows(scene, RED)
    expect(field).toHaveLength(4)
    for (const a of field) {
      const [x, y] = [mx(a.from![0]), my(a.from![1])]
      const [fx, fy] = FIELD(x, y)
      expect(near((a.to![0] - a.from![0]) / M.FIELD_SCALE, fx, 0.02)).toBe(true)
      expect(near((a.to![1] - a.from![1]) / M.FIELD_SCALE, fy, 0.02)).toBe(true)
    }
  })

  it('the line integral of the DRAWN field along each DRAWN edge is 0, 1, 1, 0 — the numbers beside the edges — and they add to 2', () => {
    const per = path.map((a, i) => {
      const [x0, y0] = verts[i], [x1, y1] = verts[(i + 1) % 4]
      const steps = 400; let t = 0
      for (let k = 0; k < steps; k++) {   // numerical ∫ F·dr along the segment
        const u = (k + 0.5) / steps, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u
        const [fx, fy] = FIELD(px, py); t += (fx * (x1 - x0) + fy * (y1 - y0)) / steps
      }
      return t
    })
    expect(per.map((v) => Math.round(v * 1000) / 1000)).toEqual([0, 1, 1, 0])
    expect(per.reduce((s, v) => s + v, 0)).toBeCloseTo(2, 6)
    expect(M.circulation()).toBeCloseTo(2, 10)
    // the value marks sit beside their own edge: below, right, above, left
    const marks = labelsOf(scene).filter((l) => ['0', '1'].includes(l.text ?? '') && l.color === BLUE).map((l) => [mx(l.position![0]), my(l.position![1]), l.text] as const)
    expect(marks).toHaveLength(4)
    const [bottom, right, top, left] = marks
    expect(bottom[1]).toBeLessThan(0); expect(bottom[2]).toBe('0')
    expect(right[0]).toBeGreaterThan(1); expect(right[2]).toBe('1')
    expect(top[1]).toBeGreaterThan(1); expect(top[2]).toBe('1')
    expect(left[0]).toBeLessThan(0); expect(left[2]).toBe('0')
    expect(labelsOf(scene).some((l) => l.text === 'circulation = 0 + 1 + 1 + 0 = 2')).toBe(true)
  })

  it('the curl integrand ∂Q/∂x − ∂P/∂y of F = (−y, x) is 2 (finite differences), and 2 × the drawn area equals the circulation', () => {
    const h = 1e-5, x = 0.4, y = 0.7
    const dQ = (FIELD(x + h, y)[1] - FIELD(x - h, y)[1]) / (2 * h), dP = (FIELD(x, y + h)[0] - FIELD(x, y - h)[0]) / (2 * h)
    expect(dQ - dP).toBeCloseTo(2, 5)
    expect(M.curlIntegrand()).toBe(2)
    expect(M.fluxOfCurl()).toBe(M.circulation())
    // the four green dots stand inside the drawn square
    const dots = objs(scene).filter((o) => o.type === 'node' && o.color === GREEN)
    expect(dots).toHaveLength(4)
    for (const d of dots) { expect(mx(d.position![0])).toBeGreaterThan(0); expect(mx(d.position![0])).toBeLessThan(1); expect(my(d.position![1])).toBeGreaterThan(0); expect(my(d.position![1])).toBeLessThan(1) }
    const t = labelsOf(scene).map((l) => l.text)
    expect(t).toContain('∂Q/∂x − ∂P/∂y = 2'); expect(t).toContain('2 × area 1 = 2')
  })

  // Mutation checks: figures that LOOK like Green's theorem but state something false.
  it('a clockwise path is caught by the orientation check (negative shoelace area)', () => {
    const rev = [...verts].reverse()
    let a2 = 0
    for (let i = 0; i < 4; i++) { const [x0, y0] = rev[i], [x1, y1] = rev[(i + 1) % 4]; a2 += x0 * y1 - x1 * y0 }
    expect(a2 / 2).toBeLessThan(0)
  })
  it('a different field (F = (x, 0)) would not give circulation 2, so the stated total is tied to the field drawn', () => {
    let t = 0
    for (let i = 0; i < 4; i++) { const [x0, y0] = verts[i], [x1, y1] = verts[(i + 1) % 4]; t += ((x0 + x1) / 2) * (x1 - x0) + 0 * (y1 - y0) }
    expect(Math.abs(t - 2)).toBeGreaterThan(1)
  })
})
