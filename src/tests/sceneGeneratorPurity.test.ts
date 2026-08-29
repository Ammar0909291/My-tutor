/**
 * The generator family must stay runnable in a browser.
 *
 * A learner varies a parameter and the figure is RE-DERIVED on the client by
 * the generator's own builder. That only works while those builders are free of
 * the server graph — `@/lib/ai/client` reaches the provider router, the AI
 * budget and the rate limiter. The split that made this true is mechanical and
 * easy to undo by accident (adding one import to a `.pure` module is enough),
 * so it is asserted rather than documented.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'src/lib/teaching/sceneGenerators')
const pureFiles = readdirSync(DIR).filter((f) => f.endsWith('.pure.ts'))

describe('scene generator purity', () => {
  it('has a pure half for every generator that calls the model', () => {
    const withAI = readdirSync(DIR)
      .filter((f) => f.endsWith('.ts') && !f.endsWith('.pure.ts'))
      .filter((f) => readFileSync(join(DIR, f), 'utf8').includes('generateJSON'))
    expect(withAI.length).toBeGreaterThan(20)
    for (const f of withAI) {
      expect(pureFiles, `${f} must have a .pure sibling`).toContain(f.replace(/\.ts$/, '.pure.ts'))
    }
  })

  it.each(pureFiles)('%s imports nothing from the AI or server graph', (file) => {
    const src = readFileSync(join(DIR, file), 'utf8')
    const imports = [...src.matchAll(/^import[^']*'([^']+)'/gm)].map((m) => m[1])
    for (const spec of imports) {
      expect(spec, `${file} imports ${spec}`).not.toMatch(/@\/lib\/ai|@\/lib\/prisma|@\/lib\/rateLimit|node:/)
    }
    expect(src).not.toContain('generateJSON')
  })

  it.each(pureFiles)('%s is re-exported by the module that keeps the public name', (file) => {
    const base = file.replace(/\.pure\.ts$/, '')
    const host = readFileSync(join(DIR, `${base}.ts`), 'utf8')
    expect(host).toMatch(new RegExp(`from '\\./${base}\\.pure'`))
  })
})
