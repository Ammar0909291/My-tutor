import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { lessonKeyFor } from '@/lib/teaching/lessonAttempt'

/**
 * EACH LESSON MUST HAVE ITS OWN COMPLETELY SEPARATE HISTORY.
 *
 * ── ROOT CAUSE ───────────────────────────────────────────────────────────────
 * Traced the full lifecycle: lesson open -> message creation -> visual
 * association -> history persistence -> history API -> history hydration ->
 * LessonScreen state.
 *
 * `LearnSession` is (learner x chat session) — resumed for up to 24h and able
 * to span SEVERAL lessons (a documented, deliberate fact: see the model
 * comment on `LessonAttempt`). `/api/sessions/history` scoped its query only
 * by (userId, subject), so EVERY message the learner had ever written in that
 * subject — across every lesson — came back as one undifferentiated
 * "WhatsApp-style" thread. A diagram or MCQ from Lesson 1 reappeared inside
 * Lesson 2's screen on refresh, because no per-message fact was narrow enough
 * to exclude it. The LIVE, same-session case (switching lessons without a
 * refresh) was already correct — every transition path already calls
 * `setMessages([])` (see lessonTransition.test.ts's structural-lock suite) —
 * so the leak was specifically a REFRESH/RE-LOGIN defect.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────────
 * A new `Message.lessonKey` column (additive, nullable) stamps every message
 * with the SAME stable identity `LessonAttempt.lessonKey` already uses
 * (`lessonKeyFor()`, reused — not a second lesson-identity scheme).
 * `/api/sessions/history` resolves the CURRENT lesson key SERVER-SIDE, from
 * `StudentProgress` (`activeLessonSlug` prioritized over `currentLesson`,
 * matching `selectCurrentLesson()`'s own priority order everywhere else this
 * pair is read together), and filters by it. Deliberately NOT a client-
 * supplied query param: the client's own copy of "which lesson am I on"
 * (`curriculumProgress`) is fetched by an independent effect on an
 * independent timer, so trusting it would race; resolving fresh from the DB
 * inside the SAME request has no such race and cannot be spoofed.
 *
 * ── WHAT THIS SUITE PROVES ───────────────────────────────────────────────────
 * LessonScreen.tsx and the API routes need a live database to execute for
 * real — this sandbox has none (no DATABASE_URL). Every assertion below is
 * either a pure-function test of the actual identity logic (no DB needed:
 * `lessonKeyFor` itself), or a source assertion pinning the EXACT wiring —
 * matching this repo's established pattern for routes that need a database
 * (see completedLessonIsReEnterable.test.ts, gateAssessmentRouteWiring.test.ts).
 * Anti-vacuity throughout: assertions pin literal where-clause/data shapes
 * and the actual resolved key values, not merely "the word lessonKey appears
 * somewhere".
 */

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')

// ── PURE LOGIC: the identity itself, and what makes two lessons distinct ────

describe('lesson identity — the actual scoping fact (anti-vacuity)', () => {
  it('Lesson A and Lesson B (by order) resolve to different, non-null keys', () => {
    const a = lessonKeyFor({ lessonOrder: 1 })
    const b = lessonKeyFor({ lessonOrder: 2 })
    expect(a).not.toBeNull()
    expect(b).not.toBeNull()
    expect(a).not.toBe(b)
  })

  it('Lesson A and Lesson B (by topic slug) resolve to different, non-null keys', () => {
    const a = lessonKeyFor({ topicSlug: 'phys.mech.free-body-diagram' })
    const b = lessonKeyFor({ topicSlug: 'phys.mech.newtons-second-law' })
    expect(a).not.toBeNull()
    expect(b).not.toBeNull()
    expect(a).not.toBe(b)
  })

  it('the SAME lesson resolves to the SAME key every time — deterministic, not positional', () => {
    const first = lessonKeyFor({ topicSlug: 'phys.mech.free-body-diagram', lessonOrder: 6 })
    const second = lessonKeyFor({ topicSlug: 'phys.mech.free-body-diagram', lessonOrder: 6 })
    expect(first).toBe(second)
  })

  it('activeLessonSlug wins over currentLesson — a review of an earlier lesson keys by the slug being reviewed, not the furthest-progress counter', () => {
    // The exact shape lesson-init produces for a REVIEW: activeLessonSlug
    // moved backward to the lesson being revised, currentLesson (monotonic,
    // never lowered) still pointing at the furthest lesson reached.
    const reviewing = lessonKeyFor({ topicSlug: 'phys.mech.free-body-diagram', lessonOrder: 12 })
    const furthest = lessonKeyFor({ lessonOrder: 12 })
    expect(reviewing).not.toBe(furthest)
    expect(reviewing).toBe('phys.mech.free-body-diagram')
  })
})

