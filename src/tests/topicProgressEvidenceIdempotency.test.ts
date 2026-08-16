/**
 * ONE LEARNER ANSWER MUST COUNT EXACTLY ONCE.
 *
 * Origin: a Prisma P1008 socket timeout ate a mastery-evidence write in
 * production on 2026-08-16, so a graded correct answer left no trace. The naive
 * repair (wrap the existing `attempts: { increment: 1 }` in withRetry) trades a
 * lost increment for a double one, because a socket timeout does not report
 * whether the statement committed.
 *
 * These tests drive `applyTopicProgressEvidence` against an in-memory store
 * that reproduces the two behaviours that matter: the SQL semantics of the
 * guarded UPDATE (including `NULL <> 'x'` being NULL, not true) and a unique
 * violation on the (user, subject, topic) key. Every scenario asserts the same
 * invariant — `attempts` advanced by exactly one.
 */
import { describe, it, expect } from 'vitest'
import {
  applyTopicProgressEvidence, type TopicProgressDb,
} from '@/lib/teaching/topicProgressEvidence'

const KEY = { userId: 'u1', subjectSlug: 'chemistry', topicSlug: 'chem.found.states-of-matter' }
const EVENT = 'msg_abc123'

interface Row {
  userId: string; subjectSlug: string; topicSlug: string
  status: string; masteryPct: number; attempts: number
  lastScore: number | null; lastEvidenceMessageId: string | null
}

/** Fails the NEXT n operations, to model a database that is timing out. */
function store(seed?: Partial<Row>) {
  const rows: Row[] = []
  if (seed) {
    rows.push({
      ...KEY, status: 'IN_PROGRESS', masteryPct: 0, attempts: 0,
      lastScore: null, lastEvidenceMessageId: null, ...seed,
    })
  }
  const state = { failNext: 0, failAfterCommit: 0 }

  const match = (r: Row, w: any) =>
    r.userId === w.userId && r.subjectSlug === w.subjectSlug && r.topicSlug === w.topicSlug

  const db: TopicProgressDb = {
    topicProgress: {
      async updateMany({ where, data }: any) {
        if (state.failNext > 0) { state.failNext--; throw Object.assign(new Error('Socket timeout'), { code: 'P1008' }) }
        let count = 0
        for (const r of rows) {
          if (!match(r, where)) continue
          if (where.status?.notIn?.includes(r.status)) continue
          // OR [ marker IS NULL, marker <> event ] — the real predicate.
          const marker = r.lastEvidenceMessageId
          const target = where.OR[1].lastEvidenceMessageId.not
          if (!(marker === null || marker !== target)) continue
          r.status = data.status
          r.masteryPct = data.masteryPct
          r.lastScore = data.lastScore
          r.attempts += data.attempts.increment
          r.lastEvidenceMessageId = data.lastEvidenceMessageId
          count++
        }
        // A post-commit timeout: the write landed, the caller never learns it.
        if (state.failAfterCommit > 0) {
          state.failAfterCommit--
          throw Object.assign(new Error('Socket timeout'), { code: 'P1008' })
        }
        return { count }
      },
      async create({ data }: any) {
        if (rows.some((r) => match(r, data))) {
          throw Object.assign(new Error('Unique constraint failed'), { code: 'P2002' })
        }
        rows.push({ ...data })
        return data
      },
      async findUnique({ where }: any) {
        const w = where.userId_subjectSlug_topicSlug
        return rows.find((r) => match(r, w)) ?? null
      },
    },
  }
  return { db, rows, state }
}

/** The route's call shape: idempotent operation inside a retry loop. */
async function withRetryLike<T>(op: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown
  for (let i = 0; i < attempts; i++) {
    try { return await op() } catch (e) { last = e }
  }
  throw last
}

const apply = (db: TopicProgressDb, eventId = EVENT, score = 65) =>
  applyTopicProgressEvidence(db, { ...KEY, score, eventId })

describe('a single evidence event increments attempts exactly once', () => {
  it('1. normal success on an existing row', async () => {
    const { db, rows } = store({ attempts: 3 })
    expect(await apply(db)).toBe('applied')
    expect(rows[0].attempts).toBe(4)
    expect(rows[0].lastEvidenceMessageId).toBe(EVENT)
  })

  it('1b. normal success creating the first row', async () => {
    const { db, rows } = store()
    expect(await apply(db)).toBe('applied')
    expect(rows).toHaveLength(1)
    expect(rows[0].attempts).toBe(1)
  })

  it('2. post-commit timeout, then retry — still one increment', async () => {
    const { db, rows, state } = store({ attempts: 3 })
    state.failAfterCommit = 1 // the write commits; the caller sees a timeout
    const outcome = await withRetryLike(() => apply(db))
    expect(rows[0].attempts).toBe(4)
    expect(outcome).toBe('duplicate') // the retry correctly declines to re-count
  })

  it('3. pre-commit failure, then retry — exactly one increment', async () => {
    const { db, rows, state } = store({ attempts: 3 })
    state.failNext = 1 // throws before touching the row
    expect(await withRetryLike(() => apply(db))).toBe('applied')
    expect(rows[0].attempts).toBe(4)
  })

  it('4. repeated retries of the same event never accumulate', async () => {
    const { db, rows } = store({ attempts: 3 })
    for (let i = 0; i < 5; i++) await apply(db)
    expect(rows[0].attempts).toBe(4)
  })

  it('5. concurrent duplicates of the same event increment once', async () => {
    const { db, rows } = store({ attempts: 3 })
    await Promise.all([apply(db), apply(db), apply(db)])
    expect(rows[0].attempts).toBe(4)
  })

  it('5b. concurrent duplicates racing to CREATE the first row increment once', async () => {
    const { db, rows } = store()
    await Promise.all([apply(db), apply(db), apply(db)])
    expect(rows).toHaveLength(1)
    expect(rows[0].attempts).toBe(1)
  })
})

describe('semantics preserved exactly', () => {
  it('a genuinely DIFFERENT event still increments', async () => {
    const { db, rows } = store({ attempts: 3 })
    await apply(db, 'msg_one')
    await apply(db, 'msg_two')
    expect(rows[0].attempts).toBe(5)
  })

  it('never overwrites a certified concept, and never certifies one itself', async () => {
    for (const status of ['MASTERED', 'COMPLETED']) {
      const { db, rows } = store({ status, attempts: 9, masteryPct: 100 })
      expect(await apply(db)).toBe('locked')
      expect(rows[0].attempts).toBe(9)
      expect(rows[0].status).toBe(status)
      expect(rows[0].masteryPct).toBe(100)
    }
    // And the write itself only ever produces IN_PROGRESS at 65/25.
    const { db, rows } = store()
    await apply(db, EVENT, 25)
    expect(rows[0].status).toBe('IN_PROGRESS')
    expect(rows[0].masteryPct).toBe(25)
  })

  it('a NULL marker on a pre-existing row is treated as "not yet applied"', async () => {
    // NULL <> 'x' is NULL in SQL, so a bare `not` would skip legacy rows.
    const { db, rows } = store({ attempts: 2, lastEvidenceMessageId: null })
    expect(await apply(db)).toBe('applied')
    expect(rows[0].attempts).toBe(3)
  })

  it('propagates a non-unique error instead of swallowing it', async () => {
    const { db, state } = store({ attempts: 1 })
    state.failNext = 99
    await expect(apply(db)).rejects.toThrow(/Socket timeout/)
  })
})
