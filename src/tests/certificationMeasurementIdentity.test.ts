/**
 * I-1, I-2, I-3, I-4 — the properties that make a certification result
 * attributable, isolated, and honest about contamination.
 *
 * These are the requirements Phase 0 found unbuilt. Each one exists because an
 * anonymous, shared-account, narrowly-checked run has already produced a wrong
 * conclusion in this project's history.
 */

import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import {
  HARNESS_VERSION,
  PROTOCOL_VERSION,
  classifyVerdict,
  detectDirtyState,
  isProtectedAccount,
  resolveWorkers,
} from '../../scripts/certification/measurementIdentity'
import {
  buildManifest,
  manifestHash,
  serialiseManifest,
} from '../../scripts/certification/buildManifest'

const ENTRY_PHASES = ['OBSERVE', 'DEMONSTRATE'] as const

const clean = { instrumentFailed: false, degradedTurns: 0, dirtyState: false, belowContract: false,
  unmeasuredReason: null as string | null, hardFailures: [] as string[], verified: true,
  lessonClosed: true, attempted: true }

describe('I-4 — verdict precedence: the product is blamed last', () => {
  it('certifies a clean, verified, closed lesson', () => {
    expect(classifyVerdict(clean)).toBe('CERTIFIED')
  })

  it('an instrument failure outranks everything, including a product failure', () => {
    expect(classifyVerdict({ ...clean, instrumentFailed: true, hardFailures: ['D2-ungradeable'],
      degradedTurns: 3, dirtyState: true })).toBe('FAILED_INSTRUMENT')
  })

  it('a degraded provider outranks a teaching verdict', () => {
    expect(classifyVerdict({ ...clean, degradedTurns: 1, verified: false,
      hardFailures: ['D3-unreachable'] })).toBe('FAILED_INFRASTRUCTURE')
  })

  it('dirty state is never certified and never a product failure', () => {
    expect(classifyVerdict({ ...clean, dirtyState: true })).toBe('DIRTY_STATE')
    expect(classifyVerdict({ ...clean, dirtyState: true, hardFailures: ['D4-not-verified'] }))
      .toBe('DIRTY_STATE')
  })

  it('a below-contract concept is content, not product', () => {
    expect(classifyVerdict({ ...clean, belowContract: true, verified: false,
      hardFailures: ['D3-unreachable', 'D4-not-verified'] })).toBe('FAILED_CONTENT')
  })

  it('an unanswerable probe is UNMEASURED, not a teaching failure', () => {
    expect(classifyVerdict({ ...clean, unmeasuredReason: 'no-authored-match', verified: false,
      hardFailures: ['D4-not-verified'] })).toBe('UNMEASURED')
  })

  it('blames the product only when nothing else explains the failure', () => {
    expect(classifyVerdict({ ...clean, verified: false, hardFailures: ['D2-ungradeable'] }))
      .toBe('FAILED_PRODUCT')
  })

  it('a concept that was never attempted is UNMEASURED, never absent', () => {
    expect(classifyVerdict({ ...clean, attempted: false, verified: false, lessonClosed: false }))
      .toBe('UNMEASURED')
  })

  it('carries a protocol and harness version for every row', () => {
    expect(PROTOCOL_VERSION).toBe('full-population-certification-v1')
    expect(HARNESS_VERSION).toMatch(/^\d+\.\d+\.\d+/)
  })
})

