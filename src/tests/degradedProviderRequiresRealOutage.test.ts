/**
 * AMP-A — `provider: 'degraded'` must mean a model did not answer.
 *
 * THE DEFECT (measured, ledger §9m/§9l/§9q). The early empty-turn guard asked
 * `!text.trim() && mcqHoisted`. `mcqHoisted` is only the probe ATTACHED THIS
 * TURN. In the reproduced phys.em.resistivity path:
 *
 *   - groq answered: `[ai/attempt] outcome=ok http_status=200 chars=632`
 *   - the model put its question in the MCQ tag, which parses and strips first
 *   - an unanswered authored probe was ALREADY on screen, so `decideModelProbe`
 *     declined the model's question (`model-probe-withheld /
 *     gate-declined-by-policy`) and the route nulled `mcqHoisted`
 *   - so text was empty, `mcqHoisted` was null, and the guard fell through to
 *     the degraded branch
 *
 * The turn was stamped `provider: 'degraded'` although a model HAD answered and
 * the learner could still see the pending probe. The certification harness read
 * that (correctly, per AMP-B, which is VALID BY DESIGN and unchanged) as
 * FAILED_INFRASTRUCTURE — twice, on two separate runs.
 *
 * THE FIX is which value the guard reads: `mcqToServe(mcqHoisted,
 * pendingMcqHoisted, mcqGradeHoisted)` — the single owner of "is a probe on
 * screen", and already what the response serves and the snapshot persists.
 *
 * These cases drive the REAL `mcqToServe`, `degradedTurn`, `isDegradedProvider`
 * and `decideModelProbe`. The mirror below is coupled to the route by the
 * source assertions at the bottom, so it cannot drift into testing itself.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { mcqToServe, type TutorMCQ } from '@/lib/teaching/mcq'
import { degradedTurn, isDegradedProvider } from '@/lib/eos-runtime/degradedMode'
import { decideModelProbe } from '@/lib/teaching/inventedProbeGuard'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8',
)

const AUTHORED: TutorMCQ = {
  question: 'Start from a copper wire of resistance R…',
  options: ['Wire A: 2R … Wire B: R/2 …', 'Wire A: R/2 … Wire B: R/2', 'Wire A: 2R. Wire B: 2R'],
  correctIndex: 0,
}
const MODEL_PROBE: TutorMCQ = {
  question: 'Which statement correctly describes resistivity?',
  options: ['x', 'y'],
  correctIndex: 0,
}

/**
 * The guard as the route now runs it. Returns what the turn ends up carrying.
 * `withheldModelMcq` is accepted ONLY to prove it is not consulted.
 */
function earlyEmptyGuard(args: {
  text: string
  mcqHoisted: TutorMCQ | null
  pendingMcq: TutorMCQ | null
  mcqGrade: unknown | null
  withheldModelMcq?: TutorMCQ | null
}): { text: string; provider: string } {
  const provider = 'groq' // a model answered this turn
  const served = mcqToServe(args.mcqHoisted, args.pendingMcq, args.mcqGrade)
  if (!args.text.trim() && served) {
    return { text: 'Here is a question to check your understanding:', provider }
  }
  if (!args.text.trim()) {
    const d = degradedTurn({ register: 'beginner', learnerText: 'anything' })
    return { text: d.text, provider: d.provider }
  }
  return { text: args.text, provider }
}

describe('CASE A — a carried-forward probe is content, so the turn is not degraded', () => {
  it('empty text + mcqHoisted null + a pending ungraded probe -> NOT degraded', () => {
    const out = earlyEmptyGuard({
      text: '', mcqHoisted: null, pendingMcq: AUTHORED, mcqGrade: null,
    })
    expect(isDegradedProvider(out.provider)).toBe(false)
    expect(out.provider).toBe('groq')
    expect(out.text).toBe('Here is a question to check your understanding:')
  })

  it('whitespace-only counts as empty for the same decision', () => {
    const out = earlyEmptyGuard({
      text: '   \n\t ', mcqHoisted: null, pendingMcq: AUTHORED, mcqGrade: null,
    })
    expect(isDegradedProvider(out.provider)).toBe(false)
  })

  it('a probe attached THIS turn still works — the old behaviour is not lost', () => {
    const out = earlyEmptyGuard({
      text: '', mcqHoisted: AUTHORED, pendingMcq: null, mcqGrade: null,
    })
    expect(isDegradedProvider(out.provider)).toBe(false)
  })

  it('a probe ANSWERED this turn is spent, so it is not content for the next turn', () => {
    // mcqToServe deliberately stops serving a pending probe once it is graded.
    // With nothing else on screen the turn really is empty, and must degrade —
    // this is the boundary that keeps CASE A from becoming "never degrade".
    const out = earlyEmptyGuard({
      text: '', mcqHoisted: null, pendingMcq: AUTHORED, mcqGrade: { chosenIndex: 0, correct: true },
    })
    expect(isDegradedProvider(out.provider)).toBe(true)
  })
})

