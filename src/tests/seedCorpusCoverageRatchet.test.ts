import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * SEED CORPUS COVERAGE RATCHET.
 *
 * `scripts/brain/seed-knowledge-assets.ts` (the manual seeder, needs a real
 * DATABASE_URL, seeds everything in one run) and `src/instrumentation.ts`
 * (the production cold-start bootstrap, runs automatically, seeds a bounded
 * slice per start) each maintain their OWN hand-written list of which asset
 * modules under src/lib/teaching/assets/ to import. Nothing ties the two
 * lists together, so they drift: a module added to one is easy to forget in
 * the other, and the content then sits in git — authored, tested,
 * KG-validated — while never reaching a learner, because the ONLY writer
 * that runs automatically in production never imports it.
 *
 * MEASURED 2026-09-14: the seeder's corpus has 63 content modules; the
 * bootstrap's has 30. 33 modules — all of mathematics's dedicated batch
 * files, plus biology and computer_science entirely — are in the seeder but
 * absent from the bootstrap. See CLAUDE.md's "Physics + Chemistry ceiling
 * broken" and "AssetIdentity Completion Program" entries for the identical
 * defect already fixed once for chemistry (2026-08-19) and physics
 * (2026-08-25/30) band-gap/depth probes — this is the same class of gap,
 * recurring because there was no mechanism to prevent it, only manual fixes
 * after each incident.
 *
 * A "content module" is defined by its EXPORTED TYPE, not by name or by
 * whichever writer already imports it: any file under assets/ that exports
 * `const X: SeedExplanation[]` or `const X: SeedProbe[]`. This is a
 * semantic definition (what IS authored content) rather than a naming
 * convention, because the 63 modules do not share one — e.g.
 * `ENGLISH_PROBE_BATCH_2` holds probes but its name doesn't contain
 * "PROBES", so a name-based scan silently misses it. Keying off the type
 * annotation is exactly the failure this test exists to prevent: a future
 * module that follows neither naming pattern still gets caught, because it
 * still has to be typed SeedExplanation[]/SeedProbe[] to be seeded at all.
 *
 * THIS IS A RATCHET, NOT A REQUIREMENT OF FULL COVERAGE TODAY (same pattern
 * as scripts/ci/tsc-ratchet.sh). The 33 known-missing modules are named
 * explicitly below so this test is GREEN against the current, already-known
 * debt — closing it is Curriculum Completion Program / content-authoring
 * work, not something this test should force. What it prevents is
 * REGRESSION: when subject #4/#5/#6 (or any new module in an already-served
 * subject) is added to one writer's corpus and not the other, this test
 * fails immediately, by name, in CI — instead of silently shipping
 * unreachable content the way these 33 did.
 *
 * TO CLOSE AN ENTRY (partially or fully): add the missing import(s) +
 * spread them into ALL_EXPLANATIONS/ALL_PROBES in the fixed file, then
 * remove that module's name from the matching list below. If you add a
 * module you did NOT intend to leave stranded and this test fails on it,
 * that is the test doing its job — wire it into both files instead of
 * widening the baseline.
 */

const ASSET_DIR = path.join(process.cwd(), 'src/lib/teaching/assets')
const SCRIPT_SRC = fs.readFileSync(
  path.join(process.cwd(), 'scripts/brain/seed-knowledge-assets.ts'), 'utf8',
)
const BOOTSTRAP_SRC = fs.readFileSync(
  path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8',
)

/** Source-text detection (not a runtime import) so this test needs neither a
 *  generated Prisma client nor a database — a content module here is one
 *  whose exported const is typed SeedExplanation[] or SeedProbe[]. */
function contentModules(): string[] {
  const files = fs.readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  return files
    .filter((f) => {
      const src = fs.readFileSync(path.join(ASSET_DIR, f), 'utf8')
      return /^export const \w+\s*:\s*(SeedExplanation|SeedProbe)\[\]/m.test(src)
    })
    .map((f) => f.replace(/\.ts$/, ''))
    .sort()
}

/** A module is "imported by" a writer if its filename appears as an import
 *  specifier segment — matches both `from '...assets/name'` and dynamic
 *  `import('./lib/teaching/assets/name')` styles used across the two files. */
function importedBy(source: string, moduleName: string): boolean {
  return new RegExp(`assets/${moduleName}'`).test(source)
}

// The exact 33 modules known-missing from the bootstrap as of 2026-09-14.
// Update this list (never widen it silently) as entries are closed.
const KNOWN_MISSING_FROM_BOOTSTRAP = [
  'biologySeedAssets',
  'csSeedAssets',
  'mathematicsAlgebraVocabAssets',
  'mathematicsAlgorithmsPrecisionAssets',
  'mathematicsAnalyticAlgebraicAssets',
  'mathematicsArithCloseAssets',
  'mathematicsArithmeticFoundations',
  'mathematicsBandGapAssets',
  'mathematicsBatch3Assets',
  'mathematicsCirclesTransformAssets',
  'mathematicsCoordinateAssets',
  'mathematicsCryptoNumberAssets',
  'mathematicsDiffGeomAssets',
  'mathematicsDivisibilityModularAssets',
  'mathematicsFoundationAssets',
  'mathematicsFoundationsCloseAssets',
  'mathematicsFractionDecimalAssets',
  'mathematicsGeometryFoundations',
  'mathematicsLanguageStrategyAssets',
  'mathematicsMeasurementAssets',
  'mathematicsNumberSystemsCloseAssets',
  'mathematicsNumberTheoryAssets',
  'mathematicsOrdersProofsAssets',
  'mathematicsPowersVariationAssets',
  'mathematicsProofMachineryAssets',
  'mathematicsProportionProofAssets',
  'mathematicsQuantifierCraftAssets',
  'mathematicsRelationsNumbersAssets',
  'mathematicsSeedAssets',
  'mathematicsSetOperationsAssets',
  'mathematicsSolidsPolygonsAssets',
  'mathematicsTriangleTransformAssets',
  'mathematicsVectorsConicsAssets',
].sort()

// Empty on purpose: as of 2026-09-14 the seed script imports everything the
// bootstrap does not, plus the 33 above. If this ever grows, that means a
// module was added to the bootstrap and forgotten in the standalone seeder —
// the same defect in the other direction.
const KNOWN_MISSING_FROM_SCRIPT: string[] = []

describe('seed corpus coverage ratchet — instrumentation.ts vs seed-knowledge-assets.ts', () => {
  const modules = contentModules()

  it('the corpus is non-trivial (sanity: this test can actually fail)', () => {
    expect(modules.length).toBeGreaterThan(40)
  })

  it('the bootstrap has no MORE gaps than the known, named baseline', () => {
    const missing = modules.filter((m) => !importedBy(BOOTSTRAP_SRC, m)).sort()
    expect(missing).toEqual(KNOWN_MISSING_FROM_BOOTSTRAP)
  })

  it('the seed script has no MORE gaps than the known, named baseline', () => {
    const missing = modules.filter((m) => !importedBy(SCRIPT_SRC, m)).sort()
    expect(missing).toEqual(KNOWN_MISSING_FROM_SCRIPT)
  })
})
