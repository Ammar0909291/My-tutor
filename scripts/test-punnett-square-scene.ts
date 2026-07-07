/**
 * Test harness for the deterministic Punnett-square scene generator
 * (src/lib/teaching/sceneGenerators/punnettSquare.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: every offspring genotype cell and
 * the final phenotype ratio match the re-derived allele combinatorics —
 * across a heterozygous x heterozygous cross (classic 3:1), a homozygous x
 * heterozygous cross (1:1), and a homozygous-dominant x homozygous-recessive
 * cross (4:0). Also confirms the scene-router keyword routing.
 *
 * extractPunnettParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-punnett-square-scene.ts
 */

import {
  buildPunnettSquareScene,
  checkPunnettConsistency,
  validatePunnettParams,
  type PunnettParams,
} from '../src/lib/teaching/sceneGenerators/punnettSquare'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== punnett-square deterministic scene harness ===\n')

// ── Classic Aa x Aa cross: 3 dominant : 1 recessive ───────────────────────────
const hetXhet: PunnettParams = { parent1Genotype: 'Aa', parent2Genotype: 'Aa' }
const specHetXhet = buildPunnettSquareScene(hetXhet)

check('Aa x Aa — structurally valid SceneSpec', validateSceneSpec(specHetXhet).valid, JSON.stringify(validateSceneSpec(specHetXhet).errors))
check('Aa x Aa — passes independent consistency check', checkPunnettConsistency(specHetXhet, hetXhet).ok,
  checkPunnettConsistency(specHetXhet, hetXhet).errors.join('; '))
check('Aa x Aa — has 3 steps', specHetXhet.steps.length === 3)
check('Aa x Aa — ratio label states 3 dominant : 1 recessive', (() => {
  const obj = specHetXhet.steps.flatMap((s) => s.objects).find((o) => o.id === 'ratio')
  return obj?.text === '3 dominant : 1 recessive'
})())

// ── Aa x aa cross: 1:1 ratio ───────────────────────────────────────────────────
const hetXrec: PunnettParams = { parent1Genotype: 'Aa', parent2Genotype: 'aa' }
const specHetXrec = buildPunnettSquareScene(hetXrec)
check('Aa x aa — structurally valid SceneSpec', validateSceneSpec(specHetXrec).valid, JSON.stringify(validateSceneSpec(specHetXrec).errors))
check('Aa x aa — passes independent consistency check', checkPunnettConsistency(specHetXrec, hetXrec).ok,
  checkPunnettConsistency(specHetXrec, hetXrec).errors.join('; '))
check('Aa x aa — ratio label states 2 dominant : 2 recessive', (() => {
  const obj = specHetXrec.steps.flatMap((s) => s.objects).find((o) => o.id === 'ratio')
  return obj?.text === '2 dominant : 2 recessive'
})())

// ── AA x aa cross: all dominant phenotype (4:0) ───────────────────────────────
const domXrec: PunnettParams = { parent1Genotype: 'AA', parent2Genotype: 'aa' }
const specDomXrec = buildPunnettSquareScene(domXrec)
check('AA x aa — passes independent consistency check', checkPunnettConsistency(specDomXrec, domXrec).ok,
  checkPunnettConsistency(specDomXrec, domXrec).errors.join('; '))
check('AA x aa — ratio label states 4 dominant : 0 recessive', (() => {
  const obj = specDomXrec.steps.flatMap((s) => s.objects).find((o) => o.id === 'ratio')
  return obj?.text === '4 dominant : 0 recessive'
})())
check('AA x aa — all 4 cells are genotype Aa', (() => {
  const objs = specDomXrec.steps.flatMap((s) => s.objects)
  return ['cell-0-0', 'cell-0-1', 'cell-1-0', 'cell-1-1'].every((id) => objs.find((o) => o.id === id)?.text === 'Aa')
})())

// ── Different gene letter (Bb x Bb) ───────────────────────────────────────────
const bGene: PunnettParams = { parent1Genotype: 'Bb', parent2Genotype: 'Bb' }
const specBGene = buildPunnettSquareScene(bGene)
check('Bb x Bb — passes independent consistency check', checkPunnettConsistency(specBGene, bGene).ok,
  checkPunnettConsistency(specBGene, bGene).errors.join('; '))

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildPunnettSquareScene(hetXhet)
const cell00 = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'cell-0-0')
if (cell00) cell00.text = 'aa'
check('tampered cell genotype fails the consistency check', !checkPunnettConsistency(tampered, hetXhet).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject genotype with mismatched letters (Ab)', validatePunnettParams({ parent1Genotype: 'Ab', parent2Genotype: 'Aa' }) === null)
check('reject genotype of wrong length', validatePunnettParams({ parent1Genotype: 'A', parent2Genotype: 'Aa' }) === null)
check('reject parents using different genes (Aa x Bb)', validatePunnettParams({ parent1Genotype: 'Aa', parent2Genotype: 'Bb' }) === null)
check('reject non-string genotype', validatePunnettParams({ parent1Genotype: 12, parent2Genotype: 'Aa' }) === null)
check('accept a valid scenario', validatePunnettParams(hetXhet)?.parent1Genotype === 'Aa')

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for punnett_square ===\n')

check('"punnett square" prose → punnett_square',
  routeSceneGenerator('Draw a Punnett square for a cross between Aa and Aa.') === 'punnett_square')
check('"monohybrid cross" prose → punnett_square',
  routeSceneGenerator('Show the monohybrid cross for tall and short pea plants.') === 'punnett_square')
check('"phenotype ratio" prose → punnett_square',
  routeSceneGenerator('What is the phenotype ratio of the offspring in this genetic cross?') === 'punnett_square')
check('unrelated biology prose does NOT route to punnett_square',
  routeSceneGenerator('Describe the process of cell division in mitosis.') !== 'punnett_square')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
