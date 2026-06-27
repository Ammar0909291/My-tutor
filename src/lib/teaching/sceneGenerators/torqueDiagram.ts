/**
 * Rotational motion / torque diagram scene generator (20th parametric
 * generator), closing the "Rotational motion / torque diagrams" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Shows a lever arm pivoted at one end
 * with a force applied at the other end at a given angle to the arm, and
 * derives the torque magnitude (τ = r·F·sin θ) and rotational sense
 * (clockwise / counter-clockwise) from the geometry. Same architecture as
 * the other generators: extractTorqueParams (LLM, isolated) →
 * validateTorqueParams (pure) → buildTorqueScene (pure, deterministic
 * layout) → checkTorqueConsistency (pure, independent re-derivation safety
 * net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
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

/** Build a 3-step torque-diagram SceneSpec: lever arm, then force vector, then torque label. */
export function buildTorqueScene(params: TorqueParams): SceneSpec {
  const geo = computeGeometry(params)
  const sense = geo.torque > 1e-9 ? 'counter-clockwise' : geo.torque < -1e-9 ? 'clockwise' : 'zero (no rotation)'
  const labelPos: Vec3 = [round(geo.end[0] / 2), -2, 0]

  return {
    id: `torque-${params.leverLength}-${params.force}-${params.angleDeg}`,
    title: `Torque: r=${params.leverLength} m, F=${params.force} N, θ=${params.angleDeg}°`,
    sceneType: 'diagram',
    teachingGoal: 'Show how torque depends on the lever-arm length, the applied force, and the angle between them: τ = r·F·sin θ.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A lever arm of length ${params.leverLength} meters pivoted at one end, with a force of ${params.force} newtons applied at the other end at an angle of ${params.angleDeg} degrees, producing a torque of ${round(Math.abs(geo.torque), 2)} newton-meters, ${sense}.`,
    steps: [
      {
        narration: `The lever arm pivots at the origin and extends ${params.leverLength} m to the point where the force is applied.`,
        objects: [
          { type: 'node', id: 'pivot', position: geo.pivot, text: 'Pivot', color: '#94a3b8', radius: 0.4 },
          { type: 'bond', id: 'lever', from: geo.pivot, to: geo.end, color: '#3b82f6' },
        ],
      },
      {
        narration: `A force of ${params.force} N is applied at the end of the lever, at an angle of ${params.angleDeg}° to the arm.`,
        objects: [
          { type: 'vector', id: 'force', from: geo.end, to: geo.forceTip, color: '#ef4444', text: `F (${params.force} N)` },
        ],
      },
      {
        narration: `Torque τ = r × F × sin(${params.angleDeg}°) = ${params.leverLength} × ${params.force} × sin(${params.angleDeg}°) = ${round(Math.abs(geo.torque), 2)} N·m, ${sense}.`,
        objects: [
          { type: 'label', id: 'torqueLabel', position: labelPos, text: `τ = ${round(Math.abs(geo.torque), 2)} N·m, ${sense}`, color: '#f59e0b' },
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

  const sense = geo.torque > 1e-9 ? 'counter-clockwise' : geo.torque < -1e-9 ? 'clockwise' : 'zero (no rotation)'
  const expectedText = `τ = ${round(Math.abs(geo.torque), 2)} N·m, ${sense}`
  if (torqueLabel.text !== expectedText) {
    errors.push(`torque label "${torqueLabel.text}" does not match re-derived "${expectedText}"`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the lever-arm/torque scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isTorque": true|false, "leverLength": <number>, "force": <number>, "angleDeg": <number>}
- isTorque is false if the text is not about torque from a force applied to a lever arm/wrench/rod about a pivot.
- leverLength (meters, the distance from the pivot to where the force is applied), force (newtons), angleDeg (degrees between the force and the lever arm, 0-180; use 90 if the text says "perpendicular").
- Do not invent values not stated in the text.`
}

/**
 * Extract validated torque parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractTorqueParams(text: string): Promise<TorqueParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isTorque !== true) return null
  return validateTorqueParams(raw)
}
