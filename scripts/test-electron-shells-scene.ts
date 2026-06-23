/**
 * Test harness for the deterministic electron-shell (Bohr model) scene generator
 * (src/lib/teaching/sceneGenerators/electronShells.ts). Data-driven, Groq-free
 * for everything tested here.
 *
 * Verifies by INDEPENDENT recomputation: total electron dots == atomic number Z,
 * the per-shell split matches an algorithmic Bohr–Bury fill (a different
 * derivation than the lookup table), shells nest outward, and the whole curated
 * table is internally consistent (every element's shells sum to Z).
 *
 * extractElement()/generateElectronShellScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-electron-shells-scene.ts
 */

import {
  buildElectronShellScene,
  checkElectronShellConsistency,
  lookupElement,
  validateElement,
  bohrBuryFill,
} from '../src/lib/teaching/sceneGenerators/electronShells'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== electron-shell (Bohr model) deterministic scene harness ===\n')

// ── Sodium (Na, Z=11) → 2, 8, 1 ──────────────────────────────────────────────
const na = lookupElement('sodium')!
check('sodium looked up by name', na?.symbol === 'Na' && na.z === 11)
const naSpec = buildElectronShellScene(na)
check('Na — structurally valid SceneSpec', validateSceneSpec(naSpec).valid, JSON.stringify(validateSceneSpec(naSpec).errors))
check('Na — passes independent consistency check', checkElectronShellConsistency(naSpec, na).ok,
  checkElectronShellConsistency(naSpec, na).errors.join('; '))
check('Na — exactly 11 electron dots drawn (== Z)',
  naSpec.steps.flatMap((s) => s.objects).filter((o) => /^e\d+$/.test(o.id ?? '')).length === 11)
check('Na config is 2, 8, 1', na.shells.join(',') === '2,8,1')

// ── Lookup variants ──────────────────────────────────────────────────────────
check('lookup by symbol "Cl" → Chlorine', lookupElement('Cl')?.z === 17)
check('lookup by atomic number 20 → Calcium', lookupElement(20)?.symbol === 'Ca')
check('lookup by name substring in a sentence', lookupElement('the oxygen atom shares electrons')?.symbol === 'O')

// ── Independent algorithmic fill agrees with the curated table for ALL 1–20 ──
check('Bohr–Bury algorithm matches the lookup table for every element Z=1–20', (() => {
  for (let z = 1; z <= 20; z++) {
    const def = lookupElement(z)!
    if (def.shells.join(',') !== bohrBuryFill(z).join(',')) return false
  }
  return true
})())

// ── Scope guard: Z > 20 rejected (d-orbitals break the simple rule) ──────────
check('iron (Z=26) is NOT in scope → lookup null', lookupElement('iron') === null)
check('atomic number 30 out of range → null', lookupElement(30) === null)
check('validateElement rejects a tampered table entry (shells != Z)',
  validateElement({ z: 8, symbol: 'O', name: 'Oxygen', shells: [2, 5] } as any) === null)

// ── Type-coercion guard: bare Number(raw) on a non-number/string input is a
// silent-wrong-answer trap (Number(true)===1, Number([5])===5) — confirms the
// fix rejects these instead of resolving to a real element. ──────────────────
check('boolean true does NOT resolve to Z=1 (Number(true)===1 coercion trap)', lookupElement(true) === null)
check('boolean false → null', lookupElement(false) === null)
check('single-element array [5] does NOT resolve to Z=5 (Number([5])===5 coercion trap)', lookupElement([5]) === null)
check('plain object → null', lookupElement({ z: 8 }) === null)

// ── A few more elements build + check cleanly ────────────────────────────────
for (const sym of ['H', 'C', 'O', 'Ne', 'Ar', 'Ca']) {
  const def = lookupElement(sym)!
  const spec = buildElectronShellScene(def)
  check(`${def.name} (${sym}) — valid + consistent + ${def.z} dots`,
    validateSceneSpec(spec).valid &&
    checkElectronShellConsistency(spec, def).ok &&
    spec.steps.flatMap((s) => s.objects).filter((o) => /^e\d+$/.test(o.id ?? '')).length === def.z)
}

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
