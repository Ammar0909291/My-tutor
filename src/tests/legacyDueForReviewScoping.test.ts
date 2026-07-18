/**
 * Task 3 (Final Review-System Audit) — regression lock.
 *
 * A third, independent due-review source was found in route.ts alongside
 * spacedRevision.ts (School Mode's TopicProgress-based SM-2 scheduler,
 * already locked in by libraryModeReviewDeduplication.test.ts) and the
 * Spaced Retrieval Scheduler (Library Mode's session-opening, evidence-
 * derived scheduler): the legacy Student Memory Engine's
 * `snapshot.dueForReview` (src/lib/memory/service.ts, ADR 10 Phase 2D),
 * surfaced as a "Phase 2F" advisory line in route.ts. Unlike the other two
 * sources, this one was NOT scoped to a mode — it fired unconditionally
 * for both School and Library sessions.
 *
 * Audit finding: `snapshot.dueForReview` is derived entirely from the
 * `ReviewSchedule` table (src/lib/memory/update-pipeline.ts), which is
 * written ONLY by /api/school/practice/submit and
 * /api/school/assessment/submit — no Library-mode code path ever writes to
 * it. So for Library Mode the freestanding prompt advisory was either a
 * no-op (the common case) or a genuine second, contradictory due-review
 * source (the rare case of a shared subjectId with real School Mode
 * ReviewSchedule rows) — duplicating the Spaced Retrieval Scheduler's own
 * opening-block signal, which is evidence-derived and Library Mode's
 * canonical source.
 *
 * The underlying `reviewDue` variable itself stays computed unconditionally
 * (both modes) because the Dynamic Lesson Composer (ADR 09) also consumes
 * it as `reviewDueConceptIds` for School AND Library Mode alike — removing
 * that would be a behavioral redesign of the Composer, out of scope for
 * this fix. Only the freestanding "Due for spaced-repetition review" prompt
 * line is scoped to `if (schoolCtx && reviewDue.length > 0)` — School
 * Mode's behavior is completely unchanged (the line already only fired
 * when reviewDue was non-empty, and this was already School Mode data in
 * practice); only the (rare, cross-contaminated) Library-mode firing is
 * removed.
 *
 * route.ts cannot be exercised directly in this suite (needs a live DB) —
 * this follows the same source-lock precedent as
 * servingPathCanonicality.test.ts and libraryModeReviewDeduplication.test.ts.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ROUTE_SOURCE = fs.readFileSync(
  path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf-8',
)

describe('route.ts structural lock: the freestanding dueForReview prompt advisory is School-Mode-scoped only', () => {
  it('reviewDue is still computed unconditionally (both modes) — the Dynamic Lesson Composer needs it too', () => {
    const matches = ROUTE_SOURCE.match(/const reviewDue = snapshot\.dueForReview/g) ?? []
    expect(matches).toHaveLength(1)
    expect(ROUTE_SOURCE).toContain('reviewDueConceptIds: reviewDue')
  })

  it('the freestanding "Due for spaced-repetition review" prompt line only fires when schoolCtx is set', () => {
    expect(ROUTE_SOURCE).toContain('if (schoolCtx && reviewDue.length > 0) {')
    // Exactly one such guard — no second, unguarded copy of this advisory exists.
    const matches = ROUTE_SOURCE.match(/Due for spaced-repetition review/g) ?? []
    expect(matches).toHaveLength(1)
  })

  it('School Mode\'s own spacedRevision.ts wiring is untouched by this fix (still exactly one call site)', () => {
    const matches = ROUTE_SOURCE.match(
      /const \{ getDueRevisions, buildRevisionBlock \} = await import\('@\/lib\/school\/adaptive\/spacedRevision'\)/g,
    ) ?? []
    expect(matches).toHaveLength(1)
  })

  it('the Spaced Retrieval Scheduler wiring is untouched by this fix (still exactly one call site)', () => {
    const matches = ROUTE_SOURCE.match(
      /await import\('@\/lib\/teaching\/retrieval\/spacedRetrievalScheduler'\)/g,
    ) ?? []
    expect(matches).toHaveLength(1)
  })
})

describe('data-source audit: ReviewSchedule (snapshot.dueForReview\'s source table) is written only by update-pipeline.ts', () => {
  it('prisma.reviewSchedule writes (create/update) exist in update-pipeline.ts', () => {
    const updatePipeline = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/memory/update-pipeline.ts'),
      'utf-8',
    )
    expect(updatePipeline).toContain('prisma.reviewSchedule.create')
    expect(updatePipeline).toContain('prisma.reviewSchedule.update')

    // No Library-mode route/module writes to ReviewSchedule.
    expect(ROUTE_SOURCE).not.toContain('prisma.reviewSchedule.create')
    expect(ROUTE_SOURCE).not.toContain('prisma.reviewSchedule.update')
  })
})
