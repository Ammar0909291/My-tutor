/**
 * MATHEMATICS — production runtime QA as a WEAK learner, against the deployed app.
 *
 * `scripts/math/certify.ts` drives the competent path only: every served probe
 * is answered correctly, so it proves a lesson CAN close, never that it closes
 * for a learner who makes a mistake. This harness drives the other paths —
 * a misconception answer, a plain wrong answer, confusion, a mid-lesson
 * question, an answer typed in the learner's own words — and records whether
 * the lesson can still reach verified mastery afterwards.
 *
 * Mirrors physicsProductionRuntimeQa.ts. The answer key comes from the seed
 * corpus on disk (the same modules the bootstrap writes), projected through the
 * real probeToMcq so it matches the served answer heads; production still grades.
 *
 *   FINDING  a wrong/misconception answer that moves the mastery counters
 *            (false accept), praise of a misconception, a non-mathematics probe,
 *            a figure claimed but not sent, malformed LaTeX, an aborted run.
 *   NOTE     everything a person should read but that can be legitimate.
 *
 * Disposable account only (register -> drive -> delete via liveAccount.ts),
 * deleted at the end unless --keep (keep it to cross-check evidence in the DB).
 *
 * Run: npx tsx scripts/qa/mathematicsProductionRuntimeQa.ts [--only=<id,id>] [--keep] [--plans=wide|third]
 * Real account: QA_EMAIL=… QA_PASSWORD=… (env only; never written, never deleted)
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, login, BASE } from './liveAccount'
import { load } from '../assets/contract-audit'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { hasMalformedLatex } from '../math/certify'

interface Lesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }
interface Mastery { phase?: string; verified?: boolean; checkCorrect?: number; practiceCorrect?: number }
interface Turn {
  text?: string; provider?: string | null
  mcq?: { question: string; options: string[] } | null
  visual?: unknown; visualSpec?: unknown; sceneSpec?: unknown
  mastery?: Mastery | null
  lessonComplete?: { complete?: boolean } | null
}
type Intent = 'correct' | 'misconception' | 'wrong' | 'typed' | 'confused' | 'question' | 'unkeyed'

// ─── answer key ───────────────────────────────────────────────────────────
interface KeyEntry { conceptId: string; correct: string; misconception?: string; wrong: string[] }
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
const KEY = new Map<string, KeyEntry | null>()
async function buildKey() {
  const { probes } = (await load()) as unknown as { probes: Array<{ conceptId: string; stem: string; choices?: Array<{ text: string; isCorrect: boolean; misconceptionId?: string }> }> }
  for (const p of probes) {
    if (!p.choices) continue
    const m = probeToMcq({ stem: p.stem, choices: p.choices, conceptId: p.conceptId })
    if (!m) continue
    // probeToMcq permutes; map each served option back to its authored choice
    // by prefix (a served head is the start of its authored text).
    const authored = (opt: string) => p.choices!.find((c) => norm(c.text).startsWith(norm(opt)))
    const correct = m.options[m.correctIndex]
    const wrong = m.options.filter((_, i) => i !== m.correctIndex)
    const misconception = wrong.find((o) => authored(o)?.misconceptionId)
    const k = norm(m.question)
    const prev = KEY.get(k)
    if (prev === undefined) KEY.set(k, { conceptId: p.conceptId, correct, misconception, wrong })
    else if (prev && norm(prev.correct) !== norm(correct)) KEY.set(k, null) // ambiguous: never guess
  }
}

// ─── api ──────────────────────────────────────────────────────────────────
async function api(cookie: string, path: string, body?: unknown): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (r.status === 429 || r.status >= 500) { await new Promise((res) => setTimeout(res, 15_000 * (attempt + 1))); continue }
    if (!r.ok) throw new Error(`${path} failed ${r.status}: ${(await r.text()).slice(0, 300)}`)
    return r.json()
  }
  throw new Error(`${path} failed after retries`)
}

// ─── reporting ────────────────────────────────────────────────────────────
const findings: string[] = []
const notes: string[] = []
const finding = (f: string) => { findings.push(f); console.log(`  !! FINDING: ${f}`) }
const note = (f: string) => { notes.push(f); console.log(`  .. note: ${f}`) }
const short = (s: unknown, n = 220) => String(s ?? '').replace(/\s+/g, ' ').slice(0, n)
const carriesFigure = (t: Turn) => Boolean(t.visualSpec || t.visual || t.sceneSpec)
const claimsFigure = (s?: string) => !!s && /\b(here'?s|see|look at|shown|below is)\b.{0,40}\b(diagram|figure|graph|picture|sketch)\b/i.test(s)
const FOREIGN = /\b(photosynthesis|mitochondri|chlorophyll|noun|adjective|past tense|covalent bond|stoichiometr|newton'?s (first|second|third) law|ohm'?s law)\b/i
const counters = (m?: Mastery | null) => (m?.checkCorrect ?? 0) + (m?.practiceCorrect ?? 0)

interface Plan { conceptId: string; opener: string; answers: Intent[]; maxTurns: number }
const PLANS: Plan[] = [
  { conceptId: 'math.arith.fraction-addition', opener: 'why i cant just add the top and the bottom? 1/2 + 1/3 = 2/5 no?',
    answers: ['misconception', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.alg.linear-equation-1var', opener: 'i hate equation. what i do first, i always forget',
    answers: ['correct', 'wrong', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.geom.pythagorean-theorem', opener: 'is it a + b = c? i dont remember',
    answers: ['confused', 'typed', 'misconception', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.trig.unit-circle', opener: 'what is radian, why not just degree?',
    answers: ['question', 'correct', 'correct', 'wrong', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.calc.chain-rule', opener: 'derivative of sin(x^2) is cos(x^2) right?',
    answers: ['misconception', 'typed', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.prob.bayes-theorem', opener: 'test is 99% accurate so if positive i am 99% sick yes?',
    answers: ['correct', 'correct', 'misconception', 'correct', 'correct'], maxTurns: 18 },
]
// A second spread of lessons, different domains, for wider coverage (--plans=wide).
const WIDE_PLANS: Plan[] = [
  { conceptId: 'math.stats.standard-error', opener: 'standard error is the same as standard deviation right?',
    answers: ['misconception', 'correct', 'correct', 'wrong', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.linalg.matrix-multiplication', opener: 'can i multiply two matrices just entry by entry?',
    answers: ['misconception', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.de.separable', opener: 'how do i solve dy/dx = x/y, i dont get it',
    answers: ['confused', 'correct', 'wrong', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.func.inverse-functions', opener: 'the inverse of f is just 1/f yes?',
    answers: ['misconception', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.seq.infinite-geometric-series', opener: '1 + 1/2 + 1/4 + ... must be infinite, it has infinite terms',
    answers: ['misconception', 'correct', 'wrong', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.alg.quadratic-formula', opener: 'why is there a plus minus in the formula?',
    answers: ['question', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
]
// A third spread, six domains neither set above touches (--plans=third).
const THIRD_PLANS: Plan[] = [
  { conceptId: 'math.nt.prime-factorization', opener: '12 = 3 x 4, so that is the prime factorization right?',
    answers: ['misconception', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.disc.combinations', opener: 'choosing 2 from 5 is 5 x 4 = 20 ways no?',
    answers: ['misconception', 'correct', 'wrong', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.abst.subgroup', opener: 'any subset of a group is a subgroup?',
    answers: ['misconception', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.real.convergence-sequences', opener: 'what does converge even mean, the terms just get small?',
    answers: ['confused', 'correct', 'wrong', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.graph.tree', opener: 'is a tree just any graph with no loops?',
    answers: ['question', 'correct', 'correct', 'correct', 'correct'], maxTurns: 18 },
  { conceptId: 'math.num.newtons-method', opener: 'newton method always finds the root, right?',
    answers: ['misconception', 'correct', 'correct', 'wrong', 'correct', 'correct'], maxTurns: 18 },
]
const NUDGES = ['ok i think i get it. can you ask me a question?', 'ok give me one question please', 'yes i follow. next?']

interface AnswerRecord {
  conceptId: string; turn: number; intent: Intent; sent: string; keyed: boolean; keyConcept: string | null
  before: number; after: number; phaseBefore?: string; phaseAfter?: string; reply: string
}
const answerLog: AnswerRecord[] = []

async function drive(cookie: string, lessons: Lesson[], plan: Plan) {
  const lesson = lessons.find((l) => l.topicSlug === plan.conceptId)
  if (!lesson) { finding(`${plan.conceptId}: no curriculum lesson`); return null }
  console.log(`\n=== ${plan.conceptId} — "${lesson.lessonTitle}" ===`)
  const s = await api(cookie, '/api/sessions', { subjectSlug: 'mathematics' })
  const sessionId: string = s.data?.id ?? s.id
  let p: Turn & { activeLessonPersisted?: boolean } = await api(cookie, '/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: lessons.length,
    completedLessons: [], teachingLanguage: 'en',
  })
  // A failed pointer write means every later turn teaches the PREVIOUS lesson
  // (measured 2026-10-02: unit-circle taught as pythagorean-theorem).
  if (p.activeLessonPersisted === false) finding(`${plan.conceptId}: lesson-init could not move activeLessonSlug — the lesson will be taught as the previous one`)
  const transcript: Array<{ who: string; text: string; mcq?: Turn['mcq']; mastery?: Mastery | null }> = []
  let figureServed = false
  const check = (t: Turn, label: string) => {
    transcript.push({ who: 'tutor', text: t.text ?? '', mcq: t.mcq, mastery: t.mastery })
    if (carriesFigure(t)) figureServed = true
    if (claimsFigure(t.text) && !carriesFigure(t) && !figureServed) finding(`${plan.conceptId} ${label}: claims a figure, none sent — "${short(t.text, 120)}"`)
    if (FOREIGN.test(t.text ?? '')) finding(`${plan.conceptId} ${label}: non-math vocabulary "${(t.text ?? '').match(FOREIGN)?.[0]}"`)
    if (hasMalformedLatex(t.text ?? '')) finding(`${plan.conceptId} ${label}: malformed LaTeX — "${short(t.text, 160)}"`)
    if (t.mcq) {
      const k = KEY.get(norm(t.mcq.question))
      if (k && !k.conceptId.startsWith('math.')) finding(`${plan.conceptId} ${label}: served non-math probe ${k.conceptId}`)
      else if (k && k.conceptId !== plan.conceptId) note(`${plan.conceptId} ${label}: probe belongs to ${k.conceptId}`)
      else if (!k) note(`${plan.conceptId} ${label}: MCQ not in the authored corpus (model-authored?) at phase ${t.mastery?.phase} — "${short(t.mcq.question, 100)}"`)
    }
  }
  check(p, 'open')
  const say = async (msg: string, label: string) => {
    transcript.push({ who: 'learner', text: msg })
    const before = p
    p = await api(cookie, '/api/learn/chat', { sessionId, message: msg })
    console.log(`  [${label}] "${short(msg, 70)}" -> phase=${p.mastery?.phase} c=${p.mastery?.checkCorrect}/${p.mastery?.practiceCorrect} v=${p.mastery?.verified} mcq=${p.mcq ? 'Y' : 'n'} :: ${short(p.text, 140)}`)
    check(p, label)
    return before
  }

  await say(plan.opener, 'opener')
  let idx = 0
  let nudge = 0
  for (let turn = 2; turn <= plan.maxTurns; turn++) {
    if (p.mastery?.verified || p.lessonComplete?.complete) break
    const intent: Intent = idx < plan.answers.length ? plan.answers[idx] : 'correct'
    if (intent === 'confused') { idx++; await say('sorry i dont understand this at all. can you explain more simple?', `T${turn}-confused`); continue }
    if (intent === 'question') { idx++; await say('wait, why is it like that? where it comes from?', `T${turn}-question`); continue }
    if (!p.mcq) { await say(NUDGES[nudge++ % NUDGES.length], `T${turn}-nudge`); continue }
    const k = KEY.get(norm(p.mcq.question)) ?? null
    // A model-written question has no authored key: answer it without spending
    // a planned intent, and never call the reply correct or wrong.
    if (!k) { await say(p.mcq.options[0], `T${turn}-unkeyed`); continue }
    idx++
    let msg: string
    let effective: Intent = intent
    if (intent === 'misconception') { msg = k.misconception ?? k.wrong[0]; if (!k.misconception) effective = 'wrong' }
    else if (intent === 'wrong') msg = k.wrong[k.wrong.length - 1]
    else if (intent === 'typed') msg = `i think the answer is ${k.correct.toLowerCase()}`
    else msg = k.correct
    const b = await say(msg, `T${turn}-${effective}`)
    const rec: AnswerRecord = {
      conceptId: plan.conceptId, turn, intent: effective, sent: msg, keyed: Boolean(k), keyConcept: k?.conceptId ?? null,
      before: counters(b.mastery), after: counters(p.mastery), phaseBefore: b.mastery?.phase, phaseAfter: p.mastery?.phase,
      reply: short(p.text, 200),
    }
    answerLog.push(rec)
    const isWrong = effective === 'misconception' || effective === 'wrong'
    if (k && isWrong && rec.after > rec.before) finding(`${plan.conceptId} T${turn}: FALSE ACCEPT — ${effective} "${short(msg, 60)}" moved counters ${rec.before}->${rec.after}`)
    if (k && isWrong && /^(correct|exactly|well done|that'?s right|great job)/i.test((p.text ?? '').trim())) finding(`${plan.conceptId} T${turn}: praised a ${effective} answer — "${short(p.text, 120)}"`)
    // Only CHECK and PRACTICE answers count toward mastery; earlier phases teach.
    if (k && !isWrong && rec.after <= rec.before && /^(CHECK|PRACTICE)$/.test(rec.phaseBefore ?? '')) note(`${plan.conceptId} T${turn}: correct (${effective}) answer did not move counters (${rec.phaseBefore}->${rec.phaseAfter}) — "${short(p.text, 120)}"`)
    if (k && isWrong && !/\b(not quite|not right|incorrect|isn['’]?t (?:right|correct)|not correct|the answer is|actually)\b/i.test(p.text ?? '')) note(`${plan.conceptId} T${turn}: wrong answer got no stated verdict — "${short(p.text, 120)}"`)
  }
  const final = p.mastery
  const wrongs = answerLog.filter((a) => a.conceptId === plan.conceptId && (a.intent === 'wrong' || a.intent === 'misconception') && a.keyed).length
  if (!final?.verified) {
    (wrongs > 0 ? finding : note)(`${plan.conceptId}: verified mastery NOT reached in ${plan.maxTurns} turns after ${wrongs} keyed wrong answer(s) — phase ${final?.phase}, c=${final?.checkCorrect}/${final?.practiceCorrect}`)
  }
  return { conceptId: plan.conceptId, sessionId, final, wrongs, transcript }
}

async function main() {
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
  const keep = process.argv.includes('--keep')
  const out = process.env.QA_OUT ?? 'math-qa-run.json'
  await buildKey()
  console.log(`Mathematics weak-learner QA — BASE=${BASE}, key=${KEY.size} stems`)
  // A REAL account (owner-supplied, QA_EMAIL + QA_PASSWORD from the environment
  // only) is logged into, never deleted, and its credentials are never written.
  const realEmail = process.env.QA_EMAIL
  const realPassword = process.env.QA_PASSWORD
  const real = Boolean(realEmail && realPassword)
  const acct = real
    ? { email: realEmail!, password: '', name: 'owner account', cookie: await login(realEmail!, realPassword!) }
    : await createQaAccount('math-weak')
  if (!real && process.env.QA_CREDS) writeFileSync(process.env.QA_CREDS, JSON.stringify({ email: acct.email, password: acct.password, name: acct.name, cookie: acct.cookie }))
  console.log(`account=${acct.email}`)
  const results: unknown[] = []
  try {
    const cur = await api(acct.cookie, '/api/curriculum?subject=mathematics')
    const lessons: Lesson[] = cur.lessons ?? []
    const planSet = process.argv.includes('--plans=wide') ? WIDE_PLANS : process.argv.includes('--plans=third') ? THIRD_PLANS : PLANS
    for (const plan of planSet.filter((pl) => !only || only.split(',').includes(pl.conceptId))) {
      try { results.push(await drive(acct.cookie, lessons, plan)) } catch (e) { finding(`${plan.conceptId}: run aborted — ${(e as Error).message}`) }
    }
  } finally {
    writeFileSync(out, JSON.stringify({ account: acct.email, base: BASE, findings, notes, answerLog, results }, null, 2))
    console.log(`\nANSWERS`)
    for (const a of answerLog) console.log(`  ${a.conceptId} T${a.turn} ${a.intent.padEnd(13)} ${a.before}->${a.after} ${a.phaseBefore}->${a.phaseAfter} | ${short(a.sent, 50)}`)
    console.log(`\nFINDINGS (${findings.length})`); findings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
    console.log(`\nNOTES (${notes.length})`); notes.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
    console.log(`\nACCOUNT: ${acct.email}  transcript: ${out}`)
    if (real) console.log('real account: kept (never deleted)')
    else if (!keep) console.log(`delete: ${JSON.stringify(await deleteQaAccount(acct))}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
