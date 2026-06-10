import type { BoardSubjectCatalog, KnowledgeNode } from './educationTypes'
import { MATH_KNOWLEDGE_GRAPH } from './mathKnowledgeGraph'
import { SCIENCE_KNOWLEDGE_GRAPH } from './scienceKnowledgeGraph'
import { ENGLISH_KNOWLEDGE_GRAPH } from './englishKnowledgeGraph'
import { SOCIAL_SCIENCE_KNOWLEDGE_GRAPH } from './socialScienceKnowledgeGraph'

const ALL_KG_NODES: KnowledgeNode[] = [
  ...MATH_KNOWLEDGE_GRAPH,
  ...SCIENCE_KNOWLEDGE_GRAPH,
  ...ENGLISH_KNOWLEDGE_GRAPH,
  ...SOCIAL_SCIENCE_KNOWLEDGE_GRAPH,
]

export interface CoverageAuditResult {
  boardId: string
  subjectSlug: string
  totalChapters: number
  totalKgNodesMapped: number
  uniqueKgNodesCovered: number
  unmappedChapters: string[]
  coveragePercent: number
}

export interface BoardCoverageReport {
  boardId: string
  subjects: CoverageAuditResult[]
  totalChapters: number
  totalUniqueNodesCovered: number
  overallCoveragePercent: number
}

export interface UnusedNodesReport {
  subject: string
  unusedNodes: Array<{ id: string; title: string }>
}

/** Audit coverage for a single subject catalog */
export function auditSubjectCoverage(catalog: BoardSubjectCatalog): CoverageAuditResult {
  const allChapters = catalog.grades.flatMap((g) => g.chapters)
  const unmappedChapters: string[] = []
  const coveredNodeIds = new Set<string>()
  let totalMapped = 0

  for (const chapter of allChapters) {
    if (chapter.kgNodeIds.length === 0) {
      unmappedChapters.push(chapter.id)
    } else {
      totalMapped += chapter.kgNodeIds.length
      chapter.kgNodeIds.forEach((id) => coveredNodeIds.add(id))
    }
  }

  const domainPrefixMap: Record<string, string[]> = {
    mathematics: ['arithmetic', 'number_systems', 'fractions', 'decimals', 'integers', 'ratios_proportions', 'percentages', 'exponents_powers', 'algebra', 'geometry', 'mensuration', 'coordinate_geometry', 'trigonometry', 'statistics', 'probability', 'functions', 'calculus', 'vectors', 'matrices', 'combinatorics'],
    science: ['physics', 'chemistry', 'biology', 'earth_science', 'environmental_science'],
    english: ['grammar', 'vocabulary', 'reading', 'writing', 'communication', 'literature'],
    social_science: ['history', 'geography', 'civics', 'economics', 'society'],
  }
  const prefixes = domainPrefixMap[catalog.subjectSlug] ?? []
  const subjectNodes = ALL_KG_NODES.filter((n) =>
    prefixes.some((prefix) => n.domain.startsWith(prefix))
  )

  const totalSubjectNodes = subjectNodes.length || 1

  return {
    boardId: catalog.boardId,
    subjectSlug: catalog.subjectSlug,
    totalChapters: allChapters.length,
    totalKgNodesMapped: totalMapped,
    uniqueKgNodesCovered: coveredNodeIds.size,
    unmappedChapters,
    coveragePercent: Math.round((coveredNodeIds.size / totalSubjectNodes) * 100),
  }
}

/** Audit coverage for a specific grade within a catalog */
export function auditGradeCoverage(catalog: BoardSubjectCatalog, grade: number): CoverageAuditResult {
  const gradeEntry = catalog.grades.find((g) => g.grade === grade)
  if (!gradeEntry) {
    return {
      boardId: catalog.boardId,
      subjectSlug: `${catalog.subjectSlug}.grade${grade}`,
      totalChapters: 0,
      totalKgNodesMapped: 0,
      uniqueKgNodesCovered: 0,
      unmappedChapters: [],
      coveragePercent: 0,
    }
  }

  const singleGradeCatalog: BoardSubjectCatalog = { ...catalog, grades: [gradeEntry] }
  const result = auditSubjectCoverage(singleGradeCatalog)
  return { ...result, subjectSlug: `${catalog.subjectSlug}.grade${grade}` }
}

/** Audit all subjects for a board */
export function auditBoardCoverage(catalogs: BoardSubjectCatalog[]): BoardCoverageReport {
  if (catalogs.length === 0) return { boardId: '', subjects: [], totalChapters: 0, totalUniqueNodesCovered: 0, overallCoveragePercent: 0 }

  const boardId = catalogs[0].boardId
  const subjects = catalogs.map(auditSubjectCoverage)
  const totalChapters = subjects.reduce((sum, s) => sum + s.totalChapters, 0)
  const allCoveredNodes = new Set<string>()

  for (const catalog of catalogs) {
    for (const grade of catalog.grades) {
      for (const chapter of grade.chapters) {
        chapter.kgNodeIds.forEach((id) => allCoveredNodes.add(id))
      }
    }
  }

  const overallCoveragePercent = Math.round((allCoveredNodes.size / ALL_KG_NODES.length) * 100)

  return {
    boardId,
    subjects,
    totalChapters,
    totalUniqueNodesCovered: allCoveredNodes.size,
    overallCoveragePercent,
  }
}

/** Find chapters that reference KG node IDs that don't exist in any KG */
export function findUnmappedChapters(catalogs: BoardSubjectCatalog[]): Array<{ chapterId: string; missingNodeIds: string[] }> {
  const knownIds = new Set(ALL_KG_NODES.map((n) => n.id))
  const result: Array<{ chapterId: string; missingNodeIds: string[] }> = []

  for (const catalog of catalogs) {
    for (const grade of catalog.grades) {
      for (const chapter of grade.chapters) {
        const missing = chapter.kgNodeIds.filter((id) => !knownIds.has(id))
        if (missing.length > 0) {
          result.push({ chapterId: chapter.id, missingNodeIds: missing })
        }
      }
    }
  }

  return result
}

/** Find KG nodes that are not referenced by any chapter in the provided catalogs */
export function findUnusedKnowledgeNodes(catalogs: BoardSubjectCatalog[]): UnusedNodesReport[] {
  const usedIds = new Set<string>()
  for (const catalog of catalogs) {
    for (const grade of catalog.grades) {
      for (const chapter of grade.chapters) {
        chapter.kgNodeIds.forEach((id) => usedIds.add(id))
      }
    }
  }

  const subjectGroups: Record<string, KnowledgeNode[]> = {}
  for (const node of ALL_KG_NODES) {
    const subject = node.domain.split('.')[0]
    if (!subjectGroups[subject]) subjectGroups[subject] = []
    if (!usedIds.has(node.id)) {
      subjectGroups[subject].push(node)
    }
  }

  return Object.entries(subjectGroups)
    .filter(([, nodes]) => nodes.length > 0)
    .map(([subject, nodes]) => ({
      subject,
      unusedNodes: nodes.map((n) => ({ id: n.id, title: n.title })),
    }))
}
