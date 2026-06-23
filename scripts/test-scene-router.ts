/**
 * Router-only test harness for the deterministic scene-generator router
 * (src/lib/teaching/sceneGenerators/sceneRouter.ts). NO Groq — tests only the
 * keyword routing decision, not parameter extraction or generation.
 *
 * Confirms each known scene type's real probe text routes to the correct
 * generator, that boundary/collision phrasings route correctly, and that
 * unrelated text routes to none.
 *
 * Run with:  npx tsx scripts/test-scene-router.ts
 */

import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== scene-generator router harness ===\n')

// ── The EXACT probe texts route to the right generator ───────────────────────
const projectileText = 'When you throw a ball at a 45-degree angle with an initial speed of 10 meters per second, it follows a parabolic trajectory. It starts at the origin, rises to a peak height, then falls back to the ground.'
const triangleText = 'Consider a triangle with vertices at A, B, and C. The three interior angles of any triangle always add up to 180 degrees. If angle A is 60 degrees and angle B is 70 degrees, then angle C must be 50 degrees.'
const moleculeText = 'A covalent bond forms when two atoms share a pair of electrons. Take a water molecule: the oxygen atom shares one electron pair with each of two hydrogen atoms, forming two single covalent bonds.'

check('probe projectile text → projectile', routeSceneGenerator(projectileText) === 'projectile',
  `got ${routeSceneGenerator(projectileText)}`)
check('probe triangle text → triangle', routeSceneGenerator(triangleText) === 'triangle',
  `got ${routeSceneGenerator(triangleText)}`)
check('probe molecule text → molecule', routeSceneGenerator(moleculeText) === 'molecule',
  `got ${routeSceneGenerator(moleculeText)}`)

// ── Collision guards — the tricky overlaps reasoned about in the rules ───────
check('projectile "launch angle" does NOT mis-route to triangle',
  routeSceneGenerator('A projectile fired with a launch angle of 30 degrees') === 'projectile')
check('molecule "bond angle" (contains "angle") does NOT mis-route to triangle',
  routeSceneGenerator('The bond angle in a water molecule is about 104.5 degrees') === 'molecule')
check('triangle text without "projectile"/"molecule" → triangle',
  routeSceneGenerator('Find the third interior angle of a triangle whose other two angles are 50 and 60 degrees') === 'triangle')

// ── Compact formula phrasings still route ────────────────────────────────────
check('"H2O" formula → molecule', routeSceneGenerator('Explain the shape of H2O') === 'molecule')
check('"CH4 tetrahedral" → molecule', routeSceneGenerator('Why is CH4 tetrahedral?') === 'molecule')

// ── Unrelated / no-match text → null ─────────────────────────────────────────
check('history prose → none', routeSceneGenerator('Compare the causes of the 1857 revolt and its aftermath.') === null)
check('grammar prose → none', routeSceneGenerator('Identify the verb in each of these two sentences.') === null)
check('bare "angle" alone does NOT route (too generic)',
  routeSceneGenerator('Measure the angle with a protractor.') === null)
check('empty string → none', routeSceneGenerator('') === null)
check('whitespace → none', routeSceneGenerator('   ') === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
