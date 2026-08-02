/**
 * P20 — Lesson identity ownership (production transcript reproduction).
 *
 * OBSERVED IN PRODUCTION (chemistry):
 *   UI lesson  : "Significant Figures and Error Analysis"  (chem.found.significant-figures, order 5)
 *   Tutor teaches: pure substances / elements / compounds / mixtures
 *                  (chem.found.pure-substances, order 3)
 *   and contextSnapshot currentTopic flipped MID-SESSION
 *                  chem.found.matter -> chem.found.significant-figures
 *
 * MECHANISM (proven from code, not inferred):
 *   The route resolved "which lesson are we teaching" as
 *
 *       pickCurrentTopicSlug(topicProgressRows)          // <- won
 *         ?? lessons.find(l => l.order === studentProgress.currentLesson)
 *         ?? lessons[0]
 *
 *   TopicProgress IN_PROGRESS rows are a LAGGING, MULTI-VALUED cache of
 *   "what we have been teaching" — progressionIntegrity's own header records
 *   that a learner "accumulates several IN_PROGRESS rows as normal steady
 *   state", because the conversational checkpoint upserts IN_PROGRESS on every
 *   signalled turn and abandoning a lesson never clears the row.
 *
 *   StudentProgress.currentLesson is the CANONICAL owner: it is what the UI
 *   renders, what navigation writes, and what placement writes. Reading the
 *   lagging cache FIRST meant a stale row for an earlier concept outranked the
 *   lesson the learner actually had open.
 *
 * These tests encode the transcript directly. They fail against the old
 * precedence and pass against the fixed one.
 */
import { describe, it, expect } from 'vitest'
import { selectCurrentLesson, pickCurrentTopicSlug } from '@/lib/teaching/progressionIntegrity'

/** The first five chemistry KG concepts, in real graph order (docs/chemistry/kg/graph.json). */
const CHEM = [
  { order: 1, topicSlug: 'chem.found.matter', lessonTitle: 'Nature of Matter' },
  { order: 2, topicSlug: 'chem.found.states-of-matter', lessonTitle: 'States of Matter' },
  { order: 3, topicSlug: 'chem.found.pure-substances', lessonTitle: 'Pure Substances and Mixtures' },
  { order: 4, topicSlug: 'chem.found.measurement', lessonTitle: 'Physical Quantities and SI Units' },
  { order: 5, topicSlug: 'chem.found.significant-figures', lessonTitle: 'Significant Figures and Error Analysis' },
]

const t = (iso: string) => new Date(iso)

