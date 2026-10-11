/**
 * A-2 graph-figure false positives (production d10f8a09, 2026-10-11, other
 * learners' traffic): accurate descriptions of real graphs were removed
 * because the figure evidence carried only written labels — nothing said the
 * figure HAS axes, a curve or a grid.
 *  - math.arith.square-roots: stored graph spec (production visual_assets,
 *    read-only) — GraphRenderer draws grid, both axes, tick numbers, axis
 *    names, the curve, the title and the equation.
 *  - phys.mech.stress-strain: authored scene — two axis arrows from one
 *    origin, a straight "slope = E" segment, a plotted curve, marked points.
 * Strings below are the removed sentences exactly as the production log
 * recorded them (cut at 160 characters by the log).
 */
import { describe, it, expect } from 'vitest'
import { evidenceFromPayload, checkFigureClaims, evidenceForLog, figureEvidenceAnswer, type FigureEvidence } from '@/lib/teaching/figureReference'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const ev = (payload: unknown): FigureEvidence => evidenceFromPayload(payload as never, describeVisualPayload as never)
const kept = (t: string, e: FigureEvidence) => expect(checkFigureClaims(t, e).removed, t).toEqual([])
const removed = (t: string, e: FigureEvidence) => expect(checkFigureClaims(t, e).removed, t).toHaveLength(1)

