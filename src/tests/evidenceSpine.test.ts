/**
 * EOS M1 — Evidence Spine tests: envelope/idempotency, writer (seq
 * assignment, gapless-per-learner, idempotent duplicates, conflict retry),
 * projections (capability/teaching/conversation/recovery skeletons),
 * replay (snapshot ≡ re-fold; prefix+tail ≡ all), versioning (unknown
 * type/version skipped, never guessed), and determinism (repeated and
 * order-normalized folds are byte-identical).
 */
import { describe, it, expect } from 'vitest'
import {
  idempotencyKey, CURRENT_SCHEMA_VERSION, SPINE_EVENT_TYPES,
  type NewSpineEvent, type SpineEventRecord, type SpineSource,
} from '@/lib/evidence-spine/types'
import { foldAll, foldEvents, foldEvent, initialStudentView } from '@/lib/evidence-spine/fold'
import { verifySnapshot, foldTail } from '@/lib/evidence-spine/replay'
import { appendSpineEvents, type SpineStore, type SpineInsertRow } from '@/lib/evidence-spine/writer'
import { buildTurnEvents, type TurnFacts } from '@/lib/evidence-spine/turnEmitter'

const SRC: SpineSource = { componentId: 'test', version: 1 }

let seqCounter = 0
function rec(type: string, payload: unknown, over: Partial<SpineEventRecord> = {}): SpineEventRecord {
  seqCounter += 1
  return {
    eventId: `e${seqCounter}`, seq: seqCounter, learnerId: 'L1', sessionId: 'S1',
    turnId: `t${seqCounter}`, type, schemaVersion: 1, payload, source: SRC, confidence: 1,
    ...over,
  }
}

// ── Envelope / idempotency ────────────────────────────────────────────────────

describe('envelope & idempotency keys', () => {
  it('is deterministic and discriminates by type/turn/discriminator', () => {
    const base: NewSpineEvent = { learnerId: 'L1', sessionId: 'S1', turnId: 'T1', type: 'AnswerObserved', payload: { correct: true, statedConfidence: null, confusion: false, conceptId: null, capabilityRefs: [], diagnostic: false }, source: SRC }
    expect(idempotencyKey(base)).toBe(idempotencyKey({ ...base }))
    expect(idempotencyKey(base)).not.toBe(idempotencyKey({ ...base, turnId: 'T2' }))
    expect(idempotencyKey(base)).not.toBe(idempotencyKey({ ...base, type: 'StudentMessageReceived' as const, payload: { length: 1, latencyFromPrevTurnMs: null } }))
    expect(idempotencyKey(base)).not.toBe(idempotencyKey({ ...base, discriminator: 'x' }))
  })

  it('every catalog type declares a current schema version', () => {
    for (const t of SPINE_EVENT_TYPES) expect(CURRENT_SCHEMA_VERSION[t]).toBeGreaterThanOrEqual(1)
  })
})

// ── Writer: in-memory fake store ─────────────────────────────────────────────

function fakeStore() {
  const rows: SpineInsertRow[] = []
  const keys = new Set<string>()
  const seqs = new Set<string>()
  let injectSeqConflicts = 0
  const store: SpineStore = {
    async maxSeq(learnerId) {
      return rows.filter((r) => r.learnerId === learnerId).reduce((m, r) => Math.max(m, r.seq), 0)
    },
    async insert(row) {
      if (injectSeqConflicts > 0) { injectSeqConflicts -= 1; return 'seq_conflict' }
      if (keys.has(row.idempotencyKey)) return 'idempotent_duplicate'
      const seqKey = `${row.learnerId}:${row.seq}`
      if (seqs.has(seqKey)) return 'seq_conflict'
      keys.add(row.idempotencyKey); seqs.add(seqKey); rows.push({ ...row })
      return 'ok'
    },
  }
  return { store, rows, injectConflicts: (n: number) => { injectSeqConflicts = n } }
}

function newEvt(over: Partial<NewSpineEvent> = {}): NewSpineEvent {
  return { learnerId: 'L1', sessionId: 'S1', turnId: over.turnId ?? 'T1', type: 'StudentMessageReceived', payload: { length: 5, latencyFromPrevTurnMs: null }, source: SRC, ...over }
}

