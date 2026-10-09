#!/usr/bin/env node
/**
 * CHEMISTRY VISUAL AUDIT — real-browser render + measure harness.
 *
 *   node scripts/chemistry/visual-audit/render-measure.mjs --manifest <chem-manifest.json> [options]
 *   node scripts/chemistry/visual-audit/render-measure.mjs --selftest
 *
 * WHAT IT DOES. For every manifest instance it opens the dev page
 * `/dev/chem-visual-audit` (src/app/dev/chem-visual-audit — 404s in production),
 * which mounts the REAL learner component for the instance's payload field
 * (VisualCard | VisualRenderer | SceneSpecFigure -> ExplainerFigure ...) inside
 * a replica of the lesson's teaching-canvas container. It then renders it at
 * 1280x800 and 390x844 (dpr 2) in both themes, drives any controls it finds
 * (sliders, choice/mode chips, stage stepper), and for every state captures a
 * screenshot and measures, in the page:
 *
 *   FONT_TOO_SMALL   effective on-screen font px (CSS size x getScreenCTM scale, so a
 *                    12-unit label in a 600-wide viewBox drawn 340px wide is ~6.8px)
 *   LABEL_COLLISION  text-vs-text overlap (ink boxes)       LABEL_OVER_STROKE  text-vs-line
 *   TEXT_OBSCURED    a later filled shape paints over text
 *   CLIPPED          text cut by an overflow:hidden/svg viewport (or truncated)
 *   OFFSCREEN        text beyond the viewport edge            INNER_SCROLL_X  needs scrolling
 *   OVERFLOW_X       page / figure frame horizontally overflowing
 *   HIDDEN_TEXT      text with opacity~0 / zero size / display:none / hidden attr
 *   CONTRAST_LOW     WCAG ratio of foreground vs the actual rendered background, sampled
 *                    from a SECOND screenshot taken with all text made transparent (so
 *                    gradients, 3D canvases and overlapping shapes are measured, not guessed)
 *   NAN_TEXT | DEBUG_TEXT | INTERNAL_ID | ANSWER_LEAK   DOM text scan
 *   RENDER_ERROR | CLIENT_DROPPED | EMPTY_FIGURE | CONSOLE_ERROR | PAGE_ERROR
 *
 * OUTPUT (default <out> = $SCRATCH or ./chem-visual-audit-out):
 *   <out>/render-results.json        flat `results[]` (instance x viewport x theme x state) + `instances[]` summary
 *   <out>/shots/<instanceId>-<w>-<theme>[-<state>].png
 *
 * OPTIONS
 *   --manifest <path>      JSON array of {instanceId, conceptIds, ..., payload:{field,value}}
 *   --only a,b,c           only these instanceIds
 *   --out <dir>            output directory
 *   --base-url <url>       use an already running `next dev` (otherwise one is started on --port)
 *   --port <n>             port for the dev server this script starts (default 3417)
 *   --viewports 1280,390   widths (default both)        --themes dark,light (default both)
 *   --states all|default   drive controls (default all)  --max-states N (default 14 per run)
 *   --workers N            parallel pages (default 3)    --motion reduce|no-preference (default reduce)
 *   --limit N              first N instances            --selftest   prove the harness catches known-bad samples
 *   --keep-server          do not stop a dev server this script started
 *   --resume               continue from <out>/render-results.partial.jsonl (written after every run)
 *   --levels default,beginner,advanced   learnerLevel variants of every sceneSpec (default: default only)
 *   --drive-all-themes     drive controls in every theme (default: first theme only)
 *   --drive-variants       also drive controls on interactive-variant entries
 *   --restart-rss-mb N     restart the dev server this script started above N MB RSS (default 4500)
 *   --restart-browser-every N   relaunch Chromium after N runs (default 60); a crashed browser is always relaunched, each run is retried once
 *   --only accepts exact ids or globs, e.g. --only 'scene:electrochemical-cell-*,card:*'
 *
 * DETERMINISM. Instances are processed in manifest order, results are sorted by
 * (manifest index, viewport, theme, state order) regardless of worker timing;
 * `prefers-reduced-motion: reduce` is emulated by default so OrbitControls
 * auto-rotate (ThreeDVisual: `autoRotate && !reducedMotion`) cannot move labels
 * between runs. Nothing random is used.
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../../..')

// ───────────────────────────── thresholds (sourced from the repo) ─────────────────────────────
/** Read `export const NAME = <number>` / `const NAME = <number>` out of a source file; fall back if absent. */
function repoConst(file, name, fallback) {
  try {
    const src = fs.readFileSync(path.join(REPO, file), 'utf8')
    const m = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*([0-9.]+)`).exec(src)
    if (m) return Number(m[1])
  } catch { /* fall through */ }
  return fallback
}
const FONT_FLOOR_PX = repoConst('src/components/school/visuals/useFigureLegibility.ts', 'FIGURE_TEXT_FLOOR_PX',
  repoConst('src/lib/teaching/visual/layout.ts', 'FONT_FLOOR_PX', 10))
const THRESHOLDS = {
  fontFloorPx: FONT_FLOOR_PX,                    // FAIL below this (repo: FIGURE_TEXT_FLOOR_PX / layout.ts FONT_FLOOR_PX)
  fontFloorTolerancePx: 0.15,                   // useFigureLegibility itself adds +0.05 for sub-pixel rounding
  fontRecommendedPx: 12,                         // stricter, reported separately (info)
  contrastNormal: 4.5,                           // WCAG AA; repo rule ENGL-017 ("never below 4.5:1")
  contrastLarge: 3.0,                            // >= 24px, or >= 18.66px and bold
  largeTextPx: 24, largeBoldTextPx: 18.66,
  collisionFail: 0.25, collisionReview: 0.05,    // overlap area / smaller ink box
  clipTolerancePx: 1.5,
}
const VIEWPORTS = {
  1280: { width: 1280, height: 800, deviceScaleFactor: 1 },
  390: { width: 390, height: 844, deviceScaleFactor: 2 },
}

// ───────────────────────────── CLI ─────────────────────────────
function parseArgs(argv) {
  const o = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) { o._.push(a); continue }
    const k = a.slice(2)
    if (['selftest', 'keep-server', 'verbose', 'no-details', 'drive-all-themes', 'drive-variants', 'resume'].includes(k)) { o[k] = true; continue }
    o[k] = argv[++i]
  }
  return o
}
const args = parseArgs(process.argv.slice(2))
const OUT = path.resolve(args.out || process.env.SCRATCH || path.join(process.cwd(), 'chem-visual-audit-out'))
const PORT = Number(args.port || 3417)
const BASE = (args['base-url'] || `http://localhost:${PORT}`).replace(/\/$/, '')
const WORKERS = Math.max(1, Number(args.workers || 3))
const MAX_STATES = Math.max(1, Number(args['max-states'] || 14))
const MOTION = args.motion === 'no-preference' ? 'no-preference' : 'reduce'
const THEMES = (args.themes || 'dark,light').split(',').map((s) => s.trim()).filter(Boolean)
const VPS = (args.viewports || '1280,390').split(',').map((s) => s.trim()).filter(Boolean)
const DRIVE = (args.states || 'all') !== 'default'
/** Controls are driven in the FIRST theme only unless --drive-all-themes (state geometry does not depend on theme; contrast of the default state is measured in every theme). */
const DRIVE_ALL_THEMES = !!args['drive-all-themes']
/** learnerLevel variants to render (route.ts sends `learnerLevel`; absent = intermediate default). e.g. --levels default,beginner,advanced */
const LEVELS = (args.levels || 'default').split(',').map((s) => s.trim()).filter(Boolean)
const log = (...a) => console.log(...a)
const vlog = (...a) => { if (args.verbose) console.log('  ·', ...a) }

// ───────────────────────────── in-page library ─────────────────────────────
/**
 * Serialised into the page (addInitScript) as `window.__AUDIT__`. Self-contained:
 * nothing in here may reference this module's scope.
 */
function auditLib() {
  const A = {}
  A.cfg = {}
  A.configure = (cfg) => { A.cfg = cfg }

  // ── colour ──
  const cvs = document.createElement('canvas'); cvs.width = 1; cvs.height = 1
  const cctx = cvs.getContext('2d', { willReadFrequently: true })
  const pct = (s) => (s && s.endsWith('%') ? parseFloat(s) / 100 : s === undefined || s === null || s === '' ? 1 : parseFloat(s))
  function parseColor(str) {
    if (!str) return null
    const s = String(str).trim()
    if (s === 'transparent') return [0, 0, 0, 0]
    if (s === 'none' || s.startsWith('url(')) return null
    let m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/.exec(s)
      || /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/.exec(s)
    if (m) return [+m[1], +m[2], +m[3], pct(m[4])]
    m = /^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/.exec(s)
    if (m) return [+m[1] * 255, +m[2] * 255, +m[3] * 255, pct(m[4])]
    // any other CSS colour syntax (oklch, lab, named, hsl ...) -> let the canvas resolve it, solving alpha from black/white backdrops
    try {
      cctx.fillStyle = '#010203'; cctx.fillStyle = s
      const probe = cctx.fillStyle
      cctx.fillStyle = '#040506'; cctx.fillStyle = s
      if (cctx.fillStyle !== probe) return null // not a colour
      const draw = (bg) => {
        cctx.globalCompositeOperation = 'source-over'
        cctx.fillStyle = bg; cctx.fillRect(0, 0, 1, 1)
        cctx.fillStyle = s; cctx.fillRect(0, 0, 1, 1)
        return cctx.getImageData(0, 0, 1, 1).data
      }
      const k = draw('#000'), w = draw('#fff')
      const a = Math.max(0, Math.min(1, 1 - ((w[0] - k[0]) + (w[1] - k[1]) + (w[2] - k[2])) / (3 * 255)))
      return a < 0.003 ? [0, 0, 0, 0] : [k[0] / a, k[1] / a, k[2] / a, a]
    } catch { return null }
  }
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2])
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) }
  const over = (fg, bg) => { const a = fg[3]; return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a)] }
  const hex = (c) => '#' + [c[0], c[1], c[2]].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')

  // ── geometry ──
  const rr = (r) => ({ x: r.left, y: r.top, w: r.width, h: r.height })
  const inter = (a, b) => {
    const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
    const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
    return w > 0 && h > 0 ? { w, h, area: w * h } : null
  }
  const round1 = (n) => Math.round(n * 10) / 10
  const rrR = (r) => ({ x: round1(r.x), y: round1(r.y), w: round1(r.w), h: round1(r.h) })

  function cssScale(el) {
    let s = 1
    for (let a = el; a && a.nodeType === 1; a = a.parentElement) {
      const t = getComputedStyle(a).transform
      if (t && t !== 'none') {
        try { const m = new DOMMatrix(t); s *= Math.hypot(m.a, m.b) || 1 } catch { /* ignore */ }
      }
    }
    return s
  }

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TITLE', 'DESC', 'NOSCRIPT', 'METADATA', 'DEFS'])

  function collect(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const byEl = new Map()
    let n
    while ((n = walker.nextNode())) {
      const t = n.nodeValue
      if (!t || !t.trim()) continue
      const el = n.parentElement
      if (!el) continue
      if (el.closest('[data-audit-ignore]')) continue
      if (SKIP_TAGS.has(el.tagName.toUpperCase()) || el.closest('title,desc,script,style,noscript,defs')) continue
      if (!byEl.has(el)) byEl.set(el, [])
      byEl.get(el).push(n)
    }
    return byEl
  }

  function labelOf(el) {
    const aria = el.getAttribute('aria-label')
    if (aria) return aria
    if (el.id) {
      const l = document.querySelector('label[for="' + CSS.escape(el.id) + '"]')
      if (l) return l.textContent.trim()
    }
    const lb = el.getAttribute('aria-labelledby')
    if (lb) { const n = document.getElementById(lb.split(/\s+/)[0]); if (n) return n.textContent.trim() }
    const p = el.closest('label'); if (p) return p.textContent.trim()
    return ''
  }

  // ── DOM text scan ──
  const ID_RE = /\b(?:chem|phys|math|bio|eng|cs)\.[a-z][a-z0-9_-]*(?:\.[a-z0-9_-]+)*\b/
  const SNAKE_RE = /\b[a-z][a-z0-9]*(?:_[a-z0-9]+){1,}\b/
  const DEBUG_RE = /\b(?:TODO|FIXME|XXX|TBD|lorem ipsum|dolor sit amet|placeholder|debug|console\.log|stack ?trace)\b|\{\{[^}]*\}\}|\$\{[^}]*\}|\{\d+\}|%[sd]\b/i
  A.scanText = (text) => {
    const out = []
    if (/\bNaN\b/.test(text)) out.push(['NAN_TEXT', 'fail', 'NaN'])
    if (/-?\bInfinity\b/.test(text)) out.push(['NAN_TEXT', 'fail', 'Infinity'])
    if (/\[object Object\]/.test(text)) out.push(['NAN_TEXT', 'fail', '[object Object]'])
    const u = /\b(undefined|null)\b/.exec(text)
    if (u) {
      const bare = /^\W*(undefined|null)\W*$/.test(text) || /(?:\d\s*(?:undefined|null)|(?:undefined|null)\s*(?:\d|%|°|K\b|mol|kJ|g\b|L\b|atm|J\b|V\b|nm|pm|Å))/.test(text) || text.split(/\s+/).length <= 3
      out.push(['NAN_TEXT', bare ? 'fail' : 'review', u[1]])
    }
    const d = DEBUG_RE.exec(text); if (d) out.push(['DEBUG_TEXT', 'fail', d[0]])
    const id = ID_RE.exec(text); if (id) out.push(['INTERNAL_ID', 'fail', id[0]])
    const sn = SNAKE_RE.exec(text); if (sn && !id) out.push(['INTERNAL_ID', 'review', sn[0]])
    return out
  }

  // ── controls ──
  A.discover = () => {
    const root = document.querySelector('[data-audit-frame]')
    const out = { sliders: [], groups: [], stage: null, expand: null }
    if (!root) return out
    root.querySelectorAll('input[type=range]').forEach((el) => {
      out.sliders.push({ id: el.id, label: labelOf(el), min: +el.min, max: +el.max, step: el.step, value: +el.value, disabled: el.disabled })
    })
    root.querySelectorAll('[role=group]').forEach((g) => {
      const btns = Array.from(g.querySelectorAll('button'))
      if (!btns.length) return
      out.groups.push({
        label: g.getAttribute('aria-label') || '',
        buttons: btns.map((b) => ({ text: (b.innerText || '').trim() || b.getAttribute('aria-label') || '', pressed: b.getAttribute('aria-pressed'), disabled: b.disabled })),
      })
    })
    const prev = root.querySelector('button[aria-label="Previous stage"]')
    const next = root.querySelector('button[aria-label="Next stage"]')
    if (prev && next) out.stage = { meta: (next.parentElement.querySelector('[class*=stageMeta]')?.textContent || '').trim() }
    const ex = root.querySelector('button[aria-label="Expand the figure"], button[aria-label="Return the figure to the lesson"]')
    if (ex) out.expand = { pressed: ex.getAttribute('aria-pressed') }
    return out
  }

  A.act = (a) => {
    const root = document.querySelector('[data-audit-frame]')
    if (!root) return { ok: false, why: 'no-frame' }
    if (a.kind === 'slider') {
      const el = Array.from(root.querySelectorAll('input[type=range]')).find((e) => (a.id && e.id === a.id) || (!a.id && labelOf(e) === a.label))
      if (!el) return { ok: false, why: 'slider-missing' }
      const min = +el.min, max = +el.max
      let v = a.value === 'min' ? min : a.value === 'max' ? max : Number(a.value)
      const step = parseFloat(el.step) > 0 ? parseFloat(el.step) : 0
      if (step) v = min + Math.round((v - min) / step) * step
      v = Math.max(min, Math.min(max, v))
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
      setter.call(el, String(v))
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
      return { ok: true, value: v }
    }
    if (a.kind === 'chip') {
      const groups = Array.from(root.querySelectorAll('[role=group]')).filter((g) => (g.getAttribute('aria-label') || '') === a.group)
      for (const g of groups) {
        const b = Array.from(g.querySelectorAll('button')).find((x) => (((x.innerText || '').trim() || x.getAttribute('aria-label') || '') === a.text))
        if (b && !b.disabled) { b.click(); return { ok: true } }
      }
      return { ok: false, why: 'chip-missing' }
    }
    if (a.kind === 'button') {
      const b = Array.from(root.querySelectorAll('button')).find((x) => (a.aria ? x.getAttribute('aria-label') === a.aria : ((x.innerText || '').trim() === a.text)))
      if (b && !b.disabled) { b.click(); return { ok: true } }
      return { ok: false, why: 'button-missing-or-disabled' }
    }
    return { ok: false, why: 'unknown-action' }
  }

  // ── settle ──
  A.signature = () => {
    const root = document.querySelector('[data-audit-frame]')
    if (!root) return 'none'
    const parts = [String(root.getBoundingClientRect().height | 0)]
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      if (!n.nodeValue.trim() || !n.parentElement || n.parentElement.closest('[data-audit-ignore]')) continue
      const r = n.parentElement.getBoundingClientRect()
      parts.push(n.nodeValue.trim().slice(0, 12) + '@' + Math.round(r.left) + ',' + Math.round(r.top) + ',' + Math.round(r.width))
    }
    root.querySelectorAll('canvas').forEach((c) => parts.push('c' + c.clientWidth + 'x' + c.clientHeight))
    const playing = root.querySelector('button[aria-label="Pause"]')
    parts.push(playing ? 'playing' : 'idle')
    return parts.join('|')
  }

  A.status = () => {
    const root = document.querySelector('[data-audit-frame]')
    const s = window.__CHEM_AUDIT_STATUS__ || {}
    const surf = document.querySelector('[data-audit-surface]')
    return {
      ready: surf ? surf.getAttribute('data-audit-ready') : 'none',
      hasFrame: !!root,
      hasContent: !!(root && Array.from(root.querySelectorAll('*')).some((n) => !n.closest('[role=status][aria-label*="Preparing"]') && !n.closest('[data-audit-ignore]'))),
      preparing: !!(root && root.querySelector('[role=status][aria-label*="Preparing"]')),
      error: s.error || (root && root.querySelector('[data-audit-error]')?.getAttribute('data-audit-error')) || null,
      dropped: s.dropped || null,
      droppedErrors: s.errors || null,
      textNodes: root ? root.innerText.trim().length : 0,
    }
  }

  // ── the measurement ──
  A.measure = () => {
    const C = A.cfg
    const root = document.querySelector('[data-audit-frame]')
    if (!root) return { error: 'no-frame' }
    root.querySelectorAll('details').forEach((d) => { d.open = true })
    const sx = window.scrollX, sy = window.scrollY
    const vw = document.documentElement.clientWidth, vh = window.innerHeight
    // ExplainerFigure's "expanded" state is a position:fixed overlay: the figure, not the dev-page frame, is the surface to measure against
    const expEl = root.querySelector('[class*="frameExpanded"]')
    const frameR = rr((expEl || root).getBoundingClientRect())
    const byEl = collect(root)
    const items = []
    let nextId = 0
    for (const [el, nodes] of byEl) {
      const text = nodes.map((n) => n.nodeValue).join(' ').replace(/\s+/g, ' ').trim()
      if (!text) continue
      const isSvg = el instanceof SVGElement
      let rects = []
      if (isSvg) {
        rects = [rr(el.getBoundingClientRect())]
      } else {
        for (const n of nodes) {
          const range = document.createRange(); range.selectNodeContents(n)
          for (const r of Array.from(range.getClientRects())) if (r.width > 0 || r.height > 0) rects.push(rr(r))
        }
        if (!rects.length) rects = [rr(el.getBoundingClientRect())]
      }
      const ux = Math.min(...rects.map((r) => r.x)), uy = Math.min(...rects.map((r) => r.y))
      const ux2 = Math.max(...rects.map((r) => r.x + r.w)), uy2 = Math.max(...rects.map((r) => r.y + r.h))
      const rect = { x: ux, y: uy, w: ux2 - ux, h: uy2 - uy }
      const cs = getComputedStyle(el)
      const css = parseFloat(cs.fontSize) || 0
      let scale = 1
      if (isSvg) { const m = el.getScreenCTM && el.getScreenCTM(); if (m) scale = Math.hypot(m.a, m.b) || 1 } else scale = cssScale(el)
      const eff = css * scale
      const weight = parseInt(cs.fontWeight, 10) || 400

      // visibility
      const vis = []
      let opacity = 1, sr = false
      for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
        const c = getComputedStyle(a)
        if (c.display === 'none') vis.push('display:none')
        if (a === el && (c.visibility === 'hidden' || c.visibility === 'collapse')) vis.push('visibility:hidden')
        const o = parseFloat(c.opacity); opacity *= Number.isFinite(o) ? o : 1
        if (a.hasAttribute && a.hasAttribute('hidden')) vis.push('hidden-attr')
      }
      if (opacity < 0.05) vis.push('opacity:' + opacity.toFixed(2))
      if (rect.w < 0.5 || rect.h < 0.5) vis.push('zero-size')
      if (css === 0) vis.push('font-size:0')
      if (rect.w <= 2 && rect.h <= 2) { let a = el; for (; a && a !== root; a = a.parentElement) { if (getComputedStyle(a).position === 'absolute') { sr = true; break } } }

      // foreground
      let fg = null, fgKind = 'computed', halo = false
      let alpha = opacity
      if (isSvg) {
        const f = cs.fill
        if (f === 'none') { fg = null; fgKind = 'fill-none' }
        else if (f.startsWith('url(')) { fg = null; fgKind = 'paint-server' }
        else { const c = parseColor(f); if (c) { fg = c; alpha *= parseFloat(cs.fillOpacity || '1') } }
        const sw = parseFloat(cs.strokeWidth || '0'); if (cs.stroke !== 'none' && sw > 0) halo = true
      } else {
        const tf = cs.webkitTextFillColor
        const c = parseColor(tf && tf !== cs.color ? tf : cs.color)
        if (c) fg = c
        if (cs.textShadow && cs.textShadow !== 'none') halo = true
        if (cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') { fgKind = 'gradient-text'; fg = null }
      }
      if (fg) fg = [fg[0], fg[1], fg[2], Math.max(0, Math.min(1, fg[3] * alpha))]

      // clipping ancestors
      const clips = []
      for (let a = el.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
        const c = getComputedStyle(a)
        const hid = (v) => v === 'hidden' || v === 'clip'
        const scr = (v) => v === 'auto' || v === 'scroll'
        const isOuterSvg = a.tagName.toLowerCase() === 'svg' && !a.ownerSVGElement
        const nestedSvg = a.tagName.toLowerCase() === 'svg' && a.ownerSVGElement
        if (nestedSvg) continue
        if (!(hid(c.overflowX) || hid(c.overflowY) || scr(c.overflowX) || scr(c.overflowY)) && !isOuterSvg) continue
        if (a === root) continue
        const r = a.getBoundingClientRect()
        const box = isOuterSvg || a instanceof SVGElement
          ? rr(r)
          : { x: r.left + a.clientLeft, y: r.top + a.clientTop, w: a.clientWidth, h: a.clientHeight }
        clips.push({
          tag: a.tagName.toLowerCase(), box,
          x: hid(c.overflowX) ? 'hidden' : scr(c.overflowX) ? 'scroll' : 'visible',
          y: hid(c.overflowY) ? 'hidden' : scr(c.overflowY) ? 'scroll' : 'visible',
          cls: (typeof a.className === 'string' ? a.className : '').split(/\s+/)[0] || '',
        })
      }

      // which text SURFACE this is (for deciding where chemical notation must be typeset) and how any notation in it is written
      let surface = isSvg ? 'svg-text' : 'html'
      if (!isSvg) {
        let found = false
        for (let a = el; a && a !== root; a = a.parentElement) {
          if (a.style && a.style.position === 'absolute' && /translate3d/.test(a.style.transform || '')) { surface = 'scene-label (drei Html over WebGL)'; found = true; break }
        }
        if (!found) {
          for (let a = el; a && a !== document.body; a = a.parentElement) {
            const cn = typeof a.className === 'string' ? a.className : ''
            const m = /(?:^|\s)([A-Za-z0-9]+)_([A-Za-z0-9]+)__/.exec(cn)
            if (m) { surface = m[1] + '.' + m[2]; found = true; break }
          }
        }
        if (!found) surface = el.closest('[role=figure][aria-label^="Visual aid"]') ? 'VisualCard chrome' : 'html:' + el.tagName.toLowerCase()
      }
      const notation = []
      if (/[\u2080-\u2089\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207a\u207b\u208a\u208b]/.test(text)) notation.push('unicode-script')
      if (el.closest('sub,sup') || el.querySelector('sub,sup')) notation.push('html-sub-sup')
      if (/\b(?:[A-Z][a-z]?\d+)+[A-Z]?[a-z]?\d*\b/.test(text) && !/^\d/.test(text)) notation.push('plain-digit-formula')
      if (/\b[A-Z][a-z]?\d*[+-](?=\s|$|[,.)])/.test(text)) notation.push('plain-ion-charge')
      if (/\$[^$]+\$|\\[a-zA-Z]+\{|\^\{|_\{/.test(text)) notation.push('latex-source')
      // text that an overflow:hidden ancestor hides entirely is not on screen: it is reported (CLIPPED) but takes no part in font / collision / contrast checks
      let fullyClipped = false
      for (const c of clips) {
        if (c.x !== 'hidden' && c.y !== 'hidden') continue
        const ov = inter(rect, c.box)
        if (!ov || ov.area / Math.max(1, rect.w * rect.h) < 0.05) { fullyClipped = true; break }
      }
      items.push({
        id: nextId++, el, text, isSvg, fullyClipped, surface, notation, tag: el.tagName.toLowerCase(), rects, rect, css, scale, eff, weight,
        vis, sr, fg, fgKind, halo, clips, opacity,
        group: isSvg ? (el.closest('text') || el) : null,
      })
    }

    const findings = []
    const F = (code, severity, detail, it, bbox) => findings.push({
      code, severity, detail, elementText: it ? it.text.slice(0, 80) : '', bbox: bbox ? rrR(bbox) : it ? rrR(it.rect) : null,
    })

    // visible set
    const visible = items.filter((it) => !it.vis.length && !it.fullyClipped)

    // hidden text
    for (const it of items.filter((i) => i.vis.length)) {
      // hidden-until-interaction patterns (hidden attr, display:none, ExplainerFigure's `.effect`: visibility:hidden + zero height until hover/focus) are by design
      const byDesign = it.vis.every((v) => v === 'hidden-attr' || v === 'display:none' || v === 'visibility:hidden' || (v === 'zero-size' && it.vis.includes('visibility:hidden')))
      if (it.sr) F('HIDDEN_TEXT', 'info', 'screen-reader-only text (sr-only pattern)', it)
      else F('HIDDEN_TEXT', byDesign ? 'info' : 'review', 'text present in DOM but not visible: ' + it.vis.join(', '), it)
    }

    // fonts
    let minFont = Infinity, belowRec = 0
    for (const it of visible) {
      if (it.eff < minFont) minFont = it.eff
      if (it.eff < C.fontFloorPx - C.fontFloorTolerancePx) {
        F('FONT_TOO_SMALL', 'fail', 'effective ' + it.eff.toFixed(2) + 'px (css ' + it.css.toFixed(2) + 'px x scale ' + it.scale.toFixed(3) + ') < floor ' + C.fontFloorPx + 'px', it)
      } else if (it.eff < C.fontRecommendedPx - C.fontFloorTolerancePx) {
        belowRec++
        F('FONT_BELOW_RECOMMENDED', 'info', 'effective ' + it.eff.toFixed(2) + 'px < recommended ' + C.fontRecommendedPx + 'px', it)
      }
    }

    // clipping / offscreen / scroll (includes text that is entirely clipped away: that is the finding)
    let clipped = 0
    const tol = C.clipTolerancePx
    for (const it of items.filter((i) => !i.vis.length)) {
      const r = it.rect
      let handled = false
      for (const c of it.clips) {
        const b = c.box
        const left = b.x - r.x, right = (r.x + r.w) - (b.x + b.w), top = b.y - r.y, bottom = (r.y + r.h) - (b.y + b.h)
        const cutX = (c.x !== 'visible') && (left > tol || right > tol)
        const cutY = (c.y !== 'visible') && (top > tol || bottom > tol)
        if (!cutX && !cutY) continue
        const ov = inter(r, b)
        const frac = ov ? ov.area / Math.max(1, r.w * r.h) : 0
        const scrollable = (cutX && c.x === 'scroll') || (cutY && c.y === 'scroll')
        const hiddenCut = (cutX && c.x === 'hidden') || (cutY && c.y === 'hidden')
        const edges = [left > tol && 'left ' + left.toFixed(1), right > tol && 'right ' + right.toFixed(1), top > tol && 'top ' + top.toFixed(1), bottom > tol && 'bottom ' + bottom.toFixed(1)].filter(Boolean).join(', ')
        if (hiddenCut) {
          if (frac < 0.05) {
            F('CLIPPED_AWAY', 'review', 'entirely outside an overflow:hidden <' + c.tag + (c.cls ? '.' + c.cls : '') + '> (' + edges + 'px beyond): the text is in the DOM but invisible', it)
            handled = true; break
          }
          clipped++
          F('CLIPPED', 'fail', 'cut by overflow:hidden <' + c.tag + (c.cls ? '.' + c.cls : '') + '> (' + edges + 'px beyond, ' + Math.round((1 - frac) * 100) + '% of the text outside)', it)
          handled = true; break
        }
        if (scrollable) {
          F('INNER_SCROLL_X', 'review', 'text lies beyond the visible part of a scrollable <' + c.tag + '> (' + edges + 'px); reachable only by scrolling', it)
          handled = true; break
        }
      }
      if (!handled) {
        // beyond the viewport horizontally (not clipped by anything inside the figure)
        if (r.x < -tol || r.x + r.w > vw + tol) {
          clipped++
          F('OFFSCREEN', 'fail', 'text extends beyond the viewport (x ' + r.x.toFixed(1) + '..' + (r.x + r.w).toFixed(1) + ' of ' + vw + ')', it)
        } else if (r.x < frameR.x - 2 - 0.5 || r.x + r.w > frameR.x + frameR.w + 2 + 0.5) {
          F('OVERFLOW_X', 'review', 'text spills outside the figure frame by ' + Math.max(frameR.x - r.x, r.x + r.w - (frameR.x + frameR.w)).toFixed(1) + 'px (not clipped)', it)
        }
      }
      // truncated HTML text (ellipsis / line clamp)
      if (!it.isSvg) {
        const el = it.el, c = getComputedStyle(el)
        if ((c.overflowX === 'hidden' || c.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
          clipped++
          F('CLIPPED', 'fail', 'text truncated by its own box (scrollWidth ' + el.scrollWidth + ' > clientWidth ' + el.clientWidth + ', text-overflow:' + c.textOverflow + ')', it)
        } else if ((c.overflowY === 'hidden' || c.overflowY === 'clip') && el.scrollHeight > el.clientHeight + 1 && el.clientHeight > 0 && c.display !== 'inline') {
          clipped++
          F('CLIPPED', 'fail', 'text truncated vertically (scrollHeight ' + el.scrollHeight + ' > clientHeight ' + el.clientHeight + ')', it)
        }
      }
    }

    // any element (not only text) wider than the frame and not clipped by an inner ancestor
    let overflowPx = 0
    const frameRight = frameR.x + frameR.w
    const walkerE = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
    let e
    let worst = null
    while ((e = walkerE.nextNode())) {
      if (e.closest('[data-audit-ignore]')) continue
      const tg = e.tagName.toLowerCase()
      if (['defs', 'clippath', 'mask', 'marker', 'pattern', 'symbol', 'title', 'desc', 'style', 'script', 'lineargradient', 'radialgradient', 'filter', 'stop'].includes(tg)) continue
      if (e.closest('defs,clipPath,mask,marker,pattern,symbol')) continue
      const r = e.getBoundingClientRect()
      if (r.width < 1 || r.height < 1) continue
      // skip if a clipping ancestor (below the root) hides the overflow
      let clippedAway = false
      for (let a = e.parentElement; a && a !== root; a = a.parentElement) {
        const c = getComputedStyle(a)
        const isOuterSvg = a.tagName.toLowerCase() === 'svg' && !a.ownerSVGElement
        if (isOuterSvg ? c.overflow !== 'visible' : (c.overflowX !== 'visible')) { clippedAway = true; break }
      }
      if (clippedAway) continue
      const over = r.right - frameRight
      if (over > 2 && (!worst || over > worst.over)) worst = { over, tag: tg, cls: (typeof e.className === 'string' ? e.className : e.className?.baseVal || '').split(/\s+/)[0], text: (e.textContent || '').trim().slice(0, 40), r: rr(r) }
    }
    if (worst) { overflowPx = worst.over; F('OVERFLOW_X', 'fail', 'content <' + worst.tag + (worst.cls ? '.' + worst.cls : '') + '> extends ' + worst.over.toFixed(1) + 'px beyond the figure frame', null, worst.r) }
    const de = document.documentElement
    const pageOverflow = de.scrollWidth - de.clientWidth
    if (pageOverflow > 1) { overflowPx = Math.max(overflowPx, pageOverflow); F('OVERFLOW_X', 'fail', 'page scrolls horizontally: scrollWidth ' + de.scrollWidth + ' > clientWidth ' + de.clientWidth, null, frameR) }
    root.querySelectorAll('*').forEach((s) => {
      const c = getComputedStyle(s)
      if ((c.overflowX === 'auto' || c.overflowX === 'scroll') && s.scrollWidth > s.clientWidth + 2 && s.clientWidth > 0) {
        F('INNER_SCROLL_X', 'review', 'a region inside the figure scrolls horizontally (scrollWidth ' + s.scrollWidth + ' > clientWidth ' + s.clientWidth + ')', null, rr(s.getBoundingClientRect()))
      }
    })

    // collisions (text vs text)
    const inkOf = (it, r) => {
      const dy = r.h * (it.isSvg ? 0.16 : 0.14), dh = r.h * (it.isSvg ? 0.34 : 0.28)
      return { x: r.x, y: r.y + dy, w: r.w, h: Math.max(1, r.h - dh) }
    }
    let collisions = 0
    for (let i = 0; i < visible.length; i++) {
      for (let j = i + 1; j < visible.length; j++) {
        const a = visible[i], b = visible[j]
        if (a.group && a.group === b.group) continue
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue
        let best = 0
        for (const ra of a.rects) for (const rb of b.rects) {
          const ia = inkOf(a, ra), ib = inkOf(b, rb)
          const ov = inter(ia, ib)
          if (!ov) continue
          const f = ov.area / Math.max(1, Math.min(ia.w * ia.h, ib.w * ib.h))
          if (f > best) best = f
        }
        if (best >= C.collisionReview) {
          const sev = best >= C.collisionFail ? 'fail' : 'review'
          if (sev === 'fail') collisions++
          F('LABEL_COLLISION', sev, '"' + a.text.slice(0, 30) + '" overlaps "' + b.text.slice(0, 30) + '" (' + Math.round(best * 100) + '% of the smaller label)', a, a.rect)
        }
      }
    }

    // text vs strokes / obscured (SVG)
    const outerSvgs = Array.from(root.querySelectorAll('svg')).filter((s) => !s.ownerSVGElement)
    const shapeSel = 'path,line,polyline,polygon,rect,circle,ellipse'
    let strokeHits = 0
    for (const svg of outerSvgs) {
      const shapes = []
      svg.querySelectorAll(shapeSel).forEach((sh) => {
        if (sh.closest('defs,clipPath,mask,marker,pattern,symbol')) return
        const c = getComputedStyle(sh)
        if (c.display === 'none' || c.visibility === 'hidden') return
        let op = 1
        for (let a = sh; a && a !== svg.parentElement; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity || '1')
        if (op < 0.05) return
        const sw = parseFloat(c.strokeWidth || '0')
        const hasStroke = c.stroke !== 'none' && sw > 0 && parseFloat(c.strokeOpacity || '1') * op >= 0.35
        const fill = parseColor(c.fill)
        const hasFill = c.fill !== 'none' && !c.fill.startsWith('url(') && fill && fill[3] * parseFloat(c.fillOpacity || '1') * op >= 0.6
        if (!hasStroke && !hasFill) return
        const mm = sh.getScreenCTM && sh.getScreenCTM()
        const pad = hasStroke ? (sw * (mm ? Math.hypot(mm.a, mm.b) : 1)) / 2 + 1 : 0
        const br = sh.getBoundingClientRect()
        shapes.push({ el: sh, hasStroke, hasFill, rect: { x: br.left - pad, y: br.top - pad, w: br.width + 2 * pad, h: br.height + 2 * pad } })
      })
      for (const it of visible) {
        if (!it.isSvg || it.el.ownerSVGElement !== svg) continue
        const ink = inkOf(it, it.rect)
        if (ink.w < 2 || ink.h < 2) continue
        // strokes crossing the text
        let hits = 0, hitShape = null
        for (const sh of shapes) {
          if (!sh.hasStroke || !inter(sh.rect, ink)) continue
          if (typeof sh.el.isPointInStroke !== 'function') continue
          const m = sh.el.getScreenCTM && sh.el.getScreenCTM(); if (!m) continue
          let inv; try { inv = m.inverse() } catch { continue }
          const nx = Math.max(4, Math.min(24, Math.ceil(ink.w / 6))), ny = Math.max(3, Math.min(40, Math.ceil(ink.h / 1.5))) // dense enough that a 1-2px rule cannot fall between rows
          let h = 0
          for (let ix = 0; ix <= nx; ix++) for (let iy = 0; iy <= ny; iy++) {
            const p = new DOMPoint(ink.x + (ink.w * ix) / nx, ink.y + (ink.h * iy) / ny).matrixTransform(inv)
            if (sh.el.isPointInStroke(p)) h++
          }
          if (h > hits) { hits = h; hitShape = sh }
        }
        if (hits >= 2) { strokeHits++; F('LABEL_OVER_STROKE', 'review', 'a <' + hitShape.el.tagName.toLowerCase() + '> stroke passes through the text (' + hits + ' sample points)', it) }
        // a later filled shape painted over the text
        const cx = ink.x + ink.w / 2, cy = ink.y + ink.h / 2
        if (cx >= 0 && cy >= 0 && cx <= vw && cy <= vh) {
          const stack = document.elementsFromPoint(cx, cy)
          const ti = stack.indexOf(it.el)
          if (ti > 0) {
            const cands = stack.slice(0, ti).filter((x) => x instanceof SVGGeometryElement && x.ownerSVGElement === svg && x.tagName.toLowerCase() !== 'line')
            for (const above of cands) {
              const c = getComputedStyle(above), f = parseColor(c.fill)
              if (c.fill === 'none' || !f || f[3] * parseFloat(c.fillOpacity || '1') < 0.6) continue
              let inFill = false
              try { const m = above.getScreenCTM(); inFill = !!m && above.isPointInFill(new DOMPoint(cx, cy).matrixTransform(m.inverse())) } catch { /* ignore */ }
              if (inFill) { F('TEXT_OBSCURED', 'review', 'a filled <' + above.tagName.toLowerCase() + '> is painted above this text', it); break }
            }
          }
        }
      }
    }

    // DOM text scan (rendered text + accessible names)
    const scanned = new Set()
    const scan = (text, where, it) => {
      for (const [code, sev, hit] of A.scanText(text)) {
        const k = code + '|' + hit + '|' + text
        if (scanned.has(k)) continue
        scanned.add(k)
        F(code, sev, '"' + hit + '" in ' + where + ': ' + text.slice(0, 100), it)
      }
    }
    for (const it of items) scan(it.text, 'visible text', it)
    root.querySelectorAll('[aria-label],[title],svg > title,svg > desc,img[alt]').forEach((n) => {
      if (n.closest('[data-audit-ignore]')) return
      const t = n.tagName === 'title' || n.tagName === 'desc' ? n.textContent : (n.getAttribute('aria-label') || n.getAttribute('title') || n.getAttribute('alt') || '')
      if (t && t.trim()) scan(t.trim(), 'accessible name', null)
    })

    // text surfaces present in this state
    const surfaces = {}
    for (const it of visible) {
      const sf = surfaces[it.surface] || (surfaces[it.surface] = { n: 0, minPx: Infinity, notation: {}, samples: [] })
      sf.n++; sf.minPx = Math.min(sf.minPx, Math.round(it.eff * 10) / 10)
      for (const k of it.notation) sf.notation[k] = (sf.notation[k] || 0) + 1
      if (sf.samples.length < 3 && !sf.samples.includes(it.text.slice(0, 40))) sf.samples.push(it.text.slice(0, 40))
    }

    // structure facts
    const canvases = Array.from(root.querySelectorAll('canvas')).map((c) => ({ cssW: c.clientWidth, cssH: c.clientHeight, w: c.width, h: c.height }))
    const iframes = root.querySelectorAll('iframe').length
    if (iframes) F('UNMEASURABLE', 'info', iframes + ' sandboxed <iframe> (DynamicVisualRenderer): contents cannot be measured; screenshot only', null, frameR)
    for (const c of canvases) {
      if (c.cssW === 300 && c.cssH === 150) F('RENDER_ERROR', 'fail', 'canvas is still the 300x150 browser default: the 3D scene never took its layout size', null, frameR)
    }
    if (canvases.length && !items.length) F('UNMEASURABLE', 'info', 'WebGL canvas with no DOM text: nothing to measure beyond the screenshot', null, frameR)
    const ct = window.__AUDIT_CANVAS_TEXT__ || []
    if (ct.length) F('UNMEASURABLE', 'review', ct.length + ' string(s) drawn onto a <canvas> 2D context cannot be measured from the DOM: ' + ct.slice(0, 6).map((t) => '"' + t + '"').join(', '), null, frameR)
    if (!items.length && !canvases.length && !iframes && !root.querySelector('svg')) F('EMPTY_FIGURE', 'fail', 'the frame holds no text, svg, canvas or iframe', null, frameR)
    else if (!visible.length && !canvases.length && !iframes) F('EMPTY_FIGURE', 'fail', 'the figure shows no visible text', null, frameR)

    // viewport / clip for the screenshot: the figure's rows, full width to the right edge
    const clipX = Math.max(0, Math.floor(frameR.x - 12))
    const clip = { x: clipX + sx, y: Math.max(0, Math.floor(frameR.y - 8)) + sy, width: Math.min(vw - clipX, Math.ceil(frameR.w + 24 + Math.max(0, vw - (frameR.x + frameR.w + 12)))), height: Math.ceil(frameR.h + 16) }
    clip.width = Math.max(1, Math.min(vw - clipX, clip.width))
    if (expEl) { clip.x = 0; clip.y = 0; clip.width = vw; clip.height = vh; clip.viewportOnly = true }

    return {
      scroll: { x: sx, y: sy }, viewport: { w: vw, h: vh, dpr: window.devicePixelRatio },
      frame: rrR(frameR), clip, surfaces,
      counts: { text: items.length, visibleText: visible.length, svg: root.querySelectorAll('svg').length, canvas: canvases.length, iframe: iframes },
      metrics: {
        minFontPx: Number.isFinite(minFont) ? Math.round(minFont * 100) / 100 : null,
        belowRecommended: belowRec, collisions, clipped, overflowX: round1(overflowPx), strokeHits,
      },
      canvases, findings,
      items: items.map((it) => ({
        id: it.id, text: it.text, isSvg: it.isSvg, tag: it.tag, rect: it.rect, rects: it.rects, eff: it.eff, css: it.css, weight: it.weight,
        visible: !it.vis.length && !it.fullyClipped, fg: it.fg, fgKind: it.fgKind, halo: it.halo,
        answerButton: !!it.el.closest('button'),
      })),
    }
  }

  // ── contrast from two screenshots (A = as rendered, B = every glyph made transparent) ──
  A.contrast = async (items, a64, b64, clip, dpr) => {
    const load = async (b64s) => {
      const bin = atob(b64s); const u8 = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i)
      const bmp = await createImageBitmap(new Blob([u8], { type: 'image/png' }))
      const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height
      const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(bmp, 0, 0)
      return { x, w: bmp.width, h: bmp.height }
    }
    const IA = await load(a64), IB = await load(b64)
    const sx = window.scrollX, sy = window.scrollY
    const out = []
    for (const it of items) {
      if (!it.visible) { out.push(null); continue }
      const r = it.rect
      const ix = Math.round((r.x + sx - clip.x) * dpr), iy = Math.round((r.y + sy - clip.y) * dpr)
      let iw = Math.round(r.w * dpr), ih = Math.round(r.h * dpr)
      // Inset past the element's own 1px border: a pill/chip's border (e.g. rgba(241,237,226,.10) over the dark surface = #39463c) is
      // >=10% of a small control's pixels, so it was being counted as a second "background" the text sits on (measured false FAIL:
      // 4.02:1 on the border colour vs the real 5.38:1 on the surface the glyphs are actually drawn over). Fall back to the old
      // 1px inset when the box is too small to spare more.
      const ins = Math.max(1, Math.round(1.5 * dpr))
      let inset = ins
      if (iw - 2 * ins < 4 || ih - 2 * ins < 4) inset = 1
      let x0 = Math.max(0, ix + inset), y0 = Math.max(0, iy + inset)
      let x1 = Math.min(IB.w, ix + iw - inset), y1 = Math.min(IB.h, iy + ih - inset)
      if (x1 - x0 < 2 || y1 - y0 < 2) { out.push({ unresolved: 'outside-capture' }); continue }
      const dB = IB.x.getImageData(x0, y0, x1 - x0, y1 - y0).data
      const dA = IA.x.getImageData(x0, y0, x1 - x0, y1 - y0).data
      // bucket the background
      const buckets = new Map(); let N = 0
      for (let p = 0; p < dB.length; p += 4) {
        const k = (dB[p] >> 3) << 10 | (dB[p + 1] >> 3) << 5 | (dB[p + 2] >> 3)
        let b = buckets.get(k); if (!b) { b = { n: 0, r: 0, g: 0, b: 0 }; buckets.set(k, b) }
        b.n++; b.r += dB[p]; b.g += dB[p + 1]; b.b += dB[p + 2]; N++
      }
      const list = Array.from(buckets.values()).sort((u, v) => v.n - u.n)
      const sig = list.filter((b) => b.n / N >= 0.1)
      const use = sig.length ? sig : [list[0]]
      const bgs = use.map((b) => [b.r / b.n, b.g / b.n, b.b / b.n])
      const dom = bgs[0]
      // foreground: computed when possible, else estimated from the glyph pixels (largest A-B difference)
      let fg = it.fg, fgSource = 'computed'
      if (!fg) {
        const diffs = []
        for (let p = 0; p < dA.length; p += 4) {
          const d = Math.abs(dA[p] - dB[p]) + Math.abs(dA[p + 1] - dB[p + 1]) + Math.abs(dA[p + 2] - dB[p + 2])
          if (d > 60) diffs.push([d, dA[p], dA[p + 1], dA[p + 2]])
        }
        if (diffs.length >= 3) {
          diffs.sort((u, v) => v[0] - u[0])
          const top = diffs.slice(0, Math.max(3, Math.ceil(diffs.length * 0.3)))
          fg = [top.reduce((s, d) => s + d[1], 0) / top.length, top.reduce((s, d) => s + d[2], 0) / top.length, top.reduce((s, d) => s + d[3], 0) / top.length, 1]
          fgSource = 'pixels'
        }
      }
      if (!fg) { out.push({ unresolved: it.fgKind === 'fill-none' ? 'fill:none' : 'no-glyph-pixels', bg: hex(dom) }); continue }
      if (fg[3] < 0.02) { out.push({ unresolved: 'transparent-text', bg: hex(dom) }); continue }
      const ratios = bgs.map((bg) => ratio(over(fg, bg), bg))
      const worst = Math.min(...ratios)
      // RING: median colour of the pixels in a 3 CSS px band just OUTSIDE the text box, from the glyph-free capture. Robust where the
      // inside of the box straddles a mesh edge / pill / gradient; the two numbers are both reported and the ring is the authority over complex backgrounds.
      let ring = null, ringRatio = null
      {
        const t = Math.max(2, Math.round(3 * dpr))
        const rx0 = Math.max(0, ix - t), ry0 = Math.max(0, iy - t), rx1 = Math.min(IB.w, ix + iw + t), ry1 = Math.min(IB.h, iy + ih + t)
        if (rx1 - rx0 > 2 && ry1 - ry0 > 2) {
          const dR = IB.x.getImageData(rx0, ry0, rx1 - rx0, ry1 - ry0).data
          const W = rx1 - rx0
          const rs = [], gs = [], bs2 = []
          for (let yy = 0; yy < ry1 - ry0; yy++) for (let xx = 0; xx < W; xx++) {
            const gx = rx0 + xx, gy = ry0 + yy
            if (gx >= ix && gx < ix + iw && gy >= iy && gy < iy + ih) continue   // inside the text box
            const o = (yy * W + xx) * 4
            rs.push(dR[o]); gs.push(dR[o + 1]); bs2.push(dR[o + 2])
          }
          if (rs.length > 8) {
            const med = (a2) => { a2.sort((u, v) => u - v); return a2[a2.length >> 1] }
            ring = [med(rs), med(gs), med(bs2)]
            ringRatio = ratio(over(fg, ring), ring)
          }
        }
      }
      // cross-check what was actually painted: darkest/brightest glyph pixels vs the computed colour
      let lo = Infinity, hi = -Infinity
      for (let p = 0; p < dA.length; p += 4) { const L = 0.2126 * dA[p] + 0.7152 * dA[p + 1] + 0.0722 * dA[p + 2]; if (L < lo) lo = L; if (L > hi) hi = L }
      const lumB = 0.2126 * dom[0] + 0.7152 * dom[1] + 0.0722 * dom[2]
      const extreme = Math.abs(lo - lumB) > Math.abs(hi - lumB) ? lo : hi
      out.push({
        ratio: ratios[0], worst, bg: hex(dom), bgWorst: hex(bgs[ratios.indexOf(worst)]), fg: hex(over(fg, dom)), fgSource,
        ring: ring ? hex(ring) : null, ringRatio,
        complex: sig.length > 2 || (sig.length > 1 && Math.abs(lum(bgs[0]) - lum(bgs[1])) > 0.25),
        bgSpread: sig.length, glyphExtremeL: Math.round(extreme),
      })
    }
    return out
  }

  A.setBgOnly = (on) => {
    let s = document.getElementById('__audit_bg_only__')
    if (on && !s) {
      s = document.createElement('style'); s.id = '__audit_bg_only__'
      s.textContent = '[data-audit-frame] *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important;caret-color:transparent!important}' +
        '[data-audit-frame] svg text,[data-audit-frame] svg tspan{fill:transparent!important;stroke:transparent!important}'
      document.head.appendChild(s)
    } else if (!on && s) s.remove()
  }

  window.__AUDIT__ = A

  // Strings drawn onto a 2D canvas are invisible to the DOM; record them so they are reported, not silently skipped.
  try {
    window.__AUDIT_CANVAS_TEXT__ = []
    const P = CanvasRenderingContext2D.prototype
    for (const fn of ['fillText', 'strokeText']) {
      const orig = P[fn]
      P[fn] = function (t, ...r) { try { if (this.canvas && this.canvas.id !== '__audit_probe__' && window.__AUDIT_CANVAS_TEXT__.length < 200) window.__AUDIT_CANVAS_TEXT__.push(String(t)) } catch { /* ignore */ } return orig.call(this, t, ...r) }
    }
  } catch { /* ignore */ }
}

// ───────────────────────────── helpers ─────────────────────────────
/**
 * Manifest payload.value may be the parsed JSON the client receives OR that JSON serialised to a string
 * (Worker A's chem-manifest.json stores it stringified: "\"three_atomic_structure\"" / "{\"id\":...}").
 * Both are accepted; `visual` also accepts the bare VisualType string.
 */
function normalizeEntry(e) {
  const f = e.payload.field
  let v = e.payload.value
  if (typeof v === 'string') {
    const t = v.trim()
    if (f === 'visual' || f === 'registryKey') {
      if (t.startsWith('"')) { try { v = JSON.parse(t) } catch { /* keep */ } }
    } else if (f === 'sceneSpec' || f === 'visualSpec') {
      if (t.startsWith('{') || t.startsWith('[')) { try { v = JSON.parse(t) } catch { /* keep: the client would drop it too */ } }
    }
  }
  return { ...e, payload: { field: f, value: v } }
}

function findChromium() {
  const cands = []
  if (process.env.CHROMIUM_PATH) cands.push(process.env.CHROMIUM_PATH)
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
  try {
    for (const d of fs.readdirSync(root).filter((n) => /^chromium-\d+$/.test(n)).sort().reverse()) cands.push(path.join(root, d, 'chrome-linux', 'chrome'))
  } catch { /* ignore */ }
  cands.push(path.join(root, 'chromium', 'chrome-linux', 'chrome'))
  for (const c of cands) if (c && fs.existsSync(c)) return c
  return undefined // let playwright resolve its own
}

function portOpen(port) {
  return new Promise((resolve) => {
    const sock = net.connect({ port, host: '127.0.0.1' })
    sock.once('connect', () => { sock.destroy(); resolve(true) })
    sock.once('error', () => resolve(false))
    sock.setTimeout(2000, () => { sock.destroy(); resolve(false) })
  })
}
/** Request the audit page once so `next dev` compiles it (and everything it imports) before the timed runs. */
async function warm() {
  const t0 = Date.now()
  const r = await fetch(`${BASE}/dev/chem-visual-audit`, { signal: AbortSignal.timeout(240000) })
  if (r.status === 404) throw new Error(`${BASE}/dev/chem-visual-audit returned 404 - is this a production build? The audit page only exists under \`next dev\`.`)
  log(`audit page compiled (${r.status}) in ${((Date.now() - t0) / 1000).toFixed(1)}s`)
}

let serverProc = null
let serverLog = null
/** All descendant pids of `root` (reads /proc; linux only, which is where this runs). */
function descendants(root) {
  const kids = new Map()
  try {
    for (const d of fs.readdirSync('/proc')) {
      if (!/^\d+$/.test(d)) continue
      try {
        const st = fs.readFileSync(`/proc/${d}/stat`, 'utf8')
        const ppid = Number(st.slice(st.lastIndexOf(')') + 2).split(' ')[1])
        if (!kids.has(ppid)) kids.set(ppid, [])
        kids.get(ppid).push(Number(d))
      } catch { /* process vanished */ }
    }
  } catch { return [] }
  const out = []; const stack = [root]
  while (stack.length) { const p = stack.pop(); for (const k of kids.get(p) || []) { out.push(k); stack.push(k) } }
  return out
}
function serverRssMb() {
  if (!serverProc) return 0
  let kb = 0
  for (const pid of descendants(serverProc.pid)) {
    try { const m = /VmRSS:\s+(\d+) kB/.exec(fs.readFileSync(`/proc/${pid}/status`, 'utf8')); if (m) kb += Number(m[1]) } catch { /* gone */ }
  }
  return Math.round(kb / 1024)
}
async function startServer() {
  log(`starting next dev on :${PORT} (cwd ${REPO}) ...`)
  fs.mkdirSync(OUT, { recursive: true })
  serverLog = fs.openSync(path.join(OUT, 'next-dev.log'), 'a')
  serverProc = spawn('npx', ['next', 'dev', '-p', String(PORT)], {
    cwd: REPO, stdio: ['ignore', serverLog, serverLog], detached: true,
    // No DATABASE_URL on purpose: nothing in the audit may touch a database (instrumentation logs a harmless Prisma error).
    env: { ...process.env, AUTH_SECRET: process.env.AUTH_SECRET || 'audit-dummy-secret', NEXT_TELEMETRY_DISABLED: '1', NODE_ENV: 'development' },
  })
  const t0 = Date.now()
  while (Date.now() - t0 < 150000) {
    if (await portOpen(PORT)) break
    if (serverProc.exitCode !== null) throw new Error('next dev exited early; see ' + path.join(OUT, 'next-dev.log'))
    await new Promise((r) => setTimeout(r, 500))
  }
  if (!(await portOpen(PORT))) throw new Error('next dev did not become reachable; see ' + path.join(OUT, 'next-dev.log'))
  await warm()
}
function killServerTree() {
  if (!serverProc) return
  for (const pid of [...descendants(serverProc.pid).reverse(), serverProc.pid]) { try { process.kill(pid, 'SIGKILL') } catch { /* gone */ } }
  serverProc = null
}
async function ensureServer() {
  const url = new URL(BASE)
  const port = Number(url.port || 80)
  if (await portOpen(port)) { log(`dev server already up at ${BASE}`); await warm(); return }
  if (args['base-url']) throw new Error(`--base-url ${BASE} is not reachable`)
  await startServer()
}
/**
 * `next dev` leaks: measured at 5-9 GB RSS after a few dozen 3D figures, after which it stops answering. A server THIS
 * script started is restarted between batches when it is over the limit or unreachable. An external --base-url server is left alone.
 */
async function checkServer() {
  if (!serverProc) return
  const rss = serverRssMb()
  const up = await portOpen(PORT)
  if (!up || rss > Number(args['restart-rss-mb'] || 4500)) {
    log(`restarting next dev (rss ${rss} MB, reachable ${up})`)
    killServerTree()
    await new Promise((r) => setTimeout(r, 1500))
    await startServer()
  }
}
function stopServer() {
  if (serverProc && !args['keep-server']) killServerTree()
}

const safe = (s) => String(s).normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 120)

