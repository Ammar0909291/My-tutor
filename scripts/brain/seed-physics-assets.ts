/**
 * Physics Completion Program — curated AssetIdentity seeding, PHYSICS ONLY.
 *
 * Mirrors scripts/brain/seed-knowledge-assets.ts's exact logic (canonicalSlug
 * generation, contentHash generation, idempotency-by-canonicalSlug, KG-id
 * validation) but scoped to physics items only from
 * src/lib/teaching/assets/brainSeedAssets.ts + authoredSeedAssets.ts, so it
 * can be run standalone against production from any environment with a real
 * DATABASE_URL without touching Mathematics/English/Chemistry/Biology/CS.
 *
 * Status policy: always DRAFT, authorKind HUMAN_CURATOR, version 1 — this
 * program's explicit scope stops at DRAFT; promotion to ACTIVE is a separate,
 * manual, out-of-scope step (see /api/admin/knowledge-assets).
 *
 * Idempotent: skips any canonicalSlug that already exists (covers rows
 * already seeded manually via Supabase MCP in prior sessions, e.g. the first
 * 40 EXPLANATION rows seeded 2026-07-26).
 *
 * Run: npx tsx scripts/brain/seed-physics-assets.ts [--dry-run]
 */
import { PrismaClient, AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } from '@prisma/client'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
  buildProbeSlugResolver,
} from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { hashContent } from '../../src/lib/teaching/assets/similarity'
import {
  validateSeedIdentities, formatSeedIdentityReport, previewOf,
} from '../../src/lib/teaching/assets/seedIdentityValidation'

const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS].filter((e) => e.subjectSlug === 'physics')
const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES].filter((p) => p.subjectSlug === 'physics')

const prisma = new PrismaClient()

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const status = AssetStatus.DRAFT

  const { createSubjectAdapter } = await import('../../src/lib/curriculum/subjectKgAdapter')
  const physicsAdapter = createSubjectAdapter('physics')
  const allConceptIds = new Set([
    ...ALL_EXPLANATIONS.map((e) => e.conceptId),
    ...ALL_PROBES.map((p) => p.conceptId),
  ])
  for (const conceptId of allConceptIds) {
    const node = physicsAdapter.getConceptNode(conceptId)
    if (!node) {
      console.error(`ABORT: seeded conceptId "${conceptId}" not found in the physics canonical KG`)
      process.exit(1)
    }
  }
  console.log(`KG check passed: ${allConceptIds.size} physics concept ids resolved against the live KG`)

  // Guard 2 (Remediation Item 3) — see seed-knowledge-assets.ts for the full
  // rationale. Same validator, same ordering contract: the dedup below keys on
  // canonicalSlug alone, so a colliding dataset would seed the first item and
  // silently drop the rest. Refuse before the first write rather than discard.
  // ADR 14 13 (Item 6): ladder rungs get a difficulty segment; singletons
  // keep the identity they already have. One resolver, used for BOTH the
  // pre-flight check and the write loop, so they can never disagree.
  const probeSlug = buildProbeSlugResolver(ALL_PROBES)

  const identityCheck = validateSeedIdentities([
    ...ALL_EXPLANATIONS.map((e) => ({
      canonicalSlug: seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand),
      family: 'EXPLANATION' as const,
      conceptId: e.conceptId,
      subjectSlug: e.subjectSlug,
      familyKind: e.familyKind,
      gradeBand: String(e.gradeBand),
      preview: previewOf(e.content),
      source: e.source,
    })),
    ...ALL_PROBES.map((p) => ({
      canonicalSlug: probeSlug(p),
      family: 'PROBE' as const,
      conceptId: p.conceptId,
      subjectSlug: p.subjectSlug,
      familyKind: p.probeKind,
      gradeBand: String(p.gradeBand),
      preview: previewOf(p.stem),
      source: p.source,
    })),
  ])
  if (!identityCheck.ok) {
    console.error(formatSeedIdentityReport(identityCheck, { writer: 'seed-physics-assets' }))
    process.exit(1)
  }
  console.log(
    `Identity check passed: ${identityCheck.totalItems} items, ${identityCheck.distinctIdentities} distinct identities, 0 duplicates`,
  )

  let created = 0
  let skipped = 0

  for (const e of ALL_EXPLANATIONS) {
    const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
    if (dryRun) { created++; console.log(`would create EXPLANATION: ${canonicalSlug}`); continue }
    const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
    if (existing) { skipped++; console.log(`skip (exists): ${canonicalSlug}`); continue }
    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.EXPLANATION,
        familyKind: e.familyKind,
        conceptId: e.conceptId,
        language: SEED_LANGUAGE,
        gradeBand: e.gradeBand,
        authorId: SEED_AUTHOR_ID,
        authorKind: AuthorKind.HUMAN_CURATOR,
        status,
        version: 1,
        canonicalSlug,
        contentHash: hashContent(e.content),
        tags: [e.subjectSlug, e.familyKind],
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        explanationAsset: {
          create: {
            content: e.content,
            style: ExplanationStyle.CONCRETE,
            readingLevel: 0,
            lengthChars: e.content.length,
            targetedMisconceptions: e.targetedMisconceptions,
          },
        },
      },
    })
    created++
    console.log(`created EXPLANATION (${status}): ${canonicalSlug}`)
  }

  for (const p of ALL_PROBES) {
    const canonicalSlug = probeSlug(p)
    if (dryRun) { created++; console.log(`would create PROBE: ${canonicalSlug}`); continue }
    const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
    if (existing) { skipped++; console.log(`skip (exists): ${canonicalSlug}`); continue }
    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.PROBE,
        familyKind: p.probeKind,
        conceptId: p.conceptId,
        language: SEED_LANGUAGE,
        gradeBand: p.gradeBand,
        authorId: SEED_AUTHOR_ID,
        authorKind: AuthorKind.HUMAN_CURATOR,
        status,
        version: 1,
        canonicalSlug,
        contentHash: hashContent(p.stem),
        tags: [p.subjectSlug, p.probeKind],
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        probeAsset: {
          create: {
            stem: p.stem,
            choices: p.choices ? (p.choices as unknown as object) : undefined,
            correctValue: p.correctValue,
            keywords: [],
            difficulty: p.difficulty,
            targetedMisconceptions: p.targetedMisconceptions,
            requiredVisuals: [],
          },
        },
      },
    })
    created++
    console.log(`created PROBE (${status}): ${canonicalSlug}`)
  }

  console.log(`\nDone. created=${created} skipped=${skipped} status=${dryRun ? 'DRY-RUN' : status}`)
}

main()
  .catch((err) => { console.error(err); process.exit(1) })
  .finally(() => prisma.$disconnect())
