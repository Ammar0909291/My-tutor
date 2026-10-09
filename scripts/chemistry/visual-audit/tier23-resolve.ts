/**
 * CHEMISTRY TIER 2 / TIER 3 RESOLUTION AUDIT — what the REAL resolver serves from the production snapshot.
 *
 *   npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts                  # summary to stdout
 *   npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts --out <dir>      # also writes the artefacts
 *
 * WHY IT EXISTS. `inventory.ts` enumerates Tier -1/0/1 (synchronous, in-repo). Tier 2 (an ACTIVE visual asset a human
 * approved) and Tier 3 (a figure the model generated and a critic promoted, cached in `visualization_cache`) live in the
 * production database, so the first campaign could only call them "eligible" — and 147 of 186 concepts have a generated
 * figure there, 74 with a promote verdict, shown to learners ~6,000 times. This script closes that gap WITHOUT a second
 * resolver: it runs the real `resolveVisualForTurn` (tiers, retirement, the cache/verdict/decline read path, the
 * admission gate incl. the chemistry predicate) over every concept, with the database replaced by a read-only cache client
 * backed by the committed production snapshot (docs/qa/chemistry-visual-audit/tier23-snapshot, see its README).
 *
 * What it can and cannot say. A concept whose figure is in the snapshot with a `promote` verdict is replayed exactly as
 * production serves it. A cache MISS would need a live model call and a live critic: the stubs here refuse (generation
 * returns nothing, the critic holds), so such a concept is reported as `needs-live-generation`, never as content.
 *
 * Two modes per concept: `asked` (the learner says "show me a diagram" — the widest door) and `ordinary` (no request).
 *
 * Output (with --out):
 *   tier23-resolution.json   one record per concept (186) + summary
 *   tier23-manifest.json     the Tier 2 / Tier 3 figures actually SERVED, as render-measure.mjs manifest entries
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

import { getKnowledgeGraph, getAllNodes } from '../../../src/lib/curriculum/knowledgeGraph'
import { resolveVisualForTurn, type ResolveVisualInput } from '../../../src/lib/teaching/visual/resolveVisual'
import { figureFingerprint } from '../../../src/lib/teaching/visual/fingerprint'
import { figureCacheKey, validateGeneratedFigure, type GeneratedFigure } from '../../../src/lib/teaching/visual/visualEngine'
import { verdictKey, declineKey } from '../../../src/lib/teaching/visual/verdictCache'
import { kgTopicIdentity, groundingHash } from '../../../src/lib/teaching/visual/topicIdentity'
import { NO_DEADLINE } from '../../../src/lib/teaching/visual/turnDeadline'
import type { VisualizationCacheClient } from '../../../src/lib/teaching/visuals/visualizationCache'
import type { VisualDecision } from '../../../src/lib/teaching/visual/types'

const ROOT = resolve(process.cwd())
const SNAP = join(ROOT, 'docs/qa/chemistry-visual-audit/tier23-snapshot')
if (!existsSync(join(SNAP, 'figures.json'))) {
  console.error('Snapshot not found: ' + SNAP)
  process.exit(2)
}
const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }

// ── the snapshot ────────────────────────────────────────────────────────────
interface FigureRow { conceptId: string; renderCount: number; cachedOn: string; figure: unknown }
const figures = JSON.parse(readFileSync(join(SNAP, 'figures.json'), 'utf8')) as FigureRow[]
const verdicts = JSON.parse(readFileSync(join(SNAP, 'verdicts.json'), 'utf8')) as Record<string, 'promote' | 'reject'>
const declines = new Set(JSON.parse(readFileSync(join(SNAP, 'declines.json'), 'utf8')) as string[])
const tier2 = JSON.parse(readFileSync(join(SNAP, 'tier2-active.json'), 'utf8')) as Array<{ conceptId: string; renderer: string; specPayload: unknown }>
const figureByConcept = new Map(figures.map((f) => [f.conceptId, f]))
const tier2ByConcept = new Map(tier2.map((t) => [t.conceptId, t]))

/** The groundings the verdicts were judged against are not in the snapshot; the verdict row stores `grounding`+`figure`. */
function snapshotRows(conceptId: string): Map<string, string> {
  const rows = new Map<string, string>()
  const fig = figureByConcept.get(conceptId)
  if (fig) rows.set(figureCacheKey(conceptId), JSON.stringify(fig.figure))
  return rows
}

/**
 * A read-only cache client over the snapshot. Writes are RECORDED, never applied: a write during replay means the
 * resolver tried to generate or judge something, which is the signal for "needs a live model call".
 */
