import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } from '@prisma/client'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { seedCanonicalSlug, SEED_LANGUAGE, SEED_AUTHOR_ID } from '@/lib/teaching/assets/brainSeedAssets'
import { hashContent } from '@/lib/teaching/assets/similarity'
import { createSubjectAdapter } from '@/lib/curriculum/subjectKgAdapter'
import { randomUUID } from 'crypto'

// TEMPORARY, ONE-TIME operational endpoint (runbook item 1 completion —
// see ENGINEERING_RUNBOOK_BLOCKED_ITEMS.md). Runs the exact same logic as
// scripts/brain/seed-knowledge-assets.ts, scoped to the chemistry
// collections only, so it can execute inside Vercel's runtime where
// DATABASE_URL is already configured (no raw TCP/credential needed from
// the calling session). Always seeds as DRAFT; idempotent by
// canonicalSlug (skips existing rows via bulk pre-check, matching the
// real script's behavior). Delete this file once chemistry seeding is
// complete and verified — it is not part of the permanent API surface.
export const dynamic = 'force-dynamic'

const SEED_TOKEN = '1cf37be6-17d6-493c-a094-89e92bcd8e02'

export async function POST(req: Request) {
  const token = req.headers.get('x-seed-token')
  if (token !== SEED_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const e of CHEMISTRY_EXPLANATIONS) {
    if (!createSubjectAdapter('chemistry').getConceptNode(e.conceptId)) {
      return NextResponse.json({ error: `ABORT: ${e.conceptId} not found in chemistry KG` }, { status: 500 })
    }
  }
  for (const p of CHEMISTRY_PROBES) {
    if (!createSubjectAdapter('chemistry').getConceptNode(p.conceptId)) {
      return NextResponse.json({ error: `ABORT: ${p.conceptId} not found in chemistry KG` }, { status: 500 })
    }
  }

  const existing = await prisma.assetIdentity.findMany({
    where: { conceptId: { startsWith: 'chem.' } },
    select: { canonicalSlug: true },
  })
  const existingSlugs = new Set(existing.map((r) => r.canonicalSlug))

  const now = new Date()
  const identityRows: Array<{
    assetId: string; family: AssetFamily; familyKind: string; conceptId: string
    language: string; gradeBand: string; authorId: string; authorKind: AuthorKind
    status: AssetStatus; version: number; canonicalSlug: string; contentHash: string
    tags: string[]; intellectualProperty: string; curriculumMappings: unknown[]
    incompatibilities: string[]; prerequisites: string[]; createdAt: Date; updatedAt: Date
  }> = []
  const explanationRows: Array<{
    assetId: string; content: string; style: ExplanationStyle; readingLevel: number
    lengthChars: number; targetedMisconceptions: string[]
  }> = []
  const probeRows: Array<{
    assetId: string; stem: string; choices: unknown; correctValue: string | null
    keywords: string[]; difficulty: string; targetedMisconceptions: string[]; requiredVisuals: string[]
  }> = []

  let skipped = 0

  for (const e of CHEMISTRY_EXPLANATIONS) {
    const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
    if (existingSlugs.has(canonicalSlug)) { skipped++; continue }
    const assetId = randomUUID()
    identityRows.push({
      assetId, family: AssetFamily.EXPLANATION, familyKind: e.familyKind, conceptId: e.conceptId,
      language: SEED_LANGUAGE, gradeBand: e.gradeBand, authorId: SEED_AUTHOR_ID,
      authorKind: AuthorKind.HUMAN_CURATOR, status: AssetStatus.DRAFT, version: 1, canonicalSlug,
      contentHash: hashContent(e.content), tags: [e.subjectSlug, e.familyKind],
      intellectualProperty: 'proprietary', curriculumMappings: [], incompatibilities: [], prerequisites: [],
      createdAt: now, updatedAt: now,
    })
    explanationRows.push({
      assetId, content: e.content, style: ExplanationStyle.CONCRETE, readingLevel: 0,
      lengthChars: e.content.length, targetedMisconceptions: e.targetedMisconceptions,
    })
  }

  for (const p of CHEMISTRY_PROBES) {
    const canonicalSlug = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
    if (existingSlugs.has(canonicalSlug)) { skipped++; continue }
    const assetId = randomUUID()
    identityRows.push({
      assetId, family: AssetFamily.PROBE, familyKind: p.probeKind, conceptId: p.conceptId,
      language: SEED_LANGUAGE, gradeBand: p.gradeBand, authorId: SEED_AUTHOR_ID,
      authorKind: AuthorKind.HUMAN_CURATOR, status: AssetStatus.DRAFT, version: 1, canonicalSlug,
      contentHash: hashContent(p.stem), tags: [p.subjectSlug, p.probeKind],
      intellectualProperty: 'proprietary', curriculumMappings: [], incompatibilities: [], prerequisites: [],
      createdAt: now, updatedAt: now,
    })
    probeRows.push({
      assetId, stem: p.stem, choices: p.choices ?? null, correctValue: p.correctValue ?? null,
      keywords: [], difficulty: p.difficulty, targetedMisconceptions: p.targetedMisconceptions, requiredVisuals: [],
    })
  }

  await prisma.$transaction(async (tx) => {
    if (identityRows.length > 0) {
      await tx.assetIdentity.createMany({ data: identityRows as never })
    }
    if (explanationRows.length > 0) {
      await tx.explanationAsset.createMany({ data: explanationRows as never })
    }
    if (probeRows.length > 0) {
      await tx.probeAsset.createMany({ data: probeRows as never })
    }
  })

  return NextResponse.json({
    success: true,
    created: identityRows.length,
    skipped,
    explanationsCreated: explanationRows.length,
    probesCreated: probeRows.length,
    total: CHEMISTRY_EXPLANATIONS.length + CHEMISTRY_PROBES.length,
  })
}
