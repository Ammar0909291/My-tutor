/**
 * S10 — production regression protection for the two 2026-08-16 fixes.
 *
 * These pin the invariants the production audit asserts, so a regression is
 * caught by the suite as well as by the read-only script.
 */
import { describe, it, expect } from 'vitest'
import {
  duplicateActiveVisuals, evidenceMarkerViolations, multipleOpenAttempts,
  type TopicProgressRow, type MarkerMessage, type AttemptRow,
} from '@/lib/teaching/moatInvariants'

const MIGRATION = new Date('2026-08-16T18:00:00Z')
const before = new Date('2026-08-10T00:00:00Z')
const after = new Date('2026-08-16T20:00:00Z')

function row(over: Partial<TopicProgressRow> = {}): TopicProgressRow {
  return {
    id: 'tp1', userId: 'u1', topicSlug: 'chem.found.measurement',
    attempts: 1, lastEvidenceMessageId: 'm1', updatedAt: after, ...over,
  }
}
const msgs = (...m: MarkerMessage[]) => new Map(m.map((x) => [x.id, x]))
const USER_MSG: MarkerMessage = { id: 'm1', userId: 'u1', role: 'USER' }

describe('visual integrity — one ACTIVE visual per concept', () => {
  it('flags a concept with two ACTIVE visuals', () => {
    const dups = duplicateActiveVisuals([
      { conceptId: 'phys.mech.momentum', assetId: 'a1' },
      { conceptId: 'phys.mech.momentum', assetId: 'a2' },
      { conceptId: 'chem.found.matter', assetId: 'a3' },
    ])
    expect(dups).toHaveLength(1)
    expect(dups[0]).toMatchObject({ conceptId: 'phys.mech.momentum' })
    expect(dups[0].assetIds).toHaveLength(2)
  })

  it('passes when every concept has at most one ACTIVE visual', () => {
    expect(duplicateActiveVisuals([
      { conceptId: 'phys.mech.momentum', assetId: 'a1' },
      { conceptId: 'chem.found.matter', assetId: 'a2' },
    ])).toEqual([])
    expect(duplicateActiveVisuals([])).toEqual([])
  })
})

describe('lesson-attempt openness — at most one open attempt per lesson', () => {
  const a = (over: Partial<AttemptRow> = {}): AttemptRow => ({
    userId: 'u1', subjectSlug: 'physics', lessonKey: 'lesson:7',
    status: 'IN_PROGRESS', ...over,
  })

  it('flags a lesson holding two open attempts', () => {
    const bad = multipleOpenAttempts([a(), a()])
    expect(bad).toHaveLength(1)
    expect(bad[0]).toMatchObject({ lessonKey: 'lesson:7', count: 2 })
  })

  it('passes with exactly one open attempt per lesson', () => {
    expect(multipleOpenAttempts([a(), a({ lessonKey: 'lesson:8' })])).toEqual([])
  })

  it('ignores COMPLETED rows entirely — a lesson may have many of those', () => {
    // Re-teaching a lesson legitimately leaves several COMPLETED rows behind;
    // only OPEN rows must be unique.
    expect(multipleOpenAttempts([
      a({ status: 'COMPLETED' }), a({ status: 'COMPLETED' }), a(),
    ])).toEqual([])
  })

  it('separates learners and subjects sharing a lessonKey', () => {
    // "lesson:7" is not globally unique — it is scoped by user and subject,
    // which is the identity openLessonAttempt itself queries on.
    expect(multipleOpenAttempts([
      a(), a({ userId: 'u2' }), a({ subjectSlug: 'chemistry' }),
    ])).toEqual([])
  })
})

describe('evidence marker integrity', () => {
  it('accepts a marker that is the learner\'s own USER message', () => {
    expect(evidenceMarkerViolations([row()], msgs(USER_MSG), MIGRATION)).toEqual([])
  })

  it('flags a dangling marker', () => {
    const v = evidenceMarkerViolations([row()], msgs(), MIGRATION)
    expect(v).toHaveLength(1)
    expect(v[0].reason).toBe('marker-dangling')
  })

  it('flags a marker pointing at an assistant message', () => {
    const v = evidenceMarkerViolations([row()], msgs({ ...USER_MSG, role: 'ASSISTANT' }), MIGRATION)
    expect(v[0].reason).toBe('marker-not-user-message')
  })

  it('flags a marker belonging to a different learner', () => {
    const v = evidenceMarkerViolations([row()], msgs({ ...USER_MSG, userId: 'someone-else' }), MIGRATION)
    expect(v[0].reason).toBe('marker-wrong-user')
  })
})

describe('historical rows are not punished for predating the column', () => {
  it('does NOT flag an unmarked row last written before the migration', () => {
    const v = evidenceMarkerViolations(
      [row({ lastEvidenceMessageId: null, updatedAt: before, attempts: 4 })], msgs(), MIGRATION,
    )
    expect(v).toEqual([])
  })

  it('DOES flag an unmarked row written after the migration', () => {
    const v = evidenceMarkerViolations(
      [row({ lastEvidenceMessageId: null, updatedAt: after })], msgs(), MIGRATION,
    )
    expect(v[0].reason).toBe('updated-after-migration-without-marker')
  })

  it('skips the completeness check entirely when the cutoff is unknown', () => {
    // Without the migration timestamp, flagging unmarked rows would condemn
    // every historical row. Silence is the correct answer, not a guess.
    const v = evidenceMarkerViolations(
      [row({ lastEvidenceMessageId: null, updatedAt: after })], msgs(), null,
    )
    expect(v).toEqual([])
  })
})

describe('the limitation this audit cannot cover, pinned deliberately', () => {
  it('does not treat attempts > 1 with a single stored marker as a violation', () => {
    // lastEvidenceMessageId is a scalar holding only the LATEST marker, so the
    // stored state cannot answer "did each increment come from a distinct
    // event". Seven legitimate increments leave exactly one marker behind.
    // Idempotency is enforced at WRITE time by the guarded UPDATE (proved in
    // topicProgressEvidenceIdempotency.test.ts), not reconstructable here.
    const v = evidenceMarkerViolations(
      [row({ attempts: 7, lastEvidenceMessageId: 'm1' })], msgs(USER_MSG), MIGRATION,
    )
    expect(v).toEqual([])
  })
})
