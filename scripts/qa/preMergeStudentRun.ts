/**
 * PRE-MERGE STUDENT RUN — six real lessons, driven as a learner.
 *
 * Reads, does not assert. Every verdict in the report is made by a human (me)
 * from the captured transcript; this file's only job is to be honest about what
 * the learner actually received. Four harness defects in this repo were found
 * exactly that way, which is why this does no scoring of its own.
 *
 * Behaves like a REAL learner, not like a certification robot:
 *  - taps the option it believes is right (reading the options, not the key)
 *  - asks for a diagram once
 *  - asks for a simpler explanation once
 *  - answers in its own words at least once (the L1 shape)
 */
import { login } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import fs from 'fs'

/**
 * THE ANSWER KEY COMES FROM THE AUTHORED CORPUS IN GIT, NOT FROM THE PAYLOAD.
 *
 * Discovered while writing this: `mcqForClient` strips `correctIndex` before the
 * response leaves the server, so a script CANNOT read the key off the wire —
 * correct product behaviour, and it means a driver that taps
 * `options[correctIndex]` sends `undefined` and gets HTTP 400. So this
 * simulates a learner who KNOWS the answer by looking the authored key up in
 * the same seed modules the server serves from. Falls back to a wrong-looking
 * guess only when the stem is model-authored (not in the corpus), which is
 * itself worth recording.
 */
let KEYS: Map<string, string> | null = null
async function answerKey(stem: string): Promise<string | null> {
  if (!KEYS) {
    KEYS = new Map()
    const dir = 'src/lib/teaching/assets'
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.ts') || !/SeedAssets|Assets\.ts|Foundations|BandGap/.test(f)) continue
      try {
        const mod = await import(`../../src/lib/teaching/assets/${f.replace(/\.ts$/, '')}`)
        for (const v of Object.values(mod)) {
          if (!Array.isArray(v)) continue
          for (const item of v as { stem?: string; choices?: { text: string; isCorrect?: boolean }[] }[]) {
            if (!item?.stem || !Array.isArray(item.choices)) continue
            const right = item.choices.find((c) => c.isCorrect)
            if (right) KEYS.set(norm(item.stem), right.text)
          }
        }
      } catch { /* a module that does not export probe arrays is not an error */ }
    }
  }
  return KEYS.get(norm(stem)) ?? null
}
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()

const EMAIL = process.env.QA_EMAIL!
const PASSWORD = process.env.QA_PASSWORD!

interface Concept { subject: string; title: string; order: number; slug: string; unit: string; total: number }

const SLUGS: Record<string, string[]> = JSON.parse(process.env.QA_SLUGS!)

/** Resolve real lesson refs from the SAME endpoint the client uses, so the
 *  order/unit/total are the product's own, not this script's guess. */
async function lessonRefs(cookie: string, subject: string, slugs: string[]): Promise<Concept[]> {
  const { BASE } = await import('./liveAccount')
  const res = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  if (!res.ok) throw new Error(`curriculum ${subject} -> ${res.status}`)
  const data = await res.json() as {
    lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[]
  }
  const lessons = data.lessons ?? []
  const out: Concept[] = []
  for (const slug of slugs) {
    const l = lessons.find((x) => x.topicSlug === slug)
    if (l) out.push({ subject, title: l.lessonTitle, order: l.order, slug, unit: l.unitTitle, total: lessons.length })
  }
  return out
}

type Row = {
  turn: number; said: string; text: string; provider: string | null
  figure: string | null; mcq: { q: string; options: string[]; correctIndex: number } | null
  mastery: unknown; complete: boolean
}

function row(n: number, said: string, p: TurnPayload): Row {
  return {
    turn: n, said,
    text: (p.text ?? '').replace(/\s+/g, ' '),
    provider: (p.provider as string) ?? null,
    figure: carriesFigure(p) ? (figureLabel(p) ?? 'figure') : null,
    mcq: p.mcq ? { q: p.mcq.question, options: p.mcq.options, correctIndex: p.mcq.correctIndex ?? null } : null,
    mastery: p.mastery ?? null,
    complete: Boolean(p.lessonComplete?.complete),
  }
}

async function runConcept(cookie: string, c: Concept): Promise<Row[]> {
  const sessionId = await createSession(cookie, c.subject)
  const rows: Row[] = []
  const open = await openLesson(cookie, sessionId, {
    lessonTitle: c.title, lessonOrder: c.order, topicSlug: c.slug,
    unitTitle: c.unit, totalLessons: c.total,
  })
  rows.push(row(0, '(opened lesson)', open))

  let pending: { q: string; options: string[] } | null =
    open.mcq ? { q: open.mcq.question, options: open.mcq.options } : null
  let unkeyed = 0
  // A real learner's script. Deliberately mixes taps with prose.
  const plan = [
    'ok', 'TAP', 'can you show me a diagram?', 'TAP',
    'that was a bit confusing, can you explain it more simply?', 'TAP',
    'PROSE', 'TAP', 'TAP', 'TAP', 'ok', 'TAP',
  ]
  for (let i = 0; i < plan.length; i++) {
    let msg = plan[i]
    if (msg === 'TAP' || msg === 'PROSE') {
      const key = pending ? await answerKey(pending.q) : null
      if (!pending) msg = 'ok, got it'
      else if (!key) { msg = pending.options[0]; unkeyed++ }   // model-authored stem: guess
      else if (plan[i] === 'PROSE') msg = `i think it's ${key.toLowerCase()}`   // the L1 shape
      else msg = key
    }
    const p = await say(cookie, sessionId, msg)
    rows.push(row(i + 1, msg, p))
    pending = p.mcq ? { q: p.mcq.question, options: p.mcq.options } : null
    if (p.lessonComplete?.complete) break
  }
  if (unkeyed) process.stdout.write(`  (${unkeyed} model-authored stems answered by guess)\n`)
  return rows
}

async function main() {
  const cookie = await login(EMAIL, PASSWORD)
  const CONCEPTS: Concept[] = []
  for (const [subject, slugs] of Object.entries(SLUGS)) {
    const refs = await lessonRefs(cookie, subject, slugs)
    for (const s of slugs) if (!refs.find((r) => r.slug === s)) process.stdout.write(`  !! ${subject}:${s} NOT FOUND in curriculum\n`)
    CONCEPTS.push(...refs)
  }
  const out: Record<string, Row[]> = {}
  for (const c of CONCEPTS) {
    process.stdout.write(`\n### ${c.subject} :: ${c.title}\n`)
    try {
      out[`${c.subject}:${c.slug}`] = await runConcept(cookie, c)
      const rs = out[`${c.subject}:${c.slug}`]
      const last = rs[rs.length - 1]
      process.stdout.write(`  turns=${rs.length - 1} figures=${rs.filter(r => r.figure).length} mcqs=${rs.filter(r => r.mcq).length} final=${JSON.stringify(last.mastery)} complete=${last.complete}\n`)
    } catch (e) {
      process.stdout.write(`  FAILED: ${(e as Error).message}\n`)
      out[`${c.subject}:${c.slug}`] = []
    }
    fs.writeFileSync(process.env.QA_OUT!, JSON.stringify(out, null, 1))
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
