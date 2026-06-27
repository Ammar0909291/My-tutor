/**
 * Subject Catalog — multi-subject ecosystem
 *
 * Additive companion to the existing TECH_REGISTRY / Syllabus engine
 * (engine.ts, library.ts, levels.ts, static.ts), which already covers
 * ~28 programming/web/database/devops/ai technologies in depth. This file
 * extends the ecosystem to the remaining categories from the spec —
 * spoken Languages, Mathematics, Physics, Chemistry, Biology — plus a
 * lightweight Subject Library browsing/enrollment layer that sits next to
 * (not instead of) the tech roadmap system. Levels here use a simple 0–5
 * index that maps onto the same Beginner→Expert spirit as `SkillLevel`.
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

// ─── Localization layer ───────────────────────────────────────────────────────
// Canonical subject/curriculum content stays English (used as DB-stable IDs and
// as a guaranteed fallback); these lookup tables translate it for display in
// the learner's chosen UI language. Keyed by the canonical English string so
// shared trees (programmingTree/languageTree) only need one entry per topic.

type Lang3 = 'ru' | 'en' | 'hi'

const LEVEL_I18N: Record<string, Record<Lang3, string>> = {
  'Complete Beginner': { en: 'Complete Beginner', ru: 'Полный новичок', hi: 'पूर्ण शुरुआती' },
  'Beginner':          { en: 'Beginner',          ru: 'Начинающий',     hi: 'शुरुआती' },
  'Intermediate':      { en: 'Intermediate',      ru: 'Средний',        hi: 'मध्यम' },
  'Advanced':          { en: 'Advanced',          ru: 'Продвинутый',    hi: 'उन्नत' },
  'Professional':      { en: 'Professional',      ru: 'Профессионал',   hi: 'व्यावसायिक' },
  'Expert':            { en: 'Expert',            ru: 'Эксперт',        hi: 'विशेषज्ञ' },
}

export function levelLabel(index: number, lang: Lang3 = 'en'): string {
  const base = LEVELS.find((l) => l.index === index) ?? LEVELS[0]
  return LEVEL_I18N[base.label]?.[lang] ?? base.label
}

// ─── Subject categories ───────────────────────────────────────────────────────

export type SubjectCategory =
  | 'languages'
  | 'programming'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'ai'
  | 'computer_science'

export const CATEGORY_LABELS: Record<SubjectCategory, string> = {
  languages: 'Languages',
  programming: 'Programming',
  mathematics: 'Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  ai: 'Artificial Intelligence',
  computer_science: 'Computer Science',
}

const CATEGORY_I18N: Record<SubjectCategory, Record<Lang3, string>> = {
  languages:   { en: 'Languages',               ru: 'Языки',                  hi: 'भाषाएं' },
  programming: { en: 'Programming',             ru: 'Программирование',       hi: 'प्रोग्रामिंग' },
  mathematics: { en: 'Mathematics',             ru: 'Математика',             hi: 'गणित' },
  physics:     { en: 'Physics',                 ru: 'Физика',                 hi: 'भौतिकी' },
  chemistry:   { en: 'Chemistry',               ru: 'Химия',                  hi: 'रसायन विज्ञान' },
  biology:     { en: 'Biology',                 ru: 'Биология',               hi: 'जीव विज्ञान' },
  ai:          { en: 'Artificial Intelligence', ru: 'Искусственный интеллект', hi: 'कृत्रिम बुद्धिमत्ता' },
  computer_science: { en: 'Computer Science',   ru: 'Информатика',            hi: 'कंप्यूटर विज्ञान' },
}

export function categoryLabel(category: SubjectCategory, lang: Lang3 = 'en'): string {
  return CATEGORY_I18N[category]?.[lang] ?? CATEGORY_LABELS[category]
}

// Module-title translations — keyed by the canonical English title so every
// tree (math/physics/chemistry/biology/programming/language) shares one table.
const MODULE_TITLE_I18N: Record<string, Record<Lang3, string>> = {
  'Foundations':                   { en: 'Foundations',                   ru: 'Основы',                              hi: 'आधारभूत बातें' },
  'Algebra':                       { en: 'Algebra',                       ru: 'Алгебра',                             hi: 'बीजगणित' },
  'Geometry':                      { en: 'Geometry',                      ru: 'Геометрия',                           hi: 'ज्यामिति' },
  'Trigonometry':                  { en: 'Trigonometry',                  ru: 'Тригонометрия',                       hi: 'त्रिकोणमिति' },
  'Statistics':                    { en: 'Statistics',                    ru: 'Статистика',                          hi: 'सांख्यिकी' },
  'Calculus':                      { en: 'Calculus',                      ru: 'Математический анализ',               hi: 'कलन (कैलकुलस)' },
  'Advanced Mathematics':          { en: 'Advanced Mathematics',          ru: 'Высшая математика',                   hi: 'उन्नत गणित' },
  'Motion':                        { en: 'Motion',                        ru: 'Движение',                            hi: 'गति' },
  'Mechanics':                     { en: 'Mechanics',                     ru: 'Механика',                            hi: 'यांत्रिकी' },
  'Energy':                        { en: 'Energy',                        ru: 'Энергия',                             hi: 'ऊर्जा' },
  'Electricity':                   { en: 'Electricity',                   ru: 'Электричество',                       hi: 'बिजली' },
  'Magnetism':                     { en: 'Magnetism',                     ru: 'Магнетизм',                           hi: 'चुंबकत्व' },
  'Waves':                         { en: 'Waves',                         ru: 'Волны',                               hi: 'तरंगें' },
  'Thermodynamics':                { en: 'Thermodynamics',                ru: 'Термодинамика',                       hi: 'ऊष्मागतिकी' },
  'Modern Physics':                { en: 'Modern Physics',                ru: 'Современная физика',                  hi: 'आधुनिक भौतिकी' },
  'Atoms':                         { en: 'Atoms',                         ru: 'Атомы',                               hi: 'परमाणु' },
  'Molecules':                     { en: 'Molecules',                     ru: 'Молекулы',                            hi: 'अणु' },
  'Chemical Reactions':            { en: 'Chemical Reactions',            ru: 'Химические реакции',                  hi: 'रासायनिक अभिक्रियाएं' },
  'Organic Chemistry':             { en: 'Organic Chemistry',             ru: 'Органическая химия',                  hi: 'कार्बनिक रसायन विज्ञान' },
  'Physical Chemistry':            { en: 'Physical Chemistry',            ru: 'Физическая химия',                    hi: 'भौतिक रसायन विज्ञान' },
  'Cell Biology':                  { en: 'Cell Biology',                  ru: 'Клеточная биология',                  hi: 'कोशिका जीव विज्ञान' },
  'Human Biology':                 { en: 'Human Biology',                 ru: 'Биология человека',                   hi: 'मानव जीव विज्ञान' },
  'Genetics':                      { en: 'Genetics',                      ru: 'Генетика',                            hi: 'आनुवंशिकी' },
  'Evolution':                     { en: 'Evolution',                     ru: 'Эволюция',                            hi: 'विकास (इवोल्यूशन)' },
  'Ecology':                       { en: 'Ecology',                       ru: 'Экология',                            hi: 'पारिस्थितिकी' },
  'Advanced Biology':              { en: 'Advanced Biology',              ru: 'Продвинутая биология',                hi: 'उन्नत जीव विज्ञान' },
  'Control Flow':                  { en: 'Control Flow',                  ru: 'Управляющие конструкции',             hi: 'नियंत्रण प्रवाह' },
  'Data Structures':               { en: 'Data Structures',               ru: 'Структуры данных',                    hi: 'डेटा संरचनाएं' },
  'Object-Oriented Programming':   { en: 'Object-Oriented Programming',   ru: 'Объектно-ориентированное программирование', hi: 'ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग' },
  'Advanced Topics':               { en: 'Advanced Topics',               ru: 'Продвинутые темы',                    hi: 'उन्नत विषय' },
  'Professional Practice':         { en: 'Professional Practice',         ru: 'Профессиональная практика',           hi: 'व्यावसायिक अभ्यास' },
  'Everyday Basics':               { en: 'Everyday Basics',               ru: 'Повседневные основы',                 hi: 'रोज़मर्रा की बुनियादी बातें' },
  'Grammar Essentials':            { en: 'Grammar Essentials',            ru: 'Основы грамматики',                   hi: 'व्याकरण की बुनियादी बातें' },
  'Conversation':                  { en: 'Conversation',                  ru: 'Разговорная речь',                    hi: 'बातचीत' },
  'Reading & Writing':             { en: 'Reading & Writing',             ru: 'Чтение и письмо',                     hi: 'पढ़ना और लिखना' },
  'Fluency & Nuance':              { en: 'Fluency & Nuance',              ru: 'Беглость и нюансы',                   hi: 'प्रवाह और बारीकियां' },
  'Mastery':                       { en: 'Mastery',                       ru: 'Мастерство',                          hi: 'निपुणता' },
}

/** Translate a module title, including the templated "{Name} Ecosystem" / "{Name} Idioms" forms. */
export function moduleTitleLabel(title: string, lang: Lang3 = 'en'): string {
  const direct = MODULE_TITLE_I18N[title]?.[lang]
  if (direct) return direct
  const ecosystem = title.match(/^(.+) Ecosystem$/)
  if (ecosystem) return lang === 'ru' ? `Экосистема ${ecosystem[1]}` : lang === 'hi' ? `${ecosystem[1]} इकोसिस्टम` : title
  const idioms = title.match(/^(.+) Idioms$/)
  if (idioms) return lang === 'ru' ? `Идиомы ${idioms[1]}` : lang === 'hi' ? `${idioms[1]} के मुहावरे` : title
  return title
}

