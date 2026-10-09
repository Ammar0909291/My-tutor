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
 *                 [--min-segments N] [--attempts N] [--views mobile/dark,desktop-column/light] [--require-normal]
 *   (--require-normal: for the force-diagram card, keep asking, in a fresh session each time, until a pre-flight load of the
 *   real page shows the fifth step's normal arrow; the sentence count alone proved an unreliable predictor.)
 *   (a card in the lesson shows as many steps as the tutor's reply has sentences/lines, so a short reply leaves the
 *   last steps unseen. --min-segments N re-asks, in a fresh session, until the reply has N segments and carries a
 *   figure (at most --attempts times, default 6); a reply that never gets long enough is recorded as a harness
 *   limitation on the row, never as a pass of the missing step.)
 */
import { chromium, type Page } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure } from './liveSession'
import { extractNarrationSegments } from '../../src/lib/visuals/narrationSource'
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

/**
 * What the force-diagram card actually drew, read back from the live DOM in SCREEN pixels (so any scaling or
 * transform the page applied is included): each force arrow's tail → head, and the ground line. A concept that is
 * not the force diagram simply gets `null`s. "Perpendicular" is the dot product of the arrow with the ground,
 * "upward" is the head being above the tail on screen.
 */
export interface ForceArrowProbe {
  arrows: Record<'applied' | 'friction' | 'weight' | 'normal', { tail: [number, number]; head: [number, number] } | null>
  ground: { from: [number, number]; to: [number, number] } | null
  normal: { perpendicularToGround: boolean; pointsUp: boolean; headAboveBox: boolean; labelText: string | null } | null
}
/**
 * Open the lesson page, find the figure's own frame, and — for a card — run the narration at 1.5x until the picture
 * stops changing. Returns what kind of figure it is. (Shared by the pre-flight and by every measured view.)
 */
