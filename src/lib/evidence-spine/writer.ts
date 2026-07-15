/**
 * EOS M1 — Evidence Spine: the event writer.
 *
 * Append-only, idempotent, per-learner gapless seq (RS §2.2: seq is assigned
 * transactionally; a duplicate idempotencyKey is a silent no-op returning
 * nothing new). The store interface is injectable so seq/idempotency logic
 * is unit-testable without a database; `prismaSpineStore` adapts the real
 * Prisma client.
 *
 * The writer is designed to be called fire-and-forget from the chat route:
 * it MUST never throw into the caller (all failures are swallowed after
 * best-effort logging) and it never blocks the learner's turn.
 */
import { idempotencyKey, type NewSpineEvent } from './types'

export interface SpineInsertRow {
  seq: number
  learnerId: string
  sessionId: string | null
  turnId: string | null
  type: string
  schemaVersion: number
  payload: unknown
  source: unknown
  confidence: number
  idempotencyKey: string
}

/** Conflict signals the store must surface (mapped from Prisma P2002 targets). */
export type SpineInsertResult = 'ok' | 'seq_conflict' | 'idempotent_duplicate'

export interface SpineStore {
  maxSeq(learnerId: string): Promise<number>
  /** Insert ONE row; report unique-constraint collisions as typed results. */
  insert(row: SpineInsertRow): Promise<SpineInsertResult>
}

const MAX_SEQ_RETRIES = 3

/**
 * Append events in order. Seq is assigned as maxSeq+1..+n; a concurrent
 * writer racing the same learner produces a seq_conflict on insert, which
 * re-reads maxSeq and retries (bounded). Idempotent duplicates are skipped
 * silently without consuming a seq gap (the row that owns the key already
 * carries its own seq).
 *
 * Returns the number of rows actually inserted. Never throws.
 */
export async function appendSpineEvents(
  store: SpineStore,
  events: NewSpineEvent[],
): Promise<number> {
  if (events.length === 0) return 0
  let inserted = 0
  try {
    const learnerId = events[0].learnerId
    let next = (await store.maxSeq(learnerId)) + 1
    for (const e of events) {
      if (e.learnerId !== learnerId) continue // one learner per batch, by contract
      const row: SpineInsertRow = {
        seq: next,
        learnerId,
        sessionId: e.sessionId ?? null,
        turnId: e.turnId ?? null,
        type: e.type,
        schemaVersion: 1,
        payload: e.payload,
        source: e.source,
        confidence: e.confidence ?? 1,
        idempotencyKey: idempotencyKey(e),
      }
      let attempt = 0
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const res = await store.insert(row)
        if (res === 'ok') { inserted += 1; next += 1; break }
        if (res === 'idempotent_duplicate') break // no seq consumed; next unchanged
        // seq_conflict: another writer took our seq — re-read and retry.
        attempt += 1
        if (attempt > MAX_SEQ_RETRIES) break
        next = (await store.maxSeq(learnerId)) + 1
        row.seq = next
      }
    }
  } catch (err) {
    // Fire-and-forget contract: the spine must never break a turn.
    console.warn('[evidence-spine] append failed:', err)
  }
  return inserted
}

// ── Prisma adapter ────────────────────────────────────────────────────────────

type PrismaLike = {
  spineEvent: {
    aggregate(args: { where: { learnerId: string }; _max: { seq: true } }): Promise<{ _max: { seq: number | null } }>
    create(args: { data: SpineInsertRow }): Promise<unknown>
  }
}

export function prismaSpineStore(prisma: PrismaLike): SpineStore {
  return {
    async maxSeq(learnerId) {
      const r = await prisma.spineEvent.aggregate({ where: { learnerId }, _max: { seq: true } })
      return r._max.seq ?? 0
    },
    async insert(row) {
      try {
        await prisma.spineEvent.create({ data: row })
        return 'ok'
      } catch (err: unknown) {
        const e = err as { code?: string; meta?: { target?: string[] | string } }
        if (e?.code === 'P2002') {
          const target = Array.isArray(e.meta?.target) ? e.meta?.target.join(',') : String(e.meta?.target ?? '')
          if (target.includes('idempotencyKey')) return 'idempotent_duplicate'
          return 'seq_conflict'
        }
        throw err
      }
    },
  }
}
