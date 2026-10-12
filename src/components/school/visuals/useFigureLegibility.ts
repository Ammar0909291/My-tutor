'use client'

/**
 * THE 2D FIGURE LEGIBILITY OWNER.
 *
 * The 3D half of the corpus has one shared label system (SceneLabel +
 * SceneLabelLayer + placeSceneLabels) enforcing a 10px readability floor. The
 * 2D half had nothing equivalent, and measured in Chromium it showed:
 *
 *     mobile          117 texts below the floor · 13 collisions
 *     tablet/desktop   87 texts below the floor · 12 collisions
 *
 * The tablet and desktop numbers being IDENTICAL is the tell. Each of the 19
 * SVG cards caps its own width independently (220-360px) inside a frame that
 * allows 560, so the figure renders at the same size on a phone and a
 * 27" monitor, and 8px type inside a 300-unit viewBox stays 8px everywhere.
 *
 * TWO RULES, APPLIED ONCE, TO EVERY 2D FIGURE:
 *
 *  1. THE FRAME OWNS WIDTH. Private inline max-widths are cleared, so a figure
 *     grows to the surface it is actually drawn on.
 *
 *  2. TYPE HAS A FLOOR. An SVG scales its whole user space, so rendered type
 *     size is fontSize x (renderedWidth / viewBoxWidth). Any text whose
 *     RENDERED size lands below the floor is scaled UP in user units until it
 *     clears it. Type is only ever grown, never shrunk and never hidden —
 *     the floor is the one thing the engine will not trade away.
 *
 * Why widening alone is not enough, measured rather than assumed: at 390px the
 * column is ~300px wide, so a 300-unit viewBox with 8px type would need to
 * render at 375px to clear a 10px floor — wider than the phone. Width fixes
 * desktop; only scaling the type fixes the phone. Both rules are required.
 *
 * WHY A DOM PASS AND NOT A COMPONENT. The alternative was a shared <FigureSvg>
 * that all 19 cards adopt — 19 edits to authored figures, which is the
 * per-figure surgery this work exists to avoid. This hook lives in the SHARED
 * FRAME and applies to whatever the frame renders, so a new figure inherits
 * both rules without knowing they exist. It reads and writes only presentation
 * (max-width, font-size); it never moves, reorders, rewords or removes
 * anything, and it is idempotent.
 */

import { useEffect, useRef } from 'react'
import { placeSvgLabels, svgUserUnitScale } from './svgLabelPlacement'
import { liftToContrast } from '@/lib/teaching/sceneGenerators/visualDesign'

/** The same floor SceneLabel enforces for the 3D half. One number, one engine. */
export const FIGURE_TEXT_FLOOR_PX = 10

/** Remembers each text's authored size so repeated passes stay idempotent. */
const AUTHORED_ATTR = 'data-authored-font'
/** …and its authored fill, and the theme that fill was resolved in. */
const AUTHORED_FILL_ATTR = 'data-authored-fill'
const FILL_THEME_ATTR = 'data-authored-fill-theme'
/** …and the `fill`/`class` it was read from, so a re-rendered label is re-read instead of lifted from a stale colour. */
const AUTHORED_SRC_ATTR = 'data-authored-fill-src'

/** WCAG AA for normal text — the bar ENGL-017 already holds scene labels to. */
const TEXT_CONTRAST_MIN = 4.5

type Rgba = [number, number, number, number]

/** A computed colour (`rgb()`/`rgba()`, which is all getComputedStyle returns here) to numbers. */
function parseRgba(css: string): Rgba | null {
  const m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/.exec(css.trim())
  if (!m) return null
  const a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  return [Number(m[1]), Number(m[2]), Number(m[3]), a]
}

/** Marks the frame this pass owns, so a label can find its figure from anywhere inside it. */
const ROOT_ATTR = 'data-figure-legibility'
/** How many labels the last pass could NOT measure (off screen, clipped, laid out at 0x0). Absent when zero. */
const UNMEASURED_ATTR = 'data-contrast-unmeasured'

