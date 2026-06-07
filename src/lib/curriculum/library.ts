/**
 * Master Curriculum Library
 *
 * Static reference data for the multi-subject learning ecosystem. This is
 * additive to (not a replacement for) the existing AI curriculum generation
 * (`buildCurriculumPrompt` + `generateJSON`, see /api/curriculum) — it gives
 * every subject a stable, shared "shape": a level system, a subject library
 * the user can browse/enroll from, and a curriculum tree that the AI can be
 * pointed at so it never invents structure or skips prerequisites.
 */

// ─── Level system (shared by every subject) ──────────────────────────────────

export const LEVELS = [
  { index: 0, key: 'complete_beginner', label: 'Complete Beginner' },
  { index: 1, key: 'beginner', label: 'Beginner' },
  { index: 2, key: 'intermediate', label: 'Intermediate' },
  { index: 3, key: 'advanced', label: 'Advanced' },
  { index: 4, key: 'professional', label: 'Professional' },
  { index: 5, key: 'expert', label: 'Expert' },
] as const

export type LevelIndex = 0 | 1 | 2 | 3 | 4 | 5

export function levelLabel(index: number): string {
  return LEVELS.find((l) => l.index === index)?.label ?? LEVELS[0].label
}

// ─── Subject categories ───────────────────────────────────────────────────────

export type SubjectCategory =
  | 'languages'
  | 'programming'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'

export const CATEGORY_LABELS: Record<SubjectCategory, string> = {
  languages: 'Languages',
  programming: 'Programming',
  mathematics: 'Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
}

// ─── Curriculum tree shape ────────────────────────────────────────────────────
// A curriculum tree is an ordered list of modules; each module is an ordered
// list of topic nodes. This mirrors the bullet trees in the spec, e.g.
//   Algebra ├── Variables ├── Equations ├── Functions

export interface CurriculumNode {
  slug: string
  title: string
}

export interface CurriculumModule {
  slug: string
  title: string
  nodes: CurriculumNode[]
  /** Roughly which levels this module belongs to (inclusive range). */
  levelRange: [LevelIndex, LevelIndex]
  estimatedHours: number
}

export interface LibrarySubject {
  slug: string
  name: string
  category: SubjectCategory
  icon: string
  description: string
  modules: CurriculumModule[]
}

function node(slug: string, title: string): CurriculumNode {
  return { slug, title }
}

