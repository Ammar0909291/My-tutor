/**
 * TIER A RUNNER — full-population certification for physics + chemistry.
 *
 * Wiring only, per the Tier A handover's §8 rule: this file does NOT touch
 * `detectDirtyState`, `classifyVerdict`, `certifyConcept`'s D1-D6 criteria,
 * `answerSource.ts`'s matching rules, `endSession`, or any `/api/*` route.
 * It imports those primitives from `scripts/math/certify.ts` and
 * `scripts/certification/measurementIdentity.ts` exactly as
 * `runPhase0Controls.ts` does (Phase 0 validated 6/6 clean against SHA
 * 459ea74e — see CLAUDE.md), and adds the one thing that was still missing:
 * an orchestration loop over the full 424-row Tier A manifest instead of six
 * fixed control roles.
 *
 * `runPhase0Controls.ts` is deliberately left untouched rather than
 * generalized — it is the validated Phase 0 harness and its own file header
 * says so. The ~15-line "turn a certifyConcept result into a Verdict"
 * extraction is duplicated here rather than imported, because that logic
 * lives inside `runPhase0Controls.ts`'s un-exported `classify()`; the
 * duplicate calls the SAME imported `classifyVerdict` (measurementIdentity.ts)
 * so no verdict-precedence logic is reimplemented, only the small,
 * mechanical mapping from `result.failed` tag strings onto its input shape.
 *
 * ── OPERATOR DECISIONS THIS RUNNER ENCODES (recorded, not invented) ────────
 * Asked and answered explicitly before this file was written:
 *   1. Runner path:      NEW Tier-A runner (this file), not certify.ts's CLI
 *                         — so W1 (suaibamr@gmail.com) can run via the
 *                         existing DESIGNATED_TEST_ACCOUNT override, which
 *                         certify.ts's own FORBIDDEN_ACCOUNTS has no
 *                         override for.
 *   2. Worker assignment: subject-partitioned, 2 workers per subject —
 *                         physics -> w1, w3 / chemistry -> w2, w4. Each
 *                         worker's slice of a subject is processed serially
 *                         (one concept's session is closed before the next
 *                         opens on that same worker+subject pair — required
 *                         because /api/sessions resumes by (user, subject)).
 *                         The two workers assigned to a subject, and the two
 *                         subjects themselves, run CONCURRENTLY — they never
 *                         share an account, so there is no resume race.
 *   3. Batch size:        ~25 concepts per worker per invocation, checkpointed.
 *                         Enforced structurally: running with neither --batch
 *                         nor --all refuses to start (see main()).
 *   4. Retry policy:      a FAILED_INFRASTRUCTURE verdict (a degraded AI
 *                         provider, per isDegradedProvider) is retried once,
 *                         automatically, with a fresh login/session; the
 *                         retry's verdict is final either way and the record
 *                         notes carry `retried-after-FAILED_INFRASTRUCTURE`.
 *
 * ── WHAT THIS RUNNER DELIBERATELY DOES NOT DO ───────────────────────────────
 * It does not decide eligibility — `buildManifest.ts`'s own header is explicit
 * that the manifest is the population, not a pass/fail list; whether a concept
 * meets `assetContract.ts` v1 is a fact about the live database this runner
 * measures by actually certifying it, not by pre-filtering the manifest.
 * It does not run without an explicit `--batch=N` or `--all` flag — a bare
 * invocation refuses, so 424 real lesson certifications are never fired by
 * accident. It does not run Tier B or Tier C. It never prints a credential.
 *
 *   npx tsx scripts/certification/runTierA.ts --subject=physics --batch=1
 *   npx tsx scripts/certification/runTierA.ts --subject=chemistry --batch=1 --batch-size=25
 *   npx tsx scripts/certification/runTierA.ts --subject=all --all   # every batch, both subjects
 */

