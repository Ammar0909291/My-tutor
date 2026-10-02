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
 */
import { readdirSync } from 'fs'
import path from 'path'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

type SeedProbe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()

const SUBJECT = process.env.QA_SUBJECT ?? 'chemistry'
const LESSONS = Math.min(6, Number(process.env.QA_LESSONS ?? 4))
const QUIZZES = Math.min(6, Number(process.env.QA_QUIZZES ?? 4))
// Skip lesson one (its own locked protocol) and start a little way in.
const START = Number(process.env.QA_START ?? 2)

async function authoredProbes(): Promise<Map<string, SeedProbe>> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const out = new Map<string, SeedProbe>()
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value) || !name.endsWith('PROBES')) continue
      for (const p of value as SeedProbe[]) {
        if (p.subjectSlug !== SUBJECT || (p.choices?.length ?? 0) < 2) continue
        out.set(norm(stripAuthoringLabel(p.stem)), p)
        // Key on the question as SERVED too: probeToMcq reshapes some stems
        // (English quoting), and 19 of 27 English cards missed the raw-stem key.
        const served = probeToMcq({ stem: p.stem, choices: p.choices as never, conceptId: p.conceptId })
        if (served) out.set(norm(served.question), p)
      }
    }
  }
  return out
}

function answer(q: NonNullable<TurnPayload['mcq']>, authored: Map<string, SeedProbe>, right: boolean): string | null {
  const probe = authored.get(norm(q.question))
  if (!probe) return null
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
  let right = true
  for (const l of lessons.slice(START, START + LESSONS)) {
    const sid = await createSession(cookie, SUBJECT)
    await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    for (const m of ['ok, continue', 'ok']) await say(cookie, sid, m)
    let done = 0
    for (let tries = 0; tries < QUIZZES * 3 && done < QUIZZES; tries++) {
      const p = await say(cookie, sid, 'quiz me')
      if (!p.mcq) continue
      const pick = answer(p.mcq, authored, right)
      if (!pick) { unauthored++; await say(cookie, sid, p.mcq.options[0]); continue }
      const r = await say(cookie, sid, pick)
      graded++; done++; right = !right
      if (r.lessonComplete?.complete) break
    }
    console.log(`${l.topicSlug}: ${done} graded`)
  }
  console.log(JSON.stringify({ subject: SUBJECT, graded, unauthored }))
}

main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