function makeClient(conceptId: string, writes: string[]): VisualizationCacheClient {
  const rows = snapshotRows(conceptId)
  const ctx = kgTopicIdentity(conceptId)
  const fig = figureByConcept.get(conceptId)
  const verdict = verdicts[conceptId]
  if (ctx && fig && verdict) {
    // A stored verdict is only honoured while the grounding AND the figure fingerprint match what is being served now
    // (verdictCache.readVerdict). The snapshot holds the decision, so reconstruct a row that matches the current KG text:
    // the question this audit asks is "what does a promote/reject verdict do to this figure", not "has the KG text moved".
    // The fingerprint is taken over the VALIDATED payload, exactly as resolveVisualForTurn does (the model JSON and the
    // validated figure are not byte-identical); `--fp` prints it so it can be compared with the stored verdict rows.
    const v = validateGeneratedFigure(fig.figure, ctx, { requireAxisLabels: true })
    const payload = v.ok ? (v.figure.kind === 'scene' ? v.figure.scene : v.figure.spec) : fig.figure
    rows.set(verdictKey(conceptId), JSON.stringify({
      decision: verdict, confidence: 1, grounding: groundingHash(ctx), figure: figureFingerprint(payload as never), judgedAt: Date.now(),
    }))
    if (process.argv.includes('--fp')) console.log(`FP ${conceptId}:${figureFingerprint(payload as never)}`)
  }
  if (declines.has(conceptId)) rows.set(declineKey(conceptId), JSON.stringify({ reason: 'no-suitable-form', at: Date.now() }))
  return {
    visualizationCache: {
      findUnique: async ({ where }) => (rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null),
      update: async () => undefined,
      create: async ({ data }) => { writes.push(data.conceptKey); return undefined },
      upsert: async ({ create }) => { writes.push(create.conceptKey); return undefined },
    },
  }
}

// ── the replay ──────────────────────────────────────────────────────────────
interface Replay {
  graphical: boolean
  source: string | null
  provenance: string | null
  renderer: string | null
  field: 'visual' | 'visualSpec' | 'sceneSpec' | null
  fingerprint: string | null
  needsLiveCall: boolean
  payload: unknown
}

async function replay(conceptId: string, title: string, mode: 'asked' | 'ordinary'): Promise<Replay> {
  const writes: string[] = []
  let criticCalled = false
  let generateCalled = false
  const input: ResolveVisualInput = {
    message: mode === 'asked' ? 'Show me a diagram' : 'Okay, I think I understand.',
    lessonConceptId: conceptId,
    subject: 'chemistry',
    learnerRequest: mode === 'asked' ? 'diagram' : null,
    activeSession: null,
  }
  let decision: VisualDecision
  try {
    decision = await resolveVisualForTurn(input, {
      cacheClient: makeClient(conceptId, writes),
      enabled: () => true,
      policy: 'auto',
      deadline: NO_DEADLINE,
      sessionGenerationCount: 0,
      budgetReader: { countToday: async () => 0 },
      generate: async () => { generateCalled = true; return null },
      critic: async () => { criticCalled = true; return { decision: 'hold', confidence: 0, judged: false, dimensions: {} } as never },
      findApprovedFigure: async (id) => {
        const t = tier2ByConcept.get(id)
        return t ? ({ kind: 'spec', spec: t.specPayload } as unknown as GeneratedFigure) : null
      },
      hasApprovedFigure: async (id) => tier2ByConcept.has(id),
      outcomeSink: undefined,
    })
  } catch (e) {
    return { graphical: false, source: null, provenance: `threw:${String((e as Error).message).slice(0, 80)}`, renderer: null, field: null, fingerprint: null, needsLiveCall: false, payload: null }
  }
  const p = decision.payload as { renderer?: string; visualType?: string; visualSpec?: unknown; sceneSpec?: unknown } | null | undefined
  const field = !decision.graphical || !p ? null : p.renderer === 'card' ? 'visual' : p.renderer === 'spec' ? 'visualSpec' : 'sceneSpec'
  const value = !p ? null : p.renderer === 'card' ? p.visualType : p.renderer === 'spec' ? p.visualSpec : p.sceneSpec
  void title
  return {
    graphical: !!decision.graphical,
    source: decision.source ?? null,
    provenance: decision.provenance ?? null,
    renderer: p?.renderer ?? null,
    field,
    fingerprint: value ? figureFingerprint(value as never) : null,
    needsLiveCall: generateCalled || criticCalled,
    payload: value ?? null,
  }
}

type Category =
  | 'E1-curated-tier0/1'         // served from the synchronous tiers
  | 'E2-approved-tier2'          // served: a human-approved figure
  | 'E3-generated-tier3'         // served: cached figure with a promote verdict, admitted
  | 'D-generated-rejected'       // a generated figure exists but the critic (or a gate) refuses it
  | 'C-figure-not-reachable'     // a figure exists in the snapshot but a curated tier shadows it
  | 'A-declined-no-suitable-form'// the generator deliberately declined (a recorded decision)
  | 'B-no-figure-unexamined'     // no figure and no recorded decision: the R12 review set
  | 'X-retired'

