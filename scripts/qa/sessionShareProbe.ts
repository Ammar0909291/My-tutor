/**
 * CHEM-148 / CHEM-130 reproduction: the QA driver's shape — for each lesson in
 * turn, POST /api/sessions then lesson-init (sequential), THEN interleave chat
 * turns across all of them. Run with and without a tabId. Disposable account,
 * deleted afterwards.
 *
 *   QA_TABS=0 QA_SUBJECT=chemistry QA_ORDERS=3,5,8 npx tsx scripts/qa/sessionShareProbe.ts
 */
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, figureLabel } from './liveSession'

const SUBJECT = process.env.QA_SUBJECT ?? 'chemistry'
const TABS = process.env.QA_TABS === '1'
const ORDERS = (process.env.QA_ORDERS ?? '3,5,8').split(',').map(Number)
const BEATS = (process.env.QA_BEATS ?? 'ok|give me example|quiz me').split('|')

let acct: QaAccount | null = null
async function main() {
  acct = await createQaAccount(TABS ? 'share-tabs' : 'share-notab')
  const cookie = acct.cookie
  await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning.' }),
  })
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const open: Array<{ order: number; slug: string; title: string; sid: string; openFig: string | null }> = []
  for (const o of ORDERS) {
    const l = lessons.find((x) => x.order === o)!
    const sid = await createSession(cookie, SUBJECT, TABS ? `tab-${o}-${Date.now()}` : undefined)
    const p = await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    open.push({ order: o, slug: l.topicSlug, title: l.lessonTitle, sid, openFig: figureLabel(p) })
  }
  console.log(JSON.stringify({ mode: TABS ? 'tabs' : 'no-tab', distinctSessions: new Set(open.map((x) => x.sid)).size, of: open.length }))
  for (const beat of BEATS) {
    await Promise.all(open.map(async (x) => {
      const p = await say(cookie, x.sid, beat)
      const t = String(p.text ?? '')
      const covers = t.match(/([A-Z][^\n.]{3,80}) covers:/)?.[1] ?? null
      console.log(JSON.stringify({ lesson: x.order, slug: x.slug, beat, sid: x.sid.slice(-6), fig: figureLabel(p), covers, mcq: p.mcq?.question.slice(0, 70) ?? null, head: t.replace(/\s+/g, ' ').slice(0, 160) }))
    }))
  }
}
for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) await deleteQaAccount(acct); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
