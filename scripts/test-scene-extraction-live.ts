/**
 * LIVE-GROQ extraction harness — NEEDS a real GROQ_API_KEY and a Groq-reachable
 * network (e.g. run from India; the dev sandbox blocks api.groq.com → it will
 * report the calls returned null and exit non-zero, which is EXPECTED there).
 *
 * Purpose: a single, direct before/after for the THREE cases the free-form Part 2
 * generator got wrong tonight. For each EXACT probe text it:
 *   1. routes it (deterministic, offline) to a generator,
 *   2. runs that generator's extractX() (LLM — reads parameters from the text),
 *   3. builds the scene deterministically + runs the consistency checker,
 *   4. prints OLD free-form failure vs NEW parameter-driven result.
 *
 * The geometry correctness is already proven offline (see test-projectile/
 * triangle/molecule-scene.ts). What THIS harness validates that those cannot is
 * the one remaining network-dependent link: does the LLM reliably EXTRACT the
 * right parameters (45°/10 m/s, 60°/70°, "water") from real explanation text?
 *
 * Run with:  npx tsx scripts/test-scene-extraction-live.ts
 */

import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { extractProjectileParams, buildProjectileScene, checkProjectileConsistency } from '../src/lib/teaching/sceneGenerators/projectileMotion'
import { extractTriangleParams, buildTriangleScene, checkTriangleConsistency } from '../src/lib/teaching/sceneGenerators/triangleAngleSum'
import { extractMolecule, buildMoleculeScene, checkMoleculeConsistency } from '../src/lib/teaching/sceneGenerators/moleculeGeometry'

const PROBE = {
  projectile: {
    text: 'When you throw a ball at a 45-degree angle with an initial speed of 10 meters per second, it follows a parabolic trajectory. It starts at the origin, rises to a peak height, then falls back to the ground. The horizontal velocity stays constant the whole time, while gravity continuously slows the vertical velocity until it reverses.',
    oldFailure: 'free-form generator produced a NON-parabolic trajectory',
    expect: 'angle≈45°, speed≈10 m/s → parabola correct by construction',
  },
  triangle: {
    text: 'Consider a triangle with vertices at A, B, and C. The three interior angles of any triangle always add up to 180 degrees. If angle A is 60 degrees and angle B is 70 degrees, then angle C must be 50 degrees, since 60 plus 70 plus 50 equals 180.',
    oldFailure: 'free-form generator placed vertices that did NOT match the claimed angles',
    expect: 'A≈60°, B≈70° → vertices realise 60/70/50°, sum 180°',
  },
  molecule: {
    text: 'A covalent bond forms when two atoms share a pair of electrons. Take a water molecule: the oxygen atom shares one electron pair with each of two hydrogen atoms, forming two single covalent bonds. The shared electrons sit between the two nuclei, holding the atoms together.',
    oldFailure: 'free-form generator drew a LINEAR water molecule instead of bent ~104.5°',
    expect: 'molecule=water → bent, 104.5° bond angle by construction',
  },
}

async function main() {
  console.log('\n=== LIVE-GROQ extraction before/after harness (needs Groq-reachable network) ===\n')
  let anyNull = false

  // ── Projectile ──
  console.log('############ CASE 1: PROJECTILE MOTION')
  console.log(`ROUTE: ${routeSceneGenerator(PROBE.projectile.text)}`)
  console.log(`OLD (free-form): ${PROBE.projectile.oldFailure}`)
  const pParams = await extractProjectileParams(PROBE.projectile.text)
  if (!pParams) { anyNull = true; console.log('NEW: extractProjectileParams returned null (LLM unreachable or refused).') }
  else {
    console.log(`NEW extracted params: ${JSON.stringify(pParams)}`)
    const spec = buildProjectileScene(pParams)
    const c = checkProjectileConsistency(spec, pParams)
    console.log(`NEW consistency check: ${c.ok ? 'PASS (parabolic by construction)' : 'FAIL — ' + c.errors.join('; ')}`)
    console.log(`EXPECT: ${PROBE.projectile.expect}`)
  }

  // ── Triangle ──
  console.log('\n############ CASE 2: TRIANGLE ANGLE SUM')
  console.log(`ROUTE: ${routeSceneGenerator(PROBE.triangle.text)}`)
  console.log(`OLD (free-form): ${PROBE.triangle.oldFailure}`)
  const tParams = await extractTriangleParams(PROBE.triangle.text)
  if (!tParams) { anyNull = true; console.log('NEW: extractTriangleParams returned null (LLM unreachable or refused).') }
  else {
    console.log(`NEW extracted params: ${JSON.stringify(tParams)}`)
    const spec = buildTriangleScene(tParams)
    const c = checkTriangleConsistency(spec, tParams)
    console.log(`NEW consistency check: ${c.ok ? 'PASS (vertices realise the stated angles, sum 180°)' : 'FAIL — ' + c.errors.join('; ')}`)
    console.log(`EXPECT: ${PROBE.triangle.expect}`)
  }

  // ── Molecule ──
  console.log('\n############ CASE 3: COVALENT BOND / MOLECULE GEOMETRY')
  console.log(`ROUTE: ${routeSceneGenerator(PROBE.molecule.text)}`)
  console.log(`OLD (free-form): ${PROBE.molecule.oldFailure}`)
  const mDef = await extractMolecule(PROBE.molecule.text)
  if (!mDef) { anyNull = true; console.log('NEW: extractMolecule returned null (LLM unreachable or refused).') }
  else {
    console.log(`NEW extracted molecule: ${mDef.name} (${mDef.geometry}, ${mDef.bondAngle}°)`)
    const spec = buildMoleculeScene(mDef)
    const c = checkMoleculeConsistency(spec, mDef)
    console.log(`NEW consistency check: ${c.ok ? 'PASS (bent 104.5°, not linear)' : 'FAIL — ' + c.errors.join('; ')}`)
    console.log(`EXPECT: ${PROBE.molecule.expect}`)
  }

  console.log('\n=== End. If any case shows "returned null", re-run on a Groq-reachable network. ===\n')
  process.exit(anyNull ? 1 : 0)
}

main()
