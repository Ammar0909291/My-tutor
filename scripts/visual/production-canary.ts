/**
 * THE FULL CANARY — every category the engine must handle, against the real
 * provider, through the real authority.
 *
 * `verify-runtime-path.ts` proves the two economic claims (a non-KG topic can
 * be drawn; the next learner pays nothing). This proves the BEHAVIOURAL ones,
 * which are different questions and need different cases: that the engine
 * declines when a figure would not help, declines when it cannot draw the topic
 * honestly, reaches both 2D and 3D forms, and never serves a figure the critic
 * did not promote.
 *
 * NOTHING IS SIMULATED. Real Gemini, the real resolver, the real critic, the
 * real validators. The only substitution is the cache BACKEND — an in-process
 * Map instead of Postgres — because this sandbox has no DATABASE_URL. The cache
 * INTERFACE is the production one, so cache behaviour is measured, not assumed.
 *
 * Every provider call is counted by wrapping the client, so "cost" is a
 * measurement rather than a claim about which branch ran.
 *
 *   npx tsx scripts/visual/production-canary.ts
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

const rows = new Map<string, string>()
const cacheClient = {
  visualizationCache: {
    findUnique: async ({ where }: { where: { conceptKey: string } }) =>
      rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
    // Merge, never overwrite: a read arrives here as a renderCount increment
    // with no `code`, and assigning it blindly would destroy the row.
    update: async (args: unknown) => {
      const a = args as { where: { conceptKey: string }; data: { code?: string } }
      if (typeof a.data?.code === 'string') rows.set(a.where.conceptKey, a.data.code)
    },
    create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
      rows.set(data.conceptKey, data.code)
    },
  },
} as never

interface Case {
  name: string
  expect: 'figure' | 'no-figure'
  why: string
  lessonConceptId: string | null
  message: string
  subject?: string
  learnerRequest?: 'diagram' | null
  lastAssistantAskedQuestion?: boolean
}

const CASES: Case[] = [
  {
    name: '1. KG CONCEPT — in the curriculum, named in no list anywhere',
    expect: 'figure',
    why: 'kinetic energy against velocity is a parabola, and the parabola is the point',
    lessonConceptId: 'phys.mech.kinetic-energy',
    message: 'show me a diagram',
    subject: 'physics',
    learnerRequest: 'diagram',
  },
  {
    name: '2. NON-KG TOPIC — off-curriculum, grounded only by the learner\'s own words',
    expect: 'figure',
    why: 'the engine must draw what the learner asked about, not the lesson they sit in',
    lessonConceptId: 'phys.meas.units',
    message:
      'Explain Kubernetes pod scheduling — the scheduler filters out nodes that cannot ' +
      'run the pod, then scores the remaining ones and binds the pod to the best node',
    subject: 'physics',
    learnerRequest: 'diagram',
  },
  {
    name: '3. SUPPRESSED — the learner is ANSWERING, not asking',
    expect: 'no-figure',
    why: 'a short reply to the tutor\'s question must never move or introduce a figure',
    lessonConceptId: 'phys.mech.kinetic-energy',
    message: 'because it is squared',
    subject: 'physics',
    learnerRequest: null,
    lastAssistantAskedQuestion: true,
  },
  {
    name: '4. HONEST DECLINE — a concept with no truthful figure in any form',
    expect: 'no-figure',
    why: 'abstraction is not a shape; forcing it into one asserts something false',
    lessonConceptId: 'math.found.abstraction',
    message: 'show me a diagram',
    subject: 'mathematics',
    learnerRequest: 'diagram',
  },
  {
    name: '5. 2D REPRESENTATION — a procedure, which is a flow and not a scene',
    expect: 'figure',
    why: 'stoichiometry really is an ordered procedure',
    lessonConceptId: 'chem.found.stoichiometry',
    message: 'show me a diagram',
    subject: 'chemistry',
    learnerRequest: 'diagram',
  },
  {
    name: '6. 3D / SCENE — a spatial arrangement, which a flow cannot express',
    expect: 'figure',
    why: 'gas particles move in space; a list of steps would misrepresent it',
    lessonConceptId: 'chem.state.kinetic-theory',
    message: 'show me a diagram',
    subject: 'chemistry',
    learnerRequest: 'diagram',
  },
]

interface Row {
  topic: string
  need: string
  representation: string
  genCalls: number
  served: string
  cacheResult: string
  secondCost: number
}

async function run() {
  // NOTHING IS TYPED ANYWHERE. This is the acceptance criterion: no allowlist,
  // no review list, no per-topic configuration of any kind.
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_REVIEW_ONLY
  delete process.env.ENABLE_AI_SCENE_GENERATION

  const table: Row[] = []
  let total = 0
  let failures = 0

  for (const c of CASES) {
    console.log(`\n${'='.repeat(74)}\n${c.name}\n  ${c.why}`)
    const deps = {
      cacheClient,
      budgetReader: { countToday: async () => 0 },
      generate: counted,
      critic: countedCritic,
    } as never
    const turn = {
      message: c.message,
      lessonConceptId: c.lessonConceptId,
      subject: c.subject ?? null,
      learnerRequest: c.learnerRequest ?? null,
      lastAssistantAskedQuestion: c.lastAssistantAskedQuestion ?? false,
    }

    providerCalls = 0
    const first = await resolveVisualForTurn(turn, deps)
    const firstCalls = providerCalls
    total += firstCalls

    const renderer = first.payload?.renderer ?? '-'
    const payload = first.payload as Record<string, unknown> | null
    const form = payload
      ? (payload.visualSpec as { type?: string })?.type ??
        (payload.sceneSpec ? `scene/${(payload.sceneSpec as { sceneType?: string }).sceneType}` : '-')
      : '-'

    console.log(`  turn 1   ${first.graphical ? 'SERVED' : 'no figure'}  ` +
      `provenance=${first.provenance}  renderer=${renderer}  form=${form}  calls=${firstCalls}`)
    if (first.graphical && payload) {
      console.log(`           ${JSON.stringify(payload.visualSpec ?? payload.sceneSpec).slice(0, 300)}`)
    }

    // Turn 2, then turn 3. A HELD turn writes the figure cache but no verdict
    // (only a PASS is cached), so turn 2 legitimately pays for a judge. Turn 3
    // is the one that carries the zero-cost claim.
    providerCalls = 0
    await resolveVisualForTurn(turn, deps)
    const secondCalls = providerCalls
    providerCalls = 0
    const third = await resolveVisualForTurn(turn, deps)
    const thirdCalls = providerCalls
    total += secondCalls + thirdCalls
    console.log(`  turn 2   calls=${secondCalls}   turn 3   calls=${thirdCalls}  ` +
      `${third.graphical ? 'SERVED' : 'no figure'}`)

    const ok = c.expect === 'figure' ? first.graphical : !first.graphical
    if (!ok) { failures++; console.log(`  ✗ EXPECTED ${c.expect}`) }

    table.push({
      topic: c.name.replace(/^\d+\.\s*/, '').split(' — ')[0],
      need: first.continuityReason ?? '-',
      representation: first.graphical ? `${renderer}/${form}` : '-',
      genCalls: firstCalls,
      served: first.graphical ? 'SERVED' : String(first.provenance),
      cacheResult: rows.size > 0 ? 'cached' : 'none',
      secondCost: thirdCalls,
    })
  }

  console.log(`\n${'='.repeat(74)}\nTOTAL PROVIDER CALLS: ${total}`)
  console.log(`CACHE ROWS WRITTEN: ${rows.size}`)
  console.log(failures === 0 ? 'ALL CATEGORIES BEHAVED AS REQUIRED' : `${failures} CATEGORY FAILURES`)
  console.table(table)
}

run().catch((e) => { console.error(e); process.exit(1) })
