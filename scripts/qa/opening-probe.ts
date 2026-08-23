/**
 * How often does a lesson OPENING refuse to open the lesson?
 *
 * Observed once in the Phase 3 matrix: opening "Integers" returned the whole
 * turn as "Use the lesson navigation panel at the top to switch lessons." —
 * the NAVIGATION RULE fired on the one turn it is explicitly told not to.
 * buildLessonOpeningOverride exists precisely to prevent this and is a PROMPT
 * instruction, so compliance is not guaranteed. This counts it.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, type LessonRef } from './liveSession'

const NAV_REFUSAL = /use the lesson navigation panel/i
const LESSONS: Array<[string, LessonRef]> = [
  ['mathematics', { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 }],
  ['physics', { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 }],
  ['mathematics', { lessonTitle: 'Critical Points', lessonOrder: 408, topicSlug: 'math.calc.critical-points', unitTitle: 'Calculus', totalLessons: 908 }],
  ['english', { lessonTitle: 'Phonemic Awareness', lessonOrder: 2, topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216 }],
]

async function main(): Promise<void> {
  const acct = await createQaAccount('open')
  console.log(`account: ${acct.email}\n`)
  let refusals = 0, total = 0
  try {
    for (let round = 0; round < 3; round++) {
      for (const [subject, lesson] of LESSONS) {
        const sid = await createSession(acct.cookie, subject)
        const p = await openLesson(acct.cookie, sid, lesson)
        const text = (p.text ?? '').replace(/\s+/g, ' ')
        total++
        const refused = NAV_REFUSAL.test(text)
        if (refused) refusals++
        console.log(`${refused ? 'REFUSED ' : 'opened  '} ${lesson.lessonTitle.padEnd(20)} ${text.slice(0, 110)}`)
      }
    }
    console.log(`\nopenings that refused to open the lesson: ${refusals}/${total}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