const SUBJECT_I18N: Record<string, Record<Exclude<Lang3, 'en'>, { name: string; description: string }>> = {
  english:    { ru: { name: 'Английский', description: 'Говорите, читайте и пишите по-английски уверенно.' },
                hi: { name: 'अंग्रेज़ी',     description: 'अंग्रेज़ी में आत्मविश्वास से बोलें, पढ़ें और लिखें।' } },
  russian:    { ru: { name: 'Русский',    description: 'Изучите русский язык от алфавита до свободного общения.' },
                hi: { name: 'रूसी',         description: 'रूसी भाषा वर्णमाला से लेकर धाराप्रवाह बातचीत तक सीखें।' } },
  hindi:      { ru: { name: 'Хинди',       description: 'Изучайте хинди шаг за шагом — от основ до свободного владения.' },
                hi: { name: 'हिन्दी',       description: 'हिंदी को चरण दर चरण सीखें — बुनियादी बातों से प्रवाह तक।' } },
  german:     { ru: { name: 'Немецкий',    description: 'Развивайте немецкий язык с нуля до уверенного общения.' },
                hi: { name: 'जर्मन',        description: 'जर्मन भाषा कौशल को शुरुआत से आत्मविश्वासपूर्ण बातचीत तक विकसित करें।' } },
  arabic:     { ru: { name: 'Арабский',    description: 'Научитесь читать, писать и говорить по-арабски.' },
                hi: { name: 'अरबी',         description: 'अरबी पढ़ना, लिखना और बोलना सीखें।' } },
  c:          { ru: { name: 'Си',          description: 'C — основа системного программирования, от указателей до ядра ОС.' },
                hi: { name: 'C',            description: 'C — सिस्टम प्रोग्रामिंग की नींव, पॉइंटर्स से लेकर कर्नेल तक।' } },
  python:     { ru: { name: 'Python',      description: 'Python — от первого скрипта до продвинутых проектов.' },
                hi: { name: 'Python',       description: 'Python — पहली स्क्रिप्ट से उन्नत प्रोजेक्ट्स तक।' } },
  javascript: { ru: { name: 'JavaScript',  description: 'JavaScript для веба — от основ до продвинутых паттернов.' },
                hi: { name: 'JavaScript',   description: 'वेब के लिए JavaScript — बुनियादी बातों से उन्नत पैटर्न तक।' } },
  typescript: { ru: { name: 'TypeScript',  description: 'Типизированный JavaScript — более безопасный и масштабируемый код.' },
                hi: { name: 'TypeScript',   description: 'टाइप्ड JavaScript — सुरक्षित और अधिक स्केलेबल कोड।' } },
  java:       { ru: { name: 'Java',        description: 'Основы Java — вплоть до разработки корпоративного уровня.' },
                hi: { name: 'Java',         description: 'Java की बुनियादी बातों से एंटरप्राइज़-स्तरीय विकास तक।' } },
  cpp:        { ru: { name: 'C++',         description: 'Современный C++ — производительность, память и системное программирование.' },
                hi: { name: 'C++',          description: 'आधुनिक C++ — प्रदर्शन, मेमोरी और सिस्टम प्रोग्रामिंग।' } },
  csharp:     { ru: { name: 'C#',          description: 'C# для приложений, игр и экосистемы .NET.' },
                hi: { name: 'C#',           description: 'ऐप्स, गेम्स और .NET इकोसिस्टम के लिए C#।' } },
  go:         { ru: { name: 'Go',          description: 'Go — простой и быстрый язык для современных бэкендов.' },
                hi: { name: 'Go',           description: 'Go — सरल, तेज़ और आधुनिक बैकएंड के लिए बना भाषा।' } },
  rust:       { ru: { name: 'Rust',        description: 'Rust — безопасное системное программирование без сборщика мусора.' },
                hi: { name: 'Rust',         description: 'Rust — गार्बेज कलेक्टर के बिना सुरक्षित सिस्टम प्रोग्रामिंग।' } },
  mathematics:{ ru: { name: 'Математика',  description: 'Полный путь от базовой арифметики до высшей математики.' },
                hi: { name: 'गणित',         description: 'बुनियादी अंकगणित से लेकर उन्नत गणित तक की संपूर्ण यात्रा।' } },
  physics:    { ru: { name: 'Физика',      description: 'Поймите, как устроен физический мир — от движения до квантовой физики.' },
                hi: { name: 'भौतिकी',       description: 'जानें भौतिक संसार कैसे काम करता है — गति से क्वांटम भौतिकी तक।' } },
  quantum_physics: { ru: { name: 'Квантовая физика', description: 'Полный путь от школьной алгебры до основ квантовых исследований.' },
                hi: { name: 'क्वांटम भौतिकी', description: 'स्कूली बीजगणित से क्वांटम अनुसंधान की नींव तक की संपूर्ण यात्रा।' } },
  chemistry:  { ru: { name: 'Химия',       description: 'От атомов до органической химии — простыми словами.' },
                hi: { name: 'रसायन विज्ञान', description: 'परमाणुओं से कार्बनिक रसायन विज्ञान तक — सरल शब्दों में।' } },
  biology:    { ru: { name: 'Биология',    description: 'Исследуйте жизнь — от клеток до экосистем.' },
                hi: { name: 'जीव विज्ञान',   description: 'जीवन की खोज करें — कोशिकाओं से पारिस्थितिकी तंत्र तक।' } },
}

export function localizedSubjectName(subject: LibrarySubject, lang: Lang3 = 'en'): string {
  if (lang === 'en') return subject.name
  return SUBJECT_I18N[subject.slug]?.[lang]?.name ?? subject.name
}

export function localizedSubjectDescription(subject: LibrarySubject, lang: Lang3 = 'en'): string {
  if (lang === 'en') return subject.description
  return SUBJECT_I18N[subject.slug]?.[lang]?.description ?? subject.description
}

// ─── Curriculum tree shape ────────────────────────────────────────────────────
// A curriculum tree is an ordered list of modules; each module is an ordered
// list of topic nodes. This mirrors the bullet trees in the spec, e.g.
//   Algebra ├── Variables ├── Equations ├── Functions

/** Pedagogical difficulty tag (matches the platform's Beginner→Expert spirit).
 *  Optional metadata carried by richer trees (e.g. Quantum Physics); existing
 *  trees omit it and behave exactly as before. */
export type Difficulty = 'foundational' | 'developing' | 'proficient' | 'advanced'

