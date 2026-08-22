/**
 * Live checks for three trust findings, in one learner session.
 *
 *  F3  expressing confusion must not be recorded as failure or mastery
 *  F5  a turn with NO figure attached must not claim one is on screen
 *  F2  an explicit stop must be honoured, and must not grade the learner
 *
 * Every verdict is computed from the payload the learner would actually
 * receive. Where a judgement is not mechanically decidable (is this teaching
 * "simpler"?) the transcript is printed and the call is left to a human rather
 * than dressed up as a measurement.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'

const LESSON = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

/** The claim family F5 exists to prevent: pointing at something not there. */
const ONSCREEN_CLAIM = /\b(on (your|the) screen|in the (figure|diagram|picture|image|graph)|the (figure|diagram|picture|image|graph) (above|below|shown|on)|shown (above|below)|look at the (figure|diagram|picture|graph))\b/i

function m(p: TurnPayload) {
  return {
    phase: p.mastery?.phase ?? null,
    check: p.mastery?.checkCorrect ?? 0,
    practice: p.mastery?.practiceCorrect ?? 0,
    verified: p.mastery?.verified ?? false,
  }
}

async function main(): Promise<void> {
  const acct = await createQaAccount('trust')
  console.log(`account: ${acct.email}\n`)
  const noFigureTurns: Array<[string, TurnPayload]> = []
  try {
    const sessionId = await createSession(acct.cookie, 'physics')
    const log: Array<[string, TurnPayload]> = []
    const step = async (tag: string, fn: () => Promise<TurnPayload>) => {
      const p = await fn()
      log.push([tag, p])
      if (!carriesFigure(p)) noFigureTurns.push([tag, p])
      console.log(`[${tag}] figure=${carriesFigure(p)} ${JSON.stringify(m(p))}`)
      console.log(`    ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 300)}\n`)
      return p
    }

    await step('open', () => openLesson(acct.cookie, sessionId, LESSON))
    const before = await step('engage', () => say(acct.cookie, sessionId, 'ok'))

    // ── F3 ──────────────────────────────────────────────────────────────
    const c1 = await step('F3 confusion 1', () => say(acct.cookie, sessionId, "I don't understand this."))
    const c2 = await step('F3 confusion 2', () => say(acct.cookie, sessionId, 'This is too hard, can you slow down?'))

    // ── F2 ──────────────────────────────────────────────────────────────
    const stop = await step('F2 stop', () => say(acct.cookie, sessionId, "I'm done for today."))

    console.log('─── F3: confusion must not be scored ───')
    const b = m(before), a1 = m(c1), a2 = m(c2)
    console.log(`before      ${JSON.stringify(b)}`)
    console.log(`confusion 1 ${JSON.stringify(a1)}`)
    console.log(`confusion 2 ${JSON.stringify(a2)}`)
    const noFalseMastery = a1.check <= b.check && a1.practice <= b.practice
      && a2.check <= b.check && a2.practice <= b.practice
      && !a1.verified && !a2.verified
    console.log(`F3 no false mastery from expressing confusion: ${noFalseMastery}`)

    console.log('\n─── F5: no figure attached => no on-screen claim ───')
    let f5 = true
    for (const [tag, p] of noFigureTurns) {
      const claim = ONSCREEN_CLAIM.test(p.text ?? '')
      if (claim) f5 = false
      console.log(`  ${tag.padEnd(18)} claims-a-figure=${claim}`)
      if (claim) {
        // Print the offending sentence so a hit can be judged: the product's
        // own guard strips unbacked references, so a hit is either a shape it
        // missed or an over-broad probe regex. Guessing between those is what
        // this line exists to prevent.
        const m = (p.text ?? '').split(/(?<=[.!?])\s+/).find((s2) => ONSCREEN_CLAIM.test(s2))
        console.log(`      OFFENDING: ${JSON.stringify(m ?? (p.text ?? '').slice(0, 200))}`)
      }
    }
    console.log(`F5 no phantom reference on any figureless turn: ${f5} (${noFigureTurns.length} turns checked)`)

    console.log('\n─── F2: stop honoured, learner not graded ───')
    const s = m(stop)
    console.log(`stop turn mastery ${JSON.stringify(s)}`)
    console.log(`F2 no grading on the stop turn: ${s.check <= a2.check && s.practice <= a2.practice && !s.verified}`)
    console.log(`F2 stop turn asked another question: ${stop.mcq ? 'YES (bad)' : 'no'}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
