/**
 * Measure the critic against figures whose correct verdict is already known.
 *
 * A judge nobody has graded is not a safety gate, it is a rubber stamp with an
 * extra API call. These six figures came out of the first real cohort and were
 * read by hand: three assert an order that does not exist, two are faithful
 * graphs, one is genuinely sequential and should survive.
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
]

/** Costs nothing: a broken equation must be caught before the judge is called. */
const STATIC_CASE: Case = {
  conceptId: 'math.func.linear-function',
  expected: 'reject',
  why: 'the equation does not compile — the plot would be blank',
  figure: spec({ type: 'graph', equation: 'wobble(((', title: 'Linear Function' }),
}

async function run(c: Case) {
  const node = getKGNode(c.conceptId)!
  const report = await criticiseFigure(c.figure, {
    conceptId: c.conceptId, title: node.title,
    description: node.description ?? '', prerequisites: node.prerequisites ?? [],
  })
  const promoted = report.decision === 'promote'
  const shouldPromote = c.expected === 'promote'
  const dangerous = promoted && !shouldPromote
  const conservative = !promoted && shouldPromote
  console.log(
    `${dangerous ? 'DANGEROUS ' : conservative ? 'cautious  ' : 'agreed    '}` +
    `${c.conceptId.padEnd(36)} expected=${c.expected.padEnd(8)} ${describeCritique(report)}`,
  )
  return { dangerous, conservative, judged: report.judged }
}

async function main() {
  console.log('\nSTATIC ONLY (no model call expected)')
  const s = await run(STATIC_CASE)
  console.log(`  judge called: ${s.judged} (must be false)\n`)

  console.log('JUDGED')
  const results = []
  for (const c of CASES) results.push(await run(c))

  const dangerous = results.filter((r) => r.dangerous).length
  const cautious = results.filter((r) => r.conservative).length
  console.log(`\n${CASES.length} cases · ${dangerous} DANGEROUS (bad figure promoted) · ${cautious} cautious (good figure held)`)
  console.log(dangerous === 0
    ? 'No known-bad figure was promoted.'
    : 'A known-bad figure was promoted — the gate is not safe.')
}

main().catch((e) => { console.error(e); process.exit(1) })
