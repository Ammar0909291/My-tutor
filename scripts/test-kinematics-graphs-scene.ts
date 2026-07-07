/**
 * Test harness for the deterministic kinematics-graphs scene generator
 * (src/lib/teaching/sceneGenerators/kinematicsGraphs.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: the sampled position-time and
 * velocity-time curves match the re-derived kinematic equations, and the
 * acceleration-time line is flat at the correct constant value — across
 * acceleration, deceleration, and zero-acceleration (uniform velocity) cases.
 * Also confirms the scene-router keyword routing for this generator.
 *
 * extractKinematicsParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-kinematics-graphs-scene.ts
 */

import {
  buildKinematicsGraphScene,
  checkKinematicsConsistency,
  validateKinematicsParams,
  type KinematicsParams,
} from '../src/lib/teaching/sceneGenerators/kinematicsGraphs'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== kinematics-graphs deterministic scene harness ===\n')

// ── Accelerating from rest: u=0, a=2, t=10 ───────────────────────────────────
const accel: KinematicsParams = { initialVelocity: 0, acceleration: 2, duration: 10, initialPosition: 0 }
const specAccel = buildKinematicsGraphScene(accel)

check('accelerating — structurally valid SceneSpec', validateSceneSpec(specAccel).valid, JSON.stringify(validateSceneSpec(specAccel).errors))
check('accelerating — passes independent consistency check', checkKinematicsConsistency(specAccel, accel).ok,
  checkKinematicsConsistency(specAccel, accel).errors.join('; '))
check('accelerating — has 3 steps (position, velocity, acceleration)', specAccel.steps.length === 3)

// ── Decelerating: u=20, a=-4, t=5 ────────────────────────────────────────────
const decel: KinematicsParams = { initialVelocity: 20, acceleration: -4, duration: 5, initialPosition: 0 }
const specDecel = buildKinematicsGraphScene(decel)

check('decelerating — structurally valid SceneSpec', validateSceneSpec(specDecel).valid, JSON.stringify(validateSceneSpec(specDecel).errors))
check('decelerating — passes independent consistency check', checkKinematicsConsistency(specDecel, decel).ok,
  checkKinematicsConsistency(specDecel, decel).errors.join('; '))

// ── Uniform velocity: u=15, a=0, t=8 — acceleration line at exactly 0 ────────
const uniform: KinematicsParams = { initialVelocity: 15, acceleration: 0, duration: 8, initialPosition: 0 }
const specUniform = buildKinematicsGraphScene(uniform)

check('uniform velocity — structurally valid SceneSpec', validateSceneSpec(specUniform).valid, JSON.stringify(validateSceneSpec(specUniform).errors))
check('uniform velocity — passes independent consistency check', checkKinematicsConsistency(specUniform, uniform).ok,
  checkKinematicsConsistency(specUniform, uniform).errors.join('; '))
check('uniform velocity — acceleration-curve is flat at y=0', (() => {
  const obj = specUniform.steps.flatMap((s) => s.objects).find((o) => o.id === 'acceleration-curve')
  return !!obj?.points && obj.points[0][1] === 0 && obj.points[1][1] === 0
})())

// ── Non-zero initial position ────────────────────────────────────────────────
const offset: KinematicsParams = { initialVelocity: 5, acceleration: 1, duration: 6, initialPosition: 10 }
const specOffset = buildKinematicsGraphScene(offset)
check('non-zero initial position — passes independent consistency check', checkKinematicsConsistency(specOffset, offset).ok,
  checkKinematicsConsistency(specOffset, offset).errors.join('; '))

// ── Tampered scene fails the consistency check ───────────────────────────────
const tampered = buildKinematicsGraphScene(accel)
const velObj = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'velocity-curve')
if (velObj?.points) velObj.points[0] = [velObj.points[0][0], velObj.points[0][1] + 100, 0]
check('tampered velocity-curve point fails the consistency check', !checkKinematicsConsistency(tampered, accel).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject duration <= 0', validateKinematicsParams({ initialVelocity: 0, acceleration: 1, duration: 0, initialPosition: 0 }) === null)
check('reject duration exceeding bound', validateKinematicsParams({ initialVelocity: 0, acceleration: 1, duration: 121, initialPosition: 0 }) === null)
check('reject initialVelocity exceeding bound', validateKinematicsParams({ initialVelocity: 101, acceleration: 1, duration: 5, initialPosition: 0 }) === null)
check('reject acceleration exceeding bound', validateKinematicsParams({ initialVelocity: 0, acceleration: 51, duration: 5, initialPosition: 0 }) === null)
check('accept missing initialPosition, defaults to 0', validateKinematicsParams({ initialVelocity: 5, acceleration: 1, duration: 5 })?.initialPosition === 0)
check('accept a valid scenario', validateKinematicsParams({ initialVelocity: 10, acceleration: 2, duration: 5, initialPosition: 0 })?.initialVelocity === 10)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for duration does not coerce to 1 (Number(true)===1 coercion trap)',
  validateKinematicsParams({ initialVelocity: 0, acceleration: 1, duration: true, initialPosition: 0 }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for kinematics_graphs ===\n')

check('"position-time graph" prose → kinematics_graphs',
  routeSceneGenerator('Draw the position-time graph for an object moving with constant acceleration.') === 'kinematics_graphs')
check('"v-t graph" prose → kinematics_graphs',
  routeSceneGenerator('Sketch the v-t graph for a car accelerating uniformly from rest.') === 'kinematics_graphs')
check('"uniformly accelerated motion" prose → kinematics_graphs',
  routeSceneGenerator('For an object undergoing uniformly accelerated motion, plot how its velocity changes over time.') === 'kinematics_graphs')
check('bare "acceleration" without a graph cue does NOT route to kinematics_graphs',
  routeSceneGenerator('The acceleration of the ball during the fall is 9.8 m/s squared.') !== 'kinematics_graphs')
check('projectile prose does NOT mis-route to kinematics_graphs',
  routeSceneGenerator('A ball is thrown at 45 degrees with an initial speed of 10 m/s.') === 'projectile')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
