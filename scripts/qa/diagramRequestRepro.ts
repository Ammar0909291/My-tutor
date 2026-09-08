/**
 * DEFECT 1 REPRODUCTION — an explicit diagram request on a concept with no
 * curated visual binding.
 *
 * Reads and reports. Two things are recorded per turn and they are DIFFERENT
 * questions: did a figure actually arrive on the wire, and did the tutor's own
 * prose CLAIM one had. A "yes" to the second with a "no" to the first is the
 * reported defect.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import fs from 'fs'

const ASKS = ['Show me diagram', 'Show me a diagram', 'Can you show me a picture?', 'Can you show me a diagram?']

// Prose that presents a figure to the learner. Crude on purpose: this is a
// reproduction instrument, not the product's guard.
const CLAIMS_A_FIGURE = /\b(?:the\s+)?(?:sloping\s+line|line|graph|diagram|figure|picture|chart|curve|arrow|axis|shaded\s+area|triangular\s+area)\b[^.]{0,60}\b(?:shows?|show|represents?|depicts?|illustrates?|you can see|is drawn|indicates?)\b|\b(?:here|above|below)\s+you\s+(?:can\s+)?see\b|\bin\s+the\s+(?:figure|diagram|graph|picture)\b/i

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const subject = process.env.QA_SUBJECT ?? 'physics'
  const slug = process.env.QA_SLUG ?? 'phys.em.energy-capacitor'

  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === slug)
  if (!l) throw new Error(`lesson ${slug} not found in ${subject}`)

  const sessionId = await createSession(cookie, subject)
  const rows: Record<string, unknown>[] = []
  const record = (said: string, p: TurnPayload) => {
    const text = (p.text ?? '').replace(/\s+/g, ' ')
    rows.push({
      said,
      figureOnWire: carriesFigure(p),
      figureTitle: figureLabel(p) ?? null,
      proseClaimsAFigure: CLAIMS_A_FIGURE.test(text),
      text: text.slice(0, 320),
    })
    console.log(`\n> ${said}\n  figure=${carriesFigure(p) ? (figureLabel(p) ?? 'Y') : 'NONE'}  prose-claims-figure=${CLAIMS_A_FIGURE.test(text)}\n  ${text.slice(0, 260)}`)
  }

  record('(open lesson)', await openLesson(cookie, sessionId, {
    lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: slug,
    unitTitle: l.unitTitle, totalLessons: (curr.lessons ?? []).length,
  }))
  for (const ask of ASKS) record(ask, await say(cookie, sessionId, ask))

  const out = { subject, slug, sessionId, rows }
  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/diagram-repro.json', JSON.stringify(out, null, 2))
  const shown = rows.filter((r) => r.figureOnWire).length
  const lied = rows.filter((r) => !r.figureOnWire && r.proseClaimsAFigure).length
  console.log(`\n=== ${slug}: figures on wire ${shown}/${rows.length}; prose claimed a figure with none attached on ${lied} turn(s)`)
}
main().catch((e) => { console.error(e); process.exit(1) })
