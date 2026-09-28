/**
 * PHYSICS UNIT 1 CERTIFICATION — drive every concept on the DEPLOYED app, production default model.
 *
 * Same 14-slot scripted student as the identical-student A/B (scripts/qa/abStudent/runner.ts,
 * docs/history/model-ab-test-groq-vs-gemini.md): fixed strings byte-for-byte, quiz answers by the
 * canonical-content picker (never "option 0"), deliberate wrong answer = the picker's runner-up.
 * No provider forcing, so no modelOverrideAllowed flag and no DB write. One fresh disposable
 * account per lesson (liveAccount.ts), deleted right after that lesson. No password is written.
 *
 * Egress: the harness reads only API replies. Use --egress-note to remind yourself to take the
 * pg_stat_statements snapshot before/after (done from the session, not from here).
 *
 * Run: OUT_DIR=<scratch> npx tsx scripts/qa/physicsCert/drive.ts [--runs 2] [--concurrency 3] [--only id,id]
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from '../liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from '../liveSession'
import { canonicalContent, pickAnswer, proseOptions } from '../biologyAnswerPicker'
import { UNIT1_FILE } from './buildScript'

interface Concept { conceptId: string; lessonTitleHint: string; misconception: string; correctTyped: string; wrongTyped: string; offTopic: string }
interface Lesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

export type SlotKind = 'fixed' | 'misconception' | 'right' | 'wrong' | 'offTopic'
/** Identical to the A/B plan (runner.ts SLOTS). */
export const SLOTS: Array<{ n: number; kind: SlotKind; text?: string }> = [
  { n: 1, kind: 'fixed', text: "ok, let's start" },
  { n: 2, kind: 'fixed', text: 'why does that matter?' },
  { n: 3, kind: 'fixed', text: 'can you show me a diagram?' },
  { n: 4, kind: 'fixed', text: 'ok, continue' },
  { n: 5, kind: 'misconception' },
  { n: 6, kind: 'fixed', text: 'quiz me' },
  { n: 7, kind: 'right' },
  { n: 8, kind: 'fixed', text: 'continue' },
  { n: 9, kind: 'wrong' },
  { n: 10, kind: 'offTopic' },
  { n: 11, kind: 'fixed', text: 'give me a practice question' },
  { n: 12, kind: 'right' },
  { n: 13, kind: 'fixed', text: 'continue' },
  { n: 14, kind: 'right' },
]

function resolve(slot: typeof SLOTS[number], c: Concept, prev: TurnPayload | null): { message: string; rule: string } {
  if (slot.kind === 'fixed') return { message: slot.text!, rule: 'fixed' }
  if (slot.kind === 'misconception') return { message: c.misconception, rule: 'fixed' }
  if (slot.kind === 'offTopic') return { message: c.offTopic, rule: 'fixed' }
  const content = canonicalContent('physics', c.conceptId)
  const opts = prev?.mcq?.options?.length ? { q: prev.mcq.question, o: prev.mcq.options, rule: 'a' }
    : (() => { const p = proseOptions(prev?.text); return p?.options.length ? { q: p.question, o: p.options, rule: 'b' } : null })()
  if (opts) {
    const pick = pickAnswer(opts.q, opts.o, content)
    // The deliberate wrong answer is never an option the authored corpus marks
    // correct (pass 1: the picker's top choice was wrong, so its "runner-up"
    // was the right answer and the tutor rightly confirmed it — a false flag).
    const norm = (x: string) => x.toLowerCase().replace(/\s+/g, ' ').trim()
    const authoredCorrect = new Set(content.probes.flatMap((p) => (p.choices ?? []).filter((ch) => ch.isCorrect).map((ch) => norm(ch.text))))
    const idx = slot.kind === 'right' ? pick.index
      : (() => {
        const safe = opts.o.findIndex((o, i) => i !== pick.index && !authoredCorrect.has(norm(o)))
        return safe >= 0 ? safe : opts.o.findIndex((_, i) => i !== pick.index)
      })()
    return { message: opts.o[Math.max(0, idx)], rule: opts.rule }
  }
  if ((prev?.text ?? '').includes('?')) return { message: slot.kind === 'right' ? c.correctTyped : c.wrongTyped, rule: 'c' }
  return { message: 'continue', rule: 'd' }
}

