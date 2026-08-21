import { describe, it, expect } from 'vitest'
import { computeCurriculumEntryOrder, getPlacementFloorSlugs } from '@/lib/curriculum/placement'
import type { KnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'

// A small synthetic KG mirroring the real shape: 2 modules, mixed difficulties,
// in the same flat walk order /api/curriculum uses (module-major, node-minor).
const GRAPH: KnowledgeGraph = {
  subject: 'test',
  modules: [
    {
      title: 'Module 1',
      nodes: [
        { id: 'a', slug: 'a', title: 'A', description: '', prerequisites: [], difficulty: 'foundational' },
        { id: 'b', slug: 'b', title: 'B', description: '', prerequisites: ['a'], difficulty: 'foundational' },
        { id: 'c', slug: 'c', title: 'C', description: '', prerequisites: ['b'], difficulty: 'developing' },
        { id: 'd', slug: 'd', title: 'D', description: '', prerequisites: ['c'], difficulty: 'proficient' },
      ],
    },
    {
      title: 'Module 2',
      nodes: [
        { id: 'e', slug: 'e', title: 'E', description: '', prerequisites: ['d'], difficulty: 'advanced' },
        { id: 'f', slug: 'f', title: 'F', description: '', prerequisites: ['e'], difficulty: 'expert' },
      ],
    },
  ],
}

describe('computeCurriculumEntryOrder', () => {
  it('beginner always enters at order 1 (no skip)', () => {
    expect(computeCurriculumEntryOrder(GRAPH, 'beginner')).toBe(1)
  })

  it('intermediate enters at the first "proficient" node', () => {
    // flat order: a(1) b(2) c(3) d(4) e(5) f(6) — d is the first proficient+
    expect(computeCurriculumEntryOrder(GRAPH, 'intermediate')).toBe(4)
  })

  it('advanced enters at the first "advanced" node', () => {
    expect(computeCurriculumEntryOrder(GRAPH, 'advanced')).toBe(5)
  })

  it('falls back to 1 when the subject has no content at that difficulty', () => {
    const shallowGraph: KnowledgeGraph = {
      subject: 'shallow',
      modules: [{ title: 'M', nodes: [
        { id: 'x', slug: 'x', title: 'X', description: '', prerequisites: [], difficulty: 'foundational' },
      ] }],
    }
    expect(computeCurriculumEntryOrder(shallowGraph, 'advanced')).toBe(1)
  })

  it('treats a missing difficulty tag as foundational (never crashes, never over-skips)', () => {
    const graphNoDiff: KnowledgeGraph = {
      subject: 'nodiff',
      modules: [{ title: 'M', nodes: [
        { id: 'x', slug: 'x', title: 'X', description: '', prerequisites: [] },
      ] }],
    }
    expect(computeCurriculumEntryOrder(graphNoDiff, 'advanced')).toBe(1)
  })
})

describe('getPlacementFloorSlugs', () => {
  it('beginner has an empty placement floor (nothing skipped)', () => {
    expect(getPlacementFloorSlugs(GRAPH, 'beginner').size).toBe(0)
  })

  it('intermediate treats a, b, c as placement-available (not d itself)', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'intermediate')
    expect([...floor].sort()).toEqual(['a', 'b', 'c'])
  })

  it('advanced treats a, b, c, d as placement-available', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'advanced')
    expect([...floor].sort()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('never includes the entry node itself or anything after it', () => {
    const floor = getPlacementFloorSlugs(GRAPH, 'intermediate')
    expect(floor.has('d')).toBe(false)
    expect(floor.has('e')).toBe(false)
    expect(floor.has('f')).toBe(false)
  })
})

