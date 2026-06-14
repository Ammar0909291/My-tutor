import type { BoardSubjectCatalog, KnowledgeNode, Chapter } from './educationTypes'
import { MATH_KNOWLEDGE_GRAPH } from './mathKnowledgeGraph'
import { SCIENCE_KNOWLEDGE_GRAPH } from './scienceKnowledgeGraph'
import { ENGLISH_KNOWLEDGE_GRAPH } from './englishKnowledgeGraph'
import { SOCIAL_SCIENCE_KNOWLEDGE_GRAPH } from './socialScienceKnowledgeGraph'
import { HINDI_KNOWLEDGE_GRAPH } from './hindiKnowledgeGraph'
import { SANSKRIT_KNOWLEDGE_GRAPH } from './sanskritKnowledgeGraph'
import { ACCOUNTANCY_KNOWLEDGE_GRAPH } from './accountancyKnowledgeGraph'
import { BUSINESS_STUDIES_KNOWLEDGE_GRAPH } from './businessStudiesKnowledgeGraph'
import { COMPUTER_SCIENCE_KNOWLEDGE_GRAPH } from './computerScienceKnowledgeGraph'
import { PHYSICS_KNOWLEDGE_GRAPH } from './physicsKnowledgeGraph'
import { CHEMISTRY_KNOWLEDGE_GRAPH } from './chemistryKnowledgeGraph'
import { BIOLOGY_KNOWLEDGE_GRAPH } from './biologyKnowledgeGraph'
import { ECONOMICS_KNOWLEDGE_GRAPH } from './economicsKnowledgeGraph'
import { HISTORY_KNOWLEDGE_GRAPH } from './historyKnowledgeGraph'
import { GEOGRAPHY_KNOWLEDGE_GRAPH } from './geographyKnowledgeGraph'
import { POLITICAL_SCIENCE_KNOWLEDGE_GRAPH } from './politicalScienceKnowledgeGraph'
import { INFORMATION_TECHNOLOGY_KNOWLEDGE_GRAPH } from './informationTechnologyKnowledgeGraph'
import { SOCIOLOGY_KNOWLEDGE_GRAPH } from './sociologyKnowledgeGraph'
import { CBSE_INFORMATION_TECHNOLOGY_CATALOG } from './cbseInformationTechnologyCatalog'
import { UP_INFORMATION_TECHNOLOGY_CATALOG } from './upInformationTechnologyCatalog'
import { CBSE_SOCIOLOGY_CATALOG } from './cbseSociologyCatalog'
import { UP_SOCIOLOGY_CATALOG } from './upSociologyCatalog'
import { CBSE_ACCOUNTANCY_CATALOG } from './cbseAccountancyCatalog'
import { UP_ACCOUNTANCY_CATALOG } from './upAccountancyCatalog'
import { CBSE_BUSINESS_STUDIES_CATALOG } from './cbseBusinessStudiesCatalog'
import { UP_BUSINESS_STUDIES_CATALOG } from './upBusinessStudiesCatalog'
import { CBSE_COMPUTER_SCIENCE_CATALOG } from './cbseComputerScienceCatalog'
import { UP_COMPUTER_SCIENCE_CATALOG } from './upComputerScienceCatalog'
import { UP_MATH_CATALOG } from './upMathCatalog'
import { UP_ENGLISH_CATALOG } from './upEnglishCatalog'
import { UP_HINDI_CATALOG } from './upHindiCatalog'
import { UP_SANSKRIT_CATALOG } from './upSanskritCatalog'
import { CBSE_MATH_CATALOG } from './cbseMathCatalog'
import { CBSE_ENGLISH_CATALOG } from './cbseEnglishCatalog'
import { CBSE_HINDI_CATALOG } from './cbseHindiCatalog'
import { CBSE_SANSKRIT_CATALOG } from './cbseSanskritCatalog'
// Sprint DC: senior-secondary streams are owned by standalone subjects; the
// bundled Science/SST catalogs are trimmed to grades 5–10 in BOARD_CATALOGS.
import {
  CBSE_SCIENCE_CATALOG_5_10,
  CBSE_SOCIAL_SCIENCE_CATALOG_5_10,
  UP_SCIENCE_CATALOG_5_10,
  UP_SOCIAL_SCIENCE_CATALOG_5_10,
  CBSE_STREAM_CATALOGS,
  UP_STREAM_CATALOGS,
} from './streamCatalogs'

