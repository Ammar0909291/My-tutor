/**
 * Test harness for the deterministic heights-and-distances scene generator
 * (src/lib/teaching/sceneGenerators/heightsAndDistances.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: the right-triangle vertex coordinates
 * match height = distance * tan(angle of elevation), the observer/foot lie at
 * ground level, the object is vertical, and the measured angle from the
 * plotted vertices matches the stated angle of elevation — across multiple
 * distance/angle combinations. Also confirms the scene-router keyword routing
 * for this generator, including non-collision with the generic 'triangle' rule.
 *
 * extractHeightsAndDistancesParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-heights-and-distances-scene.ts
 */

import {
  buildHeightsAndDistancesScene,
  checkHeightsAndDistancesConsistency,
  validateHeightsAndDistancesParams,
  type HeightsAndDistancesParams,
} from '../src/lib/teaching/sceneGenerators/heightsAndDistances'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== heights-and-distances deterministic scene harness ===\n')

// ── Standard case: distance=20, angle=45 (height should equal distance) ──────
const standard: HeightsAndDistancesParams = { distance: 20, angleOfElevation: 45 }
const specStandard = buildHeightsAndDistancesScene(standard)

check('standard — structurally valid SceneSpec', validateSceneSpec(specStandard).valid, JSON.stringify(validateSceneSpec(specStandard).errors))
check('standard — passes independent consistency check', checkHeightsAndDistancesConsistency(specStandard, standard).ok,
  checkHeightsAndDistancesConsistency(specStandard, standard).errors.join('; '))
check('standard — has 3 steps', specStandard.steps.length === 3)

// ── Shallow angle ──────────────────────────────────────────────────────────────
const shallow: HeightsAndDistancesParams = { distance: 50, angleOfElevation: 15 }
const specShallow = buildHeightsAndDistancesScene(shallow)
check('shallow angle — structurally valid SceneSpec', validateSceneSpec(specShallow).valid, JSON.stringify(validateSceneSpec(specShallow).errors))
check('shallow angle — passes independent consistency check', checkHeightsAndDistancesConsistency(specShallow, shallow).ok,
  checkHeightsAndDistancesConsistency(specShallow, shallow).errors.join('; '))

// ── Steep angle ─────────────────────────────────────────────────────────────────
const steep: HeightsAndDistancesParams = { distance: 10, angleOfElevation: 75 }
const specSteep = buildHeightsAndDistancesScene(steep)
check('steep angle — structurally valid SceneSpec', validateSceneSpec(specSteep).valid, JSON.stringify(validateSceneSpec(specSteep).errors))
check('steep angle — passes independent consistency check', checkHeightsAndDistancesConsistency(specSteep, steep).ok,
  checkHeightsAndDistancesConsistency(specSteep, steep).errors.join('; '))

// ── Observer and foot lie at ground level (y=0) ───────────────────────────────
check('observer and foot vertices are at ground level (y=0)', (() => {
  const objs = specStandard.steps.flatMap((s) => s.objects)
  const observer = objs.find((o) => o.id === 'observer')?.position
  const foot = objs.find((o) => o.id === 'foot')?.position
  return observer?.[1] === 0 && foot?.[1] === 0
})())

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildHeightsAndDistancesScene(standard)
const topObj = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'top')
if (topObj?.position) topObj.position = [topObj.position[0], topObj.position[1] + 50, topObj.position[2]]
check('tampered top-vertex height fails the consistency check', !checkHeightsAndDistancesConsistency(tampered, standard).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject distance <= 0', validateHeightsAndDistancesParams({ distance: 0, angleOfElevation: 45 }) === null)
check('reject distance exceeding bound', validateHeightsAndDistancesParams({ distance: 1001, angleOfElevation: 45 }) === null)
check('reject angleOfElevation <= 0', validateHeightsAndDistancesParams({ distance: 10, angleOfElevation: 0 }) === null)
check('reject angleOfElevation >= 90', validateHeightsAndDistancesParams({ distance: 10, angleOfElevation: 90 }) === null)
check('accept a valid scenario', validateHeightsAndDistancesParams({ distance: 30, angleOfElevation: 60 })?.distance === 30)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for distance does not coerce to 1 (Number(true)===1 coercion trap)',
  validateHeightsAndDistancesParams({ distance: true, angleOfElevation: 45 }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for heights_and_distances ===\n')

check('"angle of elevation" prose → heights_and_distances',
  routeSceneGenerator('A tower is observed at an angle of elevation of 30 degrees from a point 50 m away.') === 'heights_and_distances')
check('"height of the tower" prose → heights_and_distances',
  routeSceneGenerator('Find the height of the tower given the distance and angle.') === 'heights_and_distances')
check('"angle of depression" prose → heights_and_distances',
  routeSceneGenerator('From the top of a cliff, the angle of depression to a boat is 20 degrees.') === 'heights_and_distances')
check('generic "triangle" / "interior angle" prose does NOT route to heights_and_distances',
  routeSceneGenerator('Find the interior angles of a triangle given two angles.') === 'triangle')
check('heights-and-distances prose does NOT mis-route to the generic triangle generator',
  routeSceneGenerator('What is the height of the building if the angle of elevation is 45 degrees and distance is 20 m?') !== 'triangle')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
