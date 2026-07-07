/**
 * Offline unit harness for the pure helpers in src/lib/roadmaps/service.ts
 * (generateCertificateCode, clampScore, buildCapstoneReviewPrompt — all
 * exported as part of this task, zero behavior change). No DB, no LLM.
 *
 * Run with:  npx tsx scripts/test-roadmap-service-helpers.ts
 */
import { generateCertificateCode, clampScore, buildCapstoneReviewPrompt } from '../src/lib/roadmaps/service'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── generateCertificateCode ──────────────────────────────────────────────
check('certificate code matches the MT-<stamp>-<random> format',
  /^MT-[0-9A-Z]+-[0-9A-F]{6}$/.test(generateCertificateCode()))

check('two consecutively generated codes are not identical',
  generateCertificateCode() !== generateCertificateCode())

// ── clampScore ────────────────────────────────────────────────────────────
check('a normal in-range score passes through unchanged', clampScore(72) === 72)
check('a score above 100 clamps to 100', clampScore(150) === 100)
check('a negative score clamps to 0', clampScore(-20) === 0)
check('a fractional score rounds', clampScore(72.6) === 73)
check('a non-numeric value falls back to the default (50)', clampScore('not a number') === 50)
check('a non-numeric value falls back to a custom fallback', clampScore(undefined, 0) === 0)
check('NaN falls back to the default', clampScore(NaN) === 50)
check('Infinity falls back to the default (not finite)', clampScore(Infinity) === 50)

// ── buildCapstoneReviewPrompt ─────────────────────────────────────────────
{
  const prompt = buildCapstoneReviewPrompt({
    title: 'Build a REST API',
    description: 'Design and ship a working REST API',
    requirements: ['CRUD endpoints', 'Error handling', 'Tests'],
    content: 'My submission content here.',
  })
  check('prompt includes the capstone title', prompt.includes('Build a REST API'))
  check('prompt includes the description', prompt.includes('Design and ship a working REST API'))
  check('prompt joins all requirements with semicolons', prompt.includes('CRUD endpoints; Error handling; Tests'))
  check('prompt embeds the submission content', prompt.includes('My submission content here.'))
  check('prompt specifies the expected JSON response shape', prompt.includes('"score": number'))
  check('prompt states the passing threshold', prompt.includes('60+'))
}

check('overlong submission content is truncated to 8000 characters',
  buildCapstoneReviewPrompt({ title: 't', description: 'd', requirements: [], content: 'x'.repeat(10_000) })
    .split('"""')[1].trim().length === 8000)

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
