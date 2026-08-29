/**
 * Torque diagram — the PURE half.
 *
 * Split out of `torqueDiagram.ts` (whose remaining half is the LLM parameter
 * extraction) for one reason: the client must be able to re-run this builder
 * when a learner moves a slider, and the LLM half reaches the provider router,
 * the AI budget and the rate limiter — a server graph that has no business in
 * a browser bundle.
 *
 * Nothing here changed in the split beyond adding the teaching frame: same
 * geometry, same formula, same consistency check, same label text (the
 * `torqueLabel` string is asserted verbatim by
 * scripts/test-torque-diagram-scene.ts and by the checker below).
 *
 * No imports beyond types and arithmetic helpers — that is the property the
 * client depends on, and `src/tests/parametricScenePurity.test.ts` enforces it.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, TIER } from './visualDesign'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface TorqueParams {
  /** Lever-arm length from the pivot to the point of force application (m), > 0. */
  leverLength: number
  /** Magnitude of the applied force (N), > 0. */
  force: number
  /** Angle between the force and the lever arm (degrees), 0-180. 90 = perpendicular (max torque). */
  angleDeg: number
}

const LEVER_BOUND = 50
const FORCE_BOUND = 1000
const VISUAL_MAX = 14

export function validateTorqueParams(raw: unknown): TorqueParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const leverLength = strictNumber(o.leverLength)
  const force = strictNumber(o.force)
  const angleDeg = strictNumber(o.angleDeg)

  if (!Number.isFinite(leverLength) || leverLength <= 0 || leverLength > LEVER_BOUND) return null
  if (!Number.isFinite(force) || force <= 0 || force > FORCE_BOUND) return null
  if (!Number.isFinite(angleDeg) || angleDeg < 0 || angleDeg > 180) return null

  return { leverLength, force, angleDeg }
}

// ── Deterministic geometry (torque formula; never LLM-generated) ─────────────

interface TorqueGeometry {
  torque: number
  scale: number
  pivot: Vec3
  end: Vec3
  forceTip: Vec3
}

function computeGeometry(p: TorqueParams): TorqueGeometry {
  const torque = p.leverLength * p.force * Math.sin((p.angleDeg * Math.PI) / 180)
  const maxExtent = Math.max(p.leverLength, p.force, 1e-9)
  const scale = VISUAL_MAX / maxExtent

  const pivot: Vec3 = [0, 0, 0]
  const end: Vec3 = [round(p.leverLength * scale), 0, 0]
  const angleRad = (p.angleDeg * Math.PI) / 180
  const forceTip: Vec3 = [
    round(end[0] + p.force * scale * Math.cos(angleRad)),
    round(end[1] + p.force * scale * Math.sin(angleRad)),
    0,
  ]

  return { torque, scale, pivot, end, forceTip }
}

/** The rotational sense the torque produces — the wording the label uses. */
function senseOf(torque: number): string {
  return torque > 1e-9 ? 'counter-clockwise' : torque < -1e-9 ? 'clockwise' : 'zero (no rotation)'
}

/**
 * The angle arc between the lever and the force, sampled densely enough to be
 * drawn as a curve rather than as two dots (see `curve()` in visualDesign).
 * Omitted for a degenerate angle, where an arc would be a smudge at the joint.
 */
function angleArc(end: Vec3, radius: number, angleDeg: number): SceneObject | null {
  if (angleDeg < 8 || angleDeg > 172) return null
  const pts: Vec3[] = []
  const samples = 24
  for (let i = 0; i <= samples; i++) {
    const a = ((angleDeg * Math.PI) / 180) * (i / samples)
    pts.push([round(end[0] + radius * Math.cos(a)), round(end[1] + radius * Math.sin(a)), 0])
  }
  return { type: 'path', id: 'angleArc', points: pts, color: ROLE.reference, radius: 0.07 }
}

