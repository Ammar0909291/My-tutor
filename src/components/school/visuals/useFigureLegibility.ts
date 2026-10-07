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

import { useCallback, useEffect, useRef } from 'react'
import { placeSvgLabels, svgUserUnitScale } from './svgLabelPlacement'
import { liftToContrast } from '@/lib/teaching/sceneGenerators/visualDesign'

/** The same floor SceneLabel enforces for the 3D half. One number, one engine. */
export const FIGURE_TEXT_FLOOR_PX = 10

/** Remembers each text's authored size so repeated passes stay idempotent. */
const AUTHORED_ATTR = 'data-authored-font'
/** …and its authored fill, and the theme that fill was resolved in. */
const AUTHORED_FILL_ATTR = 'data-authored-fill'
const FILL_THEME_ATTR = 'data-authored-fill-theme'

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

/**
 * What a label is actually painted ON: the top-most opaque thing under its
 * centre — a filled SVG shape the figure drew, else the nearest HTML ancestor
 * with a solid background (the card). Never the label itself.
 */
function backdropBehind(el: SVGTextElement): [number, number, number] | null {
  const r = el.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return null
  const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
  for (const e of stack) {
    if (e === el || el.contains(e) || e.contains(el) && e instanceof SVGElement && !(e instanceof SVGSVGElement)) continue
    if (e instanceof SVGElement && !(e instanceof SVGSVGElement)) {
      if (e instanceof SVGTextElement || e instanceof SVGTSpanElement) continue
      const cs = getComputedStyle(e)
      const fill = cs.fill !== 'none' ? parseRgba(cs.fill) : null
      if (fill && fill[3] * parseFloat(cs.fillOpacity || '1') * parseFloat(cs.opacity || '1') >= 0.9) return [fill[0], fill[1], fill[2]]
      continue
    }
    for (let a: Element | null = e; a; a = a.parentElement) {
      const bg = parseRgba(getComputedStyle(a).backgroundColor)
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
function applyTextContrast(el: SVGTextElement): void {
  const theme = document.documentElement.getAttribute('data-theme') ?? ''
  // A theme flip changes what the authored fill RESOLVES to; forget the cache.
  if (el.hasAttribute(FILL_THEME_ATTR) && el.getAttribute(FILL_THEME_ATTR) !== theme) {
    el.style.fill = ''
    el.removeAttribute(AUTHORED_FILL_ATTR)
  }
  let authored = el.getAttribute(AUTHORED_FILL_ATTR)
  if (!authored) {
    authored = getComputedStyle(el).fill
    el.setAttribute(AUTHORED_FILL_ATTR, authored)
    el.setAttribute(FILL_THEME_ATTR, theme)
  }
  const fg = parseRgba(authored)
  if (!fg) return
  const bg = backdropBehind(el)
  if (!bg) return
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
}

function applyLegibility(root: HTMLElement): void {
  const svgs = root.querySelectorAll('svg')
  for (const svg of Array.from(svgs)) {
    // 1. THE FRAME OWNS WIDTH. A figure that capped itself cannot know the
    //    surface it landed on.
    if (svg.style.maxWidth) svg.style.maxWidth = ''

    const scale = svgUserUnitScale(svg)
    if (scale === null) continue

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
      applyTextContrast(el)
    }

    // 3. LABELS DO NOT SIT ON EACH OTHER. Same solver as the 3D half, fed the
    //    SVG projection — growing type to the floor makes boxes bigger, so a
    //    corpus that was merely unreadable would otherwise become unreadable
    //    AND overlapping.
    placeSvgLabels(svg)
  }
}

/**
 * Attach to the element the shared frame wraps around a figure. Re-runs on
 * resize, because the floor depends on how wide the figure actually rendered.
 */
export function useFigureLegibility<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const run = useCallback(() => {
    if (ref.current) applyLegibility(ref.current)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    run()
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

    const resize = new ResizeObserver(() => run())
    resize.observe(node)
    for (const svg of Array.from(node.querySelectorAll('svg'))) resize.observe(svg)

    // Animated figures re-render every step, and React repaints each <text>
    // from its authored props — undoing the floor a fraction of a second after
    // it was applied. Measured: a step-animated card fell back to 9.5px.
    // Watching the tree keeps the floor true for the whole animation. The pass
    // is idempotent and writes nothing when nothing changed, so it settles
    // rather than looping.
    let queued = 0
    // Both passes below write only what changed, so a settled figure produces
    // no records and this watcher goes quiet on its own. That property is what
    // makes it safe to let the pass observe its own output: it converges
    // instead of ringing, and a real change is never lost to our own noise.
    const mutate = new MutationObserver(() => {
      if (queued) return
      queued = requestAnimationFrame(() => { queued = 0; run() })
    })
    // NO attributeFilter. An animated figure advances a step by changing
    // whatever that figure happens to use — `opacity`, `class`, a `transform`
    // attribute — and a filter is a list of the ways we guessed a figure might
    // change. Measured: filtering to the obvious geometry attributes left two
    // labels displaced off-frame by a stale solution, because the step change
    // that invalidated it was an attribute nobody had thought to list.
    mutate.observe(node, { subtree: true, childList: true, attributes: true })

    return () => {
      for (const id of settle) clearTimeout(id)
      resize.disconnect()
      mutate.disconnect()
      if (queued) cancelAnimationFrame(queued)
    }
  }, [run])

  return ref
}
