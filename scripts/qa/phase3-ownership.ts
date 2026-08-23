/**
 * PHASE 3 LIVE SMOKE — the CUE now consumes the turn's authoritative reading.
 *
 * Ownership is proven offline (decisionOwnership.test.ts, negative control).
 * This proves only what offline cannot: the forwarding is live and behaviour is
 * unchanged across the four intent shapes the migrated fields govern.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const show = (t: string, x?: string) =>
  console.log(`\n[${t}] len=${(x ?? '').trim().length}\n${(x ?? '').replace(/\s+/g, ' ').trim().slice(0, 260)}`)

async function main(): Promise<void> {
  const acct = await createQaAccount('phase3own')
  console.log('account:', acct.email)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sid, LESSON)
    const turns: Array<[string, string]> = [
      ['question',  'why do mixtures separate?'],
      ['request',   'explain it differently'],
      ['distress',  'I am lost'],
      ['ambiguous', "I'm done for today, but what is a compound?"],
    ]
    const out = []
    for (const [tag, msg] of turns) { const p = await say(acct.cookie, sid, msg); show(tag, p.text); out.push(p) }
    console.log(`\nempty turns: ${out.filter((p) => !((p.text ?? '').trim())).length} (must be 0)`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('cleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
