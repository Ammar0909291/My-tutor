/**
 * SUBJECT-AWARE WORKER RESOLUTION — a run must require exactly the workers it
 * will authenticate, and nothing else.
 *
 * THE DEFECT THIS PINS (measured, Chemistry Tier-A batch 1). `runTierA.ts`
 * called `resolveWorkers(process.env, 4)` while Tier A partitions its workers
 * by subject — physics -> w1,w3 and chemistry -> w2,w4. A chemistry run
 * therefore refused to start unless w1 and w3 also carried credentials, even
 * though it never authenticates either of them.
 *
 * A count could not express the fix. Chemistry needs the NON-CONTIGUOUS set
 * {2,4}: `wanted: 4` demands two workers it never uses, and `wanted: 2` demands
 * w1 (the wrong worker) while omitting w4 (which it does use). So the parameter
 * had to be able to name slots, not count them.
 *
 * WHAT MUST NOT MOVE, and is asserted below rather than assumed: narrowing the
 * REQUEST must never widen what may RUN. Every remaining refusal — missing
 * credential pair, two workers on one account — applies to the requested
 * slots exactly as before, and the numeric path that every other caller uses
 * is unchanged. (The protected-account refusal this file originally also
 * asserted was REVOKED by explicit owner instruction the same day — see
 * measurementIdentity.ts's own REVOKED note — so that account now resolves
 * like any other, asserted below instead of refused.)
 *
 * These tests drive the REAL `resolveWorkers`. The runner assertion reads the
 * REAL `runTierA.ts` source, because the property it protects ("the resolved
 * set is derived from the subject constants, not a second literal") is a
 * property of how the call is written, not of a value it returns.
 */
import { readFileSync } from 'fs'

import { describe, it, expect } from 'vitest'

import { resolveWorkers } from '../../scripts/certification/measurementIdentity'

/** Credentials for an arbitrary set of slots — only the ones named exist. */
const envFor = (slots: readonly number[]) => Object.fromEntries(
  slots.flatMap((n) => [
    [`CERT_WORKER_${n}_EMAIL`, `qa${n}@example.test`],
    [`CERT_WORKER_${n}_PASSWORD`, 'pw'],
  ]) as [string, string][],
)

/** The contiguous 1..n environment the pre-existing numeric callers supply. */
const envAll = (n: number) => envFor(Array.from({ length: n }, (_, i) => i + 1))

describe('subject-aware worker resolution: the chemistry pair {2,4}', () => {
  it('resolves exactly w2 and w4, in the requested order', () => {
    const r = resolveWorkers(envAll(4), [2, 4])
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.workers.map((w) => w.workerId)).toEqual(['w2', 'w4'])
    expect(r.workers.map((w) => w.email)).toEqual(['qa2@example.test', 'qa4@example.test'])
  })

  it('does NOT require w1 or w3 — the whole point of the change', () => {
    // The exact shape of the blocked run: only the chemistry pair has
    // credentials at all. Under the old contiguous-prefix behaviour this
    // refused at "worker 1: CERT_WORKER_1_EMAIL/PASSWORD not set".
    const chemistryOnly = envFor([2, 4])
    expect(chemistryOnly.CERT_WORKER_1_EMAIL).toBeUndefined()
    expect(chemistryOnly.CERT_WORKER_3_EMAIL).toBeUndefined()

    const r = resolveWorkers(chemistryOnly, [2, 4])
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.workers.map((w) => w.workerId)).toEqual(['w2', 'w4'])
  })

  it('the physics pair {1,3} resolves independently, with no chemistry credentials', () => {
    const r = resolveWorkers(envFor([1, 3]), [1, 3])
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.workers.map((w) => w.workerId)).toEqual(['w1', 'w3'])
  })
})

