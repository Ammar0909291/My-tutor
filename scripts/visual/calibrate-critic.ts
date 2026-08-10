/**
 * Measure the critic against figures whose correct verdict is already known.
 *
 * A judge nobody has graded is not a safety gate, it is a rubber stamp with an
 * extra API call. Every figure below was read by a human and given its verdict
 * BEFORE the critic ever ran on it.
 *
 * The corpus began as six figures from the first real cohort. It is now thirty,
 * because six cases cannot separate a safe judge from a lucky one — and one of
 * those six had already been shown to be optimistic: `cs.prog.python-basics`
 * passed a figure a human rejected, because it drew interpreter internals for a
 * concept about calling print() and input(). That case is included here, with
 * the verdict the human gave it.
 *
 * WHAT THE CASES COVER, deliberately rather than incidentally:
 *   · order asserted where none exists      (a classification drawn as a process)
 *   · a real order, correctly drawn         (must survive — the recall side)
 *   · a right-shaped figure of the WRONG concept
 *   · a figure that is true but teaches nothing
 *   · notation these renderers print rather than typeset
 *   · figures that cannot render at all
 *   · scope drift: the concept's neighbours drawn instead of the concept
 *
 * The score that matters is NOT accuracy. It is whether any KNOWN-BAD figure is
 * promoted, because that is the only error that reaches a learner.
 *
 *   npx tsx scripts/visual/calibrate-critic.ts
 */

import { criticiseFigure, describeCritique } from '../../src/lib/teaching/visual/figureCritic'
import { getKGNode } from '../../src/lib/curriculum/knowledgeGraph'
import type { GeneratedFigure } from '../../src/lib/teaching/visual/visualEngine'

interface Case {
  conceptId: string
  figure: GeneratedFigure
  /** What a careful human said, before the critic ever ran. */
  expected: 'reject' | 'promote'
  why: string
}

const spec = (s: unknown): GeneratedFigure => ({ kind: 'spec', spec: s as never })

