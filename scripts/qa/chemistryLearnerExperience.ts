/**
 * LEARNER-EXPERIENCE RUN on a REAL account against the DEPLOYED app: drive N Chemistry lessons turn by turn the way a student would
 * (tap the quick checks — mostly right, one deliberately wrong — and ask for a diagram / a different explanation now and then),
 * record exactly what came back on the wire, then open the real /learn page in Chromium and screenshot every figure frame at phone
 * and desktop width so the figures can be LOOKED AT, not inferred from payloads.
 *
 *   QA_EMAIL=… QA_PASSWORD=… npx tsx scripts/qa/chemistryLearnerExperience.ts --concepts a,b,c --out tmp/chem-exp [--max-turns 16] [--subject chemistry|mathematics|physics|…]
 *
 * The credentials come ONLY from the environment of that one invocation: they are never written to a file or a log, and an error
 * message that could echo them is scrubbed. Nothing is deleted. The lessons are opened in 'next' mode (a fresh lesson is not reset).
 * Lessons already COMPLETED on the account confound a mastery read (`CLAUDE.md`, saturated-account note): pick concepts with no
 * topic_progress row.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import { openContext, CHROMIUM_ARGS } from './physicsVisual/render'
import { readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

/**
 * The server never sends the answer key to the client, so a scripted "student who knows the material" answers from the AUTHORED probe corpus:
 * find the probe by its stem, then the served option that is (the head of) its correct choice. A card with no authored match is answered with the
 * first option and reported, so a model-written card is visible in the transcript.
 */
// Keeps the minus sign and the symbols that tell answers apart in Mathematics: "(1, 0)" and "(−1, 0)" must not normalise to the same string.
const norm = (s: string) => s.toLowerCase().replace(/^practice\s*:?\s*/i, '').replace(/[\u2212\u2013]/g, '-').replace(/[^\p{L}\p{N}\s\-/√^π°²³⁄]+/gu, ' ').replace(/\s+/g, ' ').trim()
const PROBES = new Map<string, { correct: string[] }>()
/** Every authored probe of the subject: each `src/lib/teaching/assets/<subject>*.ts` module's exported arrays of `{ stem, choices }`. */
async function loadOracle(subject: string): Promise<number> {
  const dir = resolve('src/lib/teaching/assets')
  for (const f of readdirSync(dir).filter((n) => n.toLowerCase().startsWith(subject.toLowerCase()) && n.endsWith('.ts'))) {
    let mod: Record<string, unknown>
    try { mod = await import(pathToFileURL(resolve(dir, f)).href) } catch { continue }
    for (const v of Object.values(mod)) {
      if (!Array.isArray(v)) continue
      for (const pr of v as Array<{ stem?: string; choices?: Array<{ text: string; isCorrect: boolean }> | null }>) {
        if (!pr || typeof pr.stem !== 'string' || !Array.isArray(pr.choices)) continue
        PROBES.set(norm(pr.stem), { correct: pr.choices.filter((c) => c.isCorrect).map((c) => norm(c.text)) })
      }
    }
  }
  return PROBES.size
}
function oracleIndex(mcq: { question: string; options: string[] }): number {
  const hit = PROBES.get(norm(mcq.question))
  if (!hit) return -1
  return mcq.options.findIndex((o) => { const n = norm(o); return n.length > 0 && hit.correct.some((c) => c === n || c.startsWith(n) || n.startsWith(c)) })
}

const arg = (n: string, d?: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : d }
const SUBJECT = arg('subject', 'chemistry')!
const EMAIL = process.env.QA_EMAIL ?? '', PASSWORD = process.env.QA_PASSWORD ?? ''
const scrub = (s: string) => (PASSWORD ? s.split(PASSWORD).join('***') : s).split(EMAIL).join('<account>')

interface Turn {
  n: number; sent: string; ms: number; provider: string | null; text: string; figure: string | null; figureField: string | null
  mcq: { question: string; options: string[] } | null; mastery: TurnPayload['mastery'] | null; complete: boolean
}

function figureField(p: TurnPayload): string | null {
  return p.sceneSpec ? 'sceneSpec' : p.visualSpec ? 'visualSpec' : p.visual ? 'visual' : p.dynamicVisualizationCode ? 'dynamicVisualizationCode' : null
}

const FILLER = [
  'Okay, I follow. Please continue.',
  'Can you show me a diagram of this?',
  'I am not sure I get it, could you explain it a different way?',
  'Got it. Can I try a practice question?',
]