describe('I-2 — dirty-state detection, widened to production semantics', () => {
  it('a clean first turn is clean', () => {
    expect(detectDirtyState({ phase: 'OBSERVE', checkCorrect: 0, practiceCorrect: 0, verified: false },
      { expectedEntryPhases: ENTRY_PHASES })).toEqual({ dirty: false, reasons: [] })
  })

  it('detects verified mastery at turn 1', () => {
    expect(detectDirtyState({ verified: true }, { expectedEntryPhases: ENTRY_PHASES }).dirty).toBe(true)
  })

  it('detects prior CHECK progress', () => {
    const f = detectDirtyState({ checkCorrect: 1 }, { expectedEntryPhases: ENTRY_PHASES })
    expect(f.dirty).toBe(true)
    expect(f.reasons).toContain('checkCorrect=1-at-turn-1')
  })

  /**
   * THE GAP THE OLD PREDICATE MISSED. Mastery is checkCorrect >= 1 AND
   * practiceCorrect >= 2, so a session carrying practice credit with zero check
   * credit passed the old test while sitting one graded answer from a
   * fabricated pass.
   */
  it('detects prior PRACTICE progress even when check progress is zero', () => {
    const f = detectDirtyState({ checkCorrect: 0, practiceCorrect: 2 },
      { expectedEntryPhases: ENTRY_PHASES })
    expect(f.dirty).toBe(true)
    expect(f.reasons).toContain('practiceCorrect=2-at-turn-1')
  })

  it('detects a phase past the ladder entry', () => {
    const f = detectDirtyState({ phase: 'TRANSFER' }, { expectedEntryPhases: ENTRY_PHASES })
    expect(f.dirty).toBe(true)
    expect(f.reasons).toContain('phase=TRANSFER-not-an-entry-phase')
  })

  it('detects a resumed session', () => {
    expect(detectDirtyState({ phase: 'OBSERVE' },
      { expectedEntryPhases: ENTRY_PHASES, sessionResumed: true }).reasons)
      .toContain('session-resumed-not-fresh')
  })

  it('detects a lesson pointer that moved mid-run', () => {
    const f = detectDirtyState({ phase: 'OBSERVE' }, {
      expectedEntryPhases: ENTRY_PHASES,
      activeLessonSlugBefore: 'phys.mech.torque',
      activeLessonSlugAfter: 'phys.mech.friction',
    })
    expect(f.dirty).toBe(true)
    expect(f.reasons[0]).toMatch(/activeLessonSlug-moved/)
  })

  it('reports every reason rather than the first, so the evidence survives', () => {
    const f = detectDirtyState({ verified: true, checkCorrect: 1, practiceCorrect: 2, phase: 'TRANSFER' },
      { expectedEntryPhases: ENTRY_PHASES, sessionResumed: true })
    expect(f.reasons.length).toBe(5)
  })

  it('never offers a way to clean state and continue', () => {
    const src = readFileSync('scripts/certification/measurementIdentity.ts', 'utf-8')
    expect(src).not.toMatch(/function (clean|reset|clear)(Dirty|State|Session)/)
  })
})

