/**
 * LIVE CHECK — authored quiz options are no longer served correct-first.
 *
 * The authored corpus lists the correct choice first in 6,280 of 6,281 items;
 * until 2026-09-27 that order was served, so "tap A" passed every gate.
 * probeToMcq now presents a question-keyed permutation. This drives a few
 * Biology lessons on the DEPLOYED app, collects every authored quiz served,
 * and reports where the authored-correct option sat. It also taps the
 * authored-correct option once to confirm the grade still follows the key.
 *
 * Disposable account only (liveAccount.ts), deleted at the end. No password is
 * written anywhere.
 *
 * Run: npx tsx scripts/qa/probeOptionOrderLive.ts [lessonCount=4]
 */
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { BIOLOGY_PROBES } from '../../src/lib/teaching/assets/biologySeedAssets'
import { BIOLOGY_DEPTH_PROBES } from '../../src/lib/teaching/assets/biologyDepthSeedAssets'
import { BIOLOGY_EXTENSION_PROBES } from '../../src/lib/teaching/assets/biologyExtensionSeedAssets'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
const AUTHORED = new Map(
  [...BIOLOGY_PROBES, ...BIOLOGY_DEPTH_PROBES, ...BIOLOGY_EXTENSION_PROBES]
    .filter((p) => (p.choices?.length ?? 0) >= 2)
    .map((p) => [norm(stripAuthoringLabel(p.stem)), p] as const),
)

interface Lesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

async function onboard(cookie: string) {
  const r = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: 'biology', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am studying biology.' }),
  })
  if (!r.ok) throw new Error(`onboarding ${r.status}`)
}

async function main() {
  const lessonCount = Number(process.argv[2] ?? 4)
  let acct: QaAccount | null = null
  const rows: Array<{ concept: string; authoredFirst: boolean; servedCorrectAt: number; n: number; sameOrder: boolean }> = []
  let graded: { sent: string; correct: unknown } | null = null
  try {
    acct = await createQaAccount('option-order')
    await onboard(acct.cookie)
    const cur = await fetch(`${BASE}/api/curriculum?subject=biology`, { headers: { cookie: acct.cookie } })
    const lessons = (((await cur.json()) as { lessons?: Lesson[] }).lessons ?? []).slice(0, lessonCount)
    for (const l of lessons) {
      const sid = await createSession(acct.cookie, 'biology')
      await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
      const seen = new Set<string>()
      for (const msg of ['ok, continue', 'got it, continue', 'quiz me', 'ok', 'give me a practice question', 'continue', 'quiz me']) {
        const p: TurnPayload = await say(acct.cookie, sid, msg)
        const q = p.mcq
        if (!q || seen.has(q.question)) continue
        seen.add(q.question)
        const probe = AUTHORED.get(norm(q.question))
        if (!probe) { console.log(`  ${l.topicSlug}: ad-hoc quiz (not authored) — skipped`); continue }
        const authored = probe.choices!.map((c) => c.text.trim())
        const correct = probe.choices!.find((c) => c.isCorrect)!.text.trim()
        const at = q.options.indexOf(correct)
        rows.push({ concept: probe.conceptId, authoredFirst: authored[0] === correct, servedCorrectAt: at, n: q.options.length, sameOrder: JSON.stringify(authored) === JSON.stringify(q.options) })
        console.log(`  ${probe.conceptId}: ${q.options.length} options, authored-correct served at ${'ABCD'[at] ?? '?'}${JSON.stringify(authored) === JSON.stringify(q.options) ? ' (authored order)' : ''}`)
        if (!graded && at >= 0) {
          const g = await say(acct.cookie, sid, correct)
          graded = { sent: `${'ABCD'[at]} (authored-correct)`, correct: g.mastery ?? g.text?.slice(0, 120) }
        }
      }
    }
  } finally {
    if (acct) console.log('cleanup:', JSON.stringify(await deleteQaAccount(acct)))
  }
  const firstWins = rows.filter((r) => r.servedCorrectAt === 0).length
  console.log(JSON.stringify({ authoredQuizzesSeen: rows.length, servedInAuthoredOrder: rows.filter((r) => r.sameOrder).length, correctServedAtA: firstWins, gradeAfterTappingCorrect: graded }, null, 2))
}

main().catch((e) => { console.error(e); process.exit(1) })
