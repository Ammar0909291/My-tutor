/**
 * curriculumKgRegistration.test.ts
 *
 * Guards against the exact class of bug found in the English curriculum:
 * a canonical Knowledge Graph existed on disk (docs/english/kg/graph.json,
 * 216 concepts) but was never wired into SUBJECT_ADAPTERS / ID_PREFIX_TO_SUBJECT
 * in src/lib/curriculum/knowledgeGraph.ts, so the app silently served a
 * different, much smaller legacy curriculum instead.
 *
 * This test dynamically discovers every docs/{subject}/kg/graph.json on disk
 * and asserts getKnowledgeGraph(subjectDir) returns a graph whose total node
 * count exactly matches the file's own concept count — so dropping in a new
 * subject's KG without registering it (or a future adapter bug truncating
 * results) fails CI immediately instead of shipping silently.
 */
import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'

const DOCS_ROOT = path.join(process.cwd(), 'docs')

// docs/{subject}/kg/graph.json's directory name is not always the runtime
// subject slug (e.g. docs/computer-science → subject slug computer_science).
const DIR_TO_SUBJECT_SLUG: Record<string, string> = {
  'computer-science': 'computer_science',
}

function discoverCanonicalKgDirs(): string[] {
  if (!fs.existsSync(DOCS_ROOT)) return []
  return fs.readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => fs.existsSync(path.join(DOCS_ROOT, name, 'kg', 'graph.json')))
}

describe('canonical KG registration', () => {
  const dirs = discoverCanonicalKgDirs()

  it('found at least one canonical KG under docs/ to check', () => {
    expect(dirs.length).toBeGreaterThan(0)
  })

  for (const dir of dirs) {
    const subjectSlug = DIR_TO_SUBJECT_SLUG[dir] ?? dir

    it(`${dir} (subject slug "${subjectSlug}") is registered and fully served — not shadowed by legacy data`, () => {
      const raw = JSON.parse(fs.readFileSync(path.join(DOCS_ROOT, dir, 'kg', 'graph.json'), 'utf-8'))
      const expectedCount: number = raw.concepts.length

      const graph = getKnowledgeGraph(subjectSlug)
      expect(graph, `getKnowledgeGraph('${subjectSlug}') returned null — is it missing from SUBJECT_ADAPTERS?`).not.toBeNull()

      const actualCount = graph!.modules.reduce((sum, m) => sum + m.nodes.length, 0)
      expect(actualCount).toBe(expectedCount)
    })
  }
})
