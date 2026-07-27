/**
 * ISS-19a — keyset (cursor) pagination predicate.
 *
 * Offset pagination (`skip`) is wrong for a live chat log: rows arrive while
 * the learner scrolls, so page 2 fetched after a new message repeats a row
 * that shifted down. Keyset pagination is stable under insertion because the
 * cursor names a ROW, not a position.
 *
 * The subtlety this file exists to own: `createdAt` is not unique. Two
 * messages written in the same millisecond compare equal, so a naive
 * `createdAt < cursor.createdAt` silently DROPS every row sharing the
 * cursor's timestamp, and `<=` repeats them forever. The predicate must
 * compare the full (createdAt, id) tuple in the same order the query sorts
 * by — which is exactly what this returns.
 *
 * Pure, no Prisma import: it returns a plain `where` fragment, so it is
 * testable without a database and reusable by any keyset-paged endpoint.
 */

export interface PageCursor {
  createdAt: Date
  id: string
}

/**
 * A `where` fragment selecting rows STRICTLY OLDER than the cursor under a
 * `(createdAt desc, id desc)` ordering. Returns `{}` for a null cursor — the
 * newest page — so callers spread it unconditionally.
 */
export function olderThan(cursor: PageCursor | null | undefined): Record<string, unknown> {
  if (!cursor) return {}
  return {
    OR: [
      { createdAt: { lt: cursor.createdAt } },
      { createdAt: cursor.createdAt, id: { lt: cursor.id } },
    ],
  }
}

/**
 * Does `row` fall strictly before `cursor` in `(createdAt desc, id desc)`
 * order? The in-memory twin of `olderThan`, and the reason this module is
 * testable: the SQL fragment and this function must agree, so the tests
 * assert the ordering law on the function and the fragment is built from the
 * same two clauses.
 */
export function isOlderThan(row: PageCursor, cursor: PageCursor): boolean {
  const rowMs = row.createdAt.getTime()
  const curMs = cursor.createdAt.getTime()
  if (rowMs !== curMs) return rowMs < curMs
  return row.id < cursor.id
}
