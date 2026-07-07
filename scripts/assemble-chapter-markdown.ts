/**
 * Chapter Markdown Assembler
 *
 * Deterministically renders one publication-quality Markdown chapter from
 * authored chunk files (the same chunk-*.json files consumed by
 * merge-teaching-asset-batch.ts) plus the canonical KG entries for a single
 * domain. Pure templating — no LLM call, no invented prose — every string in
 * the output was already authored by an upstream agent or pulled verbatim
 * from docs/{subject}/kg/graph.json (id, requires, unlocks, cross_links,
 * difficulty, bloom, mastery_threshold, estimated_hours, description).
 *
 * Each chunk JSON entry has the shape:
 *   {
 *     concept_id: string,
 *     asset: { learning_objective, concept_summary, key_ideas[],
 *               common_misconceptions[{misconception,correction}],
 *               visual_teaching_suggestions[], worked_example_blueprint,
 *               practice_blueprint, assessment_blueprint,
 *               real_world_applications[], prerequisite_review_triggers[] },
 *     chapter_extra: { vocabulary[{term,definition}], teacher_notes,
 *               student_notes, common_mistakes[], cross_topic_connections,
 *               revision_guidance },
 *   }
 *
 * Usage:
 *   npx tsx scripts/assemble-chapter-markdown.ts <chunksDir> <graphJsonPath> <domainPrefix> <outputMdPath>
 */

import fs from 'fs'
import path from 'path'

interface ChunkEntry {
  concept_id: string
  asset: {
    learning_objective: string
    concept_summary: string
    key_ideas: string[]
    common_misconceptions: { misconception: string; correction: string }[]
    visual_teaching_suggestions: string[]
    worked_example_blueprint: { setup: string; steps: string[]; expected_outcome: string }
    practice_blueprint: { item_types: string[]; difficulty_progression: string; suggested_count: number }
    assessment_blueprint: { formats: string[]; bloom_alignment: string; mastery_signal: string }
    real_world_applications: string[]
    prerequisite_review_triggers: string[]
  }
  chapter_extra: {
    vocabulary: { term: string; definition: string }[]
    teacher_notes: string
    student_notes: string
    common_mistakes: string[]
    cross_topic_connections: string
    revision_guidance: string
  }
}

interface GraphConcept {
  id: string
  name: string
  requires: string[]
  unlocks: string[]
  cross_links: string[]
  difficulty: string
  bloom: string
  mastery_threshold: number
  estimated_hours: number
  description: string
}

function readChunks(chunksDir: string): ChunkEntry[] {
  const files = fs.readdirSync(chunksDir).filter((f) => f.endsWith('.json')).sort()
  const all: ChunkEntry[] = []
  for (const f of files) {
    const entries: ChunkEntry[] = JSON.parse(fs.readFileSync(path.join(chunksDir, f), 'utf8'))
    all.push(...entries)
  }
  return all
}

