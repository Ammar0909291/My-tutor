/**
 * A session close is not a filler turn.
 *
 * Live-reproduced 2026-08-22 against production. The learner typed
 * "I'm done for today." and received:
 *
 *   "Let me ask you something concrete about Newton's First Law — Inertia:
 *    what's one thing you notice or find surprising about what we just
 *    covered?"
 *
 * Everything upstream was correct — detectExplicitFinishRequest fired,
 * forceClosing set the episode to CLOSING, buildAffectCloseBlock was injected,
 * and nothing was graded. The stop was then undone at the last step by the
 * filler-turn repair, because a correct close has exactly the shape that
 * repair is built to catch: no explanation, no question, no new content —
 * which is precisely what the close directive ORDERS.
 *
 * This is the third recorded instance of the same failure: the better the
 * model obeys a directive, the more likely this repair overwrites it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { shouldRepairFillerTurn } from '@/lib/teaching/lessonCompletion'
import {
  detectExplicitFinishRequest, forceClosing, buildAffectCloseBlock,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'

const episode = (over: Partial<SessionEpisode> = {}): SessionEpisode => ({
  startedAt: new Date(0).toISOString(), phase: 'CORE', visibleFailures: 0,
  retroWinOwed: false, openingSatisfied: true, ...over,
})

describe('an explicit stop is not overwritten by the filler repair', () => {
  it('the close directive orders the very shape the repair treats as filler', () => {
    // The collision, asserted from both sides so neither can drift alone.
    const close = buildAffectCloseBlock()
    expect(close).toMatch(/do NOT introduce new content, new questions/i)
    expect(close).toMatch(/close warmly in ~2 sentences/i)
  })

  it('the reported utterance still reaches CLOSING', () => {
    expect(detectExplicitFinishRequest("I'm done for today.")).toBe(true)
    expect(forceClosing(episode()).phase).toBe('CLOSING')
  })

  it('no filler repair on a CLOSING turn', () => {
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false, closingTurn: true,
    })).toBe(false)
  })

  it('the repair still fires on an ordinary mid-lesson filler turn', () => {
    // The negative control: this fix must not disable the repair generally.
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false, closingTurn: false,
    })).toBe(true)
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false,
    })).toBe(true)
  })

  it('the pre-existing gates are unchanged', () => {
    expect(shouldRepairFillerTurn({
      lessonCompleted: true, respectsNewIntent: false, closingTurn: false,
    })).toBe(false)
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: true, closingTurn: false,
    })).toBe(false)
  })

  it('the route passes the episode phase into the predicate', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain("closingTurn: sessionEpisodeHoisted?.phase === 'CLOSING'")
  })
})
