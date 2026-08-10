/**
 * RANDOM SUBJECT-SPACE STRESS TEST.
 *
 * Ten concepts each from Physics, Chemistry and Mathematics, chosen by a SEEDED
 * random draw over the real Knowledge Graph — not picked, and not filtered to
 * the ones likely to succeed. The question is whether the engine behaves well
 * across the subject space, which a hand-chosen cohort cannot answer.
 *
 * Real resolver, real Gemini, real critic, real validators, real NEED gate.
 * The only substitution is the cache BACKEND (an in-process Map, because this
 * sandbox has no DATABASE_URL); the cache INTERFACE is production's, so cost is
 * measured rather than assumed.
 *
 * Three turns per topic: turn 1 pays, turn 3 carries the zero-cost claim.
 *
 *   npx tsx scripts/visual/stress-cohort.ts [--seed 20260810]
 */

import { writeFileSync } from 'fs'
import { resolveVisualForTurn } from '../../src/lib/teaching/visual/resolveVisual'
import { criticiseFigure } from '../../src/lib/teaching/visual/figureCritic'
import { generateJSON } from '../../src/lib/ai/client'
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'
import { lookupConceptVisualBinding, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'
import type { GeneratedFigure } from '../../src/lib/teaching/visual/visualEngine'
import type { ArchetypeContext } from '../../src/lib/teaching/visual/archetypes'

const SEED = Number(process.argv[process.argv.indexOf('--seed') + 1]) || 20260810
const PER_SUBJECT = 10
const SUBJECTS = ['physics', 'chemistry', 'mathematics'] as const

/** mulberry32 — small, seeded, reproducible. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let providerCalls = 0
let lastLatency = 0
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
    update: async (args: unknown) => {
      const a = args as { where: { conceptKey: string }; data: { code?: string } }
      if (typeof a.data?.code === 'string') rows.set(a.where.conceptKey, a.data.code)
    },
    create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
      rows.set(data.conceptKey, data.code)
    },
  },
} as never

interface Result {
  subject: string
  conceptId: string
  title: string
  identity: string
  curated: boolean
  need: string
  representation: string
  provenance: string
  served: boolean
  calls1: number
  calls2: number
  calls3: number
  latencyMs: number
  payload: unknown
}

async function main() {
  // Nothing typed anywhere: no allowlist, no hold list, no per-topic config.
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_REVIEW_ONLY
  delete process.env.ENABLE_AI_SCENE_GENERATION

  const rand = rng(SEED)
  const cohort: { subject: string; id: string; title: string; curated: boolean }[] = []

  for (const subject of SUBJECTS) {
    const g = getKnowledgeGraph(subject)
    if (!g) { console.error(`NO GRAPH: ${subject}`); continue }
    const nodes = getAllNodes(g)
    if (nodes.length < PER_SUBJECT) {
      console.error(`TOO FEW CONCEPTS in ${subject}: ${nodes.length}`)
      continue
    }
    // Seeded Fisher-Yates over a stable, id-sorted list so the draw is
    // reproducible regardless of graph iteration order.
    const pool = [...nodes].sort((a, b) => a.id.localeCompare(b.id))
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    for (const n of pool.slice(0, PER_SUBJECT)) {
      cohort.push({
        subject, id: n.id, title: n.title,
        curated: Boolean(lookupConceptVisualBinding(n.id) || getConceptSceneGenerator(n.id)),
      })
    }
  }

  console.log(`SEED ${SEED} · ${cohort.length} concepts\n`)
  const results: Result[] = []
  const started = Date.now()

  for (const c of cohort) {
    const deps = {
      cacheClient,
      budgetReader: { countToday: async () => 0 },
      generate: counted,
      critic: countedCritic,
    } as never
    const turn = {
      message: 'show me a diagram',
      lessonConceptId: c.id,
      subject: c.subject,
      learnerRequest: 'diagram' as const,
      lastAssistantAskedQuestion: false,
    }

    providerCalls = 0
    const t0 = Date.now()
    const first = await resolveVisualForTurn(turn, deps)
    lastLatency = Date.now() - t0
    const calls1 = providerCalls

    providerCalls = 0
    await resolveVisualForTurn(turn, deps)
    const calls2 = providerCalls
    providerCalls = 0
    await resolveVisualForTurn(turn, deps)
    const calls3 = providerCalls

    const p = first.payload as Record<string, unknown> | null
    const form = p
      ? ((p.visualSpec as { type?: string })?.type ??
         (p.sceneSpec ? `scene/${(p.sceneSpec as { sceneType?: string }).sceneType}` : 'card'))
      : 'none'

    results.push({
      subject: c.subject, conceptId: c.id, title: c.title,
      identity: 'KG', curated: c.curated,
      need: first.continuityReason ?? '-',
      representation: form,
      provenance: String(first.provenance),
      served: first.graphical,
      calls1, calls2, calls3, latencyMs: lastLatency,
      payload: p ? (p.visualSpec ?? p.sceneSpec ?? { card: p.visualType }) : null,
    })

    console.log(
      `${c.subject.slice(0, 4).padEnd(5)} ${c.id.padEnd(38)} ` +
      `${first.graphical ? 'SERVED  ' : 'no-fig  '} ${form.padEnd(14)} ` +
      `c1=${calls1} c2=${calls2} c3=${calls3} ${lastLatency}ms  ${first.provenance}`,
    )
  }

  const totalMs = Date.now() - started
  const totalCalls = results.reduce((s, r) => s + r.calls1 + r.calls2 + r.calls3, 0)
  const served = results.filter((r) => r.served)
  const gen = served.filter((r) => r.provenance.startsWith('generated'))
  const zeroSecond = results.filter((r) => r.calls3 === 0)

  console.log(`\n${'='.repeat(78)}`)
  console.log(`total provider calls ......... ${totalCalls}`)
  console.log(`served ....................... ${served.length}/${results.length}`)
  console.log(`  of which runtime-generated . ${gen.length}`)
  console.log(`  of which curated/registry .. ${served.length - gen.length}`)
  console.log(`third request free ........... ${zeroSecond.length}/${results.length}`)
  console.log(`total runtime ................ ${(totalMs / 1000).toFixed(1)}s`)
  const lat = results.map((r) => r.latencyMs)
  console.log(`latency avg / worst .......... ${Math.round(lat.reduce((a, b) => a + b, 0) / lat.length)}ms / ${Math.max(...lat)}ms`)

  writeFileSync(
    '/tmp/claude-0/-home-user-My-tutor/a88f6ce6-c880-55bb-be01-b00d9ba68923/scratchpad/stress.json',
    JSON.stringify({ seed: SEED, results }, null, 1),
  )
  console.log('\nwrote stress.json')
}

main().catch((e) => { console.error(e); process.exit(1) })
