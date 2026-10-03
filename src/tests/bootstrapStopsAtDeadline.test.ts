/**
 * The cold-start bootstrap starts no database step after its boot deadline
 * (2026-10-03).
 *
 * MEASURED 2026-10-02: the bootstrap passed its 12 s deadline, then began its
 * completeness probe (a batch `$transaction`) in the background. The request
 * returned, the instance froze mid-transaction, and the connection sat "idle in
 * transaction" until Postgres's 60 s limit killed it at 23:55:41 UTC.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { stopAfterDeadline, runWithDeadline, WorkAbandonedError } from '@/lib/db/stopAfterDeadline'

function fakeClient() {
  const calls: string[] = []
  const client = {
    assetIdentity: {
      count: (a: unknown) => { calls.push('assetIdentity.count'); return Promise.resolve(3) },
      findMany: () => { calls.push('assetIdentity.findMany'); return Promise.resolve([]) },
    },
    explanationAsset: { createMany: () => { calls.push('explanationAsset.createMany'); return Promise.resolve({ count: 1 }) } },
    $transaction: (ops: Promise<unknown>[]) => { calls.push('$transaction'); return Promise.all(ops) },
  }
  return { client, calls }
}

describe('stopAfterDeadline', () => {
  it('passes every call through while the run is live', async () => {
    const { client, calls } = fakeClient()
    const run = { abandoned: false, flushing: false }
    const db = stopAfterDeadline(client, run)
    await expect(db.$transaction([db.assetIdentity.count({}), db.assetIdentity.count({})])).resolves.toEqual([3, 3])
    expect(calls).toEqual(['assetIdentity.count', 'assetIdentity.count', '$transaction'])
  })

  it('starts nothing once abandoned — not a model call, not a transaction', async () => {
    const { client, calls } = fakeClient()
    const run = { abandoned: true, flushing: false }
    const db = stopAfterDeadline(client, run)
    expect(() => db.assetIdentity.findMany()).toThrow(WorkAbandonedError)
    expect(() => db.$transaction([])).toThrow(WorkAbandonedError)
    expect(calls).toEqual([])
  })

  it('lets a write group that has started finish: no hollow identities', async () => {
    const { client, calls } = fakeClient()
    const run = { abandoned: true, flushing: true }
    const db = stopAfterDeadline(client, run)
    await db.explanationAsset.createMany()
    expect(calls).toEqual(['explanationAsset.createMany'])
  })
})

describe('the bootstrap is wired to it', () => {
  const SRC = readFileSync('src/instrumentation.ts', 'utf8')
  it('wraps its client, marks the run abandoned at the deadline, and waits a bounded time for the step in flight', () => {
    expect(SRC).toContain('stopAfterDeadline(appPrisma, run)')
    expect(SRC).toMatch(/runWithDeadline\(\s*\(run\) => bootstrapAssets\(run\)/)
    expect(SRC).toMatch(/ASSET_BOOTSTRAP_SETTLE_MS/)
  })
  it('marks the write phase as one group, so identity and content rows land together', () => {
    const flushStart = SRC.indexOf('run.flushing = true')
    expect(flushStart).toBeGreaterThan(0)
    expect(flushStart).toBeLessThan(SRC.indexOf("flush('identity insert'"))
  })
})

describe('runWithDeadline', () => {
  it('after the deadline no new DB step starts, and the step in flight is waited for', async () => {
    const { client, calls } = fakeClient()
    const slow = { ...client, assetIdentity: { ...client.assetIdentity,
      findMany: () => { calls.push('assetIdentity.findMany'); return new Promise((r) => setTimeout(() => r([]), 150)) } } }
    let deadlineAt = 0
    const startedAt: number[] = []
    const outcome = await runWithDeadline(async (run) => {
      const db = stopAfterDeadline(slow, run)
      // A loop of reads, as the bootstrap's phases are: it would run for ~1.5 s.
      for (let i = 0; i < 10; i++) { startedAt.push(Date.now()); await db.assetIdentity.findMany() }
    }, { deadlineMs: 200, settleMs: 1000, onDeadline: () => { deadlineAt = Date.now() } })
    expect(outcome).toBe('stopped')
    // The read in flight at the deadline finished; nothing started afterwards.
    expect(calls.length).toBeLessThanOrEqual(3)
    expect(startedAt.filter((t) => t > deadlineAt + 5).length).toBeLessThanOrEqual(1)
    const after = calls.length
    await new Promise((r) => setTimeout(r, 600))
    expect(calls.length).toBe(after)
  })

  it('reports a step that outlives even the settle window', async () => {
    const outcome = await runWithDeadline(() => new Promise((r) => setTimeout(r, 500)), { deadlineMs: 20, settleMs: 30 })
    expect(outcome).toBe('still-running')
  })

  it('finished inside the deadline', async () => {
    expect(await runWithDeadline(async () => {}, { deadlineMs: 50, settleMs: 50 })).toBe('finished')
  })
})
