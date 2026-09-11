/**
 * ENGLISH ADULT-BAND PROBE-CONTRACT AUDIT.
 *
 * The native-band probe-contract campaign (batches 1-10, commit 0ebf3cd) took
 * every applicable English concept to >= 3 closed-choice probes at its NATIVE
 * KG-derived band. It deliberately left the ADULT band untouched, flagging it
 * in batch 1's header as an open scope question: "every English concept
 * apparently carries an authored ADULT-band explanation ... but none was ever
 * given ADULT-band assessment probes."
 *
 * This matters concretely, not just structurally: `studentState.ts`'s
 * `gradeToGradeBand` defaults a learner with no school grade on file (the
 * common case for a self-directed adult Library learner) to ADULT. The
 * matcher's `scoreMatch` gives HIGH<->ADULT a +15 compatibility bonus (score
 * 65, exactly the threshold) — but EARLY/ELEMENTARY/MIDDLE native-band
 * concepts have NO such bonus for an ADULT learner: distance >= 2 scores 50,
 * below the 65 threshold, with a message-token-overlap bonus (max +15) as the
 * only rescue. So an ADULT-band learner studying a MIDDLE-band-native English
 * concept (the majority of grammar/vocabulary/composition concepts) gets
 * essentially zero authored closed-choice probes today.
 *
 * Reads the real seed corpus in git only. Zero DB access, zero egress.
 */
import { ENGLISH_BAND_GAP_PROBES } from '../../src/lib/teaching/assets/englishBandGapAssets'
import { ENGLISH_PROBE_BATCH_1 } from '../../src/lib/teaching/assets/englishProbeBatch1'
import { ENGLISH_BATCH_1_DEPTH_4 } from '../../src/lib/teaching/assets/englishBatch1Depth4'
import { ENGLISH_PROBE_BATCH_2 } from '../../src/lib/teaching/assets/englishProbeBatch2'
import { ENGLISH_PROBE_BATCH_3 } from '../../src/lib/teaching/assets/englishProbeBatch3'
import { ENGLISH_PROBE_BATCH_4 } from '../../src/lib/teaching/assets/englishProbeBatch4'
import { ENGLISH_PROBE_BATCH_5 } from '../../src/lib/teaching/assets/englishProbeBatch5'
import { ENGLISH_PROBE_BATCH_6 } from '../../src/lib/teaching/assets/englishProbeBatch6'
import { ENGLISH_PROBE_BATCH_7 } from '../../src/lib/teaching/assets/englishProbeBatch7'
import { ENGLISH_PROBE_BATCH_8 } from '../../src/lib/teaching/assets/englishProbeBatch8'
import { ENGLISH_PROBE_BATCH_9 } from '../../src/lib/teaching/assets/englishProbeBatch9'
import { ENGLISH_PROBE_BATCH_10 } from '../../src/lib/teaching/assets/englishProbeBatch10'
import { ENGLISH_ADULT_BAND_BATCH_1 } from '../../src/lib/teaching/assets/englishAdultBandBatch1'
import { ENGLISH_ADULT_BAND_BATCH_2 } from '../../src/lib/teaching/assets/englishAdultBandBatch2'
import { ENGLISH_ADULT_BAND_BATCH_3 } from '../../src/lib/teaching/assets/englishAdultBandBatch3'
import { ENGLISH_ADULT_BAND_BATCH_4 } from '../../src/lib/teaching/assets/englishAdultBandBatch4'
import { ENGLISH_ADULT_BAND_BATCH_5 } from '../../src/lib/teaching/assets/englishAdultBandBatch5'
import { ENGLISH_ADULT_BAND_BATCH_6 } from '../../src/lib/teaching/assets/englishAdultBandBatch6'
import { ENGLISH_ADULT_BAND_BATCH_7 } from '../../src/lib/teaching/assets/englishAdultBandBatch7'
import { ENGLISH_ADULT_BAND_BATCH_8 } from '../../src/lib/teaching/assets/englishAdultBandBatch8'
import type { SeedProbe } from '../../src/lib/teaching/assets/brainSeedAssets'
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'

// This will be extended in-place by each ADULT-band batch as it lands
// (mirroring how seed-knowledge-assets.ts accumulates batches), so the audit
// always reflects the corpus that actually exists in git.
export const ADULT_PROBE_SOURCES: SeedProbe[] = [
  ...ENGLISH_BAND_GAP_PROBES, ...ENGLISH_PROBE_BATCH_1, ...ENGLISH_BATCH_1_DEPTH_4,
  ...ENGLISH_PROBE_BATCH_2, ...ENGLISH_PROBE_BATCH_3, ...ENGLISH_PROBE_BATCH_4,
  ...ENGLISH_PROBE_BATCH_5, ...ENGLISH_PROBE_BATCH_6, ...ENGLISH_PROBE_BATCH_7,
  ...ENGLISH_PROBE_BATCH_8, ...ENGLISH_PROBE_BATCH_9, ...ENGLISH_PROBE_BATCH_10,
  ...ENGLISH_ADULT_BAND_BATCH_1, ...ENGLISH_ADULT_BAND_BATCH_2, ...ENGLISH_ADULT_BAND_BATCH_3,
  ...ENGLISH_ADULT_BAND_BATCH_4, ...ENGLISH_ADULT_BAND_BATCH_5, ...ENGLISH_ADULT_BAND_BATCH_6,
  ...ENGLISH_ADULT_BAND_BATCH_7, ...ENGLISH_ADULT_BAND_BATCH_8,
]