describe('narrowing the request never weakens a refusal', () => {
  it('an account with no special status (REVOKED 2026-09-06) resolves normally in a requested slot', () => {
    const ok = { ...envAll(4), CERT_WORKER_2_EMAIL: 'suaibamr@gmail.com' }
    const r = resolveWorkers(ok, [2, 4])
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.workers.find((w) => w.workerId === 'w2')?.email).toBe('suaibamr@gmail.com')
  })

  it('two REQUESTED workers sharing one account is still refused', () => {
    const shared = { ...envAll(4), CERT_WORKER_4_EMAIL: 'qa2@example.test' }
    const r = resolveWorkers(shared, [2, 4])
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/share one account/)
  })

  it('a duplicate involving an UNREQUESTED slot is irrelevant — it cannot run', () => {
    // w1 sharing w2's account is not a contamination risk for a chemistry run,
    // because w1 opens no session. Isolation is enforced across the set that
    // WILL run, which is the set that can contaminate itself.
    const overlap = { ...envAll(4), CERT_WORKER_1_EMAIL: 'qa2@example.test' }
    expect(resolveWorkers(overlap, [2, 4]).ok).toBe(true)
    // The rule is "both halves of the duplicate are running", not "w1 is
    // running": {1,3} is also fine here, because w2 — the account w1 collides
    // with — opens no session in that run either.
    expect(resolveWorkers(overlap, [1, 3]).ok).toBe(true)
    // ...and the moment both halves DO run, it is refused exactly as before.
    expect(resolveWorkers(overlap, [1, 2])).toMatchObject({ ok: false })
    expect(resolveWorkers(overlap, 4)).toMatchObject({ ok: false })
  })

  it('a missing credential pair in a requested slot still refuses, naming that slot', () => {
    const r = resolveWorkers(envFor([2]), [2, 4])
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/CERT_WORKER_4_EMAIL/)
  })

  it('an empty requested set is refused rather than resolving an empty pool', () => {
    // Otherwise a caller that computed no workers would "succeed" into a run
    // that certifies nothing and reports no error.
    const r = resolveWorkers(envAll(4), [])
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/no worker slots requested/)
  })
})

describe('the numeric path is unchanged for every existing caller', () => {
  it('resolveWorkers(env, 4) still resolves w1..w4', () => {
    const r = resolveWorkers(envAll(4), 4)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.workers.map((w) => w.workerId)).toEqual(['w1', 'w2', 'w3', 'w4'])
  })

  it('a number is exactly equivalent to its own contiguous slot list', () => {
    // The strongest statement of "nothing moved": for the environments that
    // matter, both spellings produce identical output.
    for (const env of [envAll(4), envFor([2]), { ...envAll(4), CERT_WORKER_3_EMAIL: 'qa1@example.test' }]) {
      expect(resolveWorkers(env, 4)).toEqual(resolveWorkers(env, [1, 2, 3, 4]))
    }
  })

  it('still refuses a short pool, at the same slot, with the same message', () => {
    const r = resolveWorkers(envAll(3), 4)
    expect(r).toMatchObject({ ok: false })
    if (!r.ok) expect(r.error).toMatch(/CERT_WORKER_4_EMAIL/)
  })
})

describe('runTierA asks for the workers its own constants assign', () => {
  const src = readFileSync('scripts/certification/runTierA.ts', 'utf-8')

  it('no longer hardcodes a four-worker requirement', () => {
    expect(src).not.toMatch(/resolveWorkers\(process\.env,\s*4\)/)
  })

  it('derives the requested slots from workerIds, not a second mapping', () => {
    expect(src).toMatch(/resolveWorkers\(\s*process\.env,\s*workerIds\.map\(/)
    // workerIds itself must come from the subject constants, and those two
    // constants must remain the ONLY place the mapping is written down.
    expect(src).toMatch(/workerIds\s*=\s*subjects\.flatMap\(/)
    expect(src).toMatch(/PHYSICS_WORKERS\s*:\s*CHEMISTRY_WORKERS/)
    const mappings = [...src.matchAll(/\?\s*PHYSICS_WORKERS\s*:\s*CHEMISTRY_WORKERS/g)]
    expect(mappings.length).toBe(1)
  })

  it('resolves AFTER deciding the subject, so the two can never disagree', () => {
    const subjectsAt = src.indexOf('const subjects: Array<')
    const workerIdsAt = src.indexOf('const workerIds = subjects.flatMap(')
    const resolveAt = src.indexOf('resolveWorkers(')
    expect(subjectsAt).toBeGreaterThan(-1)
    expect(workerIdsAt).toBeGreaterThan(subjectsAt)
    expect(resolveAt).toBeGreaterThan(workerIdsAt)
  })

  it('keeps the subject-partitioned assignment itself untouched', () => {
    expect(src).toMatch(/const PHYSICS_WORKERS = \['w1', 'w3'\] as const/)
    expect(src).toMatch(/const CHEMISTRY_WORKERS = \['w2', 'w4'\] as const/)
  })
})
