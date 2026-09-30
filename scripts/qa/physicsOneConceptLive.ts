/**
 * LIVE — one Physics concept, start to verified mastery, on a real (fresh)
 * account supplied by the owner for this run.
 *
 * Credentials come ONLY from the environment of the invoking command
 * (QA_EMAIL, QA_PASSWORD) and are never printed, logged or written anywhere.
 * The account is NOT deleted — it belongs to the owner.
 *
 * Drives the first physics lesson (or QA_LESSON_INDEX, or the lesson for QA_CONCEPT):
 * optional QA_PROMPTS='a|b|c' overrides the learner's first turns (quizzes are still answered),
 * and QA_DUMP=<path> writes every figure payload served, for correctness checks.
 * answers each authored quiz from the seed key (tapping the served option),
 * except ONE deliberately wrong answer to check the correction carries a why.
 * Stops at verified mastery / lesson complete, or after QA_MAX_TURNS turns.
 * Prints every turn briefly plus a summary: figures shown, quiz options as
 * served (answer heads), grades, the wrong-answer reply, final mastery.
 *
 *   QA_EMAIL=… QA_PASSWORD=… npx tsx scripts/qa/physicsOneConceptLive.ts
 */
import { readdirSync } from 'fs'
import path from 'path'
import { BASE, login } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'
import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

type SeedProbe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
const short = (s: string | undefined, n = 160) => (s ?? '').replace(/\s+/g, ' ').slice(0, n)

async function physicsProbes(): Promise<Map<string, SeedProbe>> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const out = new Map<string, SeedProbe>()
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value) || !name.endsWith('PROBES')) continue
      for (const p of value as SeedProbe[]) if (p.subjectSlug === 'physics' && (p.choices?.length ?? 0) >= 2) out.set(norm(stripAuthoringLabel(p.stem)), p)
    }
  }
  return out
}

async function main() {
  const email = process.env.QA_EMAIL, password = process.env.QA_PASSWORD
  if (!email || !password) throw new Error('QA_EMAIL and QA_PASSWORD must be set in the environment')
  const lessonIndex = Number(process.env.QA_LESSON_INDEX ?? 0)
  const wantConcept = process.env.QA_CONCEPT ?? null
  const dumpPath = process.env.QA_DUMP ?? null
  const figurePayloads: Array<{ turn: string; payload: Record<string, unknown> }> = []
  const keepFigure = (turn: string, p: TurnPayload) => {
    if (!carriesFigure(p)) return
    const payload: Record<string, unknown> = {}
    for (const k of ['visual', 'visualSpec', 'sceneSpec', 'dynamicVisualizationCode']) if (p[k]) payload[k] = p[k]
    payload.text = p.text
    figurePayloads.push({ turn, payload })
  }
  const prompts = (process.env.QA_PROMPTS ?? '').split('|').map((x) => x.trim()).filter(Boolean)
  const maxTurns = Number(process.env.QA_MAX_TURNS ?? 24)
  const authored = await physicsProbes()

  const cookie = await login(email, password)
  console.log(`logged in to ${BASE} (credentials not shown)`)
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: 'physics', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am studying physics.' }),
  })
  console.log(`onboarding physics: ${ob.status}`)

  const cur = await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie } })
  const lessons = ((await cur.json()) as { lessons?: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons ?? []
  const l = wantConcept ? lessons.find((x) => x.topicSlug === wantConcept) : lessons[lessonIndex]
  if (!l) throw new Error(`no physics lesson at index ${lessonIndex} (got ${lessons.length})`)
  console.log(`lesson: ${l.topicSlug} — "${l.lessonTitle}" (${lessons.length} physics lessons)`)

  const sid = await createSession(cookie, 'physics')
  const opened = await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
  const figures: string[] = []
  if (carriesFigure(opened)) figures.push(`open: ${figureLabel(opened)}`)
  keepFigure('open', opened)
  console.log(`[open] provider=${opened.provider} ${short(opened.text)}`)

  let last: TurnPayload = opened
  let wrongDone = false
  const quizzes: Array<{ question: string; served: string[]; heads: boolean; answered: string; intended: 'right' | 'wrong'; gradedCorrect: unknown }> = []
  let wrongReply = ''
  for (let turn = 1; turn <= maxTurns; turn++) {
    const q = last.mcq
    let msg = prompts[turn - 1] ?? (turn === 2 ? 'show me a diagram' : 'quiz me')
    let intended: 'right' | 'wrong' | null = null
    let probe: SeedProbe | undefined
    if (q) {
      probe = authored.get(norm(q.question))
      if (probe) {
        const expected = probeToMcq({ stem: probe.stem, choices: probe.choices as never, conceptId: probe.conceptId })!
        const correctServed = expected.options[expected.correctIndex]
        if (!wrongDone) {
          msg = expected.options.find((_, i) => i !== expected.correctIndex)!
          intended = 'wrong'; wrongDone = true
        } else { msg = correctServed; intended = 'right' }
        if (!q.options.includes(msg)) msg = q.options[intended === 'right' ? q.options.indexOf(correctServed) : 0] ?? msg
      } else {
        msg = q.options[0]
        intended = null
      }
    }
    const p = await say(cookie, sid, msg)
    if (carriesFigure(p)) figures.push(`t${turn}: ${figureLabel(p)}`)
    keepFigure(`t${turn}`, p)
    const m = p.mastery ?? {}
    console.log(`[t${turn}] > ${short(msg, 70)}\n       provider=${p.provider} phase=${m.phase ?? '-'} check=${m.checkCorrect ?? '-'} practice=${m.practiceCorrect ?? '-'} verified=${m.verified ?? '-'}${p.mcq ? ` | new quiz: ${JSON.stringify(p.mcq.options)}` : ''}\n       ${short(p.text, 220)}`)
    if (q && intended) {
      quizzes.push({ question: short(q.question, 90), served: q.options, heads: q.options.every((o) => !/ [—–] /.test(o)), answered: msg, intended, gradedCorrect: m })
      if (intended === 'wrong') wrongReply = p.text ?? ''
    }
    last = p
    if (m.verified || p.lessonComplete?.complete) { console.log(`\nSTOP: ${m.verified ? 'mastery verified' : 'lesson complete'} at turn ${turn}`); break }
  }

  if (dumpPath) { const { writeFileSync } = await import('fs'); writeFileSync(dumpPath, JSON.stringify(figurePayloads, null, 2)); console.log(`figure payloads (${figurePayloads.length}) written to ${dumpPath}`) }
  console.log('\n' + JSON.stringify({
    lesson: l.topicSlug,
    turns: quizzes.length ? undefined : 'no authored quiz served',
    figuresShown: figures,
    authoredQuizzes: quizzes.map((q) => ({ question: q.question, served: q.served, noWorkingInOptions: q.heads, intended: q.intended })),
    wrongAnswerReply: short(wrongReply, 500),
    finalMastery: last.mastery ?? null,
    lessonComplete: last.lessonComplete ?? null,
  }, null, 2))
}

main().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1) })
