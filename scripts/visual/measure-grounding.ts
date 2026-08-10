/**
 * How much of the curriculum can the engine honestly draw?
 *
 * A figure is generated FROM a topic's own words and judged AGAINST them, so a
 * topic with no describable text is declined before any model is asked. That
 * threshold — `MIN_GROUNDING_CHARS` — is the quietest limit on coverage in the
 * whole engine, and nobody had measured what it actually excludes.
 *
 *   npx tsx scripts/visual/measure-grounding.ts
 *
 * Reads the canonical KGs only. No database, no provider, no network.
 */

import { MIN_GROUNDING_CHARS } from '../../src/lib/teaching/visual/topicIdentity'
import { createSubjectAdapter } from '../../src/lib/curriculum/subjectKgAdapter'

/** Directory names under docs/, which is what the adapter takes. */
const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'english'] as const

function main() {
  console.log(`grounding floor: ${MIN_GROUNDING_CHARS} characters of description\n`)
  let total = 0
  let grounded = 0
  const rows: string[] = []

  for (const subject of SUBJECTS) {
    const nodes = createSubjectAdapter(subject).getNodes()
    if (!nodes?.length) { rows.push(`${subject.padEnd(18)} (no KG registered)`); continue }
    let ok = 0
    let empty = 0
    const lengths: number[] = []
    for (const n of nodes) {
      const d = (n.description ?? '').trim()
      lengths.push(d.length)
      if (!d.length) empty++
      if (d.length >= MIN_GROUNDING_CHARS) ok++
    }
    lengths.sort((a, b) => a - b)
    const median = lengths[Math.floor(lengths.length / 2)]
    total += nodes.length
    grounded += ok
    rows.push(
      `${subject.padEnd(18)} ${String(ok).padStart(4)}/${String(nodes.length).padEnd(5)} ` +
      `${((ok / nodes.length) * 100).toFixed(1).padStart(5)}%   median ${String(median).padStart(4)} chars   ` +
      `${empty} with no description`,
    )
  }

  console.log(rows.join('\n'))
  console.log(`\nTOTAL ${grounded}/${total} = ${((grounded / total) * 100).toFixed(1)}% of KG concepts clear the grounding floor`)
  console.log(`${total - grounded} concepts can never receive a generated figure — they are declined before any model call.`)
}

main()
