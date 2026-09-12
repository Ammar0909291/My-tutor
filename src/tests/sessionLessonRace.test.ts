/**
 * T1 — PCD-004 REPRODUCTION, DRIVEN THROUGH THE REAL CHAT ROUTE.
 *
 * ── WHAT THIS EXECUTES, AND WHAT IT DOES NOT ───────────────────────────────
 * It executes the real `POST` from @/app/api/learn/chat/route against the real
 * chemistry Knowledge Graph, twice, as two different sessions belonging to ONE
 * account whose shared StudentProgress row is CONTAMINATED — its
 * `activeLessonSlug` names session B's lesson, exactly as it would after B's
 * lesson-init upsert overwrote A's.
 *
 * It does NOT execute /api/learn/lesson-init's HTTP handler: that route needs a
 * model call, a session, an authed user and a subject, and this repository has
 * no harness for it (the same limitation completedLessonIsReEnterable.test.ts
 * records and labels honestly). The two halves are covered instead by:
 *   · the WRITE half — sessionLessonPointer.test.ts drives the REAL
 *     writeSnapshotDelta with the REAL delta and reads it back;
 *   · the WIRING — asserted against lesson-init's own source at the bottom of
 *     this file, which is what catches the failure mode that actually occurs
 *     here (a missing call, not a logic error).
 *
 * ── WHY THE TWO SESSIONS SHARE ONE studentProgress ─────────────────────────
 * That IS the defect. StudentProgress is @@unique([userId, subjectCode]), so
 * both sessions read the same row; before this fix that row was the ONLY input
 * to lesson resolution and the later writer won for both.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { SESSION_LESSON_POINTER_KEY } from '@/lib/teaching/sessionLessonPointer'
import { readFileSync } from 'fs'
import path from 'path'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

// Two real chemistry KG lessons with different orders, so a swap is visible as
// a number and not only as a slug. These stand in for the audit's 111 / 121.
const LESSON_A = { slug: 'chem.found.pure-substances', order: 3 }
const LESSON_B = { slug: 'chem.atomic.atomic-spectra', order: 12 }

const pointer = (slug: string) => ({ [SESSION_LESSON_POINTER_KEY]: { topicSlug: slug } })

/**
 * Run ONE turn as `sessionId`, against `snapshot`, while the SHARED
 * StudentProgress row's activeLessonSlug is `contaminatedSlug`.
 * Returns the turn and the snapshot as the route left it.
 */
async function turnAs(opts: {
  sessionId: string
  snapshot: Record<string, unknown>
  contaminatedSlug: string
  /** Seed one message belonging to ANOTHER lesson. The `[history-scope]` line
   *  is only emitted when the scope actually drops something, so a turn with
   *  an empty transcript legitimately logs nothing — seeding a foreign turn is
   *  what makes the resolved key observable, and is closer to the real case. */
  foreignHistoryFor?: string
}): Promise<{ turn: TurnResult; snapshot: Record<string, unknown> }> {
  h.state.messages = opts.foreignHistoryFor
    ? ([{
        id: 'foreign-1', role: 'ASSISTANT',
        content: 'A turn belonging to a different lesson.',
        createdAt: new Date(Date.now() - 20_000),
        lessonKey: opts.foreignHistoryFor,
      }] as never)
    : []
  h.state.snapshot = { ...opts.snapshot }
  h.state.opts.sessionId = opts.sessionId
  // `conceptId` is what the harness's studentProgress fake returns as
  // activeLessonSlug — i.e. the per-user pointer, contaminated by the other
  // session.
  const [turn] = await driveTurns(h, POST, [{
    learnerSays: 'ok, go on',
    modelReplies: 'Here is the next step in this idea.',
  }], { subjectSlug: 'chemistry', conceptId: opts.contaminatedSlug })
  return { turn, snapshot: JSON.parse(JSON.stringify(h.state.snapshot)) }
}

const historyKey = (t: TurnResult) =>
  (readLog(t, '[history-scope]') as { lessonKey?: string } | null)?.lessonKey ?? null
