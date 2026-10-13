/**
 * PRODUCTION BROWSER VERIFICATION for the Chemistry visual closure — the real lesson page, the real deployment.
 *
 * `scripts/chemistry/visual-audit` renders every figure on a dev-only page (404 in production). This points the SAME
 * measurement at the DEPLOYED app: a disposable learner is onboarded to Chemistry, a lesson is opened and a diagram asked
 * for over the API (what a learner gets on the wire is recorded), then the app's own /learn page — which resumes that session
 * and draws the figure with the production bundle — is loaded in Chromium at phone and desktop width in both themes. The figure's
 * frame is marked, measured with the SAME in-page auditor (`physicsVisual/inpage.js`: boxes, computed styles, pixels behind
 * every glyph) and judged by the SAME rules (`auditRenderedState`). Default state only: the stage / control sweeps are in the
 * dev-page audit; this proves the deployed bundle paints the audited figure legibly in the real page chrome.
 *
 * Each row also records what was SERVED (renderer field + fingerprint) next to what this checkout resolves for the same
 * concept, so "production serves what was audited" is a comparison of two fingerprints, not an assumption. A concept whose
 * figure was retired must come back with NO figure.
 *
 *   npx tsx scripts/qa/chemistryProductionBrowserAudit.ts [--out file.json] [--shots dir] [--only id,id] [--expect-none id,id]
 *
 * Disposable account only (`liveAccount.ts`: register -> drive -> delete); nothing real is read or written.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import { auditRenderedState } from '../../src/lib/teaching/visual/figureAudit'
import { figureFingerprint } from '../../src/lib/teaching/visual/fingerprint'
import { resolveVisual } from '../../src/lib/teaching/visual/resolveVisual'
import { capture, openContext, settle, CHROMIUM_ARGS, type ThemeName } from './physicsVisual/render'

/** Concepts whose figure this closure changed, one per figure family, plus the Tier 2/3 figures and the retired ones. */
const CONCEPTS = [
  // Tier 0 / 1 — changed or newly audited
  'chem.bond.vsepr', 'chem.thermo.first-law', 'chem.thermo.bond-enthalpy', 'chem.thermo.enthalpy', 'chem.solid.packing',
  'chem.period.periodic-properties', 'chem.elect.batteries', 'chem.elect.industrial', 'chem.elect.electrolysis',
  'chem.coord.stability', 'chem.atomic.bohr-model', 'chem.atomic.electronic-config', 'chem.bond.covalent-bonding',
  'chem.state.real-gases', 'chem.dblock.organometallics',
  // authored or reworded by the closure's second round
  'chem.surface.colloids', 'chem.sblock.water', 'chem.poly.biodegradable', 'chem.found.matter', 'chem.bond.ionic-bonding',
  // Tier 3 (generated, would-be-served) and Tier 2 (approved): the process-flow numeral / contrast fix, the graph-domain repair
  'chem.found.states-of-matter', 'chem.found.mole-concept', 'chem.found.significant-figures', 'chem.found.stoichiometry', 'chem.state.gas-laws',
  'chem.kinet.rate-law', 'chem.sol.colligative', 'chem.pblock.group18', 'chem.hal.sn2',
]
/** Retired by the review: an explicit diagram request must return NO figure for these (or a regenerated, different one). */
const RETIRED = ['chem.equil.titration', 'chem.hyd.arenes', 'chem.nitro.amines', 'chem.carb.ketones', 'chem.org.hybridization', 'chem.dblock.oxo-species']

const VIEWS: Array<{ vp: 'mobile' | 'desktop-column'; width: number; height: number }> = [
  { vp: 'mobile', width: 390, height: 2600 },
  { vp: 'desktop-column', width: 1280, height: 1700 },
]
const THEMES: ThemeName[] = ['dark', 'light']
const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }

interface Row {
  conceptId: string; vp: string; theme: string; verdict: string; fails: string[]; reviews: string[]
  wire?: { field: string | null; label: string | null; fingerprint: string | null }
  expected?: { served: boolean; fingerprint: string | null }
  note?: string
}

function wireOf(p: TurnPayload): { field: string | null; label: string | null; fingerprint: string | null } {
  if (!carriesFigure(p)) return { field: null, label: null, fingerprint: null }
  const field = p.sceneSpec ? 'sceneSpec' : p.visualSpec ? 'visualSpec' : p.visual ? 'visual' : 'dynamicVisualizationCode'
  const value = (p as Record<string, unknown>)[field]
  let fingerprint: string | null = null
  try {
    fingerprint = field === 'visual'
      ? figureFingerprint({ renderer: 'card', visualType: String(value) } as never)
      : figureFingerprint({ renderer: field === 'sceneSpec' ? 'scene' : 'spec', [field]: value } as never)
  } catch { fingerprint = null }
  return { field, label: figureLabel(p), fingerprint }
}

