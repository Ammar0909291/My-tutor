/**
 * Test harness for the data-driven periodic-trends scene generator
 * (src/lib/teaching/sceneGenerators/periodicTrends.ts). Real curated Pauling
 * electronegativity / atomic-radius data — no Groq.
 *
 * Verifies by independent recomputation: the "larger atomic radius" and
 * "higher electronegativity" comparisons match the curated reference data —
 * across a same-period pair, a same-group pair, and an unrelated pair. Also
 * confirms the scene-router keyword routing.
 *
 * extractPeriodicTrendParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-periodic-trends-scene.ts
 */

import {
  buildPeriodicTrendScene,
  checkPeriodicTrendConsistency,
  validatePeriodicTrendParams,
  type PeriodicTrendParams,
} from '../src/lib/teaching/sceneGenerators/periodicTrends'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== periodic-trends data-driven scene harness ===\n')

function labelText(spec: ReturnType<typeof buildPeriodicTrendScene>, id: string): string | undefined {
  return spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)?.text
}

// ── Same-period pair: C vs O (period 2) — across a period, EN rises, radius shrinks ──
const cVsO: PeriodicTrendParams = { element1Symbol: 'C', element2Symbol: 'O' }
const specCvO = buildPeriodicTrendScene(cVsO)

check('C vs O — structurally valid SceneSpec', validateSceneSpec(specCvO).valid, JSON.stringify(validateSceneSpec(specCvO).errors))
check('C vs O — passes independent consistency check', checkPeriodicTrendConsistency(specCvO, cVsO).ok,
  checkPeriodicTrendConsistency(specCvO, cVsO).errors.join('; '))
check('C vs O — C has the larger atomic radius (further left in the period)', labelText(specCvO, 'larger-radius') === 'Larger atomic radius: C')
check('C vs O — O has the higher electronegativity (further right in the period)', labelText(specCvO, 'higher-electronegativity') === 'Higher electronegativity: O')

// ── Same-group pair: Na vs K (group 1) — down a group, EN falls, radius grows ────
const naVsK: PeriodicTrendParams = { element1Symbol: 'Na', element2Symbol: 'K' }
const specNaVsK = buildPeriodicTrendScene(naVsK)
check('Na vs K — passes independent consistency check', checkPeriodicTrendConsistency(specNaVsK, naVsK).ok,
  checkPeriodicTrendConsistency(specNaVsK, naVsK).errors.join('; '))
check('Na vs K — K has the larger atomic radius (lower in the group)', labelText(specNaVsK, 'larger-radius') === 'Larger atomic radius: K')
check('Na vs K — Na has the higher electronegativity (higher in the group)', labelText(specNaVsK, 'higher-electronegativity') === 'Higher electronegativity: Na')

// ── Unrelated pair: F (period 2, group 17) vs Ca (period 4, group 2) ─────────────
const fVsCa: PeriodicTrendParams = { element1Symbol: 'F', element2Symbol: 'Ca' }
const specFvCa = buildPeriodicTrendScene(fVsCa)
check('F vs Ca — passes independent consistency check', checkPeriodicTrendConsistency(specFvCa, fVsCa).ok)
check('F vs Ca — Ca has the larger atomic radius', labelText(specFvCa, 'larger-radius') === 'Larger atomic radius: Ca')
check('F vs Ca — F has the higher electronegativity', labelText(specFvCa, 'higher-electronegativity') === 'Higher electronegativity: F')
check('F vs Ca — has 2 steps (element data + comparison)', specFvCa.steps.length === 2)

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildPeriodicTrendScene(cVsO)
const radiusLabel = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'larger-radius')
if (radiusLabel) radiusLabel.text = 'Larger atomic radius: O'
check('tampered radius comparison fails the consistency check', !checkPeriodicTrendConsistency(tampered, cVsO).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject an unknown element symbol', validatePeriodicTrendParams({ element1Symbol: 'C', element2Symbol: 'Uup' }) === null)
check('reject comparing an element to itself', validatePeriodicTrendParams({ element1Symbol: 'C', element2Symbol: 'C' }) === null)
check('reject a noble gas (no defined electronegativity, excluded from the dataset)', validatePeriodicTrendParams({ element1Symbol: 'Ne', element2Symbol: 'C' }) === null)
check('reject non-string symbols', validatePeriodicTrendParams({ element1Symbol: 6, element2Symbol: 'O' }) === null)
check('accept a valid pair', validatePeriodicTrendParams(cVsO)?.element1Symbol === 'C')

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for periodic_trends ===\n')

check('"electronegativity" prose → periodic_trends',
  routeSceneGenerator('Compare the electronegativity of carbon and oxygen.') === 'periodic_trends')
check('"atomic radius" prose → periodic_trends',
  routeSceneGenerator('Why does atomic radius decrease across a period?') === 'periodic_trends')
check('"periodic trend" prose → periodic_trends',
  routeSceneGenerator('Explain the periodic trend in ionization energy.') === 'periodic_trends')
check('unrelated electron-shell prose does NOT route to periodic_trends',
  routeSceneGenerator('Draw the Bohr model electron configuration of sodium.') !== 'periodic_trends')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
