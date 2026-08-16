import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
const all=[...SEED_PROBES,...AUTHORED_PROBES] as any[]
const m=new Map<string,number>()
for(const p of all){ if(!p.conceptId.startsWith('phys.')) continue
  const k=`${p.conceptId}|${p.probeKind}|${p.gradeBand}`; m.set(k,(m.get(k)??0)+1) }
const tf=[...m.entries()].filter(([k,v])=>k.includes('|true_false|'))
console.log('true_false slots in physics:', tf.length, '| any with >1 probe:', tf.filter(([,v])=>v>1).length)
for (const [k,v] of tf.filter(([,v])=>v>1)) console.log('  COLLISION', k, v)