function noiseConsole(text) {
  return /Download the React DevTools|\[Fast Refresh\]|\[HMR\]|GL Driver Message|GPU stall|ReadPixels|WebGL: INVALID_|swiftshader|Automatic fallback to software WebGL|favicon|\/sw\.js|manifest\.json|net::ERR_FAILED|Failed to load resource: the server responded with a status of (404|500)|Fast Refresh|hydrat/i.test(text)
}

// ───────────────────────────── one page, one state ─────────────────────────────
async function waitSettled(page, { minMs = 700, maxMs = 14000 } = {}) {
  const t0 = Date.now()
  let last = null, stable = 0
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {})
  await page.waitForTimeout(minMs)
  while (Date.now() - t0 < maxMs) {
    const sig = await page.evaluate(() => window.__AUDIT__.signature()).catch(() => 'err')
    // an animation that is still playing (VisualCard shows a Pause button) is not settled however still the last 500ms looked
    if (sig === last && !sig.endsWith('playing')) { if (++stable >= 2) return true } else { stable = 0; last = sig }
    await page.waitForTimeout(260)
  }
  return false
}

async function capture(page, shotPath, entryMeta) {
  // 1. measure (DOM), 2. screenshot A, 3. glyphs transparent -> screenshot B, 4. contrast from pixels
  const m = await page.evaluate(() => window.__AUDIT__.measure())
  if (m.error) return { error: m.error }
  const clip = m.clip
  fs.mkdirSync(path.dirname(shotPath), { recursive: true })
  const vpOnly = !!clip.viewportOnly
  const shotClip = { x: clip.x, y: clip.y, width: clip.width, height: clip.height }
  const a = await page.screenshot({ path: shotPath, clip: shotClip, fullPage: !vpOnly, animations: 'disabled', caret: 'hide' })
  await page.evaluate(() => window.__AUDIT__.setBgOnly(true))
  const b = await page.screenshot({ clip: shotClip, fullPage: !vpOnly, animations: 'disabled', caret: 'hide' })
  await page.evaluate(() => window.__AUDIT__.setBgOnly(false))
  const cr = await page.evaluate(
    ([items, a64, b64, c, dpr]) => window.__AUDIT__.contrast(items, a64, b64, c, dpr),
    [m.items, a.toString('base64'), b.toString('base64'), clip, m.viewport.dpr],
  )
  void entryMeta
  return { m, cr }
}

