/**
 * PHASE 6 — OFFLINE STRUCTURAL CERTIFICATION, at full curriculum scale.
 *
 * ── WHY THIS EXISTS SEPARATELY FROM THE LIVE HARNESS ────────────────────────
 * A full live sweep of 640 concepts across the Phase-6 behaviour matrix is on
 * the order of 10,000 provider calls. This repository has already measured what
 * that does: CLAUDE.md's 2026-08-19 note records a 257-concept sweep producing
 * 139 `AIRateLimitError`s, 40 `all providers failed`, and every learner turn
 * landing on the degraded template — a total teaching outage. Phase 6's own
 * rule 16 forbids manufacturing outages, so that sweep must not be run.
 *
 * Everything that can be certified WITHOUT a provider is therefore certified
 * here, at 100% scale, deterministically and repeatably. The live harness then
 * spends its bounded provider budget only on what genuinely needs a model.
 *
 * This reads the REAL seed corpora and the REAL assetContract module. It
 * computes nothing itself that the product also computes.
 *
 * Verdicts: PASS / FAIL / NOT_APPLICABLE / UNKNOWN. Never UNKNOWN -> PASS.
 */
import { GradeBand } from '@prisma/client'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
import { SEED_EXPLANATIONS, SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import type { SeedExplanation, SeedProbe } from '../../src/lib/teaching/assets/brainSeedAssets'
import { evaluateAssetContract, ASSET_CONTRACT_VERSION } from '../../src/lib/teaching/assetContract'
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'

/** Every KG node id for a subject, via the product's own registry. */
const kgNodeIds = (subject: string): string[] => {
  const g = getKnowledgeGraph(subject)
  return g ? getAllNodes(g).map((n) => n.id) : []
}

type Verdict = 'PASS' | 'FAIL' | 'NOT_APPLICABLE' | 'UNKNOWN'

const SUBJECTS = ['english', 'chemistry', 'physics'] as const
type Subject = (typeof SUBJECTS)[number]

const PREFIX_TO_SUBJECT: Record<string, Subject> = { eng: 'english', chem: 'chemistry', phys: 'physics' }
const subjectOf = (conceptId: string): Subject | null =>
  PREFIX_TO_SUBJECT[conceptId.split('.')[0] ?? ''] ?? null

// ── the corpus actually shipped ─────────────────────────────────────────────
// EXACTLY the corpus src/instrumentation.ts's bootstrap writes (ALL_EXPLANATIONS /
// ALL_PROBES). Measuring a different set would certify something production does
// not serve — the harness defect this line exists to prevent.
const explanations: SeedExplanation[] = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS, ...CHEMISTRY_EXPLANATIONS]
const probes: SeedProbe[] = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES]

/** A probe a mastery gate can actually grade: >= 2 authored choices. */
const isClosedChoice = (p: SeedProbe): boolean => Array.isArray(p.choices) && p.choices.length >= 2

interface Row {
  conceptId: string
  subject: Subject
  explanations: number
  closedChoice: number
  openRecall: number
  bands: Set<GradeBand>
  contract: Verdict
  gradeable: Verdict
  gradeableDetail: string
}

