/**
 * F4 — can the tutor keep teaching an unrelated concept after the learner's
 * context has changed, and does an explicit correction recover it?
 *
 * Sequence: teach physics -> ask a chemistry question -> correct the tutor
 * ("I meant Chemistry") -> check both the words AND the figure, because a
 * recovered answer with the previous lesson's diagram still attached is the
 * same defect wearing a different coat.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const PHYSICS_LESSON = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

const CHEM_WORDS = /\b(chemistr|atom|molecul|electron|bond|reaction|periodic|element|compound|ion)\w*/i
const PHYS_WORDS = /\b(newton|inertia|force|motion|velocity|friction)\w*/i

function row(tag: string, p: TurnPayload): string {
  const t = (p.text ?? '').replace(/\s+/g, ' ')
  return [
    `[${tag}]`,
    `provider=${p.provider ?? '?'}`,
    `figure=${carriesFigure(p) ? (figureLabel(p) ?? 'yes') : 'none'}`,
    `chem=${CHEM_WORDS.test(t)}`,
    `phys=${PHYS_WORDS.test(t)}`,
    `\n    ${t.slice(0, 320)}`,
  ].join(' ')
}

async function main(): Promise<void> {
  const acct = await createQaAccount('contam')
  console.log(`account: ${acct.email}\n`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    const turns: Array<[string, TurnPayload]> = []

    turns.push(['1 OPEN physics', await openLesson(acct.cookie, sessionId, PHYSICS_LESSON)])
    turns.push(['2 continue', await say(acct.cookie, sessionId, 'ok, got it')])
    turns.push(['3 ask chemistry', await say(acct.cookie, sessionId, 'What is an ionic bond?')])
    turns.push(['4 correct it', await say(acct.cookie, sessionId, "I meant Chemistry, not physics.")])
    turns.push(['5 press again', await say(acct.cookie, sessionId, "That's not what I meant. Explain ionic bonding.")])

    for (const [tag, p] of turns) console.log(row(tag, p) + '\n')

    const askChem = turns[2][1]
    const corrected = turns[3][1]
    console.log('─── reading ───')
    console.log(`turn 3 answered about chemistry: ${CHEM_WORDS.test(askChem.text ?? '')}`)
    console.log(`turn 3 figure still attached:    ${carriesFigure(askChem) ? figureLabel(askChem) : 'none'}`)
    console.log(`turn 4 after correction chem:    ${CHEM_WORDS.test(corrected.text ?? '')}`)
    console.log(`turn 4 figure:                   ${carriesFigure(corrected) ? figureLabel(corrected) : 'none'}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