/** Every response field except the large figure payloads and the fields already stored. */
function diagnostics(p: TurnPayload): Record<string, unknown> {
  const skip = new Set(['text', 'provider', 'mcq', 'mastery', 'lessonComplete', 'visual', 'visualSpec', 'sceneSpec', 'dynamicVisualizationCode'])
  return Object.fromEntries(Object.entries(p).filter(([k, v]) => !skip.has(k) && (typeof v !== 'string' || v.length < 400)))
}

async function onboard(cookie: string) {
  const r = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: 'physics', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am a student and want to understand each topic properly.' }),
  })
  if (!r.ok) throw new Error(`onboarding ${r.status}`)
}

async function driveLesson(c: Concept, run: number, outDir: string, sha: string) {
  let acct: QaAccount | null = null
  const turns: unknown[] = []
  try {
    acct = await createQaAccount(`p1-${c.conceptId.replace(/\./g, '-')}-r${run}`)
    await onboard(acct.cookie)
    const cur = await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie: acct.cookie } })
    const lessons = ((await cur.json()) as { lessons?: Lesson[] }).lessons ?? []
    const l = lessons.find((x) => x.topicSlug === c.conceptId)
    if (!l) throw new Error(`${c.conceptId} not in live curriculum`)
    const sid = await createSession(acct.cookie, 'physics')
    const t0 = Date.now()
    let prev = await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    turns.push({ slot: 0, kind: 'open', sent: '(lesson opened)', text: prev.text, provider: prev.provider, mcq: prev.mcq ?? null, mastery: prev.mastery ?? null, figure: carriesFigure(prev), ms: Date.now() - t0 })
    for (const slot of SLOTS) {
      const { message, rule } = resolve(slot, c, prev)
      const ts = Date.now()
      const p = await say(acct.cookie, sid, message)
      turns.push({ slot: slot.n, kind: slot.kind, rule, sent: message, text: p.text, provider: p.provider, mcq: p.mcq ?? null, mastery: p.mastery ?? null, lessonComplete: p.lessonComplete ?? null, figure: carriesFigure(p), ms: Date.now() - ts, diag: diagnostics(p) })
      prev = p
    }
    writeFileSync(join(outDir, `${c.conceptId}__run${run}.json`), JSON.stringify({ scriptSha256: sha, conceptId: c.conceptId, run, turns }, null, 2))
    console.log(`done ${c.conceptId} run${run}`)
  } catch (e) {
    console.log(`FAILED ${c.conceptId} run${run}: ${(e as Error).message}`)
    writeFileSync(join(outDir, `${c.conceptId}__run${run}.error.json`), JSON.stringify({ error: (e as Error).message, turns }, null, 2))
  } finally {
    if (acct) { try { await deleteQaAccount(acct) } catch { console.log(`cleanup failed for a ${c.conceptId} account`) } }
  }
}

async function main() {
  const outDir = process.env.OUT_DIR
  if (!outDir) throw new Error('OUT_DIR required (outside the repo)')
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  const arg = (k: string) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined }
  const runs = Number(arg('--runs') ?? 2)
  const conc = Number(arg('--concurrency') ?? 3)
  const only = arg('--only')?.split(',')
  const raw = readFileSync(UNIT1_FILE, 'utf8')
  const sha = createHash('sha256').update(raw).digest('hex')
  const concepts = (JSON.parse(raw).concepts as Concept[]).filter((c) => !only || only.includes(c.conceptId))
  console.log(`unit1.json sha256 ${sha}; ${concepts.length} concepts x ${runs} runs, concurrency ${conc}`)
  const jobs: Array<() => Promise<void>> = []
  for (let r = 1; r <= runs; r++) for (const c of concepts) {
    if (existsSync(join(outDir, `${c.conceptId}__run${r}.json`))) continue // resumable
    jobs.push(() => driveLesson(c, r, outDir, sha))
  }
  let next = 0
  await Promise.all(Array.from({ length: conc }, async () => { while (next < jobs.length) await jobs[next++]() }))
  console.log('all done')
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
