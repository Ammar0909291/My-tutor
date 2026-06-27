/**
 * Test harness for the deterministic gravitation/orbital-motion scene generator
 * (src/lib/teaching/sceneGenerators/gravitationOrbit.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: orbit-circle geometry (every point at
 * radius R from the central body), the satellite's position on the orbit,
 * velocity perpendicularity to the radius, and the orbital speed / period /
 * escape-velocity labels match the re-derived v=√(GM/r), T=2πr/v, v_esc=v√2 —
 * across an Earth-like case and a smaller-body case. Also confirms the
 * scene-router keyword routing, including non-collision with the existing
 * 'circular' rule.
 *
 * extractGravitationParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-gravitation-orbit-scene.ts
 */

import {
  buildGravitationOrbitScene,
  checkGravitationConsistency,
  validateGravitationParams,
  type GravitationParams,
} from '../src/lib/teaching/sceneGenerators/gravitationOrbit'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== gravitation-orbit deterministic scene harness ===\n')

// ── Earth-like central body, low orbit ────────────────────────────────────────
const earthLike: GravitationParams = { centralMass: 5.97e24, orbitRadius: 6.78e6 }
const specEarth = buildGravitationOrbitScene(earthLike)

check('Earth-like — structurally valid SceneSpec', validateSceneSpec(specEarth).valid, JSON.stringify(validateSceneSpec(specEarth).errors))
check('Earth-like — passes independent consistency check', checkGravitationConsistency(specEarth, earthLike).ok,
  checkGravitationConsistency(specEarth, earthLike).errors.join('; '))
check('Earth-like — has 3 steps', specEarth.steps.length === 3)

// ── Smaller body, larger relative orbit ───────────────────────────────────────
const smallBody: GravitationParams = { centralMass: 1e20, orbitRadius: 1e9 }
const specSmall = buildGravitationOrbitScene(smallBody)
check('small body — structurally valid SceneSpec', validateSceneSpec(specSmall).valid, JSON.stringify(validateSceneSpec(specSmall).errors))
check('small body — passes independent consistency check', checkGravitationConsistency(specSmall, smallBody).ok,
  checkGravitationConsistency(specSmall, smallBody).errors.join('; '))

// ── Bound check edge case ─────────────────────────────────────────────────────
const boundCase: GravitationParams = { centralMass: 1e28, orbitRadius: 5e10 }
const specBound = buildGravitationOrbitScene(boundCase)
check('large-mass case — passes independent consistency check', checkGravitationConsistency(specBound, boundCase).ok,
  checkGravitationConsistency(specBound, boundCase).errors.join('; '))

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildGravitationOrbitScene(earthLike)
const velocityObj = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'velocity')
if (velocityObj && velocityObj.properties) velocityObj.properties.magnitude = 999999
check('tampered orbital speed fails the consistency check', !checkGravitationConsistency(tampered, earthLike).ok)

const tamperedPeriod = buildGravitationOrbitScene(earthLike)
const orbitLabelObj = tamperedPeriod.steps.flatMap((s) => s.objects).find((o) => o.id === 'orbitLabel')
if (orbitLabelObj && orbitLabelObj.properties) orbitLabelObj.properties.period = 1
check('tampered orbital period fails the consistency check', !checkGravitationConsistency(tamperedPeriod, earthLike).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject centralMass below minimum', validateGravitationParams({ centralMass: 1e10, orbitRadius: 6.78e6 }) === null)
check('reject centralMass above maximum', validateGravitationParams({ centralMass: 1e35, orbitRadius: 6.78e6 }) === null)
check('reject orbitRadius below minimum', validateGravitationParams({ centralMass: 5.97e24, orbitRadius: 1 }) === null)
check('reject orbitRadius above maximum', validateGravitationParams({ centralMass: 5.97e24, orbitRadius: 1e20 }) === null)
check('accept a valid scenario', validateGravitationParams(earthLike)?.centralMass === 5.97e24)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for orbitRadius does not coerce to 1 (Number(true)===1 coercion trap)',
  validateGravitationParams({ centralMass: 5.97e24, orbitRadius: true }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for gravitation_orbit ===\n')

check('"escape velocity" prose → gravitation_orbit',
  routeSceneGenerator('Calculate the escape velocity needed for a rocket to leave Earth.') === 'gravitation_orbit')
check('"orbital period" prose → gravitation_orbit',
  routeSceneGenerator('Find the orbital period of a satellite orbiting the Earth.') === 'gravitation_orbit')
check('"satellite orbit" prose → gravitation_orbit',
  routeSceneGenerator('A satellite orbit around a planet of given mass and radius.') === 'gravitation_orbit')
check('generic "circular motion" prose does NOT route to gravitation_orbit (no collision with circular rule)',
  routeSceneGenerator('A ball moves in a circle with uniform circular motion.') === 'circular')
check('"circular orbit" without gravity-specific keywords still routes to circular (no false steal)',
  routeSceneGenerator('Describe the centripetal force in a circular orbit at constant speed.') === 'circular')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