export interface CurriculumNode {
  slug: string
  title: string
  /** Optional lesson-level prerequisites, referenced by node slug. Authored in
   *  strict topological order, so every entry points to an earlier node. */
  prerequisites?: string[]
  /** Optional per-lesson difficulty tag. */
  difficulty?: Difficulty
}

export interface CurriculumModule {
  slug: string
  title: string
  nodes: CurriculumNode[]
  /** Roughly which levels this module belongs to (inclusive range). */
  levelRange: [LevelIndex, LevelIndex]
  estimatedHours: number
  /** Optional unit-level difficulty tag. */
  difficulty?: Difficulty
  /** Optional unit-level prerequisites, referenced by module slug. */
  prerequisites?: string[]
}

export interface LibrarySubject {
  slug: string
  name: string
  category: SubjectCategory
  icon: string
  description: string
  modules: CurriculumModule[]
  // Visibility flag — false hides the subject from discovery UIs (library,
  // onboarding, enroll APIs) without deleting any data or curriculum.
  // Flip to true to restore. Enrolled users are never affected regardless.
  visible?: boolean
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

// ─── Computer Science ─────────────────────────────────────────────────────────
// Lightweight Subject Library tree (mod()-based, mirrors MATH_TREE/PHYSICS_TREE/
// CHEMISTRY_TREE) — not the "advanced" qUnit/cmUnit pattern, since there is no
// dedicated master-curriculum doc for Computer Science. Topics are chosen to
// align with the existing, already production-integrated COMPUTER_SCIENCE_3D_RULES
// keyword table in detectVisual.ts, so real lesson text naturally triggers the
// already-built 3D visuals (three_computer_architecture, three_memory_storage,
// three_network_packet_flow, three_data_structure, three_algorithm_visualization).
const COMPUTER_SCIENCE_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['What Is a Computer', 'Binary & Data Representation', 'Computer Architecture'], [0, 1], 8),
  mod('data_structures', 'Data Structures', ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees & Graphs'], [1, 3], 10),
  mod('algorithms', 'Algorithms', ['Sorting Algorithms', 'Searching Algorithms', 'Algorithmic Complexity'], [2, 4], 10),
  mod('memory_storage', 'Memory & Storage', ['Memory Hierarchy', 'Cache', 'RAM vs Storage'], [2, 4], 8),
  mod('networking', 'Networking', ['Networks & Packets', 'Routers & Protocols', 'The Internet'], [2, 4], 8),
  mod('operating_systems', 'Operating Systems', ['Processes', 'File Systems', 'Concurrency'], [3, 5], 8),
]

// ─── Data Science ─────────────────────────────────────────────────────────────
// Lightweight Subject Library tree (mod()-based, mirrors COMPUTER_SCIENCE_TREE) —
// not the "advanced" qUnit/cmUnit pattern, since there is no dedicated
// master-curriculum doc for Data Science. Topics are chosen to align with a new
// DATA_SCIENCE_3D_RULES keyword table in detectVisual.ts, so real lesson text
// naturally triggers the already-built Foundation 3D visuals (three_statistical_
// distribution, three_data_visualization, three_correlation, three_clustering,
// three_ml_pipeline) from the Data Science 3D Foundation Sprint
// (docs/DATA_SCIENCE_3D_FOUNDATION_REPORT.md), which built those components but
// left them production-unreachable pending curriculum registration.
const DATA_SCIENCE_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['What Is Data Science', 'Data Collection', 'Statistical Distribution'], [0, 1], 8),
  mod('data_visualization', 'Data Visualization', ['Bar Charts', 'Scatter Plots', 'Trend Lines'], [1, 2], 8),
  mod('correlation_regression', 'Correlation & Regression', ['Correlation', 'Positive & Negative Correlation', 'Regression'], [2, 3], 10),
  mod('clustering', 'Clustering', ['Unsupervised Learning', 'Cluster Centers', 'Grouping Data'], [3, 4], 8),
  mod('ml_pipeline', 'Machine Learning Pipeline', ['Data Cleaning', 'Feature Preparation', 'Model Training', 'Prediction'], [3, 5], 10),
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

// ─── Career & professional skills (Sprint D — roadmap building blocks) ───────
// Compact, focused trees for the tooling/skills that career roadmaps chain
// together (e.g. Backend Developer: Python → Databases → APIs → Git → Docker).
// Distinct slugs from TECH_REGISTRY (sql/git/docker/...) by design — those
// power the lighter ad-hoc tech-roadmap generator, while these become real,
// enrollable Subject Library entries with full module/assessment tracking.

const DATABASES_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['What Is a Database', 'Tables & Schemas', 'Data Types'], [0, 1], 6),
  mod('sql_querying', 'SQL Querying', ['SELECT & Filtering', 'Joins', 'Aggregations & Grouping'], [1, 2], 10),
  mod('schema_design', 'Schema Design', ['Keys & Relationships', 'Normalization', 'Indexes'], [2, 3], 8),
  mod('professional_practice', 'Professional Practice', ['Transactions', 'Performance Tuning', 'Working with an ORM'], [3, 4], 10),
]

const VERSION_CONTROL_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['What Is Version Control', 'Commits & History', 'Staging & Diffs'], [0, 1], 4),
  mod('branching', 'Branching & Merging', ['Branches', 'Merging', 'Resolving Conflicts'], [1, 2], 6),
  mod('collaboration', 'Collaboration', ['Remotes & Pull Requests', 'Code Review Workflow', 'Rebasing'], [2, 3], 6),
  mod('professional_practice', 'Professional Practice', ['Git Strategies (Trunk/GitFlow)', 'CI Hooks', 'Recovering from Mistakes'], [3, 4], 6),
]

const CONTAINERS_DEPLOYMENT_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Why Containers', 'Images & Containers', 'The Command Line'], [0, 1], 6),
  mod('building_images', 'Building Images', ['Dockerfiles', 'Layers & Caching', 'Environment & Config'], [1, 2], 8),
  mod('orchestration', 'Running Services', ['Networking & Volumes', 'Compose & Multi-Service Apps', 'Logs & Debugging'], [2, 3], 8),
  mod('professional_practice', 'Deployment', ['CI/CD Pipelines', 'Cloud Deployment', 'Monitoring & Rollbacks'], [3, 4], 10),
]

const DATA_VISUALIZATION_TREE: CurriculumModule[] = [
  mod('foundations', 'Foundations', ['Why Visualize Data', 'Chart Types', 'Choosing the Right Chart'], [0, 1], 5),
  mod('exploratory_analysis', 'Exploratory Analysis', ['Cleaning & Shaping Data', 'Summary Statistics', 'Spotting Patterns'], [1, 2], 8),
  mod('storytelling', 'Visual Storytelling', ['Dashboards', 'Design & Clarity', 'Presenting Insights'], [2, 3], 8),
  mod('professional_practice', 'Professional Practice', ['Tooling (Charts/BI)', 'Interactive Visuals', 'Reporting to Stakeholders'], [3, 4], 8),
]

// ─── Artificial Intelligence ──────────────────────────────────────────────────