/** Build a 3-step torque-diagram SceneSpec: lever arm, then force vector, then torque label. */
export function buildTorqueScene(params: TorqueParams): SceneSpec {
  const geo = computeGeometry(params)
  const sense = senseOf(geo.torque)
  const labelPos: Vec3 = [round(geo.end[0] / 2), -2, 0]
  const magnitude = round(Math.abs(geo.torque), 2)
  const arc = angleArc(geo.end, Math.max(1.6, geo.end[0] * 0.22), params.angleDeg)

  return {
    id: `torque-${params.leverLength}-${params.force}-${params.angleDeg}`,
    title: `Torque: r = ${params.leverLength} m, F = ${params.force} N, θ = ${params.angleDeg}°`,
    sceneType: 'diagram',
    teachingGoal: 'Show how torque depends on the lever-arm length, the applied force, and the angle between them: τ = r·F·sin θ.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A lever arm of length ${params.leverLength} meters pivoted at one end, with a force of ${params.force} newtons applied at the other end at an angle of ${params.angleDeg} degrees, producing a torque of ${magnitude} newton-meters, ${sense}.`,
    stage: { grid: true, axes: true },
    parametric: {
      kind: 'torque_diagram',
      params: { leverLength: params.leverLength, force: params.force, angleDeg: params.angleDeg },
    },
    explainer: {
      result: { expression: 'τ = r × F', value: `${magnitude} N·m` },
      panels: [
        {
          heading: "What's happening?",
          body: `A force of ${params.force} N is applied at ${params.angleDeg}° to a ${params.leverLength} m lever arm. About the pivot this produces a torque of ${magnitude} N·m, turning the arm ${sense}.`,
        },
        {
          heading: 'Turning direction',
          body: `The arm turns ${sense} about the pivot. Point the fingers of your right hand along r and curl them towards F: your thumb gives the direction of τ, out of the screen for a counter-clockwise turn.`,
        },
        {
          heading: 'Formula',
          lines: [
            'τ = |r| |F| sin θ',
            `= ${params.leverLength} × ${params.force} × sin(${params.angleDeg}°)`,
            `= ${magnitude} N·m`,
          ],
          emphasis: `= ${magnitude} N·m`,
        },
      ],
      insight: {
        heading: 'Key insight',
        bullets: [
          'How far the force acts from the pivot (r)',
          'How strong the force is (F)',
          'The angle between them (θ)',
        ],
        note: 'Torque is largest when the force is perpendicular to the lever (θ = 90°), and zero when it points along it.',
      },
    },
    steps: [
      {
        narration: `The lever arm pivots at the origin and extends ${params.leverLength} m to the point where the force is applied.`,
        objects: [
          { type: 'node', id: 'pivot', position: geo.pivot, color: ROLE.reference, radius: 0.4 },
          { type: 'label', id: 'pivotLabel', position: [round(-VISUAL_MAX * 0.12), 1.4, 0], text: 'Pivot', color: ROLE.ink, size: TIER.detail },
          { type: 'bond', id: 'lever', from: geo.pivot, to: geo.end, color: ROLE.output, thickness: 0.22 },
          { type: 'label', id: 'leverLabel', position: [round(geo.end[0] / 2), -1.5, 0], text: `r = ${params.leverLength} m`, color: ROLE.output, size: TIER.primary },
        ],
      },
      {
        narration: `A force of ${params.force} N is applied at the end of the lever, at an angle of ${params.angleDeg}° to the arm.`,
        objects: [
          { type: 'vector', id: 'force', from: geo.end, to: geo.forceTip, color: ROLE.input, thickness: 0.16 },
          { type: 'label', id: 'forceLabel', position: [round(geo.forceTip[0] + 2.2), round(geo.forceTip[1]), 0], text: `F = ${params.force} N`, color: ROLE.input, size: TIER.primary },
          ...(arc ? [arc, { type: 'label', id: 'angleLabel', position: [round(geo.end[0] - 3), round(Math.max(2.2, geo.end[0] * 0.16)), 0], text: `θ = ${params.angleDeg}°`, color: ROLE.ink, size: TIER.detail } as SceneObject] : []),
        ],
      },
      {
        narration: `Torque τ = r × F × sin(${params.angleDeg}°) = ${params.leverLength} × ${params.force} × sin(${params.angleDeg}°) = ${magnitude} N·m, ${sense}.`,
        objects: [
          { type: 'label', id: 'torqueLabel', position: labelPos, text: `τ = ${magnitude} N·m, ${sense}`, color: ROLE.result, size: TIER.primary },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkTorqueConsistency(spec: SceneSpec, params: TorqueParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const pivot = objs.find((o) => o.id === 'pivot')?.position
  const lever = objs.find((o) => o.id === 'lever')
  const force = objs.find((o) => o.id === 'force')
  const torqueLabel = objs.find((o) => o.id === 'torqueLabel')
  if (!pivot || !lever?.to || !force?.from || !force?.to || !torqueLabel) {
    return { ok: false, errors: ['missing one or more of pivot/lever/force/torqueLabel'] }
  }

  const geo = computeGeometry(params)
  const tol = VISUAL_MAX * 0.02

  if (Math.abs(lever.to[0] - geo.end[0]) > tol) errors.push(`lever end (${lever.to[0]}) does not match re-derived (${geo.end[0]})`)
  if (Math.hypot(force.from[0] - geo.end[0], force.from[1] - geo.end[1]) > tol) errors.push('force vector does not start at the lever end')
  if (Math.abs(force.to[0] - geo.forceTip[0]) > tol || Math.abs(force.to[1] - geo.forceTip[1]) > tol) {
    errors.push(`force tip (${force.to[0]}, ${force.to[1]}) does not match re-derived (${geo.forceTip[0]}, ${geo.forceTip[1]})`)
  }

  const expectedText = `τ = ${round(Math.abs(geo.torque), 2)} N·m, ${senseOf(geo.torque)}`
  if (torqueLabel.text !== expectedText) {
    errors.push(`torque label "${torqueLabel.text}" does not match re-derived "${expectedText}"`)
  }

  return { ok: errors.length === 0, errors }
}
