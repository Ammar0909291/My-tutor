/**
 * PRODUCTION VISUAL CLOSURE — what a learner's browser does on the deployed /learn page.
 *
 * A READY deployment, a healthy API and a local screenshot are not proof that the learner-facing page works. This drives
 * the real deployed app (disposable account, real Chromium, the learner's cookie) and records evidence for the two
 * things the local suites cannot see:
 *
 *   --mode legibility   MULTI-CARD CONTRAST. The lesson page lists the lesson's messages from every session, so a learner
 *                       who asked for a diagram several times holds several cards, the older ones above the fold.
 *                       The shared legibility pass used to run once at mount, when an off-screen card cannot be hit-tested,
 *                       and never again — so an older card, scrolled into view later, kept unlifted text. This opens the
 *                       page on a phone-height viewport (so older cards ARE off screen), then scrolls each card into view
 *                       the way a learner does and measures it (4.5:1) and the hook's own markers.
 *   --mode interact     INTERACTION. Moves the figure's own sliders (lens power: P, P₁, P₂, gap; normal force: θ, F) and
 *                       checks that the printed labels follow the controls (P = 1/f, N = (mg + F) cos θ), that nothing
 *                       overlaps or blanks, and that the figure stays legible in every state it was driven to.
 *
 * Every row carries what a reviewer needs to tie it to a deployment: base URL, deployment id and commit (passed in with
 * --deployment/--commit), viewport, theme, concept, the id of the message whose card was measured, and a screenshot.
 * The account is deleted at the end and re-login is attempted and must be BLOCKED; both results are written to the report.
 *
 *   npx tsx scripts/qa/productionVisualClosure.ts --mode legibility --subject physics --concept phys.mech.force \
 *     --cards 4 --out report.json --shots dir --deployment dpl_xxx --commit abc1234
 *   npx tsx scripts/qa/productionVisualClosure.ts --mode interact --out report.json --shots dir --deployment dpl_xxx --commit abc1234
 */
import { chromium, type Page } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure } from './liveSession'
import { auditRenderedState } from '../../src/lib/teaching/visual/figureAudit'
import { capture, openContext, settle, CHROMIUM_ARGS, readSliders, setSlider, type ThemeName, type ViewportName } from './physicsVisual/render'
import { selectTargetFigure, markFigure, type FigureSelection } from './physicsVisual/figureAssociation'

const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }
const MODE = arg('mode') ?? 'legibility'
const SUBJECT = arg('subject') ?? 'physics'
const THEMES: ThemeName[] = (arg('themes')?.split(',') as ThemeName[] | undefined) ?? ['dark', 'light']
/** A real phone and a real desktop window — NOT the enlarged pages the dev audit uses, which put every card on screen. */
const VIEWS: Array<{ vp: ViewportName; width: number; height: number }> = [
  { vp: 'mobile', width: 390, height: 844 },
  { vp: 'desktop-column', width: 1280, height: 800 },
]

interface Row {
  mode: string; conceptId: string; vp: string; theme: string; step: string
  verdict: 'PASS' | 'FAIL' | 'REVIEW_REQUIRED' | 'NOT_RUN'
  fails: string[]; reviews: string[]; note?: string
  figure?: FigureSelection
  markers?: unknown
  texts?: string[]
  screenshot?: string | null
  deployment: string | null; commit: string | null
}
const rows: Row[] = []
const stamp = { deployment: arg('deployment') ?? null, commit: arg('commit') ?? null }
const shots = arg('shots')

function push(r: Omit<Row, 'deployment' | 'commit' | 'verdict'> & { verdict?: Row['verdict'] }) {
  const verdict = r.verdict ?? (r.fails.length ? 'FAIL' : r.reviews.length ? 'REVIEW_REQUIRED' : 'PASS')
  rows.push({ ...r, verdict, ...stamp })
  console.log(`${r.mode.padEnd(11)} ${r.conceptId.padEnd(30)} ${r.vp.padEnd(15)} ${r.theme.padEnd(5)} ${r.step.padEnd(34)} ${verdict}${r.fails.length ? ' ' + r.fails.slice(0, 2).join(' | ') : ''}${r.note ? ` [${r.note}]` : ''}`)
}

