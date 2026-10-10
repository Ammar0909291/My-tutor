/**
 * Re-drive of chemistry (or QA_SUBJECT) lessons after the CHEM Batch A–F fixes, on a
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
 *   quizNoCard / twoOption / degradedCardSwap / repeatAnswered
 *               systemic re-checks (CHEM-061, 004, 048, 146, 033/017)
 *   picDescribe picture question, no figure seen, and the reply is not the
 *               honest no-picture reply or still describes a figure (Issue A, 2026-10-10)
 *   picDenied   picture question after a figure WAS shown, answered "no picture"
 *   picImagined picture question after a figure WAS shown, reply denies it or describes a typical/imagined one
 *   quizSilent  explicit quiz request, no card, and no honest "no question" line (Issue B)
 *   cardNotInCorpus  the served card's question is not an authored stem in
 *               src/lib/teaching/assets/* (replaces the unkeyedCard heuristic: the
 *               client payload never carries assetId, by design)
 *
 *   QA_BEATS=closure runs the final-defect-closure persona (picture questions,
 *   "quiz me" / "ask me a question" / "test my understanding" at the start,
 *   middle and end, repeated requests, "give me example").
 */
import { writeFileSync, readFileSync, readdirSync } from 'fs'
import { BASE, createQaAccount, deleteQaAccount, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, figureLabel, type TurnPayload } from './liveSession'
import { isOffLesson } from '../../src/lib/teaching/lessonDriftGuard'
import { isPlainAcknowledgement } from '../../src/lib/teaching/replyHygiene'
import { hasProseMultipleChoice } from '../../src/lib/teaching/proseMcqGuard'
import { usesAnalogy, analogyCapReached } from '../../src/lib/teaching/reuseCaps'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'
import { DENIES_OR_IMAGINES_FIGURE_RE } from '../../src/lib/teaching/figureReference'

const SUBJECT = process.env.QA_SUBJECT ?? 'chemistry'
const ORDERS = (process.env.QA_ORDERS ?? '').split(',').filter(Boolean).map(Number)
// QA_SLUGS=chem.found.matter,chem.bond.ionic-bonding — lessons by KG id instead of order.
const SLUGS = (process.env.QA_SLUGS ?? '').split(',').map((x) => x.trim()).filter(Boolean)
const OUT = process.env.QA_OUT ?? '/tmp/claude-0/sp/chem-redrive.txt'
const THINK_MS = Number(process.env.QA_THINK_MS ?? 2500)

