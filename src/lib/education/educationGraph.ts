// Education Graph — Chapter-to-KG Mapping Queries
//
// This file answers questions that cross the boundary between
// board curriculum (chapters) and the master KG (knowledge nodes).
// Future boards plug in here without touching the KG itself.

import { MATH_KNOWLEDGE_GRAPH, getKGNode, getAllPrerequisites } from './mathKnowledgeGraph'
import { UP_MATH_CATALOG } from './upMathCatalog'
import type { BoardSubjectCatalog, KnowledgeNode, Chapter } from './educationTypes'

/** All board catalogs registered in the system */
const BOARD_CATALOGS: BoardSubjectCatalog[] = [
  UP_MATH_CATALOG,
  // Future: CBSE_MATH_CATALOG, ICSE_MATH_CATALOG, ...
]

// ─── Chapter → KG Queries ────────────────────────────────────────────────────

/** Get all KG nodes covered by a chapter */
export function getNodesForChapter(chapter: Chapter): KnowledgeNode[] {
  return chapter.kgNodeIds.flatMap((id) => {
    const node = getKGNode(id)
    return node ? [node] : []
  })
}

/** Get all KG node ids introduced for the first time at a given grade
 *  (i.e. not present in any earlier grade of the same board+subject) */
export function getNewNodesAtGrade(
  boardId: string,
  subjectSlug: string,
  grade: number,
): KnowledgeNode[] {
  const catalog = BOARD_CATALOGS.find(
    (c) => c.boardId === boardId && c.subjectSlug === subjectSlug,
  )
  if (!catalog) return []

  const priorGrades = catalog.grades.filter((g) => g.grade < grade)
  const priorNodeIds = new Set(
    priorGrades.flatMap((g) => g.chapters.flatMap((ch) => ch.kgNodeIds)),
  )

  const thisGrade = catalog.grades.find((g) => g.grade === grade)
  if (!thisGrade) return []

  const thisNodeIds = new Set(thisGrade.chapters.flatMap((ch) => ch.kgNodeIds))
  const newIds = [...thisNodeIds].filter((id) => !priorNodeIds.has(id))

  return newIds.flatMap((id) => {
    const node = getKGNode(id)
    return node ? [node] : []
  })
}

/** Get the cumulative KG coverage up to and including a grade */
export function getCumulativeNodes(
  boardId: string,
  subjectSlug: string,
  upToGrade: number,
): KnowledgeNode[] {
  const catalog = BOARD_CATALOGS.find(
    (c) => c.boardId === boardId && c.subjectSlug === subjectSlug,
  )
  if (!catalog) return []

  const coveredGrades = catalog.grades.filter((g) => g.grade <= upToGrade)
  const coveredIds = new Set(
    coveredGrades.flatMap((g) => g.chapters.flatMap((ch) => ch.kgNodeIds)),
  )

  return [...coveredIds].flatMap((id) => {
    const node = getKGNode(id)
    return node ? [node] : []
  })
}

/** For a given chapter, return prerequisite KG nodes not yet covered
 *  by the curriculum up to the previous grade (gap analysis) */
export function getPrerequisiteGaps(
  boardId: string,
  subjectSlug: string,
  grade: number,
  chapterId: string,
): KnowledgeNode[] {
  const catalog = BOARD_CATALOGS.find(
    (c) => c.boardId === boardId && c.subjectSlug === subjectSlug,
  )
  if (!catalog) return []

  const chapter = catalog.grades
    .find((g) => g.grade === grade)
    ?.chapters.find((c) => c.id === chapterId)
  if (!chapter) return []

  const coveredBefore = new Set(
    catalog.grades
      .filter((g) => g.grade < grade)
      .flatMap((g) => g.chapters.flatMap((ch) => ch.kgNodeIds)),
  )

  const gaps = new Set<string>()
  for (const nodeId of chapter.kgNodeIds) {
    for (const prereq of getAllPrerequisites(nodeId)) {
      if (!coveredBefore.has(prereq.id)) {
        gaps.add(prereq.id)
      }
    }
  }

  return [...gaps].flatMap((id) => {
    const node = getKGNode(id)
    return node ? [node] : []
  })
}

// ─── Cross-Board Reuse ────────────────────────────────────────────────────────

/**
 * Which boards cover a given KG node?
 * Used to verify that node reuse is working across future boards.
 */
export function getBoardsCoveringNode(nodeId: string): string[] {
  return BOARD_CATALOGS.filter((catalog) =>
    catalog.grades.some((g) =>
      g.chapters.some((ch) => ch.kgNodeIds.includes(nodeId)),
    ),
  ).map((c) => c.boardId)
}

/** KG nodes that are NOT covered by any board yet (useful for coverage audits) */
export function getUncoveredNodes(): KnowledgeNode[] {
  const allCoveredIds = new Set(
    BOARD_CATALOGS.flatMap((catalog) =>
      catalog.grades.flatMap((g) => g.chapters.flatMap((ch) => ch.kgNodeIds)),
    ),
  )
  return MATH_KNOWLEDGE_GRAPH.filter((n) => !allCoveredIds.has(n.id))
}

// ─── AI Tutor Context Builder ─────────────────────────────────────────────────

/**
 * Build an AI tutor context string for a school-mode session.
 * Tells the AI exactly which chapter and KG nodes are being studied.
 */
export function buildSchoolTutorContext(
  boardId: string,
  subjectSlug: string,
  grade: number,
  chapterId: string,
): string {
  const catalog = BOARD_CATALOGS.find(
    (c) => c.boardId === boardId && c.subjectSlug === subjectSlug,
  )
  if (!catalog) return ''

  const chapter = catalog.grades
    .find((g) => g.grade === grade)
    ?.chapters.find((c) => c.id === chapterId)
  if (!chapter) return ''

  const nodes = getNodesForChapter(chapter)
  const prereqs = nodes.flatMap((n) => getAllPrerequisites(n.id))
  const uniquePrereqs = [...new Map(prereqs.map((p) => [p.id, p])).values()].slice(0, 8)

  return [
    `Board: ${boardId.replace('_', ' ').toUpperCase()} | Class: ${grade} | Subject: ${catalog.subjectName}`,
    `Chapter: ${chapter.title}`,
    `Concepts covered in this chapter:`,
    nodes.map((n) => `  • ${n.title}: ${n.description}`).join('\n'),
    uniquePrereqs.length > 0
      ? `Prior knowledge the student should have:\n${uniquePrereqs.map((p) => `  • ${p.title}`).join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')
}
