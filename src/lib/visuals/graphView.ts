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

/**
 * Centred on the domain's midpoint (x) and the origin (y), domain-fitted. When the EQUATION is given and that origin-centred view would clip the curve
 * (some sample over the domain falls outside it) AND the curve stays strictly on one side of zero, the view is fitted to the curve's own range instead.
 *
 * CHEMISTRY LEARNER RUN, 2026-10-14 (deployed app, `chem.state.gas-laws`): "Boyle's Law" P = 10/x on 1…10 opened centred on y = 0 at 33 px per unit — the
 * curve left the top of the frame at x = 2.5 (the high-pressure end, the whole point of the law, was out of sight) while half the plot below zero (tick "−2 atm")
 * was empty. A curve that already fits is returned EXACTLY as before, so every graph that was fine keeps its opening view.
 * The robust range ignores the extreme 3 % at each end so a vertical asymptote cannot flatten the whole curve; the scale never goes above the
 * domain-fitted one (the x domain stays visible) and never below `GRAPH_MIN_PPU`.
 */
export function initialGraphView(domain: readonly [number, number] | undefined, equation?: string, frameHeightPx: number = 360 * GRAPH_ASPECT, frameWidthPx: number = 360): GraphView {
  const [d0, d1] = domain ?? [-10, 10]
  const span = Math.max(2, Math.abs(d1 - d0))
  const base: GraphView = { cx: (d0 + d1) / 2, cy: 0, ppu: Math.max(GRAPH_MIN_PPU, Math.min(GRAPH_MAX_PPU, 360 / span)) }
  if (!equation) return base
  const compiled = compileExpression(equation)
  if (!compiled) return base
  const N = 120
  const ys: number[] = []
  for (let i = 0; i <= N; i++) {
    const y = compiled.eval(d0 + ((d1 - d0) * i) / N)
    if (Number.isFinite(y)) ys.push(y)
  }
  if (ys.length < 8) return base
  const heightPx = frameHeightPx
  const halfH = (360 * GRAPH_ASPECT) / 2 / base.ppu
  if (ys.every((y) => Math.abs(y - base.cy) <= halfH)) return base   // the whole curve is already in view
  ys.sort((a, b) => a - b)
  // Only a curve that stays STRICTLY on one side of zero (pressure, concentration, rate, a decay) is re-fitted: for it the origin-centred view wastes half the plot and
  // clips the other half. A curve that crosses or touches zero (y = x, x², sin) simply runs off the frame, which is how a function graph reads, and keeps its view.
  if (!(ys[0] > 0 || ys[ys.length - 1] < 0)) return base
  // Each side keeps its TRUE extreme unless a spike (a vertical asymptote) sits far beyond the rest of the curve; then the 3 % trimmed value is used.
  const trimLo = ys[Math.floor(0.03 * (ys.length - 1))]
  const trimHi = ys[Math.ceil(0.97 * (ys.length - 1))]
  const core = trimHi - trimLo
  const lo = trimLo - ys[0] > 0.5 * core ? trimLo : ys[0]
  const hi = ys[ys.length - 1] - trimHi > 0.5 * core ? trimHi : ys[ys.length - 1]
  let range = hi - lo
  if (!(range > 0)) return base
  // A quantity that stays on one side of zero and close to it (pressure, concentration, rate) is drawn FROM zero, so the empty far side of the axis is not shown.
  const zeroFrom = lo > 0 && lo < 0.5 * range ? 0 : lo
  const zeroTo = hi < 0 && -hi < 0.5 * range ? 0 : hi
  range = zeroTo - zeroFrom
  const loV = zeroFrom
  // Room above the curve for the y-axis title and BELOW it for the x-axis and its tick numerals (the zoom buttons, bottom-right, are an obstacle to the label solver).
  const TOP_PX = 34, BOTTOM_PX = 30
  const ppu = Math.max(GRAPH_MIN_PPU, Math.min(base.ppu, (heightPx - TOP_PX - BOTTOM_PX) / range))
  // Zooming out to fit the height widens the x extent past the domain, and the renderer draws the curve across the WHOLE visible x range: for a quantity whose domain
  // starts at or above zero (volume, time, concentration) that exposes the unphysical other branch (V < 0 of P = 10/V — seen on the deployed app after the first version of
  // this fit). So the left edge stays at the domain's start (less a small margin) and the extra width goes to the right.
  const cx = d0 >= 0 ? d0 - 0.08 * (d1 - d0) + frameWidthPx / 2 / ppu : base.cx
  return { cx, cy: loV + (heightPx / 2 - BOTTOM_PX) / ppu, ppu }
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
  // The ADMISSION check deliberately measures the origin-centred opening view (no equation): the renderer's equation-fitted view (`initialGraphView(domain, equation, h)`) only
  // ever shows MORE of a curve than this one, so a curve visible here is visible there and one empty here stays refused (generatedGraphMustShowItsCurve.test.ts).
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
