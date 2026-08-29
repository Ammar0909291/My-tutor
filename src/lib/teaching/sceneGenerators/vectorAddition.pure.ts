/**
 * vectorAddition — the PURE half (geometry, validation, consistency check).
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

export interface VectorParams {
  /** Magnitude of the first vector, > 0. */
  aMag: number
  /** Direction of the first vector, degrees CCW from +x. */
  aAngleDeg: number
  /** Magnitude of the second vector, > 0. */
  bMag: number
  /** Direction of the second vector, degrees CCW from +x. */
  bAngleDeg: number
}

const VISUAL_MAX = 18
/** Validate/normalize extracted vectors; null (reject) if implausible. */
export function validateVectorParams(raw: unknown): VectorParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const aMag = strictNumber(o.aMag)
  const bMag = strictNumber(o.bMag)
  const aAngleDeg = strictNumber(o.aAngleDeg)
  const bAngleDeg = strictNumber(o.bAngleDeg)
  if (![aMag, bMag, aAngleDeg, bAngleDeg].every(Number.isFinite)) return null
  if (aMag <= 0 || bMag <= 0 || aMag > 1000 || bMag > 1000) return null
  // Reject a near-canceling pair: the resultant collapses to ~zero, which has no
  // drawable resultant vector (the structural validator rejects a zero-length
  // arrow) and teaches nothing useful. Computed here from the law of cosines.
  const deltaRad = ((bAngleDeg - aAngleDeg) * Math.PI) / 180
  const resultantMag = Math.sqrt(aMag ** 2 + bMag ** 2 + 2 * aMag * bMag * Math.cos(deltaRad))
  if (resultantMag < 0.05 * Math.max(aMag, bMag)) return null
  return { aMag, aAngleDeg, bMag, bAngleDeg }
}

// ── Deterministic geometry (component addition; never LLM-generated) ─────────

interface VectorGeometry {
  scale: number
  aTip: Vec3
  bTip: Vec3
  rTip: Vec3
  bTailFrom: Vec3 // tip-to-tail copy of B starts at A's tip…
  bTailTo: Vec3   // …and ends at R's tip
  resultantMag: number
  resultantAngleDeg: number
}

function computeGeometry(p: VectorParams): VectorGeometry {
  const a = (p.aAngleDeg * Math.PI) / 180
  const b = (p.bAngleDeg * Math.PI) / 180
  const ax = p.aMag * Math.cos(a), ay = p.aMag * Math.sin(a)
  const bx = p.bMag * Math.cos(b), by = p.bMag * Math.sin(b)
  const rx = ax + bx, ry = ay + by

  const resultantMag = Math.hypot(rx, ry)
  const maxExtent = Math.max(p.aMag, p.bMag, resultantMag, 1e-9)
  const scale = VISUAL_MAX / maxExtent
  const v = (x: number, y: number): Vec3 => [round(x * scale), round(y * scale), 0]

  return {
    scale,
    aTip: v(ax, ay),
    bTip: v(bx, by),
    rTip: v(rx, ry),
    bTailFrom: v(ax, ay),
    bTailTo: v(rx, ry),
    resultantMag,
    resultantAngleDeg: (Math.atan2(ry, rx) * 180) / Math.PI,
  }
}

/**
 * A vector's angle, written the way the figure draws it.
 *
 * Measured in production 2026-08-14 on `phys.meas.vector-addition`: the figure
 * drew A(3) horizontally at 0° and B(4) vertically at 90°, and the tutor
 * narrated "one force pulling north with a strength of 3 newtons, and another
 * pulling east with a strength of 4 newtons" — A and B swapped. With that
 * reading the resultant would sit at atan(3/4) = 36.9°, while the figure's own
 * title says 53.1°, so the learner is shown two incompatible stories at once.
 *
 * The prompt was NOT missing the information: the scene's stage narration
 * already said "Vector A has magnitude 3 at 0°, and vector B has magnitude 4
 * at 90°", and the model paraphrased it wrongly anyway. What the deterministic
 * layer CAN fix is the channel the visual contract binds most tightly — the
 * text written on the figure, which the contract instructs the tutor to quote
 * "exactly as the learner reads it". A label of "A (3)" carries no direction,
 * so nothing the tutor says about direction can be contradicted by the picture.
 * "A (3 at 0°)" cannot be narrated as north without the learner seeing the
 * mismatch, and the same string is what reaches the model as quotable text.
 *
 * Compass words are deliberately NOT used: the scene has no north, and a figure
 * that claims one would be making a stronger claim than it can support. The
 * angle is the figure's own measured quantity.
 */
function angleLabel(deg: number): string {
  const d = round(((deg % 360) + 360) % 360, 1)
  return `${d}°`
}

