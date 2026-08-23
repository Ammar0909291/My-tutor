/**
 * The residual after the graded-question fix: does the CLOSE turn still ASK?
 *
 * The tappable, graded item is gone deterministically. This measures the half
 * that is still model compliance with buildAffectCloseBlock's "do NOT
 * introduce new content, new questions, or another attempt" — a prose question
 * on a turn where the learner said they were leaving.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type LessonRef, type TurnPayload } from './liveSession'

const LESSONS: Array<[string, LessonRef]> = [
  ['physics', { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 }],
  ['mathematics', { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 }],
  ['english', { lessonTitle: 'Phonemic Awareness', lessonOrder: 2, topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216 }],
]
const STOPS = ["i'm done for today, thanks", 'bye', "let's continue tomorrow"]

async function main(): Promise<void> {
  const acct = await createQaAccount('prose')
  console.log(`account: ${acct.email}\n`)
  let asked = 0, total = 0, graded = 0
  try {
    for (const [subject, lesson] of LESSONS) {
      for (const stop of STOPS) {
        const sid = await createSession(acct.cookie, subject)
        await openLesson(acct.cookie, sid, lesson)
        let last: TurnPayload | null = null
        for (const t of ['ok', 'I think I follow so far', 'yes that makes sense', 'what next?']) {
          last = await say(acct.cookie, sid, t)
        }
        const p = await say(acct.cookie, sid, stop)
        const text = (p.text ?? '').replace(/\s+/g, ' ')
        const q = /\?/.test(text)
        total++
        if (q) asked++
        if (p.mcq) graded++
        console.log(`${q ? 'ASKS   ' : 'closes '} ${subject.padEnd(12)} phase=${String(last?.mastery?.phase ?? '?').padEnd(10)} "${stop}"`)
        console.log(`        ${text.slice(0, 200)}`)
      }
    }
    console.log(`\nstop turns containing a prose question: ${asked}/${total}`)
    console.log(`stop turns carrying a GRADED question   : ${graded}/${total}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
