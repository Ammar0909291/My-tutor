/**
 * Test harness for the deterministic statistics bar-chart scene generator
 * (src/lib/teaching/sceneGenerators/statisticsBarChart.ts). Pure math — no Groq.
 *
 * Verifies by independent recomputation: bar heights match frequency × scale,
 * the mode label/frequency match the actual maximum-frequency category, and
 * the mean (Σ(index×frequency)/Σfrequency) and total match re-derived values —
 * across a simple even distribution, a skewed distribution, and a tie-breaking
 * mode case. Also confirms the scene-router keyword routing.
 *
 * extractStatisticsParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-statistics-bar-chart-scene.ts
 */

import {
  buildStatisticsBarChartScene,
  checkStatisticsConsistency,
  validateStatisticsParams,
  type StatisticsParams,
} from '../src/lib/teaching/sceneGenerators/statisticsBarChart'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== statistics-bar-chart deterministic scene harness ===\n')

// ── Skewed distribution: clear single mode ───────────────────────────────────
const skewed: StatisticsParams = {
  chartTitle: 'Marks scored',
  bars: [
    { label: '0-10', frequency: 2 },
    { label: '10-20', frequency: 5 },
    { label: '20-30', frequency: 12 },
    { label: '30-40', frequency: 4 },
  ],
}
const specSkewed = buildStatisticsBarChartScene(skewed)

check('skewed — structurally valid SceneSpec', validateSceneSpec(specSkewed).valid, JSON.stringify(validateSceneSpec(specSkewed).errors))
check('skewed — passes independent consistency check', checkStatisticsConsistency(specSkewed, skewed).ok,
  checkStatisticsConsistency(specSkewed, skewed).errors.join('; '))
check('skewed — has 3 steps', specSkewed.steps.length === 3)
check('skewed — mode is "20-30"', (() => {
  const obj = specSkewed.steps.flatMap((s) => s.objects).find((o) => o.id === 'modeLabel')
  return (obj?.properties as Record<string, unknown> | undefined)?.modeLabel === '20-30'
})())

// ── Even distribution ─────────────────────────────────────────────────────────
const even: StatisticsParams = {
  chartTitle: 'Favorite color',
  bars: [
    { label: 'Red', frequency: 10 },
    { label: 'Blue', frequency: 10 },
    { label: 'Green', frequency: 10 },
  ],
}
const specEven = buildStatisticsBarChartScene(even)
check('even — passes independent consistency check', checkStatisticsConsistency(specEven, even).ok,
  checkStatisticsConsistency(specEven, even).errors.join('; '))
check('even — mean index ≈ 1 (middle category)', (() => {
  const obj = specEven.steps.flatMap((s) => s.objects).find((o) => o.id === 'meanLabel')
  const mean = Number((obj?.properties as Record<string, unknown> | undefined)?.mean)
  return Math.abs(mean - 1) < 0.001
})())

// ── Many categories ────────────────────────────────────────────────────────────
const many: StatisticsParams = {
  chartTitle: 'Daily steps',
  bars: Array.from({ length: 8 }, (_, i) => ({ label: `day-${i + 1}`, frequency: (i + 1) * 100 })),
}
const specMany = buildStatisticsBarChartScene(many)
check('many categories — passes independent consistency check', checkStatisticsConsistency(specMany, many).ok,
  checkStatisticsConsistency(specMany, many).errors.join('; '))

// ── Tampered scene fails the consistency check ────────────────────────────────
const tamperedMode = buildStatisticsBarChartScene(skewed)
const modeObj = tamperedMode.steps.flatMap((s) => s.objects).find((o) => o.id === 'modeLabel')
if (modeObj && modeObj.properties) modeObj.properties.modeLabel = '0-10'
check('tampered mode label fails the consistency check', !checkStatisticsConsistency(tamperedMode, skewed).ok)

const tamperedMean = buildStatisticsBarChartScene(skewed)
const meanObj = tamperedMean.steps.flatMap((s) => s.objects).find((o) => o.id === 'meanLabel')
if (meanObj && meanObj.properties) meanObj.properties.mean = 999
check('tampered mean fails the consistency check', !checkStatisticsConsistency(tamperedMean, skewed).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject fewer than 2 bars', validateStatisticsParams({ chartTitle: 'x', bars: [{ label: 'a', frequency: 1 }] }) === null)
check('reject more than 12 bars', validateStatisticsParams({ chartTitle: 'x', bars: Array.from({ length: 13 }, (_, i) => ({ label: `b${i}`, frequency: 1 })) }) === null)
check('reject frequency <= 0', validateStatisticsParams({ chartTitle: 'x', bars: [{ label: 'a', frequency: 0 }, { label: 'b', frequency: 1 }] }) === null)
check('reject empty chartTitle', validateStatisticsParams({ chartTitle: '  ', bars: [{ label: 'a', frequency: 1 }, { label: 'b', frequency: 1 }] }) === null)
check('reject non-string label', validateStatisticsParams({ chartTitle: 'x', bars: [{ label: 5, frequency: 1 }, { label: 'b', frequency: 1 }] }) === null)
check('accept a valid scenario', validateStatisticsParams(skewed)?.chartTitle === 'Marks scored')

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for frequency does not coerce to 1 (Number(true)===1 coercion trap)',
  validateStatisticsParams({ chartTitle: 'x', bars: [{ label: 'a', frequency: true }, { label: 'b', frequency: 1 }] }) === null)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for statistics_bar_chart ===\n')

check('"frequency distribution" prose → statistics_bar_chart',
  routeSceneGenerator('Draw the frequency distribution of marks scored by students.') === 'statistics_bar_chart')
check('"bar chart" prose → statistics_bar_chart',
  routeSceneGenerator('Show a bar chart of favorite colors among the class.') === 'statistics_bar_chart')
check('"modal class" prose → statistics_bar_chart',
  routeSceneGenerator('Find the modal class of the grouped frequency table.') === 'statistics_bar_chart')
check('unrelated demographic prose does NOT route to statistics_bar_chart',
  routeSceneGenerator('Show the population pyramid for India by age band.') !== 'statistics_bar_chart')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
