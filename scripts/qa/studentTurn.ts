/**
 * ONE TURN AT A TIME, AS A STUDENT — for a human-in-the-loop (or an agent
 * reasoning like a student) to drive a real lesson, reading each reply before
 * deciding what to say. No answer key, no script.
 *
 *   STUDENT_PASSWORD=… npx tsx scripts/qa/studentTurn.ts open <state.json> <email> <subject> <conceptId>
 *   STUDENT_PASSWORD=… npx tsx scripts/qa/studentTurn.ts say  <state.json> "<message>"
 *
 * The state file holds only the email, lesson and sessionId — never the
 * password or a cookie (it logs in again each call).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { login, BASE } from './liveAccount'

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

function show(r: any) {
  const fig = r.sceneSpec ? `scene:${r.sceneSpec.id}` : r.visualSpec ? `spec:${r.visualSpec.type}:${r.visualSpec.title ?? ''}` : r.visual ? `card:${r.visual}` : '-'
  const m = r.mastery ?? {}
  console.log(`provider=${r.provider ?? '?'} figure=${fig} phase=${m.phase ?? '?'} verified=${m.verifiedCheckCorrect ?? '?'}/${m.verifiedPracticeCorrect ?? '?'} complete=${r.lessonComplete?.complete === true}`)
  console.log('---\n' + String(r.text ?? '').trim())
  if (r.mcq?.options?.length) {
    console.log('--- MCQ: ' + r.mcq.question)
    r.mcq.options.forEach((o: string, i: number) => console.log(`  [${i}] ${o}`))
  }
}

async function main() {
  const [cmd, stateFile, ...rest] = process.argv.slice(2)
  const password = process.env.STUDENT_PASSWORD ?? ''
  if (!password) throw new Error('STUDENT_PASSWORD required')
  if (cmd === 'open') {
    const [email, subject, conceptId] = rest
    const cookie = await login(email, password)
    const curriculum = (await api(cookie, `/api/curriculum?subject=${subject}`)).lessons ?? []
    const l = curriculum.find((x: any) => x.topicSlug === conceptId)
    if (!l) throw new Error(`${conceptId} not in ${subject} curriculum`)
    const s = await api(cookie, '/api/sessions', { subjectSlug: subject })
    const sessionId = s.data?.id ?? s.id
    writeFileSync(stateFile, JSON.stringify({ email, subject, conceptId, sessionId }))
    show(await api(cookie, '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: curriculum.length, completedLessons: [], teachingLanguage: 'en',
    }))
    return
  }
  if (cmd === 'say') {
    const st = JSON.parse(readFileSync(stateFile, 'utf8'))
    const cookie = await login(st.email, password)
    // An option index "#2" sends that option's exact text, as a tap does.
    let message = rest.join(' ')
    show(await api(cookie, '/api/learn/chat', { sessionId: st.sessionId, message }))
    return
  }
  throw new Error('usage: open|say')
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
