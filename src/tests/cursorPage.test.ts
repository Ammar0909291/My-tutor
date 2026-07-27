/**
 * ISS-19a (masterplan P0) — keyset pagination.
 *
 * The bug class these tests exist for: `createdAt` is not unique, and a chat
 * log writes bursts inside one millisecond. A predicate comparing timestamps
 * alone either DROPS every row sharing the cursor's timestamp (`<`) or
 * repeats them forever (`<=`). Both are silent.
 */
import { describe, it, expect } from 'vitest'
import { olderThan, isOlderThan, type PageCursor } from '@/lib/db/cursorPage'

const at = (ms: number, id: string): PageCursor => ({ createdAt: new Date(ms), id })

describe('the newest page', () => {
  it('is an empty fragment for a null cursor — callers spread unconditionally', () => {
    expect(olderThan(null)).toEqual({})
    expect(olderThan(undefined)).toEqual({})
  })
})

describe('the fragment compares the full (createdAt, id) tuple', () => {
  it('emits both clauses, not a bare timestamp comparison', () => {
    const c = at(1000, 'm5')
    expect(olderThan(c)).toEqual({
      OR: [
        { createdAt: { lt: c.createdAt } },
        { createdAt: c.createdAt, id: { lt: 'm5' } },
      ],
    })
  })
})

describe('the ordering law', () => {
  const cursor = at(1000, 'm5')

  it('an older timestamp is older regardless of id', () => {
    expect(isOlderThan(at(999, 'zzz'), cursor)).toBe(true)
    expect(isOlderThan(at(999, 'aaa'), cursor)).toBe(true)
  })

  it('a newer timestamp is never older', () => {
    expect(isOlderThan(at(1001, 'aaa'), cursor)).toBe(false)
  })

  it('SAME timestamp: the id breaks the tie — no drops, no repeats', () => {
    expect(isOlderThan(at(1000, 'm4'), cursor)).toBe(true)   // included
    expect(isOlderThan(at(1000, 'm5'), cursor)).toBe(false)  // the cursor itself
    expect(isOlderThan(at(1000, 'm6'), cursor)).toBe(false)  // already fetched
  })

  it('is irreflexive and antisymmetric — a page can never contain its cursor', () => {
    expect(isOlderThan(cursor, cursor)).toBe(false)
    const other = at(1000, 'm9')
    expect(isOlderThan(other, cursor) && isOlderThan(cursor, other)).toBe(false)
  })
})

describe('walking a burst-written log terminates and covers it exactly once', () => {
  // 12 rows, all inside ONE millisecond — the case a timestamp-only
  // predicate handles wrongly in both directions.
  const rows: PageCursor[] = Array.from({ length: 12 }, (_, i) =>
    at(1000, `m${String(i).padStart(2, '0')}`))
  // Newest-first, matching the endpoint's (createdAt desc, id desc) order.
  const sorted = [...rows].sort((a, b) =>
    b.createdAt.getTime() - a.createdAt.getTime() || (a.id < b.id ? 1 : -1))

  it('pages of 5 cover every row exactly once', () => {
    const PAGE = 5
    const seen: string[] = []
    let cursor: PageCursor | null = null
    for (let guard = 0; guard < 10; guard++) {
      const page = sorted.filter((r) => (cursor ? isOlderThan(r, cursor) : true)).slice(0, PAGE)
      if (page.length === 0) break
      seen.push(...page.map((r) => r.id))
      cursor = page.length === PAGE ? page[page.length - 1] : null
      if (cursor === null) break
    }
    expect(seen).toHaveLength(rows.length)
    expect(new Set(seen).size).toBe(rows.length)      // no repeats
    expect([...seen].sort()).toEqual(rows.map((r) => r.id).sort())  // no drops
  })
})
