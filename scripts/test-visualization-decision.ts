/**
 * Standalone test harness for the Teaching Visualization Engine PART 1 decision layer.
 *
 * Pure: imports ONLY the deterministic decideVisualization function. No DB, no network,
 * no production route wiring. Run with:  npx tsx scripts/test-visualization-decision.ts
 *
 * The point is not a green checkmark — it's seeing the REAL decision + reasoning on
 * realistic tutor-explanation text (clear-yes per category, clear-no, ambiguous cases)
 * BEFORE any of this is wired into a live lesson path.
 */

import { decideVisualization, type VisualCategory } from '../src/lib/teaching/visualizationDecision'

type Case = {
  tier: 'YES' | 'NO' | 'AMBIGUOUS'
  text: string
  expectShouldVisualize: boolean
  expectCategory?: VisualCategory // only asserted for clear tiers; ambiguous = observe only
  note: string
}

const CASES: Case[] = [
  // ── Tier 1: clear YES, one per category ──
  {
    tier: 'YES', expectShouldVisualize: true, expectCategory: 'simulation',
    note: 'projectile motion — dynamics over time',
    text: 'When you throw the ball at an angle, it follows a curved path: it rises, slows at the top, then accelerates back down as gravity pulls it. The horizontal speed stays constant the whole time.',
  },
  {
    tier: 'YES', expectShouldVisualize: true, expectCategory: 'process',
    note: 'photosynthesis — ordered stages',
    text: 'Photosynthesis happens in stages. First, light hits the chlorophyll. Then water splits into hydrogen and oxygen. Next, the hydrogen combines with carbon dioxide. Finally, glucose is produced and oxygen is released.',
  },
  {
    tier: 'YES', expectShouldVisualize: true, expectCategory: 'comparison',
    note: 'stack vs queue — contrast',
    text: 'A stack removes the most recently added item first, whereas a queue removes the oldest item first. So a stack is last-in-first-out, while a queue is first-in-first-out.',
  },
  {
    tier: 'YES', expectShouldVisualize: true, expectCategory: 'plot',
    note: 'reaction rate vs temperature — quantitative relationship',
    text: 'As the temperature increases, the reaction rate increases too — roughly doubling for every ten degrees. If you plotted rate against temperature you would see a steep upward curve.',
  },
  {
    tier: 'YES', expectShouldVisualize: true, expectCategory: 'diagram',
    note: 'animal cell — static spatial structure',
    text: 'An animal cell is made up of several parts: the nucleus sits in the center, surrounded by cytoplasm, with the cell membrane forming the outer boundary and mitochondria scattered throughout.',
  },

  // ── Tier 2: clear NO ──
  {
    tier: 'NO', expectShouldVisualize: false,
    note: 'short acknowledgement',
    text: "Exactly right! You've got it. Ready to move on?",
  },
  {
    tier: 'NO', expectShouldVisualize: false,
    note: 'pure definition recap, no structure',
    text: "Velocity is just speed with a direction. That's the whole idea.",
  },
  {
    tier: 'NO', expectShouldVisualize: false,
    note: 'question back to the student',
    text: 'Before we continue, can you tell me what you think happens to the pressure if we halve the volume?',
  },
  {
    tier: 'NO', expectShouldVisualize: false,
    note: 'correction',
    text: 'Not quite — you flipped the numerator and denominator. Try again with three on top.',
  },

  // ── Tier 3: deliberately AMBIGUOUS (observe decision quality) ──
  {
    tier: 'AMBIGUOUS', expectShouldVisualize: true,
    note: 'motion topic described as ordered steps — process vs simulation',
    text: 'To solve it, first find the initial velocity, then plug it into the equation, and then the object position updates each second as it falls toward the ground.',
  },
  {
    tier: 'AMBIGUOUS', expectShouldVisualize: true,
    note: 'comparison that is also quantitative — comparison vs plot',
    text: 'Copper conducts electricity far better than rubber; its resistance is thousands of times lower than an insulator.',
  },
  {
    tier: 'AMBIGUOUS', expectShouldVisualize: true,
    note: 'spatial structure with mild sequence — diagram vs process',
    text: 'The water cycle connects the ocean, the atmosphere, and the land: water evaporates up, then forms clouds, and then rains back down.',
  },
  {
    tier: 'AMBIGUOUS', expectShouldVisualize: false,
    note: 'long but NOT visualizable — length alone must not trigger a visual',
    text: 'The reason this matters historically is that it changed how people thought about evidence and proof for centuries afterward, influencing philosophers, scientists, and educators who came long after the original idea was first written down.',
  },
]

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

let pass = 0
let fail = 0
const observed: string[] = []

console.log('\n=== Teaching Visualization Engine — PART 1 decision harness ===\n')

for (const c of CASES) {
  const d = decideVisualization(c.text)
  const gateOk = d.shouldVisualize === c.expectShouldVisualize
  const catOk = c.expectCategory == null || d.category === c.expectCategory
  const ok = gateOk && catOk

  if (c.tier === 'AMBIGUOUS') {
    // Ambiguous cases only assert the gate (visualize-or-not), never a specific category.
    if (gateOk) pass++; else fail++
    observed.push(`  ${pad(c.note, 60)} → ${pad(d.category, 11)} conf=${d.confidence}`)
  } else {
    if (ok) pass++; else fail++
  }

  const status = c.tier === 'AMBIGUOUS' ? (gateOk ? '◇ obs' : '✗ FAIL') : ok ? '✓ pass' : '✗ FAIL'
  console.log(`[${pad(c.tier, 9)}] ${status}`)
  console.log(`  text:      ${c.text.slice(0, 96)}${c.text.length > 96 ? '…' : ''}`)
  console.log(`  expect:    shouldVisualize=${c.expectShouldVisualize}${c.expectCategory ? ` category=${c.expectCategory}` : ''}`)
  console.log(`  decision:  shouldVisualize=${d.shouldVisualize} category=${d.category} confidence=${d.confidence}`)
  console.log(`  reasoning: ${d.reasoning}`)
  console.log('')
}

console.log('=== Ambiguous-case category landings (no expected category asserted) ===')
for (const line of observed) console.log(line)

console.log(`\n=== ${pass} passed, ${fail} failed (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
