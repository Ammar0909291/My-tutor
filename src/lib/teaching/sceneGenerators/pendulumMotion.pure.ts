/**
 * pendulumMotion — the PURE half (geometry, validation, consistency check).
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

export interface PendulumParams {
  /** String length (m), > 0. */
  length: number
  /** Amplitude — maximum swing angle from vertical (degrees), 0 < θ ≤ 90. */
  amplitudeDeg: number
  /** Gravity (m/s²); defaults to 9.8. */
  gravity?: number
}

const DEFAULT_GRAVITY = 9.8
const VISUAL_MAX = 18
const ARC_SAMPLES = 21
/** Validate/normalize extracted parameters; null (reject) if implausible. */
export function validatePendulumParams(raw: unknown): PendulumParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const length = strictNumber(o.length)
  const amplitudeDeg = strictNumber(o.amplitudeDeg)
  const gravity = o.gravity == null ? DEFAULT_GRAVITY : strictNumber(o.gravity)
  if (!Number.isFinite(length) || length <= 0 || length > 1000) return null
  if (!Number.isFinite(amplitudeDeg) || amplitudeDeg <= 0 || amplitudeDeg > 90) return null
  if (!Number.isFinite(gravity) || gravity <= 0 || gravity > 100) return null
  return { length, amplitudeDeg, gravity }
}

// ── Deterministic geometry ───────────────────────────────────────────────────

interface PendulumGeometry {
  scale: number
  period: number
  pivot: Vec3
  arc: Vec3[]
  bobLeft: Vec3    // bob at −amplitude
  bobRight: Vec3   // bob at +amplitude
  equilibrium: Vec3 // lowest point, straight down
}

function bobAt(angleRad: number, L: number): [number, number] {
  // Pivot at origin; +angle swings right. Bob hangs below: y is negative.
  return [L * Math.sin(angleRad), -L * Math.cos(angleRad)]
}

function computeGeometry(p: PendulumParams): PendulumGeometry {
  const g = p.gravity ?? DEFAULT_GRAVITY
  const L = p.length
  const amp = (p.amplitudeDeg * Math.PI) / 180

  // The pendulum's vertical extent is L; fit that to the visual bound.
  const scale = VISUAL_MAX / L
  const sc = ([x, y]: [number, number]): Vec3 => [round(x * scale), round(y * scale), 0]

  const arc: Vec3[] = []
  for (let i = 0; i < ARC_SAMPLES; i++) {
    const φ = -amp + (2 * amp * i) / (ARC_SAMPLES - 1)
    arc.push(sc(bobAt(φ, L)))
  }

  return {
    scale,
    period: 2 * Math.PI * Math.sqrt(L / g),
    pivot: [0, 0, 0],
    arc,
    bobLeft: sc(bobAt(-amp, L)),
    bobRight: sc(bobAt(amp, L)),
    equilibrium: sc(bobAt(0, L)),
  }
}

