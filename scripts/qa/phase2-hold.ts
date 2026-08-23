/**
 * PHASE 2 LIVE SMOKE — three turns, one disposable learner.
 *
 * The HOLD rule itself is proven offline (ambiguousTurnHold.test.ts, with a
 * negative control). What cannot be proven offline is that the wiring is live
 * and harmless: an ambiguous turn must still be ANSWERED, not swallowed, and
 * the clear cases must still behave.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}

const show = (tag: string, text: string | undefined) => {
  const t = (text ?? '').replace(/\s+/g, ' ').trim()
  console.log(`\n[${tag}] len=${t.length}\n${t.slice(0, 420)}`)
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase2hold')
  console.log('account:', acct.email)
  try {
    const sessionId = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sessionId, LESSON)

    const a = await say(acct.cookie, sessionId, "I'm done for today, but why does salt dissolve?")
    show('AMBIGUOUS stop+question', a.text)

    const b = await say(acct.cookie, sessionId, 'what is thermal conductivity?')
    show('CLEAR question', b.text)

    const c = await say(acct.cookie, sessionId, "that's enough for today")
    show('CLEAR stop', c.text)

    const empty = [a, b, c].filter((p) => !((p.text ?? '').trim()))
    console.log(`\nempty turns: ${empty.length} (must be 0)`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('cleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