const AI_TREE: CurriculumModule[] = [
  // Level 0 — AI Foundations
  mod('ai-foundations', 'AI Foundations', [
    'What Is AI', 'Types of AI', 'History of AI', 'AI vs Machine Learning vs Deep Learning', 'How AI Is Used Today', 'Ethics in AI',
  ], [0, 0], 8),
  // Level 1 — Machine Learning
  mod('ml-supervised', 'Supervised Learning', [
    'Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'Support Vector Machines', 'Evaluating Models',
  ], [1, 1], 12),
  mod('ml-unsupervised', 'Unsupervised Learning', [
    'Clustering (k-Means)', 'Dimensionality Reduction', 'PCA', 'Anomaly Detection', 'Association Rules',
  ], [1, 2], 10),
  mod('ml-workflow', 'ML Workflow', [
    'Data Collection & Cleaning', 'Feature Engineering', 'Train/Val/Test Splits', 'Hyperparameter Tuning', 'Model Deployment Basics',
  ], [1, 2], 10),
  // Level 2 — Deep Learning
  mod('dl-fundamentals', 'Neural Network Fundamentals', [
    'Perceptrons & Activation Functions', 'Feedforward Networks', 'Backpropagation', 'Gradient Descent', 'Regularisation & Dropout',
  ], [2, 2], 12),
  mod('dl-cnn', 'Convolutional Neural Networks', [
    'Convolution & Pooling', 'Image Classification', 'Transfer Learning', 'Object Detection Basics',
  ], [2, 3], 10),
  mod('dl-rnn', 'Sequence Models', [
    'RNNs & LSTMs', 'Text Classification', 'Language Modelling Basics', 'Attention Mechanism',
  ], [2, 3], 10),
  // Level 3 — Practical AI Engineering
  mod('ai-engineering', 'Practical AI Engineering', [
    'Model Training Infrastructure', 'Experiment Tracking (MLflow)', 'Serving Models (REST APIs)', 'Monitoring in Production', 'A/B Testing Models',
  ], [3, 3], 12),
  mod('data-engineering', 'Data Engineering for AI', [
    'Data Pipelines', 'Feature Stores', 'Vector Databases', 'Streaming Data', 'ETL Best Practices',
  ], [3, 4], 10),
  // Level 4 — Generative AI
  mod('transformers', 'Transformers & LLMs', [
    'Transformer Architecture', 'BERT & GPT Overview', 'Tokenisation', 'Prompt Engineering', 'Fine-Tuning LLMs', 'RAG (Retrieval-Augmented Generation)',
  ], [4, 4], 14),
  mod('genai-applications', 'Generative AI Applications', [
    'Text Generation', 'Image Generation (Diffusion Models)', 'Audio & Video AI', 'Code Generation', 'Agents & Tool Use',
  ], [4, 5], 12),
  // Level 5 — Professional AI Systems
  mod('mlops', 'MLOps & Production AI', [
    'CI/CD for ML', 'Model Versioning', 'Scalable Inference', 'Drift Detection', 'Governance & Compliance',
  ], [5, 5], 14),
  mod('ai-safety', 'AI Safety & Responsible AI', [
    'Bias & Fairness', 'Explainability (SHAP/LIME)', 'Robustness & Adversarial Attacks', 'Privacy-Preserving ML', 'AI Regulations',
  ], [5, 5], 10),
  mod('ai-architecture', 'AI System Architecture', [
    'Designing AI Products', 'Multi-Agent Systems', 'Hybrid AI Systems', 'Cost & Latency Optimisation', 'Capstone Project',
  ], [5, 5], 16),
]

// ─── Quantum Physics (full reconstructed curriculum) ─────────────────────────
// Faithful encoding of docs/QUANTUM_PHYSICS_MASTER_CURRICULUM.md (Revision 2):
// 7 levels → 33 units → 144 lessons, with per-unit difficulty and lesson-level
// prerequisite metadata. Units map to CurriculumModule, lessons to CurriculumNode.
// 7 pedagogical levels → 0–5 LevelIndex (L1→0, L2→1, L3→2, L4→3, L5→4, L6→5, L7→5).
// Lessons are authored in strict topological order; every prereq points to an
// earlier-numbered lesson, so the dependency graph is a DAG by construction.

type QLesson = { id: string; title: string; prereqs: string[] }

function qL(id: string, title: string, prereqs: string[] = []): QLesson {
  return { id, title, prereqs }
}

function qUnit(
  num: number,
  title: string,
  level: LevelIndex,
  estimatedHours: number,
  difficulty: Difficulty,
  prereqUnits: number[],
  lessons: QLesson[],
): CurriculumModule {
  const lessonSlug = (id: string) => `l${id.replace(/\./g, '-')}`
  return {
    slug: `u${num}`,
    title,
    levelRange: [level, level],
    estimatedHours,
    difficulty,
    prerequisites: prereqUnits.map((u) => `u${u}`),
    nodes: lessons.map((l) => ({
      slug: lessonSlug(l.id),
      title: l.title,
      difficulty,
      prerequisites: l.prereqs.map(lessonSlug),
    })),
  }
}

