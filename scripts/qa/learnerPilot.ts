/**
 * LEARNER PILOT — real accounts, real lessons, one per-lesson outcome record.
 *
 * Drives each planned lesson as a learner would: open it, say they don't know
 * the topic, ask for a diagram, ask a follow-up, then answer every question
 * the tutor puts to them (first authored MCQ deliberately wrong, the rest
 * right — the answer key comes from the seed corpus, never the response),
 * until the lesson completes or the turn budget runs out.
 *
 * Per lesson it records what a pilot dashboard needs: turns, how many turns
 * the model wrote vs. were served from authored content, verified vs.
 * unverified credit, completion, figures served, and learner-visible defect
 * shapes in the text.
 *
 * Credentials are NEVER written anywhere: the plan (emails -> concepts) and
 * the shared password come from the environment of the one invocation.
 *
 *   PILOT_PLAN='[{"email":"…","lessons":[{"subject":"english","conceptId":"eng.grammar.verbs"}]}]' \
 *   PILOT_PASSWORD=… QA_OUT=pilot.json npx tsx scripts/qa/learnerPilot.ts
 */
import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { login, BASE } from './liveAccount'

interface Plan { email: string; lessons: Array<{ subject: string; conceptId: string }> }
interface Probe { conceptId: string; stem: string; choices?: Array<{ text: string; isCorrect: boolean; misconceptionId?: string }> }

const MAX_TURNS = 14
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Every authored probe in the seed corpus, collected by shape rather than by a hand-kept list. */
async function loadProbes(): Promise<Probe[]> {
  const dir = join(process.cwd(), 'src/lib/teaching/assets')
  const out: Probe[] = []
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && !x.endsWith('.test.ts'))) {
    try {
      const mod = await import(join(dir, f)) as Record<string, unknown>
      for (const v of Object.values(mod)) {
        if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object' && v[0] && 'stem' in (v[0] as object)) {
          out.push(...(v as Probe[]))
        }
      }
    } catch { /* a module that cannot load outside Next is simply not in the key */ }
  }
  return out
}

function keyFor(probes: Probe[], question: string): Probe | null {
  const q = norm(question)
  return probes.find((p) => norm(p.stem) === q)
    ?? probes.find((p) => { const s = norm(p.stem); return s.length > 30 && (q.includes(s) || s.includes(q)) })
    ?? null
}

async function api(cookie: string, path: string, body?: unknown): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (r.status === 429 || r.status >= 500) { await new Promise((res) => setTimeout(res, 15_000 * (attempt + 1))); continue }
    if (!r.ok) throw new Error(`${path} ${r.status}: ${(await r.text()).slice(0, 200)}`)
    return r.json()
  }
  throw new Error(`${path} failed after retries`)
}

