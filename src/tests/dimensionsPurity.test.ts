/**
 * Deterministic Physics Verifier, Batch 0 — the purity guard.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6 row 0.
 * Mirrors `turnProgress.test.ts`'s C1/C3 structural discipline and
 * `learnerMovePurity.test.ts`'s comment-stripped source-text assertions:
 * fails the build if `dimensions.ts` or `dimensionBindings.ts` contains a
 * mathjs import (any form), any I/O, or any model/provider call. The whole
 * point of this module is that it is a pure, total function over strings —
 * §5.1 contrasts it explicitly with K5, which calls a model to judge
 * correctness; this guard is what keeps that contrast true as the file grows.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const FILES = [
  'src/lib/teaching/physics/dimensions.ts',
  'src/lib/teaching/physics/dimensionBindings.ts',
]

/** Same stripping approach as turnProgress.test.ts's STRUCTURAL block: drop
 *  whole-line comments and block comments, leaving code only. */
function codeOf(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((l) => !l.trim().startsWith('//'))
    .join('\n')
}

describe.each(FILES)('STRUCTURAL — purity guard for %s', (rel) => {
  const src = fs.readFileSync(path.join(process.cwd(), rel), 'utf8')
  const code = codeOf(src)

  it('imports nothing outside base TypeScript (dimensions.ts: nothing; dimensionBindings.ts: only ./dimensions)', () => {
    const imports = [...code.matchAll(/^import\s+.*?from\s+['"]([^'"]+)['"]/gm)].map((m) => m[1])
    const allowed = rel.endsWith('dimensionBindings.ts') ? ['./dimensions'] : []
    for (const spec of imports) {
      expect(allowed, `unexpected import "${spec}" in ${rel}`).toContain(spec)
    }
    if (rel.endsWith('dimensions.ts')) {
      expect(imports.length, 'dimensions.ts must have zero imports').toBe(0)
    }
    // Explicit, named check for the one dependency this whole design exists
    // to keep out of the hot path (§5.1): no form of mathjs may appear.
    expect(code.toLowerCase()).not.toContain('mathjs')
  })

  it('performs no I/O: no fetch, no fs, no prisma, no console (outside test files)', () => {
    expect(code).not.toMatch(/\bfetch\(/)
    expect(code).not.toMatch(/\bfs\.|require\(['"]fs['"]\)/)
    expect(code).not.toMatch(/\bprisma\b/i)
    expect(code).not.toMatch(/console\./)
  })

  it('makes no model or provider call', () => {
    expect(code).not.toMatch(/@\/lib\/ai/)
    expect(code).not.toMatch(/routeAI|generateContent|chat\.completions|anthropic|openai|groq|gemini/i)
  })

  it('never throws from its exported entry points — every export is a total function', () => {
    // A structural proxy for totality: no exported function body contains a
    // bare `throw` reachable outside a local try/catch it also defines.
    // (Executable proof of never-throwing lives in dimensionsParser.test.ts;
    // this is the source-shape half of the same guarantee.)
    const bareThrows = [...code.matchAll(/^\s*throw\b/gm)]
    expect(bareThrows.length, 'this module must never throw — abstain via {ok:false} instead').toBe(0)
  })
})
