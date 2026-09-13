/**
 * PCD-004 — the session-scoped lesson pointer, at the unit and mechanism level.
 *
 * The end-to-end reproduction (T1) lives in sessionLessonRace.test.ts, which
 * drives the REAL chat route. This file pins the pieces that file composes:
 * the resolver's precedence, the delta's shape, the reader's tolerance of a
 * malformed snapshot, and — the one that matters most — that the WRITER and
 * the READER agree through the REAL versioned writer rather than through a
 * shape asserted twice.
 */
import { describe, it, expect } from 'vitest'
import {
  SESSION_LESSON_POINTER_KEY,
  readSessionLessonPointer,
  sessionLessonPointerDelta,
  resolveSessionLessonSlug,
  clearSessionLessonPointer,
} from '@/lib/teaching/sessionLessonPointer'
import { writeSnapshotDelta, readSnapshotVersion, type SnapshotDb } from '@/lib/db/snapshotWrite'

const A = 'chem.found.pure-substances'
const B = 'chem.atomic.atomic-spectra'

/** A LearnSession row with the real conditional-merge semantics — the same
 *  fake shape snapshotWriterDiscipline.test.ts uses, so these tests exercise
 *  the genuine optimistic-concurrency path rather than a stub that always
 *  succeeds. */
function fakeDb(initial: Record<string, unknown> | null) {
  const state = { snapshot: initial as Record<string, unknown> | null }
  const db: SnapshotDb = {
    async $executeRawUnsafe(_q: string, ...values: unknown[]) {
      const [payload, , expected] = values as [string, string, number]
      const current = readSnapshotVersion(state.snapshot)
      if (current !== expected) return 0
      state.snapshot = { ...(state.snapshot ?? {}), ...JSON.parse(payload) }
      return 1
    },
    learnSession: {
      async findUnique() { return state.snapshot === null ? null : { contextSnapshot: state.snapshot } },
    },
  }
  return { db, state }
}

describe('the resolver — precedence is session → student-progress → none', () => {
  it('the session pointer wins over a per-user pointer naming another lesson', () => {
    const r = resolveSessionLessonSlug({
      sessionSnapshot: { [SESSION_LESSON_POINTER_KEY]: { topicSlug: A } },
      activeLessonSlug: B,
    })
    expect(r).toEqual({ slug: A, source: 'session' })
  })

  it('with no session pointer it resolves EXACTLY the per-user value (the unchanged fallback)', () => {
    expect(resolveSessionLessonSlug({ sessionSnapshot: {}, activeLessonSlug: B }))
      .toEqual({ slug: B, source: 'student-progress' })
    expect(resolveSessionLessonSlug({ sessionSnapshot: null, activeLessonSlug: B }))
      .toEqual({ slug: B, source: 'student-progress' })
    expect(resolveSessionLessonSlug({ activeLessonSlug: B }))
      .toEqual({ slug: B, source: 'student-progress' })
  })

  it('neither present ⇒ null, so the caller falls through to currentLesson', () => {
    expect(resolveSessionLessonSlug({ sessionSnapshot: {}, activeLessonSlug: null }))
      .toEqual({ slug: null, source: 'none' })
    expect(resolveSessionLessonSlug({ sessionSnapshot: {}, activeLessonSlug: '   ' }))
      .toEqual({ slug: null, source: 'none' })
  })

  it('a blank session pointer does not shadow a real per-user one', () => {
    expect(resolveSessionLessonSlug({
      sessionSnapshot: { [SESSION_LESSON_POINTER_KEY]: { topicSlug: '  ' } },
      activeLessonSlug: B,
    })).toEqual({ slug: B, source: 'student-progress' })
  })
})

describe('T6 — a malformed snapshot degrades to the per-user fallback, never throws', () => {
  const malformed: unknown[] = [
    null, undefined, 0, 'nonsense', [], [{ topicSlug: A }],
    { [SESSION_LESSON_POINTER_KEY]: 'a-bare-string' },
    { [SESSION_LESSON_POINTER_KEY]: 42 },
    { [SESSION_LESSON_POINTER_KEY]: [] },
    { [SESSION_LESSON_POINTER_KEY]: {} },
    { [SESSION_LESSON_POINTER_KEY]: { topicSlug: null } },
    { [SESSION_LESSON_POINTER_KEY]: { topicSlug: 7 } },
    { [SESSION_LESSON_POINTER_KEY]: null },
  ]
  it.each(malformed.map((m, i) => [i, m] as const))('case %i reads as null', (_i, snap) => {
    expect(() => readSessionLessonPointer(snap)).not.toThrow()
    expect(readSessionLessonPointer(snap)).toBeNull()
    expect(resolveSessionLessonSlug({ sessionSnapshot: snap, activeLessonSlug: B }))
      .toEqual({ slug: B, source: 'student-progress' })
  })
})

