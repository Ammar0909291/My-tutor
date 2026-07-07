/**
 * Offline unit harness for findPrerequisiteChapter in
 * src/lib/school/adaptive/prerequisiteRecovery.ts. Pure curriculum lookup —
 * no DB calls (only a dynamic require of schoolRouting's static catalogs).
 *
 * Run with:  npx tsx scripts/test-find-prerequisite-chapter.ts
 *
 * Uses REAL CBSE mathematics curriculum data (not mocks) since the function
 * has no injectable dependency — it's a pure function of (board, subject,
 * grade, prereqNodeId) over the static catalog, so exercising it against the
 * real catalog IS exercising its actual logic.
 *
 * Verified against the live CBSE mathematics catalog before writing this
 * harness (cbse.math.{5,6,7,8} chapters):
 *   - 'exponents_powers.basics' → grade 8 ch1, ch2 (same-grade match wins ch1)
 *   - 'decimals.introduction'   → grade 7 ch3 only (not in 8)
 *   - 'fractions.introduction' → grade 6 ch7 only (not in 7 or 8)
 *   - 'arithmetic.addition_subtraction' → grade 5 ch1 only (not in 6/7/8)
 */

import { findPrerequisiteChapter } from '../src/lib/school/adaptive/prerequisiteRecovery'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── Same-grade match ──────────────────────────────────────────────────────
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 8, 'exponents_powers.basics')
  check('same-grade match found', r !== null)
  check('same-grade match → first chapter wins (ch1, not ch2)', r?.chapterId === 'cbse.math.8.ch1')
  check('same-grade match → subjectSlug passed through', r?.subjectSlug === 'mathematics')
  check('same-grade match → missingPrereqTitle resolved from KG node', r?.missingPrereqTitle === 'Exponents and Powers')
}

// ── 1 grade back ──────────────────────────────────────────────────────────
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 8, 'decimals.introduction')
  check('1-grade-back match found', r !== null)
  check('1-grade-back match → correct chapter', r?.chapterId === 'cbse.math.7.ch3')
}

// ── 2 grades back ─────────────────────────────────────────────────────────
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 8, 'fractions.introduction')
  check('2-grades-back match found', r !== null)
  check('2-grades-back match → correct chapter', r?.chapterId === 'cbse.math.6.ch7')
}

// ── Exactly 3 grades back (boundary of the lookback range) ───────────────
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 8, 'arithmetic.addition_subtraction')
  check('exactly-3-grades-back (in range) → found', r !== null)
  check('exactly-3-grades-back → correct chapter', r?.chapterId === 'cbse.math.5.ch1')
}

// ── 4 grades back — outside the 3-grade lookback range → null ────────────
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 9, 'arithmetic.addition_subtraction')
  check('4-grades-back (out of range) → null', r === null)
}

// ── No match anywhere → null ───────────────────────────────────────────────
check('node id not in any chapter → null',
  findPrerequisiteChapter('cbse', 'mathematics', 8, 'totally-fake-node-xyz') === null)

// ── Invalid board → null (no catalog, no throw) ───────────────────────────
check('unknown board → null, does not throw',
  findPrerequisiteChapter('not-a-real-board', 'mathematics', 8, 'exponents_powers.basics') === null)

// ── Low grade clamps the lower-bound search at grade 1, does not throw ────
check('grade 1 with no match → null, does not throw (clamped lower bound)',
  findPrerequisiteChapter('cbse', 'mathematics', 1, 'totally-fake-node-xyz') === null)

// ── chapterTitle goes through chapterDisplayTitle (no leftover [Theme] prefix) ─
{
  const r = findPrerequisiteChapter('cbse', 'mathematics', 8, 'exponents_powers.basics')
  check('chapterTitle has no leftover bracket prefix', !r?.chapterTitle.startsWith('['))
}

// ── Different subject slug with no catalog match → null ──────────────────
check('mismatched subjectSlug for a math-only node → null',
  findPrerequisiteChapter('cbse', 'science', 8, 'exponents_powers.basics') === null)

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
