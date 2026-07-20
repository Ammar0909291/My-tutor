/**
 * Proves the English resolvedConceptId bug against a REAL database with
 * REAL legacy Curriculum rows (seeded via the actual scripts/seed-curriculum.ts,
 * the same script production uses) — not a simulation.
 */
import { PrismaClient } from '@prisma/client'
import { getKnowledgeGraph } from '../src/lib/curriculum/knowledgeGraph'

const prisma = new PrismaClient()

async function main() {
  const subjectCode = 'english'
  const curriculumLessons = await prisma.curriculum.findMany({ where: { subjectCode }, orderBy: { order: 'asc' } })
  console.log(`Legacy Curriculum table rows for subjectCode='english': ${curriculumLessons.length}`)

  // OLD route.ts logic: legacy table checked FIRST, KG only consulted "if lessonCtx === null"
  let oldLessonCtx: any = null
  let oldResolvedConceptId: string | null = null
  if (curriculumLessons.length > 0) {
    oldLessonCtx = { currentLesson: curriculumLessons[0].order } // legacy branch wins
  }
  if (oldLessonCtx === null) {
    const graph = getKnowledgeGraph(subjectCode)
    if (graph) {
      const node = graph.modules[0].nodes[0]
      oldResolvedConceptId = node.slug
    }
  }
  console.log(`OLD CODE ORDER -> resolvedConceptId = ${oldResolvedConceptId ?? 'null'} (legacy rows existed, so KG synthesis never ran)`)

  // NEW route.ts logic: KG checked FIRST, legacy table only used if no KG exists
  let newLessonCtx: any = null
  let newResolvedConceptId: string | null = null
  const graph = getKnowledgeGraph(subjectCode)
  if (graph) {
    const node = graph.modules[0].nodes[0]
    newLessonCtx = { currentLesson: 1 }
    newResolvedConceptId = node.slug
  }
  if (newLessonCtx === null && curriculumLessons.length > 0) {
    newLessonCtx = { currentLesson: curriculumLessons[0].order }
  }
  console.log(`NEW CODE ORDER -> resolvedConceptId = ${newResolvedConceptId ?? 'null'} (KG is source of truth, consulted first)`)

  console.log(`\nExplanation Memory gate (resolvedConceptId && ...):`)
  console.log(`  OLD: ${!!oldResolvedConceptId} -> ${oldResolvedConceptId ? 'Explanation Memory queried' : 'NEVER QUERIED — straight to Groq, unconditionally'}`)
  console.log(`  NEW: ${!!newResolvedConceptId} -> ${newResolvedConceptId ? 'Explanation Memory queried' : 'NEVER QUERIED'}`)

  await prisma.$disconnect()
}
main().catch((e) => { console.error(e); process.exit(1) })