// ── Root-cause fix: placement verification must not corrupt progress ───────
// Production evidence: Physics Lesson 33 -> Lesson 7 with no learner
// navigation. Cause: `completedLessons.length === 0` alone re-armed
// placement verification for a learner who had skip-advanced far past the
// placement entry point (StudentProgress.currentLesson can move without
// ever writing a completion). isEligibleForPlacementVerification /
// shouldApplyDownwardAdjustment close this — eligibility (and the
// downward-adjustment write) now also require the learner's actual
// currentLesson to be at-or-before their level's entry order.
describe('isEligibleForPlacementVerification / shouldApplyDownwardAdjustment', () => {
  it('TEST GROUP D — a genuine new learner (no progress row) is unaffected', async () => {
    const { isEligibleForPlacementVerification } = await import('@/lib/teaching/placementVerification')
    const entryOrder = computeCurriculumEntryOrder(GRAPH, 'intermediate') // 4
    expect(isEligibleForPlacementVerification({
      nothingCompleted: true, currentLesson: null, entryOrder,
    })).toBe(true)
    expect(isEligibleForPlacementVerification({
      nothingCompleted: true, currentLesson: entryOrder, entryOrder,
    })).toBe(true)
  })

  it('TEST GROUP B — a deep learner (currentLesson far beyond entry, zero completedLessons) is NOT eligible', async () => {
    const { isEligibleForPlacementVerification } = await import('@/lib/teaching/placementVerification')
    const entryOrder = computeCurriculumEntryOrder(GRAPH, 'intermediate') // 4
    // Mirrors the production case: currentLesson=33-equivalent (well past
    // entry), completedLessons=[] (nothingCompleted stays true).
    expect(isEligibleForPlacementVerification({
      nothingCompleted: true, currentLesson: entryOrder + 20, entryOrder,
    })).toBe(false)
  })

  it('a learner with completed lessons is never eligible regardless of position (unchanged prior behavior)', async () => {
    const { isEligibleForPlacementVerification } = await import('@/lib/teaching/placementVerification')
    const entryOrder = computeCurriculumEntryOrder(GRAPH, 'intermediate')
    expect(isEligibleForPlacementVerification({
      nothingCompleted: false, currentLesson: entryOrder, entryOrder,
    })).toBe(false)
  })

  it('degrades to nothingCompleted-only when no entry-order signal exists (no KG graph)', async () => {
    const { isEligibleForPlacementVerification } = await import('@/lib/teaching/placementVerification')
    expect(isEligibleForPlacementVerification({
      nothingCompleted: true, currentLesson: 999, entryOrder: null,
    })).toBe(true)
    expect(isEligibleForPlacementVerification({
      nothingCompleted: false, currentLesson: 999, entryOrder: null,
    })).toBe(false)
  })

  it('TEST GROUP C — a stale/incorrect probe result must not overwrite an already-advanced currentLesson', async () => {
    const { shouldApplyDownwardAdjustment } = await import('@/lib/teaching/placementVerification')
    const entryOrder = computeCurriculumEntryOrder(GRAPH, 'advanced') // 5
    // Learner already advanced well past their original (advanced) entry
    // order — the write-site guard must refuse, independent of eligibility
    // above (defense in depth: this fires even if eligibility somehow let
    // a stale probe through).
    expect(shouldApplyDownwardAdjustment({
      currentLesson: entryOrder + 15, originalEntryOrder: entryOrder,
    })).toBe(false)
  })

  it('the write-site guard permits the adjustment for a learner still at their entry point', async () => {
    const { shouldApplyDownwardAdjustment } = await import('@/lib/teaching/placementVerification')
    const entryOrder = computeCurriculumEntryOrder(GRAPH, 'advanced')
    expect(shouldApplyDownwardAdjustment({
      currentLesson: entryOrder, originalEntryOrder: entryOrder,
    })).toBe(true)
    expect(shouldApplyDownwardAdjustment({
      currentLesson: null, originalEntryOrder: entryOrder,
    })).toBe(true)
  })

  it('the write-site guard degrades to permissive when no entry-order signal exists', async () => {
    const { shouldApplyDownwardAdjustment } = await import('@/lib/teaching/placementVerification')
    expect(shouldApplyDownwardAdjustment({
      currentLesson: 999, originalEntryOrder: null,
    })).toBe(true)
  })
})

// ── TEST GROUP E — production replay (pure-function level) ─────────────────
// Reproduces the exact reported scenario against the real functions: a
// learner at Lesson 33 equivalent, completedLessons=[], answers an unrelated
// question. Verify eligibility is refused BEFORE any probe/adjustment logic
// could run, so currentLesson is never at risk of being overwritten.
describe('production replay — Lesson 33 stays authoritative', () => {
  it('a deep-progress learner never re-enters placement verification, so no adjustment write can occur', async () => {
    const { isEligibleForPlacementVerification } = await import('@/lib/teaching/placementVerification')
    const entryOrderIntermediate = computeCurriculumEntryOrder(GRAPH, 'intermediate')
    const lesson33Equivalent = entryOrderIntermediate + 29 // deep into the curriculum, well past entry
    const eligible = isEligibleForPlacementVerification({
      nothingCompleted: true, // completedLessons=[] — the exact reported state
      currentLesson: lesson33Equivalent,
      entryOrder: entryOrderIntermediate,
    })
    expect(eligible).toBe(false)
    // Because eligibility is false, route.ts's Step 4 never injects a
    // placement probe/await block for this turn, never sets
    // placementProbeActive/placementLevelHoisted, and the downward-
    // adjustment write block (gated on placementLevelHoisted) can never
    // fire — currentLesson=33-equivalent is never touched by placement.
  })
})
