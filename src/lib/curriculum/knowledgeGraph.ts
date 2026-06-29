/**
 * Knowledge Graph bridge layer.
 *
 * The rich node data lives in src/lib/education/*.ts.  This file exposes the
 * KGNode / KnowledgeGraph shape that the rest of the app (learn/chat, curriculum
 * route, learner intelligence) expects, and wires every function to the real data.
 *
 * Subject slug → KG mapping:
 *   mathematics            → MATH_KNOWLEDGE_GRAPH   (54 nodes)
 *   physics                → SCIENCE_KNOWLEDGE_GRAPH filtered to physics.* (24 nodes)
 *   chemistry              → SCIENCE_KNOWLEDGE_GRAPH filtered to chemistry.* (17 nodes)
 *   biology                → SCIENCE_KNOWLEDGE_GRAPH filtered to biology.* (20 nodes)
 *   english                → ENGLISH_KNOWLEDGE_GRAPH (38 nodes)
 *   social_science / socials → SOCIAL_SCIENCE_KNOWLEDGE_GRAPH (46 nodes)
 *   (all others)           → null  (falls through to subjectCatalog)
 */

import {
  MATH_KNOWLEDGE_GRAPH,
  SCIENCE_KNOWLEDGE_GRAPH,
  ENGLISH_KNOWLEDGE_GRAPH,
  SOCIAL_SCIENCE_KNOWLEDGE_GRAPH,
} from '@/lib/education'
import type { KnowledgeNode } from '@/lib/education'
import { getMathKgNodes } from './mathKgAdapter'

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
 * Group a flat KnowledgeNode[] into KGModule[] by domain key.
 *
 * For science subjects the domain is compound ('physics.kinematics') — we use
 * the SECOND segment so each sub-discipline becomes its own module.
 * For everything else we use the first (and only) segment.
 */
function groupIntoModules(nodes: KnowledgeNode[]): KGModule[] {
  const map = new Map<string, KGNode[]>()

  for (const n of nodes) {
    const parts = n.domain.split('.')
    // If the top-level domain matches the subject (e.g. all nodes have 'physics.*')
    // use the second segment so we get meaningful module titles like "Kinematics".
    // Otherwise use the first segment (math, english, etc. are already meaningful).
    const uniqueTop = new Set(nodes.map((x) => x.domain.split('.')[0]))
    const key = uniqueTop.size === 1 && parts.length > 1 ? parts[1] : parts[0]
    const label = domainLabel(key)
    if (!map.has(label)) map.set(label, [])
    map.get(label)!.push(toKGNode(n))
  }

  return Array.from(map.entries()).map(([title, nodes]) => ({ title, nodes }))
}

/** Human-readable label for a domain key. */
function domainLabel(domain: string): string {
  const labels: Record<string, string> = {
    // ── 908-node math KG sub-domain keys (second segment of "math.<key>.*") ──
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
  return labels[domain] ?? domain.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Subject → raw node array ──────────────────────────────────────────────────

function resolveNodes(subjectSlug: string): KnowledgeNode[] | null {
  switch (subjectSlug) {
    case 'mathematics':
      return getMathKgNodes()

    case 'physics':
      return (SCIENCE_KNOWLEDGE_GRAPH as KnowledgeNode[]).filter((n) =>
        n.domain.startsWith('physics')
      )

    case 'chemistry':
      return (SCIENCE_KNOWLEDGE_GRAPH as KnowledgeNode[]).filter((n) =>
        n.domain.startsWith('chemistry')
      )

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
  // 908-node math KG is primary for math.* IDs
  if (id.startsWith('math.')) {
    const mathNode = getMathKgNodes().find((n) => n.id === id)
    if (mathNode) return toKGNode(mathNode)
  }

  // Other subjects + legacy 54-node math IDs (arithmetic.*, geometry.*, etc.)
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
