/**
 * bio.mol.dna-replication — production QA of the authored replication-fork figure.
 *
 * One disposable account. The DNA-replication lesson is driven through:
 *   A  a normal lesson turn           B  an explicit diagram request
 *   C  a follow-up about the diagram  D  a plain turn after it
 *   E  another Biology concept afterwards, in its own session (no leakage)
 * then a small regression set. Every turn records what the RESPONSE carries
 * (scene id / card / spec) and what the tutor said, to be set against the
 * server's `[learn/chat] VISUAL_TURN=` lines for the same window.
 *
 * Run: npx tsx scripts/qa/dnaReplicationProductionQa.ts [--keep]
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

const DNA = 'bio.mol.dna-replication'
const FIGURE_LABELS = ['parental DNA', 'helicase', 'replication fork', 'template', 'primase', 'RNA primer',
  'DNA polymerase', 'leading strand', 'lagging strand', 'Okazaki fragments', 'ligase', 'semiconservative']
/** Words that would mean the old base-pairing ladder or a wrong-domain card was described. */
const WRONG_FIGURE = /GC content|food chain|base-pairing ladder|producer|consumer/i

const REGRESSION: Array<{ path: string; subject: string; conceptId: string }> = [
  { path: 'DNA-related (unchanged: no fixed figure)', subject: 'biology', conceptId: 'bio.mol.nucleic-acid-structure' },
  { path: 'Biology Tier 0', subject: 'biology', conceptId: 'bio.cell.apoptosis' },
  { path: 'Biology Tier 1 (subject-wide)', subject: 'biology', conceptId: 'bio.eco.population-ecology' },
  { path: 'Biology Tier 3 (generated or honest none)', subject: 'biology', conceptId: 'bio.plant.photosynthesis' },
  { path: 'Unrelated subject (Tier 1 exact)', subject: 'physics', conceptId: 'phys.qm.particle-in-box' },
]

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

function carried(p: any) {
  const kind = p.sceneSpec ? `scene:${p.sceneSpec.id}` : p.visualSpec ? `spec:${p.visualSpec.type}:${p.visualSpec.title ?? ''}` : p.visual ? `card:${p.visual}` : 'none'
  const sceneTexts: string[] = p.sceneSpec
    ? [...new Set<string>(p.sceneSpec.steps.flatMap((s: any) => s.objects).map((o: any) => o.text).filter(Boolean))]
    : []
  return { served: kind !== 'none', kind, sceneTexts }
}

async function main() {
  const keep = process.argv.includes('--keep')
  const acct = await createQaAccount('dna-replication')
  console.log(`BASE=${BASE} account=${acct.email} start=${new Date().toISOString()}`)
  const curricula: Record<string, any[]> = {}
  const results: unknown[] = []

  const open = async (subject: string, conceptId: string) => {
    curricula[subject] ??= (await api(acct.cookie, `/api/curriculum?subject=${subject}`)).lessons ?? []
    const lesson = curricula[subject].find((l: any) => l.topicSlug === conceptId)
    if (!lesson) throw new Error(`${conceptId} NOT IN ${subject} CURRICULUM`)
    const s = await api(acct.cookie, '/api/sessions', { subjectSlug: subject })
    const sessionId = s.data?.id ?? s.id
    const init = await api(acct.cookie, '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: curricula[subject].length,
      completedLessons: [], teachingLanguage: 'en',
    })
    return { sessionId, init }
  }
  const record = (turns: unknown[], label: string, sent: string, r: any) => {
    const c = carried(r)
    const text = String(r.text ?? '')
    const namesFigureLabels = FIGURE_LABELS.filter((l) => text.toLowerCase().includes(l.toLowerCase()))
    const t = { label, sent, at: new Date().toISOString(), ...c, wrongFigureWords: WRONG_FIGURE.test(text), namesFigureLabels, text: text.slice(0, 700) }
    turns.push(t)
    console.log(`  [${label}] served=${c.served} ${c.kind} wrongWords=${t.wrongFigureWords} names=${namesFigureLabels.join('|')}\n      :: ${text.replace(/\s+/g, ' ').slice(0, 260)}`)
  }

  try {
    console.log(`\n### ${DNA} — lesson`)
    const { sessionId, init } = await open('biology', DNA)
    const turns: unknown[] = []
    record(turns, 'open', '(lesson-init)', init)
    const say = async (label: string, message: string) =>
      record(turns, label, message, await api(acct.cookie, '/api/learn/chat', { sessionId, message }))
    await say('A normal', 'ok, I know DNA is a double helix. how does it get copied?')
    await say('B request', 'can you show me a diagram of this please')
    await say('C follow-up', 'in the diagram, why is the bottom new strand made in several short pieces?')
    await say('D plain', 'ok i understand, go on')
    results.push({ conceptId: DNA, sessionId, turns })

    console.log(`\n### E — another Biology concept afterwards: bio.mol.transcription`)
    const e = await open('biology', 'bio.mol.transcription')
    const eTurns: unknown[] = []
    record(eTurns, 'E open', '(lesson-init)', e.init)
    record(eTurns, 'E request', 'can you show me a diagram of this please',
      await api(acct.cookie, '/api/learn/chat', { sessionId: e.sessionId, message: 'can you show me a diagram of this please' }))
    results.push({ conceptId: 'bio.mol.transcription', sessionId: e.sessionId, turns: eTurns })

    for (const p of REGRESSION) {
      console.log(`\n### REGRESSION ${p.path} — ${p.conceptId}`)
      const r = await open(p.subject, p.conceptId)
      const rTurns: unknown[] = []
      record(rTurns, 'request', 'can you show me a diagram of this please',
        await api(acct.cookie, '/api/learn/chat', { sessionId: r.sessionId, message: 'can you show me a diagram of this please' }))
      results.push({ ...p, sessionId: r.sessionId, turns: rTurns })
    }
  } finally {
    const out = process.env.QA_OUT ?? 'dna-replication-qa.json'
    writeFileSync(out, JSON.stringify({ account: acct.email, base: BASE, results }, null, 2))
    console.log(`\nend=${new Date().toISOString()} transcript=${out}`)
    if (!keep) console.log(`delete: ${JSON.stringify(await deleteQaAccount(acct))}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
