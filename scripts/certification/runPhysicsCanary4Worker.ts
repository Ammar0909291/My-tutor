/**
 * ONE-OFF: 4-WORKER PHYSICS CANARY (25 concepts, ~6-7 per worker).
 *
 * A single, explicitly-scoped exception to runTierA.ts's standing
 * subject-partitioned (2-workers-per-subject) design, requested to measure
 * whether running all 4 workers concurrently on ONE subject changes
 * anything beyond wall-clock time (per the egress-attribution investigation
 * — the answer, from the code: it shouldn't, since egress volume depends
 * on session count x each worker's own event-count depth, not on
 * concurrency degree).
 *
 * REUSES runTierA.ts's runOneConcept/runWithRetry EXACTLY — same
 * createSession/certifyConcept/endSession sequencing, same one-retry-on-
 * FAILED_INFRASTRUCTURE policy, same classifyVerdict precedence, same
 * ConceptRecord evidence shape. Nothing about session isolation, retry, or
 * evidence recording is reimplemented or altered here — only the worker
 * assignment for this one run differs from the standing 2-per-subject
 * scheme, and only for these 25 concepts.
 *
 * The 25 concepts (physics manifest rows 51-75 in lessonOrder) were
 * verified beforehand to have ZERO overlap with the physics batch 1 run
 * (w1's and w3's first 25-concept batches) — this is genuinely new
 * coverage, not a re-run.
 *
 *   npx tsx scripts/certification/runPhysicsCanary4Worker.ts
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

  // Verified fresh (zero overlap with batch 1's w1/w3 first-25 slices) at
  // dispatch time: rows 51-75 in physics lessonOrder (0-indexed 50..74).
  const canaryRows = physics.slice(50, 75)
  if (canaryRows.length !== 25) throw new Error(`expected 25 canary rows, got ${canaryRows.length}`)

  // 7 / 6 / 6 / 6 = 25, one contiguous slice per worker.
  const assignment: Record<string, ManifestRow[]> = {
    w1: canaryRows.slice(0, 7),
    w2: canaryRows.slice(7, 13),
    w3: canaryRows.slice(13, 19),
    w4: canaryRows.slice(19, 25),
  }

  const resolution = resolveWorkers(process.env, 4)
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.exitCode = 1
    return
  }
  const byId = new Map(resolution.workers.map((w) => [w.workerId, w]))

  const runId = `physicsCanary4w-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`4-worker physics canary ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)
  process.stderr.write(
    `  assignment: w1=${assignment.w1.length} w2=${assignment.w2.length} ` +
    `w3=${assignment.w3.length} w4=${assignment.w4.length} (total ${canaryRows.length})\n`,
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
