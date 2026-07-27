/**
 * Capability Model — durable cross-session memory.
 *
 * The session tier (contextSnapshot.capabilities) is per-LearnSession, so it
 * dies with the session. These tests cover the durable path that survives it:
 * emit CapabilityObserved → spine → fold → hydrate into the next session.
 *
 * The lattice is NOT retested here (capabilityModel.test.ts owns it). What is
 * tested is that evidence reaches the spine, replays deterministically, and
 * comes back intact.
 */

import { describe, it, expect } from 'vitest'
import { buildTurnEvents, type TurnFacts } from '@/lib/evidence-spine/turnEmitter'
import { idempotencyKey } from '@/lib/evidence-spine/types'
import { foldAll, initialStudentView } from '@/lib/evidence-spine/fold'
import type { SpineEventRecord } from '@/lib/evidence-spine/types'
import {
  hydrateFromProjection, statusOf, foldCapabilityState, observationsFromTurn,
  detectStatedInability, requiredCapabilities, capabilityLegality, noCapabilities,
  readCapabilityState, initialCapabilityState,
} from '@/lib/teaching/capabilityModel'

const facts = (over: Partial<TurnFacts> = {}): TurnFacts => ({
  learnerId: 'L1', sessionId: 'S1', turnId: 'T1',
  messageLength: 10, latencyFromPrevTurnMs: 1000,
  assistantLength: 50, assistantAskedQuestion: false, provider: 'groq',
  signal: { correctness: true }, resolvedConceptId: 'phys.mech.newtons-second-law',
  recoveryKey: null, recoveryEscalationRung: 0, sessionFailureCount: 0,
  autonomyRequested: false, decisionMove: 'teach', decisionPhaseBefore: 'GUIDE',
  decisionPhaseAfter: 'GUIDE', workedExampleFirst: false, stageCeiling: 4,
  provenance: [], freshSessionBoundary: false, boundaryGapMs: null,
  lessonCompleted: false, ...over,
})

/** Turn emitted events into stored rows, the way the writer would. */
const toRecords = (evs: ReturnType<typeof buildTurnEvents>): SpineEventRecord[] =>
  evs.map((e, i) => ({
    seq: i + 1, learnerId: e.learnerId, sessionId: e.sessionId ?? null,
    turnId: e.turnId ?? null, type: e.type, schemaVersion: 1,
    payload: e.payload, source: e.source, confidence: 1,
    idempotencyKey: idempotencyKey(e), createdAt: new Date(0),
  }) as unknown as SpineEventRecord)

// ── 1 · THE INERT PATH IS GONE ──────────────────────────────────────────────

describe('the emitter no longer discards capability evidence', () => {
  it('emits one CapabilityObserved per attributed observation', () => {
    const evs = buildTurnEvents(facts({
      capabilityObservations: [
        { capabilityId: 'multiply', direction: 'success', diagnostic: true },
        { capabilityId: 'divide', direction: 'success', diagnostic: false },
      ],
    }))
    const caps = evs.filter((e) => e.type === 'CapabilityObserved')
    expect(caps).toHaveLength(2)
    expect(caps[0].payload).toEqual({ capabilityId: 'multiply', direction: 'success', diagnostic: true })
  })

  it('populates capabilityRefs on AnswerObserved (was hardcoded [])', () => {
    const evs = buildTurnEvents(facts({
      capabilityObservations: [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }],
    }))
    const answer = evs.find((e) => e.type === 'AnswerObserved')!
    expect((answer.payload as { capabilityRefs: string[] }).capabilityRefs).toEqual(['multiply'])
    expect((answer.payload as { diagnostic: boolean }).diagnostic).toBe(true)
  })

  it('emits nothing capability-shaped when there are no observations', () => {
    const evs = buildTurnEvents(facts())
    expect(evs.filter((e) => e.type === 'CapabilityObserved')).toHaveLength(0)
    const answer = evs.find((e) => e.type === 'AnswerObserved')!
    expect((answer.payload as { capabilityRefs: string[] }).capabilityRefs).toEqual([])
  })

  it('BACKWARD COMPATIBLE: omitting the field entirely still builds a valid turn', () => {
    const f = facts()
    delete (f as Partial<TurnFacts>).capabilityObservations
    expect(() => buildTurnEvents(f)).not.toThrow()
    expect(buildTurnEvents(f).some((e) => e.type === 'DecisionRecorded')).toBe(true)
  })
})

// ── 2 · IDEMPOTENCY AND REPLAY DETERMINISM ──────────────────────────────────

