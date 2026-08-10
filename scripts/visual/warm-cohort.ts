/**
 * Warm a cohort of concepts, and print what to write to production.
 *
 * WHY THIS EXISTS AS A SCRIPT. `warmConceptScenes` does the work, but it wants
 * a database for the cache and a sink for the outcomes, and the environment
 * that holds the provider key is not always the environment that holds
 * DATABASE_URL. So this runs the real engine against an in-memory cache and
 * emits the rows — the figures are produced by the engine, never by this file,
 * and a figure the engine rejects is reported rejected rather than written.
 *
 * COST. One provider call per concept, once, ever: the emitted cache rows are
 * what stop the next call happening. Bounded by --max.
 *
 *   npx tsx scripts/visual/warm-cohort.ts --max 10 [--concepts a,b,c]
 */

import { generateConceptFigure } from '../../src/lib/teaching/visual/visualEngine'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'
import { lookupConceptVisualBinding, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'

const arg = (name: string): string | null => {
  const i = process.argv.indexOf(`--${name}`)
  return i >= 0 ? process.argv[i + 1] ?? null : null
}

const maxCalls = Number(arg('max') ?? 10)
const explicit = arg('concepts')?.split(',').map((s) => s.trim()).filter(Boolean) ?? []

/**
 * A concept the engine would actually generate for. Curated concepts never
 * reach generation, so warming one would spend a call on a figure that can
 * never be served — the single easiest way to waste a quota here.
 */
function isUncurated(conceptId: string): boolean {
  return !lookupConceptVisualBinding(conceptId) && !getConceptSceneGenerator(conceptId)
}

async function main() {
  if (explicit.length === 0) {
    console.error('Pass --concepts a,b,c. A cohort is chosen deliberately, never swept.')
    process.exit(1)
  }
  // Curated concepts never reach generation, so warming one spends a call on a
  // figure that can never be served.
  const skipped = explicit.filter((c) => !isUncurated(c))
  if (skipped.length > 0) console.log(`SKIP (curated): ${skipped.join(', ')}`)
  const candidates = explicit.filter(isUncurated)

  // The engine's own eligibility gate reads these; the script is warming, so it
  // authorises exactly the cohort it was asked for and nothing wider.
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = candidates.join(',')
  process.env.VISUAL_AI_SCENE_AUTO = candidates.join(',')

  const store = new Map<string, string>()
  const cacheClient = {
    visualizationCache: {
      findUnique: async ({ where }: { where: { conceptKey: string } }) =>
        store.has(where.conceptKey) ? { code: store.get(where.conceptKey)! } : null,
      update: async () => undefined,
      create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
        store.set(data.conceptKey, data.code)
        return undefined
      },
    },
  } as never

  const emitted: Array<Record<string, unknown>> = []
  let calls = 0

  for (const conceptId of candidates) {
    if (calls >= maxCalls) break
    const node = getKGNode(conceptId)
    if (!node) { console.log(`SKIP  ${conceptId}  (not in KG)`); continue }

    const started = Date.now()
    const result = await generateConceptFigure(
      {
        conceptId,
        title: node.title,
        description: node.description ?? '',
        prerequisites: node.prerequisites ?? [],
        difficulty: node.difficulty,
      },
      { cacheClient, budgetMs: 0 },
    )
    calls++
    const ms = Date.now() - started

    if (!result.ok) {
      console.log(`REJECT ${conceptId}  ${result.reason}  ${ms}ms`)
      emitted.push({ conceptId, conceptTitle: node.title, accepted: false, reason: result.reason, elapsedMs: ms })
      continue
    }

    const figure = result.figure
    const payload = figure.kind === 'scene' ? figure.scene : figure.spec
    console.log(`OK     ${conceptId}  ${figure.kind}  ${ms}ms`)
    emitted.push({
      conceptId,
      conceptTitle: node.title,
      accepted: true,
      kind: figure.kind,
      elapsedMs: ms,
      cacheKey: `scene:v1:fig:${conceptId}`,
      payload,
    })
  }

  console.log(`\n--- ${calls} provider calls ---`)
  console.log(JSON.stringify(emitted, null, 2))
}

main().catch((err) => { console.error(err); process.exit(1) })