// ── SCHEMA — the column and its migration actually exist ────────────────────

describe('Message.lessonKey — schema', () => {
  const SCHEMA = read('prisma/schema.prisma')

  it('Message has a nullable lessonKey column with an index', () => {
    const modelStart = SCHEMA.indexOf('model Message {')
    const modelEnd = SCHEMA.indexOf('\n}', modelStart)
    const body = SCHEMA.slice(modelStart, modelEnd)
    expect(body).toMatch(/lessonKey\s+String\?/)
    expect(body).toContain('@@index([lessonKey])')
  })

  it('a migration exists that adds the column and its index', () => {
    const sql = read('prisma/migrations/20260813090000_message_lesson_key/migration.sql')
    expect(sql).toMatch(/ALTER TABLE "messages" ADD COLUMN "lessonKey" TEXT/)
    expect(sql).toMatch(/CREATE INDEX .*"lessonKey"/)
  })
})

// ── WRITE SIDE — every message-creation path stamps lessonKey ───────────────

describe('write side: /api/learn/chat stamps both turns with lessonKey', () => {
  const SRC = read('src/app/api/learn/chat/route.ts')

  it('the USER message is created BEFORE studentProgress resolves, then stamped via update once it does', () => {
    const createIdx = SRC.indexOf('userMessageRow = await withRetry(() => prisma.message.create(')
    const promiseAllIdx = SRC.indexOf('const [curriculumLessons, studentProgress')
    const updateIdx = SRC.indexOf('await prisma.message.update({\n            where: { id: userMessageRow.id }')
    expect(createIdx).toBeGreaterThan(-1)
    expect(promiseAllIdx).toBeGreaterThan(createIdx)
    expect(updateIdx).toBeGreaterThan(promiseAllIdx)
  })

  it('the update is AWAITED, not fire-and-forget — a serverless invocation can be reclaimed before an un-awaited write lands', () => {
    const updateBlockStart = SRC.indexOf('if (userMessageRow) {')
    const updateBlockEnd = SRC.indexOf('let lessonCtx: LessonContext | null = null', updateBlockStart)
    const block = SRC.slice(updateBlockStart, updateBlockEnd)
    expect(block).toContain('await prisma.message.update(')
  })

  it('the assistant message is stamped inline at creation, using the same helper', () => {
    const createIdx = SRC.indexOf('assistantMessage = await withRetry(() => prisma.message.create({\n          data: {')
    const block = SRC.slice(createIdx, createIdx + 400)
    expect(block).toContain('...(assistantLessonKey ? { lessonKey: assistantLessonKey } : {})')
  })

  it('both stamps resolve the SAME shape — activeLessonSlug prioritized over currentLesson, never a client-supplied value', () => {
    const occurrences = [
      ...SRC.matchAll(/lessonKeyFor\(\{ topicSlug: studentProgress\?\.activeLessonSlug \?\? null, lessonOrder: studentProgress\?\.currentLesson \?\? null \}\)/g),
    ]
    expect(occurrences).toHaveLength(2)
  })

  it('never trusts a request-body field for lesson identity on this route', () => {
    // The only inputs to lessonKeyFor on THIS route's message-stamping calls
    // must be studentProgress fields — never `body.lessonKey`,
    // `body.topicSlug`, or similar, which would let the client claim any
    // lesson it likes. Scoped to the two stamping variables specifically
    // (not the three pre-existing LessonAttempt-keying call sites elsewhere
    // in this file, which intentionally use lessonCtx instead).
    const stampCalls = [
      ...SRC.matchAll(/const (?:userLessonKey|assistantLessonKey) = lessonKeyFor\((\{[^}]*\})\)/g),
    ]
    expect(stampCalls).toHaveLength(2)
    for (const m of stampCalls) {
      expect(m[1]).toContain('studentProgress')
      expect(m[1]).not.toContain('body.')
    }
  })
})

describe('write side: /api/learn/lesson-init stamps the opening message', () => {
  const SRC = read('src/app/api/learn/lesson-init/route.ts')

  it('stamps using the validated request body directly — topicSlug/lessonOrder, the exact values just upserted into StudentProgress', () => {
    expect(SRC).toMatch(/const openingLessonKey = lessonKeyFor\(\{ topicSlug, lessonOrder \}\)/)
  })

  it('the create call includes the stamp', () => {
    const createIdx = SRC.indexOf('await prisma.message.create({\n      data: {\n        sessionId, role: MessageRole.ASSISTANT')
    const block = SRC.slice(createIdx, createIdx + 300)
    expect(block).toContain('...(openingLessonKey ? { lessonKey: openingLessonKey } : {})')
  })

  it('the stamp is computed before the write it feeds', () => {
    const stampIdx = SRC.indexOf('const openingLessonKey = lessonKeyFor(')
    const writeIdx = SRC.indexOf('await prisma.message.create({\n      data: {\n        sessionId, role: MessageRole.ASSISTANT')
    expect(stampIdx).toBeGreaterThan(-1)
    expect(writeIdx).toBeGreaterThan(stampIdx)
  })
})

