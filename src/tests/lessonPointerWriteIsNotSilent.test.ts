/**
 * A FAILED LESSON SWITCH MUST NOT BE SILENT.
 *
 * Measured in production 2026-08-14 on the owner's real account, mid-audit.
 * `lesson-init` is the ONLY writer of `activeLessonSlug`, and the chat route
 * resolves which lesson to teach from that pointer. The write was awaited
 * inside a try/catch that logged and continued — correct in intent, because a
 * learner must never lose their lesson to a bookkeeping write, and precisely
 * why the failure was invisible:
 *
 *     Can't reach database server at ...pooler.supabase.com:6543
 *     Invalid `prisma.studentProgress.upsert()` invocation: Socket timeout
 *     [visual-v2] concept: 'phys.mech.momentum'   <- the OPENED lesson
 *                                                    never became active
 *
 * What a learner experienced:
 *   1. open lesson B  -> lesson B's opening text arrives, looking successful
 *   2. the pointer write fails and is swallowed
 *   3. the NEXT chat turn resolves the OLD lesson and teaches A again
 *
 * Nothing in the response distinguished that from a working switch. This
 * misled the audit itself: a stale figure was briefly read as a visual
 * continuity defect when the real cause was that the lesson had never
 * switched at all.
 *
 * The pooler recovered within seconds on both observations, so a bounded
 * retry is the substance of the fix — the upsert is idempotent, it sets a
 * pointer to a constant. The reported flag is what makes a remaining failure
 * attributable.
 *
 * These tests pin the BEHAVIOUR of the retry policy against the real
 * constants, so a future edit cannot quietly reduce it to one attempt or
 * turn the sleeps into something unbounded.
 */
import { describe, it, expect, vi } from 'vitest'
import fs from 'node:fs'

const SOURCE = fs.readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')

/** Re-implements the loop at the call site against an injectable write. */
async function runPointerWrite(
  write: () => Promise<unknown>,
  attempts: number,
  backoff: readonly number[],
  sleep: (ms: number) => Promise<void>,
): Promise<{ persisted: boolean; calls: number; slept: number[] }> {
  const slept: number[] = []
  let calls = 0
  let persisted = false
  try {
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        calls++
        await write()
        persisted = true
        break
      } catch (err) {
        if (attempt === attempts) throw err
        const ms = backoff[attempt - 1]
        slept.push(ms)
        await sleep(ms)
      }
    }
  } catch {
    /* non-fatal, exactly as the route treats it */
  }
  return { persisted, calls, slept }
}

const ATTEMPTS = 3
const BACKOFF = [100, 250] as const
const noSleep = async () => {}

describe('the retry policy the route actually ships', () => {
  it('declares three attempts and two bounded backoffs', () => {
    expect(SOURCE).toContain('const ACTIVE_LESSON_WRITE_ATTEMPTS = 3')
    expect(SOURCE).toContain('const ACTIVE_LESSON_WRITE_BACKOFF_MS = [100, 250] as const')
  })

  it('reports the outcome to the client', () => {
    expect(SOURCE).toContain('activeLessonPersisted')
    // The flag must be in the success response, not only in a log line.
    // The success payload is now multi-line (it also ships llmCallCount), so
    // the outcome flag is matched across lines rather than on one.
    expect(SOURCE).toMatch(/success: true[\s\S]{0,400}activeLessonPersisted/)
  })

  it('still cannot crash the lesson — the write stays inside a catch', () => {
    expect(SOURCE).toContain('persist FAILED after retries')
  })
})

describe('behaviour under a flapping pooler', () => {
  it('a healthy write costs exactly one attempt and no sleep', async () => {
    const write = vi.fn().mockResolvedValue(undefined)
    const r = await runPointerWrite(write, ATTEMPTS, BACKOFF, noSleep)
    expect(r).toMatchObject({ persisted: true, calls: 1, slept: [] })
  })

  it('recovers when the pooler fails once — the measured case', async () => {
    const write = vi.fn()
      .mockRejectedValueOnce(new Error('Socket timeout'))
      .mockResolvedValue(undefined)
    const r = await runPointerWrite(write, ATTEMPTS, BACKOFF, noSleep)
    expect(r.persisted).toBe(true)
    expect(r.calls).toBe(2)
    expect(r.slept).toEqual([100])
  })

  it('recovers when it fails twice', async () => {
    const write = vi.fn()
      .mockRejectedValueOnce(new Error("Can't reach database server"))
      .mockRejectedValueOnce(new Error('Socket timeout'))
      .mockResolvedValue(undefined)
    const r = await runPointerWrite(write, ATTEMPTS, BACKOFF, noSleep)
    expect(r.persisted).toBe(true)
    expect(r.calls).toBe(3)
    expect(r.slept).toEqual([100, 250])
  })

  it('gives up after three attempts and reports NOT persisted', async () => {
    const write = vi.fn().mockRejectedValue(new Error('Socket timeout'))
    const r = await runPointerWrite(write, ATTEMPTS, BACKOFF, noSleep)
    // The lesson is still delivered — persisted:false is a report, not a throw.
    expect(r.persisted).toBe(false)
    expect(r.calls).toBe(3)
    expect(r.slept).toEqual([100, 250])
  })

  it('never retries a write that succeeded', async () => {
    const write = vi.fn().mockResolvedValue(undefined)
    await runPointerWrite(write, ATTEMPTS, BACKOFF, noSleep)
    expect(write).toHaveBeenCalledTimes(1)
  })

  it('total added delay is bounded and paid only on failure', () => {
    expect(BACKOFF.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(400)
    expect(BACKOFF.length).toBe(ATTEMPTS - 1)
  })
})

describe('one source of truth is preserved', () => {
  it('lesson-init does not write the lesson pointer anywhere else', () => {
    // The chat route resolves the lesson from activeLessonSlug. A second
    // store for the same fact would be a parallel authority, which is exactly
    // what this codebase forbids — the fix had to be reliability, not a
    // fallback copy.
    const writes = SOURCE.match(/activeLessonSlug:/g) ?? []
    // create + update branches of the single upsert, and nothing more.
    expect(writes.length).toBe(2)

    // contextSnapshot IS touched here — but only READ, for `memoryContext`.
    // The property that matters is that the lesson pointer is not ALSO
    // stashed there as a fallback copy, which is what a "make it survive the
    // pooler" fix would reach for first and what would create the second
    // authority. Assert the read, and assert no write.
    expect(SOURCE).toContain('learnSession.contextSnapshot as Record<string, unknown> | null')
    expect(SOURCE).not.toMatch(/contextSnapshot:\s*\{/)
    expect(SOURCE).not.toMatch(/update:[^}]*contextSnapshot/)
  })

  it('currentLesson is still not rewound by opening a lesson', () => {
    // Opening lesson 7 for revision must never lower furthest-progress. The
    // update branch carries only the pointer and the timestamp.
    expect(SOURCE).toContain('update: { activeLessonSlug: topicSlug, lastStudiedAt: new Date() }')
  })
})
