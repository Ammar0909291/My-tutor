/**
 * A completed lesson was re-opened as if it had never been taught.
 *
 * MEASURED LIVE 2026-10-01 (real account, chem.found.mole-concept, deploy
 * 8f644436): the lesson was mastered and closed. A reload opened a new session,
 * so a fresh episode boundary injected the session-OPENING block ("welcome,
 * recap, objective …") although the runtime knew the lesson was complete
 * (arbitration owner COMPLETE, CUE lessonCompleted true). Asked "is this lesson
 * done?", the tutor answered "No, the lesson isn't finished yet" and started
 * teaching it again. The opening protocol is for a lesson in progress.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('the opening block is never injected on a completed lesson', () => {
  it('the only buildOpeningBlock call is gated on the lesson not being complete', () => {
    const calls = ROUTE.match(/systemPrompt \+= buildOpeningBlock\(/g) ?? []
    expect(calls).toHaveLength(1)
    expect(ROUTE).toContain('if (!lessonCompletedHoisted) systemPrompt += buildOpeningBlock({')
  })

  it('lessonCompletedHoisted is decided before the opening block reads it', () => {
    const decided = ROUTE.indexOf('lessonCompletedHoisted = true')
    const opening = ROUTE.indexOf('if (!lessonCompletedHoisted) systemPrompt += buildOpeningBlock({')
    expect(decided).toBeGreaterThan(0)
    expect(decided).toBeLessThan(opening)
  })
})
