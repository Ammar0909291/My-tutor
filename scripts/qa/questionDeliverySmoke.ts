/**
 * BLACK-BOX PRODUCTION SMOKE TEST — the question delivery contract.
 *
 * Reproduces the behavioural shapes from the audit against the deployed app
 * and checks the ONE invariant that stranded the learner: a turn may not
 * announce a question it does not deliver. Read-only; it never certifies a
 * concept and never touches mastery state directly.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'

/** A turn that promises something it did not deliver: text ends on a colon. */
const PROMISES = (t: string) => /:\s*$/.test((t ?? '').trim())
const TAG = /<!--|SIGNAL:|correctIndex|\bMCQ:/i

interface Row { said: string; text: string; mcq: string | null; mastery: unknown; figure: boolean }

/** Prose that points the learner AT a figure. The audit reported a tutor
 *  describing a curve that was never attached and telling the learner to
 *  refresh. This is the shipped contract's own concern; the smoke test only
 *  observes whether the two agree. */
const REFERS_TO_A_FIGURE =
  /\b(?:take a look at|look at|see|shown in|beside this message)\b[^.]{0,40}\b(?:diagram|figure|graph|curve|chart|picture|plot)\b|\bin the (?:diagram|figure|graph|curve|chart)\b/i

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const subject = process.env.QA_SUBJECT ?? 'physics'
  const slug = process.env.QA_SLUG ?? 'phys.mech.torque'
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === slug)
  if (!l) throw new Error(`${slug} not found in ${subject}`)

  const sessionId = await createSession(cookie, subject)
  const rows: Row[] = []
  const rec = (said: string, p: TurnPayload) => {
    const r: Row = {
      said,
      text: (p.text ?? '').replace(/\s+/g, ' ').trim(),
      mcq: p.mcq?.question ?? null,
      mastery: p.mastery ?? null,
      figure: carriesFigure(p),
    }
    rows.push(r)
    const flag = PROMISES(r.text) && !r.mcq ? '  *** ANNOUNCED WITHOUT ARTIFACT ***' : ''
    console.log(`\n> ${said}\n  mcq=${r.mcq ? JSON.stringify(r.mcq.slice(0, 60)) : 'none'}${flag}\n  ${r.text.slice(0, 220)}`)
    return p
  }

  rec('(open)', await openLesson(cookie, sessionId, {
    lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: slug,
    unitTitle: l.unitTitle, totalLessons: (curr.lessons ?? []).length,
  }))

  // A. quiz request  B. simplification request  — both DELIVERY requests
  let p = rec('Give me a quiz question.', await say(cookie, sessionId, 'Give me a quiz question.'))
  rec('Explain that simpler please.', await say(cookie, sessionId, 'Explain that simpler please.'))

  // C. a substantive typed answer to whatever is active
  const active = rows.map((r) => r.mcq).filter(Boolean).pop()
  p = rec('I think it is the one about the pivot distance times the force',
    await say(cookie, sessionId, 'I think it is the one about the pivot distance times the force'))

  // D/E. acknowledgement, then a repeated cooperative answer
  rec('ok', await say(cookie, sessionId, 'ok'))
  rec('yes I understand', await say(cookie, sessionId, 'yes I understand'))

  // F. the Torque shape: cooperative learner repeatedly signalling readiness
  for (const m of ['I am ready to answer', 'ask me the question', 'go ahead']) {
    rec(m, await say(cookie, sessionId, m))
  }

  console.log('\n================ RESULT ================')
  const stranded = rows.filter((r) => PROMISES(r.text) && !r.mcq)
  const empty = rows.filter((r) => !r.text && !r.mcq)
  const tags = rows.filter((r) => TAG.test(r.text))
  const phantom = rows.filter((r) => REFERS_TO_A_FIGURE.test(r.text) && !r.figure)
  const served = rows.map((r) => r.mcq).filter(Boolean) as string[]
  console.log(`turns                       : ${rows.length}`)
  console.log(`ANNOUNCED WITHOUT ARTIFACT  : ${stranded.length}   ${stranded.length === 0 ? 'PASS' : 'FAIL'}`)
  console.log(`turns with no next action   : ${empty.length}   ${empty.length === 0 ? 'PASS' : 'FAIL'}`)
  console.log(`internal tags leaked        : ${tags.length}   ${tags.length === 0 ? 'PASS' : 'FAIL'}`)
  console.log(`figure referenced, none sent: ${phantom.length}   ${phantom.length === 0 ? 'PASS' : 'FAIL'}`)
  for (const r of phantom) console.log(`   phantom: ${JSON.stringify(r.text.slice(0, 160))}`)
  console.log(`probes served / distinct    : ${served.length} / ${new Set(served).size}`)
  console.log(`final mastery               : ${JSON.stringify(rows[rows.length - 1].mastery)}`)
  console.log(`active question at C        : ${active ? JSON.stringify(active.slice(0, 60)) : 'none'}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
