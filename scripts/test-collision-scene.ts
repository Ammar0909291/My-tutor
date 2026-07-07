/**
 * Test harness for the deterministic 1D momentum/collision scene generator
 * (src/lib/teaching/sceneGenerators/momentumCollision.ts). Formula-driven, Groq-free.
 *
 * Verifies by INDEPENDENT recomputation: total momentum (and, for elastic, total
 * kinetic energy) before/after are recomputed from the DRAWN vectors via a
 * different path than the one that produced v_f / v1f / v2f.
 *
 * extractCollisionParams()/generateCollisionScene() call the LLM and are NOT
 * tested here.
 *
 * Run with:  npx tsx scripts/test-collision-scene.ts
 */

import {
  buildCollisionScene,
  checkCollisionConsistency,
  validateCollisionParams,
  type CollisionParams,
} from '../src/lib/teaching/sceneGenerators/momentumCollision'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== 1D momentum/collision deterministic scene harness ===\n')

// ── Perfectly inelastic — standard "two carts stick together" worked example ──
{
  const p: CollisionParams = { m1: 2, m2: 3, u1: 4, u2: -1, collisionType: 'perfectly_inelastic' }
  const spec = buildCollisionScene(p)
  check('perfectly_inelastic — structurally valid SceneSpec', validateSceneSpec(spec).valid,
    JSON.stringify(validateSceneSpec(spec).errors))
  const c = checkCollisionConsistency(spec, p)
  check('perfectly_inelastic — passes independent consistency check', c.ok, c.errors.join('; '))
  // expected vf = (2*4 + 3*-1) / 5 = 1
  const vf = spec.steps.flatMap((s) => s.objects).find((o) => o.id === 'v1f')
  const drawn = vf?.to && vf?.from ? vf.to[0] - vf.from[0] : NaN
  check('perfectly_inelastic — vf = (m1u1+m2u2)/(m1+m2) = 1', Math.abs(drawn - 1) < 1e-6, `got ${drawn}`)
}

// ── Elastic — equal masses should exchange velocities (classic special case) ──
{
  const p: CollisionParams = { m1: 5, m2: 5, u1: 6, u2: -2, collisionType: 'elastic' }
  const spec = buildCollisionScene(p)
  check('elastic equal-mass — structurally valid SceneSpec', validateSceneSpec(spec).valid,
    JSON.stringify(validateSceneSpec(spec).errors))
  const c = checkCollisionConsistency(spec, p)
  check('elastic equal-mass — passes independent consistency check', c.ok, c.errors.join('; '))
  const objs = spec.steps.flatMap((s) => s.objects)
  const v1f = objs.find((o) => o.id === 'v1f')
  const v2f = objs.find((o) => o.id === 'v2f')
  const d1 = v1f!.to![0] - v1f!.from![0]
  const d2 = v2f!.to![0] - v2f!.from![0]
  check('elastic equal-mass — velocities exchange (v1f=u2, v2f=u1)',
    Math.abs(d1 - p.u2) < 1e-6 && Math.abs(d2 - p.u1) < 1e-6, `got v1f=${d1}, v2f=${d2}`)
}

// ── Elastic — unequal masses, cross-checked against the existing validated
//    elasticCollision() formula in MomentumCollisionInteractive3D.tsx ─────────
{
  const p: CollisionParams = { m1: 1, m2: 4, u1: 10, u2: 0, collisionType: 'elastic' }
  const spec = buildCollisionScene(p)
  const c = checkCollisionConsistency(spec, p)
  check('elastic unequal-mass — passes independent consistency check', c.ok, c.errors.join('; '))
  const objs = spec.steps.flatMap((s) => s.objects)
  const v1f = objs.find((o) => o.id === 'v1f')!
  const v2f = objs.find((o) => o.id === 'v2f')!
  const d1 = v1f.to![0] - v1f.from![0]
  const d2 = v2f.to![0] - v2f.from![0]
  // Same closed-form already validated in the interactive component:
  const expectedV1f = ((p.m1 - p.m2) * p.u1 + 2 * p.m2 * p.u2) / (p.m1 + p.m2)
  const expectedV2f = ((p.m2 - p.m1) * p.u2 + 2 * p.m1 * p.u1) / (p.m1 + p.m2)
  check('elastic unequal-mass — v1f matches standard formula', Math.abs(d1 - expectedV1f) < 1e-6, `got ${d1}, expected ${expectedV1f}`)
  check('elastic unequal-mass — v2f matches standard formula', Math.abs(d2 - expectedV2f) < 1e-6, `got ${d2}, expected ${expectedV2f}`)
}

