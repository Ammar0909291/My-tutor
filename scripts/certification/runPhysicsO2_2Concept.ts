/**
 * TIER A — O-2 POST-REMEDIATION RE-CERTIFICATION, EXACTLY TWO CONCEPTS.
 *
 * `phys.em.resistivity` and `phys.em.solenoid` were the two probes P-8 measured
 * as production/repository content drift: production served a stem that no
 * longer existed in the corpus, so the harness could not answer it and both
 * concepts returned UNMEASURED-no-authored-match in P-1b. O-2 restored both
 * rows to the current corpus content (ledger 9k). This re-runs certification for
 * those two concepts ONLY, to see whether the drift was the whole reason.
 *
 * The protocol is UNCHANGED: this imports runTierA.ts's exported `runWithRetry`
 * verbatim and adds no verdict, retry or answer-source logic of its own. It
 * differs from its siblings only in the cohort (a fixed pair, not a manifest
 * slice) and in using two workers, one concept each, because a two-concept
 * cohort has nothing to spread across four.
 *
 *   npx tsx scripts/certification/runPhysicsO2_2Concept.ts
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

const COHORT = ['phys.em.resistivity', 'phys.em.solenoid'] as const

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

  const batchRows: ManifestRow[] = COHORT.map((id) => {
    const row = byId.get(id)
    if (!row) throw new Error(`cohort concept not in physics manifest: ${id}`)
    return row
  })
  if (batchRows.length !== 2) throw new Error(`expected 2 cohort rows, got ${batchRows.length}`)

  // One concept per worker, and deliberately NOT w1: w1 is the long-lived
  // engineering account whose spine log makes every session hydration expensive
  // (ledger 9e). Two concepts do not need it.
  const assignment: Record<string, ManifestRow[]> = {
    w2: batchRows.slice(0, 1),
    w3: batchRows.slice(1, 2),
  }

  const resolution = resolveWorkers(process.env, 4)
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.exitCode = 1
    return
  }
  const workerById = new Map(resolution.workers.map((w) => [w.workerId, w]))

  const runId = `physicsO2-2c-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Physics O-2 post-remediation re-certification (2 concepts) ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)
  process.stderr.write(`  assignment: w2=${assignment.w2.length} w3=${assignment.w3.length} (total ${batchRows.length})\n`)

  const summary: Array<{ workerId: string; conceptId: string; verdict: string; retried: boolean; error: string | null }> = []

  await Promise.all(
    (['w2', 'w3'] as const).map(async (wid) => {
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
    assignmentSizes: { w2: assignment.w2.length, w3: assignment.w3.length },
    attempted: summary.length, counts, outcomes: summary,
  }, null, 2))
}

if (require.main === module) main().catch((e) => { console.error(e); process.exitCode = 1 })