/** Learner-visible defect shapes — each one a finding from this project's own QA history. */
const DEFECTS: Array<[string, RegExp]> = [
  ['content-free-hold', /^Let's stay with this idea for a moment\.?$/m],
  ['ascii-art', /-{3,}\[|\[[A-Za-z ]+\]-{2,}|```[\s\S]*?(\+-{3,}|\|[- ]{3,}\|)/],
  ['arrow-pointer-without-figure', /\b(follow|trace) (the|these) arrows?\b/i],
  ['layout-pointer-without-figure', /\b(this|the) layout shows\b/i],
  ['options-promised', /\b(pick|choose) (the best|an?) (answer|option)\b|which option you choose/i],
  ['machine-tag-leak', /<!--|\[(MCQ|SIGNAL|VISUAL|HINT)[:\]]/],
]

async function main() {
  const plans: Plan[] = JSON.parse(process.env.PILOT_PLAN ?? '[]')
  const password = process.env.PILOT_PASSWORD ?? ''
  if (!plans.length || !password) throw new Error('PILOT_PLAN and PILOT_PASSWORD are required')
  const probes = await loadProbes()
  console.log(`BASE=${BASE} probes=${probes.length} start=${new Date().toISOString()}`)
  const results: unknown[] = []

  for (const plan of plans) {
    const cookie = await login(plan.email, password)
    const who = plan.email.replace(/@.*/, '')
    for (const lesson of plan.lessons) {
      const curriculum = (await api(cookie, `/api/curriculum?subject=${lesson.subject}`)).lessons ?? []
      const l = curriculum.find((x: any) => x.topicSlug === lesson.conceptId)
      if (!l) { results.push({ who, ...lesson, error: 'not in curriculum' }); continue }
      const s = await api(cookie, '/api/sessions', { subjectSlug: lesson.subject })
      const sessionId = s.data?.id ?? s.id
      const turns: any[] = []
      let figureOnScreen = false
      const record = (label: string, sent: string, r: any) => {
        const kind = r.sceneSpec ? `scene:${r.sceneSpec.id}` : r.visualSpec ? `spec:${r.visualSpec.type}` : r.visual ? `card:${r.visual}` : null
        if (kind) figureOnScreen = true
        const text = String(r.text ?? '')
        const defects = DEFECTS.filter(([, re]) => re.test(text)).map(([n]) => n)
          .filter((n) => !(figureOnScreen && n.endsWith('without-figure')))
        const m = r.mastery ?? {}
        turns.push({
          label, sent: sent.slice(0, 160), provider: r.provider ?? null, llmCalls: r.llmCallCount ?? null,
          figure: kind, mcq: r.mcq ? { q: r.mcq.question, options: r.mcq.options } : null,
          phase: m.phase ?? null, check: m.checkCorrect ?? null, practice: m.practiceCorrect ?? null,
          vCheck: m.verifiedCheckCorrect ?? null, vPractice: m.verifiedPracticeCorrect ?? null,
          verified: m.verified ?? null, complete: r.lessonComplete?.complete === true, defects, text: text.slice(0, 900),
        })
        console.log(`  [${label}] ${r.provider ?? '?'} fig=${kind ?? '-'} mcq=${r.mcq ? 'Y' : '-'} phase=${m.phase ?? '?'} v=${m.verifiedCheckCorrect ?? '?'}/${m.verifiedPracticeCorrect ?? '?'} ${defects.length ? 'DEFECTS=' + defects.join(',') : ''} :: ${text.replace(/\s+/g, ' ').slice(0, 150)}`)
        return r
      }
      console.log(`\n### ${who} — ${lesson.subject} ${lesson.conceptId}`)
      record('open', '(lesson-init)', await api(cookie, '/api/learn/lesson-init', {
        sessionId, mode: 'restart', lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
        unitTitle: l.unitTitle, totalLessons: curriculum.length, completedLessons: [], teachingLanguage: 'en',
      }))
      const say = async (label: string, message: string) =>
        record(label, message, await api(cookie, '/api/learn/chat', { sessionId, message }))

      let last = await say('t1', 'hi, i dont really know this topic well. can you explain it simply?')
      last = await say('t2', 'can you show me a diagram of this please')
      last = await say('t3', 'can you give me a simple real life example?')
      let mcqsAnswered = 0
      for (let i = 4; i <= MAX_TURNS && !turns.some((t) => t.complete); i++) {
        if (last.mcq?.options?.length) {
          const key = keyFor(probes, last.mcq.question)
          const correct = key?.choices?.find((c) => c.isCorrect)?.text
          const wrong = key?.choices?.find((c) => !c.isCorrect && c.misconceptionId)?.text ?? key?.choices?.find((c) => !c.isCorrect)?.text
          const pick = (mcqsAnswered === 0 ? wrong : correct) ?? last.mcq.options[0]
          const option = last.mcq.options.find((o: string) => norm(o) === norm(pick)) ?? pick
          mcqsAnswered++
          last = await say(`t${i}-mcq${key ? '' : '-unkeyed'}`, option)
        } else if (/\?\s*$/.test(String(last.text ?? '').trim())) {
          last = await say(`t${i}`, 'hmm im not fully sure, i think it has to do with what you just explained. can you check me with a question?')
        } else {
          last = await say(`t${i}`, 'ok i get it, can you test me?')
        }
      }
      const lastT = turns[turns.length - 1]
      results.push({
        who, ...lesson, sessionId,
        summary: {
          turns: turns.length,
          modelTurns: turns.filter((t) => t.provider && !['memory', 'gate'].includes(t.provider)).length,
          memoryTurns: turns.filter((t) => t.provider === 'memory').length,
          gateTurns: turns.filter((t) => t.provider === 'gate').length,
          mcqsServed: turns.filter((t) => t.mcq).length,
          figuresServed: turns.filter((t) => t.figure).length,
          completed: turns.some((t) => t.complete),
          finalPhase: lastT?.phase ?? null,
          verified: `${lastT?.vCheck ?? '?'}/${lastT?.vPractice ?? '?'}`,
          unverified: `${lastT?.check ?? '?'}/${lastT?.practice ?? '?'}`,
          defects: [...new Set(turns.flatMap((t) => t.defects))],
        },
        turns,
      })
    }
  }
  const out = process.env.QA_OUT ?? 'learner-pilot.json'
  writeFileSync(out, JSON.stringify({ base: BASE, at: new Date().toISOString(), results }, null, 2))
  console.log(`\nend=${new Date().toISOString()} transcript=${out}`)
  for (const r of results as any[]) console.log(`${r.who} ${r.conceptId} ${JSON.stringify(r.summary ?? r.error)}`)
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
