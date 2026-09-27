/**
 * REQUEST-SCOPED READ MEMO — one identical read per request, not six.
 *
 * MEASURED 2026-09-27 (production pg_stat_statements, egress). Every chat turn
 * builds the adaptive teaching context (`getTutorTeachingContext` ->
 * `getWeightedTeachingPlanProfile`), and that chain's loaders call each other:
 * `getTeachingPlans` runs twice, `getRevisionProfile` three times, and each
 * re-reads the learner's WHOLE `topic_progress` table — six full reads plus
 * three identical VISUAL evidence reads per turn. The three all-subjects
 * `topic_progress` queries had grown to ~29.7M rows lifetime (from ~5M on
 * 2026-08-31), on the order of 2 GB/month against a 5 GB quota.
 *
 * Inside `withRequestMemo`, `memoized(key, load)` runs `load` once per key and
 * hands every caller the same promise. Outside a scope it is a plain call, so
 * existing callers and tests behave exactly as before. A failed load is
 * evicted, never cached. The scope lives only as long as the wrapped call —
 * nothing is shared across requests or turns, so no read can go stale.
 */
import { AsyncLocalStorage } from 'node:async_hooks'

const scope = new AsyncLocalStorage<Map<string, Promise<unknown>>>()

export function withRequestMemo<T>(fn: () => Promise<T>): Promise<T> {
  return scope.getStore() ? fn() : scope.run(new Map(), fn)
}

export function memoized<T>(key: string, load: () => Promise<T>): Promise<T> {
  const memo = scope.getStore()
  if (!memo) return load()
  const hit = memo.get(key) as Promise<T> | undefined
  if (hit) return hit
  const p = load()
  memo.set(key, p)
  p.catch(() => { if (memo.get(key) === p) memo.delete(key) })
  return p
}
