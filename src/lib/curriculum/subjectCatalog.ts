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

export const CATEGORY_LABELS: Record<SubjectCategory, string> = {
  languages: 'Languages',
  programming: 'Programming',
  mathematics: 'Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  ai: 'Artificial Intelligence',
}

const CATEGORY_I18N: Record<SubjectCategory, Record<Lang3, string>> = {
  languages:   { en: 'Languages',               ru: 'Языки',                  hi: 'भाषाएं' },
  programming: { en: 'Programming',             ru: 'Программирование',       hi: 'प्रोग्रामिंग' },
  mathematics: { en: 'Mathematics',             ru: 'Математика',             hi: 'गणित' },
  physics:     { en: 'Physics',                 ru: 'Физика',                 hi: 'भौतिकी' },
  chemistry:   { en: 'Chemistry',               ru: 'Химия',                  hi: 'रसायन विज्ञान' },
  biology:     { en: 'Biology',                 ru: 'Биология',               hi: 'जीव विज्ञान' },
  ai:          { en: 'Artificial Intelligence', ru: 'Искусственный интеллект', hi: 'कृत्रिम बुद्धिमत्ता' },
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

// ─── Subject library (the full, browsable catalogue) ─────────────────────────

export const SUBJECT_LIBRARY: LibrarySubject[] = [
  // Languages
  { slug: 'english', name: 'English', category: 'languages', icon: '🇬🇧', description: 'Speak, read and write English with confidence.', modules: languageTree('English') },
  { slug: 'russian', name: 'Russian', category: 'languages', icon: '🇷🇺', description: 'Learn Russian from the alphabet to fluent conversation.', modules: languageTree('Russian') },
  { slug: 'hindi', name: 'Hindi', category: 'languages', icon: '🇮🇳', description: 'Learn Hindi step by step, from basics to fluency.', modules: languageTree('Hindi') },
  { slug: 'german', name: 'German', category: 'languages', icon: '🇩🇪', description: 'Build German skills from scratch to confident conversation.', modules: languageTree('German') },
  { slug: 'arabic', name: 'Arabic', category: 'languages', icon: '🇸🇦', description: 'Learn to read, write and speak Arabic.', modules: languageTree('Arabic') },

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

  // Chemistry
  { slug: 'chemistry', name: 'Chemistry', category: 'chemistry', icon: '🧪', description: 'From atoms to organic chemistry — explained simply.', modules: CHEMISTRY_TREE },

  // Biology
  { slug: 'biology', name: 'Biology', category: 'biology', icon: '🧬', description: 'Explore life, from cells to ecosystems.', modules: BIOLOGY_TREE },

  // Artificial Intelligence
  { slug: 'ai', name: 'Artificial Intelligence', category: 'ai', icon: '🤖', description: 'From AI foundations to generative AI and professional MLOps systems.', modules: AI_TREE },

  // Career & professional skills (Sprint D — chained together by Career Roadmaps)
  { slug: 'databases', name: 'Databases & SQL', category: 'programming', icon: '🗄️', description: 'Query, design, and manage relational databases with SQL.', modules: DATABASES_TREE },
  { slug: 'version-control', name: 'Git & Version Control', category: 'programming', icon: '🌿', description: 'Track changes and collaborate on code like a professional.', modules: VERSION_CONTROL_TREE },
  { slug: 'containers-deployment', name: 'Containers & Deployment', category: 'programming', icon: '📦', description: 'Package, run, and ship applications with Docker and CI/CD.', modules: CONTAINERS_DEPLOYMENT_TREE },
  { slug: 'data-visualization', name: 'Data Visualization', category: 'programming', icon: '📊', description: 'Turn raw data into clear charts, dashboards, and stories.', modules: DATA_VISUALIZATION_TREE },
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