const isClosedChoice = (p: SeedProbe): boolean => Array.isArray(p.choices) && p.choices.length >= 2

export const ORAL_FIRST_EXEMPT = new Set([
  'eng.phonics.phonemic-awareness',
  'eng.phonics.letter-sound-correspondence',
])

/**
 * `matcher.ts`'s `isHighAdultCompatible` gives a HIGH-native probe a +15
 * bonus against an ADULT learner (score 65, exactly DEFAULT_CONFIDENCE_
 * THRESHOLD) -- so a HIGH-native concept's EXISTING probes already clear the
 * mastery bar for an ADULT learner without any new ADULT-band authoring.
 * EARLY/ELEMENTARY/MIDDLE/UNDERGRADUATE get no such bonus (distance-based
 * score never reaches 65) and are the genuine gap. Computed here so the
 * "next batch" selection doesn't waste authoring effort on concepts that
 * already work -- confirmed live in Group 1 QA that ADULT probes ARE needed
 * (and ARE served) for EARLY/ELEMENTARY-native concepts.
 */
function nativeBandOf(id: string): string | null {
  const kg = getKnowledgeGraph('english')
  if (!kg) return null
  const node = getAllNodes(kg).find((n) => n.id === id) as { difficulty?: string } | undefined
  return node?.difficulty ?? null
}

export function computeAdultGap(): {
  adultGap: string[]; adultPartial: string[]; adultOk: string[]; kgIds: string[]
  trueGap: string[]; alreadyCoveredByHighAdultBonus: string[]
} {
  const kg = getKnowledgeGraph('english')
  const kgIds = kg ? getAllNodes(kg).map((n) => n.id) : []
  const byConceptBand = new Map<string, Map<string, number>>()
  const nativeBand = new Map<string, string>()
  for (const p of ADULT_PROBE_SOURCES) {
    if (!p.conceptId.startsWith('eng.')) continue
    if (!isClosedChoice(p)) continue
    let m = byConceptBand.get(p.conceptId)
    if (!m) { m = new Map(); byConceptBand.set(p.conceptId, m) }
    m.set(p.gradeBand, (m.get(p.gradeBand) ?? 0) + 1)
    if (p.gradeBand !== 'ADULT') nativeBand.set(p.conceptId, p.gradeBand)
  }
  const adultGap: string[] = []
  const adultPartial: string[] = []
  const adultOk: string[] = []
  const trueGap: string[] = []
  const alreadyCoveredByHighAdultBonus: string[] = []
  for (const id of kgIds) {
    if (ORAL_FIRST_EXEMPT.has(id)) continue
    const m = byConceptBand.get(id) ?? new Map()
    const n = m.get('ADULT') ?? 0
    if (n === 0) adultGap.push(id)
    else if (n < 3) adultPartial.push(id)
    else adultOk.push(id)

    if (n >= 3) continue // already at contract at ADULT directly
    const nb = nativeBand.get(id)
    if (nb === 'HIGH') alreadyCoveredByHighAdultBonus.push(id)
    else trueGap.push(id)
  }
  return { adultGap, adultPartial, adultOk, kgIds, trueGap, alreadyCoveredByHighAdultBonus }
}

function main(): void {
  const { adultGap, adultPartial, adultOk, kgIds, trueGap, alreadyCoveredByHighAdultBonus } = computeAdultGap()
  console.log('='.repeat(80))
  console.log('ENGLISH ADULT-BAND PROBE-CONTRACT AUDIT')
  console.log('='.repeat(80))
  console.log(`KG concepts: ${kgIds.length}   oral-first exempt: ${ORAL_FIRST_EXEMPT.size}`)
  console.log(`applicable: ${kgIds.length - ORAL_FIRST_EXEMPT.size}`)
  console.log(`ADULT zero closed-choice : ${adultGap.length}`)
  console.log(`ADULT partial (1-2)      : ${adultPartial.length}`)
  console.log(`ADULT >= 3 (at contract) : ${adultOk.length}`)
  console.log(`\nOf the ${adultGap.length + adultPartial.length} short of ADULT contract:`)
  console.log(`  already covered via HIGH<->ADULT matcher bonus (no new probes needed): ${alreadyCoveredByHighAdultBonus.length}`)
  console.log(`  TRUE remaining gap (EARLY/ELEMENTARY/MIDDLE/UNDERGRADUATE native)    : ${trueGap.length}`)
  console.log('\nFirst 60 TRUE-gap concepts, KG order (this is what future batches should target):')
  trueGap.slice(0, 60).forEach((id, i) => console.log(`${String(i + 1).padStart(3)}. ${id}`))
}

if (require.main === module) main()
