/**
 * PHASE 4 LIVE — the close is DEFERRED by an ambiguous turn, not discarded.
 *
 * Turn 1 is both a stop and a question. It must ANSWER (the close is withheld).
 * Turn 2 is unambiguous, the episode is still CLOSING, so the close must fire.
 * That pair is the whole claim: deferred, not removed.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const show = (t: string, x?: string) =>
  console.log(`\n[${t}] len=${(x ?? '').trim().length}\n${(x ?? '').replace(/\s+/g, ' ').trim().slice(0, 340)}`)

async function main(): Promise<void> {
  const acct = await createQaAccount('phase4amb')
  console.log('account:', acct.email)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sid, LESSON)
    const t1 = await say(acct.cookie, sid, "I'm done for today, but what is a compound?")
    show('1 AMBIGUOUS stop+question (must ANSWER)', t1.text)
    const t2 = await say(acct.cookie, sid, 'ok')
    show('2 unambiguous, episode still CLOSING (close may now fire)', t2.text)

    const a = (t1.text ?? '').toLowerCase()
    console.log(`\nturn1 answered the question (mentions compound/element): ${/compound|element/.test(a)}`)
    console.log(`turn1 empty: ${!a.trim()}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('cleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
