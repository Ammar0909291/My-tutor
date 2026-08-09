/**
 * Layout safety — the engine's viewport model.
 *
 * WHY THIS EXISTS. A SceneSpec positions everything in scene units, and the
 * renderer draws geometry through a perspective camera — so geometry scales
 * with the container. Labels do not: `SceneSpecRenderer` draws them through
 * drei's `<Html>` at a fixed pixel size. Measured in Chromium against the real
 * renderer, every label box is byte-identical at 1280px, 768px and 390px
 * (a 15-character label is 70px wide at all three) while the drawing area
 * shrinks from 992x520 to 282x260.
 *
 * The consequence is structural, not cosmetic: as the container narrows, label
 * DENSITY rises until labels collide with each other. That is invisible to
 * every existing check — `sceneSpecValidator` bounds coordinates (a
 * hallucination guard), and nothing anywhere models what a label will occupy
 * once drawn.
 *
 * Measured on the seven M4 pilot figures before this module existed:
 *
 *   1280px  0 collisions      768px  0 collisions      390px  5 collisions
 *
 * across four of the seven. So this is a real, reproducible defect that an
 * author had no way to see, and no way to avoid re-introducing.
 *
 * WHAT THIS IS NOT. It is not a renderer, not a second layout engine, and it
 * does not move anything. It is a deterministic PREDICATE over a SceneSpec:
 * given a viewport, will this figure be legible? Authors and tests call it;
 * the resolver and the renderer do not, and nothing here can alter a figure.
 *
 * Pure arithmetic. No DOM, no React, no three.js, no I/O.
 */

import type { SceneSpec, SceneObject, Vec3 } from '@/lib/teaching/sceneSpec'

/**
 * Drawing-area sizes measured from the real chat surface in Chromium, at the
 * three widths the engine must support. These are the CANVAS host boxes, not
 * the browser viewport: the figure sits inside the chat column, and the
 * renderer applies `aspectRatio: 4/3` with `minHeight: 260px` and
 * `maxHeight: min(520px, 60vh)` — which is why the mobile box is 282x260
 * rather than 4:3.
 */
export interface Viewport {
  name: 'desktop' | 'tablet' | 'mobile'
  /** Browser viewport width this host was measured at. */
  browserWidth: number
  hostWidth: number
  hostHeight: number
}

export const VIEWPORTS: readonly Viewport[] = [
  { name: 'desktop', browserWidth: 1280, hostWidth: 992, hostHeight: 520 },
  { name: 'tablet',  browserWidth: 768,  hostWidth: 660, hostHeight: 495 },
  { name: 'mobile',  browserWidth: 390,  hostWidth: 282, hostHeight: 260 },
]

/** Camera field of view, mirroring ThreeDVisual's `camera={{ fov: 50 }}`. */
const FOV_RADIANS = (50 * Math.PI) / 180

/** Default camera distance when a scene does not state one (ThreeDVisual's own default). */
const DEFAULT_CAMERA_DISTANCE = 12

/**
 * Label box geometry, calibrated against Chromium.
 *
 * Measured: 6 chars -> 32px, 15 chars -> 70px, 18 chars -> 97px, all at the
 * rendered 16px size. That is 4.7-5.4px per character; 5.6 is used so the
 * model over-estimates slightly. A layout checker that under-estimates passes
 * figures that then collide in a learner's hands, so the error is deliberately
 * one-directional.
 */
const CHAR_WIDTH_PX = 5.6
const LINE_HEIGHT_PX = 16

/**
 * RESPONSIVE LABEL METRICS — the model of what SceneLabel actually paints.
 *
 * The single constant above was calibrated when labels were a fixed 16px, and
 * it was measured from TRUNCATED sample strings, so it under-counted characters
 * and came out too small. Re-measured in Chromium against the real renderer at
 * 390px: "rest position" 13 chars -> 82px, "crest" 5 -> 41px,
 * "one wavelength λ" 16 -> 144px. Against each label's own font size that is a
 * consistent 0.59-0.64 px per character per px of font.
 *
 * An under-estimating model is the worst kind here: the solver believes a label
 * fits, places it, and the learner sees it hang off the canvas — which is
 * exactly what was still happening on mobile after the solver landed. 0.62 sits
 * at the top of the measured range so the model errs wide.
 *
 * These mirror SceneLabel's own clamp(FLOOR, IDEAL_VW, CEILING) scaled by tier.
 * If that declaration changes, these change with it.
 */
