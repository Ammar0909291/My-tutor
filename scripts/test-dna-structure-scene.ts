/**
 * Test harness for the formula-driven DNA base-pairing scene generator
 * (src/lib/teaching/sceneGenerators/dnaStructure.ts). Pure Watson-Crick
 * base-pairing rule — no Groq.
 *
 * Verifies by independent recomputation: every base and its complement, plus
 * the GC-content summary, match the re-derived pairing — across a short
 * sequence, an all-AT sequence, and an all-GC sequence. Also confirms the
 * scene-router keyword routing.
 *
 * extractDNAStructureParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-dna-structure-scene.ts
 */

import {
  buildDNAStructureScene,
  checkDNAStructureConsistency,
  validateDNAStructureParams,
  type DNAStructureParams,
} from '../src/lib/teaching/sceneGenerators/dnaStructure'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== dna-structure formula-driven scene harness ===\n')

function labelText(spec: ReturnType<typeof buildDNAStructureScene>, id: string): string | undefined {
  return spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)?.text
}

// ── Mixed sequence: ATGC → complement TACG, GC content 50% ───────────────────
const atgc: DNAStructureParams = { sequence: 'ATGC' }
const specATGC = buildDNAStructureScene(atgc)

check('ATGC — structurally valid SceneSpec', validateSceneSpec(specATGC).valid, JSON.stringify(validateSceneSpec(specATGC).errors))
check('ATGC — passes independent consistency check', checkDNAStructureConsistency(specATGC, atgc).ok,
  checkDNAStructureConsistency(specATGC, atgc).errors.join('; '))
check('ATGC — base-top-0 is A', labelText(specATGC, 'base-top-0') === 'A')
check('ATGC — base-bottom-0 is T (complement of A)', labelText(specATGC, 'base-bottom-0') === 'T')
check('ATGC — base-bottom-2 is C (complement of G)', labelText(specATGC, 'base-bottom-2') === 'C')
check('ATGC — GC content is 50%', labelText(specATGC, 'gc-content') === 'GC content: 50%')
check('ATGC — has 2 steps (strand + summary)', specATGC.steps.length === 2)

// ── All-AT sequence: 0% GC content ────────────────────────────────────────────
const allAT: DNAStructureParams = { sequence: 'ATAT' }
const specAllAT = buildDNAStructureScene(allAT)
check('ATAT — passes independent consistency check', checkDNAStructureConsistency(specAllAT, allAT).ok)
check('ATAT — complement strand is TATA', labelText(specAllAT, 'base-bottom-0') === 'T' && labelText(specAllAT, 'base-bottom-1') === 'A')
check('ATAT — GC content is 0%', labelText(specAllAT, 'gc-content') === 'GC content: 0%')

// ── All-GC sequence: 100% GC content ──────────────────────────────────────────
const allGC: DNAStructureParams = { sequence: 'GCGC' }
const specAllGC = buildDNAStructureScene(allGC)
check('GCGC — passes independent consistency check', checkDNAStructureConsistency(specAllGC, allGC).ok)
check('GCGC — GC content is 100%', labelText(specAllGC, 'gc-content') === 'GC content: 100%')

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildDNAStructureScene(atgc)
const base = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'base-bottom-0')
if (base) base.text = 'G'
check('tampered complement base fails the consistency check', !checkDNAStructureConsistency(tampered, atgc).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject a sequence with an invalid base letter', validateDNAStructureParams({ sequence: 'ATXC' }) === null)
check('reject a sequence shorter than 2 bases', validateDNAStructureParams({ sequence: 'A' }) === null)
check('reject a sequence longer than 12 bases', validateDNAStructureParams({ sequence: 'ATGCATGCATGCA' }) === null)
check('reject a non-string sequence', validateDNAStructureParams({ sequence: 123 }) === null)
check('accept and uppercase a lowercase sequence', validateDNAStructureParams({ sequence: 'atgc' })?.sequence === 'ATGC')

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for dna_structure ===\n')

check('"DNA sequence" prose → dna_structure',
  routeSceneGenerator('Find the complementary strand for the DNA sequence ATGC.') === 'dna_structure')
check('"base pairing" prose → dna_structure',
  routeSceneGenerator('Explain base pairing in the DNA double helix.') === 'dna_structure')
check('"adenine" prose → dna_structure',
  routeSceneGenerator('Why does adenine always pair with thymine?') === 'dna_structure')
check('unrelated genetics-cross prose does NOT route to dna_structure',
  routeSceneGenerator('Set up a punnett square for a monohybrid cross.') !== 'dna_structure')
check('unrelated cell-division prose does NOT route to dna_structure',
  routeSceneGenerator('Explain the stages of mitosis in a plant cell.') !== 'dna_structure')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
