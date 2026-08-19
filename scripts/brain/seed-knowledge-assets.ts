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
 * duplicated. ACTIVE/DRAFT/REVIEW rows are skipped (post-seed evolution
 * belongs to the capture pipeline + admin review flow). DEPRECATED or
 * RETIRED rows are revived: status restored to the target, version
 * bumped, content refreshed from the authored source.
 *
 * Run: npx tsx scripts/brain/seed-knowledge-assets.ts [--draft] [--dry-run]
 */
import { PrismaClient, AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } from '@prisma/client'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
  buildProbeSlugResolver,
} from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_EXPLANATIONS, BIOLOGY_PROBES } from '../../src/lib/teaching/assets/biologySeedAssets'
import { CS_EXPLANATIONS, CS_PROBES } from '../../src/lib/teaching/assets/csSeedAssets'
import { MATHEMATICS_EXPLANATIONS, MATHEMATICS_PROBES } from '../../src/lib/teaching/assets/mathematicsSeedAssets'
import { MATHEMATICS_FOUNDATION_EXPLANATIONS, MATHEMATICS_FOUNDATION_PROBES } from '../../src/lib/teaching/assets/mathematicsFoundationAssets'
import { MATHEMATICS_ARITHMETIC_EXPLANATIONS, MATHEMATICS_ARITHMETIC_PROBES } from '../../src/lib/teaching/assets/mathematicsArithmeticFoundations'
import { MATHEMATICS_BATCH3_EXPLANATIONS, MATHEMATICS_BATCH3_PROBES } from '../../src/lib/teaching/assets/mathematicsBatch3Assets'
import { MATHEMATICS_GEOMETRY_EXPLANATIONS, MATHEMATICS_GEOMETRY_PROBES } from '../../src/lib/teaching/assets/mathematicsGeometryFoundations'
import { MATHEMATICS_FRACTION_EXPLANATIONS, MATHEMATICS_FRACTION_PROBES } from '../../src/lib/teaching/assets/mathematicsFractionDecimalAssets'
import { MATHEMATICS_PROPORTION_EXPLANATIONS, MATHEMATICS_PROPORTION_PROBES } from '../../src/lib/teaching/assets/mathematicsProportionProofAssets'
import { MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS, MATHEMATICS_ALGEBRA_VOCAB_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraVocabAssets'
import { MATHEMATICS_POWERS_VARIATION_EXPLANATIONS, MATHEMATICS_POWERS_VARIATION_PROBES } from '../../src/lib/teaching/assets/mathematicsPowersVariationAssets'
import { MATHEMATICS_SET_OPERATIONS_EXPLANATIONS, MATHEMATICS_SET_OPERATIONS_PROBES } from '../../src/lib/teaching/assets/mathematicsSetOperationsAssets'
import { MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS, MATHEMATICS_RELATIONS_NUMBERS_PROBES } from '../../src/lib/teaching/assets/mathematicsRelationsNumbersAssets'
import { MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS, MATHEMATICS_ORDERS_PROOFS_PROBES } from '../../src/lib/teaching/assets/mathematicsOrdersProofsAssets'
import { MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS, MATHEMATICS_LANGUAGE_STRATEGY_PROBES } from '../../src/lib/teaching/assets/mathematicsLanguageStrategyAssets'
import { MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS, MATHEMATICS_PROOF_MACHINERY_PROBES } from '../../src/lib/teaching/assets/mathematicsProofMachineryAssets'
import { MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS, MATHEMATICS_QUANTIFIER_CRAFT_PROBES } from '../../src/lib/teaching/assets/mathematicsQuantifierCraftAssets'
import { MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS, MATHEMATICS_FOUNDATIONS_CLOSE_PROBES } from '../../src/lib/teaching/assets/mathematicsFoundationsCloseAssets'
import { MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS, MATHEMATICS_NUMBER_SYSTEMS_PROBES } from '../../src/lib/teaching/assets/mathematicsNumberSystemsCloseAssets'
import { MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS, MATHEMATICS_ALGORITHMS_PRECISION_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgorithmsPrecisionAssets'

// One seed pass covers all collections: the frozen-Brain transcriptions
// (brainSeedAssets), the blueprint-grounded authored batch
// (authoredSeedAssets), and per-subject authored assets (chemistry, biology).
// Same idempotency, KG-validation, and status rules.
const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS, ...CHEMISTRY_EXPLANATIONS, ...BIOLOGY_EXPLANATIONS, ...CS_EXPLANATIONS, ...MATHEMATICS_EXPLANATIONS, ...MATHEMATICS_FOUNDATION_EXPLANATIONS, ...MATHEMATICS_ARITHMETIC_EXPLANATIONS, ...MATHEMATICS_BATCH3_EXPLANATIONS, ...MATHEMATICS_GEOMETRY_EXPLANATIONS, ...MATHEMATICS_FRACTION_EXPLANATIONS, ...MATHEMATICS_PROPORTION_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS, ...MATHEMATICS_POWERS_VARIATION_EXPLANATIONS, ...MATHEMATICS_SET_OPERATIONS_EXPLANATIONS, ...MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS, ...MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS, ...MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS, ...MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS, ...MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS, ...MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS, ...MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS, ...MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS]
const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...BIOLOGY_PROBES, ...CS_PROBES, ...MATHEMATICS_PROBES, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES]
import { hashContent } from '../../src/lib/teaching/assets/similarity'
import {
  validateSeedIdentities, formatSeedIdentityReport, previewOf,
} from '../../src/lib/teaching/assets/seedIdentityValidation'

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
    const adapterSlug = subjectSlug === 'computer_science' ? 'computer-science' : subjectSlug
    const node = createSubjectAdapter(adapterSlug).getConceptNode(conceptId)
    if (!node) {
      console.error(`ABORT: seeded conceptId "${conceptId}" not found in the ${subjectSlug} canonical KG`)
      process.exit(1)
    }
  }
  console.log(`KG check passed: ${allConceptIds.size} concept ids resolved against live canonical KGs`)

  // Guard 2 (Remediation Item 3): refuse a dataset in which two authored
  // assets claim one canonical identity. The per-item dedup below keys on
  // canonicalSlug alone and `continue`s on a hit, so such a dataset would seed
  // the first item and silently drop the rest. Built in the SAME order the
  // loops below run (explanations, then probes) so the report's "KEPT" row is
  // the item that would actually have won. Runs before the first write —
  // including in --dry-run, where it is the cheapest way to get the full
  // duplicate report without touching the database.
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
    console.error(formatSeedIdentityReport(identityCheck, { writer: 'seed-knowledge-assets' }))
    process.exit(1)
  }
  console.log(
    `Identity check passed: ${identityCheck.totalItems} items, ${identityCheck.distinctIdentities} distinct identities, 0 duplicates`,
  )

  let created = 0
  let skipped = 0
  let revived = 0
  const REVIVABLE: Set<string> = new Set([AssetStatus.DEPRECATED, AssetStatus.RETIRED])

  for (const e of ALL_EXPLANATIONS) {
    const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
    if (dryRun) { created++; console.log(`would create EXPLANATION: ${canonicalSlug}`); continue }
    const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
    if (existing) {
      if (REVIVABLE.has(existing.status)) {
        await prisma.assetIdentity.update({
          where: { id: existing.id },
          data: {
            status,
            version: existing.version + 1,
            contentHash: hashContent(e.content),
            tags: [e.subjectSlug, e.familyKind],
            explanationAsset: {
              upsert: {
                create: {
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
                update: {
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
              },
            },
          },
        })
        revived++
        console.log(`revived EXPLANATION ${existing.status}→${status} (v${existing.version + 1}): ${canonicalSlug}`)
        continue
      }
      skipped++; console.log(`skip (${existing.status}): ${canonicalSlug}`); continue
    }
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
    if (existing) {
      if (REVIVABLE.has(existing.status)) {
        await prisma.assetIdentity.update({
          where: { id: existing.id },
          data: {
            status,
            version: existing.version + 1,
            contentHash: hashContent(p.stem),
            tags: [p.subjectSlug, p.probeKind],
            probeAsset: {
              upsert: {
                create: {
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  keywords: [],
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                  requiredVisuals: [],
                },
                update: {
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                },
              },
            },
          },
        })
        revived++
        console.log(`revived PROBE ${existing.status}→${status} (v${existing.version + 1}): ${canonicalSlug}`)
        continue
      }
      skipped++; console.log(`skip (${existing.status}): ${canonicalSlug}`); continue
    }
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

  console.log(`\nDone. created=${created} revived=${revived} skipped=${skipped} status=${dryRun ? 'DRY-RUN' : status}`)
}

main()
  .catch((err) => { console.error(err); process.exit(1) })
  .finally(() => prisma.$disconnect())