describe('replay determinism', () => {
  it('several observations on one turn get DISTINCT idempotency keys', () => {
    const evs = buildTurnEvents(facts({
      capabilityObservations: [
        { capabilityId: 'multiply', direction: 'success', diagnostic: true },
        { capabilityId: 'divide', direction: 'success', diagnostic: true },
      ],
    })).filter((e) => e.type === 'CapabilityObserved')
    expect(idempotencyKey(evs[0])).not.toBe(idempotencyKey(evs[1]))
  })

  it('re-emitting the SAME turn produces identical keys — a replay is a no-op', () => {
    const mk = () => buildTurnEvents(facts({
      capabilityObservations: [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }],
    })).filter((e) => e.type === 'CapabilityObserved').map(idempotencyKey)
    expect(mk()).toEqual(mk())
  })

  it('folding the same log twice yields identical capability state', () => {
    const rows = toRecords(buildTurnEvents(facts({
      capabilityObservations: [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }],
    })))
    expect(foldAll('L1', rows).capability).toEqual(foldAll('L1', rows).capability)
  })

  it('event ORDER is stable, so replay is order-deterministic', () => {
    const build = () => buildTurnEvents(facts({
      capabilityObservations: [
        { capabilityId: 'multiply', direction: 'success', diagnostic: true },
        { capabilityId: 'divide', direction: 'failure', diagnostic: true },
      ],
    })).map((e) => e.type)
    expect(build()).toEqual(build())
  })
})

// ── 3 · HYDRATION ───────────────────────────────────────────────────────────

describe('hydrateFromProjection', () => {
  it('copies the spine projection into the session tier verbatim', () => {
    const view = foldAll('L1', toRecords(buildTurnEvents(facts({
      capabilityObservations: [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }],
    }))))
    const state = hydrateFromProjection(view.capability)
    expect(statusOf(state, 'multiply')).toBe('SHAKY')
    expect(state.multiply.succ).toBe(1)
  })

  it('is a COPY, not a second fold — status is never re-derived', () => {
    // If hydration re-folded, a RELIABLE projection would be demoted/advanced.
    const projection = { capabilities: { multiply: { status: 'RELIABLE' as const, succ: 9, fail: 0, diagnosticSucc: 4 } } }
    expect(hydrateFromProjection(projection).multiply).toEqual({
      status: 'RELIABLE', succ: 9, fail: 0, diagnosticSucc: 4,
    })
  })

  it('drops ids outside the versioned vocabulary', () => {
    expect(hydrateFromProjection({ capabilities: { telekinesis: { status: 'RELIABLE', succ: 1, fail: 0, diagnosticSucc: 1 } } as never }))
      .toEqual({})
  })

  it('is total — null, undefined and empty all give an empty state', () => {
    expect(hydrateFromProjection(null)).toEqual({})
    expect(hydrateFromProjection(undefined)).toEqual({})
    expect(hydrateFromProjection({ capabilities: {} })).toEqual({})
  })

  it('an empty hydration blocks nothing (fail-open)', () => {
    const state = hydrateFromProjection(null)
    expect(capabilityLegality(state, requiredCapabilities('phys.mech.newtons-second-law')).legal).toBe(true)
    expect(noCapabilities(state)).toEqual([])
  })
})

// ── 4 · BEHAVIORAL REPLAY — MEMORY SURVIVES A NEW SESSION ───────────────────