const FONT_FLOOR_PX = 10
const FONT_IDEAL_VW = 1.05
const FONT_CEILING_PX = 15
/**
 * Width per character, per px of font size, measured in Chromium against the
 * real rendered font (weight 800, the app's own stack) at 1280px and 390px.
 * The ratio is viewport-independent, as it must be — it is a font property:
 *
 *   lowercase ascii   0.570      greek  λ θ μ ρ Ω      0.567
 *   subscripts/digits 0.552      symbols ≈ ° ± → ⊥     0.569
 *   equation          0.580      mixed with λ and ≈    0.631
 *   sentence case     0.604      UPPERCASE             0.716
 *
 * The expected culprits were wrong: Greek letters and symbols are among the
 * NARROWEST glyphs in this face. UPPERCASE is the outlier, ~15% wider than the
 * flat 0.62 the model used, which is why figures with headings like
 * "CONSTRUCTIVE" and "AT THE SURFACE" were the ones still overflowing.
 *
 * So width is modelled from the string's own character mix rather than one
 * constant. BASE covers every measured non-uppercase class with margin; the
 * uppercase term scales with how much of the string is actually uppercase.
 * Generic by construction — it reads characters, never concepts.
 */
const WIDTH_BASE_RATIO = 0.64
const WIDTH_UPPERCASE_EXTRA = 0.10

/** Fraction of a string that is uppercase — the one glyph class that is wider. */
function uppercaseFraction(text: string): number {
  if (!text.length) return 0
  let upper = 0
  for (const ch of text) if (ch >= 'A' && ch <= 'Z') upper++
  return upper / text.length
}

/** Modelled width per character for THIS string, per px of font size. */
function widthRatioFor(text: string): number {
  return WIDTH_BASE_RATIO + WIDTH_UPPERCASE_EXTRA * uppercaseFraction(text)
}
/**
 * Line height as a multiple of font size. Exported because a WRAPPED label
 * must be painted with exactly this ratio: the browser's own `normal` measured
 * 1.5 here, and a box 10% taller than the one the solver reserved is a box
 * that overlaps the label above it.
 */
export const LABEL_LINE_HEIGHT_RATIO = 1.35
const LINE_HEIGHT_RATIO = LABEL_LINE_HEIGHT_RATIO

/** The px size SceneLabel resolves to for this tier at this viewport. */
function fontPxFor(viewport: Viewport, tier?: number): number {
  const scale = typeof tier === 'number' && tier > 0 ? Math.min(tier, 3) : 1
  const ideal = (FONT_IDEAL_VW * scale * viewport.browserWidth) / 100
  return Math.min(Math.max(ideal, FONT_FLOOR_PX * scale), FONT_CEILING_PX * scale)
}

/**
 * Fraction of the canvas a single line of label may occupy before it wraps.
 *
 * A label WIDER THAN THE CANVAS cannot be placed at all: every candidate
 * position overflows, so the solver keeps the authored spot and the text is
 * cut off by the container. Measured on the VisualCard corpus, two captions
 * are in exactly that position at every viewport — 69 characters against a
 * 330px canvas. Wrapping is the only fix that keeps every word: shrinking
 * would cross the readability floor and shortening would rewrite teaching
 * text, and both are forbidden.
 */
const MAX_LINE_FRACTION = 0.92

/**
 * How wide one line of this label may be here, or null when it fits already.
 *
 * Exported so the RENDERER can constrain the same label to the same width the
 * solver reserved for it. Two different answers would put the text back where
 * the model cannot see it.
 */
export function labelWrapWidth(text: string, viewport: Viewport, tier?: number): number | null {
  const fontPx = fontPxFor(viewport, tier)
  const singleLine = text.length * widthRatioFor(text) * fontPx
  const available = viewport.hostWidth * MAX_LINE_FRACTION
  return singleLine > available ? available : null
}

