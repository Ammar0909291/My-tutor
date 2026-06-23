/**
 * Part 2 (option C) — 1D momentum / collision scene generator. 9TH type.
 *
 * SCOPE (approved): 1D (single line) only. 2D oblique/glancing collisions are
 * DEFERRED — they need an additional impact angle/parameter and a meaningfully
 * larger geometry problem, same deferral pattern already used for SHM-as-graph
 * and free-body diagrams (see sceneRouter.ts). Do not extend this module to 2D
 * without a deliberate scope decision.
 *
 * Two collision types ship together (one module, one routed generator, a
 * `collisionType` field) since they share the same build geometry — two carts
 * approaching, colliding, then moving apart/together:
 *  - perfectly_inelastic: objects stick together, single final velocity,
 *    v_f = (m1*u1 + m2*u2) / (m1 + m2). Simplest case — one conservation
 *    equation, one unknown. The standard intro worked example.
 *  - elastic: two unknowns (v1f, v2f), solved by the standard closed-form 1D
 *    elastic-collision formulas (both momentum AND kinetic energy conserved).
 *    These are the SAME formulas already implemented and validated in
 *    src/components/school/visuals/MomentumCollisionInteractive3D.tsx's
 *    elasticCollision(), reused here as a correctness cross-reference.
 *
 * General inelastic (coefficient of restitution e, neither sticking nor fully
 * elastic) is deliberately OUT OF SCOPE — it adds a free parameter that doesn't
 * fit the "LLM extracts simple stated numbers" pattern cleanly.
 *
 * LLM extracts ONLY: m1, m2, u1, u2 (signed, along the 1D line), collisionType.
 * Code computes: final velocities (formulas above) and all positions/timing —
 * never LLM-generated.
 *
 * Independent-derivation checker: re-derives total momentum AND (for elastic)
 * total kinetic energy from the DRAWN before/after velocities — a different
 * computation path than the one that produced v_f / v1f / v2f.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractCollisionParams() calls the LLM.
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type CollisionType = 'perfectly_inelastic' | 'elastic'

export interface CollisionParams {
  /** Mass of object 1, > 0. */
  m1: number
  /** Mass of object 2, > 0. */
  m2: number
  /** Initial velocity of object 1, signed (direction along the 1D line). */
  u1: number
  /** Initial velocity of object 2, signed (direction along the 1D line). */
  u2: number
  collisionType: CollisionType
}

/** Validate/normalize extracted params; null (reject) if implausible. */
export function validateCollisionParams(raw: unknown): CollisionParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const m1 = Number(o.m1)
  const m2 = Number(o.m2)
  const u1 = Number(o.u1)
  const u2 = Number(o.u2)
  if (![m1, m2, u1, u2].every(Number.isFinite)) return null
  if (m1 <= 0 || m2 <= 0 || m1 > 1e6 || m2 > 1e6) return null
  if (Math.abs(u1) > 1e6 || Math.abs(u2) > 1e6) return null
  const collisionType = o.collisionType === 'elastic' ? 'elastic' : 'perfectly_inelastic'
  // Reject a non-collision: objects must actually approach (u1 >= u2 means
  // object 1, behind, catches up to object 2 ahead — the standard 1D setup
  // with object 1 starting left of object 2 on the line).
  if (u1 - u2 <= 1e-9) return null
  return { m1, m2, u1, u2, collisionType }
}

// ── Deterministic physics (never LLM-generated) ───────────────────────────────

interface CollisionResult {
  v1f: number
  v2f: number
}

/** Perfectly inelastic: objects stick, single final velocity for both. */
function perfectlyInelasticFinal(p: CollisionParams): CollisionResult {
  const vf = (p.m1 * p.u1 + p.m2 * p.u2) / (p.m1 + p.m2)
  return { v1f: vf, v2f: vf }
}

