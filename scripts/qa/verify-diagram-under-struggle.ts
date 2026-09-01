/**
 * "CAN YOU SHOW ME A DIAGRAM?" — asked by a learner who is STRUGGLING.
 *
 * The visual layer has been driven before, but never under distress. That
 * combination is where two documented failure modes meet:
 *
 *   · the tutor NARRATING a figure that is not attached — the phantom-figure
 *     class `figureReference.ts` exists to strip ("The diagram shows nitrogen
 *     in the center...", measured on chemistry resonance)
 *   · an explicit request being answered with the WRONG FORM — the
 *     `requestedVisualForm` case, where "can you graph this?" was answered
 *     with a circuit diagram and presented as the graph
 *
 * A struggling learner asks for a picture far more often than a fluent one,
 * and by then the lesson is mid-remediation with a held card and a spent
 * affect budget — none of which any previous probe combined with a visual
 * request.
 *
 * Questions worth asking of the transcript:
 *   · does a figure actually ARRIVE on the turn it is asked for?
 *   · does the tutor claim to show something when nothing is attached?
 *   · does the request derail the lesson, or is teaching continuous?
 *   · does asking for a picture cost the learner mastery progress?
 *
 * Reads and prints. Uses a DISPOSABLE account and deletes it afterwards.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe as d, carriesFigure, type TurnPayload } from './liveSession'

const CONCEPTS: Record<string, { lessonTitle: string; topicSlug: string; unitTitle: string; lessonOrder: number }> = {
  friction: { lessonTitle: 'Friction Forces', topicSlug: 'phys.mech.friction', unitTitle: 'Mechanics', lessonOrder: 1 },
  mirrors: { lessonTitle: 'Mirrors', topicSlug: 'phys.opt.mirrors', unitTitle: 'Optics', lessonOrder: 1 },
  'kinetic-energy': { lessonTitle: 'Kinetic Energy', topicSlug: 'phys.mech.kinetic-energy', unitTitle: 'Mechanics', lessonOrder: 1 },
}
const KEY = process.argv[2] && CONCEPTS[process.argv[2]] ? process.argv[2] : 'friction'
const LESSON = { ...CONCEPTS[KEY], totalLessons: 238 }

/**
 * Struggle first, THEN ask for a picture — the order is the point.
 *
 * The third request is PER CONCEPT. The first version asked every lesson to
 * "show me a picture of the forces", which is friction's vocabulary: in a
 * MIRRORS lesson that is an off-topic request, and the engine declining to
 * draw a force diagram in an optics lesson is CORRECT behaviour, not the
 * figure gap it looked like. Measured as 2-of-3 twice on mirrors before the
 * script was the suspect — the same methodological flaw already corrected in
 * the misconception probe.
 */
const SUBJECT_REQUEST: Record<string, string> = {
  friction: 'show me a picture of the forces',
  mirrors: 'show me a picture of the rays',
  'kinetic-energy': 'show me a picture of the energy changing',
}
const SCRIPT = [
  'i dont understand this at all',
  'can you show me a diagram',          // the request, mid-struggle
  'i still dont get it, can you draw it',
  SUBJECT_REQUEST[KEY] ?? SUBJECT_REQUEST.friction,
  'ok that helps a bit',
]

/** Claims a figure is on screen. Same shapes figureReference.ts strips. */
const CLAIMS_FIGURE =
  /\b(?:the (?:diagram|figure|picture|image)\s+(?:shows|below|above|illustrates|depicts)|as you can see|here you see|you can see (?:that|the|a)|in the (?:diagram|figure|picture)|look at the (?:diagram|figure|picture)|on the screen)\b/i

async function main() {
  console.log(`concept=${KEY} (${LESSON.topicSlug})`)
  const acct = await createQaAccount(`diagram-${KEY}`)
  console.log(`BASE=${BASE}\n`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    let p: TurnPayload = await openLesson(acct.cookie, sessionId, LESSON)
    console.log(d('T1 open', p))

    let phantom = 0
    let askedForFigure = 0
    let figureOnAskTurn = 0
    let contentFree = 0

    for (let i = 0; i < SCRIPT.length; i++) {
      const msg = SCRIPT[i]
      const isFigureRequest = /diagram|draw|picture/.test(msg)
      p = await say(acct.cookie, sessionId, msg)
      const hasFig = carriesFigure(p)
      const text = p.text ?? ''
      if (isFigureRequest) {
        askedForFigure++
        if (hasFig) figureOnAskTurn++
      }
      if (!hasFig && CLAIMS_FIGURE.test(text)) {
        phantom++
        console.log(`\n!! PHANTOM FIGURE CLAIM with no figure attached:`)
        console.log(`   ${text.replace(/\s+/g, ' ').slice(0, 180)}`)
      }
      if (text.trim().length < 90) contentFree++
      console.log(`\n--- learner: ${msg}`)
      console.log(d(`T${i + 2}`, p))
    }

    const m = p.mastery
    console.log('\n──────── DIAGRAM-UNDER-STRUGGLE FINDINGS ────────')
    console.log(`figure requests           : ${askedForFigure}`)
    console.log(`  answered WITH a figure  : ${figureOnAskTurn}${figureOnAskTurn < askedForFigure ? '  <-- gap' : ''}`)
    console.log(`PHANTOM figure claims     : ${phantom}${phantom ? '  <-- defect' : ''}`)
    console.log(`very short (<90 char) turns: ${contentFree}`)
    console.log(`FINAL phase=${m?.phase} verified=${m?.verified} check=${m?.checkCorrect} practice=${m?.practiceCorrect}`)
    console.log(`sessionId=${sessionId}`)
  } finally {
    const out = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${out.deleted} reloginBlocked=${out.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
