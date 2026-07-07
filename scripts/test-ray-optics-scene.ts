/**
 * Test harness for the deterministic ray-optics scene generator
 * (src/lib/teaching/sceneGenerators/rayOptics.ts). Pure geometry — no Groq.
 *
 * Verifies by independent recomputation: mirror/lens formula results, the
 * real/virtual and erect/inverted classification, and structural validity —
 * across concave mirror, convex mirror, convex (converging) lens, and concave
 * (diverging) lens cases.
 *
 * extractRayOpticsParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-ray-optics-scene.ts
 */

import {
  buildRayOpticsScene,
  checkRayOpticsConsistency,
  validateRayOpticsParams,
  type RayOpticsParams,
} from '../src/lib/teaching/sceneGenerators/rayOptics'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildRayOpticsScene>, id: string): SceneObject =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)!

console.log('\n=== ray optics deterministic scene harness ===\n')

// ── Concave mirror, object beyond centre of curvature (u=30, f=15) ──────────
// Expect: v=30 (real, |v|>0 magnitude same as u), m=-1 (inverted, same size).
const concaveMirror: RayOpticsParams = { opticsType: 'concave_mirror', objectDistance: 30, focalLength: 15, objectHeight: 4 }
const specCM = buildRayOpticsScene(concaveMirror)

check('concave mirror — structurally valid SceneSpec', validateSceneSpec(specCM).valid, JSON.stringify(validateSceneSpec(specCM).errors))
check('concave mirror — passes independent consistency check', checkRayOpticsConsistency(specCM, concaveMirror).ok,
  checkRayOpticsConsistency(specCM, concaveMirror).errors.join('; '))
check('concave mirror at u=2f — image distance ≈ 30 (v=u)', (() => {
  const label = obj(specCM, 'result-label')
  const v = (label.properties as Record<string, unknown>).v as number
  return Math.abs(Math.abs(v) - 30) < 0.01
})())
check('concave mirror at u=2f — magnification ≈ -1 (inverted, same size)', (() => {
  const label = obj(specCM, 'result-label')
  const m = (label.properties as Record<string, unknown>).m as number
  return Math.abs(m - -1) < 0.01
})())
check('concave mirror at u=2f — image is real', (() => {
  const label = obj(specCM, 'result-label')
  return (label.properties as Record<string, unknown>).real === true
})())
check('concave mirror at u=2f — image is inverted (not erect)', (() => {
  const label = obj(specCM, 'result-label')
  return (label.properties as Record<string, unknown>).erect === false
})())

// ── Convex mirror (always virtual, erect, diminished) ────────────────────────
const convexMirror: RayOpticsParams = { opticsType: 'convex_mirror', objectDistance: 20, focalLength: 10, objectHeight: 3 }
const specVM = buildRayOpticsScene(convexMirror)

check('convex mirror — structurally valid SceneSpec', validateSceneSpec(specVM).valid, JSON.stringify(validateSceneSpec(specVM).errors))
check('convex mirror — passes independent consistency check', checkRayOpticsConsistency(specVM, convexMirror).ok,
  checkRayOpticsConsistency(specVM, convexMirror).errors.join('; '))
check('convex mirror — image is virtual', (() => {
  const label = obj(specVM, 'result-label')
  return (label.properties as Record<string, unknown>).real === false
})())
check('convex mirror — image is erect', (() => {
  const label = obj(specVM, 'result-label')
  return (label.properties as Record<string, unknown>).erect === true
})())

// ── Convex (converging) lens, object beyond 2f (u=30, f=10) ──────────────────
// Expect: real, inverted, diminished image between f and 2f.
const convexLens: RayOpticsParams = { opticsType: 'convex_lens', objectDistance: 30, focalLength: 10, objectHeight: 4 }
const specVL = buildRayOpticsScene(convexLens)

check('convex lens — structurally valid SceneSpec', validateSceneSpec(specVL).valid, JSON.stringify(validateSceneSpec(specVL).errors))
check('convex lens — passes independent consistency check', checkRayOpticsConsistency(specVL, convexLens).ok,
  checkRayOpticsConsistency(specVL, convexLens).errors.join('; '))
check('convex lens at u>2f — image is real', (() => {
  const label = obj(specVL, 'result-label')
  return (label.properties as Record<string, unknown>).real === true
})())
check('convex lens at u>2f — image is inverted', (() => {
  const label = obj(specVL, 'result-label')
  return (label.properties as Record<string, unknown>).erect === false
})())
check('convex lens at u>2f — image distance v=15 (1/15=1/10-1/30)', (() => {
  const label = obj(specVL, 'result-label')
  const v = (label.properties as Record<string, unknown>).v as number
  return Math.abs(v - 15) < 0.01
})())

// ── Concave (diverging) lens (always virtual, erect, diminished) ─────────────
const concaveLens: RayOpticsParams = { opticsType: 'concave_lens', objectDistance: 20, focalLength: 10, objectHeight: 4 }
const specCL = buildRayOpticsScene(concaveLens)

check('concave lens — structurally valid SceneSpec', validateSceneSpec(specCL).valid, JSON.stringify(validateSceneSpec(specCL).errors))
check('concave lens — passes independent consistency check', checkRayOpticsConsistency(specCL, concaveLens).ok,
  checkRayOpticsConsistency(specCL, concaveLens).errors.join('; '))
check('concave lens — image is virtual', (() => {
  const label = obj(specCL, 'result-label')
  return (label.properties as Record<string, unknown>).real === false
})())
check('concave lens — image is erect', (() => {
  const label = obj(specCL, 'result-label')
  return (label.properties as Record<string, unknown>).erect === true
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject non-positive objectDistance', validateRayOpticsParams({ opticsType: 'convex_lens', objectDistance: 0, focalLength: 10 }) === null)
check('reject non-positive focalLength', validateRayOpticsParams({ opticsType: 'convex_lens', objectDistance: 20, focalLength: -5 }) === null)
check('reject unknown opticsType', validateRayOpticsParams({ opticsType: 'flat_mirror', objectDistance: 20, focalLength: 10 }) === null)
check('reject object exactly at focal point (u=f)', validateRayOpticsParams({ opticsType: 'convex_lens', objectDistance: 10, focalLength: 10 }) === null)
check('accept a valid set, defaulting objectHeight to 2', validateRayOpticsParams({ opticsType: 'concave_mirror', objectDistance: 30, focalLength: 15 })?.objectHeight === 2)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for objectDistance does not coerce to 1 (Number(true)===1 coercion trap)',
  validateRayOpticsParams({ opticsType: 'convex_lens', objectDistance: true, focalLength: 10 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