/** Build a simple-pendulum SceneSpec. Pure, deterministic. */
export function buildPendulumScene(params: PendulumParams): SceneSpec {
  const geo = computeGeometry(params)
  return {
    id: `pendulum-L${params.length}-a${params.amplitudeDeg}`,
    title: `Simple Pendulum: T = 2π√(L/g) ≈ ${round(geo.period, 2)} s`,
    sceneType: 'simulation',
    teachingGoal: 'Show a pendulum swinging along an arc of constant string length, symmetric about the lowest (equilibrium) point, with period 2π√(L/g).',
    cameraDistance: VISUAL_MAX * 2.6,
    ariaLabel: `A pendulum of length ${params.length} swinging ${params.amplitudeDeg} degrees either side of vertical, with a period of about ${round(geo.period, 2)} seconds.`,
    steps: [
      {
        narration: `A bob hangs from a fixed pivot on a string of length ${params.length} m. At rest it sits straight down — the equilibrium position.`,
        objects: [
          { type: 'point', id: 'pivot', position: geo.pivot, text: 'pivot', color: '#94a3b8', radius: 0.3 },
          { type: 'node', id: 'equilibrium', position: geo.equilibrium, text: 'rest', color: '#64748b', radius: 0.35 },
          { type: 'bond', id: 'string', from: geo.pivot, to: geo.equilibrium, color: '#94a3b8' },
        ],
      },
      {
        narration: `Pulled to ${params.amplitudeDeg}° and released, it swings along an arc — the string length never changes, so every position is the same distance from the pivot.`,
        objects: [
          { type: 'path', id: 'arc', points: geo.arc, color: '#3b82f6' },
          { type: 'node', id: 'bobRight', position: geo.bobRight, text: `+${params.amplitudeDeg}°`, color: '#22c55e', radius: 0.4 },
          { type: 'node', id: 'bobLeft', position: geo.bobLeft, text: `−${params.amplitudeDeg}°`, color: '#22c55e', radius: 0.4 },
        ],
      },
      {
        narration: `The swing is symmetric about the lowest point, and for small angles the time for one full swing is T = 2π√(L/g) ≈ ${round(geo.period, 2)} s — it depends on length, not on the mass.`,
        objects: [
          { type: 'label', id: 'period', position: [geo.equilibrium[0], geo.equilibrium[1] - 2, 0], text: `T ≈ ${round(geo.period, 2)} s`, color: '#ef4444', properties: { period: round(geo.period, 6) } },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (independent geometric derivation) ────────

export function checkPendulumConsistency(spec: SceneSpec, params: PendulumParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const pivot = objs.find((o) => o.id === 'pivot')?.position
  const arc = objs.find((o) => o.id === 'arc')?.points
  const equilibrium = objs.find((o) => o.id === 'equilibrium')?.position
  const period = objs.find((o) => o.id === 'period')
  if (!pivot || !arc || !equilibrium || !period) {
    return { ok: false, errors: ['missing pivot, arc, equilibrium or period label'] }
  }

  const g = params.gravity ?? DEFAULT_GRAVITY
  const scale = VISUAL_MAX / params.length
  const Ls = params.length * scale // scaled string length
  const tol = VISUAL_MAX * 0.02

  // 1. every arc point is at distance L from the pivot (string never stretches).
  for (const [x, y] of arc) {
    if (Math.abs(Math.hypot(x - pivot[0], y - pivot[1]) - Ls) > tol) {
      errors.push(`an arc point is not at string length L (got ${round(Math.hypot(x, y), 3)}, expected ${round(Ls, 3)})`)
      break
    }
  }

  // 2. equilibrium is straight below the pivot at distance L.
  if (Math.abs(equilibrium[0] - pivot[0]) > tol || Math.abs(equilibrium[1] - (pivot[1] - Ls)) > tol) {
    errors.push('equilibrium is not directly below the pivot at length L')
  }

  // 3. arc symmetric about the vertical (first and last points mirror in x, equal y).
  const a0 = arc[0], aN = arc[arc.length - 1]
  if (Math.abs(a0[0] + aN[0]) > tol || Math.abs(a0[1] - aN[1]) > tol) {
    errors.push('swing is not symmetric about the vertical')
  }

  // 4. lowest arc point ≈ equilibrium.
  let low = 0
  for (let i = 1; i < arc.length; i++) if (arc[i][1] < arc[low][1]) low = i
  if (Math.abs(arc[low][0] - equilibrium[0]) > tol || Math.abs(arc[low][1] - equilibrium[1]) > tol) {
    errors.push('lowest arc point is not the equilibrium position')
  }

  // 5. period re-derived from T = 2π√(L/g).
  const expected = 2 * Math.PI * Math.sqrt(params.length / g)
  const labelled = Number((period.properties as Record<string, unknown> | undefined)?.period)
  if (!Number.isFinite(labelled) || Math.abs(labelled - expected) > 0.01 * Math.max(1, expected)) {
    errors.push(`period ${labelled} != 2π√(L/g) ${round(expected, 4)}`)
  }

  return { ok: errors.length === 0, errors }
}

