/**
 * Knowledge Graph bridge layer.
 *
 * The rich node data lives in src/lib/education/*.ts (legacy 54-node KGs) and
 * docs/{subject}/kg/graph.json (canonical KGs).  This file exposes the
 * KGNode / KnowledgeGraph shape the rest of the app expects and wires every
 * function to the right data source.
 *
 * ── Canonical KG adapters (SUBJECT_ADAPTERS) ─────────────────────────────────
 *   mathematics  →  docs/mathematics/kg/graph.json       (908 concepts)
 *   physics      →  docs/physics/kg/graph.json           (216 concepts)
 *   chemistry    →  docs/chemistry/kg/graph.json         (186 concepts)
 *   computer_science → docs/computer-science/kg/graph.json (119 concepts)
 *   biology      →  docs/biology/kg/graph.json            (89 concepts)
 *   english      →  docs/english/kg/graph.json           (216 concepts)
 *
 * Adding a new subject: drop a graph.json under docs/{subject}/kg/ and add
 * one entry to SUBJECT_ADAPTERS + one entry to ID_PREFIX_TO_SUBJECT below.
 * No new adapter code is required.
 *
 * ── Legacy 54-node KGs (fallback) ────────────────────────────────────────────
 *   social_science →  SOCIAL_SCIENCE_KNOWLEDGE_GRAPH
 *   (all others)   →  null  (falls through to subjectCatalog)
 */

import {
  MATH_KNOWLEDGE_GRAPH,
  SCIENCE_KNOWLEDGE_GRAPH,
  ENGLISH_KNOWLEDGE_GRAPH,
  SOCIAL_SCIENCE_KNOWLEDGE_GRAPH,
} from '@/lib/education'
import type { KnowledgeNode } from '@/lib/education'
import { createSubjectAdapter } from './subjectKgAdapter'

// ── Canonical KG adapter registry ─────────────────────────────────────────────
// Add one entry per subject that has a canonical graph.json.
// The adapter is lazy — it only reads the file on first getNodes() call.

const SUBJECT_ADAPTERS: Record<string, ReturnType<typeof createSubjectAdapter>> = {
  mathematics:      createSubjectAdapter('mathematics'),
  physics:          createSubjectAdapter('physics'),
  chemistry:        createSubjectAdapter('chemistry'),
  computer_science: createSubjectAdapter('computer-science'),
  biology:          createSubjectAdapter('biology'),
  english:          createSubjectAdapter('english'),
}