async function main() {
  const kg = getKnowledgeGraph('chemistry')
  const nodes = getAllNodes(kg)
  const records: Array<Record<string, unknown>> = []
  const manifest: Array<Record<string, unknown>> = []
  const seenFp = new Map<string, number>()

  for (const n of nodes) {
    const asked = await replay(n.id, n.title, 'asked')
    const ordinary = await replay(n.id, n.title, 'ordinary')
    const cached = figureByConcept.get(n.id)
    const verdict = verdicts[n.id] ?? null
    const t2 = tier2ByConcept.has(n.id)
    const prov = asked.provenance ?? ''

    let category: Category
    if (asked.graphical && prov.startsWith('approved:')) category = 'E2-approved-tier2'
    else if (asked.graphical && prov.startsWith('generated')) category = 'E3-generated-tier3'
    else if (asked.graphical) category = 'E1-curated-tier0/1'
    else if (/retired/.test(prov)) category = 'X-retired'
    else if (/critic-reject|retry-/.test(prov) || (cached && verdict === 'reject')) category = 'D-generated-rejected'
    else if (declines.has(n.id)) category = 'A-declined-no-suitable-form'
    else category = 'B-no-figure-unexamined'
    // A figure in the snapshot that a curated tier shadows is category C, but only when the curated tier really serves.
    const shadowed = !!cached && asked.graphical && !prov.startsWith('generated') && !prov.startsWith('approved:')

    records.push({
      conceptId: n.id, title: n.title,
      snapshot: { hasCachedFigure: !!cached, cachedKind: cached ? ((cached.figure as { steps?: unknown }).steps ? 'scene' : 'spec') : null, verdict, declined: declines.has(n.id), tier2: t2, renderCount: cached?.renderCount ?? 0 },
      asked: { graphical: asked.graphical, source: asked.source, provenance: asked.provenance, renderer: asked.renderer, field: asked.field, fingerprint: asked.fingerprint, needsLiveCall: asked.needsLiveCall },
      ordinary: { graphical: ordinary.graphical, source: ordinary.source, provenance: ordinary.provenance, renderer: ordinary.renderer, field: ordinary.field, needsLiveCall: ordinary.needsLiveCall },
      category, shadowedCachedFigure: shadowed,
    })

    if ((category === 'E2-approved-tier2' || category === 'E3-generated-tier3') && asked.field && asked.payload) {
      const fp = asked.fingerprint!
      seenFp.set(fp, (seenFp.get(fp) ?? 0) + 1)
      manifest.push({
        instanceId: `${category === 'E2-approved-tier2' ? 'tier2' : 'tier3'}:${n.id}`,
        conceptIds: [n.id],
        tier: category === 'E2-approved-tier2' ? 2 : 3,
        scope: 'concept',
        kind: asked.field === 'visualSpec' ? String((asked.payload as { type?: string }).type) : String((asked.payload as { sceneType?: string }).sceneType),
        representation: null,
        renderer: asked.field === 'visualSpec' ? 'VisualRenderer' : 'SceneSpecFigure',
        rendererKind: asked.field === 'visualSpec' ? 'spec' : 'scene',
        sourceFile: 'production snapshot (docs/qa/chemistry-visual-audit/tier23-snapshot)',
        registrationRef: category === 'E2-approved-tier2' ? 'visual_assets ACTIVE' : 'visualization_cache scene:v1:fig + verdict promote',
        origin: category === 'E2-approved-tier2' ? 'approved' : 'generated',
        reachability: 'resolver',
        interactive: false,
        flags: { graph: asked.field === 'visualSpec' && (asked.payload as { type?: string }).type === 'graph', molecular: false, reaction: false, processFlow: asked.field === 'visualSpec' && (asked.payload as { type?: string }).type === 'process_flow', threeD: asked.field === 'sceneSpec', periodic: false, equilibrium: false, energyProfile: false },
        fingerprint: fp,
        payload: { field: asked.field, value: asked.payload },
        details: { renderCount: snapRow(n.id)?.renderCount ?? 0, verdict, cachedOn: snapRow(n.id)?.cachedOn ?? null },
      })
    }
  }
  function snapRow(id: string) { return figureByConcept.get(id) }

  const by: Record<string, number> = {}
  for (const r of records) by[r.category as string] = (by[r.category as string] ?? 0) + 1
  const summary = {
    snapshotDate: '2026-10-09',
    concepts: records.length,
    byCategory: by,
    figuresInSnapshot: figures.length,
    verdicts: { promote: Object.values(verdicts).filter((v) => v === 'promote').length, reject: Object.values(verdicts).filter((v) => v === 'reject').length },
    declines: declines.size,
    tier2: tier2.length,
    servedFromTier2or3: manifest.length,
    shadowedCachedFigures: records.filter((r) => r.shadowedCachedFigure).length,
    needLiveCallWhenAsked: records.filter((r) => (r.asked as { needsLiveCall: boolean }).needsLiveCall).length,
    renderCountsOfServedFigures: manifest.reduce((s, m) => s + ((m.details as { renderCount: number }).renderCount), 0),
  }
  console.log(JSON.stringify(summary, null, 2))
  const out = arg('out')
  if (out) {
    mkdirSync(out, { recursive: true })
    writeFileSync(join(out, 'tier23-resolution.json'), JSON.stringify({ summary, concepts: records }, null, 1) + '\n')
    writeFileSync(join(out, 'tier23-manifest.json'), JSON.stringify(manifest, null, 1) + '\n')
    console.log(`wrote tier23-resolution.json (${records.length} concepts) and tier23-manifest.json (${manifest.length} served figures) -> ${out}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
