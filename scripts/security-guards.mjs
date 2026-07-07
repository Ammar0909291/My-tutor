#!/usr/bin/env node
/**
 * Security regression guards (Sprint EK).
 *
 * Lightweight static assertions runnable without a test runner:
 *   node scripts/security-guards.mjs
 *
 * Each guard fails the process (exit 1) if a previously-fixed production
 * blocker regresses. Wire into CI before deploy.
 */
import { readFileSync } from 'node:fs'

let failures = 0
function check(name, ok, detail = '') {
  if (ok) {
    console.log(`  ✓ ${name}`)
  } else {
    failures++
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`)
  }
}
function read(p) {
  try { return readFileSync(new URL(`../${p}`, import.meta.url), 'utf8') } catch { return '' }
}

console.log('Security regression guards:\n')

// DEF-EJ-03 — subscription updateMany must be scoped to the auth user's id.
const sessEnd = read('src/app/api/sessions/end/route.ts')
const updateManyBlock = sessEnd.match(/subscription\.updateMany\(\{[\s\S]*?\}\)/)?.[0] ?? ''
check(
  'DEF-EJ-03 sessions/end updateMany scoped by userId',
  /where:\s*\{[^}]*userId:\s*session\.user\.id/.test(updateManyBlock),
  'updateMany where-clause is missing userId: session.user.id',
)

// DEF-EJ-10 — middleware applies API rate limiting.
const mw = read('src/middleware.ts')
check(
  'DEF-EJ-10 middleware rate-limits /api routes',
  mw.includes("pathname.startsWith('/api/')") && mw.includes('slidingWindow') && mw.includes('429'),
  'middleware no longer rate-limits /api',
)

// DEF-EJ-10 — limiter no longer fails open when Redis is absent.
const rl = read('src/lib/rateLimit.ts')
check(
  'DEF-EJ-10 checkRateLimit has in-memory fallback (not fail-open)',
  rl.includes('slidingWindow') && !/if \(!redis\) return \{ allowed: true/.test(rl),
  'checkRateLimit silently allows all requests without Redis',
)

// DEF-EJ-12 — forgot-password throttled by IP and email.
const forgot = read('src/app/api/auth/forgot-password/route.ts')
check(
  'DEF-EJ-12 forgot-password rate-limited by IP + email',
  forgot.includes('rl:forgot:ip:') && forgot.includes('rl:forgot:email:'),
  'forgot-password is missing per-IP / per-email throttling',
)

// DEF-EJ-11 — email failures routed to monitoring.
const email = read('src/lib/email.ts')
check(
  'DEF-EJ-11 email failures reported to monitoring',
  email.includes('reportError') || email.includes('recordEmailFailure'),
  'SMTP failures are not routed to the monitoring hook',
)

// DEF-EJ-06 — no silent empty catches in the audited client files.
for (const f of ['src/app/settings/page.tsx']) {
  const src = read(f)
  check(
    `DEF-EJ-06 ${f} has no silent empty .catch(() => {})`,
    !/\.catch\(\(\)\s*=>\s*\{\}\)/.test(src),
    'found .catch(() => {}) that swallows errors',
  )
}

console.log('')
if (failures > 0) {
  console.error(`${failures} guard(s) failed.`)
  process.exit(1)
}
console.log('All security guards passed.')