describe('writer', () => {
  it('assigns gapless ascending seq per learner', async () => {
    const { store, rows } = fakeStore()
    await appendSpineEvents(store, [newEvt({ turnId: 'T1' }), newEvt({ turnId: 'T1', type: 'AssistantRendered', payload: { length: 9, askedQuestion: false, provider: 'llm' } })])
    await appendSpineEvents(store, [newEvt({ turnId: 'T2' })])
    expect(rows.map((r) => r.seq)).toEqual([1, 2, 3])
  })

  it('duplicate idempotency keys are silent no-ops that consume no seq', async () => {
    const { store, rows } = fakeStore()
    await appendSpineEvents(store, [newEvt({ turnId: 'T1' })])
    const inserted = await appendSpineEvents(store, [newEvt({ turnId: 'T1' }), newEvt({ turnId: 'T2' })])
    expect(inserted).toBe(1)
    expect(rows.map((r) => r.seq)).toEqual([1, 2]) // no gap from the duplicate
  })

  it('seq conflicts retry with a fresh maxSeq read', async () => {
    const { store, rows, injectConflicts } = fakeStore()
    injectConflicts(2)
    const inserted = await appendSpineEvents(store, [newEvt({ turnId: 'T9' })])
    expect(inserted).toBe(1)
    expect(rows).toHaveLength(1)
  })

  it('never throws into the caller', async () => {
    const broken: SpineStore = { maxSeq: async () => { throw new Error('db down') }, insert: async () => 'ok' }
    await expect(appendSpineEvents(broken, [newEvt()])).resolves.toBe(0)
  })
})

// ── Projections ───────────────────────────────────────────────────────────────

describe('projections', () => {
  it('conversation skeleton tracks asks/gives and failure streaks', () => {
    seqCounter = 0
    const v = foldAll('L1', [
      rec('StudentMessageReceived', { length: 4, latencyFromPrevTurnMs: null }),
      rec('AssistantRendered', { length: 50, askedQuestion: true, provider: 'llm' }),
      rec('AnswerObserved', { correct: false, statedConfidence: 'low', confusion: true, conceptId: 'c1', capabilityRefs: [], diagnostic: false }),
      rec('AssistantRendered', { length: 80, askedQuestion: false, provider: 'llm' }),
      rec('AnswerObserved', { correct: true, statedConfidence: 'high', confusion: false, conceptId: 'c1', capabilityRefs: [], diagnostic: false }),
    ])
    expect(v.conversation.turns).toBe(1)
    expect(v.conversation.questionsAskedSinceGive).toBe(0) // give reset it
    expect(v.conversation.givesSinceQuestion).toBe(1)
    expect(v.conversation.consecutiveFailures).toBe(0)     // success reset the streak
    expect(v.answers).toEqual({ total: 2, correct: 1, incorrect: 1, unsignaled: 0 })
  })

  it('recovery skeleton tracks entries/exits and session boundary resets', () => {
    seqCounter = 0
    const v = foldAll('L1', [
      rec('RecoveryEntered', { failureStateKey: 'dont_know', escalationRung: 0, sessionFailureCount: 1 }),
      rec('RecoveryExited', { failureStateKey: 'dont_know', turnsInRecovery: 1 }),
      rec('RecoveryEntered', { failureStateKey: 'confused', escalationRung: 1, sessionFailureCount: 2 }),
      rec('SessionBoundaryDetected', { gapMs: 3600000, boundaryType: 'inactivity' }),
    ])
    expect(v.recovery.entries).toBe(2)
    expect(v.recovery.exits).toBe(1)
    expect(v.recovery.byState).toEqual({ dont_know: 1, confused: 1 })
    expect(v.recovery.active).toBe(false)            // boundary reset
    expect(v.recovery.sessionFailureCount).toBe(0)   // boundary reset
  })

  it('teaching skeleton tracks phase transitions', () => {
    seqCounter = 0
    const v = foldAll('L1', [
      rec('PhaseTransitioned', { machine: 'conversation', from: 'OBSERVE', to: 'DEMONSTRATE', direction: 'up' }),
      rec('PhaseTransitioned', { machine: 'conversation', from: 'DEMONSTRATE', to: 'OBSERVE', direction: 'down' }),
      rec('DecisionRecorded', { move: 'show', phase: 'OBSERVE', recoveryPreempted: false, workedExampleFirst: true, stageCeiling: 2, provenance: ['turn-directive'] }),
    ])
    expect(v.teaching.transitionsUp).toBe(1)
    expect(v.teaching.transitionsDown).toBe(1)
    expect(v.teaching.phase).toBe('OBSERVE')
    expect(v.conversation.lastMove).toBe('show')
    expect(v.decisions).toBe(1)
  })

  it('capability skeleton: stated_no is trusted instantly and cheaply overturned; RELIABLE needs 2 successes incl. a diagnostic', () => {
    seqCounter = 0
    let v = foldAll('L1', [rec('CapabilityObserved', { capabilityId: 'multiply', direction: 'stated_no', diagnostic: false })])
    expect(v.capability.capabilities.multiply.status).toBe('STATED_NO')
    v = foldEvents(v, [rec('CapabilityObserved', { capabilityId: 'multiply', direction: 'success', diagnostic: false })])
    expect(v.capability.capabilities.multiply.status).toBe('SHAKY')
    v = foldEvents(v, [rec('CapabilityObserved', { capabilityId: 'multiply', direction: 'success', diagnostic: true })])
    expect(v.capability.capabilities.multiply.status).toBe('RELIABLE')
  })

  it('capability skeleton: failures demote one level at a time, never below the lattice', () => {
    seqCounter = 0
    let v = initialStudentView('L1')
    v = foldEvents(v, [
      rec('CapabilityObserved', { capabilityId: 'divide', direction: 'success', diagnostic: true }),
      rec('CapabilityObserved', { capabilityId: 'divide', direction: 'success', diagnostic: true }),
    ])
    expect(v.capability.capabilities.divide.status).toBe('RELIABLE')
    v = foldEvents(v, [
      rec('CapabilityObserved', { capabilityId: 'divide', direction: 'failure', diagnostic: true }),
      rec('CapabilityObserved', { capabilityId: 'divide', direction: 'failure', diagnostic: true }),
    ])
    expect(v.capability.capabilities.divide.status).toBe('SHAKY') // one level, not OBSERVED_NO
  })
})

