/**
 * ISS-13 (masterplan P0) — conditional snapshot write with one retry.
 *
 * THE LOST UPDATE. `contextSnapshot` is read once at the start of a turn and
 * written once at the end. Between those points another turn for the same
 * session can commit — a learner double-sending is enough. The write is an
 * atomic JSONB merge, so keys the two turns do not share are safe; keys they
 * BOTH write are last-writer-wins, and for the accumulative ones (counters,
 * metric folds, the frustration machine) that silently discards an
 * increment. The fold ran against a snapshot that no longer exists.
 *
 * WHY A VERSION AND NOT A LOCK. The turn is already committed by the time we
 * persist — the learner has the reply. Blocking or aborting would be worse
 * than a stale counter. Optimistic concurrency is the right shape: detect
 * that the base moved, re-derive against what is actually there, write once
 * more. That is the masterplan's own wording: "snapshot version field +
 * conditional update w/ one retry".
 *
 * WHY `rederive` IS A CALLBACK AND NOT A FIELD LIST. Only the code that
 * performed a fold knows how to redo it. A central list here would be a
 * second owner of every fold in the turn and would drift the moment one
 * changed. Callers register re-derivations at the site where they folded;
 * this module never learns what a parity metric or a frustration state is.
 *
 * FAIL-SOFT, ALWAYS. Snapshot persistence has never been allowed to fail a
 * turn, and this does not change that: every path resolves, and a second
 * conflict is reported, not thrown. The worst case is exactly today's
 * behaviour (one turn's accumulative state lost), never a failed reply.
 */

/** The version key. Underscore-prefixed so it cannot collide with a teaching
 *  field, and stored inside the snapshot so no migration is needed. */
export const SNAPSHOT_VERSION_KEY = '_v'

/**
 * The PHYSICAL table name for the LearnSession model.
 *
 * It is `learn_sessions`, not `LearnSession`: prisma/schema.prisma declares
 * `@@map("learn_sessions")` on that model, so the Prisma MODEL name never
 * exists in Postgres. Raw SQL does not go through Prisma's mapping layer, so
 * it must name the mapped table itself.
 *
 * This was wrong (`"LearnSession"`) from the moment this module was written,
 * and every conditionalMerge below therefore threw 42P01 `relation
 * "LearnSession" does not exist` — swallowed by writeSnapshotDelta's own
 * never-throw contract and reported only as a warning. Verified against
 * production 2026-08-02: the version key this module stamps on every
 * successful write was present on 0 of 130 sessions, i.e. not one write had
 * ever landed. Because this module is the SOLE writer of contextSnapshot
 * (pinned by snapshotWriterDiscipline.test.ts), the column was frozen for
 * every session, and with it the whole Brain state pipeline.
 *
 * Kept as a named constant so the accompanying test can assert it against
 * schema.prisma's @@map directly, which a fake-db test can never do.
 */
export const LEARN_SESSION_TABLE = 'learn_sessions'

/** Total: an absent or malformed version reads as 0, which is also what a
 *  pre-ISS-13 row (written before the key existed) reports — so the first
 *  conditional write against a legacy row succeeds rather than deadlocking. */
export function readSnapshotVersion(snapshot: unknown): number {
  if (snapshot && typeof snapshot === 'object') {
    const v = (snapshot as Record<string, unknown>)[SNAPSHOT_VERSION_KEY]
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0) return Math.floor(v)
  }
  return 0
}

export interface SnapshotWriteResult {
  /** Did a write land? False only when both attempts conflicted. */
  applied: boolean
  /** Did the first attempt conflict (i.e. a concurrent turn committed)? */
  conflicted: boolean
  /** Version stamped by the write that landed, or null if none did. */
  version: number | null
  error?: string
}

/** The narrow surface this module needs. Declared structurally so the tests
 *  can drive it without a database — the same discipline replay.ts uses. */
export interface SnapshotDb {
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>
  learnSession: {
    findUnique(args: { where: { id: string }; select: { contextSnapshot: true } }):
      Promise<{ contextSnapshot: unknown } | null>
  }
}

