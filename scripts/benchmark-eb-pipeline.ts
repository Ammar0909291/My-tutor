/**
 * Offline latency benchmark for deterministic Educational Brain stages (0, 1, 3).
 * Stages 2 (Retrieval) and 4 (Persist) hit the DB and are mocked here to show
 * end-to-end overhead excluding network I/O.
 *
 * Run with:  npx tsx scripts/benchmark-eb-pipeline.ts
 *
 * Reports: p50, p90, p99 wall-clock for each stage and total pipeline.
 * Target: total p99 ≤ 600 ms (doc 03 §8) — offline stages must be < 10 ms
 * so DB stages have headroom.
 */
import { frameStage } from '../src/lib/educationalBrain/frameStage'
import { intentStage } from '../src/lib/educationalBrain/intentStage'
import { compositionStage } from '../src/lib/educationalBrain/compositionStage'
import type { TurnContext, ConceptContext } from '../src/lib/educationalBrain/types'

const ITERATIONS = 1000

const SAMPLE_MESSAGES = [
  'What is velocity?',
  'Why does the ball fall?',
  "I don't understand Newton's second law F=ma",
  'How do I calculate the momentum of an object?',
  'Explain the relationship between voltage and current in a circuit',
  "I'm confused about projectile trajectory",
  'Define acceleration in terms of calculus',
  'What causes friction between surfaces?',
]

const MOCK_CONCEPT: ConceptContext = {
  id: 'physics.kinematics.kinematics_intro',
  title: 'Kinematics',
  description: 'The study of motion without considering forces. Covers displacement, velocity, acceleration, and the equations of motion. Essential prerequisite for dynamics and all advanced mechanics.',
  primaryDomain: 'physics',
  neighbors: [
    { conceptId: 'physics.dynamics.newtons_laws', title: "Newton's Laws", edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'dependent' },
    { conceptId: 'physics.math.algebra', title: 'Algebra', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
    { conceptId: 'physics.math.calculus', title: 'Calculus', edgeKind: 'PREREQUISITE_OF', weight: 0.7, direction: 'prerequisite' },
  ],
}

function percentile(sorted: number[], p: number): number {
  const idx = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(0, idx)]
}

function bench(name: string, fn: () => void, n = ITERATIONS): { p50: number; p90: number; p99: number; mean: number } {
  // Warmup
  for (let i = 0; i < 10; i++) fn()

  const times: number[] = []
  for (let i = 0; i < n; i++) {
    const t = process.hrtime.bigint()
    fn()
    times.push(Number(process.hrtime.bigint() - t) / 1_000_000) // ms
  }
  times.sort((a, b) => a - b)
  return {
    p50: percentile(times, 50),
    p90: percentile(times, 90),
    p99: percentile(times, 99),
    mean: times.reduce((a, b) => a + b, 0) / times.length,
  }
}

function fmt(r: ReturnType<typeof bench>): string {
  return `p50=${r.p50.toFixed(3)}ms  p90=${r.p90.toFixed(3)}ms  p99=${r.p99.toFixed(3)}ms  mean=${r.mean.toFixed(3)}ms`
}

console.log(`\n=== Educational Brain — Offline Latency Benchmark (${ITERATIONS} iterations) ===\n`)

const msgs = SAMPLE_MESSAGES

let mi = 0
const frame = bench('Stage 0 — Frame', () => {
  const msg = msgs[mi++ % msgs.length]
  frameStage({ userId: 'bench', sessionId: 'bench-s', subjectSlug: 'physics', userMessage: msg })
})
console.log(`Stage 0  Frame       ${fmt(frame)}`)

mi = 0
const intent = bench('Stage 1 — Intent (after Frame)', () => {
  const msg = msgs[mi++ % msgs.length]
  intentStage(frameStage({ userId: 'bench', sessionId: 'bench-s', subjectSlug: 'physics', userMessage: msg }))
})
console.log(`Stage 1  Intent      ${fmt(intent)}`)

mi = 0
const composition = bench('Stage 3 — Composition (after Frame+Intent)', () => {
  const msg = msgs[mi++ % msgs.length]
  const base = intentStage(frameStage({ userId: 'bench', sessionId: 'bench-s', subjectSlug: 'physics', userMessage: msg }))
  const withCtx: TurnContext = { ...base, conceptContext: MOCK_CONCEPT, candidateConcept: MOCK_CONCEPT.id }
  compositionStage(withCtx)
})
console.log(`Stage 3  Composition ${fmt(composition)}`)

mi = 0
const fullOffline = bench('Full offline (0+1+3, mock concept)', () => {
  const msg = msgs[mi++ % msgs.length]
  const framed = frameStage({ userId: 'bench', sessionId: 'bench-s', subjectSlug: 'physics', userMessage: msg })
  const intented = intentStage(framed)
  const withCtx: TurnContext = { ...intented, conceptContext: MOCK_CONCEPT, candidateConcept: MOCK_CONCEPT.id }
  compositionStage(withCtx)
})
console.log(`Full     offline     ${fmt(fullOffline)}`)

console.log('\n── Interpretation ──────────────────────────────────────────────────────────')
console.log('Doc 03 §8 target: total pipeline p99 ≤ 600 ms')
console.log('Offline stages (0+1+3) budget consumed:')
const offlineP99 = fullOffline.p99
const remainingBudget = 600 - offlineP99
console.log(`  Offline p99: ${offlineP99.toFixed(3)} ms`)
console.log(`  Remaining for DB stages (2+4): ${remainingBudget.toFixed(1)} ms`)
if (offlineP99 < 10) {
  console.log('  ✓ Offline overhead well within budget (<10 ms). DB stages can use full 590 ms.')
} else if (offlineP99 < 50) {
  console.log('  ✓ Offline overhead within budget (<50 ms). Comfortable headroom for DB stages.')
} else {
  console.log('  ⚠ Offline overhead high. Investigate before claiming p99 budget compliance.')
}
console.log()