const lessonOrder = (t: TurnResult) => (t.body as { lessonOrder?: number })?.lessonOrder ?? null

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('T1 — two concurrent sessions on one account do not cross-contaminate', () => {
  it('session A teaches A and session B teaches B, from ONE shared StudentProgress row', async () => {
    // B opened its lesson last, so the per-user pointer names B for BOTH.
    const contaminatedSlug = LESSON_B.slug

    const a = await turnAs({
      sessionId: 'session-A', snapshot: pointer(LESSON_A.slug), contaminatedSlug,
    })
    const b = await turnAs({
      sessionId: 'session-B', snapshot: pointer(LESSON_B.slug), contaminatedSlug,
    })

    expect(a.turn.status).toBe(200)
    expect(b.turn.status).toBe(200)

    // THE DEFECT: before this fix A resolved LESSON_B — the observed swap.
    expect(lessonOrder(a.turn)).toBe(LESSON_A.order)
    expect(lessonOrder(b.turn)).toBe(LESSON_B.order)
    expect(lessonOrder(a.turn)).not.toBe(lessonOrder(b.turn))
  })

  it('the swap is visible as a DRIFT check, the audit\'s own measure', async () => {
    // The audit requested 111 and got 121. Requesting A must return A.
    const a = await turnAs({
      sessionId: 'session-A', snapshot: pointer(LESSON_A.slug), contaminatedSlug: LESSON_B.slug,
    })
    const drift = lessonOrder(a.turn) !== LESSON_A.order
    expect(drift).toBe(false)
  })

  it('the contamination is reported, not silent', async () => {
    const a = await turnAs({
      sessionId: 'session-A', snapshot: pointer(LESSON_A.slug), contaminatedSlug: LESSON_B.slug,
    })
    const log = readLog(a.turn, '[lesson-pointer]') as
      { resolved?: string; studentProgress?: string; source?: string } | null
    expect(log).not.toBeNull()
    expect(log?.resolved).toBe(LESSON_A.slug)
    expect(log?.studentProgress).toBe(LESSON_B.slug)
    expect(log?.source).toBe('session')
  })
})

describe('T2 — the message stamp, the prompt history scope and the screen filter agree', () => {
  it('all three derive from the SAME resolved lesson in session A', async () => {
    const a = await turnAs({
      sessionId: 'session-A', snapshot: pointer(LESSON_A.slug),
      contaminatedSlug: LESSON_B.slug, foreignHistoryFor: LESSON_B.slug,
    })
    // The prompt-history scope's key IS the message-stamp key — route.ts uses
    // one expression for both, and lessonKeyFor returns the slug verbatim.
    expect(historyKey(a.turn)).toBe(LESSON_A.slug)

    // The screen filter (/api/sessions/history) resolves through the SAME
    // exported resolver; that it is wired there is asserted below by source,
    // and its behaviour is covered in sessionLessonPointer.test.ts.
    const src = readFileSync(
      path.join(process.cwd(), 'src/app/api/sessions/history/route.ts'), 'utf8')
    expect(src).toContain('resolveSessionLessonSlug')
    expect(src).toContain("searchParams.get('sessionId')")
  })

  it('and on the SAME shared row, session B\'s three agree on B', async () => {
    const b = await turnAs({
      sessionId: 'session-B', snapshot: pointer(LESSON_B.slug),
      contaminatedSlug: LESSON_B.slug, foreignHistoryFor: LESSON_A.slug,
    })
    expect(historyKey(b.turn)).toBe(LESSON_B.slug)
    expect(lessonOrder(b.turn)).toBe(LESSON_B.order)
  })
})

describe('T3 — cross-session transcript isolation', () => {
  it('the prompt history is scoped to the session\'s OWN lesson key', async () => {
    const a = await turnAs({
      sessionId: 'session-A', snapshot: pointer(LESSON_A.slug), contaminatedSlug: LESSON_B.slug,
    })
    const scope = readLog(a.turn, '[history-scope]') as { lessonKey?: string } | null
    // When the scope logs at all it must name A. When nothing was dropped it
    // does not log — which is also correct, and is why the assertion is
    // conditional rather than requiring a log that has no reason to exist.
    if (scope) expect(scope.lessonKey).toBe(LESSON_A.slug)
    expect(historyKey(a.turn) ?? LESSON_A.slug).toBe(LESSON_A.slug)
  })

  it('a foreign-lesson message in the session is dropped from A\'s prompt', async () => {
    h.state.snapshot = pointer(LESSON_A.slug)
    h.state.opts.sessionId = 'session-A'
    h.state.messages = [
      { id: 'old-1', role: 'USER', content: 'what is an emission line?', createdAt: new Date(Date.now() - 10_000) },
      { id: 'old-2', role: 'ASSISTANT', content: 'An emission line appears when an electron falls to a lower level.', createdAt: new Date(Date.now() - 9_000) },
    ].map((m) => ({ ...m, lessonKey: LESSON_B.slug })) as never
    const [turn] = await driveTurns(h, POST, [{
      learnerSays: 'ok, go on', modelReplies: 'Next step.',
    }], { subjectSlug: 'chemistry', conceptId: LESSON_B.slug })
    const scope = readLog(turn, '[history-scope]') as
      { lessonKey?: string; dropped?: number } | null
    expect(scope?.lessonKey).toBe(LESSON_A.slug)
    expect(scope?.dropped ?? 0).toBeGreaterThan(0)
  })
})