describe('CASE B — a genuinely empty turn still degrades', () => {
  it('empty text + no probe of any kind -> degraded, unchanged', () => {
    const out = earlyEmptyGuard({ text: '', mcqHoisted: null, pendingMcq: null, mcqGrade: null })
    expect(isDegradedProvider(out.provider)).toBe(true)
    expect(out.text.length).toBeGreaterThan(0)
  })

  it('non-empty text is never touched', () => {
    const out = earlyEmptyGuard({
      text: 'Resistance grows with length.', mcqHoisted: null, pendingMcq: null, mcqGrade: null,
    })
    expect(out.text).toBe('Resistance grows with length.')
    expect(isDegradedProvider(out.provider)).toBe(false)
  })
})

describe('CASE C — the policy gate is not bypassed and the withheld probe is not laundered', () => {
  it('the REAL decideModelProbe still declines the model probe in this situation', () => {
    const d = decideModelProbe({
      probeWouldCountThisPhase: true,
      gateServedAuthoredProbe: false,
      modelOfferedProbe: true,
      authoredProbesExist: true,
      gateDeclinedByPolicy: true,
    })
    expect(d.serve).toBe(false)
  })

  it('a withheld model probe is NOT treated as content when nothing else is on screen', () => {
    // The dangerous widening this fix deliberately does not make: if the guard
    // had consulted `withheldModelMcqHoisted`, a question the gate refused
    // would have kept the turn alive and effectively re-admitted it.
    const out = earlyEmptyGuard({
      text: '', mcqHoisted: null, pendingMcq: null, mcqGrade: null,
      withheldModelMcq: MODEL_PROBE,
    })
    expect(isDegradedProvider(out.provider)).toBe(true)
  })

  it('the served probe is the AUTHORED one, never the withheld model probe', () => {
    expect(mcqToServe(null, AUTHORED, null)).toBe(AUTHORED)
    expect(mcqToServe(null, AUTHORED, null)).not.toBe(MODEL_PROBE)
  })
})

describe('CASE D — a real provider failure is still degraded', () => {
  it('degradedTurn is the single owner of the identity, and it still says degraded', () => {
    const d = degradedTurn({ register: 'beginner', learnerText: 'hello' })
    expect(d.provider).toBe('degraded')
    expect(isDegradedProvider(d.provider)).toBe(true)
    expect(d.finishReason).toBe('template')
    expect(d.text.length).toBeGreaterThan(0)
  })

  it('the all-providers-failed catch still reaches degradedTurn, untouched by this fix', () => {
    expect(ROUTE).toContain('all providers down — serving degraded template (RS P-3)')
    const outage = ROUTE.indexOf('all providers down — serving degraded template')
    const guard = ROUTE.indexOf('const servedProbeThisTurn = mcqToServeForEmptyGuardEarly(')
    expect(outage).toBeGreaterThan(0)
    expect(guard).toBeGreaterThan(outage) // the outage path is upstream and separate
  })
})

describe('the route is wired to this decision, so the mirror above cannot drift', () => {
  it('the early guard reads mcqToServe, not the attached-only probe', () => {
    expect(ROUTE).toContain('const servedProbeThisTurn = mcqToServeForEmptyGuardEarly(')
    expect(ROUTE).toContain('if (!text.trim() && servedProbeThisTurn) {')
    expect(ROUTE).not.toContain('if (!text.trim() && mcqHoisted) {')
  })

  it('it is given exactly the three values mcqToServe takes', () => {
    const call = ROUTE.slice(
      ROUTE.indexOf('const servedProbeThisTurn = mcqToServeForEmptyGuardEarly('),
    ).slice(0, 200)
    expect(call).toContain('mcqHoisted')
    expect(call).toContain('pendingMcqHoisted')
    expect(call).toContain('mcqGradeHoisted')
  })

  it('the guard does NOT consult the withheld model probe', () => {
    const start = ROUTE.indexOf('const servedProbeThisTurn = mcqToServeForEmptyGuardEarly(')
    const end = ROUTE.indexOf('provider = degraded.provider', start)
    expect(start).toBeGreaterThan(0)
    expect(end).toBeGreaterThan(start)
    const block = ROUTE.slice(start, end)
    // The comment above the guard names the field to explain why it is excluded;
    // what must not appear is a READ of it in the condition itself.
    expect(block).not.toMatch(/&&\s*withheldModelMcqHoisted/)
    expect(block).not.toMatch(/\|\|\s*withheldModelMcqHoisted/)
  })

  it('degraded is still reachable — the else branch survives', () => {
    expect(ROUTE).toContain('} else if (!text.trim()) {')
    expect(ROUTE).toContain('provider = degraded.provider')
  })
})
