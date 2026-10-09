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
/** Camera framing, as in visual/layout.ts: a 50° field of view, geometry filling 78 % of the frame. */
const TAN_HALF_FOV = Math.tan((50 * Math.PI) / 360)
const FRAME_FILL = 0.78

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

/**
 * The two principal rays from the top of the object, derived from the SAME
 * image point the formula gives (so they cannot disagree with it):
 *   · the ray parallel to the axis, meeting the element at the object's height
 *   · the ray through the pole / optical centre
 * A real image is where the outgoing rays MEET; a virtual image is where their
 * backward extensions meet, drawn separately so the figure never shows light
 * travelling where it does not.
 *
 * MEASURED (real-learner production run, 2026-09-29, phys.opt.lenses): the
 * figure had an axis, a dot for the lens, F, and the two arrows — no rays — and
 * the tutor told the learner to "look at the rays that converge". A ray
 * diagram without rays cannot show HOW an image forms.
 */
function principalRays(
  object: Vec3,
  image: Vec3,
  outgoingSign: 1 | -1,
  real: boolean,
): { rays: Vec3[][]; extensions: Vec3[][] } {
  const hits: Vec3[] = [[0, object[1], 0], [0, 0, 0]]
  const rays: Vec3[][] = []
  const extensions: Vec3[][] = []
  const clipX = VISUAL_MAX
  for (const hit of hits) {
    if (real) {
      // Through the real image, and a little beyond it, inside the frame.
      const dx = image[0] - hit[0]
      const dy = image[1] - hit[1]
      const beyond = Math.abs(dx) > 1e-9 ? Math.min(1.25, (clipX - Math.abs(image[0])) / Math.abs(dx) + 1) : 1
      rays.push([object, hit, [round(hit[0] + dx * beyond), round(hit[1] + dy * beyond), 0]])
    } else {
      // Outgoing along the line AWAY from the virtual image, to the frame edge;
      // the backward extension runs from the element to the virtual image.
      const dx = hit[0] - image[0]
      const dy = hit[1] - image[1]
      const t = Math.abs(dx) > 1e-9 ? (clipX * outgoingSign - hit[0]) / dx : 1
      rays.push([object, hit, [round(hit[0] + dx * Math.max(t, 0)), round(hit[1] + dy * Math.max(t, 0)), 0]])
      extensions.push([hit, image])
    }
  }
  return { rays, extensions }
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
  const planeHalf = round(Math.max(Math.abs(objY), Math.abs(imgY)) * 1.25 + 0.4)
  // Everything drawn sits inside ±VISUAL_MAX across, and ±(plane + result label) up and down.
  const halfY = planeHalf + 2.5
  const cameraDistance = Math.round(Math.max(
    VISUAL_MAX / (FRAME_FILL * TAN_HALF_FOV * (4 / 3)),
    halfY / (FRAME_FILL * TAN_HALF_FOV),
  ) * 10) / 10
  const imagePos: Vec3 = [imgX, imgY, 0]
  const elementLabel = params.opticsType.replace('_', ' ')
  // Light leaves a lens on the far side (+x) and a mirror back on the object side (−x).
  const { rays, extensions } = principalRays(objectPos, imagePos, geo.isMirror ? -1 : 1, geo.real)

  return {
    id: `ray-optics-${params.opticsType}-${params.objectDistance}-${params.focalLength}`,
    // SIGNED, in the Cartesian convention the formulas use (1/f = 1/v + 1/u for a mirror,
    // 1/f = 1/v − 1/u for a lens): the object is always on the incoming side, so u < 0, and
    // f is negative for a concave mirror / concave lens. The title used to print the magnitudes
    // u=30, f=10 beside a SIGNED v=-15, so the three numbers on screen did not satisfy the
    // formula printed in the lesson (1/-15 + 1/30 ≠ 1/10). The prose below still speaks in distances.
    title: `${elementLabel}: u=${round(geo.u, 2)}cm, f=${round(geo.f, 2)}cm → v=${round(geo.v, 2)}cm`,
    sceneType: 'diagram',
    teachingGoal: 'Show how a mirror or lens forms an image from an object, and whether that image is real/virtual and erect/inverted.',
    // Framed to what is drawn, by the same rule `fitSceneToFrame` uses (4:3 frame, TARGET_FRAME_FILL):
    // a fixed 3×VISUAL_MAX put the figure — a long, low strip, since heights are ~1/6 of distances
    // when drawn to scale — at ~190 px of a 566 px desktop canvas (0.26 % ink), and cut a tall one
    // (a 12 cm object 5 cm from a lens) off the top. A narrower canvas still moves the camera further
    // out at render time (`cameraDistanceToContain`).
    cameraDistance,
    // A flat ray diagram: no 3D floor grid or axis triad behind it.
    stage: { grid: false, axes: false },
    ariaLabel: `A ${elementLabel} forming a ${geo.real ? 'real' : 'virtual'}, ${geo.erect ? 'erect' : 'inverted'} image.`,
    steps: [
      {
        narration: `An object of height ${params.objectHeight}cm sits ${params.objectDistance}cm from a ${elementLabel} with focal length ${params.focalLength}cm.`,
        objects: [
          { type: 'path', id: 'axis', points: [[-VISUAL_MAX, 0, 0], [VISUAL_MAX, 0, 0]], color: '#94a3b8' },
          // The element itself: a plane through the pole/optical centre, tall enough to take both
          // principal rays (the parallel ray meets it at the object's height). Without it the lens or
          // mirror was only a dot with a name, and the rays bent at nothing.
          { type: 'path', id: geo.isMirror ? 'mirror-plane' : 'lens-plane', points: [[0, -planeHalf, 0], [0, planeHalf, 0]], color: '#3b82f6' },
          { type: 'node', id: 'optical-element', position: [0, 0, 0], text: elementLabel, color: '#3b82f6', radius: 0.5 },
          // P is the POLE of a MIRROR; the matching point on a lens is its OPTICAL CENTRE, O. A lens
          // figure labelled "P" named a point that does not exist on a lens, and on the lens-power
          // lesson (P = 1/f) it also read as the power. The node id stays 'pole' for its consumers.
          { type: 'node', id: 'pole', position: [0, 0, 0], text: geo.isMirror ? 'P' : 'O', color: '#3b82f6', radius: 0.1 },
          { type: 'node', id: 'focus', position: [focusX, 0, 0], text: 'F', color: '#f59e0b', radius: 0.3 },
          { type: 'arrow', id: 'object', from: [objX, 0, 0], to: objectPos, color: '#22c55e' },
        ],
      },
      {
        narration: `Using the formula, the image forms at ${round(geo.v, 2)}cm, height ${round(geo.imageHeight, 2)}cm — a ${geo.real ? 'real' : 'virtual'}, ${geo.erect ? 'erect' : 'inverted'} image (magnification ${round(geo.m, 2)}).`,
        objects: [
          ...rays.map((points, i) => ({ type: 'path' as const, id: i === 0 ? 'light-ray-parallel' : 'light-ray-through-centre', points, color: '#eab308' })),
          ...extensions.map((points, i) => ({ type: 'path' as const, id: i === 0 ? 'virtual-extension-parallel' : 'virtual-extension-centre', points, color: '#64748b' })),
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