/** What the shared legibility hook left on a figure (plain JS: evaluated in the page). */
const MARKERS_JS = `(function () {
  var roots = Array.prototype.slice.call(document.querySelectorAll('[aria-label^="Visual aid:"], [data-scene-box]')).filter(function (b) { return b.matches('[aria-label^="Visual aid:"]') || !b.closest('[aria-label^="Visual aid:"]'); });
  var vh = window.innerHeight;
  return roots.map(function (r, i) {
    var rect = r.getBoundingClientRect();
    var m = r.closest('[data-message-id]');
    var host = r.closest('[data-figure-legibility]') || r.querySelector('[data-figure-legibility]');
    return {
      index: i,
      messageId: m ? m.getAttribute('data-message-id') : null,
      inViewport: rect.bottom > 0 && rect.top < vh,
      top: Math.round(rect.top), height: Math.round(rect.height),
      legibilityMarker: !!host,
      unmeasured: host ? host.getAttribute('data-contrast-unmeasured') : null,
    };
  });
})()`

async function setupAccount(): Promise<{ acct: QaAccount; lessons: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }> {
  const acct = await createQaAccount(`${SUBJECT.slice(0, 4)}${MODE.slice(0, 4)}`)
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'content-type': 'application/json', cookie: acct.cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: `I am learning ${SUBJECT}.` }),
  })
  if (!ob.ok) throw new Error(`onboarding ${ob.status}`)
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie: acct.cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  return { acct, lessons: curr.lessons ?? [] }
}

const cookieJar = (acct: QaAccount) => acct.cookie.split(';').map((c) => {
  const [n, ...rest] = c.trim().split('=')
  return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const }
})

async function learnerPage(browser: Awaited<ReturnType<typeof chromium.launch>>, acct: QaAccount, v: (typeof VIEWS)[number], theme: ThemeName) {
  const ctx = await openContext(browser, v.vp, theme)
  const page = await ctx.newPage()
  await page.setViewportSize({ width: v.width, height: v.height })
  await ctx.addCookies(cookieJar(acct))
  const pix = await ctx.newPage()
  return { ctx, page, pix }
}

/** One reply that carries a figure for `topicSlug`; returns its text. */
async function askForFigure(acct: QaAccount, lessons: Awaited<ReturnType<typeof setupAccount>>['lessons'], topicSlug: string, say_ = 'Show me a diagram', tries = 6): Promise<string> {
  const l = lessons.find((x) => x.topicSlug === topicSlug)
  if (!l) throw new Error(`${topicSlug} is not in the production ${SUBJECT} curriculum`)
  for (let i = 1; i <= tries; i++) {
    const sid = await createSession(acct.cookie, SUBJECT)
    await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })
    const turn = await say(acct.cookie, sid, say_)
    console.log(`  ${topicSlug} reply ${i}: figure=${carriesFigure(turn)} (${(turn.text ?? '').length} chars)`)
    if (carriesFigure(turn) && turn.text) return turn.text
  }
  throw new Error(`no figure-bearing reply for ${topicSlug} after ${tries} tries`)
}

async function waitFigures(page: Page, n: number): Promise<number> {
  let count = 0
  for (const t0 = Date.now(); Date.now() - t0 < 60_000;) {
    count = await page.evaluate(`document.querySelectorAll('[aria-label^="Visual aid:"], [data-scene-box]').length`) as number
    if (count >= n) break
    await page.waitForTimeout(1_000)
  }
  return count
}

// ───────────────────────────────────────────────────────────── legibility