const QUANTUM_PHYSICS_TREE: CurriculumModule[] = [
  // ── Level 1 — Foundations (LevelIndex 0) ──
  qUnit(1, 'Mathematical Toolkit I', 0, 18, 'foundational', [], [
    qL('1.1', 'Functions, graphs & units review'),
    qL('1.2', 'Derivatives & rates of change', ['1.1']),
    qL('1.3', 'Derivative applications & practice', ['1.2']),
    qL('1.4', 'Integrals & areas', ['1.3']),
    qL('1.5', 'Intro to differential equations — first-order, separable', ['1.4']),
    qL('1.6', 'Second-order ODEs & the oscillator equation', ['1.5']),
    qL('1.7', "Complex numbers & Euler's formula", ['1.1']),
  ]),
  qUnit(2, 'Classical Physics Essentials', 0, 10, 'foundational', [1], [
    qL('2.1', 'Position, velocity, acceleration', ['1.2']),
    qL('2.2', "Forces, momentum & Newton's laws", ['2.1']),
    qL('2.3', 'Work, energy & potentials', ['2.2']),
    qL('2.4', 'Probability & expectation values', ['1.4']),
  ]),
  qUnit(3, 'Waves & Oscillations', 0, 10, 'foundational', [2], [
    qL('3.1', 'Simple harmonic motion', ['2.3', '1.6']),
    qL('3.2', 'Wave properties: wavelength, frequency, phase', ['3.1']),
    qL('3.3', 'Superposition & interference', ['3.2']),
    qL('3.4', 'Standing waves & normal modes', ['3.3']),
  ]),
  qUnit(4, 'The Failure of Classical Physics', 0, 12, 'developing', [3], [
    qL('4.1', 'Blackbody radiation & the ultraviolet catastrophe', ['3.4']),
    qL('4.2', 'The photoelectric effect', ['4.1']),
    qL('4.3', 'Atomic line spectra & the Bohr model', ['4.2']),
    qL('4.4', 'The Compton effect & photon momentum', ['4.2']),
  ]),

  // ── Level 2 — Wave Mechanics (LevelIndex 1) ──
  qUnit(5, 'Mathematical Toolkit II', 1, 16, 'developing', [1], [
    qL('5.1', 'Vectors & vector spaces', ['1.7']),
    qL('5.2', 'Matrices & linear transformations', ['5.1']),
    qL('5.3', 'Eigenvalues & eigenvectors', ['5.2']),
    qL('5.4', 'Inner products & orthogonality', ['5.1']),
    qL('5.5', 'Fourier series & transforms', ['5.4']),
  ]),
  qUnit(6, 'Wave–Particle Duality', 1, 10, 'developing', [4, 5], [
    qL('6.1', 'de Broglie matter waves', ['4.4', '5.5']),
    qL('6.2', 'The double-slit experiment with particles', ['6.1']),
    qL('6.3', 'Wave packets & group velocity', ['6.1']),
    qL('6.4', 'Heisenberg uncertainty (qualitative)', ['6.3']),
  ]),
  qUnit(7, 'The Schrödinger Equation', 1, 20, 'proficient', [6], [
    qL('7.1', "The wavefunction & Born's rule", ['6.4']),
    qL('7.2', 'Time-dependent Schrödinger equation', ['7.1']),
    qL('7.3', 'Time-independent Schrödinger equation & stationary states', ['7.2']),
    qL('7.4', 'Probability current & normalization', ['7.1']),
    qL('7.5', 'Free particle, plane waves & momentum eigenstates', ['7.3']),
    qL('7.6', 'Wave-packet normalization — intuition and pitfalls', ['7.5', '6.3']),
  ]),
  qUnit(8, 'Particle in 1D Potentials', 1, 14, 'proficient', [7], [
    qL('8.1', 'Infinite square well', ['7.3', '7.6']),
    qL('8.2', 'Finite square well & bound states', ['8.1']),
    qL('8.3', 'Potential barriers & quantum tunneling', ['8.2']),
    qL('8.4', 'The step potential & reflection', ['8.2']),
  ]),

  // ── Level 3 — Formal Quantum Mechanics (LevelIndex 2) ──
  qUnit(9, 'Hilbert Spaces & Dirac Notation', 2, 16, 'proficient', [5, 8], [
    qL('9.1', 'Bridge: from wavefunctions to state vectors', ['8.1', '5.4']),
    qL('9.2', 'State vectors & bra–ket notation', ['9.1']),
    qL('9.3', 'Hilbert space & completeness', ['9.2']),
    qL('9.4', 'Basis states & superposition', ['9.3']),
    qL('9.5', 'Position & momentum representations', ['9.4', '7.5']),
  ]),
  qUnit(10, 'Postulates of Quantum Mechanics', 2, 16, 'proficient', [9], [
    qL('10.1', 'The state postulate', ['9.5']),
    qL('10.2', 'Observables as Hermitian operators', ['10.1']),
    qL('10.3', 'The measurement postulate & collapse', ['10.2']),
    qL('10.4', 'Time evolution & the Hamiltonian', ['10.2']),
    qL('10.5', 'Pictures of quantum mechanics: Schrödinger, Heisenberg, interaction', ['10.4']),
  ]),
  qUnit(11, 'Operators, Observables & Measurement', 2, 18, 'advanced', [10], [
    qL('11.1', 'Expectation values & variance', ['10.3']),
    qL('11.2', 'Commutators & compatibility', ['11.1']),
    qL('11.3', 'The generalized uncertainty principle', ['11.2']),
    qL('11.4', 'Eigenstates, spectra & degeneracy', ['11.1']),
    qL('11.5', 'Symmetries & conservation laws (intro)', ['11.2', '11.4']),
    qL('11.6', "Ehrenfest's theorem & the classical limit", ['11.2']),
  ]),
  qUnit(12, 'The Quantum Harmonic Oscillator', 2, 12, 'advanced', [11], [
    qL('12.1', 'The QHO Hamiltonian & energy ladder', ['11.4']),
    qL('12.2', 'Ladder (creation/annihilation) operators', ['12.1']),
    qL('12.3', 'Wavefunctions & Hermite polynomials', ['12.1']),
    qL('12.4', 'Coherent states & applications', ['12.2']),
  ]),
  qUnit(13, 'Angular Momentum & Spin', 2, 16, 'advanced', [11], [
    qL('13.1', 'Orbital angular momentum operators', ['11.2']),
    qL('13.2', 'Eigenvalues & spherical harmonics', ['13.1']),
    qL('13.3', 'Spin-½ & the Stern–Gerlach experiment', ['13.1']),
    qL('13.4', 'Pauli matrices & spinors', ['13.3']),
    qL('13.5', 'Addition of angular momenta', ['13.2', '13.4']),
  ]),
  qUnit(14, 'The Hydrogen Atom', 2, 14, 'advanced', [12, 13], [
    qL('14.1', 'The Coulomb potential & separation in 3D', ['13.2']),
    qL('14.2', 'Radial solutions & energy levels', ['14.1']),
    qL('14.3', 'Orbitals & probability densities', ['14.2']),
    qL('14.4', 'Fine structure & spin–orbit coupling', ['14.2', '13.5']),
  ]),
  qUnit(15, 'Composite Quantum Systems & Tensor Products', 2, 10, 'advanced', [13], [
    qL('15.1', 'Tensor products & composite-system state spaces', ['13.4', '9.5']),
    qL('15.2', 'Multi-particle Hilbert spaces & distinguishable vs. identical setups', ['15.1']),
  ]),

  // ── Level 4 — Advanced Quantum Systems (LevelIndex 3) ──
  qUnit(16, 'Identical Particles & Many-Body Basics', 3, 12, 'advanced', [14, 15], [
    qL('16.1', 'Indistinguishability & exchange symmetry', ['14.3', '15.2']),
    qL('16.2', 'Bosons, fermions & the Pauli exclusion principle', ['16.1']),
    qL('16.3', 'Slater determinants & the periodic table', ['16.2', '15.1']),
    qL('16.4', 'Exchange interaction & basic many-body effects', ['16.2']),
  ]),
  qUnit(17, 'Approximation Methods', 3, 14, 'advanced', [14], [
    qL('17.1', 'Time-independent perturbation theory (non-degenerate)', ['14.2']),
    qL('17.2', 'Degenerate perturbation theory', ['17.1']),
    qL('17.3', 'The variational method', ['14.2']),
    qL('17.4', 'The WKB approximation', ['8.3', '14.2']),
  ]),
  qUnit(18, 'Time-Dependent Quantum Mechanics', 3, 12, 'advanced', [17], [
    qL('18.1', 'Time-dependent perturbation theory', ['17.1', '10.5']),
    qL('18.2', "Fermi's golden rule", ['18.1']),
    qL('18.3', 'Interaction with radiation: absorption & emission', ['18.2']),
    qL('18.4', 'Rabi oscillations in two-level systems', ['13.4', '18.1']),
  ]),
  qUnit(19, 'Scattering Theory', 3, 10, 'advanced', [17], [
    qL('19.1', 'Cross sections & scattering amplitude', ['8.4']),
    qL('19.2', 'Partial wave analysis', ['13.2', '19.1']),
    qL('19.3', 'The Born approximation', ['17.1', '19.1']),
  ]),
  qUnit(20, 'Quantum Entanglement & Nonlocality', 3, 10, 'advanced', [13, 15, 16], [
    qL('20.1', 'Entangled states & the EPR paradox', ['15.1', '16.2']),
    qL('20.2', "Bell's theorem & inequalities", ['20.1']),
    qL('20.3', 'Density matrices & mixed states', ['15.1']),
  ]),

  // ── Level 5 — Quantum Information & Computing (LevelIndex 4) ──
  qUnit(21, 'Qubits & Quantum Gates', 4, 12, 'proficient', [20], [
    qL('21.1', 'The qubit & the Bloch sphere', ['20.3', '13.4']),
    qL('21.2', 'Single-qubit gates (X, Y, Z, H, phase)', ['21.1']),
    qL('21.3', 'Multi-qubit gates (CNOT, controlled-U)', ['21.1', '20.1']),
    qL('21.4', 'Universal gate sets & no-cloning', ['21.2', '21.3']),
  ]),
  qUnit(22, 'Quantum Circuits & Algorithms', 4, 24, 'advanced', [21], [
    qL('22.1', 'The circuit model & measurement', ['21.4']),
    qL('22.2', 'Superdense coding & quantum teleportation', ['21.3', '20.1']),
    qL('22.3', 'Deutsch–Jozsa & Bernstein–Vazirani', ['22.1']),
    qL('22.4', "Grover's search algorithm", ['22.1']),
    qL('22.5', "The quantum Fourier transform & Shor's algorithm", ['22.1', '5.5']),
    qL('22.6', 'The variational quantum eigensolver (VQE)', ['22.1', '17.1']),
    qL('22.7', 'QAOA & combinatorial optimization', ['22.6']),
  ]),
  qUnit(23, 'Quantum Error Correction', 4, 12, 'advanced', [22], [
    qL('23.1', 'Decoherence & quantum noise channels', ['20.3']),
    qL('23.2', 'The 3-qubit bit-flip & phase-flip codes', ['23.1', '22.1']),
    qL('23.3', 'The 9-qubit Shor code & stabilizers', ['23.2']),
    qL('23.4', 'Fault tolerance & the threshold theorem', ['23.3']),
  ]),
  qUnit(24, 'Quantum Cryptography & Communication', 4, 10, 'proficient', [22], [
    qL('24.1', 'BB84 quantum key distribution', ['21.2']),
    qL('24.2', 'E91 & entanglement-based QKD', ['20.2']),
    qL('24.3', 'Quantum repeaters & networks', ['22.2']),
  ]),
  qUnit(25, 'Quantum Hardware Platforms', 4, 18, 'proficient', [23], [
    qL('25.1', 'Superconducting qubits', ['23.1']),
    qL('25.2', 'Trapped ions & neutral atoms', ['13.3']),
    qL('25.3', 'Photonic & spin qubits', ['21.1']),
    qL('25.4', 'Benchmarking & the NISQ era', ['23.4']),
    qL('25.5', 'Error mitigation techniques', ['25.4', '23.1']),
    qL('25.6', 'Quantum advantage: claims, skepticism & benchmarks', ['25.4', '22.5']),
  ]),

  // ── Level 6 — Modern Quantum Physics (LevelIndex 5) ──
  qUnit(26, 'Quantum Statistical Mechanics', 5, 12, 'advanced', [16], [
    qL('26.1', 'Density operators & thermal states', ['20.3']),
    qL('26.2', 'Bose–Einstein & Fermi–Dirac statistics', ['16.2']),
    qL('26.3', 'Bose–Einstein condensation', ['26.2']),
    qL('26.4', 'Quantum entropy & information', ['26.1', '20.3']),
  ]),
  qUnit(27, 'Open Quantum Systems & Decoherence', 5, 12, 'advanced', [20, 26], [
    qL('27.1', 'System–environment coupling', ['26.1']),
    qL('27.2', 'The Lindblad master equation', ['27.1']),
    qL('27.3', 'Decoherence & the quantum-to-classical transition', ['27.1']),
    qL('27.4', 'Quantum measurement theory revisited', ['27.3', '10.3']),
  ]),
  qUnit(28, 'Relativistic Quantum Mechanics', 5, 12, 'advanced', [14], [
    qL('28.1', 'Special relativity refresher for QM', ['14.2']),
    qL('28.2', 'The Klein–Gordon equation', ['28.1', '7.2']),
    qL('28.3', 'The Dirac equation & spin', ['28.2', '13.4']),
    qL('28.4', 'Antimatter & the Dirac sea', ['28.3']),
  ]),
  qUnit(29, 'Introduction to Quantum Field Theory', 5, 14, 'advanced', [28], [
    qL('29.1', 'Why fields? Second quantization', ['12.2', '28.3']),
    qL('29.2', 'Canonical quantization of the scalar field', ['29.1']),
    qL('29.3', 'Propagators & Feynman diagrams (intro)', ['29.2']),
    qL('29.4', 'Quantum electrodynamics overview', ['29.3']),
  ]),
  qUnit(30, 'Particle Physics Foundations', 5, 12, 'advanced', [29], [
    qL('30.1', 'The Standard Model particle zoo', ['29.4']),
    qL('30.2', 'Symmetries & conservation laws', ['29.2', '11.5']),
    qL('30.3', 'The Higgs mechanism (conceptual)', ['30.2']),
    qL('30.4', 'Open questions: neutrinos, dark matter, beyond-SM', ['30.1']),
  ]),

  // ── Level 7 — Research Foundations — Orientation & Literacy (LevelIndex 5) ──
  qUnit(31, 'Advanced QFT & Gauge Theory', 5, 14, 'advanced', [29], [
    qL('31.1', 'Gauge invariance & U(1)', ['30.2']),
    qL('31.2', 'Non-abelian gauge theories (Yang–Mills)', ['31.1']),
    qL('31.3', 'Renormalization & running couplings', ['29.3']),
    qL('31.4', 'Path integrals', ['29.2']),
  ]),
  qUnit(32, 'Quantum Many-Body & Condensed Matter', 5, 16, 'advanced', [26], [
    qL('32.1', 'Second quantization for many-body systems', ['29.1']),
    qL('32.2', 'Band theory & semiconductors', ['16.3']),
    qL('32.3', 'Superconductivity & BCS theory', ['26.3']),
    qL('32.4', 'Berry/geometric phase', ['13.2', '17.1']),
    qL('32.5', 'Topological phases & quantum Hall effect', ['32.2', '32.4']),
  ]),
  qUnit(33, 'Frontiers & Research Methods', 5, 10, 'advanced', [31, 32], [
    qL('33.1', 'Reading & evaluating physics papers', ['31.3']),
    qL('33.2', 'Computational quantum methods', ['32.1']),
    qL('33.3', 'Current frontiers: quantum gravity, quantum simulation, fault-tolerant QC', ['32.5', '23.4']),
    qL('33.4', 'Designing a research question', ['33.1']),
  ]),
]

