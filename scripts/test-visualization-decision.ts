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
  tier: 'YES' | 'NO' | 'AMBIGUOUS' | 'MESSY'
  text: string
  expectShouldVisualize: boolean
  expectCategory?: VisualCategory // only asserted for clear tiers; ambiguous/messy = gate only
  /** Documented v1 limitation: pure regex cannot resolve this; deferred to the future LLM tie-breaker. */
  knownLimitation?: boolean
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

  // ── Tier 4: MESSY real-world scenarios (gate asserted to the CORRECT answer;
  // adversarial cases will show ✗ when the regex is genuinely fooled — those
  // failures are the point, not hidden) ──
  {
    tier: 'MESSY', expectShouldVisualize: true,
    note: 'Hinglish (romanized Hindi) process — tests English-only keyword coverage',
    text: 'Photosynthesis stages mein hota hai. Pehle light chlorophyll par padti hai. Then paani hydrogen aur oxygen mein split hota hai. Next hydrogen carbon dioxide ke saath milta hai. Finally glucose banta hai aur oxygen release hoti hai.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: true,
    note: 'two distinct concepts in one long message — which category wins?',
    text: 'Let us cover two things. First, an animal cell is made up of a nucleus in the center, surrounded by cytoplasm with a membrane forming the boundary. Separately, when you throw a ball it follows a curved path: it rises, slows at the top, then accelerates back down as gravity acts on it.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: false, knownLimitation: true,
    note: 'KNOWN LIMITATION — references an ALREADY-shown visual; stateless text layer cannot know this (needs Part 2 session state)',
    text: 'Remember the diagram I showed you before, with the nucleus sitting in the center surrounded by cytoplasm? That same structure is what we are building on today, so keep it in mind.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: false, knownLimitation: true,
    note: 'KNOWN LIMITATION — "versus" as a proper-noun (court case), not a comparison (needs LLM tie-breaker)',
    text: 'Today we are going to look at the famous court case Roe versus Wade, and talk about what it established about legal precedent in the years that followed it afterward.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: false,
    note: 'ADVERSARIAL — "first… then" used conversationally, not as a real process',
    text: 'First of all, that is a really thoughtful question and I am glad you asked it. Then again, plenty of students wonder the exact same thing, so you are absolutely not alone here at all.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: false, knownLimitation: true,
    note: 'KNOWN LIMITATION — "as X increases Y increases" about feelings, not a quantitative plot (needs LLM tie-breaker)',
    text: 'As students get more comfortable with the material, their confidence increases and their motivation increases too, which makes the whole subject feel a lot less intimidating over the weeks.',
  },
  {
    tier: 'MESSY', expectShouldVisualize: false,
    note: 'ADVERSARIAL — "faster than / lower than" comparison words in an encouragement, not a teachable contrast',
    text: 'You are picking this up faster than you give yourself credit for, and your stress about it is much lower than it was last week, so honestly just keep going the way you are.',
  },
]

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

let pass = 0
let fail = 0
let knownTotal = 0
const observed: string[] = []

console.log('\n=== Teaching Visualization Engine — PART 1 decision harness ===\n')

for (const c of CASES) {
  const d = decideVisualization(c.text)
  const gateOk = d.shouldVisualize === c.expectShouldVisualize
  const catOk = c.expectCategory == null || d.category === c.expectCategory
  const ok = gateOk && catOk

  const observeOnly = c.tier === 'AMBIGUOUS' || c.tier === 'MESSY'
  let known = 0
  if (observeOnly) {
    // Ambiguous/messy cases only assert the gate (visualize-or-not), never a specific category.
    if (c.knownLimitation) {
      known++
      observed.push(`  [LIMIT    ] ${pad(c.note, 96)} → ${pad(d.category, 11)} conf=${d.confidence} ${gateOk ? '(now handled)' : '(documented gap)'}`)
    } else if (gateOk) {
      pass++
      observed.push(`  [${pad(c.tier, 9)}] ${pad(c.note, 96)} → ${pad(d.category, 11)} conf=${d.confidence}`)
    } else {
      fail++
      observed.push(`  [${pad(c.tier, 9)}] ${pad(c.note, 96)} → ${pad(d.category, 11)} conf=${d.confidence} ✗ gate miss`)
    }
  } else {
    if (ok) pass++; else fail++
  }
  knownTotal += known

  const status = c.knownLimitation ? '⚠ known' : observeOnly ? (gateOk ? '◇ obs' : '✗ FAIL') : ok ? '✓ pass' : '✗ FAIL'
  console.log(`[${pad(c.tier, 9)}] ${status}`)
  console.log(`  text:      ${c.text.slice(0, 96)}${c.text.length > 96 ? '…' : ''}`)
  console.log(`  expect:    shouldVisualize=${c.expectShouldVisualize}${c.expectCategory ? ` category=${c.expectCategory}` : ''}`)
  console.log(`  decision:  shouldVisualize=${d.shouldVisualize} category=${d.category} confidence=${d.confidence}`)
  console.log(`  reasoning: ${d.reasoning}`)
  console.log('')
}

console.log('=== Ambiguous + messy landings (gate asserted, category observed) ===')
for (const line of observed) console.log(line)

console.log(`\n=== ${pass} passed, ${fail} failed, ${knownTotal} documented-limitation (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
