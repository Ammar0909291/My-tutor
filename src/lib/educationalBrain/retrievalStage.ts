/**
 * Stage 2 — Retrieval.
 * READ-ONLY queries against EbConcept / EbConceptEdge / EbAssetIdentity.
 * Physics-scoped. Never throws — sets shortCircuit on DB error.
 */
import { prisma } from '@/lib/db/prisma'
import type { TurnContext, ConceptContext, ConceptNeighbor, AssetBundle } from './types'

async function loadConceptContext(conceptId: string): Promise<ConceptContext | null> {
  const concept = await prisma.ebConcept.findUnique({
    where: { id: conceptId },
    select: { id: true, title: true, description: true, primaryDomain: true },
  })
  if (!concept) return null

  const edges = await prisma.ebConceptEdge.findMany({
    where: { OR: [{ fromConceptId: conceptId }, { toConceptId: conceptId }] },
    select: {
      fromConceptId: true,
      toConceptId: true,
      edgeKind: true,
      weight: true,
      fromConcept: { select: { id: true, title: true } },
      toConcept: { select: { id: true, title: true } },
    },
    take: 10,
  })

  const neighbors: ConceptNeighbor[] = edges.map((e) => {
    const isOutgoing = e.fromConceptId === conceptId
    const neighbor = isOutgoing ? e.toConcept : e.fromConcept
    return {
      conceptId: neighbor.id,
      title: neighbor.title,
      edgeKind: e.edgeKind,
      weight: e.weight,
      direction: isOutgoing ? 'dependent' : 'prerequisite',
    }
  })

  return {
    id: concept.id,
    title: concept.title,
    description: concept.description,
    primaryDomain: concept.primaryDomain,
    neighbors,
  }
}

async function loadAssets(conceptId: string): Promise<AssetBundle> {
  const assets = await prisma.ebAssetIdentity.findMany({
    where: { conceptId },
    select: { assetId: true, family: true },
    take: 20,
  })
  const bundle: AssetBundle = { explanationIds: [], visualIds: [], probeIds: [] }
  for (const a of assets) {
    if (a.family === 'EXPLANATION') bundle.explanationIds.push(a.assetId)
    else if (a.family === 'VISUAL') bundle.visualIds.push(a.assetId)
    else if (a.family === 'PROBE') bundle.probeIds.push(a.assetId)
  }
  return bundle
}

export async function retrievalStage(ctx: TurnContext): Promise<TurnContext> {
  if (ctx.shortCircuit) return ctx
  if (!ctx.intent || ctx.intent.topicSurfaces.length === 0) {
    return {
      ...ctx,
      spans: [...ctx.spans, { stage: 'retrieval', startedAt: Date.now(), durationMs: 0, notes: 'no topic surfaces — skipped' }],
    }
  }

  const start = Date.now()
  // Take the first surfaced concept (highest priority order from intentStage)
  const candidateConcept = ctx.intent.topicSurfaces[0]

  try {
    const [conceptContext, candidateAssets] = await Promise.all([
      loadConceptContext(candidateConcept),
      loadAssets(candidateConcept),
    ])

    return {
      ...ctx,
      candidateConcept,
      conceptContext,
      candidateAssets,
      spans: [...ctx.spans, { stage: 'retrieval', startedAt: start, durationMs: Date.now() - start }],
    }
  } catch (err) {
    console.warn('[EB retrieval] DB error:', err)
    return {
      ...ctx,
      shortCircuit: 'retrieval_db_error',
      spans: [...ctx.spans, { stage: 'retrieval', startedAt: start, durationMs: Date.now() - start, notes: 'db_error' }],
    }
  }
}
