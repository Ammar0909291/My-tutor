/**
 * Standalone test harness for the RULES taxonomy in misconceptionEngine.ts.
 * No DB, no network. Run with:  npx tsx scripts/test-misconception-rules.ts
 *
 * Complements scripts/test-misconception-engine.ts (which covers the pure
 * prompt-building functions buildMisconceptionBlock/buildRemediationStrategy
 * only). This harness covers the RULES array and the matching primitives
 * that detectMisconceptions() actually uses against real DB data:
 *   - Structural integrity: every rule has the required non-empty fields.
 *   - `type` uniqueness across the whole taxonomy (a duplicate would make
 *     one rule's evidence silently overwrite-on-sort the other's).
 *   - matchesPatterns() — the real substring-match primitive — against
 *     real pattern samples from each subject section.
 *   - toConfidence() thresholds (LOW/MEDIUM/HIGH boundaries).
 *   - Cross-subject pattern isolation: confirms primaryPatterns from one
 *     subject's rules cannot accidentally substring-match a topicSlug
 *     shaped for another subject's rules (the property the in-file
 *     comments claim, e.g. for the l<unit>-<lesson> slug shape shared by
 *     Quantum Physics and Classical Mechanics).
 *   - Mastery-challenge cross-reference: every misconceptionType used in
 *     classicalMechanicsMasteryChallenges.ts and
 *     computerScienceMasteryChallenges.ts actually exists as a `type` in
 *     RULES, catching drift between a challenge bank and the taxonomy.
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { RULES, matchesPatterns, toConfidence, type MisconceptionRule } from '../src/lib/school/adaptive/misconceptionEngine'
import { CLASSICAL_MECHANICS_MASTERY_CHALLENGES } from '../src/lib/visuals/classicalMechanicsMasteryChallenges'
import { COMPUTER_SCIENCE_MASTERY_CHALLENGES } from '../src/lib/visuals/computerScienceMasteryChallenges'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

// ── Structural integrity ───────────────────────────────────────────────────

console.log('\n=== RULES structural integrity ===\n')

check('RULES is non-empty', RULES.length > 0, `length=${RULES.length}`)

for (const rule of RULES as MisconceptionRule[]) {
  check(`[${rule.type}] has non-empty type`, typeof rule.type === 'string' && rule.type.length > 0)
  check(`[${rule.type}] has non-empty label`, typeof rule.label === 'string' && rule.label.length > 0)
  check(`[${rule.type}] has non-empty description`, typeof rule.description === 'string' && rule.description.length > 0)
  check(`[${rule.type}] has at least one primaryPattern`, Array.isArray(rule.primaryPatterns) && rule.primaryPatterns.length > 0)
  check(`[${rule.type}] primaryPatterns are all non-empty strings`,
    rule.primaryPatterns.every((p) => typeof p === 'string' && p.length > 0))
  check(`[${rule.type}] has at least one remediationStep`, Array.isArray(rule.remediationSteps) && rule.remediationSteps.length > 0)
  check(`[${rule.type}] remediationSteps are all non-empty strings`,
    rule.remediationSteps.every((s) => typeof s === 'string' && s.length > 0))
  if (rule.secondaryPatterns) {
    check(`[${rule.type}] secondaryPatterns (when present) are all non-empty strings`,
      rule.secondaryPatterns.every((p) => typeof p === 'string' && p.length > 0))
  }
}

// ── type uniqueness ────────────────────────────────────────────────────────

console.log('\n=== type uniqueness ===\n')

const typeCounts = new Map<string, number>()
for (const rule of RULES) {
  typeCounts.set(rule.type, (typeCounts.get(rule.type) ?? 0) + 1)
}
const duplicates = [...typeCounts.entries()].filter(([, count]) => count > 1)
check('no duplicate rule types', duplicates.length === 0, `duplicates: ${duplicates.map(([t, c]) => `${t}×${c}`).join(', ')}`)

// ── matchesPatterns() against real samples ─────────────────────────────────

console.log('\n=== matchesPatterns() — real pattern samples ===\n')

check('cs_binary_representation matches its own real slug',
  matchesPatterns('foundations-binary-data-representation', ['foundations-binary-data-representation', 'foundations-what-is-a-computer']))
check('cs_binary_representation does NOT match an unrelated CS slug',
  !matchesPatterns('algorithms-sorting-algorithms', ['foundations-binary-data-representation', 'foundations-what-is-a-computer']))
check('cs_data_structure_access matches a substring-contained slug',
  matchesPatterns('data_structures-linked-lists-advanced', ['data_structures-linked-lists']))
check('quantum_wave_particle_duality matches its lesson slug',
  matchesPatterns('l6-1', ['l6-1', 'l6-2', 'l6-3', 'l7-1', 'l9-4']))
check('cm_inertia_requires_force matches its lesson slug',
  matchesPatterns('l4-2', ['l4-2', 'l4-3', 'l2-3']))
check('matchesPatterns returns false for empty pattern list', !matchesPatterns('anything', []))
check('matchesPatterns is case-sensitive (no accidental case-insensitive match)',
  !matchesPatterns('FOUNDATIONS-BINARY-DATA-REPRESENTATION', ['foundations-binary-data-representation']))

// ── toConfidence() thresholds ───────────────────────────────────────────────

console.log('\n=== toConfidence() thresholds ===\n')

check('0 evidence → LOW', toConfidence(0) === 'LOW')
check('1 evidence → LOW', toConfidence(1) === 'LOW')
check('2 evidence → LOW', toConfidence(2) === 'LOW')
check('3 evidence → MEDIUM', toConfidence(3) === 'MEDIUM')
check('4 evidence → MEDIUM', toConfidence(4) === 'MEDIUM')
check('5 evidence → HIGH', toConfidence(5) === 'HIGH')
check('10 evidence → HIGH', toConfidence(10) === 'HIGH')

// ── Cross-subject pattern isolation ────────────────────────────────────────
// detectMisconceptions() scopes queries by subjectSlug before ever consulting
// RULES, so cross-subject collision is structurally impossible at the query
// level. This section additionally verifies the patterns THEMSELVES don't
// textually overlap in a way that would matter if that scoping were ever
// removed — i.e. the taxonomy's own claimed isolation property.

console.log('\n=== Cross-subject pattern isolation (defense in depth) ===\n')

function rulesInSection(typePrefix: string): MisconceptionRule[] {
  return (RULES as MisconceptionRule[]).filter((r) => r.type.startsWith(typePrefix))
}

const csRules = rulesInSection('cs_')
const cmRules = rulesInSection('cm_')
const quantumRules = rulesInSection('quantum_')

check('Computer Science section has the expected 6 rules', csRules.length === 6, `found ${csRules.length}`)
check('Classical Mechanics section has the expected 8 rules', cmRules.length === 8, `found ${cmRules.length}`)
check('Quantum Physics section has the expected 6 rules', quantumRules.length === 6, `found ${quantumRules.length}`)

function allPatterns(rules: MisconceptionRule[]): string[] {
  return rules.flatMap((r) => [...r.primaryPatterns, ...(r.secondaryPatterns ?? [])])
}

const csPatterns = allPatterns(csRules)
const cmPatterns = allPatterns(cmRules)
const quantumPatterns = allPatterns(quantumRules)

check('no Computer Science pattern is a substring of any Classical Mechanics pattern (or vice versa)',
  !csPatterns.some((cs) => cmPatterns.some((cm) => cm.includes(cs) || cs.includes(cm))))
check('no Computer Science pattern is a substring of any Quantum Physics pattern (or vice versa)',
  !csPatterns.some((cs) => quantumPatterns.some((q) => q.includes(cs) || cs.includes(q))))
// NOTE: Classical Mechanics and Quantum Physics each number their own
// lessons independently (both as l<unit>-<lesson>), so exact lesson-slug
// strings DO coincidentally repeat across the two sections (e.g. both
// define an 'l6-1' and an 'l23-1' — confirmed below). This is expected and
// harmless: detectMisconceptions() scopes its DB query by subjectSlug
// BEFORE ever consulting these patterns (see the file-level doc comment
// and the `where: { subjectSlug, ... }` clauses), so the two sections'
// patterns are never compared against each other in practice. Asserting
// zero string overlap here would test a property the design never
// promised — so this is informational, not a pass/fail gate.
const sharedCmQuantumPatterns = cmPatterns.filter((cm) => quantumPatterns.includes(cm))
console.log(`  (info) Classical Mechanics ∩ Quantum Physics lesson-slug strings: ${sharedCmQuantumPatterns.join(', ') || '(none)'} — safe, see note above`)

// Regression guard for the actual safety property (not pattern uniqueness):
// detectMisconceptions()'s two Prisma queries must filter by subjectSlug.
// If a future edit drops that filter, cross-subject pattern overlap (just
// demonstrated above as real and currently harmless) would stop being
// harmless — this check exists to catch exactly that regression.
const engineSource = readFileSync(
  join(__dirname, '../src/lib/school/adaptive/misconceptionEngine.ts'),
  'utf-8',
)
const mistakeQueryMatch = engineSource.match(/prisma\.mistakeRecord\.findMany\(\{[\s\S]*?\}\)/)
const checkpointQueryMatch = engineSource.match(/prisma\.learningCheckpoint\.findMany\(\{[\s\S]*?\}\)/)
check('mistakeRecord query filters by subjectSlug (the actual cross-subject safety mechanism)',
  !!mistakeQueryMatch && mistakeQueryMatch[0].includes('subjectSlug'))
check('learningCheckpoint query filters by subjectSlug (the actual cross-subject safety mechanism)',
  !!checkpointQueryMatch && checkpointQueryMatch[0].includes('subjectSlug'))

// ── Mastery-challenge cross-reference ──────────────────────────────────────

console.log('\n=== Mastery challenge bank ↔ RULES cross-reference ===\n')

const ruleTypes = new Set((RULES as MisconceptionRule[]).map((r) => r.type))

for (const challenge of CLASSICAL_MECHANICS_MASTERY_CHALLENGES) {
  check(`[CM challenge ${challenge.id}] misconceptionType "${challenge.misconceptionType}" exists in RULES`,
    ruleTypes.has(challenge.misconceptionType))
}

for (const challenge of COMPUTER_SCIENCE_MASTERY_CHALLENGES) {
  check(`[CS challenge ${challenge.id}] misconceptionType "${challenge.misconceptionType}" exists in RULES`,
    ruleTypes.has(challenge.misconceptionType))
}

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
