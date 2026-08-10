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

/** The same floor SceneLabel enforces for the 3D half. One number, one engine. */
export const FIGURE_TEXT_FLOOR_PX = 10

/** Remembers each text's authored size so repeated passes stay idempotent. */
const AUTHORED_ATTR = 'data-authored-font'

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
