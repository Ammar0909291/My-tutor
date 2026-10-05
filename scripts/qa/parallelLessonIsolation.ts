/**
 * PHYS-018 reproduction — two lessons driven AT THE SAME TIME on one disposable
 * account. Records which session each worker got and whether any card served to
 * one lesson is an authored probe of the OTHER lesson's concept.
 *
 *   QA_TABS=0 npx tsx scripts/qa/parallelLessonIsolation.ts   # no tabId (the QA driver's shape)
 *   QA_TABS=1 npx tsx scripts/qa/parallelLessonIsolation.ts   # distinct tabIds (a real browser's shape)
 *
 * Small on purpose: 2 lessons x (open + 2 acks + 3 quiz requests). Deletes the account.
 */
import { readdirSync } from 'fs'
import path from 'path'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, figureLabel } from './liveSession'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'

const SUBJECT = 'physics'
const TABS = process.env.QA_TABS === '1'
const ORDERS = (process.env.QA_ORDERS ?? '2,4').split(',').map(Number)
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()

async function probeOwners(): Promise<Map<string, string>> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const out = new Map<string, string>()
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const v of Object.values(mod)) {
      if (!Array.isArray(v)) continue
      for (const p of v as Array<{ stem?: string; conceptId?: string; subjectSlug?: string; choices?: unknown[] }>) {
        if (!p || typeof p.stem !== 'string' || p.subjectSlug !== SUBJECT || !p.conceptId) continue
        out.set(norm(stripAuthoringLabel(p.stem)), p.conceptId)
        const served = Array.isArray(p.choices) ? probeToMcq({ stem: p.stem, choices: p.choices as never, conceptId: p.conceptId }) : null
        if (served) out.set(norm(served.question), p.conceptId)
      }
    }
  }
  return out
}

let acct: QaAccount | null = null
async function main() {
  const owners = await probeOwners()
  acct = await createQaAccount(TABS ? 'iso-tabs' : 'iso-notab')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning this subject.' }),
  })
  console.log(`onboarding: ${ob.status}  mode: ${TABS ? 'distinct tabIds' : 'no tabId'}`)
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const picked = ORDERS.map((o) => lessons.find((l) => l.order === o)!).filter(Boolean)
  const results = await Promise.all(picked.map(async (l, i) => {
    const sid = await createSession(cookie, SUBJECT, TABS ? `qa-tab-${i}-${Date.now()}` : undefined)
    await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    const cards: Array<{ q: string; owner: string | null }> = []
    const figures: string[] = []
    for (const m of ['ok, continue', 'ok', 'quiz me', 'quiz me', 'quiz me']) {
      const p = await say(cookie, sid, m)
      const fig = figureLabel(p); if (fig) figures.push(fig)
      if (p.mcq) cards.push({ q: p.mcq.question.slice(0, 90), owner: owners.get(norm(p.mcq.question)) ?? null })
    }
    return { lesson: l.topicSlug, order: l.order, sid, cards, figures }
  }))
  const sameSession = new Set(results.map((r) => r.sid)).size < results.length
  let foreign = 0
  for (const r of results) {
    const f = r.cards.filter((c) => c.owner && c.owner !== r.lesson)
    foreign += f.length
    console.log(JSON.stringify({ lesson: r.lesson, sid: r.sid.slice(-8), cards: r.cards, foreignCards: f.length, figures: r.figures }))
  }
  console.log(JSON.stringify({ mode: TABS ? 'tabs' : 'no-tab', sameSession, foreignCards: foreign }))
}

for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) await deleteQaAccount(acct); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
