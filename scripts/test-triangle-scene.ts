/**
 * Test harness for the deterministic triangle angle-sum scene generator
 * (src/lib/teaching/sceneGenerators/triangleAngleSum.ts). Pure geometry — no Groq.
 *
 * KEY TEST: feed the probe case (triangle with A=60°, B=70° → C=50°) and confirm
 * the vertex positions ACTUALLY realise those angles (law of cosines, recomputed
 * from coordinates) — the exact property the old free-form generator violated.
 *
 * extractTriangleParams()/generateTriangleScene() call the LLM and are NOT tested
 * here — the extraction step needs a live Groq test.
 *
 * Run with:  npx tsx scripts/test-triangle-scene.ts
 */

import {
  buildTriangleScene,
  checkTriangleConsistency,
  validateTriangleParams,
  type TriangleParams,
} from '../src/lib/teaching/sceneGenerators/triangleAngleSum'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { Vec3 } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

// Independent re-measurement of an interior angle from coordinates.
function angleAt(v: Vec3, n1: Vec3, n2: Vec3): number {
  const u = [n1[0] - v[0], n1[1] - v[1]]
  const w = [n2[0] - v[0], n2[1] - v[1]]
  const dot = u[0] * w[0] + u[1] * w[1]
  const mag = Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1])
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI
}

console.log('\n=== triangle angle-sum deterministic scene harness ===\n')

// ── The probe case: A = 60°, B = 70° → C = 50° ───────────────────────────────
const probe: TriangleParams = { angleA: 60, angleB: 70 }
const spec = buildTriangleScene(probe)

check('probe case — structurally valid SceneSpec', validateSceneSpec(spec).valid,
  JSON.stringify(validateSceneSpec(spec).errors))
check('probe case — passes angle consistency check', checkTriangleConsistency(spec, probe).ok,
  checkTriangleConsistency(spec, probe).errors.join('; '))

const objs = spec.steps.flatMap((s) => s.objects)
const A = objs.find((o) => o.id === 'A')!.position as Vec3
const B = objs.find((o) => o.id === 'B')!.position as Vec3
const C = objs.find((o) => o.id === 'C')!.position as Vec3

check('vertex A coordinates realise 60° (recomputed from positions)', Math.abs(angleAt(A, B, C) - 60) < 0.5,
  `got ${angleAt(A, B, C).toFixed(2)}°`)
check('vertex B coordinates realise 70°', Math.abs(angleAt(B, A, C) - 70) < 0.5,
  `got ${angleAt(B, A, C).toFixed(2)}°`)
check('vertex C coordinates realise 50° (the taught angle-sum result)', Math.abs(angleAt(C, A, B) - 50) < 0.5,
  `got ${angleAt(C, A, B).toFixed(2)}°`)
check('measured angles sum to 180°', Math.abs(angleAt(A, B, C) + angleAt(B, A, C) + angleAt(C, A, B) - 180) < 0.5)
check('title states the correct third angle (50°)', spec.title.includes('50'))

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject A + B ≥ 180', validateTriangleParams({ angleA: 120, angleB: 70 }) === null)
check('reject non-positive angle', validateTriangleParams({ angleA: 0, angleB: 70 }) === null)
check('accept a valid pair', validateTriangleParams({ angleA: 30, angleB: 90 })?.angleA === 30)

// ── A second (scalene, obtuse) case to confirm it generalizes ────────────────
const obtuse: TriangleParams = { angleA: 100, angleB: 35 } // C = 45°
const oSpec = buildTriangleScene(obtuse)
const oObjs = oSpec.steps.flatMap((s) => s.objects)
const oA = oObjs.find((o) => o.id === 'A')!.position as Vec3
const oB = oObjs.find((o) => o.id === 'B')!.position as Vec3
const oC = oObjs.find((o) => o.id === 'C')!.position as Vec3
check('obtuse case (100°,35°,45°) — valid + consistent',
  validateSceneSpec(oSpec).valid && checkTriangleConsistency(oSpec, obtuse).ok)
check('obtuse vertex A realises 100°', Math.abs(angleAt(oA, oB, oC) - 100) < 0.5, `got ${angleAt(oA, oB, oC).toFixed(2)}°`)


// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('array [60] for angleA does not coerce to 60 (Number([60])===60 coercion trap)', validateTriangleParams({ angleA: [60], angleB: 70 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
