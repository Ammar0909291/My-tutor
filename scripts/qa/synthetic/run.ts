/**
 * SYNTHETIC STUDENTS ON THE LAUNCH SET — the stand-in for real traffic.
 *
 * For each persona: create a disposable account, study the chosen launch
 * topics in prerequisite order against the DEPLOYED app, check every tutor
 * turn (checks.ts), write one run file, print the scorecard, delete the
 * account and prove it is gone.
 *
 * Nothing here touches the database directly. Every request is one a learner's
 * browser would make, so egress per turn is what a real learner costs; keep
 * runs small and capped (RUNNER_MAX_TOTAL_TURNS) — 5 GB/month Supabase quota.
 *
 *   RUNNER_TOPICS=2                      first N launch topics, or a comma list of ids (default 2)
 *   RUNNER_PERSONAS=beginner,strong      default: all five
 *   RUNNER_MAX_TURNS=18                  per lesson
 *   RUNNER_MAX_TOTAL_TURNS=200           hard cap for the whole run
 *   RUNNER_PAUSE_MS=1200                 between turns (provider rate limits)
 *   RUNNER_KEEP_ACCOUNTS=1               do not delete the accounts afterwards
 *   QA_OUT=run.json                      run file (default ./synthetic-run-<time>.json)
 *   QA_SCORECARD=scorecard.md            also write the scorecard here
 *   QA_BASE_URL=…                        default: production
 *
 *   npx tsx scripts/qa/synthetic/run.ts
 */
import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from '../liveAccount'
import { SEED_PROBES } from '../../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../../src/lib/teaching/assets/authoredSeedAssets'
import { PHYSICS_BAND_GAP_PROBES } from '../../../src/lib/teaching/assets/physicsBandGapAssets'
import { PHYSICS_DEPTH_PROBES } from '../../../src/lib/teaching/assets/physicsDepthSeedAssets'
import { stripAuthoringLabel } from '../../../src/lib/teaching/gateProbeContract'
import { PHYSICS_MECHANICS_LAUNCH_SET, LAUNCH_SUBJECT } from './launchSet'
import { PERSONAS, personaById, decideAct, initialPersonaState, type KeyedChoice, type Persona } from './personas'
import { checkTurn, checkLesson, reachedMastery, type TurnRecord, type TutorReply } from './checks'
import { buildScorecard, renderScorecardMarkdown, type LessonResult, type RunFile } from './scorecard'

// ─── answer key (authored corpus only — never the tutor's reply) ─────────────
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const KEYED = [...SEED_PROBES, ...AUTHORED_PROBES, ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES]
  .filter((p) => p.subjectSlug === LAUNCH_SUBJECT && Array.isArray(p.choices) && p.choices.filter((c) => c.isCorrect).length === 1)
  .map((p) => ({ conceptId: p.conceptId, stem: norm(stripAuthoringLabel(p.stem)), choices: p.choices as KeyedChoice[] }))

export function keyFor(question: string, options: readonly string[]): KeyedChoice[] | null {
  const q = norm(question)
  if (!q) return null
  const optionSet = new Set(options.map(norm))
  const sameOptions = (c: KeyedChoice[]) => c.length === options.length && c.every((x) => optionSet.has(norm(x.text)))
  const exact = KEYED.filter((p) => p.stem === q && sameOptions(p.choices))
  if (exact.length) return exact[0].choices
  const near = KEYED.filter((p) => p.stem.length > 30 && (q.includes(p.stem) || p.stem.includes(q)) && sameOptions(p.choices))
  return near.length ? near[0].choices : null
}

// ─── api ─────────────────────────────────────────────────────────────────────
async function api(cookie: string, path: string, body?: unknown): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (r.status === 429 || r.status >= 500) { await sleep(15_000 * (attempt + 1)); continue }
    if (!r.ok) throw new Error(`${path} ${r.status}: ${(await r.text()).slice(0, 200)}`)
    return r.json()
  }
  throw new Error(`${path} failed after retries`)
}
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

