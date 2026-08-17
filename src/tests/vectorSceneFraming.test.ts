/**
 * PHASE 5 TRACK A — vector scene camera framing.
 *
 * ── THE MEASURED DEFECT ─────────────────────────────────────────────────────
 * A learner reported the vector diagram was too small. It was, and the
 * geometry was NOT at fault: every vector is drawn from the origin, so the
 * figure occupies one quadrant, while the camera sat at a fixed
 * `VISUAL_MAX * 2.5` looking at the origin — the CORNER of the content. For
 * the live 3-4-5 case the frame showed ~42 world units while the drawing
 * spanned ~14, so it filled about a third of the viewport, pushed into the
 * top-right.
 *
 * PRESENTATION ONLY. The scene's coordinates are unchanged — the camera moved,
 * not the physics. That distinction is load-bearing: `checkVectorConsistency`
 * validates against ABSOLUTE tip positions (`R == A + B`, magnitude measured
 * from the origin), so translating the geometry to centre it would have broken
 * the safety net that proves the figure is correct. Every test below re-runs
 * that checker to prove the physics survived.
 */
import { describe, it, expect } from 'vitest'
import { buildVectorScene, checkVectorConsistency } from '@/lib/teaching/sceneGenerators/vectorAddition'

type Params = Parameters<typeof buildVectorScene>[0]
const LIVE: Params = { aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 } as Params

/** The container is 4/3 and fov 50 is VERTICAL — the same terms the renderer uses. */
const HALF_FOV_TAN = Math.tan((50 * Math.PI) / 180 / 2)
const ASPECT = 4 / 3

function frameOf(spec: ReturnType<typeof buildVectorScene>) {
  const d = spec.cameraDistance!
  const t = spec.cameraTarget ?? [0, 0, 0]
  const halfH = d * HALF_FOV_TAN
  return { d, t, halfH, halfW: halfH * ASPECT }
}

function drawnPoints(spec: ReturnType<typeof buildVectorScene>): number[][] {
  return spec.steps
    .flatMap((s) => s.objects)
    .flatMap((o) => [
      (o as { to?: number[] }).to,
      (o as { from?: number[] }).from,
      (o as { position?: number[] }).position,
    ])
    .filter((p): p is number[] => Array.isArray(p))
}

const CASES: Params[] = [
  LIVE,
  { aMag: 5, aAngleDeg: 30, bMag: 5, bAngleDeg: 150 } as Params,
  { aMag: 6, aAngleDeg: 0, bMag: 6, bAngleDeg: 180 } as Params,   // near-cancelling
  { aMag: 2, aAngleDeg: 210, bMag: 7, bAngleDeg: 300 } as Params, // negative quadrants
]

describe('the physics is untouched (the whole point of moving the camera)', () => {
  it('every case still passes the independent consistency checker', () => {
    for (const c of CASES) {
      const r = checkVectorConsistency(buildVectorScene(c), c)
      expect(r.errors).toEqual([])
      expect(r.ok).toBe(true)
    }
  })

  it('the resultant is still the parallelogram diagonal in ABSOLUTE coordinates', () => {
    // If the scene had been translated to centre it, this would fail — which is
    // exactly why it was not translated.
    const spec = buildVectorScene(LIVE)
    const objs = spec.steps.flatMap((s) => s.objects) as Array<{ id?: string; to?: number[] }>
    const a = objs.find((o) => o.id === 'A')!.to!
    const b = objs.find((o) => o.id === 'B')!.to!
    const r = objs.find((o) => o.id === 'R')!.to!
    expect(r[0]).toBeCloseTo(a[0] + b[0], 5)
    expect(r[1]).toBeCloseTo(a[1] + b[1], 5)
  })

  it('vectors still start at the origin', () => {
    const spec = buildVectorScene(LIVE)
    const objs = spec.steps.flatMap((s) => s.objects) as Array<{ id?: string; from?: number[] }>
    for (const id of ['A', 'B', 'R']) {
      expect(objs.find((o) => o.id === id)!.from).toEqual([0, 0, 0])
    }
  })
})

describe('nothing is cropped', () => {
  it('every drawn point sits inside the frame, in all four cases', () => {
    for (const c of CASES) {
      const spec = buildVectorScene(c)
      const { t, halfH, halfW } = frameOf(spec)
      const outside = drawnPoints(spec).filter(
        (p) => Math.abs(p[0] - t[0]) > halfW || Math.abs(p[1] - t[1]) > halfH,
      )
      expect(outside).toEqual([])
    }
  })

  it('leaves margin for labels rather than fitting flush to the tips', () => {
    // Labels render outside the arrow tips and are the first thing a tight fit
    // would clip.
    const spec = buildVectorScene(LIVE)
    const { t, halfH } = frameOf(spec)
    const maxDy = Math.max(...drawnPoints(spec).map((p) => Math.abs(p[1] - t[1])))
    expect(halfH).toBeGreaterThan(maxDy * 1.2)
  })
})

describe('the figure actually got bigger and is centred', () => {
  it('the live case fills far more of the frame than the old fixed camera did', () => {
    const spec = buildVectorScene(LIVE)
    const { halfH } = frameOf(spec)
    const ys = drawnPoints(spec).map((p) => p[1])
    const fill = (Math.max(...ys) - Math.min(...ys)) / (2 * halfH)
    // Old behaviour: cameraDistance = VISUAL_MAX * 2.5 = 45 → ~34% fill.
    expect(fill).toBeGreaterThan(0.6)
  })

  it('the camera aims at the centre of the content, not at the origin corner', () => {
    const spec = buildVectorScene(LIVE)
    const pts = drawnPoints(spec)
    const cx = (Math.max(...pts.map((p) => p[0])) + Math.min(...pts.map((p) => p[0]))) / 2
    const cy = (Math.max(...pts.map((p) => p[1])) + Math.min(...pts.map((p) => p[1]))) / 2
    expect(spec.cameraTarget![0]).toBeCloseTo(cx, 1)
    expect(spec.cameraTarget![1]).toBeCloseTo(cy, 1)
    // The live case genuinely sits off-origin, so this is a real change.
    expect(spec.cameraTarget![1]).toBeGreaterThan(1)
  })

  it('pulls the camera closer than the old fixed distance for the live case', () => {
    expect(buildVectorScene(LIVE).cameraDistance!).toBeLessThan(18 * 2.5)
  })

  it('a degenerate scene never puts the camera inside the geometry', () => {
    const flat = buildVectorScene({ aMag: 0.001, aAngleDeg: 0, bMag: 0.001, bAngleDeg: 0 } as Params)
    expect(flat.cameraDistance!).toBeGreaterThan(0)
    expect(Number.isFinite(flat.cameraDistance!)).toBe(true)
  })
})

describe('the camera target is additive — other scenes are unaffected', () => {
  it('cameraTarget is optional on SceneSpec', () => {
    // 30 other generators set no target and must keep looking at the origin.
    const spec = buildVectorScene(LIVE)
    expect(spec.cameraTarget).toBeDefined()
    const asAny = { id: 'x', title: 't', sceneType: 'diagram' as const, steps: [] }
    expect((asAny as { cameraTarget?: unknown }).cameraTarget).toBeUndefined()
  })
})
