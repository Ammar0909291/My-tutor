/**
 * A — MULTI-TAB SESSION IDENTITY.
 *
 * ── STATUS: THE DEFECT THIS FILE CHARACTERIZED IS NOW FIXED (PCD-004A) ─────
 * This file was written while A was escalated, and its tests deliberately
 * ASSERTED THE DEFECT so the escalation was checkable against the code. The
 * decision that closed it — a per-tab id used as a resume PREFERENCE — has
 * landed, so the two assertions that named the missing discriminator have
 * flipped, exactly as this header predicted they would. Each keeps its
 * original assertion verbatim in a dated comment rather than being deleted,
 * and now asserts the same property against the new shape.
 *
 * The three FACTS below are still true and still worth pinning: the defect was
 * never a resolver bug, and fact 3 in particular (navigation reuses its
 * session) is why the fix had to land at session RESUME rather than at lesson
 * open. sessionTabIdentity.test.ts covers the rule itself.
 *
 * PCD-004 moved the lesson pointer to the SESSION, which fixes two concurrent
 * sessions. It does not — and structurally cannot — separate two tabs that
 * resolve to the SAME LearnSession, and this file pins exactly why, so the
 * escalation in the report is checkable against the code rather than asserted.
 *
 * ── THE THREE FACTS THAT COMPOSE INTO THE DEFECT ───────────────────────────
 *  1. /api/sessions POST accepts NO lesson identity and NO client identity.
 *  2. Its resume predicate is (userId, subjectId, ACTIVE, <24h, has an
 *     ASSISTANT message) — nothing distinguishes one tab from another.
 *  3. LessonScreen's navigation (callLessonInit) always reuses the sessionId
 *     it was given; it never asks for a different session.
 * So tab 2 resumes tab 1's session, then moves that session's lesson pointer,
 * and tab 1's next turn legitimately follows it.
 *
 * ── WHY NO FIX IS ATTEMPTED HERE ───────────────────────────────────────────
 * From the server's side, "tab 2 opened a different lesson" and "the learner
 * navigated to a different lesson" are byte-identical requests. Separating
 * them needs per-client identity, which does not exist anywhere in this
 * codebase (sessionStorage is used only for drafts/last-lesson/reconnect UI —
 * never for session identity), and choosing its lifetime decides whether
 * closing a tab ends a resumable 24h session. That is a product-level
 * session-identity decision, so it is REPORTED, not guessed.
 *
 * TESTS MARKED "documents current behaviour" ASSERT THE DEFECT. When A is
 * fixed they are expected to flip, and that is the point of them.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { resolveSessionLessonSlug, sessionLessonPointerDelta, SESSION_LESSON_POINTER_KEY }
  from '@/lib/teaching/sessionLessonPointer'

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), 'utf8')
const SESSIONS = read('src/app/api/sessions/route.ts')
const SCREEN = read('src/components/learn/LessonScreen.tsx')
const LESSON_INIT = read('src/app/api/learn/lesson-init/route.ts')

describe('fact 1 — session creation carries no lesson and no client identity', () => {
  it('the POST schema carries a CLIENT identity but still no lesson identity', () => {
    // ORIGINAL ASSERTION (while A was escalated, 2026-09-12), kept verbatim:
    //   expect(schema).not.toMatch(/topicSlug|lessonOrder|lessonKey|clientId|tabId/)
    // PCD-004A added exactly ONE discriminator — `tabId` — because separating
    // two tabs is impossible without a client identity. The half that must
    // stay true is that the route still takes no LESSON identity from the
    // client: the lesson is resolved server-side, never claimed by the caller.
    const start = SESSIONS.indexOf('const createSchema = z.object({')
    const schema = SESSIONS.slice(start, SESSIONS.indexOf('});', start) + 3)
    expect(schema).toContain('subjectSlug')
    expect(schema).toContain('tabId: z.string().min(1).max(64).optional()')
    expect(schema).not.toMatch(/topicSlug|lessonOrder|lessonKey/)
  })
})

describe('fact 2 — the resume predicate cannot tell two tabs apart', () => {
  it('resumeWhere is scoped by user + subject + status + age + has-assistant only', () => {
    const at = SESSIONS.indexOf('const resumeWhere = {')
    expect(at).toBeGreaterThan(-1)
    const block = SESSIONS.slice(at, SESSIONS.indexOf('};', at) + 2)
    expect(block).toContain('userId: session.user.id')
    expect(block).toContain('subjectId: subject.id')
    expect(block).toContain('status: "ACTIVE"')
    expect(block).toContain('startedAt: { gte: cutoff }')
    expect(block).toContain('role: "ASSISTANT"')
    // documents current behaviour: nothing per-tab, nothing per-lesson
    expect(block).not.toMatch(/clientId|tabId|lessonKey|topicSlug/)
  })

  it('OWNERSHIP IS NOT THE WEAK LINK — userId is in the predicate, so no cross-account resume', () => {
    const at = SESSIONS.indexOf('const resumeWhere = {')
    const block = SESSIONS.slice(at, SESSIONS.indexOf('};', at) + 2)
    expect(block).toContain('userId: session.user.id')
    // and the handler refuses an unauthenticated caller before any of this
    expect(SESSIONS).toMatch(/if \(!session\?\.user\?\.id\) return NextResponse\.json\(\s*\{ success: false, error: "Unauthorized" \}/)
  })
})

describe('fact 3 — navigation never asks for a different session', () => {
  it('callLessonInit posts to lesson-init with the sessionId it was handed', () => {
    const at = SCREEN.indexOf('const callLessonInit = useCallback(async (')
    expect(at).toBeGreaterThan(-1)
    const body = SCREEN.slice(at, at + 1200)
    expect(body).toContain("fetch('/api/learn/lesson-init'")
    expect(body).toContain('sessionId: sid')
    // documents current behaviour: no re-negotiation of the session on switch
    expect(body).not.toContain("fetch('/api/sessions'")
  })

  it('and lesson-init moves the pointer of whatever session it is given', () => {
    expect(LESSON_INIT).toContain('sessionLessonPointerDelta(topicSlug)')
    // it takes the session from the request body and never re-derives one
    expect(LESSON_INIT).toContain('sessionId,')
  })
})

describe('the composed consequence, stated as behaviour', () => {
  it('ONE session pointer means one lesson — a second tab on that session inherits it', () => {
    // Two tabs, ONE session: there is a single snapshot, so there is a single
    // answer. This is not a resolver bug — the resolver is behaving correctly.
    const snapshot: Record<string, unknown> = {}
    Object.assign(snapshot, sessionLessonPointerDelta('phys.meas.dimensions'))   // tab 1 opens
    Object.assign(snapshot, sessionLessonPointerDelta('phys.mech.kinematics-1d')) // tab 2 opens
    const tab1 = resolveSessionLessonSlug({ sessionSnapshot: snapshot, activeLessonSlug: null })
    const tab2 = resolveSessionLessonSlug({ sessionSnapshot: snapshot, activeLessonSlug: null })
    expect(tab1.slug).toBe('phys.mech.kinematics-1d')
    // Still true, and still not fixable HERE — which is the point. One session
    // has one pointer, so the fix had to stop two tabs from SHARING a session
    // (chooseResumableSession) rather than teach the resolver to answer twice.
    expect(tab2.slug).toBe(tab1.slug)
  })

  it('whereas two SESSIONS keep two pointers — which is what PCD-004 already fixed', () => {
    const sessionA: Record<string, unknown> = { ...sessionLessonPointerDelta('phys.meas.dimensions') }
    const sessionB: Record<string, unknown> = { ...sessionLessonPointerDelta('phys.mech.kinematics-1d') }
    // the per-user pointer is contaminated by whoever wrote last
    const contaminated = 'phys.mech.kinematics-1d'
    expect(resolveSessionLessonSlug({ sessionSnapshot: sessionA, activeLessonSlug: contaminated }).slug)
      .toBe('phys.meas.dimensions')
    expect(resolveSessionLessonSlug({ sessionSnapshot: sessionB, activeLessonSlug: contaminated }).slug)
      .toBe('phys.mech.kinematics-1d')
    expect(sessionA[SESSION_LESSON_POINTER_KEY]).not.toEqual(sessionB[SESSION_LESSON_POINTER_KEY])
  })
})

describe('no per-client identity exists to build on', () => {
  it('per-client identity now exists, in ONE place, and is not a credential', () => {
    // ORIGINAL ASSERTION (while A was escalated, 2026-09-12), kept verbatim:
    //   expect(SESSIONS).not.toMatch(/sessionStorage|clientId|tabId/)
    //   expect(SCREEN).not.toMatch(/clientId|tabId/)
    // That was the finding that forced the escalation: there was nothing to
    // build on. PCD-004A introduced exactly one mechanism, tabIdentity.ts.
    const hits = [
      'src/lib/hooks/useDraftMessage.ts',
      'src/lib/hooks/useLastLesson.ts',
      'src/components/system/ConnectionRecovery.tsx',
    ].map(read).join('\n')
    expect(hits).toMatch(/sessionStorage/)

    // exactly one minter, and the routes never read browser storage themselves
    expect(read('src/lib/teaching/tabIdentity.ts')).toMatch(/sessionStorage\.(get|set)Item/)
    expect(SESSIONS).not.toMatch(/sessionStorage/)
    expect(SCREEN).not.toMatch(/sessionStorage\.(get|set)Item/)

    // and it grants nothing: ownership is still decided by the authenticated
    // userId, which remains in the resume predicate
    const at = SESSIONS.indexOf('const resumeWhere = {')
    expect(SESSIONS.slice(at, SESSIONS.indexOf('};', at))).toContain('userId: session.user.id')
  })
})
