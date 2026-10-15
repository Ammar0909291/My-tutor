/**
 * Learning lifecycle: the subject introduction is shown once per subject, and a
 * studied concept offers Resume or Restart. Restart resets exactly one
 * concept for one learner, atomically.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { shouldShowPrelude } from '@/lib/curriculum/subjectPrelude'
import { restartConcept, conceptLessonKeys } from '@/lib/teaching/conceptRestart'

const SCREEN = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')
const ROUTE = readFileSync('src/app/api/learn/concept-restart/route.ts', 'utf8')
const SUBJ = 'physics'
const VIEWED = '2026-10-01T10:00:00.000Z'

// ── Subject introduction ─────────────────────────────────────────────────────
describe('subject introduction gate', () => {
  it('1. first entry into a subject shows it', () => {
    expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: null, progressKnown: true })).toBe(true)
  })
  it('2/3/4. once completed it never returns — return visits, lesson changes and refreshes all read the stored timestamp', () => {
    for (let i = 0; i < 5; i++) {
      expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: VIEWED, progressKnown: true })).toBe(false)
    }
  })
  it('a failed or unsuccessful progress load is unknown, not "never completed" (the replay root cause)', () => {
    expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: undefined, progressKnown: false })).toBe(false)
  })
  it('5. subjects are independent', () => {
    expect(shouldShowPrelude({ subjectSlug: 'chemistry', preludeViewedAt: null, progressKnown: true })).toBe(true)
    expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: VIEWED, progressKnown: true })).toBe(false)
  })
  it('7. an introduction never completed is offered again (existing recovery); an explicit replay always shows', () => {
    expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: null, progressKnown: true })).toBe(true)
    expect(shouldShowPrelude({ subjectSlug: SUBJ, preludeViewedAt: VIEWED, replayRequested: true })).toBe(true)
  })
  it('6. LessonScreen: known-ness is set only by a successful load of THIS subject; dismissal is keyed by subject', () => {
    expect(SCREEN).toMatch(/setCurriculumProgress\(progress\)\n\s+setProgressLoadedFor\(subjectSlug\)/)
    expect(SCREEN).toMatch(/progressKnown: progressLoadedFor === subjectSlug/)
    expect(SCREEN).toMatch(/const preludeDismissed = preludeDismissedFor === subjectSlug/)
    expect(SCREEN).toMatch(/setPreludeDismissedFor\(subjectSlug\)/)
    expect(SCREEN).not.toMatch(/setPreludeDismissed\(/)
  })
})

// ── An in-memory model of the rows a restart touches ─────────────────────────
type Row = Record<string, unknown>
function makeDb() {
  const state = {
    sessions: [
      { id: 's1', userId: 'u1', subject: 'physics' },
      { id: 's2', userId: 'u1', subject: 'chemistry' },
      { id: 's3', userId: 'u2', subject: 'physics' },
    ],
    messages: [
      { id: 'm1', sessionId: 's1', lessonKey: 'phys.a' },
      { id: 'm2', sessionId: 's1', lessonKey: 'lesson:3' },
      { id: 'm3', sessionId: 's1', lessonKey: 'phys.b' },
      { id: 'm4', sessionId: 's2', lessonKey: 'phys.a' },
      { id: 'm5', sessionId: 's3', lessonKey: 'phys.a' },
    ] as Row[],
    topicProgress: [
      { userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.a', status: 'MASTERED', masteryPct: 100, attempts: 4 },
      { userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.b', status: 'MASTERED', masteryPct: 90, attempts: 2 },
      { userId: 'u2', subjectSlug: 'physics', topicSlug: 'phys.a', status: 'MASTERED', masteryPct: 100, attempts: 1 },
    ] as Row[],
    conceptMastery: [
      { userId: 'u1', conceptId: 'phys.a' }, { userId: 'u1', conceptId: 'phys.b' }, { userId: 'u2', conceptId: 'phys.a' },
    ] as Row[],
    ebMastery: [{ userId: 'u1', conceptId: 'phys.a' }, { userId: 'u1', conceptId: 'phys.b' }] as Row[],
    evidence: [
      { userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.a' }, { userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.b' },
    ] as Row[],
    studentProgress: [
      { userId: 'u1', subjectCode: 'physics', completedLessons: [1, 2, 3], isCompleted: false, completedAt: null, preludeViewedAt: VIEWED },
    ] as Row[],
    attempts: [
      { id: 'a1', userId: 'u1', subjectSlug: 'physics', lessonKey: 'lesson:3', status: 'COMPLETED', startedAt: new Date(0) },
    ] as Row[],
  }
  let failAt: string | null = null
  const match = (r: Row, w: Row) => Object.entries(w).every(([k, v]) => r[k] === v)
  const tx = () => {
    const guard = (name: string) => { if (failAt === name) throw new Error(`boom:${name}`) }
    return {
      message: {
        deleteMany: async ({ where }: { where: { lessonKey: { in: string[] }; session: { userId: string; subject: { slug: string } } } }) => {
          guard('message')
          const ids = new Set(state.sessions.filter((x) => x.userId === where.session.userId && x.subject === where.session.subject.slug).map((x) => x.id))
          const before = state.messages.length
          state.messages = state.messages.filter((m) => !(ids.has(m.sessionId as string) && where.lessonKey.in.includes(m.lessonKey as string)))
          return { count: before - state.messages.length }
        },
      },
      topicProgress: {
        updateMany: async ({ where, data }: { where: Row; data: Row }) => {
          guard('topicProgress')
          state.topicProgress = state.topicProgress.map((r) => (match(r, where) ? { ...r, ...data } : r))
        },
      },
      conceptMasteryRecord: { deleteMany: async ({ where }: { where: Row }) => { guard('conceptMastery'); state.conceptMastery = state.conceptMastery.filter((r) => !match(r, where)) } },
      ebLearnerConceptMastery: { deleteMany: async ({ where }: { where: Row }) => { state.ebMastery = state.ebMastery.filter((r) => !match(r, where)) } },
      evidenceRecord: { deleteMany: async ({ where }: { where: Row }) => { state.evidence = state.evidence.filter((r) => !match(r, where)) } },
      studentProgress: {
        findUnique: async ({ where }: { where: { userId_subjectCode: Row } }) => state.studentProgress.find((r) => match(r, where.userId_subjectCode)) ?? null,
        update: async ({ where, data }: { where: { userId_subjectCode: Row }; data: Row }) => {
          guard('studentProgress')
          state.studentProgress = state.studentProgress.map((r) => (match(r, where.userId_subjectCode) ? { ...r, ...data } : r))
        },
      },
      lessonAttempt: {
        findFirst: async ({ where }: { where: Row }) => state.attempts.find((r) => match(r, where)) ?? null,
        update: async ({ where, data }: { where: Row; data: Row }) => { state.attempts = state.attempts.map((r) => (r.id === where.id ? { ...r, ...data } : r)) },
        create: async ({ data }: { data: Row }) => { guard('attempt'); state.attempts.push({ id: `a${state.attempts.length + 1}`, startedAt: new Date(), ...data }) },
      },
    }
  }
  const db = {
    async $transaction<T>(fn: (t: unknown) => Promise<T>): Promise<T> {
      const snapshot = structuredClone(state)
      try { return await fn(tx()) } catch (e) { Object.assign(state, snapshot); throw e }
    },
  }
  return { db, state, failNext: (name: string | null) => { failAt = name } }
}

const ARGS = { userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.a', lessonOrder: 3, lessonTitle: 'A' }

describe('Restart: one concept, one learner, all or nothing', () => {
  it('concept keys cover both message-key forms', () => {
    expect(conceptLessonKeys({ topicSlug: 'phys.a', lessonOrder: 3 }).sort()).toEqual(['lesson:3', 'phys.a'])
  })

  it('1/2/3. resets the concept\'s mastery, chat, evidence and completion; opens a fresh attempt', async () => {
    const { db, state } = makeDb()
    const r = await restartConcept(db, ARGS)
    expect(r.messagesDeleted).toBe(2)
    expect(state.messages.map((m) => m.id).sort()).toEqual(['m3', 'm4', 'm5'])
    expect(state.topicProgress.find((t) => t.userId === 'u1' && t.topicSlug === 'phys.a')).toMatchObject({ status: 'NOT_STARTED', masteryPct: 0, attempts: 0 })
    expect(state.conceptMastery).not.toContainEqual({ userId: 'u1', conceptId: 'phys.a' })
    expect(state.ebMastery).toEqual([{ userId: 'u1', conceptId: 'phys.b' }])
    expect(state.evidence).toEqual([{ userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.b' }])
    expect(state.studentProgress[0].completedLessons).toEqual([1, 2])
    const open = state.attempts.filter((a) => a.lessonKey === 'lesson:3' && a.status === 'IN_PROGRESS')
    expect(open).toHaveLength(1) // the D-0a gate no longer reads the COMPLETED attempt as current
  })

  it('5/6. other concepts, other subjects, other learners and the subject introduction are untouched', async () => {
    const { db, state } = makeDb()
    await restartConcept(db, ARGS)
    expect(state.topicProgress.find((t) => t.topicSlug === 'phys.b')).toMatchObject({ status: 'MASTERED', masteryPct: 90 })
    expect(state.topicProgress.find((t) => t.userId === 'u2')).toMatchObject({ status: 'MASTERED', masteryPct: 100 })
    expect(state.conceptMastery).toContainEqual({ userId: 'u2', conceptId: 'phys.a' })
    expect(state.studentProgress[0].preludeViewedAt).toBe(VIEWED)
  })

  it('7/9. a repeated or concurrent restart converges on the same state', async () => {
    const { db, state } = makeDb()
    await restartConcept(db, ARGS)
    const after = structuredClone(state)
    await restartConcept(db, ARGS)
    expect(state.messages).toEqual(after.messages)
    expect(state.topicProgress).toEqual(after.topicProgress)
    expect(state.studentProgress).toEqual(after.studentProgress)
    expect(state.attempts.filter((a) => a.status === 'IN_PROGRESS')).toHaveLength(1)
  })

  it('8. a failure part-way rolls everything back — chat is never cleared while mastery survives', async () => {
    for (const step of ['topicProgress', 'conceptMastery', 'studentProgress', 'attempt']) {
      const { db, state, failNext } = makeDb()
      const before = structuredClone(state)
      failNext(step)
      await expect(restartConcept(db, ARGS)).rejects.toThrow()
      expect(state).toEqual(before)
    }
  })

  it('refuses a request with no concept identity', async () => {
    const { db } = makeDb()
    await expect(restartConcept(db, { userId: 'u1', subjectSlug: 'physics' })).rejects.toThrow()
  })

  it('route: authenticated learner only, scoped to session.user.id, success only after the transaction', () => {
    expect(ROUTE).toMatch(/if \(!session\?\.user\?\.id\) return NextResponse\.json\(\{ success: false, error: 'Unauthorized' \}, \{ status: 401 \}\)/)
    expect(ROUTE).toMatch(/restartConcept\(prisma, \{ userId: session\.user\.id, \.\.\.body \}\)/)
    expect(ROUTE).toMatch(/success: false, error: 'Restart failed' \}, \{ status: 500 \}/)
  })
})

// ── The Resume / Restart choice in the UI ────────────────────────────────────
describe('Resume / Restart gate (LessonScreen)', () => {
  it('1. the choice is offered only for a concept with history (resume/review), never for a first start', () => {
    expect(SCREEN).toMatch(/const isResume = previewEntryMode === 'resume' \|\| previewEntryMode === 'review'/)
    expect(SCREEN).toMatch(/\{isResume && previewLesson && \(\n\s+<div data-testid="concept-continue-choice"/)
    expect(SCREEN).toMatch(/\{isResume && previewLesson && \(\n\s+<button\n\s+data-testid="concept-restart-btn"/)
  })
  it('2/3. Resume is the existing non-destructive start path and is blocked while a restart is in flight', () => {
    expect(SCREEN).toMatch(/data-testid="concept-resume-btn"\n\s+disabled=\{conceptRestart\.busy\}/)
    expect(SCREEN).toMatch(/if \(conceptRestartInFlightRef\.current\) return\n\s+setConceptRestart\(\{ busy: false, error: false \}\)/)
  })
  it('Restart: server reset first, screen cleared and lesson-init `restart` only after success; failure reports and changes nothing', () => {
    const fn = SCREEN.slice(SCREEN.indexOf('const restartConceptFromGate'), SCREEN.indexOf('}, [sessionId, subjectSlug, callLessonInit, clearLessonMcqState])'))
    const reset = fn.indexOf("fetch('/api/learn/concept-restart'")
    const check = fn.indexOf('if (!res.ok || !data?.success) throw')
    const clear = fn.indexOf('setMessages([])')
    const init = fn.indexOf("callLessonInit(sessionId, 'restart', lesson)")
    expect(reset).toBeGreaterThan(0)
    expect(check).toBeGreaterThan(reset)
    expect(clear).toBeGreaterThan(check)
    expect(init).toBeGreaterThan(clear)
    expect(fn).toMatch(/catch \{\n\s+setConceptRestart\(\{ busy: false, error: true \}\)/)
    expect(fn).toMatch(/if \(!sessionId \|\| conceptRestartInFlightRef\.current\) return/)
    expect(fn).toMatch(/progressGenerationRef\.current \+= 1/)
  })
})