describe('I-1 — isolation is per ACCOUNT, not per process', () => {
  const env = (n: number) => Object.fromEntries(
    Array.from({ length: n }, (_, i) => [
      [`CERT_WORKER_${i + 1}_EMAIL`, `qa${i + 1}@example.test`],
      [`CERT_WORKER_${i + 1}_PASSWORD`, 'pw'],
    ]).flat() as [string, string][],
  )

  it('resolves four distinct worker accounts', () => {
    const r = resolveWorkers(env(4), 4)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.workers.map((w) => w.workerId)).toEqual(['w1', 'w2', 'w3', 'w4'])
    expect(new Set(r.workers.map((w) => w.email)).size).toBe(4)
  })

  it('refuses when a worker has no credentials rather than sharing one', () => {
    const r = resolveWorkers(env(3), 4)
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/CERT_WORKER_4_EMAIL/)
  })

  it('refuses two workers on one account — the measured contamination', () => {
    const shared = { ...env(4), CERT_WORKER_2_EMAIL: 'qa1@example.test' }
    const r = resolveWorkers(shared, 4)
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/share one account/)
  })

  it('refuses the protected engineering account anywhere in the pool', () => {
    const bad = { ...env(4), CERT_WORKER_3_EMAIL: 'suaibamr@gmail.com' }
    const r = resolveWorkers(bad, 4)
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/protected account/)
    expect(isProtectedAccount('SUAIBAMR@GMAIL.COM')).toBe(true)
    expect(isProtectedAccount('explorewithpappu@gmail.com')).toBe(false)
  })

  describe('scoped, explicit test-account override for a protected email', () => {
    it('still refuses by default — the override is opt-in, not a policy change', () => {
      const bad = { ...env(4), CERT_WORKER_2_EMAIL: 'suaibamr@gmail.com' }
      const r = resolveWorkers(bad, 4)
      expect(r).toMatchObject({ ok: false })
      if (!r.ok) expect(r.error).toMatch(/protected account/)
    })

    it('accepts it ONLY when that exact worker slot is explicitly designated', () => {
      const designated = {
        ...env(4),
        CERT_WORKER_2_EMAIL: 'suaibamr@gmail.com',
        CERT_WORKER_2_DESIGNATED_TEST_ACCOUNT: 'true',
      }
      const r = resolveWorkers(designated, 4)
      expect(r.ok).toBe(true)
      if (r.ok) expect(r.workers.find((w) => w.workerId === 'w2')?.email).toBe('suaibamr@gmail.com')
    })

    it('a designation on the WRONG worker slot does not leak protection to another slot', () => {
      const wrongSlot = {
        ...env(4),
        CERT_WORKER_2_EMAIL: 'suaibamr@gmail.com',
        // Designation flag set on worker 3, not worker 2 — must not help worker 2.
        CERT_WORKER_3_DESIGNATED_TEST_ACCOUNT: 'true',
      }
      const r = resolveWorkers(wrongSlot, 4)
      expect(r).toMatchObject({ ok: false })
      if (!r.ok) expect(r.error).toMatch(/protected account/)
    })

    it('a falsy or malformed designation value is still refused', () => {
      for (const value of ['false', 'yes', '1', 'TRUE_', '']) {
        const r = resolveWorkers(
          { ...env(4), CERT_WORKER_2_EMAIL: 'suaibamr@gmail.com', CERT_WORKER_2_DESIGNATED_TEST_ACCOUNT: value },
          4,
        )
        expect(r).toMatchObject({ ok: false })
      }
    })

    it('leaves isProtectedAccount and PROTECTED_ACCOUNTS themselves untouched', () => {
      // The override lives entirely in resolveWorkers' own credential path —
      // it must not weaken the general predicate every other caller relies on
      // (e.g. scripts/math/certify.ts's own, independent FORBIDDEN_ACCOUNTS check).
      expect(isProtectedAccount('suaibamr@gmail.com')).toBe(true)
    })
  })
})

describe('I-3 — the manifest is reproducible and complete', () => {
  const { rows, audit } = buildManifest()

  it('is exactly the 424-concept Tier A population', () => {
    expect(rows.length).toBe(424)
    expect(rows.filter((r) => r.subject === 'physics').length).toBe(238)
    expect(rows.filter((r) => r.subject === 'chemistry').length).toBe(186)
  })

  it('has no duplicate, no omission and no foreign id', () => {
    for (const a of audit) {
      expect(a.duplicates).toBe(0)
      expect(a.missingFromManifest).toEqual([])
      expect(a.foreignIds).toEqual([])
      expect(a.rows).toBe(a.kgConcepts)
      expect(a.orderContiguous).toBe(true)
    }
  })

  it('is byte-identical on a second build — the reproducibility claim', () => {
    expect(manifestHash(rows)).toBe(manifestHash(buildManifest().rows))
  })

  it('matches the persisted artifact, so the recorded hash is the one Tier A reads', () => {
    const onDisk = readFileSync('scripts/certification/tierA-manifest.json', 'utf-8')
    expect(onDisk).toBe(serialiseManifest(rows))
    expect(manifestHash(rows))
      .toBe('571dbcdcf906bf9dd8bef0fbacf81d6236ddfc2bdc87457eb23d410e1162278b')
  })
})
