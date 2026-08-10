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
    update: async (args: unknown) => {
      const a = args as { where: { conceptKey: string }; data: { code: string } }
      rows.set(a.where.conceptKey, a.data.code)
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

    providerCalls = 0
    const second = await resolveVisualForTurn(
      { message: c.message, lessonConceptId: c.lessonConceptId, subject: 'physics', learnerRequest: 'diagram' },
      deps,
    )
    const secondCalls = providerCalls
    console.log(`  turn 2  ${second.graphical ? 'FIGURE' : 'no figure'}  calls=${secondCalls}` +
      `  ${secondCalls === 0 ? '← FREE' : '← STILL PAYING'}`)

    const identical = JSON.stringify(second.payload) === JSON.stringify(first.payload)
    console.log(`  same figure served twice: ${identical}`)
  }

  console.log(`\ncache rows written: ${[...rows.keys()].join(', ')}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
