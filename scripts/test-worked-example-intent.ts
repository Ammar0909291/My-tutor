/**
 * Standalone test harness for detectWorkedExampleIntent — the interactive
 * worked-example trigger in workedExamples.ts. Pure, no DB/network.
 * Run with:  npx tsx scripts/test-worked-example-intent.ts
 *
 * Covers subject gating (STEM uses the math-pattern heuristic, English/Social
 * Science require an explicit keyword), concept inference, and the
 * hasVariable false-positive regression (e.g. "e-mail" must NOT look like an
 * algebra expression just because a letter is immediately followed by '-').
 */

import { detectWorkedExampleIntent } from '../src/lib/school/tutoring/workedExamples'

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== detectWorkedExampleIntent harness ===\n')

// ── Unsupported subjects ─────────────────────────────────────────────────
check('unsupported subject (hindi) → null even with keyword',
  detectWorkedExampleIntent('please solve this for me', 'hindi') === null)
check('unsupported subject (sanskrit) → null even with math pattern',
  detectWorkedExampleIntent('2+2=4', 'sanskrit') === null)

// ── Mathematics ───────────────────────────────────────────────────────────
check('math: plain "solve this" keyword → arithmetic',
  detectWorkedExampleIntent('solve this please', 'mathematics') === 'arithmetic')
check('math: percent keyword/pattern → percentages',
  detectWorkedExampleIntent('what is 20% of 50', 'mathematics') === 'percentages')
check('math: fraction pattern alone (no keyword) → fractions',
  detectWorkedExampleIntent('3/4 + 1/2', 'mathematics') === 'fractions')
check('math: equation pattern alone (no keyword) → algebra',
  detectWorkedExampleIntent('x + 5 = 10', 'mathematics') === 'algebra')
check('math: explicit keyword + geometry term → geometry',
  detectWorkedExampleIntent('how to solve the area of this triangle', 'mathematics') === 'geometry')
check('math: no keyword, no problem pattern → null',
  detectWorkedExampleIntent('what is photosynthesis', 'mathematics') === null)
check('math: REGRESSION — "e-mail" no longer false-positives as algebra',
  detectWorkedExampleIntent('can you check this e-mail please', 'mathematics') === null)
check('math: digit-backed variable expression still triggers → algebra',
  detectWorkedExampleIntent('y - 3 left over', 'mathematics') === 'algebra')

// ── Science ───────────────────────────────────────────────────────────────
check('science: calculate keyword + circuit term → electricity calculations',
  detectWorkedExampleIntent('calculate the current in this circuit', 'science') === 'electricity calculations')
check('science: explicit keyword + force term → numerical reasoning',
  detectWorkedExampleIntent('calculate the force needed here', 'science') === 'numerical reasoning')
check('science: math pattern alone (no keyword) → calculations',
  detectWorkedExampleIntent('5 * 3 = ?', 'science') === 'calculations')
check('science: no keyword, no problem pattern → null',
  detectWorkedExampleIntent('what is a food chain', 'science') === null)

// ── English (keyword-only gating, no math heuristic) ────────────────────
check('english: explicit correction keyword + sentence term → sentence construction',
  detectWorkedExampleIntent('can you correct this sentence for me', 'english') === 'sentence construction')
check('english: explicit keyword, no sentence term → grammar corrections',
  detectWorkedExampleIntent('fix this please', 'english') === 'grammar corrections')
check('english: math-looking pattern with no keyword → null (no math heuristic for English)',
  detectWorkedExampleIntent('2+2', 'english') === null)

// ── Social Science (keyword-only gating) ─────────────────────────────────
check('social_science: explicit keyword + source term → source analysis',
  detectWorkedExampleIntent('correct this source passage', 'social_science') === 'source analysis')
check('social_science: explicit keyword, no source term → reasoning questions',
  detectWorkedExampleIntent('is this correct', 'social_science') === 'reasoning questions')
check('social_science: no keyword → null',
  detectWorkedExampleIntent('tell me about democracy', 'social_science') === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
