/**
 * Prove the runtime path, against the real model and the real cache.
 *
 * Two claims are worth proving and neither can be proved by unit tests, which
 * necessarily stub the thing under question:
 *
 *   1. A topic with NO Knowledge Graph node and NO allowlist entry can be
 *      drawn, judged and served.
 *   2. The SECOND learner on that topic costs ZERO model calls — no
 *      generation, no judge — which is what makes thousands of topics
 *      affordable rather than merely possible.
 *
 * Every provider call is counted by wrapping the client, so the second claim is
 * a measurement and not an assertion about code paths.
 *
 *   npx tsx scripts/visual/verify-runtime-path.ts
 */

import { resolveVisualForTurn } from '../../src/lib/teaching/visual/resolveVisual'
import { criticiseFigure } from '../../src/lib/teaching/visual/figureCritic'
import { generateJSON } from '../../src/lib/ai/client'
import type { GeneratedFigure } from '../../src/lib/teaching/visual/visualEngine'
import type { ArchetypeContext } from '../../src/lib/teaching/visual/archetypes'

let providerCalls = 0
const counted = async (prompt: string, maxTokens?: number) => {
  providerCalls++
  return generateJSON(prompt, maxTokens)
}
const countedCritic = (figure: GeneratedFigure, ctx: ArchetypeContext, budgetMs: number) =>
  criticiseFigure(figure, ctx, { budgetMs, generate: counted })

/** An in-process stand-in for visualization_cache, shared across both turns. */
const rows = new Map<string, string>()
const cacheClient = {
  visualizationCache: {
    findUnique: async ({ where }: { where: { conceptKey: string } }) =>
      rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
    /**
     * MERGE, NEVER OVERWRITE.
     *
     * `getCachedVisualization` bumps `renderCount` on every read, so a hit
     * arrives here as `{ data: { renderCount: { increment: 1 } } }` with no
     * `code` at all. Assigning `data.code` blindly stored `undefined` — so
     * every successful read DESTROYED the row it had just served, and the
     * harness measured a cache that worked on alternate turns: free, paid,
     * free, paid. Nothing was wrong with the engine; the instrument was.
     * Prisma leaves untouched columns alone, and so must this.
     */
    update: async (args: unknown) => {
      const a = args as { where: { conceptKey: string }; data: { code?: string } }
      if (typeof a.data?.code === 'string') rows.set(a.where.conceptKey, a.data.code)
    },
    create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
      rows.set(data.conceptKey, data.code)
    },
  },
} as never

const CASES = [
  {
    name: 'OFF-CURRICULUM (no KG node, no allowlist entry)',
    lessonConceptId: 'not.a.real.concept',
    message: 'show me a diagram of how a pod gets scheduled',
    runtimeTopic: {
      title: 'Kubernetes Pod Scheduling',
      description:
        'The control-plane process that places a pending pod onto a node by first ' +
        'filtering out nodes that cannot run it and then scoring the ones that can.',
    },
  },
  {
    name: 'CURRICULUM (a real KG concept, unlisted anywhere)',
    lessonConceptId: 'phys.mech.kinetic-energy',
    message: 'show me a diagram',
    runtimeTopic: undefined,
  },
  {
    // THE CASE THE ENGINE COULD NOT DO AT ALL. The learner is sitting in a
    // PHYSICS lesson and asks about something the curriculum has never heard
    // of, describing it in their own words. The figure must be of what they
    // asked about — never of the physics lesson they happen to be in — and the
    // only grounding is their own sentence.
    name: 'REQUESTED OFF-CURRICULUM TOPIC (learner-grounded, inside a physics lesson)',
    lessonConceptId: 'phys.meas.units',
    message:
      'Explain Kubernetes pod scheduling — the scheduler filters out nodes that ' +
      'cannot run the pod, then scores the remaining ones and binds the pod to the best',
    runtimeTopic: undefined,
  },
  {
    // The same request WITHOUT the learner saying what they mean. There is
    // nothing to draw from, so the correct answer is no figure and no call.
    name: 'REQUESTED OFF-CURRICULUM TOPIC (ungrounded — must decline, must not call)',
    lessonConceptId: 'phys.meas.units',
    message: 'Explain Kubernetes pod scheduling',
    runtimeTopic: undefined,
  },
]

async function run() {
  // No allowlist, no auto list, nothing typed anywhere. This is the point.
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_REVIEW_ONLY
  delete process.env.ENABLE_AI_SCENE_GENERATION

  for (const c of CASES) {
    console.log(`\n${'='.repeat(72)}\n${c.name}`)

    const deps = {
      cacheClient,
      budgetReader: { countToday: async () => 0 },
      generate: counted,
      critic: countedCritic,
      runtimeTopic: c.runtimeTopic,
    } as never

    providerCalls = 0
    const first = await resolveVisualForTurn(
      { message: c.message, lessonConceptId: c.lessonConceptId, subject: 'physics', learnerRequest: 'diagram' },
      deps,
    )
    const firstCalls = providerCalls
    console.log(`  turn 1  ${first.graphical ? 'FIGURE' : 'no figure'}  ` +
      `provenance=${first.provenance}  renderer=${first.payload?.renderer ?? '-'}  calls=${firstCalls}`)
    if (first.graphical) {
      const p = first.payload as Record<string, unknown>
      console.log(`          ${JSON.stringify(p.visualSpec ?? p.sceneSpec).slice(0, 220)}`)
    }

    // THREE TURNS, NOT TWO.
    //
    // Two cannot tell "the cache is not working" from "turn 1 was held". A
    // held turn writes the FIGURE cache but deliberately writes no verdict —
    // only a PASS is ever cached — so turn 2 legitimately pays for a judge and
    // pays for nothing else. It is turn 3, the first turn after a figure has
    // both been generated and passed, that carries the claim: zero calls.
    // Measured with a two-turn harness, that turn was never run and the script
    // printed "STILL PAYING" for correct behaviour.
    const later: { graphical: boolean; calls: number; payload: unknown }[] = []
    for (let turn = 2; turn <= 4; turn++) {
      providerCalls = 0
      const d = await resolveVisualForTurn(
        { message: c.message, lessonConceptId: c.lessonConceptId, subject: 'physics', learnerRequest: 'diagram' },
        deps,
      )
      later.push({ graphical: d.graphical, calls: providerCalls, payload: d.payload })
      console.log(`  turn ${turn}  ${d.graphical ? 'FIGURE' : 'no figure'}  calls=${providerCalls}` +
        `  ${providerCalls === 0 ? '← FREE' : '← paid'}`)
    }

    const served = [first, ...later].filter((t) => t.graphical)
    const settled = later[later.length - 1]
    console.log(`  every served figure identical: ` +
      `${served.length > 1 ? served.every((t) => JSON.stringify(t.payload) === JSON.stringify(served[0].payload)) : 'n/a (fewer than two served)'}`)
    console.log(`  settled state: ${settled.graphical ? 'FIGURE' : 'no figure'} at ${settled.calls} provider calls`)
  }

  console.log(`\ncache rows written: ${[...rows.keys()].join(', ')}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
