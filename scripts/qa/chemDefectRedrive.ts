/**
 * Re-drive of chemistry lessons after the CHEM Batch A–F fixes, on a
 * DISPOSABLE account, with the real-learner persona's own messages. Each lesson
 * gets its own session with its own tabId, as a browser tab does. Flags each
 * reply's observable defect signature and writes the full transcript.
 *
 *   QA_ORDERS=115,151,78 QA_OUT=/tmp/claude-0/sp/chem-redrive.txt npx tsx scripts/qa/chemDefectRedrive.ts
 *
 * Flags (a pointer for a reader, never a verdict):
 *   leak        card markup / answer key in text            (CHEM-032, 143)
 *   covers      "X covers:" syllabus line                    (CHEM-064)
 *   closeOpen   lesson-closing format in the opening         (CHEM-027)
 *   table       markdown pipe table                          (CHEM-065)
 *   caret       ^{ } / _{ } / X_4 notation outside math       (CHEM-129)
 *   caps        3+ ALL-CAPS emphasis words                   (CHEM-003)
 *   presuppose  "How did you decide…" after ok/a request    (CHEM-079)
 *   empathyRep  empathy opener in two consecutive replies    (CHEM-041)
 *   picPretend  picture question, no figure, no "no picture" (CHEM-036)
 *   long        "too many words" answered longer / with card (CHEM-001)
 *   noNumbers   "with numbers" answered with < 2 numbers     (CHEM-015)
 *   noSteps     "step by step" answered with < 2 step lines  (CHEM-015)
 *   lateVerdict "Not quite" present but not first            (CHEM-028)
 *   degraded    provider=degraded
 */
import { writeFileSync } from 'fs'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, figureLabel, type TurnPayload } from './liveSession'

const SUBJECT = 'chemistry'
const ORDERS = (process.env.QA_ORDERS ?? '115,151,78').split(',').map(Number)
const OUT = process.env.QA_OUT ?? '/tmp/claude-0/sp/chem-redrive.txt'
const THINK_MS = Number(process.env.QA_THINK_MS ?? 2500)

const BEATS = [
  'ok',
  'i dont understand this picture. what is it showing?',
  'too many words',
  'give me example with numbers',
  'show me step by step',
  'quiz me',
  '@card-wrong',
  'ok',
  'quiz me',
  '@card-right',
  'explain simpler',
  'next question please',
  '@card-right',
]

const words = (s: string) => (s.match(/\S+/g) ?? []).length
const EMPATHY = /genuinely tricky|i hear you|completely normal|can feel (?:overwhelming|tricky|confusing)|slow (?:right )?down/i

