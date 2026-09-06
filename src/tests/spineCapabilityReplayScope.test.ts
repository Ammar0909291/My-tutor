/**
 * EGRESS-2 — the capability replay must fetch only what it can use.
 *
 * THE DEFECT THIS PINS, measured in production (Supabase MCP, project
 * ywakxiqbevfuxsiwewnw, 2026-09-06): the EGRESS-1 fix (spineReplayEgress
 * .test.ts) correctly bounds `replayStudentView` to once per genuinely-new
 * session, but that one bounded call still fetches the learner's ENTIRE
 * spine_events log. route.ts only ever reads `.capability` off the result
 * (`hydrateFromProjection(view.capability)`); `.teaching`/`.conversation`/
 * `.recovery`/`.answers`/`.decisions` are discarded. For a heavily-used
 * learner account (hundreds of prior sessions — the certification account
 * used across this session's Tier-A runs has 843+), every NEW session pays
 * a full-log replay to answer a question only one event type can affect.
 * Measured live: +7,881 calls / +3,827,522 rows (~1.8 GB) against
 * spine_events over roughly 20 new certification sessions.
 *
 * THE FIX: `replayCapabilityProjection` (evidence-spine/replay.ts) queries
 * only `type: 'CapabilityObserved'` rows — index-backed by the pre-existing
 * `@@index([learnerId, type])` on spine_events, no migration needed — and
 * folds only those. `loadSpineEvents` (the full, unbounded loader) is
 * UNTOUCHED; a new sibling function was added instead, per spineReplayEgress
 * .test.ts's own guard that the full loader must stay unbounded (it may
 * still be needed for `verifySnapshot`/future diagnostics).
 *
 * WHY THIS CANNOT SILENTLY DIVERGE FROM A FULL REPLAY: `foldEvent`'s switch
 * (fold.ts) writes `.capability` in exactly one case, `CapabilityObserved`;
 * every other case reads only its own event's payload and writes only its
 * own projection slice. So filtering the input stream to CapabilityObserved
 * events before folding cannot change the `.capability` output — proved
 * below against the real `foldAll`, and pinned structurally so a future case
 * that starts touching `.capability` outside that one branch fails a test
 * here rather than silently breaking the equivalence this fix depends on.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { foldAll } from '@/lib/evidence-spine/fold'
import type { SpineEventRecord } from '@/lib/evidence-spine/types'
import {
  loadSpineEventsOfType, replayCapabilityProjection, replayStudentView, loadSpineEvents,
} from '@/lib/evidence-spine/replay'

// ── A minimal, REAL-filtering fake — not a mock that hands back canned data.
// Its findMany() actually applies learnerId/type/seq exactly like Postgres
// would against the where clause it is passed, over an in-memory table, and
// it RECORDS every where-clause it was called with so tests can assert the
// query SHAPE, not just the final answer.
function fakePrisma(table: readonly SpineEventRecord[]) {
  const calls: Array<{ learnerId: string; type?: readonly string[]; seqGt: number }> = []
  const PAGE_SIZE_PROBE = { value: null as number | null }
  return {
    calls,
    spineEvent: {
      async findMany(args: {
        where: { learnerId: string; seq?: { gt: number }; type?: { in: readonly string[] } }
        orderBy: { seq: 'asc' }
        take?: number
      }) {
        const seqGt = args.where.seq?.gt ?? 0
        calls.push({ learnerId: args.where.learnerId, type: args.where.type?.in, seqGt })
        if (PAGE_SIZE_PROBE.value === null && args.take) PAGE_SIZE_PROBE.value = args.take
        const typeSet = args.where.type ? new Set(args.where.type.in) : null
        const rows = table
          .filter((r) => r.learnerId === args.where.learnerId)
          .filter((r) => r.seq > seqGt)
          .filter((r) => !typeSet || typeSet.has(r.type))
          .sort((a, b) => a.seq - b.seq)
          .slice(0, args.take ?? Infinity)
        return rows.map((r) => ({
          eventId: r.eventId, seq: r.seq, learnerId: r.learnerId, sessionId: r.sessionId,
          turnId: r.turnId, type: r.type, schemaVersion: r.schemaVersion,
          payload: r.payload, source: r.source, confidence: r.confidence,
        }))
      },
    },
  }
}

const ev = (over: Partial<SpineEventRecord> & { seq: number; learnerId: string; type: string }): SpineEventRecord => ({
  eventId: `e${over.seq}-${over.learnerId}`, sessionId: null, turnId: null, schemaVersion: 1,
  payload: {}, source: { componentId: 'test', version: 1 }, confidence: 1,
  ...over,
})

const capObs = (seq: number, learnerId: string, capabilityId: string, direction: 'success' | 'failure' | 'stated_no', diagnostic = true): SpineEventRecord =>
  ev({ seq, learnerId, type: 'CapabilityObserved', payload: { capabilityId, direction, diagnostic } })

describe('property 1 — a genuinely new session gets the same required state as before', () => {
  it('replayCapabilityProjection matches (await replayStudentView(...)).capability exactly, over a mixed-type log', async () => {
    const learnerId = 'L1'
    const table: SpineEventRecord[] = [
      ev({ seq: 1, learnerId, type: 'StudentMessageReceived' }),
      capObs(2, learnerId, 'multiply', 'success'),
      ev({ seq: 3, learnerId, type: 'AnswerObserved', payload: { correct: true } }),
      capObs(4, learnerId, 'multiply', 'success'),
      ev({ seq: 5, learnerId, type: 'DecisionRecorded', payload: { move: 'teach', phase: 'GUIDE' } }),
      capObs(6, learnerId, 'divide', 'failure'),
      ev({ seq: 7, learnerId, type: 'RecoveryEntered', payload: { failureStateKey: 'confused', sessionFailureCount: 1 } }),
      capObs(8, learnerId, 'divide', 'failure'),
    ]
    const prisma = fakePrisma(table)
    const full = await replayStudentView(prisma, learnerId)
    const narrow = await replayCapabilityProjection(fakePrisma(table), learnerId)
    expect(narrow).toEqual(full.capability)
    // And it is non-trivial — the lattice actually moved.
    expect(narrow.capabilities.multiply.status).toBe('RELIABLE')
    expect(narrow.capabilities.divide.status).toBe('OBSERVED_NO')
  })

  it('matches across many concepts and mixed directions, including stated_no', async () => {
    const learnerId = 'L2'
    const table: SpineEventRecord[] = [
      ev({ seq: 1, learnerId, type: 'PhaseTransitioned', payload: { to: 'CHECK', direction: 'up' } }),
      capObs(2, learnerId, 'fractions', 'stated_no'),
      ev({ seq: 3, learnerId, type: 'LessonCompleted', payload: { conceptId: 'math.arith.fractions' } }),
      capObs(4, learnerId, 'fractions', 'success'),
      capObs(5, learnerId, 'percentage', 'success', false),
      ev({ seq: 6, learnerId, type: 'SessionBoundaryDetected', payload: {} }),
      capObs(7, learnerId, 'percentage', 'success', false),
    ]
    const full = await replayStudentView(fakePrisma(table), learnerId)
    const narrow = await replayCapabilityProjection(fakePrisma(table), learnerId)
    expect(narrow).toEqual(full.capability)
  })
})

describe('property 7 — query/read volume is bounded according to the chosen design', () => {
  it('the where clause filters by type — the fake proves rows are actually narrowed, not just the final map', async () => {
    const learnerId = 'L3'
    const table: SpineEventRecord[] = [
      ...Array.from({ length: 500 }, (_, i) => ev({ seq: i + 1, learnerId, type: 'StudentMessageReceived' })),
      capObs(501, learnerId, 'multiply', 'success'),
      capObs(502, learnerId, 'divide', 'failure'),
      capObs(503, learnerId, 'divide', 'failure'),
    ]
    const p = fakePrisma(table)
    const projection = await replayCapabilityProjection(p, learnerId)
    // The fake's findMany applied a REAL filter over 503 rows and returned
    // only the 3 CapabilityObserved ones — this is what makes the egress
    // reduction real rather than asserted-in-prose.
    expect(p.calls.length).toBeGreaterThan(0)
    for (const c of p.calls) expect(c.type).toEqual(['CapabilityObserved'])
    expect(projection.capabilities.multiply.status).toBe('SHAKY')
    expect(projection.capabilities.divide.status).toBe('OBSERVED_NO')
  })

  it('loadSpineEventsOfType returns only the requested types, never the rest of the log', async () => {
    const learnerId = 'L4'
    const table: SpineEventRecord[] = [
      ev({ seq: 1, learnerId, type: 'StudentMessageReceived' }),
      capObs(2, learnerId, 'multiply', 'success'),
      ev({ seq: 3, learnerId, type: 'AssistantRendered', payload: { askedQuestion: false } }),
    ]
    const rows = await loadSpineEventsOfType(fakePrisma(table), learnerId, ['CapabilityObserved'])
    expect(rows).toHaveLength(1)
    expect(rows[0].type).toBe('CapabilityObserved')
  })

  it('loadSpineEvents (the full loader) is UNTOUCHED — still returns everything', async () => {
    const learnerId = 'L5'
    const table: SpineEventRecord[] = [
      ev({ seq: 1, learnerId, type: 'StudentMessageReceived' }),
      capObs(2, learnerId, 'multiply', 'success'),
    ]
    const rows = await loadSpineEvents(fakePrisma(table), learnerId)
    expect(rows).toHaveLength(2)
  })
})

describe('property 3 — two different users cannot share replay state', () => {
  it('a shared table with two learnerIds never lets one leak into the other', async () => {
    const table: SpineEventRecord[] = [
      capObs(1, 'userA', 'multiply', 'success'),
      capObs(2, 'userB', 'multiply', 'failure'),
      capObs(3, 'userA', 'divide', 'success'),
      capObs(4, 'userB', 'divide', 'failure'),
    ]
    const a = await replayCapabilityProjection(fakePrisma(table), 'userA')
    const b = await replayCapabilityProjection(fakePrisma(table), 'userB')
    expect(a.capabilities.multiply.status).toBe('SHAKY')   // A succeeded
    expect(b.capabilities.multiply.status).toBe('OBSERVED_NO') // B failed
    expect(a.capabilities.divide.status).toBe('SHAKY')
    expect(b.capabilities.divide.status).toBe('OBSERVED_NO')
  })
})

describe('property 4 — two concurrent sessions cannot share mutable learner state', () => {
  it('replayCapabilityProjection holds no state between calls — repeated calls with different learners never mix', async () => {
    const table: SpineEventRecord[] = [
      capObs(1, 'userA', 'multiply', 'success'),
      capObs(2, 'userB', 'multiply', 'success'),
      capObs(3, 'userB', 'multiply', 'success'),
    ]
    // Interleaved calls, as two concurrent sessions' cold-starts would be.
    const [a1, b1, a2, b2] = await Promise.all([
      replayCapabilityProjection(fakePrisma(table), 'userA'),
      replayCapabilityProjection(fakePrisma(table), 'userB'),
      replayCapabilityProjection(fakePrisma(table), 'userA'),
      replayCapabilityProjection(fakePrisma(table), 'userB'),
    ])
    expect(a1).toEqual(a2)
    expect(b1).toEqual(b2)
    expect(a1.capabilities.multiply.status).toBe('SHAKY')
    expect(b1.capabilities.multiply.status).toBe('RELIABLE') // two successes, one diagnostic
  })

  it('the module introduces no module-level mutable cache', () => {
    const src = readFileSync(
      join(__dirname, '../lib/evidence-spine/replay.ts'), 'utf8',
    )
    // No top-level `let`/mutable Map/Set outside function bodies — every
    // function here is a pure request-scoped query + fold.
    const topLevelMutable = /^(let|const\s+\w+\s*=\s*new\s+(Map|Set))/m
    expect(topLevelMutable.test(src)).toBe(false)
  })
})

describe('property 5 — resumed sessions preserve existing behavior', () => {
  it('the capabilitiesHydrated guard in route.ts is unchanged by this fix', () => {
    const route = readFileSync(
      join(__dirname, '../app/api/learn/chat/route.ts'), 'utf8',
    )
    // Same guard condition as spineReplayEgress.test.ts already pins —
    // EGRESS-2 only changed WHAT is fetched once the guard opens, never
    // whether it opens.
    expect(route).toContain('snapshot?.capabilitiesHydrated !== true')
    expect(route).toContain(
      "if (capabilitiesHydratedThisTurn || snapshot?.capabilitiesHydrated === true) {",
    )
  })
})

describe('the equivalence proof is structurally guarded, not just asserted once', () => {
  it('fold.ts writes .capability in exactly one case — CapabilityObserved', () => {
    const src = readFileSync(join(__dirname, '../lib/evidence-spine/fold.ts'), 'utf8')
    const body = src.slice(src.indexOf('export function foldEvent'))
    // Count assignments/mutations to v.capability across the whole switch.
    const capabilityWrites = [...body.matchAll(/v\.capability\.capabilities\[/g)]
    // All such writes must live inside the CapabilityObserved case.
    const caseAt = body.indexOf("case 'CapabilityObserved':")
    const nextCaseOrEnd = body.indexOf('\n    case ', caseAt + 1)
    const caseBody = body.slice(caseAt, nextCaseOrEnd === -1 ? undefined : nextCaseOrEnd)
    const writesInCase = [...caseBody.matchAll(/v\.capability\.capabilities\[/g)]
    expect(capabilityWrites.length).toBeGreaterThan(0)
    expect(writesInCase.length).toBe(capabilityWrites.length)
  })

  it('an unrelated event type mixed into a capability-only stream never appears in the projection', async () => {
    // Defensive: even if a caller accidentally handed the narrow function a
    // stream contaminated with other types, foldAll must still ignore them
    // for .capability (this is what makes the filter an optimization and
    // not a correctness dependency).
    const learnerId = 'L6'
    const contaminated: SpineEventRecord[] = [
      capObs(1, learnerId, 'multiply', 'success'),
      ev({ seq: 2, learnerId, type: 'AnswerObserved', payload: { correct: false } }),
      ev({ seq: 3, learnerId, type: 'RecoveryEntered', payload: { failureStateKey: 'confused', sessionFailureCount: 5 } }),
    ]
    const projection = foldAll(learnerId, contaminated).capability
    expect(projection.capabilities.multiply.status).toBe('SHAKY')
    expect(Object.keys(projection.capabilities)).toEqual(['multiply'])
  })
})
