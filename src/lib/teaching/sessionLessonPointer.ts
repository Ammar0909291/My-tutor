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

/**
 * PCD-004C — must the mount-time history page be re-fetched, scoped to the
 * session?
 *
 * `LessonScreen`'s mount effect issues its history request in PARALLEL with
 * session creation, so it cannot name a session and the server scopes it by
 * the PER-USER pointer. With another session open on the account that pointer
 * can name a different lesson, and the mount path is the one a returning
 * learner actually takes (refresh, re-open, re-login) — so the screen could
 * render one lesson's transcript while the tutor taught another, and nothing
 * re-fetched afterwards to correct it.
 *
 * Both endpoints now report the key they resolved, and this is the whole
 * decision. It is deliberately a pure comparison, not a heuristic:
 *
 *  · no session id yet          -> NO (there is nothing to scope BY)
 *  · the session reported no key -> NO (`undefined` means an older server, or
 *                                  a response that never carried the field;
 *                                  never re-fetch on absent information)
 *  · the keys agree              -> NO (every single-session learner, and
 *                                  every brand-new session — zero cost)
 *  · the keys differ            -> YES, exactly one corrective re-fetch
 *
 * `null` is a REAL value here and compares normally: a session that resolves
 * to no lesson while the unscoped page resolved to one is precisely the
 * disagreement worth correcting.
 */
export function shouldRefetchScopedHistory(input: {
  sessionId: string | null | undefined
  /** Key reported by /api/sessions. `undefined` = not reported. */
  sessionLessonKey: string | null | undefined
  /** Key /api/sessions/history says it scoped the returned page by. */
  historyLessonKey: string | null | undefined
}): boolean {
  if (!input.sessionId) return false
  if (input.sessionLessonKey === undefined) return false
  return input.sessionLessonKey !== (input.historyLessonKey ?? null)
}

// ── PCD-004A: WHICH TAB IS THIS SESSION'S CONVERSATION? ────────────────────
//
// PCD-004 gave each SESSION its own lesson pointer, which fixes two sessions.
// It cannot separate two TABS that resolve to the SAME session — and they do,
// because `/api/sessions` resumes the most recent ACTIVE session for the user
// and nothing in that predicate distinguishes one tab from another. Tab 2 then
// opens a different lesson, moves the shared session's pointer, and tab 1's
// next turn follows it. From the server both look identical to one learner
// navigating, so no server-only rule can tell them apart: this needs a client
// identity, and that is the ONLY thing introduced here.
//
// WHY A CLAIM AND NOT A FILTER. Resuming strictly by tab id would mean a tab
// that is closed and reopened matches nothing and loses the 24h conversation —
// a regression on "normal continuation must still work", because a per-tab id
// necessarily dies with the tab. So the tab id is a PREFERENCE, applied in
// three steps (chooseResumableSession): the same tab's own session first, then
// any session no OTHER LIVE tab is holding, and only then a new one. A
// reopened tab finds its old session unclaimed and takes it over; a second
// tab opened alongside a live one does not.
//
// LIVENESS WITHOUT A HEARTBEAT. `seenAt` is refreshed by the writes the tab
// already makes — the lesson-init pointer write and every chat turn — so there
// is no new endpoint, no polling, and an abandoned claim simply ages out.

/** How long a tab's claim on a session survives without any activity from it.
 *  Comfortably longer than a learner reading a long explanation between turns,
 *  and far shorter than the 24h resume window it sits inside. */
export const TAB_CLAIM_TTL_MS = 15 * 60 * 1000

export const SESSION_TAB_OWNER_KEY = 'tabOwner'

export interface SessionTabOwner {
  tabId: string
  /** ISO timestamp of the last activity from that tab. */
  seenAt: string
}

/** Total and forgiving, exactly like readSessionLessonPointer: any malformed
 *  shape reads as "unowned", which falls through to today's behaviour. */
