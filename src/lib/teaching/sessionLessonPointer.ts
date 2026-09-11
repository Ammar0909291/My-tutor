/**
 * PCD-004 — THE LESSON POINTER BELONGS TO THE SESSION, NOT THE USER.
 *
 * ── THE DEFECT (measured, not predicted) ───────────────────────────────────
 * `StudentProgress` is (user x subject) — `@@unique([userId, subjectCode])`.
 * `activeLessonSlug` lives on it, and `/api/learn/chat` resolves the lesson it
 * teaches ENTIRELY from that row: the request body carries `sessionId` and a
 * message, and no lesson identity at all. So two concurrent sessions for one
 * account share one pointer:
 *
 *   T1  tab A  POST /api/learn/lesson-init { sessionId: A, topicSlug: L111 }
 *              -> upsert { activeLessonSlug: 'L111' }
 *   T2  tab B  POST /api/learn/lesson-init { sessionId: B, topicSlug: L121 }
 *              -> upsert { activeLessonSlug: 'L121' }   same row, same key
 *   T3  tab A  POST /api/learn/chat { sessionId: A }
 *              -> reads the row, resolves L121. Teaches B's lesson in A.
 *
 * Observed in the physics audit (docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md,
 * PCD-004): a request for lesson 111 returned `lessonOrder: 121`, a request for
 * 121 returned 112, and 16/20 concepts in the overlapping window drifted.
 * Re-running the same batches SEQUENTIALLY produced 0/20 — i.e. the control is
 * "stop sharing the pointer", which is exactly what this module makes
 * structural.
 *
 * ── WHY NOT OPTIMISTIC CONCURRENCY ON StudentProgress ──────────────────────
 * There is no lost update to detect. T1 and T2 are separated in time and each
 * lands cleanly; a version check passes on both, and a retry would re-apply the
 * same value. The anomaly is that ONE row is asked to hold TWO simultaneously
 * true, mutually exclusive answers. The grain is wrong, not the write protocol.
 *
 * ── WHY contextSnapshot AND NOT A NEW COLUMN ───────────────────────────────
 * `LearnSession.contextSnapshot` is already the per-session store, already
 * versioned (`_v`), already written through ONE protocol
 * (`writeSnapshotDelta`'s read-check-write with a single retry), and
 * `lesson-init` already participates in it. Putting the pointer there needs no
 * migration, no backfill and no new ownership. The conditional merge is a
 * shallow jsonb `||`, so this top-level key is replaced wholesale — a pure
 * state replacement, which is precisely what a pointer is.
 *
 * ── WHAT THIS DELIBERATELY DOES NOT DO ─────────────────────────────────────
 * · It does not touch `currentLesson`. That field is MONOTONIC (`Math.max` in
 *   its only advancing writer) and therefore commutative and concurrency-safe
 *   by construction; "furthest progress in a subject" is genuinely a property
 *   of the LEARNER, so per-user is the right grain for it and it keeps it.
 * · It does not filter a pointer out because the lesson is already completed.
 *   A finished lesson MUST stay re-enterable — see
 *   completedLessonIsReEnterable.test.ts, which records the production P0
 *   (D-0a, `SERVE_LESSON_COMPLETE` forever) that the opposite rule caused.
 *   Completion CLEARS the pointer at the write site, exactly as
 *   `/api/curriculum/progress` already clears `activeLessonSlug: null`; it is
 *   never filtered at read time.
 * · It does not separate two browser tabs that RESUME THE SAME LearnSession.
 *   `/api/sessions` resumes the most recent ACTIVE session, so two tabs opened
 *   on one subject can share one session — one conversation, one pointer, by
 *   design. Separating those would need per-client identity, which is a
 *   different architecture.
 *
 * Pure except for `clearSessionLessonPointer`, which is a thin, structurally
 * typed wrapper over the existing versioned writer.
 */
import { writeSnapshotDelta, readSnapshotVersion, type SnapshotDb } from '@/lib/db/snapshotWrite'

/**
 * The snapshot key. A plain top-level key (not underscore-prefixed like `_v`)
 * because it IS teaching state, and it is stored as an OBJECT rather than a
 * bare string so the field can gain siblings later without a second key —
 * the same shape `visualSession` and `excursion` already use.
 */
export const SESSION_LESSON_POINTER_KEY = 'lessonPointer'

