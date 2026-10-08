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
 *   npx tsx scripts/qa/physicsProductionBrowserAudit.ts [--out file.json] [--shots dir] [--only id,id]
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
        await say(acct.cookie, sid, 'Show me a diagram')
        for (const v of VIEWS) for (const theme of THEMES) {
          // Same theme key, in-page auditor and animation-clock cap as the dev-page harness.
          const base = await openContext(browser, v.vp === 'mobile' ? 'mobile' : 'desktop-column', theme)
          const page = await base.newPage()
          await page.setViewportSize({ width: v.width, height: v.height })
          await base.addCookies(acct.cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
          const pix = await base.newPage()
          try {
            await page.goto(`${BASE}/learn?subject=physics`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
            await page.waitForSelector('[data-scene-box]', { timeout: 60_000 })
            // Mark the figure's own frame: the nearest ancestor of the canvas box that also holds its controls.
            const marked = await page.evaluate(() => {
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
            await settle(page, 'scene', true)
            const shot = shots ? resolve(shots, `${id}__${v.vp}__${theme}.png`) : null
            const st = await capture(page, pix, 'default', {}, shot)
            const findings = auditRenderedState(st, { expectsScene: true })
            const fails = findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
            const reviews = findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`)
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: fails.length ? 'FAIL' : reviews.length ? 'REVIEW_REQUIRED' : 'PASS', fails, reviews })
          } catch (e) {
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: 'NOT_RUN', fails: [], reviews: [], note: String(e).split('\n')[0].slice(0, 160) })
          }
          console.log(`${id.padEnd(36)} ${v.vp.padEnd(15)} ${theme.padEnd(5)} ${rows[rows.length - 1].verdict} ${rows[rows.length - 1].fails.slice(0, 2).join(' | ')}`)
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