const STANDARD_BEATS = [
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
const CLOSURE_BEATS = [
  'What is this picture showing?',          // no figure yet in the lesson
  'quiz me',                                // start of lesson
  '@card-right',
  'ok',
  'give me example',                        // BIO-024 shape (prose example)
  'i dont understand this picture. what is it showing?',
  'ask me a question',                      // middle
  '@card-wrong',
  'test my understanding',
  'quiz me',                                // repeated, card unanswered
  '@card-right',
  'show me a diagram',                      // a genuine figure, when the concept has one
  'i dont understand this picture. what is it showing?',
  'explain simpler',
  'give me a quiz',
  '@card-right',
  'quiz me',                                // end: pool likely spent
  'quiz me',
]
const BEATS = process.env.QA_BEATS === 'closure' ? CLOSURE_BEATS : STANDARD_BEATS

// Authored corpus: every probe stem in src/lib/teaching/assets/*.ts, string
// concatenations joined, lower-cased, whitespace collapsed.
const normStem = (t: string) => t.toLowerCase().replace(/^\s*\[[^\]]*\]\s*/, '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim()
const CORPUS: Array<{ file: string; text: string }> = readdirSync('src/lib/teaching/assets').filter((f) => f.endsWith('.ts'))
  .map((f) => ({ file: f, text: normStem(readFileSync(`src/lib/teaching/assets/${f}`, 'utf8').replace(/(['"`])\s*\+\s*\n?\s*(['"`])/g, '').replace(/\\'/g, "'")) }))
export function corpusFileOf(question: string): string | null {
  const q = normStem(question).slice(0, 70)
  return CORPUS.find((c) => c.text.includes(q))?.file ?? null
}
const QUIZ_REQUEST = /^(?:quiz me|ask me a question|test my understanding|give me a quiz)$/i
const HONEST_NO_QUESTION = /^(?:This is the question you have not answered yet|You have answered every practice question|I don't have a practice question I can give you)/
const FIGURE_DESCRIPTION = /\b(?:(?:the|this|that) (?:picture|figure|diagram|image|graph|drawing) (?:shows|has|is showing|displays)|(?:is|are) drawn|on the (?:horizontal|vertical|x|y)[- ]axis|usually shows?|normally shows?|curved arrow|colou?red (?:box|arrow|line))\b/i

const words = (s: string) => (s.match(/\S+/g) ?? []).length
const EMPATHY = /genuinely tricky|i hear you|completely normal|can feel (?:overwhelming|tricky|confusing)|slow (?:right )?down/i

function flags(p: TurnPayload, learner: string, prevTutor: string, figureSeen: boolean, conceptId = '', priorTutor: string[] = []): string[] {
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
  // Biology run signatures (BIO-002, 007, 014, 015, 039, 020, 001).
  if (/let(?:'|’)s pause/i.test(t) && !/^(?:ok|continue|next question please)$/i.test(learner)) f.push('pauseOnRequest')
  if (p.mcq && p.mcq.options.some((o) => /^(?:wrong|correct|incorrect)$/i.test(o.trim()))) f.push('verdictOption')
  if (p.mcq && p.mcq.options.some((o) => /\\\s*$/.test(o))) f.push('backslashOption')
  if (/(?:^|[.!?]\s+)The (?:learner|student)\b/.test(t)) f.push('thirdPerson')
  if (/\\\(\s*\d[^)]*[A-Za-z]{4,}/.test(t)) f.push('moneyAsMath')
  if (/beside this message/.test(t) && /beside this message/.test(prevTutor)) f.push('captionRepeat')
  if (/system is set up|wanted to first acknowledge|repeat(?:ing)? the (?:same|earlier) explanation/i.test(t)) f.push('metaTalk')
  // Systemic re-check signals (2026-10-06): CHEM-061, CHEM-004, CHEM-048.
  if (QUIZ_REQUEST.test(learner) && !p.mcq) f.push('quizNoCard')
  if (p.mcq && p.mcq.options.length === 2) f.push('twoOption')
  if (p.mcq && !corpusFileOf(p.mcq.question)) f.push('cardNotInCorpus')
  if (/picture/i.test(learner) && !figureSeen && !figureLabel(p)
    && (!/^There is no picture in this lesson yet/.test(t) || FIGURE_DESCRIPTION.test(t))) f.push('picDescribe')
  if (QUIZ_REQUEST.test(learner) && !p.mcq && !HONEST_NO_QUESTION.test(t)) f.push('quizSilent')
  if (/picture/i.test(learner) && (figureSeen || figureLabel(p)) && /^There is no picture in this lesson yet/.test(t)) f.push('picDenied')
  if (/picture/i.test(learner) && (figureSeen || figureLabel(p)) && DENIES_OR_IMAGINES_FIGURE_RE.test(t)) f.push('picImagined')
  // 2026-10-07 owner-decision pass (2350ff6): signatures each fix removes.
  if (hasProseMultipleChoice(t)) f.push('proseOptions')                                   // CHEM-048 / PHYS-020
  if (isPlainAcknowledgement(learner) && /^\s*(?:[A-Za-z][\w.-]{0,24},\s+)?(?:correct|that(?:'|’)?s (?:right|correct)|exactly right|well done|spot on)\b/i.test(t)) f.push('verdictOnAck') // CHEM-031
  const node = conceptId ? getKGNode(conceptId) : null
  if (node && isOffLesson({ learnerMessage: learner, reply: t, conceptTitle: node.title, conceptDescription: node.description })) f.push('drift') // CHEM-133 / BIO-023
  if (/general illustration related to the topic/i.test(t)) f.push('genericCaption')     // CHEM-034
  if (usesAnalogy(t) && analogyCapReached(priorTutor.slice(-3), 1)) f.push('analogyRepeat') // CHEM-040 / 055
  if (/let(?:'|’)s pause|on pause\b/i.test(t)) f.push('pause')                           // MATH-001 (stay until mastery)
  return f
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

let acct: QaAccount | null = null
async function main() {
  acct = await createQaAccount('chem-redrive')
  const cookie = acct.cookie
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: `My English is not so good. I know basic ${SUBJECT}.` }),
  })
  console.log(`onboarding ${ob.status}`)
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const log: string[] = []
  const tally: Record<string, number> = {}
  const perLesson: Array<{ order: number; slug: string; turns: number; figure: boolean; flags: string[] }> = []
  let turns = 0
  const targets = [...ORDERS.map((o) => lessons.find((x) => x.order === o)), ...SLUGS.map((sl) => lessons.find((x) => x.topicSlug === sl))]
  for (const l of targets) {
    if (!l) { log.push('lesson not in curriculum'); continue }
    const order = l.order
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
    const answered = new Set<string>()
    const priorTutor: string[] = [openText]
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
      const f = flags(p, msg, prevTutor, figureSeen, l.topicSlug, priorTutor)
      priorTutor.push(String(p.text ?? ''))
      if (figureLabel(p)) figureSeen = true
      for (const x of f) { tally[x] = (tally[x] ?? 0) + 1; lf.push(x) }
      // CHEM-146: a degraded reply that replaces an unanswered card.
      if (p.provider === 'degraded' && card && p.mcq && p.mcq.question !== card.question && !beat.startsWith('@card')) { f.push('degradedCardSwap'); tally.degradedCardSwap = (tally.degradedCardSwap ?? 0) + 1; lf.push('degradedCardSwap') }
      // CHEM-033/017: the same card shown again after it was answered.
      if (p.mcq && answered.has(p.mcq.question)) { f.push('repeatAnswered'); tally.repeatAnswered = (tally.repeatAnswered ?? 0) + 1; lf.push('repeatAnswered') }
      if (beat.startsWith('@card') && card) answered.add(card.question)
      card = p.mcq ?? null
      prevTutor = String(p.text ?? '')
      log.push(`[learner] ${msg}\n[tutor provider=${p.provider} fig=${figureLabel(p) ?? 'none'} card=${p.mcq ? JSON.stringify(p.mcq.question.slice(0, 140)) + ' ' + JSON.stringify(p.mcq.options.map((o) => o.slice(0, 40))) + ' corpus=' + (corpusFileOf(p.mcq.question) ?? 'NOT-FOUND') : 'none'} flags=${f.join(',') || '-'}]\n${p.text ?? ''}`)
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
