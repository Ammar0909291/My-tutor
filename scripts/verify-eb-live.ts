/**
 * Live end-to-end verification for the Educational Brain Decision Pipeline.
 * Requires: DATABASE_URL set, prisma db push run, seed-eb-physics.mjs run.
 * Run with:  DATABASE_URL=... npx tsx scripts/verify-eb-live.ts
 *
 * Verifies:
 *   1. EbConcept rows exist (seed was run)
 *   2. Pipeline resolves a physics concept via retrievalStage (DB read)
 *   3. EbEvidenceEvent was written by persistStage (DB write)
 *   4. composedContextNote is populated (composition stage)
 *   5. Total wall-clock time < 600 ms (doc 03 §8 target)
 *   6. EbCurriculum + EbModule rows exist
 */
import { PrismaClient } from '@prisma/client'
import { runEducationalBrainPipeline } from '../src/lib/educationalBrain/pipeline'

const prisma = new PrismaClient()

let passed = 0
let failed = 0
function check(name: string, cond: boolean, detail = '') {
  if (cond) { passed++; console.log(`[✓ pass] ${name}${detail ? '  (' + detail + ')' : ''}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}${detail ? '  (' + detail + ')' : ''}`) }
}

async function main() {
  console.log('\n=== Educational Brain — Live Verification ===\n')

  // ── 1. Seed check ──────────────────────────────────────────────────────────
  console.log('─── Seed data ───')
  const conceptCount = await prisma.ebConcept.count()
  check('EbConcept rows seeded', conceptCount >= 29, `found ${conceptCount}`)

  const edgeCount = await prisma.ebConceptEdge.count()
  check('EbConceptEdge rows seeded', edgeCount >= 20, `found ${edgeCount}`)

  const curriculumCount = await prisma.ebCurriculum.count()
  check('EbCurriculum row exists', curriculumCount >= 1, `found ${curriculumCount}`)

  const moduleCount = await prisma.ebModule.count()
  check('EbModule rows seeded', moduleCount >= 9, `found ${moduleCount}`)

  const misconceptionCount = await prisma.ebMisconception.count()
  check('EbMisconception rows seeded', misconceptionCount >= 3, `found ${misconceptionCount}`)

  // ── 2. Pipeline end-to-end ─────────────────────────────────────────────────
  console.log('\n─── Pipeline execution ───')
  process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE = 'true'

  const userId = 'verify-eb-live-test-user'
  const sessionId = 'verify-eb-live-session'

  const evidenceBefore = await prisma.ebEvidenceEvent.count({ where: { userId } })

  const wallStart = Date.now()
  const ctx = await runEducationalBrainPipeline({
    userId,
    sessionId,
    subjectSlug: 'physics',
    userMessage: 'What is velocity?',
  })
  const wallMs = Date.now() - wallStart

  check('pipeline returned a TurnContext (not null)', ctx !== null)
  if (!ctx) { console.log('\n[ABORT] pipeline returned null — check ENABLE_EDUCATIONAL_BRAIN_PIPELINE\n'); return }

  check('intent was classified', ctx.intent !== null)
  check('questionShape is definitional', ctx.intent?.questionShape === 'definitional')
  check('topicSurfaces non-empty', (ctx.intent?.topicSurfaces.length ?? 0) > 0)
  check('candidateConcept set', ctx.candidateConcept !== null, ctx.candidateConcept ?? 'null')
  check('conceptContext loaded from DB', ctx.conceptContext !== null)
  check('conceptContext.title non-empty', (ctx.conceptContext?.title.length ?? 0) > 0)
  check('composedContextNote generated', typeof ctx.composedContextNote === 'string' && (ctx.composedContextNote?.length ?? 0) > 0)
  check('composedContextNote has CONCEPT CONTEXT header', ctx.composedContextNote?.includes('CONCEPT CONTEXT') ?? false)
  check('all 5 spans present', ctx.spans.length === 5, `got ${ctx.spans.length}`)
  check('no shortCircuit', ctx.shortCircuit === null, ctx.shortCircuit ?? 'none')

  // ── 3. EbEvidenceEvent written ─────────────────────────────────────────────
  console.log('\n─── Persist stage ───')
  const evidenceAfter = await prisma.ebEvidenceEvent.count({ where: { userId } })
  check('EbEvidenceEvent written by persistStage', evidenceAfter > evidenceBefore, `before=${evidenceBefore} after=${evidenceAfter}`)

  const latestEvt = await prisma.ebEvidenceEvent.findFirst({
    where: { userId, turnId: ctx.turnId },
    select: { conceptId: true, category: true, outcome: true, strength: true },
  })
  check('EbEvidenceEvent.conceptId matches', latestEvt?.conceptId === ctx.candidateConcept)
  check('EbEvidenceEvent.category=ASSET_SHOWN', latestEvt?.category === 'ASSET_SHOWN')
  check('EbEvidenceEvent.outcome=CONCEPT_SURFACE', latestEvt?.outcome === 'CONCEPT_SURFACE')
  check('EbEvidenceEvent.strength=0.5', latestEvt?.strength === 0.5)

  // ── 4. Latency ─────────────────────────────────────────────────────────────
  console.log('\n─── Latency ───')
  check(`wall-clock < 600 ms (doc 03 §8)`, wallMs < 600, `actual=${wallMs}ms`)
  console.log(`  Total wall-clock: ${wallMs} ms`)

  // ── 5. Cleanup ─────────────────────────────────────────────────────────────
  await prisma.ebEvidenceEvent.deleteMany({ where: { userId } })

  console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
  process.exit(failed ? 1 : 0)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
