/**
 * Test harness for the deterministic supply/demand curve scene generator
 * (src/lib/teaching/sceneGenerators/economicsCurves.ts). Pure geometry — no Groq.
 *
 * Verifies by independent recomputation: the stored equilibrium is the actual
 * intersection of the supply and demand lines, and a curve shift produces the
 * correct new equilibrium.
 *
 * extractEconomicsParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-economics-curves.ts
 */

import {
  buildEconomicsCurveScene,
  checkEconomicsConsistency,
  validateEconomicsParams,
  type EconomicsParams,
} from '../src/lib/teaching/sceneGenerators/economicsCurves'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildEconomicsCurveScene>, id: string): SceneObject | undefined =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)

console.log('\n=== economics supply/demand curve deterministic scene harness ===\n')

// ── No shift: equilibrium at (Q=20, P=10) ─────────────────────────────────────
const noShift: EconomicsParams = { curveType: 'both', shiftDirection: 'none', equilibriumPrice: 10, equilibriumQuantity: 20 }
const specNoShift = buildEconomicsCurveScene(noShift)

check('no-shift — structurally valid SceneSpec', validateSceneSpec(specNoShift).valid, JSON.stringify(validateSceneSpec(specNoShift).errors))
check('no-shift — passes independent consistency check', checkEconomicsConsistency(specNoShift, noShift).ok,
  checkEconomicsConsistency(specNoShift, noShift).errors.join('; '))
check('no-shift — equilibrium matches the stated price/quantity', (() => {
  const props = obj(specNoShift, 'equilibrium')!.properties as Record<string, unknown>
  return Math.abs((props.price as number) - 10) < 0.01 && Math.abs((props.quantity as number) - 20) < 0.01
})())
check('no-shift — only 1 step (no shift step added)', specNoShift.steps.length === 1)
check('no-shift — equilibrium genuinely lies on both lines', (() => {
  const supply = obj(specNoShift, 'supply-line')!.properties as Record<string, unknown>
  const demand = obj(specNoShift, 'demand-line')!.properties as Record<string, unknown>
  const Q = 20
  const onSupply = (supply.intercept as number) + 1 * Q
  const onDemand = (demand.intercept as number) - 1 * Q
  return Math.abs(onSupply - 10) < 0.01 && Math.abs(onDemand - 10) < 0.01
})())

// ── Supply shifts right (more supplied at every price) → equilibrium Q up, P down ─
const supplyRight: EconomicsParams = { curveType: 'supply', shiftDirection: 'right', equilibriumPrice: 10, equilibriumQuantity: 20 }
const specSupplyRight = buildEconomicsCurveScene(supplyRight)

check('supply-right — structurally valid SceneSpec', validateSceneSpec(specSupplyRight).valid, JSON.stringify(validateSceneSpec(specSupplyRight).errors))
check('supply-right — passes independent consistency check', checkEconomicsConsistency(specSupplyRight, supplyRight).ok,
  checkEconomicsConsistency(specSupplyRight, supplyRight).errors.join('; '))
check('supply-right — has 2 steps (shift step added)', specSupplyRight.steps.length === 2)
check('supply-right — new equilibrium quantity is higher than original', (() => {
  const e0 = obj(specSupplyRight, 'equilibrium')!.properties as Record<string, unknown>
  const e1 = obj(specSupplyRight, 'equilibrium-shifted')!.properties as Record<string, unknown>
  return (e1.quantity as number) > (e0.quantity as number)
})())
check('supply-right — new equilibrium price is lower than original', (() => {
  const e0 = obj(specSupplyRight, 'equilibrium')!.properties as Record<string, unknown>
  const e1 = obj(specSupplyRight, 'equilibrium-shifted')!.properties as Record<string, unknown>
  return (e1.price as number) < (e0.price as number)
})())
check('supply-right — demand-line-shifted is NOT created (only supply curveType)', obj(specSupplyRight, 'demand-line-shifted') === undefined)

// ── Demand shifts left (less demanded at every price) → equilibrium Q down, P down ─
const demandLeft: EconomicsParams = { curveType: 'demand', shiftDirection: 'left', equilibriumPrice: 10, equilibriumQuantity: 20 }
const specDemandLeft = buildEconomicsCurveScene(demandLeft)

check('demand-left — structurally valid SceneSpec', validateSceneSpec(specDemandLeft).valid, JSON.stringify(validateSceneSpec(specDemandLeft).errors))
check('demand-left — passes independent consistency check', checkEconomicsConsistency(specDemandLeft, demandLeft).ok,
  checkEconomicsConsistency(specDemandLeft, demandLeft).errors.join('; '))
check('demand-left — new equilibrium quantity is lower than original', (() => {
  const e0 = obj(specDemandLeft, 'equilibrium')!.properties as Record<string, unknown>
  const e1 = obj(specDemandLeft, 'equilibrium-shifted')!.properties as Record<string, unknown>
  return (e1.quantity as number) < (e0.quantity as number)
})())
check('demand-left — new equilibrium price is lower than original', (() => {
  const e0 = obj(specDemandLeft, 'equilibrium')!.properties as Record<string, unknown>
  const e1 = obj(specDemandLeft, 'equilibrium-shifted')!.properties as Record<string, unknown>
  return (e1.price as number) < (e0.price as number)
})())
check('demand-left — supply-line-shifted is NOT created (only demand curveType)', obj(specDemandLeft, 'supply-line-shifted') === undefined)

// ── Both curves shift right (supply and demand both increase) ────────────────
const bothRight: EconomicsParams = { curveType: 'both', shiftDirection: 'right', equilibriumPrice: 10, equilibriumQuantity: 20 }
const specBothRight = buildEconomicsCurveScene(bothRight)
check('both-right — structurally valid SceneSpec', validateSceneSpec(specBothRight).valid)
check('both-right — passes independent consistency check', checkEconomicsConsistency(specBothRight, bothRight).ok,
  checkEconomicsConsistency(specBothRight, bothRight).errors.join('; '))
check('both-right — both shifted lines are created', obj(specBothRight, 'supply-line-shifted') !== undefined && obj(specBothRight, 'demand-line-shifted') !== undefined)

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject unknown curveType', validateEconomicsParams({ curveType: 'foo', shiftDirection: 'none', equilibriumPrice: 10, equilibriumQuantity: 20 }) === null)
check('reject unknown shiftDirection', validateEconomicsParams({ curveType: 'supply', shiftDirection: 'up', equilibriumPrice: 10, equilibriumQuantity: 20 }) === null)
check('reject non-positive equilibriumPrice', validateEconomicsParams({ curveType: 'supply', shiftDirection: 'none', equilibriumPrice: 0, equilibriumQuantity: 20 }) === null)
check('reject non-positive equilibriumQuantity', validateEconomicsParams({ curveType: 'supply', shiftDirection: 'none', equilibriumPrice: 10, equilibriumQuantity: -5 }) === null)
check('accept a valid set', validateEconomicsParams({ curveType: 'both', shiftDirection: 'none', equilibriumPrice: 10, equilibriumQuantity: 20 })?.equilibriumPrice === 10)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for equilibriumPrice does not coerce to 1 (Number(true)===1 coercion trap)',
  validateEconomicsParams({ curveType: 'supply', shiftDirection: 'none', equilibriumPrice: true, equilibriumQuantity: 20 }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
