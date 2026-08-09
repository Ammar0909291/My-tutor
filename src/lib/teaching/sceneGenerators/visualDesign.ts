/**
 * Educational scene design system (M4.1).
 *
 * The M4 pilot proved the pipeline; browser inspection then showed the figures
 * were engineering diagrams rather than teaching diagrams — one flat 11px text
 * size, a palette invented per scene, and labels placed wherever there was room.
 * This module is the shared vocabulary that fixes that, so seven scenes share
 * one visual language instead of seven.
 *
 * ── COLOUR IS SEMANTIC, NEVER DECORATIVE ────────────────────────────────────
 * Each role below means the same thing in every figure: red is always the
 * driving/incoming quantity, blue is always what leaves or receives, violet is
 * always a construction aid, slate is always inert apparatus. A learner who
 * reads two of these diagrams has already learned the colour language.
 *
 * ── COLOUR IS NEVER THE ONLY CHANNEL ────────────────────────────────────────
 * Red/green is the common colour-vision confusion, and both appear here, so no
 * educationally important distinction may rest on hue alone. Every contrast in
 * the pilot is carried by at least two channels:
 *   TIR                three cases are numbered ①②③ and hit the boundary at
 *                      three separate points
 *   interference       constructive vs destructive are separate panels with
 *                      word headings, and differ in geometry (tall wave vs
 *                      flat line)
 *   viscosity          thick vs thin are separate panels with word headings,
 *                      and differ in arrow LENGTH
 *   first law          Q and W differ in direction (in vs out) and in label
 *   surface tension    bulk vs surface molecule differ in position and in the
 *                      number of force arrows drawn
 *
 * ── TEXT IS RATIONED ────────────────────────────────────────────────────────
 * The canvas carries names ("normal", "crest", "heat in"). Explanations belong
 * in the tutor's prose, which the contract feeds from these same labels. A
 * figure that has to be read sentence by sentence has already failed.
 */

import type { SceneObject, Vec3 } from '@/lib/teaching/sceneSpec'

// ── semantic palette ─────────────────────────────────────────────────────────
// Tuned for the dark canvas the renderer paints on. Nothing darker than
// slate-400 appears: dark ink on this background renders as invisible text,
// which is how a figure ends up describing parts nobody can see.

export const ROLE = {
  /** Inert apparatus and reference geometry: boundaries, walls, plates, axes. */
  reference: '#94a3b8',
  /** Body text and neutral naming. */
  ink: '#e2e8f0',
  /** The driving / incoming / hot quantity: incident ray, heat in, hot body. */
  input: '#ef4444',
  /** What leaves or receives: work out, refracted ray, water, the second wave. */
  output: '#3b82f6',
  /** Construction aids the physics is measured against: the normal, gradients. */
  aid: '#a78bfa',
  /** The result, the key relationship, the contrast case. */
  result: '#22c55e',
} as const

// ── typographic tiers ────────────────────────────────────────────────────────
// Three sizes, not one. `size` is a multiplier the renderer applies to its base
// label size; omitting it (every pre-M4.1 scene) leaves rendering unchanged.

export const TIER = {
  /** Panel heading — the one thing to read first. */
  heading: 1.75,
  /** A named object or a key relationship. */
  primary: 1.4,
  /** Supporting annotation, units, formulae. */
  detail: 1.15,
} as const

export type Tier = keyof typeof TIER

// ── primitives ───────────────────────────────────────────────────────────────

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}

/** A text label. Tier drives size and weight; keep the text to a NAME. */
export function label(text: string, position: Vec3, color: string = ROLE.ink, tier: Tier = 'detail'): SceneObject {
  return { type: 'label', position, text, color, size: TIER[tier] }
}

/** A heading for a panel or a case. */
export function heading(text: string, position: Vec3, color: string = ROLE.ink): SceneObject {
  return label(text, position, color, 'heading')
}

/**
 * A directed quantity. Text is optional and usually omitted: an arrow's label
 * renders at its midpoint, which collides with the arrow itself and with any
 * neighbouring arrow, so name arrows with a separate label() placed clear of
 * the geometry.
 */
export function arrow(from: Vec3, to: Vec3, color: string = ROLE.ink, text?: string): SceneObject {
  return { type: 'arrow', from, to, ...(text ? { text } : {}), color, thickness: 0.055 }
}

/**
 * A straight construction line (boundary, wall, tube side, plate).
 *
 * Takes NO text: SceneSpecRenderer draws `bond` as a bare cylinder and never
 * paints a label on it, so text here would be described to the tutor by the
 * contract and never shown to the learner — the precise mismatch this whole
 * programme exists to prevent. Name a line with a separate label() beside it.
 */
export function line(from: Vec3, to: Vec3, color: string = ROLE.reference, thickness = 0.045): SceneObject {
  return { type: 'bond', from, to, color, thickness }
}

/**
 * A sampled curve. SceneSpecRenderer draws `path` as a MARKER PER POINT, not as
 * a stroked polyline, so this is only correct for densely sampled curves — a
 * two-point "path" renders as two dots and reads as nothing at all. Straight
 * segments must use line(), which is drawn as a solid cylinder.
 */
export function curve(points: Vec3[], color: string, text?: string): SceneObject {
  if (points.length < 8) {
    throw new Error('curve() needs a densely sampled path; use line() for straight segments')
  }
  return { type: 'path', points, ...(text ? { text } : {}), color }
}

/** A marked point or a body. Text is optional; prefer a separate label(). */
export function dot(position: Vec3, color: string, radius = 0.16, text?: string): SceneObject {
  return { type: 'node', position, ...(text ? { text } : {}), color, radius }
}

/** A sampled sine curve — the only curve shape the pilot needs. */
export function sinePath(opts: {
  x0: number; x1: number; amplitude: number; wavelength: number
  yOffset?: number; phase?: number; samples?: number
}): Vec3[] {
  const { x0, x1, amplitude, wavelength, yOffset = 0, phase = 0, samples = 56 } = opts
  const pts: Vec3[] = []
  for (let i = 0; i <= samples; i++) {
    const x = x0 + ((x1 - x0) * i) / samples
    const y = yOffset + amplitude * Math.sin((2 * Math.PI * (x - x0)) / wavelength + phase)
    pts.push([round(x), round(y), 0])
  }
  return pts
}

/** A closed rectangle drawn as four construction lines. */
export function box(x0: number, y0: number, x1: number, y1: number, color: string = ROLE.reference): SceneObject[] {
  return [
    line([x0, y0, 0], [x1, y0, 0], color),
    line([x1, y0, 0], [x1, y1, 0], color),
    line([x1, y1, 0], [x0, y1, 0], color),
    line([x0, y1, 0], [x0, y0, 0], color),
  ]
}

/**
 * Hatching along a horizontal edge — reads as "insulated" or "fixed" without
 * needing a word for it, the same shorthand a textbook uses.
 */
export function hatch(x0: number, x1: number, y: number, count: number, height: number, color: string = ROLE.reference): SceneObject[] {
  const out: SceneObject[] = []
  for (let i = 0; i < count; i++) {
    const x = x0 + ((x1 - x0) * i) / Math.max(1, count - 1)
    out.push(line([round(x), y, 0], [round(x - height * 0.6), round(y - height), 0], color, 0.025))
  }
  return out
}