function analyse(entry, m, cr, extra) {
  const T = THRESHOLDS
  const findings = [...m.findings]
  let contrastMin = Infinity, unresolved = 0
  m.items.forEach((it, i) => {
    const c = cr[i]
    if (!c) return
    if (c.unresolved) { unresolved++; if (c.unresolved !== 'outside-capture') findings.push({ code: 'CONTRAST_UNRESOLVED', severity: 'info', detail: 'contrast not computable: ' + c.unresolved, elementText: it.text.slice(0, 80), bbox: it.rect }); return }
    const large = it.eff >= T.largeTextPx || (it.eff >= T.largeBoldTextPx && it.weight >= 700)
    const need = large ? T.contrastLarge : T.contrastNormal
    // authority: the in-box worst-case bucket normally; over a complex (multi-colour / WebGL) background the median of the surrounding ring
    const useRing = c.complex && c.ringRatio != null
    const eff = useRing ? c.ringRatio : c.worst
    const disagree = c.ringRatio != null && Math.abs(c.ringRatio - c.worst) / Math.max(c.ringRatio, c.worst) > 0.2
    contrastMin = Math.min(contrastMin, eff)
    if (eff < need) {
      // A failure that only a MINORITY background bucket produces (the dominant in-box background and the surrounding ring both
      // pass) is an edge artefact — a card border or the capture edge running through a text box — not text that is unreadable
      // where it is drawn. It stays visible as REVIEW rather than FAIL.
      const minorityOnly = !useRing && c.ratio >= need && (c.ringRatio == null || c.ringRatio >= need)
      const soft = c.complex || it.halo || minorityOnly
      findings.push({
        code: 'CONTRAST_LOW', severity: soft ? 'review' : 'fail',
        detail: `WCAG ${eff.toFixed(2)}:1 < ${need}:1 (${large ? 'large' : 'normal'} text ${it.eff.toFixed(1)}px) fg ${c.fg} on bg ${useRing ? c.ring + ' (ring median)' : c.bgWorst}` +
          (disagree ? ` [in-box ${c.worst.toFixed(2)}:1 on ${c.bgWorst} vs ring ${c.ringRatio.toFixed(2)}:1 on ${c.ring} - disagree]` : c.ringRatio != null ? ` [ring ${c.ringRatio.toFixed(2)}:1 agrees]` : '') +
          (c.complex ? ' [complex/multi-colour background]' : '') + (minorityOnly ? ' [minority background bucket only: dominant and ring pass]' : '') + (it.halo ? ' [has halo/outline]' : '') + (c.fgSource === 'pixels' ? ' [fg estimated from pixels]' : ''),
        elementText: it.text.slice(0, 80), bbox: it.rect,
      })
    }
  })
  // answer-key leakage: payload-declared answers visible outside option buttons
  for (const marker of extra.answerMarkers || []) {
    const hit = m.items.find((it) => it.visible && !it.answerButton && it.text.toLowerCase().includes(marker.toLowerCase()))
    if (hit) findings.push({ code: 'ANSWER_LEAK', severity: 'review', detail: `payload answer "${marker}" is visible as plain text in the ${extra.stateLabel} state`, elementText: hit.text.slice(0, 80), bbox: hit.rect })
  }
  for (const e of extra.consoleErrors || []) findings.push(e)
  if (extra.status && extra.status.error) findings.push({ code: 'RENDER_ERROR', severity: 'fail', detail: 'component threw while rendering: ' + extra.status.error, elementText: '', bbox: null })
  if (extra.status && extra.status.dropped) findings.push({ code: 'CLIENT_DROPPED', severity: 'fail', detail: 'LessonScreen would drop this payload (' + extra.status.dropped + ')' + (extra.status.droppedErrors ? ': ' + extra.status.droppedErrors.join('; ') : ''), elementText: '', bbox: null })

  // de-duplicate identical findings (same code+text+detail), cap noisy codes
  const seen = new Set(); const dedup = []
  const perCode = {}
  for (const f of findings) {
    const k = f.code + '|' + f.elementText + '|' + f.detail
    if (seen.has(k)) continue
    seen.add(k)
    perCode[f.code] = (perCode[f.code] || 0) + 1
    if (perCode[f.code] > 40) continue
    dedup.push(f)
  }
  const sevRank = { fail: 3, review: 2, info: 1 }
  dedup.sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || a.code.localeCompare(b.code) || (a.elementText || '').localeCompare(b.elementText || ''))
  const status = dedup.some((f) => f.severity === 'fail') ? 'FAIL' : dedup.some((f) => f.severity === 'review') ? 'REVIEW_REQUIRED' : 'PASS'
  return {
    status, findings: dedup,
    metrics: {
      minFontPx: m.metrics.minFontPx, contrastMin: Number.isFinite(contrastMin) ? Math.round(contrastMin * 100) / 100 : null,
      collisions: m.metrics.collisions, clipped: m.metrics.clipped, overflowX: m.metrics.overflowX,
      textCount: m.counts.visibleText, belowRecommended: m.metrics.belowRecommended, strokeHits: m.metrics.strokeHits,
      contrastUnresolved: unresolved, canvas: m.counts.canvas, svg: m.counts.svg, frame: m.frame, surfaces: m.surfaces,
    },
  }
}