/**
 * What a label is actually painted ON: the top-most opaque thing under its
 * centre — a filled SVG shape the figure drew, else the nearest HTML ancestor
 * with a solid background (the card). Never the label itself.
 *
 * `null` means "could not be determined", and that is a real answer the caller
 * must not paper over. It is returned when:
 *   - the label has no box (hidden by CSS, not laid out), or
 *   - the label's centre is outside the viewport or clipped by a scroll
 *     container — `document.elementsFromPoint` only hits what is on screen, so
 *     for a figure mounted above the fold (every older figure of a restored
 *     lesson) the stack holds nothing of the figure at all. 2026-10-12: that
 *     was the intermittent CT-01 — such a figure never got its contrast lift,
 *     and scrolling it into view did not rerun the pass.
 *
 * Only the figure's own paint stack and its ancestors count. A sticky header,
 * a toast or the composer that happens to cover the point is neither inside
 * the figure nor an ancestor of it, and its colour is not what the label is
 * read against.
 */
function backdropBehind(el: SVGTextElement): [number, number, number] | null {
  const r = el.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return null
  const root = el.closest(`[${ROOT_ATTR}]`)
  const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
  // Nothing of THIS figure is under the point -> the label is off screen or clipped: not measurable.
  if (root && !stack.some((e) => root.contains(e))) return null
  if (!root && stack.length === 0) return null
  for (const e of stack) {
    if (root && !root.contains(e) && !e.contains(root)) continue // an overlay: not part of what the label sits on
    if (e === el || el.contains(e) || e.contains(el) && e instanceof SVGElement && !(e instanceof SVGSVGElement)) continue
    if (e instanceof SVGElement && !(e instanceof SVGSVGElement)) {
      if (e instanceof SVGTextElement || e instanceof SVGTSpanElement) continue
      const cs = getComputedStyle(e)
      const fill = cs.fill !== 'none' ? parseRgba(cs.fill) : null
      if (fill && fill[3] * parseFloat(cs.fillOpacity || '1') * parseFloat(cs.opacity || '1') >= 0.9) return [fill[0], fill[1], fill[2]]
      continue
    }
    for (let a: Element | null = e; a; a = a.parentElement) {
      const cs = getComputedStyle(a)
      // A gradient or image paints over any colour beneath it: what the label sits on is then unknowable here,
      // and guessing the solid ancestor behind it would be a false success.
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null
      const bg = parseRgba(cs.backgroundColor)
      if (bg && bg[3] >= 0.9) return [bg[0], bg[1], bg[2]]
    }
  }
  return null
}

/**
 * RULE 3 — TEXT HOLDS 4.5:1 ON WHAT IT SITS ON.
 *
 * The 19 SVG cards hard-code mid-tone hues for their TEXT (#3B82F6, #8B5CF6,
 * #22A06B …) on a figure surface that is #243329 in the dark theme. Measured in
 * Chromium, "Friction" was 3.6:1, "Normal (N)" 3.1:1 and "Applied" 4.0:1 — the
 * same defect ENGL-017 fixed for scene labels, in the half of the engine that
 * fix does not reach. The hue is kept and mixed toward white/black only as far
 * as legibility needs; text that already reads is not touched.
 */
function applyTextContrast(el: SVGTextElement): boolean {
  const theme = (el.closest('[data-theme]') ?? document.documentElement).getAttribute('data-theme') ?? ''
  // What the authored fill is derived from: React can re-render a label with a different `fill` / class
  // (a highlighted state), and a cache keyed on nothing would keep lifting the OLD colour.
  const source = `${el.getAttribute('fill') ?? ''}|${el.getAttribute('class') ?? ''}`
  // A theme flip changes what the authored fill RESOLVES to; a changed source changes what it IS. Forget the cache.
  if ((el.hasAttribute(FILL_THEME_ATTR) && el.getAttribute(FILL_THEME_ATTR) !== theme) || (el.hasAttribute(AUTHORED_SRC_ATTR) && el.getAttribute(AUTHORED_SRC_ATTR) !== source)) {
    el.style.fill = ''
    el.style.fillOpacity = ''
    el.removeAttribute(AUTHORED_FILL_ATTR)
  }
  let authored = el.getAttribute(AUTHORED_FILL_ATTR)
  if (!authored) {
    authored = getComputedStyle(el).fill
    el.setAttribute(AUTHORED_FILL_ATTR, authored)
    el.setAttribute(FILL_THEME_ATTR, theme)
    el.setAttribute(AUTHORED_SRC_ATTR, source)
  }
  const fg = parseRgba(authored)
  if (!fg) return true // a colour this pass cannot read is not a measurement problem it can fix
  const bg = backdropBehind(el)
  if (!bg) return false // not measurable NOW (off screen / clipped / not laid out): reported, retried when visible
  // Translucent FILL (fill-opacity / an rgba fill) is judged as it composites.
  // Element `opacity` is deliberately NOT read: figures animate it (the reveal
  // fade-in), and a pass that caught a label at 0.2 would "fix" a fade.
  const alpha = Math.min(1, Math.max(0, fg[3] * parseFloat(getComputedStyle(el).fillOpacity || '1')))
  const over = (c: number, b: number) => c * alpha + b * (1 - alpha)
  const composite: [number, number, number] = [over(fg[0], bg[0]), over(fg[1], bg[1]), over(fg[2], bg[2])]
  const lifted = liftToContrast(composite, bg, TEXT_CONTRAST_MIN)
  const unchanged = lifted[0] === composite[0] && lifted[1] === composite[1] && lifted[2] === composite[2]
  const next = unchanged ? '' : `rgb(${lifted[0]}, ${lifted[1]}, ${lifted[2]})`
  if (el.style.fill !== next) el.style.fill = next
  // A lifted colour already includes the translucency it was lifted for.
  const nextOpacity = !unchanged && alpha < 1 ? '1' : ''
  if (el.style.fillOpacity !== nextOpacity) el.style.fillOpacity = nextOpacity
  return true
}