describe('behavioral replay — capability memory survives a new session', () => {
  it('a division failure in session 1 still blocks the lesson in session 2', () => {
    // ── SESSION 1 ── the learner fails a division-only item.
    const s1Required = ['divide'] as const
    const s1Obs = observationsFromTurn({ requiredCapabilities: s1Required, correct: false })
    expect(s1Obs).toHaveLength(1)

    let sessionTier = foldCapabilityState(undefined, s1Obs)
    expect(statusOf(sessionTier, 'divide')).toBe('OBSERVED_NO')

    // The same observations go to the spine.
    const spineRows = toRecords(buildTurnEvents(facts({
      sessionId: 'S1', capabilityObservations: s1Obs, signal: { correctness: false },
    })))
    expect(spineRows.some((r) => r.type === 'CapabilityObserved')).toBe(true)

    // ── SESSION ENDS ── the session tier dies with the LearnSession.
    sessionTier = readCapabilityState(undefined)
    expect(sessionTier).toEqual(initialCapabilityState())
    // Before this milestone the story ended here: session 2 started blind.

    // ── SESSION 2 ── cold cache → hydrate from the durable spine.
    const view = foldAll('L1', spineRows)
    const session2 = hydrateFromProjection(view.capability)
    expect(statusOf(session2, 'divide')).toBe('OBSERVED_NO')

    // …and the memory does real work: the lesson is still illegal.
    const required = requiredCapabilities('phys.mech.newtons-second-law')
    expect(required).toContain('divide')
    const verdict = capabilityLegality(session2, required)
    expect(verdict.legal).toBe(false)
    expect(verdict.blocking.map((b) => b.id)).toContain('divide')
    // V-CAP is armed in the new session too.
    expect(noCapabilities(session2)).toContain('divide')
  })

  it('a stated inability in session 1 is durable in session 2', () => {
    const stated = detectStatedInability("I can't do division")
    const obs = stated.map((capabilityId) => ({ capabilityId, direction: 'stated_no' as const, diagnostic: true }))
    const rows = toRecords(buildTurnEvents(facts({ sessionId: 'S1', capabilityObservations: obs })))
    const session2 = hydrateFromProjection(foldAll('L1', rows).capability)
    expect(statusOf(session2, 'divide')).toBe('STATED_NO')
  })

  it('and it remains the cheapest state to overturn — one success in session 2', () => {
    const obs = [{ capabilityId: 'divide', direction: 'stated_no' as const, diagnostic: true }]
    const rows = toRecords(buildTurnEvents(facts({ capabilityObservations: obs })))
    let session2 = hydrateFromProjection(foldAll('L1', rows).capability)
    session2 = foldCapabilityState(session2, [{ capabilityId: 'divide', direction: 'success', diagnostic: true }])
    expect(statusOf(session2, 'divide')).toBe('SHAKY')
    expect(capabilityLegality(session2, ['divide']).legal).toBe(true)
  })

  it('accumulates ACROSS sessions: two sessions of evidence promote to RELIABLE', () => {
    const one = { capabilityId: 'multiply', direction: 'success' as const, diagnostic: true }
    const s1 = buildTurnEvents(facts({ sessionId: 'S1', turnId: 'T1', capabilityObservations: [one] }))
    const s2 = buildTurnEvents(facts({ sessionId: 'S2', turnId: 'T2', capabilityObservations: [one] }))
    const view = foldAll('L1', toRecords([...s1, ...s2]))
    expect(hydrateFromProjection(view.capability).multiply.status).toBe('RELIABLE')
  })

  it('CROSS-SUBJECT: a physics failure blocks a chemistry lesson in a later session', () => {
    const obs = observationsFromTurn({ requiredCapabilities: ['multiply'], correct: false })
    const rows = toRecords(buildTurnEvents(facts({
      sessionId: 'S1', resolvedConceptId: 'phys.mech.newtons-second-law',
      capabilityObservations: obs, signal: { correctness: false },
    })))
    const later = hydrateFromProjection(foldAll('L1', rows).capability)
    // A different subject entirely, a different session, no shared code path.
    expect(capabilityLegality(later, requiredCapabilities('chem.sol.solubility')).legal).toBe(false)
  })
})

// ── 5 · PERSISTENCE REGRESSION ──────────────────────────────────────────────

describe('persistence regression', () => {
  it('the spine fold and the session fold agree — the two tiers cannot diverge', () => {
    const obs = [
      { capabilityId: 'multiply', direction: 'success' as const, diagnostic: true },
      { capabilityId: 'multiply', direction: 'success' as const, diagnostic: true },
    ]
    // Session tier: fold the observations directly.
    const sessionTier = foldCapabilityState(undefined, obs)
    // Durable tier: same observations through emitter → spine → fold → hydrate.
    const rows = toRecords([
      ...buildTurnEvents(facts({ turnId: 'T1', capabilityObservations: [obs[0]] })),
      ...buildTurnEvents(facts({ turnId: 'T2', capabilityObservations: [obs[1]] })),
    ])
    const durable = hydrateFromProjection(foldAll('L1', rows).capability)
    expect(durable.multiply.status).toBe(sessionTier.multiply.status)
    expect(durable.multiply.succ).toBe(sessionTier.multiply.succ)
  })

  it('an unknown event type in the log never corrupts capability state', () => {
    const rows = toRecords(buildTurnEvents(facts({
      capabilityObservations: [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }],
    })))
    const withJunk = [...rows, { ...rows[0], seq: 99, type: 'FutureEventType', payload: {} } as unknown as SpineEventRecord]
    expect(hydrateFromProjection(foldAll('L1', withJunk).capability).multiply.status).toBe('SHAKY')
  })

  it('an empty log yields an empty, harmless state', () => {
    expect(hydrateFromProjection(initialStudentView('L1').capability)).toEqual({})
  })
})