function answerMarkers(entry) {
  const out = new Set()
  const keyRe = /^(answer|answers|correct|correctAnswer|correct_answer|solution|expected)$/i
  const walk = (v, key) => {
    if (v && typeof v === 'object') {
      if (Array.isArray(v)) { v.forEach((x) => walk(x, key)); return }
      if (typeof v.answerIndex === 'number' && Array.isArray(v.options) && typeof v.options[v.answerIndex] === 'string') out.add(v.options[v.answerIndex])
      for (const [k, x] of Object.entries(v)) walk(x, k)
    } else if (typeof v === 'string' && key && keyRe.test(key) && v.trim().length >= 4) out.add(v.trim())
  }
  walk(entry.payload && entry.payload.value, '')
  for (const m of entry.answerMarkers || []) out.add(m)
  return Array.from(out)
}

// ───────────────────────────── state planning ─────────────────────────────
function buildPlan(disc, hasCanvas) {
  const plan = [{ label: 'default', actions: [], restore: [] }]
  const slug = (s) => safe(String(s).toLowerCase()).slice(0, 28)
  if (disc.stage) {
    // walk every stage, then "Show all"
    const nm = /(\d+)\s+stages|of\s+(\d+)/.exec(disc.stage.meta || '')
    const total = Math.max(2, Math.min(10, nm ? Number(nm[1] || nm[2]) : 4))
    for (let k = 1; k <= total; k++) plan.push({ label: `stage-${k}`, actions: [{ kind: 'button', aria: 'Next stage' }], restore: [], keep: true })
    plan.push({ label: 'stage-reset', actions: [{ kind: 'button', text: 'Show all' }], restore: [], optional: true, silent: true })
  }
  for (const s of disc.sliders) {
    if (s.disabled || !(s.max > s.min)) continue
    const id = s.id ? { id: s.id } : { label: s.label }
    plan.push({ label: `${slug(s.label || s.id)}=min`, actions: [{ kind: 'slider', ...id, value: 'min' }], restore: [{ kind: 'slider', ...id, value: s.value }] })
    plan.push({ label: `${slug(s.label || s.id)}=max`, actions: [{ kind: 'slider', ...id, value: 'max' }], restore: [{ kind: 'slider', ...id, value: s.value }] })
  }
  if (disc.sliders.filter((s) => !s.disabled && s.max > s.min).length >= 2) {
    const live = disc.sliders.filter((s) => !s.disabled && s.max > s.min)
    for (const v of ['min', 'max']) {
      plan.push({
        label: `all-sliders=${v}`,
        actions: live.map((s) => ({ kind: 'slider', ...(s.id ? { id: s.id } : { label: s.label }), value: v })),
        restore: live.map((s) => ({ kind: 'slider', ...(s.id ? { id: s.id } : { label: s.label }), value: s.value })),
      })
    }
  }
  for (const g of disc.groups) {
    const pressedAware = g.buttons.some((b) => b.pressed !== null)
    if (!pressedAware || /speed|playback|animation/i.test(g.label)) continue   // time-based / non-geometric controls
    const orig = g.buttons.find((b) => b.pressed === 'true')
    const exclusive = g.buttons.filter((b) => b.pressed === 'true').length <= 1 && g.buttons.length > 1
    for (const b of g.buttons) {
      if (b.disabled || b.pressed === 'true') continue
      if (!b.text) continue
      plan.push({
        label: `${slug(g.label || 'group')}:${slug(b.text)}`,
        actions: [{ kind: 'chip', group: g.label, text: b.text }],
        restore: exclusive && orig ? [{ kind: 'chip', group: g.label, text: orig.text }] : [{ kind: 'chip', group: g.label, text: b.text }],
      })
    }
  }
  if (disc.expand && disc.expand.pressed !== 'true') {
    plan.push({ label: 'expanded', actions: [{ kind: 'button', aria: 'Expand the figure' }], restore: [{ kind: 'button', aria: 'Return the figure to the lesson' }] })
  }
  for (const g of disc.groups) {
    if (g.buttons.some((b) => b.pressed !== null)) continue
    if (/common idea/i.test(g.label)) plan.push({ label: 'common-idea', actions: [{ kind: 'chip', group: g.label, text: g.buttons[0].text }], restore: [], terminal: true })
  }
  void hasCanvas
  if (plan.length > MAX_STATES) {
    // keep default + stage walk first (they are the teaching sequence), then sample the rest evenly
    const head = plan.filter((p) => p.label === 'default' || p.label.startsWith('stage'))
    const rest = plan.filter((p) => !head.includes(p))
    const room = Math.max(0, MAX_STATES - head.length)
    const step = rest.length / Math.max(1, room)
    const picked = []
    for (let i = 0; i < room && Math.floor(i * step) < rest.length; i++) picked.push(rest[Math.floor(i * step)])
    return [...head, ...picked]
  }
  return plan
}

