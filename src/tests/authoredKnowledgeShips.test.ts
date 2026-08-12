/**
 * THE AUTHORED TEACHING KNOWLEDGE MUST BE IN THE PRODUCTION BUNDLE.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * `next.config.js` traced `./docs/**\/*.json` and nothing else. The Knowledge
 * Graphs are JSON, so they shipped and worked — which made the gap invisible.
 * Every hand-authored teaching file is MARKDOWN:
 *
 *   docs/curriculum/blueprints/*.md      (1,347 files)
 *   educational-brain/concepts/**\/*.md   (875 files)
 *
 * Neither matched, so `blueprintLoader`'s readFileSync hit ENOENT in
 * production and reported "not found" for EVERY concept. The BLUEPRINT
 * CONTEXT block, the KNOWN MISCONCEPTIONS list, the never-confirm rule,
 * opening scenarios, teaching sequences and anti-analogies had therefore never
 * reached a production prompt. Locally they all load, which is exactly why it
 * survived so long.
 *
 * Measured on a real learner turn:
 *   [affirm-guard-known] { conceptId: 'phys.meas.dimensions', knownChars: 0 }
 * against 555 characters for the same concept in-process.
 *
 * This test is deliberately about CONFIGURATION, not behaviour: no unit test
 * of the loader could have caught it, because the loader is correct and the
 * files are present in every environment a test runs in.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const CONFIG = path.resolve('next.config.js')

describe('production bundles the files the teaching engine reads at runtime', () => {
  const source = fs.readFileSync(CONFIG, 'utf-8')

  it('traces the Blueprint markdown, not only the JSON graphs', () => {
    expect(source).toContain('./docs/curriculum/blueprints/**/*.md')
  })

  it('traces the Educational Brain concept entries', () => {
    expect(source).toContain('./educational-brain/concepts/**/*.md')
  })

  it('still traces the Knowledge Graphs', () => {
    // The original entry, which is load-bearing for /api/curriculum.
    expect(source).toContain('./docs/**/*.json')
  })

  it('the traced paths are the ones the loader actually reads', () => {
    // Guards against the config and the loader drifting apart — the whole
    // failure was a mismatch between what is read and what is shipped.
    const loader = fs.readFileSync(
      path.resolve('src/lib/curriculum/blueprintLoader.ts'), 'utf-8',
    )
    expect(loader).toContain("'docs', 'curriculum', 'blueprints'")
    expect(loader).toContain("'educational-brain', 'concepts'")
  })

  it('the authored corpus actually exists at those paths', () => {
    // If someone moves the corpus, this fails here rather than silently in
    // production six weeks later.
    expect(fs.existsSync(path.resolve('docs/curriculum/blueprints'))).toBe(true)
    expect(fs.existsSync(path.resolve('educational-brain/concepts'))).toBe(true)
  })
})