/** What the key holds. Deliberately no timestamp and no expiry: validity is
 *  lifecycle-determined (an explicit lesson open sets it, completion clears
 *  it), never time-determined — the same rule schema.prisma states for
 *  `activeLessonSlug`. */
export interface SessionLessonPointer {
  topicSlug: string
}

/** Where the effective pointer came from. Telemetry and tests read this; no
 *  teaching decision branches on it. */
export type LessonPointerSource = 'session' | 'student-progress' | 'none'

export interface ResolvedLessonPointer {
  slug: string | null
  source: LessonPointerSource
}

const cleanSlug = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() !== '' ? v.trim() : null

/**
 * Read the session's lesson pointer out of a raw contextSnapshot.
 *
 * TOTAL AND FORGIVING BY DESIGN. A null snapshot, a non-object snapshot, a
 * missing key, a key holding a string/number/array, or an object whose
 * `topicSlug` is absent or blank all read as `null` — "no session pointer" —
 * which falls through to the pre-existing per-user resolution. A malformed
 * snapshot must degrade to today's behaviour, never throw and never fabricate
 * a lesson.
 */
export function readSessionLessonPointer(snapshot: unknown): string | null {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) return null
  const raw = (snapshot as Record<string, unknown>)[SESSION_LESSON_POINTER_KEY]
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  return cleanSlug((raw as Record<string, unknown>).topicSlug)
}

/**
 * THE DELTA. Pass a slug to set the pointer, `null` to retire it — an explicit
 * null, because the conditional merge is a jsonb concatenation: omitting the
 * key leaves the old value in place, so a clear must be written, not implied.
 * (`pendingQuestion.ts` retires its key the same way, for the same reason.)
 */
export function sessionLessonPointerDelta(topicSlug: string | null): Record<string, unknown> {
  const slug = cleanSlug(topicSlug)
  return { [SESSION_LESSON_POINTER_KEY]: slug ? ({ topicSlug: slug } satisfies SessionLessonPointer) : null }
}

/**
 * THE ONE RESOLVER. Every session-aware reader calls this and passes the
 * result wherever it used to pass `studentProgress.activeLessonSlug`.
 *
 * Precedence:
 *   1. the session's own pointer       — the lesson THIS conversation opened
 *   2. StudentProgress.activeLessonSlug — the session-less fallback, unchanged
 *   3. (caller) currentLesson -> first lesson, via selectCurrentLesson
 *
 * Tiers 3+ deliberately stay inside `selectCurrentLesson`/`resolveActiveLesson`
 * rather than being restated here: this function adds a tier on top of that
 * chain, it does not re-implement it. That is what keeps one resolution order
 * in the product instead of two.
 */
export function resolveSessionLessonSlug(input: {
  sessionSnapshot?: unknown
  activeLessonSlug?: string | null
}): ResolvedLessonPointer {
  const fromSession = readSessionLessonPointer(input.sessionSnapshot)
  if (fromSession) return { slug: fromSession, source: 'session' }
  const fromUser = cleanSlug(input.activeLessonSlug)
  if (fromUser) return { slug: fromUser, source: 'student-progress' }
  return { slug: null, source: 'none' }
}

/**
 * Retire the pointer on a known session, through the versioned writer.
 *
 * Reads the session's CURRENT version itself rather than accepting one from
 * the caller: every call site here (lesson completion, the placement
 * downgrade) sits far from wherever that turn last read the snapshot, and a
 * stale expected version would spend the single retry on a conflict that is
 * not real. Fail-soft and never throws — `writeSnapshotDelta` is already
 * total, and a pointer that fails to clear degrades to a stale session
 * pointer, which the next explicit lesson open overwrites.
 */
export async function clearSessionLessonPointer(
  db: SnapshotDb,
  sessionId: string,
): Promise<{ applied: boolean; reason?: string }> {
  try {
    const row = await db.learnSession.findUnique({
      where: { id: sessionId }, select: { contextSnapshot: true },
    })
    if (!row) return { applied: false, reason: 'session-not-found' }
    const result = await writeSnapshotDelta(db, {
      sessionId,
      expectedVersion: readSnapshotVersion(row.contextSnapshot),
      delta: sessionLessonPointerDelta(null),
    })
    return { applied: result.applied, reason: result.applied ? undefined : (result.error ?? 'conflict') }
  } catch (err) {
    return { applied: false, reason: err instanceof Error ? err.message : String(err) }
  }
}
