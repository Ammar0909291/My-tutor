/**
 * Offline unit harness for src/lib/teaching/visuals/visualizationCache.ts.
 * normalizeConceptKey is pure; getCachedVisualization/saveVisualization are
 * exercised against a mock client (same injectable-client pattern as
 * test-inline-practice.ts's mockPrisma) — no real DB needed.
 *
 * Run with:  npx tsx scripts/test-visualization-cache.ts
 */
import {
  normalizeConceptKey,
  getCachedVisualization,
  saveVisualization,
  type VisualizationCacheClient,
} from '../src/lib/teaching/visuals/visualizationCache'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function mockClient(opts: {
  row?: { code: string } | null
  onCreate?: (args: { data: { conceptKey: string; code: string } }) => void
  onUpdate?: (args: unknown) => void
  failFind?: boolean
  failCreate?: boolean
}): VisualizationCacheClient {
  return {
    visualizationCache: {
      findUnique: async () => {
        if (opts.failFind) throw new Error('db down')
        return opts.row ?? null
      },
      update: async (args) => { opts.onUpdate?.(args); return {} },
      create: async (args) => {
        if (opts.failCreate) throw new Error('duplicate key')
        opts.onCreate?.(args)
        return {}
      },
    },
  }
}

async function run() {
  // ── normalizeConceptKey ──────────────────────────────────────────────────
  check('lowercases input', normalizeConceptKey('Newton\'s Second Law') === normalizeConceptKey('newton\'s second law'))
  check('strips punctuation', normalizeConceptKey('frequency distribution!') === 'frequency distribution')
  check('collapses whitespace', normalizeConceptKey('the   sine   wave') === 'the sine wave')
  check('trims leading/trailing whitespace', normalizeConceptKey('  pythagoras theorem  ') === 'pythagoras theorem')
  check('caps length at 200 chars', normalizeConceptKey('a'.repeat(500)).length === 200)
  check('two near-duplicate phrasings normalize identically',
    normalizeConceptKey('What is the water cycle?') === normalizeConceptKey('what is the water cycle'))

  // ── getCachedVisualization: hit/miss/error ───────────────────────────────
  {
    const updateCalls: unknown[] = []
    const client = mockClient({ row: { code: 'export default function V(){}' }, onUpdate: (a) => updateCalls.push(a) })
    const result = await getCachedVisualization('sine wave', client)
    check('cache hit returns the cached code', result?.code === 'export default function V(){}')
    check('cache hit increments renderCount', updateCalls.length === 1)
  }
  {
    const client = mockClient({ row: null })
    const result = await getCachedVisualization('unknown concept', client)
    check('cache miss returns null', result === null)
  }
  {
    const client = mockClient({ failFind: true })
    const result = await getCachedVisualization('whatever', client)
    check('DB error on read degrades to null, does not throw', result === null)
  }
  {
    const client = mockClient({ row: { code: 'x' } })
    const result = await getCachedVisualization('', client)
    check('empty conceptKey short-circuits to null without querying', result === null)
  }

  // ── saveVisualization: write / duplicate / error ─────────────────────────
  {
    const saved: { value: { conceptKey: string; code: string } | null } = { value: null }
    const client = mockClient({ onCreate: (args) => { saved.value = args.data } })
    await saveVisualization('sine wave', 'export default function V(){}', client)
    check('save writes conceptKey + code', saved.value?.conceptKey === 'sine wave' && saved.value?.code === 'export default function V(){}')
  }
  {
    const client = mockClient({ failCreate: true })
    await saveVisualization('sine wave', 'export default function V(){}', client)
    check('duplicate-key/DB error on write does not throw', true)
  }

  console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
  process.exit(failed === 0 ? 0 : 1)
}

run()
