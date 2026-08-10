/**
 * Generate a cohort, judge every figure, and emit only what survived.
 *
 * This is the whole self-validating pipeline in one pass, run where nobody is
 * waiting: generate -> STATIC checks -> model judge -> decide. A figure reaches
 * a learner only by being PROMOTED here, which requires every one of the five
 * dimensions to pass outright. Anything uncertain stays DRAFT forever until a
 * human says otherwise.
 *
 * COST. Two provider calls per concept at most — one to draw, one to judge —
 * and the judge is skipped entirely for a figure the free STATIC checks already
 * rejected. Both are once per concept, ever, because the drawing is cached.
 *
 *   npx tsx scripts/visual/vet-cohort.ts --concepts a,b,c [--max 40]
 */

import { generateConceptFigure } from '../../src/lib/teaching/visual/visualEngine'
import { criticiseFigure, describeCritique } from '../../src/lib/teaching/visual/figureCritic'
import { hashContent } from '../../src/lib/teaching/assets/similarity'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'
import { lookupConceptVisualBinding, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'

const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] ?? null : null }
const maxConcepts = Number(arg('max') ?? 40)
const requested = arg('concepts')?.split(',').map((s) => s.trim()).filter(Boolean) ?? []

const isUncurated = (id: string) => !lookupConceptVisualBinding(id) && !getConceptSceneGenerator(id)

async function main() {
  const cohort = requested.filter(isUncurated).slice(0, maxConcepts)
  const curated = requested.filter((c) => !isUncurated(c))
  if (curated.length) console.error(`skipped ${curated.length} curated (generation never runs for them)`)

  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = cohort.join(',')
  process.env.VISUAL_AI_SCENE_AUTO = cohort.join(',')

  const store = new Map<string, string>()
  const cacheClient = {
    visualizationCache: {
      findUnique: async ({ where }: { where: { conceptKey: string } }) =>
        store.has(where.conceptKey) ? { code: store.get(where.conceptKey)! } : null,
      update: async () => undefined,
      create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
        store.set(data.conceptKey, data.code); return undefined
      },
    },
  } as never

  const rows: Array<Record<string, unknown>> = []
  let genCalls = 0, judgeCalls = 0

  for (const conceptId of cohort) {
    const node = getKGNode(conceptId)
    if (!node) { console.error(`SKIP ${conceptId} not in KG`); continue }
    const ctx = {
      conceptId, title: node.title, description: node.description ?? '',
      prerequisites: node.prerequisites ?? [], difficulty: node.difficulty,
    }

    const result = await generateConceptFigure(ctx, { cacheClient, budgetMs: 0 })
    genCalls++

    if (!result.ok) {
      console.error(`DECLINED ${conceptId.padEnd(40)} ${result.reason}`)
      rows.push({ conceptId, conceptTitle: node.title, outcome: 'declined', reason: result.reason })
      continue
    }

    const report = await criticiseFigure(result.figure, ctx)
    if (report.judged) judgeCalls++

    const payload = result.figure.kind === 'scene' ? result.figure.scene : result.figure.spec
    const serialized = JSON.stringify(payload)
    console.error(`${report.decision.toUpperCase().padEnd(8)} ${conceptId.padEnd(40)} ${describeCritique(report)}`)

    rows.push({
      conceptId,
      conceptTitle: node.title,
      outcome: report.decision,
      kind: result.figure.kind,
      confidence: report.confidence,
      judged: report.judged,
      reasons: Object.fromEntries(
        Object.entries(report.dimensions).map(([k, v]) => [k, `${v.verdict}: ${v.reason}`]),
      ),
      cacheKey: `scene:v1:fig:${conceptId}`,
      contentHash: hashContent(serialized),
      payload,
    })
  }

  const count = (o: string) => rows.filter((r) => r.outcome === o).length
  console.error(
    `\n${cohort.length} concepts · ${genCalls} generation calls · ${judgeCalls} judge calls\n` +
    `promote ${count('promote')} · hold ${count('hold')} · reject ${count('reject')} · declined ${count('declined')}`,
  )
  process.stdout.write(JSON.stringify(rows, null, 1))
}

main().catch((e) => { console.error(e); process.exit(1) })
