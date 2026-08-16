/**
 * PRODUCTION SEEDING AUDIT — read-only.
 *
 * ── THE DEFECT CLASS THIS EXISTS FOR ────────────────────────────────────────
 * On 2026-08-16 a sweep found 42 of 238 physics concepts (17.6%) with NO ACTIVE
 * gradeable probe in production, while the repo's own invariant
 * (gateAssessmentIsServerOwned.test.ts) correctly reported 238/238 authored.
 * Both statements were true at once, and that is the whole problem: the
 * offline suite proves what is AUTHORED, and the runtime serves what is
 * SEEDED AND ACTIVE. Nothing compared the two.
 *
 * Cause was a bulk deprecation (2026-08-12 21:59:37) that retired 734
 * legacy-slug rows across all 238 concepts during the migration to the
 * difficulty-bearing identity; the re-seed under the new identity covered only
 * 196. The 42 left behind were invisible to every test in the repo, because no
 * test can see the database.
 *
 * Learner impact is not cosmetic. `findBestProbe`
 * (assets/teachingActionRepository.ts) queries `status: ACTIVE`. With no ACTIVE
 * probe it returns null, `probeToMcq` never runs, the server-owned gate
 * assessment never fires, and the mastery-gate question falls back to the model
 * writing one in prose. That is the ungradeable shape `gateAssessment.ts` was
 * built to remove — and with the prose-MCQ guard now suppressing LLM-claimed
 * correctness on it, a learner can answer correctly at a gate and have nothing
 * recorded at all.
 *
 * ── WHAT THIS SCRIPT DOES ───────────────────────────────────────────────────
 * Compares, per subject: concepts with an authored gradeable probe in the repo
 * corpus, against concepts with an ACTIVE probe in production that actually
 * CONVERTS through the real runtime predicate. It does not re-implement
 * "gradeable" — it imports `probeToMcq`, the same function the turn uses, so a
 * row that this script counts is a row the tutor could really serve.
 *
 * ── READ-ONLY BY CONSTRUCTION ───────────────────────────────────────────────
 * Only `findMany` is called. There is no create/update/delete/upsert anywhere in
 * this file, and it must stay that way: repairing a gap is a separate,
 * explicitly authorized action (`scripts/brain/seed-knowledge-assets.ts`, which
 * is idempotent and skips slugs that already exist).
 *
 * Usage:  DATABASE_URL=... npx tsx scripts/moat/audit-production-seeding.ts
 *         (optionally: ... --subject physics)
 * Exit code is 1 when any gap is found, so this can gate a post-deploy check.
 */
import { PrismaClient, AssetFamily, AssetStatus } from '@prisma/client'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_PROBES } from '../../src/lib/teaching/assets/biologySeedAssets'
import { CS_PROBES } from '../../src/lib/teaching/assets/csSeedAssets'

const prisma = new PrismaClient()

/**
 * Every probe the repo ships — composed EXACTLY as `ALL_PROBES` in
 * scripts/brain/seed-knowledge-assets.ts:43. Composing it differently is not a
 * cosmetic difference: an earlier draft of this file omitted the chemistry,
 * biology and CS arrays and therefore reported chemistry as "0 authored,
 * 0 missing" — a clean pass produced by looking at nothing. An audit that can
 * report OK because it failed to load the corpus is worse than no audit.
 */
const ALL_AUTHORED = [
  ...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...BIOLOGY_PROBES, ...CS_PROBES,
]

/** A probe counts only if the REAL runtime converter accepts it. */
const converts = (stem: string, choices: unknown): boolean => {
  const c = Array.isArray(choices)
    ? (choices as Array<{ text: string; isCorrect: boolean }>)
    : null
  return probeToMcq({ stem, choices: c }) !== null
}

async function auditSubject(subjectSlug: string, idPrefix: string) {
  // ── repo side: which concepts HAVE a gradeable probe authored ────────────
  const authored = new Set(
    ALL_AUTHORED
      .filter((p) => p.conceptId.startsWith(idPrefix))
      .filter((p) => converts(p.stem, p.choices ?? null))
      .map((p) => p.conceptId),
  )

  // ── production side: which concepts SERVE one ─────────────────────────────
  // No cast: the relation name and field types are checked by tsc, so a schema
  // rename breaks the build instead of silently auditing nothing.
  const rows = await prisma.assetIdentity.findMany({
    where: {
      family: AssetFamily.PROBE,
      status: AssetStatus.ACTIVE,
      conceptId: { startsWith: idPrefix },
    },
    select: { conceptId: true, probeAsset: { select: { stem: true, choices: true } } },
  })

  const served = new Set(
    rows
      .filter((r) => r.probeAsset !== null && converts(r.probeAsset.stem, r.probeAsset.choices))
      .map((r) => r.conceptId),
  )

  const missing = [...authored].filter((c) => !served.has(c)).sort()

  console.log(`\n${subjectSlug}`)
  console.log(`  authored gradeable concepts : ${authored.size}`)
  console.log(`  ACTIVE + convertible in prod: ${served.size}`)
  console.log(`  MISSING IN PRODUCTION       : ${missing.length}`)
  if (missing.length > 0) {
    // Grouped by domain — a gap is almost always a whole domain that a re-seed
    // skipped, and that shape is the fastest thing for a human to recognise.
    const byDomain = new Map<string, string[]>()
    for (const id of missing) {
      const domain = id.split('.').slice(0, 2).join('.')
      byDomain.set(domain, [...(byDomain.get(domain) ?? []), id])
    }
    for (const [domain, ids] of [...byDomain].sort()) {
      console.log(`    ${domain} (${ids.length})`)
      for (const id of ids) console.log(`      - ${id}`)
    }
  }
  return missing.length
}

async function main() {
  const flagIdx = process.argv.indexOf('--subject')
  const only = flagIdx >= 0 ? process.argv[flagIdx + 1] : null

  // Moat scope is physics and chemistry. Others are listed so the same command
  // reports honestly rather than implying they were checked and passed.
  const subjects: Array<[string, string]> = [
    ['physics', 'phys.'],
    ['chemistry', 'chem.'],
  ]

  let gaps = 0
  for (const [slug, prefix] of subjects) {
    if (only && only !== slug) continue
    gaps += await auditSubject(slug, prefix)
  }

  console.log(
    gaps === 0
      ? '\nOK — every authored gradeable concept is served in production.'
      : `\nGAP — ${gaps} concept(s) authored but not served. Repair is a ` +
        'production write and needs explicit authorization: ' +
        'npx tsx scripts/brain/seed-knowledge-assets.ts',
  )
  await prisma.$disconnect()
  process.exit(gaps === 0 ? 0 : 1)
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(2)
})
