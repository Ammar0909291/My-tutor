/**
 * OBJECTIVE 2 — a completed lesson must never re-enter teaching.
 *
 * PRODUCTION BEHAVIOUR:
 *   lesson completes -> summary shown -> next lesson unlocked ->
 *   learner presses "Continue" / "Got it" / "Let's keep working" ->
 *   the tutor keeps teaching the PREVIOUS lesson and repeats already-mastered
 *   questions.
 *
 * TWO owners of lesson identity existed, and the runtime read both of them
 * ahead of the authoritative one:
 *
 *   AUTHORITATIVE  StudentProgress.currentLesson
 *     Advanced by EVERY completion — /api/curriculum/progress PATCH sets
 *     currentLesson = Math.max(existing, completedLesson + 1). It is what the
 *     UI renders and what "next lesson unlocked" reflects.
 *
 *   SECOND OWNER   TopicProgress rows with status IN_PROGRESS
 *     Multi-valued and lagging. Outranked the authoritative owner in the
 *     route's lesson resolution, so an OLDER unfinished topic won.
 *
 *   THIRD OWNER    contextSnapshot.currentConceptNodeId
 *     Self-seeding (`snapshotCurrentConceptId ?? resolveLibraryEntryConceptId`)
 *     and cleared ONLY in /api/curriculum/progress's skip branch
 *     (`!mastered && isNewCompletion`). A genuine completion never cleared it,
 *     so decide(), the conversation state machine and the mastery read stayed
 *     pinned to the finished concept — which is why mastered questions
 *     repeated.
 *
 * These tests use the real chemistry KG ordering (docs/chemistry/kg/graph.json).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { selectCurrentLesson, pickCurrentTopicSlug } from '@/lib/teaching/progressionIntegrity'

const CHEM = [
  { order: 1, topicSlug: 'chem.found.matter', lessonTitle: 'Nature of Matter' },
  { order: 2, topicSlug: 'chem.found.states-of-matter', lessonTitle: 'States of Matter' },
  { order: 3, topicSlug: 'chem.found.pure-substances', lessonTitle: 'Pure Substances and Mixtures' },
  { order: 4, topicSlug: 'chem.found.measurement', lessonTitle: 'Physical Quantities and SI Units' },
  { order: 5, topicSlug: 'chem.found.significant-figures', lessonTitle: 'Significant Figures and Error Analysis' },
]
const t = (iso: string) => new Date(iso)

describe('a completed lesson cannot re-enter teaching', () => {
  it('"Continue" after completing lesson 3 starts lesson 4, not lesson 3', () => {
    // Completion wrote: TopicProgress(lesson 3) = COMPLETED, and
    // StudentProgress.currentLesson = 4.
    const rows = [
      { topicSlug: 'chem.found.pure-substances', status: 'COMPLETED', updatedAt: t('2026-08-02T12:00:00Z') },
    ]
    const chosen = selectCurrentLesson(CHEM, 4, rows)
    expect(chosen?.order).toBe(4)
    expect(chosen?.topicSlug).toBe('chem.found.measurement')
  })

  it('"Got it" cannot resurrect an OLDER unfinished lesson', () => {
    // The real production shape: lesson 3 completed, but lessons 1 and 2 were
    // never marked COMPLETED (no [LESSON_COMPLETE] ever fired for them), so
    // their rows are still IN_PROGRESS and were outranking currentLesson.
    const rows = [
      { topicSlug: 'chem.found.matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-02T10:00:00Z') },
      { topicSlug: 'chem.found.states-of-matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-02T11:00:00Z') },
      { topicSlug: 'chem.found.pure-substances', status: 'COMPLETED', updatedAt: t('2026-08-02T12:00:00Z') },
    ]
    // The lagging cache still names lesson 2 …
    expect(pickCurrentTopicSlug(rows)).toBe('chem.found.states-of-matter')
    // … but the authoritative owner says lesson 4, and that is what is taught.
    expect(selectCurrentLesson(CHEM, 4, rows)?.order).toBe(4)
  })

  it('lesson identity actually CHANGES across the transition', () => {
    const beforeRows = [
      { topicSlug: 'chem.found.pure-substances', status: 'IN_PROGRESS', updatedAt: t('2026-08-02T11:00:00Z') },
    ]
    const afterRows = [
      { topicSlug: 'chem.found.pure-substances', status: 'COMPLETED', updatedAt: t('2026-08-02T12:00:00Z') },
    ]
    const before = selectCurrentLesson(CHEM, 3, beforeRows)
    const after = selectCurrentLesson(CHEM, 4, afterRows)
    expect(before?.topicSlug).toBe('chem.found.pure-substances')
    expect(after?.topicSlug).toBe('chem.found.measurement')
    expect(after?.topicSlug).not.toBe(before?.topicSlug)
  })

  it('repeated "Got it" turns never drift back — the answer is stable', () => {
    const rows = [
      { topicSlug: 'chem.found.matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-02T10:00:00Z') },
      { topicSlug: 'chem.found.pure-substances', status: 'COMPLETED', updatedAt: t('2026-08-02T12:00:00Z') },
    ]
    // Five consecutive turns, with the IN_PROGRESS row's timestamp churning as
    // the conversational checkpoint re-upserts it.
    const answers = [0, 1, 2, 3, 4].map((i) =>
      selectCurrentLesson(CHEM, 4, [
        { ...rows[0], updatedAt: t(`2026-08-02T13:0${i}:00Z`) },
        rows[1],
      ])?.topicSlug)
    expect(new Set(answers).size).toBe(1)
    expect(answers[0]).toBe('chem.found.measurement')
  })
})

describe('Review / Restart / Revision still work', () => {
  it('Review sets REVISION, which never hijacks the taught lesson', () => {
    // startRevision PATCHes the topic to REVISION and calls lesson-init with
    // mode 'review'. REVISION is not an ACTIVE status, so it cannot pull the
    // chat route onto that concept behind the learner's back.
    const rows = [
      { topicSlug: 'chem.found.matter', status: 'REVISION', updatedAt: t('2026-08-02T13:00:00Z') },
    ]
    expect(pickCurrentTopicSlug(rows)).toBeNull()
    expect(selectCurrentLesson(CHEM, 4, rows)?.order).toBe(4)
  })

  it('Restart of the current lesson keeps teaching that lesson', () => {
    // Restart does not move StudentProgress.currentLesson, so the authoritative
    // owner still names the same lesson — restart must NOT jump forward.
    expect(selectCurrentLesson(CHEM, 3, [])?.topicSlug).toBe('chem.found.pure-substances')
  })

  it('an explicit backward selection is honoured through currentLesson', () => {
    expect(selectCurrentLesson(CHEM, 1, [])?.topicSlug).toBe('chem.found.matter')
  })
})

describe('the concept pointer is derived, not authoritative', () => {
  const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('the Library concept pointer is seeded from the resolved lesson first', () => {
    // Was `snapshotCurrentConceptId ?? resolveLibraryEntryConceptId(...)`,
    // which re-seeded the pointer from itself so it could never follow a
    // lesson transition.
    expect(src).toMatch(/libraryConceptNodeIdHoisted = resolvedConceptId\s*\n\s*\?\? snapshotCurrentConceptId/)
  })

  it('decide() and the conversation state read the derived value, not the raw snapshot', () => {
    // The inversion that let the state machine stay on the COMPLETED concept
    // while Explanation Memory served the new one. Anchored on `= ` so it only
    // catches a read that STARTS from the raw snapshot — the Explanation Memory
    // reads (`resolvedConceptId ?? snapshotCurrentConceptId ?? ...`) were
    // always correct and are deliberately left alone.
    expect(src).not.toMatch(/=\s*snapshotCurrentConceptId \?\? libraryConceptNodeIdHoisted/)
    expect(src).toContain('const activeConceptIdForDecide = libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId')
  })

  it('the route no longer re-derives lesson identity from the lagging cache', () => {
    expect(src).toContain('selectCurrentLesson(syntheticLessons, studentProgress?.currentLesson, topicProgressRows)')
  })
})

describe('selectCurrentLesson fallbacks are preserved', () => {
  it('falls back to the in-progress row only when there is no authoritative value', () => {
    const rows = [{ topicSlug: 'chem.found.measurement', status: 'IN_PROGRESS', updatedAt: t('2026-08-02T10:00:00Z') }]
    expect(selectCurrentLesson(CHEM, null, rows)?.order).toBe(4)
    expect(selectCurrentLesson(CHEM, undefined, rows)?.order).toBe(4)
    expect(selectCurrentLesson(CHEM, 999, rows)?.order).toBe(4)
  })

  it('falls back to the first lesson when nothing resolves', () => {
    expect(selectCurrentLesson(CHEM, 999, [])?.order).toBe(1)
  })

  it('is total — empty list yields null, malformed rows never throw', () => {
    expect(selectCurrentLesson([], 5, [])).toBeNull()
    expect(() => selectCurrentLesson(CHEM, null, [
      null as never,
      { topicSlug: 7 as never, status: 'IN_PROGRESS' },
      { topicSlug: 'x', status: 'IN_PROGRESS', updatedAt: 'not-a-date' },
    ])).not.toThrow()
  })
})
