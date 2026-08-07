/**
 * Lesson-entry overlays: the subject prelude and the Start/Resume panel.
 *
 * Reported behaviour: both flashed on screen for ~2s on every lesson change
 * and every page refresh, then vanished on their own — instead of showing
 * once and staying until clicked. And a lesson already in progress still
 * offered "Start Lesson" after a refresh.
 *
 * Root cause of the flash: both gates were asked their question BEFORE the
 * data that answers it had loaded. curriculumProgress is seeded as
 * { currentLesson: 1, completedLessons: [] } with no preludeViewedAt, so
 * isPreludeCompleted(undefined) is false and the prelude gate answered
 * "show" for every learner until the fetch resolved.
 */
import { describe, it, expect } from 'vitest'
import { shouldShowPrelude, isPreludeCompleted } from '@/lib/curriculum/subjectPrelude'
import { decideLessonEntryMode } from '@/lib/curriculum/lessonTransition'
import type { CurriculumLesson, CurriculumProgress, TopicProgressEntry } from '@/lib/curriculum/lessonNavigation'

const SUBJECT = 'physics'
const SLUG = 'phys.meas.units'
const lesson: CurriculumLesson = {
  id: 'p-1-1', subjectCode: SUBJECT, unit: 1, unitTitle: 'Measurement',
  lesson: 1, lessonTitle: 'SI Units and Measurement', lessonGoal: '', order: 1, topicSlug: SLUG,
}
const progress = (p: Partial<CurriculumProgress> = {}): CurriculumProgress =>
  ({ currentLesson: 1, completedLessons: [], ...p })

/** The component's gate, mirrored: both facts must be known first. */
const preludeVisible = (o: {
  curriculumLoaded: boolean; historyHydrated: boolean
  preludeViewedAt?: string | null; dismissed?: boolean; replay?: boolean
}) =>
  o.curriculumLoaded && o.historyHydrated && !o.dismissed &&
  shouldShowPrelude({ subjectSlug: SUBJECT, preludeViewedAt: o.preludeViewedAt, replayRequested: o.replay })

describe('subject prelude does not flash', () => {
  it('is hidden while the curriculum is still loading — the flash itself', () => {
    // Pre-fetch state: preludeViewedAt is undefined for EVERY learner.
    expect(isPreludeCompleted(undefined)).toBe(false)
    expect(shouldShowPrelude({ subjectSlug: SUBJECT, preludeViewedAt: undefined })).toBe(true)
    // The gate must still refuse to render until both facts are known.
    expect(preludeVisible({ curriculumLoaded: false, historyHydrated: false })).toBe(false)
    expect(preludeVisible({ curriculumLoaded: true, historyHydrated: false })).toBe(false)
    expect(preludeVisible({ curriculumLoaded: false, historyHydrated: true })).toBe(false)
  })

  it('shows once for a learner who has never completed it', () => {
    expect(preludeVisible({ curriculumLoaded: true, historyHydrated: true, preludeViewedAt: null })).toBe(true)
  })

  it('stays hidden for a learner who completed it — refresh and lesson change', () => {
    const viewed = '2026-08-01T10:00:00.000Z'
    expect(preludeVisible({ curriculumLoaded: true, historyHydrated: true, preludeViewedAt: viewed })).toBe(false)
  })

  it('hides immediately on dismiss, without waiting for the refetch', () => {
    expect(preludeVisible({
      curriculumLoaded: true, historyHydrated: true, preludeViewedAt: null, dismissed: true,
    })).toBe(false)
  })

  it('an explicit replay still wins', () => {
    expect(preludeVisible({
      curriculumLoaded: true, historyHydrated: true, preludeViewedAt: '2026-08-01T10:00:00.000Z', replay: true,
    })).toBe(true)
  })
})

describe('Start vs Resume label', () => {
  const started: Record<string, TopicProgressEntry> = { [SLUG]: { status: 'IN_PROGRESS', masteryPct: 20 } }
  const done: Record<string, TopicProgressEntry> = { [SLUG]: { status: 'COMPLETED', masteryPct: 100 } }
  const isResume = (m: string) => m === 'resume' || m === 'review'

  it('a never-started lesson offers Start', () => {
    const mode = decideLessonEntryMode({ lesson, progress: progress(), topicProgressMap: {} })
    expect(mode).toBe('introduction')
    expect(isResume(mode)).toBe(false)
  })

  it('a lesson already in progress offers Resume after a refresh', () => {
    const mode = decideLessonEntryMode({ lesson, progress: progress(), topicProgressMap: started })
    expect(mode).toBe('resume')
    expect(isResume(mode)).toBe(true)
  })

  it('a completed lesson revisited offers Resume, not Start', () => {
    const mode = decideLessonEntryMode({
      lesson, progress: progress({ completedLessons: [1] }), topicProgressMap: done,
    })
    expect(mode).toBe('review')
    expect(isResume(mode)).toBe(true)
  })

  it('progress on a DIFFERENT lesson does not make this one a resume', () => {
    const other: Record<string, TopicProgressEntry> = {
      'phys.mech.kinematics-1d': { status: 'IN_PROGRESS', masteryPct: 40 },
    }
    expect(decideLessonEntryMode({ lesson, progress: progress(), topicProgressMap: other })).toBe('introduction')
  })
})