function toReply(r: any): TutorReply {
  return {
    text: String(r?.text ?? ''),
    provider: r?.provider ?? null,
    mcq: r?.mcq?.options?.length ? { question: String(r.mcq.question), options: r.mcq.options.map(String) } : null,
    figure: Boolean(r?.visual || r?.visualSpec || r?.sceneSpec),
    mastery: r?.mastery ?? null,
    lessonComplete: r?.lessonComplete ?? null,
  }
}
function correctIndexOf(reply: TutorReply): number | null {
  if (!reply.mcq) return null
  const key = keyFor(reply.mcq.question, reply.mcq.options)
  const right = key?.find((c) => c.isCorrect)
  if (!right) return null
  const i = reply.mcq.options.findIndex((o) => norm(o) === norm(right.text))
  return i >= 0 ? i : null
}

// ─── one lesson ──────────────────────────────────────────────────────────────
interface Budget { used: number; max: number }

async function studyTopic(acct: QaAccount, persona: Persona, topic: string, curriculum: any[], maxTurns: number, pauseMs: number, budget: Budget): Promise<LessonResult> {
  const result: LessonResult = {
    persona: persona.id, topic, sessionId: null, turns: [], findings: [],
    summary: { turns: 0, mastered: false, turnsToMastery: null, closed: false, stoppedBecause: '', finalPhase: null, verified: '0/0' },
  }
  const lesson = curriculum.find((l) => l.topicSlug === topic)
  if (!lesson) { result.error = 'not in the physics curriculum'; result.summary.stoppedBecause = 'error'; return result }
  try {
    const s = await api(acct.cookie, '/api/sessions', { subjectSlug: LAUNCH_SUBJECT })
    result.sessionId = s.data?.id ?? s.id ?? null
    const open = toReply(await api(acct.cookie, '/api/learn/lesson-init', {
      sessionId: result.sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: curriculum.length,
      completedLessons: [], teachingLanguage: 'en',
    }))
    const first: TurnRecord = { index: 0, act: { kind: 'open' }, reply: open, replyKeyCorrectIndex: correctIndexOf(open) }
    result.turns.push(first)
    result.findings.push(...checkTurn(first, []))

    let state = initialPersonaState()
    for (let i = 1; i <= maxTurns; i++) {
      if (budget.used >= budget.max) { result.summary.stoppedBecause = 'run turn budget'; break }
      const onScreen = result.turns[result.turns.length - 1].reply.mcq
      const key = onScreen ? keyFor(onScreen.question, onScreen.options) : null
      const { act, next } = decideAct(persona, state, onScreen, key)
      state = next
      await sleep(pauseMs)
      const reply = toReply(await api(acct.cookie, '/api/learn/chat', { sessionId: result.sessionId, message: act.message }))
      budget.used++
      const rec: TurnRecord = { index: i, act, reply, replyKeyCorrectIndex: correctIndexOf(reply) }
      const found = checkTurn(rec, result.turns)
      result.turns.push(rec)
      result.findings.push(...found)
      const m = reply.mastery
      console.log(`  [${persona.id} ${topic.replace('phys.mech.', '')} t${i}] ${act.kind === 'answer' ? (act.intendedCorrect === null ? 'tap?' : act.intendedCorrect ? 'right' : 'wrong') : 'say'} "${act.message.slice(0, 40)}" -> ${reply.provider} ${m?.phase ?? '?'} v=${m?.verifiedCheckCorrect ?? 0}/${m?.verifiedPracticeCorrect ?? 0}${reply.mcq ? ' +mcq' : ''}${found.length ? ' !! ' + found.map((f) => f.code).join(',') : ''}`)
      if (reachedMastery(m)) { result.summary.mastered = true; result.summary.turnsToMastery = i; result.summary.stoppedBecause = 'mastered'; break }
      if (reply.lessonComplete?.complete) { result.summary.closed = true; result.summary.stoppedBecause = 'lesson closed'; break }
      if (checkLesson(result.turns).some((f) => f.code === 'stuck')) { result.summary.stoppedBecause = 'stuck'; break }
    }
    if (!result.summary.stoppedBecause) result.summary.stoppedBecause = 'turn limit'
  } catch (err) {
    result.error = (err as Error).message
    result.summary.stoppedBecause = 'error'
  }
  result.findings.push(...checkLesson(result.turns))
  const last = result.turns[result.turns.length - 1]?.reply.mastery
  result.summary.turns = Math.max(0, result.turns.length - 1)
  result.summary.finalPhase = last?.phase ?? null
  result.summary.verified = `${last?.verifiedCheckCorrect ?? 0}/${last?.verifiedPracticeCorrect ?? 0}`
  return result
}

