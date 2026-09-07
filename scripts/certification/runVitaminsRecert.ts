/**
 * TIER A — chem.bio.vitamins, THE SOLE REMAINING CHEMISTRY CONCEPT.
 *
 * The protocol is UNCHANGED: this imports runTierA.ts's exported `runWithRetry`
 * verbatim and adds no verdict, retry, grading, or answer-source logic of its
 * own — same shape as runPhysicsO2_2Concept.ts, generalized to a one-concept,
 * one-worker cohort (a single concept has nothing to spread across two
 * workers). Does not touch detectDirtyState, classifyVerdict, certifyConcept's
 * D1-D6 criteria, answerSource.ts's matching rules, endSession, or any
 * /api/* route.
 *
 *   npx tsx scripts/certification/runVitaminsRecert.ts
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

const COHORT = ['chem.bio.vitamins'] as const

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
  const chemistry = manifest.filter((r) => r.subject === 'chemistry').sort((a, b) => a.lessonOrder - b.lessonOrder)
  const totalLessons = chemistry.length
  const byId = new Map(chemistry.map((r) => [r.conceptId, r]))

  const batchRows: ManifestRow[] = COHORT.map((id) => {
    const row = byId.get(id)
    if (!row) throw new Error(`cohort concept not in chemistry manifest: ${id}`)
    return row
  })
  if (batchRows.length !== 1) throw new Error(`expected 1 cohort row, got ${batchRows.length}`)

  // Chemistry's own worker slots are w2/w4 (runTierA.ts's CHEMISTRY_WORKERS).
  // One concept needs one worker; w2 is used, w4 requested but unused this run.
  const resolution = resolveWorkers(process.env, [2, 4])
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.exitCode = 1
    return
  }
  const workerById = new Map(resolution.workers.map((w) => [w.workerId, w]))
  // Selectable so a DIRTY_STATE retry can use the OTHER chemistry worker
  // slot rather than reusing an account whose session may still be dirty.
  const workerId = (process.env.VITAMINS_WORKER === 'w4' ? 'w4' : 'w2') as 'w2' | 'w4'
  const worker = workerById.get(workerId)
  if (!worker) throw new Error(`${workerId} not resolved`)

  const runId = `vitaminsRecert-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Chemistry Vitamins re-certification (1 concept) ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)
  process.stderr.write(`  worker=${workerId} concept=${COHORT[0]}\n`)

  const outcome: ConceptOutcome & { retried: boolean } =
    await runWithRetry(batchRows[0], totalLessons, worker, runId, startedAt)
  if (outcome.record) appendFileSync(artifactPath, JSON.stringify(outcome.record) + '\n')

  process.stderr.write(
    `[${workerId}] chemistry/${batchRows[0].conceptId} -> ${outcome.verdict}` +
    `${outcome.retried ? ' (retried)' : ''}${outcome.error ? ` error=${outcome.error}` : ''}\n`,
  )
  process.stderr.write(`\nartifact: ${artifactPath}\n\n`)

  console.log(JSON.stringify({
    runId, startedAt, finishedAt: new Date().toISOString(), baseUrl: BASE_URL,
    protocol: PROTOCOL_VERSION, harnessVersion: HARNESS_VERSION, repoSha: repoSha(),
    manifestHash: manifestHashOnDisk(),
    conceptId: batchRows[0].conceptId, verdict: outcome.verdict, retried: outcome.retried,
    error: outcome.error, record: outcome.record,
  }, null, 2))
}

if (require.main === module) main().catch((e) => { console.error(e); process.exitCode = 1 })
