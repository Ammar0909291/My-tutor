import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
const all=[...SEED_PROBES,...AUTHORED_PROBES,...CHEMISTRY_PROBES] as any[]
console.log([...new Set(all.map(p=>p.probeKind))].sort().join(', '))