// ─── the run ─────────────────────────────────────────────────────────────────
function chosenTopics(): string[] {
  const raw = (process.env.RUNNER_TOPICS ?? '2').trim()
  if (/^\d+$/.test(raw)) return PHYSICS_MECHANICS_LAUNCH_SET.slice(0, Number(raw))
  const ids = raw.split(',').map((x) => x.trim()).filter(Boolean)
  const unknown = ids.filter((x) => !PHYSICS_MECHANICS_LAUNCH_SET.includes(x))
  if (unknown.length) throw new Error(`not in the launch set: ${unknown.join(', ')}`)
  return ids
}

async function main() {
  const topics = chosenTopics()
  const personas = (process.env.RUNNER_PERSONAS ? process.env.RUNNER_PERSONAS.split(',') : PERSONAS.map((p) => p.id)).map((x) => personaById(x.trim()))
  const maxTurns = Number(process.env.RUNNER_MAX_TURNS ?? 18)
  const budget: Budget = { used: 0, max: Number(process.env.RUNNER_MAX_TOTAL_TURNS ?? 200) }
  const pauseMs = Number(process.env.RUNNER_PAUSE_MS ?? 1200)
  const startedAt = new Date().toISOString()
  let gitSha: string | null = null
  try { gitSha = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch { /* not a checkout */ }
  console.log(`BASE=${BASE} topics=${topics.length} personas=${personas.map((p) => p.id).join(',')} maxTurns=${maxTurns} budget=${budget.max} keyed=${KEYED.length}`)

  const lessons: LessonResult[] = []
  const accounts: RunFile['accounts'] = []
  for (const persona of personas) {
    if (budget.used >= budget.max) break
    const acct = await createQaAccount(`syn-${persona.id}`)
    try {
      const curriculum = (await api(acct.cookie, `/api/curriculum?subject=${LAUNCH_SUBJECT}`)).lessons ?? []
      for (const topic of topics) {
        if (budget.used >= budget.max) break
        console.log(`\n### ${persona.id} — ${topic}`)
        lessons.push(await studyTopic(acct, persona, topic, curriculum, maxTurns, pauseMs, budget))
      }
    } finally {
      if (process.env.RUNNER_KEEP_ACCOUNTS === '1') accounts.push({ persona: persona.id, deleted: false, reloginBlocked: false })
      else accounts.push({ persona: persona.id, ...(await deleteQaAccount(acct)) })
    }
  }

  const run: RunFile = {
    version: 1, base: BASE, gitSha, startedAt, finishedAt: new Date().toISOString(),
    launchSet: topics, personas: personas.map((p) => p.id), maxTurns, totalTurns: budget.used, lessons, accounts,
  }
  const out = process.env.QA_OUT ?? `synthetic-run-${startedAt.replace(/[:.]/g, '-')}.json`
  writeFileSync(out, JSON.stringify(run, null, 2))
  // Readiness needs three runs; a single run's card says so rather than calling a topic ready.
  const card = renderScorecardMarkdown(buildScorecard([run]), run.personas)
  if (process.env.QA_SCORECARD) writeFileSync(process.env.QA_SCORECARD, card)
  console.log(`\nturns=${budget.used} run=${out}\n\n${card}`)
  console.log(`\naccounts: ${JSON.stringify(accounts)}`)
}

if (process.argv[1] && process.argv[1].endsWith('run.ts')) {
  main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
}