/** The box that text will occupy, from its own resolved font size. */
function labelExtent(text: string, viewport: Viewport, tier?: number): { halfW: number; halfH: number } {
  const fontPx = fontPxFor(viewport, tier)
  const singleLine = text.length * widthRatioFor(text) * fontPx
  const wrapAt = labelWrapWidth(text, viewport, tier)
  if (wrapAt === null) {
    return { halfW: singleLine / 2, halfH: (fontPx * LINE_HEIGHT_RATIO) / 2 }
  }
  // Count the lines the browser will actually produce, by laying the words out
  // the way it does. Dividing total width by line width instead would be a
  // guess in the WRONG direction here: over-stating a wrapped label's height
  // makes the solver believe there is nowhere to put it, and an unplaceable
  // label is left overlapping — the exact failure this is meant to prevent.
  const perChar = widthRatioFor(text) * fontPx
  let lines = 1
  let lineWidth = 0
  for (const word of text.split(/\s+/)) {
    const wordWidth = word.length * perChar
    const withSpace = lineWidth === 0 ? wordWidth : lineWidth + perChar + wordWidth
    if (withSpace > wrapAt && lineWidth > 0) {
      lines++
      lineWidth = wordWidth
    } else {
      lineWidth = withSpace
    }
  }
  return { halfW: wrapAt / 2, halfH: (lines * fontPx * LINE_HEIGHT_RATIO) / 2 }
}

/** A label object's typographic tier; `size` means an extent on every other type. */
function tierOf(object: SceneObject): number | undefined {
  return object.type === 'label' ? object.size : undefined
}

/**
 * `SceneSpecRenderer` sets `whiteSpace: 'nowrap'`, so a label never wraps —
 * its width grows without bound with its text. Modelled exactly as rendered.
 */
export interface LabelBox {
  text: string
  left: number
  right: number
  top: number
  bottom: number
}

export type LayoutViolation =
  | { kind: 'out-of-bounds'; text: string; overhangPx: number; edge: 'left' | 'right' | 'top' | 'bottom' }
  | { kind: 'label-collision'; text: string; otherText: string; overlapPx: number }

export interface LayoutReport {
  viewport: Viewport['name']
  labelCount: number
  violations: LayoutViolation[]
  ok: boolean
}

/** Scene units per screen pixel, from the perspective camera at the z = 0 plane. */
function pixelsPerUnit(viewport: Viewport, cameraDistance: number): number {
  const halfHeightWorld = Math.tan(FOV_RADIANS / 2) * cameraDistance
  return viewport.hostHeight / (2 * halfHeightWorld)
}

/**
 * Every object that will paint text, with the anchor it paints at and the
 * object it came from, in a STABLE order.
 *
 * Exported because the renderer zips the solver's output back onto these
 * objects by index to recover each label's colour and tier. One ordering,
 * shared by the model and the renderer, so the two cannot drift apart.
 */
export function sceneTextObjects(scene: SceneSpec): { text: string; position: Vec3; object: SceneObject }[] {
  const out: { text: string; position: Vec3; object: SceneObject }[] = []
  for (const step of scene.steps ?? []) {
    for (const obj of step.objects ?? []) {
      const text = (obj.text ?? '').trim()
      if (!text) continue
      const position = anchorOf(obj)
      if (position) out.push({ text, position, object: obj })
    }
  }
  return out
}

/**
 * Where an object's text is drawn. A label carries `position`; a vector, arrow
 * or bond labels its midpoint, which is what the renderer does.
 */
function anchorOf(obj: SceneObject): Vec3 | null {
  if (obj.position) return obj.position
  if (obj.from && obj.to) {
    return [
      (obj.from[0] + obj.to[0]) / 2,
      (obj.from[1] + obj.to[1]) / 2,
      (obj.from[2] + obj.to[2]) / 2,
    ]
  }
  if (obj.points?.length) return obj.points[Math.floor(obj.points.length / 2)]
  return null
}

/**
 * Project a scene into the label boxes the browser will actually paint.
 * Exported so a test can compare the model against real measurements.
 */
export function projectLabelBoxes(scene: SceneSpec, viewport: Viewport): LabelBox[] {
  const scale = pixelsPerUnit(viewport, scene.cameraDistance ?? DEFAULT_CAMERA_DISTANCE)
  const cx = viewport.hostWidth / 2
  const cy = viewport.hostHeight / 2

  return sceneTextObjects(scene).map(({ text, position, object }) => {
    // drei's <Html center> centres the box on its anchor.
    const screenX = cx + position[0] * scale
    const screenY = cy - position[1] * scale
    const { halfW, halfH } = labelExtent(text, viewport, tierOf(object))
    return {
      text,
      left: screenX - halfW,
      right: screenX + halfW,
      top: screenY - halfH,
      bottom: screenY + halfH,
    }
  })
}