// ───────────────────────────── per (instance, viewport, theme) run ─────────────────────────────
async function runOne(browser, entry0, vp, theme, idx, level, driveHere) {
  const entry = level && level !== 'default' ? { ...entry0, learnerLevel: level } : entry0
  const lv = level && level !== 'default' ? level : null
  const vpCfg = VIEWPORTS[vp]
  const context = await browser.newContext({
    viewport: { width: vpCfg.width, height: vpCfg.height }, deviceScaleFactor: vpCfg.deviceScaleFactor,
    reducedMotion: MOTION, colorScheme: theme, serviceWorkers: 'block', locale: 'en-US', timezoneId: 'UTC',
  })
  const out = []
  const consoleBuf = []
  try {
    await context.route('**/*', (route) => {
      const u = new URL(route.request().url())
      if (u.origin !== new URL(BASE).origin) return route.abort()
      if (u.pathname.startsWith('/api/')) return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
      return route.continue()
    })
    await context.addInitScript(`try{localStorage.setItem('mytutor_theme','${theme}')}catch(e){}`)
    await context.addInitScript({ content: `(${auditLib.toString()})()` })
    await context.addInitScript(`window.__CHEM_AUDIT__=${JSON.stringify({
      instanceId: entry.instanceId, payload: entry.payload, learnerLevel: entry.learnerLevel, speed: entry.speed, surface: entry.surface,
    }).replace(/</g, '\\u003c')}`)
    const page = await context.newPage()
    page.on('pageerror', (e) => consoleBuf.push({ code: 'PAGE_ERROR', severity: 'fail', detail: 'uncaught exception: ' + String(e.message || e).slice(0, 300), elementText: '', bbox: null }))
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return
      const text = msg.text()
      if (noiseConsole(text)) return
      consoleBuf.push({ code: 'CONSOLE_ERROR', severity: 'review', detail: text.slice(0, 300), elementText: '', bbox: null })
    })
    await page.evaluate(() => {}).catch(() => {})
    const cfg = { ...THRESHOLDS }
    await page.addInitScript(`window.addEventListener('DOMContentLoaded',()=>{window.__AUDIT__&&window.__AUDIT__.configure(${JSON.stringify(cfg)})})`)
    for (let attempt = 1; ; attempt++) {
      try { await page.goto(`${BASE}/dev/chem-visual-audit`, { waitUntil: 'load', timeout: attempt === 1 ? 90000 : 180000 }); break } catch (e) { if (attempt >= 2) throw e }
    }
    await page.evaluate((c) => window.__AUDIT__.configure(c), cfg)

    // wait for the real component
    const t0 = Date.now()
    let st = null
    while (Date.now() - t0 < 45000) {
      st = await page.evaluate(() => window.__AUDIT__.status()).catch(() => null)
      if (st && (st.error || st.dropped || (st.hasContent && !st.preparing))) break
      await page.waitForTimeout(250)
    }
    const timedOut = !st || !(st.error || st.dropped || (st.hasContent && !st.preparing))
    await waitSettled(page)
    st = await page.evaluate(() => window.__AUDIT__.status()).catch(() => st)

    const meta = { instanceId: entry.instanceId, viewport: vp, theme }
    const markers = answerMarkers(entry)
    const disc = driveHere ? await page.evaluate(() => window.__AUDIT__.discover()).catch(() => ({ sliders: [], groups: [], stage: null, expand: null })) : { sliders: [], groups: [], stage: null, expand: null }
    const hasCanvas = (await page.evaluate(() => document.querySelectorAll('[data-audit-frame] canvas').length).catch(() => 0)) > 0
    const plan = driveHere && !(st && (st.error || st.dropped)) ? buildPlan(disc, hasCanvas) : [{ label: 'default', actions: [], restore: [] }]

    vlog(`${entry.instanceId} @${vp} ${theme}: controls ${JSON.stringify({ sliders: disc.sliders.length, groups: disc.groups.map((g) => g.label + '[' + g.buttons.length + ']'), stage: !!disc.stage })}; plan ${plan.map((p) => p.label).join(', ')}`)
    let order = 0
    for (const step of plan) {
      let applied = true
      if (step.actions.length) {
        for (const a of step.actions) {
          const r = await page.evaluate((x) => window.__AUDIT__.act(x), a).catch((e) => ({ ok: false, why: String(e) }))
          if (!r.ok) applied = false
        }
        if (!applied) { vlog(`state ${step.label}: action failed (${JSON.stringify(step.actions)}), skipped`); continue }
        await waitSettled(page, { minMs: 350, maxMs: 6000 })
      }
      if (step.silent) continue
      const shot = path.join(OUT, 'shots', `${safe(entry.instanceId)}${lv ? '@' + lv : ''}-${vp}-${theme}${step.label === 'default' ? '' : '-' + safe(step.label)}.png`)
      const stNow = await page.evaluate(() => window.__AUDIT__.status()).catch(() => st)
      let res
      try {
        res = await capture(page, shot, meta)
      } catch (e) {
        res = { error: String(e && e.message || e) }
      }
      const pending = consoleBuf.splice(0)
      if (res.error || !res.m) {
        out.push({ instanceId: entry.instanceId, level: lv, viewport: vp, theme, state: step.label, order: order++, status: 'FAIL',
          findings: [{ code: 'RENDER_ERROR', severity: 'fail', detail: 'measurement failed: ' + (res.error || 'no frame'), elementText: '', bbox: null }, ...pending],
          metrics: {}, screenshot: null })
      } else {
        const an = analyse(entry, res.m, res.cr, { answerMarkers: step.label === 'default' ? markers : [], stateLabel: step.label, consoleErrors: pending, status: stNow })
        if (timedOut && step.label === 'default') an.findings.unshift({ code: 'RENDER_ERROR', severity: 'fail', detail: 'component did not finish rendering within 45s', elementText: '', bbox: null })
        if (timedOut && step.label === 'default') an.status = 'FAIL'
        out.push({ instanceId: entry.instanceId, level: lv, viewport: vp, theme, state: step.label, order: order++, status: an.status, findings: an.findings, metrics: an.metrics, screenshot: path.relative(OUT, shot) })
      }
      if (!step.keep && step.restore.length) {
        for (const a of step.restore) await page.evaluate((x) => window.__AUDIT__.act(x), a).catch(() => {})
        await waitSettled(page, { minMs: 250, maxMs: 4000 })
      }
      if (step.terminal) break
    }
  } catch (e) {
    out.push({ instanceId: entry.instanceId, level: lv, viewport: vp, theme, state: 'default', order: 0, status: 'FAIL',
      findings: [{ code: 'RENDER_ERROR', severity: 'fail', detail: 'harness failure: ' + String(e && e.message || e).slice(0, 300), elementText: '', bbox: null }], metrics: {}, screenshot: null })
  } finally {
    await context.close().catch(() => {})
  }
  void idx
  return out
}