async function driveLesson(cookie: string, lesson: { lessonTitle: string; order: number; topicSlug: string; unitTitle: string }, total: number, maxTurns: number) {
  const sid = await createSession(cookie, SUBJECT, `qa-exp-${lesson.topicSlug}-${Date.now()}`)
  const turns: Turn[] = []
  const t0 = Date.now()
  let p = await openLesson(cookie, sid, { lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order, topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: total }, 'en', 'next')
  const record = (n: number, sent: string, ms: number, r: TurnPayload) => turns.push({
    n, sent, ms, provider: (r.provider as string | null) ?? null, text: String(r.text ?? ''), figure: carriesFigure(r) ? figureLabel(r) ?? 'figure' : null,
    figureField: figureField(r), mcq: r.mcq ? { question: r.mcq.question, options: r.mcq.options } : null, mastery: r.mastery ?? null, complete: Boolean(r.lessonComplete?.complete) || /Lesson complete|finished — nice work/i.test(String(r.text ?? '')),
  })
  record(0, '(lesson opened)', Date.now() - t0, p)
  let mcqSeen = 0, filler = 0, oracleNote = ''
  for (let n = 1; n <= maxTurns; n++) {
    if (turns[turns.length - 1].complete) break
    let msg: string
    if (p.mcq && p.mcq.options?.length) {
      mcqSeen++
      // The 2nd card is answered wrongly on purpose (a real learner is not always right); every other card is answered correctly when the oracle knows it.
      const right = oracleIndex(p.mcq as { question: string; options: string[] })
      const n0 = p.mcq.options.length
      const idx = right < 0 ? 0 : mcqSeen === 2 ? (right + 1) % n0 : right
      oracleNote = right < 0 ? 'NO-AUTHORED-MATCH(first option tapped)' : mcqSeen === 2 ? 'deliberately wrong' : 'correct'
      msg = p.mcq.options[idx]
    } else {
      msg = FILLER[filler++ % FILLER.length]
    }
    const t1 = Date.now()
    p = await say(cookie, sid, msg)
    record(n, oracleNote ? `${msg}  [${oracleNote}]` : msg, Date.now() - t1, p)
    oracleNote = ''
  }
  return { sid, turns }
}

