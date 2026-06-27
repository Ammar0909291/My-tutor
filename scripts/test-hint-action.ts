/**
 * Offline unit harness for the structured [HINT] action type (Sprint W gap A):
 * src/lib/school/tutoring/hintTag.ts (pure tag extraction) and its bias-driven
 * suppression semantics (src/lib/school/adaptive/teachingOutputBias.ts's
 * deriveHintBias). No Groq, no DB.
 *
 * Run with:  npx tsx scripts/test-hint-action.ts
 */
import { parseHintTag } from '../src/lib/school/tutoring/hintTag'
import { deriveHintBias } from '../src/lib/school/adaptive/teachingOutputBias'
import type { TeachingStrategyType } from '../src/lib/school/adaptive/teachingStrategy'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── parseHintTag — extraction + stripping ───────────────────────────────────
{
  const r = parseHintTag('Try squaring both sides next. [HINT]Look at what happens when you square both sides of the equation.[/HINT]')
  check('tag present → hint text extracted', r.hint === 'Look at what happens when you square both sides of the equation.')
  check('tag present → stripped and trimmed from cleanText', r.cleanText === 'Try squaring both sides next.')
}
{
  const r = parseHintTag('No hint this turn.')
  check('no tag present → hint null', r.hint === null)
  check('no tag present → cleanText unchanged', r.cleanText === 'No hint this turn.')
}
{
  const r = parseHintTag('Keep going. [hint]case-insensitive match[/HINT]')
  check('tag matching is case-insensitive', r.hint === 'case-insensitive match')
}
{
  const r = parseHintTag('[HINT]   [/HINT]')
  check('whitespace-only hint payload → treated as no hint (null)', r.hint === null)
}
{
  const r = parseHintTag('Before [HINT]middle hint[/HINT] after')
  check('text on both sides of the tag is preserved after stripping', r.cleanText === 'Before  after')
}
{
  const r = parseHintTag('')
  check('empty string → hint null, cleanText empty', r.hint === null && r.cleanText === '')
}

// ── deriveHintBias — total over TeachingStrategyType ────────────────────────
check('deriveHintBias(MOMENTUM_RECOVERY) → PREFERRED', deriveHintBias('MOMENTUM_RECOVERY') === 'PREFERRED')
check('deriveHintBias(MISCONCEPTION_REPAIR) → PREFERRED', deriveHintBias('MISCONCEPTION_REPAIR') === 'PREFERRED')
check('deriveHintBias(CONFIDENCE_CORRECTION) → PREFERRED', deriveHintBias('CONFIDENCE_CORRECTION') === 'PREFERRED')
check('deriveHintBias(CONFIDENCE_BUILDING) → SUPPRESSED', deriveHintBias('CONFIDENCE_BUILDING') === 'SUPPRESSED')
check('deriveHintBias(APPLICATION_FOCUS) → NEUTRAL', deriveHintBias('APPLICATION_FOCUS') === 'NEUTRAL')
check('deriveHintBias(ACCELERATED_GROWTH) → NEUTRAL', deriveHintBias('ACCELERATED_GROWTH') === 'NEUTRAL')
check('deriveHintBias(FOUNDATION_REBUILD) → NEUTRAL', deriveHintBias('FOUNDATION_REBUILD') === 'NEUTRAL')
check('deriveHintBias: unknown strategy falls back to NEUTRAL',
  deriveHintBias('NOPE' as TeachingStrategyType) === 'NEUTRAL')

// ── Integration semantics: a SUPPRESSED bias discards an emitted hint even
// if the model ignores the "don't use [HINT]" instruction (mirrors route.ts's
// `hintBiasHoisted === 'SUPPRESSED' ? null : parsedHint.hint` enforcement) ──
function wouldKeepHint(strategy: TeachingStrategyType, rawText: string): string | null {
  const bias = deriveHintBias(strategy)
  const parsed = parseHintTag(rawText)
  return bias === 'SUPPRESSED' ? null : parsed.hint
}
check('CONFIDENCE_BUILDING (SUPPRESSED) discards a hint even if the model emits one',
  wouldKeepHint('CONFIDENCE_BUILDING', '[HINT]should be dropped[/HINT]') === null)
check('MOMENTUM_RECOVERY (PREFERRED) keeps an emitted hint',
  wouldKeepHint('MOMENTUM_RECOVERY', '[HINT]should survive[/HINT]') === 'should survive')
check('APPLICATION_FOCUS (NEUTRAL) keeps an emitted hint',
  wouldKeepHint('APPLICATION_FOCUS', '[HINT]neutral keeps it[/HINT]') === 'neutral keeps it')

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
