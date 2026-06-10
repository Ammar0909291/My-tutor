// India Education Knowledge Graph — Core Type System
// Designed to support any country → board → class → subject → chapter → KG node
// Future boards (CBSE, ICSE, Maharashtra, Karnataka, ...) require only data additions.

// ─── Shared Primitives ────────────────────────────────────────────────────────

export type Difficulty = 'foundational' | 'developing' | 'proficient' | 'advanced'

/** All mathematics knowledge domains tracked in the master KG */
export type MathDomain =
  | 'arithmetic'
  | 'number_systems'
  | 'fractions'
  | 'decimals'
  | 'integers'
  | 'ratios_proportions'
  | 'percentages'
  | 'exponents_powers'
  | 'algebra'
  | 'geometry'
  | 'mensuration'
  | 'coordinate_geometry'
  | 'trigonometry'
  | 'statistics'
  | 'probability'
  | 'functions'
  | 'calculus'
  | 'vectors'
  | 'matrices'
  | 'combinatorics'

// ─── Master Knowledge Graph ───────────────────────────────────────────────────

/**
 * A KnowledgeNode is a single reusable mathematical concept.
 * Multiple boards and classes can reference the same node.
 * This is the heart of the IEKG — one concept, many curriculum contexts.
 */
export interface KnowledgeNode {
  /** Namespaced ID: "domain.concept", e.g. "algebra.linear_equations_1var" */
  id: string
  domain: MathDomain
  title: string
  description: string
  difficulty: Difficulty
  /** IDs of KnowledgeNodes that must be understood before this one */
  prerequisites: string[]
}

// ─── Curriculum Structure ─────────────────────────────────────────────────────

/** A single chapter in a class's syllabus */
export interface Chapter {
  /** Scoped ID: "board.subject.grade.ch{n}", e.g. "up.math.6.ch3" */
  id: string
  /** Display order in the syllabus (1-based) */
  order: number
  title: string
  /** Which KnowledgeNode ids this chapter covers */
  kgNodeIds: string[]
}

/** Chapters for one grade level within a board's subject */
export interface GradeSubjectCatalog {
  grade: number
  chapters: Chapter[]
}

/** Complete subject catalog for a board (all grades) */
export interface BoardSubjectCatalog {
  boardId: string
  subjectSlug: string
  subjectName: string
  grades: GradeSubjectCatalog[]
}

// ─── Board & Country Registry ─────────────────────────────────────────────────

/** An education board (e.g. UP Board, CBSE, ICSE) */
export interface EducationBoard {
  /** Unique stable ID, e.g. "up_board", "cbse", "icse" */
  id: string
  /** Full display name */
  name: string
  /** Short name for URLs/display */
  shortName: string
  country: string
  /** State/region (if state board) */
  state?: string
  /** Subject slugs the board offers */
  subjects: string[]
  /** Grade levels supported */
  grades: number[]
}

/** Top-level country registry */
export interface EducationCountry {
  id: string
  name: string
  boards: EducationBoard[]
}

// ─── School Learning Mode ─────────────────────────────────────────────────────

/** Learning mode — determines which content layer is active */
export type LearningMode = 'general' | 'school'

/** School context selected by a student */
export interface SchoolContext {
  mode: 'school'
  countryId: string
  boardId: string
  grade: number
  subjectSlug: string
}

/** General learning context (existing behavior) */
export interface GeneralContext {
  mode: 'general'
}

export type LearningContext = SchoolContext | GeneralContext
