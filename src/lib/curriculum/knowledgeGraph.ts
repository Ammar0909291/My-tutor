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

export function getKGNode(_id: string): KGNode | undefined {
  return undefined
}

export function getNodesForTopic(_topicSlug: string): KGNode[] {
  return []
}

export function getKnowledgeGraph(_subjectSlug?: string): KnowledgeGraph | null {
  return null
}

export function getAvailableNodes(_graph: KnowledgeGraph, _completedSlugs?: Set<string>): KGNode[] {
  return []
}

export function buildKnowledgeGraphContext(
  _graphOrSubject: KnowledgeGraph | string,
  _completedSlugs?: Set<string> | string[],
  _inProgressSlug?: string
): string {
  return ''
}

export function getDirectUnlocks(_graph: KnowledgeGraph, _nodeSlug: string): KGNode[] {
  return []
}

export function getAllNodes(_graph: KnowledgeGraph): KGNode[] {
  return []
}