function applyLegibility(root: HTMLElement): void {
  const svgs = root.querySelectorAll('svg')
  // Labels whose backdrop could not be determined on this pass (off screen, clipped, not laid out). Surfaced on
  // the frame so a figure that was never actually measured cannot be mistaken for one that passed.
  let unmeasured = 0
  for (const svg of Array.from(svgs)) {
    // 1. THE FRAME OWNS WIDTH. A figure that capped itself cannot know the
    //    surface it landed on.
    if (svg.style.maxWidth) svg.style.maxWidth = ''

    const scale = svgUserUnitScale(svg)
    // Not laid out (hidden by CSS, 0x0): nothing here can be measured YET — say so, do not count it as a pass. The
    // ResizeObserver runs the pass again the moment it has a size.
    if (scale === null) { unmeasured += svg.querySelectorAll('text').length; continue }

    // 2. TYPE HAS A FLOOR. The epsilon is sub-pixel rounding, not a bigger
    //    floor: without it a text solved to exactly the floor measures
    //    9.999px in the browser and reads as a violation.
    const minUserUnits = (FIGURE_TEXT_FLOOR_PX + 0.05) / scale
    for (const text of Array.from(svg.querySelectorAll('text'))) {
      const el = text as SVGTextElement & { style: CSSStyleDeclaration }
      let authored = Number(el.getAttribute(AUTHORED_ATTR))
      if (!Number.isFinite(authored) || authored <= 0) {
        // First pass: whatever the figure asked for, before we touched it.
        authored = parseFloat(getComputedStyle(el).fontSize)
        if (!Number.isFinite(authored) || authored <= 0) continue
        el.setAttribute(AUTHORED_ATTR, String(authored))
      }
      // Grow only. A figure that already reads well is left exactly as authored.
      const target = Math.max(authored, minUserUnits)
      const next = `${target.toFixed(2)}px`
      if (el.style.fontSize !== next) el.style.fontSize = next
      if (!applyTextContrast(el)) unmeasured++
    }

    // 3. LABELS DO NOT SIT ON EACH OTHER. Same solver as the 3D half, fed the
    //    SVG projection — growing type to the floor makes boxes bigger, so a
    //    corpus that was merely unreadable would otherwise become unreadable
    //    AND overlapping.
    placeSvgLabels(svg)
  }
  const had = root.getAttribute(UNMEASURED_ATTR)
  if (unmeasured > 0) { if (had !== String(unmeasured)) root.setAttribute(UNMEASURED_ATTR, String(unmeasured)) }
  else if (had !== null) root.removeAttribute(UNMEASURED_ATTR)
}

/**
 * The whole lifecycle of one figure's legibility pass, with no React in it — so a real browser test can drive
 * it, and the hook below is only the place React owns the node.
 *
 * WHEN THE PASS RUNS (every one of these is cheap and idempotent — it writes only what changed):
 *   - on attach, after `document.fonts.ready`, and at 100 / 400 / 1200 ms (fonts and first layout);
 *   - when the figure or an svg in it is resized, or its subtree changes (a step reveals, React re-renders);
 *   - **when the figure becomes visible, and as more of it does** (IntersectionObserver). A figure mounted
 *     outside the viewport cannot be measured — `elementsFromPoint` only hits what is on screen — and nothing
 *     else would ever run the pass again for it. Seen in production 2026-10-12: older cards of a restored lesson
 *     kept their authored 3.6-4.0:1 text for good, even after being scrolled to the middle of the screen;
 *   - when the theme flips (`data-theme` on <html> or a themed ancestor): what a label is read against changed
 *     without any node in the figure changing.
 * Returns the cleanup: every observer, listener and timer it created, and the marker it set.
 */
