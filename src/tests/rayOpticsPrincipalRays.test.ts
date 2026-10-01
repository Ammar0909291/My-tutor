import { describe, expect, it } from 'vitest'
import { buildRayOpticsScene, type OpticsType } from '@/lib/teaching/sceneGenerators/rayOptics.pure'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'

/**
 * The ray diagram's rays must obey optics, not just be drawn (real-learner run
 * 2026-09-29: the lens figure had no rays at all). Checked independently of how
 * the rays are constructed: the textbook rule that the ray arriving parallel to
 * the axis leaves through (or, for a virtual image, appears to come from) the
 * focal point, and that the ray through the pole/centre and the parallel ray
 * meet at the image top.
 */
const objs = (s: ReturnType<typeof buildRayOpticsScene>) => s.steps.flatMap((x) => x.objects)
const collinear = (a: number[], b: number[], c: number[]) =>
  Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) < 0.05 * Math.max(1, Math.hypot(b[0] - a[0], b[1] - a[1]) * Math.hypot(c[0] - a[0], c[1] - a[1]))

const CASES: Array<[OpticsType, number, number]> = [
  ['convex_lens', 30, 10], ['convex_lens', 8, 10], ['concave_lens', 20, 10],
  ['concave_mirror', 30, 10], ['concave_mirror', 6, 10], ['convex_mirror', 20, 10],
]

describe('principal rays on every ray-optics figure', () => {
  it.each(CASES)('%s u=%d f=%d: the parallel ray goes through the focus, and the rays meet at the image', (opticsType, u, f) => {
    const scene = buildRayOpticsScene({ opticsType, objectDistance: u, focalLength: f, objectHeight: 5 })
    expect(validateSceneSpec(scene).valid).toBe(true)
    const o = objs(scene)
    const parallel = o.find((x) => x.id === 'light-ray-parallel')!.points!
    const focus = o.find((x) => x.id === 'focus')!.position!
    const image = o.find((x) => x.id === 'image')!.to!
    const hit = parallel[1]
    const out = parallel[2]
    // The ray arriving parallel to the axis: its outgoing line (or backward extension) passes through F.
    expect(collinear(hit, out, focus)).toBe(true)
    // …and through the image top.
    expect(collinear(hit, out, image)).toBe(true)
    // The ray through the pole also passes through the image top.
    const centre = o.find((x) => x.id === 'light-ray-through-centre')!.points!
    expect(collinear(centre[1], centre[2], image)).toBe(true)
  })

  it('a virtual image is reached only by the grey backward extensions, never by a drawn light ray', () => {
    const virt = objs(buildRayOpticsScene({ opticsType: 'convex_lens', objectDistance: 8, focalLength: 10, objectHeight: 5 }))
    expect(virt.filter((x) => x.id.startsWith('virtual-extension'))).toHaveLength(2)
    const real = objs(buildRayOpticsScene({ opticsType: 'convex_lens', objectDistance: 30, focalLength: 10, objectHeight: 5 }))
    expect(real.filter((x) => x.id.startsWith('virtual-extension'))).toHaveLength(0)
  })

  it('draws as a flat diagram, with no 3D floor grid or axis triad', () => {
    expect(buildRayOpticsScene({ opticsType: 'convex_lens', objectDistance: 30, focalLength: 10, objectHeight: 5 }).stage)
      .toEqual({ grid: false, axes: false })
  })
})
