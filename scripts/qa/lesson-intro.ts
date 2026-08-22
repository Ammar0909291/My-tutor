/**
 * Does a learner who OPENS A LESSON get a lesson-level orientation?
 *
 * Reported: entering "Lesson 39 — Angular Kinematics" and immediately
 * receiving teaching dialogue with no lesson introduction.
 *
 * A fresh open does produce one (measured). The hypothesis under test is the
 * SECOND lesson opened inside the same session: buildOpeningBlock returns ''
 * unless `isFreshBoundary`, and the session boundary is a 30-minute inactivity
 * gap — so switching lessons mid-session may drop the learner straight into
 * teaching.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

const L39 = {
  lessonTitle: 'Angular Kinematics', lessonOrder: 39,
  topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238,
}
const L40 = {
  lessonTitle: 'Rotational Dynamics', lessonOrder: 40,
  topicSlug: 'phys.mech.rotational-dynamics', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

/** An orientation names the lesson and says what it is about. */
function looksLikeIntro(p: TurnPayload, title: string): { verdict: boolean; why: string } {
  const t = (p.text ?? '')
  const namesLesson = new RegExp(title.split(' ')[0], 'i').test(t)
  const orients = /in this lesson|we'?ll learn|we will learn|by the end|welcome to lesson|this lesson/i.test(t)
  return { verdict: namesLesson && orients, why: `namesLesson=${namesLesson} orients=${orients}` }
}

async function main(): Promise<void> {
  const acct = await createQaAccount('intro')
  console.log(`account: ${acct.email}\n`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')

    const first = await openLesson(acct.cookie, sessionId, L39)
    const a = looksLikeIntro(first, L39.lessonTitle)
    console.log(`LESSON 39 (first open in session)  intro=${a.verdict}  ${a.why}`)
    console.log(`    ${(first.text ?? '').replace(/\s+/g, ' ').slice(0, 260)}\n`)

    // Some ordinary teaching in between, so the session is plainly mid-flight.
    await say(acct.cookie, sessionId, 'ok')

    const second = await openLesson(acct.cookie, sessionId, L40)
    const b = looksLikeIntro(second, L40.lessonTitle)
    console.log(`LESSON 40 (switched mid-session)   intro=${b.verdict}  ${b.why}`)
    console.log(`    ${(second.text ?? '').replace(/\s+/g, ' ').slice(0, 260)}\n`)

    console.log('─── result ───')
    console.log(a.verdict && !b.verdict
      ? 'REPRODUCED: a lesson opened mid-session gets no lesson-level orientation.'
      : a.verdict && b.verdict
        ? 'NOT REPRODUCED on this path: both opens carried an orientation.'
        : 'UNEXPECTED: the first open carried no orientation either — investigate that first.')
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