/** Pixels by which two boxes overlap (0 when they do not). */
function overlapArea(a: LabelBox, b: LabelBox): number {
  const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
  const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
  return w > 0 && h > 0 ? Math.round(w * h) : 0
}

/**
 * Will this figure read correctly at this viewport?
 *
 * Deterministic and side-effect free. Two failure kinds, both of which a
 * learner experiences directly: text pushed outside the drawing area, and text
 * printed on top of other text.
 */
export function checkSceneLayout(scene: SceneSpec, viewport: Viewport): LayoutReport {
  // Evaluate what the learner will ACTUALLY see. The renderer runs the
  // placement solver, so checking authored anchors would be checking a
  // position no one is shown — the model and the runtime must agree.
  const placement = placeSceneLabels(scene, viewport)
  const tiers = sceneTextObjects(scene).map(({ object }) => tierOf(object))
  const boxes: LabelBox[] = placement.labels.map((l, i) => {
    const { halfW, halfH } = labelExtent(l.text, viewport, tiers[i])
    return { text: l.text, left: l.x - halfW, right: l.x + halfW, top: l.y - halfH, bottom: l.y + halfH }
  })
  const violations: LayoutViolation[] = []

  for (const box of boxes) {
    if (box.left < 0) {
      violations.push({ kind: 'out-of-bounds', text: box.text, overhangPx: Math.round(-box.left), edge: 'left' })
    }
    if (box.right > viewport.hostWidth) {
      violations.push({ kind: 'out-of-bounds', text: box.text, overhangPx: Math.round(box.right - viewport.hostWidth), edge: 'right' })
    }
    if (box.top < 0) {
      violations.push({ kind: 'out-of-bounds', text: box.text, overhangPx: Math.round(-box.top), edge: 'top' })
    }
    if (box.bottom > viewport.hostHeight) {
      violations.push({ kind: 'out-of-bounds', text: box.text, overhangPx: Math.round(box.bottom - viewport.hostHeight), edge: 'bottom' })
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const area = overlapArea(boxes[i], boxes[j])
      if (area > 0) {
        violations.push({
          kind: 'label-collision',
          text: boxes[i].text,
          otherText: boxes[j].text,
          overlapPx: area,
        })
      }
    }
  }

  return { viewport: viewport.name, labelCount: boxes.length, violations, ok: violations.length === 0 }
}

/**
 * Check a figure at every supported viewport. This is the authoring gate: a
 * new concept's figure must pass here before it can be considered done, so
 * "it looked fine on my laptop" stops being how mobile legibility is decided.
 */
export function checkSceneLayoutAllViewports(scene: SceneSpec): LayoutReport[] {
  return VIEWPORTS.map((viewport) => checkSceneLayout(scene, viewport))
}

/** True when a figure is legible at every supported viewport. */
export function isLayoutSafe(scene: SceneSpec): boolean {
  return checkSceneLayoutAllViewports(scene).every((report) => report.ok)
}

// ── Framing ──────────────────────────────────────────────────────────────────
/**
 * THE FRAMING CONTRACT.
 *
 * Measured failure this exists to close (production, Vector Addition, the
 * `vector` generator's canonical 3-4-5 figure):
 *
 *   geometry   x[0, 10.8]  y[0, 14.4]      span 10.8 x 14.4
 *   camera     distance 45               visible 56.0 x 42.0
 *   fill       19.3% of width, 34.3% of height, 6.6% of area
 *   centre     centroid (5.4, 7.2) against a frame centred on (0, 0)
 *
 * The payload was CORRECT — A(3) at 0°, B(4) at 90°, B moved tip-to-tail, and
 * R(5), each labelled, with narration matching the tutor's words exactly. The
 * renderer drew precisely what it was given. The figure was nonetheless
 * unreadable, because it was drawn at 6.6% of the frame's area, pushed into one
 * quadrant, leaving 93% of the canvas empty. Thin lines and vanishing labels
 * are symptoms of that one cause.
 *
 * It is not one generator's mistake. Each scene builder picks `cameraDistance`
 * independently, from constants with no relation to the geometry it just
 * produced (`VISUAL_MAX * 2.5`, `Math.max(qMax, price) * 2.5`, and one literal
 * 500). Measured across the whole corpus, 20 of 36 scenes fill under half their
 * frame. Nothing in the engine ever compared the two numbers.
 *
 * `layout.ts` already owned "will this figure read at this viewport" for label
 * boxes; framing is the same question about the geometry, so it belongs here
 * rather than in a new module.
 */

