import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * The probe's value depends entirely on it being IDENTICAL to production
 * except for the prompt body. A probe that quietly built its own client, its
 * own model string or its own timeout would "prove" nothing about the real
 * path — it would be testing a different stack and reporting the answer as if
 * it were production's. These tests pin that identity at the source level,
 * and pin the admin gate, because neither can be checked by calling the route
 * without a live key and a live session.
 */

const SRC = readFileSync(
  join(process.cwd(), 'src', 'app', 'api', 'admin', 'gemini-probe', 'route.ts'), 'utf8',
)

/** Comments stripped. The secret-leak assertion is about what the code LOGS;
 *  the doc comments legitimately discuss passwords and API keys in prose, and
 *  matching that would be a false positive. */
const CODE = SRC
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^[ \t]*\/\/.*$/gm, '')

describe('probe is admin-gated', () => {
  it('rejects anonymous callers before doing any work', () => {
    expect(SRC).toMatch(/await auth\(\)/)
    expect(SRC).toMatch(/status:\s*401/)
  })

  it('rejects non-admin users', () => {
    expect(SRC).toMatch(/isAdmin\(/)
    expect(SRC).toMatch(/status:\s*403/)
  })

  it('runs the auth gate BEFORE constructing a provider or calling out', () => {
    // Scoped to the handler body: the import of createGeminiProvider sits at
    // the top of the file and would otherwise satisfy a naive index compare.
    const body = SRC.slice(SRC.indexOf('export async function GET('))
    const gate = body.indexOf('isAdmin(')
    const build = body.indexOf('createGeminiProvider(')
    expect(gate).toBeGreaterThan(-1)
    expect(build).toBeGreaterThan(gate)
  })
})

describe('probe uses the exact production configuration', () => {
  it('reads the same API key variable as the router', () => {
    expect(SRC).toMatch(/process\.env\.GEMINI_API_KEY/)
  })

  it('resolves the model through the router\'s own resolver, not a literal', () => {
    expect(SRC).toMatch(/resolveGeminiModel\(process\.env\.GEMINI_MODEL\)/)
    // A hardcoded model would silently diverge from production the moment
    // GEMINI_MODEL changed.
    expect(SRC).not.toMatch(/model:\s*['"]gemini-/)
  })

  it('uses the production provider factory rather than the SDK directly', () => {
    expect(SRC).toMatch(/createGeminiProvider\(/)
    expect(SRC).not.toMatch(/new GoogleGenerativeAI\(/)
  })

  it('inherits the provider timeout instead of restating one', () => {
    // Any local timeout literal here would mean the probe is not measuring
    // production's 30s budget.
    expect(SRC).not.toMatch(/TIMEOUT_MS\s*=/)
    expect(SRC).not.toMatch(/setTimeout\([^)]*30_?000/)
  })

  it('also calls the provider healthCheck as a second data point', () => {
    expect(SRC).toMatch(/provider\.healthCheck\(\)/)
  })
})

describe('probe reports every requested field', () => {
  it.each([
    'startedAt', 'elapsedMs', 'httpStatus', 'finishReason', 'model', 'errorBody',
  ])('reports %s', (field) => {
    expect(SRC).toContain(field)
  })

  it('logs one greppable line per probe', () => {
    expect(SRC).toMatch(/\[ai\/probe\] probe=complete/)
    expect(SRC).toMatch(/\[ai\/probe\] probe=healthcheck/)
  })
})

describe('probe is read-only and leaks no secret', () => {
  it('never returns the API key itself', () => {
    // keyConfigured/keyLength are fine; the value is not.
    expect(SRC).not.toMatch(/apiKey\s*,\s*$/m)
    expect(SRC).not.toMatch(/key:\s*apiKey/)
  })

  it('performs no state WRITE (the 403 diagnostic read is allowed)', () => {
    for (const w of ['.create(', '.update(', '.delete(', '.upsert(']) {
      expect(SRC).not.toContain(w)
    }
    // The only DB access is the temporary 403 diagnostic, and it is a read.
    expect(SRC).toMatch(/prisma\.user\.findUnique/)
  })

  it('is a GET only — no mutating verb is exported', () => {
    expect(SRC).toMatch(/export async function GET\(/)
    for (const verb of ['POST', 'PATCH', 'PUT', 'DELETE']) {
      expect(SRC).not.toMatch(new RegExp(`export async function ${verb}\\(`))
    }
  })
})

describe('403 diagnostic names the actual cause', () => {
  it('reports the session identity, the row lookup and the role', () => {
    for (const field of [
      'session_user_id', 'session_email', 'user_row_found', 'db_role',
      'expected_role=ADMIN', 'admin_emails_configured',
    ]) expect(SRC).toContain(field)
  })

  it('distinguishes a missing row from a STUDENT role', () => {
    expect(SRC).toMatch(/rowFound/)
    expect(SRC).toMatch(/lookup_failed/)
  })

  it('logs no secret — no token, key or password field', () => {
    for (const secret of ['password', 'sessionToken', 'accessToken']) {
      expect(CODE).not.toContain(secret)
    }
    // The key's VALUE must never be logged or returned — only its presence.
    expect(CODE).not.toMatch(/\$\{apiKey\}/)
  })
})