// ── READ SIDE — both restore paths scope to the resolved lesson ─────────────

describe('read side: /api/sessions/history scopes by the resolved lesson', () => {
  const SRC = read('src/app/api/sessions/history/route.ts')

  it('resolves lessonKey from StudentProgress before building the query, activeLessonSlug prioritized', () => {
    expect(SRC).toMatch(/lessonKeyFor\(\{ topicSlug: sp\.activeLessonSlug, lessonOrder: sp\.currentLesson \}\)/)
    const resolveIdx = SRC.indexOf('let lessonKey: string | null = null')
    const whereIdx = SRC.indexOf('const where = {')
    expect(resolveIdx).toBeGreaterThan(-1)
    expect(whereIdx).toBeGreaterThan(resolveIdx)
  })

  it('the where clause includes lessonKey when resolved, and is genuinely omitted (not forced null) otherwise', () => {
    expect(SRC).toContain('...(lessonKey ? { lessonKey } : {})')
    // Anti-vacuity: this is NOT `lessonKey: lessonKey` (which would filter to
    // `lessonKey: null` — an artificially empty page — for an unscoped
    // learner) and it is a single `where` object reused by BOTH query paths
    // below, so both inherit the same scoping automatically.
    expect(SRC).not.toMatch(/lessonKey:\s*lessonKey,/)
  })

  it('the SAME where object (with its lessonKey scoping) is reused by the provider-column retry fallback — one query definition, not two', () => {
    const whereDeclIdx = SRC.indexOf('const where = {')
    const primaryQueryIdx = SRC.indexOf('prisma.message.findMany({\n      where,')
    const fallbackQueryIdx = SRC.indexOf('prisma.message.findMany({\n        where,')
    expect(whereDeclIdx).toBeGreaterThan(-1)
    expect(primaryQueryIdx).toBeGreaterThan(whereDeclIdx)
    expect(fallbackQueryIdx).toBeGreaterThan(whereDeclIdx)
  })

  it('never trusts a client-supplied lesson parameter — resolution reads only the DB row', () => {
    const searchParamsBlock = SRC.slice(SRC.indexOf('searchParams.get'), SRC.indexOf('let lessonKey'))
    expect(searchParamsBlock).not.toMatch(/searchParams\.get\(['"]lesson/)
  })
})

describe('read side: /api/sessions POST resumed-session fallback also scopes by lesson', () => {
  const SRC = read('src/app/api/sessions/route.ts')

  it('resolves resumeLessonKey BEFORE the existing-session lookup, same StudentProgress priority', () => {
    expect(SRC).toMatch(/lessonKeyFor\(\{ topicSlug: sp\.activeLessonSlug, lessonOrder: sp\.currentLesson \}\)/)
    const resolveIdx = SRC.indexOf('let resumeLessonKey: string | null = null')
    const lookupIdx = SRC.indexOf('const existingSession = await dbCall')
    expect(resolveIdx).toBeGreaterThan(-1)
    expect(lookupIdx).toBeGreaterThan(resolveIdx)
  })

  it('the nested messages include is filtered by it, not merely capped by count', () => {
    const includeIdx = SRC.indexOf('messages: {\n          where: resumeLessonKey')
    expect(includeIdx).toBeGreaterThan(-1)
    const block = SRC.slice(includeIdx, includeIdx + 200)
    expect(block).toContain('resumeLessonKey ? { lessonKey: resumeLessonKey } : undefined')
  })
})

// ── LIVE, SAME-SESSION ISOLATION — pre-existing, verified still intact ──────

describe('live in-session isolation (pre-existing, must remain true)', () => {
  const SRC = read('src/components/learn/LessonScreen.tsx')

  it('completeAndAdvance (Next Lesson) still clears messages before starting the next lesson', () => {
    const start = SRC.indexOf('const completeAndAdvance = useCallback')
    const end = SRC.indexOf('completeAndAdvanceRef.current = completeAndAdvance', start)
    expect(SRC.slice(start, end)).toContain('setMessages([])')
  })

  it('confirmLessonSwitch (restart/review/skip-ahead) still clears messages before opening the target lesson', () => {
    const start = SRC.indexOf('const confirmLessonSwitch = useCallback')
    const body = SRC.slice(start, start + 400)
    expect(body).toContain('setMessages([])')
  })
})