const CASES: Case[] = [
  {
    conceptId: 'phys.meas.units',
    expected: 'reject',
    why: 'the seven SI base units do not happen in an order',
    figure: spec({ type: 'process_flow', title: 'SI Base Units', steps: [
      { title: 'Meter (m)' }, { title: 'Kilogram (kg)' }, { title: 'Second (s)' },
      { title: 'Ampere (A)' }, { title: 'Kelvin (K)' }, { title: 'Mole (mol)' },
      { title: 'Candela (cd)' }] }),
  },
  {
    conceptId: 'chem.found.matter',
    expected: 'reject',
    why: 'a classification drawn as a sequence — mixtures do not become elements',
    figure: spec({ type: 'process_flow', title: 'Classification of Matter', steps: [
      { title: 'Matter' }, { title: 'Pure Substances & Mixtures' }, { title: 'Elements & Compounds' }] }),
  },
  {
    conceptId: 'bio.found.characteristics-of-life',
    expected: 'reject',
    why: 'properties that coexist, drawn as steps that follow one another',
    figure: spec({ type: 'process_flow', title: 'Characteristics of Living Organisms', steps: [
      { title: 'Cellular Organisation' }, { title: 'Metabolism' }, { title: 'Homeostasis' },
      { title: 'Growth & Reproduction' }, { title: 'Response & Evolution' }] }),
  },
  {
    conceptId: 'phys.mech.kinetic-energy',
    expected: 'promote',
    why: 'KE against v really is a parabola, and the parabola IS the teaching point',
    figure: spec({ type: 'graph', equation: '0.5 * x^2', title: 'Kinetic Energy as a Function of Velocity (m = 1 kg)' }),
  },
  {
    conceptId: 'math.func.linear-function',
    expected: 'promote',
    why: 'a straight line is what a linear function is',
    figure: spec({ type: 'graph', equation: '2x + 1', title: 'Linear Function f(x) = 2x + 1' }),
  },
  {
    conceptId: 'math.found.mathematical-thinking',
    expected: 'promote',
    why: 'observe -> conjecture -> prove is a real order',
    figure: spec({ type: 'process_flow', title: 'Steps of Mathematical Thinking', steps: [
      { title: 'Observe & Gather' }, { title: 'Identify Patterns' }, { title: 'Formulate Conjectures' },
      { title: 'Construct Arguments' }, { title: 'Prove & Generalize' }] }),
  },
  // ── ORDER ASSERTED WHERE THERE IS NONE ────────────────────────────────────
  {
    conceptId: 'math.found.set-operations',
    expected: 'reject',
    why: 'union, intersection and difference are operations, not stages of one procedure',
    figure: spec({ type: 'process_flow', title: 'Set Operations', steps: [
      { title: 'Union' }, { title: 'Intersection' }, { title: 'Difference' }, { title: 'Complement' }] }),
  },
  {
    conceptId: 'chem.period.modern-periodic-law',
    expected: 'reject',
    why: 'the periodic table is an arrangement; drawing it as four steps invents a sequence',
    figure: spec({ type: 'process_flow', title: 'The Periodic Table', steps: [
      { title: 'Metals' }, { title: 'Metalloids' }, { title: 'Non-metals' }, { title: 'Noble Gases' }] }),
  },
  {
    conceptId: 'bio.cell.mitochondria-energy',
    expected: 'reject',
    why: 'organelles coexist inside one cell; steps say one follows another',
    figure: spec({ type: 'process_flow', title: 'Cell Organelles', steps: [
      { title: 'Nucleus' }, { title: 'Mitochondria' }, { title: 'Ribosomes' }, { title: 'Golgi Apparatus' }] }),
    // The concept is Mitochondria and Energy Organelles; a tour of every
    // organelle is the neighbours drawn instead of the concept.
  },

  // ── A REAL ORDER, CORRECTLY DRAWN — the recall side ───────────────────────
  {
    conceptId: 'math.found.proof-by-induction',
    expected: 'promote',
    why: 'base case then inductive step really is an order, and the order is the method',
    figure: spec({ type: 'process_flow', title: 'Proof by Induction', steps: [
      { title: 'Prove the base case' }, { title: 'Assume it holds for n' },
      { title: 'Prove it holds for n + 1' }, { title: 'Conclude for all n' }] }),
  },
  {
    conceptId: 'math.nt.euclidean-algorithm',
    expected: 'promote',
    why: 'an algorithm is a sequence by definition',
    figure: spec({ type: 'process_flow', title: 'The Euclidean Algorithm', steps: [
      { title: 'Divide a by b, keep the remainder' }, { title: 'Replace a with b, b with the remainder' },
      { title: 'Repeat until the remainder is 0' }, { title: 'The last non-zero remainder is the GCD' }] }),
  },

  // ── RIGHT SHAPE, WRONG CONCEPT ────────────────────────────────────────────
  {
    conceptId: 'math.func.quadratic-function',
    expected: 'reject',
    why: 'a straight line is drawn and titled as a quadratic — the figure contradicts its own concept',
    figure: spec({ type: 'graph', equation: '3x - 2', title: 'Quadratic Function' }),
  },
  {
    conceptId: 'phys.mech.newtons-first-law',
    expected: 'reject',
    why: "a figure of Newton's SECOND law offered for the first",
    figure: spec({ type: 'graph', equation: '2 * x', title: 'Force against Acceleration (m = 2 kg)' }),
  },
  {
    conceptId: 'math.arith.fractions',
    expected: 'reject',
    why: 'a number line of integers says nothing about parts of a whole',
    figure: spec({ type: 'number_line', start: 0, end: 10, highlight: [3, 7], title: 'Fractions' }),
  },

  // ── TRUE BUT TEACHES NOTHING ──────────────────────────────────────────────
  {
    conceptId: 'math.func.linear-function',
    expected: 'reject',
    why: 'y = 0 is a linear function and shows a learner nothing about slope or intercept',
    figure: spec({ type: 'graph', equation: '0', title: 'Linear Function' }),
  },
  {
    conceptId: 'math.arith.place-value',
    expected: 'reject',
    why: 'a single highlighted point carries no place-value information at all',
    figure: spec({ type: 'number_line', start: 0, end: 1, highlight: [0], title: 'Place Value' }),
  },

  // ── NOTATION THESE RENDERERS PRINT RATHER THAN TYPESET ────────────────────
  {
    conceptId: 'phys.mech.kinetic-energy',
    expected: 'reject',
    why: 'LaTeX is printed verbatim by these renderers, so the learner reads backslashes',
    figure: spec({ type: 'graph', equation: '0.5 * x^2', title: 'Kinetic Energy $E_k = \\frac{1}{2}mv^2$' }),
  },

  // ── CANNOT RENDER ─────────────────────────────────────────────────────────
  {
    conceptId: 'math.func.quadratic-function',
    expected: 'reject',
    why: 'the equation does not compile; the plot would be blank',
    figure: spec({ type: 'graph', equation: 'x^^2 +', title: 'Quadratic Function' }),
  },
  {
    conceptId: 'math.found.set-operations',
    expected: 'reject',
    why: 'a process flow with a single step is not a process',
    figure: spec({ type: 'process_flow', title: 'Set Operations', steps: [{ title: 'Combine the sets' }] }),
  },

  // ── SCOPE DRIFT — the neighbours drawn instead of the concept ─────────────
  {
    conceptId: 'cs.prog.python-basics',
    expected: 'reject',
    why: 'THE KNOWN CRITIC MISS: interpreter internals drawn for a concept about print() and input()',
    figure: spec({ type: 'process_flow', title: 'How Python Runs Your Code', steps: [
      { title: 'Source code' }, { title: 'Lexer / tokenizer' }, { title: 'Parser builds an AST' },
      { title: 'Compiler emits bytecode' }, { title: 'CPython virtual machine executes it' }] }),
  },
  {
    conceptId: 'math.arith.addition',
    expected: 'reject',
    why: 'the four operations drawn for the concept of addition alone',
    figure: spec({ type: 'process_flow', title: 'Arithmetic', steps: [
      { title: 'Addition' }, { title: 'Subtraction' }, { title: 'Multiplication' }, { title: 'Division' }] }),
  },
  {
    conceptId: 'phys.meas.units',
    expected: 'reject',
    why: 'the scientific method drawn for a concept about units of measurement',
    figure: spec({ type: 'process_flow', title: 'The Scientific Method', steps: [
      { title: 'Observe' }, { title: 'Hypothesise' }, { title: 'Experiment' }, { title: 'Conclude' }] }),
  },

  // ── FAITHFUL FIGURES THAT MUST SURVIVE ────────────────────────────────────
  {
    conceptId: 'math.func.quadratic-function',
    expected: 'promote',
    why: 'the parabola is the concept',
    figure: spec({ type: 'graph', equation: 'x^2 - 4', title: 'Quadratic Function f(x) = x^2 - 4' }),
  },
  {
    conceptId: 'math.arith.negative-numbers',
    expected: 'promote',
    why: 'a number line through zero is how negatives are taught',
    figure: spec({ type: 'number_line', start: -5, end: 5, highlight: [-3, 0, 3], title: 'Negative and Positive Numbers' }),
  },
  {
    conceptId: 'math.arith.integer-arithmetic',
    expected: 'promote',
    why: 'the interval and the marked integers are exactly what the concept covers',
    figure: spec({ type: 'number_line', start: -10, end: 10, highlight: [-7, -2, 4, 9], title: 'Integers on the Number Line' }),
  },
  {
    conceptId: 'chem.kinet.rate',
    expected: 'promote',
    why: 'concentration falling with time is the observable the concept is about',
    figure: spec({ type: 'graph', equation: '10 * 0.5^x', title: 'Reactant Concentration against Time' }),
  },
  {
    conceptId: 'math.found.direct-proof',
    expected: 'promote',
    why: 'assume, derive, conclude is the shape of the method',
    figure: spec({ type: 'process_flow', title: 'Direct Proof', steps: [
      { title: 'Assume the hypothesis' }, { title: 'Apply definitions and known results' },
      { title: 'Derive the conclusion' }] }),
  },
  {
    conceptId: 'bio.cell.mitosis',
    expected: 'promote',
    why: 'mitosis genuinely happens in this order',
    figure: spec({ type: 'process_flow', title: 'Mitosis', steps: [
      { title: 'Prophase' }, { title: 'Metaphase' }, { title: 'Anaphase' }, { title: 'Telophase' }] }),
  },
]

