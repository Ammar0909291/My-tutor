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

// ── EbCurriculum / EbModule definitions ─────────────────────────────────────
// One curriculum: "CBSE Class 11-12 Physics" (covers the 29-node KG above).
// Modules map 1:1 to PHYSICS_TREE slugs from subjectCatalog.ts.
const PHYSICS_CURRICULUM_ID = 'eb.physics.cbse_11_12'
const PHYSICS_CURRICULUM = {
  id: PHYSICS_CURRICULUM_ID,
  title: 'CBSE Physics Class 11–12',
  authority: 'CBSE',
  grade: 12,
  language: 'en',
  effectiveFrom: new Date('2023-04-01'),
  metadata: { source: 'seed:subjectCatalog.ts PHYSICS_TREE' },
}

// Derived from subjectCatalog.ts PHYSICS_TREE (mod() calls, lines 272-280).
const PHYSICS_MODULES = [
  { id: 'eb.physics.mod.foundations',    title: 'Foundations',    orderIndex: 0, estimatedHours: 6  },
  { id: 'eb.physics.mod.motion',         title: 'Motion',         orderIndex: 1, estimatedHours: 6  },
  { id: 'eb.physics.mod.mechanics',      title: 'Mechanics',      orderIndex: 2, estimatedHours: 10 },
  { id: 'eb.physics.mod.energy',         title: 'Energy',         orderIndex: 3, estimatedHours: 8  },
  { id: 'eb.physics.mod.electricity',    title: 'Electricity',    orderIndex: 4, estimatedHours: 8  },
  { id: 'eb.physics.mod.magnetism',      title: 'Magnetism',      orderIndex: 5, estimatedHours: 8  },
  { id: 'eb.physics.mod.waves',          title: 'Waves',          orderIndex: 6, estimatedHours: 8  },
  { id: 'eb.physics.mod.thermodynamics', title: 'Thermodynamics', orderIndex: 7, estimatedHours: 8  },
  { id: 'eb.physics.mod.modern_physics', title: 'Modern Physics', orderIndex: 8, estimatedHours: 12 },
]

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

  // ── Step 4: EbCurriculum + EbModule ───────────────────────────────────────
  await prisma.ebCurriculum.upsert({
    where: { id: PHYSICS_CURRICULUM_ID },
    create: PHYSICS_CURRICULUM,
    update: { title: PHYSICS_CURRICULUM.title, authority: PHYSICS_CURRICULUM.authority },
  })

  let moduleCount = 0
  for (const mod of PHYSICS_MODULES) {
    await prisma.ebModule.upsert({
      where: { id: mod.id },
      create: { ...mod, curriculumId: PHYSICS_CURRICULUM_ID },
      update: { title: mod.title, orderIndex: mod.orderIndex, estimatedHours: mod.estimatedHours },
    })
    moduleCount++
  }

  console.log(`Seeded ${conceptCount} EbConcept, ${edgeCount} EbConceptEdge, ${misconceptionCount} EbMisconception, ${linkCount} EbConceptMisconception links, 1 EbCurriculum, ${moduleCount} EbModule.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