export function readSessionTabOwner(snapshot: unknown): SessionTabOwner | null {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) return null
  const raw = (snapshot as Record<string, unknown>)[SESSION_TAB_OWNER_KEY]
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const tabId = (raw as Record<string, unknown>).tabId
  const seenAt = (raw as Record<string, unknown>).seenAt
  if (typeof tabId !== 'string' || tabId.trim() === '') return null
  if (typeof seenAt !== 'string' || Number.isNaN(Date.parse(seenAt))) return null
  return { tabId: tabId.trim(), seenAt }
}

/** Claim/refresh delta. `null` tabId writes nothing, so a caller with no tab
 *  identity (an older client) never clears someone else's claim. */
export function sessionTabOwnerDelta(tabId: string | null | undefined, now: Date): Record<string, unknown> {
  const id = typeof tabId === 'string' && tabId.trim() !== '' ? tabId.trim() : null
  if (!id) return {}
  return { [SESSION_TAB_OWNER_KEY]: { tabId: id, seenAt: now.toISOString() } satisfies SessionTabOwner }
}

/** Is another tab still actively holding this session? An unowned session, a
 *  session this same tab owns, and a claim older than the TTL are all "no". */
export function isClaimedByAnotherTab(input: {
  snapshot: unknown
  tabId: string | null | undefined
  now: Date
}): boolean {
  const owner = readSessionTabOwner(input.snapshot)
  if (!owner) return false
  const mine = typeof input.tabId === 'string' ? input.tabId.trim() : ''
  if (mine && owner.tabId === mine) return false
  const age = input.now.getTime() - Date.parse(owner.seenAt)
  return age >= 0 && age < TAB_CLAIM_TTL_MS
}

export interface ResumeCandidate {
  id: string
  contextSnapshot: unknown
}

export type ResumeChoiceReason =
  /** This tab's own session — a refresh, or the same tab returning. */
  | 'same-tab'
  /** Nobody live is holding it: an unowned session, or a claim that aged out. */
  | 'unclaimed'
  /** Every candidate is held by another live tab. */
  | 'create-new'

/**
 * THE RESUME RULE. Pure: the route supplies the candidates (already scoped to
 * this user and subject by the query) and this decides which, if any, to take.
 *
 * Candidates MUST arrive newest-first — the same ordering the route's own
 * query applies — because tiers 1 and 2 both take the first match.
 *
 * With no tab id (an older client, or any non-browser caller) every candidate
 * reads as unclaimed and the first is chosen, which is exactly the
 * pre-PCD-004A behaviour: resume the most recent session.
 */
export function chooseResumableSession(input: {
  candidates: readonly ResumeCandidate[]
  tabId: string | null | undefined
  now: Date
}): { session: ResumeCandidate | null; reason: ResumeChoiceReason } {
  const mine = typeof input.tabId === 'string' && input.tabId.trim() !== '' ? input.tabId.trim() : null

  // NO TAB IDENTITY ⇒ NO PREFERENCE, so claims must not exclude anything and
  // the most recent session is resumed exactly as before PCD-004A. This is not
  // a rare path: an older client sends nothing, and `getTabId()` returns null
  // whenever storage is unavailable (private mode). Without this guard every
  // such request fell through to `create-new` and made a NEW session on every
  // load — the precise regression this rule exists to avoid. Caught by
  // sessionTabIdentity.test.ts, which held this module's own documented
  // contract against its behaviour.
  if (!mine) {
    const first = input.candidates[0]
    return first ? { session: first, reason: 'unclaimed' } : { session: null, reason: 'create-new' }
  }

  const own = input.candidates.find((c) => readSessionTabOwner(c.contextSnapshot)?.tabId === mine)
  if (own) return { session: own, reason: 'same-tab' }

  const free = input.candidates.find((c) =>
    !isClaimedByAnotherTab({ snapshot: c.contextSnapshot, tabId: mine, now: input.now }))
  if (free) return { session: free, reason: 'unclaimed' }

  return { session: null, reason: 'create-new' }
}