/** Costs nothing: a broken equation must be caught before the judge is called. */
const STATIC_CASE: Case = {
  conceptId: 'math.func.linear-function',
  expected: 'reject',
  why: 'the equation does not compile — the plot would be blank',
  figure: spec({ type: 'graph', equation: 'wobble(((', title: 'Linear Function' }),
}

async function run(c: Case) {
  const node = getKGNode(c.conceptId)
  if (!node) {
    // A case pointing at an id the curriculum does not contain measures
    // nothing. Say so and move on rather than taking the corpus down with it.
    console.log(`SKIPPED   ${c.conceptId.padEnd(36)} — not a concept in any canonical KG`)
    return null
  }
  const report = await criticiseFigure(
    c.figure,
    {
      conceptId: c.conceptId, title: node.title,
      description: node.description ?? '', prerequisites: node.prerequisites ?? [],
    },
    // NO CLOCK. This measures the JUDGE, not the network. With the live 5s
    // budget, four of twenty cases came back "unsure" because the provider was
    // slow that second — which scores the connection and calls it calibration.
    // The live path keeps its deadline; a learner is waiting there and nobody
    // is waiting here.
    { budgetMs: 0 },
  )
  const promoted = report.decision === 'promote'
  const shouldPromote = c.expected === 'promote'
  const dangerous = promoted && !shouldPromote
  const conservative = !promoted && shouldPromote
  console.log(
    `${dangerous ? 'DANGEROUS ' : conservative ? 'cautious  ' : 'agreed    '}` +
    `${c.conceptId.padEnd(36)} expected=${c.expected.padEnd(8)} ${describeCritique(report)}`,
  )
  return { dangerous, conservative, judged: report.judged, promoted, shouldPromote }
}

