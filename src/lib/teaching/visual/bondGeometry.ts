/**
 * Multiple-bond geometry (R2) — pure.
 *
 * A `bond` SceneObject with `properties.order` of 2 or 3 is drawn as that many PARALLEL sticks, so a learner sees O=C=O
 * and not two single lines. The order lives in the spec (the chemistry audit reads the same `properties.order` to check
 * valence), and the renderer only turns it into geometry — nothing else about a bond changes, and an object with no
 * `order` (or 1) is drawn exactly as before.
 */
import type { Vec3 } from '@/lib/teaching/sceneSpec'

/** Distance between neighbouring sticks of a multiple bond, in scene units (atoms are ~0.5 radius, bonds ~8 long). */
export const MULTI_BOND_SPACING = 0.28

/** The bond order a spec declares: an integer 1–3, else 1. */
export function bondOrderOf(properties: Record<string, unknown> | undefined): 1 | 2 | 3 {
  const n = properties?.order
  return n === 2 || n === 3 ? n : 1
}

/**
 * The [from, to] pairs to draw for a bond of this order — centred on the bond axis, offset along one direction
 * perpendicular to it (the z axis, or y for a bond that runs along z). Order 1 returns the bond itself, byte-identical.
 */
export function parallelBondEnds(from: Vec3, to: Vec3, order: 1 | 2 | 3, spacing: number = MULTI_BOND_SPACING): Array<[Vec3, Vec3]> {
  if (order === 1) return [[from, to]]
  const d = [to[0] - from[0], to[1] - from[1], to[2] - from[2]]
  const len = Math.hypot(d[0], d[1], d[2])
  if (!(len > 0)) return [[from, to]]
  const u = [d[0] / len, d[1] / len, d[2] / len]
  // Offset axis: z unless the bond runs (nearly) along z, then y.
  const ref = Math.abs(u[2]) > 0.9 ? [0, 1, 0] : [0, 0, 1]
  const c = [u[1] * ref[2] - u[2] * ref[1], u[2] * ref[0] - u[0] * ref[2], u[0] * ref[1] - u[1] * ref[0]]
  const cl = Math.hypot(c[0], c[1], c[2]) || 1
  const p = [c[0] / cl, c[1] / cl, c[2] / cl]
  const offsets = order === 2 ? [-spacing / 2, spacing / 2] : [-spacing, 0, spacing]
  return offsets.map((o) => [
    [from[0] + p[0] * o, from[1] + p[1] * o, from[2] + p[2] * o] as Vec3,
    [to[0] + p[0] * o, to[1] + p[1] * o, to[2] + p[2] * o] as Vec3,
  ])
}