function mod(
  slug: string,
  title: string,
  topics: string[],
  levelRange: [LevelIndex, LevelIndex],
  estimatedHours = 6,
): CurriculumModule {
  return {
    slug,
    title,
    nodes: topics.map((t) => node(`${slug}-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, t)),
    levelRange,
    estimatedHours,
  }
}

// ─── Mathematics ──────────────────────────────────────────────────────────────

const MATH_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Numbers', 'Fractions', 'Decimals', 'Percentages'], [0, 0], 8),
  mod('algebra', 'Algebra', ['Variables', 'Equations', 'Functions'], [1, 2], 10),
  mod('geometry', 'Geometry', ['Shapes', 'Angles', 'Areas'], [1, 2], 8),
  mod('trigonometry', 'Trigonometry', ['Angles & Triangles', 'Sine, Cosine, Tangent', 'Identities'], [2, 3], 8),
  mod('statistics', 'Statistics', ['Data & Averages', 'Probability', 'Distributions'], [2, 3], 8),
  mod('calculus', 'Calculus', ['Limits', 'Derivatives', 'Integrals'], [3, 4], 12),
  mod('advanced_mathematics', 'Advanced Mathematics', ['Linear Algebra', 'Differential Equations', 'Optimization'], [4, 5], 14),
]

// ─── Physics ──────────────────────────────────────────────────────────────────

const PHYSICS_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Measurement', 'Units', 'Scientific Method'], [0, 0], 6),
  mod('motion', 'Motion', ['Position & Distance', 'Speed', 'Graphs of Motion'], [0, 1], 6),
  mod('mechanics', 'Mechanics', ['Velocity', 'Acceleration', 'Forces'], [1, 2], 10),
  mod('energy', 'Energy', ['Work', 'Energy', 'Power'], [1, 2], 8),
  mod('electricity', 'Electricity', ['Current', 'Voltage', 'Resistance'], [2, 3], 8),
  mod('magnetism', 'Magnetism', ['Magnetic Fields', 'Electromagnetism', 'Motors & Generators'], [2, 3], 8),
  mod('waves', 'Waves', ['Wave Properties', 'Sound', 'Light'], [2, 3], 8),
  mod('thermodynamics', 'Thermodynamics', ['Heat & Temperature', 'Laws of Thermodynamics', 'Engines'], [3, 4], 8),
  mod('modern_physics', 'Modern Physics', ['Relativity', 'Quantum Physics'], [4, 5], 12),
]

// ─── Chemistry ────────────────────────────────────────────────────────────────

const CHEMISTRY_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Matter', 'Elements', 'Atoms'], [0, 0], 6),
  mod('atoms', 'Atoms', ['Atomic Structure', 'Periodic Table', 'Isotopes'], [0, 1], 6),
  mod('molecules', 'Molecules', ['Bonding Basics', 'Molecular Shapes', 'Compounds'], [1, 2], 8),
  mod('reactions', 'Chemical Reactions', ['Bonding', 'Reactions', 'Balancing Equations'], [1, 3], 10),
  mod('organic_chemistry', 'Organic Chemistry', ['Hydrocarbons', 'Functional Groups'], [3, 4], 10),
  mod('physical_chemistry', 'Physical Chemistry', ['Thermochemistry', 'Kinetics', 'Equilibrium'], [4, 5], 10),
]

// ─── Biology ──────────────────────────────────────────────────────────────────

const BIOLOGY_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Cells', 'Organisms'], [0, 0], 6),
  mod('cell_biology', 'Cell Biology', ['Cell Structure', 'Cell Processes', 'Cell Division'], [1, 2], 8),
  mod('human_biology', 'Human Biology', ['Body Systems', 'Health'], [1, 2], 8),
  mod('genetics', 'Genetics', ['DNA', 'Inheritance'], [2, 3], 8),
  mod('evolution', 'Evolution', ['Natural Selection', 'Adaptation', 'Evidence for Evolution'], [3, 4], 8),
  mod('ecology', 'Ecology', ['Ecosystems', 'Environment'], [2, 3], 6),
  mod('advanced_biology', 'Advanced Biology', ['Molecular Biology', 'Biotechnology'], [4, 5], 10),
]

// ─── Programming languages (shared shape across languages) ───────────────────

function programmingTree(name: string): CurriculumModule[] {
  return [
    mod('foundations', 'Foundations', ['Syntax & Setup', 'Variables & Types', 'Operators'], [0, 0], 8),
    mod('control_flow', 'Control Flow', ['Conditionals', 'Loops', 'Functions'], [1, 1], 10),
    mod('data_structures', 'Data Structures', ['Arrays / Lists', 'Maps / Dictionaries', 'Sets'], [1, 2], 10),
    mod('oop', 'Object-Oriented Programming', ['Classes & Objects', 'Inheritance', 'Interfaces'], [2, 3], 12),
    mod('tooling_and_libraries', `${name} Ecosystem`, ['Package Management', 'Standard Library', 'Testing'], [2, 3], 8),
    mod('advanced_topics', 'Advanced Topics', ['Concurrency', 'Performance', 'Design Patterns'], [3, 4], 12),
    mod('professional_practice', 'Professional Practice', ['Architecture', 'Code Review', 'Real-World Projects'], [4, 5], 14),
  ]
}

// ─── Spoken languages (shared shape across languages) ────────────────────────

function languageTree(name: string): CurriculumModule[] {
  return [
    mod('foundations', 'Foundations', ['Alphabet & Sounds', 'Greetings', 'Numbers'], [0, 0], 6),
    mod('everyday_basics', 'Everyday Basics', ['Common Phrases', 'Simple Questions', 'Daily Routines'], [1, 1], 8),
    mod('grammar_essentials', 'Grammar Essentials', ['Sentence Structure', 'Tenses', 'Pronouns'], [1, 2], 10),
    mod('conversation', 'Conversation', ['Small Talk', 'Listening Practice', 'Speaking Practice'], [2, 3], 10),
    mod('reading_and_writing', 'Reading & Writing', ['Short Texts', 'Writing Notes & Messages', 'Essays'], [2, 3], 8),
    mod('fluency', 'Fluency & Nuance', [`${name} Idioms`, 'Cultural Context', 'Tone & Register'], [3, 4], 10),
    mod('mastery', 'Mastery', ['Professional Communication', 'Debate & Persuasion'], [4, 5], 12),
  ]
}

// ─── Subject library (the full, browsable catalogue) ─────────────────────────

export const SUBJECT_LIBRARY: LibrarySubject[] = [
  // Languages
  { slug: 'english', name: 'English', category: 'languages', icon: '🇬🇧', description: 'Speak, read and write English with confidence.', modules: languageTree('English') },
  { slug: 'russian', name: 'Russian', category: 'languages', icon: '🇷🇺', description: 'Learn Russian from the alphabet to fluent conversation.', modules: languageTree('Russian') },
  { slug: 'hindi', name: 'Hindi', category: 'languages', icon: '🇮🇳', description: 'Learn Hindi step by step, from basics to fluency.', modules: languageTree('Hindi') },
  { slug: 'german', name: 'German', category: 'languages', icon: '🇩🇪', description: 'Build German skills from scratch to confident conversation.', modules: languageTree('German') },
  { slug: 'arabic', name: 'Arabic', category: 'languages', icon: '🇸🇦', description: 'Learn to read, write and speak Arabic.', modules: languageTree('Arabic') },

  // Programming
  { slug: 'python', name: 'Python', category: 'programming', icon: '🐍', description: 'Python from first script to advanced projects.', modules: programmingTree('Python') },
  { slug: 'javascript', name: 'JavaScript', category: 'programming', icon: '📜', description: 'JavaScript for the web, from basics to advanced patterns.', modules: programmingTree('JavaScript') },
  { slug: 'typescript', name: 'TypeScript', category: 'programming', icon: '🔷', description: 'Typed JavaScript — safer, more scalable code.', modules: programmingTree('TypeScript') },
  { slug: 'java', name: 'Java', category: 'programming', icon: '☕', description: 'Java fundamentals through enterprise-grade development.', modules: programmingTree('Java') },
  { slug: 'cpp', name: 'C++', category: 'programming', icon: '➕', description: 'Modern C++ — performance, memory, and systems programming.', modules: programmingTree('C++') },
  { slug: 'csharp', name: 'C#', category: 'programming', icon: '🎯', description: 'C# for apps, games and the .NET ecosystem.', modules: programmingTree('C#') },
  { slug: 'go', name: 'Go', category: 'programming', icon: '🐹', description: 'Go — simple, fast, and built for modern backends.', modules: programmingTree('Go') },
  { slug: 'rust', name: 'Rust', category: 'programming', icon: '🦀', description: 'Rust — safe systems programming without a garbage collector.', modules: programmingTree('Rust') },

  // Mathematics
  { slug: 'mathematics', name: 'Mathematics', category: 'mathematics', icon: '∑', description: 'A complete path from basic arithmetic to advanced mathematics.', modules: MATH_TREE },

  // Physics
  { slug: 'physics', name: 'Physics', category: 'physics', icon: '⚛️', description: 'Understand how the physical world works, from motion to quantum physics.', modules: PHYSICS_TREE },

  // Chemistry
  { slug: 'chemistry', name: 'Chemistry', category: 'chemistry', icon: '🧪', description: 'From atoms to organic chemistry — explained simply.', modules: CHEMISTRY_TREE },

  // Biology
  { slug: 'biology', name: 'Biology', category: 'biology', icon: '🧬', description: 'Explore life, from cells to ecosystems.', modules: BIOLOGY_TREE },
]

export function findLibrarySubject(slug: string): LibrarySubject | undefined {
  return SUBJECT_LIBRARY.find((s) => s.slug === slug)
}

export function librarySubjectsByCategory(category: SubjectCategory): LibrarySubject[] {
  return SUBJECT_LIBRARY.filter((s) => s.category === category)
}

/**
 * Slice a subject's curriculum tree down to the modules relevant for the
 * learner's current → target level span — used to keep the AI tutor and
 * curriculum generator from skipping ahead or repeating mastered ground.
 */
export function modulesForLevelSpan(
  subject: LibrarySubject,
  currentLevel: number,
  targetLevel: number | null,
): CurriculumModule[] {
  const target = targetLevel ?? 5
  return subject.modules.filter((m) => m.levelRange[0] <= target && m.levelRange[1] >= currentLevel)
}

/**
 * Render a compact, plain-text description of a subject's curriculum tree —
 * meant to be embedded into AI prompts so the tutor / curriculum generator
 * follows the prerequisite chain instead of inventing its own structure.
 */
export function renderCurriculumTree(subject: LibrarySubject): string {
  return subject.modules
    .map((m) => `${m.title} (Level ${m.levelRange[0]}–${m.levelRange[1]}, ~${m.estimatedHours}h)\n` +
      m.nodes.map((n) => `  ├── ${n.title}`).join('\n'))
    .join('\n')
}
