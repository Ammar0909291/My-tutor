/**
 * LEARNER-INTENT INTERPRETER — controlled A/B against the DEPLOYED app.
 *
 * A = the existing tutor. B = the same tutor + the experimental AI intent
 * interpreter (src/lib/teaching/learnerIntentInterpreter.ts), selected per
 * request by the `x-exp-intent-interpreter: 1` header. The header is inert
 * unless the account's own DB row has `modelOverrideAllowed = true` — the
 * same gate the provider-certification A/B uses — so both arms' disposable
 * accounts get that flag (set by the operator via SQL between `create` and
 * `run`), and BOTH arms are pinned to the same provider (`x-cert-provider:
 * groq`) so the only intended difference is the intent header.
 *
 * Every account is a fresh `qa-intentab-*@mytutor-qa.invalid` learner (never a
 * real learner record), and `cleanup` deletes them through the app's own
 * delete-account endpoint.
 *
 * Usage (three phases, so the operator can set the DB flag in between):
 *   npx tsx scripts/qa/intentInterpreterAb.ts create  <outDir> [reps]
 *   npx tsx scripts/qa/intentInterpreterAb.ts run     <outDir>
 *   npx tsx scripts/qa/intentInterpreterAb.ts cleanup <outDir>
 */
import { writeFileSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { BASE, createQaAccount, login, deleteQaAccount, type QaAccount } from './liveAccount'

interface Scenario {
  id: string
  subject: string
  topicSlug: string
  /** Fixed learner script, identical for A and B. `null` = answer the on-screen MCQ (option cycling) or say "ok". */
  script: (string | null)[]
  /** Evidence the follow-up was actually answered, per follow-up turn index. */
  answered: RegExp[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 'topos', subject: 'mathematics', topicSlug: 'math.cat.topos',
    script: [
      'ok, continue',
      'Give me a concrete non-Set example of a topos, like sheaves on a topological space.',
      'I mean specifically sheaves on a topological space X — show me how Sh(X) is a topos and what its subobject classifier is.',
      null,
      'ok, continue',
    ],
    answered: [/she(af|aves)/i, /subobject classifier|open (sub)?sets?|Ω|Omega/i],
  },
  {
    id: 'perturbation', subject: 'physics', topicSlug: 'phys.qm.perturbation-theory',
    script: [
      'ok, continue',
      "Give me the second-order energy correction and explain why it's negative for the ground state.",
      "Please write out E_n^(2) explicitly and show why every term is negative when n is the ground state.",
      null,
      'ok, continue',
    ],
    answered: [/second[- ]order|E_?n?\^?\(?2\)?|E\^\{\(2\)\}|\(2\)/i, /denominator|E_0\s*-\s*E_|E_n\s*-\s*E_m|lowest|below/i],
  },
  {
    id: 'pericyclic', subject: 'chemistry', topicSlug: 'chem.org.pericyclic',
    script: [
      'ok, continue',
      'Why does an electrocyclic ring closure switch from conrotatory to disrotatory when you go from thermal to photochemical conditions?',
      'I still want the thermal → photochemical switch: which orbital becomes the HOMO under light, and how does that flip the rotation?',
      null,
      'ok, continue',
    ],
    answered: [/disrotatory|conrotatory/i, /HOMO|excited|LUMO|ψ|psi/i],
  },
  {
    id: 'random-graph', subject: 'mathematics', topicSlug: 'math.graph.random-graph',
    script: [
      'ok, continue',
      'What happens right at the connectivity threshold p = log(n)/n — why is the last obstruction to connectivity an isolated vertex?',
      'Specifically: what is the expected number of isolated vertices at p = (log n + c)/n, and what distribution does it follow?',
      null,
      'ok, continue',
    ],
    answered: [/isolated/i, /e\^\{?-c|e\^-c|Poisson/i],
  },
  {
    id: 'organometallic', subject: 'chemistry', topicSlug: 'chem.dblock.organometallics',
    script: [
      'ok, continue',
      "Can you tell me about Vaska's complex as an example?",
      "Wait, isn't Vaska's complex iridium, not rhodium?",
      null,
      'ok, continue',
    ],
    answered: [/Vaska/i, /iridium|\bIr\b/i],
  },
  {
    id: 'dark-matter', subject: 'physics', topicSlug: 'phys.astro.dark-matter',
    script: [
      'ok, continue',
      'How does the Bullet Cluster separate dark matter from the baryonic gas, and why is that hard for modified gravity to explain?',
      'And what do the CMB acoustic peaks and supernova data say about the dark-energy equation of state w — is it consistent with w = -1?',
      null,
      'ok, continue',
    ],
    answered: [/Bullet|lensing/i, /w\s*=\s*-\s*1|w ≈ -1|equation of state|cosmological constant/i],
  },
]

interface Payload {
  text?: string
  provider?: string | null
  mastery?: Record<string, unknown> | null
  mcq?: { question: string; options: string[] } | null
  lessonComplete?: unknown
  intentExperiment?: { result: unknown; injected: boolean } | null
  visual?: unknown; visualSpec?: unknown; sceneSpec?: unknown
  [k: string]: unknown
}

interface Arm { scenario: string; arm: 'A' | 'B'; rep: number; account: QaAccount; extra?: boolean }

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown, headers?: Record<string, string>): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: { ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}), cookie, ...headers },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  const text = await r.text()
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${text.slice(0, 300)}`)
  return JSON.parse(text) as Payload
}

async function create(outDir: string, reps: number) {
  // One account per arm per rep, reused across the six scenarios (six
  // DIFFERENT concepts, so no scenario inherits another's topic progress;
  // any cross-concept profile effect is symmetric between A and B).
  // `/api/auth/register` allows 5 per 15 min per IP, so this resumes from
  // accounts.json rather than starting over.
  mkdirSync(outDir, { recursive: true })
  const file = join(outDir, 'accounts.json')
  let arms: Arm[] = []
  try { arms = JSON.parse(readFileSync(file, 'utf8')) as Arm[] } catch { /* fresh */ }
  for (let rep = 1; rep <= reps; rep++) {
    for (const arm of ['A', 'B'] as const) {
      if (arms.some((a) => a.arm === arm && a.rep === rep)) continue
      const account = await createQaAccount(`intentab-${arm}${rep}`.toLowerCase())
      await api(account.cookie, 'POST', '/api/onboarding', {
        userType: 'GENERAL_LEARNER', subjectSlugs: ['mathematics', 'physics', 'chemistry'],
        currentLevel: 'advanced', selfDescription: 'University student revising advanced topics in depth.',
        voiceChoice: 'default', teachingLanguage: 'en',
      })
      arms.push({ scenario: '*', arm, rep, account })
      writeFileSync(file, JSON.stringify(arms, null, 2))
      console.log(`created ${account.email}`)
    }
  }
}

function trigramJaccard(a: string, b: string): number {
  const grams = (s: string) => {
    const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
    const g = new Set<string>()
    for (let i = 0; i + 2 < w.length; i++) g.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`)
    return g
  }
  const A = grams(a); const B = grams(b)
  if (A.size === 0 || B.size === 0) return 0
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  return inter / (A.size + B.size - inter)
}

