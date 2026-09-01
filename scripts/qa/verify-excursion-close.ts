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

/**
 * A — ISOLATE `closed-wants-practice`.
 *
 * THE FIRST RUN OF THIS SCRIPT DEFEATED ITSELF. It said "ok that makes sense
 * now" before asking for practice, and the logs showed
 * `transition: 'closed-satisfied'` — the PRE-EXISTING satisfaction close had
 * already fired, so the practice-request close was never reached and 778b5a0
 * stayed unverified. The satisfaction utterance is removed here deliberately:
 * the detour must still be OPEN when the practice request lands.
 */
const SCRIPT_PRACTICE_CLOSE = [
  // Engage first, so the detour is a genuine mid-lesson event, not the opening.
  'ok, i think i follow so far',
  // THE GAP, naming the concept — the utterance ea7cefb taught the detector.
  'wait, i dont get what the normal force is. you keep saying N',
  // THE CLOSE TRIGGER, with the detour still open. NOTHING between.
  'can you give me a practice question on friction now',
]

/**
 * B — THE OBSERVE PIN, re-measured after 393073b.
 *
 * The same run showed 5 turns pinned at OBSERVE with `demonstrated: false`,
 * because every natural acknowledgement logged `ack: false`. These are
 * ordinary receipts with interleaved glue — no gap, no distress, no question.
 * If the ladder still never leaves OBSERVE, the fix did not reach the runtime.
 */
const SCRIPT_OBSERVE_PIN = [
  'ok, i think i follow so far',
  'yeah that makes sense',
  'right, that all makes sense now',
  'ok i think i understand',
]

async function main() {
  const which = process.argv[2] === 'observe' ? 'observe' : 'practice'
  const script = which === 'observe' ? SCRIPT_OBSERVE_PIN : SCRIPT_PRACTICE_CLOSE
  console.log(`scenario=${which}`)
  const acct = await createQaAccount(`excursion-${which}`)
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    console.log(`session=${sessionId}\n`)

    console.log(d('T1 open', await openLesson(acct.cookie, sessionId, LESSON)))

    for (let i = 0; i < script.length; i++) {
      const p = await say(acct.cookie, sessionId, script[i])
      console.log(`\n--- learner: ${script[i]}`)
      console.log(d(`T${i + 2}`, p))
    }
    console.log(`\nsessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