async function driveToFinalState(page: Page): Promise<'card' | 'scene'> {
  await page.goto(`${BASE}/learn?subject=physics`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await page.waitForSelector('[data-scene-box], [aria-label^="Visual aid:"]', { timeout: 60_000 })
  // Mark the figure's own frame: the nearest ancestor of the canvas box that also holds its controls
  // (a scene), or the card's own root (a card).
  // A card is identified by ITS OWN root (only VisualCard sets this label). `[data-scene-box]` cannot decide it:
  // ThreeDVisual sets it too, so a 3D card (e.g. the orbital explorer) also contains one.
  const kind: 'card' | 'scene' = await page.evaluate(() => (document.querySelector('[aria-label^="Visual aid:"]') ? 'card' : 'scene'))
  const marked = await page.evaluate(() => {
    // The lesson page lists the lesson's messages from EVERY session of the learner (history is lesson-scoped), so after a
    // retry it holds one figure per attempt, oldest first. The figure under test is the LAST one.
    const cards = document.querySelectorAll('[aria-label^="Visual aid:"]')
    const card = cards.length ? cards[cards.length - 1] : null
    if (card) {
      card.setAttribute('data-audit-frame', '')
      card.scrollIntoView({ block: 'start' })
      return true
    }
    const boxes = document.querySelectorAll('[data-scene-box]')
    const box = boxes.length ? boxes[boxes.length - 1] : null
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
  return kind
}

/** Plain JS in a string on purpose: a transpiled callback can carry helper wrappers (esbuild's __name) the page does not have. */
const FORCE_ARROW_PROBE_JS = `(() => {
  const frame = document.querySelector('[data-audit-frame]');
  const svg = frame && frame.querySelector('svg');
  if (!frame || !svg) return null;
  const toScreen = (el, x, y) => {
    const m = el.getScreenCTM();
    if (!m) return [x, y];
    const p = svg.createSVGPoint(); p.x = x; p.y = y;
    const q = p.matrixTransform(m);
    return [Math.round(q.x * 10) / 10, Math.round(q.y * 10) / 10];
  };
  const seg = (l) => l ? { tail: toScreen(l, l.x1.baseVal.value, l.y1.baseVal.value), head: toScreen(l, l.x2.baseVal.value, l.y2.baseVal.value) } : null;
  const byMarker = (id) => svg.querySelector('line[marker-end="url(#' + id + ')"]');
  const arrows = { applied: seg(byMarker('gArr')), friction: seg(byMarker('bArr')), weight: seg(byMarker('rArr')), normal: seg(byMarker('pArr')) };
  const plain = Array.from(svg.querySelectorAll('line')).filter((l) => !l.getAttribute('marker-end') && l.y1.baseVal.value === l.y2.baseVal.value);
  plain.sort((a, b) => Math.abs(b.x2.baseVal.value - b.x1.baseVal.value) - Math.abs(a.x2.baseVal.value - a.x1.baseVal.value));
  const gs = plain.length ? seg(plain[0]) : null;
  const ground = gs ? { from: gs.tail, to: gs.head } : null;
  let normal = null;
  if (arrows.normal && ground) {
    const n = [arrows.normal.head[0] - arrows.normal.tail[0], arrows.normal.head[1] - arrows.normal.tail[1]];
    const g = [ground.to[0] - ground.from[0], ground.to[1] - ground.from[1]];
    const cos = Math.abs((n[0] * g[0] + n[1] * g[1]) / (Math.hypot(n[0], n[1]) * Math.hypot(g[0], g[1])));
    const rect = svg.querySelector('rect');
    const box = rect ? rect.getBoundingClientRect() : null;
    const texts = Array.from(svg.querySelectorAll('text')).map((t) => t.textContent || '');
    const label = texts.find((t) => /normal/i.test(t)) || null;
    normal = { perpendicularToGround: cos < 0.02, pointsUp: n[1] < 0, headAboveBox: box ? arrows.normal.head[1] < box.top : false, labelText: label };
  }
  return { arrows, ground, normal };
})()`
async function probeForceArrows(page: import('playwright').Page): Promise<ForceArrowProbe | undefined> {
  return ((await page.evaluate(FORCE_ARROW_PROBE_JS)) as ForceArrowProbe | null) ?? undefined
}

async function main() {
  const out = arg('out'), shots = arg('shots')
  if (shots) mkdirSync(shots, { recursive: true })
  const acct = await createQaAccount('physbrowser')
  const rows: Array<{ conceptId: string; vp: string; theme: string; verdict: string; fails: string[]; reviews: string[]; note?: string; segments?: number; attempts?: number; forceArrows?: ForceArrowProbe }> = []
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
    // Same theme key, in-page auditor and animation-clock cap as the dev-page harness; the learner's cookie.
    const openLearnerPage = async (v: (typeof VIEWS)[number], theme: ThemeName) => {
      const base = await openContext(browser, v.vp === 'mobile' ? 'mobile' : 'desktop-column', theme)
      const page = await base.newPage()
      await page.setViewportSize({ width: v.width, height: v.height })
      await base.addCookies(acct.cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
      return { base, page }
    }
    try {
      for (const id of CONCEPTS.filter((c) => !arg('only') || arg('only')!.split(',').includes(c))) {
        const l = lessons.find((x) => x.topicSlug === id)
        if (!l) { rows.push({ conceptId: id, vp: '-', theme: '-', verdict: 'NOT_RUN', fails: [], reviews: [], note: 'not in production curriculum' }); continue }
        // Every attempt adds another message (and another figure) to the lesson page — history is lesson-scoped, not
        // session-scoped — so the page holds one card per attempt and `driveToFinalState` frames the LAST one. (Framing the
        // first one made 18 retries of normal-force/equilibrium keep measuring the first, short reply.)
        const need = Number(arg('min-segments') ?? 0), maxAttempts = Number(arg('attempts') ?? 6)
        let segments = 0, attempts = 0, normalSeen = false
        const requireNormal = process.argv.includes('--require-normal')
        for (; attempts < maxAttempts;) {
          attempts++
          const sid = await createSession(acct.cookie, 'physics')
          await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: id, unitTitle: l.unitTitle, totalLessons: lessons.length })
          const turn = await say(acct.cookie, sid, arg('say') ?? 'Show me a diagram')
          segments = extractNarrationSegments(turn.text ?? '').segments.length
          console.log(`  ${id} attempt ${attempts}: ${segments} segment(s), figure=${carriesFigure(turn)}`)
          let enough = !need || (segments >= need && carriesFigure(turn))
          if (requireNormal) {
            // The reply's sentence count is only a proxy for how many steps the page's own timeline will show, so
            // ask the page: load it, let the narration finish, and see whether the normal arrow was drawn.
            const { base, page } = await openLearnerPage(VIEWS[0], 'dark')
            try {
              await driveToFinalState(page)
              normalSeen = Boolean((await probeForceArrows(page))?.normal)
            } catch (e) { normalSeen = false; console.log(`  pre-flight failed: ${String(e).split('\n')[0].slice(0, 120)}`) } finally { await base.close() }
            console.log(`  ${id} attempt ${attempts}: normal arrow drawn in the page = ${normalSeen}`)
            enough = normalSeen
          }
          if (enough) break
        }
        const shortReply = requireNormal ? !normalSeen : need > 0 && segments < need
        const only = arg('views')?.split(',')
        for (const v of VIEWS) for (const theme of THEMES) {
          if (only && !only.includes(`${v.vp}/${theme}`)) continue
          const { base, page } = await openLearnerPage(v, theme)
          const pix = await base.newPage()
          try {
            const kind = await driveToFinalState(page)
            await settle(page, kind, kind === 'scene')
            const shot = shots ? resolve(shots, `${id}__${v.vp}__${theme}.png`) : null
            const st = await capture(page, pix, 'default', {}, shot)
            const findings = auditRenderedState(st, { expectsScene: kind === 'scene' })
            const fails = findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
            const reviews = findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id} ${f.message}`)
            const forceArrows = kind === 'card' ? await probeForceArrows(page) : undefined
            rows.push({
              conceptId: id, vp: v.vp, theme, verdict: fails.length ? 'FAIL' : reviews.length ? 'REVIEW_REQUIRED' : 'PASS', fails, reviews,
              segments, attempts, ...(forceArrows ? { forceArrows } : {}),
              ...(shortReply ? { note: `HARNESS LIMIT: after ${attempts} attempt(s) the tutor's reply never made the card reach its last step (${segments} segment(s) in the last reply); later steps of the card were not shown` } : {}),
            })
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
