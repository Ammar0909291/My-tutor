/**
 * Standalone test harness for parseWorkedExampleTag — the [WE:...] progress-tag
 * parser in workedExamples.ts. Pure, no DB/network.
 * Run with:  npx tsx scripts/test-worked-example-tag.ts
 *
 * Focus: the strip-exact-tag fix. The cleanText must strip the SAME tag that was
 * parsed (match[0]), never a different earlier malformed [WE:...] bracket, so the
 * real progress tag is never left visible to the student.
 */

import { parseWorkedExampleTag } from '../src/lib/school/tutoring/workedExamples'

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== parseWorkedExampleTag harness ===\n')

// Done tag.
const d = parseWorkedExampleTag('Great work, you solved it! [WE:done]')
check('done tag → done:true, no state', d.done === true && d.state === null)
check('done tag stripped from cleanText', !d.cleanText.includes('[WE:'))

// Standard progress tag.
const p = parseWorkedExampleTag("Let's start. [WE: percentages | 2 | 5]")
check('progress tag parsed concept', p.state?.concept === 'percentages')
check('progress tag parsed steps', p.state?.currentStep === 2 && p.state?.stepCount === 5)
check('progress tag stripped from cleanText', !p.cleanText.includes('[WE:'))
check('progress cleanText keeps prose', p.cleanText === "Let's start.")

// REGRESSION — two brackets, the first NOT a valid progress tag. The valid tag
// must be the one stripped; nothing of the form [WE:...] should remain visible.
const two = parseWorkedExampleTag('See [WE: note only] then [WE: algebra | 1 | 3] continue')
check('two-tag — parses the VALID progress tag', two.state?.concept === 'algebra' && two.state?.currentStep === 1 && two.state?.stepCount === 3)
check('two-tag — the real progress tag is stripped (not left visible)', !two.cleanText.includes('[WE: algebra'))

// No tag.
const none = parseWorkedExampleTag('Just a normal sentence.')
check('no tag → null state, unchanged text', none.state === null && none.done === false && none.cleanText === 'Just a normal sentence.')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
