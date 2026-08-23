/**
 * One beginner Chemistry journey — the subject this campaign has driven data
 * about but never actually sat through as a learner.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const TURNS = [
  'ok',
  "i don't really know what a mixture is",
  'can you show me a picture?',
  'so is salt water a pure substance? it looks clear',
  'oh, so you can separate it. does that make it a mixture?',
  'i think i get it now',
  "that's enough for today, thanks",
]
const m = (p: TurnPayload) => ({ phase: p.mastery?.phase ?? null, check: p.mastery?.checkCorrect ?? 0, practice: p.mastery?.practiceCorrect ?? 0, verified: p.mastery?.verified ?? false })

async function main(): Promise<void> {
  const acct = await createQaAccount('chem')
  console.log(`account: ${acct.email}\n`)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    const show = (tag: string, p: TurnPayload) => {
      console.log(`[${tag}] ${carriesFigure(p) ? (figureLabel(p) ?? 'figure') : 'NO-FIGURE'} ${JSON.stringify(m(p))} mcq=${p.mcq ? 'YES' : 'no'}`)
      console.log(`   ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 420)}\n`)
    }
    show('OPEN', await openLesson(acct.cookie, sid, LESSON))
    for (const t of TURNS) {
      const p = await say(acct.cookie, sid, t)
      console.log(`   learner: "${t}"`)
      show('turn', p)
    }
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
