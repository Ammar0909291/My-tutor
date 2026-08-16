import fs from 'node:fs'; import path from 'node:path'
import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
const BP = path.join(process.cwd(), 'docs/curriculum/blueprints')
const norm = (i: string) => i.replace(/^MC-?/, 'MC').toUpperCase()
const probes = [...SEED_PROBES, ...AUTHORED_PROBES].filter((p:any)=>p.conceptId.startsWith('phys.')) as any[]
const concepts = [...new Set(probes.map(p=>p.conceptId))].sort()
let full=0
const rows: string[] = []
for (const c of concepts) {
  const f = path.join(BP, `${c}.md`); if (!fs.existsSync(f)) continue
  const groups: string[][] = []
  for (const raw of fs.readFileSync(f,'utf8').split('\n')) { const l=raw.trim()
    const h = /^#+\s*(MC-?[A-Za-z0-9/=-]+?)\s*(?::\s*(MC-[A-Za-z0-9/=-]+?))?\s*(?:\(|$|:|\s—)/.exec(l)
    if (h) groups.push(h[2] ? [h[1],h[2]] : [h[1]])
    const r = /^\|\s*(MC-[A-Z][A-Za-z0-9/=-]{3,})\s*\|/.exec(l); if (r) groups.push([r[1]]) }
  const seen=new Set<string>(); const uniq=groups.filter(g=>{const k=norm(g[0]); if(seen.has(k))return false; seen.add(k); return true})
  if (!uniq.length) continue
  const mine = probes.filter(p=>p.conceptId===c)
  const tagged = new Set(mine.flatMap(p=>(p.targetedMisconceptions??[]).map((t:string)=>norm(String(t).split(':').pop()!))))
  const missing = uniq.filter(g=>!g.some(id=>tagged.has(norm(id))))
  if (!missing.length) { full++; continue }
  const bands = [...new Set(mine.map(p=>p.gradeBand))].join(',')
  const kinds = [...new Set(mine.map(p=>p.probeKind))].sort().join(',')
  rows.push(`${c}\t${missing.map(m=>m.join('/')).join(' | ')}\tbands=${bands}\tkinds=${kinds}`)
}
console.log(`concepts fully S2-covered: ${full}/${concepts.length}`)
console.log(rows.join('\n'))
