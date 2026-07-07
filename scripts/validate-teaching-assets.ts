/**
 * Teaching Assets Structural Validator
 *
 * Generic, subject-agnostic check for any subject's
 * docs/{subject}/teaching-assets/assets.json against its sibling
 * docs/{subject}/kg/graph.json. Mirrors validate-knowledge-graph.ts's
 * check style and exit-code convention exactly.
 *
 * Checks:
 *   1. Duplicate asset IDs
 *   2. Duplicate concept_id mapping (each concept has at most one asset)
 *   3. Orphan assets (concept_id not present in the subject's KG)
 *   4. Coverage (every KG concept has a corresponding asset)
 *   5. Schema validation (Zod — every required field, every nested blueprint)
 *   6. Prerequisite-review-trigger sanity (triggers must be real KG IDs)
 *
 * Usage:
 *   npx tsx scripts/validate-teaching-assets.ts <subject-docs-slug>
 *   e.g. npx tsx scripts/validate-teaching-assets.ts biology
 *
 * Exit codes: 0 = all checks pass, 1 = one or more checks failed
 */

import fs from 'fs'
import path from 'path'
import { TeachingAssetSchema } from '../src/lib/curriculum/teachingAssetSchema'

interface CheckResult {
  name: string
  status: 'PASS' | 'WARN' | 'FAIL'
  details: string[]
  count: number
}

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: npx tsx scripts/validate-teaching-assets.ts <subject-docs-slug>')
  process.exit(1)
}

const graphPath = path.join(process.cwd(), `docs/${slug}/kg/graph.json`)
const assetsPath = path.join(process.cwd(), `docs/${slug}/teaching-assets/assets.json`)

if (!fs.existsSync(graphPath)) {
  console.error(`No KG found at ${graphPath}`)
  process.exit(1)
}
if (!fs.existsSync(assetsPath)) {
  console.error(`No teaching assets found at ${assetsPath}`)
  process.exit(1)
}

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8')) as { concepts: { id: string }[] }
const assetFile = JSON.parse(fs.readFileSync(assetsPath, 'utf-8')) as { assets: unknown[] }

const conceptIds = new Set(graph.concepts.map(c => c.id))
const assets = assetFile.assets

const results: CheckResult[] = []

// 1. Duplicate asset IDs
{
  const ids = assets.map((a: any) => a.id)
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const id of ids) { if (seen.has(id)) dupes.add(id); seen.add(id) }
  results.push({
    name: 'Duplicate asset IDs',
    status: dupes.size ? 'FAIL' : 'PASS',
    details: dupes.size ? [`Duplicates: ${[...dupes].join(', ')}`] : [],
    count: dupes.size,
  })
}

// 2. Duplicate concept_id mapping
{
  const conceptRefs = assets.map((a: any) => a.concept_id)
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const id of conceptRefs) { if (seen.has(id)) dupes.add(id); seen.add(id) }
  results.push({
    name: 'Duplicate concept_id mapping (1 asset per concept)',
    status: dupes.size ? 'FAIL' : 'PASS',
    details: dupes.size ? [`Concepts with >1 asset: ${[...dupes].join(', ')}`] : [],
    count: dupes.size,
  })
}

// 3. Orphan assets
{
  const orphans = assets.filter((a: any) => !conceptIds.has(a.concept_id)).map((a: any) => a.id)
  results.push({
    name: 'Orphan assets (concept_id not in KG)',
    status: orphans.length ? 'FAIL' : 'PASS',
    details: orphans.length ? [`Orphans: ${orphans.slice(0, 10).join(', ')}${orphans.length > 10 ? '…' : ''}`] : [],
    count: orphans.length,
  })
}

// 4. Coverage
{
  const assetConceptIds = new Set(assets.map((a: any) => a.concept_id))
  const missing = [...conceptIds].filter(id => !assetConceptIds.has(id))
  results.push({
    name: 'Coverage (every KG concept has an asset)',
    status: missing.length ? 'FAIL' : 'PASS',
    details: missing.length
      ? [`Missing: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`]
      : [`Covered: ${assetConceptIds.size} / ${conceptIds.size}`],
    count: missing.length,
  })
}

// 5. Schema validation
{
  const failures: string[] = []
  for (const a of assets as any[]) {
    const r = TeachingAssetSchema.safeParse(a)
    if (!r.success) failures.push(`${a?.id ?? '<unknown>'}: ${JSON.stringify(r.error.flatten().fieldErrors)}`)
  }
  results.push({
    name: 'Schema validation (Zod)',
    status: failures.length ? 'FAIL' : 'PASS',
    details: failures.slice(0, 5),
    count: failures.length,
  })
}

// 6. Prerequisite-review-trigger sanity
{
  const bad: string[] = []
  for (const a of assets as any[]) {
    for (const trigger of a.prerequisite_review_triggers ?? []) {
      if (!conceptIds.has(trigger)) bad.push(`${a.id} → ${trigger}`)
    }
  }
  results.push({
    name: 'Prerequisite review triggers reference valid KG IDs',
    status: bad.length ? 'FAIL' : 'PASS',
    details: bad.slice(0, 10),
    count: bad.length,
  })
}

console.log('TEACHING ASSETS VALIDATOR')
console.log(`Subject: ${slug}`)
console.log(`File: ${assetsPath}`)
console.log('─'.repeat(60))
console.log(`KG concepts: ${conceptIds.size}  |  Teaching assets: ${assets.length}`)
console.log()

let anyFail = false
for (const r of results) {
  const icon = r.status === 'PASS' ? '✓' : r.status === 'WARN' ? '⚠' : '✗'
  console.log(`${icon} [${r.status}] ${r.name}`)
  for (const d of r.details) console.log(`       ${d}`)
  if (r.status === 'FAIL') anyFail = true
}

console.log()
console.log('─'.repeat(60))
console.log(`Overall: ${anyFail ? 'FAIL' : 'PASS'}`)
console.log('─'.repeat(60))

process.exit(anyFail ? 1 : 0)