export const ALL_KG_NODES: KnowledgeNode[] = [
  ...MATH_KNOWLEDGE_GRAPH,
  ...SCIENCE_KNOWLEDGE_GRAPH,
  ...ENGLISH_KNOWLEDGE_GRAPH,
  ...SOCIAL_SCIENCE_KNOWLEDGE_GRAPH,
  ...HINDI_KNOWLEDGE_GRAPH,
  ...SANSKRIT_KNOWLEDGE_GRAPH,
  ...ACCOUNTANCY_KNOWLEDGE_GRAPH,
  ...BUSINESS_STUDIES_KNOWLEDGE_GRAPH,
  ...COMPUTER_SCIENCE_KNOWLEDGE_GRAPH,
  ...PHYSICS_KNOWLEDGE_GRAPH,
  ...CHEMISTRY_KNOWLEDGE_GRAPH,
  ...BIOLOGY_KNOWLEDGE_GRAPH,
  ...ECONOMICS_KNOWLEDGE_GRAPH,
  ...HISTORY_KNOWLEDGE_GRAPH,
  ...GEOGRAPHY_KNOWLEDGE_GRAPH,
  ...POLITICAL_SCIENCE_KNOWLEDGE_GRAPH,
  ...INFORMATION_TECHNOLOGY_KNOWLEDGE_GRAPH,
  ...SOCIOLOGY_KNOWLEDGE_GRAPH,
]

export const BOARD_CATALOGS: BoardSubjectCatalog[] = [
  UP_MATH_CATALOG,
  UP_SCIENCE_CATALOG_5_10,
  UP_ENGLISH_CATALOG,
  UP_HINDI_CATALOG,
  UP_SANSKRIT_CATALOG,
  UP_SOCIAL_SCIENCE_CATALOG_5_10,
  ...UP_STREAM_CATALOGS,
  CBSE_MATH_CATALOG,
  CBSE_SCIENCE_CATALOG_5_10,
  CBSE_SOCIAL_SCIENCE_CATALOG_5_10,
  ...CBSE_STREAM_CATALOGS,
  CBSE_ENGLISH_CATALOG,
  CBSE_HINDI_CATALOG,
  CBSE_SANSKRIT_CATALOG,
  CBSE_ACCOUNTANCY_CATALOG,
  UP_ACCOUNTANCY_CATALOG,
  CBSE_BUSINESS_STUDIES_CATALOG,
  UP_BUSINESS_STUDIES_CATALOG,
  CBSE_COMPUTER_SCIENCE_CATALOG,
  UP_COMPUTER_SCIENCE_CATALOG,
  CBSE_INFORMATION_TECHNOLOGY_CATALOG,
  UP_INFORMATION_TECHNOLOGY_CATALOG,
  CBSE_SOCIOLOGY_CATALOG,
  UP_SOCIOLOGY_CATALOG,
]

/** All KG nodes introduced in a specific chapter */
export function getNodesForChapter(chapter: Chapter): KnowledgeNode[] {
  return chapter.kgNodeIds
    .map((id) => ALL_KG_NODES.find((n) => n.id === id))
    .filter(Boolean) as KnowledgeNode[]
}