// ─── Classical Mechanics (advanced Library subject) ──────────────────────────
// Faithful encoding of docs/CLASSICAL_MECHANICS_MASTER_CURRICULUM.md:
// 7 levels → 28 units → 127 lessons, with per-unit difficulty, unit-level
// prerequisites, and lesson-level prerequisite metadata. Units map to
// CurriculumModule, lessons to CurriculumNode. 7 pedagogical levels → 0–5
// LevelIndex (L1→0, L2→1, L3→2, L4→3, L5→4, L6→5, L7→5 — mirrors the same
// L6/L7 collapse Quantum Physics uses, since LevelIndex tops out at 5).
// Lessons are authored in strict topological order; every prereq points to an
// earlier-numbered lesson, so the dependency graph is a DAG by construction.

type CMLesson = { id: string; title: string; prereqs: string[] }

function cmL(id: string, title: string, prereqs: string[] = []): CMLesson {
  return { id, title, prereqs }
}

function cmUnit(
  num: number,
  title: string,
  level: LevelIndex,
  estimatedHours: number,
  difficulty: Difficulty,
  prereqUnits: number[],
  lessons: CMLesson[],
): CurriculumModule {
  const lessonSlug = (id: string) => `l${id.replace(/\./g, '-')}`
  return {
    slug: `u${num}`,
    title,
    levelRange: [level, level],
    estimatedHours,
    difficulty,
    prerequisites: prereqUnits.map((u) => `u${u}`),
    nodes: lessons.map((l) => ({
      slug: lessonSlug(l.id),
      title: l.title,
      difficulty,
      prerequisites: l.prereqs.map(lessonSlug),
    })),
  }
}

