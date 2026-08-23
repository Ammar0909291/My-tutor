/**
 * The reproduced defect, re-run against the deployed fix.
 *
 * Reaches the gate before stopping: the original reproduction happened at
 * GUIDE, where the authored gate probe becomes attachable. Stopping at OBSERVE
 * proves nothing, because the gate would not have fired there anyway.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

const L = { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 }
const STOPS = ["i'm done for today, thanks", "let's continue tomorrow", "that's enough for today", 'bye']

const m = (p: TurnPayload) => ({ phase: p.mastery?.phase ?? null, check: p.mastery?.checkCorrect ?? 0, practice: p.mastery?.practiceCorrect ?? 0, verified: p.mastery?.verified ?? false })

async function main(): Promise<void> {
  const acct = await createQaAccount('stop')
  console.log(`account: ${acct.email}\n`)
  let asked = 0
  try {
    for (const stop of STOPS) {
      const sid = await createSession(acct.cookie, 'physics')
      await openLesson(acct.cookie, sid, L)
      // Engage until the ladder is past OBSERVE, so the gate is genuinely live.
      let last: TurnPayload | null = null
      for (const t of ['ok', 'so a book stays still because the forces cancel', 'and a moving ball keeps going unless friction acts', 'got it, what next?']) {
        last = await say(acct.cookie, sid, t)
      }
      console.log(`phase before stop: ${last?.mastery?.phase ?? '?'}`)
      const p = await say(acct.cookie, sid, stop)
      const q = p.mcq !== null && p.mcq !== undefined
      if (q) asked++
      console.log(`STOP "${stop}" -> question=${q ? 'YES (DEFECT)' : 'no'} ${JSON.stringify(m(p))}`)
      console.log(`   ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 300)}\n`)
    }
    console.log(`stops answered with a question: ${asked}/${STOPS.length}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
