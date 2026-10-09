/**
 * PRODUCTION BROWSER VERIFICATION — the real lesson page, the real deployment.
 *
 * `scripts/qa/physicsVisual` renders every figure on a dev-only page that is 404 in
 * production. This is the same measurement pointed at the DEPLOYED app: a
 * disposable learner is onboarded to Physics, a lesson is opened and a diagram asked
 * for over the API (physicsProductionVisualVerify.ts does that half), then the
 * app's own /learn page — which resumes that session and draws the figure with the
 * production bundle — is loaded in Chromium at phone and desktop width in both
 * themes. The figure's frame is marked, measured with the SAME in-page auditor
 * (`inpage.js`: boxes, computed styles, pixels behind every glyph) and judged by
 * the SAME rules (`auditRenderedState`). Default state only: slider and simulation
 * sweeps are in the dev-page audit; this proves the deployed bundle paints the
 * audited figure legibly in the real page chrome.
 *
 *   npx tsx scripts/qa/physicsProductionBrowserAudit.ts [--out file.json] [--shots dir] [--only id,id] [--say "message"]
 *   (a card in the lesson shows as many steps as the tutor's reply has sentences, so ask for a long reply with --say to see every step)
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say } from './liveSession'
import { auditRenderedState } from '../../src/lib/teaching/visual/figureAudit'
import { capture, openContext, settle, CHROMIUM_ARGS, type ThemeName } from './physicsVisual/render'

const CONCEPTS = [
  'phys.meas.vector-addition', 'phys.mech.kinematics-1d', 'phys.em.electric-dipole', 'phys.mech.torque',
  'phys.mech.newtons-second-law', 'phys.wave.pendulum', 'phys.mech.variation-of-g',
  'phys.em.moving-coil-galvanometer', 'phys.mech.orbital-mechanics',
  // 2026-10-08 REVIEW_REQUIRED follow-up: every concept whose figure (or shared card / generator) changed.
  // Cards (force diagram, double slit, wave function, potential well, tunneling, orbitals) have no
  // [data-scene-box]; they are framed by their own `aria-label="Visual aid: …"` root.
  'phys.mech.force', 'phys.mech.free-body-diagram', 'phys.mech.friction', 'phys.mech.normal-force', 'phys.mech.equilibrium',
  'phys.mech.conservation-of-momentum', 'phys.opt.mirrors', 'phys.opt.lenses', 'phys.opt.lens-power',
  'phys.mod.wave-particle-duality', 'phys.opt.youngs-experiment', 'phys.qm.wave-function', 'phys.qm.particle-in-box',
  'phys.qm.hydrogen-atom-qm', 'phys.qm.quantum-tunneling', 'phys.particle.particle-classification',
]
const VIEWS: Array<{ vp: 'mobile' | 'desktop-column'; width: number; height: number }> = [
  { vp: 'mobile', width: 390, height: 2600 },
  { vp: 'desktop-column', width: 1280, height: 1700 },
]
const THEMES: ThemeName[] = ['dark', 'light']
const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }

async function main() {
  const out = arg('out'), shots = arg('shots')
  if (shots) mkdirSync(shots, { recursive: true })
  const acct = await createQaAccount('physbrowser')
  const rows: Array<{ conceptId: string; vp: string; theme: string; verdict: string; fails: string[]; reviews: string[]; note?: string }> = []
  try {
    const ob = await fetch(`${BASE}/api/onboarding`, {
      method: 'POST', headers: { 'content-type': 'application/json', cookie: acct.cookie },
      body: JSON.stringify({ subjectSlug: 'physics', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning physics.' }),
    })
    if (!ob.ok) throw new Error(`onboarding ${ob.status}`)
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie: acct.cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
    try {
      for (const id of CONCEPTS.filter((c) => !arg('only') || arg('only')!.split(',').includes(c))) {
        const l = lessons.find((x) => x.topicSlug === id)
        if (!l) { rows.push({ conceptId: id, vp: '-', theme: '-', verdict: 'NOT_RUN', fails: [], reviews: [], note: 'not in production curriculum' }); continue }
        const sid = await createSession(acct.cookie, 'physics')
        await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: id, unitTitle: l.unitTitle, totalLessons: lessons.length })
        await say(acct.cookie, sid, arg('say') ?? 'Show me a diagram')
        for (const v of VIEWS) for (const theme of THEMES) {
          // Same theme key, in-page auditor and animation-clock cap as the dev-page harness.
          const base = await openContext(browser, v.vp === 'mobile' ? 'mobile' : 'desktop-column', theme)
          const page = await base.newPage()
          await page.setViewportSize({ width: v.width, height: v.height })
          await base.addCookies(acct.cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
          const pix = await base.newPage()
          try {
            await page.goto(`${BASE}/learn?subject=physics`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
            await page.waitForSelector('[data-scene-box], [aria-label^="Visual aid:"]', { timeout: 60_000 })
            // Mark the figure's own frame: the nearest ancestor of the canvas box that also holds its controls
            // (a scene), or the card's own root (a card).
            // A card is identified by ITS OWN root (only VisualCard sets this label). `[data-scene-box]` cannot decide it:
            // ThreeDVisual sets it too, so a 3D card (e.g. the orbital explorer) also contains one.
            const kind = await page.evaluate(() => (document.querySelector('[aria-label^="Visual aid:"]') ? 'card' : 'scene'))
            const marked = await page.evaluate(() => {
              const card = document.querySelector('[aria-label^="Visual aid:"]')
              if (card) {
                card.setAttribute('data-audit-frame', '')
                card.scrollIntoView({ block: 'start' })
                return true
              }
              const box = document.querySelector('[data-scene-box]')
              let el: Element | null = box
              while (el && el.parentElement) {
                el = el.parentElement
                if (el.querySelector('input[type="range"]') || /Play the stages|Play the motion/.test(el.textContent ?? '')) break
              }
              if (!el) return false
              el.setAttribute('data-audit-frame', '')
              el.scrollIntoView({ block: 'start' })
              return true
            })
            if (!marked) throw new Error('figure frame not found')
            // In the lesson a card is driven by the tutor's narration: one beat per sentence, 0.7 s each (VisualCard),
            // so a measurement taken on arrival sees a PARTIAL figure (one measured: friction with only the box on
            // screen). Run it at 1.5x and let the whole narration play out. (The main button cannot be used as the
            // "finished" signal: in narration mode it keeps reading "Pause" after the last beat.) The screenshot is the
            // evidence that the LAST step is drawn.
            if (kind === 'card') {
              await page.locator('[data-audit-frame] button', { hasText: /^1\.5x$/ }).first().click({ timeout: 10_000 }).catch(() => undefined)
              // Wait until the picture stops changing (three identical frames six seconds apart): the narration's length
              // differs per tutor reply, so a fixed wait caught some cards on step 3 or 4 of 5.
              const frame = page.locator('[data-audit-frame]')
              let prev = '', same = 0
              const t0 = Date.now()
              while (Date.now() - t0 < 150_000 && same < 3) {
                await page.waitForTimeout(6_000)
                const now = (await frame.screenshot()).toString('base64')
                if (now === prev) same++; else { same = 0; prev = now }
              }
            }
            await settle(page, kind, kind === 'scene')
            const shot = shots ? resolve(shots, `${id}__${v.vp}__${theme}.png`) : null
            const st = await capture(page, pix, 'default', {}, shot)
            const findings = auditRenderedState(st, { expectsScene: kind === 'scene' })
            const fails = findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
            const reviews = findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`)
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: fails.length ? 'FAIL' : reviews.length ? 'REVIEW_REQUIRED' : 'PASS', fails, reviews })
          } catch (e) {
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: 'NOT_RUN', fails: [], reviews: [], note: String(e).split('\n')[0].slice(0, 160) })
          }
          console.log(`${id.padEnd(36)} ${v.vp.padEnd(15)} ${theme.padEnd(5)} ${rows[rows.length - 1].verdict} ${rows[rows.length - 1].fails.slice(0, 2).join(' | ')}${rows[rows.length - 1].note ? ` [${rows[rows.length - 1].note}]` : ''}`)
          await base.close()
        }
      }
    } finally { await browser.close() }
  } finally {
    console.log('disposable account deleted =', (await deleteQaAccount(acct)).deleted)
  }
  const tally = rows.reduce<Record<string, number>>((m, r) => { m[r.verdict] = (m[r.verdict] ?? 0) + 1; return m }, {})
  console.log('TALLY', JSON.stringify(tally))
  if (out) writeFileSync(out, JSON.stringify({ base: BASE, at: new Date().toISOString(), tally, rows }, null, 1))
}
main().catch((e) => { console.error(e); process.exit(1) })
