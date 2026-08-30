/**
 * R5 — re-certifying an already-COMPLETED concept.
 *
 * THE CLAIM UNDER TEST was that a concept at topic_progress.status=COMPLETED
 * "cannot be cleanly re-certified" because the route returns a cached
 * completion instead of running the ladder.
 *
 * MEASURED AGAINST PRODUCTION, and the claim does not hold for the
 * certification path. `chem.equil.le-chatelier` sat at status=COMPLETED with
 * attempts=10, and on 2026-08-26 13:43 the QA harness re-ran it to a full
 * OBSERVE→…→TRANSFER ladder with conceptsMastered ["chem.equil.le-chatelier"]
 * and budgetExhaustions=0. The mechanism already exists and the harness
 * already uses it: `phase-d-learning-loop.ts` opens every lesson with
 * `mode: 'restart'`.
 *
 * lesson-init/route.ts:309-315 is the rule:
 *
 *   const isReteach = mode === 'restart' || mode === 'review'
 *   const reason = latest === null            ? 'first-start'
 *     : latest.status === 'COMPLETED' && isReteach ? `re-open for mode=${mode}`
 *     : null
 *   if (reason) { openLessonAttempt(...); attemptIsFreshStart = mode !== 'resume' }
 *
 * So NO new QA-only mechanism is warranted, and none is added. This file pins
 * the four properties the certification contract depends on, so the behaviour
 * cannot regress silently — which is the real risk, given that a previous
 * measurement round was invalidated by exactly this area.
 */
import { describe, it, expect } from 'vitest'
import { clearTransientStateForNewAttempt } from '@/lib/teaching/attemptIsolation'
import { lessonAttemptStartDecision } from '@/lib/teaching/lessonAttempt'
import { applyTopicProgressEvidence, type TopicProgressDb } from '@/lib/teaching/topicProgressEvidence'

const SRC = require('fs').readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8') as string
const HARNESS = require('fs').readFileSync('scripts/qa/phase-d-learning-loop.ts', 'utf8') as string

// ── 1 · a completed concept under a NORMAL mode stays cached ────────────────

describe('completed concept + normal mode remains completed/cached', () => {
  // The reteach rule moved out of lesson-init into the pure
  // `lessonAttemptStartDecision` when restart-over-an-abandoned-attempt was
  // fixed. Asserting the behaviour is strictly stronger than the regex on
  // source text it replaces; the wiring check below keeps lesson-init honest.
  it('only restart and review count as a re-teach', () => {
    for (const m of ['restart', 'review'] as const) {
      expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, m).freshStart).toBe(true)
    }
    for (const m of ['resume', 'next'] as const) {
      expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, m).reason).toBeNull()
    }
    expect(SRC).toMatch(/lessonAttemptStartDecision/)
  })

  it("a COMPLETED attempt is re-opened ONLY for a re-teach mode", () => {
    // `next` and `resume` fall through to `null` — no attempt is opened, so
    // the completion stands and nothing is cleared.
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'restart').reason)
      .toContain('re-open')
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'next').reason).toBeNull()
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'resume').reason).toBeNull()
  })

  it('resume never triggers a fresh start even when an attempt opens', () => {
    // Including the case where resume DOES open a row (latest === null): the
    // row is opened so the duration is recorded, and nothing is cleared.
    expect(lessonAttemptStartDecision(null, 'resume'))
      .toMatchObject({ reason: 'first-start', freshStart: false })
    for (const st of ['COMPLETED', 'IN_PROGRESS'] as const) {
      expect(lessonAttemptStartDecision({ status: st }, 'resume').freshStart).toBe(false)
    }
  })
})

// ── 2 · an explicit certification mode genuinely re-runs the ladder ─────────

describe('completed concept + restart genuinely executes the ladder', () => {
  it('the transient stores are cleared, so the ladder starts from zero', () => {
    const delta = clearTransientStateForNewAttempt()
    // the ladder itself
    expect(delta).toHaveProperty('conversationState')
    expect(delta.conversationState).toBeNull()
    // and the pending question, so a stale MCQ cannot grade the first reply
    expect(delta).toHaveProperty('pendingMcq')
    expect(delta.pendingMcq).toBeNull()
  })

  it('the clear is gated on a fresh start, not on every lesson open', () => {
    expect(SRC).toMatch(/attemptIsFreshStart \? clearTransientStateForNewAttempt\(\) : \{\}/)
  })

  it('the QA harness already uses the certification mode', () => {
    expect(HARNESS).toMatch(/open\(cookie, sessionId, lesson, 'restart'\)/)
  })
})

// ── 3 · it cannot be reached by accident ────────────────────────────────────

describe('certification mode cannot be triggered by normal learner flow', () => {
  it('mode is a closed enum — an arbitrary string is rejected', () => {
    expect(SRC).toMatch(/mode: z\.enum\(\['restart', 'review', 'resume', 'next'\]\)/)
  })

  it('the default lesson-advance path is not a re-teach mode', () => {
    // `next` is the ordinary forward path and is deliberately absent from
    // isReteach, so simply moving to the next lesson can never clear a ladder.
    for (const st of ['COMPLETED', 'IN_PROGRESS'] as const) {
      const d = lessonAttemptStartDecision({ status: st }, 'next')
      expect(d.reason).toBeNull()
      expect(d.freshStart).toBe(false)
    }
  })
})

// ── 4 · re-certification cannot corrupt or downgrade real progress ─────────

describe('certification never downgrades a certified topic', () => {
  /**
   * Models the REAL database for a certified topic: the guarded updateMany
   * matches nothing (its `status: { notIn: CERTIFIED }` excludes the row), and
   * the fallback create hits the unique constraint because the row does exist.
   * An earlier draft let create() succeed, which is a state Postgres cannot be
   * in — and it made the module look like it returned 'applied'.
   */
  const dbWith = (status: string, calls: string[]): TopicProgressDb => ({
    topicProgress: {
      async updateMany() { calls.push('updateMany'); return { count: 0 } },
      async create() {
        calls.push('create')
        throw Object.assign(new Error('Unique constraint failed'), { code: 'P2002' })
      },
      async findUnique() { calls.push('findUnique'); return { status } },
    },
  })

  it('conversational evidence is LOCKED out of a COMPLETED topic', async () => {
    const calls: string[] = []
    const r = await applyTopicProgressEvidence(dbWith('COMPLETED', calls), {
      userId: 'u', subjectSlug: 'physics', topicSlug: 'phys.therm.heat-engines',
      score: 25, eventId: 'evt-1',
    })
    expect(r).toBe('locked')
    // it looked, rather than assuming — the distinction between "certified"
    // and "duplicate event" is only visible on the row itself
    expect(calls).toContain('findUnique')
  })

  it('and out of a MASTERED topic', async () => {
    const calls: string[] = []
    const r = await applyTopicProgressEvidence(dbWith('MASTERED', calls), {
      userId: 'u', subjectSlug: 'physics', topicSlug: 'phys.therm.heat-engines',
      score: 25, eventId: 'evt-2',
    })
    expect(r).toBe('locked')
  })

  it('the guarded update itself excludes certified rows', () => {
    const mod = require('fs').readFileSync('src/lib/teaching/topicProgressEvidence.ts', 'utf8') as string
    expect(mod).toMatch(/status: \{ notIn: CERTIFIED \}/)
    expect(mod).toMatch(/const CERTIFIED = \['MASTERED', 'COMPLETED'\]/)
  })
})
