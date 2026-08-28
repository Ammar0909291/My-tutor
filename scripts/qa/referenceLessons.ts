/**
 * REFERENCE-LESSON ACCEPTANCE HARNESS
 *
 * Drives the REAL deployed product through the three learner sessions that
 * were scored by hand (English 6/10, Physics 3/10, Chemistry 7/10) and turns
 * each acceptance criterion in the brief into a machine-checkable assertion
 * over the captured turns.
 *
 * It scripts a learner rather than sampling one: every reply is fixed, so two
 * runs are comparable and a fix can be shown to have moved a specific finding.
 * Replies that must react to what the tutor just did (answering an MCQ wrongly
 * on purpose, for instance) are resolved from the previous payload.
 *
 * It never asserts from prose alone. Where the product publishes machine state
 * (`mastery`, `mcq`, `visualSpec`, `provider`, `llmCallCount`) the assertion
 * reads that; prose is used only where the defect IS prose (a denial of visual
 * capability, a repeated filler sentence).
 *
 *   QA_EMAIL=… QA_PASSWORD=… npx tsx scripts/qa/referenceLessons.ts [english|physics|chemistry]
 *
 * Output: a human-readable transcript on stdout and, with OUT=<path>, the full
 * structured capture as JSON so two runs can be diffed rather than re-read.
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'
import { writeFileSync } from 'fs'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'

export interface Payload {
  text?: string
  provider?: string | null
  llmCallCount?: number
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: {
    verified?: boolean; phase?: string
    checkCorrect?: number; practiceCorrect?: number
  } | null
  visualSpec?: unknown
  sceneSpec?: unknown
  visual?: unknown
  lessonComplete?: unknown
  memoryServingMode?: string | null
  [k: string]: unknown
}

export interface Turn {
  label: string
  sent: string
  payload: Payload
}

/* ── text measures ─────────────────────────────────────────────────────── */

const words = (s: string): string[] =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)

/** Jaccard over word trigrams — near-identical prose scores high, a genuinely
 *  different representation of the same idea scores low. Trigrams rather than
 *  bare words so that reordering the same sentence still reads as a repeat. */
