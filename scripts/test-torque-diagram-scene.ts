/**
 * Test harness for the deterministic torque-diagram scene generator
 * (src/lib/teaching/sceneGenerators/torqueDiagram.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: the lever-arm and force-vector
 * geometry, and the torque label (τ = r·F·sin θ, with rotational sense),
 * match the re-derived formula — across a perpendicular-force case (max
 * torque), an oblique-angle case, and a parallel-force case (zero torque).
 * Also confirms the scene-router keyword routing.
 *
 * extractTorqueParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-torque-diagram-scene.ts
 */

import {
  buildTorqueScene,
  checkTorqueConsistency,
  validateTorqueParams,
  type TorqueParams,
} from '../src/lib/teaching/sceneGenerators/torqueDiagram'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== torque-diagram deterministic scene harness ===\n')

// ── Perpendicular force: max torque ───────────────────────────────────────────
const perpendicular: TorqueParams = { leverLength: 2, force: 10, angleDeg: 90 }
const specPerp = buildTorqueScene(perpendicular)

check('perpendicular force — structurally valid SceneSpec', validateSceneSpec(specPerp).valid, JSON.stringify(validateSceneSpec(specPerp).errors))
check('perpendicular force — passes independent consistency check', checkTorqueConsistency(specPerp, perpendicular).ok,
  checkTorqueConsistency(specPerp, perpendicular).errors.join('; '))
check('perpendicular force — has 3 steps', specPerp.steps.length === 3)
check('perpendicular force — torque label states 20.00 N·m, counter-clockwise', (() => {
  const obj = specPerp.steps.flatMap((s) => s.objects).find((o) => o.id === 'torqueLabel')
  return obj?.text === 'τ = 20 N·m, counter-clockwise'
})())

// ── Oblique angle ───────────────────────────────────────────────────────────────
const oblique: TorqueParams = { leverLength: 1.5, force: 8, angleDeg: 30 }
const specOblique = buildTorqueScene(oblique)
check('oblique angle — structurally valid SceneSpec', validateSceneSpec(specOblique).valid, JSON.stringify(validateSceneSpec(specOblique).errors))
check('oblique angle — passes independent consistency check', checkTorqueConsistency(specOblique, oblique).ok,
  checkTorqueConsistency(specOblique, oblique).errors.join('; '))

// ── Parallel force: zero torque ──────────────────────────────────────────────
const parallel: TorqueParams = { leverLength: 3, force: 5, angleDeg: 0 }
const specParallel = buildTorqueScene(parallel)
check('parallel force — structurally valid SceneSpec', validateSceneSpec(specParallel).valid, JSON.stringify(validateSceneSpec(specParallel).errors))
check('parallel force — passes independent consistency check', checkTorqueConsistency(specParallel, parallel).ok,
  checkTorqueConsistency(specParallel, parallel).errors.join('; '))
check('parallel force — torque label states zero (no rotation)', (() => {
  const obj = specParallel.steps.flatMap((s) => s.objects).find((o) => o.id === 'torqueLabel')
  return obj?.text === 'τ = 0 N·m, zero (no rotation)'
})())

// ── Obtuse angle (force pointing back past 90°) ──────────────────────────────
const obtuse: TorqueParams = { leverLength: 2, force: 6, angleDeg: 150 }
const specObtuse = buildTorqueScene(obtuse)
check('obtuse angle — passes independent consistency check', checkTorqueConsistency(specObtuse, obtuse).ok,
  checkTorqueConsistency(specObtuse, obtuse).errors.join('; '))

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildTorqueScene(perpendicular)
const torqueLabelObj = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'torqueLabel')
if (torqueLabelObj) torqueLabelObj.text = 'τ = 999 N·m, counter-clockwise'
check('tampered torque label fails the consistency check', !checkTorqueConsistency(tampered, perpendicular).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject leverLength <= 0', validateTorqueParams({ leverLength: 0, force: 10, angleDeg: 90 }) === null)
check('reject leverLength exceeding bound', validateTorqueParams({ leverLength: 51, force: 10, angleDeg: 90 }) === null)
check('reject force <= 0', validateTorqueParams({ leverLength: 2, force: 0, angleDeg: 90 }) === null)
check('reject angleDeg < 0', validateTorqueParams({ leverLength: 2, force: 10, angleDeg: -1 }) === null)
check('reject angleDeg > 180', validateTorqueParams({ leverLength: 2, force: 10, angleDeg: 181 }) === null)
check('accept a valid scenario', validateTorqueParams(perpendicular)?.force === 10)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for force does not coerce to 1 (Number(true)===1 coercion trap)',
  validateTorqueParams({ leverLength: 2, force: true, angleDeg: 90 }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for torque_diagram ===\n')

check('"torque" prose → torque_diagram',
  routeSceneGenerator('Calculate the torque produced by a force applied to the end of a wrench.') === 'torque_diagram')
check('"lever arm" prose → torque_diagram',
  routeSceneGenerator('A force is applied perpendicular to a lever arm of length 2 m.') === 'torque_diagram')
check('"moment of force" prose → torque_diagram',
  routeSceneGenerator('Find the moment of force about the pivot.') === 'torque_diagram')
check('generic "circular motion" prose does NOT mis-route to torque_diagram',
  routeSceneGenerator('A ball moves in a circle with uniform circular motion.') === 'circular')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
