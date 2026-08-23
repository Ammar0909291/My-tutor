/**
 * A stop must not be answered with a question.
 *
 * Live-reproduced 2026-08-23 (real-student acceptance, physics / Newton's
 * First Law): the learner typed "i'm done for today, thanks" and received a
 * tappable four-option graded question about a ball on a frictionless surface.
 *
 * The stop was detected, the episode was forced to CLOSING and the close block
 * — "do NOT introduce new content, new questions, or another attempt" — was
 * injected. The question was attached after all of it, by the gate, which had
 * no idea the session was ending.
 *
 * These tests pin the whole chain, not just the new predicate: if the detector
 * stops matching, or the route stops consulting the predicate at EITHER
 * question source, this file fails.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { detectExplicitFinishRequest, forceClosing, type SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import { closingTurnWithholdsQuestion } from '@/lib/teaching/gateAssessment'

const episode = (): SessionEpisode => ({
  phase: 'CORE', startedAt: 0, lastTurnAt: 0, visibleFailures: 0, retroWinOwed: false,
} as unknown as SessionEpisode)

describe('a CLOSING turn withholds every question', () => {
  it('withholds on CLOSING and on nothing else', () => {
    expect(closingTurnWithholdsQuestion('CLOSING')).toBe(true)
    for (const phase of ['CORE', 'OPENING', undefined, null, '']) {
      expect(closingTurnWithholdsQuestion(phase)).toBe(false)
    }
  })

  it('the exact live phrasing reaches CLOSING', () => {
    // The trailing ", thanks" is what made this different from the phrasing
    // the earlier F2 work verified; it matches, so detection was never the bug.
    expect(detectExplicitFinishRequest("i'm done for today, thanks")).toBe(true)
    expect(forceClosing(episode()).phase).toBe('CLOSING')
    expect(closingTurnWithholdsQuestion(forceClosing(episode()).phase)).toBe(true)
  })

  it('the route consults it at BOTH question sources', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

    // Source 1 — the server-attached authored gate probe. Must be part of
    // gateEligible, so no probe is selected AND none is spent.
    const gate = src.slice(src.indexOf('const gateEligible ='), src.indexOf('if (gateEligible && memoryState)'))
    expect(gate).toContain('closingTurnWithholdsQuestion(sessionEpisodeHoisted?.phase)')

    // Source 2 — the model's own MCQ tag, emitted against the close block.
    const at = src.indexOf('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    expect(at).toBeGreaterThan(0)
    const assign = src.slice(at, at + 900)
    expect(assign).toContain('if (closingTurnWithholdsQuestion(sessionEpisodeHoisted?.phase)) mcqHoisted = null')
  })
})