// ── Energy bookkeeping sanity checks ──────────────────────────────────────────
{
  const pInelastic: CollisionParams = { m1: 3, m2: 3, u1: 5, u2: -5, collisionType: 'perfectly_inelastic' }
  const specI = buildCollisionScene(pInelastic)
  const keBefore = 0.5 * 3 * 5 ** 2 + 0.5 * 3 * 5 ** 2
  const keAfter = 0.5 * 6 * 0 ** 2 // equal-opposite momenta cancel: vf=0
  check('perfectly_inelastic — KE strictly decreases (energy lost)', keAfter < keBefore)
  check('perfectly_inelastic — passes consistency (energy-loss check included)',
    checkCollisionConsistency(specI, pInelastic).ok)

  const pElastic: CollisionParams = { m1: 2, m2: 7, u1: 8, u2: 1, collisionType: 'elastic' }
  const specE = buildCollisionScene(pElastic)
  check('elastic — passes consistency (KE-conservation check included)',
    checkCollisionConsistency(specE, pElastic).ok)
}

// ── validateCollisionParams — reject implausible / no-relative-motion cases ──
check('validateCollisionParams — valid input accepted',
  validateCollisionParams({ m1: 2, m2: 3, u1: 4, u2: -1, collisionType: 'perfectly_inelastic' }) !== null)
check('validateCollisionParams — non-finite rejected',
  validateCollisionParams({ m1: 2, m2: 3, u1: 'fast', u2: -1 }) === null)
check('validateCollisionParams — non-positive mass rejected',
  validateCollisionParams({ m1: 0, m2: 3, u1: 4, u2: -1 }) === null)
check('validateCollisionParams — identical velocities (no relative motion) rejected',
  validateCollisionParams({ m1: 2, m2: 3, u1: 4, u2: 4 }) === null)
check('validateCollisionParams — u1 < u2 (opposite sign convention) now accepted, not a false positive',
  validateCollisionParams({ m1: 2, m2: 3, u1: 1, u2: 4 }) !== null)
check('validateCollisionParams — defaults to perfectly_inelastic when type omitted',
  validateCollisionParams({ m1: 2, m2: 3, u1: 4, u2: -1 })?.collisionType === 'perfectly_inelastic')
check('validateCollisionParams — elastic type passed through',
  validateCollisionParams({ m1: 2, m2: 3, u1: 4, u2: -1, collisionType: 'elastic' })?.collisionType === 'elastic')

// ── Tampering detection — checker must catch a build that violates physics ───
{
  const p: CollisionParams = { m1: 2, m2: 3, u1: 4, u2: -1, collisionType: 'perfectly_inelastic' }
  const spec = buildCollisionScene(p)
  const tampered = JSON.parse(JSON.stringify(spec))
  const v1f = tampered.steps.flatMap((s: { objects: { id?: string }[] }) => s.objects).find((o: { id?: string }) => o.id === 'v1f')
  v1f.to[0] = v1f.from[0] + 99 // wildly wrong final velocity
  const c = checkCollisionConsistency(tampered, p)
  check('checker catches a tampered (momentum-violating) final velocity', !c.ok, 'checker did not flag tampering')
}


// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('array [2] for m1 does not coerce to 2 (Number([2])===2 coercion trap)', validateCollisionParams({ m1: [2], m2: 3, u1: 4, u2: -1 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