/** A figure should occupy at least this fraction of its frame's larger axis. */
export const MIN_FRAME_FILL = 0.5

/** What `fitSceneToFrame` aims for — comfortably filled, with breathing room. */
export const TARGET_FRAME_FILL = 0.78

export interface FrameReport {
  /** Fraction of the frame spanned by the geometry, on its better axis. */
  fill: number
  /** Fraction of the frame's area covered by the geometry's bounding box. */
  areaFill: number
  /** How far the geometry's centroid sits from the frame centre, 0 = centred. */
  offCentre: number
  cameraDistance: number
  ok: boolean
}

interface Extent { minX: number; maxX: number; minY: number; maxY: number }

/** Bounding box of every drawable coordinate in the scene, or null when empty. */
function sceneExtent(scene: SceneSpec): Extent | null {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const step of scene.steps ?? []) {
    for (const obj of step.objects ?? []) {
      const points = [obj.position, obj.from, obj.to, ...(obj.points ?? [])].filter(Boolean) as Vec3[]
      for (const p of points) {
        minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0])
        minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1])
      }
    }
  }
  return minX > maxX ? null : { minX, maxX, minY, maxY }
}

/** Half-extents of the camera frustum at the z = 0 plane, for a 4:3 canvas. */
function frustum(cameraDistance: number): { halfW: number; halfH: number } {
  const halfH = Math.tan(FOV_RADIANS / 2) * cameraDistance
  return { halfW: halfH * (4 / 3), halfH }
}

/** Does this figure actually fill the frame it is drawn in? */
export function frameReport(scene: SceneSpec): FrameReport {
  const cameraDistance = scene.cameraDistance ?? DEFAULT_CAMERA_DISTANCE
  const extent = sceneExtent(scene)
  if (!extent) {
    return { fill: 0, areaFill: 0, offCentre: 0, cameraDistance, ok: false }
  }
  const { halfW, halfH } = frustum(cameraDistance)
  const fillW = (extent.maxX - extent.minX) / (2 * halfW)
  const fillH = (extent.maxY - extent.minY) / (2 * halfH)
  const offCentre = Math.max(
    Math.abs((extent.minX + extent.maxX) / 2) / halfW,
    Math.abs((extent.minY + extent.maxY) / 2) / halfH,
  )
  const fill = Math.max(fillW, fillH)
  return {
    fill,
    areaFill: fillW * fillH,
    offCentre,
    cameraDistance,
    ok: fill >= MIN_FRAME_FILL && offCentre <= 0.15,
  }
}

/**
 * Re-frame a scene so its own geometry fills the frame.
 *
 * Two operations, both information-preserving:
 *   1. a rigid TRANSLATION putting the geometry's centroid at the frame centre
 *      — every distance, angle and relationship is unchanged, because every
 *      coordinate moves by the same vector;
 *   2. a camera distance derived from the geometry's extent instead of from a
 *      constant.
 *
 * Nothing is scaled, nothing is reordered, no object is added or removed, and
 * no label is touched. A scene that already frames itself well is returned
 * UNCHANGED (same object identity), so well-composed figures — including the
 * seven hand-tuned M4 pilot figures, which measure 56-64% — are byte-identical.
 *
 * Subject-agnostic by construction: it reads coordinates, never concepts.
 */