describe('T4 — no session pointer ⇒ the pre-PCD-004 behaviour, unchanged', () => {
  it('resolution falls back to StudentProgress.activeLessonSlug exactly as before', async () => {
    const a = await turnAs({ sessionId: 'session-A', snapshot: {}, contaminatedSlug: LESSON_B.slug })
    expect(a.turn.status).toBe(200)
    expect(lessonOrder(a.turn)).toBe(LESSON_B.order)
    expect(historyKey(a.turn) ?? LESSON_B.slug).toBe(LESSON_B.slug)
    // and nothing is reported, because nothing diverged
    expect(readLog(a.turn, '[lesson-pointer]')).toBeNull()
  })

  it('T6 — a MALFORMED session pointer also falls back, and the turn still serves', async () => {
    for (const bad of [
      { [SESSION_LESSON_POINTER_KEY]: 'a-bare-string' },
      { [SESSION_LESSON_POINTER_KEY]: {} },
      { [SESSION_LESSON_POINTER_KEY]: { topicSlug: '' } },
      { [SESSION_LESSON_POINTER_KEY]: null },
    ]) {
      const a = await turnAs({
        sessionId: 'session-A', snapshot: bad as Record<string, unknown>,
        contaminatedSlug: LESSON_B.slug,
      })
      expect(a.turn.status).toBe(200)
      expect(lessonOrder(a.turn)).toBe(LESSON_B.order)
    }
  })
})

describe('the writer is wired (source assertions — a missing CALL is the failure mode)', () => {
  const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), 'utf8')

  it('lesson-init persists the session pointer through the versioned writer', () => {
    const src = read('src/app/api/learn/lesson-init/route.ts')
    expect(src).toContain('sessionLessonPointerDelta(topicSlug)')
    expect(src).toContain('writeSnapshotDelta(prisma, {')
    // and it must sit inside the SAME block as the per-user write, so the two
    // pointers can never move apart — see that block's own comment.
    const pointerAt = src.indexOf('sessionLessonPointerDelta(topicSlug)')
    const perUserAt = src.indexOf('activeLessonSlug: topicSlug')
    // the FINAL success response — the early 401/400 returns share this prefix
    const flagAt = src.indexOf('activeLessonPersisted,\n    })')
    expect(perUserAt).toBeGreaterThan(-1)
    expect(pointerAt).toBeGreaterThan(perUserAt)
    expect(pointerAt).toBeLessThan(flagAt)
  })

  it('a failed session-pointer write does NOT claim persistence (requirement 7)', () => {
    const src = read('src/app/api/learn/lesson-init/route.ts')
    const at = src.indexOf('sessionLessonPointerDelta(topicSlug)')
    const after = src.slice(at, at + 1400)
    expect(after).toContain('activeLessonPersisted = false')
  })

  it('lesson completion clears the session pointer', () => {
    const src = read('src/app/api/curriculum/progress/route.ts')
    expect(src).toContain('clearSessionLessonPointer')
    // on EVERY completion, not only inside the !mastered skip branch
    const clearAt = src.indexOf('clearSessionLessonPointer')
    const skipAt = src.indexOf('if (!mastered && isNewCompletion)')
    expect(skipAt).toBeGreaterThan(-1)
    expect(clearAt).toBeLessThan(skipAt)
  })

  it('the placement downgrade clears the session pointer alongside activeLessonSlug', () => {
    const src = read('src/app/api/learn/chat/route.ts')
    const at = src.indexOf('data: { currentLesson: lowered, activeLessonSlug: null }')
    expect(at).toBeGreaterThan(-1)
    expect(src.slice(at, at + 1400)).toContain('clearSessionLessonPointerFn(prisma, sessionId)')
    // awaited, not fire-and-forget: a frozen serverless instance must not be
    // able to drop it (the lesson-init dropped-write lesson).
    expect(src.slice(at, at + 1400)).toContain('await clearSessionLessonPointerFn(')
  })

  it('currentLesson ownership is untouched — still exactly two writers', () => {
    const chat = read('src/app/api/learn/chat/route.ts')
    const prog = read('src/app/api/curriculum/progress/route.ts')
    expect(prog).toContain('Math.max((existing?.currentLesson ?? 1), completedLesson + 1)')
    expect(chat).toContain('data: { currentLesson: lowered, activeLessonSlug: null }')
  })
})
