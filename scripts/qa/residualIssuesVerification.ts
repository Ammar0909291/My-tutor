/**
 * PRODUCTION VERIFICATION for commit baf92f8's three residual fixes.
 * Exactly the 4 items specified:
 *   1. bare confirmation
 *   2. "A because..." typed MCQ
 *   3. figure attached without adequate visual explanation (verify backstop)
 *   4. figure already properly explained (verify no duplicate boilerplate)
 * Reads and reports. Does not assert.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'
import fs from 'fs'

function record(rows: Record<string, unknown>[], tag: string, said: string, p: TurnPayload) {
  const text = (p.text ?? '').replace(/\s+/g, ' ')
  const row = { tag, said, provider: p.provider ?? null, figure: carriesFigure(p), mcq: p.mcq ? true : false, mastery: p.mastery ?? null, text }
  rows.push(row)
  console.log(`\n[${tag}] > ${said}`)
  console.log(`  provider=${row.provider} figure=${row.figure} mcq=${row.mcq} mastery=${JSON.stringify(row.mastery)}`)
  console.log(`  ${text}`)
  return p
}

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const rows: Record<string, unknown>[] = []

  // ── ENGLISH LESSON: items 1, 2 ───────────────────────────────────────────
  {
    const subject = 'english'
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const l = lessons.find((x) => x.topicSlug === 'eng.grammar.active-and-passive-voice') ?? lessons[0]
    const sessionId = await createSession(cookie, subject)
    record(rows, 'open', '(open lesson)', await openLesson(cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: lessons.length,
    }))

    // item 1: bare confirmation, repeated a few times to try to reach the
    // narrow no-grade/no-MCQ branch.
    for (const msg of ['yes', 'ok', 'got it', 'okay']) {
      record(rows, `item1-bare-ack:${msg}`, msg, await say(cookie, sessionId, msg))
    }

    // Push toward an MCQ so item 2 has something to answer.
    record(rows, 'ask-for-practice', 'Can you give me a practice question on this?',
      await say(cookie, sessionId, 'Can you give me a practice question on this?'))

    // item 2: "A because <reason>" — the exact form that previously failed.
    const r2 = record(rows, 'item2-a-because', 'A because that changes the subject and object',
      await say(cookie, sessionId, 'A because that changes the subject and object'))
    console.log(`  [item2] server-confirmed grade present: ${/right|correct|not quite/i.test(r2.text ?? '')}`)
  }

  // ── PHYSICS LESSON: items 3, 4 ───────────────────────────────────────────
  {
    const subject = 'physics'
    const slug = 'phys.mech.newtons-first-law'
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const l = lessons.find((x) => x.topicSlug === slug) ?? lessons[0]
    const sessionId = await createSession(cookie, subject)
    record(rows, 'physics-open', '(open lesson)', await openLesson(cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: lessons.length,
    }))

    const r34 = record(rows, 'item3-4-visual-request', 'Can you show me a diagram of this?',
      await say(cookie, sessionId, 'Can you show me a diagram of this?'))
    console.log(`  [item3/4] figure attached: ${carriesFigure(r34)}`)
  }

  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/residual-issues-verification.json', JSON.stringify(rows, null, 2))
  console.log('\n=== done ===')
}
main().catch((e) => { console.error(e); process.exit(1) })
