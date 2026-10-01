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

/**
 * The opening block was not the whole cause: on the next fresh session the
 * same question got "Not quite yet — there's still a key idea we need to
 * explore" (live, deploy e4727f09). "Is this lesson done?" was read as a
 * genuine question, i.e. NEW intent after completion, so the model answered it.
 * A status question is now answered by the deterministic close.
 */
import { asksWhetherLessonIsDone } from '@/lib/teaching/lessonCompletion'

describe('a question about the lesson\'s own status is not new intent', () => {
  it.each([
    'hi again. is this lesson done?',
    'is this lesson done?',
    'is the lesson finished',
    'am i done?',
    'are we finished now?',
    'did i complete it?',
    'is it over already?',
    'have i finished this?',
  ])('%s', (m) => expect(asksWhetherLessonIsDone(m)).toBe(true))

  it.each([
    'is it complete combustion or incomplete?',
    'why is the reaction complete when the gas escapes?',
    'is a mole done with carbon-12?',
    'what should I study next?',
    'can you give me a practice problem',
  ])('%s', (m) => expect(asksWhetherLessonIsDone(m)).toBe(false))

  it('the route excludes it from new intent', () => {
    expect(ROUTE).toContain('|| (turnIntent.isQuestion && !asksWhetherLessonIsDone(message))')
  })
})
