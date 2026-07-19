/**
 * Next.js instrumentation hook — runs once per server process start.
 *
 * Responsible for: automatic Knowledge Asset bootstrap.
 *
 * On every cold start (local dev and Vercel), if the AssetIdentity table
 * has fewer rows than the expected seed total, the authored seed assets
 * (brainSeedAssets + authoredSeedAssets) are inserted as ACTIVE rows so
 * assembleLesson() starts serving authored content immediately — without
 * requiring manual `npm run seed:brain-assets`.
 *
 * Design:
 *  - Fast path: a single COUNT query checked against the expected total.
 *    If rows ≥ expected, exits in < 5 ms.
 *  - Partial-seed safe: COUNT < expected triggers a resume run; per-slug
 *    dedup skips already-inserted rows and inserts the missing ones.
 *  - Concurrency safe: P2002 (unique constraint on canonicalSlug) is caught
 *    per-asset and treated as skip, so two simultaneous cold starts both
 *    converge on a complete catalogue without aborting each other.
 *  - Never blocks request handling — runs in the background after the
 *    server is ready (Next.js calls register() before the first request).
 *  - Opt-out: set DISABLE_ASSET_BOOTSTRAP=true to skip entirely.
 */
export async function register() {
  // Only run in the Node.js runtime, not in Edge functions.
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.DISABLE_ASSET_BOOTSTRAP === 'true') return

  // Kick off in the background — don't await so cold-start latency is
  // unaffected even if the DB is momentarily slow.
  bootstrapAssets().catch((err) =>
    console.error('[instrumentation] asset bootstrap failed (non-fatal):', err?.message ?? err)
  )
}

async function bootstrapAssets() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
      // Load seed arrays first so we know the expected total before querying.
      const { SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug } =
        await import('./lib/teaching/assets/brainSeedAssets')
      const { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } =
        await import('./lib/teaching/assets/authoredSeedAssets')
      const { hashContent } = await import('./lib/teaching/assets/similarity')
      const { AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } = await import('@prisma/client')

      const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS]
      const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES]
      const EXPECTED_TOTAL = ALL_EXPLANATIONS.length + ALL_PROBES.length

      const existing = await prisma.assetIdentity.count()
      if (existing >= EXPECTED_TOTAL) {
        console.log(`[instrumentation] asset bootstrap: ${existing}/${EXPECTED_TOTAL} rows present — skipping`)
        return
      }

      console.log(
        `[instrumentation] asset bootstrap: ${existing}/${EXPECTED_TOTAL} rows present — seeding missing assets...`
      )

      let created = 0
      let skipped = 0

      for (const e of ALL_EXPLANATIONS) {
        const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
        const dup = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
        if (dup) { skipped++; continue }
        try {
          await prisma.assetIdentity.create({
            data: {
              family: AssetFamily.EXPLANATION,
              familyKind: e.familyKind,
              conceptId: e.conceptId,
              language: SEED_LANGUAGE,
              gradeBand: e.gradeBand,
              authorId: SEED_AUTHOR_ID,
              authorKind: AuthorKind.HUMAN_CURATOR,
              status: AssetStatus.ACTIVE,
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
        } catch (createErr: any) {
          // P2002 = concurrent cold start already inserted this slug — safe to skip.
          if (createErr?.code === 'P2002') { skipped++; continue }
          throw createErr
        }
      }

      for (const p of ALL_PROBES) {
        const canonicalSlug = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
        const dup = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
        if (dup) { skipped++; continue }
        try {
          await prisma.assetIdentity.create({
            data: {
              family: AssetFamily.PROBE,
              familyKind: p.probeKind,
              conceptId: p.conceptId,
              language: SEED_LANGUAGE,
              gradeBand: p.gradeBand,
              authorId: SEED_AUTHOR_ID,
              authorKind: AuthorKind.HUMAN_CURATOR,
              status: AssetStatus.ACTIVE,
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
        } catch (createErr: any) {
          if (createErr?.code === 'P2002') { skipped++; continue }
          throw createErr
        }
      }

      console.log(
        `[instrumentation] asset bootstrap complete: created=${created} skipped=${skipped} total=${EXPECTED_TOTAL}`
      )
    } finally {
      await prisma.$disconnect()
    }
  } catch (err: any) {
    // DB not reachable yet (e.g., slow cold start) — non-fatal; the next cold
    // start will retry. assembleLesson() degrades to Groq in the interim.
    console.warn('[instrumentation] asset bootstrap DB error (will retry on next start):', err?.message)
  }
}
