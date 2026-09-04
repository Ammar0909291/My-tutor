/**
 * PHASE 0 SIX-CONTROL RUNNER — the missing wiring.
 *
 * `measurementIdentity.ts` (I-1..I-4) defines the measurement contract;
 * `answerSource.ts` (A-1) resolves the authoritative answer;
 * `buildManifest.ts` (I-3) builds the frozen Tier A population;
 * `scripts/math/certify.ts` drives the deployed app over HTTP and applies
 * D1-D6. None of the four were wired to each other or to a per-worker,
 * per-control execution loop before this file — this is that wiring, and
 * nothing more. It duplicates none of the four primitives above; it imports
 * them.
 *
 *   QA worker (CERT_WORKER_n)
 *     -> production authentication (certify.ts's loginAs/verifySessionIdentity)
 *     -> lesson/session creation (certify.ts's createSession)
 *     -> real lesson turns + canonical answer-source selection + exact
 *        production MCQ interaction + server grading (certify.ts's
 *        certifyConcept, which now also applies I-2's detectDirtyState)
 *     -> mastery/completion observation (CertificationResult)
 *     -> ConceptRecord (measurementIdentity.ts)
 *     -> six-way verdict (measurementIdentity.ts's classifyVerdict)
 *     -> durable per-concept JSONL artifact (this file)
 *     -> control result
 *
 * Egress discipline: this file issues ordinary learner-shaped HTTP traffic
 * against the deployed app (the same traffic any of the existing qa/*
 * scripts already produce) — no direct database access, no bulk reads.
 *
 *   npx tsx scripts/certification/runPhase0Controls.ts
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
import { CONTROLS, type ControlDefinition } from './controls'
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

function repoSha(): string {
  try {
    return execSync('git rev-parse HEAD', { cwd: join(__dirname, '..', '..') }).toString().trim()
  } catch {
    return 'unknown'
  }
}

function manifestHashOnDisk(): string {
  const raw = readFileSync(join(__dirname, 'tierA-manifest.json'))
  return createHash('sha256').update(raw).digest('hex')
}

interface ControlOutcome {
  control: ControlDefinition
  verdict: Verdict
  record: ConceptRecord | null
  error: string | null
}

/** Map a certifyConcept result (certify.ts's own vocabulary) onto the six-way Verdict. */
function classify(
  role: ControlDefinition,
  result: Awaited<ReturnType<typeof certifyConcept>> | null,
  harnessError: string | null,
): { verdict: Verdict; parts: Parameters<typeof classifyVerdict>[0] } {
  if (harnessError !== null || result === null) {
    return {
      verdict: 'FAILED_INSTRUMENT',
      parts: {
        instrumentFailed: true, degradedTurns: 0, dirtyState: false, belowContract: false,
        unmeasuredReason: null, hardFailures: [], verified: false, lessonClosed: false, attempted: false,
      },
    }
  }
  const f = result.failed
  const dirtyState = f.includes('DIRTY-STATE')
  const degradedTurns = f.includes('INFRASTRUCTURE-degraded') ? 1 : 0
  const belowContract = f.includes('D2-ungradeable')
  const unmeasuredEntry = f.find((x) => x.startsWith('UNMEASURED-'))
  const unmeasuredReason = unmeasuredEntry ?? null
  const KNOWN = new Set(['DIRTY-STATE', 'INFRASTRUCTURE-degraded', 'D2-ungradeable'])
  const hardFailures = f.filter((x) => !KNOWN.has(x) && !x.startsWith('UNMEASURED-'))
  const lessonClosed = result.verified && !f.includes('D4-inconsistent')
  const parts = {
    instrumentFailed: false, degradedTurns, dirtyState, belowContract, unmeasuredReason,
    hardFailures, verified: result.verified, lessonClosed, attempted: true,
  }
  return { verdict: classifyVerdict(parts), parts }
}

