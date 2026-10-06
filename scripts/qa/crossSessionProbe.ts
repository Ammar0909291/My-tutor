/**
 * Targeted production verification (2026-10-06) of the cross-session fixes:
 *   B — CHEM-148/BIO-042 (server half): two tab ids → two sessions; a reload
 *       (same tab id) resumes the same session.
 *   D — the same, through the path a real concept switch takes: lesson A →
 *       answer cards → lesson B in the SAME session (Next) → back to A
 *       (Previous) → keep quizzing (QA_PARTS=D runs only this).
 *   C — CHEM-033/017, BIO-018, PHYS-007: answer cards, take a real excursion
 *       to another concept, come back, keep quizzing; an answered card must
 *       not come back. Session ids are printed so the stored ledger
 *       (contextSnapshot.teachingHistory.ledgerByConcept) can be read.
 * One disposable account, one request at a time. The account is deleted when
 * QA_GO_FILE appears (or after 20 min), so the DB can be read first.
 *
 *   QA_GO_FILE=/tmp/go npx tsx scripts/qa/crossSessionProbe.ts
 */
import { existsSync } from 'fs'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

const GO = process.env.QA_GO_FILE ?? '/tmp/claude-0/sp/go-delete'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
let acct: QaAccount | null = null

type Lesson = { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }
async function lessonsFor(subject: string): Promise<Lesson[]> {
  await fetch(`${BASE}/api/subjects/enroll`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie: acct!.cookie }, body: JSON.stringify({ subjectSlug: subject }) })
  return ((await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie: acct!.cookie } })).json()) as { lessons: Lesson[] }).lessons
}
async function open(subject: string, order: number, tab: string) {
  const ls = await lessonsFor(subject)
  const l = ls.find((x) => x.order === order)!
  const sid = await createSession(acct!.cookie, subject, tab)
  const p = await openLesson(acct!.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: ls.length })
  return { sid, slug: l.topicSlug, open: p }
}
const head = (p: TurnPayload) => String(p.text ?? '').replace(/\s+/g, ' ').slice(0, 110)

async function partB() {
  const a = await open('chemistry', 21, 'probe-tab-A')
  const b = await open('chemistry', 77, 'probe-tab-B')
  const a2 = await createSession(acct!.cookie, 'chemistry', 'probe-tab-A')
  const b2 = await createSession(acct!.cookie, 'chemistry', 'probe-tab-B')
  const ta = await say(acct!.cookie, a.sid, 'ok'); await sleep(2000)
  const tb = await say(acct!.cookie, b.sid, 'ok')
  console.log(JSON.stringify({ part: 'B', distinctSessions: a.sid !== b.sid, reloadA_sameSession: a2 === a.sid, reloadB_sameSession: b2 === b.sid, A: { slug: a.slug, head: head(ta) }, B: { slug: b.slug, head: head(tb) } }))
}

async function partC(subject: string, order: number, excursion: string) {
  const s = await open(subject, order, `probe-${subject}-${order}`)
  const answered = new Set<string>()
  const log: string[] = []
  let card = s.open.mcq ?? null
  const step = async (msg: string) => {
    await sleep(2500)
    const p = await say(acct!.cookie, s.sid, msg)
    const repeat = !!(p.mcq && answered.has(p.mcq.question))
    log.push(`${msg.slice(0, 40)} -> provider=${p.provider} card=${p.mcq ? JSON.stringify(p.mcq.question.slice(0, 70)) : 'none'}${repeat ? ' REPEAT-OF-ANSWERED' : ''} | ${head(p)}`)
    card = p.mcq ?? null
    return { p, repeat }
  }
  const answer = async () => { if (!card) return; answered.add(card.question); await step(card.options[0]) }
  let repeats = 0
  for (const m of ['quiz me']) { await step(m); await answer() }
  await step('quiz me'); await answer()
  await step(excursion)
  await step('ok, explain a bit more')
  await step('ok, go back to the lesson now')
  for (let i = 0; i < 4; i++) { const r = await step('quiz me'); if (r.repeat) repeats++; await answer() }
  console.log(JSON.stringify({ part: 'C', subject, order, slug: s.slug, sessionId: s.sid, answeredCards: answered.size, repeatsAfterReturn: repeats }))
  for (const l of log) console.log('   ' + l)
}

async function partD(subject: string, orderA: number, orderB: number) {
  const ls = await lessonsFor(subject)
  const ref = (o: number) => { const l = ls.find((x) => x.order === o)!; return { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: ls.length } }
  const sid = await createSession(acct!.cookie, subject, `probe-switch-${subject}`)
  const answered = new Set<string>()
  const log: string[] = []
  let card: TurnPayload['mcq'] = null
  const record = (tag: string, p: TurnPayload) => {
    const repeat = !!(p.mcq && answered.has(p.mcq.question))
    log.push(`${tag.slice(0, 40)} -> provider=${p.provider} card=${p.mcq ? JSON.stringify(p.mcq.question.slice(0, 70)) : 'none'}${repeat ? ' REPEAT-OF-ANSWERED' : ''} | ${head(p)}`)
    card = p.mcq ?? null
    return repeat
  }
  const step = async (msg: string) => { await sleep(2500); return record(msg, await say(acct!.cookie, sid, msg)) }
  const answer = async () => { if (!card) return false; answered.add(card.question); return step(card.options[0]) }
  record('open A', await openLesson(acct!.cookie, sid, ref(orderA)))
  for (let i = 0; i < 3; i++) { await step('quiz me'); await answer() }
  const answeredInA = answered.size
  record('open B (same session)', await openLesson(acct!.cookie, sid, ref(orderB)))
  await step('quiz me'); await answer()
  record('back to A (same session)', await openLesson(acct!.cookie, sid, ref(orderA)))
  let repeats = 0
  for (let i = 0; i < 3; i++) { if (await step('quiz me')) repeats++; if (await answer()) repeats++ }
  console.log(JSON.stringify({ part: 'D', subject, orderA, orderB, sessionId: sid, answeredInA, repeatsAfterReturn: repeats }))
  for (const l of log) console.log('   ' + l)
}

async function main() {
  acct = await createQaAccount('xsession')
  await fetch(`${BASE}/api/onboarding`, { method: 'POST', headers: { 'Content-Type': 'application/json', cookie: acct.cookie }, body: JSON.stringify({ subjectSlug: 'chemistry', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning.' }) })
  if ((process.env.QA_PARTS ?? 'BC').includes('B')) await partB()
  if ((process.env.QA_PARTS ?? 'BC').includes('C')) {
    await partC('chemistry', 151, 'wait, what is resonance? explain resonance first please')
    await partC('biology', 21, 'wait, what is DNA replication? explain that first please')
    await partC('physics', 134, 'wait, what is diffraction? explain diffraction first please')
  }
  if ((process.env.QA_PARTS ?? 'BC').includes('D')) {
    await partD('chemistry', 151, 152)
    await partD('biology', 21, 22)
    await partD('physics', 134, 135)
  }
  console.log('READY-FOR-DB-READ (touch ' + GO + ' to delete the account)')
  for (let i = 0; i < 240 && !existsSync(GO); i++) await sleep(5000)
}
for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) console.log('deleted on signal', JSON.stringify(await deleteQaAccount(acct))); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
