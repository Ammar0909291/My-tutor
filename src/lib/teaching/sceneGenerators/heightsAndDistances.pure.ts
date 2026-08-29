/**
 * heightsAndDistances — the PURE half (geometry, validation, consistency check).
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

export interface HeightsAndDistancesParams {
  /** Horizontal distance from the observer to the foot of the object (m), > 0. */
  distance: number
  /** Angle of elevation from the observer to the top of the object (degrees), 0 < angle < 90. */
  angleOfElevation: number
}

const DISTANCE_BOUND = 1000
const VISUAL_MAX = 16

export function validateHeightsAndDistancesParams(raw: unknown): HeightsAndDistancesParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const distance = strictNumber(o.distance)
  const angleOfElevation = strictNumber(o.angleOfElevation)

  if (!Number.isFinite(distance) || distance <= 0 || distance > DISTANCE_BOUND) return null
  if (!Number.isFinite(angleOfElevation) || angleOfElevation <= 0 || angleOfElevation >= 90) return null

  return { distance, angleOfElevation }
}

// ── Deterministic geometry (right-triangle trig; never LLM-generated) ────────

interface RightTriangleGeometry {
  height: number
  observer: Vec3
  foot: Vec3
  top: Vec3
  scale: number
}

function computeGeometry(p: HeightsAndDistancesParams): RightTriangleGeometry {
  const height = p.distance * Math.tan((p.angleOfElevation * Math.PI) / 180)
  const maxExtent = Math.max(p.distance, height, 1e-9)
  const scale = VISUAL_MAX / maxExtent

  const observer: Vec3 = [0, 0, 0]
  const foot: Vec3 = [round(p.distance * scale), 0, 0]
  const top: Vec3 = [round(p.distance * scale), round(height * scale), 0]

  return { height, observer, foot, top, scale }
}

/** Build a 3-step right-triangle SceneSpec for an angle-of-elevation problem. */
export function buildHeightsAndDistancesScene(params: HeightsAndDistancesParams): SceneSpec {
  const geo = computeGeometry(params)
  const midGround: Vec3 = [round(geo.foot[0] / 2), -1.2, 0]

  return {
    id: `heights-distances-${params.distance}-${params.angleOfElevation}`,
    title: `Heights & Distances: distance=${params.distance} m, angle of elevation=${params.angleOfElevation}°`,
    sceneType: 'diagram',
    teachingGoal: 'Show how the angle of elevation and a known horizontal distance determine an unknown height via tan(angle) = height / distance.',
    cameraDistance: VISUAL_MAX * 2.5,
    ariaLabel: `A right triangle: an observer at ground level, a vertical object of height ${round(geo.height, 2)} meters at a horizontal distance of ${params.distance} meters, sighted at an angle of elevation of ${params.angleOfElevation} degrees.`,
    steps: [
      {
        narration: `The observer stands at ground level, a horizontal distance of ${params.distance} m from the foot of the object.`,
        objects: [
          { type: 'node', id: 'observer', position: geo.observer, text: 'Observer', color: '#22c55e', radius: 0.4 },
          { type: 'node', id: 'foot', position: geo.foot, text: 'Foot', color: '#94a3b8', radius: 0.3 },
          { type: 'bond', id: 'ground', from: geo.observer, to: geo.foot, color: '#94a3b8' },
        ],
      },
      {
        narration: `Looking up at the top of the object, the observer's line of sight makes an angle of elevation of ${params.angleOfElevation}° with the ground.`,
        objects: [
          { type: 'node', id: 'top', position: geo.top, text: `Top (h=${round(geo.height, 2)} m)`, color: '#f59e0b', radius: 0.3 },
          { type: 'bond', id: 'vertical', from: geo.foot, to: geo.top, color: '#3b82f6' },
          { type: 'bond', id: 'lineOfSight', from: geo.observer, to: geo.top, color: '#ef4444' },
        ],
      },
      {
        narration: `Using tan(${params.angleOfElevation}°) = height / distance: height = ${params.distance} × tan(${params.angleOfElevation}°) = ${round(geo.height, 2)} m.`,
        objects: [
          { type: 'label', id: 'formula', position: midGround, text: `h = ${params.distance} × tan(${params.angleOfElevation}°) = ${round(geo.height, 2)} m`, color: '#ef4444' },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkHeightsAndDistancesConsistency(spec: SceneSpec, params: HeightsAndDistancesParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const observer = objs.find((o) => o.id === 'observer')?.position
  const foot = objs.find((o) => o.id === 'foot')?.position
  const top = objs.find((o) => o.id === 'top')?.position
  if (!observer || !foot || !top) return { ok: false, errors: ['missing one or more of observer/foot/top vertices'] }

  const tol = VISUAL_MAX * 0.02

  if (foot[1] !== 0 || observer[1] !== 0) errors.push('observer and foot must both lie at ground level (y=0)')
  if (foot[0] !== top[0]) errors.push(`foot x (${foot[0]}) and top x (${top[0]}) must match — the object must be vertical`)

  const geo = computeGeometry(params)
  if (Math.abs(foot[0] - geo.foot[0]) > tol) errors.push(`foot position (${foot[0]}) does not match re-derived (${geo.foot[0]})`)
  if (Math.abs(top[1] - geo.top[1]) > tol) errors.push(`top height (${top[1]}) does not match re-derived (${geo.top[1]})`)

  // Re-derive the angle of elevation from the actual plotted vertices and confirm
  // it matches the stated angle — the property the scene is teaching.
  const dx = foot[0] - observer[0]
  const dy = top[1] - foot[1]
  if (dx > 0) {
    const measuredAngle = (Math.atan2(dy, dx) * 180) / Math.PI
    if (Math.abs(measuredAngle - params.angleOfElevation) > 0.5) {
      errors.push(`measured angle of elevation ${round(measuredAngle, 2)}° != stated ${params.angleOfElevation}°`)
    }
  }

  return { ok: errors.length === 0, errors }
}

