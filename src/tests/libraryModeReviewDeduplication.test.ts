/**
 * Library Mode review-system deduplication — regression lock.
 *
 * Prior audit found: Library Mode session-opening turns could receive TWO
 * independently-computed due-review instructions in the same system
 * prompt — spacedRevision.ts's per-turn "DUE FOR REVIEW" block (School
 * Mode's original SM-2-style scheduler, previously also wired into the
 * ADR 02 Library-mode teaching-strategy section) and
 * sessionLifecycle.ts's session-OPENING due-review instruction (fed by
 * the Spaced Retrieval Scheduler). The two gave literally contradictory
 * phrasing instructions: spacedRevision.ts's buildRevisionBlock says
 * 'Begin with a quick recall question: "Can you tell me what you
 * remember about [concept]?"'; sessionLifecycle.ts's buildOpeningBlock
 * says the opposite: "never 'do you remember X?'".
 *
 * The fix removed ONLY the Library Mode call site of spacedRevision.ts
 * from route.ts. School Mode's own two call sites (advanceRevision, the
 * chapter-level getDueRevisions/buildRevisionBlock) are untouched, and
 * spacedRevision.ts itself was not modified at all — it is still fully
 * correct and used for School Mode.
 *
 * route.ts cannot be exercised directly in this suite (it needs a live
 * DB — no test in this repo does that; every *.test.ts file here tests
 * pure logic modules or, per servingPathCanonicality.test.ts's own
 * precedent, locks in route.ts's documented call-site/flag structure
 * without executing the route). This file follows that same precedent:
 * it locks in the exact source-level wiring (which call sites exist,
 * where) as a source-of-truth invariant, PLUS exercises the real,
 * unmodified functions (buildRevisionBlock, buildOpeningBlock,
 * buildStudentIntelligence, scheduleReviews) to prove the functional
 * outcome — never mocks, never reimplemented logic.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { readLessonEvidence, type EvidenceEventRow, type TopicProgressRow } from '@/lib/teaching/evidence/evidenceReader'
import { buildStudentIntelligence } from '@/lib/teaching/studentIntelligence/studentIntelligence'
import { scheduleReviews } from '@/lib/teaching/retrieval/spacedRetrievalScheduler'
import { buildOpeningBlock } from '@/lib/teaching/sessionLifecycle'
import { buildRevisionBlock, type RevisionState } from '@/lib/school/adaptive/spacedRevision'

const ROUTE_SOURCE = fs.readFileSync(
  path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf-8',
)

// ── 1. Source-level structural lock: School Mode intact, Library Mode clean ──

describe('route.ts structural lock: Library Mode no longer wires spacedRevision.ts', () => {
  it('School Mode still calls spacedRevision.ts.advanceRevision (unchanged)', () => {
    expect(ROUTE_SOURCE).toContain(
      "import('@/lib/school/adaptive/spacedRevision').then(({ advanceRevision }) =>",
    )
  })

  it('exactly one getDueRevisions/buildRevisionBlock pairing remains in the whole file (School Mode\'s)', () => {
    const matches = ROUTE_SOURCE.match(
      /const \{ getDueRevisions, buildRevisionBlock \} = await import\('@\/lib\/school\/adaptive\/spacedRevision'\)/g,
    ) ?? []
    expect(matches).toHaveLength(1)
  })

  it('the ADR 02 Library-mode teaching-strategy section no longer IMPORTS OR CALLS spacedRevision.ts', () => {
    const start = ROUTE_SOURCE.indexOf('unified teaching strategy for SUBJECT_LIBRARY subjects')
    const end = ROUTE_SOURCE.indexOf("ADR 02 follow-up #1", start)
    expect(start).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(start)
    const libraryModeSection = ROUTE_SOURCE.slice(start, end)
    // A prose comment explaining the removal (mentioning the module name
    // and function names in plain English) is expected and fine — what
    // must be absent is any actual import/call of the module.
    expect(libraryModeSection).not.toContain("await import('@/lib/school/adaptive/spacedRevision')")
    expect(libraryModeSection).not.toMatch(/getDueRevisions\(/)
    expect(libraryModeSection).not.toMatch(/buildRevisionBlock\(/)
  })

  it('the session-opening block calls the Spaced Retrieval Scheduler exactly once, and only there', () => {
    const matches = ROUTE_SOURCE.match(
      /await import\('@\/lib\/teaching\/retrieval\/spacedRetrievalScheduler'\)/g,
    ) ?? []
    expect(matches).toHaveLength(1)
  })
})

// ── 2. Functional proof: spacedRevision.ts itself is unmodified (School Mode still correct) ──

describe('spacedRevision.ts is unmodified — School Mode behaviour unchanged', () => {
  function revisionState(over: Partial<RevisionState> = {}): RevisionState {
    return {
      nodeId: 'chapter.node.1', subjectSlug: 'physics', title: 'Newton\'s Laws',
      lastMasteredAt: new Date('2026-01-01'), nextReviewAt: new Date('2026-01-05'),
      reviewStrength: 40, reviewCount: 2, isDue: true,
      ...over,
    }
  }

  it('buildRevisionBlock still produces its original School-Mode-appropriate instruction, verbatim', () => {
    const block = buildRevisionBlock([revisionState()])
    expect(block).toContain('DUE FOR REVIEW')
    expect(block).toContain('Can you tell me what you remember about [concept]?')
    expect(block).toContain('Do NOT re-teach the entire topic from scratch')
  })

  it('buildRevisionBlock still returns empty string for no due states (unchanged)', () => {
    expect(buildRevisionBlock([])).toBe('')
  })
})

// ── 3. Functional proof: Library Mode now emits exactly one review instruction ──

let seq = 0
beforeEach(() => { seq = 0 })

function ev(over: Partial<EvidenceEventRow> & { category: string; outcome: string; occurredAt: Date }): EvidenceEventRow {
  seq++
  return {
    eventId: `e${String(seq).padStart(4, '0')}`,
    userId: 'u1', sessionId: 's1', turnId: `t${seq}`,
    conceptId: 'phys.mech.newtons-first-law', language: 'en',
    misconceptionId: null, strength: 0, rawScore: null,
    ...over,
  }
}
const probe = (passed: boolean, occurredAt: Date, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'PROBE_OUTCOME', outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false`, strength: passed ? 1 : 0, occurredAt, ...over })

function topicProgress(over: Partial<TopicProgressRow> = {}): TopicProgressRow {
  return {
    userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.mech.newtons-first-law',
    status: 'MASTERED', masteryPct: 90, attempts: 3, revisionCount: 0,
    createdAt: new Date('2026-01-01'), completedAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-01'),
    ...over,
  }
}

const NOW = new Date('2026-08-01T12:00:00Z')

describe('Library Mode now produces exactly one review instruction, from the Scheduler only', () => {
  it('a learner with a due review gets exactly one "due review" instruction, sourced from buildOpeningBlock only', () => {
    const masteredAt = new Date(NOW.getTime() - 200 * 86_400_000)
    const events = [
      probe(true, masteredAt, { turnId: 't1' }),
      probe(false, new Date(masteredAt.getTime() + 60_000), { turnId: 't2' }),
      probe(true, new Date(masteredAt.getTime() + 120_000), { turnId: 't3' }),
    ]
    const lessons = readLessonEvidence({ events, topicProgress: [topicProgress({ completedAt: masteredAt })] })
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    const dueReviewCount = queue.overdue.length + queue.dueToday.length
    expect(dueReviewCount).toBeGreaterThan(0)

    // This is the ONLY function route.ts's Library-mode session-opening
    // path calls to produce review-related prompt text (spacedRevision.ts
    // is no longer in that path at all, per the structural lock above).
    const openingBlock = buildOpeningBlock({
      dueReviewCount, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true,
    })

    const dueReviewMentions = (openingBlock.match(/due review/gi) ?? []).length
    expect(dueReviewMentions).toBeGreaterThan(0)
    // Exactly one instructional paragraph — no second, separately-sourced
    // "DUE FOR REVIEW" heading can appear because nothing else is
    // concatenated onto this prompt fragment for Library Mode anymore.
    expect((openingBlock.match(/DUE FOR REVIEW/g) ?? [])).toHaveLength(0)
    expect(openingBlock).toContain('Due reviews come BEFORE any new content')
  })

  it('no "Do you remember" / "Can you tell me what you remember" phrasing is ever emitted by the Library Mode chain', () => {
    const masteredAt = new Date(NOW.getTime() - 200 * 86_400_000)
    const events = [
      probe(true, masteredAt, { turnId: 't1' }),
      probe(false, new Date(masteredAt.getTime() + 60_000), { turnId: 't2' }),
    ]
    const lessons = readLessonEvidence({ events, topicProgress: [topicProgress({ completedAt: masteredAt })] })
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW, baseHalfLifeDays: 10 })
    const dueReviewCount = queue.overdue.length + queue.dueToday.length

    const openingBlock = buildOpeningBlock({
      dueReviewCount, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true,
    })

    // The actual spacedRevision.ts phrasing ("Can you tell me what you
    // remember about [concept]?" — a "do you remember" STYLE QUESTION)
    // must never appear — that's the contradictory instruction this fix
    // eliminates from Library Mode. buildOpeningBlock legitimately
    // mentions the pattern once, but only as a PROHIBITION ("never 'do
    // you remember X?'"), never as a question actually being asked.
    expect(openingBlock).not.toContain('Can you tell me what you remember about')
    expect(openingBlock).toContain('never "do you remember X?"')
    const asAQuestion = /can you tell me what you remember|do you remember \w+\?(?!")/i
    expect(openingBlock).not.toMatch(asAQuestion)
  })

  it('a learner with no due review produces the unchanged "no reviews due" text, with no contradictory block appended', () => {
    const events = [probe(true, new Date(NOW.getTime() - 60_000), { turnId: 't1' })]
    const lessons = readLessonEvidence({ events, topicProgress: [topicProgress({ completedAt: new Date(NOW.getTime() - 60_000) })] })
    const profile = buildStudentIntelligence('u1', lessons, { now: NOW })
    const queue = scheduleReviews(profile, { now: NOW })
    const dueReviewCount = queue.overdue.length + queue.dueToday.length
    expect(dueReviewCount).toBe(0)

    const openingBlock = buildOpeningBlock({
      dueReviewCount, retroWinOwed: false, isFreshBoundary: true, hadPreviousEpisode: true,
    })
    expect(openingBlock).toContain('No reviews are due — proceed to the main content after the greeting.')
    expect(openingBlock).not.toContain('DUE FOR REVIEW')
  })
})