/** production visual_assets 56edb6fc-… (math.arith.square-roots), specPayload verbatim. */
const SQRT = { renderer: 'spec', visualSpec: { type: 'graph', title: 'Square root function', xLabel: 'x (unitless)', yLabel: '√x (unitless)', equation: 'x^0.5' } }
const SQRT_EV = ev(SQRT)
const STRESS = (resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.mech.stress-strain', learnerRequest: 'diagram', subject: 'physics' } as never) as { payload: unknown }).payload
const STRESS_EV = ev(STRESS)

/** Removed in production (3 log events, 8:24:53–8:25:41 UTC on dpl_6CxuUEHXwRAcQM67sw1DuYEDfbtP). */
const SQRT_REMOVED = [
  'Look at the curve on the figure; it is the graph of the function \\(y = \\sqrt{x}\\).',
  'For each \\(x\\) on the horizontal axis, the point on the curve tells you the non‑negative number \\(y\\) that, when multiplied by itself, gives back that \\(x\\).',
  'In other words, the curve records the unique non‑negative number \\(y\\) such that \\(y^{2}=x\\).',
  'Find the point on the curve where the horizontal coordinate is 9.',
  'If the number under the root isn’t a perfect square, the curve still tells us the exact value, even though it isn’t an integer.',
  'Look at the curve on your screen and focus on the point where the horizontal axis (the x‑axis) reads **4**.',
  'At that spot the curve rises to a height of **2** on the vertical axis (the y‑axis).',
  '- The horizontal line is the **x‑axis**; it marks the input numbers (the numbers we are taking the square root of).',
  '- The vertical line is the **y‑axis**; it marks the output numbers (the square‑root values).',
  'As you move rightward along the x‑axis, the y‑value on the curve tells you the square‑root of that x‑value.',
  '- The grid behind the curve just helps you see where points lie.',
]
/** Removed in production (2 log events, 00:30:21 and 00:30:52 UTC). */
const STRESS_REMOVED = [
  '- **“stress F/A”** (top left) – this arrow points to the vertical axis; it tells us that the upward y value on the graph is the force applied divided by the cro',
  '- **“strain ΔL/L”** (bottom right) – this arrow points to the horizontal axis; it shows that the x value is the change in length divided by the original length ',
  '- **Blue line labeled “slope = E”** – the straight, initial part of the curve.',
  '- **Purple marker “elastic limit”** (left side of the curve) – the point where the straight line ends; up to this stress the material returns to its original le',
  '- **Red curve labeled “plastic”** (upper part of the graph) – beyond the elastic limit the material deforms permanently; the stress keeps rising while strain in',
  'This calculation shows why the “stress = force / area” label on the top left of the graph matters: the same force produces different stresses when the area chan',
]

describe('Evidence describes what a graph DRAWS, from the renderer — nothing invented', () => {
  it('graph spec: axes, grid, tick numbers, the curve and the equation; labels as rendered', () => {
    const drawn = SQRT_EV.text.find((t) => t.startsWith('drawn: '))!
    for (const w of ['x-axis', 'y-axis', 'horizontal axis', 'vertical axis', 'grid', 'curve', 'tick numbers']) expect(drawn).toContain(w)
    expect(SQRT_EV.text).toEqual(expect.arrayContaining(['x (unitless)', '√x (unitless)', 'x^0.5', 'Square root function']))
    expect(drawn).not.toMatch(/slope|bar|point/)
  })
  it('graph spec on a count axis draws points, not a curve (as GraphRenderer does)', () => {
    const count = ev({ renderer: 'spec', visualSpec: { type: 'graph', title: 'Sum of first n terms', xLabel: 'n (number of terms)', yLabel: 'S_n', equation: 'x^2+2x' } })
    const drawn = count.text.find((t) => t.startsWith('drawn: '))!
    expect(drawn).toContain('plotted points')
    expect(drawn).not.toContain('curve')
  })
  it('scene: two arrows from one origin (one horizontal, one vertical) are axes; a bent path is a curve', () => {
    const drawn = STRESS_EV.text.find((t) => t.startsWith('drawn: '))!
    for (const w of ['axes', 'x-axis', 'vertical axis', 'curve', 'straight line', 'marked point']) expect(drawn).toContain(w)
  })
  it('scene: arrows that do not share an origin, or a straight two-point path, are not axes or a curve', () => {
    const e = ev({ renderer: 'scene', sceneSpec: { title: 'T', steps: [{ narration: 'n', objects: [
      { type: 'arrow', from: [0, 0, 0], to: [3, 0, 0] }, { type: 'arrow', from: [5, 1, 0], to: [5, 4, 0] }, { type: 'path', points: [[0, 0, 0], [0, -1.2, 0]] }] }] } })
    const drawn = e.text.find((t) => t.startsWith('drawn: '))!
    expect(drawn).not.toMatch(/axis|axes|curve/)
    expect(drawn).toContain('line')
  })
})

describe('Case A — square-roots graph (production false positives)', () => {
  it('every sentence production removed is kept', () => { for (const t of SQRT_REMOVED) kept(t, SQRT_EV) })
  it('varied wording for the axes is kept', () => {
    kept('On the graph, the x axis (the horizontal one) runs along the bottom and the y axis goes up the left.', SQRT_EV)
    kept('The axes on the graph are labelled **“x (unitless)”** and **“√x (unitless)”**.', SQRT_EV)
  })
  it('NEGATIVE: an invented axis label, a slope label and bars the graph does not draw are removed', () => {
    removed('The x-axis on the graph is labelled **“time (s)”**.', SQRT_EV)
    removed('The slope of the curve on the figure is labelled **“slope = 1/2”**.', SQRT_EV)
    removed('The bars on the graph show how big each square root is.', SQRT_EV)
  })
})

describe('Case B — stress-strain graph (production false positives)', () => {
  it('every sentence production removed is kept', () => { for (const t of STRESS_REMOVED) kept(t, STRESS_EV) })
  it('the slope meaning the figure states (Young\'s modulus) is kept', () => {
    kept('On the graph, the slope of the straight line is Young\'s modulus, the stiffness E.', STRESS_EV)
    kept('The blue line on the graph is labelled **“slope = E”**.', STRESS_EV)
  })
  it('NEGATIVE: a slope meaning the figure does not state is removed', () => {
    removed('On the graph, the slope of the curve shows the breaking stress of the wire.', STRESS_EV)
    removed('In the figure, the slope of the plastic curve represents the yield strength.', STRESS_EV)
  })
  it('NEGATIVE: invented labels and a paraphrase whose words are not on the figure are removed', () => {
    removed('The plastic curve on the graph is labelled **“yield strength”**.', STRESS_EV)
    removed('This is why the “force = mass × acceleration” label on the graph matters.', STRESS_EV)
  })
  it('multi-stage: a label drawn only in stage 2 ("elastic limit") is evidence; one drawn in no stage is not', () => {
    kept('On the graph, the purple point labelled **“elastic limit”** marks where the straight line ends.', STRESS_EV)
    removed('On the graph, the purple point labelled **“yield point”** marks where the straight line ends.', STRESS_EV)
  })
})

describe('Strictness preserved', () => {
  it('a figure with no evidence supports no curve, axis or label', () => {
    const none: FigureEvidence = { caption: null, text: [] }
    removed('Look at the curve on the figure; it rises slowly.', none)
    removed('The horizontal line is the **x‑axis** on the graph.', none)
  })
  it('a scene without axes (innate behaviour) does not support an x-axis', () => {
    const innate = (resolveVisual({ message: 'show me a diagram', lessonConceptId: 'bio.behav.innate-behavior-instinct', learnerRequest: 'diagram', subject: 'biology' } as never) as { payload: unknown }).payload
    removed('The x-axis of the figure shows time.', ev(innate))
  })
  it('regression found in this change: labels next to each other keep their text between them out of the check', () => {
    const innate = (resolveVisual({ message: 'show me a diagram', lessonConceptId: 'bio.behav.innate-behavior-instinct', learnerRequest: 'diagram', subject: 'biology' } as never) as { payload: unknown }).payload
    kept('On the left side you see **“Simple reflex”** in blue, with the example **“the knee‑jerk reflex”** written in grey.', ev(innate))
    kept('- **Top left** reads **“Simple reflex”** and the grey text underneath it says **“E.g.', ev(innate))
  })
})

// ── Production on 31bafe03 (2026-10-11, this campaign's disposable accounts) ──
/** Removed on 31bafe03 (logged sentences); square roots used the STORED (rendered-log) evidence. */
const SQRT_REMOVED_31B = [
  'When you look at the picture, follow a point straight up from the x‑axis to the curve, then straight left to the y‑axis; the y‑value you read is the side length',
  'The horizontal axis is labeled **x** (the number whose root we want) and the vertical axis is labeled **y**.',
  'The horizontal line is the **x‑axis**; it represents the numbers we put into the square‑root operation (the “radicand”).',
  'The vertical line is the **y‑axis**; it shows the result we get after taking the square root.',
  'Take a look at the picture: the horizontal line (the x‑axis) represents the number you’re taking the square root of, and the vertical line (the y‑axis) shows th',
  'The graph you see has the horizontal axis (the **x‑axis**) representing the number you start with, x.',
  'The vertical axis (the **y‑axis**) shows the value of the square‑root of that number, √x.',
  'The horizontal line at the bottom is the **x‑axis**; it represents the input numbers x that we might want to take a square root of.',
  'The vertical line on the left is the **y‑axis**; it shows the output values √x, the square‑root of each x.',
]
const STRESS_REMOVED_31B = [
  '- **“stress F/A”** (top left) – the vertical axis shows tensile stress, which is the pulling force F divided by the cross‑sectional area A of the material.',
  'Now look at the figure on your screen: the top‑left label “stress F / A” tells you that stress is the applied force divided by the cross‑sectional area, while t',
  'The straight blue line in the graph has the label “slope = E”; this slope is exactly the ratio of stress to strain, which is why E stays the same for any piece ',
  '- The **grey arrows** show the two quantities we are plotting: on the horizontal axis you see “strain ΔL/L” (the fractional change in length), and on the vertic',
  '- Starting from the origin, the **blue straight line** has the label “slope = E”.',
  '- **“stress F/A”** at the top left – this is the vertical axis, representing stress, which is the force divided by the cross‑sectional area.',
]

describe('31bafe03 production follow-up', () => {
  it('root cause: the stored (rendered-log) copy kept "drawn: …" cut at 120 characters, losing "x-axis, y-axis"', () => {
    const drawn = SQRT_EV.text.find((t) => t.startsWith('drawn: '))!
    expect(drawn.length).toBeGreaterThan(120)
    expect(drawn.slice(0, 120)).not.toContain('y-axis') // what production stored before
    const logged = evidenceForLog(SQRT_EV)
    expect(logged.text.find((t) => t.startsWith('drawn: '))).toBe(drawn)
    // other entries are still capped
    const long = evidenceForLog({ caption: null, text: ['x'.repeat(300), drawn] })
    expect(long.text[0]).toHaveLength(120)
  })
  it('square roots: every sentence removed on 31bafe03 is kept against the STORED evidence', () => {
    const stored = evidenceForLog(SQRT_EV)
    for (const t of SQRT_REMOVED_31B) kept(t, stored)
  })
  it('stress-strain: every sentence removed on 31bafe03 is kept (stored and this-response evidence)', () => {
    for (const t of STRESS_REMOVED_31B) { kept(t, STRESS_EV); kept(t, evidenceForLog(STRESS_EV)) }
  })
  it('the picture answer never reads the "drawn: …" list out as words written on the figure', () => {
    const a = figureEvidenceAnswer(evidenceForLog(SQRT_EV), null, 'earlier', null)
    expect(a).not.toMatch(/drawn:/)
    expect(a).toContain('“x (unitless)”')
    expect(a).toContain('“√x (unitless)”')
  })
  it('NEGATIVE: wording words do not let an unsupported slope meaning through', () => {
    removed('On the graph, the slope is exactly the breaking stress of the wire.', STRESS_EV)
    removed('In the figure, the slope is simply the ratio of length to time.', STRESS_EV)
  })
  it('NEGATIVE: spacing normalisation does not accept a different label', () => {
    removed('The top-left label on the graph reads “stress F × A”.'.replace('reads', 'is labelled'), STRESS_EV)
  })
  it('NEGATIVE: a one-letter bold axis name does not shield an invented label beside it', () => {
    removed('The horizontal axis is labeled **x** and the vertical axis is labeled **“growth rate”**.', SQRT_EV)
  })
})

// ── Production on 16888708 (2026-10-11) ─────────────────────────────────────
const SUPER = (resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.mod.superconductivity', learnerRequest: 'diagram', subject: 'physics' } as never) as { payload: unknown }).payload
const SUPER_EV = ev(SUPER)

describe('16888708 production follow-up', () => {
  it('phys.mod.superconductivity (other learners\' traffic): the label written with any subscript notation is kept', () => {
    expect(SUPER_EV.text).toContain('R = 0 below T_c = 7.2 K')
    for (const t of [
      'The red line labeled **“R = 0 below T(c) = 7.2 K”** tells us that once the temperature drops below the critical temperature 7.2 kelvin, the resistance suddenly ',
      'At **4 kelvin** (well below \\(T_c\\)) the figure’s label “R = 0 below \\(T_c\\)= 7.2 K” tells us the electrical resistance of the lead loop is exactly zero.',
      'For example, in the figure the red label reads “R = 0 below T₍c₎ = 7.2 K”, showing that once the temperature drops to that point the resistance drops abruptly t',
      'This part of the figure shows the magnetic‑field behavior.',
    ]) kept(t, SUPER_EV)
  })
  it('NEGATIVE: subscript normalisation does not accept a different value or symbol', () => {
    removed('The red line on the figure is labeled “R = 0 below T(c) = 9.2 K”.', SUPER_EV)
    removed('The red line on the figure is labeled “R = 0 below T(m) = 7.2 K”.', SUPER_EV)
  })
  it('NEGATIVE: bold emphasis beside a quoted label does not let a wrong quoted label through', () => {
    removed('At **4 kelvin** the figure’s label “R = 1 above T_c” tells us the resistance is high.', SUPER_EV)
  })
  it('stress-strain page (16888708): an invented role for the axis arrows is removed; the accurate one is kept', () => {
    removed('- Grey arrows run along the curve to show the direction of increasing load.', STRESS_EV)
    kept('- The **grey arrows** show the two quantities we are plotting: on the horizontal axis you see “strain ΔL/L” (the fractional change in length), and on the vertic', STRESS_EV)
  })
})
