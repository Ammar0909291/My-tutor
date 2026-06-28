// Educational Brain Phase 2, Milestone 1, doc 10 §9 steps 2-3 — deterministic
// backfill of EbConcept + EbConceptEdge + EbMisconception + EbConceptMisconception
// for ONE subject (physics), from the existing legacy data sources:
//   - src/lib/education/physicsKnowledgeGraph.ts  (KnowledgeNode[])
//   - src/lib/school/adaptive/misconceptionEngine.ts (RULES, physics.* subset)
// Pure, idempotent upsert. No legacy table is touched or removed.
import { PrismaClient } from '@prisma/client'
import { PHYSICS_KNOWLEDGE_GRAPH } from '../src/lib/education/physicsKnowledgeGraph.ts'
import { RULES } from '../src/lib/school/adaptive/misconceptionEngine.ts'

const prisma = new PrismaClient()

const GRADE_BAND_BY_DIFFICULTY = {
  foundational: 'g_9_10',
  developing: 'g_9_10',
  proficient: 'g_11_12',
  advanced: 'g_11_12',
}

// Best-effort link from the school-mode misconception taxonomy's slug
// fragments (e.g. 'physics.forces.') to the closest physicsKnowledgeGraph
// concept id. Documented mapping, not inferred at runtime.
const MISCONCEPTION_TO_CONCEPT = {
  'physics.forces.': ['physics.laws_of_motion'],
  'physics.kinematics.': ['physics.kinematics_1d', 'physics.kinematics_2d'],
  'physics.gravitation.': ['physics.gravitation'],
  'physics.forces.laws_of_motion': ['physics.laws_of_motion'],
  'physics.electricity.current_circuits': ['physics.current_electricity'],
  'physics.electricity.electrostatics': ['physics.electrostatics'],
  'physics.thermodynamics.': ['physics.thermodynamics'],
}

async function main() {
  let conceptCount = 0
  for (const node of PHYSICS_KNOWLEDGE_GRAPH) {
    await prisma.ebConcept.upsert({
      where: { id: node.id },
      create: {
        id: node.id,
        title: node.title,
        description: node.description,
        primaryDomain: node.domain,
        alsoInDomains: [],
        abstractionLevel: 'concrete',
        modality: ['symbolic', 'linguistic'],
        difficultyByGrade: { [GRADE_BAND_BY_DIFFICULTY[node.difficulty] ?? 'g_9_10']: node.difficulty },
        estimatedMinutesToMastery: {},
        titleTranslations: {},
        descriptionTranslations: {},
      },
      update: {
        title: node.title,
        description: node.description,
        primaryDomain: node.domain,
      },
    })
    conceptCount++
  }

  let edgeCount = 0
  for (const node of PHYSICS_KNOWLEDGE_GRAPH) {
    for (const prereqId of node.prerequisites) {
      await prisma.ebConceptEdge.upsert({
        where: { fromConceptId_toConceptId_edgeKind: { fromConceptId: prereqId, toConceptId: node.id, edgeKind: 'prerequisite_of' } },
        create: { fromConceptId: prereqId, toConceptId: node.id, edgeKind: 'prerequisite_of', source: 'seed:physicsKnowledgeGraph.ts' },
        update: {},
      })
      edgeCount++
    }
  }

  const physicsRules = RULES.filter((r) => r.primaryPatterns.some((p) => p.startsWith('physics.')))
  let misconceptionCount = 0
  let linkCount = 0
  for (const rule of physicsRules) {
    const id = `physics.misconception.${rule.type}`
    await prisma.ebMisconception.upsert({
      where: { id },
      create: {
        id,
        title: rule.label,
        description: rule.description,
        scope: 'universal',
        prevalenceByGrade: {},
        detectableByProbeIds: [],
        repairableByAssetIds: [],
        source: 'seed:misconceptionEngine.ts',
      },
      update: { title: rule.label, description: rule.description },
    })
    misconceptionCount++

    const linkedConceptIds = new Set()
    for (const pattern of rule.primaryPatterns) {
      for (const conceptId of MISCONCEPTION_TO_CONCEPT[pattern] ?? []) linkedConceptIds.add(conceptId)
    }
    for (const conceptId of linkedConceptIds) {
      await prisma.ebConceptMisconception.upsert({
        where: { conceptId_misconceptionId: { conceptId, misconceptionId: id } },
        create: { conceptId, misconceptionId: id, confidence: 0.5, source: 'seed:misconceptionEngine.ts' },
        update: {},
      })
      linkCount++
    }
  }

  console.log(`Seeded ${conceptCount} EbConcept, ${edgeCount} EbConceptEdge, ${misconceptionCount} EbMisconception, ${linkCount} EbConceptMisconception links.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
