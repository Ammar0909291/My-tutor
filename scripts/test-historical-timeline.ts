/**
 * Test harness for the deterministic historical-timeline scene generator
 * (src/lib/teaching/sceneGenerators/historicalTimeline.ts). Pure layout — no Groq.
 *
 * Verifies by independent recomputation: events are laid out in chronological
 * x-order regardless of input order, x-positions are proportional to year
 * within the range, and years are validated as finite integers.
 *
 * extractTimelineParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-historical-timeline.ts
 */

import {
  buildTimelineScene,
  checkTimelineConsistency,
  validateTimelineParams,
  MIN_EVENTS,
  MAX_EVENTS,
  type TimelineParams,
} from '../src/lib/teaching/sceneGenerators/historicalTimeline'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const points = (spec: ReturnType<typeof buildTimelineScene>): SceneObject[] =>
  spec.steps.flatMap((s) => s.objects).filter((o) => o.type === 'point')

console.log('\n=== historical timeline deterministic scene harness ===\n')

// ── 4 events, deliberately out of chronological order in the input ───────────
const p: TimelineParams = {
  events: [
    { year: 1947, event: 'Indian Independence' },
    { year: 1857, event: 'Revolt of 1857' },
    { year: 1991, event: 'Economic Liberalization' },
    { year: 1600, event: 'East India Company founded' },
  ],
}
const spec = buildTimelineScene(p)

check('structurally valid SceneSpec', validateSceneSpec(spec).valid, JSON.stringify(validateSceneSpec(spec).errors))
check('passes independent consistency check', checkTimelineConsistency(spec, p).ok,
  checkTimelineConsistency(spec, p).errors.join('; '))
check('produces one scene point per event', points(spec).length === p.events.length)
check('events are laid out in chronological x-order regardless of input order', (() => {
  const byYear = [...points(spec)].sort((a, b) => ((a.properties as Record<string, unknown>).year as number) - ((b.properties as Record<string, unknown>).year as number))
  for (let i = 1; i < byYear.length; i++) {
    if ((byYear[i].position as [number, number, number])[0] < (byYear[i - 1].position as [number, number, number])[0]) return false
  }
  return true
})())
check('earliest event (1600) is leftmost', (() => {
  const earliest = points(spec).find((o) => (o.properties as Record<string, unknown>).year === 1600)!
  const xs = points(spec).map((o) => (o.position as [number, number, number])[0])
  return (earliest.position as [number, number, number])[0] === Math.min(...xs)
})())
check('latest event (1991) is rightmost', (() => {
  const latest = points(spec).find((o) => (o.properties as Record<string, unknown>).year === 1991)!
  const xs = points(spec).map((o) => (o.position as [number, number, number])[0])
  return (latest.position as [number, number, number])[0] === Math.max(...xs)
})())
check('labels alternate above/below the axis', (() => {
  const labels = spec.steps.flatMap((s) => s.objects).filter((o) => o.type === 'label')
  const aboveFlags = labels.map((l) => (l.properties as Record<string, unknown>).above as boolean)
  return aboveFlags[0] === true && aboveFlags[1] === false && aboveFlags[2] === true && aboveFlags[3] === false
})())
check('title mentions the min and max year', spec.title.includes('1600') && spec.title.includes('1991'))

// ── All events share the same year (divide-by-zero guard) ────────────────────
const pSameYear: TimelineParams = { events: [{ year: 2000, event: 'A' }, { year: 2000, event: 'B' }] }
const specSameYear = buildTimelineScene(pSameYear)
check('all-same-year input — structurally valid (no NaN from zero span)', validateSceneSpec(specSameYear).valid)
check('all-same-year input — passes consistency check', checkTimelineConsistency(specSameYear, pSameYear).ok)

// ── BCE (negative year) handling ──────────────────────────────────────────────
const pBCE: TimelineParams = { events: [{ year: -3000, event: 'Indus Valley Civilization begins' }, { year: 1947, event: 'Indian Independence' }] }
const specBCE = buildTimelineScene(pBCE)
check('BCE (negative) years — structurally valid', validateSceneSpec(specBCE).valid)
check('BCE (negative) years — passes consistency check', checkTimelineConsistency(specBCE, pBCE).ok)
check('BCE year (-3000) sits left of CE year (1947)', (() => {
  const bce = points(specBCE).find((o) => (o.properties as Record<string, unknown>).year === -3000)!
  const ce = points(specBCE).find((o) => (o.properties as Record<string, unknown>).year === 1947)!
  return (bce.position as [number, number, number])[0] < (ce.position as [number, number, number])[0]
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check(`reject fewer than MIN_EVENTS (${MIN_EVENTS})`, validateTimelineParams({ events: [{ year: 2000, event: 'A' }] }) === null)
check(`reject more than MAX_EVENTS (${MAX_EVENTS})`, validateTimelineParams({
  events: Array.from({ length: MAX_EVENTS + 1 }, (_, i) => ({ year: 2000 + i, event: `E${i}` })),
}) === null)
check('reject non-integer year', validateTimelineParams({ events: [{ year: 2000.5, event: 'A' }, { year: 2001, event: 'B' }] }) === null)
check('reject empty event string', validateTimelineParams({ events: [{ year: 2000, event: '' }, { year: 2001, event: 'B' }] }) === null)
check('accept a valid pair', validateTimelineParams({ events: [{ year: 1947, event: 'A' }, { year: 1991, event: 'B' }] })?.events.length === 2)

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for year does not coerce to 1 (Number(true)===1 coercion trap)',
  validateTimelineParams({ events: [{ year: true, event: 'A' }, { year: 2001, event: 'B' }] }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