import { execSync } from 'child_process'
import { createHash } from 'crypto'
import { appendFileSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'

import {
  loginAs,
  verifySessionIdentity,
  createSession,
  certifyConcept,
  endSession,
  type ConceptTarget,
} from '../math/certify'
import { buildAnswerIndex } from './answerSource'
import type { ManifestRow } from './buildManifest'
import {
  HARNESS_VERSION,
  PROTOCOL_VERSION,
  classifyVerdict,
  resolveWorkers,
  type ConceptRecord,
  type Verdict,
  type WorkerAccount,
} from './measurementIdentity'

const BASE_URL = process.env.CERT_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
const ARTIFACT_DIR = join(__dirname, 'artifacts')
const MANIFEST_PATH = join(__dirname, 'tierA-manifest.json')

/** Subject-partitioned worker assignment (operator decision #2). */
const PHYSICS_WORKERS = ['w1', 'w3'] as const
const CHEMISTRY_WORKERS = ['w2', 'w4'] as const

function repoSha(): string {
  try {
    return execSync('git rev-parse HEAD', { cwd: join(__dirname, '..', '..') }).toString().trim()
  } catch {
    return 'unknown'
  }
}

function manifestHashOnDisk(): string {
  const raw = readFileSync(MANIFEST_PATH)
  return createHash('sha256').update(raw).digest('hex')
}

function loadManifest(): ManifestRow[] {
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ManifestRow[]
}

function chunk<T>(items: readonly T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/**
 * Split a subject's manifest rows (in manifest lessonOrder — the same order
 * /api/curriculum itself assigns) into contiguous halves, one per assigned
 * worker. Contiguous rather than interleaved so each worker's batch-N slice
 * is stable and reproducible across invocations of this script.
 */
function assignRows(
  manifest: readonly ManifestRow[],
): Record<string, ManifestRow[]> {
  const physics = manifest.filter((r) => r.subject === 'physics').sort((a, b) => a.lessonOrder - b.lessonOrder)
  const chemistry = manifest.filter((r) => r.subject === 'chemistry').sort((a, b) => a.lessonOrder - b.lessonOrder)
  const half = <T,>(rows: T[]): [T[], T[]] => {
    const mid = Math.ceil(rows.length / 2)
    return [rows.slice(0, mid), rows.slice(mid)]
  }
  const [physicsA, physicsB] = half(physics)
  const [chemistryA, chemistryB] = half(chemistry)
  return {
    [PHYSICS_WORKERS[0]]: physicsA,
    [PHYSICS_WORKERS[1]]: physicsB,
    [CHEMISTRY_WORKERS[0]]: chemistryA,
    [CHEMISTRY_WORKERS[1]]: chemistryB,
  }
}

interface ConceptOutcome {
  verdict: Verdict
  record: ConceptRecord | null
  error: string | null
}

/**
 * The certifyConcept-result -> Verdict mapping, mechanically identical to
 * `runPhase0Controls.ts`'s un-exported `classify()` (same tag strings, same
 * imported `classifyVerdict`) but generic over a manifest row instead of a
 * six-role ControlDefinition. See file header for why this is a small
 * duplicate rather than a shared import.
 */
async function runOneConcept(
  row: ManifestRow, totalLessons: number, worker: WorkerAccount, runId: string, startedAt: string,
): Promise<ConceptOutcome> {
  const target: ConceptTarget = {
    conceptId: row.conceptId, lessonTitle: row.lessonTitle,
    lessonOrder: row.lessonOrder, unitTitle: row.unitTitle,
  }
  try {
    const cookie = await loginAs(BASE_URL, worker.email, worker.password)
    const authedAs = await verifySessionIdentity(BASE_URL, cookie)
    // I-1: refuse rather than infer worker isolation.
    if (authedAs.toLowerCase() !== worker.email.toLowerCase()) {
      return {
        verdict: 'FAILED_INSTRUMENT', record: null,
        error: `authenticated as ${authedAs}, expected worker account ${worker.email} — worker isolation violated`,
      }
    }
    const answerIndex = await buildAnswerIndex()
    const session = await createSession(cookie, row.subject, BASE_URL)
    try {
      const result = await certifyConcept(target, cookie, session.id, answerIndex, totalLessons, session.resumed)
      const f = result.failed
      const dirtyState = f.includes('DIRTY-STATE')
      const degradedTurns = f.includes('INFRASTRUCTURE-degraded') ? 1 : 0
      const belowContract = f.includes('D2-ungradeable')
      const unmeasuredEntry = f.find((x) => x.startsWith('UNMEASURED-'))
      const unmeasuredReason = unmeasuredEntry ?? null
      const KNOWN = new Set(['DIRTY-STATE', 'INFRASTRUCTURE-degraded', 'D2-ungradeable'])
      const hardFailures = f.filter((x) => !KNOWN.has(x) && !x.startsWith('UNMEASURED-'))
      const lessonClosed = result.verified && !f.includes('D4-inconsistent')
      const verdict = classifyVerdict({
        instrumentFailed: false, degradedTurns, dirtyState, belowContract, unmeasuredReason,
        hardFailures, verified: result.verified, lessonClosed, attempted: true,
      })
      const record: ConceptRecord = {
        protocol: PROTOCOL_VERSION, harnessVersion: HARNESS_VERSION, repoSha: repoSha(),
        answerSourceFingerprint: answerIndex.fingerprint, manifestHash: manifestHashOnDisk(),
        workerId: worker.workerId, accountLabel: worker.accountLabel, runId, startedAt,
        subject: row.subject, conceptId: row.conceptId, language: 'en', gradeBand: null,
        verdict, failed: result.failed, turns: result.turns, finalPhase: result.finalPhase,
        checkCorrect: result.checkCorrect, practiceCorrect: result.practiceCorrect,
        verified: result.verified, lessonClosed: verdict === 'CERTIFIED',
        providersSeen: [], degradedTurns, unmeasuredReason,
        notes: [...result.notes],
        finishedAt: new Date().toISOString(),
      }
      return { verdict, record, error: null }
    } finally {
      await endSession(cookie, session.id, BASE_URL)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { verdict: 'FAILED_INSTRUMENT', record: null, error: message }
  }
}

/** Operator decision #4: one automatic retry on FAILED_INFRASTRUCTURE only. */
async function runWithRetry(
  row: ManifestRow, totalLessons: number, worker: WorkerAccount, runId: string, startedAt: string,
): Promise<ConceptOutcome & { retried: boolean }> {
  const first = await runOneConcept(row, totalLessons, worker, runId, startedAt)
  if (first.verdict !== 'FAILED_INFRASTRUCTURE') return { ...first, retried: false }
  process.stderr.write(`  [retry] ${row.subject}/${row.conceptId} came back FAILED_INFRASTRUCTURE — retrying once\n`)
  const second = await runOneConcept(row, totalLessons, worker, runId, startedAt)
  if (second.record) second.record.notes.push('retried-after-FAILED_INFRASTRUCTURE')
  return { ...second, retried: true }
}

interface Args {
  subject: 'physics' | 'chemistry' | 'all'
  batchSize: number
  batch: number | null
  all: boolean
}

function parseArgs(argv: readonly string[]): Args {
  let subject: Args['subject'] = 'all'
  let batchSize = 25
  let batch: number | null = null
  let all = false
  for (const arg of argv) {
    if (arg.startsWith('--subject=')) {
      const v = arg.slice('--subject='.length)
      if (v === 'physics' || v === 'chemistry' || v === 'all') subject = v
      else throw new Error(`--subject must be physics, chemistry, or all (got ${v})`)
    } else if (arg.startsWith('--batch-size=')) {
      batchSize = Number(arg.slice('--batch-size='.length))
      if (!Number.isInteger(batchSize) || batchSize < 1) throw new Error('--batch-size must be a positive integer')
    } else if (arg.startsWith('--batch=')) {
      batch = Number(arg.slice('--batch='.length))
      if (!Number.isInteger(batch) || batch < 1) throw new Error('--batch must be a positive integer (1-based)')
    } else if (arg === '--all') {
      all = true
    } else {
      throw new Error(`unrecognized argument: ${arg}`)
    }
  }
  return { subject, batchSize, batch, all }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))

  // Operator decision #3 enforced structurally: refuse a bare invocation
  // rather than silently certifying the whole 424-row population at once.
  if (!args.all && args.batch === null) {
    process.stderr.write(
      'Tier A refuses to run without an explicit --batch=N or --all.\n\n' +
      'Examples:\n' +
      '  npx tsx scripts/certification/runTierA.ts --subject=physics --batch=1\n' +
      '  npx tsx scripts/certification/runTierA.ts --subject=chemistry --batch=1 --batch-size=25\n' +
      '  npx tsx scripts/certification/runTierA.ts --subject=all --all\n',
    )
    process.exitCode = 1
    return
  }

  const runId = `tierA-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Tier A run ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)
  process.stderr.write(`  subject=${args.subject} batchSize=${args.batchSize} batch=${args.batch ?? '(all)'}\n`)

  const resolution = resolveWorkers(process.env, 4)
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.exitCode = 1
    return
  }
  const byId = new Map(resolution.workers.map((w) => [w.workerId, w]))

  const manifest = loadManifest()
  const totalLessons: Record<'physics' | 'chemistry', number> = {
    physics: manifest.filter((r) => r.subject === 'physics').length,
    chemistry: manifest.filter((r) => r.subject === 'chemistry').length,
  }
  const assignments = assignRows(manifest)

  const subjects: Array<'physics' | 'chemistry'> = args.subject === 'all' ? ['physics', 'chemistry'] : [args.subject]
  const workerIds = subjects.flatMap((s) => (s === 'physics' ? PHYSICS_WORKERS : CHEMISTRY_WORKERS))

  const summary: Array<{ workerId: string; conceptId: string; subject: string; verdict: string; retried: boolean; error: string | null }> = []

  // Subject-partitioned workers never share an account, so they run
  // concurrently (operator decision #2); within one worker, concepts run
  // strictly serially — createSession/endSession must fully bracket one
  // concept before the next opens for the SAME (worker, subject) pair.
  await Promise.all(
    workerIds.map(async (wid) => {
      const worker = byId.get(wid)
      if (!worker) {
        process.stderr.write(`[${wid}] no resolved worker — skipping this worker's slice entirely\n`)
        return
      }
      const rows = assignments[wid] ?? []
      const batches = chunk(rows, args.batchSize)
      const batchIndexes = args.all ? batches.map((_, i) => i) : [args.batch! - 1]
      for (const bi of batchIndexes) {
        const batch = batches[bi]
        if (!batch) {
          process.stderr.write(`[${wid}] batch ${bi + 1} does not exist (only ${batches.length} batches) — skipping\n`)
          continue
        }
        process.stderr.write(`\n[${wid}] batch ${bi + 1}/${batches.length} (${batch.length} concepts)\n`)
        for (const row of batch) {
          const outcome = await runWithRetry(row, totalLessons[row.subject as 'physics' | 'chemistry'], worker, runId, startedAt)
          if (outcome.record) appendFileSync(artifactPath, JSON.stringify(outcome.record) + '\n')
          summary.push({
            workerId: wid, conceptId: row.conceptId, subject: row.subject,
            verdict: outcome.verdict, retried: outcome.retried, error: outcome.error,
          })
          process.stderr.write(
            `[${wid}] ${row.subject}/${row.conceptId} -> ${outcome.verdict}` +
            `${outcome.retried ? ' (retried)' : ''}${outcome.error ? ` error=${outcome.error}` : ''}\n`,
          )
        }
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
    args, attempted: summary.length, counts, outcomes: summary,
  }, null, 2))
}

if (require.main === module) main().catch((e) => { console.error(e); process.exitCode = 1 })
