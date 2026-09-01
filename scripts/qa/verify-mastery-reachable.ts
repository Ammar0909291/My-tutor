/**
 * CAN A LESSON ACTUALLY REACH VERIFIED MASTERY?
 *
 * Every live run in this loop so far has ended check=0 / practice=0. The
 * ladder now MOVES (OBSERVE -> DEMONSTRATE -> GUIDE -> CHECK), but nothing has
 * yet been graded correct end to end, so "the lesson can close" is still an
 * assumption. This drives a competent learner — one who answers every keyed
 * probe CORRECTLY — and reports where it actually stops.
 *
 * It answers by sending the option TEXT, the same way strugglingLearnerHarness
 * does, so the server grades it through its own answer key rather than being
 * told an index.
 *
 * It reads and prints. The verdict is a phase/counter trace, not a judgement
 * about teaching quality — read the captured turns before believing it.
 * Uses a DISPOSABLE account and deletes it afterwards.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe as d, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: 'Friction Forces',
  lessonOrder: 1,
  topicSlug: 'phys.mech.friction',
  unitTitle: 'Mechanics',
  totalLessons: 238,
}

/** What a learner says when there is no question in front of them. */
const NUDGES = [
  'ok, i think i follow so far',
  'yeah that makes sense',
  'can you give me a practice question',
  'right, i understand that',
  'can you quiz me on this',
]

const MAX_TURNS = 16

async function main() {
  const acct = await createQaAccount('mastery')
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    console.log(`session=${sessionId}\n`)

    let p: TurnPayload = await openLesson(acct.cookie, sessionId, LESSON)
    console.log(d('T1 open', p))

    let answered = 0
    let nudge = 0
    for (let t = 0; t < MAX_TURNS; t++) {
      let msg: string
      if (p.mcq && Array.isArray(p.mcq.options) && typeof p.mcq.correctIndex === 'number') {
        msg = p.mcq.options[p.mcq.correctIndex]
        answered++
      } else {
        msg = NUDGES[nudge % NUDGES.length]
        nudge++
      }
      p = await say(acct.cookie, sessionId, msg)
      console.log(`\n--- learner: ${msg}`)
      console.log(d(`T${t + 2}`, p))

      if (p.mastery?.verified === true) {
        console.log(`\nVERIFIED MASTERY at turn ${t + 2}, after ${answered} correct answers.`)
        break
      }
      if (p.lessonComplete?.complete === true) {
        console.log(`\nLESSON COMPLETE at turn ${t + 2}.`)
        break
      }
    }

    const m = p.mastery
    console.log(`\nFINAL phase=${m?.phase} verified=${m?.verified} check=${m?.checkCorrect} practice=${m?.practiceCorrect}`)
    console.log(`probes answered correctly: ${answered}`)
    console.log(`sessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
