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
 *   physics      →  docs/physics/kg/graph.json           (194 concepts)
 *   chemistry    →  docs/chemistry/kg/graph.json         (187 concepts)
 *   computer_science → docs/computer-science/kg/graph.json (119 concepts)
 *
 * Adding a new subject: drop a graph.json under docs/{subject}/kg/ and add
 * one entry to SUBJECT_ADAPTERS + one entry to ID_PREFIX_TO_SUBJECT below.
 * No new adapter code is required.
 *
 * ── Legacy 54-node KGs (fallback) ────────────────────────────────────────────
 *   biology        →  SCIENCE_KNOWLEDGE_GRAPH filtered to biology.*
 *   english        →  ENGLISH_KNOWLEDGE_GRAPH
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
}

// Maps the first ID segment to the subject name so getKGNode() can route
// phys.em.faradays-law → physics adapter without scanning all adapters.
const ID_PREFIX_TO_SUBJECT: Record<string, string> = {
  math: 'mathematics',
  phys: 'physics',
  chem: 'chemistry',
  cs:   'computer_science',
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface KGNode {
  id: string
  slug: string
  title: string
  description: string
  prerequisites: string[]
  estimatedHours?: number
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
    'phys.astro': 'Astrophysics',
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

// ── Subject → raw node array ──────────────────────────────────────────────────

function resolveNodes(subjectSlug: string): KnowledgeNode[] | null {
  // Canonical KG adapters — primary path for all new subjects
  const adapter = SUBJECT_ADAPTERS[subjectSlug]
  if (adapter) return adapter.getNodes()

  // Legacy 54-node KGs — fallback for subjects not yet on canonical KGs
  switch (subjectSlug) {
    case 'biology':
      return (SCIENCE_KNOWLEDGE_GRAPH as KnowledgeNode[]).filter((n) =>
        n.domain.startsWith('biology')
      )
    case 'english':
      return ENGLISH_KNOWLEDGE_GRAPH as KnowledgeNode[]

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
