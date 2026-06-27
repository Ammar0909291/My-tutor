/**
 * Offline unit harness for the Teaching Strategy Engine output bias
 * (src/lib/school/adaptive/teachingOutputBias.ts). Pure functions, no Groq, no DB.
 *
 * Run with:  npx tsx scripts/test-teaching-output-bias.ts
 */
import { deriveOutputBias, isOptionalVisual, isOptionalVisualTag, isOptionalInlinePractice, type OutputBiasKind } from '../src/lib/school/adaptive/teachingOutputBias'
import type { TeachingStrategyType } from '../src/lib/school/adaptive/teachingStrategy'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── deriveOutputBias — all 7 strategy types map to the spec's Section 4 bias ──
const EXPECTED: Record<TeachingStrategyType, OutputBiasKind> = {
  FOUNDATION_REBUILD: 'PROMOTE',
  MISCONCEPTION_REPAIR: 'PROMOTE',
  MOMENTUM_RECOVERY: 'SUPPRESS_OPTIONAL',
  CONFIDENCE_CORRECTION: 'SUPPRESS_OPTIONAL',
  APPLICATION_FOCUS: 'NEUTRAL',
  CONFIDENCE_BUILDING: 'SUPPRESS_OPTIONAL',
  ACCELERATED_GROWTH: 'NEUTRAL',
}

for (const [strategy, expectedKind] of Object.entries(EXPECTED) as [TeachingStrategyType, OutputBiasKind][]) {
  const bias = deriveOutputBias(strategy)
  check(`deriveOutputBias(${strategy}) → ${expectedKind}`, bias.kind === expectedKind)
  check(`deriveOutputBias(${strategy}) carries a non-empty reason`, typeof bias.reason === 'string' && bias.reason.length > 0)
}

// every strategy type is covered (exhaustiveness: 7 entries)
check('all 7 strategy types mapped', Object.keys(EXPECTED).length === 7)

// unknown value falls back to NEUTRAL (defensive totality)
check('unknown strategy → NEUTRAL fallback', deriveOutputBias('NOPE' as TeachingStrategyType).kind === 'NEUTRAL')

// ── isOptionalVisual — true/false cases over the interactive/challenge fields ──
// OPTIONAL ⟺ not interactive AND no challenge.
check('isOptionalVisual: interactive=false, no challenge → OPTIONAL (true)',
  isOptionalVisual({ interactive: false } as any) === true)
check('isOptionalVisual: interactive absent, no challenge → OPTIONAL (true)',
  isOptionalVisual({} as any) === true)
check('isOptionalVisual: interactive=true → REQUIRED (false)',
  isOptionalVisual({ interactive: true } as any) === false)
check('isOptionalVisual: challenge present (even if not interactive) → REQUIRED (false)',
  isOptionalVisual({ interactive: false, challenge: { kind: 'place' } } as any) === false)
check('isOptionalVisual: interactive=true AND challenge present → REQUIRED (false)',
  isOptionalVisual({ interactive: true, challenge: {} } as any) === false)
check('isOptionalVisual: null spec → false (nothing to suppress)',
  isOptionalVisual(null) === false)
check('isOptionalVisual: undefined spec → false (nothing to suppress)',
  isOptionalVisual(undefined) === false)

// ── Integration semantics: SUPPRESS_OPTIONAL only drops OPTIONAL visuals ──
// (mirrors the route.ts sub-step decision, exercised here as pure logic.)
function wouldDrop(strategy: TeachingStrategyType, spec: any): boolean {
  const bias = deriveOutputBias(strategy)
  return bias.kind === 'SUPPRESS_OPTIONAL' && isOptionalVisual(spec)
}
check('MOMENTUM_RECOVERY drops an optional visual', wouldDrop('MOMENTUM_RECOVERY', { interactive: false }) === true)
check('MOMENTUM_RECOVERY keeps a REQUIRED (interactive) visual', wouldDrop('MOMENTUM_RECOVERY', { interactive: true }) === false)
check('MOMENTUM_RECOVERY keeps a REQUIRED (challenge) visual', wouldDrop('MOMENTUM_RECOVERY', { interactive: false, challenge: {} }) === false)
check('FOUNDATION_REBUILD (PROMOTE) never drops, even an optional visual', wouldDrop('FOUNDATION_REBUILD', { interactive: false }) === false)
check('APPLICATION_FOCUS (NEUTRAL) never drops', wouldDrop('APPLICATION_FOCUS', { interactive: false }) === false)
check('ACCELERATED_GROWTH (NEUTRAL) never drops', wouldDrop('ACCELERATED_GROWTH', { interactive: false }) === false)

