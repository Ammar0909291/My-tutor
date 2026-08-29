/**
 * rayOptics — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type OpticsType = 'concave_mirror' | 'convex_mirror' | 'convex_lens' | 'concave_lens'

export interface RayOpticsParams {
  opticsType: OpticsType
  /** Object distance from the pole/optical centre (magnitude, in cm). Always > 0. */
  objectDistance: number
  /** Focal length magnitude (in cm). Always > 0; sign is derived from opticsType. */
  focalLength: number
  /** Object height (in cm), > 0. Defaults to a fixed visual size if not given. */
  objectHeight: number
}

const VISUAL_MAX = 14

/** Sign convention: mirror/concave-lens focal length is negative; object distance is always negative. */
function signedFocalLength(opticsType: OpticsType, magnitude: number): number {
  return opticsType === 'concave_mirror' || opticsType === 'concave_lens' ? -magnitude : magnitude
}

export function validateRayOpticsParams(raw: unknown): RayOpticsParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const opticsType = o.opticsType
  if (
    opticsType !== 'concave_mirror' &&
    opticsType !== 'convex_mirror' &&
    opticsType !== 'convex_lens' &&
    opticsType !== 'concave_lens'
  ) {
    return null
  }
  const objectDistance = strictNumber(o.objectDistance)
  const focalLength = strictNumber(o.focalLength)
  const objectHeight = o.objectHeight === undefined ? 2 : strictNumber(o.objectHeight)
  if (!Number.isFinite(objectDistance) || objectDistance <= 0) return null
  if (!Number.isFinite(focalLength) || focalLength <= 0) return null
  if (!Number.isFinite(objectHeight) || objectHeight <= 0) return null
  // Object exactly at the focal point → image at infinity (1/v = 0). Reject;
  // a finite scene can't represent it.
  if (Math.abs(objectDistance - focalLength) < 1e-6) return null
  return { opticsType, objectDistance, focalLength, objectHeight }
}

// ── Deterministic geometry (mirror/lens formulas; never LLM-generated) ───────

interface RayOpticsGeometry {
  u: number
  f: number
  v: number
  m: number
  isMirror: boolean
  real: boolean
  erect: boolean
  imageHeight: number
}

function computeGeometry(p: RayOpticsParams): RayOpticsGeometry {
  const isMirror = p.opticsType === 'concave_mirror' || p.opticsType === 'convex_mirror'
  const u = -p.objectDistance
  const f = signedFocalLength(p.opticsType, p.focalLength)

  // 1/v = 1/f - 1/u (mirror) ; 1/v = 1/f + 1/u (lens) — both forms of 1/f = 1/v ± 1/u solved for v.
  const v = isMirror ? 1 / (1 / f - 1 / u) : 1 / (1 / f + 1 / u)
  const m = isMirror ? -v / u : v / u
  const real = isMirror ? v < 0 : v > 0
  const erect = m > 0
  const imageHeight = m * p.objectHeight

  return { u, f, v, m, isMirror, real, erect, imageHeight }
}

