import { it } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'
import { CS_PROBES } from '@/lib/teaching/assets/csSeedAssets'
const ALL: any[] = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...BIOLOGY_PROBES, ...CS_PROBES]

it('report', () => {
  const out: string[] = []
  for (const dom of ['phys.therm.', 'phys.wave.']) {
    const ids = [...new Set(ALL.filter((p) => p.conceptId.startsWith(dom)).map((p) => p.conceptId))].sort()
    for (const id of ids) {
      const mine = ALL.filter((p) => p.conceptId === id)
      const gradeable = mine.filter((p) => probeToMcq({ stem: p.stem, choices: p.choices ?? null }))
      if (gradeable.length >= 3) continue
      const taken = mine.filter((p) => p.probeKind === 'mcq').map((p) => `${p.gradeBand}/${p.difficulty}`)
      out.push(`${id}  gradeable=${gradeable.length}  mcqSlotsTaken=[${taken.join(', ')}]`)
    }
  }
  out.forEach((l) => console.log('ROW ' + l))
  console.log('ROW TOTAL_SHORT=' + out.length)
})
