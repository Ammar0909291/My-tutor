/**
 * How freely a scene may be orbited.
 *
 * A figure whose every object lies in one plane (a graph, the complex plane, a lever and its force) is a DRAWING that happens to be
 * on a 3D canvas. Turning it a quarter-turn shows nothing new — it just edge-ons the drawing — and each label's position was solved
 * for the authored camera, so after a turn the text overlaps and clips. Such a scene gets a limited orbit (see ThreeDVisual's
 * `orbit="limited"`); a scene with real depth (a helix, a molecule) keeps the free one. Both get a "Reset view" control.
 *
 * Pure. No React, no three.js.
 */
import type { SceneObject, SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'

const EPS = 1e-6

function vec3sOf(o: SceneObject): Vec3[] {
  const out: Vec3[] = []
  if (o.position) out.push(o.position)
  if (o.from) out.push(o.from)
  if (o.to) out.push(o.to)
  if (o.points) out.push(...o.points)
  return out
}

/** True when every coordinate the scene draws (across ALL its steps) shares one z — the scene is a flat drawing. */
export function isPlanarScene(spec: Pick<SceneSpec, 'steps'>): boolean {
  let z: number | null = null
  for (const step of spec.steps) {
    for (const obj of step.objects) {
      for (const v of vec3sOf(obj)) {
        if (z === null) z = v[2]
        else if (Math.abs(v[2] - z) > EPS) return false
      }
    }
  }
  return true
}

export function orbitFor(spec: Pick<SceneSpec, 'steps'>): 'free' | 'limited' {
  return isPlanarScene(spec) ? 'limited' : 'free'
}