// Maps the first ID segment to the subject name so getKGNode() can route
// phys.em.faradays-law → physics adapter without scanning all adapters.
const ID_PREFIX_TO_SUBJECT: Record<string, string> = {
  math: 'mathematics',
  phys: 'physics',
  chem: 'chemistry',
  cs:   'computer_science',
  bio:  'biology',
  eng:  'english',
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface KGNode {
  id: string
  slug: string
  title: string
  description: string
  prerequisites: string[]
  estimatedHours?: number
  /**
   * The concept's own authored difficulty tag (foundational/developing/
   * proficient/advanced/expert/research) — already present on every
   * KnowledgeNode and already consumed by difficultyHours() below; simply
   * forwarded here so placement.ts can pick a level-appropriate entry node.
   * This is a per-CONCEPT tag, not a property of the learner — see
   * src/lib/curriculum/levels.ts for the learner-level axis.
   */
  difficulty?: string
}

export interface KGModule {
  title: string
  nodes: KGNode[]
}

export interface KnowledgeGraph {
  subject: string
  modules: KGModule[]
}

// ── Internal helpers ──────────────────────────────────────────────────────────

/** Convert a KnowledgeNode (education layer) → KGNode (app layer). */
function toKGNode(n: KnowledgeNode): KGNode {
  return {
    id: n.id,
    slug: n.id,          // slug === id throughout the codebase
    title: n.title,
    description: n.description,
    prerequisites: n.prerequisites,
    estimatedHours: n.estimated_hours ?? difficultyHours(n.difficulty),
    difficulty: n.difficulty,
  }
}

function difficultyHours(d: string): number {
  switch (d) {
    case 'foundational': return 2
    case 'developing':   return 3
    case 'proficient':   return 4
    case 'advanced':     return 6
    case 'expert':       return 8
    case 'research':     return 12
    default:             return 3
  }
}

/**
 * Group a flat KnowledgeNode[] into KGModule[] by domain.
 *
 * Uses the full compound domain string (e.g. "phys.mech", "math.found") as the
 * map key so that sub-domain names shared across subjects (e.g. "meas" appears
 * in both math and physics) resolve to the correct label.  Math short-keys
 * resolve via the last-segment fallback in domainLabel().
 */
function groupIntoModules(nodes: KnowledgeNode[]): KGModule[] {
  const map = new Map<string, KGNode[]>()

  for (const n of nodes) {
    const parts = n.domain.split('.')
    const uniqueTop = new Set(nodes.map((x) => x.domain.split('.')[0]))
    // Use full domain string when all nodes share the same top-level prefix so
    // domainLabel can look up a qualified key like "phys.meas" or "chem.atomic".
    const key = uniqueTop.size === 1 && parts.length > 1 ? n.domain : parts[0]
    const label = domainLabel(key)
    if (!map.has(label)) map.set(label, [])
    map.get(label)!.push(toKGNode(n))
  }

  return Array.from(map.entries()).map(([title, nodes]) => ({ title, nodes }))
}

/** Human-readable label for a domain key or full compound domain string. */
function domainLabel(domain: string): string {
  const labels: Record<string, string> = {
    // ── 908-node math KG: short segment keys ("math.<key>.*" → key) ──────────
    found:  'Mathematical Foundations',
    arith:  'Arithmetic',
    nt:     'Number Theory',
    alg:    'Algebra',
    geom:   'Geometry',
    trig:   'Trigonometry',
    func:   'Functions',
    seq:    'Sequences & Series',
    calc:   'Calculus',
    de:     'Differential Equations',
    linalg: 'Linear Algebra',
    prob:   'Probability',
    stats:  'Statistics',
    disc:   'Discrete Mathematics',
    abst:   'Abstract Algebra',
    real:   'Real Analysis',
    cx:     'Complex Analysis',
    top:    'Topology',
    meas:   'Measure Theory',
    fnal:   'Functional Analysis',
    num:    'Numerical Analysis',
    opt:    'Optimization',
    graph:  'Graph Theory',
    cat:    'Category Theory',
    // ── 194-node physics KG: qualified keys to avoid collision with math ──────
    'phys.meas':  'Measurement & Units',
    'phys.mech':  'Classical Mechanics',
    'phys.therm': 'Thermodynamics',
    'phys.wave':  'Waves & Oscillations',
    'phys.opt':   'Optics',
    'phys.em':    'Electromagnetism',
    'phys.mod':   'Modern Physics',
    'phys.qm':    'Quantum Mechanics',
    'phys.rel':   'Special Relativity',
    'phys.stat':  'Statistical Mechanics',
    'phys.astro':     'Astrophysics',
    'phys.particle':  'Particle Physics',
    // ── Chemistry KG: qualified keys ─────────────────────────────────────────
    'chem.found':   'Chemical Foundations',
    'chem.atomic':  'Atomic Structure',
    'chem.period':  'Periodic Table',
    'chem.bond':    'Chemical Bonding',
    'chem.state':   'States of Matter',
    'chem.sol':     'Solutions',
    'chem.thermo':  'Thermochemistry',
    'chem.equil':   'Chemical Equilibrium',
    'chem.redox':   'Redox Reactions',
    'chem.elect':   'Electrochemistry',
    'chem.kinet':   'Chemical Kinetics',
    'chem.solid':   'Solid State',
    'chem.surface': 'Surface Chemistry',
    'chem.coord':   'Coordination Chemistry',
    'chem.sblock':  's-Block Elements',
    'chem.pblock':  'p-Block Elements',
    'chem.dblock':  'd & f-Block Elements',
    'chem.org':     'Organic Fundamentals',
    'chem.hyd':     'Hydrocarbons',
    'chem.hal':     'Haloalkanes & Haloarenes',
    'chem.alc':     'Alcohols, Phenols & Ethers',
    'chem.carb':    'Carbonyl Compounds',
    'chem.nitro':   'Nitrogen Compounds',
    'chem.bio':     'Biomolecules',
    'chem.poly':    'Polymers',
    'chem.env':     'Environmental Chemistry',
    'chem.anal':    'Analytical Chemistry',
    // ── Computer Science KG: qualified keys ──────────────────────────────────
    'cs.found':   'Computing Foundations',
    'cs.algo':    'Algorithms & Complexity',
    'cs.prog':    'Programming Fundamentals',
    'cs.control': 'Control Structures',
    'cs.data':    'Core Data Types',
    'cs.func':    'Functions & Modularity',
    'cs.file':    'File Handling',
    'cs.struct':  'Data Structures',
    'cs.oop':     'Object-Oriented Programming',
    'cs.db':      'Databases',
    'cs.os':      'Operating Systems',
    'cs.net':     'Networking',
    'cs.sec':     'Security',
    'cs.web':     'Web & Cloud Development',
    'cs.theory':  'Theory of Computation',
    'cs.se':      'Software Engineering',
    'cs.ds':      'Data Science & AI',
    // ── Biology KG: qualified keys ────────────────────────────────────────────
    'bio.found':   'Foundations of Biology',
    'bio.cell':    'Cell Biology',
    'bio.mol':     'Biomolecules & Molecular Biology',
    'bio.gen':     'Genetics',
    'bio.evo':     'Evolution',
    'bio.physio':  'Human Physiology',
    'bio.plant':   'Plant Physiology',
    'bio.repro':   'Reproduction',
    'bio.dev':     'Developmental Biology',
    'bio.eco':     'Ecology',
    'bio.micro':   'Microbiology',
    'bio.immuno':  'Immunology',
    'bio.biotech': 'Biotechnology',
    'bio.bioinfo': 'Bioinformatics',
    'bio.sys':     'Systems Biology',
    'bio.div':     'Biodiversity',
    // ── 54-node KG domain keys (legacy / other subjects) ─────────────────────
    arithmetic:          'Arithmetic',
    number_systems:      'Number Systems',
    integers:            'Integers',
    fractions:           'Fractions',
    decimals:            'Decimals',
    ratios_proportions:  'Ratios & Proportions',
    percentages:         'Percentages',
    exponents_powers:    'Exponents & Powers',
    algebra:             'Algebra',
    geometry:            'Geometry',
    mensuration:         'Mensuration',
    coordinate_geometry: 'Coordinate Geometry',
    trigonometry:        'Trigonometry',
    statistics:          'Statistics',
    probability:         'Probability',
    functions:           'Functions',
    calculus:            'Calculus',
    vectors:             'Vectors',
    matrices:            'Matrices',
    combinatorics:       'Combinatorics',
    physics:             'Physics',
    chemistry:           'Chemistry',
    biology:             'Biology',
    earth_science:       'Earth Science',
    environmental_science: 'Environmental Science',
    grammar:             'Grammar',
    vocabulary:          'Vocabulary',
    reading:             'Reading',
    writing:             'Writing',
    communication:       'Communication',
    literature:          'Literature',
    history:             'History',
    geography:           'Geography',
    civics:              'Civics & Political Science',
    economics:           'Economics',
    society:             'Society & Culture',
  }
  // Try exact key first (covers both qualified "phys.meas" and 54-node "arithmetic")
  if (labels[domain]) return labels[domain]
  // Fall back to the last segment so math short-keys ("math.found" → "found") resolve
  const seg = domain.split('.').pop() ?? domain
  return labels[seg] ?? seg.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Russian and Hindi translations for every KG domain label. */
const DOMAIN_LABEL_I18N: Record<string, { ru: string; hi: string }> = {
  // ── Mathematics ───────────────────────────────────────────────────────────
  'Mathematical Foundations':  { ru: 'Основы математики',                  hi: 'गणित की नींव' },
  'Arithmetic':                { ru: 'Арифметика',                         hi: 'अंकगणित' },
  'Number Theory':             { ru: 'Теория чисел',                       hi: 'संख्या सिद्धांत' },
  'Algebra':                   { ru: 'Алгебра',                            hi: 'बीजगणित' },
  'Geometry':                  { ru: 'Геометрия',                          hi: 'ज्यामिति' },
  'Trigonometry':              { ru: 'Тригонометрия',                      hi: 'त्रिकोणमिति' },
  'Functions':                 { ru: 'Функции',                            hi: 'फलन' },
  'Sequences & Series':        { ru: 'Последовательности и ряды',          hi: 'अनुक्रम और श्रेणी' },
  'Calculus':                  { ru: 'Математический анализ',              hi: 'कलन' },
  'Differential Equations':    { ru: 'Дифференциальные уравнения',         hi: 'अवकल समीकरण' },
  'Linear Algebra':            { ru: 'Линейная алгебра',                   hi: 'रैखिक बीजगणित' },
  'Probability':               { ru: 'Вероятность',                        hi: 'प्रायिकता' },
  'Statistics':                { ru: 'Статистика',                         hi: 'सांख्यिकी' },
  'Discrete Mathematics':      { ru: 'Дискретная математика',              hi: 'विविक्त गणित' },
  'Abstract Algebra':          { ru: 'Абстрактная алгебра',                hi: 'अमूर्त बीजगणित' },
  'Real Analysis':             { ru: 'Вещественный анализ',                hi: 'वास्तविक विश्लेषण' },
  'Complex Analysis':          { ru: 'Комплексный анализ',                 hi: 'समिश्र विश्लेषण' },
  'Topology':                  { ru: 'Топология',                          hi: 'टोपोलॉजी' },
  'Measure Theory':            { ru: 'Теория меры',                        hi: 'माप सिद्धांत' },
  'Functional Analysis':       { ru: 'Функциональный анализ',              hi: 'फलनात्मक विश्लेषण' },
  'Numerical Analysis':        { ru: 'Численные методы',                   hi: 'संख्यात्मक विश्लेषण' },
  'Optimization':              { ru: 'Оптимизация',                        hi: 'अनुकूलन' },
  'Graph Theory':              { ru: 'Теория графов',                      hi: 'ग्राफ सिद्धांत' },
  'Category Theory':           { ru: 'Теория категорий',                   hi: 'श्रेणी सिद्धांत' },
  // ── Physics ───────────────────────────────────────────────────────────────
  'Measurement & Units':       { ru: 'Измерения и единицы',                hi: 'मापन और इकाइयाँ' },
  'Classical Mechanics':       { ru: 'Классическая механика',              hi: 'शास्त्रीय यांत्रिकी' },
  'Thermodynamics':            { ru: 'Термодинамика',                      hi: 'ऊष्मागतिकी' },
  'Waves & Oscillations':      { ru: 'Волны и колебания',                  hi: 'तरंगें और दोलन' },
  'Optics':                    { ru: 'Оптика',                             hi: 'प्रकाशिकी' },
  'Electromagnetism':          { ru: 'Электромагнетизм',                   hi: 'विद्युतचुंबकत्व' },
  'Modern Physics':            { ru: 'Современная физика',                 hi: 'आधुनिक भौतिकी' },
  'Quantum Mechanics':         { ru: 'Квантовая механика',                 hi: 'क्वांटम यांत्रिकी' },
  'Special Relativity':        { ru: 'Специальная теория относительности', hi: 'विशेष सापेक्षता' },
  'Statistical Mechanics':     { ru: 'Статистическая механика',            hi: 'सांख्यिकीय यांत्रिकी' },
  'Astrophysics':              { ru: 'Астрофизика',                        hi: 'खगोल भौतिकी' },
  'Particle Physics':          { ru: 'Физика частиц',                      hi: 'कण भौतिकी' },
  // ── Chemistry ─────────────────────────────────────────────────────────────
  'Chemical Foundations':      { ru: 'Основы химии',                       hi: 'रसायन की नींव' },
  'Atomic Structure':          { ru: 'Строение атома',                     hi: 'परमाणु संरचना' },
  'Periodic Table':            { ru: 'Периодическая таблица',              hi: 'आवर्त सारणी' },
  'Chemical Bonding':          { ru: 'Химическая связь',                   hi: 'रासायनिक बंधन' },
  'States of Matter':          { ru: 'Агрегатные состояния вещества',      hi: 'पदार्थ की अवस्थाएँ' },
  'Solutions':                 { ru: 'Растворы',                           hi: 'विलयन' },
  'Thermochemistry':           { ru: 'Термохимия',                         hi: 'ऊष्मारसायन' },
  'Chemical Equilibrium':      { ru: 'Химическое равновесие',              hi: 'रासायनिक साम्यावस्था' },
  'Redox Reactions':           { ru: 'Окислительно-восстановительные реакции', hi: 'रेडॉक्स अभिक्रियाएँ' },
  'Electrochemistry':          { ru: 'Электрохимия',                       hi: 'विद्युत रसायन' },
  'Chemical Kinetics':         { ru: 'Кинетика химических реакций',        hi: 'रासायनिक गतिकी' },
  'Solid State':               { ru: 'Твёрдое тело',                       hi: 'ठोस अवस्था' },
  'Surface Chemistry':         { ru: 'Поверхностная химия',                hi: 'पृष्ठ रसायन' },
  'Coordination Chemistry':    { ru: 'Координационная химия',              hi: 'समन्वय रसायन' },
  's-Block Elements':          { ru: 'Элементы s-блока',                   hi: 's-खंड तत्व' },
  'p-Block Elements':          { ru: 'Элементы p-блока',                   hi: 'p-खंड तत्व' },
  'd & f-Block Elements':      { ru: 'Элементы d и f-блоков',              hi: 'd और f-खंड तत्व' },
  'Organic Fundamentals':      { ru: 'Основы органической химии',          hi: 'कार्बनिक रसायन की नींव' },
  'Hydrocarbons':              { ru: 'Углеводороды',                       hi: 'हाइड्रोकार्बन' },
  'Haloalkanes & Haloarenes':  { ru: 'Галогеналканы и галогенарены',       hi: 'हैलोऐल्केन और हैलोऐरीन' },
  'Alcohols, Phenols & Ethers':{ ru: 'Спирты, фенолы и эфиры',            hi: 'अल्कोहल, फिनोल और ईथर' },
  'Carbonyl Compounds':        { ru: 'Карбонильные соединения',            hi: 'कार्बोनिल यौगिक' },
  'Nitrogen Compounds':        { ru: 'Азотистые соединения',               hi: 'नाइट्रोजन यौगिक' },
  'Biomolecules':              { ru: 'Биомолекулы',                        hi: 'जैव अणु' },
  'Polymers':                  { ru: 'Полимеры',                           hi: 'बहुलक' },
  'Environmental Chemistry':   { ru: 'Экологическая химия',                hi: 'पर्यावरण रसायन' },
  'Analytical Chemistry':      { ru: 'Аналитическая химия',                hi: 'विश्लेषणात्मक रसायन' },
  // ── Computer Science ──────────────────────────────────────────────────────
  'Computing Foundations':           { ru: 'Основы вычислительной техники',        hi: 'कंप्यूटिंग की नींव' },
  'Algorithms & Complexity':         { ru: 'Алгоритмы и сложность',               hi: 'एल्गोरिदम और जटिलता' },
  'Programming Fundamentals':        { ru: 'Основы программирования',             hi: 'प्रोग्रामिंग की नींव' },
  'Control Structures':              { ru: 'Управляющие конструкции',             hi: 'नियंत्रण संरचनाएँ' },
  'Core Data Types':                 { ru: 'Базовые типы данных',                 hi: 'मूल डेटा प्रकार' },
  'Functions & Modularity':          { ru: 'Функции и модульность',               hi: 'फलन और मॉड्युलरिटी' },
  'File Handling':                   { ru: 'Работа с файлами',                    hi: 'फ़ाइल हैंडलिंग' },
  'Data Structures':                 { ru: 'Структуры данных',                    hi: 'डेटा संरचनाएँ' },
  'Object-Oriented Programming':     { ru: 'Объектно-ориентированное программирование', hi: 'वस्तु-उन्मुख प्रोग्रामिंग' },
  'Databases':                       { ru: 'Базы данных',                         hi: 'डेटाबेस' },
  'Operating Systems':               { ru: 'Операционные системы',                hi: 'ऑपरेटिंग सिस्टम' },
  'Networking':                      { ru: 'Сети',                                hi: 'नेटवर्किंग' },
  'Security':                        { ru: 'Безопасность',                        hi: 'सुरक्षा' },
  'Web & Cloud Development':         { ru: 'Веб и облачная разработка',           hi: 'वेब और क्लाउड विकास' },
  'Theory of Computation':           { ru: 'Теория вычислений',                   hi: 'संगणना सिद्धांत' },
  'Software Engineering':            { ru: 'Программная инженерия',               hi: 'सॉफ्टवेयर इंजीनियरिंग' },
  'Data Science & AI':               { ru: 'Наука о данных и ИИ',                 hi: 'डेटा विज्ञान और एआई' },
  // ── Biology ───────────────────────────────────────────────────────────────
  'Foundations of Biology':          { ru: 'Основы биологии',                     hi: 'जीव विज्ञान की नींव' },
  'Cell Biology':                    { ru: 'Клеточная биология',                  hi: 'कोशिका जीव विज्ञान' },
  'Biomolecules & Molecular Biology':{ ru: 'Биомолекулы и молекулярная биология', hi: 'जैव अणु और आण्विक जीव विज्ञान' },
  'Genetics':                        { ru: 'Генетика',                            hi: 'आनुवंशिकी' },
  'Evolution':                       { ru: 'Эволюция',                            hi: 'विकास' },
  'Human Physiology':                { ru: 'Физиология человека',                 hi: 'मानव शरीर क्रिया विज्ञान' },
  'Plant Physiology':                { ru: 'Физиология растений',                 hi: 'पादप शरीर क्रिया विज्ञान' },
  'Reproduction':                    { ru: 'Размножение',                         hi: 'प्रजनन' },
  'Developmental Biology':           { ru: 'Биология развития',                   hi: 'विकासात्मक जीव विज्ञान' },
  'Ecology':                         { ru: 'Экология',                            hi: 'पारिस्थितिकी' },
  'Microbiology':                    { ru: 'Микробиология',                       hi: 'सूक्ष्म जीव विज्ञान' },
  'Immunology':                      { ru: 'Иммунология',                         hi: 'प्रतिरक्षा विज्ञान' },
  'Biotechnology':                   { ru: 'Биотехнология',                       hi: 'जैव प्रौद्योगिकी' },
  'Bioinformatics':                  { ru: 'Биоинформатика',                      hi: 'जैव सूचना विज्ञान' },
  'Systems Biology':                 { ru: 'Системная биология',                  hi: 'तंत्र जीव विज्ञान' },
  'Biodiversity':                    { ru: 'Биоразнообразие',                     hi: 'जैव विविधता' },
  // ── Legacy / other subjects ───────────────────────────────────────────────
  'Number Systems':            { ru: 'Системы счисления',              hi: 'संख्या प्रणाली' },
  'Integers':                  { ru: 'Целые числа',                    hi: 'पूर्णांक' },
  'Fractions':                 { ru: 'Дроби',                          hi: 'भिन्न' },
  'Decimals':                  { ru: 'Десятичные дроби',               hi: 'दशमलव' },
  'Ratios & Proportions':      { ru: 'Пропорции',                      hi: 'अनुपात और समानुपात' },
  'Percentages':               { ru: 'Проценты',                       hi: 'प्रतिशत' },
  'Exponents & Powers':        { ru: 'Степени и показатели',           hi: 'घातांक और घात' },
  'Mensuration':               { ru: 'Вычисление площадей и объёмов',  hi: 'क्षेत्रमिति' },
  'Coordinate Geometry':       { ru: 'Аналитическая геометрия',        hi: 'निर्देशांक ज्यामिति' },
  'Vectors':                   { ru: 'Векторы',                        hi: 'सदिश' },
  'Matrices':                  { ru: 'Матрицы',                        hi: 'आव्यूह' },
  'Combinatorics':             { ru: 'Комбинаторика',                  hi: 'क्रमचय-संचय' },
  'Physics':                   { ru: 'Физика',                         hi: 'भौतिकी' },
  'Chemistry':                 { ru: 'Химия',                          hi: 'रसायन विज्ञान' },
  'Biology':                   { ru: 'Биология',                       hi: 'जीव विज्ञान' },
  'Earth Science':             { ru: 'Науки о Земле',                  hi: 'पृथ्वी विज्ञान' },
  'Environmental Science':     { ru: 'Наука об окружающей среде',      hi: 'पर्यावरण विज्ञान' },
  'Grammar':                   { ru: 'Грамматика',                     hi: 'व्याकरण' },
  'Vocabulary':                { ru: 'Словарный запас',                 hi: 'शब्द भंडार' },
  'Reading':                   { ru: 'Чтение',                         hi: 'पठन' },
  'Writing':                   { ru: 'Письмо',                         hi: 'लेखन' },
  'Communication':             { ru: 'Общение',                        hi: 'संचार' },
  'Literature':                { ru: 'Литература',                     hi: 'साहित्य' },
  'History':                   { ru: 'История',                        hi: 'इतिहास' },
  'Geography':                 { ru: 'География',                      hi: 'भूगोल' },
  'Civics & Political Science':{ ru: 'Гражданское право и политология',hi: 'नागरिकशास्त्र और राजनीति विज्ञान' },
  'Economics':                 { ru: 'Экономика',                      hi: 'अर्थशास्त्र' },
  'Society & Culture':         { ru: 'Общество и культура',            hi: 'समाज और संस्कृति' },
}

/** Return the localized version of a KG domain label (e.g. "Classical Mechanics" → "Классическая механика"). */
export function localizeKGModuleTitle(englishTitle: string, lang: string): string {
  if (lang === 'en') return englishTitle
  const row = DOMAIN_LABEL_I18N[englishTitle]
  if (!row) return englishTitle
  return (row as Record<string, string>)[lang] ?? englishTitle
}

// ── Subject → raw node array ──────────────────────────────────────────────────

function resolveNodes(subjectSlug: string): KnowledgeNode[] | null {
  // Canonical KG adapters — primary path for all new subjects
  const adapter = SUBJECT_ADAPTERS[subjectSlug]
  if (adapter) return adapter.getNodes()

  // Legacy 54-node KGs — fallback for subjects not yet on canonical KGs
  switch (subjectSlug) {
    case 'social_science':
    case 'socials':
      return SOCIAL_SCIENCE_KNOWLEDGE_GRAPH as KnowledgeNode[]

    default:
      return null
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Look up a single KG node by its id/slug across all graphs. */
export function getKGNode(id: string): KGNode | undefined {
  // Route by ID prefix to the canonical KG adapter (math.*, phys.*, chem.*, …)
  const prefix = id.split('.')[0]
  const subject = ID_PREFIX_TO_SUBJECT[prefix]
  if (subject) {
    const adapter = SUBJECT_ADAPTERS[subject]
    if (adapter) {
      const node = adapter.getNodes().find((n) => n.id === id)
      if (node) return toKGNode(node)
    }
  }

  // Legacy 54-node KG fallback (arithmetic.*, geometry.*, physics.*, etc.)
  const allSources = [
    MATH_KNOWLEDGE_GRAPH,
    SCIENCE_KNOWLEDGE_GRAPH,
    ENGLISH_KNOWLEDGE_GRAPH,
    SOCIAL_SCIENCE_KNOWLEDGE_GRAPH,
  ] as KnowledgeNode[][]

  for (const src of allSources) {
    const found = src.find((n) => n.id === id)
    if (found) return toKGNode(found)
  }
  return undefined
}

/** Find KG nodes whose id matches a topicSlug (used by TopicProgress). */
export function getNodesForTopic(topicSlug: string): KGNode[] {
  const node = getKGNode(topicSlug)
  return node ? [node] : []
}

/**
 * Build the full KnowledgeGraph for a subject slug.
 * Returns null for subjects without KG coverage (falls through to subjectCatalog).
 */
export function getKnowledgeGraph(subjectSlug?: string): KnowledgeGraph | null {
  if (!subjectSlug) return null
  const nodes = resolveNodes(subjectSlug)
  if (!nodes || nodes.length === 0) return null

  return {
    subject: subjectSlug,
    modules: groupIntoModules(nodes),
  }
}

/**
 * Return nodes whose prerequisites are all satisfied by completedSlugs.
 * Nodes already completed are excluded.
 */
export function getAvailableNodes(
  graph: KnowledgeGraph,
  completedSlugs?: Set<string>,
): KGNode[] {
  const done = completedSlugs ?? new Set<string>()
  const all = getAllNodes(graph)
  return all.filter(
    (n) => !done.has(n.slug) && n.prerequisites.every((p) => done.has(p)),
  )
}

/**
 * Build a concise text summary of the learner's KG position for injection
 * into the AI tutor system prompt.
 */
export function buildKnowledgeGraphContext(
  graphOrSubject: KnowledgeGraph | string,
  completedSlugsInput?: Set<string> | string[],
  inProgressSlug?: string,
): string {
  const graph =
    typeof graphOrSubject === 'string'
      ? getKnowledgeGraph(graphOrSubject)
      : graphOrSubject

  if (!graph) return ''

  const completedSet: Set<string> =
    completedSlugsInput instanceof Set
      ? completedSlugsInput
      : new Set(completedSlugsInput ?? [])

  const allNodes = getAllNodes(graph)
  const totalNodes = allNodes.length
  const completedNodes = allNodes.filter((n) => completedSet.has(n.slug))
  const availableNodes = getAvailableNodes(graph, completedSet)
  const currentNode = inProgressSlug
    ? allNodes.find((n) => n.slug === inProgressSlug)
    : null

  const lines: string[] = []
  lines.push(`KNOWLEDGE GRAPH — ${graph.subject.toUpperCase()}`)
  lines.push(`Progress: ${completedNodes.length}/${totalNodes} topics completed`)

  if (currentNode) {
    lines.push(`Current topic: "${currentNode.title}" (${currentNode.description})`)
    if (currentNode.prerequisites.length > 0) {
      const prereqTitles = currentNode.prerequisites
        .map((p) => allNodes.find((n) => n.slug === p)?.title ?? p)
        .join(', ')
      lines.push(`Prerequisites for this topic: ${prereqTitles}`)
    }
  }

  if (availableNodes.length > 0) {
    const nextThree = availableNodes.slice(0, 3).map((n) => `"${n.title}"`).join(', ')
    lines.push(`Next available topics (prerequisites met): ${nextThree}`)
  }

  if (completedNodes.length > 0 && completedNodes.length <= 8) {
    lines.push(
      `Completed: ${completedNodes.map((n) => n.title).join(', ')}`,
    )
  } else if (completedNodes.length > 8) {
    lines.push(`Completed: ${completedNodes.length} topics`)
  }

  return lines.join('\n')
}

/** Return the nodes that are directly unlocked once nodeSlug is completed. */
export function getDirectUnlocks(graph: KnowledgeGraph, nodeSlug: string): KGNode[] {
  const all = getAllNodes(graph)
  return all.filter((n) => n.prerequisites.includes(nodeSlug))
}

/** Flatten all nodes from all modules of the graph. */
export function getAllNodes(graph: KnowledgeGraph): KGNode[] {
  return graph.modules.flatMap((m) => m.nodes)
}
