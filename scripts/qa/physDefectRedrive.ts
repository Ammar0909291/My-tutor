/**
 * Re-drive of the PHYS-001..PHYS-024 lessons on a DISPOSABLE account, after the
 * fixes, with the real-learner persona's own messages. Flags each defect's
 * observable signature per reply and writes the full transcript for reading.
 *
 *   QA_ORDERS=71,72,134,237,55,30,9 npx tsx scripts/qa/physDefectRedrive.ts
 *
 * Flags (a flag is a pointer for a reader, never a verdict):
 *   leak        raw card markup / answer key in text           (PHYS-023)
 *   showingDef  defines the word "show(ing)" / "what a picture is" (PHYS-021, PHYS-001)
 *   simplest    "Let me put it in the simplest words I have."  (PHYS-019)
 *   stock       the old content-free degraded template          (PHYS-022/024)
 *   degraded    provider=degraded (any copy)
 *   stuck       "feeling stuck" after "i already said this"     (PHYS-008)
 */
import { writeFileSync } from 'fs'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, figureLabel, type TurnPayload } from './liveSession'

const SUBJECT = 'physics'
const ORDERS = (process.env.QA_ORDERS ?? '71,72,134,237,55,30,9').split(',').map(Number)
const OUT = process.env.QA_OUT ?? '/tmp/claude-0/sp/redrive.txt'

const BEATS = [
  'ok',
  'i dont understand this picture. what is the picture showing?',
  'yes',
  'give me example',
  'ok. give me example with numbers please',
  'explain simpler',
  'quiz me',
  '@card-wrong',
  'quiz me',
  '@card-right',
  'ok i understand. next question please',
  '@card-right',
]
const BEATS_237 = [
  'ok',
  'this one is hard for me. can you give me example first, a simple one with a fast spaceship?',
  'explain simpler. what is gamma and how i get 1.25?',
  'quiz me',
  '@card-right',
  'i dont understand this picture. what is it showing?',
  'ok i understand. next question please',
  '@card-right',
]

function flags(p: TurnPayload, prevLearner: string): string[] {
  const t = String(p.text ?? '')
  const f: string[] = []
  if (/correct="|<!"|<!--MCQ/i.test(t)) f.push('leak')
  if (/(?:'|"|“)show(?:ing)?(?:'|"|”)|what (?:'|")?showing(?:'|")? means|a picture is a visual representation/i.test(t)) f.push('showingDef')
  if (/simplest words I have/i.test(t)) f.push('simplest')
  if (/one small step together|We can continue from here/i.test(t)) f.push('stock')
  if (p.provider === 'degraded') f.push('degraded')
  if (/already said/i.test(prevLearner) && /feeling stuck/i.test(t)) f.push('stuck')
  return f
}

let acct: QaAccount | null = null
async function main() {
  acct = await createQaAccount('phys-redrive')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'My English is not so good. I know basic physics.' }),
  })
  console.log(`onboarding ${ob.status}`)
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const log: string[] = []
  const tally: Record<string, number> = {}
  let turns = 0
  for (const order of ORDERS) {
    const l = lessons.find((x) => x.order === order)
    if (!l) { log.push(`order ${order}: not in curriculum`); continue }
    const sid = await createSession(cookie, SUBJECT, `redrive-${order}-${Date.now()}`)
    const open = await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    log.push(`\n=== order ${order} ${l.topicSlug} ===\n[open] fig=${figureLabel(open) ?? 'none'}\n${open.text ?? ''}`)
    let card: TurnPayload['mcq'] = open.mcq ?? null
    for (const beat of order === 237 ? BEATS_237 : BEATS) {
      let msg = beat
      if (beat.startsWith('@card')) {
        if (!card) continue
        // Without the key the persona picks by position: "right" = first, "wrong" = last.
        msg = beat === '@card-right' ? card.options[0] : card.options[card.options.length - 1]
      }
      let p: TurnPayload
      try { p = await say(cookie, sid, msg) } catch (e) { log.push(`[learner] ${msg}\n[error] ${String(e).slice(0, 200)}`); continue }
      turns++
      const f = flags(p, msg)
      for (const x of f) tally[x] = (tally[x] ?? 0) + 1
      card = p.mcq ?? null
      log.push(`[learner] ${msg}\n[tutor provider=${p.provider} fig=${figureLabel(p) ?? 'none'} card=${p.mcq ? JSON.stringify(p.mcq.question.slice(0, 120)) : 'none'} flags=${f.join(',') || '-'}]\n${p.text ?? ''}`)
    }
  }
  writeFileSync(OUT, log.join('\n'))
  console.log(JSON.stringify({ lessons: ORDERS.length, turns, flags: tally, transcript: OUT }))
}

for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) await deleteQaAccount(acct); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
