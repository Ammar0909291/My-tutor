/**
 * Test harness for the data-driven cell-division (mitosis/meiosis) scene
 * generator (src/lib/teaching/sceneGenerators/cellDivision.ts). Real curated
 * biology stage data — no Groq.
 *
 * Verifies by independent recomputation: every stage label and the final
 * daughter-cell summary match the curated reference data, for both mitosis
 * and meiosis. Also confirms the scene-router keyword routing.
 *
 * extractCellDivisionParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-cell-division-scene.ts
 */

import {
  buildCellDivisionScene,
  checkCellDivisionConsistency,
  validateCellDivisionParams,
  type CellDivisionParams,
} from '../src/lib/teaching/sceneGenerators/cellDivision'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== cell-division data-driven scene harness ===\n')

function labelText(spec: ReturnType<typeof buildCellDivisionScene>, id: string): string | undefined {
  return spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)?.text
}

// ── Mitosis: 4 stages, 2 diploid daughter cells ───────────────────────────────
const mitosis: CellDivisionParams = { divisionType: 'mitosis' }
const specMitosis = buildCellDivisionScene(mitosis)

check('mitosis — structurally valid SceneSpec', validateSceneSpec(specMitosis).valid, JSON.stringify(validateSceneSpec(specMitosis).errors))
check('mitosis — passes independent consistency check', checkCellDivisionConsistency(specMitosis, mitosis).ok,
  checkCellDivisionConsistency(specMitosis, mitosis).errors.join('; '))
check('mitosis — has 5 steps (4 stages + summary)', specMitosis.steps.length === 5)
check('mitosis — stage-0 is Prophase', labelText(specMitosis, 'stage-0') === 'Prophase')
check('mitosis — stage-1 is Metaphase', labelText(specMitosis, 'stage-1') === 'Metaphase')
check('mitosis — stage-2 is Anaphase', labelText(specMitosis, 'stage-2') === 'Anaphase')
check('mitosis — stage-3 is Telophase', labelText(specMitosis, 'stage-3') === 'Telophase')
check('mitosis — produces 2 diploid daughter cells',
  labelText(specMitosis, 'division-summary') === '2 daughter cells: diploid (2N), genetically identical to the parent cell')
check('mitosis — has exactly 2 daughter-cell nodes', specMitosis.steps.flatMap((s) => s.objects).filter((o) => o.id?.startsWith('daughter-cell-')).length === 2)

// ── Meiosis: 8 stages, 4 haploid daughter cells ──────────────────────────────
const meiosis: CellDivisionParams = { divisionType: 'meiosis' }
const specMeiosis = buildCellDivisionScene(meiosis)

check('meiosis — passes independent consistency check', checkCellDivisionConsistency(specMeiosis, meiosis).ok,
  checkCellDivisionConsistency(specMeiosis, meiosis).errors.join('; '))
check('meiosis — has 9 steps (8 stages + summary)', specMeiosis.steps.length === 9)
check('meiosis — stage-0 is Prophase I', labelText(specMeiosis, 'stage-0') === 'Prophase I')
check('meiosis — stage-4 is Prophase II', labelText(specMeiosis, 'stage-4') === 'Prophase II')
check('meiosis — stage-7 is Telophase II', labelText(specMeiosis, 'stage-7') === 'Telophase II')
check('meiosis — produces 4 haploid daughter cells',
  labelText(specMeiosis, 'division-summary') === '4 daughter cells: haploid (N), genetically distinct from the parent cell')
check('meiosis — has exactly 4 daughter-cell nodes', specMeiosis.steps.flatMap((s) => s.objects).filter((o) => o.id?.startsWith('daughter-cell-')).length === 4)

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildCellDivisionScene(mitosis)
const summary = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'division-summary')
if (summary) summary.text = '4 daughter cells: haploid (N), genetically distinct from the parent cell'
check('tampered summary fails the consistency check', !checkCellDivisionConsistency(tampered, mitosis).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject an unknown division type', validatePeriodicLikeReject())
function validatePeriodicLikeReject(): boolean {
  return validateCellDivisionParams({ divisionType: 'binary fission' }) === null
}
check('reject a missing divisionType', validateCellDivisionParams({}) === null)
check('reject a non-object', validateCellDivisionParams('mitosis') === null)
check('accept mitosis', validateCellDivisionParams(mitosis)?.divisionType === 'mitosis')
check('accept meiosis', validateCellDivisionParams(meiosis)?.divisionType === 'meiosis')

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for cell_division ===\n')

check('"mitosis" prose → cell_division',
  routeSceneGenerator('Explain the stages of mitosis in a plant cell.') === 'cell_division')
check('"meiosis" prose → cell_division',
  routeSceneGenerator('How does meiosis produce haploid gametes?') === 'cell_division')
check('"daughter cells" prose → cell_division',
  routeSceneGenerator('How many daughter cells are produced after telophase?') === 'cell_division')
check('unrelated genetics-cross prose does NOT route to cell_division',
  routeSceneGenerator('Set up a punnett square for a monohybrid cross.') !== 'cell_division')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