// ── Versioning ────────────────────────────────────────────────────────────────

describe('event versioning', () => {
  it('unknown event types are skipped and counted, never guessed', () => {
    seqCounter = 0
    const v = foldAll('L1', [rec('FutureEventNobodyKnows', { whatever: 1 })])
    expect(v.eventsSkipped).toBe(1)
    expect(v.eventsFolded).toBe(0)
  })
  it('unknown schema versions of known types are skipped', () => {
    seqCounter = 0
    const v = foldAll('L1', [rec('AnswerObserved', { correct: true }, { schemaVersion: 99 })])
    expect(v.eventsSkipped).toBe(1)
    expect(v.answers.total).toBe(0)
  })
})

// ── Replay & determinism ──────────────────────────────────────────────────────

function sampleLog(): SpineEventRecord[] {
  seqCounter = 0
  return [
    rec('SessionBoundaryDetected', { gapMs: null, boundaryType: 'unknown' }),
    rec('StudentMessageReceived', { length: 12, latencyFromPrevTurnMs: null }),
    rec('DecisionRecorded', { move: 'ask', phase: 'OBSERVE', recoveryPreempted: false, workedExampleFirst: false, stageCeiling: 2, provenance: ['turn-directive'] }),
    rec('AssistantRendered', { length: 100, askedQuestion: true, provider: 'llm' }),
    rec('AnswerObserved', { correct: false, statedConfidence: 'low', confusion: true, conceptId: 'phys.meas.units', capabilityRefs: [], diagnostic: false }),
    rec('UtteranceStateDetected', { failureStateKey: 'dont_know', strength: 'mild' }),
    rec('RecoveryEntered', { failureStateKey: 'dont_know', escalationRung: 0, sessionFailureCount: 1 }),
    rec('AssistantRendered', { length: 60, askedQuestion: false, provider: 'llm' }),
    rec('RecoveryExited', { failureStateKey: 'dont_know', turnsInRecovery: 1 }),
    rec('PhaseTransitioned', { machine: 'conversation', from: 'OBSERVE', to: 'DEMONSTRATE', direction: 'up' }),
    rec('CapabilityObserved', { capabilityId: 'compare', direction: 'success', diagnostic: true }),
    rec('LessonCompleted', { conceptId: 'phys.meas.units', certification: 'signal' }),
  ]
}