describe('P20 production transcript: UI lesson vs. taught lesson', () => {
  it('teaches the lesson the UI has open, not a stale IN_PROGRESS row', () => {
    // Exactly the observed state: the learner has moved on to lesson 5, but
    // earlier concepts were never marked COMPLETED (no [LESSON_COMPLETE] ever
    // fired for them), so their rows are still IN_PROGRESS.
    const rows = [
      { topicSlug: 'chem.found.matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T10:00:00Z') },
      { topicSlug: 'chem.found.pure-substances', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T11:00:00Z') },
    ]
    // The lagging cache still points at lesson 3 …
    expect(pickCurrentTopicSlug(rows)).toBe('chem.found.pure-substances')

    // … but the canonical owner says lesson 5, and that is what must be taught.
    const chosen = selectCurrentLesson(CHEM, 5, rows)
    expect(chosen?.topicSlug).toBe('chem.found.significant-figures')
    expect(chosen?.lessonTitle).toBe('Significant Figures and Error Analysis')
  })

  it('does not flip concepts mid-session when a topic-progress write lands late', () => {
    // The client marks the open lesson IN_PROGRESS from a fire-and-forget
    // useEffect (LessonScreen "Mark the current topic as IN_PROGRESS"). That
    // write races the first chat turn. Before AND after it commits, the taught
    // lesson must be identical — the flip matter -> significant-figures was
    // this race becoming visible.
    const beforeWriteLands = [
      { topicSlug: 'chem.found.matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T10:00:00Z') },
    ]
    const afterWriteLands = [
      ...beforeWriteLands,
      { topicSlug: 'chem.found.significant-figures', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T12:00:00Z') },
    ]
    const a = selectCurrentLesson(CHEM, 5, beforeWriteLands)
    const b = selectCurrentLesson(CHEM, 5, afterWriteLands)
    expect(a?.topicSlug).toBe('chem.found.significant-figures')
    expect(b?.topicSlug).toBe(a?.topicSlug)
  })

  it('is stable across TopicProgress row order and timestamp churn', () => {
    // Every signalled turn re-upserts IN_PROGRESS, so timestamps move
    // constantly. None of that may change which lesson is taught.
    const base = [
      { topicSlug: 'chem.found.matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T10:00:00Z') },
      { topicSlug: 'chem.found.pure-substances', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T11:00:00Z') },
      { topicSlug: 'chem.found.states-of-matter', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T13:00:00Z') },
    ]
    const permutations = [base, [...base].reverse(), [base[1], base[2], base[0]]]
    const results = permutations.map((rows) => selectCurrentLesson(CHEM, 5, rows)?.topicSlug)
    expect(new Set(results).size).toBe(1)
    expect(results[0]).toBe('chem.found.significant-figures')
  })
})

describe('selectCurrentLesson — canonical owner and its fallbacks', () => {
  it('StudentProgress.currentLesson is the canonical owner', () => {
    expect(selectCurrentLesson(CHEM, 3, [])?.topicSlug).toBe('chem.found.pure-substances')
    expect(selectCurrentLesson(CHEM, 1, [])?.topicSlug).toBe('chem.found.matter')
  })

  it('falls back to the in-progress row ONLY when the canonical owner has no value', () => {
    const rows = [{ topicSlug: 'chem.found.measurement', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T10:00:00Z') }]
    // No StudentProgress row yet (a brand-new learner mid-first-session).
    expect(selectCurrentLesson(CHEM, null, rows)?.topicSlug).toBe('chem.found.measurement')
    expect(selectCurrentLesson(CHEM, undefined, rows)?.topicSlug).toBe('chem.found.measurement')
  })

  it('falls back to the in-progress row when currentLesson does not resolve to a lesson', () => {
    // Curriculum shrank, or a stale order survived a KG edit.
    const rows = [{ topicSlug: 'chem.found.measurement', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T10:00:00Z') }]
    expect(selectCurrentLesson(CHEM, 999, rows)?.topicSlug).toBe('chem.found.measurement')
  })

  it('falls back to the first lesson when nothing else resolves', () => {
    expect(selectCurrentLesson(CHEM, 999, [])?.topicSlug).toBe('chem.found.matter')
    expect(selectCurrentLesson(CHEM, null, [])?.topicSlug).toBe('chem.found.matter')
  })

  it('ignores non-active rows in the fallback (COMPLETED / MASTERED / SKIPPED / REVISION)', () => {
    const rows = [
      { topicSlug: 'chem.found.matter', status: 'COMPLETED', updatedAt: t('2026-08-01T14:00:00Z') },
      { topicSlug: 'chem.found.states-of-matter', status: 'MASTERED', updatedAt: t('2026-08-01T14:00:00Z') },
      { topicSlug: 'chem.found.measurement', status: 'SKIPPED', updatedAt: t('2026-08-01T14:00:00Z') },
      { topicSlug: 'chem.found.pure-substances', status: 'REVISION', updatedAt: t('2026-08-01T14:00:00Z') },
    ]
    expect(selectCurrentLesson(CHEM, null, rows)?.topicSlug).toBe('chem.found.matter') // first-lesson fallback
  })

  it('is total: empty lesson list yields null, never a throw', () => {
    expect(selectCurrentLesson([], 5, [])).toBeNull()
  })

  it('tolerates malformed rows without throwing', () => {
    const rows = [
      null as never,
      { topicSlug: 42 as never, status: 'IN_PROGRESS' },
      { topicSlug: 'chem.found.measurement', status: 'IN_PROGRESS', updatedAt: 'not-a-date' },
    ]
    expect(() => selectCurrentLesson(CHEM, null, rows)).not.toThrow()
  })
})

describe('invariant: one lesson identity per turn', () => {
  it('the prompt-context slug equals the taught lesson slug', () => {
    // route.ts previously re-derived the "current topic" for the teaching-plan
    // block and the KG-context block by calling pickCurrentTopicSlug() again,
    // independently of the lesson it had already resolved. With a stale row
    // present those two answers disagreed, so the tutor received prompt context
    // about one concept while being told to teach another — the second half of
    // the observed transcript (lesson 5 open, lesson 3 content delivered).
    const rows = [
      { topicSlug: 'chem.found.pure-substances', status: 'IN_PROGRESS', updatedAt: t('2026-08-01T11:00:00Z') },
    ]
    const taught = selectCurrentLesson(CHEM, 5, rows)
    const promptContextSlug = taught?.topicSlug ?? pickCurrentTopicSlug(rows)
    expect(promptContextSlug).toBe(taught?.topicSlug)
    expect(promptContextSlug).not.toBe(pickCurrentTopicSlug(rows))
  })
})