/** Standard 1D elastic collision formulas. */
function elasticFinal(p: CollisionParams): CollisionResult {
  const v1f = ((p.m1 - p.m2) * p.u1 + 2 * p.m2 * p.u2) / (p.m1 + p.m2)
  const v2f = ((p.m2 - p.m1) * p.u2 + 2 * p.m1 * p.u1) / (p.m1 + p.m2)
  return { v1f, v2f }
}

function computeFinal(p: CollisionParams): CollisionResult {
  return p.collisionType === 'elastic' ? elasticFinal(p) : perfectlyInelasticFinal(p)
}

// ── Scene geometry (positions/timing — never LLM-generated) ──────────────────

const HALF_TRACK = 14
const T_BEFORE = 1 // narration step "before" sample time (object units before collision)
const T_AFTER = 1  // narration step "after" sample time

/** Build a 1D collision SceneSpec. Pure, deterministic. */
export function buildCollisionScene(params: CollisionParams): SceneSpec {
  const { v1f, v2f } = computeFinal(params)
  const stuck = params.collisionType === 'perfectly_inelastic'

  // Object 1 starts left of the collision point (0), object 2 starts right.
  const collisionX = 0
  const x1Before = collisionX - Math.max(Math.abs(params.u1), 1) * T_BEFORE - 2
  const x2Before = collisionX + Math.max(Math.abs(params.u2), 1) * T_BEFORE + 2
  const x1After = collisionX + v1f * T_AFTER
  const x2After = collisionX + v2f * T_AFTER

  const r1 = Math.min(2.5, 0.8 + Math.cbrt(params.m1) * 0.5)
  const r2 = Math.min(2.5, 0.8 + Math.cbrt(params.m2) * 0.5)

  const steps: SceneSpec['steps'] = [
    {
      narration: `Object 1 (mass ${params.m1}) moves at ${params.u1} m/s and object 2 (mass ${params.m2}) moves at ${params.u2} m/s along the same line, approaching each other.`,
      objects: [
        { type: 'node', id: 'obj1-before', position: [round(x1Before), 0, 0] as Vec3, color: '#22c55e', radius: r1, text: `m1=${params.m1}` },
        { type: 'node', id: 'obj2-before', position: [round(x2Before), 0, 0] as Vec3, color: '#3b82f6', radius: r2, text: `m2=${params.m2}` },
        { type: 'vector', id: 'u1', from: [round(x1Before), 0, 0] as Vec3, to: [round(x1Before + params.u1), 0, 0] as Vec3, color: '#22c55e', text: `u1=${params.u1}` },
        { type: 'vector', id: 'u2', from: [round(x2Before), 0, 0] as Vec3, to: [round(x2Before + params.u2), 0, 0] as Vec3, color: '#3b82f6', text: `u2=${params.u2}` },
      ],
    },
    {
      narration: stuck
        ? `They collide and stick together, moving on with a single common velocity.`
        : `They collide elastically — momentum and kinetic energy are both conserved.`,
      objects: [
        { type: 'point', id: 'collision-point', position: [collisionX, 0, 0] as Vec3, color: '#f59e0b', radius: 0.4 },
      ],
    },
    {
      narration: stuck
        ? `After the collision, the combined mass (${params.m1 + params.m2}) moves at ${round(v1f, 2)} m/s.`
        : `After the collision, object 1 moves at ${round(v1f, 2)} m/s and object 2 moves at ${round(v2f, 2)} m/s.`,
      objects: stuck
        ? [
            { type: 'node', id: 'obj1-after', position: [round(x1After), 0, 0] as Vec3, color: '#a855f7', radius: Math.min(2.8, 0.8 + Math.cbrt(params.m1 + params.m2) * 0.5), text: `m1+m2=${params.m1 + params.m2}` },
            { type: 'vector', id: 'v1f', from: [round(x1After), 0, 0] as Vec3, to: [round(x1After + v1f), 0, 0] as Vec3, color: '#a855f7', text: `vf=${round(v1f, 2)}` },
          ]
        : [
            { type: 'node', id: 'obj1-after', position: [round(x1After), 0, 0] as Vec3, color: '#22c55e', radius: r1, text: `m1=${params.m1}` },
            { type: 'node', id: 'obj2-after', position: [round(x2After), 0, 0] as Vec3, color: '#3b82f6', radius: r2, text: `m2=${params.m2}` },
            { type: 'vector', id: 'v1f', from: [round(x1After), 0, 0] as Vec3, to: [round(x1After + v1f), 0, 0] as Vec3, color: '#22c55e', text: `v1f=${round(v1f, 2)}` },
            { type: 'vector', id: 'v2f', from: [round(x2After), 0, 0] as Vec3, to: [round(x2After + v2f), 0, 0] as Vec3, color: '#3b82f6', text: `v2f=${round(v2f, 2)}` },
          ],
    },
  ]

  return {
    id: `collision-${params.collisionType}-${params.m1}-${params.m2}`,
    title: stuck
      ? `Perfectly Inelastic Collision (1D) — final velocity ${round(v1f, 2)} m/s`
      : `Elastic Collision (1D) — v1f=${round(v1f, 2)}, v2f=${round(v2f, 2)} m/s`,
    sceneType: 'simulation',
    teachingGoal: `Show conservation of momentum${stuck ? '' : ' and kinetic energy'} in a 1D ${stuck ? 'perfectly inelastic' : 'elastic'} collision.`,
    cameraDistance: HALF_TRACK * 3,
    ariaLabel: `A ${stuck ? 'perfectly inelastic' : 'elastic'} 1D collision between mass ${params.m1} at ${params.u1} m/s and mass ${params.m2} at ${params.u2} m/s.`,
    steps,
  }
}

