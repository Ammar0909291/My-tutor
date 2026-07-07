/**
 * Test harness for the deterministic projectile-motion scene generator
 * (src/lib/teaching/sceneGenerators/projectileMotion.ts). Pure math/formula —
 * NO Groq needed for the parts tested here.
 *
 * KEY TEST: feed the parameters from tonight's probe case (the projectile-motion
 * explanation: 45°, 10 m/s) and confirm the deterministic-formula version
 * produces a CORRECT parabolic trajectory — the exact case where the old
 * free-form LLM generator produced a non-parabolic (wrong) path.
 *
 * NOTE: extractProjectileParams()/generateProjectileScene() call the LLM and are
 * NOT exercised here — the parameter-EXTRACTION step needs a live Groq test.
 *
 * Run with:  npx tsx scripts/test-projectile-scene.ts
 */

import {
  buildProjectileScene,
  checkProjectileConsistency,
  validateProjectileParams,
  type ProjectileParams,
} from '../src/lib/teaching/sceneGenerators/projectileMotion'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== projectile-motion deterministic scene harness ===\n')

// ── The probe case: 45°, 10 m/s (g = 9.8) ────────────────────────────────────
const probeParams: ProjectileParams = { angleDegrees: 45, speed: 10 }
const spec = buildProjectileScene(probeParams)

check('probe case — structurally valid SceneSpec', validateSceneSpec(spec).valid,
  JSON.stringify(validateSceneSpec(spec).errors))
check('probe case — passes physics consistency check', checkProjectileConsistency(spec, probeParams).ok,
  checkProjectileConsistency(spec, probeParams).errors.join('; '))

const path = spec.steps.flatMap((s) => s.objects).find((o) => o.id === 'path')!
const pts = path.points!

// Geometry sanity — a REAL parabola, not the free-form generator's wrong path.
check('trajectory starts at the launch origin', Math.hypot(pts[0][0], pts[0][1]) < 0.5)
check('trajectory returns to the ground at the end', Math.abs(pts[pts.length - 1][1]) < 0.5)
check('trajectory has a single interior peak (rises then falls)', (() => {
  let peak = 0
  for (let i = 1; i < pts.length; i++) if (pts[i][1] > pts[peak][1]) peak = i
  return peak > 0 && peak < pts.length - 1
})())
check('45° → peak at the horizontal midpoint (symmetry)', (() => {
  let peak = 0
  for (let i = 1; i < pts.length; i++) if (pts[i][1] > pts[peak][1]) peak = i
  return Math.abs(pts[peak][0] - pts[pts.length - 1][0] / 2) < 0.6
})())
check('45° → range ≈ 4× max height (R = 4H tan… check R/H = 4/tanθ = 4)', (() => {
  // For θ=45°, R/H = 4/tan(45°) = 4. Verify from scaled coords (scale cancels).
  let peak = 0
  for (let i = 1; i < pts.length; i++) if (pts[i][1] > pts[peak][1]) peak = i
  const R = pts[pts.length - 1][0]
  const H = pts[peak][1]
  return Math.abs(R / H - 4) < 0.2
})())

// ── Parameter validation (reject hallucinated / impossible values) ───────────
check('reject angle ≥ 90°', validateProjectileParams({ angleDegrees: 200, speed: 10 }) === null)
check('reject angle ≤ 0°', validateProjectileParams({ angleDegrees: 0, speed: 10 }) === null)
check('reject non-positive speed', validateProjectileParams({ angleDegrees: 45, speed: 0 }) === null)
check('accept a sane pair', validateProjectileParams({ angleDegrees: 30, speed: 25 })?.angleDegrees === 30)
check('default gravity applied when omitted', validateProjectileParams({ angleDegrees: 30, speed: 25 })?.gravity === 9.8)

// ── A second, asymmetric angle to confirm it generalizes ─────────────────────
const steep: ProjectileParams = { angleDegrees: 70, speed: 20 }
const steepSpec = buildProjectileScene(steep)
check('70° case — valid + consistent', validateSceneSpec(steepSpec).valid && checkProjectileConsistency(steepSpec, steep).ok)
check('70° → taller than wide (H > R since R/H = 4/tan70° ≈ 1.46 → still R>H)…', (() => {
  // R/H = 4/tan(70°) ≈ 1.456 → range still exceeds height, but less so than 45°.
  const sp = steepSpec.steps.flatMap((s) => s.objects).find((o) => o.id === 'path')!.points!
  let peak = 0
  for (let i = 1; i < sp.length; i++) if (sp[i][1] > sp[peak][1]) peak = i
  const ratio = sp[sp.length - 1][0] / sp[peak][1]
  return Math.abs(ratio - 4 / Math.tan((70 * Math.PI) / 180)) < 0.2
})())


// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for angleDegrees does not coerce to 1 (Number(true)===1 coercion trap)', validateProjectileParams({ angleDegrees: true, speed: 10 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