/** Build a vector-addition SceneSpec. Pure, deterministic. */
export function buildVectorScene(params: VectorParams): SceneSpec {
  const geo = computeGeometry(params)
  const aLabel = `A (${params.aMag} at ${angleLabel(params.aAngleDeg)})`
  const bLabel = `B (${params.bMag} at ${angleLabel(params.bAngleDeg)})`
  const rLabel = `R (${round(geo.resultantMag, 2)} at ${angleLabel(geo.resultantAngleDeg)})`
  return {
    id: `vector-${params.aMag}@${params.aAngleDeg}-${params.bMag}@${params.bAngleDeg}`,
    title: `Vector Addition: |R| ≈ ${round(geo.resultantMag, 2)} at ${round(geo.resultantAngleDeg, 1)}°`,
    sceneType: 'diagram',
    teachingGoal: 'Show that two vectors add tip-to-tail (parallelogram law) to give a resultant R = A + B.',
    cameraDistance: VISUAL_MAX * 2.5,
    ariaLabel: `Vector A of magnitude ${params.aMag} at ${angleLabel(params.aAngleDeg)} and vector B of magnitude ${params.bMag} at ${angleLabel(params.bAngleDeg)}, adding tip-to-tail to a resultant of magnitude ${round(geo.resultantMag, 2)} at ${angleLabel(geo.resultantAngleDeg)}.`,
    steps: [
      {
        narration: `Vector A has magnitude ${params.aMag} at ${params.aAngleDeg}°, and vector B has magnitude ${params.bMag} at ${params.bAngleDeg}°, both drawn from the origin.`,
        objects: [
          { type: 'point', id: 'origin', position: [0, 0, 0], color: '#94a3b8', radius: 0.3 },
          { type: 'vector', id: 'A', from: [0, 0, 0], to: geo.aTip, color: '#22c55e', text: aLabel },
          { type: 'vector', id: 'B', from: [0, 0, 0], to: geo.bTip, color: '#3b82f6', text: bLabel },
        ],
      },
      {
        narration: `Slide B so its tail sits on A's tip (tip-to-tail). Its head now lands on the resultant's head.`,
        objects: [
          { type: 'vector', id: 'Btail', from: geo.bTailFrom, to: geo.bTailTo, color: '#93c5fd', text: 'B (moved)' },
        ],
      },
      {
        narration: `The resultant R = A + B runs from the origin to that head, with magnitude ≈ ${round(geo.resultantMag, 2)} at ${round(geo.resultantAngleDeg, 1)}°.`,
        objects: [
          { type: 'vector', id: 'R', from: [0, 0, 0], to: geo.rTip, color: '#ef4444', text: rLabel },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (INDEPENDENT derivation) ──────────────────

/**
 * Re-verify the resultant via a DIFFERENT derivation than the build used:
 *   • magnitude via the law of cosines |R|² = a² + b² + 2ab·cos(β−α),
 *   • tip-to-tail closure: A_tip + (B as a free vector) == R_tip,
 *   • R_tip == A_tip + B_tip (parallelogram diagonal).
 * The build added components directly, so agreement here is genuinely independent.
 */
export function checkVectorConsistency(spec: SceneSpec, params: VectorParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const aTip = objs.find((o) => o.id === 'A')?.to
  const bTip = objs.find((o) => o.id === 'B')?.to
  const rTip = objs.find((o) => o.id === 'R')?.to
  if (!aTip || !bTip || !rTip) return { ok: false, errors: ['missing A, B or R vector'] }

  const scale = VISUAL_MAX / Math.max(
    params.aMag, params.bMag,
    Math.hypot(
      params.aMag * Math.cos((params.aAngleDeg * Math.PI) / 180) + params.bMag * Math.cos((params.bAngleDeg * Math.PI) / 180),
      params.aMag * Math.sin((params.aAngleDeg * Math.PI) / 180) + params.bMag * Math.sin((params.bAngleDeg * Math.PI) / 180),
    ),
    1e-9,
  )
  const tol = VISUAL_MAX * 0.02

  // 1. law-of-cosines magnitude (independent of the component sum the build used)
  const deltaRad = ((params.bAngleDeg - params.aAngleDeg) * Math.PI) / 180
  const expectedMag = Math.sqrt(params.aMag ** 2 + params.bMag ** 2 + 2 * params.aMag * params.bMag * Math.cos(deltaRad))
  const renderedMag = Math.hypot(rTip[0], rTip[1]) / scale
  if (Math.abs(renderedMag - expectedMag) > tol / scale + 1e-6) {
    errors.push(`resultant magnitude ${round(renderedMag, 3)} != law-of-cosines ${round(expectedMag, 3)}`)
  }

  // 2. parallelogram diagonal: R_tip == A_tip + B_tip
  if (Math.abs(rTip[0] - (aTip[0] + bTip[0])) > tol || Math.abs(rTip[1] - (aTip[1] + bTip[1])) > tol) {
    errors.push(`R is not the parallelogram diagonal (R != A + B): R=[${rTip}], A+B=[${round(aTip[0] + bTip[0])}, ${round(aTip[1] + bTip[1])}]`)
  }

  // 3. tip-to-tail closure: the moved B must start at A_tip and end at R_tip
  const bMoved = objs.find((o) => o.id === 'Btail')
  if (bMoved?.from && bMoved?.to) {
    if (Math.hypot(bMoved.from[0] - aTip[0], bMoved.from[1] - aTip[1]) > tol) errors.push('moved B does not start at A\'s tip')
    if (Math.hypot(bMoved.to[0] - rTip[0], bMoved.to[1] - rTip[1]) > tol) errors.push('moved B does not end at R\'s tip')
  }

  return { ok: errors.length === 0, errors }
}