async function legibilityMode(acct: QaAccount, lessons: Awaited<ReturnType<typeof setupAccount>>['lessons'], browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const concept = arg('concept') ?? 'phys.mech.force'
  const cards = Number(arg('cards') ?? 4)
  const replies: string[] = []
  for (let i = 0; i < cards; i++) replies.push(await askForFigure(acct, lessons, concept))
  for (const v of VIEWS) for (const theme of THEMES) {
    const { ctx, page, pix } = await learnerPage(browser, acct, v, theme)
    try {
      await page.goto(`${BASE}/learn?subject=${SUBJECT}`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      const found = await waitFigures(page, cards)
      if (found < cards) { push({ mode: 'legibility', conceptId: concept, vp: v.vp, theme, step: 'load', fails: [], reviews: [], verdict: 'NOT_RUN', note: `only ${found} of ${cards} figures on the page` }); continue }
      // Where the learner starts: at the newest message. Older cards sit above the fold.
      await page.evaluate(`(function () { var m = document.querySelectorAll('[data-message-id]'); if (m.length) m[m.length - 1].scrollIntoView({ block: 'end' }); })()`)
      await page.waitForTimeout(2_500)
      const initial = await page.evaluate(MARKERS_JS) as Array<{ inViewport: boolean }>
      console.log(`  ${v.vp}/${theme}: ${initial.length} figures, ${initial.filter((x) => x.inViewport).length} in the viewport at load`)
      for (let i = 0; i < cards; i++) {
        let sel: FigureSelection
        // --explicit-index is for measuring a deployment that PREDATES the message markers (the "before" run of a fix that ships
        // them): the page lists the lesson oldest-first, so the i-th figure is the i-th reply. Never the default — an
        // unmarked page is otherwise refused (figureAssociation.ts), and the row says how the figure was chosen.
        try { sel = await selectTargetFigure(page, process.argv.includes('--explicit-index') ? { index: i } : { replyText: replies[i] }) } catch (e) {
          push({ mode: 'legibility', conceptId: concept, vp: v.vp, theme, step: `card ${i + 1}/${cards}`, fails: [`WRONG_FIGURE ${String(e).split('\n')[0]}`], reviews: [] }); continue
        }
        // markFigure scrolls the card into view — the learner's action under test.
        await markFigure(page, sel.index)
        await page.waitForTimeout(2_000)
        await settle(page, sel.kind, sel.kind === 'scene')
        const shot = shots ? resolve(shots, `legibility__${concept}__${v.vp}__${theme}__card${i + 1}.png`) : null
        const st = await capture(page, pix, 'default', {}, shot)
        const findings = auditRenderedState(st, { expectsScene: sel.kind === 'scene' })
        const fails = findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
        const reviews = findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`)
        const markers = (await page.evaluate(MARKERS_JS) as Array<{ index: number; unmeasured: string | null; legibilityMarker: boolean }>)[sel.index]
        // A card that is in view must have been measured: an "unmeasured" marker on a visible card means the pass gave up.
        if (markers?.unmeasured) fails.push(`UNMEASURED ${markers.unmeasured} text element(s) were never contrast-checked while the card was on screen`)
        push({ mode: 'legibility', conceptId: concept, vp: v.vp, theme, step: `card ${i + 1}/${cards} scrolled into view`, fails, reviews, figure: sel, markers, screenshot: shot })
      }
    } finally { await ctx.close() }
  }
}

// ───────────────────────────────────────────────────────────── interaction

interface Check { name: string; set: Record<string, number>; expect: RegExp[]; forbid?: RegExp[] }
interface Plan { concept: string; checks: Check[] }
/** Slider labels are matched by prefix; every expectation is a claim the lesson makes (P = 1/f; N = (mg + F) cos θ). */
const PLANS: Plan[] = [
  {
    concept: 'phys.opt.lens-power',
    checks: [
      { name: 'one lens, P = +4 D', set: { 'P (one lens)': 4 }, expect: [/P = 1\/f = \+4 D/, /f = 0\.25 m/] },
      { name: 'one lens, P = −2 D (diverging)', set: { 'P (one lens)': -2 }, expect: [/P = 1\/f = −2 D/, /f = −0\.50 m/] },
      { name: 'one lens, P = 0 (plate: f is infinite)', set: { 'P (one lens)': 0 }, expect: [/f = ∞/] },
      { name: 'pair in contact, +4 and +2 add to +6 D', set: { 'P₁': 4, 'P₂': 2, 'Gap d': 0 }, expect: [/P₁ \+ P₂ = \+6 D/] },
      { name: 'pair 0.1 m apart: P₁ + P₂ − d·P₁P₂ = +5.2 D', set: { 'P₁': 4, 'P₂': 2, 'Gap d': 0.1 }, expect: [/P = \+5\.2 D/], forbid: [/P₁ \+ P₂ = \+6 D/] },
    ],
  },
  {
    concept: 'phys.mech.normal-force',
    checks: [
      { name: 'level, no push: N = 1.00 mg', set: { 'θ': 0, 'F (down)': 0 }, expect: [/N = 1\.00 mg/] },
      { name: 'θ = 30°: N = 0.87 mg, less than the weight', set: { 'θ': 30, 'F (down)': 0 }, expect: [/θ = 30°/, /N = 0\.87 mg/] },
      { name: 'θ = 60°: N = 0.50 mg', set: { 'θ': 60, 'F (down)': 0 }, expect: [/θ = 60°/, /N = 0\.50 mg/] },
      { name: 'level + push F = 0.5 mg: N = 1.50 mg (more than the weight)', set: { 'θ': 0, 'F (down)': 0.5 }, expect: [/F = 0\.50 mg/, /N = 1\.50 mg/] },
    ],
  },
]

const SCENE_TEXTS_JS = `(function () {
  var frame = document.querySelector('[data-audit-frame]');
  if (!frame) return [];
  return Array.prototype.slice.call(frame.querySelectorAll('[data-scene-box] span')).map(function (s) { return (s.textContent || '').trim(); }).filter(Boolean);
})()`

async function interactMode(acct: QaAccount, lessons: Awaited<ReturnType<typeof setupAccount>>['lessons'], browser: Awaited<ReturnType<typeof chromium.launch>>) {
  const only = arg('only')?.split(',')
  for (const plan of PLANS.filter((p) => !only || only.includes(p.concept))) {
    let reply: string
    try { reply = await askForFigure(acct, lessons, plan.concept) } catch (e) {
      push({ mode: 'interact', conceptId: plan.concept, vp: '-', theme: '-', step: 'ask', fails: [], reviews: [], verdict: 'NOT_RUN', note: String(e).split('\n')[0].slice(0, 160) }); continue
    }
    for (const v of VIEWS) for (const theme of THEMES) {
      const { ctx, page, pix } = await learnerPage(browser, acct, v, theme)
      try {
        await page.goto(`${BASE}/learn?subject=${SUBJECT}`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
        await waitFigures(page, 1)
        let sel: FigureSelection | undefined
        for (const t0 = Date.now(); !sel; ) {
          try { sel = await selectTargetFigure(page, { replyText: reply }) } catch (e) {
            if (!/NO_FIGURE/.test(String(e)) || Date.now() - t0 > 60_000) throw e
            await page.waitForTimeout(1_000)
          }
        }
        await markFigure(page, sel.index)
        if (sel.kind !== 'scene') { push({ mode: 'interact', conceptId: plan.concept, vp: v.vp, theme, step: 'figure kind', fails: [`the learner got a ${sel.kind}, not the interactive scene`], reviews: [], figure: sel }); continue }
        await settle(page, 'scene', true)
        const sliders = await readSliders(page)
        const find = (label: string) => sliders.find((s) => s.label.replace(/\s+/g, ' ').trim().startsWith(label))
        const shot0 = shots ? resolve(shots, `interact__${plan.concept}__${v.vp}__${theme}__default.png`) : null
        const st0 = await capture(page, pix, 'default', {}, shot0)
        const f0 = auditRenderedState(st0, { expectsScene: true })
        push({
          mode: 'interact', conceptId: plan.concept, vp: v.vp, theme, step: 'as delivered (default)', figure: sel, screenshot: shot0, texts: await page.evaluate(SCENE_TEXTS_JS) as string[],
          fails: f0.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`), reviews: f0.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`),
          note: `sliders: ${sliders.map((s) => `${s.label.trim()} [${s.min}..${s.max}]`).join(', ')}`,
        })
        for (const [ci, check] of plan.checks.entries()) {
          const fails: string[] = []
          for (const [label, value] of Object.entries(check.set)) {
            const s = find(label)
            if (!s) { fails.push(`NO_CONTROL no slider labelled "${label}" (have: ${sliders.map((x) => x.label.trim()).join(' | ')})`); continue }
            if (value < s.min - 1e-9 || value > s.max + 1e-9) { fails.push(`CONTROL_RANGE "${label}"=${value} is outside the control's own range ${s.min}..${s.max}`); continue }
            await setSlider(page, s.index, value)
          }
          await settle(page, 'scene', true)
          await page.waitForTimeout(600)
          const texts = await page.evaluate(SCENE_TEXTS_JS) as string[]
          const joined = texts.join('\n')
          for (const re of check.expect) if (!re.test(joined)) fails.push(`LABEL_DISAGREES expected a label matching ${re} — the figure printed: ${texts.join(' | ').slice(0, 300)}`)
          for (const re of check.forbid ?? []) if (re.test(joined)) fails.push(`STALE_LABEL a label matching ${re} is still printed after the control moved`)
          const shot = shots ? resolve(shots, `interact__${plan.concept}__${v.vp}__${theme}__c${ci + 1}.png`) : null
          const st = await capture(page, pix, check.name, check.set as unknown as Record<string, string>, shot)
          const findings = auditRenderedState(st, { expectsScene: true })
          fails.push(...findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`))
          push({ mode: 'interact', conceptId: plan.concept, vp: v.vp, theme, step: check.name, figure: sel, screenshot: shot, texts, fails, reviews: findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`) })
        }
      } catch (e) {
        push({ mode: 'interact', conceptId: plan.concept, vp: v.vp, theme, step: 'drive', fails: [], reviews: [], verdict: 'NOT_RUN', note: String(e).split('\n')[0].slice(0, 200) })
      } finally { await ctx.close() }
    }
  }
}

