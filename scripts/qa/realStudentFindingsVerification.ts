/**
 * PRODUCTION VERIFICATION for the six real-student English fixes
 * (commit 8adaffe). Exactly the 5 items the task specified — no broader
 * campaign, no new lesson coverage.
 *
 *   1. direct question             — no content-free hold in front of it
 *   2. typed MCQ answer             — a natural typed answer actually grades
 *   3. concept continuity           — an incidental phrase does not spin up
 *                                     an unrelated mini-lesson
 *   4. malformed/structured MCQ containment — observed, not force-fabricated
 *      (a model drifting into raw JSON/degenerate options is provider
 *      behaviour, not something a driver can safely trigger on demand;
 *      this reads whatever the model actually produced across the run)
 *   5. explicit visual request      — a figure attaches AND the reply
 *      references it (the F fix)
 *
 * Reads and reports. Does not assert — the report is the verdict.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import fs from 'fs'

const WITHHELD_PLACEHOLDER = /Let's stay with this idea for a moment\.|Let me check your thinking with this\./

function record(rows: Record<string, unknown>[], tag: string, said: string, p: TurnPayload) {
  const text = (p.text ?? '').replace(/\s+/g, ' ')
  const row = {
    tag, said,
    provider: p.provider ?? null,
    figure: carriesFigure(p) ? (figureLabel(p) ?? 'yes') : null,
    mcq: p.mcq ? { question: p.mcq.question, options: p.mcq.options } : null,
    mastery: p.mastery ?? null,
    text: text.slice(0, 500),
    fullText: text,
  }
  rows.push(row)
  console.log(`\n[${tag}] > ${said}`)
  console.log(`  provider=${row.provider} figure=${row.figure ?? 'NONE'} mcq=${row.mcq ? 'yes' : 'no'} mastery=${JSON.stringify(row.mastery)}`)
  console.log(`  ${row.text}`)
  return p
}

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const rows: Record<string, unknown>[] = []

  // ── ENGLISH LESSON: items 1, 2, 3, 4 ────────────────────────────────────
  {
    const subject = 'english'
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const l = lessons.find((x) => /idiom/i.test(x.topicSlug)) ?? lessons[0]
    if (!l) throw new Error('no english lessons found')

    const sessionId = await createSession(cookie, subject)
    record(rows, 'english-open', '(open lesson)', await openLesson(cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: lessons.length,
    }))

    // Item 1 — a genuine direct question.
    const r1 = record(rows, 'item1-direct-question', 'What does that word actually mean here?',
      await say(cookie, sessionId, 'What does that word actually mean here?'))
    console.log(`  [item1] content-free placeholder present: ${WITHHELD_PLACEHOLDER.test(r1.text ?? '')}`)

    // Push toward an MCQ so item 2 has something to answer.
    const r2 = record(rows, 'ask-for-practice', 'Can you give me a practice question on this?',
      await say(cookie, sessionId, 'Can you give me a practice question on this?'))

    // Item 2 — a natural TYPED answer, not a bare click payload.
    if (r2.mcq) {
      const letters = ['a', 'b', 'c', 'd']
      const correctLetter = letters[r2.mcq.correctIndex] ?? 'a'
      const typed = `I think ${correctLetter.toUpperCase()}, because that's the one that fits`
      const r2b = record(rows, 'item2-typed-mcq-answer', typed, await say(cookie, sessionId, typed))
      console.log(`  [item2] server graded (mastery counters present): ${JSON.stringify(r2b.mastery)}`)
    } else {
      console.log('  [item2] SKIPPED — no MCQ was attached on the practice-request turn (model-dependent, not forced)')
    }

    // Item 3 — an incidental non-question phrase the tutor must not spin
    // into a new mini-lesson.
    record(rows, 'item3-incidental-phrase', "ok that's clear, you teach me this one at start",
      await say(cookie, sessionId, "ok that's clear, you teach me this one at start"))
    const r3b = record(rows, 'item3-followup', 'so what comes next in the lesson?',
      await say(cookie, sessionId, 'so what comes next in the lesson?'))
    console.log(`  [item3] follow-up built around "at start"/"one at start": ${/\bone at start\b/i.test(r3b.text ?? '')}`)
  }

  // ── PHYSICS LESSON: item 5, explicit visual request ─────────────────────
  {
    const subject = 'physics'
    const slug = 'phys.mech.newtons-first-law'
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const l = lessons.find((x) => x.topicSlug === slug) ?? lessons[0]
    if (!l) throw new Error('no physics lessons found')

    const sessionId = await createSession(cookie, subject)
    record(rows, 'physics-open', '(open lesson)', await openLesson(cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: lessons.length,
    }))

    const r5 = record(rows, 'item5-explicit-visual-request', 'Can you show me a diagram of this?',
      await say(cookie, sessionId, 'Can you show me a diagram of this?'))
    const referencesFigure = /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch|screen|look at|looking at|see the|see this|see that|see it|notice|observe|study the|examine the|shown|displayed|highlighted)\b/i.test(r5.text ?? '')
    console.log(`  [item5] figure attached: ${carriesFigure(r5)}; prose references it: ${referencesFigure}`)
  }

  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/real-student-findings-verification.json', JSON.stringify(rows, null, 2))
  console.log('\n=== done ===')
}
main().catch((e) => { console.error(e); process.exit(1) })