async function runArm(a: Arm) {
  const s = SCENARIOS.find((x) => x.id === a.scenario)!
  const cookie = await login(a.account.email, a.account.password)
  const headers: Record<string, string> = { 'x-cert-provider': 'groq' }
  if (a.arm === 'B') headers['x-exp-intent-interpreter'] = '1'
  const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${s.subject}`)) as unknown as {
    lessons: { topicSlug: string; order: number; lessonTitle: string; unitTitle: string }[]
  }
  const lesson = cur.lessons.find((l) => l.topicSlug === s.topicSlug)
  if (!lesson) throw new Error(`${s.topicSlug} not in ${s.subject} curriculum`)
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: s.subject })
  const sessionId = (session.data as { id: string }).id
  const turns: { sent: string; ms: number; payload: Payload }[] = []
  try {
    let t0 = Date.now()
    let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: cur.lessons.length,
      completedLessons: [], teachingLanguage: 'en',
    })
    turns.push({ sent: '(lesson-init)', ms: Date.now() - t0, payload: last })
    let optIdx = 0
    for (const line of s.script) {
      const msg = line ?? (last.mcq ? last.mcq.options[optIdx++ % last.mcq.options.length] : 'ok')
      t0 = Date.now()
      let p: Payload
      try {
        p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg }, headers)
      } catch (e) {
        await new Promise((r) => setTimeout(r, 3000))
        try { p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg }, headers) } catch (e2) {
          p = { error: String((e2 as Error).message) } as Payload
        }
      }
      turns.push({ sent: msg, ms: Date.now() - t0, payload: p })
      last = p
    }
  } finally {
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
  // Follow-up turns are script indices 1 and 2 -> turns[2], turns[3] (turns[0] is lesson-init).
  const fu = [turns[2], turns[3]]
  const answered = fu.map((t, i) => s.answered[i].test(t?.payload.text ?? ''))
  const repeatSim = trigramJaccard(turns[3]?.payload.text ?? '', turns[2]?.payload.text ?? '')
  const repeatPrevSim = trigramJaccard(turns[2]?.payload.text ?? '', turns[1]?.payload.text ?? '')
  return {
    scenario: a.scenario, arm: a.arm, rep: a.rep, account: a.account.email, sessionId,
    answered, repeatSim: Number(repeatSim.toFixed(3)), repeatPrevSim: Number(repeatPrevSim.toFixed(3)),
    followUpEndsWithQuestion: fu.map((t) => /\?\s*$/.test((t?.payload.text ?? '').trim())),
    mcqOnFollowUp: fu.map((t) => Boolean(t?.payload.mcq)),
    intent: turns.map((t) => t.payload.intentExperiment ?? null),
    providers: turns.map((t) => t.payload.provider ?? null),
    latencyMs: turns.map((t) => t.ms),
    mastery: turns.map((t) => t.payload.mastery ?? null),
    lessonComplete: turns.some((t) => Boolean(t.payload.lessonComplete)),
    errors: turns.filter((t) => 'error' in t.payload).map((t) => t.payload.error),
    turns: turns.map((t) => ({ sent: t.sent, ms: t.ms, text: t.payload.text, mcq: t.payload.mcq ?? null, mastery: t.payload.mastery ?? null, intentExperiment: t.payload.intentExperiment ?? null, provider: t.payload.provider })),
  }
}

async function run(outDir: string, only?: string) {
  const arms = (JSON.parse(readFileSync(join(outDir, 'accounts.json'), 'utf8')) as Arm[]).filter((a) => !a.extra)
  const resFile = join(outDir, 'results.json')
  let results: Record<string, unknown>[] = []
  try { results = JSON.parse(readFileSync(resFile, 'utf8')) } catch { /* fresh */ }
  const reps = [...new Set(arms.map((a) => a.rep))].sort()
  // A and B of the same scenario+rep run CONCURRENTLY, so both arms meet the
  // same provider conditions; pairs run one after another.
  for (const s of SCENARIOS) {
    if (only && s.id !== only) continue
    for (const rep of reps) {
      if (results.some((r) => r.scenario === s.id && r.rep === rep && !r.fatal)) continue
      results = results.filter((r) => !(r.scenario === s.id && r.rep === rep))
      console.log(`=== ${s.id} #${rep} ===`)
      const pair = arms.filter((a) => a.rep === rep).map((a) => ({ ...a, scenario: s.id }))
      const out = await Promise.all(pair.map((a) => runArm(a).catch((e) => ({ scenario: a.scenario, arm: a.arm, rep: a.rep, fatal: String(e) }))))
      for (const r of out) {
        const x = r as Record<string, unknown>
        results.push(x)
        console.log(`  ${x.arm}: answered=${JSON.stringify(x.answered)} repeatSim=${x.repeatSim} lat=${JSON.stringify(x.latencyMs)} ${x.fatal ?? ''}`)
      }
      writeFileSync(resFile, JSON.stringify(results, null, 2))
    }
  }
}

async function cleanup(outDir: string) {
  const arms = JSON.parse(readFileSync(join(outDir, 'accounts.json'), 'utf8')) as Arm[]
  for (const a of arms) {
    try {
      const cookie = await login(a.account.email, a.account.password)
      const r = await deleteQaAccount({ ...a.account, cookie })
      console.log(`${a.account.email}: ${JSON.stringify(r)}`)
    } catch (e) {
      console.log(`${a.account.email}: cleanup failed ${(e as Error).message}`)
    }
  }
}

const [, , cmd, outDir, reps] = process.argv // `run <outDir> [scenarioId]`
if (!cmd || !outDir) throw new Error('usage: create|run|cleanup <outDir> [reps]')
;(cmd === 'create' ? create(outDir, Number(reps ?? 2)) : cmd === 'run' ? run(outDir, reps) : cleanup(outDir))
  .catch((e) => { console.error('FATAL', e); process.exit(1) })
