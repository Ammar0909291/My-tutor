/**
 * contractAuditSubjectCoverage.test.ts
 *
 * ARCHITECTURE HARDENING, not a content check. Before this test existed,
 * `scripts/assets/contract-audit.ts`'s subject list was derived only from
 * subjectSlug values already present in loaded seed explanations/probes — a
 * subject whose canonical KG exists on disk and is registered in
 * SUBJECT_ADAPTERS (per curriculumKgRegistration.test.ts) but has zero seed
 * content yet was simply absent from the readiness report, silently, rather
 * than appearing as a visible "0 authored of N in the KG" line.
 *
 * This asserts the fix directly against `kgSubjects()` — the exported
 * function the audit script itself now unions into its subject list — using
 * the SAME dynamic discovery of docs/{subject}/kg/graph.json that
 * curriculumKgRegistration.test.ts already uses to guard the adapter
 * registry, so this test and that one can never quietly disagree about which
 * subjects exist.
 *
 * The property under test: for EVERY subject with a canonical KG on disk —
 * today's six, and any subject added in the future — kgSubjects() reports it
 * with the correct concept count, whether or not any seed content has been
 * authored for it. This is what makes a newly-added subject visible to the
 * readiness report on its very first run, rather than needing someone to
 * remember to add it to a list.
 */
import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import { kgSubjects } from '../../scripts/assets/contract-audit'

const DOCS_ROOT = path.join(process.cwd(), 'docs')

// Mirrors contract-audit.ts's own DIR_TO_SUBJECT_SLUG exactly — kept as a
// separate literal (not imported) so this test independently confirms the
// mapping the script applies, the same discipline curriculumKgRegistration
// .test.ts uses for its own copy of this one-entry table.
const DIR_TO_SUBJECT_SLUG: Record<string, string> = {
  'computer-science': 'computer_science',
}

function discoverCanonicalKgDirs(): { dir: string; slug: string; conceptCount: number }[] {
  if (!fs.existsSync(DOCS_ROOT)) return []
  return fs.readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => fs.existsSync(path.join(DOCS_ROOT, name, 'kg', 'graph.json')))
    .map((dir) => {
      const raw = JSON.parse(
        fs.readFileSync(path.join(DOCS_ROOT, dir, 'kg', 'graph.json'), 'utf-8'),
      ) as { concepts: unknown[] }
      return { dir, slug: DIR_TO_SUBJECT_SLUG[dir] ?? dir, conceptCount: raw.concepts.length }
    })
}

describe('contract-audit.ts subject coverage — every registered KG appears, even at zero authored content', () => {
  const onDisk = discoverCanonicalKgDirs()

  it('found at least one canonical KG under docs/ to check (sanity: this test can fail)', () => {
    expect(onDisk.length).toBeGreaterThan(0)
  })

  it('kgSubjects() discovers exactly the same subjects as a fresh, independent scan of docs/', () => {
    const discovered = kgSubjects()
    const expectedSlugs = onDisk.map((s) => s.slug).sort()
    expect([...discovered.keys()].sort()).toEqual(expectedSlugs)
  })

  for (const { dir, slug, conceptCount } of onDisk) {
    it(`${dir} (subject slug "${slug}") reports the correct concept count from kgSubjects()`, () => {
      const discovered = kgSubjects()
      expect(discovered.get(slug)).toBe(conceptCount)
    })
  }

  it('a subject present in seed content is a SUBSET of subjects with a registered KG — no orphan subjectSlug values', async () => {
    // If this ever fails, some seed module uses a subjectSlug that doesn't
    // match any docs/{subject}/kg/graph.json — a typo or a subject removed
    // from the KG registry while its seed content was left behind.
    const ASSET_DIR = path.join(process.cwd(), 'src', 'lib', 'teaching', 'assets')
    const files = fs.readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    const seedSubjects = new Set<string>()
    for (const f of files) {
      const src = fs.readFileSync(path.join(ASSET_DIR, f), 'utf8')
      for (const m of src.matchAll(/subjectSlug:\s*'([a-z_]+)'/g)) seedSubjects.add(m[1])
      for (const m of src.matchAll(/subjectSlug:\s*S\b/g)) {
        // englishProbeBatch6.ts-style `const S = 'english'` indirection.
        const constMatch = src.match(/const S\s*=\s*'([a-z_]+)'/)
        if (constMatch) seedSubjects.add(constMatch[1])
      }
    }
    const registeredSlugs = new Set(onDisk.map((s) => s.slug))
    const orphans = [...seedSubjects].filter((s) => !registeredSlugs.has(s))
    expect(orphans).toEqual([])
  })
})