/** KG nodes that first appear at this grade (not in any lower grade of the same catalog) */
export function getNewNodesAtGrade(catalog: BoardSubjectCatalog, grade: number): KnowledgeNode[] {
  const lowerGradeIds = new Set<string>()
  for (const g of catalog.grades) {
    if (g.grade < grade) {
      g.chapters.forEach((ch) => ch.kgNodeIds.forEach((id) => lowerGradeIds.add(id)))
    }
  }
  const gradeEntry = catalog.grades.find((g) => g.grade === grade)
  if (!gradeEntry) return []
  const newIds = new Set<string>()
  gradeEntry.chapters.forEach((ch) =>
    ch.kgNodeIds.forEach((id) => { if (!lowerGradeIds.has(id)) newIds.add(id) })
  )
  return [...newIds]
    .map((id) => ALL_KG_NODES.find((n) => n.id === id))
    .filter(Boolean) as KnowledgeNode[]
}

/** All unique KG nodes covered from grade 1 up to and including the given grade */
export function getCumulativeNodes(catalog: BoardSubjectCatalog, upToGrade: number): KnowledgeNode[] {
  const ids = new Set<string>()
  for (const g of catalog.grades) {
    if (g.grade <= upToGrade) {
      g.chapters.forEach((ch) => ch.kgNodeIds.forEach((id) => ids.add(id)))
    }
  }
  return [...ids]
    .map((id) => ALL_KG_NODES.find((n) => n.id === id))
    .filter(Boolean) as KnowledgeNode[]
}

/** Prerequisites the student hasn't covered yet, given a target node and their current cumulative nodes */
export function getPrerequisiteGaps(targetNodeId: string, coveredNodeIds: Set<string>): KnowledgeNode[] {
  const target = ALL_KG_NODES.find((n) => n.id === targetNodeId)
  if (!target) return []
  return target.prerequisites
    .filter((pid) => !coveredNodeIds.has(pid))
    .map((pid) => ALL_KG_NODES.find((n) => n.id === pid))
    .filter(Boolean) as KnowledgeNode[]
}

/** Which board catalogs cover a given KG node */
export function getBoardsCoveringNode(nodeId: string): string[] {
  return BOARD_CATALOGS
    .filter((cat) => cat.grades.some((g) => g.chapters.some((ch) => ch.kgNodeIds.includes(nodeId))))
    .map((cat) => `${cat.boardId}/${cat.subjectSlug}`)
}

/** KG nodes not covered by any chapter in any of the provided catalogs */
export function getUncoveredNodes(catalogs: BoardSubjectCatalog[] = BOARD_CATALOGS): KnowledgeNode[] {
  const coveredIds = new Set<string>()
  for (const cat of catalogs) {
    for (const g of cat.grades) {
      for (const ch of g.chapters) {
        ch.kgNodeIds.forEach((id) => coveredIds.add(id))
      }
    }
  }
  return ALL_KG_NODES.filter((n) => !coveredIds.has(n.id))
}

/** Build a tutor context string for a specific school chapter */
export function buildSchoolTutorContext(
  boardId: string,
  subjectSlug: string,
  grade: number,
  chapterId: string
): string {
  const catalog = BOARD_CATALOGS.find(
    (c) => c.boardId === boardId && c.subjectSlug === subjectSlug
  )
  if (!catalog) return ''
  const gradeEntry = catalog.grades.find((g) => g.grade === grade)
  if (!gradeEntry) return ''
  const chapter = gradeEntry.chapters.find((ch) => ch.id === chapterId)
  if (!chapter) return ''
  const nodes = getNodesForChapter(chapter)
  const cumulative = getCumulativeNodes(catalog, grade)
  const cumulativeIds = new Set(cumulative.map((n) => n.id))
  const lines = [
    `Board: ${boardId} | Subject: ${subjectSlug} | Grade: ${grade}`,
    `Chapter: ${chapter.title}`,
    `Topics covered in this chapter:`,
    ...nodes.map((n) => `  - ${n.title}: ${n.description}`),
    `Student has previously covered ${cumulative.length} knowledge nodes up to this grade.`,
  ]
  const gaps = nodes.flatMap((n) => getPrerequisiteGaps(n.id, cumulativeIds))
  if (gaps.length > 0) {
    lines.push(`Prerequisite gaps to watch for: ${gaps.map((g) => g.title).join(', ')}`)
  }
  return lines.join('\n')
}