const CLASSICAL_MECHANICS_TREE: CurriculumModule[] = [
  // ── Level 1 — Foundations (LevelIndex 0) ──
  cmUnit(1, 'Mathematical & Measurement Toolkit', 0, 12, 'foundational', [], [
    cmL('1.1', 'Units, dimensional analysis & significant figures'),
    cmL('1.2', 'Scalars vs. vectors; vector addition & subtraction', ['1.1']),
    cmL('1.3', 'Vector components & unit vectors', ['1.2']),
    cmL('1.4', 'Derivatives & integrals for motion', ['1.1']),
  ]),
  cmUnit(2, 'One-Dimensional Kinematics', 0, 10, 'foundational', [1], [
    cmL('2.1', 'Position, displacement & distance', ['1.4']),
    cmL('2.2', 'Velocity & speed; reading motion graphs', ['2.1']),
    cmL('2.3', 'Acceleration & the kinematic equations', ['2.2']),
    cmL('2.4', 'Free fall & motion under constant acceleration', ['2.3']),
  ]),
  cmUnit(3, 'Two-Dimensional Kinematics & Projectile Motion', 0, 10, 'foundational', [2], [
    cmL('3.1', 'Position, velocity & acceleration as vectors in 2D', ['1.3', '2.3']),
    cmL('3.2', 'Relative velocity', ['3.1']),
    cmL('3.3', 'Projectile motion: trajectory, range & time of flight', ['3.1']),
    cmL('3.4', 'Projectile motion: maximum height & launch-angle optimization', ['3.3']),
  ]),
  cmUnit(4, "Forces & Newton's Laws", 0, 10, 'developing', [3], [
    cmL('4.1', 'The concept of force; types of forces (gravity, normal, tension, applied)', ['2.3']),
    cmL('4.2', "Newton's first law & inertia", ['4.1']),
    cmL('4.3', 'Newton\'s second law: F = ma', ['4.2']),
    cmL('4.4', "Newton's third law & force pairs", ['4.3']),
    cmL('4.5', 'Free-body diagrams: construction and common errors', ['4.4']),
  ]),

  // ── Level 2 — Newtonian Dynamics (LevelIndex 1) ──
  cmUnit(5, "Applications of Newton's Laws", 1, 12, 'developing', [4], [
    cmL('5.1', 'Friction: static and kinetic', ['4.5']),
    cmL('5.2', 'Inclined planes & force decomposition', ['5.1']),
    cmL('5.3', 'Tension, pulleys & connected objects', ['5.1']),
    cmL('5.4', "Spring forces & Hooke's law", ['4.3']),
    cmL('5.5', 'Problem-solving with multiple coupled bodies', ['5.2', '5.3']),
  ]),
  cmUnit(6, 'Circular Motion', 1, 10, 'developing', [5], [
    cmL('6.1', 'Uniform circular motion: centripetal acceleration', ['3.1']),
    cmL('6.2', 'Centripetal force & applications (banked curves, conical pendulum)', ['6.1', '5.2']),
    cmL('6.3', 'Non-uniform circular motion', ['6.2']),
    cmL('6.4', 'Rotating reference frames: an introduction to pseudo-forces', ['6.2']),
  ]),
  cmUnit(7, 'Work & Energy', 1, 12, 'developing', [5], [
    cmL('7.1', 'Work done by a force, including variable forces', ['4.3']),
    cmL('7.2', 'Kinetic energy & the work–energy theorem', ['7.1']),
    cmL('7.3', 'Potential energy: gravitational and elastic', ['7.1', '5.4']),
    cmL('7.4', 'Conservation of mechanical energy', ['7.2', '7.3']),
    cmL('7.5', 'Power', ['7.2']),
  ]),
  cmUnit(8, 'Momentum & Collisions', 1, 14, 'developing', [7], [
    cmL('8.1', 'Linear momentum & impulse', ['4.3']),
    cmL('8.2', 'Conservation of momentum', ['8.1']),
    cmL('8.3', 'Elastic collisions', ['8.2', '7.4']),
    cmL('8.4', 'Inelastic collisions', ['8.2']),
    cmL('8.5', 'Center of mass & systems of particles', ['8.2']),
  ]),

  // ── Level 3 — Analytical Reformulation (LevelIndex 2) ──
  cmUnit(9, 'Mathematical Toolkit II', 2, 14, 'developing', [1], [
    cmL('9.1', 'Partial derivatives & the gradient', ['1.4']),
    cmL('9.2', 'Multiple integrals (line/surface intuition)', ['9.1']),
    cmL('9.3', 'Second-order linear ODEs (general solution methods)', ['1.4']),
    cmL('9.4', 'Variational reasoning: what it means to minimize a quantity', ['9.2']),
  ]),
  cmUnit(10, 'Generalized Coordinates & Constraints', 2, 12, 'proficient', [9, 8], [
    cmL('10.1', 'Degrees of freedom & generalized coordinates', ['9.1', '8.5']),
    cmL('10.2', 'Holonomic vs. non-holonomic constraints', ['10.1']),
    cmL('10.3', "Virtual work & D'Alembert's principle (conceptual bridge)", ['10.2']),
    cmL('10.4', 'Kinetic and potential energy in generalized coordinates', ['10.1', '7.4']),
  ]),
  cmUnit(11, 'Lagrangian Mechanics', 2, 16, 'proficient', [10], [
    cmL('11.1', 'The principle of least action (conceptual)', ['9.4', '10.3']),
    cmL('11.2', 'The Lagrangian L = T − V', ['10.4']),
    cmL('11.3', 'The Euler–Lagrange equation', ['11.1', '11.2']),
    cmL('11.4', 'Solving simple systems with the Euler–Lagrange equation (pendulum, Atwood machine)', ['11.3']),
    cmL('11.5', 'Equivalence with Newtonian mechanics — recovering F = ma', ['11.3']),
  ]),
  cmUnit(12, 'Symmetry & Conservation', 2, 8, 'proficient', [11], [
    cmL('12.1', 'Cyclic coordinates & conserved momenta', ['11.3']),
    cmL('12.2', "Noether's theorem (qualitative): symmetry implies conservation", ['12.1']),
    cmL('12.3', 'Energy conservation revisited via the Lagrangian', ['12.1', '7.4']),
  ]),

  // ── Level 4 — Rotational Mechanics & Gravitation (LevelIndex 3) ──
  cmUnit(13, 'Rotational Kinematics & Dynamics', 3, 12, 'proficient', [8, 11], [
    cmL('13.1', 'Angular position, velocity & acceleration', ['2.3']),
    cmL('13.2', 'Torque', ['4.3']),
    cmL('13.3', 'Moment of inertia: definition and the parallel-axis theorem', ['13.1']),
    cmL('13.4', 'Rotational form of Newton\'s second law (τ = Iα)', ['13.2', '13.3']),
  ]),
  cmUnit(14, 'Angular Momentum & Rolling Motion', 3, 12, 'proficient', [13], [
    cmL('14.1', 'Angular momentum of a particle and a rigid body', ['13.3']),
    cmL('14.2', 'Conservation of angular momentum', ['14.1']),
    cmL('14.3', 'Rolling without slipping', ['13.4', '14.1']),
    cmL('14.4', 'Rotational kinetic energy & combined translation–rotation problems', ['14.3', '7.4']),
  ]),
  cmUnit(15, 'Newtonian Gravitation', 3, 10, 'proficient', [7], [
    cmL('15.1', "Newton's law of universal gravitation", ['4.3']),
    cmL('15.2', 'Gravitational potential energy & escape velocity', ['15.1', '7.3']),
    cmL('15.3', 'Gravitational field & superposition', ['15.1']),
  ]),
  cmUnit(16, 'Orbital Mechanics', 3, 12, 'proficient', [15, 14], [
    cmL('16.1', "Kepler's three laws (empirical statement)", ['15.1']),
    cmL('16.2', 'Deriving circular-orbit period from gravitation', ['15.1', '14.2']),
    cmL('16.3', 'Elliptical orbits & energy of an orbit', ['15.2', '16.1']),
    cmL('16.4', 'Orbital transfers & escape trajectories (conceptual)', ['16.3']),
  ]),

  // ── Level 5 — Oscillations & Mechanical Waves (LevelIndex 4) ──
  cmUnit(17, 'Simple Harmonic Motion', 4, 10, 'proficient', [9, 7], [
    cmL('17.1', 'The SHM equation and its solution', ['9.3']),
    cmL('17.2', 'Mass–spring systems', ['17.1', '5.4']),
    cmL('17.3', 'The simple pendulum (small-angle approximation)', ['17.1']),
    cmL('17.4', 'Energy in simple harmonic motion', ['17.2', '7.4']),
  ]),
  cmUnit(18, 'Damped & Driven Oscillations', 4, 10, 'proficient', [17], [
    cmL('18.1', 'Damped harmonic motion (underdamped/critical/overdamped)', ['17.1']),
    cmL('18.2', 'Driven oscillations & resonance', ['18.1']),
    cmL('18.3', 'Quality factor and energy dissipation', ['18.1', '18.2']),
  ]),
  cmUnit(19, 'Coupled Oscillators & Normal Modes', 4, 12, 'advanced', [18, 11], [
    cmL('19.1', 'Two coupled oscillators: equations of motion', ['17.1', '11.3']),
    cmL('19.2', 'Normal modes & normal-mode frequencies', ['19.1']),
    cmL('19.3', 'Beats & energy exchange between coupled oscillators', ['19.2']),
  ]),
  cmUnit(20, 'Mechanical Waves', 4, 12, 'advanced', [19], [
    cmL('20.1', 'The wave equation for a stretched string', ['19.1', '9.3']),
    cmL('20.2', 'Traveling vs. standing waves; superposition', ['20.1']),
    cmL('20.3', 'Wave energy & power transmission', ['20.2', '7.5']),
    cmL('20.4', 'The continuum limit: from coupled oscillators to a wave medium', ['19.2', '20.1']),
  ]),

  // ── Level 6 — Hamiltonian & Rigid-Body Mechanics (LevelIndex 5) ──
  cmUnit(21, 'Hamiltonian Mechanics', 5, 14, 'advanced', [12], [
    cmL('21.1', 'Generalized momenta & the Legendre transform (conceptual)', ['12.1']),
    cmL('21.2', "The Hamiltonian H = T + V and Hamilton's equations", ['21.1']),
    cmL('21.3', 'Phase space & phase portraits', ['21.2']),
    cmL('21.4', 'Poisson brackets & conserved quantities (orientation)', ['21.2']),
  ]),
  cmUnit(22, 'Rigid-Body Dynamics', 5, 14, 'advanced', [14, 21], [
    cmL('22.1', 'The inertia tensor', ['13.3']),
    cmL('22.2', 'Principal axes & moments of inertia', ['22.1']),
    cmL('22.3', "Euler's equations for rigid-body rotation", ['22.2', '21.2']),
    cmL('22.4', 'Precession & gyroscopic motion', ['22.3']),
  ]),
  cmUnit(23, 'Non-Inertial Reference Frames', 5, 10, 'advanced', [6, 21], [
    cmL('23.1', 'Pseudo-forces in linearly accelerating frames', ['6.4']),
    cmL('23.2', 'The Coriolis and centrifugal forces in rotating frames', ['6.4', '23.1']),
    cmL('23.3', 'Applications: Foucault pendulum, weather systems (conceptual)', ['23.2']),
  ]),
  cmUnit(24, 'Central-Force Problem & Scattering', 5, 10, 'advanced', [16, 21], [
    cmL('24.1', 'The effective potential for central forces', ['21.2', '16.3']),
    cmL('24.2', 'Classifying orbits by energy (bound vs. unbound)', ['24.1']),
    cmL('24.3', 'Scattering & the differential cross-section (conceptual)', ['24.2']),
  ]),

  // ── Level 7 — Research Foundations — Orientation & Literacy (LevelIndex 5) ──
  cmUnit(25, 'Nonlinear Dynamics & Chaos (orientation)', 5, 10, 'advanced', [21], [
    cmL('25.1', 'Nonlinear oscillators: the driven pendulum beyond small angles', ['18.2', '21.3']),
    cmL('25.2', 'Sensitivity to initial conditions & the butterfly effect (conceptual)', ['25.1']),
    cmL('25.3', 'Bifurcations & strange attractors (orientation, no derivation)', ['25.2']),
  ]),
  cmUnit(26, 'Continuum Mechanics Introduction', 5, 10, 'advanced', [22, 20], [
    cmL('26.1', 'Stress and strain (conceptual)', ['22.1']),
    cmL('26.2', 'Elasticity & Hooke\'s law for continuous media', ['26.1', '5.4']),
    cmL('26.3', 'Fluids at rest: pressure and buoyancy (orientation)', ['26.1']),
  ]),
  cmUnit(27, 'The Classical–Relativistic Boundary', 5, 10, 'advanced', [21], [
    cmL('27.1', "The Galilean transformation & its limits", ['3.2']),
    cmL('27.2', 'Why Newtonian mechanics fails at high speed (conceptual bridge to relativity)', ['27.1']),
    cmL('27.3', 'The classical limit as an approximation of relativistic mechanics (orientation)', ['27.2']),
  ]),
  cmUnit(28, 'Research Literacy & Methods', 5, 10, 'advanced', [25, 26, 27], [
    cmL('28.1', 'Reading a classical-mechanics research abstract: vocabulary & structure', ['25.3', '26.2']),
    cmL('28.2', 'How modern classical-mechanics research connects to robotics, astrodynamics & engineering', ['28.1']),
    cmL('28.3', 'Where this curriculum ends and graduate mechanics begins (map of the field)', ['27.3', '28.1']),
  ]),
]

