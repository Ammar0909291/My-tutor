// India Education Knowledge Graph — Public API
// SCHOOL_MODE_ENABLED = false: all school UI is hidden; data layer is ready

export const SCHOOL_MODE_ENABLED = false

// Types
export type {
  Difficulty,
  MathDomain,
  ScienceDomain,
  EnglishDomain,
  SocialScienceDomain,
  AnyDomain,
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

// Knowledge Graphs
export { MATH_KNOWLEDGE_GRAPH, getKGNode, getNodesByDomain, getAllPrerequisites } from './mathKnowledgeGraph'
export { SCIENCE_KNOWLEDGE_GRAPH, getScienceNode } from './scienceKnowledgeGraph'
export { ENGLISH_KNOWLEDGE_GRAPH, getEnglishNode } from './englishKnowledgeGraph'
export { SOCIAL_SCIENCE_KNOWLEDGE_GRAPH, getSocialScienceNode } from './socialScienceKnowledgeGraph'

// UP Board Catalogs
export { UP_MATH_CATALOG, getUPMathChapters, getUPMathChapter } from './upMathCatalog'
export { UP_SCIENCE_CATALOG, getUPScienceChapters } from './upScienceCatalog'
export { UP_ENGLISH_CATALOG, getUPEnglishChapters } from './upEnglishCatalog'
export { UP_SOCIAL_SCIENCE_CATALOG, getUPSocialScienceChapters } from './upSocialScienceCatalog'

// CBSE Catalogs
export { CBSE_MATH_CATALOG, getCBSEMathChapters, getCBSEMathChapter } from './cbseMathCatalog'
export { CBSE_SCIENCE_CATALOG, getCBSEScienceChapters, getCBSEScienceChapter } from './cbseScienceCatalog'
export { CBSE_SOCIAL_SCIENCE_CATALOG, getCBSESocialScienceChapters, getCBSESocialScienceChapter } from './cbseSocialScienceCatalog'
export { CBSE_ENGLISH_CATALOG, getCBSEEnglishChapters, getCBSEEnglishChapter } from './cbseEnglishCatalog'

// Board Registry
export { UP_BOARD } from './upBoardCatalog'
export { CBSE_BOARD } from './cbseBoardCatalog'
export { INDIA, EDUCATION_COUNTRIES, getBoard, getAllBoards } from './educationCatalog'

// Cross-cutting Graph Queries
export {
  ALL_KG_NODES,
  BOARD_CATALOGS,
  getNodesForChapter,
  getNewNodesAtGrade,
  getCumulativeNodes,
  getPrerequisiteGaps,
  getBoardsCoveringNode,
  getUncoveredNodes,
  buildSchoolTutorContext,
} from './educationGraph'

// Coverage Audit Engine
export {
  auditSubjectCoverage,
  auditGradeCoverage,
  auditBoardCoverage,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
} from './coverageAudit'
export type { CoverageAuditResult, BoardCoverageReport, UnusedNodesReport } from './coverageAudit'
