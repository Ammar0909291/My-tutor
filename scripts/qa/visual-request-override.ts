/**
 * P0-1 REPRODUCTION — a direct visual request overwritten by a graded question.
 *
 * Observed in a beginner Chemistry journey on chem.found.pure-substances, a
 * concept with NO visual binding:
 *
 *   learner  "can you show me a picture?"
 *   tutor    "A question about Pure Substances and Mixtures now — read it
 *             carefully first."     [mcq attached, no figure, no acknowledgement]
 *
 * This drives all THREE visual-availability states, because the correct
 * behaviour differs in each and a fix that only looks at the "no visual" case
 * would be guessing:
 *
 *   A. a curated visual EXISTS      phys.mech.newtons-first-law
 *   B. a domain/generic visual only chem.atomic.* (domain default, demoted)
 *   C. NO visual at all             chem.found.pure-substances  (the report)
 *
 * Each case engages to GUIDE first — the gate cannot attach a probe at OBSERVE,
 * so asking there would prove nothing about the collision.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type LessonRef, type TurnPayload } from './liveSession'

interface Case { label: string; subject: string; lesson: LessonRef; expect: 'curated' | 'generic' | 'none' }

const CASES: Case[] = [
  {
    label: 'A. curated visual EXISTS',
    subject: 'physics', expect: 'curated',
    lesson: { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  },
  {
    label: 'B. domain/generic visual only',
    subject: 'chemistry', expect: 'generic',
    lesson: { lessonTitle: 'Atomic Structure', lessonOrder: 12, topicSlug: 'chem.atomic.atomic-structure', unitTitle: 'Atomic Structure', totalLessons: 186 },
  },
  {
    label: 'C. NO visual at all (the reported case)',
    subject: 'chemistry', expect: 'none',
    lesson: { lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3, topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186 },
  },
]

/** The learner asked to SEE something. Four natural phrasings. */
const ASKS = ['can you show me a picture?', 'show me a diagram', 'can I see a picture of this?', 'is there a diagram for this?']

const one = (t: string) => t.replace(/\s+/g, ' ').trim()
/** Did the turn even mention the request? An honest decline says something. */
const ACKNOWLEDGES = /\b(picture|diagram|figure|image|graph|visual|drawing|illustration|sketch)\b/i

async function main(): Promise<void> {
  const acct = await createQaAccount('vreq')
  console.log(`account: ${acct.email}\n`)
  let overridden = 0, asked = 0
  try {
    for (const c of CASES) {
      console.log(`${'='.repeat(72)}\n${c.label} — ${c.lesson.topicSlug}\n${'='.repeat(72)}`)
      for (const phrase of ASKS) {
        const sid = await createSession(acct.cookie, c.subject)
        await openLesson(acct.cookie, sid, c.lesson)
        let last: TurnPayload | null = null
        for (const t of ['ok', 'I think I follow so far', 'yes that makes sense', 'what next?']) {
          last = await say(acct.cookie, sid, t)
        }
        const p = await say(acct.cookie, sid, phrase)
        const text = one(p.text ?? '')
        const fig = carriesFigure(p) ? (figureLabel(p) ?? 'figure') : 'NO-FIGURE'
        const ack = ACKNOWLEDGES.test(text)
        // THE DEFECT: a graded question attached, and the request not even named.
        const override = Boolean(p.mcq) && !ack
        asked++
        if (override) overridden++
        console.log(`${override ? 'OVERRIDDEN' : 'ok        '} phase=${String(last?.mastery?.phase ?? '?').padEnd(9)} fig=${fig.padEnd(22)} mcq=${p.mcq ? 'YES' : 'no'} acknowledges=${ack}`)
        console.log(`   learner: "${phrase}"`)
        console.log(`   tutor:   ${text.slice(0, 260)}\n`)
      }
    }
    console.log(`\nvisual requests silently replaced by a graded question: ${overridden}/${asked}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