// ── isOptionalVisualTag (Sprint W gap fix) — the LLM's own VISUAL:<type> tag ──
// carries no interactive/challenge payload, so it is unconditionally OPTIONAL
// whenever present, and never optional when absent.
check('isOptionalVisualTag: a present tag string → OPTIONAL (true)',
  isOptionalVisualTag('number_line') === true)
check('isOptionalVisualTag: a different present tag string → OPTIONAL (true)',
  isOptionalVisualTag('circuit_diagram') === true)
check('isOptionalVisualTag: empty string → false (nothing to suppress)',
  isOptionalVisualTag('') === false)
check('isOptionalVisualTag: whitespace-only string → false (nothing to suppress)',
  isOptionalVisualTag('   ') === false)
check('isOptionalVisualTag: null → false (nothing to suppress)',
  isOptionalVisualTag(null) === false)
check('isOptionalVisualTag: undefined → false (nothing to suppress)',
  isOptionalVisualTag(undefined) === false)

// ── Integration semantics: SUPPRESS_OPTIONAL drops the LLM's own visual tag too ──
function wouldDropTag(strategy: TeachingStrategyType, visual: string | null): boolean {
  const bias = deriveOutputBias(strategy)
  return bias.kind === 'SUPPRESS_OPTIONAL' && isOptionalVisualTag(visual)
}
check('MOMENTUM_RECOVERY drops the LLM\'s own VISUAL:<type> tag', wouldDropTag('MOMENTUM_RECOVERY', 'number_line') === true)
check('FOUNDATION_REBUILD (PROMOTE) never drops the tag', wouldDropTag('FOUNDATION_REBUILD', 'number_line') === false)
check('APPLICATION_FOCUS (NEUTRAL) never drops the tag', wouldDropTag('APPLICATION_FOCUS', 'number_line') === false)
check('SUPPRESS_OPTIONAL strategy with no tag present drops nothing', wouldDropTag('CONFIDENCE_BUILDING', null) === false)

// ── isOptionalInlinePractice (Sprint W gap fix) — APPLICATION_FOCUS is always
// REQUIRED (deliberate choice); staleMate-only triggers under any other
// strategy are OPTIONAL.
check('isOptionalInlinePractice: APPLICATION_FOCUS + staleMate=false → REQUIRED (false)',
  isOptionalInlinePractice('APPLICATION_FOCUS', false) === false)
check('isOptionalInlinePractice: APPLICATION_FOCUS + staleMate=true → still REQUIRED (false)',
  isOptionalInlinePractice('APPLICATION_FOCUS', true) === false)
check('isOptionalInlinePractice: MOMENTUM_RECOVERY + staleMate=true → OPTIONAL (true)',
  isOptionalInlinePractice('MOMENTUM_RECOVERY', true) === true)
check('isOptionalInlinePractice: MOMENTUM_RECOVERY + staleMate=false → never fires, but reports false',
  isOptionalInlinePractice('MOMENTUM_RECOVERY', false) === false)
check('isOptionalInlinePractice: CONFIDENCE_BUILDING + staleMate=true → OPTIONAL (true)',
  isOptionalInlinePractice('CONFIDENCE_BUILDING', true) === true)
check('isOptionalInlinePractice: FOUNDATION_REBUILD + staleMate=true → OPTIONAL (true, not the strategy\'s own choice)',
  isOptionalInlinePractice('FOUNDATION_REBUILD', true) === true)

// ── Integration semantics: SUPPRESS_OPTIONAL skips generating the practice
// question entirely when it's only there because of a stalemate ──────────────
function wouldSkipPractice(strategy: TeachingStrategyType, staleMate: boolean): boolean {
  const bias = deriveOutputBias(strategy)
  return bias.kind === 'SUPPRESS_OPTIONAL' && isOptionalInlinePractice(strategy, staleMate)
}
check('MOMENTUM_RECOVERY + staleMate → practice question is skipped',
  wouldSkipPractice('MOMENTUM_RECOVERY', true) === true)
check('CONFIDENCE_BUILDING + staleMate → practice question is skipped',
  wouldSkipPractice('CONFIDENCE_BUILDING', true) === true)
check('APPLICATION_FOCUS (NEUTRAL bias) + staleMate → never skipped',
  wouldSkipPractice('APPLICATION_FOCUS', true) === false)
check('FOUNDATION_REBUILD (PROMOTE bias) + staleMate → never skipped despite being optional',
  wouldSkipPractice('FOUNDATION_REBUILD', true) === false)

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
