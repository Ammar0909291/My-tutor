/**
 * Test harness for the deterministic crystal-lattice scene generator
 * (src/lib/teaching/sceneGenerators/crystalLattice.ts). Data-driven, Groq-free.
 *
 * Verifies by INDEPENDENT recomputation: the effective atoms-per-unit-cell derived
 * from the drawn positions via the corner/face/body sharing rule (1/8, 1/2, 1)
 * equals the textbook constant (SC=1, BCC=2, FCC=4), plus structural correctness
 * of the unit cell.
 *
 * extractLattice()/generateLatticeScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-crystal-lattice-scene.ts
 */

import {
  buildLatticeScene,
  checkLatticeConsistency,
  lookupLattice,
} from '../src/lib/teaching/sceneGenerators/crystalLattice'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const sharingAtomsPerCell = (spec: ReturnType<typeof buildLatticeScene>): number => {
  const objs = spec.steps.flatMap((s) => s.objects)
  const corners = objs.filter((o) => /^corner\d+$/.test(o.id ?? '')).length
  const extras = objs.filter((o) => /^extra\d+$/.test(o.id ?? ''))
  const faces = extras.filter((e) => (e.properties as Record<string, unknown>)?.role === 'face').length
  const bodies = extras.filter((e) => (e.properties as Record<string, unknown>)?.role === 'body').length
  return corners / 8 + faces / 2 + bodies
}

console.log('\n=== crystal lattice deterministic scene harness ===\n')

const expectations: { alias: string; kind: string; perCell: number }[] = [
  { alias: 'simple cubic', kind: 'simple_cubic', perCell: 1 },
  { alias: 'body-centered cubic', kind: 'bcc', perCell: 2 },
  { alias: 'face-centered cubic', kind: 'fcc', perCell: 4 },
]

for (const e of expectations) {
  const def = lookupLattice(e.alias)!
  check(`lookup "${e.alias}" → ${e.kind}`, def?.kind === e.kind)
  const spec = buildLatticeScene(def)
  check(`${e.kind} — structurally valid SceneSpec`, validateSceneSpec(spec).valid,
    JSON.stringify(validateSceneSpec(spec).errors))
  check(`${e.kind} — passes independent consistency check`, checkLatticeConsistency(spec, def).ok,
    checkLatticeConsistency(spec, def).errors.join('; '))
  check(`${e.kind} — sharing rule gives ${e.perCell} atom(s)/cell (independent of the table)`,
    Math.abs(sharingAtomsPerCell(spec) - e.perCell) < 1e-9,
    `got ${sharingAtomsPerCell(spec)}`)
}

// ── Alias variants ───────────────────────────────────────────────────────────
check('"BCC" abbreviation → bcc', lookupLattice('the metal has a BCC structure')?.kind === 'bcc')
check('"FCC" abbreviation → fcc', lookupLattice('copper is FCC')?.kind === 'fcc')
check('"cubic close packed" → fcc', lookupLattice('cubic close packed metals')?.kind === 'fcc')

// ── Out of scope → null (non-cubic / unknown) ────────────────────────────────
check('hexagonal lattice not supported → null', lookupLattice('hexagonal close packed') === null)
check('unrelated text → null', lookupLattice('the water cycle') === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
