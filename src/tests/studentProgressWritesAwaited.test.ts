import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

/**
 * R1, APPLIED TO student_progress — a turn's write to the learner's progress
 * row must not outlive the response.
 *
 * ── THE MEASURED FAILURE (production, 2026-10-02, Vercel runtime log) ───────
 * Mathematics weak-learner QA, one session, lessons opened back to back. The
 * lesson-init that opened math.trig.unit-circle right after a
 * math.geom.pythagorean-theorem turn logged:
 *
 *   Invalid `prisma.studentProgress.upsert()` invocation:
 *   PostgresError { code: "55P03", message: "canceling statement due to lock timeout" }
 *   [lesson-init] activeLessonSlug persist attempt 1 failed, retrying
 *   [lesson-init] activeLessonSlug persist attempt 2 failed, retrying
 *   [lesson-init] activeLessonSlug persist FAILED after retries
 *
 * The pointer stayed on the previous lesson, so every turn of "Unit Circle"
 * was taught — and its evidence recorded — as math.geom.pythagorean-theorem
 * (32 ASSET_SHOWN rows, not one for unit-circle), and the lesson never left
 * GUIDE in 18 turns.
 *
 * ── THE CAUSE ───────────────────────────────────────────────────────────────
 * The chat route's two writes to that same row — the per-turn "auto-save
 * lesson position" upsert and the placement-adjustment update — were
 * fire-and-forget (`.catch(() => {})`, nothing awaiting them). A serverless
 * instance freezes once its response is sent, so the implicit transaction kept
 * the row lock and the learner's NEXT request (here, opening the next lesson)
 * waited out lock_timeout. Exactly R1's shape (topicProgressEvidenceAwaited
 * .test.ts), on a different row.
 *
 * Source assertions, for R1's reason: the defect is a property of the request
 * lifecycle on a frozen serverless instance, which no in-process test reproduces.
 */
const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

describe('student_progress writes are settled before the reply', () => {
  it('no write to student_progress in the chat route is fire-and-forget', () => {
    const writes = [...ROUTE.matchAll(/prisma\.studentProgress\.(upsert|update|updateMany|create)\(/g)]
    expect(writes.length).toBeGreaterThan(0)
    for (const w of writes) {
      const before = ROUTE.slice(Math.max(0, w.index! - 40), w.index!)
      // Every write is either awaited inline or captured for the boundary.
      expect(before).toMatch(/(await\s*|studentProgressWrites\.push\(\s*)$/)
    }
  })

  it('captured writes are total, so settling them can never fail the turn', () => {
    expect(ROUTE).not.toMatch(/prisma\.studentProgress\.(upsert|update)\([\s\S]{0,1500}?\}\)\.catch\(\(\) => \{\}\)/)
    const pushes = ROUTE.split('studentProgressWrites.push(').length - 1
    const totals = ROUTE.match(/\}\)\.then\(\(\) => \{\}, \(\) => \{\}\)\)/g)?.length ?? 0
    expect(pushes).toBe(2)
    expect(totals).toBeGreaterThanOrEqual(pushes)
  })

  it('awaits them at the same response boundary as the topic-progress write', () => {
    const lastPush = ROUTE.lastIndexOf('studentProgressWrites.push(')
    const settle = ROUTE.indexOf('await Promise.all(studentProgressWrites)')
    const r1 = ROUTE.indexOf('await topicProgressEvidenceWrite')
    const reply = ROUTE.indexOf('return NextResponse.json({\n        success: true, text: cleanText, provider,')
    expect(lastPush).toBeGreaterThan(0)
    expect(settle).toBeGreaterThan(lastPush)
    expect(settle).toBeGreaterThan(r1)
    expect(reply).toBeGreaterThan(settle)
  })
})
