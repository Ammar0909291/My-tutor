/**
 * ENG-D11 production verification: a server-graded WRONG answer must carry an
 * explicit correction naming the right option.
 *
 * Deliberately WRONG answers only. `mcqForClient` strips `correctIndex`, so the
 * driver cannot know the key — it taps EVERY option in turn across successive
 * probes and records what came back. A graded-correct tap is recognised by the
 * mastery counters advancing; a graded-wrong one is the case under test.
 *
 * Disposable account, deleted at the end.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import fs from 'fs'

const CORRECTION = /not quite\s*[—-]\s*the answer is:/i

async function main() {
  const subject = process.env.QA_SUBJECT ?? 'english'
  const slug = process.env.QA_SLUG ?? 'eng.grammar.nouns'
  const acct = await createQaAccount('engd11')
  console.log(`account ${acct.email}`)
  const rows: Record<string, unknown>[] = []
  try {
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie: acct.cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const all = curr.lessons ?? []
    const l = all.find((x) => x.topicSlug === slug) ?? all[0]
    if (!l) throw new Error('no lesson')
    const sessionId = await createSession(acct.cookie, subject)
    console.log(`session ${sessionId} lesson ${l.topicSlug} (order ${l.order})`)

    let p: TurnPayload = await openLesson(acct.cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: all.length,
    })
    const nudges = ['ok teach me', 'go on', 'i understand, quiz me', 'next', 'go on', 'quiz me', 'next', 'go on']
    let tried = 0
    for (let i = 0; i < 16 && tried < 4; i++) {
      const mcq = p.mcq
      let said: string
      if (mcq && Array.isArray(mcq.options) && mcq.options.length > 0) {
        // Tap options in rotation so at least one tap lands on a wrong option.
        said = mcq.options[tried % mcq.options.length]
        tried += 1
      } else {
        said = nudges[i % nudges.length]
      }
      const before = p
      p = await say(acct.cookie, sessionId, said)
      const text = (p.text ?? '').replace(/\s+/g, ' ')
      const wasProbe = Boolean(before.mcq)
      const row = {
        turn: i + 1, said: said.slice(0, 90), wasAnswerToProbe: wasProbe,
        check: p.mastery?.checkCorrect ?? null, practice: p.mastery?.practiceCorrect ?? null,
        verified: p.mastery?.verified ?? null, provider: p.provider ?? null,
        correctionPresent: CORRECTION.test(text), text: text.slice(0, 260),
      }
      rows.push(row)
      console.log(`T${i + 1} probe=${wasProbe} correction=${row.correctionPresent} check=${row.check} practice=${row.practice}\n   > ${said.slice(0, 80)}\n   ${text.slice(0, 200)}`)
      if (p.lessonComplete?.complete) break
    }
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\naccount deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/claude-0/qa/engd11.json', JSON.stringify(rows, null, 2))
  const answers = rows.filter((r) => r.wasAnswerToProbe)
  console.log(`\n=== answers to a served probe: ${answers.length}; carrying an explicit correction: ${answers.filter((r) => r.correctionPresent).length}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
