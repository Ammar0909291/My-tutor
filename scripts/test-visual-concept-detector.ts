/**
 * Standalone test harness for detectVisualConcept (visualConceptDetector.ts),
 * the live concept detector behind planVisualTeaching (the 2D visual path that
 * runs on EVERY chat turn, with no subject gate). Pure, no DB/network.
 * Run with:  npx tsx scripts/test-visual-concept-detector.ts
 *
 * Focus: the "compare"/"comparison" over-broad-keyword fix. These cues are
 * common across history/English/science prose and must NOT render a number line
 * just because a stray small number is present — they only count when a negative
 * number signals genuine signed-integer comparison.
 */

import { detectVisualConcept } from '../src/lib/visuals/visualConceptDetector'

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== detectVisualConcept harness ===\n')

const kindOf = (s: string) => detectVisualConcept(s)?.kind ?? null

// REGRESSION — cross-subject false positives that must NO LONGER fire a number line.
check('history "compare the 2 causes of the 1857 revolt" → no number line',
  kindOf('Compare the 2 main causes of the 1857 revolt and the 3 reforms that followed.') === null)
check('English grammar "compare these 2 sentences" → no number line',
  kindOf('Let us compare these 2 sentences and identify the verb.') === null)
check('English lit "we compared 4 poems" → no number line',
  kindOf('We compared 4 different poems in this chapter.') === null)

// Genuine number-line cases must STILL fire.
check('"compare -5 and 3 on the number line" still fires (number line keyword)',
  kindOf('Compare -5 and 3 on the number line.') === 'number_line')
check('"plot the integers -2 and 4 and compare" still fires (integer keyword)',
  kindOf('Plot the integers -2 and 4 and compare them.') === 'number_line')
check('"compare -5 and 3" (negative present, no other keyword) still fires via signed cue',
  kindOf('Compare -5 and 3.') === 'number_line')

// Unrelated branches unaffected.
check('equation still detected as graph',
  kindOf('Plot y = 2x + 1 on the coordinate plane.') === 'graph')
check('photosynthesis still detected as process flow',
  kindOf('Let me explain photosynthesis step by step.') === 'process_flow')
check('triangle + area still detected',
  kindOf('Find the area of a triangle with base 6 and height 4.') === 'triangle')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
