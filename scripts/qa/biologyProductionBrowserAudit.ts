/**
 * BIOLOGY PRODUCTION BROWSER VERIFICATION — the real lesson page, the real deployment.
 *
 * `biologyVisualRenderAudit.mjs` renders every Biology figure on a dev-only page that is 404 in production. This points the same
 * measurement at the DEPLOYED app: a disposable learner is onboarded to Biology (`qa-*@mytutor-qa.invalid`, DELETED afterwards, the
 * deletion proven by a failed re-login), a lesson is opened and a diagram asked for over the JSON API, then the app's own `/learn`
 * page — which resumes that session and draws the figure with the production bundle — is loaded in Chromium at phone (390) and
 * desktop (1280) width in both themes. The figure the learner is served is compared, by fingerprint, with the figure the repository
 * resolves locally (so "production renders what was audited" is a measurement, not an assumption); the frame is screenshotted and
 * measured (label overlaps, labels outside the canvas, minimum font, horizontal scroll); the repaired figures' stages are walked.
 *
 *   npx tsx scripts/qa/biologyProductionBrowserAudit.ts --shots dir --out file.json [--only id,id] [--views mobile/dark,desktop/light]
 *
 * It measures; it does not judge. A concept that is not in the production curriculum, a turn that carries no figure, or a page
 * that never paints one is recorded as such (NOT_RUN / NO_FIGURE), never as a pass.
 */
import { chromium, type Page } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure } from './liveSession'
import { resolveVisual } from '../../src/lib/teaching/visual/resolveVisual'
import type { SceneSpec } from '../../src/lib/teaching/sceneSpec'

/** The six figures this campaign repaired, then unchanged figures from every family as controls. */
const REPAIRED = [
  'bio.neuro.brain-regional-organization', 'bio.cell.cell-theory', 'bio.mol.dna-replication',
  'bio.eco.predator-prey-dynamics', 'bio.plant.mycorrhizae-plant-symbioses', 'bio.plant.plant-growth-hormones',
]
const CONTROLS = [
  'bio.found.what-is-biology', 'bio.cell.cell-membrane-transport', 'bio.mol.enzymes', 'bio.plant.photosynthesis',
  'bio.gen.mendelian-genetics', 'bio.evo.natural-selection', 'bio.physio.circulatory-system', 'bio.eco.ecosystem-structure-function',
]
const VIEWS: Array<{ vp: 'mobile' | 'desktop'; width: number; height: number }> = [
  { vp: 'mobile', width: 390, height: 2200 },
  { vp: 'desktop', width: 1280, height: 1700 },
]
const THEMES = ['dark', 'light'] as const
const CHROMIUM_ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']
const arg = (n: string) => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }

/**
 * What makes two figures "the same figure": the scene id, title, objects per stage and every text drawn. The served payload is decorated by the
 * route (extra keys), so a whole-payload hash would call identical figures different.
 */
function signature(spec: SceneSpec | undefined): string | null {
  if (!spec || !Array.isArray(spec.steps)) return null
  return JSON.stringify({
    id: spec.id, title: spec.title, steps: spec.steps.map((st) => st.objects.length),
    texts: spec.steps.flatMap((st) => st.objects.map((o) => o.text ?? '')).filter(Boolean).sort(),
  })
}