export interface SnapshotWriteArgs {
  sessionId: string
  /** Version read at the START of the turn — the base the delta was derived
   *  against. */
  expectedVersion: number
  delta: Record<string, unknown>
  /**
   * Re-derive the ACCUMULATIVE part of the delta against the snapshot as it
   * actually is now. Called at most once, only on conflict. Returning `{}` is
   * valid and means "this turn's delta is pure state replacement" — re-applying
   * it verbatim on top of the newer base is then already correct.
   */
  rederive?: (fresh: Record<string, unknown>) => Record<string, unknown>
}

/**
 * Merge `delta` into the session snapshot, but only if the snapshot is still
 * at `expectedVersion`. On conflict: re-read, re-derive, write once more
 * against the observed version. Never throws.
 */
export async function writeSnapshotDelta(
  db: SnapshotDb,
  args: SnapshotWriteArgs,
): Promise<SnapshotWriteResult> {
  try {
    const first = await conditionalMerge(db, args.sessionId, args.expectedVersion, args.delta)
    if (first > 0) return { applied: true, conflicted: false, version: args.expectedVersion + 1 }

    // ── the single retry ────────────────────────────────────────────────
    const row = await db.learnSession.findUnique({
      where: { id: args.sessionId }, select: { contextSnapshot: true },
    })
    // The row disappeared (session deleted mid-turn). Nothing to write to,
    // and nothing is wrong — report it as unapplied rather than as an error.
    if (!row) return { applied: false, conflicted: true, version: null }

    const fresh = (row.contextSnapshot ?? {}) as Record<string, unknown>
    const observed = readSnapshotVersion(fresh)
    const merged = { ...args.delta, ...(args.rederive ? args.rederive(fresh) : {}) }
    const second = await conditionalMerge(db, args.sessionId, observed, merged)
    return second > 0
      ? { applied: true, conflicted: true, version: observed + 1 }
      : { applied: false, conflicted: true, version: null }
  } catch (err) {
    return {
      applied: false, conflicted: false, version: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

/**
 * One conditional merge. The version is stamped INSIDE the same jsonb
 * concatenation that applies the delta, so the write and its version can
 * never diverge — a separate UPDATE for the version would be a second write
 * that could itself be lost.
 *
 * The WHERE clause treats a missing/NULL `_v` as 0, matching
 * readSnapshotVersion, so legacy rows are writable exactly once before they
 * carry a version.
 *
 * ON `$executeRawUnsafe`. The rest of the codebase uses the tagged-template
 * `$executeRaw`, and "Unsafe" deserves a reviewer's suspicion. It is used
 * here for one reason — a structurally-typed method is fakeable, so the
 * concurrency cases are tested deterministically instead of against a live
 * Postgres — and it carries NO injection surface: all three values are bound
 * as parameters ($1/$2/$3), and the only interpolations are
 * LEARN_SESSION_TABLE and SNAPSHOT_VERSION_KEY, module constants that never
 * see user input.
 *
 * THE COST OF THAT FAKEABILITY, learned the hard way: a fake db validates the
 * arguments but never the SQL, so a wrong table name in this string is
 * invisible to every test that drives it. That is exactly how
 * `UPDATE "LearnSession"` survived here against a database whose table is
 * `learn_sessions`. snapshotTableName.test.ts now checks the identifier
 * against prisma/schema.prisma's own @@map, which is the one assertion a fake
 * db cannot make for us.
 */
async function conditionalMerge(
  db: SnapshotDb,
  sessionId: string,
  expectedVersion: number,
  delta: Record<string, unknown>,
): Promise<number> {
  const payload = JSON.stringify({ ...delta, [SNAPSHOT_VERSION_KEY]: expectedVersion + 1 })
  return db.$executeRawUnsafe(
    `UPDATE "${LEARN_SESSION_TABLE}"
     SET "contextSnapshot" = COALESCE("contextSnapshot", '{}'::jsonb) || $1::jsonb
     WHERE id = $2
       AND COALESCE(("contextSnapshot" ->> '${SNAPSHOT_VERSION_KEY}')::int, 0) = $3`,
    payload, sessionId, expectedVersion,
  )
}