async function observe(cookie: string, conceptId: string, outDir: string, served: boolean) {
  const notes: string[] = []
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
  try {
    for (const [vp, w, h, theme] of [['mobile', 390, 844, 'dark'], ['desktop-column', 1280, 900, 'dark'], ['mobile', 390, 844, 'light']] as const) {
      const ctx = await openContext(browser, vp === 'mobile' ? 'mobile' : 'desktop-column', theme)
      const page = await ctx.newPage()
      await page.setViewportSize({ width: w, height: h })
      await ctx.addCookies(cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
      try {
        await page.goto(`${BASE}/learn?subject=${SUBJECT}`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
        await page.waitForTimeout(8_000)
        const found = await page.evaluate(() => {
          const frames: Element[] = []
          document.querySelectorAll('[aria-label^="Visual aid:"]').forEach((e) => frames.push(e))
          document.querySelectorAll('[data-scene-box]').forEach((box) => {
            let el: Element | null = box
            while (el && el.parentElement) { el = el.parentElement; if (el.querySelector('input[type="range"]') || /Play the stages|Play the motion/.test(el.textContent ?? '')) break }
            if (el && !frames.includes(el)) frames.push(el)
          })
          // A VisualSpec figure (graph / process flow / number line) lives in its own canvas-visual frame; a scene/card frame may sit inside one.
          document.querySelectorAll('[class*="canvasVisual"]').forEach((f) => { if (!frames.some((x) => x === f || x.contains(f) || f.contains(x))) frames.push(f) })
          document.querySelectorAll('svg[aria-label$="process flow"]').forEach((s) => { const f = s.closest('[class*="canvasVisual"]') ?? s.parentElement; if (f && !frames.some((x) => x === f || x.contains(f) || f.contains(x))) frames.push(f) })
          frames.forEach((f, i) => f.setAttribute('data-qa-frame', String(i)))
          return frames.length
        })
        notes.push(`${vp}/${theme}: ${found} figure frame(s) on the page`)
        await page.screenshot({ path: resolve(outDir, `${conceptId}__${vp}__${theme}__page.png`), fullPage: false })
        for (let i = 0; i < Math.min(found, 3); i++) {
          const loc = page.locator(`[data-qa-frame="${i}"]`)
          await loc.scrollIntoViewIfNeeded().catch(() => undefined)
          await page.waitForTimeout(2_500)
          await loc.screenshot({ path: resolve(outDir, `${conceptId}__${vp}__${theme}__fig${i}.png`) }).catch((e) => notes.push(`fig${i} screenshot failed: ${scrub(String(e)).slice(0, 100)}`))
        }
        if (served && found === 0) notes.push(`${vp}/${theme}: a figure was served on the wire but none was found on the page`)
      } catch (e) {
        notes.push(`${vp}/${theme}: page step failed: ${scrub(String(e)).split('\n')[0].slice(0, 160)}`)
      }
      await ctx.close()
    }
  } finally { await browser.close() }
  return notes
}

async function main() {
  if (!EMAIL || !PASSWORD) throw new Error('set QA_EMAIL and QA_PASSWORD in the environment of this invocation')
  const concepts = (arg('concepts') ?? '').split(',').filter(Boolean)
  const outDir = resolve(arg('out', 'tmp/chem-exp')!)
  const maxTurns = Number(arg('max-turns', '16'))
  mkdirSync(outDir, { recursive: true })
  console.log(`oracle: ${await loadOracle(SUBJECT)} authored ${SUBJECT} probes`)
  const cookie = await login(EMAIL, PASSWORD)
  const cur = await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json() as { lessons: Array<{ lessonTitle: string; order: number; topicSlug: string; unitTitle: string }> }
  const tp = await (await fetch(`${BASE}/api/topic-progress?subject=${SUBJECT}`, { headers: { cookie } })).json() as { topicProgress: Array<{ topicSlug: string; status: string }> }
  const before = new Map(tp.topicProgress.map((r) => [r.topicSlug, r.status]))
  for (const id of concepts) {
    const lesson = cur.lessons.find((l) => l.topicSlug === id)
    if (!lesson) { console.log(`${id}: not in the curriculum`); continue }
    console.log(`\n=== ${id} — ${lesson.lessonTitle} (status before: ${before.get(id) ?? 'FRESH'})`)
    if (process.argv.includes('--observe-only')) {
      // Re-open the lesson in 'resume' mode (it must not re-open a finished lesson, lesson-init/route.ts) and LOOK at the page; no learner turn is sent.
      const sid = await createSession(cookie, SUBJECT, `qa-obs-${id}-${Date.now()}`)
      await openLesson(cookie, sid, { lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order, topicSlug: id, unitTitle: lesson.unitTitle, totalLessons: cur.lessons.length }, 'en', 'resume')
      for (const n of await observe(cookie, id, outDir, true)) console.log(`  OBSERVE ${n}`)
      continue
    }
    try {
      const { turns } = await driveLesson(cookie, lesson, cur.lessons.length, maxTurns)
      const served = turns.some((t) => t.figure)
      for (const t of turns) console.log(`  [${t.n}] ${t.ms}ms ${t.provider ?? '?'} fig=${t.figure ?? '-'} mcq=${t.mcq ? 'Y' : '-'} mastery=${t.mastery ? `${t.mastery.phase}/${t.mastery.verified}` : '-'}${t.complete ? ' COMPLETE' : ''}\n      > ${scrub(t.sent).slice(0, 90)}\n      < ${scrub(t.text).replace(/\s+/g, ' ').slice(0, 220)}`)
      const notes = await observe(cookie, id, outDir, served)
      for (const n of notes) console.log(`  OBSERVE ${n}`)
      writeFileSync(resolve(outDir, `${id}.json`), scrub(JSON.stringify({ conceptId: id, title: lesson.lessonTitle, turns, observe: notes }, null, 1)))
    } catch (e) {
      console.log(`  RUN FAILED: ${scrub(String(e)).split('\n')[0].slice(0, 200)}`)
    }
  }
  const after = await (await fetch(`${BASE}/api/topic-progress?subject=${SUBJECT}`, { headers: { cookie } })).json() as { topicProgress: Array<{ topicSlug: string; status: string; masteryPct: number; attempts: number }> }
  for (const id of concepts) { const r = after.topicProgress.find((x) => x.topicSlug === id); console.log(`PROGRESS ${id}: ${r ? `${r.status} mastery=${r.masteryPct}% attempts=${r.attempts}` : 'no row'}`) }
}
main().catch((e) => { console.error(scrub(String(e))); process.exit(1) })