describe('the delta', () => {
  it('sets the pointer as an object under the one key', () => {
    expect(sessionLessonPointerDelta(A)).toEqual({ [SESSION_LESSON_POINTER_KEY]: { topicSlug: A } })
  })

  it('RETIRES the key with an explicit null — an omitted key would survive the jsonb merge', () => {
    const d = sessionLessonPointerDelta(null)
    expect(Object.prototype.hasOwnProperty.call(d, SESSION_LESSON_POINTER_KEY)).toBe(true)
    expect(d[SESSION_LESSON_POINTER_KEY]).toBeNull()
  })

  it('treats a blank slug as a clear rather than storing whitespace', () => {
    expect(sessionLessonPointerDelta('   ')).toEqual({ [SESSION_LESSON_POINTER_KEY]: null })
  })
})

describe('T8 — writer and reader agree THROUGH the real versioned writer', () => {
  it('a delta written by writeSnapshotDelta is read back by readSessionLessonPointer', async () => {
    const { db, state } = fakeDb({})
    const res = await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 0, delta: sessionLessonPointerDelta(A),
    })
    expect(res.applied).toBe(true)
    expect(readSessionLessonPointer(state.snapshot)).toBe(A)
    // the CAS discipline is intact: the write stamped a version
    expect(readSnapshotVersion(state.snapshot)).toBe(1)
  })

  it('the pointer is REPLACED, not merged, when the session opens another lesson', async () => {
    const { db, state } = fakeDb({})
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: sessionLessonPointerDelta(A) })
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 1, delta: sessionLessonPointerDelta(B) })
    expect(readSessionLessonPointer(state.snapshot)).toBe(B)
  })

  it('writing the pointer does not disturb neighbouring session state', async () => {
    const { db, state } = fakeDb({ conversationState: { phase: 'GUIDE' }, excursion: { turns: 2 } })
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: sessionLessonPointerDelta(A) })
    expect(state.snapshot).toMatchObject({
      conversationState: { phase: 'GUIDE' }, excursion: { turns: 2 },
    })
    expect(readSessionLessonPointer(state.snapshot)).toBe(A)
  })

  it('a stale expected version conflicts, then the single retry lands it (CAS honoured)', async () => {
    const { db, state } = fakeDb({})
    // another writer moved the snapshot on
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: { somethingElse: 1 } })
    expect(readSnapshotVersion(state.snapshot)).toBe(1)
    const res = await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 0, delta: sessionLessonPointerDelta(A),
    })
    expect(res.conflicted).toBe(true)
    expect(res.applied).toBe(true)
    expect(readSessionLessonPointer(state.snapshot)).toBe(A)
  })
})

describe('T5 — clearSessionLessonPointer', () => {
  it('retires a set pointer so resolution falls through to the per-user field', async () => {
    const { db, state } = fakeDb({ [SESSION_LESSON_POINTER_KEY]: { topicSlug: A } })
    const r = await clearSessionLessonPointer(db, 's1')
    expect(r.applied).toBe(true)
    expect(readSessionLessonPointer(state.snapshot)).toBeNull()
    expect(resolveSessionLessonSlug({ sessionSnapshot: state.snapshot, activeLessonSlug: B }))
      .toEqual({ slug: B, source: 'student-progress' })
  })

  it('reads the CURRENT version itself, so it is not defeated by a concurrent write', async () => {
    const { db, state } = fakeDb({ [SESSION_LESSON_POINTER_KEY]: { topicSlug: A } })
    await writeSnapshotDelta(db, { sessionId: 's1', expectedVersion: 0, delta: { other: true } })
    const r = await clearSessionLessonPointer(db, 's1')
    expect(r.applied).toBe(true)
    expect(readSessionLessonPointer(state.snapshot)).toBeNull()
  })

  it('a vanished session is reported, not thrown', async () => {
    const { db } = fakeDb(null)
    await expect(clearSessionLessonPointer(db, 'gone')).resolves.toEqual({
      applied: false, reason: 'session-not-found',
    })
  })

  it('a throwing db is reported, not thrown', async () => {
    const db = {
      $executeRawUnsafe: async () => { throw new Error('down') },
      learnSession: { findUnique: async () => { throw new Error('down') } },
    } as unknown as SnapshotDb
    const r = await clearSessionLessonPointer(db, 's1')
    expect(r.applied).toBe(false)
    expect(r.reason).toContain('down')
  })
})
