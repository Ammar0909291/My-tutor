/**
 * THE LEARNER WHO WALKS AWAY AND COMES BACK.
 *
 * `sessionLifecycle.ts` defines a session boundary as a ~30-minute inactivity
 * gap, and decision-engine/07 §8 rule 3 says an episode that ended on a
 * FAILURE owes the returning learner an engineered win BEFORE anything else —
 * the "retro-close" debt. None of that has ever been driven end to end: every
 * probe in this session runs its turns back to back, so the boundary never
 * opens and the debt never comes due.
 *
 * Two phases, because the gap has to be real — timestamps come from the
 * server, so it cannot be faked through the API.
 *
 *   park    open a lesson, answer one question WRONG, walk away mid-struggle,
 *           and print the session id
 *   resume  come back to that session id after >= 30 minutes and read what
 *           the first turn does
 *
 * The questions worth asking of the resumed transcript:
 *   · is the learner re-greeted, or does the tutor pretend nothing happened?
 *   · is the failure they left on acknowledged, and is a win engineered
 *     before new content? (07 §8 rule 3)
 *   · is the lesson's ladder still where they left it, or silently reset?
 *   · is the account's progress intact?
 *
 * Uses a DISPOSABLE account. `park` deliberately does NOT delete it — the
 * account has to survive the gap — so `resume` deletes it, and `--drop`
 * deletes it without resuming if the run is abandoned.
 */
import { createQaAccount, deleteQaAccount, login, BASE } from './liveAccount'
import { createSession, openLesson, say, describe as d, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: 'Friction Forces', topicSlug: 'phys.mech.friction',
  unitTitle: 'Mechanics', lessonOrder: 1, totalLessons: 238,
}

async function park() {
  const acct = await createQaAccount('boundary')
  const sessionId = await createSession(acct.cookie, 'physics')
  console.log(`BASE=${BASE}`)
  console.log(d('T1 open', await openLesson(acct.cookie, sessionId, LESSON)))

  // KEEP GOING UNTIL A GRADED QUESTION IS ACTUALLY OFFERED. The first version
  // took two fixed turns and parked whatever state it happened to be in; no
  // MCQ appeared, so no failure was recorded and the engineered-win debt was
  // never owed — the one rule this probe exists for went untested. Walking
  // away is only interesting if the learner walks away having just FAILED.
  let p: TurnPayload | null = null
  const NUDGES = [
    'ok, i think i follow so far', 'yeah that makes sense',
    'can you quiz me on this', 'right, i understand that', 'ok what next',
  ]
  let failedBeforeParking = false
  for (let t = 0; t < 8 && !failedBeforeParking; t++) {
    if (p?.mcq && typeof p.mcq.correctIndex === 'number') {
      const wrong = p.mcq.options[(p.mcq.correctIndex + 1) % p.mcq.options.length]
      p = await say(acct.cookie, sessionId, wrong)
      failedBeforeParking = true
      console.log(`\n--- learner (deliberately WRONG): ${wrong}`)
    } else {
      const msg = NUDGES[t % NUDGES.length]
      p = await say(acct.cookie, sessionId, msg)
      console.log(`\n--- learner: ${msg}`)
    }
    console.log(d('turn', p))
  }
  if (!failedBeforeParking) {
    console.log('\n(NO graded question was ever offered — the gap still tests the')
    console.log(' boundary, but the engineered-win debt is NOT owed and this run')
    console.log(' does not test decision-engine/07 §8 rule 3)')
  }
  console.log('\n──────── PARKED ────────')
  console.log(`left on a graded FAILURE: ${failedBeforeParking ? 'YES — the debt is owed' : 'no'}`)
  console.log(`RESUME_WITH: npx tsx scripts/qa/verify-session-boundary.ts resume \\`)
  console.log(`  ${acct.email} ${acct.password} ${sessionId}`)
  console.log(`phase left at: ${p?.mastery?.phase} check=${p?.mastery?.checkCorrect} practice=${p?.mastery?.practiceCorrect}`)
}

async function resume(email: string, password: string, sessionId: string, drop: boolean) {
  const cookie = await login(email, password)
  const acct = { email, password, name: 'qa', cookie }
  try {
    if (drop) { console.log('dropping without resuming'); return }
    console.log(`resuming session ${sessionId}\n`)
    const p = await say(cookie, sessionId, 'ok im back')
    console.log('--- learner: ok im back')
    console.log(d('RETURN TURN', p))
    console.log('\n──────── BOUNDARY FINDINGS ────────')
    const t = (p.text ?? '').toLowerCase()
    console.log(`re-greets the learner   : ${/welcome back|good to see you|you're back|last time|earlier/.test(t) ? 'yes' : 'NO'}`)
    console.log(`mentions where they left: ${/friction|last time|we were|picked up|recap/.test(t) ? 'yes' : 'NO'}`)
    console.log(`FINAL phase=${p.mastery?.phase} verified=${p.mastery?.verified} check=${p.mastery?.checkCorrect} practice=${p.mastery?.practiceCorrect}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

const [mode, ...rest] = process.argv.slice(2)
const run = mode === 'resume'
  ? resume(rest[0], rest[1], rest[2], rest.includes('--drop'))
  : park()
run.catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
