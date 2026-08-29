/**
 * The animation layer — motion that carries information, and nothing else.
 *
 * THE RULE THIS MODULE ENFORCES. Every animation it offers must answer "what
 * does the learner understand better because this moves?" — so an animation is
 * not a property a scene switches on, it is a CLAIM the engine has to justify
 * from the scene's own data. Two of the three kinds below are offered only
 * after the engine has checked, by running the real builder, that the motion
 * actually changes the figure. A sweep that would produce 30 identical frames
 * is not offered at all.
 *
 * ── THE THREE KINDS, AND WHY THESE ────────────────────────────────────────
 *   trace   a path object is walked from start to finish. The information is
 *           the ORDER and the RATE: a trajectory drawn all at once shows where
 *           a body goes, tracing it shows when. Offered only for a path the
 *           scene draws as content, never for reference geometry.
 *   sweep   a numeric variable is driven across its range and the figure is
 *           RE-DERIVED at every frame by the generator's own builder. This is
 *           the animation the parametric layer uniquely makes possible, and it
 *           is exact by construction: no frame is interpolated, so no frame can
 *           be physically wrong. It is the difference between being told torque
 *           depends on the angle and watching it vanish at zero.
 *   stages  the authored teaching stages advance in order. The information is
 *           the sequence the author staged, which a learner otherwise has to
 *           click through to discover.
 *
 * ── WHAT IS NOT HERE ───────────────────────────────────────────────────────
 * No easing curves on decorative properties, no camera fly-throughs, no
 * entrance effects. Those move without telling the learner anything.
 *
 * Pure. No React, no three.js, no timers — this module decides WHAT may move
 * and computes the figure at a given progress; the component owns the clock.
 */

import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, roleOf } from '@/lib/teaching/sceneGenerators/visualDesign'
import { rebuildScene, type SceneParams, type SceneVariable } from './parametricScenes'

export type AnimationKind = 'trace' | 'sweep' | 'stages'

export interface SceneAnimation {
  kind: AnimationKind
  /** Stable within a scene, so a running animation survives a re-render. */
  id: string
  /** The control's label. */
  label: string
  /**
   * What the motion communicates. REQUIRED, and shown to the learner beside the
   * control — an animation that cannot state what it teaches has no business
   * being offered, and stating it in text is also what makes the animation
   * usable by someone who never sees it move.
   */
  teaches: string
  /** One full pass, in milliseconds. */
  durationMs: number
  /** `sweep` only: the variable being driven, and its span. */
  variable?: { key: string; from: number; to: number; step: number }
  /** `trace` only: the path object being walked. */
  objectId?: string
}

/** A full pass. Slow enough to read, short enough to watch twice. */
const TRACE_MS = 2600
const SWEEP_MS = 3200
const STAGE_MS = 1800

/** The fewest points a path needs before walking it reads as motion. */
const MIN_TRACE_POINTS = 8

/**
 * Paths the scene draws as CONTENT. Reference geometry — a grid line, an axis,
 * a construction aid — is excluded: tracing it animates the scaffolding rather
 * than the subject, which is motion that teaches nothing.
 */
function traceablePaths(spec: SceneSpec): SceneObject[] {
  return spec.steps
    .flatMap((s) => s.objects)
    .filter((o) => (o.type === 'path' || o.type === 'trajectory')
      && (o.points?.length ?? 0) >= MIN_TRACE_POINTS
      && o.id
      && roleOf(o.color) !== 'reference')
}

/**
 * A cheap, exact fingerprint of what a figure LOOKS like.
 *
 * Used to answer "would this sweep change anything?" without rendering. Only
 * geometry and stated text count — an id or a colour that differs is not a
 * visible change worth animating.
 */
export function figureFingerprint(spec: SceneSpec): string {
  return spec.steps
    .flatMap((s) => s.objects)
    .map((o) => [
      o.type,
      o.position?.join(','), o.from?.join(','), o.to?.join(','),
      o.points?.length, o.points?.[o.points.length - 1]?.join(','),
      o.text,
    ].join('|'))
    .join(';')
}

/**
 * Which animations this figure can honestly offer.
 *
 * `variables` comes from the parametric registry; pass an empty list for a
 * scene with no variables and only `trace`/`stages` are considered.
 */
