/**
 * STOP STARTING DATABASE WORK ONCE ITS SLICE IS OVER.
 *
 * MEASURED 2026-10-02 23:54–23:55 UTC (production `pg_stat_activity` and the
 * Postgres log). The cold-start asset bootstrap passed its 12 s boot deadline,
 * kept running "in the background", and began its completeness probe — a
 * batch `$transaction` of two COUNTs — after the deadline. The request that had
 * cold-started the instance then returned, the instance froze mid-transaction,
 * and the connection sat "idle in transaction" until the 60 s
 * `idle_in_transaction_session_timeout` killed it at 23:55:41.
 *
 * `stopAfterDeadline(client, run)` wraps a Prisma client so that, once
 * `run.abandoned` is set, no NEW operation can start: every model method and
 * every `$`-method throws `WorkAbandonedError` before it reaches the database.
 * An operation already in flight is not touched — the caller waits for it to
 * finish (committing whatever it was doing) instead of freezing it open.
 *
 * `run.flushing` lets a group of writes that must land together finish even
 * after the deadline: the bootstrap writes identity rows and then their
 * content rows, and stopping between the two would leave hollow identities.
 */

export class WorkAbandonedError extends Error {
  constructor(what: string) {
    super(`${what}: not started, the work's deadline has passed`)
    this.name = 'WorkAbandonedError'
  }
}

export interface AbandonableRun {
  abandoned: boolean
  /** While true, writes keep running after `abandoned` is set. */
  flushing: boolean
}

export function stopAfterDeadline<T extends object>(client: T, run: AbandonableRun): T {
  const guard = (what: string) => {
    if (run.abandoned && !run.flushing) throw new WorkAbandonedError(what)
  }
  return new Proxy(client, {
    get(target, prop) {
      // The real client is the receiver: Prisma's getters must never run
      // against the proxy.
      const value = Reflect.get(target, prop, target)
      if (typeof prop !== 'string' || prop.startsWith('_')) return value
      if (typeof value === 'function') {
        if (!prop.startsWith('$')) return value.bind(target)
        // `$transaction`, `$queryRaw`, `$executeRaw`, ... Called on the real
        // client, so a batch transaction still receives Prisma's own promises.
        return (...args: unknown[]) => { guard(prop); return value.apply(target, args) }
      }
      if (value && typeof value === 'object' && !prop.startsWith('$')) {
        // A model delegate (`assetIdentity`, `probeAsset`, ...).
        const delegate = value as Record<string, unknown>
        return new Proxy(delegate, {
          get(dTarget, method) {
            const fn = Reflect.get(dTarget, method, dTarget)
            if (typeof fn !== 'function' || typeof method !== 'string') return fn
            return (...args: unknown[]) => { guard(`${prop}.${method}`); return fn.apply(dTarget, args) }
          },
        })
      }
      return value
    },
  })
}

export type DeadlineOutcome = 'finished' | 'stopped' | 'still-running'

/**
 * Run `work` for at most `deadlineMs`. At the deadline the run is marked
 * abandoned (so a client wrapped with `stopAfterDeadline` starts nothing new)
 * and the step already in flight gets up to `settleMs` more to finish.
 *
 *   finished       — the work completed inside the deadline;
 *   stopped        — the deadline passed and the work wound down inside the settle window;
 *   still-running  — even the settle window passed (a single step slower than
 *                    `settleMs`); Postgres's idle-in-transaction limit is the backstop.
 */
export async function runWithDeadline(
  work: (run: AbandonableRun) => Promise<unknown>,
  opts: { deadlineMs: number; settleMs: number; onDeadline?: () => void },
): Promise<DeadlineOutcome> {
  const run: AbandonableRun = { abandoned: false, flushing: false }
  const done = work(run).then(() => true, () => true)
  const timer = <T>(ms: number, v: T) => new Promise<T>((resolve) => {
    const t = setTimeout(() => resolve(v), ms)
    t.unref?.()
  })
  if (await Promise.race([done, timer(opts.deadlineMs, false)])) return 'finished'
  run.abandoned = true
  opts.onDeadline?.()
  return (await Promise.race([done, timer(opts.settleMs, false)])) ? 'stopped' : 'still-running'
}