function renderConcept(entry: ChunkEntry, concept: GraphConcept): string {
  const { asset: a, chapter_extra: x } = entry
  const lines: string[] = []

  lines.push(`### ${concept.name}`)
  lines.push('')
  lines.push(`*Concept ID: \`${concept.id}\` · Difficulty: ${concept.difficulty} · Bloom level: ${concept.bloom} · Mastery threshold: ${concept.mastery_threshold} · Estimated study time: ${concept.estimated_hours}h*`)
  lines.push('')
  lines.push(`**Learning objective.** ${a.learning_objective}`)
  lines.push('')
  lines.push(concept.description)
  lines.push('')
  lines.push(a.concept_summary)
  lines.push('')

  lines.push('**Key ideas**')
  lines.push('')
  for (const k of a.key_ideas) lines.push(`- ${k}`)
  lines.push('')

  if (x.vocabulary.length > 0) {
    lines.push('**Vocabulary**')
    lines.push('')
    for (const v of x.vocabulary) lines.push(`- **${v.term}** — ${v.definition}`)
    lines.push('')
  }

  lines.push('**Common misconceptions**')
  lines.push('')
  for (const m of a.common_misconceptions) {
    lines.push(`- *Misconception:* ${m.misconception}`)
    lines.push(`  *Correction:* ${m.correction}`)
  }
  lines.push('')

  if (x.common_mistakes.length > 0) {
    lines.push('**Common mistakes in practice**')
    lines.push('')
    for (const m of x.common_mistakes) lines.push(`- ${m}`)
    lines.push('')
  }

  lines.push('**Visual teaching opportunities**')
  lines.push('')
  for (const v of a.visual_teaching_suggestions) lines.push(`- ${v}`)
  lines.push('')

  lines.push('**Worked example**')
  lines.push('')
  lines.push(`*Setup:* ${a.worked_example_blueprint.setup}`)
  lines.push('')
  a.worked_example_blueprint.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`))
  lines.push('')
  lines.push(`*Outcome:* ${a.worked_example_blueprint.expected_outcome}`)
  lines.push('')

  lines.push('**Real-world intuition**')
  lines.push('')
  for (const r of a.real_world_applications) lines.push(`- ${r}`)
  lines.push('')

  lines.push('**Practice progression**')
  lines.push('')
  lines.push(`Item types: ${a.practice_blueprint.item_types.join(', ')}. Suggested item count: ${a.practice_blueprint.suggested_count}.`)
  lines.push('')
  lines.push(a.practice_blueprint.difficulty_progression)
  lines.push('')

  lines.push('**Assessment objectives**')
  lines.push('')
  lines.push(`Formats: ${a.assessment_blueprint.formats.join(', ')}. Bloom alignment: ${a.assessment_blueprint.bloom_alignment}.`)
  lines.push('')
  lines.push(`Mastery signal: ${a.assessment_blueprint.mastery_signal}`)
  lines.push('')

  lines.push('**Teacher notes**')
  lines.push('')
  lines.push(x.teacher_notes)
  lines.push('')

  lines.push('**Student notes**')
  lines.push('')
  lines.push(x.student_notes)
  lines.push('')

  const prereqNames = concept.requires.length > 0 ? concept.requires.join(', ') : 'none (root concept)'
  const unlockNames = concept.unlocks.length > 0 ? concept.unlocks.join(', ') : 'none yet mapped'
  const crossNames = concept.cross_links.length > 0 ? concept.cross_links.join(', ') : 'none'
  lines.push('**Prerequisite graph**')
  lines.push('')
  lines.push(`- Requires: ${prereqNames}`)
  lines.push(`- Unlocks (future prerequisite links): ${unlockNames}`)
  lines.push(`- Cross-topic connections (graph cross-links): ${crossNames}`)
  if (x.cross_topic_connections) lines.push(`- Narrative: ${x.cross_topic_connections}`)
  lines.push('')

  if (a.prerequisite_review_triggers.length > 0) {
    lines.push('**Teaching hints — review triggers**')
    lines.push('')
    for (const t of a.prerequisite_review_triggers) lines.push(`- ${t}`)
    lines.push('')
  }

  lines.push('**Spaced repetition / revision guidance**')
  lines.push('')
  lines.push(x.revision_guidance)
  lines.push('')

  lines.push('---')
  lines.push('')

  return lines.join('\n')
}

function main() {
  const [, , chunksDir, graphJsonPath, domainPrefix, outputMdPath] = process.argv
  if (!chunksDir || !graphJsonPath || !domainPrefix || !outputMdPath) {
    console.error('Usage: npx tsx scripts/assemble-chapter-markdown.ts <chunksDir> <graphJsonPath> <domainPrefix> <outputMdPath>')
    process.exit(1)
  }

  const graph = JSON.parse(fs.readFileSync(graphJsonPath, 'utf8'))
  const conceptsById = new Map<string, GraphConcept>(graph.concepts.map((c: GraphConcept) => [c.id, c]))
  const domainMeta = (graph.domains ?? []).find((d: { id_prefix: string }) => d.id_prefix === domainPrefix)

  const entries = readChunks(chunksDir)
  if (entries.length === 0) {
    console.error(`No chunk entries found in ${chunksDir}`)
    process.exit(1)
  }

  // Render in canonical graph order (the order concepts appear in graph.json),
  // not chunk-authoring order, so the chapter reads as a coherent sequence.
  const orderedIds = graph.concepts.map((c: GraphConcept) => c.id).filter((id: string) => id.startsWith(domainPrefix + '.'))
  const byId = new Map(entries.map((e) => [e.concept_id, e]))

  const missing = orderedIds.filter((id: string) => !byId.has(id))
  if (missing.length > 0) {
    console.error(`✗ ${missing.length} concept(s) in domain "${domainPrefix}" have no authored chunk entry — nothing written.`)
    for (const id of missing.slice(0, 20)) console.error(`  · ${id}`)
    process.exit(1)
  }

  const title = domainMeta?.domain_name ?? domainPrefix
  const header: string[] = []
  header.push(`# ${title}`)
  header.push('')
  header.push(`*My Tutor — Mathematics Knowledge Graph domain \`${domainPrefix}\`*`)
  header.push('')
  if (domainMeta) {
    header.push(`Level range: ${domainMeta.level_range[0]}–${domainMeta.level_range[1]} · Concepts in this chapter: ${orderedIds.length}`)
    header.push('')
  }
  header.push('This chapter is generated from the canonical Knowledge Graph (`graph.json`, frozen, read-only) plus authored teaching content validated against the existing `TeachingAssetSchema`. It is intended for students, teachers, and as a canonical AI teaching source.')
  header.push('')
  header.push('## Concepts in this chapter')
  header.push('')
  for (const id of orderedIds) {
    const c = conceptsById.get(id)
    header.push(`- [${c?.name ?? id}](#${(c?.name ?? id).toLowerCase().replace(/[^a-z0-9]+/g, '-')})`)
  }
  header.push('')
  header.push('---')
  header.push('')

  const body = orderedIds.map((id: string) => renderConcept(byId.get(id)!, conceptsById.get(id)!)).join('\n')

  fs.mkdirSync(path.dirname(outputMdPath), { recursive: true })
  fs.writeFileSync(outputMdPath, header.join('\n') + '\n' + body, 'utf8')

  console.log(`✓ Assembled ${orderedIds.length} concept(s) into ${outputMdPath}`)
  process.exit(0)
}

main()
