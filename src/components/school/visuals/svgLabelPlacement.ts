'use client'

/**
 * THE SVG PROJECTION.
 *
 * The three.js half of the corpus solves label placement with
 * `solveLabelPlacement`, fed by a camera-frustum projection. The 2D half had no
 * placement at all: authored coordinates were painted as-is, and where two
 * labels landed on each other, they stayed there. Measured in Chromium across
 * the 19 SVG cards and 4 VisualSpec figures: 12 collisions at desktop, 21 at
 * 390px once type was grown to the readability floor.
 *
 * This module is NOT a second solver. It is the second PROJECTION. An SVG
 * scales its whole user space, so screen position is
 *
 *     screen = (user - viewBoxMin) x (renderedWidth / viewBoxWidth)
 *
 * — a plain affine map, which is all the shared solver needs. It receives
 * screen-space boxes and screen-space obstacles and cannot tell which medium
 * produced them; that is the point. One solver, one set of rules, two mediums,
 * so the two cannot drift apart.
 *
 * WHAT IT MAY AND MAY NOT DO. It moves text, bounded by the solver's own
 * displacement limit, and nothing else. It never resizes, hides, reorders,
 * rewords or drops a label — a label the solver cannot place is left exactly
 * where its author put it and reported, because losing teaching information is
 * worse than an overlap.
 *
 * WHY A DOM PASS. The alternative is editing the 19 authored figures to move
 * their own labels, which is the per-figure surgery this work exists to avoid,
 * and which no future figure would inherit. This pass sits in the shared frame
 * and applies to whatever the frame renders.
 */

import { solveLabelPlacement, type Box, type PlacementItem } from '@/lib/teaching/visual/layout'

/** Sub-unit differences are not worth a DOM write, and rewriting is what loops. */
const WRITE_EPSILON = 0.02

/**
 * HOW A LABEL IS MOVED, and the one case where it cannot be.
 *
 * Displacement is written as an inline CSS transform: it composes with whatever
 * `transform` attribute the figure already uses, needs no attribute rewriting,
 * and is read back from the style itself — the only record that is actually
 * true, since React owns the `style` prop of everything it renders and drops
 * our transform wholesale on re-render. (A marker attribute survives that,
 * which is worse than useless: the pass then subtracts a displacement that is
 * no longer applied and "corrects" a label that never moved.)
 *
 * THE LIMIT, measured and reported rather than papered over: a label whose own
 * reveal animation has `transform` keyframes cannot be moved this way at all —
 * a running animation outranks inline style. Moving those by their `x`/`y`
 * coordinates instead was implemented and MEASURED across the whole corpus: it
 * regressed 2 collisions to 52, because for an animating element both the
 * measured box and the coordinate space move every frame, so the solver chases
 * a target that never settles. The transform path is kept, and a label pinned
 * by its own animation is reported by `placeSvgLabels`'s return value instead
 * of being silently mangled.
 */
function readDelta(el: SVGTextElement): { dx: number; dy: number } {
  const match = /translate\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px\s*\)/.exec(el.style.transform || '')
  if (!match) return { dx: 0, dy: 0 }
  const dx = Number(match[1])
  const dy = Number(match[2])
  return Number.isFinite(dx) && Number.isFinite(dy) ? { dx, dy } : { dx: 0, dy: 0 }
}