// ───────────────────────────── selftest fixtures ─────────────────────────────
function selftestEntries() {
  const svg = (vb, inner, extra = '') => `<svg viewBox="${vb}" width="100%" role="img" aria-label="selftest figure" style="display:block;background:var(--bg-elevated);${extra}">${inner}</svg>`
  const T = (x, y, s, t, fill = 'var(--text-primary)', more = '') => `<text x="${x}" y="${y}" font-size="${s}" fill="${fill}" ${more}>${t}</text>`
  const mk = (id, html, expect) => ({ instanceId: id, conceptIds: ['selftest'], payload: { field: '__selftest_html', value: html }, expect })
  return [
    mk('st_clean', svg('0 0 340 120', T(20, 40, 14, 'Water, H2O') + T(20, 80, 14, 'Boiling point 100 °C') + '<line x1="10" y1="100" x2="330" y2="100" stroke="var(--text-dim)"/>'),
      { never: ['FONT_TOO_SMALL', 'LABEL_COLLISION', 'CLIPPED', 'CONTRAST_LOW', 'OVERFLOW_X', 'NAN_TEXT', 'DEBUG_TEXT', 'INTERNAL_ID', 'LABEL_OVER_STROKE', 'TEXT_OBSCURED'] }),
    mk('st_viewbox_scaled_font', svg('0 0 600 160', T(20, 40, 12, 'Na+ and Cl- ions in the lattice')),
      { '390': { all: ['FONT_TOO_SMALL'] }, '1280': { never: ['FONT_TOO_SMALL'] } }),
    mk('st_tiny_font', svg('0 0 340 100', T(20, 40, 5, 'Five-unit label inside a 340 wide viewBox')), { all: ['FONT_TOO_SMALL'] }),
    mk('st_overlap', svg('0 0 340 100', T(30, 50, 16, 'Na+ cation') + T(33, 54, 16, 'Cl- anion')), { all: ['LABEL_COLLISION'] }),
    mk('st_nan_debug', '<div style="padding:8px;color:var(--text-primary);font-size:14px"><p>ΔH = NaN kJ/mol</p><p>Temperature: undefined K</p><p>[object Object]</p><p>TODO: replace placeholder</p><p>chem.bond.vsepr</p><p>Rate = Infinity</p></div>',
      { all: ['NAN_TEXT', 'DEBUG_TEXT', 'INTERNAL_ID'] }),
    mk('st_low_contrast', '<div style="background:#ffffff;padding:10px"><span style="color:#cfcfcf;font-size:16px">Pale grey on white</span></div>', { all: ['CONTRAST_LOW'] }),
    mk('st_clipped', svg('0 0 200 80', T(150, 40, 20, 'Overflowing label here')), { all: ['CLIPPED'] }),
    mk('st_overflow_x', '<div style="width:900px;height:24px;background:#444;color:#fff;font-size:14px">a 900px wide strip inside the figure</div>', { all: ['OVERFLOW_X'] }),
    mk('st_hidden', '<div style="color:var(--text-primary);font-size:14px"><p style="opacity:0">Invisible note</p><p>Visible note</p></div>', { all: ['HIDDEN_TEXT'] }),
    mk('st_stroke', svg('0 0 340 100', T(40, 55, 18, 'ΔH reaction') + '<line x1="20" y1="48" x2="320" y2="48" stroke="var(--text-primary)" stroke-width="2"/>'), { all: ['LABEL_OVER_STROKE'] }),
    mk('st_obscured', svg('0 0 340 100', T(40, 55, 18, 'Covered label') + '<rect x="30" y="30" width="200" height="40" fill="#222"/>'), { all: ['TEXT_OBSCURED'] }),
  ]
}

