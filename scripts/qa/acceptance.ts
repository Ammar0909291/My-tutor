/**
 * PHASE 2 — real-student acceptance.
 *
 * Three beginner journeys, one per live student-facing subject. The learner
 * here is not an engineer: they say "ok", they say they are lost, they ask for
 * a picture, they get something wrong, they correct themselves, and they stop.
 *
 * It records; it does not grade prose. The mechanical facts it does decide are
 * the ones a wrong verdict can be checked against: did a figure attach, did a
 * figureless turn claim one, did mastery move, was a question asked.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload, type LessonRef } from './liveSession'

const ONSCREEN = /\b(on (your|the) screen|in the (figure|diagram|picture|image|graph)|the (figure|diagram|picture|image|graph) (above|below|shown|on)|shown (above|below)|look at the (figure|diagram|picture|graph))\b/i
const CELEBRATORY = /\b(mastered|you'?ve got it|congratulations|well done|excellent work|you'?ve mastered)\b/i

interface Journey { subject: string; lesson: LessonRef; turns: string[] }

const JOURNEYS: Journey[] = [
  {
    subject: 'physics',
    lesson: { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
    turns: [
      'ok',
      'sorry what does inertia mean? i havent heard that word',
      'can you show me a picture?',
      'so if i push a box it keeps going forever right?',
      'oh wait no, friction stops it. is that it?',
      'i think i get it. can you give me an example from real life?',
      "i'm done for today, thanks",
    ],
  },
  {
    subject: 'mathematics',
    lesson: { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 },
    turns: [
      'ok',
      "i don't understand negative numbers",
      'can you show me a diagram of this?',
      'is -5 bigger than -2?',
      'hmm i think i got that wrong. -2 is bigger?',
      'this is too hard, can you go slower',
      "let's continue tomorrow",
    ],
  },
  {
    subject: 'english',
    lesson: { lessonTitle: 'Phonemic Awareness', lessonOrder: 2, topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216 },
    turns: [
      'ok',
      "i'm not sure what a sound is, isn't that the same as a letter?",
      'can you give me an example?',
      'cat has three sounds? c a t?',
      "i don't understand",
      "that's enough for today",
    ],
  },
]

function m(p: TurnPayload) {
  return { phase: p.mastery?.phase ?? null, check: p.mastery?.checkCorrect ?? 0, practice: p.mastery?.practiceCorrect ?? 0, verified: p.mastery?.verified ?? false }
}

async function main(): Promise<void> {
  const acct = await createQaAccount('accept')
  console.log(`account: ${acct.email}\n`)
  let phantom = 0, falseCelebration = 0, degraded = 0, figures = 0
  try {
    for (const j of JOURNEYS) {
      console.log(`\n${'='.repeat(72)}\nSUBJECT: ${j.subject} — ${j.lesson.lessonTitle}\n${'='.repeat(72)}`)
      const sessionId = await createSession(acct.cookie, j.subject)
      const intro = await openLesson(acct.cookie, sessionId, j.lesson)
      const show = (tag: string, p: TurnPayload) => {
        const fig = carriesFigure(p) ? (figureLabel(p) ?? 'figure') : 'NO-FIGURE'
        if (carriesFigure(p)) figures++
        if (!carriesFigure(p) && ONSCREEN.test(p.text ?? '')) {
          phantom++
          console.log(`   !! PHANTOM: ${((p.text ?? '').split(/(?<=[.!?])\s+/).find((s) => ONSCREEN.test(s)) ?? '').slice(0, 200)}`)
        }
        const st = m(p)
        if (CELEBRATORY.test(p.text ?? '') && st.check === 0 && st.practice === 0 && !st.verified) {
          falseCelebration++
          console.log('   !! CELEBRATORY WORDING WITH ZERO MASTERY EVIDENCE')
        }
        if (String(p.provider ?? '').includes('degraded') || /isn't responding right now/i.test(p.text ?? '')) degraded++
        console.log(`[${tag}] ${fig} ${JSON.stringify(st)} mcq=${p.mcq ? 'yes' : 'no'} provider=${p.provider ?? '?'}`)
        console.log(`   tutor: ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 420)}\n`)
      }
      show('OPEN', intro)
      for (const t of j.turns) {
        const p = await say(acct.cookie, sessionId, t)
        console.log(`   learner: "${t}"`)
        show('turn', p)
      }
    }
    console.log(`\n${'─'.repeat(72)}\nSUMMARY`)
    console.log(`figures attached across all journeys : ${figures}`)
    console.log(`phantom figure references            : ${phantom}`)
    console.log(`celebratory wording w/ zero mastery  : ${falseCelebration}`)
    console.log(`degraded-provider turns              : ${degraded}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
