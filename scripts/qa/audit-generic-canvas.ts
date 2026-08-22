/**
 * P1 — audit every concept bound to a GENERIC CANVAS with no scene generator.
 *
 * A generic canvas (coordinate_plane / number_line) is a blank stage. It is
 * only meaningful when either (a) a generator draws the content, or (b) the
 * canvas ITSELF is the thing being taught. Anything else shows the learner an
 * empty grid while the tutor talks about something the grid does not depict —
 * which is the Angular Kinematics P0.
 *
 * This prints the evidence for a per-concept decision. It does not decide.
 *
 * Run: npx tsx scripts/qa/audit-generic-canvas.ts
 */
import { readFileSync } from 'node:fs'
import { getConceptVisualType, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'

const GENERIC_CANVAS = new Set(['coordinate_plane', 'number_line'])
const SUBJECT_OF: Record<string, string> = {
  phys: 'physics', math: 'mathematics', chem: 'chemistry',
  bio: 'biology', cs: 'computer_science', eng: 'english',
}

const src = readFileSync('src/lib/teaching/visualRegistry.ts', 'utf8')
const ids = [...new Set([...src.matchAll(/^\s*'([a-z_]+\.[a-z0-9_.-]+)':\s*\{/gm)].map((m) => m[1]))]

const graphs = new Map<string, ReturnType<typeof getKnowledgeGraph>>()
function titleOf(id: string): string {
  const subject = SUBJECT_OF[id.split('.')[0]]
  if (!subject) return '(unknown subject)'
  if (!graphs.has(subject)) graphs.set(subject, getKnowledgeGraph(subject))
  const g = graphs.get(subject) as unknown as { modules?: Array<{ nodes?: Array<{ id: string; slug?: string; title?: string }> }> } | null
  for (const mod of g?.modules ?? []) {
    for (const node of mod.nodes ?? []) {
      if (node.id === id || node.slug === id) return node.title ?? '(untitled)'
    }
  }
  return '(NOT IN KG — orphan key)'
}

const rows: Array<{ id: string; type: string; title: string }> = []
for (const id of ids) {
  const type = getConceptVisualType(id)
  if (!type || !GENERIC_CANVAS.has(type)) continue
  if (getConceptSceneGenerator(id)) continue
  rows.push({ id, type, title: titleOf(id) })
}

console.log(`${rows.length} concepts bound to a generic canvas with NO scene generator\n`)
for (const r of rows) {
  console.log(`${r.id.padEnd(40)} ${r.type.padEnd(17)} ${r.title}`)
}
