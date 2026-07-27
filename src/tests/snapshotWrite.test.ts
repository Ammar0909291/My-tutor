/**
 * ISS-13 (masterplan P0) — conditional snapshot write with one retry.
 *
 * Driven against a fake DB rather than Postgres, so the concurrency cases
 * that matter — another turn committing in the window between read and write
 * — are reproducible rather than timing-dependent.
 */
import { describe, it, expect } from 'vitest'
import {
  writeSnapshotDelta, readSnapshotVersion, SNAPSHOT_VERSION_KEY,
  type SnapshotDb,
} from '@/lib/db/snapshotWrite'

/**
 * A LearnSession row with the same semantics the real UPDATE has: the merge
 * applies only when the stored version equals the expected one, and the merge
 * itself is a shallow jsonb concatenation.
 */
function fakeDb(initial: Record<string, unknown> | null) {
  const state = { snapshot: initial as Record<string, unknown> | null }
  const calls: Array<{ expected: number; applied: boolean }> = []
  const db: SnapshotDb = {
    async $executeRawUnsafe(_query: string, ...values: unknown[]) {
      const [payload, , expected] = values as [string, string, number]
      const current = readSnapshotVersion(state.snapshot)
      const ok = current === expected
      calls.push({ expected, applied: ok })
      if (!ok) return 0
      state.snapshot = { ...(state.snapshot ?? {}), ...JSON.parse(payload) }
      return 1
    },
    learnSession: {
      async findUnique() {
        return state.snapshot === null && initial === null
          ? { contextSnapshot: null }
          : { contextSnapshot: state.snapshot }
      },
    },
  }
  return { db, state, calls }
}

describe('the happy path is unchanged', () => {
  it('applies the delta and stamps version 1 on a legacy (unversioned) row', () => {
    // A row written before ISS-13 has no version key; readSnapshotVersion
    // reports 0 for it, so the first conditional write must succeed rather
    // than deadlock forever against a version that will never appear.
    const { db, state } = fakeDb({ conversationState: { phase: 'OBSERVE' } })
    return writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 0, delta: { sessionFailureCount: 1 },
    }).then((r) => {
      expect(r).toMatchObject({ applied: true, conflicted: false, version: 1 })
      expect(state.snapshot).toMatchObject({
        conversationState: { phase: 'OBSERVE' },   // untouched keys survive
        sessionFailureCount: 1,
        [SNAPSHOT_VERSION_KEY]: 1,
      })
    })
  })

  it('applies to a NULL snapshot (a session with no prior turn)', async () => {
    const { db, state } = fakeDb(null)
    const r = await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 0, delta: { lastSignal: { correctness: true } },
    })
    expect(r.applied).toBe(true)
    expect(state.snapshot).toMatchObject({ [SNAPSHOT_VERSION_KEY]: 1 })
  })

  it('stamps the version inside the SAME merge as the delta', async () => {
    // A separate UPDATE for the version would itself be losable, leaving a
    // row whose data moved but whose version did not.
    const { db, calls } = fakeDb({})
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: { a: 1 } })
    expect(calls).toHaveLength(1)
  })

  it('binds every value as a parameter — the query string carries no data', async () => {
    // The justification for $executeRawUnsafe: it is only "unsafe" if data
    // reaches the query TEXT. Asserted, not assumed.
    let seenQuery = ''
    let seenValues: unknown[] = []
    const db: SnapshotDb = {
      async $executeRawUnsafe(q: string, ...v: unknown[]) { seenQuery = q; seenValues = v; return 1 },
      learnSession: { async findUnique() { return null } },
    }
    await writeSnapshotDelta(db, {
      sessionId: "s'; DROP TABLE x; --", expectedVersion: 7,
      delta: { evil: "'); DROP TABLE y; --" },
    })
    expect(seenQuery).not.toContain('DROP TABLE')
    expect(seenQuery).toContain('$1')
    expect(seenValues[1]).toBe("s'; DROP TABLE x; --")
    expect(seenValues[2]).toBe(7)
  })
})

