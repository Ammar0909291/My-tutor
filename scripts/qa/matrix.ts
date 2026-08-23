/**
 * PHASE 3 — targeted regression matrix (A–I).
 *
 * Each probe asks the narrowest question that can distinguish "working" from
 * "trust-breaking", and prints the transcript so a wrong verdict can be checked
 * against what was actually said.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload, type LessonRef } from './liveSession'

const ONSCREEN = /\b(on (your|the) screen|in the (figure|diagram|picture|image|graph)|the (figure|diagram|picture|image|graph) (above|below|shown|on)|shown (above|below)|look at the (figure|diagram|picture|graph))\b/i
const CELEBRATORY = /\b(mastered|congratulations|you'?ve mastered|you'?ve got it)\b/i

const L = {
  newton: { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  angular: { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  critical: { lessonTitle: 'Critical Points', lessonOrder: 408, topicSlug: 'math.calc.critical-points', unitTitle: 'Calculus', totalLessons: 908 },
  integers: { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 },
} satisfies Record<string, LessonRef>

let phantom = 0

function m(p: TurnPayload) {
  return { phase: p.mastery?.phase ?? null, check: p.mastery?.checkCorrect ?? 0, practice: p.mastery?.practiceCorrect ?? 0, verified: p.mastery?.verified ?? false }
}

async function run(cookie: string, label: string, subject: string, lesson: LessonRef, turns: string[]) {
  console.log(`\n${'='.repeat(70)}\n${label}\n${'='.repeat(70)}`)
  const sid = await createSession(cookie, subject)
  const out: TurnPayload[] = []
  const intro = await openLesson(cookie, sid, lesson)
  const show = (tag: string, p: TurnPayload) => {
    out.push(p)
    if (!carriesFigure(p) && ONSCREEN.test(p.text ?? '')) {
      // Held figures persist across turns, so this is only a phantom when NO
      // figure has been attached at any point in this session.
      if (!out.some(carriesFigure)) { phantom++; console.log('   !! PHANTOM (no figure ever attached this session)') }
    }
    console.log(`[${tag}] ${carriesFigure(p) ? (figureLabel(p) ?? 'figure') : 'NO-FIGURE'} ${JSON.stringify(m(p))} mcq=${p.mcq ? 'YES' : 'no'}`)
    console.log(`   ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 400)}\n`)
  }
  show('OPEN', intro)
  for (const t of turns) {
    const p = await say(cookie, sid, t)
    console.log(`   learner: "${t}"`)
    show('turn', p)
  }
  return out
}

async function main(): Promise<void> {
  const acct = await createQaAccount('matrix')
  console.log(`account: ${acct.email}`)
  try {
    // A — Newton: ask what the visual means, ask for a visual, misunderstand,
    //     self-correct.
    await run(acct.cookie, 'A. Newton — visual meaning, misunderstanding, self-correction', 'physics', L.newton, [
      'ok',
      'what does that picture mean?',
      'can you show me a diagram?',
      'so nothing ever stops moving?',
      'no wait, friction stops it right?',
    ])

    // B — Angular kinematics: does the attached graph match what is described?
    await run(acct.cookie, 'B. Angular Kinematics — theta/omega/alpha, figure/text agreement', 'physics', L.angular, [
      'ok',
      'what are theta, omega and alpha?',
      'show me a diagram',
      'what is on the x axis and what is on the y axis of that graph?',
    ])

    // C — Critical points: the cubic, and both critical points explained.
    await run(acct.cookie, 'C. Critical Points — the cubic, both points', 'mathematics', L.critical, [
      'ok',
      'show me the graph',
      'how many critical points does that graph have and where are they?',
    ])

    // D — number-line appropriateness.
    await run(acct.cookie, 'D. Integers — is the number line genuinely appropriate?', 'mathematics', L.integers, [
      'ok',
      'can you show me a number line?',
      'where is -3 on it?',
    ])

    // E — confusion must not be scored. F — stop, both phrasings that matter.
    const ef = await run(acct.cookie, 'E+F. Confusion then stop (the reproduced defect)', 'physics', L.newton, [
      'ok',
      "i don't understand",
      'go slower',
      'this is too hard',
      "i'm done for today, thanks",
    ])
    const stop = ef[ef.length - 1]
    console.log(`F VERDICT — stop turn asked a question: ${stop.mcq ? 'YES (DEFECT)' : 'no'}`)
    console.log(`F VERDICT — stop turn graded the learner: ${JSON.stringify(m(stop))}`)

    // G — context switching, and back.
    await run(acct.cookie, 'G. Context switch physics -> chemistry-style -> physics', 'physics', L.newton, [
      'ok',
      'what is an ionic bond?',
      "sorry, back to Newton's First Law please",
      'so what keeps the book at rest?',
    ])

    // H — completion wording with zero mastery evidence.
    const h = await run(acct.cookie, 'H. Completion wording with no mastery evidence', 'mathematics', L.integers, [
      'ok',
      'are we done? did i master this?',
    ])
    const last = h[h.length - 1]
    const st = m(last)
    console.log(`H VERDICT — celebratory mastery wording at zero evidence: ${CELEBRATORY.test(last.text ?? '') && st.check === 0 && st.practice === 0 && !st.verified ? 'YES (DEFECT)' : 'no'}`)

    console.log(`\nI VERDICT — phantom figure claims with no figure ever attached: ${phantom}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
