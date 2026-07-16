/**
 * Compile ONE Teaching Blueprint into a DRAFT Educational Package artifact.
 *
 *   npm run compile:package -- <conceptId> [--check]
 *
 * Writes brain/packages/<conceptId>.package.json — the ONLY form the Package
 * Runtime reads. This is the authoring/runtime boundary: blueprint markdown
 * is parsed HERE, at build time, never during lesson serving.
 *
 * --check: compile and compare against the existing artifact (byte-for-byte
 * determinism / drift gate); exits non-zero on mismatch, writes nothing.
 *
 * Reuses the Phase 1/1.5 front-end verbatim (no compiler logic here) and
 * validates prerequisites against the subject KG when one exists.
 */
import fs from 'fs'
import path from 'path'
import { compileBlueprintToPackage } from '../../src/lib/curriculum/blueprintFrontend'

const KG_PATH_BY_PREFIX: Record<string, string> = {
  phys: 'docs/physics/kg/graph.json',
  math: 'docs/mathematics/kg/graph.json',
  chem: 'docs/chemistry/kg/graph.json',
  bio: 'docs/biology/kg/graph.json',
  cs: 'docs/computer-science/kg/graph.json',
  eng: 'docs/english/kg/graph.json',
}

function knownConceptIds(conceptId: string): Set<string> | undefined {
  const prefix = conceptId.split('.')[0]
  const kgPath = KG_PATH_BY_PREFIX[prefix]
  if (!kgPath) return undefined
  const abs = path.join(process.cwd(), kgPath)
  if (!fs.existsSync(abs)) return undefined
  const kg = JSON.parse(fs.readFileSync(abs, 'utf-8')) as { concepts: Array<{ id: string }> }
  return new Set(kg.concepts.map((c) => c.id))
}

function main(): void {
  const args = process.argv.slice(2).filter((a) => a !== '--')
  const check = args.includes('--check')
  const conceptId = args.find((a) => !a.startsWith('--'))
  if (!conceptId) {
    console.error('usage: npm run compile:package -- <conceptId> [--check]')
    process.exit(2)
  }

  const blueprintFile = `docs/curriculum/blueprints/${conceptId}.md`
  const absBlueprint = path.join(process.cwd(), blueprintFile)
  if (!fs.existsSync(absBlueprint)) {
    console.error(`no blueprint at ${blueprintFile}`)
    process.exit(2)
  }

  const source = fs.readFileSync(absBlueprint, 'utf-8')
  const result = compileBlueprintToPackage(blueprintFile, source, conceptId, {
    knownConceptIds: knownConceptIds(conceptId),
  })

  for (const d of result.diagnostics) {
    console.log(`  [${d.severity}] ${d.code}: ${d.message}`)
  }
  if (!result.ok || !result.educationalPackage) {
    console.error(`compile FAILED for ${conceptId}`)
    process.exit(1)
  }

  const pkg = result.educationalPackage
  const artifact = JSON.stringify(pkg, null, 2) + '\n'
  const outDir = path.join(process.cwd(), 'brain', 'packages')
  const outPath = path.join(outDir, `${conceptId}.package.json`)

  if (check) {
    if (!fs.existsSync(outPath)) {
      console.error(`--check: no existing artifact at ${outPath}`)
      process.exit(1)
    }
    const existing = fs.readFileSync(outPath, 'utf-8')
    if (existing !== artifact) {
      console.error(`--check: DRIFT — recompiled artifact differs from ${outPath}`)
      process.exit(1)
    }
    console.log(`--check OK: ${outPath} is byte-identical to a fresh compile (${pkg.manifest.contentHash})`)
    return
  }

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outPath, artifact)
  console.log(`wrote ${outPath}`)
  console.log(`  status:  ${pkg.status}`)
  console.log(`  rules:   ${pkg.manifest.ruleCount}`)
  console.log(`  assets:  ${pkg.manifest.assetCount} ${JSON.stringify(pkg.manifest.assetCounts)}`)
  console.log(`  hash:    ${pkg.manifest.contentHash}`)
}

main()
