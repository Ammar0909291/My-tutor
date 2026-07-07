/**
 * Test harness for the deterministic calculus function-graph scene generator
 * (src/lib/teaching/sceneGenerators/calculusGraph.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: sampled curve points match the
 * re-derived function, and every marked critical point genuinely satisfies
 * f'(x) ≈ 0 — across polynomial, trig, exponential and log functions,
 * including the no-critical-point (monotonic) case.
 *
 * extractCalculusParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-calculus-graph.ts
 */

import {
  buildCalculusGraphScene,
  checkCalculusConsistency,
  validateCalculusParams,
  type CalculusParams,
} from '../src/lib/teaching/sceneGenerators/calculusGraph'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const criticalPoints = (spec: ReturnType<typeof buildCalculusGraphScene>): SceneObject[] =>
  spec.steps.flatMap((s) => s.objects).filter((o) => o.id?.startsWith('critical-'))

console.log('\n=== calculus function-graph deterministic scene harness ===\n')

// ── Polynomial: f(x) = x^2 - 4x + 3, critical point at x=2 (vertex) ──────────
const poly: CalculusParams = { functionType: 'polynomial', coefficients: [1, -4, 3], domainMin: -2, domainMax: 6 }
const specPoly = buildCalculusGraphScene(poly)

check('polynomial — structurally valid SceneSpec', validateSceneSpec(specPoly).valid, JSON.stringify(validateSceneSpec(specPoly).errors))
check('polynomial — passes independent consistency check', checkCalculusConsistency(specPoly, poly).ok,
  checkCalculusConsistency(specPoly, poly).errors.join('; '))
check('polynomial — exactly 1 critical point found (parabola vertex)', criticalPoints(specPoly).length === 1)
check('polynomial — critical point is at x ≈ 2', (() => {
  const props = criticalPoints(specPoly)[0].properties as Record<string, unknown>
  return Math.abs((props.x as number) - 2) < 0.01
})())
check('polynomial — critical point fpx is ≈ 0', (() => {
  const props = criticalPoints(specPoly)[0].properties as Record<string, unknown>
  return Math.abs(props.fpx as number) < 1e-3
})())

// ── Trig: f(x) = 3*sin(x), critical points at x=π/2, 3π/2 within [0, 2π] ─────
const trig: CalculusParams = { functionType: 'trig', coefficients: [3, 1], domainMin: 0, domainMax: 2 * Math.PI }
const specTrig = buildCalculusGraphScene(trig)

check('trig — structurally valid SceneSpec', validateSceneSpec(specTrig).valid, JSON.stringify(validateSceneSpec(specTrig).errors))
check('trig — passes independent consistency check', checkCalculusConsistency(specTrig, trig).ok,
  checkCalculusConsistency(specTrig, trig).errors.join('; '))
check('trig — exactly 2 critical points found (π/2 and 3π/2)', criticalPoints(specTrig).length === 2)
check('trig — critical points are at x ≈ π/2 and x ≈ 3π/2', (() => {
  const xs = criticalPoints(specTrig).map((o) => (o.properties as Record<string, unknown>).x as number).sort((a, b) => a - b)
  return Math.abs(xs[0] - Math.PI / 2) < 0.01 && Math.abs(xs[1] - 3 * Math.PI / 2) < 0.01
})())
check('trig — all critical points have fpx ≈ 0', criticalPoints(specTrig).every((o) => Math.abs((o.properties as Record<string, unknown>).fpx as number) < 1e-3))

// ── Exponential: f(x) = 2*e^(0.5x), monotonic increasing — no critical points ─
const expo: CalculusParams = { functionType: 'exponential', coefficients: [2, 0.5], domainMin: -5, domainMax: 5 }
const specExpo = buildCalculusGraphScene(expo)

check('exponential — structurally valid SceneSpec', validateSceneSpec(specExpo).valid, JSON.stringify(validateSceneSpec(specExpo).errors))
check('exponential — passes independent consistency check', checkCalculusConsistency(specExpo, expo).ok,
  checkCalculusConsistency(specExpo, expo).errors.join('; '))
check('exponential — no critical points found (monotonic)', criticalPoints(specExpo).length === 0)
check('exponential — has the "no-critical-points" label', specExpo.steps.flatMap((s) => s.objects).some((o) => o.id === 'no-critical-points'))

// ── Log: f(x) = ln(x), monotonic increasing — no critical points ─────────────
const log: CalculusParams = { functionType: 'log', coefficients: [1], domainMin: 1, domainMax: 10 }
const specLog = buildCalculusGraphScene(log)

check('log — structurally valid SceneSpec', validateSceneSpec(specLog).valid, JSON.stringify(validateSceneSpec(specLog).errors))
check('log — passes independent consistency check', checkCalculusConsistency(specLog, log).ok,
  checkCalculusConsistency(specLog, log).errors.join('; '))
check('log — no critical points found (monotonic)', criticalPoints(specLog).length === 0)

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject unknown functionType', validateCalculusParams({ functionType: 'rational', coefficients: [1], domainMin: -5, domainMax: 5 }) === null)
check('reject empty coefficients', validateCalculusParams({ functionType: 'polynomial', coefficients: [], domainMin: -5, domainMax: 5 }) === null)
check('reject domainMin >= domainMax', validateCalculusParams({ functionType: 'polynomial', coefficients: [1, 0], domainMin: 5, domainMax: 5 }) === null)
check('reject log with domainMin <= 0', validateCalculusParams({ functionType: 'log', coefficients: [1], domainMin: -1, domainMax: 10 }) === null)
check('reject trig with wrong coefficient count', validateCalculusParams({ functionType: 'trig', coefficients: [1, 2, 3], domainMin: -5, domainMax: 5 }) === null)
check('accept a valid polynomial', validateCalculusParams({ functionType: 'polynomial', coefficients: [1, -4, 3], domainMin: -2, domainMax: 6 })?.functionType === 'polynomial')

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for domainMin does not coerce to 1 (Number(true)===1 coercion trap)',
  validateCalculusParams({ functionType: 'polynomial', coefficients: [1, 0], domainMin: true, domainMax: 5 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
