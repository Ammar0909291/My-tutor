/**
 * Test harness for the deterministic uniform-circular-motion scene generator
 * (src/lib/teaching/sceneGenerators/circularMotion.ts). Pure geometry — no Groq.
 *
 * Verifies, by INDEPENDENT recomputation from the rendered coordinates, the two
 * defining facts of uniform circular motion: velocity ⊥ radius, and acceleration
 * pointing to the centre with magnitude v²/r.
 *
 * extractCircularParams()/generateCircularScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-circular-scene.ts
 */

import {
  buildCircularScene,
  checkCircularConsistency,
  validateCircularParams,
  type CircularParams,
} from '../src/lib/teaching/sceneGenerators/circularMotion'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject, Vec3 } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildCircularScene>, id: string): SceneObject =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)!

console.log('\n=== uniform circular motion deterministic scene harness ===\n')

// ── r = 2 m, v = 4 m/s → a_c = v²/r = 8 m/s² ─────────────────────────────────
const p: CircularParams = { radius: 2, speed: 4 }
const spec = buildCircularScene(p)

check('structurally valid SceneSpec', validateSceneSpec(spec).valid, JSON.stringify(validateSceneSpec(spec).errors))
check('passes independent consistency check', checkCircularConsistency(spec, p).ok,
  checkCircularConsistency(spec, p).errors.join('; '))

const particle = obj(spec, 'particle').position as Vec3
const vel = obj(spec, 'velocity')
const acc = obj(spec, 'acceleration')

// Velocity ⊥ radius (radius is the particle position, centre at origin).
check('velocity is perpendicular to the radius', (() => {
  const vDir = [vel.to![0] - vel.from![0], vel.to![1] - vel.from![1]]
  const dot = particle[0] * vDir[0] + particle[1] * vDir[1]
  return Math.abs(dot) < 0.05
})())

// Acceleration points to the centre (antiparallel to the particle's radius vector).
check('acceleration points to the centre', (() => {
  const aDir = [acc.to![0] - acc.from![0], acc.to![1] - acc.from![1]]
  const cos = (particle[0] * aDir[0] + particle[1] * aDir[1]) /
    (Math.hypot(particle[0], particle[1]) * Math.hypot(aDir[0], aDir[1]))
  return cos < -0.98
})())

check('centripetal magnitude label = v²/r = 8', (() => {
  const m = Number((acc.properties as Record<string, unknown>).magnitude)
  return Math.abs(m - 8) < 1e-6
})())
check('title states a_c ≈ 8', spec.title.includes('8'))

// Every circle point at the same radius (scale-independent: max/min radius ratio ≈ 1).
check('all circle points are equidistant from the centre', (() => {
  const pts = obj(spec, 'circle').points as Vec3[]
  const radii = pts.map((q) => Math.hypot(q[0], q[1]))
  return Math.max(...radii) - Math.min(...radii) < 0.05
})())

// ── A second set generalizes ─────────────────────────────────────────────────
const p2: CircularParams = { radius: 5, speed: 10 } // a_c = 20
const spec2 = buildCircularScene(p2)
check('r=5,v=10 — valid + consistent', validateSceneSpec(spec2).valid && checkCircularConsistency(spec2, p2).ok)
check('r=5,v=10 → a_c = 20', Math.abs(Number((obj(spec2, 'acceleration').properties as Record<string, unknown>).magnitude) - 20) < 1e-6)

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject non-positive radius', validateCircularParams({ radius: 0, speed: 4 }) === null)
check('reject non-positive speed', validateCircularParams({ radius: 2, speed: -1 }) === null)
check('accept a valid pair', validateCircularParams({ radius: 2, speed: 4 })?.radius === 2)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