export function similarity(a: string, b: string): number {
  const grams = (s: string): Set<string> => {
    const w = words(s)
    const g = new Set<string>()
    for (let i = 0; i + 2 < w.length; i += 1) g.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`)
    return g
  }
  const ga = grams(a); const gb = grams(b)
  if (ga.size === 0 || gb.size === 0) return 0
  let inter = 0
  for (const g of ga) if (gb.has(g)) inter += 1
  return inter / (ga.size + gb.size - inter)
}

/** A stable identity for whatever visual a turn carried, so "the same diagram
 *  again" is decidable without comparing two large objects by eye. */
export function visualIdentity(p: Payload): string | null {
  const v = p.visualSpec ?? p.sceneSpec ?? p.visual
  if (!v) return null
  const s = JSON.stringify(v)
  let h = 0
  for (let i = 0; i < s.length; i += 1) { h = (h * 31 + s.charCodeAt(i)) | 0 }
  const kind = typeof v === 'object' && v !== null
    ? String((v as Record<string, unknown>).type ?? (v as Record<string, unknown>).archetype ?? 'obj')
    : 'val'
  return `${kind}:${(h >>> 0).toString(36)}`
}

/* ── findings ──────────────────────────────────────────────────────────── */

export interface Finding {
  code: string
  severity: 'P0' | 'P1'
  turn: string
  detail: string
}

/** Phrases that deny a capability the product demonstrably has. Matched on the
 *  tutor's own text because the defect IS the sentence. */
const VISUAL_DENIAL =
  /(?:i\s*(?:can(?:'|\u2019)?t|cannot|am\s+unable\s+to|(?:'|\u2019)m\s+unable\s+to)\s+(?:show|draw|display|render|create|generate|give)\b[^.!?]{0,60}\b(?:picture|image|diagram|visual|figure|graph|drawing)|\bno\s+(?:way|ability)\s+to\s+(?:show|draw|display)\b|\bi\s+don(?:'|\u2019)?t\s+have\s+(?:the\s+)?(?:ability|capability)\s+to\s+(?:show|draw|display)\b)/i

/** The dead-loop sentence named in the brief, plus its near neighbours. */
const FILLER_HOLD = /let(?:'|’)?s\s+(?:stay\s+with|sit\s+with|pause\s+on|hold\s+on\s+to)\s+(?:this|that)\b/i

export function analyse(turns: readonly Turn[]): Finding[] {
  const f: Finding[] = []
  const push = (code: string, severity: 'P0' | 'P1', turn: string, detail: string) =>
    f.push({ code, severity, turn, detail })

  const tutorTexts = turns.map((t) => t.payload.text ?? '')

  for (let i = 0; i < turns.length; i += 1) {
    const t = turns[i]
    const text = tutorTexts[i]
    const p = t.payload

    // A turn that says nothing at all is the strongest form of the dead loop.
    // A genuine question (prose ending in '?' or a tappable MCQ) is not empty —
    // a short Socratic diagnostic ("How did you arrive at 5 m/s?") is a real,
    // purposeful turn.
    const asksSomething = p.mcq != null || /\?\s*$/.test(text.trim())
    if (words(text).length < 12 && !asksSomething) {
      push('EMPTY_TURN', 'P0', t.label, `${words(text).length} words and no question attached`)
    }

    if (VISUAL_DENIAL.test(text)) {
      push('VISUAL_DENIAL', 'P0', t.label,
        `tutor denied visual capability: "${(text.match(VISUAL_DENIAL) ?? [''])[0].slice(0, 90)}"`)
    }

    if (FILLER_HOLD.test(text)) {
      push('FILLER_HOLD', 'P1', t.label, 'turn opened with the "let\'s stay with this" hold phrase')
    }

    // Consecutive near-duplicate tutor turns — no pedagogical progress.
    if (i > 0) {
      const sim = similarity(tutorTexts[i - 1], text)
      if (sim >= 0.55) {
        push('REPEAT_TURN', 'P0', t.label,
          `${(sim * 100).toFixed(0)}% trigram overlap with ${turns[i - 1].label}`)
      }
    }

    // The same visual attached on consecutive turns.
    if (i > 0) {
      const a = visualIdentity(turns[i - 1].payload)
      const b = visualIdentity(p)
      if (a && b && a === b) {
        push('VISUAL_REPEAT', 'P0', t.label, `same visual ${b} as ${turns[i - 1].label}`)
      }
    }

    // An explicit request for a visual that came back without one.
    if (/\b(diagram|picture|draw|visual|figure|show me)\b/i.test(t.sent) && !visualIdentity(p)) {
      push('DIAGRAM_REQUEST_UNMET', 'P0', t.label,
        `learner asked "${t.sent.slice(0, 60)}" and the turn carried no visual`)
    }

    // "Explain differently" that produced the same explanation.
    if (/explain.*(different|another way)|say that differently|i don.?t understand/i.test(t.sent) && i > 0) {
      const prevTeach = tutorTexts[i - 1]
      const sim = similarity(prevTeach, text)
      if (sim >= 0.4) {
        push('NO_REPRESENTATION_CHANGE', 'P0', t.label,
          `asked for a different explanation; ${(sim * 100).toFixed(0)}% overlap with the previous one`)
      }
    }
  }

  // Mastery that was never demonstrated.
  for (const t of turns) {
    const m = t.payload.mastery
    if (m?.verified === true) {
      const c = m.checkCorrect ?? 0
      const pr = m.practiceCorrect ?? 0
      if (c < 1 || pr < 2) {
        push('FALSE_MASTERY', 'P0', t.label,
          `mastery.verified=true with check=${c} practice=${pr}`)
      }
    }
    if (t.payload.lessonComplete) {
      const c = m?.checkCorrect ?? 0
      const pr = m?.practiceCorrect ?? 0
      if (c < 1 || pr < 2) {
        push('COMPLETE_WITHOUT_MASTERY', 'P0', t.label,
          `lesson completed with check=${c} practice=${pr}`)
      }
    }
  }

  // An acknowledgement that moved the mastery counters.
  for (let i = 1; i < turns.length; i += 1) {
    const sent = turns[i].sent.toLowerCase().trim()
    const isAck = /^(got it|ok|okay|thanks|thank you|yes|yeah|i see|understood|makes sense)[.!]?$/.test(sent)
    if (!isAck) continue
    const before = turns[i - 1].payload.mastery
    const after = turns[i].payload.mastery
    const grew = (after?.checkCorrect ?? 0) > (before?.checkCorrect ?? 0)
      || (after?.practiceCorrect ?? 0) > (before?.practiceCorrect ?? 0)
    if (grew) {
      push('ACK_COUNTED_AS_MASTERY', 'P0', turns[i].label,
        `bare acknowledgement "${sent}" advanced the mastery counters`)
    }
  }

  // A degraded turn means the provider was down: the engine was never reached,
  // so nothing above is evidence about teaching quality.
  if (turns.some((t) => t.payload.provider === 'degraded')) {
    push('INFRASTRUCTURE_DEGRADED', 'P0', '-', 'a provider outage served a degraded template — run is UNMEASURED')
  }

  return f
}

/* ── driver ────────────────────────────────────────────────────────────── */

async function login(): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({
      csrfToken: t, email: process.env.QA_EMAIL!, password: process.env.QA_PASSWORD!,
      callbackUrl: `${BASE}/learn`,
    }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

const post = async (path: string, body: unknown, cookie: string): Promise<Payload> => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as Payload
}

/** A scripted reply. `wrongMcq` picks a deliberately incorrect option when the
 *  previous turn attached one, so "wrong answer" is a real wrong answer rather
 *  than prose the grader may not be able to mark. */
type Step = string | { wrongMcq: true; fallback: string } | { rightMcq: true; fallback: string }

interface Scenario {
  subject: string
  slug: string
  title: string
  steps: Step[]
}

const SCENARIOS: Record<string, Scenario> = {
  english: {
    subject: 'english', slug: 'eng.vocab.word-recognition', title: 'English — Word Recognition',
    steps: [
      'okay',
      'Give a word',
      'I am not sure what you mean',
      'Can you explain that differently?',
      'got it',
      { wrongMcq: true, fallback: 'I think it is the first one' },
      'I still do not understand',
      'why does the stress move to a different word?',
      'ok',
      'can you show me a diagram of this?',
    ],
  },
  physics: {
    subject: 'physics', slug: 'phys.mech.collisions-inelastic', title: 'Physics — Inelastic Collisions',
    steps: [
      'okay',
      'so if one ball moves at 3 m/s and the other at 2 m/s, after they stick the final speed is 5 m/s right?',
      'but momentum is conserved so the speeds should add up',
      'I do not understand',
      'Can you explain that differently?',
      'I still do not understand',
      'got it',
      { wrongMcq: true, fallback: 'the final speed is the sum of the two speeds' },
      'can you give me a diagram?',
      'let me try again — the momentum before equals the momentum after, so the combined mass moves slower',
      { rightMcq: true, fallback: 'momentum is conserved but kinetic energy is not' },
    ],
  },
  chemistry: {
    subject: 'chemistry', slug: 'chem.bond.resonance', title: 'Chemistry — Resonance Structures',
    steps: [
      'okay',
      'so the molecule flips back and forth between the two structures?',
      'can you show me a diagram of the resonance structures?',
      'I do not understand',
      'Can you explain that differently?',
      'got it',
      { wrongMcq: true, fallback: 'the real molecule is one structure then the other' },
      'can you draw it for me?',
      'so the real structure is an average of both, and the bond length is between a single and double bond',
      { rightMcq: true, fallback: 'the true structure is a hybrid of all resonance forms' },
    ],
  },
}

async function run(name: string): Promise<{ turns: Turn[]; findings: Finding[] }> {
  const sc = SCENARIOS[name]
  if (!sc) throw new Error(`unknown scenario ${name}`)
  const cookie = await login()

  const cur = (await (await fetch(`${BASE}/api/curriculum?subject=${sc.subject}`, { headers: { cookie } })).json()) as
    { lessons: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const les = cur.lessons.find((l) => l.topicSlug === sc.slug)
  if (!les) throw new Error(`NOT FOUND in curriculum: ${sc.slug}`)

  const prior = (await (await fetch(`${BASE}/api/sessions`, { headers: { cookie } })).json()
    .catch(() => ({}))) as { data?: { id?: string }[] }
  for (const s of prior.data ?? []) {
    if (s.id) {
      await fetch(`${BASE}/api/sessions/end`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify({ sessionId: s.id }),
      }).catch(() => {})
    }
  }
  const sid = ((await (await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: sc.subject }),
  })).json()) as { data?: { id?: string } }).data?.id

  console.log(`\n${'#'.repeat(78)}\n# ${sc.title}  (${sc.slug})  lesson ${les.order}  session ${sid}\n${'#'.repeat(78)}\n`)

  const turns: Turn[] = []
  const show = (t: Turn) => {
    const m = t.payload.mastery
    const text = t.payload.text ?? ''
    console.log(`── ${t.label} ${'─'.repeat(60 - t.label.length)}`)
    console.log(`  SENT  : ${t.sent}`)
    console.log(`  STATE : phase=${m?.phase} check=${m?.checkCorrect ?? 0} practice=${m?.practiceCorrect ?? 0}`
      + ` verified=${m?.verified === true} provider=${t.payload.provider} llm=${t.payload.llmCallCount}`
      + `${t.payload.mcq ? ` MCQ(${t.payload.mcq.options.length})` : ''}`
      + `${visualIdentity(t.payload) ? ` VIS[${visualIdentity(t.payload)}]` : ''}`
      + `${t.payload.lessonComplete ? ' LESSON_COMPLETE' : ''} ${words(text).length}w`)
    console.log(`  TEXT  :\n${text.split('\n').map((l) => `    | ${l}`).join('\n')}\n`)
  }

  let last = await post('/api/learn/lesson-init', {
    sessionId: sid, mode: 'restart', lessonTitle: les.lessonTitle, lessonOrder: les.order,
    topicSlug: les.topicSlug, unitTitle: les.unitTitle, totalLessons: cur.lessons.length,
    completedLessons: [], teachingLanguage: 'en',
  }, cookie)
  turns.push({ label: 'T0', sent: '(lesson-init)', payload: last })
  show(turns[0])

  for (let i = 0; i < sc.steps.length; i += 1) {
    const step = sc.steps[i]
    let reply: string
    if (typeof step === 'string') reply = step
    else if ('wrongMcq' in step) {
      const m = last.mcq
      reply = m ? m.options[(m.correctIndex + 1) % m.options.length] : step.fallback
    } else {
      const m = last.mcq
      reply = m ? m.options[m.correctIndex] : step.fallback
    }
    const p = await post('/api/learn/chat', { sessionId: sid, message: reply }, cookie)
    const t: Turn = { label: `T${i + 1}`, sent: reply, payload: p }
    turns.push(t)
    show(t)
    last = p
  }

  await fetch(`${BASE}/api/sessions/end`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid }),
  }).catch(() => {})

  const findings = analyse(turns)
  console.log(`\n── FINDINGS for ${sc.title} ${'─'.repeat(30)}`)
  if (findings.length === 0) console.log('  none')
  for (const x of findings) console.log(`  [${x.severity}] ${x.code.padEnd(26)} ${x.turn.padEnd(4)} ${x.detail}`)
  console.log()
  return { turns, findings }
}

async function main() {
  const which = process.argv[2]
  const names = which ? [which] : ['english', 'physics', 'chemistry']
  const all: Record<string, { turns: Turn[]; findings: Finding[] }> = {}
  for (const n of names) {
    try { all[n] = await run(n) } catch (e) { console.error(`${n}: ${(e as Error).message}`) }
  }
  console.log(`\n${'='.repeat(78)}\nSUMMARY\n${'='.repeat(78)}`)
  for (const [n, r] of Object.entries(all)) {
    const p0 = r.findings.filter((x) => x.severity === 'P0').length
    const p1 = r.findings.filter((x) => x.severity === 'P1').length
    const codes = [...new Set(r.findings.map((x) => x.code))].join(', ')
    console.log(`  ${n.padEnd(10)} ${r.turns.length} turns   P0=${p0} P1=${p1}   ${codes}`)
  }
  if (process.env.OUT) {
    writeFileSync(process.env.OUT, JSON.stringify(all, null, 2))
    console.log(`\nfull capture -> ${process.env.OUT}`)
  }
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
