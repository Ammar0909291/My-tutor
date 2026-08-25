/**
 * PHASE 7K TRACK B — opening a lesson must not inherit an old lesson's close.
 *
 * REPRODUCED LIVE (2026-08-25, phys.opt.total-internal-reflection). The lesson
 * was opened through /api/learn/lesson-init after a ~7 hour gap. The FIRST chat
 * turn logged:
 *
 *   [turn-decision] { lifecycle: "CLOSING", … }
 *   [ladder]        { phaseBefore: "GUIDE", … }
 *   [arbitration]   { owner: "CLOSE", denied: [… "AUTHORED_PROBE" …] }
 *
 * on a lesson that had just been opened. "give me a practice problem" returned
 * the close script; "no wait i dont want to stop, i want to practice" returned
 * it again. The learner could not enter their own lesson.
 *
 * MECHANISM: lesson-init writes the opening assistant message, which refreshes
 * the "last message" clock the next chat turn measures inactivity against, so
 * isNewEpisode() reads false however long the learner was away, deriveEpisode
 * returns the PREVIOUS episode verbatim, and its CLOSING phase carries over.
 *
 * THE FIX IS TO STATE, NOT TO ARBITRATION. Close semantics are unchanged and
 * that is asserted below as a negative control.
 */
import { describe, it, expect } from 'vitest'
import {
  clearEpisodeForLessonOpen, deriveEpisode, applySignalToEpisode,
  isNewEpisode, forceClosing, episodeFailureCount, SESSION_GAP_MS,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'

const NOW = Date.parse('2026-08-25T03:21:00.000Z')
const closingEpisode: SessionEpisode = {
  startedAt: '2026-08-24T20:00:00.000Z',
  phase: 'CLOSING',
  visibleFailures: 2,
  retroWinOwed: true,
  openingSatisfied: true,
}

describe('Phase 7K Track B — the exact production trap', () => {
  it('REPRODUCES IT: without the reset, a just-opened lesson inherits CLOSING', () => {
    // lesson-init wrote the opening message one second ago, so the boundary
    // cannot fire even though the learner was away for seven hours.
    const lastMessageAt = NOW - 1_000
    expect(isNewEpisode(lastMessageAt, NOW)).toBe(false)

    const snapshot = { sessionEpisode: closingEpisode, sessionFailureCount: 2 }
    const inherited = deriveEpisode(snapshot.sessionEpisode, false, NOW, null)
    expect(inherited.phase).toBe('CLOSING')          // the defect
    expect(inherited.visibleFailures).toBe(2)
  })

  it('FIXES IT: after the delta is merged, the same turn starts at OPENING', () => {
    // The delta is MERGED by writeSnapshotDelta, which is the column's single
    // sanctioned writer — so the key is retired with an explicit null rather
    // than deleted. This models the merge exactly.
    const merged = { ...{ sessionEpisode: closingEpisode, sessionFailureCount: 2 }, ...clearEpisodeForLessonOpen() }
    const prev = (merged.sessionEpisode && typeof merged.sessionEpisode === 'object')
      ? merged.sessionEpisode as SessionEpisode : null
    const episode = deriveEpisode(prev, false, NOW, null)

    expect(prev).toBeNull()
    expect(episode.phase).toBe('OPENING')
    expect(episode.visibleFailures).toBe(0)
    expect(episodeFailureCount(merged.sessionFailureCount, false)).toBe(0)
  })

  it('retires BOTH failure counters, so the two cannot drift apart', () => {
    const delta = clearEpisodeForLessonOpen()
    expect(delta.sessionEpisode).toBeNull()
    expect(delta.sessionFailureCount).toBe(0)
  })

  it('is a DELTA of exactly two keys — it cannot wipe unrelated snapshot state', () => {
    // The single-writer invariant means anything absent from the delta is
    // preserved by the merge; asserting the delta's exact shape is therefore
    // the real guarantee that memoryContext/visualSession/placement survive.
    expect(Object.keys(clearEpisodeForLessonOpen()).sort()).toEqual(['sessionEpisode', 'sessionFailureCount'])
  })

  it('takes no snapshot argument, so it cannot rewrite the column', () => {
    expect(clearEpisodeForLessonOpen.length).toBe(0)
  })
})

// ── NEGATIVE CONTROLS — close semantics must be exactly as strong as before ──
describe('Phase 7K Track B — close semantics are NOT weakened', () => {
  it('an explicit finish request still closes immediately', () => {
    const fresh = deriveEpisode(null, true, NOW, null)
    expect(forceClosing(fresh).phase).toBe('CLOSING')
  })

  it('a spent affect budget still closes WITHIN the new episode', () => {
    let ep = deriveEpisode(null, true, NOW, null)
    ep = applySignalToEpisode(ep, { correctness: false }, { isFirstLesson: false })
    expect(ep.phase).toBe('CORE')
    ep = applySignalToEpisode(ep, { correctness: false }, { isFirstLesson: false })
    expect(ep.phase).toBe('CLOSING')      // budget 2 still ends the session
  })

  it('lesson one still closes on a single failure', () => {
    let ep = deriveEpisode(null, true, NOW, null)
    ep = applySignalToEpisode(ep, { correctness: false }, { isFirstLesson: true })
    expect(ep.phase).toBe('CLOSING')
  })

  it('forceClosing remains idempotent and never rewinds failures', () => {
    const closed = forceClosing(closingEpisode)
    expect(closed.phase).toBe('CLOSING')
    expect(closed.visibleFailures).toBe(2)
  })

  it('an ordinary mid-lesson turn is untouched — reset only happens on lesson open', () => {
    // No clear() call: a running episode continues exactly as before.
    const running: SessionEpisode = { ...closingEpisode, phase: 'CORE', visibleFailures: 1 }
    expect(deriveEpisode(running, false, NOW, null)).toBe(running)
  })

  it('the real 30-minute boundary still resets on genuine inactivity', () => {
    expect(isNewEpisode(NOW - SESSION_GAP_MS - 1, NOW)).toBe(true)
    expect(deriveEpisode(closingEpisode, true, NOW, null).phase).toBe('OPENING')
  })
})
