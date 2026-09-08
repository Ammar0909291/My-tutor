/**
 * LIVE VERIFICATION, two independent things.
 *
 * A. A concept where no honest figure can be produced still DECLINES rather
 *    than claiming one — the other half of "never say a diagram was shown".
 * B. DEFECT 2's assessment invariant, from the server's side: an authored probe
 *    that is served and NOT answered stays pending, is re-offered, consumes
 *    nothing and moves no mastery counter. Closing the Quick Check window sends
 *    nothing to the server, so this is exactly the state a close leaves behind,
 *    and it is the strongest statement production can make about it.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

const CLAIMS = /\b(?:the\s+)?(?:diagram|figure|graph|picture|chart)\b[^.]{0,50}\b(?:shows?|represents?|depicts?|illustrates?)\b|\b(?:here|above|below)\s+you\s+(?:can\s+)?see\b|\bin\s+the\s+(?:figure|diagram|graph|picture)\b/i

async function lesson(cookie: string, subject: string, slug: string) {
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === slug)
  if (!l) throw new Error(`${slug} not found`)
  return { l, total: (curr.lessons ?? []).length }
}

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)

  // ── A ─────────────────────────────────────────────────────────────────────
  const subjectA = process.env.QA_SUBJECT_A ?? 'chemistry'
  const slugA = process.env.QA_SLUG_A ?? 'chem.org.resonance'
  const { l: la, total: ta } = await lesson(cookie, subjectA, slugA)
  const sa = await createSession(cookie, subjectA)
  await openLesson(cookie, sa, { lessonTitle: la.lessonTitle, lessonOrder: la.order, topicSlug: slugA, unitTitle: la.unitTitle, totalLessons: ta })
  const askA = await say(cookie, sa, 'Show me a diagram')
  const textA = (askA.text ?? '').replace(/\s+/g, ' ')
  console.log(`\n=== A. no-figure concept (${slugA})`)
  console.log(`  figure=${carriesFigure(askA) ? figureLabel(askA) : 'NONE'}  prose-claims-a-figure=${!carriesFigure(askA) && CLAIMS.test(textA)}`)
  console.log(`  ${textA.slice(0, 200)}`)

  // ── B ─────────────────────────────────────────────────────────────────────
  const subjectB = process.env.QA_SUBJECT_B ?? 'chemistry'
  const slugB = process.env.QA_SLUG_B ?? 'chem.elect.galvanic-cell'
  const { l: lb, total: tb } = await lesson(cookie, subjectB, slugB)
  const sb = await createSession(cookie, subjectB)
  const rows: { said: string; q: string | null; mastery: unknown }[] = []
  const push = (said: string, p: TurnPayload) => rows.push({
    said, q: p.mcq?.question ?? null, mastery: p.mastery ?? null,
  })
  push('(open)', await openLesson(cookie, sb, { lessonTitle: lb.lessonTitle, lessonOrder: lb.order, topicSlug: slugB, unitTitle: lb.unitTitle, totalLessons: tb }))
  push('ok', await say(cookie, sb, 'ok'))
  // Never answer. This is the state a closed Quick Check window leaves behind.
  for (const m of ['hold on, let me re-read that', 'still thinking', 'one moment', 'ok what was the question again']) {
    push(m, await say(cookie, sb, m))
  }
  console.log(`\n=== B. an unanswered probe across ${rows.length} turns (${slugB})`)
  for (const r of rows) console.log(`  > ${r.said}\n    q=${r.q ? JSON.stringify(r.q.slice(0, 70)) : 'none'}  mastery=${JSON.stringify(r.mastery)}`)
  const asked = rows.map((r) => r.q).filter(Boolean) as string[]
  const distinct = new Set(asked)
  const last = rows[rows.length - 1].mastery as { verified?: boolean; checkCorrect?: number; practiceCorrect?: number } | null
  console.log(`\n  probes served=${asked.length} distinct=${distinct.size} (1 means the pending probe was re-offered, not consumed)`)
  console.log(`  mastery verified=${last?.verified} check=${last?.checkCorrect} practice=${last?.practiceCorrect} (must be false/0/0 — nothing was answered)`)
}
main().catch((e) => { console.error(e); process.exit(1) })
