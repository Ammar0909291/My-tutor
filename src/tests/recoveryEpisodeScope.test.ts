/**
 * Recovery & Resume — the affect budget must be scoped to the episode.
 *
 * Traced pipeline: failure → recovery detection → recovery state → snapshot →
 * resume → lesson continuation.
 *
 * The divergence this file pins is at the RESUME step. Two counters record the
 * same fact, "failures this session", with different lifetimes:
 *
 *   sessionEpisode.visibleFailures   reset by deriveEpisode at every boundary
 *   contextSnapshot.sessionFailureCount   had no reset anywhere in the codebase
 *
 * A LearnSession row is resumed for up to 24 hours (/api/sessions) while an
 * episode boundary is a 30-minute inactivity gap, so one row — one
 * contextSnapshot, one sessionFailureCount — spans many episodes. The counter
 * therefore carried every previous episode's failures into a fresh one, and it
 * is the counter buildRecoveryBlock() reads to choose an escalation rung.
 *
 * The observable failure: a returning learner's FIRST stumble of a fresh
 * episode is handled as their fifth — "AFFECT BUDGET EXHAUSTED ... close this
 * concept for today" — on the very turn the OPENING block is telling the tutor
 * to open with an engineered win.
 */
import { describe, it, expect } from 'vitest'
import {
  episodeFailureCount,
  deriveEpisode,
  isNewEpisode,
  SESSION_GAP_MS,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'
import { buildRecoveryBlock, detectFailureState } from '@/lib/teaching/recoveryGuard'

// ── The reset rule ───────────────────────────────────────────────────────────

describe('episodeFailureCount — the missing boundary reset', () => {
  it('carries the count forward within an episode', () => {
    expect(episodeFailureCount(0, false)).toBe(0)
    expect(episodeFailureCount(1, false)).toBe(1)
    expect(episodeFailureCount(4, false)).toBe(4)
  })

  it('drops the count at a boundary, however high it got', () => {
    for (const persisted of [1, 2, 4, 9, 100]) {
      expect(episodeFailureCount(persisted, true)).toBe(0)
    }
  })

  it('resets on the same boundary that resets visibleFailures', () => {
    // The two budgets must agree about when a session started. Before the fix
    // deriveEpisode reset one of them and nothing reset the other.
    const spent: SessionEpisode = {
      startedAt: new Date(0).toISOString(),
      phase: 'CORE', visibleFailures: 4, retroWinOwed: false, openingSatisfied: true,
    }
    const boundary = isNewEpisode(0, SESSION_GAP_MS + 1)
    expect(boundary).toBe(true)
    const fresh = deriveEpisode(spent, boundary, SESSION_GAP_MS + 1, null)
    expect(fresh.visibleFailures).toBe(0)
    expect(episodeFailureCount(4, boundary)).toBe(0)
  })

  it('holds both budgets when the gap is under the boundary', () => {
    const running: SessionEpisode = {
      startedAt: new Date(0).toISOString(),
      phase: 'CORE', visibleFailures: 3, retroWinOwed: false, openingSatisfied: true,
    }
    const boundary = isNewEpisode(0, SESSION_GAP_MS - 1)
    expect(boundary).toBe(false)
    expect(deriveEpisode(running, boundary, SESSION_GAP_MS - 1, null).visibleFailures).toBe(3)
    expect(episodeFailureCount(3, boundary)).toBe(3)
  })

  it('is total — a missing or malformed persisted value reads as zero', () => {
    for (const bad of [undefined, null, 'four', NaN, Infinity, -1, {}]) {
      expect(episodeFailureCount(bad, false)).toBe(0)
    }
    expect(episodeFailureCount(2.7, false)).toBe(2)
  })
})

// ── What the counter actually drives ─────────────────────────────────────────

describe('recovery escalation follows the episode-scoped count', () => {
  const rung = (count: number) => buildRecoveryBlock('dont_know', false, count, false)

  it('escalates strictly: base → vary → stop asking → close', () => {
    expect(rung(0)).not.toMatch(/SECOND OCCURRENCE|REPEATED STRUGGLE|AFFECT BUDGET/)
    expect(rung(1)).toMatch(/SECOND OCCURRENCE/)
    expect(rung(2)).toMatch(/REPEATED STRUGGLE/)
    expect(rung(4)).toMatch(/AFFECT BUDGET EXHAUSTED/)
  })

  it('never emits an identical block for two different counts', () => {
    const blocks = [0, 1, 2, 4].map(rung)
    expect(new Set(blocks).size).toBe(blocks.length)
  })

  it('a returning learner\'s first stumble is rung 0, not the terminal rung', () => {
    // Previous episode spent the whole budget.
    const persisted = 4
    const boundary = isNewEpisode(0, SESSION_GAP_MS + 1)
    const scoped = episodeFailureCount(persisted, boundary)

    // The learner returns and says "I don't know" — their first failure today.
    const key = detectFailureState('I don\'t know', null)
    expect(key).toBe('dont_know')

    const block = buildRecoveryBlock(key!, false, scoped, false)
    // The defect: this said "close this concept for today" on turn one.
    expect(block).not.toMatch(/AFFECT BUDGET EXHAUSTED/)
    expect(block).not.toMatch(/Do NOT attempt another explanation/)
    // It must run the ladder from the beginning instead.
    expect(block).toMatch(/validate|shrink/i)
  })

  it('still reaches the terminal rung within one episode', () => {
    // The reset must not make the budget unreachable — four failures with no
    // gap between them still exhaust it.
    let count = episodeFailureCount(0, true)
    for (let i = 0; i < 4; i++) count = episodeFailureCount(count + 1, false)
    expect(count).toBe(4)
    expect(buildRecoveryBlock('dont_know', false, count, false)).toMatch(/AFFECT BUDGET EXHAUSTED/)
  })
})

// ── The route's read/persist cycle, replayed ─────────────────────────────────

/**
 * The route reads the counter at the top of the turn and persists it at the
 * bottom. Both halves matter: a reset held only in memory is undone by the
 * next turn re-reading the stale persisted value, so the persist condition
 * must fire on a boundary turn even when nothing failed.
 *
 * Mirrors route.ts's own expressions:
 *   read     episodeFailureCount(snapshot.sessionFailureCount, episodeBoundary)
 *   persist  (failureThisTurn || episodeBoundary) ? scoped + (failure ? 1 : 0) : keep
 */
function replayTurn(
  persisted: number,
  opts: { gapMs: number; failed: boolean },
): { promptCount: number; persistedAfter: number } {
  const boundary = isNewEpisode(0, opts.gapMs)
  const scoped = episodeFailureCount(persisted, boundary)
  const next = opts.failed ? scoped + 1 : scoped
  const writes = opts.failed || boundary
  return { promptCount: scoped, persistedAfter: writes ? next : persisted }
}

describe('read/persist cycle across a resume', () => {
  const WITHIN = SESSION_GAP_MS - 1
  const AFTER = SESSION_GAP_MS + 1

  it('persists the reset even when the returning turn does not fail', () => {
    // This is the case a failure-only persist condition misses: without it the
    // stale 4 survives in the snapshot and the NEXT turn re-reads it.
    const t1 = replayTurn(4, { gapMs: AFTER, failed: false })
    expect(t1.promptCount).toBe(0)
    expect(t1.persistedAfter).toBe(0)

    const t2 = replayTurn(t1.persistedAfter, { gapMs: WITHIN, failed: true })
    expect(t2.promptCount).toBe(0)      // first failure of the new episode
    expect(t2.persistedAfter).toBe(1)
  })

  it('counts a returning turn that does fail as the episode\'s first', () => {
    const t1 = replayTurn(4, { gapMs: AFTER, failed: true })
    expect(t1.promptCount).toBe(0)      // the block the learner actually got
    expect(t1.persistedAfter).toBe(1)
  })

  it('accumulates normally inside one episode', () => {
    let persistedAfter = 0
    const seen: number[] = []
    for (let i = 0; i < 5; i++) {
      const t = replayTurn(persistedAfter, { gapMs: WITHIN, failed: true })
      seen.push(t.promptCount)
      persistedAfter = t.persistedAfter
    }
    expect(seen).toEqual([0, 1, 2, 3, 4])
    expect(persistedAfter).toBe(5)
  })

  it('leaves the snapshot untouched on an ordinary non-failing turn', () => {
    const t = replayTurn(2, { gapMs: WITHIN, failed: false })
    expect(t.promptCount).toBe(2)
    expect(t.persistedAfter).toBe(2)
  })

  it('a full struggle-leave-return trajectory restarts the ladder once', () => {
    // Four failures, learner leaves, learner returns and stumbles again.
    let persisted = 0
    const rungs: number[] = []
    for (let i = 0; i < 4; i++) {
      const t = replayTurn(persisted, { gapMs: WITHIN, failed: true })
      rungs.push(t.promptCount)
      persisted = t.persistedAfter
    }
    expect(persisted).toBe(4)
    expect(buildRecoveryBlock('dont_know', false, rungs[3], false)).toMatch(/REPEATED STRUGGLE/)

    const back = replayTurn(persisted, { gapMs: AFTER, failed: true })
    expect(back.promptCount).toBe(0)
    expect(back.persistedAfter).toBe(1)
    // and the second stumble after returning escalates again, from the bottom
    const second = replayTurn(back.persistedAfter, { gapMs: WITHIN, failed: true })
    expect(second.promptCount).toBe(1)
  })
})
