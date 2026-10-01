/**
 * The graph renderer's opening view, as a pure function, so the server can ask
 * the question the learner asks first: is anything drawn where I am looking?
 *
 * MEASURED 2026-09-30 (learner baseline, C2, chem.equil.le-chatelier): a
 * generated "ln K vs 1/T" graph of `-5000 * (1/x) + 10` opened on −5…5. Every
 * value it takes there is beyond ±1000, so the learner saw empty axes — and the
 * tutor described "the curve you see" four times while they said there was no
 * line. Pan/zoom exists, but a figure that needs the learner to go and find its
 * curve is not a figure.
 */
import { compileExpression } from './mathParser'

export const GRAPH_MIN_PPU = 4
export const GRAPH_MAX_PPU = 400
/** The renderer's height-to-width ratio (GraphRenderer's ResizeObserver). */
export const GRAPH_ASPECT = 0.72

export interface GraphView { cx: number; cy: number; ppu: number }

/** Centred on the domain's midpoint (x) and the origin (y), domain-fitted. */
export function initialGraphView(domain: readonly [number, number] | undefined): GraphView {
  const [d0, d1] = domain ?? [-10, 10]
  const span = Math.max(2, Math.abs(d1 - d0))
  return { cx: (d0 + d1) / 2, cy: 0, ppu: Math.max(GRAPH_MIN_PPU, Math.min(GRAPH_MAX_PPU, 360 / span)) }
}

/**
 * Share of the opening view's x-samples whose value is drawn inside the
 * opening view. 0 means empty axes; null means the equation does not compile
 * (the renderer draws nothing either way, and other checks own that case).
 */
export function visibleCurveFraction(
  equation: string,
  domain: readonly [number, number] | undefined,
  widthPx = 360,
): number | null {
  const compiled = compileExpression(equation)
  if (!compiled) return null
  const view = initialGraphView(domain)
  const halfW = widthPx / 2 / view.ppu
  const halfH = (widthPx * GRAPH_ASPECT) / 2 / view.ppu
  const N = 200
  let visible = 0
  for (let i = 0; i <= N; i++) {
    const x = view.cx - halfW + (2 * halfW * i) / N
    const y = compiled.eval(x)
    if (Number.isFinite(y) && Math.abs(y - view.cy) <= halfH) visible++
  }
  return visible / (N + 1)
}
