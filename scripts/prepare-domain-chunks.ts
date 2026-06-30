/**
 * Domain Chunk Preparer
 *
 * Deterministic, zero-LLM-cost preprocessing step for the curriculum
 * production pipeline. Replaces the prior pattern where each per-chunk
 * author agent used its own Read tool to load the FULL domain concepts
 * file (all N concepts) and then self-sliced its assigned range — which
 * meant the same full file was read once per chunk (e.g. 9x for an
 * 82-concept domain split into chunks of 10).
 *
 * This script does the lookup + slicing once, here, outside any agent
 * context, and writes one small file per chunk containing ONLY that
 * chunk's concept objects. Author agents then read just their own slice.
 *
 * Looks up the domain by domain_id in graph.json's `domains[]` array,
 * filters `concepts[]` by id_prefix, validates the count matches the
 * declared concept_count, and writes:
 *   <outDir>/chunk-input-00.json, chunk-input-01.json, ...
 *   <outDir>/manifest.json  { domainId, domainName, idPrefix, levelRange,
 *                             totalConcepts, chunkSize, chunkCount }
 *
 * Usage:
 *   npx tsx scripts/prepare-domain-chunks.ts <graphJsonPath> <domainId> <chunkSize> <outDir>
 */

import fs from 'fs'
import path from 'path'

const [, , graphPath, domainId, chunkSizeArg, outDir] = process.argv

if (!graphPath || !domainId || !chunkSizeArg || !outDir) {
  console.error('Usage: npx tsx scripts/prepare-domain-chunks.ts <graphJsonPath> <domainId> <chunkSize> <outDir>')
  process.exit(1)
}

const chunkSize = parseInt(chunkSizeArg, 10)
if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
  console.error(`Invalid chunkSize: ${chunkSizeArg}`)
  process.exit(1)
}

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'))
const domainMeta = (graph.domains || []).find((d: any) => d.domain_id === domainId)
if (!domainMeta) {
  console.error(`Domain "${domainId}" not found in ${graphPath}. Known domains: ${(graph.domains || []).map((d: any) => d.domain_id).join(', ')}`)
  process.exit(1)
}

const idPrefix: string = domainMeta.id_prefix
const concepts = (graph.concepts || []).filter((c: any) => c.id === idPrefix || c.id.startsWith(`${idPrefix}.`))

if (concepts.length !== domainMeta.concept_count) {
  console.error(`Concept count mismatch for domain "${domainId}": graph.domains declares ${domainMeta.concept_count}, but found ${concepts.length} concepts with prefix "${idPrefix}". Refusing to proceed (KG may have changed).`)
  process.exit(1)
}

fs.mkdirSync(outDir, { recursive: true })

const chunkCount = Math.ceil(concepts.length / chunkSize)
for (let i = 0; i < chunkCount; i++) {
  const slice = concepts.slice(i * chunkSize, Math.min((i + 1) * chunkSize, concepts.length))
  const chunkPath = path.join(outDir, `chunk-input-${String(i).padStart(2, '0')}.json`)
  fs.writeFileSync(chunkPath, JSON.stringify(slice, null, 2))
}

const manifest = {
  domainId,
  domainName: domainMeta.domain_name,
  idPrefix,
  levelRange: domainMeta.level_range,
  totalConcepts: concepts.length,
  chunkSize,
  chunkCount,
}
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))

console.log(`Prepared ${chunkCount} chunk-input files for domain "${domainId}" (${domainMeta.domain_name}, prefix "${idPrefix}", ${concepts.length} concepts) in ${outDir}`)
console.log(JSON.stringify(manifest, null, 2))
