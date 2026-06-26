/**
 * Offline unit harness for the Teaching Strategy Engine output bias
 * (src/lib/school/adaptive/teachingOutputBias.ts). Pure functions, no Groq, no DB.
 *
 * Run with:  npx tsx scripts/test-teaching-output-bias.ts
 */
import { deriveOutputBias, isOptionalVisual, type OutputBiasKind } from '../src/lib/school/adaptive/teachingOutputBias'
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

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
