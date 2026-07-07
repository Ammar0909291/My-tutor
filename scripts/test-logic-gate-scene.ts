/**
 * Test harness for the deterministic logic-gate scene generator
 * (src/lib/teaching/sceneGenerators/logicGate.ts). Pure boolean logic — no Groq.
 *
 * Verifies by independent recomputation: every gate's output matches its
 * truth-table definition — across all 7 gate types (AND, OR, NOT, NAND, NOR,
 * XOR, XNOR) and all relevant input combinations. Also confirms the
 * scene-router keyword routing.
 *
 * extractLogicGateParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-logic-gate-scene.ts
 */

import {
  buildLogicGateScene,
  checkLogicGateConsistency,
  validateLogicGateParams,
  type LogicGateParams,
} from '../src/lib/teaching/sceneGenerators/logicGate'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== logic-gate deterministic scene harness ===\n')

function outputOf(spec: ReturnType<typeof buildLogicGateScene>): string | undefined {
  return spec.steps.flatMap((s) => s.objects).find((o) => o.id === 'output')?.text
}

// ── Truth tables for every binary gate, both input combinations ──────────────
const binaryTruthTables: Record<string, [boolean, boolean, boolean][]> = {
  AND: [[false, false, false], [false, true, false], [true, false, false], [true, true, true]],
  OR: [[false, false, false], [false, true, true], [true, false, true], [true, true, true]],
  NAND: [[false, false, true], [false, true, true], [true, false, true], [true, true, false]],
  NOR: [[false, false, true], [false, true, false], [true, false, false], [true, true, false]],
  XOR: [[false, false, false], [false, true, true], [true, false, true], [true, true, false]],
  XNOR: [[false, false, true], [false, true, false], [true, false, false], [true, true, true]],
}

for (const [gateType, rows] of Object.entries(binaryTruthTables)) {
  for (const [a, b, expected] of rows) {
    const params: LogicGateParams = { gateType: gateType as LogicGateParams['gateType'], inputs: [a, b] }
    const spec = buildLogicGateScene(params)
    check(`${gateType}(${a ? 1 : 0}, ${b ? 1 : 0}) = ${expected ? 1 : 0}`, outputOf(spec) === (expected ? '1' : '0'))
    check(`${gateType}(${a ? 1 : 0}, ${b ? 1 : 0}) — passes independent consistency check`,
      checkLogicGateConsistency(spec, params).ok, checkLogicGateConsistency(spec, params).errors.join('; '))
  }
}

// ── NOT gate (unary) ───────────────────────────────────────────────────────────
const notTrue: LogicGateParams = { gateType: 'NOT', inputs: [true] }
const specNotTrue = buildLogicGateScene(notTrue)
check('NOT(1) = 0', outputOf(specNotTrue) === '0')
check('NOT(1) — passes independent consistency check', checkLogicGateConsistency(specNotTrue, notTrue).ok)

const notFalse: LogicGateParams = { gateType: 'NOT', inputs: [false] }
const specNotFalse = buildLogicGateScene(notFalse)
check('NOT(0) = 1', outputOf(specNotFalse) === '1')

// ── Structural validity + step count ──────────────────────────────────────────
check('AND scene is a structurally valid SceneSpec',
  validateSceneSpec(buildLogicGateScene({ gateType: 'AND', inputs: [true, true] })).valid)
check('NOT scene has 2 steps (input + output)', specNotTrue.steps.length === 2)
check('AND scene has 2 steps (inputs + output)', buildLogicGateScene({ gateType: 'AND', inputs: [true, false] }).steps.length === 2)

// ── Tampered scene fails the consistency check ────────────────────────────────
const tamperedParams: LogicGateParams = { gateType: 'AND', inputs: [true, true] }
const tampered = buildLogicGateScene(tamperedParams)
const out = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'output')
if (out) out.text = '0'
check('tampered output fails the consistency check', !checkLogicGateConsistency(tampered, tamperedParams).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject unknown gate type', validateLogicGateParams({ gateType: 'BUFFER', inputs: [true, true] }) === null)
check('reject NOT with 2 inputs (wrong arity)', validateLogicGateParams({ gateType: 'NOT', inputs: [true, false] }) === null)
check('reject AND with 1 input (wrong arity)', validateLogicGateParams({ gateType: 'AND', inputs: [true] }) === null)
check('reject non-boolean input values', validateLogicGateParams({ gateType: 'AND', inputs: [1, 0] }) === null)
check('reject non-array inputs', validateLogicGateParams({ gateType: 'AND', inputs: 'true,false' }) === null)
check('gate type is case-insensitive', validateLogicGateParams({ gateType: 'and', inputs: [true, false] })?.gateType === 'AND')
check('accept a valid scenario', validateLogicGateParams({ gateType: 'XOR', inputs: [true, false] })?.gateType === 'XOR')

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for logic_gate ===\n')

check('"logic gate" prose → logic_gate',
  routeSceneGenerator('Explain how a logic gate processes its input signals.') === 'logic_gate')
check('"truth table" prose → logic_gate',
  routeSceneGenerator('Build a truth table for this boolean expression.') === 'logic_gate')
check('"AND gate" prose → logic_gate',
  routeSceneGenerator('What is the output of an AND gate with inputs 1 and 0?') === 'logic_gate')
check('unrelated circuit prose does NOT route to logic_gate',
  routeSceneGenerator('Find the equivalent resistance of these resistors in series.') !== 'logic_gate')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
