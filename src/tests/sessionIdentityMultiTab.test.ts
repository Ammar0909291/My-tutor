/**
 * A — MULTI-TAB SESSION IDENTITY. A CHARACTERIZATION FILE, NOT A FIX.
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
  it('the POST schema accepts only subject/memory/chapter', () => {
    const schema = SESSIONS.slice(SESSIONS.indexOf('const createSchema = z.object({'))
      .slice(0, SESSIONS.slice(SESSIONS.indexOf('const createSchema = z.object({')).indexOf('});') + 3)
    expect(schema).toContain('subjectSlug')
    // documents current behaviour: no discriminator of any kind
    expect(schema).not.toMatch(/topicSlug|lessonOrder|lessonKey|clientId|tabId/)
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
    expect(tab2.slug).toBe(tab1.slug)   // ← the defect, and it is unfixable HERE
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
  it('sessionStorage is used for UI state only, never for session identity', () => {
    const hits = [
      'src/lib/hooks/useDraftMessage.ts',
      'src/lib/hooks/useLastLesson.ts',
      'src/components/system/ConnectionRecovery.tsx',
    ].map(read).join('\n')
    expect(hits).toMatch(/sessionStorage/)
    // none of them mints or stores anything the session routes read
    expect(SESSIONS).not.toMatch(/sessionStorage|clientId|tabId/)
    expect(SCREEN).not.toMatch(/clientId|tabId/)
  })
})