/** Plain JS in a string on purpose: a transpiled callback can carry helper wrappers the page does not have. */
const MEASURE_JS = `(() => {
  const figs = document.querySelectorAll('figure[role="figure"]');
  const fig = figs.length ? figs[figs.length - 1] : null;
  if (!fig) return { error: 'no-figure', figures: 0 };
  const canvas = fig.querySelector('canvas');
  const cr = canvas ? canvas.getBoundingClientRect() : null;
  const spans = Array.from(fig.querySelectorAll('div[style*="translate3d"] span')).filter((s) => s.textContent && s.textContent.trim());
  const labels = spans.map((s) => { const r = s.getBoundingClientRect(); return { text: s.textContent.trim(), x: r.x, y: r.y, w: r.width, h: r.height, fs: parseFloat(getComputedStyle(s).fontSize) }; }).filter((l) => l.w > 0 && l.h > 0);
  const overlaps = [];
  for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
    const a = labels[i], b = labels[j];
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox > 1 && oy > 1) overlaps.push(a.text.slice(0, 24) + ' x ' + b.text.slice(0, 24) + ' ' + Math.round(ox * oy));
  }
  const outside = cr ? labels.filter((l) => l.x < cr.x - 1 || l.y < cr.y - 1 || l.x + l.w > cr.x + cr.width + 1 || l.y + l.h > cr.y + cr.height + 1).map((l) => l.text.slice(0, 24)) : [];
  const text = fig.innerText;
  const leaks = (text.match(/\\b(undefined|NaN|null|\\[object|spoke-line|cell-hub-|cell-pathway-|stage-\\d|group-\\d|TODO|lorem)\\b/gi) || []);
  return {
    figures: figs.length,
    canvas: cr ? { w: Math.round(cr.width), h: Math.round(cr.height) } : null,
    labelCount: labels.length,
    minFont: labels.length ? Math.min.apply(null, labels.map((l) => l.fs)) : null,
    overlaps, outside, leaks,
    title: (fig.querySelector('h3') || {}).textContent || null,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  };
})()`

interface Measure { error?: string; figures: number; canvas?: { w: number; h: number } | null; labelCount?: number; minFont?: number | null; overlaps?: string[]; outside?: string[]; leaks?: string[]; title?: string | null; hScroll?: boolean }

/** Wait until the figure stops moving (canvas size and every label position identical twice in a row). */
async function settle(page: Page, maxMs = 15_000): Promise<void> {
  const read = () => page.evaluate(`(() => { const f = document.querySelectorAll('figure[role="figure"]'); const fig = f[f.length - 1]; if (!fig) return ''; const c = fig.querySelector('canvas'); const r = c ? c.getBoundingClientRect() : null; const ls = Array.from(fig.querySelectorAll('div[style*="translate3d"] span')).map((s) => { const b = s.getBoundingClientRect(); return s.textContent.trim().slice(0, 12) + '@' + Math.round(b.x) + ',' + Math.round(b.y); }); return (r ? Math.round(r.width) + 'x' + Math.round(r.height) : '') + '|' + ls.join(';'); })()`).catch(() => '') as Promise<string>
  let prev = await read()
  const t0 = Date.now()
  while (Date.now() - t0 < maxMs) {
    await page.waitForTimeout(500)
    const cur = await read()
    if (cur === prev && cur.includes('@')) return
    prev = cur
  }
}