export function attachFigureLegibility(node: HTMLElement): () => void {
  node.setAttribute(ROOT_ATTR, '')
  const run = () => applyLegibility(node)
  run()

  let queued = 0
  const schedule = () => {
    if (queued) return
    queued = requestAnimationFrame(() => { queued = 0; run() })
  }

  // Width drives the floor, so the pass must follow the element's size, not
  // just the window's: the chat column changes width without the window doing.
  // A font arriving after first paint re-measures every string in the figure
  // WITHOUT changing any element's size or attributes — so neither observer
  // below can see it, and the figure keeps a layout solved against metrics
  // that no longer exist. Measured: four labels sat outside their frame, and
  // poking the page into one more pass put every one of them right.
  //
  // `fonts.ready` alone did not cover it, so a short bounded settle follows
  // it. Not a poll — a fixed, finite handful of passes over the first
  // second and a half, each of which writes nothing if nothing changed.
  document.fonts?.ready.then(() => run()).catch(() => {})
  const settle = [100, 400, 1200].map((ms) => setTimeout(run, ms))

  const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => run()) : null
  // Several thresholds, not one: a figure that is half on screen is measurable only where it IS on screen, and the
  // rest of it must be measured when it arrives.
  const visible = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) schedule() }, { threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] })
    : null
  // An svg is replaced when React remounts it (a key change, a step that swaps components): observe the ones that
  // exist NOW, and again after every pass, so no observer is left holding a detached node while the new one is unwatched.
  const watched = new WeakSet<Element>()
  const watchSvgs = () => {
    for (const svg of Array.from(node.querySelectorAll('svg'))) {
      if (watched.has(svg)) continue
      watched.add(svg)
      resize?.observe(svg)
      visible?.observe(svg)
    }
  }
  resize?.observe(node)
  visible?.observe(node)
  watchSvgs()

  // Animated figures re-render every step, and React repaints each <text>
  // from its authored props — undoing the floor a fraction of a second after
  // it was applied. Measured: a step-animated card fell back to 9.5px.
  // Watching the tree keeps the floor true for the whole animation. The pass
  // is idempotent and writes nothing when nothing changed, so it settles
  // rather than looping.
  // Both passes write only what changed, so a settled figure produces
  // no records and this watcher goes quiet on its own. That property is what
  // makes it safe to let the pass observe its own output: it converges
  // instead of ringing, and a real change is never lost to our own noise.
  // NO attributeFilter. An animated figure advances a step by changing
  // whatever that figure happens to use — `opacity`, `class`, a `transform`
  // attribute — and a filter is a list of the ways we guessed a figure might
  // change. Measured: filtering to the obvious geometry attributes left two
  // labels displaced off-frame by a stale solution, because the step change
  // that invalidated it was an attribute nobody had thought to list.
  const mutate = new MutationObserver(() => { watchSvgs(); schedule() })
  mutate.observe(node, { subtree: true, childList: true, attributes: true })

  // The theme lives on <html> (Providers.tsx) or on a themed wrapper; flipping it changes the backdrop of every
  // label while no node inside the figure changes at all.
  const theme = new MutationObserver(() => schedule())
  const themed = new Set<Element>([document.documentElement])
  for (let a: Element | null = node.parentElement; a; a = a.parentElement) if (a.hasAttribute('data-theme')) themed.add(a)
  for (const t of themed) theme.observe(t, { attributes: true, attributeFilter: ['data-theme'] })
  const scheme = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null
  scheme?.addEventListener?.('change', schedule)

  return () => {
    for (const id of settle) clearTimeout(id)
    resize?.disconnect()
    visible?.disconnect()
    mutate.disconnect()
    theme.disconnect()
    scheme?.removeEventListener?.('change', schedule)
    if (queued) cancelAnimationFrame(queued)
    node.removeAttribute(ROOT_ATTR)
    node.removeAttribute(UNMEASURED_ATTR)
  }
}

/**
 * Attach to the element the shared frame wraps around a figure. See `attachFigureLegibility` for what re-runs the pass.
 */
export function useFigureLegibility<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    return attachFigureLegibility(node)
  }, [])

  return ref
}
