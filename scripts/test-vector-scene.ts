/**
 * Test harness for the deterministic vector-addition scene generator
 * (src/lib/teaching/sceneGenerators/vectorAddition.ts). Pure geometry — no Groq.
 *
 * KEY TEST: a classic 3-east + 4-north case → resultant magnitude 5 at ~53.13°
 * (the 3-4-5 right triangle), verified by an INDEPENDENT law-of-cosines/Pythagoras
 * recomputation from the rendered coordinates, not the component sum used to build.
 *
 * extractVectorParams()/generateVectorScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-vector-scene.ts
 */

import {
  buildVectorScene,
  checkVectorConsistency,
  validateVectorParams,
  type VectorParams,
} from '../src/lib/teaching/sceneGenerators/vectorAddition'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { Vec3 } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const tip = (spec: ReturnType<typeof buildVectorScene>, id: string): Vec3 =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)!.to as Vec3

console.log('\n=== vector-addition deterministic scene harness ===\n')

// ── Classic 3-4-5: A = 3 east (0°), B = 4 north (90°) → |R| = 5 at 53.13° ─────
const p345: VectorParams = { aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 }
const spec = buildVectorScene(p345)

check('3-4-5 — structurally valid SceneSpec', validateSceneSpec(spec).valid,
  JSON.stringify(validateSceneSpec(spec).errors))
check('3-4-5 — passes independent consistency check', checkVectorConsistency(spec, p345).ok,
  checkVectorConsistency(spec, p345).errors.join('; '))

// Independent re-derivation from rendered coords (scale cancels in the angle/ratio).
const A = tip(spec, 'A'), B = tip(spec, 'B'), R = tip(spec, 'R')
check('R is the parallelogram diagonal (R == A + B)',
  Math.abs(R[0] - (A[0] + B[0])) < 0.05 && Math.abs(R[1] - (A[1] + B[1])) < 0.05)
check('|R| : |A| ratio = 5 : 3 (Pythagoras, scale-independent)',
  Math.abs(Math.hypot(R[0], R[1]) / Math.hypot(A[0], A[1]) - 5 / 3) < 0.02)
check('resultant points at ~53.13° (atan2(4,3))', (() => {
  const ang = (Math.atan2(R[1], R[0]) * 180) / Math.PI
  return Math.abs(ang - 53.13) < 0.3
})())
check('title states |R| ≈ 5', spec.title.includes('5'))

// ── Anti-parallel: A = 5 @ 0°, B = 5 @ 180° → zero resultant is REJECTED ──────
// (no drawable resultant vector; the params guard must reject the degenerate pair)
check('exactly-opposing equal vectors → rejected (degenerate, no drawable resultant)',
  validateVectorParams({ aMag: 5, aAngleDeg: 0, bMag: 5, bAngleDeg: 180 }) === null)
check('near-opposing (179°) also rejected (resultant ~0)',
  validateVectorParams({ aMag: 5, aAngleDeg: 0, bMag: 5, bAngleDeg: 179 }) === null)
check('genuinely different magnitudes opposing still OK (resultant non-zero)',
  validateVectorParams({ aMag: 8, aAngleDeg: 0, bMag: 3, bAngleDeg: 180 })?.aMag === 8)

// ── 60° between equal vectors: |R| = a·√3 (law of cosines) ───────────────────
const eq60: VectorParams = { aMag: 6, aAngleDeg: 0, bMag: 6, bAngleDeg: 60 }
const eqSpec = buildVectorScene(eq60)
check('equal vectors at 60° — valid + consistent',
  validateSceneSpec(eqSpec).valid && checkVectorConsistency(eqSpec, eq60).ok)
check('equal vectors at 60° → |R| : |A| = √3 (law of cosines)', (() => {
  const Re = tip(eqSpec, 'R'), Ae = tip(eqSpec, 'A')
  return Math.abs(Math.hypot(Re[0], Re[1]) / Math.hypot(Ae[0], Ae[1]) - Math.sqrt(3)) < 0.02
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject non-positive magnitude', validateVectorParams({ aMag: 0, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 }) === null)
check('reject non-finite angle', validateVectorParams({ aMag: 3, aAngleDeg: NaN, bMag: 4, bAngleDeg: 90 }) === null)
check('accept a valid set', validateVectorParams({ aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 })?.aMag === 3)


// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for aMag does not coerce to 1 (Number(true)===1 coercion trap)', validateVectorParams({ aMag: true, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
