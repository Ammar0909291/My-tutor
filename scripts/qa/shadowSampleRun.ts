/**
 * LIVE — sample graded turns for turn-assembly SHADOW (spec §7 gate), on a
 * disposable account. Opens a few non-first lessons in one subject, asks for
 * quizzes and answers them from the authored key, alternating right and wrong,
 * then deletes the account. Every graded turn produces one [assembled-turn]
 * line in the Vercel logs; this script never reads or changes a real account.
 *
 * Bounded on purpose: each graded turn costs two provider calls (the reply and
 * the shadow slot call), plus up to one regeneration.
 *
 *   QA_SUBJECT=chemistry QA_LESSONS=4 QA_QUIZZES=4 npx tsx scripts/qa/shadowSampleRun.ts
 *   QA_SUBJECT=physics QA_OPEN_ONLY=1 QA_LESSONS=20 npx tsx scripts/qa/shadowSampleRun.ts   # openings only
 *   QA_SUBJECT=physics QA_ALL_RIGHT=1 QA_QUIZZES=8 npx tsx scripts/qa/shadowSampleRun.ts       # run lessons to completion
 *   QA_SUBJECT=physics QA_ASK=1 QA_LESSONS=3 QA_ASKS=4 npx tsx scripts/qa/shadowSampleRun.ts  # learner questions
 */
import { readdirSync } from 'fs'
import path from 'path'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

type SeedProbe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
const optionsKey = (options: string[]) => 'opts:' + options.map(norm).sort().join('|')

const SUBJECT = process.env.QA_SUBJECT ?? 'chemistry'
// QA_OPEN_ONLY=1: open lessons and stop (one [assembled-open] line each, one
// model call each); no quizzes. Openings are cheap, so more are allowed.
const OPEN_ONLY = process.env.QA_OPEN_ONLY === '1'
// QA_ASK=1: after opening, ask the tutor QA_ASKS questions (one
// [assembled-question] line each when no card is on screen); no quizzes.
const ASK = process.env.QA_ASK === '1'
const ASKS = Math.min(8, Number(process.env.QA_ASKS ?? 4))
const LEARNER_QUESTIONS = [
  'why does that happen?',
  'can you explain that part again in a different way?',
  'what is an everyday example of this?',
  'how is this different from what we did before?',
  'what is the most common mistake people make with this?',
  'why does that rule work?',
  'where would I actually use this?',
  'what happens if one of the quantities is zero?',
]
const LESSONS = Math.min(OPEN_ONLY ? 25 : 6, Number(process.env.QA_LESSONS ?? 4))
// QA_ALL_RIGHT=1: answer every card correctly, so each lesson runs to its
// completing turn (one [assembled-turn] line with completion: true).
const ALL_RIGHT = process.env.QA_ALL_RIGHT === '1'
const QUIZZES = Math.min(ALL_RIGHT ? 10 : 6, Number(process.env.QA_QUIZZES ?? 4))
// Skip lesson one (its own locked protocol) and start a little way in.
const START = Number(process.env.QA_START ?? 2)
// Stop asking for new quizzes after this long, so the run ends — and deletes its
// account — before any outer timeout kills it. A killed run (2026-10-02,
// English, outer `timeout 590`) skipped the `finally` and left its account behind.
const BUDGET_MS = Number(process.env.QA_BUDGET_MS ?? 7 * 60_000)
const startedAt = Date.now()
const overBudget = () => Date.now() - startedAt > BUDGET_MS

async function authoredProbes(): Promise<Map<string, SeedProbe>> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const out = new Map<string, SeedProbe>()
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const value of Object.values(mod)) {
      // Any exported array of probes, whatever its name: English's adult-band
      // probes are exported as ENGLISH_ADULT_BAND_BATCH_1, which a `*PROBES`
      // name filter skipped, leaving those cards unmatched.
      if (!Array.isArray(value)) continue
      for (const p of value as SeedProbe[]) {
        if (!p || typeof p.stem !== 'string' || !Array.isArray(p.choices)) continue
        if (p.subjectSlug !== SUBJECT || (p.choices?.length ?? 0) < 2) continue
        out.set(norm(stripAuthoringLabel(p.stem)), p)
        // Key on the question as SERVED too: probeToMcq reshapes some stems
        // (English quoting), and 19 of 27 English cards missed the raw-stem key.
        const served = probeToMcq({ stem: p.stem, choices: p.choices as never, conceptId: p.conceptId })
        if (served) {
          out.set(norm(served.question), p)
          // And on the option set, when the stem was reshaped past recognition:
          // options are served verbatim, only reordered.
          out.set(optionsKey(served.options), p)
        }
      }
    }
  }
  return out
}

function answer(q: NonNullable<TurnPayload['mcq']>, authored: Map<string, SeedProbe>, right: boolean): string | null {
  const probe = authored.get(norm(q.question)) ?? authored.get(optionsKey(q.options))
  if (!probe) {
    console.log(`unmatched card: ${JSON.stringify({ question: q.question.slice(0, 160), options: q.options })}`)
    return null
  }
  const expected = probeToMcq({ stem: probe.stem, choices: probe.choices as never, conceptId: probe.conceptId })
  if (!expected) return null
  const correct = expected.options[expected.correctIndex]
  return right ? correct : (q.options.find((o) => o !== correct) ?? null)
}

let acct: QaAccount | null = null

async function main() {
  const authored = await authoredProbes()
  acct = await createQaAccount('shadow-sample')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning this subject.' }),
  })
  console.log(`onboarding ${SUBJECT}: ${ob.status}`)
  const cur = await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })
  const lessons = ((await cur.json()) as { lessons?: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons ?? []
  let graded = 0
  let unauthored = 0
  let completed = 0
  let right = true
  for (const l of lessons.slice(START, START + LESSONS)) {
    if (overBudget()) { console.log('time budget reached — stopping'); break }
    const sid = await createSession(cookie, SUBJECT)
    await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    if (OPEN_ONLY) { console.log(`${l.topicSlug}: opened`); continue }
    if (ASK) {
      for (const q of LEARNER_QUESTIONS.slice(0, ASKS)) { if (overBudget()) break; await say(cookie, sid, q) }
      console.log(`${l.topicSlug}: asked ${ASKS}`)
      continue
    }
    for (const m of ['ok, continue', 'ok']) await say(cookie, sid, m)
    let done = 0
    for (let tries = 0; tries < QUIZZES * 3 && done < QUIZZES && !overBudget(); tries++) {
      const p = await say(cookie, sid, 'quiz me')
      if (!p.mcq) continue
      const pick = answer(p.mcq, authored, right)
      if (!pick) { unauthored++; await say(cookie, sid, p.mcq.options[0]); continue }
      const r = await say(cookie, sid, pick)
      graded++; done++; right = ALL_RIGHT ? true : !right
      if (r.lessonComplete?.complete) { completed++; break }
    }
    console.log(`${l.topicSlug}: ${done} graded`)
  }
  console.log(JSON.stringify({ subject: SUBJECT, graded, unauthored, completed }))
}

// A kill still deletes the account: SIGTERM/SIGINT run the same cleanup.
for (const sig of ['SIGTERM', 'SIGINT'] as const) {
  process.on(sig, async () => {
    if (acct) console.log(`${sig}: deleting disposable account:`, JSON.stringify(await deleteQaAccount(acct)))
    process.exit(130)
  })
}

main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
