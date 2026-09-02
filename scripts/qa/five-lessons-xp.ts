/**
 * 5-Lesson Experience Run — untested subjects / concepts.
 * Covers biology, computer_science, math (algebra), english (grammar), chemistry (thermochemistry).
 * Acts as an average curious student. Reports experience + findings.
 * Run: QA_PASSWORD=... npx tsx scripts/qa/five-lessons-xp.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = 'https://my-tutor-flame.vercel.app'
const EMAIL = 'suaibamr@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

interface LessonSpec {
  subject: string
  topicHint: string          // partial slug prefix to match, or '' = first concept
  persona: string
  turns: string[]
}

const LESSONS: LessonSpec[] = [
  {
    subject: 'biology',
    topicHint: 'bio.',
    persona: 'average 10th-grader, new to biology',
    turns: [
      "Hi! I want to learn about cells. Where do I even start?",
      "So every living thing is made of cells? What's inside a cell?",
      "What does the nucleus actually do? Is it like the brain of the cell?",
      "I'm confused about the difference between the cell membrane and the cell wall. Do all cells have both?",
      "Oh so only plant cells have cell walls? Can you draw or explain that visually somehow?",
    ],
  },
  {
    subject: 'computer_science',
    topicHint: 'cs.',
    persona: 'complete beginner, never programmed',
    turns: [
      "I want to learn programming but I have no idea where to start. What even is computer science?",
      "What's a variable? I've heard that word but I don't get it.",
      "So a variable is like a labelled box that stores a value? What kind of values can it store?",
      "I get numbers and text, but what's a boolean? That sounds weird.",
      "True and false — ok so like a yes/no answer. Can you show me how that's used in real code?",
    ],
  },
  {
    subject: 'mathematics',
    topicHint: 'math.alg.',
    persona: 'average student who finds algebra confusing',
    turns: [
      "Hi, I need to understand algebra. I always get confused — what's the point of x?",
      "So x is just an unknown number we're trying to find? How do we find it?",
      "In 2x + 3 = 7, I need to get x alone? So I do 7 minus 3 first?",
      "Then 2x = 4, so x = 2? I divided both sides by 2. Is that always the rule — do the same thing to both sides?",
      "What if there are two unknowns, like x and y? How do you solve that?",
    ],
  },
  {
    subject: 'english',
    topicHint: 'eng.gram.',
    persona: 'non-native English speaker learning grammar',
    turns: [
      "I want to improve my English grammar. I often make mistakes. Where should I start?",
      "What's a noun? I know it's a person place or thing but I'm not sure about abstract things.",
      "Is 'happiness' a noun? I can't touch it — it seems different from 'table'.",
      "So concrete and abstract nouns — both are nouns but one is tangible. What about verbs?",
      "Action words — ok. But what's the difference between 'she runs' and 'she is running'? Both seem right to me.",
    ],
  },
  {
    subject: 'chemistry',
    topicHint: 'chem.therm.',
    persona: 'curious student who studied bonding but not thermochemistry',
    turns: [
      "I understand ionic and covalent bonds now. What is thermochemistry about?",
      "So thermochemistry is about heat in chemical reactions? Does every reaction release heat?",
      "What's the difference between exothermic and endothermic reactions? I always mix them up.",
      "Exothermic releases heat and endothermic absorbs heat — like burning wood vs dissolving salt in water?",
      "What is enthalpy? My textbook uses that word and I have no idea what it means.",
    ],
  },
]

async function login(): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken: t, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

async function endAllSessions(cookie: string): Promise<void> {
  const r = await fetch(`${BASE}/api/sessions`, { headers: { cookie } }).catch(() => null)
  if (!r) return
  const d = await r.json().catch(() => ({ data: [] })) as any
  for (const s of d.data ?? []) {
    if (s.id) await fetch(`${BASE}/api/sessions/end`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ sessionId: s.id }),
    }).catch(() => {})
  }
}

async function startLesson(cookie: string, spec: LessonSpec): Promise<{ sid: string; init: any; lesson: any }> {
  await endAllSessions(cookie)

  const sr = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: spec.subject }),
  })
  const sd = await sr.json() as any
  const sid = sd.data?.id ?? sd.id
  if (!sid) throw new Error(`session create failed: ${JSON.stringify(sd)}`)

  const cr = await fetch(`${BASE}/api/curriculum?subject=${spec.subject}`, { headers: { cookie } })
  const curriculum = await cr.json() as any
  const lessons: any[] = curriculum.lessons ?? []

  let lesson = spec.topicHint
    ? lessons.find((l: any) => l.topicSlug?.startsWith(spec.topicHint))
    : lessons[0]
  if (!lesson) lesson = lessons[0]
  if (!lesson) throw new Error(`No lesson found for ${spec.subject}`)

  console.log(`  ✓ Concept: ${lesson.topicSlug} — "${lesson.lessonTitle}"`)

  const ir = await fetch(`${BASE}/api/learn/lesson-init`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      sessionId: sid, mode: 'restart',
      lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
      totalLessons: lessons.length, completedLessons: [],
      teachingLanguage: 'en',
    }),
  })
  if (!ir.ok) throw new Error(`lesson-init failed: ${ir.status} ${await ir.text()}`)
  const init = await ir.json()
  return { sid, init, lesson }
}

async function chat(message: string, sid: string, cookie: string): Promise<any> {
  const r = await fetch(`${BASE}/api/learn/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid, message }),
  })
  if (!r.ok) throw new Error(`chat failed: ${r.status} ${await r.text()}`)
  return r.json()
}

interface LessonResult {
  subject: string
  conceptSlug: string
  lessonTitle: string
  persona: string
  openingHadVisual: boolean
  turns: Array<{
    n: number; msg: string; replyPreview: string; hasMcq: boolean; hasVisual: boolean
    visualType?: string; visualTitle?: string; provider?: string
    phase?: string; check: number; practice: number; mastered: boolean
    latencyMs: number
  }>
  finalPhase: string
  finalCheck: number
  finalPractice: number
  mastered: boolean
  avgLatencyMs: number
  errors: string[]
}

function display(p: any, label: string, msg: string): void {
  const m = p.mastery ?? {}
  const prov = p.provider ? ` [${p.provider}]` : ''
  const vs = p.visualSpec
  console.log(`  🤖 Tutor${prov}: ${(p.text ?? '').replace(/\n+/g, ' ').slice(0, 180)}${(p.text ?? '').length > 180 ? '…' : ''}`)
  if (p.mcq) console.log(`     📋 MCQ: ${p.mcq.question?.slice(0, 80)}… (${p.mcq.options?.length ?? 0} options)`)
  if (vs) console.log(`     🖼️  VISUAL: type=${vs.type ?? vs.kind ?? '?'} — "${vs.title ?? '—'}"`)
  else console.log(`     🖼️  VISUAL: none`)
  console.log(`     📊 ${label} phase=${m.phase ?? '?'} check=${m.correctAtCheck ?? 0} practice=${m.correctAtPractice ?? 0} mastered=${m.verified ?? false}`)
}

async function runLesson(cookie: string, spec: LessonSpec, lessonN: number): Promise<LessonResult> {
  const result: LessonResult = {
    subject: spec.subject, conceptSlug: '', lessonTitle: '', persona: spec.persona,
    openingHadVisual: false, turns: [], finalPhase: '?', finalCheck: 0, finalPractice: 0,
    mastered: false, avgLatencyMs: 0, errors: [],
  }

  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  LESSON ${lessonN}/5 — ${spec.subject.toUpperCase()}`)
  console.log(`  Persona: ${spec.persona}`)
  console.log(`${'═'.repeat(60)}`)

  let sid: string, lesson: any
  try {
    const s = await startLesson(cookie, spec)
    sid = s.sid
    lesson = s.lesson
    result.conceptSlug = lesson.topicSlug
    result.lessonTitle = lesson.lessonTitle

    if (s.init.text) {
      console.log(`\n── Opening ─────────────────────────────────`)
      console.log(`  🤖 Tutor: ${(s.init.text ?? '').replace(/\n+/g, ' ').slice(0, 200)}`)
      const vs = s.init.visualSpec
      if (vs) {
        result.openingHadVisual = true
        console.log(`     🖼️  VISUAL: type=${vs.type ?? '?'} — "${vs.title ?? '—'}"`)
      } else {
        console.log(`     🖼️  VISUAL: none`)
      }
    }
  } catch (e: any) {
    result.errors.push(`startLesson: ${e.message}`)
    console.log(`  ❌ ${e.message}`)
    return result
  }

  const latencies: number[] = []
  let lastMastery: any = {}

  for (let i = 0; i < spec.turns.length; i++) {
    const msg = spec.turns[i]
    console.log(`\n── T${i + 1} ────────────────────────────────────`)
    console.log(`  🧑 Student: ${msg}`)
    const t0 = Date.now()
    try {
      const p = await chat(msg, sid, cookie)
      const latMs = Date.now() - t0
      latencies.push(latMs)
      const m = p.mastery ?? {}
      lastMastery = m
      display(p, `T${i + 1}`, msg)
      const vs = p.visualSpec
      result.turns.push({
        n: i + 1, msg, replyPreview: (p.text ?? '').slice(0, 120),
        hasMcq: !!p.mcq, hasVisual: !!vs,
        visualType: vs?.type ?? vs?.kind, visualTitle: vs?.title,
        provider: p.provider, phase: m.phase, check: m.correctAtCheck ?? 0,
        practice: m.correctAtPractice ?? 0, mastered: m.verified ?? false,
        latencyMs: latMs,
      })
    } catch (e: any) {
      result.errors.push(`T${i + 1}: ${e.message}`)
      console.log(`  ❌ ${e.message}`)
      break
    }
  }

  result.finalPhase = lastMastery.phase ?? '?'
  result.finalCheck = lastMastery.correctAtCheck ?? 0
  result.finalPractice = lastMastery.correctAtPractice ?? 0
  result.mastered = lastMastery.verified ?? false
  result.avgLatencyMs = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0

  return result
}

function printSummary(results: LessonResult[]): void {
  console.log(`\n\n${'═'.repeat(60)}`)
  console.log('  EXPERIENCE SUMMARY — ALL 5 LESSONS')
  console.log(`${'═'.repeat(60)}`)

  for (const r of results) {
    const mcqTurns = r.turns.filter(t => t.hasMcq).length
    const visualTurns = r.turns.filter(t => t.hasVisual).length
    const memoryTurns = r.turns.filter(t => t.provider === 'memory').length
    const errors = r.errors.length > 0 ? ` ERRORS=${r.errors.join('; ')}` : ''
    console.log(`\n  ${r.subject.toUpperCase()} — ${r.lessonTitle} (${r.conceptSlug})`)
    console.log(`    Persona:       ${r.persona}`)
    console.log(`    Opening visual: ${r.openingHadVisual ? 'YES' : 'no'}`)
    console.log(`    Turns run:     ${r.turns.length}/5`)
    console.log(`    MCQ turns:     ${mcqTurns}  Visual turns: ${visualTurns}  Memory provider: ${memoryTurns}`)
    console.log(`    Final phase:   ${r.finalPhase}  check=${r.finalCheck}  practice=${r.finalPractice}  mastered=${r.mastered}`)
    console.log(`    Avg latency:   ${r.avgLatencyMs}ms${errors}`)

    // qualitative observations
    const memStr = memoryTurns > 0 ? 'authored content served' : 'LLM-generated throughout'
    const visStr = visualTurns > 0 ? `visual on ${visualTurns} turn(s)` : 'no visuals attached'
    const phaseStr = r.finalPhase !== '?' ? `advanced to ${r.finalPhase}` : 'phase unknown'
    console.log(`    → ${memStr} | ${visStr} | ${phaseStr}`)
  }

  console.log(`\n${'─'.repeat(60)}`)
  const total = results.length
  const withMcq = results.filter(r => r.turns.some(t => t.hasMcq)).length
  const withVisual = results.filter(r => r.turns.some(t => t.hasVisual)).length
  const mastered = results.filter(r => r.mastered).length
  const errors = results.filter(r => r.errors.length > 0).length
  console.log(`  Totals: ${total} lessons | ${withMcq}/${total} had MCQ | ${withVisual}/${total} had visual | ${mastered}/${total} mastered | ${errors}/${total} errors`)
  console.log(`  Avg latency: ${Math.round(results.reduce((a, r) => a + r.avgLatencyMs, 0) / results.filter(r => r.avgLatencyMs > 0).length)}ms`)
}

async function run() {
  if (!PASSWORD) { console.error('QA_PASSWORD not set'); process.exit(1) }

  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  5-Lesson Experience Run — Untested Subjects/Concepts    ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  const cookie = await login()
  console.log('✓ Logged in as', EMAIL)

  const results: LessonResult[] = []
  for (let i = 0; i < LESSONS.length; i++) {
    const r = await runLesson(cookie, LESSONS[i], i + 1)
    results.push(r)
  }

  printSummary(results)

  console.log('\n══════════════════════════════════════════════════════════════')
  console.log('  END')
  console.log('══════════════════════════════════════════════════════════════\n')
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
