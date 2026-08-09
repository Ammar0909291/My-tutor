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

/** Every object that will paint text, with the anchor it paints at. */
function textObjects(scene: SceneSpec): { text: string; position: Vec3 }[] {
  const out: { text: string; position: Vec3 }[] = []
  for (const step of scene.steps ?? []) {
    for (const obj of step.objects ?? []) {
      const text = (obj.text ?? '').trim()
      if (!text) continue
      const position = anchorOf(obj)
      if (position) out.push({ text, position })
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

  return textObjects(scene).map(({ text, position }) => {
    // drei's <Html center> centres the box on its anchor.
    const screenX = cx + position[0] * scale
    const screenY = cy - position[1] * scale
    const halfW = (text.length * CHAR_WIDTH_PX) / 2
    const halfH = LINE_HEIGHT_PX / 2
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
  const boxes = projectLabelBoxes(scene, viewport)
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
