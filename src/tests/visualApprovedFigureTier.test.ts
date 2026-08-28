import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import type { GeneratedFigure } from '@/lib/teaching/visual/visualEngine'

// Generation is bounded by budgets now, and an unreadable budget counts as
// exhausted — a safety bound must fail in the safe direction. These tests are
// about other things, so they state a budget with room in it.
const openBudget = { countToday: async () => 0 }


// The critic is a separate gate with its own tests; these are about the
// payload path, so they supply a passing judge rather than a live model.
const passingCritic = async () => ({
  dimensions: {
    relevance: { verdict: 'pass' as const, reason: '' },
    correctness: { verdict: 'pass' as const, reason: '' },
    explanatoryValue: { verdict: 'pass' as const, reason: '' },
    grounding: { verdict: 'pass' as const, reason: '' },
    rendering: { verdict: 'pass' as const, reason: '' },
  },
  decision: 'promote' as const,
  confidence: 1,
  judged: true,
})


/**
 * REVIEW HAS TO REACH A LEARNER, OR IT IS NOT REVIEW.
 *
 * The 'reviewed' policy generates a figure, validates it, writes it down and
 * holds it for a human. Approving it set a status column — and nothing read
 * that column, so the reviewer's decision stopped at the database. This tier is
 * the far end of that loop, and the properties worth pinning are the ones that
 * keep it from becoming a way to bypass the gates either side of it: it must
 * lose to a curated figure, it must beat generation, and it must clear the same
 * admission gate everything else does.
 */

const UNCURATED = 'math.func.linear-function'
const CURATED = 'phys.mech.viscosity'

const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
  auto: process.env.VISUAL_AI_SCENE_AUTO,
}
beforeEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = UNCURATED
  process.env.VISUAL_AI_SCENE_AUTO = ''
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
  process.env.VISUAL_AI_SCENE_AUTO = ORIGINAL.auto
})

/** An approved figure of the linear function, faithful to its KG text. */
const approved: GeneratedFigure = {
  kind: 'scene',
  scene: {
    id: 'a', title: 'linear function', sceneType: 'plot',
    steps: [{ narration: 'a straight line', objects: [
      { type: 'point', position: [0, 1, 0], text: 'linear function' },
      { type: 'point', position: [1, 3, 0], text: 'straight line' },
      { type: 'arrow', from: [0, 1, 0], to: [1, 3, 0] },
    ] }],
  },
}

const turn = { message: 'show me a diagram', subject: 'mathematics', learnerRequest: 'diagram' as const }

describe('the approved tier', () => {
  it('SERVES AN APPROVED FIGURE EVEN UNDER THE REVIEWED POLICY — a human already looked', async () => {
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      {
        enabled: () => true,
        policy: 'reviewed',
        findApprovedFigure: async () => approved,
        critic: passingCritic,
        budgetReader: openBudget,
        generate: async () => { throw new Error('generation must not be reached') },
      },
    )
    expect(d.graphical).toBe(true)
    expect(d.provenance).toContain('approved')
  })

  it('COSTS NO PROVIDER CALL — generation is never consulted when one is approved', async () => {
    let called = false
    await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      {
        enabled: () => true,
        policy: 'auto',
        findApprovedFigure: async () => approved,
        critic: passingCritic,
        budgetReader: openBudget,
        generate: async () => { called = true; return null },
      },
    )
    expect(called).toBe(false)
  })

  it('LOSES TO A CURATED FIGURE — approval never outranks a hand-authored binding', async () => {
    let asked = false
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: CURATED, subject: 'physics' },
      {
        enabled: () => true,
        policy: 'auto',
        findApprovedFigure: async () => { asked = true; return approved },
      },
    )
    expect(d.source).toBe('registry')
    expect(asked).toBe(false)
  })

  it('an approved figure OF THE WRONG CONCEPT is refused by the admission gate', async () => {
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      {
        enabled: () => true,
        policy: 'auto',
        findApprovedFigure: async () => ({
          kind: 'spec',
          // A perfectly valid figure that is not this concept's.
          spec: { type: 'process_flow', title: 'Photosynthesis', steps: [] } as never,
        }),
        critic: passingCritic,
        budgetReader: openBudget,
        generate: async () => null,
      },
    )
    expect(d.graphical).toBe(false)
  })

  it('no approved figure falls through to generation, unchanged', async () => {
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      {
        enabled: () => true,
        policy: 'auto',
        findApprovedFigure: async () => null,
        cacheClient: {
          visualizationCache: {
            findUnique: async () => null,
            update: async () => undefined,
            create: async () => undefined,
          },
        },
        critic: passingCritic,
        budgetReader: openBudget,
        generate: async () => ({ type: 'graph', equation: '2x + 1', title: 'Linear function', xLabel: 'x', yLabel: 'y = 2x + 1' }),
      },
    )
    expect(d.graphical).toBe(true)
    expect(d.provenance).toContain('generated')
  })

  it('WITH NO READER SUPPLIED THE TIER IS ABSENT — no database, no behaviour change', async () => {
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      { enabled: () => true, policy: 'reviewed', generate: async () => null },
    )
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('no-figure')
  })

  it('a lookup that throws must not fail the turn', async () => {
    const d = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED },
      {
        enabled: () => true,
        policy: 'reviewed',
        findApprovedFigure: async () => { throw new Error('database unreachable') },
        critic: passingCritic,
        budgetReader: openBudget,
        generate: async () => null,
      },
    ).catch(() => 'threw' as const)
    // The production reader swallows its own errors; this pins that a caller
    // which does not is still not allowed to take the lesson down with it.
    expect(d).not.toBe('threw')
  })
})

/**
 * A SERVED FIGURE IS HELD, NOT RE-INTRODUCED EVERY TURN.
 *
 * eng.vocab.word-recognition, real account, 2026-08-28: the same figure was
 * attached to all ten turns because this path hardcoded `session.turns: 0`,
 * and the route withholds a held figure from the client by reading
 * `session.turns === 0`. Continuity turns must advance the count so the figure
 * is introduced exactly once and then left on the learner's screen.
 */
describe('served-figure continuity', () => {
  it('introduces an approved figure at turns:0, then HOLDS it (turns advances)', async () => {
    const first = await resolveVisualForTurn(
      { ...turn, lessonConceptId: UNCURATED, activeSession: null },
      {
        enabled: () => true, policy: 'reviewed',
        findApprovedFigure: async () => approved, critic: passingCritic, budgetReader: openBudget,
        generate: async () => { throw new Error('generation must not be reached') },
      },
    )
    expect(first.graphical).toBe(true)
    expect(first.session?.turns).toBe(0)

    // The next turn continues the same figure — same concept, same renderer.
    const held = await resolveVisualForTurn(
      { ...turn, message: 'okay that makes sense', learnerRequest: null,
        lessonConceptId: UNCURATED, activeSession: first.session },
      {
        enabled: () => true, policy: 'reviewed',
        findApprovedFigure: async () => approved, critic: passingCritic, budgetReader: openBudget,
        generate: async () => { throw new Error('generation must not be reached') },
      },
    )
    expect(held.graphical).toBe(true)
    // turns > 0 is exactly what makes figureIntroducedThisTurn false in the
    // route, so the client is NOT sent a fresh card for a figure it already has.
    expect(held.session?.turns).toBe(1)
  })
})
