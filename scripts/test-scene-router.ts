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

// ── Vector addition (4th type) + its collision reasoning ─────────────────────
check('vector-addition prose → vector',
  routeSceneGenerator('Add the two vectors tip-to-tail to find the resultant.') === 'vector')
check('"parallelogram law" → vector',
  routeSceneGenerator('Using the parallelogram law, find the resultant of a 3 N and a 4 N force.') === 'vector')
check('bare "velocity vector" in projectile text does NOT route to vector',
  routeSceneGenerator('The velocity vector of the projectile follows a parabolic trajectory.') === 'projectile')
check('"resultant of the projectile velocity vectors" → projectile (most-specific-first, documented)',
  routeSceneGenerator('Find the resultant of the projectile velocity vectors.') === 'projectile')

// ── Circular motion (5th type) + its collision reasoning ─────────────────────
check('circular-motion prose → circular',
  routeSceneGenerator('A car moves in a circle of radius 50 m; find its centripetal acceleration.') === 'circular')
check('"uniform circular motion" → circular',
  routeSceneGenerator('Explain uniform circular motion and the centripetal force.') === 'circular')
check('"circular trajectory" → circular (not projectile, despite "trajectory")',
  routeSceneGenerator('The moon follows a nearly circular trajectory around the Earth.') === 'circular')
check('plain projectile "trajectory" (no "circular") still → projectile',
  routeSceneGenerator('The ball follows a parabolic trajectory after launch.') === 'projectile')

// ── Pendulum (6th type) ──────────────────────────────────────────────────────
check('pendulum prose → pendulum',
  routeSceneGenerator('A simple pendulum of length 1 m swings back and forth; find its period.') === 'pendulum')
check('"swinging bob" → pendulum',
  routeSceneGenerator('The swinging bob reaches its highest point at the ends of the arc.') === 'pendulum')

// ── Electron shells (7th type) + collision reasoning vs molecule ─────────────
check('electron-configuration prose → electron_shells',
  routeSceneGenerator('Draw the electron configuration of sodium using the Bohr model.') === 'electron_shells')
check('"electron shells of oxygen" → electron_shells',
  routeSceneGenerator('Show the electron shells of an oxygen atom.') === 'electron_shells')
check('molecule "shares a pair of electrons" still → molecule (no shell keyword)',
  routeSceneGenerator('A covalent bond forms when two atoms share a pair of electrons in a water molecule.') === 'molecule')
check('"electron configuration in a water molecule" → electron_shells (explicit shell cue wins)',
  routeSceneGenerator('What is the electron configuration of oxygen in a water molecule?') === 'electron_shells')

// ── Unrelated / no-match text → null ─────────────────────────────────────────
check('history prose → none', routeSceneGenerator('Compare the causes of the 1857 revolt and its aftermath.') === null)
check('grammar prose → none', routeSceneGenerator('Identify the verb in each of these two sentences.') === null)
check('bare "angle" alone does NOT route (too generic)',
  routeSceneGenerator('Measure the angle with a protractor.') === null)
check('empty string → none', routeSceneGenerator('') === null)
check('whitespace → none', routeSceneGenerator('   ') === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