function main(): void {
  console.log('='.repeat(78))
  console.log('PHASE 6 — OFFLINE STRUCTURAL CERTIFICATION')
  console.log(`asset contract ${ASSET_CONTRACT_VERSION}; zero provider calls; full curriculum scale`)
  console.log('='.repeat(78))

  // ── 1. curriculum scale, measured not assumed ─────────────────────────────
  const kgCounts: Record<string, number> = {}
  for (const s of SUBJECTS) kgCounts[s] = kgNodeIds(s).length
  const kgTotal = Object.values(kgCounts).reduce((a, b) => a + b, 0)
  console.log('\n── curriculum scale (measured from the live KG adapters) ──')
  for (const s of SUBJECTS) console.log(`  ${s.padEnd(10)} ${kgCounts[s]} concepts`)
  console.log(`  ${'TOTAL'.padEnd(10)} ${kgTotal} concepts`)

  // ── 2. per-concept inventory ──────────────────────────────────────────────
  const byConcept = new Map<string, Row>()
  const ensure = (conceptId: string): Row | null => {
    const subject = subjectOf(conceptId)
    if (!subject) return null
    let r = byConcept.get(conceptId)
    if (!r) {
      r = {
        conceptId, subject, explanations: 0, closedChoice: 0, openRecall: 0,
        bands: new Set(), contract: 'UNKNOWN', gradeable: 'UNKNOWN', gradeableDetail: '',
      }
      byConcept.set(conceptId, r)
    }
    return r
  }

  for (const e of explanations) {
    const r = ensure(e.conceptId)
    if (r) { r.explanations++; r.bands.add(e.gradeBand) }
  }

  // ── 3. probe gradeability — every closed-choice probe must have EXACTLY one
  //      correct answer. Two correct answers, or none, is an ungradeable probe
  //      that would silently mis-grade a learner. This is a P0-class check.
  const ungradeable: { conceptId: string; stem: string; correct: number }[] = []
  for (const p of probes) {
    const r = ensure(p.conceptId)
    if (!r) continue
    if (isClosedChoice(p)) {
      r.closedChoice++
      r.bands.add(p.gradeBand)
      const nCorrect = (p.choices ?? []).filter((c) => c.isCorrect).length
      if (nCorrect !== 1) ungradeable.push({ conceptId: p.conceptId, stem: p.stem.slice(0, 70), correct: nCorrect })
    } else {
      r.openRecall++
    }
  }

  // ── 4. contract verdict per concept, using the PRODUCT's own evaluator ────
  for (const r of byConcept.values()) {
    const v = evaluateAssetContract({
      explanations: r.explanations,
      closedChoiceProbes: r.closedChoice,
      openRecallProbes: r.openRecall,
    })
    r.contract = v.satisfied ? 'PASS' : 'FAIL'
  }

  // ── 5. report: serving coverage vs the KG ────────────────────────────────
  console.log('\n── serving-asset coverage, per subject (source corpus) ──')
  console.log('  subject     KG   served  contract-PASS  contract-FAIL   coverage')
  let totalServed = 0, totalPass = 0
  for (const s of SUBJECTS) {
    const rows = [...byConcept.values()].filter((r) => r.subject === s)
    const pass = rows.filter((r) => r.contract === 'PASS').length
    const fail = rows.filter((r) => r.contract === 'FAIL').length
    totalServed += rows.length; totalPass += pass
    const cov = kgCounts[s] > 0 ? ((rows.length / kgCounts[s]) * 100).toFixed(1) : '0.0'
    console.log(`  ${s.padEnd(10)} ${String(kgCounts[s]).padStart(4)} ${String(rows.length).padStart(7)} ${String(pass).padStart(14)} ${String(fail).padStart(14)}   ${cov}%`)
  }
  console.log(`  ${'TOTAL'.padEnd(10)} ${String(kgTotal).padStart(4)} ${String(totalServed).padStart(7)} ${String(totalPass).padStart(14)} ${String(totalServed - totalPass).padStart(14)}   ${((totalServed / kgTotal) * 100).toFixed(1)}%`)

  // ── 6. concepts BELOW contract — named, because each is a lesson that
  //      cannot close without the model volunteering a gradeable question.
  const below = [...byConcept.values()].filter((r) => r.contract === 'FAIL')
  console.log(`\n── concepts BELOW the asset contract: ${below.length} ──`)
  for (const r of below.slice(0, 40)) {
    console.log(`  FAIL ${r.conceptId.padEnd(46)} expl=${r.explanations} closed=${r.closedChoice} open=${r.openRecall}`)
  }
  if (below.length > 40) console.log(`  ... and ${below.length - 40} more`)

  // ── 7. KG concepts with NO serving assets at all ─────────────────────────
  console.log('\n── KG concepts with NO authored serving assets ──')
  let totalUnserved = 0
  const unservedSamples: Record<string, string[]> = {}
  for (const s of SUBJECTS) {
    const unserved = kgNodeIds(s).filter((id) => !byConcept.has(id))
    totalUnserved += unserved.length
    unservedSamples[s] = unserved.slice(0, 5)
    console.log(`  ${s.padEnd(10)} ${String(unserved.length).padStart(4)} unserved` +
      (unserved.length ? `   e.g. ${unserved.slice(0, 3).join(', ')}` : ''))
  }
  console.log(`  ${'TOTAL'.padEnd(10)} ${String(totalUnserved).padStart(4)} unserved`)

  // ── 8. probe gradeability verdict (P0-class) ─────────────────────────────
  console.log('\n── probe gradeability: every closed-choice probe needs EXACTLY one correct choice ──')
  const totalClosed = probes.filter((p) => isClosedChoice(p) && subjectOf(p.conceptId)).length
  if (ungradeable.length === 0) {
    console.log(`  PASS  ${totalClosed}/${totalClosed} closed-choice probes are gradeable (exactly one isCorrect)`)
  } else {
    console.log(`  FAIL  ${ungradeable.length} of ${totalClosed} probes are UNGRADEABLE:`)
    for (const u of ungradeable.slice(0, 25)) {
      console.log(`        ${u.correct} correct choices — ${u.conceptId}: "${u.stem}"`)
    }
  }

  // ── 9. band coverage — the Phase-5-adjacent defect class: a concept taught
  //      at a band with every probe at a DIFFERENT band scores 60 against a
  //      threshold of 65 in matcher.ts, so the gate pool is empty and the
  //      lesson cannot close even though the concept "has 3 probes".
  console.log('\n── per-(concept, band) contract: taught at a band with no gradeable probe AT that band ──')
  const bandPairs = new Map<string, { expl: number; closed: number }>()
  for (const e of explanations) {
    if (!subjectOf(e.conceptId)) continue
    const k = `${e.conceptId}|${e.gradeBand}`
    const v = bandPairs.get(k) ?? { expl: 0, closed: 0 }
    v.expl++; bandPairs.set(k, v)
  }
  for (const p of probes) {
    if (!subjectOf(p.conceptId) || !isClosedChoice(p)) continue
    const k = `${p.conceptId}|${p.gradeBand}`
    const v = bandPairs.get(k) ?? { expl: 0, closed: 0 }
    v.closed++; bandPairs.set(k, v)
  }
  const taughtPairs = [...bandPairs.entries()].filter(([, v]) => v.expl > 0)
  const starvedPairs = taughtPairs.filter(([, v]) => v.closed < 3)
  const zeroProbePairs = taughtPairs.filter(([, v]) => v.closed === 0)
  console.log(`  taught (concept,band) pairs: ${taughtPairs.length}`)
  console.log(`  ${zeroProbePairs.length === 0 ? 'PASS' : 'FAIL'}  pairs taught with ZERO gradeable probe at that band: ${zeroProbePairs.length}`)
  for (const [k, v] of zeroProbePairs.slice(0, 25)) console.log(`        ${k}  expl=${v.expl} closed=0`)
  console.log(`  INFO  pairs below 3 gradeable probes at that band: ${starvedPairs.length}` +
    ' (adjacent-band probes may still serve; see matcher.ts band scoring)')

  // ── 10. summary ──────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(78))
  console.log('STRUCTURAL VERDICT')
  console.log('='.repeat(78))
  const checks: [string, Verdict, string][] = [
    ['serving coverage of implemented curriculum', totalServed === kgTotal ? 'PASS' : 'FAIL',
      `${totalServed}/${kgTotal} concepts hold authored serving assets`],
    ['asset contract satisfied per concept', below.length === 0 ? 'PASS' : 'FAIL',
      `${totalPass}/${totalServed} concepts meet ${ASSET_CONTRACT_VERSION}`],
    ['every closed-choice probe is gradeable', ungradeable.length === 0 ? 'PASS' : 'FAIL',
      `${totalClosed - ungradeable.length}/${totalClosed} have exactly one correct choice`],
    ['no taught band is left with zero gradeable probes', zeroProbePairs.length === 0 ? 'PASS' : 'FAIL',
      `${taughtPairs.length - zeroProbePairs.length}/${taughtPairs.length} taught (concept,band) pairs`],
  ]
  for (const [what, v, detail] of checks) console.log(`  [${v}] ${what}\n         ${detail}`)
  console.log('\nNOTE: this certifies the SOURCE corpus and the runtime contract. Whether a')
  console.log('given row is ACTIVE in production is a database fact this session cannot read')
  console.log('(Supabase MCP lists 0 projects) — reported as UNKNOWN, never as PASS.')
}

main()