export function fitSceneToFrame(scene: SceneSpec): SceneSpec {
  const before = frameReport(scene)
  if (before.ok || before.fill === 0) return scene

  const extent = sceneExtent(scene)
  if (!extent) return scene

  const cx = (extent.minX + extent.maxX) / 2
  const cy = (extent.minY + extent.maxY) / 2
  const spanX = extent.maxX - extent.minX
  const spanY = extent.maxY - extent.minY

  // Distance at which the larger span reaches TARGET_FRAME_FILL of its axis.
  const tan = Math.tan(FOV_RADIANS / 2)
  const neededForHeight = spanY / (2 * TARGET_FRAME_FILL * tan)
  const neededForWidth = spanX / (2 * TARGET_FRAME_FILL * tan * (4 / 3))
  const distance = Math.max(neededForHeight, neededForWidth)
  if (!Number.isFinite(distance) || distance <= 0) return scene

  const shift = (p: Vec3): Vec3 => [p[0] - cx, p[1] - cy, p[2]]

  return {
    ...scene,
    cameraDistance: Math.round(distance * 10) / 10,
    steps: (scene.steps ?? []).map((step) => ({
      ...step,
      objects: (step.objects ?? []).map((obj) => ({
        ...obj,
        ...(obj.position ? { position: shift(obj.position) } : {}),
        ...(obj.from ? { from: shift(obj.from) } : {}),
        ...(obj.to ? { to: shift(obj.to) } : {}),
        ...(obj.points ? { points: obj.points.map(shift) } : {}),
      })),
    })),
  }
}

// ── Label placement solver ───────────────────────────────────────────────────
/**
 * THE PLACEMENT CONTRACT.
 *
 * Typography is solved: labels are readable, theme-correct and never hidden.
 * What remained, measured in Chromium at 390px, is WHERE they sit — 8 labels
 * outside the 282px canvas and 7 overlapping another label.
 *
 * This solver adjusts POSITION ONLY. It never deletes, hides, replaces or
 * rewrites a label, never shrinks one below the readability floor, and never
 * changes what a label says. When it cannot find a safe spot it KEEPS the
 * authored position and reports the failure, so an unplaceable label is a
 * visible diagnostic rather than silently missing teaching information.
 *
 * ON GEOMETRY OWNERSHIP — the question this design had to answer honestly.
 * Measured across the corpus: 61 labels are carried BY a geometry object, so
 * their referent is intrinsic and needs no metadata. 116 are standalone `label`
 * objects carrying only a coordinate; SceneSpec has no field linking them to
 * geometry, and `id`/`properties` are used for diffing and generator-private
 * data, never for ownership.
 *
 * That gap does NOT block this work, and it is deliberately not filled by
 * guessing. Ownership would only be needed to PERMIT a label to overlap its own
 * referent — which is not wanted. Treating all geometry as an obstacle and
 * keeping the label near its authored anchor is both stricter and inference-free.
 * The authored anchor IS the association the author chose; bounding displacement
 * preserves it.
 */

/** Screen-space rectangle. */
interface Box { left: number; right: number; top: number; bottom: number }

/** A label after the solver has run. */
export interface PlacedLabel {
  text: string
  /** Where the author put it, in screen px. */
  anchorX: number
  anchorY: number
  /** Where it will actually be drawn, in screen px. */
  x: number
  y: number
  /** Displacement applied, in px. */
  movedPx: number
  /** False when no safe placement existed; the authored position is kept. */
  ok: boolean
  reason?: 'no-safe-placement'
}

export interface PlacementResult {
  labels: PlacedLabel[]
  /** Labels the solver could not place safely. Never hidden — reported. */
  unresolved: number
}

/**
 * How far a label may travel from its anchor before its referent becomes
 * ambiguous. Expressed as a fraction of the canvas's smaller side so it scales
 * with the surface instead of being a magic pixel count.
 *
 * MEASURED, not guessed. At 0.22 the densest 390px figures left 2 labels
 * unplaced and 5 violations; at 0.30 they reach zero. The space was always
 * there — total label area is only 26-38% of the canvas on those figures and
 * no label is wider than the canvas — the bound was simply too tight to reach
 * it. 0.30 is the smallest value that solves the corpus, and displacement is
 * still scored, so a label travels the minimum distance that works and one
 * whose anchor is already clear never moves at all.
 */
const MAX_DISPLACEMENT_FRACTION = 0.30

/** Clearance kept between a label and anything it must avoid. */
const PADDING_PX = 2

