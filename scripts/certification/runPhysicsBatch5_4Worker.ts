/**
 * TIER A — PHYSICS BATCH 5, 4-WORKER (25 concepts) — THE PRE-REGISTERED
 * UNMEASURED RE-TEST COHORT.
 *
 * Unlike batches 1-4 this does NOT take a manifest slice. It re-runs 25 of the
 * 63 concepts that ALREADY returned UNMEASURED, to test the R1/R2 fixes against
 * the pre-registered prediction:
 *
 *   only R1/R2 shipped, R3 deliberately unchanged =>
 *     UNMEASURED stays at or near 100% of this cohort
 *     FAILED_INSTRUMENT / P2024 goes to ZERO
 *   a DROP in UNMEASURED falsifies the R3 analysis and must be investigated.
 *
 * COHORT SELECTION (deterministic, recorded before the run): the 63 UNMEASURED
 * concept ids read from the five committed artifacts, de-duplicated, sorted by
 * manifest lessonOrder, then every SECOND one taken (indices 0,2,...,48). A
 * systematic sample rather than the first 25, so the cohort spans the whole
 * lessonOrder range instead of clustering in the early domains.
 *
 * Imports runTierA.ts's already-exported runWithRetry UNCHANGED. No
 * modification to any existing file, no change to the protocol, the retry
 * policy, the verdict definitions, or the answer source.
 *
 *   npx tsx scripts/certification/runPhysicsBatch5_4Worker.ts
 */

import { createHash } from 'crypto'
import { execSync } from 'child_process'
import { appendFileSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { runWithRetry, type ConceptOutcome } from './runTierA'
import type { ManifestRow } from './buildManifest'
import { HARNESS_VERSION, PROTOCOL_VERSION, resolveWorkers } from './measurementIdentity'

const BASE_URL = process.env.CERT_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
const ARTIFACT_DIR = join(__dirname, 'artifacts')
const MANIFEST_PATH = join(__dirname, 'tierA-manifest.json')
const COHORT_PATH = process.env.CERT_COHORT_PATH ?? '/var/tmp/batch5-cohort.json'

function repoSha(): string {
  try {
    return execSync('git rev-parse HEAD', { cwd: join(__dirname, '..', '..') }).toString().trim()
  } catch { return 'unknown' }
}
function manifestHashOnDisk(): string {
  return createHash('sha256').update(readFileSync(MANIFEST_PATH)).digest('hex')
}

async function main(): Promise<void> {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ManifestRow[]
  const physics = manifest.filter((r) => r.subject === 'physics').sort((a, b) => a.lessonOrder - b.lessonOrder)
  const totalLessons = physics.length
  const byId = new Map(physics.map((r) => [r.conceptId, r]))

  const cohortIds = JSON.parse(readFileSync(COHORT_PATH, 'utf8')) as string[]
  if (cohortIds.length !== 25) throw new Error(`expected 25 cohort ids, got ${cohortIds.length}`)
  const batchRows: ManifestRow[] = cohortIds.map((id) => {
    const row = byId.get(id)
    if (!row) throw new Error(`cohort concept not in physics manifest: ${id}`)
    return row
  })

  // 4/7/7/7 — the established bias-away-from-w1 split from batches 2-4.
  const assignment: Record<string, ManifestRow[]> = {
    w1: batchRows.slice(0, 4),
    w2: batchRows.slice(4, 11),
    w3: batchRows.slice(11, 18),
    w4: batchRows.slice(18, 25),
  }

  const resolution = resolveWorkers(process.env, 4)
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.exitCode = 1
    return
  }
  const workerById = new Map(resolution.workers.map((w) => [w.workerId, w]))

  const runId = `physicsBatch5-4w-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Physics batch 5 (4-worker, UNMEASURED re-test cohort) ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)
  process.stderr.write(
    `  assignment: w1=${assignment.w1.length} w2=${assignment.w2.length} ` +
    `w3=${assignment.w3.length} w4=${assignment.w4.length} (total ${batchRows.length})\n`,
  )

  const summary: Array<{ workerId: string; conceptId: string; verdict: string; retried: boolean; error: string | null }> = []

  await Promise.all(
    (['w1', 'w2', 'w3', 'w4'] as const).map(async (wid) => {
      const worker = workerById.get(wid)
      if (!worker) { process.stderr.write(`[${wid}] no resolved worker — skipping\n`); return }
      for (const row of assignment[wid]) {
        const outcome: ConceptOutcome & { retried: boolean } =
          await runWithRetry(row, totalLessons, worker, runId, startedAt)
        if (outcome.record) appendFileSync(artifactPath, JSON.stringify(outcome.record) + '\n')
        summary.push({
          workerId: wid, conceptId: row.conceptId, verdict: outcome.verdict,
          retried: outcome.retried, error: outcome.error,
        })
        process.stderr.write(
          `[${wid}] physics/${row.conceptId} -> ${outcome.verdict}` +
          `${outcome.retried ? ' (retried)' : ''}${outcome.error ? ` error=${outcome.error}` : ''}\n`,
        )
      }
    }),
  )

  process.stderr.write(`\nartifact: ${artifactPath}\n\n`)
  const counts: Record<string, number> = {}
  for (const s of summary) counts[s.verdict] = (counts[s.verdict] ?? 0) + 1
  console.log(JSON.stringify({
    runId, startedAt, finishedAt: new Date().toISOString(), baseUrl: BASE_URL,
    protocol: PROTOCOL_VERSION, harnessVersion: HARNESS_VERSION, repoSha: repoSha(),
    manifestHash: manifestHashOnDisk(),
    assignmentSizes: { w1: assignment.w1.length, w2: assignment.w2.length, w3: assignment.w3.length, w4: assignment.w4.length },
    attempted: summary.length, counts, outcomes: summary,
  }, null, 2))
}

if (require.main === module) main().catch((e) => { console.error(e); process.exitCode = 1 })
