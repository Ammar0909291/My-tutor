/**
 * Batch 5 of the Typed Turn Contract migration (design doc §6, "figure
 * cluster"): `visualDecisionHoisted`, `availableVisualHoisted`,
 * `allowedVisualsHoisted`, `forceVisualRenderHoisted`,
 * `visualGenerationCountHoisted` collapsed into `contract.figure`, resolved
 * once (`resolvedVisualDecision`/`resolvedAvailableVisual`/
 * `resolvedAllowedVisuals`/`resolvedForceVisualRender`/
 * `resolvedVisualGenerationCountBefore`) and reused at every consumer past
 * the resolved-const block. The three un-suffixed derived locals the design
 * doc also names (`visualFired`, `figureOnScreen`, `figureIntroducedThisTurn`)
 * stay their own single-declaration locals — each is computed hundreds of
 * lines after both compile points, so per Batch 2's own rule they are never
 * resolved off the (permanently stale) `turnDeliveryShadow.figure` default;
 * only their internal reads of `visualDecisionHoisted` migrate.
 *
 * These three scenarios are exactly what `figureOnScreen`/
 * `figureIntroducedThisTurn` exist to distinguish, driven end to end against
 * the REAL route (not mirrored):
 *   (a) a figure attached FRESH this turn (session.turns === 0) — the
 *       client payload carries a real sceneSpec;
 *   (b) a figure HELD from a prior turn, not re-attached to this message's
 *       payload (sceneSpec absent) — but still genuinely "on screen", so a
 *       true prose reference to it must NOT be stripped (this is
 *       `figureOnScreen`'s whole reason to exist over `visualFired` alone —
 *       see figureReference.ts's own header, "a defect found by reading the
 *       ownership gate, not by a test, because nothing here would have
 *       failed" — this test exists to make it a test);
 *   (c) a turn with no figure at all (a concept with no curated/generated
 *       visual) — no sceneSpec on any turn, and no stray reference to strip
 *       because none was written.
 * Every turn also asserts CONTRACT_ASSERT is clean.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('Typed Turn Contract Batch 5 — figure cluster, real route', () => {
  it('(a) a figure attaches fresh on the first turn, and (b) a held figure is not re-attached but stays genuinely on screen', async () => {
    // chem.elect.galvanic-cell carries a curated scene binding (a Daniell
    // Cell diagram) — verified live against the real route before writing
    // this test, not assumed.
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at one electrode.' },
      // No diagram request, no re-attach trigger — an ordinary follow-up
      // that legitimately refers to the figure the learner is already
      // looking at, the exact HELD_TURN shape figureReference.test.ts's own
      // fixture uses.
      {
        learnerSays: 'ok tell me more',
        modelReplies: 'Look at the diagram on your screen — the electrons flow from the zinc anode to the copper cathode.',
      },
    ], { conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [fresh, held] = res

    // (a) FRESH: introduced this turn, a real sceneSpec ships to the client.
    expect((fresh.body as { sceneSpec?: unknown }).sceneSpec).toBeTruthy()
    const freshDecision = readLog(fresh, '[visual-v2]') as { graphical?: boolean } | null
    expect(freshDecision?.graphical).toBe(true)

    // (b) HELD: the resolver still reports the figure as graphical/on-screen
    // (continuity holds it), but this message's own payload does NOT
    // re-attach it — `figureIntroducedThisTurn` correctly reads false here.
    const heldDecision = readLog(held, '[visual-v2]') as { graphical?: boolean } | null
    expect(heldDecision?.graphical).toBe(true)
    expect((held.body as { sceneSpec?: unknown }).sceneSpec).toBeFalsy()

    // And the point of `figureOnScreen` over `visualFired` alone: the
    // model's TRUE reference to the figure it is not re-attaching must
    // survive — stripped only if the guard wrongly keyed on `visualFired`
    // (false on a held turn) instead of `figureOnScreen` (true, because the
    // session has turns > 0).
    expect((held.body as { text?: string }).text).toContain('Look at the diagram on your screen')
    expect(readLog(held, '[figure-reference]')).toBeNull()
  })

  it('(c) a concept with no visual at all never attaches one, on any turn', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Pericyclic reactions proceed through a single concerted transition state.' },
      { learnerSays: 'ok', modelReplies: 'The Woodward-Hoffmann rules classify them by electron count and geometry.' },
    ], { conceptId: 'chem.org.pericyclic', subjectSlug: 'chemistry' })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
      const body = t.body as { sceneSpec?: unknown; visual?: unknown; visualSpec?: unknown }
      expect(body.sceneSpec).toBeFalsy()
      expect(body.visual).toBeFalsy()
      expect(body.visualSpec).toBeFalsy()
    }
  })
})