// ───────────────────────────── main ─────────────────────────────
async function pool(tasks, n, fn) {
  const results = new Array(tasks.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(n, tasks.length) }, async () => {
    while (true) {
      const i = next++
      if (i >= tasks.length) return
      results[i] = await fn(tasks[i], i)
    }
  }))
  return results
}

async function main() {
  let entries
  if (args.selftest) {
    entries = selftestEntries()
  } else {
    if (!args.manifest) { console.error('usage: render-measure.mjs --manifest <file> [--only a,b] [--out dir] | --selftest'); process.exit(2) }
    entries = JSON.parse(fs.readFileSync(path.resolve(args.manifest), 'utf8'))
    if (!Array.isArray(entries)) throw new Error('manifest must be a JSON array')
    entries = entries.map((e, i) => { if (!e.instanceId || !e.payload || !e.payload.field) throw new Error(`bad manifest entry #${i}: needs instanceId and payload.field`); return normalizeEntry(e) })
  }
  entries.forEach((e, i) => { e.__index = i })
  const allEntries = entries.slice()   // --resume reports over the whole manifest + every row already on disk, whatever --only/--themes narrowed THIS invocation to
  if (args.only) {
    // tokens are exact ids or globs (* ?), comma separated; the whole string is also tried as one pattern because two real ids contain commas
    const toRe = (g) => new RegExp('^' + g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$')
    const pats = [...args.only.split(',').map((s) => s.trim()).filter(Boolean), args.only.trim()].map(toRe)
    entries = entries.filter((e) => pats.some((re) => re.test(e.instanceId)))
    if (!entries.length) throw new Error('--only matched no instanceId')
  }
  if (args.limit) entries = entries.slice(0, Number(args.limit))

  const seenIds = new Set()
  for (const e of entries) {
    if (!e.instanceId || !e.payload || !e.payload.field) throw new Error(`bad manifest entry #${e.__index}: needs instanceId and payload.field`)
    if (seenIds.has(e.instanceId)) throw new Error(`duplicate instanceId ${e.instanceId}`)
    seenIds.add(e.instanceId)
  }

  fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true })
  await ensureServer()
  const exe = findChromium()
  const launch = () => chromium.launch({
    executablePath: exe, headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb', '--no-sandbox'],
  })
  let browser = await launch()
  const chromiumVersion = browser.version()
  let relaunching = null
  let runsSinceLaunch = 0
  /** A crashed or long-lived Chromium is replaced (fresh process, fresh GPU/WebGL state); concurrent callers share one relaunch. */
  const getBrowser = async (force = false) => {
    if (force || !browser.isConnected()) {
      if (!relaunching) {
        relaunching = (async () => { log('relaunching chromium'); try { await browser.close() } catch { /* already gone */ } browser = await launch(); runsSinceLaunch = 0 })().finally(() => { relaunching = null })
      }
      await relaunching
    }
    return browser
  }
  log(`chromium ${chromiumVersion} · ${entries.length} instance(s) · viewports ${VPS.join('/')} · themes ${THEMES.join('/')} · motion ${MOTION} · workers ${WORKERS}${DRIVE ? '' : ' · controls NOT driven'}`)

  const tasks = []
  for (const e of entries) for (const lv of LEVELS) for (const vp of VPS) for (const th of THEMES) {
    // levels only change a sceneSpec (label budget / controls); cards and visualSpecs ignore learnerLevel
    if (lv !== 'default' && e.payload.field !== 'sceneSpec') continue
    if (lv !== 'default' && th !== THEMES[0]) continue   // level only changes label budget/controls, not colour: first theme is enough
    const isVariant = e.reachability === 'interactive-variant'
    const driveHere = DRIVE && lv === 'default' && (DRIVE_ALL_THEMES || th === THEMES[0]) && (!isVariant || args['drive-variants']) && !args.selftest
    tasks.push({ e, vp, th, lv, driveHere })
  }
  const t0 = Date.now()
  let done = 0
  // incremental persistence: one JSON line per finished run, so an interruption loses at most the runs in flight (--resume continues)
  const PARTIAL = path.join(OUT, args.selftest ? 'render-results.selftest.partial.jsonl' : 'render-results.partial.jsonl')
  /** A run that died because the browser/page/server went away is a harness fault, not a finding: never persisted as a result, always retried. */
  const isTransient = (rows) => rows.some((x) => x.findings.some((f) => f.code === 'RENDER_ERROR' && /^(harness failure|measurement failed)/.test(f.detail) && /closed|Timeout|ECONNREFUSED|net::ERR|Target page/.test(f.detail)))
  const keyOf = (t) => `${t.e.instanceId}|${t.lv}|${t.vp}|${t.th}`
  const finished = new Map()
  if (args.resume && fs.existsSync(PARTIAL)) {
    let dropped = 0
    for (const line of fs.readFileSync(PARTIAL, 'utf8').split('\n')) {
      if (!line.trim()) continue
      try { const o = JSON.parse(line); if (isTransient(o.rows)) { dropped++; finished.delete(o.key) } else finished.set(o.key, o.rows) } catch { /* torn last line */ }
    }
    log(`resuming: ${finished.size} run(s) already on disk${dropped ? `, ${dropped} harness-failure run(s) will be retried` : ''}`)
  } else if (fs.existsSync(PARTIAL)) fs.unlinkSync(PARTIAL)
  const todo = tasks.filter((t) => !finished.has(keyOf(t)))
  const retryQueue = []
  const failedRows = new Map()   // last harness-failure rows of runs that never succeeded: shown, not hidden
  const runTask = async (t, i) => {
    const t1 = Date.now()
    let r
    for (let attempt = 1; attempt <= 2; attempt++) {
      const b = await getBrowser()
      runsSinceLaunch++
      r = await runOne(b, t.e, t.vp, t.th, i, t.lv, t.driveHere)
      if (!isTransient(r)) break
      if (attempt === 1) log(`  ! ${t.e.instanceId} @${t.vp} ${t.th}: harness failure, retrying with a fresh context${browser.isConnected() ? '' : ' and browser'}`)
    }
    done++
    if (isTransient(r)) { failedRows.set(keyOf(t), r); retryQueue.push([t, i]); log(`  ! ${t.e.instanceId} @${t.vp} ${t.th}: harness failure, queued for retry`); return r }
    fs.appendFileSync(PARTIAL, JSON.stringify({ key: keyOf(t), rows: r }) + '\n')
    finished.set(keyOf(t), r)
    const worst = r.some((x) => x.status === 'FAIL') ? 'FAIL' : r.some((x) => x.status === 'REVIEW_REQUIRED') ? 'REVIEW' : 'PASS'
    log(`[${String(done + (tasks.length - todo.length)).padStart(String(tasks.length).length)}/${tasks.length}] ${t.e.instanceId}${t.lv !== 'default' ? '@' + t.lv : ''} @${t.vp} ${t.th}: ${r.length} state(s) -> ${worst} (${((Date.now() - t1) / 1000).toFixed(1)}s)`)
    return r
  }
  const BATCH = Math.max(WORKERS * 3, 6)
  for (let b = 0; b < todo.length; b += BATCH) {
    await checkServer()
    if (runsSinceLaunch >= Number(args['restart-browser-every'] || 60)) await getBrowser(true)
    await pool(todo.slice(b, b + BATCH), WORKERS, (t, i) => runTask(t, b + i))
  }
  if (retryQueue.length) {
    log(`retrying ${retryQueue.length} run(s) that hit a harness failure ...`)
    await checkServer()
    const q = retryQueue.splice(0)
    await pool(q, Math.min(2, WORKERS), ([t, i]) => runTask(t, i))
    if (retryQueue.length) log(`  ! ${retryQueue.length} run(s) still failing; they are recorded as RENDER_ERROR rows in render-results.json`)
    for (const [t] of retryQueue) { /* keep the last failure visible in the final report */ void t }
  }
  for (const [k, r] of failedRows) if (!finished.has(k)) finished.set(k, r)
  const partial = args.resume ? Array.from(finished.values()) : tasks.map((t) => finished.get(keyOf(t)) || [])
  await browser.close()
  stopServer()

  // deterministic order: manifest index, viewport order, theme order, state order
  const vpRank = { 1280: 0, 390: 1 }, thRank = { dark: 0, light: 1 }
  const rowIds = new Set(partial.flat().map((r) => r.instanceId))
  const reportEntries = args.resume ? allEntries.filter((e) => rowIds.has(e.instanceId)) : entries
  const idxOf = Object.fromEntries(allEntries.map((e, i) => [e.instanceId, i]))
  const results = partial.flat().sort((a, b) =>
    idxOf[a.instanceId] - idxOf[b.instanceId] || ['default', 'beginner', 'advanced'].indexOf(a.level || 'default') - ['default', 'beginner', 'advanced'].indexOf(b.level || 'default') || vpRank[a.viewport] - vpRank[b.viewport] || thRank[a.theme] - thRank[b.theme] || a.order - b.order)

  const rank = { PASS: 0, REVIEW_REQUIRED: 1, FAIL: 2 }
  const instances = reportEntries.map((e) => {
    const rs = results.filter((r) => r.instanceId === e.instanceId)
    const worst = rs.reduce((w, r) => (rank[r.status] > rank[w] ? r.status : w), 'PASS')
    const codes = {}
    for (const r of rs) for (const f of r.findings) if (f.severity !== 'info') codes[f.code] = (codes[f.code] || 0) + 1
    return {
      instanceId: e.instanceId, conceptIds: e.conceptIds || [], payloadField: e.payload.field, kind: e.kind || null, renderer: e.renderer || null,
      interactive: !!e.interactive, status: worst, statesMeasured: rs.length,
      minFontPx: (() => { const v = rs.map((r) => r.metrics && r.metrics.minFontPx).filter((x) => typeof x === 'number'); return v.length ? Math.min(...v) : null })(),
      levels: Array.from(new Set(rs.map((r) => r.level || 'default'))),
      findingCodes: codes,
    }
  })

  const doc = {
    meta: {
      tool: 'scripts/chemistry/visual-audit/render-measure.mjs', version: 1, generatedAt: new Date().toISOString(),
      baseUrl: BASE, chromium: chromiumVersion, thresholds: THRESHOLDS,
      thresholdSources: {
        fontFloorPx: 'src/components/school/visuals/useFigureLegibility.ts FIGURE_TEXT_FLOOR_PX (= layout.ts FONT_FLOOR_PX = SceneLabel FLOOR_PX)',
        contrast: 'WCAG 2.x AA 4.5:1 normal / 3:1 large; repo rule ENGL-017 (label text never below 4.5:1)',
        containerWidths: 'LessonScreen.module.css .teachingCanvas/.canvasVisual replicated by the dev page; ~560px figure at 1280, ~358px at 390',
      },
      viewports: Object.keys(VIEWPORTS).filter((v) => results.some((r) => r.viewport === v)).map((v) => VIEWPORTS[v]), themes: ['dark', 'light'].filter((t) => results.some((r) => r.theme === t)), motion: MOTION, controlsDriven: DRIVE, maxStatesPerRun: MAX_STATES,
      screenshotBBoxNote: 'finding.bbox is in CSS px relative to the viewport at capture time (frame-relative coordinates are in metrics.frame); screenshot clip starts 12px left of the frame',
      counts: { instances: reportEntries.length, runs: args.resume ? finished.size : tasks.length, states: results.length,
        pass: results.filter((r) => r.status === 'PASS').length, review: results.filter((r) => r.status === 'REVIEW_REQUIRED').length, fail: results.filter((r) => r.status === 'FAIL').length },
    },
    instances, results,
  }
  fs.writeFileSync(path.join(OUT, args.selftest ? 'render-results.selftest.json' : 'render-results.json'), JSON.stringify(doc, null, 1))

  // ── console summary ──
  log('\ninstance'.padEnd(46) + 'status'.padEnd(17) + 'states  minFont  codes (non-info)')
  for (const i of instances) {
    log(i.instanceId.padEnd(45) + ' ' + i.status.padEnd(16) + String(i.statesMeasured).padEnd(8) + String(i.minFontPx == null ? '-' : i.minFontPx).padEnd(9) +
      Object.entries(i.findingCodes).map(([k, v]) => `${k}x${v}`).join(' '))
  }
  log(`\n${doc.meta.counts.states} state(s): ${doc.meta.counts.pass} PASS · ${doc.meta.counts.review} REVIEW_REQUIRED · ${doc.meta.counts.fail} FAIL · ${((Date.now() - t0) / 1000).toFixed(0)}s`)
  log(`wrote ${path.join(OUT, args.selftest ? 'render-results.selftest.json' : 'render-results.json')}`)

  if (args.selftest) {
    let bad = 0
    log('\nSELFTEST expectations')
    for (const e of entries) {
      for (const vp of VPS) {
        const rs = results.filter((r) => r.instanceId === e.instanceId && r.viewport === vp && r.state === 'default')
        const codes = new Set(rs.flatMap((r) => r.findings.filter((f) => f.severity !== 'info' || f.code === 'HIDDEN_TEXT').map((f) => f.code)))
        const exp = e.expect[vp] || e.expect
        const miss = (exp.all || []).filter((c) => !codes.has(c))
        const extra = (exp.never || []).filter((c) => codes.has(c))
        const ok = !miss.length && !extra.length
        if (!ok) bad++
        log(`${ok ? 'ok  ' : 'BAD '} ${e.instanceId.padEnd(26)} @${vp}  got [${Array.from(codes).join(',')}]${miss.length ? '  MISSING ' + miss.join(',') : ''}${extra.length ? '  UNEXPECTED ' + extra.join(',') : ''}`)
      }
    }
    log(bad ? `\nSELFTEST FAILED (${bad})` : '\nSELFTEST PASSED')
    process.exit(bad ? 1 : 0)
  }
}

main().catch((e) => { console.error(e); stopServer(); process.exit(1) })
process.on('SIGINT', () => { stopServer(); process.exit(130) })