describe('the lost update this exists to prevent', () => {
  it('detects a concurrent commit and retries ONCE against the real state', async () => {
    const { db, state, calls } = fakeDb({ sessionFailureCount: 5, [SNAPSHOT_VERSION_KEY]: 3 })
    // This turn read version 3 … but another turn committed first, taking the
    // row to version 4 and the counter to 6.
    state.snapshot = { sessionFailureCount: 6, [SNAPSHOT_VERSION_KEY]: 4 }

    const r = await writeSnapshotDelta(db, {
      sessionId: 's1',
      expectedVersion: 3,
      delta: { sessionFailureCount: 6 },              // 5 + 1, derived from a base that is gone
      rederive: (fresh) => ({
        sessionFailureCount: (fresh.sessionFailureCount as number) + 1,
      }),
    })

    expect(r).toMatchObject({ applied: true, conflicted: true, version: 5 })
    // THE POINT: 7, not 6. The other turn's increment survived ours.
    expect(state.snapshot.sessionFailureCount).toBe(7)
    expect(calls.map((c) => c.applied)).toEqual([false, true])
  })

  it('re-derives every registered field, not just the first', async () => {
    const { db, state } = fakeDb({ a: 1, b: 10, [SNAPSHOT_VERSION_KEY]: 2 })
    state.snapshot = { a: 2, b: 20, [SNAPSHOT_VERSION_KEY]: 3 }
    await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 2, delta: { a: 2, b: 11, c: 'state' },
      rederive: (fresh) => ({
        a: (fresh.a as number) + 1,
        b: (fresh.b as number) + 1,
      }),
    })
    expect(state.snapshot).toMatchObject({ a: 3, b: 21, c: 'state' })
  })

  it('re-applies pure state-replacement deltas verbatim when no rederive is given', async () => {
    // Correct by construction: a field this turn REPLACES is newer than
    // whatever the concurrent turn wrote, so no re-derivation is needed.
    const { db, state } = fakeDb({ phase: 'OBSERVE', [SNAPSHOT_VERSION_KEY]: 1 })
    state.snapshot = { phase: 'DEMONSTRATE', [SNAPSHOT_VERSION_KEY]: 2 }
    const r = await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 1, delta: { phase: 'GUIDE' },
    })
    expect(r.applied).toBe(true)
    expect(state.snapshot.phase).toBe('GUIDE')
  })
})

describe('fail-soft — persistence never fails a turn', () => {
  it('gives up after exactly ONE retry rather than looping', async () => {
    // A DB that always reports a conflict: the caller must terminate.
    const db: SnapshotDb = {
      async $executeRawUnsafe() { return 0 },
      learnSession: { async findUnique() { return { contextSnapshot: { [SNAPSHOT_VERSION_KEY]: 99 } } } },
    }
    const r = await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 1, delta: { a: 1 } })
    expect(r).toMatchObject({ applied: false, conflicted: true, version: null })
  })

  it('reports a thrown DB error instead of rejecting', async () => {
    const db: SnapshotDb = {
      async $executeRawUnsafe() { throw new Error('connection reset') },
      learnSession: { async findUnique() { return null } },
    }
    const r = await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: {} })
    expect(r.applied).toBe(false)
    expect(r.error).toContain('connection reset')
  })

  it('handles the session disappearing mid-turn', async () => {
    const db: SnapshotDb = {
      async $executeRawUnsafe() { return 0 },
      learnSession: { async findUnique() { return null } },
    }
    const r = await writeSnapshotDelta(db, { sessionId: 'gone', expectedVersion: 0, delta: { a: 1 } })
    expect(r).toMatchObject({ applied: false, conflicted: true, version: null })
  })
})

describe('readSnapshotVersion is total', () => {
  it.each([null, undefined, 42, 'x', {}, { _v: -1 }, { _v: 'nope' }, { _v: NaN }])(
    'reads %j as 0', (raw) => {
      expect(readSnapshotVersion(raw)).toBe(0)
    })

  it('floors a fractional version rather than propagating it', () => {
    expect(readSnapshotVersion({ [SNAPSHOT_VERSION_KEY]: 3.7 })).toBe(3)
  })

  it('round-trips a real version', () => {
    expect(readSnapshotVersion({ [SNAPSHOT_VERSION_KEY]: 12 })).toBe(12)
  })
})

describe('replay — the write is deterministic in its inputs', () => {
  it('two identical writes from the same base produce the same snapshot', async () => {
    const run = async () => {
      const { db, state } = fakeDb({ n: 1, [SNAPSHOT_VERSION_KEY]: 4 })
      await writeSnapshotDelta(db, { sessionId: 's', expectedVersion: 4, delta: { n: 2 } })
      return JSON.stringify(state.snapshot)
    }
    expect(await run()).toBe(await run())
  })
})
