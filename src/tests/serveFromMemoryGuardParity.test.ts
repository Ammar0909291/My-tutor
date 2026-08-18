/**
 * EVERY SERVING DECISION CARRIES EVERY GUARD.
 *
 * This defect has now shipped to production TWICE, in the same shape both
 * times. `serveFromMemory` is assigned at three places — the normal path, the
 * Brain-dispatcher path and the catch-block fallback — and each new guard was
 * added to the first one only. The other two kept re-deriving a stale subset
 * and overwrote it:
 *
 *   fecc8af   added !answersProse       → dropped by the Brain + fallback paths
 *   b653f1a   added !ackToQuestion      → same two paths, same way
 *
 * The Brain path runs whenever the CUE runtime is ACTIVE (`mode=ACTIVE` in
 * production), so in practice the guarded value was discarded on essentially
 * every turn. MEASURED consequence on two fresh Mathematics lessons: a learner
 * ANSWER was met with a stored essay (provider=memory, llmCallCount=0), which
 * emits no correctness signal, so the ladder could not advance and neither
 * math.found.logic nor math.arith.ratios reached CHECK.
 *
 * Unit tests of the individual guards PASSED throughout — the guards were
 * correct, the wiring was not. This file tests the wiring, which is the only
 * thing that would have caught either occurrence.
 *
 * It deliberately asserts PARITY rather than a particular expression, so it
 * constrains no one's implementation: add a fourth guard or a fourth
 * assignment and this fails until every site agrees.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** Every line that assigns the serving decision, in source order. */
const assignments = ROUTE.split('\n')
  .map((text, i) => ({ line: i + 1, text }))
  .filter((l) => /^\s*(?:let\s+)?serveFromMemory\s*=/.test(l.text))

/** The guard tokens the normal path applies — the reference set. */
const GUARDS = [
  '!answersPendingQuestion',
  '!readinessAtGate',
  '!answersProse',
  '!ackToQuestion',
] as const

describe('serveFromMemory guard parity', () => {
  it('there are exactly three decision points', () => {
    expect(assignments.map((a) => a.line)).toHaveLength(3)
  })

  it.each(GUARDS)('every assignment carries %s', (guard) => {
    for (const a of assignments) {
      expect(a.text.includes(guard), `line ${a.line} is missing ${guard}`).toBe(true)
    }
  })

  it('every assignment requires an assembled asset', () => {
    for (const a of assignments) {
      expect(a.text, `line ${a.line}`).toMatch(/assembled !== null|memoryPermitted/)
    }
  })

  it('the Brain path keeps its EXPLANATION_MEMORY executor requirement', () => {
    const brain = assignments.filter((a) => a.text.includes('EXPLANATION_MEMORY'))
    expect(brain).toHaveLength(1)
    for (const guard of GUARDS) expect(brain[0].text).toContain(guard)
  })

  it('no path is more permissive than the normal path', () => {
    // The normal path is the reference. A degraded or dispatcher path that
    // dropped a guard would be MORE permissive than the healthy one — which is
    // exactly what reached production, twice.
    const normal = assignments.find((a) => /^\s*let\s+serveFromMemory/.test(a.text))
    expect(normal).toBeDefined()
    const guardsIn = (t: string) => GUARDS.filter((g) => t.includes(g)).length
    const reference = guardsIn(normal!.text)
    expect(reference).toBe(GUARDS.length)
    for (const a of assignments) {
      expect(guardsIn(a.text), `line ${a.line} has fewer guards than the normal path`)
        .toBe(reference)
    }
  })
})
