/**
 * P0-A live check — a learner in distress must not be handed a quiz question.
 *
 * The filler repair replaces a turn with a fixed sentence:
 *   "Let me ask you something concrete about <lesson>: what's one thing you
 *    notice or find surprising about what we just covered?"
 * That exact string is the tell, so this needs no judgement call: if it comes
 * back on a turn where the learner said they were giving up, the repair
 * overwrote the recovery script.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

/** The filler repair's literal replacement text. */
const REPAIR_TEXT = /what'?s one thing you notice or find surprising about what we just covered/i
/** A calming response acknowledges the learner rather than testing them. */
const CALMING = /\b(that'?s ok|it'?s ok|no rush|take your time|you'?re not|happens to|tricky|slow(er)? down|one small step|together|don'?t worry|完全)/i

const DISTRESS = [
  "I give up.",
  "I'm stupid, I can't do this.",
  "I can't do this, it's too hard for me.",
]

async function main(): Promise<void> {
  const acct = await createQaAccount('recov')
  console.log(`account: ${acct.email}\n`)
  let anyRepaired = false
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    await openLesson(acct.cookie, sessionId, LESSON)
    await say(acct.cookie, sessionId, 'ok')

    for (const utterance of DISTRESS) {
      const p: TurnPayload = await say(acct.cookie, sessionId, utterance)
      const text = (p.text ?? '').replace(/\s+/g, ' ')
      const repaired = REPAIR_TEXT.test(text)
      if (repaired) anyRepaired = true
      console.log(`learner: ${utterance}`)
      console.log(`  overwritten-by-filler-repair: ${repaired ? 'YES (DEFECT)' : 'no'}`)
      console.log(`  reads as calming:             ${CALMING.test(text)}`)
      console.log(`  asked a question:             ${text.includes('?')}`)
      console.log(`  mastery: ${JSON.stringify(p.mastery ?? null)}`)
      console.log(`  tutor: ${text.slice(0, 300)}\n`)
    }

    console.log('─── verdict ───')
    console.log(anyRepaired
      ? 'DEFECT: a distress turn was replaced with the generic reflection question.'
      : 'PASS: no distress turn was overwritten by the filler repair.')
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