// ── Safety-net consistency checker (INDEPENDENT derivation) ──────────────────

/**
 * Re-verify the result via a DIFFERENT path than the build used:
 *   • total momentum before == total momentum after, recomputed from the
 *     DRAWN velocity vectors (not the formula inputs);
 *   • for elastic, total kinetic energy before == after, likewise recomputed
 *     from drawn values (catches a mislabeled collisionType);
 *   • for perfectly inelastic, KE strictly decreases (energy IS lost) and
 *     both final velocities are identical;
 *   • equal-mass elastic special case: velocities should exchange (v1f≈u2,
 *     v2f≈u1) — an independent sanity check distinct from the general formula.
 */
export function checkCollisionConsistency(spec: SceneSpec, params: CollisionParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  // Positions/velocities are rounded to 3dp when drawn (round(), 3 dp), so allow
  // a tolerance a little looser than raw double precision — still far tighter
  // than any real physics discrepancy this check is meant to catch.
  const tol = 1e-2

  const vecLen = (id: string): number | undefined => {
    const v = objs.find((o) => o.id === id)
    if (!v?.from || !v?.to) return undefined
    return v.to[0] - v.from[0]
  }

  const u1Drawn = vecLen('u1')
  const u2Drawn = vecLen('u2')
  const v1fDrawn = vecLen('v1f')
  if (u1Drawn === undefined || u2Drawn === undefined || v1fDrawn === undefined) {
    return { ok: false, errors: ['missing u1, u2, or v1f vector in scene'] }
  }

  const stuck = params.collisionType === 'perfectly_inelastic'
  const v2fDrawn = stuck ? v1fDrawn : vecLen('v2f')
  if (v2fDrawn === undefined) return { ok: false, errors: ['missing v2f vector in scene'] }

  // 1. momentum conservation, recomputed independently from drawn vectors.
  const pBefore = params.m1 * u1Drawn + params.m2 * u2Drawn
  const mAfter1 = stuck ? params.m1 + params.m2 : params.m1
  const mAfter2 = stuck ? 0 : params.m2
  const pAfter = stuck ? mAfter1 * v1fDrawn : params.m1 * v1fDrawn + params.m2 * v2fDrawn
  void mAfter2
  if (Math.abs(pBefore - pAfter) > tol * Math.max(1, Math.abs(pBefore))) {
    errors.push(`momentum not conserved: before=${round(pBefore)}, after=${round(pAfter)}`)
  }

  // 2. drawn vectors must match the stated u1/u2 (build used the same numbers).
  if (Math.abs(u1Drawn - params.u1) > tol) errors.push(`drawn u1 ${u1Drawn} != stated ${params.u1}`)
  if (Math.abs(u2Drawn - params.u2) > tol) errors.push(`drawn u2 ${u2Drawn} != stated ${params.u2}`)

  const keBefore = 0.5 * params.m1 * params.u1 ** 2 + 0.5 * params.m2 * params.u2 ** 2

  if (stuck) {
    // 3a. perfectly inelastic: both final velocities identical.
    if (Math.abs(v1fDrawn - v2fDrawn) > tol) errors.push('perfectly inelastic final velocities are not identical')
    // 3b. KE strictly decreases (no spurious energy gain/conservation).
    const keAfter = 0.5 * (params.m1 + params.m2) * v1fDrawn ** 2
    if (keAfter > keBefore + tol) errors.push(`KE increased in a perfectly inelastic collision: before=${round(keBefore)}, after=${round(keAfter)}`)
  } else {
    // 4a. elastic: KE conserved, recomputed independently from drawn vectors.
    const keAfter = 0.5 * params.m1 * v1fDrawn ** 2 + 0.5 * params.m2 * v2fDrawn ** 2
    if (Math.abs(keBefore - keAfter) > tol * Math.max(1, keBefore)) {
      errors.push(`kinetic energy not conserved in elastic collision: before=${round(keBefore)}, after=${round(keAfter)}`)
    }
    // 4b. equal-mass special case: velocities exchange.
    if (Math.abs(params.m1 - params.m2) < 1e-9) {
      if (Math.abs(v1fDrawn - params.u2) > tol || Math.abs(v2fDrawn - params.u1) > tol) {
        errors.push('equal-mass elastic collision did not exchange velocities')
      }
    }
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the 1D collision being described, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCollision": true|false, "m1": <number>, "m2": <number>, "u1": <number, signed velocity of object 1>, "u2": <number, signed velocity of object 2>, "collisionType": "perfectly_inelastic" | "elastic"}
- isCollision is false if the text is not about a 1D collision between two objects.
- Use "perfectly_inelastic" if the objects stick together / combine / move as one after colliding.
- Use "elastic" if the text says "elastic collision" or the objects bounce off each other.
- If the collision type is not stated or ambiguous, use "perfectly_inelastic".
- Use the masses and velocities actually stated; do not invent numbers. Object 1 should be the one moving toward object 2 from behind (assign signs so object 1 starts left, object 2 starts right, on the same line).`
}

/**
 * Extract validated collision parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCollisionParams(text: string): Promise<CollisionParams | null> {
  if (!text || !text.trim()) return null
  // TEMP DEBUG (remove once live extraction is verified): surface exactly WHY
  // this returns null on a Groq-reachable network — the parsed response and the
  // branch that rejected it. generateJSON() already JSON-parses internally, so
  // this logs the parsed object (or the parse/transport failure) rather than the
  // pre-parse string, which isn't observable from here.
  let raw: any
  try {
    raw = await generateJSON(buildExtractionPrompt(text), 150)
  } catch (err) {
    console.error('[extractCollisionParams DEBUG] generateJSON threw:', err)
    return null
  }
  console.error('[extractCollisionParams DEBUG] parsed Groq response:', JSON.stringify(raw))
  if (!raw) {
    console.error('[extractCollisionParams DEBUG] → null: generateJSON returned null/falsy (transport/parse failure or blocked network)')
    return null
  }
  if (raw.isCollision !== true) {
    console.error(`[extractCollisionParams DEBUG] → null: isCollision !== true (got ${JSON.stringify(raw.isCollision)})`)
    return null
  }
  const validated = validateCollisionParams(raw)
  if (!validated) {
    console.error('[extractCollisionParams DEBUG] → null: validateCollisionParams rejected the params (non-finite/non-positive mass, or objects not approaching: u1 - u2 <= 0)')
    return null
  }
  console.error('[extractCollisionParams DEBUG] → OK:', JSON.stringify(validated))
  return validated
}
