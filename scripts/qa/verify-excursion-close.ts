/**
 * VERIFY 778b5a0 LIVE — a knowledge-gap detour must CLOSE on a practice request.
 *
 * The fix has never fired in production. Until ea7cefb the detour could not
 * even OPEN on the phrasing that NAMES the missing concept — and that is the
 * phrasing `classifyKnowledgeGap` needs, because it requires a resolvable
 * concept as well as a distress signal. So the close path was unreachable for
 * the one utterance shape that reaches it.
 *
 * This script reads and prints. It asserts nothing about teaching quality; the
 * verdict is read off the production [excursion] logs afterwards. Four harness
 * defects in this repo were found by comparing a verdict against the captured
 * turn, so the transcript is the deliverable, not the pass/fail.
 *
 * Uses a DISPOSABLE account and deletes it afterwards.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe as d } from './liveSession'

const LESSON = {
  lessonTitle: 'Friction Forces',
  lessonOrder: 1,
  topicSlug: 'phys.mech.friction',
  unitTitle: 'Mechanics',
  totalLessons: 238,
}

const SCRIPT = [
  // Engage normally first, so the detour is a genuine mid-lesson event and
  // not the session opening.
  'ok, i think i follow so far',
  // THE GAP, phrased so it NAMES the concept — exactly the utterance ea7cefb
  // taught `detectFailureState` to recognise.
  'wait, i dont get what the normal force is. you keep saying N',
  // Absorb the detour's teaching.
  'ok that makes sense now, the surface pushes back',
  // THE CLOSE TRIGGER: a practice request while the detour is still open.
  'can you give me a practice question on friction now',
]

async function main() {
  const acct = await createQaAccount('excursion-close')
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    console.log(`session=${sessionId}\n`)

    console.log(d('T1 open', await openLesson(acct.cookie, sessionId, LESSON)))

    for (let i = 0; i < SCRIPT.length; i++) {
      const p = await say(acct.cookie, sessionId, SCRIPT[i])
      console.log(`\n--- learner: ${SCRIPT[i]}`)
      console.log(d(`T${i + 2}`, p))
    }
    console.log(`\nsessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
