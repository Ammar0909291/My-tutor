/**
 * P0-1 LIVE VERIFICATION — the reported case only.
 *
 * Narrowed to chem.found.pure-substances (state C, no visual binding), which
 * is where the defect was reproduced 1/4 pre-fix, because the provider was
 * running at roughly one turn per four minutes and the full three-state matrix
 * could not complete. States A and B were already measured clean pre-fix and
 * are unaffected by the change.
 *
 * PASS means: no turn attaches a graded question while leaving the learner's
 * request unmentioned.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const ACKNOWLEDGES = /\b(picture|diagram|figure|image|graph|visual|drawing|illustration|sketch)\b/i

async function main(): Promise<void> {
  const acct = await createQaAccount('p0v')
  console.log(`account: ${acct.email}\n`)
  let overridden = 0, n = 0
  try {
    for (const phrase of ['can you show me a picture?', 'show me a diagram']) {
      const sid = await createSession(acct.cookie, 'chemistry')
      await openLesson(acct.cookie, sid, LESSON)
      let last: TurnPayload | null = null
      for (const t of ['ok', 'I think I follow so far', 'yes that makes sense', 'what next?']) {
        last = await say(acct.cookie, sid, t)
      }
      const p = await say(acct.cookie, sid, phrase)
      const text = (p.text ?? '').replace(/\s+/g, ' ')
      const ack = ACKNOWLEDGES.test(text)
      const override = Boolean(p.mcq) && !ack
      n++
      if (override) overridden++
      console.log(`${override ? 'OVERRIDDEN' : 'ok        '} phase=${String(last?.mastery?.phase ?? '?').padEnd(9)} fig=${carriesFigure(p) ? 'figure' : 'NO-FIGURE'} mcq=${p.mcq ? 'YES' : 'no'} acknowledges=${ack}`)
      console.log(`   learner: "${phrase}"`)
      console.log(`   tutor:   ${text.slice(0, 320)}\n`)
    }
    console.log(`requests silently replaced by a graded question: ${overridden}/${n}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