export function availableAnimations(
  spec: SceneSpec,
  variables: readonly SceneVariable[] = [],
): SceneAnimation[] {
  const out: SceneAnimation[] = []

  for (const path of traceablePaths(spec)) {
    out.push({
      kind: 'trace',
      id: `trace:${path.id}`,
      label: 'Play the motion',
      teaches: 'the order and the pace — where the body is at each moment, not just the shape of its route',
      durationMs: TRACE_MS,
      objectId: path.id,
    })
    break // One trace. Two moving markers at once is noise, not information.
  }

  // A sweep is offered ONLY once the engine has checked that it changes the
  // figure. This is the rule "animate only when motion communicates the
  // concept", computed rather than asserted.
  const kind = spec.parametric?.kind
  if (kind) {
    for (const v of variables) {
      if (v.kind !== 'number') continue
      if (!sweepChangesFigure(kind, spec.parametric!.params, v)) continue
      out.push({
        kind: 'sweep',
        id: `sweep:${v.key}`,
        label: `Sweep ${v.label}`,
        teaches: v.effect,
        durationMs: SWEEP_MS,
        variable: { key: v.key, from: v.min, to: v.max, step: v.step },
      })
    }
  }

  if (spec.steps.length > 1) {
    out.push({
      kind: 'stages',
      id: 'stages',
      label: 'Play the stages',
      teaches: 'the order the parts were meant to be met in',
      durationMs: STAGE_MS * spec.steps.length,
    })
  }

  return out
}

/**
 * Does driving this variable actually change the picture?
 *
 * Rebuilds at both ends of the range and compares. Three of the registered
 * generators have a variable that legitimately leaves the drawing untouched —
 * a ratio the figure normalises away — and offering a sweep there would be a
 * control that appears to do nothing.
 */
function sweepChangesFigure(kind: string, params: SceneParams, v: SceneVariable): boolean {
  if (v.kind !== 'number') return false
  const low = rebuildScene(kind, { ...params, [v.key]: v.min })
  const high = rebuildScene(kind, { ...params, [v.key]: v.max })
  if (!low || !high) return false
  return figureFingerprint(low) !== figureFingerprint(high)
}

/**
 * The figure at a point in a sweep, re-derived — never interpolated.
 *
 * The value is snapped to the variable's own step grid, so every frame is a
 * value the learner could have set by hand and every frame is a real solution.
 * Returns null when the generator refuses that value; the caller keeps the last
 * good figure, exactly as it does for a slider.
 */
export function sweepFrame(
  spec: SceneSpec,
  animation: SceneAnimation,
  progress: number,
): { spec: SceneSpec; value: number } | null {
  const kind = spec.parametric?.kind
  const v = animation.variable
  if (!kind || !v) return null

  const t = Math.min(1, Math.max(0, progress))
  const raw = v.from + (v.to - v.from) * t
  const snapped = v.step > 0 ? Math.round(raw / v.step) * v.step : raw
  // Floating-point step arithmetic drifts; round to the step's own precision.
  const decimals = (String(v.step).split('.')[1] ?? '').length
  const value = Number(snapped.toFixed(decimals))

  const next = rebuildScene(kind, { ...spec.parametric!.params, [v.key]: value })
  return next ? { spec: next, value } : null
}

/**
 * The moving marker for a trace, as an ordinary scene object the renderer
 * already knows how to draw.
 *
 * Keeping the playhead in the object vocabulary is what stops the animation
 * needing a renderer of its own: the component draws the same scene it always
 * did, plus one more node. `null` when the path is missing or too short, so a
 * scene that changes under a running animation degrades to no marker rather
 * than to a marker in the wrong place.
 */
export function tracePlayhead(
  spec: SceneSpec,
  objectId: string | undefined,
  progress: number,
): SceneObject | null {
  if (!objectId) return null
  const path = spec.steps.flatMap((s) => s.objects).find((o) => o.id === objectId)
  const points = path?.points
  if (!points || points.length < 2) return null

  const t = Math.min(1, Math.max(0, progress))
  const exact = t * (points.length - 1)
  const i = Math.min(points.length - 2, Math.floor(exact))
  const f = exact - i
  const a = points[i]
  const b = points[i + 1]

  return {
    type: 'node',
    id: '__playhead',
    position: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f],
    // The result colour: the playhead IS the answer to "where is it now?".
    color: ROLE.result,
    radius: Math.max(0.18, (path?.radius ?? 0.1) * 2.6),
  }
}

/**
 * The objects visible during a trace: everything up to the marker, so the path
 * DRAWS ITSELF rather than sitting there complete while a dot slides along it.
 * The already-travelled part is what carries the sense of elapsed time.
 */
export function traceObjects(
  objects: SceneObject[],
  objectId: string | undefined,
  progress: number,
): SceneObject[] {
  if (!objectId) return objects
  return objects.map((o) => {
    if (o.id !== objectId || !o.points || o.points.length < 2) return o
    const upTo = Math.max(2, Math.ceil(Math.min(1, Math.max(0, progress)) * o.points.length))
    return { ...o, points: o.points.slice(0, upTo) }
  })
}

/** The stage a `stages` animation is showing at this progress (1-based). */
export function stageAt(spec: SceneSpec, progress: number): number {
  const total = Math.max(1, spec.steps.length)
  const t = Math.min(0.9999, Math.max(0, progress))
  return Math.min(total, Math.floor(t * total) + 1)
}
