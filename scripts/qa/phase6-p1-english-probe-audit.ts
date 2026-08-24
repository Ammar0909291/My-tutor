/**
 * PHASE 6 P1 — the English asset-contract shortfall, investigated.
 *
 * SCOPE CORRECTION, stated because it changes what is investigated:
 * `assetContract.ts` is the MASTERY-GATE ASSESSMENT contract (>= 1 explanation
 * and >= 3 CLOSED-CHOICE PROBES per concept). It has nothing to do with the
 * visual layer. The "2 vs 3" finding is about MCQ probes, not visual probes;
 * the visual coverage question (0/216, oral-first) is the separate P2 surface
 * and is measured at the end of this script for the record only.
 *
 * The question this script answers is NOT "can we author a third probe?" It is:
 *   - which English concepts are short, exactly;
 *   - WHY they are short (template? modality? intent?);
 *   - is the shortfall INTENTIONAL for any of them (oral-first);
 *   - is 3 the right bar for English, or a STEM assumption leaking in;
 *   - is this a runtime, asset, content, harness, or non-defect.
 *
 * Reads the real corpora and the real contract module. Changes nothing.
 */
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
import { SEED_EXPLANATIONS, SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import type { SeedExplanation, SeedProbe } from '../../src/lib/teaching/assets/brainSeedAssets'
import {
  evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES, ASSET_CONTRACT_VERSION,
} from '../../src/lib/teaching/assetContract'
import { MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED } from '../../src/lib/teaching/masteryGate'
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'

const explanations: SeedExplanation[] = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS, ...CHEMISTRY_EXPLANATIONS]
const probes: SeedProbe[] = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES]
const isClosedChoice = (p: SeedProbe): boolean => Array.isArray(p.choices) && p.choices.length >= 2

