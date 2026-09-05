/**
 * TIER A — PHYSICS BATCH 4, 4-WORKER (25 concepts, bias away from w1).
 *
 * Same pattern as batches 2/3 and the canary: a thin, one-off dispatch
 * script importing runTierA.ts's already-exported runOneConcept/
 * runWithRetry UNCHANGED. No modification to any existing file.
 *
 * CONCEPT SELECTION: physics manifest rows 101-119 (0-indexed 100-118,
 * 19 concepts) + rows 145-150 (0-indexed 144-149, 6 concepts) = 25.
 * This specific two-piece selection avoids rows 120-144, which batch 1
 * already assigned to w3. Verified beforehand to have ZERO overlap with
 * the 125 physics concepts already attempted (batch 1: rows 1-25, 120-144;
 * canary: rows 51-75; batch 2: rows 76-100; batch 3: rows 26-50).
 *
 * WORKER SPLIT: 4 / 7 / 7 / 7 (w1/w2/w3/w4) = 25, matching the
 * established, already-validated distribution strategy from batches 2-3.
 *
 *   npx tsx scripts/certification/runPhysicsBatch4_4Worker.ts
 */

import { createHash } from 'crypto'
import { execSync } from 'child_process'
import { appendFileSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { runWithRetry, type ConceptOutcome } from './runTierA'
import type { ManifestRow } from './buildManifest'
import {
  HARNESS_VERSION,
  PROTOCOL_VERSION,
  resolveWorkers,
} from './measurementIdentity'

const BASE_URL = process.env.CERT_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
const ARTIFACT_DIR = join(__dirname, 'artifacts')
const MANIFEST_PATH = join(__dirname, 'tierA-manifest.json')

function repoSha(): string {
  try {
    return execSync('git rev-parse HEAD', { cwd: join(__dirname, '..', '..') }).toString().trim()
  } catch {
    return 'unknown'
  }
}

function manifestHashOnDisk(): string {
  return createHash('sha256').update(readFileSync(MANIFEST_PATH)).digest('hex')
}

async function main(): Promise<void> {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ManifestRow[]
  const physics = manifest.filter((r) => r.subject === 'physics').sort((a, b) => a.lessonOrder - b.lessonOrder)
  const totalLessons = physics.length

  const batchRows = [...physics.slice(100, 119), ...physics.slice(144, 150)]
  if (batchRows.length !== 25) throw new Error(`expected 25 batch rows, got ${batchRows.length}`)

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
  const byId = new Map(resolution.workers.map((w) => [w.workerId, w]))

  const runId = `physicsBatch4-4w-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Physics batch 4 (4-worker) ${runId}\n`)
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
      const worker = byId.get(wid)
      if (!worker) {
        process.stderr.write(`[${wid}] no resolved worker — skipping\n`)
        return
      }
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
