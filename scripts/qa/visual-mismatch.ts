/**
 * P0 reproduction — does the figure the learner is shown teach the concept the
 * tutor is talking about?
 *
 * Reported: in Lesson 39 "Angular Kinematics" the tutor explained a rotating
 * bicycle wheel (theta, omega, alpha) and the learner asked for a diagram; the
 * VISUAL AID displayed was a coordinate plane with the point (2,3).
 *
 * Records every figure channel and the tutor's own words, per turn, and leaves
 * the judgement to a human reading the transcript. It asserts nothing about
 * teaching quality — the only thing it decides is whether the attached figure's
 * identity is related to the lesson's concept at all.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, describe, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: 'Angular Kinematics',
  lessonOrder: 39,
  topicSlug: 'phys.mech.angular-kinematics',
  unitTitle: 'Classical Mechanics',
  totalLessons: 238,
}

/** Full figure payload, so a mismatch can be read rather than inferred. */
function figureDump(p: TurnPayload): string {
  const parts: string[] = []
  for (const k of ['visual', 'visualSpec', 'sceneSpec', 'dynamicVisualizationCode'] as const) {
    if (p[k]) parts.push(`${k}=${JSON.stringify(p[k]).slice(0, 600)}`)
  }
  return parts.length ? parts.join('\n    ') : '(none)'
}

async function main(): Promise<void> {
  const acct = await createQaAccount('visual')
  console.log(`account: ${acct.email}\n`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    const turns: Array<[string, TurnPayload]> = []

    turns.push(['OPEN', await openLesson(acct.cookie, sessionId, LESSON)])
    for (const msg of [
      'ok',
      'Can you give me a diagram to visualize this?',
      'show me the rotating wheel',
    ]) {
      turns.push([`SAY: ${msg}`, await say(acct.cookie, sessionId, msg)])
    }

    for (const [tag, p] of turns) {
      console.log(describe(tag, p))
      console.log(`    FIGURE: ${figureDump(p)}\n`)
    }

    console.log('─── verdict inputs ───')
    for (const [tag, p] of turns) {
      console.log(`${tag.padEnd(46)} figure=${carriesFigure(p) ? (figureLabel(p) ?? 'yes') : 'none'}`)
    }
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
