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
// ROLE holds each role's DARK-THEME value, and is also the wire format: a
// scene stores these hexes in `obj.color`, so a scene is authored once and is
// identical in both themes. The theme is applied at RENDER time by
// themeColor() below — see ROLE_LIGHT.
//
// Nothing darker than slate-400 appears here: dark ink on the dark canvas
// renders as invisible text, which is how a figure ends up describing parts
// nobody can see.

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

export type Role = keyof typeof ROLE

// ── the same roles, readable on a light surface ──────────────────────────────
//
// THE DEFECT THIS CLOSES. Every role above was chosen against `--bg-surface`
// in dark (#161B22) and baked into the scene at generation time. The figure
// surface is themed (`var(--bg-surface)`, #F6F8FA in light) but the ink was
// not, so switching to day theme painted #e2e8f0 text on a #F6F8FA panel:
// measured 1.09:1, i.e. invisible. Reproduced in Chromium before this fix —
// "air · rarer, n₂" and "glass · denser, n₁" were unreadable in Total Internal
// Reflection while the coloured rays survived.
//
// These are the SAME six roles, not a second palette: red still means the
// driving/incoming quantity in both themes, violet is still a construction
// aid. Only the luminance flips, so the colour language a learner has already
// learned still holds when they change the theme. Every value clears 4.5:1
// against the light surface (#F6F8FA) — asserted in
// src/tests/visualThemeTokens.test.ts, which computes the ratios rather than
// trusting this comment.
export const ROLE_LIGHT: Record<Role, string> = {
  reference: '#475569',   // slate-600  — apparatus reads as grey, not as ink
  ink:       '#0f172a',   // slate-900  — body text
  input:     '#b91c1c',   // red-700
  output:    '#1d4ed8',   // blue-700
  aid:       '#6d28d9',   // violet-700
  result:    '#15803d',   // green-700  — green-500 is 1.9:1 on white
}

/** Which role a stored colour represents, or null when it is not one of ours. */
export function roleOf(color: string | null | undefined): Role | null {
  if (!color) return null
  const hex = color.toLowerCase()
  for (const [role, value] of Object.entries(ROLE) as [Role, string][]) {
    if (value.toLowerCase() === hex) return role
  }
  return null
}

/**
 * Resolve a stored scene colour for the theme being rendered.
 *
 * The one function the renderer calls. A colour that belongs to the semantic
 * palette is mapped role-wise; anything else (pre-M4.1 scenes, generator
 * defaults) is returned untouched, so no existing figure changes.
 *
 * Pure and synchronous — the same scene payload therefore serves both themes,
 * which is what keeps one asset per concept and keeps a restored figure
 * byte-identical to the live one.
 */
export function themeColor(
  color: string | null | undefined,
  theme: 'dark' | 'light',
): string | undefined {
  if (!color) return undefined
  if (theme !== 'light') return color
  const role = roleOf(color)
  return role ? ROLE_LIGHT[role] : color
}

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