/** Build a ray-optics SceneSpec: object/element/focus in step 1, the formed image in step 2. */
export function buildRayOpticsScene(params: RayOpticsParams): SceneSpec {
  const geo = computeGeometry(params)
  const maxExtent = Math.max(Math.abs(geo.u), Math.abs(geo.v), Math.abs(geo.f), 1e-9)
  const scale = VISUAL_MAX / maxExtent
  const objX = round(geo.u * scale)
  const imgX = round(geo.v * scale)
  const focusX = round(geo.f * scale)
  const objY = round(params.objectHeight * scale)
  const imgY = round(geo.imageHeight * scale)

  const objectPos: Vec3 = [objX, objY, 0]
  const imagePos: Vec3 = [imgX, imgY, 0]
  const elementLabel = params.opticsType.replace('_', ' ')

  return {
    id: `ray-optics-${params.opticsType}-${params.objectDistance}-${params.focalLength}`,
    title: `${elementLabel}: u=${params.objectDistance}cm, f=${params.focalLength}cm → v=${round(geo.v, 2)}cm`,
    sceneType: 'diagram',
    teachingGoal: 'Show how a mirror or lens forms an image from an object, and whether that image is real/virtual and erect/inverted.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A ${elementLabel} forming a ${geo.real ? 'real' : 'virtual'}, ${geo.erect ? 'erect' : 'inverted'} image.`,
    steps: [
      {
        narration: `An object of height ${params.objectHeight}cm sits ${params.objectDistance}cm from a ${elementLabel} with focal length ${params.focalLength}cm.`,
        objects: [
          { type: 'path', id: 'axis', points: [[-VISUAL_MAX, 0, 0], [VISUAL_MAX, 0, 0]], color: '#94a3b8' },
          { type: 'node', id: 'optical-element', position: [0, 0, 0], text: elementLabel, color: '#3b82f6', radius: 0.5 },
          { type: 'node', id: 'pole', position: [0, 0, 0], text: 'P', color: '#3b82f6', radius: 0.1 },
          { type: 'node', id: 'focus', position: [focusX, 0, 0], text: 'F', color: '#f59e0b', radius: 0.3 },
          { type: 'arrow', id: 'object', from: [objX, 0, 0], to: objectPos, color: '#22c55e' },
        ],
      },
      {
        narration: `Using the formula, the image forms at ${round(geo.v, 2)}cm, height ${round(geo.imageHeight, 2)}cm — a ${geo.real ? 'real' : 'virtual'}, ${geo.erect ? 'erect' : 'inverted'} image (magnification ${round(geo.m, 2)}).`,
        objects: [
          { type: 'arrow', id: 'image', from: [imgX, 0, 0], to: imagePos, color: geo.real ? '#ef4444' : '#a855f7' },
          {
            type: 'label',
            id: 'result-label',
            position: [round((objX + imgX) / 2), round(Math.max(Math.abs(objY), Math.abs(imgY)) + 2), 0],
            text: `v=${round(geo.v, 2)}cm, m=${round(geo.m, 2)} (${geo.real ? 'real' : 'virtual'}, ${geo.erect ? 'erect' : 'inverted'})`,
            color: '#ef4444',
            properties: { v: round(geo.v, 6), m: round(geo.m, 6), real: geo.real, erect: geo.erect },
          },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkRayOpticsConsistency(spec: SceneSpec, params: RayOpticsParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const objectObj = objs.find((o) => o.id === 'object')
  const imageObj = objs.find((o) => o.id === 'image')
  const focusObj = objs.find((o) => o.id === 'focus')
  const label = objs.find((o) => o.id === 'result-label')
  if (!objectObj || !imageObj || !focusObj || !label) {
    return { ok: false, errors: ['missing one or more ray-optics objects (object/image/focus/label)'] }
  }

  // Independently re-derive everything from params — never reuse buildRayOpticsScene's geometry.
  const isMirror = params.opticsType === 'concave_mirror' || params.opticsType === 'convex_mirror'
  const u = -params.objectDistance
  const f = signedFocalLength(params.opticsType, params.focalLength)
  const v = isMirror ? 1 / (1 / f - 1 / u) : 1 / (1 / f + 1 / u)
  const m = isMirror ? -v / u : v / u
  const real = isMirror ? v < 0 : v > 0
  const erect = m > 0
  const imageHeight = m * params.objectHeight

  const maxExtent = Math.max(Math.abs(u), Math.abs(v), Math.abs(f), 1e-9)
  const scale = VISUAL_MAX / maxExtent
  const tol = VISUAL_MAX * 0.02

  const expectedObjX = u * scale
  const expectedImgX = v * scale
  const expectedFocusX = f * scale
  const expectedImgY = imageHeight * scale

  if (!objectObj.to || Math.abs(objectObj.to[0] - expectedObjX) > tol) {
    errors.push(`object x-position ${objectObj.to?.[0]} does not match re-derived ${round(expectedObjX, 3)}`)
  }
  if (!focusObj.position || Math.abs(focusObj.position[0] - expectedFocusX) > tol) {
    errors.push(`focus x-position ${focusObj.position?.[0]} does not match re-derived ${round(expectedFocusX, 3)}`)
  }
  if (!imageObj.to || Math.abs(imageObj.to[0] - expectedImgX) > tol) {
    errors.push(`image x-position ${imageObj.to?.[0]} does not match re-derived ${round(expectedImgX, 3)}`)
  }
  if (!imageObj.to || Math.abs(imageObj.to[1] - expectedImgY) > tol) {
    errors.push(`image y-position (height) ${imageObj.to?.[1]} does not match re-derived ${round(expectedImgY, 3)}`)
  }
  const props = label.properties as { v?: number; m?: number; real?: boolean; erect?: boolean } | undefined
  if (!props || Math.abs((props.v ?? NaN) - v) > 1e-3) {
    errors.push(`label v=${props?.v} does not match re-derived v=${round(v, 6)}`)
  }
  if (!props || Math.abs((props.m ?? NaN) - m) > 1e-3) {
    errors.push(`label m=${props?.m} does not match re-derived m=${round(m, 6)}`)
  }
  if (!props || props.real !== real) errors.push(`label real=${props?.real} does not match re-derived real=${real}`)
  if (!props || props.erect !== erect) errors.push(`label erect=${props?.erect} does not match re-derived erect=${erect}`)

  return { ok: errors.length === 0, errors }
}