// ───────────────────────────────────────────────────────────── main

async function main() {
  if (shots) mkdirSync(shots, { recursive: true })
  const { acct, lessons } = await setupAccount()
  let cleanup: { deleted: boolean; reloginBlocked: boolean } | undefined
  try {
    const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
    try {
      if (MODE === 'legibility') await legibilityMode(acct, lessons, browser)
      else if (MODE === 'interact') await interactMode(acct, lessons, browser)
      else throw new Error(`unknown --mode ${MODE}`)
    } finally { await browser.close() }
  } finally {
    cleanup = await deleteQaAccount(acct)
    console.log(`disposable account deleted = ${cleanup.deleted}, re-login blocked = ${cleanup.reloginBlocked}`)
  }
  const tally = rows.reduce<Record<string, number>>((m, r) => { m[r.verdict] = (m[r.verdict] ?? 0) + 1; return m }, {})
  console.log('TALLY', JSON.stringify(tally))
  const out = arg('out')
  if (out) writeFileSync(out, JSON.stringify({ base: BASE, mode: MODE, subject: SUBJECT, ...stamp, at: new Date().toISOString(), tally, accountCleanup: cleanup, rows }, null, 1))
  if (!cleanup?.deleted || !cleanup.reloginBlocked) process.exitCode = 3
  else if ((tally.FAIL ?? 0) > 0 || (tally.NOT_RUN ?? 0) > 0) process.exitCode = 1
}
main().catch((e) => { console.error(e); process.exit(2) })
