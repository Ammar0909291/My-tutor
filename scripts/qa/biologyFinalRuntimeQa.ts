/**
 * BIOLOGY FINAL RUNTIME QA — the diagram path, live, per figure family.
 *
 * For one concept of every Biology figure family (hub, comparison, pathway,
 * structure) plus the two concepts with a recorded history of visual defects
 * (bio.immuno.immune-disorders once returned an EMPTY tutor turn to an
 * explicit diagram request; bio.plant.photosynthesis once never served its
 * figure at all), it opens the real lesson on a DISPOSABLE account and asks
 * for a diagram, the way the "Give me a diagram" quick action does, and
 * records what the learner would get:
 *
 *   - a figure at all (any renderer), and whether it is THIS concept's figure;
 *   - non-empty tutor text;
 *   - whether the text claims a figure the payload does not carry;
 *   - whether the text calls a straight-line figure "curved" (the contract
 *     defect fixed 2026-09-27).
 *
 * It reads and records; the verdict is the table it prints plus the raw turns
 * in QA_OUT. Deletes its account at the end (nothing here needs a DB
 * cross-check afterwards).
 *
 * Run: QA_OUT=/tmp/bio-final-qa npx tsx scripts/qa/biologyFinalRuntimeQa.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const OUT = process.env.QA_OUT ?? '/tmp/bio-final-qa'
const DIAGRAM_PROMPT = 'Can you give me a diagram to visualize this?'

const TARGETS: { conceptId: string; family: string }[] = [
  { conceptId: 'bio.found.what-is-biology', family: 'hub' },
  { conceptId: 'bio.found.five-kingdom', family: 'comparison (5 groups)' },
  { conceptId: 'bio.repro.asexual-reproduction', family: 'comparison (6 groups)' },
  { conceptId: 'bio.cell.cell-cycle', family: 'pathway (cyclic)' },
  { conceptId: 'bio.cell.prokaryotic-cell', family: 'structure' },
  { conceptId: 'bio.found.biomes-levels-of-organisation', family: 'pathway (12 stages)' },
  { conceptId: 'bio.immuno.immune-disorders', family: 'history: empty turn' },
  { conceptId: 'bio.plant.photosynthesis', family: 'history: no figure' },
]

interface CurriculumLesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

function claimsVisual(text: string): boolean {
  return /\b(here'?s|see|look at|shown|showing|below is|the diagram|the figure|on your screen)\b.{0,40}\b(diagram|figure|visual|illustration|picture)\b/i.test(text)
}

function sceneIdOf(p: TurnPayload): string | null {
  const s = p.sceneSpec as { id?: string } | undefined
  return typeof s?.id === 'string' ? s.id : null
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const acct = await createQaAccount('bio-final')
  console.log(`BASE=${BASE} account=${acct.email}`)
  try {
    const ob = await fetch(`${BASE}/api/onboarding`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie: acct.cookie },
      body: JSON.stringify({ subjectSlug: 'biology', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en',
        selfDescription: 'I am studying biology and want to understand each topic properly.' }),
    })
    if (!ob.ok) throw new Error(`onboarding -> HTTP ${ob.status}`)
    const r = await fetch(`${BASE}/api/curriculum?subject=biology`, { headers: { cookie: acct.cookie } })
    const lessons = ((await r.json()) as { lessons?: CurriculumLesson[] }).lessons ?? []

    const rows: string[] = []
    for (const t of TARGETS) {
      const lesson = lessons.find((l) => l.topicSlug === t.conceptId)
      if (!lesson) { rows.push(`${t.conceptId}: NO LESSON`); continue }
      const sessionId = await createSession(acct.cookie, 'biology')
      const open = await openLesson(acct.cookie, sessionId, {
        lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order, topicSlug: lesson.topicSlug,
        unitTitle: lesson.unitTitle, totalLessons: lessons.length,
      })
      const started = Date.now()
      const p = await say(acct.cookie, sessionId, DIAGRAM_PROMPT)
      const ms = Date.now() - started
      const text = (p.text ?? '').trim()
      const sceneId = sceneIdOf(p)
      const own = sceneId ? sceneId.endsWith(t.conceptId) : null
      const figure = carriesFigure(p)
      const claimedWithout = claimsVisual(text) && !figure
      // Hub, comparison and structure figures are drawn with straight connectors only.
      const curvedStraight = /^cell-(hub|comparison|structure)-/.test(sceneId ?? '') && /\bcurv/i.test(text)
      writeFileSync(join(OUT, `${t.conceptId}.json`), JSON.stringify({ family: t.family, open, reply: p }, null, 2))
      const row = `${t.conceptId.padEnd(44)} ${t.family.padEnd(22)} figure=${figure ? (figureLabel(p) ?? 'yes') : 'NONE'} own=${own} textChars=${text.length} ${ms}ms` +
        `${text ? '' : '  !! EMPTY TEXT'}${claimedWithout ? '  !! CLAIMS FIGURE WITHOUT ONE' : ''}${curvedStraight ? '  !! CALLS STRAIGHT LINES CURVED' : ''}`
      console.log(row)
      rows.push(row)
    }
    writeFileSync(join(OUT, 'summary.txt'), rows.join('\n'))
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`account deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', (e as Error).message); process.exit(1) })
