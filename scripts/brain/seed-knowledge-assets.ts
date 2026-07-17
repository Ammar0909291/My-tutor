/**
 * Wave 0 Step 1 — Activate AssetIdentity (Migration Blueprint Phase 0).
 *
 * Seeds the human-authored Educational Brain concept-entry content
 * (src/lib/teaching/assets/brainSeedAssets.ts — every item cites its
 * educational-brain/ source section) into the AssetIdentity catalogue so
 * that assembleLesson() retrieves authored teaching content instead of
 * the LLM generating an equivalent.
 *
 * Status policy:
 *   default        → ACTIVE. ADR 14's DRAFT→review gate exists to keep
 *                    unreviewed AI_AUTHORED output from serving; these
 *                    assets are HUMAN_CURATOR transcriptions of the frozen,
 *                    audited Brain entries (Deliveries 5/14 + the final
 *                    architecture sign-off) — the review happened in the
 *                    Brain's own authoring/audit cycle. Wave 0 Step 1's
 *                    explicit instruction: "make the runtime retrieve them."
 *   --draft        → seed as DRAFT instead, for owners who prefer to run
 *                    the /api/admin/knowledge-assets approval flow anyway.
 *   --dry-run      → print what would be written; touch nothing.
 *
 * Idempotent: an existing row with the same canonicalSlug is never
 * duplicated or overwritten (seeds are versionless imports; post-seed
 * evolution belongs to the capture pipeline + admin review flow).
 *
 * Run: npx tsx scripts/brain/seed-knowledge-assets.ts [--draft] [--dry-run]
 */
import { PrismaClient, AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } from '@prisma/client'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
} from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'

// One seed pass covers both collections: the frozen-Brain transcriptions
// (brainSeedAssets) and the blueprint-grounded authored batch
// (authoredSeedAssets). Same idempotency, KG-validation, and status rules.
const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS]
const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES]
import { hashContent } from '../../src/lib/teaching/assets/similarity'

const prisma = new PrismaClient()

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const asDraft = process.argv.includes('--draft')
  const status = asDraft ? AssetStatus.DRAFT : AssetStatus.ACTIVE

  // Guard: every seeded conceptId must resolve against its live canonical KG
  // (concepts/README.md binding rule: no entry exists without a KG node).
  const { createSubjectAdapter } = await import('../../src/lib/curriculum/subjectKgAdapter')
  const allConceptIds = new Set([
    ...ALL_EXPLANATIONS.map((e) => `${e.subjectSlug}:${e.conceptId}`),
    ...ALL_PROBES.map((p) => `${p.subjectSlug}:${p.conceptId}`),
  ])
  for (const key of allConceptIds) {
    const [subjectSlug, conceptId] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)]
    const node = createSubjectAdapter(subjectSlug).getConceptNode(conceptId)
    if (!node) {
      console.error(`ABORT: seeded conceptId "${conceptId}" not found in the ${subjectSlug} canonical KG`)
      process.exit(1)
    }
  }
  console.log(`KG check passed: ${allConceptIds.size} concept ids resolved against live canonical KGs`)

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
    const canonicalSlug = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
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