describe('replay & determinism', () => {
  it('snapshot ≡ re-fold (verifySnapshot passes on an honest snapshot)', () => {
    const log = sampleLog()
    const snapshot = foldAll('L1', log)
    expect(verifySnapshot(snapshot, log)).toBeNull()
  })

  it('verifySnapshot catches a corrupted snapshot', () => {
    const log = sampleLog()
    const snapshot = foldAll('L1', log)
    const corrupted = { ...snapshot, decisions: snapshot.decisions + 1 }
    expect(verifySnapshot(corrupted, log)).not.toBeNull()
  })

  it('prefix fold + tail fold ≡ full fold (incremental law)', () => {
    const log = sampleLog()
    for (const cut of [1, 4, 7, 11]) {
      const prefix = foldAll('L1', log.slice(0, cut))
      const resumed = foldTail(prefix, log)
      expect(resumed).toEqual(foldAll('L1', log))
    }
  })

  it('folding is deterministic across repeated runs (byte-identical)', () => {
    const log = sampleLog()
    const a = JSON.stringify(foldAll('L1', log))
    const b = JSON.stringify(foldAll('L1', log))
    expect(a).toBe(b)
  })

  it('input order does not matter — seq order governs', () => {
    const log = sampleLog()
    const shuffled = [...log].reverse()
    expect(foldAll('L1', shuffled)).toEqual(foldAll('L1', log))
  })

  it('foldEvent never mutates its input (purity)', () => {
    const log = sampleLog()
    const v0 = initialStudentView('L1')
    const frozen = JSON.stringify(v0)
    foldEvent(v0, log[0])
    expect(JSON.stringify(v0)).toBe(frozen)
  })
})

// ── Turn emitter ──────────────────────────────────────────────────────────────

function facts(over: Partial<TurnFacts> = {}): TurnFacts {
  return {
    learnerId: 'L1', sessionId: 'S1', turnId: 'T1',
    messageLength: 10, latencyFromPrevTurnMs: 1200,
    assistantLength: 90, assistantAskedQuestion: true, provider: 'llm',
    signal: null, resolvedConceptId: null,
    recoveryKey: null, recoveryEscalationRung: 0, sessionFailureCount: 0,
    autonomyRequested: false,
    decisionMove: 'ask', decisionPhaseBefore: 'OBSERVE', decisionPhaseAfter: 'OBSERVE',
    workedExampleFirst: false, stageCeiling: 2, provenance: ['turn-directive'],
    freshSessionBoundary: false, boundaryGapMs: null, lessonCompleted: false,
    ...over,
  }
}

describe('turn emitter', () => {
  it('a plain turn emits message + decision + render, in that order', () => {
    const events = buildTurnEvents(facts())
    expect(events.map((e) => e.type)).toEqual(['StudentMessageReceived', 'DecisionRecorded', 'AssistantRendered'])
  })

  it('a recovery turn adds utterance + recovery-entered; a phase change adds a transition', () => {
    const events = buildTurnEvents(facts({
      recoveryKey: 'dont_know', sessionFailureCount: 2, recoveryEscalationRung: 1,
      decisionPhaseBefore: 'DEMONSTRATE', decisionPhaseAfter: 'OBSERVE',
      signal: { correctness: false, confidence: 'low', confusion: true },
    }))
    const types = events.map((e) => e.type)
    expect(types).toContain('UtteranceStateDetected')
    expect(types).toContain('RecoveryEntered')
    expect(types).toContain('AnswerObserved')
    const pt = events.find((e) => e.type === 'PhaseTransitioned')!.payload as { direction: string }
    expect(pt.direction).toBe('down')
  })

  it('emitted events are re-foldable and idempotency-keyed uniquely within the turn', () => {
    const events = buildTurnEvents(facts({ recoveryKey: 'confused', freshSessionBoundary: true, lessonCompleted: true }))
    const keys = events.map((e) => idempotencyKey(e))
    expect(new Set(keys).size).toBe(keys.length)
    seqCounter = 0
    const asRecords = events.map((e) => rec(e.type, e.payload))
    const v = foldAll('L1', asRecords)
    expect(v.eventsSkipped).toBe(0)
    expect(v.recovery.entries).toBe(1)
  })

  it('carries no verbatim text in any payload (privacy)', () => {
    const events = buildTurnEvents(facts({ recoveryKey: 'dont_know', signal: { correctness: false } }))
    const serialized = JSON.stringify(events.map((e) => e.payload))
    expect(serialized).not.toMatch(/content|verbatim|text"/)
  })
})
