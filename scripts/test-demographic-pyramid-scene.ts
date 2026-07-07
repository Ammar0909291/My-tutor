/**
 * Test harness for the deterministic demographic-pyramid scene generator
 * (src/lib/teaching/sceneGenerators/demographicPyramid.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: each age band's male bar extends
 * left of the axis and each female bar extends right, with lengths matching
 * the re-derived percentage-to-pixel scale — across a young-population case,
 * an aging-population case, and the band-count bounds. Also confirms the
 * scene-router keyword routing for this generator.
 *
 * extractPyramidParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-demographic-pyramid-scene.ts
 */

import {
  buildDemographicPyramidScene,
  checkPyramidConsistency,
  validatePyramidParams,
  type PyramidParams,
} from '../src/lib/teaching/sceneGenerators/demographicPyramid'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== demographic-pyramid deterministic scene harness ===\n')

// ── Young, growing population: wide base, narrow top ─────────────────────────
const young: PyramidParams = {
  regionName: 'Country A',
  bands: [
    { label: '0-14', malePct: 18, femalePct: 17 },
    { label: '15-29', malePct: 14, femalePct: 13 },
    { label: '30-44', malePct: 10, femalePct: 9 },
    { label: '45-59', malePct: 6, femalePct: 6 },
    { label: '60+', malePct: 3, femalePct: 4 },
  ],
}
const specYoung = buildDemographicPyramidScene(young)

check('young population — structurally valid SceneSpec', validateSceneSpec(specYoung).valid, JSON.stringify(validateSceneSpec(specYoung).errors))
check('young population — passes independent consistency check', checkPyramidConsistency(specYoung, young).ok,
  checkPyramidConsistency(specYoung, young).errors.join('; '))
check('young population — has 2 steps (male bars, then female bars)', specYoung.steps.length === 2)

// ── Aging population: narrow base, wide top ───────────────────────────────────
const aging: PyramidParams = {
  regionName: 'Country B',
  bands: [
    { label: '0-14', malePct: 6, femalePct: 6 },
    { label: '15-29', malePct: 8, femalePct: 8 },
    { label: '30-44', malePct: 10, femalePct: 10 },
    { label: '45-59', malePct: 12, femalePct: 13 },
    { label: '60+', malePct: 14, femalePct: 16 },
  ],
}
const specAging = buildDemographicPyramidScene(aging)
check('aging population — structurally valid SceneSpec', validateSceneSpec(specAging).valid, JSON.stringify(validateSceneSpec(specAging).errors))
check('aging population — passes independent consistency check', checkPyramidConsistency(specAging, aging).ok,
  checkPyramidConsistency(specAging, aging).errors.join('; '))

// ── Minimum band count (2) ────────────────────────────────────────────────────
const minimal: PyramidParams = { regionName: 'Country C', bands: [{ label: '0-39', malePct: 20, femalePct: 20 }, { label: '40+', malePct: 10, femalePct: 12 }] }
const specMinimal = buildDemographicPyramidScene(minimal)
check('minimum 2 bands — passes independent consistency check', checkPyramidConsistency(specMinimal, minimal).ok,
  checkPyramidConsistency(specMinimal, minimal).errors.join('; '))

// ── Bar directionality ────────────────────────────────────────────────────────
check('all male bars extend left (negative x), all female bars extend right (positive x)', (() => {
  const objs = specYoung.steps.flatMap((s) => s.objects)
  const maleBars = objs.filter((o) => o.id?.startsWith('male-'))
  const femaleBars = objs.filter((o) => o.id?.startsWith('female-'))
  return maleBars.every((b) => (b.to?.[0] ?? 0) <= 0) && femaleBars.every((b) => (b.to?.[0] ?? 0) >= 0)
})())

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildDemographicPyramidScene(young)
const maleBar0 = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'male-0')
if (maleBar0?.to) maleBar0.to = [maleBar0.to[0] - 5, maleBar0.to[1], maleBar0.to[2]]
check('tampered male bar length fails the consistency check', !checkPyramidConsistency(tampered, young).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject fewer than 2 bands', validatePyramidParams({ regionName: 'X', bands: [{ label: '0-14', malePct: 10, femalePct: 10 }] }) === null)
check('reject more than 8 bands', validatePyramidParams({
  regionName: 'X',
  bands: Array.from({ length: 9 }, (_, i) => ({ label: `band-${i}`, malePct: 5, femalePct: 5 })),
}) === null)
check('reject malePct > 100', validatePyramidParams({ regionName: 'X', bands: [{ label: 'a', malePct: 101, femalePct: 10 }, { label: 'b', malePct: 5, femalePct: 5 }] }) === null)
check('reject negative femalePct', validatePyramidParams({ regionName: 'X', bands: [{ label: 'a', malePct: 10, femalePct: -1 }, { label: 'b', malePct: 5, femalePct: 5 }] }) === null)
check('reject empty regionName', validatePyramidParams({ regionName: '', bands: [{ label: 'a', malePct: 10, femalePct: 10 }, { label: 'b', malePct: 5, femalePct: 5 }] }) === null)
check('accept a valid scenario', validatePyramidParams(young)?.regionName === 'Country A')

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for malePct does not coerce to 1 (Number(true)===1 coercion trap)',
  validatePyramidParams({ regionName: 'X', bands: [{ label: 'a', malePct: true, femalePct: 10 }, { label: 'b', malePct: 5, femalePct: 5 }] }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for demographic_pyramid ===\n')

check('"population pyramid" prose → demographic_pyramid',
  routeSceneGenerator('Draw the population pyramid for India showing age and sex distribution.') === 'demographic_pyramid')
check('"age-sex pyramid" prose → demographic_pyramid',
  routeSceneGenerator('The age-sex pyramid shows how the population is distributed.') === 'demographic_pyramid')
check('"age distribution of population" prose → demographic_pyramid',
  routeSceneGenerator('Show the age distribution of population for this region.') === 'demographic_pyramid')
check('bare "population" without a pyramid cue does NOT route to demographic_pyramid',
  routeSceneGenerator('The population of the city grew rapidly after 1990.') !== 'demographic_pyramid')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
