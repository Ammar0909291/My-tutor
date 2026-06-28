/**
 * Test harness for the deterministic ecological (energy) pyramid scene
 * generator (src/lib/teaching/sceneGenerators/ecologicalPyramid.ts). Pure
 * math — no Groq.
 *
 * Verifies by independent recomputation: every trophic level's energy value
 * matches the re-derived 10%-law value (level i = baseEnergy * 0.1^i) —
 * across a 3-level chain, a 5-level (max) chain, and a 2-level (min) chain.
 * Also confirms the scene-router keyword routing.
 *
 * extractEcologicalPyramidParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-ecological-pyramid-scene.ts
 */

import {
  buildEcologicalPyramidScene,
  checkEcologicalPyramidConsistency,
  validateEcologicalPyramidParams,
  type EcologicalPyramidParams,
} from '../src/lib/teaching/sceneGenerators/ecologicalPyramid'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== ecological-pyramid deterministic scene harness ===\n')

// ── Classic 3-level chain: Producers -> Herbivores -> Carnivores ─────────────
const threeLevel: EcologicalPyramidParams = { trophicLevels: ['Producers', 'Herbivores', 'Carnivores'], baseEnergy: 10000 }
const specThreeLevel = buildEcologicalPyramidScene(threeLevel)

check('3-level — structurally valid SceneSpec', validateSceneSpec(specThreeLevel).valid, JSON.stringify(validateSceneSpec(specThreeLevel).errors))
check('3-level — passes independent consistency check', checkEcologicalPyramidConsistency(specThreeLevel, threeLevel).ok,
  checkEcologicalPyramidConsistency(specThreeLevel, threeLevel).errors.join('; '))
check('3-level — has 4 steps (3 levels + law summary)', specThreeLevel.steps.length === 4)
check('3-level — producer level retains the full base energy', (() => {
  const obj = specThreeLevel.steps.flatMap((s) => s.objects).find((o) => o.id === 'level-0')
  return obj?.text === 'Producers: 10000'
})())
check('3-level — herbivore level is 10% of producer energy', (() => {
  const obj = specThreeLevel.steps.flatMap((s) => s.objects).find((o) => o.id === 'level-1')
  return obj?.text === 'Herbivores: 1000'
})())
check('3-level — carnivore level is 1% of producer energy', (() => {
  const obj = specThreeLevel.steps.flatMap((s) => s.objects).find((o) => o.id === 'level-2')
  return obj?.text === 'Carnivores: 100'
})())

// ── Max-size 5-level chain ────────────────────────────────────────────────────
const fiveLevel: EcologicalPyramidParams = {
  trophicLevels: ['Producers', 'Primary Consumers', 'Secondary Consumers', 'Tertiary Consumers', 'Apex Predators'],
  baseEnergy: 100000,
}
const specFiveLevel = buildEcologicalPyramidScene(fiveLevel)
check('5-level — passes independent consistency check', checkEcologicalPyramidConsistency(specFiveLevel, fiveLevel).ok,
  checkEcologicalPyramidConsistency(specFiveLevel, fiveLevel).errors.join('; '))
check('5-level — apex level is 0.01% of producer energy', (() => {
  const obj = specFiveLevel.steps.flatMap((s) => s.objects).find((o) => o.id === 'level-4')
  return obj?.text === 'Apex Predators: 10'
})())

// ── Min-size 2-level chain ─────────────────────────────────────────────────────
const twoLevel: EcologicalPyramidParams = { trophicLevels: ['Producers', 'Consumers'], baseEnergy: 500 }
const specTwoLevel = buildEcologicalPyramidScene(twoLevel)
check('2-level — passes independent consistency check', checkEcologicalPyramidConsistency(specTwoLevel, twoLevel).ok,
  checkEcologicalPyramidConsistency(specTwoLevel, twoLevel).errors.join('; '))
check('2-level — has 3 steps (2 levels + law summary)', specTwoLevel.steps.length === 3)

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildEcologicalPyramidScene(threeLevel)
const level1 = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'level-1')
if (level1) level1.text = 'Herbivores: 9999'
check('tampered level energy fails the consistency check', !checkEcologicalPyramidConsistency(tampered, threeLevel).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject fewer than 2 trophic levels', validateEcologicalPyramidParams({ trophicLevels: ['Producers'], baseEnergy: 100 }) === null)
check('reject more than 5 trophic levels', validateEcologicalPyramidParams({
  trophicLevels: ['A', 'B', 'C', 'D', 'E', 'F'], baseEnergy: 100,
}) === null)
check('reject non-array trophicLevels', validateEcologicalPyramidParams({ trophicLevels: 'Producers', baseEnergy: 100 }) === null)
check('reject zero baseEnergy', validateEcologicalPyramidParams({ trophicLevels: ['Producers', 'Consumers'], baseEnergy: 0 }) === null)
check('reject negative baseEnergy', validateEcologicalPyramidParams({ trophicLevels: ['Producers', 'Consumers'], baseEnergy: -50 }) === null)
check('reject non-numeric baseEnergy', validateEcologicalPyramidParams({ trophicLevels: ['Producers', 'Consumers'], baseEnergy: 'lots' }) === null)
check('accept a valid scenario', validateEcologicalPyramidParams(threeLevel)?.trophicLevels.length === 3)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for ecological_pyramid ===\n')

check('"energy pyramid" prose → ecological_pyramid',
  routeSceneGenerator('Draw the energy pyramid for this ecosystem with producers, herbivores, and carnivores.') === 'ecological_pyramid')
check('"trophic level" prose → ecological_pyramid',
  routeSceneGenerator('Explain how energy decreases at each trophic level in a food chain.') === 'ecological_pyramid')
check('"10% law" prose → ecological_pyramid',
  routeSceneGenerator('What does the 10% law tell us about energy transfer between trophic levels?') === 'ecological_pyramid')
check('unrelated biology prose does NOT route to ecological_pyramid',
  routeSceneGenerator('Describe the process of cell division in mitosis.') !== 'ecological_pyramid')
check('a genetic-cross turn does NOT route to ecological_pyramid',
  routeSceneGenerator('Draw a Punnett square for a cross between Aa and Aa.') !== 'ecological_pyramid')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