/**
 * Geometry-overlap scoring. The cap stops a dense sampled curve from
 * outweighing every other consideration; the weight sets how many pixels of
 * travel one unit of overlap is worth.
 *
 * RAISED 7 -> 20 on the VisualCard corpus. Those figures are denser than the
 * SceneSpec ones this was tuned against: inspected in Chromium at 390px, the
 * data-structure comparison put its "Stack — LIFO" caption across the ARRAY's
 * cells, because the few pixels of travel needed to clear them cost more than
 * the overlap did. At 20 every caption in that figure sits in free space, and
 * the seven M4 pilot figures re-measured unchanged — still zero collisions,
 * zero clipped, at both themes. Displacement is still scored, so a label whose
 * anchor is already clear never moves at all.
 */
const GEOMETRY_HIT_CAP = 6
const GEOMETRY_WEIGHT = 20

function boxesOverlap(a: Box, b: Box, pad = PADDING_PX): boolean {
  return !(a.right + pad <= b.left || b.right + pad <= a.left ||
           a.bottom + pad <= b.top || b.bottom + pad <= a.top)
}

function boxFor(x: number, y: number, text: string, viewport: Viewport, tier?: number): Box {
  const { halfW, halfH } = labelExtent(text, viewport, tier)
  return { left: x - halfW, right: x + halfW, top: y - halfH, bottom: y + halfH }
}

/**
 * Geometry projected into screen space, as obstacles.
 *
 * Segments (vector/arrow/bond) are sampled rather than treated as their
 * bounding box: a long diagonal arrow's bounding box covers a huge empty area
 * and would push labels away from space that is genuinely free.
 */
function geometryObstacles(scene: SceneSpec, viewport: Viewport, scale: number): Box[] {
  const cx = viewport.hostWidth / 2
  const cy = viewport.hostHeight / 2
  const toScreen = (p: Vec3) => ({ x: cx + p[0] * scale, y: cy - p[1] * scale })
  const out: Box[] = []
  const dot = (x: number, y: number, r: number) => out.push({ left: x - r, right: x + r, top: y - r, bottom: y + r })

  for (const step of scene.steps ?? []) {
    for (const obj of step.objects ?? []) {
      if (obj.type === 'label') continue          // labels are handled separately
      if (obj.from && obj.to) {
        const a = toScreen(obj.from), b = toScreen(obj.to)
        const steps = 12
        for (let i = 0; i <= steps; i++) {
          dot(a.x + ((b.x - a.x) * i) / steps, a.y + ((b.y - a.y) * i) / steps, 3)
        }
      } else if (obj.points?.length) {
        for (const p of obj.points) { const s = toScreen(p); dot(s.x, s.y, 3) }
      } else if (obj.position) {
        const s = toScreen(obj.position)
        dot(s.x, s.y, Math.max(3, (obj.radius ?? 0.2) * scale))
      }
    }
  }
  return out
}

/**
 * Candidate offsets, in a FIXED order — the authored spot first, then rings of
 * increasing radius. Deterministic by construction: no randomness, no search
 * heuristics that depend on iteration order elsewhere.
 */
function candidateOffsets(maxRadius: number): { dx: number; dy: number }[] {
  const out = [{ dx: 0, dy: 0 }]
  // 16 directions at 6px steps. The original 8 directions at 8px steps left
  // real gaps: measured on the densest 390px figures, total label area is only
  // 26-38% of the canvas and no label is wider than the canvas, so the space
  // exists — the search simply was not finding it. Angular resolution costs
  // nothing at these set sizes and is what turns "no room" into "found room".
  const directions: [number, number][] = []
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2
    directions.push([Math.cos(a), Math.sin(a)])
  }
  for (let r = 6; r <= maxRadius; r += 6) {
    for (const [ux, uy] of directions) {
      out.push({ dx: Math.round(ux * r), dy: Math.round(uy * r) })
    }
  }
  return out
}

/**
 * Solve label positions for one scene at one viewport.
 *
 * Priority order, applied as hard constraints then a deterministic score:
 *   1. inside the canvas            (hard)
 *   2. clear of already-placed labels (hard)
 *   3. clear of geometry            (scored — a figure with no free space must
 *                                    still show its labels)
 *   4. closest to the authored position (scored)
 *
 * Readability is untouched: this function moves boxes, it never resizes them.
 */