function main(): void {
  console.log('='.repeat(80))
  console.log('PHASE 6 P1 — ENGLISH ASSET-CONTRACT (MASTERY-GATE PROBE) AUDIT')
  console.log('='.repeat(80))

  // ── 0. where the bar comes from — is "3" a test number or a product number? ─
  console.log('\n── PROVENANCE OF THE BAR (is 3 arbitrary?) ──')
  console.log(`  MIN_CLOSED_CHOICE_PROBES        = ${MIN_CLOSED_CHOICE_PROBES}   (assetContract ${ASSET_CONTRACT_VERSION})`)
  console.log(`  MASTERY_CHECK_REQUIRED          = ${MASTERY_CHECK_REQUIRED}`)
  console.log(`  MASTERY_PRACTICE_REQUIRED       = ${MASTERY_PRACTICE_REQUIRED}`)
  console.log(`  CHECK + PRACTICE                = ${MASTERY_CHECK_REQUIRED + MASTERY_PRACTICE_REQUIRED}`)
  const derived = MIN_CLOSED_CHOICE_PROBES === MASTERY_CHECK_REQUIRED + MASTERY_PRACTICE_REQUIRED
  console.log(`  => the contract bar is ${derived ? 'DERIVED FROM the PROTECTED mastery thresholds'
    : 'NOT derived from mastery — investigate'}`)

  // ── 1. per-concept English inventory ──────────────────────────────────────
  const eng = (id: string) => id.startsWith('eng.')
  const byConcept = new Map<string, { expl: number; closed: number; open: number; kinds: Map<string, number> }>()
  const ensure = (id: string) => {
    let r = byConcept.get(id)
    if (!r) { r = { expl: 0, closed: 0, open: 0, kinds: new Map() }; byConcept.set(id, r) }
    return r
  }
  for (const e of explanations) if (eng(e.conceptId)) ensure(e.conceptId).expl++
  for (const p of probes) {
    if (!eng(p.conceptId)) continue
    const r = ensure(p.conceptId)
    r.kinds.set(String(p.probeKind), (r.kinds.get(String(p.probeKind)) ?? 0) + 1)
    if (isClosedChoice(p)) r.closed++; else r.open++
  }

  const kg = getKnowledgeGraph('english')
  const kgIds = kg ? getAllNodes(kg).map((n) => n.id) : []
  console.log(`\n── SCALE ──\n  english KG concepts: ${kgIds.length}   with any authored asset: ${byConcept.size}`)

  // ── 2. reproduce the shortfall exactly ────────────────────────────────────
  const shortfall: string[] = []
  const zeroClosed: string[] = []
  const dist = new Map<number, number>()
  for (const [id, r] of byConcept) {
    dist.set(r.closed, (dist.get(r.closed) ?? 0) + 1)
    const v = evaluateAssetContract({ explanations: r.expl, closedChoiceProbes: r.closed, openRecallProbes: r.open })
    if (!v.satisfied) shortfall.push(id)
    if (r.closed === 0) zeroClosed.push(id)
  }
  console.log('\n── REPRODUCTION ──')
  console.log('  closed-choice probes per concept -> number of concepts:',
    JSON.stringify(Object.fromEntries([...dist.entries()].sort((a, b) => a[0] - b[0]))))
  console.log(`  concepts BELOW contract: ${shortfall.length} / ${byConcept.size}`)
  console.log(`  concepts with ZERO closed-choice probes: ${zeroClosed.length}`)
  for (const id of zeroClosed) {
    const r = byConcept.get(id)!
    console.log(`     ${id.padEnd(46)} expl=${r.expl} closed=0 open=${r.open}  kinds=${JSON.stringify(Object.fromEntries(r.kinds))}`)
  }

  // ── 3. WHY 2? the template signature ──────────────────────────────────────
  console.log('\n── WHY EXACTLY 2? (probe-kind composition of the short concepts) ──')
  const comboCount = new Map<string, number>()
  for (const [id, r] of byConcept) {
    if (r.closed !== 2) continue
    const combo = [...r.kinds.entries()].sort().map(([k, n]) => `${k}x${n}`).join(' + ')
    comboCount.set(combo, (comboCount.get(combo) ?? 0) + 1)
  }
  for (const [combo, n] of [...comboCount.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)} concepts: ${combo}`)
  }

  // ── 4. IS ENGLISH USING A DIFFERENT ASSESSMENT MODALITY? ──────────────────
  // If English were intentionally oral-first for assessment, its probes would
  // be open-recall (short_answer), not closed-choice. Compare modality mix.
  console.log('\n── ASSESSMENT MODALITY, per subject (is English deliberately different?) ──')
  for (const [label, pre] of [['english', 'eng.'], ['chemistry', 'chem.'], ['physics', 'phys.']] as [string, string][]) {
    const kinds = new Map<string, number>()
    let closed = 0, open = 0
    for (const p of probes) {
      if (!p.conceptId.startsWith(pre)) continue
      kinds.set(String(p.probeKind), (kinds.get(String(p.probeKind)) ?? 0) + 1)
      if (isClosedChoice(p)) closed++; else open++
    }
    console.log(`  ${label.padEnd(10)} closed=${String(closed).padStart(4)} open=${String(open).padStart(3)}  kinds=${JSON.stringify(Object.fromEntries(kinds))}`)
  }

  // ── 5. Are the zero-closed concepts the ORAL-FIRST entry nodes? ───────────
  // CLAUDE.md's First Lesson Standard: "English lesson one is ORAL,
  // print-optional", anchored to eng.phonics.print-concepts and
  // eng.phonics.phonemic-awareness. If the zero-closed set matches those, the
  // absence is INTENTIONAL for them and must not be "fixed".
  console.log('\n── ORAL-FIRST CHECK (First Lesson Standard entry nodes) ──')
  const ORAL_FIRST = ['eng.phonics.phonemic-awareness', 'eng.phonics.print-concepts', 'eng.phonics.letter-sound-correspondence']
  for (const id of ORAL_FIRST) {
    const r = byConcept.get(id)
    console.log(`  ${id.padEnd(46)} ${r ? `expl=${r.expl} closed=${r.closed} open=${r.open} kinds=${JSON.stringify(Object.fromEntries(r.kinds))}` : 'NO ASSETS'}`)
  }
  const zeroSet = new Set(zeroClosed)
  const oralSet = new Set(ORAL_FIRST)
  const zeroAreOral = zeroClosed.every((id) => oralSet.has(id))
  console.log(`  every zero-closed concept is a First-Lesson oral entry node: ${zeroAreOral ? 'YES' : 'NO'}`)
  console.log(`  oral entry nodes that are NOT zero-closed: ${ORAL_FIRST.filter((id) => !zeroSet.has(id)).join(', ') || '(none)'}`)

  // ── 6. FOR THE RECORD ONLY — the P2 surface, not this task's target ───────
  console.log('\n── FOR THE RECORD (P2 surface, NOT investigated here) ──')
  console.log('  Visual coverage is a different contract entirely (visualContract.ts /')
  console.log('  conceptArchetype.ts). It is NOT what assetContract.ts measures, and no')
  console.log('  English visual was created or required by this audit.')

  console.log('\n' + '='.repeat(80))
  console.log('CLASSIFICATION INPUTS')
  console.log('='.repeat(80))
  console.log(`  bar derived from protected mastery thresholds : ${derived}`)
  console.log(`  English uses the SAME closed-choice modality  : (see §4 — compare to STEM)`)
  console.log(`  concepts short of contract                    : ${shortfall.length}`)
  console.log(`  of which intentionally oral (zero closed)     : ${zeroClosed.length}`)
  console.log(`  of which a 2-probe template shortfall         : ${shortfall.length - zeroClosed.length}`)
}

main()
