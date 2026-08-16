import fs from 'node:fs'
const KINDS=['mcq','true_false','short_answer','numeric','step_check','misconception_probe','checkpoint']
import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
const probes=[...SEED_PROBES,...AUTHORED_PROBES].filter((p:any)=>p.conceptId.startsWith('phys.')) as any[]
const lines = fs.readFileSync('scripts/tmp/s2detail.txt','utf8').split('\n').slice(1).filter(Boolean)
const byDomain: Record<string,string[]> = {}
for (const l of lines) {
  const [c, missing] = l.split('\t')
  const dom = c.split('.').slice(0,2).join('.')
  const mine = probes.filter(p=>p.conceptId===c)
  const bandCount: Record<string,number> = {}
  for (const p of mine) bandCount[p.gradeBand]=(bandCount[p.gradeBand]??0)+1
  const mainBand = Object.entries(bandCount).sort((a,b)=>b[1]-a[1])[0][0]
  const occupied = new Set(mine.filter(p=>p.gradeBand===mainBand).map(p=>p.probeKind))
  const free = KINDS.filter(k=>!occupied.has(k))
  ;(byDomain[dom] ??= []).push(`  ${c.padEnd(42)} missing=${missing.padEnd(52)} band=${mainBand} n=${mine.length} free=[${free.join(',')}]`)
}
let tot=0
for (const [d,rows] of Object.entries(byDomain).sort((a,b)=>b[1].length-a[1].length)) { console.log(`\n${d}  (${rows.length})`); console.log(rows.join('\n')); tot+=rows.length }
console.log(`\nTOTAL concepts with an unprobed misconception: ${tot}`)
