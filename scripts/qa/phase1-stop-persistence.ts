/**
 * PHASE 1 LIVE — an explicit stop must survive the request boundary.
 *
 * The observable proxy for "the episode is still CLOSING on turn N+1" is the
 * close block firing again: it is injected on every CLOSING turn until a
 * 30-minute boundary resets the episode. Before this fix the stop was discarded
 * at persistence, so the very next turn taught new content instead.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say } from './liveSession'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const show = (t: string, p: { text?: string; mastery?: unknown; lessonComplete?: unknown }) => {
  const x = (p.text ?? '').replace(/\s+/g, ' ').trim()
  console.log(`\n[${t}] len=${x.length}\n${x.slice(0, 300)}`)
  console.log(`  mastery=${JSON.stringify(p.mastery ?? null)} lessonComplete=${JSON.stringify(p.lessonComplete ?? null)}`)
}
// Close-script markers per buildAffectCloseBlock: name one thing they did +
// forecast the next session. Deliberately generic, matched case-insensitively.
const CLOSEY = /(next time|next session|come back|see you|well done today|great work today|for today|pick (this|it) up)/i

async function main(): Promise<void> {
  const acct = await createQaAccount('phase1stop')
  console.log('account:', acct.email)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sid, LESSON)

    const t0 = await say(acct.cookie, sid, 'why do mixtures separate?')
    show('0 ORDINARY learning turn (baseline)', t0)

    const t1 = await say(acct.cookie, sid, "I'm done for today.")
    show('1 EXPLICIT STOP', t1)

    const t2 = await say(acct.cookie, sid, 'ok')
    show('2 NEXT TURN — episode must still be CLOSING', t2)

    console.log('\n--- verdicts ---')
    console.log(`turn0 taught normally (>200 chars): ${(t0.text ?? '').length > 200}`)
    console.log(`turn1 closes:                       ${CLOSEY.test(t1.text ?? '')}`)
    console.log(`turn2 STILL closing (not teaching): ${CLOSEY.test(t2.text ?? '')}`)
    console.log(`no mastery verified on any turn:    ${[t0, t1, t2].every((p) => (p.mastery as { verified?: boolean } | null)?.verified !== true)}`)
    console.log(`no lesson completion:               ${[t0, t1, t2].every((p) => (p.lessonComplete as { complete?: boolean } | null)?.complete !== true)}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('cleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
