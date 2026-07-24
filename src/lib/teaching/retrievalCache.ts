export const CACHE_KEY_EXPLANATION = 'explanation'
export const CACHE_KEY_BLUEPRINT = 'blueprint'
export const CACHE_KEY_EB_CONTEXT = 'eb_context'
export const CACHE_KEY_PROBE = 'probe'
export const CACHE_KEY_BLUEPRINT_SUMMARY = 'blueprint_summary'

export class RetrievalCache {
  private cache: Map<string, unknown> = new Map()

  set<T>(key: string, value: T): void {
    this.cache.set(key, value)
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

export function createRetrievalCache(): RetrievalCache {
  return new RetrievalCache()
}

export function buildBlueprintSummary(blueprintContent: string): string {
  const lines = blueprintContent.split('\n')
  const parts: string[] = []

  const firstHeading = lines.find(l => /^#+\s+/.test(l))
  if (firstHeading) parts.push(firstHeading.replace(/^#+\s+/, '').trim())

  const prereqSection = extractSection(lines, /prerequisite/i)
  if (prereqSection) {
    const items = prereqSection
      .split('\n')
      .filter(l => l.match(/^[-*]\s/))
      .map(l => l.replace(/^[-*]\s+/, '').trim())
      .slice(0, 3)
    if (items.length) parts.push('Prereqs: ' + items.join(', '))
  }

  const misconSection = extractSection(lines, /misconception/i)
  if (misconSection) {
    const items = misconSection
      .split('\n')
      .filter(l => l.match(/^[-*]\s|^MC\d|^\d+\./))
      .map(l => l.replace(/^[-*]\s+|^MC\d+[.:]\s*|^\d+\.\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 3)
    if (items.length) parts.push('Misconceptions: ' + items.join('; '))
  }

  const result = parts.join(' | ')
  return result.length <= 300 ? result : result.slice(0, 297) + '...'
}

function extractSection(lines: string[], pattern: RegExp): string | null {
  let capturing = false
  let level = 0
  const captured: string[] = []

  for (const line of lines) {
    const headingMatch = line.match(/^(#+)\s+(.+)/)
    if (headingMatch) {
      if (capturing) {
        if (headingMatch[1].length <= level) break
      } else if (pattern.test(headingMatch[2])) {
        capturing = true
        level = headingMatch[1].length
        continue
      }
    }
    if (capturing) captured.push(line)
  }

  return captured.length ? captured.join('\n').trim() : null
}

export function buildRetrievedContext(cache: RetrievalCache, conceptId: string): string {
  const segments: string[] = []
  let budget = 800

  const explanation = cache.get<string>(CACHE_KEY_EXPLANATION)
  if (explanation) {
    const text = explanation.length > 500 ? explanation.slice(0, 497) + '...' : explanation
    const line = `[Explanation] ${text}`
    segments.push(line)
    budget -= line.length
  }

  const summary = cache.get<string>(CACHE_KEY_BLUEPRINT_SUMMARY)
  if (summary && budget > 0) {
    const line = `[Blueprint] ${summary}`
    const trimmed = line.length > budget ? line.slice(0, budget - 3) + '...' : line
    segments.push(trimmed)
    budget -= trimmed.length
  }

  const eb = cache.get<{ recoveryNotes?: string; misconceptions?: string[] }>(CACHE_KEY_EB_CONTEXT)
  if (eb && budget > 0) {
    const ebParts: string[] = []
    if (eb.misconceptions?.length) ebParts.push('Misconceptions: ' + eb.misconceptions.join(', '))
    if (eb.recoveryNotes) ebParts.push('Recovery: ' + eb.recoveryNotes)
    if (ebParts.length) {
      const line = `[EB] ${ebParts.join(' | ')}`
      const trimmed = line.length > budget ? line.slice(0, budget - 3) + '...' : line
      segments.push(trimmed)
    }
  }

  return segments.join('\n')
}
