/**
 * THE CONFIDENTLY WRONG LEARNER — the third path, and the untouched machinery.
 *
 * The two existing probes drive a learner who is right about everything, and
 * one who says "I don't understand". Neither exercises the dangerous quadrant
 * this project's own D1 grid names: FAST + CONFIDENT + WRONG. That path runs
 * through detectMisconceptions, MistakeRecord, MISCONCEPTION_REPAIR, the
 * remediation card ladder and the affect budget — none of which any run this
 * session has touched.
 *
 * This learner answers every graded question WRONG, and does so assertively,
 * with reasoning rather than a shrug. The questions worth asking:
 *
 *   · is the learner ABANDONED, and if so after how many turns?
 *   · does the tutor REPAIR the wrong idea, or just re-assert the right one?
 *   · does it keep asking questions it has already asked?
 *   · does it ever fabricate mastery for a learner who got nothing right?
 *     (that last one is the only outright unacceptable outcome)
 *
 * It reads and prints. Read the captured turns before believing a verdict.
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

/**
 * Assertive, reasoned, and wrong — a misconception, not a shrug.
 *
 * PER CONCEPT, deliberately. A first version reused friction's statements for
 * every lesson, which would have tested whether the tutor handles an OFF-TOPIC
 * assertion — a different question — rather than whether it repairs a
 * misconception about the thing being taught. Each set below is a real,
 * documented misconception for its own concept.
 */
const CONFIDENT_WRONG: Record<string, string[]> = {
  friction: [
    'friction depends on the surface area in contact — a wider block has more friction',
    'no, heavier objects always slide the same because mass cancels out',
    'i am pretty sure friction does not depend on the normal force at all',
    'the coefficient changes with speed, that is the whole point',
  ],
  'kinetic-energy': [
    'kinetic energy doubles when you double the speed, it is proportional',
    'no, a heavy truck parked on a hill has kinetic energy because of its height',
    'kinetic energy is the same thing as momentum, just a different name',
    'the half in the formula is just a convention, it does not come from anywhere',
  ],
  mirrors: [
    'a concave mirror always makes a real image, that is what concave means',
    'no, the image in a plane mirror is behind the glass at twice the distance',
    'virtual images cannot be seen at all, that is why they are called virtual',
    'the focal length changes depending on how far away the object is',
  ],
}

async function main() {
  console.log(`concept=${KEY} (${LESSON.topicSlug})`)
  const acct = await createQaAccount(`misconception-${KEY}`)
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    console.log(`session=${sessionId}\n`)

    let p: TurnPayload = await openLesson(acct.cookie, sessionId, LESSON)
    console.log(d('T1 open', p))

    const texts: string[] = [p.text ?? '']
    const questionsAsked: string[] = []
    let wrong = 0
    let stated = 0
    const phases: string[] = []
    let turns = 0

    for (let t = 0; t < MAX_TURNS; t++) {
      let msg: string
      if (p.mcq && Array.isArray(p.mcq.options) && typeof p.mcq.correctIndex === 'number') {
        questionsAsked.push(p.mcq.question)
        // Always the wrong option, confidently.
        msg = p.mcq.options[(p.mcq.correctIndex + 1) % p.mcq.options.length]
        wrong++
      } else {
        const pool = CONFIDENT_WRONG[KEY] ?? CONFIDENT_WRONG.friction
        msg = pool[stated % pool.length]
        stated++
      }
      p = await say(acct.cookie, sessionId, msg)
      turns++
      if (p.mastery?.phase) phases.push(p.mastery.phase)
      texts.push(p.text ?? '')
      console.log(`\n--- learner: ${msg}`)
      console.log(d(`T${t + 2}`, p))

      if (p.lessonComplete?.complete === true) {
        console.log(`\nLESSON CLOSED at turn ${t + 2}.`)
        break
      }
    }

    const joined = texts.join('\n').toLowerCase()
    const m = p.mastery
    const dupeQ = questionsAsked.filter((q, i) => questionsAsked.indexOf(q) !== i)
    const dupeT = texts.filter((x, i) => x.trim().length > 60 && texts.indexOf(x) !== i)
    console.log('\n──────── MISCONCEPTION-PATH FINDINGS ────────')
    console.log(`wrong answers given    : ${wrong} (plus ${stated} confident wrong statements)`)
    console.log(`FABRICATED MASTERY     : ${m?.verified === true ? 'YES  <-- UNACCEPTABLE' : 'no'}`)
    console.log(`repeated same question : ${dupeQ.length}${dupeQ.length ? '  <-- defect' : ''}`)
    console.log(`verbatim repeated turns: ${dupeT.length}${dupeT.length ? '  <-- defect' : ''}`)
    console.log(`told it was mastered   : ${/you mastered/.test(joined) ? 'YES  <-- defect' : 'no'}`)
    // ── CAN A STRUGGLING LEARNER EVEN BE ASSESSED? ────────────────────────
    // route.ts measured 75% of questions carrying no answer key and named
    // DEMONSTRATE as the largest block. This is the same quantity from the
    // LEARNER's side: of the turns they were given, how many carried a
    // question the server could grade? A learner who is never asked a
    // gradeable question cannot demonstrate recovery however much they learn.
    const pct = turns > 0 ? Math.round((100 * wrong) / turns) : 0
    const atDemonstrate = phases.filter((x) => x === 'DEMONSTRATE').length
    console.log(`GRADEABLE QUESTIONS    : ${wrong} of ${turns} turns (${pct}%)`)
    console.log(`turns spent at DEMONSTRATE: ${atDemonstrate} of ${phases.length}  (E1's dead zone)`)
    console.log(`FINAL phase=${m?.phase} verified=${m?.verified} check=${m?.checkCorrect} practice=${m?.practiceCorrect}`)
    console.log(`sessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