/** Move a label by `dx, dy` in its own units. Never resizes, never hides. */
function applyDelta(el: SVGTextElement, dx: number, dy: number): void {
  if (dx === 0 && dy === 0) el.style.transform = ''
  else el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`
}

/**
 * A screen-space displacement expressed in the units the ELEMENT is drawn in.
 *
 * The figure-wide viewBox scale is only right for a label sitting directly on
 * the root; a label inside a group carrying its own transform is drawn in that
 * group's space. `getScreenCTM()` composes the whole ancestor chain, so
 * inverting it converts exactly, rotation and scale included. A displacement is
 * a direction, not a point, so the matrix's translation terms take no part.
 */
function toLocalDelta(
  el: SVGTextElement, dxScreen: number, dyScreen: number, scale: number,
): { dx: number; dy: number } {
  const ctm = el.getScreenCTM?.()
  if (!ctm) return { dx: dxScreen / scale, dy: dyScreen / scale }
  let inverse: DOMMatrix
  try { inverse = ctm.inverse() } catch { return { dx: dxScreen / scale, dy: dyScreen / scale } }
  return {
    dx: inverse.a * dxScreen + inverse.c * dyScreen,
    dy: inverse.b * dxScreen + inverse.d * dyScreen,
  }
}

/** The same conversion the other way, for reading a previous pass back. */
function toScreenDelta(
  el: SVGTextElement, dx: number, dy: number, scale: number,
): { dx: number; dy: number } {
  const ctm = el.getScreenCTM?.()
  if (!ctm) return { dx: dx * scale, dy: dy * scale }
  return { dx: ctm.a * dx + ctm.c * dy, dy: ctm.b * dx + ctm.d * dy }
}

/** How finely a stroked path is sampled into obstacle dots. Matches the 3D side. */
const PATH_SAMPLES = 12

/** Smallest obstacle radius, in screen px — a bare point still occupies space. */
const MIN_OBSTACLE_RADIUS = 3

function dot(x: number, y: number, r: number): Box {
  return { left: x - r, right: x + r, top: y - r, bottom: y + r }
}

/**
 * Screen px per SVG user unit — the projection itself, in one line.
 *
 * A figure with NO viewBox does not scale: its user units ARE CSS px, so the
 * scale is 1. That case is not an edge case to skip — measured, one of the four
 * VisualSpec figures has no viewBox, and skipping it silently exempted it from
 * both the readability floor and placement while every check still read green.
 *
 * Returns null only when the figure is not on screen at all.
 */
export function svgUserUnitScale(svg: SVGSVGElement): number | null {
  const rendered = svg.getBoundingClientRect().width
  if (!(rendered > 0)) return null

  const viewBox = svg.getAttribute('viewBox')
  if (!viewBox) return 1

  const viewBoxWidth = Number(viewBox.split(/[\s,]+/)[2])
  if (!Number.isFinite(viewBoxWidth) || viewBoxWidth <= 0) return 1

  const scale = rendered / viewBoxWidth
  return Number.isFinite(scale) && scale > 0 ? scale : null
}

/**
 * Non-text geometry as screen-space obstacles.
 *
 * Long strokes are SAMPLED rather than reduced to a bounding box: a diagonal
 * line's bounding box covers a large genuinely-empty area, and a solver that
 * believes that area is occupied pushes labels out of the only free space the
 * figure has.
 */
function obstaclesFor(svg: SVGSVGElement, origin: DOMRect): Box[] {
  const out: Box[] = []
  for (const el of Array.from(svg.querySelectorAll('*'))) {
    const tag = el.tagName.toLowerCase()
    if (tag === 'text' || tag === 'tspan' || tag === 'defs' || tag === 'g' ||
        tag === 'title' || tag === 'desc' || tag === 'style') continue

    const geo = el as SVGGraphicsElement & { getTotalLength?: () => number; getPointAtLength?: (l: number) => DOMPoint }
    const rect = geo.getBoundingClientRect?.()
    if (!rect || rect.width === 0 && rect.height === 0) continue

    if (typeof geo.getTotalLength === 'function' && typeof geo.getPointAtLength === 'function' &&
        (tag === 'path' || tag === 'line' || tag === 'polyline')) {
      let length = 0
      try { length = geo.getTotalLength() } catch { length = 0 }
      if (length > 0) {
        // Sampling happens in user units, so it must be projected like anything
        // else — the element's own CTM does that exactly, transforms included.
        const ctm = geo.getScreenCTM()
        if (ctm) {
          for (let i = 0; i <= PATH_SAMPLES; i++) {
            const p = geo.getPointAtLength((length * i) / PATH_SAMPLES)
            const s = p.matrixTransform(ctm)
            out.push(dot(s.x - origin.left, s.y - origin.top, MIN_OBSTACLE_RADIUS))
          }
          continue
        }
      }
    }

    out.push({
      left: rect.left - origin.left, right: rect.right - origin.left,
      top: rect.top - origin.top, bottom: rect.bottom - origin.top,
    })
  }
  return out
}

/**
 * Place every label in one SVG figure.
 *
 * Returns how many labels the solver could not place. They are left at their
 * authored position — visible and reported, never hidden.
 */
export function placeSvgLabels(svg: SVGSVGElement): number {
  const scale = svgUserUnitScale(svg)
  if (scale === null) return 0
  const origin = svg.getBoundingClientRect()

  const texts = Array.from(svg.querySelectorAll('text')) as SVGTextElement[]
  if (texts.length < 2) return 0   // nothing to collide with

  const items: PlacementItem[] = []
  const kept: SVGTextElement[] = []
  const applied: { dx: number; dy: number }[] = []
  for (const t of texts) {
    if (!(t.textContent ?? '').trim()) continue
    const r = t.getBoundingClientRect()
    if (!r.width || !r.height) continue
    // Solve from the AUTHORED position, never from where we last put it —
    // subtracting our own displacement is what stops repeated passes from
    // walking a label across the figure. Reading it back beats clearing the
    // transform and re-measuring: clearing is a DOM write, and a pass that
    // always writes can never be recognised as settled.
    const was = readDelta(t)
    applied.push(was)
    items.push({
      text: t.textContent ?? '',
      x: r.left + r.width / 2 - origin.left - toScreenDelta(t, was.dx, was.dy, scale).dx,
      y: r.top + r.height / 2 - origin.top - toScreenDelta(t, was.dx, was.dy, scale).dy,
      halfW: r.width / 2,
      halfH: r.height / 2,
    })
    kept.push(t)
  }
  if (items.length < 2) return 0

  const { labels, unresolved } = solveLabelPlacement(
    items,
    obstaclesFor(svg, origin),
    { width: origin.width, height: origin.height },
  )

  for (const [i, placed] of labels.entries()) {
    // Screen px back into the element's own units.
    const { dx, dy } = placed.ok
      ? toLocalDelta(kept[i], placed.x - placed.anchorX, placed.y - placed.anchorY, scale)
      : { dx: 0, dy: 0 }
    const was = applied[i]
    // WRITE ONLY WHAT CHANGED. A settled figure must produce zero DOM writes,
    // or the watcher that schedules this pass is woken by the pass itself and
    // the two never stop. Measured before this rule: the figure was solved
    // correctly and then never re-solved after a late font swap, because the
    // real change had been swallowed by our own noise.
    if (Math.abs(dx - was.dx) < WRITE_EPSILON && Math.abs(dy - was.dy) < WRITE_EPSILON) continue
    applyDelta(kept[i], dx, dy)
  }

  return unresolved
}
