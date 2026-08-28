/**
 * List KG concepts in a domain that have no remediation card yet, each with
 * its Educational Brain anti-analogy note (if one exists) so a card can be
 * grounded in it rather than invented.
 *
 * Built for the physics remediation-card campaign (2026-08-27, all 238
 * physics concepts carded across 13 batches); generalised here for reuse on
 * other subjects, starting with chemistry.
 *
 * Usage:
 *   node scripts/remediation/needCards.mjs <subject> <domainPrefix>
 *   node scripts/remediation/needCards.mjs chemistry chem.found
 *   node scripts/remediation/needCards.mjs physics phys.mech
 */
import fs from 'node:fs'

const subject = process.argv[2]
const dom = process.argv[3]
if (!subject || !dom) {
  console.error('usage: node scripts/remediation/needCards.mjs <subject> <domainPrefix>')
  process.exit(1)
}

const g = JSON.parse(fs.readFileSync(`docs/${subject}/kg/graph.json`, 'utf8'))
const cardsSrc = fs.readFileSync('src/lib/teaching/remediationCards.ts', 'utf8')
const have = new Set([...cardsSrc.matchAll(/conceptId: '([^']+)'/g)].map((m) => m[1]))
const list = g.concepts.filter((c) => c.id.startsWith(dom) && !have.has(c.id))

for (const c of list) {
  const f = `educational-brain/concepts/${subject}/${c.id}.md`
  let anti = ''
  if (fs.existsSync(f)) {
    const t = fs.readFileSync(f, 'utf8')
    const m = t.match(/\*\*Anti-analog[^*]*\*\*:?([\s\S]{0,260}?)(?:\n\n|\n\*\*)/i)
    if (m) anti = m[1].replace(/\s+/g, ' ').trim().slice(0, 200)
  }
  console.log(`${c.id} | ${c.name} | ${c.description}${anti ? `\n   ANTI: ${anti}` : ''}`)
}
console.log(`\n${dom}: ${list.length} uncovered`)
