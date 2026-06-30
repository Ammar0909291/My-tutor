/**
 * Teaching Asset Batch Merger
 *
 * Merges authored content into a subject's docs/{subject}/teaching-assets/
 * assets.json, replacing matching placeholder entries by concept_id. Used by
 * the curriculum-content production workflow — each domain ("chapter") is
 * authored in chunks; this script performs the single read-modify-write pass
 * once per domain, after all chunks for that domain are ready, so no two
 * processes ever write the same assets.json concurrently.
 *
 * Input batch files: any number of *.json files in a directory, each holding
 * an array of { concept_id, asset: { ...9 authorable TeachingAsset fields... } }.
 * Every concept_id must already exist in the target assets.json (no new
 * entries are created — this only fills in existing placeholders).
 *
 * The full resulting file is validated against TeachingAssetFileSchema
 * (the real, existing Zod schema) before being written. On any validation
 * failure, nothing is written and the script exits 1.
 *
 * Usage:
 *   npx tsx scripts/merge-teaching-asset-batch.ts <assetsJsonPath> <chunksDir>
 */

import fs from 'fs'
import path from 'path'
import { TeachingAssetFileSchema } from '../src/lib/curriculum/teachingAssetSchema'

const AUTHORABLE_FIELDS = [
  'learning_objective',
  'concept_summary',
  'key_ideas',
  'common_misconceptions',
  'visual_teaching_suggestions',
  'worked_example_blueprint',
  'practice_blueprint',
  'assessment_blueprint',
  'real_world_applications',
  'prerequisite_review_triggers',
] as const

function main() {
  const [, , assetsPath, chunksDir] = process.argv
  if (!assetsPath || !chunksDir) {
    console.error('Usage: npx tsx scripts/merge-teaching-asset-batch.ts <assetsJsonPath> <chunksDir>')
    process.exit(1)
  }

  const assetsFile = JSON.parse(fs.readFileSync(assetsPath, 'utf8'))
  const byConceptId = new Map<string, number>()
  assetsFile.assets.forEach((a: { concept_id: string }, i: number) => byConceptId.set(a.concept_id, i))

  const chunkFiles = fs
    .readdirSync(chunksDir)
    .filter((f) => f.endsWith('.json'))
    .sort()

  if (chunkFiles.length === 0) {
    console.error(`No .json chunk files found in ${chunksDir}`)
    process.exit(1)
  }

  let merged = 0
  const errors: string[] = []

  for (const file of chunkFiles) {
    const fullPath = path.join(chunksDir, file)
    let entries: Array<{ concept_id: string; asset: Record<string, unknown> }>
    try {
      entries = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    } catch (e) {
      errors.push(`${file}: invalid JSON (${(e as Error).message})`)
      continue
    }
    if (!Array.isArray(entries)) {
      errors.push(`${file}: expected a top-level array`)
      continue
    }

    for (const entry of entries) {
      const idx = byConceptId.get(entry.concept_id)
      if (idx === undefined) {
        errors.push(`${file}: concept_id "${entry.concept_id}" not found in ${assetsPath}`)
        continue
      }
      const existing = assetsFile.assets[idx]
      const missing = AUTHORABLE_FIELDS.filter((f) => !(f in (entry.asset ?? {})))
      if (missing.length > 0) {
        errors.push(`${file}: concept_id "${entry.concept_id}" missing fields: ${missing.join(', ')}`)
        continue
      }
      for (const field of AUTHORABLE_FIELDS) {
        existing[field] = entry.asset[field]
      }
      existing.version = '1.1.0'
      existing.status = 'draft'
      merged++
    }
  }

  if (errors.length > 0) {
    console.error(`✗ ${errors.length} error(s) found — nothing written.`)
    for (const e of errors) console.error(`  · ${e}`)
    process.exit(1)
  }

  const validation = TeachingAssetFileSchema.safeParse(assetsFile)
  if (!validation.success) {
    console.error('✗ Resulting file fails TeachingAssetFileSchema — nothing written.')
    for (const issue of validation.error.issues.slice(0, 30)) {
      console.error(`  · ${issue.path.join('.')}: ${issue.message}`)
    }
    process.exit(1)
  }

  assetsFile.build_date = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(assetsPath, JSON.stringify(assetsFile, null, 2) + '\n', 'utf8')

  const remainingPlaceholders = assetsFile.assets.filter((a: { status: string }) => a.status === 'placeholder').length
  console.log(`✓ Merged ${merged} concept(s) from ${chunkFiles.length} chunk file(s) into ${assetsPath}`)
  console.log(`  status: draft   remaining placeholders in file: ${remainingPlaceholders}/${assetsFile.assets.length}`)
  process.exit(0)
}

main()
