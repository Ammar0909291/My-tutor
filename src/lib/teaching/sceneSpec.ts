/**
 * SceneSpec — Universal Teaching Animation Engine, Scene Specification Foundation Sprint.
 *
 * A subject-independent, animation-independent, declarative description of a teaching
 * visualization. The long-term goal is to let a concept / teaching goal / misconception /
 * student level be turned into a SceneSpec (data) that a single generic renderer can draw,
 * INSTEAD of a dedicated VisualType + hand-written component per concept.
 *
 * This file is pure types + tiny pure helpers — no React, no Three.js, no production wiring.
 * It does not touch any existing VisualType, VisualCard, detectVisual, or narration code.
 *
 * Design constraints (Task 2):
 *  - Subject agnostic: nothing here references quantum/chemistry/maths/etc.
 *  - Animation agnostic: a step is a static snapshot; "animation" is the reveal sequence
 *    driven by the existing revealStep/playback engine, not encoded here.
 *  - Reusable across all future subjects: the object vocabulary maps onto the existing
 *    generic primitives (Vector3D, MolecularNode3D, Bond3D, Html, boxGeometry).
 */

export type Vec3 = [number, number, number]

/**
 * The minimum generic object vocabulary (Task 3). Each maps to an existing primitive:
 *  - point / node / particle → MolecularNode3D (labeled sphere; radius distinguishes them)
 *  - vector / arrow          → Vector3D (from → to)
 *  - bond                    → Bond3D (from → to)
 *  - label                   → Html text at a position
 *  - path / trajectory       → an ordered list of points (rendered as markers / connected)
 *  - bar                     → inline boxGeometry mesh
 *  - surface                 → reserved for a future height-field object (not in the spike subset)
 */
export type SceneObjectType =
  | 'point'
  | 'particle'
  | 'node'
  | 'vector'
  | 'arrow'
  | 'bond'
  | 'label'
  | 'path'
  | 'trajectory'
  | 'bar'
  | 'surface'

/** One drawable object in a scene step. Fields are optional and interpreted per `type`. */
export interface SceneObject {
  type: SceneObjectType
  /** Stable id (optional) — useful for highlighting / diffing across steps. */
  id?: string
  /** Single position — point / node / particle / label / bar anchor. */
  position?: Vec3
  /** Start endpoint — vector / arrow / bond. */
  from?: Vec3
  /** End endpoint — vector / arrow / bond. */
  to?: Vec3
  /** Ordered points — path / trajectory. */
  points?: Vec3[]
  /** Text — label, or an optional caption on other objects. */
  text?: string
  /** CSS color string. */
  color?: string
  /** Sphere radius (point/node/particle) or bar half-extent hint. */
  radius?: number
  /** Shaft thickness for vector/arrow/bond. */
  thickness?: number
  /** Numeric size for bar height (and similar scalar-sized objects). */
  size?: number
  /** Open-ended extension bag — never required by the renderer; future-proofing. */
  properties?: Record<string, unknown>
}

/** One reveal step: the narration for this beat plus the objects that appear at it. */
export interface SceneStep {
  /** Plain-language narration for this step — compatible with the existing segment model. */
  narration?: string
  /** Objects introduced at this step (revealed additively with all earlier steps). */
  objects: SceneObject[]
}

/** Coarse, descriptive scene category — advisory only, never branched on by the renderer. */
export type SceneType = 'diagram' | 'simulation' | 'process' | 'comparison' | 'plot'

/**
 * A complete, declarative teaching scene. `steps.length` is the natural stepCount the existing
 * narration/playback engine needs; objects in step i reveal at revealStep >= i + 1.
 */
export interface SceneSpec {
  id: string
  title: string
  sceneType: SceneType
  /** What this scene is trying to teach — descriptive, for a future Teaching Strategy layer. */
  teachingGoal?: string
  /** Forwarded to ThreeDVisual (defaults applied by the renderer). */
  cameraDistance?: number
  ariaLabel?: string
  steps: SceneStep[]
}

/** The stepCount the existing playback/narration engine expects (Task 6 compatibility). */
export function sceneStepCount(spec: SceneSpec): number {
  return spec.steps.length
}

/**
 * Flattens the spec to the objects visible at a given revealStep (additive/cumulative reveal,
 * matching every existing Foundation component's `show = revealStep >= n` gating). A revealStep
 * of `Infinity` (the Foundation default) shows everything.
 */
export function visibleObjects(spec: SceneSpec, revealStep: number): SceneObject[] {
  const out: SceneObject[] = []
  spec.steps.forEach((step, i) => {
    if (revealStep >= i + 1) out.push(...step.objects)
  })
  return out
}

/** The ordered narration strings (one per step) — feeds the existing segment model. */
export function sceneNarration(spec: SceneSpec): string[] {
  return spec.steps.map((s) => s.narration ?? '')
}
