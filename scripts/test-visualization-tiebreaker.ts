/**
 * Standalone test harness for Part 1.5 (the confidence-gated semantic tie-breaker).
 *
 * IMPORTANT — sandbox limitation, read before trusting the output: this script makes
 * a REAL call to generateJSON() -> Groq. In this sandbox, outbound network to
 * api.groq.com is blocked (confirmed: 403 Host not in allowlist) and .env has a
 * placeholder key, so every call below will fail and exercise the FALLBACK
 * 'confirm' degrade path, not real semantic judgment. Run this for real against a
 * live GROQ_API_KEY to see actual isLiteral classification quality.
 *
 * Run:  npx tsx scripts/test-visualization-tiebreaker.ts
 */

import { decideVisualization } from '../src/lib/teaching/visualizationDecision'
import { resolveAmbiguousDecision, CONFIDENCE_THRESHOLD } from '../src/lib/teaching/visualizationTieBreaker'

const CASES: { note: string; text: string }[] = [
  {
    note: 'KNOWN LIMITATION #1 — "versus" as a proper noun (court case)',
    text: 'Today we are going to look at the famous court case Roe versus Wade, and talk about what it established about legal precedent in the years that followed it afterward.',
  },
  {
    note: 'KNOWN LIMITATION #2 — "as X increases Y increases" about feelings, not a quantitative plot',
    text: 'As students get more comfortable with the material, their confidence increases and their motivation increases too, which makes the whole subject feel a lot less intimidating over the weeks.',
  },
  {
    note: 'control — legitimately weak match that should be CONFIRMED, not overridden',
    text: 'To solve it, first find the initial velocity, then plug it into the equation, and then the object position updates each second as it falls toward the ground.',
  },
  {
    note: 'control — a real comparison at the same confidence band as the proper-noun case',
    text: 'A stack removes the most recently added item first, whereas a queue removes the oldest item first.',
  },
  {
    note: 'NOT in scope — already-shown-visual reference (confidence 0.82, ABOVE threshold; should never reach Part 1.5)',
    text: 'Remember the diagram I showed you before, with the nucleus sitting in the center surrounded by cytoplasm? That same structure is what we are building on today.',
  },
]

async function main() {
  console.log('\n=== Part 1.5 tie-breaker harness ===')
  console.log(`Confidence threshold: < ${CONFIDENCE_THRESHOLD} (and shouldVisualize=true) triggers Part 1.5\n`)

  for (const c of CASES) {
    const candidate = decideVisualization(c.text)
    const eligible = candidate.shouldVisualize && candidate.confidence < CONFIDENCE_THRESHOLD

    console.log(`--- ${c.note} ---`)
    console.log(`  text:      ${c.text.slice(0, 90)}${c.text.length > 90 ? '…' : ''}`)
    console.log(`  Part 1:    shouldVisualize=${candidate.shouldVisualize} category=${candidate.category} confidence=${candidate.confidence}`)
    console.log(`  matchedText: "${candidate.matchedText}"`)
    console.log(`  eligible for Part 1.5: ${eligible}`)

    if (!eligible) {
      console.log(`  → Part 1.5 NOT invoked (confidence ${candidate.confidence} >= ${CONFIDENCE_THRESHOLD} or shouldVisualize=false). Part 1's answer stands.\n`)
      continue
    }

    const result = await resolveAmbiguousDecision(c.text, candidate)
    console.log(`  Part 1.5:  resolution=${result.resolution} shouldVisualize=${result.shouldVisualize} category=${result.category}`)
    console.log(`  rationale: ${result.rationale}\n`)
  }

  console.log('=== Done. NOTE: in this sandbox every eligible case above degraded via the')
  console.log('fallback path (no live Groq access) — that degrade behavior IS real and verified.')
  console.log('The actual isLiteral semantic judgment needs a live GROQ_API_KEY to verify. ===\n')
}

main()
