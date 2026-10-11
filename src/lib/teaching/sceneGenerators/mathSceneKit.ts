/**
 * Shared drawing helpers for the mathematics visual campaign (batch 2 onward).
 *
 * Pure geometry on top of visualDesign.ts: no colours of its own, no state. The
 * batch-1 module (mathCoreScenesB1.ts) carries private copies of a few of these;
 * they are left untouched so batch 1 stays byte-identical.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, line } from './visualDesign'
import { frameReport, TARGET_FRAME_FILL } from '@/lib/teaching/visual/layout'

export type V3 = [number, number, number]
export type XY = [number, number]
export const r2 = (n: number) => Math.round(n * 100) / 100
export const P = (x: number, y: number): V3 => [r2(x), r2(y), 0]
export const NO_STAGE = { grid: false, axes: false } as const

/**
 * Pull the camera in so a flat 2-D figure fills about 78% of the frame (the same
 * target layout.ts uses). Pure: only cameraDistance changes.
 */
export function framed(spec: SceneSpec): SceneSpec {
  const probe = frameReport({ ...spec, cameraDistance: 13 })
  if (!probe.fill) return spec
  const d = Math.min(13, Math.max(7, Math.round((13 * probe.fill / TARGET_FRAME_FILL) * 10) / 10))
  return { ...spec, cameraDistance: d }
}

/** Sample y = fn(x) over [x0, x1], mapped through map(x, y) -> screen point. */
export function sampleMapped(fn: (x: number) => number, x0: number, x1: number, map: (x: number, y: number) => V3, n = 72): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    pts.push(map(x, fn(x)))
  }
  return pts
}

/** A thin line (the renderer draws cylinders, so thin = guide). */
export const guide = (a: V3, b: V3, color: string = ROLE.aid, t = 0.02): SceneObject => line(a, b, color, t)

/** Two perpendicular axes (arrows) crossing at (cx, cy). */
export function axes2(cx: number, cy: number, x0: number, x1: number, y0: number, y1: number): SceneObject[] {
  return [arrow(P(x0, cy), P(x1, cy), ROLE.reference), arrow(P(cx, y0), P(cx, y1), ROLE.reference)]
}

/**
 * Axes through the mapped origin: x from math-x0 to x1, y from math-y0 to y1,
 * mapped through the same function as the figure so the pair stays centred.
 */
export function mathAxes(map: (x: number, y: number) => V3, x0: number, x1: number, y0: number, y1: number): SceneObject[] {
  const o = map(0, 0)
  return axes2(o[0], o[1], map(x0, 0)[0], map(x1, 0)[0], map(0, y0)[1], map(0, y1)[1])
}

/** Closed polygon outline. */
export function polyLines(pts: XY[], color: string, t = 0.05): SceneObject[] {
  const out: SceneObject[] = []
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length]
    out.push(line(P(a[0], a[1]), P(b[0], b[1]), color, t))
  }
  return out
}

/** Horizontal-scanline hatching of a CONVEX polygon (spacing `gap` in screen units). */
export function shadeConvex(poly: XY[], gap: number, color: string, t = 0.022): SceneObject[] {
  const ys = poly.map((p) => p[1])
  const y0 = Math.min(...ys), y1 = Math.max(...ys)
  const out: SceneObject[] = []
  for (let y = y0 + gap / 2; y < y1; y += gap) {
    const xs: number[] = []
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length]
      if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) * (b[0] - a[0])) / (b[1] - a[1]))
    }
    if (xs.length >= 2) {
      const xa = Math.min(...xs), xb = Math.max(...xs)
      if (xb - xa > 0.02) out.push(line(P(xa, y), P(xb, y), color, t))
    }
  }
  return out
}

/** Points along a circular arc about (cx, cy), angles in degrees counter-clockwise from +x. */
export function arcPts(cx: number, cy: number, r: number, a0: number, a1: number, n = 24): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180
    pts.push(P(cx + r * Math.cos(a), cy + r * Math.sin(a)))
  }
  return pts
}

/** Right-angle square marker at (vx, vy) between unit directions d1 and d2, side s. */
export function rightAngleMark(vx: number, vy: number, d1: XY, d2: XY, s: number, color: string, t = 0.03): SceneObject[] {
  const a: XY = [vx + d1[0] * s, vy + d1[1] * s]
  const b: XY = [vx + (d1[0] + d2[0]) * s, vy + (d1[1] + d2[1]) * s]
  const c: XY = [vx + d2[0] * s, vy + d2[1] * s]
  return [line(P(a[0], a[1]), P(b[0], b[1]), color, t), line(P(b[0], b[1]), P(c[0], c[1]), color, t)]
}

/** A ">" chevron on a horizontal line, the standard "these lines are parallel" mark. */
export function chevron(x: number, y: number, color: string, h = 0.13, w = 0.15, t = 0.03): SceneObject[] {
  return [line(P(x - w, y + h), P(x, y), color, t), line(P(x, y), P(x - w, y - h), color, t)]
}

/** Faint grid lines at every integer from (gx0, gy0) to (gx1, gy1), mapped through map(x, y). */
export function gridLines(gx0: number, gx1: number, gy0: number, gy1: number, map: (x: number, y: number) => V3, color: string = ROLE.reference, t = 0.012): SceneObject[] {
  const out: SceneObject[] = []
  for (let x = gx0; x <= gx1; x++) out.push(line(map(x, gy0), map(x, gy1), color, t))
  for (let y = gy0; y <= gy1; y++) out.push(line(map(gx0, y), map(gx1, y), color, t))
  return out
}
