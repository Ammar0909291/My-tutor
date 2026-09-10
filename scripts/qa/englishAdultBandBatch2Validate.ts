import { ENGLISH_ADULT_BAND_BATCH_2 } from '../../src/lib/teaching/assets/englishAdultBandBatch2'
import { ENGLISH_ADULT_BAND_BATCH_1 } from '../../src/lib/teaching/assets/englishAdultBandBatch1'
import { abandonedLegacyProbeSlugs, buildProbeSlugResolver } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
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

const isEng = (p: { conceptId: string }) => p.conceptId.startsWith('eng.')
const ENGLISH_BEFORE = [
  ...AUTHORED_PROBES.filter(isEng), ...ENGLISH_BAND_GAP_PROBES,
  ...ENGLISH_PROBE_BATCH_1, ...ENGLISH_BATCH_1_DEPTH_4, ...ENGLISH_PROBE_BATCH_2,
  ...ENGLISH_PROBE_BATCH_3, ...ENGLISH_PROBE_BATCH_4, ...ENGLISH_PROBE_BATCH_5,
  ...ENGLISH_PROBE_BATCH_6, ...ENGLISH_PROBE_BATCH_7, ...ENGLISH_PROBE_BATCH_8,
  ...ENGLISH_PROBE_BATCH_9, ...ENGLISH_PROBE_BATCH_10, ...ENGLISH_ADULT_BAND_BATCH_1,
]
const ENGLISH_AFTER = [...ENGLISH_BEFORE, ...ENGLISH_ADULT_BAND_BATCH_2]

let failures = 0
function check(cond: boolean, msg: string) {
  if (!cond) { console.log('FAIL:', msg); failures++ }
}

console.log(`Batch size: ${ENGLISH_ADULT_BAND_BATCH_2.length} (expect 30)`)
check(ENGLISH_ADULT_BAND_BATCH_2.length === 30, 'batch size')

for (const p of ENGLISH_ADULT_BAND_BATCH_2) {
  const correct = (p.choices ?? []).filter((c) => c.isCorrect)
  check(correct.length === 1, `${p.conceptId}/${p.probeKind}/${p.difficulty}: exactly one correct (got ${correct.length})`)
  check((p.choices ?? []).length >= 2, `${p.conceptId}/${p.probeKind}/${p.difficulty}: >=2 choices`)
  check(p.gradeBand === 'ADULT', `${p.conceptId}: gradeBand ADULT`)
}

const existingMisconceptionIds = new Set<string>()
for (const p of ENGLISH_BEFORE) for (const id of p.targetedMisconceptions ?? []) existingMisconceptionIds.add(id)
for (const p of ENGLISH_ADULT_BAND_BATCH_2) {
  for (const c of p.choices ?? []) {
    if (!c.isCorrect) {
      check(!!c.misconceptionId, `${p.conceptId}: wrong choice has misconceptionId`)
      if (c.misconceptionId) {
        check(existingMisconceptionIds.has(c.misconceptionId), `${p.conceptId}: misconceptionId ${c.misconceptionId} REUSED from existing corpus (not invented)`)
      }
    }
  }
}

const stems = new Map<string, number>()
for (const p of ENGLISH_ADULT_BAND_BATCH_2) stems.set(p.stem, (stems.get(p.stem) ?? 0) + 1)
for (const [stem, n] of stems) check(n === 1, `duplicate stem (${n}x): ${stem.slice(0, 60)}`)
const priorStems = new Set(ENGLISH_BEFORE.map((p) => p.stem.trim().toLowerCase()))
for (const p of ENGLISH_ADULT_BAND_BATCH_2) {
  check(!priorStems.has(p.stem.trim().toLowerCase()), `stem duplicates a PRE-EXISTING English probe: ${p.stem.slice(0, 60)}`)
}

for (const p of ENGLISH_ADULT_BAND_BATCH_2) {
  const correct = p.choices!.find((c) => c.isCorrect)!
  const wrongs = p.choices!.filter((c) => !c.isCorrect)
  for (const w of wrongs) {
    const ratio = correct.text.length / w.text.length
    if (ratio > 3.5 || ratio < 0.3) console.log(`WARN length ratio ${ratio.toFixed(2)} on ${p.conceptId}/${p.probeKind}/${p.difficulty}`)
  }
}

const abandonedBefore = abandonedLegacyProbeSlugs(ENGLISH_BEFORE)
const abandonedAfter = abandonedLegacyProbeSlugs(ENGLISH_AFTER)
const newlyAbandoned = [...abandonedAfter].filter((s) => !abandonedBefore.has(s))
console.log(`Newly-abandoned English slugs caused by this batch: ${newlyAbandoned.length}`)
const resolveBefore = buildProbeSlugResolver(ENGLISH_BEFORE)
const preExistingSlugs = new Set(ENGLISH_BEFORE.map((p) => resolveBefore(p)))
for (const slug of newlyAbandoned) {
  if (preExistingSlugs.has(slug)) {
    console.log('DANGER: this batch re-identifies a PRE-EXISTING probe slug:', slug)
    failures++
  }
}

const resolveAfter = buildProbeSlugResolver(ENGLISH_AFTER)
const slugCounts = new Map<string, number>()
for (const p of ENGLISH_AFTER) {
  const slug = resolveAfter(p)
  slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1)
}
for (const [slug, n] of slugCounts) check(n === 1, `slug collision: ${slug} (${n}x)`)

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} FAILURES`)
process.exit(failures === 0 ? 0 : 1)
