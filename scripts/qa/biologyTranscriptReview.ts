/**
 * LIVE TRANSCRIPT CAPTURE — what a Biology learner actually reads, per concept.
 *
 * Drives each named concept's real lesson on the DEPLOYED app with a scripted
 * learner who does the things real learners do (asks a "why", asks for a
 * diagram, answers quizzes, types a free answer) and writes every tutor turn
 * verbatim to <QA_OUT>/transcripts.md for a human/agent to read for defects.
 * Quizzes are answered by biologyAnswerPicker.ts (canonical-content grounded;
 * no answer key is read). It records, it does not judge.
 *
 * Disposable account only (liveAccount.ts), deleted at the end; no password
 * is written anywhere.
 *
 * Run: QA_OUT=/tmp/bio-transcripts npx tsx scripts/qa/biologyTranscriptReview.ts <conceptId ...>
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import { biologyCanonicalContent, pickAnswer, answerFreeResponse, proseOptions } from './biologyAnswerPicker'

interface Lesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

const SCRIPT = [
  'ok, let\'s start',
  'why does that matter?',
  'can you show me a diagram?',
  'ok, continue',
  'quiz me',
  'continue',
  'give me a practice question',
  'continue',
  'quiz me',
  'continue',
]

function row(n: number, sent: string, p: TurnPayload): string {
  const fig = carriesFigure(p) ? ` [figure: ${figureLabel(p) ?? 'yes'}]` : ''
  const mcq = p.mcq ? `\n\n    QUIZ: ${p.mcq.question}\n${p.mcq.options.map((o, i) => `      ${'ABCD'[i]}) ${o}`).join('\n')}` : ''
  const m = p.mastery ? ` [mastery ${p.mastery.phase} check=${p.mastery.checkCorrect} practice=${p.mastery.practiceCorrect}${p.mastery.verified ? ' VERIFIED' : ''}]` : ''
  return `**${n}. learner:** ${sent}\n\n**tutor** (${p.provider ?? '?'})${fig}${m}:\n\n${(p.text ?? '').trim() || '*(empty)*'}${mcq}\n`
}

async function main() {
  const out = process.env.QA_OUT ?? '/tmp/bio-transcripts'
  mkdirSync(out, { recursive: true })
  const concepts = process.argv.slice(2)
  let acct: QaAccount | null = null
  const md: string[] = []
  try {
    acct = await createQaAccount('bio-transcript')
    const r = await fetch(`${BASE}/api/onboarding`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie: acct.cookie },
      body: JSON.stringify({ subjectSlug: 'biology', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am studying biology and want to understand each topic properly.' }),
    })
    if (!r.ok) throw new Error(`onboarding ${r.status}`)
    const cur = await fetch(`${BASE}/api/curriculum?subject=biology`, { headers: { cookie: acct.cookie } })
    const lessons = ((await cur.json()) as { lessons?: Lesson[] }).lessons ?? []
    for (const conceptId of concepts) {
      const l = lessons.find((x) => x.topicSlug === conceptId)
      if (!l) { md.push(`## ${conceptId}\n\n*not in curriculum*\n`); continue }
      const content = biologyCanonicalContent(conceptId)
      const sid = await createSession(acct.cookie, 'biology')
      const open = await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
      md.push(`## ${conceptId} — ${l.lessonTitle}\n`, row(0, '(lesson opened)', open))
      let last = open
      let n = 1
      for (const scripted of SCRIPT) {
        let sent = scripted
        const prose = last.mcq ? null : proseOptions(last.text)
        if (last.mcq) sent = last.mcq.options[pickAnswer(last.mcq.question, last.mcq.options, content).index]
        else if (prose) sent = prose.options[pickAnswer(prose.question || (last.text ?? ''), prose.options, content).index]
        else if (/\?\s*$/.test((last.text ?? '').trim()) && scripted !== SCRIPT[1] && scripted !== SCRIPT[2]) sent = answerFreeResponse(last.text ?? '', content)
        last = await say(acct.cookie, sid, sent)
        md.push(row(n++, sent, last))
      }
      writeFileSync(join(out, 'transcripts.md'), md.join('\n'))
      console.log(`${conceptId}: ${n - 1} turns captured; final mastery ${JSON.stringify(last.mastery ?? null)}`)
    }
  } finally {
    writeFileSync(join(out, 'transcripts.md'), md.join('\n'))
    if (acct) console.log('cleanup:', JSON.stringify(await deleteQaAccount(acct)))
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
