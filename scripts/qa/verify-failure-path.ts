/**
 * THE FAILURE PATH — the half of the engine four green runs never touched.
 *
 * `verify-mastery-reachable` drives a learner who answers everything
 * correctly. That exercises the success path only, and every defect this
 * session found lived on the other one: demotion, remediation, the affect
 * budget, recovery, abandonment. Those paths carry fixes from today
 * (the acknowledgement fold, the CHECK->GUIDE demotion, the verified
 * counters) and NONE of them has been driven end to end since.
 *
 * This learner gets it wrong first, says they do not understand, and only
 * then starts answering. The questions worth asking of the transcript:
 *
 *   · is the learner ever ABANDONED — told the lesson is paused while they
 *     are still trying? (the c98ea7b / conceptBudget failure)
 *   · does a wrong answer DEMOTE, as it should, and does the learner climb
 *     back?
 *   · does "I don't understand" produce different teaching, or the same
 *     sentence twice? (the remediation-card hold, bd3aa69)
 *   · can a lesson that STARTED badly still reach verified mastery?
 *
 * It reads and prints. Read the captured turns before believing a verdict —
 * five harness defects in this repo were found exactly that way.
 * Uses a DISPOSABLE account and deletes it afterwards.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe as d, type TurnPayload } from './liveSession'

const CONCEPTS: Record<string, { lessonTitle: string; topicSlug: string; unitTitle: string; lessonOrder: number }> = {
  friction: { lessonTitle: 'Friction Forces', topicSlug: 'phys.mech.friction', unitTitle: 'Mechanics', lessonOrder: 1 },
  'kinetic-energy': { lessonTitle: 'Kinetic Energy', topicSlug: 'phys.mech.kinetic-energy', unitTitle: 'Mechanics', lessonOrder: 1 },
  mirrors: { lessonTitle: 'Mirrors', topicSlug: 'phys.opt.mirrors', unitTitle: 'Optics', lessonOrder: 1 },
}
const KEY = process.argv[2] && CONCEPTS[process.argv[2]] ? process.argv[2] : 'friction'
const LESSON = { ...CONCEPTS[KEY], totalLessons: 238 }
const MAX_TURNS = 16

/** Distress, then engagement. Consumed in order whenever no MCQ is on screen. */
const SCRIPT = [
  'i dont understand this at all',
  'can you explain it differently',
  'i still dont get it',
  'ok, i think i follow now',
]

async function main() {
  console.log(`concept=${KEY} (${LESSON.topicSlug})`)
  const acct = await createQaAccount(`failpath-${KEY}`)
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    console.log(`session=${sessionId}\n`)

    let p: TurnPayload = await openLesson(acct.cookie, sessionId, LESSON)
    console.log(d('T1 open', p))

    let wrongUsed = false
    let scripted = 0
    let correct = 0
    const texts: string[] = [(p.text ?? '')]

    for (let t = 0; t < MAX_TURNS; t++) {
      let msg: string
      if (p.mcq && Array.isArray(p.mcq.options) && typeof p.mcq.correctIndex === 'number') {
        if (!wrongUsed) {
          // The first graded question is answered WRONG, deliberately.
          msg = p.mcq.options[(p.mcq.correctIndex + 1) % p.mcq.options.length]
          wrongUsed = true
        } else {
          msg = p.mcq.options[p.mcq.correctIndex]
          correct++
        }
      } else if (scripted < SCRIPT.length) {
        msg = SCRIPT[scripted++]
      } else {
        msg = 'ok, what next'
      }
      p = await say(acct.cookie, sessionId, msg)
      texts.push(p.text ?? '')
      console.log(`\n--- learner: ${msg}`)
      console.log(d(`T${t + 2}`, p))

      if (p.mastery?.verified === true) {
        console.log(`\nVERIFIED MASTERY at turn ${t + 2}, after ${correct} correct answers (1 wrong first).`)
        break
      }
      if (p.lessonComplete?.complete === true) {
        console.log(`\nLESSON COMPLETE at turn ${t + 2}.`)
        break
      }
    }

    // ── the three questions this script exists to answer ───────────────────
    const joined = texts.join('\n').toLowerCase()
    const abandoned = /on pause|you haven'?t mastered|let'?s pause .* for now/.test(joined)
    const dupes = texts.filter((x, i) => x.trim().length > 60 && texts.indexOf(x) !== i)
    const m = p.mastery
    console.log('\n──────── FAILURE-PATH FINDINGS ────────')
    console.log(`abandoned mid-struggle : ${abandoned ? 'YES  <-- defect' : 'no'}`)
    console.log(`verbatim repeated turns: ${dupes.length}${dupes.length ? '  <-- defect' : ''}`)
    console.log(`FINAL phase=${m?.phase} verified=${m?.verified} check=${m?.checkCorrect} practice=${m?.practiceCorrect}`)
    console.log(`correct answers after the wrong one: ${correct}`)
    console.log(`sessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