/**
 * `--only=<substring>` runs the matching cases alone. A judge that replied in
 * an unreadable shape did not JUDGE the case — it fell through to HOLD, which
 * is safe but is not evidence — so a single case has to be re-runnable to tell
 * a real verdict from a parse failure.
 */
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length)

async function main() {
  if (!ONLY) {
    console.log('\nSTATIC ONLY (no model call expected)')
    const s = await run(STATIC_CASE)
    console.log(`  judge called: ${s!.judged} (must be false)\n`)
  }

  console.log('JUDGED')
  const results: NonNullable<Awaited<ReturnType<typeof run>>>[] = []
  for (const c of CASES.filter((c) => !ONLY || c.conceptId.includes(ONLY))) {
    const r = await run(c)
    if (r) results.push(r)
  }

  // ── THE NUMBERS ───────────────────────────────────────────────────────────
  // Framed so that PROMOTE is the positive class, because promoting is the act
  // with a consequence: a held figure costs a learner a picture, a promoted one
  // can teach them something false.
  const truePositive = results.filter((r) => r.promoted && r.shouldPromote).length
  const falsePositive = results.filter((r) => r.dangerous).length
  const falseNegative = results.filter((r) => r.conservative).length
  const trueNegative = results.filter((r) => !r.promoted && !r.shouldPromote).length

  const precision = truePositive + falsePositive === 0 ? 1 : truePositive / (truePositive + falsePositive)
  const recall = truePositive + falseNegative === 0 ? 1 : truePositive / (truePositive + falseNegative)
  const judged = results.filter((r) => r.judged).length

  console.log(`\n${results.length} hand-judged cases · ${judged} reached the model judge · ${results.length - judged} settled by STATIC alone`)
  console.log(`  promote correctly   ${truePositive}`)
  console.log(`  reject correctly    ${trueNegative}`)
  console.log(`  cautious (good held) ${falseNegative}`)
  console.log(`  DANGEROUS (bad promoted) ${falsePositive}`)
  console.log(`\n  precision ${(precision * 100).toFixed(1)}%   recall ${(recall * 100).toFixed(1)}%`)
  console.log(falsePositive === 0
    ? '\nDANGEROUS FALSE ACCEPTS: 0 — no known-bad figure reached a learner.'
    : `\nDANGEROUS FALSE ACCEPTS: ${falsePositive} — the gate is NOT safe; do not ship this change.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