export function placeSceneLabels(scene: SceneSpec, viewport: Viewport): PlacementResult {
  const scale = pixelsPerUnit(viewport, scene.cameraDistance ?? DEFAULT_CAMERA_DISTANCE)
  const anchors = projectLabelBoxes(scene, viewport)
  const tiers = sceneTextObjects(scene).map(({ object }) => tierOf(object))
  const obstacles = geometryObstacles(scene, viewport, scale)
  const maxDisplacement = Math.min(viewport.hostWidth, viewport.hostHeight) * MAX_DISPLACEMENT_FRACTION
  const offsets = candidateOffsets(maxDisplacement)

  const placedBoxes: Box[] = []
  const labels: PlacedLabel[] = []
  let unresolved = 0

  for (const [index, anchor] of anchors.entries()) {
    const tier = tiers[index]
    const ax = (anchor.left + anchor.right) / 2
    const ay = (anchor.top + anchor.bottom) / 2

    let best: { x: number; y: number; score: number } | null = null

    for (const { dx, dy } of offsets) {
      const x = ax + dx
      const y = ay + dy
      const box = boxFor(x, y, anchor.text, viewport, tier)

      // 1. hard: inside the canvas
      if (box.left < 0 || box.right > viewport.hostWidth || box.top < 0 || box.bottom > viewport.hostHeight) continue
      // 2. hard: clear of labels already placed this pass
      if (placedBoxes.some((p) => boxesOverlap(box, p))) continue

      // 3 + 4. scored
      // Geometry overlap is capped and weighted modestly against displacement.
      // Unbounded, a label beside a long sampled arrow scores so badly that it
      // flees across the figure — which fixes an overlap by destroying the
      // association. Capped, a label moves only when nearby space is genuinely
      // clearer, and a label whose authored spot is already clean never moves.
      const geometryHits = Math.min(
        obstacles.reduce((n, o) => n + (boxesOverlap(box, o, 0) ? 1 : 0), 0),
        GEOMETRY_HIT_CAP,
      )
      const displacement = Math.hypot(dx, dy)
      const score = geometryHits * GEOMETRY_WEIGHT + displacement
      if (!best || score < best.score) best = { x, y, score }
      // The authored position, clear of everything, is unbeatable — stop early
      // so an already-good label is provably never moved.
      if (score === 0) break
    }

    if (best) {
      const box = boxFor(best.x, best.y, anchor.text, viewport, tier)
      placedBoxes.push(box)
      labels.push({
        text: anchor.text, anchorX: ax, anchorY: ay, x: best.x, y: best.y,
        movedPx: Math.round(Math.hypot(best.x - ax, best.y - ay)),
        ok: true,
      })
    } else {
      // FAIL VISIBLY: keep the authored position, report it, never hide.
      placedBoxes.push(boxFor(ax, ay, anchor.text, viewport, tier))
      labels.push({
        text: anchor.text, anchorX: ax, anchorY: ay, x: ax, y: ay,
        movedPx: 0, ok: false, reason: 'no-safe-placement',
      })
      unresolved++
    }
  }

  return { labels, unresolved }
}

/**
 * Convert a solved screen position back into the world coordinate the renderer
 * draws at. The projection is linear on the z = 0 plane, so this is exact.
 */
export function screenToWorld(
  x: number, y: number, viewport: Viewport, cameraDistance: number, z = 0,
): Vec3 {
  const scale = pixelsPerUnit(viewport, cameraDistance)
  return [(x - viewport.hostWidth / 2) / scale, (viewport.hostHeight / 2 - y) / scale, z]
}

/**
 * Build a Viewport from a live canvas size, for runtime use by the renderer.
 *
 * `browserWidth` matters and is NOT the canvas width: `SceneLabel` sizes text
 * in `vw`, which the browser resolves against the WINDOW. Measured on the
 * VisualCard surface, where the card is capped at 560px inside a 1280px
 * window, assuming the two are the same under-modelled every label by more
 * than half its width — and a solver that thinks labels are small places them
 * where the real ones do not fit. Callers that know the window width pass it;
 * the canvas width remains the fallback, which is what full-bleed figures had
 * all along.
 */
export function viewportFromCanvas(width: number, height: number, browserWidth?: number): Viewport {
  const window = browserWidth && browserWidth > 0 ? browserWidth : width
  return {
    name: window <= 480 ? 'mobile' : window <= 800 ? 'tablet' : 'desktop',
    browserWidth: window,
    hostWidth: Math.max(1, Math.round(width)),
    hostHeight: Math.max(1, Math.round(height)),
  }
}
