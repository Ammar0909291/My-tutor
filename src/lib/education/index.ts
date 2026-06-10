// India Education Knowledge Graph — Public API
// Import from here, not from individual files.

// ─── Feature Flag ─────────────────────────────────────────────────────────────
// School mode is NOT publicly available yet.
// Set to true once UI is built and tested.
export const SCHOOL_MODE_ENABLED = false

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  Difficulty,
  MathDomain,
  KnowledgeNode,
  Chapter,
  GradeSubjectCatalog,
  BoardSubjectCatalog,
  EducationBoard,
  EducationCountry,
  LearningMode,
  LearningContext,
  SchoolContext,
  GeneralContext,
} from './educationTypes'

// ─── Master Knowledge Graph ───────────────────────────────────────────────────
export {
  MATH_KNOWLEDGE_GRAPH,
  getKGNode,
  getNodesByDomain,
  getAllPrerequisites,
} from './mathKnowledgeGraph'

// ─── UP Board Catalog ─────────────────────────────────────────────────────────
export { UP_BOARD } from './upBoardCatalog'
export {
  UP_MATH_CATALOG,
  getUPMathChapters,
  getUPMathChapter,
} from './upMathCatalog'

// ─── Country & Board Registry ─────────────────────────────────────────────────
export {
  INDIA,
  EDUCATION_COUNTRIES,
  getBoard,
  getAllBoards,
} from './educationCatalog'

// ─── Cross-cutting Graph Queries ──────────────────────────────────────────────
export {
  getNodesForChapter,
  getNewNodesAtGrade,
  getCumulativeNodes,
  getPrerequisiteGaps,
  getBoardsCoveringNode,
  getUncoveredNodes,
  buildSchoolTutorContext,
} from './educationGraph'
