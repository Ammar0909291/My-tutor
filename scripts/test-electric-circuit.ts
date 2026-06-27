/**
 * Test harness for the deterministic electric circuit scene generator
 * (src/lib/teaching/sceneGenerators/electricCircuit.ts). Pure Ohm's-law
 * computation — no Groq.
 *
 * Verifies by independent recomputation: total resistance, total current,
 * and per-resistor current/voltage-drop all match re-derived Ohm's-law
 * values, and Kirchhoff's voltage law (series) / current law (parallel)
 * genuinely hold against the stored scene values.
 *
 * extractCircuitParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-electric-circuit.ts
 */

import {
  buildCircuitScene,
  checkCircuitConsistency,
  validateCircuitParams,
  type CircuitParams,
} from '../src/lib/teaching/sceneGenerators/electricCircuit'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildCircuitScene>, id: string): SceneObject | undefined =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)

console.log('\n=== electric circuit deterministic scene harness ===\n')

// ── Series: 3 resistors (2Ω, 3Ω, 5Ω) at 10V → R_total=10, I=1A everywhere ─────
const series: CircuitParams = {
  components: [
    { type: 'battery', value: 10, unit: 'V' },
    { type: 'resistor', value: 2, unit: 'Ω' },
    { type: 'resistor', value: 3, unit: 'Ω' },
    { type: 'resistor', value: 5, unit: 'Ω' },
  ],
  connection: 'series',
  voltage: 10,
}
const specSeries = buildCircuitScene(series)

check('series — structurally valid SceneSpec', validateSceneSpec(specSeries).valid, JSON.stringify(validateSceneSpec(specSeries).errors))
check('series — passes independent consistency check', checkCircuitConsistency(specSeries, series).ok,
  checkCircuitConsistency(specSeries, series).errors.join('; '))
check('series — total resistance is 10 Ω', Math.abs((obj(specSeries, 'total-label')!.properties as Record<string, unknown>).rTotal as number - 10) < 1e-3)
check('series — total current is 1 A', Math.abs((obj(specSeries, 'total-label')!.properties as Record<string, unknown>).iTotal as number - 1) < 1e-3)
check('series — same current (1A) through every resistor', ['resistor-0', 'resistor-1', 'resistor-2'].every((id) =>
  Math.abs((obj(specSeries, id)!.properties as Record<string, unknown>).current as number - 1) < 1e-3))
check('series — voltage drops are 2V, 3V, 5V respectively', (() => {
  const drops = ['resistor-0', 'resistor-1', 'resistor-2'].map((id) => (obj(specSeries, id)!.properties as Record<string, unknown>).voltageDrop as number)
  return Math.abs(drops[0] - 2) < 1e-3 && Math.abs(drops[1] - 3) < 1e-3 && Math.abs(drops[2] - 5) < 1e-3
})())
check('series — KVL: sum of voltage drops equals source voltage', (() => {
  const drops = ['resistor-0', 'resistor-1', 'resistor-2'].map((id) => (obj(specSeries, id)!.properties as Record<string, unknown>).voltageDrop as number)
  return Math.abs(drops.reduce((a, b) => a + b, 0) - 10) < 1e-3
})())

// ── Parallel: 2 resistors (4Ω, 4Ω) at 8V → R_total=2, branch currents=2A each ─
const parallel: CircuitParams = {
  components: [
    { type: 'resistor', value: 4, unit: 'Ω' },
    { type: 'resistor', value: 4, unit: 'Ω' },
  ],
  connection: 'parallel',
  voltage: 8,
}
const specParallel = buildCircuitScene(parallel)

check('parallel — structurally valid SceneSpec', validateSceneSpec(specParallel).valid, JSON.stringify(validateSceneSpec(specParallel).errors))
check('parallel — passes independent consistency check', checkCircuitConsistency(specParallel, parallel).ok,
  checkCircuitConsistency(specParallel, parallel).errors.join('; '))
check('parallel — total resistance is 2 Ω', Math.abs((obj(specParallel, 'total-label')!.properties as Record<string, unknown>).rTotal as number - 2) < 1e-3)
check('parallel — total current is 4 A', Math.abs((obj(specParallel, 'total-label')!.properties as Record<string, unknown>).iTotal as number - 4) < 1e-3)
check('parallel — both branches see the full source voltage (8V)', ['resistor-0', 'resistor-1'].every((id) =>
  Math.abs((obj(specParallel, id)!.properties as Record<string, unknown>).voltageDrop as number - 8) < 1e-3))
check('parallel — each branch current is 2A', ['resistor-0', 'resistor-1'].every((id) =>
  Math.abs((obj(specParallel, id)!.properties as Record<string, unknown>).current as number - 2) < 1e-3))
check('parallel — KCL: sum of branch currents equals total current', (() => {
  const currents = ['resistor-0', 'resistor-1'].map((id) => (obj(specParallel, id)!.properties as Record<string, unknown>).current as number)
  return Math.abs(currents.reduce((a, b) => a + b, 0) - 4) < 1e-3
})())

// ── Asymmetric parallel: 3Ω and 6Ω at 6V → R_total=2, currents 2A and 1A ──────
const asymParallel: CircuitParams = {
  components: [
    { type: 'resistor', value: 3, unit: 'Ω' },
    { type: 'resistor', value: 6, unit: 'Ω' },
  ],
  connection: 'parallel',
  voltage: 6,
}
const specAsymParallel = buildCircuitScene(asymParallel)
check('asymmetric parallel — passes independent consistency check', checkCircuitConsistency(specAsymParallel, asymParallel).ok,
  checkCircuitConsistency(specAsymParallel, asymParallel).errors.join('; '))
check('asymmetric parallel — branch currents are 2A and 1A', (() => {
  const c0 = (obj(specAsymParallel, 'resistor-0')!.properties as Record<string, unknown>).current as number
  const c1 = (obj(specAsymParallel, 'resistor-1')!.properties as Record<string, unknown>).current as number
  return Math.abs(c0 - 2) < 1e-3 && Math.abs(c1 - 1) < 1e-3
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject empty components array', validateCircuitParams({ components: [], connection: 'series', voltage: 10 }) === null)
check('reject unknown connection', validateCircuitParams({ components: [{ type: 'resistor', value: 5, unit: 'Ω' }], connection: 'loop', voltage: 10 }) === null)
check('reject non-positive voltage', validateCircuitParams({ components: [{ type: 'resistor', value: 5, unit: 'Ω' }], connection: 'series', voltage: 0 }) === null)
check('reject components with no resistor at all', validateCircuitParams({ components: [{ type: 'battery', value: 10, unit: 'V' }], connection: 'series', voltage: 10 }) === null)
check('reject component with non-positive value', validateCircuitParams({ components: [{ type: 'resistor', value: -2, unit: 'Ω' }], connection: 'series', voltage: 10 }) === null)
check('accept a valid set', validateCircuitParams({ components: [{ type: 'resistor', value: 5, unit: 'Ω' }], connection: 'series', voltage: 10 })?.connection === 'series')

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for voltage does not coerce to 1 (Number(true)===1 coercion trap)',
  validateCircuitParams({ components: [{ type: 'resistor', value: 5, unit: 'Ω' }], connection: 'series', voltage: true }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
