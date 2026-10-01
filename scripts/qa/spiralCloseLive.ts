/**
 * LIVE — RC-C, the lesson-one spiral-close deadlock, on a disposable account.
 *
 * Lesson one has an affect budget of 1, so one graded miss closes the episode
 * as a spiral. Before fda2f132 every later "quiz me" was refused, and the
 * lesson could not be finished. This drives the real deployed app:
 *   warm-up → "quiz me" → answer WRONG → "quiz me" (must get an authored quiz)
 *   → answer RIGHT (the episode reopens; read it from learn_sessions).
 *
 * A throwaway qa-* account is created and deleted at the end. Prints the
 * session id so the episode can be checked read-only in the database.
 *
 *   npx tsx scripts/qa/spiralCloseLive.ts
 */
import { readdirSync } from 'fs'
import path from 'path'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

type SeedProbe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
const short = (s: string | undefined, n = 160) => (s ?? '').replace(/\s+/g, ' ').slice(0, n)

async function physicsProbes(): Promise<Map<string, SeedProbe>> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const out = new Map<string, SeedProbe>()
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value) || !name.endsWith('PROBES')) continue
      for (const p of value as SeedProbe[]) if (p.subjectSlug === 'physics' && (p.choices?.length ?? 0) >= 2) out.set(norm(stripAuthoringLabel(p.stem)), p)
    }
  }
  return out
}

/** The served option that is right (or wrong) by the authored key. */
function pick(q: NonNullable<TurnPayload['mcq']>, authored: Map<string, SeedProbe>, right: boolean): string | null {
  const probe = authored.get(norm(q.question))
  if (!probe) return null
  const expected = probeToMcq({ stem: probe.stem, choices: probe.choices as never, conceptId: probe.conceptId })!
  const correct = expected.options[expected.correctIndex]
  return right ? correct : (q.options.find((o) => o !== correct) ?? null)
}

let acct: QaAccount | null = null

async function main() {
  const authored = await physicsProbes()
  acct = await createQaAccount('spiral-close')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: 'physics', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am new to physics.' }),
  })
  console.log(`onboarding: ${ob.status}`)
  const cur = await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie } })
  const lessons = ((await cur.json()) as { lessons?: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons ?? []
  const l = lessons[0]
  const sid = await createSession(cookie, 'physics')
  console.log(`lesson one: ${l.topicSlug}; session ${sid}`)
  await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })

  const log = (tag: string, msg: string, p: TurnPayload) =>
    console.log(`[${tag}] > ${short(msg, 60)}\n      phase=${p.mastery?.phase ?? '-'} quiz=${p.mcq ? JSON.stringify(p.mcq.options) : 'none'}\n      ${short(p.text, 200)}`)

  for (const m of ["ok, let's start", 'ok, continue', 'ok']) log('warm', m, await say(cookie, sid, m))

  let p: TurnPayload | null = null
  for (let i = 0; i < 6 && !p?.mcq; i++) { p = await say(cookie, sid, 'quiz me'); log('ask', 'quiz me', p) }
  if (!p?.mcq) throw new Error('no quiz before the miss — cannot set up the spiral')
  const wrong = pick(p.mcq, authored, false)
  if (!wrong) throw new Error('first quiz is not authored')
  log('miss', wrong, await say(cookie, sid, wrong))

  const after = await say(cookie, sid, 'quiz me')
  log('after-miss', 'quiz me', after)
  const served = after.mcq !== null && after.mcq !== undefined
  let reopened: string | null = null
  if (after.mcq) {
    const right = pick(after.mcq, authored, true)
    if (right) { const r = await say(cookie, sid, right); log('right', right, r); reopened = r.mastery?.phase ?? null }
  }
  console.log('\n' + JSON.stringify({ session: sid, quizServedAfterSpiral: served, phaseAfterRightAnswer: reopened }, null, 2))
  // Time to read the episode from learn_sessions (read-only) before deletion.
  const hold = Number(process.env.QA_HOLD_MS ?? 0)
  if (hold > 0) { console.log(`holding ${hold} ms before deleting the account`); await new Promise((r) => setTimeout(r, hold)) }
}

main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
