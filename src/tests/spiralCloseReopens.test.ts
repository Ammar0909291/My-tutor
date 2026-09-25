/**
 * Owner-approved 2026-09-25: a spiral close reopens on an authored right answer;
 * an explicit close never does; a model-invented grade never spends the budget.
 * Measured: free-body diagram / normal force / tension / friction synthetic runs.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { applySignalToEpisode, forceClosing, type SessionEpisode } from '@/lib/teaching/sessionLifecycle'

const core: SessionEpisode = { startedAt: '2026-09-25T00:00:00.000Z', phase: 'CORE', visibleFailures: 0, retroWinOwed: false, openingSatisfied: true }
const wrong = { correctness: false }
const right = { correctness: true }
const opts = { isFirstLesson: false }

describe('spiral close', () => {
  it('two graded misses close the episode and record why', () => {
    const e = applySignalToEpisode(applySignalToEpisode(core, wrong, opts), wrong, opts)
    expect(e.phase).toBe('CLOSING')
    expect(e.closedBy).toBe('spiral')
  })
  it('an AUTHORED right answer reopens a spiral close', () => {
    const closed = applySignalToEpisode(applySignalToEpisode(core, wrong, opts), wrong, opts)
    const e = applySignalToEpisode(closed, right, { ...opts, authoredGrade: true })
    expect(e.phase).toBe('CORE')
    expect(e.visibleFailures).toBe(0)
    expect(e.closedBy).toBeUndefined()
  })
  it('an unauthored right answer does not reopen it', () => {
    const closed = applySignalToEpisode(applySignalToEpisode(core, wrong, opts), wrong, opts)
    expect(applySignalToEpisode(closed, right, { ...opts, authoredGrade: false }).phase).toBe('CLOSING')
  })
})

describe('explicit close stays absolute', () => {
  it('"I\'m done" closes for good, even on a later authored right answer', () => {
    const e = applySignalToEpisode(forceClosing(core), right, { ...opts, authoredGrade: true })
    expect(e.phase).toBe('CLOSING')
    expect(e.closedBy).toBe('explicit')
  })
  it('an explicit stop during a spiral close upgrades it to explicit', () => {
    const closed = applySignalToEpisode(applySignalToEpisode(core, wrong, opts), wrong, opts)
    const e = applySignalToEpisode(forceClosing(closed), right, { ...opts, authoredGrade: true })
    expect(e.phase).toBe('CLOSING')
  })
  it('an episode written before closedBy existed stays closed (as before)', () => {
    const legacy: SessionEpisode = { ...core, phase: 'CLOSING', visibleFailures: 2 }
    expect(applySignalToEpisode(legacy, right, { ...opts, authoredGrade: true }).phase).toBe('CLOSING')
  })
})

describe('route wiring', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('a grade against a model-invented key does not reach the affect budget', () => {
    expect(route).toContain('const unauthoredGradeThisTurn = mcqGradeHoisted !== null && !gradedAgainstServerKeyHoisted')
    expect(route).toMatch(/applySignalToEpisode\(sessionEpisodeHoisted, signalForBudget, \{\s*isFirstLesson: resolvedFirstLessonActive,\s*authoredGrade: gradedAgainstServerKeyHoisted,/)
  })
})

describe('held-question answer leak (owner-approved 2026-09-25, option A)', () => {
  it('the production acceleration reply loses the sentence that states the held answer', async () => {
    const { dropAnswerLeaks } = await import('@/lib/teaching/gateAssessment')
    const held = {
      question: 'Acceleration is defined as the rate of change of which quantity?',
      options: ['Velocity — so a change of direction counts as an acceleration even at constant speed', 'Speed', 'Position', 'Distance travelled'],
      correctIndex: 0,
    }
    const text = 'The exam will focus on the core ideas we’ve been practicing, so understanding acceleration — how velocity changes with time — is definitely important.'
    const out = dropAnswerLeaks(text, held as never, 'Acceleration')
    expect(out.dropped.length).toBe(1)
  })
})
