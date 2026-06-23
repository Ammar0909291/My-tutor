/**
 * Test harness for the deterministic simple-pendulum scene generator
 * (src/lib/teaching/sceneGenerators/pendulumMotion.ts). Pure geometry — no Groq.
 *
 * Verifies by independent recomputation: every bob position is at exactly the
 * string length from the pivot (string never stretches), the swing is symmetric,
 * and the period matches T = 2π√(L/g).
 *
 * extractPendulumParams()/generatePendulumScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-pendulum-scene.ts
 */

import {
  buildPendulumScene,
  checkPendulumConsistency,
  validatePendulumParams,
  type PendulumParams,
} from '../src/lib/teaching/sceneGenerators/pendulumMotion'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject, Vec3 } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildPendulumScene>, id: string): SceneObject =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)!

console.log('\n=== simple pendulum deterministic scene harness ===\n')

// ── L = 1 m, amplitude 20°, g = 9.8 → T = 2π√(1/9.8) ≈ 2.007 s ───────────────
const p: PendulumParams = { length: 1, amplitudeDeg: 20 }
const spec = buildPendulumScene(p)

check('structurally valid SceneSpec', validateSceneSpec(spec).valid, JSON.stringify(validateSceneSpec(spec).errors))
check('passes independent consistency check', checkPendulumConsistency(spec, p).ok,
  checkPendulumConsistency(spec, p).errors.join('; '))

const pivot = obj(spec, 'pivot').position as Vec3
const arc = obj(spec, 'arc').points as Vec3[]

check('every bob position is the SAME distance from the pivot (string constant)', (() => {
  const d = arc.map((q) => Math.hypot(q[0] - pivot[0], q[1] - pivot[1]))
  return Math.max(...d) - Math.min(...d) < 0.05
})())
check('swing symmetric about the vertical (endpoints mirror in x)', (() => {
  const a0 = arc[0], aN = arc[arc.length - 1]
  return Math.abs(a0[0] + aN[0]) < 0.05 && Math.abs(a0[1] - aN[1]) < 0.05
})())
check('lowest point is directly below the pivot (x ≈ 0)', (() => {
  let low = 0
  for (let i = 1; i < arc.length; i++) if (arc[i][1] < arc[low][1]) low = i
  return Math.abs(arc[low][0] - pivot[0]) < 0.05
})())
check('period label ≈ 2.007 s (2π√(1/9.8))', (() => {
  const T = Number((obj(spec, 'period').properties as Record<string, unknown>).period)
  return Math.abs(T - 2 * Math.PI * Math.sqrt(1 / 9.8)) < 1e-3
})())
check('title states T ≈ 2.01', spec.title.includes('2.01') || spec.title.includes('2.0'))

// ── L = 4 m → period doubles vs L = 1 m (T ∝ √L) ─────────────────────────────
const p4: PendulumParams = { length: 4, amplitudeDeg: 15 }
const spec4 = buildPendulumScene(p4)
check('L=4 — valid + consistent', validateSceneSpec(spec4).valid && checkPendulumConsistency(spec4, p4).ok)
check('L=4 → period is 2× the L=1 period (T ∝ √L)', (() => {
  const T1 = Number((obj(spec, 'period').properties as Record<string, unknown>).period)
  const T4 = Number((obj(spec4, 'period').properties as Record<string, unknown>).period)
  return Math.abs(T4 / T1 - 2) < 0.01
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject non-positive length', validatePendulumParams({ length: 0, amplitudeDeg: 20 }) === null)
check('reject amplitude > 90°', validatePendulumParams({ length: 1, amplitudeDeg: 120 }) === null)
check('accept a valid pair', validatePendulumParams({ length: 2, amplitudeDeg: 30 })?.length === 2)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