export async function runOne(
  control: ControlDefinition, worker: WorkerAccount, runId: string, startedAt: string,
): Promise<ControlOutcome> {
  const target: ConceptTarget = {
    conceptId: control.conceptId, lessonTitle: control.lessonTitle,
    lessonOrder: control.lessonOrder, unitTitle: control.unitTitle,
  }
  try {
    const cookie = await loginAs(BASE_URL, worker.email, worker.password)
    const authedAs = await verifySessionIdentity(BASE_URL, cookie)
    // I-1: the account this cookie actually authenticated as must be the
    // account this worker was assigned — never inferred, always checked.
    if (authedAs.toLowerCase() !== worker.email.toLowerCase()) {
      return {
        control, verdict: 'FAILED_INSTRUMENT', record: null,
        error: `authenticated as ${authedAs}, expected worker account ${worker.email} — worker isolation violated`,
      }
    }
    const answerIndex = await buildAnswerIndex()
    const session = await createSession(cookie, control.subjectSlug, BASE_URL)
    // Phase 0 remediation (2026-09-03): nothing ever closed this session, so
    // it stayed ACTIVE and was resumed by the NEXT run's /api/sessions call
    // for the same (worker, subject) pair — measured directly as the cause of
    // a run where 5 of 6 controls returned DIRTY_STATE. The `finally` below
    // guarantees cleanup whether certifyConcept resolves, resolves to a
    // failed verdict, or throws — see endSession's own header. This never
    // widens what a control measures: certifyConcept's result is read and
    // the record built BEFORE the session is closed, exactly as before.
    try {
      const result = await certifyConcept(target, cookie, session.id, answerIndex, control.totalLessons, session.resumed)
      const { verdict } = classify(control, result, null)
      const record: ConceptRecord = {
        protocol: PROTOCOL_VERSION, harnessVersion: HARNESS_VERSION, repoSha: repoSha(),
        answerSourceFingerprint: answerIndex.fingerprint, manifestHash: manifestHashOnDisk(),
        workerId: worker.workerId, accountLabel: worker.accountLabel, runId, startedAt,
        subject: control.subjectSlug, conceptId: control.conceptId, language: 'en', gradeBand: null,
        verdict, failed: result.failed, turns: result.turns, finalPhase: result.finalPhase,
        checkCorrect: result.checkCorrect, practiceCorrect: result.practiceCorrect,
        verified: result.verified, lessonClosed: verdict === 'CERTIFIED',
        providersSeen: [], degradedTurns: result.failed.includes('INFRASTRUCTURE-degraded') ? 1 : 0,
        unmeasuredReason: result.failed.find((x) => x.startsWith('UNMEASURED-')) ?? null,
        notes: [`control=${control.role}`, ...result.notes],
        finishedAt: new Date().toISOString(),
      }
      return { control, verdict, record, error: null }
    } finally {
      await endSession(cookie, session.id, BASE_URL)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { control, verdict: 'FAILED_INSTRUMENT', record: null, error: message }
  }
}

async function main(): Promise<void> {
  const runId = `phase0-${Date.now()}`
  const startedAt = new Date().toISOString()
  mkdirSync(ARTIFACT_DIR, { recursive: true })
  const artifactPath = join(ARTIFACT_DIR, `${runId}.jsonl`)

  process.stderr.write(`Phase 0 six-control run ${runId}\n`)
  process.stderr.write(`  protocol=${PROTOCOL_VERSION} harness=${HARNESS_VERSION} repoSha=${repoSha()}\n`)
  process.stderr.write(`  manifestHash=${manifestHashOnDisk()}\n`)
  process.stderr.write(`  baseUrl=${BASE_URL}\n`)

  const resolution = resolveWorkers(process.env, 4)
  if (!resolution.ok) {
    process.stderr.write(`WORKER RESOLUTION FAILED: ${resolution.error}\n`)
    process.stderr.write(
      'All six controls are UNMEASURED — worker credentials (CERT_WORKER_1..4_EMAIL/' +
      'PASSWORD) are not available in this environment. This is an environment ' +
      'precondition failure, not a product or instrument defect: the instrument ' +
      'refused to run rather than fabricate results.\n',
    )
    for (const control of CONTROLS) {
      process.stdout.write(JSON.stringify({
        role: control.role, conceptId: control.conceptId, verdict: 'UNMEASURED',
        reason: `worker resolution failed: ${resolution.error}`,
      }) + '\n')
    }
    process.exitCode = 1
    return
  }
  const workers = resolution.workers
  const byId = new Map(workers.map((w) => [w.workerId, w]))

  const outcomes: ControlOutcome[] = []
  for (const control of CONTROLS) {
    const worker = byId.get(control.worker)
    if (!worker) {
      outcomes.push({
        control, verdict: 'FAILED_INSTRUMENT', record: null,
        error: `no resolved worker for slot ${control.worker}`,
      })
      continue
    }
    process.stderr.write(`\n[${control.role}] worker=${control.worker} concept=${control.conceptId} …\n`)
    const outcome = await runOne(control, worker, runId, startedAt)
    outcomes.push(outcome)
    if (outcome.record) appendFileSync(artifactPath, JSON.stringify(outcome.record) + '\n')
    process.stderr.write(
      `[${control.role}] verdict=${outcome.verdict} expected=${control.expected} ` +
      `${outcome.error ? `error=${outcome.error}` : ''}\n`,
    )
  }

  process.stderr.write(`\nartifact: ${artifactPath}\n\n`)
  console.log(JSON.stringify({
    runId, startedAt, finishedAt: new Date().toISOString(), baseUrl: BASE_URL,
    protocol: PROTOCOL_VERSION, harnessVersion: HARNESS_VERSION, repoSha: repoSha(),
    manifestHash: manifestHashOnDisk(),
    outcomes: outcomes.map((o) => ({
      role: o.control.role, conceptId: o.control.conceptId, worker: o.control.worker,
      expected: o.control.expected, actual: o.verdict,
      matches: o.verdict === o.control.expected, error: o.error,
    })),
  }, null, 2))
}

if (require.main === module) main().catch((e) => { console.error(e); process.exitCode = 1 })
