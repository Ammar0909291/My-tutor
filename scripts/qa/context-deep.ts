/**
 * F4 deep re-verification — several natural context-change probes in one
 * session, checking the tutor's words AND the attached figure at every step.
 *
 * The earlier probe covered one path. This covers: subject switch, explicit
 * correction, "that's not what I meant", returning to the original subject,
 * and a follow-up after the correction — which is where a stale context would
 * show if it exists.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

const CHEM = /\b(ionic|covalent|electron|atom|molecul|bond|ion|chemistr)\w*/i
const PHYS = /\b(newton|inertia|force|motion|friction|velocit)\w*/i

const STEPS: Array<[string, string]> = [
  ['engage',            'ok'],
  ['ask chemistry',     'What is an ionic bond?'],
  ['explicit correct',  'I meant Chemistry, not physics.'],
  ['not what I meant',  "That's not what I meant. Explain ionic bonding properly."],
  ['follow-up',         'Why do the ions stick together?'],
  ['return to physics', "Ok, let's go back to Newton's First Law."],
  ['physics follow-up', 'So what keeps the book at rest?'],
]

async function main(): Promise<void> {
  const acct = await createQaAccount('ctx')
  console.log(`account: ${acct.email}\n`)
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    await openLesson(acct.cookie, sessionId, LESSON)

    const rows: Array<{ tag: string; chem: boolean; phys: boolean; fig: string }> = []
    for (const [tag, msg] of STEPS) {
      const p: TurnPayload = await say(acct.cookie, sessionId, msg)
      const t = (p.text ?? '').replace(/\s+/g, ' ')
      const row = {
        tag,
        chem: CHEM.test(t),
        phys: PHYS.test(t),
        fig: carriesFigure(p) ? (figureLabel(p) ?? 'yes') : 'none',
      }
      rows.push(row)
      console.log(`[${tag}] chem=${row.chem} phys=${row.phys} figure=${row.fig}`)
      console.log(`   learner: ${msg}`)
      console.log(`   tutor:   ${t.slice(0, 260)}\n`)
    }

    console.log('─── reading ───')
    // The defect would be: a chemistry answer carrying a physics figure, or a
    // corrected turn that goes back to teaching the previous subject.
    const chemTurns = rows.filter((r) => ['ask chemistry', 'explicit correct', 'not what I meant', 'follow-up'].includes(r.tag))
    const contaminated = chemTurns.filter((r) => r.phys && !r.chem)
    console.log(`chemistry turns answering with physics only: ${contaminated.length}`)
    for (const c of contaminated) console.log(`   CONTAMINATED: ${c.tag}`)
    const back = rows.find((r) => r.tag === 'physics follow-up')
    console.log(`after returning, physics answer restored: ${back?.phys}`)
    console.log(contaminated.length === 0 && back?.phys
      ? 'NOT REPRODUCED on any probed path.'
      : 'POSSIBLE DEFECT — read the transcript above.')
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
