/**
 * ACT AS A REAL STUDENT — natural learning session, not a confusion probe.
 *
 * Opens a lesson, reads what the tutor says, and responds the way an
 * ordinary attentive learner would: acknowledging, attempting the question
 * asked, occasionally getting something wrong, asking one genuine follow-up.
 * No MCQ auto-answer trickery, no adversarial phrasing — this measures what
 * an actual lesson feels like end to end, and is what caught the scaffold
 * label's "colon inside the bold" variant that the adversarial probe
 * (liveRemediationProbe.ts) never triggered.
 *
 * Usage:
 *   QA_EMAIL=... QA_PASSWORD=... SUBJECT=chemistry SLUG=chem.found.mole-concept \
 *     TURNS=5 npx tsx scripts/remediation/liveStudentSession.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'
const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

interface P {
  text?: string; provider?: string | null; llmCallCount?: number
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  [k: string]: unknown
}

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

const post = async (path: string, body: unknown, cookie: string): Promise<P> => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 200)}`)
  return (await r.json()) as P
}

// A small set of genuine, ordinary-learner replies, cycled through — never
// answering an MCQ programmatically (that would fake mastery), just reacting
// like someone actually reading and thinking.
const NATURAL_REPLIES = [
  'okay that makes sense so far',
  'I think I follow — can you give me another example?',
  "wait, so does that mean it's always true, or only sometimes?",
  'got it, what happens if the numbers are bigger though',
  "I'm not 100% sure but I'll guess — is it the second one?",
  'oh interesting, I didn\'t know that',
  'can we do one more like that',
]

async function main() {
  const cookie = await login()
  const subject = process.env.SUBJECT ?? 'physics'
  const slug = process.env.SLUG
  if (!slug) throw new Error('SLUG env var is required, e.g. SLUG=chem.found.mole-concept')

  const cur = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const les = cur.lessons.find((l) => l.topicSlug === slug)
  if (!les) { console.error(`NOT FOUND in curriculum: ${slug}`); process.exit(1) }

  const prior = await (await fetch(`${BASE}/api/sessions`, { headers: { cookie } })).json()
    .catch(() => ({})) as { data?: { id?: string }[] }
  for (const s of prior.data ?? []) {
    if (s.id) await fetch(`${BASE}/api/sessions/end`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ sessionId: s.id }),
    }).catch(() => {})
  }
  const sid = ((await (await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: subject }),
  })).json()) as { data?: { id?: string } }).data?.id

  console.log(`\n########## ${les.lessonTitle}  (${slug})  lesson ${les.order}  session ${sid} ##########\n`)

  const show = (n: string, p: P, sent: string) => {
    const m = p.mastery
    const t = p.text ?? ''
    console.log(`── ${n} ${'─'.repeat(56)}`)
    console.log(`  SENT  : ${sent}`)
    console.log(`  STATE : phase=${m?.phase} check=${m?.checkCorrect ?? 0} practice=${m?.practiceCorrect ?? 0}`
      + ` verified=${m?.verified === true} provider=${p.provider} llmCalls=${p.llmCallCount}`
      + `${p.mcq ? ` MCQ(${p.mcq.options.length})` : ''} ${wc(t)}w`)
    console.log(`  TEXT  :\n${t.split('\n').map((l) => `    | ${l}`).join('\n')}\n`)
  }

  let last = await post('/api/learn/lesson-init', {
    sessionId: sid, mode: 'restart', lessonTitle: les.lessonTitle, lessonOrder: les.order,
    topicSlug: les.topicSlug, unitTitle: les.unitTitle, totalLessons: cur.lessons.length,
    completedLessons: [], teachingLanguage: 'en',
  }, cookie)
  show('T0 (opening)', last, '(lesson-init)')

  const turns = Number(process.env.TURNS ?? 5)
  for (let n = 0; n < turns; n += 1) {
    let reply: string
    if (last.mcq) {
      // A real student reads the options and picks one — sometimes right,
      // sometimes not, never told the answer in advance.
      const idx = Math.floor(Math.random() * last.mcq.options.length)
      reply = last.mcq.options[idx]
    } else {
      reply = NATURAL_REPLIES[n % NATURAL_REPLIES.length]
    }
    const p = await post('/api/learn/chat', { sessionId: sid, message: reply }, cookie)
    show(`T${n + 1}`, p, JSON.stringify(reply))
    last = p
  }
  await fetch(`${BASE}/api/sessions/end`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid }),
  }).catch(() => {})
  console.log(`session ended: ${sid}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