async function main() {
  const out = arg('out'), shots = arg('shots')
  if (shots) mkdirSync(shots, { recursive: true })
  const only = arg('only')?.split(',')
  const viewOnly = arg('views')?.split(',')
  const ids = [...REPAIRED, ...CONTROLS].filter((c) => !only || only.includes(c))
  const acct = await createQaAccount('biobrowser')
  const rows: Array<Record<string, unknown>> = []
  try {
    const ob = await fetch(`${BASE}/api/onboarding`, {
      method: 'POST', headers: { 'content-type': 'application/json', cookie: acct.cookie },
      body: JSON.stringify({ subjectSlug: 'biology', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: 'I am learning biology.' }),
    })
    if (!ob.ok) throw new Error(`onboarding ${ob.status}: ${(await ob.text()).slice(0, 200)}`)
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=biology`, { headers: { cookie: acct.cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    console.log(`production curriculum: ${lessons.length} biology lessons`)
    const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
    const cookies = acct.cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } })
    try {
      for (const id of ids) {
        const l = lessons.find((x) => x.topicSlug === id)
        if (!l) { rows.push({ conceptId: id, verdict: 'NOT_RUN', note: 'not in production curriculum' }); console.log(`${id}: NOT_RUN (not in curriculum)`); continue }
        // What the repository resolves for this concept — the audited figure.
        const local = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, subject: 'biology', learnerRequest: 'diagram' })
        const localSpec = (local.payload as { sceneSpec?: SceneSpec } | null)?.sceneSpec
        // What production serves: a fresh session, the lesson opened, a diagram asked for.
        const sid = await createSession(acct.cookie, 'biology')
        await openLesson(acct.cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: id, unitTitle: l.unitTitle, totalLessons: lessons.length })
        const turn = await say(acct.cookie, sid, 'Show me a diagram')
        const servedSpec = (turn.sceneSpec ?? (turn.visual as { sceneSpec?: unknown } | undefined)?.sceneSpec) as SceneSpec | undefined
        const sameFigure = Boolean(signature(localSpec) && signature(localSpec) === signature(servedSpec))
        console.log(`${id}: provider=${turn.provider ?? '?'} figure=${carriesFigure(turn)} sameAsAudited=${sameFigure}`)
        if (!carriesFigure(turn)) { rows.push({ conceptId: id, verdict: 'NO_FIGURE', provider: turn.provider ?? null, note: 'the diagram turn carried no figure' }); continue }
        for (const v of VIEWS) for (const theme of THEMES) {
          if (viewOnly && !viewOnly.includes(`${v.vp}/${theme}`)) continue
          const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, colorScheme: theme })
          await ctx.addCookies(cookies)
          await ctx.addInitScript((t: string) => { try { localStorage.setItem('mytutor_theme', t) } catch { /* ignore */ } }, theme)
          const page = await ctx.newPage()
          const row: Record<string, unknown> = { conceptId: id, vp: v.vp, theme, provider: turn.provider ?? null, sameAsAudited: sameFigure }
          try {
            await page.goto(`${BASE}/learn?subject=biology`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
            await page.waitForSelector('figure[role="figure"] canvas', { timeout: 60_000 })
            await page.waitForTimeout(1500)
            await settle(page)
            const fig = page.locator('figure[role="figure"]').last()
            await fig.scrollIntoViewIfNeeded()
            await settle(page)
            const m = await page.evaluate(MEASURE_JS) as Measure
            const file = shots ? resolve(shots, `${id}__${v.vp}__${theme}__all.png`) : undefined
            if (file) await fig.screenshot({ path: file })
            row.default = m
            // Walk the stages on the repaired figures (dark only — the stage layout is theme-independent; light is covered by the default shot).
            if (REPAIRED.includes(id) && theme === 'dark') {
              const next = page.getByRole('button', { name: 'Next stage' }).last()
              const stages: Array<Record<string, unknown>> = []
              let k = 0
              while (k < 12 && (await next.count()) && (await next.isEnabled().catch(() => false))) {
                await next.click(); k++
                await page.waitForTimeout(500); await settle(page, 5000)
                stages.push({ stage: k, ...(await page.evaluate(MEASURE_JS) as Measure) })
                if (shots) await fig.screenshot({ path: resolve(shots, `${id}__${v.vp}__${theme}__s${k}.png`) })
              }
              row.stages = stages
            }
            const bad = [m.error, ...(m.overlaps ?? []).map((o) => `overlap ${o}`), ...(m.outside ?? []).map((o) => `outside ${o}`), ...(m.leaks ?? []).map((o) => `leak ${o}`), m.hScroll ? 'hScroll' : null].filter(Boolean)
            row.flags = bad
            row.verdict = bad.length ? 'REVIEW_REQUIRED' : 'MEASURED_CLEAN'
          } catch (e) {
            row.verdict = 'NOT_RUN'; row.note = String(e).split('\n')[0].slice(0, 200)
          }
          rows.push(row)
          console.log(`  ${v.vp.padEnd(7)} ${theme.padEnd(5)} ${row.verdict} ${(row.flags as string[] | undefined)?.slice(0, 3).join(' | ') ?? row.note ?? ''}`)
          await ctx.close()
        }
      }
    } finally { await browser.close() }
  } finally {
    const del = await deleteQaAccount(acct)
    console.log('disposable account deleted =', del.deleted, ' re-login blocked =', del.reloginBlocked)
  }
  if (out) writeFileSync(out, JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 1))
}
main().catch((e) => { console.error(e); process.exit(1) })
