import fs from 'node:fs'; import path from 'node:path'
import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
const BP = path.join(process.cwd(), 'docs/curriculum/blueprints')
function bpIds(c: string) { const f = path.join(BP, `${c}.md`); if (!fs.existsSync(f)) return new Set<string>()
  const s = new Set<string>()
  for (const raw of fs.readFileSync(f,'utf8').split('\n')) { const l = raw.trim()
    const h = /^#+\s*(MC-?[A-Za-z0-9/=-]+?)\s*(?::\s*(MC-[A-Za-z0-9/=-]+?))?\s*(?:\(|$|:|\s—)/.exec(l)
    if (h) { s.add(h[1]); if (h[2]) s.add(h[2]) }
    const r = /^\|\s*(MC-[A-Z][A-Za-z0-9/=-]{3,})\s*\|/.exec(l); if (r) s.add(r[1]) } return s }
const norm = (i: string) => i.replace(/^MC-?/, 'MC').toUpperCase()
const sets: Record<string, any[]> = {
  physics: [...SEED_PROBES, ...AUTHORED_PROBES].filter((p:any)=>p.conceptId.startsWith('phys.')),
  chemistry: CHEMISTRY_PROBES as any[],
}
for (const [name, probes] of Object.entries(sets)) {
  const concepts = [...new Set(probes.map((p:any)=>p.conceptId))].sort()
  let totalMC=0, probed=0
  const unprobedByConcept: Record<string,string[]> = {}
  const unprobedTally: Record<string,number> = {}
  for (const c of concepts) {
    const known = [...bpIds(c)]
    if (!known.length) continue
    // dedupe dual ids: MC-2 and MC-M=0-IS-DARK on one heading are ONE misconception.
    const groups: string[][] = []
    const f = path.join(BP, `${c}.md`)
    for (const raw of fs.readFileSync(f,'utf8').split('\n')) { const l=raw.trim()
      const h = /^#+\s*(MC-?[A-Za-z0-9/=-]+?)\s*(?::\s*(MC-[A-Za-z0-9/=-]+?))?\s*(?:\(|$|:|\s—)/.exec(l)
      if (h) groups.push(h[2] ? [h[1],h[2]] : [h[1]])
      const r = /^\|\s*(MC-[A-Z][A-Za-z0-9/=-]{3,})\s*\|/.exec(l); if (r) groups.push([r[1]]) }
    const seen = new Set<string>(); const uniq = groups.filter(g=>{const k=norm(g[0]); if(seen.has(k))return false; seen.add(k); return true})
    const tagged = new Set(probes.filter((p:any)=>p.conceptId===c)
      .flatMap((p:any)=>(p.targetedMisconceptions??[]).map((t:string)=>norm(String(t).split(':').pop()!))))
    for (const g of uniq) {
      totalMC++
      if (g.some(id=>tagged.has(norm(id)))) probed++
      else { (unprobedByConcept[c] ??= []).push(g.join('/')); unprobedTally[g[0]] = (unprobedTally[g[0]]??0)+1 }
    }
  }
  console.log(`\n=== ${name.toUpperCase()} S2: ${probed}/${totalMC} documented misconceptions have a probe (${(100*probed/totalMC).toFixed(1)}%)`)
  console.log(`    unprobed: ${totalMC-probed} across ${Object.keys(unprobedByConcept).length} concepts`)
  const top = Object.entries(unprobedTally).sort((a,b)=>b[1]-a[1]).slice(0,8)
  console.log('    most common unprobed ids: ' + top.map(([k,v])=>`${k} x${v}`).join(', '))
}
