/**
 * Offline unit harness for buildDeterministicSummary in
 * src/lib/school/reports/progressReport.ts (exported as part of this task —
 * zero behavior change, `export` only). This is the AI-summary fallback
 * text shown whenever the LLM call fails or returns something out of
 * bounds, so it's the text students reliably see — worth covering its
 * branches and pluralization directly.
 *
 * Run with:  npx tsx scripts/test-progress-report-summary.ts
 */
import { buildDeterministicSummary } from '../src/lib/school/reports/progressReport'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── completed-chapters branch ─────────────────────────────────────────────
check('no completed chapters → fresh-start framing',
  buildDeterministicSummary('This Week', [], [], [], 0, 0).includes('fresh start'))

check('one completed chapter uses singular "chapter"',
  buildDeterministicSummary('This Week', ['Algebra Basics'], [], [], 0, 0).includes('1 chapter.'))

check('multiple completed chapters use plural "chapters"',
  buildDeterministicSummary('This Week', ['Ch1', 'Ch2', 'Ch3'], [], [], 0, 0).includes('3 chapters.'))

check('window label is lowercased in the fresh-start sentence',
  buildDeterministicSummary('This Month', [], [], [], 0, 0).includes('this month'))

// ── strengths branch ───────────────────────────────────────────────────────
check('no strengths → no strengths sentence',
  !buildDeterministicSummary('This Week', [], [], [], 0, 0).includes('real strength'))

check('strengths present → names up to 2 of them',
  buildDeterministicSummary('This Week', [], ['Fractions', 'Decimals', 'Ratios'], [], 0, 0).includes('Fractions and Decimals'))

check('a single strength still reads naturally (no dangling "and")',
  buildDeterministicSummary('This Week', [], ['Fractions'], [], 0, 0).includes('real strength in Fractions.'))

// ── streak vs. areas-to-improve branch (mutually exclusive) ──────────────
check('active streak (>0) mentions the streak, not the weak area',
  (() => {
    const s = buildDeterministicSummary('This Week', [], [], ['Trigonometry'], 5, 0)
    return s.includes('5-day streak') && !s.includes('Trigonometry')
  })())

check('no streak but weak areas exist → suggests focusing on the first one',
  (() => {
    const s = buildDeterministicSummary('This Week', [], [], ['Trigonometry', 'Geometry'], 0, 0)
    return s.includes('Trigonometry') && !s.includes('Geometry')
  })())

check('no streak and no weak areas → neither sentence appears',
  (() => {
    const s = buildDeterministicSummary('This Week', [], [], [], 0, 0)
    return !s.includes('streak') && !s.includes('focus on')
  })())

// ── passed-assessments branch ──────────────────────────────────────────────
check('no assessments passed → no assessment sentence',
  !buildDeterministicSummary('This Week', [], [], [], 0, 0).includes('assessment'))

check('one assessment passed uses singular "assessment"',
  buildDeterministicSummary('This Week', [], [], [], 0, 1).includes('1 assessment —'))

check('multiple assessments passed use plural "assessments"',
  buildDeterministicSummary('This Week', [], [], [], 0, 3).includes('3 assessments —'))

// ── full composite (all branches active at once) ────────────────────────────
{
  const s = buildDeterministicSummary('This Week', ['Algebra'], ['Fractions'], ['Geometry'], 4, 2)
  check('all signals present: composite summary includes every section',
    s.includes('1 chapter.') && s.includes('Fractions') && s.includes('4-day streak') && s.includes('2 assessments —'))
}

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
