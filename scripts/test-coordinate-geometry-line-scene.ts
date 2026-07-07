/**
 * Test harness for the deterministic coordinate-geometry-line scene
 * generator (src/lib/teaching/sceneGenerators/coordinateGeometryLine.ts).
 * Pure math — no Groq.
 *
 * Verifies by independent recomputation: the plotted P/Q/M positions match
 * the re-derived distance/midpoint/slope formulas, and M is genuinely the
 * midpoint of the plotted P and Q — across a general case, a vertical line
 * (undefined slope), a horizontal line (zero slope), and negative
 * coordinates. Also confirms the scene-router keyword routing.
 *
 * extractCoordinateGeometryParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-coordinate-geometry-line-scene.ts
 */

import {
  buildCoordinateGeometryLineScene,
  checkCoordinateGeometryConsistency,
  validateCoordinateGeometryParams,
  type CoordinateGeometryParams,
} from '../src/lib/teaching/sceneGenerators/coordinateGeometryLine'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== coordinate-geometry-line deterministic scene harness ===\n')

// ── General case: P(2,3), Q(8,7) ──────────────────────────────────────────────
const general: CoordinateGeometryParams = { x1: 2, y1: 3, x2: 8, y2: 7 }
const specGeneral = buildCoordinateGeometryLineScene(general)

check('general case — structurally valid SceneSpec', validateSceneSpec(specGeneral).valid, JSON.stringify(validateSceneSpec(specGeneral).errors))
check('general case — passes independent consistency check', checkCoordinateGeometryConsistency(specGeneral, general).ok,
  checkCoordinateGeometryConsistency(specGeneral, general).errors.join('; '))
check('general case — has 3 steps', specGeneral.steps.length === 3)

// ── Vertical line: undefined slope ────────────────────────────────────────────
const vertical: CoordinateGeometryParams = { x1: 4, y1: -2, x2: 4, y2: 6 }
const specVertical = buildCoordinateGeometryLineScene(vertical)
check('vertical line — structurally valid SceneSpec', validateSceneSpec(specVertical).valid, JSON.stringify(validateSceneSpec(specVertical).errors))
check('vertical line — passes independent consistency check', checkCoordinateGeometryConsistency(specVertical, vertical).ok,
  checkCoordinateGeometryConsistency(specVertical, vertical).errors.join('; '))
check('vertical line — formula label states slope is undefined', (() => {
  const obj = specVertical.steps.flatMap((s) => s.objects).find((o) => o.id === 'formula')
  return !!obj?.text && obj.text.includes('undefined')
})())

// ── Horizontal line: zero slope ────────────────────────────────────────────────
const horizontal: CoordinateGeometryParams = { x1: -3, y1: 5, x2: 9, y2: 5 }
const specHorizontal = buildCoordinateGeometryLineScene(horizontal)
check('horizontal line — passes independent consistency check', checkCoordinateGeometryConsistency(specHorizontal, horizontal).ok,
  checkCoordinateGeometryConsistency(specHorizontal, horizontal).errors.join('; '))

// ── Negative coordinates ───────────────────────────────────────────────────────
const negative: CoordinateGeometryParams = { x1: -6, y1: -8, x2: -1, y2: -2 }
const specNegative = buildCoordinateGeometryLineScene(negative)
check('negative coordinates — passes independent consistency check', checkCoordinateGeometryConsistency(specNegative, negative).ok,
  checkCoordinateGeometryConsistency(specNegative, negative).errors.join('; '))

// ── M is genuinely the midpoint of plotted P and Q ────────────────────────────
check('M is the midpoint of plotted P and Q', (() => {
  const objs = specGeneral.steps.flatMap((s) => s.objects)
  const P = objs.find((o) => o.id === 'P')?.position
  const Q = objs.find((o) => o.id === 'Q')?.position
  const M = objs.find((o) => o.id === 'M')?.position
  if (!P || !Q || !M) return false
  return Math.abs(M[0] - (P[0] + Q[0]) / 2) < 0.01 && Math.abs(M[1] - (P[1] + Q[1]) / 2) < 0.01
})())

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildCoordinateGeometryLineScene(general)
const mObj = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'M')
if (mObj?.position) mObj.position = [mObj.position[0] + 5, mObj.position[1], mObj.position[2]]
check('tampered midpoint fails the consistency check', !checkCoordinateGeometryConsistency(tampered, general).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject identical points', validateCoordinateGeometryParams({ x1: 1, y1: 1, x2: 1, y2: 1 }) === null)
check('reject coordinate exceeding bound', validateCoordinateGeometryParams({ x1: 0, y1: 0, x2: 1001, y2: 0 }) === null)
check('accept a valid scenario', validateCoordinateGeometryParams(general)?.x2 === 8)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for x1 does not coerce to 1 (Number(true)===1 coercion trap)',
  validateCoordinateGeometryParams({ x1: true, y1: 0, x2: 5, y2: 5 }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for coordinate_geometry_line ===\n')

check('"distance formula" prose → coordinate_geometry_line',
  routeSceneGenerator('Use the distance formula to find the distance between points A and B.') === 'coordinate_geometry_line')
check('"midpoint formula" prose → coordinate_geometry_line',
  routeSceneGenerator('Apply the midpoint formula to find the midpoint of the line segment.') === 'coordinate_geometry_line')
check('"slope of the line" prose → coordinate_geometry_line',
  routeSceneGenerator('Find the slope of the line joining (2,3) and (8,7).') === 'coordinate_geometry_line')
check('generic "vector addition" prose does NOT mis-route to coordinate_geometry_line',
  routeSceneGenerator('Add these two vectors using the parallelogram law.') === 'vector')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