function flags(p: TurnPayload, learner: string, prevTutor: string, figureSeen: boolean): string[] {
  const t = String(p.text ?? '')
  const outsideMath = t.replace(/\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$/g, '')
  const f: string[] = []
  if (/correct="|<!"|<!--MCQ/i.test(t)) f.push('leak')
  if (/\bcovers:/.test(t)) f.push('covers')
  if (/^\s*\|.*\|\s*$/m.test(t)) f.push('table')
  if (/\^\{|_\{|\b[A-Z][a-z]?_\d/.test(outsideMath)) f.push('caret')
  if ((t.match(/\b[A-Z]{5,}\b/g) ?? []).filter((w) => !/^(?:VSEPR|IUPAC|HOMO|LUMO|NADPH)$/.test(w)).length >= 3) f.push('caps')
  if (/^(?:ok|show me step by step|give me example.*|explain simpler)$/i.test(learner) && /how did you decide|walk me through how you/i.test(t)) f.push('presuppose')
  if (EMPATHY.test(t.split(/(?<=[.!?])\s/)[0] ?? '') && EMPATHY.test(prevTutor.split(/(?<=[.!?])\s/)[0] ?? '')) f.push('empathyRep')
  if (/this picture/i.test(learner) && !figureSeen && !figureLabel(p) && !/no picture|no figure|don.t have a (?:picture|figure)/i.test(t)) f.push('picPretend')
  if (learner === 'too many words' && (p.mcq || (words(t) > 60 && words(t) > words(prevTutor) * 0.6))) f.push('long')
  if (/with numbers/.test(learner) && (t.match(/\d+(?:[.,]\d+)?/g) ?? []).length < 2) f.push('noNumbers')
  if (/step by step/.test(learner) && (t.match(/^\s*(?:(?:step\s*)?\d+\s*[.):—-]|[-•*]\s+\S)/gim) ?? []).length < 2) f.push('noSteps')
  if (/not quite/i.test(t) && !/^\s*not quite/i.test(t)) f.push('lateVerdict')
  if (p.provider === 'degraded') f.push('degraded')
  return f
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

let acct: QaAccount | null = null
async function main() {
  acct = await createQaAccount('chem-redrive')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'My English is not so good. I know basic chemistry.' }),
  })
  console.log(`onboarding ${ob.status}`)
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const log: string[] = []
  const tally: Record<string, number> = {}
  const perLesson: Array<{ order: number; slug: string; turns: number; figure: boolean; flags: string[] }> = []
  let turns = 0
  for (const order of ORDERS) {
    const l = lessons.find((x) => x.order === order)
    if (!l) { log.push(`order ${order}: not in curriculum`); continue }
    const sid = await createSession(cookie, SUBJECT, `redrive-${order}-${Date.now()}`)
    const open = await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    const openText = String(open.text ?? '')
    const lf: string[] = []
    if (/What you mastered|What's coming/i.test(openText)) lf.push('closeOpen')
    if (/\bcovers:/.test(openText)) lf.push('covers')
    let figureSeen = !!figureLabel(open)
    log.push(`\n=== order ${order} ${l.topicSlug} ===\n[open provider=${open.provider} fig=${figureLabel(open) ?? 'none'} flags=${lf.join(',') || '-'}]\n${openText}`)
    let card: TurnPayload['mcq'] = open.mcq ?? null
    let prevTutor = openText
    let n = 0
    for (const beat of BEATS) {
      let msg = beat
      if (beat.startsWith('@card')) {
        if (!card) continue
        // Without the key the persona picks by position: "right" = first, "wrong" = last.
        msg = beat === '@card-right' ? card.options[0] : card.options[card.options.length - 1]
      }
      await sleep(THINK_MS)
      let p: TurnPayload
      try { p = await say(cookie, sid, msg) } catch (e) { log.push(`[learner] ${msg}\n[error] ${String(e).slice(0, 200)}`); continue }
      turns++; n++
      const f = flags(p, msg, prevTutor, figureSeen)
      if (figureLabel(p)) figureSeen = true
      for (const x of f) { tally[x] = (tally[x] ?? 0) + 1; lf.push(x) }
      card = p.mcq ?? null
      prevTutor = String(p.text ?? '')
      log.push(`[learner] ${msg}\n[tutor provider=${p.provider} fig=${figureLabel(p) ?? 'none'} card=${p.mcq ? JSON.stringify(p.mcq.question.slice(0, 140)) + ' ' + JSON.stringify(p.mcq.options.map((o) => o.slice(0, 40))) : 'none'} flags=${f.join(',') || '-'}]\n${p.text ?? ''}`)
    }
    for (const x of lf) if (x === 'closeOpen' || x === 'covers') tally[x] = (tally[x] ?? 0) + 1
    perLesson.push({ order, slug: l.topicSlug, turns: n, figure: figureSeen, flags: lf })
    writeFileSync(OUT, log.join('\n'))
  }
  writeFileSync(OUT, log.join('\n'))
  console.log(JSON.stringify({ lessons: perLesson.length, turns, flags: tally, transcript: OUT }))
  for (const x of perLesson) console.log(JSON.stringify(x))
}

for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) await deleteQaAccount(acct); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