async function main() {
  const out = arg('out'), shots = arg('shots')
  if (shots) mkdirSync(shots, { recursive: true })
  const only = arg('only')?.split(',')
  const acct = await createQaAccount('chembrowser')
  const rows: Row[] = []
  try {
    const ob = await fetch(`${BASE}/api/onboarding`, {
      method: 'POST', headers: { 'content-type': 'application/json', cookie: acct.cookie },
      body: JSON.stringify({ subjectSlug: 'chemistry', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning chemistry.' }),
    })
    if (!ob.ok) throw new Error(`onboarding ${ob.status}`)
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=chemistry`, { headers: { cookie: acct.cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
    try {
      for (const id of [...CONCEPTS, ...RETIRED].filter((c) => !only || only.includes(c))) {
        const l = lessons.find((x) => x.topicSlug === id)
        if (!l) { rows.push({ conceptId: id, vp: '-', theme: '-', verdict: 'NOT_RUN', fails: [], reviews: [], note: 'not in production curriculum' }); continue }
        const sid = await createSession(acct.cookie, 'chemistry')
        await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: id, unitTitle: l.unitTitle, totalLessons: lessons.length })
        const turn = await say(acct.cookie, sid, 'Show me a diagram')
        const wire = wireOf(turn)
        const resolved = resolveVisual({ message: 'Show me a diagram', lessonConceptId: id, subject: 'chemistry', learnerRequest: 'diagram' })
        const expected = { served: resolved.graphical, fingerprint: resolved.graphical && resolved.payload ? figureFingerprint(resolved.payload as never) : null }
        if (!wire.field) {
          rows.push({ conceptId: id, vp: '-', theme: '-', verdict: RETIRED.includes(id) ? 'NO_FIGURE_AS_EXPECTED' : 'NO_FIGURE', fails: [], reviews: [], wire, expected })
          console.log(`${id.padEnd(40)} no figure on the wire${RETIRED.includes(id) ? ' (retired — as expected)' : ''}`)
          continue
        }
        for (const v of VIEWS) for (const theme of THEMES) {
          const base = await openContext(browser, v.vp === 'mobile' ? 'mobile' : 'desktop-column', theme)
          const page = await base.newPage()
          await page.setViewportSize({ width: v.width, height: v.height })
          await base.addCookies(acct.cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
          const pix = await base.newPage()
          try {
            await page.goto(`${BASE}/learn?subject=chemistry`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
            await page.waitForSelector('[data-scene-box], [aria-label^="Visual aid:"], svg[aria-label$="process flow"], [class*="canvasVisual"]', { timeout: 60_000 })
            const kind = await page.evaluate(() => (document.querySelector('[aria-label^="Visual aid:"]') ? 'card' : document.querySelector('[data-scene-box]') ? 'scene' : 'spec'))
            const marked = await page.evaluate(() => {
              const card = document.querySelector('[aria-label^="Visual aid:"]')
              if (card) { card.setAttribute('data-audit-frame', ''); card.scrollIntoView({ block: 'start' }); return true }
              const box = document.querySelector('[data-scene-box]')
              if (box) {
                let el: Element | null = box
                while (el && el.parentElement) {
                  el = el.parentElement
                  if (el.querySelector('input[type="range"]') || /Play the stages|Play the motion/.test(el.textContent ?? '')) break
                }
                if (!el) return false
                el.setAttribute('data-audit-frame', ''); el.scrollIntoView({ block: 'start' }); return true
              }
              // A VisualSpec figure (process flow / graph / number line): its own card, inside the canvas-visual frame.
              const spec = document.querySelector('svg[aria-label$="process flow"], [class*="canvasVisual"]')
              const frame = spec?.closest('[class*="canvasVisual"]') ?? spec?.parentElement
              if (!frame) return false
              frame.setAttribute('data-audit-frame', ''); frame.scrollIntoView({ block: 'start' }); return true
            })
            if (!marked) throw new Error('figure frame not found')
            if (kind === 'card') {
              await page.locator('[data-audit-frame] button', { hasText: /^1\.5x$/ }).first().click({ timeout: 10_000 }).catch(() => undefined)
              const frame = page.locator('[data-audit-frame]')
              let prev = '', same = 0
              const t0 = Date.now()
              while (Date.now() - t0 < 150_000 && same < 3) {
                await page.waitForTimeout(6_000)
                const now = (await frame.screenshot()).toString('base64')
                if (now === prev) same++; else { same = 0; prev = now }
              }
            }
            await settle(page, kind === 'card' ? 'card' : 'scene', kind === 'scene')
            const shot = shots ? resolve(shots, `${id}__${v.vp}__${theme}.png`) : null
            const st = await capture(page, pix, 'default', {}, shot)
            const findings = auditRenderedState(st, { expectsScene: kind === 'scene' })
            const fails = findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
            const reviews = findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`)
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: fails.length ? 'FAIL' : reviews.length ? 'REVIEW_REQUIRED' : 'PASS', fails, reviews, wire, expected })
          } catch (e) {
            // What the page showed when the figure never appeared: the evidence that tells a deployed defect from a flaky load.
            if (shots) await page.screenshot({ path: resolve(shots, `${id}__${v.vp}__${theme}__NOT_RUN.png`), fullPage: false }).catch(() => undefined)
            rows.push({ conceptId: id, vp: v.vp, theme, verdict: 'NOT_RUN', fails: [], reviews: [], wire, expected, note: String(e).split('\n')[0].slice(0, 160) })
          }
          const r = rows[rows.length - 1]
          console.log(`${id.padEnd(40)} ${v.vp.padEnd(15)} ${theme.padEnd(5)} ${r.verdict} ${r.fails.slice(0, 2).join(' | ')}${r.note ? ` [${r.note}]` : ''}`)
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
