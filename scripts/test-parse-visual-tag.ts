/**
 * Standalone test harness for parseVisualTag() — the explicit VISUAL:<type> tag path.
 * Confirmed live/reachable in production: called unconditionally on every chat turn
 * from src/app/api/learn/chat/route.ts (both the schoolCtx and SUBJECT_LIBRARY branches).
 * Pure — no DB, no network, no Groq. Run with:  npx tsx scripts/test-parse-visual-tag.ts
 */

import { parseVisualTag } from '../src/lib/school/visuals/detectVisual'

type Case = {
  name: string
  text: string
  expectVisual: string | null
  /** Expected cleanText after stripping (or unchanged, for non-strip cases). */
  expectCleanText: string
}

const CASES: Case[] = [
  // ── Valid tags ──
  {
    name: 'valid tag at end of response, stripped cleanly',
    text: 'A vector has direction.\nVISUAL: three_double_slit',
    expectVisual: 'three_double_slit',
    expectCleanText: 'A vector has direction.',
  },
  {
    name: 'valid tag, one of the 6 otherwise-unreachable-via-keyword 3D types',
    text: 'Here is the hydrogen orbital.\nVISUAL: three_hydrogen_orbital',
    expectVisual: 'three_hydrogen_orbital',
    expectCleanText: 'Here is the hydrogen orbital.',
  },
  {
    name: 'lowercase "visual:" tag still matches (case-insensitive)',
    text: 'Explanation here.\nvisual:three_double_slit',
    expectVisual: 'three_double_slit',
    expectCleanText: 'Explanation here.',
  },
  {
    name: 'extra whitespace between colon and type',
    text: 'Explanation here.\nVISUAL:   bloch_sphere',
    expectVisual: 'bloch_sphere',
    expectCleanText: 'Explanation here.',
  },

  // ── Malformed tags — must degrade gracefully, no throw ──
  {
    name: 'MALFORMED — "VISUAL:" with nothing after it returns null, text untouched',
    text: 'Explanation here.\nVISUAL:',
    expectVisual: null,
    expectCleanText: 'Explanation here.\nVISUAL:',
  },
  {
    name: 'MALFORMED — "VISUAL:fake_type" (unrecognized candidate) returns null',
    text: 'Explanation here.\nVISUAL:fake_type',
    expectVisual: null,
    expectCleanText: 'Explanation here.\nVISUAL:fake_type',
  },

  // ── Unreachable-via-keyword VisualType regression (the 6 types from the prior audit) ──
  {
    name: 'three_atomic_structure reachable via explicit tag',
    text: 'See the structure.\nVISUAL: three_atomic_structure',
    expectVisual: 'three_atomic_structure',
    expectCleanText: 'See the structure.',
  },
  {
    name: 'Data Science 3D types are now in VALID — reachable via explicit tag (Data Science curriculum/visual wiring sprint)',
    text: 'Explanation here.\nVISUAL: three_data_visualization',
    expectVisual: 'three_data_visualization',
    expectCleanText: 'Explanation here.',
  },

  // ── BUG FIX REGRESSION — false positive must not corrupt real prose ──
  {
    name: 'REGRESSION — "VISUAL:" occurring incidentally in real prose is NOT stripped when invalid',
    text: 'For VISUAL:auditory learners this helps.',
    expectVisual: null,
    expectCleanText: 'For VISUAL:auditory learners this helps.',
  },

  // ── Substring-embedding false positive check ──
  {
    name: 'FALSE-POSITIVE CHECK — "AUDIOVISUAL:" does not match (no word boundary before VISUAL)',
    text: 'This is an AUDIOVISUAL:aid for learning.',
    expectVisual: null,
    expectCleanText: 'This is an AUDIOVISUAL:aid for learning.',
  },

  // ── No tag at all ──
  {
    name: 'no tag present returns null, text completely unchanged',
    text: 'Just a plain explanation with no tag.',
    expectVisual: null,
    expectCleanText: 'Just a plain explanation with no tag.',
  },
  {
    name: 'empty string returns null cleanly, no throw',
    text: '',
    expectVisual: null,
    expectCleanText: '',
  },
]

let pass = 0
let fail = 0

console.log('\n=== parseVisualTag harness ===\n')

for (const c of CASES) {
  let result: ReturnType<typeof parseVisualTag>
  let threw = false
  try {
    result = parseVisualTag(c.text)
  } catch (e) {
    threw = true
    result = { visual: null, cleanText: c.text }
  }
  const visualOk = result.visual === c.expectVisual
  const cleanOk = result.cleanText === c.expectCleanText
  const ok = !threw && visualOk && cleanOk

  if (ok) pass++
  else fail++

  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${c.name}`)
  console.log(`  input:    ${JSON.stringify(c.text)}`)
  console.log(`  expected: visual=${JSON.stringify(c.expectVisual)} cleanText=${JSON.stringify(c.expectCleanText)}`)
  console.log(`  got:      visual=${JSON.stringify(result.visual)} cleanText=${JSON.stringify(result.cleanText)}`)
  if (threw) console.log('  !! threw an exception')
  if (!visualOk) console.log('  !! visual mismatch')
  if (!cleanOk) console.log('  !! cleanText mismatch')
  console.log('')
}

console.log(`=== ${pass} passed, ${fail} failed (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