// ─── Subject library (the full, browsable catalogue) ─────────────────────────

export const SUBJECT_LIBRARY: LibrarySubject[] = [
  // Languages
  { slug: 'english', name: 'English', category: 'languages', icon: '🇬🇧', description: 'Speak, read and write English with confidence.', modules: languageTree('English') },
  { slug: 'russian', name: 'Russian', category: 'languages', icon: '🇷🇺', description: 'Learn Russian from the alphabet to fluent conversation.', modules: languageTree('Russian') },
  { slug: 'hindi',  name: 'Hindi',  category: 'languages', icon: '🇮🇳', description: 'Learn Hindi step by step, from basics to fluency.',           modules: languageTree('Hindi'),  visible: false },
  { slug: 'german', name: 'German', category: 'languages', icon: '🇩🇪', description: 'Build German skills from scratch to confident conversation.', modules: languageTree('German'), visible: false },
  { slug: 'arabic', name: 'Arabic', category: 'languages', icon: '🇸🇦', description: 'Learn to read, write and speak Arabic.',                     modules: languageTree('Arabic'), visible: false },

  // Programming
  { slug: 'c', name: 'C', category: 'programming', icon: '🔩', description: 'C — the foundation of systems programming, from pointers to the kernel.', modules: programmingTree('C') },
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
  { slug: 'quantum_physics', name: 'Quantum Physics', category: 'physics', icon: '🌀', description: 'A complete journey from high-school algebra to quantum research foundations — wave mechanics, formal QM, quantum information, and modern quantum physics.', modules: QUANTUM_PHYSICS_TREE },
  { slug: 'classical_mechanics', name: 'Classical Mechanics', category: 'physics', icon: '🪐', description: 'A rigorous path from Newtonian motion to Lagrangian and Hamiltonian mechanics — forces, energy, oscillations, orbits, and rigid-body dynamics.', modules: CLASSICAL_MECHANICS_TREE },

  // Chemistry
  { slug: 'chemistry', name: 'Chemistry', category: 'chemistry', icon: '🧪', description: 'From atoms to organic chemistry — explained simply.', modules: CHEMISTRY_TREE },

  // Biology
  { slug: 'biology', name: 'Biology', category: 'biology', icon: '🧬', description: 'Explore life, from cells to ecosystems.', modules: BIOLOGY_TREE },

  // Artificial Intelligence
  { slug: 'ai', name: 'Artificial Intelligence', category: 'ai', icon: '🤖', description: 'From AI foundations to generative AI and professional MLOps systems.', modules: AI_TREE },

  // Computer Science
  { slug: 'computer_science', name: 'Computer Science', category: 'computer_science', icon: '🖥️', description: 'How computers actually work — architecture, data structures, algorithms, memory, and networks.', modules: COMPUTER_SCIENCE_TREE },

  // Data Science
  { slug: 'data_science', name: 'Data Science', category: 'computer_science', icon: '📊', description: 'Make sense of data — distributions, visualization, correlation, clustering, and machine learning pipelines.', modules: DATA_SCIENCE_TREE },

  // Career & professional skills (Sprint D — chained together by Career Roadmaps)
  { slug: 'databases', name: 'Databases & SQL', category: 'programming', icon: '🗄️', description: 'Query, design, and manage relational databases with SQL.', modules: DATABASES_TREE },
  { slug: 'version-control', name: 'Git & Version Control', category: 'programming', icon: '🌿', description: 'Track changes and collaborate on code like a professional.', modules: VERSION_CONTROL_TREE },
  { slug: 'containers-deployment', name: 'Containers & Deployment', category: 'programming', icon: '📦', description: 'Package, run, and ship applications with Docker and CI/CD.', modules: CONTAINERS_DEPLOYMENT_TREE },
  { slug: 'data-visualization', name: 'Data Visualization', category: 'programming', icon: '📊', description: 'Turn raw data into clear charts, dashboards, and stories.', modules: DATA_VISUALIZATION_TREE },
]

/** All subjects visible to new users in discovery UIs (library, onboarding, enroll).
 *  Subjects with visible: false are hidden from browsing but remain fully functional
 *  for already-enrolled users. Restore any subject by setting visible: true. */
export const VISIBLE_SUBJECT_LIBRARY: LibrarySubject[] = SUBJECT_LIBRARY.filter(
  (s) => s.visible !== false,
)

export function findLibrarySubject(slug: string): LibrarySubject | undefined {
  // findLibrarySubject intentionally searches ALL subjects (including hidden ones)
  // so that enrolled users on hidden subjects continue to work normally.
  return SUBJECT_LIBRARY.find((s) => s.slug === slug)
}

export function librarySubjectsByCategory(category: SubjectCategory): LibrarySubject[] {
  return VISIBLE_SUBJECT_LIBRARY.filter((s) => s.category === category)
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
